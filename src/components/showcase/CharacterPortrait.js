// src/components/showcase/CharacterPortrait.js

export function renderCharacterPortrait(persoObj, config) {
    if (!persoObj) return '';

    const skinOverride = (config && config.skins && persoObj.costumeId && config.skins[persoObj.costumeId])
        ? config.skins[persoObj.costumeId]
        : null;

    const charKey = (persoObj?.nom || 'default').toLowerCase().trim().replace(/\s+/g, '_');
    const defaultOffset = skinOverride?.portraitOffset ?? (config?.portraitOffset ?? -35);

    let currentOffset = defaultOffset;
    if (typeof window !== 'undefined') {
        const savedOffset = window.customizationState?.customOffsets?.[charKey] ??
            (typeof localStorage !== 'undefined' ? localStorage.getItem('guoba_custom_offset_' + charKey) : null);
        if (savedOffset !== null && savedOffset !== undefined) {
            currentOffset = Number(savedOffset);
        }
    }

    let activeSplash = persoObj.splashArt;
    if (typeof window !== 'undefined') {
        const customSplash = window.customizationState?.customSplashes?.[charKey] ||
            (typeof localStorage !== 'undefined' ? localStorage.getItem('guoba_custom_splash_' + charKey) : null);
        if (customSplash) {
            activeSplash = customSplash;
        }
    }

    return `
        <div class="character-portrait-container" style="width: 350px; height: 720px; position: relative; overflow: hidden; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: rgb(0, 0, 0) 1px 1px 6px; box-sizing: border-box;">
            <img class="character-portrait" src="${activeSplash}" alt="${persoObj.nom}" fetchpriority="high" decoding="sync" onerror="if(this.src.endsWith('.webp')){this.src=this.src.replace(/\\.webp$/i,'.png');}" style="filter: none; position: absolute; transform: translateX(${currentOffset}%); height: 720px; transition: transform 0.2s ease, filter 0.35s cubic-bezier(0.41, 0.65, 0.39, 0.99); box-sizing: border-box;">
        </div>
    `;
}

export function renderBackgroundSplash(persoObj) {
    if (!persoObj || !persoObj.splashArt) return '';

    const charKey = (persoObj?.nom || 'default').toLowerCase().trim().replace(/\s+/g, '_');
    let activeSplash = persoObj.splashArt;
    if (typeof window !== 'undefined') {
        const customSplash = window.customizationState?.customSplashes?.[charKey] ||
            (typeof localStorage !== 'undefined' ? localStorage.getItem('guoba_custom_splash_' + charKey) : null);
        if (customSplash) {
            activeSplash = customSplash;
        }
    }

    return `
        <div class="background-splash-art" style="background-image: url('${activeSplash}'); background-position: center center; background-repeat: no-repeat; background-size: 300%; position: absolute; inset: 0px; z-index: 0; filter: blur(10px) brightness(var(--char-splash-brightness, 0.7)) saturate(0.8); max-width: 1153px; clip-path: inset(0); transition: filter 0.35s ease, opacity 0.35s ease, visibility 0.35s ease;"></div>
        <img src="${activeSplash}" style="display:none;" onerror="if(this.src.endsWith('.webp')){ const fallback = this.src.replace(/\\.webp$/i, '.png'); this.src = fallback; this.previousElementSibling.style.backgroundImage = 'url(' + fallback + ')'; }">
    `;
}
