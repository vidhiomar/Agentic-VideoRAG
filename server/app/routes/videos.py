import asyncio
from concurrent.futures import ThreadPoolExecutor

from fastapi import APIRouter

from app.schemas.video import AnalyzeRequest

from app.services.metadata import (
    extract_metadata
)

from app.services.transcript import (
    get_transcript
)

from app.services.chunking import (
    semantic_chunk_text
)

from app.services.indexing import (
    store_chunks
)

from app.services.retriever import (
    retrieve_context
)

from app.services.content_analysis import (
    analyze_content
)

from app.data.video_metadata import (
    video_metadata
)

router = APIRouter()

# Thread pool for CPU-bound / blocking I/O work
_executor = ThreadPoolExecutor(max_workers=4)


async def _run_in_thread(func, *args):
    """Run a blocking function in a thread pool."""
    loop = asyncio.get_running_loop()
    return await loop.run_in_executor(
        _executor, func, *args
    )



async def _process_video(url: str, video_key: str):
    """
    Process a single video: metadata + transcript in parallel,
    then analysis + chunking in parallel, then store.
    """
    # Step 1: Fetch metadata and transcript in parallel
    meta_task = _run_in_thread(extract_metadata, url)
    transcript_task = _run_in_thread(get_transcript, url)

    video_meta, transcript = await asyncio.gather(
        meta_task, transcript_task
    )

    if not transcript:
        return None, f"Transcript not available for {video_key}. The video may have captions disabled."

    # Step 2: AI analysis and chunking in parallel
    # (analysis uses LLM, chunking uses embeddings — independent)
    analysis_task = _run_in_thread(analyze_content, transcript)
    chunk_task = _run_in_thread(semantic_chunk_text, transcript)

    analysis, chunks = await asyncio.gather(
        analysis_task, chunk_task
    )

    video_meta["analysis"] = analysis
    video_metadata[video_key] = video_meta

    print(f"{video_key} chunks: {len(chunks)}")

    # Step 3: Store chunks (already batched internally)
    await _run_in_thread(store_chunks, video_key, chunks)

    return video_meta, None


@router.post("/analyze")
async def analyze_videos(
    request: AnalyzeRequest,
):
    try:
        # Process both videos in parallel
        result_a, result_b = await asyncio.gather(
            _process_video(request.video_a, "video_A"),
            _process_video(request.video_b, "video_B"),
        )

        video_a, error_a = result_a
        video_b, error_b = result_b

        if error_a:
            return {"error": error_a}
        if error_b:
            return {"error": error_b}

        return {
            "message":
            "Videos analyzed successfully",

            "video_A":
            video_metadata["video_A"],

            "video_B":
            video_metadata["video_B"]
        }

    except Exception as e:
        print(f"ANALYZE ERROR: {e}")
        return {
            "error":
            f"Failed to analyze videos: {str(e)}"
        }


@router.get("/count")
async def count():

    from app.services.vector_store import (
        collection
    )

    return {
        "count":
        collection.count()
    }


@router.get("/search")
async def search(
    query: str
):

    results = retrieve_context(
        query,
        "video_A"
    )

    return results


@router.get("/metadata")
async def metadata():

    return video_metadata


@router.get("/reset")
async def reset():

    from app.services.vector_store import (
        collection
    )

    data = collection.get()

    if data["ids"]:

        collection.delete(
            ids=data["ids"]
        )

    video_metadata.clear()

    return {
        "message":
        "Collection cleared"
    }


@router.get("/debug")
async def debug():

    from app.services.vector_store import (
        collection
    )

    data = collection.get()

    return {
        "count":
        len(data["ids"]),

        "ids":
        data["ids"][:20]
    }