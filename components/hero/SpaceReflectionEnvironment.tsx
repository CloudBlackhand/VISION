"use client";

import { Environment, Stars } from "@react-three/drei";
import { Suspense } from "react";
import { HERO_PLANET } from "@/lib/hero-scene";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { Planet } from "./Planet";

/**
 * Gera IBL a partir do planeta + estrelas para reflexo real na pintura do carro.
 * Filhos são renderizados só para o cubemap (drei Environment portal).
 */
export function SpaceReflectionEnvironment() {
  const isMobile = useIsMobile();
  const resolution = isMobile ? 128 : 256;

  return (
    <Environment
      frames={Infinity}
      resolution={resolution}
      background={false}
      blur={0.3}
      environmentIntensity={1.2}
    >
      <Stars
        radius={120}
        depth={80}
        count={isMobile ? 3500 : 6000}
        factor={2.4}
        saturation={0}
        fade
        speed={0.08}
      />
      <Suspense fallback={null}>
        <group position={HERO_PLANET.position} scale={HERO_PLANET.scale}>
          <Planet />
        </group>
      </Suspense>
    </Environment>
  );
}
