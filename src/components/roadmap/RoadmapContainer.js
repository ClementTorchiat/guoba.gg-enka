// src/components/roadmap/RoadmapContainer.js
import { t } from '../../scripts/i18n.js';
import { renderMaturityBarometer } from './MaturityBarometer.js';
import { renderQuickWinsPlan } from './QuickWinsPlan.js';
import { renderGlobalSwapAdvisor } from './GlobalSwapAdvisor.js';
import { renderDomainPlanner } from './DomainPlanner.js';
import { renderStrongboxAdvisor } from './StrongboxAdvisor.js';
import { renderWorstPiecesAudit } from './WorstPiecesAudit.js';
import { renderElixirCraftAdvisor } from './ElixirCraftAdvisor.js';
import { renderTeamAdvisor } from './TeamAdvisor.js';
import { renderBestPiecesShowcase } from './BestPiecesShowcase.js';

let cachedRoadmapCharacters = [];

if (typeof window !== 'undefined') {
    window.setRoadmapFocusChar = function (charNom) {
        window.roadmapFocusCharNom = charNom || null;
        const chars = (cachedRoadmapCharacters && cachedRoadmapCharacters.length > 0)
            ? cachedRoadmapCharacters
            : ((typeof window !== 'undefined' && window.globalPersoData) ? window.globalPersoData : []);

        const container = document.getElementById('main-container');
        if (container && chars.length > 0) {
            container.innerHTML = renderRoadmapContainer(chars, window.roadmapFocusCharNom);
        }
    };

    if (!window._roadmapFocusClickListenerBound) {
        window._roadmapFocusClickListenerBound = true;
        document.addEventListener('click', (e) => {

            const dropdown = document.getElementById('roadmap-focus-dropdown-menu');
            if (dropdown && dropdown.style.display !== 'none') {
                const wrapper = e.target.closest('.roadmap-focus-selector-wrapper');
                if (!wrapper) {
                    dropdown.style.display = 'none';
                    const toggleDropdownBtn = document.querySelector('[data-action="toggle-roadmap-focus-dropdown"]');
                    if (toggleDropdownBtn) {
                        const chevron = toggleDropdownBtn.querySelector('.focus-chevron');
                        if (chevron) chevron.style.transform = 'rotate(0deg)';
                    }
                }
            }

            const toggleDropdownBtn = e.target.closest('[data-action="toggle-roadmap-focus-dropdown"]');
            if (toggleDropdownBtn) {
                e.preventDefault();
                e.stopPropagation();
                const dropdownMenu = document.getElementById('roadmap-focus-dropdown-menu');
                if (dropdownMenu) {
                    const isHidden = dropdownMenu.style.display === 'none';
                    dropdownMenu.style.display = isHidden ? 'flex' : 'none';
                    const chevron = toggleDropdownBtn.querySelector('.focus-chevron');
                    if (chevron) chevron.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
                }
                return;
            }

            const btn = e.target.closest('[data-action="set-roadmap-focus"]');
            if (btn) {
                e.preventDefault();
                e.stopPropagation();
                const charNom = btn.getAttribute('data-char') || null;
                window.setRoadmapFocusChar(charNom);
                return;
            }

            const setDomainScopeBtn = e.target.closest('[data-action="set-domain-scope"]');
            if (setDomainScopeBtn) {
                e.preventDefault();
                e.stopPropagation();
                const scope = setDomainScopeBtn.getAttribute('data-scope');
                const shouldShowAll = (scope === 'all');
                if (window.roadmapShowAllDomainChars !== shouldShowAll) {
                    window.roadmapShowAllDomainChars = shouldShowAll;
                    const chars = (cachedRoadmapCharacters && cachedRoadmapCharacters.length > 0)
                        ? cachedRoadmapCharacters
                        : ((typeof window !== 'undefined' && window.globalPersoData) ? window.globalPersoData : []);
                    const container = document.getElementById('main-container');
                    if (container && chars.length > 0) {
                        container.innerHTML = renderRoadmapContainer(chars, window.roadmapFocusCharNom);
                    }
                }
                return;
            }

            const setBestPiecesModeBtn = e.target.closest('[data-action="set-best-pieces-mode"]');
            if (setBestPiecesModeBtn) {
                e.preventDefault();
                e.stopPropagation();
                const mode = setBestPiecesModeBtn.getAttribute('data-mode');
                if (window.roadmapBestPiecesMode !== mode) {
                    window.roadmapBestPiecesMode = mode;
                    const chars = (cachedRoadmapCharacters && cachedRoadmapCharacters.length > 0)
                        ? cachedRoadmapCharacters
                        : ((typeof window !== 'undefined' && window.globalPersoData) ? window.globalPersoData : []);
                    const container = document.getElementById('main-container');
                    if (container && chars.length > 0) {
                        container.innerHTML = renderRoadmapContainer(chars, window.roadmapFocusCharNom);
                    }
                }
                return;
            }

            const setWorstPiecesModeBtn = e.target.closest('[data-action="set-worst-pieces-mode"]');
            if (setWorstPiecesModeBtn) {
                e.preventDefault();
                e.stopPropagation();
                const mode = setWorstPiecesModeBtn.getAttribute('data-mode');
                if (window.roadmapWorstPiecesMode !== mode) {
                    window.roadmapWorstPiecesMode = mode;
                    const chars = (cachedRoadmapCharacters && cachedRoadmapCharacters.length > 0)
                        ? cachedRoadmapCharacters
                        : ((typeof window !== 'undefined' && window.globalPersoData) ? window.globalPersoData : []);
                    const container = document.getElementById('main-container');
                    if (container && chars.length > 0) {
                        container.innerHTML = renderRoadmapContainer(chars, window.roadmapFocusCharNom);
                    }
                }
                return;
            }

            const toggleDomainBtn = e.target.closest('[data-action="toggle-domain-all-chars"]');
            if (toggleDomainBtn) {
                e.preventDefault();
                e.stopPropagation();
                window.roadmapShowAllDomainChars = !window.roadmapShowAllDomainChars;
                const chars = (cachedRoadmapCharacters && cachedRoadmapCharacters.length > 0)
                    ? cachedRoadmapCharacters
                    : ((typeof window !== 'undefined' && window.globalPersoData) ? window.globalPersoData : []);
                const container = document.getElementById('main-container');
                if (container && chars.length > 0) {
                    container.innerHTML = renderRoadmapContainer(chars, window.roadmapFocusCharNom);
                }
                return;
            }

            const setStrongboxScopeBtn = e.target.closest('[data-action="set-strongbox-scope"]');
            if (setStrongboxScopeBtn) {
                e.preventDefault();
                e.stopPropagation();
                const scope = setStrongboxScopeBtn.getAttribute('data-scope');
                const shouldShowAll = (scope === 'all');
                if (window.roadmapShowAllStrongboxChars !== shouldShowAll) {
                    window.roadmapShowAllStrongboxChars = shouldShowAll;
                    const chars = (cachedRoadmapCharacters && cachedRoadmapCharacters.length > 0)
                        ? cachedRoadmapCharacters
                        : ((typeof window !== 'undefined' && window.globalPersoData) ? window.globalPersoData : []);
                    const container = document.getElementById('main-container');
                    if (container && chars.length > 0) {
                        container.innerHTML = renderRoadmapContainer(chars, window.roadmapFocusCharNom);
                    }
                }
                return;
            }

            const toggleStrongboxBtn = e.target.closest('[data-action="toggle-strongbox-all-chars"]');
            if (toggleStrongboxBtn) {
                e.preventDefault();
                e.stopPropagation();
                window.roadmapShowAllStrongboxChars = !window.roadmapShowAllStrongboxChars;
                const chars = (cachedRoadmapCharacters && cachedRoadmapCharacters.length > 0)
                    ? cachedRoadmapCharacters
                    : ((typeof window !== 'undefined' && window.globalPersoData) ? window.globalPersoData : []);
                const container = document.getElementById('main-container');
                if (container && chars.length > 0) {
                    container.innerHTML = renderRoadmapContainer(chars, window.roadmapFocusCharNom);
                }
                return;
            }

            const elixirBudgetBtn = e.target.closest('[data-action="set-elixir-budget"]');
            if (elixirBudgetBtn) {
                e.preventDefault();
                e.stopPropagation();
                const budget = elixirBudgetBtn.getAttribute('data-budget') || 'all';
                window.roadmapElixirBudget = budget;
                const chars = (cachedRoadmapCharacters && cachedRoadmapCharacters.length > 0)
                    ? cachedRoadmapCharacters
                    : ((typeof window !== 'undefined' && window.globalPersoData) ? window.globalPersoData : []);
                const container = document.getElementById('main-container');
                if (container && chars.length > 0) {
                    container.innerHTML = renderRoadmapContainer(chars, window.roadmapFocusCharNom);
                }
                return;
            }

            const toggleDuplicateTeamsBtn = e.target.closest('[data-action="toggle-roadmap-duplicate-teams"]');
            if (toggleDuplicateTeamsBtn) {
                e.preventDefault();
                e.stopPropagation();
                window.roadmapNoDuplicateTeams = !window.roadmapNoDuplicateTeams;
                const chars = (cachedRoadmapCharacters && cachedRoadmapCharacters.length > 0)
                    ? cachedRoadmapCharacters
                    : ((typeof window !== 'undefined' && window.globalPersoData) ? window.globalPersoData : []);
                const container = document.getElementById('main-container');
                if (container && chars.length > 0) {
                    container.innerHTML = renderRoadmapContainer(chars, window.roadmapFocusCharNom);
                }
                return;
            }
        });
    }
}

