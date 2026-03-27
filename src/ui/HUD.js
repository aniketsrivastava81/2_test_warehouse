import { formatTime, getRank } from '../utils/helpers.js';

export class HUD {
  constructor(root) {
    this.root = root;
    this.build();
  }

  build() {
    this.shellOverlay = document.createElement('div');
    this.shellOverlay.className = 'shell-overlay';
    this.root.appendChild(this.shellOverlay);

    this.container = document.createElement('div');
    this.container.className = 'hud';
    this.container.innerHTML = `
      <div class="hud__brand">
        <span class="hud__eyebrow">Interactive warehouse logistics challenge</span>
        <span class="hud__title">Megha Mehta Real Estate</span>
        <span class="hud__sub">Tap pallet, tap matching bay. Overhead crane travel is part of the timer. Four escalating levels. Mobile-friendly by design.</span>
      </div>

      <div class="hud__top">
        <div class="hud-card"><span class="hud-label">Level</span><strong class="hud-value" data-level>1 / 4</strong></div>
        <div class="hud-card"><span class="hud-label">Timer</span><strong class="hud-value" data-time>0:00</strong></div>
        <div class="hud-card"><span class="hud-label">Score</span><strong class="hud-value" data-score>0</strong></div>
        <div class="hud-card"><span class="hud-label">Progress</span><strong class="hud-value" data-progress>0 / 0</strong></div>
        <div class="hud-card"><span class="hud-label">Crane Speed</span><strong class="hud-value hud-value--good" data-speed>100%</strong></div>
      </div>

      <div class="hud__combo" data-combo>Perfect lift x2</div>

      <div class="hud__bottom">
        <div class="hud__panel"><strong>Controls:</strong> Tap or click any pallet to lock it to the crane. Then tap a matching color bay. Wrong bay taps cut time immediately.</div>
        <div class="hud__panel hud__panel--right" data-status><strong>Status:</strong> waiting for shift start.</div>
      </div>
    `;
    this.root.appendChild(this.container);

    this.levelEl = this.container.querySelector('[data-level]');
    this.timeEl = this.container.querySelector('[data-time]');
    this.scoreEl = this.container.querySelector('[data-score]');
    this.progressEl = this.container.querySelector('[data-progress]');
    this.speedEl = this.container.querySelector('[data-speed]');
    this.statusEl = this.container.querySelector('[data-status]');
    this.comboEl = this.container.querySelector('[data-combo]');

    this.startOverlay = this.createOverlay({
      title: 'Crane Rush',
      subtitle: 'Immediate stress mode',
      body: `
        <p>The room is fuller, the crane is slower every level, and the timer never waits. This version is built to inherit the warehouse shell, interior mood, and rack language from your uploaded base file while shifting gameplay to tap-based crane routing.</p>
        <ul>
          <li>4 escalating levels</li>
          <li>60 routed pallets in a full clean run</li>
          <li>Random Megha Mehta Real Estate branded wraps</li>
        </ul>
      `,
      actions: `<button class="button" data-action="start">Start the shift</button>`
    });

    this.endOverlay = this.createOverlay({
      title: 'Shift complete',
      subtitle: 'Results',
      body: `
        <p data-summary>The crane window is closed.</p>
        <div class="results-grid">
          <div class="results-card"><span class="results-card__label">Score</span><span class="results-card__value" data-result-score>0</span></div>
          <div class="results-card"><span class="results-card__label">Rank</span><span class="results-card__value" data-result-rank>C</span></div>
          <div class="results-card"><span class="results-card__label">Accuracy</span><span class="results-card__value" data-result-accuracy>0%</span></div>
          <div class="results-card"><span class="results-card__label">Perfect</span><span class="results-card__value" data-result-perfect>0</span></div>
        </div>
      `,
      actions: `
        <button class="button" data-action="continue" hidden>Continue</button>
        <button class="button" data-action="restart">Restart full run</button>
        <button class="button button--secondary" data-action="close">Close</button>
      `
    });
    this.endOverlay.hidden = true;

    this.endSummaryEl = this.endOverlay.querySelector('[data-summary]');
    this.endScoreEl = this.endOverlay.querySelector('[data-result-score]');
    this.endRankEl = this.endOverlay.querySelector('[data-result-rank]');
    this.endAccuracyEl = this.endOverlay.querySelector('[data-result-accuracy]');
    this.endPerfectEl = this.endOverlay.querySelector('[data-result-perfect]');
    this.continueBtn = this.endOverlay.querySelector('[data-action="continue"]');
  }

  createOverlay({ title, subtitle, body, actions }) {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
      <div class="overlay__panel">
        <span class="eyebrow">${subtitle}</span>
        <h1>${title}</h1>
        ${body}
        <div class="overlay__actions">${actions}</div>
      </div>
    `;
    this.root.appendChild(overlay);
    return overlay;
  }

  on(action, handler) {
    this.root.addEventListener('click', (event) => {
      const trigger = event.target.closest(`[data-action="${action}"]`);
      if (trigger) handler(event);
    });
  }

  update(state) {
    this.levelEl.textContent = `${state.currentLevelIndex + 1} / ${state.totalLevels}`;
    this.timeEl.textContent = formatTime(state.timeLeft);
    this.scoreEl.textContent = String(state.score);
    this.progressEl.textContent = `${state.placedCount} / ${state.totalCount}`;
    this.speedEl.textContent = state.craneSpeedLabel;
    this.statusEl.innerHTML = `<strong>Status:</strong> ${state.statusText}`;

    this.timeEl.classList.remove('hud-value--warn', 'hud-value--danger');
    if (state.timeLeft <= 10) this.timeEl.classList.add('hud-value--warn');
    if (state.timeLeft <= 5) this.timeEl.classList.add('hud-value--danger');
  }

  showCombo(text) {
    this.comboEl.textContent = text;
    this.comboEl.classList.add('is-visible');
    window.clearTimeout(this.comboTimeout);
    this.comboTimeout = window.setTimeout(() => this.comboEl.classList.remove('is-visible'), 680);
  }

  showStart() { this.startOverlay.hidden = false; }
  hideStart() { this.startOverlay.hidden = true; }

  showEnd(state, { didWin, isSessionWin, nextLevel = null }) {
    this.endOverlay.hidden = false;
    this.endScoreEl.textContent = String(state.score);
    this.endRankEl.textContent = getRank(state.score);
    this.endAccuracyEl.textContent = `${Math.round(state.accuracy)}%`;
    this.endPerfectEl.textContent = String(state.perfectDrops);
    const heading = this.endOverlay.querySelector('h1');

    if (!didWin) {
      heading.textContent = 'Dispatch window missed';
      this.endSummaryEl.textContent = 'The timer expired before the crane cleared the floor. Restart the run and route faster.';
      this.continueBtn.hidden = true;
      return;
    }

    if (!isSessionWin) {
      heading.textContent = 'Level cleared';
      this.endSummaryEl.textContent = `Good. ${nextLevel?.label ?? 'Next level'} is slower and denser. Keep the score and continue.`;
      this.continueBtn.hidden = false;
      this.continueBtn.textContent = `Continue to ${nextLevel?.label ?? 'next level'}`;
      return;
    }

    heading.textContent = 'Full run cleared';
    this.endSummaryEl.textContent = 'All four levels cleared. This version is ready for longer dwell time, harder routing, and cleaner short-form captures.';
    this.continueBtn.hidden = true;
  }

  hideEnd() { this.endOverlay.hidden = true; }
}
