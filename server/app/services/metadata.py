import yt_dlp


def extract_metadata(url: str):
    ydl_opts = {
        "quiet": True,
        "skip_download": True,
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=False)

    views = info.get("view_count", 0)
    likes = info.get("like_count", 0)
    comments = info.get("comment_count", 0)

    engagement_rate = 0

    if views:
        engagement_rate = (
            (likes + comments) / views
        ) * 100

    return {
        "title": info.get("title"),
        "creator": info.get("uploader"),
        "thumbnail": info.get("thumbnail"),
        "views": views,
        "likes": likes,
        "comments": comments,
        "duration": info.get("duration"),
        "upload_date": info.get("upload_date"),
        "engagement_rate": round(
            engagement_rate,
            2,
        ),
    }