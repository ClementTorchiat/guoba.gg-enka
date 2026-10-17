// src/components/showcase/CustomizationBar.js

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

    return `
        <div class="customization-bar">
            <!-- Titre de la section -->
            <h3 class="custom-title">Personnalisation</h3>

            <!-- Séparateur -->
            <div class="custom-divider"></div>

            <!-- Contrôle A : Image personnalisée -->
            <input type="file" id="custom-image-input" accept="image/*" style="display: none;" onchange="window.handleCustomImageUpload && window.handleCustomImageUpload(this, '${charKey}')">

            <div class="custom-row-with-reset">
                <div class="custom-image-control" onclick="window.openCustomImagePicker && window.openCustomImagePicker()" title="Changer l'image du personnage (portrait et fond)">
                    <div class="custom-image-btn-content">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-photo-up">
                            <path d="M15 8h.01"></path>
                            <path d="M12 20h-7a3 3 0 0 1 -3 -3v-10a3 3 0 0 1 3 -3h14a3 3 0 0 1 3 3v5"></path>
                            <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l4 4"></path>
                            <path d="M14 14l1 -1c.617 -.594 1.328 -.793 2.009 -.598"></path>
                            <path d="M19 22v-6"></path>
                            <path d="M22 19l-3 -3l-3 3"></path>
                        </svg>
                        <span>Image</span>
                    </div>
                </div>
                <button type="button" class="custom-reset-btn" title="Réinitialiser l'image et le cadrage (Master Reset)" onclick="window.resetCustomImage && window.resetCustomImage('${charKey}', '${safeDefaultSplash}', ${defaultOffset})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-rotate-2">
                        <path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747"></path>
                        <path d="M20 4v5h-5"></path>
                    </svg>
                </button>
            </div>

            <!-- Contrôle B : Décalage horizontal X -->
            <div class="custom-row-with-reset">
                <div class="custom-offset-control" title="Décalage horizontal du portrait">
                    <button type="button" class="custom-offset-btn" id="btn-offset-left" onclick="window.adjustPortraitOffset && window.adjustPortraitOffset('${charKey}', -2, ${defaultOffset}, event)" title="Déplacer vers la gauche (Shift pour aller plus vite)">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <span id="custom-offset-value" class="custom-offset-value" title="Position horizontale actuelle">${currentOffsetX}%</span>
                    <button type="button" class="custom-offset-btn" id="btn-offset-right" onclick="window.adjustPortraitOffset && window.adjustPortraitOffset('${charKey}', 2, ${defaultOffset}, event)" title="Déplacer vers la droite (Shift pour aller plus vite)">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </div>
                <button type="button" class="custom-reset-btn" id="btn-offset-reset" title="Réinitialiser la position horizontale (${defaultOffset}%)" onclick="window.resetPortraitOffset && window.resetPortraitOffset('${charKey}', ${defaultOffset})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-rotate-2">
                        <path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747"></path>
                        <path d="M20 4v5h-5"></path>
                    </svg>
                </button>
            </div>

            <!-- Contrôle C : Décalage vertical Y -->
            <div class="custom-row-with-reset">
                <div class="custom-offset-control" title="Décalage vertical du portrait">
                    <button type="button" class="custom-offset-btn" id="btn-offset-y-up" onclick="window.adjustPortraitOffsetY && window.adjustPortraitOffsetY('${charKey}', -2, ${defaultOffset}, event)" title="Déplacer vers le haut (Shift pour aller plus vite)">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="18 15 12 9 6 15"></polyline>
                        </svg>
                    </button>
                    <span id="custom-offset-y-value" class="custom-offset-value" title="Position verticale actuelle">${currentOffsetY}%</span>
                    <button type="button" class="custom-offset-btn" id="btn-offset-y-down" onclick="window.adjustPortraitOffsetY && window.adjustPortraitOffsetY('${charKey}', 2, ${defaultOffset}, event)" title="Déplacer vers le bas (Shift pour aller plus vite)">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>
                </div>
                <button type="button" class="custom-reset-btn" id="btn-offset-y-reset" title="Réinitialiser la position verticale (0%)" onclick="window.resetPortraitOffsetY && window.resetPortraitOffsetY('${charKey}', ${defaultOffset})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-rotate-2">
                        <path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747"></path>
                        <path d="M20 4v5h-5"></path>
                    </svg>
                </button>
            </div>

            <!-- Contrôle D : Zoom / Échelle -->
            <div class="custom-row-with-reset">
                <div class="custom-offset-control" title="Zoom / Échelle du portrait">
                    <button type="button" class="custom-offset-btn" id="btn-scale-down" onclick="window.adjustPortraitScale && window.adjustPortraitScale('${charKey}', -5, ${defaultOffset}, event)" title="Dézoomer (Shift pour aller plus vite)">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </button>
                    <span id="custom-scale-value" class="custom-offset-value" title="Zoom actuel">${currentScale}%</span>
                    <button type="button" class="custom-offset-btn" id="btn-scale-up" onclick="window.adjustPortraitScale && window.adjustPortraitScale('${charKey}', 5, ${defaultOffset}, event)" title="Zoomer (Shift pour aller plus vite)">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </button>
                </div>
                <button type="button" class="custom-reset-btn" id="btn-scale-reset" title="Réinitialiser le zoom (100%)" onclick="window.resetPortraitScale && window.resetPortraitScale('${charKey}', ${defaultOffset})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-rotate-2">
                        <path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747"></path>
                        <path d="M20 4v5h-5"></path>
                    </svg>
                </button>
            </div>

            <!-- Contrôle 1 : Sélecteur de couleur -->
            <input type="color" id="custom-color-input" value="${validDefault}" style="position: absolute; opacity: 0; pointer-events: none; width: 0; height: 0;" oninput="window.updateCharHex && window.updateCharHex(this.value)" onchange="window.updateCharHex && window.updateCharHex(this.value)">

            <div class="custom-row-with-reset">
                <div class="custom-color-control" onclick="window.openCustomColorPicker && window.openCustomColorPicker()" title="Changer la couleur">
                    <div id="custom-color-swatch" class="custom-color-swatch" style="background-color: ${validDefault};"></div>
                    <span id="custom-color-hex" class="custom-color-hex">${validDefault.toUpperCase()}</span>
                </div>
                <button type="button" class="custom-reset-btn" title="Réinitialiser la couleur par défaut" onclick="window.resetCharHex && window.resetCharHex('${validDefault}')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-rotate-2">
                        <path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747"></path>
                        <path d="M20 4v5h-5"></path>
                    </svg>
                </button>
            </div>

            <!-- Séparateur -->
            <div class="custom-divider" style="margin-top: 14px;"></div>

            <!-- Contrôle 2 : Frost ou Transparent -->
            <div class="custom-toggle-group">
                <button type="button" class="custom-toggle-btn ${!isTransparent ? 'active' : ''}" id="btn-style-frost" onclick="window.setStyleMode && window.setStyleMode('frost')" title="Frost (apparence actuelle)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-palette"><path d="M12 21a9 9 0 0 1 0 -18c4.97 0 9 3.582 9 8c0 1.06 -.474 2.078 -1.318 2.828c-.844 .75 -1.989 1.172 -3.182 1.172h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25"></path><path d="M7.5 10.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path><path d="M11.5 7.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path><path d="M15.5 10.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path></svg>
                </button>
                <button type="button" class="custom-toggle-btn ${isTransparent ? 'active' : ''}" id="btn-style-transparent" onclick="window.setStyleMode && window.setStyleMode('transparent')" title="Transparent">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-circle-half-2"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path><path d="M12 3v18"></path><path d="M12 14l7 -7"></path><path d="M12 19l8.5 -8.5"></path><path d="M12 9l4.5 -4.5"></path></svg>
                </button>
            </div>

            <!-- Contrôle 3 : Light ou Dark -->
            <div class="custom-toggle-group" style="margin-top: 8px;">
                <button type="button" class="custom-toggle-btn ${!isDark ? 'active' : ''}" id="btn-theme-light" onclick="window.setThemeMode && window.setThemeMode('light')" title="Light (apparence actuelle)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-sun"><path d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path><path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"></path></svg>
                </button>
                <button type="button" class="custom-toggle-btn ${isDark ? 'active' : ''}" id="btn-theme-dark" onclick="window.setThemeMode && window.setThemeMode('dark')" title="Dark">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-moon"><path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454l0 .008"></path></svg>
                </button>
            </div>

            <!-- Contrôle 4 : Fond illustré ou Fond uni -->
            <div class="custom-toggle-group" style="margin-top: 8px;">
                <button type="button" class="custom-toggle-btn ${!hasNoBgSplash ? 'active' : ''}" id="btn-bgsplash-on" onclick="window.setBgSplashMode && window.setBgSplashMode('splash')" title="Fond illustré">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-photo"><path d="M15 8h.01"></path><path d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z"></path><path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5"></path><path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3"></path></svg>
                </button>
                <button type="button" class="custom-toggle-btn ${hasNoBgSplash ? 'active' : ''}" id="btn-bgsplash-off" onclick="window.setBgSplashMode && window.setBgSplashMode('no-splash')" title="Fond uni (sans illustration)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-photo-off"><path d="M15 8h.01"></path><path d="M7 3h11a3 3 0 0 1 3 3v11m-.856 3.099a2.991 2.991 0 0 1 -2.144 .901h-12a3 3 0 0 1 -3 -3v-12c0 -.845 .349 -1.608 .91 -2.153"></path><path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5"></path><path d="M16.32 12.34c.577 -.059 1.162 .162 1.68 .66l3 3"></path><path d="M3 3l18 18"></path></svg>
                </button>
            </div>

            <!-- Séparateur -->
            <div class="custom-divider" style="margin-top: 14px;"></div>

            <!-- Contrôle 5 : Shadow ou Sans Shadow -->
            <div class="custom-toggle-group">
                <button type="button" class="custom-toggle-btn ${!hasNoShadow ? 'active' : ''}" id="btn-shadow-on" onclick="window.setShadowMode && window.setShadowMode('shadow')" title="Avec ombres">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-shadow"><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path><path d="M13 12h5"></path><path d="M13 15h4"></path><path d="M13 18h1"></path><path d="M13 9h4"></path><path d="M13 6h1"></path></svg>
                </button>
                <button type="button" class="custom-toggle-btn ${hasNoShadow ? 'active' : ''}" id="btn-shadow-off" onclick="window.setShadowMode && window.setShadowMode('no-shadow')" title="Sans ombres">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-shadow-off"><path d="M12 12a9 9 0 0 0 9 9m-.434 -4.444a9 9 0 0 0 -14.12 -14.122"></path><path d="M13 12h5"></path><path d="M13 15h4"></path><path d="M13 9h4"></path><path d="M13 6h1"></path><path d="M3 3l18 18"></path></svg>
                </button>
            </div>

            <!-- Contrôle 6 : Border ou Sans Border -->
            <div class="custom-toggle-group" style="margin-top: 8px;">
                <button type="button" class="custom-toggle-btn ${!hasNoBorder ? 'active' : ''}" id="btn-border-on" onclick="window.setBorderMode && window.setBorderMode('border')" title="Avec bordures">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-square"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path></svg>
                </button>
                <button type="button" class="custom-toggle-btn ${hasNoBorder ? 'active' : ''}" id="btn-border-off" onclick="window.setBorderMode && window.setBorderMode('no-border')" title="Sans bordures">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-square-off"><path d="M8 4h10a2 2 0 0 1 2 2v10m-.584 3.414a2 2 0 0 1 -1.416 .586h-12a2 2 0 0 1 -2 -2v-12c0 -.547 .218 -1.043 .573 -1.402"></path><path d="M3 3l18 18"></path></svg>
                </button>
            </div>

            <!-- Contrôle 7 : Angles arrondis ou Carrés -->
            <div class="custom-toggle-group" style="margin-top: 8px;">
                <button type="button" class="custom-toggle-btn ${!isSquareCorners ? 'active' : ''}" id="btn-corners-rounded" onclick="window.setCornerMode && window.setCornerMode('rounded')" title="Angles arrondis">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-border-corner-rounded"><path d="M4 20v-10a6 6 0 0 1 6 -6h10"></path></svg>
                </button>
                <button type="button" class="custom-toggle-btn ${isSquareCorners ? 'active' : ''}" id="btn-corners-square" onclick="window.setCornerMode && window.setCornerMode('square')" title="Angles carrés">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-border-corner-square"><path d="M4 20v-16h16"></path></svg>
                </button>
            </div>

            <!-- Contrôle 8 : Rareté et Grade -->
            <div class="custom-toggle-group" style="margin-top: 8px;">
                <button type="button" class="custom-toggle-btn ${!hasNoRarity ? 'active' : ''}" id="btn-rarity-on" onclick="window.setRarityMode && window.setRarityMode('rarity')" title="Avec couleurs de rareté et grade">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-star"><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path></svg>
                </button>
                <button type="button" class="custom-toggle-btn ${hasNoRarity ? 'active' : ''}" id="btn-rarity-off" onclick="window.setRarityMode && window.setRarityMode('no-rarity')" title="Sans couleurs de rareté et grade">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-star-off"><path d="M3 3l18 18"></path><path d="M10.012 6.016l1.981 -4.014l3.086 6.253l6.9 1l-4.421 4.304m.012 4.01l.588 3.426l-6.158 -3.245l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l.856 -1.733"></path></svg>
                </button>
            </div>

            <!-- Séparateur -->
            <div class="custom-divider" style="margin-top: 14px;"></div>

            <!-- Contrôle 9 : Points de rolls des substats (Afficher / Masquer) -->
            <div class="custom-toggle-group" style="margin-bottom: 8px;">
                <button type="button" class="custom-toggle-btn ${!hasNoRollDots ? 'active' : ''}" id="btn-rolldots-on" onclick="window.setRollDotsMode && window.setRollDotsMode('dots')" title="Afficher les points de rolls">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-dots"><path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path><path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path></svg>
                </button>
                <button type="button" class="custom-toggle-btn ${hasNoRollDots ? 'active' : ''}" id="btn-rolldots-off" onclick="window.setRollDotsMode && window.setRollDotsMode('no-dots')" title="Masquer les points de rolls">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-dots-off"><path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path><path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path><path d="M3 3l18 18"></path></svg>
                </button>
            </div>

            <!-- Contrôle 10 : Classement ou Rolls Totaux -->
            <div class="custom-segmented-vertical">
                <button type="button" class="custom-segmented-item ${!isScoreRolls ? 'active' : ''}" id="btn-score-ranking" onclick="window.setScoreDisplayMode && window.setScoreDisplayMode('ranking')">
                    Classement
                </button>
                <button type="button" class="custom-segmented-item ${isScoreRolls ? 'active' : ''}" id="btn-score-rolls" onclick="window.setScoreDisplayMode && window.setScoreDisplayMode('rolls')">
                    Rolls totaux
                </button>
            </div>

            <!-- Contrôle 11 : Score d'artéfact ou Crit Value -->
            <div class="custom-segmented-vertical" style="margin-top: 8px;">
                <button type="button" class="custom-segmented-item ${!isArtifactCv ? 'active' : ''}" id="btn-artscore-score" onclick="window.setArtifactScoreMode && window.setArtifactScoreMode('score')">
                    Score
                </button>
                <button type="button" class="custom-segmented-item ${isArtifactCv ? 'active' : ''}" id="btn-artscore-cv" onclick="window.setArtifactScoreMode && window.setArtifactScoreMode('cv')">
                    Crit Value
                </button>
            </div>
        </div>
    `;
}

