/**
 * Cloudflare Worker Script pour guoba.gg
 * 
 * Fonctionnalités :
 * 1. Proxy API Enka Network avec CORS activé pour les requêtes AJAX du client.
 * 2. Détection des robots de partage (Discordbot, Twitterbot, WhatsApp, Facebook, Telegram...).
 * 3. Génération dynamique à la volée des balises OpenGraph (<title>, og:title, og:description, og:image)
 *    avec le nom du personnage, le pseudo, l'archétype, le niveau, les armes, les sets et les stats !
 */

const BOT_USER_AGENTS = [
    'discordbot',
    'twitterbot',
    'facebookexternalhit',
    'whatsapp',
    'telegrambot',
    'slackbot',
    'linkedinbot',
    'vkshare',
    'embedly'
];

function isBot(userAgent) {
    if (!userAgent) return false;
    const ua = userAgent.toLowerCase();
    return BOT_USER_AGENTS.some(bot => ua.includes(bot));
}

function formatNumber(num, lang = 'fr') {
    if (typeof num !== 'number' || isNaN(num)) return '0';
    return lang === 'fr' 
        ? Math.round(num).toLocaleString('fr-FR').replace(/\s/g, ' ') 
        : Math.round(num).toLocaleString('en-US');
}

function normalize(str) {
    if (!str) return '';
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[-_\s']/g, '');
}

/**
 * Extrait les métadonnées pour l'embed Discord
 */
function extractEmbedMetadata(enkaData, charParam, lang = 'fr') {
    const isEn = lang === 'en';
    const nickname = enkaData.playerInfo?.nickname || (isEn ? 'Player' : 'Joueur');
    const avatarList = enkaData.avatarInfoList || [];

    if (avatarList.length === 0) {
        return {
            title: isEn ? `${nickname}'s Showcase — guoba.gg` : `Vitrine de ${nickname} — guoba.gg`,
            description: isEn ? 'No characters currently displayed in showcase.' : 'Aucun personnage actuellement visible en vitrine.',
            image: 'https://guoba.clement-torchiat.fr/assets/global/banner.png'
        };
    }

    let selectedAvatar = null;
    if (charParam) {
        const normParam = normalize(charParam);
        selectedAvatar = avatarList.find(a => String(a.avatarId) === String(charParam) || (a._name && normalize(a._name) === normParam));
    }
    if (!selectedAvatar) {
        selectedAvatar = avatarList[0];
    }

    const charName = charParam || selectedAvatar._name || `Personnage`;
    const level = selectedAvatar.propMap?.['4001']?.val || '90';
    const cons = selectedAvatar.talentIdList ? selectedAvatar.talentIdList.length : 0;

    // Arme
    let weaponName = isEn ? 'Weapon' : 'Arme';
    let refinement = 1;
    const weaponEquip = selectedAvatar.equipList?.find(e => e.weapon || e.flat?.itemType === 'ITEM_WEAPON');
    if (weaponEquip) {
        const affixes = weaponEquip.weapon?.affixMap;
        if (affixes) {
            const firstVal = Object.values(affixes)[0];
            refinement = typeof firstVal === 'number' ? (firstVal + 1) : 1;
        }
        if (weaponEquip._name) weaponName = weaponEquip._name;
    }

    // Stats
    const fp = selectedAvatar.fightPropMap || {};
    const hp = formatNumber(fp[2000] || 0, lang);
    const atk = formatNumber(fp[2001] || 0, lang);
    const def = formatNumber(fp[2002] || 0, lang);
    const cr = ((fp[20] || 0) * 100).toFixed(1);
    const cd = ((fp[22] || 0) * 100).toFixed(1);
    const er = ((fp[23] || 0) * 100).toFixed(1);
    const em = Math.round(fp[28] || 0);

    const mainPower = (fp[2000] > 32000 && fp[2001] < 1400)
        ? `${hp} ${isEn ? 'HP' : 'PV'}`
        : (fp[2002] > 1800 && fp[2001] < 1400)
            ? `${def} ${isEn ? 'DEF' : 'DÉF'}`
            : `${atk} ${isEn ? 'ATK' : 'ATQ'}`;

    const crLabel = isEn ? 'CR' : 'TC';
    const cdLabel = isEn ? 'CD' : 'DC';
    const erLabel = isEn ? 'ER' : 'RE';
    const emLabel = isEn ? 'EM' : 'ME';

    const statsLine = `${mainPower} • ${cr}% ${crLabel} / ${cd}% ${cdLabel} • ${er}% ${erLabel}${em > 0 ? ` • ${em} ${emLabel}` : ''}`;

    // Sets
    const setCountMap = {};
    (selectedAvatar.equipList || []).filter(e => e.reliquary || e.flat?.itemType === 'ITEM_RELIQUARY').forEach(e => {
        const sName = e._setName || 'Artifact';
        setCountMap[sName] = (setCountMap[sName] || 0) + 1;
    });
    const activeSets = Object.entries(setCountMap).sort((a, b) => b[1] - a[1]);
    let setBonusText = isEn ? 'Equipped Artifacts' : 'Artéfacts équipés';
    if (activeSets.length > 0 && activeSets[0][1] >= 4) {
        setBonusText = isEn ? `4pc ${activeSets[0][0]}` : `4p ${activeSets[0][0]}`;
    } else {
        const twoP = activeSets.filter(s => s[1] >= 2);
        if (twoP.length > 0) {
            setBonusText = twoP.map(s => (isEn ? `2pc ${s[0]}` : `2p ${s[0]}`)).join(' + ');
        }
    }

    const archetype = isEn ? 'Optimal Build' : 'Build Optimisé';
    const lvLabel = isEn ? 'Lv.' : 'Niv.';
    const title = isEn ? `${nickname}'s ${charName} — guoba.gg` : `${charName} de ${nickname} — guoba.gg`;

    const description = `${archetype} • ${lvLabel} ${level} • C${cons} • ${weaponName} (R${refinement})\n${statsLine}\n${setBonusText}`;
    
    const assetName = charName.replace(/\s+/g, '');
    const image = selectedAvatar.costumeId
        ? `https://enka.network/ui/UI_AvatarIcon_${assetName}_Costume.png`
        : `https://enka.network/ui/UI_Gacha_AvatarImg_${assetName}.png`;

    return { title, description, image };
}

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const uid = url.searchParams.get('uid');
        const char = url.searchParams.get('char');
        const lang = url.searchParams.get('lang') || 'fr';
        const userAgent = request.headers.get('user-agent') || '';

        // En-têtes CORS universels
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };

        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        // Cas 1 : Requête de crawler / Discordbot sur une URL avec UID
        if (uid && isBot(userAgent)) {
            try {
                // Fetch direct vers Enka Network
                const enkaRes = await fetch(`https://enka.network/api/uid/${uid}/`, {
                    headers: { 'User-Agent': 'guobagg-bot-proxy/1.0' }
                });

                if (enkaRes.ok) {
                    const enkaData = await enkaRes.json();
                    const meta = extractEmbedMetadata(enkaData, char, lang);

                    const html = `<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="UTF-8">
    <title>${meta.title}</title>
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="guoba.gg">
    <meta property="og:title" content="${meta.title}">
    <meta property="og:description" content="${meta.description}">
    <meta property="og:image" content="${meta.image}">
    <meta property="og:url" content="${url.href}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${meta.title}">
    <meta name="twitter:description" content="${meta.description}">
    <meta name="twitter:image" content="${meta.image}">
    <meta name="theme-color" content="#FF7700">
    <meta http-equiv="refresh" content="0;url=https://guoba.clement-torchiat.fr/?uid=${uid}&char=${encodeURIComponent(char || '')}&lang=${lang}">
</head>
<body>
    <p>Redirection vers <a href="https://guoba.clement-torchiat.fr/?uid=${uid}">guoba.gg</a>...</p>
</body>
</html>`;

                    return new Response(html, {
                        headers: {
                            'Content-Type': 'text/html; charset=utf-8',
                            'Cache-Control': 'public, max-age=60, s-maxage=300',
                            ...corsHeaders
                        }
                    });
                }
            } catch (err) {
                // Fallback silencieux vers le comportement standard
            }
        }

        // Cas 2 : Proxy API standard vers Enka.Network pour le client
        if (uid) {
            const enkaUrl = `https://enka.network/api/uid/${uid}/`;
            const enkaResponse = await fetch(enkaUrl, {
                headers: { 'User-Agent': 'guobagg-proxy/1.0' }
            });
            const responseData = await enkaResponse.text();

            return new Response(responseData, {
                status: enkaResponse.status,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'public, max-age=60',
                    ...corsHeaders
                }
            });
        }

        // Cas 3 : Redirection vers le site principal si aucune requête UID
        return Response.redirect('https://guoba.clement-torchiat.fr', 302);
    }
};
