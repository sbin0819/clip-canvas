'use client';
import { useState, useEffect } from 'react';

interface WaveformProps {
  totalTime: number;
  currentTime: number;
  onSeekTo: (time: number) => void;
}

const TrackWaveForm = ({ totalTime, currentTime, onSeekTo }: WaveformProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [barHeights, setBarHeights] = useState<number[]>([]);
  const barCount = 100;
  const percentage = (currentTime / totalTime) * 100;

  useEffect(() => {
    const heights = Array.from({ length: barCount }, () =>
      Math.floor(Math.random() * (24 - 16 + 1) + 16),
    );
    setBarHeights(heights);
  }, [barCount]);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updateSeekTime(event);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      updateSeekTime(event);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateSeekTime = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const clickedTime = Math.max(
      0,
      Math.min((x / rect.width) * totalTime, totalTime),
    );
    onSeekTo(clickedTime);
  };

  const getBars = () =>
    barHeights.map((height, i) => (
      <div
        key={i}
        className={`${
          i < percentage * 0.01 * barCount ? 'bg-teal-500' : 'bg-gray-300'
        } transition-colors duration-150`}
        style={{
          height: `${height}px`,
          width: `${100 / barCount}%`,
          alignSelf: 'center',
        }}
      />
    ));

  return (
    <div
      className="flex justify-center items-center h-10 rounded-lg overflow-hidden cursor-pointer"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      onMouseUp={handleMouseUp}
    >
      <div className="flex justify-start items-center h-full w-full">
        {getBars()}
      </div>
    </div>
  );
};

export default TrackWaveForm;
