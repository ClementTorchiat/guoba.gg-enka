import {
    calculateCharacterScore,
    calculateMainStatBonus,
    scoreArtifact,
    calculateArtifactRollQuality,
    getGradeFromPoints,
    getGlobalGrade,
    getGradeColor,
    SCORING_NORMS
} from './scoring.js';
import { BASE_ROLLS, MAX_ROLLS, BASE_ROLLS_4, MAX_ROLLS_4 } from './data.js';
import { renderShowcaseComponent } from '../components/showcase/ShowcaseContainer.js';
import { renderToolbarControls } from '../components/showcase/ToolbarControls.js';
import { renderCombatStatsList, updateCombatStatsDOM } from '../components/showcase/CombatStatsList.js';
import { renderBuffsPanel, updateBuffsPanelDOM } from '../components/showcase/BuffsPanel.js';
import { renderAdviceSection } from '../components/advice/AdviceSection.js';
import { renderCombatStatsAdviceCards } from '../components/advice/CombatStatsSection.js';
import { renderPlayerProfileCard } from '../components/profile/PlayerHeader.js';
import { renderGlobalEvaluation as renderGlobalEvaluationComponent } from '../components/profile/GlobalEvaluation.js';
import { renderSidebarList } from '../components/profile/Sidebar.js';
import { setUserData, setCharacterList, selectCharacter } from '../stores/appStore.js';
import { preloadConfigsForShowcase, loadCharacterConfig } from './configLoader.js';
import { idbGet, idbSet } from './db.js';
import { loadRollTable } from './rollTableLoader.js';

const t = (...args) => (window.t ? window.t(...args) : args[0]);

const ICON_BASE_PATH = "./assets/simulator/icons/";

const ICON_MAP = window.ICON_MAP;

function createIcon(key) {
    const filename = ICON_MAP[key] || ICON_MAP["unknown"];
    return `<img src="${ICON_BASE_PATH}${filename}" class="stat-icon" alt="${key}" decoding="async">`;
}

const KEY_TO_FIGHT_PROP = window.KEY_TO_FIGHT_PROP;

const FLAT_STAT_KEYS = new Set(['hp', 'atk', 'def', 'eleMas']);

const _rollDetailsCache = new Map();
function getRollDetails(key, value, rarity = 5) {
    const cacheKey = `${key}|${value}|${rarity}`;
    if (_rollDetailsCache.has(cacheKey)) return _rollDetailsCache.get(cacheKey);

    const fightProp = KEY_TO_FIGHT_PROP[key];
    const table = window.ROLL_TABLE?.[String(rarity)]?.[fightProp];

    if (table) {
        const lookupKey = FLAT_STAT_KEYS.has(key)
            ? String(Math.round(value))
            : String(parseFloat(value.toFixed(1)));

        const entry = table[lookupKey];
        if (entry && entry[0]) {
            const rawRolls = entry[0];
            const rolls = FLAT_STAT_KEYS.has(key)
                ? rawRolls
                : rawRolls.map(r => parseFloat((r * 100).toFixed(2)));

            const result = { k: rolls.length, rolls };
            _rollDetailsCache.set(cacheKey, result);
            return result;
        }
    }

    const baseRollsDef = rarity === 4
        ? (window.BASE_ROLLS_4 || BASE_ROLLS_4)
        : (window.BASE_ROLLS || BASE_ROLLS);

    if (!baseRollsDef || !baseRollsDef[key]) {
        return { k: 1, rolls: [value] };
    }

    const possibleRolls = baseRollsDef[key];
    let bestMatch = { k: 1, diff: Infinity, rolls: [value] };

    function checkCombinations(k, currentSum, startIndex, depth, currentRolls) {
        if (depth === k) {
            const diff = Math.abs(currentSum - value);
            if (diff < bestMatch.diff) {
                bestMatch = { k, diff, rolls: [...currentRolls] };
            }
            return;
        }
        for (let i = startIndex; i < 4; i++) {
            currentRolls.push(possibleRolls[i]);
            checkCombinations(k, currentSum + possibleRolls[i], i, depth + 1, currentRolls);
            currentRolls.pop();
        }
    }

    for (let k = 1; k <= 6; k++) {
        checkCombinations(k, 0, 0, 0, []);
        if (bestMatch.diff < 0.15) break;
    }

    _rollDetailsCache.set(cacheKey, bestMatch);
    return bestMatch;
}

function getRollCount(key, value, rarity = 5) {
    return getRollDetails(key, value, rarity).k;
}


const ELEMENT_DATA = window.ELEMENT_DATA;

const SUBSTAT_RANGES = window.SUBSTAT_RANGES;

const MAINSTAT_DROP_RATES = window.MAINSTAT_DROP_RATES;

const STAT_MAPPING = window.STAT_MAPPING;

const STAT_LABELS = window.STAT_LABELS;

const RESONANCE_DATA = window.RESONANCE_DATA;

const ELEMENT_COLORS = window.ELEMENT_COLORS;

const WEAPON_NAME_MAPPING = window.WEAPON_NAME_MAPPING;

const SET_NAME_MAPPING = window.SET_NAME_MAPPING;

const ARTIFACT_TYPE_MAPPING = window.ARTIFACT_TYPE_MAPPING;

const SLOT_POSSIBLE_MAIN_STATS = window.SLOT_POSSIBLE_MAIN_STATS;

let globalPersoData = [];

let sidebarSortState = { column: 'original', direction: 'desc' };

const THEME_COLORS = window.THEME_COLORS;

function toggleThemeMenu(event) {
    event.stopPropagation();
    const langMenu = document.getElementById('lang-custom-menu');
    if (langMenu) langMenu.classList.remove('show');
    document.getElementById('theme-custom-menu').classList.toggle('show');
}

function toggleLangMenu(event) {
    event.stopPropagation();
    const themeMenu = document.getElementById('theme-custom-menu');
    if (themeMenu) themeMenu.classList.remove('show');
    document.getElementById('lang-custom-menu').classList.toggle('show');
}

function selectCustomTheme(themeValue, themeName) {
    changeTheme(themeValue);
    document.getElementById('active-theme-text').innerText = themeName;
    document.getElementById('active-theme-dot').style.background = THEME_COLORS[themeValue];
    document.getElementById('theme-custom-menu').classList.remove('show');
}
function changeTheme(themeValue) {
    document.documentElement.setAttribute('data-theme', themeValue);
    localStorage.setItem('guoba_theme', themeValue);
}

function toggleBuildMenu(event) {
    event.stopPropagation();
    const menu = document.getElementById('build-custom-menu');
    const isOpen = menu.classList.contains('show');
    closeAllDataMenus();
    if (!isOpen) {
        menu.classList.add('show');
    }
}

function toggleErMenu(event) {
    event.stopPropagation();
    const menu = document.getElementById('er-custom-menu');
    const isOpen = menu.classList.contains('show');
    closeAllDataMenus();
    if (!isOpen) {
        menu.classList.add('show');
    }
}

function closeAllDataMenus() {
    const buildMenu = document.getElementById('build-custom-menu');
    const erMenu = document.getElementById('er-custom-menu');
    if (buildMenu) buildMenu.classList.remove('show');
    if (erMenu) erMenu.classList.remove('show');
}

function selectCustomBuild(charIndex, buildKey) {
    closeAllDataMenus();
    switchBuild(charIndex, buildKey);
}

function selectCustomER(charIndex, erValue) {
    closeAllDataMenus();
    updateERTarget(charIndex, erValue);
}

document.addEventListener('click', () => {
    const themeMenu = document.getElementById('theme-custom-menu');
    const langMenu = document.getElementById('lang-custom-menu');
    if (themeMenu) themeMenu.classList.remove('show');
    if (langMenu) langMenu.classList.remove('show');
    closeAllDataMenus();
});

function setSidebarSort(column) {
    if (sidebarSortState.column === column) {
        sidebarSortState.direction = sidebarSortState.direction === 'desc' ? 'asc' : 'desc';
    } else {
        sidebarSortState.column = column;
        sidebarSortState.direction = 'desc';
    }
    const activeCard = document.querySelector('#sidebar-list .char-card.active');
    const activeOriginalIndex = activeCard ? parseInt(activeCard.dataset.originalIndex) : 0;
    renderSidebar(activeOriginalIndex);
}

function updateSortArrows() {
    ['original', 'name', 'score'].forEach(col => {
        const arrow = document.getElementById(`arrow-${col}`);
        const section = document.getElementById(`sort-col-${col}`);
        if (!arrow || !section) return;
        const isActive = sidebarSortState.column === col;
        section.style.opacity = isActive ? '1' : '0.4';
        arrow.style.transition = 'transform 0.2s ease';
        arrow.style.transform = (isActive && sidebarSortState.direction === 'asc') ? 'rotate(180deg)' : 'rotate(0deg)';
        arrow.style.opacity = isActive ? '1' : '0.4';
    });
}

let charData = {};
let locData = {};
const apiSessionCache = {};


function getRecentProfiles() {
    const data = localStorage.getItem('guoba_recent_profiles');
    return data ? JSON.parse(data) : [];
}

function getFavoriteUid() {
    return localStorage.getItem('guoba_favorite_uid') || null;
}
function setFavoriteUid(uid) {
    if (uid) localStorage.setItem('guoba_favorite_uid', uid);
    else localStorage.removeItem('guoba_favorite_uid');
}
function toggleFavoriteProfile(uid, event) {
    if (event) event.stopPropagation();
    const current = getFavoriteUid();
    setFavoriteUid(current === uid ? null : uid);
    renderHome();
}

function saveRecentProfile(uid, playerInfo, profilePicUrl, bannerUrl) {
    let profiles = getRecentProfiles();
    profiles = profiles.filter(p => p.uid !== uid);

    profiles.unshift({
        uid: uid,
        nickname: playerInfo.nickname || t('data.unknownPlayer'),
        signature: playerInfo.signature || '',
        ar: playerInfo.level || 0,
        achievements: playerInfo.finishAchievementNum ?? null,
        abyssStars: playerInfo.towerStarIndex ?? null,
        theaterStars: playerInfo.theaterStarIndex ?? null,
        stygianIndex: playerInfo.stygianIndex ?? null,
        stygianSec: (playerInfo.stygianSeconds > 0) ? playerInfo.stygianSeconds : null,
        pic: profilePicUrl,
        banner: bannerUrl || '',
        timestamp: Date.now()
    });

    if (profiles.length > 12) {
        const favUid = getFavoriteUid();
        const removeIdx = profiles.map((p, i) => i).reverse().find(i => profiles[i].uid !== favUid);
        if (removeIdx !== undefined) profiles.splice(removeIdx, 1);
        else profiles.pop();
    }
    localStorage.setItem('guoba_recent_profiles', JSON.stringify(profiles));
}

function deleteRecentProfile(uid, event) {
    if (event) event.stopPropagation();
    if (getFavoriteUid() === uid) setFavoriteUid(null);
    let profiles = getRecentProfiles();
    profiles = profiles.filter(p => p.uid !== uid);
    localStorage.setItem('guoba_recent_profiles', JSON.stringify(profiles));
    renderHome();
}

function showSkeletonCard() {
    hideSidebarNav();
    const sidebarList = document.getElementById('sidebar-list');
    if (sidebarList) {
        sidebarList.innerHTML = Array(12).fill(0).map(() => `
            <div class="char-card">
                <div class="sk" style="width:52px; height:52px; border-radius:8px;"></div>
                <div class="char-card-container">
                    <div class="sk" style="width:90px; height:14px;"></div>
                    <div class="sk" style="width:48px; height:12px;"></div>
                </div>
            </div>
        `).join('');
    }

    let topHeader = document.getElementById('top-header-area');
    const pp = document.getElementById('player-profile');
    if (!topHeader && pp) {
        topHeader = document.createElement('div');
        topHeader.id = 'top-header-area';
        const evalDiv = document.createElement('div');
        evalDiv.id = 'global-evaluation';
        topHeader.appendChild(evalDiv);
        pp.parentNode.insertBefore(topHeader, pp);
        topHeader.appendChild(pp);
    }
    if (topHeader) topHeader.style.display = 'flex';

    const evalContainer = document.getElementById('global-evaluation');
    if (evalContainer) {
        evalContainer.style.display = 'flex';
        evalContainer.style.flex = '1';
        evalContainer.innerHTML = `
            <div class="sk" style="width:100%; height:76px; border-radius:8px;"></div>
        `;
    }

    if (pp) {
        pp.innerHTML = `
            <div class="sk" style="width:400px; height:76px; border-radius:8px;"></div>
        `;
    }

    const toolbar = document.getElementById('toolbar-controls');
    const menu = document.querySelector('.main-content-menu');
    if (menu) menu.style.display = 'flex';
    if (toolbar) {
        toolbar.innerHTML = `
            <div class="sk" style="width:350px; height:50px; border-radius:8px;"></div>
            <div style="display:flex; gap:5px; padding:5px; background:var(--bg-panel); border-radius:8px;">
                ${Array(4).fill(0).map(() =>
            `<div class="sk" style="width:40px; height:40px; border-radius:5px;"></div>`
        ).join('')}
            </div>
            <div class="sk" style="width:106px; height:50px; border-radius:8px;"></div>
        `;
    }

    const container = document.getElementById('main-container');
    if (!container) return;

    const statRows = Array(9).fill(0).map(() => `
        <div style="display:flex; align-items:center; gap:8px; height:20px;">
            <div class="sk" style="width:18px; height:18px; border-radius:50%;"></div>
            <div class="sk" style="flex:1; height:10px;"></div>
            <div class="sk" style="width:50px; height:10px;"></div>
        </div>
    `).join('');

    const combatRows = Array(5).fill(0).map(() => `
        <div style="display:flex; align-items:center; gap:8px; height:18px;">
            <div class="sk" style="width:18px; height:18px; border-radius:50%;"></div>
            <div class="sk" style="flex:1; height:10px;"></div>
            <div class="sk" style="width:55px; height:10px;"></div>
        </div>
    `).join('');

    const artifactCards = Array(5).fill(0).map(() => `
        <div style="width:240px; min-width:240px; height:280px; border:1px solid #2d3342; border-radius:8px; padding:12px; box-sizing:border-box; display:flex; flex-direction:column; justify-content:space-between;">
            <div style="display:flex; gap:12px; align-items:center; height:50px;">
                <div class="sk" style="width:48px; height:48px; border-radius:6px;"></div>
                <div style="flex:1; display:flex; flex-direction:column; gap:6px;">
                    <div class="sk" style="height:12px; width:80%;"></div>
                    <div class="sk" style="height:10px; width:65%; background:rgba(255,177,59,0.15);"></div>
                    <div class="sk" style="height:9px;  width:30%;"></div>
                </div>
            </div>
            <div style="border-top:1px solid #2d3342;"></div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <div class="sk" style="height:10px; width:45%;"></div>
                <div class="sk" style="height:10px; width:28%;"></div>
            </div>
            <div style="border-top:1px solid #2d3342;"></div>
            <div style="display:flex; flex-direction:column; gap:6px;">
                ${Array(4).fill(0).map(() => `
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <div style="display:flex; gap:5px; align-items:center;">
                            <div class="sk" style="width:17px; height:17px; border-radius:3px;"></div>
                            <div class="sk" style="height:10px; width:75px;"></div>
                        </div>
                        <div class="sk" style="height:10px; width:35px;"></div>
                    </div>
                `).join('')}
            </div>
            <div style="border-top:1px solid #2d3342;"></div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <div class="sk" style="height:10px; width:45px;"></div>
                <div class="sk" style="height:10px; width:55px;"></div>
            </div>
        </div>
    `).join('');

    const buffsCard = `
        <div style="width:240px; min-width:240px; height:280px; border:1px solid #2d3342; border-radius:8px; padding:12px; box-sizing:border-box; display:flex; flex-direction:column; gap:10px;">
            <div class="sk" style="height:14px; width:60%;"></div>
            <div class="sk" style="height:9px; width:90%;"></div>
            <div class="sk" style="height:9px; width:80%;"></div>
            <div style="border-top:1px solid #2d3342; margin:2px 0;"></div>
            ${Array(5).fill(0).map(() => `
                <div style="display:flex; justify-content:space-between; align-items:center; height:28px; background:rgba(0,0,0,0.2); border-radius:8px; padding:0 8px; box-sizing:border-box;">
                    <div class="sk" style="height:10px; width:70%;"></div>
                    <div class="sk" style="width:30px; height:16px; border-radius:34px;"></div>
                </div>
            `).join('')}
        </div>
    `;

    container.innerHTML = `
        <div class="top-row">

            <!-- Fond neutre -->
            <div style="position:absolute; inset:0; z-index:0; background:#1e2024;"></div>

            <!-- Colonne gauche : portrait + arme -->
            <div style="display:flex; flex-direction:column; gap:8px; flex-shrink:0; position:relative; z-index:1;">
                <div class="sk" style="width:350px; height:720px; border-radius:8px; border:1px solid rgba(255,255,255,0.08);"></div>
                <div class="sk" style="width:350px; height:128px; border-radius:8px; border:1px solid rgba(255,255,255,0.08);"></div>
            </div>

            <!-- Colonne milieu : stats + score + skills + combat -->
            <div style="width:299px; flex-shrink:0; display:flex; flex-direction:column; gap:8px; position:relative; z-index:1;">

                <!-- Stats de base -->
                <div style="flex:1; border-radius:8px; border:1px solid rgba(255,255,255,0.15); padding:12px; display:flex; flex-direction:column; gap:11px; background:rgba(30,32,36,0.8);">
                    <div style="display:flex; justify-content:space-between; align-items:center; height:40px; margin-bottom:2px;">
                        <div style="display:flex; gap:4px; align-items:center;">
                            <div class="sk" style="width:25px; height:25px; border-radius:50%;"></div>
                            <div class="sk" style="width:29px; height:29px; border-radius:50%;"></div>
                        </div>
                        <div style="display:flex; flex-direction:column; gap:5px; align-items:flex-end;">
                            <div class="sk" style="width:60px; height:11px;"></div>
                            <div class="sk" style="width:32px; height:11px;"></div>
                        </div>
                    </div>
                    <div class="sk" style="width:55%; height:22px; border-radius:6px;"></div>
                    <div class="sk" style="width:50%; height:11px;"></div>
                    <div style="display:flex; flex-direction:column; gap:9px;">
                        ${statRows}
                    </div>
                </div>

                <!-- Score -->
                <div style="border-radius:8px; border:1px solid rgba(255,255,255,0.15); padding:10px 10px 8px 7px; display:flex; flex-direction:column; gap:8px; background:rgba(30,32,36,0.8);">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <div class="sk" style="width:70px; height:12px;"></div>
                        <div class="sk" style="width:65px; height:12px;"></div>
                    </div>
                    <div class="sk" style="height:8px; width:100%; border-radius:4px;"></div>
                </div>

                <!-- Skills -->
                <div style="border-radius:8px; border:1px solid rgba(255,255,255,0.15); padding:10px; display:flex; justify-content:space-around; align-items:center; background:rgba(30,32,36,0.8);">
                    ${Array(3).fill(0).map(() => `
                        <div style="display:flex; flex-direction:column; align-items:center; gap:8px; margin-bottom:11px;">
                            <div class="sk" style="width:64px; height:64px; border-radius:50%;"></div>
                            <div class="sk" style="width:28px; height:10px; border-radius:34px;"></div>
                        </div>
                    `).join('')}
                </div>

                <!-- Stats en combat -->
                <div style="border-radius:8px; border:1px solid rgba(255,255,255,0.15); padding:10px; display:flex; flex-direction:column; gap:9px; background:rgba(30,32,36,0.8);">
                    ${combatRows}
                </div>
            </div>

            <!-- Colonne droite : équipement -->
            <div class="equipment-area" style="position:relative; z-index:1;">
                ${artifactCards}
                ${buffsCard}
            </div>

        </div>
    `;
}

