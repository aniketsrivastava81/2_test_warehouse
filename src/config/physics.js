export const gravityPresets = {
  default: { x: 0, y: -9.81, z: 0 },
  wind: { x: 0, y: -2, z: 0 },
};

export const windForceMultipliers = {
  calm: { lift: 0.12, lateral: 0.08 },
  dramatic: { lift: 0.5, lateral: 0.2 },
};

export const fabricSimulation = {
  stiffness: 0.72,
  damping: 0.84,
  drag: 0.12,
  pulseAmplitude: 0.08,
  rippleStrength: 0.04,
};

export const cameraConfig = {
  fieldOfView: 75,
  near: 0.1,
  far: 1000,
  movementSpeed: 5,
  sprintMultiplier: 1.2,
  rotationSensitivity: 0.002,
  pitchClamp: Math.PI / 3.2,
  headHeight: 1.72,
};

export const movementBounds = {
  gallery: { minX: -6.5, maxX: 6.5, minZ: -6, maxZ: 6 },
  vault: { minX: -4.6, maxX: 4.6, minZ: -4.5, maxZ: 4.5 },
  cloud: { minX: -4.4, maxX: 4.4, minZ: -4.4, maxZ: 4.4 },
  organic: { minX: -6.2, maxX: 6.2, minZ: -6.2, maxZ: 6.2 },
  urban: { minX: -6.2, maxX: 6.2, minZ: -6.2, maxZ: 6.2 },
  abstract: { minX: -6.2, maxX: 6.2, minZ: -6.2, maxZ: 6.2 },
};

export const entryThreadPhysics = {
  segmentCount: 18,
  segmentDistance: 0.17,
  followLerp: 0.18,
  pulseSpeed: 2.35,
  revealDuration: 1.5,
};

export const physicsConfig = {
  gravityPresets,
  windForceMultipliers,
  fabricSimulation,
  cameraConfig,
  movementBounds,
  entryThreadPhysics,
  flashlightIntensity: 5,
  vaultUnlockHoldMs: 3000,
};
