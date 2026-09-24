// src/components/showcase/BuffsPanel.js
import { t } from '../../scripts/i18n.js';
import { renderSpiderChartContent, updateSpiderChartDOM } from './SpiderChart.js';

export function renderBuffsPanel(persoObj, charIndex) {
    return `
        <div class="card buffs-card" style="width: 240px; min-width: 240px; height: 280px; border: 1px solid rgba(255, 255, 255, 0.4); transition: background-color 0.35s, box-shadow 0.25s, border-color 0.25s; border-radius: 8px; box-shadow: rgb(0, 0, 0) 1px 1px 6px, rgba(255, 255, 255, 0.3) 0px 0px 2px inset; position: relative; overflow: hidden;">
            <div class="card-container" style="padding: 12px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: flex-start; align-items: stretch; position: relative; z-index: 10;">
                <div style="font-size:14px; flex-shrink: 0;">
                    <p style="margin-bottom: 2px; margin-top:0;">${t('ui.char.spiderTitle')}</p>
                    <p style="font-size: 11px; color: rgba(255, 255, 255, 0.4); margin:0; line-height: 1.25;">${t('ui.char.spiderHint')}</p>
                </div>
                <div class="card-divider" style="flex-shrink: 0; margin: 9px 0px; display: flex; clear: both; width: 100%; box-sizing: border-box; color: var(--dotted-line); border-width: 1px 0 0; border-color: var(--dotted-line); border-block-start: 1px solid var(--dotted-line);"></div>
            </div>
            ${renderSpiderChartContent(persoObj)}
        </div>
    `;
}

