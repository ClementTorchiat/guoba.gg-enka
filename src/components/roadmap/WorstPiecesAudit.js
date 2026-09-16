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

export function getAccountWorstPieces(characters, focusCharNom = null, mode = 'score') {
    if (!characters || characters.length === 0) return [];

    const allPieces = [];

    characters.forEach(perso => {
        const activeSets = Object.keys(perso.setsCounter || {}).filter(k => perso.setsCounter[k] >= 2);
        const config = perso.activeBuild ? { ...perso.charConfig, ...perso.activeBuild } : (perso.charConfig || {});
        const isFocusPerso = focusCharNom && perso.nom === focusCharNom;

        (perso.artefacts || []).forEach(art => {
            const isOffPiece = !activeSets.includes(art.setKey);
            const curScoreRaw = art.rawScore !== undefined ? art.rawScore : (art.score || 0);
            const score = art.score || 0; // Displayed string/percentage
            const mainKey = art.mainStat?.key || 'unknown';
            const estimate = getResinCostEstimate(art.type, mainKey, curScoreRaw);

            // Diagnostic tip
            let tip = t('roadmap.worst.tip.substats');
            let tipColor = '#eab308';

            if (art.type === 'EQUIP_BRACER' || art.type === 'EQUIP_NECKLACE') {
                if (curScoreRaw < 25) {
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

            if (isOffPiece && curScoreRaw < 20) {
                tip = t('roadmap.worst.tip.weakOffPiece');
                tipColor = '#3b82f6';
            }

            let critRate = 0;
            let critDmg = 0;
            (art.subStats || []).forEach(sub => {
                if (sub.key === 'critRate_') critRate = sub.value;
                if (sub.key === 'critDMG_') critDmg = sub.value;
            });
            const cv = parseFloat(((critRate * 2) + critDmg).toFixed(1));

            allPieces.push({
                persoNom: perso.nom,
                persoImage: perso.image,
                type: art.type,
                typeName: t('artifact.' + art.type),
                setName: art.setName || getLocalizedSetName(art.setKey, characters) || '',
                icon: art.icon,
                mainStatKey: mainKey,
                mainStatLabel: t('stat.' + mainKey) || art.mainStat?.label || mainKey,
                score,
                rawScore: curScoreRaw,
                grade: art.grade?.letter || '?',
                gradeColor: art.grade?.color || '#aaa',
                isOffPiece,
                estimate,
                tip,
                tipColor,
                isFocus: isFocusPerso,
                cv,
                critRate: parseFloat(critRate.toFixed(1)),
                critDmg: parseFloat(critDmg.toFixed(1))
            });
        });
    });

    // Tri : si perso focus, ses pires pièces d'abord, puis par mode
    allPieces.sort((a, b) => {
        if (focusCharNom) {
            const focusA = a.isFocus ? 1 : 0;
            const focusB = b.isFocus ? 1 : 0;
            if (focusA !== focusB) return focusB - focusA;
        }

        if (mode === 'cv') {
            return a.cv - b.cv; // Worst CV first
        } else {
            const rankA = GRADE_RANKS[a.grade] !== undefined ? GRADE_RANKS[a.grade] : 99;
            const rankB = GRADE_RANKS[b.grade] !== undefined ? GRADE_RANKS[b.grade] : 99;
            if (rankA !== rankB) return rankA - rankB;
            const aRaw = a.rawScore !== undefined ? a.rawScore : (a.score || 0);
            const bRaw = b.rawScore !== undefined ? b.rawScore : (b.score || 0);
            return aRaw - bRaw; // Worst raw score first
        }
    });

    return allPieces.slice(0, 6);
}

export function renderWorstPiecesAudit(characters, focusCharNom = null, mode = (typeof window !== 'undefined' ? window.roadmapWorstPiecesMode || 'score' : 'score')) {
    const worstPieces = getAccountWorstPieces(characters, focusCharNom, mode);
    const ICON_BASE_PATH = "/assets/simulator/icons/";

    return `
        <div class="roadmap-card" style="display:flex; flex-direction:column; gap:16px;">
            <div>
                <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">
                    <div>
                        <div style="display:flex; align-items:center; gap:8px;">
                            <h3 style="font-size:24px; font-weight:normal; color:var(--text-primary); margin:0;">${t('roadmap.worst.title')}</h3>
                        </div>
                        <p style="font-size:12px; color:var(--text-grey); margin:4px 0 0 0;">${t('roadmap.worst.desc')}</p>
                    </div>
                    <!-- Sélecteur CV / Score -->
                    <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                        <button data-action="set-worst-pieces-mode"
                                data-mode="score"
                                type="button"
                                style="display:inline-flex; align-items:center; padding:5px 11px; border-radius:8px; font-size:11px; font-weight:normal; cursor:pointer; transition:all 0.2s ease; border:${mode === 'score' ? '1px solid #3b82f6' : '1px solid rgba(255,255,255,0)'}; background:${mode === 'score' ? 'rgba(59,130,246,0.18)' : 'rgba(0,0,0,0.2)'}; color:${mode === 'score' ? '#60a5fa' : 'var(--text-grey)'};">
                            <span>${t('roadmap.best.modeScore')}</span>
                        </button>
                        <button data-action="set-worst-pieces-mode"
                                data-mode="cv"
                                type="button"
                                style="display:inline-flex; align-items:center; padding:5px 11px; border-radius:8px; font-size:11px; font-weight:normal; cursor:pointer; transition:all 0.2s ease; border:${mode === 'cv' ? '1px solid #3b82f6' : '1px solid rgba(255,255,255,0)'}; background:${mode === 'cv' ? 'rgba(59,130,246,0.18)' : 'rgba(0,0,0,0.2)'}; color:${mode === 'cv' ? '#60a5fa' : 'var(--text-grey)'};">
                            <span>${t('roadmap.best.modeCV')}</span>
                        </button>
                    </div>
                </div>
            </div>

            ${worstPieces.length === 0 ? `
                <div style="padding:16px; background:rgba(34,197,94,0.08); border:1px dashed rgba(34,197,94,0.3); border-radius:8px; color:#22c55e; font-size:13px; text-align:center;">
                    ${t('roadmap.worst.empty')}
                </div>
            ` : `
                <div style="display:flex; flex-direction:column; gap:10px;">
                    ${worstPieces.map((p, index) => `
                        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; padding:12px 14px; background:${p.isFocus ? 'rgba(59,130,246,0.08)' : 'var(--bg-panel)'}; border:${p.isFocus ? '1px solid rgba(59,130,246,0.2)' : '1px solid rgba(255,255,255,0)'}; border-radius:8px; gap:12px;">
                            <div style="display:flex; align-items:top; gap:10px; flex:1; min-width:180px;">
                                ${p.icon ? `<img src="${p.icon}" alt="${p.typeName}" style="width:34px; height:34px; border-radius:4px; object-fit:contain; flex-shrink:0; background:rgba(0,0,0,0.2);">` : ''}
                                <div style="display:flex; flex-direction:column;">
                                    <div style="display:flex; align-items:center; gap:6px;">
                                        <span style="font-size:13px; font-weight:600; color:var(--text-primary);">${p.typeName}</span>
                                        ${p.isOffPiece ? `<span style="font-size:9px; color:#22c55e; background:rgba(34,197,94,0.12); padding:1px 5px; border-radius:3px; border:1px solid rgba(34,197,94,0.25);">${t('roadmap.worst.offPieceBadge')}</span>` : ''}
                                    </div>
                                    <div style="display:flex; align-items:center; gap:4px; margin-top:3px;">
                                        <span style="font-size:11px; color:var(--text-grey);">${p.setName}</span>
                                    </div>
                                    <div style="display:flex; align-items:center; gap:6px; margin-top:4px;">
                                        <img src="${p.persoImage}" style="width:16px; height:16px; border-radius:2px; background:rgba(0,0,0,0.2);">
                                        <span style="font-size:11px; font-weight:500; color:${p.isFocus ? '#60a5fa' : 'var(--text-primary)'};">${p.persoNom}</span>
                                        <span style="font-size:11px; color:var(--text-grey);">•</span>
                                        <div style="display:flex; align-items:center; gap:3px;">
                                            <img src="${ICON_BASE_PATH}${ICON_MAP[p.mainStatKey] || ICON_MAP['unknown']}" style="width:12px; height:12px;" alt="">
                                            <span style="font-size:11px; color:var(--text-primary);">${p.mainStatLabel}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Score, Résine & Tag -->
                            <div style="display:flex; flex-direction:column; align-items:flex-end; gap:6px;">
                                ${mode === 'cv' ? `
                                    <div style="display:flex; flex-direction:column; align-items:flex-end;">
                                        <div style="font-size:16px; font-weight:800; color:#f59e0b;">
                                            ${p.cv} <span style="font-size:11px; color:#fbbf24; font-weight:normal;">CV</span>
                                        </div>
                                        <div style="font-size:10px; color:var(--text-grey); display:flex; gap:6px;">
                                            <span>CR: ${p.critRate}%</span>
                                            <span>CD: ${p.critDmg}%</span>
                                        </div>
                                    </div>
                                ` : `
                                    <div style="display:flex; align-items:center; gap:12px;">
                                        <div style="font-size:10px; color:var(--text-grey);">
                                            <span>${t('roadmap.worst.resinEstimate', p.estimate.resin, p.estimate.days)}</span>
                                        </div>
                                        <div style="min-width:60px; text-align:right;">
                                            <span style="font-size:16px; font-weight:800; color:${p.gradeColor};">${p.score}</span>
                                            <span style="font-size:11px; color:${p.gradeColor};">(${p.grade})</span>
                                        </div>
                                    </div>
                                    <div style="font-size:10px; color:${p.tipColor}; background:${p.tipColor}10; border:1px solid ${p.tipColor}30; padding:2px 6px; border-radius:4px; max-width:200px; text-align:right;">
                                        ${p.tip}
                                    </div>
                                `}
                            </div>

                        </div>
                    `).join('')}
                </div>
            `}
        </div>
    `;
}
