"use client";

import { Center, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  Box3,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Vector3,
  type Group,
  type Object3D,
  type Texture,
} from "three";
import { SHOWCASE_POOL, type ShowcaseModel } from "@/lib/showcase";
import {
  HERO_CAR_ANCHOR,
  HERO_CAR_DRIFT,
  HERO_MODEL_TARGET_SIZE,
} from "@/lib/hero-scene";
import { HERO_LAYER } from "@/lib/hero-layers";

type RandomCarModelProps = {
  model: ShowcaseModel;
  paused?: boolean;
};

function bindEnvironmentMap(root: Object3D, envMap: Texture | null): void {
  if (!envMap) return;

  root.traverse((obj) => {
    if (!(obj instanceof Mesh)) return;

    const materials = Array.isArray(obj.material)
      ? obj.material
      : [obj.material];

    for (const material of materials) {
      if (
        material instanceof MeshStandardMaterial ||
        material instanceof MeshPhysicalMaterial
      ) {
        material.envMap = envMap;
        material.needsUpdate = true;
      }
    }
  });
}

export function RandomCarModel({ model, paused = false }: RandomCarModelProps) {
  const groupRef = useRef<Group>(null);
  const yaw = useRef(model.rotation?.[1] ?? 0);
  const { scene } = useGLTF(model.modelPath);
  const environmentMap = useThree((state) => state.scene.environment);

  const { clonedScene, fitScale } = useMemo(() => {
    const clone = scene.clone(true);

    const box = new Box3().setFromObject(clone);
    const size = new Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z, 0.001);
    const scale =
      (HERO_MODEL_TARGET_SIZE / maxDim) * (model.fitMultiplier ?? 1);

    return { clonedScene: clone, fitScale: scale };
  }, [scene, model.fitMultiplier]);

  useEffect(() => {
    bindEnvironmentMap(clonedScene, environmentMap);
  }, [clonedScene, environmentMap]);

  useEffect(() => {
    clonedScene.traverse((obj) => {
      if (obj instanceof Mesh) {
        obj.castShadow = true;
        obj.receiveShadow = false;
        obj.renderOrder = 10;
        obj.layers.set(HERO_LAYER.car);
      }
    });
  }, [clonedScene]);

  useFrame((state, delta) => {
    if (paused || !groupRef.current) return;
    const t = state.clock.elapsedTime;
    const d = HERO_CAR_DRIFT;
    const base = model.rotation ?? [0, 0, 0];
    yaw.current += d.yawSpeed * delta;
    groupRef.current.rotation.set(
      base[0] + Math.sin(t * d.pitchHz) * d.pitchAmp,
      yaw.current,
      base[2] + Math.cos(t * d.rollHz) * d.rollAmp,
    );
    const baseY = (model.position ?? HERO_CAR_ANCHOR.position)[1];
    groupRef.current.position.y =
      baseY + Math.sin(t * d.bobHz * 1000) * d.bobAmp;
  });

  return (
    <group
      ref={groupRef}
      scale={fitScale}
      position={model.position ?? HERO_CAR_ANCHOR.position}
      layers={HERO_LAYER.car}
    >
      <Center>
        <primitive object={clonedScene} />
      </Center>
    </group>
  );
}

for (const { modelPath } of SHOWCASE_POOL) {
  useGLTF.preload(modelPath);
}
