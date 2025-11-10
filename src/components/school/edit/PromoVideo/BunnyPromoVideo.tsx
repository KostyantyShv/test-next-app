"use client";

import React, { useState } from "react";
import { BunnyVideoPlayer } from "@/components/player/BunnyVideoPlayer/BunnyVideoPlayer";

/**
 * Updated PromoVideo component with Bunny Stream integration
 * 
 * Замініть <PromoVideo /> на <BunnyPromoVideo /> в вашому коді
 */
const BunnyPromoVideo: React.FC = () => {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleReplaceVideo = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";
    input.click();

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      try {
        // Створити відео запис в Bunny Stream
        const response = await fetch('/api/bunny-stream/videos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: file.name })
        });

        const { video } = await response.json();
        setVideoId(video.videoId);
        
        alert('Video created. Use the upload URL to upload your file.');
        
        // NOTE: Для завантаження файлу потрібно використовувати Upload API
        // Більш детально в документації BUNNY_STREAM_INTEGRATION.md
      } catch (error) {
        console.error('Error uploading video:', error);
        alert('Failed to upload video');
      }
    };
  };

  const handleDeleteVideo = async () => {
    if (!videoId) return;

    if (confirm("Are you sure you want to delete this video?")) {
      try {
        await fetch(`/api/bunny-stream/videos/${videoId}`, {
          method: 'DELETE'
        });
        
        setVideoId(null);
        alert('Video deleted successfully');
      } catch (error) {
        console.error('Error deleting video:', error);
        alert('Failed to delete video');
      }
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex gap-6 max-w-[1150px] max-md:flex-col mx-auto">
      {/* Left section */}
      <div className="max-w-[350px] px-6">
        <h1 className="text-2xl font-semibold mb-3 text-[#1B1B1B]">
          Promotional Video
        </h1>
        <p className="text-[#5F5F5F] text-base leading-relaxed">
          Showcase your school&apos;s unique atmosphere, facilities, and student life
          through an engaging video tour powered by Bunny Stream for optimal quality
          and performance.
        </p>
      </div>

      {/* Right section */}
      <div className="w-full bg-white rounded-lg p-6 shadow-[0_1px_3px_rgba(0,_0,_0,_0.1)]">
        <div className="flex gap-5 items-start max-md:flex-col">
          {videoId ? (
            <div className="relative w-40 max-md:h-[200px] md:h-[100px] max-md:w-full rounded-md overflow-hidden flex-shrink-0">
              <BunnyVideoPlayer
                videoId={videoId}
                width={350}
                height={200}
                controls={true}
                className="rounded-md"
              />
            </div>
          ) : (
            <div className="relative w-40 max-md:h-[200px] md:h-[100px] max-md:w-full rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-gray-400"
                >
                  <path
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          )}

          <div className="flex-1 max-md:w-full">
            <h2 className="text-base font-medium text-[#1B1B1B] mb-6">
              {videoId ? "Your Promotional Video" : "No video uploaded yet"}
            </h2>
            <button
              onClick={toggleExpand}
              className="flex items-center max-md:w-full gap-2 px-4 py-2 bg-white border border-[#E5E5E5] rounded-md text-sm font-medium text-[#4A4A4A] transition-all duration-200 hover:bg-[#F8F9FA]"
            >
              {videoId ? "View Video" : "Upload Video"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isExpanded ? "rotate-180" : "rotate-0"
                }`}
              >
                <path
                  fill="currentColor"
                  d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Expanded video section */}
        <div className={`mt-6 ${isExpanded ? "block" : "hidden"}`}>
          {videoId ? (
            <div className="w-full rounded-lg overflow-hidden bg-black">
              <BunnyVideoPlayer
                videoId={videoId}
                width={1920}
                height={1080}
                controls={true}
                autoplay={false}
              />
            </div>
          ) : (
            <div className="w-full h-[400px] rounded-lg bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="mx-auto text-gray-400 mb-4"
                >
                  <path
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-gray-600 mb-4">No video available</p>
                <button
                  onClick={handleReplaceVideo}
                  className="px-6 py-2 bg-[#00C4CF] text-white rounded-md hover:bg-[#00a8b2] transition-colors"
                >
                  Upload Video
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-between max-md:flex-col md:items-center max-md:gap-2 mt-4 py-2">
            <div className="flex gap-4">
              <button
                onClick={handleReplaceVideo}
                className="text-[#1B1B1B] text-sm font-medium cursor-pointer hover:text-[#00C4CF] transition-colors"
              >
                {videoId ? "Replace Video" : "Upload Video"}
              </button>
              {videoId && (
                <button
                  onClick={handleDeleteVideo}
                  className="text-[#FF4D4D] text-sm font-medium cursor-pointer hover:text-[#e03636] transition-colors"
                >
                  Delete Video
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BunnyPromoVideo;

