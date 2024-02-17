'use client';

import EffectsPanel from './effects-panel/effects-panel';
import PreviewArea from './preview-area/preview-area';
import SideDataPanel from './side-data-panel';

export default function Editor() {
  return (
    <div className="flex">
      <EffectsPanel />
      <PreviewArea />
      <SideDataPanel />
    </div>
  );
}
