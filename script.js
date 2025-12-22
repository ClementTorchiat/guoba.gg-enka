/* =========================================
   SCRIPT PRINCIPAL - PROJET 2 (CORRIGÉ)
   ========================================= */

// 1. Dictionnaire de traduction STATS
const STAT_MAPPING = {
    "FIGHT_PROP_HP": "hp",
    "FIGHT_PROP_HP_PERCENT": "hp_",
    "FIGHT_PROP_ATTACK": "atk",
    "FIGHT_PROP_ATTACK_PERCENT": "atk_",
    "FIGHT_PROP_DEFENSE": "def",
    "FIGHT_PROP_DEFENSE_PERCENT": "def_",
    "FIGHT_PROP_CRITICAL": "critRate_",
    "FIGHT_PROP_CRITICAL_HURT": "critDMG_",
    "FIGHT_PROP_CHARGE_EFFICIENCY": "enerRech_",
    "FIGHT_PROP_ELEMENT_MASTERY": "eleMas",
    "FIGHT_PROP_HEAL_ADD": "heal_",
    "FIGHT_PROP_PHYSICAL_ADD_HURT": "physical_dmg_",
    "FIGHT_PROP_FIRE_ADD_HURT": "pyro_dmg_",
    "FIGHT_PROP_ELEC_ADD_HURT": "electro_dmg_",
    "FIGHT_PROP_WATER_ADD_HURT": "hydro_dmg_",
    "FIGHT_PROP_GRASS_ADD_HURT": "dendro_dmg_",
    "FIGHT_PROP_WIND_ADD_HURT": "anemo_dmg_",
    "FIGHT_PROP_ROCK_ADD_HURT": "geo_dmg_",
    "FIGHT_PROP_ICE_ADD_HURT": "cryo_dmg_"
};

// 1.b Labels
const STAT_LABELS = {
    "hp": "PV", "hp_": "PV %",
    "atk": "ATQ", "atk_": "ATQ %",
    "def": "DÉF", "def_": "DÉF %",
    "eleMas": "Maîtrise Élem.",
    "enerRech_": "Recharge d'énergie",
    "critRate_": "Taux CRIT",
    "critDMG_": "DGT CRIT",
    "heal_": "Bonus de Soins",
    "pyro_dmg_": "DGT Pyro",
    "hydro_dmg_": "DGT Hydro",
    "cryo_dmg_": "DGT Cryo",
    "electro_dmg_": "DGT Électro",
    "anemo_dmg_": "DGT Anémo",
    "geo_dmg_": "DGT Géo",
    "dendro_dmg_": "DGT Dendro",
    "physical_dmg_": "DGT Phys."
};

// 1.c ICONES ENKA OFFICIELLES
const STAT_ICONS = {
    "hp": "UI_Icon_Attribute_Health",
    "hp_": "UI_Icon_Attribute_Health",
    "atk": "UI_Icon_Attribute_Attack",
    "atk_": "UI_Icon_Attribute_Attack",
    "def": "UI_Icon_Attribute_Defense",
    "def_": "UI_Icon_Attribute_Defense",
    "eleMas": "UI_Icon_Attribute_Element",
    "enerRech_": "UI_Icon_Attribute_EnergyCharge",
    "critRate_": "UI_Icon_Attribute_Critical",
    "critDMG_": "UI_Icon_Attribute_CriticalDamage",
    "heal_": "UI_Icon_Attribute_Heal",
    "pyro_dmg_": "UI_Icon_Element_Fire",
    "hydro_dmg_": "UI_Icon_Element_Water",
    "cryo_dmg_": "UI_Icon_Element_Ice",
    "electro_dmg_": "UI_Icon_Element_Electric",
    "anemo_dmg_": "UI_Icon_Element_Wind",
    "geo_dmg_": "UI_Icon_Element_Rock",
    "dendro_dmg_": "UI_Icon_Element_Grass",
    "physical_dmg_": "UI_Icon_Attribute_Physical"
};

// 2. Dictionnaire SETS
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
    "Parchemins du héros de la cité": "ScrollOfTheHeroOfCinderCity"
};

let globalPersoData = [];
let charData = {};
let locData = {};

// --- CHARGEMENT ---
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

