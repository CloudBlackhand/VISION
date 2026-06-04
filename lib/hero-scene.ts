/**
 * Mundo fixo calibrado no Utility Pro (planeta, luz, auto-fit).
 * Câmera anima os planos em loop (cinematic-shots) — não muda no F5.
 * No refresh, só troca o modelo 3D do carro.
 */
/** Plano 01 — wide com Terra ainda visível, carro maior no quadro */
export const HERO_CAMERA = {
  position: [2, 4.2, 7.2] as [number, number, number],
  target: [0, 0.45, -1] as [number, number, number],
  fov: 38,
} as const;

/**
 * Terra no horizonte inferior — longe o bastante para o carro não cortar a esfera.
 * (centro ≈58u do origem, raio 36 → ~22u de folga na superfície)
 */
export const HERO_PLANET = {
  position: [0, -28, -44] as [number, number, number],
  /** Raio visual alvo (antes: esfera unitária × scale) */
  scale: 36,
  modelPath: "/models/world/scene.gltf",
} as const;

/** Carro flutua à frente do planeta, nunca dentro da esfera */
export const HERO_CAR_ANCHOR = {
  position: [0, 0.6, 0.5] as [number, number, number],
} as const;

/** Deriva zero-g do carro (eixos em rad/s) */
export const HERO_CAR_DRIFT = {
  pitchAmp: 0.12,
  pitchHz: 0.35,
  rollAmp: 0.09,
  rollHz: 0.28,
  yawSpeed: 0.11,
  bobAmp: 0.025,
  bobHz: 0.0007,
} as const;

/** Menor no quadro = mais espaço/planeta visível (estilo edit) */
export const HERO_MODEL_TARGET_SIZE = 2.05;

/** Influência do mouse no banner (parallax leve sobre a câmera cinematográfica) */
export const HERO_MOUSE_PARALLAX = {
  positionX: 0.55,
  positionY: 0.28,
  targetX: 0.15,
  targetY: 0.1,
  smooth: 0.08,
} as const;
