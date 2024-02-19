'use client';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import useSideOptions from '@/app/store/useSideOptions';
import SlideItem from './slide-item';

import { frames } from './mock';

export default function SlideDataPanel() {
  const { currentFrame } = useSideOptions((state) => state.options.option);
  const { selectFrame } = useSideOptions();

  return (
    <DndProvider backend={HTML5Backend}>
      <section className="flex-[2] min-w-[340px] px-4 py-4 border-r border overflow-auto">
        <div className="flex flex-col gap-2">
          {frames.map((frame, index) => (
            <div className="cursor-pointer" onClick={() => selectFrame(index)}>
              <SlideItem
                key={frame.id}
                index={index}
                frame={frame}
                isActiveFrame={currentFrame === index}
              />
            </div>
          ))}
        </div>
      </section>
    </DndProvider>
  );
}
