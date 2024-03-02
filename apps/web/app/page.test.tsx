import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import Page from '../app/page';

test('Page', () => {
  const container = render(<Page />);
  const logo = container.getByTestId('nav__data-logo');
  expect(logo.textContent).to.contain('Clipcanvas');
});
