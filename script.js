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

    // Types d'armes
    "sword": "icon_sword.png",       // Épée à une main
    "claymore": "icon_claymore.png", // Épée à deux mains
    "pole": "icon_polearm.png",      // Arme d'hast
    "bow": "icon_bow.png",           // Arc
    "catalyst": "icon_catalyst.png", // Catalyseur

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
    "Aventurier": "Adventurer",
    "Chanceux": "LuckyDog",
    "Médecin itinérant": "TravelingDoctor",

    "Sacrifieur Pyro": "PrayersForIllumination",
    "Sacrifieur Hydro": "PrayersForDestiny",
    "Sacrifieur Électro": "PrayersForWisdom",
    "Sacrifieur Cryo": "PrayersToSpringtime",

    "Cœur du Voyageur": "ResolutionOfSojourner",
    "Cœur du Brave": "BraveHeart",
    "Cœur du Gardien": "DefendersWill",
    "Miracle": "TinyMiracle",
    "Berserker": "Berserker",
    "Artiste martial": "MartialArtist",
    "Instructeur": "Instructor",
    "Parieur": "Gambler",
    "Exilé": "TheExile",
    "Érudit": "Scholar",

    "Briseur de glace": "BlizzardStrayer",
    "Dompteur de foudre": "Thundersoother",
    "Marcheur du feu": "Lavawalker",
    "Amour chéri": "MaidenBeloved",
    "Rideau du Gladiateur": "GladiatorsFinale",
    "Ombre de la Verte Chasseuse": "ViridescentVenerer",
    "Bande vagabonde": "WanderersTroupe",
    "Colère de tonnerre": "ThunderingFury",
    "Sorcière des flammes ardentes": "CrimsonWitchOfFlames",
    "Ancien rituel royal": "NoblesseOblige",
    "Chevalerie ensanglantée": "BloodstainedChivalry",
    "Roche ancienne": "ArchaicPetra",
    "Météore inversé": "RetracingBolide",
    "Âme des profondeurs": "HeartOfDepth",
    "Ténacité du Millelithe": "TenacityOfTheMillelith",
    "Flamme blême": "PaleFlame",
    "Réminiscence nostalgique": "ShimenawasReminiscence",
    "Emblème du destin brisé": "EmblemOfSeveredFate",
    "Coquille des rêves opulents": "HuskOfOpulentDreams",
    "Palourde aux teintes océaniques": "OceanHuedClam",
    "Au-delà cinabrin": "VermillionHereafter",
    "Échos d'une offrande": "EchoesOfAnOffering",
    "Souvenir de forêt": "DeepwoodMemories",
    "Rêve doré": "GildedDreams",
    "Chronique du Pavillon du désert": "DesertPavilionChronicle",
    "Fleur du paradis perdu": "FlowerOfParadiseLost",
    "Rêve de la nymphe": "NymphsDream",
    "Lueur du vourukasha": "VourukashasGlow",
    "Chasseur de la Maréchaussée": "MarechausseeHunter",
    "Troupe dorée": "GoldenTroupe",
    "Chanson des jours d'antan": "SongOfDaysPast",
    "Murmure nocturne en forêt d'échos": "NighttimeWhispersInTheEchoingWoods",
    "Fragment d'harmonie divergente": "FragmentOfHarmonicWhimsy",
    "Rêverie incomplète": "UnfinishedReverie",
    "Codex d'obsidienne": "ObsidianCodex",
    "Parchemin du héros de la Cité de braise": "ScrollOfTheHeroOfCinderCity",
    "Serment de la longue nuit": "LongNightsOath",
    "Finale des galeries profondes": "FinaleOfTheDeepGalleries",
    "Nuit de la révélation céleste": "NightOfTheSkysUnveiling",
    "Sérénade de la lune soyeuse": "SilkenMoonsSerenade"
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

    // 1. On ajoute le timestamp (?t=...) pour forcer le navigateur/proxy à recharger
    const urlCible = `https://enka.network/api/uid/${uid}?t=${Date.now()}`;

    // 2. On encode le tout pour le proxy
    const proxy = `https://corsproxy.io/?${encodeURIComponent(urlCible)}`;

    try {
        const res = await fetch(proxy);
        if(!res.ok) throw new Error("Erreur Enka");

        const data = await res.json();
        processData(data);

        if(loader) loader.innerText = ""; // On efface le message si c'est bon
    } catch (e) {
        console.error(e);
        if(loader) loader.innerText = "Erreur UID/Vitrine.";
        alert("Impossible de récupérer les données. Vérifiez l'UID et assurez-vous que la vitrine est visible dans le jeu.");
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

    // 1. SAUVEGARDE : On chope la position actuelle du scroll
    let currentScroll = 0;
    const scrollContainer = document.querySelector('.card-buff-list-container');
    if (scrollContainer) {
        currentScroll = scrollContainer.scrollTop;
    }

    // 2. LOGIQUE : On change l'état et on recalcule
    p.buffs[buffIndex].active = !p.buffs[buffIndex].active;
    p.buffedStats = calculateBuffedStats(p.baseStats, p.combatStats, p.buffs);

    // 3. RENDU : On redessine tout (ce qui reset le scroll à 0 par défaut)
    renderShowcase(charIndex);

    // 4. RESTAURATION : On remet le scroll où il était
    // On utilise setTimeout pour attendre que le DOM soit bien mis à jour
    setTimeout(() => {
        const newContainer = document.querySelector('.card-buff-list-container');
        if (newContainer) {
            newContainer.scrollTop = currentScroll;
        }
    }, 0);
}

// --- FONCTIONS COACHING ---