let gameDataReady = false;

async function loadGameData() {
    const loader = document.getElementById('loading-msg');
    if (loader) loader.innerText = t('error.loadingV2');
    window.iconToNameHash = {};

    // ⚠️ TRÈS IMPORTANT : Passer en v4 pour vider l'ancien cache sans armes
    const CACHE_KEY = 'guoba_gamedata_idb_v1';
    const CACHE_TTL = 24 * 60 * 60 * 1000;

    try {
        const uidInput = document.getElementById('uidInput');
        const searchBtn = document.getElementById('searchBtn');
        if (uidInput) {
            uidInput.disabled = true;
            uidInput.placeholder = t('ui.search.loading');
        }
        if (searchBtn) {
            searchBtn.disabled = true;
        }

        // 1. Lecture du cache asynchrone depuis IndexedDB
        const cached = await idbGet(CACHE_KEY);
        if (cached && (Date.now() - cached.ts < CACHE_TTL)) {
            charData = cached.chars;
            locData = cached.locs;
            window.namecardsData = cached.namecards;
            window.pfpsData = cached.pfps;
            window.iconToNameHash = cached.iconToNameHash || {};
            // Charge la table de rolls en tâche de fond si besoin
            loadRollTable().catch(() => {});
            gameDataReady = true;
            buildHashToKey();
            if (uidInput) {
                uidInput.disabled = false;
                uidInput.placeholder = t('ui.search.placeholder');
            }
            if (searchBtn) {
                searchBtn.disabled = false;
            }
            if (loader) loader.innerText = "";
            return;
        }

        // 2. Téléchargement des dictionnaires et de la table de rolls
        const [chars, locs, relics, namecards, pfps, weapons] = await Promise.all([
            fetch(`https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/gi/avatars.json`).then(r => r.json()),
            fetch(`https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/gi/locs.json`).then(r => r.json()),
            fetch(`https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/gi/relics.json`).then(r => r.json()),
            fetch(`https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/gi/namecards.json`).then(r => r.json()),
            fetch(`https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/gi/pfps.json`).then(r => r.json()),
            fetch(`https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/gi/weapons.json`).then(r => r.json()),
            loadRollTable().catch(() => {})
        ]);

        charData = chars;
        locData = locs;
        window.namecardsData = namecards;
        window.pfpsData = pfps;

        // Remplissage du dictionnaire avec les Artéfacts
        if (relics && relics.Items && relics.Sets) {
            Object.values(relics.Items).forEach(item => {
                if (item.Icon && item.SetId && relics.Sets[item.SetId]) {
                    const iconName = item.Icon.split('/').pop().replace('.png', '');
                    const nameHash = relics.Sets[item.SetId].Name;
                    if (iconName && nameHash) {
                        window.iconToNameHash[iconName] = nameHash;
                    }
                }
            });
        }

        // Remplissage du dictionnaire avec les Armes
        if (weapons) {
            Object.values(weapons).forEach(weapon => {
                const iconName = weapon.Icon || weapon.icon;
                const nameHash = weapon.NameTextMapHash || weapon.nameTextMapHash;
                if (iconName && nameHash) {
                    window.iconToNameHash[iconName] = nameHash;
                }
            });
        }

        // 3. Stockage natif ultra-rapide dans IndexedDB (zéro limite 5Mo)
        await idbSet(CACHE_KEY, {
            ts: Date.now(),
            chars, locs, namecards, pfps, weapons,
            iconToNameHash: window.iconToNameHash
        });

        if (loader) loader.innerText = "";
        gameDataReady = true;
        buildHashToKey();

        if (uidInput) {
            uidInput.disabled = false;
            uidInput.placeholder = t('ui.search.placeholder');
        }
        if (searchBtn) {
            searchBtn.disabled = false;
        }
    } catch (e) {
        if (loader) loader.innerText = t('error.filesErr');
        if (uidInput) {
            uidInput.placeholder = t('ui.search.error');
            uidInput.style.color = "#ef4444";
        }
        if (searchBtn) {
            searchBtn.disabled = false;
        }
        alert(t('error.gameData'))
    }
}

function toggleSearchIcon(isLoaded) {
    const searchBtn = document.getElementById('searchBtn');
    if (!searchBtn) return;

    if (isLoaded) {
        searchBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-always-white)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
        searchBtn.onclick = clearSearch;
    } else {
        searchBtn.innerHTML = `<img src="assets/simulator/icons/icon_search_white.svg" alt="Valider" style="width: 20px; height: 20px;">`;
        searchBtn.onclick = () => fetchUserData();
    }
}

function clearSearch() {
    const uidInput = document.getElementById('uidInput');
    if (uidInput) uidInput.value = '';
    window.history.pushState({}, '', window.location.pathname);
    document.title = t('page.title.default');
    window.currentPlayerNickname = null;
    globalPersoData = [];
    sidebarSortState = { column: 'original', direction: 'desc' };
    const sidebar = document.getElementById('sidebar-list');
    if (sidebar) sidebar.innerHTML = '';
    updateSortArrows();

    const playerProfile = document.getElementById('player-profile');
    if (playerProfile) playerProfile.innerHTML = '';

    const evalContainer = document.getElementById('global-evaluation');
    if (evalContainer) evalContainer.style.display = 'none';

    const topHeader = document.getElementById('top-header-area');
    if (topHeader) topHeader.style.display = 'none';

    toggleSearchIcon(false);
    updateSidebarNavActive('home');
    showSidebarNav();

    renderHome();
}

async function fetchUserData(optionalUid) {
    const uid = (optionalUid || document.getElementById('uidInput').value).trim();
    if (!uid) return alert(t('error.noUid'));

    if (!/^\d{9,10}$/.test(uid)) {
        return alert(t('error.invalidUid'));
    }

    if (!gameDataReady) {
        return alert(t('error.dataLoading'));
    }

    const loader = document.getElementById('loading-msg');

    if (apiSessionCache[uid] && (Date.now() - apiSessionCache[uid].timestamp < 180000)) {
        console.log("⚡ Instant load from cache!");
        const cachedData = apiSessionCache[uid].data;
        window.currentPlayerNickname = cachedData.playerInfo.nickname || t('data.unknownPlayer');
        await preloadConfigsForShowcase(cachedData, charData, locData, window.HASH_TO_KEY);
        processData(cachedData);
        renderPlayerProfile(cachedData.playerInfo, uid);
        renderGlobalEvaluation(cachedData.playerInfo);
        toggleSearchIcon(true);
        return;
    }

    showSkeletonCard();


    if (loader) loader.innerText = t('export.processing');

    // Ancien proxy
    // const urlCible = `https://enka.network/api/uid/${uid}?t=${Date.now()}`;
    // const proxy = `https://corsproxy.io/?${encodeURIComponent(urlCible)}`;

    // Nouveau proxy
    const proxy = `https://guobagg.clement-torchiat.workers.dev/?uid=${uid}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
        const res = await fetch(proxy, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (!res.ok) {
            if (res.status === 404) throw new Error("404");
            else if (res.status === 429) throw new Error("429");
            else throw new Error("SERVER");
        }

        const data = await res.json();

        if (!data.avatarInfoList || data.avatarInfoList.length === 0) {
            alert(t('error.emptyShowcase'));
            clearSearch();

            const loader = document.getElementById('loading-msg');
            if (loader) loader.innerText = "";

            return;
        }

        apiSessionCache[uid] = {
            data: data,
            timestamp: Date.now()
        };

        window.currentPlayerNickname = data.playerInfo.nickname || t('data.unknownPlayer');

        // Préchargement ultra-rapide des configurations nécessaires pour le showcase
        await preloadConfigsForShowcase(data, charData, locData, window.HASH_TO_KEY);

        processData(data);
        renderPlayerProfile(data.playerInfo, uid);

        renderGlobalEvaluation(data.playerInfo);

        if (loader) loader.innerText = "";
        toggleSearchIcon(true);

    } catch (e) {
        clearTimeout(timeoutId);
        if (loader) loader.innerText = t('error.generic');

        if (e.name === 'AbortError') {
            alert(t('error.timeout'));
        } else if (e.message === '404') {
            alert(t('error.notFound'));
        } else if (e.message === '429') {
            alert(t('error.rateLimit'));
        } else if (e.message === 'SERVER') {
            alert(t('error.serverDown'));
        } else {
            alert(t('error.generic'));
        }
    }
}

function renderPlayerProfile(playerInfo, uid) {
    const container = document.getElementById('player-profile');
    if (!container || !playerInfo) return;

    const namecardsData = window.namecardsData || {};
    const namecard = namecardsData[String(playerInfo.nameCardId)];
    let bannerUrl = (namecard && namecard.Icon) ? `https://enka.network${namecard.Icon}` : '';

    let profilePicUrl = 'https://enka.network/ui/UI_AvatarIcon_PlayerBoy_Circle.png';
    const pp = playerInfo.profilePicture || {};
    if (pp.id) {
        const pfp = (window.pfpsData || {})[String(pp.id)];
        if (pfp && pfp.IconPath) profilePicUrl = `https://enka.network${pfp.IconPath}`;
    }

    saveRecentProfile(uid, playerInfo, profilePicUrl, bannerUrl);
    container.innerHTML = renderPlayerProfileCard(playerInfo, uid, charData);
}

function getText(hash) {
    if (!hash) return t('data.unknown');
    if (!locData) return t('data.loading');
    const lang = locData[window.GUOBA_LANG] ? window.GUOBA_LANG
        : locData["fr"] ? "fr"
            : locData["en"] ? "en"
                : Object.keys(locData)[0];
    const key = String(hash);
    const val = locData[lang] ? locData[lang][key] : null;
    if (val) {
        return val.replace(/<[^>]*>/g, "");
    }
    return t('data.unknown');
}

function getLabel(label, fallbackIndex) {
    if (label === undefined || label === null) {
        return fallbackIndex !== undefined ? `Buff ${fallbackIndex + 1}` : '';
    }
    if (typeof label === 'string') return label;
    if (typeof label === 'object') {
        return label[window.GUOBA_LANG] ?? label.fr ?? label.en ?? Object.values(label)[0] ?? '';
    }
    return String(label);
}

function buildHashToKey() {
    const dict = {};
    const frDict = locData["fr"] || {};
    for (const [hash, nom] of Object.entries(frDict)) {
        if (WEAPON_NAME_MAPPING[nom]) dict[hash] = WEAPON_NAME_MAPPING[nom];
        if (SET_NAME_MAPPING[nom]) dict[hash] = SET_NAME_MAPPING[nom];
    }
    window.HASH_TO_KEY = dict;
}

function formatValueDisplay(key, val) {
    if (['hp', 'atk', 'def', 'eleMas'].includes(key)) return Math.round(val).toLocaleString();
    return val.toFixed(1) + '%';
}

function formatStat(propId, value) {
    let key = STAT_MAPPING[propId];
    if (!key && (STAT_LABELS[propId] || propId === 'dmgBonus')) key = propId;
    if (!key) return { key: "unknown", value: value, label: propId, icon: createIcon("unknown") };

    let val = value;
    let isPercent = false;
    if (key.endsWith('_') || ['critRate_', 'critDMG_', 'enerRech_', 'heal_'].includes(key)) {
        isPercent = true;
        if (val < 1.0) val = val * 100;
    }

    const iconHtml = createIcon(key);

    const label = STAT_LABELS[key] || key;

    return {
        key,
        value: val,
        label,
        icon: iconHtml,
        isPercent
    };
}

