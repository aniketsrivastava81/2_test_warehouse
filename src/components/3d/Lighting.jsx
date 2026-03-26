import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { useExperience } from '../../context/ExperienceContext';
import { physicsConfig } from '../../config/physics';

export default function Lighting({ sceneKey }) {
  const spotlightRef = useRef(null);
  const causticRef = useRef(null);
  const { camera } = useThree();
  const { flashlightEnabled } = useExperience();

  const palette = useMemo(() => ({
    ambient: sceneKey === 'vault' ? '#96a4ff' : sceneKey === 'cloud' ? '#ffffff' : '#d8def5',
    point: sceneKey === 'vault' ? '#6f8bff' : sceneKey === 'urban' ? '#ff4dd6' : '#f2ddc9',
  }), [sceneKey]);

  useFrame(({ clock, pointer }) => {
    if (flashlightEnabled && spotlightRef.current) {
      spotlightRef.current.position.x = THREE.MathUtils.lerp(spotlightRef.current.position.x, pointer.x * 6, 0.12);
      spotlightRef.current.position.y = THREE.MathUtils.lerp(spotlightRef.current.position.y, 2 + pointer.y * 2, 0.12);
      spotlightRef.current.target.position.set(pointer.x * 4, 1 + pointer.y * 2, camera.position.z - 6);
      spotlightRef.current.target.updateMatrixWorld();
    }
    if (causticRef.current && sceneKey === 'cloud') {
      causticRef.current.position.x = Math.sin(clock.getElapsedTime() * 0.4) * 2.2;
      causticRef.current.intensity = 0.9 + Math.sin(clock.getElapsedTime() * 0.6) * 0.18;
    }
  });

  return (
    <>
      <ambientLight intensity={sceneKey === 'vault' ? 0.24 : sceneKey === 'cloud' ? 0.9 : 0.46} color={palette.ambient} />
      <directionalLight position={[4, 8, 4]} intensity={sceneKey === 'vault' ? 1.4 : 1.95} castShadow color="#ffffff" shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <pointLight position={[-5, 2, -2]} intensity={1.3} color={palette.point} />
      <spotLight position={[0, 6, 0]} angle={0.32} penumbra={0.6} intensity={sceneKey === 'vault' ? 2.8 : 1.8} color="#fff7ec" castShadow />
      {sceneKey === 'cloud' ? <pointLight ref={causticRef} position={[0, 4, -1]} intensity={1} distance={14} color="#ffffff" /> : null}
      {flashlightEnabled ? <spotLight ref={spotlightRef} position={[0, 3, 4]} angle={0.24} penumbra={0.5} intensity={physicsConfig.flashlightIntensity} color="#ffffff" castShadow /> : null}
    </>
  );
}

Lighting.propTypes = {
  sceneKey: PropTypes.string.isRequired,
};
