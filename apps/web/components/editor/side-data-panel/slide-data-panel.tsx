'use client';

import SlideItem from './slide-item';

const data = [
  {
    text: 'Hello World',
    duration: 2,
    fontSize: 20,
    color: '#000000',
    backgroundColor: '#ffffff',
    fontFamily: 'Arial',
    fontWeight: 'normal',
    emoji: [],
  },
  {
    text: 'Hello World 2',
    duration: 5,
    fontSize: 20,
    color: '#000000',
    backgroundColor: '#ffffff',
    fontFamily: 'Arial',
    fontWeight: 'normal',
    emoji: [],
  },
];

export default function SlideDataPanel() {
  return (
    <section className="flex-[2] min-w-[340px] px-4 py-4 border-r border overflow-auto">
      <div className="flex flex-col gap-2">
        {data.map((item, index) => (
          <SlideItem key={index} data={item} />
        ))}
      </div>
    </section>
  );
}
