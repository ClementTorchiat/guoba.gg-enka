/* =========================================
   SCRIPT PRINCIPAL - PROJET 2 (DYNAMIQUE)
   ========================================= */

// 1. Dictionnaire de traduction STATS (Enka -> Projet 1)
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

// 1.b Dictionnaire de LABELS (Traduction Propre)
const STAT_LABELS = {
    "hp": "PV",
    "hp_": "PV %",
    "atk": "ATQ",
    "atk_": "ATQ %",
    "def": "DÉF",
    "def_": "DÉF %",
    "eleMas": "Maîtrise élémentaire",
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

// 2. Dictionnaire de traduction SETS (Français Enka -> Clé Config Projet 1)
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

// Variables globales
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

    // Proxy (CORS)
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
    // On force le français pour matcher SET_NAME_MAPPING
    if (locData && locData.fr && locData.fr[hash]) return locData.fr[hash];
    return "Inconnu";
}

// Formatteur simple pour l'affichage
function formatValueDisplay(key, val) {
    if(['hp', 'atk', 'def', 'eleMas'].includes(key)) return Math.round(val).toLocaleString();
    return val.toFixed(1) + '%';
}

function formatStat(propId, value) {
    const key = STAT_MAPPING[propId];
    if (!key) return { key: "unknown", value: value, label: propId };

    let val = value;
    let isPercent = false;

    // Détection pourcentage
    if (key.endsWith('_') || ['critRate_', 'critDMG_', 'enerRech_', 'heal_'].includes(key)) {
        isPercent = true;
        // Si la valeur est brute (ex: 0.466) on la met en % (46.6)
        if (val < 2.0) val = val * 100;
    }

    // --- CORRECTION ICI ---
    // Au lieu de construire un label moche, on pioche dans le dico
    const label = STAT_LABELS[key] || key;

    return { key, value: val, label, isPercent };
}

