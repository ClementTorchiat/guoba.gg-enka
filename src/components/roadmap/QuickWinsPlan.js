// src/components/roadmap/QuickWinsPlan.js
import { t } from '../../scripts/i18n.js';
import { ICON_MAP } from '../../scripts/icons.js';
import { getLocalizedSetName, getSetIcon, getSlotShortName } from './DomainPlanner.js';

export function getAccountBarometerDetails(characters, focusCharNom = null) {
    if (!characters || characters.length === 0) {
        return {
            weapons: [],
            levels: [],
            talents: [],
            mainstats: [],
            sets: []
        };
    }

    const weapons = [];
    const levels = [];
    const talents = [];
    const mainstats = [];
    const sets = [];
    const ICON_BASE_PATH = "/assets/simulator/icons/";

    characters.forEach(perso => {
        const charName = perso.nom;
        const charAvatar = perso.image ? perso.image.replace(/_Side_/g, '_').replace(/Side_/g, '') : '';
        const config = perso.activeBuild ? { ...perso.charConfig, ...perso.activeBuild } : (perso.charConfig || {});
        const isFocus = focusCharNom && charName === focusCharNom;

        // 1. Armes (< 90 et non 80/90)
        if (perso.weapon) {
            const wLvl = perso.weapon.level || 1;
            const wAsc = perso.weapon.ascension || 0;
            if (wLvl < 90 && !(wLvl >= 80 && wAsc >= 6)) {
                weapons.push({
                    charName,
                    charAvatar,
                    weaponName: perso.weapon.name || 'Arme',
                    weaponIcon: perso.weapon.icon || `${ICON_BASE_PATH}icon_weapon.svg`,
                    current: t('ui.char.level', wLvl),
                    target: t('ui.char.level', 90),
                    title: t('roadmap.action.weaponLevel', charName, perso.weapon.name || 'Arme', wLvl, 90),
                    isFocus
                });
            }
        }

        // 2. Niveaux de personnage (< 90 et non 80/90)
        const pLvl = perso.level || 1;
        const pAsc = perso.ascension || 0;
        if (pLvl < 90 && !(pLvl >= 80 && pAsc >= 6)) {
            const weights = config.weights || {};
            let reason = t('roadmap.breakdown.reason.base');
            if ((weights.hp_ || 0) >= 0.8) reason = t('roadmap.breakdown.reason.hp');
            else if ((weights.def_ || 0) >= 0.8) reason = t('roadmap.breakdown.reason.def');
            else if ((weights.eleMas || 0) >= 0.8) reason = t('roadmap.breakdown.reason.em');
            else if (perso.combatStats?.dmgBonusKey?.includes('anemo') || perso.combatStats?.dmgBonusKey?.includes('dendro')) {
                reason = t('roadmap.breakdown.reason.reactions');
            }

            levels.push({
                charName,
                charAvatar,
                current: t('ui.char.level', pLvl),
                target: t('ui.char.level', 90),
                reason,
                title: t('roadmap.action.charLevel', charName, pLvl, reason),
                isFocus
            });
        }

        // 3. Aptitudes clés (< target)
        const targets = (config.talents && typeof config.talents.auto === 'number')
            ? config.talents
            : (config.talents?.target || config.talents || { auto: 1, skill: 8, burst: 8 });

        const talentLabels = {
            auto: t('talents.auto'),
            skill: t('talents.skill'),
            burst: t('talents.burst')
        };
        const keyMap = ['auto', 'skill', 'burst'];

        if (perso.talents && perso.talents.length >= 3) {
            keyMap.forEach((k, idx) => {
                const targetLvl = targets[k] || 1;
                const currentLvl = perso.talents[idx]?.level || 1;
                if (targetLvl > 1 && currentLvl < targetLvl) {
                    const talentObj = perso.talents[idx];
                    const talentLabel = talentLabels[k];
                    talents.push({
                        charName,
                        charAvatar,
                        talentName: talentLabel,
                        talentIcon: talentObj?.icon || '',
                        current: t('ui.char.level', currentLvl),
                        target: t('ui.char.level', targetLvl),
                        title: t('roadmap.action.talentLevel', charName, talentLabel, currentLvl, targetLvl),
                        isFocus
                    });
                }
            });
        }

        // 4. Stats principales à corriger (Sablier, Coupe, Diadème)
        const idealMainStats = config.idealMainStats || config.mainStats || {};
        if (perso.artefacts && perso.artefacts.length > 0) {
            perso.artefacts.forEach(art => {
                if (['EQUIP_SHOES', 'EQUIP_RING', 'EQUIP_DRESS'].includes(art.type)) {
                    const slotName = getSlotShortName(art.type);
                    const ideals = idealMainStats[art.type] || [];
                    const currentKey = art.mainStat?.key;
                    const weight = config.weights?.[currentKey] || 0;

                    if (ideals.length > 0 && !ideals.includes(currentKey) && weight < 0.75) {
                        const bestStatLabel = t('stat.' + ideals[0]);
                        const curStatLabel = art.mainStat?.label || currentKey;
                        const setName = art.setName || getLocalizedSetName(art.setKey, characters) || '';
                        mainstats.push({
                            charName,
                            charAvatar,
                            slotName,
                            setName,
                            pieceIcon: art.icon || `${ICON_BASE_PATH}${ICON_MAP[currentKey] || 'icon_unknown.svg'}`,
                            current: curStatLabel,
                            target: bestStatLabel,
                            title: t('roadmap.action.fixMainStat', charName, slotName, curStatLabel, bestStatLabel),
                            isFocus
                        });
                    }
                }
            });
        }

        // 5. Sets d'artéfacts optimaux
        const bestSets = (config.bestSets || []).map(s => s.split(':')[0]);
        const goodSets = (config.goodSets || []).map(s => s.split(':')[0]);
        const activeSets = Object.keys(perso.setsCounter || {}).filter(k => perso.setsCounter[k] >= 2);
        const hasOptimalSet = activeSets.some(k => bestSets.includes(k) || goodSets.includes(k)) || Object.values(perso.setsCounter || {}).some(count => count >= 4);

        if (!hasOptimalSet && bestSets.length > 0) {
            const setName = getLocalizedSetName(bestSets[0], characters);
            const setIcon = getSetIcon(bestSets[0], characters);
            sets.push({
                charName,
                charAvatar,
                setName,
                setIcon: setIcon || `${ICON_BASE_PATH}icon_empty_slot.svg`,
                current: activeSets.length > 0 ? t('roadmap.breakdown.setBonus2p', activeSets.length) : t('roadmap.breakdown.noSetBonus'),
                target: `4p ${setName}`,
                title: t('roadmap.action.completeSet', charName, setName),
                isFocus
            });
        }
    });

    // Si un perso focus est sélectionné, trier chaque liste pour le mettre en avant
    if (focusCharNom) {
        const sortByFocus = (list) => list.sort((a, b) => (b.isFocus ? 1 : 0) - (a.isFocus ? 1 : 0));
        sortByFocus(weapons);
        sortByFocus(levels);
        sortByFocus(talents);
        sortByFocus(mainstats);
        sortByFocus(sets);
    }

    return { weapons, levels, talents, mainstats, sets };
}

