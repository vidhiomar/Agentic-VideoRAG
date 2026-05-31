"use client";

import { Message } from "@/types/chat";

type Props = {
  message: Message;
};

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`
          max-w-[80%]
          rounded-2xl
          px-4
          py-3
          text-sm
          whitespace-pre-wrap
          ${
            isUser
              ? "bg-black text-white"
              : "bg-white border shadow-sm"
          }
        `}
      >
        {message.content}
      </div>
    </div>
  );
}