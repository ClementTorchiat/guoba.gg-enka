// src/components/advice/DeadRollsSimulator.js
import { t } from '../../scripts/i18n.js';
import STAT_LABELS from '../../data/stat_labels.json';
import SUBSTAT_RANGES from '../../data/substat_ranges.json';

export function simulateDeadStatReplacements(persoObj, config) {
    if (!config || !config.weights) return [];
    let suggestions = [];

    (persoObj.artefacts || []).forEach(art => {
        let deadStats = [];
        let presentStats = new Set();

        (art.subStats || []).forEach(sub => {
            presentStats.add(sub.key);
            let w = config.weights[sub.key];
            if (w === undefined && sub.key.includes("_dmg_")) w = config.weights["elemental_dmg_"];

            if (!w || w === 0) {
                const rolls = (typeof window !== 'undefined' && window.getRollCount)
                    ? window.getRollCount(sub.key, sub.value, art.stars || 5)
                    : 1;
                if (rolls > 0) {
                    deadStats.push({
                        key: sub.key,
                        rolls: rolls,
                        label: t('stat.' + sub.key)
                    });
                }
            }
        });

        if (deadStats.length === 0) return;

        const desiredStats = Object.entries(config.weights)
            .filter(([key, w]) => w > 0)
            .sort((a, b) => b[1] - a[1])
            .map(([key]) => key);

        deadStats.sort((a, b) => b.rolls - a.rolls);

        let replacements = [];
        let usedTargets = new Set(presentStats);

        deadStats.forEach(dead => {
            let targetKey = desiredStats.find(k =>
                !usedTargets.has(k) &&
                !k.includes("_dmg_") &&
                k !== art.mainStat.key
            );

            if (targetKey && SUBSTAT_RANGES[targetKey]) {
                usedTargets.add(targetKey);

                const range = SUBSTAT_RANGES[targetKey];
                const minVal = (range.min * dead.rolls).toFixed(1);
                const maxVal = (range.max * dead.rolls).toFixed(1);
                const suffix = (targetKey.endsWith('_') || targetKey === "enerRech_" || targetKey === "critRate_" || targetKey === "critDMG_") ? "%" : "";
                const targetLabel = t('stat.' + targetKey);

                replacements.push({
                    dead: `${dead.label} (${dead.rolls})`,
                    target: `${targetLabel} (${dead.rolls})`,
                    gain: `+${minVal} <span style="color:var(--text-primary); opacity:0.8; padding:0 2px;">${t('sim.range')}</span> ${maxVal}${suffix} ${targetLabel}`
                });
            }
        });

        if (replacements.length > 0) {
            const pieceName = t('artifact.' + art.type);
            const deadText = replacements.map(r => `<span style="color:#ff6b6b">${r.dead}</span>`).join(t('ui.and'));
            const targetText = replacements.map(r => `<span style="color:var(--accent-gold)">${r.target}</span>`).join(t('ui.and'));
            const gainText = replacements.map(r => `
                <div style="display: flex; flex-direction: row; align-items: center; color: var(--accent-gold);">
                    <p style="color: var(--text-primary); margin-right: 6px;">•</p>
                    <p>${r.gain}</p>
                </div>
            `).join('');

            suggestions.push({
                pieceName: pieceName,
                text: t('sim.replace', deadText, targetText),
                gainHtml: gainText,
                totalDeadRolls: deadStats.reduce((acc, curr) => acc + curr.rolls, 0)
            });
        }
    });

    suggestions.sort((a, b) => b.totalDeadRolls - a.totalDeadRolls);
    return suggestions;
}

export function renderDeadRollsSimulator(persoObj, config) {
    const suggestions = simulateDeadStatReplacements(persoObj, config);
    if (!suggestions || suggestions.length === 0) return '';

    return `
        <div class="advice-card advice-simulator" style="background:var(--bg-panel); padding:15px; border-radius:8px; border-left:3px solid var(--accent-gold); grid-column: 1 / -1; box-sizing:border-box;">
            <p style="font-size:12px; color:var(--text-grey); text-transform:uppercase; margin-bottom:12px;">${t('sim.title')}</p>
            <div style="display:flex; flex-direction:column; gap:12px;">
                ${suggestions.map(s => `
                    <div style="display:flex; justify-content:space-between; align-items:center; padding-bottom:8px; border-bottom:1px dashed rgba(255,255,255,0.05);">
                        <div>
                            <span style=" color:var(--text-primary);">${s.pieceName}</span> : ${s.text}
                        </div>
                        <div>${s.gainHtml}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}
