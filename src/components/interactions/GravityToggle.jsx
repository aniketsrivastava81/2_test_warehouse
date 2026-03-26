import { useExperience } from '../../context/ExperienceContext';

export default function GravityToggle() {
  const { gravityMode, setGravityMode } = useExperience();

  return (
    <button type="button" className="ghost-button gravity-toggle" onClick={() => setGravityMode((current) => (current === 'calm' ? 'wind' : 'calm'))}>
      {gravityMode === 'calm' ? 'Wind Mode' : 'Drape Mode'}
    </button>
  );
}
