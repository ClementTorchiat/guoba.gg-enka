// src/components/home/HomeDashboard.js
// Rendu modulaire de la page d'accueil moderne (Tableau de bord 2 colonnes)

import { t, LANG } from '../../scripts/i18n.js';
import { getWeeklyFarmingSchedule, getLocalizedItemName } from '../roadmap/farmingEngine.js';
import {
    getItemIconHtml,
    renderMaterialPill
} from '../roadmap/DailyFarmingRoadmap.js';
import {
    calculateDomainRankings,
    renderDomainSplitIcon,
    getLocalizedSetName,
    getSetIcon
} from '../roadmap/DomainPlanner.js';
import ARTIFACT_DOMAINS from '../../data/artifact_domains.json';
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
 * Rendu compact et calibré (hauteur uniforme) d'une carte de personnage pour le carrousel de l'accueil.
 * Organisé en 3 rangées horizontales stables pour éliminer tout décalage vertical (layout shift).
 */
function renderDashboardCharacterCard(charData) {
    const rot = charData.bookRotation;
    const items = rot?.items || {};
    const cost = charData.totalCost || {};
    const hasLocked = charData.hasLockedTalents;

    // 1. Puces horizontales des aptitudes cibles
    const talentChipsHtml = (charData.talentGaps || []).map(gap => {
        const isLocked = gap.isLocked;
        const titleAttr = isLocked
            ? `${gap.talentLabel} : ${t('ui.char.level', gap.currentLvl)} ➔ ${t('ui.char.level', gap.targetLvl)} (${t('roadmap.farming.ascensionRequiredShort', gap.requiredAsc)})`
            : `${gap.talentLabel} : ${t('ui.char.level', gap.currentLvl)} ➔ ${t('ui.char.level', gap.targetLvl)}`;

        const chipBg = isLocked ? 'rgba(245, 158, 11, 0.12)' : 'var(--shadow-subtle)';
        const chipBorder = isLocked ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid transparent';
        const targetColor = isLocked ? '#fbbf24' : 'var(--accent-green)';

        return `
            <div style="display:inline-flex; align-items:center; gap:5px; background:${chipBg}; border:${chipBorder}; padding:2px 7px; border-radius:5px; font-size:11px; white-space:nowrap; flex-shrink:0;" title="${titleAttr}">
                ${gap.talentIcon ? `<img src="${gap.talentIcon}" alt="" style="width:14px; height:14px; object-fit:contain; border-radius:3px;">` : ''}
                <span style="color:var(--text-grey); font-size:10px;">${gap.currentLvl}</span>
                <span style="color:var(--text-grey); font-size:9px;">➔</span>
                <span style="color:${targetColor}; font-weight:normal; font-size:11px;">${gap.targetLvl}</span>
            </div>
        `;
    }).join('');

    // 2. Puces de pré-farming intégrées dans la ligne des matériaux si nécessaire
    const prefarmingPillsHtml = hasLocked ? `
        ${(charData.worldBoss?.icon && charData.ascensionCost?.boss > 0) ? `
            <div style="display:inline-flex; align-items:center; gap:4px; background:rgba(245, 158, 11, 0.12); border:1px solid rgba(245, 158, 11, 0.4); padding:2px 6px 2px 4px; border-radius:5px; flex-shrink:0;" title="${t('roadmap.farming.toUnlockAscendWith')} : ${getLocalizedItemName(charData.worldBoss.name)} (${charData.ascensionCost.boss})">
                ${getItemIconHtml(charData.worldBoss.icon, getLocalizedItemName(charData.worldBoss.name), 'width:18px; height:18px; object-fit:contain; flex-shrink:0;')}
                <span style="font-size:11px; color:#fbbf24; font-weight:normal; line-height:1;">${charData.ascensionCost.boss}</span>
            </div>
        ` : ''}
        ${(charData.specialty?.icon && charData.ascensionCost?.specialty > 0) ? `
            <div style="display:inline-flex; align-items:center; gap:4px; background:rgba(245, 158, 11, 0.12); border:1px solid rgba(245, 158, 11, 0.4); padding:2px 6px 2px 4px; border-radius:5px; flex-shrink:0;" title="${t('roadmap.farming.toUnlockAscendWith')} : ${getLocalizedItemName(charData.specialty.name)} (${charData.ascensionCost.specialty})">
                ${getItemIconHtml(charData.specialty.icon, getLocalizedItemName(charData.specialty.name), 'width:18px; height:18px; object-fit:contain; flex-shrink:0;')}
                <span style="font-size:11px; color:#fbbf24; font-weight:normal; line-height:1;">${charData.ascensionCost.specialty}</span>
            </div>
        ` : ''}
    ` : '';

    return `
        <div style="background:var(--shadow-subtle); border-radius:8px; padding:8px 10px; display:flex; flex-direction:column; gap:8px; min-height:124px; box-sizing:border-box; justify-content:space-between;">
            <!-- Rangée 1 : En-tête Personnage avec infos sous le nom -->
            <div style="display:flex; align-items:center; gap:10px; min-width:0;">
                <img src="${charData.charAvatar}" alt="${charData.charNom}" style="width:38px; height:38px; border-radius:6px; background:var(--shadow-subtle); object-fit:cover; flex-shrink:0;">
                <div style="min-width:0; display:flex; flex-direction:column; gap:2px;">
                    <div style="display:flex; align-items:center; gap:6px; min-width:0; flex-wrap:wrap;">
                        <span style="font-size:13px; font-weight:normal; color:var(--text-primary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${charData.charNom}</span>
                        ${charData.isFocus ? `<span style="font-size:9px; background:var(--accent-blue); color:#fff; padding:1px 5px; border-radius:4px; font-weight:normal; text-transform:uppercase;">Focus</span>` : ''}
                        ${hasLocked ? `<span style="font-size:9px; background:rgba(245, 158, 11, 0.18); color:#fbbf24; padding:1px 6px; border-radius:4px; font-weight:normal; display:inline-flex; align-items:center; gap:3px;" title="${t('roadmap.farming.preFarmingTooltip')} : ${charData.maxRequiredAscLabel || '80/90'}">${t('roadmap.farming.preFarmingBadge')}</span>` : ''}
                    </div>
                    <div style="font-size:11px; color:var(--text-grey); display:flex; align-items:center; gap:5px; margin-top:1px;">
                        <div style="display:inline-flex; align-items:center; gap:4px;">
                            ${getItemIconHtml(items.philosophy?.icon || items.guide?.icon || items.teachings?.icon, getLocalizedItemName(rot?.name), 'width:14px; height:14px; object-fit:contain; flex-shrink:0;')}
                            <span>${getLocalizedItemName(rot?.name)}</span>
                        </div>
                        <span>•</span>
                        <span style="color:var(--accent-green); font-weight:normal;">${t('roadmap.farming.resinCount', cost.estimatedResin || 0)}</span>
                    </div>
                </div>
            </div>

            <!-- Rangée 2 : Aptitudes cibles (Alignées horizontalement) -->
            <div style="display:flex; align-items:center; gap:6px; min-height:24px; overflow-x:auto; scrollbar-width:none;">
                ${talentChipsHtml}
            </div>

            <!-- Rangée 3 : Matériaux requis (+ matériaux de pré-farming si verrouillé) -->
            <div style="display:flex; align-items:center; gap:5px; min-height:24px; overflow-x:auto; scrollbar-width:none;">
                ${renderMaterialPill(items.teachings?.icon, cost.teachings, getLocalizedItemName(items.teachings?.name), '#4ade80')}
                ${renderMaterialPill(items.guide?.icon, cost.guides, getLocalizedItemName(items.guide?.name), '#60a5fa')}
                ${renderMaterialPill(items.philosophy?.icon, cost.philosophies, getLocalizedItemName(items.philosophy?.name), '#c084fc')}
                ${renderMaterialPill(charData.weeklyBoss?.icon, cost.weeklyBoss, getLocalizedItemName(charData.weeklyBoss?.name), '#f59e0b')}
                ${cost.crown > 0 ? renderMaterialPill('UI_ItemIcon_104319', cost.crown, t('roadmap.farming.crownOfInsight'), '#f59e0b') : ''}
                ${cost.mora > 0 ? renderMaterialPill('UI_ItemIcon_202', formatMora(cost.mora), t('roadmap.farming.mora'), '#fbbf24') : ''}
                ${prefarmingPillsHtml}
            </div>
        </div>
    `;
}