function generateScoreBar(totalRolls, currentGrade) {
    const maxScale = 45;
    const percent = Math.min((totalRolls / maxScale) * 100, 100);
    const markers = [
        { val: 0, label: "F" },
        { val: 2.5, label: "F+" },
        { val: 5, label: "D" },
        { val: 7.5, label: "D+" },
        { val: 10, label: "C" },
        { val: 12.5, label: "C+" },
        { val: 15, label: "B" },
        { val: 17.5, label: "B+" },
        { val: 20, label: "A" },
        { val: 22.5, label: "A+" },
        { val: 25, label: "S" },
        { val: 27.5, label: "S+" },
        { val: 30, label: "SS" },
        { val: 32.5, label: "SS+" },
        { val: 35, label: "SSS" },
        { val: 37.5, label: "SSS+" },
        { val: 40, label: "WTF" },
        { val: 42.5, label: "WTF+" },
        { val: 45, label: "ARCHON" }
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

function getCritAdvice(cr, cd, config) {
    // 1. Vérification de l'importance du Crit
    // On regarde si le poids du Taux Crit est défini et s'il est significatif (>= 1)
    const crWeight = (config && config.weights && config.weights['critRate_']) || 0;

    if (crWeight < 1) {
        return {
            color: '#888',
            msg: "Ce personnage ne dépend pas des statistiques critiques."
        };
    }

    // 2. Logique habituelle pour les persos Crit
    if (cr > 100) return { color: '#ff4d4d', msg: `Taux CRIT excédentaire (${cr.toFixed(1)}%). Dépasser 100% est inutile.` };
    if (cr >= 95) return { color: '#3b82f6', msg: "Taux CRIT excellent (plus de 95%). Orientez-vous sur l'obtention d'un maximum de DGT CRIT." };
    if (cr >= 90) return { color: '#22c55e', msg: "Taux CRIT largement suffisant (plus de 90%). Orientez-vous sur l'obtention d'un maximum de DGT CRIT." };
    if (cr >= 80) return { color: '#22c55e', msg: "Taux CRIT suffisant (plus de 80%). En obtenir plus est utile, mais vous pouvez vous orienter sur l'obtention de DGT CRIT." };
    if (cr >= 70) return { color: '#eab308', msg: "Taux CRIT passable (plus de 70%). Vous devriez essayer d'en obtenir plus." };
    if (cr >= 60) return { color: '#ffb13b', msg: "Taux CRIT insuffisant (plus de 60%). Il est conseillé d'en obtenir plus." };
    if (cr <= 50) return { color: '#ff4d4d', msg: "Taux CRIT largement insuffisant (50% ou moins). Obtenez en plus avant d'aller chercher du DGT CRIT." };
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
            msg: "Votre sablier, votre coupe et votre diadème ont tous les trois une statistique principale optimale."
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
    if (!rates || !rates[mainStatKey]) return { label: "Relativement difficile", color: "#eab308" }; // Default

    const probability = rates[mainStatKey];

    if (probability >= 19) return { label: "Relativement facile", color: "#22c55e" }; // Vert (>20%)
    if (probability >= 10) return { label: "Relativement difficile", color: "#eab308" }; // Jaune (10-20%)
    if (probability >= 5) return { label: "Difficile", color: "#f97316" }; // Orange (5-10%)
    return { label: "Très difficile", color: "#ef4444" }; // Rouge (<5%)
}

// ANALYSE OFF-PIECE (Avec nom de la pièce)
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

    // 1. Récupération du nom de la pièce (ex: "Sables du temps" ou "Coupe d'éonothème")
    // On nettoie un peu le nom pour qu'il soit plus court si besoin, ou on garde le mapping standard
    const rawName = ARTIFACT_TYPE_MAPPING[offPiece.type] || "Pièce";
    // Petite astuce : Pour "Sables du temps", on peut garder le nom complet, c'est joli.

    const avgSetScore = setPiecesScores.reduce((a, b) => a + b, 0) / setPiecesScores.length;
    const isHardMainStat = offPiece.mainStat.key.includes("dmg_") || offPiece.mainStat.key.includes("crit");

    if (offPiece.score > avgSetScore) {
        return {
            type: "success",
            msg: `Excellente pièce hors-set <b style="color: #aaa;">(${rawName})</b>. Cette dernière porte votre build vers le haut.`
        };
    }
    else if (isHardMainStat && offPiece.score > (avgSetScore * 0.8)) {
        return {
            type: "warning",
            msg: `Votre pièce hors-set <b style="color: #aaa;">(${rawName})</b> suffit pour l'instant en vue de la rareté de sa stat principale.`
        };
    }
    else {
        return {
            type: "error",
            msg: `Votre pièce hors-set <b style="color: #aaa;">(${rawName})</b> est moins bonne que le reste. Vous devriez en chercher une autre dans votre inventaire ou permettre à une autre pièce d'être hors-set.`
        };
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
            advices.push({ type: "critical", msg: `Améliorer votre <b style="color: #aaa;">${label}</b> au niv ${goal} est important pour ce personnage.` });
        } else if (diff >= 1) {
            isPerfect = false;
            advices.push({ type: "info", msg: `Améliorer votre <b style="color: #aaa;">${label}</b> au niveau ${goal} est recommandé pour ce personnage.` });
        }
    };

    check('auto', 'Attaque Normale');
    check('skill', 'Compétence');
    check('burst', 'Déchaînement');

    if (isPerfect && advices.length === 0) {
        return [{ type: "success", msg: "Vos aptitudes sont au niveau recommandé." }];
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
                title: "Pas de forçage de set d'artéfacts",
                msg: "Set d'artéfacts 2 pièces / 2 pièces optimal et de bonne qualité."
            };
        }
        return {
            type: "success",
            title: "Pas de forçage de set d'artéfacts",
            msg: "Vous utilisez un build arc-en-ciel."
        };
    }

    // Cas 2 : Set 4p actif -> On vérifie la qualité
    const setPieces = persoObj.artefacts.filter(a => a.setKey === active4pSet);
    const totalScore = setPieces.reduce((sum, art) => sum + art.score, 0);
    const avgScore = totalScore / setPieces.length;

    if (avgScore < 20) {
        let warningMsg = `Vous forcez un set d'artéfacts de 4 pièces avec des artéfacts faibles. Vous devriez essayer une alternative.`;

        if (charLikes2p2p) {
            warningMsg += `Ce personnage fonctionne très bien en set d'artéfacts 2 pièces / 2 pièces, n'hésitez pas à casser votre set d'artéfacts actuel pour de meilleures stats.`;
        } else {
            warningMsg += `Vous forcez un set d'artéfacts de 4 pièces avec des artéfacts faibles. Vous devriez essayer une alternative.`;
        }

        return {
            type: "warning",
            title: "Forçage de set d'artéfacts",
            msg: warningMsg
        };
    } else {
        return {
            type: "success",
            title: "Pas de forçage de set d'artéfacts",
            msg: `Set d'artéfacts optimal et de bonne qualité.`
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
            title: "Choix du set d'artéfacts",
            msg: "Vous utilisez l'un des meilleurs sets d'artéfacts recommandés pour ce personnage."
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
            title: "Optimisation du set d'artéfacts",
            msg: `Votre set actuel est correct, mais pour maximiser le build, le set d'artéfacts recommandé est : ${recommendationStr}.`
        };
    }

    // 3. CAS : MAUVAIS SET (Ni Best, Ni Good)
    return {
        type: "warning", // Jaune/Orange
        title: "Problème de set d'artéfacts",
        msg: `Votre set d'artéfacts actuel ne correspond pas aux standards du personnage. Vous devriez opter pour le set d'artéfacts ${recommendationStr}.`
    };
}
function getWeaponAdvice(persoObj) {
    if (!persoObj.weapon) return null;

    if (persoObj.weapon.level < 90) {
        return {
            type: "warning", // Orange/Rouge
            title: "Niveau de l'arme",
            msg: `Améliorez votre arme au niveau 90 pour maximiser son ATQ de base et sa statistique additionnelle.`
        };
    } else {
        return {
            type: "success", // Vert
            title: "Niveau de l'arme",
            msg: `Votre arme est au niveau maximum.`
        };
    }
}

