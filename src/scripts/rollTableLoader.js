// src/scripts/rollTableLoader.js

let rollTableCache = null;

export async function loadRollTable() {
    if (rollTableCache) return rollTableCache;
    if (typeof window !== 'undefined' && window.ROLL_TABLE) {
        rollTableCache = window.ROLL_TABLE;
        return rollTableCache;
    }

    try {
        const mod = await import('../data/rollTable.json');
        rollTableCache = mod.default || mod;
        if (typeof window !== 'undefined') {
            window.ROLL_TABLE = rollTableCache;
        }
        return rollTableCache;
    } catch (err) {
        console.warn('[rollTableLoader] Erreur lors du chargement de rollTable.json', err);
        return null;
    }
}

export function getLoadedRollTable() {
    if (rollTableCache) return rollTableCache;
    if (typeof window !== 'undefined' && window.ROLL_TABLE) {
        rollTableCache = window.ROLL_TABLE;
        return rollTableCache;
    }
    return null;
}

if (typeof window !== 'undefined') {
    window.loadRollTable = loadRollTable;
    window.getLoadedRollTable = getLoadedRollTable;
}