function calculateBuffedStats(baseStats, currentStats, buffsList) {
    let buffed = { ...currentStats };
    buffsList.forEach(buff => {
        if (buff.active) applyBonus(buffed, baseStats, buff.bonuses, false);
    });
    buffsList.forEach(buff => {
        if (buff.active) applyBonus(buffed, baseStats, buff.bonuses, true);
    });
    return buffed;
}

function applyBonus(buffed, baseStats, bonuses, processScaling) {
    for (const [statKey, val] of Object.entries(bonuses)) {
        if (typeof val === 'object') {
            if (!processScaling) continue;
            if (statKey.endsWith('_scaling')) {
                const targetStatRaw = statKey.replace('_bonus_scaling', '');
                const targetStat = getShortKey(targetStatRaw) || mapTargetKey(targetStatRaw);
                const sourceStat = mapTargetKey(val.source);
                if (targetStat && sourceStat) {
                    const rawValue = buffed[sourceStat] || 0;
                    const baseline = val.baseline || 0;
                    const sourceValue = Math.max(0, rawValue - baseline);
                    let bonusValue = sourceValue * val.percent;

                    if (val.max !== undefined) {
                        bonusValue = Math.min(bonusValue, val.max);
                    }

                    buffed[targetStat] = (buffed[targetStat] || 0) + bonusValue;

                    if (targetStat === "atk_") buffed.atk += baseStats.atk * bonusValue;
                    else if (targetStat === "hp_") buffed.hp += baseStats.hp * bonusValue;
                    else if (targetStat === "def_") buffed.def += baseStats.def * bonusValue;
                }
            }
        } else {
            if (processScaling) continue;
            if (statKey === "atk_") buffed.atk += baseStats.atk * val;
            else if (statKey === "atk") buffed.atk += val;
            else if (statKey === "hp_") buffed.hp += baseStats.hp * val;
            else if (statKey === "hp") buffed.hp += val;
            else if (statKey === "def_") buffed.def += baseStats.def * val;
            else if (statKey === "def") buffed.def += val;
            else if (statKey === "critRate_" || statKey === "critDMG_" || statKey === "enerRech_") {
                let shortKey = getShortKey(statKey);
                if (shortKey) buffed[shortKey] += val * 100;
            } else if (statKey === "eleMas") {
                buffed.em += val;
            } else if (statKey === buffed.dmgBonusKey || statKey === 'elemental_dmg_') {
                buffed.dmgBonus += val * 100;
            } else if (statKey.endsWith('_dmg_')) {
                buffed[statKey] = (buffed[statKey] || 0) + val * 100;
            }
        }
    }
}

function getShortKey(longKey) {
    if (longKey === "critRate_") return "cr";
    if (longKey === "critDMG_") return "cd";
    if (longKey === "enerRech_") return "er";
    return null;
}

function mapTargetKey(keyPart) {
    if (keyPart === 'atk' || keyPart === 'atk_') return keyPart;
    if (keyPart === 'hp' || keyPart === 'hp_') return keyPart;
    if (keyPart === 'def' || keyPart === 'def_') return keyPart;
    if (keyPart === 'eleMas') return 'em';
    if (keyPart === 'enerRech' || keyPart === 'enerRech_') return 'er';
    if (keyPart === 'elemental_dmg' || keyPart === 'elemental_dmg_') return 'dmgBonus';
    if (keyPart.endsWith('_dmg') || keyPart.endsWith('_dmg_')) {
        return keyPart.endsWith('_') ? keyPart : keyPart + '_';
    }
    return null;
}

function toggleBuff(charIndex, buffIndex) {
    const p = globalPersoData[charIndex];
    if (!p) return;

    const targetBuff = p.buffs[buffIndex];
    const mode = targetBuff.selectMode || 'standard';

    const willBeActive = !targetBuff.active;

    if (mode === 'exclusive') {
        if (willBeActive) {
            p.buffs.forEach(b => {
                if (b.category === targetBuff.category) b.active = false;
            });
            targetBuff.active = true;
        } else {
            targetBuff.active = false;
        }
    } else if (mode === 'cumulative') {
        const groupBuffs = p.buffs.filter(b => b.category === targetBuff.category);
        const targetIndexInGroup = groupBuffs.indexOf(targetBuff);

        if (willBeActive) {
            groupBuffs.forEach((b, idx) => {
                if (idx <= targetIndexInGroup) b.active = true;
            });
        } else {
            groupBuffs.forEach((b, idx) => {
                if (idx >= targetIndexInGroup) b.active = false;
            });
        }
    } else {
        targetBuff.active = willBeActive;
    }

    p.buffedStats = calculateBuffedStats(p.baseStats, p.combatStats, p.buffs);

    // Mise à jour 100% in-place du DOM pour supprimer tout flicker d'icônes et de composants
    updateCombatStatsDOM(p);
    updateBuffsPanelDOM(p);

    let config = p.charConfig || {};
    if (p.activeBuild) config = { ...config, ...p.activeBuild };
    const cardsContainer = document.getElementById('combat-stats-advice-cards');
    if (cardsContainer) {
        cardsContainer.innerHTML = renderCombatStatsAdviceCards(p, config);
    }
}

