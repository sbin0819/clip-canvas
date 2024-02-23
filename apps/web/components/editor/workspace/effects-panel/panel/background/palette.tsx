'use cleint';

import useOnClickOutside from '@/hooks/use-on-click-outside';
import { cn } from '@/libs/cn';
import { useRef, useState } from 'react';
import { ColorPicker, useColor, ColorService } from 'react-color-palette';
import 'react-color-palette/css';

export default function Palette() {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('#ffffff');
  const [color, setColor] = useColor('#ffffff');
  const [error, setError] = useState('');

  useOnClickOutside(ref, () => setIsOpen(false));

  const onTogglePalette = () => {
    setIsOpen(!isOpen);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = `#${e.target.value.replace(/[^0-9A-F]/gi, '').slice(0, 6)}`;
    setText(newText);

    const isValid = /^#[0-9A-F]{6}$/i.test(newText);

    if (isValid) {
      const colors = ColorService.convert('hex', text);
      setError('');
      setColor(colors);
    } else {
      setError('Invalid color');
    }
  };

  return (
    <div ref={ref}>
      <div className="h-[38px] flex items-center rounded-md text-sm border border-slate-200">
        <div
          className={cn(
            'w-[42px] h-full rounded-s-md cursor-pointer',
            'border border-r border-slate-200',
          )}
          style={{
            backgroundColor: text,
          }}
          onClick={onTogglePalette}
        />
        <input
          type="text"
          className="tracking-wide"
          value={text}
          onChange={onChange}
        />
      </div>
      {error && (
        <div className="relative top-[-8px] left-[5px] text-[12px] text-red-500">
          {error}
        </div>
      )}
      {isOpen && (
        <ColorPicker
          hideInput={['rgb', 'hsv', 'hex']}
          color={color}
          onChange={(color) => {
            setText(color.hex);
            setColor(color);
            setError('');
          }}
        />
      )}
    </div>
  );
}
