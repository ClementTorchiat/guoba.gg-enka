// src/components/roadmap/TeamAdvisor.js
import { t } from '../../scripts/i18n.js';
import { calculateCharacterScore, calculateMaxTheoreticalScore } from '../../scripts/scoring.js';
import DPS_LIST from '../../data/dps_list.json';
import CONFIG_NAME_ALIASES_EN_TO_FR from '../../data/config_name_aliases_en_to_fr.json';
import TEAMMATE_NAME_ALIASES from '../../data/teammate_name_aliases.json';
import { ALL_GAME_CHARACTERS, ENKA_ICON_MAP } from './allCharactersSetData.js';

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

const getInternalName = (nom) => {
    if (!nom) return nom;
    const clean = nom.trim();
    const resolved = resolveTeammate(clean);
    const mappedNom = CONFIG_NAME_ALIASES_EN_TO_FR[resolved] || CONFIG_NAME_ALIASES_EN_TO_FR[clean] || resolved;
    const cleanUnder = mappedNom.replace(/_/g, ' ');
    const charData = ALL_GAME_CHARACTERS.find(c =>
        c.nom === mappedNom ||
        c.id === mappedNom ||
        c.nom === clean ||
        c.id === clean ||
        c.nom === cleanUnder ||
        c.id === clean.replace(/ /g, '_')
    );
    return charData ? charData.id : mappedNom;
};

const findOwnedCharacter = (name, elem, characters) => {
    if (!name || !characters || characters.length === 0) return null;
    const resolved = resolveTeammate(name, elem);
    const internal = getInternalName(resolved) || getInternalName(name);
    return characters.find(c =>
        c.nom === resolved ||
        c.nom === name ||
        c.nom?.toLowerCase() === resolved?.toLowerCase() ||
        c.nom?.toLowerCase() === name?.toLowerCase() ||
        (internal && getInternalName(c.nom) === internal)
    ) || null;
};

const ELEMENT_COLORS = (typeof window !== 'undefined' && window.ELEMENT_COLORS) || {
    pyro: '#f87171', hydro: '#60a5fa', electro: '#c084fc', anemo: '#4ade80',
    cryo: '#93c5fd', geo: '#fcd34d', dendro: '#86efac'
};

