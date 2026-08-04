// src/components/showcase/WeaponCard.js
import { t } from '../../scripts/i18n.js';
import { formatValueDisplay } from '../../scripts/data.js';

export function renderWeaponCard(persoObj) {
    if (!persoObj || !persoObj.weapon) return '';
    const w = persoObj.weapon;

    return `
        <div class="card weapon-card" style="width: 350px; height: 128px; position: relative; overflow: hidden; z-index: 20; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: rgb(0, 0, 0) 1px 1px 6px; box-sizing: border-box; transition: box-shadow .25s, border-color .25s !important; display: flex; padding: 10px;">
            <img src="${w.icon}" class="item-img" style="width: auto; height:100%; border-radius: 8px; border:2px solid ${w.stars === 5 ? '#eab308' : '#9C74B6'}" alt="${w.name}" decoding="async">
            <div style="flex:1; display: flex; flex-direction: column; overflow: hidden; margin-left: 10px;">
                <div style="font-size:16px; color: var(--text-always-white); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${w.name}</div>
                <div style="color: var(--text-always-white); font-size:14px; margin-bottom:5px;">${t('ui.char.level', w.level)} • R${w.rank || 1}</div>
                <div style="display:flex; gap:12px; margin-top:5px; background:rgba(0,0,0,0.2); padding:5px; border-radius:8px; overflow: hidden;">
                    ${w.baseAtk ? `
                    <div style="overflow: hidden; padding-left: 2px;">
                        <p style="font-size:12px; color: rgba(255, 255, 255, 0.4); text-align: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin:0;">${t('ui.art.baseAtk')}</p>
                        <p style="font-size:16px; text-align: left; margin-top: 2px; margin-bottom:0;">${w.baseAtk.value}</p>
                    </div>` : ''}
                    ${w.subStat ? `
                    <div style="border-left:1px solid rgba(255, 255, 255, 0.4); padding-left:12px; overflow: hidden;">
                        <p style="font-size:12px; color: rgba(255, 255, 255, 0.4); text-align: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin:0;">${w.subStat.label}</p>
                        <p style="font-size:16px; text-align: left; margin-top: 2px; margin-bottom:0;">${formatValueDisplay(w.subStat.key, w.subStat.value)}</p>
                    </div>` : ''}
                </div>
            </div>
        </div>
    `;
}
