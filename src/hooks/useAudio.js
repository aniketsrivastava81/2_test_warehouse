import { useCallback, useEffect, useRef, useState } from 'react';
import { getStoredValue, setStoredValue } from '../utils/storage';

export function useAudioManager() {
  const [audioEnabled, setAudioEnabledState] = useState(() => getStoredValue('betta-audio-enabled', true));
  const [audioMessage, setAudioMessage] = useState('');
  const contextRef = useRef(null);
  const gainRef = useRef(null);
  const ambientOscillatorRef = useRef(null);

  useEffect(() => {
    setStoredValue('betta-audio-enabled', audioEnabled);
  }, [audioEnabled]);

  const ensureContext = useCallback(async () => {
    if (typeof window === 'undefined') return null;
    try {
      if (!contextRef.current) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) {
          setAudioMessage('Audio is not supported in this browser.');
          return null;
        }
        contextRef.current = new AudioContextClass();
      }
      if (contextRef.current.state === 'suspended') {
        await contextRef.current.resume();
      }
      return contextRef.current;
    } catch {
      setAudioMessage('Browser blocked autoplay. Sound will stay muted until interaction.');
      return null;
    }
  }, []);

  const setAudioEnabled = useCallback((nextValue) => {
    setAudioEnabledState(typeof nextValue === 'function' ? nextValue : Boolean(nextValue));
  }, []);

  const playSoftPulse = useCallback(async (frequency = 220, duration = 0.08) => {
    if (!audioEnabled) return;
    const context = await ensureContext();
    if (!context) return;

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    gain.gain.value = 0.0001;
    gain.gain.exponentialRampToValueAtTime(0.018, context.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + duration);
  }, [audioEnabled, ensureContext]);

  const startAmbient = useCallback(async (sceneKey = 'gallery') => {
    if (!audioEnabled) return;
    const context = await ensureContext();
    if (!context) return;
    if (!gainRef.current) {
      gainRef.current = context.createGain();
      gainRef.current.gain.value = 0.0001;
      gainRef.current.connect(context.destination);
    }
    if (!ambientOscillatorRef.current) {
      const oscillator = context.createOscillator();
      oscillator.type = sceneKey === 'cloud' ? 'triangle' : 'sine';
      oscillator.frequency.value = sceneKey === 'cloud' ? 128 : 92;
      oscillator.connect(gainRef.current);
      oscillator.start();
      ambientOscillatorRef.current = oscillator;
    }
    gainRef.current.gain.cancelScheduledValues(context.currentTime);
    gainRef.current.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.02);
    gainRef.current.gain.exponentialRampToValueAtTime(sceneKey === 'cloud' ? 0.012 : 0.008, context.currentTime + 0.4);
  }, [audioEnabled, ensureContext]);

  const stopAmbient = useCallback(async () => {
    const context = contextRef.current;
    if (!context || !gainRef.current) return;
    gainRef.current.gain.cancelScheduledValues(context.currentTime);
    gainRef.current.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.2);
  }, []);

  return {
    audioEnabled,
    setAudioEnabled,
    audioMessage,
    playSoftPulse,
    startAmbient,
    stopAmbient,
  };
}
