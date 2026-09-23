// src/components/showcase/SpiderChart.js
import { t } from '../../scripts/i18n.js';

if (typeof window !== 'undefined') {
    window.showSpiderStatTooltip = function(element) {
        if (!element) return;
        const type = element.dataset.type;
        const label = element.dataset.label;
        const val = element.dataset.val;

        let tooltip = document.getElementById('combat-stat-tooltip');
        if (!tooltip) return;

        const showcaseWrapper = element.closest('.showcase-wrapper');
        const charHex = (showcaseWrapper && showcaseWrapper.style.getPropertyValue('--char-hex'))
            || getComputedStyle(element).getPropertyValue('--char-hex')
            || 'var(--accent-gold)';
        tooltip.style.setProperty('--char-hex', charHex);

        const typeLabel = type === 'base' ? 'Stat de base' : type === 'combat' ? 'Stat de combat' : 'Stat de base & combat';

        tooltip.innerHTML = `
            <div class="stat-tooltip-content">
                <div style="font-weight: 600; color: rgba(255, 255, 255, 0.7); font-size: 11px; padding-bottom: 6px; white-space: nowrap;">
                    ${typeLabel}
                </div>
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 18px; border-top: 1px solid rgba(255, 255, 255, 0.15); padding-top: 6px;">
                    <span style="color: var(--text-always-white); font-weight: bold; font-size: 12px; white-space: nowrap;">${label}</span>
                    <span style="color: var(--text-always-white); font-weight: bold; font-size: 13px; white-space: nowrap; font-family: 'ShinShin', sans-serif;">${val}</span>
                </div>
            </div>
        `;

        const rect = element.getBoundingClientRect();
        
        tooltip.style.visibility = 'hidden';
        tooltip.style.display = 'block';
        tooltip.style.transform = 'none';
        tooltip.style.pointerEvents = 'none';
        
        const tipRect = tooltip.getBoundingClientRect();
        
        let left = rect.left + rect.width / 2;
        const padding = 10;
        if (left - tipRect.width / 2 < padding) {
            left = tipRect.width / 2 + padding;
        } else if (left + tipRect.width / 2 > window.innerWidth - padding) {
            left = window.innerWidth - tipRect.width / 2 - padding;
        }
        
        tooltip.style.left = left + 'px';
        
        const spaceAbove = rect.top;
        if (spaceAbove > tipRect.height + 20) {
            tooltip.style.top = (rect.top - 8) + 'px';
            tooltip.style.transform = 'translate(-50%, -100%) scale(1)';
        } else {
            tooltip.style.top = (rect.bottom + 8) + 'px';
            tooltip.style.transform = 'translate(-50%, 0) scale(1)';
        }

        tooltip.style.visibility = 'visible';
        tooltip.style.opacity = '1';
    };

    window.hideSpiderStatTooltip = function() {
        const tooltip = document.getElementById('combat-stat-tooltip');
        if (tooltip) {
            tooltip.style.visibility = 'hidden';
            tooltip.style.opacity = '0';
        }
    };
}

function formatSpiderValue(key, val) {
    if (['cr', 'cd', 'er', 'dmg', 'hb'].includes(key)) {
        return (val).toFixed(1).replace(/\.0$/, '') + '%';
    }
    return Math.round(val).toLocaleString('en-US').replace(/,/g, ' ');
}

