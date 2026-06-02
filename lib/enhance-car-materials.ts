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
  material.specularIntensity = 0.55;
  material.specularColor = new Color("#a6adb8");
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
  material.envMapIntensity = 0.55;
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

  if (material.map) {
    desaturateColor(material.color, bodyPaint ? 0.78 : 0.64);
    material.color.multiplyScalar(trim ? 0.78 : bodyPaint ? 0.82 : 0.72);
    material.metalness = trim
      ? Math.min(material.metalness ?? 0.5, 0.5)
      : bodyPaint
        ? 0.88
        : Math.min(Math.max(material.metalness ?? 0.4, 0.56), 0.76);
    material.roughness = trim
      ? Math.max(material.roughness ?? 0.35, 0.42)
      : bodyPaint
        ? 0.2
        : Math.max(material.roughness ?? 0.32, 0.26);
    material.emissive = new Color("#080a10");
    material.emissiveIntensity = 0;

    if (material instanceof MeshPhysicalMaterial && bodyPaint) {
      material.clearcoat = 0.35;
      material.clearcoatRoughness = 0.22;
    }
    return;
  }

  const base = material.color ?? new Color("#9ca3af");
  const luminance =
    0.2126 * base.r + 0.7152 * base.g + 0.0722 * base.b;

  if (luminance > 0.15 && !trim) {
    material.color = new Color("#0a0c10");
  }

  material.metalness = trim ? 0.45 : bodyPaint ? 0.86 : 0.78;
  material.roughness = trim ? 0.42 : bodyPaint ? 0.22 : 0.24;
  material.emissive = new Color("#080a10");
  material.emissiveIntensity = 0;
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
