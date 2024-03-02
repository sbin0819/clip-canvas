'use client';

import { useRef, useState } from 'react';
import useOnClickOutside from '@/hooks/use-on-click-outside';
import useEditorStore, { Display } from '@/app/store/use-editor-store';
import { DISPLAY_OPTIONS } from '../constant';

export default function DisplayDropdown() {
  const ref = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const { display } = useEditorStore((state) => state.options.option);

  const { setOptions } = useEditorStore();

  const onToggle = () => setIsOpen(!isOpen);
  const onSelect = (option: Display) => {
    setOptions((state) => ({
      ...state,
      option: {
        ...state.option,
        display: option,
      },
    }));
    setIsOpen(false);
  };

  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <div
      data-testid="editor__display-dropdown"
      ref={ref}
      className="relative w-[80px] inline-block"
    >
      <div>
        <button
          data-testid="editor__display-dropdown-button"
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
        className="absolute z-10 mt-1 px-1 w-full rounded-md bg-white shadow-xl"
        role="menu"
      >
        {isOpen &&
          DISPLAY_OPTIONS.map((option) => (
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
