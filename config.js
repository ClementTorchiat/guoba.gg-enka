const DEFAULT_CONFIG = {
    weights: { "critRate_": 1, "critDMG_": 1, "atk_": 0.5, "enerRech_": 0.5 },
    bestSets: [],
    goodSets: [],
    talents: { auto: 1, skill: 6, burst: 6 }
};

const CHARACTER_CONFIG = {
    "NomDuPersonnage": {
        color: "#000000",
        portraitOffset: -35,

        skins: {
            000000: {
                color: "#000000",
                portraitOffset: -35
            }
        },

        talents: {
            auto: 1,
            skill: 8,
            burst: 8
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "Nom du Passif (A1/A4)",
                        active: true,
                        stats: {
                            atk_: 0.20,
                        }
                    }
                ]
            },
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C1 : Nom de la constellation",
                        cons: 1,
                        stats: {
                            dmgBonus: 0.10
                        }
                    }
                ]
            }
        ],

        builds: {
            "main_build": {
                name: "",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0, "atk": 0,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": [],
                    "EQUIP_RING": [],
                    "EQUIP_DRESS": []
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["Set1:4", "Set2:4"],
                goodSets: ["Set1:2", "Set2:2"],

                er_req: 100,

                team: [
                    { role: "", name: "", element: "" },
                    { role: "", name: "", element: "" },
                    { role: "Flex", name: ["Kazuha", "Sucrose"], element: ["anemo", "anemo"] }
                ]
            }
        }
    },


    // 1.0
    "Amber": {
        color: "#e24b4b",
        portraitOffset: -36,

        talents: {
            auto: 8,
            skill: 9,
            burst: 10
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A1 : Dans le mille ! (uniquement le déchaînement)",
                        active: false,
                        stats: {
                            critRate_: 0.10,
                        }
                    },
                    {
                        label: "A4 :Tir précis (uniquement après avoir touché un point faible)",
                        active: false,
                        stats: {
                            atk_: 0.15,
                        }
                    }
                ]
            },
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C6 : Feu sauvage (après le déchaînement)",
                        cons: 6,
                        active: false,
                        stats: {
                            atk_: 0.15
                        }
                    }
                ]
            }
        ],

        builds: {
            "DPS Fonte": {
                name: "DPS Fonte",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.6, "enerRech_": 0.6,

                    "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas", "atk_"],
                    "EQUIP_RING": ["pyro_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["ShimenawasReminiscence:4", "WanderersTroupe:4", "CrimsonWitchOfFlames:4"],
                goodSets: ["DesertPavilionChronicle:4", "GildedDreams:4", "CrimsonWitchOfFlames:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 110,

                team: [
                    { role: "Support", name: "Citlali", element: "cryo" },
                    { role: "Support", name: "Xilonen", element: "geo" },
                    { role: "Support", name: "Bennett", element: "pyro" }
                ]
            },
            "DPS Bourgeonnement": {
                name: "DPS Bourgeonnement",

                weights: {
                    "critRate_": 0, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 1, "enerRech_": 0,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas"],
                    "EQUIP_RING": ["eleMas"],
                    "EQUIP_DRESS": ["eleMas"]
                },

                hideUIStats: [],
                showUIStats: ["atk"],

                bestSets: ["FlowerOfParadiseLost:4", "GildedDreams:4"],
                goodSets: ["WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 100,

                team: [
                    { role: "Sub-DPS", name: "Collei", element: "dendro" },
                    { role: "Support", name: "Kokomi", element: "hydro" },
                    { role: "Sub-DPS", name: "Rosaria", element: "cryo" }
                ]
            }
        }
    },
    "Kaeya": {
        color: "#28657c",
        portraitOffset: -37,

        skins: {
            201501: {
                color: "#4b4cb0",
                portraitOffset: -35
            }
        },

        talents: {
            auto: 1,
            skill: 9,
            burst: 10
        },

        buffs: [
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C1 : Lignée de l'excellence (uniquement les NA et CA sur un ennemi affecté par cryo)",
                        cons: 1,
                        active: false,
                        stats: {
                            critRate_: 0.15
                        }
                    }
                ]
            }
        ],

        builds: {
            "Sub-DPS Fonte": {
                name: "Sub-DPS Fonte",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.6, "enerRech_": 0.8,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 1,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas", "atk_", "enerRech_"],
                    "EQUIP_RING": ["cryo_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["EmblemOfSeveredFate:4", "GildedDreams:4"],
                goodSets: ["BlizzardStrayer:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "BlizzardStrayer:2", "FinaleOfTheDeepGalleries:2"],

                er_req: 220,

                team: [
                    { role: "DPS", name: "Mavuika", element: "pyro" },
                    { role: "Support", name: "Xilonen", element: "geo" },
                    { role: "Support", name: "Bennett", element: "pyro" }
                ]
            },
            "Sub-DPS Gel": {
                name: "Sub-DPS Gel",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.8,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 1,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "enerRech_"],
                    "EQUIP_RING": ["cryo_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["BlizzardStrayer:4", "EmblemOfSeveredFate:4"],
                goodSets: ["GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "BlizzardStrayer:2", "FinaleOfTheDeepGalleries:2"],

                er_req: 150,

                team: [
                    { role: "DPS", name: "SkirkNew", element: "cryo" },
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },
                    { role: "Sub-DPS", name: "Escoffier", element: "cryo" }
                ]
            }
        }
    },
    "Lisa": {
        color: "#3c327e",
        portraitOffset: -36,

        skins: {
            200601: {
                color: "#3b9f99",
                portraitOffset: -41
            }
        },

        talents: {
            auto: 8,
            skill: 9,
            burst: 10
        },

        buffs: [
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C2 : Champ électromagnétique",
                        cons: 2,
                        stats: {
                            def_: 0.25
                        }
                    }
                ]
            }
        ],

        builds: {
            "DPS Suractivation": {
                name: "DPS Suractivation",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.8, "enerRech_": 0.6,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 1,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "eleMas"],
                    "EQUIP_RING": ["electro_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["ThunderingFury:4", "GildedDreams:4"],
                goodSets: ["Thundersoother:4", "ThunderingFury:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 110,

                team: [
                    { role: "", name: "", element: "dendro" },
                    { role: "", name: "", element: "dendro" },
                    { role: "", name: "", element: "electro" }
                ]
            },
            "DPS Sélénocution": {
                name: "DPS Sélénocution",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.4, "enerRech_": 0.6,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 1,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "eleMas"],
                    "EQUIP_RING": ["electro_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["ThunderingFury:4", "GildedDreams:4", "NightOfTheSkysUnveiling:4"],
                goodSets: ["Thundersoother:4", "ThunderingFury:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 110,

                team: [
                    { role: "Sub-DPS", name: "Ineffa", element: "electro" },
                    { role: "Sub-DPS", name: "Columbina", element: "hydro" },
                    { role: "Support", name: "Sucrose", element: "anemo" }
                ]
            },
            "Sub-DPS Propagation": {
                name: "Sub-DPS Propagation",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.8, "enerRech_": 0.8,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 1,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "eleMas"],
                    "EQUIP_RING": ["electro_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["ThunderingFury:4", "GildedDreams:4"],
                goodSets: ["Thundersoother:4", "ThunderingFury:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 140,

                team: [
                    { role: "", name: "", element: "dendro" },
                    { role: "", name: "", element: "dendro" },
                    { role: "", name: "", element: "electro" }
                ]
            },
        }
    },
    "Barbara": {
        color: "#3a54a5",
        portraitOffset: -37,

        skins: {
            201401: {
                color: "#8499fb",
                portraitOffset: -37
            }
        },

        talents: {
            auto: 1,
            skill: 10,
            burst: 10
        },

        buffs: [
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C2 : Éclat de vitalité",
                        cons: 2,
                        stats: {
                            elemental_dmg_: 0.15
                        }
                    }
                ]
            }
        ],

        builds: {
            "Healeuse générale": {
                name: "Healeuse générale",

                weights: {
                    "critRate_": 0, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 1, "hp": 0.8,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 1
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["hp_"],
                    "EQUIP_RING": ["hp_"],
                    "EQUIP_DRESS": ["heal_", "hp_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["MaidenBeloved:4", "OceanHuedClam:4"],
                goodSets: ["MaidenBeloved:2", "OceanHuedClam:2", "SongOfDaysPast:2", "TenacityOfTheMillelith:2", "VourukashasGlow:2"],

                er_req: 100,

                team: [
                    { role: "", name: "", element: "" },
                    { role: "", name: "", element: "" },
                    { role: "", name: "", element: "" }
                ]
            }
        }
    },
    "Noëlle": {
        color: "#b23a54",
        portraitOffset: -36,

        talents: {
            auto: 10,
            skill: 8,
            burst: 10
        },

        buffs: [
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C6 : Aucune poussière",
                        cons: 6,
                        atk_bonus_scaling: {
                            source: "def",
                            percent: 0.50
                        }
                    }
                ]
            }
        ],

        builds: {
            "DPS Géo": {
                name: "DPS Géo",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.4, "atk": 0, // 0.8 + 0.1 mais 1 si peu de buff extérieur
                    "hp_": 0, "hp": 0, // 0.9 à 1 + 0.1 mais 0.8 pour Hu Tao par exemple
                    "def_": 0.8, "def": 0.1, // 0.8 à 0.9, 0.8 si crit important
                    "eleMas": 0, "enerRech_": 0.8,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 1, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["def_"],
                    "EQUIP_RING": ["geo_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: ["heal_"],
                showUIStats: ["def", "atk"],

                bestSets: ["HuskOfOpulentDreams:4", "MarechausseeHunter:4"],
                goodSets: ["GladiatorsFinale:4", "RetracingBolide:4", "ArchaicPetra:4", "ArchaicPetra:2", "HuskOfOpulentDreams:2", "MarechausseeHunter:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2"],

                er_req: 140,

                team: [
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },
                    { role: "Sub-DPS", name: "Albedo", element: "geo" },
                    { role: "Support", name: "Gorou", element: "geo" }
                ]
            },
            "DPS Sélénocristallisation": {
                name: "DPS Sélénocristallisation",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.4, "atk": 0,
                    "hp_": 0, "hp": 0,
                    "def_": 0.8, "def": 0.1,
                    "eleMas": 0.4, "enerRech_": 0.8,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 1, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["def_"],
                    "EQUIP_RING": ["geo_dmg_", "def_"],
                    "EQUIP_DRESS": ["critDMG_", "critRate_"]
                },

                hideUIStats: ["heal_"],
                showUIStats: ["def", "atk"],

                bestSets: ["NightOfTheSkysUnveiling:4"],
                goodSets: ["HuskOfOpulentDreams:4", "GladiatorsFinale:4", "RetracingBolide:4", "ArchaicPetra:4", "ArchaicPetra:2", "HuskOfOpulentDreams:2", "MarechausseeHunter:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "GildedDreams:4"],

                er_req: 140,

                team: [
                    { role: "Sub-DPS", name: "Linnea", element: "geo" },
                    { role: "Sub-DPS", name: "Columbina", element: "hydro" },
                    { role: "Support", name: "Illuga", element: "geo" }
                ]
            }
        }
    },
    "Bennett": {
        color: "#df4d4d",
        portraitOffset: -38,

        skins: {
            203201: {
                color: "#ef9c50",
                portraitOffset: -36
            }
        },

        talents: {
            auto: 1,
            skill: 1,
            burst: 10
        },

        buffs: [
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C1 : Perspective de voyage",
                        cons: 1,
                        stats: {
                            atk_: 0.20
                        }
                    },
                    {
                        label: "C2 : Brise-désespoir (si PV inférieurs à 70%)",
                        cons: 2,
                        active: false,
                        stats: {
                            enerRech_: 0.30
                        }
                    },
                    {
                        label: "C6 : Feu et courage (si sur le terrain)",
                        cons: 6,
                        active: false,
                        stats: {
                            elemental_dmg_: 0.15
                        }
                    }
                ]
            }
        ],

        builds: {
            "Buffer universel": {
                name: "Buffer universel",

                weights: {
                    "critRate_": 0.4, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 1, "hp": 0.8,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 1
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["enerRech_", "hp_"],
                    "EQUIP_RING": ["hp_"],
                    "EQUIP_DRESS": ["heal_", "hp_", "critRate_"]
                },

                hideUIStats: ["critDMG_"],
                showUIStats: ["atk"],

                bestSets: ["NoblesseOblige:4", "ScrollOfTheHeroOfCinderCity:4"],
                goodSets: ["Instructor:4", "TheExile:4", "TenacityOfTheMillelith:2", "VourukashasGlow:2", "MaidenBeloved:2", "OceanHuedClam:2", "SongOfDaysPast:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2"],

                er_req: 220,

                team: [
                    { role: "", name: "", element: "" },
                    { role: "", name: "", element: "" },
                    { role: "", name: "", element: "" },
                ]
            }
        }
    },
    "Razor": {
        color: "#715458",
        portraitOffset: -38,

        talents: {
            auto: 10,
            skill: 8,
            burst: 9
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A4 : Famine (ER < 50%)",
                        active: false,
                        stats: {
                            enerRech_: 0.30,
                        }
                    }
                ]
            },
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C2 : Répression (ennemis PV < 30%)",
                        cons: 2,
                        active: false,
                        stats: {
                            critRate_: 0.10
                        }
                    },
                    {
                        label: "C6 : Lupus Fulguris (Hexerei)",
                        cons: 6,
                        active: true,
                        stats: {
                            critRate_: 0.10,
                            critDMG_: 0.50
                        }
                    }
                ]
            }
        ],

        builds: {
            "DPS Surcharge Hexerei": {
                name: "DPS Surcharge Hexerei",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.5,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 1,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["electro_dmg_"],
                    "EQUIP_DRESS": ["critDMG_", "critRate_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["ADayCarvedFromRisingWinds:4"],
                goodSets: ["EchoesOfAnOfferin:4", "GladiatorsFinale:4", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "ThunderingFury:2"],

                er_req: 110,

                team: [
                    { role: "Sub-DPS", name: "Durin", element: "pyro" },
                    { role: "Support", name: "Chevreuse", element: "pyro" },
                    { role: "Sub-DPS", name: "Fischl", element: "electro" }
                ]
            },
            "DPS Physique": {
                name: "DPS Physique",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.5,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 1,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["physical_dmg_"],
                    "EQUIP_DRESS": ["critDMG_", "critRate_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["ADayCarvedFromRisingWinds:4", "PaleFlame:4"],
                goodSets: ["EchoesOfAnOfferin:4", "GladiatorsFinale:4", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "BloodstainedChivalry:2", "PaleFlame:2"],

                er_req: 110,

                team: [
                    { role: "Sub-DPS", name: "Rosaria", element: "cryo" },
                    { role: "Support", name: "Zhongli", element: "geo" },
                    { role: "Sub-DPS", name: "Fischl", element: "electro" }
                ]
            }
        }
    },
    "Beidou": {
        color: "#6d43b0",
        portraitOffset: -37,

        talents: {
            auto: 1,
            skill: 8,
            burst: 10
        },

        builds: {
            "Sub-DPS électrocution": {
                name: "Sub-DPS électrocution",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 1,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "enerRech_"],
                    "EQUIP_RING": ["electro_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["EmblemOfSeveredFate:4"],
                goodSets: ["NoblesseOblige:4", "ThunderingFury:4", "Thundersoother:4", "ThunderingFury:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2"],

                er_req: 150,

                team: [
                    { role: "Support", name: "Sucrose", element: "anemo" },
                    { role: "Sub-DPS", name: "Fischl", element: "electro" },
                    { role: "Sub-DPS", name: "Xingqiu", element: "hydro" }
                ]
            },
            "Sub-DPS stimulation": {
                name: "Sub-DPS stimulation",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.8, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 1,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "enerRech_", "eleMas"],
                    "EQUIP_RING": ["electro_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["EmblemOfSeveredFate:4", "GildedDreams:4"],
                goodSets: ["NoblesseOblige:4", "ThunderingFury:4", "Thundersoother:4", "ThunderingFury:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 150,

                team: [
                    { role: "DPS", name: "Tighnari", element: "dendro" },
                    { role: "Sub-DPS", name: "Nahida", element: "dendro" },
                    { role: "Sub-DPS", name: "Fischl", element: "electro" },
                ]
            }
        }
    },
    "Fischl": {
        color: "#3c1e71",
        portraitOffset: -37,

        skins: {
            203101: {
                color: "#5732e3",
                portraitOffset: -37
            }
        },

        talents: {
            auto: 1,
            skill: 10,
            burst: 9
        },

        buffs: [
            {
                category: "Passifs",
                selectMode: "exclusive",
                buffs: [
                    {
                        label: "Hexerei : Nocturne fantomatique (surcharge)",
                        stats: {
                            atk_: 0.225,
                        }
                    },
                    {
                        label: "Hexerei : Nocturne fantomatique (électrocution ou sélénocution)",
                        stats: {
                            eleMas: 90,
                        }
                    }
                ]
            },
            {
                category: "Constellations",
                selectMode: "exclusive",
                buffs: [
                    {
                        label: "C6 Hexerei : Oiseau de la nuit éternelle (surcharge)",
                        cons: 6,
                        stats: {
                            atk_: 0.225,
                        }
                    },
                    {
                        label: "C6 Hexerei : Oiseau de la nuit éternelle (électrocution ou sélénocution)",
                        cons: 6,
                        stats: {
                            eleMas: 90,
                        }
                    }
                ]
            }
        ],

        builds: {
            "Sub-DPS surcharge Hexerei": {
                name: "Sub-DPS surcharge Hexerei",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.6,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 1,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "enerRech_"],
                    "EQUIP_RING": ["electro_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["GoldenTroupe:4"],
                goodSets: ["Thundersoother:4", "TenacityOfTheMillelith:4", "ThunderingFury:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2"],

                er_req: 140,

                team: [
                    { role: "DPS", name: "Clorinde", element: "electro" },
                    { role: "Sub-DPS", name: "Durin", element: "pyro" },
                    { role: "Support", name: "Chevreuse", element: "pyro" },
                ]
            },
            "Sub-DPS propagation": {
                name: "Sub-DPS propagation",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.8, "enerRech_": 0.6,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 1,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "enerRech_", "eleMas"],
                    "EQUIP_RING": ["electro_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["GoldenTroupe:4", "GildedDreams:4"],
                goodSets: ["Thundersoother:4", "TenacityOfTheMillelith:4", "ThunderingFury:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 140,

                team: [
                    { role: "DPS", name: "Tighnari", element: "dendro" },
                    { role: "Sub-DPS", name: "Shinobu", element: "electro" },
                    { role: "Support", name: "Kazuha", element: "anemo" },
                ]
            }
        }
    },
    "Xiangling": {
        color: "#652c14",
        portraitOffset: -33,

        skins: {
            202301: {
                color: "#d22c36",
                portraitOffset: -36
            }
        },

        talents: {
            auto: 1,
            skill: 8,
            burst: 10
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A4 : Attention, ça pique (piment)",
                        active: true,
                        stats: {
                            atk_: 0.10,
                        }
                    }
                ]
            },
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C6 : Pyrotation condensée",
                        cons: 6,
                        stats: {
                            elemental_dmg_: 0.15
                        }
                    }
                ]
            }
        ],

        builds: {
            "Sub-DPS évaporation": {
                name: "Sub-DPS évaporation",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.6, "enerRech_": 1,

                    "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["enerRech_", "eleMas", "atk_"],
                    "EQUIP_RING": ["pyro_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["EmblemOfSeveredFate:4"],
                goodSets: ["CrimsonWitchOfFlames:4", "GildedDreams:4", "CrimsonWitchOfFlames:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2"],

                er_req: 220,

                team: [
                    { role: "DPS", name: "Tartaglia", element: "hydro" },
                    { role: "Support", name: "Kazuha", element: "anemo" },
                    { role: "Support", name: "Bennett", element: "pyro" },
                ]
            },
            "Sub-DPS fonte": {
                name: "Sub-DPS fonte",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.6, "enerRech_": 1,

                    "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["enerRech_", "eleMas", "atk_"],
                    "EQUIP_RING": ["pyro_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["EmblemOfSeveredFate:4"],
                goodSets: ["CrimsonWitchOfFlames:4", "GildedDreams:4", "CrimsonWitchOfFlames:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 220,

                team: [
                    { role: "DPS", name: "Chongyun", element: "cryo" },
                    { role: "Support", name: "Rosaria", element: "cryo" },
                    { role: "Support", name: "Bennett", element: "pyro" },
                ]
            },
            "Sub-DPS mono-pyro": {
                name: "Sub-DPS mono-pyro",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 1,

                    "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["enerRech_", "atk_"],
                    "EQUIP_RING": ["pyro_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["EmblemOfSeveredFate:4"],
                goodSets: ["CrimsonWitchOfFlames:4", "CrimsonWitchOfFlames:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2"],

                er_req: 220,

                team: [
                    { role: "DPS", name: "Lyney", element: "pyro" },
                    { role: "Support", name: "Zhongli", element: "geo" },
                    { role: "Support", name: "Bennett", element: "pyro" },
                ]
            },
            "Sub-DPS surcharge": {
                name: "Sub-DPS surcharge",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 1,

                    "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["enerRech_", "atk_"],
                    "EQUIP_RING": ["pyro_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["EmblemOfSeveredFate:4"],
                goodSets: ["CrimsonWitchOfFlames:4", "CrimsonWitchOfFlames:2","GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2"],

                er_req: 220,

                team: [
                    { role: "Sub-DPS", name: "Fischl", element: "electro" },
                    { role: "Support", name: "Chevreuse", element: "pyro" },
                    { role: "Support", name: "Bennett", element: "pyro" },
                ]
            }
        }
    },
    "Xingqiu": {
        color: "#407ea3",
        portraitOffset: -37,

        skins: {
            202501: {
                color: "#3a62cf",
                portraitOffset: -34
            }
        },

        talents: {
            auto: 1,
            skill: 8,
            burst: 10
        },

        builds: {
            "Sub-DPS évaporation": {
                name: "Sub-DPS évaporation",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.6, "enerRech_": 0.8,

                    "pyro_dmg_": 0, "hydro_dmg_": 1, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["enerRech_", "atk_"],
                    "EQUIP_RING": ["hydro_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["EmblemOfSeveredFate:4"],
                goodSets: ["NoblesseOblige:2", "HeartOfDepth:2", "NymphsDream:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2"],

                er_req: 200,

                team: [
                    { role: "DPS", name: "Hutao", element: "pyro" },
                    { role: "Sub-DPS", name: "Yelan", element: "hydro" },
                    { role: "Support", name: "Zhongli", element: "geo" },
                ]
            },
            "Sub-DPS gel": {
                name: "Sub-DPS gel",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.8,

                    "pyro_dmg_": 0, "hydro_dmg_": 1, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["enerRech_", "atk_"],
                    "EQUIP_RING": ["hydro_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["EmblemOfSeveredFate:4"],
                goodSets: ["NoblesseOblige:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "HeartOfDepth:2", "NymphsDream:2"],

                er_req: 200,

                team: [
                    { role: "DPS", name: "SkirkNew", element: "cryo" },
                    { role: "Sub-DPS", name: "Escoffier", element: "cryo" },
                    { role: "Support", name: "Furina", element: "hydro" },
                ]
            },
            "Sub-DPS fleurissement": {
                name: "Sub-DPS fleurissement",

                weights: {
                    "critRate_": 0.4, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 1, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["enerRech_", "eleMas"],
                    "EQUIP_RING": ["eleMas"],
                    "EQUIP_DRESS": ["critRate_", "eleMas"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["EmblemOfSeveredFate:4", "FlowerOfParadiseLost:4"],
                goodSets: ["NoblesseOblige:2", "GildedDreams:4", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2"],

                er_req: 200,

                team: [
                    { role: "DPS", name: "Nilou", element: "hydro" },
                    { role: "Sub-DPS", name: "Nahida", element: "dendro" },
                    { role: "Sub-DPS", name: "Lauma", element: "dendro" },
                ]
            },
            "Sub-DPS électrocution": {
                name: "Sub-DPS électrocution",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.8,

                    "pyro_dmg_": 0, "hydro_dmg_": 1, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["enerRech_", "atk_"],
                    "EQUIP_RING": ["hydro_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["EmblemOfSeveredFate:4"],
                goodSets: ["NoblesseOblige:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "HeartOfDepth:2", "NymphsDream:2"],

                er_req: 200,

                team: [
                    { role: "Sub-DPS", name: "Fischl", element: "electro" },
                    { role: "Sub-DPS", name: "Beidou", element: "electro" },
                    { role: "Support", name: "Sucrose", element: "anemo" },
                ]
            },
        }
    },
    "Chongyun": {
        color: "#68b8db",
        portraitOffset: -37,

        talents: {
            auto: 1,
            skill: 9,
            burst: 10
        },

        builds: {
            "DPS Fonte": {
                name: "DPS Fonte",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.6, "enerRech_": 0.8,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 1,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "eleMas", "enerRech_"],
                    "EQUIP_RING": ["cryo_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["NoblesseOblige:4", "EmblemOfSeveredFate:4"],
                goodSets: ["GildedDreams:4", "Lavawalker:4", "BlizzardStrayer:2", "FinaleOfTheDeepGalleries:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2", "DisenchantmentInDeepShadow:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 130,

                team: [
                    { role: "Sub-DPS", name: "Rosaria", element: "cryo" },
                    { role: "Sub-DPS", name: "Xiangling", element: "pyro" },
                    { role: "Support", name: "Bennett", element: "pyro" }
                ]
            },
            "DPS Gel": {
                name: "DPS Gel",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.8,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 1,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "enerRech_"],
                    "EQUIP_RING": ["cryo_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["NoblesseOblige:4", "EmblemOfSeveredFate:4", "BlizzardStrayer:4", "MarechausseeHunter:4"],
                goodSets: ["Lavawalker:4", "BlizzardStrayer:2", "FinaleOfTheDeepGalleries:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2", "DisenchantmentInDeepShadow:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2"],

                er_req: 130,

                team: [
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },
                    { role: "Sub-DPS", name: "Escoffier", element: "cryo" },
                    { role: "Support", name: "Citlali", element: "cryo" }
                ]
            },
        }
    },
    "Ningguang": {
        color: "#715927",
        portraitOffset: -38,

        skins: {
            202701: {
                color: "#30349c",
                portraitOffset: -36
            }
        },

        talents: {
            auto: 9,
            skill: 8,
            burst: 10
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A4 : Réserve stratégique (en traversant le paravent)",
                        active: false,
                        stats: {
                            geo_dmg_: 0.12,
                        }
                    }
                ]
            }
        ],

        builds: {
            "DPS Géo": {
                name: "DPS Géo",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.8,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 1, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["geo_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["NighttimeWhispersInTheEchoingWoods:4", "MarechausseeHunter:4"],
                goodSets: ["EmblemOfSeveredFate:4", "ArchaicPetra:4", "ArchaicPetra:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2"],

                er_req: 140,

                team: [
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },
                    { role: "Sub-DPS", name: "Fischl", element: "electro" },
                    { role: "Support", name: "Xilonen", element: "geo" }
                ]
            }
        }
    },
    "Sucrose": {
        color: "#2b8e57",
        portraitOffset: -37,

        talents: {
            auto: 1,
            skill: 8,
            burst: 8
        },

        builds: {
            "Support universel": {
                name: "Support universel",

                weights: {
                    "critRate_": 0, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 1, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas", "enerRech_"],
                    "EQUIP_RING": ["eleMas"],
                    "EQUIP_DRESS": ["eleMas"]
                },

                hideUIStats: [],
                showUIStats: ["atk"],

                bestSets: ["ViridescentVenerer:4"],
                goodSets: ["GildedDreams:4", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 170,

                team: [
                    { role: "", name: "", element: "" },
                    { role: "", name: "", element: "" },
                    { role: "", name: "", element: "" },
                ]
            }
        }
    },
    "Venti": {
        color: "#469278",
        portraitOffset: -36,

        talents: {
            auto: 8,
            skill: 8,
            burst: 10
        },

        buffs: [
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C4 : Vent glacial de liberté (Hexerei)",
                        cons: 4,
                        active: true,
                        stats: {
                            elemental_dmg_: 0.25
                        }
                    },
                    {
                        label: "C6 : Tempête de résistance (Hexerei)",
                        cons: 6,
                        active: false,
                        stats: {
                            critDMG_: 1
                        }
                    }
                ]
            }
        ],

        builds: {
            "Support off-field": {
                name: "Support off-field",

                weights: {
                    "critRate_": 0.4, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 1, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas", "enerRech_"],
                    "EQUIP_RING": ["eleMas"],
                    "EQUIP_DRESS": ["eleMas", "critRate_"]
                },

                hideUIStats: [],
                showUIStats: ["atk"],

                bestSets: ["ViridescentVenerer:4"],
                goodSets: ["ScrollOfTheHeroOfCinderCity:4", "GildedDreams:4", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2"],

                er_req: 180,

                team: [
                    { role: "", name: "", element: "" },
                    { role: "", name: "", element: "" },
                    { role: "", name: "", element: "" },
                ]
            },
            "DPS Anémo": {
                name: "DPS Anémo",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.6,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 1, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "enerRech_"],
                    "EQUIP_RING": ["anemo_dmg_"],
                    "EQUIP_DRESS": ["critDMG_", "critRate_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["ADayCarvedFromRisingWinds:4"],
                goodSets: ["EchoesOfAnOffering:4", "ViridescentVenerer:4", "DesertPavilionChronicle:4", "ViridescentVenerer:2", "DesertPavilionChronicle:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2"],

                er_req: 140,

                team: [
                    { role: "Support", name: "Faruzan", element: "anemo" },
                    { role: "Sub-DPS", name: "Durin", element: "pyro" },
                    { role: "Support", name: "Nicole", element: "pyro" },
                ]
            }
        }
    },
    "Klee": {
        color: "#f6330a",
        portraitOffset: -35,

        skins: {
            202901: {
                color: "#b5ce89",
                portraitOffset: -35
            }
        },

        talents: {
            auto: 10,
            skill: 8,
            burst: 8
        },

        buffs: [
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C1 : Bombardement continu (Hexerei)",
                        cons: 1,
                        stats: {
                            atk_: 0.60
                        }
                    },
                    {
                        label: "C6 : À tout feu (Hexerei)",
                        cons: 6,
                        stats: {
                            elemental_dmg_: 0.50
                        }
                    }
                ]
            }
        ],

        builds: {
            "DPS Surcharge Hexerei": {
                name: "DPS Surcharge Hexerei",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.3,

                    "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["pyro_dmg_", "atk_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["ADayCarvedFromRisingWinds:4"],
                goodSets: ["CrimsonWitchOfFlames:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2"],

                er_req: 130,

                team: [
                    { role: "Sub-DPS", name: "Durin", element: "pyro" },
                    { role: "Support", name: "Chevreuse", element: "pyro" },
                    { role: "Support", name: "Bennett", element: "pyro" },
                ]
            },
            "DPS Évaporation Hexerei": {
                name: "DPS Évaporation Hexerei",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.6, "enerRech_": 0.3,

                    "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "eleMas"],
                    "EQUIP_RING": ["pyro_dmg_", "atk_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["ADayCarvedFromRisingWinds:4", "CrimsonWitchOfFlames:4", "MarechausseeHunter:4"],
                goodSets: ["CrimsonWitchOfFlames:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 130,

                team: [
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },
                    { role: "Sub-DPS", name: "Albedo", element: "geo" },
                    { role: "Support", name: "Xilonen", element: "geo" },
                ]
            },
            "DPS Mono-pyro Hexerei": {
                name: "DPS Mono-pyro Hexerei",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.3,

                    "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["pyro_dmg_", "atk_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["ADayCarvedFromRisingWinds:4"],
                goodSets: ["CrimsonWitchOfFlames:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 130,

                team: [
                    { role: "Support", name: "Prune", element: "anemo" },
                    { role: "Sub-DPS", name: "Durin", element: "pyro" },
                    { role: "Support", name: "Nicole", element: "pyro" },
                ]
            }
        }
    },
    "Jean": {
        color: "#45cab1",
        portraitOffset: -37,

        skins: {
            200301: {
                color: "#3a84ed",
                portraitOffset: -37
            }
        },

        talents: {
            auto: 1,
            skill: 8,
            burst: 10
        },

        builds: {
            "Support général": {
                name: "Support général",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.8,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 1, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 1
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "enerRech_"],
                    "EQUIP_RING": ["anemo_dmg_", "atk_"],
                    "EQUIP_DRESS": ["heal_", "critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["ViridescentVenerer:4"],
                goodSets: ["NoblesseOblige:4", "OceanHuedClam:4", "ViridescentVenerer:2","DesertPavilionChronicle:2", "NoblesseOblige:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "MaidenBeloved:2", "OceanHuedClam:2", "SongOfDaysPast:2"],

                er_req: 140,

                team: [
                    { role: "DPS", name: "Xiao", element: "anemo" },
                    { role: "Sub-DPS", name: "Albedo", element: "geo" },
                    { role: "Support", name: "Zhongli", element: "geo" },
                ]
            },
            "Sunfire": {
                name: "Sunfire",

                weights: {
                    "critRate_": 0.4, "critDMG_": 0.4,
                    "atk_": 0.4, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 1, "enerRech_": 0.8,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 1, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 1
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas", "enerRech_"],
                    "EQUIP_RING": ["eleMas"],
                    "EQUIP_DRESS": ["eleMas"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["ViridescentVenerer:4", "GildedDreams:4"],
                goodSets: ["NoblesseOblige:4", "OceanHuedClam:4", "ViridescentVenerer:2","DesertPavilionChronicle:2", "NoblesseOblige:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 180,

                team: [
                    { role: "Support", name: "Bennett", element: "pyro" },
                    { role: "Flex", name: "", element: "electro" },
                    { role: "Flex", name: "", element: "hydro" },
                ]
            }
        }
    },
    "Diluc": {
        color: "#ca4a35",
        portraitOffset: -37,

        skins: {
            201601: {
                color: "#ff3818",
                portraitOffset: -37
            }
        },

        talents: {
            auto: 10,
            skill: 10,
            burst: 8
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A4 : Bénédiction du phénix",
                        active: true,
                        stats: {
                            elemental_dmg_: 0.20,
                        }
                    }
                ]
            },
            {
                category: "C2 : Chaleur des cendres",
                selectMode: "Cumulative",
                buffs: [
                    {
                        label: "1 stack",
                        cons: 2,
                        stats: {
                            atk_: 0.10
                        }
                    },
                    {
                        label: "2 stacks",
                        cons: 2,
                        stats: {
                            atk_: 0.10
                        }
                    },
                    {
                        label: "3 stacks",
                        cons: 2,
                        stats: {
                            atk_: 0.10
                        }
                    }
                ]
            }
        ],

        builds: {
            "DPS Évaporation": {
                name: "DPS Évaporation",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.6, "enerRech_": 0.4,

                    "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "eleMas"],
                    "EQUIP_RING": ["pyro_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["CrimsonWitchOfFlames:4", "MarechausseeHunter:4"],
                goodSets: ["GildedDreams:4", "GladiatorsFinale:4", "CrimsonWitchOfFlames:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2"],

                er_req: 110,

                team: [
                    { role: "Sub-DPS", name: "Yelan", element: "hydro" },
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },
                    { role: "Support", name: "Bennett", element: "pyro" },
                ]
            },
            "DPS Fonte": {
                name: "DPS Fonte",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.6, "enerRech_": 0.4,

                    "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "eleMas"],
                    "EQUIP_RING": ["pyro_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["CrimsonWitchOfFlames:4"],
                goodSets: ["GildedDreams:4", "GladiatorsFinale:4", "CrimsonWitchOfFlames:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 110,

                team: [
                    { role: "Support", name: "Citlali", element: "cryo" },
                    { role: "Support", name: "Kazuha", element: "anemo" },
                    { role: "Support", name: "Bennett", element: "pyro" },
                ]
            },
            "DPS Mono-pyro": {
                name: "DPS Mono-pyro",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.4,

                    "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["pyro_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["Lavawalker:4"],
                goodSets: ["CrimsonWitchOfFlames:4", "GladiatorsFinale:4", "CrimsonWitchOfFlames:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2"],

                er_req: 110,

                team: [
                    { role: "Support", name: "Xiangling", element: "pyro" },
                    { role: "Support", name: "Kazuha", element: "anemo" },
                    { role: "Support", name: "Bennett", element: "pyro" },
                ]
            }
        }
    },
    "Keqing": {
        color: "#673885",
        portraitOffset: -37,

        skins: {
            204201: {
                color: "#2c46f7",
                portraitOffset: -37
            }
        },

        talents: {
            auto: 10,
            skill: 9,
            burst: 8
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A4 : Trésor de l'Alioth (après déchaînement élémentaire)",
                        active: false,
                        stats: {
                            critRate_: 0.15,
                            enerRech_:0.15
                        }
                    }
                ]
            },
            {
                category: "Constellation 4 : Syntonie",
                buffs: [
                    {
                        label: "Après réaction électro",
                        cons: 4,
                        stats: {
                            atk_: 0.25
                        }
                    }
                ]
            },
            {
                category: "Constellation 6 : Étoile tenace",
                selectMode: "Cumulative",
                buffs: [
                    {
                        label: "Attaque normale",
                        cons: 6,
                        stats: {
                            elemental_dmg_: 0.06
                        }
                    },
                    {
                        label: "Attaque chargée",
                        cons: 6,
                        stats: {
                            elemental_dmg_: 0.06
                        }
                    },
                    {
                        label: "Compétence élémentaire",
                        cons: 6,
                        stats: {
                            elemental_dmg_: 0.06
                        }
                    },
                    {
                        label: "Déchaînement élémentaire",
                        cons: 6,
                        stats: {
                            elemental_dmg_: 0.06
                        }
                    }
                ]
            }
        ],

        builds: {
            "DPS Suractivation": {
                name: "DPS Suractivation",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.8, "enerRech_": 0,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 1,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "eleMas"],
                    "EQUIP_RING": ["electro_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["ThunderingFury:4", "GildedDreams:4"],
                goodSets: ["Thundersoother:4", "ThunderingFury:2", "GladiatorsFinale:4", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 100,

                team: [
                    { role: "Support", name: "Nahida", element: "dendro" },
                    { role: "Sub-DPS", name: "Fischl", element: "electro" },
                    { role: "Support", name: "Kazuha", element: "anemo" },
                ]
            },
            "DPS Surcharge": {
                name: "DPS Surcharge",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 1,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["electro_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["ThunderingFury:4", "GladiatorsFinale:4"],
                goodSets: ["Thundersoother:4", "ThunderingFury:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2"],

                er_req: 100,

                team: [
                    { role: "Support", name: "Chevreuse", element: "pyro" },
                    { role: "Sub-DPS", name: "Fischl", element: "electro" },
                    { role: "Sub-DPS", name: "Xiangling", element: "pyro" },
                ]
            },
            "DPS Sélénocution": {
                name: "DPS Sélénocution",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.4, "enerRech_": 0,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 1,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["electro_dmg_", "atk_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["ThunderingFury:4", "MarechausseeHunter:4", "NightOfTheSkysUnveiling:4"],
                goodSets: ["Thundersoother:4", "ThunderingFury:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "GladiatorsFinale:4", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 100,

                team: [
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },
                    { role: "Sub-DPS", name: "Ineffa", element: "electro" },
                    { role: "Support", name: "Qin", element: "anemo" },
                ]
            }
        }
    },
    "Mona": {
        color: "#524fb6",
        portraitOffset: -37,

        talents: {
            auto: 1,
            skill: 8,
            burst: 10
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A4 : Que le destin décide",
                        stats: {
                            elemental_dmg_bonus_scaling: {
                                source: "enerRech_",
                                percent: 0.20
                            }
                        }
                    }
                ]
            },
            {
                category: "Constellation 2 : Chaîne lunaire",
                buffs: [
                    {
                        label: "Buff Hexerei",
                        cons: 2,
                        stats: {
                            eleMas: 80
                        }
                    }
                ]
            },
            {
                category: "Constellation 4 : Prophétie de la fin",
                buffs: [
                    {
                        label: "Si l'ennemi attaqué est marqué par un présage",
                        active: false,
                        cons: 4,
                        stats: {
                            critRate_: 0.15
                        }
                    },
                    {
                        label: "Si le personnage est un Hexerei",
                        cons: 4,
                        stats: {
                            critDMG_: 0.15
                        }
                    }
                ]
            },
        ],

        builds: {
            "Support Hexerei": {
                name: "Support Hexerei",

                weights: {
                    "critRate_": 0.4, "critDMG_": 0.4,
                    "atk_": 0.4, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 1, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["enerRech_"],
                    "EQUIP_RING": ["hydro_dmg_", "atk_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["NoblesseOblige:4", "TenacityOfTheMillelith:4"],
                goodSets: ["EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "NoblesseOblige:2", "EmblemOfSeveredFate:4"],

                er_req: 220,

                team: [
                    { role: "DPS", name: "Mualani", element: "hydro" },
                    { role: "Sub-DPS", name: "Mavuika", element: "pyro" },
                    { role: "Support", name: "Sucrose", element: "anemo" },
                ]
            },
            "Nuke Évaporation": {
                name: "Nuke Évaporation",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.6, "enerRech_": 0.8,

                    "pyro_dmg_": 0, "hydro_dmg_": 1, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "enerRech_", "eleMas"],
                    "EQUIP_RING": ["hydro_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["EmblemOfSeveredFate:4", "NoblesseOblige:2"],
                goodSets: ["HeartOfDepth:2", "NymphsDream:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2"],

                er_req: 160,

                team: [
                    { role: "Support", name: "Bennett", element: "pyro" },
                    { role: "Support", name: "Kazuha", element: "anemo" },
                    { role: "Sub-DPS", name: "Durin", element: "pyro" }
                ]
            }
        }
    },
    "Qiqi": {
        color: "#7a5fc2",
        portraitOffset: -37.5,

        talents: {
            auto: 1,
            skill: 8,
            burst: 8
        },

        builds: {
            "Healer": {
                name: "Healer",

                weights: {
                    "critRate_": 0, "critDMG_": 0,
                    "atk_": 1, "atk": 0.8,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 1
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["enerRech_", "atk_"],
                    "EQUIP_RING": ["atk_"],
                    "EQUIP_DRESS": ["heal_", "atk_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["OceanHuedClam:4", "MaidenBeloved:4"],
                goodSets: ["GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "MaidenBeloved:2", "OceanHuedClam:2", "SongOfDaysPast:2"],

                er_req: 200,

                team: [
                    { role: "DPS", name: "Eula", element: "cryo" },
                    { role: "Sub-DPS", name: "Shougun", element: "electro" },
                    { role: "Sub-DPS", name: "Furina", element: "hydro" }
                ]
            },
            "DPS Physique": {
                name: "DPS Physique",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.4,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 1,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["physical_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["PaleFlame:4", "GladiatorsFinale:4"],
                goodSets: ["BloodstainedChivalry:2", "PaleFlame:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2"],

                er_req: 130,

                team: [
                    { role: "Sub-DPS", name: "Fischl", element: "electro" },
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },
                    { role: "Support", name: "Mika", element: "cryo" }
                ]
            }
        }
    },

    // 1.1
    "Diona": {
        color: "#252572",
        portraitOffset: -36,

        talents: {
            auto: 1,
            skill: 10,
            burst: 8
        },

        buffs: [
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C6 : Dernière tournée (PV > 50%)",
                        cons: 6,
                        stats: {
                            eleMas: 200
                        }
                    }
                ]
            }
        ],

        builds: {
            "Shieldeuse générale": {
                name: "Shieldeuse générale",

                weights: {
                    "critRate_": 0.4, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 1, "hp": 0.8,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.6,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 1
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["hp_", "enerRech_"],
                    "EQUIP_RING": ["hp_"],
                    "EQUIP_DRESS": ["heal_", "hp_", "critRate_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["NoblesseOblige:4", "TenacityOfTheMillelith:2", "VourukashasGlow:2", "MaidenBeloved:2", "OceanHuedClam:2", "SongOfDaysPast:2"],
                goodSets: ["TenacityOfTheMillelith:4", "Instructor:4", "DeepwoodMemories:4"],

                er_req: 100,

                team: [
                    { role: "", name: "", element: "" },
                    { role: "", name: "", element: "" },
                    { role: "", name: "", element: "" }
                ]
            }
        }
    },
    "Tartaglia": {
        color: "#267ea8",
        portraitOffset: -36,

        talents: {
            auto: 1,
            skill: 10,
            burst: 9
        },

        builds: {
            "DPS Évaporation inversée": {
                name: "DPS Évaporation inversée",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.6, "enerRech_": 0,

                    "pyro_dmg_": 0, "hydro_dmg_": 1, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "eleMas"],
                    "EQUIP_RING": ["hydro_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["NymphsDream:4"],
                goodSets: ["HeartOfDepth:4", "HeartOfDepth:2", "NymphsDream:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 100,

                team: [
                    { role: "Sub-DPS", name: "Xiangling", element: "pyro" },
                    { role: "Support", name: "Kazuha", element: "anemo" },
                    { role: "Support", name: "Bennett", element: "pyro" },
                ]
            },
            "DPS Électrocution": {
                name: "DPS Électrocution",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0,

                    "pyro_dmg_": 0, "hydro_dmg_": 1, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["hydro_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["NymphsDream:4"],
                goodSets: ["HeartOfDepth:4", "HeartOfDepth:2", "NymphsDream:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2"],

                er_req: 100,

                team: [
                    { role: "Sub-DPS", name: "Fischl", element: "electro" },
                    { role: "Sub-DPS", name: "Beidou", element: "electro" },
                    { role: "Support", name: "Bennett", element: "pyro" },
                ]
            },
            "DPS Gel": {
                name: "DPS Gel",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0,

                    "pyro_dmg_": 0, "hydro_dmg_": 1, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["hydro_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["NymphsDream:4", "MarechausseeHunter:4"],
                goodSets: ["HeartOfDepth:4", "HeartOfDepth:2", "NymphsDream:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2"],

                er_req: 100,

                team: [
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },
                    { role: "Sub-DPS", name: "Escoffier", element: "cryo" },
                    { role: "Support", name: "Citlali", element: "cryo" },
                ]
            }
        }
    },
    "Xinyan": {
        color: "#941f1f",
        portraitOffset: -37,

        talents: {
            auto: 1,
            skill: 10,
            burst: 1
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A4 : « ... Ça, c'est du rock ! »",
                        active: true,
                        stats: {
                            physical_dmg_: 0.15,
                        }
                    }
                ]
            },
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C6 : Rock infernal (uniquement les attaques chargées)",
                        cons: 6,
                        active: false,
                        stats: {
                            atk_bonus_scaling: {
                                source: "def",
                                percent: 0.50
                            }
                        }
                    }
                ]
            }
        ],

        builds: {
            "Shieldeuse générale": {
                name: "Shieldeuse générale",

                weights: {
                    "critRate_": 0.4, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 0, "hp": 0,
                    "def_": 1, "def": 0.8,
                    "eleMas": 0, "enerRech_": 0.3,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["def_"],
                    "EQUIP_RING": ["def_"],
                    "EQUIP_DRESS": ["def_"]
                },

                hideUIStats: ["heal_", "eleMas"],
                showUIStats: ["atk", "physical_dmg_"],

                bestSets: ["TenacityOfTheMillelith:4", "HuskOfOpulentDreams:4"],
                goodSets: ["HuskOfOpulentDreams:2"],

                er_req: 100,

                team: [
                    { role: "", name: "", element: "" },
                    { role: "", name: "", element: "" },
                    { role: "", name: "", element: "" }
                ]
            },
            "DPS physique": {
                name: "DPS physique",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.3,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 1,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["physical_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: ["heal_"],
                showUIStats: ["atk", "physical_dmg_"],

                bestSets: ["PaleFlame:4"],
                goodSets: ["PaleFlame:2", "BloodstainedChivalry:2", "BloodstainedChivalry:4", "GladiatorsFinale:4", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2"],

                er_req: 100,

                team: [
                    { role: "Sub-DPS", name: "Rosaria", element: "cryo" },
                    { role: "Sub-DPS", name: "Fischl", element: "electro" },
                    { role: "Support", name: "Bennett", element: "pyro" }
                ]
            },
            "DPS fonte": {
                name: "DPS fonte",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.6, "enerRech_": 0.3,

                    "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "eleMas"],
                    "EQUIP_RING": ["pyro_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: ["heal_"],
                showUIStats: ["atk", "physical_dmg_"],

                bestSets: ["Lavawalker:4"],
                goodSets: ["CrimsonWitchOfFlames:4", "CrimsonWitchOfFlames:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2","GladiatorsFinale:4"],

                er_req: 100,

                team: [
                    { role: "Support", name: "Citlali", element: "cryo" },
                    { role: "Support", name: "Xilonen", element: "geo" },
                    { role: "Support", name: "Bennett", element: "pyro" }
                ]
            }
        }
    },
    "Zhongli": {
        color: "#814b32",
        portraitOffset: -35,

        talents: {
            auto: 1,
            skill: 10,
            burst: 6
        },

        builds: {
            "Shielder général": {
                name: "Shielder général",

                weights: {
                    "critRate_": 0.4, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 1, "hp": 0.8,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.3,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["TenacityOfTheMillelith:4"],
                goodSets: ["TenacityOfTheMillelith:2", "VourukashasGlow:2", "NoblesseOblige:4"],

                er_req: 100,

                team: [
                    { role: "Flex", name: "", element: "geo" },
                    { role: "Flex", name: "", element: "geo" },
                    { role: "Flex", name: "", element: "geo" },
                ]
            }
        }
    },

    // 1.2
    "Albedo": {
        color: "#3e387f",
        portraitOffset: -36,

        talents: {
            auto: 1,
            skill: 8,
            burst: 8
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A4 : Sagesse en bouteille",
                        active: true,
                        stats: {
                            eleMas: 125,
                        }
                    }
                ]
            },
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C1 : Fleur d'Éden (Hexerei)",
                        cons: 1,
                        stats: {
                            def_: 0.50
                        }
                    }
                ]
            }
        ],

        builds: {
            "Sub-DPS Géo": {
                name: "Sub-DPS Géo",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.1, "atk": 0,
                    "hp_": 0, "hp": 0,
                    "def_": 0.8, "def": 0.1,
                    "eleMas": 0, "enerRech_": 0.1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 1, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["def_"],
                    "EQUIP_RING": ["geo_dmg_", "def_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: ["heal_"],
                showUIStats: ["atk"],

                bestSets: ["HuskOfOpulentDreams:4", "GoldenTroupe:4"],
                goodSets: ["HuskOfOpulentDreams:2", "GoldenTroupe:2"],

                er_req: 100,

                team: [
                    { role: "DPS", name: "Arlecchino", element: "pyro" },
                    { role: "Sub-DPS", name: "Durin", element: "pyro" },
                    { role: "Support", name: "Xilonen", element: "geo" },
                ]
            }
        }
    },
    "Ganyu": {
        color: "#6dc5ff",
        portraitOffset: -37,

        skins: {
            203701: {
                color: "#4e72e6",
                portraitOffset: -37
            }
        },

        talents: {
            auto: 10,
            skill: 6,
            burst: 8
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A1 : Cœur indivisible (uniquement les attaques chargées)",
                        active: false,
                        stats: {
                            critRate_: 0.20,
                        }
                    },
                    {
                        label: "A4 : Harmonie du ciel et de la terre",
                        active: true,
                        stats: {
                            elemental_dmg_: 0.20,
                        }
                    }
                ]
            },
        ],

        builds: {
            "DPS Gel": {
                name: "DPS Gel",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.3,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 1,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["cryo_dmg_", "atk_"],
                    "EQUIP_DRESS": ["critDMG_", "critRate_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["BlizzardStrayer:4", "MarechausseeHunter:4", "WanderersTroupe:4"],
                goodSets: ["BlizzardStrayer:2", "FinaleOfTheDeepGalleries:2", "MarechausseeHunter:2", "ShimenawasReminiscence:4", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2"],

                er_req: 110,

                team: [
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },
                    { role: "Sub-DPS", name: "Escoffier", element: "cryo" },
                    { role: "Support", name: "Shenhe", element: "cryo" },
                ]
            },
            "DPS Fonte": {
                name: "DPS Fonte",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.6, "enerRech_": 0,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 1,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "eleMas"],
                    "EQUIP_RING": ["cryo_dmg_", "atk_"],
                    "EQUIP_DRESS": ["critDMG_", "critRate_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["UnfinishedReverie:4", "BlizzardStrayer:4", "WanderersTroupe:4"],
                goodSets: ["BlizzardStrayer:2", "FinaleOfTheDeepGalleries:2", "MarechausseeHunter:2", "ShimenawasReminiscence:4", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2"],

                er_req: 100,

                team: [
                    { role: "Sub-DPS", name: "Emilie", element: "dendro" },
                    { role: "Sub-DPS", name: "Xiangling", element: "pyro" },
                    { role: "Support", name: "Bennett", element: "pyro" },
                ]
            }
        }
    },

    // 1.3
    "Hu Tao": {
        color: "#D33933",
        portraitOffset: -40,

        skins: {
            204601: {
                color: "#234bda",
                portraitOffset: -36
            }
        },

        talents: {
            auto: 10,
            skill: 10,
            burst: 8
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A4 : Sang bouillant",
                        active: true,
                        stats: {
                            pyro_dmg_: 0.33,
                        }
                    }
                ]
            },
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C6 : L'envol du papillon",
                        cons: 6,
                        active: false,
                        stats: {
                            critRate_: 1
                        }
                    }
                ]
            }
        ],

        builds: {
            "DPS Évaporation": {
                name: "DPS Évaporation",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.1, "atk": 0,
                    "hp_": 0.8, "hp": 0.1,
                    "def_": 0, "def": 0,
                    "eleMas": 0.6, "enerRech_": 0.1,

                    "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas", "hp_"],
                    "EQUIP_RING": ["pyro_dmg_", "hp_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                bestSets: ["CrimsonWitchOfFlames:4", "ShimenawasReminiscence:4", "MarechausseeHunter:4"],
                goodSets: ["CrimsonWitchOfFlames:2", "TenacityOfTheMillelith:2", "VourukashasGlow:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 120,

                team: [
                    { role: "Sub-DPS", name: "Yelan", element: "hydro" },
                    { role: "Sub-DPS", name: "Xingqiu", element: "hydro" },
                    { role: "Support", name: "Zhongli", element: "geo" },
                ]
            },
            "DPS Fonte": {
                name: "DPS Fonte",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.1, "atk": 0,
                    "hp_": 0.8, "hp": 0.1,
                    "def_": 0, "def": 0,
                    "eleMas": 0.6, "enerRech_": 0.1,

                    "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas", "hp_"],
                    "EQUIP_RING": ["pyro_dmg_", "hp_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                bestSets: ["CrimsonWitchOfFlames:4", "ShimenawasReminiscence:4", "MarechausseeHunter:4"],
                goodSets: ["CrimsonWitchOfFlames:2", "GildedDreams:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "TenacityOfTheMillelith:2", "VourukashasGlow:2"],

                er_req: 120,

                team: [
                    { role: "Support", name: "Rosaria", element: "cryo" },
                    { role: "Support", name: "Kazuha", element: "anemo" },
                    { role: "Support", name: "Citlali", element: "cryo" },
                ]
            }
        }
    },
    "Xiao": {
        color: "#3a9ba6",
        portraitOffset: -36,

        talents: {
            auto: 10,
            skill: 8,
            burst: 9
        },

        buffs: [
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C2 : Annihilation d'éon : Fleur du kaléidoscope (off-field)",
                        cons: 2,
                        stats: {
                            enerRech_: 0.25
                        }
                    },
                    {
                        label: "C4 : Transcendance : Extinction de la souffrance (PV inférieurs à 50%)",
                        cons: 4,
                        stats: {
                            def_: 1.00
                        }
                    }
                ]
            }
        ],

        builds: {
            "Hypercarry Plunge DPS": {
                name: "Hypercarry Plunge DPS",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.5,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 1, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["anemo_dmg_", "atk_"],
                    "EQUIP_DRESS": ["critDMG_", "critRate_"]
                },

                hideUIStats: ["heal_"],
                showUIStats: ["def"],

                bestSets: ["LongNightsOath:4", "VermillionHereafter:4"],
                goodSets: ["MarechausseeHunter:4", "DesertPavilionChronicle:4", "LongNightsOath:2", "ViridescentVenerer:2","DesertPavilionChronicle:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2"],

                er_req: 130,

                team: [
                    { role: "Support", name: "Faruzan", element: "anemo" },
                    { role: "Support", name: "Liuyun", element: "anemo" },
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },
                ]
            }
        }
    },

    // 1.4
    "Rosalia": {
        color: "#521240",
        portraitOffset: -37,

        talents: {
            auto: 1,
            skill: 6,
            burst: 10
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A1 : Confession forcée (compétence dans le dos)",
                        active: false,
                        stats: {
                            critRate_: 0.12,
                        }
                    }
                ]
            }
        ],

        builds: {
            "Sub-DPS fonte inversée": {
                name: "Sub-DPS fonte inversée",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.6, "enerRech_": 0.8,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 1,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas", "atk_", "enerRech_"],
                    "EQUIP_RING": ["cryo_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["GildedDreams:4"],
                goodSets: ["EmblemOfSeveredFate:4", "NoblesseOblige:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2","EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "BlizzardStrayer:2", "FinaleOfTheDeepGalleries:2"],

                er_req: 170,

                team: [
                    { role: "Support", name: "Bennett", element: "pyro" },
                    { role: "Support", name: "Kazuha", element: "anemo" },
                    { role: "Support", name: "Shenhe", element: "cryo" },
                ]
            },
            "Sub-DPS gel": {
                name: "Sub-DPS gel",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.8,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 1,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "enerRech_"],
                    "EQUIP_RING": ["cryo_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["BlizzardStrayer:4", "MarechausseeHunter:4"],
                goodSets: ["EmblemOfSeveredFate:4","NoblesseOblige:4","ScrollOfTheHeroOfCinderCity:4", "NoblesseOblige:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "BlizzardStrayer:2", "FinaleOfTheDeepGalleries:2"],

                er_req: 170,

                team: [
                    { role: "DPS", name: "SkirkNew", element: "cryo" },
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },
                    { role: "Sub-DPS", name: "Escoffier", element: "cryo" },
                ]
            }
        }
    },

    // 1.5
    "Eula": {
        color: "#63bce6",
        portraitOffset: -36,

        talents: {
            auto: 9,
            skill: 8,
            burst: 10
        },

        buffs: [
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C1 : Illusion des marées",
                        cons: 1,
                        stats: {
                            physical_dmg_: 0.30
                        }
                    }
                ]
            }
        ],

        builds: {
            "DPS Physique": {
                name: "DPS Physique",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.8,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 1,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "enerRech_"],
                    "EQUIP_RING": ["physical_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: ["heal_"],
                showUIStats: ["physical_dmg_"],

                bestSets: ["PaleFlame:4"],
                goodSets: ["GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "BloodstainedChivalry:2", "PaleFlame:2"],

                er_req: 140,

                team: [
                    { role: "Support", name: "Mika", element: "cryo" },
                    { role: "Support", name: "Diona", element: "cryo" },
                    { role: "Sub-DPS", name: "Fischl", element: "electro" }
                ]
            }
        }
    },
    "Yanfei": {
        color: "#a43347",
        portraitOffset: -32,

        talents: {
            auto: 10,
            skill: 8,
            burst: 9
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        category: "A1 - Dispositions supplémentaires",
                        selectMode: "cumulative",
                        buffs: [
                            {
                                label: "1 Sceau consommé (+5% DGT Pyro)",
                                stats: { pyro_dmg_: 0.05 }
                            },
                            {
                                label: "2 Sceaux consommés (+10% DGT Pyro)",
                                stats: { pyro_dmg_: 0.05 }
                            },
                            {
                                label: "3 Sceaux consommés (Max de base)",
                                stats: { pyro_dmg_: 0.05 }
                            },
                            {
                                label: "4 Sceaux consommés (Max C6)",
                                active: true,
                                stats: { pyro_dmg_: 0.05 }
                            }
                        ]
                    }
                ]
            },
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C2 : Verdict final (PV ennemi < 50% et uniquement attaques chargées)",
                        cons: 2,
                        active: false,
                        stats: {
                            critRate_: 0.20
                        }
                    }
                ]
            }
        ],

        builds: {
            "DPS Évaporation": {
                name: "DPS Évaporation",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.6, "enerRech_": 0.6,

                    "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "eleMas"],
                    "EQUIP_RING": ["pyro_dmg_", "atk_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["CrimsonWitchOfFlames:4", "MarechausseeHunter:4", "WanderersTroupe:4"],
                goodSets: ["GildedDreams:4", "ShimenawasReminiscence:4", "Lavawalker:4", "MarechausseeHunter:2", "CrimsonWitchOfFlames:2","WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2"],

                er_req: 120,

                team: [
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },
                    { role: "Sub-DPS", name: "Yelan", element: "hydro" },
                    { role: "Support", name: "Bennett", element: "pyro" }
                ]
            },
            "DPS Fonte": {
                name: "DPS Fonte",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.6, "enerRech_": 0.6,

                    "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "eleMas"],
                    "EQUIP_RING": ["pyro_dmg_", "atk_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["CrimsonWitchOfFlames:4", "WanderersTroupe:4"],
                goodSets: ["GildedDreams:4", "ShimenawasReminiscence:4", "Lavawalker:4", "MarechausseeHunter:2", "CrimsonWitchOfFlames:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 120,

                team: [
                    { role: "Support", name: "Citlali", element: "cryo" },
                    { role: "Support", name: "Xilonen", element: "geo" },
                    { role: "Support", name: "Bennett", element: "pyro" }
                ]
            },
            "DPS Surcharge": {
                name: "DPS Surcharge",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.6,

                    "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["pyro_dmg_", "atk_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["CrimsonWitchOfFlames:4", "WanderersTroupe:4"],
                goodSets: ["GildedDreams:4", "ShimenawasReminiscence:4", "Lavawalker:4", "MarechausseeHunter:2", "CrimsonWitchOfFlames:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2"],

                er_req: 120,

                team: [
                    { role: "Sub-DPS", name: "Fischl", element: "electro" },
                    { role: "Support", name: "Chevreuse", element: "pyro" },
                    { role: "Support", name: "Bennett", element: "pyro" }
                ]
            },
            "DPS Bourgeonnement": {
                name: "DPS Bourgeonnement",

                weights: {
                    "critRate_": 0, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 1, "enerRech_": 0.6,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas"],
                    "EQUIP_RING": ["eleMas"],
                    "EQUIP_DRESS": ["eleMas"]
                },

                hideUIStats: [],
                showUIStats: ["atk"],

                bestSets: ["GildedDreams:4", "FlowerOfParadiseLost:4"],
                goodSets: ["CrimsonWitchOfFlames:4", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 120,

                team: [
                    { role: "Sub-DPS", name: "Nahida", element: "dendro" },
                    { role: "Sub-DPS", name: "Xingqiu", element: "hydro" },
                    { role: "Support", name: "Kokomi", element: "hydro" }
                ]
            }
        }
    },

    // 1.6
    "Kaedehara Kazuha": {
        color: "#2c9c7f",
        portraitOffset: -36,

        talents: {
            auto: 1,
            skill: 6,
            burst: 8
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A4 : Haïku de la brise",
                        stats: {
                            elemental_dmg_bonus_scaling: {
                                source: "eleMas",
                                percent: 0.04
                            }
                        }
                    }
                ]
            },
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C2 : Zanshin des montagnes cruelles",
                        cons: 2,
                        stats: {
                            eleMas: 200
                        }
                    }
                ]
            }
        ],

        builds: {
            "Support général": {
                name: "Support général",

                weights: {
                    "critRate_": 0.4, "critDMG_": 0.4,
                    "atk_": 0.4, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 1, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas", "enerRech_"],
                    "EQUIP_RING": ["eleMas"],
                    "EQUIP_DRESS": ["eleMas"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["ViridescentVenerer:4"],
                goodSets: ["WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2"],

                er_req: 200,

                team: [
                    { role: "Flex", name: [], element: ["pyro", "cryo"] },
                    { role: "Flex", name: [], element: ["electro", "hydro"] },
                    { role: "Flex"},
                ]
            }
        }
    },

    // 2.0
    "Kamisato Ayaka": {
        color: "#71d0ff",
        portraitOffset: -36.5,

        skins: {
            200201: {
                color: "#9d897d",
                portraitOffset: -36.5
            }
        },

        talents: {
            auto: 9,
            skill: 8,
            burst: 10
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A4 : Bénédiction de Kanten Senmyou",
                        stats: {
                            elemental_dmg_: 0.18,
                        }
                    }
                ]
            },
        ],

        builds: {
            "DPS Gel": {
                name: "DPS Gel",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.6,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 1,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["cryo_dmg_"],
                    "EQUIP_DRESS": ["critDMG_", "critRate_", "atk_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["BlizzardStrayer:4", "MarechausseeHunter:4"],
                goodSets: ["BlizzardStrayer:2", "GladiatorsFinale:4", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "BlizzardStrayer:2", "FinaleOfTheDeepGalleries:2"],

                er_req: 140,

                team: [
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },
                    { role: "Sub-DPS", name: "Escoffier", element: "cryo" },
                    { role: "Flex", name: [""], element: ["cryo", "hydro"] }
                ]
            }
        }
    },
    "Yoimiya": {
        color: "#ff846d",
        portraitOffset: -37,

        talents: {
            auto: 10,
            skill: 10,
            burst: 6
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A1 : Tour de passe-passe",
                        active: true,
                        stats: {
                            pyro_dmg_: 0.20,
                        }
                    }
                ]
            },
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C1 : Agate Ryuukin",
                        cons: 1,
                        stats: {
                            atk_: 0.20
                        }
                    },
                    {
                        label: "C2 : Procession de feux de joie",
                        cons: 2,
                        stats: {
                            pyro_dmg_: 0.25
                        }
                    }
                ]
            }
        ],

        builds: {
            "DPS Évaporation": {
                name: "DPS Évaporation",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.6, "enerRech_": 0,

                    "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "eleMas"],
                    "EQUIP_RING": ["pyro_dmg_"],
                    "EQUIP_DRESS": ["critRate_","critDMG_"]
                },

                bestSets: ["ShimenawasReminiscence:4", "CrimsonWitchOfFlames:4"],
                goodSets: ["CrimsonWitchOfFlames:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2"],

                er_req: 100,

                team: [
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },
                    { role: "Sub-DPS", name: "Yelan", element: "hydro" },
                    { role: "Support", name: "Bennett", element: "pyro" },
                ]
            },
            "Fonte": {
                name: "Fonte",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.6, "enerRech_": 0,

                    "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "eleMas"],
                    "EQUIP_RING": ["pyro_dmg_"],
                    "EQUIP_DRESS": ["critRate_","critDMG_"]
                },

                bestSets: ["ShimenawasReminiscence:4", "CrimsonWitchOfFlames:4"],
                goodSets: ["CrimsonWitchOfFlames:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 100,

                team: [
                    { role: "Sub-DPS", name: "Rosaria", element: "cryo" },
                    { role: "Support", name: "Citlali", element: "cryo" },
                    { role: "Support", name: "Bennett", element: "pyro" },
                ]
            },
            "Surcharge": {
                name: "Surcharge",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0,

                    "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["pyro_dmg_"],
                    "EQUIP_DRESS": ["critRate_","critDMG_"]
                },

                bestSets: ["ShimenawasReminiscence:4", "GladiatorsFinale:4"],
                goodSets: ["CrimsonWitchOfFlames:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2"],

                er_req: 100,

                team: [
                    { role: "Sub-DPS", name: "Yae", element: "electro" },
                    { role: "Sub-DPS", name: "Fischl", element: "electro" },
                    { role: "Support", name: "Chevreuse", element: "pyro" },
                ]
            }
        }
    },
    "Sayu": {
        color: "#967866",
        portraitOffset: -42,

        talents: {
            auto: 1,
            skill: 9,
            burst: 9
        },

        builds: {
            "Burst support": {
                name: "Burst support",

                weights: {
                    "critRate_": 0.4, "critDMG_": 0,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.9, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 1
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["enerRech_", "atk_", "eleMas"],
                    "EQUIP_RING": ["atk_", "eleMas"],
                    "EQUIP_DRESS": ["heal_", "atk_", "eleMas", "criRate_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["ViridescentVenerer:4", "DeepwoodMemories:4"],
                goodSets: ["NoblesseOblige:4", "OceanHuedClam:4", "ViridescentVenerer:2","DesertPavilionChronicle:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 200,

                team: [
                    { role: "DPS", name: "Keqing", element: "electro" },
                    { role: "Sub-DPS", name: "Nahida", element: "dendro" },
                    { role: "Sub-DPS", name: "Fischl", element: "electro" }
                ]
            },
            "Driver dispersion": {
                name: "Driver dispersion",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.9, "enerRech_": 0,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 1, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "eleMas"],
                    "EQUIP_RING": ["anemo_dmg_", "eleMas"],
                    "EQUIP_DRESS": ["eleMas", "criRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["ViridescentVenerer:4", "DeepwoodMemories:4"],
                goodSets: ["NoblesseOblige:4", "OceanHuedClam:4", "ViridescentVenerer:2","DesertPavilionChronicle:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2"],

                er_req: 100,

                team: [
                    { role: "Sub-DPS", name: "Kaeya", element: "cryo" },
                    { role: "Sub-DPS", name: "Xiangling", element: "pyro" },
                    { role: "Support", name: "Bennett", element: "pyro" }
                ]
            }
        }
    },

    // 2.1
    "Shogun Raiden": {
        color: "#4A3294",
        portraitOffset: -33,

        talents: {
            auto: 1,
            skill: 8,
            burst: 10
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A4 : L'Illuminée",
                        stats: {
                            elemental_dmg_bonus_scaling: {
                                source: "enerRech_",
                                percent: 0.4,
                                baseline: 100
                            }
                        }
                    }
                ]
            }
        ],

        builds: {
            "DPS Électro": {
                name: "DPS Électro",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 1,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["enerRech_", "atk_"],
                    "EQUIP_RING": ["electro_dmg_", "atk_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["EmblemOfSeveredFate:4"],
                goodSets: ["MarechausseeHunter:4", "GildedDreams:4", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "ThunderingFury:2"],

                er_req: 280,

                team: [
                    { role: "Sub-DPS", name: "Xiangling", element: "pyro" },
                    { role: "Sub-DPS", name: "Xingqiu", element: "hydro" },
                    { role: "Support", name: "Bennett", element: "pyro" },
                ]
            },
            "Exubérance": {
                name: "Exubérance",

                weights: {
                    "critRate_": 0, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 1, "enerRech_": 0,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas"],
                    "EQUIP_RING": ["eleMas"],
                    "EQUIP_DRESS": ["eleMas"]
                },

                hideUIStats: [],
                showUIStats: ["atk"],

                bestSets: ["FlowerOfParadiseLost:4", "GildedDreams:4"],
                goodSets: ["WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "DeepwoodMemories:4"],

                er_req: 100,

                team: [
                    { role: "Sub-DPS", name: "Yelan", element: "hydro" },
                    { role: "Sub-DPS", name: "Xingqiu", element: "hydro" },
                    { role: "Support", name: "Baizhuer", element: "dendro" },
                ]
            }
        }
    },
    "Sangonomiya Kokomi": {
        color: "#858fff",
        portraitOffset: -36,

        talents: {
            auto: 1,
            skill: 8,
            burst: 8
        },

        buffs: [
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C6 : Sango Isshin",
                        cons: 6,
                        stats: {
                            elemental_dmg_ : 0.4,
                        }
                    }
                ]
            }
        ],

        builds: {
            "Healeuse générale": {
                name: "Healeuse générale",

                weights: {
                    "critRate_": 0, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 1, "hp": 0.8,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 1
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["hp_", "enerRech_"],
                    "EQUIP_RING": ["hp_"],
                    "EQUIP_DRESS": ["heal_", "hp_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["OceanHuedClam:4", "TenacityOfTheMillelith:4"],
                goodSets: ["MaidenBeloved:4", "MaidenBeloved:2", "OceanHuedClam:2", "SongOfDaysPast:2", "TenacityOfTheMillelith:2", "VourukashasGlow:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2"],

                er_req: 200,

                team: [
                    { role: "Flex", name: "", element: "hydro" },
                    { role: "Flex", name: "", element: "hydro" },
                    { role: "Flex", name: "", element: "hydro" },
                ]
            },
            "Driver Fleurissement": {
                name: "Driver Fleurissement",

                weights: {
                    "critRate_": 0, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 0.8, "hp": 0.1,
                    "def_": 0, "def": 0,
                    "eleMas": 1, "enerRech_": 0.8,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 1
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas", "enerRech_", "hp_"],
                    "EQUIP_RING": ["eleMas", "hp_"],
                    "EQUIP_DRESS": ["eleMas","heal_", "hp_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["FlowerOfParadiseLost:4", "GildedDreams:4"],
                goodSets: ["WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 200,

                team: [
                    { role: "Support", name: "Nilou", element: "hydro" },
                    { role: "Sub-DPS", name: "Lauma", element: "dendro" },
                    { role: "Support", name: "Nahida", element: "dendro" },
                ]
            },

        }
    },
    "Kujou Sara": {
        color: "#712eac",
        portraitOffset: -37,

        talents: {
            auto: 1,
            skill: 8,
            burst: 8
        },

        buffs: [
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C6 : Péché d'orgueil (uniquement les dégâts électro)",
                        cons: 6,
                        active: false,
                        stats: {
                            critDMG_: 0.60
                        }
                    }
                ]
            }
        ],

        builds: {
            "Buffeuse électro": {
                name: "Buffeuse électro",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.5,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 1,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "enerRech_"],
                    "EQUIP_RING": ["electro_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["EmblemOfSeveredFate:4", "NoblesseOblige:4"],
                goodSets: ["TenacityOfTheMillelith:4", "NoblesseOblige:2", "ThunderingFury:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2"],

                er_req: 180,

                team: [
                    { role: "DPS", name: "Shougun", element: "electro" },
                    { role: "Support", name: "Kazuha", element: "anemo" },
                    { role: "Support", name: "Bennett", element: "pyro" }
                ]
            }
        }
    },

    // 2.2
    "Thomas": {
        color: "#922533",
        portraitOffset: -36,

        talents: {
            auto: 1,
            skill: 9,
            burst: 9
        },

        builds: {
            "Shielder général": {
                name: "Shielder général",

                weights: {
                    "critRate_": 0.4, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 1, "hp": 0.8,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.8,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["hp_", "enerRech_"],
                    "EQUIP_RING": ["hp_"],
                    "EQUIP_DRESS": ["hp_", "critRate_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["NoblesseOblige:4"],
                goodSets: ["TenacityOfTheMillelith:2", "VourukashasGlow:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2"],

                er_req: 200,

                team: [
                    { role: "", name: "", element: "" },
                    { role: "", name: "", element: "" },
                    { role: "", name: "", element: "" }
                ]
            },
            "Sub-DPS bourgeonnement": {
                name: "Sub-DPS bourgeonnement",

                weights: {
                    "critRate_": 0.4, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 0.4, "hp": 0.1,
                    "def_": 0, "def": 0,
                    "eleMas": 1, "enerRech_": 0.8,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas","hp_", "enerRech_"],
                    "EQUIP_RING": ["eleMas", "hp_"],
                    "EQUIP_DRESS": ["eleMas", "hp_", "critRate_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["FlowerOfParadiseLost:4", "GildedDreams:4"],
                goodSets: ["CrimsonWitchOfFlames:4", "TenacityOfTheMillelith:2", "VourukashasGlow:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "WanderersTroupe:2", "GildedDreams:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2"],

                er_req: 200,

                team: [
                    { role: "Support", name: "Baizhuer", element: "dendro" },
                    { role: "Sub-DPS", name: "Yelan", element: "hydro" },
                    { role: "Sub-DPS", name: "Xingqiu", element: "hydro" }
                ]
            }
        }
    },
    "Aloy": {
        color: "#479ab4",
        portraitOffset: -32,

        talents: {
            auto: 8,
            skill: 9,
            burst: 10
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A1 : Surcharge offensive",
                        active: true,
                        stats: {
                            atk_: 0.16,
                        }
                    },
                    {
                        label: "A4 : Frappe puissante",
                        active: true,
                        stats: {
                            elemental_dmg_: 0.35,
                        }
                    }
                ]
            }
        ],

        builds: {
            "DPS Fonte": {
                name: "DPS Fonte",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.6, "enerRech_": 0.4,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 1,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas", "atk_", "enerRech_"],
                    "EQUIP_RING": ["cryo_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["EmblemOfSeveredFate:4", "GildedDreams:4"],
                goodSets: ["Lavawalker:4", "NoblesseOblige:2", "BlizzardStrayer:2", "FinaleOfTheDeepGalleries:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 140,

                team: [
                    { role: "Sub-DPS", name: "Xiangling", element: "pyro" },
                    { role: "Support", name: "Kazuha", element: "anemo" },
                    { role: "Support", name: "Bennett", element: "pyro" },
                ]
            },
            "DPS Gel": {
                name: "DPS Gel",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.4,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 1,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "enerRech_"],
                    "EQUIP_RING": ["cryo_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["NoblesseOblige:4", "BlizzardStrayer:4", "MarechausseeHunter:4"],
                goodSets: ["GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "BlizzardStrayer:2", "FinaleOfTheDeepGalleries:2", "NoblesseOblige:2"],

                er_req: 120,

                team: [
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },
                    { role: "Sub-DPS", name: "Escoffier", element: "cryo" },
                    { role: "Support", name: "Citlali", element: "cryo" },
                ]
            }
        }
    },

    // 2.3
    "Arataki Itto": {
        color: "#7F473A",
        portraitOffset: -39,

        talents: {
            auto: 10,
            skill: 8,
            burst: 9
        },

        buffs: [
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C4 : Au pain sec et à l'eau !",
                        cons: 4,
                        active: true,
                        stats: {
                            def_: 0.20,
                            atk_: 0.20
                        }
                    },
                    {
                        label: "C6 : Arataki Itto, présent !",
                        cons: 6,
                        active: true,
                        stats: {
                            critDMG_: 0.70
                        }
                    }
                ]
            }
        ],

        builds: {
            "DPS Géo": {
                name: "DPS Géo",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0, "atk": 0,
                    "hp_": 0, "hp": 0,
                    "def_": 0.8, "def": 0.1,
                    "eleMas": 0, "enerRech_": 0.8,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 1, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["def_"],
                    "EQUIP_RING": ["geo_dmg_", "def_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["HuskOfOpulentDreams:4"],
                goodSets: ["RetracingBolide:4", "HuskOfOpulentDreams:2", "ArchaicPetra:2"],

                er_req: 140,

                team: [
                    { role: "Sub-DPS", name: "Albedo", element: "geo" },
                    { role: "Support", name: "Gorou", element: "geo" },
                    { role: "Support", name: "Zhongli", element: "geo" },
                ]
            },
            "DPS Sélénocristallisation": {
                name: "DPS Sélénocristallisation",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0, "atk": 0,
                    "hp_": 0, "hp": 0,
                    "def_": 0.8, "def": 0.1,
                    "eleMas": 0.5, "enerRech_": 0.8,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 1, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["def_"],
                    "EQUIP_RING": ["geo_dmg_", "def_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["HuskOfOpulentDreams:4", "NightOfTheSkysUnveiling:4"],
                goodSets: ["RetracingBolide:4", "HuskOfOpulentDreams:2", "ArchaicPetra:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 140,

                team: [
                    { role: "Sub-DPS", name: "Columbina", element: "hydro" },
                    { role: "Support", name: "Gorou", element: "geo" },
                    { role: "Sub-DPS", name: "Linnea", element: "geo" },
                ]
            }
        }
    },
    "Gorou": {
        color: "#7a4e28",
        portraitOffset: -37,

        talents: {
            auto: 1,
            skill: 10,
            burst: 6
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A1 : Nonchalance du vent et de la pluie",
                        active: true,
                        stats: {
                            def_: 0.25,
                        }
                    }
                ]
            },
            {
                category: "Constellations",
                selectMode: "exclusive",
                buffs: [
                    {
                        label: "C6 : Vaillance de la bête (1 Géo / Pied ferme)",
                        cons: 6,
                        active: false,
                        stats: { critDMG_: 0.10 }
                    },
                    {
                        label: "C6 : Vaillance de la bête (2 Géo / Imprenabilité)",
                        cons: 6,
                        active: false,
                        stats: { critDMG_: 0.20 }
                    },
                    {
                        label: "C6 : Vaillance de la bête (3 Géo+ / Fracas)",
                        cons: 6,
                        active: true,
                        stats: { critDMG_: 0.40 }
                    }
                ]
            }
        ],

        builds: {
            "Support Géo": {
                name: "Support Géo",

                weights: {
                    "critRate_": 0.4, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 0, "hp": 0,
                    "def_": 0.4, "def": 0.1,
                    "eleMas": 0, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["enerRech_"],
                    "EQUIP_RING": ["def_"],
                    "EQUIP_DRESS": ["critRate_", "def_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["ScrollOfTheHeroOfCinderCity:4", "TheExile:4"],
                goodSets: ["NoblesseOblige:4", "Instructor:4", "SilkenMoonsSerenade:4", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2"],

                er_req: 220,

                team: [
                    { role: "DPS", name: "Itto", element: "geo" },
                    { role: "Sub-DPS", name: "Chiori", element: "geo" },
                    { role: "Support", name: "Zhongli", element: "geo" }
                ]
            }
        }
    },

    // 2.4
    "Shenhe": {
        color: "#a1c4ff",
        portraitOffset: -36,

        skins: {
            206301: {
                color: "#b1e5ff",
                portraitOffset: -34
            }
        },

        talents: {
            auto: 1,
            skill: 10,
            burst: 9
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A1 : Étreinte divine",
                        stats: {
                            elemental_dmg_: 0.15,
                        }
                    }
                ]
            },
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C2 : Esprit centré (uniquement dégâts cryo)",
                        cons: 2,
                        stats: {
                            critDMG_: 0.15,
                        }
                    }
                ]
            }
        ],

        builds: {
            "Support Cryo": {
                name: "Support Cryo",

                weights: {
                    "critRate_": 0, "critDMG_": 0,
                    "atk_": 1, "atk": 0.8,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "enerRech_"],
                    "EQUIP_RING": ["atk_"],
                    "EQUIP_DRESS": ["atk_", "critRate_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["NoblesseOblige:4", "ScrollOfTheHeroOfCinderCity:4"],
                goodSets: ["GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2"],

                er_req: 180,

                team: [
                    { role: "DPS", name: "SkirkNew", element: "cryo" },
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },
                    { role: "Sub-DPS", name: "Escoffier", element: "cryo" },
                ]
            }
        }
    },
    "Yun Jin": {
        color: "#48308d",
        portraitOffset: -36,

        talents: {
            auto: 1,
            skill: 1,
            burst: 10
        },

        buffs: [
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C4 : Le tranchant d'une fleur",
                        cons: 4,
                        stats: {
                            def_: 0.20
                        }
                    }
                ]
            }
        ],

        builds: {
            "Support universel": {
                name: "Support universel",

                weights: {
                    "critRate_": 0.4, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 0, "hp": 0,
                    "def_": 1, "def": 0.8,
                    "eleMas": 0, "enerRech_": 0.8,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["def_", "enerRech_"],
                    "EQUIP_RING": ["def_"],
                    "EQUIP_DRESS": ["def_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["HuskOfOpulentDreams:4", "NoblesseOblige:4"],
                goodSets: ["ArchaicPetra:4", "ScrollOfTheHeroOfCinderCity:4", "HuskOfOpulentDreams:2", "ScrollOfTheHeroOfCinderCity:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2"],

                er_req: 200,

                team: [
                    { role: "", name: "", element: "" },
                    { role: "", name: "", element: "" },
                    { role: "", name: "", element: "" }
                ]
            }
        }
    },

    // 2.5
    "Yae Miko": {
        color: "#f49dff",
        portraitOffset: -34,

        talents: {
            auto: 6,
            skill: 10,
            burst: 8
        },

        buffs: [
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C4 : Canalisation de sakura",
                        cons: 4,
                        stats: {
                            elemental_dmg_: 0.20
                        }
                    }
                ]
            }
        ],

        builds: {
            "Sub-DPS Suractivation": {
                name: "Sub-DPS Suractivation",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.8, "enerRech_": 0.5,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 1,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "eleMas"],
                    "EQUIP_RING": ["electro_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["EmblemOfSeveredFate:4", "GoldenTroupe:4", "GildedDreams:4"],
                goodSets: ["MarechausseeHunter:4", "LongNightsOath:4", "GoldenTroupe:2", "TenacityOfTheMillelith:4", "Instructor:4", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "ThunderingFury:2"],

                er_req: 140,

                team: [
                    { role: "DPS", name: "Shougun", element: "electro" },
                    { role: "Support", name: "Yaoyao", element: "dendro" },
                    { role: "Support", name: "Sucrose", element: "anemo" },
                ]
            }
        }
    },

    // 2.6
    "Kamisato Ayato": {
        color: "#428de7",
        portraitOffset: -34,

        talents: {
            auto: 1,
            skill: 10,
            burst: 8
        },

        buffs: [
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C2 : Source du monde",
                        cons: 2,
                        stats: {
                            hp_: 0.50
                        }
                    }
                ]
            }
        ],

        builds: {
            "DPS Hydro": {
                name: "DPS Hydro",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0.4, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.4,

                    "pyro_dmg_": 0, "hydro_dmg_": 1, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["hydro_dmg_"],
                    "EQUIP_DRESS": ["critDMG_", "critRate_"]
                },

                hideUIStats: ["heal_"],
                showUIStats: ["hp"],

                bestSets: ["HeartOfDepth:4", "GladiatorsFinale:4", "NymphsDream:4"],
                goodSets: ["EchoesOfAnOffering:4", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "HeartOfDepth:2", "NymphsDream:2"],

                er_req: 120,

                team: [
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },
                    { role: "Support", name: "Yunjin", element: "geo" },
                    { role: "Support", name: "Xilonen", element: "geo" },
                ]
            },
            "DPS Gel": {
                name: "DPS Gel",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0.4, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.4,

                    "pyro_dmg_": 0, "hydro_dmg_": 1, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["hydro_dmg_"],
                    "EQUIP_DRESS": ["critDMG_", "critRate_"]
                },

                hideUIStats: ["heal_"],
                showUIStats: ["hp"],

                bestSets: ["HeartOfDepth:4", "GladiatorsFinale:4", "NymphsDream:4", "MarechausseeHunter:4"],
                goodSets: ["EchoesOfAnOffering:4", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "HeartOfDepth:2", "NymphsDream:2"],

                er_req: 120,

                team: [
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },
                    { role: "Sub-DPS", name: "Escoffier", element: "cryo" },
                    { role: "Flex", name: ["Yelan", "Citlali"], element: ["hydro", "cryo"]},
                ]
            },
            "DPS Exubérance": {
                name: "DPS Exubérance",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0.4, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.6,

                    "pyro_dmg_": 0, "hydro_dmg_": 1, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "enerRech_"],
                    "EQUIP_RING": ["hydro_dmg_"],
                    "EQUIP_DRESS": ["critDMG_", "critRate_"]
                },

                hideUIStats: ["heal_"],
                showUIStats: ["hp"],

                bestSets: ["HeartOfDepth:4", "GladiatorsFinale:4", "NymphsDream:4"],
                goodSets: ["EchoesOfAnOffering:4", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "HeartOfDepth:2", "NymphsDream:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2"],

                er_req: 140,

                team: [
                    { role: "Sub-DPS", name: "Shinobu", element: "electro" },
                    { role: "Support", name: "Nahida", element: "dendro" },
                    { role: "Sub-DPS", name: "Fischl", element: "electro" },
                ]
            },
            "Driver Fleurissement": {
                name: "Driver Fleurissement",

                weights: {
                    "critRate_": 0, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 1, "enerRech_": 0.8,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas"],
                    "EQUIP_RING": ["eleMas"],
                    "EQUIP_DRESS": ["eleMas"]
                },

                hideUIStats: ["heal_"],
                showUIStats: ["hp", "atk"],

                bestSets: ["FlowerOfParadiseLost:4", "GildedDreams:4"],
                goodSets: ["WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 170,

                team: [
                    { role: "Support", name: "Nilou", element: "hydro" },
                    { role: "Flex", name: ["Lauma", "Nahida"], element: ["dendro", "dendro"] },
                    { role: "Support", name: "Baizhuer", element: "dendro" },
                ]
            },
            "DPS Électrocution": {
                name: "DPS Électrocution",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0.4, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.4,

                    "pyro_dmg_": 0, "hydro_dmg_": 1, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["hydro_dmg_"],
                    "EQUIP_DRESS": ["critDMG_", "critRate_"]
                },

                hideUIStats: ["heal_"],
                showUIStats: ["hp"],

                bestSets: ["HeartOfDepth:4", "GladiatorsFinale:4", "NymphsDream:4"],
                goodSets: ["EchoesOfAnOffering:4", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "HeartOfDepth:2", "NymphsDream:2"],

                er_req: 120,

                team: [
                    { role: "Sub-DPS", name: "Fischl", element: "electro" },
                    { role: "Sub-DPS", name: "Ineffa", element: "electro" },
                    { role: "Support", name: "Sucrose", element: "anemo" },
                ]
            },
            "DPS Évaporation": {
                name: "DPS Évaporation",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0.4, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.6, "enerRech_": 0.4,

                    "pyro_dmg_": 0, "hydro_dmg_": 1, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "eleMas"],
                    "EQUIP_RING": ["hydro_dmg_"],
                    "EQUIP_DRESS": ["critDMG_", "critRate_"]
                },

                hideUIStats: ["heal_"],
                showUIStats: ["hp"],

                bestSets: ["HeartOfDepth:4", "GladiatorsFinale:4", "NymphsDream:4"],
                goodSets: ["EchoesOfAnOffering:4", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "HeartOfDepth:2", "NymphsDream:2"],

                er_req: 120,

                team: [
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },
                    { role: "Sub-DPS", name: "Xiangling", element: "pyro" },
                    { role: "Support", name: "Bennett", element: "pyro" },
                ]
            }
        }
    },

    // 2.7
    "Kuki Shinobu": {
        color: "#55267b",
        portraitOffset: -37,

        talents: {
            auto: 1,
            skill: 10,
            burst: 6
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A1 : Désir libérateur (PV <= 50%)",
                        active: true,
                        stats: {
                            heal_: 0.15
                        }
                    }
                ]
            },
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C6 : Pour parer à la faiblesse (PV <= 25%)",
                        cons: 6,
                        stats: {
                            eleMas: 150
                        }
                    }
                ]
            }
        ],

        builds: {
            "Sub-DPS Exubérance": {
                name: "Sub-DPS Exubérance",

                weights: {
                    "critRate_": 0, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 0.4, "hp": 0.1,
                    "def_": 0, "def": 0,
                    "eleMas": 1, "enerRech_": 0.4,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas"],
                    "EQUIP_RING": ["eleMas"],
                    "EQUIP_DRESS": ["eleMas"]
                },

                hideUIStats: [],
                showUIStats: ["hp"],

                bestSets: ["FlowerOfParadiseLost:4"],
                goodSets: ["GildedDreams:4", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "ThunderingFury:4", "DeepwoodMemories:4"],

                er_req: 130,

                team: [
                    { role: "DPS", name: "Alhatham", element: "dendro" },
                    { role: "Sub-DPS", name: "Nahida", element: "dendro" },
                    { role: "Flex", name: ["Yelan", "Xingqiu"], element: ["hydro", "hydro"] }
                ]
            },
            "Sub-DPS Propagation": {
                name: "Sub-DPS Propagation",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0, "atk": 0,
                    "hp_": 0.4, "hp": 0.1,
                    "def_": 0, "def": 0,
                    "eleMas": 0.8, "enerRech_": 0.6,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 1,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas"],
                    "EQUIP_RING": ["eleMas", "electro_dmg_"],
                    "EQUIP_DRESS": ["eleMas", "critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: ["hp"],

                bestSets: ["GoldenTroupe:4", "TenacityOfTheMillelith:4"],
                goodSets: ["ScrollOfTheHeroOfCinderCity:4", "DeepwoodMemories:4", "Instructor:4", "NoblesseOblige:4", "EmblemOfSeveredFate:4", "ThunderingFury:4", "GildedDreams:4", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 130,

                team: [
                    { role: "DPS", name: "Shougun", element: "electro" },
                    { role: "Sub-DPS", name: "Nahida", element: "dendro" },
                    { role: "Support", name: "Kazuha", element: "anemo" },
                ]
            }
        }
    },
    "Yelan": {
        color: "#4a5be1",
        portraitOffset: -38,

        skins: {
            206001: {
                color: "#4a5be1",
                portraitOffset: -38
            }
        },

        talents: {
            auto: 1,
            skill: 6,
            burst: 10
        },

        buffs: [
            {
                category: "Passifs",
                selectMode: "exclusive",
                buffs: [
                    {
                        label: "A1 : Contrôle stratégique (1 type élémentaire différent)",
                        active: false,
                        stats: {
                            hp_: 0.06,
                        }
                    },
                    {
                        label: "A1 : Contrôle stratégique (2 types élémentaires différents)",
                        active: false,
                        stats: {
                            hp_: 0.12,
                        }
                    },
                    {
                        label: "A1 : Contrôle stratégique (3 types élémentaires différents)",
                        active: false,
                        stats: {
                            hp_: 0.18,
                        }
                    },
                    {
                        label: "A1 : Contrôle stratégique (4 types élémentaires différents)",
                        active: true,
                        stats: {
                            hp_: 0.30,
                        }
                    }
                ]
            },
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C4 : Tour de passe-passe",
                        cons: 4,
                        stats: {
                            hp_: 0.40
                        }
                    }
                ]
            }
        ],

        builds: {
            "Sub-DPS Exubérance": {
                name: "Sub-DPS Exubérance",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0, "atk": 0,
                    "hp_": 0.9, "hp": 0.1,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 1, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["enerRech_", "hp_"],
                    "EQUIP_RING": ["hydro_dmg_","hp_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                bestSets: ["EmblemOfSeveredFate:4", "NoblesseOblige:4"],
                goodSets: ["EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "NoblesseOblige:2", "TenacityOfTheMillelith:2", "VourukashasGlow:2", "HeartOfDepth:2", "NymphsDream:2"],

                er_req: 200,

                team: [
                    { role: "DPS", name: "Alhatham", element: "dendro" },
                    { role: "Support", name: "Nahida", element: "dendro" },
                    {
                        role: "Flex",
                        name: ["Shinobu", "Shougun"],
                        element: ["electro", "electro"]
                    }
                ]
            },
            "Sub-DPS Gel": {
                name: "Sub-DPS Gel",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0, "atk": 0,
                    "hp_": 0.9, "hp": 0.1,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 1, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["enerRech_", "hp_"],
                    "EQUIP_RING": ["hydro_dmg_","hp_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                bestSets: ["EmblemOfSeveredFate:4", "NoblesseOblige:4"],
                goodSets: ["EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "NoblesseOblige:2", "TenacityOfTheMillelith:2", "VourukashasGlow:2", "HeartOfDepth:2", "NymphsDream:2"],

                er_req: 170,

                team: [
                    { role: "DPS", name: "SkirkNew", element: "cryo" },
                    { role: "Support", name: "Furina", element: "hydro" },
                    {
                        role: "Sub-DPS",
                        name: "Escoffier",
                        element: "cryo"
                    }
                ]
            },
            "Sub-DPS Évaporation": {
                name: "Sub-DPS Évaporation",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0, "atk": 0,
                    "hp_": 0.8, "hp": 0.1,
                    "def_": 0, "def": 0,
                    "eleMas": 0.6, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 1, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["enerRech_", "hp_"],
                    "EQUIP_RING": ["hydro_dmg_","hp_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                bestSets: ["EmblemOfSeveredFate:4", "NoblesseOblige:4"],
                goodSets: ["EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "NoblesseOblige:2", "TenacityOfTheMillelith:2", "VourukashasGlow:2", "HeartOfDepth:2", "NymphsDream:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 170,

                team: [
                    { role: "DPS", name: "Hutao", element: "pyro" },
                    { role: "Support", name: "Zhongli", element: "geo" },
                    {
                        role: "Sub-DPS",
                        name: "Xingqiu",
                        element: "hydro"
                    }
                ]
            }
        }
    },

    // 2.8
    "Shikanoin Heizou": {
        color: "#852f47",
        portraitOffset: -37,

        talents: {
            auto: 9,
            skill: 10,
            burst: 8
        },

        buffs: [
            {
                category: "Constellations",
                selectMode: "cumulative",
                buffs: [
                    {
                        label: "C6 : Registre curieux (1 cumul - Compétence)",
                        cons: 6,
                        active: false,
                        stats: { critRate_: 0.04 }
                    },
                    {
                        label: "C6 : Registre curieux (2 cumuls - Compétence)",
                        cons: 6,
                        active: false,
                        stats: { critRate_: 0.04 }
                    },
                    {
                        label: "C6 : Registre curieux (3 cumuls - Compétence)",
                        cons: 6,
                        active: false,
                        stats: { critRate_: 0.04 }
                    },
                    {
                        label: "C6 : Registre curieux (4 cumuls + Conviction)",
                        cons: 6,
                        active: false,
                        stats: { critRate_: 0.04, critDMG_: 0.32 }
                    }
                ]
            }
        ],

        builds: {
            "DPS Anémo": {
                name: "DPS Anémo",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.4,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 1, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "enerRech_"],
                    "EQUIP_RING": ["anemo_dmg_", "atk_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["ViridescentVenerer:4", "ViridescentVenerer:2","DesertPavilionChronicle:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2"],
                goodSets: ["Lavawalker:4"],

                er_req: 150,

                team: [
                    { role: "Support", name: "Faruzan", element: "anemo" },
                    { role: "Sub-DPS", name: "Xiangling", element: "pyro" },
                    { role: "Support", name: "Bennett", element: "pyro" },
                ]
            }
        }
    },

    // 3.0
    "Tighnari": {
        color: "#36AE61",
        portraitOffset: -37,

        talents: {
            auto: 10,
            skill: 6,
            burst: 8
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A1 : Vue aiguë",
                        active: true,
                        stats: {
                            eleMas: 50,
                        }
                    }
                ]
            },
            {
                category: "Constellation 1 : Début déterminé à la racine",
                buffs: [
                    {
                        label: "Concerne uniquement les attaques chargées",
                        cons: 1,
                        active: false,
                        stats: {
                            critRate_: 0.15
                        }
                    }
                ]
            },
            {
                category: "Constellation 2 : Origine connue dans la tige",
                buffs: [
                    {
                        label: "Lorsqu'un ennemi est dans la compétence élémentaire",
                        cons: 2,
                        stats: {
                            elemental_dmg_: 0.20
                        }
                    }
                ]
            },
            {
                category: "Constellation 4 : Flétrissement entrevu grâce aux feuilles",
                selectMode: "cumulative",
                buffs: [
                    {
                        label: "Lorsque le déchaînement élémentaire est utilisé",
                        cons: 4,
                        stats: {
                            eleMas: 60
                        }
                    },
                    {
                        label: "Si une réaction liée à l'élément dendro est déclenchée",
                        cons: 4,
                        stats: {
                            eleMas: 60
                        }
                    }
                ]
            }
        ],

        builds: {
            "DPS Propagation": {
                name: "Propagation",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 1, "enerRech_": 0.5,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 1, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas", "atk_"],
                    "EQUIP_RING": ["dendro_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["DeepwoodMemories:4", "WanderersTroupe:4", "GildedDreams:4"],
                goodSets: ["DeepwoodMemories:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2"],

                er_req: 130,

                team: [
                    { role: "Sub-DPS", name: "Yae", element: "electro" },
                    { role: "Sub-DPS", name: "Fischl", element: "electro" },
                    { role: "Support", name: "Yaoyao", element: "dendro" },
                ]
            }
        }
    },
    "Collei": {
        color: "#86933b",
        portraitOffset: -35,

        talents: {
            auto: 1,
            skill: 6,
            burst: 10
        },

        buffs: [
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C1 : Patrouille sylvestre (off-field)",
                        cons: 1,
                        active: true,
                        stats: {
                            enerRech_: 0.20
                        }
                    }
                ]
            }
        ],

        builds: {
            "Sub-DPS général": {
                name: "Sub-DPS général",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.8, "enerRech_": 0.5,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 1, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["enerRech_", "eleMas", "atk_"],
                    "EQUIP_RING": ["dendro_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["DeepwoodMemories:4", "ScrollOfTheHeroOfCinderCity:4", "Instructor:4","GildedDreams:4" ],
                goodSets: ["DeepwoodMemories:2", "ScrollOfTheHeroOfCinderCity:2","WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2"],

                er_req: 200,

                team: [
                    { role: "DPS", name: "Shougun", element: "electro" },
                    { role: "Sub-DPS", name: "Fischl", element: "electro" },
                    { role: "Support", name: "Xilonen", element: "geo" },
                ]
            },
            "Driver fleurissement": {
                name: "Driver fleurissement",

                weights: {
                    "critRate_": 0.4, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 1, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["enerRech_", "eleMas"],
                    "EQUIP_RING": ["eleMas"],
                    "EQUIP_DRESS": ["critRate_", "eleMas"]
                },

                hideUIStats: [],
                showUIStats: ["atk"],

                bestSets: ["FlowerOfParadiseLost:4","DeepwoodMemories:4", "ScrollOfTheHeroOfCinderCity:4", "Instructor:4","GildedDreams:4" ],
                goodSets: ["DeepwoodMemories:2", "ScrollOfTheHeroOfCinderCity:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2"],

                er_req: 200,

                team: [
                    { role: "Support", name: "Nilou", element: "hydro" },
                    { role: "Sub-DPS", name: "Nahida", element: "dendro" },
                    { role: "Support", name: "Kokomi", element: "hydro" },
                ]
            }
        }
    },
    "Dori": {
        color: "#9774cd",
        portraitOffset: -37,

        talents: {
            auto: 1,
            skill: 8,
            burst: 8
        },

        buffs: [
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C4 : Supplément discrétionnaire (si ER < 50%)",
                        cons: 4,
                        active: false,
                        stats: {
                            enerRech_: 0.30
                        }
                    }
                ]
            }
        ],

        builds: {
            "Driver Suractivation": {
                name: "Driver Suractivation",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.8, "enerRech_": 0.6,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 1,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas", "enerRech_"],
                    "EQUIP_RING": ["electro_dmg_", "eleMas"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["GildedDreams:4", "ThunderingFury:4"],
                goodSets: ["Thundersoother:4", "NoblesseOblige:4", "DeepwoodMemories:4", "OceanHuedClam:4", "Instructor:4", "TheExile:4", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "MaidenBeloved:2", "OceanHuedClam:2", "SongOfDaysPast:2"],

                er_req: 140,

                team: [
                    { role: "Sub-DPS", name: "Fischl", element: "electro" },
                    { role: "Sub-DPS", name: "Nahida", element: "dendro" },
                    { role: "Support", name: "Kazuha", element: "anemo" },
                ]
            },
            "Driver Exubérance": {
                name: "Driver Exubérance",

                weights: {
                    "critRate_": 0.4, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 1, "enerRech_": 0.6,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas", "enerRech_"],
                    "EQUIP_RING": ["eleMas"],
                    "EQUIP_DRESS": ["critRate_", "eleMas"]
                },

                hideUIStats: [],
                showUIStats: ["atk"],

                bestSets: ["GildedDreams:4", "FlowerOfParadiseLost:4"],
                goodSets: ["NoblesseOblige:4", "DeepwoodMemories:4", "OceanHuedClam:4", "Instructor:4", "TheExile:4", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 140,

                team: [
                    { role: "Sub-DPS", name: "Yelan", element: "hydro" },
                    { role: "Sub-DPS", name: "Nahida", element: "dendro" },
                    { role: "Support", name: "Qin", element: "anemo" },
                ]
            }
        }
    },

    // 3.1
    "Cyno": {
        color: "#4D2A90",
        portraitOffset: -36,

        talents: {
            auto: 1,
            skill: 8,
            burst: 10
        },

        buffs: [
            {
                category: "Constellation 2 : Cérémonie : Retour des esprits",
                selectMode: "exclusive",
                buffs: [
                    {
                        label: "1 ennemi touché par l'attaque normale",
                        cons: 2,
                        stats: {
                            elemental_dmg_: 0.10
                        }
                    },
                    {
                        label: "2 ennemis touchés par l'attaque normale",
                        cons: 2,
                        stats: {
                            elemental_dmg_: 0.20
                        }
                    },
                    {
                        label: "3 ennemis touchés par l'attaque normale",
                        cons: 2,
                        stats: {
                            elemental_dmg_: 0.30
                        }
                    },
                    {
                        label: "4 ennemis touchés par l'attaque normale",
                        cons: 2,
                        stats: {
                            elemental_dmg_: 0.40
                        }
                    },
                    {
                        label: "5 ennemis touchés par l'attaque normale",
                        cons: 2,
                        stats: {
                            elemental_dmg_: 0.50
                        }
                    }
                ]
            }
        ],

        builds: {
            "DPS Exubérance": {
                name: "DPS Exubérance",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.4, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 1, "enerRech_": 0.8,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 1,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas", "atk_", "enerRech_"],
                    "EQUIP_RING": ["electro_dmg_", "eleMas"],
                    "EQUIP_DRESS": ["critDMG_", "critRate_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["ThunderingFury:4", "GildedDreams:4"],
                goodSets: ["ThunderingFury:2", "GladiatorsFinale:4", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2","FlowerOfParadiseLost:4"],
                er_req: 130,

                team: [
                    { role: "Sub-DPS", name: "Nahida", element: "dendro" },
                    { role: "Sub-DPS", name: "Yelan", element: "hydro" },
                    { role: "Sub-DPS", name: "Shinobu", element: "electro" },
                ]
            },
            "DPS Suractivation": {
                name: "DPS Suractivation",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.4, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 1, "enerRech_": 0.8,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 1,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas", "atk_", "enerRech_"],
                    "EQUIP_RING": ["electro_dmg_", "eleMas"],
                    "EQUIP_DRESS": ["critDMG_", "critRate_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["ThunderingFury:4", "GildedDreams:4"],
                goodSets: ["ThunderingFury:2", "GladiatorsFinale:4", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],
                er_req: 130,

                team: [
                    { role: "Sub-DPS", name: "Nahida", element: "dendro" },
                    { role: "Support", name: "Baizhuer", element: "dendro" },
                    { role: "Sub-DPS", name: "Fischl", element: "electro" },
                ]
            }
        }
    },
    "Nilou": {
        color: "#80B7E2",
        portraitOffset: -36.5,

        skins: {
            207001: {
                color: "#2d65bd",
                portraitOffset: -38
            }
        },

        talents: {
            auto: 1,
            skill: 8,
            burst: 8
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A1 : Cour des pétales dansants",
                        active: true,
                        stats: {
                            eleMas: 100,
                        }
                    }
                ]
            },
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C6 : Mélodie du brise-givre",
                        cons: 6,
                        active: false,
                        stats: {
                            critRate__bonus_scaling: {
                                source: "hp",
                                percent: 0.0006,
                                max: 30
                            },
                            critDMG__bonus_scaling: {
                                source: "hp",
                                percent: 0.0012,
                                max: 60
                            }
                        }
                    }
                ]
            }
        ],

        builds: {
            "Enabler Fleurissement": {
                name: "Enabler Fleurissement",

                weights: {
                    "critRate_": 0, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 1, "hp": 0.8,
                    "def_": 0, "def": 0,
                    "eleMas": 0.5, "enerRech_": 0.3,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["hp_"],
                    "EQUIP_RING": ["hp_"],
                    "EQUIP_DRESS": ["hp_"]
                },

                bestSets: ["TenacityOfTheMillelith:2", "VourukashasGlow:2"],
                goodSets: ["FlowerOfParadiseLost:4", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 130,

                team: [
                    { role: "Driver", name: "Columbina", element: "hydro" },
                    { role: "Sub-DPS", name: "Lauma", element: "dendro" },
                    { role: "Support", name: "Nahida", element: "dendro" },
                ]
            }
        }
    },
    "Candace": {
        color: "#3a306a",
        portraitOffset: -39,

        talents: {
            auto: 8,
            skill: 10,
            burst: 9
        },

        buffs: [
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C2 : Brillance perçant la lune",
                        cons: 2,
                        stats: {
                            hp_: 0.20
                        }
                    }
                ]
            }
        ],

        builds: {
            "Driver fleurissement": {
                name: "Driver fleurissement",

                weights: {
                    "critRate_": 0.4, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 0.8, "hp": 0.1,
                    "def_": 0, "def": 0,
                    "eleMas": 1, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas", "enerRech_"],
                    "EQUIP_RING": ["eleMas"],
                    "EQUIP_DRESS": ["eleMas","critRate_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["FlowerOfParadiseLost:4"],
                goodSets: ["GildedDreams:4", "SilkenMoonsSerenade:4", "DeepwoodMemories:4", "FlowerOfParadiseLost:2", "GildedDreams:2", "WanderersTroupe:2", "AubadeOfMorningstarAndMoon:2", "NightOfTheSkysUnveiling:2"],

                er_req: 200,

                team: [
                    { role: "Support", name: "Nilou", element: "hydro" },
                    { role: "Support", name: "Yaoyao", element: "dendro" },
                    { role: "Sub-DPS", name: "Lauma", element: "dendro" }
                ]
            },
            "Support général": {
                name: "Support général",

                weights: {
                    "critRate_": 0.4, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 1, "hp": 0.8,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["hp_", "enerRech_"],
                    "EQUIP_RING": ["hp_"],
                    "EQUIP_DRESS": ["hp_","critRate_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["ScrollOfTheHeroOfCinderCity:4", "NoblesseOblige:4"],
                goodSets: ["Instructor:4", "SilkenMoonsSerenade:4", "EmblemOfSeveredFate:4", "TenacityOfTheMillelith:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "VourukashasGlow:2", "ScrollOfTheHeroOfCinderCity:2"],

                er_req: 200,

                team: [
                    { role: "", name: "", element: "" },
                    { role: "", name: "", element: "" },
                    { role: "", name: "", element: "" },
                ]
            },
            "Applicatrice évaporation": {
                name: "Applicatrice évaporation",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0, "atk": 0,
                    "hp_": 0.8, "hp": 0.1,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 1, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["hp_", "enerRech_"],
                    "EQUIP_RING": ["hydro_dmg_"],
                    "EQUIP_DRESS": ["critDMG_","critRate_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["ScrollOfTheHeroOfCinderCity:4", "NoblesseOblige:4"],
                goodSets: ["Instructor:4", "SilkenMoonsSerenade:4", "EmblemOfSeveredFate:4", "TenacityOfTheMillelith:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "VourukashasGlow:2", "ScrollOfTheHeroOfCinderCity:2", "HeartOfDepth:2", "NymphsDream:2"],

                er_req: 200,

                team: [
                    { role: "DPS", name: "Hutao", element: "pyro" },
                    { role: "Sub-DPS", name: "Yelan", element: "hydro" },
                    { role: "Support", name: "Zhongli", element: "geo" },
                ]
            }
        }
    },

    // 3.2
    "Nahida": {
        color: "#e6ff89",
        portraitOffset: -37,

        talents: {
            auto: 6,
            skill: 10,
            burst: 9
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A1 : Compassion illuminée (Nahida On-field)",
                        stats: {
                            eleMas_bonus_scaling: {
                                source: "eleMas",
                                percent: 0.25,
                                baseline: 0,
                                max: 250
                            }
                        }
                    },
                    {
                        label: "A4 : Éveil élucidé",
                        stats: {
                            critRate__bonus_scaling: {
                                source: "eleMas",
                                percent: 0.03,
                                baseline: 200,
                                max: 24
                            }
                        }
                    }
                ]
            },
            {
                category: "Constellation 2 : Racine de toute plénitude",
                buffs: [
                    {
                        label: "Sélénofleurissement",
                        cons: 2,
                        active: false,
                        stats: {
                            critRate_: 0.10,
                            critDMG_: 0.20
                        }
                    }
                ]
            },
            {
                category: "Constellation 4 : Tige d'inférence manifeste",
                selectMode: "exclusive",
                buffs: [
                    {
                        label: "1 ennemi affecté par la compétence élémentaire",
                        cons: 4,
                        stats: {
                            eleMas: 100
                        }
                    },
                    {
                        label: "2 ennemis affectés par la compétence élémentaire",
                        cons: 4,
                        stats: {
                            eleMas: 120
                        }
                    },
                    {
                        label: "3 ennemis affectés par la compétence élémentaire",
                        cons: 4,
                        stats: {
                            eleMas: 140
                        }
                    },
                    {
                        label: "4 ennemis affectés par la compétence élémentaire",
                        cons: 4,
                        stats: {
                            eleMas: 160
                        }
                    }
                ]
            }
        ],

        builds: {
            "Sub-DPS Propagation": {
                name: "Sub-DPS Propagation",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0, "atk": 0,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 1, "enerRech_": 0.6,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 1, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas"],
                    "EQUIP_RING": ["eleMas", "dendro_dmg_"],
                    "EQUIP_DRESS": ["eleMas", "critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: ["atk"],

                bestSets: ["DeepwoodMemories:4", "ScrollOfTheHeroOfCinderCity:4"],
                goodSets: ["TenacityOfTheMillelith:4", "GoldenTroupe:4", "GildedDreams:4", "Instructor:4", "DeepwoodMemories:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 120,

                team: [
                    { role: "DPS", name: "Alhatham", element: "dendro" },
                    { role: "Sub-DPS", name: "Yae", element: "electro" },
                    { role: "Sub-DPS", name: "Shinobu", element: "electro" },
                ]
            },
            "Sub-DPS Exubérance": {
                name: "Sub-DPS Exubérance",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0, "atk": 0,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 1, "enerRech_": 0.6,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 1, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas"],
                    "EQUIP_RING": ["eleMas", "dendro_dmg_"],
                    "EQUIP_DRESS": ["eleMas", "critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: ["atk"],

                bestSets: ["DeepwoodMemories:4", "ScrollOfTheHeroOfCinderCity:4"],
                goodSets: ["TenacityOfTheMillelith:4", "GoldenTroupe:4", "GildedDreams:4", "Instructor:4", "DeepwoodMemories:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 140,

                team: [
                    { role: "Sub-DPS", name: "Yelan", element: "hydro" },
                    { role: "Sub-DPS", name: "Xingqiu", element: "hydro" },
                    { role: "Sub-DPS", name: "Shinobu", element: "electro" },
                ]
            },
            "Sub-DPS Fleurissement": {
                name: "Sub-DPS Fleurissement",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0, "atk": 0,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 1, "enerRech_": 0.6,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 1, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas"],
                    "EQUIP_RING": ["eleMas", "dendro_dmg_"],
                    "EQUIP_DRESS": ["eleMas", "critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: ["atk"],

                bestSets: ["DeepwoodMemories:4", "ScrollOfTheHeroOfCinderCity:4"],
                goodSets: ["TenacityOfTheMillelith:4", "GoldenTroupe:4", "GildedDreams:4", "Instructor:4", "DeepwoodMemories:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 120,

                team: [
                    { role: "Support", name: "Nilou", element: "hydro" },
                    { role: "Support", name: "Kokomi", element: "hydro" },
                    { role: "Sub-DPS", name: "Collei", element: "dendro" },
                ]
            }
        }
    },
    "Layla": {
        color: "#3744b0",
        portraitOffset: -36,

        talents: {
            auto: 1,
            skill: 10,
            burst: 6
        },

        builds: {
            "Shielder universel": {
                name: "Shielder universel",

                weights: {
                    "critRate_": 0.4, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 1, "hp": 0.8,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.5,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["hp_", "enerRech_"],
                    "EQUIP_RING": ["hp_"],
                    "EQUIP_DRESS": ["hp_", "critRate_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["TenacityOfTheMillelith:4"],
                goodSets: ["NoblesseOblige:4", "TenacityOfTheMillelith:2", "VourukashasGlow:2", "Instructor:4", "DeepwoodMemories:4", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2"],

                er_req: 140,

                team: [
                    { role: "", name: "", element: "" },
                    { role: "", name: "", element: "" },
                    { role: "", name: "", element: "" },
                ]
            }
        }
    },

    // 3.3
    "Nomade": {
        color: "#1d40ee",
        portraitOffset: -36,

        talents: {
            auto: 10,
            skill: 9,
            burst: 8
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A1 : Fleur de jade (Pyro)",
                        active: true,
                        stats: {
                            atk_: 0.30
                        }
                    },
                    {
                        label: "A1 : Fleur de jade (Cryo)",
                        active: false,
                        stats: {
                            critRate_: 0.20
                        }
                    }
                ]
            },
        ],

        builds: {
            "DPS Dispersion": {
                name: "DPS Dispersion",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.3,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 1, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["anemo_dmg_", "atk_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["DesertPavilionChronicle:4"],
                goodSets: ["ShimenawasReminiscence:4", "MarechausseeHunter:4", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "ViridescentVenerer:2", "DesertPavilionChronicle:2"],

                er_req: 120,

                team: [
                    { role: "Support", name: "Faruzan", element: "anemo" },
                    { role: "Sub-DPS", name: "Durin", element: "pyro" },
                    { role: "Support", name: "Nicole", element: "pyro" },
                ]
            }
        }
    },
    "Faruzan": {
        color: "#5591a0",
        portraitOffset: -37,

        talents: {
            auto: 1,
            skill: 8,
            burst: 10
        },

        buffs: [
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C6 : Merveilleux chemin de la vérité (dans le déchaînement)",
                        cons: 6,
                        stats: {
                            critDMG_: 0.40
                        }
                    }
                ]
            }
        ],

        builds: {
            "Support Anémo": {
                name: "Support Anémo",

                weights: {
                    "critRate_": 0.4, "critDMG_": 0,
                    "atk_": 1, "atk": 0.8,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["enerRech_", "atk_"],
                    "EQUIP_RING": ["atk_"],
                    "EQUIP_DRESS": ["atk_", "critRate_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["TenacityOfTheMillelith:4", "NoblesseOblige:4", "ViridescentVenerer:4"],
                goodSets: ["GoldenTroupe:4", "TheExile:4", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2"],

                er_req: 220,

                team: [
                    { role: "Flex", name: ["Xiao", "Wanderer"], element: ["anemo", "anemo"] },
                    { role: "", name: "", element: "" },
                    { role: "", name: "", element: "" },
                ]
            }
        }
    },

    // 3.4
    "Alhaitham": {
        color: "#247074",
        portraitOffset: -35,

        talents: {
            auto: 9,
            skill: 10,
            burst: 8
        },

        buffs: [
            {
                category: "Constellation 2 : Rhétorique",
                selectMode: "exclusive",
                buffs: [
                    {
                        label: "1 Stack",
                        cons: 2,
                        active: false,
                        stats: {
                            eleMas: 50
                        }
                    },
                    {
                        label: "2 stacks",
                        cons: 2,
                        active: false,
                        stats: {
                            eleMas: 100
                        }
                    },
                    {
                        label: "3 stacks",
                        cons: 2,
                        active: true, // Coché par défaut car c'est la moyenne haute facilement maintenable
                        stats: {
                            eleMas: 150
                        }
                    },
                    {
                        label: "4 stacks",
                        cons: 2,
                        active: false, // Plus rare à maintenir en permanence sur une rotation complète
                        stats: {
                            eleMas: 200
                        }
                    }
                ]
            },
            {
                category: "Constellation 4 : Élucidation",
                selectMode: "exclusive",
                buffs: [
                    {
                        label: "1 miroir généré",
                        cons: 4,
                        active: false, // Scénario où on a consommé 2 miroirs
                        stats: {
                            dendro_dmg_: 0.10
                        }
                    },
                    {
                        label: "2 miroirs générés",
                        cons: 4,
                        active: false, // Scénario où on a consommé 1 miroir
                        stats: {
                            dendro_dmg_: 0.20
                        }
                    },
                    {
                        label: "3 miroirs générés",
                        cons: 4,
                        active: true, // Coché par défaut car c'est la rotation optimale !
                        stats: {
                            dendro_dmg_: 0.30
                        }
                    }
                ]
            },
            {
                category: "Constellation 6 : Structuration",
                buffs: [
                    {
                        label: "1 miroir généré si 3 existent déjà",
                        cons: 6,
                        active: false,
                        stats: {
                            critRate_: 0.10,
                            critDMG_: 0.70
                        }
                    }
                ]
            }

        ],

        builds: {
            "DPS Exubérance": {
                name: "DPS Exubérance",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.4, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 1, "enerRech_": 0.6,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 1, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas", "atk_"],
                    "EQUIP_RING": ["dendro_dmg_", "eleMas"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["GildedDreams:4"],
                goodSets: ["DeepwoodMemories:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "GoldenTroupe:2", "GoldenTroupe:4", "MarechausseeHunter:4", "DeepwoodMemories:4"],

                er_req: 130,

                team: [
                    { role: "Support", name: "Nahida", element: "dendro" },
                    { role: "Sub-DPS", name: "Shinobu", element: "electro" },
                    { role: "Flex", name: ["Yelan", "Xingqiu"], element: ["hydro", "hydro"] }
                ]
            },
            "DPS Propagation": {
                name: "DPS Propagation",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.4, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 1, "enerRech_": 0.6,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 1, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas", "atk_"],
                    "EQUIP_RING": ["dendro_dmg_", "eleMas"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["GildedDreams:4"],
                goodSets: ["DeepwoodMemories:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "GoldenTroupe:4", "MarechausseeHunter:4", "DeepwoodMemories:4"],

                er_req: 130,

                team: [
                    { role: "Support", name: "Nahida", element: "dendro" },
                    { role: "Sub-DPS", name: "Yae", element: "electro" },
                    { role: "Support", name: "Zhongli", element: "geo" },
                ]
            },
            "Driver Fleurissement": {
                name: "Driver Fleurissement",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.4, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 1, "enerRech_": 0.6,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 1, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas", "atk_"],
                    "EQUIP_RING": ["dendro_dmg_", "eleMas"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["GildedDreams:4"],
                goodSets: ["WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "DeepwoodMemories:2", "GoldenTroupe:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "GoldenTroupe:4", "MarechausseeHunter:4", "DeepwoodMemories:4"],

                er_req: 130,

                team: [
                    { role: "Support", name: "Nilou", element: "hydro" },
                    { role: "Sub-DPS", name: "Xingqiu", element: "hydro" },
                    { role: "Support", name: "Baizhuer", element: "dendro" },
                ]
            }
        }
    },
    "Yaoyao": {
        color: "#54701f",
        portraitOffset: -36,

        skins: {
            207701: {
                color: "#6ed3ea",
                portraitOffset: -38
            }
        },

        talents: {
            auto: 1,
            skill: 10,
            burst: 9
        },

        buffs: [
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C1 : Tutelle",
                        cons: 1,
                        active: true,
                        stats: {
                            elemental_dmg_: 0.15
                        }
                    },
                    {
                        label: "C4 : Attrait",
                        cons: 4,
                        active: true,
                        stats: {
                            eleMas_bonus_scaling: {
                                source: "hp",
                                percent: 0.003,
                                max: 120
                            }
                        }
                    }
                ]
            }
        ],

        builds: {
            "Healeuse universelle": {
                name: "Healeuse universelle",

                weights: {
                    "critRate_": 0.4, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 1, "hp": 0.8,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 1
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["enerRech_", "hp_"],
                    "EQUIP_RING": ["hp_"],
                    "EQUIP_DRESS": ["hp_", "heal_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["DeepwoodMemories:4", "MaidenBeloved:4"],
                goodSets: ["MaidenBeloved:2", "OceanHuedClam:2", "SongOfDaysPast:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "TenacityOfTheMillelith:2", "VourukashasGlow:2"],

                er_req: 220,

                team: [
                    { role: "", name: "", element: "" },
                    { role: "", name: "", element: "" },
                    { role: "", name: "", element: "" },
                ]
            },
            "Sub-DPS propagation": {
                name: "Sub-DPS propagation",

                weights: {
                    "critRate_": 0.4, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 0.4, "hp": 0.1,
                    "def_": 0, "def": 0,
                    "eleMas": 0.8, "enerRech_": 0.6,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 1, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas"],
                    "EQUIP_RING": ["dendro_dmg_", "eleMas"],
                    "EQUIP_DRESS": ["eleMas", "critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["DeepwoodMemories:4", "Instructor:4", "GildedDreams:4"],
                goodSets: ["DeepwoodMemories:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2"],

                er_req: 160,

                team: [
                    { role: "DPS", name: "Alhatham", element: "dendro" },
                    { role: "Sub-DPS", name: "Fischl", element: "electro" },
                    { role: "Support", name: "Kazuha", element: "anemo" },
                ]
            },
            "Sub-DPS fleurissement": {
                name: "Sub-DPS fleurissement",

                weights: {
                    "critRate_": 0.4, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 0.4, "hp": 0.1,
                    "def_": 0, "def": 0,
                    "eleMas": 1, "enerRech_": 0.6,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 1, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas"],
                    "EQUIP_RING": ["eleMas"],
                    "EQUIP_DRESS": ["eleMas"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["DeepwoodMemories:4", "Instructor:4", "GildedDreams:4", "FlowerOfParadiseLost:4"],
                goodSets: ["DeepwoodMemories:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 160,

                team: [
                    { role: "Support", name: "Nilou", element: "hydro" },
                    { role: "Sub-DPS", name: "Lauma", element: "dendro" },
                    { role: "Sub-DPS", name: "Columbina", element: "hydro" },
                ]
            }
        }
    },

    // 3.5
    "Dehya": {
        color: "#B60000",
        portraitOffset: -37,

        talents: {
            auto: 1,
            skill: 8,
            burst: 8
        },

        buffs: [
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C6 : Brûlante griffe de clivage (uniquement le déchaînement)",
                        cons: 6,
                        active: false,
                        stats: {
                            critRate_: 0.10,
                            critDMG_: 0.60
                        }
                    }
                ]
            }
        ],

        builds: {
            "Sub-DPS": {
                name: "Sub-DPS",

                weights: {
                    "critRate_": 0, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 1, "hp": 0.1,
                    "def_": 0, "def": 0,
                    "eleMas": 0.4, "enerRech_": 0,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["hp_", "eleMas"],
                    "EQUIP_RING": ["hp_", "eleMas"],
                    "EQUIP_DRESS": ["hp_", "eleMas", "critRate_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["TenacityOfTheMillelith:4", "ScrollOfTheHeroOfCinderCity:4", "Instructor:4"],
                goodSets: ["SilkenMoonsSerenade:4", "DeepwoodMemories:4", "TenacityOfTheMillelith:2", "VourukashasGlow:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 100,

                team: [
                    { role: "DPS", name: "Mualani", element: "hydro" },
                    { role: "Sub-DPS", name: "Émilie", element: "dendro" },
                    { role: "Flex", name: ["Nahida", "Xilonen"], element: ["dendro", "geo"] }
                ]
            },
            "DPS Évaporation": {
                name: "DPS Évaporation",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0.1, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.6, "enerRech_": 0.8,

                    "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["enerRech_", "eleMas", "atk_"],
                    "EQUIP_RING": ["pyro_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: ["heal_"],
                showUIStats: ["hp"],

                bestSets: ["MarechausseeHunter:4", "VourukashasGlow:4", "EmblemOfSeveredFate:4"],
                goodSets: ["NightOfTheSkysUnveiling:4", "UnfinishedReverie:4", "LongNightsOath:4", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "CrimsonWitchOfFlames:2"],

                er_req: 180,

                team: [
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },
                    { role: "Support", name: "Bennett", element: "pyro" },
                    { role: "Flex", name: ["Kazuha", "Xilonen"], element: ["anemo", "geo"] }
                ]
            }
        }
    },
    "Mika": {
        color: "#353f76",
        portraitOffset: -39,

        talents: {
            auto: 1,
            skill: 9,
            burst: 10
        },

        buffs: [
            {
                category: "Passifs & Cumuls",
                selectMode: "cumulative",
                buffs: [
                    {
                        label: "Effet Localisation (1 cumul)",
                        stats: { physical_dmg_: 0.10 }
                    },
                    {
                        label: "Effet Localisation (2 cumuls)",
                        stats: { physical_dmg_: 0.10 }
                    },
                    {
                        label: "Effet Localisation (3 cumuls - Max A1)",
                        stats: { physical_dmg_: 0.10 }
                    },
                    {
                        label: "Effet Localisation (4 cumuls - Max A4)",
                        stats: { physical_dmg_: 0.10 }
                    },
                    {
                        label: "Effet Localisation (5 cumuls - Max C6)",
                        cons: 6,
                        stats: { physical_dmg_: 0.10 }
                    }
                ]
            },
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C6 : Conseil du compagnon",
                        cons: 6,
                        active: false,
                        stats: { critDMG_: 0.60 }
                    }
                ]
            }
        ],

        builds: {
            "Buffer physique": {
                name: "Buffer physique",

                weights: {
                    "critRate_": 0.4, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 1, "hp": 0.8,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 1
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["hp_", "enerRech_"],
                    "EQUIP_RING": ["hp_"],
                    "EQUIP_DRESS": ["hp_", "heal_", "critRate_"]
                },

                hideUIStats: ["eleMas"],
                showUIStats: ["physical_dmg_"],

                bestSets: ["NoblesseOblige:4"],
                goodSets: ["OceanHuedClam:4", "SongOfDaysPast:4", "TheExile:4", "TenacityOfTheMillelith:2", "VourukashasGlow:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "MaidenBeloved:2", "OceanHuedClam:2", "SongOfDaysPast:2"],

                er_req: 200,

                team: [
                    { role: "DPS", name: "Eula", element: "cryo" },
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },
                    { role: "Sub-DPS", name: "Shougun", element: "electro" }
                ]
            }
        }
    },

    // 3.6
    "Baizhu": {
        color: "#297c81",
        portraitOffset: -36,

        talents: {
            auto: 1,
            skill: 9,
            burst: 10
        },

        buffs: [
            {
                category: "A1 : Cinq fortunes perpétuelles",
                selectMode: "exclusive",
                buffs: [
                    {
                        label: "PV > 50%",
                        active: true,
                        stats: {
                            elemental_dmg_: 0.25,
                        }
                    },
                    {
                        label: "PV < 50%",
                        active: false,
                        stats: {
                            heal_: 0.20,
                        }
                    }
                ]
            },
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C4 : Perception ancienne",
                        cons: 4,
                        stats: {
                            eleMas: 80
                        }
                    }
                ]
            }
        ],

        builds: {
            "Healer et applicateur général": {
                name: "Healer et applicateur général",

                weights: {
                    "critRate_": 0, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 1, "hp": 0.8,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 1
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["hp_", "enerRech_"],
                    "EQUIP_RING": ["hp_"],
                    "EQUIP_DRESS": ["hp_", "heal_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["DeepwoodMemories:4", "Instructor:4"],
                goodSets: ["OceanHuedClam:4", "NoblesseOblige:4", "MaidenBeloved:4", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "MaidenBeloved:2", "OceanHuedClam:2", "SongOfDaysPast:2"],

                er_req: 180,

                team: [
                    { role: "", name: "", element: "" },
                    { role: "", name: "", element: "" },
                    { role: "", name: "", element: "" },
                ]
            }
        }
    },
    "Kaveh": {
        color: "#308b3b",
        portraitOffset: -36,

        talents: {
            auto: 8,
            skill: 8,
            burst: 10
        },

        buffs: [
            {
                category: "A4 : Extravagance d'un artisan",
                selectMode : "cumulative",
                buffs: [
                    {
                        label: "1 stack",
                        stats: {
                            eleMas: 25,
                        }
                    },
                    {
                        label: "2 stacks",
                        stats: {
                            eleMas: 25,
                        }
                    },
                    {
                        label: "3 stacks",
                        stats: {
                            eleMas: 25,
                        }
                    },
                    {
                        label: "4 stacks",
                        stats: {
                            eleMas: 25,
                        }
                    }
                ]
            }
        ],

        builds: {
            "Driver dendro": {
                name: "Driver dendro",

                weights: {
                    "critRate_": 0.4, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 1, "enerRech_": 0.8,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 1
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas", "enerRech_"],
                    "EQUIP_RING": ["eleMas"],
                    "EQUIP_DRESS": ["eleMas", "critRate_", "heal_"]
                },

                hideUIStats: [],
                showUIStats: ["atk"],

                bestSets: ["DeepwoodMemories:4", "OceanHuedClam:4", "Instructor:4"],
                goodSets: ["FlowerOfParadiseLost:4", "GildedDreams:4", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 200,

                team: [
                    { role: "Flex", name: "", element: "hydro" },
                    { role: "Flex", name: "", element: ["hydro", "electro"] },
                    { role: "Flex", name: "", element: "dendro" }
                ]
            }
        }
    },

    // 3.7
    "Kirara": {
        color: "#3a748c",
        portraitOffset: -36,

        skins: {
            206101: {
                color: "#2765be",
                portraitOffset: -36
            }
        },

        talents: {
            auto: 1,
            skill: 10,
            burst: 9
        },

        buffs: [
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C6 : Myriade de curiosités en chemin",
                        cons: 6,
                        stats: {
                            elemental_dmg_: 0.12
                        }
                    }
                ]
            }
        ],

        builds: {
            "Shieldeuse générale": {
                name: "Shieldeuse générale",

                weights: {
                    "critRate_": 0.4, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 1, "hp": 0.8,
                    "def_": 0, "def": 0,
                    "eleMas": 0.4, "enerRech_": 0.6,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["hp_"],
                    "EQUIP_RING": ["hp_"],
                    "EQUIP_DRESS": ["hp_", "critRate_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["TenacityOfTheMillelith:4", "Instructor:4", "TenacityOfTheMillelith:2", "VourukashasGlow:2"],
                goodSets: ["DeepwoodMemories:4", "NoblesseOblige:4", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 140,

                team: [
                    { role: "Flex", name: "", element: ["electro", "hydro"] },
                    { role: "Flex", name: "", element: ["electro", "hydro"] },
                    { role: "Flex", name: "", element: "dendro" }
                ]
            }
        }
    },

    // 4.0
    "Lyney": {
        color: "#891b34",
        portraitOffset: -37,

        talents: {
            auto: 10,
            skill: 9,
            burst: 8
        },

        buffs: [
            {
                category: "C2 : Cajolerie affable",
                selectMode: "cumulative",
                buffs: [
                    {
                        label: "2s sur le terrain",
                        cons: 2,
                        stats: {
                            critDMG_: 0.20
                        }
                    },
                    {
                        label: "4s sur le terrain",
                        cons: 2,
                        stats: {
                            critDMG_: 0.20
                        }
                    },
                    {
                        label: "6s sur le terrain",
                        cons: 2,
                        stats: {
                            critDMG_: 0.20
                        }
                    }
                ]
            }
        ],

        builds: {
            "DPS mono-pyro": {
                name: "DPS mono-pyro",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.3,

                    "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["pyro_dmg_"],
                    "EQUIP_DRESS": ["critDMG_", "critRate_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["MarechausseeHunter:4"],
                goodSets: ["Lavawalker:4", "VermillionHereafter:4", "ShimenawasReminiscence:4", "WanderersTroupe:4", "DesertPavilionChronicle:4", "MarechausseeHunter:2", "CrimsonWitchOfFlames:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2"],

                er_req: 120,

                team: [
                    { role: "Sub-DPS", name: "Durin", element: "pyro" },
                    { role: "Support", name: "Chevreuse", element: "pyro" },
                    { role: "Sub-DPS", name: "Fischl", element: "electro" },
                ]
            }
        }
    },
    "Lynette": {
        color: "#0d859e",
        portraitOffset: -35,

        talents: {
            auto: 1,
            skill: 9,
            burst: 10
        },

        buffs: [
            {
                category: "A1 : Synergie ingénieuse",
                selectMode: "exclusive",
                buffs: [
                    {
                        label: "1 type élémentaire",
                        active: false,
                        stats: { atk_: 0.08 }
                    },
                    {
                        label: "2 types élémentaires",
                        active: false,
                        stats: { atk_: 0.12 }
                    },
                    {
                        label: "3 types élémentaires",
                        active: true,
                        stats: { atk_: 0.16 }
                    },
                    {
                        label: "4 types élémentaires",
                        active: false,
                        stats: { atk_: 0.20 }
                    }
                ]
            },
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C6 : Œil perspicace",
                        cons: 6,
                        stats: {
                            elemental_dmg_: 0.20
                        }
                    }
                ]
            }
        ],

        builds: {
            "Support général": {
                name: "Support général",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.8,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 1, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "enerRech_"],
                    "EQUIP_RING": ["anemo_dmg_", "atk_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["ViridescentVenerer:4", "EmblemOfSeveredFate:4", "NoblesseOblige:4"],
                goodSets: ["GildedDreams:4", "ViridescentVenerer:2","DesertPavilionChronicle:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "NoblesseOblige:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 170,

                team: [
                    { role: "", name: "", element: "" },
                    { role: "", name: "", element: "" },
                    { role: "", name: "", element: "" },
                ]
            }
        }
    },
    "Fréminet": {
        color: "#394a74",
        portraitOffset: -38,

        talents: {
            auto: 9,
            skill: 10,
            burst: 8
        },

        buffs: [
            {
                category: "C1 : Rêves des profondeurs mousseuses",
                buffs: [
                    {
                        label: "Uniquement la compétence",
                        cons: 1,
                        active: false,
                        stats: {
                            critRate_: 0.15
                        }
                    }
                ]
            },
            {
                category: "C4 : Danse de lune et de flûte",
                selectMode: "cumulative",
                buffs: [
                    {
                        label: "Réaction cryo déclenchée (1 stack)",
                        cons: 4,
                        stats: {
                            atk_: 0.09
                        }
                    },
                    {
                        label: "Réaction cryo déclenchée (2 stacks)",
                        cons: 4,
                        stats: {
                            atk_: 0.09
                        }
                    }
                ]
            },
            {
                category: "C6 : Instant d'aube et de détermination",
                selectMode: "cumulative",
                buffs: [
                    {
                        label: "Réaction cryo déclenchée (1 stack)",
                        cons: 6,
                        stats: {
                            critDMG_: 0.12
                        }
                    },
                    {
                        label: "Réaction cryo déclenchée (2 stacks)",
                        cons: 6,
                        stats: {
                            critDMG_: 0.12
                        }
                    },
                    {
                        label: "Réaction cryo déclenchée (3 stacks)",
                        cons: 6,
                        stats: {
                            critDMG_: 0.12
                        }
                    }
                ]
            }
        ],

        builds: {
            "DPS Physique": {
                name: "DPS Physique",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.5,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 1,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["physical_dmg_", "atk_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["PaleFlame:4", "MarechausseeHunter:4"],
                goodSets: ["BlizzardStrayer:4", "PaleFlame:2", "BloodstainedChivalry:2", "GoldenTroupe:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2"],

                er_req: 130,

                team: [
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },
                    { role: "Sub-DPS", name: "Escoffier", element: "cryo" },
                    { role: "Flex", name: ["Fischl", "Yae"], element: ["electro", "electro"] }
                ]
            },
            "DPS Cryo": {
                name: "DPS Cryo",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.5,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 1,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["cryo_dmg_", "atk_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["BlizzardStrayer:4", "GoldenTroupe:4"],
                goodSets: ["MarechausseeHunter:4", "PaleFlame:4", "BlizzardStrayer:2", "GoldenTroupe:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2"],

                er_req: 130,

                team: [
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },
                    { role: "Sub-DPS", name: "Escoffier", element: "cryo" },
                    { role: "Support", name: "Shenhe", element: "cryo" },
                ]
            }
        }
    },

    // 4.1
    "Wriothesley": {
        color: "#112a75",
        portraitOffset: -37,

        talents: {
            auto: 10,
            skill: 9,
            burst: 8
        },

        buffs: [
            {
                category: "Passifs",
                selectMode: "cumulative",
                buffs: [
                    {
                        label: "A4 : Rétribution pour le péché (1 stack)",
                        stats: { atk_: 0.06 }
                    },
                    {
                        label: "A4 : Rétribution pour le péché (2 stacks)",
                        stats: { atk_: 0.06 }
                    },
                    {
                        label: "A4 : Rétribution pour le péché (3 stacks)",
                        stats: { atk_: 0.06 }
                    },
                    {
                        label: "A4 : Rétribution pour le péché (4 stacks)",
                        stats: { atk_: 0.06 }
                    },
                    {
                        label: "A4 : Rétribution pour le péché (5 stacks)",
                        stats: { atk_: 0.06 }
                    }
                ]
            },
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C6 : Estime pour les irréprochables (Att. Chargée)",
                        cons: 6,
                        active: false,
                        stats: {
                            critRate_: 0.10,
                            critDMG_: 0.80
                        }
                    }
                ]
            }
        ],

        builds: {
            "DPS Gel": {
                name: "DPS Gel",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 1,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["cryo_dmg_", "atk_"],
                    "EQUIP_DRESS": ["critDMG_", "critRate_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["MarechausseeHunter:4", "BlizzardStrayer:4"],
                goodSets: ["ShimenawasReminiscence:4", "MarechausseeHunter:2", "BlizzardStrayer:2", "FinaleOfTheDeepGalleries:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2"],

                er_req: 110,

                team: [
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },
                    { role: "Sub-DPS", name: "Escoffier", element: "cryo" },
                    { role: "Flex", name: ["Yelan", "Citlali"], element: ["hydro", "cryo"] }
                ]
            },
            "DPS Fonte inversée": {
                name: "DPS Fonte inversée",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.6, "enerRech_": 0.1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 1,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "eleMas"],
                    "EQUIP_RING": ["cryo_dmg_", "atk_"],
                    "EQUIP_DRESS": ["critDMG_", "critRate_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["ShimenawasReminiscence:4"],
                goodSets: ["MarechausseeHunter:2", "BlizzardStrayer:2", "FinaleOfTheDeepGalleries:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 110,

                team: [
                    { role: "Sub-DPS", name: "Emilie", element: "dendro" },
                    { role: "Sub-DPS", name: "Durin", element: "pyro" },
                    { role: "Support", name: "Nicole", element: "pyro" },
                ]
            }
        }
    },
    "Neuvillette": {
        color: "#374eb4",
        portraitOffset: -38,

        skins: {
            208701: {
                color: "#3248e3",
                portraitOffset: -39
            }
        },

        talents: {
            auto: 10,
            skill: 6,
            burst: 6
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A4 : Discipline de l'arbitrage suprême",
                        active: true,
                        stats: {
                            hydro_dmg_: 0.30
                        }
                    }
                ]
            },
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C2 : Exhortation de la loi",
                        cons: 2,
                        stats: {
                            critDMG_: 0.42
                        }
                    }
                ]
            }
        ],

        builds: {
            "DPS Hydro": {
                name: "DPS Hydro",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0, "atk": 0,
                    "hp_": 1, "hp": 0.1,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.6,

                    "pyro_dmg_": 0, "hydro_dmg_": 1, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["hp_", "enerRech_"],
                    "EQUIP_RING": ["hydro_dmg_", "hp_"],
                    "EQUIP_DRESS": ["critDMG_","critRate_", "hp_"]
                },

                bestSets: ["MarechausseeHunter:4"],
                goodSets: ["WanderersTroupe:4", "HeartOfDepth:4", "TenacityOfTheMillelith:2", "VourukashasGlow:2", "HeartOfDepth:2", "NymphsDream:2"],

                er_req: 130,

                team: [
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },
                    { role: "Support", name: ["Kazuha", "Lanyan"], element: ["anemo", "anemo"] },
                    { role: "Support", name: "Xilonen", element: "geo"
                    }
                ]
            },
            "DPS Gel": {
                name: "DPS Gel",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0, "atk": 0,
                    "hp_": 1, "hp": 0.1,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.6,

                    "pyro_dmg_": 0, "hydro_dmg_": 1, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["hp_"],
                    "EQUIP_RING": ["hydro_dmg_"],
                    "EQUIP_DRESS": ["critDMG_","critRate_"]
                },

                bestSets: ["MarechausseeHunter:4"],
                goodSets: ["WanderersTroupe:4", "HeartOfDepth:4", "HeartOfDepth:2", "NymphsDream:2", "TenacityOfTheMillelith:2", "VourukashasGlow:2"],

                er_req: 130,

                team: [
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },
                    { role: "Sub-DPS", name: "Escoffier", element: "cryo" },
                    { role: "Support", name: "Citlali", element: "cryo"}
                ]
            },
            "DPS Exubérance": {
                name: "DPS Exubérance",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0, "atk": 0,
                    "hp_": 1, "hp": 0.1,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.6,

                    "pyro_dmg_": 0, "hydro_dmg_": 1, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["hp_"],
                    "EQUIP_RING": ["hydro_dmg_"],
                    "EQUIP_DRESS": ["critDMG_","critRate_"]
                },

                bestSets: ["MarechausseeHunter:4", "NightOfTheSkysUnveiling:4"],
                goodSets: ["WanderersTroupe:4", "HeartOfDepth:4", "TenacityOfTheMillelith:2", "VourukashasGlow:2", "HeartOfDepth:2", "NymphsDream:2"],

                er_req: 130,

                team: [
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },
                    { role: "Sub-DPS", name: "Ineffa", element: "electro" },
                    { role: "Sub-DPS", name: "Lauma", element: "dendro"}
                ]
            }
        }
    },

    // 4.2
    "Furina": {
        color: "#4e9eff",
        portraitOffset: -37,

        talents: {
            auto: 1,
            skill: 8,
            burst: 10
        },

        buffs: [
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C2 : « Comme la plume au vent, femme est volage » (Bonus Max)",
                        cons: 2,
                        stats: {
                            hp_: 1.4
                        }
                    }
                ]
            }
        ],

        builds: {
            "Support et sub-DPS universel": {
                name: "Support et sub-DPS universel",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0, "atk": 0,
                    "hp_": 1, "hp": 0.1,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 1, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["enerRech_", "hp_"],
                    "EQUIP_RING": ["hp_", "hydro_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                bestSets: ["GoldenTroupe:4", "TenacityOfTheMillelith:4"],
                goodSets: ["OceanHuedClam:4", "NoblesseOblige:4", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "HeartOfDepth:2", "NymphsDream:2", "TenacityOfTheMillelith:2", "VourukashasGlow:2"],

                er_req: 180,

                team: [
                    { role: "DPS", name: "Neuvillette", element: "hydro" },
                    { role: "Support", name: "Xilonen", element: "geo" },
                    { role: "Support", name: "Kazuha", element: "anemo" }
                ]
            }
        }
    },
    "Charlotte": {
        color: "#a64d6d",
        portraitOffset: -37,

        talents: {
            auto: 1,
            skill: 1,
            burst: 10
        },

        buffs: [
            {
                category: "A4 : Enquête de diversité",
                selectMode: "exclusive",
                buffs: [
                    {
                        label: "3 alliés de Fontaine (+15% Soins)",
                        active: true,
                        stats: { heal_: 0.15 }
                    },
                    {
                        label: "2 Fontaine / 1 Autre (+10% Soins, +5% DGT Cryo)",
                        active: false,
                        stats: { heal_: 0.10, cryo_dmg_: 0.05 }
                    },
                    {
                        label: "1 Fontaine / 2 Autres (+5% Soins, +10% DGT Cryo)",
                        active: false,
                        stats: { heal_: 0.05, cryo_dmg_: 0.10 }
                    },
                    {
                        label: "3 alliés d'autres régions (+15% DGT Cryo)",
                        active: false,
                        stats: { cryo_dmg_: 0.15 }
                    }
                ]
            },
            {
                category: "C2 : Une poursuite de la vérité",
                selectMode: "exclusive",
                buffs: [
                    {
                        label: "1 ennemi touché",
                        cons: 2,
                        active: false,
                        stats: { atk_: 0.10 }
                    },
                    {
                        label: "2 ennemis touchés",
                        cons: 2,
                        active: false,
                        stats: { atk_: 0.20 }
                    },
                    {
                        label: "3 ennemis touchés ou +",
                        cons: 2,
                        active: true,
                        stats: { atk_: 0.30 }
                    }
                ]
            }
        ],

        builds: {
            "Healer universel": {
                name: "Healer universel",

                weights: {
                    "critRate_": 0.4, "critDMG_": 0,
                    "atk_": 1, "atk": 0.8,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 1
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["enerRech_", "atk_"],
                    "EQUIP_RING": ["atk_"],
                    "EQUIP_DRESS": ["heal_", "atk_", "critRate_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["NoblesseOblige:4", "TenacityOfTheMillelith:4", "OceanHuedClam:4"],
                goodSets: ["MaidenBeloved:4", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "MaidenBeloved:2", "OceanHuedClam:2", "SongOfDaysPast:2"],

                er_req: 200,

                team: [
                    { role: "", name: "", element: "" },
                    { role: "", name: "", element: "" },
                    { role: "", name: "", element: "" },
                ]
            }
        }
    },

    // 4.3
    "Navia": {
        color: "#caa53c",
        portraitOffset: -37,

        talents: {
            auto: 6,
            skill: 10,
            burst: 6
        },

        buffs: [
            {
                category: "Passifs",
                selectMode: "exclusive",
                data: [
                    {
                        label: "A4 : Réseau d'assistance mutuelle (1 allié Pyro/Hydro/Cryo/Électro)",
                        active: false,
                        stats: {
                            atk_: 0.20,
                        }
                    },
                    {
                        label: "A4 : Réseau d'assistance mutuelle (2 alliés Pyro/Hydro/Cryo/Électro)",
                        active: true,
                        stats: {
                            atk_: 0.40,
                        }
                    }
                ]
            },
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C2 : Quête de victoire de la présidente (pour la compétence)",
                        cons: 2,
                        active: false,
                        stats: {
                            critRate_: 0.36
                        }
                    },
                    {
                        label: "C6 : Finesse flexible de la présidente de la Spina (pour la compétence)",
                        cons: 6,
                        stats: {
                            critDMG_: 1.35
                        }
                    }
                ]
            }
        ],

        builds: {
            "DPS cristallisation": {
                name: "DPS cristallisation",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.3,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 1, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["geo_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                bestSets: ["NighttimeWhispersInTheEchoingWoods:4", "MarechausseeHunter:4"],
                goodSets: ["ArchaicPetra:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "GoldenTroupe:2"],

                er_req: 130,

                team: [
                    { role: "Support", name: "Furina", element: "hydro" },

                    { role: "Support", name: "Xilonen", element: "geo" },

                    {
                        role: "Support",
                        name: "Bennett",
                        element: "pyro"
                    }
                ]
            },
            "DPS Sélénocristallisation": {
                name: "DPS Sélénocristallisation",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.4, "enerRech_": 0.3,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 1, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["geo_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                bestSets: ["NighttimeWhispersInTheEchoingWoods:4"],
                goodSets: ["ArchaicPetra:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "GoldenTroupe:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 130,

                team: [
                    { role: "Support", name: "Columbina", element: "hydro" },

                    { role: "Support", name: "Xilonen", element: "geo" },

                    {
                        role: "Support",
                        name: "Furina",
                        element: "hydro"
                    }
                ]
            }
        }
    },
    "Chevreuse": {
        color: "#c7445d",
        portraitOffset: -36,

        talents: {
            auto: 1,
            skill: 10,
            burst: 6
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A4 : Manœuvre de coordination tactique",
                        active: true,
                        stats: {
                            atk_bonus_scaling: {
                                source: "hp",
                                percent: 0.00001,
                                max: 0.40
                            }
                        }
                    }
                ]
            },
            {
                category: "Constellations",
                selectMode: "cumulative",
                buffs: [
                    {
                        label: "C6 : Poursuite de l'anéantissement du mal (1 stack)",
                        cons: 6,
                        stats: {
                            elemental_dmg_: 0.20,
                            electro_dmg_: 0.20
                        }
                    },
                    {
                        label: "C6 : Poursuite de l'anéantissement du mal (2 stacks)",
                        cons: 6,
                        stats: {
                            elemental_dmg_: 0.20,
                            electro_dmg_: 0.20
                        }
                    },
                    {
                        label: "C6 : Poursuite de l'anéantissement du mal (3 stacks)",
                        cons: 6,
                        stats: {
                            elemental_dmg_: 0.20,
                            electro_dmg_: 0.20
                        }
                    }
                ]
            }
        ],

        builds: {
            "Buffer surcharge": {
                name: "Buffer surcharge",

                weights: {
                    "critRate_": 0.4, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 1, "hp": 0.8,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 1
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["enerRech_", "hp_"],
                    "EQUIP_RING": ["hp_"],
                    "EQUIP_DRESS": ["heal_", "hp_", "critRate_"]
                },

                hideUIStats: ["critDMG_", "eleMas"],
                showUIStats: ["atk", "electro_dmg_"],

                bestSets: ["NoblesseOblige:4"],
                goodSets: ["SongOfDaysPast:4", "ScrollOfTheHeroOfCinderCity:4", "TenacityOfTheMillelith:4", "TenacityOfTheMillelith:2", "VourukashasGlow:2", "MaidenBeloved:2", "OceanHuedClam:2", "SongOfDaysPast:2"],

                er_req: 170,

                team: [
                    { role: "Flex", name: "", element: "pyro" },
                    { role: "Flex", name: "", element: "electro" },
                    { role: "Flex", name: "", element: "electro" }
                ]
            }
        }
    },

    // 4.4
    "Xianyun": {
        color: "#226b7f",
        portraitOffset: -38,

        talents: {
            auto: 1,
            skill: 9,
            burst: 10
        },

        buffs: [
            {
                category: "A1 : Poursuite des plumes de givre",
                selectMode: "exclusive",
                buffs: [
                    {
                        label: "1 stack (uniquement attaques plongeantes)",
                        active: false,
                        stats: { critRate_: 0.04 }
                    },
                    {
                        label: "2 stacks (uniquement attaques plongeantes)",
                        active: false,
                        stats: { critRate_: 0.06 }
                    },
                    {
                        label: "3 stacks (uniquement attaques plongeantes)",
                        active: false,
                        stats: { critRate_: 0.08 }
                    },
                    {
                        label: "4 stacks (uniquement attaques plongeantes)",
                        active: false,
                        stats: { critRate_: 0.10 }
                    }
                ]
            },
            {
                category: "C2 : Réclusion du monde",
                buffs: [
                    {
                        label: "Après la compétence",
                        cons: 2,
                        stats: {
                            atk_: 0.20
                        }
                    }
                ]
            },
            {
                category: "C6 : Souffle-Nuages est son nom",
                selectMode: "exclusive",
                buffs: [
                    {
                        label: "1 utilisation",
                        cons: 6,
                        stats: {
                            crit_dmg_: 0.15
                        }
                    },
                    {
                        label: "2 utilisations",
                        cons: 6,
                        stats: {
                            crit_dmg_: 0.35
                        }
                    },
                    {
                        label: "3 utilisations",
                        cons: 6,
                        stats: {
                            crit_dmg_: 0.70
                        }
                    }
                ]
            }
        ],

        builds: {
            "Support attaques plongeantes": {
                name: "Support attaques plongeantes",

                weights: {
                    "critRate_": 0.4, "critDMG_": 0,
                    "atk_": 1, "atk": 0.8,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "enerRech_"],
                    "EQUIP_RING": ["atk_"],
                    "EQUIP_DRESS": ["atk_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["ViridescentVenerer:4", "OceanHuedClam:4", "NoblesseOblige:4"],
                goodSets: ["SongOfDaysPast:4", "EmblemOfSeveredFate:4", "MaidenBeloved:4", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "MaidenBeloved:2", "OceanHuedClam:2", "SongOfDaysPast:2"],

                er_req: 200,

                team: [
                    { role: "DPS", name: "Xiao", element: "anemo" },
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },
                    { role: "Support", name: "Faruzan", element: "anemo" },
                ]
            }
        }
    },
    "Gaming": {
        color: "#d96155",
        portraitOffset: -36,

        talents: {
            auto: 8,
            skill: 10,
            burst: 9
        },

        buffs: [
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C2 : Sur les fleurs de prunier",
                        cons: 2,
                        active: true,
                        stats: {
                            atk_: 0.20
                        }
                    },
                    {
                        label: "C6 : En apprivoisant les bêtes (uniquement l'attaque plongée de la compétence)",
                        cons: 6,
                        active: false,
                        stats: {
                            critRate_: 0.20,
                            critDMG_: 0.40
                        }
                    }
                ]
            }
        ],

        builds: {
            "DPS évaporation": {
                name: "DPS évaporation",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.6, "enerRech_": 0.8,

                    "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas", "atk_", "enerRech_"],
                    "EQUIP_RING": ["pyro_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["CrimsonWitchOfFlames:4", "MarechausseeHunter:4", "LongNightsOath:4"],
                goodSets: ["GildedDreams:4", "VermillionHereafter:4","LongNightsOath:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "CrimsonWitchOfFlames:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 150,

                team: [
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },
                    { role: "Support", name: "Liuyun", element: "anemo" },
                    { role: "Support", name: "Bennett", element: "pyro" },
                ]
            },
            "DPS fonte": {
                name: "DPS fonte",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.6, "enerRech_": 0.8,

                    "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas", "atk_", "enerRech_"],
                    "EQUIP_RING": ["pyro_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["CrimsonWitchOfFlames:4", "LongNightsOath:4"],
                goodSets: ["GildedDreams:4", "VermillionHereafter:4","LongNightsOath:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "CrimsonWitchOfFlames:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 150,

                team: [
                    { role: "Support", name: "Citlali", element: "cryo" },
                    { role: "Support", name: "Liuyun", element: "anemo" },
                    { role: "Support", name: "Bennett", element: "pyro" },
                ]
            },
            "DPS surcharge": {
                name: "DPS surcharge",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.8,

                    "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "enerRech_"],
                    "EQUIP_RING": ["pyro_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["CrimsonWitchOfFlames:4", "LongNightsOath:4"],
                goodSets: ["VermillionHereafter:4", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "CrimsonWitchOfFlames:2"],

                er_req: 150,

                team: [
                    { role: "Support", name: "Chevreuse", element: "pyro" },
                    { role: "Sub-DPS", name: "Fischl", element: "electro" },
                    { role: "Support", name: ["Bennett", "Iansan"], element: ["pyro", "electro"] },
                ]
            }
        }
    },

    // 4.5
    "Chiori": {
        color: "#D44B10",
        portraitOffset: -37,
        talents: {
            auto: 1,
            skill: 10,
            burst: 8
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A4 : Retouche finale",
                        active: true,
                        stats: {
                            geo_dmg_: 0.20,
                        }
                    }
                ]
            },
        ],

        builds: {
            "Sub-DPS Géo": {
                name: "Sub-DPS Géo",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.4, "atk": 0,
                    "hp_": 0, "hp": 0,
                    "def_": 0.8, "def": 0.1,
                    "eleMas": 0, "enerRech_": 0.6,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 1, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["def_"],
                    "EQUIP_RING": ["geo_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: ["heal_"],
                showUIStats: ["atk"],

                bestSets: ["GoldenTroupe:4", "HuskOfOpulentDreams:4"],
                goodSets: ["GoldenTroupe:2", "HuskOfOpulentDreams:2", "ArchaicPetra:2"],

                er_req: 160,

                team: [
                    { role: "DPS", name: "Itto", element: "geo" },
                    { role: "Support", name: "Gorou", element: "geo" },
                    { role: "Support", name: "Zhongli", element: "geo" },
                ]
            }
        }
    },

    // 4.6
    "Arlecchino": {
        color: "#AB3D2D",
        portraitOffset: -38,
        talents: {
            auto: 10,
            skill: 8,
            burst: 6
        },
        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A1 : Masque Rouge (En combat)",
                        stats: {
                            pyro_dmg_: 0.40
                        }
                    }
                ]
            },
            {
                category: "Constellations",
                selectMode: "cumulative",
                buffs: [
                    {
                        label: "C1 : Masque de la Mort Rouge",
                        cons: 1,
                        stats: {
                        }
                    },
                    {
                        label: "C2 : Ordre Royal",
                        cons: 2,
                        stats: {
                        }
                    }
                ]
            }
        ],
        builds: {
            "DPS Fonte": {
                name: "DPS Fonte",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.6, "enerRech_": 0,
                    "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0, "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0, "dendro_dmg_": 0, "physical_dmg_": 0,
                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas", "atk_"],
                    "EQUIP_RING": ["pyro_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                bestSets: ["FragmentOfHarmonicWhimsy:4", "GladiatorsFinale:4"],
                goodSets: ["EchoesOfAnOffering:4", "CrimsonWitchOfFlames:2", "CrimsonWitchOfFlames:4", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 100,

                team: [
                    { role: "Support", name: "Citlali", element: "cryo" },
                    { role: "Support", name: "Xilonen", element: "geo" },
                    { role: "Support", name: "Bennett", element: "pyro" },
                ]
            },
            "DPS Surcharge": {
                name: "DPS Surcharge",
                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0,
                    "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0, "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0, "dendro_dmg_": 0, "physical_dmg_": 0,
                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["pyro_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                bestSets: ["FragmentOfHarmonicWhimsy:4", "GladiatorsFinale:4"],
                goodSets: ["EchoesOfAnOffering:4", "CrimsonWitchOfFlames:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "CrimsonWitchOfFlames:4"],

                er_req: 100,

                team: [
                    { role: "Support", name: "Chevreuse", element: "pyro" },
                    { role: "Sub-DPS", name: "Fischl", element: "electro" },
                    { role: "Support", name: "Nicole", element: "pyro" }
                ]
            },
            "DPS mono Pyro": {
                name: "DPS mono Pyro",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0,
                    "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0, "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0, "dendro_dmg_": 0, "physical_dmg_": 0,
                    "heal_": 0
                },

                bestSets: ["FragmentOfHarmonicWhimsy:4", "GladiatorsFinale:4"],
                goodSets: ["EchoesOfAnOffering:4", "CrimsonWitchOfFlames:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2"],

                er_req: 100,

                team: [
                    { role: "Sustain", name: "Bennett", element: "pyro" },
                    { role: "Sub-DPS", name: "Xiangling", element: "pyro" },
                    { role: "Support", name: "Kazuha", element: "anemo" }
                ]
            }
        }
    },

    // 4.7
    "Clorinde": {
        color: "#3939f6",
        portraitOffset: -35,

        talents: {
            auto: 1,
            skill: 10,
            burst: 8
        },

        buffs: [
            {
                category: "Passifs",
                selectMode: "cumulative",
                buffs: [
                    {
                        label: "A4 : Rémunération honorant le pacte (1 Stack)",
                        active: true,
                        stats: { critRate_: 0.10 }
                    },
                    {
                        label: "A4 : Rémunération honorant le pacte (2 Stacks)",
                        active: true,
                        stats: { critRate_: 0.10 }
                    }
                ]
            },
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C6 : « Ainsi, je ne désespérerai jamais plus »",
                        cons: 6,
                        active: false,
                        stats: {
                            critRate_: 0.10,
                            critDMG_: 0.70
                        }
                    }
                ]
            }
        ],

        builds: {
            "DPS Surcharge": {
                name: "DPS Surcharge",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.5,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 1,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["electro_dmg_", "atk_"],
                    "EQUIP_DRESS": ["critDMG_", "critRate_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["FragmentOfHarmonicWhimsy:4"],
                goodSets: ["ThunderingFury:4", "GladiatorsFinale:4", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "ThunderingFury:2"],

                er_req: 130,

                team: [
                    { role: "Sub-DPS", name: "Durin", element: "pyro" },
                    { role: "Support", name: "Chevreuse", element: "pyro" },
                    { role: "Sub-DPS", name: "Fischl", element: "electro" },
                ]
            },
            "DPS Stimulation": {
                name: "DPS Stimulation",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.6, "atk": 0.06,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.8, "enerRech_": 0.5,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 1,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "eleMas"],
                    "EQUIP_RING": ["electro_dmg_", "atk_"],
                    "EQUIP_DRESS": ["critDMG_", "critRate_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["FragmentOfHarmonicWhimsy:4"],
                goodSets: ["ThunderingFury:4", "GladiatorsFinale:4","ThunderingFury:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 130,

                team: [
                    { role: "Support", name: "Nahida", element: "dendro" },
                    { role: "Support", name: "Lauma", element: "dendro" },
                    { role: "Sub-DPS", name: "Fischl", element: "electro" },
                ]
            },
            "DPS Sélénocution": {
                name: "DPS Sélénocution",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.4, "enerRech_": 0.5,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 1,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["electro_dmg_", "atk_"],
                    "EQUIP_DRESS": ["critDMG_", "critRate_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["FragmentOfHarmonicWhimsy:4", "NightOfTheSkysUnveiling:4"],
                goodSets: ["ThunderingFury:4", "GladiatorsFinale:4", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "ThunderingFury:2"],

                er_req: 130,

                team: [
                    { role: "Sub-DPS", name: "Ineffa", element: "electro" },
                    { role: "Sub-DPS", name: "Columbina", element: "hydro" },
                    { role: "Support", name: "Sucrose", element: "anemo" },
                ]
            }
        }
    },
    "Sigewinne": {
        color: "#6cc9ff",
        portraitOffset: -34,

        talents: {
            auto: 1,
            skill: 10,
            burst: 8
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A1 : Repos adéquat requis",
                        stats: {
                            elemental_dmg_: 0.08,
                        }
                    },
                    {
                        label: "A4 : Traitement minutieux prescrit",
                        stats: {
                            heal_: 0.30
                        }
                    }
                ]
            },
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C6 : « Le plus radieux des esprits peut-il prier pour moi ? »",
                        cons: 6,
                        active: false,
                        stats: {
                            critRate__bonus_scaling: {
                                source: "hp",
                                percent: 0.0004,
                                max: 20
                            },
                            critDMG__bonus_scaling: {
                                source: "hp",
                                percent: 0.0022,
                                max: 110
                            }
                        }
                    }
                ]
            }
        ],

        builds: {
            "Support universel": {
                name: "Support universel",

                weights: {
                    "critRate_": 0, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 1, "hp": 0.8,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.8,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 1
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["hp_", "enerRech_"],
                    "EQUIP_RING": ["hp_"],
                    "EQUIP_DRESS": ["hp_", "heal_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["SongOfDaysPast:4", "OceanHuedClam:4"],
                goodSets: ["TenacityOfTheMillelith:2", "VourukashasGlow:2", "MaidenBeloved:2", "OceanHuedClam:2", "SongOfDaysPast:2"],

                er_req: 160,

                team: [
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },
                    { role: "Sub-DPS", name: "Fischl", element: "electro" },
                    { role: "Support", name: "Nahida", element: "dendro" }
                ]
            },
            "Sub-DPS Burst": {
                name: "Sub-DPS Burst",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0, "atk": 0,
                    "hp_": 1, "hp": 0.1,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.8,

                    "pyro_dmg_": 0, "hydro_dmg_": 1, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["hp_", "enerRech_"],
                    "EQUIP_RING": ["hydro_dmg_", "hp_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_", "hp_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["EmblemOfSeveredFate:4", "VourukashasGlow:4"],
                goodSets: ["TenacityOfTheMillelith:2", "VourukashasGlow:2", "HeartOfDepth:2", "NymphsDream:2"],

                er_req: 180,

                team: [
                    { role: "Support", name: "Furina", element: "hydro" },
                    { role: "Support", name: "Kazuha", element: "anemo" },
                    { role: "Sub-DPS", name: "Xiangling", element: "pyro" }
                ]
            }
        }
    },
    "Sethos": {
        color: "#352865",
        portraitOffset: -36,

        talents: {
            auto: 9,
            skill: 9,
            burst: 8
        },

        buffs: [
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C1 : Chant du sanctuaire scellé (attaque chargée uniquement)",
                        active: false,
                        cons: 1,
                        stats: {
                            critRate_: 0.15
                        }
                    },
                    {
                        label: "C2 : Papyrus du secret silencieux",
                        active: true,
                        cons: 2,
                        stats: {
                            elemental_dmg_: 0.15
                        }
                    },
                    {
                        label: "C4 : Collection de la plume bienveillante",
                        active: true,
                        cons: 4,
                        stats: {
                            eleMas: 80
                        }
                    }
                ]
            }
        ],

        builds: {
            "DPS Propagation": {
                name: "DPS Propagation",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0, "atk": 0,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.8, "enerRech_": 0.8,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 1,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas", "enerRech_"],
                    "EQUIP_RING": ["electro_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: ["atk"],

                bestSets: ["WanderersTroupe:4", "GildedDreams:4"],
                goodSets: ["DesertPavilionChronicle:4", "MarechausseeHunter:2", "ThunderingFury:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 140,

                team: [
                    { role: "Sub-DPS", name: "Fischl", element: "electro" },
                    { role: "", name: "", element: "dendro" },
                    { role: "", name: "", element: "dendro" },
                ]
            }
        }
    },

    // 4.8
    "Émilie": {
        color: "#236655",
        portraitOffset: -37,

        talents: {
            auto: 1,
            skill: 10,
            burst: 8
        },

        builds: {
            "Sub-DPS Brûlure": {
                name: "Sub-DPS Brûlure",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.4,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 1, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["dendro_dmg_", "atk_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["UnfinishedReverie:4", "DeepwoodMemories:4"],
                goodSets: ["DeepwoodMemories:2", "GoldenTroupe:2", "GoldenTroupe:4", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2"],

                er_req: 140,

                team: [
                    { role: "DPS", name: "Kinich", element: "dendro" },
                    { role: "Sub-DPS", name: "Mavuika", element: "pyro" },
                    { role: "Support", name: "Bennett", element: "pyro" },
                ]
            }
        }
    },

    // 5.0
    "Mualani": {
        color: "#1F4DCD",
        portraitOffset: -36,

        talents: {
            auto: 1,
            skill: 10,
            burst: 8
        },

        builds: {
            "DPS Évaporation": {
                name: "DPS Évaporation",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0, "atk": 0,
                    "hp_": 1, "hp": 0.1,
                    "def_": 0, "def": 0,
                    "eleMas": 0.6, "enerRech_": 0.1,

                    "pyro_dmg_": 0, "hydro_dmg_": 1, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["hp_", "eleMas"],
                    "EQUIP_RING": ["hydro_dmg_", "hp_"],
                    "EQUIP_DRESS": ["critDMG_", "critRate_", "hp_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["ObsidianCodex:4"],
                goodSets: ["UnfinishedReverie:4", "HeartOfDepth:4","ObsidianCodex:2", "HeartOfDepth:2", "TenacityOfTheMillelith:2", "VourukashasGlow:2", "NymphsDream:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 100,

                team: [
                    { role: "Sub-DPS", name: "Mavuika", element: "pyro" },
                    { role: "Support", name: "Xilonen", element: "geo" },
                    { role: "Flex", name: ["Citlali", "Sucrose"], element: ["cryo", "anemo"] }
                ]
            },
            "DPS Hexerei": {
                name: "DPS Hexerei",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0, "atk": 0,
                    "hp_": 1, "hp": 0.1,
                    "def_": 0, "def": 0,
                    "eleMas": 0.6, "enerRech_": 0.1,

                    "pyro_dmg_": 0, "hydro_dmg_": 1, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["hp_", "eleMas"],
                    "EQUIP_RING": ["hydro_dmg_", "hp_"],
                    "EQUIP_DRESS": ["critDMG_", "critRate_", "hp_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["ObsidianCodex:4"],
                goodSets: ["UnfinishedReverie:4", "HeartOfDepth:4","ObsidianCodex:2", "HeartOfDepth:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "TenacityOfTheMillelith:2", "VourukashasGlow:2", "NymphsDream:2"],

                er_req: 100,

                team: [
                    { role: "Sub-DPS", name: "Mavuika", element: "pyro" },
                    { role: "Support", name: "Mona", element: "hydro" },
                    { role: "Support", name: "Sucrose", element: "anemo" }
                ]
            }
        }
    },
    "Kinich": {
        color: "#0b3b24",
        portraitOffset: -35,

        talents: {
            auto: 1,
            skill: 10,
            burst: 8
        },

        buffs: [
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C1 : Bec de perroquet (uniquement le canon)",
                        cons: 1,
                        stats: {
                            critDMG_: 1.00
                        }
                    }
                ]
            }
        ],

        builds: {
            "DPS Brûlure": {
                name: "DPS Brûlure",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 1, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["dendro_dmg_"],
                    "EQUIP_DRESS": ["critDMG_", "critRate_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["ObsidianCodex:4"],
                goodSets: ["UnfinishedReverie:4", "MarechausseeHunter:4", "GoldenTroupe:4", "DeepwoodMemories:4", "MarechausseeHunter:2", "GoldenTroupe:2", "DeepwoodMemories:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "ObsidianCodex:2"],

                er_req: 110,

                team: [
                    { role: "Sub-DPS", name: "Emilie", element: "dendro" },
                    { role: "Sub-DPS", name: "Durin", element: "pyro" },
                    { role: "Support", name: "Nicole", element: "pyro" },
                ]
            }
        }
    },
    "Kachina": {
        color: "#cd6e0c",
        portraitOffset: -40,

        talents: {
            auto: 1,
            skill: 10,
            burst: 8
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A1 : Écho de la montagne",
                        active: true,
                        stats: {
                            elemental_dmg_: 0.20,
                        }
                    }
                ]
            },
            {
                category: "C4 : Ennemis nombreux, attention redoublée",
                selectMode: "exclusive",
                buffs: [
                    {
                        label: "1 ennemi",
                        cons: 4,
                        active: false,
                        stats: {
                            def_: 0.08
                        }
                    },
                    {
                        label: "2 ennemis",
                        cons: 4,
                        active: true,
                        stats: {
                            def_: 0.12
                        }
                    },
                    {
                        label: "3 ennemis",
                        cons: 4,
                        active: false,
                        stats: {
                            def_: 0.16
                        }
                    },
                    {
                        label: "4 ennemis",
                        cons: 4,
                        active: false,
                        stats: {
                            def_: 0.20
                        }
                    }
                ]
            }
        ],

        builds: {
            "Support général": {
                name: "Support général",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0, "atk": 0,
                    "hp_": 0, "hp": 0,
                    "def_": 1, "def": 0.8,
                    "eleMas": 0, "enerRech_": 0.4,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 1, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["def_", "enerRech_"],
                    "EQUIP_RING": ["geo_dmg_", "def_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["ScrollOfTheHeroOfCinderCity:4"],
                goodSets: ["ArchaicPetra:4", "NoblesseOblige:4", "TenacityOfTheMillelith:4", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2"],

                er_req: 120,

                team: [
                    { role: "", name: "", element: "" },
                    { role: "", name: "", element: "" },
                    { role: "", name: "", element: "" },
                ]
            }
        }
    },

    // 5.1
    "Xilonen": {
        color: "#F29700",
        portraitOffset: -36,

        talents: {
            auto: 1,
            skill: 8,
            burst: 8
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A4 : Gaine blindée portable",
                        active: true,
                        stats: {
                            def_: 0.20,
                        }
                    }
                ]
            },
        ],

        builds: {
            "Support universel": {
                name: "Support universel",

                weights: {
                    "critRate_": 0, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 0, "hp": 0,
                    "def_": 1, "def": 0.1,
                    "eleMas": 0, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 1
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["enerRech_", "def_"],
                    "EQUIP_RING": ["def_"],
                    "EQUIP_DRESS": ["def_", "heal_"]
                },

                bestSets: ["ScrollOfTheHeroOfCinderCity:4", "Instructor:4"],
                goodSets: ["HuskOfOpulentDreams:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "MaidenBeloved:2", "OceanHuedClam:2", "SongOfDaysPast:2"],

                er_req: 200,

                team: [
                    { role: "DPS", name: "Mavuika", element: "pyro" },
                    { role: "Support", name: "Citlali", element: "cryo" },
                    { role: "support", name: "Bennett",element: "pyro" }
                ]
            },
            "DPS": {
                name: "DPS",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0, "atk": 0,
                    "hp_": 0, "hp": 0,
                    "def_": 0.8, "def": 0.1,
                    "eleMas": 0, "enerRech_": 0,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 1, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["def_"],
                    "EQUIP_RING": ["geo_dmg_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                bestSets: ["HuskOfOpulentDreams:4", "ScrollOfTheHeroOfCinderCity:4"],
                goodSets: ["HuskOfOpulentDreams:2", "ArchaicPetra:2"],

                er_req: 100,

                team: [
                    { role: "Sub-DPS", name: "Chiori", element: "geo" },
                    { role: "Support", name: "Zhongli", element: "geo" },
                    { role: "Sub-DPS", name: "Yelan",element: "hydro" }
                ]
            }
        }
    },

    // 5.2
    "Chasca": {
        color: "#3EABE0",
        portraitOffset: -39,

        talents: {
            auto: 1,
            skill: 10,
            burst: 8
        },

        builds: {
            "DPS Dispersion": {
                name: "DPS Dispersion",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.3, "enerRech_": 0.1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["atk_"],
                    "EQUIP_DRESS": ["critDMG_", "critRate_"]
                },

                bestSets: ["ObsidianCodex:4"],
                goodSets: ["ViridescentVenerer:4", "ShimenawasReminiscence:4", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2"],

                er_req: 110,

                team: [
                    { role: "Support", name: "Citlali", element: "cryo" },
                    { role: "Support", name: "Iansan", element: "electro" },
                    { role: "Support", name: "Bennett", element: "pyro" },
                ]
            }
        }
    },
    "Ororon": {
        color: "#1458bc",
        portraitOffset: -36,

        talents: {
            auto: 1,
            skill: 6,
            burst: 10
        },

        buffs: [
            {
                category: "C2 : Roi du vin nectarin",
                selectMode: "cumulative",
                buffs: [
                    {
                        label: "1 ennemi touché par le déchaînement",
                        cons: 2,
                        stats: {
                            elemental_dmg_: 0.08
                        }
                    },
                    {
                        label: "2 ennemis touchés par le déchaînement",
                        cons: 2,
                        stats: {
                            elemental_dmg_: 0.08
                        }
                    },
                    {
                        label: "3 ennemis touchés par le déchaînement",
                        cons: 2,
                        stats: {
                            elemental_dmg_: 0.08
                        }
                    },
                    {
                        label: "4 ennemis touchés par le déchaînement",
                        cons: 2,
                        stats: {
                            elemental_dmg_: 0.08
                        }
                    }
                ]
            }
        ],

        builds: {
            "Sub-DPS électrocution": {
                name: "Sub-DPS électrocution",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.8,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 1,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "enerRech_"],
                    "EQUIP_RING": ["electro_dmg_", "atk_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["ScrollOfTheHeroOfCinderCity:4"],
                goodSets: ["NoblesseOblige:4", "Instructor:4", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "ThunderingFury:2"],

                er_req: 140,

                team: [
                    { role: "DPS", name: "Neuvillette", element: "hydro" },
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },
                    { role: "Support", name: "Kazuha", element: "anemo" },
                ]
            },
            "Sub-DPS surcharge": {
                name: "Sub-DPS surcharge",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.8,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 1,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "enerRech_"],
                    "EQUIP_RING": ["electro_dmg_", "atk_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["ScrollOfTheHeroOfCinderCity:4"],
                goodSets: ["NoblesseOblige:4", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "ThunderingFury:2"],

                er_req: 120,

                team: [
                    { role: "Support", name: "Chevreuse", element: "pyro" },
                    { role: "Flex", name: "", element: "pyro" },
                    { role: "Flex", name: "", element: "electro" },
                ]
            }
        }
    },

    // 5.3
    "Mavuika": {
        color : "#C74644",
        portraitOffset: -35,
        talents: {
            auto: 1,
            skill: 8,
            burst: 10
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A1 : Cadeau de fleurs enflammées",
                        active: true,
                        stats: {
                            atk_: 0.30,
                        }
                    }
                ]
            },
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C1 : Confession du seigneur de la nuit",
                        cons: 1,
                        stats: {
                            atk_: 0.40
                        }
                    },
                    {
                        label: "C2 : Prix des braises cendrées",
                        cons: 2,
                        stats: {
                            atk: 200
                        }
                    }
                ]
            }
        ],

        builds: {
            "DPS Fonte": {
                name: "DPS Fonte",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.6, "enerRech_": 0,

                    "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas", "atk_"],
                    "EQUIP_RING": ["pyro_dmg_", "atk_"],
                    "EQUIP_DRESS": ["critDMG_", "critRate_"]
                },

                bestSets: ["ObsidianCodex:4", "CrimsonWitchOfFlames:4"],
                goodSets: ["ObsidianCodex:2", "CrimsonWitchOfFlames:2", "GildedDreams:4", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 100,

                team: [
                    { role: "Support", name: "Citlali", element: "cryo" },
                    { role: "Support", name: "Xilonen", element: "geo" },
                    { role: "Support", name: "Bennett", element: "pyro" },
                ]
            },
            "DPS Surcharge": {
                name: "DPS Surcharge",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0,

                    "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["pyro_dmg_", "atk_"],
                    "EQUIP_DRESS": ["critDMG_", "critRate_"]
                },

                bestSets: ["ObsidianCodex:4", "CrimsonWitchOfFlames:4"],
                goodSets: ["ObsidianCodex:2", "CrimsonWitchOfFlames:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2"],

                er_req: 100,

                team: [
                    { role: "DPS", name: "Varesa", element: "electro" },
                    { role: "Support", name: "Chevreuse", element: "pyro" },
                    { role: "Support", name: "Iansan", element: "electro" },
                ]
            }
        }
    },
    "Citlali": {
        color: "#d4a5ff",
        portraitOffset: -35,

        talents: {
            auto: 1,
            skill: 8,
            burst: 8
        },

        buffs: [
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C2 : Patrouille de dévoreur de cœurs",
                        cons: 2,
                        stats: {
                            eleMas: 125
                        }
                    }
                ]
            }
        ],

        builds: {
            "Support universel (Fonte et Gel)": {
                name: "Support universel (Fonte et Gel)",

                weights: {
                    "critRate_": 0, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 1, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas", "enerRech_"],
                    "EQUIP_RING": ["eleMas"],
                    "EQUIP_DRESS": ["eleMas"]
                },

                hideUIStats: [],
                showUIStats: ["hp"],

                bestSets: ["ScrollOfTheHeroOfCinderCity:4", "Instructor:4"],
                goodSets: ["TenacityOfTheMillelith:4", "GildedDreams:4", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2"],

                er_req: 180,

                team: [
                    {
                        role: "Flex",
                        name: ["Mavuika", "SkirkNew"],
                        element: ["pyro", "cryo"]
                    },
                    {
                        role: "Flex",
                        name: ["Xilonen", "Furina"],
                        element: ["geo", "hydro"]
                    },
                    {
                        role: "Flex",
                        name: ["Bennett", "Escoffier"],
                        element: ["pyro", "cryo"]
                    }
                ]
            }
        }
    },
    "Lan Yan": {
        color: "#0f95a2",
        portraitOffset: -35,

        talents: {
            auto: 1,
            skill: 10,
            burst: 9
        },

        buffs: [
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C4 : « Des perles de sang de faucon-dragon en ornement »",
                        cons: 4,
                        stats: {
                            eleMas: 60
                        }
                    }
                ]
            }
        ],

        builds: {
            "Shieldeuse générale": {
                name: "Shieldeuse générale",

                weights: {
                    "critRate_": 0.4, "critDMG_": 0,
                    "atk_": 1, "atk": 0.8,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.4, "enerRech_": 0.8,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "enerRech_"],
                    "EQUIP_RING": ["atk_"],
                    "EQUIP_DRESS": ["atk_", "critRate_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["ViridescentVenerer:4", "ScrollOfTheHeroOfCinderCity:4"],
                goodSets: ["GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2"],

                er_req: 200,

                team: [
                    { role: "", name: "", element: "" },
                    { role: "", name: "", element: "" },
                    { role: "", name: "", element: "" },
                ]
            }
        }
    },

    // 5.4
    "Yumemizuki Mizuki": {
        color: "#e38ff1",
        portraitOffset: -36,

        talents: {
            auto: 1,
            skill: 8,
            burst: 6
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A2 : Pensées de jour, rêveries de nuit",
                        active: true,
                        stats: {
                            eleMas: 100,
                        }
                    }
                ]
            }
        ],

        builds: {
            "Driver Dispersion": {
                name: "Driver Dispersion",

                weights: {
                    "critRate_": 0, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 1, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas","enerRech_"],
                    "EQUIP_RING": ["eleMas"],
                    "EQUIP_DRESS": ["eleMas"]
                },

                hideUIStats: [],
                showUIStats: ["atk"],

                bestSets: ["ViridescentVenerer:4"],
                goodSets: ["NoblesseOblige:4", "Instructor:4", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2"],

                er_req: 200,

                team: [
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },
                    { role: "Sub-DPS", name: "Ororon", element: "electro" },
                    { role: "Sub-DPS", name: "Mavuika", element: "pyro" },
                ]
            }
        }
    },

    // 5.5
    "Varesa": {
        color: "#E86EE7",
        portraitOffset: -36,
        talents: {
            auto: 8,
            skill: 6,
            burst: 8
        },
        buffs: [
            {
                category: "Passifs",
                selectMode: "exclusive",
                data: [
                    {
                        label: "A4 : L'héroïne une nouvelle fois de retour ! (1 Stack)",
                        active: false,
                        stats: {
                            atk_: 0.35
                        }
                    },
                    {
                        label: "A4 : L'héroïne une nouvelle fois de retour ! (2 Stacks)",
                        active: true,
                        stats: {
                            atk_: 0.70
                        }
                    }
                ]
            },
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C6 : Le triomphe d'une héroïne de la justice",
                        cons: 6,
                        active: false,
                        stats: {
                            critRate_: 0.10,
                            critDMG_: 1,
                        }
                    }
                ]
            }
        ],
        builds: {
            "DPS Surcharge": {
                name: "Surcharge",
                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.8,
                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 1,
                    "dendro_dmg_": 0, "physical_dmg_": 0,
                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["electro_dmg_", "atk_"],
                    "EQUIP_DRESS": ["critDMG_", "critRate_"]
                },

                bestSets: ["LongNightsOath:4", "ObsidianCodex:4"],
                goodSets: ["ThunderingFury:4", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "LongNightsOath:2", "ThunderingFury:2"],

                er_req: 120,

                team: [
                    { role: "Flex", name: ["Mavuika", "Durin"], element: "pyro" },

                    { role: "Support", name: "Chevreuse", element: "pyro" },

                    {
                        role: "Support",
                        name: "Iansan",
                        element: "electro"
                    }
                ]
            },
            "DPS Hypercarry": {
                name: "Hypercarry",
                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.8,
                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 1,
                    "dendro_dmg_": 0, "physical_dmg_": 0,
                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["electro_dmg_", "atk_"],
                    "EQUIP_DRESS": ["critDMG_", "critRate_"]
                },

                bestSets: ["LongNightsOath:4", "ObsidianCodex:4"],
                goodSets: ["MarechausseeHunter:4", "ThunderingFury:4", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "LongNightsOath:2", "ThunderingFury:2"],

                er_req: 120,

                team: [
                    { role: "Support", name: "Furina", element: "hydro" },
                    { role: "Support", name: "Liuyun", element: "anemo" },
                    {
                        role: "Support",
                        name: "Iansan",
                        element: "electro"
                    }
                ]
            },
            "DPS Suractivation": {
                name: "Suractivation",
                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.8, "enerRech_": 0.8,
                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 1,
                    "dendro_dmg_": 0, "physical_dmg_": 0,
                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["electro_dmg_", "atk_"],
                    "EQUIP_DRESS": ["critDMG_", "critRate_"]
                },

                bestSets: ["LongNightsOath:4", "ObsidianCodex:4"],
                goodSets: ["ThunderingFury:4", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "LongNightsOath:2", "ThunderingFury:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 120,

                team: [
                    { role: "Sub-DPS", name: "Lauma", element: "dendro" },

                    { role: "Flex", name: ["Fischl", "Iansan"], element: "electro" },

                    {
                        role: "Support",
                        name: ["Ineffa", "Nahida"],
                        element: ["electro", "dendro"]
                    }
                ]
            },
            "DPS Sélénocution": {
                name: "Sélénocution",
                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.5, "enerRech_": 0.8,
                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 1,
                    "dendro_dmg_": 0, "physical_dmg_": 0,
                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["electro_dmg_", "atk_"],
                    "EQUIP_DRESS": ["critDMG_", "critRate_"]
                },

                bestSets: ["LongNightsOath:4", "ObsidianCodex:4"],
                goodSets: ["ThunderingFury:4", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "LongNightsOath:2", "ThunderingFury:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 130,

                team: [
                    { role: "Support", name: "Columbina", element: "hydro" },
                    { role: "Sub-DPS", name: "Ineffa", element: "electro" },
                    {
                        role: "Support",
                        name: "Liuyun",
                        element: "anemo"
                    }
                ]
            }

        }
    },
    "Iansan": {
        color: "#593cb5",
        portraitOffset: -35,

        talents: {
            auto: 1,
            skill: 1,
            burst: 10
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A1 : Formation de résistance améliorée",
                        active: true,
                        stats: {
                            atk_: 0.20,
                        }
                    }
                ]
            }
        ],

        builds: {
            "Buffer universel": {
                name: "Buffer universel",

                weights: {
                    "critRate_": 0.4, "critDMG_": 0,
                    "atk_": 1, "atk": 0.8,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["enerRech_", "atk_"],
                    "EQUIP_RING": ["atk_"],
                    "EQUIP_DRESS": ["atk_", "critRate_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["ScrollOfTheHeroOfCinderCity:4", "NoblesseOblige:4"],
                goodSets: ["GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2"],

                er_req: 170,

                team: [
                    { role: "", name: "", element: "" },
                    { role: "", name: "", element: "" },
                    { role: "", name: "", element: "" },
                ]
            }
        }
    },

    // 5.6
    "Escoffier": {
        color: "#4CBCFD",
        portraitOffset: -35,

        talents: {
            auto: 1,
            skill: 8,
            burst: 6
        },

        buffs: [
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C1 : Danse pour les papilles gustatives",
                        cons: 1,
                        stats: {
                            critDMG_: 0.60
                        }
                    }
                ]
            }
        ],

        builds: {
            "Gel": {
                name: "Gel",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.7,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 1,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                bestSets: ["GoldenTroupe:4"],
                goodSets: ["BlizzardStrayer:4", "NoblesseOblige:4", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "BlizzardStrayer:2", "FinaleOfTheDeepGalleries:2"],

                er_req: 170,

                team: [
                    { role: "DPS", name: "SkirkNew", element: "cryo" },

                    { role: "Sub-DPS", name: "Furina", element: "hydro" },

                    {
                        role: "Flex",
                        element: ["hydro", "cryo"]
                    }
                ]
            }
        }
    },
    "Ifa": {
        color: "#23aba4",
        portraitOffset: -38,

        talents: {
            auto: 1,
            skill: 8,
            burst: 8
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A4 : Accord d'entraide (éruption noctâme)",
                        active: true,
                        stats: {
                            eleMas: 80,
                        }
                    }
                ]
            },
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C4 : Permutation de vaisseau en décomposition (utilisation du déchaînement)",
                        cons: 4,
                        stats: {
                            eleMas: 100
                        }
                    }
                ]
            }
        ],

        builds: {
            "Driver dispersion": {
                name: "Driver dispersion",

                weights: {
                    "critRate_": 0.4, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 1, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas", "enerRech_"],
                    "EQUIP_RING": ["eleMas"],
                    "EQUIP_DRESS": ["eleMas", "heal_"]
                },

                hideUIStats: [],
                showUIStats: ["atk"],

                bestSets: ["ViridescentVenerer:4"],
                goodSets: ["ScrollOfTheHeroOfCinderCity:4", "GildedDreams:4", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2"],

                er_req: 170,

                team: [
                    { role: "Sub-DPS", name: "Olorun", element: "electro" },
                    { role: "Support", name: "Aino", element: "hydro" },
                    { role: "Sub-DPS", name: "Ineffa", element: "electro" },
                ]
            }
        }
    },

    // 5.7
    "Skirk": {
        color: "#0525F4",
        portraitOffset: -37,
        talents: {
            auto: 1,
            skill: 8,
            burst: 8
        },
        buffs: [
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C2 : Abîme profond",
                        cons: 2,
                        stats: {
                            atk_: 0.70
                        }
                    },
                    {
                        label: "C4 : Flux scindé",
                        cons: 4,
                        stats: {
                            atk_: 0.40
                        }
                    }
                ]
            }
        ],
        builds: {
            "DPS Gel": {
                name: "DPS Gel",
                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0,
                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 1,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,
                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["cryo_dmg_", "atk_"],
                    "EQUIP_DRESS": ["critDMG_", "critRate_"]
                },

                bestSets: ["FinaleOfTheDeepGalleries:4", "MarechausseeHunter:4"],
                goodSets: ["GladiatorsFinale:4", "BlizzardStrayer:4", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "BlizzardStrayer:2", "FinaleOfTheDeepGalleries:2"],
                er_req: 100,
                team: [
                    { role: "Support", name: "Furina", element: "hydro" },
                    { role: "Sub-DPS", name: "Escoffier", element: "cryo" },
                    {
                        role: "Flex",
                        element: ["hydro", "cryo"]
                    }
                ]
            }
        }
    },
    "Dahlia": {
        color: "#6d1833",
        portraitOffset: -37,

        talents: {
            auto: 1,
            skill: 1,
            burst: 10
        },

        builds: {
            "Support gel": {
                name: "Support gel",

                weights: {
                    "critRate_": 0.4, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 1, "hp": 0.8,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["enerRech_", "hp_"],
                    "EQUIP_RING": ["hp_"],
                    "EQUIP_DRESS": ["hp_", "critRate_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["NoblesseOblige:4", "ScrollOfTheHeroOfCinderCity:4"],
                goodSets: ["ArchaicPetra:4", "ScrollOfTheHeroOfCinderCity:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "TenacityOfTheMillelith:2", "VourukashasGlow:2"],

                er_req: 200,

                team: [
                    { role: "DPS", name: "SkirkNew", element: "cryo" },
                    { role: "Sub-DPS", name: "Escoffier", element: "cryo" },
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },
                ]
            }
        }
    },

    // 5.8
    "Ineffa": {
        color: "#4fbfff",
        portraitOffset: -37,

        talents: {
            auto: 1,
            skill: 10,
            burst: 8
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A4 : Protocole de permutation panoramique",
                        active: true,
                        stats: {
                            eleMas_bonus_scaling: {
                                source: "atk",
                                percent: 0.06
                            }
                        }
                    }
                ]
            },
        ],

        builds: {
            "Sub-DPS Sélénocution": {
                name: "Sub-DPS Sélénocution",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.4, "enerRech_": 0.6,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["atk_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                bestSets: ["AubadeOfMorningstarAndMoon:4", "SilkenMoonsSerenade:4"],
                goodSets: ["GildedDreams:4", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 160,

                team: [
                    { role: "DPS", name: "Flins", element: "electro" },
                    { role: "Sub-DPS", name: "Columbina", element: "hydro" },
                    { role: "Support", name: "Sucrose", element: "anemo" },
                ]
            }
        }
    },

    // 6.0
    "Lauma": {
        color: "#8FE1E9",
        portraitOffset: -35,
        talents: {
            auto: 1,
            skill: 8,
            burst: 8
        },
        builds: {
            "Sélénofleurissement": {
                name: "Sélénofleurissement",
                weights: {
                    "critRate_": 0.4, "critDMG_": 0.4,
                    "atk_": 0, "atk": 0,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 1, "enerRech_": 1,
                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,
                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas", "enerRech_"],
                    "EQUIP_RING": ["eleMas"],
                    "EQUIP_DRESS": ["eleMas"]
                },

                hideUIStats: [],
                showUIStats: ["atk"],

                bestSets: ["SilkenMoonsSerenade:4", "DeepwoodMemories:4", "AubadeOfMorningstarAndMoon:4"],
                goodSets: ["NightOfTheSkysUnveiling:4", "Instructor:4", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2"],

                er_req: 200,

                team: [
                    { role: "DPS", name: "Nefer", element: "dendro" },
                    { role: "Sub-DPS", name: "Columbina", element: "hydro" },
                    {
                        role: "Support",
                        name: "Nahida",
                        element: "dendro",
                    }
                ]
            },
            "Fleurissement": {
                name: "Fleurissement",
                weights: {
                    "critRate_": 0.4, "critDMG_": 0.4,
                    "atk_": 0, "atk": 0,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 1, "enerRech_": 1,
                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,
                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas", "enerRech_"],
                    "EQUIP_RING": ["eleMas"],
                    "EQUIP_DRESS": ["eleMas"]
                },

                hideUIStats: [],
                showUIStats: ["atk"],

                bestSets: ["SilkenMoonsSerenade:4", "DeepwoodMemories:4"],
                goodSets: ["NightOfTheSkysUnveiling:4", "Instructor:4", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2"],

                er_req: 220,

                team: [
                    { role: "Support", name: "Nilou", element: "hydro" },
                    { role: "Sub-DPS", name: "Columbina", element: "hydro" },
                    {
                        role: "Support",
                        name: "Nahida",
                        element: "dendro",
                    }
                ]
            },
            "Exubérance": {
                name: "Exubérance",
                weights: {
                    "critRate_": 0.4, "critDMG_": 0.4,
                    "atk_": 0, "atk": 0,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 1, "enerRech_": 1,
                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,
                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas", "enerRech_"],
                    "EQUIP_RING": ["eleMas"],
                    "EQUIP_DRESS": ["eleMas"]
                },

                hideUIStats: [],
                showUIStats: ["atk"],

                bestSets: ["SilkenMoonsSerenade:4", "DeepwoodMemories:4"],
                goodSets: ["NightOfTheSkysUnveiling:4", "Instructor:4", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2"],

                er_req: 220,

                team: [
                    { role: "DPS", name: "Neuvillette", element: "hydro" },
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },
                    {
                        role: "Sub-DPS",
                        name: "Ineffa",
                        element: "electro",
                    }
                ]
            }
        }
    },
    "Flins": {
        color: "#6163E8",
        portraitOffset: -35,

        talents: {
            auto: 1,
            skill: 8,
            burst: 10
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A4 : Murmure de flamme",
                        active: true,
                        maxCons: 3,
                        stats: {
                            eleMas_bonus_scaling: {
                                source: "atk",
                                percent: 0.08,
                                max: 160
                            }
                        }
                    }
                ]
            },
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C4 : Nuit sur la montagne nue",
                        cons: 4,
                        active: true,
                        stats: {
                            eleMas_bonus_scaling: {
                                source: "atk",
                                percent: 0.10,
                                max: 220
                            }
                        }
                    }
                ]
            }
        ],

        builds: {
            "DPS Sélénocution": {
                name: "DPS Sélénocution",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.4, "enerRech_": 0.6,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["atk_"],
                    "EQUIP_DRESS": ["critDMG_","critRate_"]
                },

                bestSets: ["NightOfTheSkysUnveiling:4"],
                goodSets: ["GildedDreams:4", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 130,

                team: [
                    { role: "Sub-DPS", name: "Ineffa", element: "electro" },
                    { role: "Support", name: "Columbina", element: "hydro" },
                    { role: "Support", name: "Sucrose", element: "anemo" },
                ]
            }
        }
    },
    "Aino": {
        color: "#cb8fc3",
        portraitOffset: -35,

        talents: {
            auto: 1,
            skill: 6,
            burst: 8
        },

        buffs: [
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C1 : Théorie de l'équilibre cendres–champs",
                        cons: 1,
                        stats: {
                            eleMas: 80
                        }
                    }
                ]
            }
        ],

        builds: {
            "Support sélène": {
                name: "Support sélène",

                weights: {
                    "critRate_": 0.4, "critDMG_": 0,
                    "atk_": 0, "atk": 0, // 0.8 + 0.1 mais 1 si peu de buff extérieur
                    "hp_": 0, "hp": 0, // 0.9 à 1 + 0.1 mais 0.8 pour Hu Tao par exemple
                    "def_": 0, "def": 0, // 0.8 à 0.9, 0.8 si crit important
                    "eleMas": 0.4, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 1, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["enerRech_", "eleMas"],
                    "EQUIP_RING": ["eleMas", "hydro_dmg_"],
                    "EQUIP_DRESS": ["eleMas", "critRate_"]
                },

                hideUIStats: [],
                showUIStats: ["atk"],

                bestSets: ["SilkenMoonsSerenade:4", "Instructor:4"],
                goodSets: ["NoblesseOblige:4", "ScrollOfTheHeroOfCinderCity:4", "DeepwoodMemories:4", "GildedDreams:4", "FlowerOfParadiseLost:4", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2"],

                er_req: 220,

                team: [
                    { role: "Flex", name: ["Nefer", "Flins"], element: ["dendro", "electro"] },
                    { role: "Flex", name: ["Lauma", "Ineffa"], element: ["dendro", "electro"] },
                    { role: "Support", name: "Sucrose", element: "anemo" },
                ]
            }
        }
    },

    // 6.1
    "Nefer": {
        color: "#257224",
        portraitOffset: -37,

        talents: {
            auto: 6,
            skill: 8,
            burst: 6
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A1 : Pari au clair de lune",
                        active: true,
                        stats: {
                            eleMas: 100
                        }
                    }
                ]
            },
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C2 : L'observation nourrit la stratégie",
                        cons: 2,
                        stats: {
                            eleMas: 200
                        }
                    }
                ]
            }
        ],

        builds: {
            "DPS Sélénofleurissement": {
                name: "DPS Sélénofleurissement",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0, "atk": 0,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 1, "enerRech_": 0.2,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas"],
                    "EQUIP_RING": ["eleMas"],
                    "EQUIP_DRESS": ["critDMG_","critRate_", "eleMas"]
                },

                hideUIStats: [],
                showUIStats: ["atk"],

                bestSets: ["NightOfTheSkysUnveiling:4"],
                goodSets: ["DeepwoodMemories:4", "GildedDreams:4", "Instructor:4", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 100,

                team: [
                    { role: "Support", name: "Columbina", element: "hydro" },
                    { role: "Sub-DPS", name: "Lauma", element: "dendro" },
                    {
                        role: "Flex",
                        name: ["Nahida", "Sucrose"],
                        element: ["dendro", "anemo"]

                    }
                ]
            }
        }
    },
    // Manekin ???

    // 6.2
    "Durin": {
        color: "#92417E",
        portraitOffset: -37,

        skins: {
            212301: {
                color: "#ff5f75",
                portraitOffset: -37
            }
        },

        talents: {
            auto: 1,
            skill: 8,
            burst: 8
        },

        buffs: [
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C2 : Visions sans fond",
                        cons: 2,
                        stats: {
                            pyro_dmg_: 0.50
                        }
                    }
                ]
            }
        ],

        builds: {
            "Sub-DPS Surcharge": {
                name: "Sub-DPS Surcharge",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.8,

                    "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "enerRech_"],
                    "EQUIP_RING": ["atk_", "pyro_dmg_"],
                    "EQUIP_DRESS": ["critDMG_","critRate_"]
                },

                bestSets: ["ADayCarvedFromRisingWinds:4"],
                goodSets: ["NoblesseOblige:4", "NoblesseOblige:2", "EmblemOfSeveredFate:4", "Instructor:4", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2"],

                er_req: 130,
                team: [
                    { role: "DPS", name: ["Arlecchino", "Varesa"], element: ["pyro", "electro"] },
                    { role: "Sub-DPS", name: "Fischl", element: "electro"},
                    { role: "Support", name: "Chevreuse", element: "pyro"}
                ]
            },
            "Sub-DPS Brûlure": {
                name: "Sub-DPS Brûlure",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.8,

                    "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "enerRech_"],
                    "EQUIP_RING": ["atk_", "pyro_dmg_"],
                    "EQUIP_DRESS": ["critDMG_","critRate_"]
                },

                bestSets: ["ADayCarvedFromRisingWinds:4"],
                goodSets: ["NoblesseOblige:4", "NoblesseOblige:2", "EmblemOfSeveredFate:4", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "Instructor:4"],

                er_req: 130,
                team: [
                    { role: "DPS", name: "Kinich", element: "dendro" },
                    { role: "Sub-DPS", name: "Emilie", element: "dendro"},
                    { role: "Support", name: "Bennett", element: "pyro"}
                ]
            },
            "Sub-DPS général": {
                name: "Sub-DPS général",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.8,

                    "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "enerRech_"],
                    "EQUIP_RING": ["atk_", "pyro_dmg_"],
                    "EQUIP_DRESS": ["critDMG_","critRate_"]
                },

                bestSets: ["ADayCarvedFromRisingWinds:4"],
                goodSets: ["NoblesseOblige:4", "NoblesseOblige:2", "EmblemOfSeveredFate:4", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "Instructor:4"],

                er_req: 150,
                team: [
                    { role: "DPS", name: "Chasca", element: "anemo" },
                    { role: "Sub-DPS", name: "Furina", element: "hydro"},
                    { role: "Sub-DPS", name: "Fischl", element: "electro"}
                ]
            }
        }
    },
    "Jahoda": {
        color: "#aaaab4",
        portraitOffset: -36,

        talents: {
            auto: 1,
            skill: 10,
            burst: 8
        },

        buffs: [
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C6 : La chance la plus petite",
                        cons: 6,
                        stats: {
                            critrate_: 0.05,
                            critDMG_: 0.40
                        }
                    }
                ]
            }
        ],

        builds: {
            "Healer sélène": {
                name: "Healer sélène",

                weights: {
                    "critRate_": 0.4, "critDMG_": 0,
                    "atk_": 1, "atk": 0.8,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 1
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["enerRech_", "atk_"],
                    "EQUIP_RING": ["atk_"],
                    "EQUIP_DRESS": ["heal_", "atk_", "critRate_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["ViridescentVenerer:4", "SilkenMoonsSerenade:4"],
                goodSets: ["TenacityOfTheMillelith:4", "Instructor:4", "DeepwoodMemories:4", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2"],

                er_req: 230,

                team: [
                    { role: "DPS", name: "Nefer", element: "dendro" },
                    { role: "Sub-DPS", name: "Columbina", element: "hydro" },
                    { role: "Sub-DPS", name: "Lauma", element: "dendro" },
                ]
            }
        }
    },

    // 6.3
    "Columbina": {
        color: "#1d65ff",
        portraitOffset: -37,

        talents: {
            auto: 6,
            skill: 8,
            burst: 8
        },

        buffs: [
            {
                category: "Passifs",
                selectMode: "exclusive",
                data: [
                    {
                        label: "A1 : Appel de la lune (1 stack)",
                        active: false,
                        stats: {
                            critRate_: 0.05,
                        }
                    },
                    {
                        label: "A1 : Appel de la lune (2 stacks)",
                        active: false,
                        stats: {
                            critRate_: 0.10,
                        }
                    },
                    {
                        label: "A1 : Appel de la lune (3 stacks)",
                        active: true,
                        stats: {
                            critRate_: 0.15,
                        }
                    }
                ]
            },
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C2 : Nuit en splendeur, jamais solitaire",
                        cons: 2,
                        stats: {
                            hp_: 0.40
                        }
                    },
                    {
                        label: "C6 : Nuit lugubre, lune à travers (uniquement sur un élément)",
                        cons: 6,
                        stats: {
                            critDMG_: "0.80"
                        }
                    }
                ]
            }
        ],

        builds: {
            "Support sélénofleurissement": {
                name: "Support sélénofleurissement",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0, "atk": 0,
                    "hp_": 0.9, "hp": 0.1,
                    "def_": 0, "def": 0,
                    "eleMas": 0.4, "enerRech_": 0.8,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["enerRech_", "hp_"],
                    "EQUIP_RING": ["hp_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                bestSets: ["SilkenMoonsSerenade:4", "AubadeOfMorningstarAndMoon:4"],
                goodSets: ["TenacityOfTheMillelith:4", "Instructor:4", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "TenacityOfTheMillelith:2", "VourukashasGlow:2"],

                er_req: 180,

                team: [
                    { role: "DPS", name: "Nefer", element: "dendro" },
                    { role: "Sub-DPS", name: "Lauma", element: "dendro" },
                    {
                        role: "Flex",
                        name: ["Nahida", "Nilou"],
                        element: ["dendro", "hydro"]
                    }
                ]
            },
            "Driver sélénofleurissement": {
                name: "Driver sélénofleurissement",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0, "atk": 0,
                    "hp_": 0.9, "hp": 0.1,
                    "def_": 0, "def": 0,
                    "eleMas": 0.4, "enerRech_": 0.8,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["enerRech_", "hp_"],
                    "EQUIP_RING": ["hp_"],
                    "EQUIP_DRESS": ["critDMG_","critRate_"]
                },

                bestSets: ["NightOfTheSkysUnveiling:4"],
                goodSets: ["AubadeOfMorningstarAndMoon:4", "SilkenMoonsSerenade:4", "Instructor:4", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "TenacityOfTheMillelith:2", "VourukashasGlow:2"],

                er_req: 180,

                team: [
                    { role: "Support", name: "Nilou", element: "hydro" },
                    { role: "Sub-DPS", name: "Lauma", element: "dendro" },
                    {
                        role: "Support",
                        name: "Nahida",
                        element: "dendro",
                    }
                ]
            },
            "Support sélénocution": {
                name: "Support sélénocution",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0, "atk": 0,
                    "hp_": 0.9, "hp": 0.1,
                    "def_": 0, "def": 0,
                    "eleMas": 0.4, "enerRech_": 0.8,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["enerRech_", "hp_"],
                    "EQUIP_RING": ["hp_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                bestSets: ["AubadeOfMorningstarAndMoon:4", "SilkenMoonsSerenade:4"],
                goodSets: ["TenacityOfTheMillelith:4", "Instructor:4", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "TenacityOfTheMillelith:2", "VourukashasGlow:2"],

                er_req: 180,

                team: [
                    { role: "DPS", name: "Flins", element: "electro" },
                    { role: "Sub-DPS", name: "Ineffa", element: "electro" },
                    {
                        role: "Support",
                        name: "Sucrose",
                        element: "anemo",
                    }
                ]
            },
            "Support sélénocristallisation": {
                name: "Support sélénocristallisation",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0, "atk": 0,
                    "hp_": 0.9, "hp": 0.1,
                    "def_": 0, "def": 0,
                    "eleMas": 0.4, "enerRech_": 0.8,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["enerRech_", "hp_"],
                    "EQUIP_RING": ["hp_"],
                    "EQUIP_DRESS": ["critRate_", "critDMG_"]
                },

                bestSets: ["AubadeOfMorningstarAndMoon:4", "SilkenMoonsSerenade:4"],
                goodSets: ["TenacityOfTheMillelith:4", "Instructor:4", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2", "TenacityOfTheMillelith:2", "VourukashasGlow:2"],

                er_req: 180,

                team: [
                    { role: "DPS", name: "Zibai", element: "geo" },
                    { role: "Support", name: "Illuga", element: "geo" },
                    {
                        role: "Support",
                        name: "Linnea",
                        element: "geo",
                    }
                ]
            }
        }
    },
    "Zibai": {
        color: "#54cabb",
        portraitOffset: -36.4,

        talents: {
            auto: 1,
            skill: 8,
            burst: 6
        },

        buffs: [
            {
                category: "A4 : Pics stratifiés perçant les nuages (Alliés Géo)",
                selectMode: "exclusive",
                buffs: [
                    {
                        label: "1 Allié Géo (+15% DEF)",
                        stats: { def_: 0.15 }
                    },
                    {
                        label: "2 Alliés Géo (+30% DEF)",
                        active: true,
                        stats: { def_: 0.30 }
                    },
                    {
                        label: "3 Alliés Géo (+45% DEF)",
                        stats: { def_: 0.45 }
                    }
                ]
            },

            {
                category: "A4 : Pics stratifiés perçant les nuages (Alliés Hydro)",
                selectMode: "exclusive",
                buffs: [
                    {
                        label: "1 Allié Hydro (+60 EM)",
                        active: true,
                        stats: { eleMas: 60 }
                    },
                    {
                        label: "2 Alliés Hydro (+120 EM)",
                        stats: { eleMas: 120 }
                    },
                    {
                        label: "3 Alliés Hydro (+180 EM)",
                        stats: { eleMas: 180 }
                    }
                ]
            },
        ],

        builds: {
            "DPS Sélénocristallisation": {
                name: "DPS Sélénocristallisation",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0, "atk": 0,
                    "hp_": 0, "hp": 0,
                    "def_": 0.8, "def": 0.1,
                    "eleMas": 0.4, "enerRech_": 0.3,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["def_"],
                    "EQUIP_RING": ["def_"],
                    "EQUIP_DRESS": ["critDMG_","critRate_"]
                },

                bestSets: ["NightOfTheSkysUnveiling:4"],
                goodSets: ["HuskOfOpulentDreams:4", "HuskOfOpulentDreams:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 120,

                team: [
                    { role: "Support", name: "Illuga", element: "geo" },

                    { role: "Sub-DPS", name: "Columbina", element: "hydro" },

                    {
                        role: "Sub-DPS",
                        name: "Linnea",
                        element: "geo"
                    }
                ]
            }
        }
    },
    "Illuga": {
        color: "#826351",
        portraitOffset: -35,

        talents: {
            auto: 1,
            skill: 1,
            burst: 10
        },

        builds: {
            "Buffer sélénocristallisation": {
                name: "Buffer sélénocristallisation",

                weights: {
                    "critRate_": 0.4, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 0, "hp": 0,
                    "def_": 0.4, "def": 0.1,
                    "eleMas": 1, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["eleMas", "enerRech_"],
                    "EQUIP_RING": ["eleMas"],
                    "EQUIP_DRESS": ["eleMas", "critRate_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["SilkenMoonsSerenade:4", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2"],
                goodSets: ["Instructor:4", "ScrollOfTheHeroOfCinderCity:4", "NoblesseOblige:4", "TheExile:4", "TenacityOfTheMillelith:4"],

                er_req: 150,

                team: [
                    { role: "DPS", name: "Zibai", element: "geo" },
                    { role: "Sub-DPS", name: "Columbina", element: "hydro" },
                    { role: "Sub-DPS", name: "Linnea", element: "geo" },
                ]
            }
        }
    },

    //6.4
    "Varka": {
        color: "#1D849A",
        portraitOffset: -38,

        talents: {
            auto: 6,
            skill: 10,
            burst: 8
        },
        buffs: [
            {
                category: "Passifs",
                selectMode: "exclusive",
                buffs: [
                    {
                        label: "A1 : Équipe avec Pyro",
                        active: true,
                        stats: {
                            elemental_dmg_bonus_scaling: { source: "atk", percent: 0.01, max: 25 },
                            pyro_dmg_bonus_scaling: { source: "atk", percent: 0.01, max: 25 }
                        }
                    },
                    {
                        label: "A1 : Équipe avec Hydro",
                        stats: {
                            elemental_dmg_bonus_scaling: { source: "atk", percent: 0.01, max: 25 },
                            hydro_dmg_bonus_scaling: { source: "atk", percent: 0.01, max: 25 }                        }
                    },
                    {
                        label: "A1 : Équipe avec Electro",
                        stats: {
                            elemental_dmg_bonus_scaling: { source: "atk", percent: 0.01, max: 25 },
                            electro_dmg_bonus_scaling: { source: "atk", percent: 0.01, max: 25 }                        }
                    },
                    {
                        label: "A1 : Équipe avec Cryo",
                        stats: {
                            elemental_dmg_bonus_scaling: { source: "atk", percent: 0.01, max: 25 },
                            cryo_dmg_bonus_scaling: { source: "atk", percent: 0.01, max: 25 }                        }
                    }
                ]
            },
            {
                category: "Constellation 4",
                selectMode: "exclusive",
                buffs: [
                    {
                        label: "C4 : Dispersion Pyro (+20% Anémo/Pyro)",
                        cons: 4,
                        stats: { anemo_dmg_: 0.20, pyro_dmg_: 0.20 }
                    },
                    {
                        label: "C4 : Dispersion Hydro (+20% Anémo/Hydro)",
                        cons: 4,
                        stats: { anemo_dmg_: 0.20, hydro_dmg_: 0.20 }
                    },
                    {
                        label: "C4 : Dispersion Électro (+20% Anémo/Électro)",
                        cons: 4,
                        stats: { anemo_dmg_: 0.20, electro_dmg_: 0.20 }
                    },
                    {
                        label: "C4 : Dispersion Cryo (+20% Anémo/Cryo)",
                        cons: 4,
                        stats: { anemo_dmg_: 0.20, cryo_dmg_: 0.20 }
                    },
                ]
            },
            {
                category: "Constellation 6",
                buffs: [
                    {
                        label: "C6",
                        cons: 6,
                        stats: {
                            critDMG_: 0.80
                        }
                    }
                ]
            }
        ],

        builds: {
            "Anémo/Pyro": {
                name: "Anémo/Pyro",
                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0,

                    "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["pyro_dmg_", "atk_"],
                    "EQUIP_DRESS": ["critDMG_", "critRate_"]
                },

                hideUIStats: ["heal_"],
                showUIStats: ["pyro_dmg_"],

                bestSets: ["ADayCarvedFromRisingWinds:4"],
                goodSets: ["DesertPavilionChronicle:4", "GladiatorsFinale:4","ViridescentVenerer:2", "DesertPavilionChronicle:2", "EchoesOfAnOffering:4", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "CrimsonWitchOfFlames:2"],

                er_req: 100,

                team: [
                    { role: "Flex", name: ["Venti", "Prune"], element: "anemo" },

                    { role: "Sub-DPS", name: "Durin", element: "pyro" },

                    {
                        role: "Support",
                        name: "Nicole",
                        element: "pyro"
                    }
                ]
            },
            "Anémo/Cryo": {
                name: "Anémo/Cryo",
                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 1,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },
                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["cryo_dmg_", "atk_"],
                    "EQUIP_DRESS": ["critDMG_", "critRate_"]
                },


                hideUIStats: ["heal_"],
                showUIStats: ["cryo_dmg_"],

                bestSets: ["ADayCarvedFromRisingWinds:4"],
                goodSets: ["DesertPavilionChronicle:4", "GladiatorsFinale:4","ViridescentVenerer:2", "DesertPavilionChronicle:2", "EchoesOfAnOffering:4", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "BlizzardStrayer:2", "FinaleOfTheDeepGalleries:2"],

                er_req: 100,

                team: [
                    { role: "Flex", name: ["Venti", "Prune"], element: "anemo" },

                    { role: "Sub-DPS", name: "Escoffier", element: "cryo" },

                    {
                        role: "Support",
                        name: "Shenhe",
                        element: "cryo"
                    }
                ]
            },
            "Anémo/Electro": {
                name: "Anémo/Electro",
                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 1,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["electro_dmg_", "atk_"],
                    "EQUIP_DRESS": ["critDMG_", "critRate_"]
                },

                hideUIStats: ["heal_"],
                showUIStats: ["electro_dmg_"],

                bestSets: ["ADayCarvedFromRisingWinds:4"],
                goodSets: ["DesertPavilionChronicle:4","ViridescentVenerer:2", "DesertPavilionChronicle:2", "GladiatorsFinale:4", "EchoesOfAnOffering:4", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "ThunderingFury:2"],

                er_req: 100,

                team: [
                    { role: "Flex", name: ["Venti", "Prune"], element: "anemo" },

                    { role: "Sub-DPS", name: "Fischl", element: "electro" },

                    {
                        role: "Support",
                        name: "Iansan",
                        element: "electro"
                    }
                ]
            },
            "Anémo/Hydro": {
                name: "Anémo/Hydro",
                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0,

                    "pyro_dmg_": 0, "hydro_dmg_": 1, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_"],
                    "EQUIP_RING": ["hydro_dmg_", "atk_"],
                    "EQUIP_DRESS": ["critDMG_", "critRate_"]
                },

                hideUIStats: ["heal_"],
                showUIStats: ["hydro_dmg_"],

                bestSets: ["ADayCarvedFromRisingWinds:4"],
                goodSets: ["DesertPavilionChronicle:4", "GladiatorsFinale:4", "EchoesOfAnOffering:4","ViridescentVenerer:2", "DesertPavilionChronicle:2", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "HeartOfDepth:2", "NymphsDream:2"],

                er_req: 100,

                team: [
                    { role: "Flex", name: ["Venti", "Prune"], element: "anemo" },

                    { role: "Sub-DPS", name: "Yelan", element: "hydro" },

                    {
                        role: "Support",
                        name: "Mona",
                        element: "hydro"
                    }
                ]
            }
        }
    },

    //6.5
    "Linnea": {
        color: "#F56D84",
        portraitOffset: -38,

        talents: {
            auto: 1,
            skill: 10,
            burst: 6
        },

        buffs: [
            {
                category: "A2 : Archive naturaliste universelle",
                selectMode: "exclusive",
                buffs: [
                    {
                        label: "Personnage non-lunaire sur le terrain",
                        active: true,
                        stats: {
                            eleMas_bonus_scaling: {
                                source: "def",
                                percent: 0.05
                            }
                        }
                    }
                ]
            },
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C2 : Présage de joie et de tristesse",
                        cons: 2,
                        stats: {
                            critDMG_: 0.40
                        }
                    },
                    {
                        label: "C4 : Instinct d'experte",
                        cons: 4,
                        stats: {
                            def_: 0.25
                        }
                    }
                ]
            }
        ],

        builds: {
            "Sub-DPS sélénocristallisation": {
                name: "Sub-DPS sélénocristallisation",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0, "atk": 0,
                    "hp_": 0, "hp": 0,
                    "def_": 0.8, "def": 0.1,
                    "eleMas": 0.4, "enerRech_": 0.1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["def_"],
                    "EQUIP_RING": ["def_"],
                    "EQUIP_DRESS": ["critDMG_","critRate_"]
                },

                bestSets: ["AubadeOfMorningstarAndMoon:4", "HuskOfOpulentDreams:4"],
                goodSets: ["ArchaicPetra:2", "HuskOfOpulentDreams:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2"],

                er_req: 100,

                team: [
                    { role: "DPS", name: "Zibai", element: "geo" },
                    { role: "Support", name: "Illuga", element: "geo" },
                    {
                        role: "Sub-DPS",
                        name: "Columbina",
                        element: "hydro"
                    }
                ]
            }
        }
    },

    // 6.6
    "Nicole": {
        color: "#5763bf",
        portraitOffset: -36,

        talents: {
            auto: 1,
            skill: 10,
            burst: 9
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A1 : Méthexis",
                        active: true,
                        stats: {
                            atk: 300,
                        }
                    },
                    {
                        label: "A1 : Méthexis (C2)",
                        active: true,
                        cons: 2,
                        stats: {
                            atk: 600,
                        }
                    },
                ]
            }
        ],

        builds: {
            "Support Hexerei": {
                name: "Support Hexerei",

                weights: {
                    "critRate_": 0, "critDMG_": 0,
                    "atk_": 1, "atk": 0.8,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "enerRech_"],
                    "EQUIP_RING": ["atk_"],
                    "EQUIP_DRESS": ["atk_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["CelestialGift:4", "NoblesseOblige:4"],
                goodSets: ["GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2"],

                er_req: 200,

                team: [
                    { role: "Sub-DPS", name: "Durin", element: "pyro" },
                    { role: "", name: "", element: "" },
                    { role: "", name: "", element: "" }
                ]
            }
        }
    },
    "Lohen": {
        color: "#273d80",
        portraitOffset: -38,

        talents: {
            auto: 1,
            skill: 10,
            burst: 8
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A4 : Chef-d'œuvre désinvolte",
                        active: true,
                        stats: {
                            atk_: 0.15,
                        }
                    }
                ]
            },
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C6 : Se noyer, sombrer, inconscient — Joie suprême (uniquement la compétence et le déchaînement)",
                        cons: 6,
                        active: false,
                        stats: {
                            critDMG_: 1.75
                        }
                    }
                ]
            }
        ],

        builds: {
            "DPS Fonte": {
                name: "DPS Fonte",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.6, "enerRech_": 0,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 1,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "eleMas"],
                    "EQUIP_RING": ["cryo_dmg_"],
                    "EQUIP_DRESS": ["critDMG_", "critRate_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["ADayCarvedFromRisingWinds:4"],
                goodSets: ["GladiatorsFinale:4", "GildedDreams:4", "GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "WanderersTroupe:2", "GildedDreams:2", "FlowerOfParadiseLost:2", "NightOfTheSkysUnveiling:2", "AubadeOfMorningstarAndMoon:2", "BlizzardStrayer:2", "FinaleOfTheDeepGalleries:2"],

                er_req: 100,

                team: [
                    { role: "Support", name: "Citlali", element: "cryo" },
                    { role: "Sub-DPS", name: "Durin", element: "pyro" },
                    { role: "Support", name: "Nicole", element: "pyro" }
                ]
            }
        }
    },
    "Prune": {
        color: "#4a52b6",
        portraitOffset: -36,

        talents: {
            auto: 1,
            skill: 8,
            burst: 10
        },

        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "Hexerei : Vœu de recherche de sorcières",
                        active: true,
                        stats: {
                            atk_: 0.60,
                        }
                    }
                ]
            },
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C2 : Bons pour nettoyer les bagages négligés sont les pouvoirs élémentaires",
                        cons: 2,
                        stats: {
                            atk_: 0.40
                        }
                    },
                    {
                        label: "C6 : Et voilà l'histoire ! À partager avec vos amis !",
                        cons: 6,
                        stats: {
                            atk: 350
                        }
                    }
                ]
            }
        ],

        builds: {
            "Support Hexerei": {
                name: "Support Hexerei",

                weights: {
                    "critRate_": 0.4, "critDMG_": 0,
                    "atk_": 1, "atk": 0.8,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                idealMainStats: {
                    "EQUIP_SHOES": ["atk_", "enerRech_"],
                    "EQUIP_RING": ["atk_"],
                    "EQUIP_DRESS": ["atk_", "critRate_"]
                },

                hideUIStats: [],
                showUIStats: [],

                bestSets: ["ViridescentVenerer:4", "NoblesseOblige:4", "CelestialGift:4"],
                goodSets: ["GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2","DisenchantmentInDeepShadow:2", "EmblemOfSeveredFate:2", "SilkenMoonsSerenade:2", "CelestialGift:2"],

                er_req: 200,

                team: [
                    { role: "DPS", name: "Varka", element: "anemo" },
                    { role: "Sub-DPS", name: "Durin", element: "pyro" },
                    { role: "Support", name: "Nicole", element: "pyro" },
                ]
            }
        }
    },
};

