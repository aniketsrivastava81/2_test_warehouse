import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../config/routes';
import { siteConfig } from '../../config/site';

export default function Header() {
  return (
    <header className="site-header">
      <div>
        <div className="brand-lockup">{siteConfig.brandName}</div>
        <div className="eyebrow">{siteConfig.tagline}</div>
      </div>
      <nav className="site-nav" aria-label="Primary navigation">
        <NavLink className="nav-link" to={ROUTES.home}>Gallery</NavLink>
        <NavLink className="nav-link" to={ROUTES.vault}>Vault</NavLink>
        <NavLink className="nav-link" to={ROUTES.cloud}>Cotton Cloud</NavLink>
        <NavLink className="nav-link" to={ROUTES.ar}>AR Try-On</NavLink>
      </nav>
    </header>
  );
}
