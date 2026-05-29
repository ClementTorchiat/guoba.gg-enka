const ICON_BASE_PATH = "./assets/simulator/icons/";

const ICON_MAP = {
    "hp": "icon_hp.webp",
    "hp_": "icon_hp_percent.webp",
    "atk": "icon_atk.webp",
    "atk_": "icon_atk_percent.webp",
    "def": "icon_def.webp",
    "def_": "icon_def_percent.webp",

    "eleMas": "icon_em.webp",
    "enerRech_": "icon_er.webp",
    "critRate_": "icon_crit_rate.webp",
    "critDMG_": "icon_crit_dmg.webp",
    "heal_": "icon_heal_bonus.webp",

    "pyro_dmg_": "icon_pyro.webp",
    "hydro_dmg_": "icon_hydro.webp",
    "cryo_dmg_": "icon_cryo.webp",
    "electro_dmg_": "icon_electro.webp",
    "anemo_dmg_": "icon_anemo.webp",
    "geo_dmg_": "icon_geo.webp",
    "dendro_dmg_": "icon_dendro.webp",
    "physical_dmg_": "icon_physical.webp",

    "sword": "icon_sword.webp",
    "claymore": "icon_claymore.webp",
    "pole": "icon_polearm.webp",
    "bow": "icon_bow.webp",
    "catalyst": "icon_catalyst.webp",

    "score": "icon_score.webp",

    "unknown": "icon_unknown.webp"
};

function createIcon(key) {
    const filename = ICON_MAP[key] || ICON_MAP["unknown"];
    return `<img src="${ICON_BASE_PATH}${filename}" class="stat-icon" alt="${key}">`;
}

const KEY_TO_FIGHT_PROP = {
    'hp': 'FIGHT_PROP_HP',
    'hp_': 'FIGHT_PROP_HP_PERCENT',
    'atk': 'FIGHT_PROP_ATTACK',
    'atk_': 'FIGHT_PROP_ATTACK_PERCENT',
    'def': 'FIGHT_PROP_DEFENSE',
    'def_': 'FIGHT_PROP_DEFENSE_PERCENT',
    'critRate_': 'FIGHT_PROP_CRITICAL',
    'critDMG_': 'FIGHT_PROP_CRITICAL_HURT',
    'enerRech_': 'FIGHT_PROP_CHARGE_EFFICIENCY',
    'eleMas': 'FIGHT_PROP_ELEMENT_MASTERY'
};

const FLAT_STATS = new Set(['hp', 'atk', 'def', 'eleMas']);

function getRollDetails(key, value, rarity = 5) {
    const baseRollsDef = rarity === 4
        ? (window.BASE_ROLLS_4 || BASE_ROLLS_4)
        : (window.BASE_ROLLS || BASE_ROLLS);

    if (!baseRollsDef || !baseRollsDef[key]) {
        return {k: 1, rolls: [value]};
    }

    const possibleRolls = baseRollsDef[key];
    let bestMatch = {k: 1, diff: Infinity, rolls: [value]};

    function checkCombinations(k, currentSum, startIndex, depth, currentRolls) {
        if (depth === k) {
            const diff = Math.abs(currentSum - value);
            if (diff < bestMatch.diff) {
                bestMatch = {k: k, diff: diff, rolls: [...currentRolls]};
            }
            return;
        }
        for (let i = startIndex; i < 4; i++) {
            currentRolls.push(possibleRolls[i]);
            checkCombinations(k, currentSum + possibleRolls[i], i, depth + 1, currentRolls);
            currentRolls.pop();
        }
    }

    for (let k = 1; k <= 6; k++) {
        checkCombinations(k, 0, 0, 0, []);
        if (bestMatch.diff < 0.15) break;
    }

    return bestMatch;
}

function getRollCount(key, value, rarity = 5) {
    return getRollDetails(key, value, rarity).k;
}


const ELEMENT_DATA = {
    "Fire": {id: 40, key: "pyro_dmg_"},
    "Water": {id: 42, key: "hydro_dmg_"},
    "Wind": {id: 44, key: "anemo_dmg_"},
    "Electric": {id: 41, key: "electro_dmg_"},
    "Grass": {id: 43, key: "dendro_dmg_"},
    "Ice": {id: 46, key: "cryo_dmg_"},
    "Rock": {id: 45, key: "geo_dmg_"}
};

const SUBSTAT_RANGES = {
    "critRate_": {min: 2.7, max: 3.9}, "critDMG_": {min: 5.4, max: 7.8},
    "atk_": {min: 4.1, max: 5.8}, "hp_": {min: 4.1, max: 5.8}, "def_": {min: 5.1, max: 7.3},
    "eleMas": {min: 16, max: 23}, "enerRech_": {min: 4.5, max: 6.5},
    "atk": {min: 14, max: 19}, "hp": {min: 209, max: 299}, "def": {min: 16, max: 23}
};

const MAINSTAT_DROP_RATES = {
    "EQUIP_SHOES": {"hp_": 26.68, "atk_": 26.66, "def_": 26.66, "enerRech_": 10.0, "eleMas": 10.0},
    "EQUIP_RING": {
        "hp_": 19.25,
        "atk_": 19.25,
        "def_": 19.0,
        "eleMas": 2.5,
        "physical_dmg_": 5.0,
        "pyro_dmg_": 5.0,
        "electro_dmg_": 5.0,
        "cryo_dmg_": 5.0,
        "hydro_dmg_": 5.0,
        "anemo_dmg_": 5.0,
        "geo_dmg_": 5.0,
        "dendro_dmg_": 5.0
    },
    "EQUIP_DRESS": {
        "hp_": 22.0,
        "atk_": 22.0,
        "def_": 22.0,
        "critRate_": 10.0,
        "critDMG_": 10.0,
        "heal_": 10.0,
        "eleMas": 4.0
    }
};

const STAT_MAPPING = {
    "FIGHT_PROP_HP": "hp",
    "FIGHT_PROP_HP_PERCENT": "hp_",
    "FIGHT_PROP_ATTACK": "atk",
    "FIGHT_PROP_ATTACK_PERCENT": "atk_",
    "FIGHT_PROP_DEFENSE": "def",
    "FIGHT_PROP_DEFENSE_PERCENT": "def_",
    "FIGHT_PROP_CRITICAL": "critRate_",
    "FIGHT_PROP_CRITICAL_HURT": "critDMG_",
    "FIGHT_PROP_CHARGE_EFFICIENCY": "enerRech_",
    "FIGHT_PROP_ELEMENT_MASTERY": "eleMas",
    "FIGHT_PROP_HEAL_ADD": "heal_",
    "FIGHT_PROP_PHYSICAL_ADD_HURT": "physical_dmg_",
    "FIGHT_PROP_FIRE_ADD_HURT": "pyro_dmg_",
    "FIGHT_PROP_ELEC_ADD_HURT": "electro_dmg_",
    "FIGHT_PROP_WATER_ADD_HURT": "hydro_dmg_",
    "FIGHT_PROP_GRASS_ADD_HURT": "dendro_dmg_",
    "FIGHT_PROP_WIND_ADD_HURT": "anemo_dmg_",
    "FIGHT_PROP_ROCK_ADD_HURT": "geo_dmg_",
    "FIGHT_PROP_ICE_ADD_HURT": "cryo_dmg_"
};

const STAT_LABELS = {
    "hp": "PV",
    "hp_": "PV %",
    "atk": "ATQ",
    "atk_": "ATQ %",
    "def": "DÉF",
    "def_": "DÉF %",
    "eleMas": "Maîtrise élémentaire",
    "enerRech_": "Recharge d'énergie",
    "critRate_": "Taux CRIT",
    "critDMG_": "DGT CRIT",
    "heal_": "Bonus de Soins",
    "pyro_dmg_": "Bonus de DGT Pyro",
    "hydro_dmg_": "Bonus de DGT Hydro",
    "cryo_dmg_": "Bonus de DGT Cryo",
    "electro_dmg_": "Bonus de DGT Électro",
    "anemo_dmg_": "Bonus de DGT Anémo",
    "geo_dmg_": "Bonus de DGT Géo",
    "dendro_dmg_": "Bonus de DGT Dendro",
    "physical_dmg_": "Bonus de DGT Physiques"
};

const RESONANCE_DATA = {
    "pyro": {name: "Flammes de la ferveur (Pyro)", active: false, stats: {atk_: 0.25}},
    "hydro": {name: "Eau médicinale (Hydro)", active: false, stats: {hp_: 0.25}},
    "dendro": {name: "Liane de la sagesse (Dendro)", active: false, stats: {eleMas: 50}},
    "electro": {name: "Tonnerre puissant (Électro)", active: false, stats: {}},
    "cryo": {name: "Glace brisée (Cryo)", active: false, stats: {critRate_: 0.15}},
    "geo": {name: "Roc inamovible (Géo)", active: false, stats: {}},
    "anemo": {name: "Vents de la célérité (Anémo)", active: false, stats: {}}
};

const ELEMENT_COLORS = {
    "pyro": "#884A20",
    "hydro": "#195293",
    "dendro": "#516514",
    "electro": "#512C88",
    "anemo": "#2B7C6C",
    "cryo": "#1B7A92",
    "geo": "#886D01",
    "physical": "#cccccc"
};

const WEAPON_NAME_MAPPING = {
    // 1 étoile
    "Épée émoussée": "DullBlade",
    "Épée d'entraînement": "WasterGreatsword",
    "Lance du débutant": "BeginnersProtector",
    "Notes de l'apprenti": "ApprenticesNotes",
    "Arc de chasse": "HuntersBow",

    // 2 étoiles
    "Épée en argent": "SilverSword",
    "Lame du mercenaire": "OldMercsPal",
    "Pointe de fer": "IronPoint",
    "Grimoire de poche": "PocketGrimoire",
    "Arc de chasse aguerri": "SeasonedHuntersBow",

    // 3 étoiles
    "Lame froide": "CoolSteel",
    "Messager de l'Aube": "HarbingerOfDawn",
    "Épée du voyageur": "TravelersHandySword",
    "Épée en fer noir": "DarkIronSword",
    "Couteau à filets": "FilletBlade",
    "Épée céleste": "SkyriderSword",
    "Ombre ferreuse": "FerrousShadow",
    "Épée sanglante": "BloodstainedGreatsword",
    "Grande épée en fer blanc": "WhiteIronGreatsword",
    "Épée de la raison": "DebateClub",
    "Grande épée céleste": "SkyriderGreatsword",
    "Pampille blanche": "WhiteTassel",
    "Hallebarde": "Halberd",
    "Pampille noire": "BlackTassel",
    "Guide de magie": "MagicGuide",
    "Histoire des chasseurs de dragon": "ThrillingTalesOfDragonSlayers",
    "Conte d'un autre monde": "OtherworldlyStory",
    "Orbe jadien": "EmeraldOrb",
    "Néphrite jumelle": "TwinNephrite",
    "Arc du corbeau": "RavenBow",
    "Serment de l'archer": "SharpshootersOath",
    "Arc courbé": "RecurveBow",
    "Lance-pierres": "Slingshot",
    "Messager": "Messenger",

    // 4 étoiles - épées à une main
    "Épée de Favonius": "FavoniusSword",
    "Flûte": "TheFlute",
    "Épée rituelle": "SacrificialSword",
    "Épée longue royale": "RoyalLongsword",
    "Rugissement du Lion": "LionsRoar",
    "Tailleur de pierre (prototype)": "PrototypeRancour",
    "Piqûre de fer": "IronSting",
    "Épée longue de Rochenoire": "BlackcliffLongsword",
    "Épée noire": "TheBlackSword",
    "Éclair des impasses": "TheAlleyFlash",
    "Épée de la descente": "SwordOfDescension",
    "Croc suppurant": "FesteringDesire",
    "Lame kageuchi d'Amenoma": "AmenomaKageuchi",
    "Fuseau de cinabre": "CinnabarSpindle",
    "Kagotsurube Isshin": "KagotsurubeIsshin",
    "Lame d'aubier": "SapwoodBlade",
    "Clair de lune de Xiphos": "XiphosMoonlight",
    "Pluie florale": "ToukabouShigure",
    "Croc de loup": "WolfFang",
    "Final des profondeurs": "FinaleOfTheDeep",
    "Passeur du Fleuve cendré": "FleuveCendreFerryman",
    "L'assistant du docker": "TheDockhandsAssistant",
    "Lame du Narzissenkreuz": "SwordOfNarzissenkreuz",
    "Os robuste": "SturdyBone",
    "Flûte d'ezpitzal": "FluteOfEzpitzal",
    "La calamité d'Eshu": "CalamityOfEshu",
    "Appel de sérénité": "SerenitysCall",
    "Aube du tisse-lune": "MoonweaversDawn",

    // 4 étoiles - épées à deux mains
    "Espadon de Favonius": "FavoniusGreatsword",
    "Épée-horloge": "TheBell",
    "Espadon rituel": "SacrificialGreatsword",
    "Espadon royal": "RoyalGreatsword",
    "Fluorescence": "Rainslasher",
    "Espadon (prototype)": "PrototypeArchaic",
    "Ombre immaculée": "Whiteblind",
    "Trancheuse de Rochenoire": "BlackcliffSlasher",
    "Ossature du dragon": "SerpentSpine",
    "Épée antique des Millelithes": "LithicBlade",
    "Tombe-neige en argétoile": "SnowTombedStarsilver",
    "Illustre seigneur des mers": "LuxuriousSeaLord",
    "Espadon de Nagasama": "KatsuragikiriNagamasa",
    "Aigue-marine de Makhaira": "MakhairaAquamarine",
    "Akuoumaru": "Akuoumaru",
    "Apparat de la forêt": "ForestRegalia",
    "Fleur de mailles": "MailedFlower",
    "Bâton bavard": "TalkingStick",
    "Ombre tidale": "TidalShadow",
    "« Méga épée magique du suzerain ultime »": "UltimateOverlordsMegaMagicSword",
    "Scie électrique portative": "PortablePowerSaw",
    "Crochet fructueux": "FruitfulHook",
    "Trembleur de terre": "EarthShaker",
    "Perception forgée par les flammes": "FlameForgedInsight",
    "Clé universelle": "MasterKey",

    // 4 étoiles - arcs
    "Arc de chasse de Favonius": "FavoniusWarbow",
    "Dernière corde": "TheStringless",
    "Arc rituel": "SacrificialBow",
    "Arc royal": "RoyalBow",
    "Arc rouillé": "Rust",
    "Lune paisible (prototype)": "PrototypeCrescent",
    "Arc à poulies": "CompoundBow",
    "Arc de guerre de Rochenoire": "BlackcliffWarbow",
    "Arc de chasse verdoyant": "TheViridescentHunt",
    "Traqueur des impasses": "AlleyHunter",
    "Crépuscule couchant": "FadingTwilight",
    "Valse nocturne": "MitternachtsWaltz",
    "Ode aux alizées": "WindblumeOde",
    "Arc d'exorcisme": "Hamayumi",
    "Predator": "Predator",
    "Lune de Mouun": "MouunsMoon",
    "Le valet du roi": "KingsSquire",
    "Chalutier": "EndOfTheLine",
    "Perceur d'ibis": "IbisPiercer",
    "Descendant du soleil flamboyant": "ScionOfTheBlazingSun",
    "Chant de quiétude": "SongOfStillness",
    "Nimbus-forgé": "Cloudforged",
    "Jauge de portée": "RangeGauge",
    "Plumard de fleurs": "FlowerWreathedFeathers",
    "Brise-chaîne": "ChainBreaker",
    "Séquence de solitude": "SequenceOfSolitude",
    "Crochet de capture": "SnareHook",
    "Arc pluvial du serpent arc-en-ciel": "RainbowSerpentsRainBow",

    // 4 étoiles - armes d'hast
    "Fléau du dragon": "DragonsBane",
    "Guisarme stellaire (prototype)": "PrototypeStarglitter",
    "Pique du croissant de lune": "CrescentPike",
    "Lance de Rochenoire": "BlackcliffPole",
    "Scion de la victoire": "Deathmatch",
    "Lance des Millelithes": "LithicSpear",
    "Lance de Favonius": "FavoniusLance",
    "Lance de chasse royale": "RoyalSpear",
    "Lance Dosdragon": "DragonspineSpear",
    "Lance en croix de Kitain": "KitainCrossSpear",
    "« La prise »": "TheCatch",
    "Aileron de brise-vagues": "WavebreakersFin",
    "Perce-lune": "Moonpiercer",
    "Lance du vent saisonnier": "MissiveWindspear",
    "Ballade des fjords": "BalladOfTheFjords",
    "Récompense légitime": "RightfulReward",
    "Dialogues des sages du désert": "DialoguesOfTheDesertSages",
    "Foret de prospecteur": "ProspectorsDrill",
    "Clou soutenant les montagnes": "MountainBracingBolt",
    "Trace d'arc-en-ciel": "FootprintOfTheRainbow",
    "Tamayuratei no Ohanashi": "TamayurateiNoOhanashi",
    "Pelle du prospecteur": "ProspectorsShovel",
    "Bâton de sacrificateur": "SacrificersStaff",

    // 4 étoiles - catalyseur
    "Code de Favonius": "FavoniusCodex",
    "Mouvement vagabond": "TheWidsith",
    "Mémoires de rituels": "SacrificialFragments",
    "Grimoire royal": "RoyalGrimoire",
    "Perle solaire": "SolarPearl",
    "Malice (prototype)": "PrototypeAmber",
    "Atlas des terres et des mers": "MappaMare",
    "Agate de Rochenoire": "BlackcliffAgate",
    "Œil de la perception": "EyeOfPerception",
    "Vins et chants": "WineAndSong",
    "Fruit du permafrost": "Frostbearer",
    "Contes de Dodoco": "DodocoTales",
    "Anneau des Hakushin": "HakushinRing",
    "Œil d'assermentation": "OathswornEye",
    "Étoile du soir errante": "WanderingEvenstar",
    "Le fruit de l'accomplissement": "FruitOfFulfillment",
    "Jade sacrificiel": "SacrificialJade",
    "Pureté fluide": "FlowingPurity",
    "Ballade d'un azur infini": "BalladOfTheBoundlessBlue",
    "Corne à boire cendrée": "AshGravenDrinkingHorn",
    "Tourbillon sur les vagues": "WaveridingWhirl",
    "Anneau de Yaxche": "RingOfYaxche",
    "Lyre du tisse-lumière": "EtherlightSpindlelute",
    "Lanterne à moelle sombre": "BlackmarrowLantern",
    "Frimas d’aube": "DawningFrost",

    // 5 étoiles - épées à une main
    "Épée du faucon": "AquilaFavonia",
    "Lame de la Voûte d'Azur": "SkywardBlade",
    "Serment de la liberté": "FreedomSworn",
    "Tranche-sommets": "SummitShaper",
    "Coupeur de jade primordial": "PrimordialJadeCutter",
    "Reflet de tranche-brume": "MistsplitterReforged",
    "Lune ondulante de Futsu": "HaranGeppakuFutsu",
    "Clé de Khaj-Nisut": "KeyOfKhajNisut",
    "Lumière d’incision foliaire": "LightOfFoliarIncision",
    "Splendeur des eaux calmes": "SplendorOfTranquilWaters",
    "Uraku Misugiri": "UrakuMisugiri",
    "Absolution": "Absolution",
    "Chanson de patrouille de sommet": "PeakPatrolSong",
    "Éclazur": "Azurelight",
    "Athame Artis": "AthameArtis",
    // 6.3
    "Éclat lunaire luminescent": "LightbearingMoonshard",

    // 5 étoiles - épées à deux mains
    "Fierté de la Voûte d'Azur": "SkywardPride",
    "Mort-du-loup": "WolfsGravestone",
    "Ode au chant du vent": "SongOfBrokenPines",
    "Lame brute": "TheUnforged",
    "Brise-pierre de corne rouge": "RedhornStonethresher",
    "Balise de la mer de roseaux": "BeaconOfTheReedSea",
    "Condamneur": "Verdict",
    "Croc du roi de la montagne": "FangOfTheMountainKing",
    "Mille soleils brûlants": "AThousandBlazingSuns",
    // 6.4
    "Geste du loup puissant": "GestOfTheMightyWolf",

    // 5 étoiles - arcs
    "Ailes de la Voûte d'Azur": "SkywardHarp",
    "Arc d'Amos": "AmosBow",
    "Ultime soupir": "ElegyForTheEnd",
    "Étoile polaire": "PolarStar",
    "Simulacre d'eau": "AquaSimulacra",
    "Pulsation du tonnerre": "Thundering Pulse",
    "La voie du chasseur": "HuntersPath",
    "La première grande magie": "TheFirstGreatMagic",
    "Corde de pluie blanche": "SilvershowerHeartstrings",
    "Plumage cramoisi du vautour astral": "AstralVulturesCrimsonPlumage",
    "Les chroniques de l’aube": "TheDaybreakChronicles",
    // 6.5
    "Serment de gel doré": "GoldenFrostboundOath",

    // 5 étoiles - armes d'hast
    "Bâton de Homa": "StaffOfHoma",
    "Berge de la Voûte d'Azur": "SkywardSpine",
    "Perceur prismatique": "VortexVanquisher",
    "Lance de jade ailée": "PrimordialJadeWingedSpear",
    "Étouffeur de calamités": "CalamityQueller",
    "Lumière du faucheur": "EngulfingLightning",
    "Bâton des sables écarlates": "StaffOfTheScarletSands",
    "Semblance de la lune écarlate": "CrimsonMoonsSemblance",
    "Élégie de Lumidouce": "LumidouceElegy",
    "Symphoniste des senteurs": "SymphonistOfScents",
    "Halo fracturé": "FracturedHalo",
    "Ruines sanglantes": "BloodsoakedRuins",
    //6.6
    "Désastre et remords": "DisasterAndRemorse",

    // 5 étoiles - catalyseurs
    "Atlas de la Voûte d'Azur": "SkywardAtlas",
    "L'origine des Quatre Vents": "LostPrayerToTheSacredWinds",
    "Chaînes mortelles": "MemoryOfDust",
    "Splendeur de l'azur": "JadefallsSplendor",
    "Lueur de la lune éternelle": "EverlastingMoonglow",
    "Vérité de Kagura": "KagurasVerity",
    "Mille rêves flottants": "AThousandFloatingDreams",
    "Mémoire de Tulaytullah": "TulaytullahsRemembrance",
    "Supervision de trésorerie": "CashflowSupervision",
    "Tome du flux éternel": "TomeOfTheEternalFlow",
    "Écho de la grue": "CranesEchoingCall",
    "Instant surfant": "SurfsUp",
    "Veillée d'appel d'étoiles": "StarcallersWatch",
    "Matinée flânée sous le soleil": "SunnyMorningSleepIn",
    "Notions colorées": "VividNotions",
    "Miroir du tisse-nuit": "NightweaversLookingGlass",
    "Reliquaire de la vérité": "ReliquaryOfTruth",
    // 6.3
    "Rappel de la nocturne": "NocturnesCurtainCall",
    // 6.6
    "Heptades des anges": "AngelosHeptades",
};

const SET_NAME_MAPPING = {
    "Aventurier": "Adventurer",
    "Chanceux": "LuckyDog",
    "Médecin itinérant": "TravelingDoctor",

    "Sacrifieur Pyro": "PrayersForIllumination",
    "Sacrifieur Hydro": "PrayersForDestiny",
    "Sacrifieur Électro": "PrayersForWisdom",
    "Sacrifieur Cryo": "PrayersToSpringtime",

    "Cœur du Voyageur": "ResolutionOfSojourner",
    "Cœur du Brave": "BraveHeart",
    "Cœur du Gardien": "DefendersWill",
    "Miracle": "TinyMiracle",
    "Berserker": "Berserker",
    "Artiste martial": "MartialArtist",
    "Instructeur": "Instructor",
    "Parieur": "Gambler",
    "Exilé": "TheExile",
    "Érudit": "Scholar",

    "Briseur de glace": "BlizzardStrayer",
    "Dompteur de foudre": "Thundersoother",
    "Marcheur du feu": "Lavawalker",
    "Amour chéri": "MaidenBeloved",
    "Rideau du Gladiateur": "GladiatorsFinale",
    "Ombre de la Verte Chasseuse": "ViridescentVenerer",
    "Bande vagabonde": "WanderersTroupe",
    "Colère de tonnerre": "ThunderingFury",
    "Sorcière des flammes ardentes": "CrimsonWitchOfFlames",
    "Ancien rituel royal": "NoblesseOblige",
    "Chevalerie ensanglantée": "BloodstainedChivalry",
    "Roche ancienne": "ArchaicPetra",
    "Météore inversé": "RetracingBolide",
    "Âme des profondeurs": "HeartOfDepth",
    "Ténacité du Millelithe": "TenacityOfTheMillelith",
    "Flamme blême": "PaleFlame",
    "Réminiscence nostalgique": "ShimenawasReminiscence",
    "Emblème du destin brisé": "EmblemOfSeveredFate",
    "Coquille des rêves opulents": "HuskOfOpulentDreams",
    "Palourde aux teintes océaniques": "OceanHuedClam",
    "Au-delà cinabrin": "VermillionHereafter",
    "Échos d'une offrande": "EchoesOfAnOffering",
    "Souvenir de forêt": "DeepwoodMemories",
    "Rêve doré": "GildedDreams",
    "Chronique du Pavillon du désert": "DesertPavilionChronicle",
    "Fleur du paradis perdu": "FlowerOfParadiseLost",
    "Rêve de la nymphe": "NymphsDream",
    "Lueur du vourukasha": "VourukashasGlow",
    "Chasseur de la Maréchaussée": "MarechausseeHunter",
    "Troupe dorée": "GoldenTroupe",
    "Chanson des jours d'antan": "SongOfDaysPast",
    "Murmure nocturne en forêt d'échos": "NighttimeWhispersInTheEchoingWoods",
    "Fragment d'harmonie divergente": "FragmentOfHarmonicWhimsy",
    "Rêverie incomplète": "UnfinishedReverie",
    "Codex d'obsidienne": "ObsidianCodex",
    "Parchemin du héros de la Cité de braise": "ScrollOfTheHeroOfCinderCity",
    "Serment de la longue nuit": "LongNightsOath",
    "Finale des galeries profondes": "FinaleOfTheDeepGalleries",
    "Nuit de la révélation céleste": "NightOfTheSkysUnveiling",
    "Sérénade de la lune soyeuse": "SilkenMoonsSerenade",
    "Journée sculptée par les vents ascendants": "ADayCarvedFromRisingWinds",
    "Aubade d'astre et de lune": "AubadeOfMorningstarAndMoon",
    // 6.6
    "Don céleste": "CelestialGift",
    "Désenchantement dans l'ombre profonde": "DisenchantmentInDeepShadow"
};

