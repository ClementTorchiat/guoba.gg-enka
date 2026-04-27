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
const MAINSTAT_ROLL_VALUE = 7.776;
const VARIABLE_PIECES = ["EQUIP_SHOES", "EQUIP_RING", "EQUIP_DRESS"];

// MODIFICATION : On prend 'config' en argument pour éviter les erreurs de scope
function calculateCharacterScore(perso, config, maxRolls = 45.0) {

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
        // --- NOUVEAU : On calcule le max théorique de CELA pièce ---
        // On récupère les weights utiles dispo (sans la mainstat actuelle)
        const availableWeights = Object.entries(config.weights)
            .filter(([k, w]) => w > 0 && k !== art.mainStat.key && !k.includes("_dmg_") && k !== "heal_" && k !== "physical_dmg_")
            .map(entry => entry[1])
            .sort((a, b) => b - a);

        let maxPiecePoints = 9.0; // Valeur par défaut
        if (availableWeights.length > 0) {
            maxPiecePoints = 0;
            const top = availableWeights.slice(0, 4);
            maxPiecePoints += top[0] * 6; // 6 procs sur la meilleure
            for (let i = 1; i < top.length; i++) {
                maxPiecePoints += top[i] * 1; // 1 proc sur les autres
            }
        }

        // On donne ce max à la fonction pour avoir une lettre juste !
        const gradeLetter = getGradeFromPoints(qualityPoints, maxPiecePoints);
        // --- FIN NOUVEAU ---

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
        grade: getGlobalGrade(totalRolls, maxRolls),
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

// On ajoute le maxPossibleRolls (45 par défaut pour éviter les crashs)
function getGlobalGrade(pts, maxPossibleRolls = 45.0) {
    if (maxPossibleRolls <= 0 || pts <= 0 && maxPossibleRolls < 1) {
        return { letter: "Bro...", color: getGradeColor("F") };
    }
    const labels = [
        "F", "F+", "D", "D+", "C", "C+", "B", "B+", "A", "A+",
        "S", "S+", "SS", "SS+", "SSS", "SSS+", "WTF", "WTF+", "ARCHON"
    ];

    const steps = labels.length - 1; // 18 paliers
    const interval = maxPossibleRolls / steps;

    for (let i = steps; i >= 0; i--) {
        const threshold = i * interval;
        if (pts >= threshold - 0.05) { // Marge de tolérance
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