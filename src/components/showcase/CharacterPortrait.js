// src/components/showcase/CharacterPortrait.js

export function renderCharacterPortrait(persoObj, config) {
    if (!persoObj) return '';

    const skinOverride = (config && config.skins && persoObj.costumeId && config.skins[persoObj.costumeId])
        ? config.skins[persoObj.costumeId]
        : null;

    const portraitX = skinOverride?.portraitOffset ?? (config?.portraitOffset ?? -35);

    return `
        <div class="character-portrait-container" style="width: 350px; height: 720px; position: relative; overflow: hidden; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: rgb(0, 0, 0) 1px 1px 6px; box-sizing: border-box;">
            <img class="character-portrait" src="${persoObj.splashArt}" alt="${persoObj.nom}" fetchpriority="high" decoding="sync" onerror="if(this.src.endsWith('.webp')){this.src=this.src.replace(/\\.webp$/i,'.png');}" style="filter: none; position: absolute; transform: translateX(${portraitX}%); height: 720px; transition: filter 0.35s cubic-bezier(0.41, 0.65, 0.39, 0.99); box-sizing: border-box;">
        </div>
    `;
}

export function renderBackgroundSplash(persoObj) {
    if (!persoObj || !persoObj.splashArt) return '';
    return `
        <div class="background-splash-art" style="background-image: url('${persoObj.splashArt}'); background-position: center center; background-repeat: no-repeat; background-size: 300%; position: absolute; inset: 0px; z-index: 0; filter: blur(10px) brightness(0.7) saturate(0.8); max-width: 1153px; clip-path: inset(0);"></div>
    `;
}
