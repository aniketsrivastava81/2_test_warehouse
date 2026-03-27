import { GAME_CONFIG } from '../utils/constants.js';

export class ScoreManager {
  constructor(state) {
    this.state = state;
  }

  resetSession() {
    this.state.score = 0;
  }

  addPlacement({ perfect, combo, levelMultiplier }) {
    let points = GAME_CONFIG.BASE_SCORE * combo * levelMultiplier;
    if (perfect) points += GAME_CONFIG.PERFECT_BONUS * levelMultiplier;
    this.state.score += Math.round(points);
    return Math.round(points);
  }

  addLevelClear(levelIndex) {
    const bonus = GAME_CONFIG.LEVEL_CLEAR_BONUS * (levelIndex + 1);
    this.state.score += bonus;
    return bonus;
  }
}
