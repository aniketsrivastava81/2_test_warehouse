import { useState } from 'react';
import { useExperience } from '../../context/ExperienceContext';
import { trackEvent } from '../../utils/analytics';

export default function LeadForm() {
  const { appState } = useExperience();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (appState === 'entry') return null;

  return (
    <div className="floating-info-panel lead-form-panel">
      <p className="eyebrow">VIP Access</p>
      <h3>Request the next drop.</h3>
      <input className="text-input" aria-label="Your name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" />
      <input className="text-input" aria-label="Email address" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" />
      <button
        type="button"
        className="primary-button"
        onClick={() => {
          const valid = Boolean(name && email);
          setSubmitted(valid);
          if (valid) trackEvent('lead_submit', { source: 'floating_panel' });
        }}
      >
        Request Access
      </button>
      {submitted ? <p className="success-copy">You are on the list for the next limited release.</p> : null}
    </div>
  );
}
