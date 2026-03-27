export const UNLOCK_STATES = {
  idle: 'idle',
  approaching: 'approaching',
  challengeVisible: 'challenge-visible',
  solving: 'solving',
  unlocked: 'unlocked',
  claimed: 'claimed',
  failed: 'failed',
};

const validTransitions = {
  idle: ['approaching'],
  approaching: ['challenge-visible', 'idle'],
  'challenge-visible': ['solving', 'idle'],
  solving: ['unlocked', 'failed', 'challenge-visible'],
  failed: ['challenge-visible', 'idle'],
  unlocked: ['claimed', 'idle'],
  claimed: ['idle'],
};

export function canTransitionUnlock(fromState, toState) {
  return Boolean(validTransitions[fromState]?.includes(toState));
}
