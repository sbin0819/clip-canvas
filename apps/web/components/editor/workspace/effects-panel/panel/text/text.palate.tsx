'use cleint';

import useSideOptions, { ColorType } from '@/app/store/use-side-options';
import useOnClickOutside from '@/hooks/use-on-click-outside';
import { useEffect, useRef, useState } from 'react';
import { ColorPicker, useColor, ColorService } from 'react-color-palette';
import Dropdown from '../common/dropdown';

const colorOptions = ['solid', 'gradient'] as ColorType[];
import 'react-color-palette/css';

const favoriteColors = [
  '#000000',
  '#ffffff',
  '#DEE2E6',
  '#FF407D',

  '#BBE2EC',
  '#333A73',
  '#387ADF',
  '#50C4ED',

  '#F28585',
  '#FFA447',
  '#FFFC9B',
  '#B7E5B4',
];

export default function TextPalette() {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { currentFrameIdx } = useSideOptions((state) => state.options.option);
  const { options, setCurrentFrame } = useSideOptions();

  const [colorText, setColorText] = useState(
    options?.frames[currentFrameIdx]?.backgroundColor || '#ffffff',
  );
  const [color, setColor] = useColor(colorText);
  const [error, setError] = useState('');

  useOnClickOutside(ref, () => setIsOpen(false));

  const updateColor = (newText: string) => {
    const isValid = /^#([0-9A-F]{6}|[0-9A-F]{3})$/i.test(newText);
    if (isValid) {
      setError('');
      setColorText(newText);
      const colors = ColorService.convert('hex', colorText);
      setColor(colors);
      setCurrentFrame((prev) => ({
        ...prev,
        backgroundColor: newText,
      }));
    } else {
      setError('Invalid color');
    }
  };

  const onTogglePalette = () => setIsOpen(!isOpen);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = `#${e.target.value.slice(1, 7)}`;
    updateColor(newText);
    setColorText(newText);
  };

  const onClickColor = (newColor: string) => {
    updateColor(newColor);
  };

  useEffect(() => {
    const newColor =
      options.frames[options.option.currentFrameIdx]?.backgroundColor ||
      '#ffffff';
    setColorText(newColor);
    const convertedColor = ColorService.convert('hex', newColor);
    setColor(convertedColor);
  }, [options, options.option.currentFrameIdx]);

  return (
    <div className="pt-4">
      {/* text dropdown 으로 변경 */}
      <Dropdown dropdownKey={'backgroundType'} selectOptions={colorOptions} />
      <div className="pt-4" ref={ref}>
        <div className="relative">
          <div className="h-[38px] flex items-center rounded-md text-sm border border-slate-200">
            <div
              className="w-[42px] h-full rounded-s-md cursor-pointer border border-r border-slate-100"
              style={{ backgroundColor: colorText }}
              onClick={onTogglePalette}
            />
            <input
              type="text"
              className="tracking-wide"
              value={colorText}
              onChange={onChange}
            />
          </div>
          {error && (
            <div className="relative top-[2px] left-[5px] text-[12px] text-red-500">
              {error}
            </div>
          )}
          {isOpen && (
            <div className="absolute w-full top-[45px]">
              <ColorPicker
                hideInput={['rgb', 'hsv', 'hex']}
                color={color}
                onChange={(newColor) => {
                  updateColor(newColor.hex);
                }}
              />
            </div>
          )}
        </div>
        <div className="mt-4 px-[8px] py-[8px] w-full rounded-md text-sm border border-slate-200 grid grid-cols-4 gap-2">
          {favoriteColors.map((color, index) => (
            <div
              key={index}
              className="aspect-square rounded-md border border-slate-200 cursor-pointer shadow-md"
              style={{ backgroundColor: color }}
              onClick={() => onClickColor(color)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
