// scripts/generate_farming_data.cjs
const fs = require('fs');
const path = require('path');
const genshindb = require('genshin-db');

const ROOT = path.join(__dirname, '..');
const CHAR_DIR = path.join(ROOT, 'data', 'characters');
const OUT_DOMAINS = path.join(ROOT, 'src', 'data', 'farming_domains.json');
const OUT_CHARS = path.join(ROOT, 'src', 'data', 'character_materials.json');
const OUT_WEAPONS = path.join(ROOT, 'src', 'data', 'weapon_materials.json');
const WEAPON_MAPPING_FILE = path.join(ROOT, 'src', 'data', 'weapon_name_mapping.json');

// Configuration canonique des 8 donjons régionaux de talents (1 seul donjon par région)
const TALENT_DOMAINS_CONFIG = [
    {
        id: 'forsaken_rift',
        name: { fr: "Gorge de l'oubli", en: "Forsaken Rift" },
        region: { fr: "Mondstadt", en: "Mondstadt" },
        category: 'talent',
        rotations: [
            { key: 'freedom', days: [1, 4] },
            { key: 'resistance', days: [2, 5] },
            { key: 'ballad', days: [3, 6] }
        ]
    },
    {
        id: 'taishan_mansion',
        name: { fr: "Manoir Taishan", en: "Taishan Mansion" },
        region: { fr: "Liyue", en: "Liyue" },
        category: 'talent',
        rotations: [
            { key: 'prosperity', days: [1, 4] },
            { key: 'diligence', days: [2, 5] },
            { key: 'gold', days: [3, 6] }
        ]
    },
    {
        id: 'violet_court',
        name: { fr: "Cour violette", en: "Violet Court" },
        region: { fr: "Inazuma", en: "Inazuma" },
        category: 'talent',
        rotations: [
            { key: 'transience', days: [1, 4] },
            { key: 'elegance', days: [2, 5] },
            { key: 'light', days: [3, 6] }
        ]
    },
    {
        id: 'steeple_of_ignorance',
        name: { fr: "Tour de l'ignorance", en: "Steeple of Ignorance" },
        region: { fr: "Sumeru", en: "Sumeru" },
        category: 'talent',
        rotations: [
            { key: 'admonition', days: [1, 4] },
            { key: 'ingenuity', days: [2, 5] },
            { key: 'praxis', days: [3, 6] }
        ]
    },
    {
        id: 'pale_forgotten_glory',
        name: { fr: "Gloire céleste déchue", en: "Pale Forgotten Glory" },
        region: { fr: "Fontaine", en: "Fontaine" },
        category: 'talent',
        rotations: [
            { key: 'equity', days: [1, 4] },
            { key: 'justice', days: [2, 5] },
            { key: 'order', days: [3, 6] }
        ]
    },
    {
        id: 'blazing_ruins',
        name: { fr: "Ruines embrasées", en: "Blazing Ruins" },
        region: { fr: "Natlan", en: "Natlan" },
        category: 'talent',
        rotations: [
            { key: 'contention', days: [1, 4] },
            { key: 'kindling', days: [2, 5] },
            { key: 'conflict', days: [3, 6] }
        ]
    },
    {
        id: 'lightless_capital',
        name: { fr: "Capitale sans-lumière", en: "Lightless Capital" },
        region: { fr: "Nod-Krai", en: "Nod-Krai" },
        category: 'talent',
        rotations: [
            { key: 'moonlight', days: [1, 4] },
            { key: 'elysium', days: [2, 5] },
            { key: 'vagrancy', days: [3, 6] }
        ]
    },
    {
        id: 'relics_fallen_grace',
        name: { fr: "Relique de la grâce déchue", en: "Relics of the Fallen Grace" },
        region: { fr: "Snezhnaya", en: "Snezhnaya" },
        category: 'talent',
        rotations: [
            { key: 'charity', days: [1, 4] },
            { key: 'fortitude', days: [2, 5] },
            { key: 'glory', days: [3, 6] }
        ]
    }
];

