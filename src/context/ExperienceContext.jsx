import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { products } from '../config/products';
import { APP_STATES, canTransition } from '../utils/appState';
import { useAudioManager } from '../hooks/useAudio';
import { getStoredValue, setStoredValue } from '../utils/storage';
import { trackEvent } from '../utils/analytics';

const ExperienceContext = createContext(null);

const defaultProgress = {
  exploredScenes: ['gallery'],
  solvedPuzzles: [],
  vaultUnlocked: [],
  rewardCodes: [],
  introDismissed: [],
};

const defaultComfort = {
  mouseSensitivity: 1,
  cameraSmoothing: 1,
  reducedMotion: false,
};

export function ExperienceProvider({ children }) {
  const [appState, setAppStateInternal] = useState(APP_STATES.loading);
  const [hasEntered, setHasEnteredState] = useState(() => getStoredValue('betta-has-entered', false));
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [flashlightEnabled, setFlashlightEnabled] = useState(false);
  const [gravityMode, setGravityMode] = useState('calm');
  const [isLoomOpen, setIsLoomOpen] = useState(false);
  const [cart, setCart] = useState(() => getStoredValue('betta-cart', []));
  const [unlockedProducts, setUnlockedProducts] = useState(() => getStoredValue('betta-unlocked-products', {}));
  const [progress, setProgress] = useState(() => getStoredValue('betta-progress', defaultProgress));
  const [vaultInteractions, setVaultInteractions] = useState(() => getStoredValue('betta-vault-interactions', {}));
  const [comfortSettings, setComfortSettings] = useState(() => getStoredValue('betta-comfort', defaultComfort));
  const { audioEnabled, setAudioEnabled, audioMessage, playSoftPulse, startAmbient, stopAmbient } = useAudioManager();

  useEffect(() => setStoredValue('betta-has-entered', hasEntered), [hasEntered]);
  useEffect(() => setStoredValue('betta-cart', cart), [cart]);
  useEffect(() => setStoredValue('betta-unlocked-products', unlockedProducts), [unlockedProducts]);
  useEffect(() => setStoredValue('betta-progress', progress), [progress]);
  useEffect(() => setStoredValue('betta-vault-interactions', vaultInteractions), [vaultInteractions]);
  useEffect(() => setStoredValue('betta-comfort', comfortSettings), [comfortSettings]);
  useEffect(() => {
    setAppStateInternal(hasEntered ? APP_STATES.gallery : APP_STATES.entry);
  }, [hasEntered]);

  const selectedProduct = useMemo(
    () => products.find((product) => product.id === selectedProductId) || null,
    [selectedProductId],
  );

  const setHasEntered = (value) => {
    setHasEnteredState(value);
    if (value) setAppStateInternal(APP_STATES.gallery);
  };

  const setAppState = (nextState) => {
    setAppStateInternal((current) => (canTransition(current, nextState) ? nextState : current));
  };

  const addToCart = (product) => {
    setCart((current) => [...current, { id: product.id, name: product.name, price: product.price }]);
    playSoftPulse(320);
    trackEvent('add_to_cart', { productId: product.id, price: product.price });
  };

  const unlockProduct = (productId) => {
    setUnlockedProducts((current) => ({ ...current, [productId]: true }));
    setProgress((current) => ({
      ...current,
      vaultUnlocked: Array.from(new Set([...current.vaultUnlocked, productId])),
    }));
    playSoftPulse(540, 0.15);
    trackEvent('vault_unlock', { productId });
  };

  const markSceneExplored = (sceneKey) => {
    if (!sceneKey || sceneKey === 'sensory-void') return;
    setProgress((current) => ({
      ...current,
      exploredScenes: Array.from(new Set([...current.exploredScenes, sceneKey])),
    }));
  };

  const markPuzzleSolved = (puzzleKey) => {
    setProgress((current) => ({
      ...current,
      solvedPuzzles: Array.from(new Set([...current.solvedPuzzles, puzzleKey])),
    }));
    trackEvent('puzzle_solved', { puzzleKey });
  };

  const dismissIntro = (introKey) => {
    setProgress((current) => ({
      ...current,
      introDismissed: Array.from(new Set([...(current.introDismissed || []), introKey])),
    }));
  };

  const updateComfortSetting = (key, value) => {
    setComfortSettings((current) => ({ ...current, [key]: value }));
    trackEvent('comfort_settings_change', { key, value });
  };

  const setVaultInteraction = (productId, payload) => {
    setVaultInteractions((current) => ({ ...current, [productId]: payload }));
  };

  const value = {
    appState,
    setAppState,
    hasEntered,
    setHasEntered,
    selectedProduct,
    setSelectedProductId,
    flashlightEnabled,
    setFlashlightEnabled,
    gravityMode,
    setGravityMode,
    isLoomOpen,
    setIsLoomOpen,
    cart,
    addToCart,
    unlockedProducts,
    unlockProduct,
    progress,
    markSceneExplored,
    markPuzzleSolved,
    dismissIntro,
    audioEnabled,
    setAudioEnabled,
    audioMessage,
    playSoftPulse,
    startAmbient,
    stopAmbient,
    vaultInteractions,
    setVaultInteraction,
    comfortSettings,
    updateComfortSetting,
  };

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>;
}

ExperienceProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useExperience() {
  const context = useContext(ExperienceContext);
  if (!context) {
    throw new Error('useExperience must be used within ExperienceProvider');
  }
  return context;
}
