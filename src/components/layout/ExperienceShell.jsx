import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MobileStickyCTA from './MobileStickyCTA';
import LoadingScreen from './LoadingScreen';
import Canvas3D from '../3d/Canvas3D';
import ProductOverlay from '../ui/ProductOverlay';
import ProgressMap from '../ui/ProgressMap';
import ControlsHUD from '../ui/ControlsHUD';
import AudioToggle from '../ui/AudioToggle';
import JourneyRewardPanel from '../ui/JourneyRewardPanel';
import GravityToggle from '../interactions/GravityToggle';
import FlashlightCursor from '../interactions/FlashlightCursor';
import SensoryVoidOverlay from '../interactions/SensoryVoid';
import VaultUnlock from '../interactions/VaultUnlock';
import LoomMiniGame from '../interactions/LoomMiniGame';
import CottonCloudPanel from '../interactions/CottonCloud';
import LeadForm from '../forms/LeadForm';
import ARTryOnLauncher from '../forms/ARTryOnLauncher';
import ComfortSettings from '../ui/ComfortSettings';
import { useExperience } from '../../context/ExperienceContext';
import { useSceneTransition } from '../../hooks/useSceneTransition';
import { trackEvent } from '../../utils/analytics';
import { getSceneMeta } from '../../config/routes';
import { progressionConfig } from '../../config/progression';

export default function ExperienceShell() {
  const location = useLocation();
  const {
    hasEntered,
    selectedProduct,
    unlockedProducts,
    isLoomOpen,
    progress,
    markSceneExplored,
    startAmbient,
    stopAmbient,
  } = useExperience();

  const sceneMeta = useMemo(() => getSceneMeta(location.pathname, hasEntered), [location.pathname, hasEntered]);
  const { loading, fadeIn } = useSceneTransition(sceneMeta.key);

  useEffect(() => {
    markSceneExplored(sceneMeta.key);
    trackEvent('scene_view', { sceneKey: sceneMeta.key, path: location.pathname });
    startAmbient(sceneMeta.key);
    return () => {
      stopAmbient();
    };
  }, [location.pathname, markSceneExplored, sceneMeta.key, startAmbient, stopAmbient]);

  const rewardMessage = useMemo(() => {
    if (progress.solvedPuzzles.includes('organic-oasis')) {
      return { title: 'Organic Oasis', body: `You found every hidden flower. Discount code: ${progressionConfig.rewards['organic-oasis']}.` };
    }
    if (progress.solvedPuzzles.includes('urban-canvas')) {
      return { title: 'Urban Canvas', body: `The graffiti alignment is complete. Reward code: ${progressionConfig.rewards['urban-canvas']}.` };
    }
    if (progress.solvedPuzzles.includes('abstract-dreamscape')) {
      return { title: 'Abstract Dreamscape', body: `You solved the floating pattern. Reward code: ${progressionConfig.rewards['abstract-dreamscape']}.` };
    }
    if (progress.solvedPuzzles.includes('scavenger')) {
      return { title: 'AR Scavenger Hunt', body: `You matched all three palette tones. Reward code: ${progressionConfig.rewards.scavenger}.` };
    }
    return { title: '', body: '' };
  }, [progress.solvedPuzzles]);

  return (
    <div className="app-shell">
      <Header />
      <main className="experience-main">
        <Canvas3D sceneKey={sceneMeta.key} />
        {loading ? <LoadingScreen label={sceneMeta.label} /> : null}
        {fadeIn ? <div className="scene-fade active" /> : null}
        <ControlsHUD sceneLabel={sceneMeta.label} />
        <ProgressMap />
        <ComfortSettings />
        <GravityToggle />
        <AudioToggle />
        <FlashlightCursor />
        {location.pathname === '/' && !hasEntered ? <SensoryVoidOverlay /> : null}
        {selectedProduct ? <ProductOverlay /> : null}
        {selectedProduct && selectedProduct.vaultLocked && !unlockedProducts[selectedProduct.id] && location.pathname === '/vault' ? <VaultUnlock product={selectedProduct} /> : null}
        {isLoomOpen && selectedProduct ? <LoomMiniGame product={selectedProduct} /> : null}
        {sceneMeta.key === 'cloud' ? <CottonCloudPanel /> : null}
        {sceneMeta.key === 'ar' ? <ARTryOnLauncher /> : null}
        <LeadForm />
        <JourneyRewardPanel title={rewardMessage.title} body={rewardMessage.body} />
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  );
}
