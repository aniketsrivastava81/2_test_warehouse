import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Stars } from '@react-three/drei';
import { Suspense, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { cameraConfig } from '../../config/physics';
import CameraRig from './Camera';
import Lighting from './Lighting';
import PostProcessing from './PostProcessing';
import SensoryVoidScene from '../../scenes/SensoryVoid';
import MainGalleryScene from '../../scenes/MainGallery';

function PerformanceHud() {
  const [fps, setFps] = useState(60);

  useFrame((_, delta) => {
    setFps(Math.round(1 / Math.max(delta, 0.0001)));
  });

  if (!import.meta.env.DEV) return null;

  return (
    <Html position={[-3.4, 3.8, 0]}>
      <div className="fps-badge">{fps} FPS</div>
    </Html>
  );
}

function SceneSelector({ sceneKey }) {
  if (sceneKey === 'sensory-void') {
    return <SensoryVoidScene />;
  }

  return <MainGalleryScene showcaseOnly />;
}

export default function Canvas3D({ sceneKey }) {
  const background = useMemo(() => (sceneKey === 'sensory-void' ? '#000000' : '#05070d'), [sceneKey]);

  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      className="canvas-shell"
      camera={{
        position: sceneKey === 'sensory-void' ? [0, 0, 7.5] : [0, cameraConfig.headHeight, 6.8],
        fov: cameraConfig.fieldOfView,
        near: cameraConfig.near,
        far: cameraConfig.far,
      }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.shadowMap.enabled = true;
      }}
    >
      <color attach="background" args={[background]} />
      <fog attach="fog" args={[background, 12, 30]} />
      <Suspense fallback={null}>
        <CameraRig sceneKey={sceneKey} />
        <Lighting sceneKey={sceneKey} />
        <SceneSelector sceneKey={sceneKey} />
        {sceneKey !== 'sensory-void' ? <Stars radius={80} depth={20} count={500} factor={4} saturation={0} fade /> : null}
        <PerformanceHud />
        <PostProcessing sceneKey={sceneKey} />
      </Suspense>
    </Canvas>
  );
}

Canvas3D.propTypes = {
  sceneKey: PropTypes.string.isRequired,
};
