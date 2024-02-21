'use client';

import { useEffect } from 'react';
import useSideOptions from '@/app/store/use-side-options';

import { frames as initialFrames } from './mock';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SlideItem from './slide-item';

export default function SlideList() {
  const { frames } = useSideOptions((state) => state.options);
  const { currentFrame, currentFrameId } = useSideOptions(
    (state) => state.options.option,
  );
  const { selectFrame: selectFrameItem, setFrames } = useSideOptions();

  const onDragItem = (dragIndex: number, hoverIndex: number) => {
    const dragItem = frames[dragIndex];

    if (dragItem === undefined) return;

    const newFrames = [...frames];
    newFrames.splice(dragIndex, 1);
    newFrames.splice(hoverIndex, 0, dragItem);
    setFrames(newFrames);
  };

  useEffect(() => {
    if (frames.length === 0) {
      setFrames(initialFrames);
      selectFrameItem(currentFrame, initialFrames[currentFrame]?.id ?? '');
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
