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
  moveSlide,
}: {
  index: number;
  frame: FrameState;
  isActiveFrame: boolean;
  moveSlide: (dragIndex: number, hoverIndex: number) => void;
}) {
  const ref = useRef(null);
  const dragIconRef = useRef(null); // Reference for the DragIcon

  const [{ handlerId }, drop] = useDrop({
    accept: 'slide',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
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
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (
        (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ||
        (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
      ) {
        return;
      }
      moveSlide(dragIndex, hoverIndex);
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

  drag(dragIconRef); // Apply the drag ref to the DragIcon only
  drop(ref); // Apply the drop ref to the entire slide item
  preview(ref); // This will use the entire SlideItem as the preview

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }} // Make the item semi-transparent when dragging
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
      )}
    >
      <div className={cn('overflow-hidden', isActiveFrame ? 'grow' : 'shrink')}>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center w-full gap-2">
            <div ref={dragIconRef}>
              <DragIcon />
            </div>{' '}
            {/* Apply the ref here for dragging */}
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
