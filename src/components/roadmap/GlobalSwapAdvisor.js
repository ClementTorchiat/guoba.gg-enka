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
                        charA: { nom: charA.nom, image: charA.image, delta: deltaA, oldScore: scoreA_orig, newScore: evalA_new.score, isFocus: focusCharNom && charA.nom === focusCharNom },
                        charB: { nom: charB.nom, image: charB.image, delta: deltaB, oldScore: scoreB_orig, newScore: evalB_new.score, isFocus: focusCharNom && charB.nom === focusCharNom },
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

    return `
        <div class="roadmap-card" style="background:var(--bg-panel); border-radius:8px; padding:20px; display:flex; flex-direction:column; gap:16px;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:8px;">
                <div>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <h2 style="font-size:16px; font-weight:700; color:var(--text-primary); margin:0;">${t('roadmap.swaps.title')}</h2>
                    </div>
                    <p style="font-size:12px; color:var(--text-grey); margin:4px 0 0 0;">${t('roadmap.swaps.desc')}</p>
                </div>
            </div>

            ${swaps.length === 0 ? `
                <div style="padding:16px; background:rgba(34,197,94,0.08); border:1px dashed rgba(34,197,94,0.3); border-radius:8px; color:#22c55e; font-size:13px; text-align:center;">
                    ${t('roadmap.swaps.noSwaps')}
                </div>
            ` : `
                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:12px;">
                    ${swaps.slice(0, 4).map(swap => `
                        <div style="background:${swap.isFocusGain ? 'rgba(59,130,246,0.08)' : 'rgba(0,0,0,0.2)'}; border:${swap.isFocusGain ? '1px solid rgba(59,130,246,0.4)' : '0'}; border-radius:8px; padding:14px; display:flex; flex-direction:column; gap:10px; position:relative;">
                            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid var(--border-color); padding-bottom: 8px;">
                                <div style="display:flex; align-items:center; gap:8px;">
                                    ${swap.artA.icon || swap.artB.icon ? `
                                        <img src="${swap.artA.icon || swap.artB.icon}" alt="${swap.slotName}" style="width:28px; height:28px; border-radius:4px; object-fit:contain; background:rgba(0,0,0,0.2);">
                                    ` : ''}
                                    <span style="font-size:12px; font-weight:700; color:var(--text-primary);">
                                        ${swap.slotName}
                                    </span>
                                </div>
                                <div style="display:flex; align-items:center; gap:6px;">
                                    ${swap.isFocusGain ? `
                                        <span style="font-size:9px; font-weight:700; padding:2px 6px; border-radius:10px; background:rgba(59,130,246,0.2); color:#60a5fa; border:1px solid rgba(59,130,246,0.4); white-space:nowrap;">
                                            ${t('roadmap.swaps.focusGain', focusCharNom)}
                                        </span>
                                    ` : ''}
                                    <span style="font-size:11px; color:var(--text-grey); font-weight:500; max-width:160px; text-align:right; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${swap.artA.setName === swap.artB.setName ? swap.artA.setName : `${swap.artA.setName} / ${swap.artB.setName}`}">
                                        ${swap.artA.setName === swap.artB.setName ? swap.artA.setName : `${swap.artA.setName} / ${swap.artB.setName}`}
                                    </span>
                                </div>
                            </div>

                            <div style="display:flex; align-items:center; justify-content:space-between; border-radius:8px; gap:8px;">
                                <!-- Perso A -->
                                <div style="display:flex; align-items:center; gap:8px; flex:1; min-width:0;">
                                    <img src="${swap.charA.image}" alt="${swap.charA.nom}" style="width:42px; height:42px; border-radius:6px; background:rgba(0,0,0,0.2); flex-shrink:0; border:${swap.charA.isFocus ? '2px solid #60a5fa' : 'none'};">
                                    <div style="min-width:0;">
                                        <div style="font-size:12px; font-weight:600; color:${swap.charA.isFocus ? '#60a5fa' : 'var(--text-primary)'}; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${swap.charA.nom}</div>
                                        <div style="font-size:11px; font-weight:700; color:${swap.charA.delta >= 0 ? '#22c55e' : '#ef4444'};">
                                            ${swap.charA.delta >= 0 ? '+' : ''}${swap.charA.delta} pts
                                        </div>
                                    </div>
                                </div>

                                <div style="font-size:16px; color:var(--text-grey); flex-shrink:0;">⮂</div>

                                <!-- Perso B -->
                                <div style="display:flex; align-items:center; gap:8px; flex:1; min-width:0; justify-content:flex-end; text-align:right;">
                                    <div style="min-width:0;">
                                        <div style="font-size:12px; font-weight:600; color:${swap.charB.isFocus ? '#60a5fa' : 'var(--text-primary)'}; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${swap.charB.nom}</div>
                                        <div style="font-size:11px; font-weight:700; color:${swap.charB.delta >= 0 ? '#22c55e' : '#ef4444'};">
                                            ${swap.charB.delta >= 0 ? '+' : ''}${swap.charB.delta} pts
                                        </div>
                                    </div>
                                    <img src="${swap.charB.image}" alt="${swap.charB.nom}" style="width:42px; height:42px; border-radius:6px; background:rgba(0,0,0,0.2); flex-shrink:0; border:${swap.charB.isFocus ? '2px solid #60a5fa' : 'none'};">
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `}
        </div>
    `;
}
