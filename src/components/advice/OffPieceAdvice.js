// src/components/advice/OffPieceAdvice.js
import { t } from '../../scripts/i18n.js';
import { ICON_MAP } from '../../scripts/icons.js';
import ARTIFACT_TYPE_MAPPING from '../../data/artifact_type_mapping.json';

export function getOffPieceAdvice(persoObj) {
    const equippedCount = persoObj.artefacts ? persoObj.artefacts.length : 0;

    if (equippedCount === 0) {
        return {
            type: "empty",
            msg: t('advice.offPiece.empty')
        };
    }

    if (equippedCount > 0 && equippedCount < 5) {
        return {
            type: "incomplete",
            msg: t('advice.offPiece.incomplete')
        };
    }

    const fullSetKey = Object.keys(persoObj.setsCounter || {}).find(key => persoObj.setsCounter[key] === 5);

    if (fullSetKey) {
        const setPieces = persoObj.artefacts.filter(art => art.setKey === fullSetKey);
        setPieces.sort((a, b) => (a.score || 0) - (b.score || 0));
        const worstPiece = setPieces[0];

        const otherPieces = setPieces.slice(1);
        const avgSetScore = otherPieces.length > 0 ? (otherPieces.reduce((a, b) => a + (b.score || 0), 0) / otherPieces.length) : 0;

        const rawName = t('artifact.' + worstPiece.type);
        const hash = Object.keys((typeof window !== 'undefined' && window.HASH_TO_KEY) || {}).find(h => window.HASH_TO_KEY[h] === fullSetKey);
        const setNameTranslated = hash && typeof window !== 'undefined' && window.getText ? window.getText(hash) : fullSetKey;

        return {
            type: "info",
            msg: t('advice.offPiece.5of5', setNameTranslated, rawName, worstPiece.score),
            data: { offPiece: worstPiece, avgScore: avgSetScore, is5of5: true }
        };
    }

    let offPiece = null;
    let setPiecesScores = [];

    const activeSetKeys = Object.keys(persoObj.setsCounter || {}).filter(key => persoObj.setsCounter[key] >= 2);

    (persoObj.artefacts || []).forEach(art => {
        if (activeSetKeys.includes(art.setKey)) {
            setPiecesScores.push(art.score || 0);
        } else {
            offPiece = art;
        }
    });

    if (setPiecesScores.length === 0) {
        return {
            type: "rainbow",
            msg: t('advice.offPiece.rainbow')
        };
    }
    if (!offPiece) return null;

    const avgSetScore = setPiecesScores.reduce((a, b) => a + b, 0) / setPiecesScores.length;
    const isHardMainStat = offPiece.mainStat && (offPiece.mainStat.key.includes("dmg_") || offPiece.mainStat.key.includes("crit"));

    let type = "error";
    let msg = t('advice.offPiece.bad', t('artifact.' + offPiece.type));

    if (offPiece.score > avgSetScore) {
        type = "success";
        msg = t('advice.offPiece.good', t('artifact.' + offPiece.type));
    } else if (isHardMainStat && offPiece.score > (avgSetScore * 0.8)) {
        type = "warning";
        msg = t('advice.offPiece.ok', t('artifact.' + offPiece.type));
    }

    return {
        type: type,
        msg: msg,
        data: { offPiece: offPiece, avgScore: avgSetScore, is5of5: false }
    };
}

export function renderOffPieceAdvice(persoObj) {
    const offPieceAdvice = getOffPieceAdvice(persoObj);
    if (!offPieceAdvice) return '';

    let borderColor = '#ef4444';
    if (offPieceAdvice.type === 'success') borderColor = '#22c55e';
    else if (offPieceAdvice.type === 'warning') borderColor = '#eab308';
    else if (offPieceAdvice.type === 'info') borderColor = '#f97316';
    else if (['empty', 'incomplete', 'rainbow'].includes(offPieceAdvice.type)) borderColor = '#6b7280';

    let innerHtml = '';

    if (offPieceAdvice.data) {
        const { offPiece, avgScore, is5of5 } = offPieceAdvice.data;
        const maxScale = Math.max(offPiece.score || 0, avgScore || 0, 55);
        const offPct = Math.min(((offPiece.score || 0) / maxScale) * 100, 100);
        const avgPct = Math.min((avgScore / maxScale) * 100, 100);

        const innerColor = offPieceAdvice.type === 'success' ? '#22c55e' : (offPieceAdvice.type === 'warning' ? '#eab308' : (offPieceAdvice.type === 'info' ? '#f97316' : '#ef4444'));
        const labelText = is5of5 ? t('analysis.offPiece.replaceable') : t('analysis.offPiece.offSet');
        const iconFile = (offPiece.mainStat && ICON_MAP[offPiece.mainStat.key]) || ICON_MAP['unknown'] || 'icon_unknown.png';

        innerHtml = `
            <div style="background: rgba(0,0,0,0.2); padding: 12px; border-radius: 8px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="position: relative; flex-shrink: 0;">
                        <img src="${offPiece.icon}" style=" display: block; width: 40px; height: 40px; border-radius: 6px; background: rgba(0,0,0,0.3); border: 1px solid ${innerColor}80;">
                        <img src="./assets/simulator/icons/${iconFile}" style="position: absolute; bottom: 1px; right: 1px; width: 16px; height: 16px; background: var(--bg-panel); border-radius: 5px; padding: 2px; opacity: 0.8;">
                    </div>
                    
                    <div style="flex: 1; min-width: 0;">
                        <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--text-grey); margin-bottom: 6px;">
                           <span>${labelText} : <strong style="color: ${innerColor}; font-size: 12px;">${offPiece.score}</strong></span>
                           <span>${t('analysis.offPiece.setAvg')} : <strong style="color: var(--text-always-white);">${avgScore.toFixed(1)}</strong></span>
                        </div>
                        
                        <div style="width: 100%; height: 8px; background: #222; border-radius: 4px; position: relative;">
                            <div style="position: absolute; left: 0; top: 0; bottom: 0; width: ${offPct}%; background: ${innerColor}; opacity: 0.85; border-radius: 4px; transition: width 0.5s ease-out;"></div>
                            
                            <div style="position: absolute; left: ${avgPct}%; top: -3px; bottom: -3px; width: 2px; background: var(--text-always-white); box-shadow: 0 0 4px rgba(0,0,0,0.8); z-index: 2;">
                                <div style="position: absolute; top: -4px; left: -3px; width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 4px solid var(--text-always-white);"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    return `
        <div style="flex:1; background:var(--bg-panel); padding:15px; border-radius:8px; border: 1px solid rgba(255, 255, 255, 0.05); border-left:3px solid ${borderColor}; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
                <p style="font-size:12px; color:var(--text-grey); text-transform:uppercase; margin-bottom:12px;">${t('analysis.s2.offPiece')}</p>
                <p style="font-size:14px; color:var(--text-primary); line-height:1.4; margin-bottom: 20px;">${offPieceAdvice.msg}</p>
            </div>
            ${innerHtml}
        </div>
    `;
}
