// src/components/showcase/CharacterScoreBadge.js
import { t } from '../../scripts/i18n.js';

export function renderCharacterScoreBadge(evaluation) {
    if (!evaluation) return '';

    return `
        <div class="showcase-area-score" style="display: flex; flex-direction: column; gap: 6px; border-radius: 8px; transition: background-color 0.35s, box-shadow 0.25s, border-color 0.25s; padding: 10px 10px 8px 7px; box-shadow: rgb(0, 0, 0) 1px 1px 6px, rgba(255, 255, 255, 0.3) 0px 0px 2px inset; border: 2px solid ${evaluation.grade?.color || '#aaa'}; box-sizing: border-box;">
            <div class="stat-row" style="filter: none; justify-content: space-between; align-items: center; display: flex; box-sizing: border-box;">
                <div style="display:flex; align-items:center; gap:5px;">
                    <img src="./assets/simulator/icons/icon_score_white.webp" alt="Score" style="width: 19px; height: 19px; margin-bottom: 2px;">
                    <p style="margin:0; font-size:14px;">${t('ui.char.score')}</p>
                </div>
                <div class="dotted-line"></div> 
                <div style="display: flex; flex-direction: row; gap: 4px;">
                    <p style="color: ${evaluation.grade?.color || '#aaa'};">${evaluation.score}</p>
                    <p style="margin:0;">(${evaluation.grade?.letter || '?'})</p>
                </div>
            </div>
            <div class="stat-row" style="filter: none; justify-content: space-between; align-items: center; display: flex; box-sizing: border-box;">
                <p style="margin-left: 24px; margin-top:0; margin-bottom:0; font-size:14px;">${t('ui.char.totalRolls')}</p>
                <div class="dotted-line"></div> 
                <p>${evaluation.totalRolls}</p>
            </div>
        </div>
    `;
}
