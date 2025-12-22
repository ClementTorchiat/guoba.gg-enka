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

// Valeur de référence pour une Mainstat parfaite (équivalent Max DGT CRIT)
const MAINSTAT_BASE_VALUE = 62.2;

// Pièces variables qui donnent un bonus de score si la mainstat est bonne
const VARIABLE_PIECES = ["EQUIP_SHOES", "EQUIP_RING", "EQUIP_DRESS"]; // Sablier, Coupe, Casque

function calculateCharacterScore(perso) {
    // 1. Config
    const configKey = perso.nom.replace(/\s+/g, '') || "Default";
    const config = CHARACTER_CONFIG[configKey] || CHARACTER_CONFIG[perso.nom] || DEFAULT_CONFIG;

    let totalScore = 0; // Score Puissance (inclura le bonus mainstat)
    let totalRolls = 0; // Note Qualité (pour le grade SSS)
    const setsCounter = {};

    // 2. Parcourir les artéfacts
    perso.artefacts.forEach(art => {
        // A. Score Individuel de l'artéfact (ANCIEN SYSTÈME 5.1)
        // Ce score s'affiche sur la carte et note la qualité intrinsèque de la pièce (Substats + petit bonus mainstat)
        const powerResult = scoreArtifact(art, config.weights);
        art.score = powerResult.score;

        // B. Note Qualité (Rolls) pour le Grade (S, SS, SSS...)
        const qualityPoints = calculateArtifactRollQuality(art, config.weights);
        const gradeLetter = getGradeFromPoints(qualityPoints);

        art.grade = {
            letter: gradeLetter,
            color: getGradeColor(gradeLetter),
            points: qualityPoints
        };

        // Ajout aux totaux
        totalScore += art.score; // On ajoute le score de base de l'artéfact
        totalRolls += qualityPoints;

        // C. BONUS MAINSTAT (Système Fribbels - Standardisé)
        // Ajouté UNIQUEMENT au score total du personnage
        if (VARIABLE_PIECES.includes(art.type)) {
            const mainStatBonus = calculateMainStatBonus(art, config.weights);
            totalScore += mainStatBonus;
        }

        if (art.setKey) {
            setsCounter[art.setKey] = (setsCounter[art.setKey] || 0) + 1;
        }
    });

    // 3. Bonus de Set (Multiplicateur final)
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

/** * Calcul du Bonus Mainstat (Standardisé 62.2)
 * Si la stat a un poids > 0, on ajoute 62.2 * poids.
 * Indépendant de la valeur réelle de la stat (EM vs ATK vs CRIT).
 */
function calculateMainStatBonus(artifact, weights) {
    let key = artifact.mainStat.key;
    let w = weights[key];

    // Gestion du fallback pour les dégâts élémentaires
    if (w === undefined && key.includes("_dmg_")) {
        w = weights["elemental_dmg_"];
    }
    // Si toujours undefined (stat inutile), ça vaut 0
    w = w || 0;

    if (w > 0) {
        // Formule simplifiée : Base Fixe * Poids
        // Ex: Weight 1.0 -> Bonus +62.2
        // Ex: Weight 0.75 -> Bonus +46.65
        return MAINSTAT_BASE_VALUE * w;
    }
    return 0;
}

/** * ANCIEN SYSTÈME (5.1) pour le score individuel de la carte
 * (Note intrinsèque de l'artéfact)
 */
function scoreArtifact(artifact, weights) {
    let score = 0;
    let mainWeight = weights[artifact.mainStat.key];

    if (mainWeight === undefined && artifact.mainStat.key.includes("_dmg_")) {
        mainWeight = weights["elemental_dmg_"];
    }
    mainWeight = mainWeight || 0;

    // Le petit bonus "juste pour avoir la bonne stat" (Old System 5.1)
    // On le garde pour que la note de la carte ne soit pas uniquement basée sur les substats
    if (mainWeight > 0) {
        score += 5.1 * (SCORING_NORMS[artifact.mainStat.key] || 1) * mainWeight;
    }

    // Score des Substats
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

/** * QUALITÉ (Roll Value %) - Inchangé
 */
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

// --- ÉCHELLES DE NOTATION ---

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
    if (totalRolls >= 43) grade = "ARCHON";
    else if (totalRolls >= 40) grade = "WTF+";
    else if (totalRolls >= 38) grade = "WTF";
    else if (totalRolls >= 36) grade = "SSS+";
    else if (totalRolls >= 34) grade = "SSS";
    else if (totalRolls >= 32) grade = "SS+";
    else if (totalRolls >= 30) grade = "SS";
    else if (totalRolls >= 27) grade = "S+";
    else if (totalRolls >= 24) grade = "S";
    else if (totalRolls >= 21) grade = "A+";
    else if (totalRolls >= 18) grade = "A";
    else if (totalRolls >= 15) grade = "B+";
    else if (totalRolls >= 12) grade = "B";
    else if (totalRolls >= 9)  grade = "C+";
    else if (totalRolls >= 6)  grade = "C";
    else if (totalRolls >= 4)  grade = "D+";
    else if (totalRolls >= 2)  grade = "D";
    else if (totalRolls >= 1)  grade = "F+";

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
    return "#aaa";
}