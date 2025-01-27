import { FC, useState } from 'react';
import * as Slider from '@radix-ui/react-slider';
import { Icon } from '@/components/ui/Icon';
import { useAudioPlayer } from '@/store/use-audio-player';

export const VolumeControl: FC = () => {
  const { volume, setVolume, isMuted, setMuted } = useAudioPlayer();
  const [isHovered, setIsHovered] = useState(false);

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return "volume-off";
    if (volume < 0.5) return "volume-low";
    return "volume-high";
  };

  return (
    <div 
      className="relative flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={() => setMuted(!isMuted)}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <Icon name={getVolumeIcon()} className="w-5 h-5 text-gray-600" />
      </button>

      <div className={`
        absolute bottom-full left-1/2 -translate-x-1/2 mb-2 
        transition-opacity duration-200
        ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}>
        <div className="bg-white rounded-lg shadow-lg p-2 w-8 h-32">
          <Slider.Root
            className="relative flex items-center h-full cursor-pointer"
            orientation="vertical"
            value={[isMuted ? 0 : volume]}
            max={1}
            step={0.1}
            onValueChange={([value]) => setVolume(value)}
          >
            <Slider.Track className="relative w-1 flex-1 bg-gray-200 rounded-full">
              <Slider.Range className="absolute w-full bg-primary rounded-full" />
            </Slider.Track>
            <Slider.Thumb 
              className="block w-3 h-3 bg-primary rounded-full hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" 
            />
          </Slider.Root>
        </div>
      </div>
    </div>
  );
}; 