import * as THREE from 'three';

export class Loop {
  constructor(update, render) {
    this.clock = new THREE.Clock();
    this.update = update;
    this.render = render;
    this.isRunning = false;
    this.tick = this.tick.bind(this);
  }

  start() {
    if (this.isRunning) return;
    this.clock.start();
    this.isRunning = true;
    this.tick();
  }

  stop() {
    this.isRunning = false;
  }

  tick() {
    if (!this.isRunning) return;
    const delta = Math.min(this.clock.getDelta(), 0.033);
    this.update(delta);
    this.render();
    requestAnimationFrame(this.tick);
  }
}
