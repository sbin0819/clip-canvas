'use client';

import { useEffect, useState } from 'react';
import useSideOptions from '@/app/store/useSideOptions';

import { frames as initialFrames } from './mock';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SlideItem from './slide-item';

export default function SlideList() {
  const [frames, setFrames] = useState(initialFrames);

  const { currentFrame, currentFrameId } = useSideOptions(
    (state) => state.options.option,
  );
  const { selectFrameItem } = useSideOptions();

  const onDragItem = (dragIndex: number, hoverIndex: number) => {
    const dragItem = frames[dragIndex];

    if (dragItem === undefined) return;

    const newFrames = [...frames];
    newFrames.splice(dragIndex, 1);
    newFrames.splice(hoverIndex, 0, dragItem);
    setFrames(newFrames);
  };

  useEffect(() => {
    if (currentFrameId === '' && frames.length > 0) {
      selectFrameItem(currentFrame, frames[currentFrame]?.id ?? '');
    }
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <section className="flex-[2] min-w-[340px] px-4 py-4 border-r border overflow-auto">
        <div className="flex flex-col gap-2">
          {frames.map((frame, index) => (
            <div
              className="cursor-pointer"
              key={frame.id}
              onClick={() => selectFrameItem(index, frame.id)}
            >
              <SlideItem
                index={index}
                frame={frame}
                isActiveFrame={
                  currentFrameId === ''
                    ? currentFrame === index
                    : currentFrameId === frame.id
                }
                onDragItem={onDragItem}
              />
            </div>
          ))}
        </div>
      </section>
    </DndProvider>
  );
}
