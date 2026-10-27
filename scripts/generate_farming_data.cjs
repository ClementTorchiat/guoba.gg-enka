// scripts/generate_farming_data.cjs
const fs = require('fs');
const path = require('path');
const genshindb = require('genshin-db');

const ROOT = path.join(__dirname, '..');
const CHAR_DIR = path.join(ROOT, 'data', 'characters');
const OUT_DOMAINS = path.join(ROOT, 'src', 'data', 'farming_domains.json');
const OUT_CHARS = path.join(ROOT, 'src', 'data', 'character_materials.json');

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

function generateFarmingDomains() {
    console.log('--- Génération de farming_domains.json ---');
    const domainsList = [];

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

    fs.writeFileSync(OUT_DOMAINS, JSON.stringify(domainsList, null, 2), 'utf8');
    console.log(`✅ ${domainsList.length} domaines écrits dans ${OUT_DOMAINS}`);
}

function generateCharacterMaterials() {
    console.log('--- Génération de character_materials.json ---');
    const charFiles = fs.readdirSync(CHAR_DIR).filter(f => f.endsWith('.json'));

    // Charge les données existantes pour ne pas écraser de personnalisations manuelles
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
            console.warn(`⚠️ Personnage non trouvé dans genshin-db: ${charKey} (${queryName})`);
            charactersResult[charKey] = {
                talentBookKey: prev.talentBookKey || null,
                weeklyBoss: prev.weeklyBoss || null,
                worldBoss: prev.worldBoss || null,
                specialty: prev.specialty || null,
                commonMat: prev.commonMat || null
            };
            continue;
        }

        // 1. Talent Book & Weekly Boss
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

        // 2. Ascension Materials (World Boss, Specialty, Common Mat)
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

    fs.writeFileSync(OUT_CHARS, JSON.stringify(charactersResult, null, 2), 'utf8');
    console.log(`✅ ${Object.keys(charactersResult).length} personnages écrits dans ${OUT_CHARS}`);
}

generateFarmingDomains();
generateCharacterMaterials();
