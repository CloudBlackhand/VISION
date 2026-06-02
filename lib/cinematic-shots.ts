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
    id: "01-earth-wide-high",
    duration: 5.33,
    easing: "ease-out",
    from: {
      position: [1.4, 2.8, 5.4],
      target: [CAR_FOCUS[0], CAR_FOCUS[1], CAR_FOCUS[2] - 1.3],
      fov: 31,
      roll: -0.32,
    },
    to: {
      position: [1.05, 2.4, 4.8],
      target: CAR_FOCUS,
      fov: 28,
      roll: -0.26,
    },
  },
  {
    id: "02-void-rear-low",
    duration: 3.07,
    easing: "smooth",
    from: {
      position: [-4.5, 0.4, 6.2],
      target: CAR_FOCUS,
      fov: 31,
      roll: -0.18,
    },
    to: {
      position: [-3.4, 0.34, 5.1],
      target: CAR_FOCUS,
      fov: 28,
      roll: -0.12,
    },
  },
  {
    id: "03-wing-macro-dutch",
    duration: 1.5,
    easing: "linear",
    from: {
      position: [3.8, 1.1, 4.2],
      target: CAR_FOCUS,
      fov: 28,
      roll: -0.52,
    },
    to: {
      position: [3.2, 0.95, 3.6],
      target: CAR_FOCUS,
      fov: 26,
      roll: -0.48,
    },
  },
  {
    id: "04-front-quarter-earth",
    duration: 2.97,
    easing: "ease-in",
    from: {
      position: [5, 0.45, 6.6],
      target: CAR_FOCUS,
      fov: 31,
      roll: 0.12,
    },
    to: {
      position: [4.1, 0.35, 5.4],
      target: CAR_FOCUS,
      fov: 28,
      roll: 0.08,
    },
  },
  {
    id: "05-void-rear-glow",
    duration: 3.07,
    easing: "smooth",
    from: {
      position: [0.45, 0.3, 6.7],
      target: CAR_FOCUS,
      fov: 30,
      roll: 0,
    },
    to: {
      position: [1, 0.28, 5.5],
      target: CAR_FOCUS,
      fov: 26,
      roll: 0.05,
    },
  },
  {
    id: "06-earth-hero-low",
    duration: 1.5,
    easing: "linear",
    from: {
      position: [5.2, 0.3, 5.9],
      target: CAR_FOCUS,
      fov: 32,
      roll: 0.15,
    },
    to: {
      position: [4.5, 0.26, 5.1],
      target: CAR_FOCUS,
      fov: 30,
      roll: 0.12,
    },
  },
  {
    id: "07-wheel-macro-pass",
    duration: 2.97,
    easing: "linear",
    from: {
      position: [5.6, 0.2, 5],
      target: CAR_FOCUS,
      fov: 28,
      roll: 0.08,
    },
    to: {
      position: [3.9, 0.16, 3.4],
      target: CAR_FOCUS,
      fov: 24,
      roll: 0.05,
    },
  },
  {
    id: "08-wide-planet-hero",
    duration: 4.9,
    easing: "ease-out",
    from: {
      position: [1.1, 2.3, 5.3],
      target: [CAR_FOCUS[0], CAR_FOCUS[1], CAR_FOCUS[2] - 0.7],
      fov: 30,
      roll: -0.2,
    },
    to: {
      position: [0.85, 1.9, 4.6],
      target: CAR_FOCUS,
      fov: 27,
      roll: -0.16,
    },
  },
  {
    id: "09-hood-detail-fast",
    duration: 1.5,
    easing: "linear",
    from: {
      position: [3.9, 1.05, 4.8],
      target: [CAR_FOCUS[0], CAR_FOCUS[1] + 0.5, CAR_FOCUS[2] + 0.5],
      fov: 26,
      roll: 0.2,
    },
    to: {
      position: [3.3, 0.92, 4.2],
      target: [CAR_FOCUS[0], CAR_FOCUS[1] + 0.45, CAR_FOCUS[2] + 0.4],
      fov: 24,
      roll: 0.18,
    },
  },
  {
    id: "10-under-rear-rise",
    duration: 2.97,
    easing: "ease-in",
    from: {
      position: [-2.1, -0.12, 6],
      target: [CAR_FOCUS[0], CAR_FOCUS[1] + 0.75, CAR_FOCUS[2]],
      fov: 32,
      roll: -0.25,
    },
    to: {
      position: [-1.25, 0.12, 4.8],
      target: [CAR_FOCUS[0], CAR_FOCUS[1] + 0.6, CAR_FOCUS[2]],
      fov: 29,
      roll: -0.2,
    },
  },
  {
    id: "11-silhouette-earth",
    duration: 2.87,
    easing: "smooth",
    from: {
      position: [-4, 0.95, 5.3],
      target: [CAR_FOCUS[0], CAR_FOCUS[1] + 0.2, CAR_FOCUS[2] - 0.8],
      fov: 31,
      roll: -0.15,
    },
    to: {
      position: [-3.3, 0.82, 4.5],
      target: [CAR_FOCUS[0], CAR_FOCUS[1] + 0.15, CAR_FOCUS[2] - 0.3],
      fov: 28,
      roll: -0.1,
    },
  },
  {
    id: "12-front-push-fast",
    duration: 1.5,
    easing: "ease-in",
    from: {
      position: [4.6, 0.62, 6.8],
      target: [CAR_FOCUS[0], CAR_FOCUS[1] + 0.25, CAR_FOCUS[2] + 0.8],
      fov: 30,
      roll: 0.05,
    },
    to: {
      position: [3.6, 0.56, 5.8],
      target: [CAR_FOCUS[0], CAR_FOCUS[1] + 0.2, CAR_FOCUS[2] + 0.6],
      fov: 27,
      roll: 0.03,
    },
  },
  {
    id: "13-pullback-exit",
    duration: 2.97,
    easing: "ease-out",
    from: {
      position: [2.7, 2.05, 5.2],
      target: CAR_FOCUS,
      fov: 31,
      roll: -0.22,
    },
    to: {
      position: [3.1, 2.3, 5.9],
      target: [CAR_FOCUS[0], CAR_FOCUS[1], CAR_FOCUS[2] - 0.6],
      fov: 33,
      roll: -0.28,
    },
  },
];

export const EDIT_SEQUENCE_DURATION_SEC = EDIT_CAMERA_SEQUENCE.reduce(
  (sum, shot) => sum + shot.duration,
  0,
);
