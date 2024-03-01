import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page from '../app/page';

test('Page', () => {
  render(<Page />);
  const logo = screen.getByTestId('nav__data-logo');
  expect(logo.textContent).to.contain('Clipcanvas');
});
