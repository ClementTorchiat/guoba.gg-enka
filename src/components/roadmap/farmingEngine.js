// src/components/roadmap/farmingEngine.js
import FARMING_DOMAINS from '../../data/farming_domains.json';
import CHARACTER_MATERIALS from '../../data/character_materials.json';
import WEAPON_MATERIALS from '../../data/weapon_materials.json';
import WEAPON_NAME_MAPPING from '../../data/weapon_name_mapping.json';
import CONFIG_NAME_ALIASES_EN_TO_FR from '../../data/config_name_aliases_en_to_fr.json';
import { t, LANG } from '../../scripts/i18n.js';

const ICON_BASE_PATH = "/assets/simulator/icons/";

/**
 * Résout le nom localisé d'un matériau ou domaine avec repli sécurisé sur l'anglais si 'fr' est vide.
 */
export function getLocalizedItemName(nameObj, currentLang = LANG, defaultVal = '') {
    if (!nameObj) return defaultVal;
    if (typeof nameObj === 'string') return nameObj;
    const current = nameObj[currentLang];
    if (current && typeof current === 'string' && current.trim().length > 0) return current;
    const fr = nameObj.fr;
    if (fr && typeof fr === 'string' && fr.trim().length > 0) return fr;
    const en = nameObj.en;
    if (en && typeof en === 'string' && en.trim().length > 0) return en;
    return defaultVal;
}

// Table universelle officielle du coût par palier de niveau d'aptitude (2 à 10)
export const TALENT_COST_PER_LEVEL = {
    2: { teachings: 3, guides: 0, philosophies: 0, weeklyBoss: 0, crown: 0, mora: 12500 },
    3: { teachings: 0, guides: 2, philosophies: 0, weeklyBoss: 0, crown: 0, mora: 17500 },
    4: { teachings: 0, guides: 4, philosophies: 0, weeklyBoss: 0, crown: 0, mora: 25000 },
    5: { teachings: 0, guides: 6, philosophies: 0, weeklyBoss: 0, crown: 0, mora: 30000 },
    6: { teachings: 0, guides: 9, philosophies: 0, weeklyBoss: 0, crown: 0, mora: 37500 },
    7: { teachings: 0, guides: 0, philosophies: 4, weeklyBoss: 1, crown: 0, mora: 120000 },
    8: { teachings: 0, guides: 0, philosophies: 6, weeklyBoss: 1, crown: 0, mora: 260000 },
    9: { teachings: 0, guides: 0, philosophies: 12, weeklyBoss: 2, crown: 0, mora: 450000 },
    10: { teachings: 0, guides: 0, philosophies: 16, weeklyBoss: 2, crown: 1, mora: 700000 }
};

// Table universelle des matériaux requis par palier d'élévation d'arme (selon rareté 3★, 4★, 5★)
export const WEAPON_ASCENSION_COSTS = {
    5: {
        1: { green: 5, blue: 0, purple: 0, gold: 0, mora: 10000 },
        2: { green: 0, blue: 5, purple: 0, gold: 0, mora: 20000 },
        3: { green: 0, blue: 9, purple: 0, gold: 0, mora: 30000 },
        4: { green: 0, blue: 0, purple: 5, gold: 0, mora: 45000 },
        5: { green: 0, blue: 0, purple: 9, gold: 0, mora: 55000 },
        6: { green: 0, blue: 0, purple: 0, gold: 6, mora: 65000 }
    },
    4: {
        1: { green: 3, blue: 0, purple: 0, gold: 0, mora: 5000 },
        2: { green: 0, blue: 3, purple: 0, gold: 0, mora: 15000 },
        3: { green: 0, blue: 6, purple: 0, gold: 0, mora: 20000 },
        4: { green: 0, blue: 0, purple: 3, gold: 0, mora: 30000 },
        5: { green: 0, blue: 0, purple: 6, gold: 0, mora: 35000 },
        6: { green: 0, blue: 0, purple: 0, gold: 4, mora: 45000 }
    },
    3: {
        1: { green: 2, blue: 0, purple: 0, gold: 0, mora: 5000 },
        2: { green: 0, blue: 2, purple: 0, gold: 0, mora: 10000 },
        3: { green: 0, blue: 4, purple: 0, gold: 0, mora: 15000 },
        4: { green: 0, blue: 0, purple: 2, gold: 0, mora: 20000 },
        5: { green: 0, blue: 0, purple: 4, gold: 0, mora: 25000 },
        6: { green: 0, blue: 0, purple: 0, gold: 3, mora: 30000 }
    }
};