function generateScoreBar(totalRolls, currentGrade, maxPossibleRolls = 45) {
    if (maxPossibleRolls <= 0) maxPossibleRolls = 45;
    const maxScale = maxPossibleRolls || 45;
    const percent = Math.min((totalRolls / maxScale) * 100, 100);

    const labels = [
        "F", "F+", "D", "D+", "C", "C+", "B", "B+", "A", "A+",
        "S", "S+", "SS", "SS+", "SSS", "SSS+", "WTF", "WTF+", `ARCHON (${maxScale})`
    ];

    const steps = labels.length - 1;
    const interval = maxScale / steps;

    let markers = labels.map((label, index) => ({
        val: parseFloat((index * interval).toFixed(2)),
        label: label
    }));

    let markersHtml = "";
    markers.forEach(m => {
        const left = (m.val / maxScale) * 100;
        markersHtml += `<div class="score-marker" style="left: ${left}%;">${m.label}</div>`;
    });

    return `
        <div class="score-bar-container">
            <div class="score-bar-track">
                ${markersHtml}
                <div class="score-cursor" style="left: ${percent}%;">
                    <div class="score-cursor-label" style="background:none; padding:0; border:none; box-shadow:none; display:flex; align-items:baseline; gap:6px; white-space:nowrap; transform: translateX(-50%); bottom: 25px;">
                        <span style="font-size:1.2rem; font-weight:800; color:var(--accent-gold); line-height:1;">${currentGrade}</span>
                        <span style="font-size:0.85rem; color:#ddd;">(${totalRolls} Rolls)</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateMaxTheoreticalScore(persoObj, config) {
    if (!config || !config.weights || !window.MAX_ROLLS) {
        return { score: 100, totalRolls: 45 };
    }

    const forbiddenSubStats = ["heal_", "physical_dmg_"];

    const sortedSubWeights = Object.entries(config.weights)
        .filter(([key, w]) => w > 0 && !key.includes("_dmg_") && !forbiddenSubStats.includes(key))
        .sort((a, b) => b[1] - a[1]);

    if (sortedSubWeights.length === 0) return { score: 0, totalRolls: 0 };

    let maxTotalRolls = 0;

    let perfectArtefacts = persoObj.artefacts.map(art => {

        let idealMainStatKey = art.mainStat.key;

        if (art.type === "EQUIP_BRACER") {
            idealMainStatKey = "hp";
        } else if (art.type === "EQUIP_NECKLACE") {
            idealMainStatKey = "atk";
        } else {
            if (config.idealMainStats && config.idealMainStats[art.type] && config.idealMainStats[art.type].length > 0) {
                idealMainStatKey = config.idealMainStats[art.type][0];
            } else {
                const possibleMains = SLOT_POSSIBLE_MAIN_STATS[art.type] || [];
                let bestW = -1;
                possibleMains.forEach(stat => {
                    let w = config.weights[stat];
                    if (w === undefined && stat.includes("_dmg_")) w = config.weights["elemental_dmg_"];
                    w = w || 0;
                    if (w > bestW) {
                        bestW = w;
                        idealMainStatKey = stat;
                    }
                });
            }
        }

        const perfectMainStat = {
            key: idealMainStatKey,
            value: 0,
            label: STAT_LABELS[idealMainStatKey] || idealMainStatKey
        };

        const availableStats = sortedSubWeights.filter(sw => sw[0] !== perfectMainStat.key);

        const topStats = availableStats.slice(0, 4);
        let fakeSubStats = [];

        if (topStats.length > 0) {
            const bestStat = topStats[0];
            fakeSubStats.push({
                key: bestStat[0],
                value: window.MAX_ROLLS[bestStat[0]] * 6
            });
            maxTotalRolls += 6;

            for (let i = 1; i < topStats.length; i++) {
                fakeSubStats.push({
                    key: topStats[i][0],
                    value: window.MAX_ROLLS[topStats[i][0]] * 1
                });
                maxTotalRolls += 1;
            }
        }

        return { ...art, subStats: fakeSubStats, mainStat: perfectMainStat };
    });

    let fakePerso = { ...persoObj, artefacts: perfectArtefacts, isSimulation: true };
    let simulation = calculateCharacterScore(fakePerso, config);

    return {
        score: parseFloat((simulation.score / simulation.setMultiplier).toFixed(1)),
        totalRolls: parseFloat(simulation.totalRolls)
    };
}

function getCritAdvice(cr, cd, config) {
    const crWeight = (config && config.weights && config.weights['critRate_']) || 0;

    if (crWeight < 1) {
        return { color: '#888', msg: t('advice.crit.noCrit') };
    }

    const roundedCR = Math.round(cr * 10) / 10;
    const roundedCD = Math.round(cd);

    if (roundedCR > 100) return {
        color: '#ef4444',
        msg: t('advice.crit.overcap', cr.toFixed(1))
    };

    if (roundedCR === 100) return { color: '#00FFFF', msg: t('advice.crit.perfect100') };

    if (roundedCR >= 90) {
        if (roundedCD < 160) return {
            color: '#eab308',
            msg: t('advice.crit.highCDLowCR', roundedCR, roundedCD)
        };
        return { color: '#22c55e', msg: t('advice.crit.above90') };
    }

    if (roundedCR >= 80) return {
        color: '#22c55e',
        msg: t('advice.crit.above80')
    };

    if (roundedCR >= 70) {
        if (roundedCD > 200) return {
            color: '#f97316',
            msg: t('advice.crit.highCDLowCR2', roundedCD, roundedCR)
        };
        return { color: '#eab308', msg: t('advice.crit.above70') };
    }

    if (roundedCR >= 60) return {
        color: '#f97316',
        msg: t('advice.crit.above60')
    };

    return {
        color: '#ef4444',
        msg: t('advice.crit.below60')
    };
}

function getSetRecommendation(activeSets, config) {
    if (!config || !config.bestSets || config.bestSets.length === 0) return null;
    const hasBest = activeSets.some(s => config.bestSets.includes(s));
    if (hasBest) return { type: 'success', msg: t('advice.set.best') };
    const hasGood = config.goodSets && activeSets.some(s => config.goodSets.includes(s));
    const recommended = config.bestSets[0].split(':')[0];
    const hash = Object.keys(window.HASH_TO_KEY || {}).find(h => window.HASH_TO_KEY[h] === recommended);
    const recName = hash ? getText(hash) : recommended;
    if (hasGood) return { type: 'info', msg: t('advice.set.good', recName) };
    return { type: 'warning', msg: t('advice.set.bad', recName) };
}

function getMainStatAdvice(persoObj, config) {
    const slotsToCheck = ["EQUIP_SHOES", "EQUIP_RING", "EQUIP_DRESS"];
    let warnings = [];
    let slotsData = [];

    if (!config.idealMainStats) return null;

    let equippedCount = 0;

    slotsToCheck.forEach(slotType => {
        const art = persoObj.artefacts.find(a => a.type === slotType);
        const allowedMainStats = config.idealMainStats[slotType] || [];

        if (!art) {
            slotsData.push({
                type: slotType,
                isEquipped: false,
                allowedKeys: allowedMainStats
            });
            return;
        }

        equippedCount++;
        const currentKey = art.mainStat.key;
        const isOk = allowedMainStats.includes(currentKey);

        slotsData.push({
            type: slotType,
            icon: art.icon,
            currentKey: currentKey,
            isOk: isOk,
            allowedKeys: allowedMainStats,
            isEquipped: true
        });

        if (!isOk) {
            const pieceName = t('artifact.' + slotType);
            const cleanList = allowedMainStats.map(statKey => STAT_LABELS[statKey] || statKey).join(" / ");
            warnings.push({
                piece: pieceName,
                current: art.mainStat.label,
                better: cleanList
            });
        }
    });

    if (equippedCount === 0) {
        return {
            type: "info",
            title: t('advice.mainStat.title.ok'),
            msg: t('advice.mainStat.empty'),
            slotsData: [],
            isEmpty: true
        };
    }

    if (warnings.length > 0) {
        return {
            type: "critical",
            title: t('advice.mainStat.title.problem'),
            details: warnings,
            slotsData: slotsData
        };
    }

    return {
        type: "success",
        title: t('advice.mainStat.title.ok'),
        msg: t('advice.mainStat.ok'),
        slotsData: slotsData
    };
}

function getFarmDifficulty(pieceType, mainStatKey) {
    if (pieceType === "EQUIP_BRACER" || pieceType === "EQUIP_NECKLACE") {
        return { label: t('farm.easy'), color: "#3b82f6" };
    }

    const rates = MAINSTAT_DROP_RATES[pieceType];
    if (!rates || !rates[mainStatKey]) return { label: t('farm.hard'), color: "#eab308" };

    const probability = rates[mainStatKey];

    if (probability >= 19) return { label: t('farm.medium'), color: "#22c55e" };
    if (probability >= 10) return { label: t('farm.hard'), color: "#eab308" };
    if (probability >= 5) return { label: t('farm.veryHard'), color: "#f97316" };
    return { label: t('farm.extreme'), color: "#ef4444" };
}

function getOffPieceAdvice(persoObj) {
    const equippedCount = persoObj.artefacts ? persoObj.artefacts.length : 0;

    if (equippedCount === 0) {
        return {
            type: "empty",
            msg: t('advice.offPiece.empty')
        };
    }

    if (equippedCount > 0 && equippedCount < 5) {
        return {
            type: "incomplete",
            msg: t('advice.offPiece.incomplete')
        };
    }

    const fullSetKey = Object.keys(persoObj.setsCounter).find(key => persoObj.setsCounter[key] === 5);

    if (fullSetKey) {
        const setPieces = persoObj.artefacts.filter(art => art.setKey === fullSetKey);
        setPieces.sort((a, b) => (a.score || 0) - (b.score || 0));
        const worstPiece = setPieces[0];

        const otherPieces = setPieces.slice(1);
        const avgSetScore = otherPieces.reduce((a, b) => a + b.score, 0) / otherPieces.length;

        const rawName = ARTIFACT_TYPE_MAPPING[worstPiece.type] || t('data.unknown');
        const hash = Object.keys(window.HASH_TO_KEY || {}).find(h => window.HASH_TO_KEY[h] === fullSetKey);
        const setNameTranslated = hash ? getText(hash) : fullSetKey;

        return {
            type: "info",
            msg: t('advice.offPiece.5of5', setNameTranslated, rawName, worstPiece.score),
            data: { offPiece: worstPiece, avgScore: avgSetScore, is5of5: true }
        };
    }

    let offPiece = null;
    let setPiecesScores = [];

    const activeSetKeys = Object.keys(persoObj.setsCounter).filter(key => persoObj.setsCounter[key] >= 2);

    persoObj.artefacts.forEach(art => {
        if (activeSetKeys.includes(art.setKey)) {
            setPiecesScores.push(art.score);
        } else {
            offPiece = art;
        }
    });

    if (setPiecesScores.length === 0) {
        return {
            type: "rainbow",
            msg: t('advice.offPiece.rainbow')
        };
    }
    if (!offPiece) return null;

    const rawName = ARTIFACT_TYPE_MAPPING[offPiece.type] || t('data.unknown');
    const avgSetScore = setPiecesScores.reduce((a, b) => a + b, 0) / setPiecesScores.length;
    const isHardMainStat = offPiece.mainStat.key.includes("dmg_") || offPiece.mainStat.key.includes("crit");

    let type = "error";
    let msg = t('advice.offPiece.bad', t('artifact.' + offPiece.type));

    if (offPiece.score > avgSetScore) {
        type = "success";
        msg = t('advice.offPiece.good', t('artifact.' + offPiece.type));
    } else if (isHardMainStat && offPiece.score > (avgSetScore * 0.8)) {
        type = "warning";
        msg = t('advice.offPiece.ok', t('artifact.' + offPiece.type));
    }

    return {
        type: type,
        msg: msg,
        data: { offPiece: offPiece, avgScore: avgSetScore, is5of5: false }
    };
}

function getTalentAdvice(persoObj, config) {
    if (!config.talents) return null;
    const target = config.talents;
    const current = { auto: 0, skill: 0, burst: 0 };

    if (persoObj.talents.length >= 3) {
        current.auto = persoObj.talents[0].level;
        current.skill = persoObj.talents[1].level;
        current.burst = persoObj.talents[2].level;
    }

    let criticals = [];
    let infos = [];

    const check = (type, label) => {
        const lvl = current[type];
        const goal = target[type];
        if (goal <= 1) return;

        const diff = goal - lvl;
        if (diff >= 2) {
            criticals.push(t('advice.talent.item', label, goal));
        } else if (diff >= 1) {
            infos.push(t('advice.talent.item', label, goal));
        }
    };

    check('auto', t('advice.talent.auto'));
    check('skill', t('advice.talent.skill'));
    check('burst', t('advice.talent.burst'));

    if (criticals.length === 0 && infos.length === 0) {
        return [{ type: "success", msg: t('advice.talent.ok') }];
    }

    let advices = [];

    const formatList = (list) => {
        if (list.length === 1) return list[0];
        if (list.length === 2) return list[0] + t('ui.and') + list[1];
        return list.slice(0, -1).join(', ') + t('ui.and') + list[list.length - 1];
    };

    if (criticals.length > 0) {
        advices.push({
            type: "critical",
            msg: t('advice.talent.critical', formatList(criticals))
        });
    }

    if (infos.length > 0) {
        advices.push({
            type: "info",
            msg: t('advice.talent.info', formatList(infos))
        });
    }

    return advices;
}

function getSetForcingAdvice(persoObj, config) {
    const equippedCount = persoObj.artefacts ? persoObj.artefacts.length : 0;

    if (equippedCount === 0) {
        return {
            type: "info",
            title: t('advice.setForce.title.ok'),
            msg: t('advice.setForce.empty'),
            status: 'empty',
            activeSets: []
        };
    }

    if (equippedCount > 0 && equippedCount < 5) {
        return {
            type: "warning",
            title: t('advice.setForce.title.ok'),
            msg: t('advice.setForce.incomplete'),
            status: 'incomplete',
            activeSets: []
        };
    }

    let active4pSet = null;

    const charLikes2p2p = config.bestSets && config.bestSets.some(setStr => setStr.includes(":2"));

    const activeSets = Object.keys(persoObj.setsCounter).filter(k => persoObj.setsCounter[k] >= 2);
    const activeSetsData = activeSets.map(setKey => {
        const hash = Object.keys(window.HASH_TO_KEY || {}).find(h => window.HASH_TO_KEY[h] === setKey);
        return { key: setKey, hash: hash, count: persoObj.setsCounter[setKey] };
    });

    for (const [setKey, count] of Object.entries(persoObj.setsCounter)) {
        if (count >= 4) {
            active4pSet = setKey;
            break;
        }
    }

    if (!active4pSet) {
        if (charLikes2p2p) {
            return {
                type: "success",
                title: t('advice.setForce.title.ok'),
                msg: t('advice.setForce.ok2p2p'),
                status: '2p2p',
                activeSets: activeSetsData
            };
        }
        return {
            type: "success",
            title: t('advice.setForce.title.ok'),
            msg: t('advice.setForce.okRainbow'),
            status: 'rainbow',
            activeSets: activeSetsData
        };
    }

    const setPieces = persoObj.artefacts.filter(a => a.setKey === active4pSet);
    const totalScore = setPieces.reduce((sum, art) => sum + art.score, 0);
    const avgScore = totalScore / setPieces.length;
    const setHash = Object.keys(window.HASH_TO_KEY || {}).find(h => window.HASH_TO_KEY[h] === active4pSet);

    if (avgScore < 25) {
        let warningMsg = t('advice.setForce.weak');
        if (charLikes2p2p) {
            warningMsg += ' ' + t('advice.setForce.weakHint2p');
        }

        return {
            type: "error",
            title: t('advice.setForce.title.warning'),
            msg: warningMsg,
            status: 'forcing',
            targetSet: { key: active4pSet, hash: setHash, avgScore: avgScore }
        };
    } else {
        const isRecommended = (
            (config.bestSets && config.bestSets.some(s => s.split(':')[0] === active4pSet)) ||
            (config.goodSets && config.goodSets.some(s => s.split(':')[0] === active4pSet))
        );

        if (!isRecommended) {
            return {
                type: "info",
                title: t('advice.setForce.title.ok'),
                msg: t('advice.setForce.okQualityOffMeta'),
                status: 'offMeta4p',
                targetSet: { key: active4pSet, hash: setHash, avgScore: avgScore }
            };
        }

        return {
            type: "success",
            title: t('advice.setForce.title.ok'),
            msg: t('advice.setForce.okQuality'),
            status: 'good4p',
            targetSet: { key: active4pSet, hash: setHash, avgScore: avgScore }
        };
    }
}

function getMetaSetAdvice(persoObj, config) {
    if (!config.bestSets || config.bestSets.length === 0) return null;

    const is2p2p = config.bestSets.every(setStr => setStr.endsWith(":2")) && config.bestSets.length >= 2;

    let equippedBest = false;
    let targetSetsData = [];
    let recommendationStr = "";

    if (is2p2p) {
        equippedBest = config.bestSets.every(setStr => {
            const [key, count] = setStr.split(":");
            return (persoObj.setsCounter[key] || 0) >= parseInt(count);
        });

        targetSetsData = config.bestSets.map(setStr => {
            const [key, count] = setStr.split(":");
            const hash = Object.keys(window.HASH_TO_KEY || {}).find(h => window.HASH_TO_KEY[h] === key);
            return {
                key: key,
                name: hash ? getText(hash) : key,
                required: parseInt(count),
                current: persoObj.setsCounter[key] || 0,
                hash: hash
            };
        });

        recommendationStr = targetSetsData.map(t => `<b>${t.name} (2p)</b>`).join(" et ");
    } else {
        const bestMatch = config.bestSets.find(setStr => {
            const [key, count] = setStr.split(":");
            return (persoObj.setsCounter[key] || 0) >= parseInt(count);
        });

        equippedBest = !!bestMatch;
        const displaySetStr = bestMatch || config.bestSets[0];
        const [displayKey, displayCountStr] = displaySetStr.split(":");
        const hash = Object.keys(window.HASH_TO_KEY || {}).find(h => window.HASH_TO_KEY[h] === displayKey);

        targetSetsData = [{
            key: displayKey,
            name: hash ? getText(hash) : displayKey,
            required: parseInt(displayCountStr) || 4,
            current: persoObj.setsCounter[displayKey] || 0,
            hash: hash
        }];

        recommendationStr = `<b>${targetSetsData[0].name} (${t('ui.setPieces', targetSetsData[0].required)})</b>`;
    }

    if (equippedBest) {
        return {
            type: "success",
            title: t('advice.metaSet.title.ok'),
            msg: t('advice.metaSet.ok'),
            targetSets: targetSetsData,
            is2p2p: is2p2p
        };
    }

    let equippedGood = false;
    if (config.goodSets) {
        equippedGood = !!config.goodSets.find(setStr => {
            const [key, count] = setStr.split(":");
            return (persoObj.setsCounter[key] || 0) >= parseInt(count);
        });
    }

    if (equippedGood) {
        return {
            type: "info",
            title: t('advice.metaSet.title.optimize'),
            msg: t('advice.metaSet.good', recommendationStr),
            targetSets: targetSetsData,
            is2p2p: is2p2p
        };
    }

    return {
        type: "warning",
        title: t('advice.metaSet.title.problem'),
        msg: t('advice.metaSet.bad', recommendationStr),
        targetSets: targetSetsData,
        is2p2p: is2p2p
    };
}

function getWeaponAdvice(persoObj) {
    if (!persoObj.weapon) return null;

    if (persoObj.weapon.level < 90) {
        return {
            type: "warning",
            title: t('advice.weapon.title'),
            msg: t('advice.weapon.low')
        };
    } else {
        return {
            type: "success",
            title: t('advice.weapon.title'),
            msg: t('advice.weapon.ok')
        };
    }
}

function getERAdvice(currentER, targetER) {
    const diff = currentER - targetER;

    if (diff >= -10 && diff <= 15) {
        return {
            type: "success",
            title: t('advice.er.title.ok'),
            msg: t('advice.er.ok', currentER.toFixed(0), targetER)
        };
    }

    if (diff < -10) {
        return {
            type: "warning",
            title: t('advice.er.title.low'),
            msg: t('advice.er.low', currentER.toFixed(0), targetER)
        };
    }

    if (diff > 15) {
        return {
            type: "info",
            title: t('advice.er.title.excess'),
            msg: t('advice.er.excess', currentER.toFixed(0), targetER)
        };
    }
}

function getLevelAdvice(persoObj) {
    if (persoObj.level >= 100) {
        return {
            type: "success",
            title: t('advice.level.title'),
            msg: t('advice.level.legendary'),
            maxLevel: 100,
            barColor: '#22c55e'
        };
    }
    if (persoObj.level >= 95) {
        return {
            type: "success",
            title: t('advice.level.title'),
            msg: t('advice.level.ascended'),
            maxLevel: 95,
            barColor: '#22c55e'
        };
    }
    if (persoObj.level >= 90) {
        return {
            type: "success",
            title: t('advice.level.title'),
            msg: t('advice.level.ok'),
            maxLevel: 90,
            barColor: '#22c55e'
        };
    }
    return {
        type: "info",
        title: t('advice.level.title'),
        msg: t('advice.level.low'),
        maxLevel: 90,
        barColor: '#ef4444'
    };
}


function calculateRollDistribution(persoObj, config) {
    if (!config || !config.weights) return { usefulCount: 0, deadCount: 0, total: 0, usefulDetails: [], deadDetails: [] };

    let usefulCount = 0;
    let deadCount = 0;

    let usefulMap = {};
    let deadMap = {};

    persoObj.artefacts.forEach(art => {
        art.subStats.forEach(sub => {
            let w = config.weights[sub.key];
            if (w === undefined && sub.key.includes("_dmg_")) w = config.weights["elemental_dmg_"];

            const rolls = getRollCount(sub.key, sub.value, art.stars || 5);

            if (rolls > 0) {
                if (w && w > 0) {
                    usefulCount += rolls;
                    usefulMap[sub.key] = (usefulMap[sub.key] || 0) + rolls;
                } else {
                    deadCount += rolls;
                    deadMap[sub.key] = (deadMap[sub.key] || 0) + rolls;
                }
            }
        });
    });

    const toSortedArray = (map) => {
        return Object.entries(map)
            .map(([key, count]) => ({
                label: STAT_LABELS[key] || key,
                count: count,
                key: key
            }))
            .sort((a, b) => b.count - a.count);
    };

    return {
        usefulCount,
        deadCount,
        total: usefulCount + deadCount,
        usefulDetails: toSortedArray(usefulMap),
        deadDetails: toSortedArray(deadMap)
    };
}

function calculateDeadRolls(persoObj, config) {
    if (!config || !config.weights) return { count: 0, details: [] };
    let deadRolls = 0;
    let deadStatsCounts = {};
    persoObj.artefacts.forEach(art => {
        art.subStats.forEach(sub => {
            let w = config.weights[sub.key];
            if (w === undefined && sub.key.includes("_dmg_")) w = config.weights["elemental_dmg_"];
            if (!w || w === 0) {
                const rolls = getRollCount(sub.key, sub.value, art.stars || 5);
                deadRolls += rolls;
                deadStatsCounts[sub.key] = (deadStatsCounts[sub.key] || 0) + rolls;
            }
        });
    });
    const details = Object.entries(deadStatsCounts)
        .filter(([_, count]) => count > 0)
        .map(([key, count]) => ({ label: STAT_LABELS[key] || key, count: count }))
        .sort((a, b) => b.count - a.count);
    return { count: deadRolls, details: details };
}

function getAllCrossCheckAdvice(charIndex) {
    const SLOT_ORDER = ["EQUIP_BRACER", "EQUIP_NECKLACE", "EQUIP_SHOES", "EQUIP_RING", "EQUIP_DRESS"];
    const currChar = globalPersoData[charIndex];
    if (!currChar || !currChar.artefacts) return SLOT_ORDER.map(() => null);

    const scoringConfig = { ...currChar.charConfig, ...(currChar.activeBuild || {}) };
    const active4pSet = Object.keys(currChar.setsCounter || {}).find(key => currChar.setsCounter[key] >= 4);
    const active4pCount = active4pSet ? currChar.setsCounter[active4pSet] : 0;

    return SLOT_ORDER.map(slotType => {
        const currArtIndex = currChar.artefacts.findIndex(a => a.type === slotType);
        if (currArtIndex === -1) return null;
        const currArt = currChar.artefacts[currArtIndex];

        let bestSwap = null;
        let maxDiff = 10;

        globalPersoData.forEach((otherChar, otherIndex) => {
            if (otherIndex === charIndex) return;

            otherChar.artefacts.forEach(otherArt => {
                if (otherArt.type !== slotType) return;

                let mWeight = scoringConfig.weights[otherArt.mainStat.key];
                if (mWeight === undefined && otherArt.mainStat.key.includes("_dmg_")) {
                    mWeight = scoringConfig.weights["elemental_dmg_"];
                }
                if (!mWeight || mWeight < 1) return;

                if (active4pSet) {
                    const isCurrArtSetPiece = (currArt.setKey === active4pSet);
                    if (isCurrArtSetPiece && active4pCount === 4) {
                        if (otherArt.setKey !== active4pSet) return;
                    }
                }

                const clonedOtherArt = JSON.parse(JSON.stringify(otherArt));
                const fakeArtefacts = currChar.artefacts.map(a => ({ ...a }));
                fakeArtefacts[currArtIndex] = clonedOtherArt;
                const fakePerso = { ...currChar, artefacts: fakeArtefacts };
                const newCurrEval = calculateCharacterScore(fakePerso, scoringConfig);
                const scoredNewArt = fakePerso.artefacts[currArtIndex];
                const diff = scoredNewArt.score - currArt.score;

                if (diff > maxDiff) {
                    if (newCurrEval.score <= currChar.evaluation.score) return;

                    maxDiff = diff;

                    const otherScoringConfig = { ...otherChar.charConfig, ...(otherChar.activeBuild || {}) };
                    const fakeOtherArtefacts = otherChar.artefacts.map(a => ({ ...a }));
                    const otherArtIndex = otherChar.artefacts.findIndex(a => a.type === slotType);
                    fakeOtherArtefacts[otherArtIndex] = JSON.parse(JSON.stringify(currArt));
                    const fakeOtherPerso = { ...otherChar, artefacts: fakeOtherArtefacts };
                    const newOtherEval = calculateCharacterScore(fakeOtherPerso, otherScoringConfig);

                    const currSubMap = {};
                    currArt.subStats.forEach(s => {
                        currSubMap[s.key] = s.value;
                    });
                    const newSubMap = {};
                    scoredNewArt.subStats.forEach(s => {
                        newSubMap[s.key] = s.value;
                    });
                    const allKeys = new Set([...Object.keys(currSubMap), ...Object.keys(newSubMap)]);
                    const deltas = [];
                    allKeys.forEach(key => {
                        const oldVal = currSubMap[key] || 0;
                        const newVal = newSubMap[key] || 0;
                        const delta = newVal - oldVal;
                        if (Math.abs(delta) < 0.01) return;
                        const label = STAT_LABELS[key] || key;
                        const isPercent = key.endsWith("_");
                        const formatted = isPercent
                            ? `${delta > 0 ? "+" : ""}${delta.toFixed(1)}% ${label}`
                            : `${delta > 0 ? "+" : ""}${Math.round(delta)} ${label}`;
                        deltas.push({ delta, formatted });
                    });
                    deltas.sort((a, b) => b.delta - a.delta);

                    bestSwap = {
                        currArt, newArt: scoredNewArt, diff, deltas,
                        currCharName: currChar.nom, currCharIcon: currChar.image,
                        otherCharName: otherChar.nom, otherCharIcon: otherChar.image,
                        currEvalOld: currChar.evaluation, currEvalNew: newCurrEval,
                        otherEvalOld: otherChar.evaluation, otherEvalNew: newOtherEval
                    };
                }
            });
        });

        return bestSwap;
    });
}

function getResinCostEstimate(pieceType, mainStatKey, currentScore) {
    const pSetAndPiece = 0.5 * 0.2;

    let pMainStat = 1.0;
    if (pieceType !== "EQUIP_BRACER" && pieceType !== "EQUIP_NECKLACE") {
        const rates = MAINSTAT_DROP_RATES[pieceType];
        if (rates && rates[mainStatKey]) {
            pMainStat = rates[mainStatKey] / 100;
        } else {
            pMainStat = 0.05;
        }
    }

    const expectedArtifacts = 1 / (pSetAndPiece * pMainStat);

    let baseResin = expectedArtifacts * 20;

    let safeScore = Math.max(10, currentScore);
    let difficultyMultiplier = Math.pow(safeScore / 20, 2.5);

    const totalResin = Math.round(baseResin * difficultyMultiplier);
    const daysOfFarm = Math.ceil(totalResin / 180);

    let formattedResin = totalResin > 1000 ? (totalResin / 1000).toFixed(1) + 'k' : totalResin;

    return {
        resin: formattedResin,
        days: daysOfFarm,
        rawResin: totalResin
    };
}

function getPriorities(persoObj) {
    if (!persoObj.artefacts || persoObj.artefacts.length === 0) return [];

    const activeSets = Object.keys(persoObj.setsCounter || {}).filter(key => persoObj.setsCounter[key] >= 2);

    const sorted = [...persoObj.artefacts].sort((a, b) => a.score - b.score);

    return sorted.slice(0, 3).map(art => {
        const typeName = ARTIFACT_TYPE_MAPPING[art.type] || art.type;

        const isOffPiece = !activeSets.includes(art.setKey);

        return {
            piece: typeName,
            score: art.score,
            grade: art.grade.letter,
            color: art.grade.color,
            type: art.type,
            mainKey: art.mainStat.key,
            setName: art.setName,
            mainLabel: art.mainStat.label,
            isOffPiece: isOffPiece
        };
    });
}

function calculateRNGQuality(persoObj, config) {
    if (!config || !config.weights || !window.MAX_ROLLS) return 0;
    let totalPct = 0;
    let count = 0;
    persoObj.artefacts.forEach(art => {
        art.subStats.forEach(sub => {
            let w = config.weights[sub.key];
            if (w === undefined && sub.key.includes("_dmg_")) w = config.weights["elemental_dmg_"];
            if (w && w > 0) {
                const maxRollsRef = (art.stars === 4 && window.MAX_ROLLS_4) ? window.MAX_ROLLS_4 : window.MAX_ROLLS;
                const maxVal = maxRollsRef[sub.key];
                if (maxVal) {
                    const rolls = getRollCount(sub.key, sub.value, art.stars || 5);
                    if (rolls > 0) {
                        const theoreticalMax = rolls * maxVal;
                        totalPct += (sub.value / theoreticalMax);
                        count++;
                    }
                }
            }
        });
    });
    return count > 0 ? (totalPct / count) * 100 : 0;
}

function simulateDeadStatReplacements(persoObj, config) {
    if (!config || !config.weights) return [];
    let suggestions = [];

    persoObj.artefacts.forEach(art => {
        let deadStats = [];
        let presentStats = new Set();

        art.subStats.forEach(sub => {
            presentStats.add(sub.key);
            let w = config.weights[sub.key];
            if (w === undefined && sub.key.includes("_dmg_")) w = config.weights["elemental_dmg_"];

            if (!w || w === 0) {
                const rolls = getRollCount(sub.key, sub.value, art.stars || 5);
                if (rolls > 0) {
                    deadStats.push({
                        key: sub.key,
                        rolls: rolls,
                        label: STAT_LABELS[sub.key] || sub.key
                    });
                }
            }
        });

        if (deadStats.length === 0) return;

        const desiredStats = Object.entries(config.weights)
            .filter(([key, w]) => w > 0)
            .sort((a, b) => b[1] - a[1])
            .map(([key]) => key);

        deadStats.sort((a, b) => b.rolls - a.rolls);

        let replacements = [];
        let usedTargets = new Set(presentStats);

        deadStats.forEach(dead => {
            let targetKey = desiredStats.find(k =>
                !usedTargets.has(k) &&
                !k.includes("_dmg_") &&
                k !== art.mainStat.key
            );

            if (targetKey && SUBSTAT_RANGES[targetKey]) {
                usedTargets.add(targetKey);

                const range = SUBSTAT_RANGES[targetKey];
                const minVal = (range.min * dead.rolls).toFixed(1);
                const maxVal = (range.max * dead.rolls).toFixed(1);
                const suffix = (targetKey.endsWith('_') || targetKey === "enerRech_" || targetKey === "critRate_" || targetKey === "critDMG_") ? "%" : "";
                const targetLabel = STAT_LABELS[targetKey] || targetKey;

                replacements.push({
                    dead: `${dead.label} (${dead.rolls})`,
                    target: `${targetLabel} (${dead.rolls})`,
                    gain: `+${minVal} <span style="color:var(--text-primary); opacity:0.8; padding:0 2px;">${t('sim.range')}</span> ${maxVal}${suffix} ${targetLabel}`
                });
            }
        });

        if (replacements.length > 0) {
            const pieceName = t('artifact.' + art.type);
            const deadText = replacements.map(r => `<span style="color:#ff6b6b">${r.dead}</span>`).join(t('ui.and'));
            const targetText = replacements.map(r => `<span style="color:var(--accent-gold)">${r.target}</span>`).join(t('ui.and'));
            const gainText = replacements.map(r => `
                <div style="display: flex; flex-direction: row; align-items: center; color: var(--accent-gold); ">
                    <p style=" color: var(--text-primary); margin-right: 6px;">•</p>
                    <p>${r.gain}</p>
                </div>
            `).join('');

            suggestions.push({
                pieceName: pieceName,
                text: t('sim.replace', deadText, targetText),
                gainHtml: gainText,
                totalDeadRolls: deadStats.reduce((acc, curr) => acc + curr.rolls, 0)
            });
        }
    });

    suggestions.sort((a, b) => b.totalDeadRolls - a.totalDeadRolls);
    return suggestions;
}

function calculateRerollMetrics(artifact, config) {
    if (!config || !config.weights || !window.MAX_ROLLS) return null;

    if ((artifact.stars || 5) < 4) {
        return {
            potential: 0,
            risk: 0,
            badge: {
                text: t('reroll.na.stars', artifact.stars ?? '?'),
                color: "#6b7280"
            }
        };
    }


    if ((artifact.stars || 5) === 4) {
        return {
            potential: 0,
            risk: 0,
            badge: {
                text: t('reroll.na.stars', 4),
                color: "#6b7280"
            }
        };
    }

    if ((artifact.level || 0) < 20) {
        return {
            potential: 0,
            risk: 0,
            badge: {
                text: t('reroll.na.level', artifact.level ?? 0),
                color: "#6b7280"
            }
        };
    }

    let totalRolls = 0;
    let terrainWeights = [];
    let upgradeTokens = [];
    let maxWeightOnArtifact = 0;

    artifact.subStats.forEach(sub => {
        const rolls = getRollCount(sub.key, sub.value, artifact.stars || 5);
        totalRolls += rolls;

        let w = config.weights[sub.key];
        if (w === undefined && sub.key.includes("_dmg_")) w = config.weights["elemental_dmg_"];
        const weight = (w && w > 0) ? w : 0;

        terrainWeights.push(weight);
        if (weight > maxWeightOnArtifact) maxWeightOnArtifact = weight;

        if (rolls > 1) {
            for (let i = 0; i < rolls - 1; i++) {
                upgradeTokens.push(weight);
            }
        }
    });

    const totalTokensAvailable = Math.max(4, totalRolls - 4);
    const currentUpgradeValue = upgradeTokens.reduce((a, b) => a + b, 0);

    const sortedTerrain = [...terrainWeights].sort((a, b) => b - a);
    const top2Avg = (sortedTerrain[0] + sortedTerrain[1]) / 2;
    const bot2Avg = (sortedTerrain[2] + sortedTerrain[3]) / 2;

    const guaranteedTokens = Math.min(2, totalTokensAvailable);
    const rngTokens = totalTokensAvailable - guaranteedTokens;

    const expectedValue = (guaranteedTokens * top2Avg) + (rngTokens * ((top2Avg + bot2Avg) / 2));

    const maxTheoreticalGain = totalTokensAvailable * maxWeightOnArtifact;

    let potential = 0;
    if (maxTheoreticalGain > 0) {
        const valueGain = expectedValue - currentUpgradeValue;
        if (valueGain > 0) {
            potential = (valueGain / maxTheoreticalGain) * 100 * 2.0;
        }
    }

    let saturation = (maxTheoreticalGain > 0) ? (currentUpgradeValue / maxTheoreticalGain) : 0;
    let risk = Math.pow(saturation, 3.5) * 100;

    if (potential > 100) potential = 100;
    if (risk > 99) risk = 99;
    if (risk < 1) risk = 1;

    let badge = { text: t('reroll.neutral'), color: "var(--text-muted)" };

    if (sortedTerrain[0] === 0 && sortedTerrain[1] === 0) {
        badge = { text: t("reroll.trash"), color: "#4b5563" };
    } else if (risk > 75) {
        badge = { text: t("reroll.tooRisky"), color: "#ef4444" };
    } else if (potential > 40 && risk < 35) {
        badge = { text: t("reroll.recommended"), color: "#22c55e" };
    } else if (potential > 15) {
        badge = { text: t("reroll.optimizable"), color: "#3b82f6" };
    } else {
        badge = { text: t("reroll.notWorth"), color: "#f97316" };
    }

    return {
        potential: Math.round(potential),
        risk: Math.round(risk),
        badge: badge
    };
}

function getRefinedValue(val, rank) {
    if (Array.isArray(val) && val.length === 2 && typeof val[0] === 'number') {
        return val[0] + (rank - 1) * val[1];
    }
    return val;
}

const CONFIG_NAME_ALIASES_EN_TO_FR = window.CONFIG_NAME_ALIASES_EN_TO_FR;

function resolveCharConfig(nom) {
    const charConfig = window.CHARACTER_CONFIG || {};
    const defaultConfig = window.DEFAULT_CONFIG || { weights: {}, bestSets: [], goodSets: [] };
    const safeNom = nom || "";
    const configKey = safeNom.replace(/\s+/g, '') || "Default";
    const aliases = window.CONFIG_NAME_ALIASES_EN_TO_FR || {};
    const norm = safeNom.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

    return charConfig[configKey]
        || charConfig[safeNom]
        || charConfig[aliases[safeNom]]
        || charConfig[norm]
        || defaultConfig;
}

function processData(data) {
    if (!data.avatarInfoList) return;
    globalPersoData = [];

    const G_CHAR_CONFIG = window.CHARACTER_CONFIG || {};
    const G_WEAPON_PASSIVES = window.WEAPON_PASSIVES || {};
    const G_SET_PASSIVES = window.SET_PASSIVES || {};
    const G_DEFAULT_CONFIG = window.DEFAULT_CONFIG || { weights: {}, bestSets: [], goodSets: [] };
    window.ITEM_ICON_MAP = window.ITEM_ICON_MAP || {};

    data.avatarInfoList.forEach(perso => {
        const id = perso.avatarId;
        const getKey = (obj, key) => {
            if (!obj) return undefined;
            if (obj[key] !== undefined) return obj[key];
            const lowerKey = key.charAt(0).toLowerCase() + key.slice(1);
            if (obj[lowerKey] !== undefined) return obj[lowerKey];
            return undefined;
        };
        let infoKey = String(id);
        if ((id === 10000005 || id === 10000007) && perso.skillDepotId) {
            const compoundKey = `${id}-${perso.skillDepotId}`;
            if (charData[compoundKey]) infoKey = compoundKey;
        }
        const info = charData[infoKey] || {};
        let nameHash = getKey(info, "NameTextMapHash");
        let nom = getText(nameHash);
        let iconNameRaw = getKey(info, "SideIconName")
            || getKey(info, "sideIconName")
            || getKey(info, "IconName")
            || getKey(info, "iconName")
            || getKey(info, "icon");

        if (!nom || nom === t('data.unknown')) {
            if (iconNameRaw) {
                const clean = iconNameRaw.replace(/\.png$/i, "");
                nom = clean.split('_').pop();
                if (nom.includes("Player")) nom = t('data.traveler');
            } else {
                nom = t('data.unknown');
            }
        }
        const qualityType = getKey(info, "QualityType");
        const rarity = qualityType === "QUALITY_ORANGE" ? 5 : 4;
        const level = perso.propMap['4001'] ? parseInt(perso.propMap['4001'].val) : 0;
        const constellations = perso.talentIdList ? perso.talentIdList.length : 0;
        const elemKey = getKey(info, "Element");
        const elemInfo = ELEMENT_DATA[elemKey] || { id: 30, key: "physical_dmg_" };

        const WEAPON_TYPE_MAP = {
            "WEAPON_SWORD_ONE_HAND": "sword",
            "WEAPON_CLAYMORE": "claymore",
            "WEAPON_POLE": "pole",
            "WEAPON_BOW": "bow",
            "WEAPON_CATALYST": "catalyst"
        };
        const wTypeRaw = getKey(info, "WeaponType");
        const charWeaponKey = WEAPON_TYPE_MAP[wTypeRaw] || "unknown";


        let sideIconUrl = "https://enka.network/ui/UI_AvatarIcon_Side_Unknown.png";
        let splashUrl = "https://enka.network/ui/UI_Gacha_AvatarImg_Unknown.png";


        if (iconNameRaw && typeof iconNameRaw === 'string') {

            if (iconNameRaw.startsWith("/ui/")) {
                sideIconUrl = `https://enka.network${iconNameRaw}`;

                let cleanName = iconNameRaw
                    .replace("/ui/", "")
                    .replace(/\.png$/i, "")
                    .replace("UI_AvatarIcon_Side_", "")
                    .replace("UI_AvatarIcon_", "");

                splashUrl = `https://enka.network/ui/UI_Gacha_AvatarImg_${cleanName}.png`;
            }
            else {
                let cleanName = iconNameRaw
                    .replace(/\.png$/i, "")
                    .replace(/^UI_AvatarIcon_Side_/, "")
                    .replace(/^UI_AvatarIcon_/, "");

                if (!cleanName.includes("/")) {
                    sideIconUrl = `https://enka.network/ui/UI_AvatarIcon_Side_${cleanName}.png`;
                    splashUrl = `https://enka.network/ui/UI_Gacha_AvatarImg_${cleanName}.png`;
                }
            }
        }

        const costumeId = perso.costumeId || null;
        if (costumeId && info.Costumes && info.Costumes[costumeId]) {
            const costume = info.Costumes[costumeId];
            if (costume.SideIcon)
                sideIconUrl = `https://enka.network${costume.SideIcon}`;
            if (costume.Art)
                splashUrl = `https://enka.network${costume.Art}`;
        }

        const talents = [];
        const skillOrder = getKey(info, "SkillOrder");
        const skillsMap = getKey(info, "Skills");

        if (skillOrder) {
            skillOrder.forEach(skillId => {
                let lvl = perso.skillLevelMap[skillId] || 0;
                let iconName = skillsMap && skillsMap[skillId] ? skillsMap[skillId] : "Skill_A_01";

                let talentUrl = "";
                if (iconName.startsWith("/ui/")) {
                    talentUrl = `https://enka.network${iconName}`;
                } else {
                    talentUrl = `https://enka.network/ui/${iconName}.png`;
                }

                talents.push({ level: lvl, icon: talentUrl });
            });
        }

        const fp = perso.fightPropMap;
        const baseStats = { hp: fp[1] || 0, atk: fp[4] || 0, def: fp[7] || 0 };
        const combatStats = {
            hp: fp[2000], atk: fp[2001], def: fp[2002], em: fp[28],
            cr: fp[20] * 100, cd: fp[22] * 100, er: fp[23] * 100,
            hb: (fp[26] || 0) * 100,
            dmgBonus: (fp[elemInfo.id] || 0) * 100,
            dmgBonusKey: elemInfo.key
        };

        const artefacts = [];
        let weapon = null;
        let setsCounter = {};

        perso.equipList.forEach(item => {
            const flat = item.flat;
            if (item.weapon) {
                const main = flat.weaponStats && flat.weaponStats[0] ? formatStat(flat.weaponStats[0].appendPropId, flat.weaponStats[0].statValue) : null;
                const sub = flat.weaponStats && flat.weaponStats[1] ? formatStat(flat.weaponStats[1].appendPropId, flat.weaponStats[1].statValue) : null;
                //const weaponNameFR = getText(flat.nameTextMapHash);
                //const weaponKey = WEAPON_NAME_MAPPING[weaponNameFR] || weaponNameFR;
                const weaponKey = (window.HASH_TO_KEY && window.HASH_TO_KEY[flat.nameTextMapHash]) || flat.nameTextMapHash;

                weapon = {
                    //name: weaponNameFR,
                    name: getText(flat.nameTextMapHash),
                    key: weaponKey,
                    level: item.weapon.level,
                    rank: (item.weapon.affixMap ? Object.values(item.weapon.affixMap)[0] : 0) + 1,
                    icon: `https://enka.network/ui/${flat.icon}.png`,
                    baseAtk: main,
                    subStat: sub,
                    stars: flat.rankLevel
                }
                window.ITEM_ICON_MAP[weaponKey] = `https://enka.network/ui/${flat.icon}.png`;
                ;
            }
            if (flat.itemType === "ITEM_RELIQUARY") {
                let targetHash = flat.setNameTextMapHash;

                if (window.iconToNameHash && flat.icon) {
                    const newHash = window.iconToNameHash[flat.icon];
                    if (newHash) {
                        targetHash = newHash;
                    }
                }

                //const nomSetFR = getText(targetHash);
                //const setKey = SET_NAME_MAPPING[nomSetFR] || "UnknownSet";
                const setKey = (window.HASH_TO_KEY && window.HASH_TO_KEY[targetHash]) || "UnknownSet";
                setsCounter[setKey] = (setsCounter[setKey] || 0) + 1;

                const subs = [];
                if (flat.reliquarySubstats) {
                    flat.reliquarySubstats.forEach(s => {
                        subs.push(formatStat(s.appendPropId, s.statValue));
                    });
                }

                artefacts.push({
                    type: flat.equipType,
                    setKey: setKey,
                    //setName: nomSetFR,
                    setName: getText(targetHash),
                    icon: `https://enka.network/ui/${flat.icon}.png`,
                    mainStat: formatStat(flat.reliquaryMainstat.mainPropId, flat.reliquaryMainstat.statValue),
                    subStats: subs,
                    level: item.reliquary.level - 1,
                    stars: flat.rankLevel
                });
                if (!window.ITEM_ICON_MAP[setKey]) {
                    window.ITEM_ICON_MAP[setKey] = `https://enka.network/ui/${flat.icon}.png`;
                }
            }
        });

        let buffs = [];

        const addBuffs = (sourceName, category, configData, selectMode = 'standard', weaponRank = 1) => {
            const resolveStats = (statsObj) => {
                const resolved = {};
                if (!statsObj) return resolved;
                for (const [k, v] of Object.entries(statsObj)) {
                    if (typeof v === 'object' && v.percent) {
                        resolved[k] = { ...v, percent: getRefinedValue(v.percent, weaponRank) };
                    } else {
                        resolved[k] = getRefinedValue(v, weaponRank);
                    }
                }
                return resolved;
            };

            if (Array.isArray(configData)) {
                configData.forEach((item, idx) => {
                    if (!item) return;
                    const finalStats = resolveStats(item.stats);
                    let name = getLabel(item.label, idx);
                    let isActive = item.active !== undefined ? item.active : true;
                    if (selectMode === 'exclusive' && item.active === undefined) {
                        isActive = (idx === configData.length - 1);
                    }
                    buffs.push({
                        id: `${category}_${idx}`,
                        category,
                        name,
                        bonuses: finalStats,
                        active: isActive,
                        selectMode: selectMode
                    });
                });
            } else {
                const finalStats = resolveStats(configData);
                let isActive = configData.active !== undefined ? configData.active : true;
                for (const [statKey, val] of Object.entries(finalStats)) {
                    if (typeof val === 'object' && statKey.endsWith('_scaling')) {
                        const targetStat = statKey.replace('_bonus_scaling', '');
                        const percentDisplay = (val.percent * 100).toFixed(2) + "%";
                        buffs.push({
                            id: `${category}_${statKey}`, category,
                            name: `${STAT_LABELS[targetStat]} (+${percentDisplay} ${val.source})`,
                            bonuses: { [statKey]: val }, active: isActive, selectMode: selectMode
                        });
                        continue;
                    }
                    if (typeof val !== 'object') {
                        const valDisplay = (val < 2) ? Math.round(val * 100) + "%" : val;
                        buffs.push({
                            id: `${category}_${statKey}`, category,
                            name: `${STAT_LABELS[statKey]} (+${valDisplay})`,
                            bonuses: { [statKey]: val }, active: isActive, selectMode: selectMode
                        });
                    }
                }
            }
        };

        const rawConfig = resolveCharConfig(nom);

        let activeBuild = null;
        let scoringConfig = { ...rawConfig };

        if (rawConfig.builds) {
            let bestBuildKey = null;
            let maxEfficiency = -1;

            Object.entries(rawConfig.builds).forEach(([key, build]) => {
                const tempConfig = { ...rawConfig, ...build };

                const clonedArtefacts = artefacts.map(a => ({ ...a }));
                const simulation = calculateCharacterScore({ artefacts: clonedArtefacts }, tempConfig);

                const potential = calculateMaxTheoreticalScore({ artefacts: artefacts }, tempConfig);

                let efficiency = 0;
                if (potential && potential.score > 0) {
                    efficiency = simulation.score / potential.score;
                }

                if (efficiency > maxEfficiency) {
                    maxEfficiency = efficiency;
                    bestBuildKey = key;
                }
            });

            if (!bestBuildKey) bestBuildKey = Object.keys(rawConfig.builds)[0];
            activeBuild = rawConfig.builds[bestBuildKey];
            activeBuild.key = bestBuildKey;
            scoringConfig = { ...rawConfig, ...activeBuild };
        }

        if (weapon && G_WEAPON_PASSIVES[weapon.key]) {
            const wConfig = G_WEAPON_PASSIVES[weapon.key];
            const isAdvanced = wConfig.buffs && Array.isArray(wConfig.buffs);
            const wMode = isAdvanced ? (wConfig.selectMode || 'standard') : 'standard';
            const wData = isAdvanced ? wConfig.buffs : wConfig;
            addBuffs(weapon.key, `${weapon.name} ${t('ui.buff.weapon')}`, wData, wMode, weapon.rank);
        }

        if (G_SET_PASSIVES) {
            for (const [setKey, count] of Object.entries(setsCounter)) {
                if (G_SET_PASSIVES[setKey]) {
                    const setBonuses = G_SET_PASSIVES[setKey];
                    const setName = artefacts.find(a => a.setKey === setKey)?.setName || setKey;
                    const setCategory = `${setName} ${t('ui.buff.set')}`;
                    const mode = setBonuses.selectMode || 'standard';
                    if (count >= 2 && setBonuses[2]) addBuffs(setName, setCategory, setBonuses[2], mode);
                    if (count >= 4 && setBonuses[4]) addBuffs(setName, setCategory, setBonuses[4], mode);
                }
            }
        }

        if (scoringConfig.buffs) {
            scoringConfig.buffs.forEach(group => {
                const list = group.data || group.buffs;
                if (list) {
                    const filteredBuffs = list.filter(b => {
                        if (b.cons !== undefined && constellations < b.cons) return false;
                        if (b.maxCons !== undefined && constellations > b.maxCons) return false;
                        return true;
                    });
                    if (filteredBuffs.length > 0) {
                        addBuffs(nom, getLabel(group.category), filteredBuffs, group.selectMode);
                    }
                }
            });
        }

        const buffedStats = calculateBuffedStats(baseStats, combatStats, buffs);

        const persoObj = {
            id: id, nom, rarity, level, cons: constellations, talents,
            image: sideIconUrl, splashArt: splashUrl, combatStats, buffedStats, baseStats,
            weapon, artefacts, setsCounter, buffs, evaluation: null, weights: null,
            charWeapon: charWeaponKey,
            charConfig: rawConfig,
            activeBuild: activeBuild,
            costumeId: costumeId,
            friendship: (perso.fetterInfo && perso.fetterInfo.expLevel) ? perso.fetterInfo.expLevel : 0
        };

        if (activeBuild && activeBuild.team) {
            updateResonanceBuffs(persoObj, activeBuild.team);
            updateTeammateBuffs(persoObj, activeBuild.team);
        }

        const potentialMax = calculateMaxTheoreticalScore(persoObj, scoringConfig);
        persoObj.evaluation = calculateCharacterScore(persoObj, scoringConfig, potentialMax.totalRolls);
        persoObj.weights = scoringConfig.weights;

        globalPersoData.push(persoObj);
    });

    setUserData(data, document.getElementById('uidInput')?.value.trim() || '');
    setCharacterList(globalPersoData);

    renderSidebar();
    hideSidebarNav();
    if (globalPersoData.length > 0) {
        let targetIdx = 0;
        const urlChar = new URLSearchParams(window.location.search).get('char');
        if (urlChar) {
            const found = globalPersoData.findIndex(p => p.nom.toLowerCase() === urlChar.toLowerCase());
            if (found !== -1) targetIdx = found;
        }
        renderShowcase(targetIdx);
    }
}

