/* =========================================
   SCRIPT PRINCIPAL (Version Finale : Set Trap & Level 90)
   ========================================= */

// --- 1. CONFIGURATION DES SVG ---
const ICON_BASE_PATH = "./assets/simulator/icons/";

// Associe la clé interne (ex: "hp_") au nom de ton fichier PNG
const ICON_MAP = {
    // Stats de base
    "hp": "icon_hp.png",
    "hp_": "icon_hp_percent.png",
    "atk": "icon_atk.png",
    "atk_": "icon_atk_percent.png",
    "def": "icon_def.png",
    "def_": "icon_def_percent.png",

    // Stats avancées
    "eleMas": "icon_em.png",
    "enerRech_": "icon_er.png",
    "critRate_": "icon_crit_rate.png",
    "critDMG_": "icon_crit_dmg.png",
    "heal_": "icon_heal_bonus.png",

    // Éléments
    "pyro_dmg_": "icon_pyro.png",
    "hydro_dmg_": "icon_hydro.png",
    "cryo_dmg_": "icon_cryo.png",
    "electro_dmg_": "icon_electro.png",
    "anemo_dmg_": "icon_anemo.png",
    "geo_dmg_": "icon_geo.png",
    "dendro_dmg_": "icon_dendro.png",
    "physical_dmg_": "icon_physical.png",

    // Score
    "score": "icon_score.png",

    // Fallback (image par défaut si inconnu)
    "unknown": "icon_unknown.png"
};

function createIcon(key) {
    const filename = ICON_MAP[key] || ICON_MAP["unknown"];
    return `<img src="${ICON_BASE_PATH}${filename}" class="stat-icon" alt="${key}">`;
}

function getRollCount(key, value) {
    if (!window.MAX_ROLLS || !window.MAX_ROLLS[key]) return 0;
    const avgRoll = window.MAX_ROLLS[key] * 0.85;
    return Math.round(value / avgRoll);
}

// 2. MAPPINGS & DATA
const ELEMENT_DATA = {
    "Fire": { id: 40, key: "pyro_dmg_" },
    "Water": { id: 42, key: "hydro_dmg_" },
    "Wind": { id: 44, key: "anemo_dmg_" },
    "Electric": { id: 41, key: "electro_dmg_" },
    "Grass": { id: 43, key: "dendro_dmg_" },
    "Ice": { id: 46, key: "cryo_dmg_" },
    "Rock": { id: 45, key: "geo_dmg_" }
};

const SUBSTAT_RANGES = {
    "critRate_": { min: 2.7, max: 3.9 }, "critDMG_": { min: 5.4, max: 7.8 },
    "atk_": { min: 4.1, max: 5.8 }, "hp_": { min: 4.1, max: 5.8 }, "def_": { min: 5.1, max: 7.3 },
    "eleMas": { min: 16, max: 23 }, "enerRech_": { min: 4.5, max: 6.5 },
    "atk": { min: 14, max: 19 }, "hp": { min: 209, max: 299 }, "def": { min: 16, max: 23 }
};

// TAUX DE DROP MAINSTATS (Wiki Genshin)
const MAINSTAT_DROP_RATES = {
    "EQUIP_SHOES": { "hp_": 26.68, "atk_": 26.66, "def_": 26.66, "enerRech_": 10.0, "eleMas": 10.0 },
    "EQUIP_RING": { "hp_": 19.25, "atk_": 19.25, "def_": 19.0, "eleMas": 2.5, "physical_dmg_": 5.0, "pyro_dmg_": 5.0, "electro_dmg_": 5.0, "cryo_dmg_": 5.0, "hydro_dmg_": 5.0, "anemo_dmg_": 5.0, "geo_dmg_": 5.0, "dendro_dmg_": 5.0 },
    "EQUIP_DRESS": { "hp_": 22.0, "atk_": 22.0, "def_": 22.0, "critRate_": 10.0, "critDMG_": 10.0, "heal_": 10.0, "eleMas": 4.0 }
};

const STAT_MAPPING = { "FIGHT_PROP_HP": "hp", "FIGHT_PROP_HP_PERCENT": "hp_", "FIGHT_PROP_ATTACK": "atk", "FIGHT_PROP_ATTACK_PERCENT": "atk_", "FIGHT_PROP_DEFENSE": "def", "FIGHT_PROP_DEFENSE_PERCENT": "def_", "FIGHT_PROP_CRITICAL": "critRate_", "FIGHT_PROP_CRITICAL_HURT": "critDMG_", "FIGHT_PROP_CHARGE_EFFICIENCY": "enerRech_", "FIGHT_PROP_ELEMENT_MASTERY": "eleMas", "FIGHT_PROP_HEAL_ADD": "heal_", "FIGHT_PROP_PHYSICAL_ADD_HURT": "physical_dmg_", "FIGHT_PROP_FIRE_ADD_HURT": "pyro_dmg_", "FIGHT_PROP_ELEC_ADD_HURT": "electro_dmg_", "FIGHT_PROP_WATER_ADD_HURT": "hydro_dmg_", "FIGHT_PROP_GRASS_ADD_HURT": "dendro_dmg_", "FIGHT_PROP_WIND_ADD_HURT": "anemo_dmg_", "FIGHT_PROP_ROCK_ADD_HURT": "geo_dmg_", "FIGHT_PROP_ICE_ADD_HURT": "cryo_dmg_" };

const STAT_LABELS = { "hp": "PV", "hp_": "PV %", "atk": "ATQ", "atk_": "ATQ %", "def": "DÉF", "def_": "DÉF %", "eleMas": "Maîtrise élémentaire", "enerRech_": "Recharge d'énergie", "critRate_": "Taux CRIT", "critDMG_": "DGT CRIT", "heal_": "Bonus de Soins", "pyro_dmg_": "Bonus de DGT Pyro", "hydro_dmg_": "Bonus de DGT Hydro", "cryo_dmg_": "Bonus de DGT Cryo", "electro_dmg_": "Bonus de DGT Électro", "anemo_dmg_": "Bonus de DGT Anémo", "geo_dmg_": "Bonus de DGT Géo", "dendro_dmg_": "Bonus de DGT Dendro", "physical_dmg_": "Bonus de DGT Physiques" };

const SET_NAME_MAPPING = {
    "Sorcière des flammes ardentes": "CrimsonWitchOfFlames",
    "Emblème du destin brisé": "EmblemOfSeveredFate",
    "Maréchaussée": "MarechausseeHunter",
    "Troupe dorée": "GoldenTroupe",
    "Rêve doré": "GildedDreams",
    "Souvenir de la forêt": "DeepwoodMemories",
    "Codex d'obsidienne": "ObsidianCodex",
    "Ombre de la Verte Chasseuse": "ViridescentVenerer",
    "Ancien Rituel Royal": "NoblesseOblige",
    "Ténacité du Millelithe": "TenacityOfTheMillelith",
    "Coquille des rêves opulents": "HuskOfOpulentDreams",
    "Palourde aux teintes océaniques": "OceanHuedClam",
    "Rideau du Gladiateur": "GladiatorsFinale",
    "Bande Vagabonde": "WanderersTroupe",
    "Chevalerie ensanglantée": "BloodstainedChivalry",
    "Colère de tonnerre": "ThunderingFury",
    "Dompteur de tonnerre": "Thundersoother",
    "Amour chéri": "MaidenBeloved",
    "Roche ancienne": "ArchaicPetra",
    "Météore inversé": "RetracingBolide",
    "Briseur de glace": "BlizzardStrayer",
    "Âme des profondeurs": "HeartOfDepth",
    "Flamme blême": "PaleFlame",
    "Réminiscence nostalgique": "ShimenawasReminiscence",
    "Au-delà cinabrin": "VermillionHereafter",
    "Échos d'une offrande": "EchoesOfAnOffering",
    "Chronique du Pavillon du désert": "DesertPavilionChronicle",
    "Fleur du paradis perdu": "FlowerOfParadiseLost",
    "Rêve de la nymphe": "NymphsDream",
    "Lueur du vourukasha": "VourukashasGlow",
    "Murmure nocturne en forêt d'échos": "NighttimeWhispersInTheEchoingWoods",
    "Chanson des jours d'antan": "SongOfDaysPast",
    "Fragment d'harmonie fantasque": "FragmentOfHarmonicWhimsy",
    "Rêverie inachevée": "UnfinishedReverie",
    "Parchemins du héros de la cité": "ScrollOfTheHeroOfCinderCity",
    "Finale des galeries profondes": "FinaleOfTheDeepGalleries"
};

const ARTIFACT_TYPE_MAPPING = { "EQUIP_BRACER": "Fleur de la vie", "EQUIP_NECKLACE": "Plume de la mort", "EQUIP_SHOES": "Sables du temps", "EQUIP_RING": "Coupe d'éonothème", "EQUIP_DRESS": "Diadème de Logos" };

const SLOT_POSSIBLE_MAIN_STATS = {
    "EQUIP_SHOES": ["hp_", "atk_", "def_", "enerRech_", "eleMas"],
    "EQUIP_RING": ["hp_", "atk_", "def_", "eleMas", "physical_dmg_", "pyro_dmg_", "hydro_dmg_", "cryo_dmg_", "electro_dmg_", "anemo_dmg_", "geo_dmg_", "dendro_dmg_"],
    "EQUIP_DRESS": ["hp_", "atk_", "def_", "eleMas", "critRate_", "critDMG_", "heal_"]
};

let globalPersoData = [];
let charData = {};
let locData = {};

async function loadGameData() {
    const loader = document.getElementById('loading-msg');
    if(loader) loader.innerText = "Chargement API...";
    try {
        const [chars, locs] = await Promise.all([
            fetch('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/characters.json').then(r => r.json()),
            fetch('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/loc.json').then(r => r.json())
        ]);
        charData = chars;
        locData = locs;
        if(loader) loader.innerText = "";
    } catch (e) {
        console.error(e);
        if(loader) loader.innerText = "Erreur JSON.";
    }
}

