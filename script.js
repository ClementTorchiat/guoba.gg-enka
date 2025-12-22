/* =========================================
   SCRIPT PRINCIPAL (Version Finale : Buffs Descriptifs)
   ========================================= */

// --- 1. CONFIGURATION DES SVG ---
const SVG_PATHS = {
    "heart": "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
    "sword": "M14.5 17.5L12 15l-2.5 2.5L12 20l2.5-2.5zm5.7-9.3l-2.4-2.4c-.4-.4-1-.4-1.4 0l-9.5 9.5 2.4 2.4 9.5-9.5c.4-.4.4-1 0-1.4zM5.1 14.9L2.7 17.3c-.4.4-.4 1 0 1.4l2.4 2.4c.4.4 1 .4 1.4 0l2.4-2.4-3.8-3.8z",
    "shield": "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z",
    "star": "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
    "flash": "M7 2v11h3v9l7-12h-4l4-8z",
    "target": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z",
    "impact": "M12 2L1 21h22L12 2zm0 3.5L18.5 19H5.5L12 5.5z",
    "cross": "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8.5 12h-2v-3h-3v-2h3v-3h2v3h3v2h-3v3z",
    "fire": "M19.48 13.03c-.52-1.29-2.17-3.23-2.17-3.23s.27-1.74-.95-3.41c-1.22-1.67-3.14-1.92-3.14-1.92s.32 1.94-.49 3.01c-.81 1.07-2.73 1.19-2.73 1.19s1.39-2.77.29-4.88C9.52 2.15 7.42 2 7.42 2s.67 2.37-.53 4.04c-1.2 1.67-1.12 3.86-1.12 3.86s-1.87 1.12-1.72 4.18c.15 3.06 2.5 5.92 7.95 5.92 5.45 0 7.85-2.6 8-5.69.02-1.09-.52-1.28-.52-1.28z",
    "water": "M12 2.6L8.5 7.5c-1.8 2.5-1.4 5.2.9 6.9 2.3 1.7 5.3 1.1 6.6-1.5.5-1 1-3.1-4-10.3z",
    "wind": "M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z",
    "rock": "M12 2L2 22h20L12 2zm0 4l6.5 13h-13L12 6z",
    "ice": "M22 11h-5V6h-2v5H10V6H8v5H3v2h5v5h2v-5h5v5h2v-5h5z",
    "leaf": "M17 8C8 10 5.9 16.17 3.82 21.34 5.71 20.35 8.32 19 12 18c6.9 3 9-3 9-3s-2.07-3.95-4-7z",
    "percent_badge": "M18.5 5.5l-9 13M10.5 6.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm7 10a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"
};

function createSvg(pathKey, isPercent = false) {
    let content = `<path d="${SVG_PATHS[pathKey]}" />`;
    if (isPercent) content += `<g transform="scale(0.6) translate(14, 14)"><path d="${SVG_PATHS['percent_badge']}" fill="var(--accent-gold)" stroke="black" stroke-width="1"/></g>`;
    return `<svg viewBox="0 0 24 24" fill="currentColor" style="width:16px; height:16px; display:inline-block; vertical-align:middle;">${content}</svg>`;
}

function getRollCount(key, value) {
    if (!window.MAX_ROLLS || !window.MAX_ROLLS[key]) return 0;
    const avgRoll = window.MAX_ROLLS[key] * 0.85;
    return Math.round(value / avgRoll);
}

// 2. MAPPINGS
const STAT_MAPPING = {
    "FIGHT_PROP_HP": "hp", "FIGHT_PROP_HP_PERCENT": "hp_",
    "FIGHT_PROP_ATTACK": "atk", "FIGHT_PROP_ATTACK_PERCENT": "atk_",
    "FIGHT_PROP_DEFENSE": "def", "FIGHT_PROP_DEFENSE_PERCENT": "def_",
    "FIGHT_PROP_CRITICAL": "critRate_", "FIGHT_PROP_CRITICAL_HURT": "critDMG_",
    "FIGHT_PROP_CHARGE_EFFICIENCY": "enerRech_", "FIGHT_PROP_ELEMENT_MASTERY": "eleMas",
    "FIGHT_PROP_HEAL_ADD": "heal_",
    "FIGHT_PROP_PHYSICAL_ADD_HURT": "physical_dmg_", "FIGHT_PROP_FIRE_ADD_HURT": "pyro_dmg_",
    "FIGHT_PROP_ELEC_ADD_HURT": "electro_dmg_", "FIGHT_PROP_WATER_ADD_HURT": "hydro_dmg_",
    "FIGHT_PROP_GRASS_ADD_HURT": "dendro_dmg_", "FIGHT_PROP_WIND_ADD_HURT": "anemo_dmg_",
    "FIGHT_PROP_ROCK_ADD_HURT": "geo_dmg_", "FIGHT_PROP_ICE_ADD_HURT": "cryo_dmg_"
};

