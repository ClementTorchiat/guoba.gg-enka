// src/components/advice/CrossCheckAdvice.js
import { t } from '../../scripts/i18n.js';
import STAT_LABELS from '../../data/stat_labels.json';
import { calculateCharacterScore } from '../../scripts/scoring.js';

export function getAllCrossCheckAdvice(charIndex) {
    const globalPersoData = (typeof window !== 'undefined' && window.globalPersoData) || [];
    const SLOT_ORDER = ["EQUIP_BRACER", "EQUIP_NECKLACE", "EQUIP_SHOES", "EQUIP_RING", "EQUIP_DRESS"];
    const currChar = globalPersoData[charIndex];
    if (!currChar || !currChar.artefacts) return SLOT_ORDER.map(() => null);

    const scoringConfig = { ...(currChar.charConfig || {}), ...(currChar.activeBuild || {}) };
    const active4pSet = Object.keys(currChar.setsCounter || {}).find(key => currChar.setsCounter[key] >= 4);
    const active4pCount = active4pSet ? currChar.setsCounter[active4pSet] : 0;

    return SLOT_ORDER.map(slotType => {
        const currArtIndex = currChar.artefacts.findIndex(a => a.type === slotType);
        if (currArtIndex === -1) return null;
        const currArt = currChar.artefacts[currArtIndex];

        let bestSwap = null;
        let maxDiff = 10;

        globalPersoData.forEach((otherChar, otherIndex) => {
            if (otherIndex === charIndex) return;

            (otherChar.artefacts || []).forEach(otherArt => {
                if (otherArt.type !== slotType) return;

                let mWeight = scoringConfig.weights ? scoringConfig.weights[otherArt.mainStat.key] : undefined;
                if (mWeight === undefined && otherArt.mainStat.key.includes("_dmg_") && scoringConfig.weights) {
                    mWeight = scoringConfig.weights["elemental_dmg_"];
                }
                if (!mWeight || mWeight < 1) return;

                if (active4pSet) {
                    const isCurrArtSetPiece = (currArt.setKey === active4pSet);
                    if (isCurrArtSetPiece && active4pCount === 4) {
                        if (otherArt.setKey !== active4pSet) return;
                    }
                }

                const clonedOtherArt = JSON.parse(JSON.stringify(otherArt));
                const fakeArtefacts = currChar.artefacts.map(a => ({ ...a }));
                fakeArtefacts[currArtIndex] = clonedOtherArt;
                const fakePerso = { ...currChar, artefacts: fakeArtefacts };
                const newCurrEval = calculateCharacterScore(fakePerso, scoringConfig);
                const scoredNewArt = fakePerso.artefacts[currArtIndex];
                const diff = (scoredNewArt.score || 0) - (currArt.score || 0);

                if (diff > maxDiff) {
                    if (currChar.evaluation && newCurrEval.score <= currChar.evaluation.score) return;

                    maxDiff = diff;

                    const otherScoringConfig = { ...(otherChar.charConfig || {}), ...(otherChar.activeBuild || {}) };
                    const fakeOtherArtefacts = (otherChar.artefacts || []).map(a => ({ ...a }));
                    const otherArtIndex = (otherChar.artefacts || []).findIndex(a => a.type === slotType);
                    fakeOtherArtefacts[otherArtIndex] = JSON.parse(JSON.stringify(currArt));
                    const fakeOtherPerso = { ...otherChar, artefacts: fakeOtherArtefacts };
                    const newOtherEval = calculateCharacterScore(fakeOtherPerso, otherScoringConfig);

                    const currSubMap = {};
                    (currArt.subStats || []).forEach(s => {
                        currSubMap[s.key] = s.value;
                    });
                    const newSubMap = {};
                    (scoredNewArt.subStats || []).forEach(s => {
                        newSubMap[s.key] = s.value;
                    });
                    const allKeys = new Set([...Object.keys(currSubMap), ...Object.keys(newSubMap)]);
                    const deltas = [];
                    allKeys.forEach(key => {
                        const oldVal = currSubMap[key] || 0;
                        const newVal = newSubMap[key] || 0;
                        const delta = newVal - oldVal;
                        if (Math.abs(delta) < 0.01) return;
                        const label = t('stat.' + key);
                        const isPercent = key.endsWith("_");
                        const formatted = isPercent
                            ? `${delta > 0 ? "+" : ""}${delta.toFixed(1)}% ${label}`
                            : `${delta > 0 ? "+" : ""}${Math.round(delta)} ${label}`;
                        deltas.push({ delta, formatted });
                    });
                    deltas.sort((a, b) => b.delta - a.delta);

                    bestSwap = {
                        currArt, newArt: scoredNewArt, diff, deltas,
                        currCharName: currChar.nom, currCharIcon: currChar.image,
                        otherCharName: otherChar.nom, otherCharIcon: otherChar.image,
                        currEvalOld: currChar.evaluation || { score: 0, grade: { color: '#888' } },
                        currEvalNew: newCurrEval,
                        otherEvalOld: otherChar.evaluation || { score: 0, grade: { color: '#888' } },
                        otherEvalNew: newOtherEval
                    };
                }
            });
        });

        return bestSwap;
    });
}

