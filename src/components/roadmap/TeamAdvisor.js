// src/components/roadmap/TeamAdvisor.js
import { t } from '../../scripts/i18n.js';
import { calculateCharacterScore, calculateMaxTheoreticalScore } from '../../scripts/scoring.js';
import DPS_LIST from '../../data/dps_list.json';
import CONFIG_NAME_ALIASES_EN_TO_FR from '../../data/config_name_aliases_en_to_fr.json';
import { ALL_GAME_CHARACTERS } from './allCharactersSetData.js';

const getInternalName = (nom) => {
    if (!nom) return nom;
    const mappedNom = CONFIG_NAME_ALIASES_EN_TO_FR[nom] || nom;
    const charData = ALL_GAME_CHARACTERS.find(c => c.nom === mappedNom);
    return charData ? charData.id : mappedNom;
};

const ELEMENT_COLORS = (typeof window !== 'undefined' && window.ELEMENT_COLORS) || {
    pyro: '#f87171', hydro: '#60a5fa', electro: '#c084fc', anemo: '#4ade80',
    cryo: '#93c5fd', geo: '#fcd34d', dendro: '#86efac'
};

export function renderTeamAdvisor(characters, focusCharNom = null) {
    if (!characters || characters.length === 0) return '';

    const showcaseNames = characters.map(c => c.nom);
    const dpsCharacters = characters.filter(c => {
        const internal = getInternalName(c.nom);
        return DPS_LIST.includes(internal);
    });

    if (dpsCharacters.length === 0) return '';

    const resolveTeammateNameFn = (typeof window !== 'undefined' && window.resolveTeammateName) ? window.resolveTeammateName : (n => n);

    const evaluatedTeams = [];

    dpsCharacters.forEach(c => {
        if (!c.charConfig || !c.charConfig.builds) return;

        let bestBuild = null;
        let bestScore = -1;
        let bestShowcaseCount = -1;

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
            let score = efficiency;

            let showcaseCount = 1;
            let containsFocus = getInternalName(c.nom) === getInternalName(focusCharNom);
            const activeTeamNames = [c.nom];
            
            const resolveBuildName = (buildConfig, fallbackKey) => {
                if (!buildConfig || !buildConfig.name) return fallbackKey;
                const lang = typeof window !== 'undefined' && window.GUOBA_LANG ? window.GUOBA_LANG : 'fr';
                return buildConfig.name[lang] || buildConfig.name.en || buildConfig.name.fr || fallbackKey;
            };
            const translatedBuildName = resolveBuildName(buildConfig, buildName);
            
            buildConfig.team.forEach(slot => {
                if (!slot.name) return;
                
                const names = Array.isArray(slot.name) ? slot.name : [slot.name];
                const elems = slot.element ? (Array.isArray(slot.element) ? slot.element : [slot.element]) : [];
                
                let usedName = names[0];
                let usedElem = elems[0];
                for(let i = 0; i < names.length; i++) {
                    const n = names[i];
                    const e = elems[i] || elems[0];
                    const resolvedName = resolveTeammateNameFn(n, e);
                    if (showcaseNames.includes(resolvedName)) {
                        usedName = n;
                        usedElem = e;
                        break;
                    }
                }
                activeTeamNames.push(resolveTeammateNameFn(usedName, usedElem));

                let inShowcase = false;
                for(let i = 0; i < names.length; i++) {
                    const n = names[i];
                    const e = elems[i] || elems[0];
                    const resolvedName = resolveTeammateNameFn(n, e);
                    if (showcaseNames.includes(resolvedName)) {
                        inShowcase = true;
                        break;
                    }
                }
                if (inShowcase) {
                    showcaseCount++;
                }

                if (!containsFocus && focusCharNom) {
                    for(let i = 0; i < names.length; i++) {
                        const n = names[i];
                        const e = elems[i] || elems[0];
                        const resolvedName = resolveTeammateNameFn(n, e);
                        if (getInternalName(resolvedName) === getInternalName(focusCharNom)) {
                            containsFocus = true;
                            break;
                        }
                    }
                }
            });

            if (score > bestScore || (score === bestScore && showcaseCount > bestShowcaseCount)) {
                bestScore = score;
                bestShowcaseCount = showcaseCount;
                bestBuild = { name: translatedBuildName, config: buildConfig, score: score, showcaseCount: showcaseCount, containsFocus, activeTeamNames };
            }
        });

        if (bestBuild) {
            evaluatedTeams.push({
                dps: c,
                build: bestBuild,
                score: bestBuild.score,
                showcaseCount: bestBuild.showcaseCount,
                containsFocus: bestBuild.containsFocus
            });
        }
    });

    evaluatedTeams.sort((a, b) => b.score - a.score);

    if (focusCharNom) {
        const focusTeamIndex = evaluatedTeams.findIndex(t => t.containsFocus);
        if (focusTeamIndex > -1) {
            const focusTeam = evaluatedTeams.splice(focusTeamIndex, 1)[0];
            evaluatedTeams.unshift(focusTeam);
        }
    }

    const noDuplicates = typeof window !== 'undefined' && window.roadmapNoDuplicateTeams;
    const topTeams = [];
    const usedCharacters = new Set();

    for (const teamData of evaluatedTeams) {
        if (topTeams.length >= 3) break;

        const teamNames = teamData.build.activeTeamNames;
        
        if (noDuplicates) {
            const hasDuplicate = teamNames.some(name => usedCharacters.has(name));
            if (hasDuplicate) continue;
        }

        topTeams.push(teamData);
        if (noDuplicates) {
            teamNames.forEach(name => usedCharacters.add(name));
        }
    }

    if (topTeams.length === 0) return '';

    const renderSlot = (slot) => {
        if (!slot.name) return '';
        const names = Array.isArray(slot.name) ? slot.name : [slot.name];
        const elems = Array.isArray(slot.element) ? slot.element : [slot.element];
        
        let displayedName = names[0];
        let displayedElem = elems[0];
        let inShowcase = false;
        let showcaseChar = null;
        
        for (let i = 0; i < names.length; i++) {
            const currentElem = elems[i] || elems[0];
            const resolvedName = resolveTeammateNameFn(names[i], currentElem);
            if (showcaseNames.includes(resolvedName)) {
                displayedName = names[i];
                displayedElem = currentElem;
                inShowcase = true;
                showcaseChar = characters.find(c => c.nom === resolvedName);
                break;
            }
        }

        const opacity = inShowcase ? '1' : '0.6';
        const filter = inShowcase ? 'none' : 'grayscale(70%)';
        
        let iconPath = `https://enka.network/ui/UI_AvatarIcon_${displayedName}.png`;
        if (showcaseChar && showcaseChar.image) {
            iconPath = showcaseChar.image.replace('Side_', '');
        }

        const bgStyle = displayedElem && ELEMENT_COLORS[displayedElem] ? `background: ${ELEMENT_COLORS[displayedElem]}` : 'background: #333';

        return `
            <div style="display:flex; flex-direction:column; align-items:center; gap:4px; opacity: ${opacity}; filter: ${filter};">
                <img src="${iconPath}" alt="${displayedName}" style="width:48px; height:48px; border-radius:6px; ${bgStyle}; border: 2px solid var(--border-color); object-fit:cover;" onerror="this.src='/assets/simulator/icons/icon_unknown.webp'" decoding="async" title="${resolveTeammateNameFn(displayedName, displayedElem)}">
                <span style="font-size:11px; color:var(--text-grey); white-space:nowrap;">${resolveTeammateNameFn(displayedName, displayedElem)}</span>
            </div>
        `;
    };

        let btnStyle = 'display: inline-flex; align-items: center; padding: 5px 11px; border-radius: 8px; font-size: 11px; font-weight: normal; cursor: pointer; transition: all 0.2s ease; ';
        if (noDuplicates) {
            btnStyle += 'border: 1px solid #3b82f6; background: rgba(59, 130, 246, 0.18); color: #60a5fa;';
        } else {
            btnStyle += 'border: 1px solid rgba(255, 255, 255, 0); background: rgba(0, 0, 0, 0.25); color: var(--text-grey);';
        }

    return `
        <div class="roadmap-card" style="display:flex; flex-direction:column; gap:16px;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:8px;">
                <div style="display:flex; flex-direction:column; gap:4px;">
                    <h3 style="font-size:24px; font-weight:normal; color:var(--text-primary); margin:0;">
                        ${t('roadmap.teams.title')}
                    </h3>
                    <p style="font-size:13px; color:var(--text-grey); margin:0;">
                        ${t('roadmap.teams.desc')}
                    </p>
                </div>
                <button data-action="toggle-roadmap-duplicate-teams" type="button" style="${btnStyle}">
                    ${t('roadmap.teams.noDuplicates')}
                </button>
            </div>
            <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:12px;">
                ${topTeams.map((teamData, index) => {
                    const dps = teamData.dps;
                    const build = teamData.build;
                    const teamSlots = build.config.team.filter(slot => slot.name);
                    
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
                                    <span style="font-size:14px; font-weight:700; color:var(--text-primary);">
                                        #${index + 1} - ${dps.nom}
                                    </span>
                                    <span style="font-size:11px; padding:2px 6px; background:rgba(0,0,0,0.2); border-radius:4px; color:var(--text-grey);">
                                        ${build.name}
                                    </span>
                                </div>
                                <div style="display:flex; align-items:center; gap:4px;">
                                    <span style="font-size:12px; font-weight:700; color:var(--accent-gold);">
                                        ${build.score}%
                                    </span>
                                </div>
                            </div>
                            
                            <div style="display:flex; align-items:center; gap:12px; justify-content:center;">
                                <div style="display:flex; flex-direction:column; align-items:center; gap:4px;">
                                    <img src="${dpsIconPath}" alt="${dps.nom}" style="width:48px; height:48px; border-radius:6px; background:${dpsBg}; border: 1px solid rgba(255, 255, 255, 0.5); object-fit:cover;" onerror="this.src='/assets/simulator/icons/icon_unknown.webp'" decoding="async" title="${resolveTeammateNameFn(dps.nom)}">
                                    <span style="font-size:11px; color:var(--text-primary); white-space:nowrap; font-weight:700;">${resolveTeammateNameFn(dps.nom)}</span>
                                </div>
                                ${teamSlots.map(slot => renderSlot(slot)).join('')}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}
