'use client';
import { useState, useEffect } from 'react';

interface WaveformProps {
  totalTime: number;
  currentTime: number;
}

const Waveform: React.FC<WaveformProps> = ({ totalTime, currentTime }) => {
  const percentage = (currentTime / totalTime) * 100;
  const barCount = 100;
  const [barHeights, setBarHeights] = useState<number[]>([]);

  useEffect(() => {
    const heights = [];
    for (let i = 0; i < barCount; i++) {
      heights.push(Math.floor(Math.random() * (24 - 16 + 1) + 16));
    }
    setBarHeights(heights);
  }, [barCount]);

  const getBars = () => {
    return barHeights.map((height, i) => (
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
      ></div>
    ));
  };

  return (
    <div className="flex justify-center items-center h-10 rounded-lg overflow-hidden">
      <div className="flex justify-start items-center h-full w-full">
        {getBars()}
      </div>
    </div>
  );
};

export default Waveform;
