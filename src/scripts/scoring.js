// src/scripts/scoring.js
import { BASE_ROLLS, MAX_ROLLS, BASE_ROLLS_4, MAX_ROLLS_4 } from './data.js';
import { t } from './i18n.js';
import KEY_TO_FIGHT_PROP_JSON from '../data/key_to_fight_prop.json';
import ROLL_TABLE_JSON from '../data/rollTable.json';
import SLOT_POSSIBLE_MAIN_STATS_JSON from '../data/slot_possible_main_stats.json';
import SUBSTAT_RANGES_JSON from '../data/substat_ranges.json';
import STAT_LABELS_JSON from '../data/stat_labels.json';

export const SCORING_NORMS = {
    "critRate_": 2, "critDMG_": 1,
    "atk_": 1.33, "atk": 0.40,
    "hp_": 1.33, "hp": 0.03,
    "def_": 1.06, "def": 0.33,
    "eleMas": 0.33, "enerRech_": 1.2,
    "pyro_dmg_": 1.33, "hydro_dmg_": 1.33, "cryo_dmg_": 1.33, "geo_dmg_": 1.33, "anemo_dmg_": 1.33, "electro_dmg_": 1.33, "dendro_dmg_": 1.33, "physical_dmg_": 1.06, "heal_": 1.33
};

export const MAINSTAT_BASE_VALUE = 62.2;
export const MAINSTAT_ROLL_VALUE = 7.776;
export const VARIABLE_PIECES = ["EQUIP_SHOES", "EQUIP_RING", "EQUIP_DRESS"];

const FLAT_STAT_KEYS = new Set(['hp', 'atk', 'def', 'eleMas']);
const _rollDetailsCache = new Map();

export function getRollDetails(key, value, rarity = 5) {
    const cacheKey = `${key}|${value}|${rarity}`;
    if (_rollDetailsCache.has(cacheKey)) return _rollDetailsCache.get(cacheKey);

    const keyToProp = (typeof window !== 'undefined' && window.KEY_TO_FIGHT_PROP) ? window.KEY_TO_FIGHT_PROP : KEY_TO_FIGHT_PROP_JSON;
    const rollTable = (typeof window !== 'undefined' && window.ROLL_TABLE) ? window.ROLL_TABLE : ROLL_TABLE_JSON;

    const fightProp = keyToProp ? keyToProp[key] : null;
    const table = rollTable ? rollTable[String(rarity)]?.[fightProp] : null;

    if (table) {
        const lookupKey = FLAT_STAT_KEYS.has(key)
            ? String(Math.round(value))
            : String(parseFloat(value.toFixed(1)));

        const entry = table[lookupKey];
        if (entry && entry[0]) {
            const rawRolls = entry[0];
            const rolls = FLAT_STAT_KEYS.has(key)
                ? rawRolls
                : rawRolls.map(r => parseFloat((r * 100).toFixed(2)));

            const result = { k: rolls.length, rolls };
            _rollDetailsCache.set(cacheKey, result);
            return result;
        }
    }

    const baseRollsDef = rarity === 4
        ? ((typeof window !== 'undefined' && window.BASE_ROLLS_4) ? window.BASE_ROLLS_4 : BASE_ROLLS_4)
        : ((typeof window !== 'undefined' && window.BASE_ROLLS) ? window.BASE_ROLLS : BASE_ROLLS);

    if (!baseRollsDef || !baseRollsDef[key]) {
        return { k: 1, rolls: [value] };
    }

    const possibleRolls = baseRollsDef[key];
    let bestMatch = { k: 1, diff: Infinity, rolls: [value] };

    function checkCombinations(k, currentSum, startIndex, depth, currentRolls) {
        if (depth === k) {
            const diff = Math.abs(currentSum - value);
            if (diff < bestMatch.diff) {
                bestMatch = { k, diff, rolls: [...currentRolls] };
            }
            return;
        }
        for (let i = startIndex; i < 4; i++) {
            currentRolls.push(possibleRolls[i]);
            checkCombinations(k, currentSum + possibleRolls[i], i, depth + 1, currentRolls);
            currentRolls.pop();
        }
    }

    for (let k = 1; k <= 6; k++) {
        checkCombinations(k, 0, 0, 0, []);
        if (bestMatch.diff < 0.15) break;
    }

    _rollDetailsCache.set(cacheKey, bestMatch);
    return bestMatch;
}

