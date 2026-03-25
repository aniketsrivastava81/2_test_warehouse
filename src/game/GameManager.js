import { GAME_PHASE } from '../utils/constants.js';
import { getRank } from '../utils/helpers.js';
import { StateStore } from './StateStore.js';
import { ScoreManager } from './ScoreManager.js';
import { TimerManager } from './TimerManager.js';
import { ComboManager } from './ComboManager.js';

export class GameManager {
  constructor({ world, hud, audio, tweenManager, highlightFX, cameraFX, levels }) {
    this.world = world;
    this.hud = hud;
    this.audio = audio;
    this.tweenManager = tweenManager;
    this.highlightFX = highlightFX;
    this.cameraFX = cameraFX;
    this.levels = levels;

    this.state = new StateStore();
    this.scoreManager = new ScoreManager(this.state);
    this.comboManager = new ComboManager(this.state);
    this.timerManager = new TimerManager(this.state, () => this.loseSession());
    this.warned = false;
  }

  init() {
    this.state.totalLevels = this.levels.length;
    this.loadLevel(0, { sessionReset: true, preserveScore: false });
    this.hud.update(this.state);
    this.hud.showStart();
  }

  startSession() {
    this.audio.ensureContext();
    this.scoreManager.resetSession();
    this.state.resetSession();
    this.state.totalLevels = this.levels.length;
    this.loadLevel(0, { sessionReset: true, preserveScore: false });
    this.state.phase = GAME_PHASE.PLAYING;
    this.hud.hideStart();
    this.hud.hideEnd();
    this.hud.update(this.state);
  }

  loadLevel(levelIndex, { sessionReset = false, preserveScore = true } = {}) {
    const level = this.levels[levelIndex];
    this.activeLevel = level;
    this.world.loadLevel(level);
    this.comboManager.reset();
    if (!preserveScore) this.state.score = 0;
    this.state.currentLevelIndex = levelIndex;
    this.state.levelLabel = level.label;
    this.state.craneSpeedLabel = level.speedLabel;
    this.state.totalCount = level.pallets.length;
    this.state.placedCount = 0;
    if (sessionReset) {
      this.state.moves = 0;
      this.state.perfectDrops = 0;
      this.state.clearedLevels = 0;
    }
    this.state.selectedPalletId = null;
    this.state.busy = false;
    this.highlightFX.clearSelection();
    this.timerManager.start(level.timeLimit);
    this.warned = false;
    this.state.statusText = `${level.label}. Tap a pallet, then tap a matching bay. Crane speed is throttled.`;
  }

  getSelectedPallet() {
    return this.world.pallets.find((pallet) => pallet.userData.id === this.state.selectedPalletId) ?? null;
  }

  handlePalletSelection(pallet) {
    if (this.state.phase !== GAME_PHASE.PLAYING || this.state.busy) return;
    if (!pallet || pallet.userData.placed) return;
    this.audio.select();
    if (this.state.selectedPalletId === pallet.userData.id) {
      this.state.selectedPalletId = null;
      this.highlightFX.clearSelection();
      this.state.statusText = 'Selection cleared. Tap a new pallet to keep the crane moving.';
      this.hud.update(this.state);
      return;
    }
    this.state.selectedPalletId = pallet.userData.id;
    this.highlightFX.showSelection(pallet);
    this.state.statusText = `${pallet.userData.label} selected. Route it to a matching ${pallet.userData.type.toUpperCase()} bay.`;
    this.hud.update(this.state);
  }

  handleEmptyTap() {
    if (this.state.phase !== GAME_PHASE.PLAYING || this.state.busy) return;
    if (!this.state.selectedPalletId) return;
    this.state.selectedPalletId = null;
    this.highlightFX.clearSelection();
    this.state.statusText = 'Selection cleared. The timer is still running.';
    this.hud.update(this.state);
  }

