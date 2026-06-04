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
You are an expert social media analyst.

Answer using ONLY the provided context.

Rules:
- Be concise.
- Use bullet points.
- Compare Video A and Video B directly.
- If information is missing, say so.
- Do not make assumptions.

Context:
{context}

Question:
{question}
"""

    response = model.generate_content(
        prompt
    )

    return response.text