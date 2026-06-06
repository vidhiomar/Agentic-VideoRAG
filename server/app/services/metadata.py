import re
from datetime import datetime

import yt_dlp


def format_duration(seconds):
    """Convert seconds (int) to a human-readable string like '5:32' or '1:02:15'."""
    if not seconds or not isinstance(seconds, (int, float)):
        return "N/A"

    seconds = int(seconds)
    hours = seconds // 3600
    minutes = (seconds % 3600) // 60
    secs = seconds % 60

    if hours > 0:
        return f"{hours}:{minutes:02d}:{secs:02d}"
    return f"{minutes}:{secs:02d}"


def format_upload_date(raw_date):
    """Convert YYYYMMDD string to 'Mar 15, 2024' format."""
    if not raw_date or not isinstance(raw_date, str):
        return ""

    try:
        dt = datetime.strptime(raw_date, "%Y%m%d")
        return dt.strftime("%b %d, %Y")
    except (ValueError, TypeError):
        return raw_date


def detect_platform(url: str) -> str:
    """Detect platform from URL."""
    if not url:
        return "youtube"

    url_lower = url.lower()
    if "instagram.com" in url_lower or "instagr.am" in url_lower:
        return "instagram"
    return "youtube"


def extract_metadata(url: str):
    ydl_opts = {
        "quiet": True,
        "skip_download": True,
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=False)

    views = info.get("view_count") or 0
    likes = info.get("like_count") or 0
    comments = info.get("comment_count") or 0

    engagement_rate = 0

    if views > 0:
        engagement_rate = (
            (likes + comments) / views
        ) * 100

    raw_duration = info.get("duration")
    raw_upload_date = info.get("upload_date")

    return {
        "title": info.get("title", "Untitled"),
        "creator": info.get("uploader", "Unknown"),
        "thumbnail": info.get("thumbnail", ""),
        "platform": detect_platform(url),
        "views": views,
        "likes": likes,
        "comments": comments,
        "duration": format_duration(raw_duration),
        "upload_date": format_upload_date(raw_upload_date),
        "engagement_rate": round(
            engagement_rate,
            2,
        ),
    }