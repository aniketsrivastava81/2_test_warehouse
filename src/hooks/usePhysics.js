import { useMemo } from 'react';
import {
  cameraConfig,
  entryThreadPhysics,
  fabricSimulation,
  gravityPresets,
  movementBounds,
  windForceMultipliers,
} from '../config/physics';

export function usePhysics(mode = 'default', sceneKey = 'gallery') {
  return useMemo(() => ({
    gravity: gravityPresets[mode] || gravityPresets.default,
    wind: mode === 'wind' ? windForceMultipliers.dramatic : windForceMultipliers.calm,
    fabric: fabricSimulation,
    camera: cameraConfig,
    thread: entryThreadPhysics,
    bounds: movementBounds[sceneKey] || movementBounds.gallery,
  }), [mode, sceneKey]);
}