// --- UTILS ---
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
    // URL Icone Enka
    const iconKey = STAT_ICONS[key] || "UI_Icon_Attribute_Attack"; // Fallback
    const icon = `https://enka.network/ui/${iconKey}.png`;

    return { key, value: val, label, icon, isPercent };
}

// --- PROCESS ---
function processData(data) {
    if (!data.avatarInfoList) return;
    globalPersoData = [];

    data.avatarInfoList.forEach(perso => {
        const id = perso.avatarId;
        const info = charData[id] || {};
        const nom = getText(info.NameTextMapHash) || "Inconnu";
        const rarity = info.QualityType === "QUALITY_ORANGE" ? 5 : 4;
        const level = perso.propMap['4001'] ? parseInt(perso.propMap['4001'].val) : 0;
        const constellations = perso.talentIdList ? perso.talentIdList.length : 0;

        // Talents
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
        const combatStats = {
            hp: fp[2000],
            atk: fp[2001],
            def: fp[2002],
            em: fp[28],
            cr: fp[20] * 100,
            cd: fp[22] * 100,
            er: fp[23] * 100,
            elemBonus: Math.max(fp[30], fp[40], fp[41], fp[42], fp[43], fp[44], fp[45], fp[46]) * 100
        };

        const artefacts = []; // CORRECTION: Variable locale "artefacts" (orthographe FR/EN)
        let weapon = null;

        perso.equipList.forEach(item => {
            const flat = item.flat;

            // WEAPON
            if (item.weapon) {
                const main = flat.weaponStats && flat.weaponStats[0] ? formatStat(flat.weaponStats[0].appendPropId, flat.weaponStats[0].statValue) : null;
                const sub = flat.weaponStats && flat.weaponStats[1] ? formatStat(flat.weaponStats[1].appendPropId, flat.weaponStats[1].statValue) : null;

                weapon = {
                    name: getText(flat.nameTextMapHash),
                    level: item.weapon.level,
                    rank: (item.weapon.affixMap ? Object.values(item.weapon.affixMap)[0] : 0) + 1,
                    icon: `https://enka.network/ui/${flat.icon}.png`,
                    baseAtk: main,
                    subStat: sub,
                    stars: flat.rankLevel
                };
            }

            // ARTIFACTS
            if (flat.itemType === "ITEM_RELIQUARY") {
                const nomSetFR = getText(flat.setNameTextMapHash);
                const setKey = SET_NAME_MAPPING[nomSetFR] || "UnknownSet";

                const subs = [];
                if (flat.reliquarySubstats) {
                    flat.reliquarySubstats.forEach(s => {
                        subs.push(formatStat(s.appendPropId, s.statValue));
                    });
                }

                artefacts.push({
                    type: flat.equipType,
                    setKey: setKey,
                    setName: nomSetFR,
                    icon: `https://enka.network/ui/${flat.icon}.png`,
                    mainStat: formatStat(flat.reliquaryMainstat.mainPropId, flat.reliquaryMainstat.statValue),
                    subStats: subs,
                    level: item.reliquary.level - 1
                });
            }
        });

        // CONSTRUCTION DE L'OBJET FINAL
        const persoObj = {
            id: id, nom, rarity, level, cons: constellations, talents,
            image: sideIcon, splashArt: splashUrl,
            combatStats, weapon,
            artefacts: artefacts, // CORRECTION CRUCIALE ICI: 'artefacts' avec 'e' pour matcher scoring.js
            evaluation: null, weights: null
        };

        // Calcul du score (scoring.js utilise perso.artefacts)
        persoObj.evaluation = calculateCharacterScore(persoObj);

        const configKey = persoObj.nom.replace(/\s+/g, '') || "Default";
        const config = CHARACTER_CONFIG[configKey] || CHARACTER_CONFIG[persoObj.nom] || DEFAULT_CONFIG;
        persoObj.weights = config.weights;

        globalPersoData.push(persoObj);
    });

    renderSidebar();
    if(globalPersoData.length > 0) renderShowcase(0);
}

