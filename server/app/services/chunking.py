from langchain_experimental.text_splitter import (
    SemanticChunker
)

from langchain_huggingface import (
    HuggingFaceEmbeddings
)

embedding_model = (
    HuggingFaceEmbeddings(
        model_name="BAAI/bge-small-en-v1.5"
    )
)


def semantic_chunk_text(
    transcript: str
):
    splitter = SemanticChunker(
        embeddings=embedding_model,

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