const STAT_LABELS = {
    "hp": "PV", "hp_": "PV %", "atk": "ATQ", "atk_": "ATQ %", "def": "DÉF", "def_": "DÉF %",
    "eleMas": "Maîtrise Élem.", "enerRech_": "Recharge d'énergie", "critRate_": "Taux CRIT",
    "critDMG_": "DGT CRIT", "heal_": "Bonus de Soins", "pyro_dmg_": "DGT Pyro",
    "hydro_dmg_": "DGT Hydro", "cryo_dmg_": "DGT Cryo", "electro_dmg_": "DGT Électro",
    "anemo_dmg_": "DGT Anémo", "geo_dmg_": "DGT Géo", "dendro_dmg_": "DGT Dendro",
    "physical_dmg_": "DGT Phys."
};

const SET_NAME_MAPPING = {
    "Sorcière des flammes ardentes": "CrimsonWitchOfFlames", "Emblème du destin brisé": "EmblemOfSeveredFate",
    "Maréchaussée": "MarechausseeHunter", "Troupe dorée": "GoldenTroupe", "Rêve doré": "GildedDreams",
    "Souvenir de la forêt": "DeepwoodMemories", "Codex d'obsidienne": "ObsidianCodex",
    "Ombre de la Verte Chasseuse": "ViridescentVenerer", "Ancien Rituel Royal": "NoblesseOblige",
    "Ténacité du Millelithe": "TenacityOfTheMillelith", "Coquille des rêves opulents": "HuskOfOpulentDreams",
    "Palourde aux teintes océaniques": "OceanHuedClam", "Rideau du Gladiateur": "GladiatorsFinale",
    "Bande Vagabonde": "WanderersTroupe", "Chevalerie ensanglantée": "BloodstainedChivalry",
    "Colère de tonnerre": "ThunderingFury", "Dompteur de tonnerre": "Thundersoother",
    "Amour chéri": "MaidenBeloved", "Roche ancienne": "ArchaicPetra", "Météore inversé": "RetracingBolide",
    "Briseur de glace": "BlizzardStrayer", "Âme des profondeurs": "HeartOfDepth", "Flamme blême": "PaleFlame",
    "Réminiscence nostalgique": "ShimenawasReminiscence", "Au-delà cinabrin": "VermillionHereafter",
    "Échos d'une offrande": "EchoesOfAnOffering", "Chronique du Pavillon du désert": "DesertPavilionChronicle",
    "Fleur du paradis perdu": "FlowerOfParadiseLost", "Rêve de la nymphe": "NymphsDream",
    "Lueur du vourukasha": "VourukashasGlow", "Murmure nocturne en forêt d'échos": "NighttimeWhispersInTheEchoingWoods",
    "Chanson des jours d'antan": "SongOfDaysPast", "Fragment d'harmonie fantasque": "FragmentOfHarmonicWhimsy",
    "Rêverie inachevée": "UnfinishedReverie", "Parchemins du héros de la cité": "ScrollOfTheHeroOfCinderCity"
};

