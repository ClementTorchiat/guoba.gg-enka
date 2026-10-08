import { t } from '../../scripts/i18n.js';

export function renderRankingsSummary(characters) {
    if (!characters || characters.length === 0) return '';

    const sortedChars = [...characters].filter(c => {
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
            const lbIdA = a.activeBuild ? (a.activeBuild.leaderboard_id || a.activeBuild.key) : null;
            const lbIdB = b.activeBuild ? (b.activeBuild.leaderboard_id || b.activeBuild.key) : null;
            const rankA = window.userLeaderboardRanks[lbIdA];
            const rankB = window.userLeaderboardRanks[lbIdB];

            const pctA = (rankA && rankA.rank > 0 && rankA.total > 0) ? (rankA.rank / rankA.total) : 999;
            const pctB = (rankB && rankB.rank > 0 && rankB.total > 0) ? (rankB.rank / rankB.total) : 999;

            return pctA - pctB;
        });
    }

    const formatNumber = (num) => {
        if (!num) return '0';
        if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
        return num.toString();
    };

    const cardsHtml = sortedChars.map(c => {
        const lbId = c.activeBuild ? (c.activeBuild.leaderboard_id || c.activeBuild.key) : null;
        const rankData = hasRanks ? window.userLeaderboardRanks[lbId] : null;

        let rankHtml = '';
        if (rankData && rankData.rank > 0 && rankData.total > 0) {
            const rawPct = (rankData.rank / rankData.total) * 100;
            const displayPct = rawPct < 10 ? Math.max(0.1, rawPct).toFixed(1) : Math.round(rawPct);
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

        return `
            <div style="border-radius:8px; padding:6px; background: var(--bg-panel); border:2px solid ${scoreColor}; display:flex; flex-direction:column; box-sizing:border-box; min-width:0;">
                <div style="display:flex; align-items:center; gap:10px; min-width:0;">
                    <img src="${faceImage}" alt="${c.nom}" style="width:44px; height:44px; border-radius:8px; object-fit:cover; background: rgb(0,0,0,0.2); flex-shrink:0;" onerror="this.src='/assets/simulator/icons/icon_unknown.webp'">
                    <div style="display:flex; flex-direction:column; overflow:hidden; min-width:0;">
                        <span style="font-size:14px; color:var(--text-primary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${c.nom}</span>
                        <span style="font-size:11px; color:var(--text-grey); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${buildName}">${buildName}</span>
                    </div>
                </div>
                
                <div style="display:flex; justify-content:center; align-items:center; gap:8px; margin-top:16px;">
                    <span style="font-size:12px; color:${scoreColor};">${scoreTxt}</span>
                    ${erTxt ? `<span style="color:var(--text-grey); font-size:12px;">-</span>
                    <span style="font-size:12px; color:#60A5FA;">${erTxt}</span>` : ''}
                </div>
                
                ${rankHtml}
            </div>
        `;
    }).join('');

    return `
        <div id="roadmap-rankings-summary" style="display:flex; flex-direction:column; gap:16px; padding: 40px 0;">
            <div style="display:flex; flex-direction:column;">
                <h3 style="font-size: 24px; font-weight: normal; color: var(--text-primary); margin: 0;">${t('roadmap.rankings.title')}</h3>
                <p style="font-size: 12px; color: var(--text-grey); margin: 4px 0 0 0;">${t('roadmap.rankings.subtitle')}</p>
            </div>
            
            <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(200px, 1fr)); gap:12px; width:100%;">
                ${cardsHtml}
            </div>
        </div>
    `;
}
