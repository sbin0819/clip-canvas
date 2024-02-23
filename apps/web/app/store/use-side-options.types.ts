export type Display = '16:9' | '4:3' | '1:1' | '4:5' | '9:16';
export type BackgroundType = 'solid' | 'gradient';

export interface ItemsDefaultOption {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  rotate?: number;
  zIndex?: number;
}

export interface TextState extends ItemsDefaultOption {
  text: string;
  fontSize?: number;
  color?: string;
  backgroundColor?: string;
  fontFamily?: string;
  fontWeight?: string;
}

export interface EmojiState extends ItemsDefaultOption {
  emoji: string;
}

export interface FrameState {
  id: string;
  texts: TextState[];
  emojis: EmojiState[];
  duration: number;
  backgroundType: BackgroundType;
}

export interface Option {
  currentFrame: number;
  currentDuration: number;
  currentFrameId?: string;
  display: Display;
}

export interface Slides {
  option: Option;
  frames: FrameState[];
}

export type FrameKeys = keyof Omit<FrameState, 'id' | 'texts' | 'emojis'>;