const WEAPON_PASSIVES = {
    // 3 étoiles
    "HarbingerOfDawn": {
        buffs: [
            {
                label: "Si les PV sont supérieurs à 90% (Taux CRIT)",
                active: false,
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
            { label: "Si des dégâts sont infligés une 1ère fois (Taux CRIT)",active: false, stats: { "critRate_": [0.08, 0.02] } },
            { label: "Si des dégâts sont infligés une 2ème fois (Taux CRIT)",active: false, stats: { "critRate_": [0.08, 0.02] } },
            { label: "Si des dégâts sont infligés une 3ème fois (Taux CRIT)",active: false, stats: { "critRate_": [0.08, 0.02] } },
            { label: "Si des dégâts sont infligés une 4ème fois (Taux CRIT)",active: false, stats: { "critRate_": [0.08, 0.02] } },
            { label: "Si des dégâts sont infligés une 5ème fois (Taux CRIT)",active: false, stats: { "critRate_": [0.08, 0.02] } }
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
                active: false,
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
                    "eleMas": [60, 15],
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
                        percent: [0.036, 0.009]
                    }
                }
            }
        ]
    },
    "WolfFang": {
        selectMode: "exclusive",
        buffs: [
            { label: "1 stack de Taux CRIT (ne s'applique qu'aux compétences et déchaînements)",active: false, stats: { "critRate_": [0.02, 0.005] } },
            { label: "2 stacks de Taux CRIT (ne s'applique qu'aux compétences et déchaînements)",active: false, stats: { "critRate_": [0.04, 0.010] } },
            { label: "3 stacks de Taux CRIT (ne s'applique qu'aux compétences et déchaînements)",active: false, stats: { "critRate_": [0.06, 0.015] } },
            { label: "4 stacks de Taux CRIT (ne s'applique qu'aux compétences et déchaînements)",active: false, stats: { "critRate_": [0.08, 0.020] } },
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
                active: false,
                stats: {
                    "critRate_": [0.08, 0.02]
                }
            },
            {
                label: "Si une compétence élémentaire est utilisée (Recharge d'énergie)",
                stats: {
                    "enerRech_": [0.16, 0.04]
                }
            }
        ]
    },
    "TheDockhandsAssistant": {
        selectMode: "cumulative",
        buffs: [
            { label: "Si des soins sont reçus ou envoyés une 1ère fois (Maîtrise élémentaire)", stats: { "eleMas": [40, 10] } },
            { label: "Si des soins sont reçus ou envoyés une 2ème fois (Maîtrise élémentaire)", stats: { "eleMas": [40, 10] } },
            { label: "Si des soins sont reçus ou envoyés une 3ème fois (Maîtrise élémentaire)", stats: { "eleMas": [40, 10] } },
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
                active: false,
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
            { label: "Si des dégâts sont infligés une 1ère fois (Taux CRIT)",active: false, stats: { "critRate_": [0.08, 0.02] } },
            { label: "Si des dégâts sont infligés une 2ème fois (Taux CRIT)",active: false, stats: { "critRate_": [0.08, 0.02] } },
            { label: "Si des dégâts sont infligés une 3ème fois (Taux CRIT)",active: false, stats: { "critRate_": [0.08, 0.02] } },
            { label: "Si des dégâts sont infligés une 4ème fois (Taux CRIT)",active: false, stats: { "critRate_": [0.08, 0.02] } },
            { label: "Si des dégâts sont infligés une 5ème fois (Taux CRIT)",active: false, stats: { "critRate_": [0.08, 0.02] } }
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
            {label: "Si 1 personnage de Liyue est dans l'équipe (ATQ% et Taux CRIT)", active: false,stats: {"atk_": [0.07, 0.01], "critRate_": [0.03, 0.01]}},
            {label: "Si 2 personnages de Liyue sont dans l'équipe (ATQ% et Taux CRIT)",active: false, stats: {"atk_": [0.14, 0.02], "critRate_": [0.06, 0.02]}},
            {label: "Si 3 personnages de Liyue sont dans l'équipe (ATQ% et Taux CRIT)",active: false, stats: {"atk_": [0.21, 0.03], "critRate_": [0.09, 0.03]}},
            {label: "Si 4 personnages de Liyue sont dans l'équipe (ATQ% et Taux CRIT)",active: false, stats: {"atk_": [0.28, 0.04], "critRate_": [0.12, 0.04]}}
        ]
    },
    "MakhairaAquamarine": {
        buffs: [
            {
                label: "Bonus selon la Maîtrise élémentaire (ATQ%)",
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
                    "eleMas": [60, 15],
                }
            }
        ]
    },
    "MailedFlower": {
        buffs: [
            {
                label: "Si une compétence élémentaire touche un ennemi ou qu'une réaction élémentaire est déclenchée (ATQ% et Maîtrise élémentaire)",
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
                label: "Si le porteur reçoit des soins (ATQ%)",
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
                active: false,
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
                    "eleMas": [60, 15],
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
                    "eleMas": [60, 15]
                }
            },
            {
                label: "Si une réaction élémentaire est déclenchée et que l'équipe est sous le signe Lueur Ascendante (Maîtrise élémentaire)",
                stats: {
                    "eleMas": [120, 30]
                }
            }
        ]
    },

    // 4 étoiles - arcs
    "RoyalBow": {
        selectMode: "cumulative",
        buffs: [
            { label: "Si des dégâts sont infligés une 1ère fois (Taux CRIT)",active: false, stats: { "critRate_": [0.08, 0.02] } },
            { label: "Si des dégâts sont infligés une 2ème fois (Taux CRIT)",active: false, stats: { "critRate_": [0.08, 0.02] } },
            { label: "Si des dégâts sont infligés une 3ème fois (Taux CRIT)",active: false, stats: { "critRate_": [0.08, 0.02] } },
            { label: "Si des dégâts sont infligés une 4ème fois (Taux CRIT)",active: false, stats: { "critRate_": [0.08, 0.02] } },
            { label: "Si des dégâts sont infligés une 5ème fois (Taux CRIT)",active: false, stats: { "critRate_": [0.08, 0.02] } }
        ]
    },
    "PrototypeCrescent": {
        buffs: [
            {
                label: "Si un point faible est touché en mode visée (ATQ%)",
                stats: {
                    "atk_": [0.36, 0.09],
                }
            }
        ]
    },
    "CompoundBow": {
        selectMode: "cumulative",
        buffs: [
            { label: "1 cumul (ATQ%)", stats: { "atk_": [0.04, 0.01] } },
            { label: "2 cumuls (ATQ%)", stats: { "atk_": [0.04, 0.01] } },
            { label: "3 cumuls (ATQ%)", stats: { "atk_": [0.04, 0.01] } },
            { label: "4 cumuls (ATQ%)", stats: { "atk_": [0.04, 0.01] } },
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
                label: "Si une compétence élémentaire est utilisée (ATQ%)",
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
                    "eleMas": [60, 20],
                }
            }
        ]
    },
    "IbisPiercer": {
        selectMode: "cumulative",
        buffs: [
            { label: "Si une 1ère attaque chargée touche un ennemi (Maîtrise élémentaire)", stats: { "eleMas": [40, 10] } },
            { label: "Si une 2ème attaque chargée touche un ennemi (Maîtrise élémentaire)", stats: { "eleMas": [40, 10] } },
        ]
    },
    "Cloudforged": {
        selectMode: "cumulative",
        buffs: [
            { label: "Si l'énergie du porteur diminue une 1ère fois (Maîtrise élémentaire)", stats: { "eleMas": [40, 10] } },
            { label: "Si l'énergie du porteur diminue une 2ème fois (Maîtrise élémentaire)", stats: { "eleMas": [40, 10] } },
        ]
    },
    "RangeGauge": {
        selectMode: "exclusive",
        buffs: [
            {
                label: "Si le personnage soigne ou reçoit de soins une 1ère fois (ATQ% et DGTs Élémentaires)",
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
                label: "Si le personnage soigne ou reçoit de soins une 2ème fois (ATQ% et DGTs Élémentaires)",
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
                label: "Si le personnage soigne ou reçoit de soins une 3ème fois (ATQ% et DGTs Élémentaires)",
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
                label: "Si l'équipe est composée d'1 personnage de Natlan ou d'un élément différent du porteur (ATQ%)",
                stats: {
                    "atk_": [0.048, 0.012]
                }
            },
            {
                label: "Si l'équipe est composée de 2 personnages de Natlan ou d'un élément différent du porteur (ATQ%)",
                stats: {
                    "atk_": [0.096, 0.024]
                }
            },
            {
                label: "Si l'équipe est composée de 3 personnages de Natlan ou d'un élément différent du porteur (ATQ% et Maîtrise élémentaire)",
                stats: {
                    "atk_": [0.144, 0.036],
                    "eleMas": [24, 6]
                }
            },
            {
                label: "Si l'équipe est composée de 4 personnages de Natlan ou d'un élément différent du porteur (ATQ% et Maîtrise élémentaire)",
                stats: {
                    "atk_": [0.192, 0.048],
                    "eleMas": [24, 6]
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
                    "eleMas": [60, 15]
                }
            },
            {
                label: "Si une réaction élémentaire est déclenchée et que l'équipe est sous le signe Lueur Ascendante (Maîtrise élémentaire)",
                stats: {
                    "eleMas": [120, 30]
                }
            }
        ]
    },
    "RainbowSerpentsRainBow": {
        buffs: [
            {
                label: "Si une attaque touche un ennemi et que le porteur est hors du terrain (ATQ%)",
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
                label: "S'il y a deux ennemis ou plus aux alentours (ATQ% et DÉF%)",
                stats: {
                    "atk_": [0.16, 0.04], "def_": [0.16, 0.04]
                }
            },
            {
                label: "S'il y a plus de deux ennemis aux alentours (ATQ%)",
                stats: {
                    "atk_": [0.24, 0.04]
                }
            }
        ]
    },
    "LithicSpear": {
        selectMode: "exclusive",
        buffs: [
            {label: "Si 1 personnage de Liyue est dans l'équipe (ATQ% et Taux CRIT)",active: false, stats: {"atk_": [0.07, 0.01], "critRate_": [0.03, 0.01]}},
            {label: "Si 2 personnages de Liyue sont dans l'équipe (ATQ% et Taux CRIT)",active: false, stats: {"atk_": [0.14, 0.02], "critRate_": [0.06, 0.02]}},
            {label: "Si 3 personnages de Liyue sont dans l'équipe (ATQ% et Taux CRIT)",active: false, stats: {"atk_": [0.21, 0.03], "critRate_": [0.09, 0.03]}},
            {label: "Si 4 personnages de Liyue sont dans l'équipe (ATQ% et Taux CRIT)",active: false, stats: {"atk_": [0.28, 0.04], "critRate_": [0.12, 0.04]}}
        ]
    },
    "RoyalSpear": {
        selectMode: "cumulative",
        buffs: [
            { label: "Si des dégâts sont infligés une 1ère fois (Taux CRIT)",active: false, stats: { "critRate_": [0.08, 0.02] } },
            { label: "Si des dégâts sont infligés une 2ème fois (Taux CRIT)",active: false, stats: { "critRate_": [0.08, 0.02] } },
            { label: "Si des dégâts sont infligés une 3ème fois (Taux CRIT)",active: false, stats: { "critRate_": [0.08, 0.02] } },
            { label: "Si des dégâts sont infligés une 4ème fois (Taux CRIT)",active: false, stats: { "critRate_": [0.08, 0.02] } },
            { label: "Si des dégâts sont infligés une 5ème fois (Taux CRIT)",active: false, stats: { "critRate_": [0.08, 0.02] } }
        ]
    },
    "TheCatch": {
        buffs: [
            {
                label: "Bonus de Taux CRIT (Uniquement pour le déchaînement élémentaire)",
                active: false,
                stats: {
                    "critRate_": [0.06, 0.015],
                }
            }
        ]
    },
    "Moonpiercer": {
        buffs: [
            {
                label: "Si une réaction en lien avec l'élément Dendro est déclenchée (ATQ%)",
                stats: {
                    "atk_": [0.16, 0.04],
                }
            }
        ]
    },
    "MissiveWindspear": {
        buffs: [
            {
                label: "Si une réaction élémentaire est déclenchée (ATQ% et Maîtrise élémentaire)",
                stats: {
                    "atk_": [0.12, 0.03], "eleMas": [48, 12]
                }
            }
        ]
    },
    "BalladOfTheFjords": {
        buffs: [
            {
                label: "Si l'équipe est composée de 3 éléments différents (Maîtrise élémentaire)",
                stats: {
                    "eleMas": [120, 30]
                }
            }
        ]
    },
    "ProspectorsDrill": {
        selectMode: "exclusive",
        buffs: [
            {
                label: "Si le personnage soigne ou reçoit de soins une 1ère fois (ATQ% et DGTs Élémentaires)",
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
                label: "Si le personnage soigne ou reçoit de soins une 2ème fois (ATQ% et DGTs Élémentaires)",
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
                label: "Si le personnage soigne ou reçoit de soins une 3ème fois (ATQ% et DGTs Élémentaires)",
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
                label: "Si une compétence élémentaire est utilisée (ATQ%)",
                stats: {
                    "atk_": [0.20, 0.05]
                }
            }
        ]
    },
    "SacrificersStaff": {
        selectMode: "cumulative",
        buffs: [
            { label: "Si une compétence élémentaire touche un ennemi une 1ère fois (ATQ% et Recharge d'énergie)", stats: { "atk_": [0.08, 0.02], "enerRech_": [0.06, 0.015] } },
            { label: "Si une compétence élémentaire touche un ennemi une 2ème fois (ATQ% et Recharge d'énergie)", stats: { "atk_": [0.08, 0.02], "enerRech_": [0.06, 0.015] } },
            { label: "Si une compétence élémentaire touche un ennemi une 3ème fois (ATQ% et Recharge d'énergie)", stats: { "atk_": [0.08, 0.02], "enerRech_": [0.06, 0.015] } },
        ]
    },

    // 4 étoiles - catalyseur
    "TheWidsith": {
        selectMode: "exclusive",
        buffs: [
            {label: "Récital (ATQ%)", stats: {"atk_": [0.60, 0.15]}},
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
            {label: "Interlude (Maîtrise élémentaire)", stats: {"eleMas": [240, 60]}},
        ]
    },
    "RoyalGrimoire": {
        selectMode: "cumulative",
        buffs: [
            { label: "Si des dégâts sont infligés une 1ère fois (Taux CRIT)",active: false, stats: { "critRate_": [0.08, 0.02] } },
            { label: "Si des dégâts sont infligés une 2ème fois (Taux CRIT)",active: false, stats: { "critRate_": [0.08, 0.02] } },
            { label: "Si des dégâts sont infligés une 3ème fois (Taux CRIT)",active: false, stats: { "critRate_": [0.08, 0.02] } },
            { label: "Si des dégâts sont infligés une 4ème fois (Taux CRIT)",active: false, stats: { "critRate_": [0.08, 0.02] } },
            { label: "Si des dégâts sont infligés une 5ème fois (Taux CRIT)",active: false, stats: { "critRate_": [0.08, 0.02] } }
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
                label: "Si le personnage sprint après avoir utilisé une compétence élémentaire (ATQ%)",
                stats: {
                    "atk_": [0.20, 0.05]
                }
            }
        ]
    },
    "DodocoTales": {
        buffs: [
            {
                label: "Si une attaque chargée touche un ennemi (ATQ%)",
                stats: {
                    "atk_": [0.08, 0.02]
                }
            }
        ]
    },
    "HakushinRing": {
        buffs: [
            {
                label: "Si une réaction élémentaire en lien avec Électro est déclenchée (DGTs Élémentaires)",
                stats: {
                    "pyro_dmg_": [0.10, 0.025],
                    "hydro_dmg_": [0.10, 0.025],
                    "cryo_dmg_": [0.10, 0.025],
                    "electro_dmg_": [0.10, 0.025],
                    "anemo_dmg_": [0.10, 0.025],
                    "geo_dmg_": [0.10, 0.025],
                    "dendro_dmg_": [0.10, 0.025]
                }
            }
        ]
    },
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
                label: "Bonus selon la Maîtrise élémentaire (ATQ%)",
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
                    "eleMas": [24, 3],
                }
            }
        ]
    },
    "SacrificialJade": {
        buffs: [
            {
                label: "Si le porteur est hors du terrain pendant 5s (PV% et Maîtrise élémentaire)",
                stats: {
                    "hp_": [0.32, 0.08], "eleMas": [40, 10]
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
                    "eleMas": [100, 25]
                }
            }
        ]
    },
    "DawningFrost": {
        buffs: [
            {
                label: "Si une attaque chargée touche un ennemi (Maîtrise élémentaire)",
                stats: {
                    "eleMas": [72, 18]
                }
            },
            {
                label: "Si une compétence élémentaire touche un ennemi (Maîtrise élémentaire)",
                stats: {
                    "eleMas": [48, 12]
                }
            }
        ]
    },

    // 5 étoiles - épées à une main
    "FreedomSworn": {
        buffs: [
            {
                label: "Si 2 réactions élémentaires sont déclenchées (ATQ%)",
                stats: {
                    "atk_": [0.20, 0.05]
                }
            }
        ]
    },
    "SummitShaper": {
        selectMode: "cumulative",
        buffs: [
            {
                label: "Si une 1ère attaque touche un ennemi (ATQ%)",
                stats: {
                    "atk_": [0.04, 0.01]
                }
            },
            {
                label: "Si une 2ème attaque touche un ennemi (ATQ%)",
                stats: {
                    "atk_": [0.04, 0.01]
                }
            },
            {
                label: "Si une 3ème attaque touche un ennemi (ATQ%)",
                stats: {
                    "atk_": [0.04, 0.01]
                }
            },
            {
                label: "Si une 4ème attaque touche un ennemi (ATQ%)",
                stats: {
                    "atk_": [0.04, 0.01]
                }
            },
            {
                label: "Si une 5ème attaque touche un ennemi (ATQ%)",
                stats: {
                    "atk_": [0.04, 0.01]
                }
            }
        ]
    },
    "MistsplitterReforged": {
        selectMode: "exclusive",
        buffs: [
            {
                label: "1 Emblème (DGTs Élémentaires)",
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
                label: "2 Emblèmes (DGTs Élémentaires)",
                stats: {
                    "pyro_dmg_": [0.16, 0.04],
                    "hydro_dmg_": [0.16, 0.04],
                    "cryo_dmg_": [0.16, 0.04],
                    "electro_dmg_": [0.16, 0.04],
                    "anemo_dmg_": [0.16, 0.04],
                    "geo_dmg_": [0.16, 0.04],
                    "dendro_dmg_": [0.16, 0.04]
                }
            },
            {
                label: "3 Emblèmes (DGTs Élémentaires)",
                stats: {
                    "pyro_dmg_": [0.28, 0.07],
                    "hydro_dmg_": [0.28, 0.07],
                    "cryo_dmg_": [0.28, 0.07],
                    "electro_dmg_": [0.28, 0.07],
                    "anemo_dmg_": [0.28, 0.07],
                    "geo_dmg_": [0.28, 0.07],
                    "dendro_dmg_": [0.28, 0.07]
                }
            }
        ]
    },
    "KeyOfKhajNisut": {
        selectMode: "exclusive",
        buffs: [
            {
                label: "1 Stack (PV% en Maîtrise élémentaire)",
                stats: {
                    "eleMas_bonus_scaling": {
                        source: "hp",
                        percent: [0.0012, 0.0003]
                    }
                }
            },
            {
                label: "2 Stacks (PV% en Maîtrise élémentaire)",
                stats: {
                    "eleMas_bonus_scaling": {
                        source: "hp",
                        percent: [0.0024, 0.0006]
                    }
                }
            },
            {
                label: "3 Stacks (PV% en Maîtrise élémentaire)",
                stats: {
                    "eleMas_bonus_scaling": {
                        source: "hp",
                        percent: [0.0056, 0.0014]
                    }
                }
            }
        ]
    },
    "SplendorOfTranquilWaters": {
        selectMode: "exclusive",
        buffs: [
            {
                label: "Si des alliés subissent une modification de PV une 1ère fois (PV%)",
                stats: {
                    "hp_": [0.14, 0.035]
                }
            },
            {
                label: "Si des alliés subissent une modification de PV une 2ème fois (PV%)",
                stats: {
                    "hp_": [0.28, 0.07]
                }
            }
        ]
    },
    "UrakuMisugiri": {
        buffs: [
            {
                label: "Si le personnage actif inflige des dégâts Géo (DÉF%)",
                stats: {
                    "def_": [0.20, 0.05]
                }
            }
        ]
    },
    "PeakPatrolSong": {
        selectMode: "exclusive",
        buffs: [
            {
                label: "Si une attaque normale ou plongée touche un ennemi une 1ère fois (DÉF% et DGTs Élémentaires)",
                stats: {
                    "def_": [0.08, 0.02],
                    "pyro_dmg_": [0.10, 0.025],
                    "hydro_dmg_": [0.10, 0.025],
                    "cryo_dmg_": [0.10, 0.025],
                    "electro_dmg_": [0.10, 0.025],
                    "anemo_dmg_": [0.10, 0.025],
                    "geo_dmg_": [0.10, 0.025],
                    "dendro_dmg_": [0.10, 0.025]
                }
            },
            {
                label: "Si une attaque normale ou plongée touche un ennemi une 2ème fois (DÉF% et DGTs Élémentaires)",
                stats: {
                    "def_": [0.16, 0.04],
                    "elemental_dmg_": [0.20, 0.05],
                    "pyro_dmg_bonus_scaling": { source: "def", percent: [0.008, 0.002] },
                    "hydro_dmg_bonus_scaling": { source: "def", percent: [0.008, 0.002] },
                    "cryo_dmg_bonus_scaling": { source: "def", percent: [0.008, 0.002] },
                    "electro_dmg_bonus_scaling": { source: "def", percent: [0.008, 0.002] },
                    "anemo_dmg_bonus_scaling": { source: "def", percent: [0.008, 0.002] },
                    "geo_dmg_bonus_scaling": { source: "def", percent: [0.008, 0.002] },
                    "dendro_dmg_bonus_scaling": { source: "def", percent: [0.008, 0.002] }
                }
            }
        ]
    },
    "Azurelight": {
        buffs: [
            {
                label: "Si une compétence élémentaire est utilisée (ATQ%)",
                stats: { "atk_": 0.24 }
            },
            {
                label: "Si le porteur a 0 énergie (ATQ% et DGT CRIT)",
                stats: { "atk_": 0.24, "critDMG_": 0.40 }
            }
        ]
    },
    "AthameArtis": {
        selectMode: "exclusive",
        buffs: [
            {
                label: "Si un déchaînement élémentaire touche un ennemi (ATQ%)",
                stats: {
                    "atk_": [0.20, 0.05]
                }
            },
            {
                label: "Si l'équipe est composée de deux membre de l'Hexerei (ATQ%)",
                stats: {
                    "atk_": [0.35, 0.0875]
                }
            }
        ]
    },

    // 5 étoiles - épées à une main
    "WolfsGravestone": {
        buffs: [
            {
                label: "Si une attaque touche un ennemi ayant moins de 30% de ses PV (ATQ%)",
                stats: {
                    "atk_": [0.40, 0.10]
                }
            }
        ]
    },
    "SongOfBrokenPines": {
        buffs: [
            {
                label: "Si 4 attaques normales ou chargées touchent un ennemi (ATQ%)",
                stats: {
                    "atk_": [0.20, 0.05]
                }
            }
        ]
    },
    "TheUnforged": {
        selectMode: "cumulative",
        buffs: [
            {
                label: "Si une 1ère attaque touche un ennemi (ATQ%)",
                stats: {
                    "atk_": [0.04, 0.01]
                }
            },
            {
                label: "Si une 2ème attaque touche un ennemi (ATQ%)",
                stats: {
                    "atk_": [0.04, 0.01]
                }
            },
            {
                label: "Si une 3ème attaque touche un ennemi (ATQ%)",
                stats: {
                    "atk_": [0.04, 0.01]
                }
            },
            {
                label: "Si une 4ème attaque touche un ennemi (ATQ%)",
                stats: {
                    "atk_": [0.04, 0.01]
                }
            },
            {
                label: "Si une 5ème attaque touche un ennemi (ATQ%)",
                stats: {
                    "atk_": [0.04, 0.01]
                }
            }
        ]
    },
    "BeaconOfTheReedSea": {
        buffs: [
            {
                label: "Si une compétence élémentaire touche un ennemi (ATQ%)",
                stats: {
                    "atk_": [0.20, 0.05]
                }
            },
            {
                label: "Si le personnage subit des dégâts (ATQ%)",
                stats: {
                    "atk_": [0.20, 0.05]
                }
            },
            {
                label: "Si le personnage n'est pas protégé par un bouclier (PV%)",
                stats: {
                    "hp_": [0.32, 0.08]
                }
            }
        ]
    },
    "AThousandBlazingSuns": {
        selectMode: "cumulative",
        buffs: [
            {
                label: "Si une compétence ou un déchaînement élémentaire est utilisé (ATQ% et DGT CRIT)",
                stats: {
                    "atk_": [0.28, 0.07],
                    "critDMG_": [0.20, 0.05]
                }
            },
            {
                label: "Si le personnage est sous une Bénédiction noctâme (+75% d'efficacité)",
                stats: {
                    "atk_": [0.21, 0.0525],
                    "critDMG_": [0.15, 0.0375]
                }
            }
        ]
    },

    // 5 étoiles - arcs
    "ElegyForTheEnd": {
        buffs: [
            {
                label: "Si 4 compétences ou déchaînements élémentaires ont touché un ennemi (Maîtrise élémentaire et ATQ%)",
                stats: {
                    "atk_": [0.20, 0.05],
                    "eleMas": [100, 25]
                }
            }
        ]
    },
    "PolarStar": {
        selectMode: "exclusive",
        buffs: [
            {
                label: "1 Stack (ATQ%)",
                stats: {
                    "atk_": [0.10, 0.025]
                }
            },
            {
                label: "2 Stacks (ATQ%)",
                stats: {
                    "atk_": [0.20, 0.05]
                }
            },
            {
                label: "3 Stacks (ATQ%)",
                stats: {
                    "atk_": [0.30, 0.075]
                }
            },
            {
                label: "4 Stacks (ATQ%)",
                stats: {
                    "atk_": [0.48, 0.12]
                }
            }
        ]
    },
    "TheFirstGreatMagic": {
        selectMode: "exclusive",
        buffs: [
            {
                label: "1 Allié du même élément que le porteur (ATQ%)",
                stats: {
                    "atk_": [0.16, 0.04]
                }
            },
            {
                label: "2 Alliés du même élément que le porteur (ATQ%)",
                stats: {
                    "atk_": [0.32, 0.08]
                }
            },
            {
                label: "3 Alliés du même élément que le porteur (ATQ%)",
                stats: {
                    "atk_": [0.48, 0.12]
                }
            }
        ]
    },
    "SilvershowerHeartstrings": {
        selectMode: "exclusive",
        buffs: [
            {
                label: "1 Stack (PV%)",
                stats: {
                    "hp_": [0.12, 0.03]
                }
            },
            {
                label: "2 Stacks (PV%)",
                stats: {
                    "atk_": [0.24, 0.06]
                }
            },
            {
                label: "3 Stacks (PV% et Taux CRIT uniquement pour le déchaînement élémentaire)",
                active: false,
                stats: {
                    "atk_": [0.40, 0.10],
                    "critRate_": [0.28, 0.07]
                }
            }
        ]
    },
    "AstralVulturesCrimsonPlumage": {
        buffs: [
            {
                label: "Si une réaction élémentaire Dispersion est déclenchée (ATQ%)",
                stats: {
                    "atk_": [0.24, 0.06]
                }
            }
        ]
    },

    // 5 étoiles - armes d'hast
    "StaffOfHoma": {
        buffs: [
            {
                label: "Si les PV sont inférieurs à 50% (ATQ% en fonction des PV%)",
                stats: {
                    "atk_bonus_scaling": {
                        source: "hp",
                        percent: [0.01, 0.002]
                    }
                }
            }
        ]
    },
    "VortexVanquisher": {
        selectMode: "cumulative",
        buffs: [
            {
                label: "Si une 1ère attaque touche un ennemi (ATQ%)",
                stats: {
                    "atk_": [0.04, 0.01]
                }
            },
            {
                label: "Si une 2ème attaque touche un ennemi (ATQ%)",
                stats: {
                    "atk_": [0.04, 0.01]
                }
            },
            {
                label: "Si une 3ème attaque touche un ennemi (ATQ%)",
                stats: {
                    "atk_": [0.04, 0.01]
                }
            },
            {
                label: "Si une 4ème attaque touche un ennemi (ATQ%)",
                stats: {
                    "atk_": [0.04, 0.01]
                }
            },
            {
                label: "Si une 5ème attaque touche un ennemi (ATQ%)",
                stats: {
                    "atk_": [0.04, 0.01]
                }
            }
        ]
    },
    "PrimordialJadeWingedSpear": {
        selectMode: "exclusive",
        buffs: [
            {
                label: "1 Stack (ATQ%)",
                stats: {
                    "atk_": [0.032, 0.007]
                }
            },
            {
                label: "2 Stacks (ATQ%)",
                stats: {
                    "atk_": [0.064, 0.014]
                }
            },
            {
                label: "3 Stacks (ATQ%)",
                stats: {
                    "atk_": [0.096, 0.021]
                }
            },
            {
                label: "4 Stacks (ATQ%)",
                stats: {
                    "atk_": [0.128, 0.028]
                }
            },
            {
                label: "5 Stacks (ATQ%)",
                stats: {
                    "atk_": [0.160, 0.035]
                }
            },
            {
                label: "6 Stacks (ATQ%)",
                stats: {
                    "atk_": [0.192, 0.042]
                }
            },
            {
                label: "7 Stacks (ATQ%)",
                stats: {
                    "atk_": [0.224, 0.049]
                }
            }
        ]
    },
    "CalamityQueller": {
        selectMode: "exclusive",
        buffs: [
            {
                label: "Max Stacks sur le terrain (ATQ%)",
                stats: {
                    "atk_": [0.192, 0.048]
                }
            },
            {
                label: "Max Stacks hors du terrain (ATQ%)",
                stats: {
                    "atk_": [0.384, 0.096]
                }
            }
        ]
    },
    "EngulfingLightning": {
        buffs: [
            {
                label: "Si un déchaînement élémentaire est utilisé (Recharge d'énergie)",
                stats: {
                    "enerRech_": [0.30, 0.05]
                }
            }
        ]
    },
    "StaffOfTheScarletSands": {
        selectMode: "exclusive",
        buffs: [
            {
                label: "1 Stack (ATQ% en fonction de la Maîtrise élémentaire)",
                stats: {
                    "atk_bonus_scaling": {
                        source: "eleMas",
                        percent: [0.28, 0.07]
                    }
                }
            },
            {
                label: "2 Stacks (ATQ% en fonction de la Maîtrise élémentaire)",
                stats: {
                    "atk_bonus_scaling": {
                        source: "eleMas",
                        percent: [0.56, 0.14]
                    }
                }
            },
            {
                label: "3 Stacks (ATQ% en fonction de la Maîtrise élémentaire)",
                stats: {
                    "atk_bonus_scaling": {
                        source: "eleMas",
                        percent: [0.84, 0.21]
                    }
                }
            }
        ]
    },
    "SymphonistOfScents": {
        buffs: [
            {
                label: "Si le porteur est hors du terrain (ATQ%)",
                stats: {
                    "atk_": [0.12, 0.03]
                }
            },
            {
                label: "Si le porteur soigne un allié (ATQ%)",
                stats: {
                    "atk_": [0.32, 0.08]
                }
            }
        ]
    },
    "FracturedHalo": {
        buffs: [
            {
                label: "Si une compétence ou un déchaînement élémentaire est utilisé (ATQ%)",
                stats: {
                    "atk_": [0.24, 0.06]
                }
            }
        ]
    },
    "BloodsoakedRuins": {
        buffs: [
            {
                label: "Si une réaction Sélène est déclenchée (DGT CRIT)",
                stats: {
                    "critDMG_": [0.28, 0.07]
                }
            }
        ]
    },

    // 5 étoiles - catalyseurs
    "LostPrayerToTheSacredWinds": {
        selectMode: "cumulative",
        buffs: [
            {
                label: "1 Stack (DGTs Élémentaires)",
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
                label: "2 Stacks (DGTs Élémentaires)",
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
                label: "3 Stacks (DGTs Élémentaires)",
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
                label: "4 Stacks (DGTs Élémentaires)",
                stats: {
                    "pyro_dmg_": [0.08, 0.02],
                    "hydro_dmg_": [0.08, 0.02],
                    "cryo_dmg_": [0.08, 0.02],
                    "electro_dmg_": [0.08, 0.02],
                    "anemo_dmg_": [0.08, 0.02],
                    "geo_dmg_": [0.08, 0.02],
                    "dendro_dmg_": [0.08, 0.02]
                }
            }
        ]
    },
    "MemoryOfDust": {
        selectMode: "cumulative",
        buffs: [
            {
                label: "Si une 1ère attaque touche un ennemi (ATQ%)",
                stats: {
                    "atk_": [0.04, 0.01]
                }
            },
            {
                label: "Si une 2ème attaque touche un ennemi (ATQ%)",
                stats: {
                    "atk_": [0.04, 0.01]
                }
            },
            {
                label: "Si une 3ème attaque touche un ennemi (ATQ%)",
                stats: {
                    "atk_": [0.04, 0.01]
                }
            },
            {
                label: "Si une 4ème attaque touche un ennemi (ATQ%)",
                stats: {
                    "atk_": [0.04, 0.01]
                }
            },
            {
                label: "Si une 5ème attaque touche un ennemi (ATQ%)",
                stats: {
                    "atk_": [0.04, 0.01]
                }
            }
        ]
    },
    "JadefallsSplendor": {
        buffs: [
            {
                label: "Si un déchaînement élémentaire est utilisé ou qu'un bouclier est créé (DGTs Élémentaires en fonction des PV)",
                stats: {
                    "pyro_dmg_bonus_scaling": { source: "hp", percent: [0.0003, 0.0002] },
                    "hydro_dmg_bonus_scaling": { source: "hp", percent: [0.0003, 0.0002] },
                    "cryo_dmg_bonus_scaling": { source: "hp", percent: [0.0003, 0.0002] },
                    "electro_dmg_bonus_scaling": { source: "hp", percent: [0.0003, 0.0002] },
                    "anemo_dmg_bonus_scaling": { source: "hp", percent: [0.0003, 0.0002] },
                    "geo_dmg_bonus_scaling": { source: "hp", percent: [0.0003, 0.0002] },
                    "dendro_dmg_bonus_scaling": { source: "hp", percent: [0.0003, 0.0002] }
                }
            }
        ]
    },
    "KagurasVerity": {
        buffs: [
            {
                label: "Si 3 compétences élémentaires sont utilisées (DGTs Élémentaires)",
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
    "AThousandFloatingDreams": {
        selectMode: "exclusive",
        buffs: [
            {
                label: "3 Alliés du même élément que le porteur (Maîtrise élémentaire)",
                stats: {
                    "eleMas": [96, 24]
                }
            },
            {
                label: "2 Alliés du même élément que le porteur et 1 Différent (Maîtrise élémentaire et DGTs Élémentaires)",
                stats: {
                    "eleMas": [64, 16],
                    "elemental_dmg_": [0.10, 0.04]
                }
            },
            {
                label: "1 Alliés du même élément que le porteur et 2 Différents (Maîtrise élémentaire et DGTs Élémentaires)",
                stats: {
                    "eleMas": [32, 8],
                    "elemental_dmg_": [0.20, 0.08]
                }
            },
            {
                label: "3 Alliés d'un élément différent de celui du porteur (DGTs Élémentaires)",
                stats: {
                    "elemental_dmg_": [0.30, 0.12]
                }
            }
        ]
    },
    "SunnyMorningSleepIn": {
        buffs: [
            {
                label: "Si une réaction de Dispersion est déclenchée (Maîtrise élémentaire)",
                stats: {
                    "eleMas": [120, 30]
                }
            },
            {
                label: "Si une compétence élémentaire est utilisée (Maîtrise élémentaire)",
                stats: {
                    "eleMas": [96, 24]
                }
            },
            {
                label: "Si un déchaînement élémentaire est utilisé (Maîtrise élémentaire)",
                stats: {
                    "eleMas": [32, 8]
                }
            }
        ]
    },
    "VividNotions": {
        buffs: [
            {
                label: "Si une attaque plongée est utilisée (DGT CRIT uniquement pour les attaques plongées)",
                stats: {
                    "critDMG_": [0.28, 0.07]
                }
            },
            {
                label: "Si une compétence ou un déchaînement élémentaire est utilisé (DGT CRIT uniquement pour les attaques plongées)",
                stats: {
                    "critDMG_": [0.40, 0.10]
                }
            }
        ]
    },
    "NightweaversLookingGlass": {
        buffs: [
            {
                label: "Si une compétence élémentaire inflige des DGT Hydro ou Dendro (Maîtrise élémentaire)",
                stats: {
                    "eleMas": [60, 15]
                }
            },
            {
                label: "Si une réaction de Sélénofleurissement est déclenchée (Maîtrise élémentaire)",
                stats: {
                    "eleMas": [60, 15]
                }
            }
        ]
    },
    "ReliquaryOfTruth": {
        selectMode: "exclusive",
        buffs: [
            {
                label: "Si une compétence élémentaire est utilisée (Maîtrise élémentaire)",
                stats: {
                    "eleMas": [80, 20]
                }
            },
            {
                label: "Si des dégâts de Sélénofleurissment sont infligés (DGT CRIT)",
                stats: {
                    "critDMG_": [0.24, 0.06]
                }
            },
            {
                label: "Si les deux effets précédents sont actifs en même temps (Maîtrise élémentaire et DGT CRIT)",
                stats: {
                    "eleMas": [120, 30],
                    "critDMG_": [0.36, 0.09]
                }
            }
        ]
    },
    "NocturnesCurtainCall": {
        buffs: [
            {
                label: "Si une réaction Sélène est déclenchée ou inflige des dégâts (PV% et DGT CRIT uniquement pour les réactions Sélène)",
                stats: {
                    "hp_": [0.14, 0.02],
                    "critDMG_": [0.60, 0.20],
                }
            }
        ]
    },
    // 6.4
    "GestOfTheMightyWolf": {
        selectMode: "exclusive",
        buffs: [
            {
                label: "Hymne des quatre vents (1 stacks)",
                stats: {
                    "critDMG_": [0.075, 0.02]
                }
            },
            {
                label: "Hymne des quatre vents (2 stacks)",
                stats: {
                    "critDMG_": [0,15, 0.04]
                }
            },
            {
                label: "Hymne des quatre vents (3 stacks)",
                stats: {
                    "critDMG_": [0.225, 0.06]
                }
            },
            {
                label: "Hymne des quatre vents (4 stacks)",
                active: true,
                stats: {
                    "critDMG_": [0.30, 0.08]
                }
            }
        ]
    }
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
    },
    "ADayCarvedFromRisingWinds": {
        4: [
            {
                label: "Si des ennemis sont touchés (25% ATQ)",
                stats: { "atk_": 0.25 }
            },
            {
                label: "Si le personnage a terminé son devoir de la sorcière (20% Taux CRIT)",
                stats: { "critRate_": 0.2 }
            }
        ]
    },
    "CelestialGift": {
        selectMode: "exclusive",
        4: [
            {
                label: "Si le personnage a terminé son devoir de la sorcière et a utilisé une compétence élémentaire (20% DGT Élémentaires)",
                stats: {"elemental_dmg_": 0.2}
            },
            {
                label: "Si l'équipe compte deux personnages Hexerei (40% DGT Élémentaires)",
                stats: {"elemental_dmg_": 0.4}
            },
        ]
    },
    "DisenchantmentInDeepShadow": {
        4: [
            {
                label: "Si l'adversaire est affecté par Supraconduction (16% Taux Critique uniquement sur cette attaque)",
                stats: {"critRate_": 0.16},
                active: false
            }
        ]
    }
};

window.DEFAULT_CONFIG = DEFAULT_CONFIG;
window.CHARACTER_CONFIG = CHARACTER_CONFIG;
window.WEAPON_PASSIVES = WEAPON_PASSIVES;
window.SET_PASSIVES = SET_PASSIVES;