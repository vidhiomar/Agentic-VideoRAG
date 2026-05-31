from pydantic import BaseModel


class AnalyzeRequest(BaseModel):
    video_a: str
    video_b: str