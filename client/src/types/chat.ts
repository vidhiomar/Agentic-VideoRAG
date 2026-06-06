export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface Citation {
  video: string;
  chunk_id: string;
}

export interface ChatResponse {
  answer: string;
  citations: Citation[];
  metadata: {
    video_A: Record<string, unknown>;
    video_B: Record<string, unknown>;
  };
}