'use client';

import { useCallback } from 'react';
import type { FrameState } from '@/app/store/useSideOptions';
import { cn } from '@/libs/cn';
import { PiTrash } from 'react-icons/pi';
import { RxCopy } from 'react-icons/rx';
import { DragIcon } from '@/components/common';

export default function SlideItem({
  index,
  frame,
  isActiveFrame,
}: {
  index: number;
  frame: FrameState;
  isActiveFrame: boolean;
}) {
  const render = useCallback(() => {
    return (
      <div
        className={cn(
          'rounded-md',
          'px-[4px]',
          'py-2',
          'border',
          isActiveFrame
            ? 'border-border-primary max-h-56'
            : 'border-slate-100 max-h-16',
          'transition-height duration-500 ease-in-out',
        )}
      >
        <div
          className={cn('overflow-hidden', isActiveFrame ? 'grow' : 'shrink')}
        >
          {isActiveFrame ? (
            <div className="flex flex-col justify-between">
              <div className="flex items-center gap-[2px] w-full">
                <DragIcon />
                <div className="flex flex-items px-2 py-2 w-full bg-slate-100 rounded-md">
                  <div className="text-md">{frame?.texts[0]?.text}</div>
                </div>
              </div>
              <div className="py-2"></div>
              <div className="flex items-center justify-between">
                <div className="flex items-center px-[10px] bg-slate-50 rounded-xl">
                  <span className="text-sm">{frame.duration}s</span>
                </div>
                <div className="flex items-center gap-[1px]">
                  <RxCopy />
                  <PiTrash />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center w-full gap-2">
                <DragIcon />
                <div>{frame?.texts[0]?.text}</div>
              </div>
              <div className="flex items-center px-[10px] bg-slate-50 rounded-xl">
                <span className="text-[10px]">{frame.duration}s</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }, [isActiveFrame, frame]);

  return <>{render()}</>;
}
