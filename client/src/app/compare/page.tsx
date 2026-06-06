"use client";

import { useState } from "react";

import UrlInput from "@/components/UrlInput";
import VideoCard from "@/components/VideoCard";
import ChatPanel from "@/components/ChatPanel";
import NavBar from "@/components/NavBar";
import AnalysisComparison from "@/components/AnalysisComparison";
import { analyzeVideos } from "@/lib/api";
import { Video } from "@/types/video";

export default function ComparePage() {
  const [videoA, setVideoA] = useState<Video | null>(null);
  const [videoB, setVideoB] = useState<Video | null>(null);
  const [chatKey, setChatKey] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async (urlA: string, urlB: string) => {
    // Clear previous results immediately so stale data isn't shown while loading
    setVideoA(null);
    setVideoB(null);
    setError("");
    setLoading(true);

    try {
      const data = await analyzeVideos(urlA, urlB);

      console.log("API RESPONSE:", data);

      if (data.error) {
        setError(data.error);
        return;
      }

      if (!data.video_A || !data.video_B) {
        setError("Backend did not return both video analysis results.");
        return;
      }

      setVideoA({
        ...data.video_A,
        engagement_rate: data.video_A.engagement_rate ?? 0,
      });

      setVideoB({
        ...data.video_B,
        engagement_rate: data.video_B.engagement_rate ?? 0,
      });

      // Increment key so ChatPanel unmounts and resets its message history
      setChatKey((k) => k + 1);
    } catch (err) {
      console.error(err);
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to analyze videos. Please check the URLs and try again.";
      setError(msg);
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
        className="relative min-h-screen z-10 page-enter"
        style={{ paddingTop: "80px" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Header */}
          <div className="text-center mb-14 animate-fadeInUp">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{
                background: "var(--accent-soft)",
                border: "1px solid rgba(232, 85, 58, 0.15)",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "var(--accent)",
                  display: "inline-block",
                  animation: "pulseGlow 2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "var(--accent)",
                }}
              >
                Video Comparison Tool
              </span>
            </div>

            <h1
              className="gradient-text"
              style={{
                fontSize: "clamp(2.4rem, 5vw, 3.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                marginBottom: "16px",
              }}
            >
              Compare Videos
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
              Compare videos, analyze engagement, and unlock content
              strategy insights with AI.
            </p>
          </div>

          {/* URL Input */}
          <div className="animate-fadeInUp delay-200">
            <UrlInput onAnalyze={handleAnalyze} isLoading={loading} />
          </div>

          {/* Error */}
          {error && (
            <div
              className="mt-6 animate-fadeInUp"
              style={{
                background: "#FEF2F2",
                border: "1px solid #FECACA",
                color: "#DC2626",
                borderRadius: "14px",
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "0.9rem",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div
              className="mt-10 animate-fadeInUp"
              style={{
                textAlign: "center",
                padding: "40px 20px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  border: "3px solid var(--border)",
                  borderTopColor: "var(--accent)",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                  margin: "0 auto 16px",
                }}
              />
              <p
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-space-grotesk, 'Space Grotesk'), sans-serif",
                  marginBottom: "6px",
                }}
              >
                Analyzing videos...
              </p>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-muted)",
                }}
              >
                Extracting transcripts, metadata, and running AI analysis. This may take a moment.
              </p>

              {/* Progress bar */}
              <div className="progress-bar" style={{ maxWidth: "300px", margin: "20px auto 0" }}>
                <div
                  className="progress-bar-fill"
                  style={{
                    animation: "progressBar 8s ease-in-out forwards",
                  }}
                />
              </div>
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
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
                Video Comparison
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <VideoCard video={videoA} index={0} />
                <VideoCard video={videoB} index={1} />
              </div>
            </div>
          )}

          {/* AI Analysis */}
          {videoA && videoB && (
            <div className="animate-fadeInUp delay-400">
              <AnalysisComparison videoA={videoA} videoB={videoB} />
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

              <ChatPanel key={chatKey} />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
