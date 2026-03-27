import * as THREE from 'three';

export class PointerController {
  constructor(domElement) {
    this.domElement = domElement;
    this.ndc = new THREE.Vector2();
  }

  updateFromEvent(event) {
    const rect = this.domElement.getBoundingClientRect();
    this.ndc.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.ndc.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    return this.ndc;
  }
}
