// src/components/home/HomeDashboard.js
// Rendu modulaire de la page d'accueil moderne (Tableau de bord 2 colonnes)

import { t, LANG } from '../../scripts/i18n.js';
import { getWeeklyFarmingSchedule, getLocalizedItemName } from '../roadmap/farmingEngine.js';
import {
    renderCharacterFarmingCard,
    renderWeaponFarmingCard,
    getItemIconHtml
} from '../roadmap/DailyFarmingRoadmap.js';
import FARMING_DOMAINS from '../../data/farming_domains.json';
import {
    detectActiveServer,
    setForcedServer,
    SERVERS,
    getEndgameCyclesInfo,
    getDayName,
    getGenshinDayIndex,
    getServerFromUid
} from '../../scripts/genshinTime.js';

const ICON_PATH = '/assets/simulator/icons/';
const ENKA_CDN = 'https://enka.network/ui/';

const DID_YOU_KNOW_TIPS = [
    {
        fr: "Pendant les 10 premiers jours du Carnage Chtonien, vous recevez 1 artéfact bonus toutes les 120 résines dépensées sur le domaine de votre choix !",
        en: "During the first 10 days of Stygian Onslaught, you get 1 bonus artifact for every 120 resin spent in any domain of your choice!"
    },
    {
        fr: "Le Baromètre de maturité de Guoba calcule statistiquement le moment exact où continuer à farmer un set d'artéfacts devient moins rentable qu'investir sur d'autres personnages.",
        en: "Guoba's Maturity Barometer statistically calculates the exact threshold where farming an artifact set becomes less efficient than upgrading other characters."
    },
    {
        fr: "Le score d'artéfact de Guoba est basé sur le Roll Value théorique maximal de chaque sous-statistique adapté au rôle de votre personnage.",
        en: "Guoba's artifact score is based on the maximum theoretical Roll Value of each sub-stat tailored to your character's role."
    },
    {
        fr: "Xiangling ne possède pas de temps de recharge interne (ICD) sur son Pyronado, ce qui lui permet d'évaporer à chaque rotation.",
        en: "Xiangling has no Internal Cooldown (ICD) on her Pyronado, allowing her to trigger Vaporize on every single hit."
    },
    {
        fr: "L'utilisation de résine condensée double les récompenses de donjon tout en réduisant de moitié votre temps de farm quotidien.",
        en: "Using Condensed Resin doubles domain rewards while halving your daily farming time."
    },
    {
        fr: "Vous pouvez exporter une fiche de build haute résolution en un seul clic grâce au bouton d'export dans la barre d'outils du showcase.",
        en: "You can export a high-resolution build card in a single click using the export button in the showcase toolbar."
    }
];

function formatMora(num) {
    if (!num) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return Math.round(num / 1000) + 'k';
    return num.toLocaleString();
}

function stygianIconHtml(stygianIndex, stygianSec) {
    if (stygianIndex === null) return '';
    if (stygianIndex === 6 && stygianSec !== null && stygianSec < 180) {
        return `<img src="${ICON_PATH}stygian_difficulty_6_minus_180.webp" class="pp-icon" alt="${t('ui.alt.stygian')}" decoding="async">`;
    }
    if (stygianIndex >= 1 && stygianIndex <= 6) {
        return `<img src="${ICON_PATH}stygian_difficulty_${stygianIndex}.webp" class="pp-icon" alt="${t('ui.alt.stygian')}" decoding="async">`;
    }
    return '';
}

/**
 * Génère le tag HTML pour une icône d'élément.
 */
function elementIconHtml(elemKey, size = 18) {
    const clean = String(elemKey || '').toLowerCase().trim();
    const map = {
        pyro: 'icon_pyro.webp',
        hydro: 'icon_hydro.webp',
        cryo: 'icon_cryo.webp',
        electro: 'icon_electro.webp',
        anemo: 'icon_anemo.webp',
        geo: 'icon_geo.webp',
        dendro: 'icon_dendro.webp'
    };
    const iconName = map[clean] || 'icon_pyro.webp';
    return `<img src="${ICON_PATH}${iconName}" alt="${clean}" style="width:${size}px; height:${size}px; object-fit:contain; flex-shrink:0;">`;
}

/**
 * Rendu modulaire d'une pastille (pill) de conseil pour un boss du Carnage.
 * Supporte : 👍 / 👎, texte, balises d'éléments {hydro}, {electro}, etc., ou icône seule.
 */