export function renderActiveBuffsSection(persoObj, charIndex) {
    if (!persoObj || !persoObj.buffs || persoObj.buffs.length === 0) return '';

    // Grouping by Character > Origin
    const characters = {};

    const resolveIconFromKey = (key) => {
        if (!key || typeof window === 'undefined' || !window.HASH_TO_KEY || !window.iconToNameHash) return null;
        const hash = Object.keys(window.HASH_TO_KEY).find(h => window.HASH_TO_KEY[h] === key);
        if (!hash) return null;
        for (let [icon, h] of Object.entries(window.iconToNameHash)) {
            if (String(h) === String(hash)) {
                let cleanIcon = icon.split('/').pop().replace('.png', '');
                if (cleanIcon.startsWith('UI_RelicIcon')) {
                    const base = cleanIcon.substring(0, cleanIcon.lastIndexOf('_'));
                    return `https://enka.network/ui/${base}_4.png`;
                } else {
                    return `https://enka.network/ui/${cleanIcon}.png`;
                }
            }
        }
        return null;
    };


    persoObj.buffs.forEach((buff, bIndex) => {
        let charName = persoObj.nom;
        let charRole = persoObj.activeBuild?.name?.fr || persoObj.activeBuild?.key || '';
        let charImg = persoObj.image ? persoObj.image.replace(/_Side_/g, '_').replace(/Side_/g, '') : '';
        let charSplash = persoObj.splashArt;
        let charHex = 'var(--char-hex)';
        let origin = buff.category;
        let originImg = '';
        let displayName = buff.name;

        if (buff.source === 'teammate') {
            const internalName = buff.id.split('_')[1] || 'Unknown';
            charName = buff.category.includes(' : ') ? buff.category.split(' : ')[1] : (t(`char.${internalName}`) || internalName);
            charImg = `https://enka.network/ui/UI_AvatarIcon_${internalName}.png`;
            charSplash = `https://enka.network/ui/UI_Gacha_AvatarImg_${internalName}.webp`;

            if (typeof window !== 'undefined' && window.resolveCharConfig) {
                const mateConfig = window.resolveCharConfig(internalName) || window.resolveCharConfig(charName);
                if (mateConfig && mateConfig.color) {
                    charHex = mateConfig.color;
                }
            }

            const mate = persoObj.activeBuild?.team?.find(m => m.name === internalName);
            if (mate && mate.role) charRole = mate.role;

            if (buff.id.includes('_wpn_')) {
                let wpnName = buff.name.includes(':') ? buff.name.split(':')[0].trim() : '';
                origin = wpnName ? `${wpnName} ${t('ui.buff.weapon') || '(Arme)'}` : (t('ui.buff.weapon') || '(Arme)');
                if (buff.name.includes(':')) displayName = buff.name.split(':').slice(1).join(':').trim();

                if (mate && mate.weapon) {
                    originImg = (typeof window !== 'undefined' && window.ITEM_ICON_MAP?.[mate.weapon]) || resolveIconFromKey(mate.weapon) || '';
                }
            } else if (buff.id.includes('_art_') || buff.id.includes('_set_')) {
                let setName = buff.name.includes(':') ? buff.name.split(':')[0].trim() : '';
                origin = setName ? `${setName} ${t('ui.buff.set') || '(Set)'}` : (t('ui.buff.set') || '(Artéfact)');
                if (buff.name.includes(':')) displayName = buff.name.split(':').slice(1).join(':').trim();

                if (mate && mate.artifact) {
                    originImg = (typeof window !== 'undefined' && window.ITEM_ICON_MAP?.[mate.artifact]) || resolveIconFromKey(mate.artifact) || '';
                }
            } else {
                origin = t('buff.category.Passifs') || 'Passifs';
            }
        } else if (buff.id.startsWith('res_') || buff.category === t('buff.category.resonance')) {
            charName = t('buff.category.resonance') || 'Résonance';
            charImg = '';
            charSplash = '';
            charHex = 'var(--char-hex)';
            charRole = '';
            origin = t('ui.buff.groupEffect') || 'Effet de groupe';
        } else {
            // Main character
            charHex = 'var(--char-hex)';
            if (buff.category.includes(t('ui.buff.weapon'))) {
                origin = buff.category;
                if (persoObj.weapon) {
                    originImg = (typeof window !== 'undefined' && window.ITEM_ICON_MAP?.[persoObj.weapon.key]) || resolveIconFromKey(persoObj.weapon.key) || `https://enka.network/ui/UI_EquipIcon_${persoObj.weapon.key}.png`;
                }
            } else if (buff.category.includes(t('ui.buff.set'))) {
                origin = buff.category;
                const setName = buff.category.replace(' ' + (t('ui.buff.set') || ''), '').trim();
                const art = persoObj.artefacts?.find(a => a.setName === setName);
                originImg = art ? art.icon : '';
            } else {
                if (buff.category === 'Passifs') {
                    origin = t('buff.category.Passifs') || 'Passifs';
                } else if (buff.category === 'Constellations') {
                    origin = t('buff.category.Constellations') || 'Constellations';
                } else {
                    origin = buff.category;
                }
            }
        }

        if (!characters[charName]) {
            characters[charName] = { img: charImg, splash: charSplash, hex: charHex, role: charRole, origins: {} };
        }
        if (!characters[charName].origins[origin]) {
            characters[charName].origins[origin] = { img: originImg, buffs: [] };
        }
        characters[charName].origins[origin].buffs.push({ buff, displayName, originalIndex: bIndex });
    });

    const resonanceKey = t('buff.category.resonance') || 'Résonance';
    const resonanceData = characters[resonanceKey];
    delete characters[resonanceKey];

    let html = `
        <style>
            .buff-category-body::-webkit-scrollbar { width: 4px; }
            .buff-category-body::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); border-radius: 4px; }
            .buff-category-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }
            .buff-category-body::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.4); }
        </style>
        <div id="active-buffs-section" style="margin-top: 16px; padding: 20px;">
            <h2 style="color: var(--text-primary); font-size: 24px; margin-top: 0; margin-bottom: 12px; display: flex; align-items: center; gap: 10px; font-weight: normal;">
                ${t('ui.char.buffsTitle') || 'Buffs Actifs'}
            </h2>
            <p style="border-left: 3px solid var(--text-grey); padding-left: 12px; color: var(--text-grey); font-size: 16px; margin-top: 0; margin-bottom: 24px;">
                ${t('ui.char.buffsHint') || "Vérifiez vos effets de set ou de personnage"}
            </p>
    `;

    if (resonanceData) {
        html += `
            <div class="resonance-bar" style="background: var(--bg-panel); border-radius: 8px; padding: 12px 16px; margin-bottom: 12px; display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
                <div style="display: flex; align-items: center; gap: 8px; font-size: 15px; color: var(--text-always-white); border-right: 1px solid rgba(255,255,255,0.1); padding-right: 16px;">
                    ${resonanceKey}
                </div>
                <div style="display: flex; gap: 12px; flex: 1; flex-wrap: wrap;">
        `;
        Object.values(resonanceData.origins).forEach(originData => {
            originData.buffs.forEach(item => {
                const buff = item.buff;
                const bIndex = item.originalIndex;
                const displayName = item.displayName || buff.name;
                const textColor = buff.active ? 'var(--text-always-white)' : 'rgba(255,255,255,0.5)';
                const hexColor = 'var(--char-hex)';
                const trackColor = buff.active ? `rgb(from ${hexColor} r g b / 0.6)` : 'rgba(255,255,255,0.15)';
                const knobColor = buff.active ? 'var(--text-always-white)' : 'rgba(255, 255, 255, 0.6)';
                const knobTransform = buff.active ? 'transform:translateX(12px);' : '';

                let iconHtml = '';
                if (buff.id && buff.id.startsWith('res_')) {
                    const element = buff.id.split('_')[1];
                    if (element && element !== 'divers') {
                        iconHtml = `<img src="assets/simulator/icons/icon_${element.toLowerCase()}.webp" style="width: 16px; height: 16px; object-fit: contain; flex-shrink: 0;" alt="${element}" onerror="this.style.display='none'">`;
                    }
                }

                html += `
                    <div class="buff-row" data-buff-index="${bIndex}" data-hex-color="${hexColor}" style="display:flex; flex-direction: row; gap: 8px; align-items:center; background:rgba(0,0,0,0.2); padding: 8px 10px; border-radius: 8px; backdrop-filter: blur(4px);">
                        <div style="display: flex; align-items: center; gap: 4px;">
                            ${iconHtml}
                            <p style="font-size:12px; color:${textColor}; margin: 0; white-space: nowrap; text-shadow: 0 1px 2px rgba(0,0,0,0.5);">${displayName}</p>
                        </div>
                        <label class="switch" style="position:relative; display:inline-block; width:26px; min-width: 26px; height:14px; box-sizing: border-box; flex-shrink: 0; margin-left: 4px;">
                            <input type="checkbox" ${buff.active ? 'checked' : ''} onchange="toggleBuff(${charIndex}, ${bIndex})" style="opacity:0; width:0; height:0;">
                            <span style="position:absolute; cursor:pointer; top:0; left:0; right:0; bottom:0; background:${trackColor}; transition:.4s; border-radius:34px; width: 100%;"></span>
                            <span style="position:absolute; content:''; border-radius:50%; height:10px; width:10px; left:2px; bottom:2px; background-color:${knobColor}; transition:.4s; ${knobTransform} box-shadow: 0 1px 2px rgba(0,0,0,0.4);"></span>
                        </label>
                    </div>
                `;
            });
        });
        html += `
                </div>
            </div>
        `;
    }

    html += `
            <div style="display: flex; gap: 12px; align-items: stretch; width: 100%;">
    `;

    Object.entries(characters).forEach(([charName, charData]) => {
        const charAvatarHtml = charData.img ? `<img src="${charData.img}" style="width: 40px; height: 40px; border-radius: 8px; object-fit: contain; background: rgba(0,0,0,0.2);" onerror="this.style.display='none'">` : `<div style="width: 32px; height: 32px; border-radius: 8px; background: rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center; font-size: 14px;"></div>`;
        const hexColor = charData.hex || 'var(--char-hex)';

        const splashBgHtml = charData.splash ? `
            <div style="position: absolute; inset: 0; background-image: url('${charData.splash}'); background-position: center center; background-repeat: no-repeat; background-size: 300%; z-index: 0; filter: blur(10px) brightness(0.7) saturate(0.8);"></div>
            <div style="position: absolute; inset: 0; background-color: rgb(from ${hexColor} calc(r / 3.5) calc(g / 3.5) calc(b / 3.5) / 0.765); transition: background-color 0.35s; z-index: 1;"></div>
        ` : `
            <div style="position: absolute; inset: 0; background-color: rgb(from ${hexColor} calc(r / 3.5) calc(g / 3.5) calc(b / 3.5) / 0.765); transition: background-color 0.35s; z-index: 1;"></div>
        `;

        html += `
            <div class="buff-category-card" style="flex: 1; min-width: 0; position: relative; border-radius: 8px; display: flex; flex-direction: column; max-height: 300px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.4);  transition: box-shadow 0.25s, border-color 0.25s;">
                ${splashBgHtml}
                <div style="display: flex; align-items: center; gap: 10px; padding: 12px 12px 0 12px; z-index: 2; position: relative;">
                    ${charAvatarHtml}
                    <div style="display: flex; flex-direction: column; overflow: hidden;">
                        <h3 style="margin: 0; font-size: 15px; color: var(--text-always-white); text-shadow: 0 2px 4px rgba(0,0,0,0.8); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${charName}</h3>
                        ${charData.role ? `<span style="font-size: 11px; color: var(--text-grey); margin-top: 2px;">${charData.role}</span>` : ''}
                    </div>
                </div>
                
                <div style="margin: 16px 12px; display: flex; clear: both; width: calc(100% - 24px); box-sizing: border-box; color: var(--dotted-line); border-width: 1px 0 0; border-color: var(--dotted-line); border-block-start: 1px solid var(--dotted-line); z-index: 2; position: relative; opacity: 0.5;"></div>
                
                <div class="buff-category-body" style="display: flex; flex-direction: column; gap: 12px; padding: 0 12px 12px 12px; overflow-y: auto; z-index: 2; position: relative;">
        `;

        Object.entries(charData.origins).forEach(([originName, originData]) => {
            let originIconHtml = '';
            if (originData.img) {
                originIconHtml = `<img src="${originData.img}" style="width: 24px; height: 24px; object-fit: contain; background: rgba(0,0,0,0.2); border-radius: 4px; padding: 2px;" onerror="this.style.display='none'">`;
            }

            html += `
                    <div class="buff-subcategory" style="display: flex; flex-direction: column; gap: 6px;">
                        <div style="display: flex; align-items: center; gap: 6px; color: rgba(255,255,255,0.7); font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">
                            ${originIconHtml}
                            ${originName}
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 4px;">
            `;

            originData.buffs.forEach(item => {
                const buff = item.buff;
                const bIndex = item.originalIndex;
                const displayName = item.displayName || buff.name;

                const textColor = buff.active ? 'var(--text-always-white)' : 'rgba(255,255,255,0.5)';
                const trackColor = buff.active ? `rgb(from ${hexColor} r g b / 0.6)` : 'rgba(255,255,255,0.2)';
                const knobColor = buff.active ? 'var(--text-always-white)' : 'rgba(255, 255, 255, 0.6)';
                const knobTransform = buff.active ? 'transform:translateX(12px);' : '';

                html += `
                            <div class="buff-row" data-buff-index="${bIndex}" data-hex-color="${hexColor}" style="display:flex; flex-direction: row; gap: 8px; align-items:center; justify-content:space-between; padding: 6px 8px; background:rgba(0,0,0,0.2); border-radius:4px; box-sizing: border-box; transition: background 0.2s;">
                                <p style="font-size:12px; color:${textColor}; transition: color 0.3s; margin: 0; flex: 1; min-width: 0; word-break: break-word; line-height: 1.3;">${displayName}</p>
                                
                                <label class="switch" style="position:relative; display:inline-block; width:26px; min-width: 26px; height:14px; box-sizing: border-box; flex-shrink: 0;">
                                    <input type="checkbox" ${buff.active ? 'checked' : ''} onchange="toggleBuff(${charIndex}, ${bIndex})" style="opacity:0; width:0; height:0;">
                                    <span style="position:absolute; cursor:pointer; top:0; left:0; right:0; bottom:0; background:${trackColor}; transition:.4s; border-radius:34px; width: 100%;"></span>
                                    <span style="position:absolute; content:''; border-radius:50%; height:10px; width:10px; left:2px; bottom:2px; background-color:${knobColor}; transition:.4s; ${knobTransform} box-shadow: 0 1px 2px rgba(0,0,0,0.4);"></span>
                                </label>
                            </div>
                `;
            });

            html += `
                        </div>
                    </div>
            `;
        });

        html += `
                </div>
            </div>
        `;
    });

    html += `
            </div>
        </div>
    `;

    return html;
}

