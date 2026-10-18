// src/components/showcase/CustomColorPicker.js
import { t } from '../../scripts/i18n.js';

function hexToRgb(hex) {
    if (!hex) return [75, 85, 99];
    let clean = hex.trim().replace(/^#/, '');
    if (clean.length === 3) {
        clean = clean.split('').map(c => c + c).join('');
    }
    if (clean.length !== 6) return [75, 85, 99];
    const n = parseInt(clean, 16);
    if (isNaN(n)) return [75, 85, 99];
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex(r, g, b) {
    const toHex = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function rgbToHsv(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;
    let h = 0;
    const s = max === 0 ? 0 : d / max;
    const v = max;
    if (max !== min) {
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h *= 60;
    }
    return { h: Math.round(h) % 360, s, v };
}

function hsvToRgb(h, s, v) {
    h = (h % 360 + 360) % 360;
    const c = v * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = v - c;
    let r1 = 0, g1 = 0, b1 = 0;
    if (h < 60) { r1 = c; g1 = x; b1 = 0; }
    else if (h < 120) { r1 = x; g1 = c; b1 = 0; }
    else if (h < 180) { r1 = 0; g1 = c; b1 = x; }
    else if (h < 240) { r1 = 0; g1 = x; b1 = c; }
    else if (h < 300) { r1 = x; g1 = 0; b1 = c; }
    else { r1 = c; g1 = 0; b1 = x; }
    return [
        Math.round((r1 + m) * 255),
        Math.round((g1 + m) * 255),
        Math.round((b1 + m) * 255)
    ];
}

function hsvToHex(h, s, v) {
    const [r, g, b] = hsvToRgb(h, s, v);
    return rgbToHex(r, g, b);
}

let popoverEl = null;
let svBox = null;
let svCursor = null;
let hueBar = null;
let hueCursor = null;
let swatchPreview = null;
let eyedropperBtn = null;
let hexInput = null;
let resetBtn = null;
let doneBtn = null;
let closeBtn = null;

let currentH = 0;
let currentS = 1;
let currentV = 1;
let activeDefaultColor = '#4B5563';
let activeTriggerEl = null;

let isDraggingSv = false;
let isDraggingHue = false;

function createPopoverDOM() {
    if (popoverEl) return;

    popoverEl = document.createElement('div');
    popoverEl.id = 'guoba-custom-color-popover';
    popoverEl.className = 'guoba-color-popover';
    popoverEl.style.display = 'none';

    popoverEl.innerHTML = `
        <div class="color-popover-header">
            <span class="color-popover-title" data-i18n="custom.colorpicker.title">${t('custom.colorpicker.title')}</span>
            <button type="button" class="color-popover-close-btn" id="color-popover-close" title="${t('custom.colorpicker.close')}" data-i18n-title="custom.colorpicker.close">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>

        <!-- Zone 2D Saturation / Valeur -->
        <div class="color-sv-box" id="color-sv-box">
            <div class="color-sv-white-layer"></div>
            <div class="color-sv-black-layer"></div>
            <div class="color-sv-cursor" id="color-sv-cursor"></div>
        </div>

        <!-- Barre de Teinte (Hue) -->
        <div class="color-hue-bar" id="color-hue-bar">
            <div class="color-hue-cursor" id="color-hue-cursor"></div>
        </div>

        <!-- Section Input & Pipette -->
        <div class="color-input-row">
            <div class="color-swatch-preview" id="color-swatch-preview" title="${t('custom.colorpicker.selected')}" data-i18n-title="custom.colorpicker.selected"></div>
            <button type="button" class="color-eyedropper-btn" id="color-eyedropper-btn" title="${t('custom.colorpicker.eyedropper')}" data-i18n-title="custom.colorpicker.eyedropper">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-color-picker">
                    <path d="M11 7l6 6"></path>
                    <path d="M4 16l11.7 -11.7a1 1 0 0 1 1.4 0l2.6 2.6a1 1 0 0 1 0 1.4l-11.7 11.7h-4v-4z"></path>
                </svg>
            </button>
            <div class="color-hex-input-wrapper">
                <span class="color-hex-prefix">#</span>
                <input type="text" id="color-hex-input" class="color-hex-input" maxlength="6" spellcheck="false" placeholder="RRGGBB">
            </div>
        </div>

        <!-- Footer : Actions -->
        <div class="color-popover-footer">
            <button type="button" class="color-popover-btn color-popover-btn-reset" id="color-popover-reset" title="${t('custom.colorpicker.resetTitle')}" data-i18n-title="custom.colorpicker.resetTitle" data-i18n="custom.colorpicker.reset">
                ${t('custom.colorpicker.reset')}
            </button>
            <button type="button" class="color-popover-btn color-popover-btn-done" id="color-popover-done" data-i18n="custom.colorpicker.done">
                ${t('custom.colorpicker.done')}
            </button>
        </div>
    `;

    // Note: popoverEl will be appended to .showcase-wrapper (or document.body) in openCustomColorPicker

    svBox = popoverEl.querySelector('#color-sv-box');
    svCursor = popoverEl.querySelector('#color-sv-cursor');
    hueBar = popoverEl.querySelector('#color-hue-bar');
    hueCursor = popoverEl.querySelector('#color-hue-cursor');
    swatchPreview = popoverEl.querySelector('#color-swatch-preview');
    eyedropperBtn = popoverEl.querySelector('#color-eyedropper-btn');
    hexInput = popoverEl.querySelector('#color-hex-input');
    resetBtn = popoverEl.querySelector('#color-popover-reset');
    doneBtn = popoverEl.querySelector('#color-popover-done');
    closeBtn = popoverEl.querySelector('#color-popover-close');

    // Drag handlers for SV Box
    svBox.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        isDraggingSv = true;
        try { svBox.setPointerCapture(e.pointerId); } catch (_) { }
        updateSvFromPointer(e);
    });

    svBox.addEventListener('pointermove', (e) => {
        if (!isDraggingSv) return;
        e.preventDefault();
        updateSvFromPointer(e);
    });

    const endSvDrag = (e) => {
        if (!isDraggingSv) return;
        isDraggingSv = false;
        try { svBox.releasePointerCapture(e.pointerId); } catch (_) { }
    };
    svBox.addEventListener('pointerup', endSvDrag);
    svBox.addEventListener('pointercancel', endSvDrag);

    // Drag handlers for Hue Bar
    hueBar.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        isDraggingHue = true;
        try { hueBar.setPointerCapture(e.pointerId); } catch (_) { }
        updateHueFromPointer(e);
    });

    hueBar.addEventListener('pointermove', (e) => {
        if (!isDraggingHue) return;
        e.preventDefault();
        updateHueFromPointer(e);
    });

    const endHueDrag = (e) => {
        if (!isDraggingHue) return;
        isDraggingHue = false;
        try { hueBar.releasePointerCapture(e.pointerId); } catch (_) { }
    };
    hueBar.addEventListener('pointerup', endHueDrag);
    hueBar.addEventListener('pointercancel', endHueDrag);

    // Hex input
    hexInput.addEventListener('input', () => {
        let val = hexInput.value.replace(/[^0-9a-fA-F]/g, '');
        hexInput.value = val.toUpperCase();
        if (val.length === 6) {
            const [r, g, b] = hexToRgb(val);
            const hsv = rgbToHsv(r, g, b);
            currentH = hsv.h;
            currentS = hsv.s;
            currentV = hsv.v;
            syncColor(true);
        }
    });

    // EyeDropper API
    if (typeof window !== 'undefined' && 'EyeDropper' in window) {
        eyedropperBtn.style.display = 'flex';
        eyedropperBtn.addEventListener('click', async () => {
            try {
                // @ts-ignore
                const eyeDropper = new window.EyeDropper();
                const result = await eyeDropper.open();
                if (result && result.sRGBHex) {
                    setColorFromHex(result.sRGBHex);
                }
            } catch (_) {
                // EyeDropper canceled by user (Esc), nothing to do
            }
        });
    } else if (eyedropperBtn) {
        eyedropperBtn.style.display = 'none';
    }

    // Reset button
    resetBtn.addEventListener('click', () => {
        setColorFromHex(activeDefaultColor);
        if (window.resetCharHex) {
            window.resetCharHex(activeDefaultColor);
        }
    });

    // Close & Done buttons
    closeBtn.addEventListener('click', closeCustomColorPicker);
    doneBtn.addEventListener('click', closeCustomColorPicker);

    // Document listeners
    document.addEventListener('pointerdown', (e) => {
        if (!popoverEl || popoverEl.style.display === 'none') return;
        if (popoverEl.contains(e.target)) return;
        if (activeTriggerEl && activeTriggerEl.contains(e.target)) return;
        closeCustomColorPicker();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popoverEl && popoverEl.style.display !== 'none') {
            closeCustomColorPicker();
        }
    });

    window.addEventListener('scroll', () => {
        if (popoverEl && popoverEl.style.display !== 'none' && activeTriggerEl) {
            updatePosition();
        }
    }, { capture: true, passive: true });

    window.addEventListener('resize', () => {
        if (popoverEl && popoverEl.style.display !== 'none' && activeTriggerEl) {
            updatePosition();
        }
    }, { passive: true });
}

