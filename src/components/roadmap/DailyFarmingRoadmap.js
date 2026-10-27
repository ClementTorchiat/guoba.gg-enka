// src/components/roadmap/DailyFarmingRoadmap.js
import { t, LANG } from '../../scripts/i18n.js';
import { getWeeklyFarmingSchedule } from './farmingEngine.js';

const ENKA_CDN = 'https://enka.network/ui/';
const YATTA_CDN = 'https://gi.yatta.moe/assets/UI/';

function formatMora(num) {
    if (!num) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return Math.round(num / 1000) + 'k';
    return num.toLocaleString();
}

/**
 * Génère le tag HTML pour une icône de matériau avec fallback automatique vers yatta.moe si Enka renvoie 404.
 */
function getItemIconHtml(iconName, label = '', style = 'width:20px; height:20px; object-fit:contain; flex-shrink:0;') {
    if (!iconName) return '';
    const clean = iconName.replace('.png', '');
    const isFullUrl = clean.startsWith('http');
    const primaryUrl = isFullUrl ? clean : `${ENKA_CDN}${clean}.png`;
    const fallbackUrl = isFullUrl ? '' : `${YATTA_CDN}${clean}.png`;

    return `<img src="${primaryUrl}" alt="${label}" title="${label}" style="${style}" onerror="${fallbackUrl ? `if(!this.dataset.fb){this.dataset.fb='1'; this.src='${fallbackUrl}';}else{this.style.display='none';}` : `this.style.display='none';`}">`;
}

/**
 * Rendu d'une pilule de matériau avec son icône officielle et son compte requis.
 */
function renderMaterialPill(iconName, count, label = '', rarityColor = 'var(--text-primary)') {
    if (!count || count <= 0) return '';
    const imgHtml = getItemIconHtml(iconName, label, 'width:20px; height:20px; object-fit:contain; flex-shrink:0;');

    return `
        <div style="display:inline-flex; align-items:center; gap:5px; background:var(--shadow-subtle); border:none; padding:3px 7px 3px 5px; border-radius:6px;" title="${label}">
            ${imgHtml}
            <span style="font-size:11px; font-weight:normal; color:${rarityColor}; line-height:1;">${count}</span>
        </div>
    `;
}

/**
 * Rendu d'une carte de personnage avec l'ensemble de ses besoins d'aptitudes pour le jour sélectionné.
 */
