"use client";

import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { type Group, Mesh, SRGBColorSpace } from "three";
import { HERO_PLANET } from "@/lib/hero-scene";
import { PlanetAtmosphere } from "./PlanetAtmosphere";

export function Planet() {
  const groupRef = useRef<Group>(null);
  const surfaceRef = useRef<Mesh>(null);

  const [colorMap, bumpMap] = useTexture([
    "/textures/planet-surface.jpg",
    "/textures/planet-bump.jpg",
  ]);

  colorMap.colorSpace = SRGBColorSpace;

  useFrame((_, delta) => {
    if (surfaceRef.current) {
      surfaceRef.current.rotation.y += delta * 0.012;
    }
  });

  return (
    <group
      ref={groupRef}
      position={HERO_PLANET.position}
      scale={HERO_PLANET.scale}
    >
      <mesh ref={surfaceRef} renderOrder={0}>
        <sphereGeometry args={[1, 96, 96]} />
        <meshStandardMaterial
          map={colorMap}
          bumpMap={bumpMap}
          bumpScale={0.025}
          metalness={0}
          roughness={1}
          color="#7a889c"
          emissive="#080c12"
          emissiveIntensity={0.028}
          polygonOffset
          polygonOffsetFactor={2}
          polygonOffsetUnits={2}
        />
      </mesh>

      <PlanetAtmosphere />
    </group>
  );
}

useTexture.preload("/textures/planet-surface.jpg");
useTexture.preload("/textures/planet-bump.jpg");
