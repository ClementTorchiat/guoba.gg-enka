const SCORING_NORMS = {
    "critRate_": 2, "critDMG_": 1,
    "atk_": 1.33, "atk": 0.40,
    "hp_": 1.33, "hp": 0.03,
    "def_": 1.06, "def": 0.33,
    "eleMas": 0.33, "enerRech_": 1.2,
    "pyro_dmg_": 1.33, "hydro_dmg_": 1.33, "cryo_dmg_": 1.33, "geo_dmg_": 1.33, "anemo_dmg_": 1.33, "electro_dmg_": 1.33, "dendro_dmg_": 1.33, "physical_dmg_": 1.06, "heal_": 1.33
};

const MAINSTAT_BASE_VALUE = 62.2;
const MAINSTAT_ROLL_VALUE = 7.776;
const VARIABLE_PIECES = ["EQUIP_SHOES", "EQUIP_RING", "EQUIP_DRESS"];

function calculateCharacterScore(perso, config, maxRolls = 45.0) {

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

        const maxCrRoll = (window.MAX_ROLLS && window.MAX_ROLLS["critRate_"]) ? window.MAX_ROLLS["critRate_"] : 3.9;
        overcapRollsPenalty = (excessCR / maxCrRoll) * crWeight;

        totalScore -= overcapScorePenalty;
        totalRolls -= overcapRollsPenalty;

        if (totalScore < 0) totalScore = 0;
        if (totalRolls < 0) totalRolls = 0;
    }

    let setMultiplier = 0.5;
    let activeBonuses = [];
    for (const [setKey, count] of Object.entries(setsCounter)) {
        if (count >= 4) activeBonuses.push(`${setKey}:4`);
        else if (count >= 2) activeBonuses.push(`${setKey}:2`);
    }

    const active4p = activeBonuses.filter(b => b.endsWith(":4"));
    const active2p  = activeBonuses.filter(b => b.endsWith(":2"));

    let isBest = false;
    let isGood = false;

    if (active4p.some(b => config.bestSets.includes(b))) isBest = true;
    else if (active4p.some(b => config.goodSets.includes(b))) isGood = true;

    if (!isBest && !isGood && active2p.length >= 2) {
        const allInBest       = active2p.every(b => config.bestSets.includes(b));
        const allInBestOrGood = active2p.every(b => config.bestSets.includes(b) || config.goodSets.includes(b));

        if (allInBest)            isBest = true;
        else if (allInBestOrGood) isGood = true;
    }

    if (isBest)      setMultiplier = 1.0;
    else if (isGood) setMultiplier = 0.75;

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


function calculateMainStatBonus(artifact, weights, idealMainStats) {
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

function scoreArtifact(artifact, weights) {
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

function calculateArtifactRollQuality(artifact, weights) {
    const maxRollsRef = (artifact.stars === 4 && window.MAX_ROLLS_4)
        ? window.MAX_ROLLS_4
        : window.MAX_ROLLS;
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

function getGradeFromPoints(pts, maxPossiblePts = 9.0) {
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

function getGlobalGrade(pts, maxPossibleRolls = 45.0) {
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

function getGradeColor(grade) {
    if (grade.includes("ARCHON")) return "#00FFFF";
    if (grade.includes("WTF")) return "#FF0080";
    if (grade.includes("SSS")) return "#FF4500";
    if (grade.includes("SS")) return "#FFA500";
    if (grade.includes("S")) return "#FFD700";
    if (grade.includes("A")) return "#C66EFF";
    if (grade.includes("B")) return "#4D94FF";

    return "#aaa";
}