const ARTIFACT_TYPE_MAPPING = {
    "EQUIP_BRACER": "Fleur de la vie",
    "EQUIP_NECKLACE": "Plume de la mort",
    "EQUIP_SHOES": "Sables du temps",
    "EQUIP_RING": "Coupe d'éonothème",
    "EQUIP_DRESS": "Diadème de Logos"
};

const SLOT_POSSIBLE_MAIN_STATS = {
    "EQUIP_SHOES": ["hp_", "atk_", "def_", "enerRech_", "eleMas"],
    "EQUIP_RING": ["hp_", "atk_", "def_", "eleMas", "physical_dmg_", "pyro_dmg_", "hydro_dmg_", "cryo_dmg_", "electro_dmg_", "anemo_dmg_", "geo_dmg_", "dendro_dmg_"],
    "EQUIP_DRESS": ["hp_", "atk_", "def_", "eleMas", "critRate_", "critDMG_", "heal_"]
};

let globalPersoData = [];

let sidebarSortState = {column: 'original', direction: 'desc'};

function setSidebarSort(column) {
    if (sidebarSortState.column === column) {
        sidebarSortState.direction = sidebarSortState.direction === 'desc' ? 'asc' : 'desc';
    } else {
        sidebarSortState.column = column;
        sidebarSortState.direction = 'desc';
    }
    const activeCard = document.querySelector('#sidebar-list .char-card.active');
    const activeOriginalIndex = activeCard ? parseInt(activeCard.dataset.originalIndex) : 0;
    renderSidebar(activeOriginalIndex);
}

function updateSortArrows() {
    ['original', 'name', 'score'].forEach(col => {
        const arrow = document.getElementById(`arrow-${col}`);
        const section = document.getElementById(`sort-col-${col}`);
        if (!arrow || !section) return;
        const isActive = sidebarSortState.column === col;
        section.style.opacity = isActive ? '1' : '0.4';
        arrow.style.transition = 'transform 0.2s ease';
        arrow.style.transform = (isActive && sidebarSortState.direction === 'asc') ? 'rotate(180deg)' : 'rotate(0deg)';
        arrow.style.opacity = isActive ? '1' : '0.4';
    });
}

let charData = {};
let locData = {};
const apiSessionCache = {};


function getRecentProfiles() {
    const data = localStorage.getItem('guoba_recent_profiles');
    return data ? JSON.parse(data) : [];
}

function getFavoriteUid() {
    return localStorage.getItem('guoba_favorite_uid') || null;
}
function setFavoriteUid(uid) {
    if (uid) localStorage.setItem('guoba_favorite_uid', uid);
    else localStorage.removeItem('guoba_favorite_uid');
}
function toggleFavoriteProfile(uid, event) {
    if (event) event.stopPropagation();
    const current = getFavoriteUid();
    setFavoriteUid(current === uid ? null : uid);
    renderHome();
}

function saveRecentProfile(uid, playerInfo, profilePicUrl, bannerUrl) {
    let profiles = getRecentProfiles();
    profiles = profiles.filter(p => p.uid !== uid);

    profiles.unshift({
        uid: uid,
        nickname: playerInfo.nickname || 'Joueur inconnu',
        signature: playerInfo.signature || '',
        ar: playerInfo.level || 0,
        achievements: playerInfo.finishAchievementNum ?? null,
        abyssStars: playerInfo.towerStarIndex ?? null,
        theaterStars: playerInfo.theaterStarIndex ?? null,
        stygianIndex: playerInfo.stygianIndex ?? null,
        stygianSec: (playerInfo.stygianSeconds > 0) ? playerInfo.stygianSeconds : null,
        pic: profilePicUrl,
        banner: bannerUrl || '',
        timestamp: Date.now()
    });

    if (profiles.length > 12) {
        const favUid = getFavoriteUid();
        const removeIdx = profiles.map((p, i) => i).reverse().find(i => profiles[i].uid !== favUid);
        if (removeIdx !== undefined) profiles.splice(removeIdx, 1);
        else profiles.pop();
    }
    localStorage.setItem('guoba_recent_profiles', JSON.stringify(profiles));
}

function deleteRecentProfile(uid, event) {
    if (event) event.stopPropagation();
    if (getFavoriteUid() === uid) setFavoriteUid(null);
    let profiles = getRecentProfiles();
    profiles = profiles.filter(p => p.uid !== uid);
    localStorage.setItem('guoba_recent_profiles', JSON.stringify(profiles));
    renderHome();
}

function showSkeletonCard() {
    const sidebarList = document.getElementById('sidebar-list');
    if (sidebarList) {
        sidebarList.innerHTML = Array(12).fill(0).map(() => `
            <div class="char-card">
                <div class="sk" style="width:52px; height:52px; border-radius:8px;"></div>
                <div class="char-card-container">
                    <div class="sk" style="width:90px; height:14px;"></div>
                    <div class="sk" style="width:48px; height:12px;"></div>
                </div>
            </div>
        `).join('');
    }

    let topHeader = document.getElementById('top-header-area');
    const pp = document.getElementById('player-profile');
    if (!topHeader && pp) {
        topHeader = document.createElement('div');
        topHeader.id = 'top-header-area';
        const evalDiv = document.createElement('div');
        evalDiv.id = 'global-evaluation';
        topHeader.appendChild(evalDiv);
        pp.parentNode.insertBefore(topHeader, pp);
        topHeader.appendChild(pp);
    }
    if (topHeader) topHeader.style.display = 'flex';

    const evalContainer = document.getElementById('global-evaluation');
    if (evalContainer) {
        evalContainer.style.display = 'flex';
        evalContainer.style.flex = '1';
        evalContainer.innerHTML = `
            <div class="sk" style="width:100%; height:76px; border-radius:8px;"></div>
        `;
    }

    if (pp) {
        pp.innerHTML = `
            <div class="sk" style="width:400px; height:76px; border-radius:8px;"></div>
        `;
    }

    const toolbar = document.getElementById('toolbar-controls');
    const menu = document.querySelector('.main-content-menu');
    if (menu) menu.style.display = 'flex';
    if (toolbar) {
        toolbar.innerHTML = `
            <div class="sk" style="width:350px; height:50px; border-radius:8px;"></div>
            <div style="display:flex; gap:5px; padding:5px; background:#2C2D32; border-radius:8px;">
                ${Array(4).fill(0).map(() =>
            `<div class="sk" style="width:40px; height:40px; border-radius:5px;"></div>`
        ).join('')}
            </div>
            <div class="sk" style="width:106px; height:50px; border-radius:8px;"></div>
        `;
    }

    const container = document.getElementById('main-container');
    if (!container) return;

    const statRows = Array(9).fill(0).map(() => `
        <div style="display:flex; align-items:center; gap:8px; height:20px;">
            <div class="sk" style="width:18px; height:18px; border-radius:50%;"></div>
            <div class="sk" style="flex:1; height:10px;"></div>
            <div class="sk" style="width:50px; height:10px;"></div>
        </div>
    `).join('');

    const combatRows = Array(5).fill(0).map(() => `
        <div style="display:flex; align-items:center; gap:8px; height:18px;">
            <div class="sk" style="width:18px; height:18px; border-radius:50%;"></div>
            <div class="sk" style="flex:1; height:10px;"></div>
            <div class="sk" style="width:55px; height:10px;"></div>
        </div>
    `).join('');

    const artifactCards = Array(5).fill(0).map(() => `
        <div style="width:240px; min-width:240px; height:280px; border:1px solid #2d3342; border-radius:8px; padding:12px; box-sizing:border-box; display:flex; flex-direction:column; justify-content:space-between;">
            <div style="display:flex; gap:12px; align-items:center; height:50px;">
                <div class="sk" style="width:48px; height:48px; border-radius:6px;"></div>
                <div style="flex:1; display:flex; flex-direction:column; gap:6px;">
                    <div class="sk" style="height:12px; width:80%;"></div>
                    <div class="sk" style="height:10px; width:65%; background:rgba(255,177,59,0.15);"></div>
                    <div class="sk" style="height:9px;  width:30%;"></div>
                </div>
            </div>
            <div style="border-top:1px solid #2d3342;"></div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <div class="sk" style="height:10px; width:45%;"></div>
                <div class="sk" style="height:10px; width:28%;"></div>
            </div>
            <div style="border-top:1px solid #2d3342;"></div>
            <div style="display:flex; flex-direction:column; gap:6px;">
                ${Array(4).fill(0).map(() => `
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <div style="display:flex; gap:5px; align-items:center;">
                            <div class="sk" style="width:17px; height:17px; border-radius:3px;"></div>
                            <div class="sk" style="height:10px; width:75px;"></div>
                        </div>
                        <div class="sk" style="height:10px; width:35px;"></div>
                    </div>
                `).join('')}
            </div>
            <div style="border-top:1px solid #2d3342;"></div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <div class="sk" style="height:10px; width:45px;"></div>
                <div class="sk" style="height:10px; width:55px;"></div>
            </div>
        </div>
    `).join('');

    const buffsCard = `
        <div style="width:240px; min-width:240px; height:280px; border:1px solid #2d3342; border-radius:8px; padding:12px; box-sizing:border-box; display:flex; flex-direction:column; gap:10px;">
            <div class="sk" style="height:14px; width:60%;"></div>
            <div class="sk" style="height:9px; width:90%;"></div>
            <div class="sk" style="height:9px; width:80%;"></div>
            <div style="border-top:1px solid #2d3342; margin:2px 0;"></div>
            ${Array(5).fill(0).map(() => `
                <div style="display:flex; justify-content:space-between; align-items:center; height:28px; background:rgba(0,0,0,0.2); border-radius:8px; padding:0 8px; box-sizing:border-box;">
                    <div class="sk" style="height:10px; width:70%;"></div>
                    <div class="sk" style="width:30px; height:16px; border-radius:34px;"></div>
                </div>
            `).join('')}
        </div>
    `;

    container.innerHTML = `
        <div class="top-row">

            <!-- Fond neutre (remplace le splash art blurré) -->
            <div style="position:absolute; inset:0; z-index:0; background:#1e2024;"></div>

            <!-- Colonne gauche : portrait (350×720) + arme (350×128) -->
            <div style="display:flex; flex-direction:column; gap:8px; flex-shrink:0; position:relative; z-index:1;">
                <div class="sk" style="width:350px; height:720px; border-radius:8px; border:1px solid rgba(255,255,255,0.08);"></div>
                <div class="sk" style="width:350px; height:128px; border-radius:8px; border:1px solid rgba(255,255,255,0.08);"></div>
            </div>

            <!-- Colonne milieu : stats + score + skills + combat (299px) -->
            <div style="width:299px; flex-shrink:0; display:flex; flex-direction:column; gap:8px; position:relative; z-index:1;">

                <!-- Stats de base (flex:1 pour occuper le max) -->
                <div style="flex:1; border-radius:8px; border:1px solid rgba(255,255,255,0.15); padding:12px; display:flex; flex-direction:column; gap:11px; background:rgba(30,32,36,0.8);">
                    <div style="display:flex; justify-content:space-between; align-items:center; height:40px; margin-bottom:2px;">
                        <div style="display:flex; gap:4px; align-items:center;">
                            <div class="sk" style="width:25px; height:25px; border-radius:50%;"></div>
                            <div class="sk" style="width:29px; height:29px; border-radius:50%;"></div>
                        </div>
                        <div style="display:flex; flex-direction:column; gap:5px; align-items:flex-end;">
                            <div class="sk" style="width:60px; height:11px;"></div>
                            <div class="sk" style="width:32px; height:11px;"></div>
                        </div>
                    </div>
                    <div class="sk" style="width:55%; height:22px; border-radius:6px;"></div>
                    <div class="sk" style="width:50%; height:11px;"></div>
                    <div style="display:flex; flex-direction:column; gap:9px;">
                        ${statRows}
                    </div>
                </div>

                <!-- Score -->
                <div style="border-radius:8px; border:1px solid rgba(255,255,255,0.15); padding:10px 10px 8px 7px; display:flex; flex-direction:column; gap:8px; background:rgba(30,32,36,0.8);">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <div class="sk" style="width:70px; height:12px;"></div>
                        <div class="sk" style="width:65px; height:12px;"></div>
                    </div>
                    <div class="sk" style="height:8px; width:100%; border-radius:4px;"></div>
                </div>

                <!-- Skills (3 aptitudes 64×64) -->
                <div style="border-radius:8px; border:1px solid rgba(255,255,255,0.15); padding:10px; display:flex; justify-content:space-around; align-items:center; background:rgba(30,32,36,0.8);">
                    ${Array(3).fill(0).map(() => `
                        <div style="display:flex; flex-direction:column; align-items:center; gap:8px; margin-bottom:11px;">
                            <div class="sk" style="width:64px; height:64px; border-radius:50%;"></div>
                            <div class="sk" style="width:28px; height:10px; border-radius:34px;"></div>
                        </div>
                    `).join('')}
                </div>

                <!-- Stats en combat -->
                <div style="border-radius:8px; border:1px solid rgba(255,255,255,0.15); padding:10px; display:flex; flex-direction:column; gap:9px; background:rgba(30,32,36,0.8);">
                    ${combatRows}
                </div>
            </div>

            <!-- Colonne droite : équipement (grille 2×240px) -->
            <div class="equipment-area" style="position:relative; z-index:1;">
                ${artifactCards}
                ${buffsCard}
            </div>

        </div>
    `;
}

let gameDataReady = false;

async function loadGameData() {
    const loader = document.getElementById('loading-msg');
    if (loader) loader.innerText = "Chargement V2 (Indexation)...";
    window.iconToNameHash = {};
    const CACHE_KEY = 'guoba_gamedata_v2';
    const CACHE_TTL = 24 * 60 * 60 * 1000;
    try {
        const uidInput = document.getElementById('uidInput');
        const searchBtn = document.getElementById('searchBtn');
        if (uidInput) {
            uidInput.disabled = true;
            uidInput.placeholder = "Chargement des données…";
        }
        if (searchBtn) {
            searchBtn.disabled = true;
        }
        const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
        if (cached && (Date.now() - cached.ts < CACHE_TTL)) {
            console.log("⚡ Données jeu chargées depuis le cache local !");
            charData = cached.chars;
            locData = cached.locs;
            window.namecardsData = cached.namecards;
            window.pfpsData = cached.pfps;
            window.iconToNameHash = cached.iconToNameHash;
            window.ROLL_TABLE = cached.rollTable;
            gameDataReady = true;
            if (uidInput) {
                uidInput.disabled = false;
                uidInput.placeholder = "Entrez votre UID...";
            }
            if (searchBtn) {
                searchBtn.disabled = false;
            }
            if (loader) loader.innerText = "";
            return;
        }

        const [chars, locs, relics, namecards, pfps, rollTable] = await Promise.all([
            fetch(`https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/gi/avatars.json`).then(r => r.json()),
            fetch(`https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/gi/locs.json`).then(r => r.json()),
            fetch(`https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/gi/relics.json`).then(r => r.json()),
            fetch(`https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/gi/namecards.json`).then(r => r.json()),
            fetch(`https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/gi/pfps.json`).then(r => r.json()),
            fetch(`./rollTable.json`).then(r => r.json())
        ]);
        window.ROLL_TABLE = rollTable;
        charData = chars;
        locData = locs;
        window.namecardsData = namecards;
        window.pfpsData = pfps;
        if (relics && relics.Items && relics.Sets) {
            Object.values(relics.Items).forEach(item => {
                if (item.Icon && item.SetId && relics.Sets[item.SetId]) {
                    const iconName = item.Icon.split('/').pop().replace('.png', '');
                    const nameHash = relics.Sets[item.SetId].Name;
                    if (iconName && nameHash) {
                        window.iconToNameHash[iconName] = nameHash;
                    }
                }
            });
        }
        localStorage.setItem(CACHE_KEY, JSON.stringify({
            ts: Date.now(),
            chars, locs, namecards, pfps,
            iconToNameHash: window.iconToNameHash,
            rollTable
        }));
        if (loader) loader.innerText = "";
        gameDataReady = true;
        if (uidInput) {
            uidInput.disabled = false;
            uidInput.placeholder = "Entrez votre UID...";
        }
        if (searchBtn) {
            searchBtn.disabled = false;
        }
        console.log(`API V2 Chargée : ${Object.keys(window.iconToNameHash).length} artéfacts indexés.`);
    } catch (e) {
        console.error("Erreur chargement :", e);
        if (loader) loader.innerText = "Erreur Fichiers.";
        if (uidInput) {
            uidInput.placeholder = "Erreur de chargement — rechargez la page";
            uidInput.style.color = "#ef4444";
        }
        if (searchBtn) {
            searchBtn.disabled = false;
        }
        alert("Impossible de charger les données du jeu (GitHub ou réseau indisponible).\nVeuillez recharger la page.");
    }
}

function toggleSearchIcon(isLoaded) {
    const searchBtn = document.getElementById('searchBtn');
    if (!searchBtn) return;

    if (isLoaded) {
        searchBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
        searchBtn.onclick = clearSearch;
    } else {
        searchBtn.innerHTML = `<img src="assets/simulator/icons/icon_search_white.svg" alt="Valider" style="width: 20px; height: 20px;">`;
        searchBtn.onclick = () => fetchUserData();
    }
}

function clearSearch() {
    const uidInput = document.getElementById('uidInput');
    if (uidInput) uidInput.value = '';
    window.history.pushState({}, '', window.location.pathname);
    globalPersoData = [];
    sidebarSortState = {column: 'original', direction: 'desc'};
    const sidebar = document.getElementById('sidebar-list');
    if (sidebar) sidebar.innerHTML = '';
    updateSortArrows();

    const playerProfile = document.getElementById('player-profile');
    if (playerProfile) playerProfile.innerHTML = '';

    const evalContainer = document.getElementById('global-evaluation');
    if (evalContainer) evalContainer.style.display = 'none';

    const topHeader = document.getElementById('top-header-area');
    if (topHeader) topHeader.style.display = 'none';

    toggleSearchIcon(false);

    renderHome();
}

async function fetchUserData(optionalUid) {
    const uid = (optionalUid || document.getElementById('uidInput').value).trim();
    if (!uid) return alert("UID manquant");

    if (!/^\d{9,10}$/.test(uid)) {
        return alert("L'UID doit être un nombre de 9 ou 10 chiffres.\nVérifiez votre identifiant en jeu (Menu Paimon > Profil).");
    }

    if (!gameDataReady) {
        return alert("Les données du jeu sont encore en cours de chargement.\nPatientez quelques secondes puis réessayez.");
    }

    window.history.pushState({}, '', `?uid=${uid}`);

    const loader = document.getElementById('loading-msg');

    if (apiSessionCache[uid] && (Date.now() - apiSessionCache[uid].timestamp < 180000)) {
        console.log("⚡ Chargement instantané depuis le cache !");
        const cachedData = apiSessionCache[uid].data;
        processData(cachedData);
        renderPlayerProfile(cachedData.playerInfo, uid);
        renderGlobalEvaluation(cachedData.playerInfo);
        toggleSearchIcon(true);
        return;
    }

    showSkeletonCard();


    if (loader) loader.innerText = "Récupération...";

    // 3. Ancien proxy
    // const urlCible = `https://enka.network/api/uid/${uid}?t=${Date.now()}`;
    // const proxy = `https://corsproxy.io/?${encodeURIComponent(urlCible)}`;

    //3. Nouveau proxy
    const proxy = `https://guobagg.clement-torchiat.workers.dev/?uid=${uid}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
        const res = await fetch(proxy, {signal: controller.signal});
        clearTimeout(timeoutId);
        if (!res.ok) {
            if (res.status === 404) throw new Error("404");
            else if (res.status === 429) throw new Error("429");
            else throw new Error("SERVER");
        }

        const data = await res.json();

        if (!data.avatarInfoList || data.avatarInfoList.length === 0) {
            alert("La vitrine de ce compte est vide ou privée !\nVeuillez ajouter des personnages et activer l'option 'Afficher les détails des personnages' en jeu.");

            clearSearch();

            const loader = document.getElementById('loading-msg');
            if (loader) loader.innerText = "";

            return;
        }

        apiSessionCache[uid] = {
            data: data,
            timestamp: Date.now()
        };

        processData(data);
        renderPlayerProfile(data.playerInfo, uid);

        renderGlobalEvaluation(data.playerInfo);

        if (loader) loader.innerText = "";
        toggleSearchIcon(true);

    } catch (e) {
        clearTimeout(timeoutId);
        console.error("Erreur de récupération :", e);
        if (loader) loader.innerText = "Erreur.";

        if (e.name === 'AbortError') {
            alert("La requête a expiré (délai de 30 s dépassé).\nEnka Network ou le proxy est peut-être surchargé. Réessayez dans quelques instants.");
        } else if (e.message === '404') {
            alert("Aucun compte trouvé pour cet UID (404).\nVérifiez que l'identifiant est correct.");
        } else if (e.message === '429') {
            alert("Trop de requêtes envoyées (429 — Rate Limit).\nPatientez quelques secondes avant de réessayer.");
        } else if (e.message === 'SERVER') {
            alert("Le serveur Enka ou le proxy est temporairement indisponible.\nRéessayez dans quelques minutes.");
        } else {
            alert("Impossible de récupérer les données.\nVérifiez votre connexion ou réessayez plus tard.");
        }
    }
}

function renderPlayerProfile(playerInfo, uid) {
    const container = document.getElementById('player-profile');
    if (!container || !playerInfo) return;

    const namecardsData = window.namecardsData || {};
    const namecard = namecardsData[String(playerInfo.nameCardId)];
    let bannerUrl = '';
    if (namecard && namecard.Icon) bannerUrl = `https://enka.network${namecard.Icon}`;

    let profilePicUrl = 'https://enka.network/ui/UI_AvatarIcon_PlayerBoy_Circle.png';
    const pp = playerInfo.profilePicture || {};
    if (pp.id) {
        const pfp = (window.pfpsData || {})[String(pp.id)];
        if (pfp && pfp.IconPath) profilePicUrl = `https://enka.network${pfp.IconPath}`;
    } else if (pp.avatarId && charData && charData[pp.avatarId]) {
        const info = charData[pp.avatarId];
        const getKey = (o, k) => o?.[k] !== undefined ? o[k] : o?.[k[0].toLowerCase() + k.slice(1)];
        let raw = getKey(info, 'IconName') || getKey(info, 'SideIconName') || getKey(info, 'icon');
        if (raw) {
            if (raw.startsWith('/ui/')) {
                profilePicUrl = `https://enka.network${raw.replace('UI_AvatarIcon_Side_', 'UI_AvatarIcon_').replace(/\.png$/i, '_Circle.png')}`;
            } else {
                const n = raw.replace(/^.*UI_AvatarIcon_Side_/, '').replace(/^.*UI_AvatarIcon_/, '').replace(/\.png$/i, '');
                profilePicUrl = `https://enka.network/ui/UI_AvatarIcon_${n}_Circle.png`;
            }
        }
    }

    const serverMap = {
        '1': 'CN',
        '2': 'CN',
        '3': 'CN',
        '4': 'CN',
        '5': 'TW',
        '6': 'NA',
        '7': 'EU',
        '8': 'Asia',
        '9': 'TW'
    };
    const server = serverMap[String(uid)[0]] || 'CN';

    const nickname = playerInfo.nickname || 'Joueur inconnu';
    const signature = playerInfo.signature || '';
    const ar = playerInfo.level || 0;
    const achievements = playerInfo.finishAchievementNum ?? null;
    const abyssStars = playerInfo.towerStarIndex ?? null;
    const theaterStars = playerInfo.theaterStarIndex ?? null;
    const stygianIndex = playerInfo.stygianIndex ?? null;
    const stygianSec = (playerInfo.stygianSeconds > 0) ? playerInfo.stygianSeconds : null;

    saveRecentProfile(uid, playerInfo, profilePicUrl, bannerUrl);
    const ICON = './assets/simulator/icons/';

    function stygianIcon() {
        if (stygianIndex === null) return '';
        if (stygianIndex === 6 && stygianSec !== null && stygianSec < 180) {
            return `<img src="${ICON}stygian_difficulty_6_minus_180.webp" class="pp-icon" alt="stygian">`;
        }
        if (stygianIndex >= 1 && stygianIndex <= 6) {
            return `<img src="${ICON}stygian_difficulty_${stygianIndex}.webp" class="pp-icon" alt="stygian">`;
        }
        return '';
    }

    const row1 = [
        `<span class="pp-badge pp-badge-server">${server}</span>`,
        achievements !== null
            ? `<span class="pp-badge pp-badge-achievements"><img src="${ICON}icon_achievements.webp" class="pp-icon" alt="succès">${achievements.toLocaleString()}</span>`
            : '',
        ar ? `<span class="pp-badge pp-badge-ar">AR${ar}</span>` : '',
    ].filter(Boolean).join('');

    const row2Items = [
        stygianSec !== null
            ? `<span class="pp-badge pp-badge-stygian">${stygianIcon()}${stygianSec}s</span>`
            : '',
        theaterStars !== null
            ? `<span class="pp-badge pp-badge-theater"><img src="${ICON}icon_theater_star.webp" class="pp-icon" alt="théâtre">${theaterStars}</span>`
            : '',
        abyssStars !== null
            ? `<span class="pp-badge pp-badge-abyss"><img src="${ICON}icon_abyss_star.webp" class="pp-icon" alt="abysses">${abyssStars}</span>`
            : '',
    ].filter(Boolean);
    const row2 = row2Items.join('');

    container.innerHTML = `
        <div class="player-profile-card">
            <div class="player-profile-bg" ${bannerUrl ? `style="background-image:url('${bannerUrl}')"` : ''}></div>
            <!--<div class="player-profile-gradient"></div>-->
            <div class="player-profile-content">
                <img class="player-profile-avatar"
                     src="${profilePicUrl}" alt="Avatar"
                     onerror="this.src='https://enka.network/ui/UI_AvatarIcon_PlayerBoy_Circle.png'">
                <div class="player-profile-identity">
                    <div class="player-profile-name-row">
                        <span class="player-profile-name">${nickname}</span>
                        <!--<span class="player-profile-uid">${uid}</span>-->
                    </div>
                    ${signature ? `<span class="player-profile-sig">${signature}</span>` : ''}
                </div>
                <div class="player-profile-stats">
                    <div class="pp-row">${row1}</div>
                    ${row2 ? `<div class="pp-row">${row2}</div>` : ''}
                </div>
            </div>
        </div>
    `;
}

