import SET_NAME_MAPPING from '../data/set_name_mapping.json';

const PROP_MAP: Record<string, string> = {
    "FIGHT_PROP_HP": "hp",
    "FIGHT_PROP_HP_PERCENT": "hp_",
    "FIGHT_PROP_ATTACK": "atk",
    "FIGHT_PROP_ATTACK_PERCENT": "atk_",
    "FIGHT_PROP_DEFENSE": "def",
    "FIGHT_PROP_DEFENSE_PERCENT": "def_",
    "FIGHT_PROP_CRITICAL": "critRate_",
    "FIGHT_PROP_CRITICAL_HURT": "critDMG_",
    "FIGHT_PROP_CHARGE_EFFICIENCY": "enerRech_",
    "FIGHT_PROP_ELEMENT_MASTERY": "eleMas",
    "FIGHT_PROP_HEAL_ADD": "heal_",
    "FIGHT_PROP_PHYSICAL_ADD_HURT": "physical_dmg_",
    "FIGHT_PROP_FIRE_ADD_HURT": "pyro_dmg_",
    "FIGHT_PROP_ELEC_ADD_HURT": "electro_dmg_",
    "FIGHT_PROP_WATER_ADD_HURT": "hydro_dmg_",
    "FIGHT_PROP_WIND_ADD_HURT": "anemo_dmg_",
    "FIGHT_PROP_ICE_ADD_HURT": "cryo_dmg_",
    "FIGHT_PROP_ROCK_ADD_HURT": "geo_dmg_",
    "FIGHT_PROP_GRASS_ADD_HURT": "dendro_dmg_"
};

let cachedAvatars: any = null;
let HASH_TO_KEY: Record<string, string> = {};
let ICON_TO_NAME_HASH: Record<string, string> = {};

async function getEnkaAvatars() {
    if (!cachedAvatars) {
        const res = await fetch('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/gi/avatars.json');
        cachedAvatars = await res.json();
    }
    return cachedAvatars;
}

async function getIconToNameHash() {
    if (Object.keys(ICON_TO_NAME_HASH).length === 0) {
        const res = await fetch('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/gi/relics.json');
        const relics = await res.json();
        if (relics && relics.Items && relics.Sets) {
            Object.values(relics.Items).forEach((item: any) => {
                if (item.Icon && item.SetId && relics.Sets[item.SetId]) {
                    const iconName = item.Icon.split('/').pop().replace('.png', '');
                    const nameHash = relics.Sets[item.SetId].Name;
                    if (iconName && nameHash) {
                        ICON_TO_NAME_HASH[iconName] = String(nameHash);
                    }
                }
            });
        }
    }
    return ICON_TO_NAME_HASH;
}

async function getHashToKey() {
    if (Object.keys(HASH_TO_KEY).length === 0) {
        const res = await fetch('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/gi/locs.json');
        const loc = await res.json();
        const frLoc = loc["fr"] || {};
        for (const [hash, nom] of Object.entries(frLoc)) {
            if ((SET_NAME_MAPPING as any)[nom as string]) {
                HASH_TO_KEY[hash] = (SET_NAME_MAPPING as any)[nom as string];
            }
        }
    }
    return HASH_TO_KEY;
}

/**
 * Transforme le JSON brut d'Enka en un tableau d'objets persos prêts pour scoring.js
 */
export async function parseEnkaData(enkaRawData: any) {
    if (!enkaRawData || !enkaRawData.avatarInfoList) {
        return [];
    }

    const avatarsDb = await getEnkaAvatars();
    const hashToKeyDb = await getHashToKey();
    const iconToNameHashDb = await getIconToNameHash();

    const persos = enkaRawData.avatarInfoList.map((avatar: any) => {
        // Enka stocke le taux critique total du perso à l'index "20"
        const totalCritRate = (avatar.fightPropMap && avatar.fightPropMap["20"]) 
            ? avatar.fightPropMap["20"] * 100 
            : 5.0;

        // Trouver le nom propre du personnage
        const avatarId = String(avatar.avatarId);
        const avatarInfo = avatarsDb[avatarId] || {};
        const iconNameRaw = avatarInfo.SideIconName || avatarInfo.iconName || avatarInfo.IconName || "";
        const clean = iconNameRaw.replace(/\.png$/i, "");
        let nom = clean.split('_').pop() || "Unknown";

        const artefacts: any[] = [];

        
        // On récupère uniquement les artéfacts dans l'equipList
        const equips = avatar.equipList || [];
        equips.forEach((equip: any) => {
            if (equip.flat && equip.flat.itemType === "ITEM_RELIQUARY") {
                const flat = equip.flat;
                
                // Set Key (Hash du set -> Clé locale de Guoba)
                let targetHash = flat.setNameTextMapHash || "";
                
                if (flat.icon) {
                    const iconClean = flat.icon.replace('.png', '');
                    if (iconToNameHashDb[iconClean]) {
                        targetHash = iconToNameHashDb[iconClean];
                    }
                }

                const setKey = hashToKeyDb[String(targetHash)] || "UnknownSet";
                
                // Rareté
                const stars = flat.rankLevel || 5;

                // Main stat
                const mainProp = flat.reliquaryMainstat;
                const mainStatKey = PROP_MAP[mainProp.mainPropId] || mainProp.mainPropId;
                
                // Substats
                const subStats: any[] = [];
                if (flat.reliquarySubstats) {
                    flat.reliquarySubstats.forEach((sub: any) => {
                        subStats.push({
                            key: PROP_MAP[sub.appendPropId] || sub.appendPropId,
                            value: sub.statValue
                        });
                    });
                }

                artefacts.push({
                    type: flat.equipType, // "EQUIP_SHOES", "EQUIP_RING", etc.
                    stars: stars,
                    setKey: String(setKey),
                    mainStat: { key: mainStatKey, value: mainProp.statValue },
                    subStats: subStats
                });
            }
        });

        // Objet final formaté pour `calculateCharacterScore`
        return {
            id: avatarId,
            name: nom,
            isSimulation: false,
            buffedStats: {
                cr: totalCritRate // Nécessaire pour la pénalité d'overcap CR de scoring.js
            },
            artefacts: artefacts
        };
    });

    return persos;
}
