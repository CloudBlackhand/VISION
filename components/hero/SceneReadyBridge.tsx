"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useRef } from "react";

type SceneReadyBridgeProps = {
  onReady: () => void;
};

/** Dispara quando GLTF, texturas e assets da cena terminam de carregar */
export function SceneReadyBridge({ onReady }: SceneReadyBridgeProps) {
  const { active, progress } = useProgress();
  const notified = useRef(false);

  useEffect(() => {
    if (notified.current) return;
    if (!active && progress >= 100) {
      notified.current = true;
      onReady();
    }
  }, [active, progress, onReady]);

  return null;
}
