"use client";

import { useState } from "react";

type UrlInputProps = {
  onAnalyze: (videoA: string, videoB: string) => void | Promise<void>;
  isLoading?: boolean;
};

export default function UrlInput({
  onAnalyze,
  isLoading = false,
}: UrlInputProps) {
  const [videoA, setVideoA] = useState("");
  const [videoB, setVideoB] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!videoA.trim() || !videoB.trim()) {
      alert("Please enter both video URLs.");
      return;
    }

    onAnalyze(videoA.trim(), videoB.trim());
  };

  return (
    <div className="w-full max-w-4xl mx-auto glass-card overflow-hidden">
      {/* Gradient accent bar */}
      <div style={{
        height: '4px',
        background: 'var(--accent-gradient)',
        backgroundSize: '200% 100%',
        animation: 'gradientShift 4s ease infinite',
      }} />

      <div className="p-7">
        <h2 style={{
          fontFamily: "var(--font-space-grotesk, 'Space Grotesk'), sans-serif",
          fontSize: '1.5rem',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: 'var(--text-primary)',
          marginBottom: '6px',
        }}>
          Compare Social Media Videos
        </h2>

        <p style={{
          color: 'var(--text-secondary)',
          marginBottom: '28px',
          fontSize: '0.95rem',
          fontFamily: "var(--font-dm-sans, 'DM Sans'), sans-serif",
          lineHeight: 1.5,
        }}>
          Paste two YouTube or Instagram Reel URLs to analyze engagement,
          transcripts, and performance insights.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Video A Input */}
          <div>
            <label
              htmlFor="videoA"
              style={{
                display: 'block',
                fontSize: '0.8rem',
                fontWeight: 600,
                marginBottom: '8px',
                color: 'var(--text-secondary)',
                fontFamily: "var(--font-dm-sans, 'DM Sans'), sans-serif",
                letterSpacing: '0.02em',
              }}
            >
              Video A URL
            </label>
            <div className="relative">
              <div style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </div>
              <input
                id="videoA"
                type="text"
                placeholder="https://youtube.com/watch?v=..."
                value={videoA}
                onChange={(e) => setVideoA(e.target.value)}
                className="input-styled"
              />
            </div>
          </div>

          {/* Video B Input */}
          <div>
            <label
              htmlFor="videoB"
              style={{
                display: 'block',
                fontSize: '0.8rem',
                fontWeight: 600,
                marginBottom: '8px',
                color: 'var(--text-secondary)',
                fontFamily: "var(--font-dm-sans, 'DM Sans'), sans-serif",
                letterSpacing: '0.02em',
              }}
            >
              Video B URL
            </label>
            <div className="relative">
              <div style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </div>
              <input
                id="videoB"
                type="text"
                placeholder="https://instagram.com/reel/..."
                value={videoB}
                onChange={(e) => setVideoB(e.target.value)}
                className="input-styled"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full py-3.5 text-base flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <>
                <div style={{
                  width: '18px',
                  height: '18px',
                  border: '2.5px solid rgba(255,255,255,0.3)',
                  borderTopColor: 'white',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }} />
                Analyzing...
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                Analyze Videos
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}