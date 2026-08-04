// src/scripts/configLoader.js

import defaultConfig from '../../data/default_config.json';
import { loadRollTable, getLoadedRollTable } from './rollTableLoader.js';

// Import des 15 dictionnaires extraits dans src/data/
import ICON_MAP from '../data/icon_map.json';
import STAT_MAPPING from '../data/stat_mapping.json';
import rawStatLabels from '../data/stat_labels.json';
import KEY_TO_FIGHT_PROP from '../data/key_to_fight_prop.json';
import ELEMENT_DATA from '../data/element_data.json';
import SUBSTAT_RANGES from '../data/substat_ranges.json';
import MAINSTAT_DROP_RATES from '../data/mainstat_drop_rates.json';
import rawResonanceData from '../data/resonance_data.json';
import ELEMENT_COLORS from '../data/element_colors.json';
import WEAPON_NAME_MAPPING from '../data/weapon_name_mapping.json';
import SET_NAME_MAPPING from '../data/set_name_mapping.json';
import rawArtifactTypeMapping from '../data/artifact_type_mapping.json';
import SLOT_POSSIBLE_MAIN_STATS from '../data/slot_possible_main_stats.json';
import THEME_COLORS from '../data/theme_colors.json';
import CONFIG_NAME_ALIASES_EN_TO_FR from '../data/config_name_aliases_en_to_fr.json';

export const DEFAULT_CONFIG = defaultConfig;
export { loadRollTable };
export function getRollTable() { return getLoadedRollTable(); }

// Chargeurs dynamiques (micro-chunks générés par Vite à la demande)
const charLoaders = import.meta.glob('../../data/characters/*.json');
const weaponLoaders = import.meta.glob('../../data/weapons/*.json');
const setLoaders = import.meta.glob('../../data/sets/*.json');

// Caches en mémoire vive
export const CHARACTER_CONFIG = {};
export const WEAPON_PASSIVES = {};
export const SET_PASSIVES = {};

// Normalisation des clés pour retrouver un personnage/arme sous n'importe quelle forme
function normalizeKey(str) {
    if (!str) return '';
    return String(str)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9]/g, '')
        .toLowerCase();
}

// Indexation des chargeurs de personnages
const charLoaderMap = {};
for (const path in charLoaders) {
    const fileName = path.split('/').pop().replace('.json', '');
    const cleanNoUnderscore = fileName.replace(/_/g, ' ');
    const norm = normalizeKey(fileName);

    charLoaderMap[fileName] = charLoaders[path];
    charLoaderMap[cleanNoUnderscore] = charLoaders[path];
    charLoaderMap[norm] = charLoaders[path];
    charLoaderMap[fileName.toLowerCase()] = charLoaders[path];
}

// Indexation des alias FR vers les chargeurs
for (const [enName, frName] of Object.entries(CONFIG_NAME_ALIASES_EN_TO_FR)) {
    const loader = charLoaderMap[enName] || charLoaderMap[normalizeKey(enName)];
    if (loader) {
        charLoaderMap[frName] = loader;
        charLoaderMap[normalizeKey(frName)] = loader;
    }
}

// Indexation des armes
const weaponLoaderMap = {};
for (const path in weaponLoaders) {
    const fileName = path.split('/').pop().replace('.json', '');
    weaponLoaderMap[fileName] = weaponLoaders[path];
    weaponLoaderMap[normalizeKey(fileName)] = weaponLoaders[path];
    weaponLoaderMap[fileName.toLowerCase()] = weaponLoaders[path];
}

// Indexation des sets
const setLoaderMap = {};
for (const path in setLoaders) {
    const fileName = path.split('/').pop().replace('.json', '');
    setLoaderMap[fileName] = setLoaders[path];
    setLoaderMap[normalizeKey(fileName)] = setLoaders[path];
    setLoaderMap[fileName.toLowerCase()] = setLoaders[path];
}

function cleanSingleCharConfig(charVal) {
    if (!charVal) return charVal;
    const result = { ...charVal };
    if (charVal.builds) {
        result.builds = {};
        for (const [buildKey, buildVal] of Object.entries(charVal.builds)) {
            const build = { ...buildVal };
            if (build.weights) {
                build.weights = Object.fromEntries(
                    Object.entries(build.weights).filter(([, v]) => v !== 0)
                );
            }
            result.builds[buildKey] = build;
        }
    }
    return result;
}

