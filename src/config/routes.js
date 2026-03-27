export const ROUTES = {
  home: '/',
  vault: '/vault',
  cloud: '/cotton-cloud',
  organic: '/journey/organic-oasis',
  urban: '/journey/urban-canvas',
  abstract: '/journey/abstract-dreamscape',
  ar: '/ar',
};

export const SCENES = {
  entry: 'sensory-void',
  gallery: 'gallery',
  vault: 'vault',
  cloud: 'cloud',
  organic: 'organic',
  urban: 'urban',
  abstract: 'abstract',
  ar: 'ar',
};

export const PORTAL_TARGETS = {
  organic: { route: ROUTES.organic, scene: SCENES.organic },
  urban: { route: ROUTES.urban, scene: SCENES.urban },
  abstract: { route: ROUTES.abstract, scene: SCENES.abstract },
  gallery: { route: ROUTES.home, scene: SCENES.gallery },
  vault: { route: ROUTES.vault, scene: SCENES.vault },
  cloud: { route: ROUTES.cloud, scene: SCENES.cloud },
  ar: { route: ROUTES.ar, scene: SCENES.ar },
};

export function getSceneMeta(pathname, hasEntered) {
  if (pathname === ROUTES.vault) return { key: SCENES.vault, label: 'Stage 4 — Vault Unlock' };
  if (pathname === ROUTES.cloud) return { key: SCENES.cloud, label: 'Stage 5 — Cotton Cloud' };
  if (pathname === ROUTES.organic) return { key: SCENES.organic, label: 'Stage 6 — Organic Oasis' };
  if (pathname === ROUTES.urban) return { key: SCENES.urban, label: 'Stage 6 — Urban Canvas' };
  if (pathname === ROUTES.abstract) return { key: SCENES.abstract, label: 'Stage 6 — Abstract Dreamscape' };
  if (pathname === ROUTES.ar) return { key: SCENES.ar, label: 'Stage 7 — AR Try-On' };
  return hasEntered ? { key: SCENES.gallery, label: 'Stage 2/3 — Main Gallery + Quality Play' } : { key: SCENES.entry, label: 'Stage 1 — Sensory Void' };
}