// --- TRAITEMENT DES DONNÉES ---
function processData(data) {
    if (!data.avatarInfoList) return;
    globalPersoData = [];

    data.avatarInfoList.forEach(perso => {
        const id = perso.avatarId;
        const info = charData[id] || {};
        const nom = getText(info.NameTextMapHash) || "Inconnu";

        // Image: Essayer d'avoir le Splash Art (Gacha) sinon SideIcon
        let splashImage = `https://enka.network/ui/${info.SideIconName?.replace("Side_Match", "Side")}.png`;
        // Enka ne donne pas l'URL directe du Gacha Splash facilement sans mapping complexe,
        // mais on peut deviner l'URL de l'image de la UI.
        // Souvent: UI_Gacha_AvatarImg_[Name].png

        // Stats de combat (PV Max, Atk Total...) stockées dans fightPropMap
        const fp = perso.fightPropMap;
        const combatStats = {
            hp: fp[2000], // PV Max
            atk: fp[2001], // Atk Max
            def: fp[2002], // Def Max
            em: fp[28],
            cr: fp[20] * 100,
            cd: fp[22] * 100,
            er: fp[23] * 100,
            // Bonus Dgt Elem (Max de tous les éléments)
            elemBonus: Math.max(fp[30], fp[40], fp[41], fp[42], fp[43], fp[44], fp[45], fp[46]) * 100
        };

        const artifacts = [];
        let weapon = null;

        perso.equipList.forEach(item => {
            const flat = item.flat;

            // WEAPON
            if (item.weapon) {
                weapon = {
                    name: getText(flat.nameTextMapHash),
                    level: item.weapon.level,
                    rank: (item.weapon.affixMap ? Object.values(item.weapon.affixMap)[0] : 0) + 1,
                    icon: `https://enka.network/ui/${flat.icon}.png`,
                    mainStat: flat.weaponStats && flat.weaponStats[1] ? formatStat(flat.weaponStats[1].appendPropId, flat.weaponStats[1].statValue) : null
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

                artifacts.push({
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

        // Tentative d'URL Splash Art plus précise
        const namePart = info.SideIconName ? info.SideIconName.split('_').pop() : "Nilou";
        const splashUrl = `https://enka.network/ui/UI_Gacha_AvatarImg_${namePart}.png`;

        const persoObj = {
            id: id,
            nom: nom,
            image: splashImage, // Icone ronde
            splashArt: splashUrl, // Grand art
            combatStats: combatStats,
            weapon: weapon,
            artefacts: artifacts,
            evaluation: null,
            weights: null // Sera rempli par scoring
        };

        // Calcul Score
        // Note: calculateCharacterScore vient de scoring.js
        persoObj.evaluation = calculateCharacterScore(persoObj);

        // On récupère les weights utilisés pour savoir quoi griser
        // On nettoie le nom pour la clé (ex: "Hu Tao" -> "HuTao")
        const configKey = persoObj.nom.replace(/\s+/g, '') || "Default";
        const config = CHARACTER_CONFIG[configKey] || CHARACTER_CONFIG[persoObj.nom] || DEFAULT_CONFIG;
        persoObj.weights = config.weights;

        globalPersoData.push(persoObj);
    });

    renderSidebar();
    if(globalPersoData.length > 0) renderShowcase(0); // Affiche le premier par défaut
}

// --- RENDU DOM ---

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
            <img src="${p.image}" class="char-avatar-small">
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

    const stats = p.combatStats;
    const ev = p.evaluation;

    let html = `
        <div class="showcase-area">
            <div class="splash-art-container" style="background-image: url('${p.splashArt}');">
                 </div>
            
            <div>
                <h1 style="font-size:2rem; font-weight:800; margin-bottom:10px;">${p.nom}</h1>
                
                <div class="stat-row"><span class="text-muted"><i class="fa-solid fa-heart"></i> PV Max</span> <div class="dotted-line"></div> <span class="stat-val">${Math.round(stats.hp)}</span></div>
                <div class="stat-row"><span class="text-muted"><i class="fa-solid fa-gavel"></i> ATQ</span> <div class="dotted-line"></div> <span class="stat-val">${Math.round(stats.atk)}</span></div>
                <div class="stat-row"><span class="text-muted"><i class="fa-solid fa-shield"></i> DÉF</span> <div class="dotted-line"></div> <span class="stat-val">${Math.round(stats.def)}</span></div>
                <div class="stat-row"><span class="text-muted"><i class="fa-solid fa-wand-magic-sparkles"></i> Maîtrise</span> <div class="dotted-line"></div> <span class="stat-val">${Math.round(stats.em)}</span></div>
                <div class="stat-row"><span class="text-muted"><i class="fa-solid fa-chart-simple"></i> Taux CRIT</span> <div class="dotted-line"></div> <span class="stat-val">${stats.cr.toFixed(1)}%</span></div>
                <div class="stat-row"><span class="text-muted"><i class="fa-solid fa-skull"></i> DGT CRIT</span> <div class="dotted-line"></div> <span class="stat-val">${stats.cd.toFixed(1)}%</span></div>
                <div class="stat-row"><span class="text-muted"><i class="fa-solid fa-bolt"></i> ER</span> <div class="dotted-line"></div> <span class="stat-val" style="color:var(--accent-gold)">${stats.er.toFixed(1)}%</span></div>
                <div class="stat-row"><span class="text-muted"><i class="fa-solid fa-flask"></i> Bonus Elem.</span> <div class="dotted-line"></div> <span class="stat-val">${stats.elemBonus.toFixed(1)}%</span></div>

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

    // WEAPON CARD
    if (p.weapon) {
        html += `
            <div class="card weapon-card">
                <img src="${p.weapon.icon}" class="item-img" style="width:70px; height:70px;">
                <div style="flex:1">
                    <div style="font-weight:700; font-size:1.1rem;">${p.weapon.name}</div>
                    <div style="color:var(--accent-gold); font-size:0.85rem;">Niv. ${p.weapon.level} • R${p.weapon.rank}</div>
                    ${p.weapon.mainStat ? `
                        <div style="margin-top:5px; font-weight:bold; color:#ddd;">
                            ${p.weapon.mainStat.label} <span style="color:#fff; float:right;">${p.weapon.mainStat.value}</span>
                        </div>` : ''}
                </div>
            </div>
        `;
    }

    // ARTIFACTS GRID
    p.artefacts.forEach(art => {
        // Rendu Substats
        let subsHtml = "";
        art.subStats.forEach(sub => {
            // Vérifier si c'est une dead stat (weight = 0 ou undefined)
            let w = p.weights[sub.key];
            if (w === undefined && sub.key.includes("dmg_")) w = p.weights["elemental_dmg_"] || 0;
            if (w === undefined) w = 0;

            const isDead = w === 0;

            subsHtml += `
                <div class="substat-row ${isDead ? 'dead' : ''}">
                    <span>${sub.label}</span>
                    <span>
                        ${formatValueDisplay(sub.key, sub.value)}
                    </span>
                </div>
            `;
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
                    <span style="font-size:0.7rem; color:#aaa; font-weight:normal; align-self:center;">${art.mainStat.label}</span>
                </div>
                <div style="margin-top:10px;">
                    ${subsHtml}
                </div>
                <div class="art-score-footer">
                    <span>Score</span>
                    <strong style="color:${art.grade.color}">${art.score} (${art.grade.letter})</strong>
                </div>
            </div>
        `;
    });

    html += `</div>`; // Fin Equipment Area
    container.innerHTML = html;
}

// Initialisation
loadGameData();