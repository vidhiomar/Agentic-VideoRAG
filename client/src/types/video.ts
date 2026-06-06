export interface VideoAnalysis {
  hook: string;
  summary: string;
  cta: string;
  tone: string;
  target_audience: string;
  key_topics: string[];
}

export interface Video {
  id?: string;
  title: string;
  creator: string;
  thumbnail: string;
  platform: "youtube" | "instagram";

  views: number;
  likes: number;
  comments: number;

  followers?: number;

  duration?: string;
  upload_date?: string;

  engagement_rate: number;

  analysis?: VideoAnalysis;
}