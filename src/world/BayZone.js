import * as THREE from 'three';
import { PALLET_TYPES } from '../data/palletTypes.js';

function makeCanvasMaterial(text, accent) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 96;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#0c1117';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = accent;
  ctx.lineWidth = 6;
  ctx.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);
  ctx.fillStyle = '#eaf2ff';
  ctx.font = '700 26px "DM Mono"';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return new THREE.MeshStandardMaterial({ map: texture, transparent: false, roughness: 0.4, metalness: 0.08 });
}

export class BayZone {
  constructor({ id, slotCode, type, position }) {
    this.id = id;
    this.slotCode = slotCode;
    this.type = type;
    this.position = new THREE.Vector3(position[0], position[1], position[2]);
    this.occupied = false;

    const accent = PALLET_TYPES[type].color;
    this.group = new THREE.Group();
    this.group.userData.kind = 'bay';
    this.group.userData.instance = this;

    const base = new THREE.Mesh(
      new THREE.BoxGeometry(2.12, 0.08, 1.62),
      new THREE.MeshStandardMaterial({
        color: accent,
        transparent: true,
        opacity: 0.18,
        roughness: 0.52,
        metalness: 0.05,
        emissive: accent,
        emissiveIntensity: 0.18
      })
    );
    base.position.y = -0.34;
    this.group.add(base);

    const frame = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(2.16, 0.1, 1.66)),
      new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.9 })
    );
    frame.position.y = -0.34;
    this.group.add(frame);

    const postGeom = new THREE.BoxGeometry(0.12, 2.6, 0.12);
    const beamGeom = new THREE.BoxGeometry(2.32, 0.12, 0.18);
    const postMat = new THREE.MeshStandardMaterial({ color: '#3d72b9', roughness: 0.62, metalness: 0.22 });
    const beamMat = new THREE.MeshStandardMaterial({ color: '#e58a2d', roughness: 0.48, metalness: 0.2 });
    const postL = new THREE.Mesh(postGeom, postMat);
    const postR = new THREE.Mesh(postGeom, postMat);
    const beam = new THREE.Mesh(beamGeom, beamMat);
    postL.position.set(-1.04, 1.12, -0.62);
    postR.position.set(1.04, 1.12, -0.62);
    beam.position.set(0, 2.26, -0.62);
    this.group.add(postL, postR, beam);

    const sign = new THREE.Mesh(new THREE.PlaneGeometry(0.92, 0.34), makeCanvasMaterial(slotCode, accent));
    sign.position.set(0, 2.62, -0.62);
    this.group.add(sign);

    const indicator = new THREE.Mesh(
      new THREE.CylinderGeometry(0.14, 0.14, 0.05, 24),
      new THREE.MeshStandardMaterial({
        color: accent,
        emissive: accent,
        emissiveIntensity: 0.42,
        roughness: 0.28,
        metalness: 0.12
      })
    );
    indicator.position.set(0.76, -0.16, 0.52);
    this.group.add(indicator);

    this.base = base;
    this.frame = frame;
    this.indicator = indicator;
    this.group.position.copy(this.position);
  }

  get mesh() {
    return this.group;
  }

  setHighlight(mode = 'idle') {
    const palette = {
      idle: { opacity: 0.16, emissive: 0.18, scale: 1, frame: 0.72 },
      match: { opacity: 0.3, emissive: 0.34, scale: 1.03, frame: 1 },
      invalid: { opacity: 0.18, emissive: 0.1, scale: 1, frame: 0.35 },
      done: { opacity: 0.26, emissive: 0.44, scale: 1.02, frame: 1 }
    };
    const next = palette[mode] ?? palette.idle;
    this.base.material.opacity = next.opacity;
    this.base.material.emissiveIntensity = next.emissive;
    this.frame.material.opacity = next.frame;
    this.group.scale.setScalar(next.scale);
  }
}
