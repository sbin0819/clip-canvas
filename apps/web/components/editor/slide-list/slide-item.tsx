'use client';

import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { cn } from '@/libs/cn';
import { PiTrash } from 'react-icons/pi';
import { RxCopy } from 'react-icons/rx';
import { DragIcon } from '@/components/common';

import type { FrameState } from '@/app/store/useSideOptions';

export default function SlideItem({
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
  const ref = useRef<HTMLDivElement>(null);
  const dragIconRef = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'slide',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }

      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();

      if (!clientOffset) {
        return;
      }
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (
        (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ||
        (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
      ) {
        return;
      }

      onDragItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'slide',
    item: () => {
      return { id: frame.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(dragIconRef);
  drop(ref);
  preview(ref);

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0 : 1 }}
      data-handler-id={handlerId}
      className={cn(
        'rounded-md',
        'px-[4px]',
        'py-2',
        'border',
        isActiveFrame
          ? 'border-border-primary max-h-56'
          : 'border-slate-100 max-h-16',
        'transition-height duration-500 ease-in-out',
        !isActiveFrame && 'hover:border-slate-300 max-h-16',
      )}
    >
      <div className={cn('overflow-hidden', isActiveFrame ? 'grow' : 'shrink')}>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center w-full gap-2">
            <div ref={dragIconRef} className="cursor-grab">
              <DragIcon />
            </div>
            <div>{frame?.texts[0]?.text}</div>
          </div>
          {!isActiveFrame && (
            <div className="flex items-center px-[10px] bg-slate-50 rounded-xl">
              <span className="text-[10px]">{frame.duration}s</span>
            </div>
          )}
        </div>
        {isActiveFrame && (
          <div className="flex flex-col justify-between">
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
        )}
      </div>
    </div>
  );
}