// Configuration canonique des 8 donjons régionaux d'armes (1 seul donjon par région)
const WEAPON_DOMAINS_CONFIG = [
    {
        id: 'cecilia_garden',
        name: { fr: "Jardin Cécilia", en: "Cecilia Garden" },
        region: { fr: "Mondstadt", en: "Mondstadt" },
        category: 'weapon',
        rotations: [
            { key: 'decarabian', days: [1, 4], baseId: 114001, name: { fr: "Décarabian", en: "Decarabian" } },
            { key: 'boreal_wolf', days: [2, 5], baseId: 114005, name: { fr: "Loup boréal", en: "Boreal Wolf" } },
            { key: 'dandelion_gladiator', days: [3, 6], baseId: 114009, name: { fr: "Croc de Lion", en: "Dandelion Gladiator" } }
        ]
    },
    {
        id: 'lianshan_formula',
        name: { fr: "Palais de Lianshan", en: "Hidden Palace of Lianshan Formula" },
        region: { fr: "Liyue", en: "Liyue" },
        category: 'weapon',
        rotations: [
            { key: 'guyun', days: [1, 4], baseId: 114013, name: { fr: "Guyun", en: "Guyun" } },
            { key: 'mist_veiled', days: [2, 5], baseId: 114017, name: { fr: "Plomb karstique", en: "Mist Veiled" } },
            { key: 'aerosiderite', days: [3, 6], baseId: 114021, name: { fr: "Aérosidérite", en: "Aerosiderite" } }
        ]
    },
    {
        id: 'court_of_flowing_sand',
        name: { fr: "Cour des sables", en: "Court of Flowing Sand" },
        region: { fr: "Inazuma", en: "Inazuma" },
        category: 'weapon',
        rotations: [
            { key: 'distant_sea', days: [1, 4], baseId: 114025, name: { fr: "Branche marine", en: "Distant Sea" } },
            { key: 'narukami', days: [2, 5], baseId: 114029, name: { fr: "Narukami", en: "Narukami" } },
            { key: 'mask', days: [3, 6], baseId: 114033, name: { fr: "Masque", en: "Mask" } }
        ]
    },
    {
        id: 'tower_of_abject_pride',
        name: { fr: "Tour de la fierté", en: "Tower of Abject Pride" },
        region: { fr: "Sumeru", en: "Sumeru" },
        category: 'weapon',
        rotations: [
            { key: 'forest_dew', days: [1, 4], baseId: 114037, name: { fr: "Rosée", en: "Forest Dew" } },
            { key: 'oasis_garden', days: [2, 5], baseId: 114041, name: { fr: "Jardin d'oasis", en: "Oasis Garden" } },
            { key: 'scorching_might', days: [3, 6], baseId: 114045, name: { fr: "Pouvoir brûlant", en: "Scorching Might" } }
        ]
    },
    {
        id: 'echoes_of_the_deep_tides',
        name: { fr: "Échos des marées profondes", en: "Echoes of the Deep Tides" },
        region: { fr: "Fontaine", en: "Fontaine" },
        category: 'weapon',
        rotations: [
            { key: 'ancient_chord', days: [1, 4], baseId: 114049, name: { fr: "Accord ancien", en: "Ancient Chord" } },
            { key: 'dewdrop', days: [2, 5], baseId: 114053, name: { fr: "Goutte de rosée", en: "Dewdrop" } },
            { key: 'pristine_sea', days: [3, 6], baseId: 114057, name: { fr: "Mer immaculée", en: "Pristine Sea" } }
        ]
    },
    {
        id: 'ancient_lookout',
        name: { fr: "Vigie sacrée ancienne", en: "Ancient Lookout" },
        region: { fr: "Natlan", en: "Natlan" },
        category: 'weapon',
        rotations: [
            { key: 'blazing_heart', days: [1, 4], baseId: 114061, name: { fr: "Cœur flamboyant", en: "Blazing Heart" } },
            { key: 'delirious_decadence', days: [2, 5], baseId: 114065, name: { fr: "Décadence délirante", en: "Delirious Decadence" } },
            { key: 'night_wind', days: [3, 6], baseId: 114069, name: { fr: "Vent nocturne", en: "Night-Wind" } }
        ]
    },
    {
        id: 'misty_hollow',
        name: { fr: "Cité sous les brumes", en: "Misty Hollow" },
        region: { fr: "Nod-Krai", en: "Nod-Krai" },
        category: 'weapon',
        rotations: [
            { key: 'artful_device', days: [1, 4], baseId: 114073, name: { fr: "Appareil artistique", en: "Artful Device" } },
            { key: 'long_night', days: [2, 5], baseId: 114077, name: { fr: "Silex de longue nuit", en: "Long Night Flint" } },
            { key: 'scions_glory', days: [3, 6], baseId: 114081, name: { fr: "Gloire du grand nord", en: "Scions' Glory" } }
        ]
    },
    {
        id: 'zapolyarny_bastion',
        name: { fr: "Bastion de Zapolyarny", en: "Zapolyarny Bastion" },
        region: { fr: "Snezhnaya", en: "Snezhnaya" },
        category: 'weapon',
        rotations: [
            { key: 'pale_star', days: [1, 4], baseId: 114085, name: { fr: "Armée pâle", en: "Pale Star" } },
            { key: 'spiritual_nectar', days: [2, 5], baseId: 114089, name: { fr: "Nectar spirituel", en: "Spiritual Nectar" } },
            { key: 'frost_emperor', days: [3, 6], baseId: 114093, name: { fr: "Empereur glacial", en: "Frost Emperor" } }
        ]
    }
];