function getText(hash) {
    if (!hash) return "Inconnu";
    if (!locData) return "Chargement...";
    const lang = locData["fr"] ? "fr" : (locData["en"] ? "en" : Object.keys(locData)[0]);
    const key = String(hash);
    const val = locData[lang] ? locData[lang][key] : null;
    if (val) {
        return val.replace(/<[^>]*>/g, "");
    }
    return "Inconnu";
}

function formatValueDisplay(key, val) {
    if (['hp', 'atk', 'def', 'eleMas'].includes(key)) return Math.round(val).toLocaleString();
    return val.toFixed(1) + '%';
}

function formatStat(propId, value) {
    let key = STAT_MAPPING[propId];
    if (!key && (STAT_LABELS[propId] || propId === 'dmgBonus')) key = propId;
    if (!key) return {key: "unknown", value: value, label: propId, icon: createIcon("unknown")};

    let val = value;
    let isPercent = false;
    if (key.endsWith('_') || ['critRate_', 'critDMG_', 'enerRech_', 'heal_'].includes(key)) {
        isPercent = true;
        if (val < 1.0) val = val * 100;
    }

    const iconHtml = createIcon(key);

    const label = STAT_LABELS[key] || key;

    return {
        key,
        value: val,
        label,
        icon: iconHtml,
        isPercent
    };
}

function calculateBuffedStats(baseStats, currentStats, buffsList) {
    let buffed = {...currentStats};
    buffsList.forEach(buff => {
        if (buff.active) applyBonus(buffed, baseStats, buff.bonuses, false);
    });
    buffsList.forEach(buff => {
        if (buff.active) applyBonus(buffed, baseStats, buff.bonuses, true);
    });
    return buffed;
}

function applyBonus(buffed, baseStats, bonuses, processScaling) {
    for (const [statKey, val] of Object.entries(bonuses)) {
        if (typeof val === 'object') {
            if (!processScaling) continue;
            if (statKey.endsWith('_scaling')) {
                const targetStatRaw = statKey.replace('_bonus_scaling', '');
                const targetStat = getShortKey(targetStatRaw) || mapTargetKey(targetStatRaw);
                const sourceStat = mapTargetKey(val.source);
                if (targetStat && sourceStat) {
                    const rawValue = buffed[sourceStat] || 0;
                    const baseline = val.baseline || 0;
                    const sourceValue = Math.max(0, rawValue - baseline);
                    let bonusValue = sourceValue * val.percent;

                    if (val.max !== undefined) {
                        bonusValue = Math.min(bonusValue, val.max);
                    }

                    buffed[targetStat] = (buffed[targetStat] || 0) + bonusValue;
                }
            }
        } else {
            if (processScaling) continue;
            if (statKey === "atk_") buffed.atk += baseStats.atk * val;
            else if (statKey === "atk") buffed.atk += val;
            else if (statKey === "hp_") buffed.hp += baseStats.hp * val;
            else if (statKey === "hp") buffed.hp += val;
            else if (statKey === "def_") buffed.def += baseStats.def * val;
            else if (statKey === "def") buffed.def += val;
            else if (statKey === "critRate_" || statKey === "critDMG_" || statKey === "enerRech_") {
                let shortKey = getShortKey(statKey);
                if (shortKey) buffed[shortKey] += val * 100;
            } else if (statKey === "eleMas") {
                buffed.em += val;
            } else if (statKey === buffed.dmgBonusKey || statKey === 'elemental_dmg_') {
                buffed.dmgBonus += val * 100;
            } else if (statKey.endsWith('_dmg_')) {
                buffed[statKey] = (buffed[statKey] || 0) + val * 100;
            }
        }
    }
}

function getShortKey(longKey) {
    if (longKey === "critRate_") return "cr";
    if (longKey === "critDMG_") return "cd";
    if (longKey === "enerRech_") return "er";
    return null;
}

function mapTargetKey(keyPart) {
    if (keyPart === 'atk') return 'atk';
    if (keyPart === 'hp') return 'hp';
    if (keyPart === 'def') return 'def';
    if (keyPart === 'eleMas') return 'em';
    if (keyPart === 'enerRech' || keyPart === 'enerRech_') return 'er';
    if (keyPart === 'elemental_dmg' || keyPart === 'elemental_dmg_') return 'dmgBonus';
    if (keyPart.endsWith('_dmg') || keyPart.endsWith('_dmg_')) {
        return keyPart.endsWith('_') ? keyPart : keyPart + '_';
    }
    return null;
}

function toggleBuff(charIndex, buffIndex) {
    const p = globalPersoData[charIndex];
    if (!p) return;

    let currentScroll = 0;
    const scrollContainer = document.querySelector('.equipment-area .card-buff-list-container');
    if (scrollContainer) currentScroll = scrollContainer.scrollTop;

    const targetBuff = p.buffs[buffIndex];
    const mode = targetBuff.selectMode || 'standard';

    const willBeActive = !targetBuff.active;

    if (mode === 'exclusive') {
        if (willBeActive) {
            p.buffs.forEach(b => {
                if (b.category === targetBuff.category) b.active = false;
            });
            targetBuff.active = true;
        } else {
            targetBuff.active = false;
        }
    } else if (mode === 'cumulative') {
        const groupBuffs = p.buffs.filter(b => b.category === targetBuff.category);
        const targetIndexInGroup = groupBuffs.indexOf(targetBuff);

        if (willBeActive) {
            groupBuffs.forEach((b, idx) => {
                if (idx <= targetIndexInGroup) b.active = true;
            });
        } else {
            groupBuffs.forEach((b, idx) => {
                if (idx >= targetIndexInGroup) b.active = false;
            });
        }
    } else {
        targetBuff.active = willBeActive;
    }

    p.buffedStats = calculateBuffedStats(p.baseStats, p.combatStats, p.buffs);
    renderShowcase(charIndex);

    setTimeout(() => {
        const newContainer = document.querySelector('.equipment-area .card-buff-list-container');
        if (newContainer) newContainer.scrollTop = currentScroll;
    }, 0);
}

function generateScoreBar(totalRolls, currentGrade, maxPossibleRolls = 45) {
    if (maxPossibleRolls <= 0) maxPossibleRolls = 45;
    const maxScale = maxPossibleRolls || 45;
    const percent = Math.min((totalRolls / maxScale) * 100, 100);

    const labels = [
        "F", "F+", "D", "D+", "C", "C+", "B", "B+", "A", "A+",
        "S", "S+", "SS", "SS+", "SSS", "SSS+", "WTF", "WTF+", `ARCHON (${maxScale})`
    ];

    const steps = labels.length - 1;
    const interval = maxScale / steps;

    let markers = labels.map((label, index) => ({
        val: parseFloat((index * interval).toFixed(2)),
        label: label
    }));

    let markersHtml = "";
    markers.forEach(m => {
        const left = (m.val / maxScale) * 100;
        markersHtml += `<div class="score-marker" style="left: ${left}%;">${m.label}</div>`;
    });

    return `
        <div class="score-bar-container">
            <div class="score-bar-track">
                ${markersHtml}
                <div class="score-cursor" style="left: ${percent}%;">
                    <div class="score-cursor-label" style="background:none; padding:0; border:none; box-shadow:none; display:flex; align-items:baseline; gap:6px; white-space:nowrap; transform: translateX(-50%); bottom: 25px;">
                        <span style="font-size:1.2rem; font-weight:800; color:var(--accent-gold); line-height:1;">${currentGrade}</span>
                        <span style="font-size:0.85rem; color:#ddd;">(${totalRolls} Rolls)</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function calculateMaxTheoreticalScore(persoObj, config) {
    if (!config || !config.weights || !window.MAX_ROLLS) {
        return {score: 100, totalRolls: 45};
    }

    const forbiddenSubStats = ["heal_", "physical_dmg_"];

    const sortedSubWeights = Object.entries(config.weights)
        .filter(([key, w]) => w > 0 && !key.includes("_dmg_") && !forbiddenSubStats.includes(key))
        .sort((a, b) => b[1] - a[1]);

    if (sortedSubWeights.length === 0) return {score: 0, totalRolls: 0};

    let maxTotalRolls = 0;

    let perfectArtefacts = persoObj.artefacts.map(art => {

        let idealMainStatKey = art.mainStat.key;

        if (art.type === "EQUIP_BRACER") {
            idealMainStatKey = "hp";
        } else if (art.type === "EQUIP_NECKLACE") {
            idealMainStatKey = "atk";
        } else {
            if (config.idealMainStats && config.idealMainStats[art.type] && config.idealMainStats[art.type].length > 0) {
                idealMainStatKey = config.idealMainStats[art.type][0];
            } else {
                const possibleMains = SLOT_POSSIBLE_MAIN_STATS[art.type] || [];
                let bestW = -1;
                possibleMains.forEach(stat => {
                    let w = config.weights[stat];
                    if (w === undefined && stat.includes("_dmg_")) w = config.weights["elemental_dmg_"];
                    w = w || 0;
                    if (w > bestW) {
                        bestW = w;
                        idealMainStatKey = stat;
                    }
                });
            }
        }

        const perfectMainStat = {
            key: idealMainStatKey,
            value: 0,
            label: STAT_LABELS[idealMainStatKey] || idealMainStatKey
        };

        const availableStats = sortedSubWeights.filter(sw => sw[0] !== perfectMainStat.key);

        const topStats = availableStats.slice(0, 4);
        let fakeSubStats = [];

        if (topStats.length > 0) {
            const bestStat = topStats[0];
            fakeSubStats.push({
                key: bestStat[0],
                value: window.MAX_ROLLS[bestStat[0]] * 6
            });
            maxTotalRolls += 6;

            for (let i = 1; i < topStats.length; i++) {
                fakeSubStats.push({
                    key: topStats[i][0],
                    value: window.MAX_ROLLS[topStats[i][0]] * 1
                });
                maxTotalRolls += 1;
            }
        }

        return {...art, subStats: fakeSubStats, mainStat: perfectMainStat};
    });

    let fakePerso = {...persoObj, artefacts: perfectArtefacts, isSimulation: true};
    let simulation = calculateCharacterScore(fakePerso, config);

    return {
        score: simulation.score / simulation.setMultiplier,
        totalRolls: parseFloat(simulation.totalRolls)
    };
}

function getCritAdvice(cr, cd, config) {
    const crWeight = (config && config.weights && config.weights['critRate_']) || 0;

    if (crWeight < 1) {
        return {color: '#888', msg: "Ce personnage ne dépend pas des statistiques critiques."};
    }

    const roundedCR = Math.round(cr * 10) / 10;
    const roundedCD = Math.round(cd);

    if (roundedCR > 100) return {
        color: '#ef4444',
        msg: `Taux CRIT excédentaire (${cr.toFixed(1)}%). Le surplus a été déduit de votre score global.`
    };

    if (roundedCR === 100) return {color: '#00FFFF', msg: `Taux CRIT parfait. Misez absolument tout sur les DGT CRIT.`};

    if (roundedCR >= 90) {
        if (roundedCD < 160) return {
            color: '#eab308',
            msg: `Taux CRIT excellent (${roundedCR}%), mais vos DGT CRIT (${roundedCD}%) sont trop faibles. Rééquilibrez !`
        };
        return {color: '#22c55e', msg: "Taux CRIT largement suffisant (plus de 90%). Cherchez un maximum de DGT CRIT."};
    }

    if (roundedCR >= 80) return {
        color: '#22c55e',
        msg: "Taux CRIT suffisant (plus de 80%). En obtenir plus est utile, mais le DGT CRIT devient prioritaire."
    };

    if (roundedCR >= 70) {
        if (roundedCD > 200) return {
            color: '#f97316',
            msg: `Vous avez beaucoup de DGT CRIT (${roundedCD}%) mais votre Taux CRIT (${roundedCR}%) est trop bas pour en profiter !`
        };
        return {color: '#eab308', msg: "Taux CRIT passable (plus de 70%). Essayez de vous rapprocher des 80%."};
    }

    if (roundedCR >= 60) return {
        color: '#f97316',
        msg: "Taux CRIT insuffisant (plus de 60%). Vos grosses attaques rateront trop souvent leur coup critique."
    };

    return {
        color: '#ef4444',
        msg: "Taux CRIT largement insuffisant (moins de 60%). Fixez ce problème d'urgence avant de chercher d'autres stats."
    };
}

function getSetRecommendation(activeSets, config) {
    if (!config || !config.bestSets || config.bestSets.length === 0) return null;
    const hasBest = activeSets.some(s => config.bestSets.includes(s));
    if (hasBest) return {type: 'success', msg: "Vous utilisez le meilleur set recommandé !"};
    const hasGood = config.goodSets && activeSets.some(s => config.goodSets.includes(s));
    const recommended = config.bestSets[0].split(':')[0];
    const recName = Object.keys(SET_NAME_MAPPING).find(key => SET_NAME_MAPPING[key] === recommended) || recommended;
    if (hasGood) return {type: 'info', msg: `Set correct, mais <b>${recName} (4p)</b> serait optimal.`};
    return {type: 'warning', msg: `Set non optimal. Visez <b>${recName} (4p)</b> pour maximiser les dégâts.`};
}

function getMainStatAdvice(persoObj, config) {
    const slotsToCheck = ["EQUIP_SHOES", "EQUIP_RING", "EQUIP_DRESS"];
    let warnings = [];

    if (!config.idealMainStats) return null;

    persoObj.artefacts.forEach(art => {
        if (!slotsToCheck.includes(art.type)) return;

        const currentKey = art.mainStat.key;
        const allowedMainStats = config.idealMainStats[art.type] || [];

        if (!allowedMainStats.includes(currentKey)) {
            const pieceName = ARTIFACT_TYPE_MAPPING[art.type] || art.type;

            const cleanList = allowedMainStats.map(statKey => STAT_LABELS[statKey] || statKey).join(" / ");

            warnings.push({
                piece: pieceName,
                current: art.mainStat.label,
                better: cleanList
            });
        }
    });

    if (warnings.length > 0) {
        return {
            type: "critical",
            title: "Problème Statistique Principale",
            details: warnings
        };
    } else {
        return {
            type: "success",
            title: "Statistiques Principales",
            msg: "Votre sablier, votre coupe et votre diadème ont tous les trois une statistique principale optimale."
        };
    }
}

function getFarmDifficulty(pieceType, mainStatKey) {
    if (pieceType === "EQUIP_BRACER" || pieceType === "EQUIP_NECKLACE") {
        return {label: "Facile", color: "#3b82f6"};
    }

    const rates = MAINSTAT_DROP_RATES[pieceType];
    if (!rates || !rates[mainStatKey]) return {label: "Relativement difficile", color: "#eab308"};

    const probability = rates[mainStatKey];

    if (probability >= 19) return {label: "Relativement facile", color: "#22c55e"};
    if (probability >= 10) return {label: "Relativement difficile", color: "#eab308"};
    if (probability >= 5) return {label: "Difficile", color: "#f97316"};
    return {label: "Très difficile", color: "#ef4444"};
}

function getOffPieceAdvice(persoObj) {
    const fullSetKey = Object.keys(persoObj.setsCounter).find(key => persoObj.setsCounter[key] === 5);

    if (fullSetKey) {
        const setPieces = persoObj.artefacts.filter(art => art.setKey === fullSetKey);
        setPieces.sort((a, b) => (a.score || 0) - (b.score || 0));
        const worstPiece = setPieces[0];

        const rawName = ARTIFACT_TYPE_MAPPING[worstPiece.type] || "Pièce";

        const setNameFR = Object.keys(SET_NAME_MAPPING).find(k => SET_NAME_MAPPING[k] === fullSetKey) || fullSetKey;

        return {
            type: "info",
            msg: `Vous utilisez 5 pièces du set <b>${setNameFR}</b>. Votre <b style="color: #aaa;">${rawName}</b> étant statistiquement la plus faible (Score: ${Math.round(worstPiece.score || 0)}), vous devriez la remplacer par une meilleure pièce hors-set.`
        };
    }

    let offPiece = null;
    let setPiecesScores = [];

    const activeSetKeys = Object.keys(persoObj.setsCounter).filter(key => persoObj.setsCounter[key] >= 2);

    persoObj.artefacts.forEach(art => {
        if (activeSetKeys.includes(art.setKey)) {
            setPiecesScores.push(art.score);
        } else {
            offPiece = art;
        }
    });

    if (!offPiece || setPiecesScores.length === 0) return null;

    const rawName = ARTIFACT_TYPE_MAPPING[offPiece.type] || "Pièce";
    const avgSetScore = setPiecesScores.reduce((a, b) => a + b, 0) / setPiecesScores.length;
    const isHardMainStat = offPiece.mainStat.key.includes("dmg_") || offPiece.mainStat.key.includes("crit");

    if (offPiece.score > avgSetScore) {
        return {
            type: "success",
            msg: `Excellente pièce hors-set <b style="color: #aaa;">(${rawName})</b>. Cette dernière porte votre build vers le haut.`
        };
    } else if (isHardMainStat && offPiece.score > (avgSetScore * 0.8)) {
        return {
            type: "warning",
            msg: `Votre pièce hors-set <b style="color: #aaa;">(${rawName})</b> suffit pour l'instant en vue de la rareté de sa stat principale.`
        };
    } else {
        return {
            type: "error",
            msg: `Votre pièce hors-set <b style="color: #aaa;">(${rawName})</b> est moins bonne que le reste. Vous devriez en chercher une autre dans votre inventaire ou permettre à une autre pièce d'être hors-set.`
        };
    }
}

function getTalentAdvice(persoObj, config) {
    if (!config.talents) return null;
    const target = config.talents;
    const current = {auto: 0, skill: 0, burst: 0};

    if (persoObj.talents.length >= 3) {
        current.auto = persoObj.talents[0].level;
        current.skill = persoObj.talents[1].level;
        current.burst = persoObj.talents[2].level;
    }

    let advices = [];
    let isPerfect = true;

    const check = (type, label) => {
        const lvl = current[type];
        const goal = target[type];
        if (goal <= 1) return;

        const diff = goal - lvl;
        if (diff >= 2) {
            isPerfect = false;
            advices.push({
                type: "critical",
                msg: `Améliorer votre <b style="color: #aaa;">${label}</b> au niv ${goal} est important pour ce personnage.`
            });
        } else if (diff >= 1) {
            isPerfect = false;
            advices.push({
                type: "info",
                msg: `Améliorer votre <b style="color: #aaa;">${label}</b> au niveau ${goal} est recommandé pour ce personnage.`
            });
        }
    };

    check('auto', 'Attaque Normale');
    check('skill', 'Compétence');
    check('burst', 'Déchaînement');

    if (isPerfect && advices.length === 0) {
        return [{type: "success", msg: "Vos aptitudes sont au niveau recommandé."}];
    }

    return advices;
}

function getSetForcingAdvice(persoObj, config) {
    let active4pSet = null;

    const charLikes2p2p = config.bestSets && config.bestSets.some(setStr => setStr.includes(":2"));

    for (const [setKey, count] of Object.entries(persoObj.setsCounter)) {
        if (count >= 4) {
            active4pSet = setKey;
            break;
        }
    }

    if (!active4pSet) {
        if (charLikes2p2p) {
            return {
                type: "success",
                title: "Pas de forçage de set d'artéfacts",
                msg: "Set d'artéfacts 2 pièces / 2 pièces optimal et de bonne qualité."
            };
        }
        return {
            type: "success",
            title: "Pas de forçage de set d'artéfacts",
            msg: "Vous utilisez un build arc-en-ciel."
        };
    }

    const setPieces = persoObj.artefacts.filter(a => a.setKey === active4pSet);
    const totalScore = setPieces.reduce((sum, art) => sum + art.score, 0);
    const avgScore = totalScore / setPieces.length;

    if (avgScore < 25) {
        let warningMsg = `Vous forcez un set d'artéfacts de 4 pièces avec des artéfacts faibles. Vous devriez essayer une alternative.`;

        if (charLikes2p2p) {
            warningMsg += `Ce personnage fonctionne très bien en set d'artéfacts 2 pièces / 2 pièces, n'hésitez pas à casser votre set d'artéfacts actuel pour de meilleures stats.`;
        }

        return {
            type: "warning",
            title: "Forçage de set d'artéfacts",
            msg: warningMsg
        };
    } else {
        return {
            type: "success",
            title: "Pas de forçage de set d'artéfacts",
            msg: `Set d'artéfacts optimal et de bonne qualité.`
        };
    }
}

function getMetaSetAdvice(persoObj, config) {
    if (!config.bestSets || config.bestSets.length === 0) return null;

    const isSetEquipped = (setList) => {
        if (!setList) return false;
        return setList.some(setStr => {
            const [key, count] = setStr.split(":");
            return (persoObj.setsCounter[key] || 0) >= parseInt(count);
        });
    };

    if (isSetEquipped(config.bestSets)) {
        return {
            type: "success",
            title: "Choix du set d'artéfacts",
            msg: "Vous utilisez l'un des meilleurs sets d'artéfacts recommandés pour ce personnage."
        };
    }

    const [recKey, recCount] = config.bestSets[0].split(":");
    const recNameFR = Object.keys(SET_NAME_MAPPING).find(k => SET_NAME_MAPPING[k] === recKey) || recKey;
    const recommendationStr = `<b>${recNameFR} (${recCount} pièces)</b>`;

    if (isSetEquipped(config.goodSets)) {
        return {
            type: "info",
            title: "Optimisation du set d'artéfacts",
            msg: `Votre set actuel est correct, mais pour maximiser le build, le set d'artéfacts recommandé est : ${recommendationStr}.`
        };
    }

    return {
        type: "warning",
        title: "Problème de set d'artéfacts",
        msg: `Votre set d'artéfacts actuel ne correspond pas aux standards du personnage. Vous devriez opter pour le set d'artéfacts ${recommendationStr}.`
    };
}

function getWeaponAdvice(persoObj) {
    if (!persoObj.weapon) return null;

    if (persoObj.weapon.level < 90) {
        return {
            type: "warning",
            title: "Niveau de l'arme",
            msg: `Améliorez votre arme au niveau 90 pour maximiser son ATQ de base et sa statistique additionnelle.`
        };
    } else {
        return {
            type: "success",
            title: "Niveau de l'arme",
            msg: `Votre arme est au niveau maximum.`
        };
    }
}

function getERAdvice(currentER, targetER) {
    const diff = currentER - targetER;

    if (diff >= -10 && diff <= 15) {
        return {
            type: "success",
            title: "Recharge d'Énergie",
            msg: `Votre ER (${currentER.toFixed(0)}%) est idéale pour cet archétype (Cible : ${targetER}%).`
        };
    }

    if (diff < -10) {
        return {
            type: "warning",
            title: "Manque de Recharge d'Énergie",
            msg: `Vous avez ${currentER.toFixed(0)}% d'ER, mais cet archétype demande environ <b>${targetER}%</b>. Vos rotations risquent de bloquer.`
        };
    }

    if (diff > 15) {
        return {
            type: "info",
            title: "Excès de Recharge d'Énergie",
            msg: `Vous avez ${currentER.toFixed(0)}% d'ER, ce qui est bien au-dessus du nécessaire (${targetER}%). Essayez de troquer de l'ER contre des stats offensives.`
        };
    }
}

function getLevelAdvice(persoObj) {
    if (persoObj.level < 90) {
        return {
            type: "info",
            title: "Niveau du Personnage",
            msg: `Améliorez votre personnage au niveau 90 pour maximiser ses statistiques.`
        };
    } else {
        return {
            type: "success",
            title: "Niveau du Personnage",
            msg: `Votre personnage est au niveau maximum.`
        };
    }
}


