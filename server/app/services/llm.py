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
You are an expert social media
video analyst.

You are given chunks from:

VIDEO A
VIDEO B

Compare them carefully.

Answer the question using
evidence from both videos.

If one video performs better,
explain why.

Context:

{context}

Question:

{question}
"""

    response = model.generate_content(
        prompt
    )

    return response.text