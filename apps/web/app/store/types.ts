export type Display = '16:9' | '4:3' | '1:1' | '4:5' | '9:16';

export interface ItemsDefaultOption {
  top?: number;
  left?: number;
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
  emojis?: EmojiState[];
  duration: number;
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
