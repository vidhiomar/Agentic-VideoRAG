"use client";

import { useState } from "react";
import {
  getDocumentCount,
  getMetadata,
  searchVideos,
  resetData,
  MetadataResponse,
  SearchVideosResponse,
} from "@/lib/api";

export default function StatsPanel() {
  const [docCount, setDocCount] = useState<number | null>(null);
  const [metadata, setMetadata] = useState<MetadataResponse | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] =
    useState<SearchVideosResponse | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [resetConfirm, setResetConfirm] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleGetCount = async () => {
    try {
      setLoading("count");
      setError("");
      const data = await getDocumentCount();
      setDocCount(data.count);
    } catch {
      setError("Failed to fetch document count");
    } finally {
      setLoading(null);
    }
  };

  const handleGetMetadata = async () => {
    try {
      setLoading("metadata");
      setError("");
      const data = await getMetadata();
      setMetadata(data);
    } catch {
      setError("Failed to fetch metadata");
    } finally {
      setLoading(null);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      setLoading("search");
      setError("");
      const data = await searchVideos(searchQuery);
      setSearchResults(data);
    } catch {
      setError("Failed to search");
    } finally {
      setLoading(null);
    }
  };

  const handleReset = async () => {
    try {
      setLoading("reset");
      setError("");
      await resetData();
      setDocCount(null);
      setMetadata(null);
      setSearchResults(null);
      setResetConfirm(false);
      showSuccess("All data cleared successfully!");
    } catch {
      setError("Failed to reset data");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Error */}
      {error && (
        <div
          className="animate-fadeInUp"
          style={{
            background: "#FEF2F2",
            border: "1px solid #FECACA",
            color: "#DC2626",
            borderRadius: "14px",
            padding: "14px 20px",
            fontSize: "0.9rem",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          {error}
        </div>
      )}

      {/* Success */}
      {successMsg && (
        <div
          className="animate-fadeInUp"
          style={{
            background: "var(--success-soft)",
            border: "1px solid #A7F3D0",
            color: "var(--success)",
            borderRadius: "14px",
            padding: "14px 20px",
            fontSize: "0.9rem",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          {successMsg}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Document Count */}
        <div className="analytics-stat animate-fadeInUp delay-100">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  background: "var(--accent-soft)",
                  color: "var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <div>
                <h3 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "0.95rem" }}>
                  Document Count
                </h3>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  Chunks in vector store
                </p>
              </div>
            </div>
          </div>

          {docCount !== null && (
            <div
              className="animate-countUp"
              style={{
                fontSize: "2.5rem",
                fontWeight: 700,
                fontFamily: "var(--font-space-grotesk), sans-serif",
                color: "var(--accent)",
                marginBottom: "12px",
              }}
            >
              {docCount}
            </div>
          )}

          <button
            onClick={handleGetCount}
            disabled={loading === "count"}
            className="btn-secondary w-full py-2.5 text-sm flex items-center justify-center gap-2"
          >
            {loading === "count" ? (
              <>
                <div style={{ width: "14px", height: "14px", border: "2px solid var(--border)", borderTopColor: "var(--accent)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                Loading...
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 4 23 10 17 10" />
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
                Refresh Count
              </>
            )}
          </button>
        </div>

        {/* Metadata */}
        <div className="analytics-stat animate-fadeInUp delay-200">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: "var(--info-soft)",
                color: "var(--info)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>
            <div>
              <h3 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "0.95rem" }}>
                Video Metadata
              </h3>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                Stored analysis data
              </p>
            </div>
          </div>

          {metadata && (
            <div
              className="animate-slideDown"
              style={{
                fontSize: "0.8rem",
                color: "var(--text-secondary)",
                marginBottom: "12px",
              }}
            >
              {Object.keys(metadata).length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {Object.keys(metadata).map((key) => (
                    <div
                      key={key}
                      style={{
                        padding: "8px 12px",
                        borderRadius: "10px",
                        background: "var(--bg)",
                        border: "1px solid var(--border-light)",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{key}:</span>
                      <span>{metadata[key]?.title || "No title"}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: "var(--text-muted)", fontStyle: "italic" }}>
                  No metadata stored yet
                </p>
              )}
            </div>
          )}

          <button
            onClick={handleGetMetadata}
            disabled={loading === "metadata"}
            className="btn-secondary w-full py-2.5 text-sm flex items-center justify-center gap-2"
          >
            {loading === "metadata" ? (
              <>
                <div style={{ width: "14px", height: "14px", border: "2px solid var(--border)", borderTopColor: "var(--info)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                Loading...
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                View Metadata
              </>
            )}
          </button>
        </div>

        {/* Reset */}
        <div className="analytics-stat animate-fadeInUp delay-300">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: "#FEF2F2",
                color: "#DC2626",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </div>
            <div>
              <h3 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "0.95rem" }}>
                Reset Data
              </h3>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                Clear all stored data
              </p>
            </div>
          </div>

          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: 1.5 }}>
            This will remove all video metadata and vector store data. This action cannot be undone.
          </p>

          {!resetConfirm ? (
            <button
              onClick={() => setResetConfirm(true)}
              className="btn-danger w-full py-2.5 text-sm flex items-center justify-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              Reset All Data
            </button>
          ) : (
            <div className="animate-fadeInUp" style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={handleReset}
                disabled={loading === "reset"}
                className="btn-danger flex-1 py-2.5 text-sm flex items-center justify-center gap-2"
              >
                {loading === "reset" ? (
                  <>
                    <div style={{ width: "14px", height: "14px", border: "2px solid #FECACA", borderTopColor: "#DC2626", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                    Resetting...
                  </>
                ) : (
                  "Confirm Reset"
                )}
              </button>
              <button
                onClick={() => setResetConfirm(false)}
                className="btn-secondary flex-1 py-2.5 text-sm"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Search Section */}
      <div className="glass-card-static p-6 animate-fadeInUp delay-400">
        <h3
          style={{
            fontFamily: "var(--font-space-grotesk, 'Space Grotesk'), sans-serif",
            fontWeight: 700,
            fontSize: "1.1rem",
            color: "var(--text-primary)",
            marginBottom: "6px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          Transcript Search
        </h3>
        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "20px" }}>
          Search through indexed video transcripts using semantic search
        </p>

        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="Search video transcripts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="input-clean"
            style={{ flex: 1 }}
          />
          <button
            onClick={handleSearch}
            disabled={loading === "search" || !searchQuery.trim()}
            className="btn-primary px-6 py-3 text-sm flex items-center gap-2"
          >
            {loading === "search" ? (
              <>
                <div style={{ width: "14px", height: "14px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                Searching...
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                Search
              </>
            )}
          </button>
        </div>

        {/* Search Results */}
        {searchResults && (
          <div className="animate-slideDown" style={{ marginTop: "16px" }}>
            <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "12px" }}>
              Results ({searchResults.documents?.length || 0} chunks found)
            </div>

            {searchResults.documents && searchResults.documents.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "400px", overflowY: "auto" }}>
                {searchResults.documents.map((doc: string, i: number) => (
                  <div
                    key={i}
                    className="search-result"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                      <span className="badge badge-platform" style={{ fontSize: "0.6rem" }}>
                        Chunk {i + 1}
                      </span>
                      {searchResults.metadatas?.[i]?.chunk_id && (
                        <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                          ID: {searchResults.metadatas[i].chunk_id}
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: "0.85rem", lineHeight: 1.6, color: "var(--text-secondary)" }}>
                      {doc}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontStyle: "italic", textAlign: "center", padding: "20px" }}>
                No results found. Try a different query.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
