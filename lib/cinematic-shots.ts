/**
 * Planos do edit VISION — só dolly/push estáticos (sem órbita ao redor do carro).
 * Referência: https://www.youtube.com/watch?v=2wQp9LlExP8
 */
import { HERO_CAR_ANCHOR } from "./hero-scene";

export const CAR_FOCUS: [number, number, number] = [
  HERO_CAR_ANCHOR.position[0],
  HERO_CAR_ANCHOR.position[1] - 0.15,
  HERO_CAR_ANCHOR.position[2],
];

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

export const EDIT_CAMERA_SEQUENCE: CinematicShot[] = [
  {
    id: "01-front-badge-dutch",
    duration: 2.2,
    easing: "ease-out",
    from: {
      position: [2.7, 0.9, 3.7],
      target: [CAR_FOCUS[0] + 0.5, CAR_FOCUS[1] + 0.25, CAR_FOCUS[2] + 0.9],
      fov: 24,
      roll: -0.38,
    },
    to: {
      position: [2.2, 0.76, 3.2],
      target: [CAR_FOCUS[0] + 0.35, CAR_FOCUS[1] + 0.2, CAR_FOCUS[2] + 0.65],
      fov: 22,
      roll: -0.3,
    },
  },
  {
    id: "02-headlight-edge-slide",
    duration: 1.8,
    easing: "linear",
    from: {
      position: [2.05, 0.68, 2.95],
      target: [CAR_FOCUS[0] + 0.42, CAR_FOCUS[1] + 0.16, CAR_FOCUS[2] + 0.6],
      fov: 22,
      roll: -0.24,
    },
    to: {
      position: [1.7, 0.62, 2.65],
      target: [CAR_FOCUS[0] + 0.25, CAR_FOCUS[1] + 0.12, CAR_FOCUS[2] + 0.45],
      fov: 20,
      roll: -0.18,
    },
  },
  {
    id: "03-wheel-arch-macro",
    duration: 2.1,
    easing: "ease-in",
    from: {
      position: [3.2, 0.36, 2.9],
      target: [CAR_FOCUS[0] + 0.65, CAR_FOCUS[1] - 0.15, CAR_FOCUS[2] + 0.45],
      fov: 23,
      roll: -0.46,
    },
    to: {
      position: [2.7, 0.3, 2.5],
      target: [CAR_FOCUS[0] + 0.5, CAR_FOCUS[1] - 0.12, CAR_FOCUS[2] + 0.35],
      fov: 21,
      roll: -0.4,
    },
  },
  {
    id: "04-side-crease-pass",
    duration: 2.3,
    easing: "smooth",
    from: {
      position: [3.3, 0.7, 3.4],
      target: [CAR_FOCUS[0] + 0.8, CAR_FOCUS[1] + 0.08, CAR_FOCUS[2] + 0.3],
      fov: 24,
      roll: 0.15,
    },
    to: {
      position: [2.8, 0.64, 3],
      target: [CAR_FOCUS[0] + 0.55, CAR_FOCUS[1] + 0.05, CAR_FOCUS[2] + 0.2],
      fov: 22,
      roll: 0.1,
    },
  },
  {
    id: "05-hood-metal-flake",
    duration: 1.9,
    easing: "linear",
    from: {
      position: [1.25, 1.05, 2.65],
      target: [CAR_FOCUS[0] + 0.25, CAR_FOCUS[1] + 0.55, CAR_FOCUS[2] + 0.55],
      fov: 20,
      roll: 0.22,
    },
    to: {
      position: [1, 0.95, 2.35],
      target: [CAR_FOCUS[0] + 0.12, CAR_FOCUS[1] + 0.45, CAR_FOCUS[2] + 0.4],
      fov: 19,
      roll: 0.18,
    },
  },
  {
    id: "06-mirror-shoulder-glide",
    duration: 2,
    easing: "ease-out",
    from: {
      position: [2.4, 0.9, 2.85],
      target: [CAR_FOCUS[0] + 0.45, CAR_FOCUS[1] + 0.32, CAR_FOCUS[2] + 0.25],
      fov: 22,
      roll: 0.26,
    },
    to: {
      position: [2.05, 0.82, 2.6],
      target: [CAR_FOCUS[0] + 0.32, CAR_FOCUS[1] + 0.25, CAR_FOCUS[2] + 0.15],
      fov: 20,
      roll: 0.2,
    },
  },
  {
    id: "07-rear-light-slice",
    duration: 2.2,
    easing: "linear",
    from: {
      position: [-2.65, 0.72, 3.25],
      target: [CAR_FOCUS[0] - 0.45, CAR_FOCUS[1] + 0.22, CAR_FOCUS[2] + 0.32],
      fov: 23,
      roll: -0.16,
    },
    to: {
      position: [-2.2, 0.66, 2.9],
      target: [CAR_FOCUS[0] - 0.28, CAR_FOCUS[1] + 0.16, CAR_FOCUS[2] + 0.22],
      fov: 21,
      roll: -0.1,
    },
  },
  {
    id: "08-rear-diffuser-low",
    duration: 1.9,
    easing: "ease-in",
    from: {
      position: [-1.7, 0.02, 2.8],
      target: [CAR_FOCUS[0] - 0.2, CAR_FOCUS[1] + 0.22, CAR_FOCUS[2] + 0.1],
      fov: 20,
      roll: -0.22,
    },
    to: {
      position: [-1.35, 0.08, 2.45],
      target: [CAR_FOCUS[0] - 0.1, CAR_FOCUS[1] + 0.2, CAR_FOCUS[2] + 0.02],
      fov: 19,
      roll: -0.18,
    },
  },
  {
    id: "09-front-quarter-compression",
    duration: 2.2,
    easing: "smooth",
    from: {
      position: [2.55, 0.62, 3.05],
      target: [CAR_FOCUS[0] + 0.35, CAR_FOCUS[1] + 0.1, CAR_FOCUS[2] + 0.35],
      fov: 23,
      roll: 0.17,
    },
    to: {
      position: [2.1, 0.55, 2.7],
      target: [CAR_FOCUS[0] + 0.25, CAR_FOCUS[1] + 0.06, CAR_FOCUS[2] + 0.22],
      fov: 21,
      roll: 0.12,
    },
  },
  {
    id: "10-wheel-spoke-detail",
    duration: 1.7,
    easing: "linear",
    from: {
      position: [2.05, 0.24, 2.4],
      target: [CAR_FOCUS[0] + 0.46, CAR_FOCUS[1] - 0.06, CAR_FOCUS[2] + 0.16],
      fov: 20,
      roll: -0.28,
    },
    to: {
      position: [1.78, 0.18, 2.2],
      target: [CAR_FOCUS[0] + 0.4, CAR_FOCUS[1] - 0.04, CAR_FOCUS[2] + 0.1],
      fov: 18,
      roll: -0.22,
    },
  },
  {
    id: "11-roofline-rake",
    duration: 2.1,
    easing: "ease-out",
    from: {
      position: [-1.25, 1.28, 2.95],
      target: [CAR_FOCUS[0] - 0.2, CAR_FOCUS[1] + 0.35, CAR_FOCUS[2] + 0.2],
      fov: 22,
      roll: -0.2,
    },
    to: {
      position: [-1.05, 1.16, 2.65],
      target: [CAR_FOCUS[0] - 0.14, CAR_FOCUS[1] + 0.28, CAR_FOCUS[2] + 0.1],
      fov: 20,
      roll: -0.14,
    },
  },
  {
    id: "12-side-panel-finish",
    duration: 2,
    easing: "smooth",
    from: {
      position: [-2.15, 0.74, 3.05],
      target: [CAR_FOCUS[0] - 0.28, CAR_FOCUS[1] + 0.1, CAR_FOCUS[2] + 0.18],
      fov: 22,
      roll: 0.08,
    },
    to: {
      position: [-1.9, 0.66, 2.75],
      target: [CAR_FOCUS[0] - 0.2, CAR_FOCUS[1] + 0.06, CAR_FOCUS[2] + 0.1],
      fov: 20,
      roll: 0.04,
    },
  },
];

export const EDIT_SEQUENCE_DURATION_SEC = EDIT_CAMERA_SEQUENCE.reduce(
  (sum, shot) => sum + shot.duration,
  0,
);