// Indexation rapide des 24 rotations de livres et 24 rotations d'armes
const DOMAIN_BY_ID_MAP = {};
const BOOK_ROTATION_MAP = {};
const WEAPON_ROTATION_MAP = {};

if (Array.isArray(FARMING_DOMAINS)) {
    FARMING_DOMAINS.forEach(dom => {
        DOMAIN_BY_ID_MAP[dom.id] = dom;
        if (Array.isArray(dom.rotations)) {
            dom.rotations.forEach(rot => {
                const entry = {
                    domainId: dom.id,
                    domainName: dom.name,
                    region: dom.region,
                    category: dom.category,
                    days: rot.days || [],
                    name: rot.name,
                    items: rot.items
                };
                if (dom.category === 'weapon') {
                    WEAPON_ROTATION_MAP[rot.itemKey] = entry;
                } else {
                    BOOK_ROTATION_MAP[rot.itemKey] = entry;
                }
            });
        }
    });
}

// Table inverse des alias FR -> EN
const ALIASES_FR_TO_EN = {};
if (CONFIG_NAME_ALIASES_EN_TO_FR) {
    for (const [en, fr] of Object.entries(CONFIG_NAME_ALIASES_EN_TO_FR)) {
        ALIASES_FR_TO_EN[fr] = en;
        ALIASES_FR_TO_EN[fr.replace(/ /g, '_')] = en;
    }
}

/**
 * Résout les métadonnées de matériaux d'un personnage à partir de son nom.
 * @param {string} charNom 
 * @returns {Object|null}
 */
export function resolveCharacterMaterials(charNom) {
    if (!charNom) return null;

    // 1. Clé exacte
    if (CHARACTER_MATERIALS[charNom]) return CHARACTER_MATERIALS[charNom];

    // 2. Remplacement des espaces par underscores
    const withUnderscore = charNom.replace(/ /g, '_');
    if (CHARACTER_MATERIALS[withUnderscore]) return CHARACTER_MATERIALS[withUnderscore];

    // 3. Traduction inverse FR -> EN
    const enName = ALIASES_FR_TO_EN[charNom] || ALIASES_FR_TO_EN[withUnderscore];
    if (enName) {
        if (CHARACTER_MATERIALS[enName]) return CHARACTER_MATERIALS[enName];
        const enUnderscore = enName.replace(/ /g, '_');
        if (CHARACTER_MATERIALS[enUnderscore]) return CHARACTER_MATERIALS[enUnderscore];
    }

    // 4. Recherche insensible à la casse / normalisée
    const norm = charNom.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    for (const [key, data] of Object.entries(CHARACTER_MATERIALS)) {
        const keyNorm = key.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        if (keyNorm === norm) return data;
    }

    return null;
}

/**
 * Récupère les données complètes de rotation et domaine pour une clé de livre donnée.
 * @param {string} bookKey 
 * @returns {Object|null}
 */
export function resolveBookRotation(bookKey) {
    if (!bookKey) return null;
    return BOOK_ROTATION_MAP[bookKey] || null;
}

/**
 * Résout les métadonnées d'une arme à partir de sa clé PascalCase ou de son nom localisé.
 * @param {string} keyOrName 
 * @returns {Object|null}
 */
export function resolveWeaponMaterials(keyOrName) {
    if (!keyOrName) return null;
    if (WEAPON_MATERIALS && WEAPON_MATERIALS[keyOrName]) return WEAPON_MATERIALS[keyOrName];
    if (WEAPON_NAME_MAPPING && WEAPON_NAME_MAPPING[keyOrName]) {
        const mapped = WEAPON_NAME_MAPPING[keyOrName];
        if (WEAPON_MATERIALS && WEAPON_MATERIALS[mapped]) return WEAPON_MATERIALS[mapped];
    }
    const norm = String(keyOrName).replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    if (WEAPON_MATERIALS) {
        for (const [k, v] of Object.entries(WEAPON_MATERIALS)) {
            if (k.toLowerCase() === norm) return v;
        }
    }
    return null;
}

