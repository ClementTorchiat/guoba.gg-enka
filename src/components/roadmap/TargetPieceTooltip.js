// src/components/roadmap/TargetPieceTooltip.js
import { t, LANG } from '../../scripts/i18n.js';
import { computeIdealCardsData } from '../advice/IdealPiecesAdvice.js';
import { evaluateCharacterNeedForSet } from './DomainPlanner.js';
import { ALL_GAME_CHARACTERS, getRawCharacterConfig, ENKA_ICON_MAP } from './allCharactersSetData.js';
import { ICON_MAP } from '../../scripts/icons.js';
import CONFIG_NAME_ALIASES_EN_TO_FR from '../../data/config_name_aliases_en_to_fr.json';
import TEAMMATE_NAME_ALIASES from '../../data/teammate_name_aliases.json';

import ELEMENT_COLORS from '../../data/element_colors.json';

const ICON_BASE_PATH = "/assets/simulator/icons/";
const ARCHETYPE_ROLES = new Set(["Hexerei", "Lunar", "Stellar"]);

const resolveTeammate = (name, element = null) => {
    if (!name) return name;
    if (typeof window !== 'undefined' && typeof window.resolveTeammateName === 'function') {
        const res = window.resolveTeammateName(name, element);
        if (res && res !== name) return res;
    }
    if (name === "PlayerBoy" || name === "PlayerGirl" || name === "Traveler" || name === "Voyageur") {
        if (element) {
            const capElem = element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
            name = `Traveler ${capElem}`;
        }
    }
    const lang = (typeof window !== 'undefined' && window.GUOBA_LANG) || (typeof localStorage !== 'undefined' ? localStorage.getItem('guoba_lang') : null) || 'fr';
    const alias = (typeof window !== 'undefined' && window.TEAMMATE_NAME_ALIASES?.[name]) || TEAMMATE_NAME_ALIASES[name];
    if (alias) return alias[lang] ?? alias.en ?? alias.fr ?? name;
    if (lang === 'fr') {
        return CONFIG_NAME_ALIASES_EN_TO_FR[name] ?? name;
    }
    return name;
};

const getTeammateIconUrl = (name, elem, role) => {
    if (name) return `https://enka.network/ui/UI_AvatarIcon_${name}.png`;
    if (elem) return `${ICON_BASE_PATH}icon_${elem}.webp`;
    if (ARCHETYPE_ROLES.has(role)) return `${ICON_BASE_PATH}icon_role_${role.toLowerCase()}.svg`;
    return `${ICON_BASE_PATH}icon_empty_slot.svg`;
};

/**
 * Résout le personnage et son build correspondant au setKey donné.
 */
