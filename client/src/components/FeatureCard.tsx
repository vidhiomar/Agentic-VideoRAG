"use client";

import React from "react";

type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
  index?: number;
};

export default function FeatureCard({
  icon,
  title,
  description,
  index = 0,
}: Props) {
  return (
    <div
      className="feature-card"
      style={{
        animation: `fadeInScale 0.6s var(--ease-out-expo) ${index * 120}ms both`,
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "14px",
          background: "var(--accent-soft)",
          color: "var(--accent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
          transition: "all 0.3s var(--ease-out-expo)",
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          fontFamily:
            "var(--font-space-grotesk, 'Space Grotesk'), sans-serif",
          fontWeight: 700,
          fontSize: "1.15rem",
          letterSpacing: "-0.01em",
          color: "var(--text-primary)",
          marginBottom: "8px",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontSize: "0.9rem",
          lineHeight: 1.6,
          color: "var(--text-secondary)",
          fontFamily:
            "var(--font-dm-sans, 'DM Sans'), sans-serif",
        }}
      >
        {description}
      </p>
    </div>
  );
}
