# Betta Sarto 3D Experience

A complete React + Vite immersive showroom for Betta Sarto premium cotton t-shirts.

## Included experience

- Sensory Void entry with tear-through reveal
- Main gallery with discoverable shirts, vault door, and portal gates
- Drape/Wind mode toggle and flashlight inspection mode
- Vault unlock ritual with scan, dial, and code paths
- Cotton Cloud deep-dive with ripples, whispers, and sculptable cloud drift
- Three themed worlds with puzzles, resets, and progression tracking
- AR try-on route with live camera overlay, capture flow, and color scavenger hunt
- Comfort settings, persistent progress, audio toggle, mobile sticky CTA, analytics hooks
- Post-processing, dev FPS HUD, SPA routing, production verification script

## Routes

- `/`
- `/vault`
- `/cotton-cloud`
- `/journey/organic-oasis`
- `/journey/urban-canvas`
- `/journey/abstract-dreamscape`
- `/ar`

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
npm run verify
```

## Browser / device QA matrix

### Desktop
- Chrome latest
- Edge latest
- Firefox latest
- Safari 17+

### Mobile
- iPhone 12 or newer
- Pixel 5 or newer
- iPad Safari

## Expected graceful degradations

- Mobile disables heavy post-processing and reduces particles
- Missing camera permission keeps AR panel usable with fallback messaging
- Missing external assets fall back to procedural garment materials
- Audio autoplay denial falls back silently with UI notice

## Post-launch observation plan

Track these analytics events after launch:

- `scene_view`
- `product_focus`
- `add_to_cart`
- `vault_unlock`
- `puzzle_solved`
- `ar_launch`
- `ar_capture`
- `lead_submit`
- `comfort_settings_change`

## Notes

- The project uses procedural geometry so it runs without external GLB dependencies.
- The verify script checks that the built app and required source files exist before deployment.
