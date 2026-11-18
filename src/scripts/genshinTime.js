// src/scripts/genshinTime.js
// Moteur temporel pour Genshin Impact : gestion des fuseaux horaires par serveur,
// resets quotidiens à 04:00 heure serveur et calculs des cycles Endgame.

export const SERVERS = {
    EU: { id: 'EU', name: 'Europe', offsetHours: 1, resetUtcHour: 3 },
    NA: { id: 'NA', name: 'America', offsetHours: -5, resetUtcHour: 9 },
    Asia: { id: 'Asia', name: 'Asia', offsetHours: 8, resetUtcHour: 20 },
    TW: { id: 'TW', name: 'TW / HK / MO', offsetHours: 8, resetUtcHour: 20 },
    CN: { id: 'CN', name: 'China', offsetHours: 8, resetUtcHour: 20 }
};

export const SERVER_BY_FIRST_DIGIT = {
    '1': 'CN',
    '2': 'CN',
    '3': 'CN',
    '4': 'CN',
    '5': 'CN',
    '6': 'NA',
    '7': 'EU',
    '8': 'Asia',
    '9': 'TW'
};

/**
 * Détermine le serveur à partir d'un UID.
 */
export function getServerFromUid(uid) {
    if (!uid) return null;
    const str = String(uid).trim();
    return SERVER_BY_FIRST_DIGIT[str[0]] || null;
}

/**
 * Cascade de détection du serveur actif :
 * 1. Forçage manuel utilisateur ('guoba_forced_server')
 * 2. UID passé en argument
 * 3. UID favori ou Discord
 * 4. Premier UID des profils récents
 * 5. Fuseau horaire du navigateur (Intl API)
 * 6. Fallback final sur 'EU'
 */
export function detectActiveServer(candidateUid = null) {
    if (candidateUid) {
        const s = getServerFromUid(candidateUid);
        if (s) return s;
    }

    if (typeof localStorage !== 'undefined') {
        const forced = localStorage.getItem('guoba_forced_server');
        if (forced && SERVERS[forced]) return forced;
    }

    if (typeof localStorage !== 'undefined') {
        const favUid = localStorage.getItem('guoba_favorite_uid');
        if (favUid) {
            const s = getServerFromUid(favUid);
            if (s) return s;
        }

        const discordUid = localStorage.getItem('guoba_discord_uid');
        if (discordUid) {
            const s = getServerFromUid(discordUid);
            if (s) return s;
        }

        try {
            const recents = JSON.parse(localStorage.getItem('guoba_recent_profiles') || '[]');
            if (recents.length > 0 && recents[0].uid) {
                const s = getServerFromUid(recents[0].uid);
                if (s) return s;
            }
        } catch (_) { }
    }

    // Détection via fuseau horaire du navigateur
    try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
        if (/America|US|Canada|Argentina|Brazil|Chile|Mexico/i.test(tz)) return 'NA';
        if (/Asia|Tokyo|Shanghai|Seoul|Taipei|Singapore|Hong_Kong|Bangkok/i.test(tz)) return 'Asia';
    } catch (_) { }

    return 'EU';
}

/**
 * Enregistre le choix manuel du serveur.
 */
export function setForcedServer(serverKey) {
    if (typeof localStorage !== 'undefined') {
        if (serverKey && SERVERS[serverKey]) {
            localStorage.setItem('guoba_forced_server', serverKey);
        } else {
            localStorage.removeItem('guoba_forced_server');
        }
    }
}

/**
 * Calcule la "Date de jeu Genshin" pour le serveur donné.
 * La bascule journalière s'effectue à 04:00 heure serveur.
 * On décale donc de -4 heures pour obtenir le jour effectif en jeu.
 */
export function getGenshinGameDate(serverKey = 'EU') {
    const s = SERVERS[serverKey] || SERVERS.EU;
    const now = new Date();
    // Temps UTC en millisecondes
    const utcMs = now.getTime() + (now.getTimezoneOffset() * 60000);
    // Heure locale sur le serveur
    const serverTimeMs = utcMs + (s.offsetHours * 3600000);
    // Décalage de -4 heures pour le reset quotidien
    return new Date(serverTimeMs - (4 * 3600000));
}

/**
 * Renvoie l'index du jour Genshin actuel (0 = Dimanche, 1 = Lundi, ..., 6 = Samedi).
 */
