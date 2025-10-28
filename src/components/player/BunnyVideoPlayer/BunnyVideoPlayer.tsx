"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { VideoPlayerProps } from '@/types/video';

/**
 * Bunny Video Player Component
 * 
 * Підтримує:
 * - HLS streaming для найкращої якості
 * - Adaptive bitrate для різних швидкостей інтернету
 * - Контроллер для відтворення/паузи
 * - Прогрес бар
 * - Гучність
 * - Fullscreen
 * - Підтримка keyboard shortcuts
 */
export const BunnyVideoPlayer: React.FC<VideoPlayerProps> = ({
  videoId,
  width = 1920,
  height = 1080,
  autoplay = false,
  controls = true,
  loop = false,
  muted = false,
  poster,
  preload = 'metadata',
  className = '',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(muted);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [useEmbed, setUseEmbed] = useState(false);

  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Визначення URL відео
  const libraryId = process.env.NEXT_PUBLIC_BUNNY_STREAM_LIBRARY_ID || '';
  
  // Перевірка чи є libraryId
  if (!libraryId) {
    console.error('Bunny Stream Library ID не налаштовано. Додайте NEXT_PUBLIC_BUNNY_STREAM_LIBRARY_ID в .env.local');
  }
  
  // Перевірка чи є videoId
  if (!videoId) {
    console.warn('Video ID не вказано');
  }
  
  // Використовуємо MP4 як основний формат (більш універсальний)
  // Для HLS потрібна бібліотека hls.js
  const videoUrl = libraryId && videoId ? `https://vz-${libraryId}.b-cdn.net/${videoId}/play.mp4` : '';
  
  // HLS URL (для майбутньої підтримки)
  const hlsUrl = libraryId && videoId ? `https://vz-${libraryId}.b-cdn.net/${videoId}/play_hls2.m3u8` : '';
  
  // Thumbnail URL
  const thumbnailUrl = libraryId && videoId ? `https://vz-${libraryId}.b-cdn.net/${videoId}/1.jpg` : '';
  
  // Embed URL (альтернативний спосіб відтворення)
  const embedUrl = libraryId && videoId ? `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}` : '';

  // Event handlers
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsLoading(false);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    if (videoRef.current) {
      const clampedVolume = Math.max(0, Math.min(1, newVolume));
      videoRef.current.volume = clampedVolume;
      setVolume(clampedVolume);
      setIsMuted(clampedVolume === 0);
    }
  };

  const adjustVolume = (delta: number) => {
    handleVolumeChange(volume + delta);
  };

  const seek = (seconds: number) => {
    if (videoRef.current && duration) {
      const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = pos * duration;

    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Auto-hide controls
  const showControlsTemporarily = () => {
    setShowControls(true);
    
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }

    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('mousemove', showControlsTemporarily);
    
    return () => {
      container.removeEventListener('mousemove', showControlsTemporarily);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Keyboard shortcuts
  useEffect(() => {
    if (!libraryId || !videoId) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (!videoRef.current || document.activeElement?.tagName === 'INPUT') return;

      switch (e.key) {
        case ' ': // Space
          e.preventDefault();
          togglePlayPause();
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        case 'm':
        case 'M':
          toggleMute();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          seek(-10);
          break;
        case 'ArrowRight':
          e.preventDefault();
          seek(10);
          break;
        case 'ArrowUp':
          e.preventDefault();
          adjustVolume(0.1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          adjustVolume(-0.1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, currentTime, duration, volume, isMuted]);

  // Якщо використовуємо embed плеєр
  if (useEmbed && embedUrl) {
    return (
      <div
        className={`relative w-full bg-black rounded-lg overflow-hidden ${className}`}
        style={{
          aspectRatio: `${width} / ${height}`,
          width: '100%',
        }}
      >
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
          className="rounded-lg"
          title={`Video ${videoId}`}
        />
        <div className="absolute top-2 right-2">
          <button
            onClick={() => setUseEmbed(false)}
            className="bg-black/50 text-white px-2 py-1 rounded text-xs hover:bg-black/70"
          >
            Switch to Native Player
          </button>
        </div>
      </div>
    );
  }

  // Якщо немає libraryId або videoId - показуємо повідомлення
  if (!libraryId || !videoId) {
    return (
      <div
        className={`relative w-full bg-gray-900 rounded-lg overflow-hidden ${className}`}
        style={{
          aspectRatio: `${width} / ${height}`,
          width: '100%',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            {!libraryId ? (
              <>
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 className="text-lg font-semibold mb-2">Library ID не налаштовано</h3>
                <p className="text-sm text-gray-400">Додайте NEXT_PUBLIC_BUNNY_STREAM_LIBRARY_ID в .env.local</p>
              </>
            ) : (
              <>
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <h3 className="text-lg font-semibold mb-2">Video ID не вказано</h3>
                <p className="text-sm text-gray-400">Введіть Video ID для відтворення відео</p>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full bg-black rounded-lg overflow-hidden ${className}`}
      style={{
        aspectRatio: `${width} / ${height}`,
        width: '100%',
      }}
    >
        <video
        ref={videoRef}
        src={videoUrl}
        poster={poster || thumbnailUrl}
        width={width}
        height={height}
        className="w-full h-full"
        autoPlay={autoplay}
        loop={loop}
        muted={isMuted}
        preload={preload}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onPlay={handlePlay}
        onPause={handlePause}
        onError={(e) => {
          const error = videoRef.current?.error;
          console.error('Video error:', {
            error,
            videoId,
            libraryId,
            url: videoUrl,
            nativeError: e,
            errorCode: error?.code,
            errorMessage: error?.message
          });
          
          setIsLoading(false);
          
          // Детальна інформація про помилку
          if (error?.code === 4) {
            console.error('MEDIA_ELEMENT_ERROR: Format error - можливо відео не підтримується браузером');
            console.log('Спробуйте відкрити URL напряму:', videoUrl);
            console.log('Або використайте embed URL:', embedUrl);
            
            // Автоматично переключаємося на embed якщо є помилка формату
            if (embedUrl) {
              console.log('Переключаємося на embed плеєр');
              setUseEmbed(true);
            }
          } else {
            console.error('Video load failed:', error?.message || 'Unknown error');
          }
        }}
      >
        Ваш браузер не підтримує елемент відео.
      </video>

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      )}

      {/* Controls overlay */}
      {controls && (
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setShowControls(true)}
        >
          {/* Progress bar */}
          <div
            className="h-1.5 bg-white/20 cursor-pointer group"
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-[#00C4CF] transition-all"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>

          {/* Control buttons */}
          <div className="flex items-center gap-4 px-4 py-3">
            {/* Play/Pause */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlayPause();
              }}
              className="text-white hover:text-[#00C4CF] transition-colors"
            >
              {isPlaying ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 4l12 8-12 8V4z" />
                </svg>
              )}
            </button>

            {/* Volume */}
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute();
                }}
                className="text-white hover:text-[#00C4CF] transition-colors"
              >
                {isMuted || volume === 0 ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                )}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                onClick={(e) => e.stopPropagation()}
                className="w-24 accent-[#00C4CF]"
              />
            </div>

            {/* Time display */}
            <div className="text-white text-sm font-mono">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>

            <div className="flex-1" />

            {/* Fullscreen */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFullscreen();
              }}
              className="text-white hover:text-[#00C4CF] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
              </svg>
            </button>

            {/* Embed Player Toggle */}
            {embedUrl && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setUseEmbed(true);
                }}
                className="text-white hover:text-[#00C4CF] transition-colors"
                title="Switch to Embed Player"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Play button overlay (when paused) */}
      {!isPlaying && !controls && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer"
          onClick={togglePlayPause}
        >
          <div className="w-20 h-20 text-white/90 hover:text-white hover:scale-110 transition-transform">
            <svg viewBox="0 0 118 118" xmlns="http://www.w3.org/2000/svg">
              <circle opacity="0.6" fill="#1a1e2e" r="59" cy="59" cx="59" />
              <path
                fill="currentColor"
                transform="translate(91 31) rotate(90)"
                d="M23.287,9.145a6,6,0,0,1,10.425,0L51.886,41.029A6,6,0,0,1,46.674,50H10.326a6,6,0,0,1-5.213-8.971Z"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