/**
 * Récupère les données complètes de rotation et domaine pour une clé de matériau d'arme donnée.
 * @param {string} matKey 
 * @returns {Object|null}
 */
export function resolveWeaponRotation(matKey) {
    if (!matKey) return null;
    return WEAPON_ROTATION_MAP[matKey] || null;
}

/**
 * Calcule les matériaux d'arme requis de l'élévation curAsc à tgtAsc.
 * @param {number} rarity 3, 4 ou 5
 * @param {number} fromAsc 0 à 6
 * @param {number} toAsc 1 à 6
 * @returns {Object}
 */
export function calculateWeaponCost(rarity = 4, fromAsc = 0, toAsc = 6) {
    const star = [3, 4, 5].includes(parseInt(rarity, 10)) ? parseInt(rarity, 10) : 4;
    const curAsc = Math.max(0, Math.min(6, parseInt(fromAsc, 10) || 0));
    const tgtAsc = Math.max(curAsc, Math.min(6, parseInt(toAsc, 10) || 6));

    const cost = {
        green: 0,
        blue: 0,
        purple: 0,
        gold: 0,
        mora: 0,
        estimatedResin: 0,
        estimatedRuns: 0
    };

    if (curAsc >= tgtAsc) return cost;

    const table = WEAPON_ASCENSION_COSTS[star];
    for (let asc = curAsc + 1; asc <= tgtAsc; asc++) {
        const step = table[asc];
        if (step) {
            cost.green += step.green;
            cost.blue += step.blue;
            cost.purple += step.purple;
            cost.gold += step.gold;
            cost.mora += step.mora;
        }
    }

    // Equivalent vert (3:1 pour chaque rang)
    const greenEq = cost.green + (cost.blue * 3) + (cost.purple * 9) + (cost.gold * 27);
    // Moyenne ~16.7 équivalents verts par run de 20 résines
    cost.estimatedRuns = Math.ceil(greenEq / 16.7);
    cost.estimatedResin = cost.estimatedRuns * 20;

    return cost;
}

/**
 * Analyse l'arme d'un personnage et détermine si elle nécessite des matériaux de donjon.
 * @param {Object} perso 
 * @returns {Object|null}
 */
export function getWeaponFarmingNeeds(perso) {
    if (!perso || !perso.weapon) return null;

    const w = perso.weapon;
    const wLvl = Number(w.level) || 1;
    let wAsc = w.ascension !== undefined ? Number(w.ascension) : (w.promoteLevel !== undefined ? Number(w.promoteLevel) : undefined);

    if (wAsc === undefined) {
        if (wLvl >= 80) wAsc = 6;
        else if (wLvl >= 70) wAsc = 5;
        else if (wLvl >= 60) wAsc = 4;
        else if (wLvl >= 50) wAsc = 3;
        else if (wLvl >= 40) wAsc = 2;
        else if (wLvl >= 20) wAsc = 1;
        else wAsc = 0;
    }

    // Une arme est considérée terminée si elle est niveau 90 ou (niveau >= 80 avec ascension 6)
    const isMaxed = (wLvl >= 90) || (wLvl >= 80 && wAsc >= 6);
    if (isMaxed) return null;

    const keyOrName = w.key || w.name;
    const weaponMats = resolveWeaponMaterials(keyOrName) || {};
    const rarity = weaponMats.rarity || w.stars || w.rankLevel || 4;
    const weaponRotation = resolveWeaponRotation(weaponMats.materialKey);

    const totalCost = calculateWeaponCost(rarity, wAsc, 6);

    return {
        type: 'weapon',
        charNom: perso.nom,
        charAvatar: perso.image ? perso.image.replace(/_Side_/g, '_').replace(/Side_/g, '') : '',
        weaponKey: w.key || w.name,
        weaponName: w.name || w.key || 'Arme',
        weaponIcon: w.icon || `${ICON_BASE_PATH}icon_weapon.svg`,
        rarity,
        currentLvl: wLvl,
        currentAsc: wAsc,
        targetLvl: 90,
        targetAsc: 6,
        weaponRotation,
        weaponMaterials: weaponMats,
        totalCost
    };
}

