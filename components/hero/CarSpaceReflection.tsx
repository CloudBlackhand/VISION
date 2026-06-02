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
} from "three";
import { HERO_LAYER } from "@/lib/hero-layers";
import { useIsMobile } from "@/hooks/use-is-mobile";

type CarSpaceReflectionProps = {
  carRootRef: React.RefObject<Group | null>;
};

function isPaintMaterial(meshName: string, material: MeshStandardMaterial): boolean {
  const label = `${meshName} ${material.name}`.toLowerCase();
  return /paint|body|colou?r|carroceria|lataria|coloured/i.test(label);
}

function applyEnvToCar(
  root: Group,
  envMap: Texture,
  paintIntensity: number,
  defaultIntensity: number,
) {
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
        material.envMap = envMap;
        material.envMapIntensity = isPaintMaterial(child.name, material)
          ? paintIntensity
          : defaultIntensity;
        material.needsUpdate = true;
      }
    }
  });
}

/** Captura planeta/estrelas ao redor do carro e reflete na pintura (GLTF original) */
export function CarSpaceReflection({ carRootRef }: CarSpaceReflectionProps) {
  const { gl, scene } = useThree();
  const isMobile = useIsMobile();
  const tick = useRef(0);
  const envTexture = useRef<Texture | null>(null);

  const cubeSize = isMobile ? 256 : 512;
  const refreshInterval = isMobile ? 0.4 : 0.22;

  const { cubeTarget, cubeCamera, pmrem } = useMemo(() => {
    const target = new WebGLCubeRenderTarget(cubeSize);
    const camera = new CubeCamera(0.1, 300, target);
    camera.layers.set(HERO_LAYER.world);
    const generator = new PMREMGenerator(gl);
    generator.compileCubemapShader();
    return { cubeTarget: target, cubeCamera: camera, pmrem: generator };
  }, [gl, cubeSize]);

  useEffect(() => {
    return () => {
      pmrem.dispose();
      cubeTarget.dispose();
      envTexture.current?.dispose();
    };
  }, [pmrem, cubeTarget]);

  useFrame((_, delta) => {
    const carRoot = carRootRef.current;
    if (!carRoot) return;

    tick.current += delta;
    if (tick.current < refreshInterval) return;
    tick.current = 0;

    carRoot.getWorldPosition(cubeCamera.position);
    cubeCamera.update(gl, scene);

    envTexture.current?.dispose();
    const envMap = pmrem.fromCubemap(cubeTarget.texture).texture;
    envTexture.current = envMap;

    scene.environment = envMap;
    if ("environmentIntensity" in scene) {
      (scene as { environmentIntensity: number }).environmentIntensity = 1;
    }

    applyEnvToCar(
      carRoot,
      envMap,
      isMobile ? 1.1 : 1.45,
      isMobile ? 0.55 : 0.75,
    );
  });

  return null;
}
