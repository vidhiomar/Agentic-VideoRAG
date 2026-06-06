import os
from dotenv import load_dotenv

try:
    from google import genai as google_genai
except ImportError:
    google_genai = None

load_dotenv()

MODEL_NAME = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")

_configured = False
_client = None


def _get_api_key() -> str:
    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")

    if api_key:
        return api_key

    raise RuntimeError(
        "Gemini API key is missing. Set GEMINI_API_KEY in server/.env."
    )


def generate_text(prompt: str) -> str:
    global _configured, _client

    api_key = _get_api_key()

    if google_genai:
        if _client is None:
            _client = google_genai.Client(api_key=api_key)

        response = _client.models.generate_content(
            model=MODEL_NAME,
            contents=prompt
        )
    else:
        import google.generativeai as legacy_genai

        if not _configured:
            legacy_genai.configure(api_key=api_key)
            _configured = True

        response = legacy_genai.GenerativeModel(MODEL_NAME).generate_content(
            prompt
        )

    # Safely extract text — for thinking models .text may raise or be None
    response_text = None
    try:
        response_text = response.text
    except Exception:
        pass

    # Fallback: walk candidates → parts to find text
    if not response_text:
        try:
            for candidate in response.candidates:
                for part in candidate.content.parts:
                    if hasattr(part, "text") and part.text:
                        response_text = part.text
                        break
                if response_text:
                    break
        except Exception:
            pass

    if not response_text:
        raise RuntimeError(
            "Gemini returned an empty response."
        )

    return response_text.strip()



def generate_answer(
    question: str,
    context: str
):

    print("\nQUESTION SENT TO LLM:")
    print(question)

    print("\nCONTEXT SENT TO LLM:")
    print(context[:3000])
    prompt = f"""
You are a senior YouTube, Instagram Reels, and short-form video strategist.
Your job is to answer the user's question with a sharp, useful, evidence-based
comparison of Video A and Video B.

Use the provided metadata, AI analysis, and transcript snippets. Do not invent
facts that are not present in the context. If a transcript snippet is limited,
say that the answer is based on the available retrieved context.

Answer quality rules:
- Start with a clear verdict in 1-2 sentences.
- Explain WHY the stronger video performs better, not just WHAT the numbers are.
- Compare reach and engagement separately when metrics are available.
- Mention hook quality, audience targeting, tone, CTA strength, and content depth
  only when relevant to the user's question.
- Prefer insight over generic praise. Be specific and practical.
- Include tradeoffs. A video can win on views while losing on engagement quality.
- End with 3-5 actionable recommendations.
- Keep the answer concise enough for a chat message.

Formatting rules:
- Use markdown-style headings with **bold text** for section labels.
- Use short bullet points.
- Do not use tables.
- Do not wrap the whole response in code blocks.
- Avoid filler like "as an AI" or "based on the provided context" unless needed.

Recommended answer structure:
**Verdict**
Give the direct answer.

**Why**
- Explain the main reasons using evidence from metrics, metadata, analysis,
  and transcript snippets.

**Video A vs Video B**
- Compare strengths and weaknesses.

**Actionable Improvements**
- Give practical next steps for the weaker video or both videos.

User question:
{question}

Retrieved video context:
{context}
"""

    return generate_text(prompt)
