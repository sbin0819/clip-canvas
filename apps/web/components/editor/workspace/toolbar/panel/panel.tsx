import { useCallback } from 'react';
import {
  PanelBackground,
  PanelText,
  PanelMedia,
  PanelAnimations,
  PanelTransitions,
  PanelAudio,
} from '.';

import { useToolbarStore, panelValue } from '@/app/store/use-toolbar-store';
import type { PanelType } from '@/app/store/use-toolbar-store';

export default function Panel() {
  const { panelType } = useToolbarStore();

  const renderPanel = useCallback((panel: PanelType) => {
    switch (panel) {
      case panelValue.background:
        return <PanelBackground />;
      case panelValue.text:
        return <PanelText />;
      case panelValue.media:
        return <PanelMedia />;
      case panelValue.animations:
        return <PanelAnimations />;
      case panelValue.transitions:
        return <PanelTransitions />;
      case panelValue.audio:
        return <PanelAudio />;
      default:
        return <PanelBackground />;
    }
  }, []);

  return (
    <div className="p-4 flex-1 bg-white rounded-md">
      {renderPanel(panelType)}
    </div>
  );
}