export function getRollCount(key, value, rarity = 5) {
    return getRollDetails(key, value, rarity).k;
}

export function calculateCharacterScore(perso, config, maxRolls = 45.0) {
    if (!config || !config.weights) {
        return { score: 0, grade: { letter: "?", color: "#888" }, totalRolls: 0 };
    }

    let totalScore = 0;
    let totalRolls = 0;
    const setsCounter = {};

    perso.artefacts.forEach(art => {
        if ((art.stars || 5) < 4) {
            art.score = 0;
            art.grade = { letter: '—', color: '#6b7280', points: 0 };
            return;
        }
        const powerResult = scoreArtifact(art, config.weights);
        art.score = powerResult.score;

        const qualityPoints = calculateArtifactRollQuality(art, config.weights);
        const availableWeights = Object.entries(config.weights)
            .filter(([k, w]) => w > 0 && k !== art.mainStat.key && !k.includes("_dmg_") && k !== "heal_" && k !== "physical_dmg_")
            .map(entry => entry[1])
            .sort((a, b) => b - a);

        let maxPiecePoints = 9.0;
        if (availableWeights.length > 0) {
            maxPiecePoints = 0;
            const top = availableWeights.slice(0, 4);
            maxPiecePoints += top[0] * 6;
            for (let i = 1; i < top.length; i++) {
                maxPiecePoints += top[i] * 1;
            }
        }

        const gradeLetter = getGradeFromPoints(qualityPoints, maxPiecePoints);

        art.grade = {
            letter: gradeLetter,
            color: getGradeColor(gradeLetter),
            points: qualityPoints
        };

        totalScore += art.score;
        totalRolls += qualityPoints;

        if (VARIABLE_PIECES.includes(art.type)) {
            const mainStatBonus = calculateMainStatBonus(art, config.weights, config.idealMainStats);
            totalScore += mainStatBonus;
        }

        if (art.setKey) {
            setsCounter[art.setKey] = (setsCounter[art.setKey] || 0) + 1;
        }
    });

    let overcapScorePenalty = 0;
    let overcapRollsPenalty = 0;

    if (!perso.isSimulation && perso.buffedStats && perso.buffedStats.cr > 100 && config.weights["critRate_"] > 0) {
        const excessCR = perso.buffedStats.cr - 100;
        const crWeight = config.weights["critRate_"];

        overcapScorePenalty = excessCR * crWeight * (SCORING_NORMS["critRate_"] || 2);

        const currentMaxRolls = (typeof window !== 'undefined' && window.MAX_ROLLS) ? window.MAX_ROLLS : MAX_ROLLS;
        const maxCrRoll = currentMaxRolls["critRate_"] || 3.89;
        overcapRollsPenalty = (excessCR / maxCrRoll) * crWeight;

        totalScore -= overcapScorePenalty;
        totalRolls -= overcapRollsPenalty;

        if (totalScore < 0) totalScore = 0;
        if (totalRolls < 0) totalRolls = 0;
    }

    let setMultiplier = 0.65;
    let activeBonuses = [];
    for (const [setKey, count] of Object.entries(setsCounter)) {
        if (count >= 4) activeBonuses.push(`${setKey}:4`);
        else if (count >= 2) activeBonuses.push(`${setKey}:2`);
    }

    const active4p = activeBonuses.filter(b => b.endsWith(":4"));
    const active2p  = activeBonuses.filter(b => b.endsWith(":2"));

    let isBest = false;
    let isGood = false;

    if (active4p.some(b => config.bestSets && config.bestSets.includes(b))) isBest = true;
    else if (active4p.some(b => config.goodSets && config.goodSets.includes(b))) isGood = true;

    if (!isBest && !isGood && active2p.length >= 2) {
        const allInBest       = active2p.every(b => config.bestSets && config.bestSets.includes(b));
        const allInBestOrGood = active2p.every(b => (config.bestSets && config.bestSets.includes(b)) || (config.goodSets && config.goodSets.includes(b)));

        if (allInBest)            isBest = true;
        else if (allInBestOrGood) isGood = true;
    }

    if (isBest)      setMultiplier = 1.0;
    else if (isGood) setMultiplier = 0.85;

    const finalScore = parseFloat((totalScore * setMultiplier).toFixed(1));

    return {
        score: finalScore,
        grade: getGlobalGrade(totalRolls, maxRolls),
        setBonus: activeBonuses,
        setMultiplier: setMultiplier,
        totalRolls: totalRolls.toFixed(1),
        overcapPenalty: parseFloat((overcapScorePenalty * setMultiplier).toFixed(1))
    };
}

