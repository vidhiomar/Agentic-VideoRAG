from typing import Any

from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    question: str = Field(min_length=1)


class Citation(BaseModel):
    video: str
    chunk_id: int | str


class ChatResponse(BaseModel):
    answer: str
    citations: list[Citation] = []
    metadata: dict[str, dict[str, Any]] = {
        "video_A": {},
        "video_B": {}
    }
