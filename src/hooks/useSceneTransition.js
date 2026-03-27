import { useEffect, useState } from 'react';
import gsap from 'gsap';

export function useSceneTransition(sceneKey) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fadeOpacity, setFadeOpacity] = useState(1);

  useEffect(() => {
    setLoading(true);
    setProgress(0);
    setFadeOpacity(1);

    const tweenState = { progress: 0, fade: 1 };
    const timeline = gsap.timeline({
      defaults: { ease: 'power2.out' },
      onComplete: () => setLoading(false),
    });

    timeline
      .to(tweenState, {
        progress: 82,
        duration: 0.45,
        onUpdate: () => setProgress(Math.round(tweenState.progress)),
      })
      .to(tweenState, {
        progress: 100,
        duration: 0.28,
        onUpdate: () => setProgress(Math.round(tweenState.progress)),
      })
      .to(tweenState, {
        fade: 0,
        duration: 0.35,
        onUpdate: () => setFadeOpacity(tweenState.fade),
      });

    return () => {
      timeline.kill();
    };
  }, [sceneKey]);

  return { loading, progress, fadeOpacity };
}