function renderBossTipPill(tip, lang = 'fr') {
    const isGood = tip.type !== 'bad';
    const iconSrc = isGood ? '/assets/endgame/stygian_good.png' : '/assets/endgame/stygian_bad.png';
    const textRaw = (lang === 'en' ? (tip.en || tip.text) : (tip.fr || tip.text || tip.en)) || '';

    // Remplacement des balises d'éléments {element} par l'icône correspondante
    const renderedText = textRaw.replace(/\{(\w+)\}/g, (match, el) => {
        return elementIconHtml(el.toLowerCase(), 13);
    });

    const tooltipText = textRaw.replace(/\{(\w+)\}/g, '$1');

    return `
        <span class="stygian-tip-pill ${isGood ? 'good' : 'bad'}" title="${tooltipText}" style="display:inline-flex; font-weight:normal; align-items:center; gap:5px; backdrop-filter:blur(4px); border-radius:999px; padding:2px 7px; font-size:10px; color:var(--text-always-white); line-height:1.2; max-width:100%; box-sizing:border-box; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
            <img src="${iconSrc}" alt="" style="width:13px; height:13px; object-fit:contain; flex-shrink:0;">
            ${renderedText ? `<span style="display:inline-flex; align-items:center; gap:3px; overflow:hidden; text-overflow:ellipsis;">${renderedText}</span>` : ''}
        </span>
    `;
}

function renderBossTips(boss, lang) {
    if (boss.tips && boss.tips.length > 0) {
        return boss.tips.map(tip => renderBossTipPill(tip, lang)).join('');
    }
    if (boss.elements && boss.elements.length > 0) {
        return `
            <div style="display:flex; gap:4px; align-items:center;">
                ${boss.elements.map(el => elementIconHtml(el, 14)).join('')}
            </div>
        `;
    }
    return '';
}

/**
 * Construit les diapositives du carrousel de farming pour le jour actif.
 * Chaque slide reprend EXACTEMENT le design des cartes de la feuille de route,
 * précédé de l'en-tête du donjon / matériau correspondant.
 */