function calculateRollDistribution(persoObj, config) {
    if (!config || !config.weights) return {usefulCount: 0, deadCount: 0, total: 0, usefulDetails: [], deadDetails: []};

    let usefulCount = 0;
    let deadCount = 0;

    let usefulMap = {};
    let deadMap = {};

    persoObj.artefacts.forEach(art => {
        art.subStats.forEach(sub => {
            let w = config.weights[sub.key];
            if (w === undefined && sub.key.includes("_dmg_")) w = config.weights["elemental_dmg_"];

            const rolls = getRollCount(sub.key, sub.value, art.stars || 5);

            if (rolls > 0) {
                if (w && w > 0) {
                    usefulCount += rolls;
                    usefulMap[sub.key] = (usefulMap[sub.key] || 0) + rolls;
                } else {
                    deadCount += rolls;
                    deadMap[sub.key] = (deadMap[sub.key] || 0) + rolls;
                }
            }
        });
    });

    const toSortedArray = (map) => {
        return Object.entries(map)
            .map(([key, count]) => ({
                label: STAT_LABELS[key] || key,
                count: count,
                key: key
            }))
            .sort((a, b) => b.count - a.count);
    };

    return {
        usefulCount,
        deadCount,
        total: usefulCount + deadCount,
        usefulDetails: toSortedArray(usefulMap),
        deadDetails: toSortedArray(deadMap)
    };
}

function calculateDeadRolls(persoObj, config) {
    if (!config || !config.weights) return {count: 0, details: []};
    let deadRolls = 0;
    let deadStatsCounts = {};
    persoObj.artefacts.forEach(art => {
        art.subStats.forEach(sub => {
            let w = config.weights[sub.key];
            if (w === undefined && sub.key.includes("_dmg_")) w = config.weights["elemental_dmg_"];
            if (!w || w === 0) {
                const rolls = getRollCount(sub.key, sub.value, art.stars || 5);
                deadRolls += rolls;
                deadStatsCounts[sub.key] = (deadStatsCounts[sub.key] || 0) + rolls;
            }
        });
    });
    const details = Object.entries(deadStatsCounts)
        .filter(([_, count]) => count > 0)
        .map(([key, count]) => ({label: STAT_LABELS[key] || key, count: count}))
        .sort((a, b) => b.count - a.count);
    return {count: deadRolls, details: details};
}

function getAllCrossCheckAdvice(charIndex) {
    const SLOT_ORDER = ["EQUIP_BRACER", "EQUIP_NECKLACE", "EQUIP_SHOES", "EQUIP_RING", "EQUIP_DRESS"];
    const currChar = globalPersoData[charIndex];
    if (!currChar || !currChar.artefacts) return SLOT_ORDER.map(() => null);

    const scoringConfig = {...currChar.charConfig, ...(currChar.activeBuild || {})};
    const active4pSet = Object.keys(currChar.setsCounter || {}).find(key => currChar.setsCounter[key] >= 4);
    const active4pCount = active4pSet ? currChar.setsCounter[active4pSet] : 0;

    return SLOT_ORDER.map(slotType => {
        const currArtIndex = currChar.artefacts.findIndex(a => a.type === slotType);
        if (currArtIndex === -1) return null;
        const currArt = currChar.artefacts[currArtIndex];

        let bestSwap = null;
        let maxDiff = 10;

        globalPersoData.forEach((otherChar, otherIndex) => {
            if (otherIndex === charIndex) return;

            otherChar.artefacts.forEach(otherArt => {
                if (otherArt.type !== slotType) return;

                let mWeight = scoringConfig.weights[otherArt.mainStat.key];
                if (mWeight === undefined && otherArt.mainStat.key.includes("_dmg_")) {
                    mWeight = scoringConfig.weights["elemental_dmg_"];
                }
                if (!mWeight || mWeight < 1) return;

                if (active4pSet) {
                    const isCurrArtSetPiece = (currArt.setKey === active4pSet);
                    if (isCurrArtSetPiece && active4pCount === 4) {
                        if (otherArt.setKey !== active4pSet) return;
                    }
                }

                const clonedOtherArt = JSON.parse(JSON.stringify(otherArt));
                const fakeArtefacts = currChar.artefacts.map(a => ({...a}));
                fakeArtefacts[currArtIndex] = clonedOtherArt;
                const fakePerso = {...currChar, artefacts: fakeArtefacts};
                const newCurrEval = calculateCharacterScore(fakePerso, scoringConfig);
                const scoredNewArt = fakePerso.artefacts[currArtIndex];
                const diff = scoredNewArt.score - currArt.score;

                if (diff > maxDiff) {
                    if (newCurrEval.score <= currChar.evaluation.score) return;

                    maxDiff = diff;

                    const otherScoringConfig = {...otherChar.charConfig, ...(otherChar.activeBuild || {})};
                    const fakeOtherArtefacts = otherChar.artefacts.map(a => ({...a}));
                    const otherArtIndex = otherChar.artefacts.findIndex(a => a.type === slotType);
                    fakeOtherArtefacts[otherArtIndex] = JSON.parse(JSON.stringify(currArt));
                    const fakeOtherPerso = {...otherChar, artefacts: fakeOtherArtefacts};
                    const newOtherEval = calculateCharacterScore(fakeOtherPerso, otherScoringConfig);

                    const currSubMap = {};
                    currArt.subStats.forEach(s => {
                        currSubMap[s.key] = s.value;
                    });
                    const newSubMap = {};
                    scoredNewArt.subStats.forEach(s => {
                        newSubMap[s.key] = s.value;
                    });
                    const allKeys = new Set([...Object.keys(currSubMap), ...Object.keys(newSubMap)]);
                    const deltas = [];
                    allKeys.forEach(key => {
                        const oldVal = currSubMap[key] || 0;
                        const newVal = newSubMap[key] || 0;
                        const delta = newVal - oldVal;
                        if (Math.abs(delta) < 0.01) return;
                        const label = STAT_LABELS[key] || key;
                        const isPercent = key.endsWith("_");
                        const formatted = isPercent
                            ? `${delta > 0 ? "+" : ""}${delta.toFixed(1)}% ${label}`
                            : `${delta > 0 ? "+" : ""}${Math.round(delta)} ${label}`;
                        deltas.push({delta, formatted});
                    });
                    deltas.sort((a, b) => b.delta - a.delta);

                    bestSwap = {
                        currArt, newArt: scoredNewArt, diff, deltas,
                        currCharName: currChar.nom, currCharIcon: currChar.image,
                        otherCharName: otherChar.nom, otherCharIcon: otherChar.image,
                        currEvalOld: currChar.evaluation, currEvalNew: newCurrEval,
                        otherEvalOld: otherChar.evaluation, otherEvalNew: newOtherEval
                    };
                }
            });
        });

        return bestSwap;
    });
}

function getResinCostEstimate(pieceType, mainStatKey, currentScore) {
    const pSetAndPiece = 0.5 * 0.2;

    let pMainStat = 1.0;
    if (pieceType !== "EQUIP_BRACER" && pieceType !== "EQUIP_NECKLACE") {
        const rates = MAINSTAT_DROP_RATES[pieceType];
        if (rates && rates[mainStatKey]) {
            pMainStat = rates[mainStatKey] / 100;
        } else {
            pMainStat = 0.05;
        }
    }

    const expectedArtifacts = 1 / (pSetAndPiece * pMainStat);

    let baseResin = expectedArtifacts * 20;

    let safeScore = Math.max(10, currentScore);
    let difficultyMultiplier = Math.pow(safeScore / 20, 2.5);

    const totalResin = Math.round(baseResin * difficultyMultiplier);
    const daysOfFarm = Math.ceil(totalResin / 180);

    let formattedResin = totalResin > 1000 ? (totalResin / 1000).toFixed(1) + 'k' : totalResin;

    return {
        resin: formattedResin,
        days: daysOfFarm,
        rawResin: totalResin
    };
}

function getPriorities(persoObj) {
    if (!persoObj.artefacts || persoObj.artefacts.length === 0) return [];

    const activeSets = Object.keys(persoObj.setsCounter || {}).filter(key => persoObj.setsCounter[key] >= 2);

    const sorted = [...persoObj.artefacts].sort((a, b) => a.score - b.score);

    return sorted.slice(0, 3).map(art => {
        const typeName = ARTIFACT_TYPE_MAPPING[art.type] || art.type;

        const isOffPiece = !activeSets.includes(art.setKey);

        return {
            piece: typeName,
            score: art.score,
            grade: art.grade.letter,
            color: art.grade.color,
            type: art.type,
            mainKey: art.mainStat.key,
            setName: art.setName,
            mainLabel: art.mainStat.label,
            isOffPiece: isOffPiece
        };
    });
}

function calculateRNGQuality(persoObj, config) {
    if (!config || !config.weights || !window.MAX_ROLLS) return 0;
    let totalPct = 0;
    let count = 0;
    persoObj.artefacts.forEach(art => {
        art.subStats.forEach(sub => {
            let w = config.weights[sub.key];
            if (w === undefined && sub.key.includes("_dmg_")) w = config.weights["elemental_dmg_"];
            if (w && w > 0) {
                const maxRollsRef = (art.stars === 4 && window.MAX_ROLLS_4) ? window.MAX_ROLLS_4 : window.MAX_ROLLS;
                const maxVal = maxRollsRef[sub.key];
                if (maxVal) {
                    const rolls = getRollCount(sub.key, sub.value, art.stars || 5);
                    if (rolls > 0) {
                        const theoreticalMax = rolls * maxVal;
                        totalPct += (sub.value / theoreticalMax);
                        count++;
                    }
                }
            }
        });
    });
    return count > 0 ? (totalPct / count) * 100 : 0;
}

function simulateDeadStatReplacements(persoObj, config) {
    if (!config || !config.weights) return [];
    let suggestions = [];

    persoObj.artefacts.forEach(art => {
        let deadStats = [];
        let presentStats = new Set();

        art.subStats.forEach(sub => {
            presentStats.add(sub.key);
            let w = config.weights[sub.key];
            if (w === undefined && sub.key.includes("_dmg_")) w = config.weights["elemental_dmg_"];

            if (!w || w === 0) {
                const rolls = getRollCount(sub.key, sub.value, art.stars || 5);
                if (rolls > 0) {
                    deadStats.push({
                        key: sub.key,
                        rolls: rolls,
                        label: STAT_LABELS[sub.key] || sub.key
                    });
                }
            }
        });

        if (deadStats.length === 0) return;

        const desiredStats = Object.entries(config.weights)
            .filter(([key, w]) => w > 0)
            .sort((a, b) => b[1] - a[1])
            .map(([key]) => key);

        deadStats.sort((a, b) => b.rolls - a.rolls);

        let replacements = [];
        let usedTargets = new Set(presentStats);

        deadStats.forEach(dead => {
            let targetKey = desiredStats.find(k =>
                !usedTargets.has(k) &&
                !k.includes("_dmg_") &&
                k !== art.mainStat.key
            );

            if (targetKey && SUBSTAT_RANGES[targetKey]) {
                usedTargets.add(targetKey);

                const range = SUBSTAT_RANGES[targetKey];
                const minVal = (range.min * dead.rolls).toFixed(1);
                const maxVal = (range.max * dead.rolls).toFixed(1);
                const suffix = (targetKey.endsWith('_') || targetKey === "enerRech_" || targetKey === "critRate_" || targetKey === "critDMG_") ? "%" : "";
                const targetLabel = STAT_LABELS[targetKey] || targetKey;

                replacements.push({
                    dead: `${dead.label} (${dead.rolls})`,
                    target: `${targetLabel} (${dead.rolls})`,
                    gain: `+${minVal} <span style="color:#fff; opacity:0.8; padding:0 2px;">à</span> ${maxVal}${suffix} ${targetLabel}`
                });
            }
        });

        if (replacements.length > 0) {
            const pieceName = ARTIFACT_TYPE_MAPPING[art.type] || art.type;
            const deadText = replacements.map(r => `<span style="color:#ff6b6b">${r.dead}</span>`).join(' et ');
            const targetText = replacements.map(r => `<span style="color:var(--accent-gold)">${r.target}</span>`).join(' et ');
            const gainText = replacements.map(r => `
                <div style="display: flex; flex-direction: row; align-items: center; color: var(--accent-gold); ">
                    <p style=" color: #ffffff; margin-right: 6px;">•</p>
                    <p>${r.gain}</p>
                </div>
            `).join('');

            suggestions.push({
                pieceName: pieceName,
                text: `Remplacer ${deadText} par ${targetText} :`,
                gainHtml: gainText,
                totalDeadRolls: deadStats.reduce((acc, curr) => acc + curr.rolls, 0)
            });
        }
    });

    suggestions.sort((a, b) => b.totalDeadRolls - a.totalDeadRolls);
    return suggestions;
}

function calculateRerollMetrics(artifact, config) {
    if (!config || !config.weights || !window.MAX_ROLLS) return null;

    if ((artifact.stars || 5) < 4) {
        return {
            potential: 0,
            risk: 0,
            badge: {
                text: `Artéfact ${artifact.stars ?? '?'}★ — Non applicable`,
                color: "#6b7280"
            }
        };
    }


    if ((artifact.stars || 5) === 4) {
        return {
            potential: 0,
            risk: 0,
            badge: {
                text: "Artéfact 4★ — Non applicable",
                color: "#6b7280"
            }
        };
    }

    if ((artifact.level || 0) < 20) {
        return {
            potential: 0,
            risk: 0,
            badge: {
                text: `Niveau ${artifact.level ?? 0}/20 — Montez l'artéfact avant d'analyser`,
                color: "#6b7280"
            }
        };
    }

    let totalRolls = 0;
    let terrainWeights = [];
    let upgradeTokens = [];
    let maxWeightOnArtifact = 0;

    artifact.subStats.forEach(sub => {
        const rolls = getRollCount(sub.key, sub.value, artifact.stars || 5);
        totalRolls += rolls;

        let w = config.weights[sub.key];
        if (w === undefined && sub.key.includes("_dmg_")) w = config.weights["elemental_dmg_"];
        const weight = (w && w > 0) ? w : 0;

        terrainWeights.push(weight);
        if (weight > maxWeightOnArtifact) maxWeightOnArtifact = weight;

        if (rolls > 1) {
            for (let i = 0; i < rolls - 1; i++) {
                upgradeTokens.push(weight);
            }
        }
    });

    const totalTokensAvailable = Math.max(4, totalRolls - 4);
    const currentUpgradeValue = upgradeTokens.reduce((a, b) => a + b, 0);

    const sortedTerrain = [...terrainWeights].sort((a, b) => b - a);
    const top2Avg = (sortedTerrain[0] + sortedTerrain[1]) / 2;
    const bot2Avg = (sortedTerrain[2] + sortedTerrain[3]) / 2;

    const guaranteedTokens = Math.min(2, totalTokensAvailable);
    const rngTokens = totalTokensAvailable - guaranteedTokens;

    const expectedValue = (guaranteedTokens * top2Avg) + (rngTokens * ((top2Avg + bot2Avg) / 2));

    const maxTheoreticalGain = totalTokensAvailable * maxWeightOnArtifact;

    let potential = 0;
    if (maxTheoreticalGain > 0) {
        const valueGain = expectedValue - currentUpgradeValue;
        if (valueGain > 0) {
            potential = (valueGain / maxTheoreticalGain) * 100 * 2.0;
        }
    }

    let saturation = (maxTheoreticalGain > 0) ? (currentUpgradeValue / maxTheoreticalGain) : 0;
    let risk = Math.pow(saturation, 3.5) * 100;

    if (potential > 100) potential = 100;
    if (risk > 99) risk = 99;
    if (risk < 1) risk = 1;

    let badge = {text: "Neutre", color: "#9ca3af"};

    if (sortedTerrain[0] === 0 && sortedTerrain[1] === 0) {
        badge = {text: "Poubelle (Ne pas reroll)", color: "#4b5563"};
    } else if (risk > 75) {
        badge = {text: "Trop risqué (Garder)", color: "#ef4444"};
    } else if (potential > 40 && risk < 35) {
        badge = {text: "Poussière Recommandée", color: "#22c55e"};
    } else if (potential > 15) {
        badge = {text: "Optimisable", color: "#3b82f6"};
    } else {
        badge = {text: "Peu rentable", color: "#f97316"};
    }

    return {
        potential: Math.round(potential),
        risk: Math.round(risk),
        badge: badge
    };
}

function getRefinedValue(val, rank) {
    if (Array.isArray(val) && val.length === 2 && typeof val[0] === 'number') {
        return val[0] + (rank - 1) * val[1];
    }
    return val;
}

function processData(data) {
    if (!data.avatarInfoList) return;
    globalPersoData = [];

    const G_CHAR_CONFIG = window.CHARACTER_CONFIG || {};
    const G_WEAPON_PASSIVES = window.WEAPON_PASSIVES || {};
    const G_SET_PASSIVES = window.SET_PASSIVES || {};
    const G_DEFAULT_CONFIG = window.DEFAULT_CONFIG || {weights: {}, bestSets: [], goodSets: []};

    data.avatarInfoList.forEach(perso => {
        const id = perso.avatarId;
        const getKey = (obj, key) => {
            if (!obj) return undefined;
            if (obj[key] !== undefined) return obj[key];
            const lowerKey = key.charAt(0).toLowerCase() + key.slice(1);
            if (obj[lowerKey] !== undefined) return obj[lowerKey];
            return undefined;
        };
        let infoKey = String(id);
        if ((id === 10000005 || id === 10000007) && perso.skillDepotId) {
            const compoundKey = `${id}-${perso.skillDepotId}`;
            if (charData[compoundKey]) infoKey = compoundKey;
        }
        const info = charData[infoKey] || {};
        let nameHash = getKey(info, "NameTextMapHash");
        let nom = getText(nameHash);
        let iconNameRaw = getKey(info, "SideIconName")
            || getKey(info, "sideIconName")
            || getKey(info, "IconName")
            || getKey(info, "iconName")
            || getKey(info, "icon");

        if (!nom || nom === "Inconnu") {
            if (iconNameRaw) {
                const clean = iconNameRaw.replace(/\.png$/i, "");
                nom = clean.split('_').pop();
                if (nom.includes("Player")) nom = "Voyageur";
            } else {
                nom = "Inconnu";
            }
        }
        const qualityType = getKey(info, "QualityType");
        const rarity = qualityType === "QUALITY_ORANGE" ? 5 : 4;
        const level = perso.propMap['4001'] ? parseInt(perso.propMap['4001'].val) : 0;
        const constellations = perso.talentIdList ? perso.talentIdList.length : 0;
        const elemKey = getKey(info, "Element");
        const elemInfo = ELEMENT_DATA[elemKey] || {id: 30, key: "physical_dmg_"};

        const WEAPON_TYPE_MAP = {
            "WEAPON_SWORD_ONE_HAND": "sword",
            "WEAPON_CLAYMORE": "claymore",
            "WEAPON_POLE": "pole",
            "WEAPON_BOW": "bow",
            "WEAPON_CATALYST": "catalyst"
        };
        const wTypeRaw = getKey(info, "WeaponType");
        const charWeaponKey = WEAPON_TYPE_MAP[wTypeRaw] || "unknown";


        let sideIconUrl = "https://enka.network/ui/UI_AvatarIcon_Side_Unknown.png";
        let splashUrl = "https://enka.network/ui/UI_Gacha_AvatarImg_Unknown.png";


        if (iconNameRaw && typeof iconNameRaw === 'string') {

            if (iconNameRaw.startsWith("/ui/")) {
                sideIconUrl = `https://enka.network${iconNameRaw}`;

                let cleanName = iconNameRaw
                    .replace("/ui/", "")
                    .replace(/\.png$/i, "")
                    .replace("UI_AvatarIcon_Side_", "")
                    .replace("UI_AvatarIcon_", "");

                splashUrl = `https://enka.network/ui/UI_Gacha_AvatarImg_${cleanName}.png`;
            }
            else {
                let cleanName = iconNameRaw
                    .replace(/\.png$/i, "")
                    .replace(/^UI_AvatarIcon_Side_/, "")
                    .replace(/^UI_AvatarIcon_/, "");

                if (!cleanName.includes("/")) {
                    sideIconUrl = `https://enka.network/ui/UI_AvatarIcon_Side_${cleanName}.png`;
                    splashUrl = `https://enka.network/ui/UI_Gacha_AvatarImg_${cleanName}.png`;
                }
            }
        }

        const costumeId = perso.costumeId || null;
        if (costumeId && info.Costumes && info.Costumes[costumeId]) {
            const costume = info.Costumes[costumeId];
            if (costume.SideIcon)
                sideIconUrl = `https://enka.network${costume.SideIcon}`;
            if (costume.Art)
                splashUrl   = `https://enka.network${costume.Art}`;
        }

        const talents = [];
        const skillOrder = getKey(info, "SkillOrder");
        const skillsMap = getKey(info, "Skills");

        if (skillOrder) {
            skillOrder.forEach(skillId => {
                let lvl = perso.skillLevelMap[skillId] || 0;
                let iconName = skillsMap && skillsMap[skillId] ? skillsMap[skillId] : "Skill_A_01";

                let talentUrl = "";
                if (iconName.startsWith("/ui/")) {
                    talentUrl = `https://enka.network${iconName}`;
                } else {
                    talentUrl = `https://enka.network/ui/${iconName}.png`;
                }

                talents.push({level: lvl, icon: talentUrl});
            });
        }

        const fp = perso.fightPropMap;
        const baseStats = {hp: fp[1] || 0, atk: fp[4] || 0, def: fp[7] || 0};
        const combatStats = {
            hp: fp[2000], atk: fp[2001], def: fp[2002], em: fp[28],
            cr: fp[20] * 100, cd: fp[22] * 100, er: fp[23] * 100,
            hb: (fp[26] || 0) * 100,
            dmgBonus: (fp[elemInfo.id] || 0) * 100,
            dmgBonusKey: elemInfo.key
        };

        const artefacts = [];
        let weapon = null;
        let setsCounter = {};

        perso.equipList.forEach(item => {
            const flat = item.flat;
            if (item.weapon) {
                const main = flat.weaponStats && flat.weaponStats[0] ? formatStat(flat.weaponStats[0].appendPropId, flat.weaponStats[0].statValue) : null;
                const sub = flat.weaponStats && flat.weaponStats[1] ? formatStat(flat.weaponStats[1].appendPropId, flat.weaponStats[1].statValue) : null;
                const weaponNameFR = getText(flat.nameTextMapHash);
                const weaponKey = WEAPON_NAME_MAPPING[weaponNameFR] || weaponNameFR;

                weapon = {
                    name: weaponNameFR,
                    key: weaponKey,
                    level: item.weapon.level,
                    rank: (item.weapon.affixMap ? Object.values(item.weapon.affixMap)[0] : 0) + 1,
                    icon: `https://enka.network/ui/${flat.icon}.png`,
                    baseAtk: main,
                    subStat: sub,
                    stars: flat.rankLevel
                };
            }
            if (flat.itemType === "ITEM_RELIQUARY") {
                let targetHash = flat.setNameTextMapHash;

                if (window.iconToNameHash && flat.icon) {
                    const newHash = window.iconToNameHash[flat.icon];
                    if (newHash) {
                        targetHash = newHash;
                    }
                }

                const nomSetFR = getText(targetHash);

                const setKey = SET_NAME_MAPPING[nomSetFR] || "UnknownSet";
                setsCounter[setKey] = (setsCounter[setKey] || 0) + 1;

                const subs = [];
                if (flat.reliquarySubstats) {
                    flat.reliquarySubstats.forEach(s => {
                        subs.push(formatStat(s.appendPropId, s.statValue));
                    });
                }

                artefacts.push({
                    type: flat.equipType,
                    setKey: setKey,
                    setName: nomSetFR,
                    icon: `https://enka.network/ui/${flat.icon}.png`,
                    mainStat: formatStat(flat.reliquaryMainstat.mainPropId, flat.reliquaryMainstat.statValue),
                    subStats: subs,
                    level: item.reliquary.level - 1,
                    stars: flat.rankLevel
                });
            }
        });

        let buffs = [];

        const addBuffs = (sourceName, category, configData, selectMode = 'standard', weaponRank = 1) => {
            const resolveStats = (statsObj) => {
                const resolved = {};
                if (!statsObj) return resolved;
                for (const [k, v] of Object.entries(statsObj)) {
                    if (typeof v === 'object' && v.percent) {
                        resolved[k] = {...v, percent: getRefinedValue(v.percent, weaponRank)};
                    } else {
                        resolved[k] = getRefinedValue(v, weaponRank);
                    }
                }
                return resolved;
            };

            if (Array.isArray(configData)) {
                configData.forEach((item, idx) => {
                    if (!item) return;
                    const finalStats = resolveStats(item.stats);
                    let name = item.label || `Buff ${idx + 1}`;
                    let isActive = item.active !== undefined ? item.active : true;
                    if (selectMode === 'exclusive' && item.active === undefined) {
                        isActive = (idx === configData.length - 1);
                    }
                    buffs.push({
                        id: `${category}_${idx}`,
                        category,
                        name,
                        bonuses: finalStats,
                        active: isActive,
                        selectMode: selectMode
                    });
                });
            } else {
                const finalStats = resolveStats(configData);
                let isActive = configData.active !== undefined ? configData.active : true;
                for (const [statKey, val] of Object.entries(finalStats)) {
                    if (typeof val === 'object' && statKey.endsWith('_scaling')) {
                        const targetStat = statKey.replace('_bonus_scaling', '');
                        const percentDisplay = (val.percent * 100).toFixed(2) + "%";
                        buffs.push({
                            id: `${category}_${statKey}`, category,
                            name: `${STAT_LABELS[targetStat]} (+${percentDisplay} ${val.source})`,
                            bonuses: {[statKey]: val}, active: isActive, selectMode: selectMode
                        });
                        continue;
                    }
                    if (typeof val !== 'object') {
                        const valDisplay = (val < 2) ? Math.round(val * 100) + "%" : val;
                        buffs.push({
                            id: `${category}_${statKey}`, category,
                            name: `${STAT_LABELS[statKey]} (+${valDisplay})`,
                            bonuses: {[statKey]: val}, active: isActive, selectMode: selectMode
                        });
                    }
                }
            }
        };

        const configKey = nom.replace(/\s+/g, '') || "Default";
        const rawConfig = G_CHAR_CONFIG[configKey] || G_CHAR_CONFIG[nom] || G_DEFAULT_CONFIG;

        let activeBuild = null;
        let scoringConfig = {...rawConfig};

        if (rawConfig.builds) {
            let bestBuildKey = null;
            let maxEfficiency = -1;

            Object.entries(rawConfig.builds).forEach(([key, build]) => {
                const tempConfig = {...rawConfig, ...build};

                const clonedArtefacts = artefacts.map(a => ({...a}));
                const simulation = calculateCharacterScore({artefacts: clonedArtefacts}, tempConfig);

                const potential = calculateMaxTheoreticalScore({artefacts: artefacts}, tempConfig);

                let efficiency = 0;
                if (potential && potential.score > 0) {
                    efficiency = simulation.score / potential.score;
                }

                if (efficiency > maxEfficiency) {
                    maxEfficiency = efficiency;
                    bestBuildKey = key;
                }
            });

            if (!bestBuildKey) bestBuildKey = Object.keys(rawConfig.builds)[0];
            activeBuild = rawConfig.builds[bestBuildKey];
            activeBuild.key = bestBuildKey;
            scoringConfig = {...rawConfig, ...activeBuild};
        }

        if (weapon && G_WEAPON_PASSIVES[weapon.key]) {
            const wConfig = G_WEAPON_PASSIVES[weapon.key];
            const isAdvanced = wConfig.buffs && Array.isArray(wConfig.buffs);
            const wMode = isAdvanced ? (wConfig.selectMode || 'standard') : 'standard';
            const wData = isAdvanced ? wConfig.buffs : wConfig;
            addBuffs(weapon.key, `${weapon.name} (Arme)`, wData, wMode, weapon.rank);
        }

        if (G_SET_PASSIVES) {
            for (const [setKey, count] of Object.entries(setsCounter)) {
                if (G_SET_PASSIVES[setKey]) {
                    const setBonuses = G_SET_PASSIVES[setKey];
                    const setName = artefacts.find(a => a.setKey === setKey)?.setName || setKey;
                    const setCategory = `${setName} (Set)`;
                    const mode = setBonuses.selectMode || 'standard';
                    if (count >= 2 && setBonuses[2]) addBuffs(setName, setCategory, setBonuses[2], mode);
                    if (count >= 4 && setBonuses[4]) addBuffs(setName, setCategory, setBonuses[4], mode);
                }
            }
        }

        if (scoringConfig.buffs) {
            scoringConfig.buffs.forEach(group => {
                const list = group.data || group.buffs;
                if (list) {
                    const filteredBuffs = list.filter(b => {
                        if (b.cons !== undefined && constellations < b.cons) return false;
                        if (b.maxCons !== undefined && constellations > b.maxCons) return false;
                        return true;
                    });
                    if (filteredBuffs.length > 0) {
                        addBuffs(nom, group.category, filteredBuffs, group.selectMode);
                    }
                }
            });
        }

        const buffedStats = calculateBuffedStats(baseStats, combatStats, buffs);

        const persoObj = {
            id: id, nom, rarity, level, cons: constellations, talents,
            image: sideIconUrl, splashArt: splashUrl, combatStats, buffedStats, baseStats,
            weapon, artefacts, setsCounter, buffs, evaluation: null, weights: null,
            charWeapon: charWeaponKey,
            charConfig: rawConfig,
            activeBuild: activeBuild,
            costumeId: costumeId,
            friendship: (perso.fetterInfo && perso.fetterInfo.expLevel) ? perso.fetterInfo.expLevel : 0
        };

        if (activeBuild && activeBuild.team) {
            updateResonanceBuffs(persoObj, activeBuild.team);
        }

        const potentialMax = calculateMaxTheoreticalScore(persoObj, scoringConfig);
        persoObj.evaluation = calculateCharacterScore(persoObj, scoringConfig, potentialMax.totalRolls);
        persoObj.weights = scoringConfig.weights;

        globalPersoData.push(persoObj);
    });

    renderSidebar();
    if (globalPersoData.length > 0) renderShowcase(0);
}

