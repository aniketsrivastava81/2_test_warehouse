export function formatTime(seconds) {
  const safe = Math.max(0, Math.ceil(seconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function getRank(score) {
  if (score >= 26000) return 'S';
  if (score >= 19000) return 'A';
  if (score >= 13000) return 'B';
  return 'C';
}
