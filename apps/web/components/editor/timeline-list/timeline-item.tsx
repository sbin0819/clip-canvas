'use client';

import { cn } from '@/libs/cn';
import { DragIcon } from '@/components/shared';
import useTimelineItem from './use-timeline-item';
import { convertMillisecondsToSeconds } from '@/libs/format';

import TextFields from './timeline-item.textfields';
import ItemEditor from './timeline-item.editor';
import type { FrameState } from '@/app/store/use-editor-store';

export default function TimeLineItem({
  index,
  frame,
  isActiveFrame,
  onDragItem,
}: {
  index: number;
  frame: FrameState;
  isActiveFrame: boolean;
  onDragItem: (dragIndex: number, hoverIndex: number) => void;
}) {
  const { ref, dragIconRef, isDragging } = useTimelineItem({
    index,
    frame,
    onDragItem,
  });

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0 : 1 }}
      className={cn(
        'rounded-md',
        'px-[4px]',
        'py-2',
        'border',
        isActiveFrame
          ? 'border-teal-400 max-h-56'
          : 'border-slate-100 max-h-24',
        'transition-height duration-500 ease-in-out',
        !isActiveFrame && 'hover:border-slate-300 max-h-24',
      )}
    >
      <div className={cn('overflow-hidden', isActiveFrame ? 'grow' : 'shrink')}>
        <div className="flex items-center justify-between text-sm">
          <div className="flex w-full gap-2">
            <div ref={dragIconRef} className="cursor-grab relative top-2">
              <DragIcon />
            </div>
            <TextFields
              index={index}
              frame={frame}
              isActiveFrame={isActiveFrame}
            />
          </div>
          {!isActiveFrame && (
            <div className="flex items-center px-[10px] bg-slate-50 rounded-xl">
              <span className="text-[10px]">
                {convertMillisecondsToSeconds(frame.duration)}s
              </span>
            </div>
          )}
        </div>
        {isActiveFrame && <ItemEditor index={index} frame={frame} />}
      </div>
    </div>
  );
}
