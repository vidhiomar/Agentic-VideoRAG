from typing import List

from sentence_transformers import SentenceTransformer

_model = None


def _get_model():
    global _model

    if _model is None:
        _model = SentenceTransformer(
            "BAAI/bge-small-en-v1.5"
        )

    return _model


def embed_text(text: str):
    return _get_model().encode(text).tolist()


def embed_texts(texts: List[str]):
    """Batch embed multiple texts at once - much faster than one-by-one."""
    return _get_model().encode(texts).tolist()