export function getSpiderChartAxes(persoObj) {
    if (!persoObj || !persoObj.combatStats || !persoObj.buffedStats) return [];

    const s = persoObj.combatStats;
    const b = persoObj.buffedStats;
    const axes = [];

    // Always present
    axes.push({ key: 'cr', label: t('ui.char.spider.stat.cr'), base: s.cr || 0, buffed: b.cr || 0 });
    axes.push({ key: 'cd', label: t('ui.char.spider.stat.cd'), base: s.cd || 0, buffed: b.cd || 0 });
    axes.push({ key: 'er', label: t('ui.char.spider.stat.er'), base: s.er || 0, buffed: b.er || 0 });
    axes.push({ key: 'em', label: t('ui.char.spider.stat.em'), base: s.em || s.eleMas || 0, buffed: b.em || b.eleMas || 0 });

    // Scaling stats
    const scalingKeys = ['atk', 'hp', 'def'];
    let hasScaling = false;
    scalingKeys.forEach(k => {
        const isHidden = persoObj.activeBuild && persoObj.activeBuild.hideUIStats && persoObj.activeBuild.hideUIStats.includes(k);
        const isForced = persoObj.activeBuild && persoObj.activeBuild.showUIStats && persoObj.activeBuild.showUIStats.includes(k);
        if ((persoObj.weights && persoObj.weights[k] > 0 && !isHidden) || isForced) {
            axes.push({ key: k, label: t(`ui.char.spider.stat.${k}`), base: s[k] || 0, buffed: b[k] || 0 });
            hasScaling = true;
        }
    });

    if (!hasScaling) {
        axes.push({ key: 'atk', label: t('ui.char.spider.stat.atk'), base: s.atk || 0, buffed: b.atk || 0 });
    }

    // DMG Bonus or Heal Bonus
    let dmgBonusKey = b.dmgBonusKey || s.dmgBonusKey;
    let bDmg = b.dmgBonus || 0;
    let sDmg = s.dmgBonus || 0;
    let bHeal = b.hb || 0;
    let sHeal = s.hb || 0;

    if (bDmg > 0 || sDmg > 0) {
        let label = '';
        if (dmgBonusKey === 'physical_dmg_') label = t('ui.char.spider.stat.phys');
        else if (dmgBonusKey.startsWith('pyro')) label = t('ui.char.spider.stat.pyro');
        else if (dmgBonusKey.startsWith('hydro')) label = t('ui.char.spider.stat.hydro');
        else if (dmgBonusKey.startsWith('dendro')) label = t('ui.char.spider.stat.dendro');
        else if (dmgBonusKey.startsWith('electro')) label = t('ui.char.spider.stat.electro');
        else if (dmgBonusKey.startsWith('anemo')) label = t('ui.char.spider.stat.anemo');
        else if (dmgBonusKey.startsWith('cryo')) label = t('ui.char.spider.stat.cryo');
        else if (dmgBonusKey.startsWith('geo')) label = t('ui.char.spider.stat.geo');

        axes.push({ key: 'dmg', label: label, base: sDmg, buffed: bDmg });
    } else if (bHeal > 0 || sHeal > 0) {
        axes.push({ key: 'hb', label: t('ui.char.spider.stat.heal'), base: sHeal, buffed: bHeal });
    }

    return axes;
}