/**
 * Calcule les matériaux exacts requis pour faire progresser une aptitude de fromLvl à toLvl.
 * @param {number} fromLvl 
 * @param {number} toLvl 
 * @returns {Object}
 */
export function calculateTalentCost(fromLvl, toLvl) {
    const cur = Math.max(1, parseInt(fromLvl, 10) || 1);
    const target = Math.min(10, parseInt(toLvl, 10) || 1);

    const cost = {
        teachings: 0,
        guides: 0,
        philosophies: 0,
        weeklyBoss: 0,
        crown: 0,
        mora: 0,
        equivalentPhilosophies: 0,
        estimatedResin: 0,
        estimatedRuns: 0
    };

    if (cur >= target) return cost;

    for (let lvl = cur + 1; lvl <= target; lvl++) {
        const step = TALENT_COST_PER_LEVEL[lvl];
        if (step) {
            cost.teachings += step.teachings;
            cost.guides += step.guides;
            cost.philosophies += step.philosophies;
            cost.weeklyBoss += step.weeklyBoss;
            cost.crown += step.crown;
            cost.mora += step.mora;
        }
    }

    const eqPhil = cost.philosophies + (cost.guides / 3) + (cost.teachings / 9);
    cost.equivalentPhilosophies = Math.round(eqPhil * 10) / 10;
    cost.estimatedResin = Math.ceil(eqPhil * 18);
    cost.estimatedRuns = Math.ceil(cost.estimatedResin / 20);

    return cost;
}

/**
 * Analyse un personnage et détermine l'ensemble de ses besoins en aptitudes et en élévation.
 * @param {Object} perso 
 * @returns {Object|null}
 */
export function getCharacterFarmingNeeds(perso) {
    if (!perso) return null;

    const charNom = perso.nom || '';
    const config = perso.activeBuild ? { ...perso.charConfig, ...perso.activeBuild } : (perso.charConfig || {});
    const matData = resolveCharacterMaterials(charNom) || {};
    const bookRotation = resolveBookRotation(matData.talentBookKey);

    const targets = (config.talents && typeof config.talents.auto === 'number')
        ? config.talents
        : (config.talents?.target || config.talents || { auto: 1, skill: 8, burst: 8 });

    const keyMap = ['auto', 'skill', 'burst'];
    const talentGaps = [];

    const totalCost = {
        teachings: 0,
        guides: 0,
        philosophies: 0,
        weeklyBoss: 0,
        crown: 0,
        mora: 0,
        estimatedResin: 0,
        estimatedRuns: 0
    };

    keyMap.forEach((key, index) => {
        let currentLvl = 1;
        let talentIcon = null;

        if (Array.isArray(perso.talents) && perso.talents[index]) {
            currentLvl = Number(perso.talents[index].level) || 1;
            talentIcon = perso.talents[index].icon || null;
        } else if (perso.talents && typeof perso.talents[key] === 'number') {
            currentLvl = Number(perso.talents[key]) || 1;
        } else if (Array.isArray(perso.skills) && perso.skills[index]) {
            currentLvl = Number(perso.skills[index].level) || 1;
            talentIcon = perso.skills[index].icon || null;
        }

        const targetLvl = targets[key] || 1;

        if (targetLvl > 1 && currentLvl < targetLvl) {
            const stepCost = calculateTalentCost(currentLvl, targetLvl);

            totalCost.teachings += stepCost.teachings;
            totalCost.guides += stepCost.guides;
            totalCost.philosophies += stepCost.philosophies;
            totalCost.weeklyBoss += stepCost.weeklyBoss;
            totalCost.crown += stepCost.crown;
            totalCost.mora += stepCost.mora;

            const talentLabel = t(`talents.${key}`) || t(`ui.talent.${key}`) || t(`advice.talent.${key}`) || key;

            talentGaps.push({
                talentKey: key,
                talentLabel,
                talentIcon,
                currentLvl,
                targetLvl,
                cost: stepCost
            });
        }
    });

    const eqPhil = totalCost.philosophies + (totalCost.guides / 3) + (totalCost.teachings / 9);
    totalCost.estimatedResin = Math.ceil(eqPhil * 18);
    totalCost.estimatedRuns = Math.ceil(totalCost.estimatedResin / 20);

    const pLvl = perso.level || 1;
    const pAsc = perso.ascension || 0;
    const needsAscension = (pLvl < 90 && !(pLvl >= 80 && pAsc >= 6));

    const hasTalentNeeds = (talentGaps.length > 0 && bookRotation !== null);

    return {
        type: 'character',
        charNom,
        charAvatar: perso.image ? perso.image.replace(/_Side_/g, '_').replace(/Side_/g, '') : '',
        element: perso.element || '',
        bookRotation,
        weeklyBoss: matData.weeklyBoss || null,
        worldBoss: matData.worldBoss || null,
        specialty: matData.specialty || null,
        commonMat: matData.commonMat || null,
        talentGaps,
        totalCost,
        hasTalentNeeds,
        needsAscension,
        currentLvl: pLvl,
        currentAsc: pAsc
    };
}

