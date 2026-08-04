// src/components/advice/RollDistributionAdvice.js
import { t } from '../../scripts/i18n.js';
import { calculateRollDistribution } from '../../scripts/scoring.js';

export function renderRollDistributionAdvice(persoObj, config) {
    const rollStats = calculateRollDistribution(persoObj, config);

    return `
        <div style="flex:1; background:var(--bg-panel); padding:15px; border-radius:8px; display:flex; flex-direction:column; justify-content:space-between;">
            <div style="margin-bottom:12px;">
                <div style="color:var(--text-grey); text-transform:uppercase; margin-bottom:8px; display:flex; justify-content:space-between; align-items:flex-end;">
                    <p style="font-size:12px;">${t('analysis.s2.rollDist')}</p>
                    <div style="font-size:11px; text-align: right;">
                        <span style="color:#22c55e;">${t('analysis.s2.usefulRolls', rollStats.usefulCount)}</span> / 
                        <span style="color:#ff4d4d;">${t('analysis.s2.deadRolls', rollStats.deadCount)}</span>
                    </div>
                </div>
                
                <div style="display:flex; width:100%; height:8px; background:#333; border-radius:4px; overflow:hidden;">
                    <div style="width:${rollStats.total > 0 ? (rollStats.usefulCount / rollStats.total) * 100 : 0}%; background:#22c55e;"></div>
                    <div style="width:${rollStats.total > 0 ? (rollStats.deadCount / rollStats.total) * 100 : 0}%; background:#ff4d4d;"></div>
                </div>
            </div>
        
            <div style="margin-bottom:10px;">
                <p style="font-size:11px; color:var(--text-grey); margin-bottom:4px;">${t('analysis.s2.usefulStats')}</p>
                <div style="display:flex; flex-wrap:wrap; gap:5px;">
                    ${rollStats.usefulDetails.map(d =>
                        `<span style="background:rgba(34, 197, 94, 0.15); color:#86efac; font-size:0.75rem; padding:2px 6px; border-radius:4px; border:1px solid rgba(34, 197, 94, 0.2);">
                            ${d.label} (${d.count})
                        </span>`
                    ).join('')}
                </div>
            </div>
        
            <div>
                <p style="font-size:11px; color:var(--text-grey); margin-bottom:4px;">${t('analysis.s2.deadStats')}</p>
                <div style="display:flex; flex-wrap:wrap; gap:5px;">
                    ${rollStats.deadDetails.length > 0 ? rollStats.deadDetails.map(d =>
                        `<span style="background:rgba(255, 77, 77, 0.15); color:#ff9999; font-size:0.75rem; padding:2px 6px; border-radius:4px; border:1px solid rgba(255, 77, 77, 0.2);">
                            ${d.label} (${d.count})
                        </span>`
                    ).join('') : `<span style="color:#22c55e; font-size:0.75rem;">${t('analysis.s2.noDeadStats')}</span>`}
                </div>
            </div>
        </div>
    `;
}
