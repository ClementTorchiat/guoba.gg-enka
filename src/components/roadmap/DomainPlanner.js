// src/components/roadmap/DomainPlanner.js
import { t, LANG } from '../../scripts/i18n.js';
import ARTIFACT_DOMAINS from '../../data/artifact_domains.json';
import SET_NAME_MAPPING from '../../data/set_name_mapping.json';
import { getNonVitrineCharactersForSet } from './allCharactersSetData.js';

export function getLocalizedSetName(setKey, characters = []) {
    if (!setKey) return '';
    const cleanKey = setKey.split(':')[0];

    // 1. Depuis un artéfact équipé dans characters
    if (characters && Array.isArray(characters)) {
        for (const perso of characters) {
            const match = (perso.artefacts || []).find(a => a.setKey === cleanKey);
            if (match && match.setName) return match.setName;
        }
    }

    // 2. Via window.HASH_TO_KEY et window.getText
    if (typeof window !== 'undefined' && window.HASH_TO_KEY && window.getText) {
        const hash = Object.keys(window.HASH_TO_KEY).find(h => window.HASH_TO_KEY[h] === cleanKey);
        if (hash) {
            const translated = window.getText(hash);
            if (translated && !translated.startsWith('Unknown')) {
                return translated;
            }
        }
    }

    // 3. Si langue FR, chercher dans SET_NAME_MAPPING
    if (LANG === 'fr') {
        const frEntry = Object.entries(SET_NAME_MAPPING).find(([frName, enKey]) => enKey === cleanKey);
        if (frEntry) return frEntry[0];
    }

    // 4. Si langue EN ou autre, formater le CamelCase en fallback
    if (LANG !== 'fr') {
        return cleanKey.replace(/([A-Z])/g, ' $1').trim();
    }

    const frEntry = Object.entries(SET_NAME_MAPPING).find(([frName, enKey]) => enKey === cleanKey);
    return frEntry ? frEntry[0] : cleanKey;
}

export function getSetIcon(setKey, characters = []) {
    if (!setKey) return null;
    const cleanKey = setKey.split(':')[0];

    // 1. Directement depuis les artéfacts équipés des personnages chargés
    if (characters && Array.isArray(characters)) {
        for (const perso of characters) {
            const match = (perso.artefacts || []).find(a => a.setKey === cleanKey);
            if (match && match.icon) return match.icon;
        }
    }

    // 2. Directement depuis window.ITEM_ICON_MAP
    if (typeof window !== 'undefined' && window.ITEM_ICON_MAP && window.ITEM_ICON_MAP[cleanKey]) {
        return window.ITEM_ICON_MAP[cleanKey];
    }

    // 3. Résolution via HASH_TO_KEY et iconToNameHash
    if (typeof window !== 'undefined' && window.HASH_TO_KEY && window.iconToNameHash) {
        const hash = Object.keys(window.HASH_TO_KEY).find(h => window.HASH_TO_KEY[h] === cleanKey);
        if (hash) {
            for (const [icon, h] of Object.entries(window.iconToNameHash)) {
                if (String(h) === String(hash)) {
                    let cleanIcon = icon.split('/').pop().replace('.png', '');
                    if (cleanIcon.startsWith('UI_RelicIcon')) {
                        const base = cleanIcon.substring(0, cleanIcon.lastIndexOf('_'));
                        return `https://enka.network/ui/${base}_4.png`;
                    } else {
                        return `https://enka.network/ui/${cleanIcon}.png`;
                    }
                }
            }
        }
    }

    return null;
}

