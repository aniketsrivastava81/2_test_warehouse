import * as THREE from 'three';
import { GAME_CONFIG } from '../utils/constants.js';
import { BayZone } from './BayZone.js';
import { PalletFactory } from './PalletFactory.js';
import { GhostPreview } from './GhostPreview.js';
import { CraneRig } from './CraneRig.js';

function box(w, h, d, material, x = 0, y = 0, z = 0) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function cylinder(radiusTop, radiusBottom, height, material, x = 0, y = 0, z = 0, rotX = 0) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radiusTop, radiusBottom, height, 16), material);
  mesh.position.set(x, y, z);
  mesh.rotation.x = rotX;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export class WarehouseWorld {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.scene.add(this.group);
    this.staticGroup = new THREE.Group();
    this.dynamicGroup = new THREE.Group();
    this.group.add(this.staticGroup, this.dynamicGroup);

    this.palletFactory = new PalletFactory();
    this.bays = [];
    this.pallets = [];
    this.ghostPreview = new GhostPreview();
    this.group.add(this.ghostPreview.mesh);

    this.crane = new CraneRig();
    this.group.add(this.crane.group);

    this.buildEnvironment();
  }

  getInteractiveObjects() {
    return [...this.pallets, ...this.bays.map((bay) => bay.mesh)];
  }

  update(delta) {
    this.crane.update(delta);
  }

  clearDynamic() {
    this.dynamicGroup.clear();
    this.bays = [];
    this.pallets = [];
  }

  loadLevel(level) {
    this.clearDynamic();

    level.bays.forEach((definition) => {
      const bay = new BayZone(definition);
      this.bays.push(bay);
      this.dynamicGroup.add(bay.mesh);
    });

    level.pallets.forEach((definition) => {
      const pallet = this.palletFactory.create(definition);
      this.pallets.push(pallet);
      this.dynamicGroup.add(pallet);
    });

    this.decorateActiveLevel(level);
    this.crane.bridge.position.z = 0;
    this.crane.trolley.position.x = 0;
    this.crane.hookGroup.position.y = this.crane.restDrop;
    this.crane.updateCarriedPallet(true);
  }

  decorateActiveLevel(level) {
    const accentPaint = new THREE.MeshStandardMaterial({ color: '#30394a', roughness: 0.84, metalness: 0.04 });
    const lanePaint = new THREE.MeshStandardMaterial({ color: '#dceaff', roughness: 0.28, metalness: 0.06, emissive: '#b8d6ff', emissiveIntensity: 0.06 });
    const stagingPad = box(9.6, 0.05, 29, accentPaint, -4.7, -0.245, -1.8);
    const targetPad = box(10.2, 0.05, 30.5, accentPaint, 6.4, -0.245, -1.4);
    this.dynamicGroup.add(stagingPad, targetPad);

    for (let z = -16.5; z <= 13.5; z += 6.2) {
      this.dynamicGroup.add(box(18, 0.02, 0.08, lanePaint, 1.2, -0.22, z));
    }
    this.dynamicGroup.add(box(0.14, 0.04, 33.6, lanePaint, 0.6, -0.215, -1.4));

    const signMat = new THREE.MeshStandardMaterial({ color: '#111823', roughness: 0.44, metalness: 0.12 });
    const textMat = new THREE.MeshStandardMaterial({ color: '#e5efff', roughness: 0.2, metalness: 0.06 });
    for (let i = 0; i < 5; i += 1) {
      const signFrame = box(0.1, 1.5, 0.1, signMat, 1.2 + i * 2.4, 2.1, -18.2);
      const signPanel = box(1.2, 0.46, 0.08, textMat, 1.2 + i * 2.4, 2.7, -18.2);
      this.dynamicGroup.add(signFrame, signPanel);
    }
  }

  setPalletState(pallet, mode = 'idle') {
    const target = {
      idle: { scale: 1, yOffset: 0, emissive: 0.06 },
      selected: { scale: 1.05, yOffset: 0.08, emissive: 0.2 },
      placed: { scale: 1, yOffset: 0, emissive: 0.1 }
    }[mode] ?? { scale: 1, yOffset: 0, emissive: 0.06 };
    pallet.scale.setScalar(target.scale);
    if (!pallet.userData.placed) pallet.position.y = GAME_CONFIG.PALLET_Y + target.yOffset;

    pallet.traverse((child) => {
      if (child.material?.emissiveIntensity != null) child.material.emissiveIntensity = target.emissive;
    });
  }

  buildEnvironment() {
    const M = {
      floor: new THREE.MeshStandardMaterial({ color: '#aab2b3', roughness: 0.58, metalness: 0.12 }),
      wall: new THREE.MeshStandardMaterial({ color: '#d0cec8', roughness: 0.88, metalness: 0.02 }),
      wallDark: new THREE.MeshStandardMaterial({ color: '#8f949b', roughness: 0.84, metalness: 0.03 }),
      ceiling: new THREE.MeshStandardMaterial({ color: '#4a515d', roughness: 0.82, metalness: 0.08 }),
      steel: new THREE.MeshStandardMaterial({ color: '#576579', roughness: 0.58, metalness: 0.34 }),
      line: new THREE.MeshStandardMaterial({ color: '#e9f2ff', roughness: 0.22, metalness: 0.06, emissive: '#dce9ff', emissiveIntensity: 0.04 }),
      orange: new THREE.MeshStandardMaterial({ color: '#e4872e', roughness: 0.44, metalness: 0.2 }),
      blue: new THREE.MeshStandardMaterial({ color: '#366db7', roughness: 0.52, metalness: 0.24 }),
      green: new THREE.MeshStandardMaterial({ color: '#2c8858', roughness: 0.52, metalness: 0.18 }),
      red: new THREE.MeshStandardMaterial({ color: '#c74343', roughness: 0.6, metalness: 0.16 }),
      yellow: new THREE.MeshStandardMaterial({ color: '#d7b63d', roughness: 0.48, metalness: 0.12 }),
      dark: new THREE.MeshStandardMaterial({ color: '#1f2733', roughness: 0.84, metalness: 0.03 }),
      glow: new THREE.MeshStandardMaterial({ color: '#d8eaff', emissive: '#d8eaff', emissiveIntensity: 0.6, roughness: 0.2, metalness: 0.14 })
    };

    const { SHELL_W: W, SHELL_D: D, SHELL_H: H } = GAME_CONFIG;

    const floor = box(W, 0.18, D, M.floor, 0, -0.09, 0);
    this.staticGroup.add(floor);

    for (let z = -20; z <= 20; z += 5) {
      this.staticGroup.add(box(W - 1.4, 0.02, 0.04, M.wallDark, 0, 0.005, z));
    }
    for (let x = -8; x <= 8; x += 4) {
      this.staticGroup.add(box(0.04, 0.02, D - 2, M.wallDark, x, 0.005, 0));
    }

    const leftWall = box(0.28, H, D, M.wall, -W / 2, H / 2, 0);
    const rightWall = box(0.28, H, D, M.wall, W / 2, H / 2, 0);
    const rearWall = box(W, H, 0.28, M.wall, 0, H / 2, -D / 2);
    this.staticGroup.add(leftWall, rightWall, rearWall);

    const parapetL = box(W, 0.35, 1.2, M.wallDark, 0, H - 0.25, D / 2 - 0.6);
    const parapetR = parapetL.clone();
    parapetR.position.z = -D / 2 + 0.6;
    this.staticGroup.add(parapetL, parapetR);

    for (let z = -D / 2 + 3.5; z <= D / 2 - 4; z += 5) {
      this.staticGroup.add(box(W - 0.8, 0.28, 0.28, M.ceiling, 0, H - 0.6, z));
    }
    for (let x = -8.6; x <= 8.6; x += 4.3) {
      this.staticGroup.add(box(0.18, 0.18, D - 1, M.steel, x, H - 1.25, 0));
    }

    [-W / 2 + 0.3, 0, W / 2 - 0.3].forEach((x) => {
      [-15, -5, 5, 15].forEach((z) => {
        const col = box(0.3, H, 0.3, M.steel, x, H / 2, z);
        this.staticGroup.add(col);
        const guard = new THREE.Group();
        guard.add(box(1, 0.12, 1, M.yellow, x, 0.06, z));
        const post1 = box(0.12, 0.8, 0.12, M.red, x - 0.42, 0.4, z - 0.42);
        const post2 = box(0.12, 0.8, 0.12, M.red, x + 0.42, 0.4, z - 0.42);
        const post3 = box(0.12, 0.8, 0.12, M.red, x - 0.42, 0.4, z + 0.42);
        const post4 = box(0.12, 0.8, 0.12, M.red, x + 0.42, 0.4, z + 0.42);
        this.staticGroup.add(guard, post1, post2, post3, post4);
      });
    });

    const stripPositions = [];
    [-7, 0, 7].forEach((x) => {
      [-15, -5, 5, 15].forEach((z) => stripPositions.push([x, 8.7, z]));
    });
    stripPositions.forEach(([x, y, z]) => {
      const strip = box(2.4, 0.12, 0.5, M.glow, x, y, z);
      this.staticGroup.add(strip);
      const pl = new THREE.PointLight('#d8eaff', 2.7, 15);
      pl.position.set(x, y - 0.2, z);
      this.staticGroup.add(pl);
    });

    const dockSealMat = new THREE.MeshStandardMaterial({ color: '#1a1f28', roughness: 0.88, metalness: 0.06 });
    [-8, -4, 0, 4, 8].forEach((x, index) => {
      const door = box(2.7, 3.6, 0.16, M.wallDark, x, 2, -D / 2 + 0.18);
      const seal = box(3.3, 4.2, 0.6, dockSealMat, x, 2.2, -D / 2 + 0.4);
      const canopy = box(3.9, 0.22, 1.2, M.steel, x, 4.45, -D / 2 + 0.72);
      this.staticGroup.add(door, seal, canopy);
      const bumperL = box(0.18, 0.5, 0.22, M.yellow, x - 1.45, 0.25, -D / 2 + 0.38);
      const bumperR = box(0.18, 0.5, 0.22, M.yellow, x + 1.45, 0.25, -D / 2 + 0.38);
      this.staticGroup.add(bumperL, bumperR);
      if (index < 4) this.staticGroup.add(box(0.12, 0.04, 5.2, M.line, x + 2, 0.01, -D / 2 + 2.8));
    });

    const centerLane = box(0.24, 0.03, D - 6, M.line, 0.65, 0.02, 0.5);
    this.staticGroup.add(centerLane);
    for (let z = -19; z <= 19; z += 5.5) {
      this.staticGroup.add(box(2.4, 0.02, 0.08, M.line, 0.65, 0.02, z));
    }

    this.buildRackRow({ x: 3.7, zStart: -16, zEnd: 16, rows: 7, levels: 3, uprightMat: M.blue, beamMat: M.orange });
    this.buildRackRow({ x: 8.3, zStart: -16, zEnd: 16, rows: 7, levels: 3, uprightMat: M.green, beamMat: M.orange });

    const cabinet = box(1.1, 2.2, 0.7, M.dark, -9.2, 1.1, -17.2);
    const cabinetGlow = box(0.7, 0.12, 0.08, M.glow, -9.2, 1.7, -16.82);
    const barrier = box(2.6, 0.14, 0.14, M.yellow, -8.4, 0.75, -9.4);
    const barrierPostL = cylinder(0.08, 0.08, 0.8, M.yellow, -9.7, 0.4, -9.4);
    const barrierPostR = cylinder(0.08, 0.08, 0.8, M.yellow, -7.1, 0.4, -9.4);
    this.staticGroup.add(cabinet, cabinetGlow, barrier, barrierPostL, barrierPostR);

    const floorLoads = [
      [-9.1, 0.6, 15.8], [-7.2, 0.6, 15.2], [-9, 0.6, 12.9],
      [9.1, 0.6, 16.4], [9.3, 0.6, 18.6], [7.6, 0.6, 17.3]
    ];
    floorLoads.forEach(([x, y, z], index) => {
      const load = box(1.6, 1.2 + (index % 2) * 0.6, 1.4, M.dark, x, y, z);
      this.staticGroup.add(load);
    });
  }

  buildRackRow({ x, zStart, zEnd, rows, levels, uprightMat, beamMat }) {
    const spacing = (zEnd - zStart) / (rows - 1);
    for (let i = 0; i < rows; i += 1) {
      const z = zStart + i * spacing;
      const left = box(0.14, 5.4, 0.14, uprightMat, x - 1.1, 2.7, z);
      const right = box(0.14, 5.4, 0.14, uprightMat, x + 1.1, 2.7, z);
      this.staticGroup.add(left, right);
      for (let level = 0; level < levels; level += 1) {
        const y = 0.9 + level * 1.5;
        this.staticGroup.add(box(2.3, 0.12, 0.16, beamMat, x, y, z));
        if ((i + level) % 2 === 0) {
          this.staticGroup.add(box(1.6, 0.8, 1.05, new THREE.MeshStandardMaterial({ color: level % 2 ? '#8cc1ff' : '#a7e7b9', roughness: 0.46, metalness: 0.08 }), x, y + 0.46, z));
        }
      }
    }
  }
}