export async function loadCharacterConfig(name) {
    if (!name) return DEFAULT_CONFIG;
    const safeNom = String(name).trim();
    const alias = CONFIG_NAME_ALIASES_EN_TO_FR[safeNom] || safeNom;
    const cleanKey = alias.replace(/\s+/g, '');
    const norm = normalizeKey(safeNom);
    const normAlias = normalizeKey(alias);

    if (CHARACTER_CONFIG[cleanKey]) return CHARACTER_CONFIG[cleanKey];
    if (CHARACTER_CONFIG[alias]) return CHARACTER_CONFIG[alias];
    if (CHARACTER_CONFIG[safeNom]) return CHARACTER_CONFIG[safeNom];
    if (CHARACTER_CONFIG[norm]) return CHARACTER_CONFIG[norm];

    const loader = charLoaderMap[cleanKey] || charLoaderMap[alias] || charLoaderMap[safeNom] || charLoaderMap[norm] || charLoaderMap[normAlias];
    if (loader) {
        try {
            const mod = await loader();
            const raw = mod.default || mod;
            const processed = cleanSingleCharConfig(raw);
            CHARACTER_CONFIG[cleanKey] = processed;
            CHARACTER_CONFIG[alias] = processed;
            CHARACTER_CONFIG[safeNom] = processed;
            CHARACTER_CONFIG[norm] = processed;
            CHARACTER_CONFIG[normAlias] = processed;
            return processed;
        } catch (err) {
            console.warn(`[configLoader] Impossible de charger la config du personnage: ${name}`, err);
        }
    }
    return DEFAULT_CONFIG;
}

export async function loadWeaponConfig(key) {
    if (!key) return null;
    const cleanKey = String(key).trim();
    const norm = normalizeKey(cleanKey);

    if (WEAPON_PASSIVES[cleanKey]) return WEAPON_PASSIVES[cleanKey];
    if (WEAPON_PASSIVES[norm]) return WEAPON_PASSIVES[norm];

    const loader = weaponLoaderMap[cleanKey] || weaponLoaderMap[norm] || weaponLoaderMap[cleanKey.toLowerCase()];
    if (loader) {
        try {
            const mod = await loader();
            const raw = mod.default || mod;
            WEAPON_PASSIVES[cleanKey] = raw;
            WEAPON_PASSIVES[norm] = raw;
            return raw;
        } catch (err) {
            console.warn(`[configLoader] Impossible de charger la config de l'arme: ${key}`, err);
        }
    }
    return null;
}

export async function loadSetConfig(key) {
    if (!key) return null;
    const cleanKey = String(key).trim();
    const norm = normalizeKey(cleanKey);

    if (SET_PASSIVES[cleanKey]) return SET_PASSIVES[cleanKey];
    if (SET_PASSIVES[norm]) return SET_PASSIVES[norm];

    const loader = setLoaderMap[cleanKey] || setLoaderMap[norm] || setLoaderMap[cleanKey.toLowerCase()];
    if (loader) {
        try {
            const mod = await loader();
            const raw = mod.default || mod;
            SET_PASSIVES[cleanKey] = raw;
            SET_PASSIVES[norm] = raw;
            return raw;
        } catch (err) {
            console.warn(`[configLoader] Impossible de charger la config du set: ${key}`, err);
        }
    }
    return null;
}

// Préchargement intelligent et ultra-rapide des 8-12 fiches du joueur dès réception d'Enka
export async function preloadConfigsForShowcase(data, charData, locData, HASH_TO_KEY) {
    if (!data || !data.avatarInfoList) return;
    const promises = [];

    // Préchargement de la table de rolls
    promises.push(loadRollTable());

    // Préchargement immédiat de tous les sets passifs (21 fichiers légers)
    for (const path in setLoaders) {
        promises.push(setLoaders[path]().then(mod => {
            const fileName = path.split('/').pop().replace('.json', '');
            const raw = mod.default || mod;
            SET_PASSIVES[fileName] = raw;
            SET_PASSIVES[normalizeKey(fileName)] = raw;
        }).catch(() => {}));
    }

    for (const perso of data.avatarInfoList) {
        // Nom du personnage
        let infoKey = String(perso.avatarId);
        if ((perso.avatarId === 10000005 || perso.avatarId === 10000007) && perso.skillDepotId) {
            const compoundKey = `${perso.avatarId}-${perso.skillDepotId}`;
            if (charData && charData[compoundKey]) infoKey = compoundKey;
        }
        const info = (charData && charData[infoKey]) || {};
        const nameHash = info.NameTextMapHash || info.nameTextMapHash;

        if (nameHash && locData) {
            const nomFr = locData['fr'] ? locData['fr'][nameHash] : null;
            const nomEn = locData['en'] ? locData['en'][nameHash] : null;
            if (nomFr) promises.push(loadCharacterConfig(nomFr));
            if (nomEn && nomEn !== nomFr) promises.push(loadCharacterConfig(nomEn));
        }

        // Arme et Artéfacts équipés
        if (perso.equipList) {
            for (const item of perso.equipList) {
                if (item.weapon) {
                    const wInfo = item.flat || {};
                    const wNameHash = wInfo.nameTextMapHash;
                    const wKey = HASH_TO_KEY ? HASH_TO_KEY[wNameHash] : null;
                    if (wKey) {
                        promises.push(loadWeaponConfig(wKey));
                    }
                }
                if (item.reliquary) {
                    const rInfo = item.flat || {};
                    const rSetNameHash = rInfo.setNameTextMapHash;
                    const sKey = HASH_TO_KEY ? HASH_TO_KEY[rSetNameHash] : null;
                    if (sKey) {
                        promises.push(loadSetConfig(sKey));
                    }
                }
            }
        }
    }

    await Promise.all(promises);
}

