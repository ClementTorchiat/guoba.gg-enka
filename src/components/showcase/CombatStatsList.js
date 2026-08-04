// src/components/showcase/CombatStatsList.js
import { t } from '../../scripts/i18n.js';
import ICON_MAP from '../../data/icon_map.json';
import { formatStat } from '../../scripts/data.js';

export function createStatIcon(key) {
    const ICON_BASE_PATH = "./assets/simulator/icons/";
    const iconFile = ICON_MAP[key] || "icon_unknown.webp";
    return `<img src="${ICON_BASE_PATH}${iconFile}" style="width: 19px; height: 19px; object-fit: contain; vertical-align: middle; margin-right: 5px; display: inline-block; margin-bottom: 2px;" alt="${key}">`;
}

export function renderStatLine(iconHtml, label, value, isBuffed = false) {
    return `
        <div class="stat-row" style="filter: none; justify-content: space-between; align-items: center; display: flex; box-sizing: border-box;">
            ${iconHtml}
            <p>${label}</p>
            <div class="dotted-line"></div>
            <p style="font-size: 14px; margin:0; ${isBuffed ? 'color: var(--accent-gold);' : ''}">${value}</p>
        </div>
    `;
}

export function renderBaseStatsList(persoObj, infoHeaderHtml = '') {
    if (!persoObj || !persoObj.combatStats) return '';
    const s = persoObj.combatStats;
    const dmgStat = formatStat(s.dmgBonusKey, s.dmgBonus / 100);

    return `
        <div class="showcase-area-base-stats" style="border-radius: 8px; transition: background-color 0.35s, box-shadow 0.25s, border-color 0.25s; box-shadow: rgb(0, 0, 0) 1px 1px 6px, rgba(255, 255, 255, 0.3) 0px 0px 2px inset; border: 1px solid rgba(255, 255, 255, 0.4); box-sizing: border-box;">
            ${infoHeaderHtml}
            <div>
                <p style="margin-left: 10px; margin-right: 10px; margin-bottom: 9px; font-size: 14px;">${t('ui.char.baseStats')}</p>
                <div class="showcase-base-stats-container" style="display: flex; flex-direction: column; gap: 9px; margin-left: 7px; margin-right: 10px; margin-bottom: 9px;">
                    ${renderStatLine(createStatIcon('hp'), t('stat.hp'), Math.round(s.hp))}
                    ${renderStatLine(createStatIcon('atk'), t('stat.atk'), Math.round(s.atk))}
                    ${renderStatLine(createStatIcon('def'), t('stat.def'), Math.round(s.def))}
                    ${renderStatLine(createStatIcon('eleMas'), t('stat.eleMas'), Math.round(s.em || s.eleMas || 0))}
                    ${renderStatLine(createStatIcon('critRate_'), t('stat.critRate_'), s.cr.toFixed(1) + '%')}
                    ${renderStatLine(createStatIcon('critDMG_'), t('stat.critDMG_'), s.cd.toFixed(1) + '%')}
                    ${renderStatLine(createStatIcon('enerRech_'), t('stat.enerRech_'), s.er.toFixed(1) + '%')}
                    ${renderStatLine(createStatIcon('heal_'), t('stat.heal_'), (s.hb || 0).toFixed(1) + '%')}
                    ${renderStatLine(dmgStat.icon, dmgStat.label, s.dmgBonus.toFixed(1) + '%')}
                </div>
            </div>
        </div>
    `;
}

export function renderCombatStatsList(persoObj) {
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
            html += renderStatLine(createStatIcon(def.icon), def.label, displayVal, isBuffed);
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
            html += renderStatLine(createStatIcon(def.icon), def.label, displayVal, isBuffed);
        }
    });

    const isHealHidden = persoObj.activeBuild && persoObj.activeBuild.hideUIStats && persoObj.activeBuild.hideUIStats.includes("heal_");
    if (!isHealHidden) {
        const healVal = s.hb || 0;
        html += renderStatLine(createStatIcon('heal_'), t('stat.heal_'), healVal.toFixed(1) + '%', false);
    }

    const isDmgHidden = persoObj.activeBuild && persoObj.activeBuild.hideUIStats && persoObj.activeBuild.hideUIStats.includes("elemental_dmg_");
    if (!isDmgHidden) {
        const dmgStat = formatStat(b.dmgBonusKey, b.dmgBonus / 100);
        const isDmgBuffed = b.dmgBonus > s.dmgBonus;
        html += renderStatLine(dmgStat.icon, dmgStat.label, b.dmgBonus.toFixed(1) + '%', isDmgBuffed);
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

export function updateCombatStatsDOM(persoObj) {
    const container = document.querySelector('.showcase-area-combat-stats');
    if (!container || !persoObj || !persoObj.combatStats || !persoObj.buffedStats) return;

    const s = persoObj.combatStats;
    const b = persoObj.buffedStats;

    const rows = container.querySelectorAll('.stat-row');
    let rowIndex = 0;

    const updateRow = (valStr, isBuffed) => {
        if (rows[rowIndex]) {
            const valP = rows[rowIndex].querySelector('p:last-of-type');
            if (valP) {
                valP.textContent = valStr;
                valP.style.color = isBuffed ? 'var(--accent-gold)' : '';
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
            updateRow(displayVal, isBuffed);
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
            updateRow(displayVal, isBuffed);
        }
    });

    const isHealHidden = persoObj.activeBuild && persoObj.activeBuild.hideUIStats && persoObj.activeBuild.hideUIStats.includes("heal_");
    if (!isHealHidden) {
        const healVal = s.hb || 0;
        updateRow(healVal.toFixed(1) + '%', false);
    }

    const isDmgHidden = persoObj.activeBuild && persoObj.activeBuild.hideUIStats && persoObj.activeBuild.hideUIStats.includes("elemental_dmg_");
    if (!isDmgHidden) {
        const isDmgBuffed = b.dmgBonus > s.dmgBonus;
        updateRow(b.dmgBonus.toFixed(1) + '%', isDmgBuffed);
    }
}
