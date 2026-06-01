/** Modelos 3D da vitrine do banner — só troca o GLTF, mesma cena */
export type ShowcaseModel = {
  id: string;
  name: string;
  modelPath: string;
  /** Ajuste fino após auto-fit (1 = referência) */
  fitMultiplier?: number;
  rotation?: [number, number, number];
  position?: [number, number, number];
};

export const SHOWCASE_POOL: ShowcaseModel[] = [
  {
    id: "bmw-m2-g87",
    name: "BMW M2 G87",
    modelPath: "/models/cars/bmw-m2-g87/scene.gltf",
    fitMultiplier: 1,
    rotation: [0, Math.PI, 0],
  },
  {
    id: "bmw-m4-csl",
    name: "BMW M4 CSL",
    modelPath: "/models/cars/bmw-m4-csl/scene.gltf",
    fitMultiplier: 1,
    rotation: [0, Math.PI, 0],
  },
];

export function pickRandomShowcase(): ShowcaseModel {
  const index = Math.floor(Math.random() * SHOWCASE_POOL.length);
  return SHOWCASE_POOL[index]!;
}
