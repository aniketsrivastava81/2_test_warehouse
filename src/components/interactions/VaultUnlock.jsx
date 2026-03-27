import { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useExperience } from '../../context/ExperienceContext';
import { physicsConfig } from '../../config/physics';
import { UNLOCK_STATES, canTransitionUnlock } from '../../utils/unlockState';

export default function VaultUnlock({ product }) {
  const { unlockProduct, setSelectedProductId, vaultInteractions, setVaultInteraction } = useExperience();
  const [method, setMethod] = useState('scan');
  const [unlockState, setUnlockState] = useState(UNLOCK_STATES.challengeVisible);
  const [progress, setProgress] = useState(0);
  const [code, setCode] = useState('');
  const [dialValue, setDialValue] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    setProgress(0);
    setCode('');
    setDialValue(0);
    setUnlockState(UNLOCK_STATES.challengeVisible);
  }, [product.id, method]);

  useEffect(() => () => window.clearInterval(intervalRef.current), []);

  const computedProgress = useMemo(() => {
    if (method === 'scan') return progress;
    if (method === 'dial') return (dialValue / 360) * 100;
    return code === '2026' ? 100 : 0;
  }, [method, progress, dialValue, code]);

  const isComplete = computedProgress >= 100;

  useEffect(() => {
    if (!isComplete || !canTransitionUnlock(unlockState, UNLOCK_STATES.unlocked)) return;
    setUnlockState(UNLOCK_STATES.unlocked);
    setVaultInteraction(product.id, { state: UNLOCK_STATES.unlocked, method });
  }, [computedProgress, isComplete, method, product.id, setVaultInteraction, unlockState]);

  useEffect(() => {
    if (unlockState !== UNLOCK_STATES.unlocked) return;
    const timer = window.setTimeout(() => {
      unlockProduct(product.id);
    }, 260);
    return () => window.clearTimeout(timer);
  }, [product.id, unlockProduct, unlockState]);

  const startScan = () => {
    if (!canTransitionUnlock(unlockState, UNLOCK_STATES.solving)) return;
    setUnlockState(UNLOCK_STATES.solving);
    window.clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      setProgress((current) => {
        const next = Math.min(current + 100 / (physicsConfig.vaultUnlockHoldMs / 120), 100);
        return next;
      });
    }, 120);
  };

  const stopScan = () => {
    window.clearInterval(intervalRef.current);
    if (progress < 100) setUnlockState(UNLOCK_STATES.challengeVisible);
  };

  return (
    <div className="modal-shell">
      <div className="modal-card unlock-card">
        <p className="eyebrow">Vault Unlock</p>
        <h2>{product.name}</h2>
        <div className="segmented-control">
          {['scan', 'dial', 'code'].map((item) => (
            <button key={item} type="button" className={item === method ? 'active' : ''} onClick={() => setMethod(item)}>
              {item}
            </button>
          ))}
        </div>

        {method === 'scan' ? (
          <button
            type="button"
            className="scan-area"
            onPointerDown={startScan}
            onPointerUp={stopScan}
            onPointerLeave={stopScan}
          >
            Hold the certificate beam steady for {physicsConfig.vaultUnlockHoldMs / 1000} seconds.
          </button>
        ) : null}

        {method === 'dial' ? (
          <div>
            <input type="range" min="0" max="360" step="10" value={dialValue} onChange={(event) => setDialValue(Number(event.target.value))} />
            <p>Rotate the dial clockwise to 360°.</p>
          </div>
        ) : null}

        {method === 'code' ? (
          <div>
            <input type="text" className="text-input" placeholder="Enter 4 digits" maxLength="4" value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, ''))} />
            <p>Hint: enter the current show year.</p>
          </div>
        ) : null}

        <div className="progress-row">
          <div className="progress-bar"><span style={{ width: `${computedProgress}%` }} /></div>
          <strong>{Math.round(computedProgress)}%</strong>
        </div>

        {vaultInteractions[product.id]?.state === UNLOCK_STATES.unlocked ? <p className="success-copy">Glass dissolved. Rare piece ready to claim.</p> : null}

        <div className="modal-actions">
          <button type="button" className="ghost-button" onClick={() => setSelectedProductId(null)}>Close</button>
          <button type="button" className="primary-button" disabled={!isComplete} onClick={() => unlockProduct(product.id)}>
            {isComplete ? 'Unlock Garment' : 'Complete Ritual'}
          </button>
        </div>
      </div>
    </div>
  );
}

VaultUnlock.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};
