import {
  PanelAnimations,
  PanelAudio,
  PanelBackground,
  PanelMedia,
  PanelText,
  PanelTransitions,
} from '.';

import { panelValue, useToolbarStore } from '@/app/store/use-toolbar-store';

const panelMap = {
  [panelValue.background]: <PanelBackground />,
  [panelValue.text]: <PanelText />,
  [panelValue.media]: <PanelMedia />,
  [panelValue.animations]: <PanelAnimations />,
  [panelValue.transitions]: <PanelTransitions />,
  [panelValue.audio]: <PanelAudio />,
};

export default function Panel() {
  const { panelType } = useToolbarStore();

  return (
    <div className="p-4 flex-1 bg-white rounded-md">{panelMap[panelType]}</div>
  );
}
