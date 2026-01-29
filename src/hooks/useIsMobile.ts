'use client';

import { useEffect, useState } from 'react';

/**
 * Tailwind `md` breakpoint by default (768px).
 * Returns `true` only on the client after hydration.
 */
export function useIsMobile(breakpointPx: number = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpointPx - 1}px)`);

    const update = () => setIsMobile(mq.matches);
    update();

    // Safari < 14 fallback
    if (mq.addEventListener) {
      mq.addEventListener('change', update);
      return () => mq.removeEventListener('change', update);
    }

    mq.addListener(update);
    return () => mq.removeListener(update);
  }, [breakpointPx]);

  return isMobile;
}

