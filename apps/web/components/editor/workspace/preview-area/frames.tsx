'use client';

import useToolOptions from '@/app/store/use-tool-options';
import { cn } from '@/libs/cn';
import FramesNavigation from './frames.navigation';

export default function Frames() {
  const { display, currentFrame } = useToolOptions((state) => ({
    display: state.options.option.display,
    currentFrame: state.options.frames[state.options.option.currentFrameIdx],
  }));

  const aspectRatioClass = {
    '16:9': 'aspect-[16/9]',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-[1/1]',
    '4:5': 'aspect-[4/5]',
    '9:16': 'aspect-[9/16]',
  }[display];

  return (
    <div>
      <div
        className={`mx-auto ${aspectRatioClass} max-w-full max-h-[calc(100vh-300px)]`}
      >
        <div
          className={cn(
            'relative',
            'w-full h-full  rounded-md border-2 border-teal-400',
          )}
          style={{ backgroundColor: currentFrame?.backgroundColor }}
        >
          {currentFrame?.texts.map((text, index) => (
            <div
              key={index}
              className={cn(
                'absolute',
                'px-4 py-2 rounded-sm',
                'border border-red-500',
              )}
              style={{
                top: text.y,
                left: text.x,
                transform: `translate(-${text.x}, -${text.y})`,
                fontSize: text.fontSize,
                color: text.color,
                backgroundColor: text.backgroundColor,
                fontFamily: text.fontFamily,
                fontWeight: text.fontWeight,
              }}
            >
              {text.text}
            </div>
          ))}
        </div>
      </div>
      <FramesNavigation />
    </div>
  );
}
