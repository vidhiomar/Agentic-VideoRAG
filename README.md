<div align="center">

# 🎬 Agentic VideoRAG

**AI-Powered Social Media Video Comparison & Intelligence**

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Gemini](https://img.shields.io/badge/Gemini_2.5_Flash-8E75B2?style=for-the-badge&logo=googlebard&logoColor=white)](https://deepmind.google/technologies/gemini/)
[![ChromaDB](https://img.shields.io/badge/ChromaDB-Vector_Store-FF9800?style=for-the-badge)](https://www.trychroma.com/)

<br/>

<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Movie%20Camera.png" alt="Movie Camera" width="100" height="100" />

*Stop guessing why a video went viral. Start analyzing.*

</div>

---

## ⚡ Overview

**Agentic VideoRAG** is a full-stack intelligence platform built for content creators, marketers, and developers. It allows you to input URLs for any two social media videos (YouTube Shorts, Long-form, or Instagram Reels) and instantly receive a deep, AI-driven comparative analysis.

Instead of just looking at vanity metrics (views, likes), Agentic VideoRAG fetches the metadata and actual video transcripts, runs them through **Google's Gemini 2.5 Flash**, and stores them in a local **ChromaDB** vector database. 

You can then **chat directly with your videos** using a Retrieval-Augmented Generation (RAG) pipeline to ask specific questions like *"Why did Video A's hook perform better?"*

---

## ✨ Features

- 🚀 **Parallel Processing Pipeline:** Fetches metadata (`yt-dlp`) and captions (`youtube-transcript-api`) simultaneously for lightning-fast results.
- 🧠 **AI Content Analysis:** Automatically extracts Hooks, Summaries, Calls-to-Action, Target Audiences, and Key Topics.
- 💬 **Agentic RAG Chat:** Ask questions about the videos. The AI retrieves relevant transcript chunks using `BAAI/bge-small-en-v1.5` embeddings to provide evidence-based answers.
- 🎨 **Glassmorphism UI:** A stunning, modern Next.js interface with Tailwind CSS, custom design tokens, and fluid micro-animations.

---

## 🏗️ Architecture & Data Flow

### 1. System Architecture

```mermaid
graph TD
    classDef frontend fill:#111,stroke:#333,stroke-width:2px,color:#fff
    classDef backend fill:#009688,stroke:#00796B,stroke-width:2px,color:#fff
    classDef ai fill:#8E75B2,stroke:#673AB7,stroke-width:2px,color:#fff
    classDef db fill:#FF9800,stroke:#F57C00,stroke-width:2px,color:#fff

    A[Next.js Frontend]:::frontend <-->|REST API| B(FastAPI Backend):::backend
    
    subgraph Data Extraction
        B --> C[yt-dlp Metadata]:::backend
        B --> D[YouTube Transcript API]:::backend
    end
    
    subgraph AI Intelligence
        D -->|Transcript| E[Gemini 2.5 Flash Analysis]:::ai
        D -->|Text| F[Semantic Chunking]:::ai
        F -->|Embeddings| G[BGE Small En v1.5]:::ai
    end
    
    subgraph Storage
        C --> H[(In-Memory Metadata)]:::db
        E --> H
        G --> I[(ChromaDB Vector Store)]:::db
    end
```

### 2. RAG Chat Workflow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Next.js UI
    participant B as FastAPI
    participant V as ChromaDB
    participant L as Gemini 2.5

    U->>F: "Why did Video A get more likes?"
    F->>B: POST /chat {question}
    B->>V: Query Embeddings (Top K chunks)
    V-->>B: Relevant Transcript Context
    B->>L: Prompt + Context + Question
    Note over B,L: AI Strategist Persona analyzes context
    L-->>B: Actionable Comparison Response
    B-->>F: Formatted Chat Message
    F-->>U: Displays insights with fluid animations
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- A Google Gemini API Key

### 1. Backend Setup (FastAPI)

```bash
# Navigate to the backend directory
cd server

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create an environment file
echo "GEMINI_API_KEY=your_api_key_here" > .env

# Run the backend server
uvicorn app.main:app --reload --port 8000
```

### 2. Frontend Setup (Next.js)

```bash
# Navigate to the frontend directory
cd client

# Install dependencies
npm install

# Run the development server
npm run dev
```

Visit `http://localhost:3000` to start analyzing videos!

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15 (React 19)
- **Styling:** Tailwind CSS v4 + Vanilla CSS (Glassmorphism & animations)
- **Icons:** Lucide React / SVG

### Backend
- **Framework:** FastAPI
- **Concurrency:** Asyncio + ThreadPoolExecutor
- **Video Extraction:** `yt-dlp`, `youtube-transcript-api`

### AI & Vector Storage
- **LLM:** Google Gemini 2.5 Flash (`google-genai` SDK)
- **Embeddings:** `BAAI/bge-small-en-v1.5` (via `langchain-huggingface`)
- **Database:** ChromaDB (Local persistent/in-memory)

---

## 🤝 Contributing
Contributions are always welcome! Feel free to open a pull request or an issue if you have suggestions for improvement.

<div align="center">
  <br/>
  <p>Made with ❤️ for Video Creators and Analysts</p>
</div>
