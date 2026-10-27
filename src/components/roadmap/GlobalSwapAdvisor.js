// src/components/roadmap/GlobalSwapAdvisor.js
import { t } from '../../scripts/i18n.js';
import { calculateCharacterScore } from '../../scripts/scoring.js';
import { getLocalizedSetName } from './DomainPlanner.js';

export function findGlobalProfitableSwaps(characters, focusCharNom = null) {
    if (!characters || characters.length < 2) return [];

    const SLOT_ORDER = ["EQUIP_BRACER", "EQUIP_NECKLACE", "EQUIP_SHOES", "EQUIP_RING", "EQUIP_DRESS"];
    const swapOpportunities = [];

    for (let i = 0; i < characters.length; i++) {
        const charA = characters[i];
        if (!charA.artefacts || charA.artefacts.length === 0) continue;
        const configA = { ...(charA.charConfig || {}), ...(charA.activeBuild || {}) };
        const scoreA_orig = charA.evaluation?.score || 0;

        for (let j = i + 1; j < characters.length; j++) {
            const charB = characters[j];
            if (!charB.artefacts || charB.artefacts.length === 0) continue;
            const configB = { ...(charB.charConfig || {}), ...(charB.activeBuild || {}) };
            const scoreB_orig = charB.evaluation?.score || 0;

            SLOT_ORDER.forEach(slotType => {
                const artIndexA = charA.artefacts.findIndex(a => a.type === slotType);
                const artIndexB = charB.artefacts.findIndex(a => a.type === slotType);
                if (artIndexA === -1 || artIndexB === -1) return;

                const artA = charA.artefacts[artIndexA];
                const artB = charB.artefacts[artIndexB];

                if (artA.mainStat.key !== artB.mainStat.key) return;

                if (artA.setKey && artB.setKey !== artA.setKey) {
                    const countA = (charA.setsCounter && charA.setsCounter[artA.setKey]) || 0;
                    if (countA === 4 || countA === 2) return;
                }

                if (artB.setKey && artA.setKey !== artB.setKey) {
                    const countB = (charB.setsCounter && charB.setsCounter[artB.setKey]) || 0;
                    if (countB === 4 || countB === 2) return;
                }

                // Échange A prend B, B prend A
                const fakeArtsA = charA.artefacts.map(a => ({ ...a }));
                fakeArtsA[artIndexA] = JSON.parse(JSON.stringify(artB));
                const fakePersoA = { ...charA, artefacts: fakeArtsA };
                const evalA_new = calculateCharacterScore(fakePersoA, configA);

                const fakeArtsB = charB.artefacts.map(b => ({ ...b }));
                fakeArtsB[artIndexB] = JSON.parse(JSON.stringify(artA));
                const fakePersoB = { ...charB, artefacts: fakeArtsB };
                const evalB_new = calculateCharacterScore(fakePersoB, configB);

                const deltaA = Math.round((evalA_new.score - scoreA_orig) * 10) / 10;
                const deltaB = Math.round((evalB_new.score - scoreB_orig) * 10) / 10;
                const netGain = Math.round((deltaA + deltaB) * 10) / 10;

                const isFocusInvolved = focusCharNom && (charA.nom === focusCharNom || charB.nom === focusCharNom);
                const isFocusGain = focusCharNom && ((charA.nom === focusCharNom && deltaA > 0) || (charB.nom === focusCharNom && deltaB > 0));

                // On ne garde que les swaps qui créent un gain net réel sans détruire l'un des deux personnages
                if (netGain >= 2.0 && (deltaA > 0 || deltaB > 0) && deltaA >= -5 && deltaB >= -5) {
                    const setA_name = artA.setName || getLocalizedSetName(artA.setKey, characters) || '';
                    const setB_name = artB.setName || getLocalizedSetName(artB.setKey, characters) || '';
                    swapOpportunities.push({
                        charA: { nom: charA.nom, image: charA.image ? charA.image.replace(/_Side_/g, '_').replace(/Side_/g, '') : '', delta: deltaA, oldScore: scoreA_orig, newScore: evalA_new.score, isFocus: focusCharNom && charA.nom === focusCharNom },
                        charB: { nom: charB.nom, image: charB.image ? charB.image.replace(/_Side_/g, '_').replace(/Side_/g, '') : '', delta: deltaB, oldScore: scoreB_orig, newScore: evalB_new.score, isFocus: focusCharNom && charB.nom === focusCharNom },
                        slotType,
                        slotName: t('artifact.' + slotType),
                        artA: { name: setA_name, setName: setA_name, icon: artA.icon, mainStat: artA.mainStat, score: artA.score },
                        artB: { name: setB_name, setName: setB_name, icon: artB.icon, mainStat: artB.mainStat, score: artB.score },
                        netGain,
                        isFocusInvolved,
                        isFocusGain
                    });
                }
            });
        }
    }

    // Tri : priorité aux swaps bénéficiant au perso focus, puis au gain net
    swapOpportunities.sort((a, b) => {
        const bonusA = (a.isFocusGain ? 100 : (a.isFocusInvolved ? 50 : 0));
        const bonusB = (b.isFocusGain ? 100 : (b.isFocusInvolved ? 50 : 0));
        return (bonusB + b.netGain) - (bonusA + a.netGain);
    });

    return swapOpportunities;
}

