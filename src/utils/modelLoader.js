export function getFallbackMaterial(product) {
  return {
    color: product?.colors?.[0] || '#d8ccbf',
    accent: product?.accentColor || product?.colors?.[1] || '#f5f4f0',
  };
}

export async function preloadModel(path) {
  if (!path) return null;
  return path;
}
