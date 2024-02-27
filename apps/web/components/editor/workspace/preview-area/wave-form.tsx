'use client';

import { useEffect, useRef } from 'react';

interface WaveFormProps {
  src: string;
  currentTime: number;
}

const WaveForm: React.FC<WaveFormProps> = ({ src, currentTime }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);

  const drawWaveform = (audioBuffer: AudioBuffer, currentTime: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    const data = audioBuffer.getChannelData(0); // Get channel data
    const step = Math.ceil(data.length / width); // Calculate step to fit all data into canvas width
    const amp = height / 2; // Amplitude based on canvas height

    // Calculate the position (in pixels) to represent the current time
    const currentTimePos = (currentTime / audioBuffer.duration) * width;

    for (let i = 0; i < width; i++) {
      let min = 1.0;
      let max = -1.0;
      for (let j = 0; j < step; j++) {
        const index = i * step + j;
        // Ensure datum is defined before using it
        if (index < data.length) {
          const datum = data[index]; // Get single data point
          if (datum !== undefined) {
            // Check if datum is defined
            if (datum < min) min = datum;
            if (datum > max) max = datum;
          }
        }
      }
      // Change fillStyle based on whether the position is before or after the current time
      ctx.fillStyle = i < currentTimePos ? '#69b3a2' : '#d3d3d3'; // Use different colors
      ctx.fillRect(i, (1 + min) * amp, 1, Math.max(1, (max - min) * amp));
    }
  };

  const fetchAudio = async (src: string) => {
    const response = await fetch(src);
    const arrayBuffer = await response.arrayBuffer();
    const audioContext = new window.AudioContext();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    audioContextRef.current = audioContext;
    audioBufferRef.current = audioBuffer;
    drawWaveform(audioBuffer, currentTime);
  };

  useEffect(() => {
    if (src) {
      fetchAudio(src);
    }
  }, [src]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
  }, []);

  useEffect(() => {
    if (audioBufferRef.current) {
      drawWaveform(audioBufferRef.current, currentTime);
    }
  }, [currentTime]);

  return (
    <div className="waveform-container">
      <canvas ref={canvasRef} className="wave w-full h-[32px]" />
    </div>
  );
};

export default WaveForm;
