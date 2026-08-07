// src/components/showcase/CombatStatsList.js
import { t } from '../../scripts/i18n.js';
import ICON_MAP from '../../data/icon_map.json';
import { formatStat } from '../../scripts/data.js';

export function createStatIcon(key) {
    const ICON_BASE_PATH = "./assets/simulator/icons/";
    const iconFile = ICON_MAP[key] || "icon_unknown.webp";
    return `<img src="${ICON_BASE_PATH}${iconFile}" style="width: 19px; height: 19px; object-fit: contain; vertical-align: middle; margin-right: 5px; display: inline-block; margin-bottom: 2px;" alt="${key}" decoding="async">`;
}

export function getStatBuffBreakdown(persoObj, statKey) {
    if (!persoObj || !persoObj.combatStats || !persoObj.buffedStats || !persoObj.buffs) return null;

    const baseStats = persoObj.baseStats || {};
    const combatStats = persoObj.combatStats || {};
    const buffedStats = persoObj.buffedStats || {};

    let statLabel = '';
    let statIcon = '';
    let initialValue = 0;
    let finalValue = 0;
    let isPct = false;
    let targetBonusKeys = [];

    if (statKey === 'hp') {
        statLabel = t('stat.hp');
        statIcon = createStatIcon('hp');
        initialValue = combatStats.hp || 0;
        finalValue = buffedStats.hp || 0;
        isPct = false;
        targetBonusKeys = ['hp', 'hp_'];
    } else if (statKey === 'atk') {
        statLabel = t('stat.atk');
        statIcon = createStatIcon('atk');
        initialValue = combatStats.atk || 0;
        finalValue = buffedStats.atk || 0;
        isPct = false;
        targetBonusKeys = ['atk', 'atk_'];
    } else if (statKey === 'def') {
        statLabel = t('stat.def');
        statIcon = createStatIcon('def');
        initialValue = combatStats.def || 0;
        finalValue = buffedStats.def || 0;
        isPct = false;
        targetBonusKeys = ['def', 'def_'];
    } else if (statKey === 'eleMas' || statKey === 'em') {
        statLabel = t('stat.eleMas');
        statIcon = createStatIcon('eleMas');
        initialValue = combatStats.em || combatStats.eleMas || 0;
        finalValue = buffedStats.em || buffedStats.eleMas || 0;
        isPct = false;
        targetBonusKeys = ['eleMas', 'em'];
    } else if (statKey === 'critRate_' || statKey === 'cr') {
        statLabel = t('stat.critRate_');
        statIcon = createStatIcon('critRate_');
        initialValue = combatStats.cr || 0;
        finalValue = buffedStats.cr || 0;
        isPct = true;
        targetBonusKeys = ['critRate_'];
    } else if (statKey === 'critDMG_' || statKey === 'cd') {
        statLabel = t('stat.critDMG_');
        statIcon = createStatIcon('critDMG_');
        initialValue = combatStats.cd || 0;
        finalValue = buffedStats.cd || 0;
        isPct = true;
        targetBonusKeys = ['critDMG_'];
    } else if (statKey === 'enerRech_' || statKey === 'er') {
        statLabel = t('stat.enerRech_');
        statIcon = createStatIcon('enerRech_');
        initialValue = combatStats.er || 0;
        finalValue = buffedStats.er || 0;
        isPct = true;
        targetBonusKeys = ['enerRech_'];
    } else if (statKey === 'heal_' || statKey === 'hb') {
        statLabel = t('stat.heal_');
        statIcon = createStatIcon('heal_');
        initialValue = combatStats.hb || 0;
        finalValue = buffedStats.hb || 0;
        isPct = true;
        targetBonusKeys = ['heal_'];
    } else if (statKey === 'elemental_dmg_' || statKey === 'dmgBonus' || (persoObj.buffedStats && statKey === persoObj.buffedStats.dmgBonusKey) || (typeof statKey === 'string' && statKey.endsWith('_dmg_'))) {
        const isNativeElem = (statKey === 'elemental_dmg_' || statKey === 'dmgBonus' || (persoObj.buffedStats && statKey === persoObj.buffedStats.dmgBonusKey));
        const targetDmgKey = isNativeElem ? (buffedStats.dmgBonusKey || combatStats.dmgBonusKey) : statKey;
        const currentVal = isNativeElem ? (buffedStats.dmgBonus || 0) : (buffedStats[targetDmgKey] || 0);
        const initialDmgVal = isNativeElem ? (combatStats.dmgBonus || 0) : (combatStats[targetDmgKey] || 0);
        const dmgStat = formatStat(targetDmgKey, currentVal / 100);
        statLabel = dmgStat.label;
        statIcon = dmgStat.icon;
        initialValue = initialDmgVal;
        finalValue = currentVal;
        isPct = true;
        if (isNativeElem) {
            targetBonusKeys = ['elemental_dmg_', 'dmgBonus', buffedStats.dmgBonusKey, combatStats.dmgBonusKey].filter(Boolean);
        } else {
            targetBonusKeys = [targetDmgKey];
        }
    } else {
        return null;
    }

    const contributingBuffs = [];

    persoObj.buffs.forEach((buff, bIndex) => {
        if (!buff.active || !buff.bonuses) return;

        let buffContributionGain = 0;
        let buffContributionDisplay = '';

        for (const [k, v] of Object.entries(buff.bonuses)) {
            if (typeof v === 'object' && k.endsWith('_scaling')) {
                const targetStatRaw = k.replace('_bonus_scaling', '');
                const normalizedTargetKey = targetStatRaw.endsWith('_') ? targetStatRaw : (targetStatRaw + '_');
                const isElementalMatch = (statKey === 'elemental_dmg_' || statKey === 'dmgBonus' || (buffedStats.dmgBonusKey && statKey === buffedStats.dmgBonusKey)) &&
                    (targetStatRaw === 'elemental_dmg' || targetStatRaw === 'elemental_dmg_' || targetStatRaw === buffedStats.dmgBonusKey || targetStatRaw.endsWith('_dmg_') || targetStatRaw.endsWith('_dmg'));
                const isSpecificDmgMatch = typeof statKey === 'string' && statKey.endsWith('_dmg_') &&
                    (normalizedTargetKey === statKey || targetStatRaw === 'elemental_dmg' || targetStatRaw === 'elemental_dmg_');

                const matches = (
                    (statKey === 'atk' && targetStatRaw.startsWith('atk')) ||
                    (statKey === 'hp' && targetStatRaw.startsWith('hp')) ||
                    (statKey === 'def' && targetStatRaw.startsWith('def')) ||
                    ((statKey === 'eleMas' || statKey === 'em') && (targetStatRaw === 'eleMas' || targetStatRaw === 'em')) ||
                    ((statKey === 'critRate_' || statKey === 'cr') && targetStatRaw === 'critRate_') ||
                    ((statKey === 'critDMG_' || statKey === 'cd') && targetStatRaw === 'critDMG_') ||
                    ((statKey === 'enerRech_' || statKey === 'er') && targetStatRaw === 'enerRech_') ||
                    isElementalMatch ||
                    isSpecificDmgMatch
                );

                if (matches) {
                    const sourceStatKey = (v.source === 'atk' || v.source === 'atk_') ? 'atk'
                        : (v.source === 'hp' || v.source === 'hp_') ? 'hp'
                            : (v.source === 'def' || v.source === 'def_') ? 'def'
                                : (v.source === 'eleMas') ? 'em'
                                    : (v.source === 'enerRech' || v.source === 'enerRech_') ? 'er'
                                        : v.source;
                    const rawValue = buffedStats[sourceStatKey] || 0;
                    const baseline = v.baseline || 0;
                    const sourceValue = Math.max(0, rawValue - baseline);
                    let bonusValue = sourceValue * v.percent;
                    if (v.max !== undefined) bonusValue = Math.min(bonusValue, v.max);

                    if (targetStatRaw === 'atk_' && baseStats.atk) {
                        const absGain = baseStats.atk * bonusValue;
                        buffContributionGain += absGain;
                        buffContributionDisplay = `+${(bonusValue * 100).toFixed(1)}% (+${Math.round(absGain)})`;
                    } else if (targetStatRaw === 'hp_' && baseStats.hp) {
                        const absGain = baseStats.hp * bonusValue;
                        buffContributionGain += absGain;
                        buffContributionDisplay = `+${(bonusValue * 100).toFixed(1)}% (+${Math.round(absGain)})`;
                    } else if (targetStatRaw === 'def_' && baseStats.def) {
                        const absGain = baseStats.def * bonusValue;
                        buffContributionGain += absGain;
                        buffContributionDisplay = `+${(bonusValue * 100).toFixed(1)}% (+${Math.round(absGain)})`;
                    } else if (isPct) {
                        const pctGain = bonusValue * 100;
                        buffContributionGain += pctGain;
                        buffContributionDisplay = `+${pctGain.toFixed(1)}%`;
                    } else {
                        buffContributionGain += bonusValue;
                        buffContributionDisplay = `+${Math.round(bonusValue)}`;
                    }
                }
            } else if (typeof v !== 'object') {
                const isTarget = targetBonusKeys.includes(k) || 
                    (k.endsWith('_dmg_') && (statKey === 'elemental_dmg_' || statKey === 'dmgBonus' || (buffedStats.dmgBonusKey && statKey === buffedStats.dmgBonusKey))) ||
                    (k === 'elemental_dmg_' && typeof statKey === 'string' && statKey.endsWith('_dmg_'));
                if (isTarget) {
                    if (k === 'atk_' && baseStats.atk) {
                        const absGain = baseStats.atk * v;
                        buffContributionGain += absGain;
                        buffContributionDisplay = `+${(v * 100).toFixed(1)}% (+${Math.round(absGain)})`;
                    } else if (k === 'hp_' && baseStats.hp) {
                        const absGain = baseStats.hp * v;
                        buffContributionGain += absGain;
                        buffContributionDisplay = `+${(v * 100).toFixed(1)}% (+${Math.round(absGain)})`;
                    } else if (k === 'def_' && baseStats.def) {
                        const absGain = baseStats.def * v;
                        buffContributionGain += absGain;
                        buffContributionDisplay = `+${(v * 100).toFixed(1)}% (+${Math.round(absGain)})`;
                    } else if (isPct) {
                        const pctGain = v * 100;
                        buffContributionGain += pctGain;
                        buffContributionDisplay = `+${pctGain.toFixed(1)}%`;
                    } else {
                        buffContributionGain += v;
                        buffContributionDisplay = `+${Math.round(v)}`;
                    }
                }
            }
        }

        if (buffContributionGain > 0 || buffContributionDisplay) {
            contributingBuffs.push({
                buffIndex: bIndex,
                name: buff.name,
                category: buff.category,
                displayValue: buffContributionDisplay,
                gain: buffContributionGain
            });
        }
    });

    const totalGain = finalValue - initialValue;

    return {
        statKey,
        statLabel,
        statIcon,
        initialValue,
        finalValue,
        totalGain,
        isPct,
        initialDisplay: isPct ? initialValue.toFixed(1) + '%' : Math.round(initialValue),
        finalDisplay: isPct ? finalValue.toFixed(1) + '%' : Math.round(finalValue),
        totalGainDisplay: isPct ? `+${totalGain.toFixed(1)}%` : `+${Math.round(totalGain)}`,
        buffs: contributingBuffs
    };
}