function resolveCharacterAndBuild(charNom, setKey) {
    if (!charNom || !setKey) return null;
    const cleanKey = setKey.split(':')[0];
    const cleanNom = charNom.toLowerCase().trim();

    // 1. Chercher dans les personnages de la vitrine
    const showcaseChars = (typeof window !== 'undefined' && window.globalPersoData && window.globalPersoData.length > 0)
        ? window.globalPersoData
        : [];
    let perso = showcaseChars.find(c => (c.nom || '').toLowerCase().trim() === cleanNom);

    let rawConfig = null;
    if (perso && perso.charConfig) {
        rawConfig = perso.charConfig;
    } else {
        rawConfig = getRawCharacterConfig(charNom);
    }

    if (!perso) {
        // Personnage hors vitrine : reconstruire un objet perso minimal
        const allEntry = ALL_GAME_CHARACTERS.find(c => (c.nom || '').toLowerCase().trim() === cleanNom || (c.id || '').toLowerCase() === cleanNom);
        let iconKey = allEntry ? allEntry.id : charNom;
        if (ENKA_ICON_MAP[iconKey]) iconKey = ENKA_ICON_MAP[iconKey];
        if (iconKey.startsWith('Traveler_')) iconKey = 'PlayerBoy';
        perso = {
            nom: allEntry ? allEntry.nom : charNom,
            image: allEntry ? allEntry.image : `https://enka.network/ui/UI_AvatarIcon_${iconKey}.png`,
            charConfig: rawConfig || {},
            artefacts: [],
            setsCounter: {}
        };
    }

    if (!rawConfig) {
        rawConfig = perso.charConfig || {};
    }

    // Déterminer le build :
    // Priorité 1 : Si le perso a un activeBuild dont les bestSets contiennent ce setKey
    let matchingBuild = null;
    let buildKey = null;

    if (perso.activeBuild && perso.activeBuild.bestSets && Array.isArray(perso.activeBuild.bestSets)) {
        if (perso.activeBuild.bestSets.some(s => s.split(':')[0] === cleanKey)) {
            matchingBuild = perso.activeBuild;
            buildKey = perso.activeBuild.key || 'active';
        }
    }

    // Priorité 2 : Chercher dans rawConfig.builds le premier build qui liste ce setKey dans bestSets
    if (!matchingBuild && rawConfig.builds && typeof rawConfig.builds === 'object') {
        for (const [k, b] of Object.entries(rawConfig.builds)) {
            if (b.bestSets && Array.isArray(b.bestSets) && b.bestSets.some(s => s.split(':')[0] === cleanKey)) {
                matchingBuild = { ...b, key: k };
                buildKey = k;
                break;
            }
        }
    }

    // Priorité 3 : Fallback vers perso.activeBuild ou le 1er build disponible
    if (!matchingBuild) {
        if (perso.activeBuild) {
            matchingBuild = perso.activeBuild;
            buildKey = perso.activeBuild.key || 'active';
        } else if (rawConfig.builds && Object.keys(rawConfig.builds).length > 0) {
            const firstKey = Object.keys(rawConfig.builds)[0];
            matchingBuild = { ...rawConfig.builds[firstKey], key: firstKey };
            buildKey = firstKey;
        } else {
            matchingBuild = {
                bestSets: rawConfig.bestSets || [cleanKey + ':4'],
                idealMainStats: rawConfig.idealMainStats || {},
                weights: rawConfig.weights || {}
            };
            buildKey = 'default';
        }
    }

    const mergedConfig = {
        ...rawConfig,
        ...matchingBuild,
        bestSets: matchingBuild.bestSets || rawConfig.bestSets || [cleanKey + ':4']
    };

    const lang = (typeof window !== 'undefined' && window.GUOBA_LANG) || 'fr';
    const buildName = (matchingBuild.name && (matchingBuild.name[lang] || matchingBuild.name.fr || matchingBuild.name.en))
        || matchingBuild.key
        || buildKey
        || 'Build Optimal';

    return {
        perso,
        rawConfig,
        matchingBuild,
        buildKey,
        mergedConfig,
        buildName,
        team: matchingBuild.team || []
    };
}

/**
 * Rendu d'une mini-carte d'artéfact "Ce qu'il faut viser".
 * Exacte reproduction miniature de IdealPiecesAdvice.js.
 */
