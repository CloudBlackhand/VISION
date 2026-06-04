"use client";

import { Center, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { Box3, Mesh, Vector3, type Group } from "three";
import { HERO_PLANET } from "@/lib/hero-scene";
import { PlanetAtmosphere } from "./PlanetAtmosphere";

/** Esfera procedural: diâmetro 2 (raio 1) × HERO_PLANET.scale */
const PROCEDURAL_PLANET_DIAMETER = 2;

export function Planet() {
  const groupRef = useRef<Group>(null);
  const spinRef = useRef<Group>(null);
  const { scene } = useGLTF(HERO_PLANET.modelPath);

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

    const box = new Box3().setFromObject(clone);
    const size = new Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z, 0.001);
    const targetDiameter = HERO_PLANET.scale * PROCEDURAL_PLANET_DIAMETER;
    const fitScale = targetDiameter / maxDim;

    return { clonedScene: clone, fitScale };
  }, [scene]);

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
