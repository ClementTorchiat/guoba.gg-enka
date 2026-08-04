window.TEAMMATE_WEAPON_BUFFS = {
    "ThrillingTalesOfDragonSlayers": {
        label: { fr: "Contes : ATQ% à l'allié suivant", en: "Thrilling Tales: ATK% to next ally" },
        active: true,
        stats: { atk_: 0.48 }
    },
    "XiphosMoonlight": {
        label: { fr: "Xiphos : ER à l'équipe", en: "Xiphos: ER to team" },
        active: true,
        stats: { enerRech_: 0.108 }
    }
};

window.TEAMMATE_SET_BUFFS = {
    "Instructor": {
        label: { fr: "Instructeur : EM à l'équipe", en: "Instructor: EM to team" },
        active: true,
        stats: { eleMas: 120 }
    },
    "CelestialGift": {
        label: { fr: "Don céleste : DGTs élémentaires", en: "Celestial Gift: elemental DMG" },
        active: true,
        isDynamicElementBuff: true
    },
    "NoblesseOblige": {
        label: { fr: "Noblesse : ATQ% à l'équipe", en: "Noblesse: ATK% to team" },
        active: true,
        stats: { atk_: 0.20 }
    },
    "TenacityOfTheMillelith": {
        label: { fr: "Millelithe : ATQ% à l'équipe", en: "Millelith: ATK% to team" },
        active: true,
        stats: { atk_: 0.20 }
    },
    "ScrollOfTheHeroOfCinderCity": {
        label: { fr: "Parchemin : Bonus de DGT Élémentaire", en: "Scroll: Elemental DMG Bonus" },
        active: true,
        stats: { elemental_dmg_: 0.40 }
    },
    "SilkenMoonsSerenade": {
        label: { fr: "Sérénade : EM à l'équipe", en: "Serenade: EM to team" },
        active: true,
        stats: { eleMas: 120 }
    }
};

