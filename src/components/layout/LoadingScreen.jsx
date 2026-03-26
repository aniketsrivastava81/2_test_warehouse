import PropTypes from 'prop-types';

export default function LoadingScreen({ label }) {
  return (
    <div className="loading-screen" aria-live="polite">
      <div className="loading-card">
        <p className="eyebrow">Preparing Scene</p>
        <h2>{label}</h2>
        <div className="loading-pulse" />
      </div>
    </div>
  );
}

LoadingScreen.propTypes = {
  label: PropTypes.string.isRequired,
};
