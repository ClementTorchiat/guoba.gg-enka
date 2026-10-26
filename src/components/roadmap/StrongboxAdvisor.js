// src/components/roadmap/StrongboxAdvisor.js
import { t, LANG } from '../../scripts/i18n.js';
import STRONGBOX_SETS from '../../data/strongbox_sets.json';
import ARTIFACT_DOMAINS from '../../data/artifact_domains.json';
import { getSetIcon, getLocalizedSetName, evaluateCharacterNeedForSet, getSlotShortName, renderInlineSetBadge } from './DomainPlanner.js';
import { getNonVitrineCharactersForSet } from './allCharactersSetData.js';

export function getStrongboxRecommendations(characters, focusCharNom = null, scope = 'priorities') {
    if (!characters || characters.length === 0) return [];

    const allowOptimized = (scope !== 'priorities');
    const setUsageMap = {};

    STRONGBOX_SETS.forEach(setKey => {
        const charsWithNeed = [];
        let isFocusTarget = false;
        let totalWeakCount = 0;

        characters.forEach(perso => {
            const need = evaluateCharacterNeedForSet(perso, setKey, allowOptimized);
            if (need) {
                const isFocus = focusCharNom && perso.nom === focusCharNom;
                if (isFocus) isFocusTarget = true;
                totalWeakCount += need.weakCount;

                const weakSlotLabels = need.weakSlotTypes.map(s => getSlotShortName(s));
                let label = '';
                if (need.status === 'optimized') {
                    label = t('roadmap.domains.optimized');
                } else if (need.status === 'incomplete') {
                    label = need.targetPieces === 2 ? t('roadmap.domains.need2p') : t('roadmap.domains.need4p');
                } else {
                    label = weakSlotLabels.length > 0
                        ? `${t('roadmap.domains.needPiece', need.weakCount)} (${weakSlotLabels.join(', ')})`
                        : t('roadmap.domains.needPiece', need.weakCount);
                }

                charsWithNeed.push({
                    nom: perso.nom,
                    image: perso.image,
                    need,
                    label,
                    isFocus
                });
            }
        });

        // Si aucun personnage de la vitrine n'a de besoin réel pour ce set, on l'exclut totalement
        if (charsWithNeed.length === 0) return;

        const setName = getLocalizedSetName(setKey, characters);
        const setIcon = getSetIcon(setKey, characters);
        const setBadge = renderInlineSetBadge(setName, setIcon);

        // Trouver le donjon associé
        const associatedDomain = ARTIFACT_DOMAINS.find(d => d.sets.includes(setKey));
        const domainName = associatedDomain?.name?.[LANG] || associatedDomain?.name?.['en'] || associatedDomain?.name?.['fr'] || null;
        const otherSetKey = associatedDomain ? associatedDomain.sets.find(k => k !== setKey) : null;
        const otherSetName = otherSetKey ? getLocalizedSetName(otherSetKey, characters) : '';
        const otherSetIcon = otherSetKey ? getSetIcon(otherSetKey, characters) : null;

        // Analyser si le 2ème set du donjon est utile pour le compte
        let otherSetHasBeneficiaries = false;
        if (otherSetKey) {
            otherSetHasBeneficiaries = characters.some(p => evaluateCharacterNeedForSet(p, otherSetKey, false) !== null);
        }

        // Le 2ème set indésirable est affiché en rouge #f87171, sinon en bleu #60a5fa
        const otherSetColor = otherSetHasBeneficiaries ? '#60a5fa' : '#f87171';
        const otherSetBadge = otherSetKey ? renderInlineSetBadge(otherSetName, otherSetIcon, otherSetColor) : '';

        // Typologie et scoring d'opportunité de synthèse :
        // 1. Donjon Piège (autre set inutile) -> SYNTHÈSE PRIORITAIRE (+45 pts)
        // 2. Set de Boss du monde (pas de donjon) -> SYNTHÈSE PRIORITAIRE (+35 pts)
        // 3. Donjon doublement rentable -> OPTIONNEL / ALTERNATIVE (le farm donjon est déjà excellent)
        let priorityType = 'recommended';
        let priorityBadgeText = t('roadmap.strongbox.badge.recommended');
        let priorityColor = '#c084fc';
        let explanationText = '';
        let boxScore = charsWithNeed.length * 10 + (totalWeakCount * 2);

        if (!associatedDomain) {
            priorityType = 'mustCraft';
            priorityBadgeText = t('roadmap.strongbox.badge.priority');
            priorityColor = '#fbbf24';
            explanationText = t('roadmap.strongbox.reasonBoss', setBadge);
            boxScore += 35;
        } else if (!otherSetHasBeneficiaries) {
            priorityType = 'mustCraft';
            priorityBadgeText = t('roadmap.strongbox.badge.priority');
            priorityColor = '#c084fc';
            explanationText = t('roadmap.strongbox.reasonDeadDomain', otherSetBadge, domainName, setBadge);
            boxScore += 45; // Très forte incitation : évite 50% de perte en donjon
        } else {
            priorityType = 'alternative';
            priorityBadgeText = t('roadmap.strongbox.badge.alternative');
            priorityColor = '#60a5fa';
            explanationText = t('roadmap.strongbox.reasonFarmableDomain', domainName, setBadge, otherSetBadge);
            boxScore -= 5;
        }

        if (isFocusTarget) {
            boxScore += 100;
        }

        setUsageMap[setKey] = {
            setKey,
            setName,
            icon: setIcon,
            domainName,
            otherSetKey,
            otherSetName,
            otherSetHasBeneficiaries,
            priorityType,
            priorityBadgeText,
            priorityColor,
            explanationText,
            chars: charsWithNeed,
            isFocusTarget,
            boxScore
        };
    });

    const recommendations = Object.values(setUsageMap);

    // Tri : priorité au plus haut score d'opportunité de synthèse
    recommendations.sort((a, b) => b.boxScore - a.boxScore);

    return recommendations;
}