function renderMiniTargetCard(card, slotStatus) {
    const isOffSet = card.targetSetKey === 'Hors-Set';

    // Rendu des stats principales
    const mainHtml = card.mainStats.map((m, idx) => {
        if (idx === 0) {
            return `
                <div style="display:flex; align-items:center; gap:5px;">
                    <img src="${ICON_BASE_PATH}${ICON_MAP[m.key] || ICON_MAP['unknown']}" style="width:13px; height:13px; flex-shrink:0;" alt="">
                    <span style="font-size:10px; color:var(--text-primary); line-height:1.2; font-weight:normal;">${m.label}</span>
                </div>`;
        } else {
            return `
                <div style="display:flex; align-items:center; gap:4px; margin-top:2px;">
                    <span style="color:var(--text-grey); font-size:9px; padding-left:1px;">↳ ${t('wtl.or')}</span>
                    <img src="${ICON_BASE_PATH}${ICON_MAP[m.key] || ICON_MAP['unknown']}" style="width:13px; height:13px; flex-shrink:0;" alt="">
                    <span style="font-size:10px; color:var(--text-primary); line-height:1.2; font-weight:normal;">${m.label}</span>
                </div>`;
        }
    }).join('');

    // Rendu des substats
    const subHtml = card.subSlots.map((sub, idx) => {
        const divider = idx < card.subSlots.length - 1 ? 'margin-bottom: 5px;' : '';

        if (sub.type === 'or') {
            const html = sub.keys.map((k, kIdx) => {
                if (kIdx === 0) {
                    return `
                        <div style="display:flex; align-items:center; gap:4px;">
                            <img src="${ICON_BASE_PATH}${ICON_MAP[k.key] || ICON_MAP['unknown']}" style="width:12px; height:12px; flex-shrink:0;" alt="">
                            <span style="font-size:9.5px; color:var(--text-primary); font-weight:normal;">${k.label}</span>
                        </div>`;
                } else {
                    return `
                        <div style="display:flex; align-items:center; gap:3px; margin-top:1px;">
                            <span style="color:var(--text-grey); font-size:8.5px; padding-left:1px;">↳ ${t('wtl.or')}</span>
                            <img src="${ICON_BASE_PATH}${ICON_MAP[k.key] || ICON_MAP['unknown']}" style="width:12px; height:12px; flex-shrink:0;" alt="">
                            <span style="font-size:9.5px; color:var(--text-primary); font-weight:normal;">${k.label}</span>
                        </div>`;
                }
            }).join('');
            return `<div style="${divider}">${html}</div>`;
        }

        if (sub.type === 'or_any') {
            return `
                <div style="${divider}">
                    <div style="display:flex; align-items:center; gap:4px;">
                        <img src="${ICON_BASE_PATH}${ICON_MAP[sub.key1.key] || ICON_MAP['unknown']}" style="width:12px; height:12px; flex-shrink:0;" alt="">
                        <span style="font-size:9.5px; color:var(--text-primary); font-weight:normal;">${sub.key1.label}</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:3px; margin-top:1px; opacity:0.6;">
                        <span style="color:var(--text-grey); font-size:8.5px; padding-left:1px;">↳ ${t('wtl.or')}</span>
                        <div style="width:12px; height:12px; border-radius:2px; border:1px dashed rgba(255,255,255,0.3); flex-shrink:0;"></div>
                        <span style="font-size:9px; font-style:italic;">${t('wtl.anyChoice')}</span>
                    </div>
                </div>`;
        }

        if (sub.type === 'pool') {
            return `
                <div style="${divider}">
                    <p style="font-size:9px; color:#c8a96e; margin:0 0 3px 0;">${t('wtl.chooseAmong', sub.count)}</p>
                    <div style="display:flex; flex-wrap:wrap; gap:3px; align-items:center;">
                        ${sub.keys.map(k => `
                            <div style="display:flex; align-items:center; gap:2px; background:rgba(255,255,255,0.05); padding:1px 3px; border-radius:3px; border:1px solid rgba(255,255,255,0.08);">
                                <img src="${ICON_BASE_PATH}${ICON_MAP[k.key] || ICON_MAP['unknown']}" style="width:10px; height:10px;" alt="">
                                <span style="font-size:8.5px; color:#ddd;">${k.label}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>`;
        }

        if (sub.type === 'any') {
            return `
                <div style="${divider}">
                    <div style="display:flex; align-items:center; gap:4px; opacity:0.4;">
                        <div style="width:12px; height:12px; border-radius:2px; border:1px solid rgba(255,255,255,0.3); flex-shrink:0;"></div>
                        <span style="font-size:9px; font-style:italic;">${t('wtl.anyChoice')}</span>
                    </div>
                </div>`;
        }

        return `
            <div style="${divider}">
                <div style="display:flex; align-items:center; gap:4px;">
                    <img src="${ICON_BASE_PATH}${ICON_MAP[sub.key] || ICON_MAP['unknown']}" style="width:12px; height:12px; flex-shrink:0;" alt="">
                    <span style="font-size:9.5px; color:var(--text-primary); font-weight:normal;">${sub.label}</span>
                </div>
            </div>`;
    }).join('');

    return `
        <div style="flex:1 1 0px; min-width:135px; box-sizing:border-box; border-radius:8px; padding:10px; display:flex; flex-direction:column; gap:0; background:var(--shadow-subtle); border:none;">
            
            <!-- Entête pièce : icône + nom de slot + nom de set + 5★ -->
            <div style="display:flex; align-items:center; gap:8px; padding-bottom:8px; border-bottom:1px solid rgba(255,255,255,0.08);">
                <div style="position:relative; display:inline-block; flex-shrink:0;">
                    <img src="${card.iconUrl}" style="width:30px; height:30px; border-radius:6px; border:1.5px solid #FFB13B; object-fit:cover; display:block;" alt="">
                    <p style="position:absolute; bottom:1px; right:1px; background:rgba(0,0,0,0.6); color:rgba(255,255,255,0.9); font-size:8px; padding:0 3px; border-radius:3px; margin:0; line-height:1.2;">+20</p>
                </div>
                <div style="overflow:hidden; display:flex; flex-direction:column; justify-content:center; gap:0; min-width:0; line-height:1.15;">
                    <p style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-size:11px; margin:0; color:var(--text-primary); font-weight:normal;">${card.pieceName}</p>
                    <p style="font-size:10px; color:${isOffSet ? 'var(--accent-gold)' : 'var(--accent-gold)'}; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin:0; font-weight:normal;">${card.setNameFR}</p>
                    <p style="font-size:8.5px; color:rgba(255,255,255,0.4); margin:0;">5★</p>
                </div>
            </div>

            <!-- Stats : Principale + Secondaires -->
            <div style="display:flex; flex-direction:column; padding-top:8px; gap:0;">
                <div style="border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:6px; margin-bottom:6px;">
                    ${mainHtml}
                </div>

                <div>
                    <div style="display:flex; flex-direction:column; gap:0;">
                        ${subHtml}
                    </div>
                </div>
            </div>

        </div>
    `;
}

let hideTimeout = null;
let currentTargetElement = null;
let currentTooltipState = { charNom: null, setKey: null, showAll: false };

function getOrCreateTargetPieceTooltip() {
    let tooltip = document.getElementById('roadmap-target-piece-tooltip');
    if (!tooltip && typeof document !== 'undefined') {
        tooltip = document.createElement('div');
        tooltip.id = 'roadmap-target-piece-tooltip';
        document.body.appendChild(tooltip);

        tooltip.addEventListener('mouseenter', () => {
            if (hideTimeout) {
                clearTimeout(hideTimeout);
                hideTimeout = null;
            }
        });

        tooltip.addEventListener('mouseleave', () => {
            window.scheduleHideTargetPieceTooltip();
        });
    }
    return tooltip;
}

/**
 * Affiche le mini-tooltip "Ce qu'il faut viser" pour un personnage donné.
 */
export function showTargetPieceTooltip(element, charNom, setKey, forceAll = false) {
    if (!element || !charNom || !setKey) return;

    if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
    }

    currentTargetElement = element;
    currentTooltipState = { charNom, setKey, showAll: forceAll };

    const resolved = resolveCharacterAndBuild(charNom, setKey);
    if (!resolved) return;

    const { perso, mergedConfig, buildName, team } = resolved;
    const cleanKey = setKey.split(':')[0];

    // Calculer les données idéales pour les 5 pièces
    const allCards = computeIdealCardsData(perso, mergedConfig);

    // Évaluer le besoin sur les pièces du personnage
    const need = evaluateCharacterNeedForSet(perso, setKey, true);
    const weakSlotTypes = need?.weakSlotTypes || [];
    const artefacts = perso.artefacts || [];

    // Déterminer le statut de chaque slot
    const slotStatusMap = {};
    const SLOT_ORDER_WTL = ["EQUIP_BRACER", "EQUIP_NECKLACE", "EQUIP_SHOES", "EQUIP_RING", "EQUIP_DRESS"];

    SLOT_ORDER_WTL.forEach(slotType => {
        const equippedArt = artefacts.find(a => a.type === slotType);
        const isTargetSet = equippedArt ? equippedArt.setKey === cleanKey : false;
        const isWeak = weakSlotTypes.includes(slotType);
        const isOptimized = equippedArt && !isWeak && isTargetSet;
        const isBadMain = isWeak && need?.weakPieces?.some(a => a.type === slotType && a.badMain);
        slotStatusMap[slotType] = { equippedArt, isTargetSet, isWeak, isOptimized, isBadMain };
    });

    // Déterminer quelles cartes afficher
    let displayCards = allCards;
    let isFiltered = false;

    if (!forceAll && need && need.status === 'upgrade' && weakSlotTypes.length > 0) {
        displayCards = allCards.filter(c => weakSlotTypes.includes(c.slotType));
        isFiltered = true;
    } else if (!forceAll && need && need.status === 'incomplete' && artefacts.length > 0) {
        // En statut incomplet : afficher les slots manquants du set et les slots faibles
        const missingOrWeakSlots = SLOT_ORDER_WTL.filter(s => {
            const status = slotStatusMap[s];
            return !status.isTargetSet || status.isWeak;
        });
        if (missingOrWeakSlots.length > 0 && missingOrWeakSlots.length < 5) {
            displayCards = allCards.filter(c => missingOrWeakSlots.includes(c.slotType));
            isFiltered = true;
        }
    }

    const tooltip = getOrCreateTargetPieceTooltip();
    if (!tooltip) return;

    // Rendu des coéquipiers
    let teamHtml = '';
    if (team && team.length > 0) {
        const matesAvatars = team.map(mate => {
            const mateName = resolveTeammate(mate.name, mate.element);
            const mateIcon = getTeammateIconUrl(mate.name, mate.element, mate.role);
            const mateElemKey = String(mate.element || '').toLowerCase();
            const mateColor = ELEMENT_COLORS[mateElemKey] || '#333';
            return `
                <div style="position:relative; width:22px; height:22px; border-radius:4px; background:${mateColor}; overflow:hidden; flex-shrink:0; border:1px solid rgba(255,255,255,0.25);" title="${mateName} (${mate.role || ''})">
                    <img src="${mateIcon}" alt="${mateName}" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.src='/assets/simulator/icons/icon_unknown.webp'">
                </div>
            `;
        }).join('');

        teamHtml = `
            <div style="display:flex; align-items:center; gap:5px;">
                <span style="font-size:10px; color:var(--text-grey);">${t('roadmap.tooltip.team', 'Équipe')} :</span>
                <div style="display:flex; align-items:center; gap:4px;">${matesAvatars}</div>
            </div>
        `;
    }

    // Badge de statut global du perso
    let statusPill = '';
    if (need?.status === 'optimized') {
        statusPill = `<span style="font-size:10px; color:#22c55e; background:rgba(34,197,94,0.12); padding:2px 7px; border-radius:10px; font-weight:normal;">${t('roadmap.domains.optimized', 'Optimisé')}</span>`;
    } else if (need?.status === 'incomplete') {
        statusPill = `<span style="font-size:10px; color:#fbbf24; background:rgba(251,191,36,0.12); padding:2px 7px; border-radius:10px; font-weight:normal;">${need.targetPieces === 2 ? t('roadmap.domains.need2p') : t('roadmap.domains.need4p')}</span>`;
    } else if (need?.status === 'upgrade') {
        statusPill = `<span style="font-size:10px; color:#60a5fa; background:rgba(59,130,246,0.12); padding:2px 7px; border-radius:10px; font-weight:normal;">${t('roadmap.domains.needPiece', need.weakCount)}</span>`;
    }

    // Bouton de bascule Voir tout / Pièces ciblées
    let toggleBtnHtml = '';
    if (isFiltered) {
        toggleBtnHtml = `
            <button type="button" 
                    onclick="window.toggleTargetPieceTooltipShowAll && window.toggleTargetPieceTooltipShowAll()"
                    style="background:none; border:none; color:#60a5fa; cursor:pointer; font-size:10px; padding:0; text-decoration:underline; font-family:'ShinShin', sans-serif;">
                ${t('roadmap.tooltip.showAll', 'Voir les 5 pièces')}
            </button>
        `;
    } else if (forceAll && weakSlotTypes.length > 0 && weakSlotTypes.length < 5) {
        toggleBtnHtml = `
            <button type="button" 
                    onclick="window.toggleTargetPieceTooltipShowAll && window.toggleTargetPieceTooltipShowAll()"
                    style="background:none; border:none; color:#60a5fa; cursor:pointer; font-size:10px; padding:0; text-decoration:underline; font-family:'ShinShin', sans-serif;">
                ${t('roadmap.tooltip.showTarget', 'Pièces ciblées uniquement')}
            </button>
        `;
    }

    const cardsHtml = displayCards.map(c => renderMiniTargetCard(c, slotStatusMap[c.slotType])).join('');

    tooltip.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:8px;">
            
            <!-- Entête : Perso + Status -->
            <div style="display:flex; justify-content:space-between; align-items:center; gap:12px;">
                <div style="display:flex; align-items:center; gap:8px;">
                    <img src="${perso.image ? perso.image.replace(/_Side_/g, '_').replace(/Side_/g, '') : ''}" alt="${perso.nom}" style="width:28px; height:28px; border-radius:5px; object-fit:cover; background:var(--shadow-subtle);" onerror="this.src='/assets/simulator/icons/icon_unknown.webp'">
                    <span style="font-size:13px; font-weight:normal; color:var(--text-primary);">${perso.nom}</span>
                </div>
                ${statusPill}
            </div>

            <!-- Barre Build & Team associée -->
            <div style="background:var(--shadow-subtle); padding:6px 10px; border-radius:6px; display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; border:none;">
                <div style="font-size:10.5px; color:var(--text-grey);">
                    ${t('roadmap.tooltip.build', 'Build')} : <span style="color:#60a5fa; font-weight:normal;">${buildName}</span>
                </div>
                ${teamHtml}
            </div>

            <!-- Sous-titre "Ce qu'il faut viser" + Bouton bascule -->
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:2px;">
                <div style="font-size:10px; color:var(--text-grey); text-transform:uppercase; letter-spacing:0.05em;">
                    ${t('analysis.s3.p2.title')} (${displayCards.length})
                </div>
                ${toggleBtnHtml}
            </div>

            <!-- Ligne des mini-cartes -->
            <div class="mini-target-cards-row" style="display:flex; flex-direction:row; gap:8px; width:100%; box-sizing:border-box; overflow-x:auto; padding-bottom:3px; max-width:min(90vw, 790px);">
                ${cardsHtml}
            </div>

        </div>
    `;

    // Positionnement
    tooltip.classList.remove('placement-top', 'placement-bottom');
    tooltip.style.visibility = 'hidden';
    tooltip.style.display = 'block';

    const rect = element.getBoundingClientRect();
    const tWidth = tooltip.offsetWidth || 340;
    const tHeight = tooltip.offsetHeight || 260;
    const gap = 8;
    const padding = 12;

    const spaceBelow = window.innerHeight - rect.bottom;
    const placeTop = spaceBelow < (tHeight + gap + 10) && rect.top > (tHeight + gap);

    const top = placeTop ? (rect.top - tHeight - gap) : (rect.bottom + gap);
    tooltip.classList.add(placeTop ? 'placement-top' : 'placement-bottom');

    const elemCenterX = rect.left + rect.width / 2;
    let left = elemCenterX - tWidth / 2;

    if (left < padding) {
        left = padding;
    } else if (left + tWidth > window.innerWidth - padding) {
        left = window.innerWidth - padding - tWidth;
    }

    const arrowX = Math.max(14, Math.min(tWidth - 14, elemCenterX - left));
    tooltip.style.setProperty('--arrow-left', arrowX + 'px');

    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
    tooltip.style.visibility = 'visible';
    tooltip.style.opacity = '1';
    tooltip.classList.add('is-active');
}

export function scheduleHideTargetPieceTooltip() {
    if (hideTimeout) clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
        window.hideTargetPieceTooltip();
    }, 180);
}

export function hideTargetPieceTooltip() {
    const tooltip = document.getElementById('roadmap-target-piece-tooltip');
    if (tooltip) {
        tooltip.classList.remove('is-active');
        tooltip.style.visibility = 'hidden';
        tooltip.style.opacity = '0';
    }
    currentTargetElement = null;
}

export function toggleTargetPieceTooltipShowAll() {
    if (currentTargetElement && currentTooltipState.charNom && currentTooltipState.setKey) {
        showTargetPieceTooltip(
            currentTargetElement,
            currentTooltipState.charNom,
            currentTooltipState.setKey,
            !currentTooltipState.showAll
        );
    }
}

// Attacher aux variables globales
if (typeof window !== 'undefined') {
    window.showTargetPieceTooltip = showTargetPieceTooltip;
    window.scheduleHideTargetPieceTooltip = scheduleHideTargetPieceTooltip;
    window.hideTargetPieceTooltip = hideTargetPieceTooltip;
    window.toggleTargetPieceTooltipShowAll = toggleTargetPieceTooltipShowAll;
}