function renderCharacterFarmingCard(charData) {
    const rot = charData.bookRotation;
    const items = rot?.items || {};
    const cost = charData.totalCost;

    return `
        <div style="background:var(--shadow-subtle); border:none; border-radius:8px; padding:12px 14px; display:flex; flex-direction:column; gap:10px; transition:all 0.2s ease;">
            <!-- Header Personnage -->
            <div style="display:flex; justify-content:space-between; align-items:center; gap:10px;">
                <div style="display:flex; align-items:center; gap:10px; min-width:0;">
                    <img src="${charData.charAvatar}" alt="${charData.charNom}" style="width:40px; height:40px; border-radius:8px; background:var(--shadow-subtle); object-fit:cover; flex-shrink:0; border:none;">
                    <div style="min-width:0;">
                        <div style="display:flex; align-items:center; gap:6px;">
                            <span style="font-size:13px; font-weight:normal; color:var(--text-primary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${charData.charNom}</span>
                            ${charData.isFocus ? `<span style="font-size:9px; background:var(--accent-blue); color:#fff; padding:1px 5px; border-radius:4px; font-weight:normal; text-transform:uppercase;">Focus</span>` : ''}
                        </div>
                        <div style="font-size:11px; color:var(--text-grey); display:flex; align-items:center; gap:4px; margin-top:2px;">
                            <span>${rot?.name?.[LANG] || rot?.name?.fr || ''}</span>
                            <span>•</span>
                            <span style="color:var(--accent-green); font-weight:normal;">~${cost.estimatedResin} résines</span>
                        </div>
                    </div>
                </div>

                <!-- Badge livre représentatif (Philosophie 4★) -->
                ${items.philosophy?.icon ? `
                    <div style="display:flex; align-items:center; gap:6px; background:var(--shadow-subtle); padding:4px 8px; border-radius:6px; border:none; flex-shrink:0;" title="${items.philosophy.name?.[LANG] || items.philosophy.name?.fr || ''}">
                        ${getItemIconHtml(items.philosophy.icon, items.philosophy.name?.[LANG] || items.philosophy.name?.fr || '', 'width:24px; height:24px; object-fit:contain;')}
                        <span style="font-size:11px; font-weight:normal; color:#eab308;">${cost.philosophies + Math.floor(cost.guides / 3)} eq.</span>
                    </div>
                ` : ''}
            </div>

            <!-- Liste des aptitudes en retard -->
            <div style="display:flex; flex-direction:column; gap:6px; background:var(--shadow-subtle); padding:8px 10px; border-radius:6px; border:none;">
                ${charData.talentGaps.map(gap => `
                    <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; font-size:11px;">
                        <div style="display:flex; align-items:center; gap:6px; min-width:0;">
                            ${gap.talentIcon ? `<img src="${gap.talentIcon}" alt="" style="width:16px; height:16px; object-fit:contain; flex-shrink:0; border-radius:3px; background:var(--shadow-subtle);">` : ''}
                            <span style="color:var(--text-primary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${gap.talentLabel}</span>
                        </div>
                        <div style="display:flex; align-items:center; gap:4px; flex-shrink:0; font-family:monospace;">
                            <span style="color:var(--text-grey);">Niv. ${gap.currentLvl}</span>
                            <span style="color:var(--text-grey);">➔</span>
                            <span style="color:var(--accent-green); font-weight:normal;">Niv. ${gap.targetLvl}</span>
                        </div>
                    </div>
                `).join('')}
            </div>

            <!-- Matériaux réels requis avec icônes officielles -->
            <div style="display:flex; flex-wrap:wrap; align-items:center; gap:6px; padding-top:2px;">
                ${renderMaterialPill(items.teachings?.icon, cost.teachings, items.teachings?.name?.[LANG] || items.teachings?.name?.fr, '#4ade80')}
                ${renderMaterialPill(items.guide?.icon, cost.guides, items.guide?.name?.[LANG] || items.guide?.name?.fr, '#60a5fa')}
                ${renderMaterialPill(items.philosophy?.icon, cost.philosophies, items.philosophy?.name?.[LANG] || items.philosophy?.name?.fr, '#c084fc')}
                ${renderMaterialPill(charData.weeklyBoss?.icon, cost.weeklyBoss, charData.weeklyBoss?.name?.[LANG] || charData.weeklyBoss?.name?.fr, '#f59e0b')}
                ${cost.crown > 0 ? renderMaterialPill('UI_ItemIcon_104319', cost.crown, 'Couronne de la sagesse', '#f59e0b') : ''}
                ${cost.mora > 0 ? renderMaterialPill('UI_ItemIcon_202', formatMora(cost.mora), 'Moras', '#fbbf24') : ''}
            </div>
        </div>
    `;
}

/**
 * Rendu d'une journée spécifique (par exemple Lundi, Mardi, ou Dimanche).
 */
