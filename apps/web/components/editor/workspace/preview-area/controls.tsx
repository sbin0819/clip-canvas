'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import useSideOptions from '@/app/store/use-side-options';
import { FaPlay, FaPause } from 'react-icons/fa';
import { formatTime, roundToNearestThousand } from './controls.helper';
import WaveForm from './wave-form';

export default function Controls() {
  const { frames, audioPath } = useSideOptions((state) => ({
    frames: state.options.frames,
    audioPath: state.options.option.defaultAudio[state.options.option.audio],
  }));

  const totalDuration = roundToNearestThousand(
    frames.reduce((acc, curr) => acc + curr.duration, 0),
  );

  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [animationStart, setAnimationStart] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const updateTimer = useCallback(
    (currentTime: number) => {
      if (animationStart === null) {
        setAnimationStart(currentTime);
      } else {
        const secondsElapsed = (currentTime - animationStart) / 1000;
        const updatedElapsedTime = Math.min(
          secondsElapsed,
          totalDuration / 1000,
        );
        setElapsedTime(updatedElapsedTime);

        if (updatedElapsedTime >= totalDuration / 1000) {
          setIsPlaying(false);
          return;
        }

        if (isPlaying) {
          requestAnimationFrame(updateTimer);
        }
      }
    },
    [isPlaying, animationStart, totalDuration],
  );

  useEffect(() => {
    setElapsedTime(0);
    setAnimationStart(null);
  }, [totalDuration, isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      requestAnimationFrame(updateTimer);
      if (audioRef.current) {
        audioRef.current.play();
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [isPlaying, updateTimer]);

  const togglePlayState = () => {
    if (elapsedTime >= totalDuration / 1000 || !isPlaying) {
      setElapsedTime(0);
      setAnimationStart(null);
    }
    setIsPlaying(!isPlaying);
  };

  const currentTimeDisplay = formatTime(elapsedTime);
  const totalTimeDisplay = formatTime(totalDuration / 1000);

  return (
    <div className="mt-10">
      <audio ref={audioRef} src={audioPath} preload="auto" />
      <div className="w-full h-full bg-gray-50 rounded-md border border-gray-300 px-2 py-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="text-md">{currentTimeDisplay}</div>
            <div>/</div>
            <div className="text-md">{totalTimeDisplay}</div>
          </div>
          <button
            onClick={togglePlayState}
            className="px-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
        </div>
        <div className="w-full mt-4">
          <WaveForm src={audioPath as string} currentTime={elapsedTime} />
        </div>
      </div>
    </div>
  );
}
