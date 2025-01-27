'use client';

import { FC } from 'react';
import Image from 'next/image';
import { Icon } from '@/components/ui/Icon';
import { useAudioPlayer } from '@/store/use-audio-player';

interface PlaylistItem {
  id: string;
  title: string;
  duration: string;
  coverUrl: string;
}

const mockPlaylist: PlaylistItem[] = [
  {
    id: '1',
    title: 'How to Talk to Anyone',
    duration: '22min',
    coverUrl: '/images/cat.png'
  },
  {
    id: '2',
    title: 'Magic Words',
    duration: '24min',
    coverUrl: '/images/cat.png'
  },
  {
    id: '3',
    title: 'Think Like a Rocket Scientist',
    duration: '18min',
    coverUrl: '/images/cat.png'
  },
  {
    id: '4',
    title: 'The Power of Small Talk',
    duration: '15min',
    coverUrl: '/images/cat.png'
  }
];

export const Playlist: FC = () => {
  const { 
    isPlaylistVisible, 
    setPlaylistVisible, 
    setPlayerVisible,
    setExpanded 
  } = useAudioPlayer();

  const handlePlayNowPlaying = () => {
    setPlaylistVisible(false);
    setPlayerVisible(true);
    setExpanded(true);
  };

  if (!isPlaylistVisible) return null;

  return (
    <div className="fixed inset-0 bg-[#003366] z-[100] flex flex-col">
      {/* Header */}
      <div className="p-4">
        <button 
          onClick={() => setPlaylistVisible(false)}
          className="text-white/80 hover:text-white"
        >
          <Icon name="chevron-down" className="w-6 h-6" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-4">
        {/* Now Playing */}
        <div className="mb-8">
          <div className="text-white/60 text-sm mb-4">NOW PLAYING</div>
          <div 
            className="flex items-center gap-4 bg-white/10 p-4 rounded-lg cursor-pointer hover:bg-white/20 transition-colors"
            onClick={handlePlayNowPlaying}
          >
            <div className="w-12 h-12 relative shrink-0">
              <Image
                src="/images/cat.png"
                alt="Book cover"
                fill
                className="object-cover rounded"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white font-medium truncate">How to Talk to Anyone</div>
              <div className="text-white/60 text-sm">Chapter 1 of 12 • 22min left</div>
            </div>
            <button className="text-white/80 hover:text-white p-2">
              <Icon name="play" className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Up Next */}
        <div>
          <div className="text-white/60 text-sm mb-4">UP NEXT</div>
          <div className="space-y-4">
            {mockPlaylist.slice(1).map((item) => (
              <div 
                key={item.id} 
                className="flex items-center gap-4 p-4"
              >
                <div className="w-12 h-12 relative shrink-0">
                  <Image
                    src={item.coverUrl}
                    alt={item.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium truncate">{item.title}</div>
                  <div className="text-white/60 text-sm">{item.duration}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 