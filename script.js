/* =========================================
   SCRIPT PRINCIPAL (Fetch Enka & Traduction)
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

// 2. Dictionnaire de traduction SETS (Français Enka -> Clé Config Projet 1)
// Ajoutez ici les sets manquants si besoin
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
    document.getElementById('output').innerText = "Chargement des données...";
    try {
        const [chars, locs] = await Promise.all([
            fetch('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/characters.json').then(r => r.json()),
            fetch('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/loc.json').then(r => r.json())
        ]);
        charData = chars;
        locData = locs;
        document.getElementById('output').innerText = "Prêt. Entrez un UID.";
    } catch (e) {
        console.error(e);
        document.getElementById('output').innerText = "Erreur chargement JSON.";
    }
}

async function fetchUserData() {
    const uid = document.getElementById('uidInput').value;
    if (!uid) return alert("UID manquant");

    // Proxy pour contourner CORS
    const proxy = `https://corsproxy.io/?${encodeURIComponent(`https://enka.network/api/uid/${uid}`)}`;

    try {
        document.getElementById('output').innerText = "Téléchargement profil...";
        const res = await fetch(proxy);
        if(!res.ok) throw new Error("Erreur Enka");
        const data = await res.json();
        processData(data);
    } catch (e) {
        console.error(e);
        document.getElementById('output').innerText = "Erreur: UID introuvable ou vitrine cachée.";
    }
}

// --- UTILS : FORMATAGE ---

function getText(hash) {
    // Force la récupération en Français pour matcher notre SET_NAME_MAPPING
    if (locData && locData.fr && locData.fr[hash]) return locData.fr[hash];
    return "Inconnu";
}

function formatStat(propId, value) {
    const key = STAT_MAPPING[propId];
    if (!key) return { key: "unknown", value: value, label: propId };

    let val = value;
    let isPercent = false;

    // Détection pourcentage : si la clé finit par _ ou est critique/recharge
    // Attention : Enka renvoie parfois 0.466 (Main) et parfois 5.8 (Sub)
    // On standardise tout en "Valeur affichée" (46.6 et 5.8)

    if (key.endsWith('_') || ['critRate_', 'critDMG_', 'enerRech_', 'heal_'].includes(key)) {
        isPercent = true;
        // Heuristique simple : si c'est < 2 (ex 0.466), c'est probablement un ratio brute -> x100
        // Si c'est > 2 (ex 5.8), c'est déjà bon.
        // Exception : Mainstat EM/HP/ATK flat sont > 2. Mais ici on est dans le bloc "isPercent".
        if (val < 2.0) val = val * 100;
    }

    return {
        key: key,       // Clé pour config.js (ex: critRate_)
        value: val,     // Valeur (ex: 3.9)
        label: key.replace('_', '%').toUpperCase(), // Label joli
        isPercent: isPercent
    };
}

// --- TRAITEMENT PRINCIPAL ---

function processData(data) {
    if (!data.avatarInfoList) return;

    globalPersoData = [];

    data.avatarInfoList.forEach(perso => {
        const id = perso.avatarId;
        const info = charData[id] || {};
        const nom = getText(info.NameTextMapHash) || "Inconnu";
        const icon = `https://enka.network/ui/${info.SideIconName?.replace("Side_Match", "Side")}.png`;

        // Conversion des artéfacts
        const artefacts = [];

        perso.equipList.forEach(item => {
            const flat = item.flat;
            if (flat.itemType === "ITEM_RELIQUARY") {
                const nomSetFR = getText(flat.setNameTextMapHash);

                // --- LE PONT MAGIQUE ---
                // On transforme le nom FR d'Enka en Clé Config du Projet 1
                const setKey = SET_NAME_MAPPING[nomSetFR] || "UnknownSet";

                // Main Stat
                const mainFmt = formatStat(flat.reliquaryMainstat.mainPropId, flat.reliquaryMainstat.statValue);

                // Sub Stats
                const subs = [];
                if (flat.reliquarySubstats) {
                    flat.reliquarySubstats.forEach(s => {
                        subs.push(formatStat(s.appendPropId, s.statValue));
                    });
                }

                artefacts.push({
                    type: flat.equipType, // EQUIP_BRACER, etc.
                    setKey: setKey,       // Clé anglaise pour le scoring
                    setName: nomSetFR,    // Nom affiché
                    icon: `https://enka.network/ui/${flat.icon}.png`,
                    mainStat: mainFmt,
                    subStats: subs,
                    level: item.reliquary.level - 1
                });
            }
        });

        // Construction objet final
        const persoObj = {
            id: id,
            nom: nom,
            image: icon,
            artefacts: artefacts,
            evaluation: null // Sera rempli par scoring.js
        };

        // --- APPEL AU SCORING (Projet 1 Logic) ---
        // C'est ici qu'on utilise la fonction de scoring.js
        persoObj.evaluation = calculateCharacterScore(persoObj);

        globalPersoData.push(persoObj);
    });

    displayResults();
}

// --- AFFICHAGE ---

function displayResults() {
    const container = document.getElementById('resultats');
    container.innerHTML = "";

    globalPersoData.forEach(p => {
        const eval = p.evaluation;

        // Carte Personnage
        const card = document.createElement('div');
        card.style = "background:#2b2b33; color:white; padding:15px; margin-bottom:20px; border-radius:10px;";

        // Header
        card.innerHTML = `
            <div style="display:flex; align-items:center; gap:15px; margin-bottom:15px; border-bottom:1px solid #444; padding-bottom:10px;">
                <img src="${p.image}" style="width:60px; height:60px; border-radius:50%; border:2px solid ${eval.grade.color}">
                <div>
                    <h2 style="margin:0">${p.nom}</h2>
                    <div style="font-weight:bold; color:${eval.grade.color}; font-size:1.2em">
                        Note: ${eval.grade.letter} (${eval.score})
                    </div>
                    <div style="font-size:0.8em; color:#aaa">
                        Set Bonus: ${eval.setBonus.length ? eval.setBonus.join(', ') : "Aucun"} (x${eval.setMultiplier})
                    </div>
                </div>
            </div>
        `;

        // Grille Artéfacts
        const grid = document.createElement('div');
        grid.style = "display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:10px;";

        p.artefacts.forEach(art => {
            let subsHtml = "";
            art.subStats.forEach(s => {
                subsHtml += `<div style="display:flex; justify-content:space-between; font-size:0.85em; color:#ccc;">
                    <span>${s.label}</span>
                    <span>+${Number.isInteger(s.value) ? s.value : s.value.toFixed(1)}${s.isPercent?'%':''}</span>
                </div>`;
            });

            grid.innerHTML += `
                <div style="background:#363640; padding:10px; border-radius:5px; border-top:3px solid ${art.grade.color};">
                    <div style="display:flex; align-items:center; gap:10px; margin-bottom:5px;">
                        <img src="${art.icon}" style="width:35px; height:35px;">
                        <div>
                            <div style="font-weight:bold; color:${art.grade.color}">${art.score}</div>
                            <div style="font-size:0.7em; color:#888;">${art.type.split('_')[1]}</div>
                        </div>
                    </div>
                    <div style="font-weight:bold; font-size:1.1em; margin-bottom:5px;">
                        ${art.mainStat.value}${art.mainStat.isPercent?'%':''} 
                        <span style="font-size:0.6em; color:#aaa">${art.mainStat.label}</span>
                    </div>
                    <div>${subsHtml}</div>
                </div>
            `;
        });

        card.appendChild(grid);
        container.appendChild(card);
    });
}

// Lancement
loadGameData();