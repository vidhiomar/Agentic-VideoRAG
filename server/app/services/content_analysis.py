import json
import re

from app.services.llm import (
    generate_text
)

REQUIRED_FIELDS = {
    "hook": "",
    "summary": "",
    "cta": "",
    "tone": "",
    "target_audience": "",
    "key_topics": []
}


def _clean_json_text(text: str):
    text = text.strip()
    text = text.replace("```json", "")
    text = text.replace("```", "")
    text = text.strip()

    match = re.search(r"\{.*\}", text, re.DOTALL)

    if match:
        return match.group(0)

    return text


def _normalize_analysis(data: dict, transcript: str):
    normalized = REQUIRED_FIELDS.copy()

    for key in normalized:
        value = data.get(key)

        if key == "key_topics":
            normalized[key] = value if isinstance(value, list) else []
        elif isinstance(value, str):
            normalized[key] = value.strip()

    fallback = _fallback_analysis(transcript)

    for key, value in normalized.items():
        if value:
            continue

        normalized[key] = fallback[key]

    return normalized


def _fallback_analysis(transcript: str):
    compact = " ".join(transcript.split())
    lower = compact.lower()
    words = compact.split()
    opening = " ".join(words[:45])
    summary = " ".join(words[:90])

    cta_parts = []
    if "subscribe" in lower:
        cta_parts.append("subscribe")
    if "comment" in lower:
        cta_parts.append("comment")
    if "like" in lower:
        cta_parts.append("like")
    if "follow" in lower:
        cta_parts.append("follow")
    if "share" in lower:
        cta_parts.append("share")
    if "notification" in lower or "bell" in lower:
        cta_parts.append("enable notifications")

    # Generic broad-category topic detection
    topic_map = [
        ("python", "Python"),
        ("javascript", "JavaScript"),
        ("coding", "Coding"),
        ("programming", "Programming"),
        ("leetcode", "LeetCode"),
        ("interview", "Interview Prep"),
        ("tutorial", "Tutorial"),
        ("fitness", "Fitness"),
        ("workout", "Workout"),
        ("gym", "Gym"),
        ("recipe", "Cooking"),
        ("food", "Food"),
        ("travel", "Travel"),
        ("vlog", "Vlog"),
        ("review", "Review"),
        ("unboxing", "Unboxing"),
        ("finance", "Finance"),
        ("invest", "Investing"),
        ("business", "Business"),
        ("marketing", "Marketing"),
        ("gaming", "Gaming"),
        ("music", "Music"),
        ("science", "Science"),
        ("technology", "Technology"),
        ("ai", "Artificial Intelligence"),
        ("machine learning", "Machine Learning"),
        ("design", "Design"),
        ("photography", "Photography"),
        ("health", "Health"),
        ("motivation", "Motivation"),
        ("education", "Education"),
        ("news", "News"),
        ("sports", "Sports"),
        ("comedy", "Comedy"),
        ("fashion", "Fashion"),
        ("beauty", "Beauty"),
        ("art", "Art"),
    ]

    topics = []
    for keyword, label in topic_map:
        if keyword in lower and label not in topics:
            topics.append(label)
        if len(topics) >= 6:
            break

    return {
        "hook": opening or "Opening hook could not be extracted from the transcript.",
        "summary": summary or "Summary could not be extracted from the transcript.",
        "cta": (
            "Creator asks viewers to " + ", ".join(cta_parts) + "."
            if cta_parts
            else "No clear call to action found in the available transcript."
        ),
        "tone": "Conversational and engaging",
        "target_audience": (
            "General audience interested in " + ", ".join(topics[:3]) + "."
            if topics
            else "General viewers interested in the video's topic."
        ),
        "key_topics": topics[:6] if topics else ["General Content"],
    }


def analyze_content(
    transcript: str
):
    transcript_sample = transcript[:7000]

    prompt = f"""
You are an expert video content analyst.

Analyze the transcript and return ONLY a valid JSON object.

Do NOT add explanations.
Do NOT use markdown.
Do NOT wrap the response in ```json.
Do NOT leave fields empty. If a field is uncertain, infer the best concise value
from the transcript.

Required JSON format:

{{
    "hook": "Opening hook of the video",
    "summary": "Short summary of the video",
    "cta": "Call to action used by creator",
    "tone": "Tone of the video",
    "target_audience": "Target audience",
    "key_topics": [
        "topic1",
        "topic2"
    ]
}}

Transcript:

{transcript_sample}
"""

    try:

        text = generate_text(prompt)

        print("\n========== GEMINI RAW OUTPUT ==========")
        print(text)
        print("=======================================\n")

        text = _clean_json_text(text)

        data = json.loads(
            text
        )

        return _normalize_analysis(
            data,
            transcript
        )

    except Exception as e:

        print(
            "CONTENT ANALYSIS ERROR:",
            e
        )

        return _fallback_analysis(transcript)
