export const siteConfig = {
  brandName: 'Betta Sarto',
  tagline: 'Premium cotton, reimagined as a spatial gallery.',
  productionUrl: import.meta.env.VITE_SITE_URL || 'http://localhost:5173',
  contactEmail: 'atelier@bettasarto.com',
  collections: ['Core', 'Esclusivo', 'Rare'],
  vaultCollections: ['Esclusivo', 'Rare'],
  socialHashtag: '#BettaSartoFit',
  supportPhone: '+1 (416) 555-0188',
  defaultMetadata: {
    title: 'Betta Sarto — 3D Interactive T-Shirt Showroom',
    description: 'An immersive 3D e-commerce showroom for premium cotton t-shirts with vaults, portals, puzzles, and AR try-on.',
  },
  journeyScenes: [
    { slug: 'organic-oasis', label: 'Organic Oasis' },
    { slug: 'urban-canvas', label: 'Urban Canvas' },
    { slug: 'abstract-dreamscape', label: 'Abstract Dreamscape' },
  ],
  metricsToWatch: [
    'scene_view',
    'product_focus',
    'vault_unlock',
    'puzzle_solved',
    'ar_launch',
    'ar_capture',
    'lead_submit',
    'comfort_settings_change',
  ],
};
