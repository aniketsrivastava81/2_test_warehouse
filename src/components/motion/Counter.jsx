import React, { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';

export default function Counter({ value = 0, suffix = '' }) {
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const holder = { value: 0 };
    const instance = animate(holder, {
      value,
      duration: 1400,
      ease: 'outExpo',
      onUpdate: () => setDisplay(Math.round(holder.value)),
    });
    return () => instance.pause?.();
  }, [value]);

  return <>{display}{suffix}</>;
}
