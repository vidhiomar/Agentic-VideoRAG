"use client";

import NavBar from "@/components/NavBar";
import StatsPanel from "@/components/StatsPanel";

export default function AnalyticsPage() {
  return (
    <>
      <NavBar />

      {/* Background Orbs */}
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />

      <main
        className="relative min-h-screen z-10 page-enter"
        style={{ paddingTop: "80px" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Header */}
          <div className="mb-12 animate-fadeInUp">
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
                System Analytics
              </span>
            </div>

            <h1
              className="gradient-text"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3rem)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                marginBottom: "12px",
              }}
            >
              Analytics Dashboard
            </h1>

            <p
              style={{
                fontSize: "1.05rem",
                color: "var(--text-secondary)",
                maxWidth: "520px",
                lineHeight: 1.6,
              }}
            >
              Monitor your vector store, search indexed transcripts, view stored metadata, and manage your data.
            </p>
          </div>

          {/* Stats Panel */}
          <StatsPanel />

          {/* Footer spacing */}
          <div style={{ height: "60px" }} />
        </div>
      </main>
    </>
  );
}
