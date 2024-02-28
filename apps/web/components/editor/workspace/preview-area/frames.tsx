'use client';

import { useCallback, useState } from 'react';
import useToolOptions from '@/app/store/use-tool-options';
import { cn } from '@/libs/cn';
import FramesNavigation from './frames.navigation';
import { produce } from 'immer';

export default function Frames() {
  const { display, currentFrame, setCurrentFrame } = useToolOptions(
    (state) => ({
      display: state.options.option.display,
      currentFrame: state.options.frames[state.options.option.currentFrameIdx],
      setCurrentFrame: state.setCurrentFrame,
    }),
  );

  const [activeTextIndex, setActiveTextIndex] = useState<number | null>(null);
  const [draggingTextIndex, setDraggingTextIndex] = useState<number | null>(
    null,
  );

  const aspectRatioClass = {
    '16:9': 'aspect-[16/9]',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-[1/1]',
    '4:5': 'aspect-[4/5]',
    '9:16': 'aspect-[9/16]',
  }[display];

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    index: number,
  ) => {
    event.dataTransfer.setData('text/plain', index.toString());
    setActiveTextIndex(index);
    setDraggingTextIndex(index);
  };

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const textIdx = parseInt(event.dataTransfer.getData('text/plain'), 10);
      const boundingRect = event.currentTarget.getBoundingClientRect();
      const xPercent =
        ((event.clientX - boundingRect.left) / boundingRect.width) * 100;
      const yPercent =
        ((event.clientY - boundingRect.top) / boundingRect.height) * 100;

      setCurrentFrame(
        produce((draft) => {
          const text = draft.texts[textIdx];
          if (text) {
            text.x = `${xPercent}%`;
            text.y = `${yPercent}%`;
          }
        }),
      );
      setDraggingTextIndex(null);
    },
    [setCurrentFrame],
  );

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <div
        className={`mx-auto ${aspectRatioClass} max-w-full max-h-[calc(100vh-300px)]`}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <div
          className={cn(
            'relative',
            'w-full h-full rounded-md border-2 border-teal-400',
          )}
          style={{ backgroundColor: currentFrame?.backgroundColor }}
          onClick={() => setActiveTextIndex(null)}
        >
          {currentFrame?.texts.map((text, index) => (
            <div
              key={index}
              draggable="true"
              onDragStart={(event) => onDragStart(event, index)}
              onClick={(e) => {
                e.stopPropagation();
                setActiveTextIndex(index);
              }}
              className={cn('absolute', 'p-1 rounded-sm', {
                'border-2 border-teal-500': activeTextIndex === index,
              })}
              style={{
                top: text.y,
                left: text.x,
                transform: `translate(-${text.x}, -${text.y})`,
                fontSize: text.fontSize,
                color: text.color,
                backgroundColor: text.backgroundColor,
                fontFamily: text.fontFamily,
                fontWeight: text.fontWeight,
                opacity: draggingTextIndex === index ? 0.01 : 1,
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
