"use client";

import Link from "next/link";
import NavBar from "@/components/NavBar";
import FeatureCard from "@/components/FeatureCard";

export default function Home() {
  return (
    <>
      <NavBar />

      {/* Background Orbs */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />

      <main
        className="relative min-h-screen z-10 page-enter"
        style={{ paddingTop: "80px" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Hero Section */}
          <div className="text-center mb-20 animate-fadeInUp">
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
                AI-Powered Video Intelligence
              </span>
            </div>

            <h1
              className="gradient-text"
              style={{
                fontSize: "clamp(2.8rem, 6vw, 4.2rem)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                marginBottom: "20px",
              }}
            >
              Agentic VideoRAG
            </h1>

            <p
              style={{
                fontSize: "1.15rem",
                color: "var(--text-secondary)",
                maxWidth: "560px",
                margin: "0 auto 40px",
                lineHeight: 1.65,
              }}
            >
              Compare social media videos, analyze engagement metrics,
              and unlock content strategy insights — all powered by AI
              and retrieval-augmented generation.
            </p>

            <div
              className="flex items-center justify-center gap-4 animate-fadeInUp delay-200"
              style={{ flexWrap: "wrap" }}
            >
              <Link href="/compare">
                <button
                  className="btn-primary px-8 py-4 text-base flex items-center gap-3"
                  style={{ fontSize: "1rem" }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                  Start Comparing
                </button>
              </Link>

              <Link href="/analytics">
                <button
                  className="btn-secondary px-8 py-4 text-base flex items-center gap-3"
                  style={{ fontSize: "1rem" }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                  View Analytics
                </button>
              </Link>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-20">
            <div className="section-label mb-8 animate-fadeInUp delay-300">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              How It Works
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: "01",
                  title: "Paste Video URLs",
                  desc: "Add two YouTube or Instagram Reel URLs that you want to compare side by side.",
                },
                {
                  step: "02",
                  title: "AI Analyzes Content",
                  desc: "Our AI extracts transcripts, metadata, and performs deep content analysis using RAG.",
                },
                {
                  step: "03",
                  title: "Chat & Explore",
                  desc: "Ask questions about both videos and get actionable strategy insights instantly.",
                },
              ].map((item, i) => (
                <div
                  key={item.step}
                  className="animate-fadeInUp"
                  style={{
                    animationDelay: `${400 + i * 120}ms`,
                    padding: "28px 24px",
                    borderRadius: "var(--radius-xl)",
                    background: "var(--surface)",
                    border: "1px solid var(--border-light)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      fontSize: "3rem",
                      fontWeight: 700,
                      fontFamily:
                        "var(--font-space-grotesk, 'Space Grotesk'), sans-serif",
                      color: "var(--border-light)",
                      lineHeight: 1,
                    }}
                  >
                    {item.step}
                  </div>
                  <h3
                    style={{
                      fontFamily:
                        "var(--font-space-grotesk, 'Space Grotesk'), sans-serif",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      color: "var(--text-primary)",
                      marginBottom: "8px",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      lineHeight: 1.6,
                      color: "var(--text-secondary)",
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-20">
            <div className="section-label mb-8 animate-fadeInUp delay-400">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              Features
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                index={0}
                icon={
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                }
                title="Video Comparison"
                description="Compare two videos side by side with detailed metadata including views, likes, comments, and engagement rate."
              />

              <FeatureCard
                index={1}
                icon={
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                }
                title="AI Chat Interface"
                description="Ask questions about both videos and receive intelligent, context-aware responses with citations from transcripts."
              />

              <FeatureCard
                index={2}
                icon={
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                }
                title="Content Analysis"
                description="Automatic analysis of hooks, CTAs, tone, audience targeting, and key topics using AI-powered content intelligence."
              />

              <FeatureCard
                index={3}
                icon={
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                }
                title="Semantic Search"
                description="Search through video transcripts with semantic understanding — find relevant content beyond keyword matching."
              />

              <FeatureCard
                index={4}
                icon={
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                }
                title="Engagement Analytics"
                description="Track engagement rates, view counts, and performance metrics with visual analytics and trend insights."
              />

              <FeatureCard
                index={5}
                icon={
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                }
                title="RAG-Powered"
                description="Retrieval-Augmented Generation ensures AI answers are grounded in actual video content — not hallucinations."
              />
            </div>
          </div>

          {/* Bottom CTA */}
          <div
            className="text-center mb-16 animate-fadeInUp delay-600"
            style={{
              padding: "48px 32px",
              borderRadius: "var(--radius-xl)",
              background: "var(--surface)",
              border: "1px solid var(--border-light)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: "var(--accent-gradient)",
              }}
            />
            <h2
              style={{
                fontFamily:
                  "var(--font-space-grotesk, 'Space Grotesk'), sans-serif",
                fontSize: "1.8rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "12px",
              }}
            >
              Ready to analyze your videos?
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "1rem",
                marginBottom: "28px",
                maxWidth: "400px",
                margin: "0 auto 28px",
              }}
            >
              Start comparing videos and unlock powerful content insights in seconds.
            </p>
            <Link href="/compare">
              <button
                className="btn-primary px-10 py-4 text-base flex items-center gap-3 mx-auto"
                style={{ fontSize: "1rem" }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                Get Started Now
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}