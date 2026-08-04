// src/scripts/db.js
// Wrapper asynchrone natif ultra-léger pour IndexedDB (zéro dépendance externe)

const DB_NAME = 'guoba_cache_db';
const STORE_NAME = 'game_data_store';
const DB_VERSION = 1;

let dbPromise = null;

function getDB() {
    if (!dbPromise) {
        dbPromise = new Promise((resolve, reject) => {
            if (typeof indexedDB === 'undefined') {
                return reject(new Error('IndexedDB non supporté dans cet environnement'));
            }
            const request = indexedDB.open(DB_NAME, DB_VERSION);
            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME);
                }
            };
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
    return dbPromise;
}

export async function idbGet(key) {
    try {
        const db = await getDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readonly');
            const store = tx.objectStore(STORE_NAME);
            const req = store.get(key);
            req.onsuccess = () => resolve(req.result || null);
            req.onerror = () => reject(req.error);
        });
    } catch (e) {
        console.warn('[idb] Erreur de lecture IndexedDB', e);
        return null;
    }
}

export async function idbSet(key, val) {
    try {
        const db = await getDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);
            const req = store.put(val, key);
            req.onsuccess = () => resolve(true);
            req.onerror = () => reject(req.error);
        });
    } catch (e) {
        console.warn('[idb] Erreur d\'écriture IndexedDB', e);
        return false;
    }
}

export async function idbDel(key) {
    try {
        const db = await getDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);
            const req = store.delete(key);
            req.onsuccess = () => resolve(true);
            req.onerror = () => reject(req.error);
        });
    } catch (e) {
        console.warn('[idb] Erreur de suppression IndexedDB', e);
        return false;
    }
}

if (typeof window !== 'undefined') {
    window.idbGet = idbGet;
    window.idbSet = idbSet;
    window.idbDel = idbDel;
}
