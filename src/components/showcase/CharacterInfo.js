// src/components/showcase/CharacterInfo.js
import { t } from '../../scripts/i18n.js';
import ICON_MAP from '../../data/icon_map.json';

export function renderCharacterInfo(persoObj) {
    if (!persoObj) return '';
    const ICON_BASE_PATH = "./assets/simulator/icons/";
    const s = persoObj.combatStats;

    return `
        <div class="showcase-info-header" style="align-items: stretch; flex-direction: column; display: flex; box-sizing: border-box; margin-bottom: 6px;">
            <div style="height: 40px; margin-top: 8px; margin-bottom: 5px; display: flex; flex-direction: row; justify-content: space-between; margin-left: 10px; margin-right: 10px;">
                <div class="showcase-element-weapon" style="display: flex; flex-direction: row;">
                    <img src="${ICON_BASE_PATH}${ICON_MAP[s?.dmgBonusKey] || 'icon_unknown.webp'}" style="width: 25px; height: 25px; margin-top: 2px;" alt="">
                    <img src="${ICON_BASE_PATH}${ICON_MAP[persoObj.charWeapon] || 'icon_unknown.webp'}" style="width: 29px; height: 29px;" alt="">
                </div>
                <div class="showcase-level-const" style="display: flex; flex-direction: column; text-align: right;">
                    <p style="font-size: 14px; margin:0;">${t('ui.char.level', persoObj.level)}</p>
                    <p style="font-size: 14px; margin:0;">C${persoObj.cons}</p>
                </div>
            </div>
            <div style="margin-left: 10px; margin-right: 10px; display: flex; justify-content: space-between; align-items: center;">
                <h2 style="font-size: 24px; margin:0;">${persoObj.nom}</h2>
            </div>
        </div>
    `;
}
