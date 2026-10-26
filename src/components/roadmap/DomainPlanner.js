// src/components/roadmap/DomainPlanner.js
import { t, LANG } from '../../scripts/i18n.js';
import ARTIFACT_DOMAINS from '../../data/artifact_domains.json';
import SET_NAME_MAPPING from '../../data/set_name_mapping.json';
import STRONGBOX_SETS from '../../data/strongbox_sets.json';
import { getNonVitrineCharactersForSet } from './allCharactersSetData.js';

export const GRADE_RANKS = {
    "F": 0, "F+": 1, "D": 2, "D+": 3, "C": 4, "C+": 5,
    "B": 6, "B+": 7, "A": 8, "A+": 9, "S": 10, "S+": 11,
    "SS": 12, "SS+": 13, "SSS": 14, "SSS+": 15, "WTF": 16, "WTF+": 17, "ARCHON": 18
};

export const VARIABLE_PIECES = ["EQUIP_SHOES", "EQUIP_RING", "EQUIP_DRESS"];

export const SLOT_SHORT_NAMES = {
    fr: {
        EQUIP_BRACER: 'Fleur',
        EQUIP_NECKLACE: 'Plume',
        EQUIP_SHOES: 'Sablier',
        EQUIP_RING: 'Coupe',
        EQUIP_DRESS: 'Casque'
    },
    en: {
        EQUIP_BRACER: 'Flower',
        EQUIP_NECKLACE: 'Plume',
        EQUIP_SHOES: 'Sands',
        EQUIP_RING: 'Goblet',
        EQUIP_DRESS: 'Circlet'
    }
};

export function getSlotShortName(slotType) {
    const lang = (LANG === 'en') ? 'en' : 'fr';
    return SLOT_SHORT_NAMES[lang]?.[slotType] || t('artifact.' + slotType) || slotType;
}

export function isBadMainStat(art, config) {
    if (!art || !VARIABLE_PIECES.includes(art.type)) {
        return false;
    }
    const mainKey = art.mainStat?.key;
    if (!mainKey) return true;

    const idealList = config.idealMainStats?.[art.type] || config.mainStats?.[art.type] || [];
    if (idealList.length > 0) {
        if (!idealList.includes(mainKey)) {
            let w = config.weights?.[mainKey];
            if (w === undefined && mainKey.includes('_dmg_')) {
                w = config.weights?.['elemental_dmg_'];
            }
            if ((w || 0) < 0.6) {
                return true;
            }
        }
    } else {
        let w = config.weights?.[mainKey];
        if (w === undefined && mainKey.includes('_dmg_')) {
            w = config.weights?.['elemental_dmg_'];
        }
        if ((w || 0) < 0.5) {
            return true;
        }
    }
    return false;
}

/**
 * Évalue si un personnage a un besoin réel d'amélioration pour un set donné.
 * Règle stricte demandée :
 * 1. Ne prendre en compte que les BestSets
 * 2. Si le 4p BestSet est déjà équipé et que toutes ses pièces sont >= A+ avec bonne stat principale :
 *    le personnage est TOTALEMENT RETIRÉ (aucun besoin).
 * 3. Si des pièces de ce set ont un Grade <= A ou une mauvaise stat principale :
 *    besoin d'amélioration identifié.
 * 4. Si le 4p n'est pas encore équipé :
 *    besoin majeur d'obtenir le set.
 */
