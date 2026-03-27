import * as THREE from 'three';

export class CraneRig {
  constructor() {
    this.group = new THREE.Group();
    this.bridgeY = 8.65;
    this.restDrop = -0.7;
    this.travelDrop = -2.1;
    this.pickDrop = -7.05;
    this.placeDrop = -7.0;
    this.carryingPallet = null;
    this.time = 0;

    const railMat = new THREE.MeshStandardMaterial({ color: '#4f5d73', roughness: 0.52, metalness: 0.44 });
    const bridgeMat = new THREE.MeshStandardMaterial({ color: '#d97a27', roughness: 0.42, metalness: 0.22 });
    const trolleyMat = new THREE.MeshStandardMaterial({ color: '#354962', roughness: 0.46, metalness: 0.3 });

    const railGeom = new THREE.BoxGeometry(0.18, 0.18, 42);
    const leftRail = new THREE.Mesh(railGeom, railMat);
    const rightRail = new THREE.Mesh(railGeom, railMat);
    leftRail.position.set(-10.2, this.bridgeY + 0.1, 0);
    rightRail.position.set(10.2, this.bridgeY + 0.1, 0);
    this.group.add(leftRail, rightRail);

    this.bridge = new THREE.Group();
    this.bridge.position.set(0, this.bridgeY, 0);
    this.group.add(this.bridge);

    const bridgeBeam = new THREE.Mesh(new THREE.BoxGeometry(20.9, 0.24, 0.44), bridgeMat);
    bridgeBeam.castShadow = true;
    this.bridge.add(bridgeBeam);

    const carriageGeom = new THREE.BoxGeometry(0.9, 0.5, 0.95);
    const carrL = new THREE.Mesh(carriageGeom, bridgeMat);
    const carrR = new THREE.Mesh(carriageGeom, bridgeMat);
    carrL.position.x = -10.1;
    carrR.position.x = 10.1;
    this.bridge.add(carrL, carrR);

    this.trolley = new THREE.Group();
    this.bridge.add(this.trolley);
    const trolleyBody = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.6, 1), trolleyMat);
    trolleyBody.position.y = -0.26;
    trolleyBody.castShadow = true;
    this.trolley.add(trolleyBody);

    this.hookGroup = new THREE.Group();
    this.hookGroup.position.y = this.restDrop;
    this.trolley.add(this.hookGroup);

    this.cable = new THREE.Mesh(
      new THREE.CylinderGeometry(0.045, 0.045, 1, 12),
      new THREE.MeshStandardMaterial({ color: '#d9e6ff', roughness: 0.2, metalness: 0.18 })
    );
    this.hookGroup.add(this.cable);

    this.hookHead = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.25, 0.42), bridgeMat);
    this.hookGroup.add(this.hookHead);

    this.hookTip = new THREE.Group();
    this.hookTip.position.set(0, -0.42, 0);
    this.hookGroup.add(this.hookTip);

    const lowerBar = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.08, 0.24), bridgeMat);
    lowerBar.position.y = -0.18;
    this.hookTip.add(lowerBar);
    const clawL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.4, 0.08), bridgeMat);
    const clawR = clawL.clone();
    clawL.position.set(-0.22, -0.24, 0);
    clawR.position.set(0.22, -0.24, 0);
    this.hookTip.add(clawL, clawR);

    this.beaconL = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, 0.1, 16),
      new THREE.MeshStandardMaterial({ color: '#ffcc55', emissive: '#ffcc55', emissiveIntensity: 0.8 })
    );
    this.beaconR = this.beaconL.clone();
    this.beaconL.position.set(-0.42, -0.02, 0.38);
    this.beaconR.position.set(0.42, -0.02, 0.38);
    this.trolley.add(this.beaconL, this.beaconR);

    this.updateCable();
  }

  update(delta) {
    this.time += delta;
    const blink = 0.55 + Math.sin(this.time * 7) * 0.25;
    this.beaconL.material.emissiveIntensity = blink;
    this.beaconR.material.emissiveIntensity = blink;
    this.updateCarriedPallet();
  }

  updateCable() {
    const length = Math.abs(this.hookGroup.position.y) + 0.35;
    this.cable.scale.y = length;
    this.cable.position.y = -length / 2 + 0.15;
    this.hookHead.position.y = -length + 0.28;
    this.hookTip.position.y = -length + 0.02;
  }

  attachPallet(pallet) {
    this.carryingPallet = pallet;
    pallet.userData.state = 'moving';
    this.updateCarriedPallet(true);
  }

  detachPallet(targetPosition) {
    if (!this.carryingPallet) return;
    this.carryingPallet.position.copy(targetPosition);
    this.carryingPallet.rotation.set(0, 0, 0);
    this.carryingPallet.scale.setScalar(1);
    this.carryingPallet.userData.state = 'placed';
    this.carryingPallet = null;
  }

  updateCarriedPallet(force = false) {
    this.updateCable();
    if (!this.carryingPallet && !force) return;
    const worldPos = new THREE.Vector3();
    this.hookTip.getWorldPosition(worldPos);
    if (this.carryingPallet) {
      this.carryingPallet.position.copy(worldPos).add(new THREE.Vector3(0, -0.58, 0));
      this.carryingPallet.rotation.y = 0;
    }
  }
}