function renderSidebar(activeOriginalIndex = 0) {
    const list = document.getElementById('sidebar-list');
    if (!list) return;
    list.innerHTML = "";
    const targetIndex = parseInt(activeOriginalIndex, 10);

    let entries = globalPersoData.map((p, i) => ({p, originalIndex: i}));

    const {column, direction} = sidebarSortState;
    if (column === 'original') {
        if (direction === 'asc') entries.reverse();
    } else if (column === 'name') {
        entries.sort((a, b) => {
            const cmp = a.p.nom.localeCompare(b.p.nom, 'fr', {sensitivity: 'base'});
            return direction === 'desc' ? cmp : -cmp;
        });
    } else if (column === 'score') {
        entries.sort((a, b) => {
            const cmp = b.p.evaluation.score - a.p.evaluation.score;
            return direction === 'desc' ? cmp : -cmp;
        });
    }

    entries.forEach(({p, originalIndex}) => {
        const div = document.createElement('div');
        div.className = `char-card ${originalIndex === targetIndex ? 'active' : ''}`;
        div.dataset.originalIndex = originalIndex;
        div.onclick = () => {
            document.querySelectorAll('.char-card').forEach(c => c.classList.remove('active'));
            div.classList.add('active');
            renderShowcase(originalIndex);
        };
        div.innerHTML = `
            <img alt="" src="${p.image}" class="char-card-avatar">
            <div class="char-card-container">
                <p class="char-card-name">${p.nom}</p>
                <div class="char-card-info">
                    <p style="color:${p.evaluation.grade.color};">${p.evaluation.score} </p>
                    <p style="color:${p.evaluation.grade.color};">(${p.evaluation.grade.letter})</p>
                </div>
            </div>`;
        list.appendChild(div);
    });
    updateSortArrows();
}

