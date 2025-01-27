import { FC, useCallback } from 'react';
import * as Slider from '@radix-ui/react-slider';
import { useAudioPlayer } from '@/store/use-audio-player';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const Progress: FC<{ compact?: boolean }> = ({ compact }) => {
  const { currentTime, duration, setCurrentTime } = useAudioPlayer();

  const formatTime = useCallback((seconds: number) => {
    return dayjs.duration(seconds, 'seconds').format('mm:ss');
  }, []);

  const formatTimeLeft = useCallback((totalSeconds: number) => {
    const minutesLeft = Math.ceil((duration - totalSeconds) / 60);
    return `${minutesLeft}min left`;
  }, [duration]);

  if (compact) {
    return (
      <div className="w-full">
        <div className="grid grid-cols-3 text-center mb-1">
          <span className="text-white/80 text-sm text-left">0/13</span>
          <span className="text-white/80 text-sm">Player</span>
          <span className="text-white/80 text-sm text-right">{formatTimeLeft(currentTime)}</span>
        </div>
        <Slider.Root
          className="relative flex items-center h-1 cursor-pointer"
          value={[currentTime]}
          max={duration}
          step={1}
          onValueChange={([value]) => setCurrentTime(value)}
        >
          <Slider.Track className="relative h-0.5 flex-1 bg-white/20 rounded-full">
            <Slider.Range className="absolute h-full bg-white rounded-full" />
          </Slider.Track>
        </Slider.Root>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 flex-1">
      <span className="text-xs text-gray-500 w-10">
        {formatTime(currentTime)}
      </span>

      <Slider.Root
        className="relative flex-1 flex items-center h-5 cursor-pointer"
        value={[currentTime]}
        max={duration}
        step={1}
        onValueChange={([value]) => setCurrentTime(value)}
      >
        <Slider.Track className="relative h-1 flex-1 bg-gray-200 rounded-full">
          <Slider.Range className="absolute h-full bg-primary rounded-full" />
        </Slider.Track>
        <Slider.Thumb 
          className="block w-3 h-3 bg-primary rounded-full hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" 
        />
      </Slider.Root>

      <span className="text-xs text-gray-500 w-10">
        {formatTime(duration)}
      </span>
    </div>
  );
}; 