export function renderGlobalSwapAdvisor(characters, focusCharNom = null) {
    const swaps = findGlobalProfitableSwaps(characters, focusCharNom);

    const isExpanded = typeof window !== 'undefined' ? !!window.roadmapSwapsExpanded : false;
    const shouldShowToggle = swaps.length > 6;
    const visibleSwaps = (!isExpanded && shouldShowToggle) ? swaps.slice(0, 6) : swaps;

    return `
        <div class="roadmap-card" style="display:flex; flex-direction:column; gap:16px;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:8px;">
                <div>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <h3 style="font-size:24px; font-weight:normal; color:var(--text-primary); margin:0;">${t('roadmap.swaps.title')}</h3>
                    </div>
                    <p style="font-size:12px; color:var(--text-grey); margin:4px 0 0 0;">${t('roadmap.swaps.desc')}</p>
                </div>
            </div>

            ${swaps.length === 0 ? `
                <div style="padding:16px; background:rgba(34,197,94,0.08); border:1px dashed rgba(34,197,94,0.3); border-radius:8px; color:var(--accent-green); font-size:13px; text-align:center;">
                    ${t('roadmap.swaps.noSwaps')}
                </div>
            ` : `
                <div class="roadmap-swaps-grid">
                    ${visibleSwaps.map(swap => {
        const setA = swap.artA.setName;
        const setB = swap.artB.setName;
        const setLabel = (setA === setB)
            ? setA
            : (setA && setB ? `${setA} / ${setB}` : (setA || setB || ''));

        return `
                            <div style="background:var(--bg-panel); border-radius:8px; padding:6px; display:flex; flex-direction:column; justify-content:space-between; gap:6px; box-sizing:border-box; min-width:0; height:100%;">
                                <!-- En-tête : Pièce (slot + set) & Gain Net -->
                                <div style="display:flex; justify-content:space-between; align-items:center; min-height:30px; gap:8px;">
                                    <div style="display:flex; align-items:center; gap:8px; min-width:0; flex:1;">
                                        ${swap.artA.icon || swap.artB.icon ? `
                                            <img src="${swap.artA.icon || swap.artB.icon}" alt="${swap.slotName}" style="width:28px; height:28px; border-radius:4px; object-fit:contain; background:var(--shadow-subtle); flex-shrink:0;">
                                        ` : ''}
                                        <div style="min-width:0; display:flex; flex-direction:column;">
                                            <span style="font-size:13px; font-weight:normal; color:var(--text-primary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                                                ${swap.slotName}
                                            </span>
                                            <span style="font-size:10px; font-weight:normal; color:var(--text-grey); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${setLabel}">
                                                ${setLabel}
                                            </span>
                                        </div>
                                    </div>
                                    <div style="display:flex; align-items:center; gap:6px; flex-shrink:0;">
                                        ${swap.isFocusGain ? `
                                            <span style="font-size:9px; font-weight:normal; padding:2px 6px; border-radius:6px; background:rgba(59,130,246,0.2); color:#60a5fa; white-space:nowrap;">
                                                ${t('roadmap.swaps.focusGain', focusCharNom)}
                                            </span>
                                        ` : ''}
                                        <span style="font-size:11px; font-weight:normal; color:var(--accent-green); background:rgba(34,197,94,0.12); padding:2px 6px; border-radius:6px; white-space:nowrap;">
                                            +${swap.netGain} pts net
                                        </span>
                                    </div>
                                </div>

                                <!-- Sous-carte : Personnages & Évolution de score -->
                                <div style="background:var(--shadow-subtle); border-radius:6px; padding:8px 12px; display:grid; grid-template-columns:1fr auto 1fr; align-items:center; gap:8px; min-width:0;">
                                    <!-- Perso A -->
                                    <div style="display:flex; align-items:center; gap:8px; min-width:0;">
                                        <img src="${swap.charA.image}" alt="${swap.charA.nom}" style="width:38px; height:38px; border-radius:6px; object-fit:cover; flex-shrink:0; background:var(--bg-panel);" onerror="this.src='/assets/simulator/icons/icon_unknown.webp'">
                                        <div style="min-width:0; overflow:hidden;">
                                            <div style="font-size:13px; font-weight:normal; color:${swap.charA.isFocus ? '#60a5fa' : 'var(--text-primary)'}; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                                                ${swap.charA.nom}
                                            </div>
                                            <div style="font-size:11px; font-weight:normal; color:${swap.charA.delta >= 0 ? 'var(--accent-green)' : '#ef4444'}; white-space:nowrap;">
                                                ${swap.charA.delta >= 0 ? '+' : ''}${swap.charA.delta} pts
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Icône d'échange centrale -->
                                    <div style="display:flex; align-items:center; justify-content:center; color:var(--text-grey); flex-shrink:0; padding:0 4px;">
                                        <svg style="width:16px; height:16px; opacity:0.8;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                        </svg>
                                    </div>

                                    <!-- Perso B -->
                                    <div style="display:flex; align-items:center; justify-content:flex-end; gap:8px; min-width:0; text-align:right;">
                                        <div style="min-width:0; overflow:hidden;">
                                            <div style="font-size:13px; font-weight:normal; color:${swap.charB.isFocus ? '#60a5fa' : 'var(--text-primary)'}; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                                                ${swap.charB.nom}
                                            </div>
                                            <div style="font-size:11px; font-weight:normal; color:${swap.charB.delta >= 0 ? 'var(--accent-green)' : '#ef4444'}; white-space:nowrap;">
                                                ${swap.charB.delta >= 0 ? '+' : ''}${swap.charB.delta} pts
                                            </div>
                                        </div>
                                        <img src="${swap.charB.image}" alt="${swap.charB.nom}" style="width:38px; height:38px; border-radius:6px; object-fit:cover; flex-shrink:0; background:var(--bg-panel);" onerror="this.src='/assets/simulator/icons/icon_unknown.webp'">
                                    </div>
                                </div>
                            </div>
                        `;
    }).join('')}
                </div>

                ${shouldShowToggle ? `
                    <div style="display:flex; justify-content:center; margin-top:6px;">
                        <button data-action="toggle-swaps-expand"
                                type="button"
                                class="button-unlink hover-bg-hover"
                                style="display:inline-flex; align-items:center; gap:8px; padding:8px 18px; border-radius:8px; font-size:12px; font-weight:normal; cursor:pointer; background:var(--bg-panel); color:var(--text-primary); transition:all 0.2s ease;">
                            <span>${isExpanded ? t('roadmap.swaps.showLess') : t('roadmap.swaps.showAll', swaps.length)}</span>
                            <svg style="width:14px; height:14px; transition:transform 0.25s ease; transform:${isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'};" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                    </div>
                ` : ''}
            `}
        </div>
    `;
}
