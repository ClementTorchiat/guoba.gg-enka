// src/scripts/snapshotManager.js
// Gestionnaire de snapshots de personnages persistants par UID via IndexedDB (zéro dépendance externe)
import { idbGet, idbSet, idbDel } from './db.js';

export function getCharacterKey(perso) {
    if (!perso) return '';
    const id = perso.id || perso.avatarId;
    if ([10000005, 10000007, 10000117, 10000118].includes(Number(id)) && perso.skillDepotId) {
        return `${id}-${perso.skillDepotId}`;
    }
    return String(id);
}

export function isLinkedAccount(uid) {
    if (!uid) return false;
    const discordUid = typeof localStorage !== 'undefined' ? localStorage.getItem('guoba_discord_uid') : null;
    return Boolean(discordUid && String(discordUid).trim() === String(uid).trim());
}

export async function getStoredSnapshots(uid) {
    if (!uid) return {};
    try {
        const raw = await idbGet(`guoba_snapshots_${uid}`);
        return (raw && typeof raw === 'object') ? raw : {};
    } catch (e) {
        console.warn('[SnapshotManager] Erreur lecture snapshots:', e);
        return {};
    }
}

export async function saveStoredSnapshots(uid, snapshotsMap) {
    if (!uid || !snapshotsMap) return false;
    try {
        await idbSet(`guoba_snapshots_${uid}`, snapshotsMap);
        return true;
    } catch (e) {
        console.warn('[SnapshotManager] Erreur écriture snapshots:', e);
        return false;
    }
}

export async function clearStoredSnapshots(uid) {
    if (!uid) return false;
    try {
        const snapshots = await getStoredSnapshots(uid);
        const filtered = {};
        Object.entries(snapshots).forEach(([k, p]) => {
            if (p && !p.isArchived) {
                filtered[k] = p;
            }
        });
        await saveStoredSnapshots(uid, filtered);
        return true;
    } catch (e) {
        console.warn('[SnapshotManager] Erreur suppression snapshots:', e);
        return false;
    }
}

export async function countArchivedCharacters(uid) {
    if (!uid) return 0;
    try {
        const currentActiveUid = (typeof document !== 'undefined' ? document.getElementById('uidInput')?.value.trim() : '')
            || (typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('uid') : '');
        if (currentActiveUid && String(currentActiveUid).trim() === String(uid).trim() && typeof window !== 'undefined' && Array.isArray(window.globalPersoData) && window.globalPersoData.length > 0) {
            return window.globalPersoData.filter(p => p && p.isArchived).length;
        }
        const snapshots = await getStoredSnapshots(uid);
        return Object.values(snapshots).filter(p => p && p.isArchived).length;
    } catch (_) {
        return 0;
    }
}

export async function updateSnapshotCharacter(uid, perso) {
    if (!isLinkedAccount(uid) || !perso) return;
    try {
        const snapshots = await getStoredSnapshots(uid);
        const key = getCharacterKey(perso);
        snapshots[key] = perso;
        await saveStoredSnapshots(uid, snapshots);
    } catch (e) {
        console.warn('[SnapshotManager] Erreur mise à jour caractère:', e);
    }
}

export async function mergeShowcaseWithSnapshots(uid, showcasePersoList, locData = null) {
    if (!isLinkedAccount(uid)) {
        return (showcasePersoList || []).map(p => {
            p.isArchived = false;
            p.inShowcase = true;
            return p;
        });
    }

    const snapshotsMap = await getStoredSnapshots(uid);
    const showcaseKeySet = new Set();
    const now = Date.now();

    // 1. Enregistrer / mettre à jour les personnages de la vitrine
    (showcasePersoList || []).forEach(perso => {
        const key = getCharacterKey(perso);
        showcaseKeySet.add(key);
        perso.isArchived = false;
        perso.inShowcase = true;
        perso.snapshotDate = now;
        snapshotsMap[key] = perso;
    });

    // 2. Extraire les personnages en réserve (ceux archivés non présents dans la vitrine actuelle)
    const archivedList = [];
    const currentLang = (typeof window !== 'undefined' && (window.GUOBA_LANG || localStorage.getItem('guoba_lang'))) || 'fr';

    Object.entries(snapshotsMap).forEach(([key, archivedPerso]) => {
        if (!showcaseKeySet.has(key)) {
            archivedPerso.isArchived = true;
            archivedPerso.inShowcase = false;

            // Mise à jour éventuelle du nom si la langue a changé
            if (archivedPerso.nameTextMapHash && locData && locData[currentLang]) {
                const locName = locData[currentLang][archivedPerso.nameTextMapHash];
                if (locName) {
                    archivedPerso.nom = locName;
                }
            }

            archivedList.push(archivedPerso);
        }
    });

    // 3. Sauvegarde asynchrone non-bloquante du dictionnaire mis à jour
    saveStoredSnapshots(uid, snapshotsMap).catch(e => {
        console.warn('[SnapshotManager] Sauvegarde asynchrone échouée:', e);
    });

    // 4. Retourner la liste fusionnée (vitrine en premier, puis réserve)
    return [...showcasePersoList, ...archivedList];
}

if (typeof window !== 'undefined') {
    window.snapshotManager = {
        getCharacterKey,
        isLinkedAccount,
        getStoredSnapshots,
        saveStoredSnapshots,
        clearStoredSnapshots,
        countArchivedCharacters,
        updateSnapshotCharacter,
        mergeShowcaseWithSnapshots
    };
}