async function fetchUserData() {
    const uid = document.getElementById('uidInput').value;
    if (!uid) return alert("UID manquant");
    const loader = document.getElementById('loading-msg');
    if(loader) loader.innerText = "Récupération...";
    const proxy = `https://corsproxy.io/?${encodeURIComponent(`https://enka.network/api/uid/${uid}`)}`;
    try {
        const res = await fetch(proxy);
        if(!res.ok) throw new Error("Erreur Enka");
        const data = await res.json();
        processData(data);
        if(loader) loader.innerText = "Succès.";
    } catch (e) {
        console.error(e);
        if(loader) loader.innerText = "Erreur UID/Vitrine.";
    }
}

function getText(hash) {
    if (locData && locData.fr && locData.fr[hash]) return locData.fr[hash];
    return "Inconnu";
}

function formatValueDisplay(key, val) {
    if(['hp', 'atk', 'def', 'eleMas'].includes(key)) return Math.round(val).toLocaleString();
    return val.toFixed(1) + '%';
}

function formatStat(propId, value) {
    // 1. Mapping de la clé (inchangé)
    let key = STAT_MAPPING[propId];
    if (!key && (STAT_LABELS[propId] || propId === 'dmgBonus')) key = propId;
    if (!key) return { key: "unknown", value: value, label: propId, icon: createIcon("unknown") };

    // 2. Gestion des pourcentages (inchangé)
    let val = value;
    let isPercent = false;
    if (key.endsWith('_') || ['critRate_', 'critDMG_', 'enerRech_', 'heal_'].includes(key)) {
        isPercent = true;
        if (val < 2.0) val = val * 100; // Conversion 0.5 -> 50
    }

    // 3. Génération de l'image (NOUVEAU)
    const iconHtml = createIcon(key);

    const label = STAT_LABELS[key] || key;

    return {
        key,
        value: val,
        label,
        icon: iconHtml, // Contient maintenant la balise <img>
        isPercent
    };
}

// --- LOGIQUE CALCUL BONUS ---
function calculateBuffedStats(baseStats, currentStats, buffsList) {
    let buffed = { ...currentStats };
    buffsList.forEach(buff => { if (buff.active) applyBonus(buffed, baseStats, buff.bonuses, false); });
    buffsList.forEach(buff => { if (buff.active) applyBonus(buffed, baseStats, buff.bonuses, true); });
    return buffed;
}

function applyBonus(buffed, baseStats, bonuses, processScaling) {
    for (const [statKey, val] of Object.entries(bonuses)) {
        if (typeof val === 'object') {
            if (!processScaling) continue;
            if (statKey.endsWith('_scaling')) {
                const targetStat = mapTargetKey(statKey.replace('_bonus_scaling', ''));
                const sourceStat = mapTargetKey(val.source);
                if (targetStat && sourceStat) {
                    const sourceValue = buffed[sourceStat] || 0;
                    const bonusValue = sourceValue * val.percent;
                    buffed[targetStat] = (buffed[targetStat] || 0) + bonusValue;
                }
            }
        } else {
            if (processScaling) continue;
            if (statKey === "atk_") buffed.atk += baseStats.atk * val;
            else if (statKey === "hp_") buffed.hp += baseStats.hp * val;
            else if (statKey === "def_") buffed.def += baseStats.def * val;
            else if (statKey === "critRate_" || statKey === "critDMG_" || statKey === "enerRech_") {
                let shortKey = getShortKey(statKey);
                if(shortKey) buffed[shortKey] += val * 100;
            } else if (statKey === "eleMas") {
                buffed.em += val;
            }
            else if (statKey === buffed.dmgBonusKey || statKey === 'elemental_dmg_') {
                buffed.dmgBonus += val * 100;
            }
        }
    }
}

function getShortKey(longKey) {
    if (longKey === "critRate_") return "cr";
    if (longKey === "critDMG_") return "cd";
    if (longKey === "enerRech_") return "er";
    return null;
}

function mapTargetKey(keyPart) {
    if (keyPart === 'atk') return 'atk';
    if (keyPart === 'hp') return 'hp';
    if (keyPart === 'def') return 'def';
    if (keyPart === 'eleMas') return 'em';
    if (keyPart === 'enerRech') return 'er';
    if (keyPart === 'elemental_dmg') return 'dmgBonus';
    return null;
}

function toggleBuff(charIndex, buffIndex) {
    const p = globalPersoData[charIndex];
    if (!p) return;
    p.buffs[buffIndex].active = !p.buffs[buffIndex].active;
    p.buffedStats = calculateBuffedStats(p.baseStats, p.combatStats, p.buffs);
    renderShowcase(charIndex);
}

// --- FONCTIONS COACHING ---

