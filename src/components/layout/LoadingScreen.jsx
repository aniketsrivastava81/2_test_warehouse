import PropTypes from 'prop-types';

export default function LoadingScreen({ label, progress }) {
  return (
    <div className="loading-screen" aria-live="polite" role="status">
      <div className="loading-card">
        <p className="eyebrow">Loading the experience...</p>
        <h2>{label}</h2>
        <div className="loading-track" aria-hidden="true">
          <div className="loading-bar" style={{ width: `${progress}%` }} />
        </div>
        <p className="loading-copy">{progress}% complete</p>
      </div>
    </div>
  );
}

LoadingScreen.propTypes = {
  label: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
};
