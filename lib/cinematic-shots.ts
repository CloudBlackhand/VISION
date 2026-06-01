/**
 * Planos do edit VISION — só dolly/push estáticos (sem órbita ao redor do carro).
 * Referência: https://www.youtube.com/watch?v=2wQp9LlExP8
 */
import { HERO_CAR_ANCHOR, HERO_PLANET } from "./hero-scene";

export const PLANET_LOOK_TARGET: [number, number, number] = [
  HERO_PLANET.position[0],
  HERO_PLANET.position[1] - 1.2,
  HERO_PLANET.position[2],
];

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
      position: [2.6, 4.8, 8.5],
      target: [CAR_FOCUS[0], CAR_FOCUS[1] - 0.15, CAR_FOCUS[2] - 3],
      fov: 42,
      roll: -0.32,
    },
    to: {
      position: [2, 4.2, 7.2],
      target: [CAR_FOCUS[0], CAR_FOCUS[1], CAR_FOCUS[2] - 1.5],
      fov: 38,
      roll: -0.26,
    },
  },
  {
    id: "02-void-rear-low",
    duration: 3.07,
    easing: "smooth",
    from: {
      position: [-5.5, 0.45, 7.5],
      target: CAR_FOCUS,
      fov: 34,
      roll: -0.18,
    },
    to: {
      position: [-4.2, 0.38, 6.2],
      target: CAR_FOCUS,
      fov: 30,
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
      position: [7.2, 0.55, 9.5],
      target: CAR_FOCUS,
      fov: 38,
      roll: 0.12,
    },
    to: {
      position: [5.8, 0.42, 7.8],
      target: CAR_FOCUS,
      fov: 34,
      roll: 0.08,
    },
  },
  {
    id: "05-void-rear-glow",
    duration: 3.07,
    easing: "smooth",
    from: {
      position: [0.5, 0.35, 8],
      target: CAR_FOCUS,
      fov: 32,
      roll: 0,
    },
    to: {
      position: [1.2, 0.32, 6.5],
      target: CAR_FOCUS,
      fov: 28,
      roll: 0.05,
    },
  },
  {
    id: "06-earth-hero-low",
    duration: 1.5,
    easing: "linear",
    from: {
      position: [6.5, 0.35, 7],
      target: CAR_FOCUS,
      fov: 36,
      roll: 0.15,
    },
    to: {
      position: [5.5, 0.3, 6],
      target: CAR_FOCUS,
      fov: 34,
      roll: 0.12,
    },
  },
  {
    id: "07-wheel-macro-pass",
    duration: 2.97,
    easing: "linear",
    from: {
      position: [6.8, 0.22, 5.8],
      target: CAR_FOCUS,
      fov: 30,
      roll: 0.08,
    },
    to: {
      position: [4.5, 0.18, 3.8],
      target: CAR_FOCUS,
      fov: 26,
      roll: 0.05,
    },
  },
  {
    id: "08-wide-planet-hero",
    duration: 4.9,
    easing: "ease-out",
    from: {
      position: [1.8, 4, 9.5],
      target: [CAR_FOCUS[0], CAR_FOCUS[1], CAR_FOCUS[2] - 2],
      fov: 40,
      roll: -0.2,
    },
    to: {
      position: [1.2, 3.5, 8],
      target: CAR_FOCUS,
      fov: 36,
      roll: -0.16,
    },
  },
  {
    id: "09-hood-detail-fast",
    duration: 1.5,
    easing: "linear",
    from: {
      position: [4.5, 1.2, 5.5],
      target: [CAR_FOCUS[0], CAR_FOCUS[1] + 0.5, CAR_FOCUS[2] + 0.5],
      fov: 28,
      roll: 0.2,
    },
    to: {
      position: [3.8, 1.05, 4.8],
      target: [CAR_FOCUS[0], CAR_FOCUS[1] + 0.45, CAR_FOCUS[2] + 0.4],
      fov: 26,
      roll: 0.18,
    },
  },
  {
    id: "10-under-rear-rise",
    duration: 2.97,
    easing: "ease-in",
    from: {
      position: [-2.5, -0.15, 7],
      target: [CAR_FOCUS[0], CAR_FOCUS[1] + 0.75, CAR_FOCUS[2]],
      fov: 36,
      roll: -0.25,
    },
    to: {
      position: [-1.5, 0.15, 5.5],
      target: [CAR_FOCUS[0], CAR_FOCUS[1] + 0.6, CAR_FOCUS[2]],
      fov: 32,
      roll: -0.2,
    },
  },
  {
    id: "11-silhouette-earth",
    duration: 2.87,
    easing: "smooth",
    from: {
      position: [-6, 1.8, 9],
      target: PLANET_LOOK_TARGET,
      fov: 46,
      roll: -0.15,
    },
    to: {
      position: [-4.5, 1.5, 7.5],
      target: [2, -2, -20],
      fov: 42,
      roll: -0.1,
    },
  },
  {
    id: "12-front-push-fast",
    duration: 1.5,
    easing: "ease-in",
    from: {
      position: [5.5, 0.75, 8.5],
      target: [CAR_FOCUS[0], CAR_FOCUS[1] + 0.25, CAR_FOCUS[2] + 0.8],
      fov: 34,
      roll: 0.05,
    },
    to: {
      position: [4.2, 0.65, 7],
      target: [CAR_FOCUS[0], CAR_FOCUS[1] + 0.2, CAR_FOCUS[2] + 0.6],
      fov: 30,
      roll: 0.03,
    },
  },
  {
    id: "13-pullback-exit",
    duration: 2.97,
    easing: "ease-out",
    from: {
      position: [4, 4.5, 15],
      target: CAR_FOCUS,
      fov: 48,
      roll: -0.22,
    },
    to: {
      position: [5.5, 5.2, 18],
      target: [0, -0.3, -4],
      fov: 52,
      roll: -0.28,
    },
  },
];

export const EDIT_SEQUENCE_DURATION_SEC = EDIT_CAMERA_SEQUENCE.reduce(
  (sum, shot) => sum + shot.duration,
  0,
);
