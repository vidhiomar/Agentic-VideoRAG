from fastapi import APIRouter

from app.schemas.chat import (
    ChatRequest
)

from app.services.retriever import (
    retrieve_video_chunks
)

from app.services.llm import (
    generate_answer
)

router = APIRouter()


@router.post("/")
async def chat(
    request: ChatRequest
):
    chunks_a = (
        retrieve_video_chunks(
            request.question,
            "video_A"
        )
    )

    chunks_b = (
        retrieve_video_chunks(
            request.question,
            "video_B"
        )
    )

    docs_a = (
        chunks_a["documents"][0]
    )

    docs_b = (
        chunks_b["documents"][0]
    )

    context = f"""
VIDEO A:

{chr(10).join(docs_a)}

VIDEO B:

{chr(10).join(docs_b)}
"""

    answer = generate_answer(
        request.question,
        context
    )

    return {
        "answer": answer,

        "sources": {
            "video_A":
                len(docs_a),

            "video_B":
                len(docs_b)
        }
    }