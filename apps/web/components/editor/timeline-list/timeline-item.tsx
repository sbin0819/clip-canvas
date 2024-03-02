'use client';

import { cn } from '@/libs/cn';
import { PiTrash } from 'react-icons/pi';
import { RxCopy } from 'react-icons/rx';
import { DragIcon } from '@/components/shared';
import useTimelineItem from './use-timeline-item';
import TextAarea from 'react-textarea-autosize';
import { useState } from 'react';
import { convertMillisecondsToSeconds } from '@/libs/format';
import useToolOptions, { FrameState } from '@/app/store/use-tool-options';
import { produce } from 'immer';
import { showToast } from '@/libs/toast';

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

  const { frames } = useToolOptions((state) => state.options);
  const { setFrames } = useToolOptions();

  const [text, setText] = useState(frame?.texts[0]?.text ?? '');

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);

    setFrames((oldFrames) =>
      produce(oldFrames, (draftFrames) => {
        const frame = draftFrames[index];
        if (frame && Array.isArray(frame.texts) && frame.texts[0]) {
          frame.texts[0].text = e.target.value;
        }
      }),
    );
  };

  const removeFrame = () => {
    if (frames.length > 1) {
      setFrames((oldFrames) =>
        produce(oldFrames, (draftFrames) => {
          draftFrames.splice(index, 1);
        }),
      );
    } else {
      showToast('At least one frame is required', 'warning');
    }
  };

  const onKeydown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      setText(text + '\n');
    }
  };

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
            {isActiveFrame ? (
              <TextAarea
                className="w-full py-2 px-2 font-semibold bg-slate-100 border border-slate-100 resize-none"
                value={text}
                minRows={1}
                onChange={handleTextChange}
                onKeyDown={onKeydown}
              />
            ) : (
              <div>{text}</div>
            )}
          </div>
          {!isActiveFrame && (
            <div className="flex items-center px-[10px] bg-slate-50 rounded-xl">
              <span className="text-[10px]">
                {convertMillisecondsToSeconds(frame.duration)}s
              </span>
            </div>
          )}
        </div>
        {isActiveFrame && (
          <div className="flex flex-col justify-between">
            <div className="py-2"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center px-[10px] bg-slate-50 rounded-xl">
                <span className="text-sm">
                  {convertMillisecondsToSeconds(frame.duration)}s
                </span>
              </div>
              <div className="flex items-center gap-[1px]">
                <RxCopy />
                <PiTrash onClick={removeFrame} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
