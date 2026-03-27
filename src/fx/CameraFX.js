import { gsap } from 'gsap';

export class CameraFX {
  constructor(cameraManager) {
    this.cameraManager = cameraManager;
  }

  punch() {
    const camera = this.cameraManager.instance;
    gsap.killTweensOf(camera.position);
    gsap.fromTo(
      camera.position,
      {
        x: this.cameraManager.defaultPosition.x + 0.18,
        y: this.cameraManager.defaultPosition.y + 0.14,
        z: this.cameraManager.defaultPosition.z + 0.24
      },
      {
        x: this.cameraManager.defaultPosition.x,
        y: this.cameraManager.defaultPosition.y,
        z: this.cameraManager.defaultPosition.z,
        duration: 0.28,
        ease: 'power2.out'
      }
    );
  }
}
