'use client';

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Slides, Display, FrameState } from './types';
export * from './types';

export interface SideOptionsState {
  options: Slides;

  setOptions: (update: ((options: Slides) => Slides) | Slides) => void;
  setFrames: (
    update: ((frames: FrameState[]) => FrameState[]) | FrameState[],
  ) => void;

  selectFrame: (frameIdx: number, frameId: string) => void;
  selectDisplayOption: (display: Display) => void;
}

const useSideOptions = create<SideOptionsState>()(
  immer((set) => ({
    options: {
      frames: [],
      option: {
        display: '16:9',
        currentFrame: 0,
        currentDuration: 0,
        currentFrameId: '',
      },
    },

    setOptions: (update) =>
      set((state) => {
        state.options =
          typeof update === 'function' ? update(state.options) : update;
      }),

    setFrames: (update) =>
      set((state) => {
        state.options.frames =
          typeof update === 'function' ? update(state.options.frames) : update;
      }),

    selectFrame: (frameIdx: number, frameId: string) =>
      set((state) => {
        state.options.option.currentFrame = frameIdx;
        state.options.option.currentFrameId = frameId;
      }),

    selectDisplayOption: (display: Display) =>
      set((state) => {
        state.options.option.display = display;
      }),
  })),
);

export default useSideOptions;