// Table de correspondance ID Matériau d'arme (Vert 2★) -> clé de rotation
const WEAPON_BASE_ID_TO_KEY = {};
WEAPON_DOMAINS_CONFIG.forEach(d => {
    d.rotations.forEach(r => {
        WEAPON_BASE_ID_TO_KEY[r.baseId] = r.key;
    });
});

// Liste de tous les 24 livres des 8 régions
const ALL_BOOK_KEYS = [
    'freedom', 'resistance', 'ballad',
    'prosperity', 'diligence', 'gold',
    'transience', 'elegance', 'light',
    'admonition', 'ingenuity', 'praxis',
    'equity', 'justice', 'order',
    'contention', 'kindling', 'conflict',
    'moonlight', 'elysium', 'vagrancy',
    'charity', 'fortitude', 'glory'
];

// Aliases pour trouver les persos dans genshin-db
const CHAR_NAME_MAP = {
    'Shogun_Raiden': 'Raiden Shogun',
    'Hu_Tao': 'Hu Tao',
    'Kaedehara_Kazuha': 'Kazuha',
    'Arataki_Itto': 'Itto',
    'Kujou_Sara': 'Sara',
    'Kuki_Shinobu': 'Shinobu',
    'Sangonomiya_Kokomi': 'Kokomi',
    'Shikanoin_Heizou': 'Heizou',
    'Yumemizuki_Mizuki': 'Mizuki',
    'Nomade': 'Wanderer',
    'Fréminet': 'Freminet',
    'Émilie': 'Emilie',
    'Noëlle': 'Noelle',
    'Rosalia': 'Rosaria',
    'Thomas': 'Thoma',
    'Manekin': 'Aether',
    'Traveler_Anemo': 'Traveler (Anemo)',
    'Traveler_Geo': 'Traveler (Geo)',
    'Traveler_Electro': 'Traveler (Electro)',
    'Traveler_Dendro': 'Traveler (Dendro)',
    'Traveler_Hydro': 'Traveler (Hydro)',
    'Traveler_Pyro': 'Traveler (Pyro)',
    'Traveler_Cryo': 'Traveler (Cryo)'
};

function getBookKeyFromEnglishName(name) {
    if (!name) return null;
    const lower = name.toLowerCase();
    for (const key of ALL_BOOK_KEYS) {
        if (lower.includes(key)) return key;
    }
    return null;
}

// Construction de l'index complet des matériaux par ID (EN et FR)
let idMapEn = null;
let idMapFr = null;

function buildMaterialIndex() {
    if (idMapEn && idMapFr) return { idMapEn, idMapFr };
    console.log('--- Indexation des matériaux genshin-db ---');
    idMapEn = {};
    idMapFr = {};
    const allMats = genshindb.materials('names', { matchCategories: true });
    for (const n of allMats) {
        const m = genshindb.materials(n);
        if (m && m.id) {
            idMapEn[m.id] = m;
            const mFr = genshindb.materials(n, { resultLanguage: 'French' });
            if (mFr) idMapFr[m.id] = mFr;
        }
    }
    return { idMapEn, idMapFr };
}

