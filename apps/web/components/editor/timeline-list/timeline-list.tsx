'use client';
import { useEffect } from 'react';
import useEditorStore from '@/app/store/use-editor-store';
import type { FrameState, Slides } from '@/app/store/use-editor-store.types';

import { frames as initialFrames } from './mock';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { produce } from 'immer';
import TimelineItem from './timeline-item';

export default function Sidebar() {
  const { frames, setFrames, setOptions } = useEditorStore((state) => ({
    frames: state.options.frames,
    setFrames: state.setFrames,
    setOptions: state.setOptions,
  }));
  const { currentFrameIdx, currentFrameId } = useEditorStore(
    (state) => state.options.option,
  );

  const updateFramesAndSelection = (
    newFrames: FrameState[],
    newIndex: number,
  ) => {
    let totalElapsedTime = 0;
    if (newIndex > 0) {
      totalElapsedTime =
        newFrames
          .slice(0, newIndex)
          .reduce((acc, curr) => acc + curr.duration, 0) / 1000;
    }

    const newFrame = newFrames[newIndex];

    if (newFrame) {
      setFrames(newFrames);
      setOptions((oldOptions: Slides) =>
        produce(oldOptions, (draftOptions) => {
          draftOptions.option.currentFrameIdx = newIndex;
          draftOptions.option.currentFrameId = newFrame.id;
          draftOptions.option.elapsedTime = totalElapsedTime;
        }),
      );
    }
  };

  const onDragItem = (dragIndex: number, hoverIndex: number) => {
    const dragItem = frames[dragIndex];
    if (dragItem === undefined) return;

    const newFrames = produce(frames, (draft) => {
      draft.splice(dragIndex, 1);
      draft.splice(hoverIndex, 0, dragItem);
    });

    updateFramesAndSelection(newFrames, hoverIndex);
  };

  const onSelectItem = (idx: number) => {
    updateFramesAndSelection(frames, idx);
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
              <TimelineItem
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
