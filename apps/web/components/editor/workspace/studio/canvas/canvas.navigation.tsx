'use client';
import useToolOptions, { Slides } from '@/app/store/use-tool-options';
import { cn } from '@/libs/cn';
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io';
import { produce } from 'immer';
import { memo } from 'react';

const CanvasNavigation = ({ children }: { children: React.ReactNode }) => {
  const { frames, currentFrameIdx, setOptions } = useToolOptions((state) => ({
    frames: state.options.frames,
    currentFrameIdx: state.options.option.currentFrameIdx,
    setOptions: state.setOptions,
  }));

  const handleNavigation = (direction: 'prev' | 'next') => {
    const newIndex =
      direction === 'prev' ? currentFrameIdx - 1 : currentFrameIdx + 1;
    const newFrame = frames[newIndex];
    const newFrames = frames.slice(0, newIndex);

    const totalElapsedTime =
      newFrames.reduce((acc, curr) => {
        return acc + curr.duration;
      }, 0) / 1000;

    if (newFrame) {
      setOptions((oldOptions: Slides) =>
        produce(oldOptions, (draftOptions) => {
          draftOptions.option.currentFrameIdx = newIndex;
          draftOptions.option.currentFrameId = newFrame.id;
          draftOptions.option.elapsedTime = totalElapsedTime;
        }),
      );
    }
  };

  return (
    <>
      {children}
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
    </>
  );
};

export default memo(CanvasNavigation);
