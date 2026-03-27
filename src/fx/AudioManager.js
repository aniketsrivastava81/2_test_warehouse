export class AudioManager {
  constructor() {
    this.ctx = null;
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }

  beep({ frequency = 440, duration = 0.08, type = 'sine', gain = 0.025, ramp = 'exp' }) {
    if (!this.ctx) return;
    const time = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const amp = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, time);
    amp.gain.setValueAtTime(0.0001, time);
    if (ramp == 'linear') amp.gain.linearRampToValueAtTime(gain, time + 0.01);
    else amp.gain.exponentialRampToValueAtTime(gain, time + 0.01);
    amp.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    osc.connect(amp).connect(this.ctx.destination);
    osc.start(time);
    osc.stop(time + duration + 0.02);
  }

  snap() {
    this.beep({ frequency: 620, duration: 0.06, type: 'square', gain: 0.028 });
    window.setTimeout(() => this.beep({ frequency: 820, duration: 0.05, type: 'triangle', gain: 0.018 }), 36);
  }

  invalid() {
    this.beep({ frequency: 180, duration: 0.12, type: 'sawtooth', gain: 0.02 });
    window.setTimeout(() => this.beep({ frequency: 120, duration: 0.1, type: 'sawtooth', gain: 0.018 }), 56);
  }

  select() {
    this.beep({ frequency: 520, duration: 0.05, type: 'triangle', gain: 0.016 });
  }

  combo(multiplier = 2) {
    this.beep({ frequency: 700 + multiplier * 60, duration: 0.06, type: 'triangle', gain: 0.02 });
  }

  warning() {
    this.beep({ frequency: 260, duration: 0.1, type: 'square', gain: 0.02, ramp: 'linear' });
  }

  levelClear() {
    this.beep({ frequency: 660, duration: 0.08, type: 'triangle', gain: 0.02 });
    window.setTimeout(() => this.beep({ frequency: 880, duration: 0.12, type: 'triangle', gain: 0.022 }), 80);
  }

  finish() {
    this.levelClear();
    window.setTimeout(() => this.beep({ frequency: 1120, duration: 0.16, type: 'triangle', gain: 0.026 }), 180);
  }
}
