// src/components/advice/SetForcingAdvice.js
import { t } from '../../scripts/i18n.js';

export function getSetForcingAdvice(persoObj, config) {
    const equippedCount = persoObj.artefacts ? persoObj.artefacts.length : 0;

    if (equippedCount === 0) {
        return {
            type: "info",
            color: "#3b82f6",
            title: t('advice.setForce.title.ok'),
            msg: t('advice.setForce.empty'),
            status: 'empty',
            activeSets: []
        };
    }

    if (equippedCount > 0 && equippedCount < 5) {
        return {
            type: "warning",
            color: "#eab308",
            title: t('advice.setForce.title.ok'),
            msg: t('advice.setForce.incomplete'),
            status: 'incomplete',
            activeSets: []
        };
    }

    let active4pSet = null;
    const charLikes2p2p = config && config.bestSets && config.bestSets.some(setStr => setStr.includes(":2"));

    const activeSets = Object.keys(persoObj.setsCounter || {}).filter(k => persoObj.setsCounter[k] >= 2);
    const activeSetsData = activeSets.map(setKey => {
        const hash = Object.keys((typeof window !== 'undefined' && window.HASH_TO_KEY) || {}).find(h => window.HASH_TO_KEY[h] === setKey);
        return { key: setKey, hash: hash, count: persoObj.setsCounter[setKey] };
    });

    for (const [setKey, count] of Object.entries(persoObj.setsCounter || {})) {
        if (count >= 4) {
            active4pSet = setKey;
            break;
        }
    }

    if (!active4pSet) {
        if (charLikes2p2p) {
            return {
                type: "success",
                color: "#22c55e",
                title: t('advice.setForce.title.ok'),
                msg: t('advice.setForce.ok2p2p'),
                status: '2p2p',
                activeSets: activeSetsData
            };
        }
        return {
            type: "success",
            color: "#22c55e",
            title: t('advice.setForce.title.ok'),
            msg: t('advice.setForce.okRainbow'),
            status: 'rainbow',
            activeSets: activeSetsData
        };
    }

    const setPieces = (persoObj.artefacts || []).filter(a => a.setKey === active4pSet);
    const totalScore = setPieces.reduce((sum, art) => sum + (art.score || 0), 0);
    const avgScore = setPieces.length > 0 ? (totalScore / setPieces.length) : 0;
    const setHash = Object.keys((typeof window !== 'undefined' && window.HASH_TO_KEY) || {}).find(h => window.HASH_TO_KEY[h] === active4pSet);

    if (avgScore < 25) {
        let warningMsg = t('advice.setForce.weak');
        if (charLikes2p2p) {
            warningMsg += ' ' + t('advice.setForce.weakHint2p');
        }

        return {
            type: "error",
            color: "#ef4444",
            title: t('advice.setForce.title.warning'),
            msg: warningMsg,
            status: 'forcing',
            targetSet: { key: active4pSet, hash: setHash, avgScore: avgScore }
        };
    } else {
        const isRecommended = config && (
            (config.bestSets && config.bestSets.some(s => s.split(':')[0] === active4pSet)) ||
            (config.goodSets && config.goodSets.some(s => s.split(':')[0] === active4pSet))
        );

        if (!isRecommended) {
            return {
                type: "info",
                color: "#3b82f6",
                title: t('advice.setForce.title.ok'),
                msg: t('advice.setForce.okQualityOffMeta'),
                status: 'offMeta4p',
                targetSet: { key: active4pSet, hash: setHash, avgScore: avgScore }
            };
        }

        return {
            type: "success",
            color: "#22c55e",
            title: t('advice.setForce.title.ok'),
            msg: t('advice.setForce.okQuality'),
            status: 'good4p',
            targetSet: { key: active4pSet, hash: setHash, avgScore: avgScore }
        };
    }
}