function renderWeaponItem(item) {
    return `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:4px 6px 4px 4px; background:var(--shadow-subtle); border-radius:6px; gap:8px; box-sizing:border-box;" title="${item.title}">
            <div style="display:flex; align-items:center; gap:8px; min-width:0; flex:1;">
                <img src="${item.weaponIcon}" alt="${item.weaponName}" style="width:32px; height:32px; border-radius:6px; background:var(--shadow-subtle); flex-shrink:0; object-fit:contain;">
                <div style="min-width:0; flex:1; display:flex; flex-direction:column; gap:2px;">
                    <div style="font-size:11px; font-weight:normal; color:var(--text-primary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                        ${item.weaponName}
                    </div>
                    <div style="display:flex; align-items:center; gap:4px; font-size:10px; color:var(--text-grey); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                        <span>${t('roadmap.breakdown.equippedBy')}</span>
                        <img src="${item.charAvatar}" alt="${item.charName}" style="width:14px; height:14px; border-radius:50%; background:var(--shadow-subtle); object-fit:cover; flex-shrink:0;">
                        <span style="color:var(--text-primary);">${item.charName}</span>
                    </div>
                </div>
            </div>

            <div style="display:flex; align-items:center; gap:4px; font-size:10px; flex-shrink:0;">
                <span style="color:var(--text-grey);">${item.current}</span>
                <span style="color:var(--text-grey);">➔</span>
                <span style="color:var(--accent-green);">${item.target}</span>
            </div>
        </div>
    `;
}