function generateScoreBar(totalRolls, currentGrade) {
    const maxScale = 45;
    const percent = Math.min((totalRolls / maxScale) * 100, 100);
    const markers = [
        { val: 0, label: "F" },
        { val: 1, label: "F+" },
        { val: 2, label: "D" },
        { val: 4, label: "D+" },
        { val: 6, label: "C" },
        { val: 9, label: "C+" },
        { val: 12, label: "B" },
        { val: 15, label: "B+" },
        { val: 18, label: "A" },
        { val: 21, label: "A+" },
        { val: 24, label: "S" },
        { val: 27, label: "S+" },
        { val: 30, label: "SS" },
        { val: 32, label: "SS+" },
        { val: 34, label: "SSS" },
        { val: 36, label: "SSS+" },
        { val: 38, label: "WTF" },
        { val: 40, label: "WTF+" },
        { val: 43, label: "ARCHON" }
    ];

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

function calculatePotentialScore(persoObj, config) {
    if (!config || !config.weights) return { score: 0 };
    let fakeArtefacts = persoObj.artefacts.map(art => {
        let newSubs = art.subStats.map(sub => {
            const rolls = getRollCount(sub.key, sub.value);
            const maxValRoll = window.MAX_ROLLS && window.MAX_ROLLS[sub.key];
            const potentialValue = maxValRoll ? (rolls * maxValRoll) : sub.value;
            return { key: sub.key, value: potentialValue };
        });
        return { ...art, subStats: newSubs, mainStat: art.mainStat };
    });
    let fakePerso = { ...persoObj, artefacts: fakeArtefacts };
    return calculateCharacterScore(fakePerso, config);
}

function getCritAdvice(cr, cd) {
    if (cr > 100) return { color: '#ff4d4d', msg: `Taux CRIT excédentaire (${cr.toFixed(1)}%). Inutile de dépasser 100%.` };
    if (cr >= 85) return { color: '#22c55e', msg: "Taux CRIT excellent (>85%). Ne vous souciez plus du ratio, foncez sur le DGT CRIT." };
    const diff = (cr * 2) - cd;
    if (Math.abs(diff) < 25) return { color: '#22c55e', msg: "Ratio 1:2 Équilibré (Excellent)." };
    if (diff > 25) return { color: '#3b82f6', msg: "Ratio déséquilibré : Trop de Taux CRIT par rapport aux DGT." };
    if (diff < -25) return { color: '#eab308', msg: "Ratio déséquilibré : Manque de Taux CRIT pour être stable." };
    return { color: '#888', msg: "Analyse impossible" };
}

function getSetRecommendation(activeSets, config) {
    if (!config || !config.bestSets || config.bestSets.length === 0) return null;
    const hasBest = activeSets.some(s => config.bestSets.includes(s));
    if (hasBest) return { type: 'success', msg: "Vous utilisez le meilleur set recommandé !" };
    const hasGood = config.goodSets && activeSets.some(s => config.goodSets.includes(s));
    const recommended = config.bestSets[0].split(':')[0];
    const recName = Object.keys(SET_NAME_MAPPING).find(key => SET_NAME_MAPPING[key] === recommended) || recommended;
    if (hasGood) return { type: 'info', msg: `Set correct, mais <b>${recName} (4p)</b> serait optimal.` };
    return { type: 'warning', msg: `Set non optimal. Visez <b>${recName} (4p)</b> pour maximiser les dégâts.` };
}

// CONSEIL MAINSTAT
function getMainStatAdvice(persoObj, config) {
    const slotsToCheck = ["EQUIP_SHOES", "EQUIP_RING", "EQUIP_DRESS"];
    let warnings = [];

    persoObj.artefacts.forEach(art => {
        if (!slotsToCheck.includes(art.type)) return;

        const currentKey = art.mainStat.key;
        let weight = config.weights[currentKey];
        if (weight === undefined && currentKey.includes("_dmg_")) weight = config.weights["elemental_dmg_"];

        // Si Mainstat suboptimale
        if (!weight || weight < 1) {
            const possibleStats = SLOT_POSSIBLE_MAIN_STATS[art.type];
            if (!possibleStats) return;

            const idealStats = Object.entries(config.weights)
                .filter(([statKey, statWeight]) => {
                    if (statWeight !== 1) return false;
                    if (statKey.includes("_dmg_") && statKey !== "elemental_dmg_") return possibleStats.includes(statKey) || possibleStats.includes("pyro_dmg_");
                    if (statKey === "elemental_dmg_") return art.type === "EQUIP_RING";
                    return possibleStats.includes(statKey);
                })
                .map(([statKey]) => (statKey === "elemental_dmg_") ? "Dégâts Élem." : (STAT_LABELS[statKey] || statKey));

            if (idealStats.length > 0) {
                const pieceName = ARTIFACT_TYPE_MAPPING[art.type];
                const cleanList = [...new Set(idealStats)].join(" / ");
                warnings.push({ piece: pieceName, current: art.mainStat.label, better: cleanList });
            }
        }
    });

    // RETOUR
    if (warnings.length > 0) {
        return {
            type: "critical",
            title: "Problème Statistique Principale",
            details: warnings
        };
    } else {
        return {
            type: "success",
            title: "Statistiques Principales",
            msg: "Vos 3 pièces principales (Sablier, Coupe, Diadème) ont toutes les stats optimales."
        };
    }
}
// Calcul Difficulté Farming
function getFarmDifficulty(pieceType, mainStatKey) {
    // Si c'est Fleur ou Plume -> Facile (Stat fixe)
    if (pieceType === "EQUIP_BRACER" || pieceType === "EQUIP_NECKLACE") {
        return { label: "Facile", color: "#3b82f6" }; // Vert
    }

    const rates = MAINSTAT_DROP_RATES[pieceType];
    if (!rates || !rates[mainStatKey]) return { label: "Moyennement difficile", color: "#eab308" }; // Default

    const probability = rates[mainStatKey];

    if (probability >= 19) return { label: "Moyennement facile", color: "#22c55e" }; // Vert (>20%)
    if (probability >= 10) return { label: "Moyennement difficile", color: "#eab308" }; // Jaune (10-20%)
    if (probability >= 5) return { label: "Difficile", color: "#f97316" }; // Orange (5-10%)
    return { label: "Très difficile", color: "#ef4444" }; // Rouge (<5%)
}

// ANALYSE OFF-PIECE
function getOffPieceAdvice(persoObj) {
    let offPiece = null;
    let setPiecesScores = [];

    const activeSetKeys = Object.keys(persoObj.setsCounter).filter(key => persoObj.setsCounter[key] >= 2);

    persoObj.artefacts.forEach(art => {
        if (activeSetKeys.includes(art.setKey)) {
            setPiecesScores.push(art.score);
        } else {
            offPiece = art;
        }
    });

    if (!offPiece || setPiecesScores.length === 0) return null;

    const avgSetScore = setPiecesScores.reduce((a, b) => a + b, 0) / setPiecesScores.length;
    const isHardMainStat = offPiece.mainStat.key.includes("dmg_") || offPiece.mainStat.key.includes("crit");

    if (offPiece.score > avgSetScore) {
        return { type: "success", msg: "Excellent usage du Joker. Cette pièce porte votre build vers le haut." };
    }
    else if (isHardMainStat && offPiece.score > (avgSetScore * 0.8)) {
        return { type: "warning", msg: "Correct pour l'instant. Vu la rareté de la stat principale, on pardonne ce score moyen." };
    }
    else {
        return { type: "error", msg: "Votre pièce hors-set est moins bonne que le reste. C'est anormal pour un emplacement libre. Fouillez votre inventaire !" };
    }
}

// CONSEIL TALENTS
function getTalentAdvice(persoObj, config) {
    if (!config.talents) return null;
    const target = config.talents;
    const current = { auto: 0, skill: 0, burst: 0 };

    if (persoObj.talents.length >= 3) {
        current.auto = persoObj.talents[0].level;
        current.skill = persoObj.talents[1].level;
        current.burst = persoObj.talents[2].level;
    }

    let advices = [];
    let isPerfect = true;

    const check = (type, label) => {
        const lvl = current[type];
        const goal = target[type];
        if (goal <= 1) return;

        const diff = goal - lvl;
        if (diff >= 2) {
            isPerfect = false;
            advices.push({ type: "critical", msg: `Urgence : Montez votre <b>${label}</b> (Niv ${lvl} -> ${goal}). Gain de dégâts garanti.` });
        } else if (diff >= 1) {
            isPerfect = false;
            advices.push({ type: "info", msg: `Optimisation : Pensez à monter votre <b>${label}</b> au niveau ${goal}.` });
        }
    };

    check('auto', 'Attaque Normale');
    check('skill', 'Compétence');
    check('burst', 'Déchaînement');

    if (isPerfect && advices.length === 0) {
        return [{ type: "success", msg: "Vos aptitudes sont parfaitement optimisées. Excellent travail !" }];
    }

    return advices;
}

// NOUVEAU : Détection Forçage de Set
// 4. FORÇAGE DE SET (Mis à jour : Détection "Aime le 2p/2p")
function getSetForcingAdvice(persoObj, config) { // <-- Ajout de config ici
    let active4pSet = null;

    // Vérifie si le perso a un build 2p/2p dans ses "bestSets" (contient ":2")
    const charLikes2p2p = config.bestSets && config.bestSets.some(setStr => setStr.includes(":2"));

    for (const [setKey, count] of Object.entries(persoObj.setsCounter)) {
        if (count >= 4) {
            active4pSet = setKey;
            break;
        }
    }

    // Cas 1 : Pas de set 4p (Le joueur est en 2p/2p ou Rainbow)
    if (!active4pSet) {
        if (charLikes2p2p) {
            return {
                type: "success",
                title: "Stratégie 2p / 2p",
                msg: "Excellent choix. Ce personnage performe très bien avec un mélange de 2 pièces, ce qui vous permet de maximiser vos statistiques."
            };
        }
        return {
            type: "success",
            title: "Gestion des Sets",
            msg: "Aucun forçage détecté. Vous privilégiez les stats ou les combos 2 pièces, c'est une bonne stratégie."
        };
    }

    // Cas 2 : Set 4p actif -> On vérifie la qualité
    const setPieces = persoObj.artefacts.filter(a => a.setKey === active4pSet);
    const totalScore = setPieces.reduce((sum, art) => sum + art.score, 0);
    const avgScore = totalScore / setPieces.length;

    if (avgScore < 25) {
        let warningMsg = `Vous forcez le bonus 4 pièces avec des artéfacts faibles (Score moyen : <b>${avgScore.toFixed(1)}</b>).`;

        if (charLikes2p2p) {
            warningMsg += ` Ce personnage fonctionne pourtant très bien en <b>2 pièces / 2 pièces</b> : n'hésitez pas à casser ce set pour de meilleures stats !`;
        } else {
            warningMsg += ` Essayez de casser le set pour de meilleures stats.`;
        }

        return {
            type: "warning",
            title: "Problème de Set",
            msg: warningMsg
        };
    } else {
        return {
            type: "success",
            title: "Gestion des Sets",
            msg: `Set complet actif et de bonne qualité (Score moyen : <b>${avgScore.toFixed(1)}</b>).`
        };
    }
}

// 5. CONSEIL MÉTA SET (Best in Slot)
// 5. CONSEIL MÉTA SET (Best vs Good vs Bad)
function getMetaSetAdvice(persoObj, config) {
    if (!config.bestSets || config.bestSets.length === 0) return null;

    // Helper pour vérifier si un set de la liste est équipé
    const isSetEquipped = (setList) => {
        if (!setList) return false;
        return setList.some(setStr => {
            const [key, count] = setStr.split(":");
            return (persoObj.setsCounter[key] || 0) >= parseInt(count);
        });
    };

    // 1. CAS : BEST SET (Le joueur a un des meilleurs sets)
    if (isSetEquipped(config.bestSets)) {
        return {
            type: "success",
            title: "Choix du Set",
            msg: "Excellent. Vous utilisez un des meilleurs sets recommandés pour ce personnage."
        };
    }

    // Préparation du nom du set recommandé (Le Top 1 des bestSets)
    const [recKey, recCount] = config.bestSets[0].split(":");
    const recNameFR = Object.keys(SET_NAME_MAPPING).find(k => SET_NAME_MAPPING[k] === recKey) || recKey;
    const recommendationStr = `<b>${recNameFR} (${recCount} pièces)</b>`;

    // 2. CAS : GOOD SET (Le joueur a un set alternatif viable)
    if (isSetEquipped(config.goodSets)) {
        return {
            type: "info", // Bleu
            title: "Optimisation du Set",
            msg: `Votre set actuel est correct, mais pour maximiser les dégâts, le set recommandé est : ${recommendationStr}.`
        };
    }

    // 3. CAS : MAUVAIS SET (Ni Best, Ni Good)
    return {
        type: "warning", // Jaune/Orange
        title: "Problème de Set",
        msg: `Votre set actuel ne correspond pas aux standards du personnage. Vous devriez opter pour le set ${recommendationStr}.`
    };
}
function getWeaponAdvice(persoObj) {
    if (!persoObj.weapon) return null;

    if (persoObj.weapon.level < 90) {
        return {
            type: "warning", // Orange/Rouge
            title: "Niveau d'Arme",
            msg: `Gain Facile : Montez votre arme niveau 90 pour maximiser l'ATQ de base.`
        };
    } else {
        return {
            type: "success", // Vert
            title: "Niveau d'Arme",
            msg: `Parfait. Votre arme est au niveau maximum (90).`
        };
    }
}

// NOUVEAU : Conseil Niveau 90
function getLevelAdvice(persoObj) {
    if (persoObj.level < 90) {
        return {
            type: "info", // Bleu/Info
            title: "Niveau du Personnage",
            msg: `Gain Facile : Montez votre personnage niveau 90 pour un gain de stats garanti.`
        };
    } else {
        return {
            type: "success", // Vert
            title: "Niveau du Personnage",
            msg: `Excellent. Votre personnage est niveau 90.`
        };
    }
}


function calculateRollDistribution(persoObj, config) {
    if (!config || !config.weights) return { useful: 0, dead: 0, total: 0 };
    let useful = 0;
    let dead = 0;
    persoObj.artefacts.forEach(art => {
        art.subStats.forEach(sub => {
            let w = config.weights[sub.key];
            if (w === undefined && sub.key.includes("_dmg_")) w = config.weights["elemental_dmg_"];
            const rolls = getRollCount(sub.key, sub.value);
            if (w && w > 0) useful += rolls; else dead += rolls;
        });
    });
    return { useful, dead, total: useful + dead };
}

function calculateDeadRolls(persoObj, config) {
    if (!config || !config.weights) return { count: 0, details: [] };
    let deadRolls = 0;
    let deadStatsCounts = {};
    persoObj.artefacts.forEach(art => {
        art.subStats.forEach(sub => {
            let w = config.weights[sub.key];
            if (w === undefined && sub.key.includes("_dmg_")) w = config.weights["elemental_dmg_"];
            if (!w || w === 0) {
                const rolls = getRollCount(sub.key, sub.value);
                deadRolls += rolls;
                deadStatsCounts[sub.key] = (deadStatsCounts[sub.key] || 0) + rolls;
            }
        });
    });
    const details = Object.entries(deadStatsCounts)
        .filter(([_, count]) => count > 0)
        .map(([key, count]) => ({ label: STAT_LABELS[key] || key, count: count }))
        .sort((a, b) => b.count - a.count);
    return { count: deadRolls, details: details };
}

function getPriorities(persoObj) {
    if (!persoObj.artefacts || persoObj.artefacts.length === 0) return [];
    const sorted = [...persoObj.artefacts].sort((a, b) => a.score - b.score);
    return sorted.slice(0, 3).map(art => {
        const typeName = ARTIFACT_TYPE_MAPPING[art.type] || art.type;
        return {
            piece: typeName,
            score: art.score,
            grade: art.grade.letter,
            color: art.grade.color,
            type: art.type,
            mainKey: art.mainStat.key
        };
    });
}

function calculateRNGQuality(persoObj, config) {
    if (!config || !config.weights || !window.MAX_ROLLS) return 0;
    let totalPct = 0;
    let count = 0;
    persoObj.artefacts.forEach(art => {
        art.subStats.forEach(sub => {
            let w = config.weights[sub.key];
            if (w === undefined && sub.key.includes("_dmg_")) w = config.weights["elemental_dmg_"];
            if (w && w > 0) {
                const maxVal = window.MAX_ROLLS[sub.key];
                if (maxVal) {
                    const rolls = getRollCount(sub.key, sub.value);
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

// --- FONCTION CORRIGÉE : SIMULATION POTENTIEL CACHÉ ---
function simulateDeadStatReplacements(persoObj, config) {
    if (!config || !config.weights) return [];
    let suggestions = [];

    persoObj.artefacts.forEach(art => {
        let deadStats = [];
        let presentStats = new Set();

        // 1. Identifier les stats mortes et les stats présentes
        art.subStats.forEach(sub => {
            presentStats.add(sub.key);
            let w = config.weights[sub.key];
            if (w === undefined && sub.key.includes("_dmg_")) w = config.weights["elemental_dmg_"];

            // Si le poids est 0 ou indéfini, c'est une stat morte
            if (!w || w === 0) {
                const rolls = getRollCount(sub.key, sub.value);
                // On ne simule que s'il y a eu au moins un roll dedans (sinon c'est juste une stat de base)
                if (rolls > 0) {
                    deadStats.push({
                        key: sub.key,
                        rolls: rolls,
                        label: STAT_LABELS[sub.key] || sub.key
                    });
                }
            }
        });

        if (deadStats.length === 0) return;

        // 2. Identifier les stats cibles (CORRECTION ICI : On prend tout ce qui est utile > 0)
        const desiredStats = Object.entries(config.weights)
            .filter(([key, w]) => w > 0) // Avant c'était w > 0.5, maintenant c'est n'importe quel gain positif
            .sort((a, b) => b[1] - a[1]) // On trie par importance (Poids le plus haut en premier)
            .map(([key]) => key);

        deadStats.sort((a, b) => b.rolls - a.rolls); // On traite les plus gros gâchis en premier

        let replacements = [];
        let usedTargets = new Set(presentStats);

        deadStats.forEach(dead => {
            // Trouver la meilleure stat utile qui n'est pas déjà sur l'artéfact
            let targetKey = desiredStats.find(k =>
                !usedTargets.has(k) &&
                !k.includes("_dmg_") && // Pas de bonus dégâts en substat
                k !== art.mainStat.key // Pas la même que la mainstat
            );

            if (targetKey && SUBSTAT_RANGES[targetKey]) {
                usedTargets.add(targetKey); // On marque cette stat comme "virtuellement ajoutée" pour ne pas la proposer 2 fois

                const range = SUBSTAT_RANGES[targetKey];
                const minVal = (range.min * dead.rolls).toFixed(1);
                const maxVal = (range.max * dead.rolls).toFixed(1);
                const suffix = (targetKey.endsWith('_') || targetKey === "enerRech_" || targetKey === "critRate_" || targetKey === "critDMG_") ? "%" : "";
                const targetLabel = STAT_LABELS[targetKey] || targetKey;

                replacements.push({
                    dead: `${dead.label} (${dead.rolls})`,
                    target: `${targetLabel} (${dead.rolls})`,
                    gain: `+${minVal} à ${maxVal}${suffix} ${targetLabel}`
                });
            }
        });

        if (replacements.length > 0) {
            const pieceName = ARTIFACT_TYPE_MAPPING[art.type] || art.type;
            const deadText = replacements.map(r => `<span style="color:#ff6b6b">${r.dead}</span>`).join(' et ');
            const targetText = replacements.map(r => `<span style="color:var(--accent-gold)">${r.target}</span>`).join(' et ');
            const gainText = replacements.map(r => `<div style="font-weight:bold; color:var(--accent-gold); margin-top:2px;">${r.gain}</div>`).join('');

            suggestions.push({
                pieceName: pieceName,
                text: `Remplacer ${deadText} par ${targetText} :`,
                gainHtml: gainText,
                totalDeadRolls: deadStats.reduce((acc, curr) => acc + curr.rolls, 0)
            });
        }
    });

    suggestions.sort((a, b) => b.totalDeadRolls - a.totalDeadRolls);
    return suggestions;
}
// CALCULATEUR REROLL (VERSION FINALE : BADGES VARIÉS)
function calculateRerollMetrics(artifact, config) {
    if (!config || !config.weights || !window.MAX_ROLLS) return null;

    let totalRolls = 0;

    // Variables pour le calcul précis
    let currentWeightedScore = 0; // Le score actuel de l'artéfact
    let presentWeights = []; // Les poids des 4 stats présentes
    let usefulSubstatsCount = 0;

    // 1. ANALYSE DE L'EXISTANT
    artifact.subStats.forEach(sub => {
        const rolls = getRollCount(sub.key, sub.value);
        totalRolls += rolls;

        let w = config.weights[sub.key];
        if (w === undefined && sub.key.includes("_dmg_")) w = config.weights["elemental_dmg_"];

        // Si pas de poids défini, on considère 0
        const weight = (w && w > 0) ? w : 0;

        if (weight > 0) usefulSubstatsCount++;

        presentWeights.push(weight);

        // Score Actuel = Somme des (Rolls * Poids)
        // Note : On pourrait intégrer la qualité ici (low roll vs high roll),
        // mais pour la distribution pure, on compte les rolls.
        // Pour être très précis sur le potentiel "gain", on pourrait inclure la rollValue.
        // Restons sur la "Distribution" comme demandé.
        currentWeightedScore += (rolls * weight);
    });

    // Clamp (Sécurité)
    if (totalRolls < 8) totalRolls = 8;
    if (totalRolls > 9) totalRolls = 9;

    // 2. CALCUL DU PLAFOND THÉORIQUE (MAX SCORE)
    // Contrainte : 1 roll minimum par stat présente (Base) + le reste en upgrades

    // A. Score des 4 lignes de base (Immuable)
    // On suppose que l'artéfact a 4 lignes maintenant.
    // Si il en avait 3 au début, la 4ème est apparue au lvl 4. Elle est aussi "immuable" une fois là.
    const baseScore = presentWeights.reduce((a, b) => a + b, 0); // Somme des poids des 4 stats

    // B. Score des Upgrades (Ce qu'on peut reroll)
    const upgradeRollsAvailable = totalRolls - 4; // 8-4=4 ou 9-4=5
    const maxWeightAvailable = Math.max(...presentWeights); // La meilleure stat présente
    const maxUpgradeScore = upgradeRollsAvailable * maxWeightAvailable; // Tout dans la meilleure stat

    const theoreticalMaxScore = baseScore + maxUpgradeScore;

    // 3. INDICATEUR DE PERFECTION (0.0 à 1.0)
    // À quel point sommes-nous proches du max mathématique ?
    // Dans ton exemple : Actuel = 8.05, Max = 8.05 -> Ratio = 1.0
    const perfectionRatio = (theoreticalMaxScore > 0) ? (currentWeightedScore / theoreticalMaxScore) : 0;


    // --- CALCULS FINAUX ---

    // A. POTENTIEL DE GAIN
    // C'est l'écart par rapport à la perfection...
    // ...Pondéré par la qualité de l'artéfact (Ceiling).
    // Si l'artéfact a 2 stats utiles, le TheoreticalMaxScore est faible.
    // Donc même si on a un gros écart, ça ne vaut pas le coup.

    const gapToPerfection = 1 - perfectionRatio; // 0% dans ton exemple

    // Facteur limitant : Nombre de lignes utiles (Quadratique)
    // 4 lignes = 100% du potentiel exprimable
    // 2 lignes = 17% du potentiel exprimable
    const ceilingFactor = Math.pow((usefulSubstatsCount / 4), 2.5);

    // Bonus Structure (9 rolls > 8 rolls)
    const structureBonus = (totalRolls === 9) ? 1.05 : 1.0;

    // Potentiel Final
    let potential = gapToPerfection * ceilingFactor * structureBonus * 100;

    // Petit boost si on a des low rolls (qualité), mais mineur
    // (Non implémenté ici pour rester focus sur la distribution, comme demandé)


    // B. RISQUE DE PERTE
    // Le risque est directement lié à la perfection actuelle.
    // Plus on est proche du max, plus le risque est exponentiel.
    let risk = Math.pow(perfectionRatio, 2.5) * 100;


    // --- BADGES ---
    let badge = { text: "Neutre", color: "#9ca3af" };

    if (potential < 20 && usefulSubstatsCount < 3) {
        badge = { text: "Avenir Limité", color: "#4b5563" }; // Gris
    }
    else if (risk > 85 && potential < 15) {
        badge = { text: "Reroll déconseillé", color: "#ef4444" }; // Violet
    }
    else if (risk > 65) {
        badge = { text: "Garder (Solide)", color: "#ef4444" }; // Rouge
    }
    else if (potential > 60 && risk < 40) {
        badge = { text: "Reroll envisageable", color: "#22c55e" }; // Vert
    }
    else if (potential > 50) {
        badge = { text: "Casino (Double ou Rien)", color: "#f97316" }; // Orange
    }
    else if (potential > 30) {
        badge = { text: "Optimisable", color: "#3b82f6" }; // Bleu
    }

    return {
        potential: Math.round(potential),
        risk: Math.round(risk),
        badge: badge
    };
}

// --- PROCESS ---
function processData(data) {
    if (!data.avatarInfoList) return;
    globalPersoData = [];

    const G_CHAR_CONFIG = window.CHARACTER_CONFIG || {};
    const G_WEAPON_PASSIVES = window.WEAPON_PASSIVES || {};
    const G_SET_PASSIVES = window.SET_PASSIVES || {};
    const G_DEFAULT_CONFIG = window.DEFAULT_CONFIG || { weights: {}, bestSets: [], goodSets: [] };

    data.avatarInfoList.forEach(perso => {
        const id = perso.avatarId;
        const info = charData[id] || {};
        const nom = getText(info.NameTextMapHash) || "Inconnu";
        const rarity = info.QualityType === "QUALITY_ORANGE" ? 5 : 4;
        const level = perso.propMap['4001'] ? parseInt(perso.propMap['4001'].val) : 0;
        const constellations = perso.talentIdList ? perso.talentIdList.length : 0;

        const elemInfo = ELEMENT_DATA[info.Element] || { id: 30, key: "physical_dmg_" };

        const talents = [];
        if (info.SkillOrder) {
            info.SkillOrder.forEach(skillId => {
                let lvl = perso.skillLevelMap[skillId] || 0;
                const iconName = info.Skills && info.Skills[skillId] ? info.Skills[skillId] : "Skill_A_01";
                talents.push({ level: lvl, icon: `https://enka.network/ui/${iconName}.png` });
            });
        }

        const namePart = info.SideIconName ? info.SideIconName.split('_').pop() : "Nilou";
        const splashUrl = `https://enka.network/ui/UI_Gacha_AvatarImg_${namePart}.png`;
        const sideIcon = `https://enka.network/ui/${info.SideIconName?.replace("Side_Match", "Side")}.png`;

        const fp = perso.fightPropMap;
        const baseStats = { hp: fp[1] || 0, atk: fp[4] || 0, def: fp[7] || 0 };
        const combatStats = {
            hp: fp[2000], atk: fp[2001], def: fp[2002], em: fp[28],
            cr: fp[20] * 100, cd: fp[22] * 100, er: fp[23] * 100,
            hb: (fp[26] || 0) * 100,
            dmgBonus: (fp[elemInfo.id] || 0) * 100,
            dmgBonusKey: elemInfo.key
        };

        const artefacts = [];
        let weapon = null;
        let setsCounter = {};

        perso.equipList.forEach(item => {
            const flat = item.flat;
            if (item.weapon) {
                const main = flat.weaponStats && flat.weaponStats[0] ? formatStat(flat.weaponStats[0].appendPropId, flat.weaponStats[0].statValue) : null;
                const sub = flat.weaponStats && flat.weaponStats[1] ? formatStat(flat.weaponStats[1].appendPropId, flat.weaponStats[1].statValue) : null;
                weapon = {
                    name: getText(flat.nameTextMapHash), level: item.weapon.level,
                    rank: (item.weapon.affixMap ? Object.values(item.weapon.affixMap)[0] : 0) + 1,
                    icon: `https://enka.network/ui/${flat.icon}.png`, baseAtk: main, subStat: sub, stars: flat.rankLevel
                };
            }
            if (flat.itemType === "ITEM_RELIQUARY") {
                const nomSetFR = getText(flat.setNameTextMapHash);
                const setKey = SET_NAME_MAPPING[nomSetFR] || "UnknownSet";
                setsCounter[setKey] = (setsCounter[setKey] || 0) + 1;
                const subs = [];
                if (flat.reliquarySubstats) {
                    flat.reliquarySubstats.forEach(s => { subs.push(formatStat(s.appendPropId, s.statValue)); });
                }
                artefacts.push({
                    type: flat.equipType, setKey: setKey, setName: nomSetFR,
                    icon: `https://enka.network/ui/${flat.icon}.png`,
                    mainStat: formatStat(flat.reliquaryMainstat.mainPropId, flat.reliquaryMainstat.statValue),
                    subStats: subs, level: item.reliquary.level - 1, stars: flat.rankLevel
                });
            }
        });

        let buffs = [];
        const addBuffs = (sourceName, category, configData) => {
            if (Array.isArray(configData)) {
                configData.forEach((item, idx) => {
                    let name = item.label || `Buff ${idx + 1}`;
                    if (!item.label && !Array.isArray(item.stats)) {
                        const statsStr = Object.entries(item.stats).map(([k, v]) => {
                            const l = STAT_LABELS[k] || k;
                            const val = (typeof v === 'number' && v < 2) ? Math.round(v*100)+'%' : v;
                            return `${l} +${val}`;
                        }).join(", ");
                        name = statsStr;
                    }
                    buffs.push({ id: `${category}_${idx}`, category, name, bonuses: item.stats, active: true });
                });
            }
            else {
                for (const [statKey, val] of Object.entries(configData)) {
                    if (typeof val === 'object' && statKey.endsWith('_scaling')) {
                        const targetStat = statKey.replace('_bonus_scaling', '');
                        const sourceStat = val.source;
                        const targetLabel = STAT_LABELS[targetStat] || targetStat;
                        const sourceLabel = STAT_LABELS[sourceStat] || sourceStat;
                        const percentDisplay = (val.percent * 100).toFixed(2) + "%";
                        buffs.push({
                            id: `${category}_${statKey}`, category, name: `${targetLabel} (+${percentDisplay} ${sourceLabel})`,
                            bonuses: { [statKey]: val }, active: true
                        });
                        continue;
                    }
                    if (typeof val !== 'object') {
                        const statLabel = STAT_LABELS[statKey] || statKey;
                        const valDisplay = (val < 2) ? Math.round(val * 100) + "%" : val;
                        buffs.push({
                            id: `${category}_${statKey}`, category, name: `${statLabel} (+${valDisplay})`,
                            bonuses: { [statKey]: val }, active: true
                        });
                    }
                }
            }
        };

        if (weapon && G_WEAPON_PASSIVES[weapon.name]) addBuffs(weapon.name, `${weapon.name} (Arme)`, G_WEAPON_PASSIVES[weapon.name]);
        if (G_SET_PASSIVES) {
            for (const [setKey, count] of Object.entries(setsCounter)) {
                if (G_SET_PASSIVES[setKey]) {
                    const setBonuses = G_SET_PASSIVES[setKey];
                    const setName = artefacts.find(a => a.setKey === setKey)?.setName || setKey;
                    const setCategory = `${setName} (Set)`;
                    if (count >= 2 && setBonuses[2]) addBuffs(setName, setCategory, setBonuses[2]);
                    if (count >= 4 && setBonuses[4]) addBuffs(setName, setCategory, setBonuses[4]);
                }
            }
        }

        const buffedStats = calculateBuffedStats(baseStats, combatStats, buffs);
        const persoObj = {
            id: id, nom, rarity, level, cons: constellations, talents,
            image: sideIcon, splashArt: splashUrl, combatStats, buffedStats, baseStats,
            weapon, artefacts, setsCounter, buffs, evaluation: null, weights: null
        };

        const configKey = persoObj.nom.replace(/\s+/g, '') || "Default";
        const config = G_CHAR_CONFIG[configKey] || G_CHAR_CONFIG[persoObj.nom] || G_DEFAULT_CONFIG;
        persoObj.evaluation = calculateCharacterScore(persoObj, config);
        persoObj.weights = config.weights;
        globalPersoData.push(persoObj);
    });

    renderSidebar();
    if(globalPersoData.length > 0) renderShowcase(0);
}

// ... (RENDER SIDEBAR Identique) ...
function renderSidebar() {
    const list = document.getElementById('sidebar-list');
    if(!list) return;
    list.innerHTML = "";
    globalPersoData.forEach((p, index) => {
        const div = document.createElement('div');
        div.className = `char-card ${index === 0 ? 'active' : ''}`;
        div.onclick = () => {
            document.querySelectorAll('.char-card').forEach(c => c.classList.remove('active'));
            div.classList.add('active');
            renderShowcase(index);
        };
        div.innerHTML = `
            <img src="${p.image}" class="char-avatar-small" style="border-color:${p.rarity === 5 ? '#eab308' : '#a855f7'}">
            <div style="flex:1">
                <div style="font-weight:600">${p.nom}</div>
                <div style="font-size:0.85rem; color:#aaa">Score: ${p.evaluation.score} 
                    <span style="color:${p.evaluation.grade.color}; float:right; font-weight:bold;">${p.evaluation.grade.letter}</span>
                </div>
            </div>`;
        list.appendChild(div);
    });
}

function renderShowcase(index) {
    const p = globalPersoData[index];
    const container = document.getElementById('main-container');
    if(!container) return;

    const configKey = p.nom.replace(/\s+/g, '') || "Default";
    const config = window.CHARACTER_CONFIG[configKey] || window.CHARACTER_CONFIG[p.nom] || window.DEFAULT_CONFIG;

    const s = p.combatStats;
    const b = p.buffedStats;
    const ev = p.evaluation;

    const charColor = config.color || "#4b5563";
    container.style.setProperty('--char-hex', charColor);

    let talentsHtml = `<div style="display:flex; justify-content:center; gap:20px; margin-top:20px;">`;
    p.talents.forEach(t => {
        talentsHtml += `
            <div style="width:50px; height:50px; background:#2d3342; border-radius:50%; display:flex; flex-direction:column; align-items:center; justify-content:center; position:relative; border:2px solid #555;">
                <img src="${t.icon}" style="width:30px; height:30px;">
                <div style="position:absolute; bottom:-10px; background:#111; padding:2px 6px; border-radius:10px; font-size:0.7rem; border:1px solid #333; font-weight:bold;">${t.level}</div>
            </div>`;
    });
    talentsHtml += `</div>`;

    const statLine = (svg, label, val, isHighlight=false) => `
        <div class="stat-row">
            <span class="text-muted" style="display:flex; align-items:center; gap:8px;">${svg} ${label}</span> 
            <div class="dotted-line"></div> 
            <span class="stat-val" style="${isHighlight ? 'color:var(--accent-gold)' : ''}">${val}</span>
        </div>`;

    const dmgStat = formatStat(b.dmgBonusKey, b.dmgBonus / 100);

    // --- PARTIE HAUTE (STATS + EQUIPMENT) ---
    let html = `<div class="top-row" style="display:flex; gap:20px; align-items:flex-start; flex-wrap:wrap;">`;

    // 1. Showcase Area (Gauche)
    html += `
        <div class="showcase-area" style="flex: 0 0 350px;">
            <div class="splash-art-container" style="background-image: url('${p.splashArt}');"></div>
            <div>
                <div style="display:flex; justify-content:space-between; align-items:end; margin-bottom:10px;">
                    <h1 style="font-size:2rem; font-weight:800; line-height:1;">${p.nom}</h1>
                    <div style="text-align:right;">
                        <div style="font-size:0.9rem; color:#aaa;">Niv. ${p.level}</div>
                        <div style="font-size:0.9rem; color:var(--accent-gold); font-weight:bold;">C${p.cons}</div>
                    </div>
                </div>
                
                <h3 style="font-size:0.8rem; color:#888; text-transform:uppercase; margin-bottom:5px;">Stats Menu</h3>
                ${statLine(createIcon('hp'), "PV max", Math.round(s.hp))}
                ${statLine(createIcon('atk'), "ATQ", Math.round(s.atk))}
                ${statLine(createIcon('def'), "DÉF", Math.round(s.def))}
                ${statLine(createIcon('eleMas'), "Maîtrise élémentaire", Math.round(s.em))}
                ${statLine(createIcon('critRate_'), "Taux CRIT", s.cr.toFixed(1)+'%')}
                ${statLine(createIcon('critDMG_'), "DGT CRIT", s.cd.toFixed(1)+'%')}
                ${statLine(createIcon('enerRech_'), "Recharge d'énergie", s.er.toFixed(1)+'%')}
                ${statLine(createIcon('heal_'), "Bonus de soins", (s.hb || 0).toFixed(1)+'%')}
                ${statLine(formatStat(s.dmgBonusKey, s.dmgBonus / 100).icon, formatStat(s.dmgBonusKey, s.dmgBonus / 100).label, s.dmgBonus.toFixed(1)+'%')}

                ${talentsHtml}
                
                <div style="background:rgba(0,0,0,0.2); padding:15px; border-radius:8px; margin-top:15px; border:1px solid #333;">
                    <h3 style="font-size:0.9rem; color:var(--accent-gold); text-transform:uppercase; margin-bottom:10px; font-weight:bold;">Stats de Combat</h3>
                    
                    ${(() => {
                        let html = "";
                
                        // 1. Stats conditionnelles (Uniquement si Poids > 0)
                        const statDefs = [
                            { wKey: 'hp',        sKey: 'hp',  icon: 'hp',        label: 'PV max',      isPct: false },
                            { wKey: 'atk',       sKey: 'atk', icon: 'atk',       label: 'ATQ',         isPct: false },
                            { wKey: 'def',       sKey: 'def', icon: 'def',       label: 'DÉF',         isPct: false },
                            { wKey: 'eleMas',    sKey: 'em',  icon: 'eleMas',    label: 'Maîtrise élémentaire',    isPct: false },
                            { wKey: 'critRate_', sKey: 'cr',  icon: 'critRate_', label: 'Taux CRIT',   isPct: true },
                            { wKey: 'critDMG_',  sKey: 'cd',  icon: 'critDMG_',  label: 'DGT CRIT',    isPct: true },
                            { wKey: 'enerRech_', sKey: 'er',  icon: 'enerRech_', label: "Recharge d'énergie",          isPct: true }
                        ];
                
                        statDefs.forEach(def => {
                            if (p.weights && p.weights[def.wKey] > 0) {
                                const val = b[def.sKey];
                                const oldVal = s[def.sKey];
                                const displayVal = def.isPct ? val.toFixed(1) + '%' : Math.round(val);
                                const isBuffed = val > oldVal;
                                html += statLine(createIcon(def.icon), def.label, displayVal, isBuffed);
                            }
                        });
                
                        // 2. AJOUT : Bonus de Soins (Toujours affiché pour combler l'espace)
                        // On utilise s.hb (stat de base) car b.hb n'est pas encore calculé dans les buffs, mais ça suffit pour l'affichage.
                        const healVal = s.hb || 0;
                        html += statLine(createIcon('heal_'), "Bonus de soins", healVal.toFixed(1)+'%', false);
                
                        // 3. Bonus de Dégâts Élémentaire (Toujours affiché)
                        const dmgStat = formatStat(b.dmgBonusKey, b.dmgBonus / 100);
                        const isDmgBuffed = b.dmgBonus > s.dmgBonus;
                        html += statLine(dmgStat.icon, dmgStat.label, b.dmgBonus.toFixed(1)+'%', isDmgBuffed);
                
                        return html;
                    })()}
                </div>

                <div class="global-score-card">
                    <div>
                        <div style="color:var(--accent-gold); font-size:0.8rem; text-transform:uppercase; font-weight:bold; display:flex; align-items:center;">
                            ${createIcon('score')} Score Global
                        </div>
                        <div style="font-size:0.8rem; color:#888; margin-top:2px;">Rolls: ${ev.totalRolls}</div>
                    </div>
                    <div style="text-align:right;">
                        <span style="font-size:1.8rem; font-weight:800; line-height:1;">${ev.score}</span>
                        <span style="color:${ev.grade.color}; font-weight:bold; font-size:1.2rem;">${ev.grade.letter}</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    // 2. Equipment Area (Droite)
    html += `<div class="equipment-area" style="flex: 1;">`;

    if (p.weapon) {
        html += `
            <div class="card weapon-card">
                <img src="${p.weapon.icon}" class="item-img" style="width:80px; height:80px; border:2px solid ${p.weapon.stars === 5 ? '#eab308' : '#d1d5db'}">
                <div style="flex:1">
                    <div style="font-weight:700; font-size:1.1rem; color:${p.weapon.stars === 5 ? '#eab308' : '#fff'}">${p.weapon.name}</div>
                    <div style="color:var(--accent-gold); font-size:0.9rem; margin-bottom:5px;">Niv. ${p.weapon.level} • R${p.weapon.rank}</div>
                    <div style="display:flex; gap:15px; margin-top:5px; background:rgba(0,0,0,0.2); padding:5px; border-radius:4px;">
                        ${p.weapon.baseAtk ? `
                        <div style="text-align:center;">
                            <div style="font-size:0.7rem; color:#aaa;">ATQ de base</div>
                            <div style="font-weight:bold; font-size:1.1rem;">${p.weapon.baseAtk.value}</div>
                        </div>` : ''}
                        ${p.weapon.subStat ? `
                        <div style="text-align:center; border-left:1px solid #444; padding-left:15px;">
                            <div style="font-size:0.7rem; color:#aaa;">${p.weapon.subStat.label}</div>
                            <div style="font-weight:bold; font-size:1.1rem; color:#ddd;">${formatValueDisplay(p.weapon.subStat.key, p.weapon.subStat.value)}</div>
                        </div>` : ''}
                    </div>
                </div>
            </div>`;
    }

    p.artefacts.forEach(art => {
        let subsHtml = "";
        art.subStats.forEach(sub => {
            let w = p.weights[sub.key];
            if (w === undefined && sub.key.includes("dmg_")) w = p.weights["elemental_dmg_"] || 0;
            if (w === undefined) w = 0;
            const isDead = w === 0;
            const rolls = getRollCount(sub.key, sub.value);
            subsHtml += `
                <div class="substat-row ${isDead ? 'dead' : ''}">
                    <span style="display:flex; align-items:center; gap:5px;">
                        <span style="color:#aaa; display:inline-flex;">${sub.icon}</span> 
                        ${sub.label}
                        ${rolls > 0 ? `<span style="background:rgba(255, 177, 59, 0.15); color:#FFB13B; font-size:0.7rem; padding:1px 5px; border-radius:4px; font-weight:bold;">[${rolls}]</span>` : ''}
                    </span>
                    <span>${formatValueDisplay(sub.key, sub.value)}</span>
                </div>`;
        });
        const pieceName = ARTIFACT_TYPE_MAPPING[art.type] || art.type;
        html += `
            <div class="card">
                <div class="item-header">
                    <div style="position:relative; display:inline-block;">
                        <img src="${art.icon}" class="item-img" style="border: 2px solid ${art.stars === 5 ? '#FFB13B' : '#a855f7'};">
                        <div style="position:absolute; bottom:0; right:0; background:rgba(0,0,0,0.8); color:white; font-size:0.65rem; padding:1px 4px; border-top-left-radius:4px;">+${art.level}</div>
                    </div>
                    <div style="overflow:hidden; display:flex; flex-direction:column; justify-content:center; margin-left: 10px;">
                        <div style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-weight:600; font-size:0.9rem;">${pieceName}</div>
                        <div style="font-size:0.75rem; color:var(--accent-gold); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${art.setName}</div>
                        <div style="font-size:0.7rem; color:#aaa;">${art.stars}★</div>
                    </div>
                </div>
                <div class="main-stat-display">
                    <span>${formatValueDisplay(art.mainStat.key, art.mainStat.value)}</span>
                    <span style="display:flex; align-items:center; gap:5px; font-size:0.7rem; color:#aaa; font-weight:normal; align-self:center;">
                        <span style="color:#fff; display:inline-flex;">${art.mainStat.icon}</span> ${art.mainStat.label}
                    </span>
                </div>
                <div style="margin-top:10px;">${subsHtml}</div>
                <div class="art-score-footer">
                    <span style="display:flex; align-items:center;">${createIcon('score')} Score</span>
                    <strong style="color:${art.grade.color}">${art.score} (${art.grade.letter})</strong>
                </div>
            </div>`;
    });

    if (p.buffs && p.buffs.length > 0) {
        let buffListHtml = "";
        let lastCategory = "";
        p.buffs.forEach((buff, bIndex) => {
            if (buff.category !== lastCategory) {
                buffListHtml += `
                    <div style="font-size:0.8rem; color:var(--accent-gold); font-weight:bold; margin-top:10px; margin-bottom:5px; border-bottom:1px dashed #444; padding-bottom:2px;">
                        ${buff.category}
                    </div>`;
                lastCategory = buff.category;
            }
            buffListHtml += `
                <div style="display:flex; align-items:center; justify-content:space-between; padding:6px 8px; background:rgba(0,0,0,0.2); margin-bottom:4px; border-radius:4px;">
                    <span style="font-size:0.8rem; color:#ddd;">${buff.name}</span>
                    <label class="switch" style="position:relative; display:inline-block; width:30px; height:16px;">
                        <input type="checkbox" ${buff.active ? 'checked' : ''} onchange="toggleBuff(${index}, ${bIndex})" style="opacity:0; width:0; height:0;">
                        <span style="position:absolute; cursor:pointer; top:0; left:0; right:0; bottom:0; background-color:#333; transition:.4s; border-radius:34px;"></span>
                        <span style="position:absolute; content:''; height:12px; width:12px; left:2px; bottom:2px; background-color:white; transition:.4s; border-radius:50%; ${buff.active ? 'transform:translateX(14px); background-color:var(--accent-gold);' : ''}"></span>
                    </label>
                </div>`;
        });
        html += `
            <div class="card" style="border-color:var(--accent-gold); background:rgba(255, 177, 59, 0.05);">
                <div style="font-weight:bold; color:var(--accent-gold); text-transform:uppercase; font-size:0.9rem; margin-bottom:10px; border-bottom:1px solid #444; padding-bottom:5px;">
                    <i class="fa-solid fa-bolt"></i> Buffs Actifs
                </div>
                <div style="flex:1;">${buffListHtml}</div>
                <div style="font-size:0.75rem; color:#888; text-align:center; margin-top:10px;">Cochez pour appliquer les passifs</div>
            </div>`;
    }

    html += `</div></div>`; // Fin equipment-area et top-row

    // --- 3. COACHING SECTION (Bas - Full Width - Structuré par Familles) ---
    html += `
        <div class="coaching-row" style="margin-top:20px; width:100%;">
            ${(() => {
        const potential = calculatePotentialScore(p, config);
        const efficiency = (potential.score > 0) ? ((ev.score / potential.score) * 100).toFixed(1) : 0;
        let effColor = '#ff4d4d';
        if (efficiency > 70) effColor = '#eab308';
        if (efficiency > 85) effColor = '#22c55e';
        if (efficiency > 95) effColor = '#a855f7';

        const gain = (potential.score - ev.score).toFixed(1);
        const setAdvice = getSetRecommendation(ev.setBonus, config);
        const deadRolls = calculateDeadRolls(p, config);
        const priorities = getPriorities(p);
        const critAdvice = getCritAdvice(b.cr, b.cd);
        const rollStats = calculateRollDistribution(p, config);
        const rngQuality = calculateRNGQuality(p, config).toFixed(1);
        const deadSims = simulateDeadStatReplacements(p, config);
        const mainStatAdvices = getMainStatAdvice(p, config);

        // APPELS NOUVELLES FONCTIONS
        const offPieceAdvice = getOffPieceAdvice(p);
        const talentAdvices = getTalentAdvice(p, config);
        const setForcingAdvice = getSetForcingAdvice(p, config);
        const levelAdvice = getLevelAdvice(p);

        return `
                <div style="background:rgba(30, 35, 45, 0.95); border:1px solid #444; border-radius:8px; padding:20px;">
                    <h2 style="color:#fff; margin-bottom:25px; font-size:1.4rem; text-transform:uppercase; border-bottom:2px solid var(--accent-gold); padding-bottom:10px; display:flex; align-items:center; gap:10px;">
                        <i class="fa-solid fa-chart-line" style="color:var(--accent-gold)"></i> ANALYSE & CONSEILS
                    </h2>
                    
                    <div style="display:flex; flex-direction:column; gap:30px;">
                        
                        <div>
                            <h3 style="color:#ccc; font-size:1rem; text-transform:uppercase; margin-bottom:15px; border-left:4px solid var(--accent-gold); padding-left:10px;">1. Vue d'ensemble</h3>
                            <div style="background:rgba(0,0,0,0.2); padding:15px; border-radius:8px;">
                                ${generateScoreBar(ev.totalRolls, ev.grade.letter)}
                                
                                <div style="display:flex; justify-content:space-around; align-items:center; margin-top:20px; flex-wrap:wrap; gap:20px;">
                                    <div style="text-align:center;">
                                        <div style="font-size:0.8rem; color:#aaa; text-transform:uppercase;">Efficacité du Build</div>
                                        <div style="font-size:2.5rem; font-weight:800; color:${effColor}; line-height:1;">${efficiency}%</div>
                                    </div>
                                    <div style="text-align:center;">
                                        <div style="font-size:0.8rem; color:#aaa; text-transform:uppercase;">Facteur Chance (RNG)</div>
                                        <div style="font-size:2.5rem; font-weight:800; color:${rngQuality > 85 ? '#22c55e' : (rngQuality > 75 ? '#eab308' : '#ff4d4d')}; line-height:1;">${rngQuality}%</div>
                                    </div>
                                    <div style="flex:1; min-width:200px;">
                                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px; font-size:0.8rem;">
                                            <span style="color:#ccc;">Score Potentiel Max</span>
                                            <span style="font-weight:bold; color:var(--accent-gold);">${potential.score} <span style="color:#22c55e; font-size:0.7rem;">(+${gain})</span></span>
                                        </div>
                                        <div style="width:100%; background:#333; height:10px; border-radius:5px; position:relative;">
                                            <div style="height:100%; background:#fff; width:${Math.min((ev.score / potential.score)*100, 100)}%; border-radius:5px; position:absolute;"></div>
                                            <div style="height:100%; background:var(--accent-gold); width:100%; opacity:0.3; border-radius:5px;"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 style="color:#ccc; font-size:1rem; text-transform:uppercase; margin-bottom:15px; border-left:4px solid var(--accent-gold); padding-left:10px;">2. Analyse Stratégique</h3>
                            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:20px;">
                                <div style="background:rgba(0,0,0,0.2); padding:15px; border-radius:8px; border-left:3px solid ${critAdvice.color};">
                                    <div style="font-size:0.8rem; color:#aaa; text-transform:uppercase; margin-bottom:5px;">Conseil Critique</div>
                                    <div style="font-size:1rem; font-weight:500; color:#fff;">${critAdvice.msg}</div>
                                </div>
                                <div style="background:rgba(0,0,0,0.2); padding:15px; border-radius:8px;">
                                    <div style="font-size:0.8rem; color:#aaa; text-transform:uppercase; margin-bottom:10px; display:flex; justify-content:space-between;">
                                        <span>Répartition des Rolls</span>
                                        <span style="font-weight:bold; color:#ff4d4d;">${deadRolls.count} Morts</span>
                                    </div>
                                    <div style="display:flex; width:100%; height:12px; background:#333; border-radius:6px; overflow:hidden; margin-bottom:10px;">
                                        <div style="width:${(rollStats.useful/rollStats.total)*100}%; background:var(--accent-gold);"></div>
                                        <div style="width:${(rollStats.dead/rollStats.total)*100}%; background:#ff4d4d;"></div>
                                    </div>
                                    <div style="display:flex; flex-wrap:wrap; gap:5px;">
                                        ${deadRolls.details.map(d =>
            `<span style="background:rgba(255, 77, 77, 0.15); color:#ff9999; font-size:0.75rem; padding:2px 8px; border-radius:4px;">${d.label}: ${d.count}</span>`
        ).join('')}
                                        ${deadRolls.count === 0 ? '<span style="color:#22c55e; font-size:0.8rem;">Aucune stat morte !</span>' : ''}
                                    </div>
                                </div>
                                
                                ${offPieceAdvice ? `
                                <div style="background:rgba(0,0,0,0.2); padding:15px; border-radius:8px; border-left:3px solid ${offPieceAdvice.type === 'success' ? '#22c55e' : (offPieceAdvice.type === 'warning' ? '#eab308' : '#ef4444')}; grid-column: 1 / -1;">
                                    <div style="font-size:0.8rem; color:#aaa; text-transform:uppercase; margin-bottom:5px;">Analyse Pièce Hors-Set (Joker)</div>
                                    <div style="font-size:0.95rem; color:#fff;">${offPieceAdvice.msg}</div>
                                </div>` : ''}
                            </div>
                        </div>

                        <div>
                            <h3 style="color:#ccc; font-size:1rem; text-transform:uppercase; margin-bottom:15px; border-left:4px solid var(--accent-gold); padding-left:10px;">3. Plan d'Action</h3>
                            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:20px;">
                                
                                ${talentAdvices && talentAdvices.length > 0 ? `
                                <div style="background:rgba(0,0,0,0.2); padding:15px; border-radius:8px; border-left:3px solid ${talentAdvices[0].type === 'success' ? '#22c55e' : (talentAdvices.some(a => a.type === 'critical') ? '#ef4444' : '#3b82f6')}; grid-column: 1 / -1;">
                                    <div style="font-size:0.8rem; color:${talentAdvices[0].type === 'success' ? '#22c55e' : '#aaa'}; text-transform:uppercase; margin-bottom:10px; font-weight:bold;">
                                        <i class="fa-solid fa-book-open"></i> Priorité des Aptitudes
                                    </div>
                                    ${talentAdvices.map(adv => `
                                        <div style="margin-bottom:5px; font-size:0.9rem; color:#fff;">
                                            ${adv.type !== 'success' ? `<i class="fa-solid fa-circle-${adv.type === 'critical' ? 'exclamation' : 'info'}" style="color:${adv.type === 'critical' ? '#ef4444' : '#3b82f6'}"></i>` : '<i class="fa-solid fa-check" style="color:#22c55e"></i>'} 
                                            ${adv.msg}
                                        </div>
                                    `).join('')}
                                </div>` : ''}

                                ${(() => {
            const adv = getMainStatAdvice(p, config);
            const color = adv.type === 'success' ? '#22c55e' : '#ef4444';
            const icon = adv.type === 'success' ? 'check' : 'triangle-exclamation';
            return `
                                    <div style="background:rgba(0,0,0,0.2); padding:15px; border-radius:8px; border-left:3px solid ${color};">
                                        <div style="font-size:0.8rem; color:${color}; text-transform:uppercase; margin-bottom:10px; font-weight:bold;">
                                            <i class="fa-solid fa-${icon}"></i> ${adv.title}
                                        </div>
                                        ${adv.type === 'success'
                ? `<div style="font-size:0.95rem; color:#fff;">${adv.msg}</div>`
                : adv.details.map(d => `<div style="margin-bottom:5px; font-size:0.9rem; color:#fff;">Sur <b>${d.piece}</b>, visez <span style="color:var(--accent-gold); font-weight:bold;">${d.better}</span> (Actuel: ${d.current}).</div>`).join('')
            }
                                    </div>`;
        })()}

                                ${(() => {
            const adv = getSetForcingAdvice(p, config);

            const color = adv.type === 'success' ? '#22c55e' : '#eab308';
            const icon = adv.type === 'success' ? 'check' : 'triangle-exclamation';
            return `
                                    <div style="background:rgba(0,0,0,0.2); padding:15px; border-radius:8px; border-left:3px solid ${color};">
                                        <div style="font-size:0.8rem; color:${color}; text-transform:uppercase; margin-bottom:10px; font-weight:bold;">
                                            <i class="fa-solid fa-${icon}"></i> ${adv.title}
                                        </div>
                                        <div style="font-size:0.95rem; color:#fff;">${adv.msg}</div>
                                    </div>`;
        })()}
                               ${(() => {
            const adv = getMetaSetAdvice(p, config);
            if (!adv) return '';

            // GESTION DES 3 COULEURS ICI :
            let color, icon;

            if (adv.type === 'success') {
                color = '#22c55e'; // Vert
                icon = 'check';
            } else if (adv.type === 'warning') {
                color = '#ef4444'; // Orange (Alerte)
                icon = 'triangle-exclamation';
            } else {
                color = '#f97316'; // Bleu (Info/Good Set)
                icon = 'shirt';    // Icone T-shirt
            }

            return `
                                    <div style="background:rgba(0,0,0,0.2); padding:15px; border-radius:8px; border-left:3px solid ${color};">
                                        <div style="font-size:0.8rem; color:${color}; text-transform:uppercase; margin-bottom:10px; font-weight:bold;">
                                            <i class="fa-solid fa-${icon}"></i> ${adv.title}
                                        </div>
                                        <div style="font-size:0.95rem; color:#fff;">${adv.msg}</div>
                                    </div>`;
        })()}

                                ${(() => {
            const adv = getWeaponAdvice(p);
            const color = adv.type === 'success' ? '#22c55e' : '#eab308';
            const icon = adv.type === 'success' ? 'check' : 'arrow-up';
            return `
                                    <div style="background:rgba(0,0,0,0.2); padding:15px; border-radius:8px; border-left:3px solid ${color};">
                                        <div style="font-size:0.8rem; color:${color}; text-transform:uppercase; margin-bottom:10px; font-weight:bold;">
                                            <i class="fa-solid fa-${icon}"></i> ${adv.title}
                                        </div>
                                        <div style="font-size:0.95rem; color:#fff;">${adv.msg}</div>
                                    </div>`;
        })()}

                                ${(() => {
            const adv = getLevelAdvice(p);
            const color = adv.type === 'success' ? '#22c55e' : '#3b82f6'; // Vert ou Bleu
            const icon = adv.type === 'success' ? 'check' : 'arrow-up';
            return `
                                    <div style="background:rgba(0,0,0,0.2); padding:15px; border-radius:8px; border-left:3px solid ${color};">
                                        <div style="font-size:0.8rem; color:${color}; text-transform:uppercase; margin-bottom:10px; font-weight:bold;">
                                            <i class="fa-solid fa-${icon}"></i> ${adv.title}
                                        </div>
                                        <div style="font-size:0.95rem; color:#fff;">${adv.msg}</div>
                                    </div>`;
        })()}

                                <div style="background:rgba(0,0,0,0.2); padding:15px; border-radius:8px; grid-column: 1 / -1;">
                                    <div style="font-size:0.8rem; color:#aaa; text-transform:uppercase; margin-bottom:10px;">Top 3 Priorités (Artéfacts à changer)</div>
                                    ${priorities.length > 0 ? priorities.map((p, i) => {
            const difficulty = getFarmDifficulty(p.type, p.mainKey);
            return `
                                        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.9rem; margin-bottom:8px; padding-bottom:8px; border-bottom:1px dashed rgba(255,255,255,0.1);">
                                            <div style="display:flex; flex-direction:column;">
                                                <span style="color:#ddd;">${i+1}. ${p.piece}</span>
                                                <span style="font-size:0.7rem; color:${difficulty.color}; opacity:0.8;">${difficulty.label} à farmer</span>
                                            </div>
                                            <span style="color:${p.color}; font-weight:bold;">${p.score} (${p.grade})</span>
                                        </div>
                                    `}).join('') : '<div style="color:#22c55e; font-weight:bold;"><i class="fa-solid fa-check"></i> Rien à signaler, excellent travail.</div>'}
                                </div>

                            </div>
                        </div>

                        ${deadSims.length > 0 ? `
                        <div>
                            <h3 style="color:#ccc; font-size:1rem; text-transform:uppercase; margin-bottom:15px; border-left:4px solid var(--accent-gold); padding-left:10px;">4. Simulation : Potentiel Caché</h3>
                            <div style="background:rgba(59, 130, 246, 0.1); border:1px solid rgba(59, 130, 246, 0.3); padding:20px; border-radius:8px;">
                                <div style="font-size:0.9rem; color:#93c5fd; margin-bottom:15px;">Voici ce que vous gagneriez en remplaçant vos stats mortes par des stats utiles :</div>
                                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:15px;">
                                ${deadSims.map(sim => `
                                    <div style="background:rgba(0,0,0,0.3); padding:12px; border-radius:6px; border-left:3px solid #3b82f6;">
                                        <div style="font-size:0.9rem; color:#fff; font-weight:bold; margin-bottom:5px;">${sim.pieceName}</div>
                                        <div style="font-size:0.8rem; color:#ccc; line-height:1.4;">${sim.text}</div>
                                        <div style="font-size:1rem; color:var(--accent-gold); font-weight:bold; margin-top:5px;">${sim.gainHtml}</div>
                                    </div>
                                `).join('')}
                                </div>
                            </div>
                        </div>` : ''}

                        <div>
                            <h3 style="color:#ccc; font-size:1rem; text-transform:uppercase; margin-bottom:15px; border-left:4px solid var(--accent-gold); padding-left:10px;">5. Simulateur de Reroll (Expérimental)</h3>
                            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:15px;">
                                ${p.artefacts.map(art => {
            const metrics = calculateRerollMetrics(art, config);
            if(!metrics) return '';
            const pieceName = ARTIFACT_TYPE_MAPPING[art.type] || art.type;
            return `
                                    <div style="background:rgba(0,0,0,0.3); padding:12px; border-radius:8px; border:1px solid #444;">
                                        <div style="display:flex; align-items:center; gap:8px; margin-bottom:10px;">
                                            <img src="${art.icon}" style="width:30px; height:30px;">
                                            <div style="font-size:0.8rem; font-weight:bold; color:#fff; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${pieceName}</div>
                                        </div>
                                        
                                        <div style="margin-bottom:8px;">
                                            <div style="display:flex; justify-content:space-between; font-size:0.7rem; color:#aaa;">
                                                <span>Potentiel Gain</span>
                                                <span style="color:${metrics.potential > 60 ? '#22c55e' : '#ccc'}">${metrics.potential}%</span>
                                            </div>
                                            <div style="width:100%; height:4px; background:#333; border-radius:2px;">
                                                <div style="width:${metrics.potential}%; height:100%; background:linear-gradient(90deg, #3b82f6, #22c55e); border-radius:2px;"></div>
                                            </div>
                                        </div>

                                        <div style="margin-bottom:10px;">
                                            <div style="display:flex; justify-content:space-between; font-size:0.7rem; color:#aaa;">
                                                <span>Risque Perte</span>
                                                <span style="color:${metrics.risk > 60 ? '#ff4d4d' : '#ccc'}">${metrics.risk}%</span>
                                            </div>
                                            <div style="width:100%; height:4px; background:#333; border-radius:2px;">
                                                <div style="width:${metrics.risk}%; height:100%; background:linear-gradient(90deg, #f59e0b, #ff4d4d); border-radius:2px;"></div>
                                            </div>
                                        </div>

                                        <div style="text-align:center; background:${metrics.badge.color}20; color:${metrics.badge.color}; padding:4px; border-radius:4px; font-size:0.75rem; font-weight:bold; border:1px solid ${metrics.badge.color}40;">
                                            ${metrics.badge.text}
                                        </div>
                                    </div>
                                    `;
        }).join('')}
                            </div>
                        </div>

                    </div>
                </div>
                `;
    })()}
        </div>
    `; // Fin html

    container.innerHTML = html;
}

loadGameData().then(() => {
    document.getElementById('uidInput').value = "704449686";
    fetchUserData();
});