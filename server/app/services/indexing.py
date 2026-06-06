from app.services.vector_store import (
    collection
)

from app.services.embedding import (
    embed_texts
)


def store_chunks(
    video_id,
    chunks
):
    # Delete existing chunks for this video
    existing = collection.get(
        where={
            "video_id": video_id
        }
    )

    if existing["ids"]:
        collection.delete(
            ids=existing["ids"]
        )

    if not chunks:
        return

    # Batch: extract all texts, embed all at once, insert all at once
    texts = [
        chunk.page_content
        for chunk in chunks
    ]

    ids = [
        f"{video_id}_{idx}"
        for idx in range(len(chunks))
    ]

    metadatas = [
        {
            "video_id": video_id,
            "chunk_id": str(idx),
            "source": video_id
        }
        for idx in range(len(chunks))
    ]

    # Single batch embedding call instead of N individual calls
    embeddings = embed_texts(texts)

    # Single batch insert instead of N individual inserts
    collection.add(
        ids=ids,
        embeddings=embeddings,
        documents=texts,
        metadatas=metadatas
    )

    print(
        f"Stored {len(chunks)} chunks for {video_id} (batch)"
    )