import { GAME_CONFIG } from '../utils/constants.js';
import { PALLET_TYPE_KEYS } from './palletTypes.js';

const bayXs = [2.1, 4.85, 7.6, 10.35];
const bayZs = [-14.2, -8.0, -1.8, 4.4, 10.6];
const stageXs = [-8.7, -6.0, -3.3, -0.6];
const stageZs = [-14.3, -8.0, -1.7, 4.6, 10.9];

const slotPairs = [];
for (let r = 0; r < bayZs.length; r += 1) {
  for (let c = 0; c < bayXs.length; c += 1) {
    slotPairs.push({
      bay: [bayXs[c], GAME_CONFIG.PALLET_Y, bayZs[r]],
      stage: [stageXs[c], GAME_CONFIG.PALLET_Y, stageZs[(r + c) % stageZs.length]]
    });
  }
}

function makeSequence(count, typeKeys, offset = 0) {
  const sequence = [];
  for (let i = 0; i < count; i += 1) sequence.push(typeKeys[(i + offset) % typeKeys.length]);
  return sequence;
}

function buildLevel({ id, label, count, timeLimit, speed, penalty, multiplier, offset = 0, typeCount = 5 }) {
  const types = PALLET_TYPE_KEYS.slice(0, typeCount);
  const sequence = makeSequence(count, types, offset);
  const bays = slotPairs.slice(0, count).map((slot, index) => ({
    id: `${id}-bay-${index + 1}`,
    slotCode: `M${Math.floor(index / 4) + 1}-${(index % 4) + 1}`,
    type: sequence[(index * 3 + offset) % sequence.length],
    position: slot.bay
  }));

  const countsByType = new Map();
  bays.forEach((bay) => countsByType.set(bay.type, (countsByType.get(bay.type) ?? 0) + 1));

  const pallets = [];
  let idCounter = 1;
  bays.forEach((bay, index) => {
    const stage = slotPairs[(index * 5 + 3) % slotPairs.length].stage;
    pallets.push({
      id: `${id}-p${idCounter++}`,
      type: bay.type,
      position: stage,
      brandWrap: ((index * 7 + offset) % 5) < 2,
      variant: index % 4
    });
  });

  return {
    id,
    label,
    count,
    timeLimit,
    penalty,
    multiplier,
    speed,
    bays,
    pallets,
    typeCount,
    typeKeys: types,
    speedLabel: `${Math.round((speed.bridge / 16) * 100)}% bridge · ${Math.round((speed.hoist / 8) * 100)}% hoist`
  };
}

export const levels = [
  buildLevel({
    id: 'level01',
    label: 'Level 1 — Redline Intake',
    count: 12,
    timeLimit: 34,
    penalty: 2,
    multiplier: 1,
    offset: 1,
    typeCount: 5,
    speed: { bridge: 16, trolley: 18, hoist: 8 }
  }),
  buildLevel({
    id: 'level02',
    label: 'Level 2 — Cross-Aisle Jam',
    count: 14,
    timeLimit: 38,
    penalty: 3,
    multiplier: 1.15,
    offset: 3,
    typeCount: 5,
    speed: { bridge: 13.2, trolley: 15.5, hoist: 7 }
  }),
  buildLevel({
    id: 'level03',
    label: 'Level 3 — Slow Hoist Window',
    count: 16,
    timeLimit: 42,
    penalty: 4,
    multiplier: 1.3,
    offset: 5,
    typeCount: 6,
    speed: { bridge: 10.8, trolley: 12.5, hoist: 6 }
  }),
  buildLevel({
    id: 'level04',
    label: 'Level 4 — Final Dispatch Crush',
    count: 18,
    timeLimit: 48,
    penalty: 5,
    multiplier: 1.5,
    offset: 2,
    typeCount: 6,
    speed: { bridge: 8.7, trolley: 10.2, hoist: 5.1 }
  })
];
