// src/components/advice/PrioritiesAdvice.js
import { t } from '../../scripts/i18n.js';
import ARTIFACT_TYPE_MAPPING from '../../data/artifact_type_mapping.json';
import { ICON_MAP } from '../../scripts/icons.js';
import MAINSTAT_DROP_RATES from '../../data/mainstat_drop_rates.json';
import { getFarmDifficulty } from './MainStatsAdvice.js';

export function getResinCostEstimate(pieceType, mainStatKey, currentScore) {
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

export function getPriorities(persoObj) {
    if (!persoObj.artefacts || persoObj.artefacts.length === 0) return [];

    const activeSets = Object.keys(persoObj.setsCounter || {}).filter(key => persoObj.setsCounter[key] >= 2);
    const sorted = [...persoObj.artefacts].sort((a, b) => (a.score || 0) - (b.score || 0));

    return sorted.slice(0, 3).map(art => {
        const typeName = t('artifact.' + art.type);
        const isOffPiece = !activeSets.includes(art.setKey);

        return {
            piece: typeName,
            score: art.score || 0,
            grade: (art.grade && art.grade.letter) || '?',
            color: (art.grade && art.grade.color) || '#aaa',
            type: art.type,
            mainKey: art.mainStat ? art.mainStat.key : 'unknown',
            setName: art.setName || '',
            mainLabel: art.mainStat ? art.mainStat.label : '',
            isOffPiece: isOffPiece
        };
    });
}

export function renderPrioritiesAdvice(persoObj) {
    if (!persoObj.artefacts || persoObj.artefacts.length === 0) return '';

    const priorities = getPriorities(persoObj);
    const ICON_BASE_PATH = "./assets/simulator/icons/";
    let contentHtml = '';

    if (!priorities || priorities.length === 0) {
        contentHtml = `<p style="color:#22c55e; font-size: 13px;">${t('analysis.s3.noPriority')}</p>`;
    } else {
        const avgScore = persoObj.artefacts.reduce((sum, art) => sum + (art.score || 0), 0) / Math.max(persoObj.artefacts.length, 1);
        const maxScale = Math.max(...persoObj.artefacts.map(a => a.score || 0), 50);

        contentHtml = priorities.map((prio, i) => {
            const difficulty = getFarmDifficulty(prio.type, prio.mainKey);
            const estimate = getResinCostEstimate(prio.type, prio.mainKey, prio.score);

            const rates = MAINSTAT_DROP_RATES[prio.type];
            const dropRate = rates && rates[prio.mainKey] ? rates[prio.mainKey] : null;
            const tooltipDifficulty = dropRate
                ? t('analysis.top3.tooltip.dropRate', dropRate).replace(/'/g, "\\'")
                : t('analysis.top3.tooltip.fixed').replace(/'/g, "\\'");
            const tooltipResin = t('analysis.top3.tooltip.resin').replace(/'/g, "\\'");

            const pct = Math.min(((prio.score || 0) / maxScale) * 100, 100);
            const avgPct = Math.min((avgScore / maxScale) * 100, 100);

            return `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; padding-bottom:14px; border-bottom:1px dashed rgba(255,255,255,0.05); width:100%;">
                    
                    <div style="display:flex; flex-direction:column; flex:1; min-width:0; gap:4px;">
                        
                        <div style="display:flex; align-items:center; gap:8px;">
                            <p style="font-size: 14px; color:var(--text-primary); margin:0;">${i + 1}. ${prio.piece}</p>
                            ${prio.isOffPiece ? `<span style="font-size:9px; color:#22c55e; background:rgba(34, 197, 94, 0.15); border: 1px solid rgba(34, 197, 94, 0.3); padding:2px 5px; border-radius:4px; text-transform:uppercase;">${t('ui.art.offPiece')}</span>` : ''}
                        </div>
                        
                        <div style="display:flex; align-items:center; gap:5px;">
                            <p style="font-size:11px; color:var(--text-grey); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin:0;">${prio.setName} • </p>
                            <img src="${ICON_BASE_PATH}${ICON_MAP[prio.mainKey] || ICON_MAP['unknown']}" style="width:13px; height:13px; flex-shrink:0;" alt="${prio.mainKey}">
                            <p style="font-size:11px; color:var(--text-primary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin:0;">${prio.mainLabel}</p>
                        </div>
                        
                        <div style="display:flex; align-items:center; gap: 8px;">
                            <span style="font-size:10px; padding:2px 6px; border-radius:4px; background:${difficulty.color}15; color:${difficulty.color}; border: 1px solid ${difficulty.color}30; cursor:pointer;"
                                  onmouseenter="showGlobalTooltip(this, '${tooltipDifficulty}', '${difficulty.color}')"
                                  onmouseleave="hideGlobalTooltip()">${difficulty.label}</span>
                            
                            <p style="font-size:11px; color:var(--text-grey); cursor:pointer; margin:0;"
                               onmouseenter="showGlobalTooltip(this, '${tooltipResin}', 'rgba(255,255,255,0.4)')"
                               onmouseleave="hideGlobalTooltip()">
                                <span style="color:var(--text-primary);">${t('analysis.s3.resinEst', estimate.resin, estimate.days)}</span>
                            </p>
                        </div>
                    </div>
                    
                    <div style="flex:0 0 240px; margin: 0 24px; display:flex; flex-direction:column; gap:4px;">
                        <div style="display: flex; justify-content: space-between; font-size: 10px; color: var(--text-grey);">
                            <span>${t('analysis.top3.thisPiece')} : <strong style="color: ${prio.color};">${prio.score}</strong></span>
                            <span>${t('analysis.top3.globalAvg')} : <strong style="color: var(--text-always-white);">${avgScore.toFixed(1)}</strong></span>
                        </div>
                        <div style="width: 100%; height: 6px; background: #222; border-radius: 3px; position: relative;">
                            <div style="position: absolute; left: 0; top: 0; bottom: 0; width: ${pct}%; background: ${prio.color}; opacity: 0.85; border-radius: 3px;"></div>
                            <div style="position: absolute; left: ${avgPct}%; top: -3px; bottom: -3px; width: 2px; background: var(--text-always-white); box-shadow: 0 0 4px rgba(0,0,0,0.8); z-index: 2;">
                                <div style="position: absolute; top: -4px; left: -3px; width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 4px solid var(--text-always-white);"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="text-align:right; min-width:90px; flex-shrink:0; display:flex; flex-direction:column; justify-content:center; align-items:flex-end;">
                        <p style="color:${prio.color}; font-size:16px; line-height:1.2; margin:0;">
                            ${prio.score} <span style="font-size:12px; opacity:0.8;">(${prio.grade})</span>
                        </p>
                    </div>
                    
                </div>
            `;
        }).join('');
    }

    return `
        <div style="background:var(--bg-panel); padding:15px; border-radius:8px; grid-column: 1 / -1;">
            <p style="font-size:12px; color:var(--text-grey); text-transform:uppercase; margin-bottom:16px;">${t('analysis.s3.top3')}</p>
            ${contentHtml}
        </div>`;
}
