from fastapi import APIRouter

from app.schemas.video import AnalyzeRequest

from app.services.metadata import extract_metadata
from app.services.transcript import get_transcript

from app.services.retriever import (
    retrieve_context
)

router = APIRouter()


@router.post("/analyze")
async def analyze_videos(
    request: AnalyzeRequest,
):
    video_a = extract_metadata(
        request.video_a
    )

    video_b = extract_metadata(
        request.video_b
    )

    return {
        "videoA": video_a,
        "videoB": video_b,
    }


@router.post("/transcript")
async def transcript(
    request: AnalyzeRequest,
):
    transcript = get_transcript(
        request.video_a
    )

    return {
        "transcript": transcript[:1000]
    }

@router.get("/search")
async def search(
    query: str
):
    results = retrieve_context(
        query
    )

    return results