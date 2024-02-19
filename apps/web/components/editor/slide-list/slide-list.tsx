'use client';

import { useCallback, useState } from 'react';
import useSideOptions from '@/app/store/useSideOptions';

import { frames as initialFrames } from './mock';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SlideItem from './slide-item';

export default function SlideList() {
  const [frames, setFrames] = useState(initialFrames);

  const { currentFrame } = useSideOptions((state) => state.options.option);
  const { selectFrame } = useSideOptions();

  const moveSlide = (dragIndex, hoverIndex) => {
    const dragItem = frames[dragIndex];
    const newFrames = [...frames];
    newFrames.splice(dragIndex, 1);
    newFrames.splice(hoverIndex, 0, dragItem);
    setFrames(newFrames);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <section className="flex-[2] min-w-[340px] px-4 py-4 border-r border overflow-auto">
        <div className="flex flex-col gap-2">
          {frames.map((frame, index) => (
            <div
              className="cursor-pointer"
              key={frame.id}
              // onClick={() => selectFrame(index)}
            >
              <SlideItem
                index={index}
                frame={frame}
                isActiveFrame={currentFrame === index}
                moveSlide={moveSlide}
              />
            </div>
          ))}
        </div>
      </section>
    </DndProvider>
  );
}