function updateSvFromPointer(e) {
    if (!svBox) return;
    const rect = svBox.getBoundingClientRect();
    let x = (e.clientX - rect.left) / rect.width;
    let y = (e.clientY - rect.top) / rect.height;
    x = Math.max(0, Math.min(1, x));
    y = Math.max(0, Math.min(1, y));
    currentS = x;
    currentV = 1 - y;
    syncColor();
}

function updateHueFromPointer(e) {
    if (!hueBar) return;
    const rect = hueBar.getBoundingClientRect();
    let x = (e.clientX - rect.left) / rect.width;
    x = Math.max(0, Math.min(1, x));
    currentH = Math.round(x * 360) % 360;
    syncColor();
}

function syncColor(fromInput = false, triggerUpdate = true) {
    const hex = hsvToHex(currentH, currentS, currentV);

    if (svBox) {
        svBox.style.backgroundColor = `hsl(${currentH}, 100%, 50%)`;
    }

    if (svCursor) {
        svCursor.style.left = `${currentS * 100}%`;
        svCursor.style.top = `${(1 - currentV) * 100}%`;
    }

    if (hueCursor) {
        hueCursor.style.left = `${(currentH / 360) * 100}%`;
    }

    if (swatchPreview) {
        swatchPreview.style.backgroundColor = hex;
    }

    if (hexInput && !fromInput) {
        hexInput.value = hex.replace('#', '').toUpperCase();
    }

    if (triggerUpdate && typeof window !== 'undefined' && window.updateCharHex) {
        window.updateCharHex(hex);
    }
}

