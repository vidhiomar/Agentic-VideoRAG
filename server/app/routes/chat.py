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

from app.data.video_metadata import (
    video_metadata
)

router = APIRouter()


@router.post("/")
async def chat(
    request: ChatRequest
):
    metadata_a = video_metadata.get(
        "video_A",
        {}
    )

    metadata_b = video_metadata.get(
        "video_B",
        {}
    )

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
VIDEO A METADATA

Title:
{metadata_a.get("title", "N/A")}

Creator:
{metadata_a.get("creator", "N/A")}

Views:
{metadata_a.get("views", "N/A")}

Likes:
{metadata_a.get("likes", "N/A")}

Comments:
{metadata_a.get("comments", "N/A")}

Duration:
{metadata_a.get("duration", "N/A")}

Engagement Rate:
{metadata_a.get("engagement_rate", "N/A")}


VIDEO A TRANSCRIPT

{chr(10).join(docs_a)}


VIDEO B METADATA

Title:
{metadata_b.get("title", "N/A")}

Creator:
{metadata_b.get("creator", "N/A")}

Views:
{metadata_b.get("views", "N/A")}

Likes:
{metadata_b.get("likes", "N/A")}

Comments:
{metadata_b.get("comments", "N/A")}

Duration:
{metadata_b.get("duration", "N/A")}

Engagement Rate:
{metadata_b.get("engagement_rate", "N/A")}


VIDEO B TRANSCRIPT

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
        },
        "metadata": {
            "video_A": metadata_a,
            "video_B": metadata_b
        }
    }