import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { physicsConfig } from '../../config/physics';
import { useExperience } from '../../context/ExperienceContext';
import { useInputManager } from '../../hooks/useInputManager';

const presets = {
  'sensory-void': { position: new THREE.Vector3(0, 0, 7), target: new THREE.Vector3(0, 0, 0) },
  gallery: { position: new THREE.Vector3(0, 2.2, 8.5), target: new THREE.Vector3(0, 1.3, 0) },
  vault: { position: new THREE.Vector3(0, 2.1, 7.6), target: new THREE.Vector3(0, 1.5, 0) },
  cloud: { position: new THREE.Vector3(0, 2.4, 6.8), target: new THREE.Vector3(0, 1.4, 0) },
  organic: { position: new THREE.Vector3(0, 2.4, 8.2), target: new THREE.Vector3(0, 1.4, 0) },
  urban: { position: new THREE.Vector3(0, 2.4, 8.2), target: new THREE.Vector3(0, 1.4, 0) },
  abstract: { position: new THREE.Vector3(0, 2.4, 8.2), target: new THREE.Vector3(0, 1.4, 0) },
  ar: { position: new THREE.Vector3(0, 1.9, 5.6), target: new THREE.Vector3(0, 1.1, 0) },
};

export default function CameraRig({ sceneKey, selectedProduct }) {
  const offsetRef = useRef(new THREE.Vector3());
  const { keys, pointer, isWindowFocused } = useInputManager();
  const { comfortSettings } = useExperience();

  const targetPreset = useMemo(() => {
    const base = presets[sceneKey] || presets.gallery;
    if (selectedProduct) {
      return {
        position: base.position.clone().add(new THREE.Vector3(1.2, 0.35, -1.8)),
        target: new THREE.Vector3(0, 1.35, 0),
      };
    }
    return base;
  }, [sceneKey, selectedProduct]);

  useFrame((state, delta) => {
    const { camera } = state;
    const speedPreset = physicsConfig[selectedProduct ? 'wind' : 'calm'];
    const moveSpeed = (keys.shift ? speedPreset.cameraSpeed * 1.25 : speedPreset.cameraSpeed) * (comfortSettings.reducedMotion ? 0.7 : 1);
    const direction = new THREE.Vector3(
      (keys.d ? 1 : 0) - (keys.a ? 1 : 0),
      0,
      (keys.s ? 1 : 0) - (keys.w ? 1 : 0),
    );

    if (isWindowFocused && direction.lengthSq() > 0 && !selectedProduct && sceneKey !== 'sensory-void' && sceneKey !== 'ar') {
      direction.normalize().multiplyScalar(moveSpeed * delta);
      offsetRef.current.add(direction);
      const bounds = physicsConfig.movementBounds[sceneKey] || physicsConfig.movementBounds.gallery;
      offsetRef.current.x = THREE.MathUtils.clamp(offsetRef.current.x, -bounds.x, bounds.x);
      offsetRef.current.z = THREE.MathUtils.clamp(offsetRef.current.z, -bounds.z, bounds.z);
    }

    const lookTarget = targetPreset.target.clone().add(offsetRef.current);
    lookTarget.x += pointer.x * comfortSettings.mouseSensitivity * 0.9;
    lookTarget.y += pointer.y * comfortSettings.mouseSensitivity * 0.4;
    const desiredPosition = targetPreset.position.clone().add(offsetRef.current);
    camera.position.lerp(desiredPosition, 1 - Math.exp(-delta * 2.2 * comfortSettings.cameraSmoothing));
    camera.lookAt(lookTarget);
  });

  return null;
}

CameraRig.propTypes = {
  sceneKey: PropTypes.string.isRequired,
  selectedProduct: PropTypes.object,
};
