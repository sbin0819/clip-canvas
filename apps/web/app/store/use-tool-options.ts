'use client';

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Slides, Display, FrameState } from './use-tool-options.types';
export * from './use-tool-options.types';

export interface SideOptionsState {
  options: Slides;

  setOptions: (update: ((options: Slides) => Slides) | Slides) => void;
  setFrames: (
    update: ((frames: FrameState[]) => FrameState[]) | FrameState[],
  ) => void;

  selectFrame: (frameIdx: number, frameId: string) => void;

  selectDisplayOption: (display: Display) => void;

  setCurrentFrame: (
    update: ((options: FrameState) => FrameState) | FrameState,
  ) => void;
}

const useToolOptions = create<SideOptionsState>()(
  immer((set) => ({
    options: {
      frames: [],
      option: {
        display: '16:9',
        currentFrameIdx: 0,
        elapsedTime: 0,
        currentFrameId: '',
        audio: 'sound1',
        defaultAudio: {
          sound1: 'audio/dont-blink.mp3',
          sound2: 'audio/claps.mp3',
          sound3: 'audio/gongs.mp3',
          sound4: 'audio/motion.mp3',
          sound5: 'audio/snpas.mp3',
          sound6: 'audio/stomp.mp3',
        },
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
        state.options.option.currentFrameIdx = frameIdx;
        state.options.option.currentFrameId = frameId;
      }),

    selectDisplayOption: (display: Display) =>
      set((state) => {
        state.options.option.display = display;
      }),

    setCurrentFrame: (update) =>
      set((state) => {
        const currentFrameIndex = state.options.option.currentFrameIdx;

        if (state.options.frames[currentFrameIndex]) {
          if (typeof update === 'function') {
            state.options.frames[currentFrameIndex] = update(
              state.options.frames[currentFrameIndex] as FrameState,
            );
          } else {
            state.options.frames[currentFrameIndex] = update;
          }
        }
      }),
  })),
);

export default useToolOptions;