export function renderRoadmapContainer(characters, focusCharNom = (typeof window !== 'undefined' ? window.roadmapFocusCharNom : null)) {
    if (characters && characters.length > 0) {
        cachedRoadmapCharacters = characters;
    }

    if (!characters || characters.length === 0) {
        return `
            <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:60px 20px; text-align:center;">
                <p style="font-size:16px; color:var(--text-grey);">${t('roadmap.noCharacters')}</p>
            </div>
        `;
    }

    const count = characters.length;
    const dottedDivider = `
        <div style="margin: auto 10px; flex-grow: 1; width: unset; min-width: unset; background: none; border-color: var(--dotted-line); border-style: dashed; border-width: 1px 0 0; display: flex; clear: both;"></div>
    `;

    return `
        <div class="roadmap-main-wrapper" style="display:flex; flex-direction:column; gap:40px; width:100%; max-width:1400px; margin:0 auto; padding-bottom:8px;">          
            <div class="roadmap-header" style="padding:20px 20px 0 20px; display:flex; flex-direction:column; margin-bottom: -15px;">
                <div style="display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:16px; border-bottom:2px solid var(--text-primary); padding-bottom:20px;">
                    <div>
                        <h2 style="color:var(--text-primary); font-size:32px; display:flex; align-items:center; gap:10px; font-weight:normal; margin:0 0 5px 0;">
                            ${t('roadmap.page.title')}
                        </h2>
                        <p style="font-size:14px; color:var(--text-grey); margin:0;">
                            ${t('roadmap.page.subtitle', count)}
                        </p>
                    </div>

                    <!-- Sélecteur de Focus Personnage -->
                    <div class="roadmap-focus-selector-wrapper" style="position:relative; display:flex; align-items:center; gap:8px;">
                    <span style="font-size:11px; color:var(--text-grey); margin-right:2px;">
                        ${t('roadmap.focus.label')}
                    </span>
                    
                    <!-- Trigger Button -->
                    ${(() => {
            const activeChar = characters.find(c => c.nom === focusCharNom);
            if (activeChar) {
                return `
                            <button data-action="toggle-roadmap-focus-dropdown"
                                    type="button"
                                    style="display:inline-flex; align-items:center; gap:6px; height:36px; padding:3px 12px 3px 4px; box-sizing:border-box; border-radius:8px; font-size:12px; font-weight:600; cursor:pointer; transition:all 0.2s ease; border:1px solid rgba(59, 130, 246, 0.4); background:rgba(59, 130, 246, 0.08); color:var(--text-primary); box-shadow:none; backdrop-filter:blur(4px);">
                                <img src="${activeChar.image}" alt="${activeChar.nom}" style="width:26px; height:26px; border-radius:6px; object-fit:cover; pointer-events:none;" onerror="this.src='/assets/simulator/icons/icon_unknown.webp'">
                                <span style="white-space:nowrap; pointer-events:none;">${activeChar.nom}</span>
                                <svg class="focus-chevron" style="width:14px; height:14px; transition:transform 0.2s ease; margin-left:4px; opacity:0.6; pointer-events:none;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                            `;
            } else {
                return `
                            <button data-action="toggle-roadmap-focus-dropdown"
                                    type="button"
                                    style="display:inline-flex; align-items:center; gap:6px; height:36px; padding:0 14px; box-sizing:border-box; border-radius:8px; font-size:12px; font-weight:600; cursor:pointer; transition:all 0.2s ease; border:1px solid transparent; background:rgba(0, 0, 0, 0.25); color:var(--text-always-white); box-shadow:none;">
                                <span style="pointer-events:none;">${t('roadmap.focus.all')}</span>
                                <svg class="focus-chevron" style="width:14px; height:14px; transition:transform 0.2s ease; margin-left:4px; opacity:0.8; pointer-events:none;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                            `;
            }
        })()}

                    <!-- Dropdown Menu -->
                    <div id="roadmap-focus-dropdown-menu" style="display:none; position:absolute; top:calc(100% + 8px); right:0; z-index:50; background:var(--bg-panel, #1a1a1a); border-radius:12px; padding:5px; box-shadow:0 10px 30px rgba(0,0,0,0.8); width:max-content; min-width:320px; max-width:480px; max-height:450px; overflow-y:auto; backdrop-filter:blur(10px); transform: scale(0.85); transform-origin: top right;">
                        
                        <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(200px, 1fr)); gap:5px; width:100%;">
                            <!-- Option: Tous les personnages -->
                            <div class="char-card ${!focusCharNom ? 'active' : ''}"
                                 data-action="set-roadmap-focus"
                                 data-char=""
                                 style="margin:0;">
                                <div class="char-card-avatar" style="display:flex; justify-content:center; align-items:center; flex-shrink:0;">
                                    <svg style="width:26px; height:26px; color:var(--text-always-white); opacity:0.8;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                </div>
                                <div class="char-card-container">
                                    <p class="char-card-name" style="margin:0; font-weight:600;">${t('roadmap.focus.all')}</p>
                                </div>
                            </div>
                            
                            <!-- Grille des personnages -->
                            ${characters.map(c => {
            const isSelected = focusCharNom === c.nom;
            return `
                                    <div class="char-card ${isSelected ? 'active' : ''}"
                                         data-action="set-roadmap-focus"
                                         data-char="${c.nom}"
                                         title="${c.nom}"
                                         style="margin:0;">
                                        <img src="${c.image}" alt="${c.nom}" class="char-card-avatar" style="object-fit:cover; pointer-events:none;" onerror="this.src='/assets/simulator/icons/icon_unknown.webp'">
                                        <div class="char-card-container">
                                            <p class="char-card-name" style="margin:0; font-weight:500; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${c.nom}</p>
                                        </div>
                                    </div>
                                `;
        }).join('')}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Module 1 : Baromètre de Maturité Globale -->
            ${renderMaturityBarometer(characters, focusCharNom)}

            ${dottedDivider}

            <!-- Module 2 : Plan d'action par paliers (Quick Wins) -->
            ${renderQuickWinsPlan(characters, focusCharNom)}

            ${dottedDivider}

            <!-- Module 3 : Optimiseur de Swaps Croisés -->
            ${renderGlobalSwapAdvisor(characters, focusCharNom)}
            
            ${dottedDivider}

            <!-- NOUVEAU : Equipes Recommandées -->
            ${renderTeamAdvisor(characters, focusCharNom)}

            ${dottedDivider}

            <!-- Deux colonnes pour Donjons & Synthèse Mystique -->
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap:40px;">
                <!-- Module 4 : Planificateur de Donjons -->
                ${renderDomainPlanner(characters, focusCharNom, typeof window !== 'undefined' ? !!window.roadmapShowAllDomainChars : false)}

                <!-- Module 5 : Conseiller de Synthèse Mystique -->
                ${renderStrongboxAdvisor(characters, focusCharNom, typeof window !== 'undefined' ? !!window.roadmapShowAllStrongboxChars : false)}
            </div>

            ${dottedDivider}

            <!-- Deux colonnes pour Meilleures & Pires Pièces -->
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap:40px;">
                <!-- Module 6 : Hall of Fame (Meilleures Pièces) -->
                ${renderBestPiecesShowcase(characters, focusCharNom)}

                <!-- Module 7 : Audit des Maillons Faibles -->
                ${renderWorstPiecesAudit(characters, focusCharNom)}
            </div>

            ${dottedDivider}

            <!-- Module 7 : Conseiller d'Élixir Sanctifiant (Transmutateur) -->
            ${renderElixirCraftAdvisor(characters, focusCharNom, typeof window !== 'undefined' ? (window.roadmapElixirBudget || 'all') : 'all')}

        </div>
    `;
}

