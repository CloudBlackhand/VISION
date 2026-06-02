/**
 * Sequência editorial — um plano por zona, cortes lentos, alvo fixo na peça.
 * Referência: https://www.youtube.com/watch?v=2wQp9LlExP8
 */
import { HERO_CAR_ANCHOR } from "./hero-scene";

export const CAR_FOCUS: [number, number, number] = [
  HERO_CAR_ANCHOR.position[0],
  HERO_CAR_ANCHOR.position[1] - 0.15,
  HERO_CAR_ANCHOR.position[2],
];

/** Pontos de interesse — cada plano usa só o seu (sem “vazar” para outra área) */
const POI = {
  frontQuarter: [
    CAR_FOCUS[0] + 0.38,
    CAR_FOCUS[1] + 0.18,
    CAR_FOCUS[2] + 0.72,
  ] as [number, number, number],
  headlight: [
    CAR_FOCUS[0] + 0.58,
    CAR_FOCUS[1] + 0.12,
    CAR_FOCUS[2] + 0.88,
  ] as [number, number, number],
  sidePanel: [
    CAR_FOCUS[0] + 0.82,
    CAR_FOCUS[1] + 0.1,
    CAR_FOCUS[2] + 0.12,
  ] as [number, number, number],
  wheel: [
    CAR_FOCUS[0] + 0.52,
    CAR_FOCUS[1] - 0.06,
    CAR_FOCUS[2] + 0.28,
  ] as [number, number, number],
  hood: [
    CAR_FOCUS[0] + 0.18,
    CAR_FOCUS[1] + 0.48,
    CAR_FOCUS[2] + 0.52,
  ] as [number, number, number],
  rearQuarter: [
    CAR_FOCUS[0] - 0.48,
    CAR_FOCUS[1] + 0.2,
    CAR_FOCUS[2] + 0.18,
  ] as [number, number, number],
};

export type ShotKeyframe = {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  roll?: number;
};

export type ShotEasing = "smooth" | "linear" | "ease-in" | "ease-out";

export type CinematicShot = {
  id: string;
  duration: number;
  from: ShotKeyframe;
  to: ShotKeyframe;
  easing?: ShotEasing;
};

/** 6 planos · ~31s — sem repetir zona nem cortes rápidos */
export const EDIT_CAMERA_SEQUENCE: CinematicShot[] = [
  {
    id: "01-front-quarter-full",
    duration: 5.5,
    easing: "ease-out",
    from: {
      position: [2.85, 0.95, 4.1],
      target: POI.frontQuarter,
      fov: 26,
      roll: -0.22,
    },
    to: {
      position: [2.45, 0.82, 3.65],
      target: POI.frontQuarter,
      fov: 24,
      roll: -0.18,
    },
  },
  {
    id: "02-headlight-only",
    duration: 6,
    easing: "smooth",
    from: {
      position: [2.15, 0.58, 3.15],
      target: POI.headlight,
      fov: 22,
      roll: -0.2,
    },
    to: {
      position: [1.92, 0.52, 2.88],
      target: POI.headlight,
      fov: 20,
      roll: -0.16,
    },
  },
  {
    id: "03-side-panel-full",
    duration: 5.5,
    easing: "smooth",
    from: {
      position: [3.45, 0.78, 3.55],
      target: POI.sidePanel,
      fov: 25,
      roll: 0.12,
    },
    to: {
      position: [3.05, 0.72, 3.15],
      target: POI.sidePanel,
      fov: 23,
      roll: 0.08,
    },
  },
  {
    id: "04-wheel-full",
    duration: 5,
    easing: "ease-in",
    from: {
      position: [3.05, 0.32, 3.05],
      target: POI.wheel,
      fov: 24,
      roll: -0.34,
    },
    to: {
      position: [2.65, 0.26, 2.7],
      target: POI.wheel,
      fov: 22,
      roll: -0.28,
    },
  },
  {
    id: "05-hood-full",
    duration: 5,
    easing: "linear",
    from: {
      position: [1.35, 1.12, 3.05],
      target: POI.hood,
      fov: 23,
      roll: 0.18,
    },
    to: {
      position: [1.12, 1.02, 2.75],
      target: POI.hood,
      fov: 21,
      roll: 0.14,
    },
  },
  {
    id: "06-rear-quarter-dutch",
    duration: 5.5,
    easing: "ease-out",
    from: {
      position: [-2.85, 0.55, 3.35],
      target: POI.rearQuarter,
      fov: 25,
      roll: -0.28,
    },
    to: {
      position: [-2.45, 0.48, 3],
      target: POI.rearQuarter,
      fov: 23,
      roll: -0.22,
    },
  },
];

export const EDIT_SEQUENCE_DURATION_SEC = EDIT_CAMERA_SEQUENCE.reduce(
  (sum, shot) => sum + shot.duration,
  0,
);
