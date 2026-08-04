// src/components/showcase/ShowcaseContainer.js
import { renderCharacterPortrait, renderBackgroundSplash } from './CharacterPortrait.js';
import { renderWeaponCard } from './WeaponCard.js';
import { renderCharacterInfo } from './CharacterInfo.js';
import { renderBaseStatsList, renderCombatStatsList } from './CombatStatsList.js';
import { renderCharacterScoreBadge } from './CharacterScoreBadge.js';
import { renderTalentsList } from './TalentsList.js';
import { renderArtifactsGrid } from './ArtifactsGrid.js';
import { renderBuffsPanel } from './BuffsPanel.js';
import { renderAdviceSection } from '../advice/AdviceSection.js';
import { t } from '../../scripts/i18n.js';

export function renderShowcaseComponent(persoObj, charIndex) {
    if (!persoObj) return '';

    let config = persoObj.charConfig || {};
    if (persoObj.activeBuild) {
        config = { ...config, ...persoObj.activeBuild };
    }

    const skinOverride = (config.skins && persoObj.costumeId && config.skins[persoObj.costumeId])
        ? config.skins[persoObj.costumeId]
        : null;

    const charColor = skinOverride?.color || config.color || "#4b5563";
    const infoHeaderHtml = renderCharacterInfo(persoObj);

    return `
        <div class="showcase-wrapper" style="--char-hex: ${charColor}; width: 100%; position: relative;">
            <div class="top-row" style="position: relative; display: flex; gap: 8px; justify-content: flex-start; align-items: stretch; margin-bottom: 24px;">
                ${renderBackgroundSplash(persoObj)}

                <!-- Colonne Gauche : Portrait et Arme -->
                <div class="character-portrait-weapon" style="gap: 8px; align-items: stretch; flex-direction: column; display: flex; box-sizing: border-box; z-index: 10;">
                    ${renderCharacterPortrait(persoObj, config)}
                    <div class="weapon-container">
                        ${renderWeaponCard(persoObj)}
                    </div>
                </div>

                <!-- Colonne Milieu : Infos, Base Stats, Score, Aptitudes, Stats Combat -->
                <div class="showcase-area" style="gap: 8px; justify-content: space-between; align-items: stretch; flex-direction: column; display: flex; box-sizing: border-box; z-index: 10;">
                    <div class="showcase-area-container" style="width: 299px; height: 100%; border-radius: 8px; flex: 1 1 0%; justify-content: space-between; align-items: stretch; flex-direction: column; display: flex; box-sizing: border-box;">
                        ${renderBaseStatsList(persoObj, infoHeaderHtml)}
                        ${renderCharacterScoreBadge(persoObj.evaluation)}
                        ${renderTalentsList(persoObj.talents)}
                        ${renderCombatStatsList(persoObj)}
                    </div>
                </div>

                <!-- Colonne Droite : Artéfacts et Panneau de Buffs -->
                <div class="equipment-area" style="display: grid; grid-template-columns: repeat(2, 240px); gap: 8px; z-index: 10;">
                    ${renderArtifactsGrid(persoObj)}
                    ${renderBuffsPanel(persoObj, charIndex)}
                </div>
            </div>

            <!-- Section Analyses et Conseils Découplée -->
            <div class="coaching-row" style="margin-top: 32px; width: 100%;">
                <div style="padding: 20px;">
                    <h2 style="color: var(--text-primary); margin-bottom: 25px; font-size: 32px; border-bottom: 2px solid var(--text-primary); padding-bottom: 10px; display: flex; align-items: center; gap: 10px; font-weight: normal;">
                        ${t('analysis.title', persoObj.nom)}
                    </h2>
                    <div id="advice-section-container">
                        ${renderAdviceSection(persoObj, config, charIndex)}
                    </div>
                </div>
            </div>
        </div>
    `;
}
