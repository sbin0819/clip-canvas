'use client';
import { useState } from 'react';
import {
  useEffectsNavigation,
  panelValue,
} from '@/app/store/use-effects-navigation';
import type { PanelType } from '@/app/store/use-effects-navigation';
import { cn } from '@/libs/cn';
import Image from 'next/image';

const iconPathPrefix = './icons/effects-';

export default function PanelNavigation() {
  const { panelType, setPanelType } = useEffectsNavigation();
  const [activeTooltip, setActiveTooltip] = useState('');

  const handlePanelChange = (panel: PanelType) => {
    setPanelType(panel);
  };

  return (
    <div>
      <div className="flex flex-col gap-2 h-auto px-[6px] py-2 bg-white rounded-md position-relative">
        {Object.entries(panelValue).map(([key]) => {
          return (
            <div
              className={cn(
                'p-2 rounded-md cursor-pointer relative',
                panelType === key && 'bg-teal-100',
              )}
              key={key}
              onMouseEnter={() => setActiveTooltip(key)}
              onMouseLeave={() => setActiveTooltip('')}
              onClick={() => handlePanelChange(key as PanelType)}
            >
              <Image
                src={`${iconPathPrefix}${key}.svg`}
                width={18}
                height={18}
                alt={key}
              />
              {activeTooltip === key && (
                <div className="absolute top-0 right-full mr-2 bg-black text-white text-xs p-2 rounded-md">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
