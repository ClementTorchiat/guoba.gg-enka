// src/components/advice/CritAdvice.js
import { t } from '../../scripts/i18n.js';

export function getCritAdvice(cr, cd, config) {
    const crWeight = (config && config.weights && config.weights['critRate_']) || 0;

    if (crWeight < 1) {
        return { color: '#888', msg: t('advice.crit.noCrit') };
    }

    const roundedCR = Math.round(cr * 10) / 10;
    const roundedCD = Math.round(cd);

    if (roundedCR > 100) {
        return {
            color: '#ef4444',
            msg: t('advice.crit.overcap', cr.toFixed(1))
        };
    }

    if (roundedCR === 100) return { color: '#00FFFF', msg: t('advice.crit.perfect100') };

    if (roundedCR >= 90) {
        if (roundedCD < 160) {
            return {
                color: '#eab308',
                msg: t('advice.crit.highCDLowCR', roundedCR, roundedCD)
            };
        }
        return { color: '#22c55e', msg: t('advice.crit.above90') };
    }

    if (roundedCR >= 80) {
        return {
            color: '#22c55e',
            msg: t('advice.crit.above80')
        };
    }

    if (roundedCR >= 70) {
        if (roundedCD > 200) {
            return {
                color: '#f97316',
                msg: t('advice.crit.highCDLowCR2', roundedCD, roundedCR)
            };
        }
        return { color: '#eab308', msg: t('advice.crit.above70') };
    }

    if (roundedCR >= 60) {
        return {
            color: '#f97316',
            msg: t('advice.crit.above60')
        };
    }

    return {
        color: '#ef4444',
        msg: t('advice.crit.below60')
    };
}

export function renderCritAdvice(b, config) {
    const critAdvice = getCritAdvice(b.cr, b.cd, config);
    return `
        <div style="flex:1; background:var(--bg-panel); padding:15px; border-radius:8px; border-left:3px solid ${critAdvice.color}; display:flex; flex-direction:column; justify-content:space-between;">
            <div style="margin-bottom: 20px;">
                <p style="font-size:12px; color:var(--text-grey); text-transform:uppercase; margin-bottom:12px;">${t('analysis.s2.critAnalysis')}</p>
                <p style="font-size:14px; color:var(--text-primary); margin-bottom: 4px; line-height:1.4;">${critAdvice.msg}</p>
            </div>
            
            ${critAdvice.msg !== t('advice.crit.noCrit') ? `
            <div style="padding-left: 16px; padding-bottom: 24px; padding-top: 32px; border-top:1px dashed rgba(255,255,255,0.1);">
                <div style="width: 100%; aspect-ratio: ${Math.max(300, b.cd) / 100}; background: rgba(0,0,0,0.2); border-left: 1px solid rgba(255,255,255,0.2); border-bottom: 1px solid rgba(255,255,255,0.2); position: relative; display: flex; align-items: flex-end;">
                    
                    <span style="position:absolute; left:-18px; top:50%; font-size:10px; color:var(--text-grey); transform:translateY(-50%) rotate(-90deg); letter-spacing:1px; font-weight:bold;">CR</span>
                    <span style="position:absolute; left:-12px; top:-16px; font-size:9px; color:var(--text-grey);">100%</span>
                    
                    <span style="position:absolute; bottom:-20px; left:50%; font-size:10px; color:var(--text-grey); transform:translateX(-50%); letter-spacing:1px; font-weight:bold;">CD</span>
                    <span style="position:absolute; bottom:-20px; right:0; font-size:9px; color:var(--text-grey);">${Math.max(300, b.cd).toFixed(0)}%</span>

                    <div style="width: ${(b.cd / Math.max(300, b.cd)) * 100}%; height: ${Math.min(b.cr, 100)}%; background: ${critAdvice.color}; opacity: 0.85; border-radius: 0 3px 0 0; box-shadow: inset -1px 1px 2px rgba(255,255,255,0.3); position: relative;">
                        <span style="position:absolute; top:-18px; right:0; font-size:10px; font-weight:bold; color:var(--text-always-white); text-shadow:0 0 3px rgba(0,0,0,0.8); white-space:nowrap;">
                            ${b.cr.toFixed(1)}% / ${b.cd.toFixed(1)}%
                        </span>
                    </div>
                    
                </div>
            </div>
            ` : `
            <div style="flex:1;"></div>
            `}
        </div>
    `;
}