// NOUVEAU : Conseil Niveau 90
function getLevelAdvice(persoObj) {
    if (persoObj.level < 90) {
        return {
            type: "info", // Bleu/Info
            title: "Niveau du Personnage",
            msg: `Améliorez votre personnage au niveau 90 pour maximiser ses statistiques.`
        };
    } else {
        return {
            type: "success", // Vert
            title: "Niveau du Personnage",
            msg: `Votre personnage est au niveau maximum.`
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

    // 1. On identifie les Sets Actifs (ceux qui ont au moins 2 pièces équipées)
    const activeSets = Object.keys(persoObj.setsCounter || {}).filter(key => persoObj.setsCounter[key] >= 2);

    const sorted = [...persoObj.artefacts].sort((a, b) => a.score - b.score);

    return sorted.slice(0, 3).map(art => {
        const typeName = ARTIFACT_TYPE_MAPPING[art.type] || art.type;

        // 2. Si le set de l'artéfact n'est pas dans les sets actifs, c'est un Off-Set
        const isOffPiece = !activeSets.includes(art.setKey);

        return {
            piece: typeName,
            score: art.score,
            grade: art.grade.letter,
            color: art.grade.color,
            type: art.type,
            mainKey: art.mainStat.key,
            setName: art.setName,
            mainLabel: art.mainStat.label,
            isOffPiece: isOffPiece // <--- On ajoute l'info ici
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
                usedTargets.add(targetKey);

                const range = SUBSTAT_RANGES[targetKey];
                const minVal = (range.min * dead.rolls).toFixed(1);
                const maxVal = (range.max * dead.rolls).toFixed(1);
                const suffix = (targetKey.endsWith('_') || targetKey === "enerRech_" || targetKey === "critRate_" || targetKey === "critDMG_") ? "%" : "";
                const targetLabel = STAT_LABELS[targetKey] || targetKey;

                replacements.push({
                    dead: `${dead.label} (${dead.rolls})`,
                    target: `${targetLabel} (${dead.rolls})`,
                    gain: `+${minVal} <span style="color:#fff; opacity:0.8; padding:0 2px;">à</span> ${maxVal}${suffix} ${targetLabel}`
                });
            }
        });

        if (replacements.length > 0) {
            const pieceName = ARTIFACT_TYPE_MAPPING[art.type] || art.type;
            const deadText = replacements.map(r => `<span style="color:#ff6b6b">${r.dead}</span>`).join(' et ');
            const targetText = replacements.map(r => `<span style="color:var(--accent-gold)">${r.target}</span>`).join(' et ');
            const gainText = replacements.map(r => `
                <div style="display: flex; flex-direction: row; align-items: center; color: var(--accent-gold); ">
                    <p style=" color: #ffffff; margin-right: 6px;">•</p>
                    <p>${r.gain}</p>
                </div>
            `).join('');

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
        badge = { text: "Pile ou face", color: "#f97316" }; // Orange
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
        let nom = getText(info.NameTextMapHash);

        if (!nom || nom === "Inconnu") {
            // Si pas de traduction, on prend le nom du fichier image (ex: "UI_AvatarIcon_Side_Hutao")
            if (info.SideIconName) {
                // On garde juste la partie après le dernier "_" (ex: "Hutao")
                nom = info.SideIconName.split('_').pop();

                // Petit fix pour le Voyageur qui s'appelle souvent "PlayerBoy"/"PlayerGirl"
                if (nom.includes("Player")) nom = "Voyageur";
            } else {
                nom = "Inconnu";
            }
        }
        const rarity = info.QualityType === "QUALITY_ORANGE" ? 5 : 4;
        const level = perso.propMap['4001'] ? parseInt(perso.propMap['4001'].val) : 0;
        const constellations = perso.talentIdList ? perso.talentIdList.length : 0;

        const elemInfo = ELEMENT_DATA[info.Element] || { id: 30, key: "physical_dmg_" };

        // --- AJOUTER CE BLOC ---
        const WEAPON_TYPE_MAP = {
            "WEAPON_SWORD_ONE_HAND": "sword",
            "WEAPON_CLAYMORE": "claymore",
            "WEAPON_POLE": "pole",
            "WEAPON_BOW": "bow",
            "WEAPON_CATALYST": "catalyst"
        };
        // On récupère le type d'arme (ex: "bow") depuis les données fixes du perso
        const charWeaponKey = WEAPON_TYPE_MAP[info.WeaponType] || "unknown";

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
            weapon, artefacts, setsCounter, buffs, evaluation: null, weights: null,
            charWeapon: charWeaponKey
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
            <img alt="" src="${p.image}" class="char-card-avatar">
            <div class="char-card-container">
                <p class="char-card-name">${p.nom}</p>
                <div class="char-card-info">
                    <p style="color:${p.evaluation.grade.color};">${p.evaluation.score} </p>
                    <p style="color:${p.evaluation.grade.color};">(${p.evaluation.grade.letter})</p>
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
    const portraitX = (config.portraitOffset !== undefined) ? config.portraitOffset : -35;

    const s = p.combatStats;
    const b = p.buffedStats;
    const ev = p.evaluation;

    const charColor = config.color || "#4b5563";
    container.style.setProperty('--char-hex', charColor);


    // Template des aptitudes
    let talentsHtml = `<div style="display:flex; justify-content:space-between; margin-left: 3px; margin-right: 3px;">`;
    p.talents.forEach(t => {
        talentsHtml += `
            <div style="width:64px; height:64px; background-color: rgba(0, 0, 0, 0.2); border-radius:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; position:relative; border:1px solid rgba(255, 255, 255, 0.4); margin-bottom: 11px;">
                <img src="${t.icon}" style="width:60px; height:60px;" alt="Aptitude">
                <div style="position:absolute; bottom:-10px; background-color: rgb(from var(--char-hex) calc(r / 3.5) calc(g / 3.5) calc(b / 3.5)); padding:2px 6px; border-radius:100%; font-size:10px;">${t.level}</div>
            </div>`;
    });
    talentsHtml += `</div>`;


    // Template de ligne de stat
    const statLine = (svg, label, val, isHighlight=false) => `
        <div class="stat-row" style="filter: none; justify-content: space-between; align-items: center; display: flex; box-sizing: border-box;">
            ${svg}
            <p>${label}</p>
            <div class="dotted-line"></div> 
            <p class="stat-val" style="${isHighlight ? 'color:var(--accent-gold)' : ''}">${val}</p>
        </div>`;

    const dmgStat = formatStat(b.dmgBonusKey, b.dmgBonus / 100);





    // 1. PARTIE HAUTE (STATS + EQUIPMENT)
    let html = `<div class="top-row">`;

    // 1.1 Image de background
    html += `
        <div class="background-splash-art" style="background-image: url('${p.splashArt}'); background-position: center center;background-repeat: no-repeat;background-size: 300%; position: absolute;inset: 0px;z-index: 0;filter: blur(10px) brightness(0.7) saturate(0.8);"></div>
    `;

    // 1.2 Section gauche (splash art + arme)
    // 1.2.1 Splash art
    html += `
        <div class="character-portrait-weapon" style="gap: 8px; align-items: stretch; flex-direction: column; display: flex; box-sizing: border-box;">
            <div class="character-portrait-container" style="width: 350px; height: 720px; position: relative; overflow: hidden; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: rgb(0, 0, 0) 1px 1px 6px; box-sizing: border-box;">
                <img class="character-portrait" src="${p.splashArt}" alt="${p.nom}" style="filter: none; position: absolute; transform: translateX(${portraitX}%); height: 720px; transition: filter 0.35s cubic-bezier(0.41, 0.65, 0.39, 0.99); box-sizing: border-box;">
            </div>
    `;

    // 1.2.2 Arme
    html += `
        <div class="weapon-container">
    `;

    if (p.weapon) {
        html += `
            <div class="card weapon-card" style="width: 350px; height: 128px; position: relative; overflow: hidden; z-index: 20; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: rgb(0, 0, 0) 1px 1px 6px; box-sizing: border-box; transition: box-shadow .25s, border-color .25s !important; display: flex; padding: 10px;">
                <img src="${p.weapon.icon}" class="item-img" style="width: auto; height:100%; border-radius: 8px; border:2px solid ${p.weapon.stars === 5 ? '#eab308' : '#9C74B6'}" alt="${p.weapon.name}">
                <div style="flex:1; display: flex; flex-direction: column; overflow: hidden;">
                    <div style="font-size:16px; color: #FFFFFF; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${p.weapon.name}</div>
                    <div style="color: #FFFFFF; font-size:14px; margin-bottom:5px;">Niv. ${p.weapon.level} • R${p.weapon.rank}</div>
                    <div style="display:flex; gap:12px; margin-top:5px; background:rgba(0,0,0,0.2); padding:5px; border-radius:8px; overflow: hidden;">
                        ${p.weapon.baseAtk ? `
                        <div style="overflow: hidden; padding-left: 2px;">
                            <p style="font-size:12px; color: rgba(255, 255, 255, 0.4); text-align: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">ATQ de base</p>
                            <p style="font-size:16px; text-align: left; margin-top: 2px;">${p.weapon.baseAtk.value}</p>
                        </div>` : ''}
                        ${p.weapon.subStat ? `
                        <div style="border-left:1px solid rgba(255, 255, 255, 0.4); padding-left:12px; overflow: hidden;">
                            <p style="font-size:12px; color: rgba(255, 255, 255, 0.4); text-align: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${p.weapon.subStat.label}</p>
                            <p style="font-size:16px; text-align: left; margin-top: 2px;">${formatValueDisplay(p.weapon.subStat.key, p.weapon.subStat.value)}</p>
                        </div>` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    html += `</div></div>`;

    // 1.3 Section milieu (stats + note + aptitudes + stats en combat)
    html += `
        <div class="showcase-area" style="gap: 8px; justify-content: space-between; align-items: stretch; flex-direction: column; display: flex; box-sizing: border-box;">
            <div class="showcase-area-container" style="width: 299px; height: 100%; border-radius: 8px; z-index: 10; flex: 1 1 0%; justify-content: space-between; align-items: stretch; flex-direction: column; display: flex; box-sizing: border-box;">
                
                <!-- 1.3.1 Informations personnage + statistiques de base -->
                <div class="showcase-area-base-stats" style="border-radius: 8px; transition: background-color 0.35s, box-shadow 0.25s, border-color 0.25s; box-shadow: rgb(0, 0, 0) 1px 1px 6px, rgba(255, 255, 255, 0.3) 0px 0px 2px inset; border: 1px solid rgba(255, 255, 255, 0.4); box-sizing: border-box;">
                    <div style="align-items: stretch; flex-direction: column; display: flex; box-sizing: border-box; margin-bottom: 6px;">
                        <div style="height: 40px; margin-top: 8px; margin-bottom: 5px; display: flex; flex-direction: row; justify-content: space-between; margin-left: 10px; margin-right: 10px;">
                            <div class="showcase-element-weapon" style="display: flex; flex-direction: row;">
                                <img src="${ICON_BASE_PATH}${ICON_MAP[s.dmgBonusKey]}" style="width: 25px; height: 25px; margin-top: 2px;" alt="Element">
                                <img src="${ICON_BASE_PATH}${ICON_MAP[p.charWeapon]}" style="width: 29px; height: 29px;" alt="Type Arme">
                            </div>
                            <div class="showcase-level-const" style="display: flex; flex-direction: column; text-align: right;">
                                <p style="font-size: 14px;">Niv. ${p.level}</p>
                                <p style="font-size: 14px;">C${p.cons}</p>
                            </div>
                        </div>
                        <div style="margin-left: 10px; margin-right: 10px;">
                            <h2 style="font-size: 24px;">${p.nom}</h2>
                        </div>
                    </div>
                    <div>
                        <p style="margin-left: 10px; margin-right: 10px; margin-bottom: 9px; font-size: 14px;">Statistiques de base</p>
                        <div class="showcase-base-stats-container" style="display: flex; flex-direction: column; gap: 9px; margin-left: 7px; margin-right: 10px; margin-bottom: 9px;">
                            ${statLine(createIcon('hp'), "PV max", Math.round(s.hp))}
                            ${statLine(createIcon('atk'), "ATQ", Math.round(s.atk))}
                            ${statLine(createIcon('def'), "DÉF", Math.round(s.def))}
                            ${statLine(createIcon('eleMas'), "Maîtrise élémentaire", Math.round(s.em))}
                            ${statLine(createIcon('critRate_'), "Taux CRIT", s.cr.toFixed(1) + '%')}
                            ${statLine(createIcon('critDMG_'), "DGT CRIT", s.cd.toFixed(1) + '%')}
                            ${statLine(createIcon('enerRech_'), "Recharge d'énergie", s.er.toFixed(1) + '%')}
                            ${statLine(createIcon('heal_'), "Bonus de soins", (s.hb || 0).toFixed(1) + '%')}
                            ${statLine(formatStat(s.dmgBonusKey, s.dmgBonus / 100).icon, formatStat(s.dmgBonusKey, s.dmgBonus / 100).label, s.dmgBonus.toFixed(1) + '%')}
                        </div>
                    </div>
                </div>
                
                <!-- 1.3.2 Score et note personnage -->
                <div class="showcase-area-score" style="display: flex; flex-direction: column; gap: 6px; border-radius: 8px; transition: background-color 0.35s, box-shadow 0.25s, border-color 0.25s; padding: 10px 10px 8px 7px;box-shadow: rgb(0, 0, 0) 1px 1px 6px, rgba(255, 255, 255, 0.3) 0px 0px 2px inset; border: 2px solid ${ev.grade.color}; box-sizing: border-box;">
                    <div class="stat-row" style="filter: none; justify-content: space-between; align-items: center; display: flex; box-sizing: border-box;">
                        <img src="assets/simulator/icons/icon_score_white.png" alt="Score" style="width: 19px; height: 19px; margin-bottom: 2px; margin-right: 5px;">
                        <p>Score</p>
                        <div class="dotted-line-invisible"></div> 
                        <div style="display: flex; flex-direction: row; gap: 4px;">
                            <p style="color: ${ev.grade.color};">${ev.score}</p>
                            <p>(${ev.grade.letter})</p>
                        </div>
                    </div>
                    <div class="stat-row" style="filter: none; justify-content: space-between; align-items: center; display: flex; box-sizing: border-box;">
                        <p style="margin-left: 24px;">Rolls totaux</p>
                        <div class="dotted-line-invisible"></div> 
                        <p>${ev.totalRolls}</p>
                    </div>
                </div>
                
                <!-- 1.3.3 Aptitudes -->
                <div class="showcase-area-skills" style="border-radius: 8px; transition: background-color 0.35s, box-shadow 0.25s, border-color 0.25s; padding: 10px; box-shadow: rgb(0, 0, 0) 1px 1px 6px, rgba(255, 255, 255, 0.3) 0px 0px 2px inset; border: 1px solid rgba(255, 255, 255, 0.4); box-sizing: border-box;">
                    <p style="margin-bottom: 9px; font-size: 14px;">Aptitudes</p>
                    ${talentsHtml}
                </div>
                
                <!-- 1.3.4 Statistiques de combat -->
                <div class="showcase-area-combat-stats" style="border-radius: 8px; transition: background-color 0.35s, box-shadow 0.25s, border-color 0.25s; padding-left: 2px; padding-right: 2px; padding-bottom: 3px; box-shadow: rgb(0, 0, 0) 1px 1px 6px, rgba(255, 255, 255, 0.3) 0px 0px 2px inset; border: 1px solid rgba(255, 255, 255, 0.4); box-sizing: border-box;">
                    <p style="margin-left: 10px; margin-right: 10px; margin-bottom: 9px; margin-top: 10px; font-size: 14px;">Statistiques de combat</p>
                    <div style="display: flex; flex-direction: column; gap: 9px; margin-left: 7px; margin-right: 10px; margin-bottom: 4px;">
                        ${(() => {
                            let html = "";
                            const dynamicDefs = [
                                { wKey: 'hp',  sKey: 'hp',  icon: 'hp',  label: 'PV max', isPct: false },
                                { wKey: 'atk', sKey: 'atk', icon: 'atk', label: 'ATQ',    isPct: false },
                                { wKey: 'def', sKey: 'def', icon: 'def', label: 'DÉF',    isPct: false }
                            ];
                            
                            dynamicDefs.forEach(def => {
                                if (p.weights && p.weights[def.wKey] > 0) {
                                    const val = b[def.sKey];
                                    const oldVal = s[def.sKey];
                                    const displayVal = def.isPct ? val.toFixed(1) + '%' : Math.round(val);
                                    const isBuffed = val > oldVal;
                                    html += statLine(createIcon(def.icon), def.label, displayVal, isBuffed);
                                }
                            });
                    
                            const fixedDefs = [
                                { sKey: 'em',  icon: 'eleMas',    label: 'Maîtrise élémentaire', isPct: false },
                                { sKey: 'cr',  icon: 'critRate_', label: 'Taux CRIT',   isPct: true },
                                { sKey: 'cd',  icon: 'critDMG_',  label: 'DGT CRIT',    isPct: true },
                                { sKey: 'er',  icon: 'enerRech_', label: "Recharge d'énergie", isPct: true }
                            ];
                    
                            fixedDefs.forEach(def => {
                                const val = b[def.sKey];
                                const oldVal = s[def.sKey];
                                const displayVal = def.isPct ? val.toFixed(1) + '%' : Math.round(val);
                                const isBuffed = val > oldVal;
                                html += statLine(createIcon(def.icon), def.label, displayVal, isBuffed);
                            });
                    
                            const healVal = s.hb || 0;
                            html += statLine(createIcon('heal_'), "Bonus de soins", healVal.toFixed(1)+'%', false);
                    
                            const dmgStat = formatStat(b.dmgBonusKey, b.dmgBonus / 100);
                            const isDmgBuffed = b.dmgBonus > s.dmgBonus;
                            html += statLine(dmgStat.icon, dmgStat.label, b.dmgBonus.toFixed(1)+'%', isDmgBuffed);
                    
                            return html;
                        })()}
                    </div>
                </div>
            </div>
        </div>
    `;

    // 1.4 Section droite (artéfacts + configuration)
    html += `<div class="equipment-area">`;
    p.artefacts.forEach(art => {
        let subsHtml = "";
        art.subStats.forEach(sub => {
            let w = p.weights[sub.key];
            if (w === undefined && sub.key.includes("dmg_")) w = p.weights["elemental_dmg_"] || 0;
            if (w === undefined) w = 0;
            const isDead = w === 0;
            const rolls = getRollCount(sub.key, sub.value);
            subsHtml += `
                <div style="color: #FFFFFF; display: flex; justify-content: space-between; align-items: center;" class="substat-row ${isDead ? 'dead' : ''}">
                    <div style="display:flex; flex-direction: row; align-items:center; gap:5px;">
                        <img src="${ICON_BASE_PATH}${ICON_MAP[sub.key] || ICON_MAP['unknown']}" style="width: 17px; height: 17px;" alt="${sub.key}">
                        <p style="font-size: 12px;">${sub.label}</p>
                        
                        ${rolls > 0 ? `
                            <div style="display: flex; gap: 3px; align-items: center;">
                                ${Array(rolls).fill('').map(() => `
                                    <div style="
                                        width: 2px; 
                                        height: 2px; 
                                        border-radius: 100%; 
                                        background-color: rgba(255, 255, 255, 0.6); 
                                    "></div>
                                `).join('')}
                            </div>
                        ` : ''}
                        </div>
                    <p style="font-size: 12px;">${formatValueDisplay(sub.key, sub.value)}</p>
                </div>
            `;
        });

        const pieceName = ARTIFACT_TYPE_MAPPING[art.type] || art.type;
        html += `
            <div class="card" style="width: 240px; min-width: 240px; height: 280px; border: 1px solid rgba(255, 255, 255, 0.4); transition: background-color 0.35s, box-shadow 0.25s, border-color 0.25s; border-radius: 8px; box-shadow: rgb(0, 0, 0) 1px 1px 6px, rgba(255, 255, 255, 0.3) 0px 0px 2px inset;">
                <div class="card-container" style="padding-top: 12px; padding-left: 12px; padding-right: 12px; padding-bottom: 12px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; align-items: stretch;">
                    
                    <div class="item-header" style="height: 50px; display: flex; flex-direction: row; align-items: center; gap: 12px;">
                        <div style="position:relative; display:inline-block;">
                            <img src="${art.icon}" class="item-img" style="border: 2px solid ${art.stars === 5 ? '#FFB13B' : '#a855f7'};">
                            <p style="position:absolute; bottom:7px; right:1px; background:rgba(0, 0, 0, 0.4); color:rgba(255, 255, 255, 0.8); font-size:11px;padding: 1px 5px 1px 4px; border-radius:8px;">+${art.level}</p>
                        </div>
                        <div style="overflow:hidden; display:flex; flex-direction:column; justify-content:center;">
                            <p style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-size:14px;">${pieceName}</p>
                            <p style="font-size:12px; color:var(--accent-gold); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${art.setName}</p>
                            <div style="font-size:11px; color: rgba(255, 255, 255, 0.4); display: flex; flex-direction: row; align-items: center; gap: 4px;">
                                <p>${art.stars}★</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card-divider" style="margin: 12px 0px; display: flex; clear: both; width: 100%; min-width: 100%; box-sizing: border-box; color: rgba(255, 255, 255, 0.25); border-width: 1px 0 0; border-color: rgba(255, 255, 255, 0.25); border-block-start: 1px solid rgba(255, 255, 255, 0.25);"></div>
                    
                    <div class="main-stat-display" style="display: flex; flex-direction: row; align-items: center;">
                        <div style="display:flex; align-items:center; gap:5px; font-size:0.7rem; color:#aaa; font-weight:normal; align-self:center;">
                            <img src="${ICON_BASE_PATH}${ICON_MAP[art.mainStat.key] || ICON_MAP['unknown']}" style="width: 17px; height: 17px; margin-bottom: 1px;" alt="${art.mainStat.key}">
                            <p style="font-size: 12px; color: #FFFFFF;">${art.mainStat.label}</p>
                        </div>
                        <p style="font-size: 12px; color: #FFFFFF;">${formatValueDisplay(art.mainStat.key, art.mainStat.value)}</p>
                    </div>
                    
                    <div class="card-divider" style="margin: 14px 0px; display: flex; clear: both; width: 100%; min-width: 100%; box-sizing: border-box; color: rgba(255, 255, 255, 0.25); border-width: 1px 0 0; border-color: rgba(255, 255, 255, 0.25); border-block-start: 1px solid rgba(255, 255, 255, 0.25);"></div>
                    
                    <div style="display: flex; flex-direction: column; gap: 5px;">${subsHtml}</div>
                    
                    <div class="card-divider" style="margin: 14px 0px; display: flex; clear: both; width: 100%; min-width: 100%; box-sizing: border-box; color: rgba(255, 255, 255, 0.25); border-width: 1px 0 0; border-color: rgba(255, 255, 255, 0.25); border-block-start: 1px solid rgba(255, 255, 255, 0.25);"></div>
                    
                    <div style="font-size: 12px; align-items: center;" class="art-score-footer">
                        <div style="display:flex; align-items:center; gap: 5px;">
                            <img src="/assets/simulator/icons/icon_score_white.png" style="width: 19px; height: 19px; margin-bottom: 2px;" alt="Score">
                            <p>Score</p>
                        </div>
                        <div style="display: flex; flex-direction: row; gap: 4px;">
                            <p>${art.score}</p>
                            <p>(${art.grade.letter})</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    if (p.buffs && p.buffs.length > 0) {
        let buffListHtml = "";

        // 1. ÉTAPE DE GROUPAGE : On range les buffs par catégorie
        // On stocke aussi l'index original (bIndex) pour que le bouton switch fonctionne
        const groupedBuffs = {};
        p.buffs.forEach((buff, bIndex) => {
            if (!groupedBuffs[buff.category]) {
                groupedBuffs[buff.category] = [];
            }
            groupedBuffs[buff.category].push({ buff: buff, originalIndex: bIndex });
        });

        // 2. GÉNÉRATION HTML : On crée une DIV par groupe
        Object.keys(groupedBuffs).forEach(category => {
            // Début du conteneur GLOBAL pour la catégorie
            buffListHtml += `<div>`; // Correction de la coquille ici

            // Titre de la catégorie
            buffListHtml += `
                <div style="font-size:12px; margin-bottom:6px; color:#FFFFFF;">
                    ${category}
                </div>`;

            // --- NOUVEAU : On ouvre un conteneur pour la LISTE des buffs ---
            // C'est ici qu'on gère l'espacement (gap: 4px) entre les pilules
            buffListHtml += `<div style="display: flex; flex-direction: column; gap: 6px;">`;

            // Boucle sur les buffs de ce groupe
            groupedBuffs[category].forEach(item => {
                const buff = item.buff;
                const bIndex = item.originalIndex;

                const textColor = buff.active ? '#FFFFFF' : 'rgba(255,255,255,0.6)';
                const trackColor = buff.active ? 'rgb(from var(--char-hex) r g b / 0.6)' : 'rgba(255,255,255,0.2)';
                const knobColor = buff.active ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)';
                const knobTransform = buff.active ? 'transform:translateX(14px);' : '';

                // Note : J'ai ajouté des propriétés critiques sur le <p> et le <label>
                buffListHtml += `
                    <div style="display:flex; flex-direction: row; gap: 8px; align-items:center; justify-content:space-between; padding:6px 8px; background:rgba(0,0,0,0.2); border-radius:8px; box-sizing: border-box;">
                        
                        <p style="font-size:12px; color:${textColor}; transition: color 0.3s; margin: 0; flex: 1; min-width: 0; word-break: break-word;">${buff.name}</p>
                        
                        <label class="switch" style="position:relative; display:inline-block; width:30px; min-width: 30px; height:16px; box-sizing: border-box; flex-shrink: 0;">
                            <input type="checkbox" ${buff.active ? 'checked' : ''} onchange="toggleBuff(${index}, ${bIndex})" style="opacity:0; width:0; height:0;">
                            <span style="position:absolute; cursor:pointer; top:0; left:0; right:0; bottom:0; background:${trackColor}; transition:.4s; border-radius:34px; width: 100%;"></span>
                            <span style="position:absolute; content:''; height:12px; width:12px; left:2px; bottom:2px; background-color:${knobColor}; transition:.4s; border-radius:50%; ${knobTransform} box-shadow: 0 1px 3px rgba(0,0,0,0.4);"></span>
                        </label>
                    </div>
                `;
            });

            // --- Fin du conteneur de liste ---
            buffListHtml += `</div>`;

            // Fin du conteneur global
            buffListHtml += `</div>`;
        });

        html += `
            <div class="card" style="width: 240px; min-width: 240px; height: 280px; border: 1px solid rgba(255, 255, 255, 0.4); transition: background-color 0.35s, box-shadow 0.25s, border-color 0.25s; border-radius: 8px; box-shadow: rgb(0, 0, 0) 1px 1px 6px, rgba(255, 255, 255, 0.3) 0px 0px 2px inset;">
                <div class="card-container" style="height: 100%; padding: 12px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: flex-start; align-items: stretch;">
                    
                    <div style="font-size:14px; flex-shrink: 0;">
                        <p style="margin-bottom: 2px;">Buffs actifs</p>
                        <p style="font-size: 12px; color: rgba(255, 255, 255, 0.4);">Cochez pour appliquer les passifs et buffs (scroll pour tout voir).</p>
                    </div>
                    
                    <div class="card-divider" style="flex-shrink: 0; margin: 9px 0px; display: flex; clear: both; width: 100%; min-width: 100%; box-sizing: border-box; color: rgba(255, 255, 255, 0.25); border-width: 1px 0 0; border-color: rgba(255, 255, 255, 0.25); border-block-start: 1px solid rgba(255, 255, 255, 0.25);"></div>
                    
                    <div class="card-buff-list-container" style="overflow-y: auto; position: relative; flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 9px;">
                        ${buffListHtml}
                    </div>
                </div>
            </div>
        `;
    }

    html += `</div></div>`; // Fin equipment-area et top-row








    // --- 3. COACHING SECTION (Bas - Full Width - Structuré par Familles) ---
    html += `
        <div class="coaching-row" style="margin-top:64px; width:100%;">
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
        const critAdvice = getCritAdvice(b.cr, b.cd, config);        
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
                <div style="padding:20px;">
                    <h2 style="color:#fff; margin-bottom:25px; font-size:32px; border-bottom:2px solid #FFFFFF; padding-bottom:10px; display:flex; align-items:center; gap:10px;">${p.nom} - Analyse & conseils</h2>
                    
                    <div style="display:flex; flex-direction:column; gap:64px;">
                        
                        <div style="">
                            <h3 style="color:#FFFFFF; font-size:24px; margin-bottom: 12px;">1. Vue d'ensemble</h3>
                            <p style="border-left: 3px solid #aaa; padding-left: 12px; color: #aaa; font-size: 16px; margin-bottom: 24px;">Évaluez la qualité de vos sous-stats et ayez un aperçu réel du potentiel de vos artéfacts actuels.</p>
                            ${generateScoreBar(ev.totalRolls, ev.grade.letter)}
                            
                            <div style="background:#2C2D32; padding:16px; border-radius:8px;">   
                                <div style="display:flex; justify-content:space-around; align-items:center; flex-wrap:wrap; gap:32px;">
                                    <div style="text-align:left;">
                                        <p style="font-size:12px; text-transform: uppercase; color:#aaa; margin-bottom: 8px;">Efficacité du Build</p>
                                        <p style="font-size:40px; line-height: 1; color:${effColor};">${efficiency}%</p>
                                    </div>
                                    <div style="text-align:left;">
                                        <p style="font-size:12px; text-transform: uppercase; color:#aaa; margin-bottom: 8px;">Facteur Chance (RNG)</p>
                                        <p style="font-size:40px; line-height: 1; color:${rngQuality > 85 ? '#22c55e' : (rngQuality > 75 ? '#eab308' : '#ff4d4d')}">${rngQuality}%</p>
                                    </div>
                                    <div style="flex:1; min-width:200px;">
                                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; font-size:0.8rem;">
                                            <span style="color:#aaa; font-size: 12px; text-transform: uppercase;">Score Potentiel Max</span>
                                            <span style="font-weight:bold; color:var(--accent-gold);">${potential.score} <span style="color:#22c55e; font-size:0.7rem;">(+${gain})</span></span>
                                        </div>
                                        <div style="width:100%; background:#333; height:40px; border-radius:8px; position:relative;">
                                            <div style="height:100%; background:#fff; width:${Math.min((ev.score / potential.score)*100, 100)}%; border-radius:8px; position:absolute;"></div>
                                            <div style="height:100%; background:var(--accent-gold); width:100%; opacity:0.3; border-radius:8px;"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                       <div style="margin: auto 10px; flex-grow: 1; width: unset; min-width: unset; background: none; border-color: rgba(255, 255, 255, 0.25); border-style: dashed; border-width: 1px 0 0; display: flex; clear: both;"></div>
                                
                        <div>
                            <h3 style="color:#FFFFFF; font-size:24px; margin-bottom: 12px;">2. Analyse stratégique</h3>
                            <p style="border-left: 3px solid #aaa; padding-left: 12px; color: #aaa; font-size: 16px; margin-bottom: 24px;">Identifiez les déséquilibres majeurs de votre build et assurez-vous que votre pièce hors-set apporte un vrai bonus.</p>
                            
                            <div style="display:flex; gap:20px; align-items:stretch;">
                                
                                <div style="flex:1; background:#2C2D32; padding:15px; border-radius:8px; border-left:3px solid ${critAdvice.color};">
                                    <p style="font-size:12px; color:#aaa; text-transform:uppercase; margin-bottom:8px;">Analyse de taux critique</p>
                                    <p style="font-size:16px; color:#fff;">${critAdvice.msg}</p>
                                </div>
                                
                                <div style="flex:1; background:#2C2D32; padding:15px; border-radius:8px;">
                                    <div style="color:#aaa; text-transform:uppercase; margin-bottom:10px; display:flex; justify-content:space-between;">
                                        <p style="font-size:12px; color:#aaa; text-transform:uppercase; margin-bottom:8px;">Analyse des stats inutiles</p>
                                        <span style="font-size:12px; color:#ff4d4d;">${deadRolls.count} Inutiles</span>
                                    </div>
                                    <div style="display:flex; width:100%; height:12px; background:#333; border-radius:6px; overflow:hidden; margin-bottom:10px;">
                                        <div style="width:${(rollStats.useful/rollStats.total)*100}%; background:var(--accent-gold);"></div>
                                        <div style="width:${(rollStats.dead/rollStats.total)*100}%; background:#ff4d4d;"></div>
                                    </div>
                                    <div style="display:flex; flex-wrap:wrap; gap:5px;">
                                        ${deadRolls.details.map(d =>
                                            `<span style="background:rgba(255, 77, 77, 0.15); color:#ff9999; font-size:0.75rem; padding:2px 8px; border-radius:4px;">${d.label}: ${d.count}</span>`
                                        ).join('')}
                                        ${deadRolls.count === 0 ? '<span style="color:#22c55e; font-size:16px;">Aucune stat morte !</span>' : ''}
                                    </div>
                                </div>
                                
                                ${offPieceAdvice ? `
                                <div style="flex:1; background:#2C2D32; padding:15px; border-radius:8px; border: 1px solid rgba(255, 255, 255, 0.05); border-left:3px solid ${offPieceAdvice.type === 'success' ? '#22c55e' : (offPieceAdvice.type === 'warning' ? '#eab308' : '#ef4444')};">
                                    <p style="font-size:12px; color:#aaa; text-transform:uppercase; margin-bottom:8px;">Analyse Pièce Hors-Set</p>
                                    <p style="font-size:16px; color:#fff;">${offPieceAdvice.msg}</p>
                                </div>` : ''}
                                
                            </div>
                        </div>

                       <div style="margin: auto 10px; flex-grow: 1; width: unset; min-width: unset; background: none; border-color: rgba(255, 255, 255, 0.25); border-style: dashed; border-width: 1px 0 0; display: flex; clear: both;"></div>

                        <div>
                            <h3 style="color:#FFFFFF; font-size:24px; margin-bottom: 12px;">3. Plan d'action</h3>
                            <p style="border-left: 3px solid #aaa; padding-left: 12px; color: #aaa; font-size: 16px; margin-bottom: 24px;">Votre feuille de route prioritaire avec les corrections urgentes à appliquer et les artéfacts à remplacer.</p>
                            
                            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:20px;">
                        
                                ${(() => {
                                    const adv = getLevelAdvice(p);
                                    const color = adv.type === 'success' ? '#22c55e' : '#ef4444';
                                    return `
                                    <div style="background:#2C2D32; padding:15px; border-radius:8px; border-left:3px solid ${color};">
                                        <p style="font-size: 12px;color: #aaa; text-transform: uppercase;margin-bottom: 8px;">${adv.title}</p>
                                        <p style="font-size: 16px; color:#fff;">${adv.msg}</p>
                                    </div>`;
                                })()}
                        
                                ${(() => {
                                    const adv = getWeaponAdvice(p);
                                    const color = adv.type === 'success' ? '#22c55e' : '#ef4444';
                                    return `
                                    <div style="background:#2C2D32; padding:15px; border-radius:8px; border-left:3px solid ${color};">
                                        <p style="font-size: 12px;color: #aaa; text-transform: uppercase;margin-bottom: 8px;">${adv.title}</p>
                                        <p style="font-size: 16px; color:#fff;">${adv.msg}</p>
                                    </div>`;
                                })()}
                        
                                ${talentAdvices && talentAdvices.length > 0 ? `
                                    <div style="background:#2C2D32; padding:15px; border-radius:8px; border-left:3px solid ${talentAdvices[0].type === 'success' ? '#22c55e' : (talentAdvices.some(a => a.type === 'critical') ? '#ef4444' : '#ef4444')};">
                                        <p style="font-size: 12px;color: #aaa; text-transform: uppercase;margin-bottom: 8px;">Priorité des Aptitudes</p>
                                        ${talentAdvices.map(adv => `
                                            <p style="font-size: 16px; color:#fff;">${adv.msg}</p>
                                        `).join('')}
                                    </div>`
                                : ''}
                        
                                ${(() => {
                                    const adv = getMainStatAdvice(p, config);
                                    const color = adv.type === 'success' ? '#22c55e' : '#ef4444';
                                    return `
                                    <div style="background:#2C2D32; padding:15px; border-radius:8px; border-left:3px solid ${color};">
                                        <p style="font-size: 12px;color: #aaa; text-transform: uppercase;margin-bottom: 8px;">${adv.title}</p>
                                        ${adv.type === 'success'
                                        ? `<p style="font-size:16px; color:#fff;">${adv.msg}</p>`
                                        : adv.details.map(d => `
                                            <p style="font-size:16px; color:#fff;">
                                                Sur <b style="color: #aaa;">${d.piece}</b>, visez <span style="color:var(--accent-gold); font-weight:bold;">${d.better}</span> (Actuellement : <span style="color:var(--accent-gold);">${d.current}</span>).
                                            </p>
                                        `).join('') }
                                    </div>`;
                                })()}
                        
                                ${(() => {
                                    const adv = getMetaSetAdvice(p, config);
                                    if (!adv) return '';
                        
                                    let color;
                                    if (adv.type === 'success') {
                                        color = '#22c55e';
                                    } else if (adv.type === 'warning') {
                                        color = '#ef4444';
                                    } else {
                                        color = '#f97316';
                                    }
                        
                                    return `
                                    <div style="background:#2C2D32; padding:15px; border-radius:8px; border-left:3px solid ${color};">
                                        <p style="font-size: 12px;color: #aaa; text-transform: uppercase;margin-bottom: 8px;">${adv.title}</p>
                                        <p style="font-size: 16px; color:#fff;">${adv.msg}</p>
                                    </div>`;
                                })()}
                        
                                ${(() => {
                                    const adv = getSetForcingAdvice(p, config);
                                    const color = adv.type === 'success' ? '#22c55e' : '#ef4444';
                                    return `
                                    <div style="background:#2C2D32; padding:15px; border-radius:8px; border-left:3px solid ${color};">
                                        <p style="font-size: 12px;color: #aaa; text-transform: uppercase;margin-bottom: 8px;">${adv.title}</p>
                                        <p style="font-size: 16px; color:#fff;">${adv.msg}</p>
                                    </div>`;
                                })()}
                        
                                <div style="background:#2C2D32; padding:15px; border-radius:8px; grid-column: 1 / -1;">
                                    <p style="font-size:12px; color:#aaa; text-transform:uppercase; margin-bottom:8px;">Top 3 des artéfacts à changer par ordre de priorité</p>
                                    ${priorities.length > 0 ? priorities.map((p, i) => {
                                        const difficulty = getFarmDifficulty(p.type, p.mainKey);
                                        return `
                                        <div style="display:flex; justify-content:space-between; align-items:center; font-size:16px; margin-bottom:8px; padding-bottom:8px; border-bottom:1px dashed rgba(255,255,255,0.1);">
                                            <div style="display:flex; flex-direction:column;">
                                                <div style="display:flex; align-items:center; gap:6px;">
                                                    <p style="font-size: 16px; color:#ddd;">${i+1}. ${p.piece}</p>
                                                    ${p.isOffPiece ? '<p style="font-size:0.7rem; color:rgba(34, 198, 94, 1); background:rgba(34, 198, 94, 0.15); padding:1px 4px; border-radius:4px;">Off-Set</p>' : ''}
                                                </div>
                                                
                                                <p style="font-size:12px; color:#9ca3af; margin-left: 16px; margin-top:1px;">${p.setName} • <span style="color:#fff;">${p.mainLabel}</span></p>
                                                
                                                <p style="font-size:12px; color:${difficulty.color}; margin-left: 16px; margin-top:2px;">${difficulty.label} à farmer</p>
                                            </div>
                                            
                                            <div style="text-align:right; display: flex; flex-direction: row; gap: 4px;">
                                                <p style="color:${p.color}; font-size:16px;">${p.score}</p>
                                                <p style="color:${p.color}; font-size:16px;">(${p.grade})</p>
                                            </div>
                                        </div>
                                    `}).join('') : '<p style="color:#22c55e;">Rien à signaler, excellent travail.</p>'}
                                </div>
                            </div>
                        </div>
                        
                        <div style="margin: auto 10px; flex-grow: 1; width: unset; min-width: unset; background: none; border-color: rgba(255, 255, 255, 0.25); border-style: dashed; border-width: 1px 0 0; display: flex; clear: both;"></div>

                        ${deadSims.length > 0 ? `
                        <div>
                            <h3 style="color:#FFFFFF; font-size:24px; margin-bottom: 12px;">4. Projection idéale</h3>
                            <p style="border-left: 3px solid #aaa; padding-left: 12px; color: #aaa; font-size: 16px; margin-bottom: 24px;">Visualisez les statistiques que vous pourriez obtenir si vos statistiques inutiles étaient converties en statistiques optimales.</p>
                            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:20px;">
                            ${deadSims.map(sim => `
                                <div style="background:#2C2D32; padding:12px; border-radius:6px; border-left:3px solid #FFB13B;">
                                    <p style="font-size:12px; text-transform: uppercase; color:#aaa; margin-bottom:8px;">${sim.pieceName}</p>
                                    <p style="font-size:14px; color:#ffffff; margin-bottom: 12px;">${sim.text}</p>
                                    <div style="font-size:16px; color:var(--accent-gold); display: flex; flex-direction: column; gap: 4px;">${sim.gainHtml}</div>
                                </div>
                            `).join('')}
                            </div>
                        </div>` : ''}
                        
                        <div style="margin: auto 10px; flex-grow: 1; width: unset; min-width: unset; background: none; border-color: rgba(255, 255, 255, 0.25); border-style: dashed; border-width: 1px 0 0; display: flex; clear: both;"></div>

                        <div>
                            <h3 style="color:#FFFFFF; font-size:24px; margin-bottom: 12px;">5. Simulateur de reroll</h3>
                            <p style="border-left: 3px solid #aaa; padding-left: 12px; color: #aaa; font-size: 16px; margin-bottom: 24px;">Évaluez s'il est rentable de redistribuer les valeurs des statistiques de vos artéfacts vers de meilleures valeurs.</p>
                        
                            <div style="display:flex; flex-direction: row; justify-content: space-between; gap:15px;">
                                ${p.artefacts.map(art => {
                                    // --- Logique JavaScript ---
                                    const metrics = calculateRerollMetrics(art, config);
                        
                                    // Si pas de métriques, on n'affiche rien
                                    if (!metrics) return '';
                        
                                    const pieceName = ARTIFACT_TYPE_MAPPING[art.type] || art.type;
                        
                                    // --- Template HTML ---
                                    return `
                                    <div style="width: 100%; background:#2C2D32; padding:12px; border-radius:8px; border-left: 3px solid ${metrics.badge.color}">
                                        
                                        <div style="display:flex; align-items:center; gap:12px; margin-bottom:10px;">
                                            <img src="${art.icon}" style="width:42px; height:42px; border-radius:8px; background-color: rgba(0,0,0,0.1)" alt="">
                                            <div style="display:flex; flex-direction:column; justify-content:center; gap: 3px;">
                                                <p style="font-size:12px; color:#fff; font-weight:bold; overflow:hidden; text-overflow:ellipsis;">
                                                    ${pieceName}
                                                </p>
                                                <p style="font-size:12px; color:${art.grade.color}; opacity:0.9;">
                                                    ${art.score} (${art.grade.letter})
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div style="margin-bottom:8px;">
                                            <div style="display:flex; justify-content:space-between; font-size:12px; color:#aaa; margin-bottom: 4px;">
                                                <p>Potentiel de gain</p>
                                                <p style="color:${metrics.potential > 60 ? '#22c55e' : '#ccc'}">${metrics.potential}%</p>
                                            </div>
                                            <div style="width:100%; height:4px; background:#333; border-radius:2px;">
                                                <div style="width:${metrics.potential}%; height:100%; background:linear-gradient(90deg, #3b82f6, #22c55e); border-radius:2px;"></div>
                                            </div>
                                        </div>
                        
                                        <div style="margin-bottom:12px;">
                                            <div style="display:flex; justify-content:space-between; font-size:12px; color:#aaa; margin-bottom: 4px;">
                                                <p>Risque de perte</p>
                                                <p style="color:${metrics.risk > 60 ? '#ff4d4d' : '#ccc'}">${metrics.risk}%</p>
                                            </div>
                                            <div style="width:100%; height:4px; background:#333; border-radius:2px;">
                                                <div style="width:${metrics.risk}%; height:100%; background:linear-gradient(90deg, #f59e0b, #ff4d4d); border-radius:2px;"></div>
                                            </div>
                                        </div>
                        
                                        <p style="text-align:center; background:${metrics.badge.color}20; color:${metrics.badge.color}; padding:4px; border-radius:4px; font-size:12px; border:1px solid ${metrics.badge.color}40;">
                                            ${metrics.badge.text}
                                        </p>
                        
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

/* =========================================
   INITIALISATION & ÉVÉNEMENTS
   ========================================= */
loadGameData(); // On charge les données du jeu (personnages, noms...)

// Gestion de la touche "Entrée" dans le champ de texte
const uidInput = document.getElementById('uidInput');
if (uidInput) {
    uidInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Empêche le rechargement de page indésirable
            fetchUserData();        // Lance la recherche
        }
    });
}


/* =========================================
   EXPORT IMAGE (dom-to-image) - VERSION WSRV + UID
   ========================================= */
window.exportBuildAsImage = async function() {
    const element = document.querySelector('.top-row');
    if (!element) return alert("Aucun build affiché !");

    const btn = document.querySelector('button[onclick="exportBuildAsImage()"]');
    const originalContent = btn ? btn.innerHTML : 'Exporter';
    if(btn) btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Traitement...';

    // On sauvegarde le style original
    const bgDiv = element.querySelector('.background-splash-art');
    let originalBgImage = "";

    // --- ÉTAPE 1 : RÉCUPÉRATION DU FOND VIA WSRV.NL ---
    if (bgDiv) {
        try {
            const computedStyle = window.getComputedStyle(bgDiv);
            const bgUrlMatch = computedStyle.backgroundImage.match(/url\(["']?([^"']*)["']?\)/);

            if (bgUrlMatch && bgUrlMatch[1]) {
                const imgUrl = bgUrlMatch[1];
                originalBgImage = bgDiv.style.backgroundImage;

                // Utilisation de wsrv.nl (Ultra robuste pour les images + CORS)
                const proxyUrl = 'https://wsrv.nl/?url=' + encodeURIComponent(imgUrl) + '&output=png';

                const res = await fetch(proxyUrl);
                if (!res.ok) throw new Error("Erreur wsrv : " + res.status);

                const blob = await res.blob();
                const reader = new FileReader();

                await new Promise((resolve, reject) => {
                    reader.onloadend = resolve;
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                });

                if (reader.result) {
                    bgDiv.style.backgroundImage = `url('${reader.result}')`;
                }
            }
        } catch (e) {
            console.warn("Le fond n'a pas pu être chargé (export continu sans fond) :", e);
        }
    }

    // --- ÉTAPE 2 : GÉNÉRATION ---
    await new Promise(r => setTimeout(r, 50));

    domtoimage.toPng(element, {
        bgcolor: null,
        scale: 2,
        filter: (node) => true
    })
        .then(function (dataUrl) {
            // 1. Récupération du Nom
            const nameEl = document.querySelector('.showcase-area-base-stats h2');
            const charName = nameEl ? nameEl.innerText.trim() : 'Genshin_Build';

            // 2. Récupération de l'UID (NOUVEAU)
            const uidInput = document.getElementById('uidInput');
            const uid = uidInput ? uidInput.value.trim() : '';

            // 3. Construction du nom de fichier
            // Exemple : Build_Nilou_704449686.png
            const fileName = uid ? `Build_${charName}_${uid}.png` : `Build_${charName}.png`;

            const link = document.createElement('a');
            link.download = fileName;
            link.href = dataUrl;
            link.click();
        })
        .catch(function (error) {
            console.error('Erreur export dom-to-image :', error);
            alert('Erreur lors de la création de l\'image.');
        })
        .finally(function() {
            // --- NETTOYAGE ---
            if (bgDiv && originalBgImage) {
                bgDiv.style.backgroundImage = originalBgImage;
            }
            if(btn) btn.innerHTML = originalContent;
        });
};