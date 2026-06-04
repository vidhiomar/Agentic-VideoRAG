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
You are a video analysis assistant.

Context:
{context}

Question:
{question}

Answer based only on the context.
"""

    response = model.generate_content(
        prompt
    )

    return response.text