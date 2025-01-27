import { FC } from 'react';
import { useAudioPlayer } from '@/store/use-audio-player';

export const ChapterInfo: FC<{ compact?: boolean }> = ({ compact }) => {
  const { currentChapter, totalChapters, chapters } = useAudioPlayer();
  const chapter = chapters[currentChapter];

  if (!chapter) return null;

  if (compact) {
    return (
      <div className="min-w-0">
        <span className="text-xs text-white/80">
          {currentChapter + 1}/{totalChapters} {chapter.title}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 min-w-0">
      <span className="text-xs text-gray-500">
        {currentChapter + 1}/{totalChapters}
      </span>
      <h3 className="text-sm text-gray-700 font-medium truncate">
        {chapter.title}
      </h3>
    </div>
  );
}; 