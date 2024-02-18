'use client';

import { useCallback } from 'react';
import type { FrameState } from '@/app/store/useSideOptions';
import styles from './slide-item.module.css';
import { cn } from '@cn';

export default function SlideItem({
  frame,
  isActiveFrame,
}: {
  frame: FrameState;
  isActiveFrame: boolean;
}) {
  const render = useCallback(() => {
    const frameClasses = `${styles.frame} ${
      isActiveFrame ? styles.active : styles.inactive
    }`;

    return (
      <div className={cn(frameClasses, 'rounded-md')}>
        <div className="h-[40px]"></div>
        {isActiveFrame && <div className="h-[40px]"></div>}
      </div>
    );
  }, [isActiveFrame]);

  return <>{render()}</>;
}
