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

You have:

1. Metadata
2. Transcript chunks

Use both.

When comparing videos:
- Compare engagement
- Compare content
- Compare hooks
- Compare creators

Use bullet points.

Question:

{question}

Context:

{context}
"""

    response = model.generate_content(
        prompt
    )

    return response.text