export function renderStatLine(iconHtml, label, value, isBuffed = false, statKey = null, charIndex = null) {
    const isBuffedClass = isBuffed ? 'is-buffed' : '';
    const hoverAttributes = (statKey !== null)
        ? `data-stat-key="${statKey}" data-char-index="${charIndex ?? ''}" onmouseenter="window.showCombatStatTooltip && window.showCombatStatTooltip(this, ${charIndex ?? 'null'}, '${statKey}')" onmouseleave="window.hideCombatStatTooltip && window.hideCombatStatTooltip()"`
        : '';

    return `
        <div class="stat-row ${isBuffedClass}" ${hoverAttributes} style="filter: none; justify-content: space-between; align-items: center; display: flex;">
            ${iconHtml}
            <p>${label}</p>
            <div class="dotted-line"></div>
            <p style="font-size: 14px; margin:0; ${isBuffed ? 'color: var(--accent-gold);' : ''}">${value}</p>
        </div>
    `;
}

export function renderBaseStatLine(iconHtml, label, value, statKey, charIndex = 0) {
    return `
        <div class="stat-row base-stat-row" 
             data-stat-key="${statKey}" 
             data-char-index="${charIndex}" 
             onmouseenter="window.showBaseStatTooltip && window.showBaseStatTooltip(this, ${charIndex}, '${statKey}')" 
             onmouseleave="window.hideBaseStatTooltip && window.hideBaseStatTooltip()" 
             style="filter: none; justify-content: space-between; align-items: center; display: flex;">
            ${iconHtml}
            <p>${label}</p>
            <div class="dotted-line"></div>
            <p style="font-size: 14px; margin:0;">${value}</p>
        </div>
    `;
}

