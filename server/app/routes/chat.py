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
    results = retrieve_context(
        request.question
    )

    docs = (
        results["documents"][0]
    )

    context = "\n\n".join(
        docs
    )

    answer = generate_answer(
        request.question,
        context
    )

    return {
        "answer": answer,
        "sources": docs
    }