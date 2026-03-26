import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Sparkles, Stars } from '@react-three/drei';
import { Suspense, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useExperience } from '../../context/ExperienceContext';
import { featureFlags } from '../../config/features';
import CameraRig from './Camera';
import Lighting from './Lighting';
import PostProcessing from './PostProcessing';
import SensoryVoidScene from '../../scenes/SensoryVoid';
import MainGalleryScene from '../../scenes/MainGallery';
import VaultRoom from '../../scenes/VaultRoom';
import CottonCloud from '../../scenes/CottonCloud';
import OrganicOasis from '../../scenes/OrganicOasis';
import UrbanCanvas from '../../scenes/UrbanCanvas';
import AbstractDreamscape from '../../scenes/AbstractDreamscape';

function FpsHud() {
  const [fps, setFps] = useState(60);
  useFrame((_, delta) => {
    setFps(Math.round(1 / Math.max(delta, 0.0001)));
  });

  if (!featureFlags.debugHud) return null;
  return (
    <Html position={[-3.6, 4.2, 0]}>
      <div className="fps-badge">{fps} FPS</div>
    </Html>
  );
}

function SceneSelector({ sceneKey }) {
  switch (sceneKey) {
    case 'sensory-void':
      return <SensoryVoidScene />;
    case 'vault':
      return <VaultRoom />;
    case 'cloud':
      return <CottonCloud />;
    case 'organic':
      return <OrganicOasis />;
    case 'urban':
      return <UrbanCanvas />;
    case 'abstract':
      return <AbstractDreamscape />;
    case 'ar':
      return <MainGalleryScene showcaseOnly />;
    case 'gallery':
    default:
      return <MainGalleryScene />;
  }
}

export default function Canvas3D({ sceneKey }) {
  const { selectedProduct } = useExperience();
  const background = useMemo(() => (sceneKey === 'cloud' ? '#edf3ff' : sceneKey === 'organic' ? '#0d1a12' : sceneKey === 'urban' ? '#120b18' : '#05070d'), [sceneKey]);

  return (
    <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 2.2, 8], fov: 42 }} gl={{ antialias: true }} className="canvas-shell">
      <color attach="background" args={[background]} />
      <fog attach="fog" args={[background, 10, 24]} />
      <Suspense fallback={null}>
        <CameraRig sceneKey={sceneKey} selectedProduct={selectedProduct} />
        <Lighting sceneKey={sceneKey} />
        <SceneSelector sceneKey={sceneKey} />
        {sceneKey === 'cloud' ? <Sparkles count={featureFlags.reducedParticles ? 20 : 40} scale={12} size={2} speed={0.35} color="#ffffff" /> : null}
        <Stars radius={65} depth={18} count={featureFlags.reducedParticles ? 240 : sceneKey === 'cloud' ? 400 : 1200} factor={4} saturation={0} fade speed={0.8} />
        <FpsHud />
        <PostProcessing sceneKey={sceneKey} />
      </Suspense>
    </Canvas>
  );
}

Canvas3D.propTypes = {
  sceneKey: PropTypes.string.isRequired,
};
