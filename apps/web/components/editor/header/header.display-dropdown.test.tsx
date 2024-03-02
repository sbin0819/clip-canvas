import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import DisplayDropdown from './header.display-dropdown';
import userEvent from '@testing-library/user-event';

import { DISPLAY_OPTIONS } from '@/components/editor/constant';

describe('Editor Display Dropdown', () => {
  test('dropdown 버튼 클릭 동작 확인', async () => {
    render(<DisplayDropdown />);
    const button = screen.getByTestId('editor__display-dropdown-button');

    await userEvent.click(button);
    const items = await screen.findAllByRole('menuitem');

    expect(items.length).toBe(DISPLAY_OPTIONS.length);
  });

  test('dropdown 아이템 클릭 동작 확인', async () => {
    render(<DisplayDropdown />);
    const button = screen.getByTestId('editor__display-dropdown-button');

    await userEvent.click(button);
    const items = await screen.findAllByRole('menuitem');

    if (items.length === 0) {
      throw new Error('dropdown 아이템이 없습니다.');
    }

    await userEvent.click(items[0] as HTMLElement);

    expect(items[0]).toHaveTextContent(button.textContent!);
  });

  test('dropdown 버튼 클릭 후 아이템 클릭 시 dropdown 닫힘 확인', async () => {
    render(<DisplayDropdown />);
    const button = screen.getByTestId('editor__display-dropdown-button');

    await userEvent.click(button);
    const items = await screen.findAllByRole('menuitem');

    if (items.length === 0) {
      throw new Error('dropdown 아이템이 없습니다.');
    }

    await userEvent.click(items[0] as HTMLElement);

    expect(screen.queryByRole('menuitem')).toBeNull();
  });

  test('dropdown 외부 클릭 시 dropdown 닫힘 확인', async () => {
    const container = render(<DisplayDropdown />);
    const button = container.getByTestId('editor__display-dropdown-button');

    await userEvent.click(button);
    const items = await screen.findAllByRole('menuitem');

    if (items.length === 0) {
      throw new Error('dropdown 아이템이 없습니다.');
    }

    await userEvent.click(document.body);

    expect(screen.queryByRole('menuitem')).toBeNull();
  });
});
