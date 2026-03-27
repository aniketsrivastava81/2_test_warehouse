const isMobile = typeof navigator !== 'undefined' ? /android|iphone|ipad|ipod/i.test(navigator.userAgent) : false;

export const featureFlags = {
  arEnabled: true,
  advancedAudio: true,
  debugHud: import.meta.env.DEV,
  sceneHelpers: import.meta.env.DEV,
  lowSpecCloudFallback: isMobile,
  postProcessing: !isMobile,
  reducedParticles: isMobile,
};
