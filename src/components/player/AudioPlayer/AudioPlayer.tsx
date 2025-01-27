'use client';

import { FC, useEffect, useRef } from 'react';
import { Controls } from './Controls';
import { Progress } from './Progress';
import { useAudioPlayer } from '@/store/use-audio-player';
import { mockAudioBook } from '@/mocks/audio';
import { Icon } from '@/components/ui/Icon';
import Image from 'next/image';
import { PlaybackRateControl } from './PlaybackRateControl';
import { Playlist } from '../Playlist/Playlist';
import { cn } from '@/lib/utils';

export const AudioPlayer: FC = () => {
  const { 
    setCurrentBook, 
    isExpanded, 
    setExpanded,
    currentBook,
    currentChapter,
    setPlaylistVisible
  } = useAudioPlayer();
  const dragRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startY = useRef(0);

  useEffect(() => {
    setCurrentBook(mockAudioBook);
  }, [setCurrentBook]);

  useEffect(() => {
    const dragElement = dragRef.current;
    if (!dragElement || isExpanded) return;

    // Touch Events
    const handleTouchStart = (e: TouchEvent) => {
      isDragging.current = true;
      startY.current = e.touches[0].clientY;
      dragElement.style.transition = 'none';
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;

      const deltaY = startY.current - e.touches[0].clientY;
      if (deltaY < 0) return;

      if (deltaY > 100) {
        setExpanded(true);
        isDragging.current = false;
        return;
      }
    };

    const handleTouchEnd = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      dragElement.style.transform = '';
      dragElement.style.transition = '';
    };

    // Mouse Events
    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      startY.current = e.clientY;
      dragElement.style.transition = 'none';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;

      const deltaY = startY.current - e.clientY;
      if (deltaY < 0) return;

      if (deltaY > 100) {
        setExpanded(true);
        isDragging.current = false;
        return;
      }
    };

    const handleMouseUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      dragElement.style.transform = '';
      dragElement.style.transition = '';
    };

    // Touch Events
    dragElement.addEventListener('touchstart', handleTouchStart);
    dragElement.addEventListener('touchmove', handleTouchMove);
    dragElement.addEventListener('touchend', handleTouchEnd);

    // Mouse Events
    dragElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      // Touch Events
      dragElement.removeEventListener('touchstart', handleTouchStart);
      dragElement.removeEventListener('touchmove', handleTouchMove);
      dragElement.removeEventListener('touchend', handleTouchEnd);

      // Mouse Events
      dragElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [setExpanded, isExpanded]);

  const handlePlaylistClick = () => {
    setExpanded(false);
    setPlaylistVisible(true);
  };

  const handleDownload = () => {
    const audioUrl = '/path/to/audio.mp3';
    
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = 'How to Talk to Anyone - Chapter 1.mp3';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isExpanded) {
    const chapter = currentBook?.chapters[currentChapter];

    return (
      <>
        <Playlist />
        <div className="fixed inset-0 bg-[#0a447e] z-[51] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4">
            <button onClick={() => setExpanded(false)}>
              <Icon name="chevron-down" className="w-6 h-6 text-white" />
            </button>
            <div className="flex items-center gap-4">
              <Icon name="settings" className="w-6 h-6 text-white/80" />
              <Icon name="equalizer" className="w-6 h-6 text-white/80" />
              <Icon name="more" className="w-6 h-6 text-white/80" />
            </div>
          </div>

          {/* Main Content - with flex-1 to push footer down */}
          <div className="flex-1 flex flex-col items-center px-6 pt-8">
            {/* Book Cover */}
            <div className="w-48 h-64 relative mb-6">
              <Image 
                src={currentBook?.coverUrl || '/images/cat.png'} 
                alt="Book cover" 
                fill
                className="rounded-lg shadow-lg object-cover"
              />
            </div>

            {/* Title and Chapter */}
            <h2 className="text-xl font-bold text-white mb-2">
              {currentBook?.title}
            </h2>
            <p className="text-white/60 text-sm mb-8">
              {chapter?.title}
            </p>

            {/* Progress */}
            <div className="w-full mb-8">
              <Progress />
            </div>

            <Controls />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between px-8 pb-2">
            <PlaybackRateControl />
            <div className="flex items-center gap-6">
              <button 
                className="text-white/80 hover:text-white transition-colors"
                onClick={handlePlaylistClick}
              >
                <Icon name="playlist" className="w-6 h-6" />
              </button>
              <button 
                className="text-white/80 hover:text-white transition-colors"
                onClick={handleDownload}
              >
                <Icon name="download" className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto bg-[#003366] rounded-t-[24px] relative">
            {/* Dragable element */}
            <div className="absolute left-1/2 p-2 rounded-full -translate-x-1/2 bg-[#0a447e] -top-2">
              <div className="w-12 h-1 bg-blue-400 rounded-full" />
            </div>

            {/* Playlist label */}
            <div className="text-center pb-4 pt-3">
              <span className="text-white text-md">Playlist</span>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Compact view
  return (
    <>
      <Playlist />
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className={cn(
          "bg-[#003366]",
          "transition-all duration-300",
          isExpanded 
            ? "h-screen" 
            : "h-[72px]",
          "mr-0 md:mr-16",
          "lg:mr-80",
          "xl:mr-[520px]"
        )}>
          <div className="max-w-7xl mx-auto relative h-full">
            {/* Dragable handle */}
            <div 
              ref={dragRef}
              className="absolute left-1/2 p-2 bg-white rounded-full -translate-x-1/2 -top-2 cursor-grab active:cursor-grabbing touch-none"
            >
              <div className="w-12 h-1 bg-blue-400 rounded-full" />
            </div>

            {/* Main content */}
            <div className="px-4 py-4">
              <Progress compact />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};