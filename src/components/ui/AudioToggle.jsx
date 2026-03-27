import { useExperience } from '../../context/ExperienceContext';

export default function AudioToggle() {
  const { audioEnabled, setAudioEnabled } = useExperience();

  return (
    <button type="button" className="ghost-button audio-toggle" onClick={() => setAudioEnabled((current) => !current)} aria-pressed={audioEnabled}>
      {audioEnabled ? 'Audio On' : 'Audio Off'}
    </button>
  );
}
