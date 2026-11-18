import { t } from '../../scripts/i18n.js';
import ELEMENT_COLORS from '../../data/element_colors.json';

export function renderRankingsSummary(characters, focusCharNom = null) {
    if (!characters || characters.length === 0) return '';

    const charsWithIndex = characters.map((c, originalIndex) => ({ c, originalIndex }));

    const sortedChars = charsWithIndex.filter(({ c }) => {
        const lbId = c.activeBuild ? (c.activeBuild.leaderboard_id || c.activeBuild.key) : null;
        if (!lbId) return false;

        // Ensure character has artifacts to be ranked (matching updateLeaderboardRank logic)
        const isComplete = c.weapon && c.artefacts && c.artefacts.length >= 5;
        return isComplete;
    });

    if (sortedChars.length === 0) return '';

    // If window.userLeaderboardRanks is available, we sort by top percentage.
    let hasRanks = typeof window !== 'undefined' && window.userLeaderboardRanks && Object.keys(window.userLeaderboardRanks).length > 0;

    if (hasRanks) {
        sortedChars.sort((a, b) => {
            const lbIdA = a.c.activeBuild ? (a.c.activeBuild.leaderboard_id || a.c.activeBuild.key) : null;
            const lbIdB = b.c.activeBuild ? (b.c.activeBuild.leaderboard_id || b.c.activeBuild.key) : null;
            const rankA = window.userLeaderboardRanks[lbIdA];
            const rankB = window.userLeaderboardRanks[lbIdB];

            const pctA = (rankA && rankA.rank > 0 && rankA.total > 0) ? (rankA.rank / rankA.total) : 999;
            const pctB = (rankB && rankB.rank > 0 && rankB.total > 0) ? (rankB.rank / rankB.total) : 999;

            return pctA - pctB;
        });
    }

    if (focusCharNom) {
        sortedChars.sort((a, b) => {
            const isFocusA = a.c.nom === focusCharNom ? 1 : 0;
            const isFocusB = b.c.nom === focusCharNom ? 1 : 0;
            return isFocusB - isFocusA;
        });
    }

    const formatNumber = (num) => {
        if (!num) return '0';
        if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
        return num.toString();
    };

    const cardsHtml = sortedChars.map(({ c, originalIndex }) => {
        const lbId = c.activeBuild ? (c.activeBuild.leaderboard_id || c.activeBuild.key) : null;
        const rankData = hasRanks ? window.userLeaderboardRanks[lbId] : null;

        let rankHtml = '';
        if (rankData && rankData.rank > 0 && rankData.total > 0) {
            const displayPct = (typeof window !== 'undefined' && window.formatTopPercentage)
                ? window.formatTopPercentage(rankData.rank, rankData.total)
                : Math.max(1, Math.round((rankData.rank / rankData.total) * 100));
            const totalStr = formatNumber(rankData.total);
            const rankStr = formatNumber(rankData.rank);

            rankHtml = `
                <div style="display:flex; flex-direction:column; align-items:center; margin-top:8px;">
                    <span style="font-size:14px; color:var(--text-always-white);">Top ${displayPct}%</span>
                    <span style="font-size:11px; color:var(--text-grey);">${rankStr} / ${totalStr}</span>
                </div>
            `;
        } else {
            rankHtml = `
                <div style="display:flex; flex-direction:column; align-items:center; margin-top:8px; opacity:0.5;">
                    <span style="font-size:14px; color:var(--text-always-white);">...</span>
                    <span style="font-size:11px; color:var(--text-grey);">...</span>
                </div>
            `;
        }

        const LANG = (typeof localStorage !== 'undefined' ? localStorage.getItem('guoba_lang') : 'fr') || 'fr';
        const buildName = c.activeBuild?.name?.[LANG]
            || c.activeBuild?.name?.['fr']
            || c.activeBuild?.name?.['en']
            || (typeof c.activeBuild?.name === 'string' ? c.activeBuild.name : null)
            || '';

        const scoreColor = c.evaluation?.grade?.color || '#eab308';
        const scoreTxt = c.evaluation?.score ? `${c.evaluation.score} (${c.evaluation.grade?.letter || '?'})` : '?';
        const erTxt = c.activeBuild?.er_req ? `${c.activeBuild.er_req}% ER` : '';
        const faceImage = c.image ? c.image.replace('_Side', '') : '';
        const splashArt = c.splashArt || (c.image ? c.image.replace('_Side', '').replace('/UI_AvatarIcon_', '/UI_Gacha_AvatarImg_') : '');

        const elementKey = (c.charConfig?.element || c.element || '').toLowerCase();
        const charColor = c.charConfig?.color || ELEMENT_COLORS[elementKey] || '#3c5ccd';

        const isFocus = focusCharNom && c.nom === focusCharNom;
        const modernBorderColor = `oklch(from ${charColor} 0.78 calc(c * 1.2) h / 0.4)`;
        const cardBorder = isFocus ? 'border: 1px solid #60a5fa;' : `border: 1px solid var(--char-card-border, ${modernBorderColor});`;
        const cardShadow = isFocus ? 'box-shadow: 0 0 10px rgba(96, 165, 250, 0.5);' : '';
        const imgBorder = isFocus ? '1px solid #60a5fa' : 'none';
        const nameColor = isFocus ? '#60a5fa' : 'var(--text-primary)';
        const cardTitle = t('roadmap.rankings.cardTooltip', c.nom);

        return `
            <div class="roadmap-ranking-card"
                 data-action="open-character-showcase"
                 data-char-index="${originalIndex}"
                 data-char-nom="${c.nom.replace(/"/g, '&quot;')}"
                 role="button"
                 tabindex="0"
                 title="${cardTitle.replace(/"/g, '&quot;')}"
                 aria-label="${cardTitle.replace(/"/g, '&quot;')}"
                 style="--char-hex: ${charColor}; --char-card-border: ${modernBorderColor}; position:relative; overflow:hidden; border-radius:8px; padding:6px; ${cardBorder} ${cardShadow} display:flex; flex-direction:column; box-sizing:border-box; min-width:0; cursor:pointer;">
                ${splashArt ? `
                    <img src="${splashArt}" alt="" loading="lazy" decoding="async" crossorigin="anonymous" class="background-splash-art" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center center; z-index: 0; filter: blur(10px) brightness(0.7) saturate(0.8); pointer-events: none;" onerror="this.style.display='none'" />
                ` : ''}
                <div class="row-overlay" style="position: absolute; inset: 0; background-color: var(--char-bg-alpha, rgb(from ${charColor} calc(r / 3.5) calc(g / 3.5) calc(b / 3.5) / 0.765)); transition: background-color 0.35s; z-index: 1; pointer-events: none;"></div>

                <div style="position:relative; z-index:2; display:flex; flex-direction:column; width:100%; height:100%;">
                    <div style="display:flex; align-items:center; gap:10px; min-width:0; pointer-events:none;">
                        <img src="${faceImage}" alt="${c.nom}" style="width:44px; height:44px; border-radius:8px; object-fit:cover; background: rgba(0, 0, 0, 0.4); flex-shrink:0; border:${imgBorder}; box-sizing:border-box;" onerror="this.src='/assets/simulator/icons/icon_unknown.webp'">
                        <div style="display:flex; flex-direction:column; overflow:hidden; min-width:0;">
                            <span style="font-size:14px; color:${nameColor}; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${c.nom}</span>
                            <span style="font-size:11px; color:var(--text-grey); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${buildName}">${buildName}</span>
                        </div>
                    </div>
                    
                    <div style="margin: 10px 0; border-top: 1px solid rgba(255, 255, 255, 0.12); width: 100%;"></div>

                    <div style="display:flex; justify-content:center; align-items:center; gap:8px; pointer-events:none;">
                        <span style="font-size:12px; color:${scoreColor};">${scoreTxt}</span>
                        ${erTxt ? `<span style="color:var(--text-grey); font-size:12px;">-</span>
                        <span style="font-size:12px; color:#60A5FA;">${erTxt}</span>` : ''}
                    </div>
                    
                    <div style="pointer-events:none;">
                        ${rankHtml}
                    </div>
                </div>
            </div>
        `;
    }).join('');

    const isExpanded = typeof window !== 'undefined' ? !!window.roadmapRankingsExpanded : false;
    const shouldShowToggle = sortedChars.length > 8;

    return `
        <div id="roadmap-rankings-summary" style="display:flex; flex-direction:column; gap:16px; padding: 40px 0;">
            <div style="display:flex; flex-direction:column;">
                <h3 style="font-size: 24px; font-weight: normal; color: var(--text-primary); margin: 0;">${t('roadmap.rankings.title')}</h3>
                <p style="font-size: 12px; color: var(--text-grey); margin: 4px 0 0 0;">${t('roadmap.rankings.subtitle')}</p>
            </div>
            
            <div style="position:relative; width:100%;">
                <div id="roadmap-rankings-grid-container" style="max-height: ${(!isExpanded && shouldShowToggle) ? '310px' : 'none'}; overflow: hidden; transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1); width:100%;">
                    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(200px, 1fr)); gap:12px; width:100%;">
                        ${cardsHtml}
                    </div>
                </div>
                ${(!isExpanded && shouldShowToggle) ? `
                    <div style="position:absolute; bottom:0; left:0; right:0; height:80px; background:linear-gradient(to bottom, rgba(0,0,0,0), var(--bg-body, #121318)); pointer-events:none; border-radius: 8px 8px 0 0;"></div>
                ` : ''}
            </div>

            ${shouldShowToggle ? `
                <div style="display:flex; justify-content:center; margin-top:4px;">
                    <button data-action="toggle-rankings-summary-expand"
                            type="button"
                            class="button-unlink hover-bg-hover"
                            style="display:inline-flex; align-items:center; gap:8px; padding:8px 18px; border-radius:8px; font-size:12px; font-weight:normal; cursor:pointer; background:var(--bg-panel); color:var(--text-primary); transition:all 0.2s ease;">
                        <span>${isExpanded ? t('roadmap.rankings.showLess') : t('roadmap.rankings.showAll', sortedChars.length)}</span>
                        <svg style="width:14px; height:14px; transition:transform 0.25s ease; transform:${isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'};" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                </div>
            ` : ''}
        </div>
    `;
}
