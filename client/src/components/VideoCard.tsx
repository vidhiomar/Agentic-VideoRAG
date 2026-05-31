"use client";

import { Video } from "@/types/video";

type Props = {
  video: Video;
};

export default function VideoCard({ video }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-md border overflow-hidden">
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100">
            {video.platform.toUpperCase()}
          </span>

          <span className="text-sm font-semibold text-green-600">
            ER {video.engagementRate.toFixed(2)}%
          </span>
        </div>

        <h3 className="font-bold text-lg line-clamp-2">
          {video.title}
        </h3>

        <p className="text-gray-600 mt-1">
          {video.creator}
        </p>

        <div className="grid grid-cols-2 gap-4 mt-5">
          <div>
            <p className="text-xs text-gray-500">Views</p>
            <p className="font-semibold">
              {video.views.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Likes</p>
            <p className="font-semibold">
              {video.likes.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Comments</p>
            <p className="font-semibold">
              {video.comments.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Followers</p>
            <p className="font-semibold">
              {video.followers?.toLocaleString() || "N/A"}
            </p>
          </div>
        </div>

        {video.duration && (
          <div className="mt-4">
            <p className="text-xs text-gray-500">Duration</p>
            <p>{video.duration}</p>
          </div>
        )}

        {video.uploadDate && (
          <div className="mt-2">
            <p className="text-xs text-gray-500">Uploaded</p>
            <p>{video.uploadDate}</p>
          </div>
        )}
      </div>
    </div>
  );
}