export function calculateMainStatBonus(artifact, weights, idealMainStats) {
    let key = artifact.mainStat.key;
    if (idealMainStats && idealMainStats[artifact.type] && idealMainStats[artifact.type].includes(key)) {
        return MAINSTAT_BASE_VALUE * 1;
    }
    let w = weights[key];
    if (w === undefined && key.includes("_dmg_")) {
        w = weights["elemental_dmg_"];
    }
    w = w || 0;
    if (w > 0) return MAINSTAT_BASE_VALUE * w;
    return 0;
}

export function scoreArtifact(artifact, weights) {
    let score = 0;
    let mainWeight = weights[artifact.mainStat.key];
    if (mainWeight === undefined && artifact.mainStat.key.includes("_dmg_")) { mainWeight = weights["elemental_dmg_"]; }
    mainWeight = mainWeight || 0;

    if (mainWeight > 0) {
        score += MAINSTAT_ROLL_VALUE * (SCORING_NORMS[artifact.mainStat.key] || 1) * mainWeight;
    }

    artifact.subStats.forEach(sub => {
        let w = weights[sub.key];
        if (w === undefined && sub.key.includes("_dmg_")) w = weights["elemental_dmg_"];
        w = w || 0;
        if (w > 0) {
            score += sub.value * w * (SCORING_NORMS[sub.key] || 0);
        }
    });
    return { score: parseFloat(score.toFixed(1)) };
}

export function calculateArtifactRollQuality(artifact, weights) {
    const currentMaxRolls4 = (typeof window !== 'undefined' && window.MAX_ROLLS_4) ? window.MAX_ROLLS_4 : MAX_ROLLS_4;
    const currentMaxRolls = (typeof window !== 'undefined' && window.MAX_ROLLS) ? window.MAX_ROLLS : MAX_ROLLS;
    const maxRollsRef = (artifact.stars === 4 && currentMaxRolls4)
        ? currentMaxRolls4
        : currentMaxRolls;
    let points = 0;
    artifact.subStats.forEach(sub => {
        let w = weights[sub.key];
        if (w === undefined && sub.key.includes("_dmg_")) w = weights["elemental_dmg_"];
        w = w || 0;
        if (w > 0) {
            const maxRoll = (maxRollsRef && maxRollsRef[sub.key]) || 9999;
            points += (sub.value / maxRoll) * w;
        }
    });
    return parseFloat(points.toFixed(1));
}

export function getGradeFromPoints(pts, maxPossiblePts = 9.0) {
    const labels = [
        "F", "F+", "D", "D+", "C", "C+", "B", "B+", "A", "A+",
        "S", "S+", "SS", "SS+", "SSS", "SSS+", "WTF", "WTF+", "ARCHON"
    ];
    const steps = labels.length - 1;
    const interval = maxPossiblePts / steps;

    for (let i = steps; i >= 0; i--) {
        const threshold = i * interval;
        if (pts >= threshold - 0.05) {
            return labels[i];
        }
    }
    return "F";
}

export function getGlobalGrade(pts, maxPossibleRolls = 45.0) {
    if (maxPossibleRolls <= 0 || pts <= 0 && maxPossibleRolls < 1) {
        return { letter: "Bro...", color: getGradeColor("F") };
    }
    const labels = [
        "F", "F+", "D", "D+", "C", "C+", "B", "B+", "A", "A+",
        "S", "S+", "SS", "SS+", "SSS", "SSS+", "WTF", "WTF+", "ARCHON"
    ];

    const steps = labels.length - 1;
    const interval = maxPossibleRolls / steps;

    for (let i = steps; i >= 0; i--) {
        const threshold = i * interval;
        if (pts >= threshold - 0.05) {
            return { letter: labels[i], color: getGradeColor(labels[i]) };
        }
    }
    return { letter: "F", color: getGradeColor("F") };
}

