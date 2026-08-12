// src/components/roadmap/WorstPiecesAudit.js
import { t } from '../../scripts/i18n.js';
import { getResinCostEstimate } from '../advice/PrioritiesAdvice.js';
import { ICON_MAP } from '../../scripts/icons.js';
import { getLocalizedSetName } from './DomainPlanner.js';

const GRADE_RANKS = {
    "F": 0, "F+": 1, "D": 2, "D+": 3, "C": 4, "C+": 5,
    "B": 6, "B+": 7, "A": 8, "A+": 9, "S": 10, "S+": 11,
    "SS": 12, "SS+": 13, "SSS": 14, "SSS+": 15, "WTF": 16, "WTF+": 17, "ARCHON": 18
};

export function getAccountWorstPieces(characters, focusCharNom = null) {
    if (!characters || characters.length === 0) return [];

    const allPieces = [];

    characters.forEach(perso => {
        const activeSets = Object.keys(perso.setsCounter || {}).filter(k => perso.setsCounter[k] >= 2);
        const config = perso.activeBuild ? { ...perso.charConfig, ...perso.activeBuild } : (perso.charConfig || {});
        const isFocusPerso = focusCharNom && perso.nom === focusCharNom;

        (perso.artefacts || []).forEach(art => {
            const isOffPiece = !activeSets.includes(art.setKey);
            const score = art.score || 0;
            const mainKey = art.mainStat?.key || 'unknown';
            const estimate = getResinCostEstimate(art.type, mainKey, score);

            // Diagnostic tip
            let tip = t('roadmap.worst.tip.substats');
            let tipColor = '#eab308';

            if (art.type === 'EQUIP_BRACER' || art.type === 'EQUIP_NECKLACE') {
                if (score < 25) {
                    tip = t('roadmap.worst.tip.flowerPlume');
                    tipColor = '#22c55e';
                }
            } else if (['EQUIP_SHOES', 'EQUIP_RING', 'EQUIP_DRESS'].includes(art.type)) {
                const idealStats = config.idealMainStats?.[art.type] || config.mainStats?.[art.type] || [];
                if (idealStats.length > 0 && !idealStats.includes(mainKey) && (config.weights?.[mainKey] || 0) < 0.5) {
                    tip = t('roadmap.worst.tip.badMainStat');
                    tipColor = '#ef4444';
                }
            }

            if (isOffPiece && score < 20) {
                tip = t('roadmap.worst.tip.weakOffPiece');
                tipColor = '#3b82f6';
            }

            allPieces.push({
                persoNom: perso.nom,
                persoImage: perso.image,
                type: art.type,
                typeName: t('artifact.' + art.type),
                setName: art.setName || getLocalizedSetName(art.setKey, characters) || '',
                mainStatKey: mainKey,
                mainStatLabel: t('stat.' + mainKey) || art.mainStat?.label || mainKey,
                score,
                grade: art.grade?.letter || '?',
                gradeColor: art.grade?.color || '#aaa',
                isOffPiece,
                estimate,
                tip,
                tipColor,
                isFocus: isFocusPerso
            });
        });
    });

    // Tri : si perso focus, ses pires pièces d'abord, puis par grade et score
    allPieces.sort((a, b) => {
        if (focusCharNom) {
            const focusA = a.isFocus ? 1 : 0;
            const focusB = b.isFocus ? 1 : 0;
            if (focusA !== focusB) return focusB - focusA;
        }
        const rankA = GRADE_RANKS[a.grade] !== undefined ? GRADE_RANKS[a.grade] : 99;
        const rankB = GRADE_RANKS[b.grade] !== undefined ? GRADE_RANKS[b.grade] : 99;
        if (rankA !== rankB) return rankA - rankB;
        return a.score - b.score;
    });

    return allPieces.slice(0, 6);
}

