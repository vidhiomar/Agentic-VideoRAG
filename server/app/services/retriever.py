from app.services.vector_store import collection
from app.services.embedding import embed_text


def retrieve_context(
    query: str,
    video_id: str,
    k: int = 3
):
    # Guard: check how many chunks exist for this video before querying
    # ChromaDB raises an error if n_results > number of elements in the collection
    try:
        existing = collection.get(where={"video_id": video_id})
        available = len(existing["ids"])
    except Exception:
        available = 0

    if available == 0:
        return {"documents": [], "metadatas": [], "ids": []}

    # Clamp k to available documents
    n_results = min(k, available)

    query_embedding = embed_text(query)

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=n_results,
        where={"video_id": video_id}
    )

    return {
        "documents": results["documents"][0],
        "metadatas": results["metadatas"][0],
        "ids": results["ids"][0]
    }