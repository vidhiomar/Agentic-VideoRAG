"use client";

import { useState } from "react";
import MessageBubble from "./MessageBubble";
import { Message } from "@/types/chat";

export default function ChatPanel() {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hi! Ask anything about Video A and Video B. I can compare engagement, hooks, creators, transcripts, and content strategy.",
    },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Video A achieved higher engagement because it used a stronger curiosity-driven hook and generated more comments relative to its views.",
      };

      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-2xl border shadow-md h-[650px] flex flex-col">
      <div className="border-b p-4">
        <h2 className="font-bold text-xl">
          Video Intelligence Chat
        </h2>

        <p className="text-sm text-gray-500">
          Ask questions about both videos
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
          />
        ))}
      </div>

      <div className="border-t p-4">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Why did Video A outperform Video B?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && handleSend()
            }
            className="flex-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

          <button
            onClick={handleSend}
            className="bg-black text-white px-6 rounded-xl font-medium"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}