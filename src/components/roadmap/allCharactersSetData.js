// src/components/roadmap/allCharactersSetData.js
import CONFIG_NAME_ALIASES_EN_TO_FR from '../../data/config_name_aliases_en_to_fr.json';

const charJsonFiles = import.meta.glob('../../../data/characters/*.json', { eager: true });

const ENKA_ICON_MAP = {
    "Alhaitham": "Alhatham",
    "Amber": "Ambor",
    "Arataki_Itto": "Itto",
    "Baizhu": "Baizhuer",
    "Fréminet": "Freminet",
    "Hu_Tao": "Hutao",
    "Jean": "Qin",
    "Kaedehara_Kazuha": "Kazuha",
    "Kamisato_Ayaka": "Ayaka",
    "Kamisato_Ayato": "Ayato",
    "Kirara": "Momoka",
    "Kujou_Sara": "Sara",
    "Kuki_Shinobu": "Shinobu",
    "Lan_Yan": "Lanyan",
    "Lyney": "Liney",
    "Nomade": "Wanderer",
    "Noëlle": "Noel",
    "Noelle": "Noel",
    "Ororon": "Olorun",
    "Rosalia": "Rosaria",
    "Rosaria": "Rosaria",
    "Sandrone": "Sandrone",
    "Sangonomiya_Kokomi": "Kokomi",
    "Shikanoin_Heizou": "Heizo",
    "Shogun_Raiden": "Shougun",
    "Thomas": "Thoma",
    "Xianyun": "Liuyun",
    "Yae_Miko": "Yae",
    "Yanfei": "Feiyan",
    "Yumemizuki_Mizuki": "Mizuki",
    "Yun_Jin": "Yunjin",
    "Émilie": "Emilie"
};

export const ALL_GAME_CHARACTERS = [];

for (const path in charJsonFiles) {
    const raw = charJsonFiles[path].default || charJsonFiles[path];
    const fileName = path.split('/').pop().replace('.json', '');
    const cleanNoUnderscore = fileName.replace(/_/g, ' ');
    const frName = CONFIG_NAME_ALIASES_EN_TO_FR[cleanNoUnderscore] || CONFIG_NAME_ALIASES_EN_TO_FR[fileName] || cleanNoUnderscore;

    const bestSetKeys = new Set();
    if (raw.bestSets && Array.isArray(raw.bestSets)) {
        raw.bestSets.forEach(s => bestSetKeys.add(s.split(':')[0]));
    }
    if (raw.builds && typeof raw.builds === 'object') {
        Object.values(raw.builds).forEach(b => {
            if (b.bestSets && Array.isArray(b.bestSets)) {
                b.bestSets.forEach(s => bestSetKeys.add(s.split(':')[0]));
            }
        });
    }

    const iconKey = ENKA_ICON_MAP[fileName] || ENKA_ICON_MAP[cleanNoUnderscore] || fileName;
    const image = `https://enka.network/ui/UI_AvatarIcon_Side_${iconKey}.png`;

    ALL_GAME_CHARACTERS.push({
        id: fileName,
        nom: frName,
        image,
        bestSets: Array.from(bestSetKeys)
    });
}

/**
 * Récupère les personnages hors-vitrine qui ont le setKey spécifié dans leurs BestSets.
 * @param {string} setKey 
 * @param {Array} vitrineCharacters 
 * @returns {Array}
 */
export function getNonVitrineCharactersForSet(setKey, vitrineCharacters = []) {
    if (!setKey) return [];
    const cleanKey = setKey.split(':')[0];
    const vitrineNames = new Set((vitrineCharacters || []).map(p => (p.nom || '').toLowerCase()));

    return ALL_GAME_CHARACTERS.filter(c => {
        if (vitrineNames.has(c.nom.toLowerCase())) return false;
        return c.bestSets.includes(cleanKey);
    });
}