const ARTIFACT_TYPE_MAPPING = {
    "EQUIP_BRACER": "Fleur de la vie", "EQUIP_NECKLACE": "Plume de la mort",
    "EQUIP_SHOES": "Sables du temps", "EQUIP_RING": "Coupe d'éonothème", "EQUIP_DRESS": "Diadème de Logos"
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
    const key = STAT_MAPPING[propId];
    if (!key) return { key: "unknown", value: value, label: propId, icon: "" };
    let val = value;
    let isPercent = false;
    if (key.endsWith('_') || ['critRate_', 'critDMG_', 'enerRech_', 'heal_'].includes(key)) {
        isPercent = true;
        if (val < 2.0) val = val * 100;
    }
    const label = STAT_LABELS[key] || key;
    let svgContent = "";
    if (key === 'hp') svgContent = createSvg('heart', false);
    else if (key === 'hp_') svgContent = createSvg('heart', true);
    else if (key === 'atk') svgContent = createSvg('sword', false);
    else if (key === 'atk_') svgContent = createSvg('sword', true);
    else if (key === 'def') svgContent = createSvg('shield', false);
    else if (key === 'def_') svgContent = createSvg('shield', true);
    else if (key === 'eleMas') svgContent = createSvg('star');
    else if (key === 'enerRech_') svgContent = createSvg('flash');
    else if (key === 'critRate_') svgContent = createSvg('target');
    else if (key === 'critDMG_') svgContent = createSvg('impact');
    else if (key === 'heal_') svgContent = createSvg('cross');
    else if (key === 'pyro_dmg_') svgContent = createSvg('fire');
    else if (key === 'hydro_dmg_') svgContent = createSvg('water');
    else if (key === 'cryo_dmg_') svgContent = createSvg('ice');
    else if (key === 'electro_dmg_') svgContent = createSvg('flash');
    else if (key === 'anemo_dmg_') svgContent = createSvg('wind');
    else if (key === 'geo_dmg_') svgContent = createSvg('rock');
    else if (key === 'dendro_dmg_') svgContent = createSvg('leaf');
    else if (key === 'physical_dmg_') svgContent = createSvg('sword');
    else svgContent = createSvg('star');
    return { key, value: val, label, icon: svgContent, isPercent };
}

// --- LOGIQUE CALCUL BONUS DYNAMIQUE (2 PASSES) ---
function calculateBuffedStats(baseStats, currentStats, buffsList) {
    let buffed = { ...currentStats };

    // PASSE 1 : Bonus Simples
    buffsList.forEach(buff => {
        if (buff.active) applyBonus(buffed, baseStats, buff.bonuses, false);
    });

    // PASSE 2 : Conversions (Scaling)
    buffsList.forEach(buff => {
        if (buff.active) applyBonus(buffed, baseStats, buff.bonuses, true);
    });

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
        }
        else {
            if (processScaling) continue;
            if (statKey === "atk_") buffed.atk += baseStats.atk * val;
            else if (statKey === "hp_") buffed.hp += baseStats.hp * val;
            else if (statKey === "def_") buffed.def += baseStats.def * val;
            else if (statKey === "critRate_" || statKey === "critDMG_" || statKey === "enerRech_" || statKey.includes("_dmg_")) {
                let shortKey = getShortKey(statKey);
                if(shortKey) buffed[shortKey] += val * 100;
            } else if (statKey === "eleMas") {
                buffed.em += val;
            }
        }
    }
}

function getShortKey(longKey) {
    if (longKey === "critRate_") return "cr";
    if (longKey === "critDMG_") return "cd";
    if (longKey === "enerRech_") return "er";
    if (longKey.includes("_dmg_")) return "elemBonus";
    return null;
}

function mapTargetKey(keyPart) {
    if (keyPart === 'atk') return 'atk';
    if (keyPart === 'hp') return 'hp';
    if (keyPart === 'def') return 'def';
    if (keyPart === 'eleMas') return 'em';
    if (keyPart === 'enerRech') return 'er';
    return null;
}

// --- INTERACTION ---
function toggleBuff(charIndex, buffIndex) {
    const p = globalPersoData[charIndex];
    if (!p) return;
    p.buffs[buffIndex].active = !p.buffs[buffIndex].active;
    p.buffedStats = calculateBuffedStats(p.baseStats, p.combatStats, p.buffs);
    renderShowcase(charIndex);
}

