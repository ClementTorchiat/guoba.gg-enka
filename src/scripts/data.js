import { t } from './i18n.js';
import STAT_MAPPING_JSON from '../data/stat_mapping.json';
import STAT_LABELS_JSON from '../data/stat_labels.json';
import ICON_MAP_JSON from '../data/icon_map.json';

export const BASE_ROLLS = {
    "critRate_": [2.72, 3.11, 3.50, 3.89],
    "critDMG_": [5.44, 6.22, 6.99, 7.77],
    "atk_": [4.08, 4.66, 5.25, 5.83],
    "hp_": [4.08, 4.66, 5.25, 5.83],
    "def_": [5.10, 5.83, 6.56, 7.29],
    "enerRech_": [4.53, 5.18, 5.83, 6.48],
    "eleMas": [16.32, 18.65, 20.98, 23.31],
    "atk": [13.62, 15.56, 17.51, 19.45],
    "hp": [209.13, 239.00, 268.88, 298.75],
    "def": [16.20, 18.52, 20.83, 23.15]
};

export const MAX_ROLLS = {
    "critRate_": 3.89,
    "critDMG_": 7.77,
    "atk_": 5.83,
    "atk": 19.45,
    "hp_": 5.83,
    "hp": 298.75,
    "def_": 7.29,
    "def": 23.15,
    "eleMas": 23.31,
    "enerRech_": 6.48,
};

export const BASE_ROLLS_4 = {
    "critRate_": [2.18, 2.49, 2.80, 3.11],
    "critDMG_": [4.35, 4.97, 5.60, 6.22],
    "atk_": [3.26, 3.73, 4.20, 4.66],
    "hp_": [3.26, 3.73, 4.20, 4.66],
    "def_": [4.08, 4.66, 5.25, 5.83],
    "enerRech_": [3.63, 4.14, 4.66, 5.18],
    "eleMas": [13.06, 14.92, 16.79, 18.65],
    "atk": [10.89, 12.45, 14.00, 15.56],
    "hp": [167.30, 191.20, 215.10, 239.00],
    "def": [12.96, 14.82, 16.67, 18.52]
};

export const MAX_ROLLS_4 = {
    "critRate_": 3.11,
    "critDMG_": 6.22,
    "atk_": 4.66,
    "hp_": 4.66,
    "def_": 5.83,
    "enerRech_": 5.18,
    "eleMas": 18.65,
    "atk": 15.56,
    "hp": 239.00,
    "def": 18.52
};

export function createIcon(key) {
    const ICON_BASE_PATH = "./assets/simulator/icons/";
    const iconFile = ICON_MAP_JSON[key] || "icon_unknown.webp";
    return `<img src="${ICON_BASE_PATH}${iconFile}" style="width: 19px; height: 19px; object-fit: contain; vertical-align: middle; margin-right: 5px; display: inline-block; margin-bottom: 2px;" alt="${key}" decoding="async">`;
}

export function formatValueDisplay(key, val) {
    if (['hp', 'atk', 'def', 'eleMas'].includes(key)) return Math.round(val).toLocaleString();
    return (typeof val === 'number' ? val.toFixed(1) : val) + '%';
}

export function getStatLabel(key) {
    if (!key) return '';
    if (key.startsWith('stat.')) return t(key);
    return t('stat.' + key);
}

export function getArtifactTypeName(type) {
    if (!type) return '';
    if (type.startsWith('artifact.')) return t(type);
    return t('artifact.' + type);
}

export function formatStat(propId, value) {
    const mapping = (typeof window !== 'undefined' && window.STAT_MAPPING) ? window.STAT_MAPPING : STAT_MAPPING_JSON;

    let key = mapping[propId];
    if (!key && (STAT_LABELS_JSON[propId] || propId === 'dmgBonus')) key = propId;
    if (!key) return { key: "unknown", value: value, label: propId, icon: createIcon("unknown") };

    let val = value;
    let isPercent = false;
    if (key.endsWith('_') || ['critRate_', 'critDMG_', 'enerRech_', 'heal_'].includes(key)) {
        isPercent = true;
        if (val < 1.0) val = val * 100;
    }

    const iconHtml = createIcon(key);
    const label = getStatLabel(key);

    return {
        key,
        value: val,
        label,
        icon: iconHtml,
        isPercent
    };
}

export function getLabel(label, fallbackIndex) {
    if (label === undefined || label === null) {
        return fallbackIndex !== undefined ? `Buff ${fallbackIndex + 1}` : '';
    }
    if (typeof label === 'string') return label;
    if (typeof label === 'object') {
        const lang = (typeof window !== 'undefined' && window.GUOBA_LANG) || 'fr';
        return label[lang] ?? label.fr ?? label.en ?? Object.values(label)[0] ?? '';
    }
    return String(label);
}

if (typeof window !== 'undefined') {
    window.BASE_ROLLS = BASE_ROLLS;
    window.MAX_ROLLS = MAX_ROLLS;
    window.BASE_ROLLS_4 = BASE_ROLLS_4;
    window.MAX_ROLLS_4 = MAX_ROLLS_4;
    window.formatValueDisplay = formatValueDisplay;
    window.formatStat = formatStat;
    window.createIcon = createIcon;
    window.getLabel = getLabel;
    window.getStatLabel = getStatLabel;
    window.getArtifactTypeName = getArtifactTypeName;
}