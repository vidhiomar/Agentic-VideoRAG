from app.services.vector_store import (
    collection
)

from app.services.embedding import (
    embed_text
)


def retrieve_context(
    query: str,
    video_id : str,
    k: int = 5
):
    query_embedding = embed_text(
        query
    )

    results = collection.query(
        query_embeddings=[
            query_embedding
        ],
        n_results=k,

        where={
            "video_id": video_id
        }
    )

    return results