/**
 * Construit la feuille de route hebdomadaire complète (du Lundi au Dimanche) pour les aptitudes et les armes.
 * @param {Array} characters 
 * @param {string|null} focusCharNom 
 * @param {string} categoryFilter 'all' | 'talents' | 'weapons'
 * @returns {Object}
 */
export function getWeeklyFarmingSchedule(characters = [], focusCharNom = null, categoryFilter = 'all') {
    const todayIndex = new Date().getDay(); // 0 = Dimanche, 1 = Lundi, ...

    const DAY_NAMES = {
        fr: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    };
    const currentLang = (LANG === 'en') ? 'en' : 'fr';

    // 1. Analyse des aptitudes des personnages
    const analyzedChars = (characters || []).map(p => {
        const needs = getCharacterFarmingNeeds(p);
        if (needs) {
            needs.isFocus = focusCharNom ? (p.nom === focusCharNom) : false;
        }
        return needs;
    }).filter(Boolean);

    const charactersWithTalentNeeds = analyzedChars.filter(p => {
        if (focusCharNom) return p.isFocus && p.hasTalentNeeds;
        return p.hasTalentNeeds;
    });

    // 2. Analyse des armes équipées
    const analyzedWeapons = (characters || []).map(p => {
        const needs = getWeaponFarmingNeeds(p);
        if (needs) {
            needs.isFocus = focusCharNom ? (p.nom === focusCharNom) : false;
        }
        return needs;
    }).filter(Boolean);

    const weaponsWithNeeds = analyzedWeapons.filter(w => {
        if (focusCharNom) return w.isFocus;
        return true;
    });

    // 3. Structure des 7 jours (0 à 6)
    const scheduleByDay = [0, 1, 2, 3, 4, 5, 6].map(dayIdx => {
        const isToday = (dayIdx === todayIndex);
        const dayLabel = DAY_NAMES[currentLang][dayIdx];
        const isSunday = (dayIdx === 0);

        // Personnages d'aptitudes pour ce jour
        let charsForDay = [];
        if (isSunday) {
            charsForDay = charactersWithTalentNeeds;
        } else {
            charsForDay = charactersWithTalentNeeds.filter(p => {
                const days = p.bookRotation?.days || [];
                return days.includes(dayIdx);
            });
        }

        // Armes pour ce jour
        let weaponsForDay = [];
        if (isSunday) {
            weaponsForDay = weaponsWithNeeds;
        } else {
            weaponsForDay = weaponsWithNeeds.filter(w => {
                const days = w.weaponRotation?.days || [];
                return days.includes(dayIdx);
            });
        }

        // Regroupement par domaine
        const talentDomainsMap = {};
        charsForDay.forEach(p => {
            const rot = p.bookRotation;
            if (!rot) return;
            const domId = rot.domainId;

            if (!talentDomainsMap[domId]) {
                const rawDom = DOMAIN_BY_ID_MAP[domId];
                const sundayItems = isSunday && rawDom?.rotations
                    ? rawDom.rotations.map(r => r.items?.philosophy).filter(Boolean)
                    : [];

                talentDomainsMap[domId] = {
                    domainId: domId,
                    domainName: getLocalizedItemName(rot.domainName, currentLang, domId),
                    region: getLocalizedItemName(rot.region, currentLang, ''),
                    bookName: isSunday
                        ? t('roadmap.farming.allBooksAvailable')
                        : getLocalizedItemName(rot.name, currentLang, ''),
                    category: 'talent',
                    items: rot.items || {},
                    sundayItems,
                    characters: [],
                    isSunday
                };
            }
            talentDomainsMap[domId].characters.push(p);
        });

        const weaponDomainsMap = {};
        weaponsForDay.forEach(w => {
            const rot = w.weaponRotation;
            if (!rot) return;
            const domId = rot.domainId;

            if (!weaponDomainsMap[domId]) {
                const rawDom = DOMAIN_BY_ID_MAP[domId];
                const sundayItems = isSunday && rawDom?.rotations
                    ? rawDom.rotations.map(r => r.items?.gold).filter(Boolean)
                    : [];

                weaponDomainsMap[domId] = {
                    domainId: domId,
                    domainName: getLocalizedItemName(rot.domainName, currentLang, domId),
                    region: getLocalizedItemName(rot.region, currentLang, ''),
                    bookName: isSunday
                        ? t('roadmap.farming.allMaterialsAvailable')
                        : getLocalizedItemName(rot.name, currentLang, ''),
                    category: 'weapon',
                    items: rot.items || {},
                    sundayItems,
                    weapons: [],
                    isSunday
                };
            }
            weaponDomainsMap[domId].weapons.push(w);
        });

        // Filtrage selon categoryFilter ('all', 'talents', 'weapons')
        let includedDomains = [];
        if (categoryFilter === 'weapons') {
            includedDomains = Object.values(weaponDomainsMap);
        } else if (categoryFilter === 'talents') {
            includedDomains = Object.values(talentDomainsMap);
        } else {
            includedDomains = [...Object.values(talentDomainsMap), ...Object.values(weaponDomainsMap)];
        }

        let dayTotalResin = 0;
        let dayTotalMora = 0;

        if (categoryFilter !== 'weapons') {
            charsForDay.forEach(p => {
                dayTotalResin += p.totalCost?.estimatedResin || 0;
                dayTotalMora += p.totalCost?.mora || 0;
            });
        }
        if (categoryFilter !== 'talents') {
            weaponsForDay.forEach(w => {
                dayTotalResin += w.totalCost?.estimatedResin || 0;
                dayTotalMora += w.totalCost?.mora || 0;
            });
        }

        return {
            dayIndex: dayIdx,
            dayName: dayLabel,
            isToday,
            isSunday,
            characters: charsForDay,
            weapons: weaponsForDay,
            domains: includedDomains,
            totalResin: dayTotalResin,
            totalMora: dayTotalMora,
            runsCount: Math.ceil(dayTotalResin / 20)
        };
    });

    const weekOrdered = [
        scheduleByDay[1], // Lundi
        scheduleByDay[2], // Mardi
        scheduleByDay[3], // Mercredi
        scheduleByDay[4], // Jeudi
        scheduleByDay[5], // Vendredi
        scheduleByDay[6], // Samedi
        scheduleByDay[0]  // Dimanche
    ];

    const todaySchedule = scheduleByDay[todayIndex];

    // Totaux compte selon le filtre
    let totalAccountResin = 0;
    let totalAccountMora = 0;

    if (categoryFilter !== 'weapons') {
        charactersWithTalentNeeds.forEach(p => {
            totalAccountResin += p.totalCost?.estimatedResin || 0;
            totalAccountMora += p.totalCost?.mora || 0;
        });
    }
    if (categoryFilter !== 'talents') {
        weaponsWithNeeds.forEach(w => {
            totalAccountResin += w.totalCost?.estimatedResin || 0;
            totalAccountMora += w.totalCost?.mora || 0;
        });
    }

    return {
        todayIndex,
        todaySchedule,
        weekSchedule: weekOrdered,
        scheduleByDay,
        allCharactersWithNeeds: charactersWithTalentNeeds,
        allWeaponsWithNeeds: weaponsWithNeeds,
        totalAccountResin,
        totalAccountMora,
        totalAccountRuns: Math.ceil(totalAccountResin / 20)
    };
}
