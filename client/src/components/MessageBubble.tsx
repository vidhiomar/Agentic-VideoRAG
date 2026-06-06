"use client";

import { ReactNode } from "react";
import { Message } from "@/types/chat";

type Props = {
  message: Message;
  index?: number;
};

function renderBoldText(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} style={{ fontWeight: 700 }}>
          {part.slice(2, -2)}
        </strong>
      );
    }

    return part;
  });
}

function renderMessageContent(content: string) {
  return content.split("\n").map((line, index) => {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      return <br key={index} />;
    }

    return (
      <div key={index} style={{ marginBottom: "6px" }}>
        {renderBoldText(line)}
      </div>
    );
  });
}

export default function MessageBubble({ message, index = 0 }: Props) {
  const isUser = message.role === "user";
  const delay = Math.min(index * 80, 400);

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
      style={{
        animationName: isUser ? "slideInRight" : "slideInLeft",
        animationDuration: "0.4s",
        animationTimingFunction: "var(--ease-out-expo)",
        animationDelay: `${delay}ms`,
        animationFillMode: "both",
      }}
    >
      {/* Bot avatar */}
      {!isUser && (
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: '10px',
          background: 'var(--accent-gradient)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginRight: '10px',
          marginTop: '4px',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white" stroke="none">
            <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1.07A7.001 7.001 0 0 1 14 23h-4a7.001 7.001 0 0 1-6.93-4H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2zM9 17a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
          </svg>
        </div>
      )}

      <div style={{
        maxWidth: '78%',
        borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
        padding: '14px 18px',
        fontSize: '0.9rem',
        lineHeight: 1.55,
        whiteSpace: 'pre-wrap',
        fontFamily: "var(--font-dm-sans, 'DM Sans'), sans-serif",
        ...(isUser
          ? {
              background: 'linear-gradient(135deg, #E8553A 0%, #D97706 100%)',
              color: 'white',
              boxShadow: '0 4px 16px rgba(232, 85, 58, 0.2)',
            }
          : {
              background: 'var(--bg)',
              border: '1px solid var(--border-light)',
              color: 'var(--text-primary)',
              boxShadow: 'var(--shadow-sm)',
            }
        ),
      }}>
        {renderMessageContent(message.content)}

        {/* Timestamp */}
        <div style={{
          fontSize: '0.65rem',
          marginTop: '6px',
          opacity: 0.6,
          textAlign: isUser ? 'right' : 'left',
          color: isUser ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)',
        }}>
          just now
        </div>
      </div>

      {/* User avatar */}
      {isUser && (
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: '10px',
          background: 'var(--bg-warm)',
          border: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginLeft: '10px',
          marginTop: '4px',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
      )}
    </div>
  );
}
