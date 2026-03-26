import { useEffect, useMemo, useState } from 'react';

const defaultKeys = { w: false, a: false, s: false, d: false, shift: false };

export function useInputManager() {
  const [keys, setKeys] = useState(defaultKeys);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [isWindowFocused, setIsWindowFocused] = useState(true);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();
      if (!['w', 'a', 's', 'd', 'shift'].includes(key)) return;
      setKeys((current) => ({ ...current, [key]: true }));
    };
    const handleKeyUp = (event) => {
      const key = event.key.toLowerCase();
      if (!['w', 'a', 's', 'd', 'shift'].includes(key)) return;
      setKeys((current) => ({ ...current, [key]: false }));
    };
    const handleMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -((event.clientY / window.innerHeight) * 2 - 1);
      setPointer({ x, y });
    };
    const handleBlur = () => {
      setIsWindowFocused(false);
      setKeys(defaultKeys);
    };
    const handleFocus = () => setIsWindowFocused(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('pointermove', handleMove);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  return useMemo(() => ({ keys, pointer, isWindowFocused }), [keys, pointer, isWindowFocused]);
}
