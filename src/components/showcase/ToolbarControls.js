// src/components/showcase/ToolbarControls.js
import { t } from '../../scripts/i18n.js';
import { calculateCharacterScore, calculateMaxTheoreticalScore } from '../../scripts/scoring.js';
import { getLabel } from '../../scripts/data.js';

const ICON_BASE_PATH = "./assets/simulator/icons/";

export function renderToolbarControls(persoObj, charIndex) {
    if (!persoObj) return '';

    if (!persoObj.charConfig || !persoObj.charConfig.builds) {
        return `<span class="main-content-menu-team" style="padding-top: 17px; padding-bottom: 14px; display:inline-block; box-sizing:border-box;">${t('ui.noArchetype')}</span>`;
    }

    const ELEMENT_COLORS = (typeof window !== 'undefined' && window.ELEMENT_COLORS) || {
        pyro: '#f87171', hydro: '#60a5fa', electro: '#c084fc', anemo: '#4ade80',
        cryo: '#93c5fd', geo: '#fcd34d', dendro: '#86efac'
    };

    const currentBuildKey = persoObj.activeBuild ? persoObj.activeBuild.key : Object.keys(persoObj.charConfig.builds)[0];
    const builds = persoObj.charConfig.builds;

    let activeBuildTextHtml = '';

    let buildOptionsHtml = Object.entries(builds).map(([key, build]) => {
        const tempConfig = { ...persoObj.charConfig, ...build };
        const clonedArtefacts = (persoObj.artefacts || []).map(a => ({ ...a }));
        const simulation = calculateCharacterScore({ artefacts: clonedArtefacts }, tempConfig);
        const potential = calculateMaxTheoreticalScore({ artefacts: persoObj.artefacts || [] }, tempConfig);

        let efficiency = 0;
        if (potential && potential.score > 0) {
            efficiency = ((simulation.score / potential.score) * 100).toFixed(1);
        }

        const isCurrent = key === currentBuildKey;
        const effText = efficiency > 0 ? ` - ${efficiency}%` : '';
        const label = `${getLabel(build.name)}${effText}`;

        if (isCurrent) {
            activeBuildTextHtml = label;
        }

        const isActiveClass = isCurrent ? 'active-item' : '';
        return `<div class="data-select-item ${isActiveClass}" onclick="selectCustomBuild(${charIndex}, '${key}')">${label}</div>`;
    }).join('');

    // Team rendering
    let teamHtml = '';
    if (persoObj.activeBuild && persoObj.activeBuild.team) {
        const charElement = persoObj.combatStats?.dmgBonusKey ? persoObj.combatStats.dmgBonusKey.replace('_dmg_', '') : 'pyro';
        const charBg = ELEMENT_COLORS[charElement] || '#333';
        const charImg = persoObj.image ? persoObj.image.replace('Side_', '') : '';
        const charIcon = `<img src="${charImg}" style="width:40px; height:40px; border-radius:5px; border:1px solid rgba(255,255,255,0.5); box-shadow:0 0 5px rgba(0,0,0,0.5); object-fit:cover; background:${charBg};" title="${persoObj.nom}" decoding="async">`;

        const resolveTeammateNameFn = (typeof window !== 'undefined' && window.resolveTeammateName) ? window.resolveTeammateName : (n => n);

        const matesHtml = persoObj.activeBuild.team.map(mate => {
            const ARCHETYPE_ROLES = new Set(["Hexerei", "Lunar", "Stellar"]);

            const getIconUrl = (name, elem, role) => {
                if (name) return `https://enka.network/ui/UI_AvatarIcon_${name}.png`;
                if (elem) return `${ICON_BASE_PATH}icon_${elem}.webp`;
                if (ARCHETYPE_ROLES.has(role)) return `${ICON_BASE_PATH}icon_role_${role.toLowerCase()}.svg`;
                return `${ICON_BASE_PATH}icon_empty_slot.svg`;
            };

            const isDual = Array.isArray(mate.element) || Array.isArray(mate.name);
            const names = Array.isArray(mate.name) ? mate.name : (mate.name ? [mate.name] : [null]);
            const elems = Array.isArray(mate.element) ? mate.element : [mate.element];

            let bgStyle = '';
            if (isDual && elems.length >= 2) {
                const c1 = ELEMENT_COLORS[elems[0]] || '#333';
                const c2 = ELEMENT_COLORS[elems[1]] || '#333';
                bgStyle = `background: linear-gradient(135deg, ${c1} 50%, ${c2} 50%);`;
            } else {
                bgStyle = `background: ${ELEMENT_COLORS[elems[0]] || '#333'};`;
            }

            let innerHtml = '';
            if (!isDual) {
                const url = getIconUrl(names[0], elems[0], mate.role);
                const fallback = elems[0] ? `${ICON_BASE_PATH}icon_${elems[0]}.webp` : `${ICON_BASE_PATH}icon_unknown.webp`;
                const isArchetype = (ARCHETYPE_ROLES.has(mate.role) && !names[0]) || (!names[0] && !elems[0]);
                const imgStyle = isArchetype
                    ? "width:100%; height:100%; object-fit:contain; padding:6px; box-sizing:border-box; opacity:0.8;"
                    : "width:100%; height:100%; object-fit:cover;";

                innerHtml = `
                    <img src="${url}" 
                         style="${imgStyle}"
                         onerror="this.src='${fallback}'" 
                         title="${mate.role}: ${names[0] ? resolveTeammateNameFn(names[0]) : (elems[0] || t('data.unknown'))}"
                         decoding="async">
                `;
            } else {
                const url1 = getIconUrl(names[0], elems[0], mate.role);
                const fb1 = elems[0] ? `${ICON_BASE_PATH}icon_${elems[0]}.webp` : `${ICON_BASE_PATH}icon_unknown.webp`;
                const url2 = getIconUrl(names[1] || names[0], elems[1] || elems[0], mate.role);
                const fb2 = (elems[1] || elems[0]) ? `${ICON_BASE_PATH}icon_${elems[1] || elems[0]}.webp` : `${ICON_BASE_PATH}icon_unknown.webp`;

                innerHtml = `
                    <div style="position:absolute; inset:0; clip-path: polygon(0 0, 100% 0, 0 100%); z-index:2;">
                        <img src="${url1}" onerror="this.src='${fb1}'" style="width:100%; height:100%; object-fit:cover;" decoding="async">
                    </div>
                    <div style="position:absolute; inset:0; clip-path: polygon(100% 0, 100% 100%, 0 100%); z-index:1;">
                        <img src="${url2}" onerror="this.src='${fb2}'" style="width:100%; height:100%; object-fit:cover;" decoding="async">
                    </div>
                    <div style="position:absolute; inset:0; background:linear-gradient(to bottom right, transparent 49.5%, var(--text-primary) 49.5%, var(--text-primary) 50.5%, transparent 50.5%); z-index:3; pointer-events:none;"></div>
                `;
            }

            const resolveIconFromKey = (key) => {
                if (!key || !window.HASH_TO_KEY || !window.iconToNameHash) return null;
                const hash = Object.keys(window.HASH_TO_KEY).find(h => window.HASH_TO_KEY[h] === key);
                if (!hash) return null;
                for (let [icon, h] of Object.entries(window.iconToNameHash)) {
                    if (String(h) === String(hash)) {
                        let cleanIcon = icon.split('/').pop().replace('.png', '');
                        if (cleanIcon.startsWith('UI_RelicIcon')) {
                            const base = cleanIcon.substring(0, cleanIcon.lastIndexOf('_'));
                            return `https://enka.network/ui/${base}_4.png`;
                        } else {
                            return `https://enka.network/ui/${cleanIcon}.png`;
                        }
                    }
                }
                return null;
            };

            const getLocalizedName = (key) => {
                if (!key || !(typeof window !== 'undefined' && window.HASH_TO_KEY)) return '';
                const hash = Object.keys(window.HASH_TO_KEY).find(h => window.HASH_TO_KEY[h] === key);
                return (hash && typeof window !== 'undefined' && window.getText) ? window.getText(hash) : key;
            };

            const weaponIcon = mate.weapon
                ? (window.ITEM_ICON_MAP?.[mate.weapon] || resolveIconFromKey(mate.weapon))
                : null;
            const artifactIcon = mate.artifact
                ? (window.ITEM_ICON_MAP?.[mate.artifact] || resolveIconFromKey(mate.artifact))
                : null;

            const weaponName = mate.weapon ? getLocalizedName(mate.weapon).replace(/"/g, '&quot;') : '';
            const artifactName = mate.artifact ? getLocalizedName(mate.artifact).replace(/"/g, '&quot;') : '';

            const weaponBadge = weaponIcon
                ? `<img src="${weaponIcon}" title="${weaponName}" style="position:absolute; bottom:0; left:0; width:16px; height:16px; border-radius:4px; z-index:10; background: var(--bg-panel);" onerror="this.style.display='none'" decoding="async">`
                : '';

            const artifactBadge = artifactIcon
                ? `<img src="${artifactIcon}" title="${artifactName}" style="position:absolute; bottom:0; right:0; width:16px; height:16px; border-radius:4px; z-index:10; background: var(--bg-panel);" onerror="this.style.display='none'" decoding="async">`
                : '';

            const consBadge = (mate.cons && mate.cons > 0)
                ? `<span style="position:absolute; top:1px; right:2px; font-size:9px; font-weight:700; color:#fff; text-shadow:0 0 3px #000; z-index:10;">C${mate.cons}</span>`
                : '';

            return `
                <div style="position:relative; width:40px; height:40px; border-radius:5px; ${bgStyle} overflow:hidden;" title="${mate.role}">
                    ${innerHtml}
                    ${weaponBadge}
                    ${artifactBadge}
                    ${consBadge}
                </div>
            `;
        }).join('');

        teamHtml = `<div style="display:flex; color: var(--text-primary); border: none; border-radius: 8px; padding: 5px; flex-direction: row; align-items:center; gap: 5px; background: var(--bg-panel);">${charIcon}${matesHtml}</div>`;
    }

    const currentERReq = (persoObj.activeBuild && persoObj.activeBuild.er_req) || 100;
    let activeERTextHtml = `${currentERReq}% ER`;
    let erOptionsHtml = '';
    for (let i = 100; i <= 300; i += 10) {
        const label = `${i}% ER`;
        const isActiveClass = i === currentERReq ? 'active-item' : '';
        erOptionsHtml += `<div class="data-select-item ${isActiveClass}" onclick="selectCustomER(${charIndex}, ${i})">${label}</div>`;
    }

    return `
        <div class="data-select-container main-content-menu-team" style="padding:0; border:none; background:transparent;">
            <button class="custom-dropdown-btn" onclick="toggleBuildMenu(event)" style="width: 100%; display: flex; justify-content: space-between; align-items: center; border: none; background: var(--bg-panel); color: var(--text-primary); padding: 8px 12px; border-radius: 8px; cursor: pointer; font-family: inherit; font-size: 14px; font-weight: 500; height: 100%; box-sizing: border-box;">
                <span id="active-build-text" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-align: left;">${activeBuildTextHtml}</span>
                <img src="assets/simulator/icons/icon_arrow_down_white.svg" alt="" class="sort-arrow" id="arrow-original" style="font-size: 12px; opacity: 0.6; margin-left: 8px; flex-shrink: 0;">
            </button>
            <div id="build-custom-menu" class="data-select-menu">
                ${buildOptionsHtml}
            </div>
        </div>

        ${teamHtml}

        <div class="data-select-container main-content-menu-er" style="padding:0; border:none; background:transparent;">
            <button class="custom-dropdown-btn" onclick="toggleErMenu(event)" style="width: 100%; display: flex; justify-content: space-between; align-items: center; border: none; background: var(--bg-panel); color: var(--text-primary); padding: 8px 12px; border-radius: 8px; cursor: pointer; font-family: inherit; font-size: 14px; font-weight: 500; height: 100%; box-sizing: border-box; min-width: 106px;">
                <span id="active-er-text" style="white-space: nowrap;">${activeERTextHtml}</span>
                <img src="assets/simulator/icons/icon_arrow_down_white.svg" alt="" class="sort-arrow" id="arrow-original" style="font-size: 12px; opacity: 0.6; margin-left: 8px; flex-shrink: 0;">
            </button>
            <div id="er-custom-menu" class="data-select-menu" style="min-width: 110px;">
                ${erOptionsHtml}
            </div>
        </div>
    `;
}
