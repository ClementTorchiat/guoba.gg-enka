// src/components/roadmap/StrongboxAdvisor.js
import { t, LANG } from '../../scripts/i18n.js';
import STRONGBOX_SETS from '../../data/strongbox_sets.json';
import ARTIFACT_DOMAINS from '../../data/artifact_domains.json';
import { getSetIcon, getLocalizedSetName } from './DomainPlanner.js';
import { getNonVitrineCharactersForSet } from './allCharactersSetData.js';

export function getStrongboxRecommendations(characters, focusCharNom = null) {
    if (!characters || characters.length === 0) return [];

    const setUsageMap = {};

    characters.forEach(perso => {
        const config = perso.activeBuild ? { ...perso.charConfig, ...perso.activeBuild } : (perso.charConfig || {});
        const bestSets = (config.bestSets || []).map(s => s.split(':')[0]);
        const activeSets = Object.keys(perso.setsCounter || {}).filter(k => perso.setsCounter[k] >= 2);
        const isFocus = focusCharNom && perso.nom === focusCharNom;

        // Uniquement BestSets
        bestSets.forEach(setKey => {
            if (!STRONGBOX_SETS.includes(setKey)) return;

            // Trouver le donjon associé
            const associatedDomain = ARTIFACT_DOMAINS.find(d => d.sets.includes(setKey));
            const domainName = associatedDomain?.name?.[LANG] || associatedDomain?.name?.['en'] || associatedDomain?.name?.['fr'] || t('roadmap.strongbox.dedicatedDomain');
            const otherSetKey = associatedDomain ? associatedDomain.sets.find(k => k !== setKey) : null;
            const otherSetName = otherSetKey ? getLocalizedSetName(otherSetKey, characters) : '';

            if (!setUsageMap[setKey]) {
                setUsageMap[setKey] = {
                    setKey,
                    setName: getLocalizedSetName(setKey, characters),
                    icon: getSetIcon(setKey, characters),
                    domainName,
                    otherSetName,
                    chars: [],
                    isBest: true,
                    isFocusTarget: false
                };
            }

            if (isFocus) {
                setUsageMap[setKey].isFocusTarget = true;
            }

            const isEquipped = activeSets.includes(setKey);
            const score = perso.evaluation?.score || 0;

            // Eviter les doublons de perso pour un même set
            if (!setUsageMap[setKey].chars.some(c => c.nom === perso.nom)) {
                setUsageMap[setKey].chars.push({
                    nom: perso.nom,
                    image: perso.image,
                    isBest: true,
                    isEquipped,
                    score,
                    isFocus
                });
            }
        });
    });

    const recommendations = Object.values(setUsageMap).filter(rec => rec.chars.length > 0);

    // Tri : priorité aux sets du personnage focus, puis au plus grand nombre de persos
    recommendations.sort((a, b) => {
        const focusA = a.isFocusTarget ? 100 : 0;
        const focusB = b.isFocusTarget ? 100 : 0;
        return (focusB + b.chars.length) - (focusA + a.chars.length);
    });

    return recommendations;
}