function buildDailyFarmingSlides(characters = [], activeServer = 'EU', focusCharNom = null) {
    const currentLang = (LANG === 'en') ? 'en' : 'fr';
    const resolvedFocus = focusCharNom || (typeof localStorage !== 'undefined' ? localStorage.getItem('guoba_roadmap_focus_char') : null);
    // On passe null comme filtre de focus à getWeeklyFarmingSchedule afin de récupérer TOUS les besoins du jour,
    // puis on priorise le personnage focus en tête des diapositives.
    const schedule = getWeeklyFarmingSchedule(characters, null, 'all', activeServer);
    const dayIdx = schedule.todayIndex;
    const dayData = schedule.scheduleByDay[dayIdx] || schedule.scheduleByDay[1];

    const slides = [];

    // 1. Personnages ayant des besoins d'aptitudes aujourd'hui
    if (dayData && dayData.characters && dayData.characters.length > 0) {
        // Taguer isFocus et mettre les personnages Focus en tête
        const charList = dayData.characters.map(c => ({
            ...c,
            isFocus: resolvedFocus ? (c.charNom === resolvedFocus) : false
        }));
        charList.sort((a, b) => (b.isFocus ? 1 : 0) - (a.isFocus ? 1 : 0));

        charList.forEach(char => {
            const rot = char.bookRotation;
            const items = rot?.items || {};

            const domainHeaderHtml = `
                <div style="display:flex; align-items:center; gap:12px; min-width:0; margin-bottom:4px;">
                    <div style="display:inline-flex; align-items:center; gap:3px; background:var(--shadow-subtle); border-radius:6px; padding:3px 6px; flex-shrink:0;">
                        ${getItemIconHtml(items.teachings?.icon, getLocalizedItemName(items.teachings?.name), 'width:24px; height:24px; object-fit:contain;')}
                        ${getItemIconHtml(items.guide?.icon, getLocalizedItemName(items.guide?.name), 'width:24px; height:24px; object-fit:contain;')}
                        ${getItemIconHtml(items.philosophy?.icon, getLocalizedItemName(items.philosophy?.name), 'width:24px; height:24px; object-fit:contain;')}
                    </div>
                    <div style="display:flex; flex-direction:column; gap:2px; min-width:0;">
                        <span style="font-size:14px; font-weight:normal; color:var(--text-always-white); line-height:1.2; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                            ${getLocalizedItemName(rot?.name)}
                        </span>
                        <span style="font-size:11px; color:var(--text-grey); line-height:1.2; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                            ${getLocalizedItemName(rot?.domainName)} • ${getLocalizedItemName(rot?.region)}
                        </span>
                    </div>
                </div>
            `;

            slides.push({
                type: 'character',
                html: `
                    ${domainHeaderHtml}
                    ${renderCharacterFarmingCard(char)}
                `
            });
        });
    }

    // 2. Armes ayant des besoins d'élévation aujourd'hui
    if (dayData && dayData.weapons && dayData.weapons.length > 0) {
        const weaponList = dayData.weapons.map(w => ({
            ...w,
            isFocus: resolvedFocus ? (w.charNom === resolvedFocus) : false
        }));
        weaponList.sort((a, b) => (b.isFocus ? 1 : 0) - (a.isFocus ? 1 : 0));

        weaponList.forEach(w => {
            const rot = w.weaponRotation;
            const items = rot?.items || {};

            const domainHeaderHtml = `
                <div style="display:flex; align-items:center; gap:12px; min-width:0; margin-bottom:4px;">
                    <div style="display:inline-flex; align-items:center; gap:3px; background:var(--shadow-subtle); border-radius:6px; padding:3px 6px; flex-shrink:0;">
                        ${getItemIconHtml(items.green?.icon, getLocalizedItemName(items.green?.name), 'width:24px; height:24px; object-fit:contain;')}
                        ${getItemIconHtml(items.blue?.icon, getLocalizedItemName(items.blue?.name), 'width:24px; height:24px; object-fit:contain;')}
                        ${getItemIconHtml(items.purple?.icon, getLocalizedItemName(items.purple?.name), 'width:24px; height:24px; object-fit:contain;')}
                        ${getItemIconHtml(items.gold?.icon, getLocalizedItemName(items.gold?.name), 'width:24px; height:24px; object-fit:contain;')}
                    </div>
                    <div style="display:flex; flex-direction:column; gap:2px; min-width:0;">
                        <span style="font-size:14px; font-weight:normal; color:var(--text-always-white); line-height:1.2; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                            ${getLocalizedItemName(rot?.name)}
                        </span>
                        <span style="font-size:11px; color:var(--text-grey); line-height:1.2; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                            ${getLocalizedItemName(rot?.domainName)} • ${getLocalizedItemName(rot?.region)}
                        </span>
                    </div>
                </div>
            `;

            slides.push({
                type: 'weapon',
                html: `
                    ${domainHeaderHtml}
                    ${renderWeaponFarmingCard(w)}
                `
            });
        });
    }

    // 3. Fallback : si aucun besoin de personnage/arme enregistré pour aujourd'hui,
    // on affiche les donjons ouverts du jour par nation
    if (slides.length === 0) {
        FARMING_DOMAINS.forEach(dom => {
            const matchingRot = (dom.rotations || []).find(r => dayIdx === 0 || (r.days && r.days.includes(dayIdx)));
            if (matchingRot) {
                const rotItems = matchingRot.items || {};
                const isTalent = dom.category === 'talent';
                const domName = getLocalizedItemName(dom.name, currentLang, dom.id);
                const regName = getLocalizedItemName(dom.region, currentLang, '');
                const bookName = (dayIdx === 0)
                    ? (isTalent ? t('roadmap.farming.allBooksAvailable') : t('roadmap.farming.allMaterialsAvailable'))
                    : getLocalizedItemName(matchingRot.name, currentLang, '');

                const previewIconsHtml = isTalent ? `
                    ${getItemIconHtml(rotItems.teachings?.icon, '', 'width:24px; height:24px; object-fit:contain;')}
                    ${getItemIconHtml(rotItems.guide?.icon, '', 'width:24px; height:24px; object-fit:contain;')}
                    ${getItemIconHtml(rotItems.philosophy?.icon, '', 'width:24px; height:24px; object-fit:contain;')}
                ` : `
                    ${getItemIconHtml(rotItems.green?.icon, '', 'width:24px; height:24px; object-fit:contain;')}
                    ${getItemIconHtml(rotItems.blue?.icon, '', 'width:24px; height:24px; object-fit:contain;')}
                    ${getItemIconHtml(rotItems.purple?.icon, '', 'width:24px; height:24px; object-fit:contain;')}
                    ${getItemIconHtml(rotItems.gold?.icon, '', 'width:24px; height:24px; object-fit:contain;')}
                `;

                slides.push({
                    type: 'domain',
                    html: `
                        <div style="display:flex; align-items:center; gap:12px; min-width:0; margin-bottom:4px;">
                            <div style="display:inline-flex; align-items:center; gap:3px; background:var(--shadow-subtle); border-radius:6px; padding:3px 6px; flex-shrink:0;">
                                ${previewIconsHtml}
                            </div>
                            <div style="display:flex; flex-direction:column; gap:2px; min-width:0;">
                                <span style="font-size:14px; font-weight:normal; color:var(--text-always-white); line-height:1.2; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                                    ${bookName}
                                </span>
                                <span style="font-size:11px; color:var(--text-grey); line-height:1.2; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                                    ${domName} • ${regName}
                                </span>
                            </div>
                        </div>
                        <div style="background:var(--shadow-subtle); border:none; border-radius:8px; padding:12px; display:flex; align-items:center; justify-content:space-between; gap:10px;">
                            <span style="font-size:12px; color:var(--text-primary);">${isTalent ? t('roadmap.farming.catTalents') : t('roadmap.farming.catWeapons')}</span>
                            <span style="font-size:11px; color:var(--text-grey);">${regName}</span>
                        </div>
                    `
                });
            }
        });
    }

    return slides;
}

/**
 * Construit le HTML complet de la page d'accueil moderne.
 */
