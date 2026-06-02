import {
  Color,
  Material,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Object3D,
} from "three";

type PbrMaterial = MeshStandardMaterial | MeshPhysicalMaterial;

/** Lataria cinematográfica — sem linhas/brilho de contorno artificial */
export function enhanceCarMaterials(root: Object3D): void {
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
        tunePbrMaterial(material, child.name);
      }
    }
  });
}

function desaturateColor(color: Color, amount: number): void {
  const gray = color.r * 0.2126 + color.g * 0.7152 + color.b * 0.0722;
  color.r = gray + (color.r - gray) * amount;
  color.g = gray + (color.g - gray) * amount;
  color.b = gray + (color.b - gray) * amount;
}

/** Remove extensões GLTF que geram “filete” branco nas linhas da carroceria */
function stripGlossExtensions(material: MeshPhysicalMaterial): void {
  material.clearcoat = 0.18;
  material.clearcoatRoughness = 0.32;
  material.sheen = 0;
  material.sheenRoughness = 1;
  material.iridescence = 0;
  material.iridescenceIOR = 1;
  material.specularIntensity = 0.38;
  material.specularColor = new Color("#6e7684");
}

function isBrightTrimMaterial(name: string, material: PbrMaterial): boolean {
  const n = name.toLowerCase();
  if (
    /grille|light|badge|chrome|glass|window|calliper|wheel|emissive|manufacturer/i.test(
      n,
    )
  ) {
    return true;
  }
  const c = material.color;
  const lum = 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b;
  return lum > 0.55;
}

function isBodyPaintMaterial(meshName: string, material: PbrMaterial): boolean {
  const combined = `${meshName} ${material.name}`.toLowerCase();
  return /paint|body|colou?r|carroceria|lataria/i.test(combined);
}

function tunePbrMaterial(material: PbrMaterial, meshName: string): void {
  material.flatShading = false;

  if (material.normalMap) {
    material.normalScale.set(
      material.normalScale.x * 0.65,
      material.normalScale.y * 0.65,
    );
  }

  if (material instanceof MeshPhysicalMaterial) {
    stripGlossExtensions(material);
  }

  const trim = isBrightTrimMaterial(meshName, material);
  const bodyPaint = !trim && isBodyPaintMaterial(meshName, material);

  material.envMapIntensity = bodyPaint ? 0.28 : trim ? 0.4 : 0.35;

  if (material.map) {
    desaturateColor(material.color, bodyPaint ? 0.74 : 0.6);
    material.color.multiplyScalar(trim ? 0.76 : bodyPaint ? 0.64 : 0.7);
    material.metalness = trim
      ? Math.min(material.metalness ?? 0.5, 0.5)
      : bodyPaint
        ? 0.88
        : Math.min(Math.max(material.metalness ?? 0.4, 0.56), 0.76);
    material.roughness = trim
      ? Math.max(material.roughness ?? 0.35, 0.42)
      : bodyPaint
        ? 0.34
        : Math.max(material.roughness ?? 0.32, 0.3);
    material.emissive = trim ? new Color("#1a2030") : new Color("#050608");
    material.emissiveIntensity = trim && /light/i.test(meshName) ? 0.08 : 0;

    if (material instanceof MeshPhysicalMaterial && bodyPaint) {
      material.clearcoat = 0.22;
      material.clearcoatRoughness = 0.32;
    }
    return;
  }

  const base = material.color ?? new Color("#9ca3af");
  const luminance =
    0.2126 * base.r + 0.7152 * base.g + 0.0722 * base.b;

  if (luminance > 0.15 && !trim) {
    material.color = new Color("#06080c");
  }

  material.metalness = trim ? 0.42 : bodyPaint ? 0.82 : 0.72;
  material.roughness = trim ? 0.44 : bodyPaint ? 0.34 : 0.28;
  material.emissive = trim ? new Color("#1a2030") : new Color("#050608");
  material.emissiveIntensity = trim && /light/i.test(meshName) ? 0.08 : 0;
}

export function disposeMaterials(root: Object3D): void {
  root.traverse((child) => {
    if (!(child instanceof Mesh)) return;
    const materials = Array.isArray(child.material)
      ? child.material
      : [child.material];
    for (const mat of materials) {
      (mat as Material).dispose?.();
    }
  });
}
