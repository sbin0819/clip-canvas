'use client';

import useEditorStore from '@/app/store/use-editor-store';
import { useMemo, useState } from 'react';
import { BiExport } from 'react-icons/bi';
import { createVideo } from './export.helper';

export default function Export() {
  const [isRecording, setIsRecording] = useState(false);
  const { frames } = useEditorStore((state) => ({
    frames: state.options.frames,
  }));

  const duration = useMemo(
    () => frames.reduce((acc, frame) => acc + frame.duration, 0),
    [frames],
  );

  return (
    <div
      className="flex items-center justify-between gap-2 px-4 h-full text-sm font-semibold rounded-lg bg-black text-white cursor-pointer"
      onClick={() => createVideo(setIsRecording, duration)}
    >
      <div>{isRecording ? 'Exporting...' : 'Export'}</div>
      <BiExport />
    </div>
  );
}
