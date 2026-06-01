"use client";

import { Canvas } from "@react-three/fiber";
import { ACESFilmicToneMapping, Color, SRGBColorSpace } from "three";
import { HERO_LAYER } from "@/lib/hero-layers";
import type { ShowcaseModel } from "@/lib/showcase";
import type { HeroPointer } from "@/hooks/use-hero-pointer";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { CarScene } from "./CarScene";

type CarHeroCanvasProps = {
  model: ShowcaseModel;
  pointerRef?: React.RefObject<HeroPointer>;
  mouseParallax?: boolean;
  onSceneReady?: () => void;
};

export function CarHeroCanvas({
  model,
  pointerRef,
  mouseParallax = true,
  onSceneReady,
}: CarHeroCanvasProps) {
  const isMobile = useIsMobile();

  return (
    <Canvas
      className="h-full w-full touch-none bg-black"
      dpr={isMobile ? [1, 1.25] : [1, 1.75]}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      }}
      onCreated={({ scene, gl, camera }) => {
        scene.background = new Color("#000000");
        gl.setClearColor("#000000", 1);
        gl.outputColorSpace = SRGBColorSpace;
        gl.toneMapping = ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.02;
        camera.layers.enable(HERO_LAYER.car);
      }}
    >
      <CarScene
        model={model}
        pointerRef={pointerRef}
        mouseParallax={mouseParallax}
        onSceneReady={onSceneReady}
      />
    </Canvas>
  );
}