// --- PROCESS ---
function processData(data) {
    if (!data.avatarInfoList) return;
    globalPersoData = [];

    // Récupération Globale via Window
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
        const baseStats = {
            hp: fp[1] || 0,
            atk: fp[4] || 0,
            def: fp[7] || 0
        };

        const combatStats = {
            hp: fp[2000], atk: fp[2001], def: fp[2002], em: fp[28],
            cr: fp[20] * 100, cd: fp[22] * 100, er: fp[23] * 100,
            elemBonus: Math.max(fp[30], fp[40], fp[41], fp[42], fp[43], fp[44], fp[45], fp[46]) * 100
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
                    name: getText(flat.nameTextMapHash),
                    level: item.weapon.level,
                    rank: (item.weapon.affixMap ? Object.values(item.weapon.affixMap)[0] : 0) + 1,
                    icon: `https://enka.network/ui/${flat.icon}.png`,
                    baseAtk: main, subStat: sub, stars: flat.rankLevel
                };
            }
            if (flat.itemType === "ITEM_RELIQUARY") {
                const nomSetFR = getText(flat.setNameTextMapHash);
                const setKey = SET_NAME_MAPPING[nomSetFR] || "UnknownSet";
                setsCounter[setKey] = (setsCounter[setKey] || 0) + 1;

                const subs = [];
                if (flat.reliquarySubstats) {
                    flat.reliquarySubstats.forEach(s => {
                        subs.push(formatStat(s.appendPropId, s.statValue));
                    });
                }
                artefacts.push({
                    type: flat.equipType, setKey: setKey, setName: nomSetFR,
                    icon: `https://enka.network/ui/${flat.icon}.png`,
                    mainStat: formatStat(flat.reliquaryMainstat.mainPropId, flat.reliquaryMainstat.statValue),
                    subStats: subs, level: item.reliquary.level - 1, stars: flat.rankLevel
                });
            }
        });

        // CONSTRUCTION BUFFS
        let buffs = [];

        // Fonction helper pour ajouter les buffs
        const addBuffs = (sourceName, category, configData) => {
            // Cas 1 : Tableau d'objets (Nouveau format avec Labels)
            if (Array.isArray(configData)) {
                configData.forEach((item, idx) => {
                    // On construit le nom : soit le label custom, soit un générique
                    let name = item.label || `Buff ${idx + 1}`;

                    // Si pas de label mais stats simples, on peut générer (ex: "ATK +20%")
                    if (!item.label && !Array.isArray(item.stats)) {
                        const statsStr = Object.entries(item.stats)
                            .map(([k, v]) => {
                                const l = STAT_LABELS[k] || k;
                                const val = (typeof v === 'number' && v < 2) ? Math.round(v*100)+'%' : v;
                                return `${l} +${val}`;
                            }).join(", ");
                        name = statsStr;
                    }

                    buffs.push({
                        id: `${category}_${idx}`,
                        category: category,
                        name: name,
                        bonuses: item.stats, // On attend "stats" dans le tableau
                        active: true
                    });
                });
            }
            // Cas 2 : Objet Simple (Ancien format compatible)
            else {
                for (const [statKey, val] of Object.entries(configData)) {
                    if (typeof val === 'object' && statKey.endsWith('_scaling')) {
                        const targetStat = statKey.replace('_bonus_scaling', '');
                        const sourceStat = val.source;
                        const targetLabel = STAT_LABELS[targetStat] || targetStat;
                        const sourceLabel = STAT_LABELS[sourceStat] || sourceStat;
                        const percentDisplay = (val.percent * 100).toFixed(2) + "%";

                        buffs.push({
                            id: `${category}_${statKey}`,
                            category: category,
                            name: `${targetLabel} (+${percentDisplay} ${sourceLabel})`,
                            bonuses: { [statKey]: val },
                            active: true
                        });
                        continue;
                    }
                    if (typeof val !== 'object') {
                        const statLabel = STAT_LABELS[statKey] || statKey;
                        const valDisplay = (val < 2) ? Math.round(val * 100) + "%" : val;

                        buffs.push({
                            id: `${category}_${statKey}`,
                            category: category,
                            name: `${statLabel} (+${valDisplay})`,
                            bonuses: { [statKey]: val },
                            active: true
                        });
                    }
                }
            }
        };

        // 1. Arme
        if (weapon && G_WEAPON_PASSIVES[weapon.name]) {
            addBuffs(weapon.name, `${weapon.name} (Arme)`, G_WEAPON_PASSIVES[weapon.name]);
        }

        // 2. Sets
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
            image: sideIcon, splashArt: splashUrl,
            combatStats, buffedStats, baseStats,
            weapon, artefacts, setsCounter, buffs,
            evaluation: null, weights: null
        };

        // Injection Config
        const configKey = persoObj.nom.replace(/\s+/g, '') || "Default";
        const config = G_CHAR_CONFIG[configKey] || G_CHAR_CONFIG[persoObj.nom] || G_DEFAULT_CONFIG;

        persoObj.evaluation = calculateCharacterScore(persoObj, config);
        persoObj.weights = config.weights;

        globalPersoData.push(persoObj);
    });

    renderSidebar();
    if(globalPersoData.length > 0) renderShowcase(0);
}

