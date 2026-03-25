export class TimerManager {
  constructor(state, onExpire) {
    this.state = state;
    this.onExpire = onExpire;
    this.enabled = false;
  }

  start(seconds) {
    this.state.timeLeft = seconds;
    this.enabled = true;
  }

  stop() {
    this.enabled = false;
  }

  update(delta) {
    if (!this.enabled) return;
    this.state.timeLeft = Math.max(0, this.state.timeLeft - delta);
    if (this.state.timeLeft <= 0) {
      this.enabled = false;
      this.onExpire?.();
    }
  }

  addPenalty(seconds) {
    this.state.timeLeft = Math.max(0, this.state.timeLeft - seconds);
  }
}
