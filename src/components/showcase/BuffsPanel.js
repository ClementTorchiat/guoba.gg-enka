// src/components/showcase/BuffsPanel.js
import { t } from '../../scripts/i18n.js';

export function renderBuffsPanel(persoObj, charIndex) {
    if (!persoObj || !persoObj.buffs || persoObj.buffs.length === 0) return '';

    let buffListHtml = "";
    const groupedBuffs = {};

    persoObj.buffs.forEach((buff, bIndex) => {
        if (!groupedBuffs[buff.category]) {
            groupedBuffs[buff.category] = [];
        }
        groupedBuffs[buff.category].push({ buff: buff, originalIndex: bIndex });
    });

    Object.keys(groupedBuffs).forEach(category => {
        let translatedCat = t('buff.category.' + category);
        let displayCategory = (translatedCat === 'buff.category.' + category) ? category : translatedCat;

        buffListHtml += `<div>`;
        buffListHtml += `
            <div style="font-size:12px; margin-bottom:6px; color:var(--text-always-white);">
                ${displayCategory}
            </div>`;

        buffListHtml += `<div style="display: flex; flex-direction: column; gap: 6px;">`;

        groupedBuffs[category].forEach(item => {
            const buff = item.buff;
            const bIndex = item.originalIndex;

            const textColor = buff.active ? 'var(--text-always-white)' : 'rgba(255,255,255,0.6)';
            const trackColor = buff.active ? 'rgb(from var(--char-hex) r g b / 0.6)' : 'rgba(255,255,255,0.2)';
            const knobColor = buff.active ? 'var(--text-always-white)' : 'rgba(255, 255, 255, 0.6)';
            const knobTransform = buff.active ? 'transform:translateX(14px);' : '';

            buffListHtml += `
                <div class="buff-row" data-buff-index="${bIndex}" style="display:flex; flex-direction: row; gap: 8px; align-items:center; justify-content:space-between; padding:6px 8px; background:rgba(0,0,0,0.2); border-radius:8px; box-sizing: border-box;">
                    <p style="font-size:12px; color:${textColor}; transition: color 0.3s; margin: 0; flex: 1; min-width: 0; word-break: break-word;">${buff.name}</p>
                    
                    <label class="switch" style="position:relative; display:inline-block; width:30px; min-width: 30px; height:16px; box-sizing: border-box; flex-shrink: 0;">
                        <input type="checkbox" ${buff.active ? 'checked' : ''} onchange="toggleBuff(${charIndex}, ${bIndex})" style="opacity:0; width:0; height:0;">
                        <span style="position:absolute; cursor:pointer; top:0; left:0; right:0; bottom:0; background:${trackColor}; transition:.4s; border-radius:34px; width: 100%;"></span>
                        <span style="position:absolute; content:''; border-radius:50%; height:12px; width:12px; left:2px; bottom:2px; background-color:${knobColor}; transition:.4s; ${knobTransform} box-shadow: 0 1px 3px rgba(0,0,0,0.4);"></span>
                    </label>
                </div>
            `;
        });

        buffListHtml += `</div></div>`;
    });

    return `
        <div class="card buffs-card" style="width: 240px; min-width: 240px; height: 280px; border: 1px solid rgba(255, 255, 255, 0.4); transition: background-color 0.35s, box-shadow 0.25s, border-color 0.25s; border-radius: 8px; box-shadow: rgb(0, 0, 0) 1px 1px 6px, rgba(255, 255, 255, 0.3) 0px 0px 2px inset;">
            <div class="card-container" style="height: 100%; padding: 12px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: flex-start; align-items: stretch;">
                <div style="font-size:14px; flex-shrink: 0;">
                    <p style="margin-bottom: 2px; margin-top:0;">${t('ui.char.buffsTitle')}</p>
                    <p style="font-size: 12px; color: rgba(255, 255, 255, 0.4); margin:0;">${t('ui.char.buffsHint')}</p>
                </div>
                <div class="card-divider" style="flex-shrink: 0; margin: 9px 0px; display: flex; clear: both; width: 100%; box-sizing: border-box; color: var(--dotted-line); border-width: 1px 0 0; border-color: var(--dotted-line); border-block-start: 1px solid var(--dotted-line);"></div>
                <div class="card-buff-list-container" style="overflow-y: auto; position: relative; flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 9px;">
                    ${buffListHtml}
                </div>
            </div>
        </div>
    `;
}

export function updateBuffsPanelDOM(persoObj) {
    const container = document.querySelector('.equipment-area .card-buff-list-container');
    if (!container || !persoObj || !persoObj.buffs) return;

    persoObj.buffs.forEach((buff, bIndex) => {
        const row = container.querySelector(`.buff-row[data-buff-index="${bIndex}"]`);
        if (row) {
            const nameP = row.querySelector('p');
            const input = row.querySelector('input[type="checkbox"]');
            const spans = row.querySelectorAll('.switch > span');
            const trackSpan = spans[0];
            const knobSpan = spans[1];

            if (nameP) nameP.style.color = buff.active ? 'var(--text-always-white)' : 'rgba(255,255,255,0.6)';
            if (input) input.checked = !!buff.active;
            if (trackSpan) trackSpan.style.backgroundColor = buff.active ? 'rgb(from var(--char-hex) r g b / 0.6)' : 'rgba(255,255,255,0.2)';
            if (knobSpan) {
                knobSpan.style.backgroundColor = buff.active ? 'var(--text-always-white)' : 'rgba(255, 255, 255, 0.6)';
                knobSpan.style.transform = buff.active ? 'translateX(14px)' : '';
            }
        }
    });
}
