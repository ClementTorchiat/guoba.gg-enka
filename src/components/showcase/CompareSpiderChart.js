// src/components/showcase/CompareSpiderChart.js
import { t } from '../../scripts/i18n.js';
import { getSpiderChartAxes } from './SpiderChart.js';
import { createStatIcon } from './CombatStatsList.js';

function formatSpiderValue(key, val) {
    if (['cr', 'cd', 'er', 'dmg', 'hb'].includes(key)) {
        return (val).toFixed(1).replace(/\.0$/, '') + '%';
    }
    return Math.round(val).toLocaleString('en-US').replace(/,/g, ' ');
}

export function renderCompareCard(hostPersoObj, guestCombatStats, guestExtraData) {
    const axes = getSpiderChartAxes(hostPersoObj);
    if (axes.length === 0) return '';

    // Modify the axes to replace base/buffed with host/guest combat stats
    const compareAxes = axes.map(axis => {
        let statKey = axis.key;
        if (statKey === 'dmg') statKey = 'dmgBonus';

        return {
            ...axis,
            hostValue: axis.base,
            guestValue: guestCombatStats[statKey] || 0
        };
    });

    const N = compareAxes.length;
    const size = 240;
    const R = 72;
    const center = { x: size / 2, y: 180 };

    let webLevels = '';
    let bgLines = '';
    let labels = '';
    let hostPoints = [];
    let guestPoints = [];
    let hostCircles = '';
    let guestCircles = '';

    const getPoint = (radius, angle) => {
        return {
            x: center.x + radius * Math.cos(angle),
            y: center.y + radius * Math.sin(angle)
        };
    };

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

    for (let i = 0; i < N; i++) {
        const angle = -Math.PI / 2 + (Math.PI * 2 * i) / N;
        const outerPt = getPoint(R, angle);
        const axis = compareAxes[i];

        bgLines += `<line x1="${center.x}" y1="${center.y}" x2="${outerPt.x}" y2="${outerPt.y}" stroke="rgba(255, 255, 255, 0.15)" stroke-width="1" />`;

        const labelPt = getPoint(R + 22, angle);
        labels += `<text x="${labelPt.x}" y="${labelPt.y}" fill="rgba(255, 255, 255, 0.7)" font-size="12" font-weight="600" text-anchor="middle" dominant-baseline="middle" style="pointer-events: none;">${axis.label}</text>`;

        const maxValue = Math.max(axis.hostValue, axis.guestValue, 0.0001);

        const hostRatio = Math.max(0, Math.min(1, axis.hostValue / maxValue));
        const hostPt = getPoint(R * hostRatio, angle);
        hostPoints.push(`${hostPt.x},${hostPt.y}`);

        const guestRatio = Math.max(0, Math.min(1, axis.guestValue / maxValue));
        const guestPt = getPoint(R * guestRatio, angle);
        guestPoints.push(`${guestPt.x},${guestPt.y}`);

        const hostValStr = formatSpiderValue(axis.key, axis.hostValue);
        const guestValStr = formatSpiderValue(axis.key, axis.guestValue);

        hostCircles += `<circle cx="${hostPt.x}" cy="${hostPt.y}" r="3.5" fill="rgba(255, 255, 255, 0.4)" stroke="transparent" stroke-width="0" style="transition: all 0.3s ease-out; cursor: pointer; pointer-events: auto;" data-type="combat" data-label="${axis.label} (Son Build)" data-val="${hostValStr}" onmouseenter="window.showSpiderStatTooltip && window.showSpiderStatTooltip(this)" onmouseleave="window.hideSpiderStatTooltip && window.hideSpiderStatTooltip()" />`;
        guestCircles += `<circle cx="${guestPt.x}" cy="${guestPt.y}" r="3.5" fill="#4dabf7" stroke="transparent" stroke-width="0" style="transition: all 0.3s ease-out; cursor: pointer; pointer-events: auto;" data-type="combat" data-label="${axis.label} (Votre Build)" data-val="${guestValStr}" onmouseenter="window.showSpiderStatTooltip && window.showSpiderStatTooltip(this)" onmouseleave="window.hideSpiderStatTooltip && window.hideSpiderStatTooltip()" />`;
    }

    const htmlContent = `
        <svg width="100%" height="100%" viewBox="0 0 ${size} 280" style="position: absolute; top: 0; left: 0; pointer-events: none;">
            ${webLevels}
            ${bgLines}
            
            <!-- Son build (Host) -->
            <polygon points="${hostPoints.join(' ')}" fill="rgba(0, 0, 0, 0.2)" stroke="rgba(255, 255, 255, 0.2)" stroke-width="2" style="transition: all 0.3s ease-out; pointer-events: none;" />
            
            <!-- Ton build (Guest) -->
            <polygon points="${guestPoints.join(' ')}" fill="rgba(77, 171, 247, 0.4)" stroke="#4dabf7" stroke-width="2" stroke-dasharray="4,4" style="transition: all 0.3s ease-out; pointer-events: none;" />
            
            ${labels}
            ${hostCircles}
            ${guestCircles}
        </svg>
    `;

    const chartHtml = `
        <div class="card buffs-card" style="width: 240px; min-width: 240px; height: 280px; background: var(--bg-panel); transition: background-color 0.35s; border-radius: 8px; position: relative; overflow: hidden;">
            <div class="card-container" style="padding: 12px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: flex-start; align-items: stretch; position: relative; z-index: 10;">
                <div style="font-size:14px; flex-shrink: 0;">
                    <p style="margin-bottom: 2px; margin-top:0; color: var(--text-always-white); display: flex; align-items: center; justify-content: space-between;">
                        ${t('ui.compare.graphTitle')}
                    </p>
                    <p style="font-size: 11px; color: rgba(255, 255, 255, 0.4); margin:0; line-height: 1.25;">${t('ui.compare.graphDesc')}</p>
                </div>
                <div class="card-divider" style="flex-shrink: 0; margin: 9px 0px; display: flex; clear: both; width: 100%; box-sizing: border-box; color: var(--dotted-line); border-width: 1px 0 0; border-color: var(--dotted-line); border-block-start: 1px solid var(--dotted-line);"></div>
            </div>
            ${htmlContent}
        </div>
    `;

    let deltasHtml = '';
    compareAxes.forEach(axis => {
        const delta = axis.guestValue - axis.hostValue;

        const isPositive = delta > 0;
        const color = isPositive ? '#22c55e' : (delta < 0 ? '#ef4444' : 'rgba(255,255,255,0.4)');
        const sign = isPositive ? '+' : '';
        const formattedDelta = delta === 0 ? '-' : formatSpiderValue(axis.key, delta);

        const longLabels = {
            'cr': t('stat.critRate_'),
            'cd': t('stat.critDMG_'),
            'er': t('stat.enerRech_'),
            'em': t('stat.eleMas'),
            'hp': t('stat.hp'),
            'atk': t('stat.atk'),
            'def': t('stat.def')
        };
        const labelText = longLabels[axis.key] || axis.label;

        const iconKeyMap = {
            'cr': 'critRate_',
            'cd': 'critDMG_',
            'er': 'enerRech_',
            'em': 'eleMas',
            'hp': 'hp',
            'atk': 'atk',
            'def': 'def',
            'hb': 'heal_'
        };
        let iconKey = iconKeyMap[axis.key] || axis.key;
        if (axis.key === 'dmg') {
            iconKey = hostPersoObj.combatStats.dmgBonusKey;
        }
        let statIconHtml = createStatIcon(iconKey);
        let cleanIconHtml = statIconHtml.replace('margin-right: 5px;', '').replace('margin-bottom: 2px;', '');

        deltasHtml += `
            <div style="display: flex; align-items: center; gap: 8px; background: rgba(0,0,0,0.2); padding: 8px 12px; border-radius: 8px;">
                <div style="display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; flex-shrink: 0;">
                    ${cleanIconHtml}
                </div>
                <div style="display: flex; flex-direction: column; flex: 1;">
                    <span style="font-size: 11px; color: var(--text-grey); margin-bottom: 2px;">${labelText}</span>
                    <div style="display: flex; align-items: baseline; gap:12px;">
                        <span style="font-size: 13px; color: var(--text-always-white); font-family: 'ShinShin', sans-serif;">${formatSpiderValue(axis.key, axis.guestValue)}</span>
                        <span style="color: ${color}; font-size: 11px;">${sign}${formattedDelta}</span>
                    </div>
                </div>
            </div>
        `;
    });

    let extraHtml = '';
    if (guestExtraData) {
        const hostWeaponIcon = hostPersoObj.weapon ? hostPersoObj.weapon.icon : '';
        const guestWeaponIcon = guestExtraData.weaponIcon || '';

        const hostCons = hostPersoObj.cons || 0;
        const guestCons = guestExtraData.cons || 0;

        const hostSetsHtml = Object.entries(hostPersoObj.setsCounter || {})
            .filter(([k, count]) => count >= 2)
            .map(([k, count]) => {
                let iconUrl = window.ITEM_ICON_MAP[k] || '';
                iconUrl = iconUrl.replace(/_[1-5]\.png$/, '_4.png');
                return `<img src="${iconUrl}" style="width: 24px; height: 24px; border-radius: 4px; background: rgba(0,0,0,0.2);">`;
            })
            .join('');

        const guestSetsHtml = (guestExtraData.sets || [])
            .map(s => {
                let iconUrl = s.icon ? s.icon.replace(/_[1-5]\.png$/, '_4.png') : '';
                return `<img src="${iconUrl}" style="width: 24px; height: 24px; border-radius: 4px; background: rgba(0,0,0,0.2);">`;
            })
            .join('');

        extraHtml = `
            <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(0,0,0,0.2); padding: 8px 16px; border-radius: 8px; flex-wrap: wrap; gap: 12px; margin-top: auto;">
                
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 10px; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.05em;">${t('ui.compare.weapon')}</span>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        ${guestWeaponIcon ? `<img src="${guestWeaponIcon}" style="width: 24px; height: 24px; border-radius: 4px; background: rgba(0,0,0,0.2);" alt="">` : '<span style="color:#666;">-</span>'}
                        <span style="color: var(--text-grey); font-size: 11px;">vs</span>
                        ${hostWeaponIcon ? `<img src="${hostWeaponIcon}" style="width: 24px; height: 24px; border-radius: 4px; background: rgba(0,0,0,0.2);" alt="">` : '<span style="color:#666;">-</span>'}
                    </div>
                </div>

                <div style="width: 1px; height: 20px; background: rgba(255,255,255,0.1);"></div>

                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 10px; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.05em;">${t('ui.compare.artifacts')}</span>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <div style="display: flex; gap: 2px;">${guestSetsHtml || '<span style="color:#666;font-size:12px;">-</span>'}</div>
                        <span style="color: var(--text-grey); font-size: 11px;">vs</span>
                        <div style="display: flex; gap: 2px;">${hostSetsHtml || '<span style="color:#666;font-size:12px;">-</span>'}</div>
                    </div>
                </div>

                <div style="width: 1px; height: 20px; background: rgba(255,255,255,0.1);"></div>

                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 10px; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.05em;">${t('ui.compare.constellation')}</span>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="color: var(--text-always-white); font-size: 13px; font-family: 'ShinShin', sans-serif;">C${guestCons}</span>
                        <span style="color: var(--text-grey); font-size: 11px;">vs</span>
                        <span style="color: var(--text-always-white); font-size: 13px; font-family: 'ShinShin', sans-serif;">C${hostCons}</span>
                    </div>
                </div>

            </div>
        `;
    }

    const playerName = window.currentPlayerNickname || t('ui.compare.player');
    const charName = hostPersoObj.nom || t('ui.compare.character');

    return `
        <div style="display: flex; gap: 20px; flex-wrap: wrap; width: 100%; align-items: stretch; margin-top: 20px;">
            <div style="flex: 1; min-width: 300px; border-radius: 8px; background: var(--bg-panel); padding: 16px; display: flex; flex-direction: column; max-height: 280px; overflow-y: auto; box-sizing: border-box;">
                <h4 style="font-size: 12px; color: var(--text-grey); text-transform: uppercase; margin-top: 0; margin-bottom: 12px; font-weight: normal; display: flex; align-items: center; gap: 4px; flex-wrap: wrap;">
                    ${t('ui.compare.title')} 
                    <span style="text-transform: none; font-size: 11px; opacity: 0.7;">${t('ui.compare.subtitle', charName, charName, playerName)}</span>
                </h4>
                <p style="font-size: 14px; color: var(--text-primary); margin-top: 0; margin-bottom: 20px; line-height: 1.4;">
                    ${t('ui.compare.desc')}
                </p>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 8px; align-content: flex-start; margin-bottom: 12px;">
                    ${deltasHtml}
                </div>
                ${extraHtml}
            </div>
            ${chartHtml}
        </div>
    `;
}

