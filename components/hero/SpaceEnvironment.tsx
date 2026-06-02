"use client";

import { Stars } from "@react-three/drei";
import { Suspense } from "react";
import { BackSide } from "three";
import { Planet } from "./Planet";
import { SpaceReflectionEnvironment } from "./SpaceReflectionEnvironment";
import { TwilightHorizonGlow } from "./TwilightHorizonGlow";
import { TwilightSceneLighting } from "./TwilightLighting";

function SpaceSky() {
  return (
    <>
      <mesh scale={160} frustumCulled={false}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#000000" side={BackSide} depthWrite={false} />
      </mesh>

      {/* Crepúsculo no horizonte — gradiente na esfera do céu, sem plano quadrado */}
      <TwilightHorizonGlow />

      <Stars
        radius={120}
        depth={80}
        count={8000}
        factor={2.2}
        saturation={0}
        fade
        speed={0.1}
      />
      <Stars
        radius={60}
        depth={40}
        count={1800}
        factor={1.2}
        saturation={0}
        fade
        speed={0.05}
      />

      <Suspense fallback={null}>
        <Planet />
      </Suspense>

      <SpaceReflectionEnvironment />
    </>
  );
}

export function SpaceEnvironment() {
  return (
    <>
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#020408", 22, 88]} />

      <SpaceSky />
      <TwilightSceneLighting />
    </>
  );
}
