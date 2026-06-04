"use client";

import { useLayoutEffect, useRef } from "react";
import type { Group, Light } from "three";
import { HERO_CAR_ANCHOR, HERO_PLANET } from "@/lib/hero-scene";
import { HERO_LAYER } from "@/lib/hero-layers";

/** Sol distante — ilumina planeta e atmosfera */
const SUN_POSITION: [number, number, number] = [48, 2, 18];

const PLANET_POS = HERO_PLANET.position;
const CAR_POS = HERO_CAR_ANCHOR.position;

export function TwilightSceneLighting() {
  const groupRef = useRef<Group>(null);

  useLayoutEffect(() => {
    const group = groupRef.current;
    if (!group) return;
    group.traverse((obj) => {
      if ((obj as Light).isLight) {
        obj.layers.set(HERO_LAYER.world);
      }
    });
  });

  return (
    <group ref={groupRef} name="twilight-scene-lights">
      <ambientLight intensity={0.02} color="#050810" />

      <hemisphereLight
        color="#2a4a7a"
        groundColor="#020205"
        intensity={0.25}
      />

      <directionalLight
        position={SUN_POSITION}
        intensity={3.2}
        color="#d0e0f8"
      />

      {/* Luz sutil do planeta - não é uma fonte de luz forte */}
      <pointLight
        position={PLANET_POS}
        intensity={8}
        distance={120}
        decay={1.8}
        color="#8899bb"
      />

      <directionalLight
        position={[-14, 8, -10]}
        intensity={0.28}
        color="#3a5078"
      />
    </group>
  );
}

/**
 * Luz rebatida do planeta no carro — fill suave + rim alinhado à posição real da Terra.
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
      <ambientLight intensity={0.018} color="#0c121c" />

      {/* Bounce: luz que "sai" do planeta e bate na lataria */}
      <hemisphereLight
        color="#7aa4d4"
        groundColor="#050608"
        intensity={0.4}
      />

      <directionalLight position={PLANET_POS} intensity={1.05} color="#c8dcf4">
        <object3D position={CAR_POS} />
      </directionalLight>

      <pointLight
        position={[
          PLANET_POS[0],
          PLANET_POS[1] + HERO_PLANET.scale * 0.35,
          PLANET_POS[2],
        ]}
        intensity={2.4}
        distance={90}
        decay={2}
        color="#b0d0f8"
      />

      {/* Rim no contorno — mesma direção do planeta */}
      <directionalLight position={PLANET_POS} intensity={0.55} color="#9eb8dc">
        <object3D position={CAR_POS} />
      </directionalLight>

      <directionalLight
        position={[20, 2, 12]}
        intensity={0.08}
        color="#3d4d68"
      />
    </group>
  );
}
