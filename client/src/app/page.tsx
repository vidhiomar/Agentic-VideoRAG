"use client";

import UrlInput from "@/components/UrlInput";
import VideoCard from "@/components/VideoCard";
import { Video } from "@/types/video";
import ChatPanel from "@/components/ChatPanel";

export default function Home() {
  const handleAnalyze = (
    videoA: string,
    videoB: string
  ) => {
    console.log(videoA, videoB);
  };

  const mockVideoA: Video = {
    id: "1",
    title: "How I grew to 100k followers in 30 days",
    creator: "Creator A",
    platform: "youtube",
    thumbnail:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4",
    views: 120000,
    likes: 9200,
    comments: 850,
    followers: 500000,
    duration: "08:32",
    uploadDate: "2026-05-10",
    engagementRate: 8.37,
  };

  const mockVideoB: Video = {
    id: "2",
    title: "Instagram Growth Secrets",
    creator: "Creator B",
    platform: "instagram",
    thumbnail:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    views: 90000,
    likes: 5000,
    comments: 300,
    followers: 150000,
    duration: "01:12",
    uploadDate: "2026-05-12",
    engagementRate: 5.88,
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-center mb-8">
          Agentic VideoRAG
        </h1>

        <UrlInput onAnalyze={handleAnalyze} />

        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <VideoCard video={mockVideoA} />
          <VideoCard video={mockVideoB} />
        </div>
        <div className="mt-10">
          <ChatPanel />
        </div>
      </div>
    </main>
  );
}