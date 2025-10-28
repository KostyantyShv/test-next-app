"use client";

import { useEffect, useState } from 'react';
import { BunnyVideoPlayer } from '@/components/player/BunnyVideoPlayer/BunnyVideoPlayer';

/**
 * Приклад сторінки з Bunny Stream відео плеєром
 * 
 * Використання:
 * 1. Додайте videoId в URL: /video-example?videoId=your-video-id
 * 2. Або встановіть videoId нижче
 */
export default function VideoExamplePage() {
  const [videoId, setVideoId] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');

  // Можна отримати videoId з URL параметрів
  // const searchParams = useSearchParams();
  // const videoIdFromUrl = searchParams.get('videoId');

  const handleLoadVideo = () => {
    if (inputValue.trim()) {
      setVideoId(inputValue.trim());
    }
  };

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetch('/api/bunny-stream/videos');
      const { videos } = await response.json();
      console.log("videos", videos);
    };
    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-6">Bunny Stream Video Player Example</h1>
          
          {/* Video ID Input */}
          <div className="mb-8 p-4 bg-blue-50 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Video ID:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter Bunny Stream video ID"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00C4CF]"
              />
              <button
                onClick={handleLoadVideo}
                className="px-6 py-2 bg-[#00C4CF] text-white rounded-md hover:bg-[#00a8b2] transition-colors"
              >
                Load Video
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Enter a valid Bunny Stream video ID to load the player
            </p>
          </div>

          {/* Video Player */}
          {videoId ? (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Playing: {videoId}</h2>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <BunnyVideoPlayer
                  videoId={videoId}
                  width={1920}
                  height={1080}
                  controls={true}
                  autoplay={false}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[400px] bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
              <div className="text-center">
                <svg
                  className="mx-auto h-16 w-16 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No Video Loaded</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Enter a video ID above to start playing
                </p>
              </div>
            </div>
          )}

          {/* Features List */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Features:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-medium">Adaptive Streaming</h4>
                  <p className="text-sm text-gray-600">HLS для оптимальної якості</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-medium">Keyboard Shortcuts</h4>
                  <p className="text-sm text-gray-600">Space, M, F, Arrows</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-medium">CDN Distribution</h4>
                  <p className="text-sm text-gray-600">Глобальна доставка відео</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-medium">Automatic Encoding</h4>
                  <p className="text-sm text-gray-600">Множинні формати</p>
                </div>
              </div>
            </div>
          </div>

          {/* API Example */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">API Usage Example:</h3>
            <pre className="text-sm bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
{`// Отримати всі відео
const response = await fetch('/api/bunny-stream/videos');
const { videos } = await response.json();

// Створити відео
const response = await fetch('/api/bunny-stream/videos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'My Video' })
});`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

