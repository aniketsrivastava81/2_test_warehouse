import { GAME_PHASE } from '../utils/constants.js';

export class StateStore {
  constructor() { this.resetSession(); }

  resetSession() {
    this.phase = GAME_PHASE.IDLE;
    this.timeLeft = 0;
    this.score = 0;
    this.combo = 0;
    this.placedCount = 0;
    this.totalCount = 0;
    this.moves = 0;
    this.perfectDrops = 0;
    this.accuracy = 100;
    this.statusText = 'Tap a pallet, then tap a matching bay before the dispatch window closes.';
    this.selectedPalletId = null;
    this.currentLevelIndex = 0;
    this.totalLevels = 0;
    this.levelLabel = '';
    this.craneSpeedLabel = '';
    this.clearedLevels = 0;
    this.busy = false;
  }
}
