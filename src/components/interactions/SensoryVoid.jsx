import { useEffect } from 'react';
import { siteConfig } from '../../config/site';
import { useExperience } from '../../context/ExperienceContext';

export default function SensoryVoidOverlay() {
  const { beginEntryReveal, entryReveal } = useExperience();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        beginEntryReveal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [beginEntryReveal]);

  return (
    <div className="sensory-overlay">
      <p className="eyebrow">Stage 1 — Sensory Void</p>
      <h1>Pull the thread. Reveal the showroom.</h1>
      <p>
        Enter {siteConfig.brandName} through darkness first. The thread responds to your movement,
        and one tear opens the gallery beyond it.
      </p>
      <button
        type="button"
        className="primary-button"
        onClick={() => beginEntryReveal()}
        disabled={entryReveal.active}
      >
        {entryReveal.active ? 'Revealing...' : 'Tear Through the Fabric'}
      </button>
    </div>
  );
}
