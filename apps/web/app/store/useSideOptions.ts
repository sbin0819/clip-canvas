/* eslint-disable no-unused-vars */
'use client';

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type Display = '16:9' | '4:3' | '1:1' | '4:5' | '9:16';

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
  display: Display;
}

interface Slides {
  option: Option;
  frames: FrameState[];
}

interface SideOptionsState {
  options: Slides;

  onSelectDisplayOption: (display: Display) => void;

  addData: (data: FrameState) => void;
  selectFrame: (frame: number) => void;
  selectDuration: (duration: number) => void;
}

const useSideOptions = create<SideOptionsState>()(
  immer((set) => ({
    options: {
      frames: [],
      option: {
        display: '16:9',
        currentFrame: 0,
        currentDuration: 0,
      },
    },

    onSelectDisplayOption: (display: Display) =>
      set((state) => {
        state.options.option.display = display;
      }),

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
