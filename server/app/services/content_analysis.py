import json

from app.services.llm import (
    model
)


def analyze_content(
    transcript: str
):
    prompt = f"""
You are an expert video content analyst.

Analyze the transcript and return ONLY a valid JSON object.

Do NOT add explanations.
Do NOT use markdown.
Do NOT wrap the response in ```json.

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

{transcript[:5000]}
"""

    try:

        response = model.generate_content(
            prompt
        )

        text = response.text.strip()

        print("\n========== GEMINI RAW OUTPUT ==========")
        print(text)
        print("=======================================\n")

        text = text.replace(
            "```json",
            ""
        )

        text = text.replace(
            "```",
            ""
        )

        text = text.strip()

        data = json.loads(
            text
        )

        return data

    except Exception as e:

        print(
            "CONTENT ANALYSIS ERROR:",
            e
        )

        return {
            "hook": "",
            "summary": "",
            "cta": "",
            "tone": "",
            "target_audience": "",
            "key_topics": []
        }