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
    "NOM_DU_PERSO": {
        weights: {
            "critRate_": 0, "critDMG_": 0,
            "atk_": 0, "atk": 0,
            "hp_": 0, "hp": 0,
            "def_": 0, "def": 0,
            "eleMas": 0, "enerRech_": 0,
            "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0, "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0, "dendro_dmg_": 0, "physical_dmg_": 0,
            "heal_": 0
        },
        bestSets: [],
        goodSets: [],
        talents: { auto: 1, skill: 1, burst: 1 },
        color : "#888888",
        portraitOffset: 0
    },
    "Amber": {
        weights: {
            "critRate_": 1, "critDMG_": 1,
            "atk_": 0.75, "atk": 0.075,
            "hp_": 0, "hp": 0,
            "def_": 0, "def": 0,
            "eleMas": 0.5, "enerRech_": 1,
            "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0, "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0, "dendro_dmg_": 0, "physical_dmg_": 0,
            "heal_": 0
        },
        bestSets: ["NoblesseOblige:4", "ShimenawasReminiscence:4", "WanderersTroupe:4", "EmblemOfSeveredFate:4", "CrimsonWitchOfFlames:4"],
        goodSets: ["NoblesseOblige:2", "EmblemOfSeveredFate:2", "CrimsonWitchOfFlames:2", "GladiatorsFinale:2"],
        talents: { auto: 1, skill: 1, burst: 1 },
        color : "#888888",
        portraitOffset: 0
    },
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
    "Berserker": {
        4: [
            {
                label: "Si les PV sont inférieurs à 70% (24% Taux CRIT)",
                stats: { "critRate_": 0.24 }
            }
        ]
    },
    "Instructor": {
        4: [
            {
                label: "Si une réaction élémentaire est déclenchée (120 Maîtrise élémentaire)",
                stats: { "eleMas": 120 }
            }
        ]
    },
    "BlizzardStrayer": {
        4: [
            {
                label: "Si l'ennemi est affecté par Cryo (20% Taux CRIT)",
                stats: { "critRate_": 0.20 }
            },
            {
                label: "Si l'ennemi est gelé (20% Taux CRIT)",
                stats: { "critRate_": 0.20 }
            }
        ]
    },
    "CrimsonWitchOfFlames": {
        4: [
            {
                label: "Si une 1ère compétence élémentaire est utilisée (7.5% Bonus de DGT Pyro)",
                stats: { "pyro_dmg_": 0.075 }
            },
            {
                label: "Si une 2ème compétence élémentaire est utilisée (7.5% Bonus de DGT Pyro)",
                stats: { "pyro_dmg_": 0.075 }
            },
            {
                label: "Si une 3ème compétence élémentaire est utilisée (7.5% Bonus de DGT Pyro)",
                stats: { "pyro_dmg_": 0.075 }
            }
        ]
    },
    "NoblesseOblige": {
        4: [
            {
                label: "Si un déchaînement élémentaire est utilisé (20% ATK)",
                stats: { "atk_": 0.20 }
            }
        ]
    },
    "ArchaicPetra": {
        4: [
            { label: "Cristal Pyro ramassé (+35% Bonus de Dgt Pyro)", stats: { "pyro_dmg_": 0.35 } },
            { label: "Cristal Hydro ramassé (+35% Bonus de Dgt Hydro)", stats: { "hydro_dmg_": 0.35 } },
            { label: "Cristal Cryo ramassé (+35% Bonus de Dgt Cryo)", stats: { "cryo_dmg_": 0.35 } },
            { label: "Cristal Électro ramassé (+35% Bonus de Dgt Électro)", stats: { "electro_dmg_": 0.35 } }
        ]
    },
    "TenacityOfTheMillelith": {
        4: [
            {
                label: "Si une compétence élémentaire touche un ennemi (20% ATK)",
                stats: { "atk_": 0.20 }
            }
        ]
    },
    "PaleFlame": {
        4: [
            {
                label: "Si une 1ère compétence élémentaire touche un ennemi (9% ATK)",
                stats: { "atk_": 0.09 }
            },
            {
                label: "Si une 2ème compétence élémentaire touche un ennemi (9% ATK et 25% Bonus de DGT Physique)",
                stats: { "atk_": 0.09, "physical_dmg_": 0.25 }
            }
        ]
    },
    "HuskOfOpulentDreams": {
        4: [
            {
                label: "Quand une 1ère attaque Géo touche ou qu'1s est passée non-déployé (6% DÉF et 6% Bonus de DGT Géo)",
                stats: { "def_": 0.06, "geo_dmg_": 0.06 }
            },
            {
                label: "Quand une 2ème attaque Géo touche ou qu'1s de plus est passée non-déployé (6% DÉF et 6% Bonus de DGT Géo)",
                stats: { "def_": 0.06, "geo_dmg_": 0.06 }
            },
            {
                label: "Quand une 3ème attaque Géo touche ou qu'1s de plus est passée non-déployé (6% DÉF et 6% Bonus de DGT Géo)",
                stats: { "def_": 0.06, "geo_dmg_": 0.06 }
            },
            {
                label: "Quand une 4ème attaque Géo touche ou qu'1s de plus est passée non-déployé (6% DÉF et 6% Bonus de DGT Géo)",
                stats: { "def_": 0.06, "geo_dmg_": 0.06 }
            }
        ]
    },
    "VermillionHereafter": {
        4: [
            {
                label: "Si un déchaînement élémentaire est utilisé (8% ATQ)",
                stats: { "atk_": 0.08 }
            },
            {
                label: "Si des PV sont perdus une 1ère fois (10% ATQ)",
                stats: { "atk_": 0.10 }
            },
            {
                label: "Si des PV sont perdus une 2ème fois (10% ATQ)",
                stats: { "atk_": 0.10 }
            },
            {
                label: "Si des PV sont perdus une 3ème fois (10% ATQ)",
                stats: { "atk_": 0.10 }
            },
            {
                label: "Si des PV sont perdus une 4ème fois (10% ATQ)",
                stats: { "atk_": 0.10 }
            }
        ]
    },
    "GildedDreams": {
        4: [
            { label: "Si un 1er allié est du même élément (14% ATQ)", stats: { "atk_": 0.14 } },
            { label: "Si un 2ème allié est du même élément (14% ATQ)", stats: { "atk_": 0.14 } },
            { label: "Si un 3ème allié est du même élément (14% ATQ)", stats: { "atk_": 0.14 } },

            { label: "Si un 1er allié est d'un élément différent (50 EM)", stats: { "eleMas": 50 } },
            { label: "Si un 2ème allié est d'un élément différent (50 EM)", stats: { "eleMas": 50 } },
            { label: "Si un 3ème allié est d'un élément différent (50 EM)", stats: { "eleMas": 50 } },
        ]
    },
    "NymphsDream": {
        4: [
            {
                label: "Si une 1ère attaque de tout type touche (7% ATQ et 4% Bonus de DGT Hydro)",
                stats: { "atk_": 0.07, "hydro_dmg_": 0.04 }
            },
            {
                label: "Si une 2ème attaque de tout type touche (9% ATQ et 5% Bonus de DGT Hydro)",
                stats: { "atk_": 0.09, "hydro_dmg_": 0.05 }
            },
            {
                label: "Si une 3ème attaque de tout type touche (9% ATQ et 6% Bonus de DGT Hydro)",
                stats: { "atk_": 0.09, "hydro_dmg_": 0.06 }
            }
        ]
    },
    "MarechausseeHunter": {
        4: [
            {
                label: "Si les PV diminuent une 1ère fois (12% Taux CRIT)",
                stats: { "critRate_": 0.12 }
            },
            {
                label: "Si les PV diminuent une 2ème fois (12% Taux CRIT)",
                stats: { "critRate_": 0.12 }
            },
            {
                label: "Si les PV diminuent une 3ème fois (12% Taux CRIT)",
                stats: { "critRate_": 0.12 }
            }
        ]
    },
    "NighttimeWhispersInTheEchoingWoods": {
        4: [
            {
                label: "Si une compétence élémentaire est utilisée (20% Bonus de DGT Géo)",
                stats: { "geo_dmg_": 0.20 }
            },
            {
                label: "Si le personnage est sous un bouclier de Cristallisation (30% Bonus de DGT Géo)",
                stats: { "geo_dmg_": 0.30 }
            }
        ]
    },
    "ScrollOfTheHeroOfCinderCity": {
        4: [
            {
                label: "Si une réaction élémentaire est déclenchée (12% Bonus de DGT Élémentaire)",
                stats: {
                    "pyro_dmg_": 0.12, "hydro_dmg_": 0.12, "cryo_dmg_": 0.12,
                    "electro_dmg_": 0.12, "dendro_dmg_": 0.12, "anemo_dmg_": 0.12, "geo_dmg_": 0.12
                }
            },
            {
                label: "Si le personnage est sous une Bénédiction noctâme (28% Bonus Dgt Élémentaire)",
                stats: {
                    "pyro_dmg_": 0.28, "hydro_dmg_": 0.28, "cryo_dmg_": 0.28,
                    "electro_dmg_": 0.28, "dendro_dmg_": 0.28, "anemo_dmg_": 0.28, "geo_dmg_": 0.28
                }
            }
        ]
    },
    "ObsidianCodex": {
        4: [
            {
                label: "Si le personnage consomme des points Noctâme (40% Taux CRIT)",
                stats: { "critRate_": 0.40 }
            }
        ]
    },
    "NightOfTheSkysUnveiling": {
        4: [
            {
                label: "Si une réaction Sélène est déclenchée et que l'équipe est sous le signe Lueur Naissante (15% Taux CRIT)",
                stats: { "critRate_": 0.15 }
            },
            {
                label: "Si une réaction Sélène est déclenchée et que l'équipe est sous le signe Lueur Ascendante (30% Taux CRIT)",
                stats: { "critRate_": 0.30 }
            }
        ]
    },
};

// --- EXPORT GLOBAL ---
window.DEFAULT_CONFIG = DEFAULT_CONFIG;
window.CHARACTER_CONFIG = CHARACTER_CONFIG;
window.WEAPON_PASSIVES = WEAPON_PASSIVES;
window.SET_PASSIVES = SET_PASSIVES;