export function renderTeamAdvisor(characters, focusCharNom = null) {
    if (!characters || characters.length === 0) return '';

    const dpsCharacters = characters.filter(c => {
        const internal = getInternalName(c.nom);
        return DPS_LIST.includes(internal);
    });

    if (dpsCharacters.length === 0) return '';

    const resolveTeammateNameFn = resolveTeammate;

    // 1. Évaluer tous les builds de tous les DPS disponibles
    const allCandidates = [];

    dpsCharacters.forEach(c => {
        if (!c.charConfig || !c.charConfig.builds) return;
        const dpsInternal = getInternalName(c.nom);

        Object.entries(c.charConfig.builds).forEach(([buildName, buildConfig]) => {
            if (!buildConfig.team || buildConfig.team.length === 0) return;

            const tempConfig = { ...c.charConfig, ...buildConfig };
            const clonedArtefacts = (c.artefacts || []).map(a => ({ ...a }));
            const simulation = calculateCharacterScore({ artefacts: clonedArtefacts }, tempConfig);
            const potential = calculateMaxTheoreticalScore({ artefacts: c.artefacts || [] }, tempConfig);

            let efficiency = 0;
            if (potential && potential.score > 0) {
                efficiency = parseFloat(((simulation.score / potential.score) * 100).toFixed(1));
            }
            const score = efficiency;

            const resolveBuildName = (bConfig, fallbackKey) => {
                if (!bConfig || !bConfig.name) return fallbackKey;
                const lang = typeof window !== 'undefined' && window.GUOBA_LANG ? window.GUOBA_LANG : 'fr';
                return bConfig.name[lang] || bConfig.name.en || bConfig.name.fr || fallbackKey;
            };
            const translatedBuildName = resolveBuildName(buildConfig, buildName);

            allCandidates.push({
                dps: c,
                dpsInternal,
                buildName,
                buildConfig,
                translatedBuildName,
                score
            });
        });
    });

    const noDuplicates = typeof window !== 'undefined' && window.roadmapNoDuplicateTeams;
    const onlyOwned = typeof window !== 'undefined' && window.roadmapOnlyOwnedTeams;

    // 2. Fonction de résolution d'une équipe contre une liste de personnages déjà bloqués
    const tryResolveTeam = (candidate, blockedInternals = new Set()) => {
        const { dps, dpsInternal, buildConfig, translatedBuildName, score } = candidate;

        // Le DPS est-il déjà utilisé ?
        const isDpsTraveler = dpsInternal.startsWith('Traveler_');
        if (blockedInternals.has(dpsInternal) || (isDpsTraveler && blockedInternals.has('__TRAVELER__'))) {
            return null;
        }

        const currentTeamInternals = new Set([dpsInternal]);
        if (isDpsTraveler) {
            currentTeamInternals.add('__TRAVELER__');
        }

        const rawSlots = (buildConfig.team || []).filter(slot => slot && slot.name);
        const resolvedSlots = [];

        for (const slot of rawSlots) {
            const names = Array.isArray(slot.name) ? slot.name : [slot.name];
            const elems = slot.element ? (Array.isArray(slot.element) ? slot.element : [slot.element]) : [];

            const availableCandidates = [];

            for (let i = 0; i < names.length; i++) {
                const n = names[i];
                const e = elems[i] || elems[0];
                const resolved = resolveTeammate(n, e);
                const internal = getInternalName(resolved) || getInternalName(n);
                const isTraveler = internal.startsWith('Traveler_');

                const isBlocked = blockedInternals.has(internal) ||
                    currentTeamInternals.has(internal) ||
                    (isTraveler && (blockedInternals.has('__TRAVELER__') || currentTeamInternals.has('__TRAVELER__')));

                if (!isBlocked) {
                    const ownedChar = findOwnedCharacter(n, e, characters);
                    // Si onlyOwned est activé, seuls les personnages possédés (vitrine ou archive) sont éligibles
                    if (onlyOwned && !ownedChar) {
                        continue;
                    }
                    availableCandidates.push({
                        name: n,
                        element: e,
                        internal,
                        isTraveler,
                        ownedChar,
                        inShowcase: !!ownedChar,
                        index: i
                    });
                }
            }

            if (availableCandidates.length === 0) {
                return null; // Aucun équipier possible pour ce slot sans créer de doublon
            }

            // Privilégier un personnage possédé dans la vitrine, sinon le premier choix de la liste
            const chosen = availableCandidates.find(cand => cand.inShowcase) || availableCandidates[0];
            resolvedSlots.push(chosen);
            currentTeamInternals.add(chosen.internal);
            if (chosen.isTraveler) {
                currentTeamInternals.add('__TRAVELER__');
            }
        }

        const showcaseCount = 1 + resolvedSlots.filter(s => s.inShowcase).length;

        let containsFocus = false;
        if (focusCharNom) {
            const focusInternal = getInternalName(focusCharNom);
            containsFocus = currentTeamInternals.has(focusInternal) ||
                (focusInternal.startsWith('Traveler_') && currentTeamInternals.has('__TRAVELER__'));
        }

        return {
            dps,
            dpsInternal,
            score,
            showcaseCount,
            containsFocus,
            allInternalNames: Array.from(currentTeamInternals),
            build: {
                name: translatedBuildName,
                config: buildConfig,
                score,
                showcaseCount,
                containsFocus,
                resolvedSlots
            }
        };
    };

    let topTeams = [];

    if (!noDuplicates) {
        // MODE NORMAL (doublons autorisés) :
        // Pour chaque DPS, on ne retient que son unique meilleur build
        const dpsBestTeams = [];
        const seenDps = new Set();

        const sortedCandidates = [...allCandidates].sort((a, b) => b.score - a.score);

        sortedCandidates.forEach(cand => {
            if (seenDps.has(cand.dpsInternal)) return;
            const resolved = tryResolveTeam(cand, new Set());
            if (resolved) {
                dpsBestTeams.push(resolved);
                seenDps.add(cand.dpsInternal);
            }
        });

        // Si focusCharNom, priorité à l'équipe le contenant
        if (focusCharNom) {
            const focusIndex = dpsBestTeams.findIndex(t => t.containsFocus);
            if (focusIndex > -1) {
                const focusTeam = dpsBestTeams.splice(focusIndex, 1)[0];
                dpsBestTeams.unshift(focusTeam);
            }
        }

        topTeams = dpsBestTeams.slice(0, 6);
    } else {
        // MODE SANS DOUBLONS ("Éviter les doublons") :
        const blockedInternalNames = new Set();
        const usedDpsInternals = new Set();

        // 1. Si focusCharNom présent, on sélectionne en priorité absolue sa meilleure équipe
        if (focusCharNom) {
            const sortedForFocus = [...allCandidates].sort((a, b) => b.score - a.score);
            for (const cand of sortedForFocus) {
                const resolved = tryResolveTeam(cand, new Set());
                if (resolved && resolved.containsFocus) {
                    topTeams.push(resolved);
                    usedDpsInternals.add(resolved.dpsInternal);
                    resolved.allInternalNames.forEach(id => blockedInternalNames.add(id));
                    break;
                }
            }
        }

        // 2. On parcourt tous les candidats triés par score décroissant pour compléter les équipes
        const sortedCandidates = [...allCandidates].sort((a, b) => b.score - a.score);

        for (const cand of sortedCandidates) {
            if (topTeams.length >= 6) break;
            if (usedDpsInternals.has(cand.dpsInternal)) continue; // 1 team max par DPS

            const resolved = tryResolveTeam(cand, blockedInternalNames);
            if (!resolved) continue; // Conflit de doublons : on examine le build suivant

            topTeams.push(resolved);
            usedDpsInternals.add(cand.dpsInternal);
            resolved.allInternalNames.forEach(id => blockedInternalNames.add(id));
        }
    }

    const renderSlot = (resolvedSlot) => {
        if (!resolvedSlot || !resolvedSlot.name) return '';
        const displayedName = resolvedSlot.name;
        const displayedElem = resolvedSlot.element;
        const inShowcase = resolvedSlot.inShowcase;
        const showcaseChar = resolvedSlot.ownedChar;

        const opacity = inShowcase ? '1' : '0.6';
        const filter = inShowcase ? 'none' : 'grayscale(70%)';

        let cleanIconKey = displayedName.replace(/_/g, ' ');
        let enkaKey = ENKA_ICON_MAP[displayedName] || ENKA_ICON_MAP[cleanIconKey] || displayedName;
        let iconPath = `https://enka.network/ui/UI_AvatarIcon_${enkaKey}.png`;
        if (showcaseChar && showcaseChar.image) {
            iconPath = showcaseChar.image.replace('Side_', '');
        }

        const bgStyle = displayedElem && ELEMENT_COLORS[displayedElem] ? `background: ${ELEMENT_COLORS[displayedElem]}` : 'background: #333';
        const resolvedDisplayName = resolveTeammate(displayedName, displayedElem);

        return `
            <div style="display:flex; flex-direction:column; align-items:center; gap:4px; opacity: ${opacity}; filter: ${filter}; width:58px; min-width:0; max-width:58px;">
                <img src="${iconPath}" alt="${displayedName}" style="width:58px; height:58px; border-radius:6px; ${bgStyle}; border: 2px solid var(--border-color); object-fit:cover;" onerror="this.src='/assets/simulator/icons/icon_unknown.webp'" decoding="async" title="${resolvedDisplayName}">
                <span style="font-size:11px; color:var(--text-grey); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; width:100%; text-align:center; display:block;" title="${resolvedDisplayName}">${resolvedDisplayName}</span>
            </div>
        `;
    };

    let btnOwnedStyle = 'display: inline-flex; align-items: center; padding: 5px 11px; border-radius: 8px; font-size: 11px; font-weight: normal; cursor: pointer; transition: all 0.2s ease; ';
    if (onlyOwned) {
        btnOwnedStyle += 'border: 1px solid #3b82f6; background: rgba(59, 130, 246, 0.18); color: #60a5fa;';
    } else {
        btnOwnedStyle += 'border: 1px solid rgba(255, 255, 255, 0); background: var(--shadow-subtle); color: var(--text-grey);';
    }

    let btnDupStyle = 'display: inline-flex; align-items: center; padding: 5px 11px; border-radius: 8px; font-size: 11px; font-weight: normal; cursor: pointer; transition: all 0.2s ease; ';
    if (noDuplicates) {
        btnDupStyle += 'border: 1px solid #3b82f6; background: rgba(59, 130, 246, 0.18); color: #60a5fa;';
    } else {
        btnDupStyle += 'border: 1px solid rgba(255, 255, 255, 0); background: var(--shadow-subtle); color: var(--text-grey);';
    }

    const headerHtml = `
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:8px;">
            <div style="display:flex; flex-direction:column; gap:4px;">
                <h3 style="font-size:24px; font-weight:normal; color:var(--text-primary); margin:0;">
                    ${t('roadmap.teams.title')}
                </h3>
                <p style="font-size:13px; color:var(--text-grey); margin:0;">
                    ${t('roadmap.teams.desc')}
                </p>
            </div>
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                <button data-action="toggle-roadmap-owned-teams" type="button" class="button-unlink" style="${btnOwnedStyle}">
                    ${t('roadmap.teams.onlyOwned')}
                </button>
                <button data-action="toggle-roadmap-duplicate-teams" type="button" class="button-unlink" style="${btnDupStyle}">
                    ${t('roadmap.teams.noDuplicates')}
                </button>
            </div>
        </div>
    `;

    if (topTeams.length === 0) {
        if (onlyOwned) {
            return `
                <div class="roadmap-card" style="display:flex; flex-direction:column; gap:16px;">
                    ${headerHtml}
                    <div style="padding:28px 20px; background:var(--bg-panel); border-radius:10px; border: 1px dashed var(--border-color); display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; gap:8px;">
                        <span style="font-size:14px; font-weight:500; color:var(--text-primary);">
                            ${t('roadmap.teams.emptyOwnedTitle')}
                        </span>
                        <p style="font-size:12px; color:var(--text-grey); max-width:540px; margin:0; line-height:1.5;">
                            ${t('roadmap.teams.emptyOwnedDesc')}
                        </p>
                    </div>
                </div>
            `;
        }
        return '';
    }

    return `
        <div class="roadmap-card" style="display:flex; flex-direction:column; gap:16px;">
            ${headerHtml}
            <div style="display:grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap:12px;">
                ${topTeams.map((teamData, index) => {
        const dps = teamData.dps;
        const build = teamData.build;
        const resolvedSlots = build.resolvedSlots || [];

        const dpsElem = dps.combatStats?.dmgBonusKey ? dps.combatStats.dmgBonusKey.replace('_dmg_', '') : 'pyro';
        const dpsBg = ELEMENT_COLORS[dpsElem] || '#333';
        const dpsIconPath = dps.image ? dps.image.replace('Side_', '') : `https://enka.network/ui/UI_AvatarIcon_${dps.nom}.png`;

        const isFocusTeam = focusCharNom && build.containsFocus && index === 0;
        const cardBg = isFocusTeam ? 'rgba(59,130,246,0.08)' : 'var(--bg-panel)';
        const cardBorder = isFocusTeam ? '1px solid rgba(59,130,246,0.4)' : '1px solid rgba(255,255,255,0)';

        return `
                        <div class="ob-grid-card" style="padding:16px; display:flex; flex-direction:column; gap:16px; background:${cardBg}; border-radius:10px; border: ${cardBorder}; position:relative;">
                            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                                <div style="display:flex; align-items:center; gap:8px;">
                                    <span style="font-size:14px; font-weight:normal; color:var(--text-primary);">
                                        #${index + 1} - ${dps.nom}
                                    </span>
                                    <span style="font-size:11px; padding:2px 6px; background:var(--shadow-subtle); border-radius:4px; color:var(--text-grey);">
                                        ${build.name}
                                    </span>
                                </div>
                                <div style="display:flex; align-items:center; gap:4px;">
                                    <span style="font-size:12px; font-weight:normal; color:var(--accent-gold);">
                                        ${build.score}%
                                    </span>
                                </div>
                            </div>
                            
                            <div style="display:flex; align-items:flex-start; gap:12px; justify-content:center;">
                                <div style="display:flex; flex-direction:column; align-items:center; gap:4px; width:58px; min-width:0; max-width:58px;">
                                    <img src="${dpsIconPath}" alt="${dps.nom}" style="width:58px; height:58px; border-radius:6px; background:${dpsBg}; border: 1px solid rgba(255, 255, 255, 0.5); object-fit:cover;" onerror="this.src='/assets/simulator/icons/icon_unknown.webp'" decoding="async" title="${resolveTeammateNameFn(dps.nom)}">
                                    <span style="font-size:11px; color:var(--text-primary); white-space:nowrap; font-weight:normal; overflow:hidden; text-overflow:ellipsis; width:100%; text-align:center; display:block;" title="${resolveTeammateNameFn(dps.nom)}">${resolveTeammateNameFn(dps.nom)}</span>
                                </div>
                                ${resolvedSlots.map(slot => renderSlot(slot)).join('')}
                            </div>
                        </div>
                    `;
    }).join('')}
            </div>
        </div>
    `;
}
