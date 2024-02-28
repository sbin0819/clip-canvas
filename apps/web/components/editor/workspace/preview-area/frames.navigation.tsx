'use client';

import useToolOptions from '@/app/store/use-tool-options';
import { cn } from '@/libs/cn';
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io';

export default function FramesNavigation() {
  const { frames, currentFrameIdx, setOptions } = useToolOptions((state) => ({
    frames: state.options.frames,
    currentFrameIdx: state.options.option.currentFrameIdx,
    setOptions: state.setOptions,
  }));

  const handleNavigation = (direction: 'prev' | 'next') => {
    const newIndex =
      direction === 'prev' ? currentFrameIdx - 1 : currentFrameIdx + 1;
    const newFrame = frames[newIndex];

    if (newFrame) {
      setOptions((prev) => ({
        ...prev,
        option: {
          ...prev.option,
          currentFrameIdx: newIndex,
          currentFrameId: newFrame.id,
        },
      }));
    }
  };

  return (
    <div className="mt-4 flex items-center justify-between text-gray-600 text-sm">
      <div
        className={cn(
          'flex items-center gap-2 cursor-pointer hover:text-teal-400',
          { 'opacity-0': currentFrameIdx === 0 },
        )}
        onClick={() => handleNavigation('prev')}
      >
        <IoIosArrowRoundBack size={20} />
        <div>Prev</div>
      </div>
      <div className="flex items-center gap-2">
        <div>Frame</div>
        <div>
          {currentFrameIdx + 1}/{frames.length}
        </div>
      </div>
      <div
        className={cn(
          'flex items-center gap-2 cursor-pointer hover:text-teal-400',
          { 'opacity-0': currentFrameIdx === frames.length - 1 },
        )}
        onClick={() => handleNavigation('next')}
      >
        <div>Next</div>
        <IoIosArrowRoundForward size={20} />
      </div>
    </div>
  );
}