if (typeof window !== 'undefined') {
    if (!window.customizationState) {
        const savedMode = localStorage.getItem('guoba_custom_style_mode');
        const savedTheme = localStorage.getItem('guoba_custom_theme_mode');
        const savedBgSplash = localStorage.getItem('guoba_custom_bgsplash_mode');
        const savedShadow = localStorage.getItem('guoba_custom_shadow_mode');
        const savedBorder = localStorage.getItem('guoba_custom_border_mode');
        const savedCorner = localStorage.getItem('guoba_custom_corner_mode');
        const savedRarity = localStorage.getItem('guoba_custom_rarity_mode');
        const savedRollDots = localStorage.getItem('guoba_custom_rolldots_mode');
        const savedScore = localStorage.getItem('guoba_custom_score_mode');
        const savedArtScore = localStorage.getItem('guoba_custom_artscore_mode');
        window.customizationState = {
            styleMode: savedMode === 'transparent' ? 'transparent' : 'frost',
            themeMode: savedTheme === 'dark' ? 'dark' : 'light',
            bgSplashMode: savedBgSplash === 'no-splash' ? 'no-splash' : 'splash',
            shadowMode: savedShadow === 'no-shadow' ? 'no-shadow' : 'shadow',
            borderMode: savedBorder === 'no-border' ? 'no-border' : 'border',
            cornerMode: savedCorner === 'square' ? 'square' : 'rounded',
            rarityMode: savedRarity === 'no-rarity' ? 'no-rarity' : 'rarity',
            rollDotsMode: savedRollDots === 'no-dots' ? 'no-dots' : 'dots',
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

        const valX = document.getElementById('custom-offset-value');
        if (valX) valX.textContent = `${defX}%`;

        const valY = document.getElementById('custom-offset-y-value');
        if (valY) valY.textContent = '0%';

        const valScale = document.getElementById('custom-scale-value');
        if (valScale) valScale.textContent = '100%';
    };

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

        const valDisplay = document.getElementById('custom-offset-value');
        if (valDisplay) {
            valDisplay.textContent = `${nextOffset}%`;
        }
    };

    window.resetPortraitOffset = function (charKey, defaultOffset) {
        window.customizationState = window.customizationState || {};
        window.customizationState.customOffsets = window.customizationState.customOffsets || {};
        delete window.customizationState.customOffsets[charKey];
        try {
            localStorage.removeItem('guoba_custom_offset_' + charKey);
        } catch (e) { }

        window.applyPortraitTransform(charKey, defaultOffset);

        const valDisplay = document.getElementById('custom-offset-value');
        if (valDisplay) {
            valDisplay.textContent = `${defaultOffset}%`;
        }
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

        const valDisplay = document.getElementById('custom-offset-y-value');
        if (valDisplay) {
            valDisplay.textContent = `${nextOffset}%`;
        }
    };

    window.resetPortraitOffsetY = function (charKey, defaultOffset) {
        window.customizationState = window.customizationState || {};
        window.customizationState.customOffsetsY = window.customizationState.customOffsetsY || {};
        delete window.customizationState.customOffsetsY[charKey];
        try {
            localStorage.removeItem('guoba_custom_offset_y_' + charKey);
        } catch (e) { }

        window.applyPortraitTransform(charKey, defaultOffset);

        const valDisplay = document.getElementById('custom-offset-y-value');
        if (valDisplay) {
            valDisplay.textContent = '0%';
        }
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

        const valDisplay = document.getElementById('custom-scale-value');
        if (valDisplay) {
            valDisplay.textContent = `${nextScale}%`;
        }
    };

    window.resetPortraitScale = function (charKey, defaultOffset) {
        window.customizationState = window.customizationState || {};
        window.customizationState.customScales = window.customizationState.customScales || {};
        delete window.customizationState.customScales[charKey];
        try {
            localStorage.removeItem('guoba_custom_scale_' + charKey);
        } catch (e) { }

        window.applyPortraitTransform(charKey, defaultOffset);

        const valDisplay = document.getElementById('custom-scale-value');
        if (valDisplay) {
            valDisplay.textContent = '100%';
        }
    };

    window.openCustomColorPicker = function () {
        const input = document.getElementById('custom-color-input');
        if (input) input.click();
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
    };

    window.setStyleMode = function (mode) {
        window.customizationState = window.customizationState || {};
        window.customizationState.styleMode = mode;
        try {
            localStorage.setItem('guoba_custom_style_mode', mode);
        } catch (e) { }

        const wrapper = document.querySelector('.showcase-wrapper');
        const btnFrost = document.getElementById('btn-style-frost');
        const btnTransp = document.getElementById('btn-style-transparent');

        if (mode === 'transparent') {
            if (wrapper) wrapper.classList.add('mode-transparent');
            if (btnFrost) btnFrost.classList.remove('active');
            if (btnTransp) btnTransp.classList.add('active');
        } else {
            if (wrapper) wrapper.classList.remove('mode-transparent');
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

        const wrapper = document.querySelector('.showcase-wrapper');
        const btnLight = document.getElementById('btn-theme-light');
        const btnDark = document.getElementById('btn-theme-dark');

        if (mode === 'dark') {
            if (wrapper) wrapper.classList.add('mode-dark');
            if (btnLight) btnLight.classList.remove('active');
            if (btnDark) btnDark.classList.add('active');
        } else {
            if (wrapper) wrapper.classList.remove('mode-dark');
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

        const wrapper = document.querySelector('.showcase-wrapper');
        const btnOn = document.getElementById('btn-bgsplash-on');
        const btnOff = document.getElementById('btn-bgsplash-off');

        if (mode === 'no-splash') {
            if (wrapper) wrapper.classList.add('mode-no-bg-splash');
            if (btnOn) btnOn.classList.remove('active');
            if (btnOff) btnOff.classList.add('active');
        } else {
            if (wrapper) wrapper.classList.remove('mode-no-bg-splash');
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

        const wrapper = document.querySelector('.showcase-wrapper');
        const btnOn = document.getElementById('btn-shadow-on');
        const btnOff = document.getElementById('btn-shadow-off');

        if (mode === 'no-shadow') {
            if (wrapper) wrapper.classList.add('mode-no-shadow');
            if (btnOn) btnOn.classList.remove('active');
            if (btnOff) btnOff.classList.add('active');
        } else {
            if (wrapper) wrapper.classList.remove('mode-no-shadow');
            if (btnOn) btnOn.classList.add('active');
            if (btnOff) btnOff.classList.remove('active');
        }
    };

    window.setBorderMode = function (mode) {
        window.customizationState = window.customizationState || {};
        window.customizationState.borderMode = mode;
        try {
            localStorage.setItem('guoba_custom_border_mode', mode);
        } catch (e) { }

        const wrapper = document.querySelector('.showcase-wrapper');
        const btnOn = document.getElementById('btn-border-on');
        const btnOff = document.getElementById('btn-border-off');

        if (mode === 'no-border') {
            if (wrapper) wrapper.classList.add('mode-no-border');
            if (btnOn) btnOn.classList.remove('active');
            if (btnOff) btnOff.classList.add('active');
        } else {
            if (wrapper) wrapper.classList.remove('mode-no-border');
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

        const wrapper = document.querySelector('.showcase-wrapper');
        const btnRounded = document.getElementById('btn-corners-rounded');
        const btnSquare = document.getElementById('btn-corners-square');

        if (mode === 'square') {
            if (wrapper) wrapper.classList.add('mode-square-corners');
            if (btnRounded) btnRounded.classList.remove('active');
            if (btnSquare) btnSquare.classList.add('active');
        } else {
            if (wrapper) wrapper.classList.remove('mode-square-corners');
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

        const wrapper = document.querySelector('.showcase-wrapper');
        const btnOn = document.getElementById('btn-rarity-on');
        const btnOff = document.getElementById('btn-rarity-off');

        if (mode === 'no-rarity') {
            if (wrapper) wrapper.classList.add('mode-no-rarity');
            if (btnOn) btnOn.classList.remove('active');
            if (btnOff) btnOff.classList.add('active');
        } else {
            if (wrapper) wrapper.classList.remove('mode-no-rarity');
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

        const wrapper = document.querySelector('.showcase-wrapper');
        const btnOn = document.getElementById('btn-rolldots-on');
        const btnOff = document.getElementById('btn-rolldots-off');

        if (mode === 'no-dots') {
            if (wrapper) wrapper.classList.add('mode-no-roll-dots');
            if (btnOn) btnOn.classList.remove('active');
            if (btnOff) btnOff.classList.add('active');
        } else {
            if (wrapper) wrapper.classList.remove('mode-no-roll-dots');
            if (btnOn) btnOn.classList.add('active');
            if (btnOff) btnOff.classList.remove('active');
        }
    };

    window.setScoreDisplayMode = function (mode) {
        window.customizationState = window.customizationState || {};
        window.customizationState.scoreMode = mode;
        try {
            localStorage.setItem('guoba_custom_score_mode', mode);
        } catch (e) { }

        const wrapper = document.querySelector('.showcase-wrapper');
        const btnRanking = document.getElementById('btn-score-ranking');
        const btnRolls = document.getElementById('btn-score-rolls');

        if (mode === 'rolls') {
            if (wrapper) wrapper.classList.add('mode-score-rolls');
            if (btnRanking) btnRanking.classList.remove('active');
            if (btnRolls) btnRolls.classList.add('active');
        } else {
            if (wrapper) wrapper.classList.remove('mode-score-rolls');
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

        const wrapper = document.querySelector('.showcase-wrapper');
        const btnScore = document.getElementById('btn-artscore-score');
        const btnCv = document.getElementById('btn-artscore-cv');

        if (mode === 'cv') {
            if (wrapper) wrapper.classList.add('mode-artifact-cv');
            if (btnScore) btnScore.classList.remove('active');
            if (btnCv) btnCv.classList.add('active');
        } else {
            if (wrapper) wrapper.classList.remove('mode-artifact-cv');
            if (btnScore) btnScore.classList.add('active');
            if (btnCv) btnCv.classList.remove('active');
        }
    };
}
