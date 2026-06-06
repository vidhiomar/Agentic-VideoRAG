import { ChatResponse } from "@/types/chat";
import { Video } from "@/types/video";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export interface AnalyzeVideosResponse {
  message?: string;
  error?: string;
  video_A?: Video;
  video_B?: Video;
}

export interface DocumentCountResponse {
  count: number;
}

export type MetadataResponse = Record<string, Partial<Video>>;

export interface SearchVideosResponse {
  documents: string[];
  metadatas?: Array<{
    chunk_id?: string | number;
  }>;
  ids?: string[];
}

async function parseResponse<T>(
  response: Response,
  fallbackMessage: string
): Promise<T> {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const detail =
      typeof data?.detail === "string"
        ? data.detail
        : typeof data?.error === "string"
          ? data.error
          : fallbackMessage;

    throw new Error(detail);
  }

  return data as T;
}

export async function analyzeVideos(
  videoA: string,
  videoB: string
): Promise<AnalyzeVideosResponse> {
  const response = await fetch(
    `${API_URL}/videos/analyze`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        video_a: videoA,
        video_b: videoB,
      }),
    }
  );

  return parseResponse<AnalyzeVideosResponse>(
    response,
    "Failed to analyze videos"
  );
}

export async function chatWithAI(question: string): Promise<ChatResponse> {
  const response = await fetch(
    `${API_URL}/chat/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: question.trim() }),
    }
  );

  return parseResponse<ChatResponse>(
    response,
    "Failed to get AI response"
  );
}

export async function getMetadata(): Promise<MetadataResponse> {
  const response = await fetch(
    `${API_URL}/videos/metadata`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch metadata");
  }

  return response.json();
}

export async function getDocumentCount(): Promise<DocumentCountResponse> {
  const response = await fetch(
    `${API_URL}/videos/count`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch document count");
  }

  return response.json();
}

export async function searchVideos(
  query: string
): Promise<SearchVideosResponse> {
  const response = await fetch(
    `${API_URL}/videos/search?query=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Failed to search videos");
  }

  return response.json();
}

export async function resetData() {
  const response = await fetch(
    `${API_URL}/videos/reset`
  );

  if (!response.ok) {
    throw new Error("Failed to reset data");
  }

  return response.json();
}
