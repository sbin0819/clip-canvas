'use client';

import PanelNavigation from './panel-navigation';
import Panel from './panel/panel';

export default function EffectsPanel() {
  return (
    <div className="flex-1 flex justify-end gap-2">
      <Panel />
      <PanelNavigation />
    </div>
  );
}
