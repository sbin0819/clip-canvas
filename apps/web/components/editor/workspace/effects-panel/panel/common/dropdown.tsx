'use client';

import { useRef, useState } from 'react';
import useOnClickOutside from '@/hooks/use-on-click-outside';
import useSideOptions, {
  FrameKeys,
  FrameState,
  Slides,
} from '@/app/store/use-side-options';
import { produce } from 'immer';

export default function Dropdown<T extends FrameKeys>({
  dropdownKey,
  selectOptions,
}: {
  dropdownKey: T;
  selectOptions: FrameState[T][];
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { options, setOptions } = useSideOptions((state) => state);

  const [isOpen, setIsOpen] = useState(false);

  const onToggle = () => setIsOpen(!isOpen);

  const onSelect = (option: FrameState[T]) => {
    setOptions((oldOptions: Slides) =>
      produce(oldOptions, (draftOptions) => {
        const frame = draftOptions.frames[draftOptions.option.currentFrame];
        if (frame && dropdownKey in frame) {
          frame[dropdownKey] = option;
        }
      }),
    );
    setIsOpen(false);
  };

  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <div ref={ref} className="relative w-full inline-block">
      <div>
        <button
          aria-expanded="true"
          aria-haspopup="true"
          className="inline-flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-200"
          id="options-menu"
          type="button"
          onClick={onToggle}
        >
          {options.frames[options.option.currentFrame]?.[dropdownKey]}
        </button>
      </div>
      <div
        aria-labelledby="options-menu"
        aria-orientation="vertical"
        className="absolute z-10 mt-1 px-1 w-full rounded-md bg-white shadow-xl"
        role="menu"
      >
        {isOpen &&
          selectOptions.map((option) => (
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