/**
 * Rendu compact et calibré (hauteur uniforme) d'une carte d'arme pour le carrousel de l'accueil.
 * Organisé avec la même géométrie exacte que la carte de personnage (3 rangées stables).
 */
function renderDashboardWeaponCard(weaponData) {
    const rot = weaponData.weaponRotation;
    const items = rot?.items || {};
    const cost = weaponData.totalCost || {};
    const repMat = items.gold || items.purple || items.blue || items.green;

    return `
        <div style="background:var(--shadow-subtle); border-radius:8px; padding:8px 10px; display:flex; flex-direction:column; gap:8px; min-height:124px; box-sizing:border-box; justify-content:space-between;">
            <!-- Rangée 1 : En-tête Arme avec infos sous le nom -->
            <div style="display:flex; align-items:center; gap:10px; min-width:0;">
                <img src="${weaponData.weaponIcon}" alt="${weaponData.weaponName}" style="width:38px; height:38px; border-radius:6px; background:var(--shadow-subtle); object-fit:contain; flex-shrink:0;">
                <div style="min-width:0; display:flex; flex-direction:column; gap:2px;">
                    <div style="display:flex; align-items:center; gap:6px; min-width:0; flex-wrap:wrap;">
                        <span style="font-size:13px; font-weight:normal; color:var(--text-primary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${weaponData.weaponName}</span>
                        <span style="font-size:10px; color:#eab308; font-weight:normal;">${weaponData.rarity}★</span>
                        ${weaponData.isFocus ? `<span style="font-size:9px; background:var(--accent-blue); color:#fff; padding:1px 5px; border-radius:4px; font-weight:normal; text-transform:uppercase;">Focus</span>` : ''}
                    </div>
                    <div style="font-size:11px; color:var(--text-grey); display:flex; align-items:center; gap:5px; margin-top:1px; flex-wrap:wrap;">
                        ${weaponData.charNom ? `
                            <div style="display:inline-flex; align-items:center; gap:4px;">
                                ${weaponData.charAvatar ? `<img src="${weaponData.charAvatar}" alt="" style="width:14px; height:14px; border-radius:50%; object-fit:cover;">` : ''}
                                <span>${weaponData.charNom}</span>
                            </div>
                            <span>•</span>
                        ` : ''}
                        <div style="display:inline-flex; align-items:center; gap:4px;">
                            ${repMat?.icon ? getItemIconHtml(repMat.icon, getLocalizedItemName(rot?.name), 'width:14px; height:14px; object-fit:contain; flex-shrink:0;') : ''}
                            <span>${getLocalizedItemName(rot?.name)}</span>
                        </div>
                        <span>•</span>
                        <span style="color:var(--accent-green); font-weight:normal;">${t('roadmap.farming.resinCount', cost.estimatedResin || 0)}</span>
                    </div>
                </div>
            </div>

            <!-- Rangée 2 : Objectif de niveau (Même hauteur que les aptitudes) -->
            <div style="display:flex; align-items:center; gap:6px; min-height:24px; overflow-x:auto; scrollbar-width:none;">
                <div style="display:inline-flex; align-items:center; gap:6px; background:var(--shadow-subtle); padding:2px 7px; border-radius:5px; font-size:11px; white-space:nowrap; flex-shrink:0;">
                    <span style="color:var(--text-grey); font-size:10px;">${t('roadmap.farming.weaponElevation')}</span>
                    <span style="color:var(--text-grey); font-size:10px;">${t('ui.char.level', weaponData.currentLvl)} (${weaponData.currentAsc}★)</span>
                    <span style="color:var(--text-grey); font-size:9px;">➔</span>
                    <span style="color:var(--accent-green); font-weight:normal; font-size:11px;">${t('ui.char.level', weaponData.targetLvl)} (${weaponData.targetAsc}★)</span>
                </div>
            </div>

            <!-- Rangée 3 : Matériaux requis -->
            <div style="display:flex; align-items:center; gap:5px; min-height:24px; overflow-x:auto; scrollbar-width:none;">
                ${renderMaterialPill(items.green?.icon, cost.green, getLocalizedItemName(items.green?.name), '#4ade80')}
                ${renderMaterialPill(items.blue?.icon, cost.blue, getLocalizedItemName(items.blue?.name), '#60a5fa')}
                ${renderMaterialPill(items.purple?.icon, cost.purple, getLocalizedItemName(items.purple?.name), '#c084fc')}
                ${renderMaterialPill(items.gold?.icon, cost.gold, getLocalizedItemName(items.gold?.name), '#f59e0b')}
                ${cost.mora > 0 ? renderMaterialPill('UI_ItemIcon_202', formatMora(cost.mora), t('roadmap.farming.mora'), '#fbbf24') : ''}
            </div>
        </div>
    `;
}

