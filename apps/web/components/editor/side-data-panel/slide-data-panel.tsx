'use client';

import useSideOptions, { FrameState } from '@/app/store/useSideOptions';
import SlideItem from './slide-item';

const frames = [
  {
    text: 'Hello World',
    duration: 2,
    fontSize: 3,
    color: '#000000',
    backgroundColor: '#ffffff',
    fontFamily: 'Arial',
    fontWeight: 'normal',
    emoji: [],
  },
  {
    text: 'Hello World 2',
    duration: 3,
    fontSize: 5,
    color: '#000000',
    backgroundColor: '#ffffff',
    fontFamily: 'Arial',
    fontWeight: 'normal',
    emoji: [],
  },
  {
    text: 'Hello World 3',
    duration: 5,
    fontSize: 7,
    color: '#000000',
    backgroundColor: '#ffffff',
    fontFamily: 'Arial',
    fontWeight: 'normal',
    emoji: [],
  },
] as FrameState[];

export default function SlideDataPanel() {
  const { currentFrame } = useSideOptions((state) => state.options.option);
  const { selectFrame } = useSideOptions();

  return (
    <section className="flex-[2] min-w-[340px] px-4 py-4 border-r border overflow-auto">
      <div className="flex flex-col gap-2">
        {frames.map((frame, index) => (
          <div className="cursor-pointer" onClick={() => selectFrame(index)}>
            <SlideItem
              key={index}
              frame={frame}
              isActiveFrame={currentFrame === index}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
