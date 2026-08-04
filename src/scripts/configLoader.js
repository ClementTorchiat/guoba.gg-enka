// src/scripts/configLoader.js

import defaultConfig from '../../data/default_config.json';
import rollTable from '../data/rollTable.json';

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

// Chargement automatique de tous les JSON de configs (personnages, armes, sets)
const charModules = import.meta.glob('../../data/characters/*.json', { eager: true });
const weaponModules = import.meta.glob('../../data/weapons/*.json', { eager: true });
const setModules = import.meta.glob('../../data/sets/*.json', { eager: true });

function formatModules(modules, keyTransformer = (k) => k) {
    const res = {};
    for (const path in modules) {
        const file = path.split('/').pop().replace('.json', '');
        const key = keyTransformer(file);
        res[key] = modules[path].default || modules[path];
    }
    return res;
}

function stripZeroWeights(config) {
    const result = {};
    for (const [charKey, charVal] of Object.entries(config)) {
        result[charKey] = { ...charVal };
        if (charVal.builds) {
            result[charKey].builds = {};
            for (const [buildKey, buildVal] of Object.entries(charVal.builds)) {
                const build = { ...buildVal };
                if (build.weights) {
                    build.weights = Object.fromEntries(
                        Object.entries(build.weights).filter(([, v]) => v !== 0)
                    );
                }
                result[charKey].builds[buildKey] = build;
            }
        }
    }
    return result;
}

const rawCharConfig = formatModules(charModules, name => name.replace(/_/g, ' '));
export const CHARACTER_CONFIG = stripZeroWeights(rawCharConfig);
export const WEAPON_PASSIVES = formatModules(weaponModules);
export const SET_PASSIVES = formatModules(setModules);
export const DEFAULT_CONFIG = defaultConfig;
export const ROLL_TABLE = rollTable;

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
    window.ROLL_TABLE = ROLL_TABLE;

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