export function renderStrongboxAdvisor(characters, focusCharNom = null, showAllChars = (typeof window !== 'undefined' ? !!window.roadmapShowAllStrongboxChars : false)) {
    const recs = getStrongboxRecommendations(characters, focusCharNom);

    return `
        <div class="roadmap-card" style="background:var(--bg-panel); border-radius:8px; padding:20px; display:flex; flex-direction:column; gap:16px;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">
                <div>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <h2 style="font-size:16px; font-weight:700; color:var(--text-primary); margin:0;">${t('roadmap.strongbox.title')}</h2>
                    </div>
                    <p style="font-size:12px; color:var(--text-grey); margin:4px 0 0 0;">${t('roadmap.strongbox.desc')}</p>
                </div>
                <!-- Toggle Tous les persos -->
                <button data-action="toggle-strongbox-all-chars"
                        type="button"
                        title="${showAllChars ? t('roadmap.toggleAllChars.active') : t('roadmap.toggleAllChars.label')}"
                        style="display:inline-flex; align-items:center; gap:6px; padding:5px 11px; border-radius:8px; font-size:11px; font-weight:normal; cursor:pointer; transition:all 0.2s ease; border:${showAllChars ? '1px solid #3b82f6' : '1px solid rgba(255,255,255,0)'}; background:${showAllChars ? 'rgba(59,130,246,0.18)' : 'rgba(0,0,0,0.2)'}; color:${showAllChars ? '#60a5fa' : 'var(--text-grey)'};">
                    <span>${showAllChars ? t('roadmap.toggleAllChars.active') : t('roadmap.toggleAllChars.label')}</span>
                </button>
            </div>

            ${recs.length === 0 ? `
                <div style="padding:16px; background:rgba(255,255,255,0.02); border:1px dashed rgba(255,255,255,0.1); border-radius:8px; color:var(--text-grey); font-size:13px; text-align:center;">
                    ${t('roadmap.strongbox.empty')}
                </div>
            ` : `
                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:12px;">
                    ${recs.slice(0, 4).map(rec => {
        const nonVitrine = showAllChars ? getNonVitrineCharactersForSet(rec.setKey, characters) : [];

        return `
                            <div style="background:${rec.isFocusTarget ? 'rgba(168,85,247,0.08)' : 'rgba(0,0,0,0.2)'}; border:${rec.isFocusTarget ? '1px solid rgba(168,85,247,0.4)' : '1px solid rgba(255,255,255,0)'}; border-radius:10px; padding:14px; display:flex; flex-direction:column; gap:10px; position:relative;">
                                <div style="display:flex; justify-content:space-between; align-items:center;">
                                    <div style="display:flex; align-items:center; gap:8px;">
                                        ${rec.icon ? `<img src="${rec.icon}" alt="${rec.setName}" style="width:22px; height:22px; border-radius:4px; object-fit:contain; background:rgba(0,0,0,0.2);" onerror="this.style.display='none'">` : ''}
                                        <span style="font-size:13px; font-weight:700; color:var(--text-primary);">
                                            ${rec.setName}
                                        </span>
                                    </div>
                                    <div style="display:flex; align-items:center; gap:4px;">
                                        ${rec.isFocusTarget ? `
                                            <span style="font-size:9px; font-weight:700; padding:2px 6px; border-radius:10px; background:rgba(168,85,247,0.2); color:#c084fc; border:1px solid rgba(168,85,247,0.4); white-space:nowrap;">
                                                ${t('roadmap.focus.strongboxPriority')}
                                            </span>
                                        ` : `
                                            <span style="font-size:10px; font-weight:600; padding:2px 7px; border-radius:10px; background:rgba(168,85,247,0.15); color:#c084fc; border:1px solid rgba(168,85,247,0.3);">
                                                ${t('roadmap.strongbox.recommendedBadge')}
                                            </span>
                                        `}
                                    </div>
                                </div>

                                <div style="font-size:11px; color:var(--text-grey); background:rgba(255,255,255,0.02); padding:6px 10px; border-radius:6px;">
                                    ${t('roadmap.strongbox.avoidDomainNote', rec.domainName)}
                                </div>

                                <div>
                                    <div style="font-size:11px; color:var(--text-grey); margin-bottom:6px;">${t('roadmap.strongbox.targetChars')}</div>
                                    <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                                        ${rec.chars.map(c => `
                                            <div style="display:flex; align-items:center; gap:5px; background:${c.isFocus ? 'rgba(168,85,247,0.15)' : 'rgba(255,255,255,0.03)'}; padding:3px 8px 3px 3px; border-radius:6px; border:${c.isFocus ? '1px solid rgba(168,85,247,0.4)' : '1px solid rgba(255,255,255,0)'};">
                                                <img src="${c.image}" alt="${c.nom}" style="width:24px; height:24px; border-radius:4px; background:rgba(0,0,0,0.2);">
                                                <span style="font-size:11px; color:${c.isFocus ? '#d8b4fe' : 'var(--text-primary)'}; font-weight:${c.isFocus ? '700' : '500'};">${c.nom}</span>
                                            </div>
                                        `).join('')}
                                        ${nonVitrine.map(c => {
            const cName = (LANG === 'fr' ? c.nom : (c.enName || c.nom));
            return `
                                            <div style="display:flex; align-items:center; gap:5px; background:rgba(255,255,255,0.02); padding:3px 8px 3px 3px; border-radius:6px; border:1px dashed rgba(255,255,255,0.15); opacity:0.45; filter:grayscale(20%);" title="${cName} (${t('roadmap.outsideShowcase')})">
                                                <img src="${c.image}" alt="${cName}" style="width:24px; height:24px; border-radius:4px; background:rgba(0,0,0,0.2);">
                                                <span style="font-size:11px; color:var(--text-grey); font-weight:500;">${cName}</span>
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