export function renderBaseStatsList(persoObj, infoHeaderHtml = '', charIndex = 0) {
    if (!persoObj || !persoObj.combatStats) return '';
    const s = persoObj.combatStats;
    const dmgStat = formatStat(s.dmgBonusKey, s.dmgBonus / 100);

    return `
        <div class="showcase-area-base-stats" style="border-radius: 8px; transition: background-color 0.35s, box-shadow 0.25s, border-color 0.25s; box-shadow: rgb(0, 0, 0) 1px 1px 6px, rgba(255, 255, 255, 0.3) 0px 0px 2px inset; border: 1px solid rgba(255, 255, 255, 0.4); box-sizing: border-box;">
            ${infoHeaderHtml}
            <div>
                <p style="margin-left: 10px; margin-right: 10px; margin-bottom: 9px; font-size: 14px;">${t('ui.char.baseStats')}</p>
                <div class="showcase-base-stats-container" style="display: flex; flex-direction: column; gap: 9px; margin-left: 7px; margin-right: 10px; margin-bottom: 9px;">
                    ${renderBaseStatLine(createStatIcon('hp'), t('stat.hp'), Math.round(s.hp), 'hp', charIndex)}
                    ${renderBaseStatLine(createStatIcon('atk'), t('stat.atk'), Math.round(s.atk), 'atk', charIndex)}
                    ${renderBaseStatLine(createStatIcon('def'), t('stat.def'), Math.round(s.def), 'def', charIndex)}
                    ${renderBaseStatLine(createStatIcon('eleMas'), t('stat.eleMas'), Math.round(s.em || s.eleMas || 0), 'eleMas', charIndex)}
                    ${renderBaseStatLine(createStatIcon('critRate_'), t('stat.critRate_'), s.cr.toFixed(1) + '%', 'critRate_', charIndex)}
                    ${renderBaseStatLine(createStatIcon('critDMG_'), t('stat.critDMG_'), s.cd.toFixed(1) + '%', 'critDMG_', charIndex)}
                    ${renderBaseStatLine(createStatIcon('enerRech_'), t('stat.enerRech_'), s.er.toFixed(1) + '%', 'enerRech_', charIndex)}
                    ${renderBaseStatLine(createStatIcon('heal_'), t('stat.heal_'), (s.hb || 0).toFixed(1) + '%', 'heal_', charIndex)}
                    ${renderBaseStatLine(dmgStat.icon, dmgStat.label, s.dmgBonus.toFixed(1) + '%', 'dmgBonus', charIndex)}
                </div>
            </div>
        </div>
    `;
}

