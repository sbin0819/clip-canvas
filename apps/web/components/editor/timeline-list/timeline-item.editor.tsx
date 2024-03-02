import { PiTrash } from 'react-icons/pi';
import { RxCopy } from 'react-icons/rx';
import { convertMillisecondsToSeconds } from '@/libs/format';
import { FrameState } from '@/app/store/use-editor-store.types';
import { produce } from 'immer';
import useEditorStore from '@/app/store/use-editor-store';
import { showToast } from '@/libs/toast';

import { FaSortDown, FaSortUp } from 'react-icons/fa';
// import { useState } from 'react';
// import ItemDuration from './timeline-item.editor.duration';

export default function ItemEditor({
  index,
  frame,
}: {
  index: number;
  frame: FrameState;
}) {
  const { frames, setFrames } = useEditorStore((state) => ({
    frames: state.options.frames,
    setFrames: state.setFrames,
  }));

  //   const [isOpen, setIsOpen] = useState(true);

  const removeFrame = () => {
    if (frames.length > 1) {
      setFrames((oldFrames) =>
        produce(oldFrames, (draftFrames) => {
          draftFrames.splice(index, 1);
        }),
      );
    } else {
      showToast('At least one frame is required', 'warning');
    }
  };

  return (
    <div className="flex flex-col justify-between px-4">
      <div className="py-2"></div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="relative mr-1 cursor-pointer">
            {/* {isOpen && <ItemDuration />} */}
            <FaSortUp size={12} className="absolute" />
            <FaSortDown size={12} />
          </div>
          <div className="flex items-center py-[2px] px-2 bg-slate-100 rounded-xl">
            <span className="text-[10px]">
              {convertMillisecondsToSeconds(frame.duration)}s
            </span>
          </div>
        </div>
        <div className="flex items-center gap-[1px]">
          <RxCopy />
          <PiTrash onClick={removeFrame} />
        </div>
      </div>
    </div>
  );
}