export function getGenshinDayIndex(serverKey = 'EU') {
    return getGenshinGameDate(serverKey).getDay();
}

/**
 * Renvoie le nom localisé du jour.
 */
export function getDayName(dayIndex, lang = 'fr') {
    const DAYS = {
        fr: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    };
    const l = (lang === 'en') ? 'en' : 'fr';
    return DAYS[l][dayIndex] || DAYS[l][0];
}

/**
 * Calcule le temps restant avant le prochain reset quotidien (04:00 heure serveur).
 */
export function getTimeUntilDailyReset(serverKey = 'EU') {
    const s = SERVERS[serverKey] || SERVERS.EU;
    const now = new Date();
    const utcMs = now.getTime() + (now.getTimezoneOffset() * 60000);
    const serverTimeMs = utcMs + (s.offsetHours * 3600000);
    const serverNow = new Date(serverTimeMs);

    const nextReset = new Date(serverNow);
    if (serverNow.getHours() >= 4) {
        nextReset.setDate(nextReset.getDate() + 1);
    }
    nextReset.setHours(4, 0, 0, 0);

    const diffMs = Math.max(0, nextReset.getTime() - serverNow.getTime());
    const hours = Math.floor(diffMs / 3600000);
    const minutes = Math.floor((diffMs % 3600000) / 60000);
    const seconds = Math.floor((diffMs % 60000) / 1000);

    return { hours, minutes, seconds, totalMs: diffMs };
}

/**
 * Helper : parse une chaîne ISO "YYYY-MM-DDTHH:mm:ss" en Date locale serveur.
 */
export function parseServerDateTime(isoString) {
    if (!isoString) return null;
    const [datePart, timePart] = isoString.split('T');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hours, minutes, seconds] = (timePart || '00:00:00').split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes, seconds || 0);
}

/**
 * Configurations des rotations du Carnage Chtonien (Stygian Onslaught).
 * - start : date de début en heure serveur (ex: '2026-11-11T10:00:00')
 * - bonusEnd (optionnel) : date de fin du bonus d'artéfacts. Si omis, start + 10 jours jusqu'à 03:59:59.
 * - end (optionnel) : date de fin de rotation. Si omis, start + 34 jours jusqu'à 03:59:59 (5 semaines).
 * - bosses : tableau des 3 boss avec images et conseils modulaires (tips).
 */
export const STYGIAN_ROTATIONS = [
    {
        id: '7.2',
        start: '2026-11-11T10:00:00',
        bonusEnd: '2026-11-21T03:59:59',
        end: '2026-12-15T03:59:59',
        bosses: [
            {
                nameFr: 'Tisseur de vagues',
                nameEn: 'Wavebinder',
                image: '/assets/endgame/boss_wavebinder.png',
                fallbackIcon: '/assets/simulator/icons/stygian_difficulty_6.webp',
                tips: [
                    {
                        type: 'good',
                        en: 'Stellar Glimmer | {electro}',
                        fr: 'Lueur stellaire | {electro}'
                    }
                ]
            },
            {
                nameFr: 'Empereur du feu et du fer',
                nameEn: 'Emperor of Fire and Iron',
                image: '/assets/endgame/boss_emperor_fire_iron.png',
                fallbackIcon: '/assets/simulator/icons/stygian_difficulty_6.webp',
                tips: [
                    {
                        type: 'good',
                        en: '{hydro}',
                        fr: '{hydro}'
                    },
                    {
                        type: 'bad',
                        en: '{pyro}',
                        fr: '{pyro}'
                    }
                ]
            },
            {
                nameFr: 'Gecko lunaire radiant',
                nameEn: 'Radiant Moongecko',
                image: '/assets/endgame/boss_radiant_moongecko.png',
                fallbackIcon: '/assets/simulator/icons/stygian_difficulty_6.webp',
                tips: [
                    {
                        type: 'good',
                        en: '{geo} | Heal',
                        fr: '{geo} | Soins'
                    }
                ]
            }
        ]
    }
];

/**
 * Configurations des saisons du Théâtre de l'Imaginarium.
 * Le Théâtre resetant le 1er de chaque mois à 04:00 (Server Time),
 * les rotations sont indexées par mois "YYYY-MM".
 * Tu peux ajouter les mois futurs à l'avance !
 */
