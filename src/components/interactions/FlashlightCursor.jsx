import { useEffect, useState } from 'react';
import { useExperience } from '../../context/ExperienceContext';

export default function FlashlightCursor() {
  const { flashlightEnabled, setFlashlightEnabled } = useExperience();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event) => setPosition({ x: event.clientX, y: event.clientY });
    const onKeyDown = (event) => {
      if (event.key.toLowerCase() === 'f') {
        setFlashlightEnabled((current) => !current);
      }
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [setFlashlightEnabled]);

  return (
    <>
      <button type="button" className="ghost-button flashlight-toggle" onClick={() => setFlashlightEnabled((current) => !current)}>
        {flashlightEnabled ? 'Flashlight On' : 'Flashlight Off'}
      </button>
      {flashlightEnabled ? <div className="flashlight-cursor" style={{ left: position.x, top: position.y }} aria-hidden="true" /> : null}
    </>
  );
}