export function renderSpiderChartContent(persoObj) {
    const axes = getSpiderChartAxes(persoObj);
    if (axes.length === 0) return '';

    const N = axes.length;
    const size = 240;
    const R = 72;
    const center = { x: size / 2, y: 180 };

    let bgLines = '';
    let webLevels = '';
    let labels = '';
    let buffedPoints = [];
    let basePoints = [];
    let baseCircles = '';
    let buffedCircles = '';

    // Helper to calculate coordinates
    const getPoint = (radius, angle) => {
        return {
            x: center.x + radius * Math.cos(angle),
            y: center.y + radius * Math.sin(angle)
        };
    };

    // Draw concentric polygons for the web (25%, 50%, 75%, 100%)
    for (let level = 1; level <= 4; level++) {
        const levelRadius = (R * level) / 4;
        let points = [];
        for (let i = 0; i < N; i++) {
            const angle = -Math.PI / 2 + (Math.PI * 2 * i) / N;
            const pt = getPoint(levelRadius, angle);
            points.push(`${pt.x},${pt.y}`);
        }
        webLevels += `<polygon points="${points.join(' ')}" fill="none" stroke="rgba(255, 255, 255, 0.15)" stroke-width="1" />`;
    }

    // Calculate axes, labels and data polygons
    for (let i = 0; i < N; i++) {
        const angle = -Math.PI / 2 + (Math.PI * 2 * i) / N;
        const outerPt = getPoint(R, angle);
        const axis = axes[i];

        // Lines from center to edges
        bgLines += `<line x1="${center.x}" y1="${center.y}" x2="${outerPt.x}" y2="${outerPt.y}" stroke="rgba(255, 255, 255, 0.15)" stroke-width="1" />`;

        // Labels
        const labelPt = getPoint(R + 22, angle);
        labels += `<text x="${labelPt.x}" y="${labelPt.y}" fill="rgba(255, 255, 255, 0.7)" font-size="12" font-weight="600" text-anchor="middle" dominant-baseline="middle" style="pointer-events: none;">${axis.label}</text>`;

        // Combat stat forms the outer colored polygon (100% radius)
        buffedPoints.push(`${outerPt.x},${outerPt.y}`);

        // Base stat forms the inner hatched polygon
        const maxValue = Math.max(axis.buffed, 0.0001);
        const ratio = Math.max(0, Math.min(1, axis.base / maxValue));
        const basePt = getPoint(R * ratio, angle);
        basePoints.push(`${basePt.x},${basePt.y}`);

        const baseValStr = formatSpiderValue(axis.key, axis.base);
        const buffedValStr = formatSpiderValue(axis.key, axis.buffed);
        const isSame = Math.abs(axis.buffed - axis.base) < 0.0001;
        const displayStyle = isSame ? 'display: none;' : '';

        baseCircles += `<circle id="spider-base-pt-${i}" cx="${basePt.x}" cy="${basePt.y}" r="3.5" fill="#fff" stroke="transparent" stroke-width="0" style="${displayStyle} transition: all 0.3s ease-out; cursor: pointer; pointer-events: auto;" data-type="base" data-label="${axis.label}" data-val="${baseValStr}" onmouseenter="window.showSpiderStatTooltip && window.showSpiderStatTooltip(this)" onmouseleave="window.hideSpiderStatTooltip && window.hideSpiderStatTooltip()" />`;
        buffedCircles += `<circle id="spider-buffed-pt-${i}" cx="${outerPt.x}" cy="${outerPt.y}" r="4.5" fill="var(--char-hex)" stroke="#fff" stroke-width="1.5" style="transition: all 0.3s ease-out; cursor: pointer; pointer-events: auto;" data-type="${isSame ? 'both' : 'combat'}" data-label="${axis.label}" data-val="${buffedValStr}" onmouseenter="window.showSpiderStatTooltip && window.showSpiderStatTooltip(this)" onmouseleave="window.hideSpiderStatTooltip && window.hideSpiderStatTooltip()" />`;
    }

    return `
        <svg id="spider-chart-svg" width="100%" height="100%" viewBox="0 0 ${size} 280" style="position: absolute; top: 0; left: 0; pointer-events: none;">
            <defs>
                <pattern id="hatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(255, 255, 255, 0.3)" stroke-width="1.5" />
                </pattern>
            </defs>
            
            <!-- Web Background -->
            ${webLevels}
            ${bgLines}
            
            <!-- Colored Zone (Combat Stats / Buffed) -->
            <polygon id="spider-buffed-polygon" points="${buffedPoints.join(' ')}" fill="rgba(from var(--char-hex) r g b / 0.55)" stroke="var(--char-hex)" stroke-width="2" style="transition: all 0.3s ease-out; pointer-events: none;" />
            
            <!-- Hatched Zone (Base Stats) -->
            <polygon id="spider-base-polygon" points="${basePoints.join(' ')}" fill="url(#hatch)" stroke="rgba(255, 255, 255, 0.8)" stroke-width="1" stroke-dasharray="2,2" style="transition: all 0.3s ease-out; pointer-events: none;" />
            
            <!-- Labels -->
            ${labels}

            <!-- Interactive Points -->
            ${buffedCircles}
            ${baseCircles}
        </svg>
    `;
}

export function updateSpiderChartDOM(persoObj) {
    const svg = document.getElementById('spider-chart-svg');
    if (!svg) return;

    const axes = getSpiderChartAxes(persoObj);
    if (axes.length === 0) return;

    const N = axes.length;
    const size = 240;
    const R = 72;
    const center = { x: size / 2, y: 180 };

    let basePoints = [];

    const getPoint = (radius, angle) => {
        return {
            x: center.x + radius * Math.cos(angle),
            y: center.y + radius * Math.sin(angle)
        };
    };

    for (let i = 0; i < N; i++) {
        const angle = -Math.PI / 2 + (Math.PI * 2 * i) / N;
        const axis = axes[i];

        const maxValue = Math.max(axis.buffed, 0.0001);
        const ratio = Math.max(0, Math.min(1, axis.base / maxValue));
        const basePt = getPoint(R * ratio, angle);
        basePoints.push(`${basePt.x},${basePt.y}`);

        const isSame = Math.abs(axis.buffed - axis.base) < 0.0001;

        const baseCircle = document.getElementById(`spider-base-pt-${i}`);
        if (baseCircle) {
            baseCircle.setAttribute('cx', basePt.x);
            baseCircle.setAttribute('cy', basePt.y);
            baseCircle.setAttribute('data-val', formatSpiderValue(axis.key, axis.base));
            baseCircle.style.display = isSame ? 'none' : '';
        }

        const buffedCircle = document.getElementById(`spider-buffed-pt-${i}`);
        if (buffedCircle) {
            buffedCircle.setAttribute('data-val', formatSpiderValue(axis.key, axis.buffed));
            buffedCircle.setAttribute('data-type', isSame ? 'both' : 'combat');
        }
    }

    const basePolygon = document.getElementById('spider-base-polygon');
    if (basePolygon) {
        basePolygon.setAttribute('points', basePoints.join(' '));
    }
}