export const THEATER_SCHEDULES = [
    {
        month: '2026-11', // Novembre 2026
        elements: ['hydro', 'electro', 'geo']
    },
    {
        month: '2026-12', // Décembre 2026
        elements: ['anemo', 'electro', 'cryo']
    },
    {
        month: '2027-01', // Janvier 2027
        elements: ['pyro', 'dendro', 'electro']
    }
];

/**
 * Calcule les états et comptes à rebours des 3 modes Endgame :
 * 1. Carnage Chtonien (Stygian Onslaught) avec détection du bonus 1-10 jours
 * 2. Théâtre de l'Imaginarium (Reset le 1er du mois à 04:00)
 * 3. Profondeurs Spiralées (Reset le 16 du mois à 04:00)
 */
export function getEndgameCyclesInfo(serverKey = 'EU') {
    const s = SERVERS[serverKey] || SERVERS.EU;
    const now = new Date();
    const utcMs = now.getTime() + (now.getTimezoneOffset() * 60000);
    const serverNow = new Date(utcMs + (s.offsetHours * 3600000));
    const serverTimeMs = serverNow.getTime();

    // ─────────────────────────────────────────────────────────────
    // 1. Théâtre de l'Imaginarium (du 1er 04:00 au 1er du mois suivant 03:59:59)
    // ─────────────────────────────────────────────────────────────
    const theaterEnd = new Date(serverNow.getFullYear(), serverNow.getMonth() + 1, 1, 3, 59, 59);
    const theaterDiffMs = Math.max(0, theaterEnd.getTime() - serverTimeMs);
    const theaterDays = Math.floor(theaterDiffMs / 86400000);
    const theaterHours = Math.floor((theaterDiffMs % 86400000) / 3600000);

    // Éléments du Théâtre de la saison en cours (résolus d'après le mois YYYY-MM)
    const currentYearMonth = `${serverNow.getFullYear()}-${String(serverNow.getMonth() + 1).padStart(2, '0')}`;
    const activeTheater = THEATER_SCHEDULES.find(t => t.month === currentYearMonth);
    const theaterElements = activeTheater ? activeTheater.elements : ['pyro', 'hydro', 'geo'];

    // ─────────────────────────────────────────────────────────────
    // 2. Profondeurs Spiralées (Reset le 16 du mois à 04:00 -> fin le 16 à 03:59:59)
    // ─────────────────────────────────────────────────────────────
    let abyssEnd;
    if (serverNow.getDate() < 16 || (serverNow.getDate() === 16 && serverNow.getHours() < 4)) {
        abyssEnd = new Date(serverNow.getFullYear(), serverNow.getMonth(), 16, 3, 59, 59);
    } else {
        abyssEnd = new Date(serverNow.getFullYear(), serverNow.getMonth() + 1, 16, 3, 59, 59);
    }
    const abyssDiffMs = Math.max(0, abyssEnd.getTime() - serverTimeMs);
    const abyssDays = Math.floor(abyssDiffMs / 86400000);
    const abyssHours = Math.floor((abyssDiffMs % 86400000) / 3600000);

    // ─────────────────────────────────────────────────────────────
    // 3. Carnage Chtonien (Stygian Onslaught)
    // Résolution dynamique de la rotation active parmi STYGIAN_ROTATIONS
    // ─────────────────────────────────────────────────────────────
    let activeRotation = STYGIAN_ROTATIONS.find(r => {
        const startDate = parseServerDateTime(r.start);
        const endDate = r.end
            ? parseServerDateTime(r.end)
            : new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 34, 3, 59, 59);
        return serverTimeMs >= startDate.getTime() && serverTimeMs <= endDate.getTime();
    });

    let isUpcoming = false;
    let isEnded = false;

    // Si aucune rotation en cours, chercher la prochaine à venir
    if (!activeRotation) {
        activeRotation = STYGIAN_ROTATIONS.find(r => {
            const startDate = parseServerDateTime(r.start);
            return startDate.getTime() > serverTimeMs;
        });
        if (activeRotation) {
            isUpcoming = true;
        } else if (STYGIAN_ROTATIONS.length > 0) {
            // Fallback sur la dernière connue
            activeRotation = STYGIAN_ROTATIONS[STYGIAN_ROTATIONS.length - 1];
            isEnded = true;
        }
    }

    let isBonusActive = false;
    let bonusDaysLeft = 0;
    let bonusHoursLeft = 0;
    let cycleDaysLeft = 0;
    let cycleHoursLeft = 0;
    let bosses = [];

    if (activeRotation) {
        bosses = activeRotation.bosses || [];
        const startDate = parseServerDateTime(activeRotation.start);

        const bonusEndDate = activeRotation.bonusEnd
            ? parseServerDateTime(activeRotation.bonusEnd)
            : new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 10, 3, 59, 59);

        const endDate = activeRotation.end
            ? parseServerDateTime(activeRotation.end)
            : new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 34, 3, 59, 59);

        if (isUpcoming) {
            const waitMs = Math.max(0, startDate.getTime() - serverTimeMs);
            cycleDaysLeft = Math.floor(waitMs / 86400000);
            cycleHoursLeft = Math.floor((waitMs % 86400000) / 3600000);
        } else if (!isEnded) {
            isBonusActive = serverTimeMs < bonusEndDate.getTime();
            if (isBonusActive) {
                const bonusDiffMs = Math.max(0, bonusEndDate.getTime() - serverTimeMs);
                bonusDaysLeft = Math.floor(bonusDiffMs / 86400000);
                bonusHoursLeft = Math.floor((bonusDiffMs % 86400000) / 3600000);
            }

            const cycleDiffMs = Math.max(0, endDate.getTime() - serverTimeMs);
            cycleDaysLeft = Math.floor(cycleDiffMs / 86400000);
            cycleHoursLeft = Math.floor((cycleDiffMs % 86400000) / 3600000);
        }
    }

    // ─────────────────────────────────────────────────────────────
    // 4. Détection des resets récents (< 24 heures)
    // ─────────────────────────────────────────────────────────────
    const ONE_DAY_MS = 24 * 3600 * 1000;

    // Théâtre : dernier reset le 1er du mois à 04:00 (Server Time)
    let theaterStart;
    if (serverNow.getDate() > 1 || (serverNow.getDate() === 1 && serverNow.getHours() >= 4)) {
        theaterStart = new Date(serverNow.getFullYear(), serverNow.getMonth(), 1, 4, 0, 0);
    } else {
        theaterStart = new Date(serverNow.getFullYear(), serverNow.getMonth() - 1, 1, 4, 0, 0);
    }
    const timeSinceTheaterReset = serverTimeMs - theaterStart.getTime();
    const isTheaterNew = timeSinceTheaterReset >= 0 && timeSinceTheaterReset < ONE_DAY_MS;

    // Abysses : dernier reset le 16 du mois à 04:00 (Server Time)
    let abyssStart;
    if (serverNow.getDate() > 16 || (serverNow.getDate() === 16 && serverNow.getHours() >= 4)) {
        abyssStart = new Date(serverNow.getFullYear(), serverNow.getMonth(), 16, 4, 0, 0);
    } else {
        abyssStart = new Date(serverNow.getFullYear(), serverNow.getMonth() - 1, 16, 4, 0, 0);
    }
    const timeSinceAbyssReset = serverTimeMs - abyssStart.getTime();
    const isAbyssNew = timeSinceAbyssReset >= 0 && timeSinceAbyssReset < ONE_DAY_MS;

    // Carnage : rotation active ayant commencé il y a moins de 24 heures
    let isStygianNew = false;
    if (activeRotation && !isUpcoming && !isEnded) {
        const startDate = parseServerDateTime(activeRotation.start);
        const timeSinceStygianStart = serverTimeMs - startDate.getTime();
        isStygianNew = timeSinceStygianStart >= 0 && timeSinceStygianStart < ONE_DAY_MS;
    }

    const hasRecentReset = isTheaterNew || isAbyssNew || isStygianNew;

    return {
        server: s.id,
        serverName: s.name,
        hasRecentReset,
        recentResets: {
            theater: isTheaterNew,
            abyss: isAbyssNew,
            stygian: isStygianNew
        },
        theater: {
            daysLeft: theaterDays,
            hoursLeft: theaterHours,
            elements: theaterElements,
            isNew: isTheaterNew
        },
        abyss: {
            daysLeft: abyssDays,
            hoursLeft: abyssHours,
            isNew: isAbyssNew
        },
        stygian: {
            cycleId: activeRotation?.id || '',
            isBonusActive,
            isUpcoming,
            isEnded,
            isNew: isStygianNew,
            bonusDaysLeft,
            bonusHoursLeft,
            cycleDaysLeft,
            cycleHoursLeft,
            bosses
        }
    };
}

