"use client";

import { Video } from "@/types/video";

interface Props {
  videoA: Video;
  videoB: Video;
}

export default function AnalysisComparison({ videoA, videoB }: Props) {
  const analysisA = videoA?.analysis;
  const analysisB = videoB?.analysis;

  if (!analysisA || !analysisB) {
    return null;
  }

  const sections = [
    {
      title: "Hook",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
      dataA: analysisA.hook,
      dataB: analysisB.hook,
      color: "var(--accent)",
      bg: "var(--accent-soft)",
    },
    {
      title: "Target Audience",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      dataA: analysisA.target_audience,
      dataB: analysisB.target_audience,
      color: "var(--info)",
      bg: "var(--info-soft)",
    },
    {
      title: "Tone",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      ),
      dataA: analysisA.tone,
      dataB: analysisB.tone,
      color: "var(--success)",
      bg: "var(--success-soft)",
    },
    {
      title: "Call To Action",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
      dataA: analysisA.cta,
      dataB: analysisB.cta,
      color: "var(--warn)",
      bg: "var(--warn-soft)",
    },
  ];

  return (
    <div className="mt-14">
      <div className="section-label mb-6">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
        AI Content Analysis
      </div>

      {/* Summary Section */}
      {(analysisA.summary || analysisB.summary) && (
        <div
          className="glass-card p-6 mb-6 animate-fadeInUp"
          style={{ cursor: "default" }}
        >
          <h3
            style={{
              fontFamily: "var(--font-space-grotesk, 'Space Grotesk'), sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              color: "var(--text-primary)",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="17" y1="10" x2="3" y2="10" />
              <line x1="21" y1="6" x2="3" y2="6" />
              <line x1="21" y1="14" x2="3" y2="14" />
              <line x1="17" y1="18" x2="3" y2="18" />
            </svg>
            Summary
          </h3>
          <div className="grid md:grid-cols-2 gap-5">
            <div
              style={{
                padding: "16px",
                borderRadius: "14px",
                background: "var(--bg)",
                border: "1px solid var(--border-light)",
              }}
            >
              <div
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--accent)",
                  marginBottom: "8px",
                }}
              >
                Video A
              </div>
              <p
                style={{
                  fontSize: "0.9rem",
                  lineHeight: 1.6,
                  color: "var(--text-secondary)",
                }}
              >
                {analysisA.summary || "N/A"}
              </p>
            </div>
            <div
              style={{
                padding: "16px",
                borderRadius: "14px",
                background: "var(--bg)",
                border: "1px solid var(--border-light)",
              }}
            >
              <div
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--info)",
                  marginBottom: "8px",
                }}
              >
                Video B
              </div>
              <p
                style={{
                  fontSize: "0.9rem",
                  lineHeight: 1.6,
                  color: "var(--text-secondary)",
                }}
              >
                {analysisB.summary || "N/A"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {sections.map((section, i) => (
          <div
            key={section.title}
            className="glass-card p-6"
            style={{
              animation: `fadeInScale 0.5s var(--ease-out-expo) ${i * 100}ms both`,
              cursor: "default",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-space-grotesk, 'Space Grotesk'), sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                color: "var(--text-primary)",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "10px",
                  background: section.bg,
                  color: section.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {section.icon}
              </div>
              {section.title}
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div
                style={{
                  padding: "14px 16px",
                  borderRadius: "12px",
                  background: "var(--bg)",
                  border: "1px solid var(--border-light)",
                  borderLeft: `3px solid var(--accent)`,
                }}
              >
                <div
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--accent)",
                    marginBottom: "6px",
                  }}
                >
                  Video A
                </div>
                <p
                  style={{
                    fontSize: "0.88rem",
                    lineHeight: 1.5,
                    color: "var(--text-secondary)",
                  }}
                >
                  {section.dataA || "N/A"}
                </p>
              </div>

              <div
                style={{
                  padding: "14px 16px",
                  borderRadius: "12px",
                  background: "var(--bg)",
                  border: "1px solid var(--border-light)",
                  borderLeft: `3px solid var(--info)`,
                }}
              >
                <div
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--info)",
                    marginBottom: "6px",
                  }}
                >
                  Video B
                </div>
                <p
                  style={{
                    fontSize: "0.88rem",
                    lineHeight: 1.5,
                    color: "var(--text-secondary)",
                  }}
                >
                  {section.dataB || "N/A"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Key Topics */}
      {(analysisA.key_topics?.length > 0 || analysisB.key_topics?.length > 0) && (
        <div
          className="glass-card p-6 mt-6 animate-fadeInUp delay-500"
          style={{ cursor: "default" }}
        >
          <h3
            style={{
              fontFamily: "var(--font-space-grotesk, 'Space Grotesk'), sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              color: "var(--text-primary)",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
            Key Topics
          </h3>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <div
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--accent)",
                  marginBottom: "10px",
                }}
              >
                Video A
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {(analysisA.key_topics || []).map((topic: string, i: number) => (
                  <span key={i} className="badge badge-platform">
                    {topic}
                  </span>
                ))}
                {(!analysisA.key_topics || analysisA.key_topics.length === 0) && (
                  <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                    No topics available
                  </span>
                )}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--info)",
                  marginBottom: "10px",
                }}
              >
                Video B
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {(analysisB.key_topics || []).map((topic: string, i: number) => (
                  <span key={i} className="badge badge-info">
                    {topic}
                  </span>
                ))}
                {(!analysisB.key_topics || analysisB.key_topics.length === 0) && (
                  <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                    No topics available
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