function renderSidebar(activeOriginalIndex = 0) {
    renderSidebarList(globalPersoData, activeOriginalIndex, sidebarSortState, (charIdx) => {
        renderShowcase(charIdx);
    });
    updateSortArrows();
}

function renderToolbar(index) {
    const p = globalPersoData[index];
    const container = document.getElementById('toolbar-controls');
    if (!container || !p) return;
    container.innerHTML = renderToolbarControls(p, index);
}

function switchBuild(charIndex, buildKey) {
    const idx = parseInt(charIndex, 10);

    const p = globalPersoData[idx];
    if (!p) return;

    const newBuild = p.charConfig.builds[buildKey];
    if (!newBuild) return;

    p.activeBuild = newBuild;
    p.activeBuild.key = buildKey;

    const newScoringConfig = { ...p.charConfig, ...newBuild };
    p.weights = newScoringConfig.weights;

    updateResonanceBuffs(p, newBuild.team);
    updateTeammateBuffs(p, newBuild.team);

    const potentialMax = calculateMaxTheoreticalScore(p, newScoringConfig);
    p.evaluation = calculateCharacterScore(p, newScoringConfig, potentialMax.totalRolls);

    renderSidebar(idx);
    renderShowcase(idx);
}

function updateResonanceBuffs(p, teamData) {
    if (!teamData) return;

    p.buffs = p.buffs.filter(b => b.category !== t('buff.category.resonance'));

    const guaranteed = {};
    const potential = {};

    const charElement = p.combatStats.dmgBonusKey ? p.combatStats.dmgBonusKey.replace('_dmg_', '') : null;
    if (charElement) guaranteed[charElement] = 1;

    teamData.forEach(mate => {
        if (typeof mate.element === 'string') {
            guaranteed[mate.element] = (guaranteed[mate.element] || 0) + 1;
        }
        else if (Array.isArray(mate.element)) {
            mate.element.forEach(el => {
                potential[el] = (potential[el] || 0) + 1;
            });
        }
    });

    Object.keys(RESONANCE_DATA).forEach(elem => {
        const countG = guaranteed[elem] || 0;
        const countP = potential[elem] || 0;
        const total = countG + countP;

        if (total >= 2) {
            const resData = RESONANCE_DATA[elem];
            const isActive = resData.active !== undefined ? resData.active : (countG >= 2);

            p.buffs.push({
                id: `res_${elem}`,
                category: t('buff.category.resonance'),
                name: resData.name,
                bonuses: resData.stats,
                active: isActive,
                selectMode: 'standard'
            });
        }
    });

    p.buffedStats = calculateBuffedStats(p.baseStats, p.combatStats, p.buffs);
}

