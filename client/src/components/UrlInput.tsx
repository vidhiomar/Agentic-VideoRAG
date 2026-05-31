"use client";

import { useState } from "react";

type UrlInputProps = {
  onAnalyze: (videoA: string, videoB: string) => void;
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
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-md border p-6">
      <h2 className="text-2xl font-bold mb-2">
        Compare Social Media Videos
      </h2>

      <p className="text-gray-600 mb-6">
        Paste two YouTube or Instagram Reel URLs to analyze engagement,
        transcripts, and performance insights.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="videoA"
            className="block text-sm font-medium mb-2"
          >
            Video A URL
          </label>

          <input
            id="videoA"
            type="url"
            placeholder="https://youtube.com/watch?v=..."
            value={videoA}
            onChange={(e) => setVideoA(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label
            htmlFor="videoB"
            className="block text-sm font-medium mb-2"
          >
            Video B URL
          </label>

          <input
            id="videoB"
            type="url"
            placeholder="https://instagram.com/reel/..."
            value={videoB}
            onChange={(e) => setVideoB(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl bg-black text-white py-3 font-semibold transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Analyzing..." : "Analyze Videos"}
        </button>
      </form>
    </div>
  );
}