// src/components/roadmap/farmingEngine.js
import FARMING_DOMAINS from '../../data/farming_domains.json';
import CHARACTER_MATERIALS from '../../data/character_materials.json';
import CONFIG_NAME_ALIASES_EN_TO_FR from '../../data/config_name_aliases_en_to_fr.json';
import { t, LANG } from '../../scripts/i18n.js';

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

// Indexation rapide des 24 rotations de livres
const BOOK_ROTATION_MAP = {};
if (Array.isArray(FARMING_DOMAINS)) {
    FARMING_DOMAINS.forEach(dom => {
        if (Array.isArray(dom.rotations)) {
            dom.rotations.forEach(rot => {
                BOOK_ROTATION_MAP[rot.itemKey] = {
                    domainId: dom.id,
                    domainName: dom.name,
                    region: dom.region,
                    days: rot.days || [],
                    name: rot.name,
                    items: rot.items
                };
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

    // Calcul de l'équivalent en livres 4★ (Philosophies) : 3 Teachings = 1 Guide, 3 Guides = 1 Philosophie
    const eqPhil = cost.philosophies + (cost.guides / 3) + (cost.teachings / 9);
    cost.equivalentPhilosophies = Math.round(eqPhil * 10) / 10;

    // En donjon de niveau IV (AR 45+) : moyenne de ~1.12 Philosophie équivalente par 20 résines
    // Soit environ ~18 résines par Philosophie équivalente
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
        equivalentPhilosophies: 0,
        estimatedResin: 0,
        estimatedRuns: 0
    };

    if (Array.isArray(perso.talents) && perso.talents.length >= 3) {
        keyMap.forEach((k, idx) => {
            const targetLvl = targets[k] || 1;
            const currentLvl = perso.talents[idx]?.level || 1;

            if (targetLvl > 1 && currentLvl < targetLvl) {
                const cost = calculateTalentCost(currentLvl, targetLvl);
                const talentObj = perso.talents[idx];

                talentGaps.push({
                    talentKey: k,
                    talentLabel: t('talents.' + k) || k,
                    talentIcon: talentObj?.icon || '',
                    currentLvl,
                    targetLvl,
                    cost
                });

                totalCost.teachings += cost.teachings;
                totalCost.guides += cost.guides;
                totalCost.philosophies += cost.philosophies;
                totalCost.weeklyBoss += cost.weeklyBoss;
                totalCost.crown += cost.crown;
                totalCost.mora += cost.mora;
                totalCost.equivalentPhilosophies += cost.equivalentPhilosophies;
                totalCost.estimatedResin += cost.estimatedResin;
            }
        });
    }

    totalCost.equivalentPhilosophies = Math.round(totalCost.equivalentPhilosophies * 10) / 10;
    totalCost.estimatedRuns = Math.ceil(totalCost.estimatedResin / 20);

    const hasTalentNeeds = talentGaps.length > 0;

    // Détection des besoins d'élévation de niveau (< 90 et non 80/90)
    const pLvl = perso.level || 1;
    const pAsc = perso.ascension || 0;
    const needsAscension = pLvl < 90 && !(pLvl >= 80 && pAsc >= 6);

    return {
        charNom,
        charAvatar: perso.image ? perso.image.replace(/_Side_/g, '_').replace(/Side_/g, '') : '',
        bookKey: matData.talentBookKey || null,
        bookRotation,
        talentGaps,
        totalCost,
        hasTalentNeeds,
        needsAscension,
        currentLevel: pLvl,
        weeklyBoss: matData.weeklyBoss || null,
        worldBoss: matData.worldBoss || null,
        specialty: matData.specialty || null,
        commonMat: matData.commonMat || null
    };
}

/**
 * Construit la feuille de route hebdomadaire complète (du Lundi au Dimanche).
 * @param {Array} characters 
 * @param {string|null} focusCharNom 
 * @returns {Object}
 */
export function getWeeklyFarmingSchedule(characters = [], focusCharNom = null) {
    const todayIndex = new Date().getDay(); // 0 = Dimanche, 1 = Lundi, ...

    const DAY_NAMES = {
        fr: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    };
    const currentLang = (LANG === 'en') ? 'en' : 'fr';

    // Analyse tous les personnages
    const analyzed = (characters || []).map(p => {
        const needs = getCharacterFarmingNeeds(p);
        if (needs) {
            needs.isFocus = focusCharNom ? (p.nom === focusCharNom) : false;
        }
        return needs;
    }).filter(Boolean);

    // Personnages qui ont au moins un besoin en aptitudes
    const charactersWithTalentNeeds = analyzed.filter(p => {
        if (focusCharNom) return p.isFocus && p.hasTalentNeeds;
        return p.hasTalentNeeds;
    });

    // Structure des 7 jours (0 à 6)
    const scheduleByDay = [0, 1, 2, 3, 4, 5, 6].map(dayIdx => {
        const isToday = (dayIdx === todayIndex);
        const dayLabel = DAY_NAMES[currentLang][dayIdx];

        // Quels personnages peuvent être farmés ce jour-là ?
        let charsForDay = [];

        if (dayIdx === 0) {
            // Le Dimanche : TOUS les donjons sont ouverts !
            charsForDay = charactersWithTalentNeeds;
        } else {
            // Jours réguliers (1 à 6) : uniquement si le donjon de leur livre est ouvert ce jour-là
            charsForDay = charactersWithTalentNeeds.filter(p => {
                const days = p.bookRotation?.days || [];
                return days.includes(dayIdx);
            });
        }

        // Regroupe par domaine pour une présentation claire
        const domainsMap = {};
        let dayTotalResin = 0;

        charsForDay.forEach(p => {
            const rot = p.bookRotation;
            if (!rot) return;
            const domId = rot.domainId;

            if (!domainsMap[domId]) {
                domainsMap[domId] = {
                    domainId: domId,
                    domainName: rot.domainName?.[currentLang] || rot.domainName?.fr || domId,
                    region: rot.region?.[currentLang] || rot.region?.fr || '',
                    bookName: rot.name?.[currentLang] || rot.name?.fr || '',
                    items: rot.items || {},
                    characters: []
                };
            }

            domainsMap[domId].characters.push(p);
            dayTotalResin += p.totalCost.estimatedResin || 0;
        });

        return {
            dayIndex: dayIdx,
            dayName: dayLabel,
            isToday,
            isSunday: (dayIdx === 0),
            characters: charsForDay,
            domains: Object.values(domainsMap),
            totalResin: dayTotalResin,
            runsCount: Math.ceil(dayTotalResin / 20)
        };
    });

    // Ordonne la semaine du Lundi (1) au Dimanche (0) pour l'affichage européen naturel
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

    const totalAccountResin = charactersWithTalentNeeds.reduce((acc, p) => acc + (p.totalCost?.estimatedResin || 0), 0);
    const totalAccountMora = charactersWithTalentNeeds.reduce((acc, p) => acc + (p.totalCost?.mora || 0), 0);

    return {
        todayIndex,
        todaySchedule,
        weekSchedule: weekOrdered,
        scheduleByDay,
        allCharactersWithNeeds: charactersWithTalentNeeds,
        totalAccountResin,
        totalAccountMora,
        totalAccountRuns: Math.ceil(totalAccountResin / 20)
    };
}