// --- RENDER ---
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
            </div>
        `;
        list.appendChild(div);
    });
}

function renderShowcase(index) {
    const p = globalPersoData[index];
    const container = document.getElementById('main-container');
    if(!container) return;

    const s = p.combatStats;
    const ev = p.evaluation;

    // Talents HTML
    let talentsHtml = `<div style="display:flex; justify-content:center; gap:20px; margin-top:20px;">`;
    p.talents.forEach(t => {
        talentsHtml += `
            <div style="width:50px; height:50px; background:#2d3342; border-radius:50%; display:flex; flex-direction:column; align-items:center; justify-content:center; position:relative; border:2px solid #555;">
                <img src="${t.icon}" style="width:30px; height:30px;">
                <div style="position:absolute; bottom:-10px; background:#111; padding:2px 6px; border-radius:10px; font-size:0.7rem; border:1px solid #333; font-weight:bold;">${t.level}</div>
            </div>`;
    });
    talentsHtml += `</div>`;

    // Helper pour générer une ligne de stat avec icône
    const statLine = (icon, label, val, isHighlight=false) => `
        <div class="stat-row">
            <span class="text-muted" style="display:flex; align-items:center; gap:8px;">
                <img src="https://enka.network/ui/${icon}.png" style="width:18px; filter: brightness(0.8);"> ${label}
            </span> 
            <div class="dotted-line"></div> 
            <span class="stat-val" style="${isHighlight ? 'color:var(--accent-gold)' : ''}">${val}</span>
        </div>`;

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
                
                ${statLine(STAT_ICONS['hp'], "PV Max", Math.round(s.hp))}
                ${statLine(STAT_ICONS['atk'], "ATQ", Math.round(s.atk))}
                ${statLine(STAT_ICONS['def'], "DÉF", Math.round(s.def))}
                ${statLine(STAT_ICONS['eleMas'], "Maîtrise", Math.round(s.em))}
                ${statLine(STAT_ICONS['critRate_'], "Taux CRIT", s.cr.toFixed(1)+'%')}
                ${statLine(STAT_ICONS['critDMG_'], "DGT CRIT", s.cd.toFixed(1)+'%')}
                ${statLine(STAT_ICONS['enerRech_'], "ER", s.er.toFixed(1)+'%', true)}
                ${statLine("UI_Icon_Element_Fire", "Bonus Elem.", s.elemBonus.toFixed(1)+'%')}

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
                ${talentsHtml}
            </div>
        </div>
        <div class="equipment-area">
    `;

    // WEAPON CARD (Améliorée)
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
            </div>
        `;
    }

    // ARTIFACTS - NOTE: Utilisation de p.artefacts (avec 'e')
    p.artefacts.forEach(art => {
        let subsHtml = "";
        art.subStats.forEach(sub => {
            let w = p.weights[sub.key];
            if (w === undefined && sub.key.includes("dmg_")) w = p.weights["elemental_dmg_"] || 0;
            if (w === undefined) w = 0;
            const isDead = w === 0;

            subsHtml += `
                <div class="substat-row ${isDead ? 'dead' : ''}">
                    <span style="display:flex; align-items:center; gap:5px;">
                        <img src="${sub.icon}" style="width:14px; opacity:0.7;"> ${sub.label}
                    </span>
                    <span>${formatValueDisplay(sub.key, sub.value)}</span>
                </div>`;
        });

        html += `
            <div class="card">
                <div class="item-header">
                    <img src="${art.icon}" class="item-img">
                    <div style="overflow:hidden;">
                        <div style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-weight:600; font-size:0.9rem;">${art.type.split('_')[1]}</div>
                        <div style="font-size:0.75rem; color:var(--accent-gold); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${art.setName}</div>
                    </div>
                </div>
                <div class="main-stat-display">
                    <span>${formatValueDisplay(art.mainStat.key, art.mainStat.value)}</span>
                    <span style="display:flex; align-items:center; gap:5px; font-size:0.7rem; color:#aaa; font-weight:normal; align-self:center;">
                        <img src="${art.mainStat.icon}" style="width:16px;"> ${art.mainStat.label}
                    </span>
                </div>
                <div style="margin-top:10px;">${subsHtml}</div>
                <div class="art-score-footer">
                    <span>Score</span>
                    <strong style="color:${art.grade.color}">${art.score} (${art.grade.letter})</strong>
                </div>
            </div>`;
    });

    html += `</div>`;
    container.innerHTML = html;
}

loadGameData();