export function getGradeColor(grade) {
    if (grade.includes("ARCHON")) return "#00FFFF";
    if (grade.includes("WTF")) return "#FF0080";
    if (grade.includes("SSS")) return "#FF4500";
    if (grade.includes("SS")) return "#FFA500";
    if (grade.includes("S")) return "#FFD700";
    if (grade.includes("A")) return "#C66EFF";
    if (grade.includes("B")) return "#4D94FF";

    return "#aaa";
}

export function generateScoreBar(totalRolls, currentGrade, maxPossibleRolls = 45) {
    if (maxPossibleRolls <= 0) maxPossibleRolls = 45;
    const maxScale = maxPossibleRolls || 45;
    const percent = Math.min((totalRolls / maxScale) * 100, 100);

    const labels = [
        "F", "F+", "D", "D+", "C", "C+", "B", "B+", "A", "A+",
        "S", "S+", "SS", "SS+", "SSS", "SSS+", "WTF", "WTF+", `ARCHON (${maxScale})`
    ];

    const steps = labels.length - 1;
    const interval = maxScale / steps;

    let markers = labels.map((label, index) => ({
        val: parseFloat((index * interval).toFixed(2)),
        label: label
    }));

    let markersHtml = "";
    markers.forEach(m => {
        const left = (m.val / maxScale) * 100;
        markersHtml += `<div class="score-marker" style="left: ${left}%;">${m.label}</div>`;
    });

    return `
        <div class="score-bar-container">
            <div class="score-bar-track">
                ${markersHtml}
                <div class="score-cursor" style="left: ${percent}%;">
                    <div class="score-cursor-label" style="background:none; padding:0; border:none; box-shadow:none; display:flex; align-items:baseline; gap:6px; white-space:nowrap; transform: translateX(-50%); bottom: 25px;">
                        <span style="font-size:1.2rem; font-weight:800; color:var(--accent-gold); line-height:1;">${currentGrade}</span>
                        <span style="font-size:0.85rem; color:#ddd;">(${totalRolls} Rolls)</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function calculateMaxTheoreticalScore(persoObj, config) {
    const maxRolls = (typeof window !== 'undefined' && window.MAX_ROLLS) ? window.MAX_ROLLS : MAX_ROLLS;
    const slotMains = (typeof window !== 'undefined' && window.SLOT_POSSIBLE_MAIN_STATS) ? window.SLOT_POSSIBLE_MAIN_STATS : SLOT_POSSIBLE_MAIN_STATS_JSON;
    const statLabels = (typeof window !== 'undefined' && window.STAT_LABELS) ? window.STAT_LABELS : STAT_LABELS_JSON;

    if (!config || !config.weights || !maxRolls) {
        return { score: 100, totalRolls: 45 };
    }

    const forbiddenSubStats = ["heal_", "physical_dmg_"];

    const sortedSubWeights = Object.entries(config.weights)
        .filter(([key, w]) => w > 0 && !key.includes("_dmg_") && !forbiddenSubStats.includes(key))
        .sort((a, b) => b[1] - a[1]);

    if (sortedSubWeights.length === 0) return { score: 0, totalRolls: 0 };

    let maxTotalRolls = 0;

    let perfectArtefacts = (persoObj.artefacts || []).map(art => {
        let idealMainStatKey = art.mainStat ? art.mainStat.key : "hp";

        if (art.type === "EQUIP_BRACER") {
            idealMainStatKey = "hp";
        } else if (art.type === "EQUIP_NECKLACE") {
            idealMainStatKey = "atk";
        } else {
            if (config.idealMainStats && config.idealMainStats[art.type] && config.idealMainStats[art.type].length > 0) {
                idealMainStatKey = config.idealMainStats[art.type][0];
            } else {
                const possibleMains = slotMains[art.type] || [];
                let bestW = -1;
                possibleMains.forEach(stat => {
                    let w = config.weights[stat];
                    if (w === undefined && stat.includes("_dmg_")) w = config.weights["elemental_dmg_"];
                    w = w || 0;
                    if (w > bestW) {
                        bestW = w;
                        idealMainStatKey = stat;
                    }
                });
            }
        }

        const perfectMainStat = {
            key: idealMainStatKey,
            value: 0,
            label: statLabels[idealMainStatKey] || idealMainStatKey
        };

        const availableStats = sortedSubWeights.filter(sw => sw[0] !== perfectMainStat.key);
        const topStats = availableStats.slice(0, 4);
        let fakeSubStats = [];

        if (topStats.length > 0) {
            const bestStat = topStats[0];
            fakeSubStats.push({
                key: bestStat[0],
                value: (maxRolls[bestStat[0]] || 3.89) * 6
            });
            maxTotalRolls += 6;

            for (let i = 1; i < topStats.length; i++) {
                fakeSubStats.push({
                    key: topStats[i][0],
                    value: (maxRolls[topStats[i][0]] || 3.89) * 1
                });
                maxTotalRolls += 1;
            }
        }

        return { ...art, subStats: fakeSubStats, mainStat: perfectMainStat };
    });

    let fakePerso = { ...persoObj, artefacts: perfectArtefacts, isSimulation: true };
    let simulation = calculateCharacterScore(fakePerso, config);

    return {
        score: parseFloat((simulation.score / (simulation.setMultiplier || 1)).toFixed(1)),
        totalRolls: parseFloat(simulation.totalRolls)
    };
}

export function calculateRollDistribution(persoObj, config) {
    const statLabels = (typeof window !== 'undefined' && window.STAT_LABELS) ? window.STAT_LABELS : STAT_LABELS_JSON;
    if (!config || !config.weights) return { usefulCount: 0, deadCount: 0, total: 0, usefulDetails: [], deadDetails: [] };

    let usefulCount = 0;
    let deadCount = 0;
    let usefulMap = {};
    let deadMap = {};

    (persoObj.artefacts || []).forEach(art => {
        (art.subStats || []).forEach(sub => {
            let w = config.weights[sub.key];
            if (w === undefined && sub.key.includes("_dmg_")) w = config.weights["elemental_dmg_"];

            const rolls = getRollCount(sub.key, sub.value, art.stars || 5);

            if (rolls > 0) {
                if (w && w > 0) {
                    usefulCount += rolls;
                    usefulMap[sub.key] = (usefulMap[sub.key] || 0) + rolls;
                } else {
                    deadCount += rolls;
                    deadMap[sub.key] = (deadMap[sub.key] || 0) + rolls;
                }
            }
        });
    });

    const toSortedArray = (map) => {
        return Object.entries(map)
            .map(([key, count]) => ({
                label: t('stat.' + key),
                count: count,
                key: key
            }))
            .sort((a, b) => b.count - a.count);
    };

    return {
        usefulCount,
        deadCount,
        total: usefulCount + deadCount,
        usefulDetails: toSortedArray(usefulMap),
        deadDetails: toSortedArray(deadMap)
    };
}

export function calculateDeadRolls(persoObj, config) {
    if (!config || !config.weights) return { count: 0, details: [] };
    let deadRolls = 0;
    let deadStatsCounts = {};
    (persoObj.artefacts || []).forEach(art => {
        (art.subStats || []).forEach(sub => {
            let w = config.weights[sub.key];
            if (w === undefined && sub.key.includes("_dmg_")) w = config.weights["elemental_dmg_"];
            if (!w || w === 0) {
                const rolls = getRollCount(sub.key, sub.value, art.stars || 5);
                deadRolls += rolls;
                deadStatsCounts[sub.key] = (deadStatsCounts[sub.key] || 0) + rolls;
            }
        });
    });
    const details = Object.entries(deadStatsCounts)
        .filter(([_, count]) => count > 0)
        .map(([key, count]) => ({ label: t('stat.' + key), count: count }))
        .sort((a, b) => b.count - a.count);
    return { count: deadRolls, details: details };
}

export function calculateRNGQuality(persoObj, config) {
    const maxRolls = (typeof window !== 'undefined' && window.MAX_ROLLS) ? window.MAX_ROLLS : MAX_ROLLS;
    const maxRolls4 = (typeof window !== 'undefined' && window.MAX_ROLLS_4) ? window.MAX_ROLLS_4 : MAX_ROLLS_4;
    if (!config || !config.weights || !maxRolls) return 0;
    let totalPct = 0;
    let count = 0;
    (persoObj.artefacts || []).forEach(art => {
        (art.subStats || []).forEach(sub => {
            let w = config.weights[sub.key];
            if (w === undefined && sub.key.includes("_dmg_")) w = config.weights["elemental_dmg_"];
            if (w && w > 0) {
                const maxRollsRef = (art.stars === 4 && maxRolls4) ? maxRolls4 : maxRolls;
                const maxVal = maxRollsRef[sub.key];
                if (maxVal) {
                    const rolls = getRollCount(sub.key, sub.value, art.stars || 5);
                    if (rolls > 0) {
                        const theoreticalMax = rolls * maxVal;
                        totalPct += (sub.value / theoreticalMax);
                        count++;
                    }
                }
            }
        });
    });
    return count > 0 ? (totalPct / count) * 100 : 0;
}

export function simulateDeadStatReplacements(persoObj, config) {
    const substatRanges = (typeof window !== 'undefined' && window.SUBSTAT_RANGES) ? window.SUBSTAT_RANGES : SUBSTAT_RANGES_JSON;
    if (!config || !config.weights) return [];
    let suggestions = [];

    (persoObj.artefacts || []).forEach(art => {
        let deadStats = [];
        let presentStats = new Set();

        (art.subStats || []).forEach(sub => {
            presentStats.add(sub.key);
            let w = config.weights[sub.key];
            if (w === undefined && sub.key.includes("_dmg_")) w = config.weights["elemental_dmg_"];

            if (!w || w === 0) {
                const rolls = getRollCount(sub.key, sub.value, art.stars || 5);
                if (rolls > 0) {
                    deadStats.push({
                        key: sub.key,
                        rolls: rolls,
                        label: t('stat.' + sub.key)
                    });
                }
            }
        });

        if (deadStats.length === 0) return;

        const desiredStats = Object.entries(config.weights)
            .filter(([key, w]) => w > 0)
            .sort((a, b) => b[1] - a[1])
            .map(([key]) => key);

        deadStats.sort((a, b) => b.rolls - a.rolls);

        let replacements = [];
        let usedTargets = new Set(presentStats);

        deadStats.forEach(dead => {
            let targetKey = desiredStats.find(k =>
                !usedTargets.has(k) &&
                !k.includes("_dmg_") &&
                k !== art.mainStat.key
            );

            if (targetKey && substatRanges && substatRanges[targetKey]) {
                usedTargets.add(targetKey);

                const range = substatRanges[targetKey];
                const minVal = (range.min * dead.rolls).toFixed(1);
                const maxVal = (range.max * dead.rolls).toFixed(1);
                const suffix = (targetKey.endsWith('_') || targetKey === "enerRech_" || targetKey === "critRate_" || targetKey === "critDMG_") ? "%" : "";
                const targetLabel = t('stat.' + targetKey);

                replacements.push({
                    dead: `${dead.label} (${dead.rolls})`,
                    target: `${targetLabel} (${dead.rolls})`,
                    gain: `+${minVal} <span style="color:var(--text-primary); opacity:0.8; padding:0 2px;">${t('sim.range')}</span> ${maxVal}${suffix} ${targetLabel}`
                });
            }
        });

        if (replacements.length > 0) {
            const pieceName = t('artifact.' + art.type);
            const deadText = replacements.map(r => `<span style="color:#ff6b6b">${r.dead}</span>`).join(t('ui.and'));
            const targetText = replacements.map(r => `<span style="color:var(--accent-gold)">${r.target}</span>`).join(t('ui.and'));
            const gainText = replacements.map(r => `
                <div style="display: flex; flex-direction: row; align-items: center; color: var(--accent-gold); ">
                    <p style=" color: var(--text-primary); margin-right: 6px;">•</p>
                    <p>${r.gain}</p>
                </div>
            `).join('');

            suggestions.push({
                pieceName: pieceName,
                text: t('sim.replace', deadText, targetText),
                gainHtml: gainText,
                totalDeadRolls: deadStats.reduce((acc, curr) => acc + curr.rolls, 0)
            });
        }
    });

    suggestions.sort((a, b) => b.totalDeadRolls - a.totalDeadRolls);
    return suggestions;
}

export function calculateRerollMetrics(artifact, config) {
    const maxRolls = (typeof window !== 'undefined' && window.MAX_ROLLS) ? window.MAX_ROLLS : MAX_ROLLS;
    if (!config || !config.weights || !maxRolls) return null;

    if ((artifact.stars || 5) < 4) {
        return {
            potential: 0,
            risk: 0,
            badge: {
                text: t('reroll.na.stars', artifact.stars ?? '?'),
                color: "#6b7280"
            }
        };
    }

    if ((artifact.stars || 5) === 4) {
        return {
            potential: 0,
            risk: 0,
            badge: {
                text: t('reroll.na.stars', 4),
                color: "#6b7280"
            }
        };
    }

    if ((artifact.level || 0) < 20) {
        return {
            potential: 0,
            risk: 0,
            badge: {
                text: t('reroll.na.level', artifact.level ?? 0),
                color: "#6b7280"
            }
        };
    }

    let totalRolls = 0;
    let terrainWeights = [];
    let upgradeTokens = [];
    let maxWeightOnArtifact = 0;

    (artifact.subStats || []).forEach(sub => {
        const rolls = getRollCount(sub.key, sub.value, artifact.stars || 5);
        totalRolls += rolls;

        let w = config.weights[sub.key];
        if (w === undefined && sub.key.includes("_dmg_")) w = config.weights["elemental_dmg_"];
        const weight = (w && w > 0) ? w : 0;

        terrainWeights.push(weight);
        if (weight > maxWeightOnArtifact) maxWeightOnArtifact = weight;

        if (rolls > 1) {
            for (let i = 0; i < rolls - 1; i++) {
                upgradeTokens.push(weight);
            }
        }
    });

    const totalTokensAvailable = Math.max(4, totalRolls - 4);
    const currentUpgradeValue = upgradeTokens.reduce((a, b) => a + b, 0);

    const sortedTerrain = [...terrainWeights].sort((a, b) => b - a);
    const top2Avg = ((sortedTerrain[0] || 0) + (sortedTerrain[1] || 0)) / 2;
    const bot2Avg = ((sortedTerrain[2] || 0) + (sortedTerrain[3] || 0)) / 2;

    const guaranteedTokens = Math.min(2, totalTokensAvailable);
    const rngTokens = totalTokensAvailable - guaranteedTokens;

    const expectedValue = (guaranteedTokens * top2Avg) + (rngTokens * ((top2Avg + bot2Avg) / 2));

    const maxTheoreticalGain = totalTokensAvailable * maxWeightOnArtifact;

    let potential = 0;
    if (maxTheoreticalGain > 0) {
        const valueGain = expectedValue - currentUpgradeValue;
        if (valueGain > 0) {
            potential = (valueGain / maxTheoreticalGain) * 100 * 2.0;
        }
    }

    let saturation = (maxTheoreticalGain > 0) ? (currentUpgradeValue / maxTheoreticalGain) : 0;
    let risk = Math.pow(saturation, 3.5) * 100;

    if (potential > 100) potential = 100;
    if (risk > 99) risk = 99;
    if (risk < 1) risk = 1;

    let badge = { text: t('reroll.neutral'), color: "var(--text-muted)" };

    if ((sortedTerrain[0] || 0) === 0 && (sortedTerrain[1] || 0) === 0) {
        badge = { text: t("reroll.trash"), color: "#4b5563" };
    } else if (risk > 75) {
        badge = { text: t("reroll.tooRisky"), color: "#ef4444" };
    } else if (potential > 40 && risk < 35) {
        badge = { text: t("reroll.recommended"), color: "#22c55e" };
    } else if (potential > 15) {
        badge = { text: t("reroll.optimizable"), color: "#3b82f6" };
    } else {
        badge = { text: t("reroll.notWorth"), color: "#f97316" };
    }

    return {
        potential: Math.round(potential),
        risk: Math.round(risk),
        badge: badge
    };
}

if (typeof window !== 'undefined') {
    window.calculateCharacterScore = calculateCharacterScore;
    window.calculateMainStatBonus = calculateMainStatBonus;
    window.scoreArtifact = scoreArtifact;
    window.calculateArtifactRollQuality = calculateArtifactRollQuality;
    window.getGradeFromPoints = getGradeFromPoints;
    window.getGlobalGrade = getGlobalGrade;
    window.getGradeColor = getGradeColor;
    window.SCORING_NORMS = SCORING_NORMS;
    window.getRollDetails = getRollDetails;
    window.getRollCount = getRollCount;
    window.calculateMaxTheoreticalScore = calculateMaxTheoreticalScore;
    window.calculateRollDistribution = calculateRollDistribution;
    window.calculateDeadRolls = calculateDeadRolls;
    window.calculateRNGQuality = calculateRNGQuality;
    window.simulateDeadStatReplacements = simulateDeadStatReplacements;
    window.calculateRerollMetrics = calculateRerollMetrics;
}