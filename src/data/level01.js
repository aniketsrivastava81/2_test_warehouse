import { GAME_CONFIG } from '../utils/constants.js';

const { PALLET_Y } = GAME_CONFIG;

export const level01 = {
  id: 'level01',
  label: 'End of Shift — Bay Sort Challenge',
  timeLimit: 24,
  bays: [
    { id: 'bay-blue-1', type: 'blue', position: [7.8, PALLET_Y, -5.4] },
    { id: 'bay-blue-2', type: 'blue', position: [7.8, PALLET_Y, -2.0] },
    { id: 'bay-yellow-1', type: 'yellow', position: [7.8, PALLET_Y, 1.4] },
    { id: 'bay-yellow-2', type: 'yellow', position: [7.8, PALLET_Y, 4.8] },
    { id: 'bay-green-1', type: 'green', position: [11.6, PALLET_Y, -5.4] },
    { id: 'bay-green-2', type: 'green', position: [11.6, PALLET_Y, -2.0] },
    { id: 'bay-red-1', type: 'red', position: [11.6, PALLET_Y, 1.4] },
    { id: 'bay-red-2', type: 'red', position: [11.6, PALLET_Y, 4.8] },
    { id: 'bay-blue-3', type: 'blue', position: [15.4, PALLET_Y, -5.4] },
    { id: 'bay-yellow-3', type: 'yellow', position: [15.4, PALLET_Y, -2.0] },
    { id: 'bay-green-3', type: 'green', position: [15.4, PALLET_Y, 1.4] },
    { id: 'bay-red-3', type: 'red', position: [15.4, PALLET_Y, 4.8] }
  ],
  pallets: [
    { id: 'p1', type: 'blue', position: [-7.3, PALLET_Y, -5.2] },
    { id: 'p2', type: 'yellow', position: [-5.1, PALLET_Y, -5.8] },
    { id: 'p3', type: 'red', position: [-7.6, PALLET_Y, -2.6] },
    { id: 'p4', type: 'green', position: [-4.9, PALLET_Y, -2.1] },
    { id: 'p5', type: 'blue', position: [-7.5, PALLET_Y, 0.8] },
    { id: 'p6', type: 'yellow', position: [-4.5, PALLET_Y, 0.4] },
    { id: 'p7', type: 'green', position: [-7.2, PALLET_Y, 3.6] },
    { id: 'p8', type: 'red', position: [-4.6, PALLET_Y, 3.4] },
    { id: 'p9', type: 'yellow', position: [-6.8, PALLET_Y, 6.2] },
    { id: 'p10', type: 'green', position: [-3.7, PALLET_Y, 6.3] },
    { id: 'p11', type: 'blue', position: [-1.8, PALLET_Y, -0.8] },
    { id: 'p12', type: 'red', position: [-1.2, PALLET_Y, 2.4] }
  ]
};
