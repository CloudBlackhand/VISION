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
      <ambientLight intensity={0.035} color="#080c14" />

      <hemisphereLight
        color="#142238"
        groundColor="#120e0a"
        intensity={0.33}
      />

      <directionalLight
        position={SUN_POSITION}
        intensity={2.62}
        color="#9eb4d4"
      />

      <directionalLight
        position={[-14, 8, -10]}
        intensity={0.25}
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
      <ambientLight intensity={0.02} color="#0a0e16" />

      {/* Rim principal — vindo do planeta / horizonte (como no edit) */}
      <directionalLight
        position={PLANET_RIM_POSITION}
        intensity={0.65}
        color="#8ea8cc"
      />

      {/* Contorno lateral frio, quase imperceptível */}
      <directionalLight
        position={[20, 2, 12]}
        intensity={0.125}
        color="#3d4d68"
      />

      {/* Calor mínimo no horizonte — não ilumina o centro */}
      <directionalLight
        position={[8, -4, 22]}
        intensity={0.075}
        color="#5a4030"
      />
    </group>
  );
}
