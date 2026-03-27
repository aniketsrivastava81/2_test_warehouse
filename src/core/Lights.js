import * as THREE from 'three';

export function createLights(scene) {
  const ambient = new THREE.AmbientLight('#eaf2ff', 0.18);
  scene.add(ambient);

  const key = new THREE.DirectionalLight('#d8e8ff', 0.18);
  key.position.set(0, 28, 4);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -40;
  key.shadow.camera.right = 40;
  key.shadow.camera.top = 40;
  key.shadow.camera.bottom = -40;
  key.shadow.camera.near = 1;
  key.shadow.camera.far = 80;
  key.shadow.bias = -0.0008;
  scene.add(key);

  const fill = new THREE.DirectionalLight('#6080a0', 0.8);
  fill.position.set(-10, 6, 8);
  scene.add(fill);

  const back = new THREE.DirectionalLight('#9090b0', 0.46);
  back.position.set(5, 5, -20);
  scene.add(back);

  return { ambient, key, fill, back };
}
