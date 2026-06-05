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

You have access to:

1. Video metadata
2. Transcript chunks

Rules:
- Use only the provided context.
- Compare Video A and Video B when relevant.
- Use engagement rates when discussing performance.
- Use bullet points.
- Be concise and specific.
- If information is unavailable, say so.

Question:
{question}

Context:
{context}
"""
    
    response = model.generate_content(
        prompt
    )

    return response.text