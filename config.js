/* =========================================
   CONFIGURATION (Cerveau du Projet 1)
   ========================================= */

const DEFAULT_CONFIG = {
    weights: { "critRate_": 1, "critDMG_": 1, "atk_": 0.5, "enerRech_": 0.5 },
    bestSets: [],
    goodSets: []
};

const CHARACTER_CONFIG = {
    "Mavuika": {
        weights: {
            "critRate_": 1,
            "critDMG_": 1,

            "atk_": 0.75,
            "atk": 0.075,

            "hp_": 0,
            "hp": 0,

            "def_": 0,
            "def": 0,

            "eleMas": 1,
            "enerRech_": 0,

            "pyro_dmg_": 1,
            "hydro_dmg_": 0,
            "cryo_dmg_": 0,
            "geo_dmg_": 0,
            "anemo_dmg_": 0,
            "electro_dmg_": 0,
            "dendro_dmg_": 0,
            "physical_dmg_": 0,

            "heal_": 0
        },
        bestSets: ["ObsidianCodex:4", "CrimsonWitchOfFlames:4"],
        goodSets: ["ObsidianCodex:2", "CrimsonWitchOfFlames:2", "GildedDreams:4"]
    },
    "Neuvillette": {
        weights: { "critRate_": 1, "critDMG_": 1, "hp_": 1, "hp": 0.1, "atk_": 0, "enerRech_": 0.5, "elemental_dmg_": 1 },
        bestSets: ["MarechausseeHunter:4"],
        goodSets: ["MarechausseeHunter:2", "HeartOfDepth:2"]
    },
    "Raiden Shogun": {
        weights: { "critRate_": 1, "critDMG_": 1, "atk_": 0.75, "atk": 0.075, "enerRech_": 1, "elemental_dmg_": 1 },
        bestSets: ["EmblemOfSeveredFate:4"],
        goodSets: ["EmblemOfSeveredFate:2", "NoblesseOblige:2"]
    },
    "HuTao": {
        weights: { "critRate_": 1, "critDMG_": 1, "hp_": 0.8, "hp": 0.08, "eleMas": 1, "atk_": 0.2, "elemental_dmg_": 1 },
        bestSets: ["CrimsonWitchOfFlames:4", "ShimenawasReminiscence:4"],
        goodSets: ["CrimsonWitchOfFlames:2", "GildedDreams:2"]
    },
    "Furina": {
        weights: { "critRate_": 1, "critDMG_": 1, "hp_": 1, "hp": 0.1, "enerRech_": 0.8, "elemental_dmg_": 1 },
        bestSets: ["GoldenTroupe:4"],
        goodSets: ["GoldenTroupe:2", "TenacityOfTheMillelith:2"]
    },
    "Arlecchino": {
        weights: {
            "critRate_": 1,
            "critDMG_": 1,

            "atk_": 0.75,
            "atk": 0.075,

            "hp_": 0,
            "hp": 0,

            "def_": 0,
            "def": 0,

            "eleMas": 0.75,
            "enerRech_": 0.3,

            "pyro_dmg_": 1,
            "hydro_dmg_": 0,
            "cryo_dmg_": 0,
            "geo_dmg_": 0,
            "anemo_dmg_": 0,
            "electro_dmg_": 0,
            "dendro_dmg_": 0,
            "physical_dmg_": 0,

            "heal_": 0
        },
        bestSets: ["FragmentOfHarmonicWhimsy:4", "GladiatorsFinale:4"],
        goodSets: ["EchoesOfAnOffering:4", "CrimsonWitchOfFlames:2", "GladiatorsFinale:2"]
    },
};