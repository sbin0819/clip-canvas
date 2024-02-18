'use client';

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface SlideItem {
  text: string;
  duration: number;
  fontSize: number;
  color: string;
  backgroundColor: string;
  fontFamily: string;
  fontWeight: string;
  emoji: string[];
}

interface Slides {
  slides: SlideItem[];
}

interface SideDataState {
  data: Slides;
  // eslint-disable-next-line no-unused-vars
  addData: (data: SlideItem) => void;
}

const useSideData = create<SideDataState>()(
  immer((set) => ({
    data: {
      slides: [],
    },
    addData: (data: SlideItem) =>
      set((state) => {
        state.data.slides.push(data);
      }),
  })),
);

export default useSideData;
