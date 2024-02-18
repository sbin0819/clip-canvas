'use client';

import { useRef, useState } from 'react';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import useEditorHeader from '@/app/store/useEditorHeader';

import type { Display } from '@/app/store/useEditorHeader';

const options: Display[] = ['16:9', '4:3', '1:1', '4:5', '9:16'];

export default function DisplayDropdown() {
  const ref = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const { display, onSelectDisplayOption } = useEditorHeader();

  const onToggle = () => setIsOpen(!isOpen);
  const onSelect = (option: Display) => {
    onSelectDisplayOption(option);
    setIsOpen(false);
  };

  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <div ref={ref} className="relative w-[80px] inline-block">
      <div>
        <button
          aria-expanded="true"
          aria-haspopup="true"
          className="inline-flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          id="options-menu"
          type="button"
          onClick={onToggle}
        >
          {display}
        </button>
      </div>
      <div
        aria-labelledby="options-menu"
        aria-orientation="vertical"
        className="absolute z-10 mt-1 px-1 w-full rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
      >
        {isOpen &&
          options.map((option) => (
            <div className="py-1" role="none" onClick={() => onSelect(option)}>
              <div
                className="flex items-center justify-center px-4 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-200 hover:text-gray-900 cursor-pointer"
                role="menuitem"
              >
                {option}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
