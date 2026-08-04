// src/scripts/embedHelper.js
// Module de formatage des métadonnées OpenGraph / Discord dynamiques pour guoba.gg

/**
 * Formate un nombre avec séparateur de milliers adapté à la langue
 */
function formatNumber(num, lang = 'fr') {
    if (typeof num !== 'number' || isNaN(num)) return '0';
    return lang === 'fr' 
        ? Math.round(num).toLocaleString('fr-FR').replace(/\s/g, ' ') 
        : Math.round(num).toLocaleString('en-US');
}

/**
 * Nettoie une chaîne de caractères pour la recherche (minuscule, sans accents, sans tirets)
 */
function normalizeName(str) {
    if (!str) return '';
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[-_\s']/g, '');
}

/**
 * Génère les métadonnées pour l'embed Discord / OpenGraph
 * 
 * @param {Object} enkaData Données JSON renvoyées par l'API Enka
 * @param {string|null} charParam Nom ou ID du personnage demandé
 * @param {string} lang Langue ('fr' ou 'en')
 * @param {Object} extraConfigs Dictionnaires optionnels (locs, configs de personnages)
 * @returns {Object} { title, description, image, url }
 */
export function generateEmbedMeta(enkaData, charParam = null, lang = 'fr', extraConfigs = {}) {
    const isEn = lang === 'en';
    const defaultTitle = isEn ? 'guoba.gg — Genshin Impact Simulator & Build Optimizer' : 'guoba.gg — Simulateur & Optimiseur Genshin Impact';
    const defaultDesc = isEn 
        ? 'Analyze your builds, rate your artifacts and simulate combat buffs directly from your UID.'
        : 'Évaluez vos artéfacts, optimisez vos statistiques et simulez vos buffs en combat directement depuis votre UID.';
    const defaultImage = 'https://guoba.clement-torchiat.fr/assets/global/banner.png';

    if (!enkaData || !enkaData.avatarInfoList || enkaData.avatarInfoList.length === 0) {
        return {
            title: defaultTitle,
            description: defaultDesc,
            image: defaultImage,
            url: `https://guoba.clement-torchiat.fr/?lang=${lang}`
        };
    }

    const nickname = enkaData.playerInfo?.nickname || (isEn ? 'Player' : 'Joueur');
    const avatarList = enkaData.avatarInfoList;

    // 1. Recherche du personnage sélectionné
    let selectedAvatar = null;
    if (charParam) {
        const normParam = normalizeName(charParam);
        selectedAvatar = avatarList.find(a => {
            if (String(a.avatarId) === String(charParam)) return true;
            // Vérification via dictionnaires ou nom de personnage
            if (extraConfigs.charIdToName && extraConfigs.charIdToName[a.avatarId]) {
                const cName = extraConfigs.charIdToName[a.avatarId];
                if (normalizeName(cName) === normParam) return true;
            }
            return false;
        });
    }

    // Si aucun personnage spécifique n'est trouvé, prendre le premier de la vitrine
    if (!selectedAvatar) {
        selectedAvatar = avatarList[0];
    }

    const avatarId = selectedAvatar.avatarId;
    const charName = (extraConfigs.charIdToName && extraConfigs.charIdToName[avatarId]) 
        || selectedAvatar._name 
        || `Personnage #${avatarId}`;

    // 2. Niveau et Constellations
    const level = selectedAvatar.propMap?.['4001']?.val || '90';
    const cons = selectedAvatar.talentIdList ? selectedAvatar.talentIdList.length : 0;

    // 3. Extraction de l'Arme
    let weaponName = isEn ? 'Equipped Weapon' : 'Arme équipée';
    let refinement = 1;
    const weaponEquip = selectedAvatar.equipList?.find(e => e.weapon || e.flat?.itemType === 'ITEM_WEAPON');
    if (weaponEquip) {
        const affixes = weaponEquip.weapon?.affixMap;
        if (affixes) {
            const firstAffixVal = Object.values(affixes)[0];
            refinement = typeof firstAffixVal === 'number' ? (firstAffixVal + 1) : 1;
        }
        if (extraConfigs.locs && weaponEquip.flat?.nameTextMapHash) {
            const locKey = isEn ? 'en' : 'fr';
            weaponName = extraConfigs.locs[locKey]?.[weaponEquip.flat.nameTextMapHash] || weaponName;
        } else if (weaponEquip._name) {
            weaponName = weaponEquip._name;
        }
    }

    // 4. Extraction des Sets d'Artéfacts
    const setCountMap = {};
    const relicEquips = selectedAvatar.equipList?.filter(e => e.reliquary || e.flat?.itemType === 'ITEM_RELIQUARY') || [];
    relicEquips.forEach(e => {
        let setName = null;
        if (extraConfigs.locs && e.flat?.setNameTextMapHash) {
            const locKey = isEn ? 'en' : 'fr';
            setName = extraConfigs.locs[locKey]?.[e.flat.setNameTextMapHash];
        } else if (e._setName) {
            setName = e._setName;
        }
        if (setName) {
            setCountMap[setName] = (setCountMap[setName] || 0) + 1;
        }
    });

    let setBonusText = '';
    const activeSets = Object.entries(setCountMap).sort((a, b) => b[1] - a[1]);
    const fourPiece = activeSets.find(([_, count]) => count >= 4);
    if (fourPiece) {
        setBonusText = isEn ? `4pc ${fourPiece[0]}` : `4p ${fourPiece[0]}`;
    } else {
        const twoPieces = activeSets.filter(([_, count]) => count >= 2).slice(0, 2);
        if (twoPieces.length > 0) {
            setBonusText = twoPieces
                .map(([name]) => (isEn ? `2pc ${name}` : `2p ${name}`))
                .join(' + ');
        } else {
            setBonusText = isEn ? 'Rainbow Set (No 2pc/4pc active)' : 'Pièces détachées (Aucun bonus de set)';
        }
    }

    // 5. Statistiques de combat clés
    const fp = selectedAvatar.fightPropMap || {};
    const hp = formatNumber(fp[2000] || 0, lang);
    const atk = formatNumber(fp[2001] || 0, lang);
    const def = formatNumber(fp[2002] || 0, lang);
    const cr = ((fp[20] || 0) * 100).toFixed(1);
    const cd = ((fp[22] || 0) * 100).toFixed(1);
    const er = ((fp[23] || 0) * 100).toFixed(1);
    const em = Math.round(fp[28] || 0);

    // Déterminer la stat offensive prioritaire (ATQ, PV ou DÉF)
    const mainPowerStat = (fp[2000] > 32000 && fp[2001] < 1400) 
        ? `${hp} ${isEn ? 'HP' : 'PV'}`
        : (fp[2002] > 1800 && fp[2001] < 1400)
            ? `${def} ${isEn ? 'DEF' : 'DÉF'}`
            : `${atk} ${isEn ? 'ATK' : 'ATQ'}`;

    const crLabel = isEn ? 'CR' : 'TC';
    const cdLabel = isEn ? 'CD' : 'DC';
    const erLabel = isEn ? 'ER' : 'RE';
    const emLabel = isEn ? 'EM' : 'ME';

    const statsLine = `${mainPowerStat} • ${cr}% ${crLabel} / ${cd}% ${cdLabel} • ${er}% ${erLabel}${em > 0 ? ` • ${em} ${emLabel}` : ''}`;

    // 6. Archétype / Team configuré
    let archetype = isEn ? 'Optimal Build' : 'Build Optimisé';
    if (extraConfigs.characterConfigs && extraConfigs.characterConfigs[charName]) {
        const charConfig = extraConfigs.characterConfigs[charName];
        if (charConfig.builds) {
            const firstBuild = Object.values(charConfig.builds)[0];
            if (firstBuild && firstBuild.name) {
                archetype = (isEn ? firstBuild.name.en : firstBuild.name.fr) || archetype;
            }
        }
    }

    // 7. Formatage du Titre et de la Description (sans emoji)
    const title = isEn 
        ? `${nickname}'s ${charName} — guoba.gg`
        : `${charName} de ${nickname} — guoba.gg`;

    const lvLabel = isEn ? 'Lv.' : 'Niv.';
    const descLine1 = `${archetype} • ${lvLabel} ${level} • C${cons} • ${weaponName} (R${refinement})`;
    const descLine2 = statsLine;
    const descLine3 = setBonusText;

    const description = `${descLine1}\n${descLine2}\n${descLine3}`;

    // 8. Image officielle HD
    // Priorité à l'artwork splash / gacha officiel, sinon icône officielle
    const assetName = charName.replace(/\s+/g, '');
    const image = (selectedAvatar.costumeId)
        ? `https://enka.network/ui/UI_AvatarIcon_${assetName}_Costume.png`
        : `https://enka.network/ui/UI_Gacha_AvatarImg_${assetName}.png`;

    const url = `https://guoba.clement-torchiat.fr/?uid=${enkaData.playerInfo?.uid || ''}&char=${encodeURIComponent(charName)}&lang=${lang}`;

    return {
        title,
        description,
        image,
        url
    };
}
