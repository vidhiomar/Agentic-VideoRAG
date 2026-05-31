export interface Video {
  id: string;
  title: string;
  creator: string;
  thumbnail: string;
  platform: "youtube" | "instagram";

  views: number;
  likes: number;
  comments: number;

  followers?: number;

  duration?: string;
  uploadDate?: string;

  engagementRate: number;
}