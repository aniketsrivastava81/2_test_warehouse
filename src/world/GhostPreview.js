import * as THREE from 'three';

export class GhostPreview {
  constructor() {
    this.mesh = new THREE.Group();
    this.mesh.visible = false;
    const base = new THREE.Mesh(
      new THREE.BoxGeometry(1.92, 1, 1.44),
      new THREE.MeshStandardMaterial({ color: '#6fffa1', transparent: true, opacity: 0.08, roughness: 0.22, metalness: 0.06 })
    );
    this.mesh.add(base);
  }
}
