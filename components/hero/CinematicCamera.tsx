"use client";

import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import {
  MathUtils,
  PerspectiveCamera as ThreePerspectiveCamera,
  Vector2,
  Vector3,
} from "three";
import {
  EDIT_CAMERA_SEQUENCE,
  type ShotEasing,
} from "@/lib/cinematic-shots";
import { HERO_MOUSE_PARALLAX } from "@/lib/hero-scene";
import { HERO_LAYER } from "@/lib/hero-layers";
import type { HeroPointer } from "@/hooks/use-hero-pointer";

type CinematicCameraProps = {
  paused?: boolean;
  pointerRef?: React.RefObject<HeroPointer>;
  mouseParallax?: boolean;
};

/** Tremor leve tipo câmera “na mão” no vácuo (edit) */
const HANDHELD_POSITION = 0.018;
const HANDHELD_TARGET = 0.008;

function applyEasing(t: number, mode: ShotEasing = "smooth"): number {
  const clamped = MathUtils.clamp(t, 0, 1);
  switch (mode) {
    case "linear":
      return clamped;
    case "ease-in":
      return clamped * clamped;
    case "ease-out":
      return 1 - (1 - clamped) * (1 - clamped);
    default:
      return clamped * clamped * (3 - 2 * clamped);
  }
}

function lerpRoll(from: number, to: number, t: number): number {
  return MathUtils.lerp(from, to, t);
}

export function CinematicCamera({
  paused = false,
  pointerRef,
  mouseParallax = true,
}: CinematicCameraProps) {
  const cameraRef = useRef<ThreePerspectiveCamera>(null);
  const elapsed = useRef(0);
  const shotIndex = useRef(0);
  const smoothMouse = useRef(new Vector2(0, 0));
  const clock = useRef(0);

  const vectors = useMemo(
    () => ({
      position: new Vector3(),
      target: new Vector3(),
      lookAt: new Vector3(),
      fromPos: new Vector3(),
      toPos: new Vector3(),
      fromTarget: new Vector3(),
      toTarget: new Vector3(),
    }),
    [],
  );

  useLayoutEffect(() => {
    const camera = cameraRef.current;
    if (!camera) return;
    const start = EDIT_CAMERA_SEQUENCE[0]!.from;
    camera.position.set(...start.position);
    vectors.target.set(...start.target);
    camera.lookAt(vectors.target);
    if (start.roll) camera.rotateZ(start.roll);
    camera.fov = start.fov;
    camera.layers.enable(HERO_LAYER.car);
    camera.updateProjectionMatrix();
    elapsed.current = 0;
    shotIndex.current = 0;
    clock.current = 0;
  }, [vectors.target]);

  useFrame((_, delta) => {
    const camera = cameraRef.current;
    if (!camera || paused) return;

    clock.current += delta;
    elapsed.current += delta;
    const shot = EDIT_CAMERA_SEQUENCE[shotIndex.current]!;

    if (elapsed.current >= shot.duration) {
      elapsed.current = 0;
      shotIndex.current = (shotIndex.current + 1) % EDIT_CAMERA_SEQUENCE.length;
      return;
    }

    const rawT = elapsed.current / shot.duration;
    const t = applyEasing(rawT, shot.easing ?? "smooth");

    vectors.fromPos.set(...shot.from.position);
    vectors.toPos.set(...shot.to.position);
    vectors.position.copy(vectors.fromPos).lerp(vectors.toPos, t);

    vectors.fromTarget.set(...shot.from.target);
    vectors.toTarget.set(...shot.to.target);
    vectors.target.copy(vectors.fromTarget).lerp(vectors.toTarget, t);

    const roll = lerpRoll(shot.from.roll ?? 0, shot.to.roll ?? 0, t);

    const handheldX =
      Math.sin(clock.current * 1.7) * HANDHELD_POSITION +
      Math.sin(clock.current * 4.3) * HANDHELD_POSITION * 0.4;
    const handheldY =
      Math.cos(clock.current * 2.1) * HANDHELD_POSITION +
      Math.cos(clock.current * 3.9) * HANDHELD_POSITION * 0.35;

    const parallaxScale =
      shot.duration <= 1.6
        ? 0.2
        : shot.from.fov >= 48
          ? 0.35
          : shot.from.fov >= 40
            ? 0.55
            : 1;

    camera.position.copy(vectors.position);
    camera.position.x += handheldX;
    camera.position.y += handheldY;

    vectors.lookAt.copy(vectors.target);
    vectors.lookAt.x +=
      Math.sin(clock.current * 2.5) * HANDHELD_TARGET + handheldX * 0.3;
    vectors.lookAt.y +=
      Math.cos(clock.current * 2.8) * HANDHELD_TARGET + handheldY * 0.3;

    if (mouseParallax && pointerRef) {
      smoothMouse.current.x = MathUtils.lerp(
        smoothMouse.current.x,
        pointerRef.current.x,
        HERO_MOUSE_PARALLAX.smooth,
      );
      smoothMouse.current.y = MathUtils.lerp(
        smoothMouse.current.y,
        pointerRef.current.y,
        HERO_MOUSE_PARALLAX.smooth,
      );
      const mx = smoothMouse.current.x * parallaxScale;
      const my = smoothMouse.current.y * parallaxScale;
      camera.position.x += mx * HERO_MOUSE_PARALLAX.positionX;
      camera.position.y += my * HERO_MOUSE_PARALLAX.positionY;
      vectors.lookAt.x += mx * HERO_MOUSE_PARALLAX.targetX;
      vectors.lookAt.y += my * HERO_MOUSE_PARALLAX.targetY;
    }

    camera.up.set(0, 1, 0);
    camera.lookAt(vectors.lookAt);
    camera.rotateZ(roll);

    camera.fov = MathUtils.lerp(shot.from.fov, shot.to.fov, t);
    camera.updateProjectionMatrix();
  });

  const initial = EDIT_CAMERA_SEQUENCE[0]!.from;

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={initial.position}
      fov={initial.fov}
      near={0.1}
      far={280}
    />
  );
}
