'use client';

import { useEffect } from 'react';
import useToolOptions, { Slides } from '@/app/store/use-tool-options';

import { frames as initialFrames } from './mock';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SlideItem from './slide-item';
import { produce } from 'immer';

export default function SlideList() {
  const { frames, setFrames, setOptions } = useToolOptions((state) => ({
    frames: state.options.frames,
    setFrames: state.setFrames,
    setOptions: state.setOptions,
  }));
  const { currentFrameIdx, currentFrameId } = useToolOptions(
    (state) => state.options.option,
  );

  const onDragItem = (dragIndex: number, hoverIndex: number) => {
    const dragItem = frames[dragIndex];

    if (dragItem === undefined) return;

    const newFrames = [...frames];
    newFrames.splice(dragIndex, 1);
    newFrames.splice(hoverIndex, 0, dragItem);
    setFrames(newFrames);
  };

  const onSelectItem = (idx: number) => {
    const newFrame = frames[idx];
    const newFrames = frames.slice(0, idx);

    const totalElapsedTime =
      newFrames.reduce((acc, curr) => {
        return acc + curr.duration;
      }, 0) / 1000;

    if (newFrame) {
      setOptions((oldOptions: Slides) =>
        produce(oldOptions, (draftOptions) => {
          draftOptions.option.currentFrameIdx = idx;
          draftOptions.option.currentFrameId = newFrame.id;
          draftOptions.option.elapsedTime = totalElapsedTime;
        }),
      );
    }
  };

  useEffect(() => {
    if (frames.length === 0) {
      setFrames(initialFrames);
      onSelectItem(0);
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
              onClick={() => onSelectItem(index)}
            >
              <SlideItem
                index={index}
                frame={frame}
                isActiveFrame={
                  currentFrameId === ''
                    ? currentFrameIdx === index
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
