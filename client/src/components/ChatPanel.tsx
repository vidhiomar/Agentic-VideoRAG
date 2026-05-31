"use client";

import { useState, useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import { Message } from "@/types/chat";

export default function ChatPanel() {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hi! Ask anything about Video A and Video B. I can compare engagement, hooks, creators, transcripts, and content strategy.",
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Video A achieved higher engagement because it used a stronger curiosity-driven hook and generated more comments relative to its views.",
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, aiMessage]);
    }, 1500);
  };

  return (
    <div
      className="glass-card overflow-hidden flex flex-col"
      style={{ height: '650px' }}
    >
      {/* Header */}
      <div style={{
        padding: '20px 24px',
        borderBottom: '1px solid var(--border-light)',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
      }}>
        {/* Accent bar */}
        <div style={{
          width: '4px',
          height: '40px',
          borderRadius: '4px',
          background: 'var(--accent-gradient)',
          flexShrink: 0,
        }} />
        <div>
          <h2 style={{
            fontFamily: "var(--font-space-grotesk, 'Space Grotesk'), sans-serif",
            fontWeight: 700,
            fontSize: '1.2rem',
            letterSpacing: '-0.01em',
            color: 'var(--text-primary)',
          }}>
            Video Intelligence Chat
          </h2>
          <p style={{
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            marginTop: '2px',
            fontFamily: "var(--font-dm-sans, 'DM Sans'), sans-serif",
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--success)',
              display: 'inline-block',
            }} />
            AI is ready · Ask questions about both videos
          </p>
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto p-5 space-y-4"
        style={{ scrollBehavior: 'smooth' }}
      >
        {messages.map((message, i) => (
          <MessageBubble
            key={message.id}
            message={message}
            index={i}
          />
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div
            className="flex justify-start animate-fadeInUp"
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 18px',
              borderRadius: '18px 18px 18px 4px',
              background: 'var(--bg)',
              border: '1px solid var(--border-light)',
            }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '8px',
                background: 'var(--accent-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="none">
                  <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1.07A7.001 7.001 0 0 1 14 23h-4a7.001 7.001 0 0 1-6.93-4H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2zM9 17a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                </svg>
              </div>
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div style={{
        padding: '16px 20px',
        borderTop: '1px solid var(--border-light)',
        background: 'rgba(248, 246, 243, 0.5)',
      }}>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Why did Video A outperform Video B?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && handleSend()
            }
            className="input-styled"
            style={{
              flex: 1,
              paddingLeft: '16px',
              borderRadius: '14px',
            }}
          />

          <button
            onClick={handleSend}
            className="btn-primary flex items-center justify-center"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              padding: 0,
              flexShrink: 0,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}