// src/components/advice/RollEfficiencyAdvice.js
import { t } from '../../scripts/i18n.js';
import { MAX_ROLLS, MAX_ROLLS_4 } from '../../scripts/data.js';

export function calculateRNGQuality(persoObj, config) {
    if (!config || !config.weights) return 0;
    let totalPct = 0;
    let count = 0;

    (persoObj.artefacts || []).forEach(art => {
        (art.subStats || []).forEach(sub => {
            let w = config.weights[sub.key];
            if (w === undefined && sub.key.includes("_dmg_")) w = config.weights["elemental_dmg_"];
            if (w && w > 0) {
                const maxRollsRef = (art.stars === 4 && MAX_ROLLS_4) ? MAX_ROLLS_4 : MAX_ROLLS;
                const maxVal = maxRollsRef[sub.key];
                if (maxVal) {
                    const rolls = (typeof window !== 'undefined' && window.getRollCount)
                        ? window.getRollCount(sub.key, sub.value, art.stars || 5)
                        : 1;
                    if (rolls > 0) {
                        const theoreticalMax = rolls * maxVal;
                        totalPct += (sub.value / theoreticalMax);
                        count++;
                    }
                }
            }
        });
    });
    return count > 0 ? (totalPct / count) * 100 : 0;
}

export function renderRollEfficiencyAdvice(persoObj, config) {
    const quality = calculateRNGQuality(persoObj, config);
    let color = "#ef4444";
    let title = t('advice.rng.title');
    let msg = t('advice.rng.low', quality.toFixed(1));

    if (quality >= 90) {
        color = "#22c55e";
        msg = t('advice.rng.high', quality.toFixed(1));
    } else if (quality >= 80) {
        color = "#3b82f6";
        msg = t('advice.rng.good', quality.toFixed(1));
    } else if (quality >= 70) {
        color = "#eab308";
        msg = t('advice.rng.medium', quality.toFixed(1));
    }

    return `
        <div class="advice-card advice-rng" style="background:var(--bg-panel); padding:15px; border-radius:8px; border-left:3px solid ${color}; min-height:165px; display:flex; flex-direction:column; justify-content:space-between; box-sizing:border-box;">
            <div>
                <p style="font-size: 12px; color: var(--text-grey); text-transform: uppercase; margin-bottom: 12px;">${title}</p>
                <p style="font-size: 14px; color:var(--text-primary); line-height:1.4; margin:0;">${msg}</p>
            </div>
            <div style="margin-top: auto; padding-top: 12px;">
                <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--text-grey); margin-bottom:4px;">
                    <span>${t('advice.rng.efficiency')}</span>
                    <span style="color:${color}; font-weight:bold;">${quality.toFixed(1)}%</span>
                </div>
                <div style="width:100%; height:6px; background:rgba(0,0,0,0.2); border-radius:3px;">
                    <div style="width:${Math.min(quality, 100)}%; height:100%; background:${color}; opacity:0.85; border-radius:3px;"></div>
                </div>
            </div>
        </div>
    `;
}
