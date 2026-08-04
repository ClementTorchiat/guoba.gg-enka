// scripts/test_embed.js
import { generateEmbedMeta } from '../src/scripts/embedHelper.js';

// Simulation de données Enka
const mockEnkaData = {
    playerInfo: {
        nickname: "Clem",
        uid: "704449686"
    },
    avatarInfoList: [
        {
            avatarId: 10000089,
            _name: "Skirk",
            propMap: {
                "4001": { val: "90" }
            },
            talentIdList: [1, 2],
            fightPropMap: {
                2000: 18500,
                2001: 2180,
                2002: 850,
                20: 0.784,
                22: 2.242,
                23: 1.352,
                28: 80
            },
            equipList: [
                {
                    _name: "Reflet de tranche-brume",
                    flat: { itemType: "ITEM_WEAPON", nameTextMapHash: "115001" },
                    weapon: { level: 90, affixMap: { "115001": 0 } }
                },
                {
                    _setName: "Écho d'une offrande",
                    flat: { itemType: "ITEM_RELIQUARY" },
                    reliquary: { level: 21 }
                },
                {
                    _setName: "Écho d'une offrande",
                    flat: { itemType: "ITEM_RELIQUARY" },
                    reliquary: { level: 21 }
                },
                {
                    _setName: "Écho d'une offrande",
                    flat: { itemType: "ITEM_RELIQUARY" },
                    reliquary: { level: 21 }
                },
                {
                    _setName: "Écho d'une offrande",
                    flat: { itemType: "ITEM_RELIQUARY" },
                    reliquary: { level: 21 }
                }
            ]
        }
    ]
};

const extraConfigs = {
    charIdToName: { 10000089: "Skirk" },
    characterConfigs: {
        "Skirk": {
            builds: {
                "DPS Gel": {
                    name: { fr: "DPS Gel", en: "Freeze DPS" }
                }
            }
        }
    }
};

console.log("=== TEST FRANÇAIS ===");
const metaFr = generateEmbedMeta(mockEnkaData, "Skirk", "fr", extraConfigs);
console.log("Titre :\n", metaFr.title);
console.log("\nDescription :\n", metaFr.description);
console.log("\nImage :\n", metaFr.image);

console.log("\n=== TEST ANGLAIS ===");
const metaEn = generateEmbedMeta(mockEnkaData, "Skirk", "en", extraConfigs);
console.log("Title :\n", metaEn.title);
console.log("\nDescription :\n", metaEn.description);
console.log("\nImage :\n", metaEn.image);
