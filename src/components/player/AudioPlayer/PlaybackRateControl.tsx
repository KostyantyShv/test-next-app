import { FC, useState } from 'react';
import { useAudioPlayer } from '@/store/use-audio-player';
import { Modal } from '@/components/ui/Modal';
import * as Slider from '@radix-ui/react-slider';

const PLAYBACK_RATES = [0.5, 1, 1.5, 2];

export const PlaybackRateControl: FC = () => {
  const { playbackRate, setPlaybackRate, duration, currentTime } = useAudioPlayer();
  const [isOpen, setIsOpen] = useState(false);
  const [tempRate, setTempRate] = useState(playbackRate);

  const getTimeLeft = (rate: number) => {
    const timeLeft = (duration - currentTime) / rate;
    const minutes = Math.ceil(timeLeft / 60);
    return `${minutes}min left`;
  };

  const rateToSliderValue = (rate: number) => {
    const index = PLAYBACK_RATES.indexOf(rate);
    return (index / (PLAYBACK_RATES.length - 1)) * 100;
  };

  const sliderValueToRate = (value: number) => {
    const index = Math.round((value / 100) * (PLAYBACK_RATES.length - 1));
    return PLAYBACK_RATES[index];
  };

  return (
    <>
      <button 
        className="text-white/80 flex items-center gap-1 hover:text-white"
        onClick={() => setIsOpen(true)}
      >
        <span className="text-sm">{playbackRate}x</span>
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="space-y-8 px-2">
          <h2 className="text-lg font-semibold">Narration Speed</h2>

          <div className="text-center">
            <div className="text-2xl font-medium mb-1">{tempRate}x</div>
            <div className="text-sm text-gray-500">
              {getTimeLeft(tempRate)}
            </div>
          </div>

          <div className="px-4">
            <Slider.Root
              className="relative flex items-center select-none touch-none h-5"
              value={[rateToSliderValue(tempRate)]}
              onValueChange={([value]) => setTempRate(sliderValueToRate(value))}
              max={100}
              step={1}
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-1">
                <Slider.Range className="absolute bg-emerald-400 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb 
                className="block w-5 h-5 bg-white rounded-full border-2 border-emerald-400 focus:outline-none"
              />
            </Slider.Root>

            <div className="flex justify-between mt-2">
              {PLAYBACK_RATES.map(rate => (
                <span 
                  key={rate}
                  className={`text-sm ${
                    tempRate === rate ? 'text-emerald-400 font-medium' : 'text-gray-500'
                  }`}
                >
                  {rate}x
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-between gap-4 pt-4">
            <button
              onClick={() => setIsOpen(false)}
              className="flex-1 py-3 text-gray-600 font-medium rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setPlaybackRate(tempRate);
                setIsOpen(false);
              }}
              className="flex-1 py-3 bg-emerald-400 text-white font-medium rounded-lg hover:bg-emerald-500"
            >
              Apply
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}; 