  async handleBaySelection(bay) {
    if (this.state.phase !== GAME_PHASE.PLAYING || this.state.busy) return;
    const pallet = this.getSelectedPallet();
    if (!pallet) {
      this.state.statusText = 'Tap a pallet first. The crane only moves once a load is selected.';
      this.hud.update(this.state);
      return;
    }

    this.state.moves += 1;

    if (bay.occupied || bay.type !== pallet.userData.type) {
      pallet.userData.mistakes += 1;
      this.comboManager.fail();
      this.timerManager.addPenalty(this.activeLevel.penalty);
      this.highlightFX.flashInvalid(bay);
      this.audio.invalid();
      this.state.statusText = `Wrong bay. Dispatch clock -${this.activeLevel.penalty}s. Keep ${pallet.userData.label} selected and re-route.`;
      this.hud.update(this.state);
      if (this.state.timeLeft <= 0) this.loseSession();
      return;
    }

    this.state.busy = true;
    this.state.statusText = `Crane en route. ${pallet.userData.label} is moving to slot ${bay.slotCode}.`;
    this.hud.update(this.state);

    await this.tweenManager.moveCrane({
      world: this.world,
      pallet,
      sourcePosition: pallet.position.clone(),
      targetPosition: bay.position.clone(),
      speed: this.activeLevel.speed
    });

    bay.occupied = true;
    pallet.userData.placed = true;
    this.highlightFX.clearSelection();
    this.world.setPalletState(pallet, 'placed');
    this.highlightFX.markPlaced(bay);
    const combo = this.comboManager.success();
    const perfect = pallet.userData.mistakes === 0;
    const points = this.scoreManager.addPlacement({ perfect, combo, levelMultiplier: this.activeLevel.multiplier });
    if (perfect) this.state.perfectDrops += 1;
    this.state.placedCount += 1;
    this.state.selectedPalletId = null;
    this.audio.snap();
    if (combo > 1) this.audio.combo(combo);
    this.cameraFX.punch();
    this.state.statusText = `${bay.slotCode} secured. +${points} points. Dispatch pace: ${getRank(this.state.score)}.`;
    this.hud.showCombo(perfect ? `Perfect lift x${combo}` : `Clean drop x${combo}`);
    this.tweenManager.popCombo(this.hud.comboEl);
    this.state.busy = false;
    this.updateAccuracy();
    this.hud.update(this.state);

    if (this.state.placedCount >= this.state.totalCount) {
      this.handleLevelClear();
    }
  }

  handleLevelClear() {
    this.timerManager.stop();
    const bonus = this.scoreManager.addLevelClear(this.state.currentLevelIndex);
    this.state.clearedLevels += 1;
    this.state.phase = this.state.currentLevelIndex >= this.levels.length - 1 ? GAME_PHASE.WON : GAME_PHASE.LEVEL_COMPLETE;
    this.audio.levelClear();
    this.state.statusText = `Level cleared. +${bonus} clear bonus locked in.`;
    this.updateAccuracy();
    this.hud.update(this.state);
    if (this.state.phase === GAME_PHASE.WON) {
      this.audio.finish();
      this.hud.showEnd(this.state, { didWin: true, isSessionWin: true });
    } else {
      this.hud.showEnd(this.state, { didWin: true, isSessionWin: false, nextLevel: this.levels[this.state.currentLevelIndex + 1] });
    }
  }

  continueToNextLevel() {
    if (this.state.phase !== GAME_PHASE.LEVEL_COMPLETE) return;
    this.hud.hideEnd();
    this.loadLevel(this.state.currentLevelIndex + 1, { preserveScore: true });
    this.state.phase = GAME_PHASE.PLAYING;
    this.hud.update(this.state);
  }

  update(delta) {
    if (this.state.phase !== GAME_PHASE.PLAYING) {
      this.hud.update(this.state);
      return;
    }

    this.timerManager.update(delta);
    if (this.state.timeLeft <= 6 && !this.warned) {
      this.warned = true;
      this.audio.warning();
      this.state.statusText = 'Closing window. The crane is throttled — every wrong bay hurts now.';
    }
    this.hud.update(this.state);
  }

  loseSession() {
    if ([GAME_PHASE.LOST, GAME_PHASE.WON].includes(this.state.phase)) return;
    this.timerManager.stop();
    this.state.phase = GAME_PHASE.LOST;
    this.state.busy = false;
    this.state.selectedPalletId = null;
    this.highlightFX.clearSelection();
    this.updateAccuracy();
    this.state.statusText = 'Dispatch window missed. Restart the shift and route faster.';
    this.hud.update(this.state);
    this.hud.showEnd(this.state, { didWin: false, isSessionWin: false });
  }

  updateAccuracy() {
    if (!this.state.moves) {
      this.state.accuracy = 100;
      return;
    }
    this.state.accuracy = (this.state.placedCount / this.state.moves) * 100;
  }
}
