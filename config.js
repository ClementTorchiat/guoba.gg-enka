/* =========================================
   CONFIGURATION (Cerveau du Projet)
   ========================================= */

const DEFAULT_CONFIG = {
    weights: { "critRate_": 1, "critDMG_": 1, "atk_": 0.5, "enerRech_": 0.5 },
    bestSets: [],
    goodSets: [],
    bestWeapons: [],
    goodWeapons: []
};

const CHARACTER_CONFIG = {
    "Mavuika": {
        weights: {
            "critRate_": 1, "critDMG_": 1,
            "atk_": 0.75, "atk": 0.075,
            "hp_": 0, "hp": 0,
            "def_": 0, "def": 0,
            "eleMas": 1, "enerRech_": 0,
            "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0, "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0, "dendro_dmg_": 0, "physical_dmg_": 0,
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
            "critRate_": 1, "critDMG_": 1,
            "atk_": 0.75, "atk": 0.075,
            "hp_": 0, "hp": 0,
            "def_": 0, "def": 0,
            "eleMas": 0.75, "enerRech_": 0.3,
            "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0, "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0, "dendro_dmg_": 0, "physical_dmg_": 0,
            "heal_": 0
        },
        bestSets: ["FragmentOfHarmonicWhimsy:4", "GladiatorsFinale:4"],
        goodSets: ["EchoesOfAnOffering:4", "CrimsonWitchOfFlames:2", "GladiatorsFinale:2"]
    },
};

/* =========================================
   PASSIFS (Armes & Sets) - Ajout Manuel
   ========================================= */

const WEAPON_PASSIVES = {
    "Bâton de Homa": {
        "hp_": 0.20,
        "atk_bonus_scaling": { "source": "hp", "percent": 0.008 }
    },
    "Clé de Khaj-Nisut": {
        "hp_": 0.20,
        "eleMas_bonus_scaling": { "source": "hp", "percent": 0.0012 }
    },
    "Mille soleils brûlants": { "atk_": 0.49, "critDMG_": 0.35 },
    "Lumière du faucheur": { "enerRech_": 0.30, "electro_dmg_": 0.12 },
    "Coupeur de jade primordial": {
        "hp_": 0.20,
        "atk_bonus_scaling": { "source": "hp", "percent": 0.012 }
    }
};

const SET_PASSIVES = {
    "MarechausseeHunter": { 4: { "critRate_": 0.36 } },
    "CrimsonWitchOfFlames": { 4: { "pyro_dmg_": 0.15 } },
    "BlizzardStrayer": { 4: { "critRate_": 0.40 } },
    "ObsidianCodex": { 4: { "critRate_": 0.40 } },
    "EmblemOfSeveredFate": {
        // Simulation ER -> Burst DMG (Max 75%)
        4: { "elemental_dmg_scaling": { "source": "er", "percent": 0.25, "max": 75 } }
    }
};

// --- EXPORT GLOBAL (CRUCIAL POUR EVITER LES ERREURS) ---
window.DEFAULT_CONFIG = DEFAULT_CONFIG;
window.CHARACTER_CONFIG = CHARACTER_CONFIG;
window.WEAPON_PASSIVES = WEAPON_PASSIVES;
window.SET_PASSIVES = SET_PASSIVES;