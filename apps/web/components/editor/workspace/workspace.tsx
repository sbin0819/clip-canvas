'use client';

import PreviewArea from './preview-area/preview-area';
import EffectsPanel from './effects-panel/effects-panel';
import WorkspaceNavigation from './workspacce-navigation';

export default function Workspace() {
  return (
    <section className="flex-[7] w-full">
      <WorkspaceNavigation />
      <div className="flex w-full h-[calc(100vh_-_130px)] px-4 py-4 bg-gray-100">
        <PreviewArea />
        <EffectsPanel />
      </div>
    </section>
  );
}
