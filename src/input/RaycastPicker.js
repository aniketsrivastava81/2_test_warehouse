import * as THREE from 'three';

export class RaycastPicker {
  constructor(camera) {
    this.camera = camera;
    this.raycaster = new THREE.Raycaster();
  }

  setFromPointer(ndc) {
    this.raycaster.setFromCamera(ndc, this.camera);
  }

  pick(objects = []) {
    return this.raycaster.intersectObjects(objects, true);
  }
}