export function renderCrossCheckAdvice(charIndex) {
    const crossChecks = getAllCrossCheckAdvice(charIndex);
    const hasAnySwap = crossChecks.some(s => s !== null);
    if (!hasAnySwap) return '';

    const SLOT_NAMES = [
        t('artifact.EQUIP_BRACER'),
        t('artifact.EQUIP_NECKLACE'),
        t('artifact.EQUIP_SHOES'),
        t('artifact.EQUIP_RING'),
        t('artifact.EQUIP_DRESS')
    ];

    const cards = crossChecks.map((swap, idx) => {
        if (!swap) {
            return `
                <div style="flex: 1; min-width: 200px; background:var(--bg-panel); border-radius:8px; padding:11px; display:flex; flex-direction:column; gap:9px; border-top:2px solid #3a3b42; box-sizing:border-box; opacity:0.4; align-items:center; justify-content:center; min-height:160px;">
                    <div style="font-size:22px; color:#444;">✗</div>
                    <p style="font-size:11px; color:#888; text-align:center; line-height:1.5; margin:0;">${t('analysis.s3.noSwapOn', SLOT_NAMES[idx])}</p>
                </div>`;
        }

        const deltasHtml = swap.deltas.map(d => `
            <div style="display:flex; align-items:center; gap:5px; font-size:11px; color:${d.delta > 0 ? '#4ade80' : '#f87171'};">
                <div style="width:6px; height:6px; border-radius:50%; flex-shrink:0; background:${d.delta > 0 ? '#4ade80' : '#f87171'};"></div>
                ${d.formatted}
            </div>`).join('');

        const scoreDiff = Math.round(swap.currEvalNew.score - swap.currEvalOld.score);

        return `
            <div style="flex: 1; min-width: 200px; background:var(--bg-panel); border-radius:8px; padding:11px; display:flex; flex-direction:column; gap:9px; border-top:2px solid var(--accent-gold); box-sizing:border-box;">
                <div style="display:flex; align-items:center; justify-content:space-between; gap:6px;">
                    <div style="position:relative; flex-shrink:0;">
                        <img src="${swap.currArt.icon}" style="width:52px; height:52px; border-radius: 8px; background-color: rgba(0, 0, 0, 0.1);">
                        <img src="${swap.currCharIcon}" style="position:absolute; bottom:-4px; right:-4px; width:30px; height:30px; border-radius:50%; border:1.5px solid var(--bg-panel);">
                    </div>
                    <span style="color:var(--accent-gold); font-size:16px;">⇒</span>
                    <div style="position:relative; flex-shrink:0;">
                        <img src="${swap.newArt.icon}" style="width:52px; height:52px; border-radius: 8px; background-color: rgba(0, 0, 0, 0.1);">
                        <img src="${swap.otherCharIcon}" style="position:absolute; bottom:-4px; right:-4px; width:30px; height:30px; border-radius:50%; border:1.5px solid var(--bg-panel);">
                    </div>
                </div>
                <div style="width:100%; height:1px; background:rgba(255,255,255,0.06);"></div>
                <div style="display:flex; flex-direction:column; gap:4px;">${deltasHtml}</div>
                <div style="width:100%; height:1px; background:rgba(255,255,255,0.06);"></div>
                <div style="display:flex; align-items:center; justify-content:center; gap:8px;">
                    <span style="font-size:13px; font-weight:bold; color:${(swap.currEvalOld.grade && swap.currEvalOld.grade.color) || '#888'};">${swap.currEvalOld.score}</span>
                    <span style="font-size:12px; color:#666;">→</span>
                    <span style="font-size:13px; font-weight:bold; color:${(swap.currEvalNew.grade && swap.currEvalNew.grade.color) || '#888'};">${swap.currEvalNew.score} <span style="font-size:11px; color:#c8a96e; font-weight:normal;">(${scoreDiff > 0 ? '+' : ''}${scoreDiff} pts)</span></span>
                </div>
            </div>`;
    });

    return `
        <div style="grid-column:1/-1; display:flex; flex-direction:column; gap:12px; margin-top: 24px; margin-bottom: 20px;">
            <p style="font-size:12px; color:var(--text-grey); text-transform:uppercase; letter-spacing:0.05em; margin:0;">${t('analysis.s3.p3.title')}</p>
            <p style="font-size: 14px; color:#ccc; line-height: 1.5; margin:0;">${t('analysis.s3.swap.desc')}</p>
        </div>
        <div style="grid-column:1/-1; width:100%; box-sizing:border-box; display:flex; flex-wrap:nowrap; gap:20px; overflow-x:auto;">
            ${cards.join('')}
        </div>
    `;
}
