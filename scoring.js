/* =========================================
   MOTEUR DE NOTATION (Double Système : Score + Grade)
   ========================================= */

const SCORING_NORMS = {
    "critRate_": 2, "critDMG_": 1,
    "atk_": 1.33, "atk": 0.40,
    "hp_": 1.33, "hp": 0.03,
    "def_": 1.06, "def": 0.33,
    "eleMas": 0.33, "enerRech_": 1.2,
    "pyro_dmg_": 1.33, "hydro_dmg_": 1.33, "cryo_dmg_": 1.33, "geo_dmg_": 1.33, "anemo_dmg_": 1.33, "electro_dmg_": 1.33, "dendro_dmg_": 1.33, "physical_dmg_": 1.06, "heal_": 1.33
};

function calculateCharacterScore(perso) {
    // 1. Config
    const configKey = perso.nom.replace(/\s+/g, '') || "Default";
    const config = CHARACTER_CONFIG[configKey] || CHARACTER_CONFIG[perso.nom] || DEFAULT_CONFIG;

    let totalScore = 0; // Score Puissance
    let totalRolls = 0; // Note Qualité (Projet 1)
    const setsCounter = {};

    // 2. Parcourir les artéfacts
    perso.artefacts.forEach(art => {
        // A. CALCUL PUISSANCE (Ton Score actuel)
        const powerResult = scoreArtifact(art, config.weights);
        art.score = powerResult.score; // ex: 45.2

        // B. CALCUL QUALITÉ (Ton Notation Projet 1)
        const qualityPoints = calculateArtifactRollQuality(art, config.weights);

        // Note individuelle de l'artéfact
        const gradeLetter = getGradeFromPoints(qualityPoints);

        art.grade = {
            letter: gradeLetter,
            color: getGradeColor(gradeLetter),
            points: qualityPoints
        };

        totalScore += art.score;
        totalRolls += qualityPoints; // On additionne les points de notation (0.7, 1.0...)

        if (art.setKey) {
            setsCounter[art.setKey] = (setsCounter[art.setKey] || 0) + 1;
        }
    });

    // 3. Bonus de Set (Impacte seulement le Score Puissance)
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
        score: finalScore, // Le score chiffré (ex: 210.5)
        grade: getGlobalGrade(totalRolls), // La note (ex: SSS) basée sur la somme des rolls
        setBonus: activeBonuses,
        setMultiplier: setMultiplier,
        totalRolls: totalRolls.toFixed(1) // Pour debug si besoin
    };
}

/** * SYSTÈME 1 : PUISSANCE (Multiplication)
 */
function scoreArtifact(artifact, weights) {
    let score = 0;
    let mainWeight = weights[artifact.mainStat.key] || 0;
    if (mainWeight === 0 && artifact.mainStat.key.includes("_dmg_")) mainWeight = weights["elemental_dmg_"] || 0;

    if (mainWeight > 0) {
        score += 5.1 * (SCORING_NORMS[artifact.mainStat.key] || 1) * mainWeight;
    }
    artifact.subStats.forEach(sub => {
        let w = weights[sub.key] || 0;
        if (w === 0 && sub.key.includes("_dmg_")) w = weights["elemental_dmg_"] || 0;
        if (w > 0) {
            score += sub.value * w * (SCORING_NORMS[sub.key] || 0);
        }
    });
    return { score: parseFloat(score.toFixed(1)) };
}

/** * SYSTÈME 2 : QUALITÉ (Division par Max Roll)
 */
function calculateArtifactRollQuality(artifact, weights) {
    let points = 0;
    artifact.subStats.forEach(sub => {
        let w = weights[sub.key] || 0;
        if (w === 0 && sub.key.includes("_dmg_")) w = weights["elemental_dmg_"] || 0;

        if (w > 0) {
            const maxRoll = (window.MAX_ROLLS && window.MAX_ROLLS[sub.key]) || 9999;
            points += (sub.value / maxRoll) * w;
        }
    });
    return parseFloat(points.toFixed(1));
}

// --- ÉCHELLES DE NOTATION (PROJET 1) ---

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
    if (pts >= 1.0) return "D"; // Anciennement F+

    // Le bas du panier (remplace les Bro...)
    if (pts >= 0.5) return "F+";
    return "F";
}

// Nouvelle échelle globale basée sur la somme des Rolls (Projet 1)
function getGlobalGrade(totalRolls) {
    let grade = "F";

    // ZONE DIVINE (Moyenne par artéfact > 8)
    // Max théorique 45. Il faut être un monstre pour dépasser 42.
    if (totalRolls >= 43) grade = "ARCHON"; // 43, 44, 45 (Quasi impossible)
    else if (totalRolls >= 40) grade = "WTF+"; // 40, 41, 42 (God Tier absolu)
    else if (totalRolls >= 38) grade = "WTF";  // 38, 39 (Excellentissime)

    // ZONE ELITE (Moyenne par artéfact ~7 à 7.5)
    else if (totalRolls >= 36) grade = "SSS+"; // Paliers de 2 points
    else if (totalRolls >= 34) grade = "SSS";
    else if (totalRolls >= 32) grade = "SS+";
    else if (totalRolls >= 30) grade = "SS";   // 30 est un beau chiffre rond pour le "Double S"

    // ZONE TRES BONNE (Moyenne par artéfact ~5 à 6)
    else if (totalRolls >= 27) grade = "S+";   // Paliers de 3 points
    else if (totalRolls >= 24) grade = "S";
    else if (totalRolls >= 21) grade = "A+";
    else if (totalRolls >= 18) grade = "A";

    // ZONE MOYENNE (Moyenne par artéfact ~3 à 4)
    else if (totalRolls >= 15) grade = "B+";
    else if (totalRolls >= 12) grade = "B";
    else if (totalRolls >= 9)  grade = "C+";
    else if (totalRolls >= 6)  grade = "C";

    // ZONE DEBUTANT / POUBELLE
    else if (totalRolls >= 4)  grade = "D+";
    else if (totalRolls >= 2)  grade = "D";
    else if (totalRolls >= 1)  grade = "F+";

    // < 1 reste F

    return {
        letter: grade,
        color: getGradeColor(grade)
    };
}

function getGradeColor(grade) {
    if (grade.includes("ARCHON")) return "#ff0000";
    if (grade.includes("SSS")) return "#ff4400";
    if (grade.includes("SS")) return "#ffaa00";
    if (grade.includes("S")) return "#ffd700";
    if (grade.includes("A")) return "#c66eff";
    if (grade.includes("B")) return "#4d94ff";
    // Les grades inférieurs (C, D, F, Bro...) auront la couleur par défaut
    return "#aaa";
}