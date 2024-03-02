/// <reference types="vitest" />
import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Draggable from './timeline-list.draggable';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

describe('TimelineListDraggable 렌더', () => {
  test('TimelineListDraggable 렌더', () => {
    render(
      <DndProvider backend={HTML5Backend}>
        <Draggable />
      </DndProvider>,
    );
    const section = screen.getByTestId('timeline-list-section');
    expect(section).toBeInTheDocument();
  });
});
