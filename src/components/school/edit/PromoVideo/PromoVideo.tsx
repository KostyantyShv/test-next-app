"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

const PromoVideo: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30); // Start at 30% as in original
  const [timeDisplay, setTimeDisplay] = useState("0:00 / 2:30");

  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const videoControlsRef = useRef<HTMLDivElement>(null);
  const videoPlayerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownActive(!isDropdownActive);
  };

  const updateVideoProgress = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newProgress = pos * 100;
    setProgress(newProgress);

    // Update time display
    const totalSeconds = 150; // 2:30 in seconds
    const currentSeconds = Math.floor(pos * totalSeconds);
    const minutes = Math.floor(currentSeconds / 60);
    const seconds = currentSeconds % 60;
    setTimeDisplay(`${minutes}:${seconds.toString().padStart(2, "0")} / 2:30`);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReplaceVideo = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";
    input.click();

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        alert("Video uploaded successfully");
      }
    };
    setIsDropdownActive(false);
  };

  const handleDeleteVideo = () => {
    if (confirm("Are you sure you want to delete this video?")) {
      alert("Video deleted successfully");
    }
    setIsDropdownActive(false);
  };

  const handleThumbnailSet = () => {
    alert("Current frame set as thumbnail");
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement && videoPlayerRef.current) {
      videoPlayerRef.current.requestFullscreen().catch((err) => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Handle video progress when playing
  useEffect(() => {
    if (isPlaying) {
      progressIntervalRef.current = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            setIsPlaying(false);
            return 100;
          }

          const newProgress = prevProgress + 0.5;

          // Update time display
          const totalSeconds = 150; // 2:30 in seconds
          const currentSeconds = Math.floor((newProgress * totalSeconds) / 100);
          const minutes = Math.floor(currentSeconds / 60);
          const seconds = currentSeconds % 60;
          setTimeDisplay(
            `${minutes}:${seconds.toString().padStart(2, "0")} / 2:30`
          );

          return newProgress;
        });
      }, 100);
    } else {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isPlaying]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        dropdownButtonRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !dropdownButtonRef.current.contains(e.target as Node)
      ) {
        setIsDropdownActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle video controls visibility
  useEffect(() => {
    const videoPlayer = videoPlayerRef.current;
    const controls = videoControlsRef.current;

    if (!videoPlayer || !controls) return;

    const handleMouseMove = () => {
      controls.style.opacity = "1";

      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }

      controlsTimeoutRef.current = setTimeout(() => {
        if (videoPlayer && !videoPlayer.matches(":hover")) {
          if (controls) controls.style.opacity = "0";
        }
      }, 2000);
    };

    const handleMouseLeave = () => {
      controlsTimeoutRef.current = setTimeout(() => {
        if (controls) controls.style.opacity = "0";
      }, 1000);
    };

    videoPlayer.addEventListener("mousemove", handleMouseMove);
    videoPlayer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      videoPlayer.removeEventListener("mousemove", handleMouseMove);
      videoPlayer.removeEventListener("mouseleave", handleMouseLeave);

      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isExpanded]);

  return (
    <div className="flex gap-6 max-w-[1150px] max-md:flex-col mx-auto">
      {/* Left section */}
      <div className="max-w-[350px] pr-6">
        <h1 className="text-2xl font-semibold mb-3 text-[#1B1B1B]" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
          Promotional Video
        </h1>
        <p className="text-[#5F5F5F] text-base leading-relaxed w-[350px]">
          Showcase your school`s unique atmosphere, facilities, and student life
          through an engaging video tour. A compelling promotional video helps
          parents and students visualize the exceptional educational experience
          you offer.
        </p>
      </div>

      {/* Right section */}
      <div className="w-full bg-white rounded-lg p-6 shadow-[0_1px_3px_rgba(0,_0,_0,_0.1)]">
        <div className="flex gap-5 items-start max-md:flex-col">
          <div className="relative w-40 max-md:h-[200px] md:h-[100px] max-md:w-full rounded-md overflow-hidden flex-shrink-0">
            <Image
              src="https://i.ibb.co/rKkZH6DW/preview1.png"
              alt="Video thumbnail"
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#00C4CF] w-10 h-10">
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

          <div className="flex-1 max-md:w-full">
            <h2 className="text-base font-medium text-[#1B1B1B] mb-6">
              Welcome to Our Academy - Virtual Tour 2024
            </h2>
            <button
              onClick={toggleExpand}
              className="flex items-center max-md:w-full gap-2 px-4 py-2 bg-white border border-[#E5E5E5] rounded-md text-sm font-medium text-[#4A4A4A] transition-all duration-200 hover:bg-[#F8F9FA]"
            >
              Edit Video
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
          <div
            ref={videoPlayerRef}
            className="relative w-full rounded-lg overflow-hidden bg-black aspect-video"
          >
            <Image
              src="https://i.ibb.co/rKkZH6DW/preview1.png"
              alt="Video thumbnail"
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 text-[#00C4CF] cursor-pointer transition-transform duration-200">
              <svg viewBox="0 0 118 118" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(-1260 -363)">
                  <circle
                    opacity="0.6"
                    fill="#1a1e2e"
                    transform="translate(1260 363)"
                    r="59"
                    cy="59"
                    cx="59"
                  ></circle>
                  <path
                    fill="currentColor"
                    transform="translate(1351 394) rotate(90)"
                    d="M23.287,9.145a6,6,0,0,1,10.425,0L51.886,41.029A6,6,0,0,1,46.674,50H10.326a6,6,0,0,1-5.213-8.971Z"
                  ></path>
                </g>
              </svg>
            </div>

            <div
              ref={videoControlsRef}
              className="absolute bottom-0 left-0 right-0 flex items-center gap-3 px-4 py-3 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300"
              style={{ opacity: 1 }}
            >
              <button
                onClick={togglePlayPause}
                className="bg-transparent border-none p-1 cursor-pointer text-white opacity-90 hover:opacity-100 transition-opacity duration-200"
              >
                {isPlaying ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M6 4l12 8-12 8V4z" />
                  </svg>
                )}
              </button>

              <div
                onClick={updateVideoProgress}
                className="flex-1 h-[3px] bg-white/20 rounded-[1.5px] relative cursor-pointer"
              >
                <div
                  className="absolute left-0 top-0 h-full bg-[#00C4CF] rounded-[1.5px]"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <span className="text-white text-xs font-mono opacity-90">
                {timeDisplay}
              </span>

              <button className="bg-transparent border-none p-1 cursor-pointer text-white opacity-90 hover:opacity-100 transition-opacity duration-200">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3 9v6h4l5 5V4L7 9H3z" />
                </svg>
              </button>

              <button
                onClick={handleFullscreen}
                className="bg-transparent border-none p-1 cursor-pointer text-white opacity-90 hover:opacity-100 transition-opacity duration-200"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex justify-between max-md:flex-col md:items-center max-md:gap-2 mt-4 py-2">
            <div className="relative">
              <button
                ref={dropdownButtonRef}
                onClick={toggleDropdown}
                className="flex items-center gap-2 bg-transparent border-none text-[#4A4A4A] text-sm cursor-pointer p-2"
              >
                Video Actions
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                >
                  <path
                    fill="currentColor"
                    d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z"
                  />
                </svg>
              </button>

              <div
                ref={dropdownRef}
                className={`absolute top-full left-0 bg-white border border-[#E5E5E5] rounded-lg shadow-lg min-w-[160px] z-10 ${
                  isDropdownActive ? "block" : "hidden"
                }`}
              >
                <div
                  onClick={handleReplaceVideo}
                  className="px-4 py-2 text-[#4A4A4A] text-sm cursor-pointer flex items-center gap-2 hover:bg-[#F8F9FA]"
                >
                  Replace Video
                </div>
                <div
                  onClick={handleDeleteVideo}
                  className="px-4 py-2 text-[#FF4D4D] text-sm cursor-pointer flex items-center gap-2 hover:bg-[#F8F9FA]"
                >
                  Delete Video
                </div>
              </div>
            </div>

            <div
              onClick={handleThumbnailSet}
              className="flex items-center gap-2 text-[#1B1B1B] text-sm font-medium cursor-pointer hover:text-[#02C5AF]"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M5.897 2.25H6a.75.75 0 1 1 0 1.5c-.746 0-.971.006-1.138.051a1.5 1.5 0 0 0-1.06 1.06c-.045.167-.052.393-.052 1.139a.75.75 0 1 1-1.5 0v-.103c0-.597 0-1.04.102-1.423a3 3 0 0 1 2.122-2.122c.383-.103.826-.102 1.423-.102ZM13.138 3.8c-.166-.045-.392-.051-1.138-.051a.75.75 0 0 1 0-1.5h.103c.597 0 1.04 0 1.424.102a3 3 0 0 1 2.12 2.122c.104.383.103.826.103 1.423V6a.75.75 0 0 1-1.5 0c0-.746-.006-.972-.051-1.138a1.5 1.5 0 0 0-1.06-1.06ZM6 7.5a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 6 7.5Zm0 3a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3A.75.75 0 0 1 6 10.5Zm-3 .75a.75.75 0 0 1 .75.75c0 .746.007.972.051 1.138a1.5 1.5 0 0 0 1.06 1.06c.168.045.393.052 1.14.052a.75.75 0 0 1 0 1.5h-.104c-.597 0-1.04 0-1.423-.102a3 3 0 0 1-2.122-2.122c-.103-.383-.102-.826-.102-1.423V12a.75.75 0 0 1 .75-.75Zm12 0a.75.75 0 0 1 .75.75v.103c0 .597 0 1.04-.102 1.423a3 3 0 0 1-2.121 2.122c-.384.103-.827.102-1.424.102H12a.75.75 0 0 1 0-1.5c.746 0 .972-.007 1.138-.051a1.5 1.5 0 0 0 1.061-1.06c.045-.167.051-.393.051-1.139a.75.75 0 0 1 .75-.75Z"
                  fillRule="evenodd"
                  fill="currentColor"
                ></path>
              </svg>
              Use current frame as thumbnail
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoVideo;
