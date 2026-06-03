"use client";

import { useMemo } from "react";
import {
  BackSide,
  Color,
  NormalBlending,
  ShaderMaterial,
  type ShaderMaterial as ShaderMaterialType,
} from "three";

/** Espessura da camada atmosférica (visual fino) */
export const ATMOSPHERE_SCALE = 1.025;

const ATMOSPHERE_COLOR = new Color("#4a7ab8");
const PEAK_OPACITY = 0.25;
const EDGE_OPACITY = 0.05;
const FADE_START = 0.3;
/** Só aparece no limbo do planeta — evita faixa grossa */
const LIMB_INNER = 0.85;

const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uPeakOpacity;
  uniform float uEdgeOpacity;
  uniform float uFadeStart;
  uniform float uLimbInner;

  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  void main() {
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    vec3 n = normalize(vNormal);

    // 0 = centro do disco, 1 = borda
    float rim = 1.0 - abs(dot(n, viewDir));

    // Concentra no limbo — halo fino, não disco azul
    float shell = smoothstep(uLimbInner, 1.0, rim);
    shell = pow(shell, 1.5);

    if (shell <= 0.001) {
      discard;
    }

    float alpha = uEdgeOpacity;

    if (shell < uFadeStart) {
      float t = shell / uFadeStart;
      alpha = mix(uEdgeOpacity, uPeakOpacity, smoothstep(0.0, 1.0, t));
    } else {
      float t = (shell - uFadeStart) / (1.0 - uFadeStart);
      alpha = mix(uPeakOpacity, uEdgeOpacity, smoothstep(0.0, 1.0, t));
    }

    // Borda mais suave para simular dispersão atmosférica real
    alpha *= smoothstep(0.0, 0.15, shell);
    alpha *= 1.0 - smoothstep(0.95, 1.0, shell);

    gl_FragColor = vec4(uColor, alpha);
  }
`;

export function PlanetAtmosphere() {
  const material = useMemo(() => {
    return new ShaderMaterial({
      uniforms: {
        uColor: { value: ATMOSPHERE_COLOR },
        uPeakOpacity: { value: PEAK_OPACITY },
        uEdgeOpacity: { value: EDGE_OPACITY },
        uFadeStart: { value: FADE_START },
        uLimbInner: { value: LIMB_INNER },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      side: BackSide,
      blending: NormalBlending,
      depthWrite: false,
    });
  }, []);

  return (
    <mesh scale={ATMOSPHERE_SCALE} material={material} renderOrder={1}>
      <sphereGeometry args={[1, 64, 64]} />
    </mesh>
  );
}

export type PlanetAtmosphereMaterial = ShaderMaterialType;
