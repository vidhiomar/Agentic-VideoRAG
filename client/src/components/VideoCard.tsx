"use client";

/* eslint-disable @next/next/no-img-element */
import { Video } from "@/types/video";
import React from "react";
type Props = {
  video: Video;
  index?: number;
};

function formatDuration(value: string | number | undefined): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  // Fallback: if a number is passed, format it as M:SS
  const seconds = Math.floor(value);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function VideoCard({ video, index = 0 }: Props) {
  const delay = index * 150;

  const safeVideo = {
    ...video,
    thumbnail: video.thumbnail || "",
    title: video.title || "Untitled Video",
    creator: video.creator || "Unknown Creator",
    platform: video.platform || "youtube" as const,
    engagement_rate: video.engagement_rate ?? 0,
    views: video.views ?? 0,
    likes: video.likes ?? 0,
    comments: video.comments ?? 0,
    followers: video.followers ?? 0,
    upload_date: video.upload_date || "",
    duration: video.duration || "",
  };

  const engagementRate = Number(safeVideo.engagement_rate) || 0;
  const displayDuration = formatDuration(safeVideo.duration);

  return (
    <div
      className="glass-card overflow-hidden group"
      style={{
        animation: `fadeInScale 0.7s var(--ease-out-expo) ${delay}ms both`,
      }}
    >
      {/* Thumbnail with overlay */}
      <div className="relative overflow-hidden">
        {safeVideo.thumbnail ? (
  <img
    src={safeVideo.thumbnail}
    alt={safeVideo.title}
    className="w-full h-56 object-cover"
    style={{
      transition: "transform 0.6s var(--ease-out-expo)",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "scale(1.06)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "scale(1)";
    }}
  />
) : (
  <div
    className="w-full h-56 flex items-center justify-center"
    style={{
      background: "#1f2937",
      color: "#9ca3af",
    }}
  >
    No Thumbnail
  </div>
)}

        {/* Dark gradient overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)',
          pointerEvents: 'none',
        }} />

        {/* Duration badge */}
        {displayDuration && (
          <div style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)',
            color: 'white',
            padding: '4px 10px',
            borderRadius: '8px',
            fontSize: '0.75rem',
            fontWeight: 600,
            fontFamily: "var(--font-space-grotesk, 'Space Grotesk'), sans-serif",
            letterSpacing: '0.03em',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {displayDuration}
          </div>
        )}

        {/* Play button overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
        }}
          className="group-hover:!opacity-100"
        >
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'var(--accent-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(232, 85, 58, 0.4)',
            animation: 'pulseGlow 2s ease-in-out infinite',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="none">
              <polygon points="6 3 20 12 6 21 6 3" />
            </svg>
          </div>
        </div>
      </div>

      <div className="p-5">
        {/* Platform + Engagement Rate */}
        <div className="flex items-center justify-between mb-3">
          <span className="badge badge-platform">
            {safeVideo.platform === 'youtube' ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8zM9.5 15.6V8.4L16 12l-6.5 3.6z"/>
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1.1.4 2.2.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1.1.4-2.2.4-1.3.1-1.6.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1.1-.4-2.2-.1-1.3-.1-1.6-.1-4.9s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1.1-.4 2.2-.4 1.3-.1 1.6-.1 4.9-.1zm0-2.2C8.7 0 8.3 0 7 .1 5.7.1 4.8.3 4 .6c-.8.3-1.5.7-2.2 1.4C1.1 2.7.7 3.4.4 4.2.1 5 0 5.9 0 7.2 0 8.5 0 8.9 0 12.2s0 3.7.1 5c.1 1.3.3 2.2.6 3 .3.8.7 1.5 1.4 2.2.7.7 1.4 1.1 2.2 1.4.8.3 1.7.5 3 .6 1.3.1 1.7.1 5 .1s3.7 0 5-.1c1.3-.1 2.2-.3 3-.6.8-.3 1.5-.7 2.2-1.4.7-.7 1.1-1.4 1.4-2.2.3-.8.5-1.7.6-3 .1-1.3.1-1.7.1-5s0-3.7-.1-5c-.1-1.3-.3-2.2-.6-3-.3-.8-.7-1.5-1.4-2.2C21.3 1.5 20.6 1.1 19.8.8 19 .5 18.1.3 16.8.2 15.5.1 15.1 0 11.8 0h.2zM12 5.8a6.2 6.2 0 1 0 0 12.4A6.2 6.2 0 0 0 12 5.8zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-10.8a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z"/>
              </svg>
            )}
            {safeVideo.platform.toUpperCase()}
          </span>

          <span className="badge badge-success">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
              <polyline points="16 7 22 7 22 13" />
            </svg>
            ER {engagementRate.toFixed(2)}%
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "var(--font-space-grotesk, 'Space Grotesk'), sans-serif",
          fontWeight: 700,
          fontSize: '1.1rem',
          letterSpacing: '-0.01em',
          lineHeight: 1.4,
          color: 'var(--text-primary)',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {safeVideo.title}
        </h3>

        {/* Creator */}
        <p style={{
          color: 'var(--text-secondary)',
          marginTop: '4px',
          fontSize: '0.9rem',
          fontFamily: "var(--font-dm-sans, 'DM Sans'), sans-serif",
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          {safeVideo.creator}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mt-5">
          <div className="stat-item">
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Views
            </p>
            <p style={{
              fontFamily: "var(--font-space-grotesk, 'Space Grotesk'), sans-serif",
              fontWeight: 700,
              fontSize: '1rem',
              color: 'var(--text-primary)',
            }}>
              {safeVideo.views.toLocaleString()}
            </p>
          </div>

          <div className="stat-item">
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21.3l7.8-7.8 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
              </svg>
              Likes
            </p>
            <p style={{
              fontFamily: "var(--font-space-grotesk, 'Space Grotesk'), sans-serif",
              fontWeight: 700,
              fontSize: '1rem',
              color: 'var(--text-primary)',
            }}>
              {safeVideo.likes.toLocaleString()}
            </p>
          </div>

          <div className="stat-item">
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Comments
            </p>
            <p style={{
              fontFamily: "var(--font-space-grotesk, 'Space Grotesk'), sans-serif",
              fontWeight: 700,
              fontSize: '1rem',
              color: 'var(--text-primary)',
            }}>
              {safeVideo.comments.toLocaleString()}
            </p>
          </div>

          <div className="stat-item">
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Followers
            </p>
            <p style={{
              fontFamily: "var(--font-space-grotesk, 'Space Grotesk'), sans-serif",
              fontWeight: 700,
              fontSize: '1rem',
              color: 'var(--text-primary)',
            }}>
              {safeVideo.followers?.toLocaleString() || "N/A"}
            </p>
          </div>
        </div>

        {/* Upload date */}
        {safeVideo.upload_date && (
          <div style={{
            marginTop: '16px',
            paddingTop: '14px',
            borderTop: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            fontFamily: "var(--font-dm-sans, 'DM Sans'), sans-serif",
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Uploaded {safeVideo.upload_date}
          </div>
        )}
      </div>
    </div>
  );
}
