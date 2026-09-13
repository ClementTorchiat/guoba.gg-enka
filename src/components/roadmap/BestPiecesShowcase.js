// src/components/roadmap/BestPiecesShowcase.js
import { t } from '../../scripts/i18n.js';
import { ICON_MAP } from '../../scripts/icons.js';
import { getLocalizedSetName } from './DomainPlanner.js';

export function getTopArtifacts(characters, mode = 'cv', focusCharNom = null) {
    if (!characters || characters.length === 0) return [];

    const allPieces = [];

    characters.forEach(perso => {
        const isFocusPerso = focusCharNom && perso.nom === focusCharNom;
        const buildName = perso.activeBuild?.name || perso.charConfig?.buildName || '';

        (perso.artefacts || []).forEach(art => {
            const score = art.score || 0;
            const mainKey = art.mainStat?.key || 'unknown';

            let critRate = 0;
            let critDmg = 0;

            (art.subStats || []).forEach(sub => {
                if (sub.key === 'critRate_') critRate = sub.value;
                if (sub.key === 'critDMG_') critDmg = sub.value;
            });

            // Calculate CV
            const cv = (critRate * 2) + critDmg;

            allPieces.push({
                persoNom: perso.nom,
                persoImage: perso.image,
                buildName,
                type: art.type,
                typeName: t('artifact.' + art.type),
                setName: art.setName || getLocalizedSetName(art.setKey, characters) || '',
                icon: art.icon, // If artifact has an icon
                mainStatKey: mainKey,
                mainStatLabel: t('stat.' + mainKey) || art.mainStat?.label || mainKey,
                score,
                grade: art.grade?.letter || '?',
                gradeColor: art.grade?.color || '#aaa',
                cv: parseFloat(cv.toFixed(1)),
                critRate: parseFloat(critRate.toFixed(1)),
                critDmg: parseFloat(critDmg.toFixed(1)),
                isFocus: isFocusPerso
            });
        });
    });

    if (mode === 'cv') {
        allPieces.sort((a, b) => b.cv - a.cv);
    } else {
        allPieces.sort((a, b) => b.score - a.score);
    }

    return allPieces.slice(0, 6);
}

export function renderBestPiecesShowcase(characters, focusCharNom = null, mode = (typeof window !== 'undefined' ? window.roadmapBestPiecesMode || 'score' : 'score')) {
    const topPieces = getTopArtifacts(characters, mode, focusCharNom);
    const ICON_BASE_PATH = "/assets/simulator/icons/";

    return `
        <div class="roadmap-card" style="display:flex; flex-direction:column; gap:16px;">
            <div>
                <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">
                    <div>
                        <div style="display:flex; align-items:center; gap:8px;">
                            <h3 style="font-size:24px; font-weight:normal; color:var(--text-primary); margin:0;">${t('roadmap.best.title')}</h3>
                        </div>
                        <p style="font-size:12px; color:var(--text-grey); margin:4px 0 0 0;">${t('roadmap.best.desc')}</p>
                    </div>
                    <!-- Sélecteur CV / Score -->
                    <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                        <button data-action="set-best-pieces-mode"
                                data-mode="score"
                                type="button"
                                style="display:inline-flex; align-items:center; padding:5px 11px; border-radius:8px; font-size:11px; font-weight:normal; cursor:pointer; transition:all 0.2s ease; border:${mode === 'score' ? '1px solid #3b82f6' : '1px solid rgba(255,255,255,0)'}; background:${mode === 'score' ? 'rgba(59,130,246,0.18)' : 'rgba(0,0,0,0.2)'}; color:${mode === 'score' ? '#60a5fa' : 'var(--text-grey)'};">
                            <span>${t('roadmap.best.modeScore')}</span>
                        </button>
                        <button data-action="set-best-pieces-mode"
                                data-mode="cv"
                                type="button"
                                style="display:inline-flex; align-items:center; padding:5px 11px; border-radius:8px; font-size:11px; font-weight:normal; cursor:pointer; transition:all 0.2s ease; border:${mode === 'cv' ? '1px solid #3b82f6' : '1px solid rgba(255,255,255,0)'}; background:${mode === 'cv' ? 'rgba(59,130,246,0.18)' : 'rgba(0,0,0,0.2)'}; color:${mode === 'cv' ? '#60a5fa' : 'var(--text-grey)'};">
                            <span>${t('roadmap.best.modeCV')}</span>
                        </button>
                    </div>
                </div>
            </div>

            ${topPieces.length === 0 ? `
                <div style="padding:16px; background:rgba(0,0,0,0.2); border:1px dashed rgba(255,255,255,0.1); border-radius:8px; color:var(--text-grey); font-size:13px; text-align:center;">
                    ${t('roadmap.best.empty')}
                </div>
            ` : `                <div style="display:flex; flex-direction:column; gap:10px;">
                    ${topPieces.map((p, index) => {
        const rankColor = index === 0 ? '#f59e0b' : index === 1 ? '#cbd5e1' : index === 2 ? '#b45309' : 'var(--text-grey)';
        const rankBg = index === 0 ? 'rgba(245,158,11,0.15)' : index === 1 ? 'rgba(203,213,225,0.15)' : index === 2 ? 'rgba(180,83,9,0.15)' : 'transparent';
        return `
                        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; padding:12px 14px; background:${p.isFocus ? 'rgba(59,130,246,0.08)' : 'var(--bg-panel)'}; border:${p.isFocus ? '1px solid rgba(59,130,246,0.2)' : '1px solid rgba(255,255,255,0)'}; border-radius:8px; gap:12px;">
                            <div style="display:flex; align-items:top; gap:10px; flex:1; min-width:180px;">
                                ${p.icon ? `<img src="${p.icon}" alt="${p.typeName}" style="width:34px; height:34px; border-radius:4px; object-fit:contain; flex-shrink:0; background:rgba(0,0,0,0.2);">` : ''}
                                <div style="display:flex; flex-direction:column;">
                                    <div style="display:flex; align-items:center; gap:6px;">
                                        <span style="font-size:13px; font-weight:600; color:var(--text-primary);">${p.typeName}</span>
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

                            <!-- Value (Score or CV) -->
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
                                    <div style="display:flex; flex-direction:column; align-items:flex-end; gap:6px;">
                                        <div style="min-width:60px; text-align:right;">
                                            <span style="font-size:16px; font-weight:800; color:${p.gradeColor};">${p.score}</span>
                                            <span style="font-size:11px; color:${p.gradeColor};">(${p.grade})</span>
                                        </div>
                                    </div>
                                `}
                            </div>

                        </div>
                    `;
    }).join('')}
                </div>
            `}
        </div>
    `;
}
