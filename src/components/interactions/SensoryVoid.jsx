import { useExperience } from '../../context/ExperienceContext';

export default function SensoryVoidOverlay() {
  const { setHasEntered, playSoftPulse } = useExperience();

  return (
    <div className="sensory-overlay">
      <p className="eyebrow">Stage 1 — Sensory Void</p>
      <h1>Pull the thread and reveal the showroom.</h1>
      <p>Start in darkness, break the fabric veil, and step into the main Betta Sarto gallery.</p>
      <button
        type="button"
        className="primary-button"
        onClick={() => {
          playSoftPulse(160, 0.2);
          setHasEntered(true);
        }}
      >
        Tear Through the Fabric
      </button>
    </div>
  );
}
