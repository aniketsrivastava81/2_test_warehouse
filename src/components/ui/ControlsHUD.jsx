import PropTypes from 'prop-types';

export default function ControlsHUD({ sceneLabel }) {
  return (
    <aside className="controls-hud">
      <p className="eyebrow">Controls</p>
      <strong>{sceneLabel}</strong>
      <div className="controls-grid">
        <span>W / A / S / D · drift through the space</span>
        <span>Move cursor · subtle look direction</span>
        <span>F · flashlight inspect mode</span>
        <span>Esc · close mini-games and panels</span>
      </div>
    </aside>
  );
}

ControlsHUD.propTypes = {
  sceneLabel: PropTypes.string.isRequired,
};
