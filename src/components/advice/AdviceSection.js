// src/components/advice/AdviceSection.js
import { renderScoreSection } from './ScoreSection.js';
import { renderCombatStatsSection } from './CombatStatsSection.js';
import { renderProgressionSection } from './ProgressionSection.js';
import { renderSubstatQualitySection } from './SubstatQualitySection.js';
import { renderRollDetailsSection } from './RollDetailsSection.js';
import { renderRerollSection } from './RerollSection.js';

export function renderAdviceSection(persoObj, config, charIndex = 0) {
    if (!persoObj) return '';

    const effectiveConfig = config || { ...(persoObj.charConfig || {}), ...(persoObj.activeBuild || {}) };

    const dottedDivider = `
        <div style="margin: auto 10px; flex-grow: 1; width: unset; min-width: unset; background: none; border-color: var(--dotted-line); border-style: dashed; border-width: 1px 0 0; display: flex; clear: both;"></div>
    `;

    return ` 
        <div style="width: 100%;">
            <div style="display: flex; flex-direction: column; gap: 40px;">
                ${renderScoreSection(persoObj, effectiveConfig)}
                
                ${dottedDivider}
                
                ${renderCombatStatsSection(persoObj, effectiveConfig)}
                
                ${dottedDivider}
                
                ${renderProgressionSection(persoObj, effectiveConfig, charIndex)}
                
                ${dottedDivider}
                
                ${renderRollDetailsSection(persoObj)}
                
                ${dottedDivider}
                
                ${renderSubstatQualitySection(persoObj, effectiveConfig)}
                
                ${dottedDivider}
                
                ${renderRerollSection(persoObj, effectiveConfig)}
            </div>
        </div>
    `;
}

export default renderAdviceSection;
