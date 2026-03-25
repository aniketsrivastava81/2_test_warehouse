import * as THREE from 'three';
import { PALLET_TYPES } from '../data/palletTypes.js';
import { PALLET_STATE } from '../utils/constants.js';

function hashString(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) hash = ((hash << 5) - hash + value.charCodeAt(i)) | 0;
  return Math.abs(hash);
}

function makeLabelTexture(text, accent, dark = '#0b1118') {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = dark;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = accent;
  ctx.lineWidth = 8;
  ctx.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);
  ctx.fillStyle = '#f2f7ff';
  ctx.font = '700 34px "DM Mono"';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export class PalletFactory {
  constructor() {
    this.brandTexture = makeLabelTexture('MEGHA MEHTA REAL ESTATE', '#ffe27a');
    this.typeTextureCache = new Map();
  }

  getTypeTexture(type) {
    if (!this.typeTextureCache.has(type)) {
      this.typeTextureCache.set(type, makeLabelTexture(PALLET_TYPES[type].label.toUpperCase(), PALLET_TYPES[type].color));
    }
    return this.typeTextureCache.get(type);
  }

  create(definition) {
    const group = new THREE.Group();
    const accent = PALLET_TYPES[definition.type].color;
    const tone = hashString(definition.id);

    const woodMat = new THREE.MeshStandardMaterial({ color: tone % 2 ? '#8d6138' : '#9c6e42', roughness: 0.92, metalness: 0.02 });
    const slatGeom = new THREE.BoxGeometry(1.84, 0.05, 0.18);
    [-0.52, -0.26, 0, 0.26, 0.52].forEach((z) => {
      const slat = new THREE.Mesh(slatGeom, woodMat);
      slat.position.set(0, -0.25, z);
      slat.castShadow = true;
      slat.receiveShadow = true;
      group.add(slat);
    });
    [-0.64, 0, 0.64].forEach((x) => {
      const stringer = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.12, 1.3), woodMat);
      stringer.position.set(x, -0.34, 0);
      group.add(stringer);
    });
    [-0.64, 0, 0.64].forEach((x) => {
      [-0.48, 0, 0.48].forEach((z) => {
        const block = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.12, 0.18), woodMat);
        block.position.set(x, -0.42, z);
        group.add(block);
      });
    });

    const loadHeight = 0.7 + (definition.variant % 3) * 0.2;
    const cargoBody = new THREE.Mesh(
      new THREE.BoxGeometry(1.48, loadHeight, 1.04),
      new THREE.MeshStandardMaterial({ color: accent, roughness: 0.44, metalness: 0.08, emissive: accent, emissiveIntensity: 0.06 })
    );
    cargoBody.position.y = 0.1 + loadHeight / 2;
    cargoBody.castShadow = true;
    cargoBody.receiveShadow = true;
    group.add(cargoBody);

    if (definition.variant % 2 === 0) {
      const topBox = new THREE.Mesh(
        new THREE.BoxGeometry(0.88, 0.34, 0.6),
        new THREE.MeshStandardMaterial({ color: '#dfe9f7', roughness: 0.38, metalness: 0.03 })
      );
      topBox.position.set(-0.18, cargoBody.position.y + loadHeight / 2 + 0.17, 0);
      group.add(topBox);
    }

    const wrap = new THREE.Mesh(
      new THREE.BoxGeometry(1.56, loadHeight + 0.06, 1.12),
      new THREE.MeshStandardMaterial({ color: '#ffffff', transparent: true, opacity: 0.12, roughness: 0.22, metalness: 0.02 })
    );
    wrap.position.y = cargoBody.position.y;
    group.add(wrap);

    const strapMat = new THREE.MeshStandardMaterial({ color: '#d7e6ff', roughness: 0.25, metalness: 0.1, transparent: true, opacity: 0.8 });
    const strapA = new THREE.Mesh(new THREE.BoxGeometry(0.06, loadHeight + 0.09, 1.16), strapMat);
    const strapB = strapA.clone();
    strapA.position.set(-0.4, cargoBody.position.y, 0);
    strapB.position.set(0.4, cargoBody.position.y, 0);
    group.add(strapA, strapB);

    const labelMat = new THREE.MeshStandardMaterial({ map: this.getTypeTexture(definition.type), roughness: 0.42, metalness: 0.03 });
    const label = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.2), labelMat);
    label.position.set(0, cargoBody.position.y + 0.1, 0.58);
    group.add(label);

    if (definition.brandWrap) {
      const band = new THREE.Mesh(
        new THREE.BoxGeometry(1.58, 0.22, 1.14),
        new THREE.MeshStandardMaterial({ color: '#151b24', roughness: 0.28, metalness: 0.08 })
      );
      band.position.set(0, cargoBody.position.y + 0.02, 0);
      group.add(band);
      const brandMat = new THREE.MeshStandardMaterial({ map: this.brandTexture, roughness: 0.34, metalness: 0.03 });
      const brandFront = new THREE.Mesh(new THREE.PlaneGeometry(1.26, 0.14), brandMat);
      brandFront.position.set(0, cargoBody.position.y + 0.02, 0.58);
      const brandSide = new THREE.Mesh(new THREE.PlaneGeometry(0.82, 0.14), brandMat);
      brandSide.rotation.y = Math.PI / 2;
      brandSide.position.set(0.79, cargoBody.position.y + 0.02, 0);
      group.add(brandFront, brandSide);
    }

    group.position.set(...definition.position);
    group.userData = {
      id: definition.id,
      kind: 'pallet',
      type: definition.type,
      label: PALLET_TYPES[definition.type].label,
      state: PALLET_STATE.STAGED,
      placed: false,
      mistakes: 0,
      homePosition: new THREE.Vector3(...definition.position)
    };

    return group;
  }
}
