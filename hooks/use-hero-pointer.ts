"use client";

import { useCallback, useRef } from "react";

export type HeroPointer = {
  x: number;
  y: number;
};

export function useHeroPointer() {
  const pointerRef = useRef<HeroPointer>({ x: 0, y: 0 });

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    pointerRef.current.x = Math.max(-1, Math.min(1, x));
    pointerRef.current.y = Math.max(-1, Math.min(1, y));
  }, []);

  const onPointerLeave = useCallback(() => {
    pointerRef.current.x = 0;
    pointerRef.current.y = 0;
  }, []);

  return { pointerRef, onPointerMove, onPointerLeave };
}
