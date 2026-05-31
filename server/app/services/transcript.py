from youtube_transcript_api import YouTubeTranscriptApi
import re


def extract_video_id(url: str):
    pattern = r"(?:v=|\/)([0-9A-Za-z_-]{11})"
    match = re.search(pattern, url)

    if match:
        return match.group(1)

    return None


def get_transcript(url: str):
    video_id = extract_video_id(url)

    transcript_list = YouTubeTranscriptApi().fetch(video_id)

    full_text = " ".join(
        chunk.text
        for chunk in transcript_list
    )

    return full_text