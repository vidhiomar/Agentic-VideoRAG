import os
from dotenv import load_dotenv
import google.generativeai as genai
load_dotenv()
genai.configure(
    api_key=os.getenv(
        "GEMINI_API_KEY"
    )
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)

def generate_answer(
    question: str,
    context: str
):
    prompt = f"""
You are an expert YouTube and social media content strategist.

You have access to:

1. Video metadata
2. Video transcript chunks
3. Hook analysis
4. CTA analysis
5. Audience analysis
6. Engagement metrics

Rules:

- Explain WHY differences occur.
- Do not only compare numbers.
- Analyze hook quality.
- Analyze audience targeting.
- Analyze tone.
- Analyze CTA strength.
- Give actionable insights.
- Use bullet points.

Question:
{question}

Context:
{context}
"""
    
    response = model.generate_content(
        prompt
    )

    return response.text