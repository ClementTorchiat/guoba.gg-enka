// src/components/showcase/CustomizationBar.js
import { t } from '../../scripts/i18n.js';
import { openCustomColorPicker } from './CustomColorPicker.js';

function normalizeHex(hex) {
    if (!hex) return '#4B5563';
    let clean = hex.trim();
    if (!clean.startsWith('#')) clean = '#' + clean;
    if (clean.length === 4) {
        return `#${clean[1]}${clean[1]}${clean[2]}${clean[2]}${clean[3]}${clean[3]}`;
    }
    return clean;
}

export function renderCustomizationBar(persoObj, defaultColor, charIndex, config) {
    const validDefault = normalizeHex(defaultColor);
    const charKey = (persoObj?.nom || 'default').toLowerCase().trim().replace(/\s+/g, '_');

    let resolvedConfig = config || persoObj?.charConfig || {};
    if (!config && persoObj?.activeBuild) {
        resolvedConfig = { ...resolvedConfig, ...persoObj.activeBuild };
    }
    const skinOverride = (resolvedConfig && resolvedConfig.skins && persoObj.costumeId && resolvedConfig.skins[persoObj.costumeId])
        ? resolvedConfig.skins[persoObj.costumeId]
        : null;
    const defaultOffset = skinOverride?.portraitOffset ?? (resolvedConfig?.portraitOffset ?? -35);

    let currentOffsetX = defaultOffset;
    let currentOffsetY = 0;
    let currentScale = 100;

    if (typeof window !== 'undefined') {
        const savedOffsetX = window.customizationState?.customOffsets?.[charKey] ??
            (typeof localStorage !== 'undefined' ? localStorage.getItem('guoba_custom_offset_' + charKey) : null);
        if (savedOffsetX !== null && savedOffsetX !== undefined) {
            currentOffsetX = Number(savedOffsetX);
        }

        const savedOffsetY = window.customizationState?.customOffsetsY?.[charKey] ??
            (typeof localStorage !== 'undefined' ? localStorage.getItem('guoba_custom_offset_y_' + charKey) : null);
        if (savedOffsetY !== null && savedOffsetY !== undefined) {
            currentOffsetY = Number(savedOffsetY);
        }

        const savedScale = window.customizationState?.customScales?.[charKey] ??
            (typeof localStorage !== 'undefined' ? localStorage.getItem('guoba_custom_scale_' + charKey) : null);
        if (savedScale !== null && savedScale !== undefined) {
            currentScale = Number(savedScale);
        }
    }

    const safeDefaultSplash = (persoObj?.splashArt || '').replace(/'/g, "\\'");

    const isModern = (typeof window !== 'undefined') &&
        (window.customizationState?.cardDesignMode === 'modern' ||
            (typeof localStorage !== 'undefined' && localStorage.getItem('guoba_custom_card_design') === 'modern'));
    const isTransparent = (typeof window !== 'undefined') &&
        (window.customizationState?.styleMode === 'transparent' ||
            (typeof localStorage !== 'undefined' && localStorage.getItem('guoba_custom_style_mode') === 'transparent'));
    const isDark = (typeof window !== 'undefined') &&
        (window.customizationState?.themeMode === 'dark' ||
            (typeof localStorage !== 'undefined' && localStorage.getItem('guoba_custom_theme_mode') === 'dark'));
    const hasNoBgSplash = (typeof window !== 'undefined') &&
        (window.customizationState?.bgSplashMode === 'no-splash' ||
            (typeof localStorage !== 'undefined' && localStorage.getItem('guoba_custom_bgsplash_mode') === 'no-splash'));
    const savedShadow = (typeof window !== 'undefined') ? (window.customizationState?.shadowMode || (typeof localStorage !== 'undefined' && localStorage.getItem('guoba_custom_shadow_mode'))) : null;
    const shadowMode = (savedShadow === 'no-shadow' || savedShadow === 'glow') ? savedShadow : (savedShadow === 'shadow' ? 'shadow' : (isModern ? 'no-shadow' : 'shadow'));
    const hasNoBorder = (typeof window !== 'undefined') &&
        (window.customizationState?.borderMode === 'no-border' ||
            (typeof localStorage !== 'undefined' && localStorage.getItem('guoba_custom_border_mode') === 'no-border'));
    const isSquareCorners = (typeof window !== 'undefined') &&
        (window.customizationState?.cornerMode === 'square' ||
            (typeof localStorage !== 'undefined' && localStorage.getItem('guoba_custom_corner_mode') === 'square'));
    const hasNoRarity = (typeof window !== 'undefined') &&
        (window.customizationState?.rarityMode === 'no-rarity' ||
            (typeof localStorage !== 'undefined' && localStorage.getItem('guoba_custom_rarity_mode') === 'no-rarity'));
    const rollDotsMode = (typeof window !== 'undefined')
        ? (window.customizationState?.rollDotsMode || (typeof localStorage !== 'undefined' ? localStorage.getItem('guoba_custom_rolldots_mode') : null) || 'dots')
        : (typeof localStorage !== 'undefined' ? (localStorage.getItem('guoba_custom_rolldots_mode') || 'dots') : 'dots');
    const savedDeadDim = (typeof window !== 'undefined') ? (window.customizationState?.deadDimMode || (typeof localStorage !== 'undefined' && localStorage.getItem('guoba_custom_deaddim_mode'))) : null;
    const deadDimMode = (savedDeadDim === 'no-dim' || savedDeadDim === 'strike') ? savedDeadDim : 'dim';
    const isScoreRolls = (typeof window !== 'undefined') &&
        (window.customizationState?.scoreMode === 'rolls' ||
            (typeof localStorage !== 'undefined' && localStorage.getItem('guoba_custom_score_mode') === 'rolls'));
    const isArtifactCv = (typeof window !== 'undefined') &&
        (window.customizationState?.artScoreMode === 'cv' ||
            (typeof localStorage !== 'undefined' && localStorage.getItem('guoba_custom_artscore_mode') === 'cv'));

    return `
        <div class="customization-bar">
            <!-- Titre de la section -->
            <h3 class="custom-title" data-i18n="custom.title">${t('custom.title')}</h3>

            <!-- Séparateur -->
            <div class="custom-divider"></div>

            <!-- Contrôle A : Image personnalisée -->
            <input type="file" id="custom-image-input" accept="image/*" style="display: none;" onchange="window.handleCustomImageUpload && window.handleCustomImageUpload(this, '${charKey}')">

            <div class="custom-row-with-reset">
                <div class="custom-image-control" onclick="window.openCustomImagePicker && window.openCustomImagePicker()" title="${t('custom.image.change')}" data-i18n-title="custom.image.change">
                    <div class="custom-image-btn-content">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-photo-up">
                            <path d="M15 8h.01"></path>
                            <path d="M12 20h-7a3 3 0 0 1 -3 -3v-10a3 3 0 0 1 3 -3h14a3 3 0 0 1 3 3v5"></path>
                            <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l4 4"></path>
                            <path d="M14 14l1 -1c.617 -.594 1.328 -.793 2.009 -.598"></path>
                            <path d="M19 22v-6"></path>
                            <path d="M22 19l-3 -3l-3 3"></path>
                        </svg>
                        <span data-i18n="custom.image.label">${t('custom.image.label')}</span>
                    </div>
                </div>
                <button type="button" class="custom-reset-btn" title="${t('custom.image.reset')}" data-i18n-title="custom.image.reset" onclick="window.resetCustomImage && window.resetCustomImage('${charKey}', '${safeDefaultSplash}', ${defaultOffset})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-rotate-2">
                        <path d="M4.067 13.041a8 8 0 1 0 9.925 -8.788c-3.899 -1 -7.935 1.007 -9.425 4.747"></path>
                        <path d="M4 4v5h5"></path>
                    </svg>
                </button>
            </div>

            <!-- Contrôle B : Décalage horizontal X -->
            <div class="custom-row-with-reset">
                <div class="custom-offset-control" title="${t('custom.offsetX.title')}" data-i18n-title="custom.offsetX.title">
                    <button type="button" class="custom-offset-btn" id="btn-offset-left" onclick="window.adjustPortraitOffset && window.adjustPortraitOffset('${charKey}', -2, ${defaultOffset}, event)" title="${t('custom.offsetX.left')}" data-i18n-title="custom.offsetX.left">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <input type="text" id="custom-offset-value" class="custom-offset-value custom-offset-input" value="${currentOffsetX}%" title="${t('custom.offsetX.current')}" data-i18n-title="custom.offsetX.current" autocomplete="off" spellcheck="false" onfocus="this.select()" oninput="window.handlePortraitInput && window.handlePortraitInput('offsetX', '${charKey}', this, ${defaultOffset})" onkeydown="window.handlePortraitInputKey && window.handlePortraitInputKey('offsetX', '${charKey}', this, ${defaultOffset}, event)" onblur="window.commitPortraitInput && window.commitPortraitInput('offsetX', '${charKey}', this, ${defaultOffset})">
                    <button type="button" class="custom-offset-btn" id="btn-offset-right" onclick="window.adjustPortraitOffset && window.adjustPortraitOffset('${charKey}', 2, ${defaultOffset}, event)" title="${t('custom.offsetX.right')}" data-i18n-title="custom.offsetX.right">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </div>
                <button type="button" class="custom-reset-btn" id="btn-offset-reset" title="${t('custom.offsetX.reset', defaultOffset)}" data-i18n-title="custom.offsetX.reset" data-i18n-title-val="${defaultOffset}" onclick="window.resetPortraitOffset && window.resetPortraitOffset('${charKey}', ${defaultOffset})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-rotate-2">
                        <path d="M4.067 13.041a8 8 0 1 0 9.925 -8.788c-3.899 -1 -7.935 1.007 -9.425 4.747"></path>
                        <path d="M4 4v5h5"></path>
                    </svg>
                </button>
            </div>

            <!-- Contrôle C : Décalage vertical Y -->
            <div class="custom-row-with-reset">
                <div class="custom-offset-control" title="${t('custom.offsetY.title')}" data-i18n-title="custom.offsetY.title">
                    <button type="button" class="custom-offset-btn" id="btn-offset-y-up" onclick="window.adjustPortraitOffsetY && window.adjustPortraitOffsetY('${charKey}', -2, ${defaultOffset}, event)" title="${t('custom.offsetY.up')}" data-i18n-title="custom.offsetY.up">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="18 15 12 9 6 15"></polyline>
                        </svg>
                    </button>
                    <input type="text" id="custom-offset-y-value" class="custom-offset-value custom-offset-input" value="${currentOffsetY}%" title="${t('custom.offsetY.current')}" data-i18n-title="custom.offsetY.current" autocomplete="off" spellcheck="false" onfocus="this.select()" oninput="window.handlePortraitInput && window.handlePortraitInput('offsetY', '${charKey}', this, ${defaultOffset})" onkeydown="window.handlePortraitInputKey && window.handlePortraitInputKey('offsetY', '${charKey}', this, ${defaultOffset}, event)" onblur="window.commitPortraitInput && window.commitPortraitInput('offsetY', '${charKey}', this, ${defaultOffset})">
                    <button type="button" class="custom-offset-btn" id="btn-offset-y-down" onclick="window.adjustPortraitOffsetY && window.adjustPortraitOffsetY('${charKey}', 2, ${defaultOffset}, event)" title="${t('custom.offsetY.down')}" data-i18n-title="custom.offsetY.down">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>
                </div>
                <button type="button" class="custom-reset-btn" id="btn-offset-y-reset" title="${t('custom.offsetY.reset')}" data-i18n-title="custom.offsetY.reset" onclick="window.resetPortraitOffsetY && window.resetPortraitOffsetY('${charKey}', ${defaultOffset})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-rotate-2">
                        <path d="M4.067 13.041a8 8 0 1 0 9.925 -8.788c-3.899 -1 -7.935 1.007 -9.425 4.747"></path>
                        <path d="M4 4v5h5"></path>
                    </svg>
                </button>
            </div>

            <!-- Contrôle D : Zoom / Échelle -->
            <div class="custom-row-with-reset">
                <div class="custom-offset-control" title="${t('custom.scale.title')}" data-i18n-title="custom.scale.title">
                    <button type="button" class="custom-offset-btn" id="btn-scale-down" onclick="window.adjustPortraitScale && window.adjustPortraitScale('${charKey}', -5, ${defaultOffset}, event)" title="${t('custom.scale.down')}" data-i18n-title="custom.scale.down">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </button>
                    <input type="text" id="custom-scale-value" class="custom-offset-value custom-offset-input" value="${currentScale}%" title="${t('custom.scale.current')}" data-i18n-title="custom.scale.current" autocomplete="off" spellcheck="false" onfocus="this.select()" oninput="window.handlePortraitInput && window.handlePortraitInput('scale', '${charKey}', this, ${defaultOffset})" onkeydown="window.handlePortraitInputKey && window.handlePortraitInputKey('scale', '${charKey}', this, ${defaultOffset}, event)" onblur="window.commitPortraitInput && window.commitPortraitInput('scale', '${charKey}', this, ${defaultOffset})">
                    <button type="button" class="custom-offset-btn" id="btn-scale-up" onclick="window.adjustPortraitScale && window.adjustPortraitScale('${charKey}', 5, ${defaultOffset}, event)" title="${t('custom.scale.up')}" data-i18n-title="custom.scale.up">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </button>
                </div>
                <button type="button" class="custom-reset-btn" id="btn-scale-reset" title="${t('custom.scale.reset')}" data-i18n-title="custom.scale.reset" onclick="window.resetPortraitScale && window.resetPortraitScale('${charKey}', ${defaultOffset})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-rotate-2">
                        <path d="M4.067 13.041a8 8 0 1 0 9.925 -8.788c-3.899 -1 -7.935 1.007 -9.425 4.747"></path>
                        <path d="M4 4v5h5"></path>
                    </svg>
                </button>
            </div>

            <!-- Contrôle 1 : Sélecteur de couleur -->
            <input type="color" id="custom-color-input" value="${validDefault}" style="position: absolute; opacity: 0; pointer-events: none; width: 0; height: 0;" oninput="window.updateCharHex && window.updateCharHex(this.value)" onchange="window.updateCharHex && window.updateCharHex(this.value)">

            <div class="custom-row-with-reset">
                <div class="custom-color-control" onclick="window.openCustomColorPicker && window.openCustomColorPicker(this, '${validDefault}')" title="${t('custom.color.change')}" data-i18n-title="custom.color.change">
                    <div id="custom-color-swatch" class="custom-color-swatch" style="background-color: ${validDefault};"></div>
                    <span id="custom-color-hex" class="custom-color-hex">${validDefault.toUpperCase()}</span>
                </div>
                <button type="button" class="custom-reset-btn" title="${t('custom.color.reset')}" data-i18n-title="custom.color.reset" onclick="window.resetCharHex && window.resetCharHex('${validDefault}')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-rotate-2">
                        <path d="M4.067 13.041a8 8 0 1 0 9.925 -8.788c-3.899 -1 -7.935 1.007 -9.425 4.747"></path>
                        <path d="M4 4v5h5"></path>
                    </svg>
                </button>
            </div>

            <!-- Séparateur -->
            <div class="custom-divider"></div>

            <!-- Style global : Classique ou Moderne -->
            <div class="custom-segmented-vertical" style="margin-bottom: 8px;">
                <button type="button" class="custom-segmented-item ${!isModern ? 'active' : ''}" id="btn-card-design-classic" onclick="window.setCardDesignMode && window.setCardDesignMode('classic')" data-i18n="custom.design.classic">
                    ${t('custom.design.classic')}
                </button>
                <button type="button" class="custom-segmented-item ${isModern ? 'active' : ''}" id="btn-card-design-modern" onclick="window.setCardDesignMode && window.setCardDesignMode('modern')" data-i18n="custom.design.modern">
                    ${t('custom.design.modern')}
                </button>
            </div>

            <!-- Contrôle 2 : Frost ou Transparent -->
            <div class="custom-toggle-group">
                <button type="button" class="custom-toggle-btn ${!isTransparent ? 'active' : ''}" id="btn-style-frost" onclick="window.setStyleMode && window.setStyleMode('frost')" title="${t('custom.style.frost')}" data-i18n-title="custom.style.frost">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-palette"><path d="M12 21a9 9 0 0 1 0 -18c4.97 0 9 3.582 9 8c0 1.06 -.474 2.078 -1.318 2.828c-.844 .75 -1.989 1.172 -3.182 1.172h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25"></path><path d="M7.5 10.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path><path d="M11.5 7.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path><path d="M15.5 10.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path></svg>
                </button>
                <button type="button" class="custom-toggle-btn ${isTransparent ? 'active' : ''}" id="btn-style-transparent" onclick="window.setStyleMode && window.setStyleMode('transparent')" title="${t('custom.style.transparent')}" data-i18n-title="custom.style.transparent">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-circle-half-2"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path><path d="M12 3v18"></path><path d="M12 14l7 -7"></path><path d="M12 19l8.5 -8.5"></path><path d="M12 9l4.5 -4.5"></path></svg>
                </button>
            </div>

            <!-- Contrôle 3 : Light ou Dark -->
            <div class="custom-toggle-group" style="margin-top: 8px;">
                <button type="button" class="custom-toggle-btn ${!isDark ? 'active' : ''}" id="btn-theme-light" onclick="window.setThemeMode && window.setThemeMode('light')" title="${t('custom.theme.light')}" data-i18n-title="custom.theme.light">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-sun"><path d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path><path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"></path></svg>
                </button>
                <button type="button" class="custom-toggle-btn ${isDark ? 'active' : ''}" id="btn-theme-dark" onclick="window.setThemeMode && window.setThemeMode('dark')" title="${t('custom.theme.dark')}" data-i18n-title="custom.theme.dark">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-moon"><path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454l0 .008"></path></svg>
                </button>
            </div>

            <!-- Contrôle 4 : Fond illustré ou Fond uni -->
            <div class="custom-toggle-group" style="margin-top: 8px;">
                <button type="button" class="custom-toggle-btn ${!hasNoBgSplash ? 'active' : ''}" id="btn-bgsplash-on" onclick="window.setBgSplashMode && window.setBgSplashMode('splash')" title="${t('custom.bgsplash.on')}" data-i18n-title="custom.bgsplash.on">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-photo"><path d="M15 8h.01"></path><path d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z"></path><path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5"></path><path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3"></path></svg>
                </button>
                <button type="button" class="custom-toggle-btn ${hasNoBgSplash ? 'active' : ''}" id="btn-bgsplash-off" onclick="window.setBgSplashMode && window.setBgSplashMode('no-splash')" title="${t('custom.bgsplash.off')}" data-i18n-title="custom.bgsplash.off">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-photo-off"><path d="M15 8h.01"></path><path d="M7 3h11a3 3 0 0 1 3 3v11m-.856 3.099a2.991 2.991 0 0 1 -2.144 .901h-12a3 3 0 0 1 -3 -3v-12c0 -.845 .349 -1.608 .91 -2.153"></path><path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5"></path><path d="M16.32 12.34c.577 -.059 1.162 .162 1.68 .66l3 3"></path><path d="M3 3l18 18"></path></svg>
                </button>
            </div>

            <!-- Séparateur -->
            <div class="custom-divider"></div>

            <!-- Contrôle 5 : Ombres (Avec ombres / Aura colorée / Sans ombres) -->
            <div class="custom-toggle-group">
                <button type="button" class="custom-toggle-btn ${shadowMode === 'shadow' ? 'active' : ''}" id="btn-shadow-on" onclick="window.setShadowMode && window.setShadowMode('shadow')" title="${t('custom.shadow.on')}" data-i18n-title="custom.shadow.on">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-shadow"><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path><path d="M13 12h5"></path><path d="M13 15h4"></path><path d="M13 18h1"></path><path d="M13 9h4"></path><path d="M13 6h1"></path></svg>
                </button>
                <button type="button" class="custom-toggle-btn ${shadowMode === 'glow' ? 'active' : ''}" id="btn-shadow-glow" onclick="window.setShadowMode && window.setShadowMode('glow')" title="${t('custom.shadow.glow')}" data-i18n-title="custom.shadow.glow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-sparkles"><path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z"></path></svg>
                </button>
                <button type="button" class="custom-toggle-btn ${shadowMode === 'no-shadow' ? 'active' : ''}" id="btn-shadow-off" onclick="window.setShadowMode && window.setShadowMode('no-shadow')" title="${t('custom.shadow.off')}" data-i18n-title="custom.shadow.off">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-shadow-off"><path d="M5.634 5.638a9 9 0 0 0 12.728 12.727m1.68 -2.32a9 9 0 0 0 -12.086 -12.088"></path><path d="M16 12h2"></path><path d="M13 15h2"></path><path d="M13 18h1"></path><path d="M13 9h4"></path><path d="M13 6h1"></path><path d="M3 3l18 18"></path></svg>
                </button>
            </div>

            <!-- Contrôle 6 : Border ou Sans Border -->
            <div class="custom-toggle-group" style="margin-top: 8px;">
                <button type="button" class="custom-toggle-btn ${!hasNoBorder ? 'active' : ''}" id="btn-border-on" onclick="window.setBorderMode && window.setBorderMode('border')" title="${t('custom.border.on')}" data-i18n-title="custom.border.on">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-square"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path></svg>
                </button>
                <button type="button" class="custom-toggle-btn ${hasNoBorder ? 'active' : ''}" id="btn-border-off" onclick="window.setBorderMode && window.setBorderMode('no-border')" title="${t('custom.border.off')}" data-i18n-title="custom.border.off">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-square-off"><path d="M8 4h10a2 2 0 0 1 2 2v10m-.584 3.414a2 2 0 0 1 -1.416 .586h-12a2 2 0 0 1 -2 -2v-12c0 -.547 .218 -1.043 .573 -1.402"></path><path d="M3 3l18 18"></path></svg>
                </button>
            </div>

            <!-- Contrôle 7 : Angles arrondis ou Carrés -->
            <div class="custom-toggle-group" style="margin-top: 8px;">
                <button type="button" class="custom-toggle-btn ${!isSquareCorners ? 'active' : ''}" id="btn-corners-rounded" onclick="window.setCornerMode && window.setCornerMode('rounded')" title="${t('custom.corner.rounded')}" data-i18n-title="custom.corner.rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-border-corner-rounded"><path d="M4 20v-10a6 6 0 0 1 6 -6h10"></path></svg>
                </button>
                <button type="button" class="custom-toggle-btn ${isSquareCorners ? 'active' : ''}" id="btn-corners-square" onclick="window.setCornerMode && window.setCornerMode('square')" title="${t('custom.corner.square')}" data-i18n-title="custom.corner.square">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-border-corner-square"><path d="M4 20v-16h16"></path></svg>
                </button>
            </div>

            <!-- Contrôle 8 : Rareté et Grade -->
            <div class="custom-toggle-group" style="margin-top: 8px;">
                <button type="button" class="custom-toggle-btn ${!hasNoRarity ? 'active' : ''}" id="btn-rarity-on" onclick="window.setRarityMode && window.setRarityMode('rarity')" title="${t('custom.rarity.on')}" data-i18n-title="custom.rarity.on">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-star"><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path></svg>
                </button>
                <button type="button" class="custom-toggle-btn ${hasNoRarity ? 'active' : ''}" id="btn-rarity-off" onclick="window.setRarityMode && window.setRarityMode('no-rarity')" title="${t('custom.rarity.off')}" data-i18n-title="custom.rarity.off">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-star-off"><path d="M3 3l18 18"></path><path d="M10.012 6.016l1.981 -4.014l3.086 6.253l6.9 1l-4.421 4.304m.012 4.01l.588 3.426l-6.158 -3.245l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l.856 -1.733"></path></svg>
                </button>
            </div>

            <!-- Séparateur -->
            <div class="custom-divider"></div>

            <!-- Contrôle 9 : Points de rolls des substats (Afficher / Coloriser / Masquer) -->
            <div class="custom-toggle-group">
                <button type="button" class="custom-toggle-btn ${rollDotsMode === 'dots' ? 'active' : ''}" id="btn-rolldots-on" onclick="window.setRollDotsMode && window.setRollDotsMode('dots')" title="${t('custom.rolldots.on')}" data-i18n-title="custom.rolldots.on">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-dots"><path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path><path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path></svg>
                </button>
                <button type="button" class="custom-toggle-btn ${rollDotsMode === 'colored' ? 'active' : ''}" id="btn-rolldots-colored" onclick="window.setRollDotsMode && window.setRollDotsMode('colored')" title="${t('custom.rolldots.colored')}" data-i18n-title="custom.rolldots.colored">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                        <circle cx="5" cy="12" r="2.2" fill="#6CED75" />
                        <circle cx="12" cy="12" r="2.2" fill="#00BFE9" />
                        <circle cx="19" cy="12" r="2.2" fill="#EE72F7" />
                    </svg>
                </button>
                <button type="button" class="custom-toggle-btn ${rollDotsMode === 'no-dots' ? 'active' : ''}" id="btn-rolldots-off" onclick="window.setRollDotsMode && window.setRollDotsMode('no-dots')" title="${t('custom.rolldots.off')}" data-i18n-title="custom.rolldots.off">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-dots-off"><path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path><path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path><path d="M3 3l18 18"></path></svg>
                </button>
            </div>

            <!-- Contrôle 10 : Stats inutiles (Griser / Barrer / Ne pas griser) -->
            <div class="custom-toggle-group" style="margin-top: 8px; margin-bottom: 8px;">
                <button type="button" class="custom-toggle-btn ${deadDimMode === 'dim' ? 'active' : ''}" id="btn-deaddim-on" onclick="window.setDeadDimMode && window.setDeadDimMode('dim')" title="${t('custom.deaddim.on')}" data-i18n-title="custom.deaddim.on">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-filter"><path d="M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.828 4.828a2 2 0 0 0 -.586 1.414v4.172l-4 2v-6.172a2 2 0 0 0 -.586 -1.414l-4.828 -4.828a2 2 0 0 1 -.586 -1.414v-2.172z"></path></svg>
                </button>
                <button type="button" class="custom-toggle-btn ${deadDimMode === 'strike' ? 'active' : ''}" id="btn-deaddim-strike" onclick="window.setDeadDimMode && window.setDeadDimMode('strike')" title="${t('custom.deaddim.strike')}" data-i18n-title="custom.deaddim.strike">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-strikethrough"><path d="M5 12l14 0"></path><path d="M16 6.5a4 2.5 0 0 0 -4 -2.5h-1a3.5 3.5 0 0 0 0 7h2a3.5 3.5 0 0 1 0 7h-1.5a4.5 4.5 0 0 1 -4 -2.5"></path></svg>
                </button>
                <button type="button" class="custom-toggle-btn ${deadDimMode === 'no-dim' ? 'active' : ''}" id="btn-deaddim-off" onclick="window.setDeadDimMode && window.setDeadDimMode('no-dim')" title="${t('custom.deaddim.off')}" data-i18n-title="custom.deaddim.off">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-filter-off"><path d="M3 3l18 18"></path><path d="M9 5h11a1 1 0 0 1 1 1v2a1 1 0 0 1 -.293 .707l-4.707 4.707v4.586l-4 2v-4.586m-2.293 -2.293l-3.414 -3.414a1 1 0 0 1 -.293 -.707v-2a1 1 0 0 1 1 -1h2"></path></svg>
                </button>
            </div>

            <!-- Contrôle 11 : Classement ou Rolls Totaux -->
            <div class="custom-segmented-vertical">
                <button type="button" class="custom-segmented-item ${!isScoreRolls ? 'active' : ''}" id="btn-score-ranking" onclick="window.setScoreDisplayMode && window.setScoreDisplayMode('ranking')" data-i18n="custom.score.ranking">
                    ${t('custom.score.ranking')}
                </button>
                <button type="button" class="custom-segmented-item ${isScoreRolls ? 'active' : ''}" id="btn-score-rolls" onclick="window.setScoreDisplayMode && window.setScoreDisplayMode('rolls')" data-i18n="custom.score.rolls">
                    ${t('custom.score.rolls')}
                </button>
            </div>

            <!-- Contrôle 12 : Score d'artéfact ou Crit Value -->
            <div class="custom-segmented-vertical" style="margin-top: 8px;">
                <button type="button" class="custom-segmented-item ${!isArtifactCv ? 'active' : ''}" id="btn-artscore-score" onclick="window.setArtifactScoreMode && window.setArtifactScoreMode('score')" data-i18n="custom.artscore.score">
                    ${t('custom.artscore.score')}
                </button>
                <button type="button" class="custom-segmented-item ${isArtifactCv ? 'active' : ''}" id="btn-artscore-cv" onclick="window.setArtifactScoreMode && window.setArtifactScoreMode('cv')" data-i18n="custom.artscore.cv">
                    ${t('custom.artscore.cv')}
                </button>
            </div>

            <!-- Section Exportation (Tout en bas de la barre) -->
            <div class="custom-export-section">
                <button type="button" onclick="exportBuildAsImage()" class="custom-bar-export-btn" title="${t('ui.exportBtn')}" data-i18n-title="ui.exportBtn">
                    <svg width="14px" fill="var(--text-always-white)" aria-hidden="true" viewBox="0 0 179 197" xmlns="http://www.w3.org/2000/svg" style="margin-bottom: 2px; flex-shrink: 0;">
                        <g clip-path="url(#clip0_976_726_custom)">
                            <path d="M178.41 72.16L163.84 72.13C163.447 72.13 163.125 72.5801 163.125 73.1303V141.13C163.125 141.68 163.447 142.13 163.84 142.13H178.388C178.782 142.13 179.104 141.68 179.104 141.13L179.125 73.1503C179.125 72.6001 178.803 72.16 178.417 72.15L178.41 72.16Z"></path>
                            <path d="M15.4098 72.16L0.840244 72.13C0.44686 72.13 0.125 72.5801 0.125 73.1303V141.13C0.125 141.68 0.44686 142.13 0.840244 142.13H15.3883C15.7817 142.13 16.1035 141.68 16.1035 141.13L16.125 73.1503C16.125 72.6001 15.8031 72.16 15.4169 72.15L15.4098 72.16Z"></path>
                            <path d="M36.1716 29.8284L45.8284 20.1716C46.5786 19.4214 47.596 19 48.6569 19H131.343C132.404 19 133.421 19.4214 134.172 20.1716L143.828 29.8284C144.579 30.5786 145 31.596 145 32.6569V45C145 45.5523 145.448 46 146 46H165C165.552 46 166 45.5523 166 45V25.5029C166 24.534 165.648 23.5981 165.01 22.8689L146.195 1.36598C145.436 0.497921 144.338 0 143.185 0H36.8151C35.6616 0 34.5643 0.497921 33.8048 1.36598L14.9897 22.8689C14.3517 23.5981 14 24.534 14 25.5029V45C14 45.5523 14.4477 46 15 46H34C34.5523 46 35 45.5523 35 45V32.6569C35 31.596 35.4214 30.5786 36.1716 29.8284Z"></path>
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M132.135 25.9503C132.415 25.9503 132.685 26.0704 132.875 26.2804L139.465 33.7599L139.625 34.2501L139.885 51.0197C139.895 51.8997 140.615 52.6095 141.495 52.6095H154.935V52.5997C155.484 52.5997 155.934 53.0498 155.935 53.5997V196.22C155.935 196.34 155.915 196.46 155.885 196.57C155.854 196.92 155.485 197.26 155.035 197.26H24.4746C24.2246 197.26 23.9942 197.16 23.8242 196.97C23.7242 196.85 23.5547 196.6 23.5547 196.22V53.6095C23.5549 53.0597 24.0048 52.6095 24.5547 52.6095H42.0146V34.2999C42.0147 34.04 42.1245 33.7799 42.3145 33.59L49.835 26.2198C50.0249 26.04 50.2752 25.9503 50.5352 25.9503H132.135ZM90.4346 97.1798C81.4946 97.1798 73.5644 100.92 68.0244 106.46C57.9746 116.51 53.8345 134.47 67.2344 151.95L67.2451 151.96C84.715 165.35 102.675 161.21 112.725 151.17C120.57 143.325 124.814 130.66 119.924 117.165C116.939 108.925 110.27 102.256 102.03 99.2688C98.0583 97.8288 94.1588 97.1798 90.4346 97.1798ZM107.473 68.2607C107.117 59.4368 99.3524 51.6646 90.529 51.2965C85.2066 51.0745 80.4615 53.2233 77.2051 56.4796H77.1943C71.5643 62.1096 69.2451 72.1801 76.7451 82.0001L76.7646 82.0197C86.5846 89.5196 96.6552 87.2004 102.285 81.5704C105.539 78.3166 107.687 73.5763 107.473 68.2607Z"
                            ></path>
                        </g>
                        <defs>
                            <clipPath id="clip0_976_726_custom">
                                <rect width="179" height="197" fill="var(--text-always-white)"></rect>
                            </clipPath>
                        </defs>
                    </svg>
                    <span style="white-space: nowrap;" data-i18n="ui.exportBtn">${t('ui.exportBtn')}</span>
                </button>
            </div>
        </div>
    `;
}

if (typeof window !== 'undefined') {
    if (!window.customizationState) {
        const savedCardDesign = localStorage.getItem('guoba_custom_card_design');
        const savedMode = localStorage.getItem('guoba_custom_style_mode');
        const savedTheme = localStorage.getItem('guoba_custom_theme_mode');
        const savedBgSplash = localStorage.getItem('guoba_custom_bgsplash_mode');
        const savedShadow = localStorage.getItem('guoba_custom_shadow_mode');
        const savedBorder = localStorage.getItem('guoba_custom_border_mode');
        const savedCorner = localStorage.getItem('guoba_custom_corner_mode');
        const savedRarity = localStorage.getItem('guoba_custom_rarity_mode');
        const savedRollDots = localStorage.getItem('guoba_custom_rolldots_mode');
        const savedDeadDim = localStorage.getItem('guoba_custom_deaddim_mode');
        const savedScore = localStorage.getItem('guoba_custom_score_mode');
        const savedArtScore = localStorage.getItem('guoba_custom_artscore_mode');
        window.customizationState = {
            cardDesignMode: savedCardDesign === 'modern' ? 'modern' : 'classic',
            styleMode: savedMode === 'transparent' ? 'transparent' : 'frost',
            themeMode: savedTheme === 'dark' ? 'dark' : 'light',
            bgSplashMode: savedBgSplash === 'no-splash' ? 'no-splash' : 'splash',
            shadowMode: (savedShadow === 'no-shadow' || savedShadow === 'glow') ? savedShadow : 'shadow',
            borderMode: savedBorder === 'no-border' ? 'no-border' : 'border',
            cornerMode: savedCorner === 'square' ? 'square' : 'rounded',
            rarityMode: savedRarity === 'no-rarity' ? 'no-rarity' : 'rarity',
            rollDotsMode: (savedRollDots === 'no-dots' || savedRollDots === 'colored') ? savedRollDots : 'dots',
            deadDimMode: (savedDeadDim === 'no-dim' || savedDeadDim === 'strike') ? savedDeadDim : 'dim',
            scoreMode: savedScore === 'rolls' ? 'rolls' : 'ranking',
            artScoreMode: savedArtScore === 'cv' ? 'cv' : 'score',
            customSplashes: {},
            customOffsets: {},
            customOffsetsY: {},
            customScales: {}
        };
    } else {
        window.customizationState.customSplashes = window.customizationState.customSplashes || {};
        window.customizationState.customOffsets = window.customizationState.customOffsets || {};
        window.customizationState.customOffsetsY = window.customizationState.customOffsetsY || {};
        window.customizationState.customScales = window.customizationState.customScales || {};
    }

    window.openCustomImagePicker = function () {
        const input = document.getElementById('custom-image-input');
        if (input) input.click();
    };

    window.applyCustomSplash = function (charKey, dataUrl) {
        window.customizationState = window.customizationState || {};
        window.customizationState.customSplashes = window.customizationState.customSplashes || {};
        window.customizationState.customSplashes[charKey] = dataUrl;

        try {
            localStorage.setItem('guoba_custom_splash_' + charKey, dataUrl);
        } catch (e) {
            console.warn('Storage quota exceeded for custom splash, saved in memory only:', e);
        }

        const portraitImg = document.querySelector('.character-portrait');
        if (portraitImg) {
            portraitImg.src = dataUrl;
        }

        const bgSplash = document.querySelector('.background-splash-art');
        if (bgSplash) {
            bgSplash.style.backgroundImage = 'url("' + dataUrl + '")';
        }

        if (bgSplash && bgSplash.nextElementSibling && bgSplash.nextElementSibling.tagName === 'IMG') {
            bgSplash.nextElementSibling.src = dataUrl;
        }
    };

    window.handleCustomImageUpload = function (input, charKey) {
        if (!input || !input.files || !input.files[0]) return;
        const file = input.files[0];
        if (!file.type.startsWith('image/')) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            const rawDataUrl = e.target.result;
            const img = new Image();
            img.onload = function () {
                let width = img.width;
                let height = img.height;
                const maxDim = 1920;
                if (width > maxDim || height > maxDim) {
                    if (width > height) {
                        height = Math.round((height * maxDim) / width);
                        width = maxDim;
                    } else {
                        width = Math.round((width * maxDim) / height);
                        height = maxDim;
                    }
                }
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                let dataUrl = rawDataUrl;
                try {
                    const webpUrl = canvas.toDataURL('image/webp', 0.92);
                    if (webpUrl && webpUrl.startsWith('data:image/webp')) {
                        dataUrl = webpUrl;
                    } else {
                        dataUrl = canvas.toDataURL('image/png');
                    }
                } catch (err) {
                    dataUrl = rawDataUrl;
                }

                window.applyCustomSplash(charKey, dataUrl);
            };
            img.onerror = function () {
                window.applyCustomSplash(charKey, rawDataUrl);
            };
            img.src = rawDataUrl;
        };
        reader.readAsDataURL(file);
        input.value = '';
    };

    window.applyPortraitTransform = function (charKey, defaultOffsetX) {
        const defX = typeof defaultOffsetX === 'number' ? defaultOffsetX : -35;
        const offsetX = window.customizationState?.customOffsets?.[charKey] ??
            (localStorage.getItem('guoba_custom_offset_' + charKey) !== null ? Number(localStorage.getItem('guoba_custom_offset_' + charKey)) : defX);

        const offsetY = window.customizationState?.customOffsetsY?.[charKey] ??
            (localStorage.getItem('guoba_custom_offset_y_' + charKey) !== null ? Number(localStorage.getItem('guoba_custom_offset_y_' + charKey)) : 0);

        const scale = window.customizationState?.customScales?.[charKey] ??
            (localStorage.getItem('guoba_custom_scale_' + charKey) !== null ? Number(localStorage.getItem('guoba_custom_scale_' + charKey)) : 100);

        const portraitImg = document.querySelector('.character-portrait');
        if (portraitImg) {
            portraitImg.style.transform = `translateX(${offsetX}%) translateY(${offsetY}%) scale(${scale / 100})`;
        }
    };

    window.resetCustomImage = function (charKey, defaultSplash, defaultOffsetX) {
        window.customizationState = window.customizationState || {};

        if (window.customizationState.customSplashes) {
            delete window.customizationState.customSplashes[charKey];
        }
        try {
            localStorage.removeItem('guoba_custom_splash_' + charKey);
        } catch (e) { }

        if (window.customizationState.customOffsets) {
            delete window.customizationState.customOffsets[charKey];
        }
        try {
            localStorage.removeItem('guoba_custom_offset_' + charKey);
        } catch (e) { }

        if (window.customizationState.customOffsetsY) {
            delete window.customizationState.customOffsetsY[charKey];
        }
        try {
            localStorage.removeItem('guoba_custom_offset_y_' + charKey);
        } catch (e) { }

        if (window.customizationState.customScales) {
            delete window.customizationState.customScales[charKey];
        }
        try {
            localStorage.removeItem('guoba_custom_scale_' + charKey);
        } catch (e) { }

        const defX = typeof defaultOffsetX === 'number' ? defaultOffsetX : -35;

        const portraitImg = document.querySelector('.character-portrait');
        if (portraitImg) {
            portraitImg.src = defaultSplash;
            portraitImg.style.transform = `translateX(${defX}%) translateY(0%) scale(1)`;
        }

        const bgSplash = document.querySelector('.background-splash-art');
        if (bgSplash) {
            bgSplash.style.backgroundImage = 'url("' + defaultSplash + '")';
        }

        if (bgSplash && bgSplash.nextElementSibling && bgSplash.nextElementSibling.tagName === 'IMG') {
            bgSplash.nextElementSibling.src = defaultSplash;
        }

        function updateDisplayElement(id, text) {
            const el = document.getElementById(id);
            if (el) {
                if ('value' in el) el.value = text;
                el.textContent = text;
            }
        }

        updateDisplayElement('custom-offset-value', `${defX}%`);
        updateDisplayElement('custom-offset-y-value', '0%');
        updateDisplayElement('custom-scale-value', '100%');
    };

    function updateDisplayElement(id, text) {
        const el = document.getElementById(id);
        if (el) {
            if ('value' in el) el.value = text;
            el.textContent = text;
        }
    }

    window.adjustPortraitOffset = function (charKey, delta, defaultOffset, event) {
        window.customizationState = window.customizationState || {};
        window.customizationState.customOffsets = window.customizationState.customOffsets || {};

        let current = window.customizationState.customOffsets[charKey];
        if (typeof current !== 'number') {
            const saved = localStorage.getItem('guoba_custom_offset_' + charKey);
            current = saved !== null ? Number(saved) : defaultOffset;
        }

        const actualDelta = (event && event.shiftKey) ? delta * 5 : delta;
        let nextOffset = Math.round((current + actualDelta) * 10) / 10;
        nextOffset = Math.max(-200, Math.min(200, nextOffset));

        window.customizationState.customOffsets[charKey] = nextOffset;
        try {
            localStorage.setItem('guoba_custom_offset_' + charKey, nextOffset.toString());
        } catch (e) { }

        window.applyPortraitTransform(charKey, defaultOffset);

        updateDisplayElement('custom-offset-value', `${nextOffset}%`);
    };

    window.resetPortraitOffset = function (charKey, defaultOffset) {
        window.customizationState = window.customizationState || {};
        window.customizationState.customOffsets = window.customizationState.customOffsets || {};
        delete window.customizationState.customOffsets[charKey];
        try {
            localStorage.removeItem('guoba_custom_offset_' + charKey);
        } catch (e) { }

        window.applyPortraitTransform(charKey, defaultOffset);

        updateDisplayElement('custom-offset-value', `${defaultOffset}%`);
    };

    window.adjustPortraitOffsetY = function (charKey, delta, defaultOffset, event) {
        window.customizationState = window.customizationState || {};
        window.customizationState.customOffsetsY = window.customizationState.customOffsetsY || {};

        let current = window.customizationState.customOffsetsY[charKey];
        if (typeof current !== 'number') {
            const saved = localStorage.getItem('guoba_custom_offset_y_' + charKey);
            current = saved !== null ? Number(saved) : 0;
        }

        const actualDelta = (event && event.shiftKey) ? delta * 5 : delta;
        let nextOffset = Math.round((current + actualDelta) * 10) / 10;
        nextOffset = Math.max(-200, Math.min(200, nextOffset));

        window.customizationState.customOffsetsY[charKey] = nextOffset;
        try {
            localStorage.setItem('guoba_custom_offset_y_' + charKey, nextOffset.toString());
        } catch (e) { }

        window.applyPortraitTransform(charKey, defaultOffset);

        updateDisplayElement('custom-offset-y-value', `${nextOffset}%`);
    };

    window.resetPortraitOffsetY = function (charKey, defaultOffset) {
        window.customizationState = window.customizationState || {};
        window.customizationState.customOffsetsY = window.customizationState.customOffsetsY || {};
        delete window.customizationState.customOffsetsY[charKey];
        try {
            localStorage.removeItem('guoba_custom_offset_y_' + charKey);
        } catch (e) { }

        window.applyPortraitTransform(charKey, defaultOffset);

        updateDisplayElement('custom-offset-y-value', '0%');
    };

    window.adjustPortraitScale = function (charKey, delta, defaultOffset, event) {
        window.customizationState = window.customizationState || {};
        window.customizationState.customScales = window.customizationState.customScales || {};

        let current = window.customizationState.customScales[charKey];
        if (typeof current !== 'number') {
            const saved = localStorage.getItem('guoba_custom_scale_' + charKey);
            current = saved !== null ? Number(saved) : 100;
        }

        const actualDelta = (event && event.shiftKey) ? delta * 3 : delta;
        let nextScale = Math.round((current + actualDelta) * 10) / 10;
        nextScale = Math.max(20, Math.min(300, nextScale));

        window.customizationState.customScales[charKey] = nextScale;
        try {
            localStorage.setItem('guoba_custom_scale_' + charKey, nextScale.toString());
        } catch (e) { }

        window.applyPortraitTransform(charKey, defaultOffset);

        updateDisplayElement('custom-scale-value', `${nextScale}%`);
    };

    window.resetPortraitScale = function (charKey, defaultOffset) {
        window.customizationState = window.customizationState || {};
        window.customizationState.customScales = window.customizationState.customScales || {};
        delete window.customizationState.customScales[charKey];
        try {
            localStorage.removeItem('guoba_custom_scale_' + charKey);
        } catch (e) { }

        window.applyPortraitTransform(charKey, defaultOffset);

        updateDisplayElement('custom-scale-value', '100%');
    };

    window.handlePortraitInput = function (type, charKey, inputEl, defaultOffset) {
        if (!inputEl) return;
        window.customizationState = window.customizationState || {};

        let raw = inputEl.value.trim().replace('%', '').replace(',', '.');
        let num = parseFloat(raw);
        if (isNaN(num)) return;

        if (type === 'offsetX') {
            num = Math.round(num * 10) / 10;
            num = Math.max(-200, Math.min(200, num));
            window.customizationState.customOffsets = window.customizationState.customOffsets || {};
            window.customizationState.customOffsets[charKey] = num;
            try { localStorage.setItem('guoba_custom_offset_' + charKey, num.toString()); } catch (e) { }
            window.applyPortraitTransform(charKey, defaultOffset);
        } else if (type === 'offsetY') {
            num = Math.round(num * 10) / 10;
            num = Math.max(-200, Math.min(200, num));
            window.customizationState.customOffsetsY = window.customizationState.customOffsetsY || {};
            window.customizationState.customOffsetsY[charKey] = num;
            try { localStorage.setItem('guoba_custom_offset_y_' + charKey, num.toString()); } catch (e) { }
            window.applyPortraitTransform(charKey, defaultOffset);
        } else if (type === 'scale') {
            num = Math.round(num * 10) / 10;
            num = Math.max(20, Math.min(300, num));
            window.customizationState.customScales = window.customizationState.customScales || {};
            window.customizationState.customScales[charKey] = num;
            try { localStorage.setItem('guoba_custom_scale_' + charKey, num.toString()); } catch (e) { }
            window.applyPortraitTransform(charKey, defaultOffset);
        }
    };

    window.commitPortraitInput = function (type, charKey, inputEl, defaultOffset) {
        if (!inputEl) return;
        window.customizationState = window.customizationState || {};

        let raw = inputEl.value.trim().replace('%', '').replace(',', '.');
        let num = parseFloat(raw);

        if (isNaN(num)) {
            window.revertPortraitInput(type, charKey, inputEl, defaultOffset);
            return;
        }

        if (type === 'offsetX') {
            num = Math.round(num * 10) / 10;
            num = Math.max(-200, Math.min(200, num));
            window.customizationState.customOffsets = window.customizationState.customOffsets || {};
            window.customizationState.customOffsets[charKey] = num;
            try { localStorage.setItem('guoba_custom_offset_' + charKey, num.toString()); } catch (e) { }
            window.applyPortraitTransform(charKey, defaultOffset);
            inputEl.value = `${num}%`;
        } else if (type === 'offsetY') {
            num = Math.round(num * 10) / 10;
            num = Math.max(-200, Math.min(200, num));
            window.customizationState.customOffsetsY = window.customizationState.customOffsetsY || {};
            window.customizationState.customOffsetsY[charKey] = num;
            try { localStorage.setItem('guoba_custom_offset_y_' + charKey, num.toString()); } catch (e) { }
            window.applyPortraitTransform(charKey, defaultOffset);
            inputEl.value = `${num}%`;
        } else if (type === 'scale') {
            num = Math.round(num * 10) / 10;
            num = Math.max(20, Math.min(300, num));
            window.customizationState.customScales = window.customizationState.customScales || {};
            window.customizationState.customScales[charKey] = num;
            try { localStorage.setItem('guoba_custom_scale_' + charKey, num.toString()); } catch (e) { }
            window.applyPortraitTransform(charKey, defaultOffset);
            inputEl.value = `${num}%`;
        }
    };

    window.revertPortraitInput = function (type, charKey, inputEl, defaultOffset) {
        if (!inputEl) return;
        window.customizationState = window.customizationState || {};

        if (type === 'offsetX') {
            const cur = window.customizationState.customOffsets?.[charKey] ??
                (typeof localStorage !== 'undefined' && localStorage.getItem('guoba_custom_offset_' + charKey) !== null ? Number(localStorage.getItem('guoba_custom_offset_' + charKey)) : defaultOffset);
            inputEl.value = `${cur}%`;
        } else if (type === 'offsetY') {
            const cur = window.customizationState.customOffsetsY?.[charKey] ??
                (typeof localStorage !== 'undefined' && localStorage.getItem('guoba_custom_offset_y_' + charKey) !== null ? Number(localStorage.getItem('guoba_custom_offset_y_' + charKey)) : 0);
            inputEl.value = `${cur}%`;
        } else if (type === 'scale') {
            const cur = window.customizationState.customScales?.[charKey] ??
                (typeof localStorage !== 'undefined' && localStorage.getItem('guoba_custom_scale_' + charKey) !== null ? Number(localStorage.getItem('guoba_custom_scale_' + charKey)) : 100);
            inputEl.value = `${cur}%`;
        }
    };

    window.handlePortraitInputKey = function (type, charKey, inputEl, defaultOffset, event) {
        if (!event) return;
        if (event.key === 'Enter') {
            inputEl.blur();
        } else if (event.key === 'Escape') {
            window.revertPortraitInput(type, charKey, inputEl, defaultOffset);
            inputEl.blur();
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            const step = type === 'scale' ? 5 : 2;
            if (type === 'offsetX') window.adjustPortraitOffset(charKey, step, defaultOffset, event);
            else if (type === 'offsetY') window.adjustPortraitOffsetY(charKey, step, defaultOffset, event);
            else if (type === 'scale') window.adjustPortraitScale(charKey, step, defaultOffset, event);
            setTimeout(() => inputEl.select(), 10);
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            const step = type === 'scale' ? -5 : -2;
            if (type === 'offsetX') window.adjustPortraitOffset(charKey, step, defaultOffset, event);
            else if (type === 'offsetY') window.adjustPortraitOffsetY(charKey, step, defaultOffset, event);
            else if (type === 'scale') window.adjustPortraitScale(charKey, step, defaultOffset, event);
            setTimeout(() => inputEl.select(), 10);
        }
    };

    window.openCustomColorPicker = function (triggerEl, defaultColor) {
        if (openCustomColorPicker) {
            openCustomColorPicker(triggerEl || document.querySelector('.custom-color-control'), defaultColor);
        } else {
            const input = document.getElementById('custom-color-input');
            if (input) input.click();
        }
    };

    window.updateCharHex = function (color) {
        if (!color) return;
        const normalized = normalizeHex(color);

        const wrapper = document.querySelector('.showcase-wrapper');
        if (wrapper) {
            wrapper.style.setProperty('--char-hex', normalized);
        }

        const swatch = document.getElementById('custom-color-swatch');
        if (swatch) {
            swatch.style.backgroundColor = normalized;
        }

        const hexDisplay = document.getElementById('custom-color-hex');
        if (hexDisplay) {
            hexDisplay.textContent = normalized.toUpperCase();
        }

        const input = document.getElementById('custom-color-input');
        if (input && input.value.toLowerCase() !== normalized.toLowerCase()) {
            input.value = normalized;
        }
    };

    window.resetCharHex = function (defaultColor) {
        window.updateCharHex(defaultColor);
        if (window.customColorPickerSetHex) {
            window.customColorPickerSetHex(defaultColor, false);
        }
    };

    function toggleShowcaseClass(cls, add) {
        const wrapper = document.querySelector('.showcase-wrapper');
        const topRow = document.querySelector('.top-row');
        if (add) {
            if (wrapper) wrapper.classList.add(cls);
            if (topRow) topRow.classList.add(cls);
        } else {
            if (wrapper) wrapper.classList.remove(cls);
            if (topRow) topRow.classList.remove(cls);
        }
    }

    window.setStyleMode = function (mode) {
        window.customizationState = window.customizationState || {};
        window.customizationState.styleMode = mode;
        try {
            localStorage.setItem('guoba_custom_style_mode', mode);
        } catch (e) { }

        const btnFrost = document.getElementById('btn-style-frost');
        const btnTransp = document.getElementById('btn-style-transparent');

        if (mode === 'transparent') {
            toggleShowcaseClass('mode-transparent', true);
            if (btnFrost) btnFrost.classList.remove('active');
            if (btnTransp) btnTransp.classList.add('active');
        } else {
            toggleShowcaseClass('mode-transparent', false);
            if (btnFrost) btnFrost.classList.add('active');
            if (btnTransp) btnTransp.classList.remove('active');
        }
    };

    window.setThemeMode = function (mode) {
        window.customizationState = window.customizationState || {};
        window.customizationState.themeMode = mode;
        try {
            localStorage.setItem('guoba_custom_theme_mode', mode);
        } catch (e) { }

        const btnLight = document.getElementById('btn-theme-light');
        const btnDark = document.getElementById('btn-theme-dark');

        if (mode === 'dark') {
            toggleShowcaseClass('mode-dark', true);
            if (btnLight) btnLight.classList.remove('active');
            if (btnDark) btnDark.classList.add('active');
        } else {
            toggleShowcaseClass('mode-dark', false);
            if (btnLight) btnLight.classList.add('active');
            if (btnDark) btnDark.classList.remove('active');
        }
    };

    window.setBgSplashMode = function (mode) {
        window.customizationState = window.customizationState || {};
        window.customizationState.bgSplashMode = mode;
        try {
            localStorage.setItem('guoba_custom_bgsplash_mode', mode);
        } catch (e) { }

        const btnOn = document.getElementById('btn-bgsplash-on');
        const btnOff = document.getElementById('btn-bgsplash-off');

        if (mode === 'no-splash') {
            toggleShowcaseClass('mode-no-bg-splash', true);
            if (btnOn) btnOn.classList.remove('active');
            if (btnOff) btnOff.classList.add('active');
        } else {
            toggleShowcaseClass('mode-no-bg-splash', false);
            if (btnOn) btnOn.classList.add('active');
            if (btnOff) btnOff.classList.remove('active');
        }
    };

    window.setShadowMode = function (mode) {
        window.customizationState = window.customizationState || {};
        window.customizationState.shadowMode = mode;
        try {
            localStorage.setItem('guoba_custom_shadow_mode', mode);
        } catch (e) { }

        const btnOn = document.getElementById('btn-shadow-on');
        const btnGlow = document.getElementById('btn-shadow-glow');
        const btnOff = document.getElementById('btn-shadow-off');

        if (mode === 'no-shadow') {
            toggleShowcaseClass('mode-no-shadow', true);
            toggleShowcaseClass('mode-glow-shadow', false);
            if (btnOn) btnOn.classList.remove('active');
            if (btnGlow) btnGlow.classList.remove('active');
            if (btnOff) btnOff.classList.add('active');
        } else if (mode === 'glow') {
            toggleShowcaseClass('mode-no-shadow', false);
            toggleShowcaseClass('mode-glow-shadow', true);
            if (btnOn) btnOn.classList.remove('active');
            if (btnGlow) btnGlow.classList.add('active');
            if (btnOff) btnOff.classList.remove('active');
        } else {
            toggleShowcaseClass('mode-no-shadow', false);
            toggleShowcaseClass('mode-glow-shadow', false);
            if (btnOn) btnOn.classList.add('active');
            if (btnGlow) btnGlow.classList.remove('active');
            if (btnOff) btnOff.classList.remove('active');
        }
    };

    window.setBorderMode = function (mode) {
        window.customizationState = window.customizationState || {};
        window.customizationState.borderMode = mode;
        try {
            localStorage.setItem('guoba_custom_border_mode', mode);
        } catch (e) { }

        const btnOn = document.getElementById('btn-border-on');
        const btnOff = document.getElementById('btn-border-off');

        if (mode === 'no-border') {
            toggleShowcaseClass('mode-no-border', true);
            if (btnOn) btnOn.classList.remove('active');
            if (btnOff) btnOff.classList.add('active');
        } else {
            toggleShowcaseClass('mode-no-border', false);
            if (btnOn) btnOn.classList.add('active');
            if (btnOff) btnOff.classList.remove('active');
        }
    };

    window.setCornerMode = function (mode) {
        window.customizationState = window.customizationState || {};
        window.customizationState.cornerMode = mode;
        try {
            localStorage.setItem('guoba_custom_corner_mode', mode);
        } catch (e) { }

        const btnRounded = document.getElementById('btn-corners-rounded');
        const btnSquare = document.getElementById('btn-corners-square');

        if (mode === 'square') {
            toggleShowcaseClass('mode-square-corners', true);
            if (btnRounded) btnRounded.classList.remove('active');
            if (btnSquare) btnSquare.classList.add('active');
        } else {
            toggleShowcaseClass('mode-square-corners', false);
            if (btnRounded) btnRounded.classList.add('active');
            if (btnSquare) btnSquare.classList.remove('active');
        }
    };

    window.setRarityMode = function (mode) {
        window.customizationState = window.customizationState || {};
        window.customizationState.rarityMode = mode;
        try {
            localStorage.setItem('guoba_custom_rarity_mode', mode);
        } catch (e) { }

        const btnOn = document.getElementById('btn-rarity-on');
        const btnOff = document.getElementById('btn-rarity-off');

        if (mode === 'no-rarity') {
            toggleShowcaseClass('mode-no-rarity', true);
            if (btnOn) btnOn.classList.remove('active');
            if (btnOff) btnOff.classList.add('active');
        } else {
            toggleShowcaseClass('mode-no-rarity', false);
            if (btnOn) btnOn.classList.add('active');
            if (btnOff) btnOff.classList.remove('active');
        }
    };

    window.setRollDotsMode = function (mode) {
        window.customizationState = window.customizationState || {};
        window.customizationState.rollDotsMode = mode;
        try {
            localStorage.setItem('guoba_custom_rolldots_mode', mode);
        } catch (e) { }

        const btnOn = document.getElementById('btn-rolldots-on');
        const btnColored = document.getElementById('btn-rolldots-colored');
        const btnOff = document.getElementById('btn-rolldots-off');

        if (mode === 'no-dots') {
            toggleShowcaseClass('mode-no-roll-dots', true);
            toggleShowcaseClass('mode-colored-roll-dots', false);
            if (btnOn) btnOn.classList.remove('active');
            if (btnColored) btnColored.classList.remove('active');
            if (btnOff) btnOff.classList.add('active');
        } else if (mode === 'colored') {
            toggleShowcaseClass('mode-no-roll-dots', false);
            toggleShowcaseClass('mode-colored-roll-dots', true);
            if (btnOn) btnOn.classList.remove('active');
            if (btnColored) btnColored.classList.add('active');
            if (btnOff) btnOff.classList.remove('active');
        } else {
            toggleShowcaseClass('mode-no-roll-dots', false);
            toggleShowcaseClass('mode-colored-roll-dots', false);
            if (btnOn) btnOn.classList.add('active');
            if (btnColored) btnColored.classList.remove('active');
            if (btnOff) btnOff.classList.remove('active');
        }
    };

    window.setDeadDimMode = function (mode) {
        window.customizationState = window.customizationState || {};
        window.customizationState.deadDimMode = mode;
        try {
            localStorage.setItem('guoba_custom_deaddim_mode', mode);
        } catch (e) { }

        const btnOn = document.getElementById('btn-deaddim-on');
        const btnStrike = document.getElementById('btn-deaddim-strike');
        const btnOff = document.getElementById('btn-deaddim-off');

        if (mode === 'no-dim') {
            toggleShowcaseClass('mode-no-dead-dim', true);
            toggleShowcaseClass('mode-strike-dead-dim', false);
            if (btnOn) btnOn.classList.remove('active');
            if (btnStrike) btnStrike.classList.remove('active');
            if (btnOff) btnOff.classList.add('active');
        } else if (mode === 'strike') {
            toggleShowcaseClass('mode-no-dead-dim', false);
            toggleShowcaseClass('mode-strike-dead-dim', true);
            if (btnOn) btnOn.classList.remove('active');
            if (btnStrike) btnStrike.classList.add('active');
            if (btnOff) btnOff.classList.remove('active');
        } else {
            toggleShowcaseClass('mode-no-dead-dim', false);
            toggleShowcaseClass('mode-strike-dead-dim', false);
            if (btnOn) btnOn.classList.add('active');
            if (btnStrike) btnStrike.classList.remove('active');
            if (btnOff) btnOff.classList.remove('active');
        }
    };

    window.setScoreDisplayMode = function (mode) {
        window.customizationState = window.customizationState || {};
        window.customizationState.scoreMode = mode;
        try {
            localStorage.setItem('guoba_custom_score_mode', mode);
        } catch (e) { }

        const btnRanking = document.getElementById('btn-score-ranking');
        const btnRolls = document.getElementById('btn-score-rolls');

        if (mode === 'rolls') {
            toggleShowcaseClass('mode-score-rolls', true);
            if (btnRanking) btnRanking.classList.remove('active');
            if (btnRolls) btnRolls.classList.add('active');
        } else {
            toggleShowcaseClass('mode-score-rolls', false);
            if (btnRanking) btnRanking.classList.add('active');
            if (btnRolls) btnRolls.classList.remove('active');
        }
    };

    window.setArtifactScoreMode = function (mode) {
        window.customizationState = window.customizationState || {};
        window.customizationState.artScoreMode = mode;
        try {
            localStorage.setItem('guoba_custom_artscore_mode', mode);
        } catch (e) { }

        const btnScore = document.getElementById('btn-artscore-score');
        const btnCv = document.getElementById('btn-artscore-cv');

        if (mode === 'cv') {
            toggleShowcaseClass('mode-artifact-cv', true);
            if (btnScore) btnScore.classList.remove('active');
            if (btnCv) btnCv.classList.add('active');
        } else {
            toggleShowcaseClass('mode-artifact-cv', false);
            if (btnScore) btnScore.classList.add('active');
            if (btnCv) btnCv.classList.remove('active');
        }
    };

    window.setCardDesignMode = function (mode) {
        window.customizationState = window.customizationState || {};
        window.customizationState.cardDesignMode = mode;
        try {
            localStorage.setItem('guoba_custom_card_design', mode);
        } catch (e) { }

        const btnClassic = document.getElementById('btn-card-design-classic');
        const btnModern = document.getElementById('btn-card-design-modern');

        if (mode === 'modern') {
            toggleShowcaseClass('mode-modern', true);
            if (btnClassic) btnClassic.classList.remove('active');
            if (btnModern) btnModern.classList.add('active');
            if (typeof window.setShadowMode === 'function') {
                window.setShadowMode('no-shadow');
            }
        } else {
            toggleShowcaseClass('mode-modern', false);
            if (btnClassic) btnClassic.classList.add('active');
            if (btnModern) btnModern.classList.remove('active');
            if (typeof window.setShadowMode === 'function') {
                window.setShadowMode('shadow');
            }
        }
    };
}
