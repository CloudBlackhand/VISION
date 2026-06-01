"use client";

import { useLayoutEffect, useRef } from "react";
import type { Group, Light } from "three";
import { HERO_LAYER } from "@/lib/hero-layers";

const SUN_POSITION: [number, number, number] = [48, 2, 18];

/** Ilumina planeta e estrelas — não atinge o layer do carro */
export function TwilightSceneLighting() {
  return (
    <>
      <ambientLight intensity={0.04} color="#0a1018" />

      <hemisphereLight
        color="#1a2840"
        groundColor="#1a120c"
        intensity={0.38}
      />

      <directionalLight
        position={SUN_POSITION}
        intensity={3.2}
        color="#b8cce8"
      />

      <directionalLight
        position={[-14, 8, -10]}
        intensity={0.32}
        color="#3a5078"
      />
    </>
  );
}

/**
 * Luzes exclusivas do carro — rim nas bordas, centro permanece escuro.
 */
export function TwilightCarLighting() {
  const groupRef = useRef<Group>(null);

  useLayoutEffect(() => {
    const group = groupRef.current;
    if (!group) return;
    group.traverse((obj) => {
      if ((obj as Light).isLight) {
        obj.layers.disable(HERO_LAYER.world);
        obj.layers.enable(HERO_LAYER.car);
      }
    });
  });

  return (
    <group ref={groupRef} name="twilight-car-lights">
      <ambientLight intensity={0.055} color="#141c28" />

      <directionalLight
        position={[18, 2.5, 14]}
        intensity={3.8}
        color="#d4e4f8"
      />

      <directionalLight
        position={[12, 0.8, -14]}
        intensity={2.4}
        color="#ecd8b8"
      />

      <spotLight
        position={[24, 4, 16]}
        angle={0.17}
        penumbra={0.92}
        intensity={7}
        color="#e8f0fc"
        distance={48}
        decay={2}
      />

      <directionalLight
        position={[-10, 4, 8]}
        intensity={0.22}
        color="#2a3850"
      />
    </group>
  );
}
