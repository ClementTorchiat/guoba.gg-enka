// src/components/advice/IdealPiecesAdvice.js
import { t } from '../../scripts/i18n.js';
import STAT_LABELS from '../../data/stat_labels.json';
import ARTIFACT_TYPE_MAPPING from '../../data/artifact_type_mapping.json';
import SET_NAME_MAPPING from '../../data/set_name_mapping.json';
import SLOT_POSSIBLE_MAIN_STATS from '../../data/slot_possible_main_stats.json';
import { ICON_MAP } from '../../scripts/icons.js';

export function renderIdealPiecesAdvice(persoObj, config) {
    const ICON_BASE_PATH = "./assets/simulator/icons/";
    const SLOT_ORDER_WTL = ["EQUIP_BRACER", "EQUIP_NECKLACE", "EQUIP_SHOES", "EQUIP_RING", "EQUIP_DRESS"];
    const FIXED_MAIN = {
        "EQUIP_BRACER": { key: "hp", get label() { return t('stat.hp'); } },
        "EQUIP_NECKLACE": { key: "atk", get label() { return t('stat.atk'); } }
    };

    const VALID_SUBSTATS = ["critRate_", "critDMG_", "atk_", "atk", "hp_", "hp", "def_", "def", "eleMas", "enerRech_"];

    let targetSets = [];
    if (config.bestSets && config.bestSets.length > 0) {
        const parts1 = config.bestSets[0].split(":");
        targetSets.push({ key: parts1[0], count: parseInt(parts1[1]) || 4 });

        if (targetSets[0].count === 2 && config.bestSets.length > 1) {
            const parts2 = config.bestSets[1].split(":");
            if (parts2[1] === "2") {
                targetSets.push({ key: parts2[0], count: 2 });
            }
        }
    }

    const slotSetMap = {};
    if (targetSets.length === 1 && targetSets[0].count >= 4) {
        slotSetMap["EQUIP_BRACER"] = targetSets[0].key;
        slotSetMap["EQUIP_NECKLACE"] = targetSets[0].key;
        slotSetMap["EQUIP_SHOES"] = targetSets[0].key;
        slotSetMap["EQUIP_DRESS"] = targetSets[0].key;
        slotSetMap["EQUIP_RING"] = "Hors-Set";
    } else if (targetSets.length === 2 && targetSets[0].count === 2 && targetSets[1].count === 2) {
        slotSetMap["EQUIP_BRACER"] = targetSets[0].key;
        slotSetMap["EQUIP_NECKLACE"] = targetSets[0].key;
        slotSetMap["EQUIP_SHOES"] = targetSets[1].key;
        slotSetMap["EQUIP_DRESS"] = targetSets[1].key;
        slotSetMap["EQUIP_RING"] = "Hors-Set";
    } else {
        SLOT_ORDER_WTL.forEach(s => slotSetMap[s] = (s === "EQUIP_RING" ? "Hors-Set" : (targetSets[0]?.key || "Au choix")));
    }

    function getSetNameFR(setKey) {
        if (setKey === "Hors-Set") return t('wtl.offSetPiece');
        if (setKey === "Au choix") return t('wtl.anySet');
        const hash = Object.keys((typeof window !== 'undefined' && window.HASH_TO_KEY) || {}).find(h => window.HASH_TO_KEY[h] === setKey);
        return hash && typeof window !== 'undefined' && window.getText ? window.getText(hash) : setKey;
    }

    function getArtifactIcon(setKey, setNameFR, slotType) {
        if (setKey === "Au choix") return ICON_BASE_PATH + "icon_unknown.webp";

        let lookupSetKey = setKey;
        let lookupNameFR = setNameFR;
        if (setKey === "Hors-Set") {
            lookupSetKey = "GladiatorsFinale";
            lookupNameFR = Object.keys(SET_NAME_MAPPING).find(k => SET_NAME_MAPPING[k] === "GladiatorsFinale") || "Rideau du Gladiateur";
        }

        let targetHash = Object.keys((typeof window !== 'undefined' && window.HASH_TO_KEY) || {}).find(hash => window.HASH_TO_KEY[hash] === lookupSetKey);

        let baseIconStr = null;
        if (targetHash && typeof window !== 'undefined' && window.iconToNameHash) {
            for (const [icon, hash] of Object.entries(window.iconToNameHash)) {
                if (String(hash) === String(targetHash)) {
                    baseIconStr = icon.substring(0, icon.lastIndexOf('_'));
                    break;
                }
            }
        }

        if (baseIconStr) {
            const pieceMap = {
                "EQUIP_BRACER": "4",
                "EQUIP_NECKLACE": "2",
                "EQUIP_SHOES": "5",
                "EQUIP_RING": "1",
                "EQUIP_DRESS": "3"
            };
            return `https://enka.network/ui/${baseIconStr}_${pieceMap[slotType]}.png`;
        }

        if (typeof window !== 'undefined' && window.globalPersoData) {
            for (const char of window.globalPersoData) {
                const found = (char.artefacts || []).find(a => a.setKey === lookupSetKey && a.type === slotType);
                if (found) return found.icon;
            }
        }
        return ICON_BASE_PATH + "icon_unknown.webp";
    }

    const getStatLabel = (k) => t('stat.' + k);

    const cards = SLOT_ORDER_WTL.map(slotType => {
        const pieceName = t('artifact.' + slotType);
        const targetSetKey = slotSetMap[slotType];
        const setNameFR = getSetNameFR(targetSetKey);
        const iconUrl = getArtifactIcon(targetSetKey, setNameFR, slotType);

        let mainStats;
        let isFixedSlot = false;
        if (FIXED_MAIN[slotType]) {
            mainStats = [FIXED_MAIN[slotType]];
            isFixedSlot = true;
        } else {
            const ideal = (config.idealMainStats && config.idealMainStats[slotType]) || [];
            if (ideal.length > 0) {
                mainStats = ideal.map(k => ({ key: k, label: getStatLabel(k) }));
            } else {
                const possible = SLOT_POSSIBLE_MAIN_STATS[slotType] || [];
                const best = possible
                    .map(k => ({ key: k, w: (config.weights && config.weights[k]) || (k.includes("_dmg_") ? ((config.weights && config.weights["elemental_dmg_"]) || 0) : 0) }))
                    .sort((a, b) => b.w - a.w)[0];
                mainStats = best ? [{ key: best.key, label: getStatLabel(best.key) }] : [{ key: "unknown", label: t('wtl.anyChoice') }];
            }
        }

        const hasSingleMainStatTarget = isFixedSlot || mainStats.length === 1;
        const overlapKeys = hasSingleMainStatTarget
            ? []
            : mainStats.map(m => m.key).filter(k => VALID_SUBSTATS.includes(k) && config.weights && config.weights[k] > 0);

        const excludedKeys = new Set(hasSingleMainStatTarget ? mainStats.map(m => m.key) : overlapKeys);

        const pureSubs = VALID_SUBSTATS
            .map(k => ({ key: k, w: (config.weights && config.weights[k]) || 0, label: getStatLabel(k) }))
            .filter(s => s.w > 0 && !excludedKeys.has(s.key))
            .sort((a, b) => b.w - a.w);

        const subSlots = [];
        let slotsUsed = 0;

        if (overlapKeys.length >= 2) {
            if (overlapKeys.length === 2) {
                subSlots.push({
                    type: 'or',
                    keys: overlapKeys.map(k => ({ key: k, label: getStatLabel(k) }))
                });
                slotsUsed += 1;
            } else {
                const countRequired = overlapKeys.length - 1;
                subSlots.push({
                    type: 'pool',
                    count: countRequired,
                    keys: overlapKeys.map(k => ({ key: k, label: getStatLabel(k) }))
                });
                slotsUsed += countRequired;
            }

            while (slotsUsed < 4 && pureSubs.length > 0) {
                const sub = pureSubs.shift();
                subSlots.push({ type: 'normal', key: sub.key, label: sub.label });
                slotsUsed += 1;
            }
        }
        else if (overlapKeys.length === 1) {
            const conditionalKey = overlapKeys[0];
            const slotsLeft = 4 - slotsUsed;

            for (let i = 0; i < slotsLeft - 1; i++) {
                if (pureSubs.length > 0) {
                    const sub = pureSubs.shift();
                    subSlots.push({ type: 'normal', key: sub.key, label: sub.label });
                    slotsUsed += 1;
                }
            }

            if (pureSubs.length > 0) {
                const fallbackSub = pureSubs.shift();
                subSlots.push({
                    type: 'or',
                    keys: [
                        { key: conditionalKey, label: getStatLabel(conditionalKey) },
                        { key: fallbackSub.key, label: fallbackSub.label }
                    ]
                });
                slotsUsed += 1;
            } else {
                subSlots.push({
                    type: 'or_any',
                    key1: { key: conditionalKey, label: getStatLabel(conditionalKey) }
                });
                slotsUsed += 1;
            }
        }
        else if (overlapKeys.length === 0) {
            while (slotsUsed < 4 && pureSubs.length > 0) {
                const sub = pureSubs.shift();
                subSlots.push({ type: 'normal', key: sub.key, label: sub.label });
                slotsUsed += 1;
            }
        }

        while (slotsUsed < 4) {
            subSlots.push({ type: 'any', label: t('wtl.anyChoice') });
            slotsUsed += 1;
        }

        return { slotType, pieceName, targetSetKey, setNameFR, iconUrl, mainStats, subSlots };
    });

    const cardHtml = cards.map(card => {
        const isOffSet = card.targetSetKey === 'Hors-Set';

        const mainHtml = card.mainStats.map((m, idx) => {
            if (idx === 0) {
                return `
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <div style="display:flex; flex-direction:row; align-items:center; gap:5px;">
                            <img src="${ICON_BASE_PATH}${ICON_MAP[m.key] || ICON_MAP['unknown']}" style="width:15px; height:15px;" alt="">
                            <p style="font-size:11px; color: var(--text-primary); margin:0;">${m.label}</p>
                        </div>
                    </div>`;
            } else {
                return `
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:3px;">
                        <div style="display:flex; flex-direction:row; align-items:center; gap:4px;">
                            <span style="color:var(--text-grey); font-size:10px; padding-left:2px;">↳ ${t('wtl.or')}</span>
                            <img src="${ICON_BASE_PATH}${ICON_MAP[m.key] || ICON_MAP['unknown']}" style="width:15px; height:15px; flex-shrink:0;" alt="">
                            <p style="font-size:11px; color: var(--text-primary); margin:0;">${m.label}</p>
                        </div>
                    </div>`;
            }
        }).join('');

        const subHtml = card.subSlots.map((sub, idx) => {
            const divider = idx < card.subSlots.length - 1 ? 'margin-bottom: 12px;' : '';

            if (sub.type === 'or') {
                const html = sub.keys.map((k, kIdx) => {
                    if (kIdx === 0) {
                        return `
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <div style="display:flex; flex-direction:row; align-items:center; gap:5px;">
                                    <img src="${ICON_BASE_PATH}${ICON_MAP[k.key] || ICON_MAP['unknown']}" style="width:15px; height:15px;" alt="">
                                    <p style="font-size:11px; color: var(--text-primary); margin:0;">${k.label}</p>
                                </div>
                            </div>`;
                    } else {
                        return `
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:3px;">
                                <div style="display:flex; flex-direction:row; align-items:center; gap:4px;">
                                    <span style="color:var(--text-grey); font-size:10px; padding-left:2px;">↳ ${t('wtl.or')}</span>
                                    <img src="${ICON_BASE_PATH}${ICON_MAP[k.key] || ICON_MAP['unknown']}" style="width:15px; height:15px; flex-shrink:0;" alt="">
                                    <p style="font-size:11px; color: var(--text-primary); margin:0;">${k.label}</p>
                                </div>
                            </div>`;
                    }
                }).join('');
                return `<div style="${divider}">${html}</div>`;
            }

            if (sub.type === 'or_any') {
                return `
                    <div style="${divider}">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <div style="display:flex; flex-direction:row; align-items:center; gap:5px;">
                                <img src="${ICON_BASE_PATH}${ICON_MAP[sub.key1.key] || ICON_MAP['unknown']}" style="width:15px; height:15px;" alt="">
                                <p style="font-size:11px; color:var(--text-primary); margin:0;">${sub.key1.label}</p>
                            </div>
                        </div>
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:3px;">
                            <div style="display:flex; flex-direction:row; align-items:center; gap:4px; opacity:0.6;">
                                <span style="color:var(--text-grey); font-size:10px; padding-left:2px;">↳ ${t('wtl.or')}</span>
                                <div style="width:15px; height:15px; border-radius:3px; border:1px dashed rgba(255,255,255,0.3); flex-shrink:0;"></div>
                                <p style="font-size:11px; font-style:italic; margin:0;">${t('wtl.anyChoice')}</p>
                            </div>
                        </div>
                    </div>`;
            }

            if (sub.type === 'pool') {
                return `
                    <div style="${divider}">
                        <p style="font-size:10px; color:#c8a96e; margin-bottom:5px; margin-top:0;">${t('wtl.chooseAmong', sub.count)}</p>
                        <div style="display:flex; flex-wrap:wrap; gap:4px; align-items:center;">
                            ${sub.keys.map(k => `
                                <div style="display:flex; align-items:center; gap:3px; background:rgba(255,255,255,0.05); padding:2px 4px; border-radius:4px; border:1px solid rgba(255,255,255,0.1);">
                                    <img src="${ICON_BASE_PATH}${ICON_MAP[k.key] || ICON_MAP['unknown']}" style="width:12px; height:12px;" alt="">
                                    <span style="font-size:10px; color:#ddd;">${k.label}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>`;
            }

            if (sub.type === 'any') {
                return `
                    <div style="${divider}">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <div style="display:flex; flex-direction:row; align-items:center; gap:5px; opacity:0.4;">
                                <div style="width:15px; height:15px; border-radius:3px; border:1px solid rgba(255,255,255,0.3); flex-shrink:0;"></div>
                                <p style="font-size:11px; font-style:italic; margin:0;">${t('wtl.anyChoice')}</p>
                            </div>
                        </div>
                    </div>`;
            }

            return `
                <div style="${divider}">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <div style="display:flex; flex-direction:row; align-items:center; gap:5px;">
                            <img src="${ICON_BASE_PATH}${ICON_MAP[sub.key] || ICON_MAP['unknown']}" style="width:15px; height:15px;" alt="">
                            <p style="font-size:11px; color:var(--text-primary); margin:0;">${sub.label}</p>
                        </div>
                    </div>
                </div>`;
        }).join('');

        return `
            <div style="flex:1; min-width:0; background:var(--bg-panel); padding:10px 12px; border-radius:8px; box-sizing:border-box; display:flex; flex-direction:column; gap:0;">
                
                <div style="display:flex; align-items:center; gap:10px; padding-bottom:8px; border-bottom:1px solid rgba(255,255,255,0.1);">
                    <div style="position:relative; display:inline-block; flex-shrink:0;">
                        <img src="${card.iconUrl}" style="width:38px; height:38px; border-radius:8px; border:2px solid ${isOffSet ? '#FFB13B' : '#FFB13B'};" alt="">
                        <p style="position:absolute; bottom:7px; right:1px; background:rgba(0,0,0,0.4); color:rgba(255,255,255,0.8); font-size:10px; padding:1px 4px; border-radius:8px; margin:0;">+20</p>
                    </div>
                    <div style="overflow:hidden; display:flex; flex-direction:column; justify-content:center; gap:1px; min-width:0;">
                        <p style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-size:12px; margin:0;">${card.pieceName}</p>
                        <p style="font-size:11px; color:${isOffSet ? 'var(--accent-gold)' : 'var(--accent-gold)'}; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin:0;">${card.setNameFR}</p>
                        <p style="font-size:10px; color:rgba(255,255,255,0.4); margin:0;">5★</p>
                    </div>
                </div>

                <div style="display:flex; flex-direction:column; padding-top:12px; gap:0;">
                    <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 12px; margin-bottom: 12px;">
                        ${mainHtml}
                    </div>

                    <div>
                        <div style="display:flex; flex-direction:column; gap:0;">
                            ${subHtml}
                        </div>
                    </div>
                </div>
                
            </div>`;
    }).join('');

    return `
        <div style="margin-top:24px;">
            <p style="font-size:12px; color:var(--text-grey); text-transform:uppercase; margin-bottom:12px; letter-spacing:0.05em;">${t('analysis.s3.p2.title')}</p>
            <div style="display:flex; flex-direction:row; justify-content:space-between; gap:15px;">
                ${cardHtml}
            </div>
        </div>`;
}
