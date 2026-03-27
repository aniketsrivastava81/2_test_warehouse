import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function ControlsHUD({ sceneLabel, entryMode }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    const hideTimer = window.setTimeout(() => setVisible(false), 5000);

    const hideOnIntent = (event) => {
      const key = event.key?.toLowerCase?.();
      if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
        setVisible(false);
      }
      if (key === 'h') {
        setVisible((current) => !current);
      }
    };

    const handlePointer = () => setVisible(false);

    window.addEventListener('keydown', hideOnIntent);
    window.addEventListener('pointerdown', handlePointer);

    return () => {
      window.clearTimeout(hideTimer);
      window.removeEventListener('keydown', hideOnIntent);
      window.removeEventListener('pointerdown', handlePointer);
    };
  }, [sceneLabel]);

  if (!visible) return null;

  return (
    <aside className="controls-hud">
      <p className="eyebrow">Controls</p>
      <strong>{sceneLabel}</strong>
      <div className="controls-grid">
        {entryMode ? <span>Click the glowing thread to tear through the fabric veil.</span> : <span>W / A / S / D · move through the showroom</span>}
        {entryMode ? <span>Move your cursor · the thread responds in real time</span> : <span>Drag with mouse or touch · rotate the camera</span>}
        <span>H · toggle this help overlay</span>
      </div>
    </aside>
  );
}

ControlsHUD.propTypes = {
  sceneLabel: PropTypes.string.isRequired,
  entryMode: PropTypes.bool,
};

ControlsHUD.defaultProps = {
  entryMode: false,
};
