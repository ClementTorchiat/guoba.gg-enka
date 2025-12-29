/* =========================================
   MOTEUR DE NOTATION (Système Hybride : Fribbels Mainstat + Old Substats)
   ========================================= */

const SCORING_NORMS = {
    "critRate_": 2, "critDMG_": 1,
    "atk_": 1.33, "atk": 0.40,
    "hp_": 1.33, "hp": 0.03,
    "def_": 1.06, "def": 0.33,
    "eleMas": 0.33, "enerRech_": 1.2,
    "pyro_dmg_": 1.33, "hydro_dmg_": 1.33, "cryo_dmg_": 1.33, "geo_dmg_": 1.33, "anemo_dmg_": 1.33, "electro_dmg_": 1.33, "dendro_dmg_": 1.33, "physical_dmg_": 1.06, "heal_": 1.33
};

const MAINSTAT_BASE_VALUE = 62.2;
const VARIABLE_PIECES = ["EQUIP_SHOES", "EQUIP_RING", "EQUIP_DRESS"];

// MODIFICATION : On prend 'config' en argument pour éviter les erreurs de scope
function calculateCharacterScore(perso, config) {

    // Sécurité si la config est vide
    if (!config || !config.weights) {
        return { score: 0, grade: { letter: "?", color: "#888" }, totalRolls: 0 };
    }

    let totalScore = 0;
    let totalRolls = 0;
    const setsCounter = {};

    // 2. Parcourir les artéfacts
    perso.artefacts.forEach(art => {
        // A. Score Artefact
        const powerResult = scoreArtifact(art, config.weights);
        art.score = powerResult.score;

        // B. Note Qualité (Rolls)
        const qualityPoints = calculateArtifactRollQuality(art, config.weights);
        const gradeLetter = getGradeFromPoints(qualityPoints);

        art.grade = {
            letter: gradeLetter,
            color: getGradeColor(gradeLetter),
            points: qualityPoints
        };

        totalScore += art.score;
        totalRolls += qualityPoints;

        // C. BONUS MAINSTAT (Fribbels)
        if (VARIABLE_PIECES.includes(art.type)) {
            const mainStatBonus = calculateMainStatBonus(art, config.weights);
            totalScore += mainStatBonus;
        }

        if (art.setKey) {
            setsCounter[art.setKey] = (setsCounter[art.setKey] || 0) + 1;
        }
    });

    // 3. Bonus de Set (Multiplicateur)
    let setMultiplier = 0.5;
    let activeBonuses = [];
    for (const [setKey, count] of Object.entries(setsCounter)) {
        if (count >= 4) activeBonuses.push(`${setKey}:4`);
        else if (count >= 2) activeBonuses.push(`${setKey}:2`);
    }

    let isBest = false; let isGood = false;
    if (activeBonuses.some(b => config.bestSets.includes(b))) isBest = true;
    else if (activeBonuses.some(b => config.goodSets.includes(b))) isGood = true;

    if (isBest) setMultiplier = 1.0;
    else if (isGood) setMultiplier = 0.75;

    const finalScore = parseFloat((totalScore * setMultiplier).toFixed(1));

    return {
        score: finalScore,
        grade: getGlobalGrade(totalRolls),
        setBonus: activeBonuses,
        setMultiplier: setMultiplier,
        totalRolls: totalRolls.toFixed(1)
    };
}

// --- FONCTIONS CALCULS ---

function calculateMainStatBonus(artifact, weights) {
    let key = artifact.mainStat.key;
    let w = weights[key];
    if (w === undefined && key.includes("_dmg_")) { w = weights["elemental_dmg_"]; }
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
        score += 5.1 * (SCORING_NORMS[artifact.mainStat.key] || 1) * mainWeight;
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
    let points = 0;
    artifact.subStats.forEach(sub => {
        let w = weights[sub.key];
        if (w === undefined && sub.key.includes("_dmg_")) w = weights["elemental_dmg_"];
        w = w || 0;
        if (w > 0) {
            const maxRoll = (window.MAX_ROLLS && window.MAX_ROLLS[sub.key]) || 9999;
            points += (sub.value / maxRoll) * w;
        }
    });
    return parseFloat(points.toFixed(1));
}

// --- ECHELLES ---
function getGradeFromPoints(pts) {
    if (pts >= 9.0) return "ARCHON";
    if (pts >= 8.5) return "WTF+";
    if (pts >= 8.0) return "WTF";
    if (pts >= 7.5) return "SSS+";
    if (pts >= 7.0) return "SSS";
    if (pts >= 6.5) return "SS+";
    if (pts >= 6.0) return "SS";
    if (pts >= 5.5) return "S+";
    if (pts >= 5.0) return "S";
    if (pts >= 4.5) return "A+";
    if (pts >= 4.0) return "A";
    if (pts >= 3.5) return "B+";
    if (pts >= 3.0) return "B";
    if (pts >= 2.5) return "C+";
    if (pts >= 2.0) return "C";
    if (pts >= 1.5) return "D+";
    if (pts >= 1.0) return "D";
    if (pts >= 0.5) return "F+";
    return "F";
}

function getGlobalGrade(totalRolls) {
    let grade = "F";
    if (totalRolls >= 45)      grade = "ARCHON";
    else if (totalRolls >= 42.5) grade = "WTF+";
    else if (totalRolls >= 40)   grade = "WTF";
    else if (totalRolls >= 37.5) grade = "SSS+";
    else if (totalRolls >= 35)   grade = "SSS";
    else if (totalRolls >= 32.5) grade = "SS+";
    else if (totalRolls >= 30)   grade = "SS";
    else if (totalRolls >= 27.5) grade = "S+";
    else if (totalRolls >= 25)   grade = "S";
    else if (totalRolls >= 22.5) grade = "A+";
    else if (totalRolls >= 20)   grade = "A";
    else if (totalRolls >= 17.5) grade = "B+";
    else if (totalRolls >= 15)   grade = "B";
    else if (totalRolls >= 12.5) grade = "C+";
    else if (totalRolls >= 10)   grade = "C";
    else if (totalRolls >= 7.5)  grade = "D+";
    else if (totalRolls >= 5)    grade = "D";
    else if (totalRolls >= 2.5)  grade = "F+";
    return { letter: grade, color: getGradeColor(grade) };
}

function getGradeColor(grade) {
    if (grade.includes("ARCHON")) return "#ff0000";
    if (grade.includes("SSS")) return "#ff4400";
    if (grade.includes("SS")) return "#ffaa00";
    if (grade.includes("S")) return "#ffd700";
    if (grade.includes("A")) return "#c66eff";
    if (grade.includes("B")) return "#4d94ff";
    return "#aaa";
}