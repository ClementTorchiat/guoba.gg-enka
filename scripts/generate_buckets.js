import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '..', 'data');
const charsDir = path.join(dataDir, 'characters');
const srcDataDir = path.join(__dirname, '..', 'src', 'data');

if (!fs.existsSync(srcDataDir)) {
  fs.mkdirSync(srcDataDir, { recursive: true });
}

// 1. Calcul des ER Buckets
const ER_BUCKETS_BY_LEADERBOARD = {};
const charFiles = fs.readdirSync(charsDir).filter(f => f.endsWith('.json'));

for (const file of charFiles) {
  const content = JSON.parse(fs.readFileSync(path.join(charsDir, file), 'utf-8'));
  if (content.builds) {
    for (const [buildName, buildData] of Object.entries(content.builds)) {
      const lbId = buildData.leaderboard_id || buildName;
      if (!ER_BUCKETS_BY_LEADERBOARD[lbId]) {
        ER_BUCKETS_BY_LEADERBOARD[lbId] = [];
      }
      if (buildData.er_req) {
        if (!ER_BUCKETS_BY_LEADERBOARD[lbId].includes(buildData.er_req)) {
          ER_BUCKETS_BY_LEADERBOARD[lbId].push(buildData.er_req);
        }
      }
    }
  }
}

for (const lbId in ER_BUCKETS_BY_LEADERBOARD) {
  const sortedErReqs = [...ER_BUCKETS_BY_LEADERBOARD[lbId]].sort((a, b) => b - a);
  let otherErs = [];
  const lowestEr = sortedErReqs.length > 0 ? sortedErReqs[sortedErReqs.length - 1] : null;
  
  if (lowestEr) {
    for (let i = 1; i <= 3; i++) {
      const nextEr = lowestEr - 10 * i;
      if (nextEr >= 100) otherErs.push(nextEr);
    }
  }
  if (!sortedErReqs.includes(100) && !otherErs.includes(100)) {
    otherErs.push(100);
  }
  
  ER_BUCKETS_BY_LEADERBOARD[lbId] = [...sortedErReqs, ...otherErs].sort((a, b) => b - a);
}

fs.writeFileSync(path.join(srcDataDir, 'er_buckets.json'), JSON.stringify(ER_BUCKETS_BY_LEADERBOARD, null, 2));
console.log('✅ er_buckets.json a été généré avec succès !');