function generateFarmingDomains() {
    console.log('--- Génération de farming_domains.json ---');
    const { idMapEn, idMapFr } = buildMaterialIndex();
    const domainsList = [];

    // 1. Donjons de Talents (8)
    for (const d of TALENT_DOMAINS_CONFIG) {
        const domainEntry = {
            id: d.id,
            name: d.name,
            region: d.region,
            category: d.category,
            rotations: []
        };

        for (const rot of d.rotations) {
            const itemKey = rot.key;
            const cap = itemKey.charAt(0).toUpperCase() + itemKey.slice(1);
            const pEn = `Philosophies of ${cap}`;
            const gEn = `Guide to ${cap}`;
            const tEn = `Teachings of ${cap}`;

            const matP = genshindb.materials(pEn);
            const matPFr = genshindb.materials(pEn, { resultLanguage: 'French' });
            const matG = genshindb.materials(gEn);
            const matGFr = genshindb.materials(gEn, { resultLanguage: 'French' });
            const matT = genshindb.materials(tEn);
            const matTFr = genshindb.materials(tEn, { resultLanguage: 'French' });

            const cleanFrName = matPFr?.name
                ? matPFr.name.replace(/^Philosophie (de (la |l'|l’)?|du |des )?/i, '').trim()
                : cap;

            domainEntry.rotations.push({
                days: rot.days,
                itemKey,
                name: {
                    fr: cleanFrName.charAt(0).toUpperCase() + cleanFrName.slice(1),
                    en: cap
                },
                items: {
                    teachings: {
                        id: matT?.id,
                        name: { fr: matTFr?.name || tEn, en: tEn },
                        icon: matT?.images?.filename_icon || `UI_ItemIcon_${matT?.id}`
                    },
                    guide: {
                        id: matG?.id,
                        name: { fr: matGFr?.name || gEn, en: gEn },
                        icon: matG?.images?.filename_icon || `UI_ItemIcon_${matG?.id}`
                    },
                    philosophy: {
                        id: matP?.id,
                        name: { fr: matPFr?.name || pEn, en: pEn },
                        icon: matP?.images?.filename_icon || `UI_ItemIcon_${matP?.id}`
                    }
                }
            });
        }

        domainsList.push(domainEntry);
    }

    // 2. Donjons d'Armes (8)
    for (const d of WEAPON_DOMAINS_CONFIG) {
        const domainEntry = {
            id: d.id,
            name: d.name,
            region: d.region,
            category: d.category,
            rotations: []
        };

        for (const rot of d.rotations) {
            const bId = rot.baseId;
            const mGreen = idMapEn[bId];
            const mGreenFr = idMapFr[bId];
            const mBlue = idMapEn[bId + 1];
            const mBlueFr = idMapFr[bId + 1];
            const mPurple = idMapEn[bId + 2];
            const mPurpleFr = idMapFr[bId + 2];
            const mGold = idMapEn[bId + 3];
            const mGoldFr = idMapFr[bId + 3];

            domainEntry.rotations.push({
                days: rot.days,
                itemKey: rot.key,
                name: rot.name,
                items: {
                    green: {
                        id: bId,
                        name: { fr: mGreenFr?.name || mGreen?.name || '', en: mGreen?.name || '' },
                        icon: `UI_ItemIcon_${bId}`
                    },
                    blue: {
                        id: bId + 1,
                        name: { fr: mBlueFr?.name || mBlue?.name || '', en: mBlue?.name || '' },
                        icon: `UI_ItemIcon_${bId + 1}`
                    },
                    purple: {
                        id: bId + 2,
                        name: { fr: mPurpleFr?.name || mPurple?.name || '', en: mPurple?.name || '' },
                        icon: `UI_ItemIcon_${bId + 2}`
                    },
                    gold: {
                        id: bId + 3,
                        name: { fr: mGoldFr?.name || mGold?.name || '', en: mGold?.name || '' },
                        icon: `UI_ItemIcon_${bId + 3}`
                    }
                }
            });
        }

        domainsList.push(domainEntry);
    }

    fs.writeFileSync(OUT_DOMAINS, JSON.stringify(domainsList, null, 2), 'utf8');
    console.log(`✅ ${domainsList.length} domaines (talents + armes) écrits dans ${OUT_DOMAINS}`);
}

function generateCharacterMaterials() {
    console.log('--- Génération de character_materials.json ---');
    const charFiles = fs.readdirSync(CHAR_DIR).filter(f => f.endsWith('.json'));

    let existingData = {};
    if (fs.existsSync(OUT_CHARS)) {
        try {
            existingData = JSON.parse(fs.readFileSync(OUT_CHARS, 'utf8'));
        } catch (e) {
            existingData = {};
        }
    }

    const charactersResult = {};

    for (const file of charFiles) {
        const charKey = file.replace('.json', '');
        const queryName = CHAR_NAME_MAP[charKey] || charKey.replace(/_/g, ' ');

        const t = genshindb.talents(queryName);
        const c = genshindb.characters(queryName);
        const prev = existingData[charKey] || {};

        if (!t && !c) {
            charactersResult[charKey] = {
                talentBookKey: prev.talentBookKey || null,
                weeklyBoss: prev.weeklyBoss || null,
                worldBoss: prev.worldBoss || null,
                specialty: prev.specialty || null,
                commonMat: prev.commonMat || null
            };
            continue;
        }

        let talentBookKey = prev.talentBookKey || null;
        let weeklyBoss = prev.weeklyBoss || null;

        if (t && t.costs) {
            const pName = t.costs.lvl7?.[1]?.name;
            const detectedKey = getBookKeyFromEnglishName(pName);
            if (detectedKey) talentBookKey = detectedKey;

            const wbItem = t.costs.lvl7?.[3] || t.costs.lvl8?.[3];
            if (wbItem) {
                const cleanWbName = wbItem.name.replace(/\"/g, '');
                const mEn = genshindb.materials(cleanWbName);
                const mFr = genshindb.materials(cleanWbName, { resultLanguage: 'French' });
                weeklyBoss = {
                    id: wbItem.id,
                    name: { fr: mFr?.name || wbItem.name, en: wbItem.name },
                    icon: mEn?.images?.filename_icon || `UI_ItemIcon_${wbItem.id}`
                };
            }
        }

        let worldBoss = prev.worldBoss || null;
        let specialty = prev.specialty || null;
        let commonMat = prev.commonMat || null;

        if (c && c.costs && c.costs.ascend2) {
            const rawWb = c.costs.ascend2[2];
            const rawSpec = c.costs.ascend2[3];
            const rawMob = c.costs.ascend2[4];

            if (rawWb) {
                const cleanName = rawWb.name.replace(/\"/g, '');
                const mEn = genshindb.materials(cleanName) || genshindb.materials(rawWb.name);
                const mFr = genshindb.materials(cleanName, { resultLanguage: 'French' }) || genshindb.materials(rawWb.name, { resultLanguage: 'French' });
                worldBoss = {
                    id: rawWb.id,
                    name: { fr: mFr?.name || rawWb.name, en: rawWb.name },
                    icon: mEn?.images?.filename_icon || `UI_ItemIcon_${rawWb.id}`
                };
            }

            if (rawSpec) {
                const cleanName = rawSpec.name.replace(/\"/g, '');
                const mEn = genshindb.materials(cleanName) || genshindb.materials(rawSpec.name);
                const mFr = genshindb.materials(cleanName, { resultLanguage: 'French' }) || genshindb.materials(rawSpec.name, { resultLanguage: 'French' });
                specialty = {
                    id: rawSpec.id,
                    name: { fr: mFr?.name || rawSpec.name, en: rawSpec.name },
                    icon: mEn?.images?.filename_icon || `UI_ItemIcon_${rawSpec.id}`
                };
            }

            if (rawMob) {
                const cleanName = rawMob.name.replace(/\"/g, '');
                const mEn = genshindb.materials(cleanName) || genshindb.materials(rawMob.name);
                const mFr = genshindb.materials(cleanName, { resultLanguage: 'French' }) || genshindb.materials(rawMob.name, { resultLanguage: 'French' });
                commonMat = {
                    id: rawMob.id,
                    name: { fr: mFr?.name || rawMob.name, en: rawMob.name },
                    icon: mEn?.images?.filename_icon || `UI_ItemIcon_${rawMob.id}`
                };
            }
        }

        charactersResult[charKey] = {
            talentBookKey,
            weeklyBoss,
            worldBoss,
            specialty,
            commonMat
        };
    }

    // Préserver également les éventuelles entrées personnalisées manuelles dans OUT_CHARS qui n'ont pas de fichier data/characters/
    for (const [k, v] of Object.entries(existingData)) {
        if (!charactersResult[k]) {
            charactersResult[k] = v;
        }
    }

    fs.writeFileSync(OUT_CHARS, JSON.stringify(charactersResult, null, 2), 'utf8');
    console.log(`✅ ${Object.keys(charactersResult).length} personnages écrits dans ${OUT_CHARS}`);
}

function generateWeaponMaterials() {
    console.log('--- Génération de weapon_materials.json ---');
    const { idMapEn, idMapFr } = buildMaterialIndex();

    let weaponMapping = {};
    if (fs.existsSync(WEAPON_MAPPING_FILE)) {
        try {
            weaponMapping = JSON.parse(fs.readFileSync(WEAPON_MAPPING_FILE, 'utf8'));
        } catch (e) {
            weaponMapping = {};
        }
    }

    let existingData = {};
    if (fs.existsSync(OUT_WEAPONS)) {
        try {
            existingData = JSON.parse(fs.readFileSync(OUT_WEAPONS, 'utf8'));
        } catch (e) {
            existingData = {};
        }
    }

    const weaponsList = genshindb.weapons('names', { matchCategories: true });
    const weaponsResult = {};

    for (const wName of weaponsList) {
        const w = genshindb.weapons(wName);
        if (!w || !w.costs || !w.costs.ascend1 || !w.costs.ascend1[1]) continue;

        const wFr = genshindb.weapons(wName, { resultLanguage: 'French' });
        const pascalKey = (wFr && weaponMapping[wFr.name]) ? weaponMapping[wFr.name] : wName.replace(/[^a-zA-Z0-9]/g, '');

        const prev = existingData[pascalKey] || {};

        const baseMatId = w.costs.ascend1[1].id;
        const detectedKey = WEAPON_BASE_ID_TO_KEY[baseMatId];
        const materialKey = detectedKey || prev.materialKey || null;

        const eliteRaw = w.costs.ascend1[2];
        const commonRaw = w.costs.ascend1[3];

        let eliteMat = prev.eliteMat || null;
        if (eliteRaw) {
            eliteMat = {
                id: eliteRaw.id,
                name: {
                    fr: idMapFr[eliteRaw.id]?.name || eliteRaw.name,
                    en: eliteRaw.name
                },
                icon: `UI_ItemIcon_${eliteRaw.id}`
            };
        }

        let commonMat = prev.commonMat || null;
        if (commonRaw) {
            commonMat = {
                id: commonRaw.id,
                name: {
                    fr: idMapFr[commonRaw.id]?.name || commonRaw.name,
                    en: commonRaw.name
                },
                icon: `UI_ItemIcon_${commonRaw.id}`
            };
        }

        weaponsResult[pascalKey] = {
            rarity: w.rarity || prev.rarity || 4,
            materialKey,
            eliteMat,
            commonMat
        };
    }

    // Préserver les armes manuelles ou futures créées par l'utilisateur
    for (const [k, v] of Object.entries(existingData)) {
        if (!weaponsResult[k]) {
            weaponsResult[k] = v;
        }
    }

    fs.writeFileSync(OUT_WEAPONS, JSON.stringify(weaponsResult, null, 2), 'utf8');
    console.log(`✅ ${Object.keys(weaponsResult).length} armes écrites dans ${OUT_WEAPONS}`);
}

generateFarmingDomains();
generateCharacterMaterials();
generateWeaponMaterials();
