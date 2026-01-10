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
    // 3 étoiles
    "HarbingerOfDawn": {
        buffs: [
            {
                label: "Si les PV sont supérieurs à 90% (Taux CRIT)",
                stats: {
                    "critRate_": [0.14, 0.035],
                }
            },
        ]
    },
    "DarkIronSword": {
        buffs: [
            {
                label: "Si une réaction liée à l'élément Électro a lieu (ATQ%)",
                stats: {
                    "atk_": [0.2, 0.05],
                }
            }
        ]
    },
    "SkyriderSword": {
        buffs: [
            {
                label: "Si un déchaînement élémentaire est utilisé (ATQ%)",
                stats: {
                    "atk_": [0.12, 0.03],
                }
            }
        ]
    },
    "SkyriderGreatsword": {
        selectMode: "cumulative",
        buffs: [
            { label: "Si une 1ère attaque normale ou chargée touche un ennemi (ATQ%)", stats: { "atk_": [0.06, 0.01] } },
            { label: "Si une 2ème attaque normale ou chargée touche un ennemi (ATQ%)", stats: { "atk_": [0.06, 0.01] } },
            { label: "Si une 3ème attaque normale ou chargée touche un ennemi (ATQ%)", stats: { "atk_": [0.06, 0.01] } },
            { label: "Si une 4ème attaque normale ou chargée touche un ennemi (ATQ%)", stats: { "atk_": [0.06, 0.01] } }
        ]
    },
    "EmeraldOrb": {
        buffs: [
            {
                label: "Si une réaction liée à l'élément Hydro a lieu (ATQ%)",
                stats: {
                    "atk_": [0.2, 0.05],
                }
            }
        ]
    },
    "TwinNephrite": {
        buffs: [
            {
                label: "Si un ennemi a été vaincu (ATQ%)",
                stats: {
                    "atk_": [0.12, 0.02],
                }
            }
        ]
    },

    // 4 étoiles - épées à une main
    "RoyalLongsword": {
        selectMode: "cumulative",
        buffs: [
            { label: "Si des dégâts sont infligés une 1ère fois (Taux CRIT)", stats: { "critRate_": [0.08, 0.02] } },
            { label: "Si des dégâts sont infligés une 2ème fois (Taux CRIT)", stats: { "critRate_": [0.08, 0.02] } },
            { label: "Si des dégâts sont infligés une 3ème fois (Taux CRIT)", stats: { "critRate_": [0.08, 0.02] } },
            { label: "Si des dégâts sont infligés une 4ème fois (Taux CRIT)", stats: { "critRate_": [0.08, 0.02] } },
            { label: "Si des dégâts sont infligés une 5ème fois (Taux CRIT)", stats: { "critRate_": [0.08, 0.02] } }
        ]
    },
    "PrototypeRancour": {
        selectMode: "cumulative",
        buffs: [
            { label: "Si une attaque normale ou chargée touche un ennemi une 1ère fois (ATQ% et DÉF)", stats: { "atk_": [0.04, 0.01], "def_": [0.04, 0.01] } },
            { label: "Si une attaque normale ou chargée touche un ennemi une 2ème fois (ATQ% et DÉF)", stats: { "atk_": [0.04, 0.01], "def_": [0.04, 0.01] } },
            { label: "Si une attaque normale ou chargée touche un ennemi une 3ème fois (ATQ% et DÉF)", stats: { "atk_": [0.04, 0.01], "def_": [0.04, 0.01] } },
            { label: "Si une attaque normale ou chargée touche un ennemi une 4ème fois (ATQ% et DÉF)", stats: { "atk_": [0.04, 0.01], "def_": [0.04, 0.01] } },
            { label: "Si une attaque normale ou chargée touche un ennemi une 5ème fois (ATQ% et DÉF)", stats: { "atk_": [0.04, 0.01], "def_": [0.04, 0.01] } },
        ]
    },
    "BlackcliffLongsword": {
        selectMode: "cumulative",
        buffs: [
            { label: "Si un 1er ennemi a été vaincu (ATQ%)", stats: { "atk_": [0.12, 0.03] } },
            { label: "Si un 2ème ennemi a été vaincu (ATQ%)", stats: { "atk_": [0.12, 0.03] } },
            { label: "Si un 3ème ennemi a été vaincu (ATQ%)", stats: { "atk_": [0.12, 0.03] } },
        ]
    },
    "FesteringDesire": {
        buffs: [
            {
                label: "Amélioration de Taux CRIT sur la compétence seulement",
                stats: {
                    "critRate_": [0.06, 0.015],
                }
            }
        ]
    },
    "KagotsurubeIsshin": {
        buffs: [
            {
                label: "Si une attaque normale, chargée ou plongeante touche un ennemi (ATQ%)",
                stats: {
                    "atk_": [0.15, 0],
                }
            }
        ]
    },
    "SapwoodBlade": {
        buffs: [
            {
                label: "Si une réaction liée à l'élément Dendro est déclenchée (Maîtrise élémentaire)",
                stats: {
                    "eleMas": [0.60, 0.15],
                }
            }
        ]
    },
    "XiphosMoonlight": {
        buffs: [
            {
                label: "Bonus selon la Maîtrise élémentaire (Recharge d'énergie)",
                stats: {
                    "enerRech_bonus_scaling": {
                        source: "eleMas",
                        percent: [0.00036, 0.00009]
                    }
                }
            }
        ]
    },
    "WolfFang": {
        selectMode: "cumulative",
        buffs: [
            { label: "1 stack de Taux CRIT (ne s'applique qu'aux compétences et déchaînements)", stats: { "critRate_": [0.08, 0.02] } },
            { label: "2 stacks de Taux CRIT (ne s'applique qu'aux compétences et déchaînements)", stats: { "critRate_": [0.08, 0.02] } },
            { label: "3 stacks de Taux CRIT (ne s'applique qu'aux compétences et déchaînements)", stats: { "critRate_": [0.08, 0.02] } },
            { label: "4 stacks de Taux CRIT (ne s'applique qu'aux compétences et déchaînements)", stats: { "critRate_": [0.08, 0.02] } },
        ]
    },
    "FinaleOfTheDeep": {
        buffs: [
            {
                label: "Si une compétence élémentaire est utilisée (ATQ%)",
                stats: {
                    "atk_": [0.12, 0.03]
                }
            },
            {
                label: "Si l'Engagement Vital est dissipé (ATQ)",
                stats: {
                    "atk": [150, 37.5]
                }
            }
        ]
    },
    "FleuveCendreFerryman": {
        buffs: [
            {
                label: "Buff passif de Taux CRIT (ne concerne que la compétence élémentaire)",
                stats: {
                    "critRate_": [0.08, 0.02]
                }
            },
            {
                label: "Si une compétence élémentaire est utilisée (Recharge d'énergie)",
                stats: {
                    "enerRech_": [0.16, 0.04] // 16% -> 32%
                }
            }
        ]
    },
    "TheDockhandsAssistant": {
        selectMode: "cumulative",
        buffs: [
            { label: "Si des soins sont reçus ou envoyés une 1ère fois (Maîtrise élémentaire)", stats: { "eleMas": [0.40, 0.1] } },
            { label: "Si des soins sont reçus ou envoyés une 2ème fois (Maîtrise élémentaire)", stats: { "eleMas": [0.40, 0.1] } },
            { label: "Si des soins sont reçus ou envoyés une 3ème fois (Maîtrise élémentaire)", stats: { "eleMas": [0.40, 0.1] } },
        ]
    },
    "FluteOfEzpitzal": {
        buffs: [
            {
                label: "Si une compétence élémentaire est utilisée (DÉF)",
                stats: {
                    "def_": [0.16, 0.04]
                }
            },
        ]
    },
    "CalamityOfEshu": {
        buffs: [
            {
                label: "Buff de Taux CRIT si le personnage est protégé par un bouclier (ne concerne que les attaques normales et chargées)",
                stats: {
                    "critRate_": [0.08, 0.02]
                }
            },
        ]
    },
    "SerenitysCall": {
        selectMode: "exclusive",
        buffs: [
            {
                label: "Si une réaction élémentaire est déclenchée et que l'équipe est sous le signe Lueur Naissante (PV%)",
                stats: {
                    "hp_": [0.16, 0.04]
                }
            },
            {
                label: "Si une réaction élémentaire est déclenchée et que l'équipe est sous le signe Lueur Ascendante (PV%)",
                stats: {
                    "hp_": [0.32, 0.08]
                }
            }
        ]
    },

    // 4 étoiles - épées à deux mains
    "RoyalGreatsword": {
        selectMode: "cumulative",
        buffs: [
            { label: "Si des dégâts sont infligés une 1ère fois (Taux CRIT)", stats: { "critRate_": [0.08, 0.02] } },
            { label: "Si des dégâts sont infligés une 2ème fois (Taux CRIT)", stats: { "critRate_": [0.08, 0.02] } },
            { label: "Si des dégâts sont infligés une 3ème fois (Taux CRIT)", stats: { "critRate_": [0.08, 0.02] } },
            { label: "Si des dégâts sont infligés une 4ème fois (Taux CRIT)", stats: { "critRate_": [0.08, 0.02] } },
            { label: "Si des dégâts sont infligés une 5ème fois (Taux CRIT)", stats: { "critRate_": [0.08, 0.02] } }
        ]
    },
    "Whiteblind": {
        selectMode: "cumulative",
        buffs: [
            { label: "Si une attaque normale ou chargée touche un ennemi une 1ère fois (ATQ% et DÉF)", stats: { "atk_": [0.06, 0.015], "def_": [0.06, 0.015] } },
            { label: "Si une attaque normale ou chargée touche un ennemi une 2ème fois (ATQ% et DÉF)", stats: { "atk_": [0.06, 0.015], "def_": [0.06, 0.015] } },
            { label: "Si une attaque normale ou chargée touche un ennemi une 3ème fois (ATQ% et DÉF)", stats: { "atk_": [0.06, 0.015], "def_": [0.06, 0.015] } },
            { label: "Si une attaque normale ou chargée touche un ennemi une 4ème fois (ATQ% et DÉF)", stats: { "atk_": [0.06, 0.015], "def_": [0.06, 0.015] } },
        ]
    },
    "BlackcliffSlasher": {
        selectMode: "cumulative",
        buffs: [
            { label: "Si un 1er ennemi a été vaincu (ATQ%)", stats: { "atk_": [0.12, 0.03] } },
            { label: "Si un 2ème ennemi a été vaincu (ATQ%)", stats: { "atk_": [0.12, 0.03] } },
            { label: "Si un 3ème ennemi a été vaincu (ATQ%)", stats: { "atk_": [0.12, 0.03] } },
        ]
    },
    "LithicBlade": {
        selectMode: "exclusive",
        buffs: [
            {label: "Si 1 personnage de Liyue est dans l'équipe (ATK% et Taux CRIT)", stats: {"atk_": [0.07, 0.01], "critRate_": [0.03, 0.01]}},
            {label: "Si 2 personnages de Liyue sont dans l'équipe (ATK% et Taux CRIT)", stats: {"atk_": [0.14, 0.02], "critRate_": [0.06, 0.02]}},
            {label: "Si 3 personnages de Liyue sont dans l'équipe (ATK% et Taux CRIT)", stats: {"atk_": [0.21, 0.03], "critRate_": [0.09, 0.03]}},
            {label: "Si 4 personnages de Liyue sont dans l'équipe (ATK% et Taux CRIT)", stats: {"atk_": [0.28, 0.04], "critRate_": [0.12, 0.04]}}
        ]
    },
    "MakhairaAquamarine": {
        buffs: [
            {
                label: "Bonus selon la Maîtrise élémentaire (ATK%)",
                stats: {
                    "atk_bonus_scaling": {
                        "source": "eleMas",
                        "percent": [0.24, 0.06]
                    }
                }
            }
        ]
    },
    "ForestRegalia": {
        buffs: [
            {
                label: "Si une réaction liée à l'élément Dendro est déclenchée (Maîtrise élémentaire)",
                stats: {
                    "eleMas": [0.60, 0.15],
                }
            }
        ]
    },
    "MailedFlower": {
        buffs: [
            {
                label: "Si une compétence élémentaire touche un ennemi ou qu'une réaction élémentaire est déclenchée (ATK% et Maîtrise élémentaire)",
                stats: {
                    "atk_": [0.12, 0.03],
                    "eleMas": [48, 12]
                }
            }
        ]
    },
    "TalkingStick": {
        selectMode: "cumulative",
        buffs: [
            {
                label: "Si le porteur est affecté par l'élément Pyro (ATQ%)",
                stats: {
                    "atk_": [0.16, 0.04]
                }
            },
            {
                label: "Si le porteur est affecté par l'élément Hydro/Cryo/Électro/Dendro (DGTs Élémentaires)",
                stats: {
                    "pyro_dmg_": [0.12, 0.03],
                    "hydro_dmg_": [0.12, 0.03],
                    "cryo_dmg_": [0.12, 0.03],
                    "electro_dmg_": [0.12, 0.03],
                    "anemo_dmg_": [0.12, 0.03],
                    "geo_dmg_": [0.12, 0.03],
                    "dendro_dmg_": [0.12, 0.03]
                }
            }
        ]
    },
    "TidalShadow": {
        buffs: [
            {
                label: "Si le porteur reçoit des soins (ATK%)",
                stats: {
                    "atk_": [0.24, 0.06],
                }
            }
        ]
    },
    "PortablePowerSaw": {
        selectMode: "exclusive",
        buffs: [
            {
                label: "1 Symbole consommé (Maîtrise élémentaire)",
                stats: {
                    "eleMas": [40, 10]
                }
            },
            {
                label: "2 Symboles consommés (Maîtrise élémentaire)",
                stats: {
                    "eleMas": [80, 20]
                }
            },
            {
                label: "3 Symboles consommés (Maîtrise élémentaire)",
                stats: {
                    "eleMas": [120, 30]
                }
            }
        ]
    },
    "FruitfulHook": {
        buffs: [
            {
                label: "Bonus de Taux CRIT (Uniquement pour les attaques plongées)",
                stats: {
                    "critRate_": [0.16, 0.04],
                }
            }
        ]
    },
    "FlameForgedInsight": {
        buffs: [
            {
                label: "Si une réaction Sélène est déclenchée (Maîtrise élémentaire)",
                stats: {
                    "eleMas": [0.60, 0.15],
                }
            }
        ]
    },
    "MasterKey": {
        selectMode: "exclusive",
        buffs: [
            {
                label: "Si une réaction élémentaire est déclenchée et que l'équipe est sous le signe Lueur Naissante (Maîtrise élémentaire)",
                stats: {
                    "eleMas": [0.60, 0.15]
                }
            },
            {
                label: "Si une réaction élémentaire est déclenchée et que l'équipe est sous le signe Lueur Ascendante (Maîtrise élémentaire)",
                stats: {
                    "eleMas": [1.20, 0.30]
                }
            }
        ]
    },

    // 4 étoiles - arcs
    "RoyalBow": {
        selectMode: "cumulative",
        buffs: [
            { label: "Si des dégâts sont infligés une 1ère fois (Taux CRIT)", stats: { "critRate_": [0.08, 0.02] } },
            { label: "Si des dégâts sont infligés une 2ème fois (Taux CRIT)", stats: { "critRate_": [0.08, 0.02] } },
            { label: "Si des dégâts sont infligés une 3ème fois (Taux CRIT)", stats: { "critRate_": [0.08, 0.02] } },
            { label: "Si des dégâts sont infligés une 4ème fois (Taux CRIT)", stats: { "critRate_": [0.08, 0.02] } },
            { label: "Si des dégâts sont infligés une 5ème fois (Taux CRIT)", stats: { "critRate_": [0.08, 0.02] } }
        ]
    },
    "PrototypeCrescent": {
        buffs: [
            {
                label: "Si un point faible est touché en mode visée (ATK%)",
                stats: {
                    "atk_": [0.36, 0.09],
                }
            }
        ]
    },
    "CompoundBow": {
        selectMode: "cumulative",
        buffs: [
            { label: "1 cumul (ATK%)", stats: { "atk_": [0.04, 0.01] } },
            { label: "2 cumuls (ATK%)", stats: { "atk_": [0.04, 0.01] } },
            { label: "3 cumuls (ATK%)", stats: { "atk_": [0.04, 0.01] } },
            { label: "4 cumuls (ATK%)", stats: { "atk_": [0.04, 0.01] } },
        ]
    },
    "BlackcliffWarbow": {
        selectMode: "cumulative",
        buffs: [
            { label: "Si un 1er ennemi a été vaincu (ATQ%)", stats: { "atk_": [0.12, 0.03] } },
            { label: "Si un 2ème ennemi a été vaincu (ATQ%)", stats: { "atk_": [0.12, 0.03] } },
            { label: "Si un 3ème ennemi a été vaincu (ATQ%)", stats: { "atk_": [0.12, 0.03] } },
        ]
    },
    "WindblumeOde": {
        buffs: [
            {
                label: "Si une compétence élémentaire est utilisée (ATK%)",
                stats: {
                    "atk_": [0.16, 0.04],
                }
            }
        ]
    },
    "KingsSquire": {
        buffs: [
            {
                label: "Si une compétence élémentaire ou un déchaînement élémentaire est utilisé (Maîtrise élémentaire)",
                stats: {
                    "eleMas": [0.60, 0.20],
                }
            }
        ]
    },
    "IbisPiercer": {
        selectMode: "cumulative",
        buffs: [
            { label: "Si une 1ère attaque chargée touche un ennemi (Maîtrise élémentaire)", stats: { "eleMas": [0.40, 0.10] } },
            { label: "Si une 2ème attaque chargée touche un ennemi (Maîtrise élémentaire)", stats: { "eleMas": [0.40, 0.10] } },
        ]
    },
    "Cloudforged": {
        selectMode: "cumulative",
        buffs: [
            { label: "Si l'énergie du porteur diminue une 1ère fois (Maîtrise élémentaire)", stats: { "eleMas": [0.40, 0.10] } },
            { label: "Si l'énergie du porteur diminue une 2ème fois (Maîtrise élémentaire)", stats: { "eleMas": [0.40, 0.10] } },
        ]
    },
    "RangeGauge": {
        selectMode: "exclusive",
        buffs: [
            {
                label: "Si le personnage soigne ou reçoit de soins une 1ère fois (ATK% et DGTs Élémentaires)",
                stats: {
                    "atk_": [0.03, 0.01],
                    "pyro_dmg_": [0.07, 0.015],
                    "hydro_dmg_": [0.07, 0.015],
                    "cryo_dmg_": [0.07, 0.015],
                    "electro_dmg_": [0.07, 0.015],
                    "anemo_dmg_": [0.07, 0.015],
                    "geo_dmg_": [0.07, 0.015],
                    "dendro_dmg_": [0.07, 0.015]
                }
            },
            {
                label: "Si le personnage soigne ou reçoit de soins une 2ème fois (ATK% et DGTs Élémentaires)",
                stats: {
                    "atk_": [0.06, 0.02],
                    "pyro_dmg_": [0.14, 0.03],
                    "hydro_dmg_": [0.14, 0.03],
                    "cryo_dmg_": [0.14, 0.03],
                    "electro_dmg_": [0.14, 0.03],
                    "anemo_dmg_": [0.14, 0.03],
                    "geo_dmg_": [0.14, 0.03],
                    "dendro_dmg_": [0.14, 0.03]
                }
            },
            {
                label: "Si le personnage soigne ou reçoit de soins une 3ème fois (ATK% et DGTs Élémentaires)",
                stats: {
                    "atk_": [0.09, 0.03],
                    "pyro_dmg_": [0.21, 0.045],
                    "hydro_dmg_": [0.21, 0.045],
                    "cryo_dmg_": [0.21, 0.045],
                    "electro_dmg_": [0.21, 0.045],
                    "anemo_dmg_": [0.21, 0.045],
                    "geo_dmg_": [0.21, 0.045],
                    "dendro_dmg_": [0.21, 0.045]
                }
            }
        ]
    },
    "EarthShaker": {
        selectMode: "ChainBreaker",
        buffs: [
            {
                label: "Si l'équipe est composée d'1 personnage de Natlan ou d'un élément différent du porteur (ATK%)",
                stats: {
                    "atk_": [0.048, 0.012] // 1x
                }
            },
            {
                label: "Si l'équipe est composée de 2 personnages de Natlan ou d'un élément différent du porteur (ATK%)",
                stats: {
                    "atk_": [0.096, 0.024] // 2x
                }
            },
            {
                label: "Si l'équipe est composée de 3 personnages de Natlan ou d'un élément différent du porteur (ATK% et Maîtrise élémentaire)",
                stats: {
                    "atk_": [0.144, 0.036], // 3x
                    "eleMas": [24, 6]       // Se déclenche ici
                }
            },
            {
                label: "Si l'équipe est composée de 4 personnages de Natlan ou d'un élément différent du porteur (ATK% et Maîtrise élémentaire)",
                stats: {
                    "atk_": [0.192, 0.048], // 4x
                    "eleMas": [24, 6]       // Toujours le même bonus ME
                }
            }
        ]
    },
    "SnareHook": {
        selectMode: "exclusive",
        buffs: [
            {
                label: "Si une réaction élémentaire est déclenchée et que l'équipe est sous le signe Lueur Naissante (Maîtrise élémentaire)",
                stats: {
                    "eleMas": [0.60, 0.15]
                }
            },
            {
                label: "Si une réaction élémentaire est déclenchée et que l'équipe est sous le signe Lueur Ascendante (Maîtrise élémentaire)",
                stats: {
                    "eleMas": [1.20, 0.30]
                }
            }
        ]
    },
    "RainbowSerpentsRainBow": {
        buffs: [
            {
                label: "Si une attaque touche un ennemi et que le porteur est hors du terrain (ATK%)",
                stats: {
                    "atk_": [0.28, 0.07],
                }
            }
        ]
    },

    // 4 étoiles - armes d'hast
    "BlackcliffPole": {
        selectMode: "cumulative",
        buffs: [
            { label: "Si un 1er ennemi a été vaincu (ATQ%)", stats: { "atk_": [0.12, 0.03] } },
            { label: "Si un 2ème ennemi a été vaincu (ATQ%)", stats: { "atk_": [0.12, 0.03] } },
            { label: "Si un 3ème ennemi a été vaincu (ATQ%)", stats: { "atk_": [0.12, 0.03] } },
        ]
    },
    "Deathmatch": {
        selectMode: "exclusive",
        buffs: [
            {
                label: "S'il y a deux ennemis ou plus aux alentours (ATK% et DÉF%)",
                stats: {
                    "atk_": [0.16, 0.04], "def_": [0.16, 0.04]
                }
            },
            {
                label: "S'il y a plus de deux ennemis aux alentours (ATK%)",
                stats: {
                    "atk_": [0.24, 0.04]
                }
            }
        ]
    },
    "LithicSpear": {
        selectMode: "exclusive",
        buffs: [
            {label: "Si 1 personnage de Liyue est dans l'équipe (ATK% et Taux CRIT)", stats: {"atk_": [0.07, 0.01], "critRate_": [0.03, 0.01]}},
            {label: "Si 2 personnages de Liyue sont dans l'équipe (ATK% et Taux CRIT)", stats: {"atk_": [0.14, 0.02], "critRate_": [0.06, 0.02]}},
            {label: "Si 3 personnages de Liyue sont dans l'équipe (ATK% et Taux CRIT)", stats: {"atk_": [0.21, 0.03], "critRate_": [0.09, 0.03]}},
            {label: "Si 4 personnages de Liyue sont dans l'équipe (ATK% et Taux CRIT)", stats: {"atk_": [0.28, 0.04], "critRate_": [0.12, 0.04]}}
        ]
    },
    "RoyalSpear": {
        selectMode: "cumulative",
        buffs: [
            { label: "Si des dégâts sont infligés une 1ère fois (Taux CRIT)", stats: { "critRate_": [0.08, 0.02] } },
            { label: "Si des dégâts sont infligés une 2ème fois (Taux CRIT)", stats: { "critRate_": [0.08, 0.02] } },
            { label: "Si des dégâts sont infligés une 3ème fois (Taux CRIT)", stats: { "critRate_": [0.08, 0.02] } },
            { label: "Si des dégâts sont infligés une 4ème fois (Taux CRIT)", stats: { "critRate_": [0.08, 0.02] } },
            { label: "Si des dégâts sont infligés une 5ème fois (Taux CRIT)", stats: { "critRate_": [0.08, 0.02] } }
        ]
    },
    "TheCatch": {
        buffs: [
            {
                label: "Bonus de Taux CRIT (Uniquement pour le déchaînement élémentaire)",
                stats: {
                    "critRate_": [0.06, 0.015],
                }
            }
        ]
    },
    "Moonpiercer": {
        buffs: [
            {
                label: "Si une réaction en lien avec l'élément Dendro est déclenchée (ATK%)",
                stats: {
                    "atk_": [0.16, 0.04],
                }
            }
        ]
    },
    "MissiveWindspear": {
        buffs: [
            {
                label: "Si une réaction élémentaire est déclenchée (ATK% et Maîtrise élémentaire)",
                stats: {
                    "atk_": [0.12, 0.03], "eleMas": [0.48, 0.12]
                }
            }
        ]
    },
    "BalladOfTheFjords": {
        buffs: [
            {
                label: "Si l'équipe est composée de 3 éléments différents (Maîtrise élémentaire)",
                stats: {
                    "eleMas": [1.20, 0.30]
                }
            }
        ]
    },
    "ProspectorsDrill": {
        selectMode: "exclusive",
        buffs: [
            {
                label: "Si le personnage soigne ou reçoit de soins une 1ère fois (ATK% et DGTs Élémentaires)",
                stats: {
                    "atk_": [0.03, 0.01],
                    "pyro_dmg_": [0.07, 0.015],
                    "hydro_dmg_": [0.07, 0.015],
                    "cryo_dmg_": [0.07, 0.015],
                    "electro_dmg_": [0.07, 0.015],
                    "anemo_dmg_": [0.07, 0.015],
                    "geo_dmg_": [0.07, 0.015],
                    "dendro_dmg_": [0.07, 0.015]
                }
            },
            {
                label: "Si le personnage soigne ou reçoit de soins une 2ème fois (ATK% et DGTs Élémentaires)",
                stats: {
                    "atk_": [0.06, 0.02],
                    "pyro_dmg_": [0.14, 0.03],
                    "hydro_dmg_": [0.14, 0.03],
                    "cryo_dmg_": [0.14, 0.03],
                    "electro_dmg_": [0.14, 0.03],
                    "anemo_dmg_": [0.14, 0.03],
                    "geo_dmg_": [0.14, 0.03],
                    "dendro_dmg_": [0.14, 0.03]
                }
            },
            {
                label: "Si le personnage soigne ou reçoit de soins une 3ème fois (ATK% et DGTs Élémentaires)",
                stats: {
                    "atk_": [0.09, 0.03],
                    "pyro_dmg_": [0.21, 0.045],
                    "hydro_dmg_": [0.21, 0.045],
                    "cryo_dmg_": [0.21, 0.045],
                    "electro_dmg_": [0.21, 0.045],
                    "anemo_dmg_": [0.21, 0.045],
                    "geo_dmg_": [0.21, 0.045],
                    "dendro_dmg_": [0.21, 0.045]
                }
            }
        ]
    },
    "FootprintOfTheRainbow": {
        buffs: [
            {
                label: "Si une compétence élémentaire est utilisée (DÉF%)",
                stats: {
                    "def_": [0.16, 0.04]
                }
            }
        ]
    },
    "TamayurateiNoOhanashi": {
        buffs: [
            {
                label: "Si une compétence élémentaire est utilisée (ATK%)",
                stats: {
                    "atk_": [0.20, 0.05]
                }
            }
        ]
    },
    "SacrificersStaff": {
        selectMode: "cumulative",
        buffs: [
            { label: "Si une compétence élémentaire touche un ennemi une 1ère fois (ATK% et Recharge d'énergie)", stats: { "atk_": [0.08, 0.02], "enerRech_": [0.06, 0.015] } },
            { label: "Si une compétence élémentaire touche un ennemi une 2ème fois (ATK% et Recharge d'énergie)", stats: { "atk_": [0.08, 0.02], "enerRech_": [0.06, 0.015] } },
            { label: "Si une compétence élémentaire touche un ennemi une 3ème fois (ATK% et Recharge d'énergie)", stats: { "atk_": [0.08, 0.02], "enerRech_": [0.06, 0.015] } },
        ]
    },

    // 4 étoiles - catalyseur
    "TheWidsith": {
        selectMode: "exclusive",
        buffs: [
            {label: "Récital (ATK%)", stats: {"atk_": [0.60, 0.15]}},
            {
                label: "Aria (DGTs Élémentaires)",
                stats: {
                    "pyro_dmg_": [0.48, 0.12],
                    "hydro_dmg_": [0.48, 0.12],
                    "cryo_dmg_": [0.48, 0.12],
                    "electro_dmg_": [0.48, 0.12],
                    "anemo_dmg_": [0.48, 0.12],
                    "geo_dmg_": [0.48, 0.12],
                    "dendro_dmg_": [0.48, 0.12]
                },
            },
            {label: "Interlude (Maîtrise élémentaire)", stats: {"eleMas": [2.40, 0.60]}},
        ]
    },
    "RoyalGrimoire": {
        selectMode: "cumulative",
        buffs: [
            { label: "Si des dégâts sont infligés une 1ère fois (Taux CRIT)", stats: { "critRate_": [0.08, 0.02] } },
            { label: "Si des dégâts sont infligés une 2ème fois (Taux CRIT)", stats: { "critRate_": [0.08, 0.02] } },
            { label: "Si des dégâts sont infligés une 3ème fois (Taux CRIT)", stats: { "critRate_": [0.08, 0.02] } },
            { label: "Si des dégâts sont infligés une 4ème fois (Taux CRIT)", stats: { "critRate_": [0.08, 0.02] } },
            { label: "Si des dégâts sont infligés une 5ème fois (Taux CRIT)", stats: { "critRate_": [0.08, 0.02] } }
        ]
    },
    "MappaMare": {
        selectMode: "cumulative",
        buffs: [
            {
                label: "Si une 1ère réaction élémentaire est déclenchée (DGTs Élémentaires)",
                stats: {
                    "pyro_dmg_": [0.08, 0.02],
                    "hydro_dmg_": [0.08, 0.02],
                    "cryo_dmg_": [0.08, 0.02],
                    "electro_dmg_": [0.08, 0.02],
                    "anemo_dmg_": [0.08, 0.02],
                    "geo_dmg_": [0.08, 0.02],
                    "dendro_dmg_": [0.08, 0.02]
                },
            },
            {
                label: "Si une 2ème réaction élémentaire est déclenchée (DGTs Élémentaires)",
                stats: {
                    "pyro_dmg_": [0.08, 0.02],
                    "hydro_dmg_": [0.08, 0.02],
                    "cryo_dmg_": [0.08, 0.02],
                    "electro_dmg_": [0.08, 0.02],
                    "anemo_dmg_": [0.08, 0.02],
                    "geo_dmg_": [0.08, 0.02],
                    "dendro_dmg_": [0.08, 0.02]
                },
            },
        ]
    },
    "BlackcliffAgate": {
        selectMode: "cumulative",
        buffs: [
            { label: "Si un 1er ennemi a été vaincu (ATQ%)", stats: { "atk_": [0.12, 0.03] } },
            { label: "Si un 2ème ennemi a été vaincu (ATQ%)", stats: { "atk_": [0.12, 0.03] } },
            { label: "Si un 3ème ennemi a été vaincu (ATQ%)", stats: { "atk_": [0.12, 0.03] } },
        ]
    },
    "WineAndSong": {
        buffs: [
            {
                label: "Si le personnage sprint après avoir utilisé une compétence élémentaire (ATK%)",
                stats: {
                    "atk_": [0.20, 0.05]
                }
            }
        ]
    },
    "DodocoTales": {
        buffs: [
            {
                label: "Si une attaque chargée touche un ennemi (ATK%)",
                stats: {
                    "atk_": [0.08, 0.02]
                }
            }
        ]
    },
    //HakushinRing peut-être
    "OathswornEye": {
        buffs: [
            {
                label: "Si une compétence élémentaire est utilisée (Recharge d'énergie)",
                stats: {
                    "enerRech_": [0.24, 0.06]
                }
            }
        ]
    },
    "WanderingEvenstar": {
        buffs: [
            {
                label: "Bonus selon la Maîtrise élémentaire (ATK%)",
                stats: {
                    "atk_bonus_scaling": {
                        "source": "eleMas",
                        "percent": [0.24, 0.06]
                    }
                }
            }
        ]
    },
    "FruitOfFulfillment": {
        buffs: [
            {
                label: "Si une réaction élémentaire est déclenchée (Maîtrise élémentaire)",
                stats: {
                    "eleMas": [0.24, 0.03],
                }
            }
        ]
    },
    "SacrificialJade": {
        buffs: [
            {
                label: "Si le porteur est hors du terrain pendant 5s (PV% et Maîtrise élémentaire)",
                stats: {
                    "hp_": [0.32, 0.08], "eleMas": [0.40, 0.10]
                }
            }
        ]
    },
    "FlowingPurity": {
        selectMode: "cumulative",
        buffs: [
            {
                label: "Si une compétence élémentaire est utilisée (DGTs Élémentaires)",
                stats: {
                    "pyro_dmg_": [0.08, 0.02],
                    "hydro_dmg_": [0.08, 0.02],
                    "cryo_dmg_": [0.08, 0.02],
                    "electro_dmg_": [0.08, 0.02],
                    "anemo_dmg_": [0.08, 0.02],
                    "geo_dmg_": [0.08, 0.02],
                    "dendro_dmg_": [0.08, 0.02]
                }
            },
            {
                label: "Si un Engagement Vital est dissipé (DGTs Élémentaires)",
                stats: {
                    "pyro_dmg_": [0.12, 0.03],
                    "hydro_dmg_": [0.12, 0.03],
                    "cryo_dmg_": [0.12, 0.03],
                    "electro_dmg_": [0.12, 0.03],
                    "anemo_dmg_": [0.12, 0.03],
                    "geo_dmg_": [0.12, 0.03],
                    "dendro_dmg_": [0.12, 0.03]
                }
            }
        ]
    },
    "WaveridingWhirl": {
        selectMode: "cumulative",
        buffs: [
            {
                label: "Si une compétence élémentaire est utilisée (PV%)",
                stats: {
                    "hp_": [0.20, 0.05]
                }
            },
            {
                label: "S'il y a 1 personnage Hydro dans l'équipe (PV%)",
                stats: {
                    "hp_": [0.12, 0.03]
                }
            },
            {
                label: "S'il y a 2 personnages Hydro dans l'équipe (PV%)",
                stats: {
                    "hp_": [0.12, 0.03]
                }
            }
        ]
    },
    "EtherlightSpindlelute": {
        buffs: [
            {
                label: "Si une compétence élémentaire est utilisée (Maîtrise élémentaire)",
                stats: {
                    "eleMas": [1.00, 0.25]
                }
            }
        ]
    },
    "DawningFrost": {
        buffs: [
            {
                label: "Si une attaque chargée touche un ennemi (Maîtrise élémentaire)",
                stats: {
                    "eleMas": [0.72, 0.18]
                }
            },
            {
                label: "Si une compétence élémentaire touche un ennemi (Maîtrise élémentaire)",
                stats: {
                    "eleMas": [0.48, 0.12]
                }
            }
        ]
    },

    // 5 étoiles - épées à une main






    // Cas simple : Bâton d'Homa (On garde le format simple objet, le script gérera les deux)
    "StaffOfHoma": {
        "hp_": 0.20,
        "atk_bonus_scaling": { "source": "hp", "percent": 0.008 }
    },

    // CAS COMPLEXE (Ta demande) : Liste d'effets avec Labels
    "AThousandBlazingSuns": {
        selectMode: "cumulative",
        buffs: [
            {
                label: "Effet Brillance (ATQ & DGT CRIT de base)",
                stats: {
                    "atk_": [0.28, 0.07],
                    "critDMG_": [0.20, 0.05]
                }
            },
            {
                label: "Sous Bénédiction noctâme (+75% d'efficacité)",
                stats: {
                    // Calcul : On multiplie la base ET l'incrément par 0.75
                    "atk_": [0.21, 0.0525],      // 21% en R1 -> 42% en R5
                    "critDMG_": [0.15, 0.0375]   // 15% en R1 -> 30% en R5
                }
            }
        ]
    },

    "Lumière du faucheur": { "enerRech_": 0.30, "electro_dmg_": 0.12 }, // Format simple

    "KeyOfKhajNisut": {
        "hp_": 0.20,
        "eleMas_bonus_scaling": { "source": "hp", "percent": 0.0012 }
    },

    "Coupeur de jade primordial": {
        "hp_": 0.20,
        "atk_bonus_scaling": { "source": "hp", "percent": 0.012 }
    },

    "Azurelight": [
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
        selectMode: "cumulative",
        4: [
            {
                label: "Si l'ennemi est affecté par Cryo (20% Taux CRIT)",
                stats: { "critRate_": 0.20 }
            },
            {
                label: "Si l'ennemi est gelé (40% Taux CRIT)",
                stats: { "critRate_": 0.20 }
            }
        ]
    },
    "CrimsonWitchOfFlames": {
        selectMode: "cumulative",
        4: [
            {
                label: "Si une 1ère compétence élémentaire est utilisée (7.5% Bonus de DGT Pyro)",
                stats: { "pyro_dmg_": 0.075 }
            },
            {
                label: "Si une 2ème compétence élémentaire est utilisée (15% Bonus de DGT Pyro)",
                stats: { "pyro_dmg_": 0.075 }
            },
            {
                label: "Si une 3ème compétence élémentaire est utilisée (22.5% Bonus de DGT Pyro)",
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
        selectMode: "exclusive",
        4: [
            { label: "Cristal Pyro ramassé (35% Bonus de Dgt Pyro)", stats: { "pyro_dmg_": 0.35 } },
            { label: "Cristal Hydro ramassé (35% Bonus de Dgt Hydro)", stats: { "hydro_dmg_": 0.35 } },
            { label: "Cristal Cryo ramassé (35% Bonus de Dgt Cryo)", stats: { "cryo_dmg_": 0.35 } },
            { label: "Cristal Électro ramassé (35% Bonus de Dgt Électro)", stats: { "electro_dmg_": 0.35 } }
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
        selectMode: "cumulative",
        4: [
            {
                label: "Si une 1ère compétence élémentaire touche un ennemi (9% ATK)",
                stats: { "atk_": 0.09 }
            },
            {
                label: "Si une 2ème compétence élémentaire touche un ennemi (18% ATK et 25% Bonus de DGT Physique)",
                stats: { "atk_": 0.09, "physical_dmg_": 0.25 }
            }
        ]
    },
    "HuskOfOpulentDreams": {
        selectMode: "cumulative",
        4: [
            {
                label: "Quand une 1ère attaque Géo touche ou qu'1s est passée non-déployé (6% DÉF et 6% Bonus de DGT Géo)",
                stats: { "def_": 0.06, "geo_dmg_": 0.06 }
            },
            {
                label: "Quand une 2ème attaque Géo touche ou qu'1s de plus est passée non-déployé (12% DÉF et 12% Bonus de DGT Géo)",
                stats: { "def_": 0.06, "geo_dmg_": 0.06 }
            },
            {
                label: "Quand une 3ème attaque Géo touche ou qu'1s de plus est passée non-déployé (18% DÉF et 18% Bonus de DGT Géo)",
                stats: { "def_": 0.06, "geo_dmg_": 0.06 }
            },
            {
                label: "Quand une 4ème attaque Géo touche ou qu'1s de plus est passée non-déployé (24% DÉF et 24% Bonus de DGT Géo)",
                stats: { "def_": 0.06, "geo_dmg_": 0.06 }
            }
        ]
    },
    "VermillionHereafter": {
        selectMode: "cumulative",
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
                label: "Si des PV sont perdus une 2ème fois (20% ATQ)",
                stats: { "atk_": 0.10 }
            },
            {
                label: "Si des PV sont perdus une 3ème fois (30% ATQ)",
                stats: { "atk_": 0.10 }
            },
            {
                label: "Si des PV sont perdus une 4ème fois (40% ATQ)",
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
        selectMode: "cumulative",
        4: [
            {
                label: "Si une 1ère attaque de tout type touche (7% ATQ et 4% Bonus de DGT Hydro)",
                stats: { "atk_": 0.07, "hydro_dmg_": 0.04 }
            },
            {
                label: "Si une 2ème attaque de tout type touche (16% ATQ et 9% Bonus de DGT Hydro)",
                stats: { "atk_": 0.09, "hydro_dmg_": 0.05 }
            },
            {
                label: "Si une 3ème attaque de tout type touche (25% ATQ et 15% Bonus de DGT Hydro)",
                stats: { "atk_": 0.09, "hydro_dmg_": 0.06 }
            }
        ]
    },
    "MarechausseeHunter": {
        selectMode: "cumulative",
        4: [
            {
                label: "Si les PV diminuent une 1ère fois (12% Taux CRIT)",
                stats: { "critRate_": 0.12 }
            },
            {
                label: "Si les PV diminuent une 2ème fois (24% Taux CRIT)",
                stats: { "critRate_": 0.12 }
            },
            {
                label: "Si les PV diminuent une 3ème fois (36% Taux CRIT)",
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
                label: "Si le personnage est sous un bouclier de Cristallisation (50% Bonus de DGT Géo)",
                stats: { "geo_dmg_": 0.30 }
            }
        ]
    },
    "ScrollOfTheHeroOfCinderCity": {
        selectMode: "cumulative",
        4: [
            {
                label: "Si une réaction élémentaire est déclenchée (12% Bonus de DGT Élémentaire)",
                stats: {
                    "pyro_dmg_": 0.12, "hydro_dmg_": 0.12, "cryo_dmg_": 0.12,
                    "electro_dmg_": 0.12, "dendro_dmg_": 0.12, "anemo_dmg_": 0.12, "geo_dmg_": 0.12
                }
            },
            {
                label: "Si le personnage est sous une Bénédiction noctâme (40% Bonus de DGT Élémentaire)",
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
        selectMode: "exclusive",
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
    "SilkenMoonsSerenade": {
        selectMode: "exclusive",
        4: [
            {
                label: "Si des dégâts élémentaires sont infligés et que l'équipe est sous le signe Lueur Naissante (60 Maîtrise élémentaire)",
                stats: { "eleMas": 60 }
            },
            {
                label: "Si des dégâts élémentaires sont infligés et que l'équipe est sous le signe Lueur Ascendante (120 Maîtrise élémentaire)",
                stats: { "eleMas": 120 }
            }
        ]
    }
};

// --- EXPORT GLOBAL ---
window.DEFAULT_CONFIG = DEFAULT_CONFIG;
window.CHARACTER_CONFIG = CHARACTER_CONFIG;
window.WEAPON_PASSIVES = WEAPON_PASSIVES;
window.SET_PASSIVES = SET_PASSIVES;