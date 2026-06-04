from app.services.vector_store import (
    collection
)

from app.services.embedding import (
    embed_text
)


def store_chunks(
    video_id: str,
    chunks
):
    print(
        f"STORE_CHUNKS CALLED: {video_id}"
    )

    for idx, chunk in enumerate(chunks):

        embedding = embed_text(
            chunk.page_content
        )

        collection.add(
            ids=[
                f"{video_id}_{idx}"
            ],

            embeddings=[
                embedding
            ],

            documents=[
                chunk.page_content
            ],

            metadatas=[
                {
                    "video_id":video_id,

                    "chunk_id":idx,

                    "source": video_id
                }
            ]
        )