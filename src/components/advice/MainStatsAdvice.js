// src/components/advice/MainStatsAdvice.js
import { t } from '../../scripts/i18n.js';
import STAT_LABELS from '../../data/stat_labels.json';
import MAINSTAT_DROP_RATES from '../../data/mainstat_drop_rates.json';
import { ICON_MAP } from '../../scripts/icons.js';

export function getFarmDifficulty(pieceType, mainStatKey) {
    if (pieceType === "EQUIP_BRACER" || pieceType === "EQUIP_NECKLACE") {
        return { label: t('farm.easy'), color: "#3b82f6" };
    }

    const rates = MAINSTAT_DROP_RATES[pieceType];
    if (!rates || !rates[mainStatKey]) return { label: t('farm.hard'), color: "#eab308" };

    const probability = rates[mainStatKey];

    if (probability >= 19) return { label: t('farm.medium'), color: "#22c55e" };
    if (probability >= 10) return { label: t('farm.hard'), color: "#eab308" };
    if (probability >= 5) return { label: t('farm.veryHard'), color: "#f97316" };
    return { label: t('farm.extreme'), color: "#ef4444" };
}

export function getMainStatAdvice(persoObj, config) {
    const slotsToCheck = ["EQUIP_SHOES", "EQUIP_RING", "EQUIP_DRESS"];
    let warnings = [];
    let slotsData = [];

    if (!config || !config.idealMainStats) return null;

    let equippedCount = 0;

    slotsToCheck.forEach(slotType => {
        const art = persoObj.artefacts ? persoObj.artefacts.find(a => a.type === slotType) : null;
        const allowedMainStats = config.idealMainStats[slotType] || [];

        if (!art) {
            slotsData.push({
                type: slotType,
                isEquipped: false,
                allowedKeys: allowedMainStats
            });
            return;
        }

        equippedCount++;
        const currentKey = art.mainStat.key;
        const isOk = allowedMainStats.includes(currentKey);

        slotsData.push({
            type: slotType,
            icon: art.icon,
            currentKey: currentKey,
            isOk: isOk,
            allowedKeys: allowedMainStats,
            isEquipped: true
        });

        if (!isOk) {
            const pieceName = t('artifact.' + slotType);
            const cleanList = allowedMainStats.map(statKey => t('stat.' + statKey)).join(" / ");
            warnings.push({
                piece: pieceName,
                current: art.mainStat.label,
                better: cleanList
            });
        }
    });

    if (equippedCount === 0) {
        return {
            type: "info",
            color: "#3b82f6",
            title: t('advice.mainStat.title.ok'),
            msg: t('advice.mainStat.empty'),
            slotsData: [],
            isEmpty: true
        };
    }

    if (warnings.length > 0) {
        return {
            type: "critical",
            color: "#ef4444",
            title: t('advice.mainStat.title.problem'),
            details: warnings,
            slotsData: slotsData
        };
    }

    return {
        type: "success",
        color: "#22c55e",
        title: t('advice.mainStat.title.ok'),
        msg: t('advice.mainStat.ok'),
        slotsData: slotsData
    };
}

