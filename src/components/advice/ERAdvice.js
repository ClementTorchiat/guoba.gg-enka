// src/components/advice/ERAdvice.js
import { t } from '../../scripts/i18n.js';

export function getERAdvice(currentER, targetER) {
    const diff = currentER - targetER;

    if (diff >= -10 && diff <= 15) {
        return {
            type: "success",
            title: t('advice.er.title.ok'),
            msg: t('advice.er.ok', currentER.toFixed(0), targetER)
        };
    }

    if (diff < -10) {
        return {
            type: "warning",
            title: t('advice.er.title.low'),
            msg: t('advice.er.low', currentER.toFixed(0), targetER)
        };
    }

    if (diff > 15) {
        return {
            type: "info",
            title: t('advice.er.title.excess'),
            msg: t('advice.er.excess', currentER.toFixed(0), targetER)
        };
    }
}

export function renderERAdvice(p, b) {
    const targetER = (p.activeBuild && p.activeBuild.er_req) ? p.activeBuild.er_req : 100;
    const currentER = b.er || 100;

    const adv = getERAdvice(currentER, targetER);
    if (!adv) return '';

    const color = adv.type === 'success' ? '#22c55e' : (adv.type === 'info' ? '#3b82f6' : '#ef4444');

    const pctCurrent = Math.max(0, Math.min(((currentER - 100) / 200) * 100, 100));
    const pctTarget = Math.max(0, Math.min(((targetER - 100) / 200) * 100, 100));

    let hatchedHtml = '';
    if (pctCurrent < pctTarget) {
        hatchedHtml = `<div style="position:absolute; top:0; bottom:0; left:${pctCurrent}%; width:${pctTarget - pctCurrent}%; background:repeating-linear-gradient(45deg, rgba(239,68,68,0.4), rgba(239,68,68,0.4) 4px, transparent 4px, transparent 8px);"></div>`;
    } else if (pctCurrent > pctTarget) {
        hatchedHtml = `<div style="position:absolute; top:0; bottom:0; left:${pctTarget}%; width:${pctCurrent - pctTarget}%; background:repeating-linear-gradient(45deg, rgba(255,255,255,0.2), rgba(255,255,255,0.2) 4px, transparent 4px, transparent 8px);"></div>`;
    }

    return `
        <div style="flex: 1; background:var(--bg-panel); padding:15px; border-radius:8px; border-left:3px solid ${color}; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
                <p style="font-size: 12px;color: var(--text-grey); text-transform: uppercase;margin-bottom: 8px;">${adv.title}</p>
                <p style="font-size: 14px; color:var(--text-primary); flex:1; line-height:1.4; margin-bottom: 20px;">${adv.msg}</p>
            </div>
            
            <div style="width: 100%; position: relative;">
                <div style="width: 100%; height: 20px; background: rgba(0,0,0,0.2); border-radius: 4px; overflow: hidden; position: relative;">
                    <div style="
                        width: ${pctCurrent}%; 
                        height: 100%; 
                        background: ${color}; 
                        opacity: 0.85; 
                        transition: width 0.5s ease-out;
                    "></div>
                    ${hatchedHtml}
                </div>
                
                <div style="
                    position: absolute; 
                    left: ${pctTarget}%; 
                    top: -4px; 
                    width: 2px; 
                    height: 16px; 
                    background: var(--text-always-white); 
                    box-shadow: 0 0 5px rgba(0,0,0,0.8);
                    z-index: 2;
                ">
                    <div style="position: absolute; top: -5px; left: -3px; width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 4px solid var(--text-always-white);"></div>
                </div>
                
                <div style="display: flex; justify-content: space-between; font-size: 10px; color: var(--text-grey); margin-top: 4px;">
                    <span>100%</span>
                    <span style="color:var(--text-always-white);">${t('advice.er.target')} ${targetER}%</span>
                    <span>300%+</span>
                </div>
            </div>
        </div>
    `;
}
