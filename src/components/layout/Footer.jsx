import { siteConfig } from '../../config/site';

export default function Footer() {
  return (
    <footer className="site-footer">
      <span>{siteConfig.brandName} · Premium cotton spatial showroom</span>
      <span>{siteConfig.contactEmail}</span>
      <span>{siteConfig.supportPhone}</span>
    </footer>
  );
}
