// src/components/advice/TalentAdvice.js
import { t } from '../../scripts/i18n.js';

export function getTalentAdvice(persoObj, config) {
    if (!config || !config.talents) return null;
    const target = config.talents;
    const current = { auto: 0, skill: 0, burst: 0 };

    if (persoObj.talents && persoObj.talents.length >= 3) {
        current.auto = persoObj.talents[0].level || 0;
        current.skill = persoObj.talents[1].level || 0;
        current.burst = persoObj.talents[2].level || 0;
    }

    let criticals = [];
    let infos = [];

    const check = (type, label) => {
        const lvl = current[type];
        const goal = target[type];
        if (!goal || goal <= 1) return;

        const diff = goal - lvl;
        if (diff >= 2) {
            criticals.push(t('advice.talent.item', label, goal));
        } else if (diff >= 1) {
            infos.push(t('advice.talent.item', label, goal));
        }
    };

    check('auto', t('advice.talent.auto'));
    check('skill', t('advice.talent.skill'));
    check('burst', t('advice.talent.burst'));

    if (criticals.length === 0 && infos.length === 0) {
        return [{ type: "success", color: "#22c55e", title: t('advice.talent.title'), msg: t('advice.talent.ok') }];
    }

    let advices = [];

    const formatList = (list) => {
        if (list.length === 1) return list[0];
        if (list.length === 2) return list[0] + ' ' + t('ui.and') + ' ' + list[1];
        return list.slice(0, -1).join(', ') + ' ' + t('ui.and') + ' ' + list[list.length - 1];
    };

    if (criticals.length > 0) {
        advices.push({
            type: "critical",
            color: "#ef4444",
            title: t('advice.talent.title'),
            msg: t('advice.talent.critical', formatList(criticals))
        });
    }

    if (infos.length > 0) {
        advices.push({
            type: "info",
            color: "#3b82f6",
            title: t('advice.talent.title'),
            msg: t('advice.talent.info', formatList(infos))
        });
    }

    return advices;
}

export function renderTalentAdvice(persoObj, config) {
    const talentAdvices = getTalentAdvice(persoObj, config);
    if (!talentAdvices || talentAdvices.length === 0) return '';
    const color = talentAdvices[0].type === 'success' ? '#22c55e' : '#ef4444';

    const target = (config && config.talents) || { auto: 1, skill: 1, burst: 1 };
    const talentKeys = ['auto', 'skill', 'burst'];

    let circlesHtml = '';
    if (persoObj.talents && persoObj.talents.length >= 3) {
        circlesHtml = `<div style="display:flex; justify-content:space-around; align-items:center; margin-top:auto; gap:10px; padding-top:16px;">`;
        talentKeys.forEach((key, idx) => {
            const curLvl = persoObj.talents[idx].level || 1;
            const tgtLvl = target[key] || 1;
            const pct = Math.min((curLvl / tgtLvl) * 100, 100);

            const lvlText = curLvl >= tgtLvl
                ? `<span style="color:var(--text-primary);">${curLvl}</span>`
                : `<span style="color:var(--text-muted);">${curLvl}</span> <span style="color:var(--text-always-white); font-size:11px;">➔</span> <span style="color:#22c55e;">${tgtLvl}</span>`;

            const progressColor = curLvl >= tgtLvl ? '#22c55e' : '#ef4444';

            circlesHtml += `
                <div style="display:flex; flex-direction:column; align-items:center; gap:6px; flex:1;">
                    <div style="width: 60px; height: 60px; border-radius: 50%; background: conic-gradient(${progressColor} ${pct}%, rgba(255,255,255,0.1) ${pct}%); display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                        <div style="width: 54px; height: 54px; border-radius: 50%; background: var(--bg-panel); display: flex; align-items: center; justify-content: center; overflow: hidden;">
                            <img src="${persoObj.talents[idx].icon}" style="width: 40px; height: 40px; object-fit: contain;" alt="">
                        </div>
                    </div>
                    <p style="font-size: 12px; margin: 0; white-space:nowrap;">${lvlText}</p>
                </div>`;
        });
        circlesHtml += `</div>`;
    }

    return `
        <div style="background:var(--bg-panel); padding:15px; border-radius:8px; border-left:3px solid ${color}; display:flex; flex-direction:column; justify-content:space-between; min-height:165px; box-sizing:border-box;">
            <div>
                <p style="font-size: 12px; color: var(--text-grey); text-transform: uppercase; margin-bottom: 12px;">${t('analysis.s3.talentPriority')}</p>
                <div style="display:flex; flex-direction:column; gap:6px;">
                    ${talentAdvices.map(adv => `
                        <p style="font-size: 14px; color:var(--text-primary); margin:0; line-height:1.4;">${adv.msg}</p>
                    `).join('')}
                </div>
            </div>
            ${circlesHtml}
        </div>`;
}
