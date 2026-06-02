"use client";

import { Html } from "@react-three/drei";
import {
  Bloom,
  BrightnessContrast,
  EffectComposer,
  HueSaturation,
  Vignette,
} from "@react-three/postprocessing";
import { Suspense, useRef } from "react";
import type { Group } from "three";
import type { ShowcaseModel } from "@/lib/showcase";
import type { HeroPointer } from "@/hooks/use-hero-pointer";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { CarStudioLighting } from "./CarStudioLighting";
import { CinematicCamera } from "./CinematicCamera";
import { SpaceEnvironment } from "./SpaceEnvironment";
import { CarSpaceReflection } from "./CarSpaceReflection";
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
  const carRef = useRef<Group>(null);

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
        <RandomCarModel
          ref={carRef}
          model={model}
          paused={reducedMotion}
        />
      </Suspense>

      <CarSpaceReflection carRootRef={carRef} />

      {onSceneReady && <SceneReadyBridge onReady={onSceneReady} />}

      {effectsEnabled && (
        <EffectComposer multisampling={0}>
          <HueSaturation saturation={isMobile ? -0.18 : -0.28} hue={0} />
          <BrightnessContrast
            brightness={isMobile ? -0.01 : -0.03}
            contrast={0.12}
          />
          <Bloom
            intensity={isMobile ? 0.2 : 0.28}
            luminanceThreshold={0.84}
            luminanceSmoothing={0.92}
            mipmapBlur
          />
          <Vignette
            eskil={false}
            offset={0.3}
            darkness={isMobile ? 0.44 : 0.5}
          />
        </EffectComposer>
      )}
    </>
  );
}
