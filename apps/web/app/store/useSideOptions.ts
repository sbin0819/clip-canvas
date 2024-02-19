'use client';

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Slides, Display, FrameState } from './types';
export * from './types';

export interface SideOptionsState {
  options: Slides;

  onSelectDisplayOption: (display: Display) => void;

  addData: (data: FrameState) => void;
  selectFrameItem: (frameIdx: number, frameId: string) => void;
  selectDuration: (duration: number) => void;

  moveDataOrder: (dragIndex: number, hoverIndex: number) => void;
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

    onSelectDisplayOption: (display: Display) =>
      set((state) => {
        state.options.option.display = display;
      }),
    selectFrameItem: (frameIdx: number, frameId: string) =>
      set((state) => {
        state.options.option.currentFrame = frameIdx;
        state.options.option.currentFrameId = frameId;
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

    moveDataOrder: (dragIndex: number, hoverIndex: number) =>
      set((state) => {
        // Check if dragIndex is within bounds
        if (dragIndex >= 0 && dragIndex < state.options.frames.length) {
          // Remove the frame being dragged from its original position
          const removed = state.options.frames.splice(dragIndex, 1)[0]; // Directly access the first item

          // Make sure 'removed' is not undefined before proceeding
          if (removed !== undefined) {
            // Insert the removed frame at the new position
            state.options.frames.splice(hoverIndex, 0, removed);

            // Update currentFrame index if necessary
            if (state.options.option.currentFrame === dragIndex) {
              state.options.option.currentFrame = hoverIndex;
            } else if (
              dragIndex < state.options.option.currentFrame &&
              hoverIndex >= state.options.option.currentFrame
            ) {
              // Moved from before to after the currentFrame
              state.options.option.currentFrame -= 1;
            } else if (
              dragIndex > state.options.option.currentFrame &&
              hoverIndex <= state.options.option.currentFrame
            ) {
              // Moved from after to before the currentFrame
              state.options.option.currentFrame += 1;
            }
          }
        }
      }),
  })),
);

export default useSideOptions;