function renderToolbar(index) {
    const p = globalPersoData[index];
    const container = document.getElementById('toolbar-controls');
    if (!container) return;

    if (!p.charConfig.builds) {
        container.innerHTML = '<span class="main-content-menu-team" style="padding-top: 17px; padding-bottom: 14px;">Aucun archétype disponible</span>';
        return;
    }

    const currentBuildKey = p.activeBuild ? p.activeBuild.key : Object.keys(p.charConfig.builds)[0];
    const builds = p.charConfig.builds;

    let buildOptions = Object.entries(builds).map(([key, build]) => {
        const tempConfig = {...p.charConfig, ...build};

        const clonedArtefacts = p.artefacts.map(a => ({...a}));
        const simulation = calculateCharacterScore({artefacts: clonedArtefacts}, tempConfig);
        const potential = calculateMaxTheoreticalScore({artefacts: p.artefacts}, tempConfig);

        let efficiency = 0;
        if (potential && potential.score > 0) {
            efficiency = (simulation.score / potential.score) * 100;
        }

        const effText = efficiency > 0 ? ` - ${efficiency.toFixed(1)}%` : '';

        return `<option value="${key}" ${key === currentBuildKey ? 'selected' : ''}>${build.name}${effText}</option>`;
    }).join('');

    let teamHtml = '';
    if (p.activeBuild && p.activeBuild.team) {

        const charElement = p.combatStats.dmgBonusKey.replace('_dmg_', '');
        const charBg = ELEMENT_COLORS[charElement] || '#333';

        const charIcon = `<img src="${p.image.replace('Side_', '')}" style="width:40px; height:40px; border-radius:5px; border:1px solid rgba(255,255,255,0.5); box-shadow:0 0 5px rgba(0,0,0,0.5); object-fit:cover; background:${charBg};" title="${p.nom}">`;

        const matesHtml = p.activeBuild.team.map(mate => {
            const getIconUrl = (name, elem) => {
                if (name) return `https://enka.network/ui/UI_AvatarIcon_${name}.png`;
                if (elem) return `${ICON_BASE_PATH}icon_${elem}.webp`;
                return `${ICON_BASE_PATH}icon_unknown.webp`;
            };

            const isDual = Array.isArray(mate.element) || Array.isArray(mate.name);
            const names = Array.isArray(mate.name) ? mate.name : (mate.name ? [mate.name] : [null]);
            const elems = Array.isArray(mate.element) ? mate.element : [mate.element];

            let bgStyle = '';
            if (isDual && elems.length >= 2) {
                const c1 = ELEMENT_COLORS[elems[0]] || '#333';
                const c2 = ELEMENT_COLORS[elems[1]] || '#333';
                bgStyle = `background: linear-gradient(135deg, ${c1} 50%, ${c2} 50%);`;
            } else {
                bgStyle = `background: ${ELEMENT_COLORS[elems[0]] || '#333'};`;
            }

            let innerHtml = '';

            if (!isDual) {
                const url = getIconUrl(names[0], elems[0]);
                const fallback = elems[0]
                    ? `${ICON_BASE_PATH}icon_${elems[0]}.webp`
                    : `${ICON_BASE_PATH}icon_unknown.webp`;

                innerHtml = `
                    <img src="${url}" 
                         style="width:100%; height:100%; object-fit:cover;"
                         onerror="this.src='${fallback}'" 
                         title="${mate.role}: ${names[0] || elems[0] || 'Inconnu'}">
                `;
            } else {
                const url1 = getIconUrl(names[0], elems[0]);
                const fb1 = elems[0] ? `${ICON_BASE_PATH}icon_${elems[0]}.png` : `${ICON_BASE_PATH}icon_unknown.webp`;

                const url2 = getIconUrl(names[1] || names[0], elems[1] || elems[0]);
                const fb2 = (elems[1] || elems[0]) ? `${ICON_BASE_PATH}icon_${elems[1] || elems[0]}.webp` : `${ICON_BASE_PATH}icon_unknown.webp`;

                innerHtml = `
                    <div style="position:absolute; inset:0; clip-path: polygon(0 0, 100% 0, 0 100%); z-index:2;">
                        <img src="${url1}" onerror="this.src='${fb1}'" style="width:100%; height:100%; object-fit:cover;">
                    </div>
                    <div style="position:absolute; inset:0; clip-path: polygon(100% 0, 100% 100%, 0 100%); z-index:1;">
                        <img src="${url2}" onerror="this.src='${fb2}'" style="width:100%; height:100%; object-fit:cover;">
                    </div>
                    <div style="position:absolute; inset:0; background:linear-gradient(to bottom right, transparent 49.5%, #fff 49.5%, #fff 50.5%, transparent 50.5%); z-index:3; pointer-events:none;"></div>
                `;
            }

            return `
                <div style="position:relative; width:40px; height:40px; border-radius:5px; ${bgStyle} overflow:hidden;" title="${mate.role}">
                    ${innerHtml}
                </div>
            `;
        }).join('');

        teamHtml = `<div style="display:flex; color: #ffffff; border: none; border-radius: 8px; padding: 5px; flex-direction: row; align-items:center; gap: 5px; background: #2C2D32; ">${charIcon}${matesHtml}</div>`;
    }

    const currentERReq = p.activeBuild.er_req || 100;
    let erOptions = '';
    for (let i = 100; i <= 300; i += 10) {
        erOptions += `<option value="${i}" ${i === currentERReq ? 'selected' : ''}>${i}% ER</option>`;
    }

    container.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:2px;">
            <select onchange="switchBuild(${index}, this.value)" class="main-content-menu-team">
                ${buildOptions}
            </select>
        </div>

        ${teamHtml}

        <div style="display:flex; flex-direction:column; gap:2px;">
            <select id="er-selector-${index}" onchange="updateERTarget(${index}, this.value)" class="main-content-menu-er">
                ${erOptions}
            </select>
        </div>
    `;
}

function switchBuild(charIndex, buildKey) {
    const idx = parseInt(charIndex, 10);

    const p = globalPersoData[idx];
    if (!p) return;

    const newBuild = p.charConfig.builds[buildKey];
    if (!newBuild) return;

    p.activeBuild = newBuild;
    p.activeBuild.key = buildKey;

    const newScoringConfig = {...p.charConfig, ...newBuild};
    p.weights = newScoringConfig.weights;

    updateResonanceBuffs(p, newBuild.team);

    const potentialMax = calculateMaxTheoreticalScore(p, newScoringConfig);
    p.evaluation = calculateCharacterScore(p, newScoringConfig, potentialMax.totalRolls);

    renderSidebar(idx);
    renderShowcase(idx);
}

function updateResonanceBuffs(p, teamData) {
    if (!teamData) return;

    p.buffs = p.buffs.filter(b => b.category !== "Résonance");

    const guaranteed = {};
    const potential = {};

    const charElement = p.combatStats.dmgBonusKey ? p.combatStats.dmgBonusKey.replace('_dmg_', '') : null;
    if (charElement) guaranteed[charElement] = 1;

    teamData.forEach(mate => {
        if (typeof mate.element === 'string') {
            guaranteed[mate.element] = (guaranteed[mate.element] || 0) + 1;
        }
        else if (Array.isArray(mate.element)) {
            mate.element.forEach(el => {
                potential[el] = (potential[el] || 0) + 1;
            });
        }
    });

    Object.keys(RESONANCE_DATA).forEach(elem => {
        const countG = guaranteed[elem] || 0;
        const countP = potential[elem] || 0;
        const total = countG + countP;

        if (total >= 2) {
            const resData = RESONANCE_DATA[elem];
            const isActive = resData.active !== undefined ? resData.active : (countG >= 2);

            p.buffs.push({
                id: `res_${elem}`,
                category: "Résonance",
                name: resData.name,
                bonuses: resData.stats,
                active: isActive,
                selectMode: 'standard'
            });
        }
    });

    p.buffedStats = calculateBuffedStats(p.baseStats, p.combatStats, p.buffs);
}

function updateERTarget(index, val) {
    const p = globalPersoData[index];
    if (p.activeBuild) {
        p.activeBuild.er_req = parseInt(val);
        renderShowcase(index);
    }
}

function renderHome() {
    const container = document.getElementById('main-container');
    const profiles = getRecentProfiles();

    const menu = document.querySelector('.main-content-menu') || document.getElementById('main-content-menu');
    if (menu) menu.style.display = 'none';

    if (!container) return;

    if (profiles.length === 0) {
        container.innerHTML = `
            <div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; opacity: 0.5;">
                <img src="${ICON_BASE_PATH}icon_score.webp" style="width: 64px; height: 64px; margin-bottom: 20px; filter: grayscale(100%);">
                <h2 style="color: #fff; font-size: 24px; margin-bottom: 8px;">Aucun compte chargé</h2>
                <p style="color: #aaa; font-size: 14px;">Entrez un UID Genshin Impact dans la barre latérale pour commencer l'analyse.</p>
            </div>
        `;
        return;
    }

    const serverMap = {
        '1': 'CN',
        '2': 'CN',
        '3': 'CN',
        '4': 'CN',
        '5': 'TW',
        '6': 'NA',
        '7': 'EU',
        '8': 'Asia',
        '9': 'TW'
    };
    const ICON = './assets/simulator/icons/';

    const favUid = getFavoriteUid();

    const sortedProfiles = [
        ...profiles.filter(p => p.uid === favUid),
        ...profiles.filter(p => p.uid !== favUid)
    ];

    let cardsHtml = sortedProfiles.map(p => {
        const isFav = p.uid === favUid;
        const server = serverMap[String(p.uid)[0]] || 'CN';

        function stygianIcon() {
            if (p.stygianIndex === null) return '';
            if (p.stygianIndex === 6 && p.stygianSec !== null && p.stygianSec < 180) {
                return `<img src="${ICON}stygian_difficulty_6_minus_180.webp" class="pp-icon" alt="stygian">`;
            }
            if (p.stygianIndex >= 1 && p.stygianIndex <= 6) {
                return `<img src="${ICON}stygian_difficulty_${p.stygianIndex}.webp" class="pp-icon" alt="stygian">`;
            }
            return '';
        }

        const row1 = [
            `<span class="pp-badge pp-badge-server">${server}</span>`,
            p.achievements != null
                ? `<span class="pp-badge pp-badge-achievements"><img src="${ICON}icon_achievements.webp" class="pp-icon" alt="succès">${p.achievements.toLocaleString()}</span>`
                : '',
            p.ar ? `<span class="pp-badge pp-badge-ar">AR${p.ar}</span>` : '',
        ].filter(Boolean).join('');

        const row2Items = [
            p.stygianSec != null
                ? `<span class="pp-badge pp-badge-stygian">${stygianIcon()}${p.stygianSec}s</span>`
                : '',
            p.theaterStars != null
                ? `<span class="pp-badge pp-badge-theater"><img src="${ICON}icon_theater_star.webp" class="pp-icon" alt="théâtre">${p.theaterStars}</span>`
                : '',
            p.abyssStars != null
                ? `<span class="pp-badge pp-badge-abyss"><img src="${ICON}icon_abyss_star.webp" class="pp-icon" alt="abysses">${p.abyssStars}</span>`
                : '',
        ].filter(Boolean);
        const row2 = row2Items.join('');

        return `
        <div onclick="document.getElementById('uidInput').value = '${p.uid}'; fetchUserData();" 
            style="width: 480px; height: 82px; position: relative; cursor: pointer; transition: transform 0.2s;"             
            onmouseover="this.style.transform='scale(1.02)';"
            onmouseout="this.style.transform='scale(1)';">
             
            <!-- Bouton Favori -->
            <div onclick="toggleFavoriteProfile('${p.uid}', event)"
                 title="${isFav ? 'Retirer des favoris' : 'Épingler ce compte'}"
                 style="position: absolute; top: -6px; left: -6px; width: 22px; height: 22px; display: ${isFav || !favUid ? 'flex' : 'none'}; align-items: center; justify-content: center; border-radius: 50%; background: ${isFav ? 'rgba(255,177,59,0.95)' : 'rgba(60,62,70,0.92)'}; color: ${isFav ? '#fff' : '#9ca3af'}; font-size: 11px; z-index: 50; box-shadow: 0 2px 4px rgba(0,0,0,0.5); transition: 0.2s; cursor: pointer;"
                 onmouseover="this.style.background='${isFav ? 'rgba(220,140,0,1)' : 'rgba(90,92,100,1)'}'; this.style.transform='scale(1.15)';"
                 onmouseout="this.style.background='${isFav ? 'rgba(255,177,59,0.95)' : 'rgba(60,62,70,0.92)'}'; this.style.transform='scale(1)';">
                 ${isFav ? '★' : '☆'}
            </div>

            <!-- Bouton Supprimer -->
            <div onclick="deleteRecentProfile('${p.uid}', event)" 
                 style="position: absolute; top: -6px; right: -6px; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: rgba(239, 68, 68, 0.9); color: #fff; font-size: 12px; z-index: 50; box-shadow: 0 2px 4px rgba(0,0,0,0.5); transition: 0.2s;"
                 onmouseover="this.style.background='rgba(220, 38, 38, 1)'; this.style.transform='scale(1.1)';"
                 onmouseout="this.style.background='rgba(239, 68, 68, 0.9)'; this.style.transform='scale(1)';">
                 ✕
            </div>

            <div class="player-profile-card" style="margin: 0; width: 100%; height: 100%; box-sizing: border-box; pointer-events: none;">
                <div class="player-profile-bg" ${p.banner ? `style="background-image:url('${p.banner}')"` : ''}></div>
                <div class="player-profile-content">
                    <img class="player-profile-avatar" src="${p.pic}" onerror="this.src='https://enka.network/ui/UI_AvatarIcon_PlayerBoy_Circle.png'">
                    <div class="player-profile-identity">
                        <div class="player-profile-name-row">
                            <span class="player-profile-name">${p.nickname}</span>
                        </div>
                        ${p.signature ? `<span class="player-profile-sig">${p.signature}</span>` : ''}
                        <span class="player-profile-sig" style="opacity: 0.5;">UID: ${p.uid}</span>
                    </div>
                    <div class="player-profile-stats">
                        <div class="pp-row">${row1}</div>
                        ${row2 ? `<div class="pp-row">${row2}</div>` : ''}
                    </div>
                </div>
            </div>
            
        </div>
        `;
    }).join('');

    container.innerHTML = `
        <div style="padding-left: 40px; padding-top: 12px;">
            <h2 style="color: #fff; font-size: 28px; margin-bottom: 10px;">Comptes récents</h2>
            <p style="color: #aaa; font-size: 14px; margin-bottom: 30px;">Sélectionnez un compte précédemment analysé pour le recharger instantanément (jusqu'à 12 comptes à la fois).</p>
            <div style="display: flex; flex-wrap: wrap; gap: 20px;">
                ${cardsHtml}
            </div>
            <p style="color: #aaa; font-size: 12px; margin-bottom: 30px; margin-top: 32px; margin-left: 12px;">
                Ce site est un projet de fan indépendant et n'est en aucun cas affilié à, parrainé ou approuvé par HoYoverse. <br>
                Tous les contenus et actifs liés aux jeux sont la propriété exclusive de HoYoverse. <br><br>
                Ce projet s'appuie sur l'API fournie par 
                <a href="https://enka.network" style="color: inherit; text-decoration: underline;">Enka.Network</a>, 
                que nous remercions chaleureusement pour leur contribution indispensable à la communauté. <br>
                Design de la fiche personnage inspiré par Fribbels HSR Optimizer.
            </p>      
            <div class="links" style="display: flex; flex-direction: row; margin-bottom: 48px; gap: 8px; align-items: center;">
                <a class="link-button" href="https://discord.gg/CZ5qxVqBVJ" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-discord"></i>Discord</a>
                <a class="link-button-coffee" href="https://ko-fi.com/guobagg" target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn.prod.website-files.com/5c14e387dab576fe667689cf/670f5a01229bf8a18f97a3c1_favion.png" alt="Icône Discord" width="20" height="20">Buy me a coffee
                </a>                
            </div>
        </div>
    `;
}

if (!document.getElementById('global-tooltip')) {
    const tooltip = document.createElement('div');
    tooltip.id = 'global-tooltip';
    document.body.appendChild(tooltip);
}

window.showGlobalTooltip = function (element, text, color) {
    const tooltip = document.getElementById('global-tooltip');
    tooltip.innerHTML = text;
    tooltip.style.setProperty('--tooltip-color', color);

    const rect = element.getBoundingClientRect();

    tooltip.style.left = (rect.left + rect.width / 2) + 'px';
    tooltip.style.top = rect.bottom + 'px';

    tooltip.style.visibility = 'visible';
    tooltip.style.opacity = '1';
};

window.hideGlobalTooltip = function () {
    const tooltip = document.getElementById('global-tooltip');
    if (tooltip) {
        tooltip.style.visibility = 'hidden';
        tooltip.style.opacity = '0';
    }
};

function renderGlobalEvaluation(playerInfo) {
    let topHeader = document.getElementById('top-header-area');
    if (!topHeader) {
        topHeader = document.createElement('div');
        topHeader.id = 'top-header-area';
        const pp = document.getElementById('player-profile');
        pp.parentNode.insertBefore(topHeader, pp);

        const evalDiv = document.createElement('div');
        evalDiv.id = 'global-evaluation';
        topHeader.appendChild(evalDiv);
        topHeader.appendChild(pp);
    }

    topHeader.style.display = 'flex';

    const evalContainer = document.getElementById('global-evaluation');
    if (!globalPersoData || globalPersoData.length === 0) {
        evalContainer.style.display = 'none';
        return;
    }
    evalContainer.style.display = 'flex';

    const namecardsData = window.namecardsData || {};
    const namecard = namecardsData[String(playerInfo.nameCardId)];
    let bannerUrl = namecard && namecard.Icon ? `https://enka.network${namecard.Icon}` : '';

    let totalScore = 0, totalEfficiency = 0, totalRNG = 0, validChars = 0;

    let totalCurrentRolls = 0;
    let totalMaxRolls = 0;

    globalPersoData.forEach(p => {
        if (p.evaluation && p.evaluation.score) {

            const config = {...p.charConfig, ...(p.activeBuild || {})};

            const pot = calculateMaxTheoreticalScore(p, config);
            const maxRolls = (pot && pot.totalRolls > 0) ? pot.totalRolls : 45;

            const currentRolls = parseFloat(p.evaluation.totalRolls) || 0;
            const currentScore = parseFloat(p.evaluation.score) || 0;

            totalCurrentRolls += currentRolls;
            totalMaxRolls += parseFloat(maxRolls);

            totalScore += currentScore;
            if (pot && pot.score > 0) {
                totalEfficiency += (currentScore / pot.score) * 100;
            }
            totalRNG += calculateRNGQuality(p, {weights: p.weights});

            validChars++;
        }
    });

    const avgScore = validChars > 0 ? (totalScore / validChars) : 0;
    const avgEff = validChars > 0 ? (totalEfficiency / validChars) : 0;
    const avgRNG = validChars > 0 ? (totalRNG / validChars) : 0;

    let globalGrade = {letter: "F", color: getGradeColor("F")};

    if (validChars > 0 && totalMaxRolls > 0) {
        const labels = [
            "F", "F+", "D", "D+", "C", "C+", "B", "B+", "A", "A+",
            "S", "S+", "SS", "SS+", "SSS", "SSS+", "WTF", "WTF+", "ARCHON"
        ];

        const steps = labels.length - 1;

        const globalInterval = totalMaxRolls / steps;

        for (let i = steps; i >= 0; i--) {
            const threshold = i * globalInterval;

            if (totalCurrentRolls >= threshold - (0.05 * validChars)) {
                globalGrade = {letter: labels[i], color: getGradeColor(labels[i])};
                break;
            }
        }
    }

    const badgesData = [];
    const addBadge = (icon, name, desc, bgRgba, tooltipColor = "rgba(255, 255, 255, 0.4)") => {
        badgesData.push({ icon, name, desc, bgRgba, tooltipColor });
    };

    const isAbyss = playerInfo.towerStarIndex >= 36;
    const isTheater = playerInfo.theaterStarIndex >= 8;
    const isStygian = playerInfo.stygianIndex >= 5;
    const isStygianDiff6 = playerInfo.stygianIndex >= 6;
    const stygianSec = (playerInfo.stygianSeconds > 0) ? playerInfo.stygianSeconds : null;

    if (isAbyss && isTheater && isStygian) {
        addBadge("👑", "Maître de l'Endgame", "A conquis les Abysses, le Théâtre et le Carnage. Respect absolu.", "linear-gradient(135deg, rgba(230,190,255,0.7), rgba(154,204,255,0.7), rgba(255,204,229,0.7), rgba(253,245,169,0.7))");
    } else {
        if (isAbyss) addBadge("🏆", "Archon des Abysses", "A obtenu 36 étoiles dans les Profondeurs spiralées.", "rgba(37, 51, 85, 0.6)");
        if (isTheater) addBadge("🎭", "Étoile du Théâtre", "A brillé dans le Théâtre de l'Imaginarium.", "rgba(82, 42, 138, 0.6)");
        if (isStygian && !isStygianDiff6) {
            addBadge("🐉", "Roi du Carnage", "A vaincu les pires horreurs du Carnage Chtonien.", "rgba(139, 45, 139, 0.6)");
        }
    }

    if (isStygianDiff6 && stygianSec !== null && stygianSec <= 180) {
        addBadge("🌌", "Mythe Vivant", "Carnage Chtonien Difficulté 6 complété en moins de 180s. Vous avez officiellement 'fini' le jeu.", "linear-gradient(135deg, rgba(30,27,75,0.8), rgba(109,40,217,0.7), rgba(250,204,21,0.6))");
    } else if (isStygianDiff6) {
        addBadge("🩸", "Fléau du Carnage", "Difficulté 6 du Carnage Chtonien complétée. Les monstres vous craignent.", "linear-gradient(135deg, rgba(153,27,27,0.7), rgba(220,38,38,0.7))");
    }

    if (playerInfo.level === 60) addBadge("🏅", "Vétéran Endurci", "Niveau d'aventure 60 atteint. Il est temps d'aller toucher de l'herbe.", "rgba(207, 156, 79, 0.6)");
    if (avgEff >= 95) addBadge("🌟", "Perfection Inatteignable", "Plus de 95% d'efficacité moyenne. Vos artéfacts n'ont aucun défaut.", "linear-gradient(135deg, rgba(255,215,0,0.7), rgba(255,255,255,0.6))");

    if (globalPersoData.length === 1) addBadge("🃏", `${globalPersoData[0].nom} One Trick`, `Votre vitrine entière est dédiée à ${globalPersoData[0].nom}.`, "rgba(107, 114, 128, 0.6)");
    else if (globalPersoData.length < 12) addBadge("🥷", "Collection Cachée", "Moins de 12 personnages exposés. Vous gardez vos secrets.", "rgba(107, 114, 128, 0.6)");

    const c6FiveStars = globalPersoData.filter(p => p.rarity === 5 && p.cons === 6).length;
    if (c6FiveStars > 1) addBadge("🐋", "Le Narval", "Plusieurs personnages 5 étoiles C6 détectés.", "rgba(59, 130, 246, 0.6)");
    else if (c6FiveStars === 1) addBadge("🐳", "Baleine", "Un personnage 5 étoiles C6 détecté.", "rgba(59, 172, 197, 0.6)");

    if (avgRNG > 80) addBadge("🍀", "Touché par la Grâce", `RNG moyenne exceptionnelle (${avgRNG.toFixed(1)}%). Le jeu vous aime.`, "rgba(61, 160, 97, 0.6)");
    else if (avgRNG < 40 && validChars > 0) addBadge("🌧️", "Maudit par la RNG", `RNG moyenne catastrophique (${avgRNG.toFixed(1)}%).`, "rgba(107, 114, 128, 0.6)");

    let holyGrail = false, level89Syndrome = false, level67EasterEgg = false;
    let highER = false, asthmatic = false, casino = false, alchemist = false, allInCrit = false;
    let bruteForce = false, surgicalPrec = false, hospital = false, brickWall = false;
    let rainbowFan = 0, emblemFan = 0, pacifist = false, hpSack = false, impostor = false;
    let tripleCrown = false, leviathan = false, qiqiCurse = false, diogenes = false, nudist = false;
    let fourStarCount = 0, maxFriendshipCount = 0;
    let archonCount = 0, favoniusCount = 0, aloyFound = false, internFound = false;
    let elementCount = {};
    let akashamaxxing = false;

    const archonNames = ["Venti", "Zhongli", "Raiden", "Nahida", "Furina", "Mavuika"];

    globalPersoData.forEach(p => {

        if (p.level === 89) level89Syndrome = true;
        if (p.level === 67) level67EasterEgg = true;

        if (p.artefacts) {
            p.artefacts.forEach(art => {
                let cv = 0;
                art.subStats.forEach(sub => {
                    if (sub.key === "critRate_") cv += sub.value * 2;
                    if (sub.key === "critDMG_") cv += sub.value;
                });
                if (cv >= 50) holyGrail = true;
            });
        }
        if (p.combatStats) {
            if (p.combatStats.er > 200) highER = true;
            if (Math.round(p.combatStats.er) === 100) asthmatic = true;
            if (p.combatStats.hp > 60000) hpSack = true;
            if (p.combatStats.cd >= 300) allInCrit = true;
            if (p.combatStats.atk >= 3500) bruteForce = true;
            if (p.combatStats.def >= 3500) brickWall = true;
            if (p.combatStats.cr >= 100) surgicalPrec = true;
            if (p.combatStats.hb >= 75) hospital = true;

            const em = p.combatStats.em || p.combatStats.eleMas || 0;
            if (em > 1000) alchemist = true;
            if (p.level === 90 && em === 0) p.analphabet = true;

            if (p.weights && p.weights['critRate_'] > 0.5 && p.weights['critDMG_'] > 0.5) {
                if (p.combatStats.cr < 40 && p.combatStats.cd > 200) casino = true;
            }

            if (p.weights) {
                const noCritNeeded = (!p.weights['critRate_'] || p.weights['critRate_'] === 0) && (!p.weights['critDMG_'] || p.weights['critDMG_'] === 0);
                const tooMuchCrit = (p.combatStats.cr >= 40 || p.combatStats.cd >= 100);

                if (noCritNeeded && tooMuchCrit) {
                    akashamaxxing = true;
                }
            }

            const elem = p.combatStats.dmgBonusKey ? p.combatStats.dmgBonusKey.replace('_dmg_', '') : null;
            if (elem) elementCount[elem] = (elementCount[elem] || 0) + 1;
        }

        if (p.rarity === 4 || p.stars === 4) fourStarCount++;
        if (archonNames.includes(p.nom)) archonCount++;
        if (p.nom === "Aloy") aloyFound = true;
        if (p.level <= 20) internFound = true;

        if (p.friendship >= 10) {
            maxFriendshipCount++;
        }

        if (p.talents && p.talents.length >= 3) {
            const t1 = p.talents[0].level || 0;
            const t2 = p.talents[1].level || 0;
            const t3 = p.talents[2].level || 0;
            if (t1 >= 10 && t2 >= 10 && t3 >= 10) tripleCrown = true;
        }

        if (p.weapon) {
            const weaponRarity = p.weapon.stars || p.weapon.rarity || 1;
            const weaponRefinement = p.weapon.rank || p.weapon.refinement || p.weapon.affixLevel || 1;

            if (p.rarity === 5 && p.cons === 6 && weaponRarity === 5 && weaponRefinement === 5) leviathan = true;
            if (p.rarity === 5 && p.level >= 80 && weaponRarity <= 2) diogenes = true;
            if (p.level === 90 && weaponRarity === 3) p.ghettoKing = true;

            if (p.weapon.name.includes("Favonius")) favoniusCount++;
        }

        const standard5Stars = ['Qiqi', 'Keqing', 'Mona', 'Diluc', 'Jean', 'Dehya', 'Tighnari'];
        if (p.cons === 6 && standard5Stars.includes(p.nom)) qiqiCurse = true;

        if (p.level >= 80 && (!p.artefacts || p.artefacts.length === 0)) nudist = true;

        if (p.artefacts && Array.isArray(p.artefacts) && p.weights) {
            p.artefacts.forEach(art => {
                if (art.mainStatKey && p.weights[art.mainStatKey] === 0) impostor = true;
            });
        }

        if (p.level >= 80) {
            let lowTalentButNeeded = false;
            if (p.charConfig && p.charConfig.talents && p.talents && p.talents.length >= 3) {
                const target = p.charConfig.talents;
                const current = {auto: p.talents[0].level, skill: p.talents[1].level, burst: p.talents[2].level};
                if ((target.auto > 1 && current.auto < 4) || (target.skill > 1 && current.skill < 4) || (target.burst > 1 && current.burst < 4)) {
                    lowTalentButNeeded = true;
                }
            }
            if (lowTalentButNeeded || (p.weapon && p.weapon.level <= 50)) pacifist = true;
        }

        if (p.setsCounter) {
            if (p.setsCounter['EmblemOfSeveredFate'] >= 4) emblemFan++;
            if (Object.values(p.setsCounter).every(c => c < 4)) rainbowFan++;
        } else {
            rainbowFan++;
        }
    });

    if (archonCount >= 4) addBadge("🏛️", "Réunion Divine", "Votre vitrine rassemble au moins 4 Archons. Le Mont Olympe vous envie.", "linear-gradient(135deg, rgba(255,215,0,0.6), rgba(255,255,255,0.4))");
    if (tripleCrown) addBadge("👑", "Triple Couronne", "Vous avez investi 3 couronnes sur un même personnage. Dévouement royal.", "linear-gradient(135deg, rgba(251,191,36,0.8), rgba(245,158,11,0.8), rgba(217,119,6,0.8))");
    if (leviathan) addBadge("🔱", "Léviathan", "Personnage 5★ C6 avec arme 5★ R5 détecté. Merci de financer le jeu !", "linear-gradient(135deg, rgba(6,182,212,0.8), rgba(59,130,246,0.8), rgba(30,58,138,0.8))");
    if (allInCrit) addBadge("🎯", "All-in Crit", "Plus de 300% de DGT CRIT détecté. Si ça critique, ça désintègre.", "linear-gradient(135deg, rgba(220,38,38,0.8), rgba(249,115,22,0.8))");
    if (surgicalPrec) addBadge("🎯", "Précision Chirurgicale", "100% de Taux Critique atteint. Vous ne laissez aucune place au hasard.", "rgba(220, 38, 38, 0.6)");

    if (highER) addBadge("⚡", "Centrale Électrique", "Au moins un perso dépasse les 200% d'ER. Déchaînement infini !", "rgba(207, 156, 79, 0.6)");
    if (asthmatic) addBadge("😮‍💨", "Asthmatique", "Exactement 100% d'ER sur un perso. Vous courez après les particules.", "rgba(107, 114, 128, 0.6)");
    if (alchemist) addBadge("🧪", "Alchimiste", "Plus de 1000 de ME détecté. Les réactions sont votre religion.", "rgba(61, 160, 97, 0.6)");
    if (casino) addBadge("🎰", "Casino Impact", "Ratio Crit extrême sur un DPS (<40% TC / >200% DC).", "rgba(184, 63, 63, 0.6)");
    if (hpSack) addBadge("🛡️", "Increvable", "Au moins un personnage dépasse les 60 000 PV !", "rgba(207, 156, 79, 0.6)");

    if (impostor) addBadge("🤡", "Imposteur", "Une de vos pièces d'artéfact a une stat principale totalement inadaptée.", "rgba(184, 63, 63, 0.6)");
    if (qiqiCurse) addBadge("🧟‍♀️", "Malédiction de la Perma", "Personnage de la bannière permanente C6 détecté. On respecte la douleur des 50/50 perdus.", "rgba(107, 114, 128, 0.6)");
    if (nudist) addBadge("🩳", "En Grève", "Ce personnage HL refuse de travailler tant qu'il n'aura pas d'artéfacts.", "rgba(107, 114, 128, 0.6)");
    if (internFound) addBadge("👶", "Le Stagiaire", "Ce personnage de bas niveau s'est perdu dans votre vitrine.", "rgba(107, 114, 128, 0.6)");
    if (aloyFound) addBadge("⏳", "Voyageur Temporel", "Aloy détectée. Vous êtes l'un des 12 derniers joueurs à vous souvenir d'elle.", "rgba(107, 114, 128, 0.6)");
    if (globalPersoData.some(p => p.ghettoKing)) addBadge("🪵", "Tiers-Monde", "Un personnage niveau 90 avec une arme 3★. Si c'est bête mais que ça marche...", "rgba(139, 69, 19, 0.6)");

    if (akashamaxxing) addBadge("📈", "Akashamaxxing", "Vous avez bourré les stats critiques sur un personnage qui n'en a pas besoin. Tout pour le Top 1%, rien pour l'équipe.", "linear-gradient(135deg, rgba(236,72,153,0.7), rgba(168,85,247,0.7))");

    if (holyGrail) addBadge("🏆", "Le Saint Graal", "Possède un artéfact dépassant les 50 de Valeur Critique (CV). Une véritable relique divine.", "linear-gradient(135deg, rgba(255,215,0,0.8), rgba(255,255,255,0.7), rgba(255,215,0,0.8))");

    if (level89Syndrome) addBadge("🪙", "89 Enjoyer", "On économise les leçons du héros jusqu'au bout !", "rgba(107, 114, 128, 0.6)");
    if (level67EasterEgg) addBadge("👀", "67", "SIX SEVEEEEN", "rgba(168, 85, 247, 0.6)");

    if (emblemFan >= 3) addBadge("👘", "Accro à l'Emblème", "Vous passez trop de temps dans le donjon de Momiji.", "rgba(168, 85, 247, 0.6)");
    if (favoniusCount >= 3) addBadge("🗡️", "Secte de Favonius", "La moitié de l'équipe a une arme de Favonius. Bonjour les particules blanches !", "rgba(107, 114, 128, 0.6)");

    if (rainbowFan > globalPersoData.length / 2 && globalPersoData.length >= 4) {
        addBadge("🌈", "Artiste Arc-en-ciel", "La majorité de votre vitrine n'a aucun bonus 4 pièces.", "linear-gradient(90deg, rgba(255,0,0,0.4), rgba(255,165,0,0.4), rgba(255,255,0,0.4), rgba(0,128,0,0.4), rgba(0,0,255,0.4), rgba(75,0,130,0.4), rgba(238,130,238,0.4))");
    }

    if (pacifist) addBadge("🕊️", "Pacifiste", "Un personnage haut niveau mais avec des aptitudes utiles non montées.", "rgba(107, 114, 128, 0.6)");

    if (globalPersoData.length >= 4 && fourStarCount > globalPersoData.length / 2) {
        addBadge("🧑‍🌾", "F2P By The Way", "La majorité de votre vitrine est composée de 4 étoiles.", "rgba(107, 114, 128, 0.6)");
    }
    if (globalPersoData.length >= 8 && fourStarCount === 0) {
        addBadge("💎", "Ligue des Champions", "Aucun 4 étoiles. Seule l'élite a le droit de figurer sur votre profil.", "rgba(59, 130, 246, 0.6)");
    }
    if (globalPersoData.length >= 4 && maxFriendshipCount === globalPersoData.length) {
        addBadge("🤝", "Lien Indéfectible", "Niveau d'affinité 10 sur toute la vitrine. Vous aimez vraiment vos persos.", "rgba(238, 130, 238, 0.6)");
    }

    let monopolyElem = null;
    Object.entries(elementCount).forEach(([elem, count]) => {
        if (count === globalPersoData.length && globalPersoData.length >= 4) {
            monopolyElem = elem;
            addBadge("🔮", `Monopole ${elem.charAt(0).toUpperCase() + elem.slice(1)}`, "Vitrine 100% mono-élément. Les autres éléments n'existent pas pour vous.", "linear-gradient(135deg, rgba(37,51,85,0.8), rgba(168,85,247,0.7))");
        } else if (count > Math.ceil(globalPersoData.length / 2) && globalPersoData.length >= 4 && !monopolyElem) {
            addBadge("👑", `Suprématie ${elem.charAt(0).toUpperCase() + elem.slice(1)}`, "La majorité de votre vitrine partage cet élément.", "rgba(61, 160, 97, 0.6)");
        }
    });

    const getBadgePriority = (bg) => {
        if (bg.includes('linear-gradient')) return 1;
        if (bg.includes('107, 114, 128')) return 3;
        return 2;
    };

    badgesData.sort((a, b) => getBadgePriority(a.bgRgba) - getBadgePriority(b.bgRgba));

    const badges = badgesData.map(b => {
        const safeDesc = b.desc.replace(/'/g, "\\'");
        return `
            <div class="guoba-badge" style="background: ${b.bgRgba};"
                 onmouseenter="showGlobalTooltip(this, '${safeDesc}', '${b.tooltipColor}')"
                 onmouseleave="hideGlobalTooltip()">
                <span class="guoba-badge-icon">${b.icon}</span> ${b.name}
            </div>
        `;
    });

    evalContainer.innerHTML = `
        <div class="player-profile-bg" ${bannerUrl ? `style="background-image:url('${bannerUrl}')"` : ''}></div>
        
        <div style="position: relative; z-index: 2; display: flex; width: 100%; height: 100%; align-items: center; gap: 15px;">
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; padding-right: 15px; padding-left: 15px; gap: 4px; border-right: 1px solid rgba(255,255,255,0.2); height: 100%;">
                <p style="font-size: 9px; text-transform: uppercase; color: rgba(255,255,255,0.6); margin-bottom: 0px;">Note Globale</p>
                <p style="font-size: 42px; font-weight: 800; color: ${globalGrade.color}; line-height: 1; text-shadow: 0 0 10px ${globalGrade.color}40;">${globalGrade.letter}</p>
            </div>
            <div style="display: flex; flex-direction: column; text-align: center; justify-content: center; gap: 2px; padding-right: 15px; border-right: 1px solid rgba(255,255,255,0.2); height: 100%;">
                <div>
                    <p style="font-size: 9px; text-transform: uppercase; color: rgba(255,255,255,0.6);">Efficacité</p>
                    <p style="font-size: 14px; font-weight: bold; color: #fff;">${avgEff.toFixed(1)}%</p>
                </div>
                <div>
                    <p style="font-size: 9px; text-transform: uppercase; color: rgba(255,255,255,0.6);">Score</p>
                    <p style="font-size: 14px; font-weight: bold; color: #fff;">${avgScore.toFixed(1)}</p>
                </div>
            </div>
            <div style="flex: 1; height: 100%; display: flex; flex-direction: column; justify-content: flex-start; overflow: hidden; padding: 2px 12px 2px 0;">
                <p style="font-size: 9px; text-transform: uppercase; color: rgba(255,255,255,0.6); margin-bottom: 2px; flex-shrink: 0; margin-top: 4px;">Badges et titres</p>
                <div class="card-buff-list-container badges-scroll" style="display: flex; flex-wrap: wrap; gap: 4px; overflow-y: auto; overflow-x: hidden; padding-right: 8px; max-height: 100%; padding-bottom: 4px;">
                    ${badges.length > 0 ? badges.join('') : '<p style="color: rgba(255,255,255,0.5); font-size: 11px; font-style: italic;">Aucun fait marquant détecté...</p>'}
                </div>
            </div>
        </div>
    `;
}

function renderShowcase(index) {
    const p = globalPersoData[index];
    const container = document.getElementById('main-container');
    if (!container) return;

    const currentUid = new URLSearchParams(window.location.search).get('uid') || document.getElementById('uidInput').value;
    window.history.pushState({}, '', `?uid=${currentUid}&char=${encodeURIComponent(p.nom)}`);

    document.querySelectorAll('#sidebar-list .char-card').forEach((card) => {
        if (parseInt(card.dataset.originalIndex) === parseInt(index)) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });

    const menu = document.querySelector('.main-content-menu') || document.getElementById('main-content-menu');
    const menuContainer = document.querySelector('.main-content-menu-container') || document.getElementById('main-content-menu-container');

    if (menu) menu.style.display = 'flex';
    if (menuContainer) menuContainer.style.display = 'flex';

    const configKey = p.nom.replace(/\s+/g, '') || "Default";
    let config = window.CHARACTER_CONFIG[configKey] || window.CHARACTER_CONFIG[p.nom] || window.DEFAULT_CONFIG;
    if (p.activeBuild) {
        config = {...config, ...p.activeBuild};
    }

    const skinOverride = (config.skins && p.costumeId && config.skins[p.costumeId])
        ? config.skins[p.costumeId]
        : null;

    const portraitX = skinOverride?.portraitOffset ?? config.portraitOffset ?? -35;

    const s = p.combatStats;
    const b = p.buffedStats;
    const ev = p.evaluation;

    const charColor = skinOverride?.color || config.color || "#4b5563";
    container.style.setProperty('--char-hex', charColor);


    let talentsHtml = `<div style="display:flex; justify-content:space-between; margin-left: 3px; margin-right: 3px;">`;
    p.talents.forEach(t => {
        talentsHtml += `
            <div style="width:64px; height:64px; background-color: rgba(0, 0, 0, 0.2); border-radius:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; position:relative; border:1px solid rgba(255, 255, 255, 0.4); margin-bottom: 11px;">
                <img src="${t.icon}" style="width:60px; height:60px;" alt="Aptitude">
                <div style="position:absolute; bottom:-10px; background-color: rgb(from var(--char-hex) calc(r / 3.5) calc(g / 3.5) calc(b / 3.5)); padding:2px 6px; border-radius:100%; font-size:10px;">${t.level}</div>
            </div>`;
    });
    talentsHtml += `</div>`;


    const statLine = (svg, label, val, isHighlight = false) => `
        <div class="stat-row" style="filter: none; justify-content: space-between; align-items: center; display: flex; box-sizing: border-box;">
            ${svg}
            <p>${label}</p>
            <div class="dotted-line"></div> 
            <p class="stat-val" style="${isHighlight ? 'color:var(--accent-gold)' : ''}">${val}</p>
        </div>`;

    const dmgStat = formatStat(b.dmgBonusKey, b.dmgBonus / 100);


    // 1. PARTIE HAUTE (STATS + EQUIPMENT)
    let html = `<div class="top-row">`;

    // 1.1 Image de background
    html += `
        <div class="background-splash-art" style="background-image: url('${p.splashArt}'); background-position: center center;background-repeat: no-repeat;background-size: 300%; position: absolute;inset: 0px;z-index: 0;filter: blur(10px) brightness(0.7) saturate(0.8);"></div>
    `;

    // 1.2 Section gauche (splash art + arme)
    // 1.2.1 Splash art
    html += `
        <div class="character-portrait-weapon" style="gap: 8px; align-items: stretch; flex-direction: column; display: flex; box-sizing: border-box;">
            <div class="character-portrait-container" style="width: 350px; height: 720px; position: relative; overflow: hidden; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: rgb(0, 0, 0) 1px 1px 6px; box-sizing: border-box;">
                <img class="character-portrait" src="${p.splashArt}" alt="${p.nom}" style="filter: none; position: absolute; transform: translateX(${portraitX}%); height: 720px; transition: filter 0.35s cubic-bezier(0.41, 0.65, 0.39, 0.99); box-sizing: border-box;">
            </div>
    `;

    // 1.2.2 Arme
    html += `
        <div class="weapon-container">
    `;

    if (p.weapon) {
        html += `
            <div class="card weapon-card" style="width: 350px; height: 128px; position: relative; overflow: hidden; z-index: 20; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: rgb(0, 0, 0) 1px 1px 6px; box-sizing: border-box; transition: box-shadow .25s, border-color .25s !important; display: flex; padding: 10px;">
                <img src="${p.weapon.icon}" class="item-img" style="width: auto; height:100%; border-radius: 8px; border:2px solid ${p.weapon.stars === 5 ? '#eab308' : '#9C74B6'}" alt="${p.weapon.name}">
                <div style="flex:1; display: flex; flex-direction: column; overflow: hidden;">
                    <div style="font-size:16px; color: #FFFFFF; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${p.weapon.name}</div>
                    <div style="color: #FFFFFF; font-size:14px; margin-bottom:5px;">Niv. ${p.weapon.level} • R${p.weapon.rank}</div>
                    <div style="display:flex; gap:12px; margin-top:5px; background:rgba(0,0,0,0.2); padding:5px; border-radius:8px; overflow: hidden;">
                        ${p.weapon.baseAtk ? `
                        <div style="overflow: hidden; padding-left: 2px;">
                            <p style="font-size:12px; color: rgba(255, 255, 255, 0.4); text-align: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">ATQ de base</p>
                            <p style="font-size:16px; text-align: left; margin-top: 2px;">${p.weapon.baseAtk.value}</p>
                        </div>` : ''}
                        ${p.weapon.subStat ? `
                        <div style="border-left:1px solid rgba(255, 255, 255, 0.4); padding-left:12px; overflow: hidden;">
                            <p style="font-size:12px; color: rgba(255, 255, 255, 0.4); text-align: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${p.weapon.subStat.label}</p>
                            <p style="font-size:16px; text-align: left; margin-top: 2px;">${formatValueDisplay(p.weapon.subStat.key, p.weapon.subStat.value)}</p>
                        </div>` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    html += `</div></div>`;

    // 1.3 Section milieu (stats + note + aptitudes + stats en combat)
    html += `
        <div class="showcase-area" style="gap: 8px; justify-content: space-between; align-items: stretch; flex-direction: column; display: flex; box-sizing: border-box;">
            <div class="showcase-area-container" style="width: 299px; height: 100%; border-radius: 8px; z-index: 10; flex: 1 1 0%; justify-content: space-between; align-items: stretch; flex-direction: column; display: flex; box-sizing: border-box;">
                
                <!-- 1.3.1 Informations personnage + statistiques de base -->
                <div class="showcase-area-base-stats" style="border-radius: 8px; transition: background-color 0.35s, box-shadow 0.25s, border-color 0.25s; box-shadow: rgb(0, 0, 0) 1px 1px 6px, rgba(255, 255, 255, 0.3) 0px 0px 2px inset; border: 1px solid rgba(255, 255, 255, 0.4); box-sizing: border-box;">
                    <div style="align-items: stretch; flex-direction: column; display: flex; box-sizing: border-box; margin-bottom: 6px;">
                        <div style="height: 40px; margin-top: 8px; margin-bottom: 5px; display: flex; flex-direction: row; justify-content: space-between; margin-left: 10px; margin-right: 10px;">
                            <div class="showcase-element-weapon" style="display: flex; flex-direction: row;">
                                <img src="${ICON_BASE_PATH}${ICON_MAP[s.dmgBonusKey]}" style="width: 25px; height: 25px; margin-top: 2px;" alt="Element">
                                <img src="${ICON_BASE_PATH}${ICON_MAP[p.charWeapon]}" style="width: 29px; height: 29px;" alt="Type Arme">
                            </div>
                            <div class="showcase-level-const" style="display: flex; flex-direction: column; text-align: right;">
                                <p style="font-size: 14px;">Niv. ${p.level}</p>
                                <p style="font-size: 14px;">C${p.cons}</p>
                            </div>
                        </div>
                        <div style="margin-left: 10px; margin-right: 10px; display: flex; justify-content: space-between; align-items: center;">
                            <h2 style="font-size: 24px;">${p.nom}</h2>
                        </div>
                    </div>
                    <div>
                        <p style="margin-left: 10px; margin-right: 10px; margin-bottom: 9px; font-size: 14px;">Statistiques de base</p>
                        <div class="showcase-base-stats-container" style="display: flex; flex-direction: column; gap: 9px; margin-left: 7px; margin-right: 10px; margin-bottom: 9px;">
                            ${statLine(createIcon('hp'), "PV max", Math.round(s.hp))}
                            ${statLine(createIcon('atk'), "ATQ", Math.round(s.atk))}
                            ${statLine(createIcon('def'), "DÉF", Math.round(s.def))}
                            ${statLine(createIcon('eleMas'), "Maîtrise élémentaire", Math.round(s.em))}
                            ${statLine(createIcon('critRate_'), "Taux CRIT", s.cr.toFixed(1) + '%')}
                            ${statLine(createIcon('critDMG_'), "DGT CRIT", s.cd.toFixed(1) + '%')}
                            ${statLine(createIcon('enerRech_'), "Recharge d'énergie", s.er.toFixed(1) + '%')}
                            ${statLine(createIcon('heal_'), "Bonus de soins", (s.hb || 0).toFixed(1) + '%')}
                            ${statLine(formatStat(s.dmgBonusKey, s.dmgBonus / 100).icon, formatStat(s.dmgBonusKey, s.dmgBonus / 100).label, s.dmgBonus.toFixed(1) + '%')}
                        </div>
                    </div>
                </div>
                
                <!-- 1.3.2 Score et note personnage -->
                <div class="showcase-area-score" style="display: flex; flex-direction: column; gap: 6px; border-radius: 8px; transition: background-color 0.35s, box-shadow 0.25s, border-color 0.25s; padding: 10px 10px 8px 7px;box-shadow: rgb(0, 0, 0) 1px 1px 6px, rgba(255, 255, 255, 0.3) 0px 0px 2px inset; border: 2px solid ${ev.grade.color}; box-sizing: border-box;">
                    <div class="stat-row" style="filter: none; justify-content: space-between; align-items: center; display: flex; box-sizing: border-box;">
                        <img src="assets/simulator/icons/icon_score_white.webp" alt="Score" style="width: 19px; height: 19px; margin-bottom: 2px; margin-right: 5px;">
                        <p>Score</p>
                        <div class="dotted-line"></div> 
                        <div style="display: flex; flex-direction: row; gap: 4px;">
                            <p style="color: ${ev.grade.color};">${ev.score}</p>
                            <p>(${ev.grade.letter})</p>
                        </div>
                    </div>
                    <div class="stat-row" style="filter: none; justify-content: space-between; align-items: center; display: flex; box-sizing: border-box;">
                        <p style="margin-left: 24px;">Rolls totaux</p>
                        <div class="dotted-line"></div> 
                        <p>${ev.totalRolls}</p>
                    </div>
                </div>
                
                <!-- 1.3.3 Aptitudes -->
                <div class="showcase-area-skills" style="border-radius: 8px; transition: background-color 0.35s, box-shadow 0.25s, border-color 0.25s; padding: 10px; box-shadow: rgb(0, 0, 0) 1px 1px 6px, rgba(255, 255, 255, 0.3) 0px 0px 2px inset; border: 1px solid rgba(255, 255, 255, 0.4); box-sizing: border-box;">
                    <p style="margin-bottom: 9px; font-size: 14px;">Aptitudes</p>
                    ${talentsHtml}
                </div>
                
                <!-- 1.3.4 Statistiques de combat -->
                <div class="showcase-area-combat-stats" style="border-radius: 8px; transition: background-color 0.35s, box-shadow 0.25s, border-color 0.25s; padding-left: 2px; padding-right: 2px; padding-bottom: 3px; box-shadow: rgb(0, 0, 0) 1px 1px 6px, rgba(255, 255, 255, 0.3) 0px 0px 2px inset; border: 1px solid rgba(255, 255, 255, 0.4); box-sizing: border-box;">
                    <p style="margin-left: 10px; margin-right: 10px; margin-bottom: 9px; margin-top: 10px; font-size: 14px;">Statistiques de combat</p>
                    <div style="display: flex; flex-direction: column; gap: 9px; margin-left: 7px; margin-right: 10px; margin-bottom: 4px;">
                        ${(() => {
        let html = "";
        const dynamicDefs = [
            {wKey: 'hp', sKey: 'hp', icon: 'hp', label: 'PV max', isPct: false},
            {wKey: 'atk', sKey: 'atk', icon: 'atk', label: 'ATQ', isPct: false},
            {wKey: 'def', sKey: 'def', icon: 'def', label: 'DÉF', isPct: false}
        ];

        dynamicDefs.forEach(def => {
            const isHidden = p.activeBuild && p.activeBuild.hideUIStats && p.activeBuild.hideUIStats.includes(def.wKey);
            const isForced = p.activeBuild && p.activeBuild.showUIStats && p.activeBuild.showUIStats.includes(def.wKey);
            if ((p.weights && p.weights[def.wKey] > 0 && !isHidden) || isForced) {
                const val = b[def.sKey];
                const oldVal = s[def.sKey];
                const displayVal = def.isPct ? val.toFixed(1) + '%' : Math.round(val);
                const isBuffed = val > oldVal;
                html += statLine(createIcon(def.icon), def.label, displayVal, isBuffed);
            }
        });

        const fixedDefs = [
            {wKey: 'eleMas', sKey: 'em', icon: 'eleMas', label: 'Maîtrise élémentaire', isPct: false},
            {wKey: 'critRate_', sKey: 'cr', icon: 'critRate_', label: 'Taux CRIT', isPct: true},
            {wKey: 'critDMG_', sKey: 'cd', icon: 'critDMG_', label: 'DGT CRIT', isPct: true},
            {wKey: 'enerRech_', sKey: 'er', icon: 'enerRech_', label: "Recharge d'énergie", isPct: true}
        ];

        fixedDefs.forEach(def => {
            const isHidden = p.activeBuild && p.activeBuild.hideUIStats && p.activeBuild.hideUIStats.includes(def.wKey);
            if (!isHidden) {
                const val = b[def.sKey];
                const oldVal = s[def.sKey];
                const displayVal = def.isPct ? val.toFixed(1) + '%' : Math.round(val);
                const isBuffed = val > oldVal;
                html += statLine(createIcon(def.icon), def.label, displayVal, isBuffed);
            }
        });

        const isHealHidden = p.activeBuild && p.activeBuild.hideUIStats && p.activeBuild.hideUIStats.includes("heal_");
        if (!isHealHidden) {
            const healVal = s.hb || 0;
            html += statLine(createIcon('heal_'), "Bonus de soins", healVal.toFixed(1) + '%', false);
        }

        const isDmgHidden = p.activeBuild && p.activeBuild.hideUIStats && p.activeBuild.hideUIStats.includes("elemental_dmg_");
        if (!isDmgHidden) {
            const dmgStat = formatStat(b.dmgBonusKey, b.dmgBonus / 100);
            const isDmgBuffed = b.dmgBonus > s.dmgBonus;
            html += statLine(dmgStat.icon, dmgStat.label, b.dmgBonus.toFixed(1) + '%', isDmgBuffed);
        }

        if (p.activeBuild && p.activeBuild.showUIStats) {
            p.activeBuild.showUIStats.forEach(forcedKey => {
                if (forcedKey.endsWith('_dmg_') && forcedKey !== b.dmgBonusKey && forcedKey !== 'elemental_dmg_') {
                    const val = b[forcedKey] || 0;
                    const oldVal = s[forcedKey] || 0;
                    const isBuffed = val > oldVal;
                    const statInfo = formatStat(forcedKey, val / 100);
                    html += statLine(statInfo.icon, statInfo.label, val.toFixed(1) + '%', isBuffed);
                }
            });
        }
        return html;
    })()}
                    </div>
                </div>
            </div>
        </div>
    `;

    // 1.4 Section droite (artéfacts + configuration)
    html += `<div class="equipment-area">`;
    p.artefacts.forEach(art => {
        let subsHtml = "";
        art.subStats.forEach(sub => {
            let w = p.weights[sub.key];
            if (w === undefined && sub.key.includes("dmg_")) w = p.weights["elemental_dmg_"] || 0;
            if (w === undefined) w = 0;
            const isDead = w === 0;
            const rolls = getRollCount(sub.key, sub.value, art.stars || 5);
            subsHtml += `
                <div style="color: #FFFFFF; display: flex; justify-content: space-between; align-items: center;" class="substat-row ${isDead ? 'dead' : ''}">
                    <div style="display:flex; flex-direction: row; align-items:center; gap:5px;">
                        <img src="${ICON_BASE_PATH}${ICON_MAP[sub.key] || ICON_MAP['unknown']}" style="width: 17px; height: 17px;" alt="${sub.key}">
                        <p style="font-size: 12px;">${sub.label}</p>
                        
                        ${rolls > 0 ? `
                            <div style="display: flex; gap: 3px; align-items: center;">
                                ${Array(rolls).fill('').map(() => `
                                    <div style="
                                        width: 2px; 
                                        height: 2px; 
                                        border-radius: 100%; 
                                        background-color: rgba(255, 255, 255, 0.6); 
                                    "></div>
                                `).join('')}
                            </div>
                        ` : ''}
                        </div>
                    <p style="font-size: 12px;">${formatValueDisplay(sub.key, sub.value)}</p>
                </div>
            `;
        });

        const pieceName = ARTIFACT_TYPE_MAPPING[art.type] || art.type;
        html += `
            <div class="card" style="width: 240px; min-width: 240px; height: 280px; border: 1px solid rgba(255, 255, 255, 0.4); transition: background-color 0.35s, box-shadow 0.25s, border-color 0.25s; border-radius: 8px; box-shadow: rgb(0, 0, 0) 1px 1px 6px, rgba(255, 255, 255, 0.3) 0px 0px 2px inset;">
                <div class="card-container" style="padding-top: 12px; padding-left: 12px; padding-right: 12px; padding-bottom: 12px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; align-items: stretch;">
                    
                    <div class="item-header" style="height: 50px; display: flex; flex-direction: row; align-items: center; gap: 12px;">
                        <div style="position:relative; display:inline-block;">
                            <img src="${art.icon}" class="item-img" style="border: 2px solid ${art.stars === 5 ? '#FFB13B' : art.stars === 4 ? '#a855f7' : '#6b7280'};">
                            <p style="position:absolute; bottom:7px; right:1px; background:rgba(0, 0, 0, 0.4); color:rgba(255, 255, 255, 0.8); font-size:11px;padding: 1px 5px 1px 4px; border-radius:8px;">+${art.level}</p>
                        </div>
                        <div style="overflow:hidden; display:flex; flex-direction:column; justify-content:center;">
                            <p style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-size:14px;">${pieceName}</p>
                            <p style="font-size:12px; color:var(--accent-gold); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${art.setName}</p>
                            <div style="font-size:11px; color: rgba(255, 255, 255, 0.4); display: flex; flex-direction: row; align-items: center; gap: 4px;">
                                <p>${art.stars}★</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card-divider" style="margin: 12px 0px; display: flex; clear: both; width: 100%; min-width: 100%; box-sizing: border-box; color: rgba(255, 255, 255, 0.25); border-width: 1px 0 0; border-color: rgba(255, 255, 255, 0.25); border-block-start: 1px solid rgba(255, 255, 255, 0.25);"></div>
                    
                    <div class="main-stat-display" style="display: flex; flex-direction: row; align-items: center;">
                        <div style="display:flex; align-items:center; gap:5px; font-size:0.7rem; color:#aaa; font-weight:normal; align-self:center;">
                            <img src="${ICON_BASE_PATH}${ICON_MAP[art.mainStat.key] || ICON_MAP['unknown']}" style="width: 17px; height: 17px; margin-bottom: 1px;" alt="${art.mainStat.key}">
                            <p style="font-size: 12px; color: #FFFFFF;">${art.mainStat.label}</p>
                        </div>
                        <p style="font-size: 12px; color: #FFFFFF;">${formatValueDisplay(art.mainStat.key, art.mainStat.value)}</p>
                    </div>
                    
                    <div class="card-divider" style="margin: 14px 0px; display: flex; clear: both; width: 100%; min-width: 100%; box-sizing: border-box; color: rgba(255, 255, 255, 0.25); border-width: 1px 0 0; border-color: rgba(255, 255, 255, 0.25); border-block-start: 1px solid rgba(255, 255, 255, 0.25);"></div>
                    
                    <div style="display: flex; flex-direction: column; gap: 5px;">${subsHtml}</div>
                    
                    <div class="card-divider" style="margin: 14px 0px; display: flex; clear: both; width: 100%; min-width: 100%; box-sizing: border-box; color: rgba(255, 255, 255, 0.25); border-width: 1px 0 0; border-color: rgba(255, 255, 255, 0.25); border-block-start: 1px solid rgba(255, 255, 255, 0.25);"></div>
                    
                    <div style="font-size: 12px; align-items: center;" class="art-score-footer">
                        <div style="display:flex; align-items:center; gap: 5px;">
                            <img src="/assets/simulator/icons/icon_score_white.webp" style="width: 19px; height: 19px; margin-bottom: 2px;" alt="Score">
                            <p>Score</p>
                        </div>
                        <div style="display: flex; flex-direction: row; gap: 4px;">
                            <p>${(art.stars || 5) < 4 ? '—' : art.score}</p>
                            <p>(${art.grade.letter})</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    if (p.buffs && p.buffs.length > 0) {
        let buffListHtml = "";

        const groupedBuffs = {};
        p.buffs.forEach((buff, bIndex) => {
            if (!groupedBuffs[buff.category]) {
                groupedBuffs[buff.category] = [];
            }
            groupedBuffs[buff.category].push({buff: buff, originalIndex: bIndex});
        });

        Object.keys(groupedBuffs).forEach(category => {
            buffListHtml += `<div>`;

            buffListHtml += `
                <div style="font-size:12px; margin-bottom:6px; color:#FFFFFF;">
                    ${category}
                </div>`;

            buffListHtml += `<div style="display: flex; flex-direction: column; gap: 6px;">`;

            groupedBuffs[category].forEach(item => {
                const buff = item.buff;
                const bIndex = item.originalIndex;

                const textColor = buff.active ? '#FFFFFF' : 'rgba(255,255,255,0.6)';
                const trackColor = buff.active ? 'rgb(from var(--char-hex) r g b / 0.6)' : 'rgba(255,255,255,0.2)';
                const knobColor = buff.active ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)';
                const knobTransform = buff.active ? 'transform:translateX(14px);' : '';

                buffListHtml += `
                    <div style="display:flex; flex-direction: row; gap: 8px; align-items:center; justify-content:space-between; padding:6px 8px; background:rgba(0,0,0,0.2); border-radius:8px; box-sizing: border-box;">
                        
                        <p style="font-size:12px; color:${textColor}; transition: color 0.3s; margin: 0; flex: 1; min-width: 0; word-break: break-word;">${buff.name}</p>
                        
                        <label class="switch" style="position:relative; display:inline-block; width:30px; min-width: 30px; height:16px; box-sizing: border-box; flex-shrink: 0;">
                            <input type="checkbox" ${buff.active ? 'checked' : ''} onchange="toggleBuff(${index}, ${bIndex})" style="opacity:0; width:0; height:0;">
                            <span style="position:absolute; cursor:pointer; top:0; left:0; right:0; bottom:0; background:${trackColor}; transition:.4s; border-radius:34px; width: 100%;"></span>
                            <span style="position:absolute; content:''; border-radius:50%; height:12px; width:12px; left:2px; bottom:2px; background-color:${knobColor}; transition:.4s; ${knobTransform} box-shadow: 0 1px 3px rgba(0,0,0,0.4);"></span>
                        </label>
                    </div>
                `;
            });

            buffListHtml += `</div>`;

            buffListHtml += `</div>`;
        });

        html += `
            <div class="card" style="width: 240px; min-width: 240px; height: 280px; border: 1px solid rgba(255, 255, 255, 0.4); transition: background-color 0.35s, box-shadow 0.25s, border-color 0.25s; border-radius: 8px; box-shadow: rgb(0, 0, 0) 1px 1px 6px, rgba(255, 255, 255, 0.3) 0px 0px 2px inset;">
                <div class="card-container" style="height: 100%; padding: 12px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: flex-start; align-items: stretch;">
                    
                    <div style="font-size:14px; flex-shrink: 0;">
                        <p style="margin-bottom: 2px;">Buffs actifs</p>
                        <p style="font-size: 12px; color: rgba(255, 255, 255, 0.4);">Cochez pour appliquer les passifs et buffs (scroll pour tout voir).</p>
                    </div>
                    
                    <div class="card-divider" style="flex-shrink: 0; margin: 9px 0px; display: flex; clear: both; width: 100%; min-width: 100%; box-sizing: border-box; color: rgba(255, 255, 255, 0.25); border-width: 1px 0 0; border-color: rgba(255, 255, 255, 0.25); border-block-start: 1px solid rgba(255, 255, 255, 0.25);"></div>
                    
                    <div class="card-buff-list-container" style="overflow-y: auto; position: relative; flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 9px;">
                        ${buffListHtml}
                    </div>
                </div>
            </div>
        `;
    }

    html += `</div></div>`;


    html += `
        <div class="coaching-row" style="margin-top:64px; width:100%;">
            ${(() => {
        const potential = calculateMaxTheoreticalScore(p, config);
        const efficiency = (potential.score > 0) ? ((ev.score / potential.score) * 100).toFixed(1) : 0;
        let effColor = '#ff4d4d';
        if (efficiency > 70) effColor = '#eab308';
        if (efficiency > 85) effColor = '#22c55e';
        if (efficiency > 95) effColor = '#a855f7';

        const gain = (potential.score - ev.score).toFixed(1);
        const setAdvice = getSetRecommendation(ev.setBonus, config);
        const deadRolls = calculateDeadRolls(p, config);
        const priorities = getPriorities(p);
        const critAdvice = getCritAdvice(b.cr, b.cd, config);
        const rollStats = calculateRollDistribution(p, config);
        const rngQuality = calculateRNGQuality(p, config).toFixed(1);
        const deadSims = simulateDeadStatReplacements(p, config);
        const mainStatAdvices = getMainStatAdvice(p, config);

        const offPieceAdvice = getOffPieceAdvice(p);
        const talentAdvices = getTalentAdvice(p, config);
        const setForcingAdvice = getSetForcingAdvice(p, config);
        const levelAdvice = getLevelAdvice(p);

        return `
                <div style="padding:20px;">
                    <h2 style="color:#fff; margin-bottom:25px; font-size:32px; border-bottom:2px solid #FFFFFF; padding-bottom:10px; display:flex; align-items:center; gap:10px;">${p.nom} - Analyse & conseils</h2>
                    
                    <div style="display:flex; flex-direction:column; gap:64px;">
                        
                        <div style="">
                            <h3 style="color:#FFFFFF; font-size:24px; margin-bottom: 12px;">1. Vue d'ensemble</h3>
                            <p style="border-left: 3px solid #aaa; padding-left: 12px; color: #aaa; font-size: 16px; margin-bottom: 24px;">Évaluez la qualité de vos sous-stats et ayez un aperçu réel du potentiel de vos artéfacts actuels.</p>
                            ${generateScoreBar(ev.totalRolls, ev.grade.letter, potential.totalRolls)}
                            
                            <div style="background:#2C2D32; padding:16px; border-radius:8px;">   
                                <div style="display:flex; justify-content:space-around; align-items:center; flex-wrap:wrap; gap:32px;">
                                    <div style="text-align:left;">
                                        <p style="font-size:12px; text-transform: uppercase; color:#aaa; margin-bottom: 8px;">Efficacité du Build</p>
                                        <p style="font-size:40px; line-height: 1; color:${effColor};">${efficiency}%</p>
                                    </div>
                                    <div style="text-align:left;">
                                        <p style="font-size:12px; text-transform: uppercase; color:#aaa; margin-bottom: 8px;">Facteur Chance (RNG)</p>
                                        <p style="font-size:40px; line-height: 1; color:${rngQuality > 85 ? '#22c55e' : (rngQuality > 75 ? '#eab308' : '#ff4d4d')}">${rngQuality}%</p>
                                    </div>
                                    <div style="flex:1; min-width:200px;">
                                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; font-size:0.8rem;">
                                            <span style="color:#aaa; font-size: 12px; text-transform: uppercase;">Score Potentiel Max</span>
                                            <span style="font-weight:bold; color:var(--accent-gold);">${potential.score} <span style="color:#22c55e; font-size:0.7rem;">(+${gain})</span></span>
                                        </div>
                                        <div style="width:100%; background:#333; height:40px; border-radius:8px; position:relative;">
                                            <div style="height:100%; background:#fff; width:${Math.min((ev.score / potential.score) * 100, 100)}%; border-radius:8px; position:absolute;"></div>
                                            <div style="height:100%; background:var(--accent-gold); width:100%; opacity:0.3; border-radius:8px;"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                       <div style="margin: auto 10px; flex-grow: 1; width: unset; min-width: unset; background: none; border-color: rgba(255, 255, 255, 0.25); border-style: dashed; border-width: 1px 0 0; display: flex; clear: both;"></div>
                                
                        <div>
                            <h3 style="color:#FFFFFF; font-size:24px; margin-bottom: 12px;">2. Analyse stratégique</h3>
                            <p style="border-left: 3px solid #aaa; padding-left: 12px; color: #aaa; font-size: 16px; margin-bottom: 24px;">Identifiez les déséquilibres majeurs de votre build et assurez-vous que votre pièce hors-set apporte un vrai bonus.</p>
                            
                            <div style="display:flex; gap:20px; align-items:stretch;">
                                
                                <div style="flex:1; background:#2C2D32; padding:15px; border-radius:8px; border-left:3px solid ${critAdvice.color};">
                                    <p style="font-size:12px; color:#aaa; text-transform:uppercase; margin-bottom:8px;">Analyse de taux critique</p>
                                    <p style="font-size:16px; color:#fff;">${critAdvice.msg}</p>
                                </div>
                                ${(() => {
            const targetER = (p.activeBuild && p.activeBuild.er_req) ? p.activeBuild.er_req : 100;
            const currentER = b.er; 

            const adv = getERAdvice(currentER, targetER);
            if (!adv) return '';

            const color = adv.type === 'success' ? '#22c55e' : (adv.type === 'info' ? '#3b82f6' : '#ef4444');

            return `
                                    <div style="flex: 1; background:#2C2D32; padding:15px; border-radius:8px; border-left:3px solid ${color};">
                                        <p style="font-size: 12px;color: #aaa; text-transform: uppercase;margin-bottom: 8px;">${adv.title}</p>
                                        <p style="font-size: 16px; color:#fff;">${adv.msg}</p>
                                    </div>`;
        })()}
                                <div style="flex:1; background:#2C2D32; padding:15px; border-radius:8px; display:flex; flex-direction:column; justify-content:space-between;">
                                    <div style="margin-bottom:12px;">
                                        <div style="color:#aaa; text-transform:uppercase; margin-bottom:8px; display:flex; justify-content:space-between; align-items:flex-end;">
                                            <p style="font-size:12px;">Répartition des Rolls</p>
                                            <div style="font-size:11px;">
                                                <span style="color:#22c55e;">${rollStats.usefulCount} Utiles</span> / 
                                                <span style="color:#ff4d4d;">${rollStats.deadCount} Morts</span>
                                            </div>
                                        </div>
                                        
                                        <div style="display:flex; width:100%; height:8px; background:#333; border-radius:4px; overflow:hidden;">
                                            <div style="width:${(rollStats.usefulCount / rollStats.total) * 100}%; background:#22c55e;"></div>
                                            <div style="width:${(rollStats.deadCount / rollStats.total) * 100}%; background:#ff4d4d;"></div>
                                        </div>
                                    </div>
                                
                                    <div style="margin-bottom:10px;">
                                        <p style="font-size:11px; color:#aaa; margin-bottom:4px;">Stats Utiles</p>
                                        <div style="display:flex; flex-wrap:wrap; gap:5px;">
                                            ${rollStats.usefulDetails.map(d =>
            `<span style="background:rgba(34, 197, 94, 0.15); color:#86efac; font-size:0.75rem; padding:2px 6px; border-radius:4px; border:1px solid rgba(34, 197, 94, 0.2);">
                                                    ${d.label} (${d.count})
                                                </span>`
        ).join('')}
                                        </div>
                                    </div>
                                
                                    <div>
                                        <p style="font-size:11px; color:#aaa; margin-bottom:4px;">Stats Inutiles</p>
                                        <div style="display:flex; flex-wrap:wrap; gap:5px;">
                                            ${rollStats.deadDetails.length > 0 ? rollStats.deadDetails.map(d =>
            `<span style="background:rgba(255, 77, 77, 0.15); color:#ff9999; font-size:0.75rem; padding:2px 6px; border-radius:4px; border:1px solid rgba(255, 77, 77, 0.2);">
                                                    ${d.label} (${d.count})
                                                </span>`
        ).join('') : '<span style="color:#22c55e; font-size:0.75rem;">Aucune !</span>'}
                                        </div>
                                    </div>
                                
                                </div>
                                
                                ${offPieceAdvice ? `
                                <div style="flex:1; background:#2C2D32; padding:15px; border-radius:8px; border: 1px solid rgba(255, 255, 255, 0.05); border-left:3px solid ${offPieceAdvice.type === 'success' ? '#22c55e' : (offPieceAdvice.type === 'warning' ? '#eab308' : '#ef4444')};">
                                    <p style="font-size:12px; color:#aaa; text-transform:uppercase; margin-bottom:8px;">Analyse Pièce Hors-Set</p>
                                    <p style="font-size:16px; color:#fff;">${offPieceAdvice.msg}</p>
                                </div>` : ''}
                                
                            </div>
                        </div>

                       <div style="margin: auto 10px; flex-grow: 1; width: unset; min-width: unset; background: none; border-color: rgba(255, 255, 255, 0.25); border-style: dashed; border-width: 1px 0 0; display: flex; clear: both;"></div>

                        <div>
                            <h3 style="color:#FFFFFF; font-size:24px; margin-bottom: 12px;">3. Plan d'action</h3>
                            <p style="border-left: 3px solid #aaa; padding-left: 12px; color: #aaa; font-size: 16px; margin-bottom: 24px;">Votre feuille de route prioritaire avec les corrections urgentes à appliquer et les artéfacts à remplacer.</p>
                            
                            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:20px;">
                            
                            
                            ${(() => {
            const crossChecks = getAllCrossCheckAdvice(index);
            const hasAnySwap = crossChecks.some(s => s !== null);
            if (!hasAnySwap) return '<div style="grid-column:1/-1; color:#666; font-size:13px; font-style:italic;">Aucun échange avantageux entre personnages de la vitrine.</div>';

            const cards = crossChecks.map(swap => {
                if (!swap) {
                    return `
        <div style="flex: 1; min-width: 200px; background:#2C2D32; border-radius:8px; padding:11px; display:flex; flex-direction:column; gap:9px; border-top:2px solid #3a3b42; box-sizing:border-box; opacity:0.4; align-items:center; justify-content:center; min-height:160px;">
            <div style="font-size:22px; color:#444;">✗</div>
            <p style="font-size:11px; color:#888; text-align:center; line-height:1.5;">Aucun échange<br>avantageux détecté</p>
        </div>`;
                }

                const deltasHtml = swap.deltas.map(d => `
    <div style="display:flex; align-items:center; gap:5px; font-size:11px; color:${d.delta > 0 ? '#4ade80' : '#f87171'};">
        <div style="width:6px; height:6px; border-radius:50%; flex-shrink:0; background:${d.delta > 0 ? '#4ade80' : '#f87171'};"></div>
        ${d.formatted}
    </div>`).join('');

                const scoreDiff = Math.round(swap.currEvalNew.score - swap.currEvalOld.score);

                return `
    <div style="flex: 1; min-width: 200px; background:#2C2D32; border-radius:8px; padding:11px; display:flex; flex-direction:column; gap:9px; border-top:2px solid var(--accent-gold); box-sizing:border-box;">
        <div style="display:flex; align-items:center; justify-content:space-between; gap:6px;">
            <div style="position:relative; flex-shrink:0;">
                <img src="${swap.currArt.icon}" style="width:52px; height:52px; border-radius: 8px; background-color: rgba(0, 0, 0, 0.1);">
                <img src="${swap.currCharIcon}" style="position:absolute; bottom:-4px; right:-4px; width:30px; height:30px; border-radius:50%; border:1.5px solid #2C2D32;">
            </div>
            <span style="color:var(--accent-gold); font-size:16px;">⇒</span>
            <div style="position:relative; flex-shrink:0;">
                <img src="${swap.newArt.icon}" style="width:52px; height:52px; border-radius: 8px; background-color: rgba(0, 0, 0, 0.1);">
                <img src="${swap.otherCharIcon}" style="position:absolute; bottom:-4px; right:-4px; width:30px; height:30px; border-radius:50%; border:1.5px solid #2C2D32;">
            </div>
        </div>
        <div style="width:100%; height:1px; background:rgba(255,255,255,0.06);"></div>
        <div style="display:flex; flex-direction:column; gap:4px;">${deltasHtml}</div>
        <div style="width:100%; height:1px; background:rgba(255,255,255,0.06);"></div>
        <div style="display:flex; align-items:center; justify-content:center; gap:8px;">
            <span style="font-size:13px; font-weight:bold; color:${swap.currEvalOld.grade.color};">${swap.currEvalOld.score}</span>
            <span style="font-size:12px; color:#666;">→</span>
            <span style="font-size:13px; font-weight:bold; color:${swap.currEvalNew.grade.color};">${swap.currEvalNew.score} <span style="font-size:11px; color:#c8a96e; font-weight:normal;">(${scoreDiff > 0 ? '+' : ''}${scoreDiff} pts)</span></span>
        </div>
    </div>`;
            });

            return `<div style="grid-column:1/-1; width:100%; box-sizing:border-box; display:flex; flex-wrap:nowrap; gap:20px; overflow-x:auto;">${cards.join('')}</div>`;
        })()}
                        
                                ${(() => {
            const adv = getLevelAdvice(p);
            const color = adv.type === 'success' ? '#22c55e' : '#ef4444';
            return `
                                    <div style="background:#2C2D32; padding:15px; border-radius:8px; border-left:3px solid ${color};">
                                        <p style="font-size: 12px;color: #aaa; text-transform: uppercase;margin-bottom: 8px;">${adv.title}</p>
                                        <p style="font-size: 16px; color:#fff;">${adv.msg}</p>
                                    </div>`;
        })()}
                        
                                ${(() => {
            const adv = getWeaponAdvice(p);
            const color = adv.type === 'success' ? '#22c55e' : '#ef4444';
            return `
                                    <div style="background:#2C2D32; padding:15px; border-radius:8px; border-left:3px solid ${color};">
                                        <p style="font-size: 12px;color: #aaa; text-transform: uppercase;margin-bottom: 8px;">${adv.title}</p>
                                        <p style="font-size: 16px; color:#fff;">${adv.msg}</p>
                                    </div>`;
        })()}
                        
                                ${talentAdvices && talentAdvices.length > 0 ? `
                                    <div style="background:#2C2D32; padding:15px; border-radius:8px; border-left:3px solid ${talentAdvices[0].type === 'success' ? '#22c55e' : (talentAdvices.some(a => a.type === 'critical') ? '#ef4444' : '#ef4444')};">
                                        <p style="font-size: 12px;color: #aaa; text-transform: uppercase;margin-bottom: 8px;">Priorité des Aptitudes</p>
                                        ${talentAdvices.map(adv => `
                                            <p style="font-size: 16px; color:#fff;">${adv.msg}</p>
                                        `).join('')}
                                    </div>`
            : ''}
                        
                                ${(() => {
            const adv = getMainStatAdvice(p, config);
            if (!adv) return '';
            const color = adv.type === 'success' ? '#22c55e' : '#ef4444';
            return `
                                    <div style="background:#2C2D32; padding:15px; border-radius:8px; border-left:3px solid ${color};">
                                        <p style="font-size: 12px;color: #aaa; text-transform: uppercase;margin-bottom: 8px;">${adv.title}</p>
                                        ${adv.type === 'success'
                ? `<p style="font-size:16px; color:#fff;">${adv.msg}</p>`
                : adv.details.map(d => `
                                            <p style="font-size:16px; color:#fff;">
                                                Sur <b style="color: #aaa;">${d.piece}</b>, visez <span style="color:var(--accent-gold); font-weight:bold;">${d.better}</span> (Actuellement : <span style="color:var(--accent-gold);">${d.current}</span>).
                                            </p>
                                        `).join('')}
                                    </div>`;
        })()}
                        
                                ${(() => {
            const adv = getMetaSetAdvice(p, config);
            if (!adv) return '';

            let color;
            if (adv.type === 'success') {
                color = '#22c55e';
            } else if (adv.type === 'warning') {
                color = '#ef4444';
            } else {
                color = '#f97316';
            }

            return `
                                    <div style="background:#2C2D32; padding:15px; border-radius:8px; border-left:3px solid ${color};">
                                        <p style="font-size: 12px;color: #aaa; text-transform: uppercase;margin-bottom: 8px;">${adv.title}</p>
                                        <p style="font-size: 16px; color:#fff;">${adv.msg}</p>
                                    </div>`;
        })()}
                        
                                ${(() => {
            const adv = getSetForcingAdvice(p, config);
            const color = adv.type === 'success' ? '#22c55e' : '#ef4444';
            return `
                                    <div style="background:#2C2D32; padding:15px; border-radius:8px; border-left:3px solid ${color};">
                                        <p style="font-size: 12px;color: #aaa; text-transform: uppercase;margin-bottom: 8px;">${adv.title}</p>
                                        <p style="font-size: 16px; color:#fff;">${adv.msg}</p>
                                    </div>`;
        })()}
                        
                                <div style="background:#2C2D32; padding:15px; border-radius:8px; grid-column: 1 / -1;">
                                    <p style="font-size:12px; color:#aaa; text-transform:uppercase; margin-bottom:8px;">Top 3 des artéfacts à changer par ordre de priorité</p>
                                    ${priorities.length > 0 ? priorities.map((p, i) => {
            const difficulty = getFarmDifficulty(p.type, p.mainKey);
            const estimate = getResinCostEstimate(p.type, p.mainKey, p.score); 

            return `
                                        <div style="display:flex; justify-content:space-between; align-items:center; font-size:16px; margin-bottom:8px; padding-bottom:8px; border-bottom:1px dashed rgba(255,255,255,0.1);">
                                            <div style="display:flex; flex-direction:column;">
                                                <div style="display:flex; align-items:center; gap:6px;">
                                                    <p style="font-size: 16px; color:#ddd;">${i + 1}. ${p.piece}</p>
                                                    ${p.isOffPiece ? '<p style="font-size:0.7rem; color:rgba(34, 198, 94, 1); background:rgba(34, 198, 94, 0.15); padding:1px 4px; border-radius:4px;">Off-Set</p>' : ''}
                                                </div>
                                                
                                                <p style="font-size:12px; color:#9ca3af; margin-left: 16px; margin-top:1px;">${p.setName} • <span style="color:#fff;">${p.mainLabel}</span></p>
                                                
                                                <div style="display:flex; align-items:center; gap: 8px; margin-left: 16px; margin-top:4px;">
                                                    <p style="font-size:12px; color:${difficulty.color};">${difficulty.label}</p>
                                                    <div style="width: 4px; height: 4px; border-radius: 50%; background-color: rgba(255,255,255,0.2);"></div>
                                                    <p style="font-size:12px; color:#aaa; font-family: ShinShin, sans-serif;">
                                                        <span style="color:#fff;">~${estimate.resin}</span> Résines (<span style="color:#fff;">${estimate.days} jours</span>)
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div style="text-align:right; display: flex; flex-direction: row; gap: 4px;">
                                                <p style="color:${p.color}; font-size:16px;">${p.score}</p>
                                                <p style="color:${p.color}; font-size:16px;">(${p.grade})</p>
                                            </div>
                                        </div>
                                    `
        }).join('') : '<p style="color:#22c55e;">Rien à signaler, excellent travail.</p>'}
                                </div>
                            </div>
                        </div>
                        
                        <div style="margin: auto 10px; flex-grow: 1; width: unset; min-width: unset; background: none; border-color: rgba(255, 255, 255, 0.25); border-style: dashed; border-width: 1px 0 0; display: flex; clear: both;"></div>

                        ${deadSims.length > 0 ? `
                        <div>
                            <h3 style="color:#FFFFFF; font-size:24px; margin-bottom: 12px;">4. Projection idéale</h3>
                            <p style="border-left: 3px solid #aaa; padding-left: 12px; color: #aaa; font-size: 16px; margin-bottom: 24px;">Visualisez les statistiques que vous pourriez obtenir si vos statistiques inutiles étaient converties en statistiques optimales.</p>
                            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:20px;">
                            ${deadSims.map(sim => `
                                <div style="background:#2C2D32; padding:12px; border-radius:6px; border-left:3px solid #FFB13B;">
                                    <p style="font-size:12px; text-transform: uppercase; color:#aaa; margin-bottom:8px;">${sim.pieceName}</p>
                                    <p style="font-size:14px; color:#ffffff; margin-bottom: 12px;">${sim.text}</p>
                                    <div style="font-size:16px; color:var(--accent-gold); display: flex; flex-direction: column; gap: 4px;">${sim.gainHtml}</div>
                                </div>
                            `).join('')}
                            </div>
                        </div>` : ''}
                        
                        <div style="margin: auto 10px; flex-grow: 1; width: unset; min-width: unset; background: none; border-color: rgba(255, 255, 255, 0.25); border-style: dashed; border-width: 1px 0 0; display: flex; clear: both;"></div>

                        <div>
                            <h3 style="color:#FFFFFF; font-size:24px; margin-bottom: 12px;">5. Détails des rolls</h3>
                            <p style="border-left: 3px solid #aaa; padding-left: 12px; color: #aaa; font-size: 16px; margin-bottom: 24px;">Lisez dans le code source du jeu et découvrez exactement quelle qualité de statistiques vous avez obtenue.</p>
                            
                            <div style="display:flex; flex-direction: row; justify-content: space-between; gap:15px;">
                                ${p.artefacts.map(art => {
            const pieceName = ARTIFACT_TYPE_MAPPING[art.type] || art.type;

            if ((art.stars || 5) < 4) {
                return `
<div style="width: 100%; background:#2C2D32; padding:10px 12px; border-radius:8px; opacity:0.5;">
    <div style="display:flex; align-items:center; gap:10px; margin-bottom:6px;">
        <img src="${art.icon}" style="width:38px; height:38px; border-radius:8px;" alt="">
        <div>
            <p style="font-size:12px; color:#fff; font-weight:bold;">${pieceName}</p>
            <p style="font-size:11px; color:#6b7280;">Artéfact ${art.stars}★ — Analyse indisponible</p>
        </div>
    </div>
</div>`;
            }
            let subsDetailsHtml = art.subStats.map((sub, idx) => {
                const details = getRollDetails(sub.key, sub.value, art.stars || 5);
                const baseRolls = (art.stars === 4 ? window.BASE_ROLLS_4 : window.BASE_ROLLS)?.[sub.key] || [];
                const colors = ['#6CED75', '#00E497', '#00BFE9', '#EE72F7'];

                const rollsHtml = details.rolls.map((rollValue, index) => {
                    const tierIndex = baseRolls.indexOf(rollValue);
                    const color = tierIndex !== -1 ? colors[tierIndex] : '#fff';
                    const displayVal = (sub.key === "atk" || sub.key === "def" || sub.key === "hp") ? Math.round(rollValue) : rollValue.toFixed(1);
                    const plusSign = (index < details.rolls.length - 1) ? ' <span style="color:#555;">+</span> ' : '';
                    return `<span style="color:${color}; font-weight:bold;">${displayVal}</span>${plusSign}`;
                }).join('');

                return `
        <div style="padding: 4px 0; ${idx < art.subStats.length - 1 ? 'border-bottom: 1px dashed rgba(255,255,255,0.08);' : ''}">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 2px;">
                <p style="font-size:11px; color:#aaa; display:flex; align-items:center; gap:4px;">
                    <img src="${ICON_BASE_PATH}${ICON_MAP[sub.key] || ICON_MAP['unknown']}" style="width:13px; height:13px;" alt="">
                    ${sub.label}
                </p>
                <p style="font-size:12px; color:#fff; font-weight:bold;">${formatValueDisplay(sub.key, sub.value)}</p>
            </div>
            <div style="font-size:11px; text-align:right; font-family: monospace; line-height: 1.2;">
                ${rollsHtml}
            </div>
        </div>
    `;
            }).join('');

            return `
<div style="width: 100%; background:#2C2D32; padding:10px 12px; border-radius:8px;">
    <div style="display:flex; align-items:center; gap:10px; margin-bottom:6px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom:8px;">
        <img src="${art.icon}" style="width:38px; height:38px; border-radius:8px; background-color: rgba(0,0,0,0.1)" alt="">
        <div style="display:flex; flex-direction:column; justify-content:center; gap: 2px;">
            <p style="font-size:12px; color:#fff; font-weight:bold; overflow:hidden; text-overflow:ellipsis;">
                ${pieceName}
            </p>
            <p style="font-size:11px; color:${art.grade.color}; opacity:0.9;">
                ${art.score} (${art.grade.letter})
            </p>
        </div>
    </div>
    
    <div style="display:flex; flex-direction:column; gap:0;">
        ${subsDetailsHtml}
    </div>
</div>
`;
        }).join('')}
                            </div>
                            
                            <div style="display:flex; justify-content:center; gap:15px; margin-top:15px; font-size:11px; color:#aaa; background:#2C2D32; padding: 8px; border-radius: 6px;">
                                <span style="display:flex; align-items:center; gap:4px;"><span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#6CED75;"></span> Jet faible</span>
                                <span style="display:flex; align-items:center; gap:4px;"><span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#00E497;"></span> Jet moyen</span>
                                <span style="display:flex; align-items:center; gap:4px;"><span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#00BFE9;"></span> Jet fort</span>
                                <span style="display:flex; align-items:center; gap:4px;"><span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#EE72F7;"></span> Jet parfait</span>
                            </div>
                        </div>
                        
                        <div style="margin: auto 10px; flex-grow: 1; width: unset; min-width: unset; background: none; border-color: rgba(255, 255, 255, 0.25); border-style: dashed; border-width: 1px 0 0; display: flex; clear: both;"></div>

                        <div>
                            <h3 style="color:#FFFFFF; font-size:24px; margin-bottom: 12px;">6. Simulateur de reroll</h3>
                            <p style="border-left: 3px solid #aaa; padding-left: 12px; color: #aaa; font-size: 16px; margin-bottom: 24px;">Évaluez s'il est rentable de redistribuer les valeurs des statistiques de vos artéfacts vers de meilleures valeurs.</p>
                        
                            <div style="display:flex; flex-direction: row; justify-content: space-between; gap:15px;">
                                ${p.artefacts.map(art => {
            const metrics = calculateRerollMetrics(art, config);

            if (!metrics) return '';

            const pieceName = ARTIFACT_TYPE_MAPPING[art.type] || art.type;

            return `
                                    <div style="width: 100%; background:#2C2D32; padding:12px; border-radius:8px; border-left: 3px solid ${metrics.badge.color}">
                                        
                                        <div style="display:flex; align-items:center; gap:12px; margin-bottom:10px;">
                                            <img src="${art.icon}" style="width:42px; height:42px; border-radius:8px; background-color: rgba(0,0,0,0.1)" alt="">
                                            <div style="display:flex; flex-direction:column; justify-content:center; gap: 3px;">
                                                <p style="font-size:12px; color:#fff; font-weight:bold; overflow:hidden; text-overflow:ellipsis;">
                                                    ${pieceName}
                                                </p>
                                                <p style="font-size:12px; color:${art.grade.color}; opacity:0.9;">
                                                    ${art.score} (${art.grade.letter})
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div style="margin-bottom:8px;">
                                            <div style="display:flex; justify-content:space-between; font-size:12px; color:#aaa; margin-bottom: 4px;">
                                                <p>Potentiel de gain</p>
                                                <p style="color:${metrics.potential > 60 ? '#22c55e' : '#ccc'}">${metrics.potential}%</p>
                                            </div>
                                            <div style="width:100%; height:4px; background:#333; border-radius:2px;">
                                                <div style="width:${metrics.potential}%; height:100%; background:linear-gradient(90deg, #3b82f6, #22c55e); border-radius:2px;"></div>
                                            </div>
                                        </div>
                        
                                        <div style="margin-bottom:12px;">
                                            <div style="display:flex; justify-content:space-between; font-size:12px; color:#aaa; margin-bottom: 4px;">
                                                <p>Risque de perte</p>
                                                <p style="color:${metrics.risk > 60 ? '#ff4d4d' : '#ccc'}">${metrics.risk}%</p>
                                            </div>
                                            <div style="width:100%; height:4px; background:#333; border-radius:2px;">
                                                <div style="width:${metrics.risk}%; height:100%; background:linear-gradient(90deg, #f59e0b, #ff4d4d); border-radius:2px;"></div>
                                            </div>
                                        </div>
                        
                                        <p style="text-align:center; background:${metrics.badge.color}20; color:${metrics.badge.color}; padding:4px; border-radius:4px; font-size:12px; border:1px solid ${metrics.badge.color}40;">
                                            ${metrics.badge.text}
                                        </p>
                        
                                    </div>
                                    `;
        }).join('')}
                            </div>
                        </div>

                    </div>
                </div>
                `;
    })()}
        </div>
    `;

    container.innerHTML = html;
    renderToolbar(index);
}

loadGameData();

const uidInput = document.getElementById('uidInput');
if (uidInput) {
    uidInput.focus();
    uidInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            fetchUserData();
        }
    });
}