function renderSingleDaySchedule(daySchedule, allCharactersWithNeeds = []) {
    const domains = daySchedule.domains || [];
    const isSunday = daySchedule.isSunday;

    if (domains.length === 0) {
        const charactersNeedingAscension = allCharactersWithNeeds.filter(p => p.needsAscension);
        const hasMats = charactersNeedingAscension.length > 0;

        return `
            <div style="background:var(--bg-panel); border:none; border-radius:8px; padding:16px; display:flex; flex-direction:column; gap:14px;">
                <!-- En-tête Journée Libre (style unifié aux cartes de donjon) -->
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                    <div style="display:flex; align-items:center; gap:8px;">
                        <span style="font-size:10px; text-transform:uppercase; letter-spacing:0.8px; font-weight:normal; background:rgba(34,197,94,0.12); color:#4ade80; padding:3px 8px; border-radius:4px; border:none;">Journée libre</span>
                        <span style="font-size:13px; font-weight:normal; color:var(--text-primary);">${t('roadmap.farming.freeDayTitle')}</span>
                    </div>
                    <div style="font-size:11px; color:var(--text-grey);">
                        0 résine requise en donjon
                    </div>
                </div>

                <!-- Conseil & Description -->
                <div style="background:var(--shadow-subtle); border:none; border-radius:8px; padding:12px 14px; font-size:12px; color:var(--text-grey); line-height:1.5;">
                    ${hasMats ? t('roadmap.farming.freeDayDesc') : t('roadmap.farming.freeDayDescNoMats')}
                </div>

                <!-- Grille des Ressources de Monde (alignée sur la grille des donjons) -->
                ${hasMats ? `
                    <div style="display:flex; flex-direction:column; gap:10px; margin-top:2px;">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <span style="font-size:12px; font-weight:normal; color:var(--text-primary);">${t('roadmap.farming.worldMatsTitle')}</span>
                            <span style="font-size:11px; color:var(--text-grey);">Disponibles sans restriction</span>
                        </div>
                        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:12px;">
                            ${charactersNeedingAscension.map(c => `
                                <div style="background:var(--shadow-subtle); border:none; border-radius:8px; padding:12px 14px; display:flex; justify-content:space-between; align-items:center; gap:12px;">
                                    <div style="display:flex; align-items:center; gap:10px; min-width:0;">
                                        <img src="${c.charAvatar}" alt="" style="width:36px; height:36px; border-radius:8px; background:var(--shadow-subtle); object-fit:cover; border:none; flex-shrink:0;">
                                        <div style="min-width:0;">
                                            <div style="font-size:13px; font-weight:normal; color:var(--text-primary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${c.charNom}</div>
                                            <div style="font-size:11px; color:var(--text-grey); margin-top:2px;">Matériaux d'élévation</div>
                                        </div>
                                    </div>
                                    <div style="display:flex; align-items:center; gap:6px; flex-shrink:0;">
                                        ${c.worldBoss?.icon ? `
                                            <div style="display:inline-flex; align-items:center; gap:5px; background:var(--shadow-subtle); border:none; padding:4px 8px; border-radius:6px;" title="${c.worldBoss.name?.[LANG] || c.worldBoss.name?.fr || ''}">
                                                ${getItemIconHtml(c.worldBoss.icon, c.worldBoss.name?.[LANG] || c.worldBoss.name?.fr || '', 'width:20px; height:20px; object-fit:contain;')}
                                                <span style="font-size:11px; color:var(--text-primary); font-weight:normal; max-width:90px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${c.worldBoss.name?.[LANG] || c.worldBoss.name?.fr || ''}</span>
                                            </div>
                                        ` : ''}
                                        ${c.specialty?.icon ? `
                                            <div style="display:inline-flex; align-items:center; gap:5px; background:var(--shadow-subtle); border:none; padding:4px 8px; border-radius:6px;" title="${c.specialty.name?.[LANG] || c.specialty.name?.fr || ''}">
                                                ${getItemIconHtml(c.specialty.icon, c.specialty.name?.[LANG] || c.specialty.name?.fr || '', 'width:20px; height:20px; object-fit:contain;')}
                                                <span style="font-size:11px; color:var(--text-primary); font-weight:normal; max-width:90px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${c.specialty.name?.[LANG] || c.specialty.name?.fr || ''}</span>
                                            </div>
                                        ` : ''}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }

    return `
        <div style="display:flex; flex-direction:column; gap:16px;">
            ${isSunday ? `
                <div style="background:linear-gradient(135deg, rgba(234, 179, 8, 0.12) 0%, rgba(245, 158, 11, 0.04) 100%); border:none; border-radius:8px; padding:12px 16px; display:flex; align-items:center; justify-content:space-between; gap:12px;">
                    <div>
                        <div style="font-size:13px; font-weight:normal; color:#fbbf24;">${t('roadmap.farming.sundayJokerTitle')}</div>
                        <div style="font-size:11px; color:var(--text-grey); margin-top:2px;">${t('roadmap.farming.sundayJokerDesc')}</div>
                    </div>
                    <span style="font-size:10px; text-transform:uppercase; letter-spacing:0.8px; font-weight:normal; background:rgba(234, 179, 8, 0.18); color:#fbbf24; padding:3px 8px; border-radius:4px; flex-shrink:0;">Joker</span>
                </div>
            ` : ''}

            <!-- Liste des Domaines (Cartes Région avec --bg-panel et sans border) -->
            <div style="display:flex; flex-direction:column; gap:16px;">
                ${domains.map(dom => `
                    <div style="background:var(--bg-panel); border:none; border-radius:8px; padding:16px; display:flex; flex-direction:column; gap:14px;">
                        <!-- En-tête du Donjon / Région -->
                        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                            <div style="display:flex; align-items:center; gap:8px;">
                                <span style="font-size:10px; text-transform:uppercase; letter-spacing:0.8px; font-weight:normal; background:var(--shadow-subtle); padding:3px 8px; border-radius:4px; color:var(--text-grey); border:none;">${dom.region}</span>
                                <span style="font-size:13px; font-weight:normal; color:var(--text-primary);">${dom.domainName}</span>
                                <span style="color:var(--text-grey);">—</span>
                                <span style="font-size:12px; color:#c084fc; font-weight:normal;">${dom.bookName}</span>
                            </div>

                            <!-- Aperçu des 3 livres -->
                            <div style="display:flex; align-items:center; gap:4px;">
                                ${getItemIconHtml(dom.items.teachings?.icon, dom.items.teachings?.name?.[LANG] || dom.items.teachings?.name?.fr || '', 'width:20px; height:20px; object-fit:contain;')}
                                ${getItemIconHtml(dom.items.guide?.icon, dom.items.guide?.name?.[LANG] || dom.items.guide?.name?.fr || '', 'width:20px; height:20px; object-fit:contain;')}
                                ${getItemIconHtml(dom.items.philosophy?.icon, dom.items.philosophy?.name?.[LANG] || dom.items.philosophy?.name?.fr || '', 'width:20px; height:20px; object-fit:contain;')}
                            </div>
                        </div>

                        <!-- Grille des personnages à farmer dans ce donjon -->
                        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:12px;">
                            ${dom.characters.map(renderCharacterFarmingCard).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

/**
 * Rendu de la vue "Semaine complète" (du Lundi au Dimanche).
 */
function renderFullWeekSchedule(weekSchedule) {
    return `
        <div style="display:flex; flex-direction:column; gap:16px;">
            ${weekSchedule.map(day => `
                <div style="background:var(--bg-panel); border:none; border-radius:8px; padding:14px 16px; display:flex; flex-direction:column; gap:12px;">
                    <!-- Header Jour -->
                    <div style="display:flex; justify-content:space-between; align-items:center; gap:10px;">
                        <div style="display:flex; align-items:center; gap:8px;">
                            <span style="font-size:14px; font-weight:normal; color:var(--text-primary);">${day.dayName}</span>
                            ${day.isToday ? `<span style="font-size:10px; background:var(--accent-green); color:#000; padding:1px 6px; border-radius:4px; font-weight:normal; text-transform:uppercase;">${t('roadmap.farming.today')}</span>` : ''}
                            ${day.isSunday ? `<span style="font-size:10px; background:rgba(234, 179, 8, 0.2); color:#fbbf24; border:none; padding:1px 6px; border-radius:4px; font-weight:normal;">Joker</span>` : ''}
                        </div>

                        <div style="font-size:11px; color:var(--text-grey);">
                            ${day.totalResin > 0 ? `<span style="color:var(--accent-green); font-weight:normal;">~${day.totalResin} résines</span>` : 'Journée libre'}
                        </div>
                    </div>

                    <!-- Contenu du jour -->
                    ${day.domains.length > 0 ? `
                        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:10px;">
                            ${day.domains.map(dom => `
                                <div style="background:var(--shadow-subtle); border:none; border-radius:8px; padding:10px 12px; display:flex; flex-direction:column; gap:8px;">
                                    <div style="display:flex; justify-content:space-between; align-items:center;">
                                        <span style="font-size:12px; font-weight:normal; color:#c084fc;">${dom.bookName}</span>
                                        <span style="font-size:10px; color:var(--text-grey);">${dom.region}</span>
                                    </div>
                                    <div style="display:flex; flex-wrap:wrap; gap:6px;">
                                        ${dom.characters.map(c => `
                                            <div style="display:flex; align-items:center; gap:6px; background:var(--shadow-subtle); padding:3px 7px 3px 4px; border-radius:6px; border:none;" title="${c.charNom} (~${c.totalCost.estimatedResin} résines)">
                                                <img src="${c.charAvatar}" alt="" style="width:20px; height:20px; border-radius:4px; background:var(--shadow-subtle); object-fit:cover; border:none;">
                                                <span style="font-size:11px; color:var(--text-primary);">${c.charNom}</span>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    ` : `
                        <div style="font-size:11px; color:var(--text-grey); padding:6px 0; font-style:italic;">
                            Aucun donjon d'aptitude prioritaire ce jour-là.
                        </div>
                    `}
                </div>
            `).join('')}
        </div>
    `;
}

/**
 * Badge du total compte (résine estimée + moras requis), exporté pour le titre du Plan d'Action.
 */
export function renderFarmingAccountTotalBadge(characters = [], focusCharNom = null) {
    const schedule = getWeeklyFarmingSchedule(characters, focusCharNom);
    return `
        <div style="display:flex; align-items:center; gap:8px; background:var(--bg-panel); border:none; padding:8px 14px; border-radius:8px; font-size:11px; flex-shrink:0;">
            <span style="color:var(--text-grey);">${focusCharNom ? `Total ${focusCharNom}` : 'Total compte'} :</span>
            <span style="color:var(--accent-green); font-weight:normal;">~${schedule.totalAccountResin} résines</span>
            ${schedule.totalAccountMora > 0 ? `
                <span style="color:var(--text-grey);">•</span>
                <div style="display:inline-flex; align-items:center; gap:4px;" title="Moras requis">
                    ${getItemIconHtml('UI_ItemIcon_202', 'Moras', 'width:16px; height:16px; object-fit:contain;')}
                    <span style="color:#fbbf24; font-weight:normal;">${formatMora(schedule.totalAccountMora)}</span>
                </div>
            ` : ''}
        </div>
    `;
}

/**
 * Composant principal rendu dans RoadmapContainer.
 */
export function renderDailyFarmingRoadmap(characters = [], focusCharNom = null, selectedDay = 'today') {
    const schedule = getWeeklyFarmingSchedule(characters, focusCharNom);
    const todayIdx = schedule.todayIndex;

    const DAY_NAMES = {
        fr: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    };
    const currentLang = (LANG === 'en') ? 'en' : 'fr';

    // Résolution du jour actif
    let activeDayIndex = todayIdx;
    let isFullWeekMode = false;

    if (selectedDay === 'all') {
        isFullWeekMode = true;
    } else if (selectedDay === 'today' || selectedDay === undefined || selectedDay === null) {
        activeDayIndex = todayIdx;
    } else {
        const parsed = parseInt(selectedDay, 10);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 6) {
            activeDayIndex = parsed;
        }
    }

    const currentDaySchedule = schedule.scheduleByDay[activeDayIndex];

    // Liste des onglets dans l'ordre Lundi (1) -> Samedi (6) -> Dimanche (0)
    const tabsOrder = [
        { key: 'today', label: `${t('roadmap.farming.today')} (${DAY_NAMES[currentLang][todayIdx]})`, isToday: true },
        { key: '1', label: DAY_NAMES[currentLang][1] },
        { key: '2', label: DAY_NAMES[currentLang][2] },
        { key: '3', label: DAY_NAMES[currentLang][3] },
        { key: '4', label: DAY_NAMES[currentLang][4] },
        { key: '5', label: DAY_NAMES[currentLang][5] },
        { key: '6', label: DAY_NAMES[currentLang][6] },
        { key: '0', label: `${DAY_NAMES[currentLang][0]} (Joker)` },
        { key: 'all', label: t('roadmap.farming.fullWeek') }
    ];

    return `
        <div style="display:flex; flex-direction:column; gap:16px; padding-bottom:40px;">

            <!-- Sélecteur des jours de la semaine (style DomainPlanner) -->
            <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                ${tabsOrder.map(tab => {
                    const isTabActive = (selectedDay === tab.key) || (selectedDay === 'today' && tab.key === 'today');
                    const isTodayBtn = tab.key === 'today' || tab.key === String(todayIdx);

                    return `
                        <button
                            data-action="set-farming-day"
                            data-day="${tab.key}"
                            type="button"
                            class="button-unlink"
                            style="display:inline-flex; align-items:center; gap:6px; padding:5px 11px; border-radius:8px; font-size:11px; font-weight:normal; cursor:pointer; transition:all 0.2s ease; border:${isTabActive ? '1px solid #3b82f6' : 'none'}; background:${isTabActive ? 'rgba(59,130,246,0.18)' : 'var(--shadow-subtle)'}; color:${isTabActive ? '#60a5fa' : 'var(--text-grey)'};"
                        >
                            ${isTodayBtn && tab.key === 'today' ? `<span style="width:6px; height:6px; border-radius:50%; background:#22c55e; display:inline-block;"></span>` : ''}
                            <span>${tab.label}</span>
                        </button>
                    `;
                }).join('')}
            </div>

            <!-- Zone de contenu -->
            ${schedule.allCharactersWithNeeds.length === 0 ? `
                <div style="background:var(--bg-panel); border:none; border-radius:8px; padding:20px; text-align:center;">
                    <div style="font-size:13px; font-weight:normal; color:var(--text-primary);">${t('roadmap.farming.allMaxed')}</div>
                </div>
            ` : (
                isFullWeekMode
                    ? renderFullWeekSchedule(schedule.weekSchedule)
                    : renderSingleDaySchedule(currentDaySchedule, schedule.allCharactersWithNeeds)
            )}
        </div>
    `;
}
