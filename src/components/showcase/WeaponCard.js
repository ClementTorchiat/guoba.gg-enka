// src/components/showcase/WeaponCard.js
import { t } from '../../scripts/i18n.js';
import { formatValueDisplay } from '../../scripts/data.js';
import ICON_MAP from '../../data/icon_map.json';

export function renderWeaponCard(persoObj) {
    if (!persoObj || !persoObj.weapon) return '';
    const w = persoObj.weapon;
    const ICON_BASE_PATH = "/assets/simulator/icons/";
    const subStatIcon = (w.subStat && w.subStat.key) ? (ICON_MAP[w.subStat.key] || ICON_MAP['unknown']) : 'icon_unknown.webp';

    return `
        <div class="card weapon-card" style="width: 350px; height: 128px; position: relative; overflow: hidden; z-index: 20; border-radius: 8px; border: 1px solid var(--char-card-border, rgba(255, 255, 255, 0.4)); box-shadow: rgb(0, 0, 0) 1px 1px 6px; box-sizing: border-box; transition: box-shadow .25s, border-color .25s !important; display: flex; padding: 10px;">
            <img src="${w.icon}" class="item-img" width="106" height="106" crossorigin="anonymous" style="width: auto; height:100%; border-radius: 8px; border:2px solid ${w.stars === 5 ? '#eab308' : '#9C74B6'}" alt="${w.name}" decoding="async">
            <div style="flex:1; display: flex; flex-direction: column; overflow: hidden;">
                <div style="font-size:16px; color: var(--text-always-white); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${w.name}</div>
                <div style="color: var(--text-always-white); font-size:14px; margin-bottom:5px;">${t('ui.char.level', w.level)} • R${w.rank || 1}</div>
                <div class="weapon-stats-row" style="display:flex; gap:12px; margin-top:5px; background:var(--shadow-subtle); padding:5px; border-radius:8px; overflow: hidden; transition: border-radius 0.25s ease;">
                    ${w.baseAtk ? `
                    <div style="overflow: hidden; padding-left: 2px;">
                        <p style="font-size:12px; color: rgba(255, 255, 255, 0.4); text-align: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin:0;">${t('ui.art.baseAtk')}</p>
                        <div style="display: flex; align-items: center; gap: 5px; margin-top: 2px;">
                            <img src="${ICON_BASE_PATH}icon_atk.webp" style="width: 15px; height: 15px; object-fit: contain; flex-shrink: 0;" alt="ATK" decoding="async">
                            <p style="font-size:16px; text-align: left; margin:0; line-height: 1;">${w.baseAtk.value}</p>
                        </div>
                    </div>` : ''}
                    ${w.subStat ? `
                    <div style="border-left:1px solid var(--char-card-border, rgba(255, 255, 255, 0.4)); padding-left:12px; overflow: hidden;">
                        <p style="font-size:12px; color: rgba(255, 255, 255, 0.4); text-align: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin:0;">${w.subStat.label}</p>
                        <div style="display: flex; align-items: center; gap: 5px; margin-top: 2px;">
                            <img src="${ICON_BASE_PATH}${subStatIcon}" style="width: 15px; height: 15px; object-fit: contain; flex-shrink: 0;" alt="${w.subStat.key}" decoding="async">
                            <p style="font-size:16px; text-align: left; margin:0; line-height: 1;">${formatValueDisplay(w.subStat.key, w.subStat.value)}</p>
                        </div>
                    </div>` : ''}
                </div>
            </div>
        </div>
    `;
}