export function renderHomeDashboardHtml(data) {
    const {
        profiles = [],
        linkedUid = null,
        favoriteUid = null,
        activeServer = 'EU',
        characters = [],
        discordName = ''
    } = data;

    const currentLang = (LANG === 'en') ? 'en' : 'fr';
    const dayIdx = getGenshinDayIndex(activeServer);
    const dayName = getDayName(dayIdx, currentLang);
    const cycles = getEndgameCyclesInfo(activeServer);
    const focusCharNom = data.focusCharNom || (typeof localStorage !== 'undefined' ? localStorage.getItem('guoba_roadmap_focus_char') : null);
    const slides = buildDailyFarmingSlides(characters, activeServer, focusCharNom);

    // Résolution du profil mis en vedette (uniquement si un compte Discord est lié ou si un favori a été défini)
    const featuredProfile = (linkedUid && profiles.find(p => String(p.uid) === String(linkedUid)))
        || (favoriteUid && profiles.find(p => String(p.uid) === String(favoriteUid)))
        || null;

    // Profil actif pour les données contextuelles des widgets (Endgame, farming)
    const activeProfile = featuredProfile || profiles[0] || null;

    // Autres comptes récents (en excluant le compte mis en vedette s'il existe)
    const otherProfiles = featuredProfile
        ? profiles.filter(p => String(p.uid) !== String(featuredProfile.uid))
        : profiles;

    // La région est considérée comme déjà déterminée si l'utilisateur est connecté avec un compte lié ou favori
    const isServerDetermined = Boolean(
        (linkedUid && getServerFromUid(linkedUid)) ||
        (favoriteUid && getServerFromUid(favoriteUid))
    );

    const greetingTitle = discordName
        ? t('home.titleWelcome').replace('{name}', discordName)
        : t('home.title');

    // ─────────────────────────────────────────────────────────────
    // WIDGET 1 : CARROUSEL « AUJOURD'HUI »
    // ─────────────────────────────────────────────────────────────
    const hasSlides = slides.length > 0;
    const slidesHtml = hasSlides ? slides.map((s, idx) => `
        <div class="dash-farming-slide ${idx === 0 ? 'active' : ''}" data-slide-index="${idx}" style="display: ${idx === 0 ? 'flex' : 'none'}; flex-direction:column; gap:8px;">
            ${s.html}
        </div>
    `).join('') : `
        <div style="color:var(--text-grey); font-size:13px; padding:12px 0;">
            ${t('home.emptyToday')}
        </div>
    `;

    // ─────────────────────────────────────────────────────────────
    // WIDGET 2 : CYCLES ENDGAME (CARNAGE, THÉÂTRE, ABYSSES)
    // ─────────────────────────────────────────────────────────────
    const stygianRecordSec = activeProfile?.stygianSec;
    const stygianRecordIdx = activeProfile?.stygianIndex;
    const abyssStars = activeProfile?.abyssStars ?? 36;
    const theaterStars = activeProfile?.theaterStars ?? 18;

    // Détection des modes récemment réinitialisés (< 24h) pour le badge
    const newResetModesFr = [];
    const newResetModesEn = [];
    let newBadgeBg = '#3c5ccd';

    if (cycles.recentResets?.stygian) {
        newResetModesFr.push('Carnage Chtonien');
        newResetModesEn.push('Stygian Onslaught');
        newBadgeBg = 'rgba(139, 45, 139, 0.6)';
    }
    if (cycles.recentResets?.theater) {
        newResetModesFr.push('Théâtre de l\'Imaginarium');
        newResetModesEn.push('Imaginarium Theater');
        newBadgeBg = 'rgba(82, 42, 138, 0.6)';
    }
    if (cycles.recentResets?.abyss) {
        newResetModesFr.push('Profondeurs Spiralées');
        newResetModesEn.push('Spiral Abyss');
        newBadgeBg = 'rgba(37, 51, 85, 0.6)';
    }

    const newBadgeLabelFr = newResetModesFr.length > 0 ? `Nouveau - ${newResetModesFr.join(', ')}` : 'Nouveau !';
    const newBadgeLabelEn = newResetModesEn.length > 0 ? `New - ${newResetModesEn.join(', ')}` : 'New!';
    const newBadgeLabel = currentLang === 'en' ? newBadgeLabelEn : newBadgeLabelFr;

    const endgameWidgetHtml = `
        <div class="dash-widget dash-endgame-widget" style="background:var(--bg-panel); border-radius:8px; padding: 12px; display:flex; flex-direction:column; gap:12px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <h3 style="margin:0; font-size:15px; color:var(--text-primary); font-weight:normal; display:flex; align-items:center; gap:8px; justify-content: space-between; width: 100%;">
                    <span>${t('home.endgameCycles')}</span>
                    ${cycles.hasRecentReset ? `
                        <span class="dynamic-i18n" data-fr="${newBadgeLabelFr}" data-en="${newBadgeLabelEn}" style="background: ${newBadgeBg}; color: var(--text-always-white); border: 1px solid var(--border-subtle); font-family: 'ShinShin', sans-serif; font-size: 10px; padding: 2px 6px; border-radius: 4px; line-height: 1.2; letter-spacing: 0.3px; white-space: nowrap;">
                            ${newBadgeLabel}
                        </span>
                    ` : ''}
                </h3>
            </div>

            <!-- CARTE CARNAGE CHTONIEN -->
            <div style="background:var(--shadow-subtle); border-radius:6px; padding:12px; display:flex; flex-direction:column; gap:10px; position:relative; overflow:hidden;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <div style="display:flex; align-items:center; gap:6px;">
                        <span style="font-size:13px; color:var(--text-primary); font-weight:normal;">${t('home.stygianOnslaught')}</span>
                    </div>
                    <span style="font-size:11px; color:var(--text-muted); font-weight:normal;">
                        ${t('home.remainingDays', cycles.stygian.cycleDaysLeft)}
                    </span>
                </div>

                <!-- BANNIÈRE BONUS D'ARTÉFACTS (Jours 1 à 10) -->
                ${cycles.stygian.isBonusActive ? `
                    <div style="background: rgba(139, 45, 139, 0.4); border-radius: 6px; padding: 4px 10px 4px 4px; display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                        <div style="display:flex; align-items:center; gap:8px; min-width:0;">
                            <img src="/assets/endgame/disturbance_outbreak.png" alt="" style="width:28px; height:28px; object-fit:contain; flex-shrink:0;">
                            <div style="min-width:0;">
                                <div style="font-size:11px; color:var(--text-always-white); font-weight:normal; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                                    ${t('home.stygianBonusBadge')}
                                </div>
                            </div>
                        </div>
                        <span style="font-size:10px; color:var(--text-always-white); background:rgba(139, 45, 139, 0.6); border: 1px solid var(--border-subtle); padding:1px 6px; border-radius:4px; white-space:nowrap;">
                            ${t('home.remainingTime', cycles.stygian.bonusDaysLeft, cycles.stygian.bonusHoursLeft)}
                        </span>
                    </div>
                ` : ''}

                <!-- LES 3 BOSS EN DUEL AVEC L'IMAGE DU BOSS EN FOND -->
                <div style="display:flex; justify-content:space-between; gap:8px; margin-top:2px;">
                    ${cycles.stygian.bosses.map(boss => `
                        <div class="stygian-boss-card" style="position:relative; flex:1; min-width:0; border-radius:6px; overflow:hidden; min-height:96px; display:flex; flex-direction:column; justify-content:space-between; align-items:center; padding:8px 6px; text-align:center; box-sizing:border-box;">
                            <!-- IMAGE DE FOND DU BOSS -->
                            <img src="${boss.image || boss.fallbackIcon}" alt="" style="position:absolute; inset:0; width:100%; height:100%; object-fit:cover; pointer-events:none; z-index:0;" onerror="this.style.display='none'">
                            <!-- OVERLAY SOMBRE DÉGRADÉ POUR LA LISIBILITÉ -->
                            <div style="position:absolute; inset:0; background:linear-gradient(180deg, rgba(15, 17, 23, 0.45) 0%, rgba(15, 17, 23, 0.85) 100%); pointer-events:none; z-index:1;"></div>

                            <!-- NOM DU BOSS EN HAUT -->
                            <div style="position:relative; z-index:2; width:100%;">
                                <span style="font-size:11px; font-weight:normal; color:var(--text-always-white); line-height:1.2; text-shadow:0 1px 4px rgba(0,0,0,0.9); display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${currentLang === 'en' ? boss.nameEn : boss.nameFr}">
                                    ${currentLang === 'en' ? boss.nameEn : boss.nameFr}
                                </span>
                            </div>

                            <!-- CONSEILS / PILLS EN BAS -->
                            <div style="position:relative; z-index:2; display:flex; flex-direction:row; flex-wrap:wrap; justify-content:center; align-items:center; gap:4px; width:100%; margin-top:6px;">
                                ${renderBossTips(boss, currentLang)}
                            </div>
                        </div>
                    `).join('')}
                </div>

                ${stygianRecordIdx !== null && stygianRecordIdx !== undefined ? `
                    <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid rgba(255,255,255,0.06); padding-top:10px; margin-top:2px; font-size:12px;">
                        <span style="color:var(--text-grey);">${t('home.stygianRecord')} :</span>
                        <div style="display:flex; align-items:center; gap:6px;">
                            ${stygianIconHtml(stygianRecordIdx, stygianRecordSec)}
                            <span style="color:var(--text-primary); font-weight:normal;">Diff. ${stygianRecordIdx} ${stygianRecordSec ? `(${stygianRecordSec}s)` : ''}</span>
                        </div>
                    </div>
                ` : ''}
            </div>

            <!-- DEUX SOUS-CARTES : ABYSSES & THÉÂTRE -->
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                <!-- PROFONDEURS SPIRALÉES -->
                <div style="background:var(--shadow-subtle); border-radius:6px; padding:10px 12px; display:flex; flex-direction:column; justify-content:space-between; gap:8px;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-size:12px; color:var(--text-primary);">${t('home.spiralAbyss')}</span>
                        <span style="font-size:11px; background:rgba(37, 51, 85, 0.6); var(--text-always-white); border: 1px solid var(--border-subtle); padding:1px 6px; border-radius:4px; display:flex; align-items:center; gap:3px;">
                            <img src="${ICON_PATH}icon_abyss_star.webp" style="width:14px; height:14px;" alt="">
                            ${abyssStars}
                        </span>
                    </div>
                    <span style="font-size:11px; color:var(--text-muted);">
                        ${t('home.remainingTime', cycles.abyss.daysLeft, cycles.abyss.hoursLeft)}
                    </span>
                </div>

                <!-- THÉÂTRE DE L'IMAGINARIUM -->
                <div style="background:var(--shadow-subtle); border-radius:6px; padding:10px 12px; display:flex; flex-direction:column; justify-content:space-between; gap:8px;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-size:12px; color:var(--text-primary);">${t('home.imaginariumTheater')}</span>
                        <span style="font-size:11px; background:rgba(82, 42, 138, 0.6); var(--text-always-white); border: 1px solid var(--border-subtle); padding:1px 6px; border-radius:4px; display:flex; align-items:center; gap:3px;">
                            <img src="${ICON_PATH}icon_theater_star.webp" style="width:14px; height:14px;" alt="">
                            ${theaterStars}
                        </span>
                    </div>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-size:11px; color:var(--text-muted);">
                            ${t('home.remainingTime', cycles.theater.daysLeft, cycles.theater.hoursLeft)}
                        </span>
                        <div style="display:flex; gap:3px;" title="${t('home.requiredElements')}">
                            ${cycles.theater.elements.map(el => elementIconHtml(el, 13)).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // ─────────────────────────────────────────────────────────────
    // WIDGET 3 : LE SAVIEZ-VOUS ?
    // ─────────────────────────────────────────────────────────────
    const randomTip = DID_YOU_KNOW_TIPS[Math.floor(Math.random() * DID_YOU_KNOW_TIPS.length)];
    const tipText = currentLang === 'en' ? randomTip.en : randomTip.fr;

    const didYouKnowWidgetHtml = `
        <div class="dash-widget dash-tip-widget" style="background:var(--bg-panel); border-radius:8px; padding:12px; display:flex; flex-direction:column; gap:10px; position:relative; overflow:hidden;">
            <!-- COG VECTORIEL EN FOND EN BAS À DROITE (COUPÉ PAR LA CARTE) -->
            <img src="/assets/home/cog.svg" alt="" style="position:absolute; right:-25px; bottom:-45px; width:125px; height:125px; object-fit:contain; opacity:0.07; pointer-events:none; user-select:none; z-index:0;">

            <div style="display:flex; align-items:center; gap:10px; position:relative; z-index:1;">
                <img src="/assets/home/sandrone_idea.webp" alt="Sandrone" style="width:38px; height:38px; object-fit:contain; flex-shrink:0;">
                <div style="display:flex; flex-direction:column; gap:1px;">
                    <h3 style="margin:0; font-size:15px; color:var(--text-primary); font-weight:normal; line-height:1.2;">${t('home.didYouKnow')}</h3>
                    <span style="font-size:11px; color:var(--text-muted); line-height:1.2;">${t('home.didYouKnowSubtitle')}</span>
                </div>
            </div>
            <p style="margin:0; font-size:13px; color:var(--text-grey); line-height:1.5; position:relative; z-index:1;">
                ${tipText}
            </p>
        </div>
    `;

    // ─────────────────────────────────────────────────────────────
    // COLONNE GAUCHE : CARTES DE PROFILS
    // ─────────────────────────────────────────────────────────────
    function renderProfileCard(p, isPinned = false) {
        const isDiscord = String(p.uid) === String(linkedUid);
        const isFav = String(p.uid) === String(favoriteUid);
        const server = p.uid ? (SERVERS[p.uid[0]]?.id || 'EU') : 'EU';

        const row1 = [
            `<span class="pp-badge pp-badge-server pp-badge-server-${server}">${server}</span>`,
            p.achievements != null
                ? `<span class="pp-badge pp-badge-achievements"><img src="${ICON_PATH}icon_achievements.webp" class="pp-icon" alt="${t('ui.alt.achievements')}" decoding="async">${p.achievements.toLocaleString(currentLang)}</span>`
                : '',
            p.ar ? `<span class="pp-badge pp-badge-ar">AR${p.ar}</span>` : '',
        ].filter(Boolean).join('');

        const row2Items = [
            p.stygianSec != null
                ? `<span class="pp-badge pp-badge-stygian">${stygianIconHtml(p.stygianIndex, p.stygianSec)}${p.stygianSec}s</span>`
                : '',
            p.theaterStars != null
                ? `<span class="pp-badge pp-badge-theater"><img src="${ICON_PATH}icon_theater_star.webp" class="pp-icon" alt="${t('ui.alt.theater')}" decoding="async">${p.theaterStars}</span>`
                : '',
            p.abyssStars != null
                ? `<span class="pp-badge pp-badge-abyss"><img src="${ICON_PATH}icon_abyss_star.webp" class="pp-icon" alt="${t('ui.alt.abyss')}" decoding="async">${p.abyssStars}</span>`
                : '',
        ].filter(Boolean);
        const row2 = row2Items.join('');

        return `
            <div class="recent-account-card-wrapper ${isDiscord ? 'discord-card-wrapper' : (isFav ? 'fav-card-wrapper' : '')}" onclick="document.getElementById('uidInput').value = '${p.uid}'; fetchUserData();" style="width: 100%; flex-shrink: 0; box-sizing: border-box; cursor: pointer;">
                ${isDiscord ? `
                    <div class="recent-action-btn discord-btn active" title="${t('home.discordAccount') || 'Compte Lié'}" style="display: flex; cursor: default;">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                        </svg>
                    </div>
                ` : `
                    <div onclick="toggleFavoriteProfile('${p.uid}', event)"
                         title="${isFav ? t('home.unpinAccount') : t('home.pinAccount')}"
                         class="recent-action-btn fav-btn ${isFav ? 'active' : ''}"
                         style="display: ${isFav || !favoriteUid ? 'flex' : 'none'};">
                         <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="${isFav ? 'currentColor' : 'none'}" stroke-linecap="round" stroke-linejoin="round">
                             <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z"></path>
                         </svg>
                    </div>
                `}

                <div onclick="deleteRecentProfile('${p.uid}', event)" 
                     class="recent-action-btn del-btn"
                     ${isDiscord ? 'style="display: none;"' : ''}>
                     <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                         <line x1="18" y1="6" x2="6" y2="18"></line>
                         <line x1="6" y1="6" x2="18" y2="18"></line>
                     </svg>
                </div>

                <div class="player-profile-card" style="margin: 0; width: 100%; height: 100%; box-sizing: border-box; pointer-events: none;">
                    ${p.banner ? `<img class="player-profile-bg" src="${p.banner}" alt="" crossorigin="anonymous">` : `<div class="player-profile-bg"></div>`}
                    <div class="player-profile-content">
                        <img class="player-profile-avatar" src="${p.pic}" alt="${t('ui.alt.avatar')}" crossorigin="anonymous" onerror="this.src='https://enka.network/ui/UI_AvatarIcon_PlayerBoy_Circle.png'" decoding="async">
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
    }

    const featuredHtml = featuredProfile ? renderProfileCard(featuredProfile, true) : '';
    const otherCardsHtml = otherProfiles.map(p => renderProfileCard(p, false)).join('');

    return `
        <div class="dash-container" style="display: flex; gap: 20px; width: 100%; box-sizing: border-box;">
            <!-- COLONNE GAUCHE : PROFILS RÉCENTS -->
            <div class="dash-col-left" style="flex: 1.15; min-width: 0; display: flex; flex-direction: column; gap: 20px;">
                <div class="dash-left-top" style="padding: 10px; margin: -10px -10px 0 -10px;">
                    <h2 id="home-title" style="color: var(--text-primary); font-size: 26px; margin: 0 0 ${featuredProfile ? '14px' : '4px'} 0; font-weight: normal;">
                        ${greetingTitle}
                    </h2>
                    ${featuredHtml}
                </div>

                ${otherCardsHtml ? `
                    <div class="dash-left-bottom" style="flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 12px;">
                        ${featuredProfile ? `
                            <h3 class="dash-recent-header" style="color: var(--text-grey); font-size: 15px; margin: 0 0 4px 0; font-weight: normal; flex-shrink: 0;">
                                ${t('home.recentProfiles')}
                            </h3>
                        ` : ''}
                        <div class="dash-recent-list-wrapper" style="flex: 1; min-height: 0; position: relative;">
                            <div class="dash-recent-list" style="display: flex; flex-direction: column; gap: 14px;">
                                ${otherCardsHtml}
                            </div>
                        </div>
                    </div>
                ` : ''}
            </div>

            <!-- COLONNE DROITE : WIDGETS DU COCKPIT -->
            <div class="dash-col-right" style="flex: 1; min-width: 320px; display: flex; flex-direction: column; gap: 12px; margin-top: 49px;">
                <!-- WIDGET 1 : AUJOURD'HUI (CARROUSEL AUTO) -->
                <div id="dash-farming-carousel" class="dash-widget" style="background:var(--bg-panel); border-radius:8px; padding:12px; display:flex; flex-direction:column; gap:12px; position:relative;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <h3 style="margin:0; font-size:15px; color:var(--text-primary); font-weight:normal;">
                            <span>${t('home.today')} (${dayName.toLowerCase()})</span>
                        </h3>

                        <!-- SÉLECTEUR RAPIDE DE SERVEUR (affiché uniquement si la région n'est pas déjà déterminée) -->
                        ${!isServerDetermined ? `
                            <div class="custom-select-container" style="position:relative;">
                                <button onclick="toggleServerQuickMenu(event)" class="link-button hover-bg-hover" style="border:none; background:var(--shadow-subtle); color:var(--text-primary); padding:2px 8px; border-radius:6px; cursor:pointer; font-size:12px; height:24px; display:flex; align-items:center; gap:4px;">
                                    <span style="font-family: 'ShinShin', sans-serif;">${activeServer}</span>
                                    <img src="${ICON_PATH}icon_arrow_down_white.svg" alt="" style="width:8px; opacity:0.6;">
                                </button>
                                <div id="server-quick-menu" class="custom-select-menu" style="bottom: auto !important; top: calc(100% + 4px) !important; margin-bottom: 0 !important; right: 0; left: auto; min-width: 100px; box-shadow: 0 4px 14px rgba(0, 0, 0, 0.45);">
                                    <div class="custom-select-item" onclick="switchServerManual('EU')">EU (Europe)</div>
                                    <div class="custom-select-item" onclick="switchServerManual('NA')">NA (America)</div>
                                    <div class="custom-select-item" onclick="switchServerManual('Asia')">Asia</div>
                                </div>
                            </div>
                        ` : ''}
                    </div>

                    <!-- SLIDES CONTAINER -->
                    <div class="dash-slides-container" style="min-height:92px;">
                        ${slidesHtml}
                    </div>

                    <!-- CONTRÔLES DU CARROUSEL : PETITS POINTS BLANCS CLIQUABLES CENTRÉS -->
                    ${slides.length > 1 ? `
                        <div style="display:flex; justify-content:center; align-items:center;">
                            <div class="dash-dots" style="display:flex; gap:8px; align-items:center;">
                                ${slides.map((_, i) => `<span class="dash-dot ${i === 0 ? 'active' : ''}" data-dot-index="${i}" onclick="goToFarmingSlide(${i})" style="width:7px; height:7px; border-radius:50%; background:${i === 0 ? 'var(--text-primary)' : 'rgba(255,255,255,0.25)'}; cursor:pointer; transition:all 0.2s;" title="${i + 1} / ${slides.length}"></span>`).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>

                <!-- WIDGET 2 : CYCLES ENDGAME -->
                ${endgameWidgetHtml}

                <!-- WIDGET 3 : LE SAVIEZ-VOUS ? -->
                ${didYouKnowWidgetHtml}
            </div>
        </div>
    `;
}

/**
 * Initialise les comportements interactifs du Dashboard (Carrousel automatique, pause au survol).
 */
export function initHomeDashboardInteractions() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.dash-farming-slide');
    const dots = document.querySelectorAll('.dash-dot');
    let autoTimer = null;

    function showSlide(index) {
        if (!slides || slides.length <= 1) return;
        currentSlide = (index + slides.length) % slides.length;

        slides.forEach((s, i) => {
            s.style.display = (i === currentSlide) ? 'flex' : 'none';
        });

        dots.forEach((d, i) => {
            d.style.background = (i === currentSlide) ? 'var(--text-primary)' : 'rgba(255,255,255,0.2)';
        });
    }

    function startAutoCycle() {
        stopAutoCycle();
        if (slides.length > 1) {
            autoTimer = setInterval(() => {
                showSlide(currentSlide + 1);
            }, 5500);
        }
    }

    function stopAutoCycle() {
        if (autoTimer) {
            clearInterval(autoTimer);
            autoTimer = null;
        }
    }

    window.goToFarmingSlide = function (idx) {
        showSlide(idx);
        startAutoCycle();
    };

    window.nextFarmingSlide = function () {
        showSlide(currentSlide + 1);
        startAutoCycle();
    };

    window.prevFarmingSlide = function () {
        showSlide(currentSlide - 1);
        startAutoCycle();
    };

    const carouselEl = document.getElementById('dash-farming-carousel');
    if (carouselEl) {
        carouselEl.addEventListener('mouseenter', stopAutoCycle);
        carouselEl.addEventListener('mouseleave', startAutoCycle);
    }

    startAutoCycle();

    window.toggleServerQuickMenu = function (e) {
        e.stopPropagation();
        const m = document.getElementById('server-quick-menu');
        if (m) m.classList.toggle('show');
    };

    window.switchServerManual = function (serverKey) {
        setForcedServer(serverKey);
        if (typeof window.renderHome === 'function') {
            window.renderHome();
        }
    };

    window.openRoadmapFromHome = function (targetUid) {
        if (typeof window.showAccountRoadmap === 'function' && window.globalPersoData && window.globalPersoData.length > 0) {
            window.showAccountRoadmap();
        } else if (targetUid) {
            const inp = document.getElementById('uidInput');
            if (inp) inp.value = targetUid;
            if (typeof window.fetchUserData === 'function') {
                window.fetchUserData().then(() => {
                    setTimeout(() => {
                        if (typeof window.showAccountRoadmap === 'function') window.showAccountRoadmap();
                    }, 400);
                });
            }
        }
    };
}