window.exportBuildAsImage = async function () {
    const element = document.querySelector('.top-row');
    if (!element) return alert("Aucun build affiché !");

    const btn = document.querySelector('button[onclick="exportBuildAsImage()"]');
    const originalContent = btn ? btn.innerHTML : 'Exporter';
    if (btn) btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Traitement...';

    const bgDiv = element.querySelector('.background-splash-art');
    let originalBgImage = "";

    if (bgDiv) {
        try {
            const computedStyle = window.getComputedStyle(bgDiv);
            const bgUrlMatch = computedStyle.backgroundImage.match(/url\(["']?([^"']*)["']?\)/);

            if (bgUrlMatch && bgUrlMatch[1]) {
                const imgUrl = bgUrlMatch[1];
                originalBgImage = bgDiv.style.backgroundImage;

                const proxyUrl = 'https://wsrv.nl/?url=' + encodeURIComponent(imgUrl) + '&output=png';

                const res = await fetch(proxyUrl);
                if (!res.ok) throw new Error("Erreur wsrv : " + res.status);

                const blob = await res.blob();
                const reader = new FileReader();

                await new Promise((resolve, reject) => {
                    reader.onloadend = resolve;
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                });

                if (reader.result) {
                    bgDiv.style.backgroundImage = `url('${reader.result}')`;
                }
            }
        } catch (e) {
            console.warn("Le fond n'a pas pu être chargé (export continu sans fond) :", e);
        }
    }

    await new Promise(r => setTimeout(r, 50));

    domtoimage.toPng(element, {
        bgcolor: null,
        scale: 2,
        filter: (node) => true
    })
        .then(function (dataUrl) {
            const nameEl = document.querySelector('.showcase-area-base-stats h2');
            const charName = nameEl ? nameEl.innerText.trim() : 'Genshin_Build';

            const uidInput = document.getElementById('uidInput');
            const uid = uidInput ? uidInput.value.trim() : '';

            const fileName = uid ? `Build_${charName}_${uid}.png` : `Build_${charName}.png`;

            const link = document.createElement('a');
            link.download = fileName;
            link.href = dataUrl;
            link.click();
        })
        .catch(function (error) {
            console.error('Erreur export dom-to-image :', error);
            alert('Erreur lors de la création de l\'image.');
        })
        .finally(function () {
            if (bgDiv && originalBgImage) {
                bgDiv.style.backgroundImage = originalBgImage;
            }
            if (btn) btn.innerHTML = originalContent;
        });
};

window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlUid = urlParams.get('uid');
    const urlChar = urlParams.get('char');

    if (urlUid) {
        const uidInput = document.getElementById('uidInput');
        if (uidInput) uidInput.value = urlUid;

        fetchUserData(urlUid).then(() => {

            toggleSearchIcon(true);

            if (urlChar && globalPersoData && globalPersoData.length > 0) {
                const targetIndex = globalPersoData.findIndex(p => p.nom.toLowerCase() === urlChar.toLowerCase());

                if (targetIndex !== -1) {
                    renderShowcase(targetIndex);
                }
            }
        }).catch(err => {
            console.error("Erreur lors du chargement via URL :", err);
            const uidInput = document.getElementById('uidInput');
            if (uidInput) uidInput.value = '';
            window.history.replaceState({}, '', window.location.pathname);
            renderHome();
            const loader = document.getElementById('loading-msg');
            if (loader) {
                loader.innerText = "Lien invalide ou compte introuvable.";
                loader.style.color = "#ef4444";
                setTimeout(() => {
                    loader.innerText = "";
                    loader.style.color = "";
                }, 5000);
            }
        });
    } else {
        renderHome();
    }
});