const DEFAULT_CONFIG = {
    weights: { "critRate_": 1, "critDMG_": 1, "atk_": 0.5, "enerRech_": 0.5 },
    bestSets: [],
    goodSets: [],
    talents: { auto: 1, skill: 6, burst: 6 }
};

const CHARACTER_CONFIG = {
    "NomDuPersonnage": {
        color: "#FFFFFF",
        portraitOffset: 0,

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

                            // elemental_dmg_bonus_scaling: {
                            //     source: "enerRech_", // Stat source
                            //     percent: 0.4,       // % converti
                            //     baseline: 100       // (Optionnel) Seuil à soustraire
                            // }
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
                    "atk_": 0, "atk": 0, // 0.8 + 0.1 mais 1 si peu de buff extérieur
                    "hp_": 0, "hp": 0, // 0.9 à 1 + 0.1 mais 0.8 pour Hu Tao par exemple
                    "def_": 0, "def": 0, // 0.8 à 0.9, 0.8 si crit important
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
    // Kaeya
    // Lisa
    // Barbara
    // Noelle
    // Bennett
    // Razor
    // Beidou
    // Fischl
    // Xiangling
    // Xingqiu
    // Chongyun
    // Ningguang
    // Sucrose
    // Venti
    // Klee
    // Jean
    // Diluc
    // Keqing
    // Mona
    // Qiqi

    // 1.1
    // Diona
    // Tartaglia
    // Xinyan
    "Zhongli": {
        // --- 1. CONFIGURATION GLOBALE ---
        color: "#814b32", // Code Hex de l'élément ou de la tenue
        portraitOffset: -35, // Décalage vertical de l'image (négatif = monte, positif = descend)

        // Objectifs de Talents (Pour le coaching)
        talents: {
            auto: 1,  // 1 = Inutile, 6 = Utile, 8-10 = Prioritaire
            skill: 10,
            burst: 6
        },

        // --- 3. ARCHÉTYPES (BUILDS) ---
        // Tu peux en mettre autant que tu veux. Le premier est celui par défaut.
        builds: {
            "Shielder": { // Clé unique (ex: 'vape', 'freeze', 'hypercarry')
                name: "Shielder",

                // Poids des stats (1 = Prioritaire, 0.5 = Utile, 0 = Inutile)
                weights: {
                    "critRate_": 0.4, "critDMG_": 0,
                    "atk_": 0, "atk": 0, // ATQ% vaut souvent 1, ATQ flat ~0.2
                    "hp_": 1, "hp": 0.8,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.3, // Ajuster selon besoin

                    // Bonus Élémentaires (Mettre 1 à l'élément du perso, 0 aux autres)
                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                hideUIStats: [],
                showUIStats: [],

                // Sets (Utiliser les noms exacts du mapping SET_NAME_MAPPING ou la clé EN)
                bestSets: ["TenacityOfTheMillelith:4"], // Top Tier
                goodSets: ["TenacityOfTheMillelith:2", "VourukashasGlow:2", "NoblesseOblige:4"], // Viables

                // Cible ER recommandée (%)
                er_req: 100,

                // Composition d'équipe (4 Slots)
                team: [
                    // Slot 1 : Généralement un Support clé
                    { role: "Flex", name: "", element: "geo" },

                    // Slot 2 : Sub-DPS ou Réaction
                    { role: "Flex", name: "", element: "geo" },

                    // Slot 3 : Flex (Exemple Dual Slot : Kazuha ou Sucrose)
                    { role: "Flex", name: "", element: "geo" },
                ]
            }
        }
    },

    // 1.2
    "Albedo": {
        // --- 1. CONFIGURATION GLOBALE ---
        color: "#3e387f", // Code Hex de l'élément ou de la tenue
        portraitOffset: -36, // Décalage vertical de l'image (négatif = monte, positif = descend)

        // Objectifs de Talents (Pour le coaching)
        talents: {
            auto: 1,  // 1 = Inutile, 6 = Utile, 8-10 = Prioritaire
            skill: 8,
            burst: 8
        },

        // --- 2. PASSIFS & CONSTELLATIONS ---
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

        // --- 3. ARCHÉTYPES (BUILDS) ---
        // Tu peux en mettre autant que tu veux. Le premier est celui par défaut.
        builds: {
            "Sub-DPS Géo": { // Clé unique (ex: 'vape', 'freeze', 'hypercarry')
                name: "Sub-DPS Géo",

                // Poids des stats (1 = Prioritaire, 0.5 = Utile, 0 = Inutile)
                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.1, "atk": 0, // ATQ% vaut souvent 1, ATQ flat ~0.2
                    "hp_": 0, "hp": 0,
                    "def_": 0.8, "def": 0.1,
                    "eleMas": 0, "enerRech_": 0.1, // Ajuster selon besoin

                    // Bonus Élémentaires (Mettre 1 à l'élément du perso, 0 aux autres)
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

                // Sets (Utiliser les noms exacts du mapping SET_NAME_MAPPING ou la clé EN)
                bestSets: ["HuskOfOpulentDreams:4", "GoldenTroupe:4"], // Top Tier
                goodSets: ["HuskOfOpulentDreams:2", "GoldenTroupe:2"], // Viables

                // Cible ER recommandée (%)
                er_req: 100,

                // Composition d'équipe (4 Slots)
                team: [
                    // Slot 1 : Généralement un Support clé
                    { role: "DPS", name: "Arlecchino", element: "pyro" },

                    // Slot 2 : Sub-DPS ou Réaction
                    { role: "Sub-DPS", name: "Durin", element: "pyro" },

                    // Slot 3 : Flex (Exemple Dual Slot : Kazuha ou Sucrose)
                    { role: "Support", name: "Xilonen", element: "geo" },
                ]
            }
        }
    },
    "Ganyu": {
        // --- 1. CONFIGURATION GLOBALE ---
        color: "#6dc5ff", // Code Hex de l'élément ou de la tenue
        portraitOffset: -37, // Décalage vertical de l'image (négatif = monte, positif = descend)

        // Objectifs de Talents (Pour le coaching)
        talents: {
            auto: 10,  // 1 = Inutile, 6 = Utile, 8-10 = Prioritaire
            skill: 6,
            burst: 8
        },

        // --- 2. PASSIFS & CONSTELLATIONS ---
        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A1 : Cœur indivisible",
                        active: true, // Coché par défaut ?
                        stats: {
                            critRate_: 0.20,
                        }
                    },
                    {
                        label: "A4 : Harmonie du ciel et de la terre",
                        active: true, // Coché par défaut ?
                        stats: {
                            elemental_dmg_: 0.20,
                        }
                    }
                ]
            },
        ],

        // --- 3. ARCHÉTYPES (BUILDS) ---
        // Tu peux en mettre autant que tu veux. Le premier est celui par défaut.
        builds: {
            "DPS Gel": { // Clé unique (ex: 'vape', 'freeze', 'hypercarry')
                name: "DPS Gel",

                // Poids des stats (1 = Prioritaire, 0.5 = Utile, 0 = Inutile)
                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1, // ATQ% vaut souvent 1, ATQ flat ~0.2
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.3, // Ajuster selon besoin

                    // Bonus Élémentaires (Mettre 1 à l'élément du perso, 0 aux autres)
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

                // Sets (Utiliser les noms exacts du mapping SET_NAME_MAPPING ou la clé EN)
                bestSets: ["BlizzardStrayer:4", "MarechausseeHunter:4", "WanderersTroupe:4"], // Top Tier
                goodSets: ["BlizzardStrayer:2", "MarechausseeHunter:2", "ShimenawasReminiscence:4"], // Viables

                // Cible ER recommandée (%)
                er_req: 110,

                // Composition d'équipe (4 Slots)
                team: [
                    // Slot 1 : Généralement un Support clé
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },

                    // Slot 2 : Sub-DPS ou Réaction
                    { role: "Sub-DPS", name: "Escoffier", element: "cryo" },

                    // Slot 3 : Flex (Exemple Dual Slot : Kazuha ou Sucrose)
                    { role: "Support", name: "Shenhe", element: "cryo" },
                ]
            },
            "DPS Fonte": { // Clé unique (ex: 'vape', 'freeze', 'hypercarry')
                name: "DPS Fonte",

                // Poids des stats (1 = Prioritaire, 0.5 = Utile, 0 = Inutile)
                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1, // ATQ% vaut souvent 1, ATQ flat ~0.2
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.6, "enerRech_": 0, // Ajuster selon besoin

                    // Bonus Élémentaires (Mettre 1 à l'élément du perso, 0 aux autres)
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

                // Sets (Utiliser les noms exacts du mapping SET_NAME_MAPPING ou la clé EN)
                bestSets: ["UnfinishedReverie:4", "BlizzardStrayer:4", "WanderersTroupe:4"], // Top Tier
                goodSets: ["BlizzardStrayer:2", "MarechausseeHunter:2", "ShimenawasReminiscence:4"], // Viables

                // Cible ER recommandée (%)
                er_req: 100,

                // Composition d'équipe (4 Slots)
                team: [
                    // Slot 1 : Généralement un Support clé
                    { role: "Sub-DPS", name: "Emilie", element: "dendro" },

                    // Slot 2 : Sub-DPS ou Réaction
                    { role: "Sub-DPS", name: "Xiangling", element: "pyro" },

                    // Slot 3 : Flex (Exemple Dual Slot : Kazuha ou Sucrose)
                    { role: "Support", name: "Bennett", element: "pyro" },
                ]
            }
        }
    },

    // 1.3
    "Hu Tao": {
        // --- 1. CONFIGURATION GLOBALE ---
        color: "#D33933", // Code Hex de l'élément ou de la tenue
        portraitOffset: -40, // Décalage vertical de l'image (négatif = monte, positif = descend)

        // Objectifs de Talents (Pour le coaching)
        talents: {
            auto: 10,  // 1 = Inutile, 6 = Utile, 8-10 = Prioritaire
            skill: 10,
            burst: 8
        },

        // --- 2. PASSIFS & CONSTELLATIONS ---
        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A4 : Sang bouillant",
                        active: true, // Coché par défaut ?
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
                        cons: 6, // IMPORTANT : Niveau requis (1 à 6)
                        stats: {
                            critRate_: 1 // Simulation de gain DPS
                        }
                    }
                ]
            }
        ],

        // --- 3. ARCHÉTYPES (BUILDS) ---
        // Tu peux en mettre autant que tu veux. Le premier est celui par défaut.
        builds: {
            "Évaporation": { // Clé unique (ex: 'vape', 'freeze', 'hypercarry')
                name: "Évaporation",

                // Poids des stats (1 = Prioritaire, 0.5 = Utile, 0 = Inutile)
                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.1, "atk": 0, // ATQ% vaut souvent 1, ATQ flat ~0.2
                    "hp_": 0.8, "hp": 0.1,
                    "def_": 0, "def": 0,
                    "eleMas": 0.6, "enerRech_": 0.1, // Ajuster selon besoin

                    // Bonus Élémentaires (Mettre 1 à l'élément du perso, 0 aux autres)
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

                // Sets (Utiliser les noms exacts du mapping SET_NAME_MAPPING ou la clé EN)
                bestSets: ["CrimsonWitchOfFlames:4", "ShimenawasReminiscence:4", "MarechausseeHunter:4"],
                goodSets: ["CrimsonWitchOfFlames:2", "GildedDreams:2"],

                // Cible ER recommandée (%)
                er_req: 120,

                // Composition d'équipe (4 Slots)
                team: [
                    // Slot 1 : Généralement un Support clé
                    { role: "Sub-DPS", name: "Yelan", element: "hydro" },

                    // Slot 2 : Sub-DPS ou Réaction
                    { role: "Sub-DPS", name: "Xingqiu", element: "hydro" },

                    // Slot 3 : Flex (Exemple Dual Slot : Kazuha ou Sucrose)
                    { role: "Support", name: "Zhongli", element: "geo" },
                ]
            },
            "Fonte": { // Clé unique (ex: 'vape', 'freeze', 'hypercarry')
                name: "Fonte",

                // Poids des stats (1 = Prioritaire, 0.5 = Utile, 0 = Inutile)
                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.1, "atk": 0, // ATQ% vaut souvent 1, ATQ flat ~0.2
                    "hp_": 0.8, "hp": 0.1,
                    "def_": 0, "def": 0,
                    "eleMas": 0.6, "enerRech_": 0.1, // Ajuster selon besoin

                    // Bonus Élémentaires (Mettre 1 à l'élément du perso, 0 aux autres)
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

                // Sets (Utiliser les noms exacts du mapping SET_NAME_MAPPING ou la clé EN)
                bestSets: ["CrimsonWitchOfFlames:4", "ShimenawasReminiscence:4", "MarechausseeHunter:4"],
                goodSets: ["CrimsonWitchOfFlames:2", "GildedDreams:2"],

                // Cible ER recommandée (%)
                er_req: 120,

                // Composition d'équipe (4 Slots)
                team: [
                    // Slot 1 : Généralement un Support clé
                    { role: "Support", name: "Rosaria", element: "cryo" },

                    // Slot 2 : Sub-DPS ou Réaction
                    { role: "Support", name: "Kazuha", element: "anemo" },

                    // Slot 3 : Flex (Exemple Dual Slot : Kazuha ou Sucrose)
                    { role: "Support", name: "Citlali", element: "cryo" },
                ]
            }
        }
    },
    // Xiao

    // 1.4
    // Rosaria

    // 1.5
    // Eula
    // Yanfei

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
            "Support Universel": {
                name: "Support Universel",

                weights: {
                    "critRate_": 0.4, "critDMG_": 0.4,
                    "atk_": 0.4, "atk": 0.1, // 0.8 + 0.1 mais 1 si peu de buff extérieur
                    "hp_": 0, "hp": 0, // 0.9 à 1 + 0.1 mais 0.8 pour Hu Tao par exemple
                    "def_": 0, "def": 0, // 0.8 à 0.9, 0.8 si crit important
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
                goodSets: [],

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
                    "atk_": 0.8, "atk": 0.1, // 0.8 + 0.1 mais 1 si peu de buff extérieur
                    "hp_": 0, "hp": 0, // 0.9 à 1 + 0.1 mais 0.8 pour Hu Tao par exemple
                    "def_": 0, "def": 0, // 0.8 à 0.9, 0.8 si crit important
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
                goodSets: ["BlizzardStrayer:2", "GladiatorsFinale:2", "GladiatorsFinale:4", "EmblemOfSeveredFate:2"],

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
        // --- 1. CONFIGURATION GLOBALE ---
        color: "#ff846d", // Code Hex de l'élément ou de la tenue
        portraitOffset: -37, // Décalage vertical de l'image (négatif = monte, positif = descend)

        // Objectifs de Talents (Pour le coaching)
        talents: {
            auto: 10,  // 1 = Inutile, 6 = Utile, 8-10 = Prioritaire
            skill: 10,
            burst: 6
        },

        // --- 2. PASSIFS & CONSTELLATIONS ---
        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A1 : Tour de passe-passe",
                        active: true, // Coché par défaut ?
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
                        cons: 1, // IMPORTANT : Niveau requis (1 à 6)
                        stats: {
                            atk_: 0.20 // Simulation de gain DPS
                        }
                    },
                    {
                        label: "C2 : Procession de feux de joie\n",
                        cons: 2,
                        stats: {
                            pyro_dmg_: 0.25
                        }
                    }
                ]
            }
        ],

        // --- 3. ARCHÉTYPES (BUILDS) ---
        // Tu peux en mettre autant que tu veux. Le premier est celui par défaut.
        builds: {
            "Évaporation": { // Clé unique (ex: 'vape', 'freeze', 'hypercarry')
                name: "Évaporation",

                // Poids des stats (1 = Prioritaire, 0.5 = Utile, 0 = Inutile)
                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1, // ATQ% vaut souvent 1, ATQ flat ~0.2
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.6, "enerRech_": 0, // Ajuster selon besoin

                    // Bonus Élémentaires (Mettre 1 à l'élément du perso, 0 aux autres)
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

                // Sets (Utiliser les noms exacts du mapping SET_NAME_MAPPING ou la clé EN)
                bestSets: ["ShimenawasReminiscence:4", "CrimsonWitchOfFlames:4"], // Top Tier
                goodSets: ["CrimsonWitchOfFlames:2", "ShimenawasReminiscence:2"], // Viables

                // Cible ER recommandée (%)
                er_req: 100,

                // Composition d'équipe (4 Slots)
                team: [
                    // Slot 1 : Généralement un Support clé
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },

                    // Slot 2 : Sub-DPS ou Réaction
                    { role: "Sub-DPS", name: "Yelan", element: "hydro" },

                    // Slot 3 : Flex (Exemple Dual Slot : Kazuha ou Sucrose)
                    { role: "Support", name: "Bennett", element: "pyro" },
                ]
            },
            "Fonte": { // Clé unique (ex: 'vape', 'freeze', 'hypercarry')
                name: "Fonte",

                // Poids des stats (1 = Prioritaire, 0.5 = Utile, 0 = Inutile)
                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1, // ATQ% vaut souvent 1, ATQ flat ~0.2
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.6, "enerRech_": 0, // Ajuster selon besoin

                    // Bonus Élémentaires (Mettre 1 à l'élément du perso, 0 aux autres)
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

                // Sets (Utiliser les noms exacts du mapping SET_NAME_MAPPING ou la clé EN)
                bestSets: ["ShimenawasReminiscence:4", "CrimsonWitchOfFlames:4"], // Top Tier
                goodSets: ["CrimsonWitchOfFlames:2", "ShimenawasReminiscence:2"], // Viables

                // Cible ER recommandée (%)
                er_req: 100,

                // Composition d'équipe (4 Slots)
                team: [
                    // Slot 1 : Généralement un Support clé
                    { role: "Sub-DPS", name: "Rosaria", element: "cryo" },

                    // Slot 2 : Sub-DPS ou Réaction
                    { role: "Support", name: "Citlali", element: "cryo" },

                    // Slot 3 : Flex (Exemple Dual Slot : Kazuha ou Sucrose)
                    { role: "Support", name: "Bennett", element: "pyro" },
                ]
            },
            "Surcharge": { // Clé unique (ex: 'vape', 'freeze', 'hypercarry')
                name: "Surcharge",

                // Poids des stats (1 = Prioritaire, 0.5 = Utile, 0 = Inutile)
                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1, // ATQ% vaut souvent 1, ATQ flat ~0.2
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0, // Ajuster selon besoin

                    // Bonus Élémentaires (Mettre 1 à l'élément du perso, 0 aux autres)
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

                // Sets (Utiliser les noms exacts du mapping SET_NAME_MAPPING ou la clé EN)
                bestSets: ["ShimenawasReminiscence:4", "GladiatorsFinale:4"], // Top Tier
                goodSets: ["CrimsonWitchOfFlames:2", "ShimenawasReminiscence:2"], // Viables

                // Cible ER recommandée (%)
                er_req: 100,

                // Composition d'équipe (4 Slots)
                team: [
                    // Slot 1 : Généralement un Support clé
                    { role: "Sub-DPS", name: "Yae", element: "electro" },

                    // Slot 2 : Sub-DPS ou Réaction
                    { role: "Sub-DPS", name: "Fischl", element: "electro" },

                    // Slot 3 : Flex (Exemple Dual Slot : Kazuha ou Sucrose)
                    { role: "Support", name: "Chevreuse", element: "pyro" },
                ]
            }
        }
    },
    // Sayu

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
                    "atk_": 0.8, "atk": 0.1, // 0.8 + 0.1 mais 1 si peu de buff extérieur
                    "hp_": 0, "hp": 0, // 0.9 à 1 + 0.1 mais 0.8 pour Hu Tao par exemple
                    "def_": 0, "def": 0, // 0.8 à 0.9, 0.8 si crit important
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
                goodSets: ["MarechausseeHunter:4", "GildedDreams:4"],

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
                    "atk_": 0, "atk": 0, // 0.8 + 0.1 mais 1 si peu de buff extérieur
                    "hp_": 0, "hp": 0, // 0.9 à 1 + 0.1 mais 0.8 pour Hu Tao par exemple
                    "def_": 0, "def": 0, // 0.8 à 0.9, 0.8 si crit important
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
                goodSets: ["FlowerOfParadiseLost:2", "GildedDreams:2", "DeepwoodMemories:4"],

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
        color: "#858fff", // Code Hex de l'élément ou de la tenue
        portraitOffset: -36, // Décalage vertical de l'image (négatif = monte, positif = descend)

        // Objectifs de Talents (Pour le coaching)
        talents: {
            auto: 1,  // 1 = Inutile, 6 = Utile, 8-10 = Prioritaire
            skill: 8,
            burst: 8
        },

        // --- 2. PASSIFS & CONSTELLATIONS ---
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

        // --- 3. ARCHÉTYPES (BUILDS) ---
        // Tu peux en mettre autant que tu veux. Le premier est celui par défaut.
        builds: {
            "Healer": { // Clé unique (ex: 'vape', 'freeze', 'hypercarry')
                name: "Healer",

                // Poids des stats (1 = Prioritaire, 0.5 = Utile, 0 = Inutile)
                weights: {
                    "critRate_": 0, "critDMG_": 0,
                    "atk_": 0, "atk": 0, // ATQ% vaut souvent 1, ATQ flat ~0.2
                    "hp_": 1, "hp": 0.8,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 1, // Ajuster selon besoin

                    // Bonus Élémentaires (Mettre 1 à l'élément du perso, 0 aux autres)
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

                // Sets (Utiliser les noms exacts du mapping SET_NAME_MAPPING ou la clé EN)
                bestSets: ["OceanHuedClam:4", "TenacityOfTheMillelith:4"], // Top Tier
                goodSets: ["MaidenBeloved:4", "MaidenBeloved:2", "OceanHuedClam:2"], // Viables

                // Cible ER recommandée (%)
                er_req: 200,

                // Composition d'équipe (4 Slots)
                team: [
                    // Slot 1 : Généralement un Support clé
                    { role: "Flex", name: "", element: "hydro" },

                    // Slot 2 : Sub-DPS ou Réaction
                    { role: "Flex", name: "", element: "hydro" },

                    // Slot 3 : Flex (Exemple Dual Slot : Kazuha ou Sucrose)
                    { role: "Flex", name: "", element: "hydro" },
                ]
            },
            "Driver Fleurissement": { // Clé unique (ex: 'vape', 'freeze', 'hypercarry')
                name: "Driver Fleurissement",

                // Poids des stats (1 = Prioritaire, 0.5 = Utile, 0 = Inutile)
                weights: {
                    "critRate_": 0, "critDMG_": 0,
                    "atk_": 0, "atk": 0, // ATQ% vaut souvent 1, ATQ flat ~0.2
                    "hp_": 0.8, "hp": 0.1,
                    "def_": 0, "def": 0,
                    "eleMas": 1, "enerRech_": 0.8, // Ajuster selon besoin

                    // Bonus Élémentaires (Mettre 1 à l'élément du perso, 0 aux autres)
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

                // Sets (Utiliser les noms exacts du mapping SET_NAME_MAPPING ou la clé EN)
                bestSets: ["FlowerOfParadiseLost:4", "GildedDreams:4"], // Top Tier
                goodSets: ["FlowerOfParadiseLost:2", "GildedDreams:2", "WanderersTroupe:2"], // Viables

                // Cible ER recommandée (%)
                er_req: 200,

                // Composition d'équipe (4 Slots)
                team: [
                    // Slot 1 : Généralement un Support clé
                    { role: "Support", name: "Nilou", element: "hydro" },

                    // Slot 2 : Sub-DPS ou Réaction
                    { role: "Sub-DPS", name: "Lauma", element: "dendro" },

                    // Slot 3 : Flex (Exemple Dual Slot : Kazuha ou Sucrose)
                    { role: "Support", name: "Nahida", element: "dendro" },
                ]
            },

        }
    },
    // Kujou Sara

    // 2.2
    // Thoma
    // Aloy

    // 2.3
    "Arataki Itto": {
        // --- 1. CONFIGURATION GLOBALE ---
        color: "#7F473A", // Code Hex de l'élément ou de la tenue
        portraitOffset: -39, // Décalage vertical de l'image (négatif = monte, positif = descend)

        // Objectifs de Talents (Pour le coaching)
        talents: {
            auto: 10,  // 1 = Inutile, 6 = Utile, 8-10 = Prioritaire
            skill: 8,
            burst: 9
        },

        // --- 2. PASSIFS & CONSTELLATIONS ---
        buffs: [
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C4 : Au pain sec et à l'eau !",
                        cons: 4,
                        active: true, // Libre au joueur de le décocher s'il simule sa 1ère rotation
                        stats: {
                            def_: 0.20,
                            atk_: 0.20
                        }
                    },
                    {
                        label: "C6 : Arataki Itto, présent !",
                        cons: 6,
                        active: true, // Libre au joueur de le décocher s'il simule sa 1ère rotation
                        stats: {
                            critDMG_: 0.70
                        }
                    }
                ]
            }
        ],

        // --- 3. ARCHÉTYPES (BUILDS) ---
        // Tu peux en mettre autant que tu veux. Le premier est celui par défaut.
        builds: {
            "DPS Géo": { // Clé unique (ex: 'vape', 'freeze', 'hypercarry')
                name: "DPS Géo",

                // Poids des stats (1 = Prioritaire, 0.5 = Utile, 0 = Inutile)
                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0, "atk": 0, // ATQ% vaut souvent 1, ATQ flat ~0.2
                    "hp_": 0, "hp": 0,
                    "def_": 0.8, "def": 0.1,
                    "eleMas": 0, "enerRech_": 0.8, // Ajuster selon besoin

                    // Bonus Élémentaires (Mettre 1 à l'élément du perso, 0 aux autres)
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

                // Sets (Utiliser les noms exacts du mapping SET_NAME_MAPPING ou la clé EN)
                bestSets: ["HuskOfOpulentDreams:4"], // Top Tier
                goodSets: ["RetracingBolide:4", "HuskOfOpulentDreams:2", "ArchaicPetra:2"], // Viables

                // Cible ER recommandée (%)
                er_req: 140,

                // Composition d'équipe (4 Slots)
                team: [
                    // Slot 1 : Généralement un Support clé
                    { role: "Sub-DPS", name: "Albedo", element: "geo" },

                    // Slot 2 : Sub-DPS ou Réaction
                    { role: "Support", name: "Gorou", element: "geo" },

                    // Slot 3 : Flex (Exemple Dual Slot : Kazuha ou Sucrose)
                    { role: "Support", name: "Zhongli", element: "geo" },
                ]
            },
            "Sélénocristallisation": { // Clé unique (ex: 'vape', 'freeze', 'hypercarry')
                name: "Sélénocristallisation",

                // Poids des stats (1 = Prioritaire, 0.5 = Utile, 0 = Inutile)
                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0, "atk": 0, // ATQ% vaut souvent 1, ATQ flat ~0.2
                    "hp_": 0, "hp": 0,
                    "def_": 0.8, "def": 0.1,
                    "eleMas": 0.5, "enerRech_": 0.8, // Ajuster selon besoin

                    // Bonus Élémentaires (Mettre 1 à l'élément du perso, 0 aux autres)
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

                // Sets (Utiliser les noms exacts du mapping SET_NAME_MAPPING ou la clé EN)
                bestSets: ["HuskOfOpulentDreams:4", "NightOfTheSkysUnveiling:4"], // Top Tier
                goodSets: ["RetracingBolide:4", "HuskOfOpulentDreams:2", "ArchaicPetra:2"], // Viables

                // Cible ER recommandée (%)
                er_req: 140,

                // Composition d'équipe (4 Slots)
                team: [
                    // Slot 1 : Généralement un Support clé
                    { role: "Sub-DPS", name: "Columbina", element: "hydro" },

                    // Slot 2 : Sub-DPS ou Réaction
                    { role: "Support", name: "Gorou", element: "geo" },

                    // Slot 3 : Flex (Exemple Dual Slot : Kazuha ou Sucrose)
                    { role: "Sub-DPS", name: "Linnea", element: "geo" },
                ]
            }
        }
    },
    // Gorou

    // 2.4
    "Shenhe": {
        color: "#a1c4ff",
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
            "Support Gel": {
                name: "Support Gel",

                weights: {
                    "critRate_": 0, "critDMG_": 0,
                    "atk_": 1, "atk": 0.8, // 0.8 + 0.1 mais 1 si peu de buff extérieur
                    "hp_": 0, "hp": 0, // 0.9 à 1 + 0.1 mais 0.8 pour Hu Tao par exemple
                    "def_": 0, "def": 0, // 0.8 à 0.9, 0.8 si crit important
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
                goodSets: ["GladiatorsFinale:2", "ShimenawasReminiscence:2", "VermillionHereafter:2", "EchoesOfAnOffering:2", "NighttimeWhispersInTheEchoingWoods:2", "FragmentOfHarmonicWhimsy:2", "UnfinishedReverie:2", "ADayCarvedFromRisingWinds:2"],

                er_req: 180,

                team: [
                    { role: "DPS", name: "SkirkNew", element: "cryo" },
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },
                    { role: "Sub-DPS", name: "Escoffier", element: "cryo" },
                ]
            }
        }
    },
    // Yun Jin

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
            "Suractivation": {
                name: "Suractivation",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1, // 0.8 + 0.1 mais 1 si peu de buff extérieur
                    "hp_": 0, "hp": 0, // 0.9 à 1 + 0.1 mais 0.8 pour Hu Tao par exemple
                    "def_": 0, "def": 0, // 0.8 à 0.9, 0.8 si crit important
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
                goodSets: ["MarechausseeHunter:4", "LongNightsOath:4", "EmblemOfSeveredFate:2", "GoldenTroupe:2", "GildedDreams:2", "TenacityOfTheMillelith:4", "Instructor:4"],

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
    // Kamisato Ayato

    // 2.7
    // Kuki Shinobu
    "Yelan": {
        color: "#4a5be1",
        portraitOffset: -38,

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
                        description: "",
                        active: false,
                        stats: {
                            hp_: 0.06,
                        }
                    },
                    {
                        label: "A1 : Contrôle stratégique (2 types élémentaires différents)",
                        description: "",
                        active: false,
                        stats: {
                            hp_: 0.12,
                        }
                    },
                    {
                        label: "A1 : Contrôle stratégique (3 types élémentaires différents)",
                        description: "",
                        active: false,
                        stats: {
                            hp_: 0.18,
                        }
                    },
                    {
                        label: "A1 : Contrôle stratégique (4 types élémentaires différents)",
                        description: "",
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
                        description: "",
                        stats: {
                            hp_: 0.40
                        }
                    }
                ]
            }
        ],

        builds: {
            "Exubérance": {
                name: "Exubérance",
                description: "",

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
                goodSets: ["EmblemOfSeveredFate:2", "NoblesseOblige:2", "TenacityOfTheMillelith:2"],

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
            "Gel": {
                name: "Gel",
                description: "",

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
                goodSets: ["EmblemOfSeveredFate:2", "NoblesseOblige:2", "TenacityOfTheMillelith:2"],

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
            "Évaporation": {
                name: "Évaporation",
                description: "",

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
                goodSets: ["EmblemOfSeveredFate:2", "NoblesseOblige:2", "TenacityOfTheMillelith:2"],

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
    // Shikanoin Heizou

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
            "Propagation": {
                name: "Propagation",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1, // 0.8 + 0.1 mais 1 si peu de buff extérieur
                    "hp_": 0, "hp": 0, // 0.9 à 1 + 0.1 mais 0.8 pour Hu Tao par exemple
                    "def_": 0, "def": 0, // 0.8 à 0.9, 0.8 si crit important
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
                goodSets: ["DeepwoodMemories:2", "WanderersTroupe:2", "GildedDreams:2"],

                er_req: 130,

                team: [
                    { role: "Sub-DPS", name: "Yae", element: "electro" },
                    { role: "Sub-DPS", name: "Fischl", element: "electro" },
                    { role: "Support", name: "Yaoyao", element: "dendro" },
                ]
            }
        }
    },
    // Collei
    // Dori

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
            "Exubérance": {
                name: "Exubérance",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.4, "atk": 0.1, // 0.8 + 0.1 mais 1 si peu de buff extérieur
                    "hp_": 0, "hp": 0, // 0.9 à 1 + 0.1 mais 0.8 pour Hu Tao par exemple
                    "def_": 0, "def": 0, // 0.8 à 0.9, 0.8 si crit important
                    "eleMas": 1, "enerRech_": .80,

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
                goodSets: ["ThunderingFury:2", "GildedDreams:2", "GladiatorsFinale:4", "WanderersTroupe:2", "FlowerOfParadiseLost:4"],
                er_req: 130,

                team: [
                    { role: "Sub-DPS", name: "Nahida", element: "dendro" },
                    { role: "Sub-DPS", name: "Yelan", element: "hydro" },
                    { role: "Sub-DPS", name: "Shinobu", element: "electro" },
                ]
            },
            "Suractivation": {
                name: "Suractivation",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.4, "atk": 0.1, // 0.8 + 0.1 mais 1 si peu de buff extérieur
                    "hp_": 0, "hp": 0, // 0.9 à 1 + 0.1 mais 0.8 pour Hu Tao par exemple
                    "def_": 0, "def": 0, // 0.8 à 0.9, 0.8 si crit important
                    "eleMas": 1, "enerRech_": .80,

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
                goodSets: ["ThunderingFury:2", "GildedDreams:2", "GladiatorsFinale:4", "WanderersTroupe:2"],
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
        // --- 1. CONFIGURATION GLOBALE ---
        color: "#80B7E2", // Code Hex de l'élément ou de la tenue
        portraitOffset: -36.5, // Décalage vertical de l'image (négatif = monte, positif = descend)

        // Objectifs de Talents (Pour le coaching)
        talents: {
            auto: 1,  // 1 = Inutile, 6 = Utile, 8-10 = Prioritaire
            skill: 8,
            burst: 8
        },

        // --- 2. PASSIFS & CONSTELLATIONS ---
        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A1 : Cour des pétales dansants",
                        active: true, // Coché par défaut ?
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
                        description: "Le Taux CRIT et les DGT CRIT augmentent en fonction des PV max (jusqu'à 50 000 PV).",
                        active: true,
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

        // --- 3. ARCHÉTYPES (BUILDS) ---
        // Tu peux en mettre autant que tu veux. Le premier est celui par défaut.
        builds: {
            "Enabler Fleurissement": { // Clé unique (ex: 'vape', 'freeze', 'hypercarry')
                name: "Enabler Fleurissement",

                // Poids des stats (1 = Prioritaire, 0.5 = Utile, 0 = Inutile)
                weights: {
                    "critRate_": 0, "critDMG_": 0,
                    "atk_": 0, "atk": 0, // ATQ% vaut souvent 1, ATQ flat ~0.2
                    "hp_": 1, "hp": 0.8,
                    "def_": 0, "def": 0,
                    "eleMas": 0.5, "enerRech_": 0.3, // Ajuster selon besoin

                    // Bonus Élémentaires (Mettre 1 à l'élément du perso, 0 aux autres)
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

                // Sets (Utiliser les noms exacts du mapping SET_NAME_MAPPING ou la clé EN)
                bestSets: ["TenacityOfTheMillelith:2", "VourukashasGlow:2"],
                goodSets: ["FlowerOfParadiseLost:4", "GildedDreams:2", "WanderersTroupe:2", "NightOfTheSkysUnveiling:2"],

                // Cible ER recommandée (%)
                er_req: 130,

                // Composition d'équipe (4 Slots)
                team: [
                    // Slot 1 : Généralement un Support clé
                    { role: "Driver", name: "Columbina", element: "hydro" },

                    // Slot 2 : Sub-DPS ou Réaction
                    { role: "Sub-DPS", name: "Lauma", element: "dendro" },

                    // Slot 3 : Flex (Exemple Dual Slot : Kazuha ou Sucrose)
                    { role: "Support", name: "Nahida", element: "dendro" },
                ]
            }
        }
    },
    // Candace

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
            "Propagation": {
                name: "Propagation",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0, "atk": 0, // 0.8 + 0.1 mais 1 si peu de buff extérieur
                    "hp_": 0, "hp": 0, // 0.9 à 1 + 0.1 mais 0.8 pour Hu Tao par exemple
                    "def_": 0, "def": 0, // 0.8 à 0.9, 0.8 si crit important
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
                goodSets: ["TenacityOfTheMillelith:4", "GoldenTroupe:4", "GildedDreams:4", "Instructor:4"],

                er_req: 120,

                team: [
                    { role: "DPS", name: "Alhatham", element: "dendro" },
                    { role: "Sub-DPS", name: "Yae", element: "electro" },
                    { role: "Sub-DPS", name: "Shinobu", element: "electro" },
                ]
            },
            "Exubérance": {
                name: "Exubérance",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0, "atk": 0, // 0.8 + 0.1 mais 1 si peu de buff extérieur
                    "hp_": 0, "hp": 0, // 0.9 à 1 + 0.1 mais 0.8 pour Hu Tao par exemple
                    "def_": 0, "def": 0, // 0.8 à 0.9, 0.8 si crit important
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
                goodSets: ["TenacityOfTheMillelith:4", "GoldenTroupe:4", "GildedDreams:4", "Instructor:4"],

                er_req: 140,

                team: [
                    { role: "Sub-DPS", name: "Yelan", element: "hydro" },
                    { role: "Sub-DPS", name: "Xingqiu", element: "hydro" },
                    { role: "Sub-DPS", name: "Shinobu", element: "electro" },
                ]
            },
            "Fleurissement": {
                name: "Fleurissement",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0, "atk": 0, // 0.8 + 0.1 mais 1 si peu de buff extérieur
                    "hp_": 0, "hp": 0, // 0.9 à 1 + 0.1 mais 0.8 pour Hu Tao par exemple
                    "def_": 0, "def": 0, // 0.8 à 0.9, 0.8 si crit important
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
                goodSets: ["TenacityOfTheMillelith:4", "GoldenTroupe:4", "GildedDreams:4", "Instructor:4"],

                er_req: 120,

                team: [
                    { role: "Support", name: "Nilou", element: "hydro" },
                    { role: "Support", name: "Kokomi", element: "hydro" },
                    { role: "Sub-DPS", name: "Collei", element: "dendro" },
                ]
            }
        }
    },
    // Layla

    // 3.3
    "Nomade": {
        // --- 1. CONFIGURATION GLOBALE ---
        color: "#1d40ee", // Code Hex de l'élément ou de la tenue
        portraitOffset: -36, // Décalage vertical de l'image (négatif = monte, positif = descend)

        // Objectifs de Talents (Pour le coaching)
        talents: {
            auto: 10,  // 1 = Inutile, 6 = Utile, 8-10 = Prioritaire
            skill: 9,
            burst: 8
        },

        // --- 2. PASSIFS & CONSTELLATIONS ---
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
                        active: true,
                        stats: {
                            critRate_: 0.20
                        }
                    }
                ]
            },
        ],

        // --- 3. ARCHÉTYPES (BUILDS) ---
        // Tu peux en mettre autant que tu veux. Le premier est celui par défaut.
        builds: {
            "DPS Dispersion": { // Clé unique (ex: 'vape', 'freeze', 'hypercarry')
                name: "DPS Dispersion",

                // Poids des stats (1 = Prioritaire, 0.5 = Utile, 0 = Inutile)
                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1, // ATQ% vaut souvent 1, ATQ flat ~0.2
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.3, // Ajuster selon besoin

                    // Bonus Élémentaires (Mettre 1 à l'élément du perso, 0 aux autres)
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

                // Sets (Utiliser les noms exacts du mapping SET_NAME_MAPPING ou la clé EN)
                bestSets: ["DesertPavilionChronicle:4"], // Top Tier
                goodSets: ["ShimenawasReminiscence:4", "MarechausseeHunter:4"], // Viables

                // Cible ER recommandée (%)
                er_req: 120,

                // Composition d'équipe (4 Slots)
                team: [
                    // Slot 1 : Généralement un Support clé
                    { role: "Support", name: "Faruzan", element: "anemo" },

                    // Slot 2 : Sub-DPS ou Réaction
                    {
                        role: "Flex",
                        name: ["", ""], // Noms (Optionnel)
                        element: ["pyro", "hydro"]  // Éléments pour la couleur de fond
                    },
                    // Slot 3 : Flex (Exemple Dual Slot : Kazuha ou Sucrose)
                    {
                        role: "Flex",
                        name: ["", ""], // Noms (Optionnel)
                        element: ["cryo", "electro"]  // Éléments pour la couleur de fond
                    }
                ]
            }
        }
    },
    // Faruzan

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
                        stats: {
                            critRate_: 0.10,
                            critDMG_: 0.70
                        }
                    }
                ]
            }

        ],

        builds: {
            "Exubérance": {
                name: "Exubérance",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.4, "atk": 0.1, // 0.8 + 0.1 mais 1 si peu de buff extérieur
                    "hp_": 0, "hp": 0, // 0.9 à 1 + 0.1 mais 0.8 pour Hu Tao par exemple
                    "def_": 0, "def": 0, // 0.8 à 0.9, 0.8 si crit important
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
                goodSets: ["GildedDreams:2", "DeepwoodMemories:2", "GoldenTroupe:2", "GladiatorsFinale:2", "GoldenTroupe:4", "MarechausseeHunter:4", "DeepwoodMemories:4"],

                er_req: 130,

                team: [
                    { role: "Support", name: "Nahida", element: "dendro" },
                    { role: "Sub-DPS", name: "Shinobu", element: "electro" },
                    { role: "Flex", name: ["Yelan", "Xingqiu"], element: ["hydro", "hydro"] }
                ]
            },
            "Propagation": {
                name: "Propagation",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.4, "atk": 0.1, // 0.8 + 0.1 mais 1 si peu de buff extérieur
                    "hp_": 0, "hp": 0, // 0.9 à 1 + 0.1 mais 0.8 pour Hu Tao par exemple
                    "def_": 0, "def": 0, // 0.8 à 0.9, 0.8 si crit important
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
                goodSets: ["GildedDreams:2", "DeepwoodMemories:2", "GoldenTroupe:2", "GladiatorsFinale:2", "GoldenTroupe:4", "MarechausseeHunter:4", "DeepwoodMemories:4"],

                er_req: 130,

                team: [
                    { role: "Support", name: "Nahida", element: "dendro" },
                    { role: "Sub-DPS", name: "Yae", element: "electro" },
                    { role: "Support", name: "Zhongli", element: "geo" },
                ]
            },
            "Fleurissement": {
                name: "Fleurissement",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.4, "atk": 0.1, // 0.8 + 0.1 mais 1 si peu de buff extérieur
                    "hp_": 0, "hp": 0, // 0.9 à 1 + 0.1 mais 0.8 pour Hu Tao par exemple
                    "def_": 0, "def": 0, // 0.8 à 0.9, 0.8 si crit important
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
                goodSets: ["GildedDreams:2", "DeepwoodMemories:2", "GoldenTroupe:2", "GladiatorsFinale:2", "GoldenTroupe:4", "MarechausseeHunter:4", "DeepwoodMemories:4"],

                er_req: 130,

                team: [
                    { role: "Support", name: "Nilou", element: "hydro" },
                    { role: "Sub-DPS", name: "Xingqiu", element: "hydro" },
                    { role: "Support", name: "Baizhuer", element: "dendro" },
                ]
            }
        }
    },
    // Yaoyao

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
                    "atk_": 0, "atk": 0, // 0.8 + 0.1 mais 1 si peu de buff extérieur
                    "hp_": 1, "hp": 0.1, // 0.9 à 1 + 0.1 mais 0.8 pour Hu Tao par exemple
                    "def_": 0, "def": 0, // 0.8 à 0.9, 0.8 si crit important
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
                goodSets: ["SilkenMoonsSerenade:4", "DeepwoodMemories:4"],

                er_req: 100,

                team: [
                    { role: "DPS", name: "Mualani", element: "hydro" },
                    { role: "Sub-DPS", name: "Émilie", element: "dendro" },
                    { role: "Flex", name: ["Nahida", "Xilonen"], element: ["dendro", "geo"] }
                ]
            },
            "DPS": {
                name: "DPS",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1, // 0.8 + 0.1 mais 1 si peu de buff extérieur
                    "hp_": 0.1, "hp": 0, // 0.9 à 1 + 0.1 mais 0.8 pour Hu Tao par exemple
                    "def_": 0, "def": 0, // 0.8 à 0.9, 0.8 si crit important
                    "eleMas": 0.4, "enerRech_": 0.8,

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
                goodSets: ["NightOfTheSkysUnveiling:4", "UnfinishedReverie:4", "LongNightsOath:4"],

                er_req: 180,

                team: [
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },
                    { role: "Support", name: "Bennett", element: "pyro" },
                    { role: "Flex", name: ["Kazuha", "Xilonen"], element: ["anemo", "geo"] }
                ]
            }
        }
    },
    // Mika

    // 3.6
    // Baizhu
    // Kaveh

    // 3.7
    // Kirara

    // 4.0
    // Lyney
    // Lynette
    // Freminet

    // 4.1
    // Wriothesley
    "Neuvillette": {
        color: "#374eb4",
        portraitOffset: -38,
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
                        description: "",
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
                        description: "",
                        stats: {
                            critDMG_: 0.42
                        }
                    }
                ]
            }
        ],

        builds: {
            "Hypercarry": {
                name: "Hypercarry",
                description: "",

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
                goodSets: ["WanderersTroupe:4", "HeartOfDepth:4"],

                er_req: 130,

                team: [
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },
                    { role: "Support", name: ["Kazuha", "Lanyan"], element: ["anemo", "anemo"] },
                    { role: "Support", name: "Xilonen", element: "geo"
                    }
                ]
            },
            "Gel": {
                name: "Gel",
                description: "",

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
                goodSets: ["WanderersTroupe:4", "HeartOfDepth:4"],

                er_req: 130,

                team: [
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },
                    { role: "Sub-DPS", name: "Escoffier", element: "cryo" },
                    { role: "Support", name: "Citlali", element: "cryo"}
                ]
            },
            "Hyperbloom": {
                name: "Hyperbloom",
                description: "",

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
                goodSets: ["WanderersTroupe:4", "HeartOfDepth:4"],

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
                        description: "",
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
                description: "",

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
                goodSets: ["OceanHuedClam:4", "NoblesseOblige:4"],

                er_req: 180,

                team: [
                    { role: "DPS", name: "Neuvillette", element: "hydro" },
                    { role: "Support", name: "Xilonen", element: "geo" },
                    { role: "Support", name: "Kazuha", element: "anemo" }
                ]
            }
        }
    },
    // Charlotte

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
                        description: "",
                        active: false,
                        stats: {
                            atk_: 0.20,
                        }
                    },
                    {
                        label: "A4 : Réseau d'assistance mutuelle (2 alliés Pyro/Hydro/Cryo/Électro)",
                        description: "",
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
                        description: "",
                        stats: {
                            critRate_: 0.36
                        }
                    },
                    {
                        label: "C6 : Finesse flexible de la présidente de la Spina (pour la compétence)",
                        cons: 6,
                        description: "",
                        stats: {
                            critDMG_: 1.35
                        }
                    }
                ]
            }
        ],

        builds: {
            "Hypercarry cristallisation": {
                name: "Hypercarry cristallisation",
                description: "",

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
                goodSets: ["ArchaicPetra:2", "GladiatorsFinale:2", "GoldenTroupe:2"],

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
            "Sélénocristallisation": {
                name: "Sélénocristallisation",
                description: "",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.5, "enerRech_": 0.3,

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
                goodSets: ["ArchaicPetra:2", "GladiatorsFinale:2", "GoldenTroupe:2"],

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
    // Chevreuse

    // 4.4
    // Xianyun
    // Gaming

    // 4.5
    "Chiori": {
        color: "#D44B10", // Code Hex de l'élément ou de la tenue
        portraitOffset: -37, // Décalage vertical de l'image (négatif = monte, positif = descend)

        // Objectifs de Talents (Pour le coaching)
        talents: {
            auto: 1,  // 1 = Inutile, 6 = Utile, 8-10 = Prioritaire
            skill: 10,
            burst: 8
        },

        // --- 2. PASSIFS & CONSTELLATIONS ---
        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A4 : Retouche finale",
                        active: true, // Coché par défaut ?
                        stats: {
                            geo_dmg_: 0.20,
                        }
                    }
                ]
            },
        ],

        // --- 3. ARCHÉTYPES (BUILDS) ---
        // Tu peux en mettre autant que tu veux. Le premier est celui par défaut.
        builds: {
            "Chiori": { // Clé unique (ex: 'vape', 'freeze', 'hypercarry')
                name: "Chiori",

                // Poids des stats (1 = Prioritaire, 0.5 = Utile, 0 = Inutile)
                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.1, "atk": 0, // ATQ% vaut souvent 1, ATQ flat ~0.2
                    "hp_": 0, "hp": 0,
                    "def_": 0.8, "def": 0.1,
                    "eleMas": 0, "enerRech_": 0.6, // Ajuster selon besoin

                    // Bonus Élémentaires (Mettre 1 à l'élément du perso, 0 aux autres)
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

                // Sets (Utiliser les noms exacts du mapping SET_NAME_MAPPING ou la clé EN)
                bestSets: ["GoldenTroupe:4", "HuskOfOpulentDreams:4"], // Top Tier
                goodSets: ["GoldenTroupe:2", "HuskOfOpulentDreams:2"], // Viables

                // Cible ER recommandée (%)
                er_req: 160,

                // Composition d'équipe (4 Slots)
                team: [
                    // Slot 1 : Généralement un Support clé
                    { role: "DPS", name: "Itto", element: "geo" },

                    // Slot 2 : Sub-DPS ou Réaction
                    { role: "Support", name: "Gorou", element: "geo" },

                    // Slot 3 : Flex (Exemple Dual Slot : Kazuha ou Sucrose)
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
                        description: "Accorde un Bonus de DGT Pyro de 40%.",
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
                        description: "Augmente la valeur du Masque de 100%. (Simulation : Ajout d'un équivalent DGT bonus approximatif pour le scoring).",
                        stats: {
                        }
                    },
                    {
                        label: "C2 : Ordre Royal",
                        cons: 2,
                        description: "Accorde 20% de RES Pyro/Hydro/etc.",
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
                goodSets: ["EchoesOfAnOffering:4", "CrimsonWitchOfFlames:2", "GladiatorsFinale:2", "CrimsonWitchOfFlames:4"],

                er_req: 100,

                team: [
                    { role: "Support", name: "Citlali", element: "cryo" },
                    { role: "Support", name: "Xilonen", element: "geo" },
                    { role: "Support", name: "Bennett", element: "pyro" },
                ]
            },

            "overload": {
                name: "Surcharge (Chevreuse)",
                description: "Team limitant aux éléments Pyro et Électro pour activer le passif de Chevreuse.",
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
                goodSets: ["EchoesOfAnOffering:4", "CrimsonWitchOfFlames:2", "GladiatorsFinale:2", "CrimsonWitchOfFlames:4"],

                er_req: 100,

                team: [
                    { role: "Support", name: "Chevreuse", element: "pyro" },
                    { role: "Sub-DPS", element: "electro" },
                    { role: "Flex", element: "electro" }
                ]
            },

            "mono_pyro": {
                name: "Mono Pyro",
                description: "Force brute Pyro pure sans réaction.",

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
                goodSets: ["EchoesOfAnOffering:4", "CrimsonWitchOfFlames:2", "GladiatorsFinale:2", "CrimsonWitchOfFlames:4"],

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
        color: "#3939f6", // Code Hex de l'élément ou de la tenue
        portraitOffset: -35, // Décalage vertical de l'image (négatif = monte, positif = descend)

        // Objectifs de Talents (Pour le coaching)
        talents: {
            auto: 1,  // 1 = Inutile, 6 = Utile, 8-10 = Prioritaire
            skill: 10,
            burst: 8
        },

        // --- 2. PASSIFS & CONSTELLATIONS ---
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
                        stats: { critRate_: 0.10 } // On remet 0.10 car le mode cumulatif additionne les deux !
                    }
                ]
            },
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C6 : « Ainsi, je ne désespérerai jamais plus »",
                        cons: 6, // IMPORTANT : Niveau requis (1 à 6)
                        stats: {
                            critRate_: 0.10,
                            critDMG_: 0.70
                        }
                    }
                ]
            }
        ],

        // --- 3. ARCHÉTYPES (BUILDS) ---
        // Tu peux en mettre autant que tu veux. Le premier est celui par défaut.
        builds: {
            "DPS Surcharge": { // Clé unique (ex: 'vape', 'freeze', 'hypercarry')
                name: "DPS Surcharge",

                // Poids des stats (1 = Prioritaire, 0.5 = Utile, 0 = Inutile)
                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1, // ATQ% vaut souvent 1, ATQ flat ~0.2
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.5, // Ajuster selon besoin

                    // Bonus Élémentaires (Mettre 1 à l'élément du perso, 0 aux autres)
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

                // Sets (Utiliser les noms exacts du mapping SET_NAME_MAPPING ou la clé EN)
                bestSets: ["FragmentOfHarmonicWhimsy:4"], // Top Tier
                goodSets: ["ThunderingFury:4", "GladiatorsFinale:4"], // Viables

                // Cible ER recommandée (%)
                er_req: 130,

                // Composition d'équipe (4 Slots)
                team: [
                    // Slot 1 : Généralement un Support clé
                    { role: "Sub-DPS", name: "Durin", element: "pyro" },

                    // Slot 2 : Sub-DPS ou Réaction
                    { role: "Support", name: "Chevreuse", element: "pyro" },

                    // Slot 3 : Flex (Exemple Dual Slot : Kazuha ou Sucrose)
                    { role: "Sub-DPS", name: "Fischl", element: "electro" },
                ]
            },
            "DPS Stimulation": { // Clé unique (ex: 'vape', 'freeze', 'hypercarry')
                name: "DPS Stimulation",

                // Poids des stats (1 = Prioritaire, 0.5 = Utile, 0 = Inutile)
                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.6, "atk": 0.06, // ATQ% vaut souvent 1, ATQ flat ~0.2
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.8, "enerRech_": 0.5, // Ajuster selon besoin

                    // Bonus Élémentaires (Mettre 1 à l'élément du perso, 0 aux autres)
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

                // Sets (Utiliser les noms exacts du mapping SET_NAME_MAPPING ou la clé EN)
                bestSets: ["FragmentOfHarmonicWhimsy:4"], // Top Tier
                goodSets: ["ThunderingFury:4", "GladiatorsFinale:4"], // Viables

                // Cible ER recommandée (%)
                er_req: 130,

                // Composition d'équipe (4 Slots)
                team: [
                    // Slot 1 : Généralement un Support clé
                    { role: "Support", name: "Nahida", element: "dendro" },

                    // Slot 2 : Sub-DPS ou Réaction
                    { role: "Support", name: "Lauma", element: "dendro" },

                    // Slot 3 : Flex (Exemple Dual Slot : Kazuha ou Sucrose)
                    { role: "Sub-DPS", name: "Fischl", element: "electro" },
                ]
            },
            "DPS Sélénocution": { // Clé unique (ex: 'vape', 'freeze', 'hypercarry')
                name: "DPS Sélénocution",

                // Poids des stats (1 = Prioritaire, 0.5 = Utile, 0 = Inutile)
                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1, // ATQ% vaut souvent 1, ATQ flat ~0.2
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.5, "enerRech_": 0.5, // Ajuster selon besoin

                    // Bonus Élémentaires (Mettre 1 à l'élément du perso, 0 aux autres)
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

                // Sets (Utiliser les noms exacts du mapping SET_NAME_MAPPING ou la clé EN)
                bestSets: ["FragmentOfHarmonicWhimsy:4", "NightOfTheSkysUnveiling:4"], // Top Tier
                goodSets: ["ThunderingFury:4", "GladiatorsFinale:4"], // Viables

                // Cible ER recommandée (%)
                er_req: 130,

                // Composition d'équipe (4 Slots)
                team: [
                    // Slot 1 : Généralement un Support clé
                    { role: "Sub-DPS", name: "Ineffa", element: "electro" },

                    // Slot 2 : Sub-DPS ou Réaction
                    { role: "Sub-DPS", name: "Columbina", element: "hydro" },

                    // Slot 3 : Flex (Exemple Dual Slot : Kazuha ou Sucrose)
                    { role: "Support", name: "Sucrose", element: "anemo" },
                ]
            }
        }
    },
    // Sigewinne
    // Sethos

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
                    "atk_": 0.8, "atk": 0.1, // 0.8 + 0.1 mais 1 si peu de buff extérieur
                    "hp_": 0, "hp": 0, // 0.9 à 1 + 0.1 mais 0.8 pour Hu Tao par exemple
                    "def_": 0, "def": 0, // 0.8 à 0.9, 0.8 si crit important
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
                goodSets: ["DeepwoodMemories:2", "GladiatorsFinale:2", "GoldenTroupe:2", "GoldenTroupe:4"],

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
            "DPS Natlan": {
                name: "DPS Natlan",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0, "atk": 0, // 0.8 + 0.1 mais 1 si peu de buff extérieur
                    "hp_": 1, "hp": 0.1, // 0.9 à 1 + 0.1 mais 0.8 pour Hu Tao par exemple
                    "def_": 0, "def": 0, // 0.8 à 0.9, 0.8 si crit important
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
                goodSets: ["UnfinishedReverie:4", "HeartOfDepth:4", "HeartOfDepth:2", "WanderersTroupe:2", "VourukashasGlow:2", "NymphsDream:2"],

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
                    "atk_": 0, "atk": 0, // 0.8 + 0.1 mais 1 si peu de buff extérieur
                    "hp_": 1, "hp": 0.1, // 0.9 à 1 + 0.1 mais 0.8 pour Hu Tao par exemple
                    "def_": 0, "def": 0, // 0.8 à 0.9, 0.8 si crit important
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
                goodSets: ["UnfinishedReverie:4", "HeartOfDepth:4", "HeartOfDepth:2", "WanderersTroupe:2", "VourukashasGlow:2", "NymphsDream:2"],

                er_req: 100,

                team: [
                    { role: "Sub-DPS", name: "Mavuika", element: "pyro" },
                    { role: "Support", name: "Mona", element: "hydro" },
                    { role: "Support", name: "Sucrose", element: "anemo" }
                ]
            }
        }
    },
    // Kinich
    // Kachina

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
                        description: "",
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
                description: "",

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
                goodSets: ["HuskOfOpulentDreams:2", "EmblemOfSeveredFate:2"],

                er_req: 200,

                team: [
                    { role: "DPS", name: "Mavuika", element: "pyro" },
                    { role: "Support", name: "Citlali", element: "cryo" },
                    { role: "support", name: "Bennett",element: "pyro" }
                ]
            },
            "DPS": {
                name: "DPS",
                description: "",

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
                goodSets: ["HuskOfOpulentDreams:2", "EmblemOfSeveredFate:2"],

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
        // --- 1. CONFIGURATION GLOBALE ---
        color: "#3EABE0", // Code Hex de l'élément ou de la tenue
        portraitOffset: -39, // Décalage vertical de l'image (négatif = monte, positif = descend)

        // Objectifs de Talents (Pour le coaching)
        talents: {
            auto: 1,  // 1 = Inutile, 6 = Utile, 8-10 = Prioritaire
            skill: 10,
            burst: 8
        },

        // --- 3. ARCHÉTYPES (BUILDS) ---
        // Tu peux en mettre autant que tu veux. Le premier est celui par défaut.
        builds: {
            "DPS Dispersion": { // Clé unique (ex: 'vape', 'freeze', 'hypercarry')
                name: "DPS Dispersion",

                // Poids des stats (1 = Prioritaire, 0.5 = Utile, 0 = Inutile)
                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1, // ATQ% vaut souvent 1, ATQ flat ~0.2
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.3, "enerRech_": 0.1, // Ajuster selon besoin

                    // Bonus Élémentaires (Mettre 1 à l'élément du perso, 0 aux autres)
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

                // Sets (Utiliser les noms exacts du mapping SET_NAME_MAPPING ou la clé EN)
                bestSets: ["ObsidianCodex:4"], // Top Tier
                goodSets: ["ViridescentVenerer:4", "ShimenawasReminiscence:4"], // Viables

                // Cible ER recommandée (%)
                er_req: 110,

                // Composition d'équipe (4 Slots)
                team: [
                    // Slot 1 : Généralement un Support clé
                    { role: "Support", name: "Citlali", element: "cryo" },

                    // Slot 2 : Sub-DPS ou Réaction
                    { role: "Support", name: "Iansan", element: "electro" },

                    // Slot 3 : Flex (Exemple Dual Slot : Kazuha ou Sucrose)
                    { role: "Support", name: "Bennett", element: "pyro" },
                ]
            }
        }
    },
    // Ororon

    // 5.3
    "Mavuika": {
        // --- 1. CONFIGURATION GLOBALE ---
        color : "#C74644",
        portraitOffset: -35,
        // Objectifs de Talents (Pour le coaching)
        talents: {
            auto: 1,  // 1 = Inutile, 6 = Utile, 8-10 = Prioritaire
            skill: 8,
            burst: 10
        },

        // --- 2. PASSIFS & CONSTELLATIONS ---
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

        // --- 3. ARCHÉTYPES (BUILDS) ---
        // Tu peux en mettre autant que tu veux. Le premier est celui par défaut.
        builds: {
            "Fonte": { // Clé unique (ex: 'vape', 'freeze', 'hypercarry')
                name: "Fonte",

                // Poids des stats (1 = Prioritaire, 0.5 = Utile, 0 = Inutile)
                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1, // ATQ% vaut souvent 1, ATQ flat ~0.2
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.6, "enerRech_": 0, // Ajuster selon besoin

                    // Bonus Élémentaires (Mettre 1 à l'élément du perso, 0 aux autres)
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

                // Sets (Utiliser les noms exacts du mapping SET_NAME_MAPPING ou la clé EN)
                bestSets: ["ObsidianCodex:4", "CrimsonWitchOfFlames:4"],
                goodSets: ["ObsidianCodex:2", "CrimsonWitchOfFlames:2", "GildedDreams:4"],

                // Cible ER recommandée (%)
                er_req: 100,

                // Composition d'équipe (4 Slots)
                team: [
                    // Slot 1 : Généralement un Support clé
                    { role: "Support", name: "Citlali", element: "cryo" },

                    // Slot 2 : Sub-DPS ou Réaction
                    { role: "Support", name: "Xilonen", element: "geo" },

                    // Slot 3 : Flex (Exemple Dual Slot : Kazuha ou Sucrose)
                    { role: "Support", name: "Bennett", element: "pyro" },
                ]
            },
            "Surcharge": { // Clé unique (ex: 'vape', 'freeze', 'hypercarry')
                name: "Surcharge",

                // Poids des stats (1 = Prioritaire, 0.5 = Utile, 0 = Inutile)
                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1, // ATQ% vaut souvent 1, ATQ flat ~0.2
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0, // Ajuster selon besoin

                    // Bonus Élémentaires (Mettre 1 à l'élément du perso, 0 aux autres)
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

                // Sets (Utiliser les noms exacts du mapping SET_NAME_MAPPING ou la clé EN)
                bestSets: ["ObsidianCodex:4", "CrimsonWitchOfFlames:4"],
                goodSets: ["ObsidianCodex:2", "CrimsonWitchOfFlames:2", "GildedDreams:4"],

                // Cible ER recommandée (%)
                er_req: 100,

                // Composition d'équipe (4 Slots)
                team: [
                    // Slot 1 : Généralement un Support clé
                    { role: "DPS", name: "Varesa", element: "electro" },

                    // Slot 2 : Sub-DPS ou Réaction
                    { role: "Support", name: "Chevreuse", element: "pyro" },

                    // Slot 3 : Flex (Exemple Dual Slot : Kazuha ou Sucrose)
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
                        description: "",
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
                description: "",

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
                goodSets: ["TenacityOfTheMillelith:4", "GildedDreams:4"],

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
    // Lan Yan

    // 5.4
    "Yumemizuki Mizuki": {
        // --- 1. CONFIGURATION GLOBALE ---
        color: "#e38ff1", // Code Hex de l'élément ou de la tenue
        portraitOffset: -36, // Décalage vertical de l'image (négatif = monte, positif = descend)

        // Objectifs de Talents (Pour le coaching)
        talents: {
            auto: 1,  // 1 = Inutile, 6 = Utile, 8-10 = Prioritaire
            skill: 8,
            burst: 6
        },

        // --- 2. PASSIFS & CONSTELLATIONS ---
        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A2 : Pensées de jour, rêveries de nuit",
                        active: true, // Coché par défaut ?
                        stats: {
                            eleMas: 100,
                        }
                    }
                ]
            }
        ],

        // --- 3. ARCHÉTYPES (BUILDS) ---
        // Tu peux en mettre autant que tu veux. Le premier est celui par défaut.
        builds: {
            "Driver Dispersion": { // Clé unique (ex: 'vape', 'freeze', 'hypercarry')
                name: "Driver Dispersion",

                // Poids des stats (1 = Prioritaire, 0.5 = Utile, 0 = Inutile)
                weights: {
                    "critRate_": 0, "critDMG_": 0,
                    "atk_": 0, "atk": 0, // ATQ% vaut souvent 1, ATQ flat ~0.2
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 1, "enerRech_": 1, // Ajuster selon besoin

                    // Bonus Élémentaires (Mettre 1 à l'élément du perso, 0 aux autres)
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

                // Sets (Utiliser les noms exacts du mapping SET_NAME_MAPPING ou la clé EN)
                bestSets: ["ViridescentVenerer:4"], // Top Tier
                goodSets: ["WanderersTroupe:2", "GildedDreams:2", "NoblesseOblige:4", "Instructor:4"], // Viables

                // Cible ER recommandée (%)
                er_req: 200,

                // Composition d'équipe (4 Slots)
                team: [
                    // Slot 1 : Généralement un Support clé
                    { role: "Sub-DPS", name: "Furina", element: "hydro" },

                    // Slot 2 : Sub-DPS ou Réaction
                    { role: "Sub-DPS", name: "Ororon", element: "electro" },

                    // Slot 3 : Flex (Exemple Dual Slot : Kazuha ou Sucrose)
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
                        description: "",
                        stats: {
                            critRate_: 0.10,
                            critDMG_: 1,
                        }
                    }
                ]
            }
        ],
        builds: {
            "Surcharge": {
                name: "Surcharge",
                description: "",
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
                goodSets: ["ThunderingFury:4"],

                er_req: 120,

                team: [
                    { role: "Flex", name: ["Mavuika", "Durin"], element: "pyro" },

                    { role: "Support", name: "Chevreuse", element: "pyro" },

                    // Slot 3 : Flex (Exemple Dual Slot : Kazuha ou Sucrose)
                    {
                        role: "Support",
                        name: "Iansan", // Noms (Optionnel)
                        element: "electro" // Éléments pour la couleur de fond
                    }
                ]
            },
            "Hypercarry": {
                name: "Hypercarry",
                description: "",
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
                goodSets: ["MarechausseeHunter:4", "ThunderingFury:4"],

                er_req: 120,

                team: [
                    { role: "Support", name: "Furina", element: "hydro" },

                    // Slot 2 : Sub-DPS ou Réaction
                    { role: "Support", name: "Liuyun", element: "anemo" },

                    // Slot 3 : Flex (Exemple Dual Slot : Kazuha ou Sucrose)
                    {
                        role: "Support",
                        name: "Iansan", // Noms (Optionnel)
                        element: "electro" // Éléments pour la couleur de fond
                    }
                ]
            },
            "Suractivation": {
                name: "Suractivation",
                description: "",
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
                goodSets: ["ThunderingFury:4"],

                er_req: 120,

                team: [
                    { role: "Sub-DPS", name: "Lauma", element: "dendro" },

                    // Slot 2 : Sub-DPS ou Réaction
                    { role: "Flex", name: ["Fischl", "Iansan"], element: "electro" },

                    // Slot 3 : Flex (Exemple Dual Slot : Kazuha ou Sucrose)
                    {
                        role: "Support",
                        name: ["Ineffa", "Nahida"], // Noms (Optionnel)
                        element: ["electro", "dendro"] // Éléments pour la couleur de fond
                    }
                ]
            },
            "Sélénocution": {
                name: "Sélénocution",
                description: "",
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
                goodSets: ["ThunderingFury:4"],

                er_req: 130,

                team: [
                    { role: "Support", name: "Columbina", element: "hydro" },

                    // Slot 2 : Sub-DPS ou Réaction
                    { role: "Sub-DPS", name: "Ineffa", element: "electro" },

                    // Slot 3 : Flex (Exemple Dual Slot : Kazuha ou Sucrose)
                    {
                        role: "Support",
                        name: "Liuyun", // Noms (Optionnel)
                        element: "anemo" // Éléments pour la couleur de fond
                    }
                ]
            }

        }
    },
    // Iansan

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
                        description: "",
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
                description: "",

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
                goodSets: ["BlizzardStrayer:4", "NoblesseOblige:4"],

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
    // Ifa

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
                        description: "",
                        stats: {
                            atk_: 0.70
                        }
                    },
                    {
                        label: "C4 : Flux scindé",
                        cons: 4,
                        description: "",
                        stats: {
                            atk_: 0.40
                        }
                    }
                ]
            }
        ],
        builds: {
            "freeze": {
                name: "Gel hypercarry",
                description: "",
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
                goodSets: ["GladiatorsFinale:4", "BlizzardStrayer:4", "GladiatorsFinale:2", "BlizzardStrayer:2"],
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
    // Dahlia

    // 5.8
    "Ineffa": {
        // --- 1. CONFIGURATION GLOBALE ---
        color: "#4fbfff", // Code Hex de l'élément ou de la tenue
        portraitOffset: -37, // Décalage vertical de l'image (négatif = monte, positif = descend)

        // Objectifs de Talents (Pour le coaching)
        talents: {
            auto: 1,  // 1 = Inutile, 6 = Utile, 8-10 = Prioritaire
            skill: 10,
            burst: 8
        },

        // --- 2. PASSIFS & CONSTELLATIONS ---
        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A4 : Protocole de permutation panoramique\n",
                        active: true, // Coché par défaut ?
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

        // --- 3. ARCHÉTYPES (BUILDS) ---
        // Tu peux en mettre autant que tu veux. Le premier est celui par défaut.
        builds: {
            "Sub-DPS Sélénocution": { // Clé unique (ex: 'vape', 'freeze', 'hypercarry')
                name: "Sub-DPS Sélénocution",

                // Poids des stats (1 = Prioritaire, 0.5 = Utile, 0 = Inutile)
                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1, // ATQ% vaut souvent 1, ATQ flat ~0.2
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.4, "enerRech_": 0.6, // Ajuster selon besoin

                    // Bonus Élémentaires (Mettre 1 à l'élément du perso, 0 aux autres)
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

                // Sets (Utiliser les noms exacts du mapping SET_NAME_MAPPING ou la clé EN)
                bestSets: ["AubadeOfMorningstarAndMoon:4", "SilkenMoonsSerenade:4"], // Top Tier
                goodSets: ["GildedDreams:4"], // Viables

                // Cible ER recommandée (%)
                er_req: 160,

                // Composition d'équipe (4 Slots)
                team: [
                    // Slot 1 : Généralement un Support clé
                    { role: "DPS", name: "Flins", element: "electro" },

                    // Slot 2 : Sub-DPS ou Réaction
                    { role: "Sub-DPS", name: "Columbina", element: "hydro" },

                    // Slot 3 : Flex (Exemple Dual Slot : Kazuha ou Sucrose)
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
                description: "",
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
                goodSets: ["NightOfTheSkysUnveiling:4", "NightOfTheSkysUnveiling:2", "SilkenMoonsSerenade:2", "Instructor:4"],

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
                description: "",
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
                goodSets: ["NightOfTheSkysUnveiling:4", "NightOfTheSkysUnveiling:2", "SilkenMoonsSerenade:2", "Instructor:4"],

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
                description: "",
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
                goodSets: ["NightOfTheSkysUnveiling:4", "NightOfTheSkysUnveiling:2", "SilkenMoonsSerenade:2", "Instructor:4"],

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
        // --- 1. CONFIGURATION GLOBALE ---
        color: "#6163E8", // Code Hex de l'élément ou de la tenue
        portraitOffset: -35, // Décalage vertical de l'image (négatif = monte, positif = descend)

        // Objectifs de Talents (Pour le coaching)
        talents: {
            auto: 1,  // 1 = Inutile, 6 = Utile, 8-10 = Prioritaire
            skill: 8,
            burst: 10
        },

        // --- 2. PASSIFS & CONSTELLATIONS ---
        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A4 : Murmure de flamme",
                        active: true,
                        maxCons: 3, // NOUVEAUTÉ : Ce buff disparaît si le perso est C4 ou plus !
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
                        cons: 4, // N'apparaît que si le perso est C4+
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

        // --- 3. ARCHÉTYPES (BUILDS) ---
        // Tu peux en mettre autant que tu veux. Le premier est celui par défaut.
        builds: {
            "DPS Sélénocution": { // Clé unique (ex: 'vape', 'freeze', 'hypercarry')
                name: "DPS Sélénocution",

                // Poids des stats (1 = Prioritaire, 0.5 = Utile, 0 = Inutile)
                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1, // ATQ% vaut souvent 1, ATQ flat ~0.2
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.4, "enerRech_": 0.6, // Ajuster selon besoin

                    // Bonus Élémentaires (Mettre 1 à l'élément du perso, 0 aux autres)
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

                // Sets (Utiliser les noms exacts du mapping SET_NAME_MAPPING ou la clé EN)
                bestSets: ["NightOfTheSkysUnveiling:4"], // Top Tier
                goodSets: ["GildedDreams:4", "NightOfTheSkysUnveiling:2", "GladiatorsFinale:2"], // Viables

                // Cible ER recommandée (%)
                er_req: 130,

                // Composition d'équipe (4 Slots)
                team: [
                    // Slot 1 : Généralement un Support clé
                    { role: "Sub-DPS", name: "Ineffa", element: "electro" },

                    // Slot 2 : Sub-DPS ou Réaction
                    { role: "Support", name: "Columbina", element: "hydro" },

                    // Slot 3 : Flex (Exemple Dual Slot : Kazuha ou Sucrose)
                    { role: "Support", name: "Sucrose", element: "anemo" },
                ]
            }
        }
    },
    // Aino

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
                        description: "",
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
                        description: "",
                        stats: {
                            eleMas: 200
                        }
                    }
                ]
            }
        ],

        builds: {
            "Sélénofleurissement": {
                name: "Sélénofleurissement",
                description: "",

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
                goodSets: ["DeepwoodMemories:4", "GildedDreams:4", "Instructor:4"],

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
                        description: "",
                        stats: {
                            pyro_dmg_: 0.50
                        }
                    }
                ]
            }
        ],

        builds: {
            "Surcharge": {
                name: "Surcharge",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1, // 0.8 + 0.1 mais 1 si peu de buff extérieur
                    "hp_": 0, "hp": 0, // 0.9 à 1 + 0.1 mais 0.8 pour Hu Tao par exemple
                    "def_": 0, "def": 0, // 0.8 à 0.9, 0.8 si crit important
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
                goodSets: ["NoblesseOblige:4", "NoblesseOblige:2", "EmblemOfSeveredFate:4", "EmblemOfSeveredFate:2", "GladiatorsFinale:2", "Instructor:4"],

                er_req: 130,
                team: [
                    { role: "DPS", name: ["Arlecchino", "Varesa"], element: ["pyro", "electro"] },
                    { role: "Sub-DPS", name: "Fischl", element: "electro"},
                    { role: "Support", name: "Chevreuse", element: "pyro"}
                ]
            },
            "Brûlure": {
                name: "Brûlure",
                description: "",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1, // 0.8 + 0.1 mais 1 si peu de buff extérieur
                    "hp_": 0, "hp": 0, // 0.9 à 1 + 0.1 mais 0.8 pour Hu Tao par exemple
                    "def_": 0, "def": 0, // 0.8 à 0.9, 0.8 si crit important
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
                goodSets: ["NoblesseOblige:4", "NoblesseOblige:2", "EmblemOfSeveredFate:4", "EmblemOfSeveredFate:2", "GladiatorsFinale:2", "Instructor:4"],

                er_req: 130,
                team: [
                    { role: "DPS", name: "Kinich", element: "dendro" },
                    { role: "Sub-DPS", name: "Emilie", element: "dendro"},
                    { role: "Support", name: "Bennett", element: "pyro"}
                ]
            },
            "Arc-en-ciel": {
                name: "Arc-en-ciel",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1, // 0.8 + 0.1 mais 1 si peu de buff extérieur
                    "hp_": 0, "hp": 0, // 0.9 à 1 + 0.1 mais 0.8 pour Hu Tao par exemple
                    "def_": 0, "def": 0, // 0.8 à 0.9, 0.8 si crit important
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
                goodSets: ["NoblesseOblige:4", "NoblesseOblige:2", "EmblemOfSeveredFate:4", "EmblemOfSeveredFate:2", "GladiatorsFinale:2", "Instructor:4"],

                er_req: 150,
                team: [
                    { role: "DPS", name: "Chasca", element: "anemo" },
                    { role: "Sub-DPS", name: "Furina", element: "hydro"},
                    { role: "Sub-DPS", name: "Fischl", element: "electro"}
                ]
            }
        }
    },
    // Jahoda

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
                        description: "",
                        active: false,
                        stats: {
                            critRate_: 0.05,
                        }
                    },
                    {
                        label: "A1 : Appel de la lune (2 stacks)",
                        description: "",
                        active: false,
                        stats: {
                            critRate_: 0.10,
                        }
                    },
                    {
                        label: "A1 : Appel de la lune (3 stacks)",
                        description: "",
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
                        description: "",
                        stats: {
                            hp_: 0.40
                        }
                    },
                    {
                        label: "C6 : Nuit lugubre, lune à travers (uniquement sur un élément)",
                        cons: 6,
                        description: "",
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
                description: "",

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
                goodSets: ["TenacityOfTheMillelith:4", "Instructor:4"],

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
                description: "",

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
                goodSets: ["AubadeOfMorningstarAndMoon:4", "SilkenMoonsSerenade:4", "Instructor:4"],

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
                description: "",

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
                goodSets: ["TenacityOfTheMillelith:4", "Instructor:4"],

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
                description: "",

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
                goodSets: ["TenacityOfTheMillelith:4", "Instructor:4"],

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
                        label: "0 Allié Hydro",
                        stats: {}
                    },
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

        // --- 3. ARCHÉTYPES (BUILDS) ---
        // Tu peux en mettre autant que tu veux. Le premier est celui par défaut.
        builds: {
            "DPS Sélénocristallisation": { // Clé unique (ex: 'vape', 'freeze', 'hypercarry')
                name: "DPS Sélénocristallisation",
                description: "",

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
                goodSets: ["HuskOfOpulentDreams:4", "HuskOfOpulentDreams:2", "NightOfTheSkysUnveiling:2", "WanderersTroupe:2"], // Viables

                // Cible ER recommandée (%)
                er_req: 120,

                // Composition d'équipe (4 Slots)
                team: [
                    { role: "Support", name: "Illuga", element: "geo" },

                    { role: "Sub-DPS", name: "Columbina", element: "hydro" },

                    {
                        role: "Sub-DPS",
                        name: "Linnea", // Noms (Optionnel)
                        element: "geo"  // Éléments pour la couleur de fond
                    }
                ]
            }
        }
    },
    // Illuga

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
                        description: "Accorde 20% de DGT Anémo et Pyro après une Dispersion Pyro.",
                        stats: { anemo_dmg_: 0.20, pyro_dmg_: 0.20 }
                    },
                    {
                        label: "C4 : Dispersion Hydro (+20% Anémo/Hydro)",
                        cons: 4,
                        description: "Accorde 20% de DGT Anémo et Hydro après une Dispersion Hydro.",
                        stats: { anemo_dmg_: 0.20, hydro_dmg_: 0.20 }
                    },
                    {
                        label: "C4 : Dispersion Électro (+20% Anémo/Électro)",
                        cons: 4,
                        description: "Accorde 20% de DGT Anémo et Électro après une Dispersion Électro.",
                        stats: { anemo_dmg_: 0.20, electro_dmg_: 0.20 }
                    },
                    {
                        label: "C4 : Dispersion Cryo (+20% Anémo/Cryo)",
                        cons: 4,
                        description: "Accorde 20% de DGT Anémo et Cryo après une Dispersion Cryo.",
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
                        description: "Augmente les DGT CRIT de 80%.",
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
                description: "",
                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1, // ATQ% vaut souvent 1, ATQ flat ~0.2
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0, // Ajuster selon besoin

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
                goodSets: ["DesertPavilionChronicle:4", "GladiatorsFinale:4", "EchoesOfAnOffering:4"],

                // Cible ER recommandée (%)
                er_req: 100,

                // Composition d'équipe (4 Slots)
                team: [
                    { role: "Support", name: "Venti", element: "anemo" },

                    { role: "Sub-DPS", name: "Durin", element: "pyro" },

                    {
                        role: "Support",
                        name: "Bennett", // Noms (Optionnel)
                        element: "pyro"  // Éléments pour la couleur de fond
                    }
                ]
            },
            "Anémo/Cryo": {
                name: "Anémo/Cryo",
                description: "",
                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1, // ATQ% vaut souvent 1, ATQ flat ~0.2
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0, // Ajuster selon besoin

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
                goodSets: ["DesertPavilionChronicle:4", "GladiatorsFinale:4", "EchoesOfAnOffering:4"],

                // Cible ER recommandée (%)
                er_req: 100,

                // Composition d'équipe (4 Slots)
                team: [
                    { role: "Support", name: "Venti", element: "anemo" },

                    { role: "Sub-DPS", name: "Escoffier", element: "cryo" },

                    {
                        role: "Support",
                        name: "Shenhe", // Noms (Optionnel)
                        element: "cryo"  // Éléments pour la couleur de fond
                    }
                ]
            },
            "Anémo/Electro": {
                name: "Anémo/Electro",
                description: "",
                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1, // ATQ% vaut souvent 1, ATQ flat ~0.2
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0, // Ajuster selon besoin

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
                goodSets: ["DesertPavilionChronicle:4", "GladiatorsFinale:4", "EchoesOfAnOffering:4"],

                // Cible ER recommandée (%)
                er_req: 100,

                // Composition d'équipe (4 Slots)
                team: [
                    { role: "Support", name: "Venti", element: "anemo" },

                    { role: "Sub-DPS", name: "Fischl", element: "electro" },

                    {
                        role: "Support",
                        name: "Iansan", // Noms (Optionnel)
                        element: "electro"  // Éléments pour la couleur de fond
                    }
                ]
            },
            "Anémo/Hydro": {
                name: "Anémo/Hydro",
                description: "",
                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.1, // ATQ% vaut souvent 1, ATQ flat ~0.2
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0, // Ajuster selon besoin

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
                goodSets: ["DesertPavilionChronicle:4", "GladiatorsFinale:4", "EchoesOfAnOffering:4"],

                // Cible ER recommandée (%)
                er_req: 100,

                // Composition d'équipe (4 Slots)
                team: [
                    { role: "Support", name: "Venti", element: "anemo" },

                    { role: "Sub-DPS", name: "Yelan", element: "hydro" },

                    {
                        role: "Support",
                        name: "Mona", // Noms (Optionnel)
                        element: "hydro"  // Éléments pour la couleur de fond
                    }
                ]
            }
        }
    },

    //6.5
    "Linnea": {
        color: "#F56D84",
        portraitOffset: -38,

        // Objectifs de Talents (Pour le coaching)
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
                        label: "Personnage lunaire sur le terrain",
                        stats: {}
                    },
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
                        description: "...",
                        stats: {
                            def_: 0.25
                        }
                    }
                ]
            }
        ],

        builds: {
            "Sub-DPS sélénocristallisation": { // Clé unique (ex: 'vape', 'freeze', 'hypercarry')
                name: "Sub-DPS sélénocristallisation",

                // Poids des stats (1 = Prioritaire, 0.5 = Utile, 0 = Inutile)
                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0, "atk": 0, // ATQ% vaut souvent 1, ATQ flat ~0.2
                    "hp_": 0, "hp": 0,
                    "def_": 0.8, "def": 0.1,
                    "eleMas": 0.4, "enerRech_": 0.1, // Ajuster selon besoin

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

                // Sets (Utiliser les noms exacts du mapping SET_NAME_MAPPING ou la clé EN)
                bestSets: ["AubadeOfMorningstarAndMoon:4", "HuskOfOpulentDreams:4"], // Top Tier
                goodSets: ["ArchaicPetra:2", "HuskOfOpulentDreams:2", "NightOfTheSkysUnveiling:2"], // Viables

                // Cible ER recommandée (%)
                er_req: 100,

                // Composition d'équipe (4 Slots)
                team: [
                    // Slot 1 : Généralement un Support clé
                    { role: "DPS", name: "Zibai", element: "geo" },

                    // Slot 2 : Sub-DPS ou Réaction
                    { role: "Support", name: "Illuga", element: "geo" },

                    // Slot 3 : Flex (Exemple Dual Slot : Kazuha ou Sucrose)
                    {
                        role: "Sub-DPS",
                        name: "Columbina", // Noms (Optionnel)
                        element: "hydro" // Éléments pour la couleur de fond
                    }
                ]
            }
        }
    },

    // 6.6
    // Nicole
    // Lohen
    // Prune
};

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
            { label: "1 stack de Taux CRIT (ne s'applique qu'aux compétences et déchaînements)", stats: { "critRate_": [0.02, 0.005] } },
            { label: "2 stacks de Taux CRIT (ne s'applique qu'aux compétences et déchaînements)", stats: { "critRate_": [0.04, 0.010] } },
            { label: "3 stacks de Taux CRIT (ne s'applique qu'aux compétences et déchaînements)", stats: { "critRate_": [0.06, 0.015] } },
            { label: "4 stacks de Taux CRIT (ne s'applique qu'aux compétences et déchaînements)", stats: { "critRate_": [0.08, 0.020] } },
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
            {label: "Si 1 personnage de Liyue est dans l'équipe (ATQ% et Taux CRIT)", stats: {"atk_": [0.07, 0.01], "critRate_": [0.03, 0.01]}},
            {label: "Si 2 personnages de Liyue sont dans l'équipe (ATQ% et Taux CRIT)", stats: {"atk_": [0.14, 0.02], "critRate_": [0.06, 0.02]}},
            {label: "Si 3 personnages de Liyue sont dans l'équipe (ATQ% et Taux CRIT)", stats: {"atk_": [0.21, 0.03], "critRate_": [0.09, 0.03]}},
            {label: "Si 4 personnages de Liyue sont dans l'équipe (ATQ% et Taux CRIT)", stats: {"atk_": [0.28, 0.04], "critRate_": [0.12, 0.04]}}
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
                    "atk_": [0.048, 0.012] // 1x
                }
            },
            {
                label: "Si l'équipe est composée de 2 personnages de Natlan ou d'un élément différent du porteur (ATQ%)",
                stats: {
                    "atk_": [0.096, 0.024] // 2x
                }
            },
            {
                label: "Si l'équipe est composée de 3 personnages de Natlan ou d'un élément différent du porteur (ATQ% et Maîtrise élémentaire)",
                stats: {
                    "atk_": [0.144, 0.036], // 3x
                    "eleMas": [24, 6]       // Se déclenche ici
                }
            },
            {
                label: "Si l'équipe est composée de 4 personnages de Natlan ou d'un élément différent du porteur (ATQ% et Maîtrise élémentaire)",
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
            {label: "Si 1 personnage de Liyue est dans l'équipe (ATQ% et Taux CRIT)", stats: {"atk_": [0.07, 0.01], "critRate_": [0.03, 0.01]}},
            {label: "Si 2 personnages de Liyue sont dans l'équipe (ATQ% et Taux CRIT)", stats: {"atk_": [0.14, 0.02], "critRate_": [0.06, 0.02]}},
            {label: "Si 3 personnages de Liyue sont dans l'équipe (ATQ% et Taux CRIT)", stats: {"atk_": [0.21, 0.03], "critRate_": [0.09, 0.03]}},
            {label: "Si 4 personnages de Liyue sont dans l'équipe (ATQ% et Taux CRIT)", stats: {"atk_": [0.28, 0.04], "critRate_": [0.12, 0.04]}}
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
                        source: "hp", // Basé sur les PV Max
                        percent: [0.0012, 0.0003] // 0.12%
                    }
                }
            },
            {
                label: "2 Stacks (PV% en Maîtrise élémentaire)",
                stats: {
                    "eleMas_bonus_scaling": {
                        source: "hp",
                        percent: [0.0024, 0.0006] // 0.24%
                    }
                }
            },
            {
                label: "3 Stacks (PV% en Maîtrise élémentaire)",
                stats: {
                    "eleMas_bonus_scaling": {
                        source: "hp",
                        // 0.36% (Perso) + 0.20% (Team) = 0.56% Total
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
    }
};

// --- EXPORT GLOBAL ---
window.DEFAULT_CONFIG = DEFAULT_CONFIG;
window.CHARACTER_CONFIG = CHARACTER_CONFIG;
window.WEAPON_PASSIVES = WEAPON_PASSIVES;
window.SET_PASSIVES = SET_PASSIVES;