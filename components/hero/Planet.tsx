"use client";

import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import {
  LinearFilter,
  LinearMipmapLinearFilter,
  NoColorSpace,
  SRGBColorSpace,
  type Group,
  Mesh,
  type Texture,
} from "three";
import { HERO_PLANET } from "@/lib/hero-scene";
import { PlanetAtmosphere } from "./PlanetAtmosphere";

function configureColorTexture(tex: Texture, maxAnisotropy: number) {
  tex.colorSpace = SRGBColorSpace;
  tex.generateMipmaps = true;
  tex.minFilter = LinearMipmapLinearFilter;
  tex.magFilter = LinearFilter;
  tex.anisotropy = Math.min(16, maxAnisotropy);
  tex.needsUpdate = true;
}

/** Height/roughness — linear, sem SRGB, para o relevo não ficar “liso”. */
function configureDataTexture(tex: Texture, maxAnisotropy: number) {
  tex.colorSpace = NoColorSpace;
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

  const [colorMap, reliefMap] = useTexture([
    "/textures/planet-surface.jpg",
    "/textures/planet-bump.jpg",
  ]);

  useEffect(() => {
    const maxAniso = gl.capabilities.getMaxAnisotropy();
    configureColorTexture(colorMap, maxAniso);
    configureDataTexture(reliefMap, maxAniso);
  }, [colorMap, reliefMap, gl]);

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
          normalMap={reliefMap}
          normalScale={[2.6, 2.6]}
          roughnessMap={reliefMap}
          roughness={1}
          metalness={0.02}
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