export function renderMainStatsAdvice(persoObj, config) {
    const adv = getMainStatAdvice(persoObj, config);
    if (!adv) return '';

    const ICON_BASE_PATH = "/assets/simulator/icons/";

    if (adv.isEmpty) {
        return `
            <div style="background:var(--bg-panel); padding:15px; border-radius:8px; border-left:3px solid #6b7280; display:flex; flex-direction:column; justify-content:space-between; min-height:165px; box-sizing:border-box;">
                <div>
                    <p style="font-size: 12px;color: var(--text-grey); text-transform: uppercase;margin-bottom: 12px;">${adv.title}</p>
                    <div style="display:flex; flex-direction:column; gap:6px;">
                        <p style="font-size:14px; color:var(--text-primary); margin:0; line-height:1.4;">${adv.msg}</p>
                    </div>
                </div>
            </div>`;
    }

    const color = adv.type === 'success' ? '#22c55e' : '#ef4444';
    let circlesHtml = '';

    if (adv.slotsData && adv.slotsData.length === 3) {
        circlesHtml = `<div style="display:flex; justify-content:space-around; align-items:center; margin-top:auto; gap:10px; padding-top:16px;">`;

        adv.slotsData.forEach(slot => {
            if (!slot.isEquipped) {
                circlesHtml += `
                    <div style="display:flex; flex-direction:column; align-items:center; flex:1;">
                        <div style="width: 60px; height: 60px; border-radius: 8px; background: conic-gradient(#4b5563 100%, rgba(255,255,255,0.1) 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.3); opacity: 0.4;">
                            <div style="position:relative; width: 54px; height: 54px; border-radius: 6px; background: var(--bg-panel); display: flex; align-items: center; justify-content: center; overflow: hidden;">
                                <img src="${ICON_BASE_PATH}icon_unknown.webp" style="width: 28px; height: 28px; object-fit: contain; opacity: 0.3;" alt="?">
                            </div>
                        </div>
                    </div>`;
                return;
            }

            const progressColor = slot.isOk ? '#22c55e' : '#ef4444';

            circlesHtml += `
                <div style="display:flex; flex-direction:column; align-items:center; flex:1;">
                    <div style="width: 60px; height: 60px; border-radius: 8px; background: conic-gradient(${progressColor} 100%, rgba(255,255,255,0.1) 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                        <div style="position:relative; width: 54px; height: 54px; border-radius: 6px; background: var(--bg-panel); display: flex; align-items: center; justify-content: center; overflow: hidden;">
                            <img src="${slot.icon}" style="width: 48px; height: 48px; object-fit: contain; border-radius: 4px;" alt="">
                            ${slot.isOk ? `
                                <div style="position:absolute; bottom:2px; left:2px; background:rgba(0,0,0,0.4); border-radius:3px; padding:1px; display:flex; align-items:center; justify-content:center;">
                                    <img src="${ICON_BASE_PATH}${ICON_MAP[slot.currentKey] || ICON_MAP['unknown']}" style="width:14px; height:14px;" title="${t('stat.' + slot.currentKey)}">
                                </div>
                            ` : `
                                <div style="position:absolute; bottom:2px; left:2px; background:rgba(0,0,0,0.4); border-radius:3px; padding:1px; display:flex; align-items:center; justify-content:center;">
                                    <img src="${ICON_BASE_PATH}${ICON_MAP[slot.currentKey] || ICON_MAP['unknown']}" style="width:14px; height:14px; opacity:0.6; filter:grayscale(100%);" title="${t('stat.' + slot.currentKey)}">
                                </div>
                                <div style="position:absolute; bottom:2px; right:2px; background:rgba(0,0,0,0.4); border-radius:3px; padding:1px; display:flex; align-items:center; gap:1px; justify-content:center;">
                                    ${slot.allowedKeys.map(k => `<img src="${ICON_BASE_PATH}${ICON_MAP[k] || ICON_MAP['unknown']}" style="width:14px; height:14px;" title="${t('stat.' + k)}">`).join('')}
                                </div>
                                <div style="position:absolute; bottom:3px; left:50%; transform:translateX(-50%); color:var(--text-always-white); font-size:10px; text-shadow:0 0 3px rgba(0,0,0,0.9); line-height:1;">➔</div>
                            `}
                        </div>
                    </div>
                </div>`;
        });
        circlesHtml += `</div>`;
    }

    return `
        <div style="background:var(--bg-panel); padding:15px; border-radius:8px; border-left:3px solid ${color}; display:flex; flex-direction:column; justify-content:space-between; min-height:165px; box-sizing:border-box;">
            <div>
                <p style="font-size: 12px;color: var(--text-grey); text-transform: uppercase;margin-bottom: 12px;">${adv.title}</p>
                <div style="display:flex; flex-direction:column; gap:6px;">
                    ${adv.type === 'success'
            ? `<p style="font-size:14px; color:var(--text-primary); margin:0; line-height:1.4;">${adv.msg}</p>`
            : adv.details.map(d => `<p style="font-size:14px; color:var(--text-primary); margin:0; line-height:1.4;">${t('analysis.s3.mainStatDetail', d.piece, d.better, d.current)}</p>`).join('')
        }
                </div>
            </div>
            ${circlesHtml}
        </div>`;
}