import { t } from './i18n.js';

// Proxy pour la résolution dynamique des traductions (i18n) depuis les clés JSON
export const STAT_LABELS = new Proxy(rawStatLabels, {
    get(target, prop) {
        if (typeof prop === 'string' && target[prop]) {
            const trFunc = (typeof window !== 'undefined' && window.t) ? window.t : t;
            return trFunc(target[prop]);
        }
        return target[prop];
    }
});

export const ARTIFACT_TYPE_MAPPING = new Proxy(rawArtifactTypeMapping, {
    get(target, prop) {
        if (typeof prop === 'string' && target[prop]) {
            const trFunc = (typeof window !== 'undefined' && window.t) ? window.t : t;
            return trFunc(target[prop]);
        }
        return target[prop];
    }
});

export const RESONANCE_DATA = {};
for (const [elem, data] of Object.entries(rawResonanceData)) {
    RESONANCE_DATA[elem] = {
        ...data,
        get name() {
            const trFunc = (typeof window !== 'undefined' && window.t) ? window.t : t;
            return trFunc(data.name);
        }
    };
}

// Rendre accessible globalement pour les scripts clients existants
if (typeof window !== 'undefined') {
    window.DEFAULT_CONFIG = DEFAULT_CONFIG;
    window.CHARACTER_CONFIG = CHARACTER_CONFIG;
    window.WEAPON_PASSIVES = WEAPON_PASSIVES;
    window.SET_PASSIVES = SET_PASSIVES;

    window.loadRollTable = loadRollTable;
    window.loadCharacterConfig = loadCharacterConfig;
    window.loadWeaponConfig = loadWeaponConfig;
    window.loadSetConfig = loadSetConfig;
    window.preloadConfigsForShowcase = preloadConfigsForShowcase;

    window.ICON_MAP = ICON_MAP;
    window.STAT_MAPPING = STAT_MAPPING;
    window.STAT_LABELS = STAT_LABELS;
    window.KEY_TO_FIGHT_PROP = KEY_TO_FIGHT_PROP;
    window.ELEMENT_DATA = ELEMENT_DATA;
    window.SUBSTAT_RANGES = SUBSTAT_RANGES;
    window.MAINSTAT_DROP_RATES = MAINSTAT_DROP_RATES;
    window.RESONANCE_DATA = RESONANCE_DATA;
    window.ELEMENT_COLORS = ELEMENT_COLORS;
    window.WEAPON_NAME_MAPPING = WEAPON_NAME_MAPPING;
    window.SET_NAME_MAPPING = SET_NAME_MAPPING;
    window.ARTIFACT_TYPE_MAPPING = ARTIFACT_TYPE_MAPPING;
    window.SLOT_POSSIBLE_MAIN_STATS = SLOT_POSSIBLE_MAIN_STATS;
    window.THEME_COLORS = THEME_COLORS;
    window.CONFIG_NAME_ALIASES_EN_TO_FR = CONFIG_NAME_ALIASES_EN_TO_FR;
}

export {
    ICON_MAP,
    STAT_MAPPING,
    KEY_TO_FIGHT_PROP,
    ELEMENT_DATA,
    SUBSTAT_RANGES,
    MAINSTAT_DROP_RATES,
    ELEMENT_COLORS,
    WEAPON_NAME_MAPPING,
    SET_NAME_MAPPING,
    SLOT_POSSIBLE_MAIN_STATS,
    THEME_COLORS,
    CONFIG_NAME_ALIASES_EN_TO_FR
};