export function updateBuffsPanelDOM(persoObj) {
    const container = document.getElementById('active-buffs-section');
    if (!container || !persoObj || !persoObj.buffs) return;

    persoObj.buffs.forEach((buff, bIndex) => {
        const row = container.querySelector(`.buff-row[data-buff-index="${bIndex}"]`);
        if (row) {
            const nameP = row.querySelector('p');
            const input = row.querySelector('input[type="checkbox"]');
            const spans = row.querySelectorAll('.switch > span');
            const trackSpan = spans[0];
            const knobSpan = spans[1];

            if (nameP) nameP.style.color = buff.active ? 'var(--text-always-white)' : 'rgba(255,255,255,0.5)';
            if (input) input.checked = !!buff.active;
            const hexColor = row.getAttribute('data-hex-color') || 'var(--char-hex)';
            if (trackSpan) trackSpan.style.backgroundColor = buff.active ? `rgb(from ${hexColor} r g b / 0.6)` : 'rgba(255,255,255,0.2)';
            if (knobSpan) {
                knobSpan.style.backgroundColor = buff.active ? 'var(--text-always-white)' : 'rgba(255, 255, 255, 0.6)';
                knobSpan.style.transform = buff.active ? 'translateX(12px)' : '';
            }
        }
    });

    updateSpiderChartDOM(persoObj);
}
