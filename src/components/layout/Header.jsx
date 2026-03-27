import { siteConfig } from '../../config/site';
import { useExperience } from '../../context/ExperienceContext';

export default function Header() {
  const { hasEntered, resetExperience } = useExperience();

  return (
    <header className="site-header">
      <div>
        <div className="brand-lockup">{siteConfig.brandName}</div>
        <div className="eyebrow">{siteConfig.tagline}</div>
      </div>
      <nav className="site-nav" aria-label="Primary navigation">
        <span className="nav-pill">Batch 1 Live</span>
        {hasEntered ? (
          <button type="button" className="ghost-button compact-button" onClick={resetExperience}>
            Replay Entry
          </button>
        ) : null}
      </nav>
    </header>
  );
}
