from langchain_experimental.text_splitter import (
    SemanticChunker
)

from langchain_huggingface import (
    HuggingFaceEmbeddings
)


embeddings = HuggingFaceEmbeddings(
    model_name="BAAI/bge-small-en-v1.5"
)


def semantic_chunk_text(
    transcript: str
):
    splitter = SemanticChunker(
        embeddings
    )

    chunks = splitter.create_documents(
        [transcript]
    )

    return chunks