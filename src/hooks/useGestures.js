import { useEffect, useState } from 'react';

export function useGestures() {
  const [pointer, setPointer] = useState({ x: 0.5, y: 0.5 });
  const [keys, setKeys] = useState({});

  useEffect(() => {
    const onMove = (event) => {
      setPointer({
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight,
      });
    };
    const onKeyDown = (event) => setKeys((current) => ({ ...current, [event.key.toLowerCase()]: true }));
    const onKeyUp = (event) => setKeys((current) => ({ ...current, [event.key.toLowerCase()]: false }));

    window.addEventListener('pointermove', onMove);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  return { pointer, keys };
}
