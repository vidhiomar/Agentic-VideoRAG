import json

from app.services.llm import (
    model
)


def analyze_content(
    transcript: str
):
    prompt = f"""
Analyze this video transcript.

Return ONLY valid JSON.

Required format:

{{
    "hook": "",
    "summary": "",
    "cta": "",
    "tone": "",
    "target_audience": "",
    "key_topics": []
}}

Transcript:

{transcript[:6000]}
"""

    response = model.generate_content(
        prompt
    )

    try:
        return json.loads(
            response.text
        )

    except:
        return {
            "hook": "",
            "summary": "",
            "cta": "",
            "tone": "",
            "target_audience": "",
            "key_topics": []
        }