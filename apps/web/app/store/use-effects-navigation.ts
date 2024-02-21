import create from 'zustand';

export const panelValue = {
  background: 'background',
  text: 'text',
  media: 'media',
  animations: 'animations',
  transitions: 'transitions',
  audio: 'audio',
} as const;

export type PanelType = (typeof panelValue)[keyof typeof panelValue];

interface PanelState {
  panelType: PanelType;
  setPanelType: (newType: PanelType) => void;
}

export const useEffectsNavigation = create<PanelState>((set) => ({
  panelType: panelValue.background,
  setPanelType: (newType: PanelType) => set({ panelType: newType }),
}));
