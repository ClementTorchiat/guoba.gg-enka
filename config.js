/* =========================================
   CONFIGURATION (Cerveau du Projet)
   ========================================= */

const DEFAULT_CONFIG = {
    weights: { "critRate_": 1, "critDMG_": 1, "atk_": 0.5, "enerRech_": 0.5 },
    bestSets: [],
    goodSets: [],
    talents: { auto: 1, skill: 6, burst: 6 }
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
        goodSets: ["ObsidianCodex:2", "CrimsonWitchOfFlames:2", "GildedDreams:4"],
        talents: { auto: 1, skill: 10, burst: 10 },
        color : "#C74644",
        portraitOffset: -35
    },
    "Nilou": {
        weights: {
            "critRate_": 0.5, "critDMG_": 0.5,
            "atk_": 0, "atk": 0,
            "hp_": 1, "hp": 0.8,
            "def_": 0, "def": 0,
            "eleMas": 1, "enerRech_": 0.8,
            "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0, "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0, "dendro_dmg_": 0, "physical_dmg_": 0,
            "heal_": 0
        },
        bestSets: ["TenacityOfTheMillelith:2", "VourukashasGlow:2"],
        goodSets: ["FlowerOfParadiseLost:4", "GildedDreams:2", "WanderersTroupe:2", "NightOfTheSkysUnveiling:2"],
        talents: { auto: 1, skill: 8, burst: 8 },
        color : "#80B7E2"
    },
    "Skirk": {
        weights: {
            "critRate_": 1, "critDMG_": 1,
            "atk_": 1, "atk": 0.1,
            "hp_": 0, "hp": 0,
            "def_": 0, "def": 0,
            "eleMas": 0, "enerRech_": 0,
            "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 1, "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0, "dendro_dmg_": 0, "physical_dmg_": 0,
            "heal_": 0
        },
        bestSets: ["FinaleOfTheDeepGalleries:4", "MarechausseeHunter:4"],
        goodSets: ["GladiatorsFinale:4", "BlizzardStrayer:4", "GladiatorsFinale:2", "BlizzardStrayer:2"],
        talents: { auto: 1, skill: 10, burst: 8 },
        color : "#0525F4",
        portraitOffset: -37
    },
    "Neuvillette": {
        weights: { "critRate_": 1, "critDMG_": 1, "hp_": 1, "hp": 0.1, "atk_": 0, "enerRech_": 0.5, "elemental_dmg_": 1 },
        bestSets: ["MarechausseeHunter:4"],
        goodSets: ["MarechausseeHunter:2", "HeartOfDepth:2"],
        talents: { auto: 10, skill: 8, burst: 8 }
    },
    "Raiden Shogun": {
        weights: { "critRate_": 1, "critDMG_": 1, "atk_": 0.75, "atk": 0.075, "enerRech_": 1, "elemental_dmg_": 1 },
        bestSets: ["EmblemOfSeveredFate:4"],
        goodSets: ["EmblemOfSeveredFate:2", "NoblesseOblige:2"],
        talents: { auto: 1, skill: 8, burst: 10 }
    },
    "HuTao": {
        weights: { "critRate_": 1, "critDMG_": 1, "hp_": 0.8, "hp": 0.08, "eleMas": 1, "atk_": 0.2, "elemental_dmg_": 1 },
        bestSets: ["CrimsonWitchOfFlames:4", "ShimenawasReminiscence:4"],
        goodSets: ["CrimsonWitchOfFlames:2", "GildedDreams:2"],
        talents: { auto: 10, skill: 10, burst: 8 }
    },
    "Furina": {
        weights: { "critRate_": 1, "critDMG_": 1, "hp_": 1, "hp": 0.1, "enerRech_": 0.8, "elemental_dmg_": 1 },
        bestSets: ["GoldenTroupe:4"],
        goodSets: ["GoldenTroupe:2", "TenacityOfTheMillelith:2"],
        talents: { auto: 1, skill: 10, burst: 10 }
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
        goodSets: ["EchoesOfAnOffering:4", "CrimsonWitchOfFlames:2", "GladiatorsFinale:2"],
        talents: { auto: 10, skill: 8, burst: 8 },
        color : "#AB3D2D",
        portraitOffset: -38
    },
};

/* =========================================
   PASSIFS (Armes & Sets) - Mode Avancé
   ========================================= */

const WEAPON_PASSIVES = {
    // Cas simple : Bâton d'Homa (On garde le format simple objet, le script gérera les deux)
    "Bâton de Homa": {
        "hp_": 0.20,
        "atk_bonus_scaling": { "source": "hp", "percent": 0.008 }
    },

    // CAS COMPLEXE (Ta demande) : Liste d'effets avec Labels
    "Mille soleils brûlants": [
        {
            label: "Attaque (Base)",
            stats: { "atk_": 0.28 }
        },
        {
            label: "DGT CRIT (Base)",
            stats: { "critDMG_": 0.20 }
        },
        {
            label: "Sous Bénédiction noctâme",
            stats: { "atk_": 0.21, "critDMG_": 0.15 } // Active 2 stats d'un coup !
        }
    ],

    "Lumière du faucheur": { "enerRech_": 0.30, "electro_dmg_": 0.12 }, // Format simple

    "Clé de Khaj-Nisut": {
        "hp_": 0.20,
        "eleMas_bonus_scaling": { "source": "hp", "percent": 0.0012 }
    },

    "Coupeur de jade primordial": {
        "hp_": 0.20,
        "atk_bonus_scaling": { "source": "hp", "percent": 0.012 }
    },

    "Éclazur": [
        {
            label: "Après compétence (ATQ)",
            stats: { "atk_": 0.24 }
        },
        {
            label: "0 Énergie (ATQ & DGT Critique)",
            stats: { "atk_": 0.24, "critDMG_": 0.40 }
        }
    ],
};

const SET_PASSIVES = {
    "MarechausseeHunter": {
        4: { "critRate_": 0.36 }
    },
    "CrimsonWitchOfFlames": {
        4: { "pyro_dmg_": 0.15 }
    },
    "BlizzardStrayer": {
        // Exemple de set avec condition
        4: [
            { label: "Ennemi Cryo", stats: { "critRate_": 0.20 } },
            { label: "Ennemi Gelé", stats: { "critRate_": 0.20 } }
        ]
    },
    "ObsidianCodex": {
        4: [
            { label: "Si points noctâme consommés", stats: { "critRate_": 0.40 } }
        ]
    },
    "EmblemOfSeveredFate": {
        4: { "elemental_dmg_scaling": { "source": "er", "percent": 0.25, "max": 75 } }
    }
};

// --- EXPORT GLOBAL ---
window.DEFAULT_CONFIG = DEFAULT_CONFIG;
window.CHARACTER_CONFIG = CHARACTER_CONFIG;
window.WEAPON_PASSIVES = WEAPON_PASSIVES;
window.SET_PASSIVES = SET_PASSIVES;