"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  CubeCamera,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PMREMGenerator,
  WebGLCubeRenderTarget,
  type Group,
  type Texture,
  type WebGLRenderTarget,
} from "three";
import { HERO_LAYER } from "@/lib/hero-layers";
import { useIsMobile } from "@/hooks/use-is-mobile";

type CarSpaceReflectionProps = {
  carRootRef: React.RefObject<Group | null>;
  /** Recaptura cubemap quando o modelo muda */
  modelKey: string;
};

type CarMaterialSlot = {
  material: MeshStandardMaterial | MeshPhysicalMaterial;
  paint: boolean;
};

function isPaintMaterial(meshName: string, material: MeshStandardMaterial): boolean {
  const label = `${meshName} ${material.name}`.toLowerCase();
  return /paint|body|colou?r|carroceria|lataria|coloured/i.test(label);
}

function collectCarMaterials(root: Group): CarMaterialSlot[] {
  const slots: CarMaterialSlot[] = [];

  root.traverse((child) => {
    if (!(child instanceof Mesh)) return;

    const materials = Array.isArray(child.material)
      ? child.material
      : [child.material];

    for (const material of materials) {
      if (
        material instanceof MeshStandardMaterial ||
        material instanceof MeshPhysicalMaterial
      ) {
        slots.push({
          material,
          paint: isPaintMaterial(child.name, material),
        });
      }
    }
  });

  return slots;
}

function applyEnvToSlots(
  slots: CarMaterialSlot[],
  envMap: Texture,
  paintIntensity: number,
  defaultIntensity: number,
) {
  for (const { material, paint } of slots) {
    material.envMap = envMap;
    material.envMapIntensity = paint ? paintIntensity : defaultIntensity;
  }
}

/**
 * Cubemap capturado uma vez (planeta + estrelas) — evita re-render a cada frame
 * que causava travamentos na animação da câmera.
 */
export function CarSpaceReflection({
  carRootRef,
  modelKey,
}: CarSpaceReflectionProps) {
  const { gl, scene } = useThree();
  const isMobile = useIsMobile();

  const warmupFrames = useRef(0);
  const capturedForModel = useRef<string | null>(null);
  const materialSlots = useRef<CarMaterialSlot[]>([]);
  const pmremRt = useRef<WebGLRenderTarget | null>(null);
  const envTexture = useRef<Texture | null>(null);

  const cubeSize = isMobile ? 128 : 192;

  const { cubeTarget, cubeCamera, pmrem } = useMemo(() => {
    const target = new WebGLCubeRenderTarget(cubeSize);
    const camera = new CubeCamera(0.1, 300, target);
    camera.layers.set(HERO_LAYER.world);
    const generator = new PMREMGenerator(gl);
    generator.compileCubemapShader();
    return { cubeTarget: target, cubeCamera: camera, pmrem: generator };
  }, [gl, cubeSize]);

  useEffect(() => {
    capturedForModel.current = null;
    materialSlots.current = [];
    warmupFrames.current = 0;
  }, [modelKey]);

  useEffect(() => {
    return () => {
      pmrem.dispose();
      cubeTarget.dispose();
      pmremRt.current?.dispose();
      envTexture.current?.dispose();
    };
  }, [pmrem, cubeTarget]);

  useFrame(() => {
    if (capturedForModel.current === modelKey) return;
    if (document.visibilityState === "hidden") return;

    const carRoot = carRootRef.current;
    if (!carRoot) return;

    warmupFrames.current += 1;
    if (warmupFrames.current < 45) return;

    carRoot.getWorldPosition(cubeCamera.position);
    cubeCamera.update(gl, scene);

    pmremRt.current?.dispose();
    const rt = pmrem.fromCubemap(cubeTarget.texture);
    pmremRt.current = rt;

    envTexture.current?.dispose();
    const envMap = rt.texture;
    envTexture.current = envMap;

    scene.environment = envMap;

    if (materialSlots.current.length === 0) {
      materialSlots.current = collectCarMaterials(carRoot);
    }

    applyEnvToSlots(
      materialSlots.current,
      envMap,
      isMobile ? 1.2 : 1.62,
      isMobile ? 0.6 : 0.82,
    );

    capturedForModel.current = modelKey;
  });

  return null;
}