window.TEAMMATE_BUFFS = {
    "Fischl": {
        element: "electro",
        buffs: [
            {
                label: { fr: "Hexerei - Si Surcharge déclenchée (ATQ%)", en: "Hexerei - If Overload triggered (ATK%)" },
                active: false,
                stats: { atk_: 0.225 }
            },
            {
                label: { fr: "Hexerei - Si Électrocution ou Sélénocution déclenchée (EM)", en: "Hexerei - If Electro-charged or Lunar-charged (EM)" },
                active: false,
                stats: { eleMas: 90 }
            },
            {
                label: { fr: "Hexerei - C6 - Si Surcharge déclenchée (ATQ%)", en: "Hexerei - C6 - If Overload triggered (ATK%)" },
                active: false,
                cons: 6,
                stats: { atk_: 0.225 }
            },
            {
                label: { fr: "Hexerei - C6 - Si Électrocution ou Sélénocution déclenchée (EM)", en: "Hexerei - C6 - If Electro-charged or Lunar-charged (EM)" },
                active: false,
                cons: 6,
                stats: { eleMas: 90 }
            },
        ]
    },
    "Bennett": {
        element: "pyro",
        buffs: [
            {
                label: { fr: "Champ de gloire (ATQ)", en: "Fantastic Voyage (ATK)" },
                active: true,
                stats: { atk: 1203 }
            },
            {
                label: { fr: "C6 : Infusion Pyro (DGT Pyro)", en: "C6: Pyro Infusion (Pyro DMG)" },
                cons: 6,
                active: true,
                stats: { pyro_dmg_: 0.15 }
            }
        ]
    },
    "Xiangling": {
        element: "pyro",
        buffs: [
            {
                label: { fr: "Piment de Guoba (ATQ%)", en: "Guoba's pepper (ATK%)" },
                active: true,
                stats: { atk_: 0.10 }
            },
            {
                label: { fr: "C6 : Pyrotation condensée (DGT Pyro)", en: "C6: Condensed Pyronado (Pyro DMG)" },
                cons: 6,
                active: true,
                stats: { pyro_dmg_: 0.15 }
            }
        ]
    },
    "Alyosha": {
        element: "electro",
        buffs: [
            {
                label: { fr: "Précision du chasseur (ATQ%)", en: "Hunter's Precision (ATK%)" },
                active: true,
                stats: { atk_: 0.212 }
            },
            {
                label: { fr: "C3 : Précision du chasseur (ATQ%)", en: "C3: Hunter's Precision (ATK%)" },
                active: true,
                stats: { atk_: 0.038 }
            },
            {
                label: { fr: "C6 : 2ème Précision du chasseur (ATQ%, Maîtrise élémentaire)", en: "C6: 2nd Hunter's Precision (ATK%, EM)" },
                cons: 6,
                active: true,
                stats: { atk_: 0.25, eleMas: 100 }
            }
        ]
    },
    "Kazuha": {
        element: "anemo",
        buffs: [
            {
                label: { fr: "Haïku de la brise (DGT Élémentaires)", en: "Poetics of Fuubutsu (Elemental DMG)" },
                active: true,
                stats: { elemental_dmg_: 0.40 }
            }
        ]
    },
    "Albedo": {
        element: "geo",
        buffs: [
            {
                label: { fr: "Sagesse en bouteille (EM)", en: "Homuncular Nature (EM)" },
                active: true,
                stats: { eleMas: 125 }
            }
        ]
    },
    "Collei": {
        element: "dendro",
        buffs: [
            {
                label: { fr: "Don de la nature (EM)", en: "Gift of the Woods (EM)" },
                active: true,
                cons: 4,
                stats: { eleMas: 60 }
            }
        ]
    },
    "Gorou": {
        element: "geo",
        buffs: [
            {
                label: { fr: "Défense intégrale d'Inuzaka (DÉF, DGT Géo)", en: "Inuzaka All-Round Defense (DEF, Geo DMG)" },
                active: true,
                stats: { def: 438, geo_dmg_: 0.15 }
            },
            {
                label: { fr: "Nonchalance du vent et de la pluie (DÉF%)", en: "Heedless of the Wind and Weather (DEF%)" },
                active: true,
                stats: { def_: 0.25 }
            },
            {
                label: { fr: "C6 : Vaillance canine : Fidélité de la terre (uniquement les DGT Géo - DGT Crit)", en: "C6: Valiant Hound: Mountainous Fealty (only for Geo DMG - Crit DMG)" },
                active: true,
                cons: 6,
                stats: { critDMG_: 0.40 }
            },
        ]
    },
    "Aino": {
        element: "hydro",
        buffs: [
            {
                label: { fr: "C1 : Théorie de l'équilibre cendres–champs (EM)", en: "C1: The Theory of Ash—Field Equilibrium (EM)" },
                active: true,
                cons: 1,
                stats: { eleMas: 80 }
            },
        ]
    },
    "Diona": {
        element: "cryo",
        buffs: [
            {
                label: { fr: "C6 : Dernière tournée (EM)", en: "C6: Cat's Tail Closing Time (EM)" },
                active: true,
                cons: 6,
                stats: { eleMas: 200 }
            },
        ]
    },
    "Dori": {
        element: "electro",
        buffs: [
            {
                label: { fr: "C4 : Supplément discrétionnaire (ER)", en: "C4: Discretionary Supplement (ER)" },
                active: true,
                cons: 4,
                stats: { enerRech_: 0.30 }
            },
        ]
    },
    "Kachina": {
        element: "geo",
        buffs: [
            {
                label: { fr: "C4 : Ennemis nombreux, attention redoublée (DÉF%)", en: "C4: More Foes, More Caution (DEF%)" },
                active: true,
                cons: 4,
                stats: { def_: 0.08 }
            },
        ]
    },
    "Kirara": {
        element: "dendro",
        buffs: [
            {
                label: { fr: "C6 : Myriade de curiosités en chemin (DGT Élémentaires)", en: "C6: Countless Sights to See (Elemental DMG)" },
                active: true,
                cons: 6,
                stats: { elemental_dmg_: 0.12 }
            },
        ]
    },
    "Sara": {
        element: "electro",
        buffs: [
            {
                label: { fr: "Tempestrier tengu (ATQ)", en: "Tengu Stormcall (ATK)" },
                active: true,
                stats: { atk: 793 }
            },
            {
                label: { fr: "C6 : Péché d'orgueil (uniquement les DGT Électro - DGT Crit)", en: "C6: Sin of Pride (only Electro DMG - Crit DMG)" },
                active: true,
                cons: 6,
                stats: { critDMG_: 0.60 }
            },
        ]
    },
    "Lynette": {
        element: "anemo",
        buffs: [
            {
                label: { fr: "Synergie ingénieuse (ATQ%)", en: "Sophisticated Synergy (ATK%)" },
                active: true,
                stats: { atk_: 0.20 }
            }
        ]
    },
    "Rosaria": {
        element: "cryo",
        buffs: [
            {
                label: { fr: "Samaritain de l'ombre (Taux Crit)", en: "Shadow Samaritan (Crit Rate)" },
                active: true,
                stats: { critRate_: 0.15 }
            }
        ]
    },
    "Liuyun": {
        element: "anemo",
        buffs: [
            {
                label: { fr: "Poursuite des plumes de givre (Uniquement attaques plongées - Taux Crit)", en: "Galefeather Pursuit (Only plunging attacks - Crit Rate)" },
                active: false,
                stats: { critRate_: 0.10 }
            }
        ]
    },
    "Sucrose": {
        element: "anemo",
        buffs: [
            {
                label: { fr: "Permutation de catalyste (EM)", en: "Catalyst Conversion (EM)" },
                active: true,
                stats: { eleMas: 50 }
            },
            {
                label: { fr: "Mollis Favonius (EM)", en: "Mollis Favonius (EM)" },
                active: true,
                stats: { eleMas: 200 }
            },
            {
                label: { fr: "Théorie de l'entropie (DGT Élémentaires)", en: "Chaotic Entropy (Elemental DMG)" },
                cons: 6,
                active: true,
                stats: { elemental_dmg_: 0.20 }
            },
            {
                label: { fr: "Théorie de l'entropie (Hexerei uniquement - DGT Élémentaires)", en: "Chaotic Entropy (Hexerei only - Elemental DMG)" },
                cons: 6,
                active: false,
                stats: { elemental_dmg_: 0.0857142 }
            }
        ]
    },
    "Shenhe": {
        element: "cryo",
        buffs: [
            {
                label: { fr: "Étreinte divine (DGT Cryo)", en: "Deific Embrace (Cryo DMG)" },
                active: true,
                stats: { cryo_dmg_: 0.15 }
            }
        ]
    },
    "Faruzan": {
        element: "anemo",
        buffs: [
            {
                label: { fr: "Sentier secret du vent (DGT Anémo)", en: "The Wind's Secret Ways (Anemo DMG)" },
                active: true,
                stats: { anemo_dmg_: 0.383 }
            },
            {
                label: { fr: "Merveilleux chemin de la vérité (DGT Crit)", en: "The Wondrous Path of Truth (Crit DMG)" },
                active: true,
                cons: 6,
                stats: { critDMG_: 0.40 }
            }
        ]
    },
    "Mika": {
        element: "cryo",
        buffs: [
            {
                label: { fr: "Épinglage rapide (DGT Physiques)", en: "Suppressive Barrage (Physical DMG)" },
                active: true,
                stats: { physical_dmg_: 0.15 }
            },
            {
                label: { fr: "Conseil du compagnon (uniquement les DGT Physiques - DGT Crit)", en: "Companion's Counsel (only Physical DMG - Crit DMG)" },
                active: true,
                cons: 6,
                stats: { critDMG_: 0.60 }
            }
        ]
    },
    "Yaoyao": {
        element: "dendro",
        buffs: [
            {
                label: { fr: "Tutelle (DGT Dendro)", en: "Adeptus' Tutelage (Dendro DMG)" },
                active: true,
                cons: 1,
                stats: { dendro_dmg_: 0.15 }
            }
        ]
    },
    "Chevreuse": {
        element: "pyro",
        buffs: [
            {
                label: { fr: "Agencement vertical (ATQ%)", en: "Vertical Force Coordination (ATK%)" },
                active: true,
                stats: { atk_: 0.40 }
            },
            {
                label: { fr: "Poursuite de l'anéantissement du mal (DGT Pyro, DGT Électro)", en: "In Pursuit of Ending Evil (Pyro DMG, Electro DMG)" },
                cons: 6,
                active: true,
                stats: { pyro_dmg_: 0.60, electro_dmg_: 0.60 }
            }
        ]
    },
    "Nahida": {
        element: "dendro",
        buffs: [
            {
                label: { fr: "A4 : Compassion illuminée (EM)", en: "A4: Compassion Illuminated (EM)" },
                active: true,
                stats: { eleMas: 250 }
            }
        ]
    },
    "Olorun": {
        element: "electro",
        buffs: [
            {
                label: { fr: "C6 : Hymne de source profonde (ATQ%)", en: "C6: Ode to Deep Springs (ATK%)" },
                cons: 6,
                active: true,
                stats: { atk_: 0.10 }
            }
        ]
    },
    "Iansan": {
        element: "electro",
        buffs: [
            {
                label: { fr: "Ruée fulminante (ATQ)", en: "The Three Principles of Power (ATK)" },
                active: true,
                stats: { atk: 810 }
            },
            {
                label: { fr: "Le plus dangereux, c'est la paresse ! (ATQ%)", en: "Laziness is the Enemy! (ATK%)" },
                cons: 2,
                active: true,
                stats: { atk_: 0.3 }
            }
        ]
    },
    "Ineffa": {
        element: "electro",
        buffs: [
            {
                label: { fr: "Protocole de permutation panoramique (EM)", en: "Panoramic Permutation Protocol (EM)" },
                active: true,
                stats: { eleMas: 140 }
            }
        ]
    },
    "Lauma": {
        element: "dendro",
        buffs: [
            {
                label: { fr: "A1 : Signelune : Lueur Ascendante (uniquement les DGT de Sélénofleurissement - Taux Crit, DGT Crit)", en: "A1: Moonsign: Ascendant Gleam (only Lunar-Bloom DMG - Crit Rate, Crit DMG)" },
                active: false,
                stats: { critRate_: 0.10, critDMG_: 0.20 }
            }
        ]
    },
    "Illuga": {
        element: "geo",
        buffs: [
            {
                label: { fr: "Pacte du forge-torche (Taux Crit, DGT Crit, EM)", en: "Torchforger's Covenant (Crit Rate, Crit DMG, EM)" },
                active: false,
                stats: { eleMas: 50, critRate_: 0.05, critDMG_: 0.10 }
            },
            {
                label: { fr: "C4 : Loup des aurores pourchassées (Taux Crit, DGT Crit, EM)", en: "C4: Solarhunting Wolf (Crit Rate, Crit DMG, EM)" },
                active: true,
                cons: 4,
                stats: { def: 200 }
            },
            {
                label: { fr: "C6 : Oriole des nuits terrifiantes (Taux Crit, DGT Crit, EM)", en: "C6: Nightmare Orioles (Crit Rate, Crit DMG, EM)" },
                active: false,
                cons: 6,
                stats: { eleMas: 30, critRate_: 0.05, critDMG_: 0.20 }
            }
        ]
    },
    "Linnea": {
        element: "geo",
        buffs: [
            {
                label: { fr: "Pacte du forge-torche (Si le personnage est Lunaire - EM)", en: "Universal Naturalist Archive (If the character is Moonsign - EM)" },
                active: false,
                stats: { eleMas: 120 }
            }
        ]
    },
    "Prune": {
        element: "anemo",
        buffs: [
            {
                label: { fr: "Hexerei (ATQ%)", en: "Hexerei (ATK%)" },
                active: true,
                stats: { atk_: 0.30 }
            },
            {
                label: { fr: "C6 : Et voilà l'histoire ! À partager avec vos amis ! (ATQ)", en: "C6: And That's the Story! Share It With Your Friends! (ATK)" },
                active: true,
                cons: 6,
                stats: { atk: 350 }
            }
        ]
    },
    "Nicole": {
        element: "pyro",
        buffs: [
            {
                label: { fr: "Révélation : Lumière incréée (ATQ)", en: "Revelation: Uncreated Light (ATK)" },
                active: true,
                stats: { atk: 900 }
            }
        ]
    },
};

window.TEAMMATE_NAME_ALIASES = {
    "Qin": { fr: "Jean", en: "Jean" },
    "SkirkNew": { fr: "Skirk", en: "Skirk" },
    "Liuyun": { fr: "Xianyun", en: "Xianyun" },
    "Olorun": { fr: "Ororon", en: "Ororon" }
};