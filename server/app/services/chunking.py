from langchain_experimental.text_splitter import (
    SemanticChunker
)

from langchain_huggingface import (
    HuggingFaceEmbeddings
)

_embedding_model = None


def _get_embedding_model():
    global _embedding_model

    if _embedding_model is None:
        _embedding_model = HuggingFaceEmbeddings(
            model_name="BAAI/bge-small-en-v1.5"
        )

    return _embedding_model


def semantic_chunk_text(
    transcript: str
):
    splitter = SemanticChunker(
        embeddings=_get_embedding_model(),

        breakpoint_threshold_type=
        "percentile",

        breakpoint_threshold_amount=
        60
    )

    chunks = splitter.create_documents(
        [transcript]
    )

    print(
        f"Generated {len(chunks)} chunks"
    )

    return chunks
