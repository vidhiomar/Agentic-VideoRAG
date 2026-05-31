"use client";

import UrlInput from "@/components/UrlInput";
import VideoCard from "@/components/VideoCard";
import { Video } from "@/types/video";
import ChatPanel from "@/components/ChatPanel";
import NavBar from "@/components/NavBar";

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
    <>
      <NavBar />

      {/* Live Background Orbs */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />
      <div className="bg-orb bg-orb-4" />

      <main className="relative min-h-screen z-10" style={{ paddingTop: '80px' }}>
        <div className="max-w-7xl mx-auto px-6 py-10">

          {/* ── Hero Section ──────────────────── */}
          <div className="text-center mb-14 animate-fadeInUp">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
              style={{
                background: 'var(--accent-soft)',
                border: '1px solid rgba(232, 85, 58, 0.15)',
              }}
            >
              <span style={{
                width: '6px', height: '6px',
                borderRadius: '50%',
                background: 'var(--accent)',
                display: 'inline-block',
                animation: 'pulseGlow 2s ease-in-out infinite',
              }} />
              <span style={{
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--accent)',
                fontFamily: "var(--font-dm-sans, 'DM Sans'), sans-serif",
                letterSpacing: '0.02em',
              }}>
                AI-Powered Video Intelligence
              </span>
            </div>

            <h1
              className="gradient-text"
              style={{
                fontSize: 'clamp(2.4rem, 5vw, 3.5rem)',
                fontFamily: "var(--font-space-grotesk, 'Space Grotesk'), sans-serif",
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                marginBottom: '16px',
              }}
            >
              Agentic VideoRAG
            </h1>

            <p style={{
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
              maxWidth: '520px',
              margin: '0 auto',
              lineHeight: 1.6,
              fontFamily: "var(--font-dm-sans, 'DM Sans'), sans-serif",
            }}>
              Compare videos, analyze engagement, and unlock content strategy insights with AI.
            </p>
          </div>

          {/* ── URL Input Section ─────────────── */}
          <div className="animate-fadeInUp delay-200">
            <UrlInput onAnalyze={handleAnalyze} />
          </div>

          {/* ── Video Comparison Section ──────── */}
          <div className="mt-14 animate-fadeInUp delay-300">
            <div className="section-label mb-6">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              Video Comparison
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <VideoCard video={mockVideoA} index={0} />
              <VideoCard video={mockVideoB} index={1} />
            </div>
          </div>

          {/* ── Chat Section ─────────────────── */}
          <div className="mt-14 mb-10 animate-fadeInUp delay-500">
            <div className="section-label mb-6">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              AI Chat
            </div>

            <ChatPanel />
          </div>
        </div>
      </main>
    </>
  );
}