export function renderSetForcingAdvice(persoObj, config) {
    const adv = getSetForcingAdvice(persoObj, config);
    if (!adv) return '';

    if (adv.status === 'empty' || adv.status === 'incomplete') {
        return `
            <div style="background:var(--bg-panel); padding:15px; border-radius:8px; border-left:3px solid #6b7280; display:flex; flex-direction:column; min-height:165px; box-sizing:border-box;">
                <div>
                    <p style="font-size: 12px; color: var(--text-grey); text-transform: uppercase; margin-bottom: 12px;">${adv.title}</p>
                    <p style="font-size: 14px; color:var(--text-primary); line-height:1.4; margin:0;">${adv.msg}</p>
                </div>
            </div>`;
    }

    let color = '#ef4444';
    if (adv.type === 'success') color = '#22c55e';
    if (adv.type === 'warning') color = '#eab308';
    if (adv.type === 'info') color = '#3b82f6';

    const ICON_BASE_PATH = "./assets/simulator/icons/";

    const getSetIcon = (hash) => {
        let baseIconStr = null;
        if (hash && typeof window !== 'undefined' && window.iconToNameHash) {
            for (const [icon, h] of Object.entries(window.iconToNameHash)) {
                if (String(h) === String(hash)) {
                    baseIconStr = icon.substring(0, icon.lastIndexOf('_'));
                    break;
                }
            }
        }
        return baseIconStr ? `https://enka.network/ui/${baseIconStr}_4.png` : ICON_BASE_PATH + "icon_unknown.webp";
    };

    let bottomHtml = '';

    if (adv.status === 'forcing' || adv.status === 'good4p' || adv.status === 'offMeta4p') {
        const setIconUrl = getSetIcon(adv.targetSet.hash);
        const scorePct = Math.min((adv.targetSet.avgScore / 45) * 100, 100);
        const thresholdPct = (25 / 45) * 100;

        bottomHtml = `
            <div style="display:flex; align-items:center; gap: 12px; width: 100%;">
                <div style="position:relative; flex-shrink:0; line-height:0;">
                    <img src="${setIconUrl}" style="width:60px; height:60px; border-radius:6px; background:rgba(0,0,0,0.1); object-fit:cover; ${adv.status === 'forcing' ? 'filter: grayscale(100%) opacity(0.5);' : ''}" alt="">
                    ${adv.status === 'forcing' ? `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); filter: drop-shadow(0 0 4px rgba(0,0,0,0.9));"><path d="M18.84 12.25l1.72-1.71a4.5 4.5 0 0 0-6.36-6.36l-1.72 1.71"></path><path d="M5.16 11.75l-1.72 1.71a4.5 4.5 0 0 0 6.36 6.36l1.72-1.71"></path><line x1="2" y1="2" x2="22" y2="22"></line></svg>` : ''}
                </div>
                <div style="flex: 1; width: 100%; position: relative;">
                    <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--text-grey); margin-bottom: 6px;">
                        <span>${t('analysis.offPiece.setAvg')}</span>
                        <span style="color: ${color}; font-size: 12px;">${adv.targetSet.avgScore.toFixed(1)} <span style="font-size:10px; color:var(--text-grey);">/ 25.0</span></span>
                    </div>
                    <div style="width: 100%; height: 16px; background: rgba(0,0,0,0.2); border-radius: 4px; overflow: hidden; position: relative;">
                        <div style="
                            width: ${scorePct}%;
                            height: 100%;
                            background: ${color};
                            opacity: 0.85;
                            transition: width 0.5s ease-out;
                        "></div>
                    </div>
                    <div style="
                        position: absolute;
                        left: ${thresholdPct}%;
                        top: 18px;
                        width: 2px;
                        height: 24px;
                        background: var(--text-always-white);
                        box-shadow: 0 0 5px rgba(0,0,0,0.8);
                        z-index: 2;
                    ">
                        <div style="position: absolute; top: -5px; left: -3px; width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 4px solid var(--text-always-white);"></div>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 10px; color: var(--text-grey); margin-top: 4px;">
                        <span>0</span>
                        <span style="color:var(--text-always-white);">25.0</span>
                        <span>45</span>
                    </div>
                </div>
            </div>
        `;
    } else {
        const setIconsHtml = adv.activeSets.map(set => {
            return `<img src="${getSetIcon(set.hash)}" style="width:60px; height:60px; border-radius:6px; background:rgba(0,0,0,0.1); object-fit:cover;" alt="">`;
        }).join('');

        bottomHtml = `
            <div style="display:flex; align-items:center; gap: 12px; width: 100%;">
                ${adv.activeSets.length === 0
                ? `<img src="${ICON_BASE_PATH}icon_score.webp" style="width:60px; height:60px; border-radius:6px; background:rgba(0,0,0,0.1); object-fit:cover; opacity:0.5;" alt="">`
                : setIconsHtml
            }
                <div style="flex: 1; padding-left: 4px;">
                    <p style="font-size: 11px; color: var(--text-grey); font-style: italic; margin:0; line-height:1.4;">
                        ${adv.status === '2p2p' ? t('advice.setForce.ok2p2p') : t('advice.setForce.okRainbow')}
                    </p>
                </div>
            </div>
        `;
    }

    return `
        <div style="background:var(--bg-panel); padding:15px; border-radius:8px; border-left:3px solid ${color}; display:flex; flex-direction:column; justify-content:space-between; min-height:165px; box-sizing:border-box;">
            <div>
                <p style="font-size: 12px; color: var(--text-grey); text-transform: uppercase; margin-bottom: 12px;">${adv.title}</p>
                <p style="font-size: 14px; color:var(--text-primary); line-height:1.4; margin:0;">${adv.msg}</p>
            </div>
            
            <div style="margin-top: auto; padding-top: 16px;">
                ${bottomHtml}
            </div>
        </div>`;
}
