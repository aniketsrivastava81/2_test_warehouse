export const APP_STATES = {
  loading: 'loading',
  entry: 'entry',
  gallery: 'gallery',
  vault: 'vault',
  cloud: 'cloud',
  journey: 'journey',
  ar: 'ar',
  error: 'error',
  paused: 'paused',
};

const validTransitions = {
  loading: ['entry', 'gallery', 'error'],
  entry: ['gallery', 'error'],
  gallery: ['vault', 'cloud', 'journey', 'ar', 'paused', 'error'],
  vault: ['gallery', 'paused', 'error'],
  cloud: ['gallery', 'paused', 'error'],
  journey: ['gallery', 'paused', 'error'],
  ar: ['gallery', 'paused', 'error'],
  paused: ['gallery', 'vault', 'cloud', 'journey', 'ar'],
  error: ['entry', 'gallery'],
};

export function canTransition(fromState, toState) {
  return Boolean(validTransitions[fromState]?.includes(toState));
}
