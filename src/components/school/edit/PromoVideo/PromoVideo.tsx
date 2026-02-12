"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const PromoVideo: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30);
  const [timeDisplay, setTimeDisplay] = useState("0:00 / 2:30");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const videoControlsRef = useRef<HTMLDivElement>(null);
  const videoPlayerRef = useRef<HTMLDivElement>(null);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownActive((prev) => !prev);
  };

  const showFeedbackToast = (message: string) => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToastMessage(message);
    setShowToast(true);
    toastTimerRef.current = setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const updateVideoProgress = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newProgress = Math.min(100, Math.max(0, pos * 100));
    setProgress(newProgress);

    const totalSeconds = 150;
    const currentSeconds = Math.floor((newProgress / 100) * totalSeconds);
    const minutes = Math.floor(currentSeconds / 60);
    const seconds = currentSeconds % 60;
    setTimeDisplay(`${minutes}:${seconds.toString().padStart(2, "0")} / 2:30`);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleReplaceVideo = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";
    input.click();
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        showFeedbackToast("Video uploaded successfully");
      }
    };
    setIsDropdownActive(false);
  };

  const handleDeleteVideo = () => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      showFeedbackToast("Video deleted successfully");
    }
    setIsDropdownActive(false);
  };

  const handleThumbnailSet = () => {
    showFeedbackToast("Current frame set as thumbnail");
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement && videoPlayerRef.current) {
      videoPlayerRef.current.requestFullscreen().catch((err) => {
        showFeedbackToast(`Error enabling fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    if (isPlaying) {
      progressIntervalRef.current = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            setIsPlaying(false);
            return 100;
          }
          const newProgress = prevProgress + 0.5;
          const totalSeconds = 150;
          const currentSeconds = Math.floor((newProgress * totalSeconds) / 100);
          const minutes = Math.floor(currentSeconds / 60);
          const seconds = currentSeconds % 60;
          setTimeDisplay(`${minutes}:${seconds.toString().padStart(2, "0")} / 2:30`);
          return newProgress;
        });
      }, 100);
    } else if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    };
  }, [isPlaying]);

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
        if (!videoPlayer.matches(":hover")) {
          controls.style.opacity = "0";
        }
      }, 2000);
    };

    const handleMouseLeave = () => {
      controlsTimeoutRef.current = setTimeout(() => {
        controls.style.opacity = "0";
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

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="hidden max-w-[1150px] gap-6 md:mx-auto md:flex">
        <div className="max-w-[350px] pr-6">
          <h1 className="mb-3 text-2xl font-semibold text-[#1B1B1B]">Promotional Video</h1>
          <p className="w-[350px] text-base leading-relaxed text-[#5F5F5F]">
            Showcase your school`s unique atmosphere, facilities, and student life
            through an engaging video tour. A compelling promotional video helps
            parents and students visualize the exceptional educational experience
            you offer.
          </p>
        </div>

        <div className="w-full rounded-lg bg-white p-6 shadow-[0_1px_3px_rgba(0,_0,_0,_0.1)]">
          <div className="flex items-start gap-5">
            <div className="relative h-[100px] w-40 overflow-hidden rounded-md">
              <Image src="https://i.ibb.co/rKkZH6DW/preview1.png" alt="Video thumbnail" fill className="object-cover" />
            </div>
            <div className="flex-1">
              <h2 className="mb-6 text-base font-medium text-[#1B1B1B]">
                Welcome to Our Academy - Virtual Tour 2024
              </h2>
              <button
                onClick={toggleExpand}
                className="flex items-center gap-2 rounded-md border border-[#E5E5E5] bg-white px-4 py-2 text-sm font-medium text-[#4A4A4A]"
              >
                Edit Video
                <svg viewBox="0 0 24 24" className={`h-3.5 w-3.5 transition-transform ${isExpanded ? "rotate-180" : ""}`}>
                  <path
                    fill="currentColor"
                    d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="md:hidden"
        style={{
          backgroundColor: "var(--background-color)",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
      >
        <div className="flex flex-col p-4">
          <div className="mb-4">
            <h1 className="mb-2 text-2xl font-semibold text-[var(--dark-text)]">
              Promotional Video
            </h1>
            <p className="text-sm leading-[1.5] text-[#5F5F5F]">
              Showcase your school&apos;s unique atmosphere, facilities, and student
              life through an engaging video tour. A compelling promotional video
              helps parents and students visualize the exceptional educational
              experience you offer.
            </p>
          </div>

          <div
            className="flex flex-1 flex-col rounded-lg bg-white p-4"
            style={{ boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="flex flex-col gap-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-md">
                <Image
                  src="https://i.ibb.co/rKkZH6DW/preview1.png"
                  alt="Video thumbnail"
                  fill
                  className="object-cover"
                />
                <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-[var(--play-button)]">
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
              <div className="flex flex-col gap-3">
                <h2 className="text-base font-medium text-[var(--dark-text)]">
                  Welcome to Our Academy - Virtual Tour 2024
                </h2>
                <button
                  type="button"
                  onClick={toggleExpand}
                  className="flex items-center justify-between rounded-md border border-[var(--border-color)] bg-white px-4 py-2 text-sm font-medium text-[var(--text-color)]"
                >
                  Edit Video
                  <svg
                    viewBox="0 0 24 24"
                    className="h-[14px] w-[14px] transition-transform"
                    style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0)" }}
                  >
                    <path
                      fill="currentColor"
                      d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className={`mt-4 ${isExpanded ? "block" : "hidden"}`}>
              <div
                ref={videoPlayerRef}
                className="relative aspect-video w-full overflow-hidden rounded-lg bg-black"
              >
                <Image
                  src="https://i.ibb.co/rKkZH6DW/preview1.png"
                  alt="Video thumbnail"
                  fill
                  className="object-cover"
                />
                <div className="absolute left-1/2 top-1/2 h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 cursor-pointer text-[var(--play-button)] transition-transform">
                  <svg viewBox="0 0 118 118" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(-1260 -363)">
                      <circle opacity="0.6" fill="#1a1e2e" transform="translate(1260 363)" r="59" cy="59" cx="59"></circle>
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
                  className="absolute bottom-0 left-0 right-0 flex items-center gap-3 bg-gradient-to-t from-black/80 to-transparent px-3 py-[10px]"
                  style={{ opacity: 1, transition: "opacity 0.3s ease" }}
                >
                  <button
                    type="button"
                    className="border-none bg-transparent p-1 text-white opacity-90"
                    onClick={togglePlayPause}
                  >
                    {isPlaying ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 4l12 8-12 8V4z" />
                      </svg>
                    )}
                  </button>
                  <div
                    className="relative h-[3px] flex-1 cursor-pointer rounded-[1.5px] bg-white/20"
                    onClick={updateVideoProgress}
                  >
                    <div
                      className="absolute left-0 top-0 h-full rounded-[1.5px] bg-[var(--play-button)]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-white opacity-90" style={{ fontFamily: "monospace" }}>
                    {timeDisplay}
                  </span>
                  <button type="button" className="border-none bg-transparent p-1 text-white opacity-90">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 9v6h4l5 5V4L7 9H3z" />
                    </svg>
                  </button>
                  <button type="button" className="border-none bg-transparent p-1 text-white opacity-90" onClick={handleFullscreen}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="mt-3 flex flex-col gap-3 py-1">
                <div className="relative w-full">
                  <button
                    ref={dropdownButtonRef}
                    type="button"
                    onClick={toggleDropdown}
                    className="flex items-center gap-1.5 border-none bg-transparent p-1.5 text-[13px] text-[var(--text-color)]"
                  >
                    Video Actions
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path
                        fill="currentColor"
                        d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z"
                      />
                    </svg>
                  </button>

                  <div
                    ref={dropdownRef}
                    className={`absolute left-0 top-full z-[100] min-w-[150px] rounded-lg border border-[var(--border-color)] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] ${
                      isDropdownActive ? "block" : "hidden"
                    }`}
                  >
                    <button
                      type="button"
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-[var(--text-color)] hover:bg-[var(--hover-bg)]"
                      onClick={handleReplaceVideo}
                    >
                      Replace Video
                    </button>
                    <button
                      type="button"
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-[var(--error-color)] hover:bg-[var(--hover-bg)]"
                      onClick={handleDeleteVideo}
                    >
                      Delete Video
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleThumbnailSet}
                  className="flex w-full items-center gap-1.5 border-none bg-transparent text-left text-[13px] text-[var(--dark-text)]"
                >
                  <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                    <path
                      clipRule="evenodd"
                      d="M5.897 2.25H6a.75.75 0 1 1 0 1.5c-.746 0-.971.006-1.138.051a1.5 1.5 0 0 0-1.06 1.06c-.045.167-.052.393-.052 1.139a.75.75 0 1 1-1.5 0v-.103c0-.597 0-1.04.102-1.423a3 3 0 0 1 2.122-2.122c.383-.103.826-.102 1.423-.102ZM13.138 3.8c-.166-.045-.392-.051-1.138-.051a.75.75 0 0 1 0-1.5h.103c.597 0 1.04 0 1.424.102a3 3 0 0 1 2.12 2.122c.104.383.103.826.103 1.423V6a.75.75 0 0 1-1.5 0c0-.746-.006-.972-.051-1.138a1.5 1.5 0 0 0-1.06-1.06ZM6 7.5a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 6 7.5Zm0 3a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3A.75.75 0 0 1 6 10.5Zm-3 .75a.75.75 0 0 1 .75.75c0 .746.007.972.051 1.138a1.5 1.5 0 0 0 1.06 1.06c.168.045.393.052 1.14.052a.75.75 0 0 1 0 1.5h-.104c-.597 0-1.04 0-1.423-.102a3 3 0 0 1-2.122-2.122c-.103-.383-.102-.826-.102-1.423V12a.75.75 0 0 1 .75-.75Zm12 0a.75.75 0 0 1 .75.75v.103c0 .597 0 1.04-.102 1.423a3 3 0 0 1-2.121 2.122c-.384.103-.827.102-1.424.102H12a.75.75 0 0 1 0-1.5c.746 0 .972-.007 1.138-.051a1.5 1.5 0 0 0 1.061-1.06c.045-.167.051-.393.051-1.139a.75.75 0 0 1 .75-.75Z"
                      fillRule="evenodd"
                      fill="currentColor"
                    ></path>
                  </svg>
                  Use current frame as thumbnail
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`pointer-events-none fixed bottom-20 left-1/2 z-[2000] w-[280px] max-w-[calc(100%-40px)] -translate-x-1/2 rounded-lg bg-[var(--hover-bg)] px-4 py-3 text-center text-sm text-[var(--dark-text)] shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300 ${
          showToast ? "translate-y-0 opacity-100" : "translate-y-[120%] opacity-0"
        }`}
      >
        {toastMessage}
      </div>
    </>
  );
};

export default PromoVideo;
