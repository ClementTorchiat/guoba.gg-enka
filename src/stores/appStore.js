// src/stores/appStore.js
import { atom, computed } from 'nanostores';

// ── État global du compte & des données ──────────────────────
export const $userData = atom(null);            // { playerInfo, avatarInfoList, uid }
export const $characterList = atom([]);         // Array de personnages analysés
export const $selectedCharIndex = atom(0);      // Index du personnage sélectionné

// ── Store calculé pour le personnage actuellement affiché ────
export const $selectedCharacter = computed(
    [$characterList, $selectedCharIndex],
    (list, index) => (list && list[index]) ? list[index] : null
);

// ── Paramètres d'affichage et UI ─────────────────────────────
export const $sidebarSort = atom({ column: 'original', direction: 'desc' });
export const $currentLanguage = atom(
    typeof window !== 'undefined' ? (window.GUOBA_LANG || localStorage.getItem('guoba_lang') || 'fr') : 'fr'
);
export const $currentTheme = atom(
    typeof window !== 'undefined' ? (localStorage.getItem('guoba_theme') || 'wish') : 'wish'
);
export const $recentProfiles = atom([]);

// ── Actions de mise à jour ───────────────────────────────────

export function setUserData(data, uid) {
    $userData.set({ ...data, uid });
}

export function setCharacterList(list) {
    $characterList.set(list);
}

export function selectCharacter(index) {
    const list = $characterList.get();
    if (index >= 0 && index < list.length) {
        $selectedCharIndex.set(index);
    }
}

export function updateCharacter(index, updater) {
    const list = [...$characterList.get()];
    if (list[index]) {
        list[index] = typeof updater === 'function' ? updater(list[index]) : { ...list[index], ...updater };
        $characterList.set(list);
    }
}

export function setSidebarSort(column) {
    const current = $sidebarSort.get();
    if (current.column === column) {
        $sidebarSort.set({
            column,
            direction: current.direction === 'desc' ? 'asc' : 'desc'
        });
    } else {
        $sidebarSort.set({
            column,
            direction: column === 'name' ? 'asc' : 'desc'
        });
    }
}

// Export sur window pour rétrocompatibilité
if (typeof window !== 'undefined') {
    window.$guobaStore = {
        $userData,
        $characterList,
        $selectedCharIndex,
        $selectedCharacter,
        $sidebarSort,
        $currentLanguage,
        $currentTheme,
        $recentProfiles,
        selectCharacter,
        setSidebarSort,
        updateCharacter
    };
}
