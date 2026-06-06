from fastapi import APIRouter

from app.schemas.chat import (
    ChatRequest,
    ChatResponse
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


def _safe_text(value, fallback="N/A"):
    if value is None:
        return fallback

    if isinstance(value, list):
        return ", ".join(str(item) for item in value) if value else fallback

    text = str(value).strip()
    return text if text else fallback


def _metric_line(label, metadata):
    return (
        f"- **{label}:** "
        f"{_safe_text(metadata.get('title'))} by {_safe_text(metadata.get('creator'))}; "
        f"{_safe_text(metadata.get('views'))} views, "
        f"{_safe_text(metadata.get('likes'))} likes, "
        f"{_safe_text(metadata.get('comments'))} comments, "
        f"{_safe_text(metadata.get('engagement_rate'))}% engagement rate."
    )


def _analysis_value(analysis, field):
    value = analysis.get(field)

    if field == "key_topics":
        return _safe_text(value)

    return _safe_text(value)


def _field_answer(field_label, field_name, question, analysis_a, analysis_b):
    q = question.lower()
    wants_a = "video a" in q or " a " in f" {q} "
    wants_b = "video b" in q or " b " in f" {q} "

    if wants_a and not wants_b:
        return (
            f"**Video A {field_label}**\n"
            f"- {_analysis_value(analysis_a, field_name)}"
        )

    if wants_b and not wants_a:
        return (
            f"**Video B {field_label}**\n"
            f"- {_analysis_value(analysis_b, field_name)}"
        )

    return (
        f"**{field_label} Comparison**\n"
        f"- **Video A:** {_analysis_value(analysis_a, field_name)}\n"
        f"- **Video B:** {_analysis_value(analysis_b, field_name)}"
    )


def _build_local_answer(
    question,
    metadata_a,
    metadata_b,
    analysis_a,
    analysis_b,
    llm_error=None
):
    q = question.lower()

    field_map = [
        (("hook", "hooks", "opening"), "Hook", "hook"),
        (("summary", "summarize"), "Summary", "summary"),
        (("cta", "call to action"), "Call To Action", "cta"),
        (("tone",), "Tone", "tone"),
        (("audience", "target audience"), "Target Audience", "target_audience"),
        (("topic", "topics", "key topics"), "Key Topics", "key_topics"),
    ]

    for keywords, label, field_name in field_map:
        if any(keyword in q for keyword in keywords):
            return _field_answer(
                label,
                field_name,
                question,
                analysis_a,
                analysis_b
            )

    answer = (
        "**Quick Comparison**\n"
        f"{_metric_line('Video A', metadata_a)}\n"
        f"{_metric_line('Video B', metadata_b)}\n\n"
        "**Content Signals**\n"
        f"- **Video A Hook:** {_analysis_value(analysis_a, 'hook')}\n"
        f"- **Video B Hook:** {_analysis_value(analysis_b, 'hook')}\n"
        f"- **Video A CTA:** {_analysis_value(analysis_a, 'cta')}\n"
        f"- **Video B CTA:** {_analysis_value(analysis_b, 'cta')}\n\n"
        "**Next Step**\n"
        "- Ask about a specific area like hook, CTA, tone, audience, summary, "
        "or topics for a more focused answer."
    )

    if llm_error:
        answer += (
            "\n\n**Note**\n"
            "- Gemini is currently unavailable or quota-limited, so this answer "
            "uses the stored video analysis instead."
        )

    return answer


def _is_direct_analysis_question(question):
    q = question.lower()
    direct_keywords = (
        "hook",
        "hooks",
        "opening",
        "summary",
        "summarize",
        "cta",
        "call to action",
        "tone",
        "audience",
        "target audience",
        "topic",
        "topics",
        "key topics",
    )

    return any(keyword in q for keyword in direct_keywords)


@router.post("/", response_model=ChatResponse)
async def chat(
    request: ChatRequest
):
    question = request.question.strip()
    print("QUESTION:", question)

    if not question:
        return {
            "answer": "Please enter a question before sending.",
            "citations": [],
            "metadata": {
                "video_A": {},
                "video_B": {}
            }
        }

    # Guard: check that videos have been analyzed
    if not video_metadata.get("video_A") or not video_metadata.get("video_B"):
        return {
            "answer": "Please analyze two videos first before asking questions. "
                      "Go to the Compare page and submit two video URLs.",
            "citations": [],
            "metadata": {
                "video_A": {},
                "video_B": {}
            }
        }

    metadata_a = video_metadata.get(
        "video_A",
        {}
    )

    analysis_a = metadata_a.get(
        "analysis",
        {}
    )

    metadata_b = video_metadata.get(
        "video_B",
        {}
    )

    analysis_b = metadata_b.get(
        "analysis",
        {}
    )

    try:
        results_a = retrieve_context(
            question,
            "video_A"
        )
    except Exception as e:
        print(f"Retrieval error for video_A: {e}")
        results_a = {"documents": [], "metadatas": [], "ids": []}

    try:
        results_b = retrieve_context(
            question,
            "video_B"
        )
    except Exception as e:
        print(f"Retrieval error for video_B: {e}")
        results_b = {"documents": [], "metadatas": [], "ids": []}

    docs_a = (
        results_a["documents"]
        if results_a["documents"]
        else []
    )

    docs_b = (
        results_b["documents"]
        if results_b["documents"]
        else []
    )

    meta_a = (
        results_a["metadatas"]
        if results_a["metadatas"]
        else []
    )

    meta_b = (
        results_b["metadatas"]
        if results_b["metadatas"]
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

VIDEO A ANALYSIS
Hook:
{analysis_a.get("hook", "N/A")}

Summary:
{analysis_a.get("summary", "N/A")}

CTA:
{analysis_a.get("cta", "N/A")}

Tone:
{analysis_a.get("tone", "N/A")}

Target Audience:
{analysis_a.get("target_audience", "N/A")}

Key Topics:
{analysis_a.get("key_topics", [])}
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


VIDEO B ANALYSIS

Hook:
{analysis_b.get("hook", "N/A")}

Summary:
{analysis_b.get("summary", "N/A")}

CTA:
{analysis_b.get("cta", "N/A")}

Tone:
{analysis_b.get("tone", "N/A")}

Target Audience:
{analysis_b.get("target_audience", "N/A")}

Key Topics:
{analysis_b.get("key_topics", [])}

VIDEO B TRANSCRIPT

{chr(10).join(docs_b)}
"""

    try:
        answer = generate_answer(
            question,
            context
        )
    except Exception as e:
        print(f"LLM ERROR: {e}")
        answer = _build_local_answer(
            question,
            metadata_a,
            metadata_b,
            analysis_a,
            analysis_b,
            e
        )

    citations = []

    for m in meta_a:
        citations.append(
            {
                "video":
                "video_A",

                "chunk_id":
                m.get("chunk_id", "")
            }
        )

    for m in meta_b:
        citations.append(
            {
                "video":
                "video_B",

                "chunk_id":
                m.get("chunk_id", "")
            }
        )

    return {
        "answer": answer,

        "citations":
        citations,

        "metadata": {
            "video_A":
            metadata_a,

            "video_B":
            metadata_b
        }
    }
