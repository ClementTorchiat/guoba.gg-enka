// src/components/advice/ProgressionAdvice.js
import { t } from '../../scripts/i18n.js';

export function getLevelAdvice(persoObj) {
    const lvl = persoObj.level || 0;
    if (lvl >= 100) {
        return {
            type: "success",
            title: t('advice.level.title'),
            msg: t('advice.level.legendary'),
            maxLevel: 100,
            barColor: '#22c55e'
        };
    }
    if (lvl >= 95) {
        return {
            type: "success",
            title: t('advice.level.title'),
            msg: t('advice.level.ascended'),
            maxLevel: 95,
            barColor: '#22c55e'
        };
    }
    if (lvl >= 90) {
        return {
            type: "success",
            title: t('advice.level.title'),
            msg: t('advice.level.ok'),
            maxLevel: 90,
            barColor: '#22c55e'
        };
    }
    return {
        type: "info",
        title: t('advice.level.title'),
        msg: t('advice.level.low'),
        maxLevel: 90,
        barColor: '#ef4444'
    };
}

export function getWeaponAdvice(persoObj) {
    if (!persoObj.weapon) {
        return {
            type: "warning",
            title: t('advice.weapon.title'),
            msg: t('advice.weapon.none')
        };
    }

    if (persoObj.weapon.level < 90) {
        return {
            type: "warning",
            title: t('advice.weapon.title'),
            msg: t('advice.weapon.low')
        };
    } else {
        return {
            type: "success",
            title: t('advice.weapon.title'),
            msg: t('advice.weapon.ok')
        };
    }
}

export function renderLevelAdvice(persoObj) {
    const adv = getLevelAdvice(persoObj);
    const borderColor = adv.type === 'success' ? '#22c55e' : '#ef4444';
    const pctCurrent = Math.min(((persoObj.level || 1) / adv.maxLevel) * 100, 100);
    const pctTarget = 100;

    return `
        <div style="background:var(--bg-panel); padding:15px; border-radius:8px; border-left:3px solid ${borderColor}; display:flex; flex-direction:column; justify-content:space-between; min-height:165px; box-sizing:border-box;">
            <div>
                <p style="font-size: 12px; color: var(--text-grey); text-transform: uppercase; margin-bottom: 12px;">${adv.title}</p>
                <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px;">
                    <img src="${persoObj.image}" style="width:60px; height:60px; border-radius:6px; background:rgba(0,0,0,0.1); object-fit:cover; align-self:flex-start;" alt="${persoObj.nom}">
                    <div style="flex:1;">
                        <p style="font-size: 12px; color:var(--text-grey); margin:0 0 4px 0;">${persoObj.nom}</p>
                        <p style="font-size: 14px; color:var(--text-primary); margin:0; line-height:1.4;">${adv.msg}</p>
                    </div>
                </div>
            </div>
            
            <div style="width: 100%; position: relative; margin-top:auto;">
                <div style="width: 100%; height: 16px; background: rgba(0,0,0,0.2); border-radius: 4px; overflow: hidden; position: relative;">
                    <div style="
                        width: ${pctCurrent}%; 
                        height: 100%; 
                        background: ${adv.barColor};
                        opacity: 0.85; 
                        transition: width 0.5s ease-out;
                    "></div>
                </div>
                
                <div style="
                    position: absolute; 
                    left: ${pctTarget}%; 
                    top: -4px; 
                    width: 2px; 
                    height: 24px; 
                    background: var(--text-always-white); 
                    box-shadow: 0 0 5px rgba(0,0,0,0.8);
                    z-index: 2;
                    transform: translateX(-50%);
                ">
                    <div style="position: absolute; top: -5px; left: -3px; width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 4px solid var(--text-always-white);"></div>
                </div>
                
                <div style="display: flex; justify-content: space-between; font-size: 10px; color: var(--text-grey); margin-top: 4px;">
                    <span>${t('analysis.s3.lvl.1')}</span>
                    <span style="color:var(--text-always-white);">${t('analysis.s3.lvl.current', persoObj.level || 1)}</span>
                    <span>${t('analysis.s3.lvl.max', adv.maxLevel)}</span>
                </div>
            </div>
        </div>
    `;
}

export function renderWeaponAdvice(persoObj) {
    const adv = getWeaponAdvice(persoObj);
    const color = adv.type === 'success' ? '#22c55e' : '#ef4444';
    const weaponLevel = persoObj.weapon ? persoObj.weapon.level : 1;
    const pctCurrent = (weaponLevel / 90) * 100;
    const pctTarget = 100;
    const weaponIcon = persoObj.weapon ? persoObj.weapon.icon : '/assets/simulator/icons/icon_unknown.webp';

    return `
        <div style="background:var(--bg-panel); padding:15px; border-radius:8px; border-left:3px solid ${color}; display:flex; flex-direction:column; justify-content:space-between; min-height:165px; box-sizing:border-box;">
            <div>
                <p style="font-size: 12px; color: var(--text-grey); text-transform: uppercase; margin-bottom: 12px;">${adv.title}</p>
                <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px;">
                    <img src="${weaponIcon}" style="width:60px; height:60px; border-radius:6px; background:rgba(0,0,0,0.1); object-fit:cover; align-self:flex-start;" alt="${t('ui.alt.weapon')}">
                    <div style="flex:1;">
                        <p style="font-size: 12px; color:var(--text-grey); margin:0 0 4px 0;">${persoObj.weapon ? persoObj.weapon.name : ''}</p>
                        <p style="font-size: 14px; color:var(--text-primary); margin:0; line-height:1.4;">${adv.msg}</p>
                    </div>
                </div>
            </div>
            
            <div style="width: 100%; position: relative; margin-top:auto;">
                <div style="width: 100%; height: 16px; background: rgba(0,0,0,0.2); border-radius: 4px; overflow: hidden; position: relative;">
                    <div style="
                        width: ${pctCurrent}%; 
                        height: 100%; 
                        background: ${color}; 
                        opacity: 0.85; 
                        transition: width 0.5s ease-out;
                    "></div>
                </div>
                
                <div style="
                    position: absolute; 
                    left: ${pctTarget}%; 
                    top: -4px; 
                    width: 2px; 
                    height: 24px; 
                    background: var(--text-always-white); 
                    box-shadow: 0 0 5px rgba(0,0,0,0.8);
                    z-index: 2;
                    transform: translateX(-50%);
                ">
                    <div style="position: absolute; top: -5px; left: -3px; width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 4px solid var(--text-always-white);"></div>
                </div>
                
                <div style="display: flex; justify-content: space-between; font-size: 10px; color: var(--text-grey); margin-top: 4px;">
                    <span>${t('analysis.s3.lvl.1')}</span>
                    <span style="color:var(--text-always-white);">${t('analysis.s3.lvl.current', weaponLevel)}</span>
                    <span>${t('analysis.s3.lvl.max', 90)}</span>
                </div>
            </div>
        </div>
    `;
}
