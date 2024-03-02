'use client';

import TextAarea from 'react-textarea-autosize';
import { useState } from 'react';
import useEditorStore, { FrameState } from '@/app/store/use-editor-store';
import { produce } from 'immer';
import { PiTextboxLight } from 'react-icons/pi';

export default function TextFields({
  index,
  frame,
  isActiveFrame,
}: {
  index: number;
  frame: FrameState;
  isActiveFrame: boolean;
}) {
  const { setFrames } = useEditorStore((state) => ({
    setFrames: state.setFrames,
  }));
  const [text, setText] = useState(frame?.texts[0]?.text ?? '');

  const [texts, setTexts] = useState(frame?.texts ?? []);

  const handleTextChange =
    (textIndex: number) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newTexts = texts.map((t, idx) =>
        idx === textIndex ? { ...t, text: e.target.value } : t,
      );
      setTexts(newTexts);

      setFrames((oldFrames) =>
        produce(oldFrames, (draftFrames) => {
          const frameToUpdate = draftFrames[index];
          if (frameToUpdate) {
            frameToUpdate.texts = newTexts;
          }
        }),
      );
    };

  const onKeydown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      setText(text + '\n');
    }
  };

  return (
    <div className="flex flex-col w-full gap-2">
      {isActiveFrame
        ? texts.map((el, index) => (
            <TextAarea
              key={index}
              className="w-full py-2 px-2 font-semibold bg-slate-100 border border-slate-100 resize-none"
              value={el.text}
              minRows={1}
              onChange={handleTextChange(index)}
              onKeyDown={onKeydown}
            />
          ))
        : texts.map((el, index) => (
            <div key={index} className="py-2 flex items-center gap-2">
              <PiTextboxLight />
              <div className="truncate overflow-hidden whitespace-nowrap mr-14">
                {el.text}
              </div>
            </div>
          ))}
    </div>
  );
}
