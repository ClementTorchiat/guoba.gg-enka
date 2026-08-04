// src/components/advice/SubstatQualitySection.js
import { t } from '../../scripts/i18n.js';
import { formatValueDisplay } from '../../scripts/data.js';
import { ICON_BASE_PATH, ICON_MAP } from '../../scripts/icons.js';
import STAT_LABELS from '../../data/stat_labels.json';
import SUBSTAT_RANGES from '../../data/substat_ranges.json';

export function renderSubstatQualitySection(persoObj, config) {
    if (!persoObj || !persoObj.artefacts) return '';

    const p = persoObj;
    const s4TotalGains = {};

    // S4 Header SVG
    const headerSvg = `
        <svg width="1em" height="1em" fill="var(--text-always-white)" aria-hidden="true" style="margin-bottom: 4px;" viewBox="0 0 720 719" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M405.85 503.18C405.69 502.99 405.34 502.66 404.77 502.62L318.72 496.92C314.18 496.62 309.92 494.07 308.01 489.94C305.97 485.52 306.75 480.45 309.97 476.87L522.79 239.9C523.01 239.66 523.13 239.34 523.13 239.02V44.99C523.13 20.14 502.99 0 478.14 0H44.99C20.14 0 0 20.14 0 44.99V653.06C0 677.91 20.14 698.05 44.99 698.05H305.24C305.61 698.05 305.95 697.91 306.2 697.64C338.85 662.84 395.97 590.83 406.17 504.19C406.22 503.73 406.03 503.38 405.85 503.17V503.18ZM280.15 438.88C277.64 447.04 270.11 452.61 261.57 452.61C253.04 452.61 245.5 447.04 243 438.88C238.33 423.68 234.67 410.88 231.57 400.02C224.19 374.21 220.12 359.98 214.05 353.92C207.99 347.85 193.76 343.78 167.93 336.39C157.07 333.28 144.27 329.62 129.06 324.94C120.9 322.43 115.33 314.9 115.33 306.36C115.33 297.82 120.9 290.29 129.06 287.78C144.27 283.11 157.08 279.44 167.93 276.35C193.76 268.96 207.98 264.9 214.04 258.84C220.1 252.77 224.17 238.55 231.55 212.72C234.65 201.87 238.31 189.06 242.98 173.85C245.49 165.69 253.02 160.12 261.56 160.12C270.1 160.12 277.63 165.69 280.14 173.85C284.81 189.05 288.48 201.86 291.59 212.72C298.99 238.55 303.06 252.78 309.12 258.84C315.18 264.9 329.4 268.97 355.21 276.35C366.07 279.46 378.87 283.11 394.08 287.78C402.23 290.29 407.81 297.82 407.81 306.36C407.81 314.9 402.24 322.43 394.08 324.94C378.88 329.62 366.08 333.28 355.22 336.39C329.41 343.79 315.18 347.85 309.12 353.92C303.06 359.99 298.98 374.21 291.59 400.03C288.48 410.88 284.82 423.68 280.14 438.88H280.15Z"/>
                                    <path d="M668.757 476.087L644.437 474.474L644.318 474.467L643.637 474.433C629.316 473.847 615.332 480.928 607.608 493.807C599.136 507.93 566.822 558.704 514.948 605.574C514.551 605.931 514.173 606.275 513.877 606.544C513.531 606.859 513.28 607.087 513.041 607.302L513.021 607.319L512.999 607.338C512.002 608.234 511.517 608.634 510.002 609.968C508.284 611.471 506.63 612.907 505.007 614.291C474.763 640.044 444.268 658.982 413.725 671.5L412.271 672.091C408.031 673.799 403.775 675.39 399.513 676.862L397.584 677.519C393.088 679.029 388.614 680.406 384.174 681.636C378.393 683.23 372.597 684.602 366.789 685.757C399.265 643.339 435.941 581.225 444.478 508.714L444.479 508.698L444.481 508.682C445.753 497.773 442.503 486.941 435.51 478.529C428.525 470.126 418.334 464.877 407.349 464.143L407.34 464.142H407.331L375.169 462.011L543.982 274.039L543.983 274.037L544.394 273.579L668.757 476.087Z"/>
                                    <path d="M520.096 638.196C516.182 641.471 512.255 644.645 508.317 647.72C512.263 644.639 516.198 641.458 520.119 638.177L520.096 638.196Z"/>
                                    <path d="M409.342 492.998C409.53 493.077 409.716 493.161 409.899 493.249C410.45 493.514 410.981 493.82 411.486 494.164C411.823 494.394 412.149 494.64 412.462 494.903L412.694 495.104C411.698 494.223 410.562 493.512 409.342 492.998Z"/>
                                    <path d="M406.363 492.173C406.477 492.189 406.59 492.206 406.703 492.226C406.804 492.243 406.905 492.262 407.006 492.282C406.793 492.24 406.578 492.204 406.363 492.173Z"/>
                                </svg>
    `;

    // Part A: Substat Redirection Cards
    const partACards = p.artefacts.map(art => {
        const pieceName = t('artifact.' + art.type);

        if ((art.stars || 5) < 4) {
            return `
                <div style="width:100%; background:var(--bg-panel); padding:10px 12px; border-radius:8px; opacity:0.5;">
                    <div style="display:flex; align-items:center; gap:10px; margin-bottom:6px;">
                        <img src="${art.icon}" style="width:38px; height:38px; border-radius:8px;" alt="">
                        <div>
                            <p style="font-size:12px; color:var(--text-primary);">${pieceName}</p>
                            <p style="font-size:11px; color:#6b7280;">${t('analysis.s5.unavailable', art.stars)}</p>
                        </div>
                    </div>
                </div>
            `;
        }

        const presentStats = new Set((art.subStats || []).map(s => s.key));
        const deadStats = [];
        (art.subStats || []).forEach(sub => {
            let w = config?.weights?.[sub.key];
            if (w === undefined && sub.key.includes("_dmg_")) w = config?.weights?.["elemental_dmg_"];
            if (!w || w === 0) {
                const rolls = (typeof window !== 'undefined' && window.getRollCount)
                    ? window.getRollCount(sub.key, sub.value, art.stars || 5)
                    : 1;
                if (rolls > 0) deadStats.push({ key: sub.key, rolls });
            }
        });

        const desiredStats = Object.entries(config?.weights || {})
            .filter(([k, w]) => w > 0)
            .sort((a, b) => b[1] - a[1])
            .map(([k]) => k);

        const replacementMap = {};
        const usedTargets = new Set(presentStats);
        deadStats.forEach(dead => {
            const targetKey = desiredStats.find(k =>
                !usedTargets.has(k) &&
                !k.includes("_dmg_") &&
                k !== art.mainStat?.key &&
                SUBSTAT_RANGES[k]
            );
            if (targetKey) {
                usedTargets.add(targetKey);
                const range = SUBSTAT_RANGES[targetKey];
                const minVal = (range.min * dead.rolls).toFixed(1);
                const maxVal = (range.max * dead.rolls).toFixed(1);
                const suffix = ['hp', 'atk', 'def', 'eleMas'].includes(targetKey) ? '' : '%';
                replacementMap[dead.key] = {
                    key: targetKey,
                    label: t('stat.' + targetKey),
                    minVal, maxVal, suffix
                };
                if (!s4TotalGains[targetKey]) s4TotalGains[targetKey] = 0;
                s4TotalGains[targetKey] += dead.rolls;
            }
        });

        const hasDead = Object.keys(replacementMap).length > 0;

        const subsHtml = (art.subStats || []).map((sub, idx) => {
            const replacement = replacementMap[sub.key];
            const isDead = !!replacement;
            const divider = idx < art.subStats.length - 1
                ? 'border-bottom: 1px dashed rgba(255,255,255,0.08); padding-bottom: 12px; margin-bottom: 12px;'
                : '';

            if (isDead) {
                return `
                    <div style="${divider}">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <div style="display:flex; flex-direction:row; align-items:center; gap:4px; opacity:0.4; text-decoration:line-through;">
                                <img src="${ICON_BASE_PATH}${ICON_MAP[sub.key] || ICON_MAP['unknown']}" style="width:15px; height:15px; flex-shrink:0;" alt="">
                                <p style="font-size:11px; white-space:nowrap; margin:0;">${sub.label}</p>
                            </div>
                            <p style="font-size:11px; opacity:0.4; text-decoration:line-through; flex-shrink:0; margin:0 0 0 4px;">${formatValueDisplay(sub.key, sub.value)}</p>
                        </div>
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:3px;">
                            <div style="display:flex; flex-direction:row; align-items:center; gap:4px;">
                                <span style="color:var(--text-grey); font-size:10px; padding-left:2px;">↳</span>
                                <img src="${ICON_BASE_PATH}${ICON_MAP[replacement.key] || ICON_MAP['unknown']}" style="width:15px; height:15px; flex-shrink:0;" alt="">
                                <p style="font-size:11px; color:var(--accent-gold); margin:0;">${replacement.label}</p>
                            </div>
                            <p style="font-size:11px; color:var(--accent-gold); flex-shrink:0; margin:0 0 0 4px;">${replacement.minVal}–${replacement.maxVal}${replacement.suffix}</p>
                        </div>
                    </div>
                `;
            } else {
                return `
                    <div style="display:flex; justify-content:space-between; align-items:center; ${divider}">
                        <div style="display:flex; flex-direction:row; align-items:center; gap:5px;">
                            <img src="${ICON_BASE_PATH}${ICON_MAP[sub.key] || ICON_MAP['unknown']}" style="width:15px; height:15px;" alt="">
                            <p style="font-size:11px; color:var(--text-primary); margin:0;">${sub.label}</p>
                        </div>
                        <p style="font-size:11px; color:var(--text-primary); margin:0;">${formatValueDisplay(sub.key, sub.value)}</p>
                    </div>
                `;
            }
        }).join('');

        return `
            <div style="flex:1; min-width:0; background:var(--bg-panel); padding:10px 12px; border-radius:8px; box-sizing:border-box; display:flex; flex-direction:column; gap:0; ${!hasDead ? 'opacity:0.6;' : ''}">
                <div style="display:flex; align-items:center; gap:10px; padding-bottom:8px; border-bottom:1px dashed rgba(255,255,255,0.1);">
                    <div style="position:relative; display:inline-block; flex-shrink:0;">
                        <img src="${art.icon}" style="width:38px; height:38px; border-radius:8px; border:2px solid ${art.stars === 5 ? '#FFB13B' : art.stars === 4 ? '#a855f7' : '#6b7280'};" alt="">
                        <p style="position:absolute; bottom:7px; right:1px; background:rgba(0,0,0,0.4); color:rgba(255,255,255,0.8); font-size:10px; padding:1px 4px; border-radius:8px; margin:0;">+${art.level}</p>
                    </div>
                    <div style="overflow:hidden; display:flex; flex-direction:column; justify-content:center; gap:1px; min-width:0;">
                        <p style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-size:12px; margin:0;">${pieceName}</p>
                        <p style="font-size:11px; color:var(--accent-gold); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin:0;">${art.setName}</p>
                        <p style="font-size:10px; color:rgba(255,255,255,0.4); margin:0;">${art.stars}★</p>
                    </div>
                </div>

                <div style="display:flex; flex-direction:column; padding-top:12px; gap:0;">
                    ${subsHtml}
                </div>
                ${!hasDead ? `<p style="margin-top:10px; text-align:center; background:#22c55e20; color:#22c55e; padding:4px; border-radius:4px; font-size:12px; border:1px solid #22c55e40;">${t('analysis.s4.optimal')}</p>` : ''}
            </div>
        `;
    }).join('');

    // Part A Total Gains Summary
    let partASummaryHtml = '';
    const gainKeys = Object.keys(s4TotalGains);
    if (gainKeys.length > 0) {
        partASummaryHtml = `
            <div style="margin-top: 20px; background: var(--bg-panel); padding: 15px; border-radius: 8px;">
                <p style="font-size: 12px; color: var(--text-grey); text-transform: uppercase; margin-bottom: 12px; letter-spacing: 0.05em; margin-top:0;">${t('analysis.s4.totalGains')}</p>
                <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                    ${gainKeys.sort((a, b) => s4TotalGains[b] - s4TotalGains[a]).map(key => {
            const rolls = s4TotalGains[key];
            const range = SUBSTAT_RANGES[key];
            const minVal = (range.min * rolls).toFixed(1);
            const maxVal = (range.max * rolls).toFixed(1);
            const suffix = ['hp', 'atk', 'def', 'eleMas'].includes(key) ? '' : '%';
            const label = t('stat.' + key);
            const icon = ICON_BASE_PATH + (ICON_MAP[key] || ICON_MAP['unknown']);
            return `
                            <div style="display: flex; align-items: center; gap: 8px; background: rgba(0,0,0,0.1); padding: 8px 12px; border-radius: 6px;">
                                <img src="${icon}" style="width: 18px; height: 18px;" alt="">
                                <div style="display: flex; flex-direction: column;">
                                    <span style="font-size: 11px; color: var(--text-grey);">${label}</span>
                                    <span style="font-size: 13px; color: var(--accent-gold);">+${minVal} ${t('sim.range')} ${maxVal}${suffix}</span>
                                </div>
                            </div>
                        `;
        }).join('')}
                </div>
            </div>
        `;
    }

    // Part B: Max Roll Efficiency Cards
    const partBCards = p.artefacts.map(art => {
        const pieceName = t('artifact.' + art.type);

        if ((art.stars || 5) < 4) {
            return `
                <div style="width: 100%; background:var(--bg-panel); padding:10px 12px; border-radius:8px; opacity:0.5;">
                    <div style="display:flex; align-items:center; gap:10px; margin-bottom:6px;">
                        <img src="${art.icon}" style="width:38px; height:38px; border-radius:8px;" alt="">
                        <div>
                            <p style="font-size:12px; color:var(--text-primary); margin:0;">${pieceName}</p>
                            <p style="font-size:11px; color:#6b7280; margin:0;">${t('analysis.s5b.unavailable', art.stars)}</p>
                        </div>
                    </div>
                </div>
            `;
        }

        const maxRollsRef = (art.stars === 4 && typeof window !== 'undefined' && window.MAX_ROLLS_4) ? window.MAX_ROLLS_4 : (typeof window !== 'undefined' ? window.MAX_ROLLS : {});

        const subsMaxHtml = (art.subStats || []).map((sub, idx) => {
            const details = (typeof window !== 'undefined' && window.getRollDetails)
                ? window.getRollDetails(sub.key, sub.value, art.stars || 5)
                : { k: 1 };
            const rollCount = details.k;
            const maxRollVal = maxRollsRef ? maxRollsRef[sub.key] : null;

            if (!maxRollVal || rollCount === 0) {
                return `
                    <div style="padding: 4px 0; ${idx < art.subStats.length - 1 ? 'border-bottom: 1px dashed rgba(255,255,255,0.08);' : ''}">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <p style="font-size:11px; color:var(--text-grey); display:flex; align-items:center; gap:4px; margin:0;">
                                <img src="${ICON_BASE_PATH}${ICON_MAP[sub.key] || ICON_MAP['unknown']}" style="width:13px; height:13px;" alt="">
                                ${sub.label}
                            </p>
                            <p style="font-size:12px; color:var(--text-primary); margin:0;">${formatValueDisplay(sub.key, sub.value)}</p>
                        </div>
                    </div>
                `;
            }

            const isFlat = ['hp', 'atk', 'def', 'eleMas'].includes(sub.key);
            const suffix = isFlat ? '' : '%';
            const maxTotal = maxRollVal * rollCount;
            const displayMax = isFlat ? Math.round(maxTotal) : parseFloat(maxTotal.toFixed(1));

            const singleDisplay = isFlat ? Math.round(maxRollVal) : maxRollVal.toFixed(1);
            const rollsHtml = Array(rollCount).fill(singleDisplay).map((v, i) => {
                const plus = i < rollCount - 1 ? ' <span style="color:#555;">+</span> ' : '';
                return `<span style="color:#EE72F7;">${v}</span>${plus}`;
            }).join('');

            const delta = maxTotal - sub.value;
            const deltaDisplay = isFlat ? Math.round(delta) : parseFloat(delta.toFixed(1));
            const deltaHtml = delta > 0.01
                ? `<span style="color:#22c55e; font-size:10px; font-family:ShinShin, Inter, sans-serif;">(+${deltaDisplay}${suffix})</span>`
                : '';

            return `
                <div style="padding: 4px 0; ${idx < art.subStats.length - 1 ? 'border-bottom: 1px dashed rgba(255,255,255,0.08);' : ''}">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 2px;">
                        <p style="font-size:11px; color:var(--text-grey); display:flex; align-items:center; gap:4px; margin:0;">
                            <img src="${ICON_BASE_PATH}${ICON_MAP[sub.key] || ICON_MAP['unknown']}" style="width:13px; height:13px;" alt="">
                            ${sub.label}
                        </p>
                        <p style="font-size:12px; color:var(--text-primary); margin:0;">${displayMax}${suffix}</p>
                    </div>
                    <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px; font-family:monospace; line-height:1.2;">
                        ${deltaHtml}
                        <div style="text-align:right; flex: auto;">${rollsHtml}</div>
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div style="width: 100%; background:var(--bg-panel); padding:10px 12px; border-radius:8px;">
                <div style="display:flex; align-items:center; gap:10px; margin-bottom:6px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom:8px;">
                    <img src="${art.icon}" style="width:38px; height:38px; border-radius:8px; background-color: rgba(0,0,0,0.1)" alt="">
                    <div>
                        <p style="font-size:12px; color:var(--text-primary); overflow:hidden; text-overflow:ellipsis; margin:0;">${pieceName}</p>
                    </div>
                </div>
                <div style="display:flex; flex-direction:column; gap:0;">
                    ${subsMaxHtml}
                </div>
            </div>
        `;
    }).join('');

    // Part B Total Gains Summary
    const s5bGains = {};
    p.artefacts.forEach(art => {
        if ((art.stars || 5) < 4) return;
        const maxRollsRef = (art.stars === 4 && typeof window !== 'undefined' && window.MAX_ROLLS_4) ? window.MAX_ROLLS_4 : (typeof window !== 'undefined' ? window.MAX_ROLLS : {});
        (art.subStats || []).forEach(sub => {
            const details = (typeof window !== 'undefined' && window.getRollDetails)
                ? window.getRollDetails(sub.key, sub.value, art.stars || 5)
                : { k: 1 };
            const maxRollVal = maxRollsRef ? maxRollsRef[sub.key] : null;
            if (!maxRollVal || details.k === 0) return;
            const delta = (maxRollVal * details.k) - sub.value;
            if (delta <= 0.01) return;
            if (!s5bGains[sub.key]) s5bGains[sub.key] = { delta: 0, label: sub.label };
            s5bGains[sub.key].delta += delta;
        });
    });

    let partBSummaryHtml = '';
    const bGainKeys = Object.keys(s5bGains);
    if (bGainKeys.length > 0) {
        partBSummaryHtml = `
            <div style="margin-top: 20px; background: var(--bg-panel); padding: 15px; border-radius: 8px;">
                <p style="font-size: 12px; color: var(--text-grey); text-transform: uppercase; margin-bottom: 12px; letter-spacing: 0.05em; margin-top:0;">${t('analysis.s4.totalGains')}</p>
                <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                    ${bGainKeys.sort((a, b) => {
            let wa = config?.weights?.[a]; if (wa === undefined && a.includes('_dmg_')) wa = config?.weights?.['elemental_dmg_']; wa = wa || 0;
            let wb = config?.weights?.[b]; if (wb === undefined && b.includes('_dmg_')) wb = config?.weights?.['elemental_dmg_']; wb = wb || 0;
            if (wb !== wa) return wb - wa;
            return s5bGains[b].delta - s5bGains[a].delta;
        }).map(key => {
            const { delta, label } = s5bGains[key];
            const isFlat = ['hp', 'atk', 'def', 'eleMas'].includes(key);
            const suffix = isFlat ? '' : '%';
            const displayDelta = isFlat ? Math.round(delta) : parseFloat(delta.toFixed(1));
            const icon = ICON_BASE_PATH + (ICON_MAP[key] || ICON_MAP['unknown']);
            let w = config?.weights?.[key];
            if (w === undefined && key.includes('_dmg_')) w = config?.weights?.['elemental_dmg_'];
            const opacity = (w && w > 0) ? '1' : '0.4';
            return `
                            <div style="display: flex; align-items: center; gap: 8px; background: rgba(0,0,0,0.1); padding: 8px 12px; border-radius: 6px; opacity: ${opacity};">
                                <img src="${icon}" style="width: 18px; height: 18px;" alt="">
                                <div style="display: flex; flex-direction: column;">
                                    <span style="font-size: 11px; color: var(--text-grey);">${label}</span>
                                    <span style="font-size: 13px; color: var(--accent-gold);">+${displayDelta}${suffix}</span>
                                </div>
                            </div>
                        `;
        }).join('')}
                </div>
            </div>
        `;
    }

    return `
        <div>
            <h3 style="color:var(--text-primary); font-size:24px; margin-bottom: 12px; display: flex; align-items: center; gap: 10px; font-weight: normal;">
                ${headerSvg}
                ${t('analysis.s4.title')}
            </h3>
            <p style="border-left: 3px solid var(--text-grey); padding-left: 12px; color: var(--text-grey); font-size: 16px; margin-bottom: 24px;">${t('analysis.s4.desc')}</p>
            
            <div style="padding-top: 10px;">
                <p style="font-size:12px; color:var(--text-grey); text-transform:uppercase; margin-bottom:12px; letter-spacing:0.05em; margin-top:0;">${t('analysis.s5a.title')}</p>
                <p style="font-size:13px; color:var(--text-grey); margin-bottom:16px;">${t('analysis.s5a.desc')}</p>
            </div>

            <div style="display:flex; flex-direction:row; justify-content:space-between; gap:15px;">
                ${partACards}
            </div>
            
            ${partASummaryHtml}

            <div style="margin-top: 48px;">
                <p style="font-size:12px; color:var(--text-grey); text-transform:uppercase; margin-bottom:12px; letter-spacing:0.05em; margin-top:0;">${t('analysis.s5b.title')}</p>
                <p style="font-size:13px; color:var(--text-grey); margin-bottom:16px;">${t('analysis.s5b.desc')}</p>

                <div style="display:flex; flex-direction: row; justify-content: space-between; gap:15px;">
                    ${partBCards}
                </div>

                ${partBSummaryHtml}
            </div>
        </div>
    `;
}
