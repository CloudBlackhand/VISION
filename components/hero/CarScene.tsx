"use client";

import { Html } from "@react-three/drei";
import {
  Bloom,
  BrightnessContrast,
  EffectComposer,
  HueSaturation,
  Vignette,
} from "@react-three/postprocessing";
import { Suspense } from "react";
import type { ShowcaseModel } from "@/lib/showcase";
import type { HeroPointer } from "@/hooks/use-hero-pointer";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { CarStudioLighting } from "./CarStudioLighting";
import { CinematicCamera } from "./CinematicCamera";
import { SpaceEnvironment } from "./SpaceEnvironment";
import { RandomCarModel } from "./RandomCarModel";
import { SceneReadyBridge } from "./SceneReadyBridge";

type CarSceneProps = {
  model: ShowcaseModel;
  pointerRef?: React.RefObject<HeroPointer>;
  mouseParallax?: boolean;
  onSceneReady?: () => void;
};

function SceneLoader() {
  return <Html center className="sr-only" />;
}

export function CarScene({
  model,
  pointerRef,
  mouseParallax = true,
  onSceneReady,
}: CarSceneProps) {
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();
  const effectsEnabled = !reducedMotion;

  return (
    <>
      <CinematicCamera
        paused={reducedMotion}
        pointerRef={pointerRef}
        mouseParallax={mouseParallax}
      />
      <SpaceEnvironment />
      <CarStudioLighting />

      <Suspense fallback={<SceneLoader />}>
        <RandomCarModel model={model} paused={reducedMotion} />
      </Suspense>

      {onSceneReady && <SceneReadyBridge onReady={onSceneReady} />}

      {effectsEnabled && (
        <EffectComposer multisampling={0}>
          <HueSaturation saturation={isMobile ? -0.12 : -0.22} hue={0} />
          <BrightnessContrast
            brightness={isMobile ? 0.06 : 0.03}
            contrast={0.1}
          />
          <Bloom
            intensity={isMobile ? 0.28 : 0.36}
            luminanceThreshold={0.78}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <Vignette
            eskil={false}
            offset={0.28}
            darkness={isMobile ? 0.45 : 0.52}
          />
        </EffectComposer>
      )}
    </>
  );
}
