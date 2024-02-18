/* eslint-disable no-unused-vars */
'use client';

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface FrameState {
  text: string;
  duration: number;
  fontSize: number;
  color: string;
  backgroundColor: string;
  fontFamily: string;
  fontWeight: string;
  emoji: string[];
}

export interface Option {
  currentFrame: number;
  currentDuration: number;
  duration?: number;
}

interface Slides {
  option: Option;
  frames: FrameState[];
}

interface SideOptionsState {
  options: Slides;

  addData: (data: FrameState) => void;
  selectFrame: (frame: number) => void;
  selectDuration: (duration: number) => void;
}

const useSideOptions = create<SideOptionsState>()(
  immer((set) => ({
    options: {
      frames: [],
      option: {
        currentFrame: 0,
        currentDuration: 0,
      },
    },
    selectFrame: (frame: number) =>
      set((state) => {
        state.options.option.currentFrame = frame;
      }),
    selectDuration: (duration: number) => {
      set((state) => {
        state.options.option.currentDuration = duration;
      });
    },
    addData: (data: FrameState) =>
      set((state) => {
        state.options.frames.push(data);
      }),
  })),
);

export default useSideOptions;
