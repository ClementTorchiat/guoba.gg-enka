// src/scripts/icons.js
import ICON_MAP_DATA from '../data/icon_map.json';

export const ICON_BASE_PATH = '/assets/simulator/icons/';
export const ICON_MAP = ICON_MAP_DATA;

export function getStatIcon(key) {
    const filename = ICON_MAP[key] || ICON_MAP['unknown'] || 'icon_unknown.webp';
    return `${ICON_BASE_PATH}${filename}`;
}

export default ICON_MAP;
