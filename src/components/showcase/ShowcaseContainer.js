// src/components/showcase/ShowcaseContainer.js
import { renderCharacterPortrait, renderBackgroundSplash } from './CharacterPortrait.js';
import { renderWeaponCard } from './WeaponCard.js';
import { renderCharacterInfo } from './CharacterInfo.js';
import { renderBaseStatsList, renderCombatStatsList } from './CombatStatsList.js';
import { renderCharacterScoreBadge } from './CharacterScoreBadge.js';
import { renderTalentsList } from './TalentsList.js';
import { renderArtifactsGrid } from './ArtifactsGrid.js';
import { renderBuffsPanel, renderActiveBuffsSection } from './BuffsPanel.js';
import { renderCustomizationBar } from './CustomizationBar.js';
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

    const isTransparent = (typeof window !== 'undefined') &&
        (window.customizationState?.styleMode === 'transparent' ||
         (typeof localStorage !== 'undefined' && localStorage.getItem('guoba_custom_style_mode') === 'transparent'));
    const isDark = (typeof window !== 'undefined') &&
        (window.customizationState?.themeMode === 'dark' ||
         (typeof localStorage !== 'undefined' && localStorage.getItem('guoba_custom_theme_mode') === 'dark'));
    const hasNoBgSplash = (typeof window !== 'undefined') &&
        (window.customizationState?.bgSplashMode === 'no-splash' ||
         (typeof localStorage !== 'undefined' && localStorage.getItem('guoba_custom_bgsplash_mode') === 'no-splash'));
    const hasNoShadow = (typeof window !== 'undefined') &&
        (window.customizationState?.shadowMode === 'no-shadow' ||
         (typeof localStorage !== 'undefined' && localStorage.getItem('guoba_custom_shadow_mode') === 'no-shadow'));
    const hasNoBorder = (typeof window !== 'undefined') &&
        (window.customizationState?.borderMode === 'no-border' ||
         (typeof localStorage !== 'undefined' && localStorage.getItem('guoba_custom_border_mode') === 'no-border'));
    const isSquareCorners = (typeof window !== 'undefined') &&
        (window.customizationState?.cornerMode === 'square' ||
         (typeof localStorage !== 'undefined' && localStorage.getItem('guoba_custom_corner_mode') === 'square'));
    const hasNoRarity = (typeof window !== 'undefined') &&
        (window.customizationState?.rarityMode === 'no-rarity' ||
         (typeof localStorage !== 'undefined' && localStorage.getItem('guoba_custom_rarity_mode') === 'no-rarity'));
    const hasNoRollDots = (typeof window !== 'undefined') &&
        (window.customizationState?.rollDotsMode === 'no-dots' ||
         (typeof localStorage !== 'undefined' && localStorage.getItem('guoba_custom_rolldots_mode') === 'no-dots'));
    const isScoreRolls = (typeof window !== 'undefined') &&
        (window.customizationState?.scoreMode === 'rolls' ||
         (typeof localStorage !== 'undefined' && localStorage.getItem('guoba_custom_score_mode') === 'rolls'));
    const isArtifactCv = (typeof window !== 'undefined') &&
        (window.customizationState?.artScoreMode === 'cv' ||
         (typeof localStorage !== 'undefined' && localStorage.getItem('guoba_custom_artscore_mode') === 'cv'));
    const wrapperClass = `showcase-wrapper${isTransparent ? ' mode-transparent' : ''}${isDark ? ' mode-dark' : ''}${hasNoBgSplash ? ' mode-no-bg-splash' : ''}${hasNoShadow ? ' mode-no-shadow' : ''}${hasNoBorder ? ' mode-no-border' : ''}${isSquareCorners ? ' mode-square-corners' : ''}${hasNoRarity ? ' mode-no-rarity' : ''}${hasNoRollDots ? ' mode-no-roll-dots' : ''}${isScoreRolls ? ' mode-score-rolls' : ''}${isArtifactCv ? ' mode-artifact-cv' : ''}`;

    return `
        <div class="${wrapperClass}" style="--char-hex: ${charColor}; width: 100%; position: relative;">
            <div class="top-row-container">
                <div class="top-row" style="position: relative; display: flex; gap: 8px; justify-content: flex-start; align-items: stretch;">
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
                            ${renderBaseStatsList(persoObj, infoHeaderHtml, charIndex)}
                            ${renderCharacterScoreBadge(persoObj.evaluation)}
                            ${renderTalentsList(persoObj.talents)}
                            ${renderCombatStatsList(persoObj, charIndex)}
                        </div>
                    </div>

                    <!-- Colonne Droite : Artéfacts et Panneau de Buffs -->
                    <div class="equipment-area" style="display: grid; grid-template-columns: repeat(2, 240px); gap: 8px; z-index: 10;">
                        ${renderArtifactsGrid(persoObj, charIndex)}
                        ${renderBuffsPanel(persoObj, charIndex)}
                    </div>
                </div>

                <!-- Barre verticale de customisation -->
                ${renderCustomizationBar(persoObj, charColor, charIndex, config)}
            </div>

            <!-- Nouvelle Section : Buffs Actifs Détaillés -->
            ${renderActiveBuffsSection(persoObj, charIndex)}

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