export function renderStrongboxAdvisor(characters, focusCharNom = null, scope = (typeof window !== 'undefined' ? (window.roadmapStrongboxScope || 'priorities') : 'priorities')) {
    const recs = getStrongboxRecommendations(characters, focusCharNom, scope);
    const showAllChars = (scope === 'all');

    return `
        <div class="roadmap-card" style="display:flex; flex-direction:column; gap:16px; height: 100%; box-sizing: border-box;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">
                <div>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <h3 style="font-size:24px; font-weight:normal; color:var(--text-primary); margin:0;">${t('roadmap.strongbox.title')}</h3>
                    </div>
                    <p style="font-size:12px; color:var(--text-grey); margin:4px 0 0 0;">${t('roadmap.strongbox.desc')}</p>
                </div>
                <!-- Sélecteur de portée : Priorités vs Vitrine vs Tous les persos -->
                <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                    <button data-action="set-strongbox-scope" 
                            data-scope="priorities" 
                            type="button" 
                            class="button-unlink"
                            style="display:inline-flex; align-items:center; padding:5px 11px; border-radius:8px; font-size:11px; font-weight:normal; cursor:pointer; transition:all 0.2s ease; border:${scope === 'priorities' ? '1px solid #3b82f6' : 'none'}; background:${scope === 'priorities' ? 'rgba(59,130,246,0.18)' : 'var(--shadow-subtle)'}; color:${scope === 'priorities' ? '#60a5fa' : 'var(--text-grey)'};">
                        <span>${t('roadmap.scope.priorities')}</span>
                    </button>
                    <button data-action="set-strongbox-scope" 
                            data-scope="showcase" 
                            type="button" 
                            class="button-unlink"
                            style="display:inline-flex; align-items:center; padding:5px 11px; border-radius:8px; font-size:11px; font-weight:normal; cursor:pointer; transition:all 0.2s ease; border:${scope === 'showcase' ? '1px solid #3b82f6' : 'none'}; background:${scope === 'showcase' ? 'rgba(59,130,246,0.18)' : 'var(--shadow-subtle)'}; color:${scope === 'showcase' ? '#60a5fa' : 'var(--text-grey)'};">
                        <span>${t('roadmap.scope.showcase')}</span>
                    </button>
                    <button data-action="set-strongbox-scope" 
                            data-scope="all" 
                            type="button" 
                            class="button-unlink"
                            style="display:inline-flex; align-items:center; padding:5px 11px; border-radius:8px; font-size:11px; font-weight:normal; cursor:pointer; transition:all 0.2s ease; border:${scope === 'all' ? '1px solid #3b82f6' : 'none'}; background:${scope === 'all' ? 'rgba(59,130,246,0.18)' : 'var(--shadow-subtle)'}; color:${scope === 'all' ? '#60a5fa' : 'var(--text-grey)'};">
                        <span>${t('roadmap.scope.allChars')}</span>
                    </button>
                </div>
            </div>

            ${recs.length === 0 ? `
                <div style="padding:16px; background:var(--shadow-subtle); border:1px dashed rgba(255,255,255,0.1); border-radius:8px; color:var(--text-grey); font-size:13px; text-align:center; flex-grow: 1;">
                    ${t('roadmap.strongbox.empty')}
                </div>
            ` : `
                <div style="display:flex; flex-direction:column; gap:12px; flex-grow: 1;">
                    ${recs.slice(0, 4).map(rec => {
        const nonVitrine = showAllChars ? getNonVitrineCharactersForSet(rec.setKey, characters) : [];

        return `
                            <div style="background:${rec.isFocusTarget ? 'rgba(168,85,247,0.08)' : 'var(--bg-panel)'}; border:${rec.isFocusTarget ? '1px solid rgba(168,85,247,0.4)' : 'none'}; border-radius:10px; padding:14px; display:flex; flex-direction:column; gap:10px; position:relative; flex-grow: 1;">
                                <div style="display:flex; justify-content:space-between; align-items:center;">
                                    <div style="display:flex; align-items:center; gap:8px;">
                                        ${rec.icon ? `<img src="${rec.icon}" alt="${rec.setName}" style="width:22px; height:22px; border-radius:4px; object-fit:contain; background:var(--shadow-subtle);" onerror="this.style.display='none'">` : ''}
                                        <span style="font-size:13px; font-weight:normal; color:var(--text-primary);">
                                            ${rec.setName}
                                        </span>
                                    </div>
                                    <div style="display:flex; align-items:center; gap:4px;">
                                        ${rec.isFocusTarget ? `
                                            <span style="font-size:9px; font-weight:normal; padding:2px 6px; border-radius:10px; background:rgba(168,85,247,0.2); color:#c084fc; border:none; white-space:nowrap;">
                                                ${t('roadmap.focus.strongboxPriority')}
                                            </span>
                                        ` : ''}
                                        <span style="font-size:10px; font-weight:normal; padding:3px 8px; border-radius:12px; background:${rec.priorityColor}18; color:${rec.priorityColor}; border:none; white-space:nowrap;">
                                            ${rec.priorityBadgeText}
                                        </span>
                                    </div>
                                </div>

                                <!-- Note explicative informative -->
                                <div style="font-size:11px; color:var(--text-grey); background:var(--shadow-subtle); padding:7px 11px; border-radius:6px; line-height:1.5;">
                                    ${rec.explanationText}
                                </div>

                                <div>
                                    <div style="font-size:11px; color:var(--text-grey); margin-bottom:6px;">${t('roadmap.strongbox.targetChars')}</div>
                                    <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                                        ${rec.chars.map(c => `
                                            <div style="display:flex; align-items:center; gap:5px; background:${c.isFocus ? 'rgba(168,85,247,0.15)' : 'var(--shadow-subtle)'}; padding:3px 7px 3px 3px; border-radius:6px; border:${c.isFocus ? '1px solid rgba(168,85,247,0.4)' : 'none'}; cursor:pointer; transition:transform 0.15s ease;"
                                                 onmouseenter="window.showTargetPieceTooltip && window.showTargetPieceTooltip(this, '${c.nom.replace(/'/g, "\\'")}', '${rec.setKey}')"
                                                 onmouseleave="window.scheduleHideTargetPieceTooltip && window.scheduleHideTargetPieceTooltip()">
                                                <img src="${c.image}" alt="${c.nom}" style="width:24px; height:24px; border-radius:4px; background:var(--shadow-subtle);" onerror="this.src='/assets/simulator/icons/icon_unknown.webp'">
                                                <div style="display:flex; flex-direction:column; line-height:1.15;">
                                                    <span style="font-size:11px; color:${c.isFocus ? '#d8b4fe' : 'var(--text-primary)'}; font-weight:normal;">${c.nom}</span>
                                                    <span style="font-size:9px; color:${c.need?.status === 'optimized' ? '#22c55e' : (c.need?.status === 'incomplete' ? '#fbbf24' : 'var(--text-grey)')}; font-weight:${c.need?.status === 'optimized' ? '500' : 'normal'};">${c.label}</span>
                                                </div>
                                            </div>
                                        `).join('')}
                                        ${nonVitrine.map(c => {
            const cName = (LANG === 'fr' ? c.nom : (c.enName || c.nom));
            return `
                                            <div style="display:flex; align-items:center; gap:5px; background:var(--shadow-subtle); padding:3px 7px 3px 3px; border-radius:6px; border:1px dashed rgba(255,255,255,0.15); opacity:0.6; filter:grayscale(20%); cursor:pointer; transition:transform 0.15s ease;"
                                                 onmouseenter="window.showTargetPieceTooltip && window.showTargetPieceTooltip(this, '${c.nom.replace(/'/g, "\\'")}', '${rec.setKey}')"
                                                 onmouseleave="window.scheduleHideTargetPieceTooltip && window.scheduleHideTargetPieceTooltip()">
                                                <img src="${c.image}" alt="${cName}" style="width:24px; height:24px; border-radius:4px; background:var(--shadow-subtle);" onerror="this.src='/assets/simulator/icons/icon_unknown.webp'">
                                                <div style="display:flex; flex-direction:column; line-height:1.15;">
                                                    <span style="font-size:11px; color:var(--text-grey); font-weight:normal;">${cName}</span>
                                                    <span style="font-size:9px; color:var(--text-grey);">${t('roadmap.outsideShowcase')}</span>
                                                </div>
                                            </div>
                                        `;
        }).join('')}
                                    </div>
                                </div>
                            </div>
                        `;
    }).join('')}
                </div>
            `}
        </div>
    `;
}
