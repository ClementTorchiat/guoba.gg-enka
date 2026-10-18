// src/components/showcase/ArtifactCard.js
import { t } from '../../scripts/i18n.js';
import ICON_MAP from '../../data/icon_map.json';
import { formatValueDisplay } from '../../scripts/data.js';

export function renderArtifactCard(art, weights = {}, charIndex = 0, artIndex = 0) {
    if (!art) return '';
    const ICON_BASE_PATH = "/assets/simulator/icons/";
    let subsHtml = "";

    let critRate = 0;
    let critDmg = 0;

    (art.subStats || []).forEach((sub, subIndex) => {
        if (sub.key === 'critRate_') critRate = sub.value || 0;
        if (sub.key === 'critDMG_') critDmg = sub.value || 0;
        let w = weights[sub.key];
        if (w === undefined && sub.key.includes("dmg_")) w = weights["elemental_dmg_"] || 0;
        if (w === undefined) w = 0;
        const isDead = w === 0;
        const rolls = (typeof window !== 'undefined' && window.getRollCount)
            ? window.getRollCount(sub.key, sub.value, art.stars || 5)
            : 1;

        subsHtml += `
            <div style="color: var(--text-always-white); display: flex; justify-content: space-between; align-items: center;" 
                 class="substat-row ${isDead ? 'dead' : ''}"
                 data-char-index="${charIndex}"
                 data-art-index="${artIndex}"
                 data-sub-index="${subIndex}"
                 data-stat-key="${sub.key}"
                 onmouseenter="window.showArtifactStatTooltip && window.showArtifactStatTooltip(this, ${charIndex}, ${artIndex}, ${subIndex})"
                 onmouseleave="window.hideArtifactStatTooltip && window.hideArtifactStatTooltip()">
                <div style="display:flex; flex-direction: row; align-items:center; gap:5px;">
                    <img src="${ICON_BASE_PATH}${ICON_MAP[sub.key] || ICON_MAP['unknown']}" style="width: 17px; height: 17px;" alt="${sub.key}" decoding="async">
                    <p style="font-size: 12px; margin:0;">${sub.label}</p>
                    ${rolls > 0 ? `
                        <div class="substat-rolls-indicator" style="display: flex; gap: 3px; align-items: center;">
                            ${Array(rolls).fill('').map(() => `
                                <div style="width: 2px; height: 2px; border-radius: 100%; background-color: rgba(255, 255, 255, 0.6);"></div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
                <p style="font-size: 12px; margin:0;">${formatValueDisplay(sub.key, sub.value)}</p>
            </div>
        `;
    });

    const pieceName = t('artifact.' + art.type);

    return `
        <div class="card artifact-card" style="width: 240px; min-width: 240px; height: 280px; border: 1px solid var(--char-card-border, rgba(255, 255, 255, 0.4)); transition: background-color 0.35s, box-shadow 0.25s, border-color 0.25s; border-radius: 8px; box-shadow: rgb(0, 0, 0) 1px 1px 6px, rgba(255, 255, 255, 0.3) 0px 0px 2px inset;">
            <div class="card-container" style="padding: 12px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; align-items: stretch; height: 100%;">
                
                <div class="item-header" style="height: 50px; display: flex; flex-direction: row; align-items: center; gap: 12px;">
                    <div style="position:relative; display:inline-block; flex-shrink: 0;">
                        <img src="${art.icon}" class="item-img" style="border: 2px solid ${art.stars === 5 ? '#FFB13B' : art.stars === 4 ? '#a855f7' : '#6b7280'}; object-fit:cover;" alt="${pieceName || t('artifact.default')}" crossorigin="anonymous" decoding="async">
                        <p style="position:absolute; bottom:7px; right:1px; background:rgba(0, 0, 0, 0.4); color:rgba(255, 255, 255, 0.8); font-size:11px; padding: 1px 5px 1px 4px; border-radius:8px;">+${art.level}</p>
                    </div>
                    <div style="overflow:hidden; display:flex; flex-direction:column; justify-content:center;">
                        <p style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-size:14px;">${pieceName}</p>
                        <p class="artifact-set-name" style="font-size:12px; color:var(--accent-gold); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin:0;">${art.setName}</p>
                        <div style="font-size:11px; color: rgba(255, 255, 255, 0.4); display: flex; flex-direction: row; align-items: center; gap: 4px;">
                            <p style="margin:0;">${art.stars}★</p>
                        </div>
                    </div>
                </div>
                
                <div class="card-divider" style="margin: 8px 0px; display: flex; clear: both; width: 100%; box-sizing: border-box; color: var(--dotted-line); border-width: 1px 0 0; border-color: var(--dotted-line); border-block-start: 1px solid var(--dotted-line);"></div>
                
                <div class="main-stat-display" data-stat-key="${art.mainStat?.key || ''}" style="display: flex; flex-direction: row; justify-content:space-between; align-items: center;">
                    <div style="display:flex; align-items:center; gap:5px; font-size:0.7rem; color:var(--text-grey); font-weight:normal;">
                        <img src="${ICON_BASE_PATH}${ICON_MAP[art.mainStat?.key] || ICON_MAP['unknown']}" style="width: 17px; height: 17px; margin-bottom: 1px;" alt="${art.mainStat?.key}" decoding="async">
                        <p style="font-size: 12px; color: var(--text-always-white); margin:0;">${art.mainStat?.label}</p>
                    </div>
                    <p style="font-size: 12px; color: var(--text-always-white); font-weight:normal; margin:0;">${formatValueDisplay(art.mainStat?.key, art.mainStat?.value)}</p>
                </div>
                
                <div class="card-divider" style="margin: 8px 0px; display: flex; clear: both; width: 100%; box-sizing: border-box; color: var(--dotted-line); border-width: 1px 0 0; border-color: var(--dotted-line); border-block-start: 1px solid var(--dotted-line);"></div>
                
                <div style="display: flex; flex-direction: column; gap: 5px;">${subsHtml}</div>
                
                <div class="card-divider" style="margin: 8px 0px; display: flex; clear: both; width: 100%; box-sizing: border-box; color: var(--dotted-line); border-width: 1px 0 0; border-color: var(--dotted-line); border-block-start: 1px solid var(--dotted-line);"></div>
                
                <div style="font-size: 12px; display:flex; justify-content:space-between; align-items: center;${art.rawScore ? ' cursor: pointer;' : ''}" class="art-score-footer"
                     ${art.rawScore ? `onmouseenter="window.showArtifactScoreTooltip && window.showArtifactScoreTooltip(this, ${charIndex}, ${artIndex})" onmouseleave="window.hideArtifactScoreTooltip && window.hideArtifactScoreTooltip()"` : ''}>
                    
                    <!-- Mode Score (défaut) -->
                    <div class="art-footer-score" style="display:flex; justify-content:space-between; align-items: center; width: 100%;">
                        <div style="display:flex; align-items:center; gap: 5px;">
                            <img src="/assets/simulator/icons/icon_score_white.webp" style="width: 19px; height: 19px;" alt="Score" decoding="async">
                            <p style="margin:0;">${t('ui.char.score')}</p>
                        </div>
                        <div style="display: flex; flex-direction: row; gap: 4px;">
                            <p style="margin:0;">${(art.stars || 5) < 4 ? '—' : art.score}</p>
                            <p style="margin:0;">(${art.grade?.letter || '?'})</p>
                        </div>
                    </div>

                    <!-- Mode Crit Value (alternative) -->
                    <div class="art-footer-cv" style="display:flex; justify-content:space-between; align-items: center; width: 100%;">
                        <div style="display:flex; align-items:center; gap: 5px;">
                            <img src="/assets/simulator/icons/icon_crit_rate.webp" style="width: 19px; height: 19px;" alt="Crit Value" decoding="async">
                            <p style="margin:0;">${t('custom.artscore.cv')}</p>
                        </div>
                        <div style="display: flex; flex-direction: row; gap: 4px;">
                            <p style="margin:0;">${((critRate * 2) + critDmg).toFixed(1)}</p>
                            <p style="margin:0; opacity: 0.6;">CV</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
