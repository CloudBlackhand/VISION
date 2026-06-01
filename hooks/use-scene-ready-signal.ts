"use client";

import { createContext, useContext } from "react";

export const SceneReadyContext = createContext<(() => void) | null>(null);

export function useSceneReadySignal(): () => void {
  const signal = useContext(SceneReadyContext);
  return signal ?? (() => {});
}
