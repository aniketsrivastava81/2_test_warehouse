import { useEffect, useState } from 'react';

export function useSceneTransition(sceneKey) {
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    setLoading(true);
    setFadeIn(true);

    const fadeTimer = window.setTimeout(() => setFadeIn(false), 80);
    const doneTimer = window.setTimeout(() => setLoading(false), 650);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
    };
  }, [sceneKey]);

  return { loading, fadeIn };
}
