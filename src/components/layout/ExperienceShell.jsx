import { useEffect, useMemo } from 'react';
import Header from './Header';
import Footer from './Footer';
import MobileStickyCTA from './MobileStickyCTA';
import LoadingScreen from './LoadingScreen';
import Canvas3D from '../3d/Canvas3D';
import ControlsHUD from '../ui/ControlsHUD';
import SensoryVoidOverlay from '../interactions/SensoryVoid';
import { useExperience } from '../../context/ExperienceContext';
import { useSceneTransition } from '../../hooks/useSceneTransition';
import { trackEvent } from '../../utils/analytics';

export default function ExperienceShell() {
  const { hasEntered, startAmbient, stopAmbient } = useExperience();
  const sceneKey = hasEntered ? 'gallery' : 'sensory-void';
  const sceneLabel = hasEntered ? 'Stage 2 — Gallery Arrival' : 'Stage 1 — Sensory Void';
  const { loading, progress, fadeOpacity } = useSceneTransition(sceneKey);

  useEffect(() => {
    trackEvent('scene_view', { sceneKey });
    startAmbient(sceneKey);
    return () => {
      stopAmbient();
    };
  }, [sceneKey, startAmbient, stopAmbient]);

  const fadeStyle = useMemo(() => ({ opacity: fadeOpacity }), [fadeOpacity]);

  return (
    <div className="app-shell">
      <Header />
      <main className="experience-main">
        <Canvas3D sceneKey={sceneKey} />
        {loading ? <LoadingScreen label={sceneLabel} progress={progress} /> : null}
        <div className="scene-fade" style={fadeStyle} aria-hidden="true" />
        <ControlsHUD sceneLabel={sceneLabel} entryMode={!hasEntered} />
        {!hasEntered ? <SensoryVoidOverlay /> : null}
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  );
}