function renderLevelItem(item) {
    return `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:4px 6px 4px 4px; background:var(--shadow-subtle); border-radius:6px; gap:8px; box-sizing:border-box;" title="${item.title}">
            <div style="display:flex; align-items:center; gap:8px; min-width:0; flex:1;">
                <img src="${item.charAvatar}" alt="${item.charName}" style="width:32px; height:32px; border-radius:6px; background:var(--shadow-subtle); object-fit:cover; flex-shrink:0;">
                <div style="min-width:0; flex:1;">
                    <div style="font-size:11px; font-weight:normal; color:var(--text-primary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                        ${item.charName}
                    </div>
                </div>
            </div>

            <div style="display:flex; align-items:center; gap:4px; font-size:10px; flex-shrink:0;">
                <span style="color:var(--text-grey);">${item.current}</span>
                <span style="color:var(--text-grey);">➔</span>
                <span style="color:var(--accent-green);">${item.target}</span>
            </div>
        </div>
    `;
}

function renderTalentItem(item) {
    return `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:4px 6px 4px 4px; background:var(--shadow-subtle); border-radius:6px; gap:8px; box-sizing:border-box;" title="${item.title}">
            <div style="display:flex; align-items:center; gap:8px; min-width:0; flex:1;">
                <img src="${item.charAvatar}" alt="${item.charName}" style="width:32px; height:32px; border-radius:6px; background:var(--shadow-subtle); object-fit:cover; flex-shrink:0;">
                <div style="min-width:0; flex:1; display:flex; flex-direction:column; gap:2px;">
                    <div style="font-size:11px; font-weight:normal; color:var(--text-primary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                        ${item.charName}
                    </div>
                    <div style="display:flex; align-items:center; gap:4px; font-size:10px; color:var(--text-grey); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                        ${item.talentIcon ? `<img src="${item.talentIcon}" alt="" style="width:14px; height:14px; background:var(--shadow-subtle); border-radius:3px; object-fit:contain; flex-shrink:0;">` : ''}
                        <span>${item.talentName}</span>
                    </div>
                </div>
            </div>

            <div style="display:flex; align-items:center; gap:4px; font-size:10px; flex-shrink:0;">
                <span style="color:var(--text-grey);">${item.current}</span>
                <span style="color:var(--text-grey);">➔</span>
                <span style="color:var(--accent-green);">${item.target}</span>
            </div>
        </div>
    `;
}

function renderMainstatItem(item) {
    return `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:4px 6px 4px 4px; background:var(--shadow-subtle); border-radius:6px; gap:8px; box-sizing:border-box;" title="${item.title}">
            <div style="display:flex; align-items:center; gap:8px; min-width:0; flex:1;">
                <img src="${item.pieceIcon}" alt="${item.slotName}" style="width:32px; height:32px; border-radius:6px; background:var(--shadow-subtle); flex-shrink:0; object-fit:contain;">
                <div style="min-width:0; flex:1; display:flex; flex-direction:column; gap:2px;">
                    <div style="font-size:11px; font-weight:normal; color:var(--text-primary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                        ${item.slotName}${item.setName ? `<span style="color:var(--text-grey); font-size:10px; margin-left:4px;">• ${item.setName}</span>` : ''}
                    </div>
                    <div style="display:flex; align-items:center; gap:4px; font-size:10px; color:var(--text-grey); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                        <img src="${item.charAvatar}" alt="${item.charName}" style="width:14px; height:14px; border-radius:50%; background:var(--shadow-subtle); object-fit:cover; flex-shrink:0;">
                        <span>${item.charName}</span>
                    </div>
                </div>
            </div>

            <div style="display:flex; align-items:center; gap:4px; font-size:10px; flex-shrink:0;">
                <span style="color:#f87171;">${item.current}</span>
                <span style="color:var(--text-grey);">➔</span>
                <span style="color:var(--accent-green);">${item.target}</span>
            </div>
        </div>
    `;
}

