/* =========================================================
   config.generated.js — FICHIER AUTO-GÉNÉRÉ
   Généré le : 2026-07-01T09:04:38.150Z
   116 personnages | 111 armes | 21 sets

   ========================================================= */

window.DEFAULT_CONFIG   = {
  "weights": {
    "critRate_": 1,
    "critDMG_": 1,
    "atk_": 0.5,
    "enerRech_": 0.5
  },
  "bestSets": [],
  "goodSets": [],
  "talents": {
    "auto": 1,
    "skill": 6,
    "burst": 6
  }
};

window.CHARACTER_CONFIG = {
  "Aino": {
    "color": "#cb8fc3",
    "portraitOffset": -35,
    "talents": {
      "auto": 1,
      "skill": 6,
      "burst": 8
    },
    "buffs": [
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C1 : Théorie de l'équilibre cendres–champs (EM)",
              "en": "C1: The Theory of Ash—Field Equilibrium (EM)"
            },
            "cons": 1,
            "stats": {
              "eleMas": 80
            }
          }
        ]
      }
    ],
    "builds": {
      "Support sélène": {
        "name": {
          "fr": "Support sélène",
          "en": "Lunar support"
        },
        "weights": {
          "critRate_": 0.4,
          "eleMas": 0.4,
          "enerRech_": 1,
          "hydro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "enerRech_",
            "eleMas"
          ],
          "EQUIP_RING": [
            "eleMas",
            "hydro_dmg_"
          ],
          "EQUIP_DRESS": [
            "eleMas",
            "critRate_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [
          "atk"
        ],
        "bestSets": [
          "SilkenMoonsSerenade:4",
          "Instructor:4"
        ],
        "goodSets": [
          "NoblesseOblige:4",
          "ScrollOfTheHeroOfCinderCity:4",
          "DeepwoodMemories:4",
          "GildedDreams:4",
          "FlowerOfParadiseLost:4",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2"
        ],
        "er_req": 220,
        "team": [
          {
            "role": "Flex",
            "name": [
              "Nefer",
              "Flins"
            ],
            "element": [
              "dendro",
              "electro"
            ]
          },
          {
            "role": "Flex",
            "name": [
              "Lauma",
              "Ineffa"
            ],
            "element": [
              "dendro",
              "electro"
            ]
          },
          {
            "role": "Support",
            "name": "Sucrose",
            "element": "anemo"
          }
        ]
      }
    }
  },
  "Albedo": {
    "color": "#3e387f",
    "portraitOffset": -36,
    "talents": {
      "auto": 1,
      "skill": 8,
      "burst": 8
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "A4 : Sagesse en bouteille (EM)",
              "en": "A4: Homuncular Nature (EM)"
            },
            "active": true,
            "stats": {
              "eleMas": 125
            }
          }
        ]
      },
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C1 : Fleur d'Éden (Hexerei - DÉF%)",
              "en": "C1: Flower of Eden (Hexerei - DEF%)"
            },
            "cons": 1,
            "stats": {
              "def_": 0.5
            }
          }
        ]
      }
    ],
    "builds": {
      "Sub-DPS Géo": {
        "name": {
          "fr": "Sub-DPS Géo",
          "en": "Geo Sub-DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.1,
          "def_": 0.8,
          "def": 0.1,
          "enerRech_": 0.1,
          "geo_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "def_"
          ],
          "EQUIP_RING": [
            "geo_dmg_",
            "def_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [
          "heal_"
        ],
        "showUIStats": [
          "atk"
        ],
        "bestSets": [
          "HuskOfOpulentDreams:4",
          "GoldenTroupe:4"
        ],
        "goodSets": [
          "HuskOfOpulentDreams:2",
          "GoldenTroupe:2"
        ],
        "er_req": 100,
        "team": [
          {
            "role": "DPS",
            "name": "Arlecchino",
            "element": "pyro"
          },
          {
            "role": "Sub-DPS",
            "name": "Durin",
            "element": "pyro"
          },
          {
            "role": "Support",
            "name": "Xilonen",
            "element": "geo"
          }
        ]
      }
    }
  },
  "Alhaitham": {
    "color": "#247074",
    "portraitOffset": -35,
    "talents": {
      "auto": 9,
      "skill": 10,
      "burst": 8
    },
    "buffs": [
      {
        "category": {
          "fr": "Constellation 2 : Rhétorique",
          "en": "Constellation 2: Debate"
        },
        "selectMode": "exclusive",
        "buffs": [
          {
            "label": {
              "fr": "1 Stack (EM)",
              "en": "1 Stack (EM)"
            },
            "cons": 2,
            "active": false,
            "stats": {
              "eleMas": 50
            }
          },
          {
            "label": {
              "fr": "2 stacks (EM)",
              "en": "2 stacks (EM)"
            },
            "cons": 2,
            "active": false,
            "stats": {
              "eleMas": 100
            }
          },
          {
            "label": {
              "fr": "3 stacks (EM)",
              "en": "3 stacks (EM)"
            },
            "cons": 2,
            "active": true,
            "stats": {
              "eleMas": 150
            }
          },
          {
            "label": {
              "fr": "4 stacks (EM)",
              "en": "4 stacks (EM)"
            },
            "cons": 2,
            "active": false,
            "stats": {
              "eleMas": 200
            }
          }
        ]
      },
      {
        "category": {
          "fr": "Constellation 4 : Élucidation",
          "en": "Constellation 4: Elucidation"
        },
        "selectMode": "exclusive",
        "buffs": [
          {
            "label": {
              "fr": "1 miroir généré (DGTs Dendro)",
              "en": "1 mirror created (Dendro DMG)"
            },
            "cons": 4,
            "active": false,
            "stats": {
              "dendro_dmg_": 0.1
            }
          },
          {
            "label": {
              "fr": "2 miroirs générés (DGTs Dendro)",
              "en": "2 mirrors created (Dendro DMG)"
            },
            "cons": 4,
            "active": false,
            "stats": {
              "dendro_dmg_": 0.2
            }
          },
          {
            "label": {
              "fr": "3 miroirs générés (DGTs Dendro)",
              "en": "3 mirrors created (Dendro DMG)"
            },
            "cons": 4,
            "active": true,
            "stats": {
              "dendro_dmg_": 0.3
            }
          }
        ]
      },
      {
        "category": {
          "fr": "Constellation 6 : Structuration",
          "en": "Constellation 6: Structuration"
        },
        "buffs": [
          {
            "label": {
              "fr": "1 miroir généré si 3 existent déjà (Taux Crit et DGT Crit)",
              "en": "1 mirror created when 3 already exist (Crit Rate & Crit DMG)"
            },
            "cons": 6,
            "active": false,
            "stats": {
              "critRate_": 0.1,
              "critDMG_": 0.7
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Exubérance": {
        "name": {
          "fr": "DPS Exubérance",
          "en": "Hyperbloom DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.4,
          "atk": 0.1,
          "eleMas": 1,
          "enerRech_": 0.6,
          "dendro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas",
            "atk_"
          ],
          "EQUIP_RING": [
            "dendro_dmg_",
            "eleMas"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "GildedDreams:4"
        ],
        "goodSets": [
          "DeepwoodMemories:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "GoldenTroupe:2",
          "GoldenTroupe:4",
          "MarechausseeHunter:4",
          "DeepwoodMemories:4"
        ],
        "er_req": 130,
        "team": [
          {
            "role": "Support",
            "name": "Nahida",
            "element": "dendro"
          },
          {
            "role": "Sub-DPS",
            "name": "Shinobu",
            "element": "electro"
          },
          {
            "role": "Flex",
            "name": [
              "Yelan",
              "Xingqiu"
            ],
            "element": [
              "hydro",
              "hydro"
            ]
          }
        ]
      },
      "DPS Propagation": {
        "name": {
          "fr": "DPS Propagation",
          "en": "Spead DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.4,
          "atk": 0.1,
          "eleMas": 1,
          "enerRech_": 0.6,
          "dendro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas",
            "atk_"
          ],
          "EQUIP_RING": [
            "dendro_dmg_",
            "eleMas"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "GildedDreams:4"
        ],
        "goodSets": [
          "DeepwoodMemories:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "GoldenTroupe:4",
          "MarechausseeHunter:4",
          "DeepwoodMemories:4"
        ],
        "er_req": 130,
        "team": [
          {
            "role": "Support",
            "name": "Nahida",
            "element": "dendro"
          },
          {
            "role": "Sub-DPS",
            "name": "Yae",
            "element": "electro"
          },
          {
            "role": "Support",
            "name": "Zhongli",
            "element": "geo"
          }
        ]
      },
      "Driver Fleurissement": {
        "name": {
          "fr": "Driver Fleurissement",
          "en": "Bloom Driver"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.4,
          "atk": 0.1,
          "eleMas": 1,
          "enerRech_": 0.6,
          "dendro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas",
            "atk_"
          ],
          "EQUIP_RING": [
            "dendro_dmg_",
            "eleMas"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "GildedDreams:4"
        ],
        "goodSets": [
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "DeepwoodMemories:2",
          "GoldenTroupe:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "GoldenTroupe:4",
          "MarechausseeHunter:4",
          "DeepwoodMemories:4"
        ],
        "er_req": 130,
        "team": [
          {
            "role": "Support",
            "name": "Nilou",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Xingqiu",
            "element": "hydro"
          },
          {
            "role": "Support",
            "name": "Baizhuer",
            "element": "dendro"
          }
        ]
      }
    }
  },
  "Aloy": {
    "color": "#479ab4",
    "portraitOffset": -32,
    "talents": {
      "auto": 8,
      "skill": 9,
      "burst": 10
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "A1 : Surcharge offensive (ATQ%)",
              "en": "A1: Combat override (ATK%)"
            },
            "active": true,
            "stats": {
              "atk_": 0.16
            }
          },
          {
            "label": {
              "fr": "A4 : Frappe puissante (DGTs Élémentaires)",
              "en": "A4: Strong strike (Elemental DMG)"
            },
            "active": true,
            "stats": {
              "elemental_dmg_": 0.35
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Fonte": {
        "name": {
          "fr": "DPS Fonte",
          "en": "Melt DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.6,
          "enerRech_": 0.4,
          "cryo_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas",
            "atk_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "cryo_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "EmblemOfSeveredFate:4",
          "GildedDreams:4"
        ],
        "goodSets": [
          "Lavawalker:4",
          "NoblesseOblige:2",
          "BlizzardStrayer:2",
          "FinaleOfTheDeepGalleries:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 140,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Xiangling",
            "element": "pyro"
          },
          {
            "role": "Support",
            "name": "Kazuha",
            "element": "anemo"
          },
          {
            "role": "Support",
            "name": "Bennett",
            "element": "pyro"
          }
        ]
      },
      "DPS Gel": {
        "name": {
          "fr": "DPS Gel",
          "en": "Freeze DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.4,
          "cryo_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "cryo_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "NoblesseOblige:4",
          "BlizzardStrayer:4",
          "MarechausseeHunter:4"
        ],
        "goodSets": [
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "BlizzardStrayer:2",
          "FinaleOfTheDeepGalleries:2",
          "NoblesseOblige:2"
        ],
        "er_req": 120,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Furina",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Escoffier",
            "element": "cryo"
          },
          {
            "role": "Support",
            "name": "Citlali",
            "element": "cryo"
          }
        ]
      }
    }
  },
  "Amber": {
    "color": "#e24b4b",
    "portraitOffset": -36,
    "talents": {
      "auto": 8,
      "skill": 9,
      "burst": 10
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "A1 : Dans le mille ! (uniquement le déchaînement - Taux Crit)",
              "en": "A1: Every arrow finds its target (only for the burst - Crit Rate)"
            },
            "active": false,
            "stats": {
              "critRate_": 0.1
            }
          },
          {
            "label": {
              "fr": "A4 : Tir précis (uniquement après avoir touché un point faible - ATQ%)",
              "en": "A4: Precise shot (only after hitting a weak point - ATK%)"
            },
            "active": false,
            "stats": {
              "atk_": 0.15
            }
          }
        ]
      },
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C6 : Feu sauvage (après le déchaînement - ATQ%)",
              "en": "C6: Wildfire (after using the burst - ATK%)"
            },
            "cons": 6,
            "active": false,
            "stats": {
              "atk_": 0.15
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Fonte": {
        "name": {
          "fr": "DPS Fonte",
          "en": "Melt DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.6,
          "enerRech_": 0.6,
          "pyro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas",
            "atk_"
          ],
          "EQUIP_RING": [
            "pyro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "ShimenawasReminiscence:4",
          "WanderersTroupe:4",
          "CrimsonWitchOfFlames:4"
        ],
        "goodSets": [
          "DesertPavilionChronicle:4",
          "GildedDreams:4",
          "CrimsonWitchOfFlames:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 110,
        "team": [
          {
            "role": "Support",
            "name": "Citlali",
            "element": "cryo"
          },
          {
            "role": "Support",
            "name": "Xilonen",
            "element": "geo"
          },
          {
            "role": "Support",
            "name": "Bennett",
            "element": "pyro"
          }
        ]
      },
      "DPS Bourgeonnement": {
        "name": {
          "fr": "DPS Bourgeonnement",
          "en": "Burgeon DPS"
        },
        "weights": {
          "eleMas": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas"
          ],
          "EQUIP_RING": [
            "eleMas"
          ],
          "EQUIP_DRESS": [
            "eleMas"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [
          "atk"
        ],
        "bestSets": [
          "FlowerOfParadiseLost:4",
          "GildedDreams:4"
        ],
        "goodSets": [
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 100,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Collei",
            "element": "dendro"
          },
          {
            "role": "Support",
            "name": "Kokomi",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Rosaria",
            "element": "cryo"
          }
        ]
      }
    }
  },
  "Arataki Itto": {
    "color": "#7F473A",
    "portraitOffset": -39,
    "talents": {
      "auto": 10,
      "skill": 8,
      "burst": 9
    },
    "buffs": [
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C4 : Au pain sec et à l'eau ! (DÉF% et ATQ%)",
              "en": "C4: Jailhouse Bread and Butter (DEF% & ATK%)"
            },
            "cons": 4,
            "active": true,
            "stats": {
              "def_": 0.2,
              "atk_": 0.2
            }
          },
          {
            "label": {
              "fr": "C6 : Arataki Itto, présent ! (DGT Crit)",
              "en": "C6: Arataki Itto, present! (Crit DMG)"
            },
            "cons": 6,
            "active": true,
            "stats": {
              "critDMG_": 0.7
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Géo": {
        "name": {
          "fr": "DPS Géo",
          "en": "Geo DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "def_": 0.8,
          "def": 0.1,
          "enerRech_": 0.8,
          "geo_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "def_"
          ],
          "EQUIP_RING": [
            "geo_dmg_",
            "def_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "HuskOfOpulentDreams:4"
        ],
        "goodSets": [
          "RetracingBolide:4",
          "HuskOfOpulentDreams:2",
          "ArchaicPetra:2"
        ],
        "er_req": 140,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Albedo",
            "element": "geo"
          },
          {
            "role": "Support",
            "name": "Gorou",
            "element": "geo"
          },
          {
            "role": "Support",
            "name": "Zhongli",
            "element": "geo"
          }
        ]
      },
      "DPS Sélénocristallisation": {
        "name": {
          "fr": "DPS Sélénocristallisation",
          "en": "Lunar-Crystallize DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "def_": 0.8,
          "def": 0.1,
          "eleMas": 0.5,
          "enerRech_": 0.8,
          "geo_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "def_"
          ],
          "EQUIP_RING": [
            "geo_dmg_",
            "def_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "HuskOfOpulentDreams:4",
          "NightOfTheSkysUnveiling:4"
        ],
        "goodSets": [
          "RetracingBolide:4",
          "HuskOfOpulentDreams:2",
          "ArchaicPetra:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 140,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Columbina",
            "element": "hydro"
          },
          {
            "role": "Support",
            "name": "Gorou",
            "element": "geo"
          },
          {
            "role": "Sub-DPS",
            "name": "Linnea",
            "element": "geo"
          }
        ]
      }
    }
  },
  "Arlecchino": {
    "color": "#AB3D2D",
    "portraitOffset": -38,
    "talents": {
      "auto": 10,
      "skill": 8,
      "burst": 6
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "Passif : Seule la lune peut savoir (DGTs Pyro)",
              "en": "Passive: The Balemoon alone may know (Pyro DMG)"
            },
            "stats": {
              "pyro_dmg_": 0.4
            }
          }
        ]
      },
      {
        "category": "Constellations",
        "selectMode": "cumulative",
        "buffs": [
          {
            "label": {
              "fr": "C6 : « Désormais, nous vivrons ensemble une nouvelle vie. » (uniquement pour l'attaque normale et le déchaînement - Taux Crit et DGT Crit)",
              "en": "C6: \"From This Day On, We Shall Delight in New Life Together.\" (only for normal attacks and burst - Crit Rate & Crit DMG)"
            },
            "cons": 6,
            "stats": {
              "critDMG_": 0.7,
              "critRate_": 0.1
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Fonte": {
        "name": {
          "fr": "DPS Fonte",
          "en": "Melt DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.6,
          "pyro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas",
            "atk_"
          ],
          "EQUIP_RING": [
            "pyro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "bestSets": [
          "FragmentOfHarmonicWhimsy:4",
          "GladiatorsFinale:4"
        ],
        "goodSets": [
          "EchoesOfAnOffering:4",
          "CrimsonWitchOfFlames:2",
          "CrimsonWitchOfFlames:4",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 100,
        "team": [
          {
            "role": "Support",
            "name": "Citlali",
            "element": "cryo"
          },
          {
            "role": "Support",
            "name": "Xilonen",
            "element": "geo"
          },
          {
            "role": "Support",
            "name": "Bennett",
            "element": "pyro"
          }
        ]
      },
      "DPS Surcharge": {
        "name": {
          "fr": "DPS Surcharge",
          "en": "Overload DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "pyro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "pyro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "bestSets": [
          "FragmentOfHarmonicWhimsy:4",
          "GladiatorsFinale:4"
        ],
        "goodSets": [
          "EchoesOfAnOffering:4",
          "CrimsonWitchOfFlames:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "CrimsonWitchOfFlames:4"
        ],
        "er_req": 100,
        "team": [
          {
            "role": "Support",
            "name": "Chevreuse",
            "element": "pyro"
          },
          {
            "role": "Sub-DPS",
            "name": "Fischl",
            "element": "electro"
          },
          {
            "role": "Support",
            "name": "Nicole",
            "element": "pyro"
          }
        ]
      },
      "DPS mono Pyro": {
        "name": {
          "fr": "DPS Mono-pyro",
          "en": "Mono-pyro DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "pyro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "pyro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "bestSets": [
          "FragmentOfHarmonicWhimsy:4",
          "GladiatorsFinale:4"
        ],
        "goodSets": [
          "EchoesOfAnOffering:4",
          "CrimsonWitchOfFlames:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2"
        ],
        "er_req": 100,
        "team": [
          {
            "role": "Sustain",
            "name": "Bennett",
            "element": "pyro"
          },
          {
            "role": "Sub-DPS",
            "name": "Xiangling",
            "element": "pyro"
          },
          {
            "role": "Support",
            "name": "Kazuha",
            "element": "anemo"
          }
        ]
      }
    }
  },
  "Baizhu": {
    "color": "#297c81",
    "portraitOffset": -36,
    "talents": {
      "auto": 1,
      "skill": 9,
      "burst": 10
    },
    "buffs": [
      {
        "category": {
          "fr": "A1 : Cinq fortunes perpétuelles (DGTs Élémentaires ou Soins)",
          "en": "A1: Five fortunes forever (Elemental DMG or Heal)"
        },
        "selectMode": "exclusive",
        "buffs": [
          {
            "label": {
              "fr": "PV > 50%",
              "en": "HP > 50%"
            },
            "active": true,
            "stats": {
              "elemental_dmg_": 0.25
            }
          },
          {
            "label": {
              "fr": "PV < 50%",
              "en": "HP < 50%"
            },
            "active": false,
            "stats": {
              "heal_": 0.2
            }
          }
        ]
      },
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C4 : Perception ancienne (Maîtrise Élémentaire)",
              "en": "C4: Ancient art of perception (EM)"
            },
            "cons": 4,
            "stats": {
              "eleMas": 80
            }
          }
        ]
      }
    ],
    "builds": {
      "Healer et applicateur universel": {
        "name": {
          "fr": "Healer et applicateur universel",
          "en": "Universal healer and enabler"
        },
        "weights": {
          "hp_": 1,
          "hp": 0.8,
          "enerRech_": 1,
          "heal_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "hp_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "hp_"
          ],
          "EQUIP_DRESS": [
            "hp_",
            "heal_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "DeepwoodMemories:4",
          "Instructor:4"
        ],
        "goodSets": [
          "OceanHuedClam:4",
          "NoblesseOblige:4",
          "MaidenBeloved:4",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "MaidenBeloved:2",
          "OceanHuedClam:2",
          "SongOfDaysPast:2"
        ],
        "er_req": 180,
        "team": [
          {
            "role": "",
            "name": "",
            "element": ""
          },
          {
            "role": "",
            "name": "",
            "element": ""
          },
          {
            "role": "",
            "name": "",
            "element": ""
          }
        ]
      }
    }
  },
  "Barbara": {
    "color": "#3a54a5",
    "portraitOffset": -37,
    "skins": {
      "201401": {
        "color": "#8499fb",
        "portraitOffset": -37
      }
    },
    "talents": {
      "auto": 1,
      "skill": 10,
      "burst": 10
    },
    "buffs": [
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C2 : Éclat de vitalité (DGTs Hydro)",
              "en": "C2: Vitality burst (Hydro DMG)"
            },
            "cons": 2,
            "stats": {
              "elemental_dmg_": 0.15
            }
          }
        ]
      }
    ],
    "builds": {
      "Healeuse universelle": {
        "name": {
          "fr": "Healeuse universelle",
          "en": "Universal healer"
        },
        "weights": {
          "hp_": 1,
          "hp": 0.8,
          "enerRech_": 0.1,
          "heal_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "hp_"
          ],
          "EQUIP_RING": [
            "hp_"
          ],
          "EQUIP_DRESS": [
            "heal_",
            "hp_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "MaidenBeloved:4",
          "OceanHuedClam:4"
        ],
        "goodSets": [
          "MaidenBeloved:2",
          "OceanHuedClam:2",
          "SongOfDaysPast:2",
          "TenacityOfTheMillelith:2",
          "VourukashasGlow:2"
        ],
        "er_req": 100,
        "team": [
          {
            "role": "",
            "name": "",
            "element": ""
          },
          {
            "role": "",
            "name": "",
            "element": ""
          },
          {
            "role": "",
            "name": "",
            "element": ""
          }
        ]
      }
    }
  },
  "Beidou": {
    "color": "#6d43b0",
    "portraitOffset": -37,
    "talents": {
      "auto": 1,
      "skill": 8,
      "burst": 10
    },
    "buffs": [
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C6 : Chancre du mal (quand le déchaînement est actif / Radiance - Maîtrise élémentaire)",
              "en": "C6 : Bane of Evil (while burst is active / Radiance - EM)"
            },
            "cons": 6,
            "stats": {
              "eleMas": 200
            }
          }
        ]
      }
    ],
    "builds": {
      "Sub-DPS Électrocution": {
        "name": {
          "fr": "Sub-DPS Électrocution",
          "en": "Electro-Charged Sub-DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 1,
          "electro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "electro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "EmblemOfSeveredFate:4"
        ],
        "goodSets": [
          "NoblesseOblige:4",
          "ThunderingFury:4",
          "Thundersoother:4",
          "ThunderingFury:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2"
        ],
        "er_req": 150,
        "team": [
          {
            "role": "Support",
            "name": "Sucrose",
            "element": "anemo"
          },
          {
            "role": "Sub-DPS",
            "name": "Fischl",
            "element": "electro"
          },
          {
            "role": "Sub-DPS",
            "name": "Xingqiu",
            "element": "hydro"
          }
        ]
      },
      "Sub-DPS Suractivation": {
        "name": {
          "fr": "Sub-DPS Suractivation",
          "en": "Aggravate Sub-DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.8,
          "enerRech_": 1,
          "electro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "enerRech_",
            "eleMas"
          ],
          "EQUIP_RING": [
            "electro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "EmblemOfSeveredFate:4",
          "GildedDreams:4"
        ],
        "goodSets": [
          "NoblesseOblige:4",
          "ThunderingFury:4",
          "Thundersoother:4",
          "ThunderingFury:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 150,
        "team": [
          {
            "role": "DPS",
            "name": "Tighnari",
            "element": "dendro"
          },
          {
            "role": "Sub-DPS",
            "name": "Nahida",
            "element": "dendro"
          },
          {
            "role": "Sub-DPS",
            "name": "Fischl",
            "element": "electro"
          }
        ]
      }
    }
  },
  "Bennett": {
    "color": "#df4d4d",
    "portraitOffset": -38,
    "skins": {
      "203201": {
        "color": "#ef9c50",
        "portraitOffset": -36
      }
    },
    "talents": {
      "auto": 1,
      "skill": 1,
      "burst": 10
    },
    "buffs": [
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C2 : Brise-désespoir (si PV inférieurs à 70% - Recharge d'énergie)",
              "en": "C2: Impasse conqueror (if HP below 70% - ER)"
            },
            "cons": 2,
            "active": false,
            "stats": {
              "enerRech_": 0.3
            }
          },
          {
            "label": {
              "fr": "C6 : Feu et courage (si sur le terrain - DGTs Pyro)",
              "en": "C6: Fire ventures with me (if on-field - Pyro DMG)"
            },
            "cons": 6,
            "active": false,
            "stats": {
              "elemental_dmg_": 0.15
            }
          }
        ]
      }
    ],
    "builds": {
      "Buffer universel": {
        "name": {
          "fr": "Buffer universel",
          "en": "Universal buffer"
        },
        "weights": {
          "critRate_": 0.4,
          "hp_": 1,
          "hp": 0.8,
          "enerRech_": 1,
          "heal_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "enerRech_",
            "hp_"
          ],
          "EQUIP_RING": [
            "hp_"
          ],
          "EQUIP_DRESS": [
            "heal_",
            "hp_",
            "critRate_"
          ]
        },
        "hideUIStats": [
          "critDMG_"
        ],
        "showUIStats": [
          "atk"
        ],
        "bestSets": [
          "NoblesseOblige:4",
          "ScrollOfTheHeroOfCinderCity:4"
        ],
        "goodSets": [
          "Instructor:4",
          "TheExile:4",
          "TenacityOfTheMillelith:2",
          "VourukashasGlow:2",
          "MaidenBeloved:2",
          "OceanHuedClam:2",
          "SongOfDaysPast:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2"
        ],
        "er_req": 220,
        "team": [
          {
            "role": "",
            "name": "",
            "element": ""
          },
          {
            "role": "",
            "name": "",
            "element": ""
          },
          {
            "role": "",
            "name": "",
            "element": ""
          }
        ]
      }
    }
  },
  "Candace": {
    "color": "#3a306a",
    "portraitOffset": -39,
    "talents": {
      "auto": 8,
      "skill": 10,
      "burst": 9
    },
    "buffs": [
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C2 : Brillance perçant la lune (PV%)",
              "en": "C2: Moon-piercing brilliance (HP%)"
            },
            "cons": 2,
            "stats": {
              "hp_": 0.2
            }
          }
        ]
      }
    ],
    "builds": {
      "Driver fleurissement": {
        "name": {
          "fr": "Driver Fleurissement",
          "en": "Bloom Driver"
        },
        "weights": {
          "critRate_": 0.4,
          "hp_": 0.8,
          "hp": 0.1,
          "eleMas": 1,
          "enerRech_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "eleMas"
          ],
          "EQUIP_DRESS": [
            "eleMas",
            "critRate_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "FlowerOfParadiseLost:4"
        ],
        "goodSets": [
          "GildedDreams:4",
          "SilkenMoonsSerenade:4",
          "DeepwoodMemories:4",
          "FlowerOfParadiseLost:2",
          "GildedDreams:2",
          "WanderersTroupe:2",
          "AubadeOfMorningstarAndMoon:2",
          "NightOfTheSkysUnveiling:2"
        ],
        "er_req": 200,
        "team": [
          {
            "role": "Support",
            "name": "Nilou",
            "element": "hydro"
          },
          {
            "role": "Support",
            "name": "Yaoyao",
            "element": "dendro"
          },
          {
            "role": "Sub-DPS",
            "name": "Lauma",
            "element": "dendro"
          }
        ]
      },
      "Support général": {
        "name": {
          "fr": "Support universel",
          "en": "Universal support"
        },
        "weights": {
          "critRate_": 0.4,
          "hp_": 1,
          "hp": 0.8,
          "enerRech_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "hp_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "hp_"
          ],
          "EQUIP_DRESS": [
            "hp_",
            "critRate_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "ScrollOfTheHeroOfCinderCity:4",
          "NoblesseOblige:4"
        ],
        "goodSets": [
          "Instructor:4",
          "SilkenMoonsSerenade:4",
          "EmblemOfSeveredFate:4",
          "TenacityOfTheMillelith:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "VourukashasGlow:2",
          "ScrollOfTheHeroOfCinderCity:2"
        ],
        "er_req": 200,
        "team": [
          {
            "role": "",
            "name": "",
            "element": ""
          },
          {
            "role": "",
            "name": "",
            "element": ""
          },
          {
            "role": "",
            "name": "",
            "element": ""
          }
        ]
      },
      "Applicatrice évaporation": {
        "name": {
          "fr": "Applicatrice Évaporation",
          "en": "Vape Enabler"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "hp_": 0.8,
          "hp": 0.1,
          "enerRech_": 1,
          "hydro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "hp_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "hydro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "ScrollOfTheHeroOfCinderCity:4",
          "NoblesseOblige:4"
        ],
        "goodSets": [
          "Instructor:4",
          "SilkenMoonsSerenade:4",
          "EmblemOfSeveredFate:4",
          "TenacityOfTheMillelith:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "VourukashasGlow:2",
          "ScrollOfTheHeroOfCinderCity:2",
          "HeartOfDepth:2",
          "NymphsDream:2"
        ],
        "er_req": 200,
        "team": [
          {
            "role": "DPS",
            "name": "Hutao",
            "element": "pyro"
          },
          {
            "role": "Sub-DPS",
            "name": "Yelan",
            "element": "hydro"
          },
          {
            "role": "Support",
            "name": "Zhongli",
            "element": "geo"
          }
        ]
      }
    }
  },
  "Charlotte": {
    "color": "#a64d6d",
    "portraitOffset": -37,
    "talents": {
      "auto": 1,
      "skill": 1,
      "burst": 10
    },
    "buffs": [
      {
        "category": {
          "fr": "A4 : Enquête de diversité",
          "en": "A4: Diversified investigation"
        },
        "selectMode": "exclusive",
        "buffs": [
          {
            "label": {
              "fr": "3 alliés de Fontaine (+15% Soins)",
              "en": "3 allies from Fontaine (+15% Healing)"
            },
            "active": true,
            "stats": {
              "heal_": 0.15
            }
          },
          {
            "label": {
              "fr": "2 Fontaine / 1 Autre (+10% Soins, +5% DGT Cryo)",
              "en": "2 allies from Fontaine / 1 Other (+10 Healing, +5% Cryo DMG)"
            },
            "active": false,
            "stats": {
              "heal_": 0.1,
              "cryo_dmg_": 0.05
            }
          },
          {
            "label": {
              "fr": "1 Fontaine / 2 Autres (+5% Soins, +10% DGT Cryo)",
              "en": "1 ally from Fontaine / 2 Others (+5% Healing, +10% Cryo DMG)"
            },
            "active": false,
            "stats": {
              "heal_": 0.05,
              "cryo_dmg_": 0.1
            }
          },
          {
            "label": {
              "fr": "3 alliés d'autres régions (+15% DGT Cryo)",
              "en": "3 allies from other regions (+15% Cryo DMG)"
            },
            "active": false,
            "stats": {
              "cryo_dmg_": 0.15
            }
          }
        ]
      },
      {
        "label": {
          "fr": "C2 : Une poursuite de la vérité (ATQ%)",
          "en": "C2: A duty to pursue truth (ATK%)"
        },
        "selectMode": "exclusive",
        "buffs": [
          {
            "label": {
              "fr": "1 ennemi touché",
              "en": "1 enemy hit"
            },
            "cons": 2,
            "active": false,
            "stats": {
              "atk_": 0.1
            }
          },
          {
            "label": {
              "fr": "2 ennemis touchés",
              "en": "2 enemies hit"
            },
            "cons": 2,
            "active": false,
            "stats": {
              "atk_": 0.2
            }
          },
          {
            "label": {
              "fr": "3 ennemis touchés ou +",
              "en": "3 or more enemies hit"
            },
            "cons": 2,
            "active": true,
            "stats": {
              "atk_": 0.3
            }
          }
        ]
      }
    ],
    "builds": {
      "Healer universel": {
        "name": {
          "fr": "Healeuse universelle",
          "en": "Universal healer"
        },
        "weights": {
          "critRate_": 0.4,
          "atk_": 1,
          "atk": 0.8,
          "enerRech_": 1,
          "heal_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "enerRech_",
            "atk_"
          ],
          "EQUIP_RING": [
            "atk_"
          ],
          "EQUIP_DRESS": [
            "heal_",
            "atk_",
            "critRate_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "NoblesseOblige:4",
          "TenacityOfTheMillelith:4",
          "OceanHuedClam:4"
        ],
        "goodSets": [
          "MaidenBeloved:4",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "MaidenBeloved:2",
          "OceanHuedClam:2",
          "SongOfDaysPast:2"
        ],
        "er_req": 200,
        "team": [
          {
            "role": "",
            "name": "",
            "element": ""
          },
          {
            "role": "",
            "name": "",
            "element": ""
          },
          {
            "role": "",
            "name": "",
            "element": ""
          }
        ]
      }
    }
  },
  "Chasca": {
    "color": "#3EABE0",
    "portraitOffset": -39,
    "talents": {
      "auto": 1,
      "skill": 10,
      "burst": 8
    },
    "builds": {
      "DPS Dispersion": {
        "label": {
          "fr": "DPS Dispersion",
          "en": "Swirl DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.3,
          "enerRech_": 0.1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "atk_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "bestSets": [
          "ObsidianCodex:4"
        ],
        "goodSets": [
          "ViridescentVenerer:4",
          "ShimenawasReminiscence:4",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2"
        ],
        "er_req": 110,
        "team": [
          {
            "role": "Support",
            "name": "Citlali",
            "element": "cryo"
          },
          {
            "role": "Support",
            "name": "Iansan",
            "element": "electro"
          },
          {
            "role": "Support",
            "name": "Bennett",
            "element": "pyro"
          }
        ]
      }
    }
  },
  "Chevreuse": {
    "color": "#c7445d",
    "portraitOffset": -36,
    "talents": {
      "auto": 1,
      "skill": 10,
      "burst": 6
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "A4 : Manœuvre de coordination tactique (ATQ% en fonction de PV max)",
              "en": "A4 : Vertical force coordination (ATK% depending on max HP)"
            },
            "active": true,
            "stats": {
              "atk__bonus_scaling": {
                "source": "hp",
                "percent": 0.00001,
                "max": 0.4
              }
            }
          }
        ]
      },
      {
        "category": "Constellations",
        "selectMode": "cumulative",
        "buffs": [
          {
            "label": {
              "fr": "C6 : Poursuite de l'anéantissement du mal (1 stack - DGTs Pyro, DGTs Électro)",
              "en": "C6 : In pursuit of ending evil (1 stack - Pyro DMG, Electro DMG)"
            },
            "cons": 6,
            "stats": {
              "elemental_dmg_": 0.2,
              "electro_dmg_": 0.2
            }
          },
          {
            "label": {
              "fr": "C6 : Poursuite de l'anéantissement du mal (2 stacks - DGTs Pyro, DGTs Électro)",
              "en": "C6: In pursuit of ending evil (2 stacks - Pyro DMG, Electro DMG)"
            },
            "cons": 6,
            "stats": {
              "elemental_dmg_": 0.2,
              "electro_dmg_": 0.2
            }
          },
          {
            "label": {
              "fr": "C6 : Poursuite de l'anéantissement du mal (3 stacks - DGTs Pyro, DGTs Électro)",
              "en": "C6: In pursuit of ending evil (3 stacks - Pyro DMG, Electro DMG)"
            },
            "cons": 6,
            "stats": {
              "elemental_dmg_": 0.2,
              "electro_dmg_": 0.2
            }
          }
        ]
      }
    ],
    "builds": {
      "Support Surcharge": {
        "name": {
          "fr": "Support Surcharge",
          "en": "Overload Support"
        },
        "weights": {
          "critRate_": 0.4,
          "hp_": 1,
          "hp": 0.8,
          "enerRech_": 1,
          "heal_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "enerRech_",
            "hp_"
          ],
          "EQUIP_RING": [
            "hp_"
          ],
          "EQUIP_DRESS": [
            "heal_",
            "hp_",
            "critRate_"
          ]
        },
        "hideUIStats": [
          "critDMG_",
          "eleMas"
        ],
        "showUIStats": [
          "atk",
          "electro_dmg_"
        ],
        "bestSets": [
          "NoblesseOblige:4"
        ],
        "goodSets": [
          "SongOfDaysPast:4",
          "ScrollOfTheHeroOfCinderCity:4",
          "TenacityOfTheMillelith:4",
          "TenacityOfTheMillelith:2",
          "VourukashasGlow:2",
          "MaidenBeloved:2",
          "OceanHuedClam:2",
          "SongOfDaysPast:2"
        ],
        "er_req": 170,
        "team": [
          {
            "role": "Flex",
            "name": "",
            "element": "pyro"
          },
          {
            "role": "Flex",
            "name": "",
            "element": "electro"
          },
          {
            "role": "Flex",
            "name": "",
            "element": "electro"
          }
        ]
      }
    }
  },
  "Chiori": {
    "color": "#D44B10",
    "portraitOffset": -37,
    "talents": {
      "auto": 1,
      "skill": 10,
      "burst": 8
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "A4 : Retouche finale (DGTs Géo)",
              "en": "A4: The finishing touch (Geo DMG)"
            },
            "active": true,
            "stats": {
              "geo_dmg_": 0.2
            }
          }
        ]
      }
    ],
    "builds": {
      "Sub-DPS Géo": {
        "name": {
          "fr": "Sub-DPS Géo",
          "en": "Geo Sub-DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.4,
          "def_": 0.8,
          "def": 0.1,
          "enerRech_": 0.6,
          "geo_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "def_"
          ],
          "EQUIP_RING": [
            "geo_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [
          "heal_"
        ],
        "showUIStats": [
          "atk"
        ],
        "bestSets": [
          "GoldenTroupe:4",
          "HuskOfOpulentDreams:4"
        ],
        "goodSets": [
          "GoldenTroupe:2",
          "HuskOfOpulentDreams:2",
          "ArchaicPetra:2"
        ],
        "er_req": 160,
        "team": [
          {
            "role": "DPS",
            "name": "Itto",
            "element": "geo"
          },
          {
            "role": "Support",
            "name": "Gorou",
            "element": "geo"
          },
          {
            "role": "Support",
            "name": "Zhongli",
            "element": "geo"
          }
        ]
      }
    }
  },
  "Chongyun": {
    "color": "#68b8db",
    "portraitOffset": -37,
    "talents": {
      "auto": 1,
      "skill": 9,
      "burst": 10
    },
    "builds": {
      "DPS Fonte": {
        "name": {
          "fr": "DPS Fonte",
          "en": "Melt DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.6,
          "enerRech_": 0.8,
          "cryo_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "eleMas",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "cryo_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "NoblesseOblige:4",
          "EmblemOfSeveredFate:4"
        ],
        "goodSets": [
          "GildedDreams:4",
          "Lavawalker:4",
          "BlizzardStrayer:2",
          "FinaleOfTheDeepGalleries:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 130,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Rosaria",
            "element": "cryo"
          },
          {
            "role": "Sub-DPS",
            "name": "Xiangling",
            "element": "pyro"
          },
          {
            "role": "Support",
            "name": "Bennett",
            "element": "pyro"
          }
        ]
      },
      "DPS Gel": {
        "name": {
          "fr": "DPS Gel",
          "en": "Freeze DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.8,
          "cryo_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "cryo_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "NoblesseOblige:4",
          "EmblemOfSeveredFate:4",
          "BlizzardStrayer:4",
          "MarechausseeHunter:4"
        ],
        "goodSets": [
          "Lavawalker:4",
          "BlizzardStrayer:2",
          "FinaleOfTheDeepGalleries:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2"
        ],
        "er_req": 130,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Furina",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Escoffier",
            "element": "cryo"
          },
          {
            "role": "Support",
            "name": "Citlali",
            "element": "cryo"
          }
        ]
      }
    }
  },
  "Citlali": {
    "color": "#d4a5ff",
    "portraitOffset": -35,
    "talents": {
      "auto": 1,
      "skill": 8,
      "burst": 8
    },
    "buffs": [
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C2 : Patrouille de dévoreur de cœurs (Maîtrise Élémentaire)",
              "en": "C2: Heart devourer's travail (EM)"
            },
            "cons": 2,
            "stats": {
              "eleMas": 125
            }
          }
        ]
      }
    ],
    "builds": {
      "Support universel (Fonte et Gel)": {
        "name": {
          "fr": "Support universel (Fonte et Gel)",
          "en": "Universal Support (Melt & Freeze)"
        },
        "weights": {
          "eleMas": 1,
          "enerRech_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "eleMas"
          ],
          "EQUIP_DRESS": [
            "eleMas"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [
          "hp"
        ],
        "bestSets": [
          "ScrollOfTheHeroOfCinderCity:4",
          "Instructor:4"
        ],
        "goodSets": [
          "TenacityOfTheMillelith:4",
          "GildedDreams:4",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2"
        ],
        "er_req": 180,
        "team": [
          {
            "role": "Flex",
            "name": [
              "Mavuika",
              "SkirkNew"
            ],
            "element": [
              "pyro",
              "cryo"
            ]
          },
          {
            "role": "Flex",
            "name": [
              "Xilonen",
              "Furina"
            ],
            "element": [
              "geo",
              "hydro"
            ]
          },
          {
            "role": "Flex",
            "name": [
              "Bennett",
              "Escoffier"
            ],
            "element": [
              "pyro",
              "cryo"
            ]
          }
        ]
      }
    }
  },
  "Clorinde": {
    "color": "#3939f6",
    "portraitOffset": -35,
    "talents": {
      "auto": 1,
      "skill": 10,
      "burst": 8
    },
    "buffs": [
      {
        "category": "Passifs",
        "selectMode": "cumulative",
        "buffs": [
          {
            "label": {
              "fr": "A4 : Rémunération honorant le pacte (1 Stack - Taux Crit)",
              "en": "A4: Lawful remuneration (1 Stack - Crit Rate)"
            },
            "active": true,
            "stats": {
              "critRate_": 0.1
            }
          },
          {
            "label": {
              "fr": "A4 : Rémunération honorant le pacte (2 Stacks - Taux Crit)",
              "en": "A4: Lawful remuneration (2 Stacks - Crit Rate)"
            },
            "active": true,
            "stats": {
              "critRate_": 0.1
            }
          }
        ]
      },
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C6 : « Ainsi, je ne désespérerai jamais plus » (Taux Crit, DGT Crit)",
              "en": "C6: \"And so shall I never despair\" (Crit Rate, Crit DMG)"
            },
            "cons": 6,
            "active": false,
            "stats": {
              "critRate_": 0.1,
              "critDMG_": 0.7
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Surcharge": {
        "name": {
          "fr": "DPS Surcharge",
          "en": "Overload DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.5,
          "electro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "electro_dmg_",
            "atk_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "FragmentOfHarmonicWhimsy:4"
        ],
        "goodSets": [
          "ThunderingFury:4",
          "GladiatorsFinale:4",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "ThunderingFury:2"
        ],
        "er_req": 130,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Durin",
            "element": "pyro"
          },
          {
            "role": "Support",
            "name": "Chevreuse",
            "element": "pyro"
          },
          {
            "role": "Sub-DPS",
            "name": "Fischl",
            "element": "electro"
          }
        ]
      },
      "DPS Suractivation": {
        "name": {
          "fr": "DPS Suractivation",
          "en": "Aggravate DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.6,
          "atk": 0.06,
          "eleMas": 0.8,
          "enerRech_": 0.5,
          "electro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "eleMas"
          ],
          "EQUIP_RING": [
            "electro_dmg_",
            "atk_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "FragmentOfHarmonicWhimsy:4"
        ],
        "goodSets": [
          "ThunderingFury:4",
          "GladiatorsFinale:4",
          "ThunderingFury:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 130,
        "team": [
          {
            "role": "Support",
            "name": "Nahida",
            "element": "dendro"
          },
          {
            "role": "Support",
            "name": "Lauma",
            "element": "dendro"
          },
          {
            "role": "Sub-DPS",
            "name": "Fischl",
            "element": "electro"
          }
        ]
      },
      "DPS Sélénocution": {
        "name": {
          "fr": "DPS Sélénocution",
          "en": "Lunar-Charged DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.4,
          "enerRech_": 0.5,
          "electro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "electro_dmg_",
            "atk_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "FragmentOfHarmonicWhimsy:4",
          "NightOfTheSkysUnveiling:4"
        ],
        "goodSets": [
          "ThunderingFury:4",
          "GladiatorsFinale:4",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "ThunderingFury:2"
        ],
        "er_req": 130,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Ineffa",
            "element": "electro"
          },
          {
            "role": "Sub-DPS",
            "name": "Columbina",
            "element": "hydro"
          },
          {
            "role": "Support",
            "name": "Sucrose",
            "element": "anemo"
          }
        ]
      }
    }
  },
  "Collei": {
    "color": "#86933b",
    "portraitOffset": -35,
    "talents": {
      "auto": 1,
      "skill": 6,
      "burst": 10
    },
    "buffs": [
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C1 : Patrouille sylvestre (off-field - Recharge d'énergie)",
              "en": "C1: Deepwood patrol (off-field - ER)"
            },
            "cons": 1,
            "active": true,
            "stats": {
              "enerRech_": 0.2
            }
          }
        ]
      }
    ],
    "builds": {
      "Sub-DPS universelle": {
        "name": {
          "fr": "Sub-DPS universelle",
          "en": "Universal Sub-DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.8,
          "enerRech_": 0.5,
          "dendro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "enerRech_",
            "eleMas",
            "atk_"
          ],
          "EQUIP_RING": [
            "dendro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "DeepwoodMemories:4",
          "ScrollOfTheHeroOfCinderCity:4",
          "Instructor:4",
          "GildedDreams:4"
        ],
        "goodSets": [
          "DeepwoodMemories:2",
          "ScrollOfTheHeroOfCinderCity:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2"
        ],
        "er_req": 200,
        "team": [
          {
            "role": "DPS",
            "name": "Shougun",
            "element": "electro"
          },
          {
            "role": "Sub-DPS",
            "name": "Fischl",
            "element": "electro"
          },
          {
            "role": "Support",
            "name": "Xilonen",
            "element": "geo"
          }
        ]
      },
      "Driver fleurissement": {
        "name": {
          "fr": "Driver Fleurissement",
          "en": "Bloom Driver"
        },
        "weights": {
          "critRate_": 0.4,
          "eleMas": 1,
          "enerRech_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "enerRech_",
            "eleMas"
          ],
          "EQUIP_RING": [
            "eleMas"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "eleMas"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [
          "atk"
        ],
        "bestSets": [
          "FlowerOfParadiseLost:4",
          "DeepwoodMemories:4",
          "ScrollOfTheHeroOfCinderCity:4",
          "Instructor:4",
          "GildedDreams:4"
        ],
        "goodSets": [
          "DeepwoodMemories:2",
          "ScrollOfTheHeroOfCinderCity:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2"
        ],
        "er_req": 200,
        "team": [
          {
            "role": "Support",
            "name": "Nilou",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Nahida",
            "element": "dendro"
          },
          {
            "role": "Support",
            "name": "Kokomi",
            "element": "hydro"
          }
        ]
      }
    }
  },
  "Columbina": {
    "color": "#1d65ff",
    "portraitOffset": -37,
    "talents": {
      "auto": 6,
      "skill": 8,
      "burst": 8
    },
    "buffs": [
      {
        "category": "Passifs",
        "selectMode": "exclusive",
        "data": [
          {
            "label": {
              "fr": "A1 : Appel de la lune (1 stack - Taux Crit)",
              "en": "A1: Lunacy's lure (1 stack - Crit Rate)"
            },
            "active": false,
            "stats": {
              "critRate_": 0.05
            }
          },
          {
            "label": {
              "fr": "A1 : Appel de la lune (2 stacks - Taux Crit)",
              "en": "A1: Lunacy's lure (2 stacks - Crit Rate)"
            },
            "active": false,
            "stats": {
              "critRate_": 0.1
            }
          },
          {
            "label": {
              "fr": "A1 : Appel de la lune (3 stacks - Taux Crit)",
              "en": "A1: Lunacy's lure (3 stacks - Crit Rate)"
            },
            "active": true,
            "stats": {
              "critRate_": 0.15
            }
          }
        ]
      },
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C2 : Nuit en splendeur, jamais solitaire (PV%)",
              "en": "C2: Not in lone splendor (HP%)"
            },
            "cons": 2,
            "stats": {
              "hp_": 0.4
            }
          },
          {
            "label": {
              "fr": "C6 : Nuit lugubre, lune à travers (uniquement sur un élément - DGT Crit)",
              "en": "C6: Through darkness led by moonlight (only for one element - Crit DMG)"
            },
            "cons": 6,
            "stats": {
              "critDMG_": "0.80"
            }
          }
        ]
      }
    ],
    "builds": {
      "Support sélénofleurissement": {
        "name": {
          "fr": "Support Sélénofleurissement",
          "en": "Lunar-Bloom Support"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "hp_": 0.9,
          "hp": 0.1,
          "eleMas": 0.4,
          "enerRech_": 0.8
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "enerRech_",
            "hp_"
          ],
          "EQUIP_RING": [
            "hp_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "bestSets": [
          "SilkenMoonsSerenade:4",
          "AubadeOfMorningstarAndMoon:4"
        ],
        "goodSets": [
          "TenacityOfTheMillelith:4",
          "Instructor:4",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "TenacityOfTheMillelith:2",
          "VourukashasGlow:2"
        ],
        "er_req": 180,
        "team": [
          {
            "role": "DPS",
            "name": "Nefer",
            "element": "dendro"
          },
          {
            "role": "Sub-DPS",
            "name": "Lauma",
            "element": "dendro"
          },
          {
            "role": "Flex",
            "name": [
              "Nahida",
              "Nilou"
            ],
            "element": [
              "dendro",
              "hydro"
            ]
          }
        ]
      },
      "Driver sélénofleurissement": {
        "name": {
          "fr": "Driver Sélénofleurissement",
          "en": "Lunar-Bloom Driver"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "hp_": 0.9,
          "hp": 0.1,
          "eleMas": 0.4,
          "enerRech_": 0.8
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "enerRech_",
            "hp_"
          ],
          "EQUIP_RING": [
            "hp_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "bestSets": [
          "NightOfTheSkysUnveiling:4"
        ],
        "goodSets": [
          "AubadeOfMorningstarAndMoon:4",
          "SilkenMoonsSerenade:4",
          "Instructor:4",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "TenacityOfTheMillelith:2",
          "VourukashasGlow:2"
        ],
        "er_req": 180,
        "team": [
          {
            "role": "Support",
            "name": "Nilou",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Lauma",
            "element": "dendro"
          },
          {
            "role": "Support",
            "name": "Nahida",
            "element": "dendro"
          }
        ]
      },
      "Support sélénocution": {
        "name": {
          "fr": "Support Sélénocution",
          "en": "Lunar-Charged Support"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "hp_": 0.9,
          "hp": 0.1,
          "eleMas": 0.4,
          "enerRech_": 0.8
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "enerRech_",
            "hp_"
          ],
          "EQUIP_RING": [
            "hp_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "bestSets": [
          "AubadeOfMorningstarAndMoon:4",
          "SilkenMoonsSerenade:4"
        ],
        "goodSets": [
          "TenacityOfTheMillelith:4",
          "Instructor:4",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "TenacityOfTheMillelith:2",
          "VourukashasGlow:2"
        ],
        "er_req": 180,
        "team": [
          {
            "role": "DPS",
            "name": "Flins",
            "element": "electro"
          },
          {
            "role": "Sub-DPS",
            "name": "Ineffa",
            "element": "electro"
          },
          {
            "role": "Support",
            "name": "Sucrose",
            "element": "anemo"
          }
        ]
      },
      "Support sélénocristallisation": {
        "name": {
          "fr": "Support Sélénocristallisation",
          "en": "Lunar-Crystallize Support"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "hp_": 0.9,
          "hp": 0.1,
          "eleMas": 0.4,
          "enerRech_": 0.8
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "enerRech_",
            "hp_"
          ],
          "EQUIP_RING": [
            "hp_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "bestSets": [
          "AubadeOfMorningstarAndMoon:4",
          "SilkenMoonsSerenade:4"
        ],
        "goodSets": [
          "TenacityOfTheMillelith:4",
          "Instructor:4",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "TenacityOfTheMillelith:2",
          "VourukashasGlow:2"
        ],
        "er_req": 180,
        "team": [
          {
            "role": "DPS",
            "name": "Zibai",
            "element": "geo"
          },
          {
            "role": "Support",
            "name": "Illuga",
            "element": "geo"
          },
          {
            "role": "Support",
            "name": "Linnea",
            "element": "geo"
          }
        ]
      }
    }
  },
  "Cyno": {
    "color": "#4D2A90",
    "portraitOffset": -36,
    "talents": {
      "auto": 1,
      "skill": 8,
      "burst": 10
    },
    "buffs": [
      {
        "category": {
          "fr": "Constellation 1 : Sacrement : Vigile incessante (Radiance - Maîtrise Élémentaire)",
          "en": "Constellation 1: Ordinance: Unceasing Vigil (Radiance - EM)"
        },
        "buffs": [
          {
            "label": {
              "fr": "En forme Éclaireur Sermenté",
              "en": "In the Pactsworn Pathclearer state"
            },
            "cons": 1,
            "stats": {
              "eleMas": 200
            }
          }
        ]
      },
      {
        "category": {
          "fr": "Constellation 2 : Cérémonie : Retour des esprits (DGTs Élémentaires)",
          "en": "Constellation 2: Ceremony: Homecoming of spirits (Elemental DMG)"
        },
        "selectMode": "exclusive",
        "buffs": [
          {
            "label": {
              "fr": "1 ennemi touché par l'attaque normale",
              "en": "1 enemy hit by normal attack"
            },
            "cons": 2,
            "stats": {
              "elemental_dmg_": 0.1
            }
          },
          {
            "label": {
              "fr": "2 ennemis touchés par l'attaque normale",
              "en": "2 enemies hit by normal attack"
            },
            "cons": 2,
            "stats": {
              "elemental_dmg_": 0.2
            }
          },
          {
            "label": {
              "fr": "3 ennemis touchés par l'attaque normale",
              "en": "3 enemies hit by normal attack"
            },
            "cons": 2,
            "stats": {
              "elemental_dmg_": 0.3
            }
          },
          {
            "label": {
              "fr": "4 ennemis touchés par l'attaque normale",
              "en": "4 enemies hit by normal attack"
            },
            "cons": 2,
            "stats": {
              "elemental_dmg_": 0.4
            }
          },
          {
            "label": {
              "fr": "5 ennemis touchés par l'attaque normale",
              "en": "5 enemies hit by normal attack"
            },
            "cons": 2,
            "stats": {
              "elemental_dmg_": 0.5
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Exubérance": {
        "name": {
          "fr": "DPS Exubérance",
          "en": "Hyperbloom DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.4,
          "atk": 0.1,
          "eleMas": 1,
          "enerRech_": 0.8,
          "electro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas",
            "atk_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "electro_dmg_",
            "eleMas"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "ThunderingFury:4",
          "GildedDreams:4"
        ],
        "goodSets": [
          "ThunderingFury:2",
          "GladiatorsFinale:4",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "FlowerOfParadiseLost:4"
        ],
        "er_req": 130,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Nahida",
            "element": "dendro"
          },
          {
            "role": "Sub-DPS",
            "name": "Yelan",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Shinobu",
            "element": "electro"
          }
        ]
      },
      "DPS Suractivation": {
        "name": {
          "fr": "DPS Suractivation",
          "en": "Aggravate DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.4,
          "atk": 0.1,
          "eleMas": 1,
          "enerRech_": 0.8,
          "electro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas",
            "atk_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "electro_dmg_",
            "eleMas"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "ThunderingFury:4",
          "GildedDreams:4"
        ],
        "goodSets": [
          "ThunderingFury:2",
          "GladiatorsFinale:4",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 130,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Nahida",
            "element": "dendro"
          },
          {
            "role": "Support",
            "name": "Baizhuer",
            "element": "dendro"
          },
          {
            "role": "Sub-DPS",
            "name": "Fischl",
            "element": "electro"
          }
        ]
      },
      "DPS Astroconduction": {
        "name": {
          "fr": "DPS Astroconduction",
          "en": "Stellar-Conduct DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.4,
          "enerRech_": 0.6
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "eleMas"
          ],
          "EQUIP_RING": [
            "atk_",
            "eleMas"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "DisenchantmentInDeepShadow:4",
          "GildedDreams:4"
        ],
        "goodSets": [
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 130,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Yae",
            "element": "electro"
          },
          {
            "role": "Support",
            "name": "Qiqi",
            "element": "cryo"
          },
          {
            "role": "DPS",
            "name": "MarionetteNew",
            "element": "cryo"
          }
        ]
      }
    }
  },
  "Dahlia": {
    "color": "#6d1833",
    "portraitOffset": -37,
    "talents": {
      "auto": 1,
      "skill": 1,
      "burst": 10
    },
    "builds": {
      "Support gel": {
        "name": {
          "fr": "Support Gel",
          "en": "Freeze Support"
        },
        "weights": {
          "critRate_": 0.4,
          "hp_": 1,
          "hp": 0.8,
          "enerRech_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "enerRech_",
            "hp_"
          ],
          "EQUIP_RING": [
            "hp_"
          ],
          "EQUIP_DRESS": [
            "hp_",
            "critRate_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "NoblesseOblige:4",
          "ScrollOfTheHeroOfCinderCity:4"
        ],
        "goodSets": [
          "ArchaicPetra:4",
          "ScrollOfTheHeroOfCinderCity:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "TenacityOfTheMillelith:2",
          "VourukashasGlow:2"
        ],
        "er_req": 200,
        "team": [
          {
            "role": "DPS",
            "name": "SkirkNew",
            "element": "cryo"
          },
          {
            "role": "Sub-DPS",
            "name": "Escoffier",
            "element": "cryo"
          },
          {
            "role": "Sub-DPS",
            "name": "Furina",
            "element": "hydro"
          }
        ]
      }
    }
  },
  "Dehya": {
    "color": "#B60000",
    "portraitOffset": -37,
    "talents": {
      "auto": 1,
      "skill": 8,
      "burst": 8
    },
    "buffs": [
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C6 : Brûlante griffe de clivage (uniquement le déchaînement - Taux Crit, DGT Crit)",
              "en": "C6: The burning claws cleaving (only the burst - Crit Rate, Crit DMG)"
            },
            "cons": 6,
            "active": false,
            "stats": {
              "critRate_": 0.1,
              "critDMG_": 0.6
            }
          }
        ]
      }
    ],
    "builds": {
      "Sub-DPS": {
        "name": {
          "fr": "Sub-DPS",
          "en": "Sub-DPS"
        },
        "weights": {
          "hp_": 1,
          "hp": 0.1,
          "eleMas": 0.4
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "hp_",
            "eleMas"
          ],
          "EQUIP_RING": [
            "hp_",
            "eleMas"
          ],
          "EQUIP_DRESS": [
            "hp_",
            "eleMas",
            "critRate_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "TenacityOfTheMillelith:4",
          "ScrollOfTheHeroOfCinderCity:4",
          "Instructor:4"
        ],
        "goodSets": [
          "SilkenMoonsSerenade:4",
          "DeepwoodMemories:4",
          "TenacityOfTheMillelith:2",
          "VourukashasGlow:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 100,
        "team": [
          {
            "role": "DPS",
            "name": "Mualani",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Émilie",
            "element": "dendro"
          },
          {
            "role": "Flex",
            "name": [
              "Nahida",
              "Xilonen"
            ],
            "element": [
              "dendro",
              "geo"
            ]
          }
        ]
      },
      "DPS Évaporation": {
        "name": {
          "fr": "DPS Évaporation",
          "en": "Vape DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "hp_": 0.1,
          "eleMas": 0.6,
          "enerRech_": 0.8,
          "pyro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "enerRech_",
            "eleMas",
            "atk_"
          ],
          "EQUIP_RING": [
            "pyro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [
          "heal_"
        ],
        "showUIStats": [
          "hp"
        ],
        "bestSets": [
          "MarechausseeHunter:4",
          "VourukashasGlow:4",
          "EmblemOfSeveredFate:4"
        ],
        "goodSets": [
          "NightOfTheSkysUnveiling:4",
          "UnfinishedReverie:4",
          "LongNightsOath:4",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "CrimsonWitchOfFlames:2"
        ],
        "er_req": 180,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Furina",
            "element": "hydro"
          },
          {
            "role": "Support",
            "name": "Bennett",
            "element": "pyro"
          },
          {
            "role": "Flex",
            "name": [
              "Kazuha",
              "Xilonen"
            ],
            "element": [
              "anemo",
              "geo"
            ]
          }
        ]
      }
    }
  },
  "Diluc": {
    "color": "#ca4a35",
    "portraitOffset": -37,
    "skins": {
      "201601": {
        "color": "#ff3818",
        "portraitOffset": -37
      }
    },
    "talents": {
      "auto": 10,
      "skill": 10,
      "burst": 8
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "A4 : Bénédiction du phénix (DGTs Pyro)",
              "en": "A4: Blessing of phoenix (Pyro DMG)"
            },
            "active": true,
            "stats": {
              "elemental_dmg_": 0.2
            }
          }
        ]
      },
      {
        "category": {
          "fr": "C2 : Chaleur des cendres (ATQ%)",
          "en": "C2: Searing ember (ATK%)"
        },
        "selectMode": "Cumulative",
        "buffs": [
          {
            "label": {
              "fr": "1 stack",
              "en": "1 stack"
            },
            "cons": 2,
            "stats": {
              "atk_": 0.1
            }
          },
          {
            "label": {
              "fr": "2 stacks",
              "en": "2 stacks"
            },
            "cons": 2,
            "stats": {
              "atk_": 0.1
            }
          },
          {
            "label": {
              "fr": "3 stacks",
              "en": "3 stacks"
            },
            "cons": 2,
            "stats": {
              "atk_": 0.1
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Évaporation": {
        "name": {
          "fr": "DPS Évaporation",
          "en": "Vape DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.6,
          "enerRech_": 0.4,
          "pyro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "eleMas"
          ],
          "EQUIP_RING": [
            "pyro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "CrimsonWitchOfFlames:4",
          "MarechausseeHunter:4"
        ],
        "goodSets": [
          "GildedDreams:4",
          "GladiatorsFinale:4",
          "CrimsonWitchOfFlames:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2"
        ],
        "er_req": 110,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Yelan",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Furina",
            "element": "hydro"
          },
          {
            "role": "Support",
            "name": "Bennett",
            "element": "pyro"
          }
        ]
      },
      "DPS Fonte": {
        "name": {
          "fr": "DPS Fonte",
          "en": "Melt DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.6,
          "enerRech_": 0.4,
          "pyro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "eleMas"
          ],
          "EQUIP_RING": [
            "pyro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "CrimsonWitchOfFlames:4"
        ],
        "goodSets": [
          "GildedDreams:4",
          "GladiatorsFinale:4",
          "CrimsonWitchOfFlames:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 110,
        "team": [
          {
            "role": "Support",
            "name": "Citlali",
            "element": "cryo"
          },
          {
            "role": "Support",
            "name": "Kazuha",
            "element": "anemo"
          },
          {
            "role": "Support",
            "name": "Bennett",
            "element": "pyro"
          }
        ]
      },
      "DPS Mono-pyro": {
        "name": {
          "fr": "DPS Mono-pyro",
          "en": "Mono-pyro DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.4,
          "pyro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "pyro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "Lavawalker:4"
        ],
        "goodSets": [
          "CrimsonWitchOfFlames:4",
          "GladiatorsFinale:4",
          "CrimsonWitchOfFlames:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2"
        ],
        "er_req": 110,
        "team": [
          {
            "role": "Support",
            "name": "Xiangling",
            "element": "pyro"
          },
          {
            "role": "Support",
            "name": "Kazuha",
            "element": "anemo"
          },
          {
            "role": "Support",
            "name": "Bennett",
            "element": "pyro"
          }
        ]
      }
    }
  },
  "Diona": {
    "color": "#252572",
    "portraitOffset": -36,
    "talents": {
      "auto": 1,
      "skill": 10,
      "burst": 8
    },
    "buffs": [
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C6 : Dernière tournée (PV > 50% - EM)",
              "en": "C6: Cat's tail closing time (HP > 50% - EM)"
            },
            "cons": 6,
            "stats": {
              "eleMas": 200
            }
          }
        ]
      }
    ],
    "builds": {
      "Shieldeuse universelle": {
        "name": {
          "fr": "Shieldeuse universelle",
          "en": "Universal Shielder"
        },
        "weights": {
          "critRate_": 0.4,
          "hp_": 1,
          "hp": 0.8,
          "enerRech_": 0.6,
          "heal_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "hp_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "hp_"
          ],
          "EQUIP_DRESS": [
            "heal_",
            "hp_",
            "critRate_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "NoblesseOblige:4",
          "TenacityOfTheMillelith:2",
          "VourukashasGlow:2",
          "MaidenBeloved:2",
          "OceanHuedClam:2",
          "SongOfDaysPast:2"
        ],
        "goodSets": [
          "TenacityOfTheMillelith:4",
          "Instructor:4",
          "DeepwoodMemories:4"
        ],
        "er_req": 100,
        "team": [
          {
            "role": "",
            "name": "",
            "element": ""
          },
          {
            "role": "",
            "name": "",
            "element": ""
          },
          {
            "role": "",
            "name": "",
            "element": ""
          }
        ]
      }
    }
  },
  "Dori": {
    "color": "#9774cd",
    "portraitOffset": -37,
    "talents": {
      "auto": 1,
      "skill": 8,
      "burst": 8
    },
    "buffs": [
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C4 : Supplément discrétionnaire (si ER < 50% - Recharge d'énergie)",
              "en": "C4: Discretionary supplement (if ER < 50% - ER)"
            },
            "cons": 4,
            "active": false,
            "stats": {
              "enerRech_": 0.3
            }
          }
        ]
      }
    ],
    "builds": {
      "Driver Suractivation": {
        "name": {
          "fr": "Driver Suractivation",
          "en": "Aggravate Driver"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.8,
          "enerRech_": 0.6,
          "electro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "electro_dmg_",
            "eleMas"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "GildedDreams:4",
          "ThunderingFury:4"
        ],
        "goodSets": [
          "Thundersoother:4",
          "NoblesseOblige:4",
          "DeepwoodMemories:4",
          "OceanHuedClam:4",
          "Instructor:4",
          "TheExile:4",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "MaidenBeloved:2",
          "OceanHuedClam:2",
          "SongOfDaysPast:2"
        ],
        "er_req": 140,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Fischl",
            "element": "electro"
          },
          {
            "role": "Sub-DPS",
            "name": "Nahida",
            "element": "dendro"
          },
          {
            "role": "Support",
            "name": "Kazuha",
            "element": "anemo"
          }
        ]
      },
      "Driver Exubérance": {
        "name": {
          "fr": "Driver Exubérance",
          "en": "Hyperbloom Driver"
        },
        "weights": {
          "critRate_": 0.4,
          "eleMas": 1,
          "enerRech_": 0.6
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "eleMas"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "eleMas"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [
          "atk"
        ],
        "bestSets": [
          "GildedDreams:4",
          "FlowerOfParadiseLost:4"
        ],
        "goodSets": [
          "NoblesseOblige:4",
          "DeepwoodMemories:4",
          "OceanHuedClam:4",
          "Instructor:4",
          "TheExile:4",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 140,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Yelan",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Nahida",
            "element": "dendro"
          },
          {
            "role": "Support",
            "name": "Qin",
            "element": "anemo"
          }
        ]
      }
    }
  },
  "Durin": {
    "color": "#92417E",
    "portraitOffset": -37,
    "skins": {
      "212301": {
        "color": "#ff5f75",
        "portraitOffset": -37
      }
    },
    "talents": {
      "auto": 1,
      "skill": 8,
      "burst": 8
    },
    "buffs": [
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C2 : Visions sans fond (DGTs Pyro)",
              "en": "C2: Unground visions (Pyro DMG)"
            },
            "cons": 2,
            "stats": {
              "pyro_dmg_": 0.5
            }
          }
        ]
      }
    ],
    "builds": {
      "Sub-DPS Surcharge": {
        "name": {
          "fr": "Sub-DPS Surcharge",
          "en": "Overload Sub-DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.8,
          "pyro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "atk_",
            "pyro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "bestSets": [
          "ADayCarvedFromRisingWinds:4"
        ],
        "goodSets": [
          "NoblesseOblige:4",
          "NoblesseOblige:2",
          "EmblemOfSeveredFate:4",
          "Instructor:4",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2"
        ],
        "er_req": 130,
        "team": [
          {
            "role": "DPS",
            "name": [
              "Arlecchino",
              "Varesa"
            ],
            "element": [
              "pyro",
              "electro"
            ]
          },
          {
            "role": "Sub-DPS",
            "name": "Fischl",
            "element": "electro"
          },
          {
            "role": "Support",
            "name": "Chevreuse",
            "element": "pyro"
          }
        ]
      },
      "Sub-DPS Brûlure": {
        "name": {
          "fr": "Sub-DPS Brûlure",
          "en": "Burning Sub-DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.8,
          "pyro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "atk_",
            "pyro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "bestSets": [
          "ADayCarvedFromRisingWinds:4"
        ],
        "goodSets": [
          "NoblesseOblige:4",
          "NoblesseOblige:2",
          "EmblemOfSeveredFate:4",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "Instructor:4"
        ],
        "er_req": 130,
        "team": [
          {
            "role": "DPS",
            "name": "Kinich",
            "element": "dendro"
          },
          {
            "role": "Sub-DPS",
            "name": "Emilie",
            "element": "dendro"
          },
          {
            "role": "Support",
            "name": "Bennett",
            "element": "pyro"
          }
        ]
      },
      "Sub-DPS universel": {
        "name": {
          "fr": "Sub-DPS universel",
          "en": "Universal Sub-DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.8,
          "pyro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "atk_",
            "pyro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "bestSets": [
          "ADayCarvedFromRisingWinds:4"
        ],
        "goodSets": [
          "NoblesseOblige:4",
          "NoblesseOblige:2",
          "EmblemOfSeveredFate:4",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "Instructor:4"
        ],
        "er_req": 150,
        "team": [
          {
            "role": "DPS",
            "name": "Chasca",
            "element": "anemo"
          },
          {
            "role": "Sub-DPS",
            "name": "Furina",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Fischl",
            "element": "electro"
          }
        ]
      }
    }
  },
  "Escoffier": {
    "color": "#4CBCFD",
    "portraitOffset": -35,
    "talents": {
      "auto": 1,
      "skill": 8,
      "burst": 6
    },
    "buffs": [
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C1 : Danse pour les papilles gustatives (DGT Crit)",
              "en": "C1: Pre-dinner dance for your taste buds (Crit DMG)"
            },
            "cons": 1,
            "stats": {
              "critDMG_": 0.6
            }
          }
        ]
      }
    ],
    "builds": {
      "Sub-DPS Gel": {
        "name": {
          "fr": "Sub-DPS Gel",
          "en": "Freeze Sub-DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.7,
          "cryo_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "cryo_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "bestSets": [
          "GoldenTroupe:4"
        ],
        "goodSets": [
          "BlizzardStrayer:4",
          "NoblesseOblige:4",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "BlizzardStrayer:2",
          "FinaleOfTheDeepGalleries:2"
        ],
        "er_req": 170,
        "team": [
          {
            "role": "DPS",
            "name": "SkirkNew",
            "element": "cryo"
          },
          {
            "role": "Sub-DPS",
            "name": "Furina",
            "element": "hydro"
          },
          {
            "role": "Flex",
            "element": [
              "hydro",
              "cryo"
            ]
          }
        ]
      }
    }
  },
  "Eula": {
    "color": "#63bce6",
    "portraitOffset": -36,
    "talents": {
      "auto": 9,
      "skill": 8,
      "burst": 10
    },
    "buffs": [
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C1 : Illusion des marées (DGTs Physiques)",
              "en": "C1: Tidal illusion (Physical DMG)"
            },
            "cons": 1,
            "stats": {
              "physical_dmg_": 0.3
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Physique": {
        "name": {
          "fr": "DPS Physique",
          "en": "Physical DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.8,
          "physical_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "physical_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [
          "heal_"
        ],
        "showUIStats": [
          "physical_dmg_"
        ],
        "bestSets": [
          "PaleFlame:4"
        ],
        "goodSets": [
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "BloodstainedChivalry:2",
          "PaleFlame:2"
        ],
        "er_req": 140,
        "team": [
          {
            "role": "Support",
            "name": "Mika",
            "element": "cryo"
          },
          {
            "role": "Support",
            "name": "Diona",
            "element": "cryo"
          },
          {
            "role": "Sub-DPS",
            "name": "Fischl",
            "element": "electro"
          }
        ]
      }
    }
  },
  "Faruzan": {
    "color": "#5591a0",
    "portraitOffset": -37,
    "talents": {
      "auto": 1,
      "skill": 8,
      "burst": 10
    },
    "buffs": [
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C6 : Merveilleux chemin de la vérité (dans le déchaînement - DGT Crit)",
              "en": "C6: The wondrous path of truth (in the burst - Crit DMG)"
            },
            "cons": 6,
            "stats": {
              "critDMG_": 0.4
            }
          }
        ]
      }
    ],
    "builds": {
      "Support Anémo": {
        "name": {
          "fr": "Support Anémo",
          "en": "Anemo Support"
        },
        "weights": {
          "critRate_": 0.4,
          "atk_": 1,
          "atk": 0.8,
          "enerRech_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "enerRech_",
            "atk_"
          ],
          "EQUIP_RING": [
            "atk_"
          ],
          "EQUIP_DRESS": [
            "atk_",
            "critRate_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "TenacityOfTheMillelith:4",
          "NoblesseOblige:4",
          "ViridescentVenerer:4"
        ],
        "goodSets": [
          "GoldenTroupe:4",
          "TheExile:4",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2"
        ],
        "er_req": 220,
        "team": [
          {
            "role": "Flex",
            "name": [
              "Xiao",
              "Wanderer"
            ],
            "element": [
              "anemo",
              "anemo"
            ]
          },
          {
            "role": "",
            "name": "",
            "element": ""
          },
          {
            "role": "",
            "name": "",
            "element": ""
          }
        ]
      }
    }
  },
  "Fischl": {
    "color": "#3c1e71",
    "portraitOffset": -37,
    "skins": {
      "203101": {
        "color": "#5732e3",
        "portraitOffset": -37
      }
    },
    "talents": {
      "auto": 1,
      "skill": 10,
      "burst": 9
    },
    "buffs": [
      {
        "category": "Passifs",
        "selectMode": "exclusive",
        "buffs": [
          {
            "label": {
              "fr": "Hexerei : Nocturne fantomatique (Surcharge - ATQ%)",
              "en": "Hexerei: Phantasmal nocturne (Overload - ATK%)"
            },
            "stats": {
              "atk_": 0.225
            }
          },
          {
            "label": {
              "fr": "Hexerei : Nocturne fantomatique (Électrocution ou Sélénocution - EM)",
              "en": "Hexerei: Phantasmal nocturne (Electro-Charged or Lunar-Charged - EM)"
            },
            "stats": {
              "eleMas": 90
            }
          }
        ]
      },
      {
        "category": "Constellations",
        "selectMode": "exclusive",
        "buffs": [
          {
            "label": {
              "fr": "C6 Hexerei : Oiseau de la nuit éternelle (Surcharge - ATQ%)",
              "en": "C6 Hexerei: Evernight raven (Overload - ATK%)"
            },
            "cons": 6,
            "stats": {
              "atk_": 0.225
            }
          },
          {
            "label": {
              "fr": "C6 Hexerei : Oiseau de la nuit éternelle (Électrocution ou Sélénocution - EM)",
              "en": "C6 Hexerei: Evernight raven (Electro-Chared or Lunar-Charged - EM)"
            },
            "cons": 6,
            "stats": {
              "eleMas": 90
            }
          }
        ]
      }
    ],
    "builds": {
      "Sub-DPS Surcharge Hexerei": {
        "name": {
          "fr": "Sub-DPS Surcharge Hexerei",
          "en": "Hexerei Overload Sub-DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.6,
          "electro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "electro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "GoldenTroupe:4"
        ],
        "goodSets": [
          "Thundersoother:4",
          "TenacityOfTheMillelith:4",
          "ThunderingFury:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2"
        ],
        "er_req": 140,
        "team": [
          {
            "role": "DPS",
            "name": "Clorinde",
            "element": "electro"
          },
          {
            "role": "Sub-DPS",
            "name": "Durin",
            "element": "pyro"
          },
          {
            "role": "Support",
            "name": "Chevreuse",
            "element": "pyro"
          }
        ]
      },
      "Sub-DPS Suractivation": {
        "name": {
          "fr": "Sub-DPS Suractivation",
          "en": "Aggravate Sub-DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.8,
          "enerRech_": 0.6,
          "electro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "enerRech_",
            "eleMas"
          ],
          "EQUIP_RING": [
            "electro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "GoldenTroupe:4",
          "GildedDreams:4"
        ],
        "goodSets": [
          "Thundersoother:4",
          "TenacityOfTheMillelith:4",
          "ThunderingFury:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 140,
        "team": [
          {
            "role": "DPS",
            "name": "Tighnari",
            "element": "dendro"
          },
          {
            "role": "Sub-DPS",
            "name": "Shinobu",
            "element": "electro"
          },
          {
            "role": "Support",
            "name": "Kazuha",
            "element": "anemo"
          }
        ]
      }
    }
  },
  "Flins": {
    "color": "#6163E8",
    "portraitOffset": -35,
    "talents": {
      "auto": 1,
      "skill": 8,
      "burst": 10
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "A4 : Murmure de flamme (Maîtrise élémentaire)",
              "en": "A4: Whispering flame (EM)"
            },
            "active": true,
            "maxCons": 3,
            "stats": {
              "eleMas_bonus_scaling": {
                "source": "atk",
                "percent": 0.08,
                "max": 160
              }
            }
          }
        ]
      },
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C4 : Nuit sur la montagne nue (Maîtrise élémentaire)",
              "en": "C4: Night on bald mountain (EM)"
            },
            "cons": 4,
            "active": true,
            "stats": {
              "eleMas_bonus_scaling": {
                "source": "atk",
                "percent": 0.1,
                "max": 220
              }
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Sélénocution": {
        "name": {
          "fr": "DPS Sélénocution",
          "en": "Lunar-Charged DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.4,
          "enerRech_": 0.6
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "atk_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "bestSets": [
          "NightOfTheSkysUnveiling:4"
        ],
        "goodSets": [
          "GildedDreams:4",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 130,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Ineffa",
            "element": "electro"
          },
          {
            "role": "Support",
            "name": "Columbina",
            "element": "hydro"
          },
          {
            "role": "Support",
            "name": "Sucrose",
            "element": "anemo"
          }
        ]
      }
    }
  },
  "Fréminet": {
    "color": "#394a74",
    "portraitOffset": -38,
    "talents": {
      "auto": 9,
      "skill": 10,
      "burst": 8
    },
    "buffs": [
      {
        "category": {
          "fr": "C1 : Rêves des profondeurs mousseuses (Taux Crit)",
          "en": "C1: Dreams of the foamy deep (Crit Rate)"
        },
        "buffs": [
          {
            "label": {
              "fr": "Uniquement la compétence",
              "en": "Only the skill"
            },
            "cons": 1,
            "active": false,
            "stats": {
              "critRate_": 0.15
            }
          }
        ]
      },
      {
        "category": {
          "fr": "C4 : Danse de lune et de flûte (ATQ%)",
          "en": "C4: Dance of the snowy moon and flute (ATK%)"
        },
        "selectMode": "cumulative",
        "buffs": [
          {
            "label": {
              "fr": "Réaction Cryo déclenchée (1 stack)",
              "en": "Cryo reaction triggered (1 stack)"
            },
            "cons": 4,
            "stats": {
              "atk_": 0.09
            }
          },
          {
            "label": {
              "fr": "Réaction Cryo déclenchée (2 stacks)",
              "en": "Cryo reaction triggered (2 stacks)"
            },
            "cons": 4,
            "stats": {
              "atk_": 0.09
            }
          }
        ]
      },
      {
        "category": {
          "fr": "C6 : Instant d'aube et de détermination (DGT Crit)",
          "en": "C6: Moment of waking and resolve (Crit DMG)"
        },
        "selectMode": "cumulative",
        "buffs": [
          {
            "label": {
              "fr": "Réaction Cryo déclenchée (1 stack)",
              "en": "Cryo reaction triggered (1 stack)"
            },
            "cons": 6,
            "stats": {
              "critDMG_": 0.12
            }
          },
          {
            "label": {
              "fr": "Réaction Cryo déclenchée (2 stacks)",
              "en": "Cryo reaction triggered (2 stacks)"
            },
            "cons": 6,
            "stats": {
              "critDMG_": 0.12
            }
          },
          {
            "label": {
              "fr": "Réaction Cryo déclenchée (3 stacks)",
              "en": "Cryo reaction triggered (3 stacks)"
            },
            "cons": 6,
            "stats": {
              "critDMG_": 0.12
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Physique": {
        "name": {
          "fr": "DPS Physique",
          "en": "Physical DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.5,
          "physical_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "physical_dmg_",
            "atk_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "PaleFlame:4",
          "MarechausseeHunter:4"
        ],
        "goodSets": [
          "BlizzardStrayer:4",
          "PaleFlame:2",
          "BloodstainedChivalry:2",
          "GoldenTroupe:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2"
        ],
        "er_req": 130,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Furina",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Escoffier",
            "element": "cryo"
          },
          {
            "role": "Flex",
            "name": [
              "Fischl",
              "Yae"
            ],
            "element": [
              "electro",
              "electro"
            ]
          }
        ]
      },
      "DPS Cryo": {
        "name": {
          "fr": "DPS Cryo",
          "en": "Cryo DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.5,
          "cryo_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "cryo_dmg_",
            "atk_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "BlizzardStrayer:4",
          "GoldenTroupe:4"
        ],
        "goodSets": [
          "MarechausseeHunter:4",
          "PaleFlame:4",
          "BlizzardStrayer:2",
          "GoldenTroupe:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2"
        ],
        "er_req": 130,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Furina",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Escoffier",
            "element": "cryo"
          },
          {
            "role": "Support",
            "name": "Shenhe",
            "element": "cryo"
          }
        ]
      }
    }
  },
  "Furina": {
    "color": "#4e9eff",
    "portraitOffset": -37,
    "talents": {
      "auto": 1,
      "skill": 8,
      "burst": 10
    },
    "buffs": [
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C2 : « Comme la plume au vent, femme est volage » (Bonus Max - PV%)",
              "en": "C2: \"A Woman Adapts Like Duckweed in Water\" (Max Buff - HP%)"
            },
            "cons": 2,
            "stats": {
              "hp_": 1.4
            }
          }
        ]
      }
    ],
    "builds": {
      "Support et Sub-DPS universel": {
        "name": {
          "fr": "Support et Sub-DPS universel",
          "en": "Universal Support & Sub-DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "hp_": 1,
          "hp": 0.1,
          "enerRech_": 1,
          "hydro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "enerRech_",
            "hp_"
          ],
          "EQUIP_RING": [
            "hp_",
            "hydro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "bestSets": [
          "GoldenTroupe:4",
          "TenacityOfTheMillelith:4"
        ],
        "goodSets": [
          "OceanHuedClam:4",
          "NoblesseOblige:4",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "HeartOfDepth:2",
          "NymphsDream:2",
          "TenacityOfTheMillelith:2",
          "VourukashasGlow:2"
        ],
        "er_req": 180,
        "team": [
          {
            "role": "DPS",
            "name": "Neuvillette",
            "element": "hydro"
          },
          {
            "role": "Support",
            "name": "Xilonen",
            "element": "geo"
          },
          {
            "role": "Support",
            "name": "Kazuha",
            "element": "anemo"
          }
        ]
      }
    }
  },
  "Gaming": {
    "color": "#d96155",
    "portraitOffset": -36,
    "talents": {
      "auto": 8,
      "skill": 10,
      "burst": 9
    },
    "buffs": [
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C2 : Sur les fleurs de prunier (ATQ%)",
              "en": "C2: Plum blossoms underfoot (ATK%)"
            },
            "cons": 2,
            "active": true,
            "stats": {
              "atk_": 0.2
            }
          },
          {
            "label": {
              "fr": "C6 : En apprivoisant les bêtes (uniquement l'attaque plongée de la compétence - Taux Crit, DGT Crit)",
              "en": "C6: To tame all beasts (only the plunging attack from the skill - Crit Rate, Crit DMG)"
            },
            "cons": 6,
            "active": false,
            "stats": {
              "critRate_": 0.2,
              "critDMG_": 0.4
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Évaporation": {
        "name": {
          "fr": "DPS Évaporation",
          "en": "Vape DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.6,
          "enerRech_": 0.8,
          "pyro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas",
            "atk_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "pyro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "CrimsonWitchOfFlames:4",
          "MarechausseeHunter:4",
          "LongNightsOath:4"
        ],
        "goodSets": [
          "GildedDreams:4",
          "VermillionHereafter:4",
          "LongNightsOath:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "CrimsonWitchOfFlames:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 150,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Furina",
            "element": "hydro"
          },
          {
            "role": "Support",
            "name": "Liuyun",
            "element": "anemo"
          },
          {
            "role": "Support",
            "name": "Bennett",
            "element": "pyro"
          }
        ]
      },
      "DPS Fonte": {
        "name": {
          "fr": "DPS Fonte",
          "en": "Melt DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.6,
          "enerRech_": 0.8,
          "pyro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas",
            "atk_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "pyro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "CrimsonWitchOfFlames:4",
          "LongNightsOath:4"
        ],
        "goodSets": [
          "GildedDreams:4",
          "VermillionHereafter:4",
          "LongNightsOath:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "CrimsonWitchOfFlames:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 150,
        "team": [
          {
            "role": "Support",
            "name": "Citlali",
            "element": "cryo"
          },
          {
            "role": "Support",
            "name": "Liuyun",
            "element": "anemo"
          },
          {
            "role": "Support",
            "name": "Bennett",
            "element": "pyro"
          }
        ]
      },
      "DPS Surcharge": {
        "name": {
          "fr": "DPS Surcharge",
          "en": "Overload DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.8,
          "pyro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "pyro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "CrimsonWitchOfFlames:4",
          "LongNightsOath:4"
        ],
        "goodSets": [
          "VermillionHereafter:4",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "CrimsonWitchOfFlames:2"
        ],
        "er_req": 150,
        "team": [
          {
            "role": "Support",
            "name": "Chevreuse",
            "element": "pyro"
          },
          {
            "role": "Sub-DPS",
            "name": "Fischl",
            "element": "electro"
          },
          {
            "role": "Support",
            "name": [
              "Bennett",
              "Iansan"
            ],
            "element": [
              "pyro",
              "electro"
            ]
          }
        ]
      }
    }
  },
  "Ganyu": {
    "color": "#6dc5ff",
    "portraitOffset": -37,
    "skins": {
      "203701": {
        "color": "#4e72e6",
        "portraitOffset": -37
      }
    },
    "talents": {
      "auto": 10,
      "skill": 6,
      "burst": 8
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "A1 : Cœur indivisible (uniquement les attaques chargées - Taux Crit)",
              "en": "A1: Undivided Heart (only charged attacks - Crit Rate)"
            },
            "active": false,
            "stats": {
              "critRate_": 0.2
            }
          },
          {
            "label": {
              "fr": "A4 : Harmonie du ciel et de la terre (DGT Cryo)",
              "en": "A4: Harmony between heaven and earth (Cryo DMG)"
            },
            "active": true,
            "stats": {
              "elemental_dmg_": 0.2
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Gel": {
        "name": {
          "fr": "DPS Gel",
          "en": "Freeze DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.3,
          "cryo_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "cryo_dmg_",
            "atk_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "BlizzardStrayer:4",
          "MarechausseeHunter:4",
          "WanderersTroupe:4"
        ],
        "goodSets": [
          "BlizzardStrayer:2",
          "FinaleOfTheDeepGalleries:2",
          "MarechausseeHunter:2",
          "ShimenawasReminiscence:4",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2"
        ],
        "er_req": 110,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Furina",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Escoffier",
            "element": "cryo"
          },
          {
            "role": "Support",
            "name": "Shenhe",
            "element": "cryo"
          }
        ]
      },
      "DPS Fonte": {
        "name": {
          "fr": "DPS Fonte",
          "en": "Melt DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.6,
          "cryo_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "eleMas"
          ],
          "EQUIP_RING": [
            "cryo_dmg_",
            "atk_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "UnfinishedReverie:4",
          "BlizzardStrayer:4",
          "WanderersTroupe:4"
        ],
        "goodSets": [
          "BlizzardStrayer:2",
          "FinaleOfTheDeepGalleries:2",
          "MarechausseeHunter:2",
          "ShimenawasReminiscence:4",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2"
        ],
        "er_req": 100,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Emilie",
            "element": "dendro"
          },
          {
            "role": "Sub-DPS",
            "name": "Xiangling",
            "element": "pyro"
          },
          {
            "role": "Support",
            "name": "Bennett",
            "element": "pyro"
          }
        ]
      }
    }
  },
  "Gorou": {
    "color": "#7a4e28",
    "portraitOffset": -37,
    "talents": {
      "auto": 1,
      "skill": 10,
      "burst": 6
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "A1 : Nonchalance du vent et de la pluie (DÉF%)",
              "en": "A1: Heedless of the wind and weather (DEF%)"
            },
            "active": true,
            "stats": {
              "def_": 0.25
            }
          }
        ]
      },
      {
        "category": "Constellations",
        "selectMode": "exclusive",
        "buffs": [
          {
            "label": {
              "fr": "C6 : Vaillance de la bête (1 Géo / Pied Ferme - DGT Crit)",
              "en": "C6: Valiant hound: Mountainous Fealty (1 Geo / Standing Firm - Crit DMG)"
            },
            "cons": 6,
            "active": false,
            "stats": {
              "critDMG_": 0.1
            }
          },
          {
            "label": {
              "fr": "C6 : Vaillance de la bête (2 Géo / Imprenabilité - DGT Crit)",
              "en": "C6: Valiant hound: Mountainous Fealty (2 Geo / Impregnable - Crit DMG)"
            },
            "cons": 6,
            "active": false,
            "stats": {
              "critDMG_": 0.2
            }
          },
          {
            "label": {
              "fr": "C6 : Vaillance de la bête (3 Géo+ / Fracas - DGT Crit)",
              "en": "C6: Valiant hound: Mountainous Fealty (3 Geo+ / Crunch - Crit DMG)"
            },
            "cons": 6,
            "active": true,
            "stats": {
              "critDMG_": 0.4
            }
          }
        ]
      }
    ],
    "builds": {
      "Support Géo": {
        "name": {
          "fr": "Support Géo",
          "en": "Geo Support"
        },
        "weights": {
          "critRate_": 0.4,
          "def_": 0.4,
          "def": 0.1,
          "enerRech_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "enerRech_"
          ],
          "EQUIP_RING": [
            "def_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "def_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "ScrollOfTheHeroOfCinderCity:4",
          "TheExile:4"
        ],
        "goodSets": [
          "NoblesseOblige:4",
          "Instructor:4",
          "SilkenMoonsSerenade:4",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2"
        ],
        "er_req": 220,
        "team": [
          {
            "role": "DPS",
            "name": "Itto",
            "element": "geo"
          },
          {
            "role": "Sub-DPS",
            "name": "Chiori",
            "element": "geo"
          },
          {
            "role": "Support",
            "name": "Zhongli",
            "element": "geo"
          }
        ]
      }
    }
  },
  "Hu Tao": {
    "color": "#D33933",
    "portraitOffset": -40,
    "skins": {
      "204601": {
        "color": "#234bda",
        "portraitOffset": -36
      }
    },
    "talents": {
      "auto": 10,
      "skill": 10,
      "burst": 8
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "A4 : Sang bouillant (PV <= 50% - DGTs Pyro)",
              "en": "A4: Sanguine rouge (HP <= 50% - Pyro DMG)"
            },
            "active": true,
            "stats": {
              "pyro_dmg_": 0.33
            }
          }
        ]
      },
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C6 : L'envol du papillon (Si Hu Tao meurt - Taux Crit)",
              "en": "C6: Butterfly's Embrace (If Hu Tao dies - Crit Rate)"
            },
            "cons": 6,
            "active": false,
            "stats": {
              "critRate_": 1
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Évaporation": {
        "name": {
          "fr": "DPS Évaporation",
          "en": "Vape DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.1,
          "hp_": 0.8,
          "hp": 0.1,
          "eleMas": 0.6,
          "enerRech_": 0.1,
          "pyro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas",
            "hp_"
          ],
          "EQUIP_RING": [
            "pyro_dmg_",
            "hp_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "bestSets": [
          "CrimsonWitchOfFlames:4",
          "ShimenawasReminiscence:4",
          "MarechausseeHunter:4"
        ],
        "goodSets": [
          "CrimsonWitchOfFlames:2",
          "TenacityOfTheMillelith:2",
          "VourukashasGlow:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 120,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Yelan",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Xingqiu",
            "element": "hydro"
          },
          {
            "role": "Support",
            "name": "Zhongli",
            "element": "geo"
          }
        ]
      },
      "DPS Fonte": {
        "name": {
          "fr": "DPS Fonte",
          "en": "Melt DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.1,
          "hp_": 0.8,
          "hp": 0.1,
          "eleMas": 0.6,
          "enerRech_": 0.1,
          "pyro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas",
            "hp_"
          ],
          "EQUIP_RING": [
            "pyro_dmg_",
            "hp_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "bestSets": [
          "CrimsonWitchOfFlames:4",
          "ShimenawasReminiscence:4",
          "MarechausseeHunter:4"
        ],
        "goodSets": [
          "CrimsonWitchOfFlames:2",
          "GildedDreams:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "TenacityOfTheMillelith:2",
          "VourukashasGlow:2"
        ],
        "er_req": 120,
        "team": [
          {
            "role": "Support",
            "name": "Rosaria",
            "element": "cryo"
          },
          {
            "role": "Support",
            "name": "Kazuha",
            "element": "anemo"
          },
          {
            "role": "Support",
            "name": "Citlali",
            "element": "cryo"
          }
        ]
      }
    }
  },
  "Iansan": {
    "color": "#593cb5",
    "portraitOffset": -35,
    "talents": {
      "auto": 1,
      "skill": 1,
      "burst": 10
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "A1 : Formation de résistance améliorée (ATQ%)",
              "en": "A1: Enhanced resistance training (ATK%)"
            },
            "active": true,
            "stats": {
              "atk_": 0.2
            }
          }
        ]
      }
    ],
    "builds": {
      "Support universel": {
        "name": {
          "fr": "Support universel",
          "en": "Universal Support"
        },
        "weights": {
          "critRate_": 0.4,
          "atk_": 1,
          "atk": 0.8,
          "enerRech_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "enerRech_",
            "atk_"
          ],
          "EQUIP_RING": [
            "atk_"
          ],
          "EQUIP_DRESS": [
            "atk_",
            "critRate_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "ScrollOfTheHeroOfCinderCity:4",
          "NoblesseOblige:4"
        ],
        "goodSets": [
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2"
        ],
        "er_req": 170,
        "team": [
          {
            "role": "",
            "name": "",
            "element": ""
          },
          {
            "role": "",
            "name": "",
            "element": ""
          },
          {
            "role": "",
            "name": "",
            "element": ""
          }
        ]
      }
    }
  },
  "Ifa": {
    "color": "#23aba4",
    "portraitOffset": -38,
    "talents": {
      "auto": 1,
      "skill": 8,
      "burst": 8
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "A4 : Accord d'entraide (Éruption Noctâme - Maîtrise élémentaire)",
              "en": "A4: Mutual aid agreement (Nightsoul Burst - EM)"
            },
            "active": true,
            "stats": {
              "eleMas": 80
            }
          }
        ]
      },
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C4 : Permutation de vaisseau en décomposition (utilisation du déchaînement - Maîtrise élémentaire)",
              "en": "C4: Decayed vessel's permutation (when burst is used - EM)"
            },
            "cons": 4,
            "stats": {
              "eleMas": 100
            }
          }
        ]
      }
    ],
    "builds": {
      "Driver dispersion": {
        "name": {
          "fr": "Driver Dispersion",
          "en": "Swirl Driver"
        },
        "weights": {
          "critRate_": 0.4,
          "eleMas": 1,
          "enerRech_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "eleMas"
          ],
          "EQUIP_DRESS": [
            "eleMas",
            "heal_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [
          "atk"
        ],
        "bestSets": [
          "ViridescentVenerer:4"
        ],
        "goodSets": [
          "ScrollOfTheHeroOfCinderCity:4",
          "GildedDreams:4",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2"
        ],
        "er_req": 170,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Olorun",
            "element": "electro"
          },
          {
            "role": "Support",
            "name": "Aino",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Ineffa",
            "element": "electro"
          }
        ]
      }
    }
  },
  "Illuga": {
    "color": "#826351",
    "portraitOffset": -35,
    "talents": {
      "auto": 1,
      "skill": 1,
      "burst": 10
    },
    "builds": {
      "Support Sélénocristallisation": {
        "name": {
          "fr": "Support Sélénocristallisation",
          "en": "Lunar-Crystallize Support"
        },
        "weights": {
          "critRate_": 0.4,
          "def_": 0.4,
          "def": 0.1,
          "eleMas": 1,
          "enerRech_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "eleMas"
          ],
          "EQUIP_DRESS": [
            "eleMas",
            "critRate_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "SilkenMoonsSerenade:4",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2"
        ],
        "goodSets": [
          "Instructor:4",
          "ScrollOfTheHeroOfCinderCity:4",
          "NoblesseOblige:4",
          "TheExile:4",
          "TenacityOfTheMillelith:4"
        ],
        "er_req": 150,
        "team": [
          {
            "role": "DPS",
            "name": "Zibai",
            "element": "geo"
          },
          {
            "role": "Sub-DPS",
            "name": "Columbina",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Linnea",
            "element": "geo"
          }
        ]
      }
    }
  },
  "Ineffa": {
    "color": "#4fbfff",
    "portraitOffset": -37,
    "talents": {
      "auto": 1,
      "skill": 10,
      "burst": 8
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "A4 : Protocole de permutation panoramique (Maîtrise élémentaire)",
              "en": "A4: Panoramic permutation protocol (EM)"
            },
            "active": true,
            "stats": {
              "eleMas_bonus_scaling": {
                "source": "atk",
                "percent": 0.06
              }
            }
          }
        ]
      }
    ],
    "builds": {
      "Sub-DPS Sélénocution": {
        "name": {
          "fr": "Sub-DPS Sélénocution",
          "en": "Lunar-Charged Sub-DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.4,
          "enerRech_": 0.6
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "atk_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "bestSets": [
          "AubadeOfMorningstarAndMoon:4",
          "SilkenMoonsSerenade:4"
        ],
        "goodSets": [
          "GildedDreams:4",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 160,
        "team": [
          {
            "role": "DPS",
            "name": "Flins",
            "element": "electro"
          },
          {
            "role": "Sub-DPS",
            "name": "Columbina",
            "element": "hydro"
          },
          {
            "role": "Support",
            "name": "Sucrose",
            "element": "anemo"
          }
        ]
      }
    }
  },
  "Jahoda": {
    "color": "#aaaab4",
    "portraitOffset": -36,
    "talents": {
      "auto": 1,
      "skill": 10,
      "burst": 8
    },
    "buffs": [
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C6 : La chance la plus petite (Taux Crit, DGT Crit)",
              "en": "C6: The littlest luck (Crit Rate, Crit DMG)"
            },
            "cons": 6,
            "stats": {
              "critrate_": 0.05,
              "critDMG_": 0.4
            }
          }
        ]
      }
    ],
    "builds": {
      "Healer Sélène": {
        "name": {
          "fr": "Healer Sélène",
          "en": "Lunar Healer"
        },
        "weights": {
          "critRate_": 0.4,
          "atk_": 1,
          "atk": 0.8,
          "enerRech_": 1,
          "heal_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "enerRech_",
            "atk_"
          ],
          "EQUIP_RING": [
            "atk_"
          ],
          "EQUIP_DRESS": [
            "heal_",
            "atk_",
            "critRate_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "ViridescentVenerer:4",
          "SilkenMoonsSerenade:4"
        ],
        "goodSets": [
          "TenacityOfTheMillelith:4",
          "Instructor:4",
          "DeepwoodMemories:4",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2"
        ],
        "er_req": 230,
        "team": [
          {
            "role": "DPS",
            "name": "Nefer",
            "element": "dendro"
          },
          {
            "role": "Sub-DPS",
            "name": "Columbina",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Lauma",
            "element": "dendro"
          }
        ]
      }
    }
  },
  "Jean": {
    "color": "#45cab1",
    "portraitOffset": -37,
    "skins": {
      "200301": {
        "color": "#3a84ed",
        "portraitOffset": -37
      }
    },
    "talents": {
      "auto": 1,
      "skill": 8,
      "burst": 10
    },
    "builds": {
      "Support universel": {
        "name": {
          "fr": "Support universel",
          "en": "Universal Support"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.8,
          "anemo_dmg_": 1,
          "heal_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "anemo_dmg_",
            "atk_"
          ],
          "EQUIP_DRESS": [
            "heal_",
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "ViridescentVenerer:4"
        ],
        "goodSets": [
          "NoblesseOblige:4",
          "OceanHuedClam:4",
          "ViridescentVenerer:2",
          "DesertPavilionChronicle:2",
          "NoblesseOblige:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "MaidenBeloved:2",
          "OceanHuedClam:2",
          "SongOfDaysPast:2"
        ],
        "er_req": 140,
        "team": [
          {
            "role": "DPS",
            "name": "Xiao",
            "element": "anemo"
          },
          {
            "role": "Sub-DPS",
            "name": "Albedo",
            "element": "geo"
          },
          {
            "role": "Support",
            "name": "Zhongli",
            "element": "geo"
          }
        ]
      },
      "Sunfire": {
        "name": {
          "fr": "Sunfire",
          "en": "Sunfire"
        },
        "weights": {
          "critRate_": 0.4,
          "critDMG_": 0.4,
          "atk_": 0.4,
          "atk": 0.1,
          "eleMas": 1,
          "enerRech_": 0.8,
          "anemo_dmg_": 1,
          "heal_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "eleMas"
          ],
          "EQUIP_DRESS": [
            "eleMas"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "ViridescentVenerer:4",
          "GildedDreams:4"
        ],
        "goodSets": [
          "NoblesseOblige:4",
          "OceanHuedClam:4",
          "ViridescentVenerer:2",
          "DesertPavilionChronicle:2",
          "NoblesseOblige:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 180,
        "team": [
          {
            "role": "Support",
            "name": "Bennett",
            "element": "pyro"
          },
          {
            "role": "Flex",
            "name": "",
            "element": "electro"
          },
          {
            "role": "Flex",
            "name": "",
            "element": "hydro"
          }
        ]
      }
    }
  },
  "Kachina": {
    "color": "#cd6e0c",
    "portraitOffset": -40,
    "talents": {
      "auto": 1,
      "skill": 10,
      "burst": 8
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "A1 : Écho de la montagne (DGTs Géo)",
              "en": "A1: Mountain echoes (Geo DMG)"
            },
            "active": true,
            "stats": {
              "elemental_dmg_": 0.2
            }
          }
        ]
      },
      {
        "category": {
          "fr": "C4 : Ennemis nombreux, attention redoublée (DÉF%)",
          "en": "C4: More foes, more caution (DEF%)"
        },
        "selectMode": "exclusive",
        "buffs": [
          {
            "label": {
              "fr": "1 ennemi",
              "en": "1 enemy"
            },
            "cons": 4,
            "active": false,
            "stats": {
              "def_": 0.08
            }
          },
          {
            "label": {
              "fr": "2 ennemis",
              "en": "2 enemies"
            },
            "cons": 4,
            "active": true,
            "stats": {
              "def_": 0.12
            }
          },
          {
            "label": {
              "fr": "3 ennemis",
              "en": "3 enemies"
            },
            "cons": 4,
            "active": false,
            "stats": {
              "def_": 0.16
            }
          },
          {
            "label": {
              "fr": "4 ennemis",
              "en": "4 enemies"
            },
            "cons": 4,
            "active": false,
            "stats": {
              "def_": 0.2
            }
          }
        ]
      }
    ],
    "builds": {
      "Support universel": {
        "name": {
          "fr": "Support universel",
          "en": "Universal Support"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "def_": 1,
          "def": 0.8,
          "enerRech_": 0.4,
          "geo_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "def_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "geo_dmg_",
            "def_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "ScrollOfTheHeroOfCinderCity:4"
        ],
        "goodSets": [
          "ArchaicPetra:4",
          "NoblesseOblige:4",
          "TenacityOfTheMillelith:4",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2"
        ],
        "er_req": 120,
        "team": [
          {
            "role": "",
            "name": "",
            "element": ""
          },
          {
            "role": "",
            "name": "",
            "element": ""
          },
          {
            "role": "",
            "name": "",
            "element": ""
          }
        ]
      }
    }
  },
  "Kaedehara Kazuha": {
    "color": "#2c9c7f",
    "portraitOffset": -36,
    "talents": {
      "auto": 1,
      "skill": 6,
      "burst": 8
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "A4 : Haïku de la brise (DGTs Élémentaires)",
              "en": "A4: Poetics of Fuubutsu (Elemental DMG)"
            },
            "stats": {
              "elemental_dmg_bonus_scaling": {
                "source": "eleMas",
                "percent": 0.04
              }
            }
          }
        ]
      },
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C2 : Zanshin des montagnes cruelles (Maîtrise élémentaire)",
              "en": "C2: Yamaarashi tailwind (EM)"
            },
            "cons": 2,
            "stats": {
              "eleMas": 200
            }
          }
        ]
      }
    ],
    "builds": {
      "Support universel": {
        "name": {
          "fr": "Support universel",
          "en": "Universal Support"
        },
        "weights": {
          "critRate_": 0.4,
          "critDMG_": 0.4,
          "atk_": 0.4,
          "atk": 0.1,
          "eleMas": 1,
          "enerRech_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "eleMas"
          ],
          "EQUIP_DRESS": [
            "eleMas"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "ViridescentVenerer:4"
        ],
        "goodSets": [
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2"
        ],
        "er_req": 200,
        "team": [
          {
            "role": "Flex",
            "name": [],
            "element": [
              "pyro",
              "cryo"
            ]
          },
          {
            "role": "Flex",
            "name": [],
            "element": [
              "electro",
              "hydro"
            ]
          },
          {
            "role": "Flex"
          }
        ]
      }
    }
  },
  "Kaeya": {
    "color": "#28657c",
    "portraitOffset": -37,
    "skins": {
      "201501": {
        "color": "#4b4cb0",
        "portraitOffset": -35
      }
    },
    "talents": {
      "auto": 1,
      "skill": 9,
      "burst": 10
    },
    "buffs": [
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C1 : Lignée de l'excellence (uniquement les NA et CA sur un ennemi affecté par Cryo - Taux Crit)",
              "en": "C1: Excellent blood (only normal and charged attacks on enemies affected by Cryo - Crit Rate)"
            },
            "cons": 1,
            "active": false,
            "stats": {
              "critRate_": 0.15
            }
          }
        ]
      }
    ],
    "builds": {
      "Sub-DPS Fonte": {
        "name": {
          "fr": "Sub-DPS Fonte",
          "en": "Melt Sub-DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.6,
          "enerRech_": 0.8,
          "cryo_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas",
            "atk_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "cryo_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "EmblemOfSeveredFate:4",
          "GildedDreams:4"
        ],
        "goodSets": [
          "BlizzardStrayer:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "BlizzardStrayer:2",
          "FinaleOfTheDeepGalleries:2"
        ],
        "er_req": 220,
        "team": [
          {
            "role": "DPS",
            "name": "Mavuika",
            "element": "pyro"
          },
          {
            "role": "Support",
            "name": "Xilonen",
            "element": "geo"
          },
          {
            "role": "Support",
            "name": "Bennett",
            "element": "pyro"
          }
        ]
      },
      "Sub-DPS Gel": {
        "name": {
          "fr": "Sub-DPS Gel",
          "en": "Freeze Sub-DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.8,
          "cryo_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "cryo_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "BlizzardStrayer:4",
          "EmblemOfSeveredFate:4"
        ],
        "goodSets": [
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "BlizzardStrayer:2",
          "FinaleOfTheDeepGalleries:2"
        ],
        "er_req": 150,
        "team": [
          {
            "role": "DPS",
            "name": "SkirkNew",
            "element": "cryo"
          },
          {
            "role": "Sub-DPS",
            "name": "Furina",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Escoffier",
            "element": "cryo"
          }
        ]
      }
    }
  },
  "Kamisato Ayaka": {
    "color": "#71d0ff",
    "portraitOffset": -36.5,
    "skins": {
      "200201": {
        "color": "#9d897d",
        "portraitOffset": -36.5
      }
    },
    "talents": {
      "auto": 9,
      "skill": 8,
      "burst": 10
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "A4 : Bénédiction de Kanten Senmyou (DGTs Cryo)",
              "en": "A4: Kanten Senmyou blessing (Cryo DMG)"
            },
            "stats": {
              "elemental_dmg_": 0.18
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Gel": {
        "name": {
          "fr": "DPS Gel",
          "en": "Freeze DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.6,
          "cryo_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "cryo_dmg_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_",
            "atk_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "BlizzardStrayer:4",
          "MarechausseeHunter:4"
        ],
        "goodSets": [
          "BlizzardStrayer:2",
          "GladiatorsFinale:4",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "BlizzardStrayer:2",
          "FinaleOfTheDeepGalleries:2"
        ],
        "er_req": 140,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Furina",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Escoffier",
            "element": "cryo"
          },
          {
            "role": "Flex",
            "name": [
              ""
            ],
            "element": [
              "cryo",
              "hydro"
            ]
          }
        ]
      }
    }
  },
  "Kamisato Ayato": {
    "color": "#428de7",
    "portraitOffset": -34,
    "talents": {
      "auto": 1,
      "skill": 10,
      "burst": 8
    },
    "buffs": [
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C2 : Source du monde (PV%)",
              "en": "C2: World source (HP%)"
            },
            "cons": 2,
            "stats": {
              "hp_": 0.5
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Hydro": {
        "name": {
          "fr": "DPS Hydro",
          "en": "Hydro DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "hp_": 0.4,
          "enerRech_": 0.4,
          "hydro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "hydro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "hideUIStats": [
          "heal_"
        ],
        "showUIStats": [
          "hp"
        ],
        "bestSets": [
          "HeartOfDepth:4",
          "GladiatorsFinale:4",
          "NymphsDream:4"
        ],
        "goodSets": [
          "EchoesOfAnOffering:4",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "HeartOfDepth:2",
          "NymphsDream:2"
        ],
        "er_req": 120,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Furina",
            "element": "hydro"
          },
          {
            "role": "Support",
            "name": "Yunjin",
            "element": "geo"
          },
          {
            "role": "Support",
            "name": "Xilonen",
            "element": "geo"
          }
        ]
      },
      "DPS Gel": {
        "name": {
          "fr": "DPS Gel",
          "en": "Freeze DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "hp_": 0.4,
          "enerRech_": 0.4,
          "hydro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "hydro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "hideUIStats": [
          "heal_"
        ],
        "showUIStats": [
          "hp"
        ],
        "bestSets": [
          "HeartOfDepth:4",
          "GladiatorsFinale:4",
          "NymphsDream:4",
          "MarechausseeHunter:4"
        ],
        "goodSets": [
          "EchoesOfAnOffering:4",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "HeartOfDepth:2",
          "NymphsDream:2"
        ],
        "er_req": 120,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Furina",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Escoffier",
            "element": "cryo"
          },
          {
            "role": "Flex",
            "name": [
              "Yelan",
              "Citlali"
            ],
            "element": [
              "hydro",
              "cryo"
            ]
          }
        ]
      },
      "Driver Exubérance": {
        "name": {
          "fr": "Driver Exubérance",
          "en": "Hyperbloom Driver"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "hp_": 0.4,
          "enerRech_": 0.6,
          "hydro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "hydro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "hideUIStats": [
          "heal_"
        ],
        "showUIStats": [
          "hp"
        ],
        "bestSets": [
          "HeartOfDepth:4",
          "GladiatorsFinale:4",
          "NymphsDream:4"
        ],
        "goodSets": [
          "EchoesOfAnOffering:4",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "HeartOfDepth:2",
          "NymphsDream:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2"
        ],
        "er_req": 140,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Shinobu",
            "element": "electro"
          },
          {
            "role": "Support",
            "name": "Nahida",
            "element": "dendro"
          },
          {
            "role": "Sub-DPS",
            "name": "Fischl",
            "element": "electro"
          }
        ]
      },
      "Driver Fleurissement": {
        "name": {
          "fr": "Driver Fleurissement",
          "en": "Bloom Driver"
        },
        "weights": {
          "eleMas": 1,
          "enerRech_": 0.8
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas"
          ],
          "EQUIP_RING": [
            "eleMas"
          ],
          "EQUIP_DRESS": [
            "eleMas"
          ]
        },
        "hideUIStats": [
          "heal_"
        ],
        "showUIStats": [
          "hp",
          "atk"
        ],
        "bestSets": [
          "FlowerOfParadiseLost:4",
          "GildedDreams:4"
        ],
        "goodSets": [
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 170,
        "team": [
          {
            "role": "Support",
            "name": "Nilou",
            "element": "hydro"
          },
          {
            "role": "Flex",
            "name": [
              "Lauma",
              "Nahida"
            ],
            "element": [
              "dendro",
              "dendro"
            ]
          },
          {
            "role": "Support",
            "name": "Baizhuer",
            "element": "dendro"
          }
        ]
      },
      "DPS Électrocution": {
        "name": {
          "fr": "DPS Électrocution",
          "en": "Electro-Charged DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "hp_": 0.4,
          "enerRech_": 0.4,
          "hydro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "hydro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "hideUIStats": [
          "heal_"
        ],
        "showUIStats": [
          "hp"
        ],
        "bestSets": [
          "HeartOfDepth:4",
          "GladiatorsFinale:4",
          "NymphsDream:4"
        ],
        "goodSets": [
          "EchoesOfAnOffering:4",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "HeartOfDepth:2",
          "NymphsDream:2"
        ],
        "er_req": 120,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Fischl",
            "element": "electro"
          },
          {
            "role": "Sub-DPS",
            "name": "Ineffa",
            "element": "electro"
          },
          {
            "role": "Support",
            "name": "Sucrose",
            "element": "anemo"
          }
        ]
      },
      "DPS Évaporation": {
        "name": {
          "fr": "DPS Évaporation",
          "en": "Vape DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "hp_": 0.4,
          "eleMas": 0.6,
          "enerRech_": 0.4,
          "hydro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "eleMas"
          ],
          "EQUIP_RING": [
            "hydro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "hideUIStats": [
          "heal_"
        ],
        "showUIStats": [
          "hp"
        ],
        "bestSets": [
          "HeartOfDepth:4",
          "GladiatorsFinale:4",
          "NymphsDream:4"
        ],
        "goodSets": [
          "EchoesOfAnOffering:4",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "HeartOfDepth:2",
          "NymphsDream:2"
        ],
        "er_req": 120,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Furina",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Xiangling",
            "element": "pyro"
          },
          {
            "role": "Support",
            "name": "Bennett",
            "element": "pyro"
          }
        ]
      }
    }
  },
  "Kaveh": {
    "color": "#308b3b",
    "portraitOffset": -36,
    "talents": {
      "auto": 8,
      "skill": 8,
      "burst": 10
    },
    "buffs": [
      {
        "category": {
          "fr": "A4 : Extravagance d'un artisan (Maîtrise élémentaire)",
          "en": "A4: A craftsman's curious conceptions (EM)"
        },
        "selectMode": "cumulative",
        "buffs": [
          {
            "label": {
              "fr": "1 stack",
              "en": "1 stack"
            },
            "stats": {
              "eleMas": 25
            }
          },
          {
            "label": {
              "fr": "2 stacks",
              "en": "2 stacks"
            },
            "stats": {
              "eleMas": 25
            }
          },
          {
            "label": {
              "fr": "3 stacks",
              "en": "3 stacks"
            },
            "stats": {
              "eleMas": 25
            }
          },
          {
            "label": {
              "fr": "4 stacks",
              "en": "4 stacks"
            },
            "stats": {
              "eleMas": 25
            }
          }
        ]
      }
    ],
    "builds": {
      "Driver Dendro": {
        "name": {
          "fr": "Driver Dendro",
          "en": "Dendro Driver"
        },
        "weights": {
          "critRate_": 0.4,
          "eleMas": 1,
          "enerRech_": 0.8,
          "heal_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "eleMas"
          ],
          "EQUIP_DRESS": [
            "eleMas",
            "critRate_",
            "heal_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [
          "atk"
        ],
        "bestSets": [
          "DeepwoodMemories:4",
          "OceanHuedClam:4",
          "Instructor:4"
        ],
        "goodSets": [
          "FlowerOfParadiseLost:4",
          "GildedDreams:4",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 200,
        "team": [
          {
            "role": "Flex",
            "name": "",
            "element": "hydro"
          },
          {
            "role": "Flex",
            "name": "",
            "element": [
              "hydro",
              "electro"
            ]
          },
          {
            "role": "Flex",
            "name": "",
            "element": "dendro"
          }
        ]
      }
    }
  },
  "Keqing": {
    "color": "#673885",
    "portraitOffset": -37,
    "skins": {
      "204201": {
        "color": "#2c46f7",
        "portraitOffset": -37
      }
    },
    "talents": {
      "auto": 10,
      "skill": 9,
      "burst": 8
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "A4 : Trésor de l'Alioth (après déchaînement - Taux Crit, Recharge d'énergie)",
              "en": "A4: Aristocratic dignity (after the burst - Crit Rate, ER)"
            },
            "active": false,
            "stats": {
              "critRate_": 0.15,
              "enerRech_": 0.15
            }
          }
        ]
      },
      {
        "category": {
          "fr": "Constellation 4 : Syntonie (ATQ%)",
          "en": "Constellation4 : Attunement (ATK%)"
        },
        "buffs": [
          {
            "label": {
              "fr": "Après réaction Électro",
              "en": "After Electro reaction"
            },
            "cons": 4,
            "stats": {
              "atk_": 0.25
            }
          }
        ]
      },
      {
        "category": {
          "fr": "Constellation 6 : Étoile tenace (DGTs Électro)",
          "en": "Constellation 6: Tenacious star (Electro DMG)"
        },
        "selectMode": "Cumulative",
        "buffs": [
          {
            "label": {
              "fr": "Attaque normale",
              "en": "Normal attack"
            },
            "cons": 6,
            "stats": {
              "elemental_dmg_": 0.06
            }
          },
          {
            "label": {
              "fr": "Attaque chargée",
              "en": "Charged attack"
            },
            "cons": 6,
            "stats": {
              "elemental_dmg_": 0.06
            }
          },
          {
            "label": {
              "fr": "Compétence élémentaire",
              "en": "Elemental skill"
            },
            "cons": 6,
            "stats": {
              "elemental_dmg_": 0.06
            }
          },
          {
            "label": {
              "fr": "Déchaînement élémentaire",
              "en": "Elemental burst"
            },
            "cons": 6,
            "stats": {
              "elemental_dmg_": 0.06
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Suractivation": {
        "name": {
          "fr": "DPS Suractivation",
          "en": "Aggravate DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.8,
          "electro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "eleMas"
          ],
          "EQUIP_RING": [
            "electro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "ThunderingFury:4",
          "GildedDreams:4"
        ],
        "goodSets": [
          "Thundersoother:4",
          "ThunderingFury:2",
          "GladiatorsFinale:4",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 100,
        "team": [
          {
            "role": "Support",
            "name": "Nahida",
            "element": "dendro"
          },
          {
            "role": "Sub-DPS",
            "name": "Fischl",
            "element": "electro"
          },
          {
            "role": "Support",
            "name": "Kazuha",
            "element": "anemo"
          }
        ]
      },
      "DPS Surcharge": {
        "name": {
          "fr": "DPS Surcharge",
          "en": "Overload DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "electro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "electro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "ThunderingFury:4",
          "GladiatorsFinale:4"
        ],
        "goodSets": [
          "Thundersoother:4",
          "ThunderingFury:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2"
        ],
        "er_req": 100,
        "team": [
          {
            "role": "Support",
            "name": "Chevreuse",
            "element": "pyro"
          },
          {
            "role": "Sub-DPS",
            "name": "Fischl",
            "element": "electro"
          },
          {
            "role": "Sub-DPS",
            "name": "Xiangling",
            "element": "pyro"
          }
        ]
      },
      "DPS Sélénocution": {
        "name": {
          "fr": "DPS Sélénocution",
          "en": "Lunar-Charged DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.4,
          "electro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "electro_dmg_",
            "atk_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "ThunderingFury:4",
          "MarechausseeHunter:4",
          "NightOfTheSkysUnveiling:4"
        ],
        "goodSets": [
          "Thundersoother:4",
          "ThunderingFury:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "GladiatorsFinale:4",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 100,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Furina",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Ineffa",
            "element": "electro"
          },
          {
            "role": "Support",
            "name": "Qin",
            "element": "anemo"
          }
        ]
      }
    }
  },
  "Kinich": {
    "color": "#0b3b24",
    "portraitOffset": -35,
    "talents": {
      "auto": 1,
      "skill": 10,
      "burst": 8
    },
    "buffs": [
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C1 : Bec de perroquet (uniquement le canon - DGT Crit)",
              "en": "C1: Parrot's beak (only the cannon - Crit DMG)"
            },
            "cons": 1,
            "stats": {
              "critDMG_": 1
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Brûlure": {
        "name": {
          "fr": "DPS Brûlure",
          "en": "Burning DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.1,
          "dendro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "dendro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "ObsidianCodex:4"
        ],
        "goodSets": [
          "UnfinishedReverie:4",
          "MarechausseeHunter:4",
          "GoldenTroupe:4",
          "DeepwoodMemories:4",
          "MarechausseeHunter:2",
          "GoldenTroupe:2",
          "DeepwoodMemories:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "ObsidianCodex:2"
        ],
        "er_req": 110,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Emilie",
            "element": "dendro"
          },
          {
            "role": "Sub-DPS",
            "name": "Durin",
            "element": "pyro"
          },
          {
            "role": "Support",
            "name": "Nicole",
            "element": "pyro"
          }
        ]
      }
    }
  },
  "Kirara": {
    "color": "#3a748c",
    "portraitOffset": -36,
    "skins": {
      "206101": {
        "color": "#2765be",
        "portraitOffset": -36
      }
    },
    "talents": {
      "auto": 1,
      "skill": 10,
      "burst": 9
    },
    "buffs": [
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C6 : Myriade de curiosités en chemin (DGTs Élémentaires)",
              "en": "C6: Countless lights to see (Elemental DMG)"
            },
            "cons": 6,
            "stats": {
              "elemental_dmg_": 0.12
            }
          }
        ]
      }
    ],
    "builds": {
      "Shieldeuse universelle": {
        "name": {
          "fr": "Shieldeuse universelle",
          "en": "Universal Shielder"
        },
        "weights": {
          "critRate_": 0.4,
          "hp_": 1,
          "hp": 0.8,
          "eleMas": 0.4,
          "enerRech_": 0.6
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "hp_"
          ],
          "EQUIP_RING": [
            "hp_"
          ],
          "EQUIP_DRESS": [
            "hp_",
            "critRate_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "TenacityOfTheMillelith:4",
          "Instructor:4",
          "TenacityOfTheMillelith:2",
          "VourukashasGlow:2"
        ],
        "goodSets": [
          "DeepwoodMemories:4",
          "NoblesseOblige:4",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 140,
        "team": [
          {
            "role": "Flex",
            "name": "",
            "element": [
              "electro",
              "hydro"
            ]
          },
          {
            "role": "Flex",
            "name": "",
            "element": [
              "electro",
              "hydro"
            ]
          },
          {
            "role": "Flex",
            "name": "",
            "element": "dendro"
          }
        ]
      }
    }
  },
  "Klee": {
    "color": "#f6330a",
    "portraitOffset": -35,
    "skins": {
      "202901": {
        "color": "#b5ce89",
        "portraitOffset": -35
      }
    },
    "talents": {
      "auto": 10,
      "skill": 8,
      "burst": 8
    },
    "buffs": [
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C1 : Bombardement continu (Hexerei - ATQ%)",
              "en": "C1: Chained reactions (Hexerei - ATK%)"
            },
            "cons": 1,
            "stats": {
              "atk_": 0.6
            }
          },
          {
            "label": {
              "fr": "C6 : À tout feu (Hexerei - DGTs Pyro)",
              "en": "C6: Blazing delight (Hexerei - Pyro DMG)"
            },
            "cons": 6,
            "stats": {
              "elemental_dmg_": 0.5
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Surcharge Hexerei": {
        "name": {
          "fr": "DPS Surcharge Hexerei",
          "en": "Hexerei Overload DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.3,
          "pyro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "pyro_dmg_",
            "atk_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "ADayCarvedFromRisingWinds:4"
        ],
        "goodSets": [
          "CrimsonWitchOfFlames:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2"
        ],
        "er_req": 130,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Durin",
            "element": "pyro"
          },
          {
            "role": "Support",
            "name": "Chevreuse",
            "element": "pyro"
          },
          {
            "role": "Support",
            "name": "Bennett",
            "element": "pyro"
          }
        ]
      },
      "DPS Évaporation Hexerei": {
        "name": {
          "fr": "DPS Évaporation Hexerei",
          "en": "Hexerei Vape DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.6,
          "enerRech_": 0.3,
          "pyro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "eleMas"
          ],
          "EQUIP_RING": [
            "pyro_dmg_",
            "atk_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "ADayCarvedFromRisingWinds:4",
          "CrimsonWitchOfFlames:4",
          "MarechausseeHunter:4"
        ],
        "goodSets": [
          "CrimsonWitchOfFlames:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 130,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Furina",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Albedo",
            "element": "geo"
          },
          {
            "role": "Support",
            "name": "Xilonen",
            "element": "geo"
          }
        ]
      },
      "DPS Mono-pyro Hexerei": {
        "name": {
          "fr": "DPS Mono-pyro Hexerei",
          "en": "Hexerei Mono-pyro DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.3,
          "pyro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "pyro_dmg_",
            "atk_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "ADayCarvedFromRisingWinds:4"
        ],
        "goodSets": [
          "CrimsonWitchOfFlames:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 130,
        "team": [
          {
            "role": "Support",
            "name": "Prune",
            "element": "anemo"
          },
          {
            "role": "Sub-DPS",
            "name": "Durin",
            "element": "pyro"
          },
          {
            "role": "Support",
            "name": "Nicole",
            "element": "pyro"
          }
        ]
      }
    }
  },
  "Kujou Sara": {
    "color": "#712eac",
    "portraitOffset": -37,
    "talents": {
      "auto": 1,
      "skill": 8,
      "burst": 8
    },
    "buffs": [
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C6 : Péché d'orgueil (uniquement les dégâts Électro - DGT Crit)",
              "en": "C6: Sin of pride (only Electro DMG - Crit DMG)"
            },
            "cons": 6,
            "active": false,
            "stats": {
              "critDMG_": 0.6
            }
          }
        ]
      }
    ],
    "builds": {
      "Support Électro": {
        "name": {
          "fr": "Support Électro",
          "en": "Electro Support"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.5,
          "electro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "electro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "EmblemOfSeveredFate:4",
          "NoblesseOblige:4"
        ],
        "goodSets": [
          "TenacityOfTheMillelith:4",
          "NoblesseOblige:2",
          "ThunderingFury:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2"
        ],
        "er_req": 180,
        "team": [
          {
            "role": "DPS",
            "name": "Shougun",
            "element": "electro"
          },
          {
            "role": "Support",
            "name": "Kazuha",
            "element": "anemo"
          },
          {
            "role": "Support",
            "name": "Bennett",
            "element": "pyro"
          }
        ]
      }
    }
  },
  "Kuki Shinobu": {
    "color": "#55267b",
    "portraitOffset": -37,
    "talents": {
      "auto": 1,
      "skill": 10,
      "burst": 6
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "A1 : Désir libérateur (PV <= 50% - Soins)",
              "en": "A1: Breaking free (HP <= 50% - Healing)"
            },
            "active": true,
            "stats": {
              "heal_": 0.15
            }
          }
        ]
      },
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C6 : Pour parer à la faiblesse (PV <= 25% - Maîtrise élémentaire)",
              "en": "C6: To ward weakness (HP <= 25% - EM)"
            },
            "cons": 6,
            "stats": {
              "eleMas": 150
            }
          }
        ]
      }
    ],
    "builds": {
      "Sub-DPS Exubérance": {
        "name": {
          "fr": "Sub-DPS Exubérance",
          "en": "Hyperbloom Sub-DPS"
        },
        "weights": {
          "hp_": 0.4,
          "hp": 0.1,
          "eleMas": 1,
          "enerRech_": 0.4
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas"
          ],
          "EQUIP_RING": [
            "eleMas"
          ],
          "EQUIP_DRESS": [
            "eleMas"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [
          "hp"
        ],
        "bestSets": [
          "FlowerOfParadiseLost:4"
        ],
        "goodSets": [
          "GildedDreams:4",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "ThunderingFury:4",
          "DeepwoodMemories:4"
        ],
        "er_req": 130,
        "team": [
          {
            "role": "DPS",
            "name": "Alhatham",
            "element": "dendro"
          },
          {
            "role": "Sub-DPS",
            "name": "Nahida",
            "element": "dendro"
          },
          {
            "role": "Flex",
            "name": [
              "Yelan",
              "Xingqiu"
            ],
            "element": [
              "hydro",
              "hydro"
            ]
          }
        ]
      },
      "Sub-DPS Suractivation": {
        "name": {
          "fr": "Sub-DPS Suractivation",
          "en": "Aggravate Sub-DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "hp_": 0.4,
          "hp": 0.1,
          "eleMas": 0.8,
          "enerRech_": 0.6,
          "electro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas"
          ],
          "EQUIP_RING": [
            "eleMas",
            "electro_dmg_"
          ],
          "EQUIP_DRESS": [
            "eleMas",
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [
          "hp"
        ],
        "bestSets": [
          "GoldenTroupe:4",
          "TenacityOfTheMillelith:4"
        ],
        "goodSets": [
          "ScrollOfTheHeroOfCinderCity:4",
          "DeepwoodMemories:4",
          "Instructor:4",
          "NoblesseOblige:4",
          "EmblemOfSeveredFate:4",
          "ThunderingFury:4",
          "GildedDreams:4",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 130,
        "team": [
          {
            "role": "DPS",
            "name": "Shougun",
            "element": "electro"
          },
          {
            "role": "Sub-DPS",
            "name": "Nahida",
            "element": "dendro"
          },
          {
            "role": "Support",
            "name": "Kazuha",
            "element": "anemo"
          }
        ]
      }
    }
  },
  "Lan Yan": {
    "color": "#0f95a2",
    "portraitOffset": -35,
    "talents": {
      "auto": 1,
      "skill": 10,
      "burst": 9
    },
    "buffs": [
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C4 : « Des perles de sang de faucon-dragon en ornement » (Maîtrise élémentaire)",
              "en": "C4: \"With drakefalcon's blood-pearls adorned\" (EM)"
            },
            "cons": 4,
            "stats": {
              "eleMas": 60
            }
          }
        ]
      }
    ],
    "builds": {
      "Shieldeuse universelle": {
        "name": {
          "fr": "Shieldeuse universelle",
          "en": "Universal Shielder"
        },
        "weights": {
          "critRate_": 0.4,
          "atk_": 1,
          "atk": 0.8,
          "eleMas": 0.4,
          "enerRech_": 0.8
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "atk_"
          ],
          "EQUIP_DRESS": [
            "atk_",
            "critRate_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "ViridescentVenerer:4",
          "ScrollOfTheHeroOfCinderCity:4"
        ],
        "goodSets": [
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2"
        ],
        "er_req": 200,
        "team": [
          {
            "role": "",
            "name": "",
            "element": ""
          },
          {
            "role": "",
            "name": "",
            "element": ""
          },
          {
            "role": "",
            "name": "",
            "element": ""
          }
        ]
      }
    }
  },
  "Lauma": {
    "color": "#8FE1E9",
    "portraitOffset": -35,
    "talents": {
      "auto": 1,
      "skill": 8,
      "burst": 8
    },
    "builds": {
      "Sub-DPS Sélénofleurissement": {
        "name": {
          "fr": "Sub-DPS Sélénofleurissement",
          "en": "Lunar-Bloom Sub-DPS"
        },
        "weights": {
          "critRate_": 0.4,
          "critDMG_": 0.4,
          "eleMas": 1,
          "enerRech_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "eleMas"
          ],
          "EQUIP_DRESS": [
            "eleMas"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [
          "atk"
        ],
        "bestSets": [
          "SilkenMoonsSerenade:4",
          "DeepwoodMemories:4",
          "AubadeOfMorningstarAndMoon:4"
        ],
        "goodSets": [
          "NightOfTheSkysUnveiling:4",
          "Instructor:4",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2"
        ],
        "er_req": 200,
        "team": [
          {
            "role": "DPS",
            "name": "Nefer",
            "element": "dendro"
          },
          {
            "role": "Sub-DPS",
            "name": "Columbina",
            "element": "hydro"
          },
          {
            "role": "Support",
            "name": "Nahida",
            "element": "dendro"
          }
        ]
      },
      "Sub-DPS Fleurissement": {
        "name": {
          "fr": "Sub-DPS Fleurissement",
          "en": "Bloom Sub-DPS"
        },
        "weights": {
          "critRate_": 0.4,
          "critDMG_": 0.4,
          "eleMas": 1,
          "enerRech_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "eleMas"
          ],
          "EQUIP_DRESS": [
            "eleMas"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [
          "atk"
        ],
        "bestSets": [
          "SilkenMoonsSerenade:4",
          "DeepwoodMemories:4"
        ],
        "goodSets": [
          "NightOfTheSkysUnveiling:4",
          "Instructor:4",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2"
        ],
        "er_req": 220,
        "team": [
          {
            "role": "Support",
            "name": "Nilou",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Columbina",
            "element": "hydro"
          },
          {
            "role": "Support",
            "name": "Nahida",
            "element": "dendro"
          }
        ]
      },
      "Sub-DPS Exubérance": {
        "name": {
          "fr": "Sub-DPS Exubérance",
          "en": "Hyperbloom Sub-DPS"
        },
        "weights": {
          "critRate_": 0.4,
          "critDMG_": 0.4,
          "eleMas": 1,
          "enerRech_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "eleMas"
          ],
          "EQUIP_DRESS": [
            "eleMas"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [
          "atk"
        ],
        "bestSets": [
          "SilkenMoonsSerenade:4",
          "DeepwoodMemories:4"
        ],
        "goodSets": [
          "NightOfTheSkysUnveiling:4",
          "Instructor:4",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2"
        ],
        "er_req": 220,
        "team": [
          {
            "role": "DPS",
            "name": "Neuvillette",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Furina",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Ineffa",
            "element": "electro"
          }
        ]
      }
    }
  },
  "Layla": {
    "color": "#3744b0",
    "portraitOffset": -36,
    "talents": {
      "auto": 1,
      "skill": 10,
      "burst": 6
    },
    "builds": {
      "Shieldeuse universelle": {
        "name": {
          "fr": "Shieldeuse universelle",
          "en": "Universal Shielder"
        },
        "weights": {
          "critRate_": 0.4,
          "hp_": 1,
          "hp": 0.8,
          "enerRech_": 0.5
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "hp_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "hp_"
          ],
          "EQUIP_DRESS": [
            "hp_",
            "critRate_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "TenacityOfTheMillelith:4"
        ],
        "goodSets": [
          "NoblesseOblige:4",
          "TenacityOfTheMillelith:2",
          "VourukashasGlow:2",
          "Instructor:4",
          "DeepwoodMemories:4",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2"
        ],
        "er_req": 140,
        "team": [
          {
            "role": "",
            "name": "",
            "element": ""
          },
          {
            "role": "",
            "name": "",
            "element": ""
          },
          {
            "role": "",
            "name": "",
            "element": ""
          }
        ]
      }
    }
  },
  "Linnea": {
    "color": "#F56D84",
    "portraitOffset": -38,
    "talents": {
      "auto": 1,
      "skill": 10,
      "burst": 6
    },
    "buffs": [
      {
        "category": {
          "fr": "A4 : Archive naturaliste universelle",
          "en": "A4: Universal naturalist archive"
        },
        "selectMode": "exclusive",
        "buffs": [
          {
            "label": {
              "fr": "Personnage non-lunaire sur le terrain (Maîtrise élémentaire)",
              "en": "Non-lunar character on the field (EM)"
            },
            "active": true,
            "stats": {
              "eleMas_bonus_scaling": {
                "source": "def",
                "percent": 0.05
              }
            }
          }
        ]
      },
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C2 : Présage de joie et de tristesse (DGT Crit)",
              "en": "C2: Tidings of joy and sorrow (Crit DMG)"
            },
            "cons": 2,
            "stats": {
              "critDMG_": 0.4
            }
          },
          {
            "label": {
              "fr": "C4 : Instinct d'experte (DÉF%)",
              "en": "C4: Expert instinct (DEF%)"
            },
            "cons": 4,
            "stats": {
              "def_": 0.25
            }
          }
        ]
      }
    ],
    "builds": {
      "Sub-DPS Sélénocristallisation": {
        "name": {
          "fr": "Sub-DPS Sélénocristallisation",
          "en": "Lunar-Crystallize Sub-DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "def_": 0.8,
          "def": 0.1,
          "eleMas": 0.4,
          "enerRech_": 0.1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "def_"
          ],
          "EQUIP_RING": [
            "def_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "bestSets": [
          "AubadeOfMorningstarAndMoon:4",
          "HuskOfOpulentDreams:4"
        ],
        "goodSets": [
          "ArchaicPetra:2",
          "HuskOfOpulentDreams:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 100,
        "team": [
          {
            "role": "DPS",
            "name": "Zibai",
            "element": "geo"
          },
          {
            "role": "Support",
            "name": "Illuga",
            "element": "geo"
          },
          {
            "role": "Sub-DPS",
            "name": "Columbina",
            "element": "hydro"
          }
        ]
      }
    }
  },
  "Lisa": {
    "color": "#3c327e",
    "portraitOffset": -36,
    "skins": {
      "200601": {
        "color": "#3b9f99",
        "portraitOffset": -41
      }
    },
    "talents": {
      "auto": 8,
      "skill": 9,
      "burst": 10
    },
    "buffs": [
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C2 : Champ électromagnétique (DÉF%)",
              "en": "C2: Electromagnetic field (DEF%)"
            },
            "cons": 2,
            "stats": {
              "def_": 0.25
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Suractivation": {
        "name": {
          "fr": "DPS Suractivation",
          "en": "Aggravate DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.8,
          "enerRech_": 0.6,
          "electro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "eleMas"
          ],
          "EQUIP_RING": [
            "electro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "ThunderingFury:4",
          "GildedDreams:4"
        ],
        "goodSets": [
          "Thundersoother:4",
          "ThunderingFury:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 110,
        "team": [
          {
            "role": "",
            "name": "",
            "element": "dendro"
          },
          {
            "role": "",
            "name": "",
            "element": "dendro"
          },
          {
            "role": "",
            "name": "",
            "element": "electro"
          }
        ]
      },
      "DPS Sélénocution": {
        "name": {
          "fr": "DPS Sélénocution",
          "en": "Lunar-Charged DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.4,
          "enerRech_": 0.6,
          "electro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "eleMas"
          ],
          "EQUIP_RING": [
            "electro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "ThunderingFury:4",
          "GildedDreams:4",
          "NightOfTheSkysUnveiling:4"
        ],
        "goodSets": [
          "Thundersoother:4",
          "ThunderingFury:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 110,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Ineffa",
            "element": "electro"
          },
          {
            "role": "Sub-DPS",
            "name": "Columbina",
            "element": "hydro"
          },
          {
            "role": "Support",
            "name": "Sucrose",
            "element": "anemo"
          }
        ]
      },
      "Sub-DPS Propagation": {
        "name": {
          "fr": "Sub-DPS Propagation",
          "en": "Spread Sub-DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.8,
          "enerRech_": 0.8,
          "electro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "eleMas"
          ],
          "EQUIP_RING": [
            "electro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "ThunderingFury:4",
          "GildedDreams:4"
        ],
        "goodSets": [
          "Thundersoother:4",
          "ThunderingFury:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 140,
        "team": [
          {
            "role": "",
            "name": "",
            "element": "dendro"
          },
          {
            "role": "",
            "name": "",
            "element": "dendro"
          },
          {
            "role": "",
            "name": "",
            "element": "electro"
          }
        ]
      }
    }
  },
  "Lohen": {
    "color": "#273d80",
    "portraitOffset": -38,
    "talents": {
      "auto": 1,
      "skill": 10,
      "burst": 8
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "A4 : Chef-d'œuvre désinvolte (ATQ%)",
              "en": "A4: Flippant masterpiece (ATK%)"
            },
            "active": true,
            "stats": {
              "atk_": 0.15
            }
          }
        ]
      },
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C6 : Se noyer, sombrer, inconscient — Joie suprême (uniquement la compétence et le déchaînement - DGT Crit)",
              "en": "C6: To Drown, to Sink, Unconscious — Supreme Joy (only the skill and burst - Crit DMG)"
            },
            "cons": 6,
            "active": false,
            "stats": {
              "critDMG_": 1.75
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Fonte": {
        "name": {
          "fr": "DPS Fonte",
          "en": "Melt DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.6,
          "cryo_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "eleMas"
          ],
          "EQUIP_RING": [
            "cryo_dmg_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "ADayCarvedFromRisingWinds:4"
        ],
        "goodSets": [
          "GladiatorsFinale:4",
          "GildedDreams:4",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "BlizzardStrayer:2",
          "FinaleOfTheDeepGalleries:2"
        ],
        "er_req": 100,
        "team": [
          {
            "role": "Support",
            "name": "Citlali",
            "element": "cryo"
          },
          {
            "role": "Sub-DPS",
            "name": "Durin",
            "element": "pyro"
          },
          {
            "role": "Support",
            "name": "Nicole",
            "element": "pyro"
          }
        ]
      }
    }
  },
  "Lynette": {
    "color": "#0d859e",
    "portraitOffset": -35,
    "talents": {
      "auto": 1,
      "skill": 9,
      "burst": 10
    },
    "buffs": [
      {
        "category": {
          "fr": "A1 : Synergie ingénieuse (ATQ%)",
          "en": "A1: Sophisticated synergy (ATK%)"
        },
        "selectMode": "exclusive",
        "buffs": [
          {
            "label": {
              "fr": "1 type élémentaire",
              "en": "1 elemental type"
            },
            "active": false,
            "stats": {
              "atk_": 0.08
            }
          },
          {
            "label": {
              "fr": "2 types élémentaires",
              "en": "2 elemental types"
            },
            "active": false,
            "stats": {
              "atk_": 0.12
            }
          },
          {
            "label": {
              "fr": "3 types élémentaires",
              "en": "3 elemental types"
            },
            "active": true,
            "stats": {
              "atk_": 0.16
            }
          },
          {
            "label": {
              "fr": "4 types élémentaires",
              "en": "4 elemental types"
            },
            "active": false,
            "stats": {
              "atk_": 0.2
            }
          }
        ]
      },
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C6 : Œil perspicace (DGTs Anémo)",
              "en": "C6: Watchful eye (Anemo DMG)"
            },
            "cons": 6,
            "stats": {
              "elemental_dmg_": 0.2
            }
          }
        ]
      }
    ],
    "builds": {
      "Support universel": {
        "name": {
          "fr": "Support universel",
          "en": "Universal Support"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.8,
          "anemo_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "anemo_dmg_",
            "atk_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "ViridescentVenerer:4",
          "EmblemOfSeveredFate:4",
          "NoblesseOblige:4"
        ],
        "goodSets": [
          "GildedDreams:4",
          "ViridescentVenerer:2",
          "DesertPavilionChronicle:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "NoblesseOblige:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 170,
        "team": [
          {
            "role": "",
            "name": "",
            "element": ""
          },
          {
            "role": "",
            "name": "",
            "element": ""
          },
          {
            "role": "",
            "name": "",
            "element": ""
          }
        ]
      }
    }
  },
  "Lyney": {
    "color": "#891b34",
    "portraitOffset": -37,
    "talents": {
      "auto": 10,
      "skill": 9,
      "burst": 8
    },
    "buffs": [
      {
        "category": {
          "fr": "C2 : Cajolerie affable (DGT Crit)",
          "en": "C2: Loquacious cajoling (Crit DMG)"
        },
        "selectMode": "cumulative",
        "buffs": [
          {
            "label": {
              "fr": "2s sur le terrain",
              "en": "2s on the field"
            },
            "cons": 2,
            "stats": {
              "critDMG_": 0.2
            }
          },
          {
            "label": {
              "fr": "4s sur le terrain",
              "en": "4s on the field"
            },
            "cons": 2,
            "stats": {
              "critDMG_": 0.2
            }
          },
          {
            "label": {
              "fr": "6s sur le terrain",
              "en": "6s on the field"
            },
            "cons": 2,
            "stats": {
              "critDMG_": 0.2
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Mono-pyro": {
        "name": {
          "fr": "DPS Mono-pyro",
          "en": "Mono-pyro DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.3,
          "pyro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "pyro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "MarechausseeHunter:4"
        ],
        "goodSets": [
          "Lavawalker:4",
          "VermillionHereafter:4",
          "ShimenawasReminiscence:4",
          "WanderersTroupe:4",
          "DesertPavilionChronicle:4",
          "MarechausseeHunter:2",
          "CrimsonWitchOfFlames:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2"
        ],
        "er_req": 120,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Durin",
            "element": "pyro"
          },
          {
            "role": "Support",
            "name": "Chevreuse",
            "element": "pyro"
          },
          {
            "role": "Sub-DPS",
            "name": "Fischl",
            "element": "electro"
          }
        ]
      }
    }
  },
  "Mavuika": {
    "color": "#C74644",
    "portraitOffset": -35,
    "talents": {
      "auto": 1,
      "skill": 8,
      "burst": 10
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "A1 : Cadeau de fleurs enflammées (ATQ%)",
              "en": "A1: Gift of flaming flowers (ATK%)"
            },
            "active": true,
            "stats": {
              "atk_": 0.3
            }
          }
        ]
      },
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C1 : Confession du seigneur de la nuit (ATQ%)",
              "en": "C1: The Night-Lord's explication (ATK%)"
            },
            "cons": 1,
            "stats": {
              "atk_": 0.4
            }
          },
          {
            "label": {
              "fr": "C2 : Prix des braises cendrées (ATQ)",
              "en": "C2: The ashen price (ATK)"
            },
            "cons": 2,
            "stats": {
              "atk": 200
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Fonte": {
        "name": {
          "fr": "DPS Fonte",
          "en": "Melt DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.6,
          "pyro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas",
            "atk_"
          ],
          "EQUIP_RING": [
            "pyro_dmg_",
            "atk_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "bestSets": [
          "ObsidianCodex:4",
          "CrimsonWitchOfFlames:4"
        ],
        "goodSets": [
          "ObsidianCodex:2",
          "CrimsonWitchOfFlames:2",
          "GildedDreams:4",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 100,
        "team": [
          {
            "role": "Support",
            "name": "Citlali",
            "element": "cryo"
          },
          {
            "role": "Support",
            "name": "Xilonen",
            "element": "geo"
          },
          {
            "role": "Support",
            "name": "Bennett",
            "element": "pyro"
          }
        ]
      },
      "DPS Surcharge": {
        "name": {
          "fr": "DPS Surcharge",
          "en": "Overload DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "pyro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "pyro_dmg_",
            "atk_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "bestSets": [
          "ObsidianCodex:4",
          "CrimsonWitchOfFlames:4"
        ],
        "goodSets": [
          "ObsidianCodex:2",
          "CrimsonWitchOfFlames:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2"
        ],
        "er_req": 100,
        "team": [
          {
            "role": "DPS",
            "name": "Varesa",
            "element": "electro"
          },
          {
            "role": "Support",
            "name": "Chevreuse",
            "element": "pyro"
          },
          {
            "role": "Support",
            "name": "Iansan",
            "element": "electro"
          }
        ]
      }
    }
  },
  "Mika": {
    "color": "#353f76",
    "portraitOffset": -39,
    "talents": {
      "auto": 1,
      "skill": 9,
      "burst": 10
    },
    "buffs": [
      {
        "category": {
          "fr": "Passifs & Cumuls",
          "en": "Passives & Stacks"
        },
        "selectMode": "cumulative",
        "buffs": [
          {
            "label": {
              "fr": "Effet Localisation (1 cumul - DGTs Physiques)",
              "en": "Detector effect (1 stack - Physical DMG)"
            },
            "stats": {
              "physical_dmg_": 0.1
            }
          },
          {
            "label": {
              "fr": "Effet Localisation (2 cumuls - DGTs Physiques)",
              "en": "Detector effect (2 stacks - Physical DMG)"
            },
            "stats": {
              "physical_dmg_": 0.1
            }
          },
          {
            "label": {
              "fr": "Effet Localisation (3 cumuls / A1 - DGTs Physiques)",
              "en": "Detector effect (3 stacks / A1 - Physical DMG)"
            },
            "stats": {
              "physical_dmg_": 0.1
            }
          },
          {
            "label": {
              "fr": "Effet Localisation (4 cumuls / A4 - DGTs Physiques)",
              "en": "Detector effect (4 stacks / A4 - Physical DMG)"
            },
            "stats": {
              "physical_dmg_": 0.1
            }
          },
          {
            "label": {
              "fr": "Effet Localisation (5 cumuls / C6 - DGTs Physiques)",
              "en": "Detector effect (5 stacks / C6 - Physical DMG)"
            },
            "cons": 6,
            "stats": {
              "physical_dmg_": 0.1
            }
          }
        ]
      },
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C6 : Conseil du compagnon (DGT Crit)",
              "en": "C6: Companion's counsel (Crit DMG)"
            },
            "cons": 6,
            "active": false,
            "stats": {
              "critDMG_": 0.6
            }
          }
        ]
      }
    ],
    "builds": {
      "Support Physique": {
        "name": {
          "fr": "Support Physique",
          "en": "Physical Support"
        },
        "weights": {
          "critRate_": 0.4,
          "hp_": 1,
          "hp": 0.8,
          "enerRech_": 1,
          "heal_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "hp_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "hp_"
          ],
          "EQUIP_DRESS": [
            "hp_",
            "heal_",
            "critRate_"
          ]
        },
        "hideUIStats": [
          "eleMas"
        ],
        "showUIStats": [
          "physical_dmg_"
        ],
        "bestSets": [
          "NoblesseOblige:4"
        ],
        "goodSets": [
          "OceanHuedClam:4",
          "SongOfDaysPast:4",
          "TheExile:4",
          "TenacityOfTheMillelith:2",
          "VourukashasGlow:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "MaidenBeloved:2",
          "OceanHuedClam:2",
          "SongOfDaysPast:2"
        ],
        "er_req": 200,
        "team": [
          {
            "role": "DPS",
            "name": "Eula",
            "element": "cryo"
          },
          {
            "role": "Sub-DPS",
            "name": "Furina",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Shougun",
            "element": "electro"
          }
        ]
      }
    }
  },
  "Mona": {
    "color": "#524fb6",
    "portraitOffset": -37,
    "talents": {
      "auto": 1,
      "skill": 8,
      "burst": 10
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "A4 : Que le destin décide (DGTs Hydro)",
              "en": "A4: Waterborne destiny (Hydro DMG)"
            },
            "stats": {
              "elemental_dmg_bonus_scaling": {
                "source": "enerRech_",
                "percent": 0.2
              }
            }
          }
        ]
      },
      {
        "category": {
          "fr": "Constellation 2 : Chaîne lunaire",
          "en": "Constellation 2: Lunar chain"
        },
        "buffs": [
          {
            "label": {
              "fr": "Buff Hexerei (Maîtrise élémentaire)",
              "en": "Hexerei buff (EM)"
            },
            "cons": 2,
            "stats": {
              "eleMas": 80
            }
          }
        ]
      },
      {
        "category": {
          "fr": "Constellation 4 : Prophétie de la fin",
          "en": "Constellation 4: Prophecy of oblivion"
        },
        "buffs": [
          {
            "label": {
              "fr": "Si l'ennemi attaqué est marqué par un présage (Taux Crit)",
              "en": "If the attacked enemy is affected by an omen (Crit Rate)"
            },
            "active": false,
            "cons": 4,
            "stats": {
              "critRate_": 0.15
            }
          },
          {
            "label": {
              "fr": "Si le personnage qui attaque est Hexerei (DGT Crit)",
              "en": "Of the attacking character is Hexerei (Crit DMG)"
            },
            "cons": 4,
            "stats": {
              "critDMG_": 0.15
            }
          }
        ]
      }
    ],
    "builds": {
      "Support Hexerei": {
        "name": {
          "fr": "Support Hexerei",
          "en": "Hexerei Support"
        },
        "weights": {
          "critRate_": 0.4,
          "critDMG_": 0.4,
          "atk_": 0.4,
          "atk": 0.1,
          "enerRech_": 1,
          "hydro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "enerRech_"
          ],
          "EQUIP_RING": [
            "hydro_dmg_",
            "atk_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "CelestialGift:4",
          "NoblesseOblige:4",
          "TenacityOfTheMillelith:4"
        ],
        "goodSets": [
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "NoblesseOblige:2",
          "EmblemOfSeveredFate:4"
        ],
        "er_req": 220,
        "team": [
          {
            "role": "DPS",
            "name": "Mualani",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Mavuika",
            "element": "pyro"
          },
          {
            "role": "Support",
            "name": "Sucrose",
            "element": "anemo"
          }
        ]
      },
      "Nuke Évaporation": {
        "name": {
          "fr": "Nuke Évaporation",
          "en": "Vape Nuke"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.6,
          "enerRech_": 0.8,
          "hydro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "enerRech_",
            "eleMas"
          ],
          "EQUIP_RING": [
            "hydro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "EmblemOfSeveredFate:4",
          "NoblesseOblige:2"
        ],
        "goodSets": [
          "HeartOfDepth:2",
          "NymphsDream:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2"
        ],
        "er_req": 160,
        "team": [
          {
            "role": "Support",
            "name": "Bennett",
            "element": "pyro"
          },
          {
            "role": "Support",
            "name": "Kazuha",
            "element": "anemo"
          },
          {
            "role": "Sub-DPS",
            "name": "Durin",
            "element": "pyro"
          }
        ]
      }
    }
  },
  "Mualani": {
    "color": "#1F4DCD",
    "portraitOffset": -36,
    "talents": {
      "auto": 1,
      "skill": 10,
      "burst": 8
    },
    "builds": {
      "DPS Évaporation": {
        "name": {
          "fr": "DPS Évaporation",
          "en": "Vape DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "hp_": 1,
          "hp": 0.1,
          "eleMas": 0.6,
          "enerRech_": 0.1,
          "hydro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "hp_",
            "eleMas"
          ],
          "EQUIP_RING": [
            "hydro_dmg_",
            "hp_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_",
            "hp_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "ObsidianCodex:4"
        ],
        "goodSets": [
          "UnfinishedReverie:4",
          "HeartOfDepth:4",
          "ObsidianCodex:2",
          "HeartOfDepth:2",
          "TenacityOfTheMillelith:2",
          "VourukashasGlow:2",
          "NymphsDream:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 100,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Mavuika",
            "element": "pyro"
          },
          {
            "role": "Support",
            "name": "Xilonen",
            "element": "geo"
          },
          {
            "role": "Flex",
            "name": [
              "Citlali",
              "Sucrose"
            ],
            "element": [
              "cryo",
              "anemo"
            ]
          }
        ]
      },
      "DPS Hexerei": {
        "name": {
          "fr": "DPS Hexerei",
          "en": "Hexerei DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "hp_": 1,
          "hp": 0.1,
          "eleMas": 0.6,
          "enerRech_": 0.1,
          "hydro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "hp_",
            "eleMas"
          ],
          "EQUIP_RING": [
            "hydro_dmg_",
            "hp_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_",
            "hp_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "ObsidianCodex:4"
        ],
        "goodSets": [
          "UnfinishedReverie:4",
          "HeartOfDepth:4",
          "ObsidianCodex:2",
          "HeartOfDepth:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "TenacityOfTheMillelith:2",
          "VourukashasGlow:2",
          "NymphsDream:2"
        ],
        "er_req": 100,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Mavuika",
            "element": "pyro"
          },
          {
            "role": "Support",
            "name": "Mona",
            "element": "hydro"
          },
          {
            "role": "Support",
            "name": "Sucrose",
            "element": "anemo"
          }
        ]
      }
    }
  },
  "Nahida": {
    "color": "#e6ff89",
    "portraitOffset": -37,
    "talents": {
      "auto": 6,
      "skill": 10,
      "burst": 9
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "A1 : Compassion illuminée (Nahida On-field - Maîtrise élémentaire)",
              "en": "A1: Compassion illuminated (On-field Nahida - EM)"
            },
            "stats": {
              "eleMas_bonus_scaling": {
                "source": "eleMas",
                "percent": 0.25,
                "baseline": 0,
                "max": 250
              }
            }
          },
          {
            "label": {
              "fr": "A4 : Éveil élucidé (Taux Crit)",
              "en": "A4: Awakening elucidated (Crit Rate)"
            },
            "stats": {
              "critRate__bonus_scaling": {
                "source": "eleMas",
                "percent": 0.03,
                "baseline": 200,
                "max": 24
              }
            }
          }
        ]
      },
      {
        "category": {
          "fr": "Constellation 2 : Racine de toute plénitude",
          "en": "Constellation 2: The root of all fullness"
        },
        "buffs": [
          {
            "label": {
              "fr": "Sélénofleurissement (Taux Crit, DGT Crit)",
              "en": "Lunar-Bloom (Crit Rate, Crit DMG)"
            },
            "cons": 2,
            "active": false,
            "stats": {
              "critRate_": 0.1,
              "critDMG_": 0.2
            }
          }
        ]
      },
      {
        "category": {
          "fr": "Constellation 4 : Tige d'inférence manifeste (Maîtrise élémentaire)",
          "en": "Constellation 4: The stem of manifest inference (EM)"
        },
        "selectMode": "exclusive",
        "buffs": [
          {
            "label": {
              "fr": "1 ennemi affecté par la compétence élémentaire",
              "en": "1 enemy affected by the elemental skill"
            },
            "cons": 4,
            "stats": {
              "eleMas": 100
            }
          },
          {
            "label": {
              "fr": "2 ennemis affectés par la compétence élémentaire",
              "en": "2 enemies affected by the elemental skill"
            },
            "cons": 4,
            "stats": {
              "eleMas": 120
            }
          },
          {
            "label": {
              "fr": "3 ennemis affectés par la compétence élémentaire",
              "en": "3 enemies affected by the elemental skill"
            },
            "cons": 4,
            "stats": {
              "eleMas": 140
            }
          },
          {
            "label": {
              "fr": "4 ennemis affectés par la compétence élémentaire",
              "en": "4 enemies affected by the elemental skill"
            },
            "cons": 4,
            "stats": {
              "eleMas": 160
            }
          }
        ]
      }
    ],
    "builds": {
      "Sub-DPS Propagation": {
        "name": {
          "fr": "Sub-DPS Propagation",
          "en": "Spread Sub-DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "eleMas": 1,
          "enerRech_": 0.6,
          "dendro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas"
          ],
          "EQUIP_RING": [
            "eleMas",
            "dendro_dmg_"
          ],
          "EQUIP_DRESS": [
            "eleMas",
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [
          "atk"
        ],
        "bestSets": [
          "DeepwoodMemories:4",
          "ScrollOfTheHeroOfCinderCity:4"
        ],
        "goodSets": [
          "TenacityOfTheMillelith:4",
          "GoldenTroupe:4",
          "GildedDreams:4",
          "Instructor:4",
          "DeepwoodMemories:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 120,
        "team": [
          {
            "role": "DPS",
            "name": "Alhatham",
            "element": "dendro"
          },
          {
            "role": "Sub-DPS",
            "name": "Yae",
            "element": "electro"
          },
          {
            "role": "Sub-DPS",
            "name": "Shinobu",
            "element": "electro"
          }
        ]
      },
      "Sub-DPS Exubérance": {
        "name": {
          "fr": "Sub-DPS Exubérance",
          "en": "Hyperbloom Sub-DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "eleMas": 1,
          "enerRech_": 0.6,
          "dendro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas"
          ],
          "EQUIP_RING": [
            "eleMas",
            "dendro_dmg_"
          ],
          "EQUIP_DRESS": [
            "eleMas",
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [
          "atk"
        ],
        "bestSets": [
          "DeepwoodMemories:4",
          "ScrollOfTheHeroOfCinderCity:4"
        ],
        "goodSets": [
          "TenacityOfTheMillelith:4",
          "GoldenTroupe:4",
          "GildedDreams:4",
          "Instructor:4",
          "DeepwoodMemories:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 140,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Yelan",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Xingqiu",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Shinobu",
            "element": "electro"
          }
        ]
      },
      "Sub-DPS Fleurissement": {
        "name": {
          "fr": "Sub-DPS Fleurissement",
          "en": "Bloom Sub-DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "eleMas": 1,
          "enerRech_": 0.6,
          "dendro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas"
          ],
          "EQUIP_RING": [
            "eleMas",
            "dendro_dmg_"
          ],
          "EQUIP_DRESS": [
            "eleMas",
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [
          "atk"
        ],
        "bestSets": [
          "DeepwoodMemories:4",
          "ScrollOfTheHeroOfCinderCity:4"
        ],
        "goodSets": [
          "TenacityOfTheMillelith:4",
          "GoldenTroupe:4",
          "GildedDreams:4",
          "Instructor:4",
          "DeepwoodMemories:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 120,
        "team": [
          {
            "role": "Support",
            "name": "Nilou",
            "element": "hydro"
          },
          {
            "role": "Support",
            "name": "Kokomi",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Collei",
            "element": "dendro"
          }
        ]
      }
    }
  },
  "Navia": {
    "color": "#caa53c",
    "portraitOffset": -37,
    "talents": {
      "auto": 6,
      "skill": 10,
      "burst": 6
    },
    "buffs": [
      {
        "category": "Passifs",
        "selectMode": "exclusive",
        "data": [
          {
            "label": {
              "fr": "A4 : Réseau d'assistance mutuelle (1 allié Pyro/Hydro/Cryo/Électro - ATQ%)",
              "en": "A4: Mutual assistance network (1 Pyro/Hydro/Cryo/Electro ally - ATK%)"
            },
            "active": false,
            "stats": {
              "atk_": 0.2
            }
          },
          {
            "label": {
              "fr": "A4 : Réseau d'assistance mutuelle (2 alliés Pyro/Hydro/Cryo/Électro - ATQ%)",
              "en": "A4: Mutual assistance network (1 Pyro/Hydro/Cryo/Electro ally - ATK%)"
            },
            "active": true,
            "stats": {
              "atk_": 0.4
            }
          }
        ]
      },
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C2 : Quête de victoire de la présidente (uniquement la compétence - Taux Crit)",
              "en": "C2: The president's pursuit of victory (only the skill - Crit Rate)"
            },
            "cons": 2,
            "active": false,
            "stats": {
              "critRate_": 0.36
            }
          },
          {
            "label": {
              "fr": "C6 : Finesse flexible de la présidente de la Spina (uniquement la compétence - DGT Crit)",
              "en": "C6: The flexible finesse of the Spina's president (only the skill - Crit DMG)"
            },
            "cons": 6,
            "stats": {
              "critDMG_": 1.35
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Cristallisation": {
        "name": {
          "fr": "DPS Cristallisation",
          "en": "Crystallize DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.3,
          "geo_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "geo_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "bestSets": [
          "NighttimeWhispersInTheEchoingWoods:4",
          "MarechausseeHunter:4"
        ],
        "goodSets": [
          "ArchaicPetra:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "GoldenTroupe:2"
        ],
        "er_req": 130,
        "team": [
          {
            "role": "Support",
            "name": "Furina",
            "element": "hydro"
          },
          {
            "role": "Support",
            "name": "Xilonen",
            "element": "geo"
          },
          {
            "role": "Support",
            "name": "Bennett",
            "element": "pyro"
          }
        ]
      },
      "DPS Sélénocristallisation": {
        "name": {
          "fr": "DPS Sélénocristallisation",
          "en": "Lunar-Crystallize DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.4,
          "enerRech_": 0.3,
          "geo_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "geo_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "bestSets": [
          "NighttimeWhispersInTheEchoingWoods:4"
        ],
        "goodSets": [
          "ArchaicPetra:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "GoldenTroupe:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 130,
        "team": [
          {
            "role": "Support",
            "name": "Columbina",
            "element": "hydro"
          },
          {
            "role": "Support",
            "name": "Xilonen",
            "element": "geo"
          },
          {
            "role": "Support",
            "name": "Furina",
            "element": "hydro"
          }
        ]
      }
    }
  },
  "Nefer": {
    "color": "#257224",
    "portraitOffset": -37,
    "talents": {
      "auto": 1,
      "skill": 10,
      "burst": 8
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "A1 : Pari au clair de lune (Maîtrise élémentaire)",
              "en": "A1: A wager of moonlight (EM)"
            },
            "active": true,
            "stats": {
              "eleMas": 100
            }
          }
        ]
      },
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C2 : L'observation nourrit la stratégie (Maîtrise élémentaire)",
              "en": "C2: Observation feeds strategy (EM)"
            },
            "cons": 2,
            "stats": {
              "eleMas": 200
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Sélénofleurissement": {
        "name": {
          "fr": "DPS Sélénofleurissement",
          "en": "Lunar-Bloom DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "eleMas": 1,
          "enerRech_": 0.2
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas"
          ],
          "EQUIP_RING": [
            "eleMas"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_",
            "eleMas"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [
          "atk"
        ],
        "bestSets": [
          "NightOfTheSkysUnveiling:4"
        ],
        "goodSets": [
          "DeepwoodMemories:4",
          "GildedDreams:4",
          "Instructor:4",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 100,
        "team": [
          {
            "role": "Support",
            "name": "Columbina",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Lauma",
            "element": "dendro"
          },
          {
            "role": "Flex",
            "name": [
              "Nahida",
              "Sucrose"
            ],
            "element": [
              "dendro",
              "anemo"
            ]
          }
        ]
      }
    }
  },
  "Neuvillette": {
    "color": "#374eb4",
    "portraitOffset": -38,
    "skins": {
      "208701": {
        "color": "#3248e3",
        "portraitOffset": -39
      }
    },
    "talents": {
      "auto": 10,
      "skill": 6,
      "burst": 6
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "A4 : Discipline de l'arbitrage suprême (DGTs Hydro)",
              "en": "A4: Discipline of the supreme arbitration (Hydro DMG)"
            },
            "active": true,
            "stats": {
              "hydro_dmg_": 0.3
            }
          }
        ]
      },
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C2 : Exhortation de la loi (DGT Crit)",
              "en": "C2: Juridical exhortation (Crit DMG)"
            },
            "cons": 2,
            "stats": {
              "critDMG_": 0.42
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Hydro": {
        "name": {
          "fr": "DPS Hydro",
          "en": "Hydro DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "hp_": 1,
          "hp": 0.1,
          "enerRech_": 0.6,
          "hydro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "hp_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "hydro_dmg_",
            "hp_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_",
            "hp_"
          ]
        },
        "bestSets": [
          "MarechausseeHunter:4"
        ],
        "goodSets": [
          "WanderersTroupe:4",
          "HeartOfDepth:4",
          "TenacityOfTheMillelith:2",
          "VourukashasGlow:2",
          "HeartOfDepth:2",
          "NymphsDream:2"
        ],
        "er_req": 130,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Furina",
            "element": "hydro"
          },
          {
            "role": "Support",
            "name": [
              "Kazuha",
              "Lanyan"
            ],
            "element": [
              "anemo",
              "anemo"
            ]
          },
          {
            "role": "Support",
            "name": "Xilonen",
            "element": "geo"
          }
        ]
      },
      "DPS Gel": {
        "name": {
          "fr": "DPS Gel",
          "en": "Freeze DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "hp_": 1,
          "hp": 0.1,
          "enerRech_": 0.6,
          "hydro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "hp_"
          ],
          "EQUIP_RING": [
            "hydro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "bestSets": [
          "MarechausseeHunter:4"
        ],
        "goodSets": [
          "WanderersTroupe:4",
          "HeartOfDepth:4",
          "HeartOfDepth:2",
          "NymphsDream:2",
          "TenacityOfTheMillelith:2",
          "VourukashasGlow:2"
        ],
        "er_req": 130,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Furina",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Escoffier",
            "element": "cryo"
          },
          {
            "role": "Support",
            "name": "Citlali",
            "element": "cryo"
          }
        ]
      },
      "DPS Exubérance": {
        "name": {
          "fr": "DPS Exubérance",
          "en": "Hyperbloom DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "hp_": 1,
          "hp": 0.1,
          "enerRech_": 0.6,
          "hydro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "hp_"
          ],
          "EQUIP_RING": [
            "hydro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "bestSets": [
          "MarechausseeHunter:4",
          "NightOfTheSkysUnveiling:4"
        ],
        "goodSets": [
          "WanderersTroupe:4",
          "HeartOfDepth:4",
          "TenacityOfTheMillelith:2",
          "VourukashasGlow:2",
          "HeartOfDepth:2",
          "NymphsDream:2"
        ],
        "er_req": 130,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Furina",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Ineffa",
            "element": "electro"
          },
          {
            "role": "Sub-DPS",
            "name": "Lauma",
            "element": "dendro"
          }
        ]
      }
    }
  },
  "Nicole": {
    "color": "#5763bf",
    "portraitOffset": -36,
    "talents": {
      "auto": 1,
      "skill": 10,
      "burst": 9
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "A1 : Méthexis (ATQ)",
              "en": "A1: Methexis (ATK)"
            },
            "active": true,
            "stats": {
              "atk": 300
            }
          },
          {
            "label": {
              "fr": "A1 : Méthexis (C2 - ATQ)",
              "en": "A1: Methexis (C2 - ATK)"
            },
            "active": true,
            "cons": 2,
            "stats": {
              "atk": 600
            }
          }
        ]
      }
    ],
    "builds": {
      "Support Hexerei": {
        "name": {
          "fr": "Support Hexerei",
          "en": "Hexerei Support"
        },
        "weights": {
          "atk_": 1,
          "atk": 0.8,
          "enerRech_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "atk_"
          ],
          "EQUIP_DRESS": [
            "atk_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "CelestialGift:4",
          "NoblesseOblige:4"
        ],
        "goodSets": [
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2"
        ],
        "er_req": 200,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Durin",
            "element": "pyro"
          },
          {
            "role": "",
            "name": "",
            "element": ""
          },
          {
            "role": "",
            "name": "",
            "element": ""
          }
        ]
      }
    }
  },
  "Nilou": {
    "color": "#80B7E2",
    "portraitOffset": -36.5,
    "skins": {
      "207001": {
        "color": "#2d65bd",
        "portraitOffset": -38
      }
    },
    "talents": {
      "auto": 1,
      "skill": 8,
      "burst": 8
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "A1 : Cour des pétales dansants (Maîtrise élémentaire)",
              "en": "A1: Court of dancing petals (EM)"
            },
            "active": true,
            "stats": {
              "eleMas": 100
            }
          }
        ]
      },
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C6 : Mélodie du brise-givre (Taux Crit, DGT Crit)",
              "en": "C6: Frostbreaker's melody (Crit Rate, Crit DMG)"
            },
            "cons": 6,
            "active": false,
            "stats": {
              "critRate__bonus_scaling": {
                "source": "hp",
                "percent": 0.0006,
                "max": 30
              },
              "critDMG__bonus_scaling": {
                "source": "hp",
                "percent": 0.0012,
                "max": 60
              }
            }
          }
        ]
      }
    ],
    "builds": {
      "Enabler Fleurissement": {
        "name": {
          "fr": "Enabler Fleurissement",
          "en": "Bloom Enabler"
        },
        "weights": {
          "hp_": 1,
          "hp": 0.8,
          "eleMas": 0.5,
          "enerRech_": 0.3
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "hp_"
          ],
          "EQUIP_RING": [
            "hp_"
          ],
          "EQUIP_DRESS": [
            "hp_"
          ]
        },
        "bestSets": [
          "TenacityOfTheMillelith:2",
          "VourukashasGlow:2"
        ],
        "goodSets": [
          "FlowerOfParadiseLost:4",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 130,
        "team": [
          {
            "role": "Driver",
            "name": "Columbina",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Lauma",
            "element": "dendro"
          },
          {
            "role": "Support",
            "name": "Nahida",
            "element": "dendro"
          }
        ]
      }
    }
  },
  "Ningguang": {
    "color": "#715927",
    "portraitOffset": -38,
    "skins": {
      "202701": {
        "color": "#30349c",
        "portraitOffset": -36
      }
    },
    "talents": {
      "auto": 9,
      "skill": 8,
      "burst": 10
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "A4 : Réserve stratégique (en traversant le paravent - DGTs Géo)",
              "en": "A4: Strategic reserve (passing through the jade screen - Geo DMG)"
            },
            "active": false,
            "stats": {
              "geo_dmg_": 0.12
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Géo": {
        "name": {
          "fr": "DPS Géo",
          "en": "Geo DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.8,
          "geo_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "geo_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "NighttimeWhispersInTheEchoingWoods:4",
          "MarechausseeHunter:4"
        ],
        "goodSets": [
          "EmblemOfSeveredFate:4",
          "ArchaicPetra:4",
          "ArchaicPetra:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2"
        ],
        "er_req": 140,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Furina",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Fischl",
            "element": "electro"
          },
          {
            "role": "Support",
            "name": "Xilonen",
            "element": "geo"
          }
        ]
      }
    }
  },
  "Nomade": {
    "color": "#1d40ee",
    "portraitOffset": -36,
    "talents": {
      "auto": 10,
      "skill": 9,
      "burst": 8
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "A1 : Fleur de jade (Pyro - ATQ%)",
              "en": "A1: Jade-claimed flower (Pyro - ATK%)"
            },
            "active": true,
            "stats": {
              "atk_": 0.3
            }
          },
          {
            "label": {
              "fr": "A1 : Fleur de jade (Cryo - Taux Crit)",
              "en": "A1: Jade-claimed flower (Cryo - Crit Rate)"
            },
            "active": false,
            "stats": {
              "critRate_": 0.2
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Dispersion": {
        "name": {
          "fr": "DPS Dispersion",
          "en": "Swirl DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.3,
          "anemo_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "anemo_dmg_",
            "atk_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "DesertPavilionChronicle:4"
        ],
        "goodSets": [
          "ShimenawasReminiscence:4",
          "MarechausseeHunter:4",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "ViridescentVenerer:2",
          "DesertPavilionChronicle:2"
        ],
        "er_req": 120,
        "team": [
          {
            "role": "Support",
            "name": "Faruzan",
            "element": "anemo"
          },
          {
            "role": "Sub-DPS",
            "name": "Durin",
            "element": "pyro"
          },
          {
            "role": "Support",
            "name": "Nicole",
            "element": "pyro"
          }
        ]
      }
    }
  },
  "Noëlle": {
    "color": "#b23a54",
    "portraitOffset": -36,
    "talents": {
      "auto": 10,
      "skill": 8,
      "burst": 10
    },
    "buffs": [
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C6 : Aucune poussière (ATQ)",
              "en": "C6: Must be spotless (ATK)"
            },
            "cons": 6,
            "active": false,
            "stats": {
              "atk_bonus_scaling": {
                "source": "def",
                "percent": 0.5
              }
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Géo": {
        "name": {
          "fr": "DPS Géo",
          "en": "Geo DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.4,
          "def_": 0.8,
          "def": 0.1,
          "enerRech_": 0.8,
          "geo_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "def_"
          ],
          "EQUIP_RING": [
            "geo_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [
          "heal_"
        ],
        "showUIStats": [
          "def",
          "atk"
        ],
        "bestSets": [
          "HuskOfOpulentDreams:4",
          "MarechausseeHunter:4"
        ],
        "goodSets": [
          "GladiatorsFinale:4",
          "RetracingBolide:4",
          "ArchaicPetra:4",
          "ArchaicPetra:2",
          "HuskOfOpulentDreams:2",
          "MarechausseeHunter:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2"
        ],
        "er_req": 140,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Furina",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Albedo",
            "element": "geo"
          },
          {
            "role": "Support",
            "name": "Gorou",
            "element": "geo"
          }
        ]
      },
      "DPS Sélénocristallisation": {
        "name": {
          "fr": "DPS Sélénocristallisation",
          "en": "Lunar-Crystallize DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.4,
          "def_": 0.8,
          "def": 0.1,
          "eleMas": 0.4,
          "enerRech_": 0.8,
          "geo_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "def_"
          ],
          "EQUIP_RING": [
            "geo_dmg_",
            "def_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "hideUIStats": [
          "heal_"
        ],
        "showUIStats": [
          "def",
          "atk"
        ],
        "bestSets": [
          "NightOfTheSkysUnveiling:4"
        ],
        "goodSets": [
          "HuskOfOpulentDreams:4",
          "GladiatorsFinale:4",
          "RetracingBolide:4",
          "ArchaicPetra:4",
          "ArchaicPetra:2",
          "HuskOfOpulentDreams:2",
          "MarechausseeHunter:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "GildedDreams:4"
        ],
        "er_req": 140,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Linnea",
            "element": "geo"
          },
          {
            "role": "Sub-DPS",
            "name": "Columbina",
            "element": "hydro"
          },
          {
            "role": "Support",
            "name": "Illuga",
            "element": "geo"
          }
        ]
      }
    }
  },
  "Ororon": {
    "color": "#1458bc",
    "portraitOffset": -36,
    "talents": {
      "auto": 1,
      "skill": 6,
      "burst": 10
    },
    "buffs": [
      {
        "category": {
          "fr": "C2 : Roi du vin nectarin (DGTs Électro)",
          "en": "C2: King bee of the hidden honeyed wine (Electro DMG)"
        },
        "selectMode": "cumulative",
        "buffs": [
          {
            "label": {
              "fr": "1 ennemi touché par le déchaînement",
              "en": "1 enemy hit by the burst"
            },
            "cons": 2,
            "stats": {
              "elemental_dmg_": 0.08
            }
          },
          {
            "label": {
              "fr": "2 ennemis touchés par le déchaînement",
              "en": "2 enemies hit by the burst"
            },
            "cons": 2,
            "stats": {
              "elemental_dmg_": 0.08
            }
          },
          {
            "label": {
              "fr": "3 ennemis touchés par le déchaînement",
              "en": "3 enemies hit by the burst"
            },
            "cons": 2,
            "stats": {
              "elemental_dmg_": 0.08
            }
          },
          {
            "label": {
              "fr": "4 ennemis touchés par le déchaînement",
              "en": "4 enemies hit by the burst"
            },
            "cons": 2,
            "stats": {
              "elemental_dmg_": 0.08
            }
          }
        ]
      }
    ],
    "builds": {
      "Sub-DPS Électrocution": {
        "name": {
          "fr": "Sub-DPS Électrocution",
          "en": "Electro-Charged Sub-DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.8,
          "electro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "electro_dmg_",
            "atk_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "ScrollOfTheHeroOfCinderCity:4"
        ],
        "goodSets": [
          "NoblesseOblige:4",
          "Instructor:4",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "ThunderingFury:2"
        ],
        "er_req": 140,
        "team": [
          {
            "role": "DPS",
            "name": "Neuvillette",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Furina",
            "element": "hydro"
          },
          {
            "role": "Support",
            "name": "Kazuha",
            "element": "anemo"
          }
        ]
      },
      "Sub-DPS Surcharge": {
        "name": {
          "fr": "Sub-DPS Surcharge",
          "en": "Overload Sub-DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.8,
          "electro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "electro_dmg_",
            "atk_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "ScrollOfTheHeroOfCinderCity:4"
        ],
        "goodSets": [
          "NoblesseOblige:4",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "ThunderingFury:2"
        ],
        "er_req": 120,
        "team": [
          {
            "role": "Support",
            "name": "Chevreuse",
            "element": "pyro"
          },
          {
            "role": "Flex",
            "name": "",
            "element": "pyro"
          },
          {
            "role": "Flex",
            "name": "",
            "element": "electro"
          }
        ]
      }
    }
  },
  "Prune": {
    "color": "#4a52b6",
    "portraitOffset": -36,
    "talents": {
      "auto": 1,
      "skill": 8,
      "burst": 10
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "Hexerei : Vœu de recherche de sorcières (ATQ%)",
              "en": "Hexerei: Witchseeker's vow (ATK%)"
            },
            "active": true,
            "stats": {
              "atk_": 0.6
            }
          }
        ]
      },
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C2 : Bons pour nettoyer les bagages négligés sont les pouvoirs élémentaires (ATQ%)",
              "en": "C2: Useful for Cleaning Messy Baggage, Elemental Powers Are Indeed (ATK%)"
            },
            "cons": 2,
            "stats": {
              "atk_": 0.4
            }
          },
          {
            "label": {
              "fr": "C6 : Et voilà l'histoire ! À partager avec vos amis ! (ATQ)",
              "en": "C6: And That's the Story! Share It With Your Friends! (ATK)"
            },
            "cons": 6,
            "stats": {
              "atk": 350
            }
          }
        ]
      }
    ],
    "builds": {
      "Support Hexerei": {
        "name": {
          "fr": "Support Hexerei",
          "en": "Hexerei Support"
        },
        "weights": {
          "critRate_": 0.4,
          "atk_": 1,
          "atk": 0.8,
          "enerRech_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "atk_"
          ],
          "EQUIP_DRESS": [
            "atk_",
            "critRate_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "ViridescentVenerer:4",
          "NoblesseOblige:4",
          "CelestialGift:4"
        ],
        "goodSets": [
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2"
        ],
        "er_req": 200,
        "team": [
          {
            "role": "DPS",
            "name": "Varka",
            "element": "anemo"
          },
          {
            "role": "Sub-DPS",
            "name": "Durin",
            "element": "pyro"
          },
          {
            "role": "Support",
            "name": "Nicole",
            "element": "pyro"
          }
        ]
      }
    }
  },
  "Qiqi": {
    "color": "#7a5fc2",
    "portraitOffset": -37.5,
    "talents": {
      "auto": 1,
      "skill": 8,
      "burst": 8
    },
    "builds": {
      "Healeuse universelle": {
        "name": {
          "fr": "Healeuse universelle",
          "en": "Universel Healer"
        },
        "weights": {
          "atk_": 1,
          "atk": 0.8,
          "enerRech_": 1,
          "heal_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "enerRech_",
            "atk_"
          ],
          "EQUIP_RING": [
            "atk_"
          ],
          "EQUIP_DRESS": [
            "heal_",
            "atk_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "OceanHuedClam:4",
          "MaidenBeloved:4"
        ],
        "goodSets": [
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "MaidenBeloved:2",
          "OceanHuedClam:2",
          "SongOfDaysPast:2"
        ],
        "er_req": 200,
        "team": [
          {
            "role": "DPS",
            "name": "Eula",
            "element": "cryo"
          },
          {
            "role": "Sub-DPS",
            "name": "Shougun",
            "element": "electro"
          },
          {
            "role": "Sub-DPS",
            "name": "Furina",
            "element": "hydro"
          }
        ]
      },
      "DPS Physique": {
        "name": {
          "fr": "DPS Physique",
          "en": "Physical DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.4,
          "physical_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "physical_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "PaleFlame:4",
          "GladiatorsFinale:4"
        ],
        "goodSets": [
          "BloodstainedChivalry:2",
          "PaleFlame:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2"
        ],
        "er_req": 130,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Fischl",
            "element": "electro"
          },
          {
            "role": "Sub-DPS",
            "name": "Furina",
            "element": "hydro"
          },
          {
            "role": "Support",
            "name": "Mika",
            "element": "cryo"
          }
        ]
      },
      "Support Astroconduction": {
        "name": {
          "fr": "Support Astroconduction",
          "en": "Stellar-Conduct Support"
        },
        "weights": {
          "atk_": 1,
          "atk": 0.8,
          "enerRech_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "enerRech_",
            "atk_"
          ],
          "EQUIP_RING": [
            "atk_"
          ],
          "EQUIP_DRESS": [
            "atk_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "TenacityOfTheMillelith:4",
          "NoblesseOblige:4"
        ],
        "goodSets": [
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2"
        ],
        "er_req": 200,
        "team": [
          {
            "role": "DPS",
            "name": "MarionetteNew",
            "element": "cryo"
          },
          {
            "role": "Sub-DPS",
            "name": "Yae",
            "element": "electro"
          },
          {
            "role": "Sub-DPS",
            "name": "Escoffier",
            "element": "cryo"
          }
        ]
      }
    }
  },
  "Razor": {
    "color": "#715458",
    "portraitOffset": -38,
    "talents": {
      "auto": 10,
      "skill": 8,
      "burst": 9
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "A4 : Famine (ER < 50% - Recharge d'énergie)",
              "en": "A4: Hunger (ER < 50% - ER)"
            },
            "active": false,
            "stats": {
              "enerRech_": 0.3
            }
          }
        ]
      },
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C2 : Répression (ennemis PV < 30% - Taux Crit)",
              "en": "C2: Suppression (enemies HP < 30% - Crit Rate)"
            },
            "cons": 2,
            "active": false,
            "stats": {
              "critRate_": 0.1
            }
          },
          {
            "label": {
              "fr": "C6 : Lupus Fulguris (Hexerei - Taux Crit, DGT Crit)",
              "en": "C6: Lupus Fulguris (Hexerei - Crit Rate, Crit DMG)"
            },
            "cons": 6,
            "active": true,
            "stats": {
              "critRate_": 0.1,
              "critDMG_": 0.5
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Surcharge Hexerei": {
        "name": {
          "fr": "DPS Surcharge Hexerei",
          "en": "Hexerei Overload DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.5,
          "electro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "electro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "ADayCarvedFromRisingWinds:4"
        ],
        "goodSets": [
          "EchoesOfAnOfferin:4",
          "GladiatorsFinale:4",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "ThunderingFury:2"
        ],
        "er_req": 110,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Durin",
            "element": "pyro"
          },
          {
            "role": "Support",
            "name": "Chevreuse",
            "element": "pyro"
          },
          {
            "role": "Sub-DPS",
            "name": "Fischl",
            "element": "electro"
          }
        ]
      },
      "DPS Physique": {
        "name": {
          "fr": "DPS Physique",
          "en": "Physical DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.5,
          "physical_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "physical_dmg_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "ADayCarvedFromRisingWinds:4",
          "PaleFlame:4"
        ],
        "goodSets": [
          "EchoesOfAnOfferin:4",
          "GladiatorsFinale:4",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "BloodstainedChivalry:2",
          "PaleFlame:2"
        ],
        "er_req": 110,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Rosaria",
            "element": "cryo"
          },
          {
            "role": "Support",
            "name": "Zhongli",
            "element": "geo"
          },
          {
            "role": "Sub-DPS",
            "name": "Fischl",
            "element": "electro"
          }
        ]
      }
    }
  },
  "Rosalia": {
    "color": "#521240",
    "portraitOffset": -37,
    "talents": {
      "auto": 1,
      "skill": 6,
      "burst": 10
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "A1 : Confession forcée (compétence dans le dos - Taux Crit)",
              "en": "A1: Regina Probationum (skill from behind - Crit Rate)"
            },
            "active": false,
            "stats": {
              "critRate_": 0.12
            }
          }
        ]
      }
    ],
    "builds": {
      "Sub-DPS Fonte": {
        "name": {
          "fr": "Sub-DPS Fonte",
          "en": "Melt Sub-DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.6,
          "enerRech_": 0.8,
          "cryo_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas",
            "atk_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "cryo_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "GildedDreams:4"
        ],
        "goodSets": [
          "EmblemOfSeveredFate:4",
          "NoblesseOblige:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "BlizzardStrayer:2",
          "FinaleOfTheDeepGalleries:2"
        ],
        "er_req": 170,
        "team": [
          {
            "role": "Support",
            "name": "Bennett",
            "element": "pyro"
          },
          {
            "role": "Support",
            "name": "Kazuha",
            "element": "anemo"
          },
          {
            "role": "Support",
            "name": "Shenhe",
            "element": "cryo"
          }
        ]
      },
      "Sub-DPS Gel": {
        "name": {
          "fr": "Sub-DPS Gel",
          "en": "Freeze Sub-DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.8,
          "cryo_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "cryo_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "BlizzardStrayer:4",
          "MarechausseeHunter:4"
        ],
        "goodSets": [
          "EmblemOfSeveredFate:4",
          "NoblesseOblige:4",
          "ScrollOfTheHeroOfCinderCity:4",
          "NoblesseOblige:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "BlizzardStrayer:2",
          "FinaleOfTheDeepGalleries:2"
        ],
        "er_req": 170,
        "team": [
          {
            "role": "DPS",
            "name": "SkirkNew",
            "element": "cryo"
          },
          {
            "role": "Sub-DPS",
            "name": "Furina",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Escoffier",
            "element": "cryo"
          }
        ]
      }
    }
  },
  "Sandrone": {
    "color": "#5053bb",
    "portraitOffset": -35,
    "talents": {
      "auto": 10,
      "skill": 6,
      "burst": 9
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "A4 : Code de conduite d'une dame (Maîtrise élémentaire)",
              "en": "A4: A lady's code of conduct (EM)"
            },
            "active": true,
            "stats": {
              "eleMas_bonus_scaling": {
                "source": "atk",
                "percent": 0.08,
                "baseline": 0,
                "max": 160
              }
            }
          }
        ]
      },
      {
        "category": "Constellations",
        "selectMode": "cumulative",
        "buffs": [
          {
            "label": {
              "fr": "C2 : Une héritière regarda dans le miroir (attaque chargée uniquement - DGT Crit)",
              "en": "C2: An Heiress Gazed Into the Looking-Glass (charged attack only - Crit DMG)"
            },
            "cons": 2,
            "active": false,
            "stats": {
              "critDMG_": 0.6
            }
          },
          {
            "label": {
              "fr": "C2 : Une héritière regarda dans le miroir (1 stack - attaque chargée uniquement - DGT Crit)",
              "en": "C2: An Heiress Gazed Into the Looking-Glass (1 stack - charged attack only - Crit DMG)"
            },
            "cons": 2,
            "active": false,
            "stats": {
              "critDMG_": 0.2
            }
          },
          {
            "label": {
              "fr": "C2 : Une héritière regarda dans le miroir (2 stacks - attaque chargée uniquement - DGT Crit)",
              "en": "C2: An Heiress Gazed Into the Looking-Glass (2 stacks - charged attack only - Crit DMG)"
            },
            "cons": 2,
            "active": false,
            "stats": {
              "critDMG_": 0.2
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Astroconduction": {
        "name": {
          "fr": "DPS Astroconduction",
          "en": "Stellar-Conduct DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.4,
          "enerRech_": 0.6
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "eleMas"
          ],
          "EQUIP_RING": [
            "atk_",
            "eleMas"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "DisenchantmentInDeepShadow:4"
        ],
        "goodSets": [
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 130,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Yae",
            "element": "electro"
          },
          {
            "role": "Support",
            "name": "Qiqi",
            "element": "cryo"
          },
          {
            "role": "Sub-DPS",
            "name": "Escoffier",
            "element": "cryo"
          }
        ]
      }
    }
  },
  "Sangonomiya Kokomi": {
    "color": "#858fff",
    "portraitOffset": -36,
    "talents": {
      "auto": 1,
      "skill": 8,
      "burst": 8
    },
    "buffs": [
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C6 : Sango Isshin (DGTs Hydro)",
              "en": "C6: Sango Isshin (Hydro DMG)"
            },
            "cons": 6,
            "stats": {
              "elemental_dmg_": 0.4
            }
          }
        ]
      }
    ],
    "builds": {
      "Healeuse universelle": {
        "name": {
          "fr": "Healeuse universelle",
          "en": "Universal Healer"
        },
        "weights": {
          "hp_": 1,
          "hp": 0.8,
          "enerRech_": 1,
          "heal_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "hp_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "hp_"
          ],
          "EQUIP_DRESS": [
            "heal_",
            "hp_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "OceanHuedClam:4",
          "TenacityOfTheMillelith:4"
        ],
        "goodSets": [
          "MaidenBeloved:4",
          "MaidenBeloved:2",
          "OceanHuedClam:2",
          "SongOfDaysPast:2",
          "TenacityOfTheMillelith:2",
          "VourukashasGlow:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2"
        ],
        "er_req": 200,
        "team": [
          {
            "role": "Flex",
            "name": "",
            "element": "hydro"
          },
          {
            "role": "Flex",
            "name": "",
            "element": "hydro"
          },
          {
            "role": "Flex",
            "name": "",
            "element": "hydro"
          }
        ]
      },
      "Driver Fleurissement": {
        "name": {
          "fr": "Driver Fleurissement",
          "en": "Bloom Driver"
        },
        "weights": {
          "hp_": 0.8,
          "hp": 0.1,
          "eleMas": 1,
          "enerRech_": 0.8,
          "heal_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas",
            "enerRech_",
            "hp_"
          ],
          "EQUIP_RING": [
            "eleMas",
            "hp_"
          ],
          "EQUIP_DRESS": [
            "eleMas",
            "heal_",
            "hp_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "FlowerOfParadiseLost:4",
          "GildedDreams:4"
        ],
        "goodSets": [
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 200,
        "team": [
          {
            "role": "Support",
            "name": "Nilou",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Lauma",
            "element": "dendro"
          },
          {
            "role": "Support",
            "name": "Nahida",
            "element": "dendro"
          }
        ]
      }
    }
  },
  "Sayu": {
    "color": "#967866",
    "portraitOffset": -42,
    "talents": {
      "auto": 1,
      "skill": 9,
      "burst": 9
    },
    "builds": {
      "Burst Support": {
        "name": {
          "fr": "Burst Support",
          "en": "Burst Support"
        },
        "weights": {
          "critRate_": 0.4,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.9,
          "enerRech_": 1,
          "heal_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "enerRech_",
            "atk_",
            "eleMas"
          ],
          "EQUIP_RING": [
            "atk_",
            "eleMas"
          ],
          "EQUIP_DRESS": [
            "heal_",
            "atk_",
            "eleMas",
            "criRate_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "ViridescentVenerer:4",
          "DeepwoodMemories:4"
        ],
        "goodSets": [
          "NoblesseOblige:4",
          "OceanHuedClam:4",
          "ViridescentVenerer:2",
          "DesertPavilionChronicle:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 200,
        "team": [
          {
            "role": "DPS",
            "name": "Keqing",
            "element": "electro"
          },
          {
            "role": "Sub-DPS",
            "name": "Nahida",
            "element": "dendro"
          },
          {
            "role": "Sub-DPS",
            "name": "Fischl",
            "element": "electro"
          }
        ]
      },
      "Driver Dispersion": {
        "name": {
          "fr": "Driver Dispersion",
          "en": "Swirl Driver"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.9,
          "anemo_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "eleMas"
          ],
          "EQUIP_RING": [
            "anemo_dmg_",
            "eleMas"
          ],
          "EQUIP_DRESS": [
            "eleMas",
            "criRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "ViridescentVenerer:4",
          "DeepwoodMemories:4"
        ],
        "goodSets": [
          "NoblesseOblige:4",
          "OceanHuedClam:4",
          "ViridescentVenerer:2",
          "DesertPavilionChronicle:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2"
        ],
        "er_req": 100,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Kaeya",
            "element": "cryo"
          },
          {
            "role": "Sub-DPS",
            "name": "Xiangling",
            "element": "pyro"
          },
          {
            "role": "Support",
            "name": "Bennett",
            "element": "pyro"
          }
        ]
      }
    }
  },
  "Sethos": {
    "color": "#352865",
    "portraitOffset": -36,
    "talents": {
      "auto": 9,
      "skill": 9,
      "burst": 8
    },
    "buffs": [
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C1 : Chant du sanctuaire scellé (attaque chargée uniquement - Taux Crit)",
              "en": "C1: Sealed shrine's spiritsong (charged attack only - Crit DMG)"
            },
            "active": false,
            "cons": 1,
            "stats": {
              "critRate_": 0.15
            }
          },
          {
            "label": {
              "fr": "C2 : Papyrus du secret silencieux (DGTs Électro)",
              "en": "C2: Papyrus scripture of silent secrets (Electro DMG)"
            },
            "active": true,
            "cons": 2,
            "stats": {
              "elemental_dmg_": 0.15
            }
          },
          {
            "label": {
              "fr": "C4 : Collection de la plume bienveillante (Maîtrise élémentaire)",
              "en": "C4: Beneficient plumage (EM)"
            },
            "active": true,
            "cons": 4,
            "stats": {
              "eleMas": 80
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Suractivation": {
        "name": {
          "fr": "DPS Suractivation",
          "en": "Aggravate DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "eleMas": 0.8,
          "enerRech_": 0.8,
          "electro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "electro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [
          "atk"
        ],
        "bestSets": [
          "WanderersTroupe:4",
          "GildedDreams:4"
        ],
        "goodSets": [
          "DesertPavilionChronicle:4",
          "MarechausseeHunter:2",
          "ThunderingFury:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 140,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Fischl",
            "element": "electro"
          },
          {
            "role": "",
            "name": "",
            "element": "dendro"
          },
          {
            "role": "",
            "name": "",
            "element": "dendro"
          }
        ]
      }
    }
  },
  "Shenhe": {
    "color": "#a1c4ff",
    "portraitOffset": -36,
    "skins": {
      "206301": {
        "color": "#b1e5ff",
        "portraitOffset": -34
      }
    },
    "talents": {
      "auto": 1,
      "skill": 10,
      "burst": 9
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "A1 : Étreinte divine (DGTs Cryo)",
              "en": "A1: Deific embrace (Cryo DMG)"
            },
            "stats": {
              "elemental_dmg_": 0.15
            }
          }
        ]
      },
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C2 : Esprit centré (uniquement dégâts Cryo - DGT Crit)",
              "en": "C2: Centered spirit (only Cryo damage - Crit DMG)"
            },
            "cons": 2,
            "stats": {
              "critDMG_": 0.15
            }
          }
        ]
      }
    ],
    "builds": {
      "Support Cryo": {
        "name": {
          "fr": "Support Cryo",
          "en": "Cryo Support"
        },
        "weights": {
          "atk_": 1,
          "atk": 0.8,
          "enerRech_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "atk_"
          ],
          "EQUIP_DRESS": [
            "atk_",
            "critRate_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "NoblesseOblige:4",
          "ScrollOfTheHeroOfCinderCity:4"
        ],
        "goodSets": [
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2"
        ],
        "er_req": 180,
        "team": [
          {
            "role": "DPS",
            "name": "SkirkNew",
            "element": "cryo"
          },
          {
            "role": "Sub-DPS",
            "name": "Furina",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Escoffier",
            "element": "cryo"
          }
        ]
      }
    }
  },
  "Shikanoin Heizou": {
    "color": "#852f47",
    "portraitOffset": -37,
    "talents": {
      "auto": 9,
      "skill": 10,
      "burst": 8
    },
    "buffs": [
      {
        "category": "Constellations",
        "selectMode": "cumulative",
        "buffs": [
          {
            "label": {
              "fr": "C6 : Registre curieux (1 cumul - Compétence uniquement - Taux Crit)",
              "en": "C6: Curious casefiles (1 stack - Skill only - Crit Rate)"
            },
            "cons": 6,
            "active": false,
            "stats": {
              "critRate_": 0.04
            }
          },
          {
            "label": {
              "fr": "C6 : Registre curieux (2 cumuls - Compétence uniquement - Taux Crit)",
              "en": "C6: Curious casefiles (2 stacks - Skill only - Crit Rate)"
            },
            "cons": 6,
            "active": false,
            "stats": {
              "critRate_": 0.04
            }
          },
          {
            "label": {
              "fr": "C6 : Registre curieux (3 cumuls - Compétence uniquement - Taux Crit)",
              "en": "C6: Curious casefiles (3 stacks - Skill only - Crit Rate)"
            },
            "cons": 6,
            "active": false,
            "stats": {
              "critRate_": 0.04
            }
          },
          {
            "label": {
              "fr": "C6 : Registre curieux (4 cumuls - Compétence uniquement - Taux Crit)",
              "en": "C6: Curious casefiles (4 stacks - Skill only - Crit Rate)"
            },
            "cons": 6,
            "active": false,
            "stats": {
              "critRate_": 0.04,
              "critDMG_": 0.32
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Anémo": {
        "name": {
          "fr": "DPS Anémo",
          "en": "Anemo DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.4,
          "anemo_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "anemo_dmg_",
            "atk_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "ViridescentVenerer:4",
          "ViridescentVenerer:2",
          "DesertPavilionChronicle:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2"
        ],
        "goodSets": [
          "Lavawalker:4"
        ],
        "er_req": 150,
        "team": [
          {
            "role": "Support",
            "name": "Faruzan",
            "element": "anemo"
          },
          {
            "role": "Sub-DPS",
            "name": "Xiangling",
            "element": "pyro"
          },
          {
            "role": "Support",
            "name": "Bennett",
            "element": "pyro"
          }
        ]
      }
    }
  },
  "Shogun Raiden": {
    "color": "#4A3294",
    "portraitOffset": -33,
    "talents": {
      "auto": 1,
      "skill": 8,
      "burst": 10
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "A4 : L'Illuminée (DGTs Électro)",
              "en": "A4: Enlightened one (Electro DMG)"
            },
            "stats": {
              "elemental_dmg_bonus_scaling": {
                "source": "enerRech_",
                "percent": 0.4,
                "baseline": 100
              }
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Électro": {
        "name": {
          "fr": "DPS Électro",
          "en": "Electro DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 1,
          "electro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "enerRech_",
            "atk_"
          ],
          "EQUIP_RING": [
            "electro_dmg_",
            "atk_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "EmblemOfSeveredFate:4"
        ],
        "goodSets": [
          "MarechausseeHunter:4",
          "GildedDreams:4",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "ThunderingFury:2"
        ],
        "er_req": 280,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Xiangling",
            "element": "pyro"
          },
          {
            "role": "Sub-DPS",
            "name": "Xingqiu",
            "element": "hydro"
          },
          {
            "role": "Support",
            "name": "Bennett",
            "element": "pyro"
          }
        ]
      },
      "DPS Exubérance": {
        "name": {
          "fr": "DPS Exubérance",
          "en": "Hyperbloom DPS"
        },
        "weights": {
          "eleMas": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas"
          ],
          "EQUIP_RING": [
            "eleMas"
          ],
          "EQUIP_DRESS": [
            "eleMas"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [
          "atk"
        ],
        "bestSets": [
          "FlowerOfParadiseLost:4",
          "GildedDreams:4"
        ],
        "goodSets": [
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "DeepwoodMemories:4"
        ],
        "er_req": 100,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Yelan",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Xingqiu",
            "element": "hydro"
          },
          {
            "role": "Support",
            "name": "Baizhuer",
            "element": "dendro"
          }
        ]
      }
    }
  },
  "Sigewinne": {
    "color": "#6cc9ff",
    "portraitOffset": -34,
    "talents": {
      "auto": 1,
      "skill": 10,
      "burst": 8
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "A1 : Repos adéquat requis (DGTs Hydro)",
              "en": "A1: Requires appropriate rest (Hydro DMG)"
            },
            "stats": {
              "elemental_dmg_": 0.08
            }
          },
          {
            "label": {
              "fr": "A4 : Traitement minutieux prescrit (Soins)",
              "en": "A4: Detailed diagnosis, thorough treatment (Healing)"
            },
            "stats": {
              "heal_": 0.3
            }
          }
        ]
      },
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C6 : « Le plus radieux des esprits peut-il prier pour moi ? » (Taux Crit, DGT Crit)",
              "en": "C6: \"Can the Most Radiant of Spirits Pray For Me?\" (Crit Rate, Crit DMG)"
            },
            "cons": 6,
            "active": false,
            "stats": {
              "critRate__bonus_scaling": {
                "source": "hp",
                "percent": 0.0004,
                "max": 20
              },
              "critDMG__bonus_scaling": {
                "source": "hp",
                "percent": 0.0022,
                "max": 110
              }
            }
          }
        ]
      }
    ],
    "builds": {
      "Healeuse universelle": {
        "name": {
          "fr": "Healeuse universelle",
          "en": "Universal Healer"
        },
        "weights": {
          "hp_": 1,
          "hp": 0.8,
          "enerRech_": 0.8,
          "heal_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "hp_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "hp_"
          ],
          "EQUIP_DRESS": [
            "hp_",
            "heal_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "SongOfDaysPast:4",
          "OceanHuedClam:4"
        ],
        "goodSets": [
          "TenacityOfTheMillelith:2",
          "VourukashasGlow:2",
          "MaidenBeloved:2",
          "OceanHuedClam:2",
          "SongOfDaysPast:2"
        ],
        "er_req": 160,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Furina",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Fischl",
            "element": "electro"
          },
          {
            "role": "Support",
            "name": "Nahida",
            "element": "dendro"
          }
        ]
      },
      "Sub-DPS Burst": {
        "name": {
          "fr": "Sub-DPS Burst",
          "en": "Burst Sub-DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "hp_": 1,
          "hp": 0.1,
          "enerRech_": 0.8,
          "hydro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "hp_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "hydro_dmg_",
            "hp_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_",
            "hp_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "EmblemOfSeveredFate:4",
          "VourukashasGlow:4"
        ],
        "goodSets": [
          "TenacityOfTheMillelith:2",
          "VourukashasGlow:2",
          "HeartOfDepth:2",
          "NymphsDream:2"
        ],
        "er_req": 180,
        "team": [
          {
            "role": "Support",
            "name": "Furina",
            "element": "hydro"
          },
          {
            "role": "Support",
            "name": "Kazuha",
            "element": "anemo"
          },
          {
            "role": "Sub-DPS",
            "name": "Xiangling",
            "element": "pyro"
          }
        ]
      }
    }
  },
  "Skirk": {
    "color": "#0525F4",
    "portraitOffset": -37,
    "talents": {
      "auto": 1,
      "skill": 8,
      "burst": 8
    },
    "buffs": [
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C2 : Abîme profond (ATQ%)",
              "en": "C2: Into the abyss (ATK%)"
            },
            "cons": 2,
            "stats": {
              "atk_": 0.7
            }
          },
          {
            "label": {
              "fr": "C4 : Flux scindé (ATQ%)",
              "en": "C4: Fractured flow (ATK%)"
            },
            "cons": 4,
            "stats": {
              "atk_": 0.4
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Gel": {
        "name": {
          "fr": "DPS Gel",
          "en": "Freeze DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "cryo_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "cryo_dmg_",
            "atk_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "bestSets": [
          "FinaleOfTheDeepGalleries:4",
          "MarechausseeHunter:4"
        ],
        "goodSets": [
          "GladiatorsFinale:4",
          "BlizzardStrayer:4",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "BlizzardStrayer:2",
          "FinaleOfTheDeepGalleries:2"
        ],
        "er_req": 100,
        "team": [
          {
            "role": "Support",
            "name": "Furina",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Escoffier",
            "element": "cryo"
          },
          {
            "role": "Flex",
            "element": [
              "hydro",
              "cryo"
            ]
          }
        ]
      }
    }
  },
  "Sucrose": {
    "color": "#2b8e57",
    "portraitOffset": -37,
    "talents": {
      "auto": 1,
      "skill": 8,
      "burst": 8
    },
    "builds": {
      "Support universel": {
        "name": {
          "fr": "Support universel",
          "en": "Universal Support"
        },
        "weights": {
          "eleMas": 1,
          "enerRech_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "eleMas"
          ],
          "EQUIP_DRESS": [
            "eleMas"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [
          "atk"
        ],
        "bestSets": [
          "ViridescentVenerer:4"
        ],
        "goodSets": [
          "GildedDreams:4",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 170,
        "team": [
          {
            "role": "",
            "name": "",
            "element": ""
          },
          {
            "role": "",
            "name": "",
            "element": ""
          },
          {
            "role": "",
            "name": "",
            "element": ""
          }
        ]
      }
    }
  },
  "Tartaglia": {
    "color": "#267ea8",
    "portraitOffset": -36,
    "talents": {
      "auto": 1,
      "skill": 10,
      "burst": 9
    },
    "builds": {
      "DPS Évaporation inversée": {
        "name": {
          "fr": "DPS Évaporation inversée",
          "en": "Reverse Vape DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.6,
          "hydro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "eleMas"
          ],
          "EQUIP_RING": [
            "hydro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "NymphsDream:4"
        ],
        "goodSets": [
          "HeartOfDepth:4",
          "HeartOfDepth:2",
          "NymphsDream:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 100,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Xiangling",
            "element": "pyro"
          },
          {
            "role": "Support",
            "name": "Kazuha",
            "element": "anemo"
          },
          {
            "role": "Support",
            "name": "Bennett",
            "element": "pyro"
          }
        ]
      },
      "DPS Électrocution": {
        "name": {
          "fr": "DPS Électrocution",
          "en": "Electro-Charged DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "hydro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "hydro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "NymphsDream:4"
        ],
        "goodSets": [
          "HeartOfDepth:4",
          "HeartOfDepth:2",
          "NymphsDream:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2"
        ],
        "er_req": 100,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Fischl",
            "element": "electro"
          },
          {
            "role": "Sub-DPS",
            "name": "Beidou",
            "element": "electro"
          },
          {
            "role": "Support",
            "name": "Bennett",
            "element": "pyro"
          }
        ]
      },
      "DPS Gel": {
        "name": {
          "fr": "DPS Gel",
          "en": "Freeze DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "hydro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "hydro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "NymphsDream:4",
          "MarechausseeHunter:4"
        ],
        "goodSets": [
          "HeartOfDepth:4",
          "HeartOfDepth:2",
          "NymphsDream:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2"
        ],
        "er_req": 100,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Furina",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Escoffier",
            "element": "cryo"
          },
          {
            "role": "Support",
            "name": "Citlali",
            "element": "cryo"
          }
        ]
      }
    }
  },
  "Thomas": {
    "color": "#922533",
    "portraitOffset": -36,
    "talents": {
      "auto": 1,
      "skill": 9,
      "burst": 9
    },
    "builds": {
      "Shielder universel": {
        "name": {
          "fr": "Shielder universel",
          "en": "Universal Shielder"
        },
        "weights": {
          "critRate_": 0.4,
          "hp_": 1,
          "hp": 0.8,
          "enerRech_": 0.8
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "hp_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "hp_"
          ],
          "EQUIP_DRESS": [
            "hp_",
            "critRate_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "NoblesseOblige:4"
        ],
        "goodSets": [
          "TenacityOfTheMillelith:2",
          "VourukashasGlow:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2"
        ],
        "er_req": 200,
        "team": [
          {
            "role": "",
            "name": "",
            "element": ""
          },
          {
            "role": "",
            "name": "",
            "element": ""
          },
          {
            "role": "",
            "name": "",
            "element": ""
          }
        ]
      },
      "Sub-DPS Bourgeonnement": {
        "name": {
          "fr": "Sub-DPS Bourgeonnement",
          "en": "Burgeon Sub-DPS"
        },
        "weights": {
          "critRate_": 0.4,
          "hp_": 0.4,
          "hp": 0.1,
          "eleMas": 1,
          "enerRech_": 0.8
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas",
            "hp_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "eleMas",
            "hp_"
          ],
          "EQUIP_DRESS": [
            "eleMas",
            "hp_",
            "critRate_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "FlowerOfParadiseLost:4",
          "GildedDreams:4"
        ],
        "goodSets": [
          "CrimsonWitchOfFlames:4",
          "TenacityOfTheMillelith:2",
          "VourukashasGlow:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2"
        ],
        "er_req": 200,
        "team": [
          {
            "role": "Support",
            "name": "Baizhuer",
            "element": "dendro"
          },
          {
            "role": "Sub-DPS",
            "name": "Yelan",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Xingqiu",
            "element": "hydro"
          }
        ]
      }
    }
  },
  "Tighnari": {
    "color": "#36AE61",
    "portraitOffset": -37,
    "talents": {
      "auto": 10,
      "skill": 6,
      "burst": 8
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "A1 : Vue aiguë (Maîtrise élémentaire)",
              "en": "A1: Keen sight (EM)"
            },
            "active": true,
            "stats": {
              "eleMas": 50
            }
          }
        ]
      },
      {
        "category": {
          "fr": "Constellation 1 : Début déterminé à la racine (Taux Crit)",
          "en": "Constellation 1: Beginnings determined at the roots (Crit Rate)"
        },
        "buffs": [
          {
            "label": {
              "fr": "Concerne uniquement les attaques chargées",
              "en": "Only for the charged attacks"
            },
            "cons": 1,
            "active": false,
            "stats": {
              "critRate_": 0.15
            }
          }
        ]
      },
      {
        "category": {
          "fr": "Constellation 2 : Origine connue dans la tige (DGTs Dendro)",
          "en": "Constellation 2: Origins known from the stem (Dendro DMG)"
        },
        "buffs": [
          {
            "label": {
              "fr": "Lorsqu'un ennemi est dans la compétence élémentaire",
              "en": "When an enemy is inside the elemental skill"
            },
            "cons": 2,
            "stats": {
              "elemental_dmg_": 0.2
            }
          }
        ]
      },
      {
        "category": {
          "fr": "Constellation 4 : Flétrissement entrevu grâce aux feuilles (Maîtrise élémentaire)",
          "en": "Constellation 4: Withering glimpsed in the leaves (EM)"
        },
        "selectMode": "cumulative",
        "buffs": [
          {
            "label": {
              "fr": "Lorsque le déchaînement élémentaire est utilisé",
              "en": "When the elemental burst is used"
            },
            "cons": 4,
            "stats": {
              "eleMas": 60
            }
          },
          {
            "label": {
              "fr": "Si une réaction liée à l'élément Dendro est déclenchée",
              "en": "If a Dendro elemental reaction is triggered"
            },
            "cons": 4,
            "stats": {
              "eleMas": 60
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Propagation": {
        "name": {
          "fr": "DPS Propagation",
          "en": "Spread DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 1,
          "enerRech_": 0.5,
          "dendro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas",
            "atk_"
          ],
          "EQUIP_RING": [
            "dendro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "DeepwoodMemories:4",
          "WanderersTroupe:4",
          "GildedDreams:4"
        ],
        "goodSets": [
          "DeepwoodMemories:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2"
        ],
        "er_req": 130,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Yae",
            "element": "electro"
          },
          {
            "role": "Sub-DPS",
            "name": "Fischl",
            "element": "electro"
          },
          {
            "role": "Support",
            "name": "Yaoyao",
            "element": "dendro"
          }
        ]
      }
    }
  },
  "Varesa": {
    "color": "#E86EE7",
    "portraitOffset": -36,
    "talents": {
      "auto": 8,
      "skill": 6,
      "burst": 8
    },
    "buffs": [
      {
        "category": "Passifs",
        "selectMode": "exclusive",
        "data": [
          {
            "label": {
              "fr": "A4 : L'héroïne une nouvelle fois de retour ! (1 Stack - ATQ%)",
              "en": "A4: The hero twice-returned! (1 Stack - ATK%)"
            },
            "active": false,
            "stats": {
              "atk_": 0.35
            }
          },
          {
            "label": {
              "fr": "A4 : L'héroïne une nouvelle fois de retour ! (2 Stacks - ATK%)",
              "en": "A4: The hero twice-returned (2 Stacks - ATK%)"
            },
            "active": true,
            "stats": {
              "atk_": 0.7
            }
          }
        ]
      },
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C6 : Le triomphe d'une héroïne de la justice (Taux Crit, DGT Crit)",
              "en": "C6: A hero of justice's triumph (Crit Rate, Crit DMG)"
            },
            "cons": 6,
            "active": false,
            "stats": {
              "critRate_": 0.1,
              "critDMG_": 1
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Surcharge": {
        "name": {
          "fr": "DPS Surcharge",
          "en": "Overload DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.8,
          "electro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "electro_dmg_",
            "atk_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "bestSets": [
          "LongNightsOath:4",
          "ObsidianCodex:4"
        ],
        "goodSets": [
          "ThunderingFury:4",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "LongNightsOath:2",
          "ThunderingFury:2"
        ],
        "er_req": 120,
        "team": [
          {
            "role": "Flex",
            "name": [
              "Mavuika",
              "Durin"
            ],
            "element": "pyro"
          },
          {
            "role": "Support",
            "name": "Chevreuse",
            "element": "pyro"
          },
          {
            "role": "Support",
            "name": "Iansan",
            "element": "electro"
          }
        ]
      },
      "DPS Hypercarry": {
        "name": {
          "fr": "DPS Hypercarry",
          "en": "Hypercarry DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.8,
          "electro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "electro_dmg_",
            "atk_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "bestSets": [
          "LongNightsOath:4",
          "ObsidianCodex:4"
        ],
        "goodSets": [
          "MarechausseeHunter:4",
          "ThunderingFury:4",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "LongNightsOath:2",
          "ThunderingFury:2"
        ],
        "er_req": 120,
        "team": [
          {
            "role": "Support",
            "name": "Furina",
            "element": "hydro"
          },
          {
            "role": "Support",
            "name": "Liuyun",
            "element": "anemo"
          },
          {
            "role": "Support",
            "name": "Iansan",
            "element": "electro"
          }
        ]
      },
      "DPS Suractivation": {
        "name": {
          "fr": "DPS Suractivation",
          "en": "Aggravate DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.8,
          "enerRech_": 0.8,
          "electro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "electro_dmg_",
            "atk_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "bestSets": [
          "LongNightsOath:4",
          "ObsidianCodex:4"
        ],
        "goodSets": [
          "ThunderingFury:4",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "LongNightsOath:2",
          "ThunderingFury:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 120,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Lauma",
            "element": "dendro"
          },
          {
            "role": "Flex",
            "name": [
              "Fischl",
              "Iansan"
            ],
            "element": "electro"
          },
          {
            "role": "Support",
            "name": [
              "Ineffa",
              "Nahida"
            ],
            "element": [
              "electro",
              "dendro"
            ]
          }
        ]
      },
      "DPS Sélénocution": {
        "name": {
          "fr": "DPS Sélénocution",
          "en": "Lunar-Charged DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.5,
          "enerRech_": 0.8,
          "electro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "electro_dmg_",
            "atk_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "bestSets": [
          "LongNightsOath:4",
          "ObsidianCodex:4"
        ],
        "goodSets": [
          "ThunderingFury:4",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "LongNightsOath:2",
          "ThunderingFury:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 130,
        "team": [
          {
            "role": "Support",
            "name": "Columbina",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Ineffa",
            "element": "electro"
          },
          {
            "role": "Support",
            "name": "Liuyun",
            "element": "anemo"
          }
        ]
      }
    }
  },
  "Varka": {
    "color": "#1D849A",
    "portraitOffset": -38,
    "talents": {
      "auto": 1,
      "skill": 10,
      "burst": 8
    },
    "buffs": [
      {
        "category": "Passifs",
        "selectMode": "exclusive",
        "buffs": [
          {
            "label": {
              "fr": "A1 : Équipe avec Pyro (DGTs Anémo, DGTs Pyro)",
              "en": "A1: Party with Pyro (Anemo DMG, Pyro DMG)"
            },
            "active": true,
            "stats": {
              "elemental_dmg_bonus_scaling": {
                "source": "atk",
                "percent": 0.01,
                "max": 25
              },
              "pyro_dmg_bonus_scaling": {
                "source": "atk",
                "percent": 0.01,
                "max": 25
              }
            }
          },
          {
            "label": {
              "fr": "A1 : Équipe avec Hydro (DGTs Anémo, DGTs Hydro)",
              "en": "A1: Party with Hydro (Anemo DMG, Hydro DMG)"
            },
            "active": false,
            "stats": {
              "elemental_dmg_bonus_scaling": {
                "source": "atk",
                "percent": 0.01,
                "max": 25
              },
              "hydro_dmg_bonus_scaling": {
                "source": "atk",
                "percent": 0.01,
                "max": 25
              }
            }
          },
          {
            "label": {
              "fr": "A1 : Équipe avec Électro (DGTs Anémo, DGTs Électro)",
              "en": "A1: Party with Electro (Anemo DMG, Electro DMG)"
            },
            "active": false,
            "stats": {
              "elemental_dmg_bonus_scaling": {
                "source": "atk",
                "percent": 0.01,
                "max": 25
              },
              "electro_dmg_bonus_scaling": {
                "source": "atk",
                "percent": 0.01,
                "max": 25
              }
            }
          },
          {
            "label": {
              "fr": "A1 : Équipe avec Cryo (DGTs Anémo, DGTs Cryo)",
              "en": "A1: Party with Cryo (Anemo DMG, Cryo DMG)"
            },
            "active": false,
            "stats": {
              "elemental_dmg_bonus_scaling": {
                "source": "atk",
                "percent": 0.01,
                "max": 25
              },
              "cryo_dmg_bonus_scaling": {
                "source": "atk",
                "percent": 0.01,
                "max": 25
              }
            }
          }
        ]
      },
      {
        "category": {
          "fr": "Constellation 4",
          "en": "Constellation 4: \"For None May Take From Us Our Freedom of Song\""
        },
        "selectMode": "exclusive",
        "buffs": [
          {
            "label": {
              "fr": "Dispersion Pyro (DGTs Anémo, DGTs Pyro)",
              "en": "Pyro Swirl (Anemo DMG, Pyro DMG)"
            },
            "active": true,
            "cons": 4,
            "stats": {
              "anemo_dmg_": 0.2,
              "pyro_dmg_": 0.2
            }
          },
          {
            "label": {
              "fr": "Dispersion Hydro (DGTs Anémo, DGTs Hydro)",
              "en": "Hydro Swirl (Anemo DMG, Hydro DMG)"
            },
            "active": false,
            "cons": 4,
            "stats": {
              "anemo_dmg_": 0.2,
              "hydro_dmg_": 0.2
            }
          },
          {
            "label": {
              "fr": "Dispersion Électro (DGTs Anémo, DGTs Électro)",
              "en": "Electro Swirl (Anemo DMG, Electro DMG)"
            },
            "active": false,
            "cons": 4,
            "stats": {
              "anemo_dmg_": 0.2,
              "electro_dmg_": 0.2
            }
          },
          {
            "label": {
              "fr": "Dispersion Cryo (DGTs Anémo, DGTs Cryo)",
              "en": "Cryo Swirl (Anemo DMG, Cryo DMG)"
            },
            "active": false,
            "cons": 4,
            "stats": {
              "anemo_dmg_": 0.2,
              "cryo_dmg_": 0.2
            }
          }
        ]
      },
      {
        "category": {
          "fr": "Constellation 6",
          "en": "Constellation 6"
        },
        "buffs": [
          {
            "label": {
              "fr": "4 Cumuls",
              "en": "4 Stacks"
            },
            "cons": 6,
            "stats": {
              "critDMG_": 0.8
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Anémo/Pyro": {
        "name": {
          "fr": "DPS Anémo/Pyro",
          "en": "Anemo/Pyro DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "pyro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "pyro_dmg_",
            "atk_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "hideUIStats": [
          "heal_"
        ],
        "showUIStats": [
          "pyro_dmg_"
        ],
        "bestSets": [
          "ADayCarvedFromRisingWinds:4"
        ],
        "goodSets": [
          "DesertPavilionChronicle:4",
          "GladiatorsFinale:4",
          "ViridescentVenerer:2",
          "DesertPavilionChronicle:2",
          "EchoesOfAnOffering:4",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "CrimsonWitchOfFlames:2"
        ],
        "er_req": 100,
        "team": [
          {
            "role": "Flex",
            "name": [
              "Venti",
              "Prune"
            ],
            "element": "anemo"
          },
          {
            "role": "Sub-DPS",
            "name": "Durin",
            "element": "pyro"
          },
          {
            "role": "Support",
            "name": "Nicole",
            "element": "pyro"
          }
        ]
      },
      "DPS Anémo/Cryo": {
        "name": {
          "fr": "DPS Anémo/Cryo",
          "en": "Anemo/Cryo DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "cryo_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "cryo_dmg_",
            "atk_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "hideUIStats": [
          "heal_"
        ],
        "showUIStats": [
          "cryo_dmg_"
        ],
        "bestSets": [
          "ADayCarvedFromRisingWinds:4"
        ],
        "goodSets": [
          "DesertPavilionChronicle:4",
          "GladiatorsFinale:4",
          "ViridescentVenerer:2",
          "DesertPavilionChronicle:2",
          "EchoesOfAnOffering:4",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "BlizzardStrayer:2",
          "FinaleOfTheDeepGalleries:2"
        ],
        "er_req": 100,
        "team": [
          {
            "role": "Flex",
            "name": [
              "Venti",
              "Prune"
            ],
            "element": "anemo"
          },
          {
            "role": "Sub-DPS",
            "name": "Escoffier",
            "element": "cryo"
          },
          {
            "role": "Support",
            "name": "Shenhe",
            "element": "cryo"
          }
        ]
      },
      "DPS Anémo/Électro": {
        "name": {
          "fr": "DPS Anémo/Électro",
          "en": "Anemo/Electro DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "electro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "electro_dmg_",
            "atk_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "hideUIStats": [
          "heal_"
        ],
        "showUIStats": [
          "electro_dmg_"
        ],
        "bestSets": [
          "ADayCarvedFromRisingWinds:4"
        ],
        "goodSets": [
          "DesertPavilionChronicle:4",
          "ViridescentVenerer:2",
          "DesertPavilionChronicle:2",
          "GladiatorsFinale:4",
          "EchoesOfAnOffering:4",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "ThunderingFury:2"
        ],
        "er_req": 100,
        "team": [
          {
            "role": "Flex",
            "name": [
              "Venti",
              "Prune"
            ],
            "element": "anemo"
          },
          {
            "role": "Sub-DPS",
            "name": "Fischl",
            "element": "electro"
          },
          {
            "role": "Support",
            "name": "Iansan",
            "element": "electro"
          }
        ]
      },
      "DPS Anémo/Hydro": {
        "name": {
          "fr": "DPS Anémo/Hydro",
          "en": "Anemo/Hydro DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "hydro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "hydro_dmg_",
            "atk_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "hideUIStats": [
          "heal_"
        ],
        "showUIStats": [
          "hydro_dmg_"
        ],
        "bestSets": [
          "ADayCarvedFromRisingWinds:4"
        ],
        "goodSets": [
          "DesertPavilionChronicle:4",
          "GladiatorsFinale:4",
          "EchoesOfAnOffering:4",
          "ViridescentVenerer:2",
          "DesertPavilionChronicle:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "HeartOfDepth:2",
          "NymphsDream:2"
        ],
        "er_req": 100,
        "team": [
          {
            "role": "Flex",
            "name": [
              "Venti",
              "Prune"
            ],
            "element": "anemo"
          },
          {
            "role": "Sub-DPS",
            "name": "Yelan",
            "element": "hydro"
          },
          {
            "role": "Support",
            "name": "Mona",
            "element": "hydro"
          }
        ]
      }
    }
  },
  "Venti": {
    "color": "#469278",
    "portraitOffset": -36,
    "talents": {
      "auto": 8,
      "skill": 8,
      "burst": 10
    },
    "buffs": [
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C4 : Vent glacial de liberté (Hexerei - DGTs Anémo)",
              "en": "C4: Hurricane of freedom (Hexerei - Anemo DMG)"
            },
            "cons": 4,
            "active": true,
            "stats": {
              "elemental_dmg_": 0.25
            }
          },
          {
            "label": {
              "fr": "C6 : Tempête de résistance (Hexerei - DGT Crit)",
              "en": "C6: Storm of defiance (Hexerei - Crit DMG)"
            },
            "cons": 6,
            "active": false,
            "stats": {
              "critDMG_": 1
            }
          }
        ]
      }
    ],
    "builds": {
      "Support Dispersion off-field": {
        "name": {
          "fr": "Support Dispersion off-field",
          "en": "Off-field Swirl Support"
        },
        "weights": {
          "critRate_": 0.4,
          "eleMas": 1,
          "enerRech_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "eleMas"
          ],
          "EQUIP_DRESS": [
            "eleMas",
            "critRate_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [
          "atk"
        ],
        "bestSets": [
          "ViridescentVenerer:4"
        ],
        "goodSets": [
          "ScrollOfTheHeroOfCinderCity:4",
          "GildedDreams:4",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2"
        ],
        "er_req": 180,
        "team": [
          {
            "role": "",
            "name": "",
            "element": ""
          },
          {
            "role": "",
            "name": "",
            "element": ""
          },
          {
            "role": "",
            "name": "",
            "element": ""
          }
        ]
      },
      "DPS Anémo": {
        "name": {
          "fr": "DPS Anémo",
          "en": "Anemo DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.6,
          "anemo_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "anemo_dmg_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "ADayCarvedFromRisingWinds:4"
        ],
        "goodSets": [
          "EchoesOfAnOffering:4",
          "ViridescentVenerer:4",
          "DesertPavilionChronicle:4",
          "ViridescentVenerer:2",
          "DesertPavilionChronicle:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2"
        ],
        "er_req": 140,
        "team": [
          {
            "role": "Support",
            "name": "Faruzan",
            "element": "anemo"
          },
          {
            "role": "Sub-DPS",
            "name": "Durin",
            "element": "pyro"
          },
          {
            "role": "Support",
            "name": "Nicole",
            "element": "pyro"
          }
        ]
      }
    }
  },
  "Wriothesley": {
    "color": "#112a75",
    "portraitOffset": -37,
    "talents": {
      "auto": 10,
      "skill": 9,
      "burst": 8
    },
    "buffs": [
      {
        "category": "Passifs",
        "selectMode": "cumulative",
        "buffs": [
          {
            "label": {
              "fr": "A4 : Rétribution pour le péché (1 stack - ATQ%)",
              "en": "A4: There shall be a reckoning for sin (1 stack - ATK%)"
            },
            "stats": {
              "atk_": 0.06
            }
          },
          {
            "label": {
              "fr": "A4 : Rétribution pour le péché (2 stacks - ATQ%)",
              "en": "A4: There shall be a reckoning for sin (2 stacks - ATK%)"
            },
            "stats": {
              "atk_": 0.06
            }
          },
          {
            "label": {
              "fr": "A4 : Rétribution pour le péché (3 stacks - ATQ%)",
              "en": "A4: There shall be a reckoning for sin (3 stacks - ATK%)"
            },
            "stats": {
              "atk_": 0.06
            }
          },
          {
            "label": {
              "fr": "A4 : Rétribution pour le péché (4 stacks - ATQ%)",
              "en": "A4: There shall be a reckoning for sin (4 stacks - ATK%)"
            },
            "stats": {
              "atk_": 0.06
            }
          },
          {
            "label": {
              "fr": "A4 : Rétribution pour le péché (5 stacks - ATQ%)",
              "en": "A4: There shall be a reckoning for sin (5 stacks - ATK%)"
            },
            "stats": {
              "atk_": 0.06
            }
          }
        ]
      },
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C6 : Estime pour les irréprochables (Att. chargée uniquement - Taux Crit, DGT Crit)",
              "en": "C6: Esteem for the innocent (Charged attack only - Crit Rate, Crit DMG)"
            },
            "cons": 6,
            "active": false,
            "stats": {
              "critRate_": 0.1,
              "critDMG_": 0.8
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Gel": {
        "name": {
          "fr": "DPS Gel",
          "en": "Freeze DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.1,
          "cryo_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "cryo_dmg_",
            "atk_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "MarechausseeHunter:4",
          "BlizzardStrayer:4"
        ],
        "goodSets": [
          "ShimenawasReminiscence:4",
          "MarechausseeHunter:2",
          "BlizzardStrayer:2",
          "FinaleOfTheDeepGalleries:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2"
        ],
        "er_req": 110,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Furina",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Escoffier",
            "element": "cryo"
          },
          {
            "role": "Flex",
            "name": [
              "Yelan",
              "Citlali"
            ],
            "element": [
              "hydro",
              "cryo"
            ]
          }
        ]
      },
      "DPS Fonte inversée": {
        "name": {
          "fr": "DPS Fonte inversée",
          "en": "Reverse Melt DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.6,
          "enerRech_": 0.1,
          "cryo_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "eleMas"
          ],
          "EQUIP_RING": [
            "cryo_dmg_",
            "atk_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "ShimenawasReminiscence:4"
        ],
        "goodSets": [
          "MarechausseeHunter:2",
          "BlizzardStrayer:2",
          "FinaleOfTheDeepGalleries:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 110,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Emilie",
            "element": "dendro"
          },
          {
            "role": "Sub-DPS",
            "name": "Durin",
            "element": "pyro"
          },
          {
            "role": "Support",
            "name": "Nicole",
            "element": "pyro"
          }
        ]
      },
      "DPS Astroconduction": {
        "name": {
          "fr": "DPS Astroconduction",
          "en": "Stellar-Conduct DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.4,
          "enerRech_": 0.3
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "eleMas"
          ],
          "EQUIP_RING": [
            "atk_",
            "eleMas"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "DisenchantmentInDeepShadow:4",
          "MarechausseeHunter:4"
        ],
        "goodSets": [
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "BlizzardStrayer:2",
          "FinaleOfTheDeepGalleries:2"
        ],
        "er_req": 140,
        "team": [
          {
            "role": "DPS",
            "name": "MarionetteNew",
            "element": "cryo"
          },
          {
            "role": "Sub-DPS",
            "name": "Yae",
            "element": "electro"
          },
          {
            "role": "Support",
            "name": "Nicole",
            "element": "pyro"
          }
        ]
      }
    }
  },
  "Xiangling": {
    "color": "#652c14",
    "portraitOffset": -33,
    "skins": {
      "202301": {
        "color": "#d22c36",
        "portraitOffset": -36
      }
    },
    "talents": {
      "auto": 1,
      "skill": 8,
      "burst": 10
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "A4 : Attention, ça pique (en mangeant le piment - ATQ%)",
              "en": "A4: Beware, it's super hot! (when eating a pepper - ATK%)"
            },
            "active": true,
            "stats": {
              "atk_": 0.1
            }
          }
        ]
      },
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C6 : Pyrotation condensée (DGTs Pyro)",
              "en": "C6: Condensed pyronado (Pyro DMG)"
            },
            "cons": 6,
            "stats": {
              "elemental_dmg_": 0.15
            }
          }
        ]
      }
    ],
    "builds": {
      "Sub-DPS Évaporation": {
        "name": {
          "fr": "Sub-DPS Évaporation",
          "en": "Vape Sub-DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.6,
          "enerRech_": 1,
          "pyro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "enerRech_",
            "eleMas",
            "atk_"
          ],
          "EQUIP_RING": [
            "pyro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "EmblemOfSeveredFate:4"
        ],
        "goodSets": [
          "CrimsonWitchOfFlames:4",
          "GildedDreams:4",
          "CrimsonWitchOfFlames:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2"
        ],
        "er_req": 220,
        "team": [
          {
            "role": "DPS",
            "name": "Tartaglia",
            "element": "hydro"
          },
          {
            "role": "Support",
            "name": "Kazuha",
            "element": "anemo"
          },
          {
            "role": "Support",
            "name": "Bennett",
            "element": "pyro"
          }
        ]
      },
      "Sub-DPS Fonte": {
        "name": {
          "fr": "Sub-DPS Fonte",
          "en": "Melt Sub-DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.6,
          "enerRech_": 1,
          "pyro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "enerRech_",
            "eleMas",
            "atk_"
          ],
          "EQUIP_RING": [
            "pyro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "EmblemOfSeveredFate:4"
        ],
        "goodSets": [
          "CrimsonWitchOfFlames:4",
          "GildedDreams:4",
          "CrimsonWitchOfFlames:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 220,
        "team": [
          {
            "role": "DPS",
            "name": "Chongyun",
            "element": "cryo"
          },
          {
            "role": "Support",
            "name": "Rosaria",
            "element": "cryo"
          },
          {
            "role": "Support",
            "name": "Bennett",
            "element": "pyro"
          }
        ]
      },
      "Sub-DPS Mono-pyro": {
        "name": {
          "fr": "Sub-DPS Mono-pyro",
          "en": "Mono-pyro Sub-DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 1,
          "pyro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "enerRech_",
            "atk_"
          ],
          "EQUIP_RING": [
            "pyro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "EmblemOfSeveredFate:4"
        ],
        "goodSets": [
          "CrimsonWitchOfFlames:4",
          "CrimsonWitchOfFlames:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2"
        ],
        "er_req": 220,
        "team": [
          {
            "role": "DPS",
            "name": "Lyney",
            "element": "pyro"
          },
          {
            "role": "Support",
            "name": "Zhongli",
            "element": "geo"
          },
          {
            "role": "Support",
            "name": "Bennett",
            "element": "pyro"
          }
        ]
      },
      "Sub-DPS Surcharge": {
        "name": {
          "fr": "Sub-DPS Surcharge",
          "en": "Overload Sub-DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 1,
          "pyro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "enerRech_",
            "atk_"
          ],
          "EQUIP_RING": [
            "pyro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "EmblemOfSeveredFate:4"
        ],
        "goodSets": [
          "CrimsonWitchOfFlames:4",
          "CrimsonWitchOfFlames:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2"
        ],
        "er_req": 220,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Fischl",
            "element": "electro"
          },
          {
            "role": "Support",
            "name": "Chevreuse",
            "element": "pyro"
          },
          {
            "role": "Support",
            "name": "Bennett",
            "element": "pyro"
          }
        ]
      }
    }
  },
  "Xianyun": {
    "color": "#226b7f",
    "portraitOffset": -38,
    "talents": {
      "auto": 1,
      "skill": 9,
      "burst": 10
    },
    "buffs": [
      {
        "category": {
          "fr": "A1 : Poursuite des plumes de givre (Taux Crit)",
          "en": "A1: Galefeather pursuit (Crit Rate)"
        },
        "selectMode": "exclusive",
        "buffs": [
          {
            "label": {
              "fr": "1 stack (uniquement attaques plongeantes)",
              "en": "1 stack (plunging attacks only)"
            },
            "active": false,
            "stats": {
              "critRate_": 0.04
            }
          },
          {
            "label": {
              "fr": "2 stacks (uniquement attaques plongeantes)",
              "en": "2 stacks (plunging attacks only)"
            },
            "active": false,
            "stats": {
              "critRate_": 0.06
            }
          },
          {
            "label": {
              "fr": "3 stacks (uniquement attaques plongeantes)",
              "en": "3 stacks (plunging attacks only)"
            },
            "active": false,
            "stats": {
              "critRate_": 0.08
            }
          },
          {
            "label": {
              "fr": "4 stacks (uniquement attaques plongeantes)",
              "en": "4 stacks (plunging attacks only)"
            },
            "active": false,
            "stats": {
              "critRate_": 0.1
            }
          }
        ]
      },
      {
        "category": {
          "fr": "C2 : Réclusion du monde (ATQ%)",
          "en": "C2: Aloof from the world (ATK%)"
        },
        "buffs": [
          {
            "label": {
              "fr": "Après la compétence",
              "en": "After the skill"
            },
            "cons": 2,
            "stats": {
              "atk_": 0.2
            }
          }
        ]
      },
      {
        "category": {
          "fr": "C6 : Souffle-Nuages est son nom (DGT Crit)",
          "en": "C6: They call her Cloud Retainer (Crit DMG)"
        },
        "selectMode": "exclusive",
        "buffs": [
          {
            "label": {
              "fr": "1 utilisation",
              "en": "1 use"
            },
            "cons": 6,
            "stats": {
              "crit_dmg_": 0.15
            }
          },
          {
            "label": {
              "fr": "2 utilisations",
              "en": "2 uses"
            },
            "cons": 6,
            "stats": {
              "crit_dmg_": 0.35
            }
          },
          {
            "label": {
              "fr": "3 utilisations",
              "en": "3 uses"
            },
            "cons": 6,
            "stats": {
              "crit_dmg_": 0.7
            }
          }
        ]
      }
    ],
    "builds": {
      "Support attaques plongeantes": {
        "name": {
          "fr": "Support attaques plongeantes",
          "en": "Plunging attacks Support"
        },
        "weights": {
          "critRate_": 0.4,
          "atk_": 1,
          "atk": 0.8,
          "enerRech_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "atk_"
          ],
          "EQUIP_DRESS": [
            "atk_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "ViridescentVenerer:4",
          "OceanHuedClam:4",
          "NoblesseOblige:4"
        ],
        "goodSets": [
          "SongOfDaysPast:4",
          "EmblemOfSeveredFate:4",
          "MaidenBeloved:4",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "MaidenBeloved:2",
          "OceanHuedClam:2",
          "SongOfDaysPast:2"
        ],
        "er_req": 200,
        "team": [
          {
            "role": "DPS",
            "name": "Xiao",
            "element": "anemo"
          },
          {
            "role": "Sub-DPS",
            "name": "Furina",
            "element": "hydro"
          },
          {
            "role": "Support",
            "name": "Faruzan",
            "element": "anemo"
          }
        ]
      }
    }
  },
  "Xiao": {
    "color": "#3a9ba6",
    "portraitOffset": -36,
    "talents": {
      "auto": 10,
      "skill": 8,
      "burst": 9
    },
    "buffs": [
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C2 : Annihilation d'éon : Fleur du kaléidoscope (off-field - Recharge d'énergie)",
              "en": "C2: Annihilation eon: Blossom of kaleidos (off-field - ER)"
            },
            "cons": 2,
            "stats": {
              "enerRech_": 0.25
            }
          },
          {
            "label": {
              "fr": "C4 : Transcendance : Extinction de la souffrance (PV < 50% - DÉF%)",
              "en": "C4: Transcension: Extinction of suffering (HP < 50% - DEF%)"
            },
            "cons": 4,
            "stats": {
              "def_": 1
            }
          }
        ]
      }
    ],
    "builds": {
      "Hypercarry Plunge DPS": {
        "name": {
          "fr": "Hypercarry Plunge DPS",
          "en": "Hypercarry Plunge DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.5,
          "anemo_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "anemo_dmg_",
            "atk_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "hideUIStats": [
          "heal_"
        ],
        "showUIStats": [
          "def"
        ],
        "bestSets": [
          "LongNightsOath:4",
          "VermillionHereafter:4"
        ],
        "goodSets": [
          "MarechausseeHunter:4",
          "DesertPavilionChronicle:4",
          "LongNightsOath:2",
          "ViridescentVenerer:2",
          "DesertPavilionChronicle:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2"
        ],
        "er_req": 130,
        "team": [
          {
            "role": "Support",
            "name": "Faruzan",
            "element": "anemo"
          },
          {
            "role": "Support",
            "name": "Liuyun",
            "element": "anemo"
          },
          {
            "role": "Sub-DPS",
            "name": "Furina",
            "element": "hydro"
          }
        ]
      }
    }
  },
  "Xilonen": {
    "color": "#F29700",
    "portraitOffset": -36,
    "talents": {
      "auto": 1,
      "skill": 8,
      "burst": 8
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "A4 : Gaine blindée portable (DÉF%)",
              "en": "A4: Portable armored sheath (DEF%)"
            },
            "active": true,
            "stats": {
              "def_": 0.2
            }
          }
        ]
      }
    ],
    "builds": {
      "Support universel": {
        "name": {
          "fr": "Support universel",
          "en": "Universal Support"
        },
        "weights": {
          "def_": 1,
          "def": 0.1,
          "enerRech_": 1,
          "heal_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "enerRech_",
            "def_"
          ],
          "EQUIP_RING": [
            "def_"
          ],
          "EQUIP_DRESS": [
            "def_",
            "heal_"
          ]
        },
        "bestSets": [
          "ScrollOfTheHeroOfCinderCity:4",
          "Instructor:4"
        ],
        "goodSets": [
          "HuskOfOpulentDreams:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "MaidenBeloved:2",
          "OceanHuedClam:2",
          "SongOfDaysPast:2"
        ],
        "er_req": 200,
        "team": [
          {
            "role": "DPS",
            "name": "Mavuika",
            "element": "pyro"
          },
          {
            "role": "Support",
            "name": "Citlali",
            "element": "cryo"
          },
          {
            "role": "support",
            "name": "Bennett",
            "element": "pyro"
          }
        ]
      },
      "DPS Géo": {
        "name": {
          "fr": "DPS Géo",
          "en": "Geo DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "def_": 0.8,
          "def": 0.1,
          "geo_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "def_"
          ],
          "EQUIP_RING": [
            "geo_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "bestSets": [
          "HuskOfOpulentDreams:4",
          "ScrollOfTheHeroOfCinderCity:4"
        ],
        "goodSets": [
          "HuskOfOpulentDreams:2",
          "ArchaicPetra:2"
        ],
        "er_req": 100,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Chiori",
            "element": "geo"
          },
          {
            "role": "Support",
            "name": "Zhongli",
            "element": "geo"
          },
          {
            "role": "Sub-DPS",
            "name": "Yelan",
            "element": "hydro"
          }
        ]
      }
    }
  },
  "Xingqiu": {
    "color": "#407ea3",
    "portraitOffset": -37,
    "skins": {
      "202501": {
        "color": "#3a62cf",
        "portraitOffset": -34
      }
    },
    "talents": {
      "auto": 1,
      "skill": 8,
      "burst": 10
    },
    "builds": {
      "Sub-DPS Évaporation": {
        "name": {
          "fr": "Sub-DPS Évaporation",
          "en": "Vape Sub-DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.6,
          "enerRech_": 0.8,
          "hydro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "enerRech_",
            "atk_"
          ],
          "EQUIP_RING": [
            "hydro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "EmblemOfSeveredFate:4"
        ],
        "goodSets": [
          "NoblesseOblige:2",
          "HeartOfDepth:2",
          "NymphsDream:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2"
        ],
        "er_req": 200,
        "team": [
          {
            "role": "DPS",
            "name": "Hutao",
            "element": "pyro"
          },
          {
            "role": "Sub-DPS",
            "name": "Yelan",
            "element": "hydro"
          },
          {
            "role": "Support",
            "name": "Zhongli",
            "element": "geo"
          }
        ]
      },
      "Sub-DPS Gel": {
        "name": {
          "fr": "Sub-DPS Gel",
          "en": "Freeze Sub-DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.8,
          "hydro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "enerRech_",
            "atk_"
          ],
          "EQUIP_RING": [
            "hydro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "EmblemOfSeveredFate:4"
        ],
        "goodSets": [
          "NoblesseOblige:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "HeartOfDepth:2",
          "NymphsDream:2"
        ],
        "er_req": 200,
        "team": [
          {
            "role": "DPS",
            "name": "SkirkNew",
            "element": "cryo"
          },
          {
            "role": "Sub-DPS",
            "name": "Escoffier",
            "element": "cryo"
          },
          {
            "role": "Support",
            "name": "Furina",
            "element": "hydro"
          }
        ]
      },
      "Sub-DPS Fleurissement": {
        "name": {
          "fr": "Sub-DPS Fleurissement",
          "en": "Bloom Sub-DPS"
        },
        "weights": {
          "critRate_": 0.4,
          "eleMas": 1,
          "enerRech_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "enerRech_",
            "eleMas"
          ],
          "EQUIP_RING": [
            "eleMas"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "eleMas"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "EmblemOfSeveredFate:4",
          "FlowerOfParadiseLost:4"
        ],
        "goodSets": [
          "NoblesseOblige:2",
          "GildedDreams:4",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2"
        ],
        "er_req": 200,
        "team": [
          {
            "role": "DPS",
            "name": "Nilou",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Nahida",
            "element": "dendro"
          },
          {
            "role": "Sub-DPS",
            "name": "Lauma",
            "element": "dendro"
          }
        ]
      },
      "Sub-DPS Électrocution": {
        "name": {
          "fr": "Sub-DPS Électrocution",
          "en": "Electro-Charged Sub-DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.8,
          "hydro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "enerRech_",
            "atk_"
          ],
          "EQUIP_RING": [
            "hydro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "EmblemOfSeveredFate:4"
        ],
        "goodSets": [
          "NoblesseOblige:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "HeartOfDepth:2",
          "NymphsDream:2"
        ],
        "er_req": 200,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Fischl",
            "element": "electro"
          },
          {
            "role": "Sub-DPS",
            "name": "Beidou",
            "element": "electro"
          },
          {
            "role": "Support",
            "name": "Sucrose",
            "element": "anemo"
          }
        ]
      }
    }
  },
  "Xinyan": {
    "color": "#941f1f",
    "portraitOffset": -37,
    "talents": {
      "auto": 1,
      "skill": 10,
      "burst": 1
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "A4 : « ... Ça, c'est du rock ! » (DGTs Physiques)",
              "en": "A4: \"...Now That's Rock 'N' Roll!\" (Physical DMG)"
            },
            "active": true,
            "stats": {
              "physical_dmg_": 0.15
            }
          }
        ]
      },
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C6 : Rock infernal (uniquement les attaques chargées - ATQ%)",
              "en": "C6: Rockin' in a flaming world (only charged attacks - ATK%)"
            },
            "cons": 6,
            "active": false,
            "stats": {
              "atk_bonus_scaling": {
                "source": "def",
                "percent": 0.5
              }
            }
          }
        ]
      }
    ],
    "builds": {
      "Shieldeuse universelle": {
        "name": {
          "fr": "Shieldeuse universelle",
          "en": "Universal Shielder"
        },
        "weights": {
          "critRate_": 0.4,
          "def_": 1,
          "def": 0.8,
          "enerRech_": 0.3
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "def_"
          ],
          "EQUIP_RING": [
            "def_"
          ],
          "EQUIP_DRESS": [
            "def_"
          ]
        },
        "hideUIStats": [
          "heal_",
          "eleMas"
        ],
        "showUIStats": [
          "atk",
          "physical_dmg_"
        ],
        "bestSets": [
          "TenacityOfTheMillelith:4",
          "HuskOfOpulentDreams:4"
        ],
        "goodSets": [
          "HuskOfOpulentDreams:2"
        ],
        "er_req": 100,
        "team": [
          {
            "role": "",
            "name": "",
            "element": ""
          },
          {
            "role": "",
            "name": "",
            "element": ""
          },
          {
            "role": "",
            "name": "",
            "element": ""
          }
        ]
      },
      "DPS Physique": {
        "name": {
          "fr": "DPS Physique",
          "en": "Physical DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.3,
          "physical_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "physical_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [
          "heal_"
        ],
        "showUIStats": [
          "atk",
          "physical_dmg_"
        ],
        "bestSets": [
          "PaleFlame:4"
        ],
        "goodSets": [
          "PaleFlame:2",
          "BloodstainedChivalry:2",
          "BloodstainedChivalry:4",
          "GladiatorsFinale:4",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2"
        ],
        "er_req": 100,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Rosaria",
            "element": "cryo"
          },
          {
            "role": "Sub-DPS",
            "name": "Fischl",
            "element": "electro"
          },
          {
            "role": "Support",
            "name": "Bennett",
            "element": "pyro"
          }
        ]
      },
      "DPS Fonte": {
        "name": {
          "fr": "DPS Fonte",
          "en": "Melt DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.6,
          "enerRech_": 0.3,
          "pyro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "eleMas"
          ],
          "EQUIP_RING": [
            "pyro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [
          "heal_"
        ],
        "showUIStats": [
          "atk",
          "physical_dmg_"
        ],
        "bestSets": [
          "Lavawalker:4"
        ],
        "goodSets": [
          "CrimsonWitchOfFlames:4",
          "CrimsonWitchOfFlames:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "GladiatorsFinale:4"
        ],
        "er_req": 100,
        "team": [
          {
            "role": "Support",
            "name": "Citlali",
            "element": "cryo"
          },
          {
            "role": "Support",
            "name": "Xilonen",
            "element": "geo"
          },
          {
            "role": "Support",
            "name": "Bennett",
            "element": "pyro"
          }
        ]
      }
    }
  },
  "Yae Miko": {
    "color": "#f49dff",
    "portraitOffset": -34,
    "talents": {
      "auto": 6,
      "skill": 10,
      "burst": 8
    },
    "buffs": [
      {
        "category": {
          "fr": "Constellation 1 : Offrande des yakan (DGTs Électro)",
          "en": "Constellation 1: Yakan offering (Electro DMG)"
        },
        "buffs": [
          {
            "label": {
              "fr": "Si une réaction d'Astroconduction ou de Supraconduction est déclenchée",
              "en": "If a Stellar-Conduct or Superconduct reaction is triggered"
            },
            "cons": 1,
            "active": false,
            "stats": {
              "elemental_dmg_": 0.5
            }
          }
        ]
      },
      {
        "category": {
          "fr": "Constellation 2 : Glapissement sous la lune (Maîtrise élémentaire)",
          "en": "Constellation 2: Fox's mooncall (EM)"
        },
        "selectMode": "exclusive",
        "buffs": [
          {
            "label": {
              "fr": "1 sakura dévastateur",
              "en": "1 Sesshou Sakura"
            },
            "cons": 2,
            "stats": {
              "eleMas": 60
            }
          },
          {
            "label": {
              "fr": "2 sakuras dévastateurs",
              "en": "2 Sesshou Sakura"
            },
            "cons": 2,
            "stats": {
              "eleMas": 90
            }
          },
          {
            "label": {
              "fr": "3 sakuras dévastateurs",
              "en": "3 Sesshou Sakura"
            },
            "cons": 2,
            "stats": {
              "eleMas": 120
            }
          },
          {
            "label": {
              "fr": "4 sakuras dévastateurs",
              "en": "4 Sesshou Sakura"
            },
            "cons": 2,
            "stats": {
              "eleMas": 200
            }
          }
        ]
      },
      {
        "category": {
          "fr": "Constellation 4 : Canalisation de sakura (DGTs Électro)",
          "en": "Constellation 4: Sakura channeling (Electro DMG)"
        },
        "buffs": [
          {
            "label": {
              "fr": "Quand un éclair de la compétence touche un ennemi",
              "en": "When a lightning bolt from the skill hits an enemy"
            },
            "cons": 4,
            "stats": {
              "elemental_dmg_": 0.2
            }
          }
        ]
      },
      {
        "category": {
          "fr": "Constellation 6 : Art tabou : Daisesshou (DGT Crit)",
          "en": "Constellation 6: Forbidden Art: Daisesshou (Crit DMG)"
        },
        "buffs": [
          {
            "label": {
              "fr": "Uniquement les dégâts d'Astroconduction",
              "en": "Only for Stellar-Conduct damage"
            },
            "cons": 4,
            "active": false,
            "stats": {
              "critDMG_": 2
            }
          }
        ]
      }
    ],
    "builds": {
      "Sub-DPS Suractivation": {
        "name": {
          "fr": "Sub-DPS Suractivation",
          "en": "Aggravate Sub-DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.8,
          "enerRech_": 0.5,
          "electro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "eleMas"
          ],
          "EQUIP_RING": [
            "electro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "GoldenTroupe:4",
          "GildedDreams:4"
        ],
        "goodSets": [
          "GoldenTroupe:2",
          "TenacityOfTheMillelith:4",
          "Instructor:4",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "ThunderingFury:2"
        ],
        "er_req": 140,
        "team": [
          {
            "role": "DPS",
            "name": "Shougun",
            "element": "electro"
          },
          {
            "role": "Support",
            "name": "Yaoyao",
            "element": "dendro"
          },
          {
            "role": "Support",
            "name": "Sucrose",
            "element": "anemo"
          }
        ]
      },
      "Sub-DPS Astroconduction": {
        "name": {
          "fr": "Sub-DPS Astroconduction",
          "en": "Stellar-Conduct Sub-DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.4,
          "enerRech_": 0.5
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "eleMas"
          ],
          "EQUIP_RING": [
            "atk_",
            "eleMas"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "DisenchantmentInDeepShadow:4"
        ],
        "goodSets": [
          "GoldenTroupe:4",
          "GildedDreams:4",
          "GoldenTroupe:2",
          "TenacityOfTheMillelith:4",
          "Instructor:4",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "ThunderingFury:2"
        ],
        "er_req": 140,
        "team": [
          {
            "role": "DPS",
            "name": "MarionetteNew",
            "element": "cryo"
          },
          {
            "role": "Sub-DPS",
            "name": "Escoffier",
            "element": "cryo"
          },
          {
            "role": "Support",
            "name": "Qiqi",
            "element": "cryo"
          }
        ]
      }
    }
  },
  "Yanfei": {
    "color": "#a43347",
    "portraitOffset": -32,
    "talents": {
      "auto": 10,
      "skill": 8,
      "burst": 9
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "category": {
              "fr": "A1 : Dispositions supplémentaires (DGTs Pyro)",
              "en": "A1: Proviso (Pyro DMG)"
            },
            "selectMode": "cumulative",
            "buffs": [
              {
                "label": {
                  "fr": "1 sceau consommé",
                  "en": "1 seal consumed"
                },
                "stats": {
                  "pyro_dmg_": 0.05
                }
              },
              {
                "label": {
                  "fr": "2 sceaux consommés",
                  "en": "2 seals consumed"
                },
                "stats": {
                  "pyro_dmg_": 0.05
                }
              },
              {
                "label": {
                  "fr": "3 sceaux consommés",
                  "en": "3 seals consumed"
                },
                "stats": {
                  "pyro_dmg_": 0.05
                }
              },
              {
                "label": {
                  "fr": "4 sceaux consommés (C6)",
                  "en": "4 seals consumed (C6)"
                },
                "active": true,
                "stats": {
                  "pyro_dmg_": 0.05
                }
              }
            ]
          }
        ]
      },
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C2 : Verdict final (PV ennemi < 50% et uniquement attaques chargées - Taux Crit)",
              "en": "C2: Right of final interpretation (Enemy HP < 50% & only charged attacks - Crit Rate)"
            },
            "cons": 2,
            "active": false,
            "stats": {
              "critRate_": 0.2
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Évaporation": {
        "name": {
          "fr": "DPS Évaporation",
          "en": "Vape DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.6,
          "enerRech_": 0.6,
          "pyro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "eleMas"
          ],
          "EQUIP_RING": [
            "pyro_dmg_",
            "atk_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "CrimsonWitchOfFlames:4",
          "MarechausseeHunter:4",
          "WanderersTroupe:4"
        ],
        "goodSets": [
          "GildedDreams:4",
          "ShimenawasReminiscence:4",
          "Lavawalker:4",
          "MarechausseeHunter:2",
          "CrimsonWitchOfFlames:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2"
        ],
        "er_req": 120,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Furina",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Yelan",
            "element": "hydro"
          },
          {
            "role": "Support",
            "name": "Bennett",
            "element": "pyro"
          }
        ]
      },
      "DPS Fonte": {
        "name": {
          "fr": "DPS Fonte",
          "en": "Melt DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.6,
          "enerRech_": 0.6,
          "pyro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "eleMas"
          ],
          "EQUIP_RING": [
            "pyro_dmg_",
            "atk_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "CrimsonWitchOfFlames:4",
          "WanderersTroupe:4"
        ],
        "goodSets": [
          "GildedDreams:4",
          "ShimenawasReminiscence:4",
          "Lavawalker:4",
          "MarechausseeHunter:2",
          "CrimsonWitchOfFlames:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 120,
        "team": [
          {
            "role": "Support",
            "name": "Citlali",
            "element": "cryo"
          },
          {
            "role": "Support",
            "name": "Xilonen",
            "element": "geo"
          },
          {
            "role": "Support",
            "name": "Bennett",
            "element": "pyro"
          }
        ]
      },
      "DPS Surcharge": {
        "name": {
          "fr": "DPS Surcharge",
          "en": "Overload DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.6,
          "pyro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "pyro_dmg_",
            "atk_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "CrimsonWitchOfFlames:4",
          "WanderersTroupe:4"
        ],
        "goodSets": [
          "GildedDreams:4",
          "ShimenawasReminiscence:4",
          "Lavawalker:4",
          "MarechausseeHunter:2",
          "CrimsonWitchOfFlames:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2"
        ],
        "er_req": 120,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Fischl",
            "element": "electro"
          },
          {
            "role": "Support",
            "name": "Chevreuse",
            "element": "pyro"
          },
          {
            "role": "Support",
            "name": "Bennett",
            "element": "pyro"
          }
        ]
      },
      "DPS Bourgeonnement": {
        "name": {
          "fr": "DPS Bourgeonnement",
          "en": "Burgeon DPS"
        },
        "weights": {
          "eleMas": 1,
          "enerRech_": 0.6
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas"
          ],
          "EQUIP_RING": [
            "eleMas"
          ],
          "EQUIP_DRESS": [
            "eleMas"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [
          "atk"
        ],
        "bestSets": [
          "GildedDreams:4",
          "FlowerOfParadiseLost:4"
        ],
        "goodSets": [
          "CrimsonWitchOfFlames:4",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 120,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Nahida",
            "element": "dendro"
          },
          {
            "role": "Sub-DPS",
            "name": "Xingqiu",
            "element": "hydro"
          },
          {
            "role": "Support",
            "name": "Kokomi",
            "element": "hydro"
          }
        ]
      }
    }
  },
  "Yaoyao": {
    "color": "#54701f",
    "portraitOffset": -36,
    "skins": {
      "207701": {
        "color": "#6ed3ea",
        "portraitOffset": -38
      }
    },
    "talents": {
      "auto": 1,
      "skill": 10,
      "burst": 9
    },
    "buffs": [
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C1 : Tutelle (DGTs Dendro)",
              "en": "C1: Adeptus' tutelage (Dendro DMG)"
            },
            "cons": 1,
            "active": true,
            "stats": {
              "elemental_dmg_": 0.15
            }
          },
          {
            "label": {
              "fr": "C4 : Attrait (Maîtrise élémentaire)",
              "en": "C4: Winsome (EM)"
            },
            "cons": 4,
            "active": true,
            "stats": {
              "eleMas_bonus_scaling": {
                "source": "hp",
                "percent": 0.003,
                "max": 120
              }
            }
          }
        ]
      }
    ],
    "builds": {
      "Healeuse universelle": {
        "name": {
          "fr": "Healeuse universelle",
          "en": "Universal Healer"
        },
        "weights": {
          "critRate_": 0.4,
          "hp_": 1,
          "hp": 0.8,
          "enerRech_": 1,
          "heal_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "enerRech_",
            "hp_"
          ],
          "EQUIP_RING": [
            "hp_"
          ],
          "EQUIP_DRESS": [
            "hp_",
            "heal_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "DeepwoodMemories:4",
          "MaidenBeloved:4"
        ],
        "goodSets": [
          "MaidenBeloved:2",
          "OceanHuedClam:2",
          "SongOfDaysPast:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "TenacityOfTheMillelith:2",
          "VourukashasGlow:2"
        ],
        "er_req": 220,
        "team": [
          {
            "role": "",
            "name": "",
            "element": ""
          },
          {
            "role": "",
            "name": "",
            "element": ""
          },
          {
            "role": "",
            "name": "",
            "element": ""
          }
        ]
      },
      "Sub-DPS Propagation": {
        "name": {
          "fr": "Sub-DPS Propagation",
          "en": "Spread Sub-DPS"
        },
        "weights": {
          "critRate_": 0.4,
          "hp_": 0.4,
          "hp": 0.1,
          "eleMas": 0.8,
          "enerRech_": 0.6,
          "dendro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas"
          ],
          "EQUIP_RING": [
            "dendro_dmg_",
            "eleMas"
          ],
          "EQUIP_DRESS": [
            "eleMas",
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "DeepwoodMemories:4",
          "Instructor:4",
          "GildedDreams:4"
        ],
        "goodSets": [
          "DeepwoodMemories:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2"
        ],
        "er_req": 160,
        "team": [
          {
            "role": "DPS",
            "name": "Alhatham",
            "element": "dendro"
          },
          {
            "role": "Sub-DPS",
            "name": "Fischl",
            "element": "electro"
          },
          {
            "role": "Support",
            "name": "Kazuha",
            "element": "anemo"
          }
        ]
      },
      "Sub-DPS Fleurissement": {
        "name": {
          "fr": "Sub-DPS Fleurissement",
          "en": "Bloom Sub-DPS"
        },
        "weights": {
          "critRate_": 0.4,
          "hp_": 0.4,
          "hp": 0.1,
          "eleMas": 1,
          "enerRech_": 0.6,
          "dendro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas"
          ],
          "EQUIP_RING": [
            "eleMas"
          ],
          "EQUIP_DRESS": [
            "eleMas"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "DeepwoodMemories:4",
          "Instructor:4",
          "GildedDreams:4",
          "FlowerOfParadiseLost:4"
        ],
        "goodSets": [
          "DeepwoodMemories:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 160,
        "team": [
          {
            "role": "Support",
            "name": "Nilou",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Lauma",
            "element": "dendro"
          },
          {
            "role": "Sub-DPS",
            "name": "Columbina",
            "element": "hydro"
          }
        ]
      }
    }
  },
  "Yelan": {
    "color": "#4a5be1",
    "portraitOffset": -38,
    "skins": {
      "206001": {
        "color": "#4a5be1",
        "portraitOffset": -38
      }
    },
    "talents": {
      "auto": 1,
      "skill": 6,
      "burst": 10
    },
    "buffs": [
      {
        "category": "Passifs",
        "selectMode": "exclusive",
        "buffs": [
          {
            "label": {
              "fr": "A1 : Contrôle stratégique (1 type élémentaire dans l'équipe - PV%)",
              "en": "A1: Turn control (1 party elemental type - HP%)"
            },
            "active": false,
            "stats": {
              "hp_": 0.06
            }
          },
          {
            "label": {
              "fr": "A1 : Contrôle stratégique (2 types élémentaires dans l'équipe - PV%)",
              "en": "A1: Turn control (2 party elemental types - HP%)"
            },
            "active": false,
            "stats": {
              "hp_": 0.12
            }
          },
          {
            "label": {
              "fr": "A1 : Contrôle stratégique (3 types élémentaires dans l'équipe - PV%)",
              "en": "A1: Turn control (3 party elemental types - HP%)"
            },
            "active": false,
            "stats": {
              "hp_": 0.18
            }
          },
          {
            "label": {
              "fr": "A1 : Contrôle stratégique (4 types élémentaires dans l'équipe - PV%)",
              "en": "A1: Turn control (4 party elemental types - HP%)"
            },
            "active": true,
            "stats": {
              "hp_": 0.3
            }
          }
        ]
      },
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C4 : Tour de passe-passe (PV%)",
              "en": "C4: Bait-and-switch (HP%)"
            },
            "cons": 4,
            "stats": {
              "hp_": 0.4
            }
          }
        ]
      }
    ],
    "builds": {
      "Sub-DPS Exubérance": {
        "name": {
          "fr": "Sub-DPS Exubérance",
          "en": "Hyperbloom Sub-DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "hp_": 0.9,
          "hp": 0.1,
          "enerRech_": 1,
          "hydro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "enerRech_",
            "hp_"
          ],
          "EQUIP_RING": [
            "hydro_dmg_",
            "hp_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "bestSets": [
          "EmblemOfSeveredFate:4",
          "NoblesseOblige:4"
        ],
        "goodSets": [
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "NoblesseOblige:2",
          "TenacityOfTheMillelith:2",
          "VourukashasGlow:2",
          "HeartOfDepth:2",
          "NymphsDream:2"
        ],
        "er_req": 200,
        "team": [
          {
            "role": "DPS",
            "name": "Alhatham",
            "element": "dendro"
          },
          {
            "role": "Support",
            "name": "Nahida",
            "element": "dendro"
          },
          {
            "role": "Flex",
            "name": [
              "Shinobu",
              "Shougun"
            ],
            "element": [
              "electro",
              "electro"
            ]
          }
        ]
      },
      "Sub-DPS Gel": {
        "name": {
          "fr": "Sub-DPS Gel",
          "en": "Freeze Sub-DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "hp_": 0.9,
          "hp": 0.1,
          "enerRech_": 1,
          "hydro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "enerRech_",
            "hp_"
          ],
          "EQUIP_RING": [
            "hydro_dmg_",
            "hp_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "bestSets": [
          "EmblemOfSeveredFate:4",
          "NoblesseOblige:4"
        ],
        "goodSets": [
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "NoblesseOblige:2",
          "TenacityOfTheMillelith:2",
          "VourukashasGlow:2",
          "HeartOfDepth:2",
          "NymphsDream:2"
        ],
        "er_req": 170,
        "team": [
          {
            "role": "DPS",
            "name": "SkirkNew",
            "element": "cryo"
          },
          {
            "role": "Support",
            "name": "Furina",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Escoffier",
            "element": "cryo"
          }
        ]
      },
      "Sub-DPS Évaporation": {
        "name": {
          "fr": "Sub-DPS Évaporation",
          "en": "Vape Sub-DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "hp_": 0.8,
          "hp": 0.1,
          "eleMas": 0.6,
          "enerRech_": 1,
          "hydro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "enerRech_",
            "hp_"
          ],
          "EQUIP_RING": [
            "hydro_dmg_",
            "hp_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "bestSets": [
          "EmblemOfSeveredFate:4",
          "NoblesseOblige:4"
        ],
        "goodSets": [
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2",
          "NoblesseOblige:2",
          "TenacityOfTheMillelith:2",
          "VourukashasGlow:2",
          "HeartOfDepth:2",
          "NymphsDream:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 170,
        "team": [
          {
            "role": "DPS",
            "name": "Hutao",
            "element": "pyro"
          },
          {
            "role": "Support",
            "name": "Zhongli",
            "element": "geo"
          },
          {
            "role": "Sub-DPS",
            "name": "Xingqiu",
            "element": "hydro"
          }
        ]
      }
    }
  },
  "Yoimiya": {
    "color": "#ff846d",
    "portraitOffset": -37,
    "talents": {
      "auto": 10,
      "skill": 10,
      "burst": 6
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "A1 : Tour de passe-passe (DGTs Pyro)",
              "en": "A1: Tricks of the trouble-maker (Pyro DMG)"
            },
            "active": true,
            "stats": {
              "pyro_dmg_": 0.2
            }
          }
        ]
      },
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C1 : Agate Ryuukin (ATQ%)",
              "en": "C1: Agate Ryuukin (ATK%)"
            },
            "cons": 1,
            "stats": {
              "atk_": 0.2
            }
          },
          {
            "label": {
              "fr": "C2 : Procession de feux de joie (DGTs Pyro)",
              "en": "C2: A procession of bonfires (Pyro DMG)"
            },
            "cons": 2,
            "stats": {
              "pyro_dmg_": 0.25
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Évaporation": {
        "name": {
          "fr": "DPS Évaporation",
          "en": "Vape DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.6,
          "pyro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "eleMas"
          ],
          "EQUIP_RING": [
            "pyro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "bestSets": [
          "ShimenawasReminiscence:4",
          "CrimsonWitchOfFlames:4"
        ],
        "goodSets": [
          "CrimsonWitchOfFlames:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2"
        ],
        "er_req": 100,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Furina",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Yelan",
            "element": "hydro"
          },
          {
            "role": "Support",
            "name": "Bennett",
            "element": "pyro"
          }
        ]
      },
      "DPS Fonte": {
        "name": {
          "fr": "DPS Fonte",
          "en": "Melt DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "eleMas": 0.6,
          "pyro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_",
            "eleMas"
          ],
          "EQUIP_RING": [
            "pyro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "bestSets": [
          "ShimenawasReminiscence:4",
          "CrimsonWitchOfFlames:4"
        ],
        "goodSets": [
          "CrimsonWitchOfFlames:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 100,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Rosaria",
            "element": "cryo"
          },
          {
            "role": "Support",
            "name": "Citlali",
            "element": "cryo"
          },
          {
            "role": "Support",
            "name": "Bennett",
            "element": "pyro"
          }
        ]
      },
      "DPS Surcharge": {
        "name": {
          "fr": "DPS Surcharge",
          "en": "Overload DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "pyro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "pyro_dmg_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "bestSets": [
          "ShimenawasReminiscence:4",
          "GladiatorsFinale:4"
        ],
        "goodSets": [
          "CrimsonWitchOfFlames:2",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2"
        ],
        "er_req": 100,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Yae",
            "element": "electro"
          },
          {
            "role": "Sub-DPS",
            "name": "Fischl",
            "element": "electro"
          },
          {
            "role": "Support",
            "name": "Chevreuse",
            "element": "pyro"
          }
        ]
      }
    }
  },
  "Yumemizuki Mizuki": {
    "color": "#e38ff1",
    "portraitOffset": -36,
    "talents": {
      "auto": 1,
      "skill": 8,
      "burst": 6
    },
    "buffs": [
      {
        "category": "Passifs",
        "buffs": [
          {
            "label": {
              "fr": "A1 : Pensées de jour, rêveries de nuit (Maîtrise élémentaire)",
              "en": "A1: Bright moon's restless voice (EM)"
            },
            "active": true,
            "stats": {
              "eleMas": 100
            }
          }
        ]
      },
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C6 : Le cœur s'attardant longtemps (Taux Crit, DGT Crit)",
              "en": "C6: The Heart Lingers Long (Crit Rate, Crit DMG)"
            },
            "active": true,
            "stats": {
              "critRate__bonus_scaling": {
                "source": "eleMas",
                "percent": 0.04,
                "baseline": 500,
                "max": 20
              },
              "critDMG__bonus_scaling": {
                "source": "eleMas",
                "percent": 0.16,
                "baseline": 500,
                "max": 80
              }
            }
          }
        ]
      }
    ],
    "builds": {
      "Driver Dispersion": {
        "name": {
          "fr": "Driver Dispersion",
          "en": "Swirl Driver"
        },
        "weights": {
          "eleMas": 1,
          "enerRech_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "eleMas",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "eleMas"
          ],
          "EQUIP_DRESS": [
            "eleMas"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [
          "atk"
        ],
        "bestSets": [
          "ViridescentVenerer:4"
        ],
        "goodSets": [
          "NoblesseOblige:4",
          "Instructor:4",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2"
        ],
        "er_req": 200,
        "team": [
          {
            "role": "Sub-DPS",
            "name": "Furina",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Ororon",
            "element": "electro"
          },
          {
            "role": "Sub-DPS",
            "name": "Mavuika",
            "element": "pyro"
          }
        ]
      }
    }
  },
  "Yun Jin": {
    "color": "#48308d",
    "portraitOffset": -36,
    "talents": {
      "auto": 1,
      "skill": 1,
      "burst": 10
    },
    "buffs": [
      {
        "category": "Constellations",
        "buffs": [
          {
            "label": {
              "fr": "C4 : Le tranchant d'une fleur (DÉF%)",
              "en": "C4: Flower and a fighter (DEF%)"
            },
            "cons": 4,
            "stats": {
              "def_": 0.2
            }
          }
        ]
      }
    ],
    "builds": {
      "Support universel": {
        "name": {
          "fr": "Support universel",
          "en": "Universal Support"
        },
        "weights": {
          "critRate_": 0.4,
          "def_": 1,
          "def": 0.8,
          "enerRech_": 0.8
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "def_",
            "enerRech_"
          ],
          "EQUIP_RING": [
            "def_"
          ],
          "EQUIP_DRESS": [
            "def_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "HuskOfOpulentDreams:4",
          "NoblesseOblige:4"
        ],
        "goodSets": [
          "ArchaicPetra:4",
          "ScrollOfTheHeroOfCinderCity:4",
          "HuskOfOpulentDreams:2",
          "ScrollOfTheHeroOfCinderCity:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2"
        ],
        "er_req": 200,
        "team": [
          {
            "role": "",
            "name": "",
            "element": ""
          },
          {
            "role": "",
            "name": "",
            "element": ""
          },
          {
            "role": "",
            "name": "",
            "element": ""
          }
        ]
      }
    }
  },
  "Zhongli": {
    "color": "#814b32",
    "portraitOffset": -35,
    "talents": {
      "auto": 1,
      "skill": 10,
      "burst": 6
    },
    "builds": {
      "Shielder universel": {
        "name": {
          "fr": "Shielder universel",
          "en": "Universal Shielder"
        },
        "weights": {
          "critRate_": 0.4,
          "hp_": 1,
          "hp": 0.8,
          "enerRech_": 0.3
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "hp_"
          ],
          "EQUIP_RING": [
            "hp_"
          ],
          "EQUIP_DRESS": [
            "hp_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "TenacityOfTheMillelith:4"
        ],
        "goodSets": [
          "TenacityOfTheMillelith:2",
          "VourukashasGlow:2",
          "NoblesseOblige:4"
        ],
        "er_req": 100,
        "team": [
          {
            "role": "Flex",
            "name": "",
            "element": "geo"
          },
          {
            "role": "Flex",
            "name": "",
            "element": "geo"
          },
          {
            "role": "Flex",
            "name": "",
            "element": "geo"
          }
        ]
      }
    }
  },
  "Zibai": {
    "color": "#54cabb",
    "portraitOffset": -36.4,
    "talents": {
      "auto": 1,
      "skill": 8,
      "burst": 6
    },
    "buffs": [
      {
        "category": {
          "fr": "A4 : Pics stratifiés perçant les nuages (Alliés Géo - DÉF%)",
          "en": "A4: Layered peaks pierce the clouds (Geo allies - DEF%)"
        },
        "selectMode": "exclusive",
        "buffs": [
          {
            "label": {
              "fr": "1 Allié Géo",
              "en": "A Geo ally"
            },
            "active": false,
            "stats": {
              "def_": 0.15
            }
          },
          {
            "label": {
              "fr": "2 Alliés Géo",
              "en": "2 Geo allies"
            },
            "active": true,
            "stats": {
              "def_": 0.3
            }
          },
          {
            "label": {
              "fr": "3 Alliés Géo",
              "en": "3 Geo allies"
            },
            "active": false,
            "stats": {
              "def_": 0.45
            }
          }
        ]
      },
      {
        "category": {
          "fr": "A4 : Pics stratifiés perçant les nuages (Alliés Hydro - Maîtrise élémentaire)",
          "en": "A4: Layered peaks pierce the clouds (Hydro allies - EM)"
        },
        "selectMode": "exclusive",
        "buffs": [
          {
            "label": {
              "fr": "1 Allié Hydro",
              "en": "1 Hydro ally"
            },
            "active": true,
            "stats": {
              "eleMas": 60
            }
          },
          {
            "label": {
              "fr": "2 Alliés Hydro",
              "en": "2 Hydro allies"
            },
            "active": false,
            "stats": {
              "eleMas": 120
            }
          },
          {
            "label": {
              "fr": "3 Alliés Hydro",
              "en": "3 Hydro allies"
            },
            "active": false,
            "stats": {
              "eleMas": 180
            }
          }
        ]
      }
    ],
    "builds": {
      "DPS Sélénocristallisation": {
        "name": {
          "fr": "DPS Sélénocristallisation",
          "en": "Lunar-Crystallize DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "def_": 0.8,
          "def": 0.1,
          "eleMas": 0.4,
          "enerRech_": 0.3
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "def_"
          ],
          "EQUIP_RING": [
            "def_"
          ],
          "EQUIP_DRESS": [
            "critDMG_",
            "critRate_"
          ]
        },
        "bestSets": [
          "NightOfTheSkysUnveiling:4"
        ],
        "goodSets": [
          "HuskOfOpulentDreams:4",
          "HuskOfOpulentDreams:2",
          "WanderersTroupe:2",
          "GildedDreams:2",
          "FlowerOfParadiseLost:2",
          "NightOfTheSkysUnveiling:2",
          "AubadeOfMorningstarAndMoon:2"
        ],
        "er_req": 120,
        "team": [
          {
            "role": "Support",
            "name": "Illuga",
            "element": "geo"
          },
          {
            "role": "Sub-DPS",
            "name": "Columbina",
            "element": "hydro"
          },
          {
            "role": "Sub-DPS",
            "name": "Linnea",
            "element": "geo"
          }
        ]
      }
    }
  },
  "Émilie": {
    "color": "#236655",
    "portraitOffset": -37,
    "talents": {
      "auto": 1,
      "skill": 10,
      "burst": 8
    },
    "builds": {
      "Sub-DPS Brûlure": {
        "name": {
          "fr": "Sub-DPS Brûlure",
          "en": "Burning Sub-DPS"
        },
        "weights": {
          "critRate_": 1,
          "critDMG_": 1,
          "atk_": 0.8,
          "atk": 0.1,
          "enerRech_": 0.4,
          "dendro_dmg_": 1
        },
        "idealMainStats": {
          "EQUIP_SHOES": [
            "atk_"
          ],
          "EQUIP_RING": [
            "dendro_dmg_",
            "atk_"
          ],
          "EQUIP_DRESS": [
            "critRate_",
            "critDMG_"
          ]
        },
        "hideUIStats": [],
        "showUIStats": [],
        "bestSets": [
          "UnfinishedReverie:4",
          "DeepwoodMemories:4"
        ],
        "goodSets": [
          "DeepwoodMemories:2",
          "GoldenTroupe:2",
          "GoldenTroupe:4",
          "GladiatorsFinale:2",
          "ShimenawasReminiscence:2",
          "VermillionHereafter:2",
          "EchoesOfAnOffering:2",
          "NighttimeWhispersInTheEchoingWoods:2",
          "FragmentOfHarmonicWhimsy:2",
          "UnfinishedReverie:2",
          "ADayCarvedFromRisingWinds:2",
          "DisenchantmentInDeepShadow:2",
          "EmblemOfSeveredFate:2",
          "SilkenMoonsSerenade:2",
          "CelestialGift:2"
        ],
        "er_req": 140,
        "team": [
          {
            "role": "DPS",
            "name": "Kinich",
            "element": "dendro"
          },
          {
            "role": "Sub-DPS",
            "name": "Mavuika",
            "element": "pyro"
          },
          {
            "role": "Support",
            "name": "Bennett",
            "element": "pyro"
          }
        ]
      }
    }
  }
};

window.WEAPON_PASSIVES  = {
  "AThousandBlazingSuns": {
    "selectMode": "cumulative",
    "buffs": [
      {
        "label": {
          "fr": "Si une compétence ou un déchaînement élémentaire est utilisé (ATQ% et DGT Crit)",
          "en": "If an elemental skill or burst is used (ATK% & Crit DMG)"
        },
        "stats": {
          "atk_": [
            0.28,
            0.07
          ],
          "critDMG_": [
            0.2,
            0.05
          ]
        }
      },
      {
        "label": {
          "fr": "Si le personnage est sous une Bénédiction Noctâme (ATQ% et DGT Crit)",
          "en": "If the character is in a Nightsoul Blessing state (ATK% & Crit DMG)"
        },
        "stats": {
          "atk_": [
            0.21,
            0.0525
          ],
          "critDMG_": [
            0.15,
            0.0375
          ]
        }
      }
    ]
  },
  "AThousandFloatingDreams": {
    "selectMode": "exclusive",
    "buffs": [
      {
        "label": {
          "fr": "3 Alliés du même élément que le porteur (Maîtrise élémentaire)",
          "en": "3 allies from the same element as the wearer (EM)"
        },
        "stats": {
          "eleMas": [
            96,
            24
          ]
        }
      },
      {
        "label": {
          "fr": "2 Alliés du même élément que le porteur et 1 Différent (Maîtrise élémentaire et DGTs Élémentaires)",
          "en": "2 allies from the same element as the wearer and 1 from a different element (EM & Elemental DMG)"
        },
        "stats": {
          "eleMas": [
            64,
            16
          ],
          "elemental_dmg_": [
            0.1,
            0.04
          ]
        }
      },
      {
        "label": {
          "fr": "1 Allié du même élément que le porteur et 2 Différents (Maîtrise élémentaire et DGTs Élémentaires)",
          "en": "1 ally from the same element as the wearer and 2 from a different element (EM & Elemental DMG)"
        },
        "stats": {
          "eleMas": [
            32,
            8
          ],
          "elemental_dmg_": [
            0.2,
            0.08
          ]
        }
      },
      {
        "label": {
          "fr": "3 Alliés d'un élément différent de celui du porteur (DGTs Élémentaires)",
          "en": "3 allies from a different element of the wearer (Elemental DMG)"
        },
        "stats": {
          "elemental_dmg_": [
            0.3,
            0.12
          ]
        }
      }
    ]
  },
  "AstralVulturesCrimsonPlumage": {
    "buffs": [
      {
        "label": {
          "fr": "Si une réaction élémentaire Dispersion est déclenchée (ATQ%)",
          "en": "If a swirl elemental reaction is triggered (ATK%)"
        },
        "stats": {
          "atk_": [
            0.24,
            0.06
          ]
        }
      }
    ]
  },
  "AthameArtis": {
    "selectMode": "exclusive",
    "buffs": [
      {
        "label": {
          "fr": "Si un déchaînement élémentaire touche un ennemi (ATQ%)",
          "en": "If an elemental burst hits an enemy (ATK%)"
        },
        "stats": {
          "atk_": [
            0.2,
            0.05
          ]
        }
      },
      {
        "label": {
          "fr": "Si l'équipe est composée de deux membre de l'Hexerei (ATQ%)",
          "en": "If 2 Hexerei characters are in the party (ATK%)"
        },
        "stats": {
          "atk_": [
            0.35,
            0.0875
          ]
        }
      }
    ]
  },
  "Azurelight": {
    "buffs": [
      {
        "label": {
          "fr": "Si une compétence élémentaire est utilisée (ATQ%)",
          "en": "If an elemental skill is used (ATK%)"
        },
        "stats": {
          "atk_": 0.24
        }
      },
      {
        "label": {
          "fr": "Si le porteur a 0 énergie (ATQ% et DGT CRIT)",
          "en": "If the wearer has 0 energy (ATK% & Crit DMG)"
        },
        "stats": {
          "atk_": 0.24,
          "critDMG_": 0.4
        }
      }
    ]
  },
  "BalladOfTheFjords": {
    "buffs": [
      {
        "label": {
          "fr": "Si l'équipe est composée de 3 éléments différents (Maîtrise élémentaire)",
          "en": "If the party includes characters of 3 different elements (EM)"
        },
        "stats": {
          "eleMas": [
            120,
            30
          ]
        }
      }
    ]
  },
  "BeaconOfTheReedSea": {
    "buffs": [
      {
        "label": {
          "fr": "Si une compétence élémentaire touche un ennemi (ATQ%)",
          "en": "If an elemental skill hits an enemy (ATK%)"
        },
        "stats": {
          "atk_": [
            0.2,
            0.05
          ]
        }
      },
      {
        "label": {
          "fr": "Si le personnage subit des dégâts (ATQ%)",
          "en": "If the character takes damage (ATK%)"
        },
        "stats": {
          "atk_": [
            0.2,
            0.05
          ]
        }
      },
      {
        "label": {
          "fr": "Si le personnage n'est pas protégé par un bouclier (PV%)",
          "en": "If the character is not protected by a shield (HP%)"
        },
        "stats": {
          "hp_": [
            0.32,
            0.08
          ]
        }
      }
    ]
  },
  "BlackcliffAgate": {
    "selectMode": "cumulative",
    "buffs": [
      {
        "label": {
          "fr": "Si un 1er ennemi a été vaincu (ATQ%)",
          "en": "If 1 enemy is defeated (ATK%)"
        },
        "stats": {
          "atk_": [
            0.12,
            0.03
          ]
        }
      },
      {
        "label": {
          "fr": "Si un 2ème ennemi a été vaincu (ATQ%)",
          "en": "If 2 enemies are defeated (ATK%)"
        },
        "stats": {
          "atk_": [
            0.12,
            0.03
          ]
        }
      },
      {
        "label": {
          "fr": "Si un 3ème ennemi a été vaincu (ATQ%)",
          "en": "If 3 enemies are defeated (ATK%)"
        },
        "stats": {
          "atk_": [
            0.12,
            0.03
          ]
        }
      }
    ]
  },
  "BlackcliffLongsword": {
    "selectMode": "cumulative",
    "buffs": [
      {
        "label": {
          "fr": "Si un 1er ennemi a été vaincu (ATQ%)",
          "en": "If 1 enemy is defeated (ATK%)"
        },
        "stats": {
          "atk_": [
            0.12,
            0.03
          ]
        }
      },
      {
        "label": {
          "fr": "Si un 2ème ennemi a été vaincu (ATQ%)",
          "en": "If 2 enemies are defeated (ATK%)"
        },
        "stats": {
          "atk_": [
            0.12,
            0.03
          ]
        }
      },
      {
        "label": {
          "fr": "Si un 3ème ennemi a été vaincu (ATQ%)",
          "en": "If 3 enemies are defeated (ATK%)"
        },
        "stats": {
          "atk_": [
            0.12,
            0.03
          ]
        }
      }
    ]
  },
  "BlackcliffPole": {
    "selectMode": "cumulative",
    "buffs": [
      {
        "label": {
          "fr": "Si un 1er ennemi a été vaincu (ATQ%)",
          "en": "If 1 enemy is defeated (ATK%)"
        },
        "stats": {
          "atk_": [
            0.12,
            0.03
          ]
        }
      },
      {
        "label": {
          "fr": "Si un 2ème ennemi a été vaincu (ATQ%)",
          "en": "If 2 enemies are defeated (ATK%)"
        },
        "stats": {
          "atk_": [
            0.12,
            0.03
          ]
        }
      },
      {
        "label": {
          "fr": "Si un 3ème ennemi a été vaincu (ATQ%)",
          "en": "If 3 enemies are defeated (ATK%)"
        },
        "stats": {
          "atk_": [
            0.12,
            0.03
          ]
        }
      }
    ]
  },
  "BlackcliffSlasher": {
    "selectMode": "cumulative",
    "buffs": [
      {
        "label": {
          "fr": "Si un 1er ennemi a été vaincu (ATQ%)",
          "en": "If 1 enemy is defeated (ATK%)"
        },
        "stats": {
          "atk_": [
            0.12,
            0.03
          ]
        }
      },
      {
        "label": {
          "fr": "Si un 2ème ennemi a été vaincu (ATQ%)",
          "en": "If 2 enemies are defeated (ATK%)"
        },
        "stats": {
          "atk_": [
            0.12,
            0.03
          ]
        }
      },
      {
        "label": {
          "fr": "Si un 3ème ennemi a été vaincu (ATQ%)",
          "en": "If 3 enemies are defeated (ATK%)"
        },
        "stats": {
          "atk_": [
            0.12,
            0.03
          ]
        }
      }
    ]
  },
  "BlackcliffWarbow": {
    "selectMode": "cumulative",
    "buffs": [
      {
        "label": {
          "fr": "Si un 1er ennemi a été vaincu (ATQ%)",
          "en": "If 1 enemy is defeated (ATK%)"
        },
        "stats": {
          "atk_": [
            0.12,
            0.03
          ]
        }
      },
      {
        "label": {
          "fr": "Si un 2ème ennemi a été vaincu (ATQ%)",
          "en": "If 2 enemies are defeated (ATK%)"
        },
        "stats": {
          "atk_": [
            0.12,
            0.03
          ]
        }
      },
      {
        "label": {
          "fr": "Si un 3ème ennemi a été vaincu (ATQ%)",
          "en": "If 3 enemies are defeated (ATK%)"
        },
        "stats": {
          "atk_": [
            0.12,
            0.03
          ]
        }
      }
    ]
  },
  "BloodsoakedRuins": {
    "buffs": [
      {
        "label": {
          "fr": "Si une réaction Sélène est déclenchée (DGT Crit)",
          "en": "If a Lunar Reaction is triggered (Crit DMG)"
        },
        "stats": {
          "critDMG_": [
            0.28,
            0.07
          ]
        }
      }
    ]
  },
  "CalamityOfEshu": {
    "buffs": [
      {
        "label": {
          "fr": "Buff de Taux CRIT si le personnage est protégé par un bouclier (ne concerne que les attaques normales et chargées)",
          "en": "Crit Rate buff if the character is protected by a shield (only applies to normal and charged attacks)"
        },
        "active": false,
        "stats": {
          "critRate_": [
            0.08,
            0.02
          ]
        }
      }
    ]
  },
  "CalamityQueller": {
    "selectMode": "exclusive",
    "buffs": [
      {
        "label": {
          "fr": "Max Stacks sur le terrain (ATQ%)",
          "en": "On-field max stacks (ATK%)"
        },
        "stats": {
          "atk_": [
            0.192,
            0.048
          ]
        }
      },
      {
        "label": {
          "fr": "Max Stacks hors du terrain (ATQ%)",
          "en": "Off-field max stacks (ATK%)"
        },
        "stats": {
          "atk_": [
            0.384,
            0.096
          ]
        }
      }
    ]
  },
  "Cloudforged": {
    "selectMode": "cumulative",
    "buffs": [
      {
        "label": {
          "fr": "Si l'énergie du porteur diminue une 1ère fois (Maîtrise élémentaire)",
          "en": "If the wearer's energy decreases 1 time (EM)"
        },
        "stats": {
          "eleMas": [
            40,
            10
          ]
        }
      },
      {
        "label": {
          "fr": "Si l'énergie du porteur diminue une 2ème fois (Maîtrise élémentaire)",
          "en": "If the wearer's energy decreases 2 times (EM)"
        },
        "stats": {
          "eleMas": [
            40,
            10
          ]
        }
      }
    ]
  },
  "CompoundBow": {
    "selectMode": "cumulative",
    "buffs": [
      {
        "label": {
          "fr": "1 stack (ATQ%)",
          "en": "1 stack (ATK%)"
        },
        "stats": {
          "atk_": [
            0.04,
            0.01
          ]
        }
      },
      {
        "label": {
          "fr": "2 stacks (ATQ%)",
          "en": "2 stacks (ATK%)"
        },
        "stats": {
          "atk_": [
            0.04,
            0.01
          ]
        }
      },
      {
        "label": {
          "fr": "3 stacks (ATQ%)",
          "en": "3 stacks (ATK%)"
        },
        "stats": {
          "atk_": [
            0.04,
            0.01
          ]
        }
      },
      {
        "label": {
          "fr": "4 stacks (ATQ%)",
          "en": "4 stacks (ATK%)"
        },
        "stats": {
          "atk_": [
            0.04,
            0.01
          ]
        }
      }
    ]
  },
  "DarkIronSword": {
    "buffs": [
      {
        "label": {
          "fr": "Si une réaction élémentaire liée à l'élément Électro est déclenchée (ATQ%)",
          "en": "If an elemental reaction related to Electro is triggered (ATK%)"
        },
        "stats": {
          "atk_": [
            0.2,
            0.05
          ]
        }
      }
    ]
  },
  "DawningFrost": {
    "buffs": [
      {
        "label": {
          "fr": "Si une attaque chargée touche un ennemi (Maîtrise élémentaire)",
          "en": "If a charged attack hits an enemy (EM)"
        },
        "stats": {
          "eleMas": [
            72,
            18
          ]
        }
      },
      {
        "label": {
          "fr": "Si une compétence élémentaire touche un ennemi (Maîtrise élémentaire)",
          "en": "If an elemental skill hits an enemy (EM)"
        },
        "stats": {
          "eleMas": [
            48,
            12
          ]
        }
      }
    ]
  },
  "Deathmatch": {
    "selectMode": "exclusive",
    "buffs": [
      {
        "label": {
          "fr": "S'il y a 2 ennemis ou plus aux alentours (ATQ% et DÉF%)",
          "en": "If there are 2 enemies or more nearby (ATK% & DEF%)"
        },
        "stats": {
          "atk_": [
            0.16,
            0.04
          ],
          "def_": [
            0.16,
            0.04
          ]
        }
      },
      {
        "label": {
          "fr": "S'il y a moins de 2 ennemis aux alentours (ATQ%)",
          "en": "If there are less than 2 enemies nearby (ATK%)"
        },
        "stats": {
          "atk_": [
            0.24,
            0.04
          ]
        }
      }
    ]
  },
  "DodocoTales": {
    "buffs": [
      {
        "label": {
          "fr": "Si une attaque chargée touche un ennemi (ATQ%)",
          "en": "If a charged attack hits an enemy (ATK%)"
        },
        "stats": {
          "atk_": [
            0.08,
            0.02
          ]
        }
      }
    ]
  },
  "EarthShaker": {
    "selectMode": "ChainBreaker",
    "buffs": [
      {
        "label": {
          "fr": "Si l'équipe est composée d'1 personnage de Natlan ou d'un élément différent du porteur (ATQ%)",
          "en": "If the party includes 1 character from Natlan or of a different element than the wearer (ATK%)"
        },
        "stats": {
          "atk_": [
            0.048,
            0.012
          ]
        }
      },
      {
        "label": {
          "fr": "Si l'équipe est composée de 2 personnages de Natlan ou d'un élément différent du porteur (ATQ%)",
          "en": "If the party includes 2 characters from Natlan or of a different element than the wearer (ATK%)"
        },
        "stats": {
          "atk_": [
            0.096,
            0.024
          ]
        }
      },
      {
        "label": {
          "fr": "Si l'équipe est composée de 3 personnages de Natlan ou d'un élément différent du porteur (ATQ% et Maîtrise élémentaire)",
          "en": "If the party includes 3 characters from Natlan or of a different element than the wearer (ATK% & EM)"
        },
        "stats": {
          "atk_": [
            0.144,
            0.036
          ],
          "eleMas": [
            24,
            6
          ]
        }
      },
      {
        "label": {
          "fr": "Si l'équipe est composée de 4 personnages de Natlan ou d'un élément différent du porteur (ATQ% et Maîtrise élémentaire)",
          "en": "If the party includes 4 characters from Natlan or of a different element than the wearer (ATK% & EM)"
        },
        "stats": {
          "atk_": [
            0.192,
            0.048
          ],
          "eleMas": [
            24,
            6
          ]
        }
      }
    ]
  },
  "ElegyForTheEnd": {
    "buffs": [
      {
        "label": {
          "fr": "Si 4 compétences ou déchaînements élémentaires ont touché un ennemi (Maîtrise élémentaire et ATQ%)",
          "en": "If 4 elemental skills or bursts hit an enemy (EM & ATK%)"
        },
        "stats": {
          "atk_": [
            0.2,
            0.05
          ],
          "eleMas": [
            100,
            25
          ]
        }
      }
    ]
  },
  "EmeraldOrb": {
    "buffs": [
      {
        "label": {
          "fr": "Si une réaction liée à l'élément Hydro a lieu (ATQ%)",
          "en": "If a Hydro reaction is triggered (ATK%)"
        },
        "stats": {
          "atk_": [
            0.2,
            0.05
          ]
        }
      }
    ]
  },
  "EngulfingLightning": {
    "buffs": [
      {
        "label": {
          "fr": "Si un déchaînement élémentaire est utilisé (Recharge d'énergie)",
          "en": "If an elemental burst is used (ER)"
        },
        "stats": {
          "enerRech_": [
            0.3,
            0.05
          ]
        }
      }
    ]
  },
  "EtherlightSpindlelute": {
    "buffs": [
      {
        "label": {
          "fr": "Si une compétence élémentaire est utilisée (Maîtrise élémentaire)",
          "en": "If an elemental skill is used (EM)"
        },
        "stats": {
          "eleMas": [
            100,
            25
          ]
        }
      }
    ]
  },
  "FesteringDesire": {
    "buffs": [
      {
        "label": {
          "fr": "Amélioration de Taux CRIT sur la compétence seulement",
          "en": "Crit Rate buff on the elemental skill only"
        },
        "active": false,
        "stats": {
          "critRate_": [
            0.06,
            0.015
          ]
        }
      }
    ]
  },
  "FinaleOfTheDeep": {
    "buffs": [
      {
        "label": {
          "fr": "Si une compétence élémentaire est utilisée (ATQ%)",
          "en": "If an elemental skill is used (ATK%)"
        },
        "stats": {
          "atk_": [
            0.12,
            0.03
          ]
        }
      },
      {
        "label": {
          "fr": "Si l'Engagement Vital est dissipé (ATQ)",
          "en": "If the Bond of Life is cleared (ATK%)"
        },
        "stats": {
          "atk": [
            150,
            37.5
          ]
        }
      }
    ]
  },
  "FlameForgedInsight": {
    "buffs": [
      {
        "label": {
          "fr": "Si une réaction Sélène est déclenchée (Maîtrise élémentaire)",
          "en": "If a Lunar Reaction is triggered (EM)"
        },
        "stats": {
          "eleMas": [
            60,
            15
          ]
        }
      }
    ]
  },
  "FleuveCendreFerryman": {
    "buffs": [
      {
        "label": {
          "fr": "Buff passif de Taux CRIT (ne concerne que la compétence élémentaire)",
          "en": "Passive Crit Rate buff (only for the elemental skill)"
        },
        "active": false,
        "stats": {
          "critRate_": [
            0.08,
            0.02
          ]
        }
      },
      {
        "label": {
          "fr": "Si une compétence élémentaire est utilisée (Recharge d'énergie)",
          "en": "If an elemental skill is used (ER)"
        },
        "stats": {
          "enerRech_": [
            0.16,
            0.04
          ]
        }
      }
    ]
  },
  "FlowingPurity": {
    "selectMode": "cumulative",
    "buffs": [
      {
        "label": {
          "fr": "Si une compétence élémentaire est utilisée (DGTs Élémentaires)",
          "en": "If an elemental skill is used (Elemental DMG)"
        },
        "stats": {
          "pyro_dmg_": [
            0.08,
            0.02
          ],
          "hydro_dmg_": [
            0.08,
            0.02
          ],
          "cryo_dmg_": [
            0.08,
            0.02
          ],
          "electro_dmg_": [
            0.08,
            0.02
          ],
          "anemo_dmg_": [
            0.08,
            0.02
          ],
          "geo_dmg_": [
            0.08,
            0.02
          ],
          "dendro_dmg_": [
            0.08,
            0.02
          ]
        }
      },
      {
        "label": {
          "fr": "Si un Engagement Vital est dissipé (DGTs Élémentaires)",
          "en": "If a Bond of Life is cleared (Elemental DMG)"
        },
        "stats": {
          "pyro_dmg_": [
            0.12,
            0.03
          ],
          "hydro_dmg_": [
            0.12,
            0.03
          ],
          "cryo_dmg_": [
            0.12,
            0.03
          ],
          "electro_dmg_": [
            0.12,
            0.03
          ],
          "anemo_dmg_": [
            0.12,
            0.03
          ],
          "geo_dmg_": [
            0.12,
            0.03
          ],
          "dendro_dmg_": [
            0.12,
            0.03
          ]
        }
      }
    ]
  },
  "FluteOfEzpitzal": {
    "buffs": [
      {
        "label": {
          "fr": "Si une compétence élémentaire est utilisée (DÉF%)",
          "en": "If an elemental skill is used (DEF%)"
        },
        "stats": {
          "def_": [
            0.16,
            0.04
          ]
        }
      }
    ]
  },
  "FootprintOfTheRainbow": {
    "buffs": [
      {
        "label": {
          "fr": "Si une compétence élémentaire est utilisée (DÉF%)",
          "en": "If an elemental skill is used (DEF%)"
        },
        "stats": {
          "def_": [
            0.16,
            0.04
          ]
        }
      }
    ]
  },
  "ForestRegalia": {
    "buffs": [
      {
        "label": {
          "fr": "Si une réaction liée à l'élément Dendro est déclenchée (Maîtrise élémentaire)",
          "en": "If a Dendro reaction is triggered (EM)"
        },
        "stats": {
          "eleMas": [
            60,
            15
          ]
        }
      }
    ]
  },
  "FracturedHalo": {
    "buffs": [
      {
        "label": {
          "fr": "Si une compétence ou un déchaînement élémentaire est utilisé (ATQ%)",
          "en": "If an elemental skill or burst is used (ATK%)"
        },
        "stats": {
          "atk_": [
            0.24,
            0.06
          ]
        }
      }
    ]
  },
  "FreedomSworn": {
    "buffs": [
      {
        "label": {
          "fr": "Si 2 réactions élémentaires sont déclenchées (ATQ%)",
          "en": "If 2 elemental reactions are triggered (ATK%)"
        },
        "stats": {
          "atk_": [
            0.2,
            0.05
          ]
        }
      }
    ]
  },
  "FruitOfFulfillment": {
    "buffs": [
      {
        "label": {
          "fr": "Si une réaction élémentaire est déclenchée (Maîtrise élémentaire)",
          "en": "If an elemental reaction is triggered (EM)"
        },
        "stats": {
          "eleMas": [
            24,
            3
          ]
        }
      }
    ]
  },
  "FruitfulHook": {
    "buffs": [
      {
        "label": {
          "fr": "Bonus de Taux CRIT (Uniquement pour les attaques plongées)",
          "en": "Crit Rate buff (for plunge attacks only)"
        },
        "active": false,
        "stats": {
          "critRate_": [
            0.16,
            0.04
          ]
        }
      }
    ]
  },
  "GestOfTheMightyWolf": {
    "selectMode": "exclusive",
    "buffs": [
      {
        "label": {
          "fr": "Hymne des quatre vents (1 stacks)",
          "en": "Four Winds' Hymn (1 stack)"
        },
        "stats": {
          "critDMG_": [
            0.075,
            0.02
          ]
        }
      },
      {
        "label": {
          "fr": "Hymne des quatre vents (2 stacks)",
          "en": "Four Winds' Hymn (2 stacks)"
        },
        "stats": {
          "critDMG_": [
            0,
            15,
            0.04
          ]
        }
      },
      {
        "label": {
          "fr": "Hymne des quatre vents (3 stacks)",
          "en": "Four Winds' Hymn (3 stacks)"
        },
        "stats": {
          "critDMG_": [
            0.225,
            0.06
          ]
        }
      },
      {
        "label": {
          "fr": "Hymne des quatre vents (4 stacks)",
          "en": "Four Winds' Hymn (4 stacks)"
        },
        "active": true,
        "stats": {
          "critDMG_": [
            0.3,
            0.08
          ]
        }
      }
    ]
  },
  "HakushinRing": {
    "buffs": [
      {
        "label": {
          "fr": "Si une réaction élémentaire en lien avec Électro est déclenchée (DGTs Élémentaires)",
          "en": "If an Electro elemental reaction is triggered (Elemental DMG)"
        },
        "stats": {
          "pyro_dmg_": [
            0.1,
            0.025
          ],
          "hydro_dmg_": [
            0.1,
            0.025
          ],
          "cryo_dmg_": [
            0.1,
            0.025
          ],
          "electro_dmg_": [
            0.1,
            0.025
          ],
          "anemo_dmg_": [
            0.1,
            0.025
          ],
          "geo_dmg_": [
            0.1,
            0.025
          ],
          "dendro_dmg_": [
            0.1,
            0.025
          ]
        }
      }
    ]
  },
  "HarbingerOfDawn": {
    "buffs": [
      {
        "label": {
          "fr": "Si les PV sont supérieurs à 90% (Taux CRIT)",
          "en": "If HP is above 90% (Crit Rate)"
        },
        "active": false,
        "stats": {
          "critRate_": [
            0.14,
            0.035
          ]
        }
      }
    ]
  },
  "IbisPiercer": {
    "selectMode": "cumulative",
    "buffs": [
      {
        "label": {
          "fr": "Si une 1ère attaque chargée touche un ennemi (Maîtrise élémentaire)",
          "en": "If 1 charged attack hits an enemy (EM)"
        },
        "stats": {
          "eleMas": [
            40,
            10
          ]
        }
      },
      {
        "label": {
          "fr": "Si une 2ème attaque chargée touche un ennemi (Maîtrise élémentaire)",
          "en": "If 2 charged attacks hit an enemy (EM)"
        },
        "stats": {
          "eleMas": [
            40,
            10
          ]
        }
      }
    ]
  },
  "JadefallsSplendor": {
    "buffs": [
      {
        "label": {
          "fr": "Si un déchaînement élémentaire est utilisé ou qu'un bouclier est créé (DGTs Élémentaires en fonction des PV)",
          "en": "If an elemental burst is used or a shield is created (Elemental DMG based on HP)"
        },
        "stats": {
          "pyro_dmg_bonus_scaling": {
            "source": "hp",
            "percent": [
              0.0003,
              0.0002
            ]
          },
          "hydro_dmg_bonus_scaling": {
            "source": "hp",
            "percent": [
              0.0003,
              0.0002
            ]
          },
          "cryo_dmg_bonus_scaling": {
            "source": "hp",
            "percent": [
              0.0003,
              0.0002
            ]
          },
          "electro_dmg_bonus_scaling": {
            "source": "hp",
            "percent": [
              0.0003,
              0.0002
            ]
          },
          "anemo_dmg_bonus_scaling": {
            "source": "hp",
            "percent": [
              0.0003,
              0.0002
            ]
          },
          "geo_dmg_bonus_scaling": {
            "source": "hp",
            "percent": [
              0.0003,
              0.0002
            ]
          },
          "dendro_dmg_bonus_scaling": {
            "source": "hp",
            "percent": [
              0.0003,
              0.0002
            ]
          }
        }
      }
    ]
  },
  "KagotsurubeIsshin": {
    "buffs": [
      {
        "label": {
          "fr": "Si une attaque normale, chargée ou plongeante touche un ennemi (ATQ%)",
          "en": "If a normal, charged or plunging attack hits an enemy (ATK%)"
        },
        "stats": {
          "atk_": [
            0.15,
            0
          ]
        }
      }
    ]
  },
  "KagurasVerity": {
    "buffs": [
      {
        "label": {
          "fr": "Si 3 compétences élémentaires sont utilisées (DGTs Élémentaires)",
          "en": "If 3 elemental skills ares used (Elemental DMG)"
        },
        "stats": {
          "pyro_dmg_": [
            0.12,
            0.03
          ],
          "hydro_dmg_": [
            0.12,
            0.03
          ],
          "cryo_dmg_": [
            0.12,
            0.03
          ],
          "electro_dmg_": [
            0.12,
            0.03
          ],
          "anemo_dmg_": [
            0.12,
            0.03
          ],
          "geo_dmg_": [
            0.12,
            0.03
          ],
          "dendro_dmg_": [
            0.12,
            0.03
          ]
        }
      }
    ]
  },
  "KeyOfKhajNisut": {
    "selectMode": "exclusive",
    "buffs": [
      {
        "label": {
          "fr": "1 Stack (PV% en Maîtrise élémentaire)",
          "en": "1 Stack (HP% to EM)"
        },
        "stats": {
          "eleMas_bonus_scaling": {
            "source": "hp",
            "percent": [
              0.0012,
              0.0003
            ]
          }
        }
      },
      {
        "label": {
          "fr": "2 Stacks (PV% en Maîtrise élémentaire)",
          "en": "2 Stacks (HP% to EM)"
        },
        "stats": {
          "eleMas_bonus_scaling": {
            "source": "hp",
            "percent": [
              0.0024,
              0.0006
            ]
          }
        }
      },
      {
        "label": {
          "fr": "3 Stacks (PV% en Maîtrise élémentaire)",
          "en": "3 Stacks (HP% to EM)"
        },
        "stats": {
          "eleMas_bonus_scaling": {
            "source": "hp",
            "percent": [
              0.0056,
              0.0014
            ]
          }
        }
      }
    ]
  },
  "KingsSquire": {
    "buffs": [
      {
        "label": {
          "fr": "Si une compétence ou un déchaînement élémentaire est utilisé (Maîtrise élémentaire)",
          "en": "If an elemental skill or burst is used (EM)"
        },
        "stats": {
          "eleMas": [
            60,
            20
          ]
        }
      }
    ]
  },
  "LithicBlade": {
    "selectMode": "exclusive",
    "buffs": [
      {
        "label": {
          "fr": "Si 1 personnage de Liyue est dans l'équipe (ATQ% et Taux CRIT)",
          "en": "If 1 character from Liyue is in the party (ATK% & Crit Rate)"
        },
        "active": false,
        "stats": {
          "atk_": [
            0.07,
            0.01
          ],
          "critRate_": [
            0.03,
            0.01
          ]
        }
      },
      {
        "label": {
          "fr": "Si 2 personnages de Liyue sont dans l'équipe (ATQ% et Taux CRIT)",
          "en": "If 2 characters from Liyue are in the party (ATK% & Crit Rate)"
        },
        "active": false,
        "stats": {
          "atk_": [
            0.14,
            0.02
          ],
          "critRate_": [
            0.06,
            0.02
          ]
        }
      },
      {
        "label": {
          "fr": "Si 3 personnages de Liyue sont dans l'équipe (ATQ% et Taux CRIT)",
          "en": "If 3 characters from Liyue are in the party (ATK% & Crit Rate)"
        },
        "active": false,
        "stats": {
          "atk_": [
            0.21,
            0.03
          ],
          "critRate_": [
            0.09,
            0.03
          ]
        }
      },
      {
        "label": {
          "fr": "Si 4 personnages de Liyue sont dans l'équipe (ATQ% et Taux CRIT)",
          "en": "If 4 characters from Liyue are in the party (ATK% & Crit Rate)"
        },
        "active": false,
        "stats": {
          "atk_": [
            0.28,
            0.04
          ],
          "critRate_": [
            0.12,
            0.04
          ]
        }
      }
    ]
  },
  "LithicSpear": {
    "selectMode": "exclusive",
    "buffs": [
      {
        "label": {
          "fr": "Si 1 personnage de Liyue est dans l'équipe (ATQ% et Taux CRIT)",
          "en": "If 1 character from Liyue is in the party (ATK% & Crit Rate)"
        },
        "active": false,
        "stats": {
          "atk_": [
            0.07,
            0.01
          ],
          "critRate_": [
            0.03,
            0.01
          ]
        }
      },
      {
        "label": {
          "fr": "Si 2 personnages de Liyue sont dans l'équipe (ATQ% et Taux CRIT)",
          "en": "If 2 characters from Liyue are in the party (ATK% & Crit Rate)"
        },
        "active": false,
        "stats": {
          "atk_": [
            0.14,
            0.02
          ],
          "critRate_": [
            0.06,
            0.02
          ]
        }
      },
      {
        "label": {
          "fr": "Si 3 personnages de Liyue sont dans l'équipe (ATQ% et Taux CRIT)",
          "en": "If 3 characters from Liyue are in the party (ATK% & Crit Rate)"
        },
        "active": false,
        "stats": {
          "atk_": [
            0.21,
            0.03
          ],
          "critRate_": [
            0.09,
            0.03
          ]
        }
      },
      {
        "label": {
          "fr": "Si 4 personnages de Liyue sont dans l'équipe (ATQ% et Taux CRIT)",
          "en": "If 4 characters from Liyue are in the party (ATK% & Crit Rate)"
        },
        "active": false,
        "stats": {
          "atk_": [
            0.28,
            0.04
          ],
          "critRate_": [
            0.12,
            0.04
          ]
        }
      }
    ]
  },
  "LostPrayerToTheSacredWinds": {
    "selectMode": "cumulative",
    "buffs": [
      {
        "label": {
          "fr": "1 Stack (DGTs Élémentaires)",
          "en": "1 Stack (Elemental DMG)"
        },
        "stats": {
          "pyro_dmg_": [
            0.08,
            0.02
          ],
          "hydro_dmg_": [
            0.08,
            0.02
          ],
          "cryo_dmg_": [
            0.08,
            0.02
          ],
          "electro_dmg_": [
            0.08,
            0.02
          ],
          "anemo_dmg_": [
            0.08,
            0.02
          ],
          "geo_dmg_": [
            0.08,
            0.02
          ],
          "dendro_dmg_": [
            0.08,
            0.02
          ]
        }
      },
      {
        "label": {
          "fr": "2 Stacks (DGTs Élémentaires)",
          "en": "2 Stacks (Elemental DMG)"
        },
        "stats": {
          "pyro_dmg_": [
            0.08,
            0.02
          ],
          "hydro_dmg_": [
            0.08,
            0.02
          ],
          "cryo_dmg_": [
            0.08,
            0.02
          ],
          "electro_dmg_": [
            0.08,
            0.02
          ],
          "anemo_dmg_": [
            0.08,
            0.02
          ],
          "geo_dmg_": [
            0.08,
            0.02
          ],
          "dendro_dmg_": [
            0.08,
            0.02
          ]
        }
      },
      {
        "label": {
          "fr": "3 Stacks (DGTs Élémentaires)",
          "en": "3 Stacks (Elemental DMG)"
        },
        "stats": {
          "pyro_dmg_": [
            0.08,
            0.02
          ],
          "hydro_dmg_": [
            0.08,
            0.02
          ],
          "cryo_dmg_": [
            0.08,
            0.02
          ],
          "electro_dmg_": [
            0.08,
            0.02
          ],
          "anemo_dmg_": [
            0.08,
            0.02
          ],
          "geo_dmg_": [
            0.08,
            0.02
          ],
          "dendro_dmg_": [
            0.08,
            0.02
          ]
        }
      },
      {
        "label": {
          "fr": "4 Stacks (DGTs Élémentaires)",
          "en": "4 Stacks (Elemental DMG)"
        },
        "stats": {
          "pyro_dmg_": [
            0.08,
            0.02
          ],
          "hydro_dmg_": [
            0.08,
            0.02
          ],
          "cryo_dmg_": [
            0.08,
            0.02
          ],
          "electro_dmg_": [
            0.08,
            0.02
          ],
          "anemo_dmg_": [
            0.08,
            0.02
          ],
          "geo_dmg_": [
            0.08,
            0.02
          ],
          "dendro_dmg_": [
            0.08,
            0.02
          ]
        }
      }
    ]
  },
  "MailedFlower": {
    "buffs": [
      {
        "label": {
          "fr": "Si une compétence élémentaire touche un ennemi ou qu'une réaction élémentaire est déclenchée (ATQ% et Maîtrise élémentaire)",
          "en": "If an elemental skill hits an enemy or if an elemental reaction is triggered (ATK% & EM)"
        },
        "stats": {
          "atk_": [
            0.12,
            0.03
          ],
          "eleMas": [
            48,
            12
          ]
        }
      }
    ]
  },
  "MakhairaAquamarine": {
    "buffs": [
      {
        "label": {
          "fr": "Bonus selon la Maîtrise élémentaire (ATQ)",
          "en": "Passive buff based on EM (ATK)"
        },
        "stats": {
          "atk_bonus_scaling": {
            "source": "eleMas",
            "percent": [
              0.24,
              0.06
            ]
          }
        }
      }
    ]
  },
  "MappaMare": {
    "selectMode": "cumulative",
    "buffs": [
      {
        "label": {
          "fr": "Si une 1ère réaction élémentaire est déclenchée (DGTs Élémentaires)",
          "en": "If 1 elemental reaction is triggered (Elemental DMG)"
        },
        "stats": {
          "pyro_dmg_": [
            0.08,
            0.02
          ],
          "hydro_dmg_": [
            0.08,
            0.02
          ],
          "cryo_dmg_": [
            0.08,
            0.02
          ],
          "electro_dmg_": [
            0.08,
            0.02
          ],
          "anemo_dmg_": [
            0.08,
            0.02
          ],
          "geo_dmg_": [
            0.08,
            0.02
          ],
          "dendro_dmg_": [
            0.08,
            0.02
          ]
        }
      },
      {
        "label": {
          "fr": "Si une 2ème réaction élémentaire est déclenchée (DGTs Élémentaires)",
          "en": "If 2 elemental reactions are triggered (Elemental DMG)"
        },
        "stats": {
          "pyro_dmg_": [
            0.08,
            0.02
          ],
          "hydro_dmg_": [
            0.08,
            0.02
          ],
          "cryo_dmg_": [
            0.08,
            0.02
          ],
          "electro_dmg_": [
            0.08,
            0.02
          ],
          "anemo_dmg_": [
            0.08,
            0.02
          ],
          "geo_dmg_": [
            0.08,
            0.02
          ],
          "dendro_dmg_": [
            0.08,
            0.02
          ]
        }
      }
    ]
  },
  "MasterKey": {
    "selectMode": "exclusive",
    "buffs": [
      {
        "label": {
          "fr": "Si une réaction élémentaire est déclenchée et que l'équipe est sous le signe Lueur Naissante (Maîtrise élémentaire)",
          "en": "If an elemental reaction is triggered and the party's Moonsign is Nascent Gleam (EM)"
        },
        "stats": {
          "eleMas": [
            60,
            15
          ]
        }
      },
      {
        "label": {
          "fr": "Si une réaction élémentaire est déclenchée et que l'équipe est sous le signe Lueur Ascendante (Maîtrise élémentaire)",
          "en": "If an elemental reaction is triggered and the party's Moonsigne is Ascendant Gleam (EM)"
        },
        "stats": {
          "eleMas": [
            120,
            30
          ]
        }
      }
    ]
  },
  "MemoryOfDust": {
    "selectMode": "cumulative",
    "buffs": [
      {
        "label": {
          "fr": "Si une 1ère attaque touche un ennemi (ATQ%)",
          "en": "Si 1 attack hits an enemy (ATK%)"
        },
        "stats": {
          "atk_": [
            0.04,
            0.01
          ]
        }
      },
      {
        "label": {
          "fr": "Si une 2ème attaque touche un ennemi (ATQ%)",
          "en": "If 2 attacks hit an enemy (ATK%)"
        },
        "stats": {
          "atk_": [
            0.04,
            0.01
          ]
        }
      },
      {
        "label": {
          "fr": "Si une 3ème attaque touche un ennemi (ATQ%)",
          "en": "If 3 attacks hit an enemy (ATK%)"
        },
        "stats": {
          "atk_": [
            0.04,
            0.01
          ]
        }
      },
      {
        "label": {
          "fr": "Si une 4ème attaque touche un ennemi (ATQ%)",
          "en": "If 4 attacks hit an enemy (ATK%)"
        },
        "stats": {
          "atk_": [
            0.04,
            0.01
          ]
        }
      },
      {
        "label": {
          "fr": "Si une 5ème attaque touche un ennemi (ATQ%)",
          "en": "If 5 attacks hit an enemy (ATK%)"
        },
        "stats": {
          "atk_": [
            0.04,
            0.01
          ]
        }
      }
    ]
  },
  "MissiveWindspear": {
    "buffs": [
      {
        "label": {
          "fr": "Si une réaction élémentaire est déclenchée (ATQ% et Maîtrise élémentaire)",
          "en": "If an elemental reaction is triggered (ATK% & EM)"
        },
        "stats": {
          "atk_": [
            0.12,
            0.03
          ],
          "eleMas": [
            48,
            12
          ]
        }
      }
    ]
  },
  "MistsplitterReforged": {
    "selectMode": "exclusive",
    "buffs": [
      {
        "label": {
          "fr": "1 Emblème (DGTs Élémentaires)",
          "en": "1 Emblem (Elemental DMG)"
        },
        "stats": {
          "pyro_dmg_": [
            0.08,
            0.02
          ],
          "hydro_dmg_": [
            0.08,
            0.02
          ],
          "cryo_dmg_": [
            0.08,
            0.02
          ],
          "electro_dmg_": [
            0.08,
            0.02
          ],
          "anemo_dmg_": [
            0.08,
            0.02
          ],
          "geo_dmg_": [
            0.08,
            0.02
          ],
          "dendro_dmg_": [
            0.08,
            0.02
          ]
        }
      },
      {
        "label": {
          "fr": "2 Emblèmes (DGTs Élémentaires)",
          "en": "2 Emblems (Elemental DMG)"
        },
        "stats": {
          "pyro_dmg_": [
            0.16,
            0.04
          ],
          "hydro_dmg_": [
            0.16,
            0.04
          ],
          "cryo_dmg_": [
            0.16,
            0.04
          ],
          "electro_dmg_": [
            0.16,
            0.04
          ],
          "anemo_dmg_": [
            0.16,
            0.04
          ],
          "geo_dmg_": [
            0.16,
            0.04
          ],
          "dendro_dmg_": [
            0.16,
            0.04
          ]
        }
      },
      {
        "label": {
          "fr": "3 Emblèmes (DGTs Élémentaires)",
          "en": "3 Emblems (Elemental DMG)"
        },
        "stats": {
          "pyro_dmg_": [
            0.28,
            0.07
          ],
          "hydro_dmg_": [
            0.28,
            0.07
          ],
          "cryo_dmg_": [
            0.28,
            0.07
          ],
          "electro_dmg_": [
            0.28,
            0.07
          ],
          "anemo_dmg_": [
            0.28,
            0.07
          ],
          "geo_dmg_": [
            0.28,
            0.07
          ],
          "dendro_dmg_": [
            0.28,
            0.07
          ]
        }
      }
    ]
  },
  "Moonpiercer": {
    "buffs": [
      {
        "label": {
          "fr": "Si une réaction en lien avec l'élément Dendro est déclenchée (ATQ%)",
          "en": "If a Dendro elemental reaction is triggered (ATK%)"
        },
        "stats": {
          "atk_": [
            0.16,
            0.04
          ]
        }
      }
    ]
  },
  "NightweaversLookingGlass": {
    "buffs": [
      {
        "label": {
          "fr": "Si une compétence élémentaire inflige des DGT Hydro ou Dendro (Maîtrise élémentaire)",
          "en": "If an elemental skill deals Hydro or Dendro DMG (EM)"
        },
        "stats": {
          "eleMas": [
            60,
            15
          ]
        }
      },
      {
        "label": {
          "fr": "Si une réaction de Sélénofleurissement est déclenchée (Maîtrise élémentaire)",
          "en": "If a Lunar-Bloom elemental reaction is triggered (EM)"
        },
        "stats": {
          "eleMas": [
            60,
            15
          ]
        }
      }
    ]
  },
  "NocturnesCurtainCall": {
    "buffs": [
      {
        "label": {
          "fr": "Si une réaction Sélène est déclenchée ou inflige des dégâts (PV% et DGT CRIT uniquement pour les réactions Sélène)",
          "en": "If a Lunar reaction is triggered or deals damage (HP% & Crit DMG only for Lunar reactions)"
        },
        "stats": {
          "hp_": [
            0.14,
            0.02
          ],
          "critDMG_": [
            0.6,
            0.2
          ]
        }
      }
    ]
  },
  "OathswornEye": {
    "buffs": [
      {
        "label": {
          "fr": "Si une compétence élémentaire est utilisée (Recharge d'énergie)",
          "en": "If an elemental skill is used (ER)"
        },
        "stats": {
          "enerRech_": [
            0.24,
            0.06
          ]
        }
      }
    ]
  },
  "PeakPatrolSong": {
    "selectMode": "exclusive",
    "buffs": [
      {
        "label": {
          "fr": "Si une attaque normale ou plongée touche un ennemi une 1ère fois (DÉF% et DGTs Élémentaires)",
          "en": "If a normal or plunging attack hits an enemy a 1st time (DEF% & Elemental DMG)"
        },
        "stats": {
          "def_": [
            0.08,
            0.02
          ],
          "pyro_dmg_": [
            0.1,
            0.025
          ],
          "hydro_dmg_": [
            0.1,
            0.025
          ],
          "cryo_dmg_": [
            0.1,
            0.025
          ],
          "electro_dmg_": [
            0.1,
            0.025
          ],
          "anemo_dmg_": [
            0.1,
            0.025
          ],
          "geo_dmg_": [
            0.1,
            0.025
          ],
          "dendro_dmg_": [
            0.1,
            0.025
          ]
        }
      },
      {
        "label": {
          "fr": "Si une attaque normale ou plongée touche un ennemi une 2ème fois (DÉF% et DGTs Élémentaires)",
          "en": "If a normal or plunging attack hits an enemy a 2nd time (DEF% & Elemental DMG)"
        },
        "stats": {
          "def_": [
            0.16,
            0.04
          ],
          "elemental_dmg_": [
            0.2,
            0.05
          ],
          "pyro_dmg_bonus_scaling": {
            "source": "def",
            "percent": [
              0.008,
              0.002
            ]
          },
          "hydro_dmg_bonus_scaling": {
            "source": "def",
            "percent": [
              0.008,
              0.002
            ]
          },
          "cryo_dmg_bonus_scaling": {
            "source": "def",
            "percent": [
              0.008,
              0.002
            ]
          },
          "electro_dmg_bonus_scaling": {
            "source": "def",
            "percent": [
              0.008,
              0.002
            ]
          },
          "anemo_dmg_bonus_scaling": {
            "source": "def",
            "percent": [
              0.008,
              0.002
            ]
          },
          "geo_dmg_bonus_scaling": {
            "source": "def",
            "percent": [
              0.008,
              0.002
            ]
          },
          "dendro_dmg_bonus_scaling": {
            "source": "def",
            "percent": [
              0.008,
              0.002
            ]
          }
        }
      }
    ]
  },
  "PolarStar": {
    "selectMode": "exclusive",
    "buffs": [
      {
        "label": {
          "fr": "1 Stack (ATQ%)",
          "en": "1 Stack (ATK%)"
        },
        "stats": {
          "atk_": [
            0.1,
            0.025
          ]
        }
      },
      {
        "label": {
          "fr": "2 Stacks (ATQ%)",
          "en": "2 Stacks (ATK%)"
        },
        "stats": {
          "atk_": [
            0.2,
            0.05
          ]
        }
      },
      {
        "label": {
          "fr": "3 Stacks (ATQ%)",
          "en": "3 Stacks (ATK%)"
        },
        "stats": {
          "atk_": [
            0.3,
            0.075
          ]
        }
      },
      {
        "label": {
          "fr": "4 Stacks (ATQ%)",
          "en": "4 Stacks (ATK%)"
        },
        "stats": {
          "atk_": [
            0.48,
            0.12
          ]
        }
      }
    ]
  },
  "PortablePowerSaw": {
    "selectMode": "exclusive",
    "buffs": [
      {
        "label": {
          "fr": "1 Symbole consommé (Maîtrise élémentaire)",
          "en": "1 Symbol consumed (EM)"
        },
        "stats": {
          "eleMas": [
            40,
            10
          ]
        }
      },
      {
        "label": {
          "fr": "2 Symboles consommés (Maîtrise élémentaire)",
          "en": "2 Symbols consumed (EM)"
        },
        "stats": {
          "eleMas": [
            80,
            20
          ]
        }
      },
      {
        "label": {
          "fr": "3 Symboles consommés (Maîtrise élémentaire)",
          "en": "3 Symbols consumed (EM)"
        },
        "stats": {
          "eleMas": [
            120,
            30
          ]
        }
      }
    ]
  },
  "PrimordialJadeWingedSpear": {
    "selectMode": "exclusive",
    "buffs": [
      {
        "label": {
          "fr": "1 Stack (ATQ%)",
          "en": "1 Stack (ATK%)"
        },
        "stats": {
          "atk_": [
            0.032,
            0.007
          ]
        }
      },
      {
        "label": {
          "fr": "2 Stacks (ATQ%)",
          "en": "2 Stacks (ATK%)"
        },
        "stats": {
          "atk_": [
            0.064,
            0.014
          ]
        }
      },
      {
        "label": {
          "fr": "3 Stacks (ATQ%)",
          "en": "3 Stacks (ATK%)"
        },
        "stats": {
          "atk_": [
            0.096,
            0.021
          ]
        }
      },
      {
        "label": {
          "fr": "4 Stacks (ATQ%)",
          "en": "4 Stacks (ATK%)"
        },
        "stats": {
          "atk_": [
            0.128,
            0.028
          ]
        }
      },
      {
        "label": {
          "fr": "5 Stacks (ATQ%)",
          "en": "5 Stacks (ATK%)"
        },
        "stats": {
          "atk_": [
            0.16,
            0.035
          ]
        }
      },
      {
        "label": {
          "fr": "6 Stacks (ATQ%)",
          "en": "6 Stacks (ATK%)"
        },
        "stats": {
          "atk_": [
            0.192,
            0.042
          ]
        }
      },
      {
        "label": {
          "fr": "7 Stacks (ATQ%)",
          "en": "7 Stacks (ATK%)"
        },
        "stats": {
          "atk_": [
            0.224,
            0.049
          ]
        }
      }
    ]
  },
  "ProspectorsDrill": {
    "selectMode": "exclusive",
    "buffs": [
      {
        "label": {
          "fr": "Si le personnage soigne ou reçoit de soins une 1ère fois (ATQ% et DGTs Élémentaires)",
          "en": "If the character heals or is healed 1 time (ATK% & Elemental DMG)"
        },
        "stats": {
          "atk_": [
            0.03,
            0.01
          ],
          "pyro_dmg_": [
            0.07,
            0.015
          ],
          "hydro_dmg_": [
            0.07,
            0.015
          ],
          "cryo_dmg_": [
            0.07,
            0.015
          ],
          "electro_dmg_": [
            0.07,
            0.015
          ],
          "anemo_dmg_": [
            0.07,
            0.015
          ],
          "geo_dmg_": [
            0.07,
            0.015
          ],
          "dendro_dmg_": [
            0.07,
            0.015
          ]
        }
      },
      {
        "label": {
          "fr": "Si le personnage soigne ou reçoit de soins une 2ème fois (ATQ% et DGTs Élémentaires)",
          "en": "If the characters heals or is healed 2 times (ATK% & Elemental DMG)"
        },
        "stats": {
          "atk_": [
            0.06,
            0.02
          ],
          "pyro_dmg_": [
            0.14,
            0.03
          ],
          "hydro_dmg_": [
            0.14,
            0.03
          ],
          "cryo_dmg_": [
            0.14,
            0.03
          ],
          "electro_dmg_": [
            0.14,
            0.03
          ],
          "anemo_dmg_": [
            0.14,
            0.03
          ],
          "geo_dmg_": [
            0.14,
            0.03
          ],
          "dendro_dmg_": [
            0.14,
            0.03
          ]
        }
      },
      {
        "label": {
          "fr": "Si le personnage soigne ou reçoit de soins une 3ème fois (ATQ% et DGTs Élémentaires)",
          "en": "If the character heals or is healed 3 times (ATK% & Elemental DMG)"
        },
        "stats": {
          "atk_": [
            0.09,
            0.03
          ],
          "pyro_dmg_": [
            0.21,
            0.045
          ],
          "hydro_dmg_": [
            0.21,
            0.045
          ],
          "cryo_dmg_": [
            0.21,
            0.045
          ],
          "electro_dmg_": [
            0.21,
            0.045
          ],
          "anemo_dmg_": [
            0.21,
            0.045
          ],
          "geo_dmg_": [
            0.21,
            0.045
          ],
          "dendro_dmg_": [
            0.21,
            0.045
          ]
        }
      }
    ]
  },
  "PrototypeCrescent": {
    "buffs": [
      {
        "label": {
          "fr": "Si un point faible est touché en mode visée (ATQ%)",
          "en": "If a weak point is hit while aiming (ATK%)"
        },
        "stats": {
          "atk_": [
            0.36,
            0.09
          ]
        }
      }
    ]
  },
  "PrototypeRancour": {
    "selectMode": "cumulative",
    "buffs": [
      {
        "label": {
          "fr": "Si une attaque normale ou chargée touche un ennemi une 1ère fois (ATQ% et DÉF%)",
          "en": "If a normal or charged attack hits an enemy 1 time (ATK% & DEF%)"
        },
        "stats": {
          "atk_": [
            0.04,
            0.01
          ],
          "def_": [
            0.04,
            0.01
          ]
        }
      },
      {
        "label": {
          "fr": "Si une attaque normale ou chargée touche un ennemi une 2ème fois (ATQ% et DÉF%)",
          "en": "If a normal or charged attack hits an enemy 2 times (ATK% & DEF%)"
        },
        "stats": {
          "atk_": [
            0.04,
            0.01
          ],
          "def_": [
            0.04,
            0.01
          ]
        }
      },
      {
        "label": {
          "fr": "Si une attaque normale ou chargée touche un ennemi une 3ème fois (ATQ% et DÉF)",
          "en": "If a normal or charged attack hits an enemy 3 times (ATK% & DEF%)"
        },
        "stats": {
          "atk_": [
            0.04,
            0.01
          ],
          "def_": [
            0.04,
            0.01
          ]
        }
      },
      {
        "label": {
          "fr": "Si une attaque normale ou chargée touche un ennemi une 4ème fois (ATQ% et DÉF)",
          "en": "If a normal or charged attack hits an enemy 4 times (ATK% & DEF%)"
        },
        "stats": {
          "atk_": [
            0.04,
            0.01
          ],
          "def_": [
            0.04,
            0.01
          ]
        }
      },
      {
        "label": {
          "fr": "Si une attaque normale ou chargée touche un ennemi une 5ème fois (ATQ% et DÉF)",
          "en": "If a normal or charged attack hits an enemy 5 times (ATK% & DEF%)"
        },
        "stats": {
          "atk_": [
            0.04,
            0.01
          ],
          "def_": [
            0.04,
            0.01
          ]
        }
      }
    ]
  },
  "RainbowSerpentsRainBow": {
    "buffs": [
      {
        "label": {
          "fr": "Si une attaque touche un ennemi et que le porteur est hors du terrain (ATQ%)",
          "en": "If an attack hits an enemy and the character is off-field (ATK%)"
        },
        "stats": {
          "atk_": [
            0.28,
            0.07
          ]
        }
      }
    ]
  },
  "RangeGauge": {
    "selectMode": "exclusive",
    "buffs": [
      {
        "label": {
          "fr": "Si le personnage soigne ou reçoit de soins une 1ère fois (ATQ% et DGTs Élémentaires)",
          "en": "If the character heals or is healed 1 time (ATK% & Elemental DMG)"
        },
        "stats": {
          "atk_": [
            0.03,
            0.01
          ],
          "pyro_dmg_": [
            0.07,
            0.015
          ],
          "hydro_dmg_": [
            0.07,
            0.015
          ],
          "cryo_dmg_": [
            0.07,
            0.015
          ],
          "electro_dmg_": [
            0.07,
            0.015
          ],
          "anemo_dmg_": [
            0.07,
            0.015
          ],
          "geo_dmg_": [
            0.07,
            0.015
          ],
          "dendro_dmg_": [
            0.07,
            0.015
          ]
        }
      },
      {
        "label": {
          "fr": "Si le personnage soigne ou reçoit de soins une 2ème fois (ATQ% et DGTs Élémentaires)",
          "en": "If the character heals or is healed 2 times (ATK% & Elemental DMG)"
        },
        "stats": {
          "atk_": [
            0.06,
            0.02
          ],
          "pyro_dmg_": [
            0.14,
            0.03
          ],
          "hydro_dmg_": [
            0.14,
            0.03
          ],
          "cryo_dmg_": [
            0.14,
            0.03
          ],
          "electro_dmg_": [
            0.14,
            0.03
          ],
          "anemo_dmg_": [
            0.14,
            0.03
          ],
          "geo_dmg_": [
            0.14,
            0.03
          ],
          "dendro_dmg_": [
            0.14,
            0.03
          ]
        }
      },
      {
        "label": {
          "fr": "Si le personnage soigne ou reçoit de soins une 3ème fois (ATQ% et DGTs Élémentaires)",
          "en": "If the character heals or is healed 3 times (ATK% & Elemental DMG)"
        },
        "stats": {
          "atk_": [
            0.09,
            0.03
          ],
          "pyro_dmg_": [
            0.21,
            0.045
          ],
          "hydro_dmg_": [
            0.21,
            0.045
          ],
          "cryo_dmg_": [
            0.21,
            0.045
          ],
          "electro_dmg_": [
            0.21,
            0.045
          ],
          "anemo_dmg_": [
            0.21,
            0.045
          ],
          "geo_dmg_": [
            0.21,
            0.045
          ],
          "dendro_dmg_": [
            0.21,
            0.045
          ]
        }
      }
    ]
  },
  "ReliquaryOfTruth": {
    "selectMode": "exclusive",
    "buffs": [
      {
        "label": {
          "fr": "Si une compétence élémentaire est utilisée (Maîtrise élémentaire)",
          "en": "If an elemental skill is used (EM)"
        },
        "stats": {
          "eleMas": [
            80,
            20
          ]
        }
      },
      {
        "label": {
          "fr": "Si des dégâts de Sélénofleurissment sont infligés (DGT CRIT)",
          "en": "If Lunar-Bloom damage is dealt (Crit DMG)"
        },
        "stats": {
          "critDMG_": [
            0.24,
            0.06
          ]
        }
      },
      {
        "label": {
          "fr": "Si les deux effets précédents sont actifs en même temps (Maîtrise élémentaire et DGT CRIT)",
          "en": "If both previous effects are active at the same time (EM & Crit DMG)"
        },
        "stats": {
          "eleMas": [
            120,
            30
          ],
          "critDMG_": [
            0.36,
            0.09
          ]
        }
      }
    ]
  },
  "RoyalBow": {
    "selectMode": "cumulative",
    "buffs": [
      {
        "label": {
          "fr": "Si des dégâts sont infligés une 1ère fois (Taux CRIT)",
          "en": "When damaging an opponent 1 time (Crit Rate)"
        },
        "active": false,
        "stats": {
          "critRate_": [
            0.08,
            0.02
          ]
        }
      },
      {
        "label": {
          "fr": "Si des dégâts sont infligés une 1ème fois (Taux CRIT)",
          "en": "When damaging an opponent 2 times (Crit Rate)"
        },
        "active": false,
        "stats": {
          "critRate_": [
            0.08,
            0.02
          ]
        }
      },
      {
        "label": {
          "fr": "Si des dégâts sont infligés une 3ème fois (Taux CRIT)",
          "en": "When damaging an opponent 3 times (Crit Rate)"
        },
        "active": false,
        "stats": {
          "critRate_": [
            0.08,
            0.02
          ]
        }
      },
      {
        "label": {
          "fr": "Si des dégâts sont infligés une 4ème fois (Taux CRIT)",
          "en": "When damaging an opponent 4 times (Crit Rate)"
        },
        "active": false,
        "stats": {
          "critRate_": [
            0.08,
            0.02
          ]
        }
      },
      {
        "label": {
          "fr": "Si des dégâts sont infligés une 5ème fois (Taux CRIT)",
          "en": "When damaging an opponent 5 times (Crit Rate)"
        },
        "active": false,
        "stats": {
          "critRate_": [
            0.08,
            0.02
          ]
        }
      }
    ]
  },
  "RoyalGreatsword": {
    "selectMode": "cumulative",
    "buffs": [
      {
        "label": {
          "fr": "Si des dégâts sont infligés une 1ère fois (Taux CRIT)",
          "en": "When damaging an opponent 1 time (Crit Rate)"
        },
        "active": false,
        "stats": {
          "critRate_": [
            0.08,
            0.02
          ]
        }
      },
      {
        "label": {
          "fr": "Si des dégâts sont infligés une 1ème fois (Taux CRIT)",
          "en": "When damaging an opponent 2 times (Crit Rate)"
        },
        "active": false,
        "stats": {
          "critRate_": [
            0.08,
            0.02
          ]
        }
      },
      {
        "label": {
          "fr": "Si des dégâts sont infligés une 3ème fois (Taux CRIT)",
          "en": "When damaging an opponent 3 times (Crit Rate)"
        },
        "active": false,
        "stats": {
          "critRate_": [
            0.08,
            0.02
          ]
        }
      },
      {
        "label": {
          "fr": "Si des dégâts sont infligés une 4ème fois (Taux CRIT)",
          "en": "When damaging an opponent 4 times (Crit Rate)"
        },
        "active": false,
        "stats": {
          "critRate_": [
            0.08,
            0.02
          ]
        }
      },
      {
        "label": {
          "fr": "Si des dégâts sont infligés une 5ème fois (Taux CRIT)",
          "en": "When damaging an opponent 5 times (Crit Rate)"
        },
        "active": false,
        "stats": {
          "critRate_": [
            0.08,
            0.02
          ]
        }
      }
    ]
  },
  "RoyalGrimoire": {
    "selectMode": "cumulative",
    "buffs": [
      {
        "label": {
          "fr": "Si des dégâts sont infligés une 1ère fois (Taux CRIT)",
          "en": "When damaging an opponent 1 time (Crit Rate)"
        },
        "active": false,
        "stats": {
          "critRate_": [
            0.08,
            0.02
          ]
        }
      },
      {
        "label": {
          "fr": "Si des dégâts sont infligés une 1ème fois (Taux CRIT)",
          "en": "When damaging an opponent 2 times (Crit Rate)"
        },
        "active": false,
        "stats": {
          "critRate_": [
            0.08,
            0.02
          ]
        }
      },
      {
        "label": {
          "fr": "Si des dégâts sont infligés une 3ème fois (Taux CRIT)",
          "en": "When damaging an opponent 3 times (Crit Rate)"
        },
        "active": false,
        "stats": {
          "critRate_": [
            0.08,
            0.02
          ]
        }
      },
      {
        "label": {
          "fr": "Si des dégâts sont infligés une 4ème fois (Taux CRIT)",
          "en": "When damaging an opponent 4 times (Crit Rate)"
        },
        "active": false,
        "stats": {
          "critRate_": [
            0.08,
            0.02
          ]
        }
      },
      {
        "label": {
          "fr": "Si des dégâts sont infligés une 5ème fois (Taux CRIT)",
          "en": "When damaging an opponent 5 times (Crit Rate)"
        },
        "active": false,
        "stats": {
          "critRate_": [
            0.08,
            0.02
          ]
        }
      }
    ]
  },
  "RoyalLongsword": {
    "selectMode": "cumulative",
    "buffs": [
      {
        "label": {
          "fr": "Si des dégâts sont infligés une 1ère fois (Taux CRIT)",
          "en": "When damaging an opponent 1 time (Crit Rate)"
        },
        "active": false,
        "stats": {
          "critRate_": [
            0.08,
            0.02
          ]
        }
      },
      {
        "label": {
          "fr": "Si des dégâts sont infligés une 1ème fois (Taux CRIT)",
          "en": "When damaging an opponent 2 times (Crit Rate)"
        },
        "active": false,
        "stats": {
          "critRate_": [
            0.08,
            0.02
          ]
        }
      },
      {
        "label": {
          "fr": "Si des dégâts sont infligés une 3ème fois (Taux CRIT)",
          "en": "When damaging an opponent 3 times (Crit Rate)"
        },
        "active": false,
        "stats": {
          "critRate_": [
            0.08,
            0.02
          ]
        }
      },
      {
        "label": {
          "fr": "Si des dégâts sont infligés une 4ème fois (Taux CRIT)",
          "en": "When damaging an opponent 4 times (Crit Rate)"
        },
        "active": false,
        "stats": {
          "critRate_": [
            0.08,
            0.02
          ]
        }
      },
      {
        "label": {
          "fr": "Si des dégâts sont infligés une 5ème fois (Taux CRIT)",
          "en": "When damaging an opponent 5 times (Crit Rate)"
        },
        "active": false,
        "stats": {
          "critRate_": [
            0.08,
            0.02
          ]
        }
      }
    ]
  },
  "RoyalSpear": {
    "selectMode": "cumulative",
    "buffs": [
      {
        "label": {
          "fr": "Si des dégâts sont infligés une 1ère fois (Taux CRIT)",
          "en": "When damaging an opponent 1 time (Crit Rate)"
        },
        "active": false,
        "stats": {
          "critRate_": [
            0.08,
            0.02
          ]
        }
      },
      {
        "label": {
          "fr": "Si des dégâts sont infligés une 1ème fois (Taux CRIT)",
          "en": "When damaging an opponent 2 times (Crit Rate)"
        },
        "active": false,
        "stats": {
          "critRate_": [
            0.08,
            0.02
          ]
        }
      },
      {
        "label": {
          "fr": "Si des dégâts sont infligés une 3ème fois (Taux CRIT)",
          "en": "When damaging an opponent 3 times (Crit Rate)"
        },
        "active": false,
        "stats": {
          "critRate_": [
            0.08,
            0.02
          ]
        }
      },
      {
        "label": {
          "fr": "Si des dégâts sont infligés une 4ème fois (Taux CRIT)",
          "en": "When damaging an opponent 4 times (Crit Rate)"
        },
        "active": false,
        "stats": {
          "critRate_": [
            0.08,
            0.02
          ]
        }
      },
      {
        "label": {
          "fr": "Si des dégâts sont infligés une 5ème fois (Taux CRIT)",
          "en": "When damaging an opponent 5 times (Crit Rate)"
        },
        "active": false,
        "stats": {
          "critRate_": [
            0.08,
            0.02
          ]
        }
      }
    ]
  },
  "SacrificersStaff": {
    "selectMode": "cumulative",
    "buffs": [
      {
        "label": {
          "fr": "Si une compétence élémentaire touche un ennemi une 1ère fois (ATQ% et Recharge d'énergie)",
          "en": "If an elemental skill hits an enemy a 1st time (ATK% & ER)"
        },
        "stats": {
          "atk_": [
            0.08,
            0.02
          ],
          "enerRech_": [
            0.06,
            0.015
          ]
        }
      },
      {
        "label": {
          "fr": "Si une compétence élémentaire touche un ennemi une 2ème fois (ATQ% et Recharge d'énergie)",
          "en": "If an elemental skill hits an enemy a 2nd time (ATK% & ER)"
        },
        "stats": {
          "atk_": [
            0.08,
            0.02
          ],
          "enerRech_": [
            0.06,
            0.015
          ]
        }
      },
      {
        "label": {
          "fr": "Si une compétence élémentaire touche un ennemi une 3ème fois (ATQ% et Recharge d'énergie)",
          "en": "If an elemental skill hits an enemy a 3rd time (ATK% & ER)"
        },
        "stats": {
          "atk_": [
            0.08,
            0.02
          ],
          "enerRech_": [
            0.06,
            0.015
          ]
        }
      }
    ]
  },
  "SacrificialJade": {
    "buffs": [
      {
        "label": {
          "fr": "Si le porteur est hors du terrain pendant 5s (PV% et Maîtrise élémentaire)",
          "en": "If the wearer is off-field for 5 seconds (HP% & EM)"
        },
        "stats": {
          "hp_": [
            0.32,
            0.08
          ],
          "eleMas": [
            40,
            10
          ]
        }
      }
    ]
  },
  "SapwoodBlade": {
    "buffs": [
      {
        "label": {
          "fr": "Si une réaction liée à l'élément Dendro est déclenchée (Maîtrise élémentaire)",
          "en": "If a Dendro elemental reaction is triggered (EM)"
        },
        "stats": {
          "eleMas": [
            60,
            15
          ]
        }
      }
    ]
  },
  "SerenitysCall": {
    "selectMode": "exclusive",
    "buffs": [
      {
        "label": {
          "fr": "Si une réaction élémentaire est déclenchée et que l'équipe est sous le signe Lueur Naissante (PV%)",
          "en": "If an elemental reaction is triggered and the party's Moonsign is Nascent Gleam (HP%)"
        },
        "stats": {
          "hp_": [
            0.16,
            0.04
          ]
        }
      },
      {
        "label": {
          "fr": "Si une réaction élémentaire est déclenchée et que l'équipe est sous le signe Lueur Ascendante (PV%)",
          "en": "If an elemental reaction is triggered and the party's Moonsign is Ascendant Gleam (HP%)"
        },
        "stats": {
          "hp_": [
            0.32,
            0.08
          ]
        }
      }
    ]
  },
  "SilvershowerHeartstrings": {
    "selectMode": "exclusive",
    "buffs": [
      {
        "label": {
          "fr": "1 Stack (PV%)",
          "en": "1 Stack (HP%)"
        },
        "stats": {
          "hp_": [
            0.12,
            0.03
          ]
        }
      },
      {
        "label": {
          "fr": "2 Stacks (PV%)",
          "en": "2 Stacks (HP%)"
        },
        "stats": {
          "atk_": [
            0.24,
            0.06
          ]
        }
      },
      {
        "label": {
          "fr": "3 Stacks (PV% et Taux CRIT uniquement pour le déchaînement élémentaire)",
          "en": "3 Stacks (HP% & Crit Rate only for the elemental burst)"
        },
        "active": false,
        "stats": {
          "atk_": [
            0.4,
            0.1
          ],
          "critRate_": [
            0.28,
            0.07
          ]
        }
      }
    ]
  },
  "SkyriderGreatsword": {
    "selectMode": "cumulative",
    "buffs": [
      {
        "label": {
          "fr": "Si une 1ère attaque normale ou chargée touche un ennemi (ATQ%)",
          "en": "If a normal or charged attack hits an enemy 1 time (ATK%)"
        },
        "stats": {
          "atk_": [
            0.06,
            0.01
          ]
        }
      },
      {
        "label": {
          "fr": "Si une 2ème attaque normale ou chargée touche un ennemi (ATQ%)",
          "en": "If a normal or charged attack hits an enemy 2 times (ATK%)"
        },
        "stats": {
          "atk_": [
            0.06,
            0.01
          ]
        }
      },
      {
        "label": {
          "fr": "Si une 3ème attaque normale ou chargée touche un ennemi (ATQ%)",
          "en": "If a normal or charged attack hits an enemy 3 times (ATK%)"
        },
        "stats": {
          "atk_": [
            0.06,
            0.01
          ]
        }
      },
      {
        "label": {
          "fr": "Si une 4ème attaque normale ou chargée touche un ennemi (ATQ%)",
          "en": "If a normal or charged attack hits an enemy 4 times (ATK%)"
        },
        "stats": {
          "atk_": [
            0.06,
            0.01
          ]
        }
      }
    ]
  },
  "SkyriderSword": {
    "buffs": [
      {
        "label": {
          "fr": "Si un déchaînement élémentaire est utilisé (ATQ%)",
          "en": "If an elemental burst is used (ATK%)"
        },
        "stats": {
          "atk_": [
            0.12,
            0.03
          ]
        }
      }
    ]
  },
  "SnareHook": {
    "selectMode": "exclusive",
    "buffs": [
      {
        "label": {
          "fr": "Si une réaction élémentaire est déclenchée et que l'équipe est sous le signe Lueur Naissante (Maîtrise élémentaire)",
          "en": "If an elemental reaction is triggered and the party's Moonsign is Nascent Gleam (EM)"
        },
        "stats": {
          "eleMas": [
            60,
            15
          ]
        }
      },
      {
        "label": {
          "fr": "Si une réaction élémentaire est déclenchée et que l'équipe est sous le signe Lueur Ascendante (Maîtrise élémentaire)",
          "en": "If an elemental reaction is triggered and the party's Moonsign is Ascendant Gleam (EM)"
        },
        "stats": {
          "eleMas": [
            120,
            30
          ]
        }
      }
    ]
  },
  "SongOfBrokenPines": {
    "buffs": [
      {
        "label": {
          "fr": "Si 4 attaques normales ou chargées touchent un ennemi (ATQ%)",
          "en": "If 4 normal or charged attacks hit an enemy (ATK%)"
        },
        "stats": {
          "atk_": [
            0.2,
            0.05
          ]
        }
      }
    ]
  },
  "SplendorOfTranquilWaters": {
    "selectMode": "exclusive",
    "buffs": [
      {
        "label": {
          "fr": "Si des alliés subissent une modification de PV une 1ère fois (PV%)",
          "en": "If allies' HP increases or decreases for the 1st time (HP%)"
        },
        "stats": {
          "hp_": [
            0.14,
            0.035
          ]
        }
      },
      {
        "label": {
          "fr": "Si des alliés subissent une modification de PV une 2ème fois (PV%)",
          "en": "If allies' HP increases or decreases for the 2nd time (HP%)"
        },
        "stats": {
          "hp_": [
            0.28,
            0.07
          ]
        }
      }
    ]
  },
  "StaffOfHoma": {
    "buffs": [
      {
        "label": {
          "fr": "Si les PV sont inférieurs à 50% (ATQ en fonction des PV%)",
          "en": "If the wielder's HP is less than 50% (ATK based on HP%)"
        },
        "stats": {
          "atk_bonus_scaling": {
            "source": "hp",
            "percent": [
              0.01,
              0.002
            ]
          }
        }
      }
    ]
  },
  "StaffOfTheScarletSands": {
    "selectMode": "exclusive",
    "buffs": [
      {
        "label": {
          "fr": "1 Stack (ATQ en fonction de la Maîtrise élémentaire)",
          "en": "1 Stack (ATK based on EM)"
        },
        "stats": {
          "atk_bonus_scaling": {
            "source": "eleMas",
            "percent": [
              0.28,
              0.07
            ]
          }
        }
      },
      {
        "label": {
          "fr": "2 Stacks (ATQ en fonction de la Maîtrise élémentaire)",
          "en": "2 Stacks (ATK based on EM)"
        },
        "stats": {
          "atk_bonus_scaling": {
            "source": "eleMas",
            "percent": [
              0.56,
              0.14
            ]
          }
        }
      },
      {
        "label": {
          "fr": "3 Stacks (ATQ en fonction de la Maîtrise élémentaire)",
          "en": "3 Stacks (ATK based on EM)"
        },
        "stats": {
          "atk_bonus_scaling": {
            "source": "eleMas",
            "percent": [
              0.84,
              0.21
            ]
          }
        }
      }
    ]
  },
  "SummitShaper": {
    "selectMode": "cumulative",
    "buffs": [
      {
        "label": {
          "fr": "Si une 1ère attaque touche un ennemi (ATQ%)",
          "en": "If a 1st attack hits an enemy (ATK%)"
        },
        "stats": {
          "atk_": [
            0.04,
            0.01
          ]
        }
      },
      {
        "label": {
          "fr": "Si une 2ème attaque touche un ennemi (ATQ%)",
          "en": "If a 2nd attack hits an enemy (ATK%)"
        },
        "stats": {
          "atk_": [
            0.04,
            0.01
          ]
        }
      },
      {
        "label": {
          "fr": "Si une 3ème attaque touche un ennemi (ATQ%)",
          "en": "If a 3rd attack hits enemy (ATK%)"
        },
        "stats": {
          "atk_": [
            0.04,
            0.01
          ]
        }
      },
      {
        "label": {
          "fr": "Si une 4ème attaque touche un ennemi (ATQ%)",
          "en": "If a 4th attack hits an enemy (ATK%)"
        },
        "stats": {
          "atk_": [
            0.04,
            0.01
          ]
        }
      },
      {
        "label": {
          "fr": "Si une 5ème attaque touche un ennemi (ATQ%)",
          "en": "If a 5th attack hits an enemy (ATK%)"
        },
        "stats": {
          "atk_": [
            0.04,
            0.01
          ]
        }
      }
    ]
  },
  "SunnyMorningSleepIn": {
    "buffs": [
      {
        "label": {
          "fr": "Si une réaction de Dispersion est déclenchée (Maîtrise élémentaire)",
          "en": "If a Swirl elemental reaction is triggered (EM)"
        },
        "stats": {
          "eleMas": [
            120,
            30
          ]
        }
      },
      {
        "label": {
          "fr": "Si une compétence élémentaire est utilisée (Maîtrise élémentaire)",
          "en": "If an elemental skill is used (EM)"
        },
        "stats": {
          "eleMas": [
            96,
            24
          ]
        }
      },
      {
        "label": {
          "fr": "Si un déchaînement élémentaire est utilisé (Maîtrise élémentaire)",
          "en": "If an elemental burst is used (EM)"
        },
        "stats": {
          "eleMas": [
            32,
            8
          ]
        }
      }
    ]
  },
  "SymphonistOfScents": {
    "buffs": [
      {
        "label": {
          "fr": "Si le porteur est hors du terrain (ATQ%)",
          "en": "If the wielder is off-field (ATK%)"
        },
        "stats": {
          "atk_": [
            0.12,
            0.03
          ]
        }
      },
      {
        "label": {
          "fr": "Si le porteur soigne un allié (ATQ%)",
          "en": "If the wielder heals an ally (ATK%)"
        },
        "stats": {
          "atk_": [
            0.32,
            0.08
          ]
        }
      }
    ]
  },
  "TalkingStick": {
    "selectMode": "cumulative",
    "buffs": [
      {
        "label": {
          "fr": "Si le porteur est affecté par l'élément Pyro (ATQ%)",
          "en": "If the wielder is affected by Pyro (ATK%)"
        },
        "stats": {
          "atk_": [
            0.16,
            0.04
          ]
        }
      },
      {
        "label": {
          "fr": "Si le porteur est affecté par l'élément Hydro/Cryo/Électro/Dendro (DGTs Élémentaires)",
          "en": "If the wearer is affected by Hydro/Cryo/Electro/Dendro (Elemental DMG)"
        },
        "stats": {
          "pyro_dmg_": [
            0.12,
            0.03
          ],
          "hydro_dmg_": [
            0.12,
            0.03
          ],
          "cryo_dmg_": [
            0.12,
            0.03
          ],
          "electro_dmg_": [
            0.12,
            0.03
          ],
          "anemo_dmg_": [
            0.12,
            0.03
          ],
          "geo_dmg_": [
            0.12,
            0.03
          ],
          "dendro_dmg_": [
            0.12,
            0.03
          ]
        }
      }
    ]
  },
  "TamayurateiNoOhanashi": {
    "buffs": [
      {
        "label": {
          "fr": "Si une compétence élémentaire est utilisée (ATQ%)",
          "en": "If an elemental skill is used (ATK%)"
        },
        "stats": {
          "atk_": [
            0.2,
            0.05
          ]
        }
      }
    ]
  },
  "TheCatch": {
    "buffs": [
      {
        "label": {
          "fr": "Bonus de Taux CRIT (Uniquement pour le déchaînement élémentaire)",
          "en": "Crit Rate bonus (only for the elemental burst)"
        },
        "active": false,
        "stats": {
          "critRate_": [
            0.06,
            0.015
          ]
        }
      }
    ]
  },
  "TheDockhandsAssistant": {
    "selectMode": "cumulative",
    "buffs": [
      {
        "label": {
          "fr": "Si des soins sont reçus ou envoyés une 1ère fois (Maîtrise élémentaire)",
          "en": "If the character heals or is healed a 1st time (EM)"
        },
        "stats": {
          "eleMas": [
            40,
            10
          ]
        }
      },
      {
        "label": {
          "fr": "Si des soins sont reçus ou envoyés une 2ème fois (Maîtrise élémentaire)",
          "en": "If the character heals or is healed a 2nd time (EM)"
        },
        "stats": {
          "eleMas": [
            40,
            10
          ]
        }
      },
      {
        "label": {
          "fr": "Si des soins sont reçus ou envoyés une 3ème fois (Maîtrise élémentaire)",
          "en": "If the character heals or is healed a 3rd time (EM)"
        },
        "stats": {
          "eleMas": [
            40,
            10
          ]
        }
      }
    ]
  },
  "TheFirstGreatMagic": {
    "selectMode": "exclusive",
    "buffs": [
      {
        "label": {
          "fr": "1 Allié du même élément que le porteur (ATQ%)",
          "en": "1 ally of the same element as the wearer (ATK%)"
        },
        "stats": {
          "atk_": [
            0.16,
            0.04
          ]
        }
      },
      {
        "label": {
          "fr": "2 Alliés du même élément que le porteur (ATQ%)",
          "en": "2 allies of the same element as the wearer (ATK%)"
        },
        "stats": {
          "atk_": [
            0.32,
            0.08
          ]
        }
      },
      {
        "label": {
          "fr": "3 Alliés du même élément que le porteur (ATQ%)",
          "en": "3 allies of the same element as the wearer (ATK%)"
        },
        "stats": {
          "atk_": [
            0.48,
            0.12
          ]
        }
      }
    ]
  },
  "TheUnforged": {
    "selectMode": "cumulative",
    "buffs": [
      {
        "label": {
          "fr": "Si une 1ère attaque touche un ennemi (ATQ%)",
          "en": "If a 1st attack hits an enemy (ATK%)"
        },
        "stats": {
          "atk_": [
            0.04,
            0.01
          ]
        }
      },
      {
        "label": {
          "fr": "Si une 2ème attaque touche un ennemi (ATQ%)",
          "en": "If a 2nd attack hits an enemy (ATK%)"
        },
        "stats": {
          "atk_": [
            0.04,
            0.01
          ]
        }
      },
      {
        "label": {
          "fr": "Si une 3ème attaque touche un ennemi (ATQ%)",
          "en": "If a 3rd attack hits an enemy (ATK%)"
        },
        "stats": {
          "atk_": [
            0.04,
            0.01
          ]
        }
      },
      {
        "label": {
          "fr": "Si une 4ème attaque touche un ennemi (ATQ%)",
          "en": "If a 4th attack hits an enemy (ATK%)"
        },
        "stats": {
          "atk_": [
            0.04,
            0.01
          ]
        }
      },
      {
        "label": {
          "fr": "Si une 5ème attaque touche un ennemi (ATQ%)",
          "en": "If a 5th attack hits an enemy (ATK%)"
        },
        "stats": {
          "atk_": [
            0.04,
            0.01
          ]
        }
      }
    ]
  },
  "TheWidsith": {
    "selectMode": "exclusive",
    "buffs": [
      {
        "label": {
          "fr": "Récital (ATQ%)",
          "en": "Recitative (ATK%)"
        },
        "stats": {
          "atk_": [
            0.6,
            0.15
          ]
        }
      },
      {
        "label": {
          "fr": "Aria (DGTs Élémentaires)",
          "en": "Aria (Elemental DMG)"
        },
        "stats": {
          "pyro_dmg_": [
            0.48,
            0.12
          ],
          "hydro_dmg_": [
            0.48,
            0.12
          ],
          "cryo_dmg_": [
            0.48,
            0.12
          ],
          "electro_dmg_": [
            0.48,
            0.12
          ],
          "anemo_dmg_": [
            0.48,
            0.12
          ],
          "geo_dmg_": [
            0.48,
            0.12
          ],
          "dendro_dmg_": [
            0.48,
            0.12
          ]
        }
      },
      {
        "label": {
          "fr": "Interlude (Maîtrise élémentaire)",
          "en": "Interlude (EM)"
        },
        "stats": {
          "eleMas": [
            240,
            60
          ]
        }
      }
    ]
  },
  "TidalShadow": {
    "buffs": [
      {
        "label": {
          "fr": "Si le porteur reçoit des soins (ATQ%)",
          "en": "If the wielder is healed (ATK%)"
        },
        "stats": {
          "atk_": [
            0.24,
            0.06
          ]
        }
      }
    ]
  },
  "TwinNephrite": {
    "buffs": [
      {
        "label": {
          "fr": "Si un ennemi a été vaincu (ATQ%)",
          "en": "If an enemy is defeated (ATK%)"
        },
        "stats": {
          "atk_": [
            0.12,
            0.02
          ]
        }
      }
    ]
  },
  "UrakuMisugiri": {
    "buffs": [
      {
        "label": {
          "fr": "Si le personnage actif inflige des dégâts Géo (DÉF%)",
          "en": "If the active character deals Geo damage (DEF%)"
        },
        "stats": {
          "def_": [
            0.2,
            0.05
          ]
        }
      }
    ]
  },
  "VividNotions": {
    "buffs": [
      {
        "label": {
          "fr": "Si une attaque plongée est utilisée (DGT CRIT uniquement pour les attaques plongées)",
          "en": "If a plunging attack is used (Crit DMG only for plunging attacks)"
        },
        "stats": {
          "critDMG_": [
            0.28,
            0.07
          ]
        }
      },
      {
        "label": {
          "fr": "Si une compétence ou un déchaînement élémentaire est utilisé (DGT CRIT uniquement pour les attaques plongées)",
          "en": "If an elemental skill or burst is used (Crit DMG only for plunging attacks)"
        },
        "stats": {
          "critDMG_": [
            0.4,
            0.1
          ]
        }
      }
    ]
  },
  "VortexVanquisher": {
    "selectMode": "cumulative",
    "buffs": [
      {
        "label": {
          "fr": "Si une 1ère attaque touche un ennemi (ATQ%)",
          "en": "On 1st attack hitting an enemy (ATK%)"
        },
        "stats": {
          "atk_": [
            0.04,
            0.01
          ]
        }
      },
      {
        "label": {
          "fr": "Si une 2ème attaque touche un ennemi (ATQ%)",
          "en": "On 2nd attack hitting an enemy (ATK%)"
        },
        "stats": {
          "atk_": [
            0.04,
            0.01
          ]
        }
      },
      {
        "label": {
          "fr": "Si une 3ème attaque touche un ennemi (ATQ%)",
          "en": "On 3rd attack hitting an enemy (ATK%)"
        },
        "stats": {
          "atk_": [
            0.04,
            0.01
          ]
        }
      },
      {
        "label": {
          "fr": "Si une 4ème attaque touche un ennemi (ATQ%)",
          "en": "On 4th attack hitting an enemy (ATK%)"
        },
        "stats": {
          "atk_": [
            0.04,
            0.01
          ]
        }
      },
      {
        "label": {
          "fr": "Si une 5ème attaque touche un ennemi (ATQ%)",
          "en": "On 5th attack hitting an enemy (ATK%)"
        },
        "stats": {
          "atk_": [
            0.04,
            0.01
          ]
        }
      }
    ]
  },
  "WanderingEvenstar": {
    "buffs": [
      {
        "label": {
          "fr": "Bonus selon la Maîtrise élémentaire (ATQ)",
          "en": "Buff based on EM (ATK)"
        },
        "stats": {
          "atk_bonus_scaling": {
            "source": "eleMas",
            "percent": [
              0.24,
              0.06
            ]
          }
        }
      }
    ]
  },
  "WaveridingWhirl": {
    "selectMode": "cumulative",
    "buffs": [
      {
        "label": {
          "fr": "Si une compétence élémentaire est utilisée (PV%)",
          "en": "If an elemental skill is used (HP%)"
        },
        "stats": {
          "hp_": [
            0.2,
            0.05
          ]
        }
      },
      {
        "label": {
          "fr": "S'il y a 1 personnage Hydro dans l'équipe (PV%)",
          "en": "If there is 1 Hydro character in the party (HP%)"
        },
        "stats": {
          "hp_": [
            0.12,
            0.03
          ]
        }
      },
      {
        "label": {
          "fr": "S'il y a 2 personnages Hydro dans l'équipe (PV%)",
          "en": "If there are 2 Hydro characters in the party (HP%)"
        },
        "stats": {
          "hp_": [
            0.12,
            0.03
          ]
        }
      }
    ]
  },
  "Whiteblind": {
    "selectMode": "cumulative",
    "buffs": [
      {
        "label": {
          "fr": "Si une attaque normale ou chargée touche un ennemi une 1ère fois (ATQ% et DÉF%)",
          "en": "If a normal or charged attack hits an enemy a 1st time (ATK% & DEF%)"
        },
        "stats": {
          "atk_": [
            0.06,
            0.015
          ],
          "def_": [
            0.06,
            0.015
          ]
        }
      },
      {
        "label": {
          "fr": "Si une attaque normale ou chargée touche un ennemi une 2ème fois (ATQ% et DÉF%)",
          "en": "If a normal or charged attack hits an enemy a 2nd time (ATK% & DEF%)"
        },
        "stats": {
          "atk_": [
            0.06,
            0.015
          ],
          "def_": [
            0.06,
            0.015
          ]
        }
      },
      {
        "label": {
          "fr": "Si une attaque normale ou chargée touche un ennemi une 3ème fois (ATQ% et DÉF%)",
          "en": "If a normal or charged attack hits an enemy a 3rd time (ATK% & DEF%)"
        },
        "stats": {
          "atk_": [
            0.06,
            0.015
          ],
          "def_": [
            0.06,
            0.015
          ]
        }
      },
      {
        "label": {
          "fr": "Si une attaque normale ou chargée touche un ennemi une 4ème fois (ATQ% et DÉF%)",
          "en": "If a normal or charged attack hits an enemy a 4th time (ATK% & DEF%)"
        },
        "stats": {
          "atk_": [
            0.06,
            0.015
          ],
          "def_": [
            0.06,
            0.015
          ]
        }
      }
    ]
  },
  "WindblumeOde": {
    "buffs": [
      {
        "label": {
          "fr": "Si une compétence élémentaire est utilisée (ATQ%)",
          "en": "If an elemental skill is used (ATK%)"
        },
        "stats": {
          "atk_": [
            0.16,
            0.04
          ]
        }
      }
    ]
  },
  "WineAndSong": {
    "buffs": [
      {
        "label": {
          "fr": "Si le personnage sprint après avoir utilisé une compétence élémentaire (ATQ%)",
          "en": "If the character sprints after using an elemental skill (ATK%)"
        },
        "stats": {
          "atk_": [
            0.2,
            0.05
          ]
        }
      }
    ]
  },
  "WolfFang": {
    "selectMode": "exclusive",
    "buffs": [
      {
        "label": {
          "fr": "1 stack de Taux CRIT (ne s'applique qu'aux compétences et déchaînements)",
          "en": "1 Crit Rate stack (only for skills and bursts)"
        },
        "active": false,
        "stats": {
          "critRate_": [
            0.02,
            0.005
          ]
        }
      },
      {
        "label": {
          "fr": "2 stacks de Taux CRIT (ne s'applique qu'aux compétences et déchaînements)",
          "en": "2 Crit Rate stacks (only for skills and bursts)"
        },
        "active": false,
        "stats": {
          "critRate_": [
            0.04,
            0.01
          ]
        }
      },
      {
        "label": {
          "fr": "3 stacks de Taux CRIT (ne s'applique qu'aux compétences et déchaînements)",
          "en": "3 Crit Rate stacks (only for skills and bursts)"
        },
        "active": false,
        "stats": {
          "critRate_": [
            0.06,
            0.015
          ]
        }
      },
      {
        "label": {
          "fr": "4 stacks de Taux CRIT (ne s'applique qu'aux compétences et déchaînements)",
          "en": "4 Crit Rate stacks (only for skills and bursts)"
        },
        "active": false,
        "stats": {
          "critRate_": [
            0.08,
            0.02
          ]
        }
      }
    ]
  },
  "WolfsGravestone": {
    "buffs": [
      {
        "label": {
          "fr": "Si une attaque touche un ennemi ayant moins de 30% de ses PV (ATQ%)",
          "en": "If an attack hits an enemy whose HP is below 30% (ATK%)"
        },
        "stats": {
          "atk_": [
            0.4,
            0.1
          ]
        }
      }
    ]
  },
  "XiphosMoonlight": {
    "buffs": [
      {
        "label": {
          "fr": "Bonus selon la Maîtrise élémentaire (Recharge d'énergie)",
          "en": "Bonus based on EM (ER)"
        },
        "stats": {
          "enerRech_bonus_scaling": {
            "source": "eleMas",
            "percent": [
              0.036,
              0.009
            ]
          }
        }
      }
    ]
  }
};

window.SET_PASSIVES     = {
  "ADayCarvedFromRisingWinds": {
    "4": [
      {
        "label": {
          "fr": "Si des ennemis sont touchés (25% ATQ)",
          "en": "If ennemies are hit (25% ATK)"
        },
        "stats": {
          "atk_": 0.25
        }
      },
      {
        "label": {
          "fr": "Si le personnage a terminé son devoir de la sorcière (20% Taux CRIT)",
          "en": "If the character has completed Witch's Homework (20% Crit Rate)"
        },
        "stats": {
          "critRate_": 0.2
        }
      }
    ]
  },
  "ArchaicPetra": {
    "4": [
      {
        "label": {
          "fr": "Cristal Pyro ramassé (35% Bonus de Dgt Pyro)",
          "en": "Pyro shard picked up (35% Pyro damage bonus)"
        },
        "stats": {
          "pyro_dmg_": 0.35
        }
      },
      {
        "label": {
          "fr": "Cristal Hydro ramassé (35% Bonus de DGT Hydro)",
          "en": "Hydro shard picked up (35% Hydro DMG bonus)"
        },
        "stats": {
          "hydro_dmg_": 0.35
        }
      },
      {
        "label": {
          "fr": "Cristal Cryo ramassé (35% Bonus de DGT Cryo)",
          "en": "Cryo shard picked up (35% Cryo DMG bonus)"
        },
        "stats": {
          "cryo_dmg_": 0.35
        }
      },
      {
        "label": {
          "fr": "Cristal Électro ramassé (35% Bonus de DGT Électro)",
          "en": "Electro shard picked up (35% Electro DMG bonus)"
        },
        "stats": {
          "electro_dmg_": 0.35
        }
      }
    ],
    "selectMode": "exclusive"
  },
  "Berserker": {
    "4": [
      {
        "label": {
          "fr": "Si les PV sont inférieurs à 70% (24% Taux CRIT)",
          "en": "If HP are below 70% (24% Crit Rate)"
        },
        "stats": {
          "critRate_": 0.24
        }
      }
    ]
  },
  "BlizzardStrayer": {
    "4": [
      {
        "label": {
          "fr": "Si l'ennemi est affecté par Cryo (20% Taux CRIT)",
          "en": "If the enemy is affected by Cryo (20% Crit Rate)"
        },
        "stats": {
          "critRate_": 0.2
        }
      },
      {
        "label": {
          "fr": "Si l'ennemi est gelé (20% Taux CRIT)",
          "en": "If the enemy is frozen (20% Crit Rate)"
        },
        "stats": {
          "critRate_": 0.2
        }
      }
    ]
  },
  "CelestialGift": {
    "4": [
      {
        "label": {
          "fr": "Si le personnage a terminé son devoir de la sorcière et a utilisé une compétence élémentaire (20% DGT Élémentaires)",
          "en": "If the character has completed Witch's Homework and has used an elemental skill (20% Elemental DMG)"
        },
        "stats": {
          "elemental_dmg_": 0.2
        }
      },
      {
        "label": {
          "fr": "Si l'équipe compte deux personnages Hexerei (40% DGT Élémentaires)",
          "en": "If two Hexerei characters are in the team (40% Elemental DMG)"
        },
        "stats": {
          "elemental_dmg_": 0.4
        }
      }
    ],
    "selectMode": "exclusive"
  },
  "CrimsonWitchOfFlames": {
    "4": [
      {
        "label": {
          "fr": "Si une 1ère compétence élémentaire est utilisée (7.5% Bonus de DGT Pyro)",
          "en": "If 1 elemental skill is used (7.5% Pyro DMG Bonus)"
        },
        "stats": {
          "pyro_dmg_": 0.075
        }
      },
      {
        "label": {
          "fr": "Si une 2ème compétence élémentaire est utilisée (15% Bonus de DGT Pyro)",
          "en": "If 2 elemental skills are used (15% Pyro DMG Bonus)"
        },
        "stats": {
          "pyro_dmg_": 0.075
        }
      },
      {
        "label": {
          "fr": "Si une 3ème compétence élémentaire est utilisée (22.5% Bonus de DGT Pyro)",
          "en": "If 3 elemental skills are used (22.5% Pyro DMG Bonus)"
        },
        "stats": {
          "pyro_dmg_": 0.075
        }
      }
    ],
    "selectMode": "cumulative"
  },
  "DisenchantmentInDeepShadow": {
    "4": [
      {
        "label": {
          "fr": "Si l'adversaire est affecté par Supraconduction (16% Taux Critique uniquement sur cette attaque)",
          "en": "If the enemy is affected by Superconduct (16% Crit Rate on this attack only)"
        },
        "stats": {
          "critRate_": 0.16
        },
        "active": false
      }
    ]
  },
  "GildedDreams": {
    "4": [
      {
        "label": {
          "fr": "Si 3 alliés sont du même élément que le porteur (42% ATQ)",
          "en": "If 3 allies are of the same element as the wearer (42% ATK)"
        },
        "active": false,
        "stats": {
          "atk_": 0.42
        }
      },
      {
        "label": {
          "fr": "Si 2 alliés sont du même élément et 1 d'un élément différent (28% ATQ, 50 EM)",
          "en": "If 2 allies are of the same element and 1 of a different element (28% ATK, 50 EM)"
        },
        "active": false,
        "stats": {
          "atk_": 0.28,
          "eleMas": 50
        }
      },
      {
        "label": {
          "fr": "Si 1 allié est du même élément et 2 d'un élément différent (14% ATQ, 100 EM)",
          "en": "If 1 ally is of the same element and 2 of a different element (14% ATK, 100 EM)"
        },
        "active": true,
        "stats": {
          "atk_": 0.14,
          "eleMas": 100
        }
      },
      {
        "label": {
          "fr": "Si 3 alliés sont d'un élément différent du porteur (150 EM)",
          "en": "If 3 allies are of a different element from the wearer (150 EM)"
        },
        "active": false,
        "stats": {
          "eleMas": 150
        }
      }
    ],
    "selectMode": "exclusive"
  },
  "HuskOfOpulentDreams": {
    "4": [
      {
        "label": {
          "fr": "Quand une 1ère attaque Géo touche ou qu'1s est passée non-déployé (6% DÉF et 6% Bonus de DGT Géo)",
          "en": "When 1 Geo attack hits or 1 second has passed while off-field (6% DEF & 6% Geo DMG Bonus)"
        },
        "stats": {
          "def_": 0.06,
          "geo_dmg_": 0.06
        }
      },
      {
        "label": {
          "fr": "Quand une 2ème attaque Géo touche ou qu'1s de plus est passée non-déployé (12% DÉF et 12% Bonus de DGT Géo)",
          "en": "When 2 Geo attacks hit or 2 seconds have passed while off-field (12% DEF & 12% Geo DMG Bonus)"
        },
        "stats": {
          "def_": 0.06,
          "geo_dmg_": 0.06
        }
      },
      {
        "label": {
          "fr": "Quand une 3ème attaque Géo touche ou qu'1s de plus est passée non-déployé (18% DÉF et 18% Bonus de DGT Géo)",
          "en": "When 3 Geo attacks hit or 3 seconds have passed while off-field (18% DEF & 18% Geo DMG Bonus)"
        },
        "stats": {
          "def_": 0.06,
          "geo_dmg_": 0.06
        }
      },
      {
        "label": {
          "fr": "Quand une 4ème attaque Géo touche ou qu'1s de plus est passée non-déployé (24% DÉF et 24% Bonus de DGT Géo)",
          "en": "When 4 Geo attacks hit or 4 seconds have passed while off-field (24% DEF & 24% Geo DMG Bonus)"
        },
        "stats": {
          "def_": 0.06,
          "geo_dmg_": 0.06
        }
      }
    ],
    "selectMode": "cumulative"
  },
  "Instructor": {
    "4": [
      {
        "label": {
          "fr": "Si une réaction élémentaire est déclenchée (120 Maîtrise élémentaire)",
          "en": "If an elemental reaction is triggered (120 EM)"
        },
        "stats": {
          "eleMas": 120
        }
      }
    ]
  },
  "MarechausseeHunter": {
    "4": [
      {
        "label": {
          "fr": "Si les PV diminuent ou augmentent une 1ère fois (12% Taux CRIT)",
          "en": "If HP decreases or increases 1 time (12% Crit Rate)"
        },
        "stats": {
          "critRate_": 0.12
        }
      },
      {
        "label": {
          "fr": "Si les PV diminuent une 2ème fois (24% Taux CRIT)",
          "en": "If HP decreases or increases 2 times (24% Crit Rate)"
        },
        "stats": {
          "critRate_": 0.12
        }
      },
      {
        "label": {
          "fr": "Si les PV diminuent une 3ème fois (36% Taux CRIT)",
          "en": "If HP decreases or increases 3 times (36% Crit Rate)"
        },
        "stats": {
          "critRate_": 0.12
        }
      }
    ],
    "selectMode": "cumulative"
  },
  "NightOfTheSkysUnveiling": {
    "4": [
      {
        "label": {
          "fr": "Si une réaction Sélène est déclenchée et que l'équipe est sous le signe Lueur Naissante (15% Taux CRIT)",
          "en": "If a Lunar reaction is triggered and the team's Moonsign is Nascent Gleam (15% Crit Rate)"
        },
        "stats": {
          "critRate_": 0.15
        }
      },
      {
        "label": {
          "fr": "Si une réaction Sélène est déclenchée et que l'équipe est sous le signe Lueur Ascendante (30% Taux CRIT)",
          "en": "If a Lunar reaction is triggered and the team's Moonsign is Ascendant Gleam (30% Crit Rate)"
        },
        "stats": {
          "critRate_": 0.3
        }
      }
    ],
    "selectMode": "exclusive"
  },
  "NighttimeWhispersInTheEchoingWoods": {
    "4": [
      {
        "label": {
          "fr": "Si une compétence élémentaire est utilisée (20% Bonus de DGT Géo)",
          "en": "If an elemental skill is used (20% Geo DMG Bonus)"
        },
        "stats": {
          "geo_dmg_": 0.2
        }
      },
      {
        "label": {
          "fr": "Si le personnage est sous un bouclier de Cristallisation (50% Bonus de DGT Géo)",
          "en": "If the character is under a shield granted by Crystallize (50% Geo DMG Bonus)"
        },
        "stats": {
          "geo_dmg_": 0.3
        }
      }
    ]
  },
  "NoblesseOblige": {
    "4": [
      {
        "label": {
          "fr": "Si un déchaînement élémentaire est utilisé (20% ATQ)",
          "en": "If an elemental burst is used (20% ATK)"
        },
        "stats": {
          "atk_": 0.2
        }
      }
    ]
  },
  "NymphsDream": {
    "4": [
      {
        "label": {
          "fr": "Si une 1ère attaque de tout type touche (7% ATQ et 4% Bonus de DGT Hydro)",
          "en": "If 1 attack hits (7% ATK & 4% Hydro DMG Bonus)"
        },
        "stats": {
          "atk_": 0.07,
          "hydro_dmg_": 0.04
        }
      },
      {
        "label": {
          "fr": "Si une 2ème attaque de tout type touche (16% ATQ et 9% Bonus de DGT Hydro)",
          "en": "If 2 attacks hit (16% ATK & 9% Hydro DMG Bonus)"
        },
        "stats": {
          "atk_": 0.09,
          "hydro_dmg_": 0.05
        }
      },
      {
        "label": {
          "fr": "Si une 3ème attaque de tout type touche (25% ATQ et 15% Bonus de DGT Hydro)",
          "en": "If 3 attacks hit (25% ATK & 15% Hydro DMG Bonus)"
        },
        "stats": {
          "atk_": 0.09,
          "hydro_dmg_": 0.06
        }
      }
    ],
    "selectMode": "cumulative"
  },
  "ObsidianCodex": {
    "4": [
      {
        "label": {
          "fr": "Si le personnage consomme des points Noctâme (40% Taux CRIT)",
          "en": "If the character consumes Nightsoul points (40% Crit Rate)"
        },
        "stats": {
          "critRate_": 0.4
        }
      }
    ]
  },
  "PaleFlame": {
    "4": [
      {
        "label": {
          "fr": "Si une 1ère compétence élémentaire touche un ennemi (9% ATK)",
          "en": "If 1 elemental skill hits (9% ATK)"
        },
        "stats": {
          "atk_": 0.09
        }
      },
      {
        "label": {
          "fr": "Si une 2ème compétence élémentaire touche un ennemi (18% ATK et 25% Bonus de DGT Physique)",
          "en": "If 2 elemental skills hit (18% ATK & 25% Physical DMG Bonus)"
        },
        "stats": {
          "atk_": 0.09,
          "physical_dmg_": 0.25
        }
      }
    ],
    "selectMode": "cumulative"
  },
  "ScrollOfTheHeroOfCinderCity": {
    "4": [
      {
        "label": {
          "fr": "Si une réaction élémentaire est déclenchée (12% Bonus de DGT Élémentaire)",
          "en": "If an elemental reaction is triggered (12% Elemental DMG Bonus)"
        },
        "stats": {
          "pyro_dmg_": 0.12,
          "hydro_dmg_": 0.12,
          "cryo_dmg_": 0.12,
          "electro_dmg_": 0.12,
          "dendro_dmg_": 0.12,
          "anemo_dmg_": 0.12,
          "geo_dmg_": 0.12
        }
      },
      {
        "label": {
          "fr": "Si le personnage est sous une Bénédiction Noctâme (40% Bonus de DGT Élémentaire)",
          "en": "If the character is in a Nightsoul Blessing state (40M Elemental DMG Bonus)"
        },
        "stats": {
          "pyro_dmg_": 0.28,
          "hydro_dmg_": 0.28,
          "cryo_dmg_": 0.28,
          "electro_dmg_": 0.28,
          "dendro_dmg_": 0.28,
          "anemo_dmg_": 0.28,
          "geo_dmg_": 0.28
        }
      }
    ],
    "selectMode": "cumulative"
  },
  "SilkenMoonsSerenade": {
    "4": [
      {
        "label": {
          "fr": "Si des dégâts élémentaires sont infligés et que l'équipe est sous le signe Lueur Naissante (60 Maîtrise élémentaire)",
          "en": "If elemental damage is dealt and the team's Moonsign is Nascent Gleam (60 EM)"
        },
        "stats": {
          "eleMas": 60
        }
      },
      {
        "label": {
          "fr": "Si des dégâts élémentaires sont infligés et que l'équipe est sous le signe Lueur Ascendante (120 Maîtrise élémentaire)",
          "en": "If elemental damage is dealt and the team's Moonsign is Ascendant Gleam (120 EM)"
        },
        "stats": {
          "eleMas": 120
        }
      }
    ],
    "selectMode": "exclusive"
  },
  "TenacityOfTheMillelith": {
    "4": [
      {
        "label": {
          "fr": "Si une compétence élémentaire touche un ennemi (20% ATQ)",
          "en": "If an elemental skill hits (20% ATK)"
        },
        "stats": {
          "atk_": 0.2
        }
      }
    ]
  },
  "VermillionHereafter": {
    "4": [
      {
        "label": {
          "fr": "Si un déchaînement élémentaire est utilisé (8% ATQ)",
          "en": "If an elemental burst is used (8% ATK)"
        },
        "stats": {
          "atk_": 0.08
        }
      },
      {
        "label": {
          "fr": "Si des PV sont perdus une 1ère fois (10% ATQ)",
          "en": "If HPs are lost 1 time (10% ATK)"
        },
        "stats": {
          "atk_": 0.1
        }
      },
      {
        "label": {
          "fr": "Si des PV sont perdus une 2ème fois (20% ATQ)",
          "en": "If HPs are lost 2 times (20% ATK)"
        },
        "stats": {
          "atk_": 0.1
        }
      },
      {
        "label": {
          "fr": "Si des PV sont perdus une 3ème fois (30% ATQ)",
          "en": "If HPs are lost 3 times (30% ATK)"
        },
        "stats": {
          "atk_": 0.1
        }
      },
      {
        "label": {
          "fr": "Si des PV sont perdus une 4ème fois (40% ATQ)",
          "en": "If HPs are lost 4 times (40% ATK)"
        },
        "stats": {
          "atk_": 0.1
        }
      }
    ],
    "selectMode": "cumulative"
  }
};