// ... (RENDER FUNCTIONS inchangées) ...
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

    const s = p.combatStats;
    const b = p.buffedStats;
    const ev = p.evaluation;

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

    let combatStatsHtml = `
        <div style="background:rgba(0,0,0,0.2); padding:15px; border-radius:8px; margin-top:15px; border:1px solid #333;">
            <h3 style="font-size:0.9rem; color:var(--accent-gold); text-transform:uppercase; margin-bottom:10px; font-weight:bold;">Stats de Combat (Passifs Inclus)</h3>
            ${statLine(createSvg('heart'), "PV Max", Math.round(b.hp), b.hp > s.hp)}
            ${statLine(createSvg('sword'), "ATQ", Math.round(b.atk), b.atk > s.atk)}
            ${statLine(createSvg('shield'), "DÉF", Math.round(b.def), b.def > s.def)}
            ${statLine(createSvg('star'), "Maîtrise", Math.round(b.em), b.em > s.em)}
            ${statLine(createSvg('target'), "Taux CRIT", b.cr.toFixed(1)+'%', b.cr > s.cr)}
            ${statLine(createSvg('impact'), "DGT CRIT", b.cd.toFixed(1)+'%', b.cd > s.cd)}
            ${statLine(createSvg('flash'), "ER", b.er.toFixed(1)+'%', b.er > s.er)}
            ${statLine(createSvg('fire'), "Bonus Elem.", b.elemBonus.toFixed(1)+'%', b.elemBonus > s.elemBonus)}
        </div>
    `;

    let html = `
        <div class="showcase-area">
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
                ${statLine(createSvg('heart'), "PV Max", Math.round(s.hp))}
                ${statLine(createSvg('sword'), "ATQ", Math.round(s.atk))}
                ${statLine(createSvg('shield'), "DÉF", Math.round(s.def))}
                ${statLine(createSvg('star'), "Maîtrise", Math.round(s.em))}
                ${statLine(createSvg('target'), "Taux CRIT", s.cr.toFixed(1)+'%')}
                ${statLine(createSvg('impact'), "DGT CRIT", s.cd.toFixed(1)+'%')}
                ${statLine(createSvg('flash'), "ER", s.er.toFixed(1)+'%', true)}
                ${statLine(createSvg('fire'), "Bonus Elem.", s.elemBonus.toFixed(1)+'%')}

                ${talentsHtml}
                ${combatStatsHtml}

                <div class="global-score-card">
                    <div>
                        <div style="color:var(--accent-gold); font-size:0.8rem; text-transform:uppercase; font-weight:bold;">Score Global</div>
                        <div style="font-size:0.8rem; color:#888;">Rolls: ${ev.totalRolls}</div>
                    </div>
                    <div style="text-align:right;">
                        <span style="font-size:1.8rem; font-weight:800; line-height:1;">${ev.score}</span>
                        <span style="color:${ev.grade.color}; font-weight:bold; font-size:1.2rem;">${ev.grade.letter}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="equipment-area">
    `;

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
                            <div style="font-size:0.7rem; color:#aaa;">ATQ Base</div>
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
                    <span>Score</span>
                    <strong style="color:${art.grade.color}">${art.score} (${art.grade.letter})</strong>
                </div>
            </div>`;
    });

    // --- CARTE DE BUFFS (GROUPÉE PAR SOURCE) ---
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
                </div>
            `;
        });

        html += `
            <div class="card" style="border-color:var(--accent-gold); background:rgba(255, 177, 59, 0.05);">
                <div style="font-weight:bold; color:var(--accent-gold); text-transform:uppercase; font-size:0.9rem; margin-bottom:10px; border-bottom:1px solid #444; padding-bottom:5px;">
                    <i class="fa-solid fa-bolt"></i> Buffs Actifs
                </div>
                <div style="flex:1;">
                    ${buffListHtml}
                </div>
                <div style="font-size:0.75rem; color:#888; text-align:center; margin-top:10px;">
                    Cochez pour appliquer les passifs
                </div>
            </div>
        `;
    }

    html += `</div>`;
    container.innerHTML = html;
}

loadGameData();