export function calculateDomainRankings(characters, focusCharNom = null) {
    if (!characters || characters.length === 0) return [];

    const domainResults = [];

    ARTIFACT_DOMAINS.forEach(domain => {
        const set1Key = domain.sets[0];
        const set2Key = domain.sets[1];

        const set1Chars = [];
        const set2Chars = [];
        let totalScore = 0;
        let isFocusTarget = false;

        characters.forEach(perso => {
            const config = perso.activeBuild ? { ...perso.charConfig, ...perso.activeBuild } : (perso.charConfig || {});
            const bestSets = (config.bestSets || []).map(s => s.split(':')[0]);
            const isFocusPerso = focusCharNom && perso.nom === focusCharNom;

            // Set 1 - Uniquement BestSets
            if (bestSets.includes(set1Key)) {
                set1Chars.push({ perso, role: 'best', label: t('roadmap.domains.optimalSet'), isFocus: isFocusPerso });
                totalScore += 3.0;
                if (isFocusPerso) {
                    isFocusTarget = true;
                    totalScore += 20.0; // Boost majeur pour le perso focus
                }
            }

            // Set 2 - Uniquement BestSets
            if (bestSets.includes(set2Key)) {
                set2Chars.push({ perso, role: 'best', label: t('roadmap.domains.optimalSet'), isFocus: isFocusPerso });
                totalScore += 3.0;
                if (isFocusPerso) {
                    isFocusTarget = true;
                    totalScore += 20.0; // Boost majeur pour le perso focus
                }
            }
        });

        const bothSetsUseful = set1Chars.length > 0 && set2Chars.length > 0;
        if (bothSetsUseful) {
            totalScore += 2.0; // Bonus de rentabilité résine double
        }

        if (totalScore > 0) {
            let efficiencyKey = 'low';
            let efficiencyColor = '#94a3b8';
            if (isFocusTarget || totalScore >= 6.0 || (bothSetsUseful && totalScore >= 4.5)) {
                efficiencyKey = 'veryHigh';
                efficiencyColor = isFocusTarget ? '#3b82f6' : '#22c55e';
            } else if (totalScore >= 4.0) {
                efficiencyKey = 'high';
                efficiencyColor = '#3b82f6';
            } else if (totalScore >= 2.0) {
                efficiencyKey = 'medium';
                efficiencyColor = '#eab308';
            }

            const domainName = domain.name[LANG] || domain.name['en'] || domain.name['fr'] || domain.id;
            const regionName = domain.region[LANG] || domain.region['en'] || domain.region['fr'] || '';
            const set1Name = getLocalizedSetName(set1Key, characters);
            const set2Name = getLocalizedSetName(set2Key, characters);
            const set1Icon = getSetIcon(set1Key, characters);
            const set2Icon = getSetIcon(set2Key, characters);

            domainResults.push({
                domain,
                domainName,
                regionName,
                set1: { key: set1Key, name: set1Name, icon: set1Icon, chars: set1Chars },
                set2: { key: set2Key, name: set2Name, icon: set2Icon, chars: set2Chars },
                totalScore,
                bothSetsUseful,
                efficiencyKey,
                efficiencyColor,
                isFocusTarget
            });
        }
    });

    domainResults.sort((a, b) => b.totalScore - a.totalScore);

    return domainResults;
}