function resolveTeammateName(name) {
    const alias = window.TEAMMATE_NAME_ALIASES?.[name];
    if (alias) return alias[window.GUOBA_LANG] ?? alias.en ?? name;

    if (window.GUOBA_LANG === 'fr') {
        return CONFIG_NAME_ALIASES_EN_TO_FR[name] ?? name;
    }
    return name;
}

function resolveTeammateNames(teamData) {
    return teamData.filter(mate => typeof mate.name === 'string');
}

function updateTeammateBuffs(p, teamData) {
    if (!teamData) return;

    p.buffs = p.buffs.filter(b => b.source !== 'teammate');

    resolveTeammateNames(teamData).forEach(mate => {
        const name = mate.name;
        const tmCons = mate.cons !== undefined ? parseInt(mate.cons) : 6;
        const categoryName = `${t('buff.category.teammate')} : ${resolveTeammateName(name)}`;

        const tmData = window.TEAMMATE_BUFFS?.[name];
        if (tmData) {
            tmData.buffs.forEach((buffDef, idx) => {
                if (buffDef.cons !== undefined && tmCons < buffDef.cons) return;
                p.buffs.push({
                    id: `tm_${name}_${idx}`,
                    category: categoryName,
                    source: 'teammate',
                    name: getLabel(buffDef.label),
                    bonuses: buffDef.stats,
                    active: buffDef.active ?? true,
                    selectMode: buffDef.selectMode || 'standard'
                });
            });
        }

        if (mate.weapon) {
            const wpnData = window.TEAMMATE_WEAPON_BUFFS?.[mate.weapon];
            if (wpnData) {
                const wpnBuffs = wpnData.buffs || [wpnData];
                const selectMode = wpnData.selectMode || 'standard';
                wpnBuffs.forEach((b, index) => {
                    p.buffs.push({
                        id: `tm_${name}_wpn_${index}`,
                        category: categoryName,
                        source: 'teammate',
                        name: getLabel(b.label) || mate.weapon,
                        bonuses: b.stats || {},
                        active: b.active ?? true,
                        selectMode: selectMode
                    });
                });
            }
        }

        if (mate.artifact) {
            if (mate.artifact === "CelestialGift") {
                const charActiveElem = p.combatStats.dmgBonusKey.replace('_dmg_', '');
                const charEquipperElem = Array.isArray(mate.element) ? mate.element[0] : mate.element;

                let dynamicBonuses = {};
                dynamicBonuses[`${charActiveElem}_dmg_`] = 0.40;
                if (charEquipperElem && charEquipperElem !== charActiveElem) {
                    dynamicBonuses[`${charEquipperElem}_dmg_`] = 0.40;
                }

                p.buffs.push({
                    id: `tm_${name}_set_celestial`,
                    category: categoryName,
                    source: 'teammate',
                    name: getLabel(window.TEAMMATE_SET_BUFFS["CelestialGift"].label),
                    bonuses: dynamicBonuses,
                    active: true,
                    selectMode: 'standard'
                });
            } else {
                const setData = window.TEAMMATE_SET_BUFFS?.[mate.artifact];
                if (setData) {
                    const setBuffs = setData.buffs || [setData];
                    const selectMode = setData.selectMode || 'standard';
                    setBuffs.forEach((b, index) => {
                        p.buffs.push({
                            id: `tm_${name}_art_${index}`,
                            category: categoryName,
                            source: 'teammate',
                            name: getLabel(b.label) || mate.artifact,
                            bonuses: b.stats || {},
                            active: b.active ?? true,
                            selectMode: selectMode
                        });
                    });
                }
            }
        }
    });

    p.buffedStats = calculateBuffedStats(p.baseStats, p.combatStats, p.buffs);
}

