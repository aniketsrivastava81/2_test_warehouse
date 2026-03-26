import { useExperience } from '../../context/ExperienceContext';

export default function ComfortSettings() {
  const { comfortSettings, updateComfortSetting } = useExperience();

  return (
    <aside className="floating-info-panel comfort-panel" aria-label="Comfort settings">
      <p className="eyebrow">Comfort</p>
      <h3>Motion & control tuning</h3>
      <label className="settings-row">
        <span>Mouse sensitivity</span>
        <input type="range" min="0.4" max="1.8" step="0.1" value={comfortSettings.mouseSensitivity} onChange={(event) => updateComfortSetting('mouseSensitivity', Number(event.target.value))} />
      </label>
      <label className="settings-row">
        <span>Camera smoothing</span>
        <input type="range" min="0.3" max="2" step="0.1" value={comfortSettings.cameraSmoothing} onChange={(event) => updateComfortSetting('cameraSmoothing', Number(event.target.value))} />
      </label>
      <label className="settings-inline">
        <input type="checkbox" checked={comfortSettings.reducedMotion} onChange={(event) => updateComfortSetting('reducedMotion', event.target.checked)} />
        <span>Reduced motion</span>
      </label>
    </aside>
  );
}
