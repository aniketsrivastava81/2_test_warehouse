import PropTypes from 'prop-types';

export default function JourneyRewardPanel({ title, body }) {
  if (!title) return null;

  return (
    <aside className="floating-info-panel reward-panel" aria-live="polite">
      <p className="eyebrow">Reward Revealed</p>
      <h3>{title}</h3>
      <p>{body}</p>
    </aside>
  );
}

JourneyRewardPanel.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
};
