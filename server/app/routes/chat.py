from fastapi import APIRouter

from app.schemas.chat import (
    ChatRequest
)

from app.services.retriever import (
    retrieve_context
)

from app.services.llm import (
    generate_answer
)

router = APIRouter()
@router.post("/")
async def chat(
    request: ChatRequest
):
    results_a = retrieve_context(
        request.question,
        "video_A"
    )

    results_b = retrieve_context(
        request.question,
        "video_B"
    )

    docs_a = (
        results_a["documents"][0]
        if results_a["documents"]
        else []
    )

    docs_b = (
        results_b["documents"][0]
        if results_b["documents"]
        else []
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
            "video_A": docs_a,
            "video_B": docs_b
        }
    }