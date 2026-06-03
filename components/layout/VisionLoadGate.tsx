"use client";

import { useCallback, useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { SceneReadyContext } from "@/hooks/use-scene-ready-signal";
import { SHOWCASE_POOL } from "@/lib/showcase";

const MIN_LOADING_MS = 1500;
const LOAD_TIMEOUT_MS = 60_000;

type VisionLoadGateProps = {
  children: React.ReactNode;
};

export function VisionLoadGate({ children }: VisionLoadGateProps) {
  const [sceneReady, setSceneReady] = useState(false);
  const [minElapsed, setMinElapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const ready = sceneReady && minElapsed;

  useEffect(() => {
    setIsMounted(true);
    for (const { modelPath } of SHOWCASE_POOL) {
      useGLTF.preload(modelPath);
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }

    return () => {
      window.history.scrollRestoration = previous;
    };
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    const timer = window.setTimeout(() => setMinElapsed(true), MIN_LOADING_MS);
    return () => window.clearTimeout(timer);
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    const timer = window.setTimeout(() => {
      console.warn("Vision: Loading timeout reached, forcing ready state.");
      setSceneReady(true);
      setMinElapsed(true);
    }, LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [isMounted]);

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
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-1000 ease-in-out ${
          ready ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        aria-live="polite"
        aria-busy={!ready}
      >
        <div className="relative mb-8 h-px w-48 overflow-hidden bg-white/10">
          <div
            className="absolute inset-y-0 left-0 bg-white transition-all duration-500 ease-out"
            style={{ width: `${sceneReady ? 100 : 40}%` }}
          />
        </div>
        <p className="font-display text-[10px] font-medium uppercase tracking-[0.8em] text-white/60">
          {sceneReady ? "System Ready" : "Initializing Vision"}
        </p>
      </div>
    </SceneReadyContext.Provider>
  );
}
