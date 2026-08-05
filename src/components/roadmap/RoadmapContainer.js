// src/components/roadmap/RoadmapContainer.js
import { t } from '../../scripts/i18n.js';
import { renderMaturityBarometer } from './MaturityBarometer.js';
import { renderQuickWinsPlan } from './QuickWinsPlan.js';
import { renderGlobalSwapAdvisor } from './GlobalSwapAdvisor.js';
import { renderDomainPlanner } from './DomainPlanner.js';
import { renderStrongboxAdvisor } from './StrongboxAdvisor.js';
import { renderWorstPiecesAudit } from './WorstPiecesAudit.js';
import { renderElixirCraftAdvisor } from './ElixirCraftAdvisor.js';

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
            const btn = e.target.closest('[data-action="set-roadmap-focus"]');
            if (btn) {
                e.preventDefault();
                e.stopPropagation();
                const charNom = btn.getAttribute('data-char') || null;
                window.setRoadmapFocusChar(charNom);
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

    return `
        <div class="roadmap-main-wrapper" style="display:flex; flex-direction:column; gap:8px; width:100%; max-width:1400px; margin:0 auto; padding-bottom:8px;">          
            <div class="roadmap-header" style="background: var(--bg-panel); border-radius:8px; padding:20px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
                <div style="display:flex; align-items:center; gap:16px;">
                    <div>
                        <h1 style="font-size:20px; font-weight:800; color:var(--text-always-white); margin:0; letter-spacing:-0.3px;">
                            ${t('roadmap.page.title')}
                        </h1>
                        <p style="font-size:13px; color:var(--text-grey); margin:4px 0 0 0;">
                            ${t('roadmap.page.subtitle', count)}
                        </p>
                    </div>
                </div>

                <!-- Sélecteur de Focus Personnage -->
                <div class="roadmap-focus-selector-wrapper" style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                    <span style="font-size:11px; color:var(--text-grey); margin-right:2px;">
                        ${t('roadmap.focus.label')}
                    </span>
                    <button data-action="set-roadmap-focus"
                            data-char=""
                            type="button"
                            style="display:inline-flex; align-items:center; gap:6px; padding:4px 10px; border-radius:8px; font-size:11px; cursor:pointer; transition:all 0.2s ease; border:${!focusCharNom ? '1px solid var(--accent-gold, #f59e0b)' : '1px solid rgba(255,255,255,0)'}; background:${!focusCharNom ? 'rgba(245,158,11,0.15)' : 'rgba(0,0,0,0.2)'}; color:${!focusCharNom ? 'var(--accent-gold, #f59e0b)' : 'var(--text-grey)'};">
                        <span>${t('roadmap.focus.all')}</span>
                    </button>
                    ${characters.map(c => {
        const isSelected = focusCharNom === c.nom;
        return `
                            <button data-action="set-roadmap-focus"
                                    data-char="${c.nom}"
                                    type="button"
                                    title="${c.nom}"
                                    style="display:inline-flex; align-items:center; gap:5px; padding:3px 8px 3px 3px; border-radius:8px; font-size:11px; cursor:pointer; transition:all 0.2s ease; border:${isSelected ? '1px solid #3b82f6' : '1px solid rgba(0,0,0,0)'}; background:${isSelected ? 'rgba(59,130,246,0.18)' : 'rgba(0,0,0,0.2)'}; color:${isSelected ? '#60a5fa' : 'var(--text-primary)'};">
                                <img src="${c.image}" alt="${c.nom}" style="width:24px; height:24px; border-radius:5px; object-fit:cover; background:rgba(0,0,0,0.2); pointer-events:none;">
                                <span style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; pointer-events:none;">${c.nom}</span>
                            </button>
                        `;
    }).join('')}
                </div>
            </div>

            <!-- Module 1 : Baromètre de Maturité Globale -->
            ${renderMaturityBarometer(characters, focusCharNom)}

            <!-- Module 2 : Plan d'action par paliers (Quick Wins) -->
            ${renderQuickWinsPlan(characters, focusCharNom)}

            <!-- Module 3 : Optimiseur de Swaps Croisés -->
            ${renderGlobalSwapAdvisor(characters, focusCharNom)}

            <!-- Deux colonnes pour Donjons & Synthèse Mystique -->
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap:8px;">
                <!-- Module 4 : Planificateur de Donjons -->
                ${renderDomainPlanner(characters, focusCharNom, typeof window !== 'undefined' ? !!window.roadmapShowAllDomainChars : false)}

                <!-- Module 5 : Conseiller de Synthèse Mystique -->
                ${renderStrongboxAdvisor(characters, focusCharNom, typeof window !== 'undefined' ? !!window.roadmapShowAllStrongboxChars : false)}
            </div>

            <!-- Module 6 : Audit des Maillons Faibles -->
            ${renderWorstPiecesAudit(characters, focusCharNom)}

            <!-- Module 7 : Conseiller d'Élixir Sanctifiant (Transmutateur) -->
            ${renderElixirCraftAdvisor(characters, focusCharNom, typeof window !== 'undefined' ? (window.roadmapElixirBudget || 'all') : 'all')}

        </div>
    `;
}