export function renderCombatStatsList(persoObj, charIndex = 0) {
    if (!persoObj || !persoObj.combatStats || !persoObj.buffedStats) return '';
    const s = persoObj.combatStats;
    const b = persoObj.buffedStats;

    let html = "";
    const dynamicDefs = [
        { wKey: 'hp', sKey: 'hp', icon: 'hp', label: t('stat.hp'), isPct: false },
        { wKey: 'atk', sKey: 'atk', icon: 'atk', label: t('stat.atk'), isPct: false },
        { wKey: 'def', sKey: 'def', icon: 'def', label: t('stat.def'), isPct: false }
    ];

    dynamicDefs.forEach(def => {
        const isHidden = persoObj.activeBuild && persoObj.activeBuild.hideUIStats && persoObj.activeBuild.hideUIStats.includes(def.wKey);
        const isForced = persoObj.activeBuild && persoObj.activeBuild.showUIStats && persoObj.activeBuild.showUIStats.includes(def.wKey);
        if ((persoObj.weights && persoObj.weights[def.wKey] > 0 && !isHidden) || isForced) {
            const val = b[def.sKey];
            const oldVal = s[def.sKey];
            const displayVal = def.isPct ? val.toFixed(1) + '%' : Math.round(val);
            const isBuffed = val > oldVal;
            html += renderStatLine(createStatIcon(def.icon), def.label, displayVal, isBuffed, def.sKey, charIndex);
        }
    });

    const fixedDefs = [
        { wKey: 'eleMas', sKey: 'em', icon: 'eleMas', label: t('stat.eleMas'), isPct: false },
        { wKey: 'critRate_', sKey: 'cr', icon: 'critRate_', label: t('stat.critRate_'), isPct: true },
        { wKey: 'critDMG_', sKey: 'cd', icon: 'critDMG_', label: t('stat.critDMG_'), isPct: true },
        { wKey: 'enerRech_', sKey: 'er', icon: 'enerRech_', label: t('stat.enerRech_'), isPct: true }
    ];

    fixedDefs.forEach(def => {
        const isHidden = persoObj.activeBuild && persoObj.activeBuild.hideUIStats && persoObj.activeBuild.hideUIStats.includes(def.wKey);
        if (!isHidden) {
            const val = b[def.sKey];
            const oldVal = s[def.sKey];
            const displayVal = def.isPct ? val.toFixed(1) + '%' : Math.round(val);
            const isBuffed = val > oldVal;
            html += renderStatLine(createStatIcon(def.icon), def.label, displayVal, isBuffed, def.wKey, charIndex);
        }
    });

    const isHealHidden = persoObj.activeBuild && persoObj.activeBuild.hideUIStats && persoObj.activeBuild.hideUIStats.includes("heal_");
    if (!isHealHidden) {
        const healVal = s.hb || 0;
        const isHealBuffed = (b.hb || 0) > (s.hb || 0);
        html += renderStatLine(createStatIcon('heal_'), t('stat.heal_'), ((isHealBuffed ? b.hb : healVal) || 0).toFixed(1) + '%', isHealBuffed, 'heal_', charIndex);
    }

    const isDmgHidden = persoObj.activeBuild && persoObj.activeBuild.hideUIStats && persoObj.activeBuild.hideUIStats.includes("elemental_dmg_");
    if (!isDmgHidden) {
        const dmgStat = formatStat(b.dmgBonusKey, b.dmgBonus / 100);
        const isDmgBuffed = b.dmgBonus > s.dmgBonus;
        html += renderStatLine(dmgStat.icon, dmgStat.label, b.dmgBonus.toFixed(1) + '%', isDmgBuffed, 'elemental_dmg_', charIndex);
    }

    if (persoObj.activeBuild && persoObj.activeBuild.showUIStats) {
        persoObj.activeBuild.showUIStats.forEach(forcedKey => {
            if (forcedKey.endsWith('_dmg_') && forcedKey !== b.dmgBonusKey && forcedKey !== 'elemental_dmg_') {
                const val = b[forcedKey] || 0;
                const oldVal = s[forcedKey] || 0;
                const isBuffed = val > oldVal;
                const statInfo = formatStat(forcedKey, val / 100);
                html += renderStatLine(statInfo.icon, statInfo.label, val.toFixed(1) + '%', isBuffed, forcedKey, charIndex);
            }
        });
    }

    return `
        <div class="showcase-area-combat-stats" style="border-radius: 8px; transition: background-color 0.35s, box-shadow 0.25s, border-color 0.25s; padding-left: 2px; padding-right: 2px; padding-bottom: 3px; box-shadow: rgb(0, 0, 0) 1px 1px 6px, rgba(255, 255, 255, 0.3) 0px 0px 2px inset; border: 1px solid rgba(255, 255, 255, 0.4); box-sizing: border-box;">
            <p style="margin-left: 10px; margin-right: 10px; margin-bottom: 9px; margin-top: 10px; font-size: 14px;">${t('ui.char.combatStats')}</p>
            <div style="display: flex; flex-direction: column; gap: 9px; margin-left: 7px; margin-right: 10px; margin-bottom: 4px;">
                ${html}
            </div>
        </div>
    `;
}

