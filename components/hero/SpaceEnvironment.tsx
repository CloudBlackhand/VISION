"use client";

import { Stars } from "@react-three/drei";
import { Suspense } from "react";
import { BackSide } from "three";
import { Planet } from "./Planet";
import { TwilightHorizonGlow } from "./TwilightHorizonGlow";
import { TwilightSceneLighting } from "./TwilightLighting";

function SpaceSky() {
  return (
    <>
      <mesh scale={160}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#000000" side={BackSide} depthWrite={false} />
      </mesh>

      {/* Crepúsculo no horizonte — gradiente na esfera do céu, sem plano quadrado */}
      <TwilightHorizonGlow />

      <Stars
        radius={150}
        depth={100}
        count={5000}
        factor={1.5}
        saturation={0.2}
        fade
        speed={0}
      />
      <Stars
        radius={80}
        depth={50}
        count={1500}
        factor={0.8}
        saturation={0.1}
        fade
        speed={0}
      />

      <Suspense fallback={null}>
        <Planet />
      </Suspense>
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
