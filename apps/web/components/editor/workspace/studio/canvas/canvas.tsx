'use client';

import { memo, useCallback, useState } from 'react';
import useEditorStore from '@/app/store/use-editor-store';
import { cn } from '@/libs/cn';
import CanvasNavigation from './canvas.navigation';
import { produce } from 'immer';
// import styles from './frames.module.css';

const Canvas = () => {
  const { display, currentFrame, setCurrentFrame } = useEditorStore(
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

  const onDragStart = useCallback(
    (e: React.DragEvent<HTMLDivElement>, index: number) => {
      e.dataTransfer.setData('text/plain', index.toString());
      setActiveTextIndex(index);
      setDraggingTextIndex(index);
    },
    [setActiveTextIndex, setDraggingTextIndex],
  );

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const textIdx = parseInt(e.dataTransfer.getData('text/plain'), 10);
      const boundingRect = e.currentTarget.getBoundingClientRect();
      const xPercent =
        ((e.clientX - boundingRect.left) / boundingRect.width) * 100;
      const yPercent =
        ((e.clientY - boundingRect.top) / boundingRect.height) * 100;

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

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <CanvasNavigation>
      <div>
        <div
          className={`mx-auto ${aspectRatioClass} max-w-full max-h-[calc(100vh-300px)]`}
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          <div
            id="editor__canvas"
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
                onDragStart={(e) => onDragStart(e, index)}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTextIndex(index);
                }}
                className={cn(
                  'absolute',
                  'p-1 rounded-sm',
                  {
                    'border-2 border-teal-500': activeTextIndex === index,
                  },
                  {
                    'cursor-pointer': draggingTextIndex !== index,
                  },
                  {
                    'cursor-move': activeTextIndex === index,
                  },
                )}
                style={{
                  top: text.y,
                  left: text.x,
                  transform: `translate(-${text.x}, -${text.y})`,
                  fontSize: text.fontSize,
                  color: text.color,
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
      </div>
    </CanvasNavigation>
  );
};

export default Canvas;
