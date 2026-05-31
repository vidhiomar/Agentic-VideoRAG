const API_URL = "http://127.0.0.1:8000";

export async function analyzeVideos(
  videoA: string,
  videoB: string
) {
  const response = await fetch(
    `${API_URL}/videos/analyze`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        video_a: videoA,
        video_b: videoB,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to analyze videos"
    );
  }

  return response.json();
}