export function renderWorstPiecesAudit(characters, focusCharNom = null) {
    const worstPieces = getAccountWorstPieces(characters, focusCharNom);
    const ICON_BASE_PATH = "/assets/simulator/icons/";

    return `
        <div class="roadmap-card" style="background:var(--bg-panel); border-radius:8px; padding:20px; display:flex; flex-direction:column; gap:16px; justify-content: space-between;">
            <div>
                <div style="display:flex; align-items:center; gap:8px;">
                    <h2 style="font-size:16px; font-weight:700; color:var(--text-primary); margin:0;">${t('roadmap.worst.title')}</h2>
                </div>
                <p style="font-size:12px; color:var(--text-grey); margin:4px 0 0 0;">${t('roadmap.worst.desc')}</p>
            </div>

            ${worstPieces.length === 0 ? `
                <div style="padding:16px; background:rgba(34,197,94,0.08); border:1px dashed rgba(34,197,94,0.3); border-radius:8px; color:#22c55e; font-size:13px; text-align:center;">
                    ${t('roadmap.worst.empty')}
                </div>
            ` : `
                <div style="display:flex; flex-direction:column; gap:10px;">
                    ${worstPieces.map((p, index) => `
                        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; padding:12px 14px; background:${p.isFocus ? 'rgba(59,130,246,0.08)' : 'rgba(0,0,0,0.2)'}; border:${p.isFocus ? '1px solid rgba(59,130,246,0.2)' : '1px solid rgba(255,255,255,0)'}; border-radius:8px; gap:12px;">
                            
                            <!-- Perso & Rang -->
                            <div style="display:flex; align-items:center; gap:10px; min-width:160px;">
                                <span style="font-size:12px; font-weight:800; color:var(--text-grey); width:18px;">#${index + 1}</span>
                                <img src="${p.persoImage}" alt="${p.persoNom}" style="width:34px; height:34px; border-radius:6px; background:rgba(0,0,0,0.2); border:${p.isFocus ? '1px solid #60a5fa' : 'none'};">
                                <span style="font-size:13px; font-weight:600; color:${p.isFocus ? '#60a5fa' : 'var(--text-primary)'};">${p.persoNom}</span>
                            </div>

                            <!-- Pièce & MainStat -->
                            <div style="display:flex; align-items:center; gap:8px; flex:1; min-width:200px;">
                                <div style="display:flex; flex-direction:column;">
                                    <div style="display:flex; align-items:center; gap:6px;">
                                        <span style="font-size:12px; font-weight:600; color:var(--text-primary);">${p.typeName}</span>
                                        ${p.isOffPiece ? `<span style="font-size:9px; color:#22c55e; background:rgba(34,197,94,0.12); padding:1px 5px; border-radius:3px; border:1px solid rgba(34,197,94,0.25);">${t('roadmap.worst.offPieceBadge')}</span>` : ''}
                                    </div>
                                    <div style="display:flex; align-items:center; gap:4px; margin-top:2px;">
                                        <span style="font-size:10px; color:var(--text-grey);">${p.setName} •</span>
                                        <img src="${ICON_BASE_PATH}${ICON_MAP[p.mainStatKey] || ICON_MAP['unknown']}" style="width:11px; height:11px;" alt="">
                                        <span style="font-size:10px; color:var(--text-primary);">${p.mainStatLabel}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Diagnostic Tip -->
                            <div style="font-size:11px; color:${p.tipColor}; background:${p.tipColor}10; border:1px solid ${p.tipColor}30; padding:4px 8px; border-radius:6px; max-width:280px;">
                                ${p.tip}
                            </div>

                            <!-- Score & Estimation Résine -->
                            <div style="display:flex; align-items:center; gap:16px; text-align:right;">
                                <div style="font-size:10px; color:var(--text-grey);">
                                    <span>${t('roadmap.worst.resinEstimate', p.estimate.resin, p.estimate.days)}</span>
                                </div>
                                <div style="min-width:60px;">
                                    <span style="font-size:16px; font-weight:800; color:${p.gradeColor};">${p.score}</span>
                                    <span style="font-size:11px; color:${p.gradeColor};">(${p.grade})</span>
                                </div>
                            </div>

                        </div>
                    `).join('')}
                </div>
            `}
        </div>
    `;
}
