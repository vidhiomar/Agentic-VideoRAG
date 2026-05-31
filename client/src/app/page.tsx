"use client";

import { useState } from "react";

import UrlInput from "@/components/UrlInput";
import VideoCard from "@/components/VideoCard";
import ChatPanel from "@/components/ChatPanel";
import NavBar from "@/components/NavBar";

import { analyzeVideos } from "@/lib/api";

export default function Home() {
  const [videoA, setVideoA] = useState<any>(null);
  const [videoB, setVideoB] = useState<any>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async (
    urlA: string,
    urlB: string
  ) => {
    try {
      setLoading(true);
      setError("");

      const data = await analyzeVideos(
        urlA,
        urlB
      );

      setVideoA({
        ...data.videoA,
        platform: "youtube",
        engagementRate:
          data.videoA.engagement_rate,
        uploadDate:
          data.videoA.upload_date,
      });

      setVideoB({
        ...data.videoB,
        platform: "youtube",
        engagementRate:
          data.videoB.engagement_rate,
        uploadDate:
          data.videoB.upload_date,
      });
    } catch (error) {
      console.error(error);

      setError(
        "Failed to analyze videos. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />

      {/* Background Orbs */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />
      <div className="bg-orb bg-orb-4" />

      <main
        className="relative min-h-screen z-10"
        style={{ paddingTop: "80px" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-10">

          {/* Hero */}
          <div className="text-center mb-14 animate-fadeInUp">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{
                background: "var(--accent-soft)",
                border:
                  "1px solid rgba(232, 85, 58, 0.15)",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "var(--accent)",
                  display: "inline-block",
                  animation:
                    "pulseGlow 2s ease-in-out infinite",
                }}
              />

              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "var(--accent)",
                }}
              >
                AI-Powered Video Intelligence
              </span>
            </div>

            <h1
              className="gradient-text"
              style={{
                fontSize:
                  "clamp(2.4rem, 5vw, 3.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                marginBottom: "16px",
              }}
            >
              Agentic VideoRAG
            </h1>

            <p
              style={{
                fontSize: "1.1rem",
                color: "var(--text-secondary)",
                maxWidth: "520px",
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              Compare videos, analyze engagement,
              and unlock content strategy insights
              with AI.
            </p>
          </div>

          {/* URL Input */}
          <div className="animate-fadeInUp delay-200">
            <UrlInput
              onAnalyze={handleAnalyze}
              isLoading={loading}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="mt-6 bg-red-50 border border-red-200 text-red-600 rounded-xl p-4">
              {error}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="mt-8 text-center">
              <p className="text-lg font-medium">
                Analyzing videos...
              </p>
            </div>
          )}

          {/* Video Comparison */}
          {videoA && videoB && (
            <div className="mt-14 animate-fadeInUp delay-300">
              <div className="section-label mb-6">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect
                    x="2"
                    y="3"
                    width="20"
                    height="14"
                    rx="2"
                    ry="2"
                  />
                  <line
                    x1="8"
                    y1="21"
                    x2="16"
                    y2="21"
                  />
                  <line
                    x1="12"
                    y1="17"
                    x2="12"
                    y2="21"
                  />
                </svg>

                Video Comparison
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <VideoCard
                  video={videoA}
                  index={0}
                />

                <VideoCard
                  video={videoB}
                  index={1}
                />
              </div>
            </div>
          )}

          {/* Chat */}
          {videoA && videoB && (
            <div className="mt-14 mb-10 animate-fadeInUp delay-500">
              <div className="section-label mb-6">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>

                AI Chat
              </div>

              <ChatPanel />
            </div>
          )}
        </div>
      </main>
    </>
  );
}