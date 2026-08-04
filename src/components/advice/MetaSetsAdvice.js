// src/components/advice/MetaSetsAdvice.js
import { t } from '../../scripts/i18n.js';

export function getMetaSetAdvice(persoObj, config) {
    if (!config || !config.bestSets || config.bestSets.length === 0) return null;

    const is2p2p = config.bestSets.every(setStr => setStr.endsWith(":2")) && config.bestSets.length >= 2;

    let equippedBest = false;
    let targetSetsData = [];
    let recommendationStr = "";

    const getTextHelper = (hash, fallback) => {
        if (typeof window !== 'undefined' && window.getText) return window.getText(hash);
        return fallback;
    };

    if (is2p2p) {
        equippedBest = config.bestSets.every(setStr => {
            const [key, count] = setStr.split(":");
            return ((persoObj.setsCounter && persoObj.setsCounter[key]) || 0) >= parseInt(count);
        });

        targetSetsData = config.bestSets.map(setStr => {
            const [key, count] = setStr.split(":");
            const hash = Object.keys((typeof window !== 'undefined' && window.HASH_TO_KEY) || {}).find(h => window.HASH_TO_KEY[h] === key);
            return {
                key: key,
                name: hash ? getTextHelper(hash, key) : key,
                required: parseInt(count),
                current: (persoObj.setsCounter && persoObj.setsCounter[key]) || 0,
                hash: hash
            };
        });

        recommendationStr = targetSetsData.map(t => `<b>${t.name} (2p)</b>`).join(" et ");
    } else {
        const bestMatch = config.bestSets.find(setStr => {
            const [key, count] = setStr.split(":");
            return ((persoObj.setsCounter && persoObj.setsCounter[key]) || 0) >= parseInt(count);
        });

        equippedBest = !!bestMatch;
        const displaySetStr = bestMatch || config.bestSets[0];
        const [displayKey, displayCountStr] = displaySetStr.split(":");
        const hash = Object.keys((typeof window !== 'undefined' && window.HASH_TO_KEY) || {}).find(h => window.HASH_TO_KEY[h] === displayKey);

        targetSetsData = [{
            key: displayKey,
            name: hash ? getTextHelper(hash, displayKey) : displayKey,
            required: parseInt(displayCountStr) || 4,
            current: (persoObj.setsCounter && persoObj.setsCounter[displayKey]) || 0,
            hash: hash
        }];

        recommendationStr = `<b>${targetSetsData[0].name} (${t('ui.setPieces', targetSetsData[0].required)})</b>`;
    }

    if (equippedBest) {
        return {
            type: "success",
            title: t('advice.metaSet.title.ok'),
            msg: t('advice.metaSet.ok'),
            targetSets: targetSetsData,
            is2p2p: is2p2p
        };
    }

    let equippedGood = false;
    if (config.goodSets) {
        equippedGood = !!config.goodSets.find(setStr => {
            const [key, count] = setStr.split(":");
            return ((persoObj.setsCounter && persoObj.setsCounter[key]) || 0) >= parseInt(count);
        });
    }

    if (equippedGood) {
        return {
            type: "info",
            title: t('advice.metaSet.title.optimize'),
            msg: t('advice.metaSet.good', recommendationStr),
            targetSets: targetSetsData,
            is2p2p: is2p2p
        };
    }

    return {
        type: "warning",
        title: t('advice.metaSet.title.problem'),
        msg: t('advice.metaSet.bad', recommendationStr),
        targetSets: targetSetsData,
        is2p2p: is2p2p
    };
}

export function renderMetaSetsAdvice(persoObj, config) {
    const adv = getMetaSetAdvice(persoObj, config);
    if (!adv) return '';

    let color = '#ef4444';
    if (adv.type === 'success') color = '#22c55e';
    if (adv.type === 'info') color = '#f97316';

    const ICON_BASE_PATH = "./assets/simulator/icons/";

    const setsHtml = adv.targetSets.map(targetSet => {
        let baseIconStr = null;
        if (targetSet.hash && typeof window !== 'undefined' && window.iconToNameHash) {
            for (const [icon, hash] of Object.entries(window.iconToNameHash)) {
                if (String(hash) === String(targetSet.hash)) {
                    baseIconStr = icon.substring(0, icon.lastIndexOf('_'));
                    break;
                }
            }
        }
        const setIconUrl = baseIconStr ? `https://enka.network/ui/${baseIconStr}_${targetSet.required}.png` : ICON_BASE_PATH + "icon_unknown.webp";

        let piecesHtml = '';
        for (let i = 0; i < targetSet.required; i++) {
            const isEquipped = i < targetSet.current;
            const pieceColor = isEquipped ? color : 'rgba(255,255,255,0.15)';
            piecesHtml += `<div style="width: 14px; height: 14px; border-radius: 3px; background: ${pieceColor}; transform: rotate(45deg); margin: 0 6px;"></div>`;
        }

        return `
            <div style="display:flex; align-items:center; gap: 15px;">
                <div style="width: 60px; height: 60px; border-radius: 8px; background: rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    <img src="${setIconUrl}" style="width: 60px; height: 60px; object-fit: contain;" alt="">
                </div>
                <div style="display:flex; flex-direction:column; gap:8px;">
                    <span style="font-size: 11px; color: var(--text-primary); font-weight: 500;">${targetSet.name}</span>
                    <div style="display:flex; align-items:center; padding-left: 2px;">
                        ${piecesHtml}
                    </div>
                </div>
            </div>
        `;
    }).join('');

    return `
        <div style="background:var(--bg-panel); padding:15px; border-radius:8px; justify-content: space-between; border-left:3px solid ${color}; display:flex; flex-direction:column; min-height:165px; box-sizing:border-box;">
            <div>
                <p style="font-size: 12px;color: var(--text-grey); text-transform: uppercase;margin-bottom: 12px;">${adv.title}</p>
                <p style="font-size: 14px; color:var(--text-primary); line-height:1.4; margin:0;">${adv.msg}</p>
            </div>
            
            <div style="display:flex; flex-direction:${adv.is2p2p ? 'row' : 'row'}; flex-wrap:wrap; gap: 15px; padding-top: 16px;">
                ${setsHtml}
            </div>
        </div>`;
}