/**
 * Rendu compact et calibré (hauteur uniforme) de la slide recommandation d'artéfacts
 * pendant la période du bonus Carnage Chtonien (+1 artéfact / 120 résines).
 */
function renderDashboardStygianSlide(topDomain, cycles, currentLang, isFallback = false, targetUid = null) {
    const splitIconHtml = renderDomainSplitIcon(topDomain.set1?.icon, topDomain.set2?.icon, topDomain.set1?.name, topDomain.set2?.name, 30);

    const domainHeaderHtml = `
        <div style="display:flex; align-items:center; gap:12px; min-width:0; margin-bottom:4px;">
            <div style="display:inline-flex; align-items:center; gap:3px; border-radius:6px; flex-shrink:0;">
                ${splitIconHtml || `<img src="/assets/endgame/disturbance_outbreak.png" style="width:30px; height:30px; object-fit:contain;" alt="">`}
            </div>
            <div style="display:flex; flex-direction:column; gap:2px; min-width:0;">
                <span style="font-size:14px; font-weight:normal; color:var(--text-always-white); line-height:1.2; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                    ${topDomain.domainName}
                </span>
                <span style="font-size:11px; color:var(--text-grey); line-height:1.2; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                    ${t('home.stygianOnslaught')}
                </span>
            </div>
        </div>
    `;

    // Récupérer les bénéficiaires uniques parmi les deux sets
    const beneficiaries = [];
    const seen = new Set();
    [...(topDomain.set1?.chars || []), ...(topDomain.set2?.chars || [])].forEach(c => {
        const id = c.perso?.id || c.perso?.nom;
        if (id && !seen.has(id)) {
            seen.add(id);
            beneficiaries.push(c);
        }
    });

    const bothSetsUseful = topDomain.bothSetsUseful;

    return `
        ${domainHeaderHtml}
        <div onclick="openRoadmapFromHome('${targetUid || ''}')" style="background:rgba(139, 45, 139, 0.4); border-radius:8px; padding:8px 10px; display:flex; flex-direction:column; gap:8px; min-height:124px; box-sizing:border-box; justify-content:space-between; cursor:pointer;" title="${t('home.openRoadmap')}">
            <!-- Rangée 1 : En-tête Carnage + Badges + Bonus temps -->
            <div style="display:flex; align-items:center; gap:10px; min-width:0;">
                <img src="/assets/endgame/disturbance_outbreak.png" alt="Carnage Chtonien" style="width:38px; height:38px; object-fit:contain; flex-shrink:0; background:var(--shadow-subtle); border-radius:6px; padding:3px; box-sizing:border-box;">
                <div style="min-width:0; display:flex; flex-direction:column; gap:2px;">
                    <div style="display:flex; align-items:center; gap:6px; min-width:0; flex-wrap:wrap;">
                        <span style="font-size:13px; font-weight:normal; color:var(--text-primary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                            ${currentLang === 'en' ? 'Recommended Domain' : 'Donjon d\'artéfacts conseillé'}
                        </span>
                        ${bothSetsUseful ? `
                            <span style="font-size:9px; background:rgba(34, 197, 94, 0.18); color:#4ade80; padding:1px 5px; border-radius:4px; font-weight:normal; white-space:nowrap;">
                                ${currentLang === 'en' ? 'Dual Value' : 'Double rentabilité'}
                            </span>
                        ` : ''}
                    </div>
                    <div style="font-size:11px; color:var(--text-grey); display:flex; align-items:center; gap:5px; margin-top:1px;">
                        <span style="color:var(--text-grey); font-weight:normal;">
                            ${t('home.remainingTime', cycles.stygian.bonusDaysLeft, cycles.stygian.bonusHoursLeft)}
                        </span>
                        <span>•</span>
                        <span style="color:var(--text-grey);">
                            ${t('home.stygianBonusDesc')}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Rangée 2 : Personnages bénéficiaires (ou indication dernier donjon si aucun) -->
            <div style="display:flex; align-items:center; gap:6px; min-height:24px; overflow-x:auto; scrollbar-width:none;">
                ${beneficiaries.length > 0 ? `
                    <span style="font-size:11px; color:var(--text-grey); flex-shrink:0;">
                        ${currentLang === 'en' ? 'For :' : 'Pour :'}
                    </span>
                    ${beneficiaries.map(c => `
                        <div style="display:inline-flex; align-items:center; gap:4px; background:var(--shadow-subtle); padding:2px 6px; border-radius:5px; font-size:11px; white-space:nowrap; flex-shrink:0;" title="${c.perso?.nom || ''} (${c.label || ''})">
                            ${c.perso?.image ? `<img src="${c.perso.image}" alt="" style="width:14px; height:14px; border-radius:50%; object-fit:cover; flex-shrink:0;">` : ''}
                            <span style="color:var(--text-primary); font-size:11px;">${c.perso?.nom || ''}</span>
                        </div>
                    `).join('')}
                ` : `
                    <div style="display:inline-flex; align-items:center; gap:6px; font-size:11px; color:var(--text-grey);">
                        <span>${currentLang === 'en' ? 'Latest artifact domain available' : 'Tout dernier donjon disponible'}</span>
                    </div>
                `}
            </div>

            <!-- Rangée 3 : Les deux sets d'artéfacts du donjon -->
            <div style="display:flex; align-items:center; gap:6px; min-height:24px; overflow-x:auto; scrollbar-width:none;">
                ${topDomain.set1?.name ? `
                    <div style="display:inline-flex; align-items:center; gap:5px; background:var(--shadow-subtle); padding:2px 8px; border-radius:5px; font-size:11px; white-space:nowrap; flex-shrink:0;" title="${topDomain.set1.name}">
                        ${topDomain.set1.icon ? `<img src="${topDomain.set1.icon}" alt="" style="width:16px; height:16px; object-fit:contain; flex-shrink:0;">` : ''}
                        <span style="color:var(--text-primary); font-size:11px;">${topDomain.set1.name}</span>
                    </div>
                ` : ''}
                ${topDomain.set2?.name ? `
                    <div style="display:inline-flex; align-items:center; gap:5px; background:var(--shadow-subtle); padding:2px 8px; border-radius:5px; font-size:11px; white-space:nowrap; flex-shrink:0;" title="${topDomain.set2.name}">
                        ${topDomain.set2.icon ? `<img src="${topDomain.set2.icon}" alt="" style="width:16px; height:16px; object-fit:contain; flex-shrink:0;">` : ''}
                        <span style="color:var(--text-primary); font-size:11px;">${topDomain.set2.name}</span>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

/**
 * Construit les diapositives du carrousel de farming pour le jour actif.
 * Format compact et calibré à hauteur stable dédié au tableau de bord.
 */
function buildDailyFarmingSlides(characters = [], activeServer = 'EU', focusCharNom = null, cycles = null, targetUid = null) {
    const currentLang = (LANG === 'en') ? 'en' : 'fr';
    const resolvedFocus = focusCharNom || (typeof localStorage !== 'undefined' ? localStorage.getItem('guoba_roadmap_focus_char') : null);
    const resolvedCycles = cycles || getEndgameCyclesInfo(activeServer);

    // On passe null comme filtre de focus à getWeeklyFarmingSchedule afin de récupérer TOUS les besoins du jour,
    // puis on priorise le personnage focus en tête des diapositives.
    const schedule = getWeeklyFarmingSchedule(characters, null, 'all', activeServer);
    const dayIdx = schedule.todayIndex;
    const dayData = schedule.scheduleByDay[dayIdx] || schedule.scheduleByDay[1];

    const slides = [];

    // 0. Carte spéciale Recommandation Artéfacts (Carnage Chtonien : +1 artéfact / 120 résines)
    // Insérée en Slide #1 pendant les 10 jours du bonus actif
    if (resolvedCycles?.stygian?.isBonusActive) {
        let topDomain = null;
        let isFallback = false;

        // Évaluation via le Planificateur de Domaines si des personnages sont disponibles
        if (characters && characters.length > 0) {
            const domainRankings = calculateDomainRankings(characters, resolvedFocus, 'priorities');
            if (domainRankings && domainRankings.length > 0) {
                topDomain = domainRankings[0];
            }
        }

        // Si aucun besoin spécifique ou vitrine vide, fallback sur le tout dernier donjon sorti
        if (!topDomain && ARTIFACT_DOMAINS && ARTIFACT_DOMAINS.length > 0) {
            isFallback = true;
            const lastDom = ARTIFACT_DOMAINS[ARTIFACT_DOMAINS.length - 1];
            const set1Key = lastDom.sets[0];
            const set2Key = lastDom.sets[1];
            topDomain = {
                domain: lastDom,
                domainName: lastDom.name[currentLang] || lastDom.name['fr'] || lastDom.name['en'] || lastDom.id,
                regionName: lastDom.region[currentLang] || lastDom.region['fr'] || lastDom.region['en'] || '',
                set1: { key: set1Key, name: getLocalizedSetName(set1Key, characters), icon: getSetIcon(set1Key, characters), chars: [] },
                set2: { key: set2Key, name: getLocalizedSetName(set2Key, characters), icon: getSetIcon(set2Key, characters), chars: [] },
                bothSetsUseful: false,
                efficiencyKey: 'veryHigh'
            };
        }

        if (topDomain) {
            slides.push({
                type: 'stygian-artifact',
                html: renderDashboardStygianSlide(topDomain, resolvedCycles, currentLang, isFallback, targetUid)
            });
        }
    }

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
                    ${renderDashboardCharacterCard(char)}
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
                    ${renderDashboardWeaponCard(w)}
                `
            });
        });
    }

    // 3. Fallback : si aucun besoin de personnage/arme enregistré pour aujourd'hui,
    // on affiche les donjons ouverts du jour par nation
    const hasCharOrWeaponNeeds = slides.some(s => s.type === 'character' || s.type === 'weapon');
    if (!hasCharOrWeaponNeeds) {
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
                        <div style="background:var(--shadow-subtle); border-radius:8px; padding:10px; display:flex; flex-direction:column; justify-content:center; gap:8px; min-height:124px; box-sizing:border-box;">
                            <div style="display:flex; align-items:center; justify-content:space-between; gap:10px;">
                                <span style="font-size:13px; color:var(--text-primary);">${isTalent ? t('roadmap.farming.catTalents') : t('roadmap.farming.catWeapons')}</span>
                                <span style="font-size:11px; color:var(--text-grey);">${regName}</span>
                            </div>
                            <span style="font-size:11px; color:var(--text-muted);">
                                ${dayIdx === 0 ? (t('roadmap.farming.freeDaySubtitle') || 'Tous les donjons sont ouverts') : domName}
                            </span>
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

    // Résolution du profil mis en vedette (uniquement si un compte Discord est lié ou si un favori a été défini)
    const featuredProfile = (linkedUid && profiles.find(p => String(p.uid) === String(linkedUid)))
        || (favoriteUid && profiles.find(p => String(p.uid) === String(favoriteUid)))
        || null;

    // Profil actif pour les données contextuelles des widgets (Endgame, farming)
    const activeProfile = featuredProfile || profiles[0] || null;

    const focusCharNom = data.focusCharNom || (typeof localStorage !== 'undefined' ? localStorage.getItem('guoba_roadmap_focus_char') : null);
    const slides = buildDailyFarmingSlides(characters, activeServer, focusCharNom, cycles, activeProfile?.uid);

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

    const isAbyssEndingSoon = (cycles.abyss?.daysLeft ?? 99) < 3;
    const isTheaterEndingSoon = (cycles.theater?.daysLeft ?? 99) < 3;

    function renderRemainingTimeBadge(daysLeft, hoursLeft, isEndingSoon) {
        if (isEndingSoon) {
            return `
                <span style="font-size:11px; color:#fbbf24; display:inline-flex; align-items:center; gap:4px;">
                    <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    ${t('home.remainingTime', daysLeft, hoursLeft)}
                </span>
            `;
        }
        return `
            <span style="font-size:11px; color:var(--text-muted); display:inline-flex; align-items:center; gap:4px;">
                ${t('home.remainingTime', daysLeft, hoursLeft)}
            </span>
        `;
    }

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
                    ${renderRemainingTimeBadge(cycles.abyss.daysLeft, cycles.abyss.hoursLeft, isAbyssEndingSoon)}
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
                        ${renderRemainingTimeBadge(cycles.theater.daysLeft, cycles.theater.hoursLeft, isTheaterEndingSoon)}
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
                    <div class="dash-slides-container" style="min-height:166px;">
                        ${slidesHtml}
                    </div>

                    <!-- CONTRÔLES DU CARROUSEL : POINTS PROGRESSIFS CLIQUABLES -->
                    ${slides.length > 1 ? `
                        <div style="display:flex; justify-content:center; align-items:center;">
                            <div class="dash-dots">
                                ${slides.map((_, i) => `
                                    <div class="dash-dot ${i === 0 ? 'active' : ''}" data-dot-index="${i}" onclick="goToFarmingSlide(${i})" title="${i + 1} / ${slides.length}">
                                        <div class="dash-dot-fill"></div>
                                    </div>
                                `).join('')}
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
 * Initialise les comportements interactifs du Dashboard (Carrousel automatique avec remplissage progressif).
 */
export function initHomeDashboardInteractions() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.dash-farming-slide');
    const dots = document.querySelectorAll('.dash-dot');

    function showSlide(index) {
        if (!slides || slides.length <= 1) return;
        currentSlide = (index + slides.length) % slides.length;

        slides.forEach((s, i) => {
            s.style.display = (i === currentSlide) ? 'flex' : 'none';
        });

        dots.forEach((d, i) => {
            const fill = d.querySelector('.dash-dot-fill');
            if (i === currentSlide) {
                d.classList.add('active');
                if (fill) {
                    fill.style.animation = 'none';
                    void fill.offsetWidth; // Forcer le reflow pour redémarrer l'animation
                    fill.style.animation = '';
                }
            } else {
                d.classList.remove('active');
                if (fill) {
                    fill.style.animation = 'none';
                }
            }
        });
    }

    if (slides.length > 1) {
        dots.forEach((d, i) => {
            const fill = d.querySelector('.dash-dot-fill');
            if (fill) {
                fill.addEventListener('animationend', (e) => {
                    if (e.animationName === 'dashDotProgress' && i === currentSlide) {
                        showSlide(currentSlide + 1);
                    }
                });
            }
        });

        // Démarre la première slide et son animation de progression
        showSlide(0);
    }

    window.goToFarmingSlide = function (idx) {
        showSlide(idx);
    };

    window.nextFarmingSlide = function () {
        showSlide(currentSlide + 1);
    };

    window.prevFarmingSlide = function () {
        showSlide(currentSlide - 1);
    };

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