function enrichTeammateIcons() {
    if (!window.ITEM_ICON_MAP) return;
    for (const key of Object.keys(window.TEAMMATE_WEAPON_BUFFS || {})) {
        if (!window.TEAMMATE_WEAPON_BUFFS[key]._icon && window.ITEM_ICON_MAP[key]) {
            window.TEAMMATE_WEAPON_BUFFS[key]._icon = window.ITEM_ICON_MAP[key];
        }
    }
    for (const key of Object.keys(window.TEAMMATE_SET_BUFFS || {})) {
        if (!window.TEAMMATE_SET_BUFFS[key]._icon && window.ITEM_ICON_MAP[key]) {
            window.TEAMMATE_SET_BUFFS[key]._icon = window.ITEM_ICON_MAP[key];
        }
    }
}

function updateERTarget(index, val) {
    const p = globalPersoData[index];
    if (p.activeBuild) {
        p.activeBuild.er_req = parseInt(val);
        renderShowcase(index);
    }
}

const STATIC_PAGES = ['about', 'team', 'privacy'];

function navigateToPage(page) {
    if (page === 'home') { window.location.href = '/'; return; }
    if (!STATIC_PAGES.includes(page)) { window.location.href = '/'; return; }
    window.location.href = `/${page}`;
}

function renderStaticPage(page) {
    const menu = document.querySelector('.main-content-menu');
    if (menu) menu.style.display = 'none';

    const playerProfile = document.getElementById('player-profile');
    if (playerProfile) playerProfile.innerHTML = '';

    const evalContainer = document.getElementById('global-evaluation');
    if (evalContainer) evalContainer.style.display = 'none';

    const topHeader = document.getElementById('top-header-area');
    if (topHeader) topHeader.style.display = 'none';

    const container = document.getElementById('main-container');
    if (!container) return;

    const content = window.PAGE_CONTENTS && window.PAGE_CONTENTS[page];

    container.innerHTML = content ? content() : `<div style="padding:40px;color:var(--text-grey);">${t('error.pageNotFound')}</div>`;
    const pageTitle = t('nav.' + page);
    document.title = `${pageTitle || page} — guoba.gg`;

    updateSidebarNavActive(page);
    showSidebarNav();
}

function showSidebarNav() {
    const nav = document.getElementById('sidebar-static-nav');
    if (nav) nav.style.display = 'flex';
    const charSidebar = document.querySelector('.sidebar-characters');
    if (charSidebar) charSidebar.style.display = 'none';
}

function hideSidebarNav() {
    const nav = document.getElementById('sidebar-static-nav');
    if (nav) nav.style.display = 'none';
    const charSidebar = document.querySelector('.sidebar-characters');
    if (charSidebar) charSidebar.style.display = 'flex';
}

function updateSidebarNavActive(activePage) {
    document.querySelectorAll('.snav-item').forEach(item => {
        item.classList.toggle('snav-item--active', item.dataset.page === activePage);
    });
}

function renderHome() {
    showSidebarNav();
    updateSidebarNavActive('home');

    const container = document.getElementById('main-container');
    const profiles = getRecentProfiles();

    const menu = document.querySelector('.main-content-menu') || document.getElementById('main-content-menu');
    if (menu) menu.style.display = 'none';

    if (!container) return;

    if (profiles.length === 0) {
        container.innerHTML = `
            <div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; opacity: 0.5;">
                <img src="${ICON_BASE_PATH}icon_score.webp" style="width: 64px; height: 64px; margin-bottom: 20px; filter: grayscale(100%);">
                <h2 style="color: var(--text-primary); font-size: 24px; margin-bottom: 8px;">${t('home.empty')}</h2>
                <p style="color: var(--text-grey); font-size: 14px;">${t('home.emptyHint')}</p>
            </div>
        `;
        return;
    }

    const serverMap = {
        '1': 'CN',
        '2': 'CN',
        '3': 'CN',
        '4': 'CN',
        '5': 'TW',
        '6': 'NA',
        '7': 'EU',
        '8': 'Asia',
        '9': 'TW'
    };
    const ICON = './assets/simulator/icons/';

    const favUid = getFavoriteUid();

    const sortedProfiles = [
        ...profiles.filter(p => p.uid === favUid),
        ...profiles.filter(p => p.uid !== favUid)
    ];

    let cardsHtml = sortedProfiles.map(p => {
        const isFav = p.uid === favUid;
        const server = serverMap[String(p.uid)[0]] || 'CN';

        function stygianIcon() {
            if (p.stygianIndex === null) return '';
            if (p.stygianIndex === 6 && p.stygianSec !== null && p.stygianSec < 180) {
                return `<img src="${ICON}stygian_difficulty_6_minus_180.webp" class="pp-icon" alt="${t('ui.alt.stygian')}" decoding="async">`;
            }
            if (p.stygianIndex >= 1 && p.stygianIndex <= 6) {
                return `<img src="${ICON}stygian_difficulty_${p.stygianIndex}.webp" class="pp-icon" alt="${t('ui.alt.stygian')}" decoding="async">`;
            }
            return '';
        }

        const row1 = [
            `<span class="pp-badge pp-badge-server">${server}</span>`,
            p.achievements != null
                ? `<span class="pp-badge pp-badge-achievements"><img src="${ICON}icon_achievements.webp" class="pp-icon" alt="${t('ui.alt.achievements')}" decoding="async">${p.achievements.toLocaleString(window.GUOBA_LANG)}</span>`
                : '',
            p.ar ? `<span class="pp-badge pp-badge-ar">AR${p.ar}</span>` : '',
        ].filter(Boolean).join('');

        const row2Items = [
            p.stygianSec != null
                ? `<span class="pp-badge pp-badge-stygian">${stygianIcon()}${p.stygianSec}s</span>`
                : '',
            p.theaterStars != null
                ? `<span class="pp-badge pp-badge-theater"><img src="${ICON}icon_theater_star.webp" class="pp-icon" alt="${t('ui.alt.theater')}" decoding="async">${p.theaterStars}</span>`
                : '',
            p.abyssStars != null
                ? `<span class="pp-badge pp-badge-abyss"><img src="${ICON}icon_abyss_star.webp" class="pp-icon" alt="${t('ui.alt.abyss')}" decoding="async">${p.abyssStars}</span>`
                : '',
        ].filter(Boolean);
        const row2 = row2Items.join('');

        return `
        <div onclick="document.getElementById('uidInput').value = '${p.uid}'; fetchUserData();" 
            style="width: 480px; height: 82px; position: relative; cursor: pointer; transition: transform 0.2s;"             
            onmouseover="this.style.transform='scale(1.02)';"
            onmouseout="this.style.transform='scale(1)';">
             
            <!-- Bouton Favori -->
            <div onclick="toggleFavoriteProfile('${p.uid}', event)"
                 title="${isFav ? t('home.unpinAccount') : t('home.pinAccount')}"
                 style="position: absolute; top: -6px; left: -6px; width: 22px; height: 22px; display: ${isFav || !favUid ? 'flex' : 'none'}; align-items: center; justify-content: center; border-radius: 50%; background: ${isFav ? 'rgba(255,177,59,0.95)' : 'rgba(60,62,70,0.92)'}; color: ${isFav ? 'var(--text-primary)' : 'var(--text-muted)'}; font-size: 11px; z-index: 50; box-shadow: 0 2px 4px rgba(0,0,0,0.5); transition: 0.2s; cursor: pointer;"
                 onmouseover="this.style.background='${isFav ? 'rgba(220,140,0,1)' : 'rgba(90,92,100,1)'}'; this.style.transform='scale(1.15)';"
                 onmouseout="this.style.background='${isFav ? 'rgba(255,177,59,0.95)' : 'rgba(60,62,70,0.92)'}'; this.style.transform='scale(1)';">
                 ${isFav ? '★' : '☆'}
            </div>

            <!-- Bouton Supprimer -->
            <div onclick="deleteRecentProfile('${p.uid}', event)" 
                 style="position: absolute; top: -6px; right: -6px; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: rgba(239, 68, 68, 0.9); color: var(--text-primary); font-size: 12px; z-index: 50; box-shadow: 0 2px 4px rgba(0,0,0,0.5); transition: 0.2s;"
                 onmouseover="this.style.background='rgba(220, 38, 38, 1)'; this.style.transform='scale(1.1)';"
                 onmouseout="this.style.background='rgba(239, 68, 68, 0.9)'; this.style.transform='scale(1)';">
                 ✕
            </div>

            <div class="player-profile-card" style="margin: 0; width: 100%; height: 100%; box-sizing: border-box; pointer-events: none;">
                <div class="player-profile-bg" ${p.banner ? `style="background-image:url('${p.banner}')"` : ''}></div>
                <div class="player-profile-content">
                    <img class="player-profile-avatar" src="${p.pic}" onerror="this.src='https://enka.network/ui/UI_AvatarIcon_PlayerBoy_Circle.png'" decoding="async">
                    <div class="player-profile-identity">
                        <div class="player-profile-name-row">
                            <span class="player-profile-name">${p.nickname}</span>
                        </div>
                        ${p.signature ? `<span class="player-profile-sig">${p.signature}</span>` : ''}
                        <span class="player-profile-sig" style="opacity: 0.5;">UID: ${p.uid}</span>
                    </div>
                    <div class="player-profile-stats">
                        <div class="pp-row">${row1}</div>
                        ${row2 ? `<div class="pp-row">${row2}</div>` : ''}
                    </div>
                </div>
            </div>
            
        </div>
        `;
    }).join('');
    const savedTheme = localStorage.getItem('guoba_theme') || 'wish';
    container.innerHTML = `
        <div style="padding-left: 20px; padding-top: 40px;">
            <h2 style="color: var(--text-primary); font-size: 28px; margin-bottom: 10px;">${t('home.title')}</h2>
            <p style="max-width:980px; color: var(--text-grey); font-size: 14px; margin-bottom: 30px;">${t('home.subtitle')}</p>
            <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-left: 20px;">
                ${cardsHtml}
            </div>
            <p style="color: var(--text-grey); font-size: 12px; margin-bottom: 16px; margin-top: 32px; margin-left: 12px;">
                ${t('home.legal')} <br><br>
                ${t('home.enkaCredit')} <br>
                ${t('home.designCredit')}
            </p>    
            <div style="margin-left: 12px; margin-bottom: 16px; display: flex; align-items: center;">
                <a class="made-with-astro" href="https://astro.build" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                        <path d="M8.358 20.162c-1.186-1.07-1.532-3.316-1.038-4.944.856 1.026 2.043 1.352 3.272 1.535 1.897.283 3.76.177 5.522-.678.202-.098.388-.229.608-.36.166.473.209.95.151 1.437-.14 1.185-.738 2.1-1.688 2.794-.38.277-.782.525-1.175.787-1.205.804-1.531 1.747-1.078 3.119l.044.148a3.158 3.158 0 0 1-1.407-1.188 3.31 3.31 0 0 1-.544-1.815c-.004-.32-.004-.642-.048-.958-.106-.769-.472-1.113-1.161-1.133-.707-.02-1.267.411-1.415 1.09-.012.053-.028.104-.045.165h.002zm-5.961-4.445s3.24-1.575 6.49-1.575l2.451-7.565c.092-.366.36-.614.662-.614.302 0 .57.248.662.614l2.45 7.565c3.85 0 6.491 1.575 6.491 1.575L16.088.727C15.93.285 15.663 0 15.303 0H8.697c-.36 0-.615.285-.784.727l-5.516 14.99z"/>
                    </svg>
                    <span>${t('home.madeWithAstro')}</span>
                </a>
            </div>
            <div class="links" style="max-width:980px;display: flex; flex-direction: row; margin-bottom: 48px; gap: 8px; align-items: center;">
                <a class="link-button" href="https://discord.gg/CZ5qxVqBVJ" target="_blank" rel="noopener noreferrer"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 6px;"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>Discord</a>
                <a class="link-button-coffee" href="https://ko-fi.com/guobagg" target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn.prod.website-files.com/5c14e387dab576fe667689cf/670f5a01229bf8a18f97a3c1_favion.png" alt="Icône Discord" width="20" height="20">Buy me a coffee
                </a>    
                <div style="margin-left: auto; display: flex; gap: 8px;">
                    
                    <div class="custom-select-container">
                        <button onclick="toggleThemeMenu(event)" class="link-button" style="width: 100%; justify-content: space-between; border:none; background: var(--bg-panel); color: var(--text-primary); padding: 0 16px 0 12px; border-radius: 8px; cursor: pointer; font-family: inherit; font-size: 14px; font-weight: 500; outline: none; height: 38px; display: flex; align-items: center;">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <span class="theme-dot" id="active-theme-dot" style="background: ${THEME_COLORS[savedTheme] || THEME_COLORS['wish']};"></span>
                                <span id="active-theme-text">${t('theme.' + savedTheme)}</span>
                            </div>
                            <img src="assets/simulator/icons/icon_arrow_down_white.svg" alt="" class="sort-arrow" id="arrow-original" style="font-size: 12px; opacity: 0.6; margin-left: 8px;">
                        </button>

                        <div id="theme-custom-menu" class="custom-select-menu">
                            <div class="custom-select-item" onclick="selectCustomTheme('dark', '${t('theme.dark')}')">
                                <span class="theme-dot" style="background: #323338;"></span> ${t('theme.dark')}
                            </div>
                            <div class="custom-select-item" onclick="selectCustomTheme('abyssal', '${t('theme.abyssal')}')">
                                <span class="theme-dot" style="background: #000000;"></span> ${t('theme.abyssal')}
                            </div>
                            <div class="custom-select-item" onclick="selectCustomTheme('sea', '${t('theme.sea')}')">
                                <span class="theme-dot" style="background: #15223B;"></span> ${t('theme.sea')}
                            </div>
                            <div class="custom-select-item" onclick="selectCustomTheme('wish', '${t('theme.wish')}')">
                                <span class="theme-dot" style="background: #181926;"></span> ${t('theme.wish')}
                            </div>
                            <div class="custom-select-item" onclick="selectCustomTheme('guild', '${t('theme.guild')}')">
                                <span class="theme-dot" style="background: #2F2620;"></span> ${t('theme.guild')}
                            </div>
                        </div>
                    </div>

                    <div class="custom-select-container">
                        <button onclick="toggleLangMenu(event)" class="link-button" style="justify-content: space-between; border:none; background: var(--bg-panel); color: var(--text-primary); padding: 0 12px; border-radius: 8px; cursor: pointer; font-family: inherit; font-size: 14px; font-weight: 500; outline: none; height: 38px; display: flex; align-items: center;">
                            <span>${window.GUOBA_LANG.toUpperCase()}</span>
                            <img src="assets/simulator/icons/icon_arrow_down_white.svg" alt="" class="sort-arrow" id="arrow-original" style="font-size: 12px; opacity: 0.6; margin-left: 8px;">
                        </button>

                        <div id="lang-custom-menu" class="custom-select-menu" style="min-width: 69px;">
                            <div class="custom-select-item" onclick="guobaSetLang('fr')">
                                FR
                            </div>
                            <div class="custom-select-item" onclick="guobaSetLang('en')">
                                EN
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    `;
}

