/* =========================================
   MOTEUR DE NOTATION (Logique Projet 1)
   ========================================= */

// Facteurs de normalisation (Issus de votre data.js)
const SCORING_NORMS = {
    "critRate_": 2, "critDMG_": 1,
    "atk_": 1.33, "atk": 0.40, // Atk% vs Flat
    "hp_": 1.33, "hp": 0.03,   // HP% vs Flat
    "def_": 1.06, "def": 0.33,
    "eleMas": 0.33, "enerRech_": 1.2,
    "elemental_dmg_": 1.33, "physical_dmg_": 1.06, "heal_": 1.33
};

/**
 * Calcule la note d'un personnage (basé sur l'objet normalisé par script.js)
 */
function calculateCharacterScore(perso) {
    // 1. Trouver la config
    // On enlève les espaces pour matcher les clés (Hu Tao -> HuTao)
    const configKey = perso.nom.replace(/\s+/g, '') || "Default";
    const config = CHARACTER_CONFIG[configKey] || CHARACTER_CONFIG[perso.nom] || DEFAULT_CONFIG;

    console.log(`Scoring pour ${perso.nom} avec config :`, configKey);

    let totalScore = 0;
    const setsCounter = {};

    // 2. Parcourir les artéfacts
    perso.artefacts.forEach(art => {
        // Calcul du score individuel de l'artéfact
        const artResult = scoreArtifact(art, config.weights);

        // On stocke le résultat dans l'objet artéfact pour l'affichage
        art.score = artResult.score;
        art.grade = artResult.grade;

        totalScore += art.score;

        // Compter les sets (ex: "CrimsonWitchOfFlames")
        if (art.setKey) {
            setsCounter[art.setKey] = (setsCounter[art.setKey] || 0) + 1;
        }
    });

    // 3. Bonus de Set (Logique Projet 1)
    let setMultiplier = 0.5; // Pénalité de base
    let activeBonuses = [];

    // On transforme le compteur en liste de bonus (ex: "CrimsonWitchOfFlames:4")
    for (const [setKey, count] of Object.entries(setsCounter)) {
        if (count >= 4) activeBonuses.push(`${setKey}:4`);
        // Note: Si on a 4 pièces, on a aussi le bonus 2 pièces implicitement
        else if (count >= 2) activeBonuses.push(`${setKey}:2`);
    }

    // Vérification Best/Good sets
    let isBest = false;
    let isGood = false;

    // Logique simplifiée Projet 1 :
    // Si on a un "Best Set" complet (4p) ou partiel si configuré
    if (activeBonuses.some(b => config.bestSets.includes(b))) {
        isBest = true;
    }
    // Sinon on regarde les "Good Sets"
    else if (activeBonuses.some(b => config.goodSets.includes(b))) {
        // Cas spécial double 2p (ex: 2 atk + 2 pyro)
        // Pour faire simple ici : si on a au moins un bonus 'Good', on passe en Good.
        // Pour être strict double 2p, il faudrait compter le nombre de matchs.
        isGood = true;
    }

    if (isBest) setMultiplier = 1.0;
    else if (isGood) setMultiplier = 0.75; // Ou 0.8 selon votre goût

    const finalScore = parseFloat((totalScore * setMultiplier).toFixed(1));

    return {
        score: finalScore,
        grade: getGlobalGrade(finalScore),
        setBonus: activeBonuses,
        setMultiplier: setMultiplier
    };
}

/**
 * Calcule le score d'un seul artéfact
 */
function scoreArtifact(artifact, weights) {
    let score = 0;

    // A. Main Stat (Projet 1 donnait souvent des points fixes pour la bonne mainstat)
    let mainWeight = weights[artifact.mainStat.key] || 0;
    // Gestion des Dégâts élémentaires génériques
    if (mainWeight === 0 && artifact.mainStat.key.includes("_dmg_")) {
        mainWeight = weights["elemental_dmg_"] || 0;
    }

    // Formule Projet 1 pour MainStat (Ex: 5.1 * Norme * Poids)
    if (mainWeight > 0) {
        score += 5.1 * (SCORING_NORMS[artifact.mainStat.key] || 1) * mainWeight;
    }

    // B. Sub Stats
    artifact.subStats.forEach(sub => {
        let w = weights[sub.key] || 0;
        // Fallback élémentaire
        if (w === 0 && sub.key.includes("_dmg_")) w = weights["elemental_dmg_"] || 0;

        if (w > 0) {
            const norm = SCORING_NORMS[sub.key] || 0;
            score += sub.value * w * norm;
        }
    });

    return {
        score: parseFloat(score.toFixed(1)),
        grade: getArtifactGrade(score)
    };
}

// --- Systèmes de Notation (Couleurs) ---

function getArtifactGrade(score) {
    if (score >= 50) return { letter: 'OP', color: '#ff4d4d' }; // Rouge
    if (score >= 40) return { letter: 'SS', color: '#ffd700' }; // Doré
    if (score >= 30) return { letter: 'S', color: '#c66eff' };  // Violet
    if (score >= 20) return { letter: 'A', color: '#4d94ff' };  // Bleu
    return { letter: 'B', color: '#aaa' };                      // Gris
}

function getGlobalGrade(totalScore) {
    if (totalScore >= 220) return { letter: 'ARCHON', color: '#ff0000' };
    if (totalScore >= 200) return { letter: 'SSS', color: '#ffaa00' };
    if (totalScore >= 180) return { letter: 'SS', color: '#ffd700' };
    if (totalScore >= 160) return { letter: 'S', color: '#c66eff' };
    if (totalScore >= 140) return { letter: 'A', color: '#4d94ff' };
    if (totalScore >= 100) return { letter: 'B', color: '#aaa' };
    return { letter: 'C', color: '#777' };
}