export const GAME_PHASE = {
  IDLE: 'idle',
  PLAYING: 'playing',
  LEVEL_COMPLETE: 'level_complete',
  WON: 'won',
  LOST: 'lost'
};

export const PALLET_STATE = {
  STAGED: 'staged',
  SELECTED: 'selected',
  MOVING: 'moving',
  PLACED: 'placed'
};

export const GAME_CONFIG = {
  SHELL_W: 22,
  SHELL_D: 50,
  SHELL_H: 10,
  PALLET_Y: 0.42,
  BASE_SCORE: 120,
  PERFECT_BONUS: 60,
  LEVEL_CLEAR_BONUS: 500,
  MAX_COMBO_MULTIPLIER: 6,
  CAMERA_DEFAULT: {
    x: 17.4,
    y: 17.2,
    z: 14.8
  }
};