export function updateCombatStatsDOM(persoObj, charIndex = null) {
    const container = document.querySelector('.showcase-area-combat-stats');
    if (!container || !persoObj || !persoObj.combatStats || !persoObj.buffedStats) return;

    const s = persoObj.combatStats;
    const b = persoObj.buffedStats;

    const rows = container.querySelectorAll('.stat-row');
    let rowIndex = 0;

    const updateRow = (valStr, isBuffed, statKey) => {
        if (rows[rowIndex]) {
            const row = rows[rowIndex];
            const valP = row.querySelector('p:last-of-type');
            if (valP) {
                valP.textContent = valStr;
                valP.style.color = isBuffed ? 'var(--accent-gold)' : '';
            }
            if (isBuffed) {
                row.classList.add('is-buffed');
                row.style.cursor = 'pointer';
            } else {
                row.classList.remove('is-buffed');
                row.style.cursor = '';
            }
            if (statKey) {
                row.dataset.statKey = statKey;
            }
            if (charIndex !== null && charIndex !== undefined) {
                row.dataset.charIndex = charIndex;
            }
            rowIndex++;
        }
    };

    const dynamicDefs = [
        { wKey: 'hp', sKey: 'hp', isPct: false },
        { wKey: 'atk', sKey: 'atk', isPct: false },
        { wKey: 'def', sKey: 'def', isPct: false }
    ];

    dynamicDefs.forEach(def => {
        const isHidden = persoObj.activeBuild && persoObj.activeBuild.hideUIStats && persoObj.activeBuild.hideUIStats.includes(def.wKey);
        const isForced = persoObj.activeBuild && persoObj.activeBuild.showUIStats && persoObj.activeBuild.showUIStats.includes(def.wKey);
        if ((persoObj.weights && persoObj.weights[def.wKey] > 0 && !isHidden) || isForced) {
            const val = b[def.sKey];
            const oldVal = s[def.sKey];
            const displayVal = def.isPct ? val.toFixed(1) + '%' : Math.round(val);
            const isBuffed = val > oldVal;
            updateRow(displayVal, isBuffed, def.sKey);
        }
    });

    const fixedDefs = [
        { wKey: 'eleMas', sKey: 'em', isPct: false },
        { wKey: 'critRate_', sKey: 'cr', isPct: true },
        { wKey: 'critDMG_', sKey: 'cd', isPct: true },
        { wKey: 'enerRech_', sKey: 'er', isPct: true }
    ];

    fixedDefs.forEach(def => {
        const isHidden = persoObj.activeBuild && persoObj.activeBuild.hideUIStats && persoObj.activeBuild.hideUIStats.includes(def.wKey);
        if (!isHidden) {
            const val = b[def.sKey];
            const oldVal = s[def.sKey];
            const displayVal = def.isPct ? val.toFixed(1) + '%' : Math.round(val);
            const isBuffed = val > oldVal;
            updateRow(displayVal, isBuffed, def.wKey);
        }
    });

    const isHealHidden = persoObj.activeBuild && persoObj.activeBuild.hideUIStats && persoObj.activeBuild.hideUIStats.includes("heal_");
    if (!isHealHidden) {
        const healVal = s.hb || 0;
        const isHealBuffed = (b.hb || 0) > (s.hb || 0);
        updateRow(((isHealBuffed ? b.hb : healVal) || 0).toFixed(1) + '%', isHealBuffed, 'heal_');
    }

    const isDmgHidden = persoObj.activeBuild && persoObj.activeBuild.hideUIStats && persoObj.activeBuild.hideUIStats.includes("elemental_dmg_");
    if (!isDmgHidden) {
        const isDmgBuffed = b.dmgBonus > s.dmgBonus;
        updateRow(b.dmgBonus.toFixed(1) + '%', isDmgBuffed, 'elemental_dmg_');
    }

    if (persoObj.activeBuild && persoObj.activeBuild.showUIStats) {
        persoObj.activeBuild.showUIStats.forEach(forcedKey => {
            if (forcedKey.endsWith('_dmg_') && forcedKey !== b.dmgBonusKey && forcedKey !== 'elemental_dmg_') {
                const val = b[forcedKey] || 0;
                const oldVal = s[forcedKey] || 0;
                const isBuffed = val > oldVal;
                updateRow(val.toFixed(1) + '%', isBuffed, forcedKey);
            }
        });
    }
}

