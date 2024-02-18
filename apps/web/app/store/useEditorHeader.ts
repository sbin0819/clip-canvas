'use client';

import { create } from 'zustand';

export type Display = '16:9' | '4:3' | '1:1' | '4:5' | '9:16';

interface EditorHeaderState {
  display: Display;
  // eslint-disable-next-line no-unused-vars
  onSelectDisplayOption: (display: Display) => void;
}

const useEditorHeader = create<EditorHeaderState>((set) => ({
  display: '16:9',
  onSelectDisplayOption: (display: Display) => set({ display }),
}));

export default useEditorHeader;
