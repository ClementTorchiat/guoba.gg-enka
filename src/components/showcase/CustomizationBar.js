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

export function renderCustomizationBar(persoObj, defaultColor, charIndex) {
    const validDefault = normalizeHex(defaultColor);
    const isTransparent = (typeof window !== 'undefined') &&
        (window.customizationState?.styleMode === 'transparent' ||
         (typeof localStorage !== 'undefined' && localStorage.getItem('guoba_custom_style_mode') === 'transparent'));
    const isDark = (typeof window !== 'undefined') &&
        (window.customizationState?.themeMode === 'dark' ||
         (typeof localStorage !== 'undefined' && localStorage.getItem('guoba_custom_theme_mode') === 'dark'));
    const hasNoShadow = (typeof window !== 'undefined') &&
        (window.customizationState?.shadowMode === 'no-shadow' ||
         (typeof localStorage !== 'undefined' && localStorage.getItem('guoba_custom_shadow_mode') === 'no-shadow'));
    const hasNoBorder = (typeof window !== 'undefined') &&
        (window.customizationState?.borderMode === 'no-border' ||
         (typeof localStorage !== 'undefined' && localStorage.getItem('guoba_custom_border_mode') === 'no-border'));
    const isScoreRolls = (typeof window !== 'undefined') &&
        (window.customizationState?.scoreMode === 'rolls' ||
         (typeof localStorage !== 'undefined' && localStorage.getItem('guoba_custom_score_mode') === 'rolls'));

    return `
        <div class="customization-bar">
            <!-- Titre de la section -->
            <h3 class="custom-title">Customisation</h3>

            <!-- Séparateur -->
            <div class="custom-divider"></div>

            <!-- Contrôle 1 : Sélecteur de couleur -->
            <input type="color" id="custom-color-input" value="${validDefault}" style="position: absolute; opacity: 0; pointer-events: none; width: 0; height: 0;" oninput="window.updateCharHex && window.updateCharHex(this.value)" onchange="window.updateCharHex && window.updateCharHex(this.value)">

            <div class="custom-color-control" onclick="window.openCustomColorPicker && window.openCustomColorPicker()" title="Changer la couleur">
                <div id="custom-color-swatch" class="custom-color-swatch" style="background-color: ${validDefault};"></div>
                <span id="custom-color-hex" class="custom-color-hex">${validDefault.toUpperCase()}</span>
                <button type="button" class="custom-color-reset-btn" title="Réinitialiser la couleur par défaut" onclick="event.stopPropagation(); window.resetCharHex && window.resetCharHex('${validDefault}')">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="7"></circle>
                        <line x1="12" y1="2" x2="12" y2="4.5"></line>
                        <line x1="12" y1="19.5" x2="12" y2="22"></line>
                        <line x1="2" y1="12" x2="4.5" y2="12"></line>
                        <line x1="19.5" y1="12" x2="22" y2="12"></line>
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

            <!-- Séparateur -->
            <div class="custom-divider" style="margin-top: 14px;"></div>

            <!-- Contrôle 4 : Shadow ou Sans Shadow -->
            <div class="custom-toggle-group">
                <button type="button" class="custom-toggle-btn ${!hasNoShadow ? 'active' : ''}" id="btn-shadow-on" onclick="window.setShadowMode && window.setShadowMode('shadow')" title="Avec ombres">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-shadow"><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path><path d="M13 12h5"></path><path d="M13 15h4"></path><path d="M13 18h1"></path><path d="M13 9h4"></path><path d="M13 6h1"></path></svg>
                </button>
                <button type="button" class="custom-toggle-btn ${hasNoShadow ? 'active' : ''}" id="btn-shadow-off" onclick="window.setShadowMode && window.setShadowMode('no-shadow')" title="Sans ombres">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-shadow-off"><path d="M12 12a9 9 0 0 0 9 9m-.434 -4.444a9 9 0 0 0 -14.12 -14.122"></path><path d="M13 12h5"></path><path d="M13 15h4"></path><path d="M13 9h4"></path><path d="M13 6h1"></path><path d="M3 3l18 18"></path></svg>
                </button>
            </div>

            <!-- Contrôle 5 : Border ou Sans Border -->
            <div class="custom-toggle-group" style="margin-top: 8px;">
                <button type="button" class="custom-toggle-btn ${!hasNoBorder ? 'active' : ''}" id="btn-border-on" onclick="window.setBorderMode && window.setBorderMode('border')" title="Avec bordures">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-square"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path></svg>
                </button>
                <button type="button" class="custom-toggle-btn ${hasNoBorder ? 'active' : ''}" id="btn-border-off" onclick="window.setBorderMode && window.setBorderMode('no-border')" title="Sans bordures">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-square-off"><path d="M8 4h10a2 2 0 0 1 2 2v10m-.584 3.414a2 2 0 0 1 -1.416 .586h-12a2 2 0 0 1 -2 -2v-12c0 -.547 .218 -1.043 .573 -1.402"></path><path d="M3 3l18 18"></path></svg>
                </button>
            </div>

            <!-- Séparateur -->
            <div class="custom-divider" style="margin-top: 14px;"></div>

            <!-- Contrôle 6 : Classement ou Rolls Totaux -->
            <div class="custom-segmented-vertical">
                <button type="button" class="custom-segmented-item ${!isScoreRolls ? 'active' : ''}" id="btn-score-ranking" onclick="window.setScoreDisplayMode && window.setScoreDisplayMode('ranking')">
                    Classement
                </button>
                <button type="button" class="custom-segmented-item ${isScoreRolls ? 'active' : ''}" id="btn-score-rolls" onclick="window.setScoreDisplayMode && window.setScoreDisplayMode('rolls')">
                    Rolls totaux
                </button>
            </div>
        </div>
    `;
}

if (typeof window !== 'undefined') {
    if (!window.customizationState) {
        const savedMode = localStorage.getItem('guoba_custom_style_mode');
        const savedTheme = localStorage.getItem('guoba_custom_theme_mode');
        const savedShadow = localStorage.getItem('guoba_custom_shadow_mode');
        const savedBorder = localStorage.getItem('guoba_custom_border_mode');
        const savedScore = localStorage.getItem('guoba_custom_score_mode');
        window.customizationState = {
            styleMode: savedMode === 'transparent' ? 'transparent' : 'frost',
            themeMode: savedTheme === 'dark' ? 'dark' : 'light',
            shadowMode: savedShadow === 'no-shadow' ? 'no-shadow' : 'shadow',
            borderMode: savedBorder === 'no-border' ? 'no-border' : 'border',
            scoreMode: savedScore === 'rolls' ? 'rolls' : 'ranking'
        };
    }

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
        } catch (e) {}

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
        } catch (e) {}

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

    window.setShadowMode = function (mode) {
        window.customizationState = window.customizationState || {};
        window.customizationState.shadowMode = mode;
        try {
            localStorage.setItem('guoba_custom_shadow_mode', mode);
        } catch (e) {}

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
        } catch (e) {}

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

    window.setScoreDisplayMode = function (mode) {
        window.customizationState = window.customizationState || {};
        window.customizationState.scoreMode = mode;
        try {
            localStorage.setItem('guoba_custom_score_mode', mode);
        } catch (e) {}

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
}
