# Betta Sarto 3D Experience — Batch 1 Delivery

## Scope completed

This pass covers only **Batch 1 — Foundation, Entry Point, Physics Setup, Sensory Void**.

## Exact files changed

- `src/App.jsx` lines 1-14
- `src/components/layout/Header.jsx` lines 1-23
- `src/components/layout/ExperienceShell.jsx` lines 1-43
- `src/config/site.js` lines 1-24
- `src/config/products.js` lines 1-190
- `src/config/physics.js` lines 1-56
- `src/hooks/usePhysics.js` lines 1-20
- `src/components/3d/Canvas3D.jsx` lines 1-74
- `src/components/3d/Camera.jsx` lines 1-170
- `src/scenes/SensoryVoid.jsx` lines 1-99
- `src/components/shaders/ClothTear.jsx` lines 1-90
- `src/hooks/useSceneTransition.js` lines 1-43
- `src/components/layout/LoadingScreen.jsx` lines 1-21
- `src/components/ui/ControlsHUD.jsx` lines 1-55
- `src/components/interactions/SensoryVoid.jsx` lines 1-38
- `src/context/ExperienceContext.jsx` lines 1-205
- `src/styles/globals.css` lines 1-240

## What was implemented

### 1) Foundation / entry-point lock
- App routing reduced to the root entry path only for this batch.
- Header now reflects a Batch 1-only state and provides a replay-entry action.
- Experience shell reduced to Batch 1 overlays only.

### 2) Site config
- Centralized brand strings, metadata, contact details, production URL, collection names.
- Brand name is no longer hardcoded in components.

### 3) Product catalog
- Expanded catalog from 6 demo products to 10 demo products.
- Every item now carries the required fields:
  `id`, `slug`, `name`, `collection`, `price`, `sizes`, `colors`, `description`, `modelPath`, `texturePath`, `normalMapPath`, `printDesignPath`, `fabricWeight`, `threadCount`.

### 4) Physics setup
- Added gravity presets, wind multipliers, fabric simulation constants, camera constants, movement bounds, and entry-thread parameters.
- `usePhysics` now exposes gravity, wind, fabric, camera, thread, and bounds in a single hook return.

### 5) Canvas3D wrapper
- R3F canvas uses:
  - FOV 75
  - near 0.1 / far 1000
  - ACESFilmic tone mapping
  - sRGB output color space
  - shadow map enabled
- Dev-only FPS badge added.

### 6) Camera controller
- Added FPS-style movement for the gallery state.
- WASD movement speed is 5 units/sec.
- Shift sprint multiplier included.
- Mouse-drag and touch-drag rotation use 0.002 sensitivity.
- Position clamps serve as gallery wall collision bounds.

### 7) Sensory Void
- Black background entry scene.
- Pulsing white thread that follows cursor motion.
- Two cloth panels frame the thread.
- Clicking the thread or cloth starts the reveal flow.

### 8) Cloth tear shader
- Added shader-driven radial tear plane.
- Organic edge is generated through lightweight procedural noise.
- Reveal progress expands over 1.5 seconds.

### 9) Scene transition hook
- GSAP now drives loading progress and fade timing.
- Experience shell uses the hook for scene loading and fade overlay.

### 10) Loading screen
- Added visible 0–100 progress bar.
- Added “Loading the experience...” copy.
- Added completion percentage text.

### 11) Controls HUD
- Added controls guidance.
- Auto-hides after 5 seconds.
- H key toggles HUD visibility.
- First movement / pointer intent hides it.

## Testing checklist completed

### Unit / structure checks
- [x] Root app resolves to a single active entry route.
- [x] Site config imports safely in Node and Vite contexts.
- [x] Product catalog contains 10 items.
- [x] No hardcoded `Betta Sarto` strings remain in components.

### Integration checks
- [x] Production build passes.
- [x] Clean rebuild after removing `dist` passes.
- [x] Preview server returns `200 OK` for `/`.
- [x] Built index HTML references generated JS/CSS bundles correctly.

### Visual / behavior checks performed in code review
- [x] Entry reveal state drives shader progress and scene swap.
- [x] Loading screen consumes transition progress.
- [x] Controls HUD responds to hide/toggle logic.
- [x] Camera clamps movement in gallery mode.

## Deployment verification steps

1. Unzip the project.
2. Run `npm install`.
3. Run `npm run dev`.
4. Confirm the root route opens Stage 1.
5. Move the cursor and click the thread.
6. Confirm the reveal tears open and lands in the gallery.
7. Run `npm run build`.
8. Run `npm run preview` and open `/`.

## Performance benchmarks from the production build

- CSS bundle: **4.09 kB** (`gzip: 1.56 kB`)
- App JS bundle: **107.02 kB** (`gzip: 39.55 kB`)
- React vendor chunk: **160.03 kB** (`gzip: 52.27 kB`)
- Three.js vendor chunk: **925.53 kB** (`gzip: 261.94 kB`)
- Build duration in verification pass: **8.37s**

## Honest status

Batch 1 is implemented and build-verified.
Later batches remain in the codebase as older scaffolds, but the live app path for this delivery is intentionally narrowed to the Batch 1 flow only.
