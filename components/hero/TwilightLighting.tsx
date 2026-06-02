"use client";

import { useLayoutEffect, useRef } from "react";
import type { Group, Light } from "three";
import { HERO_LAYER } from "@/lib/hero-layers";

/** Sol distante — ilumina planeta/estrelas, não o carro */
const SUN_POSITION: [number, number, number] = [48, 2, 18];

/** Brilho do planeta atrás do carro — só contorno (rim) */
const PLANET_RIM_POSITION: [number, number, number] = [-6, 14, -38];

export function TwilightSceneLighting() {
  return (
    <>
      <ambientLight intensity={0.028} color="#080c14" />

      <hemisphereLight
        color="#142238"
        groundColor="#120e0a"
        intensity={0.26}
      />

      <directionalLight
        position={SUN_POSITION}
        intensity={2.1}
        color="#9eb4d4"
      />

      <directionalLight
        position={[-14, 8, -10]}
        intensity={0.2}
        color="#2a3850"
      />
    </>
  );
}

/**
 * Luzes só no layer do carro — rim fraco nas bordas, centro permanece no escuro.
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
      <ambientLight intensity={0.016} color="#0a0e16" />

      {/* Rim principal — vindo do planeta / horizonte (como no edit) */}
      <directionalLight
        position={PLANET_RIM_POSITION}
        intensity={0.52}
        color="#8ea8cc"
      />

      {/* Contorno lateral frio, quase imperceptível */}
      <directionalLight
        position={[20, 2, 12]}
        intensity={0.1}
        color="#3d4d68"
      />

      {/* Calor mínimo no horizonte — não ilumina o centro */}
      <directionalLight
        position={[8, -4, 22]}
        intensity={0.06}
        color="#5a4030"
      />
    </group>
  );
}
