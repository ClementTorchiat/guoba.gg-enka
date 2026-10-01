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

export async function getEnkaAvatars() {
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

let LOC_FR: Record<string, string> = {};

async function getLocFr() {
    if (Object.keys(LOC_FR).length === 0) {
        const res = await fetch('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/gi/locs.json');
        const loc = await res.json();
        LOC_FR = loc["fr"] || {};
    }
    return LOC_FR;
}

async function getHashToKey() {
    if (Object.keys(HASH_TO_KEY).length === 0) {
        const frLoc = await getLocFr();
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
    const locFrDb = await getLocFr();

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
        let equippedWeapon: any = null;
        
        // On récupère les artéfacts et l'arme dans l'equipList
        const equips = avatar.equipList || [];
        equips.forEach((equip: any) => {
            if (equip.flat && equip.flat.itemType === "ITEM_RELIQUARY") {
                const flat = equip.flat;
                
                // Set Key (Hash du set -> Clé locale de Guoba)
                let targetHash = flat.setNameTextMapHash || "";
                let iconClean = "";
                
                if (flat.icon) {
                    iconClean = flat.icon.replace('.png', '');
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
                    icon: iconClean,
                    mainStat: { key: mainStatKey, value: mainProp.statValue },
                    subStats: subStats
                });
            } else if (equip.flat && equip.flat.itemType === "ITEM_WEAPON") {
                const flat = equip.flat;
                const weaponData = equip.weapon || {};
                let refinement = 1;
                if (weaponData.affixMap) {
                    const keys = Object.keys(weaponData.affixMap);
                    if (keys.length > 0) {
                        refinement = weaponData.affixMap[keys[0]] + 1;
                    }
                }
                
                equippedWeapon = {
                    nameText: locFrDb[String(flat.nameTextMapHash)] || String(flat.nameTextMapHash || ""),
                    icon: flat.icon ? flat.icon.replace('.png', '') : "",
                    level: weaponData.level || 1,
                    refinement: refinement
                };
            }
        });

        // Extraction des stats globales du perso pour l'affichage (depuis Enka)
        const totalCritDMG = (avatar.fightPropMap && avatar.fightPropMap["22"]) ? avatar.fightPropMap["22"] : 0.5;
        const totalER = (avatar.fightPropMap && avatar.fightPropMap["23"]) ? avatar.fightPropMap["23"] : 1.0;
        
        const maxHp = (avatar.fightPropMap && avatar.fightPropMap["2000"]) ? avatar.fightPropMap["2000"] : 0;
        const curAttack = (avatar.fightPropMap && avatar.fightPropMap["2001"]) ? avatar.fightPropMap["2001"] : 0;
        const curDefense = (avatar.fightPropMap && avatar.fightPropMap["2002"]) ? avatar.fightPropMap["2002"] : 0;
        const eleMas = (avatar.fightPropMap && avatar.fightPropMap["28"]) ? avatar.fightPropMap["28"] : 0;

        const dmgKeys = ["30", "40", "41", "42", "43", "44", "45", "46"];
        let maxDmgBonus = 0;
        if (avatar.fightPropMap) {
            for (const key of dmgKeys) {
                if (avatar.fightPropMap[key] > maxDmgBonus) {
                    maxDmgBonus = avatar.fightPropMap[key];
                }
            }
        }
        const charLevel = (avatar.propMap && avatar.propMap["4001"] && avatar.propMap["4001"].val) ? avatar.propMap["4001"].val : 90;

        // Extraction de l'arme et de l'élément depuis avatarsDb
        const weaponTypeRaw = avatarInfo.WeaponType || "WEAPON_SWORD_ONE_HAND";
        const elementRaw = avatarInfo.Element || "None";
        const cons = avatar.talentIdList ? avatar.talentIdList.length : 0;

        // Objet final formaté pour `calculateCharacterScore`
        return {
            id: avatarId,
            name: nom,
            level: charLevel,
            element: elementRaw,
            weaponType: weaponTypeRaw, // Keep the old property as weaponType
            weapon: equippedWeapon, // The newly parsed weapon details
            cons: cons,
            isSimulation: false,
            buffedStats: {
                cr: totalCritRate // Nécessaire pour la pénalité d'overcap CR de scoring.js
            },
            stats: {
                maxHp,
                curAttack,
                curDefense,
                eleMas,
                dmgBonus: maxDmgBonus,
                critRate: totalCritRate / 100, // On le garde au format 0.X
                critDMG: totalCritDMG,
                enerRech: totalER
            },
            artefacts: artefacts
        };
    });

    return persos;
}