function setColorFromHex(hex, triggerUpdate = true) {
    const [r, g, b] = hexToRgb(hex);
    const hsv = rgbToHsv(r, g, b);
    currentH = hsv.h;
    currentS = hsv.s;
    currentV = hsv.v;
    syncColor(false, triggerUpdate);
}

function updatePosition() {
    if (!popoverEl || popoverEl.style.display === 'none' || !activeTriggerEl) return;

    const trigger = activeTriggerEl;
    const container = popoverEl.parentElement || document.body;

    const popoverWidth = 240;
    const popoverHeight = popoverEl.offsetHeight || 280;

    const triggerRect = trigger.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    let relLeft = triggerRect.left - containerRect.left;
    let relTop = triggerRect.top - containerRect.top;

    if (container === document.body) {
        relLeft = triggerRect.left + (window.pageXOffset || document.documentElement.scrollLeft || 0);
        relTop = triggerRect.top + (window.pageYOffset || document.documentElement.scrollTop || 0);
    }

    let left = relLeft - popoverWidth - 12;
    let top = relTop - 8;

    const containerWidth = container === document.body ? window.innerWidth : containerRect.width;
    const containerHeight = container === document.body ? window.innerHeight : containerRect.height;

    // Check boundary on left: if not enough space on left, try right of trigger
    if (left < 10) {
        const rightSideLeft = relLeft + triggerRect.width + 12;
        if (rightSideLeft + popoverWidth <= containerWidth - 10) {
            left = rightSideLeft;
        } else {
            left = Math.max(10, Math.min(containerWidth - popoverWidth - 10, relLeft));
            top = relTop + triggerRect.height + 8;
        }
    }

    // Check boundary on top
    if (top < 10) {
        top = 10;
    }

    // Check boundary on bottom
    if (top + popoverHeight > containerHeight - 10) {
        top = Math.max(10, containerHeight - popoverHeight - 10);
    }

    popoverEl.style.left = `${Math.round(left)}px`;
    popoverEl.style.top = `${Math.round(top)}px`;
}

export function openCustomColorPicker(triggerEl, defaultColor) {
    if (typeof window === 'undefined') return;

    createPopoverDOM();
    if (!popoverEl) return;

    const trigger = triggerEl || document.querySelector('.custom-color-control');

    // If already open from same trigger, toggle close
    if (popoverEl.style.display !== 'none' && activeTriggerEl === trigger) {
        closeCustomColorPicker();
        return;
    }

    activeTriggerEl = trigger;
    activeDefaultColor = defaultColor || '#4B5563';

    // Attach to .showcase-wrapper so it scrolls naturally with the character showcase
    const container = (trigger && trigger.closest('.showcase-wrapper')) || document.body;
    if (popoverEl.parentElement !== container) {
        container.appendChild(popoverEl);
    }

    // Get current active color from showcase-wrapper or trigger
    let currentColor = defaultColor;
    const wrapper = document.querySelector('.showcase-wrapper');
    if (wrapper) {
        const hex = wrapper.style.getPropertyValue('--char-hex');
        if (hex && hex.trim()) {
            currentColor = hex.trim();
        }
    }

    setColorFromHex(currentColor, false);

    // Compute popover position relative to container
    popoverEl.style.display = 'flex';
    popoverEl.style.visibility = 'hidden';

    updatePosition();

    popoverEl.style.visibility = 'visible';

    // Focus input after opening
    if (hexInput) {
        setTimeout(() => hexInput.select(), 50);
    }
}

export function closeCustomColorPicker() {
    if (popoverEl) {
        popoverEl.style.display = 'none';
        activeTriggerEl = null;
    }
}

if (typeof window !== 'undefined') {
    // @ts-ignore
    window.openCustomColorPicker = openCustomColorPicker;
    // @ts-ignore
    window.closeCustomColorPicker = closeCustomColorPicker;
    // @ts-ignore
    window.customColorPickerSetHex = setColorFromHex;
}