export function evaluateCharacterNeedForSet(perso, setKey, allowOptimized = false) {
    if (!perso || !setKey) return null;
    const cleanKey = setKey.split(':')[0];

    const config = perso.activeBuild ? { ...perso.charConfig, ...perso.activeBuild } : (perso.charConfig || {});
    const rawBestSets = config.bestSets || [];
    const bestSetEntry = rawBestSets.find(s => s.split(':')[0] === cleanKey);

    // 1. Uniquement BestSets
    if (!bestSetEntry) {
        return null;
    }

    const targetPieces = bestSetEntry.includes(':2') ? 2 : 4;
    const bestSets = rawBestSets.map(s => s.split(':')[0]);

    const setsCounter = perso.setsCounter || {};
    const active4p = Object.keys(setsCounter).find(k => setsCounter[k] >= 4);

    // Si le personnage a déjà équipé un 4p BestSet complet, il ne cherche pas d'autre set
    if (active4p && rawBestSets.some(s => s.startsWith(active4p) && (s.includes(':4') || !s.includes(':2')))) {
        if (active4p !== cleanKey) {
            return null;
        }
    }

    if (targetPieces === 4) {
        // Pour un build 4p :
        // 1. Si le perso a déjà équipé des pièces d'un autre 4p BestSet (et 0 pièce de celui-ci), on priorise l'autre
        const other4pBestSetWithPieces = rawBestSets.find(s => {
            const k = s.split(':')[0];
            return k !== cleanKey && (s.includes(':4') || !s.includes(':2')) && (setsCounter[k] || 0) > 0;
        });
        if (other4pBestSetWithPieces && (setsCounter[cleanKey] || 0) === 0) {
            return null;
        }

        // 2. S'il n'a de pièces d'aucun BestSet, on ne cible que le 1er 4p BestSet pour ne pas diluer
        const first4pBestSet = rawBestSets.find(s => s.includes(':4') || !s.includes(':2'));
        if (first4pBestSet && first4pBestSet.split(':')[0] !== cleanKey && (setsCounter[cleanKey] || 0) === 0) {
            const hasAnyBestSetPieces = bestSets.some(b => (setsCounter[b] || 0) > 0);
            if (!hasAnyBestSetPieces) {
                return null;
            }
        }
    } else {
        // Pour un build 2p (ex: Nilou 2p Tenacity + 2p Vourukasha) :
        // Si le perso a déjà deux bonus 2p BestSets actifs différents de cleanKey, son build 2p/2p est déjà complet
        const active2pBestSets = rawBestSets
            .filter(s => s.includes(':2'))
            .map(s => s.split(':')[0])
            .filter(k => k !== cleanKey && (setsCounter[k] || 0) >= 2);

        if (active2pBestSets.length >= 2 && (setsCounter[cleanKey] || 0) === 0) {
            return null;
        }
    }

    const equippedCount = setsCounter[cleanKey] || 0;
    const hasTargetPieces = equippedCount >= targetPieces;
    const artefacts = perso.artefacts || [];
    const setPieces = artefacts.filter(a => a.setKey === cleanKey);

    const weakPieces = [];
    const weakSlotTypes = [];

    if (hasTargetPieces) {
        setPieces.forEach(art => {
            const letter = art.grade?.letter || 'F';
            const rank = GRADE_RANKS[letter] !== undefined ? GRADE_RANKS[letter] : 0;
            const badMain = isBadMainStat(art, config);
            if (rank <= 8 || badMain) { // Grade <= A ou mauvaise stat principale
                weakPieces.push(art);
                weakSlotTypes.push(art.type);
            }
        });

        // Consigne : si toutes les pièces sont A+ ou au-dessus avec bonne stat :
        if (weakPieces.length === 0) {
            if (!allowOptimized) {
                return null;
            }
            return {
                status: 'optimized',
                targetPieces,
                weakCount: 0,
                weakPieces: [],
                weakSlotTypes: [],
                equippedCount,
                hasTargetPieces: true,
                has4p: targetPieces === 4
            };
        }

        return {
            status: 'upgrade',
            targetPieces,
            weakCount: weakPieces.length,
            weakPieces,
            weakSlotTypes,
            equippedCount,
            hasTargetPieces: true,
            has4p: targetPieces === 4
        };
    } else {
        // N'a pas encore le nombre de pièces requis équipé (ex: < 4 pour 4p, < 2 pour 2p)
        const missingCount = Math.max(1, targetPieces - equippedCount);
        setPieces.forEach(art => {
            const letter = art.grade?.letter || 'F';
            const rank = GRADE_RANKS[letter] !== undefined ? GRADE_RANKS[letter] : 0;
            const badMain = isBadMainStat(art, config);
            if (rank <= 8 || badMain) {
                weakPieces.push(art);
                weakSlotTypes.push(art.type);
            }
        });

        return {
            status: 'incomplete',
            targetPieces,
            weakCount: missingCount + weakPieces.length,
            weakPieces,
            weakSlotTypes,
            equippedCount,
            hasTargetPieces: false,
            has4p: false
        };
    }
}

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
            if (match && match.icon) {
                if (typeof match.icon === 'string' && match.icon.includes('UI_RelicIcon_') && match.icon.endsWith('.png')) {
                    return match.icon.replace(/_[1-5]\.png$/, '_4.png');
                }
                return match.icon;
            }
        }
    }

    // 2. Directement depuis window.ITEM_ICON_MAP
    if (typeof window !== 'undefined' && window.ITEM_ICON_MAP && window.ITEM_ICON_MAP[cleanKey]) {
        const itemIcon = window.ITEM_ICON_MAP[cleanKey];
        if (typeof itemIcon === 'string' && itemIcon.includes('UI_RelicIcon_') && itemIcon.endsWith('.png')) {
            return itemIcon.replace(/_[1-5]\.png$/, '_4.png');
        }
        return itemIcon;
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

/**
 * Rendu d'un badge de set d'artéfact inline avec mini icône de fleur et nom en bleu #60a5fa,
 * soulignant l'ensemble du span (icône + nom de set).
 */
export function renderInlineSetBadge(setName, iconUrl, color = '#60a5fa') {
    if (!setName) return '';
    return `<span style="display:inline-flex; align-items:center; vertical-align:middle; gap:4px; color:${color}; font-weight:500; border-bottom:1px solid ${color}; padding-bottom:1px; line-height:1.2;">${iconUrl ? `<img src="${iconUrl}" alt="" style="width:14px; height:14px; border-radius:3px; object-fit:contain; display:inline-block; vertical-align:middle; background:rgba(255,255,255,0.05);" onerror="this.style.display='none'">` : ''}${setName}</span>`;
}

export function calculateDomainRankings(characters, focusCharNom = null, scope = 'priorities') {
    if (!characters || characters.length === 0) return [];

    const allowOptimized = (scope !== 'priorities');
    const domainResults = [];

    ARTIFACT_DOMAINS.forEach(domain => {
        const set1Key = domain.sets[0];
        const set2Key = domain.sets[1];

        const set1Chars = [];
        const set2Chars = [];
        let totalScore = 0;
        let isFocusTarget = false;

        characters.forEach(perso => {
            const isFocusPerso = focusCharNom && perso.nom === focusCharNom;

            // Set 1 - Évaluation du besoin
            const need1 = evaluateCharacterNeedForSet(perso, set1Key, allowOptimized);
            if (need1) {
                const weakSlotLabels = need1.weakSlotTypes.map(s => getSlotShortName(s));
                let label = '';
                if (need1.status === 'optimized') {
                    label = t('roadmap.domains.optimized');
                } else if (need1.status === 'incomplete') {
                    label = need1.targetPieces === 2 ? t('roadmap.domains.need2p') : t('roadmap.domains.need4p');
                } else {
                    label = weakSlotLabels.length > 0
                        ? `${t('roadmap.domains.needPiece', need1.weakCount)} (${weakSlotLabels.join(', ')})`
                        : t('roadmap.domains.needPiece', need1.weakCount);
                }

                set1Chars.push({
                    perso,
                    role: 'best',
                    need: need1,
                    label,
                    isFocus: isFocusPerso
                });

                let charScore = 0;
                if (need1.status === 'incomplete') {
                    charScore = (need1.targetPieces === 2 ? 2.5 : 4.0) + (need1.weakCount * 0.5);
                } else if (need1.status === 'upgrade') {
                    charScore = 2.5 + (need1.weakCount * 0.5);
                } else if (need1.status === 'optimized') {
                    charScore = 1.0;
                }
                totalScore += charScore;
                if (isFocusPerso) {
                    isFocusTarget = true;
                    totalScore += 25.0; // Boost majeur pour le perso focus
                }
            }

            // Set 2 - Évaluation du besoin
            const need2 = evaluateCharacterNeedForSet(perso, set2Key, allowOptimized);
            if (need2) {
                const weakSlotLabels = need2.weakSlotTypes.map(s => getSlotShortName(s));
                let label = '';
                if (need2.status === 'optimized') {
                    label = t('roadmap.domains.optimized');
                } else if (need2.status === 'incomplete') {
                    label = need2.targetPieces === 2 ? t('roadmap.domains.need2p') : t('roadmap.domains.need4p');
                } else {
                    label = weakSlotLabels.length > 0
                        ? `${t('roadmap.domains.needPiece', need2.weakCount)} (${weakSlotLabels.join(', ')})`
                        : t('roadmap.domains.needPiece', need2.weakCount);
                }

                set2Chars.push({
                    perso,
                    role: 'best',
                    need: need2,
                    label,
                    isFocus: isFocusPerso
                });

                let charScore = 0;
                if (need2.status === 'incomplete') {
                    charScore = (need2.targetPieces === 2 ? 2.5 : 4.0) + (need2.weakCount * 0.5);
                } else if (need2.status === 'upgrade') {
                    charScore = 2.5 + (need2.weakCount * 0.5);
                } else if (need2.status === 'optimized') {
                    charScore = 1.0;
                }
                totalScore += charScore;
                if (isFocusPerso) {
                    isFocusTarget = true;
                    totalScore += 25.0; // Boost majeur pour le perso focus
                }
            }
        });

        // Double utilité résine
        const bothSetsUseful = set1Chars.length > 0 && set2Chars.length > 0;
        if (bothSetsUseful) {
            totalScore += 6.0; // Bonus de rentabilité résine double
        }

        // Détection Donjon Piège (Asymétrique + disponible en boîte)
        let isResinTrap = false;
        let trapTargetSetKey = null;

        if (totalScore > 0 && !bothSetsUseful) {
            if (set1Chars.length > 0 && set2Chars.length === 0 && STRONGBOX_SETS.includes(set1Key)) {
                isResinTrap = true;
                trapTargetSetKey = set1Key;
                totalScore *= 0.5; // Pénalité : la synthèse mystique est bien plus rentable
            } else if (set2Chars.length > 0 && set1Chars.length === 0 && STRONGBOX_SETS.includes(set2Key)) {
                isResinTrap = true;
                trapTargetSetKey = set2Key;
                totalScore *= 0.5;
            }
        }

        if (totalScore > 0) {
            let efficiencyKey = 'low';
            let efficiencyColor = '#94a3b8';

            if (isResinTrap) {
                efficiencyKey = 'resinTrap';
                efficiencyColor = '#60a5fa';
            } else if (isFocusTarget || totalScore >= 7.0 || (bothSetsUseful && totalScore >= 5.0)) {
                efficiencyKey = 'veryHigh';
                efficiencyColor = isFocusTarget ? '#3b82f6' : 'var(--accent-green)';
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
            const trapTargetSetName = trapTargetSetKey ? getLocalizedSetName(trapTargetSetKey, characters) : '';
            const trapTargetSetIcon = trapTargetSetKey ? getSetIcon(trapTargetSetKey, characters) : null;
            const trapTargetSetBadge = trapTargetSetKey ? renderInlineSetBadge(trapTargetSetName, trapTargetSetIcon) : '';

            domainResults.push({
                domain,
                domainName,
                regionName,
                set1: { key: set1Key, name: set1Name, icon: set1Icon, chars: set1Chars },
                set2: { key: set2Key, name: set2Name, icon: set2Icon, chars: set2Chars },
                totalScore,
                bothSetsUseful,
                isResinTrap,
                trapTargetSetName,
                trapTargetSetBadge,
                efficiencyKey,
                efficiencyColor,
                isFocusTarget
            });
        }
    });

    domainResults.sort((a, b) => b.totalScore - a.totalScore);

    return domainResults;
}

export function renderDomainPlanner(characters, focusCharNom = null, scope = (typeof window !== 'undefined' ? (window.roadmapDomainScope || 'priorities') : 'priorities')) {
    const domains = calculateDomainRankings(characters, focusCharNom, scope);
    const showAllChars = (scope === 'all');

    return `
        <div class="roadmap-card" style="display:flex; flex-direction:column; gap:16px; height: 100%; box-sizing: border-box;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">
                <div>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <h3 style="font-size:24px; font-weight:normal; color:var(--text-primary); margin:0;">${t('roadmap.domains.title')}</h3>
                    </div>
                    <p style="font-size:12px; color:var(--text-grey); margin:4px 0 0 0;">${t('roadmap.domains.desc')}</p>
                </div>
                <!-- Sélecteur de portée : Priorités vs Vitrine vs Tous les persos -->
                <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                    <button data-action="set-domain-scope" 
                            data-scope="priorities" 
                            type="button" 
                            class="button-unlink"
                            style="display:inline-flex; align-items:center; padding:5px 11px; border-radius:8px; font-size:11px; font-weight:normal; cursor:pointer; transition:all 0.2s ease; border:${scope === 'priorities' ? '1px solid #3b82f6' : 'none'}; background:${scope === 'priorities' ? 'rgba(59,130,246,0.18)' : 'var(--shadow-subtle)'}; color:${scope === 'priorities' ? '#60a5fa' : 'var(--text-grey)'};">
                        <span>${t('roadmap.scope.priorities')}</span>
                    </button>
                    <button data-action="set-domain-scope" 
                            data-scope="showcase" 
                            type="button" 
                            class="button-unlink"
                            style="display:inline-flex; align-items:center; padding:5px 11px; border-radius:8px; font-size:11px; font-weight:normal; cursor:pointer; transition:all 0.2s ease; border:${scope === 'showcase' ? '1px solid #3b82f6' : 'none'}; background:${scope === 'showcase' ? 'rgba(59,130,246,0.18)' : 'var(--shadow-subtle)'}; color:${scope === 'showcase' ? '#60a5fa' : 'var(--text-grey)'};">
                        <span>${t('roadmap.scope.showcase')}</span>
                    </button>
                    <button data-action="set-domain-scope" 
                            data-scope="all" 
                            type="button" 
                            class="button-unlink"
                            style="display:inline-flex; align-items:center; padding:5px 11px; border-radius:8px; font-size:11px; font-weight:normal; cursor:pointer; transition:all 0.2s ease; border:${scope === 'all' ? '1px solid #3b82f6' : 'none'}; background:${scope === 'all' ? 'rgba(59,130,246,0.18)' : 'var(--shadow-subtle)'}; color:${scope === 'all' ? '#60a5fa' : 'var(--text-grey)'};">
                        <span>${t('roadmap.scope.allChars')}</span>
                    </button>
                </div>
            </div>

            ${domains.length === 0 ? `
                <div style="padding:16px; background:var(--shadow-subtle); border:1px dashed rgba(255,255,255,0.1); border-radius:8px; color:var(--text-grey); font-size:13px; text-align:center; flex-grow: 1;">
                    ${t('roadmap.domains.empty')}
                </div>
            ` : `
                <div style="display:flex; flex-direction:column; gap:14px; flex-grow: 1;">
                    ${domains.slice(0, 3).map(d => {
        const nonVitrine1 = showAllChars ? getNonVitrineCharactersForSet(d.set1.key, characters) : [];
        const nonVitrine2 = showAllChars ? getNonVitrineCharactersForSet(d.set2.key, characters) : [];

        return `
                            <div style="background:${d.isFocusTarget ? 'rgba(59,130,246,0.08)' : 'var(--bg-panel)'}; border:${d.isFocusTarget ? '1px solid rgba(59,130,246,0.4)' : 'none'}; border-radius:10px; padding:16px; display:flex; flex-direction:column; gap:12px; position:relative; flex-grow: 1;">
                                <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">
                                    <div>
                                        <div style="font-size:14px; font-weight:normal; color:var(--text-primary);">${d.domainName}</div>
                                        <div style="font-size:11px; color:var(--text-grey);">${d.regionName}</div>
                                    </div>
                                    <div style="display:flex; flex-direction:column; align-items:flex-end; gap:4px;">
                                        ${d.isFocusTarget ? `
                                            <span style="font-size:9px; font-weight:normal; padding:2px 6px; border-radius:10px; background:rgba(59,130,246,0.2); color:#60a5fa; border:none; white-space:nowrap;">
                                                ${t('roadmap.focus.domainPriority')}
                                            </span>
                                        ` : ''}
                                        <span style="font-size:10px; font-weight:normal; padding:3px 8px; border-radius:12px; background:${d.efficiencyColor}18; color:${d.efficiencyColor}; border:none; white-space:nowrap;">
                                            ${t('roadmap.domains.efficiency.' + d.efficiencyKey)}
                                        </span>
                                    </div>
                                </div>

                                ${d.bothSetsUseful ? `
                                    <div style="font-size:11px; font-weight:normal; color:var(--accent-green); background:rgba(34,197,94,0.1); border:none; padding:5px 9px; border-radius:6px; display:flex; align-items:center; gap:6px;">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style="width:14px; height:14px; flex-shrink:0;">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                        </svg>
                                        <span>${t('roadmap.domains.bothSetsUseful')}</span>
                                    </div>
                                ` : ''}

                                ${d.isResinTrap ? `
                                    <div style="font-size:11px; font-weight:normal; color:var(--text-grey); background:var(--shadow-subtle); padding:6px 10px; border-radius:6px; line-height:1.4;">
                                        ${t('roadmap.domains.trapWarning', d.trapTargetSetBadge || d.trapTargetSetName)}
                                    </div>
                                ` : ''}

                                <!-- Détail des 2 sets -->
                                <div style="display:flex; flex-direction:column; gap:8px; font-size:11px;">
                                    <!-- Set 1 -->
                                    <div style="background:var(--shadow-subtle); padding:8px; border-radius:6px; border:none;">
                                        <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                                            ${d.set1.icon ? `<img src="${d.set1.icon}" alt="${d.set1.name}" style="width:22px; height:22px; border-radius:4px; object-fit:contain; background:var(--shadow-subtle);" onerror="this.style.display='none'">` : ''}
                                            <span style="font-weight:normal; color:var(--text-primary);">${d.set1.name}</span>
                                        </div>
                                        ${(d.set1.chars.length > 0 || nonVitrine1.length > 0) ? `
                                            <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                                                 ${d.set1.chars.map(c => `
                                                    <div style="display:flex; align-items:center; gap:5px; background:var(--shadow-subtle); padding:3px 7px 3px 3px; border-radius:6px; border:${c.isFocus ? '1px solid #60a5fa' : 'none'}; cursor:pointer; transition:transform 0.15s ease;"
                                                         onmouseenter="window.showTargetPieceTooltip && window.showTargetPieceTooltip(this, '${c.perso.nom.replace(/'/g, "\\'")}', '${d.set1.key}')"
                                                         onmouseleave="window.scheduleHideTargetPieceTooltip && window.scheduleHideTargetPieceTooltip()">
                                                        <img src="${c.perso.image}" alt="${c.perso.nom}" style="width:24px; height:24px; border-radius:4px; background:var(--shadow-subtle);" onerror="this.src='/assets/simulator/icons/icon_unknown.webp'">
                                                        <div style="display:flex; flex-direction:column; line-height:1.15;">
                                                            <span style="font-size:11px; color:${c.isFocus ? '#93c5fd' : 'var(--text-primary)'}; font-weight:normal;">${c.perso.nom}</span>
                                                            <span style="font-size:9px; color:${c.need?.status === 'optimized' ? '#22c55e' : (c.need?.status === 'incomplete' ? '#fbbf24' : 'var(--text-grey)')}; font-weight:${c.need?.status === 'optimized' ? '500' : 'normal'};">${c.label}</span>
                                                        </div>
                                                    </div>
                                                `).join('')}
                                                ${nonVitrine1.map(c => {
            const cName = (LANG === 'fr' ? c.nom : (c.enName || c.nom));
            return `
                                                        <div style="display:flex; align-items:center; gap:5px; background:var(--shadow-subtle); padding:3px 7px 3px 3px; border-radius:6px; border:1px dashed rgba(255,255,255,0.15); opacity:0.6; filter:grayscale(20%); cursor:pointer; transition:transform 0.15s ease;"
                                                             onmouseenter="window.showTargetPieceTooltip && window.showTargetPieceTooltip(this, '${c.nom.replace(/'/g, "\\'")}', '${d.set1.key}')"
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
                                        ` : `<span style="color:var(--text-grey); font-size:10px;">${t('roadmap.domains.noPriorityChar')}</span>`}
                                    </div>

                                    <!-- Set 2 -->
                                    <div style="background:var(--shadow-subtle); padding:8px; border-radius:6px; border:none;">
                                        <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                                            ${d.set2.icon ? `<img src="${d.set2.icon}" alt="${d.set2.name}" style="width:22px; height:22px; border-radius:4px; object-fit:contain; background:var(--shadow-subtle);" onerror="this.style.display='none'">` : ''}
                                            <span style="font-weight:normal; color:var(--text-primary);">${d.set2.name}</span>
                                        </div>
                                        ${(d.set2.chars.length > 0 || nonVitrine2.length > 0) ? `
                                            <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                                                ${d.set2.chars.map(c => `
                                                    <div style="display:flex; align-items:center; gap:5px; background:var(--shadow-subtle); padding:3px 7px 3px 3px; border-radius:6px; border:${c.isFocus ? '1px solid #60a5fa' : 'none'}; cursor:pointer; transition:transform 0.15s ease;"
                                                         onmouseenter="window.showTargetPieceTooltip && window.showTargetPieceTooltip(this, '${c.perso.nom.replace(/'/g, "\\'")}', '${d.set2.key}')"
                                                         onmouseleave="window.scheduleHideTargetPieceTooltip && window.scheduleHideTargetPieceTooltip()">
                                                        <img src="${c.perso.image}" alt="${c.perso.nom}" style="width:24px; height:24px; border-radius:4px; background:var(--shadow-subtle);" onerror="this.src='/assets/simulator/icons/icon_unknown.webp'">
                                                        <div style="display:flex; flex-direction:column; line-height:1.15;">
                                                            <span style="font-size:11px; color:${c.isFocus ? '#93c5fd' : 'var(--text-primary)'}; font-weight:normal;">${c.perso.nom}</span>
                                                            <span style="font-size:9px; color:${c.need?.status === 'optimized' ? '#22c55e' : (c.need?.status === 'incomplete' ? '#fbbf24' : 'var(--text-grey)')}; font-weight:${c.need?.status === 'optimized' ? '500' : 'normal'};">${c.label}</span>
                                                        </div>
                                                    </div>
                                                `).join('')}
                                                ${nonVitrine2.map(c => {
            const cName = (LANG === 'fr' ? c.nom : (c.enName || c.nom));
            return `
                                                        <div style="display:flex; align-items:center; gap:5px; background:var(--shadow-subtle); padding:3px 7px 3px 3px; border-radius:6px; border:1px dashed rgba(255,255,255,0.15); opacity:0.6; filter:grayscale(20%); cursor:pointer; transition:transform 0.15s ease;"
                                                             onmouseenter="window.showTargetPieceTooltip && window.showTargetPieceTooltip(this, '${c.nom.replace(/'/g, "\\'")}', '${d.set2.key}')"
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
