import { FC } from 'react';
import { Icon } from '@/components/ui/Icon';
import { useAudioPlayer } from '@/store/use-audio-player';

export const Controls: FC<{ compact?: boolean }> = ({ compact }) => {
  const { 
    isPlaying, 
    setIsPlaying, 
    currentChapter, 
    totalChapters,
    nextChapter, 
    previousChapter,
    skipForward,
    skipBackward,
    audioElement
  } = useAudioPlayer();

  const togglePlay = () => {
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (compact) {
    return (
      <button onClick={togglePlay} className="p-2">
        <Icon 
          name={isPlaying ? "play" : "pause"} 
          className="w-6 h-6 text-white" 
        />
      </button>
    );
  }

  return (
    <div className="flex items-center justify-center gap-8">
      <button 
        onClick={() => previousChapter()}
        disabled={currentChapter === 0}
        className="text-white/80 hover:text-white disabled:opacity-50"
      >
        <Icon name="previous" className="w-8 h-8" />
      </button>

      <button 
        onClick={() => skipBackward()}
        className="text-white/80 hover:text-white"
      >
        <Icon name="replay-15" className="w-8 h-8" />
      </button>

      <button 
        onClick={togglePlay}
        className="bg-white rounded-full p-4 hover:scale-105 transition-transform"
      >
        <Icon 
          name={isPlaying ? "play" : "pause"} 
          className="w-8 h-8 text-[#003366]" 
        />
      </button>

      <button 
        onClick={() => skipForward()}
        className="text-white/80 hover:text-white"
      >
        <Icon name="forward-5" className="w-8 h-8" />
      </button>

      <button 
        onClick={() => nextChapter()}
        disabled={currentChapter === totalChapters - 1}
        className="text-white/80 hover:text-white disabled:opacity-50"
      >
        <Icon name="next" className="w-8 h-8" />
      </button>
    </div>
  );
}; 