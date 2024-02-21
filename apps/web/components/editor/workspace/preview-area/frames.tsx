'use client';

import useSideOptions from '@/app/store/use-side-options';

export default function Frames() {
  const { display } = useSideOptions((state) => state.options.option);

  const aspectRatioClass = {
    '16:9': 'aspect-[16/9]',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-[1/1]',
    '4:5': 'aspect-[4/5]',
    '9:16': 'aspect-[9/16]',
  }[display];

  return (
    <div
      className={`mx-auto ${aspectRatioClass} max-w-full max-h-[calc(100vh-300px)]`}
    >
      <div className="w-full h-full bg-white rounded-md border-2 border-teal-400"></div>
    </div>
  );
}
