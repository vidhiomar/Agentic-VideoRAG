from fastapi import APIRouter

from app.schemas.video import AnalyzeRequest

from app.services.metadata import extract_metadata
from app.services.transcript import get_transcript

from app.services.chunking import (
    semantic_chunk_text
)

from app.services.indexing import (
    store_chunks
)

from app.services.retriever import (
    retrieve_context
)

router = APIRouter()


@router.post("/analyze")
async def analyze_videos(
    request: AnalyzeRequest,
):
    # Video A

    video_a = extract_metadata(
        request.video_a
    )

    transcript_a = get_transcript(
        request.video_a
    )

    if not transcript_a:
        return {
            "error":
            "Transcript not available for Video A"
        }

    chunks_a = semantic_chunk_text(
        transcript_a
    )

    store_chunks(
        "video_A",
        chunks_a
    )

    # Video B

    video_b = extract_metadata(
        request.video_b
    )

    transcript_b = get_transcript(
        request.video_b
    )
    if not transcript_b:
        return {
            "error":
            "Transcript not available for Video B"
        }
    chunks_b = semantic_chunk_text(
        transcript_b
    )

    store_chunks(
        "video_B",
        chunks_b
    )

    return {
        "videoA": video_a,
        "videoB": video_b
    }

@router.get("/count")
async def count():
    from app.services.vector_store import collection

    return {
        "count": collection.count()
    }


@router.get("/search")
async def search(
    query: str
):
    results = retrieve_context(
        query
    )

    return results

@router.get("/reset")
async def reset():
    from app.services.vector_store import collection

    data = collection.get()

    if data["ids"]:
        collection.delete(
            ids=data["ids"]
        )

    return {
        "message": "Collection cleared"
    }