if (!document.getElementById('global-tooltip')) {
    const tooltip = document.createElement('div');
    tooltip.id = 'global-tooltip';
    document.body.appendChild(tooltip);
}

window.showGlobalTooltip = function (element, text, color) {
    const tooltip = document.getElementById('global-tooltip');
    tooltip.innerHTML = text;
    tooltip.style.setProperty('--tooltip-color', color);

    const rect = element.getBoundingClientRect();

    tooltip.style.left = (rect.left + rect.width / 2) + 'px';
    tooltip.style.top = rect.bottom + 'px';

    tooltip.style.visibility = 'visible';
    tooltip.style.opacity = '1';
};

window.hideGlobalTooltip = function () {
    const tooltip = document.getElementById('global-tooltip');
    if (tooltip) {
        tooltip.style.visibility = 'hidden';
        tooltip.style.opacity = '0';
    }
};

function renderGlobalEvaluation(playerInfo) {
    let topHeader = document.getElementById("top-header-area");
    if (!topHeader) {
        topHeader = document.createElement("div");
        topHeader.id = "top-header-area";
        const pp = document.getElementById("player-profile");
        if (pp && pp.parentNode) {
            pp.parentNode.insertBefore(topHeader, pp);
            const evalDiv = document.createElement("div");
            evalDiv.id = "global-evaluation";
            topHeader.appendChild(evalDiv);
            topHeader.appendChild(pp);
        }
    }
    if (topHeader) topHeader.style.display = "flex";

    const currentUidStr = document.getElementById("uidInput") ? document.getElementById("uidInput").value.trim() : "";
    renderGlobalEvaluationComponent(playerInfo, globalPersoData, currentUidStr);
}

function statLine(svg, label, val, isHighlight = false) {
    return `
        <div class="stat-row" style="filter: none; justify-content: space-between; align-items: center; display: flex; box-sizing: border-box;">
            ${svg}
            <p>${label}</p>
            <div class="dotted-line"></div> 
            <p class="stat-val" style="${isHighlight ? "color:var(--accent-gold)" : ""} ">${val}</p>
        </div>`;
}

function renderShowcase(index) {
    const p = globalPersoData[index];
    const container = document.getElementById("main-container");
    if (!container || !p) return;

    if (window.currentPlayerNickname) {
        document.title = t("page.title.char", p.nom, window.currentPlayerNickname);

        const ogTitle = t("meta.og.title.char", p.nom, window.currentPlayerNickname);
        const ogDesc = t("meta.og.description.char", p.nom);

        const updateMeta = (selector, val) => {
            const el = document.querySelector(selector);
            if (el) el.setAttribute("content", val);
        };

        updateMeta('meta[property="og:title"]', ogTitle);
        updateMeta('meta[property="og:description"]', ogDesc);
        updateMeta('meta[name="twitter:title"]', ogTitle);
        updateMeta('meta[name="twitter:description"]', ogDesc);
    }

    const currentUid = new URLSearchParams(window.location.search).get('uid') || (document.getElementById('uidInput') ? document.getElementById('uidInput').value.trim() : '');
    if (!window._isPopstate && currentUid && p && (p.nom || p.name)) {
        const charName = p.nom || p.name;
        const lang = localStorage.getItem('guoba_lang') || 'fr';
        window.history.replaceState({ uid: currentUid, char: charName }, '', `/?uid=${encodeURIComponent(currentUid)}&char=${encodeURIComponent(charName)}&lang=${lang}`);
    }

    document.querySelectorAll('#sidebar-list .char-card').forEach((card) => {
        if (parseInt(card.dataset.originalIndex) === parseInt(index)) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });

    const menu = document.querySelector('.main-content-menu') || document.getElementById('main-content-menu');
    const menuContainer = document.querySelector('.main-content-menu-container') || document.getElementById('main-content-menu-container');

    if (menu) menu.style.display = 'flex';
    if (menuContainer) menuContainer.style.display = 'flex';

    container.innerHTML = renderShowcaseComponent(p, index);
    renderToolbar(index);
    selectCharacter(index);
}

loadGameData();

function setupUidInputBinding() {
    const uidInput = document.getElementById('uidInput');
    if (uidInput && !uidInput.dataset.keyBound) {
        uidInput.dataset.keyBound = 'true';
        uidInput.focus();
        uidInput.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                fetchUserData();
            }
        });
    }
}
setupUidInputBinding();

window.exportBuildAsImage = async function () {
    const element = document.querySelector('.top-row');
    if (!element) return alert(t('error.noBuild'));

    const btn = document.querySelector('button[onclick="exportBuildAsImage()"]');
    const originalContent = btn ? btn.innerHTML : t('ui.exportBtn');
    if (btn) btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation: spin 1s linear infinite; display: inline-block; vertical-align: middle; margin-right: 5px;"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg> ${t('export.processing')}`;

    const bgDiv = element.querySelector('.background-splash-art');
    let originalBgImage = "";

    if (bgDiv) {
        try {
            const computedStyle = window.getComputedStyle(bgDiv);
            const bgUrlMatch = computedStyle.backgroundImage.match(/url\(["']?([^"']*)["']?\)/);

            if (bgUrlMatch && bgUrlMatch[1]) {
                const imgUrl = bgUrlMatch[1];
                originalBgImage = bgDiv.style.backgroundImage;

                const proxyUrl = 'https://wsrv.nl/?url=' + encodeURIComponent(imgUrl) + '&output=png';

                const res = await fetch(proxyUrl);
                if (!res.ok) throw new Error("Erreur wsrv : " + res.status);

                const blob = await res.blob();
                const reader = new FileReader();

                await new Promise((resolve, reject) => {
                    reader.onloadend = resolve;
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                });

                if (reader.result) {
                    bgDiv.style.backgroundImage = `url('${reader.result}')`;
                }
            }
        } catch (e) {
            console.warn("Le fond n'a pas pu être chargé (export continu sans fond) :", e);
        }
    }

    await new Promise(r => setTimeout(r, 50));
    element.classList.add('export-mode');
    const exportWidth = 1153;
    const exportHeight = 856;

    let domtoimage = window.domtoimage;
    if (!domtoimage) {
        const mod = await import('dom-to-image-more');
        domtoimage = mod.default || mod;
    }

    domtoimage.toPng(element, {
        bgcolor: null,
        scale: 2,
        width: exportWidth,
        height: exportHeight,
        style: {
            width: `${exportWidth}px`,
            height: `${exportHeight}px`,
            overflow: 'visible',
            margin: '0',
            padding: '0'
        },
        filter: (node) => true
    })
        .then(function (dataUrl) {
            const nameEl = document.querySelector('.showcase-area-base-stats h2');
            const charName = nameEl ? nameEl.innerText.trim() : 'Genshin_Build';

            const uidInput = document.getElementById('uidInput');
            const uid = uidInput ? uidInput.value.trim() : '';

            const fileName = uid ? `Build_${charName}_${uid}.png` : `Build_${charName}.png`;

            const link = document.createElement('a');
            link.download = fileName;
            link.href = dataUrl;
            link.click();
        })
        .catch(function (error) {
            console.error('Erreur export dom-to-image :', error);
            alert(t('error.exportFail'));
        })
        .finally(function () {
            element.classList.remove('export-mode');
            if (bgDiv && originalBgImage) {
                bgDiv.style.backgroundImage = originalBgImage;
            }
            if (btn) btn.innerHTML = originalContent;
        });
};

function initMainPageApp() {
    setupUidInputBinding();

    const isMainPage = !!document.getElementById('sort-col-original');
    if (!isMainPage) return;

    const urlParams = new URLSearchParams(window.location.search);
    const urlUid = urlParams.get('uid');
    const urlChar = urlParams.get('char');

    const urlPage = urlParams.get('page');
    if (urlPage && STATIC_PAGES.includes(urlPage)) {
        window.location.href = `/${urlPage}`;
        return;
    }

    if (urlUid) {
        const uidInput = document.getElementById('uidInput');
        if (uidInput) uidInput.value = urlUid;

        fetchUserData(urlUid).then(() => {
            toggleSearchIcon(true);

            if (urlChar && globalPersoData && globalPersoData.length > 0) {
                const targetIndex = globalPersoData.findIndex(p => p.nom.toLowerCase() === urlChar.toLowerCase());

                if (targetIndex !== -1) {
                    renderShowcase(targetIndex);
                }
            }
        }).catch(err => {
            console.error("Erreur lors du chargement via URL :", err);
            const uidInput = document.getElementById('uidInput');
            if (uidInput) uidInput.value = '';
            window.history.replaceState({}, '', window.location.pathname);
            renderHome();
            const loader = document.getElementById('loading-msg');
            if (loader) {
                loader.innerText = t('error.invalidLink');
                loader.style.color = "#ef4444";
                setTimeout(() => {
                    loader.innerText = "";
                    loader.style.color = "";
                }, 5000);
            }
        });
    } else {
        if (!globalPersoData || globalPersoData.length === 0) {
            renderHome();
        }
    }
}

document.addEventListener('astro:page-load', initMainPageApp);
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMainPageApp);
} else {
    initMainPageApp();
}

window.addEventListener('popstate', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const uid = urlParams.get('uid');
    const char = urlParams.get('char');
    const page = urlParams.get('page');

    if (page && STATIC_PAGES.includes(page)) {
        window.location.href = `/${page}`;
        return;
    }

    if (!uid) {
        clearSearch();
        return;
    }

    if (char && globalPersoData.length > 0) {
        const targetIndex = globalPersoData.findIndex(
            p => p.nom.toLowerCase() === char.toLowerCase()
        );
        if (targetIndex !== -1) {
            window._isPopstate = true;
            renderShowcase(targetIndex);
            window._isPopstate = false;
        }
    }
});

if (typeof window !== 'undefined') {
    window.createIcon = createIcon;
    window.getRollDetails = getRollDetails;
    window.getRollCount = getRollCount;
    window.toggleThemeMenu = toggleThemeMenu;
    window.toggleLangMenu = toggleLangMenu;
    window.selectCustomTheme = selectCustomTheme;
    window.changeTheme = changeTheme;
    window.toggleBuildMenu = toggleBuildMenu;
    window.toggleErMenu = toggleErMenu;
    window.closeAllDataMenus = closeAllDataMenus;
    window.selectCustomBuild = selectCustomBuild;
    window.selectCustomER = selectCustomER;
    window.setSidebarSort = setSidebarSort;
    window.updateSortArrows = updateSortArrows;
    window.getRecentProfiles = getRecentProfiles;
    window.getFavoriteUid = getFavoriteUid;
    window.setFavoriteUid = setFavoriteUid;
    window.toggleFavoriteProfile = toggleFavoriteProfile;
    window.saveRecentProfile = saveRecentProfile;
    window.deleteRecentProfile = deleteRecentProfile;
    window.showSkeletonCard = showSkeletonCard;
    window.loadGameData = loadGameData;
    window.toggleSearchIcon = toggleSearchIcon;
    window.clearSearch = clearSearch;
    window.fetchUserData = fetchUserData;
    window.renderPlayerProfile = renderPlayerProfile;
    window.getText = getText;
    window.getLabel = getLabel;
    window.buildHashToKey = buildHashToKey;
    window.formatValueDisplay = formatValueDisplay;
    window.formatStat = formatStat;
    window.calculateBuffedStats = calculateBuffedStats;
    window.applyBonus = applyBonus;
    window.getShortKey = getShortKey;
    window.mapTargetKey = mapTargetKey;
    window.toggleBuff = toggleBuff;
    window.generateScoreBar = generateScoreBar;
    window.calculateMaxTheoreticalScore = calculateMaxTheoreticalScore;
    window.getCritAdvice = getCritAdvice;
    window.getSetRecommendation = getSetRecommendation;
    window.getMainStatAdvice = getMainStatAdvice;
    window.getFarmDifficulty = getFarmDifficulty;
    window.getOffPieceAdvice = getOffPieceAdvice;
    window.getTalentAdvice = getTalentAdvice;
    window.getSetForcingAdvice = getSetForcingAdvice;
    window.getMetaSetAdvice = getMetaSetAdvice;
    window.getWeaponAdvice = getWeaponAdvice;
    window.getERAdvice = getERAdvice;
    window.getLevelAdvice = getLevelAdvice;
    window.calculateRollDistribution = calculateRollDistribution;
    window.calculateDeadRolls = calculateDeadRolls;
    window.getAllCrossCheckAdvice = getAllCrossCheckAdvice;
    window.getResinCostEstimate = getResinCostEstimate;
    window.getPriorities = getPriorities;
    window.calculateRNGQuality = calculateRNGQuality;
    window.simulateDeadStatReplacements = simulateDeadStatReplacements;
    window.calculateRerollMetrics = calculateRerollMetrics;
    window.getRefinedValue = getRefinedValue;
    window.resolveCharConfig = resolveCharConfig;
    window.processData = processData;
    window.renderSidebar = renderSidebar;
    window.renderToolbar = renderToolbar;
    window.switchBuild = switchBuild;
    window.updateResonanceBuffs = updateResonanceBuffs;
    window.resolveTeammateName = resolveTeammateName;
    window.resolveTeammateNames = resolveTeammateNames;
    window.updateTeammateBuffs = updateTeammateBuffs;
    window.enrichTeammateIcons = enrichTeammateIcons;
    window.updateERTarget = updateERTarget;
    window.navigateToPage = navigateToPage;
    window.renderStaticPage = renderStaticPage;
    window.showSidebarNav = showSidebarNav;
    window.hideSidebarNav = hideSidebarNav;
    window.updateSidebarNavActive = updateSidebarNavActive;
    window.renderHome = renderHome;
    window.renderGlobalEvaluation = renderGlobalEvaluation;
    window.statLine = statLine;
    window.renderShowcase = renderShowcase;
}
