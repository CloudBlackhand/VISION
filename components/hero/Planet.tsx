"use client";

import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import {
  LinearFilter,
  LinearMipmapLinearFilter,
  type Group,
  Mesh,
  SRGBColorSpace,
  type Texture,
} from "three";
import { HERO_PLANET } from "@/lib/hero-scene";
import { PlanetAtmosphere } from "./PlanetAtmosphere";

function configurePlanetTexture(tex: Texture, maxAnisotropy: number) {
  tex.colorSpace = SRGBColorSpace;
  tex.generateMipmaps = true;
  tex.minFilter = LinearMipmapLinearFilter;
  tex.magFilter = LinearFilter;
  tex.anisotropy = Math.min(16, maxAnisotropy);
  tex.needsUpdate = true;
}

export function Planet() {
  const groupRef = useRef<Group>(null);
  const surfaceRef = useRef<Mesh>(null);
  const { gl } = useThree();

  const [colorMap, bumpMap] = useTexture([
    "/textures/planet-surface.jpg",
    "/textures/planet-bump.jpg",
  ]);

  useEffect(() => {
    const maxAniso = gl.capabilities.getMaxAnisotropy();
    configurePlanetTexture(colorMap, maxAniso);
    configurePlanetTexture(bumpMap, maxAniso);
  }, [colorMap, bumpMap, gl]);

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
          bumpScale={0.04}
          metalness={0.05}
          roughness={0.95}
          emissive="#000000"
          emissiveIntensity={0}
        />
      </mesh>

      <PlanetAtmosphere />
    </group>
  );
}

useTexture.preload("/textures/planet-surface.jpg");
useTexture.preload("/textures/planet-bump.jpg");
