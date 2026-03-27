export const siteConfig = {
  brandName: 'Betta Sarto',
  tagline: 'Premium cotton, staged as an immersive spatial reveal.',
  serviceTagline: 'Luxury cotton essentials with gallery-grade presentation.',
  productionUrl: import.meta.env?.VITE_SITE_URL || 'http://localhost:5173',
  contactEmail: 'atelier@bettasarto.com',
  supportPhone: '+1 (416) 555-0188',
  contact: {
    email: 'atelier@bettasarto.com',
    phone: '+1 (416) 555-0188',
    city: 'Toronto, Canada',
  },
  collections: {
    core: 'Core',
    esclusivo: 'Esclusivo',
    rare: 'Rare',
  },
  vaultCollections: ['Esclusivo', 'Rare'],
  socialHashtag: '#BettaSartoFit',
  defaultMetadata: {
    title: 'Betta Sarto — 3D Interactive T-Shirt Showroom',
    description: 'A premium 3D showroom for luxury cotton tees with an artful entry reveal and spatial exploration.',
  },
};
