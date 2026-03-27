import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { cameraConfig, movementBounds } from '../../config/physics';

const presets = {
  'sensory-void': {
    position: new THREE.Vector3(0, 0, 7.5),
    yaw: 0,
    pitch: 0,
  },
  gallery: {
    position: new THREE.Vector3(0, cameraConfig.headHeight, 6.8),
    yaw: Math.PI,
    pitch: -0.02,
  },
};

function clampPosition(position, sceneKey) {
  const bounds = movementBounds[sceneKey] || movementBounds.gallery;
  position.x = THREE.MathUtils.clamp(position.x, bounds.minX, bounds.maxX);
  position.z = THREE.MathUtils.clamp(position.z, bounds.minZ, bounds.maxZ);
}

export default function CameraRig({ sceneKey }) {
  const positionRef = useRef(presets[sceneKey]?.position.clone() || presets.gallery.position.clone());
  const yawRef = useRef(presets[sceneKey]?.yaw ?? 0);
  const pitchRef = useRef(presets[sceneKey]?.pitch ?? 0);
  const keysRef = useRef({ w: false, a: false, s: false, d: false, shift: false });
  const dragStateRef = useRef({ active: false, x: 0, y: 0 });
  const touchIdentifierRef = useRef(null);

  const currentPreset = useMemo(() => presets[sceneKey] || presets.gallery, [sceneKey]);

  useEffect(() => {
    positionRef.current.copy(currentPreset.position);
    yawRef.current = currentPreset.yaw;
    pitchRef.current = currentPreset.pitch;
  }, [currentPreset]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();
      if (['w', 'a', 's', 'd', 'shift'].includes(key)) {
        keysRef.current[key] = true;
      }
    };

    const handleKeyUp = (event) => {
      const key = event.key.toLowerCase();
      if (['w', 'a', 's', 'd', 'shift'].includes(key)) {
        keysRef.current[key] = false;
      }
    };

    const handlePointerDown = (event) => {
      dragStateRef.current = { active: true, x: event.clientX, y: event.clientY };
    };

    const handlePointerMove = (event) => {
      if (!dragStateRef.current.active || sceneKey === 'sensory-void') return;
      const deltaX = event.clientX - dragStateRef.current.x;
      const deltaY = event.clientY - dragStateRef.current.y;
      dragStateRef.current.x = event.clientX;
      dragStateRef.current.y = event.clientY;
      yawRef.current -= deltaX * cameraConfig.rotationSensitivity;
      pitchRef.current = THREE.MathUtils.clamp(
        pitchRef.current - deltaY * cameraConfig.rotationSensitivity,
        -cameraConfig.pitchClamp,
        cameraConfig.pitchClamp,
      );
    };

    const handlePointerUp = () => {
      dragStateRef.current.active = false;
    };

    const handleTouchStart = (event) => {
      const touch = event.changedTouches[0];
      if (!touch) return;
      touchIdentifierRef.current = touch.identifier;
      dragStateRef.current = { active: true, x: touch.clientX, y: touch.clientY };
    };

    const handleTouchMove = (event) => {
      if (!dragStateRef.current.active || sceneKey === 'sensory-void') return;
      const touch = Array.from(event.changedTouches).find((entry) => entry.identifier === touchIdentifierRef.current);
      if (!touch) return;
      const deltaX = touch.clientX - dragStateRef.current.x;
      const deltaY = touch.clientY - dragStateRef.current.y;
      dragStateRef.current.x = touch.clientX;
      dragStateRef.current.y = touch.clientY;
      yawRef.current -= deltaX * cameraConfig.rotationSensitivity;
      pitchRef.current = THREE.MathUtils.clamp(
        pitchRef.current - deltaY * cameraConfig.rotationSensitivity,
        -cameraConfig.pitchClamp,
        cameraConfig.pitchClamp,
      );
    };

    const handleTouchEnd = () => {
      dragStateRef.current.active = false;
      touchIdentifierRef.current = null;
    };

    const resetInput = () => {
      keysRef.current = { w: false, a: false, s: false, d: false, shift: false };
      dragStateRef.current.active = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('blur', resetInput);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('blur', resetInput);
    };
  }, [sceneKey]);

  useFrame(({ camera }, delta) => {
    if (sceneKey === 'sensory-void') {
      camera.position.lerp(currentPreset.position, 1 - Math.exp(-delta * 4));
      camera.lookAt(0, 0, 0);
      return;
    }

    const keys = keysRef.current;
    const speed = cameraConfig.movementSpeed * (keys.shift ? cameraConfig.sprintMultiplier : 1);
    const moveVector = new THREE.Vector3();
    const forward = new THREE.Vector3(Math.sin(yawRef.current), 0, Math.cos(yawRef.current));
    const right = new THREE.Vector3(Math.cos(yawRef.current), 0, -Math.sin(yawRef.current));

    if (keys.w) moveVector.add(forward);
    if (keys.s) moveVector.sub(forward);
    if (keys.d) moveVector.add(right);
    if (keys.a) moveVector.sub(right);

    if (moveVector.lengthSq() > 0) {
      moveVector.normalize().multiplyScalar(speed * delta);
      positionRef.current.add(moveVector);
      clampPosition(positionRef.current, sceneKey);
    }

    camera.position.lerp(positionRef.current, 1 - Math.exp(-delta * 12));
    camera.rotation.order = 'YXZ';
    camera.rotation.y = yawRef.current;
    camera.rotation.x = pitchRef.current;
  });

  return null;
}

CameraRig.propTypes = {
  sceneKey: PropTypes.string.isRequired,
};
