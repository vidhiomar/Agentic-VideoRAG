from youtube_transcript_api import YouTubeTranscriptApi
import re


def extract_video_id(url: str):
    pattern = r"(?:v=|\/)([0-9A-Za-z_-]{11})"
    match = re.search(pattern, url)
    if match:
        return match.group(1)
    return None


def get_transcript(url: str):
    try:
        video_id = extract_video_id(url)

        if not video_id:
            return ""

        api = YouTubeTranscriptApi()

        # Try English first
        try:
            transcript = api.fetch(
                video_id,
                languages=["en", "en-US", "en-GB"]
            )
        except Exception:
            # Fallback to Hindi
            try:
                transcript = api.fetch(
                    video_id,
                    languages=["hi"]
                )
            except Exception:
                # Last resort: fetch in any available language
                transcript_list = api.list(video_id)
                # list() returns an iterable of TranscriptInfo objects
                first = next(iter(transcript_list), None)
                if first is None:
                    return ""
                transcript = first.fetch()

        # Both old (.text attribute) and new API (snippet objects) handled here
        parts = []
        for chunk in transcript:
            if isinstance(chunk, dict):
                parts.append(chunk.get("text", ""))
            elif hasattr(chunk, "text"):
                parts.append(chunk.text)
            else:
                parts.append(str(chunk))

        return " ".join(parts)

    except Exception as e:
        print(f"Transcript Error: {e}")
        return ""