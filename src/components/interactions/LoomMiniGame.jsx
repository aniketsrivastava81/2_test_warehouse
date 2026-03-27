import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { useExperience } from '../../context/ExperienceContext';

export default function LoomMiniGame({ product }) {
  const { setIsLoomOpen, markPuzzleSolved } = useExperience();
  const [tension, setTension] = useState(30);
  const [dragging, setDragging] = useState(false);
  const weaveCells = useMemo(() => Array.from({ length: 36 }, (_, index) => index), []);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') setIsLoomOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [setIsLoomOpen]);

  return (
    <div className="modal-shell">
      <div className="modal-card">
        <p className="eyebrow">Loom Mini-Game</p>
        <h2>Stress Test the Fabric</h2>
        <p>Drag across the weave to pull tension. Premium cotton should flex, resist, and settle back into shape.</p>
        <div
          className={`loom-surface ${dragging ? 'dragging' : ''}`}
          onPointerDown={() => setDragging(true)}
          onPointerUp={() => setDragging(false)}
          onPointerLeave={() => setDragging(false)}
          onPointerMove={(event) => {
            if (!dragging) return;
            const rect = event.currentTarget.getBoundingClientRect();
            const ratio = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
            setTension(Math.round(ratio * 100));
          }}
        >
          {weaveCells.map((cell) => <span key={cell} className="loom-cell" style={{ transform: `scaleY(${1 + tension / 180})` }} />)}
        </div>
        <input type="range" min="0" max="100" value={tension} onChange={(event) => setTension(Number(event.target.value))} />
        <div className="metrics-grid">
          <div><span>Tension</span><strong>{tension}%</strong></div>
          <div><span>Thread Count</span><strong>{product.threadCount}</strong></div>
          <div><span>Fabric Weight</span><strong>{product.fabricWeight}</strong></div>
        </div>
        <div className="modal-actions">
          <button type="button" className="ghost-button" onClick={() => setIsLoomOpen(false)}>Close</button>
          <button
            type="button"
            className="primary-button"
            onClick={() => {
              if (tension >= 42 && tension <= 68) {
                markPuzzleSolved(`loom-${product.id}`);
              }
              setIsLoomOpen(false);
            }}
          >
            Lock in the Weave
          </button>
        </div>
      </div>
    </div>
  );
}

LoomMiniGame.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    threadCount: PropTypes.number.isRequired,
    fabricWeight: PropTypes.string.isRequired,
  }).isRequired,
};
