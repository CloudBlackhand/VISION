"use client";

import { Center, useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  Box3,
  BufferAttribute,
  Mesh,
  MeshStandardMaterial,
  SRGBColorSpace,
  Vector3,
  type Group,
  type Object3D,
} from "three";
import { HERO_PLANET } from "@/lib/hero-scene";
import { PlanetAtmosphere } from "./PlanetAtmosphere";

/** Esfera procedural: diâmetro 2 (raio 1) × HERO_PLANET.scale */
const PROCEDURAL_PLANET_DIAMETER = 2;

const tmp = new Vector3();

/** Export Fab traz UV de colorsheet sem PNG — remapeia para equiretangular. */
function applyEarthTextures(
  root: Object3D,
  colorMap: MeshStandardMaterial["map"],
  bumpMap: MeshStandardMaterial["bumpMap"],
) {
  root.traverse((obj) => {
    if (!(obj instanceof Mesh)) return;

    const position = obj.geometry.getAttribute("position");
    if (!position) return;

    const uvs = new Float32Array(position.count * 2);
    for (let i = 0; i < position.count; i++) {
      tmp.fromBufferAttribute(position, i).normalize();
      uvs[i * 2] = 0.5 + Math.atan2(tmp.z, tmp.x) / (2 * Math.PI);
      uvs[i * 2 + 1] =
        0.5 - Math.asin(Math.max(-1, Math.min(1, tmp.y))) / Math.PI;
    }
    obj.geometry.setAttribute("uv", new BufferAttribute(uvs, 2));

    const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
    for (const material of materials) {
      if (!(material instanceof MeshStandardMaterial)) continue;
      material.map = colorMap;
      material.bumpMap = bumpMap;
      material.bumpScale = 0.04;
      material.metalness = 0.05;
      material.roughness = 0.95;
      material.color.setHex(0xffffff);
      material.emissive.setHex(0x000000);
      material.emissiveIntensity = 0;
      material.needsUpdate = true;
    }
  });
}

export function Planet() {
  const groupRef = useRef<Group>(null);
  const spinRef = useRef<Group>(null);
  const { scene } = useGLTF(HERO_PLANET.modelPath);
  const [colorMap, bumpMap] = useTexture([
    HERO_PLANET.textures.color,
    HERO_PLANET.textures.bump,
  ]);

  colorMap.colorSpace = SRGBColorSpace;

  const { clonedScene, fitScale } = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((obj) => {
      const name = obj.name ?? "";
      if (
        obj instanceof Mesh &&
        (name.includes("LOD1") || name.includes("LOD2"))
      ) {
        obj.visible = false;
      }
    });

    applyEarthTextures(clone, colorMap, bumpMap);

    const box = new Box3().setFromObject(clone);
    const size = new Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z, 0.001);
    const targetDiameter = HERO_PLANET.scale * PROCEDURAL_PLANET_DIAMETER;
    const fitScale = targetDiameter / maxDim;

    return { clonedScene: clone, fitScale };
  }, [scene, colorMap, bumpMap]);

  useEffect(() => {
    clonedScene.traverse((obj) => {
      if (obj instanceof Mesh) {
        obj.castShadow = false;
        obj.receiveShadow = true;
        obj.renderOrder = 0;
      }
    });
  }, [clonedScene]);

  useFrame((_, delta) => {
    if (spinRef.current) {
      spinRef.current.rotation.y += delta * 0.012;
    }
  });

  return (
    <group ref={groupRef} position={HERO_PLANET.position}>
      <group ref={spinRef} scale={fitScale}>
        <Center>
          <primitive object={clonedScene} />
        </Center>
        <PlanetAtmosphere />
      </group>
    </group>
  );
}

useGLTF.preload(HERO_PLANET.modelPath);
useTexture.preload(HERO_PLANET.textures.color);
useTexture.preload(HERO_PLANET.textures.bump);
