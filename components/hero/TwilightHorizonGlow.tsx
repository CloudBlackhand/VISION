"use client";

import { useMemo } from "react";
import { AdditiveBlending, BackSide, ShaderMaterial } from "three";

/** Brilho de horizonte quase invisível — evita céu laranja */
export function TwilightHorizonGlow() {
  const material = useMemo(() => {
    return new ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: BackSide,
      blending: AdditiveBlending,
      uniforms: {
        uColor: { value: [0.14, 0.2, 0.34] },
        uStrength: { value: 0.16 },
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPos.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uStrength;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition).y;
          float glow = smoothstep(0.02, -0.28, h);
          float fade = glow * uStrength;
          gl_FragColor = vec4(uColor * fade, fade);
        }
      `,
    });
  }, []);

  return (
    <mesh scale={155} frustumCulled={false} material={material}>
      <sphereGeometry args={[1, 48, 48]} />
    </mesh>
  );
}
