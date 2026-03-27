import * as THREE from 'three';
import { Renderer } from './Renderer.js';
import { CameraManager } from './CameraManager.js';
import { createLights } from './Lights.js';
import { Loop } from './Loop.js';
import { WarehouseWorld } from '../world/WarehouseWorld.js';
import { PointerController } from '../input/PointerController.js';
import { RaycastPicker } from '../input/RaycastPicker.js';
import { DragController as InteractionController } from '../input/DragController.js';
import { TweenManager } from '../fx/TweenManager.js';
import { HighlightFX } from '../fx/HighlightFX.js';
import { CameraFX } from '../fx/CameraFX.js';
import { AudioManager } from '../fx/AudioManager.js';
import { HUD } from '../ui/HUD.js';
import { GameManager } from '../game/GameManager.js';
import { levels } from '../data/levels.js';
import { GAME_PHASE } from '../utils/constants.js';

export class App {
  constructor(root) {
    this.root = root;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#cfe6ff');
    this.scene.fog = new THREE.FogExp2('#cfe6ff', 0.0044);

    this.renderer = new Renderer();
    this.cameraManager = new CameraManager();
    this.lights = createLights(this.scene);

    root.appendChild(this.renderer.domElement);
    this.world = new WarehouseWorld(this.scene);
    this.pointer = new PointerController(this.renderer.domElement);
    this.picker = new RaycastPicker(this.cameraManager.instance);
    this.tweenManager = new TweenManager();
    this.highlightFX = new HighlightFX(this.world);
    this.cameraFX = new CameraFX(this.cameraManager);
    this.audio = new AudioManager();
    this.hud = new HUD(root);

    this.gameManager = new GameManager({
      world: this.world,
      hud: this.hud,
      audio: this.audio,
      tweenManager: this.tweenManager,
      highlightFX: this.highlightFX,
      cameraFX: this.cameraFX,
      levels
    });

    this.interactionController = new InteractionController({
      domElement: this.renderer.domElement,
      picker: this.picker,
      pointer: this.pointer,
      world: this.world,
      canInteract: () => this.gameManager.state.phase === GAME_PHASE.PLAYING && !this.gameManager.state.busy,
      onPalletTap: (pallet) => this.gameManager.handlePalletSelection(pallet),
      onBayTap: (bay) => this.gameManager.handleBaySelection(bay),
      onEmptyTap: () => this.gameManager.handleEmptyTap()
    });

    this.loop = new Loop((delta) => this.update(delta), () => this.render());
    this.bindUI();
    this.onResize = this.onResize.bind(this);
  }

  bindUI() {
    this.hud.on('start', () => this.gameManager.startSession());
    this.hud.on('restart', () => this.gameManager.startSession());
    this.hud.on('continue', () => this.gameManager.continueToNextLevel());
    this.hud.on('close', () => this.hud.hideEnd());
  }

  mount() {
    this.gameManager.init();
    this.interactionController.attach();
    window.addEventListener('resize', this.onResize);
    this.loop.start();
  }

  onResize() {
    this.renderer.resize();
    this.cameraManager.resize();
  }

  update(delta) {
    this.world.update(delta);
    this.gameManager.update(delta);
  }

  render() {
    this.renderer.render(this.scene, this.cameraManager.instance);
  }
}