function renderSetItem(item) {
    return `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:4px 6px 4px 4px; background:var(--shadow-subtle); border-radius:6px; gap:8px; box-sizing:border-box;" title="${item.title}">
            <div style="display:flex; align-items:center; gap:8px; min-width:0; flex:1;">
                <img src="${item.setIcon}" alt="${item.setName}" style="width:32px; height:32px; border-radius:6px; background:var(--shadow-subtle); flex-shrink:0; object-fit:contain;">
                <div style="min-width:0; flex:1; display:flex; flex-direction:column; gap:2px;">
                    <div style="font-size:11px; font-weight:normal; color:var(--text-primary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                        4p ${item.setName}
                    </div>
                    <div style="display:flex; align-items:center; gap:4px; font-size:10px; color:var(--text-grey); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                        <img src="${item.charAvatar}" alt="${item.charName}" style="width:14px; height:14px; border-radius:50%; background:var(--shadow-subtle); object-fit:cover; flex-shrink:0;">
                        <span>${item.charName}</span>
                    </div>
                </div>
            </div>

            <div style="display:flex; align-items:center; font-size:10px; color:var(--text-grey); flex-shrink:0;">
                <span style="padding:2px 6px; background:rgba(255,255,255,0.05); border-radius:4px;">${item.current}</span>
            </div>
        </div>
    `;
}

const RENDER_ITEM_MAP = {
    weapons: renderWeaponItem,
    levels: renderLevelItem,
    talents: renderTalentItem,
    mainstats: renderMainstatItem,
    sets: renderSetItem
};

if (typeof window !== 'undefined') {
    if (window.__ROADMAP_DEMO_MODE__ !== undefined) delete window.__ROADMAP_DEMO_MODE__;
    if (window.toggleRoadmapDemoData !== undefined) delete window.toggleRoadmapDemoData;
}

export function renderQuickWinsPlan(characters, focusCharNom = null, extraHeaderRight = '') {
    const data = getAccountBarometerDetails(characters, focusCharNom);

    const sections = [
        {
            key: 'weapons',
            title: t('roadmap.breakdown.weapons'),
            items: data.weapons,
            okText: t('roadmap.breakdown.weapons.ok')
        },
        {
            key: 'levels',
            title: t('roadmap.breakdown.levels'),
            items: data.levels,
            okText: t('roadmap.breakdown.levels.ok')
        },
        {
            key: 'talents',
            title: t('roadmap.breakdown.talents'),
            items: data.talents,
            okText: t('roadmap.breakdown.talents.ok')
        },
        {
            key: 'mainstats',
            title: t('roadmap.breakdown.mainstats'),
            items: data.mainstats,
            okText: t('roadmap.breakdown.mainstats.ok')
        },
        {
            key: 'sets',
            title: t('roadmap.breakdown.sets'),
            items: data.sets,
            okText: t('roadmap.breakdown.sets.ok')
        }
    ];

    return `
        <div class="roadmap-card" style="display:flex; flex-direction:column; gap:16px; padding-bottom:20px !important;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">
                <div>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <h3 style="font-size:24px; font-weight:normal; color:var(--text-primary); margin:0;">${t('roadmap.breakdown.title')}</h3>
                    </div>
                    <p style="font-size:12px; color:var(--text-grey); margin:4px 0 0 0;">${t('roadmap.breakdown.desc')}</p>
                </div>
                ${extraHeaderRight ? extraHeaderRight : ''}
            </div>

            <div style="display:grid; grid-template-columns: repeat(6, 1fr); gap:14px;">
                ${sections.map((sec, index) => `
                    <div style="grid-column: span ${index < 3 ? 2 : 3}; background:var(--bg-panel); border-radius:8px; padding:14px; display:flex; flex-direction:column; gap:12px;">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <span style="font-size:13px; font-weight:normal; color:var(--text-primary);">${sec.title}</span>
                            <span style="font-size:10px; font-weight:normal; padding:2px 7px; border-radius:10px; background:${sec.items.length === 0 ? 'rgba(34,197,94,0.15)' : 'rgba(168,85,247,0.18)'}; color:${sec.items.length === 0 ? 'var(--accent-green)' : '#c084fc'};">
                                ${sec.items.length === 0 ? t('roadmap.breakdown.optimal') : t('roadmap.breakdown.toDo', sec.items.length)}
                            </span>
                        </div>

                        ${sec.items.length === 0 ? `
                            <div style="padding:16px 12px; background:rgba(34,197,94,0.06); border:1px dashed rgba(34,197,94,0.25); border-radius:6px; color:var(--accent-green); font-size:11px; text-align:center; display:flex; align-items:center; justify-content:center; min-height:80px; box-sizing:border-box;">
                                ${sec.okText}
                            </div>
                        ` : `
                            <div class="roadmap-action-list">
                                ${sec.items.map(item => RENDER_ITEM_MAP[sec.key](item)).join('')}
                            </div>
                        `}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}
