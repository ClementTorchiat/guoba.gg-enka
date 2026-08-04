// src/components/showcase/TalentsList.js
import { t } from '../../scripts/i18n.js';

export function renderTalentsList(talents) {
    if (!talents || talents.length === 0) return '';

    let talentsHtml = `<div style="display:flex; justify-content:space-between; margin-left: 3px; margin-right: 3px;">`;
    talents.forEach(talent => {
        talentsHtml += `
            <div style="width:64px; height:64px; background-color: rgba(0, 0, 0, 0.2); border-radius:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; position:relative; border:1px solid rgba(255, 255, 255, 0.4); margin-bottom: 11px;">
                <img src="${talent.icon}" style="width:60px; height:60px;" alt="${t('ui.char.skills')}">
                <div style="position:absolute; bottom:-10px; background-color: rgb(from var(--char-hex) calc(r / 3.5) calc(g / 3.5) calc(b / 3.5)); padding:2px 6px; border-radius:100%; font-size:10px;">${talent.level}</div>
            </div>`;
    });
    talentsHtml += `</div>`;

    return `
        <div class="showcase-area-skills" style="border-radius: 8px; transition: background-color 0.35s, box-shadow 0.25s, border-color 0.25s; padding: 10px; box-shadow: rgb(0, 0, 0) 1px 1px 6px, rgba(255, 255, 255, 0.3) 0px 0px 2px inset; border: 1px solid rgba(255, 255, 255, 0.4); box-sizing: border-box;">
            <p style="margin-bottom: 9px; font-size: 14px;">${t('ui.char.skills')}</p>
            ${talentsHtml}
        </div>
    `;
}