export async function initCompareModule(hostPersoObj, charIndex) {
    const container = document.getElementById(`compare-module-container-${charIndex}`);
    if (!container) return;

    const loggedUid = localStorage.getItem('guoba_discord_uid');
    if (!loggedUid) return; // Pas de compte lié

    // Vérifier si l'utilisateur consulte son propre profil (dans ce cas, on ne compare pas)
    const hostUid = window.currentProfileUid || new URLSearchParams(window.location.search).get('uid');
    if (String(hostUid) === String(loggedUid)) return;

    try {
        let data;
        if (window.loggedUserEnkaData) {
            data = window.loggedUserEnkaData;
        } else {
            if (!window.loggedUserEnkaPromise) {
                const proxyUrl = `https://guobagg.clement-torchiat.workers.dev/?uid=${loggedUid}`;
                window.loggedUserEnkaPromise = fetch(proxyUrl).then(res => {
                    if (!res.ok) throw new Error('Network error');
                    return res.json();
                }).catch(e => null);
            }
            data = await window.loggedUserEnkaPromise;
            if (data && data.avatarInfoList) {
                window.loggedUserEnkaData = data;
            }
        }

        if (!data || !data.avatarInfoList) return;

        const guestAvatar = data.avatarInfoList.find(a => a.avatarId === hostPersoObj.id);
        if (!guestAvatar) return; // Le joueur n'a pas ce personnage dans sa vitrine

        const fp = guestAvatar.fightPropMap;

        // Element key used by host, just in case for dmg bonus
        const elemKey = hostPersoObj.combatStats.dmgBonusKey;
        const elemId = Object.keys(window.ELEMENT_DATA || {}).find(k => window.ELEMENT_DATA[k].key === elemKey);

        const guestCombatStats = {
            hp: fp[2000] || 0,
            atk: fp[2001] || 0,
            def: fp[2002] || 0,
            em: fp[28] || 0,
            cr: (fp[20] || 0) * 100,
            cd: (fp[22] || 0) * 100,
            er: (fp[23] || 0) * 100,
            hb: (fp[26] || 0) * 100,
            dmgBonus: elemId && fp[window.ELEMENT_DATA[elemId].id] ? (fp[window.ELEMENT_DATA[elemId].id] * 100) : 0,
            dmgBonusKey: elemKey
        };

        if (fp[30] !== undefined) {
            guestCombatStats['physical_dmg_'] = (fp[30] || 0) * 100;
        }

        const guestExtraData = {
            weaponIcon: null,
            cons: guestAvatar.talentIdList ? guestAvatar.talentIdList.length : 0,
            sets: []
        };

        if (guestAvatar.equipList) {
            const weapon = guestAvatar.equipList.find(e => e.weapon);
            if (weapon && weapon.flat && weapon.flat.icon) {
                guestExtraData.weaponIcon = `https://enka.network/ui/${weapon.flat.icon}.png`;
            }

            const guestSets = {};
            guestAvatar.equipList.filter(e => e.reliquary).forEach(e => {
                if (!e.flat || !e.flat.setNameTextMapHash) return;
                const setNameHash = e.flat.setNameTextMapHash;
                const icon = e.flat.icon ? `https://enka.network/ui/${e.flat.icon}.png` : '';
                if (!guestSets[setNameHash]) guestSets[setNameHash] = { count: 0, icon: icon };
                guestSets[setNameHash].count++;
            });
            guestExtraData.sets = Object.values(guestSets).filter(s => s.count >= 2);
        }

        container.innerHTML = renderCompareCard(hostPersoObj, guestCombatStats, guestExtraData);
    } catch (e) {
        console.error("Erreur lors de l'initialisation du module de comparaison", e);
    }
}
