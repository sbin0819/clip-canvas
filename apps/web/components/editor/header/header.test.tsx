import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import Header from './header';

describe('Editor Header', () => {
  test('Editor Header 렌더', () => {
    const container = render(<Header />);
    const header = container.getByTestId('editor__header');
    expect(header).toBeDefined();
  });
});
