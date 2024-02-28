export type Display = '16:9' | '4:3' | '1:1' | '4:5' | '9:16';
export type ColorType = 'solid' | 'gradient';

export interface ItemsDefaultOption {
  x?: number | string;
  y?: number | string;
  width?: number | string;
  height?: number | string;
  rotate?: number | string;
  zIndex?: number;
}

export interface TextState extends ItemsDefaultOption {
  text: string;
  fontSize?: number;
  color?: string;
  backgroundColor?: string;
  fontFamily?: string;
  fontWeight?: string;
  colorType: ColorType;
}

export interface EmojiState extends ItemsDefaultOption {
  emoji: string;
}

export interface FrameState {
  id: string;
  texts: TextState[];
  emojis: EmojiState[];
  duration: number;
  backgroundType: ColorType;
  backgroundColor: string;
}

export interface Option {
  currentFrameIdx: number;
  currentDuration: number;
  currentFrameId?: string;
  display: Display;
  audio: string;
  defaultAudio: { [key: string]: string };
}

export interface Slides {
  option: Option;
  frames: FrameState[];
}

export type FrameKeys = keyof Omit<FrameState, 'id' | 'texts' | 'emojis'>;
