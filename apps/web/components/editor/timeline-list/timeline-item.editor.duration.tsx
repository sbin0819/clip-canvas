'use client';

import useEditorStore, { FrameState } from '@/app/store/use-editor-store';
import React, { use, useEffect, useRef, useState } from 'react';
import { produce } from 'immer';
import useOnClickOutside from '@/hooks/use-on-click-outside';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';

interface ItemDurationProps {
  onClose: () => void;
}

const ItemDuration = ({ onClose }: ItemDurationProps) => {
  const { currentFrameIdx, currentFrame, setFrames } = useEditorStore(
    (state) => ({
      currentFrameIdx: state.options.option.currentFrameIdx,
      currentFrame: state.options.frames[state.options.option.currentFrameIdx],
      setOptions: state.setOptions,
      setFrames: state.setFrames,
    }),
  );

  const originalDuration = currentFrame ? currentFrame.duration / 1000 : 0;

  const [inputValue, setInputValue] = useState(originalDuration.toString());

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onIncrementDuration = () => {
    setInputValue((currentValue) => {
      const newValue = parseFloat(currentValue) + 0.1;
      return newValue.toFixed(1);
    });
  };

  const onDecrementDuration = () => {
    setInputValue((currentValue) => {
      const newValue = parseFloat(currentValue) - 0.1;
      return newValue > 0 ? newValue.toFixed(1) : '';
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setInputValue(value);
      return;
    } else if (!/^(\d+)?([.]?\d{0,1})?$/.test(value)) {
      return;
    }
    setInputValue(value);
  };

  const onUpdateValidDuration = () => {
    let duration = parseFloat(inputValue);
    if (isNaN(duration) || duration <= 0) {
      duration = originalDuration;
    }
    const durationInMilliseconds = Math.round(duration * 1000);
    setFrames(
      produce((draft) => {
        (draft[currentFrameIdx] as FrameState).duration =
          durationInMilliseconds;
      }),
    );
    onClose();
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdateValidDuration();
  };

  useOnClickOutside(containerRef, (e) => {
    e.stopPropagation();
    onUpdateValidDuration();
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onUpdateValidDuration();
    };
    const handleWheel = () => {
      onUpdateValidDuration();
    };
    addEventListener('keydown', handleKeyDown);
    addEventListener('wheel', handleWheel);

    return () => {
      removeEventListener('keydown', handleKeyDown);
      removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute left-20 bg-white border border-gray-400 p-2 w-[200px] rounded-lg shadow-md z-50"
      style={{
        marginBlockStart: '-60px',
      }}
    >
      <div>
        <p className="font-semibold text-[12px]">Duration</p>
        <form onSubmit={onSubmit}>
          <div className="my-2 w-full flex items-center bg-slate-200 border-gray-300 rounded-lg text-gray-600 text-sm">
            <input
              ref={inputRef}
              className="w-full"
              type="text"
              value={inputValue}
              placeholder={!inputValue ? '' + originalDuration : ''}
              onChange={onChange}
            />
            <div className="mr-1 cursor-pointer">
              <div onClick={onIncrementDuration}>
                <TiArrowSortedUp size={14} />
              </div>
              <div onClick={onDecrementDuration}>
                <TiArrowSortedDown size={14} />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemDuration;
