'use client';

import useEditorStore from '@/app/store/use-editor-store';
import { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import TextOptions from './text.options';
import TextPalette from './text.palate';

export default function TextPanel() {
  const { currentFrame } = useEditorStore((state) => ({
    currentFrame: state.options.frames[state.options.option.currentFrameIdx],
  }));

  const [isOpen, setIsOpen] = useState(false);
  const [textIdx, setTextIdx] = useState<number>(0);

  const onToggle = (idx?: number) => {
    setTextIdx(idx ? idx : 0);
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        {isOpen && (
          <div className="cursor-pointer" onClick={() => onToggle()}>
            <IoIosArrowBack />
          </div>
        )}
        <div className="font-bold text-sm">Text</div>
      </div>
      {!isOpen ? (
        <div>
          <ul className="pt-2 flex flex-col gap-2">
            {currentFrame?.texts &&
              currentFrame?.texts.map((item, idx) => (
                <li
                  className="px-2 py-2 text-sm bg-gray-100 rounded-md cursor-pointer"
                  key={idx}
                  onClick={() => onToggle(idx)}
                >
                  <span className="pr-2">{idx + 1}.</span>
                  <span>{item.text}</span>
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <div>
          <TextPalette />
          <TextOptions textIdx={textIdx} />
        </div>
      )}
    </div>
  );
}
