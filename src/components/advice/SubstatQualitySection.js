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
        <svg width="1em" height="1em" fill="var(--text-always-white)" aria-hidden="true" style="margin-bottom: 4px;" viewBox="0 0 575 754" xmlns="http://www.w3.org/2000/svg">
            <path d="M287.982 0.0170898C299.572 17.4675 317.697 35.9596 334.282 51.144C347.964 63.6703 360.916 74.229 368.944 80.48L316.341 107.743C314.058 108.921 312.701 111.269 312.701 113.73V131.93C312.701 135.188 315.07 138.113 318.475 138.605V138.607C323.18 139.294 355.387 144.383 390.787 158.844C426.38 173.384 463.961 196.895 481.102 233.711V233.712C490.287 253.446 497.416 272.292 503.719 289.672C509.984 306.95 515.517 323.03 521.384 336.762C530.932 359.11 542.091 377.039 560.818 384.907C549.15 390.34 531.798 396.997 515.266 397.956C503.314 398.649 492.615 396.318 484.67 389.265C476.744 382.229 470.453 369.508 469.445 347.001C467.197 296.76 463.247 258.615 446.948 228.808C430.41 198.563 401.728 177.794 352.489 160.605L352.487 160.608C350.467 159.896 348.316 160.219 346.657 161.267L288.341 198.106L230.026 161.267H230.025C228.321 160.191 226.176 159.911 224.193 160.607V160.605C174.959 177.794 146.278 198.562 129.738 228.807C113.438 258.614 109.486 296.759 107.237 347.001C106.229 369.507 99.9393 382.229 92.0137 389.265C84.069 396.318 73.3695 398.649 61.418 397.956C44.8876 396.997 27.5363 390.341 15.8682 384.909C34.5989 377.042 45.7596 359.113 55.3076 336.762C61.174 323.03 66.7056 306.951 72.9697 289.672C79.2708 272.292 86.3984 253.446 95.5811 233.712C112.721 196.895 150.304 173.387 185.899 158.848C221.301 144.388 253.509 139.299 258.216 138.606L258.215 138.604C261.616 138.109 263.981 135.187 263.981 131.93V113.73C263.981 111.286 262.642 108.939 260.35 107.747L260.343 107.743L208.555 80.9019C226.646 68.5322 244.951 50.3137 259.733 33.9106C272.061 20.2313 282.174 7.54733 287.982 0.0170898Z"/>
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
                            <p style="font-size:12px; color:var(--text-primary); font-weight:bold;">${pieceName}</p>
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
                        <p style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-size:12px; font-weight:bold; margin:0;">${pieceName}</p>
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
                                    <span style="font-size: 13px; color: var(--accent-gold); font-weight: bold;">+${minVal} ${t('sim.range')} ${maxVal}${suffix}</span>
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
                            <p style="font-size:12px; color:var(--text-primary); font-weight:bold; margin:0;">${pieceName}</p>
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
                            <p style="font-size:12px; color:var(--text-primary); font-weight:bold; margin:0;">${formatValueDisplay(sub.key, sub.value)}</p>
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
                return `<span style="color:#EE72F7; font-weight:bold;">${v}</span>${plus}`;
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
                        <p style="font-size:12px; color:var(--text-primary); font-weight:bold; margin:0;">${displayMax}${suffix}</p>
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
                        <p style="font-size:12px; color:var(--text-primary); font-weight:bold; overflow:hidden; text-overflow:ellipsis; margin:0;">${pieceName}</p>
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
                                    <span style="font-size: 13px; color: var(--accent-gold); font-weight: bold;">+${displayDelta}${suffix}</span>
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
            <h3 style="color:var(--text-primary); font-size:24px; margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
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
