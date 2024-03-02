'use client';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import TimelineListDraggable from './timeline-list.draggable';

export default function TimelineList() {
  return (
    <DndProvider backend={HTML5Backend}>
      <TimelineListDraggable />
    </DndProvider>
  );
}
