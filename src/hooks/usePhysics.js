import { useEffect, useMemo, useState } from 'react';
import { physicsConfig } from '../config/physics';

export function usePhysics(mode, paused = false) {
  const [isPaused, setIsPaused] = useState(paused);

  useEffect(() => {
    const handleVisibility = () => setIsPaused(document.hidden || paused);
    handleVisibility();
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('blur', handleVisibility);
    window.addEventListener('focus', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('blur', handleVisibility);
      window.removeEventListener('focus', handleVisibility);
    };
  }, [paused]);

  return useMemo(() => ({
    ...(physicsConfig[mode] || physicsConfig.calm),
    isPaused,
  }), [mode, isPaused]);
}
