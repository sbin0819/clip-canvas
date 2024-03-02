'use client';

import { useRef, useState } from 'react';
import useOnClickOutside from '@/hooks/use-on-click-outside';
import useEditorStore, { Slides } from '@/app/store/use-editor-store';
import { produce } from 'immer';

export default function AudioOptions() {
  const ref = useRef<HTMLDivElement>(null);

  const { audio, defaultAudio, setOptions } = useEditorStore((state) => ({
    audio: state.options.option.audio,
    defaultAudio: state.options.option.defaultAudio,
    setOptions: state.setOptions,
  }));

  const [isOpen, setIsOpen] = useState(false);

  const onToggle = () => setIsOpen(!isOpen);

  const onSelect = (option: string) => {
    setOptions(
      produce((state: Slides) => {
        state.option.audio = option;
      }),
    );
    setIsOpen(false);
  };

  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <div ref={ref} className="relative pt-4 w-full inline-block">
      <div>
        <button
          aria-expanded="true"
          aria-haspopup="true"
          className="inline-flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-200"
          id="options-menu"
          type="button"
          onClick={onToggle}
        >
          {audio}
        </button>
      </div>
      <div
        aria-labelledby="options-menu"
        aria-orientation="vertical"
        className="absolute z-10 mt-1 px-1 w-full rounded-md bg-white shadow-xl"
        role="menu"
      >
        {isOpen &&
          Object.entries(defaultAudio).map(([k, v]) => (
            <div className="py-1" role="none" onClick={() => onSelect(k)}>
              <div
                className="flex items-center justify-center px-4 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-200 hover:text-gray-900 cursor-pointer"
                role="menuitem"
              >
                {k}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
