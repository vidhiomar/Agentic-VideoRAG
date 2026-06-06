from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.videos import router

from app.routes.chat import (
    router as chat_router
)


app = FastAPI(
    title="Agentic VideoRAG"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3001",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    router,
    prefix="/videos",
    tags=["Videos"],
)

app.include_router(
    chat_router,
    prefix="/chat",
    tags=["Chat"]
)


@app.get("/")
def root():
    return {
        "message": "Agentic VideoRAG API"
    }