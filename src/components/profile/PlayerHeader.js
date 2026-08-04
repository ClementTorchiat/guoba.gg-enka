// src/components/profile/PlayerHeader.js
import { t } from '../../scripts/i18n.js';

export function renderPlayerProfileCard(playerInfo, uid, charData = {}) {
    if (!playerInfo) return '';

    const namecardsData = window.namecardsData || {};
    const namecard = namecardsData[String(playerInfo.nameCardId)];
    let bannerUrl = '';
    if (namecard && namecard.Icon) bannerUrl = `https://enka.network${namecard.Icon}`;

    let profilePicUrl = 'https://enka.network/ui/UI_AvatarIcon_PlayerBoy_Circle.png';
    const pp = playerInfo.profilePicture || {};
    if (pp.id) {
        const pfp = (window.pfpsData || {})[String(pp.id)];
        if (pfp && pfp.IconPath) profilePicUrl = `https://enka.network${pfp.IconPath}`;
    } else if (pp.avatarId && charData && charData[pp.avatarId]) {
        const info = charData[pp.avatarId];
        const getKey = (o, k) => o?.[k] !== undefined ? o[k] : o?.[k[0].toLowerCase() + k.slice(1)];
        let raw = getKey(info, 'IconName') || getKey(info, 'SideIconName') || getKey(info, 'icon');
        if (raw) {
            if (raw.startsWith('/ui/')) {
                profilePicUrl = `https://enka.network${raw.replace('UI_AvatarIcon_Side_', 'UI_AvatarIcon_').replace(/\.png$/i, '_Circle.png')}`;
            } else {
                const n = raw.replace(/^.*UI_AvatarIcon_Side_/, '').replace(/^.*UI_AvatarIcon_/, '').replace(/\.png$/i, '');
                profilePicUrl = `https://enka.network/ui/UI_AvatarIcon_${n}_Circle.png`;
            }
        }
    }

    const serverMap = {
        '1': 'CN', '2': 'CN', '3': 'CN', '4': 'CN', '5': 'TW',
        '6': 'NA', '7': 'EU', '8': 'Asia', '9': 'TW'
    };
    const server = serverMap[String(uid)[0]] || 'CN';

    const nickname = playerInfo.nickname || t('data.unknownPlayer');
    const signature = playerInfo.signature || '';
    const ar = playerInfo.level || 0;
    const achievements = playerInfo.finishAchievementNum ?? null;
    const abyssStars = playerInfo.towerStarIndex ?? null;
    const theaterStars = playerInfo.theaterStarIndex ?? null;
    const stygianIndex = playerInfo.stygianIndex ?? null;
    const stygianSec = (playerInfo.stygianSeconds > 0) ? playerInfo.stygianSeconds : null;

    const ICON = './assets/simulator/icons/';

    function stygianIcon() {
        if (stygianIndex === null) return '';
        if (stygianIndex === 6 && stygianSec !== null && stygianSec < 180) {
            return `<img src="${ICON}stygian_difficulty_6_minus_180.webp" class="pp-icon" alt="${t('ui.alt.stygian')}">`;
        }
        if (stygianIndex >= 1 && stygianIndex <= 6) {
            return `<img src="${ICON}stygian_difficulty_${stygianIndex}.webp" class="pp-icon" alt="${t('ui.alt.stygian')}">`;
        }
        return '';
    }

    const row1 = [
        `<span class="pp-badge pp-badge-server">${server}</span>`,
        achievements !== null
            ? `<span class="pp-badge pp-badge-achievements"><img src="${ICON}icon_achievements.webp" class="pp-icon" alt="${t('ui.alt.achievements')}">${achievements.toLocaleString(window.GUOBA_LANG || 'fr')}</span>`
            : '',
        ar ? `<span class="pp-badge pp-badge-ar">AR${ar}</span>` : '',
    ].filter(Boolean).join('');

    const row2Items = [
        stygianSec !== null
            ? `<span class="pp-badge pp-badge-stygian">${stygianIcon()}${stygianSec}s</span>`
            : '',
        theaterStars !== null
            ? `<span class="pp-badge pp-badge-theater"><img src="${ICON}icon_theater_star.webp" class="pp-icon" alt="${t('ui.alt.theater')}">${theaterStars}</span>`
            : '',
        abyssStars !== null
            ? `<span class="pp-badge pp-badge-abyss"><img src="${ICON}icon_abyss_star.webp" class="pp-icon" alt="${t('ui.alt.abyss')}">${abyssStars}</span>`
            : '',
    ].filter(Boolean);
    const row2 = row2Items.join('');

    return `
        <div class="player-profile-card">
            <div class="player-profile-bg" ${bannerUrl ? `style="background-image:url('${bannerUrl}')"` : ''}></div>
            <div class="player-profile-content">
                <img class="player-profile-avatar"
                     src="${profilePicUrl}" alt="Avatar"
                     onerror="this.src='https://enka.network/ui/UI_AvatarIcon_PlayerBoy_Circle.png'">
                <div class="player-profile-identity">
                    <div class="player-profile-name-row">
                        <span class="player-profile-name">${nickname}</span>
                    </div>
                    ${signature ? `<span class="player-profile-sig">${signature}</span>` : ''}
                    <span class="player-profile-sig" style="opacity: 0.5;">UID: ${uid}</span>
                </div>
                <div class="player-profile-stats">
                    <div class="pp-row">${row1}</div>
                    ${row2 ? `<div class="pp-row">${row2}</div>` : ''}
                </div>
            </div>
        </div>
    `;
}
