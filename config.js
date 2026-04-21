const DEFAULT_CONFIG = {
    weights: { "critRate_": 1, "critDMG_": 1, "atk_": 0.5, "enerRech_": 0.5 },
    bestSets: [],
    goodSets: [],
    talents: { auto: 1, skill: 6, burst: 6 }
};

const CHARACTER_CONFIG = {
    "NomDuPersonnage": {
        // --- 1. CONFIGURATION GLOBALE ---
        color: "#FFFFFF", // Code Hex de l'élément ou de la tenue
        portraitOffset: 0, // Décalage vertical de l'image (négatif = monte, positif = descend)

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
                        label: "Nom du Passif (A1/A4)",
                        description: "Description courte de l'effet.",
                        active: true, // Coché par défaut ?
                        stats: {
                            // Stats simples
                            atk_: 0.20,

                            // EXEMPLE SCALING (Optionnel) :
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
                        cons: 1, // IMPORTANT : Niveau requis (1 à 6)
                        description: "Description...",
                        stats: {
                            dmgBonus: 0.10 // Simulation de gain DPS
                        }
                    },
                    {
                        label: "C2 : Nom de la constellation",
                        cons: 2,
                        description: "...",
                        stats: { /* ... */ }
                    }
                ]
            }
        ],

        // --- 3. ARCHÉTYPES (BUILDS) ---
        // Tu peux en mettre autant que tu veux. Le premier est celui par défaut.
        builds: {
            "main_build": { // Clé unique (ex: 'vape', 'freeze', 'hypercarry')
                name: "Nom du Build (ex: Vaporisation)",
                description: "Brève explication du style de jeu.",

                // Poids des stats (1 = Prioritaire, 0.5 = Utile, 0 = Inutile)
                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 1, "atk": 0.2, // ATQ% vaut souvent 1, ATQ flat ~0.2
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.5, // Ajuster selon besoin

                    // Bonus Élémentaires (Mettre 1 à l'élément du perso, 0 aux autres)
                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                // Sets (Utiliser les noms exacts du mapping SET_NAME_MAPPING ou la clé EN)
                bestSets: ["Set1:4", "Set2:4"], // Top Tier
                goodSets: ["Set1:2", "Set2:2"], // Viables

                // Cible ER recommandée (%)
                er_req: 100,

                // Composition d'équipe (4 Slots)
                team: [
                    // Slot 1 : Généralement un Support clé
                    { role: "Support", name: "Bennett", element: "pyro" },

                    // Slot 2 : Sub-DPS ou Réaction
                    { role: "Sub-DPS", name: "Xingqiu", element: "hydro" },

                    // Slot 3 : Flex (Exemple Dual Slot : Kazuha ou Sucrose)
                    {
                        role: "Flex",
                        name: ["Kazuha", "Sucrose"], // Noms (Optionnel)
                        element: ["anemo", "anemo"]  // Éléments pour la couleur de fond
                    }
                ]
            }
        }
    },
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
                    "atk_": 1, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.2, "enerRech_": 0.3,
                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 1,
                    "dendro_dmg_": 0, "physical_dmg_": 0,
                    "heal_": 0
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
                    "atk_": 1, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.3,
                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 1,
                    "dendro_dmg_": 0, "physical_dmg_": 0,
                    "heal_": 0
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
                    "atk_": 0.6, "atk": 0.06,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.8, "enerRech_": 0.3,
                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 1,
                    "dendro_dmg_": 0, "physical_dmg_": 0,
                    "heal_": 0
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
                        name: ["Liuyun", "Nahida"], // Noms (Optionnel)
                        element: ["anemo", "dendro"] // Éléments pour la couleur de fond
                    }
                ]
            },
            "Sélénocution": {
                name: "Sélénocution",
                description: "",
                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0.8, "atk": 0.08,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.5, "enerRech_": 0.3,
                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 1,
                    "dendro_dmg_": 0, "physical_dmg_": 0,
                    "heal_": 0
                },

                bestSets: ["LongNightsOath:4", "ObsidianCodex:4"],
                goodSets: ["ThunderingFury:4"],

                er_req: 130,

                team: [
                    { role: "Support", name: "Columbina", element: "hydro" },

                    // Slot 2 : Sub-DPS ou Réaction
                    { role: "Support", name: "Aino", element: "hydro" },

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
                    "critRate_": 0.5, "critDMG_": 0.5,
                    "atk_": 0, "atk": 0,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 1.2, "enerRech_": 1.2,
                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,
                    "heal_": 0
                },

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
                    "critRate_": 0.5, "critDMG_": 0.5,
                    "atk_": 0, "atk": 0,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 1.2, "enerRech_": 1.2,
                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,
                    "heal_": 0
                },

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
                    "critRate_": 0.5, "critDMG_": 0.5,
                    "atk_": 0, "atk": 0,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 1.2, "enerRech_": 1.2,
                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,
                    "heal_": 0
                },

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
                description: "",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 1, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.3,
                    "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,
                    "heal_": 0
                },

                bestSets: ["ADayCarvedFromRisingWinds:4"],
                goodSets: ["NoblesseOblige:4", "NoblesseOblige:2", "EmblemOfSeveredFate:4", "EmblemOfSeveredFate:2", "GladiatorsFinale:2", "Instructor:4"],

                er_req: 110,
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
                    "atk_": 1, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.3,
                    "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,
                    "heal_": 0
                },

                bestSets: ["ADayCarvedFromRisingWinds:4"],
                goodSets: ["NoblesseOblige:4", "NoblesseOblige:2", "EmblemOfSeveredFate:4", "EmblemOfSeveredFate:2", "GladiatorsFinale:2", "Instructor:4"],

                er_req: 110,
                team: [
                    { role: "DPS", name: "Kinich", element: "dendro" },
                    { role: "Sub-DPS", name: "Emilie", element: "dendro"},
                    { role: "Support", name: "Bennett", element: "pyro"}
                ]
            },
            "Arc-en-ciel": {
                name: "Arc-en-ciel",
                description: "",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 1, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.3,
                    "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,
                    "heal_": 0
                },

                bestSets: ["ADayCarvedFromRisingWinds:4"],
                goodSets: ["NoblesseOblige:4", "NoblesseOblige:2", "EmblemOfSeveredFate:4", "EmblemOfSeveredFate:2", "GladiatorsFinale:2", "Instructor:4"],

                er_req: 130,
                team: [
                    { role: "DPS", name: "Chasca", element: "anemo" },
                    { role: "Sub-DPS", name: "Furina", element: "hydro"},
                    { role: "Sub-DPS", name: "Fischl", element: "electro"}
                ]
            }
        }
    },
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
                    "atk_": 1, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.5,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 1,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                bestSets: ["GoldenTroupe:4"],
                goodSets: ["BlizzardStrayer:4", "NoblesseOblige:4"],

                er_req: 150,

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
    "Navia": {
        color: "#caa53c",
        portraitOffset: -37,

        talents: {
            auto: 6,
            skill: 8,
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
                    "atk_": 1, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0.3,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 1, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
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
                    "atk_": 1, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.2, "enerRech_": 0.3,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 1, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
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
                    "atk_": 0.2, "atk": 0.02,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 1, "enerRech_": 0.2,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                bestSets: ["NightOfTheSkysUnveiling:4"],
                goodSets: ["DeepwoodMemories:4", "GildedDreams:4", "Instructor:4"],

                er_req: 120,

                team: [
                    { role: "Support", name: "Columbina", element: "hydro" },
                    { role: "Sub-DPS", name: "Lauma", element: "dendro" },
                    {
                        role: "Flex",
                        name: ["Nahida", "Nilou"],
                        element: ["dendro", "hydro"]

                    }
                ]
            }
        }
    },
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
                    "hp_": 1, "hp": 0.1,
                    "def_": 0, "def": 0,
                    "eleMas": 0.3, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
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
                    "hp_": 1, "hp": 0.1,
                    "def_": 0, "def": 0,
                    "eleMas": 0.3, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
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
                    "hp_": 1, "hp": 0.1,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
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
                    "hp_": 1, "hp": 0.1,
                    "def_": 0, "def": 0,
                    "eleMas": 0.3, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                bestSets: ["AubadeOfMorningstarAndMoon:4", "SilkenMoonsSerenade:4"],
                goodSets: ["TenacityOfTheMillelith:4", "Instructor:4"],

                er_req: 180,

                team: [
                    { role: "DPS", name: "Zibai", element: "geo" },
                    { role: "Support", name: "Illuga", element: "geo" },
                    {
                        role: "Support",
                        name: "Gorou",
                        element: "geo",
                    }
                ]
            }
        }
    },
    "Neuvillette": {
        color: "#374eb4",
        portraitOffset: -38,
        talents: {
            auto: 8,
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
                    "eleMas": 0, "enerRech_": 0.3,

                    "pyro_dmg_": 0, "hydro_dmg_": 1, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
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
                    "eleMas": 0, "enerRech_": 0.3,

                    "pyro_dmg_": 0, "hydro_dmg_": 1, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
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
                    "hp_": 0.8, "hp": 0.08,
                    "def_": 0, "def": 0,
                    "eleMas": 0.2, "enerRech_": 0.3,

                    "pyro_dmg_": 0, "hydro_dmg_": 1, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
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
                    "critRate_": 0.5, "critDMG_": 0,
                    "atk_": 0, "atk": 0,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 1.2, "enerRech_": 1.2,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

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
                    "def_": 1, "def": 0.1,
                    "eleMas": 0, "enerRech_": 0,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 1, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
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
                    "hp_": 0.8, "hp": 0.08,
                    "def_": 0, "def": 0,
                    "eleMas": 0.2, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 1, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
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
                    "hp_": 1, "hp": 0.1,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 1, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
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
                    "hp_": 0.8, "hp": 0.08,
                    "def_": 0, "def": 0,
                    "eleMas": 0.2, "enerRech_": 1,

                    "pyro_dmg_": 0, "hydro_dmg_": 1, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
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
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C1 : Nom de la constellation",
                        cons: 1, // IMPORTANT : Niveau requis (1 à 6)
                        description: "Description...",
                        stats: {
                            dmgBonus: 0.10 // Simulation de gain DPS
                        }
                    },
                    {
                        label: "C2 : Nom de la constellation",
                        cons: 2,
                        description: "...",
                        stats: { /* ... */ }
                    }
                ]
            }
        ],

        // --- 3. ARCHÉTYPES (BUILDS) ---
        // Tu peux en mettre autant que tu veux. Le premier est celui par défaut.
        builds: {
            "Sélénocristallisation": { // Clé unique (ex: 'vape', 'freeze', 'hypercarry')
                name: "Sélénocristallisation",
                description: "",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 0, "atk": 0,
                    "hp_": 0, "hp": 0,
                    "def_": 1, "def": 0.1,
                    "eleMas": 0.5, "enerRech_": 0.2,

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

                bestSets: ["NightOfTheSkysUnveiling:4"],
                goodSets: ["HuskOfOpulentDreams:4", "HuskOfOpulentDreams:2", "NightOfTheSkysUnveiling:2", "WanderersTroupe:2"], // Viables

                // Cible ER recommandée (%)
                er_req: 110,

                // Composition d'équipe (4 Slots)
                team: [
                    { role: "Support", name: "Illuga", element: "geo" },

                    { role: "Sub-DPS", name: "Columbina", element: "hydro" },

                    {
                        role: "Flex",
                        name: ["Gorou", "Zhongli"], // Noms (Optionnel)
                        element: ["geo", "geo"]  // Éléments pour la couleur de fond
                    }
                ]
            }
        }
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
                    "atk_": 1, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0,
                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 1,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,
                    "heal_": 0
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
                buffs: [
                    {
                        label: "A1 : Équipe avec Pyro",
                        active: true,
                        stats: {
                            anemo_dmg_scaling: { source: "atk", percent: 0.0001 },
                            pyro_dmg_scaling: { source: "atk", percent: 0.0001 }
                        }
                    },
                    {
                        label: "A1 : Équipe avec Hydro",
                        stats: {
                            anemo_dmg_scaling: { source: "atk", percent: 0.0001 },
                            hydro_dmg_scaling: { source: "atk", percent: 0.0001 }
                        }
                    },
                    {
                        label: "A1 : Équipe avec Electro",
                        stats: {
                            anemo_dmg_scaling: { source: "atk", percent: 0.0001 },
                            electro_dmg_scaling: { source: "atk", percent: 0.0001 }
                        }
                    },
                    {
                        label: "A1 : Équipe avec Cryo",
                        stats: {
                            anemo_dmg_scaling: { source: "atk", percent: 0.0001 },
                            cryo_dmg_scaling: { source: "atk", percent: 0.0001 }
                        }
                    }
                ]
            },
            {
                category: "Constellations",
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
                    "atk_": 1, "atk": 0.1, // ATQ% vaut souvent 1, ATQ flat ~0.2
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0, // Ajuster selon besoin

                    "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

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
                    "atk_": 1, "atk": 0.1, // ATQ% vaut souvent 1, ATQ flat ~0.2
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0, // Ajuster selon besoin

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 1,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

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
                    "atk_": 1, "atk": 0.1, // ATQ% vaut souvent 1, ATQ flat ~0.2
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0, // Ajuster selon besoin

                    "pyro_dmg_": 0, "hydro_dmg_": 0, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 1,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

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
                    "atk_": 1, "atk": 0.1, // ATQ% vaut souvent 1, ATQ flat ~0.2
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0, "enerRech_": 0, // Ajuster selon besoin

                    "pyro_dmg_": 0, "hydro_dmg_": 1, "cryo_dmg_": 0,
                    "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0,
                    "dendro_dmg_": 0, "physical_dmg_": 0,

                    "heal_": 0
                },

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
            "vape": {
                name: "Vaporisation (Classique)",
                description: "Arlecchino joue avec un applicateur Hydro pour vaporiser ses coups.",

                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 1, "atk": 0.1,
                    "hp_": 0, "hp": 0,
                    "def_": 0, "def": 0,
                    "eleMas": 0.75, "enerRech_": 0,
                    "pyro_dmg_": 1, "hydro_dmg_": 0, "cryo_dmg_": 0, "geo_dmg_": 0, "anemo_dmg_": 0, "electro_dmg_": 0, "dendro_dmg_": 0, "physical_dmg_": 0,
                    "heal_": 0
                },

                bestSets: ["FragmentOfHarmonicWhimsy:4", "GladiatorsFinale:4"],
                goodSets: ["EchoesOfAnOffering:4", "CrimsonWitchOfFlames:2", "GladiatorsFinale:2", "CrimsonWitchOfFlames:4"],

                er_req: 100,

                team: [
                    { role: "Sub-DPS", name: "Yelan", element: "hydro" },
                    { role: "Sustain", name: "Bennett", element: "pyro" },
                    { role: "Flex", element: ["hydro", "cryo"] },
                ]
            },

            "overload": {
                name: "Surcharge (Chevreuse)",
                description: "Team limitant aux éléments Pyro et Électro pour activer le passif de Chevreuse.",
                weights: {
                    "critRate_": 1, "critDMG_": 1,
                    "atk_": 1, "atk": 0.1,
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
                    "atk_": 1, "atk": 0.1,
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
    "Shogun Raiden": {
        color: "#a480df", // Violet Électro
        portraitOffset: -30, // Ajustement de l'image

        talents: { auto: 1, skill: 9, burst: 10 },

        // --- BUFFS ---
        buffs: [
            {
                category: "Passifs",
                buffs: [
                    {
                        label: "A4 : L'illuminée (Conversion ER)",
                        description: "Chaque 1% d'ER au-dessus de 100% confère 0.4% de DGT Électro.",
                        active: true, // Toujours actif par défaut
                        stats: {
                            elemental_dmg_bonus_scaling: {
                                source: "enerRech_", // On lit l'ER
                                percent: 0.4,       // 0.4% de DGT par point d'ER
                                baseline: 100       // On soustrait 100% avant de calculer
                            }
                        }
                    }
                ]
            },
            {
                category: "Constellations",
                buffs: [
                    {
                        label: "C2 : Brise-acier (Ignorer DEF)",
                        cons: 2, // S'affiche uniquement si C2+
                        description: "Les attaques ignorent 60% de la DÉF (Simulé par un bonus de DGT).",
                        stats: {
                            dmgBonus: 0.40 // Simulation de l'impact DPS
                        }
                    }
                ]
            }
        ],

        // --- BUILD 1 : HYPERCARRY (Classique) ---
        builds: {
            "hypercarry": {
                name: "Hypercarry / National",
                description: "Build focalisé sur le Déchaînement et la Recharge d'Énergie.",

                weights: {
                    atk_: 1, atk: 0.1, critRate_: 1, critDMG_: 1,
                    enerRech_: 1, // L'ER est aussi importante que le Crit !
                    eleMas: 0,
                    electro_dmg_: 1
                },

                bestSets: ["EmblemOfSeveredFate:4"],
                goodSets: ["EmblemOfSeveredFate:2", "NoblesseOblige:2"],

                er_req: 220, // Gros besoin d'ER

                team: [
                    { role: "Support", name: "KujouSara", element: "electro" },
                    { role: "Sustain", name: "Bennett", element: "pyro" },
                    { role: "Support", name: "KaedeharaKazuha", element: "anemo" }
                ]
            },

            // --- BUILD 2 : HYPERBLOOM (Maîtrise) ---
            "hyperbloom": {
                name: "Hyperbloom (EM)",
                description: "Raiden déclenche les réactions Dendro. Full Maîtrise Élémentaire.",

                weights: {
                    atk_: 0, critRate_: 0, critDMG_: 0, // Le crit ne sert à rien
                    enerRech_: 0.2,
                    eleMas: 1, // Priorité absolue
                    electro_dmg_: 0
                },

                bestSets: ["FlowerOfParadiseLost:4", "GildedDreams:4"],
                goodSets: ["GildedDreams:2", "WanderersTroupe:2"],

                er_req: 100, // Pas besoin d'ER

                team: [
                    { role: "Applicator", name: "Nahida", element: "dendro" },
                    { role: "Hydro", name: "Yelan", element: "hydro" },
                    { role: "Healer", name: "SangonomiyaKokomi", element: "hydro" }
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
                        percent: [0.00036, 0.00009]
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
                        "percent": [24, 6]
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
                    critDMG_: 0.075
                }
            },
            {
                label: "Hymne des quatre vents (2 stacks)",
                stats: {
                    critDMG_: 0.15
                }
            },
            {
                label: "Hymne des quatre vents (3 stacks)",
                stats: {
                    critDMG_: 0.225
                }
            },
            {
                label: "Hymne des quatre vents (4 stacks)",
                active: true,
                stats: {
                    critDMG_: 0.30
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