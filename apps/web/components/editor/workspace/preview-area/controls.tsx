'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import useToolOptions, {
  FrameState,
  Slides,
} from '@/app/store/use-tool-options';
import { FaPlay, FaPause } from 'react-icons/fa';
import { formatTime, roundToNearestThousand } from './controls.helper';
import WaveForm from './waveform';
import { produce } from 'immer';

export default function Controls() {
  const { frames, currentFrame, audioPath, setOptions } = useToolOptions(
    (state) => ({
      frames: state.options.frames,
      currentFrame: state.options.frames[state.options.option.currentFrameIdx],
      audioPath: state.options.option.defaultAudio[
        state.options.option.audio
      ] as string,
      setOptions: state.setOptions,
    }),
  );

  const totalDuration = roundToNearestThousand(
    frames.reduce((acc, curr) => acc + curr.duration, 0),
  );

  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);

  const currentTimeDisplay = formatTime(elapsedTime);
  const totalTimeDisplay = formatTime(totalDuration / 1000);

  const updateElapsedTime = useCallback(() => {
    if (audioRef.current) {
      const newTime = audioRef.current.currentTime;
      if (newTime >= totalDuration / 1000) {
        setElapsedTime(0);
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
      } else {
        setElapsedTime(newTime);
        animationRef.current = requestAnimationFrame(updateElapsedTime);
      }
    }
  }, [totalDuration]);

  const togglePlayState = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
      } else {
        audioRef.current.play();
        animationRef.current = requestAnimationFrame(updateElapsedTime);
      }
    }
  }, [isPlaying, updateElapsedTime]);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.addEventListener('play', () => setIsPlaying(true));
      audio.addEventListener('pause', () => {
        setIsPlaying(false);
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
      });
      audio.addEventListener('ended', () => {
        setElapsedTime(0);
        setIsPlaying(false);
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
      });

      return () => {
        if (audio) {
          audio.removeEventListener('play', () => setIsPlaying(true));
          audio.removeEventListener('pause', () => setIsPlaying(false));
          audio.removeEventListener('ended', () => {
            setElapsedTime(0);
            setIsPlaying(false);
          });
        }
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
      };
    }
  }, []);

  const getCurrentFrame = useCallback(
    (elapsedTime: number): FrameState => {
      let elapsed = elapsedTime * 1000;
      let total = 0;
      for (let i = 0; i < frames.length; i++) {
        let frame = frames[i] as FrameState;
        if (elapsed >= total && elapsed < total + frame.duration) {
          return frame;
        }
        total += frame.duration;
      }
      return frames[frames.length - 1] as FrameState;
    },
    [frames],
  );

  const updateCurrentFrame = useCallback(() => {
    const frame = getCurrentFrame(elapsedTime);

    if (currentFrame) {
      setOptions((oldOptions: Slides) =>
        produce(oldOptions, (draftOptions) => {
          const currentFrameIdx = frames.findIndex((f) => f === frame);
          draftOptions.option.currentFrameIdx = currentFrameIdx;
          draftOptions.option.currentFrameId = frame ? frame.id : '';
        }),
      );
    }
  }, [currentFrame, elapsedTime, frames, getCurrentFrame, setOptions]);

  useEffect(() => {
    updateCurrentFrame();
  }, [updateCurrentFrame]);

  const onSeekTo = (time: number) => {
    const newTime = time / 1000;
    setElapsedTime(newTime);

    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }

    updateCurrentFrame();
  };

  return (
    <div className="mt-10">
      <audio ref={audioRef} src={audioPath} preload="auto" />
      <div className="w-full h-full bg-gray-50 rounded-md border border-gray-300 px-2 py-4">
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlayState}
            className="px-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
          >
            {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} />}
          </button>
          <div className="flex items-center gap-1">
            <div className="text-md">{currentTimeDisplay}</div>
            <div>/</div>
            <div className="text-md">{totalTimeDisplay}</div>
          </div>
        </div>
        <div className="w-full mt-4">
          <WaveForm
            currentTime={Math.round(elapsedTime * 1000)}
            totalTime={totalDuration}
            onSeekTo={onSeekTo}
          />
        </div>
      </div>
    </div>
  );
}
