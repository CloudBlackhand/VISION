"use client";

import { useCallback, useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { SceneReadyContext } from "@/hooks/use-scene-ready-signal";
import { SHOWCASE_POOL } from "@/lib/showcase";

const MIN_LOADING_MS = 700;
const LOAD_TIMEOUT_MS = 90_000;

type VisionLoadGateProps = {
  children: React.ReactNode;
};

export function VisionLoadGate({ children }: VisionLoadGateProps) {
  const [sceneReady, setSceneReady] = useState(false);
  const [minElapsed, setMinElapsed] = useState(false);

  const ready = sceneReady && minElapsed;

  useEffect(() => {
    for (const { modelPath } of SHOWCASE_POOL) {
      useGLTF.preload(modelPath);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setMinElapsed(true), MIN_LOADING_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSceneReady(true);
      setMinElapsed(true);
    }, LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const handleSceneReady = useCallback(() => {
    setSceneReady(true);
  }, []);

  return (
    <SceneReadyContext.Provider value={handleSceneReady}>
      <div
        className={`transition-opacity duration-700 ease-out ${
          ready ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden={!ready}
      >
        {children}
      </div>

      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-700 ease-out ${
          ready ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        aria-live="polite"
        aria-busy={!ready}
      >
        <p className="font-display text-sm font-semibold uppercase tracking-[0.55em] text-white">
          Loading
        </p>
      </div>
    </SceneReadyContext.Provider>
  );
}
