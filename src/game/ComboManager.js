import { GAME_CONFIG } from '../utils/constants.js';

export class ComboManager {
  constructor(state) {
    this.state = state;
  }

  reset() {
    this.state.combo = 0;
  }

  success() {
    this.state.combo += 1;
    return Math.min(GAME_CONFIG.MAX_COMBO_MULTIPLIER, Math.max(1, this.state.combo));
  }

  fail() {
    this.state.combo = 0;
    return 1;
  }
}