export function renderDomainPlanner(characters, focusCharNom = null, showAllChars = (typeof window !== 'undefined' ? !!window.roadmapShowAllDomainChars : false)) {
    const domains = calculateDomainRankings(characters, focusCharNom);

    return `
        <div class="roadmap-card" style="background:var(--bg-panel); border-radius:8px; padding:20px; display:flex; flex-direction:column; gap:16px;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">
                <div>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <h2 style="font-size:16px; font-weight:700; color:var(--text-primary); margin:0;">${t('roadmap.domains.title')}</h2>
                    </div>
                    <p style="font-size:12px; color:var(--text-grey); margin:4px 0 0 0;">${t('roadmap.domains.desc')}</p>
                </div>
                <!-- Sélecteur de portée : Vitrine vs Tous les persos -->
                <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                    <button data-action="set-domain-scope"
                            data-scope="showcase"
                            type="button"
                            style="display:inline-flex; align-items:center; padding:5px 11px; border-radius:8px; font-size:11px; font-weight:normal; cursor:pointer; transition:all 0.2s ease; border:${!showAllChars ? '1px solid #3b82f6' : '1px solid rgba(255,255,255,0)'}; background:${!showAllChars ? 'rgba(59,130,246,0.18)' : 'rgba(0,0,0,0.25)'}; color:${!showAllChars ? '#60a5fa' : 'var(--text-grey)'};">
                        <span>${t('roadmap.scope.showcase')}</span>
                    </button>
                    <button data-action="set-domain-scope"
                            data-scope="all"
                            type="button"
                            style="display:inline-flex; align-items:center; padding:5px 11px; border-radius:8px; font-size:11px; font-weight:normal; cursor:pointer; transition:all 0.2s ease; border:${showAllChars ? '1px solid #3b82f6' : '1px solid rgba(255,255,255,0)'}; background:${showAllChars ? 'rgba(59,130,246,0.18)' : 'rgba(0,0,0,0.25)'}; color:${showAllChars ? '#60a5fa' : 'var(--text-grey)'};">
                        <span>${t('roadmap.scope.allChars')}</span>
                    </button>
                </div>
            </div>

            ${domains.length === 0 ? `
                <div style="padding:16px; background:rgba(255,255,255,0.02); border:1px dashed rgba(255,255,255,0.1); border-radius:8px; color:var(--text-grey); font-size:13px; text-align:center;">
                    ${t('roadmap.domains.empty')}
                </div>
            ` : `
                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:14px;">
                    ${domains.slice(0, 3).map(d => {
        const nonVitrine1 = showAllChars ? getNonVitrineCharactersForSet(d.set1.key, characters) : [];
        const nonVitrine2 = showAllChars ? getNonVitrineCharactersForSet(d.set2.key, characters) : [];

        return `
                            <div style="background:${d.isFocusTarget ? 'rgba(59,130,246,0.08)' : 'rgba(0,0,0,0.2)'}; border:${d.isFocusTarget ? '1px solid rgba(59,130,246,0.4)' : '1px solid rgba(255,255,255,0)'}; border-radius:10px; padding:16px; display:flex; flex-direction:column; gap:12px; position:relative;">
                                <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">
                                    <div>
                                        <div style="font-size:14px; font-weight:700; color:var(--text-primary);">${d.domainName}</div>
                                        <div style="font-size:11px; color:var(--text-grey);">${d.regionName}</div>
                                    </div>
                                    <div style="display:flex; flex-direction:column; align-items:flex-end; gap:4px;">
                                        ${d.isFocusTarget ? `
                                            <span style="font-size:9px; font-weight:700; padding:2px 6px; border-radius:10px; background:rgba(59,130,246,0.2); color:#60a5fa; border:1px solid rgba(59,130,246,0.4); white-space:nowrap;">
                                                ${t('roadmap.focus.domainPriority')}
                                            </span>
                                        ` : ''}
                                        <span style="font-size:10px; font-weight:700; padding:3px 8px; border-radius:12px; background:${d.efficiencyColor}18; color:${d.efficiencyColor}; border:1px solid ${d.efficiencyColor}40; white-space:nowrap;">
                                            ${t('roadmap.domains.efficiency.' + d.efficiencyKey)}
                                        </span>
                                    </div>
                                </div>

                                ${d.bothSetsUseful ? `
                                    <div style="font-size:11px; font-weight:600; color:#22c55e; background:rgba(34,197,94,0.1); border:1px solid rgba(34,197,94,0.2); padding:4px 8px; border-radius:6px;">
                                        ${t('roadmap.domains.bothSetsUseful')}
                                    </div>
                                ` : ''}

                                <!-- Détail des 2 sets -->
                                <div style="display:flex; flex-direction:column; gap:8px; font-size:11px;">
                                    <!-- Set 1 -->
                                    <div style="background:rgba(255,255,255,0.02); padding:8px; border-radius:6px; border:1px solid rgba(255,255,255,0);">
                                        <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                                            ${d.set1.icon ? `<img src="${d.set1.icon}" alt="${d.set1.name}" style="width:22px; height:22px; border-radius:4px; object-fit:contain; background:rgba(0,0,0,0.3);" onerror="this.style.display='none'">` : ''}
                                            <span style="font-weight:600; color:var(--text-primary);">${d.set1.name}</span>
                                        </div>
                                        ${(d.set1.chars.length > 0 || nonVitrine1.length > 0) ? `
                                            <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                                                ${d.set1.chars.map(c => `
                                                    <img src="${c.perso.image}" alt="${c.perso.nom}" title="${c.perso.nom} (${c.label})" style="width:32px; height:32px; border-radius:4px; background:rgba(0,0,0,0.2); border:${c.isFocus ? '2px solid #60a5fa' : '1px solid rgba(255,255,255,0)'}; cursor:pointer;">
                                                `).join('')}
                                                ${nonVitrine1.map(c => {
            const cName = (LANG === 'fr' ? c.nom : (c.enName || c.nom));
            return `
                                                    <img src="${c.image}" alt="${cName}" title="${cName} (${t('roadmap.outsideShowcase')})" style="width:32px; height:32px; border-radius:4px; background:rgba(0,0,0,0.2); border:1px dashed rgba(255,255,255,0.15); opacity:0.45; filter:grayscale(20%);">
                                                `;
        }).join('')}
                                            </div>
                                        ` : `<span style="color:var(--text-grey); font-size:10px;">${t('roadmap.domains.noPriorityChar')}</span>`}
                                    </div>

                                    <!-- Set 2 -->
                                    <div style="background:rgba(255,255,255,0.02); padding:8px; border-radius:6px; border:1px solid rgba(255,255,255,0);">
                                        <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                                            ${d.set2.icon ? `<img src="${d.set2.icon}" alt="${d.set2.name}" style="width:22px; height:22px; border-radius:4px; object-fit:contain; background:rgba(0,0,0,0.3);" onerror="this.style.display='none'">` : ''}
                                            <span style="font-weight:600; color:var(--text-primary);">${d.set2.name}</span>
                                        </div>
                                        ${(d.set2.chars.length > 0 || nonVitrine2.length > 0) ? `
                                            <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                                                ${d.set2.chars.map(c => `
                                                    <img src="${c.perso.image}" alt="${c.perso.nom}" title="${c.perso.nom} (${c.label})" style="width:32px; height:32px; border-radius:4px; background:rgba(0,0,0,0.2); border:${c.isFocus ? '2px solid #60a5fa' : '1px solid rgba(255,255,255,0)'}; cursor:pointer;">
                                                `).join('')}
                                                ${nonVitrine2.map(c => {
            const cName = (LANG === 'fr' ? c.nom : (c.enName || c.nom));
            return `
                                                    <img src="${c.image}" alt="${cName}" title="${cName} (${t('roadmap.outsideShowcase')})" style="width:32px; height:32px; border-radius:4px; background:rgba(0,0,0,0.2); border:1px dashed rgba(255,255,255,0.15); opacity:0.45; filter:grayscale(20%);">
                                                `;
        }).join('')}
                                            </div>
                                        ` : `<span style="color:var(--text-grey); font-size:10px;">${t('roadmap.domains.noPriorityChar')}</span>`}
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
