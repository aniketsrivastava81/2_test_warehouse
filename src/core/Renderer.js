import * as THREE from 'three';

export class Renderer {
  constructor() {
    this.instance = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.instance.outputColorSpace = THREE.SRGBColorSpace;
    this.instance.toneMapping = THREE.ACESFilmicToneMapping;
    this.instance.toneMappingExposure = 1.6;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.resize();
  }

  resize() {
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.instance.setSize(window.innerWidth, window.innerHeight);
  }

  render(scene, camera) {
    this.instance.render(scene, camera);
  }

  get domElement() {
    return this.instance.domElement;
  }
}
