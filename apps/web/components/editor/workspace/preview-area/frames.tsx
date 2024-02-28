'use client';

import useToolOptions from '@/app/store/use-tool-options';
import { cn } from '@/libs/cn';
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io';
import FramesNavigation from './frames.navigation';

export default function Frames() {
  const { display, frames, currentFrame, currentFrameIdx } = useToolOptions(
    (state) => ({
      display: state.options.option.display,
      frames: state.options.frames,
      currentFrame: state.options.frames[state.options.option.currentFrameIdx],
      currentFrameIdx: state.options.option.currentFrameIdx,
    }),
  );

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
          className={cn('w-full h-full  rounded-md border-2 border-teal-400')}
          style={{ backgroundColor: currentFrame?.backgroundColor }}
        ></div>
      </div>
      <FramesNavigation />
    </div>
  );
}
