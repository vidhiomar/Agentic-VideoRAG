from youtube_transcript_api import (
    YouTubeTranscriptApi
)
import re


def extract_video_id(url: str):
    pattern = r"(?:v=|\/)([0-9A-Za-z_-]{11})"

    match = re.search(
        pattern,
        url
    )

    if match:
        return match.group(1)

    return None


def get_transcript(url: str):
    try:
        video_id = extract_video_id(
            url
        )

        if not video_id:
            return ""

        api = YouTubeTranscriptApi()

        # Try English first
        try:
            transcript = api.fetch(
                video_id,
                languages=[
                    "en",
                    "en-US",
                    "en-GB"
                ]
            )

        # Fallback to Hindi
        except Exception:
            transcript = api.fetch(
                video_id,
                languages=["hi"]
            )

        return " ".join(
            chunk.text
            for chunk in transcript
        )

    except Exception as e:
        print(
            f"Transcript Error: {e}"
        )
        return ""