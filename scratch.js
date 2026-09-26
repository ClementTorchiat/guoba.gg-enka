import { calculateCharacterScore } from './src/scripts/scoring.js';
const perso = {
  isSimulation: false,
  buffedStats: { cr: 101.2 },
  artefacts: [
    { type: "EQUIP_BRACER", stars: 5, setKey: "Test", mainStat: { key: "hp" }, subStats: [] }
  ]
};
const config = {
  weights: { "critRate_": 1.0 }
};
const result = calculateCharacterScore(perso, config, 45);
console.log("Result:", result);
