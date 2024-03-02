'use client';

import ToolbarNavigation from './toolbar.navigation';
import Panel from './panel/panel';

export default function Toolbar() {
  return (
    <div className="flex-1 flex justify-end gap-2">
      <Panel />
      <ToolbarNavigation />
    </div>
  );
}
