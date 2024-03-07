'use client';

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Slides, FrameState } from './use-editor-store.types';
export * from './use-editor-store.types';

interface EditorState {
  options: Slides;
}

interface EditorAction {
  setOptions: (update: ((options: Slides) => Slides) | Slides) => void;
  setFrames: (
    update: ((frames: FrameState[]) => FrameState[]) | FrameState[],
  ) => void;
  setCurrentFrame: (
    update: ((options: FrameState) => FrameState) | FrameState,
  ) => void;
}

export interface EditorStateAction extends EditorState, EditorAction {}

const useEditorStore = create<EditorStateAction>()(
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

export default useEditorStore;
