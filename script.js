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

const FLAT_STAT_KEYS = new Set(['hp', 'atk', 'def', 'eleMas']);

const _rollDetailsCache = new Map();
function getRollDetails(key, value, rarity = 5) {
    const cacheKey = `${key}|${value}|${rarity}`;
    if (_rollDetailsCache.has(cacheKey)) return _rollDetailsCache.get(cacheKey);

    const fightProp = KEY_TO_FIGHT_PROP[key];
    const table = window.ROLL_TABLE?.[String(rarity)]?.[fightProp];

    if (table) {
        const lookupKey = FLAT_STAT_KEYS.has(key)
            ? String(Math.round(value))
            : String(parseFloat(value.toFixed(1)));

        const entry = table[lookupKey];
        if (entry && entry[0]) {
            const rawRolls = entry[0];
            const rolls = FLAT_STAT_KEYS.has(key)
                ? rawRolls
                : rawRolls.map(r => parseFloat((r * 100).toFixed(2)));

            const result = { k: rolls.length, rolls };
            _rollDetailsCache.set(cacheKey, result);
            return result;
        }
    }

    const baseRollsDef = rarity === 4
        ? (window.BASE_ROLLS_4 || BASE_ROLLS_4)
        : (window.BASE_ROLLS || BASE_ROLLS);

    if (!baseRollsDef || !baseRollsDef[key]) {
        return { k: 1, rolls: [value] };
    }

    const possibleRolls = baseRollsDef[key];
    let bestMatch = { k: 1, diff: Infinity, rolls: [value] };

    function checkCombinations(k, currentSum, startIndex, depth, currentRolls) {
        if (depth === k) {
            const diff = Math.abs(currentSum - value);
            if (diff < bestMatch.diff) {
                bestMatch = { k, diff, rolls: [...currentRolls] };
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

    _rollDetailsCache.set(cacheKey, bestMatch);
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
    get "hp"()           { return t('stat.hp'); },
    get "hp_"()          { return t('stat.hp_'); },
    get "atk"()          { return t('stat.atk'); },
    get "atk_"()         { return t('stat.atk_'); },
    get "def"()          { return t('stat.def'); },
    get "def_"()         { return t('stat.def_'); },
    get "eleMas"()       { return t('stat.eleMas'); },
    get "enerRech_"()    { return t('stat.enerRech_'); },
    get "critRate_"()    { return t('stat.critRate_'); },
    get "critDMG_"()     { return t('stat.critDMG_'); },
    get "heal_"()        { return t('stat.heal_'); },
    get "pyro_dmg_"()    { return t('stat.pyro_dmg_'); },
    get "hydro_dmg_"()   { return t('stat.hydro_dmg_'); },
    get "cryo_dmg_"()    { return t('stat.cryo_dmg_'); },
    get "electro_dmg_"() { return t('stat.electro_dmg_'); },
    get "anemo_dmg_"()   { return t('stat.anemo_dmg_'); },
    get "geo_dmg_"()     { return t('stat.geo_dmg_'); },
    get "dendro_dmg_"()  { return t('stat.dendro_dmg_'); },
    get "physical_dmg_"(){ return t('stat.physical_dmg_'); }
};

const RESONANCE_DATA = {
    "pyro":    { get name() { return t('resonance.pyro'); },    active: false, stats: {atk_: 0.25} },
    "hydro":   { get name() { return t('resonance.hydro'); },   active: false, stats: {hp_: 0.25} },
    "dendro":  { get name() { return t('resonance.dendro'); },  active: false, stats: {eleMas: 50} },
    "electro": { get name() { return t('resonance.electro'); }, active: false, stats: {} },
    "cryo":    { get name() { return t('resonance.cryo'); },    active: false, stats: {critRate_: 0.15} },
    "geo":     { get name() { return t('resonance.geo'); },     active: false, stats: {} },
    "anemo":   { get name() { return t('resonance.anemo'); },   active: false, stats: {} }
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
    // 6.7
    "Une cuillerée de transcendance": "ATeaspoonOfTranscendence",

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
    get "EQUIP_BRACER"()   { return t('artifact.EQUIP_BRACER'); },
    get "EQUIP_NECKLACE"() { return t('artifact.EQUIP_NECKLACE'); },
    get "EQUIP_SHOES"()    { return t('artifact.EQUIP_SHOES'); },
    get "EQUIP_RING"()     { return t('artifact.EQUIP_RING'); },
    get "EQUIP_DRESS"()    { return t('artifact.EQUIP_DRESS'); }
};

const SLOT_POSSIBLE_MAIN_STATS = {
    "EQUIP_SHOES": ["hp_", "atk_", "def_", "enerRech_", "eleMas"],
    "EQUIP_RING": ["hp_", "atk_", "def_", "eleMas", "physical_dmg_", "pyro_dmg_", "hydro_dmg_", "cryo_dmg_", "electro_dmg_", "anemo_dmg_", "geo_dmg_", "dendro_dmg_"],
    "EQUIP_DRESS": ["hp_", "atk_", "def_", "eleMas", "critRate_", "critDMG_", "heal_"]
};

let globalPersoData = [];

let sidebarSortState = {column: 'original', direction: 'desc'};

const THEME_COLORS = {
    'dark': '#323338',
    'abyssal': '#000000',
    'sea': '#15223B',
    'wish': '#181926',
    'guild': '#2F2620'
};

function toggleThemeMenu(event) {
    event.stopPropagation();
    const langMenu = document.getElementById('lang-custom-menu');
    if (langMenu) langMenu.classList.remove('show');
    document.getElementById('theme-custom-menu').classList.toggle('show');
}

function toggleLangMenu(event) {
    event.stopPropagation();
    const themeMenu = document.getElementById('theme-custom-menu');
    if (themeMenu) themeMenu.classList.remove('show');
    document.getElementById('lang-custom-menu').classList.toggle('show');
}

function selectCustomTheme(themeValue, themeName) {
    changeTheme(themeValue);
    document.getElementById('active-theme-text').innerText = themeName;
    document.getElementById('active-theme-dot').style.background = THEME_COLORS[themeValue];
    document.getElementById('theme-custom-menu').classList.remove('show');
}
function changeTheme(themeValue) {
    document.documentElement.setAttribute('data-theme', themeValue);
    localStorage.setItem('guoba_theme', themeValue);
}

function toggleBuildMenu(event) {
    event.stopPropagation();
    const menu = document.getElementById('build-custom-menu');
    const isOpen = menu.classList.contains('show');
    closeAllDataMenus();
    if (!isOpen) {
        menu.classList.add('show');
    }
}

function toggleErMenu(event) {
    event.stopPropagation();
    const menu = document.getElementById('er-custom-menu');
    const isOpen = menu.classList.contains('show');
    closeAllDataMenus();
    if (!isOpen) {
        menu.classList.add('show');
    }
}

function closeAllDataMenus() {
    const buildMenu = document.getElementById('build-custom-menu');
    const erMenu = document.getElementById('er-custom-menu');
    if (buildMenu) buildMenu.classList.remove('show');
    if (erMenu) erMenu.classList.remove('show');
}

function selectCustomBuild(charIndex, buildKey) {
    closeAllDataMenus();
    switchBuild(charIndex, buildKey);
}

function selectCustomER(charIndex, erValue) {
    closeAllDataMenus();
    updateERTarget(charIndex, erValue);
}

document.addEventListener('click', () => {
    const themeMenu = document.getElementById('theme-custom-menu');
    const langMenu = document.getElementById('lang-custom-menu');
    if (themeMenu) themeMenu.classList.remove('show');
    if (langMenu) langMenu.classList.remove('show');
    closeAllDataMenus();
});

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
        nickname: playerInfo.nickname || t('data.unknownPlayer'),
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
    hideSidebarNav();
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
            <div style="display:flex; gap:5px; padding:5px; background:var(--bg-panel); border-radius:8px;">
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

            <!-- Fond neutre -->
            <div style="position:absolute; inset:0; z-index:0; background:#1e2024;"></div>

            <!-- Colonne gauche : portrait + arme -->
            <div style="display:flex; flex-direction:column; gap:8px; flex-shrink:0; position:relative; z-index:1;">
                <div class="sk" style="width:350px; height:720px; border-radius:8px; border:1px solid rgba(255,255,255,0.08);"></div>
                <div class="sk" style="width:350px; height:128px; border-radius:8px; border:1px solid rgba(255,255,255,0.08);"></div>
            </div>

            <!-- Colonne milieu : stats + score + skills + combat -->
            <div style="width:299px; flex-shrink:0; display:flex; flex-direction:column; gap:8px; position:relative; z-index:1;">

                <!-- Stats de base -->
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

                <!-- Skills -->
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

            <!-- Colonne droite : équipement -->
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
    if (loader) loader.innerText = t('error.loadingV2');
    window.iconToNameHash = {};
    const CACHE_KEY = 'guoba_gamedata_v3';
    const CACHE_TTL = 24 * 60 * 60 * 1000;
    try {
        const uidInput = document.getElementById('uidInput');
        const searchBtn = document.getElementById('searchBtn');
        if (uidInput) {
            uidInput.disabled = true;
            uidInput.placeholder = uidInput.placeholder = t('ui.search.loading');
        }
        if (searchBtn) {
            searchBtn.disabled = true;
        }
        const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
        if (cached && (Date.now() - cached.ts < CACHE_TTL)) {
            charData = cached.chars;
            locData = cached.locs;
            window.namecardsData = cached.namecards;
            window.pfpsData = cached.pfps;
            window.iconToNameHash = cached.iconToNameHash;
            window.ROLL_TABLE = cached.rollTable;
            gameDataReady = true;
            buildHashToKey();
            if (uidInput) {
                uidInput.disabled = false;
                uidInput.placeholder = t('ui.search.placeholder');
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
        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                ts: Date.now(),
                chars, locs, namecards, pfps,
                iconToNameHash: window.iconToNameHash,
                rollTable
            }));
        } catch (e) {
            console.warn('[guoba] localStorage plein, cache ignoré.', e);
        }
        /*
        localStorage.setItem(CACHE_KEY, JSON.stringify({
            ts: Date.now(),
            chars, locs, namecards, pfps,
            iconToNameHash: window.iconToNameHash,
            rollTable
        }));
        */
        if (loader) loader.innerText = "";
        gameDataReady = true;
        buildHashToKey();
        if (uidInput) {
            uidInput.disabled = false;
            uidInput.placeholder = t('ui.search.placeholder');
        }
        if (searchBtn) {
            searchBtn.disabled = false;
        }
    } catch (e) {
        if (loader) loader.innerText = t('error.filesErr');
        if (uidInput) {
            uidInput.placeholder = t('ui.search.error');
            uidInput.style.color = "#ef4444";
        }
        if (searchBtn) {
            searchBtn.disabled = false;
        }
        alert(t('error.gameData'))
    }
}

function toggleSearchIcon(isLoaded) {
    const searchBtn = document.getElementById('searchBtn');
    if (!searchBtn) return;

    if (isLoaded) {
        searchBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-always-white)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
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
    document.title = t('page.title.default');
    window.currentPlayerNickname = null;
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
    updateSidebarNavActive('home');
    showSidebarNav();

    renderHome();
}

async function fetchUserData(optionalUid) {
    const uid = (optionalUid || document.getElementById('uidInput').value).trim();
    if (!uid) return alert(t('error.noUid'));

    if (!/^\d{9,10}$/.test(uid)) {
        return alert(t('error.invalidUid'));
    }

    if (!gameDataReady) {
        return alert(t('error.dataLoading'));
    }

    window.history.pushState({}, '', `?uid=${uid}`);

    const loader = document.getElementById('loading-msg');

    if (apiSessionCache[uid] && (Date.now() - apiSessionCache[uid].timestamp < 180000)) {
        console.log("⚡ Instant load from cache!");
        const cachedData = apiSessionCache[uid].data;
        window.currentPlayerNickname = cachedData.playerInfo.nickname || t('data.unknownPlayer');
        processData(cachedData);
        renderPlayerProfile(cachedData.playerInfo, uid);
        renderGlobalEvaluation(cachedData.playerInfo);
        toggleSearchIcon(true);
        return;
    }

    showSkeletonCard();


    if (loader) loader.innerText = t('export.processing');

    // Ancien proxy
    // const urlCible = `https://enka.network/api/uid/${uid}?t=${Date.now()}`;
    // const proxy = `https://corsproxy.io/?${encodeURIComponent(urlCible)}`;

    // Nouveau proxy
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
            alert(t('error.emptyShowcase'));
            clearSearch();

            const loader = document.getElementById('loading-msg');
            if (loader) loader.innerText = "";

            return;
        }

        apiSessionCache[uid] = {
            data: data,
            timestamp: Date.now()
        };

        window.currentPlayerNickname = data.playerInfo.nickname || t('data.unknownPlayer');

        processData(data);
        renderPlayerProfile(data.playerInfo, uid);

        renderGlobalEvaluation(data.playerInfo);

        if (loader) loader.innerText = "";
        toggleSearchIcon(true);

    } catch (e) {
        clearTimeout(timeoutId);
        if (loader) loader.innerText = t('error.generic');

        if (e.name === 'AbortError') {
            alert(t('error.timeout'));
        } else if (e.message === '404') {
            alert(t('error.notFound'));
        } else if (e.message === '429') {
            alert(t('error.rateLimit'));
        } else if (e.message === 'SERVER') {
            alert(t('error.serverDown'));
        } else {
            alert(t('error.generic'));
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

    const nickname = playerInfo.nickname || t('data.unknownPlayer');
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
            return `<img src="${ICON}stygian_difficulty_6_minus_180.webp" class="pp-icon" alt="${t('ui.alt.stygian')}">`;
        }
        if (stygianIndex >= 1 && stygianIndex <= 6) {
            return `<img src="${ICON}stygian_difficulty_${stygianIndex}.webp" class="pp-icon" alt="${t('ui.alt.stygian')}">`;
        }
        return '';
    }

    const row1 = [
        `<span class="pp-badge pp-badge-server">${server}</span>`,
        achievements !== null
            ? `<span class="pp-badge pp-badge-achievements"><img src="${ICON}icon_achievements.webp" class="pp-icon" alt="${t('ui.alt.achievements')}">${achievements.toLocaleString(window.GUOBA_LANG)}</span>`
            : '',
        ar ? `<span class="pp-badge pp-badge-ar">AR${ar}</span>` : '',
    ].filter(Boolean).join('');

    const row2Items = [
        stygianSec !== null
            ? `<span class="pp-badge pp-badge-stygian">${stygianIcon()}${stygianSec}s</span>`
            : '',
        theaterStars !== null
            ? `<span class="pp-badge pp-badge-theater"><img src="${ICON}icon_theater_star.webp" class="pp-icon" alt="${t('ui.alt.theater')}">${theaterStars}</span>`
            : '',
        abyssStars !== null
            ? `<span class="pp-badge pp-badge-abyss"><img src="${ICON}icon_abyss_star.webp" class="pp-icon" alt="${t('ui.alt.abyss')}">${abyssStars}</span>`
            : '',
    ].filter(Boolean);
    const row2 = row2Items.join('');

    container.innerHTML = `
        <div class="player-profile-card">
            <div class="player-profile-bg" ${bannerUrl ? `style="background-image:url('${bannerUrl}')"` : ''}></div>
            <div class="player-profile-content">
                <img class="player-profile-avatar"
                     src="${profilePicUrl}" alt="Avatar"
                     onerror="this.src='https://enka.network/ui/UI_AvatarIcon_PlayerBoy_Circle.png'">
                <div class="player-profile-identity">
                    <div class="player-profile-name-row">
                        <span class="player-profile-name">${nickname}</span>
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
    if (!hash) return t('data.unknown');
    if (!locData) return t('data.loading');
    const lang = locData[window.GUOBA_LANG] ? window.GUOBA_LANG
        : locData["fr"] ? "fr"
            : locData["en"] ? "en"
                : Object.keys(locData)[0];
    const key = String(hash);
    const val = locData[lang] ? locData[lang][key] : null;
    if (val) {
        return val.replace(/<[^>]*>/g, "");
    }
    return t('data.unknown');
}

function getLabel(label, fallbackIndex) {
    if (label === undefined || label === null) {
        return fallbackIndex !== undefined ? `Buff ${fallbackIndex + 1}` : '';
    }
    if (typeof label === 'string') return label;
    if (typeof label === 'object') {
        return label[window.GUOBA_LANG] ?? label.fr ?? label.en ?? Object.values(label)[0] ?? '';
    }
    return String(label);
}

function buildHashToKey() {
    const dict = {};
    const frDict = locData["fr"] || {};
    for (const [hash, nom] of Object.entries(frDict)) {
        if (WEAPON_NAME_MAPPING[nom]) dict[hash] = WEAPON_NAME_MAPPING[nom];
        if (SET_NAME_MAPPING[nom])    dict[hash] = SET_NAME_MAPPING[nom];
    }
    window.HASH_TO_KEY = dict;
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

                    if (targetStat === "atk_") buffed.atk += baseStats.atk * bonusValue;
                    else if (targetStat === "hp_") buffed.hp += baseStats.hp * bonusValue;
                    else if (targetStat === "def_") buffed.def += baseStats.def * bonusValue;
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
    if (keyPart === 'atk' || keyPart === 'atk_') return keyPart;
    if (keyPart === 'hp' || keyPart === 'hp_') return keyPart;
    if (keyPart === 'def' || keyPart === 'def_') return keyPart;
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
        score: parseFloat((simulation.score / simulation.setMultiplier).toFixed(1)),
        totalRolls: parseFloat(simulation.totalRolls)
    };
}

function getCritAdvice(cr, cd, config) {
    const crWeight = (config && config.weights && config.weights['critRate_']) || 0;

    if (crWeight < 1) {
        return {color: '#888', msg: t('advice.crit.noCrit')};
    }

    const roundedCR = Math.round(cr * 10) / 10;
    const roundedCD = Math.round(cd);

    if (roundedCR > 100) return {
        color: '#ef4444',
        msg: t('advice.crit.overcap', cr.toFixed(1))
    };

    if (roundedCR === 100) return {color: '#00FFFF', msg: t('advice.crit.perfect100')};

    if (roundedCR >= 90) {
        if (roundedCD < 160) return {
            color: '#eab308',
            msg: t('advice.crit.highCDLowCR', roundedCR, roundedCD)
        };
        return {color: '#22c55e', msg: t('advice.crit.above90')};
    }

    if (roundedCR >= 80) return {
        color: '#22c55e',
        msg: t('advice.crit.above80')
    };

    if (roundedCR >= 70) {
        if (roundedCD > 200) return {
            color: '#f97316',
            msg: t('advice.crit.highCDLowCR2', roundedCD, roundedCR)
        };
        return {color: '#eab308', msg: t('advice.crit.above70')};
    }

    if (roundedCR >= 60) return {
        color: '#f97316',
        msg: t('advice.crit.above60')
    };

    return {
        color: '#ef4444',
        msg: t('advice.crit.below60')
    };
}

function getSetRecommendation(activeSets, config) {
    if (!config || !config.bestSets || config.bestSets.length === 0) return null;
    const hasBest = activeSets.some(s => config.bestSets.includes(s));
    if (hasBest) return {type: 'success', msg: t('advice.set.best')};
    const hasGood = config.goodSets && activeSets.some(s => config.goodSets.includes(s));
    const recommended = config.bestSets[0].split(':')[0];
    const hash = Object.keys(window.HASH_TO_KEY || {}).find(h => window.HASH_TO_KEY[h] === recommended);
    const recName = hash ? getText(hash) : recommended;
    if (hasGood) return {type: 'info', msg: t('advice.set.good', recName)};
    return {type: 'warning', msg: t('advice.set.bad', recName)};
}

function getMainStatAdvice(persoObj, config) {
    const slotsToCheck = ["EQUIP_SHOES", "EQUIP_RING", "EQUIP_DRESS"];
    let warnings = [];
    let slotsData = [];

    if (!config.idealMainStats) return null;

    let equippedCount = 0;

    slotsToCheck.forEach(slotType => {
        const art = persoObj.artefacts.find(a => a.type === slotType);
        const allowedMainStats = config.idealMainStats[slotType] || [];

        if (!art) {
            slotsData.push({
                type: slotType,
                isEquipped: false,
                allowedKeys: allowedMainStats
            });
            return;
        }

        equippedCount++;
        const currentKey = art.mainStat.key;
        const isOk = allowedMainStats.includes(currentKey);

        slotsData.push({
            type: slotType,
            icon: art.icon,
            currentKey: currentKey,
            isOk: isOk,
            allowedKeys: allowedMainStats,
            isEquipped: true
        });

        if (!isOk) {
            const pieceName = t('artifact.' + slotType);
            const cleanList = allowedMainStats.map(statKey => STAT_LABELS[statKey] || statKey).join(" / ");
            warnings.push({
                piece: pieceName,
                current: art.mainStat.label,
                better: cleanList
            });
        }
    });

    if (equippedCount === 0) {
        return {
            type: "info",
            title: t('advice.mainStat.title.ok'),
            msg: t('advice.mainStat.empty'),
            slotsData: [],
            isEmpty: true
        };
    }

    if (warnings.length > 0) {
        return {
            type: "critical",
            title: t('advice.mainStat.title.problem'),
            details: warnings,
            slotsData: slotsData
        };
    }

    return {
        type: "success",
        title: t('advice.mainStat.title.ok'),
        msg: t('advice.mainStat.ok'),
        slotsData: slotsData
    };
}

function getFarmDifficulty(pieceType, mainStatKey) {
    if (pieceType === "EQUIP_BRACER" || pieceType === "EQUIP_NECKLACE") {
        return {label: t('farm.easy'), color: "#3b82f6"};
    }

    const rates = MAINSTAT_DROP_RATES[pieceType];
    if (!rates || !rates[mainStatKey]) return {label: t('farm.hard'), color: "#eab308"};

    const probability = rates[mainStatKey];

    if (probability >= 19) return {label: t('farm.medium'), color: "#22c55e"};
    if (probability >= 10) return {label: t('farm.hard'), color: "#eab308"};
    if (probability >= 5) return {label: t('farm.veryHard'), color: "#f97316"};
    return {label: t('farm.extreme'), color: "#ef4444"};
}

function getOffPieceAdvice(persoObj) {
    const equippedCount = persoObj.artefacts ? persoObj.artefacts.length : 0;

    if (equippedCount === 0) {
        return {
            type: "empty",
            msg: t('advice.offPiece.empty')
        };
    }

    if (equippedCount > 0 && equippedCount < 5) {
        return {
            type: "incomplete",
            msg: t('advice.offPiece.incomplete')
        };
    }

    const fullSetKey = Object.keys(persoObj.setsCounter).find(key => persoObj.setsCounter[key] === 5);

    if (fullSetKey) {
        const setPieces = persoObj.artefacts.filter(art => art.setKey === fullSetKey);
        setPieces.sort((a, b) => (a.score || 0) - (b.score || 0));
        const worstPiece = setPieces[0];

        const otherPieces = setPieces.slice(1);
        const avgSetScore = otherPieces.reduce((a, b) => a + b.score, 0) / otherPieces.length;

        const rawName = ARTIFACT_TYPE_MAPPING[worstPiece.type] || t('data.unknown');
        const hash = Object.keys(window.HASH_TO_KEY || {}).find(h => window.HASH_TO_KEY[h] === fullSetKey);
        const setNameTranslated = hash ? getText(hash) : fullSetKey;

        return {
            type: "info",
            msg: t('advice.offPiece.5of5', setNameTranslated, rawName, worstPiece.score),
            data: { offPiece: worstPiece, avgScore: avgSetScore, is5of5: true }
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

    if (setPiecesScores.length === 0) {
        return {
            type: "rainbow",
            msg: t('advice.offPiece.rainbow')
        };
    }
    if (!offPiece) return null;

    const rawName = ARTIFACT_TYPE_MAPPING[offPiece.type] || t('data.unknown');
    const avgSetScore = setPiecesScores.reduce((a, b) => a + b, 0) / setPiecesScores.length;
    const isHardMainStat = offPiece.mainStat.key.includes("dmg_") || offPiece.mainStat.key.includes("crit");

    let type = "error";
    let msg = t('advice.offPiece.bad', t('artifact.' + offPiece.type));

    if (offPiece.score > avgSetScore) {
        type = "success";
        msg = t('advice.offPiece.good', t('artifact.' + offPiece.type));
    } else if (isHardMainStat && offPiece.score > (avgSetScore * 0.8)) {
        type = "warning";
        msg = t('advice.offPiece.ok', t('artifact.' + offPiece.type));
    }

    return {
        type: type,
        msg: msg,
        data: { offPiece: offPiece, avgScore: avgSetScore, is5of5: false }
    };
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

    let criticals = [];
    let infos = [];

    const check = (type, label) => {
        const lvl = current[type];
        const goal = target[type];
        if (goal <= 1) return;

        const diff = goal - lvl;
        if (diff >= 2) {
            criticals.push(t('advice.talent.item', label, goal));
        } else if (diff >= 1) {
            infos.push(t('advice.talent.item', label, goal));
        }
    };

    check('auto', t('advice.talent.auto'));
    check('skill', t('advice.talent.skill'));
    check('burst', t('advice.talent.burst'));

    if (criticals.length === 0 && infos.length === 0) {
        return [{type: "success", msg: t('advice.talent.ok')}];
    }

    let advices = [];

    const formatList = (list) => {
        if (list.length === 1) return list[0];
        if (list.length === 2) return list[0] + t('ui.and') + list[1];
        return list.slice(0, -1).join(', ') + t('ui.and') + list[list.length - 1];
    };

    if (criticals.length > 0) {
        advices.push({
            type: "critical",
            msg: t('advice.talent.critical', formatList(criticals))
        });
    }

    if (infos.length > 0) {
        advices.push({
            type: "info",
            msg: t('advice.talent.info', formatList(infos))
        });
    }

    return advices;
}

function getSetForcingAdvice(persoObj, config) {
    const equippedCount = persoObj.artefacts ? persoObj.artefacts.length : 0;

    if (equippedCount === 0) {
        return {
            type: "info",
            title: t('advice.setForce.title.ok'),
            msg: t('advice.setForce.empty'),
            status: 'empty',
            activeSets: []
        };
    }

    if (equippedCount > 0 && equippedCount < 5) {
        return {
            type: "warning",
            title: t('advice.setForce.title.ok'),
            msg: t('advice.setForce.incomplete'),
            status: 'incomplete',
            activeSets: []
        };
    }

    let active4pSet = null;

    const charLikes2p2p = config.bestSets && config.bestSets.some(setStr => setStr.includes(":2"));

    const activeSets = Object.keys(persoObj.setsCounter).filter(k => persoObj.setsCounter[k] >= 2);
    const activeSetsData = activeSets.map(setKey => {
        const hash = Object.keys(window.HASH_TO_KEY || {}).find(h => window.HASH_TO_KEY[h] === setKey);
        return { key: setKey, hash: hash, count: persoObj.setsCounter[setKey] };
    });

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
                title: t('advice.setForce.title.ok'),
                msg: t('advice.setForce.ok2p2p'),
                status: '2p2p',
                activeSets: activeSetsData
            };
        }
        return {
            type: "success",
            title: t('advice.setForce.title.ok'),
            msg: t('advice.setForce.okRainbow'),
            status: 'rainbow',
            activeSets: activeSetsData
        };
    }

    const setPieces = persoObj.artefacts.filter(a => a.setKey === active4pSet);
    const totalScore = setPieces.reduce((sum, art) => sum + art.score, 0);
    const avgScore = totalScore / setPieces.length;
    const setHash = Object.keys(window.HASH_TO_KEY || {}).find(h => window.HASH_TO_KEY[h] === active4pSet);

    if (avgScore < 25) {
        let warningMsg = t('advice.setForce.weak');
        if (charLikes2p2p) {
            warningMsg += ' ' + t('advice.setForce.weakHint2p');
        }

        return {
            type: "error",
            title: t('advice.setForce.title.warning'),
            msg: warningMsg,
            status: 'forcing',
            targetSet: { key: active4pSet, hash: setHash, avgScore: avgScore }
        };
    } else {
        const isRecommended = (
            (config.bestSets && config.bestSets.some(s => s.split(':')[0] === active4pSet)) ||
            (config.goodSets && config.goodSets.some(s => s.split(':')[0] === active4pSet))
        );

        if (!isRecommended) {
            return {
                type: "info",
                title: t('advice.setForce.title.ok'),
                msg: t('advice.setForce.okQualityOffMeta'),
                status: 'offMeta4p',
                targetSet: { key: active4pSet, hash: setHash, avgScore: avgScore }
            };
        }

        return {
            type: "success",
            title: t('advice.setForce.title.ok'),
            msg: t('advice.setForce.okQuality'),
            status: 'good4p',
            targetSet: { key: active4pSet, hash: setHash, avgScore: avgScore }
        };
    }
}

function getMetaSetAdvice(persoObj, config) {
    if (!config.bestSets || config.bestSets.length === 0) return null;

    const is2p2p = config.bestSets.every(setStr => setStr.endsWith(":2")) && config.bestSets.length >= 2;

    let equippedBest = false;
    let targetSetsData = [];
    let recommendationStr = "";

    if (is2p2p) {
        equippedBest = config.bestSets.every(setStr => {
            const [key, count] = setStr.split(":");
            return (persoObj.setsCounter[key] || 0) >= parseInt(count);
        });

        targetSetsData = config.bestSets.map(setStr => {
            const [key, count] = setStr.split(":");
            const hash = Object.keys(window.HASH_TO_KEY || {}).find(h => window.HASH_TO_KEY[h] === key);
            return {
                key: key,
                name: hash ? getText(hash) : key,
                required: parseInt(count),
                current: persoObj.setsCounter[key] || 0,
                hash: hash
            };
        });

        recommendationStr = targetSetsData.map(t => `<b>${t.name} (2p)</b>`).join(" et ");
    } else {
        const bestMatch = config.bestSets.find(setStr => {
            const [key, count] = setStr.split(":");
            return (persoObj.setsCounter[key] || 0) >= parseInt(count);
        });

        equippedBest = !!bestMatch;
        const displaySetStr = bestMatch || config.bestSets[0];
        const [displayKey, displayCountStr] = displaySetStr.split(":");
        const hash = Object.keys(window.HASH_TO_KEY || {}).find(h => window.HASH_TO_KEY[h] === displayKey);

        targetSetsData = [{
            key: displayKey,
            name: hash ? getText(hash) : displayKey,
            required: parseInt(displayCountStr) || 4,
            current: persoObj.setsCounter[displayKey] || 0,
            hash: hash
        }];

        recommendationStr = `<b>${targetSetsData[0].name} (${t('ui.setPieces', targetSetsData[0].required)})</b>`;
    }

    if (equippedBest) {
        return {
            type: "success",
            title: t('advice.metaSet.title.ok'),
            msg: t('advice.metaSet.ok'),
            targetSets: targetSetsData,
            is2p2p: is2p2p
        };
    }

    let equippedGood = false;
    if (config.goodSets) {
        equippedGood = !!config.goodSets.find(setStr => {
            const [key, count] = setStr.split(":");
            return (persoObj.setsCounter[key] || 0) >= parseInt(count);
        });
    }

    if (equippedGood) {
        return {
            type: "info",
            title: t('advice.metaSet.title.optimize'),
            msg: t('advice.metaSet.good', recommendationStr),
            targetSets: targetSetsData,
            is2p2p: is2p2p
        };
    }

    return {
        type: "warning",
        title: t('advice.metaSet.title.problem'),
        msg: t('advice.metaSet.bad', recommendationStr),
        targetSets: targetSetsData,
        is2p2p: is2p2p
    };
}

function getWeaponAdvice(persoObj) {
    if (!persoObj.weapon) return null;

    if (persoObj.weapon.level < 90) {
        return {
            type: "warning",
            title: t('advice.weapon.title'),
            msg: t('advice.weapon.low')
        };
    } else {
        return {
            type: "success",
            title: t('advice.weapon.title'),
            msg: t('advice.weapon.ok')
        };
    }
}

function getERAdvice(currentER, targetER) {
    const diff = currentER - targetER;

    if (diff >= -10 && diff <= 15) {
        return {
            type: "success",
            title: t('advice.er.title.ok'),
            msg: t('advice.er.ok', currentER.toFixed(0), targetER)
        };
    }

    if (diff < -10) {
        return {
            type: "warning",
            title: t('advice.er.title.low'),
            msg: t('advice.er.low', currentER.toFixed(0), targetER)
        };
    }

    if (diff > 15) {
        return {
            type: "info",
            title: t('advice.er.title.excess'),
            msg: t('advice.er.excess', currentER.toFixed(0), targetER)
        };
    }
}

function getLevelAdvice(persoObj) {
    if (persoObj.level >= 100) {
        return {
            type: "success",
            title: t('advice.level.title'),
            msg: t('advice.level.legendary'),
            maxLevel: 100,
            barColor: '#22c55e'
        };
    }
    if (persoObj.level >= 95) {
        return {
            type: "success",
            title: t('advice.level.title'),
            msg: t('advice.level.ascended'),
            maxLevel: 95,
            barColor: '#22c55e'
        };
    }
    if (persoObj.level >= 90) {
        return {
            type: "success",
            title: t('advice.level.title'),
            msg: t('advice.level.ok'),
            maxLevel: 90,
            barColor: '#22c55e'
        };
    }
    return {
        type: "info",
        title: t('advice.level.title'),
        msg: t('advice.level.low'),
        maxLevel: 90,
        barColor: '#ef4444'
    };
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
                    gain: `+${minVal} <span style="color:var(--text-primary); opacity:0.8; padding:0 2px;">${t('sim.range')}</span> ${maxVal}${suffix} ${targetLabel}`
                });
            }
        });

        if (replacements.length > 0) {
            const pieceName = t('artifact.' + art.type);
            const deadText = replacements.map(r => `<span style="color:#ff6b6b">${r.dead}</span>`).join(t('ui.and'));
            const targetText = replacements.map(r => `<span style="color:var(--accent-gold)">${r.target}</span>`).join(t('ui.and'));
            const gainText = replacements.map(r => `
                <div style="display: flex; flex-direction: row; align-items: center; color: var(--accent-gold); ">
                    <p style=" color: var(--text-primary); margin-right: 6px;">•</p>
                    <p>${r.gain}</p>
                </div>
            `).join('');

            suggestions.push({
                pieceName: pieceName,
                text: t('sim.replace', deadText, targetText),
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
                text: t('reroll.na.stars', artifact.stars ?? '?'),
                color: "#6b7280"
            }
        };
    }


    if ((artifact.stars || 5) === 4) {
        return {
            potential: 0,
            risk: 0,
            badge: {
                text: t('reroll.na.stars', 4),
                color: "#6b7280"
            }
        };
    }

    if ((artifact.level || 0) < 20) {
        return {
            potential: 0,
            risk: 0,
            badge: {
                text: t('reroll.na.level', artifact.level ?? 0),
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

    let badge = { text: t('reroll.neutral'), color: "var(--text-muted)" };

    if (sortedTerrain[0] === 0 && sortedTerrain[1] === 0) {
        badge = {text: t("reroll.trash"), color: "#4b5563"};
    } else if (risk > 75) {
        badge = {text: t("reroll.tooRisky"), color: "#ef4444"};
    } else if (potential > 40 && risk < 35) {
        badge = {text: t("reroll.recommended"), color: "#22c55e"};
    } else if (potential > 15) {
        badge = {text: t("reroll.optimizable"), color: "#3b82f6"};
    } else {
        badge = {text: t("reroll.notWorth"), color: "#f97316"};
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

const CONFIG_NAME_ALIASES_EN_TO_FR = {
    "Freminet": "Fréminet",
    "Wanderer": "Nomade",
    "Noelle": "Noëlle",
    "Rosaria": "Rosalia",
    "Raiden Shogun": "Shogun Raiden",
    "Thoma": "Thomas",
    "Emilie": "Émilie",
};

function resolveCharConfig(nom) {
    const charConfig = window.CHARACTER_CONFIG || {};
    const defaultConfig = window.DEFAULT_CONFIG || {weights: {}, bestSets: [], goodSets: []};
    const safeNom = nom || "";
    const configKey = safeNom.replace(/\s+/g, '') || "Default";
    return charConfig[configKey]
        || charConfig[safeNom]
        || charConfig[CONFIG_NAME_ALIASES_EN_TO_FR[safeNom]]
        || defaultConfig;
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

        if (!nom || nom === t('data.unknown')) {
            if (iconNameRaw) {
                const clean = iconNameRaw.replace(/\.png$/i, "");
                nom = clean.split('_').pop();
                if (nom.includes("Player")) nom = t('data.traveler');
            } else {
                nom = t('data.unknown');
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
                //const weaponNameFR = getText(flat.nameTextMapHash);
                //const weaponKey = WEAPON_NAME_MAPPING[weaponNameFR] || weaponNameFR;
                const weaponKey = (window.HASH_TO_KEY && window.HASH_TO_KEY[flat.nameTextMapHash]) || flat.nameTextMapHash;

                weapon = {
                    //name: weaponNameFR,
                    name: getText(flat.nameTextMapHash),
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

                //const nomSetFR = getText(targetHash);
                //const setKey = SET_NAME_MAPPING[nomSetFR] || "UnknownSet";
                const setKey = (window.HASH_TO_KEY && window.HASH_TO_KEY[targetHash]) || "UnknownSet";
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
                    //setName: nomSetFR,
                    setName: getText(targetHash),
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
                    let name = getLabel(item.label, idx);
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

        const rawConfig = resolveCharConfig(nom);

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
            addBuffs(weapon.key, `${weapon.name} ${t('ui.buff.weapon')}`, wData, wMode, weapon.rank);
        }

        if (G_SET_PASSIVES) {
            for (const [setKey, count] of Object.entries(setsCounter)) {
                if (G_SET_PASSIVES[setKey]) {
                    const setBonuses = G_SET_PASSIVES[setKey];
                    const setName = artefacts.find(a => a.setKey === setKey)?.setName || setKey;
                    const setCategory = `${setName} ${t('ui.buff.set')}`;
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
                        addBuffs(nom, getLabel(group.category), filteredBuffs, group.selectMode);
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
    hideSidebarNav();
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
        container.innerHTML = `<span class="main-content-menu-team" style="padding-top: 17px; padding-bottom: 14px; display:inline-block; box-sizing:border-box;">${t('ui.noArchetype')}</span>`;
        return;
    }

    const currentBuildKey = p.activeBuild ? p.activeBuild.key : Object.keys(p.charConfig.builds)[0];
    const builds = p.charConfig.builds;

    let activeBuildTextHtml = '';

    let buildOptionsHtml = Object.entries(builds).map(([key, build]) => {
        const tempConfig = {...p.charConfig, ...build};

        const clonedArtefacts = p.artefacts.map(a => ({...a}));
        const simulation = calculateCharacterScore({artefacts: clonedArtefacts}, tempConfig);
        const potential = calculateMaxTheoreticalScore({artefacts: p.artefacts}, tempConfig);

        let efficiency = 0;
        if (potential && potential.score > 0) {
            efficiency = (simulation.score / potential.score) * 100;
        }

        const effText = efficiency > 0 ? ` - ${efficiency.toFixed(1)}%` : '';
        const label = `${getLabel(build.name)}${effText}`;

        if (key === currentBuildKey) {
            activeBuildTextHtml = label;
        }

        const isActiveClass = key === currentBuildKey ? 'active-item' : '';
        return `<div class="data-select-item ${isActiveClass}" onclick="selectCustomBuild(${index}, '${key}')">${label}</div>`;
    }).join('');

    let teamHtml = '';
    if (p.activeBuild && p.activeBuild.team) {

        const charElement = p.combatStats.dmgBonusKey.replace('_dmg_', '');
        const charBg = ELEMENT_COLORS[charElement] || '#333';

        const charIcon = `<img src="${p.image.replace('Side_', '')}" style="width:40px; height:40px; border-radius:5px; border:1px solid rgba(255,255,255,0.5); box-shadow:0 0 5px rgba(0,0,0,0.5); object-fit:cover; background:${charBg};" title="${p.nom}">`;

        const matesHtml = p.activeBuild.team.map(mate => {
            const ARCHETYPE_ROLES = new Set(["Hexerei", "Lunar", "Stellar"]);

            const getIconUrl = (name, elem, role) => {
                if (name) return `https://enka.network/ui/UI_AvatarIcon_${name}.png`;
                if (elem) return `${ICON_BASE_PATH}icon_${elem}.webp`;
                if (ARCHETYPE_ROLES.has(role)) return `${ICON_BASE_PATH}icon_role_${role.toLowerCase()}.svg`;
                return `${ICON_BASE_PATH}icon_empty_slot.svg`;
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
                const url = getIconUrl(names[0], elems[0], mate.role);
                const fallback = elems[0]
                    ? `${ICON_BASE_PATH}icon_${elems[0]}.webp`
                    : `${ICON_BASE_PATH}icon_unknown.webp`;

                const isArchetype = (ARCHETYPE_ROLES.has(mate.role) && !names[0]) || (!names[0] && !elems[0]);
                const imgStyle = isArchetype
                    ? "width:100%; height:100%; object-fit:contain; padding:6px; box-sizing:border-box; opacity:0.8;"
                    : "width:100%; height:100%; object-fit:cover;";

                innerHtml = `
                    <img src="${url}" 
                         style="${imgStyle}"
                         onerror="this.src='${fallback}'" 
                         title="${mate.role}: ${names[0] || elems[0] || t('data.unknown')}">
                `;
            } else {
                const url1 = getIconUrl(names[0], elems[0], mate.role);
                const fb1 = elems[0] ? `${ICON_BASE_PATH}icon_${elems[0]}.png` : `${ICON_BASE_PATH}icon_unknown.webp`;

                const url2 = getIconUrl(names[1] || names[0], elems[1] || elems[0], mate.role);
                const fb2 = (elems[1] || elems[0]) ? `${ICON_BASE_PATH}icon_${elems[1] || elems[0]}.webp` : `${ICON_BASE_PATH}icon_unknown.webp`;

                innerHtml = `
                    <div style="position:absolute; inset:0; clip-path: polygon(0 0, 100% 0, 0 100%); z-index:2;">
                        <img src="${url1}" onerror="this.src='${fb1}'" style="width:100%; height:100%; object-fit:cover;">
                    </div>
                    <div style="position:absolute; inset:0; clip-path: polygon(100% 0, 100% 100%, 0 100%); z-index:1;">
                        <img src="${url2}" onerror="this.src='${fb2}'" style="width:100%; height:100%; object-fit:cover;">
                    </div>
                    <div style="position:absolute; inset:0; background:linear-gradient(to bottom right, transparent 49.5%, var(--text-primary) 49.5%, var(--text-primary) 50.5%, transparent 50.5%); z-index:3; pointer-events:none;"></div>
                `;
            }

            return `
                <div style="position:relative; width:40px; height:40px; border-radius:5px; ${bgStyle} overflow:hidden;" title="${mate.role}">
                    ${innerHtml}
                </div>
            `;
        }).join('');
        teamHtml = `<div style="display:flex; color: var(--text-primary); border: none; border-radius: 8px; padding: 5px; flex-direction: row; align-items:center; gap: 5px; background: var(--bg-panel); ">${charIcon}${matesHtml}</div>`;
    }

    const currentERReq = p.activeBuild.er_req || 100;
    let activeERTextHtml = `${currentERReq}% ER`;
    let erOptionsHtml = '';
    for (let i = 100; i <= 300; i += 10) {
        const label = `${i}% ER`;
        const isActiveClass = i === currentERReq ? 'active-item' : '';
        erOptionsHtml += `<div class="data-select-item ${isActiveClass}" onclick="selectCustomER(${index}, ${i})">${label}</div>`;
    }

    container.innerHTML = `
        <div class="data-select-container main-content-menu-team" style="padding:0; border:none; background:transparent;">
            <button class="custom-dropdown-btn" onclick="toggleBuildMenu(event)" style="width: 100%; display: flex; justify-content: space-between; align-items: center; border: none; background: var(--bg-panel); color: var(--text-primary); padding: 8px 12px; border-radius: 8px; cursor: pointer; font-family: inherit; font-size: 14px; font-weight: 500; height: 100%; box-sizing: border-box;">
                <span id="active-build-text" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-align: left;">${activeBuildTextHtml}</span>
                <img src="assets/simulator/icons/icon_arrow_down_white.svg" alt="" class="sort-arrow" id="arrow-original" style="font-size: 12px; opacity: 0.6; margin-left: 8px; flex-shrink: 0;">
            </button>
            <div id="build-custom-menu" class="data-select-menu">
                ${buildOptionsHtml}
            </div>
        </div>

        ${teamHtml}

        <div class="data-select-container main-content-menu-er" style="padding:0; border:none; background:transparent;">
            <button class="custom-dropdown-btn" onclick="toggleErMenu(event)" style="width: 100%; display: flex; justify-content: space-between; align-items: center; border: none; background: var(--bg-panel); color: var(--text-primary); padding: 8px 12px; border-radius: 8px; cursor: pointer; font-family: inherit; font-size: 14px; font-weight: 500; height: 100%; box-sizing: border-box; min-width: 106px;">
                <span id="active-er-text" style="white-space: nowrap;">${activeERTextHtml}</span>
                <img src="assets/simulator/icons/icon_arrow_down_white.svg" alt="" class="sort-arrow" id="arrow-original" style="font-size: 12px; opacity: 0.6; margin-left: 8px; flex-shrink: 0;">
            </button>
            <div id="er-custom-menu" class="data-select-menu" style="min-width: 110px;">
                ${erOptionsHtml}
            </div>
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

    p.buffs = p.buffs.filter(b => b.category !== t('buff.category.resonance'));

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
                category: t('buff.category.resonance'),
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

const STATIC_PAGES = ['about', 'team', 'privacy'];

function navigateToPage(page) {
    if (page === 'home') { clearSearch(); return; }
    if (!STATIC_PAGES.includes(page)) { clearSearch(); return; }
    window.history.pushState({ page }, '', `?page=${page}`);
    renderStaticPage(page);
}

function renderStaticPage(page) {
    const menu = document.querySelector('.main-content-menu');
    if (menu) menu.style.display = 'none';

    const playerProfile = document.getElementById('player-profile');
    if (playerProfile) playerProfile.innerHTML = '';

    const evalContainer = document.getElementById('global-evaluation');
    if (evalContainer) evalContainer.style.display = 'none';

    const topHeader = document.getElementById('top-header-area');
    if (topHeader) topHeader.style.display = 'none';

    const container = document.getElementById('main-container');
    if (!container) return;

    const content = window.PAGE_CONTENTS && window.PAGE_CONTENTS[page];

    container.innerHTML = content ? content() : `<div style="padding:40px;color:var(--text-grey);">${t('error.pageNotFound')}</div>`;
    const pageTitle = t('nav.' + page);
    document.title = `${pageTitle || page} — guoba.gg`;

    updateSidebarNavActive(page);
    showSidebarNav();
}

function showSidebarNav() {
    const nav = document.getElementById('sidebar-static-nav');
    if (nav) nav.style.display = 'flex';
    const charSidebar = document.querySelector('.sidebar-characters');
    if (charSidebar) charSidebar.style.display = 'none';
}

function hideSidebarNav() {
    const nav = document.getElementById('sidebar-static-nav');
    if (nav) nav.style.display = 'none';
    const charSidebar = document.querySelector('.sidebar-characters');
    if (charSidebar) charSidebar.style.display = 'flex';
}

function updateSidebarNavActive(activePage) {
    document.querySelectorAll('.snav-item').forEach(item => {
        item.classList.toggle('snav-item--active', item.dataset.page === activePage);
    });
}

function renderHome() {
    showSidebarNav();
    updateSidebarNavActive('home');

    const container = document.getElementById('main-container');
    const profiles = getRecentProfiles();

    const menu = document.querySelector('.main-content-menu') || document.getElementById('main-content-menu');
    if (menu) menu.style.display = 'none';

    if (!container) return;

    if (profiles.length === 0) {
        container.innerHTML = `
            <div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; opacity: 0.5;">
                <img src="${ICON_BASE_PATH}icon_score.webp" style="width: 64px; height: 64px; margin-bottom: 20px; filter: grayscale(100%);">
                <h2 style="color: var(--text-primary); font-size: 24px; margin-bottom: 8px;">${t('home.empty')}</h2>
                <p style="color: var(--text-grey); font-size: 14px;">${t('home.emptyHint')}</p>
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
                return `<img src="${ICON}stygian_difficulty_6_minus_180.webp" class="pp-icon" alt="${t('ui.alt.stygian')}">`;
            }
            if (p.stygianIndex >= 1 && p.stygianIndex <= 6) {
                return `<img src="${ICON}stygian_difficulty_${p.stygianIndex}.webp" class="pp-icon" alt="${t('ui.alt.stygian')}">`;
            }
            return '';
        }

        const row1 = [
            `<span class="pp-badge pp-badge-server">${server}</span>`,
            p.achievements != null
                ? `<span class="pp-badge pp-badge-achievements"><img src="${ICON}icon_achievements.webp" class="pp-icon" alt="${t('ui.alt.achievements')}">${p.achievements.toLocaleString(window.GUOBA_LANG)}</span>`
                : '',
            p.ar ? `<span class="pp-badge pp-badge-ar">AR${p.ar}</span>` : '',
        ].filter(Boolean).join('');

        const row2Items = [
            p.stygianSec != null
                ? `<span class="pp-badge pp-badge-stygian">${stygianIcon()}${p.stygianSec}s</span>`
                : '',
            p.theaterStars != null
                ? `<span class="pp-badge pp-badge-theater"><img src="${ICON}icon_theater_star.webp" class="pp-icon" alt="${t('ui.alt.theater')}">${p.theaterStars}</span>`
                : '',
            p.abyssStars != null
                ? `<span class="pp-badge pp-badge-abyss"><img src="${ICON}icon_abyss_star.webp" class="pp-icon" alt="${t('ui.alt.abyss')}">${p.abyssStars}</span>`
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
                 title="${isFav ? t('home.unpinAccount') : t('home.pinAccount')}"
                 style="position: absolute; top: -6px; left: -6px; width: 22px; height: 22px; display: ${isFav || !favUid ? 'flex' : 'none'}; align-items: center; justify-content: center; border-radius: 50%; background: ${isFav ? 'rgba(255,177,59,0.95)' : 'rgba(60,62,70,0.92)'}; color: ${isFav ? 'var(--text-primary)' : 'var(--text-muted)'}; font-size: 11px; z-index: 50; box-shadow: 0 2px 4px rgba(0,0,0,0.5); transition: 0.2s; cursor: pointer;"
                 onmouseover="this.style.background='${isFav ? 'rgba(220,140,0,1)' : 'rgba(90,92,100,1)'}'; this.style.transform='scale(1.15)';"
                 onmouseout="this.style.background='${isFav ? 'rgba(255,177,59,0.95)' : 'rgba(60,62,70,0.92)'}'; this.style.transform='scale(1)';">
                 ${isFav ? '★' : '☆'}
            </div>

            <!-- Bouton Supprimer -->
            <div onclick="deleteRecentProfile('${p.uid}', event)" 
                 style="position: absolute; top: -6px; right: -6px; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: rgba(239, 68, 68, 0.9); color: var(--text-primary); font-size: 12px; z-index: 50; box-shadow: 0 2px 4px rgba(0,0,0,0.5); transition: 0.2s;"
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
    const savedTheme = localStorage.getItem('guoba_theme') || 'wish';
    container.innerHTML = `
        <div style="padding-left: 20px; padding-top: 40px;">
            <h2 style="color: var(--text-primary); font-size: 28px; margin-bottom: 10px;">${t('home.title')}</h2>
            <p style="max-width:980px; color: var(--text-grey); font-size: 14px; margin-bottom: 30px;">${t('home.subtitle')}</p>
            <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-left: 20px;">
                ${cardsHtml}
            </div>
            <p style="color: var(--text-grey); font-size: 12px; margin-bottom: 30px; margin-top: 32px; margin-left: 12px;">
                ${t('home.legal')} <br><br>
                ${t('home.enkaCredit')} <br>
                ${t('home.designCredit')}
            </p>    
            <div class="links" style="max-width:980px;display: flex; flex-direction: row; margin-bottom: 48px; gap: 8px; align-items: center;">
                <a class="link-button" href="https://discord.gg/CZ5qxVqBVJ" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-discord"></i>Discord</a>
                <a class="link-button-coffee" href="https://ko-fi.com/guobagg" target="_blank" rel="noopener noreferrer">
                  <img src="https://cdn.prod.website-files.com/5c14e387dab576fe667689cf/670f5a01229bf8a18f97a3c1_favion.png" alt="Icône Discord" width="20" height="20">Buy me a coffee
                </a>    
                <div style="margin-left: auto; display: flex; gap: 8px;">
                    
                    <div class="custom-select-container">
                        <button onclick="toggleThemeMenu(event)" class="link-button" style="width: 100%; justify-content: space-between; border:none; background: var(--bg-panel); color: var(--text-primary); padding: 0 16px 0 12px; border-radius: 8px; cursor: pointer; font-family: inherit; font-size: 14px; font-weight: 500; outline: none; height: 38px; display: flex; align-items: center;">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <span class="theme-dot" id="active-theme-dot" style="background: ${THEME_COLORS[savedTheme] || THEME_COLORS['wish']};"></span>
                                <span id="active-theme-text">${t('theme.' + savedTheme)}</span>
                            </div>
                            <img src="assets/simulator/icons/icon_arrow_down_white.svg" alt="" class="sort-arrow" id="arrow-original" style="font-size: 12px; opacity: 0.6; margin-left: 8px;">
                        </button>

                        <div id="theme-custom-menu" class="custom-select-menu">
                            <div class="custom-select-item" onclick="selectCustomTheme('dark', '${t('theme.dark')}')">
                                <span class="theme-dot" style="background: #323338;"></span> ${t('theme.dark')}
                            </div>
                            <div class="custom-select-item" onclick="selectCustomTheme('abyssal', '${t('theme.abyssal')}')">
                                <span class="theme-dot" style="background: #000000;"></span> ${t('theme.abyssal')}
                            </div>
                            <div class="custom-select-item" onclick="selectCustomTheme('sea', '${t('theme.sea')}')">
                                <span class="theme-dot" style="background: #15223B;"></span> ${t('theme.sea')}
                            </div>
                            <div class="custom-select-item" onclick="selectCustomTheme('wish', '${t('theme.wish')}')">
                                <span class="theme-dot" style="background: #181926;"></span> ${t('theme.wish')}
                            </div>
                            <div class="custom-select-item" onclick="selectCustomTheme('guild', '${t('theme.guild')}')">
                                <span class="theme-dot" style="background: #2F2620;"></span> ${t('theme.guild')}
                            </div>
                        </div>
                    </div>

                    <div class="custom-select-container">
                        <button onclick="toggleLangMenu(event)" class="link-button" style="justify-content: space-between; border:none; background: var(--bg-panel); color: var(--text-primary); padding: 0 12px; border-radius: 8px; cursor: pointer; font-family: inherit; font-size: 14px; font-weight: 500; outline: none; height: 38px; display: flex; align-items: center;">
                            <span>${window.GUOBA_LANG.toUpperCase()}</span>
                            <img src="assets/simulator/icons/icon_arrow_down_white.svg" alt="" class="sort-arrow" id="arrow-original" style="font-size: 12px; opacity: 0.6; margin-left: 8px;">
                        </button>

                        <div id="lang-custom-menu" class="custom-select-menu" style="min-width: 69px;">
                            <div class="custom-select-item" onclick="guobaSetLang('fr')">
                                FR
                            </div>
                            <div class="custom-select-item" onclick="guobaSetLang('en')">
                                EN
                            </div>
                        </div>
                    </div>

                </div>
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

    let holyGrail = false, level89Syndrome = false, level67EasterEgg = false;
    let highER = false, asthmatic = false, casino = false, alchemist = false, allInCrit = false;
    let bruteForce = false, surgicalPrec = false, hospital = false, brickWall = false;
    let rainbowFan = 0, emblemFan = 0, pacifist = false, hpSack = false, impostor = false;
    let tripleCrown = false, leviathan = false, qiqiCurse = false, diogenes = false, nudist = false, level100Reached = false;
    let fourStarCount = 0, maxFriendshipCount = 0;
    let archonCount = 0, favoniusCount = 0, aloyFound = false, internFound = false;
    let elementCount = {};
    let akashamaxxing = false;
    let fatuiCount = 0;
    let healerCount = 0;
    let eluDeCelestia = false;
    let anomalieOffensive = false;
    const fatuiNames = ["Tartaglia", "Nomade", "Wanderer", "Arlecchino", "Sandrone"];
    const healerNames = [
        "Barbara", "Qiqi", "Sangonomiya Kokomi", "Baizhu",
        "Sigewinne", "Yaoyao", "Charlotte", "Diona", "Jean", "Mika", "Chevreuse", "Xianyun"
    ];
    const currentUidStr = document.getElementById('uidInput') ? document.getElementById('uidInput').value.trim() : '';
    const archonNames = ["Venti", "Zhongli", "Raiden", "Nahida", "Furina", "Mavuika"];
    let starterPackNames = ["Amber", "Kaeya", "Lisa"];
    let starterCount = 0;
    let hasNilou = false;
    let hasFurinaWithPipe = false;
    const creatorUIDs = ["704449686"];
    const contributorUIDs = ["741928446"];
    const bestieUIDs = ["741928446", "735710141", "704195929", "704155185", "719819547", "721506778", "702515706"];
    let hasRaidenCatch = false;
    let hasZhongliTassel = false;
    const hearthNames = ["Arlecchino", "Lyney", "Lynette", "Fréminet", "Freminet"];
    const kamisatoNames = ["Kamisato Ayato", "Kamisato Ayaka", "Thoma", "Thomas"];
    const aratakiNames = ["Arataki Itto", "Kuki Shinobu"];
    const adeptiNames = ["Xiao", "Ganyu", "Shenhe", "Xianyun", "Yanfei", "Zhongli", "Zibai"];
    const sumeruNames = ["Alhaitham", "Kaveh", "Tighnari", "Cyno"];
    const mermoniaNames = ["Neuvillette", "Furina", "Clorinde"];
    let mermoniaCount = 0;
    let hearthCount = 0;
    let kamisatoCount = 0;
    let aratakiCount = 0;
    let adeptiCount = 0;
    let sumeruCount = 0;

    globalPersoData.forEach(p => {

        if (p.level === 89) level89Syndrome = true;
        if (p.level === 67) level67EasterEgg = true;
        if (p.level === 100) level100Reached = true;

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

        if (fatuiNames.includes(p.nom)) fatuiCount++;
        if (healerNames.includes(p.nom)) healerCount++;

        const charConfig = {...p.charConfig, ...(p.activeBuild || {})};
        const rollStats = calculateRollDistribution(p, charConfig);
        if (rollStats.total > 0 && rollStats.deadCount === 0) {
            eluDeCelestia = true;
        }

        if (p.combatStats && p.artefacts) {
            const em = p.combatStats.em || p.combatStats.eleMas || 0;
            const er = Math.round(p.combatStats.er || 0);

            const artsPlus20 = p.artefacts.filter(art => art.level === 20).length;

            if (em === 0 && er === 100 && artsPlus20 === 5) {
                anomalieOffensive = true;
            }
        }

        if (starterPackNames.includes(p.nom)) starterCount++;
        if (p.nom === "Nilou") hasNilou = true;

        if (p.nom === "Furina" && p.weapon && p.weapon.key === "FleuveCendreFerryman") {
            hasFurinaWithPipe = true;
        }
        if (p.nom.includes("Raiden") && p.weapon && p.weapon.key === "TheCatch") {
            hasRaidenCatch = true;
        }
        if (p.nom === "Zhongli" && p.weapon && p.weapon.key === "BlackTassel") {
            hasZhongliTassel = true;
        }
        if (hearthNames.includes(p.nom)) hearthCount++;
        if (kamisatoNames.includes(p.nom)) kamisatoCount++;
        if (aratakiNames.includes(p.nom)) aratakiCount++;
        if (adeptiNames.includes(p.nom)) adeptiCount++;
        if (sumeruNames.includes(p.nom)) sumeruCount++;
        if (mermoniaNames.includes(p.nom)) mermoniaCount++;
    });

    if (creatorUIDs.includes(currentUidStr)) {
        addBadge(
            "👑",
            t('badge.creator.name'),
            t('badge.creator.desc'),
            "linear-gradient(135deg, rgba(248, 250, 252, 0.7) 0%, rgba(56, 189, 248, 0.7) 50%, rgba(248, 250, 252, 0.7) 100%)"
        );
    }

    if (contributorUIDs.includes(currentUidStr)) {
        addBadge("🛠️", t('badge.contributor.name'), t('badge.contributor.desc'), "linear-gradient(135deg, #334155, #94a3b8)");
    }

    if (bestieUIDs.includes(currentUidStr)) {
        addBadge("💖", t('badge.bestie.name'), t('badge.bestie.desc'), "linear-gradient(135deg, #fbcfe8, #e879f9, #be185d)");
    }

    if (eluDeCelestia) {
        addBadge("🕊️", t('badge.celestia.name'), t('badge.celestia.desc'), "linear-gradient(135deg, rgba(250, 214, 32, 0.7) 0%, rgba(255, 255, 255, 0.7) 40%, rgba(56, 189, 248, 0.7) 100%)");
    }

    if (hasNilou) {
        addBadge("🌸", t('badge.nilou.name'), t('badge.nilou.desc'), "linear-gradient(135deg, rgba(251, 207, 232, 0.7), rgba(244, 114, 182, 0.7), rgba(251, 191, 36, 0.7))");
    }

    if (isAbyss && isTheater && isStygian) {
        addBadge("👑", t('badge.masterEndgame.name'), t('badge.masterEndgame.desc'), "linear-gradient(135deg, rgba(230,190,255,0.7), rgba(154,204,255,0.7), rgba(255,204,229,0.7), rgba(253,245,169,0.7))");
    } else {
        if (isAbyss) addBadge("🏆", t('badge.abyssArchon.name'), t('badge.abyssArchon.desc'), "rgba(37, 51, 85, 0.6)");
        if (isTheater) addBadge("🎭", t('badge.theaterStar.name'), t('badge.theaterStar.desc'), "rgba(82, 42, 138, 0.6)");
        if (isStygian && !isStygianDiff6) {
            addBadge("🐉", t('badge.carnageKing.name'), t('badge.carnageKing.desc'), "rgba(139, 45, 139, 0.6)");
        }
    }

    if (isStygianDiff6 && stygianSec !== null && stygianSec <= 180) {
        addBadge("🌌", t('badge.legend.name'), t('badge.legend.desc'), "linear-gradient(135deg, rgba(30,27,75,0.8), rgba(109,40,217,0.7), rgba(250,204,21,0.6))");
    } else if (isStygianDiff6) {
        addBadge("🩸", t('badge.carnagePlague.name'), t('badge.carnagePlague.desc'), "linear-gradient(135deg, rgba(153,27,27,0.7), rgba(220,38,38,0.7))");
    }

    if (playerInfo.finishAchievementNum >= 1700) {
        addBadge("📜", t('badge.archivist.name'), t('badge.archivist.desc'), "linear-gradient(135deg, rgba(6, 78, 59, 0.95), rgba(16, 185, 129, 0.85), rgba(253, 224, 71, 0.85))");
    }

    if (playerInfo.level === 60) addBadge("🏅", t('badge.veteran.name'), t('badge.veteran.desc'), "rgba(207, 156, 79, 0.6)");
    if (avgEff >= 95) addBadge("🌟", t('badge.perfection.name'), t('badge.perfection.desc'), "linear-gradient(135deg, rgba(255,215,0,0.7), rgba(255,255,255,0.6))");

    if (globalPersoData.length === 1) addBadge("🃏", t('badge.oneTrick.name', globalPersoData[0].nom), t('badge.oneTrick.desc', globalPersoData[0].nom), "rgba(107, 114, 128, 0.6)");
    else if (globalPersoData.length < 12) addBadge("🥷", t('badge.hiddenCollection.name'), t('badge.hiddenCollection.desc'), "rgba(107, 114, 128, 0.6)");

    const c6FiveStars = globalPersoData.filter(p => p.rarity === 5 && p.cons === 6).length;
    if (c6FiveStars > 1) addBadge("🐋", t('badge.narval.name'), t('badge.narval.desc'), "linear-gradient(135deg, rgba(30, 58, 138, 0.9), rgba(49, 46, 129, 0.9), rgba(167, 139, 250, 0.8))");
    else if (c6FiveStars === 1) addBadge("🐳", t('badge.whale.name'), t('badge.whale.desc'), "rgba(59, 172, 197, 0.6)");
    if (avgRNG > 80) addBadge("🍀", t('badge.lucky.name'), t('badge.lucky.desc', avgRNG.toFixed(1)), "rgba(61, 160, 97, 0.6)");
    else if (avgRNG < 40 && validChars > 0) addBadge("🌧️", t('badge.cursed.name'), t('badge.cursed.desc', avgRNG.toFixed(1)), "rgba(107, 114, 128, 0.6)");

    if (currentUidStr.length === 9 && currentUidStr.substring(1, 3) === "00") {
        addBadge(
            "🕰️",
            t('badge.og.name'),
            t('badge.og.desc'),
            "linear-gradient(135deg, rgba(120, 113, 108, 0.9), rgba(63, 63, 70, 0.9), rgba(212, 175, 55, 0.7))"
        );
    }

    if (leviathan) addBadge("🔱", t('badge.leviathan.name'), t('badge.leviathan.desc'), "linear-gradient(135deg, rgba(6,182,212,0.8), rgba(59,130,246,0.8), rgba(30,58,138,0.8))");

    if (level100Reached) addBadge("💫", t('badge.stellaFortuna.name'), t('badge.stellaFortuna.desc'), "linear-gradient(135deg, rgba(2,6,23,0.7), rgba(37,99,235,0.7), rgba(56,189,248,0.7))");

    if (holyGrail) addBadge("🏆", t('badge.holyGrail.name'), t('badge.holyGrail.desc'), "linear-gradient(135deg, #a16207 0%, #facc15 50%, #a16207 100%)");

    if (tripleCrown) addBadge("👑", t('badge.tripleCrown.name'), t('badge.tripleCrown.desc'), "linear-gradient(135deg, rgba(251,191,36,0.8), rgba(245,158,11,0.8), rgba(217,119,6,0.8))");

    if (akashamaxxing) addBadge("📈", t('badge.akasha.name'), t('badge.akasha.desc'), "linear-gradient(135deg, rgba(236,72,153,0.7), rgba(168,85,247,0.7))");

    if (hasFurinaWithPipe) {
        addBadge("🪠", t('badge.plombier.name'), t('badge.plombier.desc'), "linear-gradient(135deg, #1e3a8a, #d97706)");
    }

    if (hasRaidenCatch) {
        addBadge("🐟", t('badge.raidenCatch.name'), t('badge.raidenCatch.desc'), "linear-gradient(135deg, #7c3aed, #0ea5e9)");
    }

    if (hasZhongliTassel) {
        addBadge("🪨", t('badge.zhongliTassel.name'), t('badge.zhongliTassel.desc'), "linear-gradient(135deg, #ca8a04, #475569)");
    }

    if (fatuiCount >= 3) {
        addBadge("❄️", t('badge.fatui.name'), t('badge.fatui.desc'), "linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(22, 78, 99, 0.9), rgba(8, 145, 178, 0.8))");
    }

    if (mermoniaCount >= 3) {
        addBadge("⚖️", t('badge.mermonia.name'), t('badge.mermonia.desc'), "linear-gradient(135deg, rgba(20, 83, 101, 0.9) 0%, rgba(139, 131, 118, 0.95) 100%)");
    }

    if (hearthCount >= 3) {
        addBadge("🎩", t('badge.hearth.name'), t('badge.hearth.desc'), "linear-gradient(135deg, #7f1d1d, #1c1917, #f5f5f4)");
    }

    if (kamisatoCount >= 3) {
        addBadge("🪭", t('badge.kamisato.name'), t('badge.kamisato.desc'), "linear-gradient(135deg, #e0f2fe, #1e3a8a, #991b1b)");
    }

    if (aratakiCount >= 2) {
        addBadge("🎸", t('badge.arataki.name'), t('badge.arataki.desc'), "linear-gradient(135deg, #ca8a04, #7e22ce)");
    }

    if (adeptiCount >= 3) {
        addBadge("🏔️", t('badge.adepti.name'), t('badge.adepti.desc'), "linear-gradient(135deg, #0f766e, #064e3b, #b45309)");
    }

    if (sumeruCount === 4) {
        addBadge("🏛️", t('badge.sumeru.name'), t('badge.sumeru.desc'), "linear-gradient(135deg, #064e3b, #10b981, #b45309)");
    }

    if (healerCount >= 3) {
        addBadge("🏥", t('badge.hospital.name'), t('badge.hospital.desc'), "linear-gradient(135deg, rgba(6, 78, 59, 0.9), rgba(5, 150, 105, 0.8))");
    }

    if (playerInfo.level >= 55 && playerInfo.finishAchievementNum !== null && playerInfo.finishAchievementNum < 1000) {
        addBadge("📸", t('badge.tourist.name'), t('badge.tourist.desc'), "linear-gradient(135deg, rgba(180, 83, 9, 0.9), rgba(3, 105, 161, 0.9))");
    }

    if (anomalieOffensive) {
        addBadge("💥", t('badge.offensiveAnomaly.name'), t('badge.offensiveAnomaly.desc'), "linear-gradient(135deg, rgba(153, 27, 27, 0.8), rgba(38, 38, 38, 0.9), rgba(220, 38, 38, 0.8))");
    }

    if (starterCount === 3) {
        addBadge("👶", t('badge.starter.name'), t('badge.starter.desc'), "linear-gradient(135deg, #a7f3d0, #3b82f6)");
    }

    if (archonCount >= 4) addBadge("🏛️", t('badge.divine.name'), t('badge.divine.desc'), "linear-gradient(135deg, rgba(255,215,0,0.6), rgba(255,255,255,0.4))");
    if (allInCrit) addBadge("🎯", t('badge.allInCrit.name'), t('badge.allInCrit.desc'), "linear-gradient(135deg, rgba(220,38,38,0.8), rgba(249,115,22,0.8))");
    if (surgicalPrec) addBadge("🎯", t('badge.surgical.name'), t('badge.surgical.desc'), "rgba(220, 38, 38, 0.6)");

    if (highER) addBadge("⚡",  t('badge.powerPlant.name'), t('badge.powerPlant.desc'), "rgba(207, 156, 79, 0.6)");
    if (asthmatic) addBadge("😮‍💨", t('badge.asthmatic.name'), t('badge.asthmatic.desc'), "rgba(107, 114, 128, 0.6)");
    if (alchemist) addBadge("🧪", t('badge.alchemist.name'), t('badge.alchemist.desc'), "rgba(61, 160, 97, 0.6)");
    if (casino) addBadge("🎰", t('badge.casino.name'), t('badge.casino.desc'), "rgba(184, 63, 63, 0.6)");
    if (hpSack) addBadge("🛡️", t('badge.hpTank.name'), t('badge.hpTank.desc'), "rgba(207, 156, 79, 0.6)");

    if (impostor) addBadge("🤡", t('badge.impostor.name'), t('badge.impostor.desc'), "rgba(184, 63, 63, 0.6)");
    if (qiqiCurse) addBadge("🧟‍♀️", t('badge.qiqiCurse.name'), t('badge.qiqiCurse.desc'), "rgba(107, 114, 128, 0.6)");
    if (nudist) addBadge("🩳", t('badge.nudist.name'), t('badge.nudist.desc'), "rgba(107, 114, 128, 0.6)");
    if (internFound) addBadge("👶", t('badge.intern.name'), t('badge.intern.desc'), "rgba(107, 114, 128, 0.6)");
    if (aloyFound) addBadge("⏳", t('badge.aloy.name'), t('badge.aloy.desc'), "rgba(107, 114, 128, 0.6)");
    if (globalPersoData.some(p => p.ghettoKing)) addBadge("🪵", t('badge.tiersMonde.name'), t('badge.tiersMonde.desc'), "rgba(139, 69, 19, 0.6)");

    if (level89Syndrome) addBadge("🪙", t('badge.89.name'), t('badge.89.desc'), "rgba(107, 114, 128, 0.6)");
    if (level67EasterEgg) addBadge("👀", "67", "SIX SEVEEEEN", "rgba(168, 85, 247, 0.6)");

    if (emblemFan >= 3) addBadge("👘", t('badge.emblemFan.name'), t('badge.emblemFan.desc'), "rgba(168, 85, 247, 0.6)");
    if (favoniusCount >= 3) addBadge("🗡️", t('badge.favSect.name'), t('badge.favSect.desc'), "rgba(107, 114, 128, 0.6)");

    if (rainbowFan >= globalPersoData.length / 3 && globalPersoData.length >= 3) {
        addBadge("🌈", t('badge.rainbow.name'), t('badge.rainbow.desc'), "linear-gradient(90deg, rgba(255,0,0,0.4), rgba(255,165,0,0.4), rgba(255,255,0,0.4), rgba(0,128,0,0.4), rgba(0,0,255,0.4), rgba(75,0,130,0.4), rgba(238,130,238,0.4))");
    }

    if (pacifist) addBadge("🕊️", t('badge.pacifist.name'), t('badge.pacifist.desc'), "rgba(107, 114, 128, 0.6)");

    if (globalPersoData.length >= 4 && fourStarCount > globalPersoData.length / 2) {
        addBadge("🧑‍🌾", t('badge.f2p.name'), t('badge.f2p.desc'), "rgba(107, 114, 128, 0.6)");
    }
    if (globalPersoData.length >= 8 && fourStarCount === 0) {
        addBadge("💎", t('badge.champLeague.name'), t('badge.champLeague.desc'), "rgba(59, 130, 246, 0.6)");
    }
    if (globalPersoData.length >= 4 && maxFriendshipCount === globalPersoData.length) {
        addBadge("🤝", t('badge.bondUnbreakable.name'), t('badge.bondUnbreakable.desc'), "rgba(238, 130, 238, 0.6)");
    }

    let monopolyElem = null;
    Object.entries(elementCount).forEach(([elem, count]) => {
        if (count === globalPersoData.length && globalPersoData.length >= 4) {
            monopolyElem = elem;
            addBadge("🔮", t('badge.monopoly.name', elem.charAt(0).toUpperCase() + elem.slice(1)), t('badge.monopoly.desc'), "linear-gradient(135deg, rgba(37,51,85,0.8), rgba(168,85,247,0.7))");
        } else if (count > Math.ceil(globalPersoData.length / 2) && globalPersoData.length >= 4 && !monopolyElem) {
            addBadge("👑", t('badge.supremacy.name', elem.charAt(0).toUpperCase() + elem.slice(1)), t('badge.supremacy.desc'), "rgba(61, 160, 97, 0.6)");        }
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
                <p style="font-size: 9px; text-transform: uppercase; color: rgba(255,255,255,0.6); margin-bottom: 0px;">${t('ui.eval.globalGrade')}</p>
                <p style="font-size: 42px; font-weight: 800; color: ${globalGrade.color}; line-height: 1; text-shadow: 0 0 10px ${globalGrade.color}40;">${globalGrade.letter}</p>
            </div>
            <div style="display: flex; flex-direction: column; text-align: center; justify-content: center; gap: 2px; padding-right: 15px; border-right: 1px solid rgba(255,255,255,0.2); height: 100%;">
                <div>
                    <p style="font-size: 9px; text-transform: uppercase; color: rgba(255,255,255,0.6);">${t('ui.eval.efficiency')}</p>
                    <p style="font-size: 14px; font-weight: bold; color: var(--text-primary);">${avgEff.toFixed(1)}%</p>
                </div>
                <div>
                    <p style="font-size: 9px; text-transform: uppercase; color: rgba(255,255,255,0.6);">${t('ui.eval.score')}</p>
                    <p style="font-size: 14px; font-weight: bold; color: var(--text-primary);">${avgScore.toFixed(1)}</p>
                </div>
            </div>
            <div style="flex: 1; height: 100%; display: flex; flex-direction: column; justify-content: flex-start; overflow: hidden; padding: 2px 12px 2px 0;">
                <p style="font-size: 9px; text-transform: uppercase; color: rgba(255,255,255,0.6); margin-bottom: 2px; flex-shrink: 0; margin-top: 4px;">${t('ui.eval.badges')}</p>
                <div class="card-buff-list-container badges-scroll" style="display: flex; flex-wrap: wrap; gap: 4px; overflow-y: auto; overflow-x: hidden; padding-right: 8px; max-height: 100%; padding-bottom: 4px;">
                    ${badges.length > 0 ? badges.join('') : `<p style="color: rgba(255,255,255,0.5); font-size: 11px; font-style: italic;">${t('ui.eval.noBadge')}</p>`}
                </div>
            </div>
        </div>
    `;
}

function renderShowcase(index) {
    const p = globalPersoData[index];
    const container = document.getElementById('main-container');
    if (!container) return;

    if (window.currentPlayerNickname) {
        document.title = t('page.title.char', p.nom, window.currentPlayerNickname);

        const ogTitle = t('meta.og.title.char', p.nom, window.currentPlayerNickname);
        const ogDesc = t('meta.og.description.char', p.nom);

        const updateMeta = (selector, val) => {
            const el = document.querySelector(selector);
            if (el) el.setAttribute('content', val);
        };

        updateMeta('meta[property="og:title"]', ogTitle);
        updateMeta('meta[property="og:description"]', ogDesc);
        updateMeta('meta[name="twitter:title"]', ogTitle);
        updateMeta('meta[name="twitter:description"]', ogDesc);
    }

    const currentUid = new URLSearchParams(window.location.search).get('uid') || document.getElementById('uidInput').value;
    if (!window._isPopstate) {
        window.history.pushState({}, '', `?uid=${currentUid}&char=${encodeURIComponent(p.nom)}`);
    }
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

    let config = resolveCharConfig(p.nom);
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
    p.talents.forEach(talent => {
        talentsHtml += `
        <div style="width:64px; height:64px; background-color: rgba(0, 0, 0, 0.2); border-radius:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; position:relative; border:1px solid rgba(255, 255, 255, 0.4); margin-bottom: 11px;">
            <img src="${talent.icon}" style="width:60px; height:60px;" alt="${t('ui.char.skills')}">
            <div style="position:absolute; bottom:-10px; background-color: rgb(from var(--char-hex) calc(r / 3.5) calc(g / 3.5) calc(b / 3.5)); padding:2px 6px; border-radius:100%; font-size:10px;">${talent.level}</div>
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
        <div class="background-splash-art" style="background-image: url('${p.splashArt}'); background-position: center center;background-repeat: no-repeat;background-size: 300%; position: absolute;inset: 0px;z-index: 0;filter: blur(10px) brightness(0.7) saturate(0.8); max-width: 1153px; clip-path: inset(0);"></div>
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
                    <div style="font-size:16px; color: var(--text-always-white); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${p.weapon.name}</div>
                    <div style="color: var(--text-always-white); font-size:14px; margin-bottom:5px;">${t('ui.char.level', p.weapon.level)} • R${p.weapon.rank}</div>
                    <div style="display:flex; gap:12px; margin-top:5px; background:rgba(0,0,0,0.2); padding:5px; border-radius:8px; overflow: hidden;">
                        ${p.weapon.baseAtk ? `
                        <div style="overflow: hidden; padding-left: 2px;">
                            <p style="font-size:12px; color: rgba(255, 255, 255, 0.4); text-align: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${t('ui.art.baseAtk')}</p>
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
                                <img src="${ICON_BASE_PATH}${ICON_MAP[s.dmgBonusKey]}" style="width: 25px; height: 25px; margin-top: 2px;" alt="">
                                <img src="${ICON_BASE_PATH}${ICON_MAP[p.charWeapon]}" style="width: 29px; height: 29px;" alt="">
                            </div>
                            <div class="showcase-level-const" style="display: flex; flex-direction: column; text-align: right;">
                                <p style="font-size: 14px;">${t('ui.char.level', p.level)}</p>
                                <p style="font-size: 14px;">C${p.cons}</p>
                            </div>
                        </div>
                        <div style="margin-left: 10px; margin-right: 10px; display: flex; justify-content: space-between; align-items: center;">
                            <h2 style="font-size: 24px;">${p.nom}</h2>
                        </div>
                    </div>
                    <div>
                        <p style="margin-left: 10px; margin-right: 10px; margin-bottom: 9px; font-size: 14px;">${t('ui.char.baseStats')}</p>
                        <div class="showcase-base-stats-container" style="display: flex; flex-direction: column; gap: 9px; margin-left: 7px; margin-right: 10px; margin-bottom: 9px;">
                            ${statLine(createIcon('hp'), t('stat.hp'), Math.round(s.hp))}
                            ${statLine(createIcon('atk'), t('stat.atk'), Math.round(s.atk))}
                            ${statLine(createIcon('def'), t('stat.def'), Math.round(s.def))}
                            ${statLine(createIcon('eleMas'), t('stat.eleMas'), Math.round(s.em))}
                            ${statLine(createIcon('critRate_'), t('stat.critRate_'), s.cr.toFixed(1) + '%')}
                            ${statLine(createIcon('critDMG_'), t('stat.critDMG_'), s.cd.toFixed(1) + '%')}
                            ${statLine(createIcon('enerRech_'), t('stat.enerRech_'), s.er.toFixed(1) + '%')}
                            ${statLine(createIcon('heal_'), t('stat.heal_'), (s.hb || 0).toFixed(1) + '%')}
                            ${statLine(formatStat(s.dmgBonusKey, s.dmgBonus / 100).icon, formatStat(s.dmgBonusKey, s.dmgBonus / 100).label, s.dmgBonus.toFixed(1) + '%')}
                        </div>
                    </div>
                </div>
                
                <!-- 1.3.2 Score et note personnage -->
                <div class="showcase-area-score" style="display: flex; flex-direction: column; gap: 6px; border-radius: 8px; transition: background-color 0.35s, box-shadow 0.25s, border-color 0.25s; padding: 10px 10px 8px 7px;box-shadow: rgb(0, 0, 0) 1px 1px 6px, rgba(255, 255, 255, 0.3) 0px 0px 2px inset; border: 2px solid ${ev.grade.color}; box-sizing: border-box;">
                    <div class="stat-row" style="filter: none; justify-content: space-between; align-items: center; display: flex; box-sizing: border-box;">
                        <img src="assets/simulator/icons/icon_score_white.webp" alt="Score" style="width: 19px; height: 19px; margin-bottom: 2px; margin-right: 5px;">
                        <p>${t('ui.char.score')}</p>
                        <div class="dotted-line"></div> 
                        <div style="display: flex; flex-direction: row; gap: 4px;">
                            <p style="color: ${ev.grade.color};">${ev.score}</p>
                            <p>(${ev.grade.letter})</p>
                        </div>
                    </div>
                    <div class="stat-row" style="filter: none; justify-content: space-between; align-items: center; display: flex; box-sizing: border-box;">
                        <p style="margin-left: 24px;">${t('ui.char.totalRolls')}</p>
                        <div class="dotted-line"></div> 
                        <p>${ev.totalRolls}</p>
                    </div>
                </div>
                
                <!-- 1.3.3 Aptitudes -->
                <div class="showcase-area-skills" style="border-radius: 8px; transition: background-color 0.35s, box-shadow 0.25s, border-color 0.25s; padding: 10px; box-shadow: rgb(0, 0, 0) 1px 1px 6px, rgba(255, 255, 255, 0.3) 0px 0px 2px inset; border: 1px solid rgba(255, 255, 255, 0.4); box-sizing: border-box;">
                    <p style="margin-bottom: 9px; font-size: 14px;">${t('ui.char.skills')}</p>
                    ${talentsHtml}
                </div>
                
                <!-- 1.3.4 Statistiques de combat -->
                <div class="showcase-area-combat-stats" style="border-radius: 8px; transition: background-color 0.35s, box-shadow 0.25s, border-color 0.25s; padding-left: 2px; padding-right: 2px; padding-bottom: 3px; box-shadow: rgb(0, 0, 0) 1px 1px 6px, rgba(255, 255, 255, 0.3) 0px 0px 2px inset; border: 1px solid rgba(255, 255, 255, 0.4); box-sizing: border-box;">
                    <p style="margin-left: 10px; margin-right: 10px; margin-bottom: 9px; margin-top: 10px; font-size: 14px;">${t('ui.char.combatStats')}</p>
                    <div style="display: flex; flex-direction: column; gap: 9px; margin-left: 7px; margin-right: 10px; margin-bottom: 4px;">
                        ${(() => {
        let html = "";
        const dynamicDefs = [
            {wKey: 'hp', sKey: 'hp', icon: 'hp', label: t('stat.hp'), isPct: false},
            {wKey: 'atk', sKey: 'atk', icon: 'atk', label: t('stat.atk'), isPct: false},
            {wKey: 'def', sKey: 'def', icon: 'def', label: t('stat.def'), isPct: false}
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
            {wKey: 'eleMas', sKey: 'em', icon: 'eleMas', label: t('stat.eleMas'), isPct: false},
            {wKey: 'critRate_', sKey: 'cr', icon: 'critRate_', label: t('stat.critRate_'), isPct: true},
            {wKey: 'critDMG_', sKey: 'cd', icon: 'critDMG_', label: t('stat.critDMG_'), isPct: true},
            {wKey: 'enerRech_', sKey: 'er', icon: 'enerRech_', label: t('stat.enerRech_'), isPct: true}
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
            html += statLine(createIcon('heal_'), t('stat.heal_'), healVal.toFixed(1) + '%', false);
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
                <div style="color: var(--text-always-white); display: flex; justify-content: space-between; align-items: center;" class="substat-row ${isDead ? 'dead' : ''}">
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

        const pieceName = t('artifact.' + art.type);
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
                    
                    <div class="card-divider" style="margin: 12px 0px; display: flex; clear: both; width: 100%; min-width: 100%; box-sizing: border-box; color: var(--dotted-line); border-width: 1px 0 0; border-color: var(--dotted-line); border-block-start: 1px solid var(--dotted-line);"></div>
                    
                    <div class="main-stat-display" style="display: flex; flex-direction: row; align-items: center;">
                        <div style="display:flex; align-items:center; gap:5px; font-size:0.7rem; color:var(--text-grey); font-weight:normal; align-self:center;">
                            <img src="${ICON_BASE_PATH}${ICON_MAP[art.mainStat.key] || ICON_MAP['unknown']}" style="width: 17px; height: 17px; margin-bottom: 1px;" alt="${art.mainStat.key}">
                            <p style="font-size: 12px; color: var(--text-always-white);">${art.mainStat.label}</p>
                        </div>
                        <p style="font-size: 12px; color: var(--text-always-white);">${formatValueDisplay(art.mainStat.key, art.mainStat.value)}</p>
                    </div>
                    
                    <div class="card-divider" style="margin: 14px 0px; display: flex; clear: both; width: 100%; min-width: 100%; box-sizing: border-box; color: var(--dotted-line); border-width: 1px 0 0; border-color: var(--dotted-line); border-block-start: 1px solid var(--dotted-line);"></div>
                    
                    <div style="display: flex; flex-direction: column; gap: 5px;">${subsHtml}</div>
                    
                    <div class="card-divider" style="margin: 14px 0px; display: flex; clear: both; width: 100%; min-width: 100%; box-sizing: border-box; color: var(--dotted-line); border-width: 1px 0 0; border-color: var(--dotted-line); border-block-start: 1px solid var(--dotted-line);"></div>
                    
                    <div style="font-size: 12px; align-items: center;" class="art-score-footer">
                        <div style="display:flex; align-items:center; gap: 5px;">
                            <img src="/assets/simulator/icons/icon_score_white.webp" style="width: 19px; height: 19px; margin-bottom: 2px;" alt="Score">
                            <p>${t('ui.char.score')}</p>
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
            let translatedCat = t('buff.category.' + category);
            let displayCategory = (translatedCat === 'buff.category.' + category) ? category : translatedCat;

            buffListHtml += `
                <div style="font-size:12px; margin-bottom:6px; color:var(--text-always-white);">
                    ${displayCategory}
                </div>`;

            buffListHtml += `<div style="display: flex; flex-direction: column; gap: 6px;">`;

            groupedBuffs[category].forEach(item => {
                const buff = item.buff;
                const bIndex = item.originalIndex;

                const textColor = buff.active ? 'var(--text-always-white)' : 'rgba(255,255,255,0.6)';
                const trackColor = buff.active ? 'rgb(from var(--char-hex) r g b / 0.6)' : 'rgba(255,255,255,0.2)';
                const knobColor = buff.active ? 'var(--text-always-white)' : 'rgba(255, 255, 255, 0.6)';
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
                        <p style="margin-bottom: 2px;">${t('ui.char.buffsTitle')}</p>
                        <p style="font-size: 12px; color: rgba(255, 255, 255, 0.4);">${t('ui.char.buffsHint')}</p>
                    </div>
                    
                    <div class="card-divider" style="flex-shrink: 0; margin: 9px 0px; display: flex; clear: both; width: 100%; min-width: 100%; box-sizing: border-box; color: var(--dotted-line); border-width: 1px 0 0; border-color: var(--dotted-line); border-block-start: 1px solid var(--dotted-line);"></div>
                    
                    <div class="card-buff-list-container" style="overflow-y: auto; position: relative; flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 9px;">
                        ${buffListHtml}
                    </div>
                </div>
            </div>
        `;
    }

    html += `</div></div>`;


    html += `
        <div class="coaching-row" style="margin-top:32px; width:100%;">
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
        let s4TotalGains = {};

        return `
                <div style="padding:20px;">
                    <h2 style="color:var(--text-primary); margin-bottom:25px; font-size:32px; border-bottom:2px solid var(--text-primary); padding-bottom:10px; display:flex; align-items:center; gap:10px;">${t('analysis.title', p.nom)}</h2>                    
                    <div style="display:flex; flex-direction:column; gap:64px;">
                        
                        <div style="">
                            <h3 style="color:var(--text-primary); font-size:24px; margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 754.56 635.09" width="1em" height="1em" fill="var(--text-always-white)" aria-hidden="true" style="margin-bottom: 4px;">
                                  <g>
                                    <path d="M152.14,280.13c-45.74-14.28-136.26-1.61-146.52-.11-3.56,.51-6.01,3.71-5.57,7.27,12.14,99.94,68.85,320.92,71.26,330.28,.63,2.46,2.66,4.36,5.16,4.83,13.37,2.51,27.14,3.35,39.61,3.35,21.67,0,39.4-2.54,44.21-3.3,3.24-.51,5.62-3.38,5.53-6.67l-9.07-329.54c-.08-2.82-1.93-5.27-4.61-6.11Z"/>
                                    <path d="M488.13,401.94c-12.4-1.82-29-4.27-33.88-6.82,1.17-1.49,4.93-3.63,13.95-5.28,10.92-2,25.76-2.67,40.1-3.33,13.81-.63,26.86-1.22,36.89-2.92,18.83-3.19,35.46-33.57,32.35-59.1-5.24-43.06-56.32-43.96-78.05-42.34-80.25,5.97-148.87,3.48-182.59,1.46,75.26-40.96,85.34-108.22,85.34-163.28,0-27.93-13.12-54.71-36.01-73.47-14.99-12.28-32.07-19.14-42.51-17.05-15.94,3.19-15.86,22.85-15.75,50.05,.06,14.32,.12,30.55-1.81,48.27-6.65,60.81-119.62,142.3-124.43,145.74-1.72,1.23-2.72,3.15-2.74,5.26-.1,10.25-2.33,251.52,.01,300.8,2.48,52.06,63.99,53.27,118.26,54.34,3.96,.08,7.9,.16,11.81,.25,16.02,.39,30.52,.57,43.69,.57,103.31,0,123.21-11.31,127.96-22.76,5.82-14.02-6.58-25.37-14.79-32.89-1.72-1.57-3.87-3.54-5.24-5.05,1.39-.4,3.69-.88,7.41-1.28,27.88-3.04,48.73-12.29,58.71-26.06,5.97-8.24,7.89-17.69,5.7-28.09-3.43-16.28-25.07-18.72-42.47-20.67-6.32-.71-12.86-1.45-15.25-2.67-2.02-1.03-3.14-2.91-2.98-3.53,.02-.06,2.74-6.03,29.12-5.29,29.07,.81,44.26-8.82,51.87-17.05,8.52-9.21,12.42-21.88,10.97-35.66-2.25-21.35-41.26-27.09-75.67-32.15Z"/>
                                  </g>
                                  <path d="M667.93,99.97c-11.92-3.68-21.92-6.5-30.45-8.96-20.22-5.8-31.34-8.96-36.1-13.72-4.76-4.76-7.92-15.88-13.72-36.1-2.45-8.48-5.33-18.52-8.96-30.45-1.98-6.41-7.87-10.75-14.56-10.75s-12.58,4.38-14.56,10.75c-3.68,11.92-6.5,21.92-8.96,30.45-5.8,20.22-8.96,31.34-13.72,36.1-4.76,4.76-15.88,7.92-36.1,13.72-8.48,2.4-18.52,5.28-30.45,8.96-6.41,1.98-10.75,7.87-10.75,14.56s4.34,12.58,10.75,14.56c11.92,3.68,21.92,6.55,30.45,8.96,20.22,5.8,31.34,8.96,36.1,13.72,4.76,4.76,7.92,15.88,13.72,36.1,2.45,8.48,5.28,18.52,8.96,30.45,1.98,6.36,7.87,10.75,14.56,10.75h0c6.69,0,12.58-4.34,14.56-10.75,3.68-11.92,6.55-21.92,8.96-30.4,5.8-20.22,9-31.34,13.72-36.1s15.88-7.92,36.1-13.72c8.48-2.45,18.52-5.33,30.45-8.96,6.41-1.98,10.75-7.87,10.75-14.56s-4.38-12.58-10.75-14.56v-.05Z"/>
                                  <path d="M747.44,466.99c-7.9-2.44-14.52-4.31-20.17-5.93-13.4-3.84-20.77-5.93-23.92-9.09-3.15-3.15-5.25-10.52-9.09-23.92-1.62-5.62-3.53-12.27-5.93-20.17-1.31-4.25-5.21-7.12-9.65-7.12s-8.34,2.9-9.65,7.12c-2.44,7.9-4.31,14.52-5.93,20.17-3.84,13.4-5.93,20.77-9.09,23.92-3.15,3.15-10.52,5.25-23.92,9.09-5.62,1.59-12.27,3.5-20.17,5.93-4.25,1.31-7.12,5.21-7.12,9.65s2.87,8.34,7.12,9.65c7.9,2.44,14.52,4.34,20.17,5.93,13.4,3.84,20.77,5.93,23.92,9.09,3.15,3.15,5.25,10.52,9.09,23.92,1.62,5.62,3.5,12.27,5.93,20.17,1.31,4.22,5.21,7.12,9.65,7.12h0c4.43,0,8.34-2.87,9.65-7.12,2.44-7.9,4.34-14.52,5.93-20.14,3.84-13.4,5.96-20.77,9.09-23.92,3.12-3.15,10.52-5.25,23.92-9.09,5.62-1.62,12.27-3.53,20.17-5.93,4.25-1.31,7.12-5.21,7.12-9.65s-2.9-8.34-7.12-9.65v-.03Z"/>
                                </svg>
                                ${t('analysis.s1.title')}
                            </h3>
                            <p style="border-left: 3px solid var(--text-grey); padding-left: 12px; color: var(--text-grey); font-size: 16px; margin-bottom: 24px;">${t('analysis.s1.desc')}</p>
                            ${generateScoreBar(ev.totalRolls, ev.grade.letter, potential.totalRolls)}
                            
                            <div style="background:var(--bg-panel); padding:16px; border-radius:8px;">   
                                <div style="display:flex; justify-content:space-around; align-items:center; flex-wrap:wrap; gap:32px;">
                                    <div style="text-align:left;">
                                        <p style="font-size:12px; text-transform: uppercase; color:var(--text-grey); margin-bottom: 8px;">${t('analysis.s1.buildEff')}</p>
                                        <p style="font-size:40px; line-height: 1; color:${effColor};">${efficiency}%</p>
                                    </div>
                                    <div style="text-align:left;">
                                        <p style="font-size:12px; text-transform: uppercase; color:var(--text-grey); margin-bottom: 8px;">${t('analysis.s1.rngFactor')}</p>
                                        <p style="font-size:40px; line-height: 1; color:${rngQuality > 85 ? '#22c55e' : (rngQuality > 75 ? '#eab308' : '#ff4d4d')}">${rngQuality}%</p>
                                    </div>
                                    <div style="flex:1; min-width:200px;">
                                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; font-size:0.8rem;">
                                            <span style="color:var(--text-grey); font-size: 12px; text-transform: uppercase;">${t('analysis.s1.maxScore')}</span>
                                            <span style="font-weight:bold; color:var(--accent-gold);">${potential.score} <span style="color:#22c55e; font-size:0.7rem;">(+${gain})</span></span>
                                        </div>
                                        <div style="width:100%; background:#333; height:40px; border-radius:8px; position:relative;">
                                            <div style="height:100%; background:var(--text-primary); width:${Math.min((ev.score / potential.score) * 100, 100)}%; border-radius:8px; position:absolute;"></div>
                                            <div style="height:100%; background:var(--accent-gold); width:100%; opacity:0.3; border-radius:8px;"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                       <div style="margin: auto 10px; flex-grow: 1; width: unset; min-width: unset; background: none; border-color: var(--dotted-line); border-style: dashed; border-width: 1px 0 0; display: flex; clear: both;"></div>
                                
                        <div>
                            <h3 style="color:var(--text-primary); font-size:24px; margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
                                <svg width="1em" height="1em" fill="var(--text-always-white)" aria-hidden="true" style="margin-bottom: 4px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 749.25 721.43">
                                  <path d="M743.17,42.66c-7.94-29.87-21.11-39.99-25.59-42.66H171.87c10.13,33.12,26.62,115.66-5.37,242.29-16.64,65.87-32.06,97.84-44.45,123.53-17.95,37.23-31.08,64.44-36.55,176.91,6.76,.91,13.9,1.97,21.46,3.09,40.26,5.98,95.4,14.17,167.05,9.63,37.38-2.37,73.01-5.1,107.47-7.75,80.43-6.17,144.07-11.06,188.15-8.64,27.61,1.52,47.55,5.89,59.12,14.62,39.6,29.85,33.77,58.95,29.91,78.21-.26,1.3-.52,2.58-.75,3.83-1.11,5.86-6.24,10.11-12.19,10.11l-95.41-.76c.34,1.76,.74,3.5,1.22,5.24,7.28,26.9,30.02,51.44,54.79,58.36,13.17,3.68,32.57,3.87,50.82-15.64,7.21-12.99,9.83-36.14,11.46-66.23,.3-5.45,.56-11.13,.81-17.02,.22-5.17,.43-10.5,.65-15.99,2.92-73.49,7.34-184.54,48.54-323.83,20.42-69.05,41.26-164.53,24.56-227.32Zm-516.67,7.4c1.33-1.21,3.06-1.88,4.86-1.88h129.05c5.5,0,10.53,3.44,12.52,8.57,2.15,5.55,.39,11.83-4.6,16.39-1.33,1.21-3.06,1.88-4.86,1.88H234.42c-5.5,0-10.53-3.44-12.52-8.57-2.15-5.55-.39-11.83,4.6-16.39Zm55.36,158.86c-1.33,1.21-3.06,1.88-4.86,1.88h-39.54c-5.5,0-10.53-3.44-12.52-8.57-2.15-5.55-.39-11.83,4.6-16.39,1.33-1.21,3.06-1.88,4.86-1.88h39.54c5.5,0,10.53,3.44,12.52,8.57,2.15,5.55,.39,11.83-4.6,16.39Zm89.52-67.89c-1.33,1.21-3.06,1.88-4.86,1.88H237.47c-5.5,0-10.53-3.44-12.52-8.57-2.15-5.55-.39-11.83,4.6-16.39,1.33-1.21,3.06-1.88,4.86-1.88h129.05c5.5,0,10.53,3.44,12.52,8.57,2.15,5.55,.39,11.83-4.6,16.39Zm143.32-.71c-1.34,1.65-3.31,2.6-5.41,2.6h-95.3c-4.25,0-8.15-2.63-10.17-6.87-2.6-5.46-1.62-12.28,2.5-17.37,1.34-1.65,3.31-2.6,5.41-2.6h95.3c4.25,0,8.15,2.63,10.17,6.87,2.6,5.46,1.62,12.28-2.5,17.37Z"/>
                                  <path d="M527.21,649.43c-.19-.99-.33-1.98-.48-2.96-.8-5.09-1.14-10.18-1.03-15.27,.43-20.33,7.99-40.55,22.37-59.33,2.7-3.52,5.45-6.75,8.14-9.67-3.49-.07-7.1-.11-10.82-.11-43.62-.03-101.93,4.44-162.11,9.06-34.53,2.65-70.24,5.39-107.78,7.77-15.63,.99-30.47,1.39-44.57,1.36-52.73-.11-94.83-6.36-127.43-11.2-58.51-8.69-79.45-10.43-93.2,14.53-16.55,30.03-9.54,58.76-3.89,73.21,9.61,24.58,26.4,39.91,37.93,43.75,9.9,3.3,64.49-.1,117.28-3.39,57.26-3.56,126.26-7.86,188.79-7.86,50.41,0,96.61,2.79,129.11,11,46.57,11.76,76.33,18.77,98.1,21.11-24.99-15.3-44.79-42.66-50.41-72.01Z"/>
                                  <path d="M363.47,68.49c.17,0,.33-.06,.46-.18-.12,.11-.29,.18-.46,.18Z"/>
                                  <path d="M614.61,572.46c-5.11-3.85-14.12-6.46-26.19-8.1-7.79,6.06-32.71,27.48-38.18,57.2l86.36,.69c2.86-15.61,3.12-30.86-21.99-49.79Z"/>
                                </svg>
                                ${t('analysis.s2.title')}
                            </h3>
                            <p style="border-left: 3px solid var(--text-grey); padding-left: 12px; color: var(--text-grey); font-size: 16px; margin-bottom: 24px;">${t('analysis.s2.desc')}</p>
                            
                            <div style="display:flex; gap:20px; align-items:stretch;">
                                <div style="flex:1; background:var(--bg-panel); padding:15px; border-radius:8px; border-left:3px solid ${critAdvice.color}; display:flex; flex-direction:column; justify-content:space-between;">
                                    <div style="margin-bottom: 20px;">
                                        <p style="font-size:12px; color:var(--text-grey); text-transform:uppercase; margin-bottom:12px;">${t('analysis.s2.critAnalysis')}</p>
                                        <p style="font-size:14px; color:var(--text-primary); margin-bottom: 4px; line-height:1.4;">${critAdvice.msg}</p>
                                    </div>
                                    
                                    ${critAdvice.msg !== t('advice.crit.noCrit') ? `
                                    <div style="padding-left: 16px; padding-bottom: 24px; padding-top: 32px; border-top:1px dashed rgba(255,255,255,0.1);">
                                        <div style="width: 100%; aspect-ratio: ${Math.max(300, b.cd) / 100}; background: rgba(0,0,0,0.2); border-left: 1px solid rgba(255,255,255,0.2); border-bottom: 1px solid rgba(255,255,255,0.2); position: relative; display: flex; align-items: flex-end;">
                                            
                                            <span style="position:absolute; left:-18px; top:50%; font-size:10px; color:var(--text-grey); transform:translateY(-50%) rotate(-90deg); letter-spacing:1px; font-weight:bold;">CR</span>
                                            <span style="position:absolute; left:-12px; top:-16px; font-size:9px; color:var(--text-grey);">100%</span>
                                            
                                            <span style="position:absolute; bottom:-20px; left:50%; font-size:10px; color:var(--text-grey); transform:translateX(-50%); letter-spacing:1px; font-weight:bold;">CD</span>
                                            <span style="position:absolute; bottom:-20px; right:0; font-size:9px; color:var(--text-grey);">${Math.max(300, b.cd).toFixed(0)}%</span>

                                            <div style="width: ${(b.cd / Math.max(300, b.cd)) * 100}%; height: ${Math.min(b.cr, 100)}%; background: ${critAdvice.color}; opacity: 0.85; border-radius: 0 3px 0 0; box-shadow: inset -1px 1px 2px rgba(255,255,255,0.3); position: relative;">
                                                <span style="position:absolute; top:-18px; right:0; font-size:10px; font-weight:bold; color:var(--text-always-white); text-shadow:0 0 3px rgba(0,0,0,0.8); white-space:nowrap;">
                                                    ${b.cr.toFixed(1)}% / ${b.cd.toFixed(1)}%
                                                </span>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    ` : `
                                    <div style="flex:1;"></div>
                                    `}
                                </div>

${(() => {
            const targetER = (p.activeBuild && p.activeBuild.er_req) ? p.activeBuild.er_req : 100;
            const currentER = b.er;

            const adv = getERAdvice(currentER, targetER);
            if (!adv) return '';

            const color = adv.type === 'success' ? '#22c55e' : (adv.type === 'info' ? '#3b82f6' : '#ef4444');

            const pctCurrent = Math.max(0, Math.min(((currentER - 100) / 200) * 100, 100));
            const pctTarget = Math.max(0, Math.min(((targetER - 100) / 200) * 100, 100));

            let hatchedHtml = '';
            if (pctCurrent < pctTarget) {
                hatchedHtml = `<div style="position:absolute; top:0; bottom:0; left:${pctCurrent}%; width:${pctTarget - pctCurrent}%; background:repeating-linear-gradient(45deg, rgba(239,68,68,0.4), rgba(239,68,68,0.4) 4px, transparent 4px, transparent 8px);"></div>`;
            } else if (pctCurrent > pctTarget) {
                hatchedHtml = `<div style="position:absolute; top:0; bottom:0; left:${pctTarget}%; width:${pctCurrent - pctTarget}%; background:repeating-linear-gradient(45deg, rgba(255,255,255,0.2), rgba(255,255,255,0.2) 4px, transparent 4px, transparent 8px);"></div>`;
            }

            return `
                                    <div style="flex: 1; background:var(--bg-panel); padding:15px; border-radius:8px; border-left:3px solid ${color}; display:flex; flex-direction:column; justify-content:space-between;">
    <div>
        <p style="font-size: 12px;color: var(--text-grey); text-transform: uppercase;margin-bottom: 8px;">${adv.title}</p>
        <p style="font-size: 14px; color:var(--text-primary); flex:1; line-height:1.4; margin-bottom: 20px;">${adv.msg}</p>
    </div>
    
    <div style="width: 100%; position: relative;">
        <div style="width: 100%; height: 20px; background: rgba(0,0,0,0.2); border-radius: 4px; overflow: hidden; position: relative;">
            <div style="
                width: ${pctCurrent}%; 
                height: 100%; 
                background: ${color}; 
                opacity: 0.85; 
                transition: width 0.5s ease-out;
            "></div>
            ${hatchedHtml}
        </div>
        
        <div style="
            position: absolute; 
            left: ${pctTarget}%; 
            top: -4px; 
            width: 2px; 
            height: 16px; 
            background: var(--text-always-white); 
            box-shadow: 0 0 5px rgba(0,0,0,0.8);
            z-index: 2;
        ">
            <div style="position: absolute; top: -5px; left: -3px; width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 4px solid var(--text-always-white);"></div>
        </div>
        
        <div style="display: flex; justify-content: space-between; font-size: 10px; color: var(--text-grey); margin-top: 4px;">
            <span>100%</span>
            <span style="color:var(--text-always-white); font-weight:bold;">${t('advice.er.target')} ${targetER}%</span>
            <span>300%+</span>
        </div>
    </div>
</div>`;
        })()}
                                <div style="flex:1; background:var(--bg-panel); padding:15px; border-radius:8px; display:flex; flex-direction:column; justify-content:space-between;">
                                    <div style="margin-bottom:12px;">
                                        <div style="color:var(--text-grey); text-transform:uppercase; margin-bottom:8px; display:flex; justify-content:space-between; align-items:flex-end;">
                                            <p style="font-size:12px;">${t('analysis.s2.rollDist')}</p>
                                            <div style="font-size:11px; text-align: right;">
                                                <span style="color:#22c55e;">${t('analysis.s2.usefulRolls', rollStats.usefulCount)}</span> / 
                                                <span style="color:#ff4d4d;">${t('analysis.s2.deadRolls', rollStats.deadCount)}</span>
                                            </div>
                                        </div>
                                        
                                        <div style="display:flex; width:100%; height:8px; background:#333; border-radius:4px; overflow:hidden;">
                                            <div style="width:${(rollStats.usefulCount / rollStats.total) * 100}%; background:#22c55e;"></div>
                                            <div style="width:${(rollStats.deadCount / rollStats.total) * 100}%; background:#ff4d4d;"></div>
                                        </div>
                                    </div>
                                
                                    <div style="margin-bottom:10px;">
                                        <p style="font-size:11px; color:var(--text-grey); margin-bottom:4px;">${t('analysis.s2.usefulStats')}</p>
                                        <div style="display:flex; flex-wrap:wrap; gap:5px;">
                                            ${rollStats.usefulDetails.map(d =>
            `<span style="background:rgba(34, 197, 94, 0.15); color:#86efac; font-size:0.75rem; padding:2px 6px; border-radius:4px; border:1px solid rgba(34, 197, 94, 0.2);">
                                                    ${d.label} (${d.count})
                                                </span>`
        ).join('')}
                                        </div>
                                    </div>
                                
                                    <div>
                                        <p style="font-size:11px; color:var(--text-grey); margin-bottom:4px;">${t('analysis.s2.deadStats')}</p>
                                        <div style="display:flex; flex-wrap:wrap; gap:5px;">
                                            ${rollStats.deadDetails.length > 0 ? rollStats.deadDetails.map(d =>
            `<span style="background:rgba(255, 77, 77, 0.15); color:#ff9999; font-size:0.75rem; padding:2px 6px; border-radius:4px; border:1px solid rgba(255, 77, 77, 0.2);">
                                                    ${d.label} (${d.count})
                                                </span>`
        ).join('') : `<span style="color:#22c55e; font-size:0.75rem;">${t('analysis.s2.noDeadStats')}</span>`}                                        </div>
                                    </div>
                                
                                </div>
                                
                                ${(() => {
            if (!offPieceAdvice) return '';

            let borderColor = '#ef4444';
            if (offPieceAdvice.type === 'success') borderColor = '#22c55e';
            else if (offPieceAdvice.type === 'warning') borderColor = '#eab308';
            else if (offPieceAdvice.type === 'info') borderColor = '#f97316';
            else if (['empty', 'incomplete', 'rainbow'].includes(offPieceAdvice.type)) borderColor = '#6b7280';

            let innerHtml = '';

            if (offPieceAdvice.data) {
                const { offPiece, avgScore, is5of5 } = offPieceAdvice.data;
                const maxScale = Math.max(offPiece.score, avgScore, 55);
                const offPct = Math.min((offPiece.score / maxScale) * 100, 100);
                const avgPct = Math.min((avgScore / maxScale) * 100, 100);

                const innerColor = offPieceAdvice.type === 'success' ? '#22c55e' : (offPieceAdvice.type === 'warning' ? '#eab308' : (offPieceAdvice.type === 'info' ? '#f97316' : '#ef4444'));
                const labelText = is5of5 ? t('analysis.offPiece.replaceable') : t('analysis.offPiece.offSet');

                innerHtml = `
                                        <div style="background: rgba(0,0,0,0.2); padding: 12px; border-radius: 8px;">
                                            <div style="display: flex; align-items: center; gap: 12px;">
                                                <div style="position: relative; flex-shrink: 0;">
                                                    <img src="${offPiece.icon}" style="width: 40px; height: 40px; border-radius: 6px; background: rgba(0,0,0,0.3); border: 1px solid ${innerColor}80;">
                                                    <img src="./assets/simulator/icons/${ICON_MAP[offPiece.mainStat.key] || ICON_MAP['unknown']}" style="position: absolute; bottom: -4px; right: -4px; width: 16px; height: 16px; background: var(--bg-panel); border-radius: 50%; padding: 1px;">
                                                </div>
                                                
                                                <div style="flex: 1; min-width: 0;">
                                                    <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--text-grey); margin-bottom: 6px;">
                                                       <span>${labelText} : <strong style="color: ${innerColor}; font-size: 12px;">${offPiece.score}</strong></span>
                                                       <span>${t('analysis.offPiece.setAvg')} : <strong style="color: var(--text-always-white);">${avgScore.toFixed(1)}</strong></span>
                                                    </div>
                                                    
                                                    <div style="width: 100%; height: 8px; background: #222; border-radius: 4px; position: relative;">
                                                        <div style="position: absolute; left: 0; top: 0; bottom: 0; width: ${offPct}%; background: ${innerColor}; opacity: 0.85; border-radius: 4px; transition: width 0.5s ease-out;"></div>
                                                        
                                                        <div style="position: absolute; left: ${avgPct}%; top: -3px; bottom: -3px; width: 2px; background: var(--text-always-white); box-shadow: 0 0 4px rgba(0,0,0,0.8); z-index: 2;">
                                                            <div style="position: absolute; top: -4px; left: -3px; width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 4px solid var(--text-always-white);"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`;
            }

            return `
                                    <div style="flex:1; background:var(--bg-panel); padding:15px; border-radius:8px; border: 1px solid rgba(255, 255, 255, 0.05); border-left:3px solid ${borderColor}; display:flex; flex-direction:column; justify-content:space-between;">
                                        <div>
                                            <p style="font-size:12px; color:var(--text-grey); text-transform:uppercase; margin-bottom:12px;">${t('analysis.s2.offPiece')}</p>
                                            <p style="font-size:14px; color:var(--text-primary); line-height:1.4; margin-bottom: 20px;">${offPieceAdvice.msg}</p>
                                        </div>
                                        ${innerHtml}
                                    </div>
                                    `;
        })()}
                            </div>
                        </div>

                       <div style="margin: auto 10px; flex-grow: 1; width: unset; min-width: unset; background: none; border-color: var(--dotted-line); border-style: dashed; border-width: 1px 0 0; display: flex; clear: both;"></div>

                        <div>
                            <h3 style="color:var(--text-primary); font-size:24px; margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
                                <svg width="1em" height="1em" fill="var(--text-always-white)" aria-hidden="true" style="margin-bottom: 4px;" viewBox="0 0 874 750" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M493.063 621.82C493.008 621.824 492.952 621.829 492.896 621.833C492.955 621.829 493.014 621.823 493.073 621.819L493.063 621.82Z" />
                                    <path d="M809.453 621.77C809.42 621.776 809.386 621.78 809.352 621.78H494.302C494.098 621.78 493.892 621.783 493.686 621.79L494.302 621.78H809.352L809.453 621.77Z" />
                                    <path d="M516.366 94.2002C543.104 89.196 578.89 86.7057 623.411 87.0322V261.93C623.411 263.163 623.574 265.105 624.502 267.271L624.506 267.278L624.509 267.286C627.3 273.775 633.434 277.869 640.271 277.869C644.517 277.869 648.684 276.26 651.859 273.259L687.471 239.613L725.277 265.187C734.135 271.179 746.365 267.604 750.573 257.258C750.599 257.195 750.625 257.132 750.649 257.069C750.655 257.056 750.662 257.042 750.667 257.028L750.666 257.027C751.502 254.904 751.602 253.058 751.602 252.09V93.834C768.961 95.2766 785.817 96.6407 796.852 97.6162V608.779H494.302C483.963 608.779 473.685 613.928 466.071 618.668V115C468.757 111.59 473.751 107.719 482.235 103.968C490.777 100.191 502.094 96.8713 516.366 94.2002Z" />
                                    <path d="M738.562 252.289L738.453 252.547C738.342 252.793 738.215 253.021 738.076 253.23C738.262 252.949 738.426 252.635 738.562 252.289Z" />
                                    <path d="M809.667 85.8896C809.713 85.927 809.751 85.9719 809.781 86.0225C809.766 85.9971 809.749 85.9735 809.729 85.9512L809.667 85.8896Z" />
                                    <path d="M551.672 76.4688C553.998 76.2669 556.363 76.0776 558.767 75.9004C557.565 75.989 556.373 76.081 555.19 76.1758L551.672 76.4688Z" />
                                    <path d="M610.418 74.0186C607.526 74.0338 604.67 74.0612 601.853 74.1016C599.035 74.142 596.254 74.1953 593.511 74.2607C600.369 74.0971 607.46 74.0116 614.783 74.0049C613.319 74.0062 611.864 74.0109 610.418 74.0186Z" />
                                    <path d="M259.201 74.0049C347.079 74.086 401.658 85.5004 418.364 107.26C419.164 108.3 419.874 109.35 420.494 110.439C420.634 110.679 420.794 110.9 420.914 111.14V643.82C420.914 644.116 420.672 644.317 420.417 644.318C420.672 644.316 420.913 644.115 420.913 643.819L420.914 111.14C420.794 110.9 420.634 110.679 420.494 110.439C419.874 109.35 419.164 108.3 418.364 107.26C401.658 85.5006 347.078 74.0861 259.201 74.0049Z" />
                                    <path d="M381.252 621.846C380.722 621.804 380.2 621.78 379.684 621.78H75.6338C75.5985 621.78 75.5643 621.776 75.5312 621.77L75.6328 621.779H379.683L380.299 621.79C380.614 621.8 380.932 621.82 381.252 621.846Z" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M241.396 87.1367C290.199 86.3788 329.067 88.8567 357.618 94.2002C371.89 96.8713 383.207 100.191 391.749 103.968C400.234 107.719 405.227 111.59 407.913 115V618.668C400.3 613.928 390.022 608.779 379.683 608.779H88.1328V97.4033C99.1881 96.1598 115.98 94.3944 136.295 92.668L237.966 87.1943L241.396 87.1367ZM255.372 128.07C252.915 121.31 243.355 121.31 240.897 128.07L213.95 202.208C213.172 204.35 211.484 206.037 209.343 206.815L135.205 233.762C128.445 236.219 128.445 245.78 135.205 248.237L209.343 275.185C211.484 275.963 213.172 277.65 213.95 279.792L240.897 353.93C243.355 360.69 252.915 360.69 255.372 353.93L282.319 279.792C283.098 277.65 284.785 275.963 286.927 275.185L361.064 248.237C367.825 245.78 367.825 236.219 361.064 233.762L286.927 206.815C284.785 206.037 283.098 204.35 282.319 202.208L255.372 128.07Z" />
                                    <path d="M476.133 674.5C462.933 684.5 444.633 686.667 437.133 686.5V686.501C429.643 686.668 411.369 684.501 398.187 674.501C388.7 667.304 395.191 666.501 376.717 666.501C358.242 666.501 130.559 669.001 114.581 667.001C110.087 666.439 95.1078 651.001 87.6183 644.501C82.2036 639.802 78.8278 636.927 77.4908 635.801C77.2639 635.61 77.1328 635.33 77.1328 635.033V630.501C77.1328 629.949 77.5805 629.501 78.1328 629.501H376.891C378.435 629.501 379.981 629.63 381.469 630.046C389.538 632.299 406.168 639.717 423.152 656.001C424.65 657.437 428.645 657.001 428.645 647.501V113.5C429.477 113 432.339 112 437.133 112C441.933 112 444.799 113 445.633 113.5V647.5C445.633 657 449.633 657.436 451.133 656C468.145 639.712 484.802 632.295 492.88 630.043C494.366 629.629 495.91 629.5 497.452 629.5H796.633C797.185 629.5 797.633 629.948 797.633 630.5V635.032C797.633 635.328 797.501 635.609 797.274 635.8C795.935 636.926 792.555 639.801 787.133 644.5C779.633 651 764.633 666.438 760.133 667C744.133 669 516.133 666.5 497.633 666.5C479.133 666.5 485.633 667.303 476.133 674.5Z" />
                                    <path d="M78.2892 629.5C73.2894 629.5 71.7888 620.5 71.2888 616L51.9997 616.5C51.9998 634 69.7889 667.5 126.289 667.5L78.2892 629.5Z" />
                                    <path d="M75.1328 163H30.1328V229H75.1328V163ZM88.1328 242H17.1328V150H88.1328V242Z" />
                                    <path d="M75.2891 276H33.2891V339H75.2891V276ZM88.2891 352H20.2891V263H88.2891V352Z" />
                                    <path d="M71.2888 616C71.2887 617.104 70.3937 618 69.2894 618H53.8919C52.83 618 51.9561 617.219 51.8978 616.158C49.5796 574.022 46.6739 521.179 43.641 466H71.2894L71.2888 616Z" />
                                    <path d="M71.2894 386H39.2454C38.3737 370.132 37.509 354.4 36.6634 339H71.2894V386Z" />
                                    <path d="M71.2894 276L33.2891 276L33.2894 277.506C32.3467 260.325 31.4534 244.038 30.6292 229H71.2894V276Z" />
                                    <path d="M68.6742 113.871C69.9651 113.437 71.2894 114.403 71.2894 115.765V163L30.1328 163L30.1331 219.95C27.5143 172.151 25.6855 138.679 25.346 132.171C25.3076 131.433 25.695 130.8 26.3529 130.463C37.1149 124.961 57.4863 117.64 68.6742 113.871Z" />
                                    <path d="M75.2891 386H35.2891V466H75.2891V386ZM88.2891 479H22.2891V373H88.2891V479Z" />
                                </svg>
                                ${t('analysis.s3.title')}
                            </h3>
                            <p style="border-left: 3px solid var(--text-grey); padding-left: 12px; color: var(--text-grey); font-size: 16px; margin-bottom: 24px;">${t('analysis.s3.desc')}</p>
                            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:20px;">
                                <div style="grid-column: 1 / -1; margin-top: 10px; margin-bottom: -5px;">
                                    <p style="font-size:12px; color:var(--text-grey); text-transform:uppercase; letter-spacing:0.05em;">${t('analysis.s3.p1.title')}</p>
                                </div>
                                ${(() => {
            const adv = getLevelAdvice(p);
            const borderColor = adv.type === 'success' ? '#22c55e' : '#ef4444'; 
            const pctCurrent = Math.min((p.level / adv.maxLevel) * 100, 100);
            const pctTarget = 100;

            return `
                                    <div style="background:var(--bg-panel); padding:15px; border-radius:8px; border-left:3px solid ${borderColor}; display:flex; flex-direction:column; justify-content:space-between; min-height:165px; box-sizing:border-box;">
                                        <div>
                                            <p style="font-size: 12px; color: var(--text-grey); text-transform: uppercase; margin-bottom: 12px;">${adv.title}</p>
                                            <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px;">
                                                <img src="${p.image}" style="width:60px; height:60px; border-radius:6px; background:rgba(0,0,0,0.1); object-fit:cover; align-self:flex-start;" alt="${p.nom}">
                                                <div style="flex:1;">
                                                    <p style="font-size: 12px; color:var(--text-grey); margin:0 0 4px 0; font-weight:500;">${p.nom}</p>
                                                    <p style="font-size: 14px; color:var(--text-primary); margin:0; line-height:1.4;">${adv.msg}</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div style="width: 100%; position: relative; margin-top:auto;">
                                            <div style="width: 100%; height: 16px; background: rgba(0,0,0,0.2); border-radius: 4px; overflow: hidden; position: relative;">
                                                <div style="
                                                    width: ${pctCurrent}%; 
                                                    height: 100%; 
                                                    background: ${adv.barColor};
                                                    opacity: 0.85; 
                                                    transition: width 0.5s ease-out;
                                                "></div>
                                            </div>
                                            
                                            <div style="
                                                position: absolute; 
                                                left: ${pctTarget}%; 
                                                top: -4px; 
                                                width: 2px; 
                                                height: 24px; 
                                                background: var(--text-always-white); 
                                                box-shadow: 0 0 5px rgba(0,0,0,0.8);
                                                z-index: 2;
                                                transform: translateX(-50%);
                                            ">
                                                <div style="position: absolute; top: -5px; left: -3px; width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 4px solid var(--text-always-white);"></div>
                                            </div>
                                            
                                            <div style="display: flex; justify-content: space-between; font-size: 10px; color: var(--text-grey); margin-top: 4px;">
                                                <span>${t('analysis.s3.lvl.1')}</span>
                                                <span style="color:var(--text-always-white); font-weight:bold;">${t('analysis.s3.lvl.current', p.level)}</span>
                                                <span>${t('analysis.s3.lvl.max', adv.maxLevel)}</span>
                                            </div>
                                        </div>
                                    </div>`;
        })()}
                        
                                ${(() => {
            const adv = getWeaponAdvice(p);
            const color = adv.type === 'success' ? '#22c55e' : '#ef4444';
            const weaponLevel = p.weapon ? p.weapon.level : 1;
            const pctCurrent = (weaponLevel / 90) * 100;
            const pctTarget = 100;
            const weaponIcon = p.weapon ? p.weapon.icon : 'assets/simulator/icons/icon_unknown.webp';

            return `
                                    <div style="background:var(--bg-panel); padding:15px; border-radius:8px; border-left:3px solid ${color}; display:flex; flex-direction:column; justify-content:space-between; min-height:165px; box-sizing:border-box;">
                                        <div>
                                            <p style="font-size: 12px; color: var(--text-grey); text-transform: uppercase; margin-bottom: 12px;">${adv.title}</p>
                                            <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px;">
                                                <img src="${weaponIcon}" style="width:60px; height:60px; border-radius:6px; background:rgba(0,0,0,0.1); object-fit:cover; align-self:flex-start;" alt="Arme">
                                                <div style="flex:1;">
                                                    <p style="font-size: 12px; color:var(--text-grey); margin:0 0 4px 0; font-weight:500;">${p.weapon ? p.weapon.name : ''}</p>
                                                    <p style="font-size: 14px; color:var(--text-primary); margin:0; line-height:1.4;">${adv.msg}</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div style="width: 100%; position: relative; margin-top:auto;">
                                            <div style="width: 100%; height: 16px; background: rgba(0,0,0,0.2); border-radius: 4px; overflow: hidden; position: relative;">
                                                <div style="
                                                    width: ${pctCurrent}%; 
                                                    height: 100%; 
                                                    background: ${color}; 
                                                    opacity: 0.85; 
                                                    transition: width 0.5s ease-out;
                                                "></div>
                                            </div>
                                            
                                            <div style="
                                                position: absolute; 
                                                left: ${pctTarget}%; 
                                                top: -4px; 
                                                width: 2px; 
                                                height: 24px; 
                                                background: var(--text-always-white); 
                                                box-shadow: 0 0 5px rgba(0,0,0,0.8);
                                                z-index: 2;
                                                transform: translateX(-50%);
                                            ">
                                                <div style="position: absolute; top: -5px; left: -3px; width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 4px solid var(--text-always-white);"></div>
                                            </div>
                                            
                                            <div style="display: flex; justify-content: space-between; font-size: 10px; color: var(--text-grey); margin-top: 4px;">
                                                <span>${t('analysis.s3.lvl.1')}</span>
                                                <span style="color:var(--text-always-white); font-weight:bold;">${t('analysis.s3.lvl.current', weaponLevel)}</span>
                                                <span>${t('analysis.s3.lvl.max', 90)}</span>
                                            </div>
                                        </div>
                                    </div>`;
        })()}
                        
                                ${(() => {
            if (!talentAdvices || talentAdvices.length === 0) return '';
            const color = talentAdvices[0].type === 'success' ? '#22c55e' : '#ef4444';

            const target = config.talents || {auto: 1, skill: 1, burst: 1};
            const talentKeys = ['auto', 'skill', 'burst'];

            let circlesHtml = '';
            if (p.talents && p.talents.length >= 3) {
                circlesHtml = `<div style="display:flex; justify-content:space-around; align-items:center; margin-top:auto; gap:10px; padding-top:16px;">`;
                talentKeys.forEach((key, idx) => {
                    const curLvl = p.talents[idx].level || 1;
                    const tgtLvl = target[key] || 1;
                    const pct = Math.min((curLvl / tgtLvl) * 100, 100);

                    const lvlText = curLvl >= tgtLvl
                        ? `<span style="color:var(--text-primary); font-weight:bold;">${curLvl}</span>`
                        : `<span style="color:var(--text-muted);">${curLvl}</span> <span style="color:var(--text-always-white); font-weight:bold; font-size:11px;">➔</span> <span style="color:#22c55e; font-weight:bold;">${tgtLvl}</span>`;

                    const progressColor = curLvl >= tgtLvl ? '#22c55e' : '#ef4444';

                    circlesHtml += `
                        <div style="display:flex; flex-direction:column; align-items:center; gap:6px; flex:1;">
                            <div style="width: 60px; height: 60px; border-radius: 50%; background: conic-gradient(${progressColor} ${pct}%, rgba(255,255,255,0.1) ${pct}%); display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                                <div style="width: 54px; height: 54px; border-radius: 50%; background: var(--bg-panel); display: flex; align-items: center; justify-content: center; overflow: hidden;">
                                    <img src="${p.talents[idx].icon}" style="width: 40px; height: 40px; object-fit: contain;" alt="">
                                </div>
                            </div>
                            <p style="font-size: 12px; margin: 0; white-space:nowrap;">${lvlText}</p>
                        </div>`;
                });
                circlesHtml += `</div>`;
            }

            return `
                                    <div style="background:var(--bg-panel); padding:15px; border-radius:8px; border-left:3px solid ${color}; display:flex; flex-direction:column; justify-content:space-between; min-height:165px; box-sizing:border-box;">
                                        <div>
                                            <p style="font-size: 12px; color: var(--text-grey); text-transform: uppercase; margin-bottom: 12px;">${t('analysis.s3.talentPriority')}</p>
                                            <div style="display:flex; flex-direction:column; gap:6px;">
                                                ${talentAdvices.map(adv => `
                                                    <p style="font-size: 14px; color:var(--text-primary); margin:0; line-height:1.4;">${adv.msg}</p>
                                                `).join('')}
                                            </div>
                                        </div>
                                        ${circlesHtml}
                                    </div>`;
        })()}
                        
                                ${(() => {
            const adv = getMainStatAdvice(p, config);
            if (!adv) return '';

            if (adv.isEmpty) {
                return `
        <div style="background:var(--bg-panel); padding:15px; border-radius:8px; border-left:3px solid #6b7280; display:flex; flex-direction:column; justify-content:space-between; min-height:165px; box-sizing:border-box;">
            <div>
                <p style="font-size: 12px;color: var(--text-grey); text-transform: uppercase;margin-bottom: 12px;">${adv.title}</p>
                <div style="display:flex; flex-direction:column; gap:6px;">
                    <p style="font-size:14px; color:var(--text-primary); margin:0; line-height:1.4;">${adv.msg}</p>
                </div>
            </div>
        </div>`;
            }

            const color = adv.type === 'success' ? '#22c55e' : '#ef4444';
            let circlesHtml = '';

            if (adv.slotsData && adv.slotsData.length === 3) {
                circlesHtml = `<div style="display:flex; justify-content:space-around; align-items:center; margin-top:auto; gap:10px; padding-top:16px;">`;

                adv.slotsData.forEach(slot => {
                    if (!slot.isEquipped) {
                        circlesHtml += `
                <div style="display:flex; flex-direction:column; align-items:center; flex:1;">
                    <div style="width: 60px; height: 60px; border-radius: 8px; background: conic-gradient(#4b5563 100%, rgba(255,255,255,0.1) 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.3); opacity: 0.4;">
                        <div style="position:relative; width: 54px; height: 54px; border-radius: 6px; background: var(--bg-panel); display: flex; align-items: center; justify-content: center; overflow: hidden;">
                            <img src="${ICON_BASE_PATH}icon_unknown.webp" style="width: 28px; height: 28px; object-fit: contain; opacity: 0.3;" alt="?">
                        </div>
                    </div>
                </div>`;
                        return;
                    }

                    const progressColor = slot.isOk ? '#22c55e' : '#ef4444';

                    circlesHtml += `
            <div style="display:flex; flex-direction:column; align-items:center; flex:1;">
                <div style="width: 60px; height: 60px; border-radius: 8px; background: conic-gradient(${progressColor} 100%, rgba(255,255,255,0.1) 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                    <div style="position:relative; width: 54px; height: 54px; border-radius: 6px; background: var(--bg-panel); display: flex; align-items: center; justify-content: center; overflow: hidden;">
                        <img src="${slot.icon}" style="width: 48px; height: 48px; object-fit: contain; border-radius: 4px;" alt="">
                        ${slot.isOk ? `
                            <div style="position:absolute; bottom:2px; left:2px; background:rgba(0,0,0,0.4); border-radius:3px; padding:1px; display:flex; align-items:center; justify-content:center;">
                                <img src="${ICON_BASE_PATH}${ICON_MAP[slot.currentKey] || ICON_MAP['unknown']}" style="width:14px; height:14px;" title="${STAT_LABELS[slot.currentKey] || slot.currentKey}">
                            </div>
                        ` : `
                            <div style="position:absolute; bottom:2px; left:2px; background:rgba(0,0,0,0.4); border-radius:3px; padding:1px; display:flex; align-items:center; justify-content:center;">
                                <img src="${ICON_BASE_PATH}${ICON_MAP[slot.currentKey] || ICON_MAP['unknown']}" style="width:14px; height:14px; opacity:0.6; filter:grayscale(100%);" title="${STAT_LABELS[slot.currentKey] || slot.currentKey}">
                            </div>
                            <div style="position:absolute; bottom:2px; right:2px; background:rgba(0,0,0,0.4); border-radius:3px; padding:1px; display:flex; align-items:center; gap:1px; justify-content:center;">
                                ${slot.allowedKeys.map(k => `<img src="${ICON_BASE_PATH}${ICON_MAP[k] || ICON_MAP['unknown']}" style="width:14px; height:14px;" title="${STAT_LABELS[k] || k}">`).join('')}
                            </div>
                            <div style="position:absolute; bottom:3px; left:50%; transform:translateX(-50%); color:var(--text-always-white); font-size:10px; font-weight:bold; text-shadow:0 0 3px rgba(0,0,0,0.9); line-height:1;">➔</div>
                        `}
                    </div>
                </div>
            </div>`;
                });
                circlesHtml += `</div>`;
            }

            return `
    <div style="background:var(--bg-panel); padding:15px; border-radius:8px; border-left:3px solid ${color}; display:flex; flex-direction:column; justify-content:space-between; min-height:165px; box-sizing:border-box;">
        <div>
            <p style="font-size: 12px;color: var(--text-grey); text-transform: uppercase;margin-bottom: 12px;">${adv.title}</p>
            <div style="display:flex; flex-direction:column; gap:6px;">
                ${adv.type === 'success'
                ? `<p style="font-size:14px; color:var(--text-primary); margin:0; line-height:1.4;">${adv.msg}</p>`
                : adv.details.map(d => `<p style="font-size:14px; color:var(--text-primary); margin:0; line-height:1.4;">${t('analysis.s3.mainStatDetail', d.piece, d.better, d.current)}</p>`).join('')
            }
            </div>
        </div>
        ${circlesHtml}
    </div>`;
        })()}
                        
                                ${(() => {
            const adv = getMetaSetAdvice(p, config);
            if (!adv) return '';

            let color = '#ef4444';
            if (adv.type === 'success') color = '#22c55e';
            if (adv.type === 'info') color = '#f97316';

            const setsHtml = adv.targetSets.map(targetSet => {
                let baseIconStr = null;
                if (targetSet.hash && window.iconToNameHash) {
                    for (const [icon, hash] of Object.entries(window.iconToNameHash)) {
                        if (String(hash) === String(targetSet.hash)) {
                            baseIconStr = icon.substring(0, icon.lastIndexOf('_'));
                            break;
                        }
                    }
                }
                const setIconUrl = baseIconStr ? `https://enka.network/ui/${baseIconStr}_${targetSet.required}.png` : ICON_BASE_PATH + "icon_unknown.webp";

                let piecesHtml = '';
                for(let i = 0; i < targetSet.required; i++) {
                    const isEquipped = i < targetSet.current;
                    const pieceColor = isEquipped ? color : 'rgba(255,255,255,0.15)';
                    piecesHtml += `<div style="width: 14px; height: 14px; border-radius: 3px; background: ${pieceColor}; transform: rotate(45deg); margin: 0 6px;"></div>`;
                }

                return `
            <div style="display:flex; align-items:center; gap: 15px;">
                <div style="width: 60px; height: 60px; border-radius: 8px; background: rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    <img src="${setIconUrl}" style="width: 60px; height: 60px; object-fit: contain;" alt="">
                </div>
                <div style="display:flex; flex-direction:column; gap:8px;">
                    <span style="font-size: 11px; color: var(--text-primary); font-weight: 500;">${targetSet.name}</span>
                    <div style="display:flex; align-items:center; padding-left: 2px;">
                        ${piecesHtml}
                    </div>
                </div>
            </div>
        `;
            }).join(''); 

            return `
    <div style="background:var(--bg-panel); padding:15px; border-radius:8px; justify-content: space-between; border-left:3px solid ${color}; display:flex; flex-direction:column; min-height:165px; box-sizing:border-box;">
        <div>
            <p style="font-size: 12px;color: var(--text-grey); text-transform: uppercase;margin-bottom: 12px;">${adv.title}</p>
            <p style="font-size: 14px; color:var(--text-primary); line-height:1.4; margin:0;">${adv.msg}</p>
        </div>
        
        <div style="display:flex; flex-direction:${adv.is2p2p ? 'row' : 'row'}; flex-wrap:wrap; gap: 15px; padding-top: 16px;">
            ${setsHtml}
        </div>
    </div>`;
        })()}
                        
                                ${(() => {
            const adv = getSetForcingAdvice(p, config);
            if (!adv) return '';

            if (adv.status === 'empty' || adv.status === 'incomplete') {
                return `
        <div style="background:var(--bg-panel); padding:15px; border-radius:8px; border-left:3px solid #6b7280; display:flex; flex-direction:column; min-height:165px; box-sizing:border-box;">
            <div>
                <p style="font-size: 12px; color: var(--text-grey); text-transform: uppercase; margin-bottom: 12px;">${adv.title}</p>
                <p style="font-size: 14px; color:var(--text-primary); line-height:1.4; margin:0;">${adv.msg}</p>
            </div>
        </div>`;
            }

            let color = '#ef4444';
            if (adv.type === 'success') color = '#22c55e';
            if (adv.type === 'warning') color = '#eab308';
            if (adv.type === 'info') color = '#3b82f6';

            const getSetIcon = (hash) => {
                let baseIconStr = null;
                if (hash && window.iconToNameHash) {
                    for (const [icon, h] of Object.entries(window.iconToNameHash)) {
                        if (String(h) === String(hash)) {
                            baseIconStr = icon.substring(0, icon.lastIndexOf('_'));
                            break;
                        }
                    }
                }
                return baseIconStr ? `https://enka.network/ui/${baseIconStr}_4.png` : ICON_BASE_PATH + "icon_unknown.webp";
            };

            let bottomHtml = '';

            if (adv.status === 'forcing' || adv.status === 'good4p' || adv.status === 'offMeta4p') {
                const setIconUrl = getSetIcon(adv.targetSet.hash);
                const scorePct = Math.min((adv.targetSet.avgScore / 45) * 100, 100);
                const thresholdPct = (25 / 45) * 100;

                bottomHtml = `
        <div style="display:flex; align-items:center; gap: 12px; width: 100%;">
            <div style="position:relative; flex-shrink:0; line-height:0;">
                <img src="${setIconUrl}" style="width:60px; height:60px; border-radius:6px; background:rgba(0,0,0,0.1); object-fit:cover; ${adv.status === 'forcing' ? 'filter: grayscale(100%) opacity(0.5);' : ''}" alt="">
                ${adv.status === 'forcing' ? `<i class="fa-solid fa-link-slash" style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); color:#ef4444; font-size:18px; text-shadow:0 0 4px rgba(0,0,0,0.8);"></i>` : ''}
            </div>
            <div style="flex: 1; width: 100%; position: relative;">
                <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--text-grey); margin-bottom: 6px;">
                    <span>${t('analysis.offPiece.setAvg')}</span>
                    <span style="color: ${color}; font-weight: bold; font-size: 12px;">${adv.targetSet.avgScore.toFixed(1)} <span style="font-weight:normal; font-size:10px; color:var(--text-grey);">/ 25.0</span></span>
                </div>
                <div style="width: 100%; height: 16px; background: rgba(0,0,0,0.2); border-radius: 4px; overflow: hidden; position: relative;">
                    <div style="
                        width: ${scorePct}%;
                        height: 100%;
                        background: ${color};
                        opacity: 0.85;
                        transition: width 0.5s ease-out;
                    "></div>
                </div>
                <div style="
                    position: absolute;
                    left: ${thresholdPct}%;
                    top: 18px;
                    width: 2px;
                    height: 24px;
                    background: var(--text-always-white);
                    box-shadow: 0 0 5px rgba(0,0,0,0.8);
                    z-index: 2;
                ">
                    <div style="position: absolute; top: -5px; left: -3px; width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 4px solid var(--text-always-white);"></div>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 10px; color: var(--text-grey); margin-top: 4px;">
                    <span>0</span>
                    <span style="color:var(--text-always-white); font-weight:bold;">25.0</span>
                    <span>45</span>
                </div>
            </div>
        </div>
    `;
            }
            else {
                const setIconsHtml = adv.activeSets.map(set => {
                    return `<img src="${getSetIcon(set.hash)}" style="width:60px; height:60px; border-radius:6px; background:rgba(0,0,0,0.1); object-fit:cover;" alt="">`;
                }).join('');

                bottomHtml = `
        <div style="display:flex; align-items:center; gap: 12px; width: 100%;">
            ${adv.activeSets.length === 0
                    ? `<img src="${ICON_BASE_PATH}icon_score.webp" style="width:60px; height:60px; border-radius:6px; background:rgba(0,0,0,0.1); object-fit:cover; opacity:0.5;" alt="">`
                    : setIconsHtml
                }
            <div style="flex: 1; padding-left: 4px;">
                <p style="font-size: 11px; color: var(--text-grey); font-style: italic; margin:0; line-height:1.4;">
                    ${adv.status === '2p2p' ? t('advice.setForce.ok2p2p') : t('advice.setForce.okRainbow')}
                </p>
            </div>
        </div>
    `;
            }

            return `
<div style="background:var(--bg-panel); padding:15px; border-radius:8px; border-left:3px solid ${color}; display:flex; flex-direction:column; justify-content:space-between; min-height:165px; box-sizing:border-box;">
    <div>
        <p style="font-size: 12px; color: var(--text-grey); text-transform: uppercase; margin-bottom: 12px;">${adv.title}</p>
        <p style="font-size: 14px; color:var(--text-primary); line-height:1.4; margin:0;">${adv.msg}</p>
    </div>
    
    <div style="margin-top: auto; padding-top: 16px;">
        ${bottomHtml}
    </div>
</div>`;
        })()}
                        
                                ${(() => {
                                            if (!p.artefacts || p.artefacts.length === 0) return '';
                                
                                            let contentHtml = '';
                                
                                            if (!priorities || priorities.length === 0) {
                                                contentHtml = `<p style="color:#22c55e; font-size: 13px;">${t('analysis.s3.noPriority')}</p>`;
                                            } else {
                                                const avgScore = p.artefacts.reduce((sum, art) => sum + art.score, 0) / Math.max(p.artefacts.length, 1);
                                                const maxScale = Math.max(...p.artefacts.map(a => a.score), 50);
                                
                                                contentHtml = priorities.map((prio, i) => {
                                                    const difficulty = getFarmDifficulty(prio.type, prio.mainKey);
                                                    const estimate = getResinCostEstimate(prio.type, prio.mainKey, prio.score);
                                
                                                    const rates = MAINSTAT_DROP_RATES[prio.type];
                                                    const dropRate = rates && rates[prio.mainKey] ? rates[prio.mainKey] : null;
                                                    const tooltipDifficulty = dropRate
                                                        ? t('analysis.top3.tooltip.dropRate', dropRate).replace(/'/g, "\\'")
                                                        : t('analysis.top3.tooltip.fixed').replace(/'/g, "\\'");
                                                    const tooltipResin = t('analysis.top3.tooltip.resin').replace(/'/g, "\\'");
                                
                                                    const pct = Math.min((prio.score / maxScale) * 100, 100);
                                                    const avgPct = Math.min((avgScore / maxScale) * 100, 100);
                                
                                                    return `
                                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; padding-bottom:14px; border-bottom:1px dashed rgba(255,255,255,0.05); width:100%;">
                                                    
                                                    <div style="display:flex; flex-direction:column; flex:1; min-width:0; gap:4px;">
                                                        
                                                        <div style="display:flex; align-items:center; gap:8px;">
                                                            <p style="font-size: 14px; font-weight:600; color:var(--text-primary);">${i + 1}. ${prio.piece}</p>
                                                            ${prio.isOffPiece ? `<span style="font-size:9px; color:#22c55e; background:rgba(34, 197, 94, 0.15); border: 1px solid rgba(34, 197, 94, 0.3); padding:2px 5px; border-radius:4px; text-transform:uppercase;">${t('ui.art.offPiece')}</span>` : ''}
                                                        </div>
                                                        
                                                        <div style="display:flex; align-items:center; gap:5px;">
                                                            <p style="font-size:11px; color:var(--text-grey); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${prio.setName} • </p>
                                                            <img src="${ICON_BASE_PATH}${ICON_MAP[prio.mainKey] || ICON_MAP['unknown']}" style="width:13px; height:13px; flex-shrink:0;" alt="${prio.mainKey}">
                                                            <p style="font-size:11px; color:var(--text-primary); font-weight:500; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${prio.mainLabel}</p>
                                                        </div>
                                                        
                                                        <div style="display:flex; align-items:center; gap: 8px;">
                                                            <span style="font-size:10px; font-weight:600; padding:2px 6px; border-radius:4px; background:${difficulty.color}15; color:${difficulty.color}; border: 1px solid ${difficulty.color}30; cursor:pointer;"
                                                                  onmouseenter="showGlobalTooltip(this, '${tooltipDifficulty}', '${difficulty.color}')"
                                                                  onmouseleave="hideGlobalTooltip()">${difficulty.label}</span>
                                                            
                                                            <p style="font-size:11px; color:var(--text-grey); cursor:pointer;"
                                                               onmouseenter="showGlobalTooltip(this, '${tooltipResin}', 'rgba(255,255,255,0.4)')"
                                                               onmouseleave="hideGlobalTooltip()">
                                                                <span style="color:var(--text-primary);">${t('analysis.s3.resinEst', estimate.resin, estimate.days)}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    
                                                    <div style="flex:0 0 240px; margin: 0 24px; display:flex; flex-direction:column; gap:4px;">
                                                        <div style="display: flex; justify-content: space-between; font-size: 10px; color: var(--text-grey);">
                                                            <span>${t('analysis.top3.thisPiece')} : <strong style="color: ${prio.color};">${prio.score}</strong></span>
                                                            <span>${t('analysis.top3.globalAvg')} : <strong style="color: var(--text-always-white);">${avgScore.toFixed(1)}</strong></span>
                                                        </div>
                                                        <div style="width: 100%; height: 6px; background: #222; border-radius: 3px; position: relative;">
                                                            <div style="position: absolute; left: 0; top: 0; bottom: 0; width: ${pct}%; background: ${prio.color}; opacity: 0.85; border-radius: 3px;"></div>
                                                            <div style="position: absolute; left: ${avgPct}%; top: -3px; bottom: -3px; width: 2px; background: var(--text-always-white); box-shadow: 0 0 4px rgba(0,0,0,0.8); z-index: 2;">
                                                                <div style="position: absolute; top: -4px; left: -3px; width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 4px solid var(--text-always-white);"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div style="text-align:right; min-width:90px; flex-shrink:0; display:flex; flex-direction:column; justify-content:center; align-items:flex-end;">
                                                        <p style="color:${prio.color}; font-size:16px; font-weight:bold; line-height:1.2;">
                                                            ${prio.score} <span style="font-size:12px; font-weight:normal; opacity:0.8;">(${prio.grade})</span>
                                                        </p>
                                                    </div>
                                                    
                                                </div>
                                            `;
                                                }).join('');
                                            }
                                
                                            return `
                                    <div style="background:var(--bg-panel); padding:15px; border-radius:8px; grid-column: 1 / -1;">
                                        <p style="font-size:12px; color:var(--text-grey); text-transform:uppercase; margin-bottom:16px;">${t('analysis.s3.top3')}</p>
                                        ${contentHtml}
                                    </div>`;
                                        })()}                        
                            </div>
                            
                            ${(() => {
            const SLOT_ORDER_WTL = ["EQUIP_BRACER", "EQUIP_NECKLACE", "EQUIP_SHOES", "EQUIP_RING", "EQUIP_DRESS"];
            const FIXED_MAIN = {
                "EQUIP_BRACER":   { key: "hp",  get label() { return t('stat.hp'); } },
                "EQUIP_NECKLACE": { key: "atk", get label() { return t('stat.atk'); } }
            };

            const VALID_SUBSTATS = ["critRate_", "critDMG_", "atk_", "atk", "hp_", "hp", "def_", "def", "eleMas", "enerRech_"];

            let targetSets = [];
            if (config.bestSets && config.bestSets.length > 0) {
                const parts1 = config.bestSets[0].split(":");
                targetSets.push({ key: parts1[0], count: parseInt(parts1[1]) || 4 });

                if (targetSets[0].count === 2 && config.bestSets.length > 1) {
                    const parts2 = config.bestSets[1].split(":");
                    if (parts2[1] === "2") {
                        targetSets.push({ key: parts2[0], count: 2 });
                    }
                }
            }

            const slotSetMap = {};
            if (targetSets.length === 1 && targetSets[0].count >= 4) {
                slotSetMap["EQUIP_BRACER"] = targetSets[0].key;
                slotSetMap["EQUIP_NECKLACE"] = targetSets[0].key;
                slotSetMap["EQUIP_SHOES"] = targetSets[0].key;
                slotSetMap["EQUIP_DRESS"] = targetSets[0].key;
                slotSetMap["EQUIP_RING"] = "Hors-Set";
            } else if (targetSets.length === 2 && targetSets[0].count === 2 && targetSets[1].count === 2) {
                slotSetMap["EQUIP_BRACER"] = targetSets[0].key;
                slotSetMap["EQUIP_NECKLACE"] = targetSets[0].key;
                slotSetMap["EQUIP_SHOES"] = targetSets[1].key;
                slotSetMap["EQUIP_DRESS"] = targetSets[1].key;
                slotSetMap["EQUIP_RING"] = "Hors-Set";
            } else {
                SLOT_ORDER_WTL.forEach(s => slotSetMap[s] = (s === "EQUIP_RING" ? "Hors-Set" : (targetSets[0]?.key || "Au choix")));
            }

            function getSetNameFR(setKey) {
                if (setKey === "Hors-Set") return t('wtl.offSetPiece');
                if (setKey === "Au choix") return t('wtl.anySet');
                const hash = Object.keys(window.HASH_TO_KEY || {}).find(h => window.HASH_TO_KEY[h] === setKey);
                return hash ? getText(hash) : setKey;
            }

            function getArtifactIcon(setKey, setNameFR, slotType) {
                if (setKey === "Au choix") return ICON_BASE_PATH + "icon_unknown.webp";

                let lookupSetKey = setKey;
                let lookupNameFR = setNameFR;
                if (setKey === "Hors-Set") {
                    lookupSetKey = "GladiatorsFinale";
                    lookupNameFR = Object.keys(SET_NAME_MAPPING).find(k => SET_NAME_MAPPING[k] === "GladiatorsFinale") || "Rideau du Gladiateur";
                }

                let targetHash = Object.keys(window.HASH_TO_KEY || {}).find(hash => window.HASH_TO_KEY[hash] === lookupSetKey);

                let baseIconStr = null;
                if (targetHash && window.iconToNameHash) {
                    for (const [icon, hash] of Object.entries(window.iconToNameHash)) {
                        if (String(hash) === String(targetHash)) {
                            baseIconStr = icon.substring(0, icon.lastIndexOf('_'));
                            break;
                        }
                    }
                }

                if (baseIconStr) {
                    const pieceMap = {
                        "EQUIP_BRACER": "4",
                        "EQUIP_NECKLACE": "2",
                        "EQUIP_SHOES": "5",
                        "EQUIP_RING": "1",
                        "EQUIP_DRESS": "3"
                    };
                    return `https://enka.network/ui/${baseIconStr}_${pieceMap[slotType]}.png`;
                }

                for (const char of globalPersoData) {
                    const found = char.artefacts.find(a => a.setKey === lookupSetKey && a.type === slotType);
                    if (found) return found.icon;
                }
                return ICON_BASE_PATH + "icon_unknown.webp";
            }

            const cards = SLOT_ORDER_WTL.map(slotType => {
                const pieceName = ARTIFACT_TYPE_MAPPING[slotType] || slotType;
                const targetSetKey = slotSetMap[slotType];
                const setNameFR = getSetNameFR(targetSetKey);
                const iconUrl = getArtifactIcon(targetSetKey, setNameFR, slotType);

                let mainStats;
                let isFixedSlot = false;
                if (FIXED_MAIN[slotType]) {
                    mainStats = [FIXED_MAIN[slotType]];
                    isFixedSlot = true;
                } else {
                    const ideal = (config.idealMainStats && config.idealMainStats[slotType]) || [];
                    if (ideal.length > 0) {
                        mainStats = ideal.map(k => ({ key: k, label: STAT_LABELS[k] || k }));
                    } else {
                        const possible = SLOT_POSSIBLE_MAIN_STATS[slotType] || [];
                        const best = possible
                            .map(k => ({ key: k, w: config.weights[k] || (k.includes("_dmg_") ? (config.weights["elemental_dmg_"] || 0) : 0) }))
                            .sort((a, b) => b.w - a.w)[0];
                        mainStats = best ? [{ key: best.key, label: STAT_LABELS[best.key] || best.key }] : [{ key: "unknown", label: t('wtl.anyChoice') }];                    }
                }

                const hasSingleMainStatTarget = isFixedSlot || mainStats.length === 1;
                const overlapKeys = hasSingleMainStatTarget
                    ? []
                    : mainStats.map(m => m.key).filter(k => VALID_SUBSTATS.includes(k) && config.weights[k] > 0);

                const excludedKeys = new Set(hasSingleMainStatTarget ? mainStats.map(m => m.key) : overlapKeys);

                const pureSubs = VALID_SUBSTATS
                    .map(k => ({ key: k, w: config.weights[k] || 0, label: STAT_LABELS[k] || k }))
                    .filter(s => s.w > 0 && !excludedKeys.has(s.key))
                    .sort((a, b) => b.w - a.w);

                const subSlots = [];
                let slotsUsed = 0;

                if (overlapKeys.length >= 2) {
                    if (overlapKeys.length === 2) {
                        subSlots.push({
                            type: 'or',
                            keys: overlapKeys.map(k => ({ key: k, label: STAT_LABELS[k] || k }))
                        });
                        slotsUsed += 1;
                    } else {
                        const countRequired = overlapKeys.length - 1;
                        subSlots.push({
                            type: 'pool',
                            count: countRequired,
                            keys: overlapKeys.map(k => ({ key: k, label: STAT_LABELS[k] || k }))
                        });
                        slotsUsed += countRequired;
                    }

                    while (slotsUsed < 4 && pureSubs.length > 0) {
                        const sub = pureSubs.shift();
                        subSlots.push({ type: 'normal', key: sub.key, label: sub.label });
                        slotsUsed += 1;
                    }
                }
                else if (overlapKeys.length === 1) {
                    const conditionalKey = overlapKeys[0];
                    const slotsLeft = 4 - slotsUsed;

                    for (let i = 0; i < slotsLeft - 1; i++) {
                        if (pureSubs.length > 0) {
                            const sub = pureSubs.shift();
                            subSlots.push({ type: 'normal', key: sub.key, label: sub.label });
                            slotsUsed += 1;
                        }
                    }

                    if (pureSubs.length > 0) {
                        const fallbackSub = pureSubs.shift();
                        subSlots.push({
                            type: 'or',
                            keys: [
                                { key: conditionalKey, label: STAT_LABELS[conditionalKey] || conditionalKey },
                                { key: fallbackSub.key, label: fallbackSub.label }
                            ]
                        });
                        slotsUsed += 1;
                    } else {
                        subSlots.push({
                            type: 'or_any',
                            key1: { key: conditionalKey, label: STAT_LABELS[conditionalKey] || conditionalKey }
                        });
                        slotsUsed += 1;
                    }
                }
                else if (overlapKeys.length === 0) {
                    while (slotsUsed < 4 && pureSubs.length > 0) {
                        const sub = pureSubs.shift();
                        subSlots.push({ type: 'normal', key: sub.key, label: sub.label });
                        slotsUsed += 1;
                    }
                }

                while (slotsUsed < 4) {
                    subSlots.push({ type: 'any', label: t('wtl.anyChoice') });
                    slotsUsed += 1;
                }

                return { slotType, pieceName, targetSetKey, setNameFR, iconUrl, mainStats, subSlots };
            });

            const cardHtml = cards.map(card => {
                const isOffSet = card.targetSetKey === 'Hors-Set';

                const mainHtml = card.mainStats.map((m, idx) => {
                    if (idx === 0) {
                        return `
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <div style="display:flex; flex-direction:row; align-items:center; gap:5px;">
                        <img src="${ICON_BASE_PATH}${ICON_MAP[m.key] || ICON_MAP['unknown']}" style="width:15px; height:15px;" alt="">
                        <p style="font-size:11px; color: var(--text-primary); font-weight:bold;">${m.label}</p>
                    </div>
                </div>`;
                    } else {
                        return `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:3px;">
                    <div style="display:flex; flex-direction:row; align-items:center; gap:4px;">
                        <span style="color:var(--text-grey); font-size:10px; padding-left:2px;">↳ ${t('wtl.or')}</span>
                        <img src="${ICON_BASE_PATH}${ICON_MAP[m.key] || ICON_MAP['unknown']}" style="width:15px; height:15px; flex-shrink:0;" alt="">
                        <p style="font-size:11px; color: var(--text-primary);">${m.label}</p>
                    </div>
                </div>`;
                    }
                }).join('');

                const subHtml = card.subSlots.map((sub, idx) => {
                    const divider = idx < card.subSlots.length - 1 ? 'margin-bottom: 12px;' : '';

                    if (sub.type === 'or') {
                        const html = sub.keys.map((k, kIdx) => {
                            if (kIdx === 0) {
                                return `
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <div style="display:flex; flex-direction:row; align-items:center; gap:5px;">
                                <img src="${ICON_BASE_PATH}${ICON_MAP[k.key] || ICON_MAP['unknown']}" style="width:15px; height:15px;" alt="">
                                <p style="font-size:11px; color: var(--text-primary);">${k.label}</p>
                            </div>
                        </div>`;
                            } else {
                                return `
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:3px;">
                            <div style="display:flex; flex-direction:row; align-items:center; gap:4px;">
                                <span style="color:var(--text-grey); font-size:10px; padding-left:2px;">↳ ${t('wtl.or')}</span>
                                <img src="${ICON_BASE_PATH}${ICON_MAP[k.key] || ICON_MAP['unknown']}" style="width:15px; height:15px; flex-shrink:0;" alt="">
                                <p style="font-size:11px; color: var(--text-primary);">${k.label}</p>
                            </div>
                        </div>`;
                            }
                        }).join('');
                        return `<div style="${divider}">${html}</div>`;
                    }

                    if (sub.type === 'or_any') {
                        return `
                <div style="${divider}">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <div style="display:flex; flex-direction:row; align-items:center; gap:5px;">
                            <img src="${ICON_BASE_PATH}${ICON_MAP[sub.key1.key] || ICON_MAP['unknown']}" style="width:15px; height:15px;" alt="">
                            <p style="font-size:11px; color:var(--text-primary);">${sub.key1.label}</p>
                        </div>
                    </div>
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:3px;">
                        <div style="display:flex; flex-direction:row; align-items:center; gap:4px; opacity:0.6;">
                            <span style="color:var(--text-grey); font-size:10px; padding-left:2px;">↳ ${t('wtl.or')}</span>
                            <div style="width:15px; height:15px; border-radius:3px; border:1px dashed rgba(255,255,255,0.3); flex-shrink:0;"></div>
                            <p style="font-size:11px; font-style:italic;">${t('wtl.anyChoice')}</p>                        </div>
                    </div>
                </div>`;
                    }

                    if (sub.type === 'pool') {
                        return `
                <div style="${divider}">
                    <p style="font-size:10px; color:#c8a96e; margin-bottom:5px;">${t('wtl.chooseAmong', sub.count)}</p>
                    <div style="display:flex; flex-wrap:wrap; gap:4px; align-items:center;">
                        ${sub.keys.map(k => `
                            <div style="display:flex; align-items:center; gap:3px; background:rgba(255,255,255,0.05); padding:2px 4px; border-radius:4px; border:1px solid rgba(255,255,255,0.1);">
                                <img src="${ICON_BASE_PATH}${ICON_MAP[k.key] || ICON_MAP['unknown']}" style="width:12px; height:12px;" alt="">
                                <span style="font-size:10px; color:#ddd;">${k.label}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>`;
                    }

                    if (sub.type === 'any') {
                        return `
                <div style="${divider}">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <div style="display:flex; flex-direction:row; align-items:center; gap:5px; opacity:0.4;">
                            <div style="width:15px; height:15px; border-radius:3px; border:1px solid rgba(255,255,255,0.3); flex-shrink:0;"></div>
                            <p style="font-size:11px; font-style:italic;">${t('wtl.anyChoice')}</p>                        </div>
                    </div>
                </div>`;
                    }

                    return `
            <div style="${divider}">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <div style="display:flex; flex-direction:row; align-items:center; gap:5px;">
                        <img src="${ICON_BASE_PATH}${ICON_MAP[sub.key] || ICON_MAP['unknown']}" style="width:15px; height:15px;" alt="">
                        <p style="font-size:11px; color:var(--text-primary);">${sub.label}</p>
                    </div>
                </div>
            </div>`;
                }).join('');

                return `
        <div style="flex:1; min-width:0; background:var(--bg-panel); padding:10px 12px; border-radius:8px; box-sizing:border-box; display:flex; flex-direction:column; gap:0;">
            
            <div style="display:flex; align-items:center; gap:10px; padding-bottom:8px; border-bottom:1px solid rgba(255,255,255,0.1);">
                <div style="position:relative; display:inline-block; flex-shrink:0;">
                    <img src="${card.iconUrl}" style="width:38px; height:38px; border-radius:8px; border:2px solid ${isOffSet ? '#FFB13B' : '#FFB13B'};" alt="">
                    <p style="position:absolute; bottom:7px; right:1px; background:rgba(0,0,0,0.4); color:rgba(255,255,255,0.8); font-size:10px; padding:1px 4px; border-radius:8px;">+20</p>
                </div>
                <div style="overflow:hidden; display:flex; flex-direction:column; justify-content:center; gap:1px; min-width:0;">
                    <p style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-size:12px; font-weight:bold;">${card.pieceName}</p>
                    <p style="font-size:11px; color:${isOffSet ? 'var(--accent-gold)' : 'var(--accent-gold)'}; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${card.setNameFR}</p>
                    <p style="font-size:10px; color:rgba(255,255,255,0.4);">5★</p>
                </div>
            </div>

            <div style="display:flex; flex-direction:column; padding-top:12px; gap:0;">
                <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 12px; margin-bottom: 12px;">
                    ${mainHtml}
                </div>

                <div>
                    <div style="display:flex; flex-direction:column; gap:0;">
                        ${subHtml}
                    </div>
                </div>
            </div>
            
        </div>`;
            }).join('');

            return `
            <div style="margin-top:24px;">
                <p style="font-size:12px; color:var(--text-grey); text-transform:uppercase; margin-bottom:12px; letter-spacing:0.05em;">${t('analysis.s3.p2.title')}</p>
                <div style="display:flex; flex-direction:row; justify-content:space-between; gap:15px;">
                    ${cardHtml}
                </div>
            </div>`;
        })()}
                            ${(() => {
            const crossChecks = getAllCrossCheckAdvice(index);
            const hasAnySwap = crossChecks.some(s => s !== null);
            if (!hasAnySwap) return '';

            const SLOT_NAMES = [
                t('artifact.EQUIP_BRACER'),
                t('artifact.EQUIP_NECKLACE'),
                t('artifact.EQUIP_SHOES'),
                t('artifact.EQUIP_RING'),
                t('artifact.EQUIP_DRESS')
            ];

            const cards = crossChecks.map((swap, idx) => {
                if (!swap) {
                    return `
        <div style="flex: 1; min-width: 200px; background:var(--bg-panel); border-radius:8px; padding:11px; display:flex; flex-direction:column; gap:9px; border-top:2px solid #3a3b42; box-sizing:border-box; opacity:0.4; align-items:center; justify-content:center; min-height:160px;">
            <div style="font-size:22px; color:#444;">✗</div>
            <p style="font-size:11px; color:#888; text-align:center; line-height:1.5;">${t('analysis.s3.noSwapOn', SLOT_NAMES[idx])}</p>
        </div>`;
                }

                const deltasHtml = swap.deltas.map(d => `
    <div style="display:flex; align-items:center; gap:5px; font-size:11px; color:${d.delta > 0 ? '#4ade80' : '#f87171'};">
        <div style="width:6px; height:6px; border-radius:50%; flex-shrink:0; background:${d.delta > 0 ? '#4ade80' : '#f87171'};"></div>
        ${d.formatted}
    </div>`).join('');

                const scoreDiff = Math.round(swap.currEvalNew.score - swap.currEvalOld.score);

                return `
    <div style="flex: 1; min-width: 200px; background:var(--bg-panel); border-radius:8px; padding:11px; display:flex; flex-direction:column; gap:9px; border-top:2px solid var(--accent-gold); box-sizing:border-box;">
        <div style="display:flex; align-items:center; justify-content:space-between; gap:6px;">
            <div style="position:relative; flex-shrink:0;">
                <img src="${swap.currArt.icon}" style="width:52px; height:52px; border-radius: 8px; background-color: rgba(0, 0, 0, 0.1);">
                <img src="${swap.currCharIcon}" style="position:absolute; bottom:-4px; right:-4px; width:30px; height:30px; border-radius:50%; border:1.5px solid var(--bg-panel);">
            </div>
            <span style="color:var(--accent-gold); font-size:16px;">⇒</span>
            <div style="position:relative; flex-shrink:0;">
                <img src="${swap.newArt.icon}" style="width:52px; height:52px; border-radius: 8px; background-color: rgba(0, 0, 0, 0.1);">
                <img src="${swap.otherCharIcon}" style="position:absolute; bottom:-4px; right:-4px; width:30px; height:30px; border-radius:50%; border:1.5px solid var(--bg-panel);">
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

            const warningHtml = `
            <div style="grid-column:1/-1; display:flex; flex-direction:column; gap:12px; margin-top: 24px; margin-bottom: 20px;">
                <p style="font-size:12px; color:var(--text-grey); text-transform:uppercase; letter-spacing:0.05em; margin:0;">${t('analysis.s3.p3.title')}</p>
                <p style="font-size: 14px; color:#ccc; line-height: 1.5;">${t('analysis.s3.swap.desc')}</p>
            </div>`;

            return warningHtml + `<div style="grid-column:1/-1; width:100%; box-sizing:border-box; display:flex; flex-wrap:nowrap; gap:20px; overflow-x:auto;">${cards.join('')}</div>`;

            return `<div style="grid-column:1/-1; width:100%; box-sizing:border-box; display:flex; flex-wrap:nowrap; gap:20px; overflow-x:auto;">${cards.join('')}</div>`;
        })()}
                        </div>
                        
                        <div style="margin: auto 10px; flex-grow: 1; width: unset; min-width: unset; background: none; border-color: var(--dotted-line); border-style: dashed; border-width: 1px 0 0; display: flex; clear: both;"></div>

                        <div>
                            <h3 style="color:var(--text-primary); font-size:24px; margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
                                <svg width="1em" height="1em" fill="var(--text-always-white)" aria-hidden="true" style="margin-bottom: 4px;" viewBox="0 0 575 754" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_976_885)">
                                        <path d="M125.071 372.717C124.831 372.724 124.614 372.614 124.473 372.438C124.574 372.564 124.713 372.656 124.873 372.695C124.937 372.711 125.004 372.718 125.072 372.716L125.071 372.717ZM130.075 370.989H130.076H130.075ZM226.203 197.79C243.023 209.163 265.451 223.427 274.471 229.129C257.721 276.408 224.044 309.537 192.34 331.582C167.801 348.644 144.675 358.902 132.068 363.817C132.845 359.091 133.523 353.791 134.178 348.208C135.34 338.293 136.448 327.366 137.935 316.153C140.937 293.504 145.293 271.548 153.537 258.106L153.536 258.105C156.344 253.531 161.866 247.652 169.155 241.107C176.336 234.66 184.83 227.917 193.195 221.61C201.549 215.312 209.701 209.504 216.184 204.917C220.157 202.105 223.686 199.626 226.203 197.79ZM130.44 327.905C129.891 332.644 129.382 337.272 128.884 341.696C129.382 337.272 129.891 332.645 130.44 327.906V327.905ZM216.128 320.904V320.903V320.904ZM133.505 304.792L133.506 304.791L133.505 304.792ZM136.558 288.196C135.972 290.89 135.43 293.632 134.923 296.403L134.549 298.488C135.038 295.703 135.561 292.942 136.126 290.226L136.558 288.196ZM246.196 290.59V290.591V290.59ZM142.825 266.522C140.948 271.361 139.342 276.652 137.95 282.223L137.469 284.193C138.969 277.899 140.727 271.928 142.825 266.522ZM155.257 246.276C152.407 249.362 150.067 252.291 148.423 254.97C146.369 258.319 144.552 262.113 142.935 266.241C144.551 262.113 146.369 258.319 148.423 254.97C150.067 252.291 152.407 249.362 155.257 246.276ZM165.147 236.643C162.847 238.708 160.672 240.749 158.669 242.743C160.672 240.749 162.847 238.708 165.147 236.643ZM166.542 235.401C168.891 233.327 171.356 231.233 173.892 229.142C171.863 230.814 169.88 232.489 167.965 234.154L166.542 235.401ZM186.416 219.226C190.646 215.991 194.869 212.859 198.896 209.923C194.869 212.859 190.646 215.991 186.416 219.226ZM226.1 190.577C226.18 190.584 226.259 190.605 226.334 190.639C226.259 190.605 226.18 190.584 226.1 190.577Z"/>
                                        <path d="M244.871 607.07C244.538 610.565 244.519 613.405 244.59 615.428L244.632 616.37C244.52 614.334 244.483 611.147 244.871 607.07ZM242.656 616.121C242.709 616.179 242.76 616.237 242.812 616.295C242.76 616.237 242.709 616.179 242.656 616.121ZM241.987 615.414C242.031 615.459 242.075 615.504 242.118 615.549C242.075 615.504 242.031 615.459 241.987 615.414ZM241.608 615.034C241.685 615.109 241.761 615.185 241.836 615.261C241.761 615.185 241.685 615.109 241.608 615.034ZM241.263 614.699C241.35 614.782 241.436 614.866 241.521 614.949C241.436 614.866 241.35 614.782 241.263 614.699ZM240.887 614.349C240.962 614.418 241.038 614.488 241.112 614.558C241.038 614.488 240.962 614.418 240.887 614.349ZM240.573 614.065C240.622 614.109 240.67 614.153 240.719 614.196C240.67 614.153 240.622 614.109 240.573 614.065ZM240.139 613.685C240.211 613.746 240.282 613.808 240.354 613.87C240.282 613.808 240.211 613.746 240.139 613.685ZM239.833 613.427C239.89 613.475 239.947 613.522 240.004 613.57C239.947 613.522 239.89 613.475 239.833 613.427ZM239.069 612.808C239.112 612.841 239.156 612.874 239.198 612.908C239.156 612.874 239.112 612.841 239.069 612.808ZM236.462 610.949C236.634 611.061 236.806 611.175 236.976 611.289C236.806 611.175 236.634 611.061 236.462 610.949ZM235.604 610.407C235.772 610.51 235.938 610.614 236.104 610.719C235.938 610.614 235.772 610.51 235.604 610.407ZM234.67 609.851C234.852 609.956 235.034 610.061 235.214 610.169C235.034 610.061 234.852 609.956 234.67 609.851ZM233.759 609.338C233.947 609.441 234.135 609.544 234.321 609.649C234.135 609.544 233.947 609.441 233.759 609.338ZM232.827 608.842C233.015 608.939 233.203 609.037 233.39 609.137C233.203 609.037 233.015 608.939 232.827 608.842ZM229.561 607.291C230.546 607.718 231.514 608.171 232.459 608.65C231.514 608.171 230.546 607.718 229.561 607.291ZM228.566 606.872C228.82 606.976 229.072 607.083 229.323 607.19C229.072 607.083 228.82 606.976 228.566 606.872ZM227.612 606.489C227.793 606.56 227.973 606.634 228.153 606.706C227.973 606.634 227.793 606.56 227.612 606.489ZM226.562 606.089C226.747 606.158 226.931 606.229 227.115 606.299C226.931 606.229 226.747 606.158 226.562 606.089ZM225.574 605.731C225.761 605.798 225.948 605.865 226.134 605.933C225.948 605.865 225.761 605.798 225.574 605.731ZM224.572 605.386C224.733 605.44 224.893 605.496 225.054 605.551C224.893 605.496 224.733 605.44 224.572 605.386ZM127.313 388.018C245.258 428.408 271.118 520.604 275.125 538.702C247.969 564.151 240.689 589.971 239.008 605.456C231.163 600.567 221.704 597.934 213.772 596.445C203.677 594.551 194.747 594.287 191.654 594.254C139.359 574.595 107.327 535.536 88.0312 499.538C72.4276 470.428 65.3075 443.59 62.6191 431.342C90.4014 430.737 106.895 421.412 116.451 410.165C123.142 402.29 126.048 393.915 127.313 388.018ZM223.537 605.046C223.704 605.099 223.871 605.153 224.038 605.208C223.871 605.153 223.704 605.099 223.537 605.046ZM222.479 604.717C222.649 604.769 222.82 604.821 222.99 604.874C222.82 604.821 222.649 604.769 222.479 604.717ZM221.375 604.39C221.596 604.453 221.817 604.518 222.037 604.584C221.817 604.518 221.596 604.453 221.375 604.39ZM220.447 604.128C220.632 604.179 220.816 604.23 221 604.282C220.816 604.23 220.632 604.179 220.447 604.128ZM219.562 603.89C219.655 603.914 219.747 603.938 219.84 603.963C219.747 603.938 219.655 603.914 219.562 603.89ZM218.358 603.58C218.513 603.619 218.668 603.657 218.822 603.696C218.668 603.657 218.513 603.619 218.358 603.58ZM217.245 603.311C217.459 603.361 217.673 603.412 217.887 603.464C217.673 603.412 217.459 603.361 217.245 603.311ZM216.282 603.088C216.449 603.125 216.615 603.163 216.782 603.201C216.615 603.163 216.449 603.125 216.282 603.088ZM212.699 602.349C212.846 602.376 212.992 602.405 213.139 602.434C212.992 602.405 212.846 602.376 212.699 602.349ZM211.652 602.157C211.942 602.209 212.233 602.262 212.525 602.316C212.233 602.262 211.942 602.209 211.652 602.157ZM210.652 601.984C210.944 602.034 211.238 602.084 211.532 602.136C211.238 602.084 210.944 602.034 210.652 601.984ZM209.719 601.83C209.967 601.87 210.216 601.911 210.466 601.953C210.216 601.911 209.967 601.87 209.719 601.83ZM208.912 601.704C208.985 601.715 209.058 601.727 209.131 601.738C209.058 601.727 208.985 601.715 208.912 601.704ZM206.901 601.414C207.021 601.43 207.141 601.446 207.261 601.463C207.141 601.446 207.021 601.43 206.901 601.414ZM246.242 598.172C246.088 598.902 245.947 599.618 245.818 600.318C245.947 599.618 246.088 598.902 246.242 598.172ZM205.003 601.171C205.36 601.214 205.721 601.26 206.086 601.308C205.721 601.26 205.36 601.214 205.003 601.171ZM203.129 600.959C203.478 600.996 203.832 601.035 204.19 601.076C203.832 601.035 203.478 600.996 203.129 600.959ZM201.476 600.795C201.809 600.826 202.148 600.859 202.492 600.894C202.148 600.859 201.809 600.826 201.476 600.795ZM199.823 600.651C200.134 600.676 200.451 600.702 200.773 600.73C200.451 600.702 200.134 600.676 199.823 600.651ZM198.354 600.541C198.621 600.56 198.893 600.579 199.171 600.6C198.893 600.579 198.621 600.56 198.354 600.541ZM196.941 600.45C197.182 600.464 197.429 600.479 197.681 600.495C197.429 600.479 197.182 600.464 196.941 600.45ZM195.59 600.378C195.823 600.389 196.063 600.401 196.31 600.414C196.063 600.401 195.823 600.389 195.59 600.378ZM193.272 600.287C193.818 600.303 194.437 600.325 195.121 600.355C194.437 600.325 193.818 600.303 193.272 600.287ZM191.518 600.253C191.909 600.257 192.414 600.265 193.019 600.28C192.414 600.265 191.909 600.257 191.518 600.253ZM251.225 582.258C250.668 583.594 250.157 584.909 249.687 586.198C250 585.339 250.331 584.468 250.683 583.587L251.225 582.258ZM137.58 570.114C138.121 570.552 138.666 570.987 139.214 571.421C138.98 571.236 138.746 571.051 138.514 570.865L137.58 570.114ZM266.841 556.361H266.84H266.841ZM113.221 546.662C113.685 547.19 114.153 547.717 114.625 548.242C114.153 547.717 113.685 547.19 113.221 546.662ZM279.69 542.648H279.691H279.69ZM104.286 535.814C104.976 536.71 105.677 537.602 106.386 538.492C105.677 537.602 104.976 536.71 104.286 535.814ZM279.14 530.146V530.146V530.146ZM86.8906 509.81C87.4121 510.71 87.9418 511.611 88.4795 512.513C87.9418 511.611 87.4121 510.71 86.8906 509.81ZM254.771 476.988C255.777 478.553 256.746 480.108 257.681 481.648C256.746 480.108 255.777 478.553 254.771 476.988ZM72.7178 481.561C73.1788 482.63 73.651 483.707 74.1348 484.792C73.651 483.707 73.1788 482.63 72.7178 481.561ZM70.1328 475.365C70.2138 475.566 70.2961 475.767 70.3779 475.969C70.2961 475.767 70.2138 475.566 70.1328 475.365ZM65.5146 463.104C66.1962 465.047 66.9195 467.04 67.6855 469.078C66.9195 467.04 66.1962 465.047 65.5146 463.104ZM60.0586 445.792C60.8343 448.567 61.7223 451.569 62.7334 454.764C61.7223 451.569 60.8343 448.567 60.0586 445.792ZM219.712 435.159C220.859 436.225 221.985 437.294 223.092 438.365C222.539 437.829 221.98 437.294 221.417 436.76L219.712 435.159ZM55.5918 425.646V425.646V425.646ZM55.9795 425.366C56.0059 425.358 56.033 425.351 56.0605 425.346C56.033 425.351 56.0059 425.358 55.9795 425.366ZM78.6865 423.779C77.967 423.911 77.2356 424.036 76.4922 424.152C77.2356 424.036 77.967 423.911 78.6865 423.779ZM192.461 413.492C193.801 414.403 195.121 415.321 196.422 416.244C195.826 415.822 195.228 415.399 194.624 414.979L192.461 413.492ZM180.675 405.978C183.975 407.951 187.17 409.966 190.263 412.017C187.17 409.966 183.975 407.951 180.675 405.978ZM172.202 401.134C172.497 401.295 172.79 401.456 173.083 401.617C172.79 401.456 172.497 401.295 172.202 401.134ZM155.692 392.862C156.534 393.248 157.369 393.636 158.199 394.026C157.369 393.636 156.534 393.248 155.692 392.862ZM152.942 391.62C153.085 391.683 153.226 391.748 153.368 391.812C152.765 391.542 152.16 391.273 151.552 391.007L152.942 391.62ZM136.701 384.999C137.974 385.473 139.236 385.954 140.487 386.439C139.236 385.954 137.974 385.473 136.701 384.999ZM130.65 382.821C130.963 382.93 131.275 383.039 131.587 383.148C131.275 383.039 130.963 382.93 130.65 382.821ZM122.457 380.553C122.419 380.593 122.385 380.639 122.357 380.688C122.386 380.639 122.419 380.593 122.457 380.553ZM123.064 380.314C123.123 380.319 123.183 380.331 123.242 380.35C123.183 380.331 123.123 380.319 123.064 380.314ZM244.629 616.492V616.5C244.626 616.532 244.618 616.562 244.611 616.592C244.619 616.56 244.626 616.527 244.629 616.492ZM242.352 615.793C242.413 615.859 242.474 615.925 242.535 615.991C242.474 615.925 242.413 615.859 242.352 615.793Z" />
                                        <path d="M514.409 404.005H514.41H514.409ZM538.291 399.842H538.292H538.291ZM487.865 398.764L487.864 398.763L487.865 398.764ZM287.982 0.0170898C299.572 17.4675 317.697 35.9596 334.282 51.144C347.964 63.6703 360.916 74.229 368.944 80.48L316.341 107.743C314.058 108.921 312.701 111.269 312.701 113.73V131.93C312.701 135.188 315.07 138.113 318.475 138.605V138.607C323.18 139.294 355.387 144.383 390.787 158.844C426.38 173.384 463.961 196.895 481.102 233.711V233.712C490.287 253.446 497.416 272.292 503.719 289.672C509.984 306.95 515.517 323.03 521.384 336.762C530.932 359.11 542.091 377.039 560.818 384.907C549.15 390.34 531.798 396.997 515.266 397.956C503.314 398.649 492.615 396.318 484.67 389.265C476.744 382.229 470.453 369.508 469.445 347.001C467.197 296.76 463.247 258.615 446.948 228.808C430.41 198.563 401.728 177.794 352.489 160.605L352.487 160.608C350.467 159.896 348.316 160.219 346.657 161.267L288.341 198.106L230.026 161.267H230.025C228.321 160.191 226.176 159.911 224.193 160.607V160.605C174.959 177.794 146.278 198.562 129.738 228.807C113.438 258.614 109.486 296.759 107.237 347.001C106.229 369.507 99.9393 382.229 92.0137 389.265C84.069 396.318 73.3695 398.649 61.418 397.956C44.8876 396.997 27.5363 390.341 15.8682 384.909C34.5989 377.042 45.7596 359.113 55.3076 336.762C61.174 323.03 66.7056 306.951 72.9697 289.672C79.2708 272.292 86.3984 253.446 95.5811 233.712C112.721 196.895 150.304 173.387 185.899 158.848C221.301 144.388 253.509 139.299 258.216 138.606L258.215 138.604C261.616 138.109 263.981 135.187 263.981 131.93V113.73C263.981 111.286 262.642 108.939 260.35 107.747L260.343 107.743L208.555 80.9019C226.646 68.5322 244.951 50.3137 259.733 33.9106C272.061 20.2313 282.174 7.54733 287.982 0.0170898ZM95.2734 394.375C95.8194 393.915 96.3575 393.437 96.8848 392.938L96.4434 393.349C96.0587 393.702 95.6678 394.043 95.2734 394.375ZM2.61719 384.95C3.17269 385.253 3.78807 385.584 4.45898 385.94C4.15557 385.779 3.86325 385.624 3.58301 385.473L2.61719 384.95ZM575.819 382.879C575.984 383.04 576.066 383.267 576.047 383.489C576.066 383.267 575.984 383.04 575.819 382.879ZM9.80566 380.755V380.756V380.755ZM13.7031 379.305V379.306V379.305ZM563.943 379.699V379.698V379.699ZM557.546 376.537C558.415 377.056 559.303 377.547 560.21 378.008V378.009C559.908 377.855 559.608 377.698 559.31 377.538C558.713 377.217 558.125 376.883 557.546 376.537ZM554.992 374.892C555.27 375.084 555.55 375.273 555.832 375.458L556.683 376.007C556.111 375.648 555.548 375.276 554.992 374.892ZM108.445 374.408C108.415 374.494 108.386 374.581 108.354 374.667L108.084 375.398C108.207 375.071 108.326 374.741 108.445 374.408ZM550.966 371.778C551.485 372.224 552.011 372.657 552.544 373.079L553.349 373.702C552.538 373.088 551.744 372.446 550.966 371.778ZM541.649 361.596C541.87 361.894 542.091 362.189 542.314 362.482L542.987 363.351C542.536 362.777 542.09 362.192 541.649 361.596ZM112.615 355.35C112.594 355.547 112.57 355.743 112.548 355.939C112.57 355.743 112.594 355.547 112.615 355.35ZM112.989 351.29C113.061 350.333 113.124 349.361 113.177 348.373C113.124 349.361 113.061 350.333 112.989 351.29ZM533.611 348.624C534.193 349.722 534.782 350.797 535.379 351.85L535.378 351.851C535.179 351.5 534.981 351.146 534.784 350.79C534.39 350.078 533.999 349.356 533.611 348.624ZM43.0811 348.624C42.762 349.226 42.4396 349.821 42.1162 350.41C42.4396 349.821 42.762 349.226 43.0811 348.624ZM116.342 302.001C115.03 314.443 114.15 327.926 113.448 342.586L113.231 347.27C113.969 330.785 114.891 315.757 116.342 302.001ZM461.295 312.09C461.339 312.606 461.378 313.123 461.421 313.642C461.378 313.123 461.339 312.606 461.295 312.09ZM460.935 308.013C460.951 308.19 460.967 308.367 460.983 308.544C460.967 308.367 460.951 308.19 460.935 308.013ZM116.516 300.387C116.527 300.279 116.539 300.171 116.551 300.063C116.539 300.171 116.527 300.279 116.516 300.387ZM116.652 299.152C116.69 298.818 116.727 298.486 116.766 298.154C116.727 298.486 116.69 298.818 116.652 299.152ZM459.92 298.174C459.945 298.391 459.969 298.608 459.993 298.825C459.969 298.608 459.945 298.391 459.92 298.174ZM117.231 294.269C117.104 295.287 116.981 296.313 116.86 297.346C116.981 296.313 117.104 295.287 117.231 294.269ZM117.357 293.284C117.39 293.029 117.422 292.775 117.455 292.521C117.422 292.775 117.39 293.029 117.357 293.284ZM459.228 292.521C459.249 292.686 459.27 292.852 459.291 293.018C459.27 292.852 459.249 292.686 459.228 292.521ZM117.616 291.313C117.648 291.072 117.68 290.832 117.713 290.592C117.68 290.832 117.648 291.072 117.616 291.313ZM117.853 289.59C117.894 289.297 117.933 289.003 117.975 288.71C117.933 289.003 117.894 289.297 117.853 289.59ZM458.715 288.756C458.742 288.948 458.768 289.14 458.795 289.332C458.768 289.14 458.742 288.948 458.715 288.756ZM118.26 286.753C118.347 286.165 118.437 285.578 118.527 284.995C118.437 285.578 118.347 286.165 118.26 286.753ZM118.641 284.275C118.694 283.937 118.747 283.6 118.801 283.263C118.747 283.6 118.694 283.937 118.641 284.275ZM118.948 282.365C118.998 282.063 119.047 281.762 119.098 281.462C119.047 281.762 118.998 282.063 118.948 282.365ZM119.307 280.242C119.339 280.057 119.37 279.872 119.402 279.688C119.37 279.872 119.339 280.057 119.307 280.242ZM119.561 278.797C119.61 278.518 119.66 278.239 119.711 277.961C119.66 278.239 119.61 278.518 119.561 278.797ZM119.866 277.118C119.928 276.787 119.989 276.457 120.052 276.128C119.989 276.457 119.928 276.787 119.866 277.118ZM456.662 276.292C456.682 276.397 456.702 276.501 456.722 276.606C456.702 276.501 456.682 276.397 456.662 276.292ZM120.191 275.408C120.25 275.104 120.308 274.8 120.368 274.498C120.308 274.8 120.25 275.104 120.191 275.408ZM456.315 274.501C456.364 274.746 456.411 274.991 456.459 275.236C456.411 274.991 456.364 274.746 456.315 274.501ZM120.546 273.614C120.605 273.323 120.662 273.032 120.722 272.743C120.662 273.032 120.605 273.323 120.546 273.614ZM455.968 272.773C456.022 273.035 456.074 273.298 456.127 273.561C456.074 273.298 456.022 273.035 455.968 272.773ZM120.896 271.914C120.953 271.639 121.01 271.365 121.068 271.091C121.01 271.365 120.953 271.639 120.896 271.914ZM455.619 271.111C455.674 271.367 455.728 271.625 455.782 271.882C455.728 271.625 455.674 271.367 455.619 271.111ZM121.253 270.243C121.318 269.944 121.383 269.646 121.449 269.349C121.383 269.646 121.318 269.944 121.253 270.243ZM455.267 269.497C455.302 269.656 455.337 269.816 455.372 269.976C455.337 269.816 455.302 269.656 455.267 269.497ZM121.621 268.587C121.685 268.305 121.749 268.023 121.814 267.742C121.749 268.023 121.685 268.305 121.621 268.587ZM454.869 267.742C454.925 267.984 454.98 268.226 455.035 268.469C454.98 268.226 454.925 267.984 454.869 267.742ZM122.021 266.857C122.085 266.589 122.149 266.322 122.213 266.055C122.149 266.322 122.085 266.589 122.021 266.857ZM454.472 266.055C454.536 266.322 454.599 266.589 454.662 266.857C454.599 266.589 454.536 266.322 454.472 266.055ZM122.412 265.236C122.477 264.972 122.542 264.709 122.607 264.446C122.542 264.709 122.477 264.972 122.412 265.236ZM454.085 264.478C454.143 264.712 454.2 264.947 454.258 265.182C454.2 264.947 454.143 264.712 454.085 264.478ZM122.809 263.653C122.883 263.36 122.958 263.069 123.033 262.778C122.958 263.069 122.883 263.36 122.809 263.653ZM453.684 262.901C453.737 263.107 453.789 263.313 453.842 263.52C453.789 263.313 453.737 263.107 453.684 262.901ZM123.221 262.062C123.291 261.795 123.362 261.527 123.434 261.261C123.362 261.527 123.291 261.795 123.221 262.062ZM453.252 261.27C453.306 261.47 453.359 261.671 453.412 261.872C453.359 261.671 453.306 261.47 453.252 261.27ZM452.818 259.688C452.88 259.91 452.942 260.133 453.003 260.356C452.942 260.133 452.88 259.91 452.818 259.688ZM123.708 260.26C123.76 260.074 123.81 259.887 123.862 259.701C123.81 259.887 123.76 260.074 123.708 260.26ZM124.134 258.743C124.194 258.533 124.254 258.324 124.314 258.115C124.254 258.324 124.194 258.533 124.134 258.743ZM452.41 258.252C452.435 258.338 452.46 258.424 452.484 258.51C452.46 258.424 452.435 258.338 452.41 258.252ZM124.586 257.191C124.655 256.958 124.723 256.726 124.793 256.495C124.723 256.726 124.655 256.958 124.586 257.191ZM451.936 256.645C451.968 256.752 451.999 256.858 452.031 256.965C451.999 256.858 451.968 256.752 451.936 256.645ZM125.019 255.757C125.105 255.477 125.19 255.197 125.277 254.918C125.19 255.197 125.105 255.477 125.019 255.757ZM451.449 255.056C451.496 255.207 451.543 255.357 451.59 255.508C451.543 255.357 451.496 255.207 451.449 255.056ZM125.501 254.212C125.591 253.929 125.682 253.646 125.773 253.364C125.682 253.646 125.591 253.929 125.501 254.212ZM450.97 253.547C451.012 253.678 451.054 253.808 451.096 253.939C451.054 253.808 451.012 253.678 450.97 253.547ZM125.971 252.762C126.078 252.435 126.187 252.109 126.297 251.784C126.187 252.109 126.078 252.435 125.971 252.762ZM450.467 252.019C450.517 252.169 450.566 252.318 450.616 252.468C450.566 252.318 450.517 252.169 450.467 252.019ZM126.5 251.188C126.602 250.89 126.704 250.592 126.808 250.295C126.704 250.592 126.602 250.89 126.5 251.188ZM449.957 250.526C450.002 250.656 450.047 250.785 450.092 250.916C450.047 250.785 450.002 250.656 449.957 250.526ZM127.05 249.613C127.136 249.37 127.222 249.126 127.31 248.884C127.222 249.126 127.136 249.37 127.05 249.613ZM449.423 249.016C449.474 249.159 449.526 249.303 449.577 249.447C449.526 249.303 449.474 249.159 449.423 249.016ZM127.58 248.142C127.663 247.917 127.746 247.692 127.83 247.467C127.746 247.692 127.663 247.917 127.58 248.142ZM448.866 247.499C448.931 247.672 448.995 247.846 449.06 248.02C448.995 247.846 448.931 247.672 448.866 247.499ZM128.205 246.478C128.273 246.3 128.341 246.123 128.409 245.946C128.341 246.123 128.273 246.3 128.205 246.478ZM448.314 246.047C448.37 246.19 448.426 246.334 448.48 246.477C448.426 246.334 448.37 246.19 448.314 246.047ZM128.657 245.312C128.776 245.01 128.896 244.708 129.017 244.408C128.896 244.708 128.776 245.01 128.657 245.312ZM447.717 244.528C447.801 244.739 447.885 244.95 447.969 245.162C447.885 244.95 447.801 244.739 447.717 244.528ZM129.25 243.833C129.349 243.59 129.448 243.348 129.549 243.106C129.448 243.348 129.349 243.59 129.25 243.833ZM447.14 243.114C447.221 243.311 447.303 243.509 447.384 243.707C447.303 243.509 447.221 243.311 447.14 243.114ZM446.528 241.666C446.621 241.881 446.713 242.097 446.805 242.313C446.713 242.097 446.621 241.881 446.528 241.666ZM129.905 242.255C129.984 242.069 130.064 241.882 130.144 241.696C130.064 241.882 129.984 242.069 129.905 242.255ZM130.494 240.888C130.589 240.67 130.685 240.453 130.781 240.236C130.685 240.453 130.589 240.67 130.494 240.888ZM445.915 240.262C446.008 240.47 446.1 240.679 446.191 240.888C446.1 240.679 446.008 240.47 445.915 240.262ZM131.083 239.564C131.201 239.303 131.319 239.042 131.438 238.783C131.319 239.042 131.201 239.303 131.083 239.564ZM445.296 238.891C445.383 239.081 445.47 239.272 445.557 239.463C445.47 239.272 445.383 239.081 445.296 238.891ZM131.734 238.146C131.849 237.902 131.964 237.658 132.08 237.415C131.964 237.658 131.849 237.902 131.734 238.146ZM444.676 237.563C444.745 237.709 444.815 237.856 444.884 238.002C444.815 237.856 444.745 237.709 444.676 237.563ZM132.388 236.773C132.521 236.497 132.656 236.222 132.791 235.948C132.656 236.222 132.521 236.497 132.388 236.773ZM443.961 236.082C444.06 236.282 444.157 236.484 444.255 236.685C444.157 236.484 444.06 236.282 443.961 236.082ZM133.013 235.498C133.152 235.219 133.293 234.941 133.434 234.664C133.293 234.941 133.152 235.219 133.013 235.498ZM443.293 234.745C443.398 234.952 443.503 235.16 443.607 235.369C443.503 235.16 443.398 234.952 443.293 234.745ZM133.768 234.012C133.872 233.809 133.977 233.607 134.083 233.405C133.977 233.607 133.872 233.809 133.768 234.012ZM442.603 233.405C442.704 233.597 442.803 233.791 442.903 233.984C442.803 233.791 442.704 233.597 442.603 233.405ZM134.479 232.658C134.598 232.437 134.717 232.217 134.836 231.997C134.717 232.217 134.597 232.437 134.479 232.658ZM441.851 231.997C441.97 232.216 442.088 232.437 442.206 232.658C442.088 232.437 441.97 232.216 441.851 231.997ZM135.188 231.35C135.312 231.126 135.437 230.902 135.562 230.678C135.437 230.902 135.312 231.126 135.188 231.35ZM441.182 230.784C441.282 230.962 441.381 231.141 441.48 231.321C441.381 231.141 441.282 230.962 441.182 230.784ZM135.89 230.097C136.038 229.836 136.188 229.576 136.339 229.316C136.188 229.576 136.038 229.836 135.89 230.097ZM440.43 229.458C440.517 229.61 440.604 229.762 440.691 229.915C440.604 229.762 440.517 229.61 440.43 229.458ZM136.648 228.786C136.797 228.533 136.945 228.281 137.096 228.03C136.945 228.281 136.797 228.533 136.648 228.786ZM439.657 228.142C439.753 228.302 439.848 228.462 439.942 228.623C439.848 228.462 439.753 228.302 439.657 228.142ZM137.413 227.502C137.578 227.23 137.745 226.959 137.912 226.688C137.745 226.959 137.578 227.23 137.413 227.502ZM438.86 226.827C438.977 227.016 439.093 227.206 439.209 227.396C439.093 227.206 438.977 227.016 438.86 226.827ZM138.202 226.219C138.352 225.979 138.504 225.74 138.656 225.5C138.504 225.74 138.352 225.979 138.202 226.219ZM482.415 223.19C482.907 224.054 483.388 224.925 483.857 225.805V225.806C483.701 225.513 483.543 225.22 483.384 224.928C483.225 224.637 483.065 224.347 482.903 224.057L482.415 223.19ZM438.1 225.61C438.198 225.764 438.295 225.919 438.393 226.074C438.295 225.919 438.198 225.764 438.1 225.61ZM139.067 224.859C139.194 224.663 139.322 224.469 139.449 224.274C139.322 224.469 139.194 224.663 139.067 224.859ZM437.237 224.274C437.361 224.462 437.484 224.651 437.606 224.84C437.484 224.651 437.361 224.462 437.237 224.274ZM139.855 223.658C140.024 223.405 140.194 223.153 140.365 222.901C140.194 223.153 140.024 223.405 139.855 223.658ZM436.4 223.017C436.541 223.225 436.68 223.433 436.819 223.641C436.68 223.433 436.541 223.225 436.4 223.017ZM140.756 222.329C140.887 222.138 141.018 221.949 141.15 221.759C141.018 221.949 140.887 222.138 140.756 222.329ZM435.541 221.766C435.67 221.951 435.798 222.135 435.926 222.321C435.798 222.135 435.67 221.951 435.541 221.766ZM434.658 220.52C434.801 220.718 434.943 220.917 435.084 221.116C434.943 220.917 434.801 220.718 434.658 220.52ZM141.604 221.112C141.739 220.922 141.875 220.734 142.011 220.545C141.875 220.734 141.739 220.922 141.604 221.112ZM142.478 219.899C142.644 219.671 142.814 219.444 142.982 219.216C142.814 219.444 142.644 219.671 142.478 219.899ZM433.769 219.302C433.915 219.5 434.061 219.698 434.206 219.896C434.061 219.698 433.915 219.5 433.769 219.302ZM432.862 218.099C433.015 218.299 433.167 218.498 433.318 218.699C433.167 218.498 433.015 218.299 432.862 218.099ZM143.369 218.698C143.52 218.498 143.672 218.298 143.824 218.099C143.672 218.298 143.52 218.498 143.369 218.698ZM478.26 216.443L478.261 216.444L478.26 216.443ZM144.298 217.482C144.454 217.281 144.611 217.081 144.769 216.881C144.611 217.081 144.454 217.281 144.298 217.482ZM431.99 216.973C432.123 217.142 432.255 217.31 432.386 217.479C432.255 217.31 432.123 217.142 431.99 216.973ZM145.207 216.327C145.371 216.122 145.536 215.918 145.701 215.714C145.536 215.918 145.371 216.122 145.207 216.327ZM431.044 215.787C431.171 215.944 431.298 216.101 431.425 216.259C431.298 216.101 431.171 215.944 431.044 215.787ZM146.206 215.095C146.343 214.93 146.48 214.764 146.617 214.599C146.48 214.764 146.342 214.93 146.206 215.095ZM430.09 214.625C430.217 214.778 430.345 214.931 430.472 215.084C430.345 214.931 430.217 214.778 430.09 214.625ZM147.164 213.948C147.329 213.753 147.496 213.559 147.663 213.365C147.496 213.559 147.329 213.753 147.164 213.948ZM429.09 213.443C429.219 213.594 429.349 213.745 429.478 213.896C429.349 213.745 429.219 213.594 429.09 213.443ZM148.149 212.802C148.319 212.608 148.491 212.414 148.662 212.22C148.491 212.414 148.319 212.608 148.149 212.802ZM428.024 212.22C428.182 212.398 428.34 212.576 428.496 212.755C428.34 212.576 428.182 212.398 428.024 212.22ZM149.185 211.633C149.335 211.466 149.486 211.298 149.638 211.131C149.486 211.298 149.335 211.466 149.185 211.633ZM427.049 211.131C427.201 211.298 427.351 211.466 427.502 211.633C427.351 211.466 427.201 211.298 427.049 211.131ZM150.248 210.465C150.404 210.297 150.562 210.13 150.719 209.962C150.562 210.13 150.404 210.297 150.248 210.465ZM425.969 209.962C426.126 210.13 426.283 210.297 426.438 210.465C426.283 210.297 426.126 210.13 425.969 209.962ZM105.436 206.934C104.669 207.877 103.914 208.83 103.174 209.795C103.914 208.83 104.669 207.877 105.436 206.934ZM471.867 207.7C472.277 208.211 472.682 208.726 473.084 209.245C472.682 208.726 472.277 208.211 471.867 207.7ZM151.31 209.335C151.464 209.174 151.619 209.012 151.774 208.851C151.619 209.012 151.464 209.174 151.31 209.335ZM424.942 208.882C425.088 209.033 425.233 209.184 425.377 209.335C425.233 209.184 425.088 209.033 424.942 208.882ZM152.339 208.267C152.533 208.069 152.729 207.872 152.925 207.674C152.729 207.872 152.533 208.069 152.339 208.267ZM423.786 207.699C423.959 207.873 424.131 208.047 424.303 208.222C424.131 208.047 423.959 207.873 423.786 207.699ZM153.49 207.108C153.663 206.937 153.836 206.766 154.01 206.595C153.836 206.766 153.663 206.937 153.49 207.108ZM422.707 206.625C422.871 206.786 423.035 206.947 423.197 207.108C423.035 206.947 422.871 206.786 422.707 206.625ZM154.591 206.029C154.748 205.877 154.907 205.726 155.065 205.575C154.907 205.726 154.748 205.877 154.591 206.029ZM421.7 205.65C421.816 205.761 421.932 205.871 422.047 205.982C421.932 205.871 421.816 205.761 421.7 205.65ZM288.647 204.999C288.551 205.041 288.446 205.061 288.341 205.061C288.446 205.061 288.551 205.041 288.647 204.999ZM288.035 205C288.094 205.025 288.156 205.041 288.219 205.051C288.156 205.041 288.094 205.025 288.035 205ZM155.78 204.896C155.91 204.774 156.041 204.652 156.172 204.531C156.041 204.652 155.91 204.774 155.78 204.896ZM420.539 204.554C420.66 204.666 420.781 204.778 420.9 204.89C420.781 204.778 420.66 204.666 420.539 204.554ZM156.92 203.84C157.096 203.68 157.273 203.52 157.45 203.36C157.273 203.52 157.096 203.68 156.92 203.84ZM419.365 203.476C419.484 203.584 419.603 203.691 419.722 203.799C419.603 203.691 419.484 203.584 419.365 203.476ZM467.461 202.492C467.82 202.894 468.175 203.299 468.529 203.707C468.175 203.299 467.82 202.894 467.461 202.492ZM158.064 202.807C158.263 202.63 158.464 202.455 158.664 202.279C158.464 202.455 158.263 202.63 158.064 202.807ZM418.141 202.383C418.283 202.509 418.427 202.634 418.568 202.76C418.427 202.634 418.283 202.509 418.141 202.383ZM159.306 201.718C159.496 201.554 159.687 201.39 159.879 201.226C159.687 201.39 159.496 201.554 159.306 201.718ZM416.917 201.32C417.057 201.44 417.198 201.56 417.337 201.68C417.198 201.56 417.057 201.44 416.917 201.32ZM460.407 195.138C462.127 196.807 463.809 198.516 465.442 200.27C463.809 198.516 462.127 196.807 460.407 195.138ZM160.515 200.684C160.714 200.516 160.916 200.349 161.117 200.181C160.916 200.349 160.714 200.516 160.515 200.684ZM415.606 200.211C415.793 200.367 415.979 200.521 416.164 200.677C415.979 200.521 415.793 200.367 415.606 200.211ZM161.792 199.622C161.973 199.473 162.156 199.325 162.339 199.177C162.156 199.325 161.973 199.473 161.792 199.622ZM414.45 199.26C414.582 199.368 414.715 199.475 414.847 199.583C414.715 199.475 414.582 199.368 414.45 199.26ZM163.067 198.589C163.272 198.426 163.477 198.264 163.684 198.101C163.477 198.264 163.272 198.426 163.067 198.589ZM413.051 198.139C413.239 198.288 413.427 198.435 413.613 198.584C413.427 198.435 413.239 198.288 413.051 198.139ZM164.339 197.586C164.549 197.422 164.761 197.259 164.974 197.096C164.761 197.259 164.549 197.422 164.339 197.586ZM411.841 197.195C411.994 197.313 412.148 197.431 412.301 197.55C412.148 197.431 411.994 197.313 411.841 197.195ZM165.712 196.531C165.874 196.408 166.036 196.287 166.199 196.165C166.036 196.287 165.874 196.408 165.712 196.531ZM410.525 196.194C410.661 196.296 410.797 196.396 410.932 196.499C410.797 196.396 410.661 196.296 410.525 196.194ZM409.03 195.086C409.241 195.24 409.452 195.393 409.661 195.547C409.452 195.393 409.241 195.24 409.03 195.086ZM167.068 195.515C167.24 195.389 167.413 195.264 167.585 195.138C167.413 195.264 167.24 195.389 167.068 195.515ZM168.421 194.529C168.64 194.371 168.861 194.216 169.081 194.059C168.861 194.216 168.64 194.371 168.421 194.529ZM407.776 194.181C407.933 194.293 408.09 194.403 408.245 194.515C408.09 194.403 407.933 194.293 407.776 194.181ZM169.784 193.56C170.06 193.366 170.338 193.175 170.617 192.982C170.338 193.175 170.06 193.366 169.784 193.56ZM406.346 193.172C406.514 193.289 406.682 193.406 406.85 193.524C406.682 193.406 406.514 193.289 406.346 193.172ZM454.573 189.768C455.904 190.931 457.217 192.115 458.507 193.323C457.217 192.115 455.904 190.931 454.573 189.768ZM171.203 192.576C171.433 192.419 171.664 192.263 171.896 192.107C171.664 192.263 171.433 192.419 171.203 192.576ZM404.955 192.218C405.114 192.326 405.273 192.433 405.432 192.542C405.273 192.433 405.114 192.326 404.955 192.218ZM172.668 191.586C172.896 191.434 173.125 191.284 173.354 191.132C173.125 191.284 172.896 191.434 172.668 191.586ZM403.523 191.258C403.672 191.357 403.821 191.455 403.969 191.553C403.821 191.455 403.672 191.357 403.523 191.258ZM174.114 190.632C174.358 190.474 174.603 190.317 174.849 190.16C174.603 190.317 174.358 190.474 174.114 190.632ZM401.997 190.262C402.173 190.375 402.348 190.488 402.522 190.601C402.348 190.488 402.173 190.375 401.997 190.262ZM175.635 189.656C175.865 189.509 176.098 189.365 176.33 189.219C176.098 189.365 175.865 189.509 175.635 189.656ZM400.597 189.37C400.731 189.455 400.867 189.538 401.001 189.624C400.867 189.538 400.731 189.455 400.597 189.37ZM177.151 188.705C177.361 188.575 177.572 188.446 177.783 188.317C177.572 188.446 177.361 188.575 177.151 188.705ZM399.104 188.44C399.23 188.518 399.357 188.595 399.483 188.673C399.357 188.595 399.23 188.518 399.104 188.44ZM178.722 187.745C178.937 187.614 179.154 187.485 179.371 187.355C179.154 187.485 178.937 187.614 178.722 187.745ZM397.495 187.463C397.644 187.553 397.793 187.641 397.941 187.73C397.793 187.641 397.644 187.553 397.495 187.463ZM180.267 186.822C180.477 186.698 180.689 186.575 180.9 186.452C180.689 186.575 180.477 186.698 180.267 186.822ZM395.953 186.549C396.084 186.626 396.215 186.702 396.346 186.779C396.215 186.702 396.084 186.626 395.953 186.549ZM129.514 183.673C128.435 184.511 127.365 185.361 126.307 186.225C127.365 185.361 128.435 184.511 129.514 183.673ZM438.891 177.612C442.721 180.255 446.462 183.044 450.082 185.985C446.462 183.044 442.721 180.255 438.891 177.612ZM181.893 185.875C182.075 185.77 182.258 185.667 182.441 185.562C182.258 185.667 182.075 185.77 181.893 185.875ZM394.359 185.626C394.503 185.709 394.648 185.79 394.791 185.873C394.648 185.79 394.503 185.709 394.359 185.626ZM183.523 184.947C183.671 184.864 183.82 184.782 183.969 184.699C183.82 184.782 183.671 184.864 183.523 184.947ZM185.16 184.038C185.353 183.932 185.547 183.828 185.741 183.722C185.547 183.828 185.353 183.932 185.16 184.038ZM390.944 183.722C391.125 183.82 391.306 183.917 391.485 184.015C391.306 183.917 391.125 183.82 390.944 183.722ZM389.037 182.698C389.329 182.853 389.621 183.006 389.91 183.162C389.621 183.006 389.329 182.853 389.037 182.698ZM186.817 183.138C187.068 183.004 187.32 182.873 187.572 182.739C187.32 182.873 187.068 183.004 186.817 183.138ZM387.484 181.883C387.724 182.008 387.963 182.13 388.201 182.254C387.963 182.13 387.724 182.008 387.484 181.883ZM188.488 182.252C188.714 182.134 188.941 182.018 189.168 181.9C188.941 182.018 188.714 182.134 188.488 182.252ZM386.188 181.215C386.255 181.249 386.321 181.282 386.387 181.316C386.321 181.282 386.255 181.249 386.188 181.215ZM190.299 181.315C190.364 181.281 190.43 181.249 190.496 181.215C190.43 181.249 190.364 181.281 190.299 181.315ZM193.812 179.558C193.978 179.477 194.146 179.396 194.313 179.315C194.146 179.396 193.978 179.477 193.812 179.558ZM382.371 179.315C382.539 179.396 382.706 179.477 382.873 179.558C382.706 179.477 382.539 179.396 382.371 179.315ZM195.592 178.699C195.805 178.597 196.02 178.496 196.234 178.394C196.02 178.496 195.805 178.597 195.592 178.699ZM380.45 178.394C380.665 178.496 380.88 178.597 381.094 178.699C380.88 178.597 380.665 178.496 380.45 178.394ZM197.466 177.812C197.622 177.739 197.778 177.668 197.935 177.595C197.778 177.668 197.622 177.739 197.466 177.812ZM378.75 177.595C378.906 177.668 379.063 177.739 379.219 177.812C379.063 177.739 378.906 177.668 378.75 177.595ZM199.242 176.991C199.525 176.861 199.81 176.733 200.096 176.604C199.81 176.733 199.525 176.861 199.242 176.991ZM376.589 176.604C376.874 176.733 377.159 176.861 377.442 176.991C377.159 176.861 376.874 176.733 376.589 176.604ZM429.592 171.572C431.57 172.782 433.533 174.026 435.476 175.307C433.533 174.026 431.57 172.782 429.592 171.572ZM422.967 167.675C424.151 168.345 425.332 169.026 426.508 169.719C425.332 169.026 424.151 168.345 422.967 167.675ZM350.014 166.267C349.987 166.276 349.961 166.287 349.936 166.299L349.861 166.34C349.909 166.31 349.96 166.286 350.014 166.267ZM417.537 164.702C418.551 165.24 419.563 165.785 420.573 166.34C419.563 165.785 418.551 165.24 417.537 164.702ZM350.431 166.246V166.245V166.246ZM412.667 162.185C413.227 162.467 413.788 162.751 414.348 163.038C413.788 162.751 413.227 162.467 412.667 162.185ZM404.044 158.046C405.948 158.919 407.855 159.818 409.761 160.747C407.855 159.818 405.948 158.919 404.044 158.046ZM397.17 155.007C398.939 155.761 400.714 156.539 402.491 157.34C400.714 156.539 398.939 155.761 397.17 155.007ZM184.328 153.01C182.638 153.696 180.941 154.402 179.238 155.129C180.941 154.402 182.638 153.696 184.328 153.01ZM389.907 152.025C391.839 152.789 393.782 153.58 395.733 154.4C393.782 153.58 391.839 152.789 389.907 152.025ZM385.311 150.25C386.536 150.712 387.767 151.185 389.003 151.669C387.767 151.185 386.536 150.712 385.311 150.25ZM382.263 149.118C382.768 149.303 383.275 149.49 383.783 149.678C383.275 149.49 382.768 149.303 382.263 149.118ZM378.686 147.833C379.294 148.047 379.904 148.264 380.516 148.484C379.904 148.264 379.294 148.047 378.686 147.833ZM371.918 145.527C372.548 145.734 373.181 145.944 373.817 146.158C373.181 145.944 372.548 145.734 371.918 145.527ZM364.915 143.308C366.39 143.759 367.886 144.225 369.4 144.71C367.886 144.225 366.39 143.759 364.915 143.308ZM358.797 141.499C360.081 141.866 361.385 142.248 362.707 142.642C361.385 142.248 360.081 141.866 358.797 141.499ZM353.442 140.011C354.592 140.321 355.76 140.642 356.947 140.975C355.76 140.642 354.592 140.321 353.442 140.011ZM342.669 137.284C344.618 137.745 346.659 138.247 348.781 138.789C346.659 138.247 344.618 137.745 342.669 137.284ZM333.72 135.29C335.436 135.648 337.275 136.046 339.226 136.487C337.275 136.046 335.436 135.648 333.72 135.29ZM329.915 134.519C330.81 134.694 331.75 134.884 332.735 135.086C331.75 134.884 330.81 134.694 329.915 134.519ZM320.586 132.859C322.105 133.096 324.502 133.492 327.627 134.08C325.571 133.693 323.829 133.39 322.446 133.16L320.586 132.859ZM257.465 132.641C257.425 132.654 257.384 132.665 257.342 132.67L256.098 132.86C255.259 132.991 254.152 133.174 252.802 133.408C254.988 133.029 256.536 132.789 257.342 132.67C257.384 132.665 257.425 132.654 257.465 132.641ZM257.585 132.59C257.561 132.603 257.536 132.613 257.51 132.624C257.536 132.613 257.561 132.603 257.585 132.59ZM257.687 132.524C257.667 132.539 257.646 132.553 257.625 132.566C257.646 132.553 257.667 132.539 257.687 132.524ZM257.776 132.443C257.761 132.459 257.744 132.475 257.728 132.49C257.744 132.475 257.761 132.459 257.776 132.443ZM318.701 131.93C318.701 132.069 318.739 132.201 318.806 132.314C318.761 132.238 318.729 132.155 318.713 132.066L318.701 131.93ZM257.846 132.356C257.837 132.369 257.827 132.382 257.817 132.395C257.827 132.382 257.837 132.369 257.846 132.356ZM257.91 132.242C257.902 132.259 257.895 132.277 257.886 132.294C257.895 132.277 257.902 132.259 257.91 132.242ZM318.708 113.629C318.713 113.596 318.72 113.563 318.729 113.531C318.721 113.562 318.714 113.594 318.709 113.626L318.708 113.629ZM257.954 113.531L257.975 113.629C257.967 113.573 257.951 113.518 257.931 113.465C257.939 113.487 257.948 113.508 257.954 113.531ZM318.739 113.501C318.746 113.481 318.752 113.461 318.76 113.441C318.752 113.461 318.746 113.481 318.739 113.501ZM318.771 113.417C318.781 113.395 318.792 113.374 318.804 113.353C318.792 113.374 318.781 113.395 318.771 113.417ZM318.819 113.328C318.829 113.313 318.839 113.299 318.85 113.285C318.839 113.299 318.829 113.313 318.819 113.328ZM318.882 113.243C318.887 113.236 318.894 113.23 318.899 113.224C318.894 113.23 318.887 113.236 318.882 113.243ZM376.787 78.936C377.767 79.6732 378.576 80.2686 379.191 80.7104C379.613 81.0199 379.596 81.6362 379.18 81.9263C379.318 81.8296 379.412 81.6969 379.461 81.5513C379.48 81.4929 379.492 81.4326 379.497 81.3716C379.516 81.1279 379.416 80.8755 379.191 80.7104C378.576 80.2686 377.767 79.6732 376.787 78.936ZM198.542 80.2026C198.386 80.2958 198.23 80.3879 198.074 80.48C198.23 80.3879 198.386 80.2958 198.542 80.2026ZM200.314 79.1206C200.241 79.1666 200.167 79.2126 200.093 79.2583C200.167 79.2126 200.241 79.1666 200.314 79.1206ZM201.204 78.563C201.08 78.6413 200.957 78.7187 200.833 78.7964C200.957 78.7187 201.08 78.6413 201.204 78.563ZM202.181 77.938C202.047 78.0242 201.914 78.1094 201.78 78.1948C201.914 78.1094 202.047 78.0242 202.181 77.938ZM202.96 77.4302C202.863 77.4936 202.767 77.5566 202.67 77.6196C202.767 77.5566 202.863 77.4936 202.96 77.4302ZM203.906 76.8032C203.808 76.869 203.709 76.9341 203.61 76.9995C203.709 76.9341 203.808 76.869 203.906 76.8032ZM204.912 76.1245C204.736 76.2443 204.56 76.3633 204.384 76.4819C204.56 76.3633 204.736 76.2443 204.912 76.1245ZM205.785 75.5259C205.613 75.6449 205.441 75.7634 205.269 75.8813C205.441 75.7634 205.613 75.6449 205.785 75.5259ZM206.511 75.021C206.411 75.0909 206.311 75.1605 206.211 75.23C206.311 75.1605 206.411 75.0909 206.511 75.021ZM366.558 70.937C367.409 71.6224 368.231 72.2797 369.021 72.9077L371.293 74.7026C370.57 74.135 369.812 73.5368 369.021 72.9087L366.558 70.937ZM210.063 72.4624C209.986 72.5196 209.909 72.5773 209.832 72.6343C209.909 72.5773 209.986 72.5196 210.063 72.4624ZM214.019 69.4487C213.669 69.722 213.32 69.9936 212.971 70.2632C213.32 69.9936 213.669 69.722 214.019 69.4487ZM215.854 67.9956C215.505 68.2746 215.157 68.5522 214.809 68.8276C215.157 68.5522 215.505 68.2746 215.854 67.9956ZM338.334 46.7192C346.501 54.1967 354.4 60.9606 361.114 66.5005L363.916 68.7983C362.1 67.3185 360.176 65.733 358.166 64.0532C356.156 62.3734 354.061 60.5995 351.9 58.7437C348.12 55.4959 344.141 51.9966 340.079 48.3101L338.334 46.7192ZM217.567 66.6089C217.255 66.8642 216.943 67.1189 216.631 67.3716C216.943 67.1189 217.255 66.8642 217.567 66.6089ZM219.276 65.1968C219.028 65.4039 218.781 65.6114 218.532 65.8169C218.781 65.6114 219.028 65.4039 219.276 65.1968ZM221.354 63.4438C221.016 63.7331 220.677 64.0217 220.338 64.3081C220.677 64.0217 221.016 63.7331 221.354 63.4438ZM223.217 61.8384C222.828 62.1766 222.44 62.5143 222.051 62.8491C222.44 62.5143 222.828 62.1766 223.217 61.8384ZM227.475 58.0552C227.221 58.2853 226.966 58.5137 226.712 58.7427C226.966 58.5137 227.221 58.2853 227.475 58.0552ZM229.279 56.4028C228.869 56.7815 228.457 57.158 228.045 57.5337C228.457 57.158 228.869 56.7815 229.279 56.4028ZM230.976 54.8267C230.685 55.0986 230.393 55.3685 230.102 55.6392C230.393 55.3685 230.685 55.0986 230.976 54.8267ZM232.714 53.187C232.508 53.3826 232.301 53.577 232.095 53.772C232.301 53.577 232.508 53.3826 232.714 53.187ZM234.507 51.4702C234.248 51.7198 233.988 51.9685 233.729 52.2173C233.988 51.9685 234.248 51.7198 234.507 51.4702ZM236.148 49.8784C235.975 50.0481 235.8 50.2169 235.626 50.3862C235.8 50.2169 235.975 50.0481 236.148 49.8784ZM238.074 47.9829C237.778 48.2767 237.48 48.5698 237.183 48.8628C237.48 48.5698 237.778 48.2767 238.074 47.9829ZM239.642 46.4194C239.374 46.6879 239.106 46.9562 238.837 47.2241C239.106 46.9562 239.374 46.6879 239.642 46.4194ZM241.274 44.7729C241.1 44.9496 240.927 45.1268 240.752 45.3032C240.927 45.1268 241.1 44.9496 241.274 44.7729ZM243.027 42.9829C242.796 43.2206 242.564 43.4584 242.332 43.6958C242.564 43.4584 242.796 43.2206 243.027 42.9829ZM244.712 41.2437C244.476 41.4887 244.24 41.734 244.003 41.979C244.24 41.734 244.476 41.4887 244.712 41.2437ZM246.664 39.2036C246.322 39.5634 245.979 39.923 245.635 40.2827C245.979 39.923 246.322 39.5634 246.664 39.2036ZM309.035 17.2407C315.437 24.4884 322.458 31.6677 329.522 38.4575L331.289 40.147C327.166 36.2255 323.042 32.1622 319.03 28.021C317.884 26.8378 316.747 25.6481 315.622 24.4536C313.372 22.0647 311.169 19.6566 309.035 17.2407ZM248.139 37.644C247.866 37.934 247.592 38.224 247.317 38.5142C247.592 38.224 247.866 37.934 248.139 37.644ZM258.139 26.689C257.952 26.8992 257.765 27.109 257.577 27.3198C257.765 27.109 257.952 26.8992 258.139 26.689ZM260.992 23.4438C260.864 23.5905 260.736 23.7372 260.607 23.8843C260.736 23.7372 260.864 23.5905 260.992 23.4438ZM262.673 21.5093C262.45 21.7672 262.225 22.0253 262 22.2847C262.225 22.0253 262.45 21.7672 262.673 21.5093ZM263.754 20.2534C263.582 20.4536 263.41 20.6548 263.236 20.856C263.41 20.6548 263.582 20.4536 263.754 20.2534ZM266.339 17.2251C266.253 17.3262 266.167 17.4274 266.081 17.5288C266.167 17.4274 266.253 17.3262 266.339 17.2251ZM269.146 13.8862C268.77 14.3357 268.39 14.7878 268.006 15.2446C268.39 14.7878 268.77 14.3357 269.146 13.8862ZM271.588 10.9409C271.228 11.3772 270.864 11.8174 270.495 12.2622C270.864 11.8174 271.228 11.3772 271.588 10.9409ZM293.438 -2.61475C296.226 1.52797 299.406 5.74763 302.861 9.98096V9.98193C302.368 9.37711 301.88 8.77255 301.397 8.16846C300.433 6.96033 299.493 5.75423 298.579 4.55127C298.122 3.9499 297.673 3.34903 297.229 2.74951C295.9 0.95056 294.633 -0.839146 293.438 -2.61475ZM273.86 8.16748C273.558 8.5383 273.252 8.91222 272.942 9.29053C273.252 8.91222 273.558 8.5383 273.86 8.16748ZM275.982 5.54443C275.731 5.85651 275.477 6.17212 275.22 6.49072C275.477 6.17212 275.731 5.85651 275.982 5.54443ZM277.961 3.07471C277.738 3.35501 277.511 3.63847 277.282 3.92529C277.511 3.63847 277.738 3.35501 277.961 3.07471ZM279.767 0.794434C279.587 1.02208 279.406 1.25281 279.222 1.48584C279.406 1.25281 279.587 1.02208 279.767 0.794434ZM281.741 -1.72607C281.515 -1.43535 281.284 -1.13787 281.048 -0.835449C281.284 -1.13787 281.515 -1.43535 281.741 -1.72607ZM283.119 -3.50244C282.921 -3.24534 282.717 -2.98227 282.509 -2.71338C282.717 -2.98227 282.921 -3.24534 283.119 -3.50244ZM288.638 -9.97119C288.807 -9.91972 288.96 -9.80633 289.062 -9.63037C289.555 -8.76607 290.07 -7.8961 290.604 -7.02197C290.07 -7.89595 289.555 -8.76524 289.062 -9.62939C289.045 -9.6587 289.026 -9.68652 289.007 -9.7124C288.987 -9.73829 288.966 -9.76221 288.944 -9.78467C288.856 -9.87466 288.751 -9.93678 288.638 -9.97119ZM288.2 -9.96826C288.148 -9.95165 288.097 -9.92852 288.048 -9.8999C288.097 -9.92858 288.148 -9.9516 288.2 -9.96826ZM575.392 382.67C574.641 382.567 573.901 382.45 573.172 382.318C573.901 382.45 574.641 382.567 575.392 382.67ZM91.4639 397.198C91.3192 397.291 91.1739 397.384 91.0283 397.475C91.1739 397.384 91.3192 397.291 91.4639 397.198ZM30.9639 397.498C30.7861 397.436 30.6086 397.375 30.4316 397.314C30.6086 397.375 30.7861 397.436 30.9639 397.498ZM29.7266 397.067C29.6093 397.026 29.4918 396.985 29.375 396.944C29.4918 396.985 29.6093 397.026 29.7266 397.067ZM94.2266 395.228C94.0917 395.334 93.9562 395.438 93.8203 395.542C93.9562 395.438 94.0917 395.334 94.2266 395.228ZM93.7754 395.576C93.6411 395.678 93.5063 395.779 93.3711 395.878C93.5063 395.779 93.6411 395.678 93.7754 395.576ZM100.043 389.57C99.952 389.679 99.8612 389.787 99.7695 389.895C99.8612 389.787 99.952 389.679 100.043 389.57ZM104.79 382.586C104.702 382.746 104.613 382.905 104.523 383.063C104.613 382.905 104.702 382.746 104.79 382.586ZM106.059 380.132C105.971 380.314 105.883 380.494 105.794 380.673C105.883 380.494 105.971 380.314 106.059 380.132ZM106.96 378.172C106.91 378.287 106.859 378.401 106.809 378.514C106.859 378.401 106.91 378.287 106.96 378.172ZM107.816 376.096L107.808 376.119C107.76 376.241 107.71 376.362 107.662 376.483C107.713 376.354 107.766 376.226 107.816 376.096ZM108.778 373.456C108.72 373.627 108.662 373.797 108.603 373.966C108.662 373.797 108.72 373.627 108.778 373.456ZM109.734 370.404C109.678 370.599 109.621 370.794 109.563 370.988C109.621 370.794 109.678 370.599 109.734 370.404ZM109.488 371.234C109.439 371.398 109.389 371.562 109.339 371.725C109.389 371.562 109.439 371.398 109.488 371.234ZM112.102 359.329C112.068 359.557 112.032 359.785 111.997 360.011C112.032 359.785 112.068 359.557 112.102 359.329ZM112.486 356.458C112.457 356.704 112.426 356.948 112.396 357.191C112.426 356.948 112.457 356.704 112.486 356.458ZM113.18 348.329L113.178 348.363C113.178 348.366 113.177 348.369 113.177 348.373C113.178 348.358 113.179 348.343 113.18 348.329ZM118.123 287.69C118.169 287.377 118.213 287.065 118.26 286.753C118.213 287.065 118.169 287.377 118.123 287.69ZM92.3193 226.765C92.4158 226.58 92.5129 226.396 92.6104 226.211C92.5129 226.396 92.4158 226.58 92.3193 226.765ZM199.476 79.6382C199.208 79.8018 198.939 79.9631 198.672 80.1235C198.939 79.9631 199.208 79.8018 199.476 79.6382Z" />
                                        <path d="M452.372 372.033C452.377 371.977 452.379 371.92 452.371 371.861L452.372 371.868C452.379 371.924 452.377 371.98 452.372 372.033ZM447.604 339.934C448.982 352.247 450.253 363.111 452.062 370.605L452.352 371.76C450.583 365.001 449.327 355.127 448.036 343.771L447.604 339.934ZM447.016 371.126C447.603 371.34 448.149 371.535 448.651 371.713C448.149 371.535 447.603 371.34 447.016 371.126ZM350.482 197.779C352.999 199.614 356.53 202.094 360.507 204.907C366.99 209.494 375.143 215.303 383.496 221.601C391.861 227.907 400.355 234.651 407.534 241.098C414.823 247.643 420.342 253.522 423.146 258.097L423.148 258.098C431.396 271.539 435.753 293.495 438.754 316.144C440.24 327.356 441.346 338.283 442.508 348.198C443.162 353.78 443.838 359.08 444.614 363.806C432.004 358.888 408.876 348.63 384.337 331.568C352.632 309.524 318.956 276.396 302.211 229.115C311.223 223.418 333.661 209.16 350.482 197.779ZM442.843 302.641C444.211 311.072 445.292 319.652 446.247 327.896L446.246 327.896C446.087 326.523 445.925 325.142 445.758 323.753C444.923 316.799 443.984 309.668 442.843 302.641ZM440.979 292.261C441.452 294.642 441.895 297.052 442.312 299.48C442.015 297.75 441.705 296.029 441.379 294.32L440.979 292.261ZM431.058 260.069C434.955 268.027 437.862 277.746 440.132 288.186L440.562 290.215C438.868 282.064 436.804 274.305 434.209 267.42C434.101 267.133 433.992 266.847 433.882 266.563C433.002 264.293 432.062 262.122 431.057 260.068L431.058 260.069ZM430.291 258.551L430.677 259.305C430.465 258.886 430.25 258.473 430.033 258.065C430.119 258.227 430.206 258.388 430.291 258.551ZM427.744 254.145C427.923 254.419 428.096 254.69 428.262 254.96C428.775 255.796 429.272 256.661 429.756 257.551C429.272 256.661 428.775 255.796 428.262 254.96C428.097 254.691 427.923 254.419 427.744 254.145ZM424.41 249.667C425.568 251.07 426.596 252.429 427.473 253.735C426.596 252.429 425.568 251.07 424.41 249.667ZM303.814 248.738C304.111 249.367 304.411 249.992 304.714 250.615C304.424 250.018 304.135 249.418 303.851 248.815L303.814 248.738ZM420.338 245.102C420.71 245.492 421.074 245.88 421.431 246.266L422.475 247.416C421.795 246.655 421.081 245.883 420.338 245.102ZM299.922 239.923C300.419 241.131 300.928 242.33 301.446 243.52C300.928 242.33 300.419 241.131 299.922 239.923ZM416.798 241.531H416.799H416.798ZM404.312 230.387C405.315 231.223 406.304 232.06 407.277 232.895C406.791 232.477 406.3 232.06 405.806 231.642L404.312 230.387ZM302.566 221.792C300.153 223.323 298.21 224.55 296.898 225.377C298.21 224.55 300.153 223.323 302.566 221.792ZM308.732 217.87C307.551 218.623 306.422 219.341 305.356 220.019C306.422 219.341 307.551 218.623 308.732 217.87ZM316.275 213.042C314.761 214.015 313.288 214.957 311.872 215.862C313.288 214.957 314.761 214.015 316.275 213.042ZM319.797 210.776C319.191 211.167 318.589 211.555 317.993 211.938C318.589 211.555 319.191 211.167 319.797 210.776ZM357.262 195.258C361.643 198.372 367.846 202.713 374.814 207.749L377.796 209.913C369.626 203.958 362.26 198.81 357.262 195.258ZM323.735 208.232C323.109 208.638 322.487 209.041 321.868 209.44C322.487 209.041 323.109 208.638 323.735 208.232ZM327.948 205.497C327.343 205.891 326.74 206.285 326.138 206.676C326.74 206.285 327.343 205.891 327.948 205.497ZM332.062 202.812C331.406 203.241 330.749 203.672 330.093 204.101C330.749 203.672 331.406 203.241 332.062 202.812ZM336.328 200.01C335.689 200.431 335.049 200.853 334.407 201.275C335.049 200.853 335.689 200.431 336.328 200.01ZM339.792 197.717C339.389 197.984 338.985 198.255 338.579 198.523C338.985 198.255 339.389 197.984 339.792 197.717Z" />
                                        <path d="M332.122 614.359C332.111 615.123 332.085 615.798 332.053 616.38C332.028 616.829 332.37 617.127 332.742 617.153C332.37 617.128 332.028 616.83 332.053 616.38C332.085 615.798 332.111 615.122 332.122 614.358V614.359ZM334.22 615.925C334.265 615.876 334.31 615.828 334.355 615.779C334.31 615.828 334.265 615.876 334.22 615.925ZM334.935 615.184C334.964 615.154 334.994 615.125 335.023 615.096C334.994 615.125 334.964 615.154 334.935 615.184ZM335.274 614.851C335.308 614.818 335.342 614.785 335.376 614.753C335.342 614.785 335.308 614.818 335.274 614.851ZM335.607 614.535C335.653 614.492 335.699 614.449 335.745 614.406C335.699 614.449 335.653 614.492 335.607 614.535ZM336.367 613.85C336.408 613.814 336.448 613.779 336.488 613.744C336.448 613.779 336.408 613.814 336.367 613.85ZM336.691 613.57C336.743 613.526 336.796 613.483 336.848 613.439C336.796 613.483 336.743 613.526 336.691 613.57ZM330.866 600.329H330.867C330.932 600.679 330.993 601.026 331.052 601.368C331.169 602.053 331.274 602.721 331.368 603.373C331.651 605.33 331.838 607.136 331.955 608.772C331.994 609.318 332.026 609.844 332.051 610.351C331.914 607.564 331.575 604.181 330.866 600.329ZM338.295 612.296C338.311 612.284 338.327 612.273 338.343 612.261C338.327 612.273 338.311 612.284 338.295 612.296ZM339.772 611.255C339.904 611.166 340.037 611.079 340.171 610.992C340.037 611.079 339.904 611.166 339.772 611.255ZM340.596 610.719C340.742 610.626 340.89 610.534 341.038 610.442C340.89 610.534 340.742 610.626 340.596 610.719ZM341.522 610.147C341.641 610.077 341.761 610.008 341.88 609.938C341.761 610.008 341.641 610.077 341.522 610.147ZM342.396 609.641C342.546 609.556 342.698 609.472 342.85 609.389C342.698 609.472 342.546 609.556 342.396 609.641ZM343.317 609.133C343.445 609.065 343.574 608.999 343.702 608.932C343.574 608.999 343.445 609.065 343.317 609.133ZM344.266 608.639C344.42 608.56 344.577 608.485 344.732 608.408C344.577 608.485 344.42 608.56 344.266 608.639ZM345.171 608.191C345.392 608.085 345.616 607.982 345.84 607.878C345.616 607.982 345.392 608.085 345.171 608.191ZM346.605 607.53C346.772 607.456 346.937 607.38 347.104 607.308C346.937 607.38 346.772 607.456 346.605 607.53ZM347.602 607.098C347.761 607.03 347.92 606.962 348.08 606.896C347.92 606.962 347.761 607.03 347.602 607.098ZM348.669 606.658C348.802 606.605 348.934 606.551 349.067 606.499C348.934 606.551 348.802 606.605 348.669 606.658ZM349.649 606.276C349.791 606.223 349.932 606.168 350.074 606.115C349.932 606.168 349.791 606.223 349.649 606.276ZM350.697 605.888C350.816 605.845 350.935 605.801 351.054 605.759C350.935 605.801 350.816 605.845 350.697 605.888ZM351.722 605.527C351.84 605.487 351.958 605.445 352.077 605.405C351.958 605.445 351.84 605.487 351.722 605.527ZM449.369 388.026C450.635 393.924 453.543 402.299 460.234 410.175C469.791 421.422 486.284 430.747 514.065 431.352C511.378 443.6 504.258 470.44 488.653 499.552C469.358 535.548 437.328 574.603 385.034 594.262C381.912 594.292 372.992 594.558 362.911 596.451C354.979 597.941 345.52 600.576 337.676 605.466C335.995 589.981 328.714 564.161 301.558 538.712C305.565 520.614 331.434 428.409 449.369 388.026ZM352.659 605.212C352.827 605.157 352.996 605.103 353.164 605.049C352.996 605.103 352.827 605.157 352.659 605.212ZM353.673 604.888C353.837 604.836 354.002 604.786 354.167 604.735C354.002 604.786 353.837 604.836 353.673 604.888ZM354.717 604.569C354.882 604.52 355.048 604.472 355.214 604.424C355.048 604.472 354.882 604.52 354.717 604.569ZM355.725 604.278C355.915 604.224 356.106 604.172 356.297 604.119C356.106 604.172 355.915 604.224 355.725 604.278ZM356.763 603.992C356.994 603.93 357.226 603.869 357.457 603.809C357.226 603.869 356.994 603.93 356.763 603.992ZM357.72 603.74C357.971 603.676 358.223 603.612 358.475 603.55C358.223 603.612 357.971 603.676 357.72 603.74ZM358.834 603.461C359.042 603.41 359.25 603.362 359.458 603.312C359.25 603.362 359.042 603.41 358.834 603.461ZM359.854 603.219C360.075 603.168 360.295 603.12 360.515 603.07C360.295 603.12 360.075 603.168 359.854 603.219ZM360.911 602.98C361.062 602.947 361.213 602.916 361.364 602.884C361.213 602.916 361.062 602.947 360.911 602.98ZM362.248 602.697C362.483 602.649 362.717 602.601 362.951 602.555C362.717 602.601 362.483 602.649 362.248 602.697ZM363.224 602.502C363.465 602.455 363.706 602.408 363.946 602.362C363.706 602.408 363.465 602.455 363.224 602.502ZM364.35 602.287C364.563 602.248 364.775 602.209 364.987 602.171C364.775 602.209 364.563 602.248 364.35 602.287ZM365.309 602.115C365.54 602.075 365.77 602.034 366 601.995C365.77 602.034 365.54 602.075 365.309 602.115ZM366.259 601.952C366.518 601.909 366.776 601.867 367.032 601.826C366.776 601.867 366.518 601.909 366.259 601.952ZM367.378 601.771C367.514 601.75 367.65 601.729 367.785 601.708C367.65 601.729 367.514 601.75 367.378 601.771ZM369.471 601.463C369.561 601.45 369.651 601.438 369.74 601.426C369.651 601.438 369.561 601.45 369.471 601.463ZM370.559 601.318C370.952 601.267 371.342 601.217 371.727 601.171C371.342 601.217 370.952 601.267 370.559 601.318ZM372.528 601.078C372.845 601.042 373.158 601.007 373.468 600.974C373.158 601.007 372.845 601.042 372.528 601.078ZM374.229 600.896C374.582 600.86 374.93 600.826 375.271 600.794C374.93 600.826 374.582 600.86 374.229 600.896ZM375.879 600.739C376.223 600.709 376.562 600.681 376.894 600.654C376.562 600.681 376.223 600.709 375.879 600.739ZM377.424 600.612C377.796 600.584 378.158 600.557 378.512 600.533C378.158 600.557 377.796 600.584 377.424 600.612ZM378.875 600.509C379.252 600.484 379.618 600.462 379.972 600.442C379.618 600.462 379.252 600.484 378.875 600.509ZM380.246 600.426C380.593 600.407 380.928 600.391 381.249 600.376C380.928 600.391 380.593 600.407 380.246 600.426ZM381.543 600.362C381.8 600.351 382.048 600.341 382.286 600.332C382.048 600.341 381.8 600.351 381.543 600.362ZM386.003 600.26C385.634 600.257 384.469 600.255 382.713 600.315C383.753 600.28 384.585 600.266 385.168 600.261L386.003 600.26ZM387.539 599.732L386.263 600.21C386.968 599.949 387.67 599.683 388.368 599.415C388.092 599.521 387.816 599.628 387.539 599.732ZM328.451 590.535C328.27 589.948 328.083 589.353 327.884 588.753C328.083 589.353 328.27 589.948 328.451 590.535ZM423.339 581.596L422.295 582.271C422.793 581.951 423.288 581.629 423.781 581.306C423.634 581.402 423.487 581.499 423.339 581.596ZM323.653 578.195H323.652H323.653ZM321.555 574.005H321.556H321.555ZM312.761 560.132C313.317 560.881 313.858 561.627 314.384 562.371H314.383C313.857 561.627 313.316 560.881 312.76 560.132H312.761ZM308.602 554.858H308.603H308.602ZM302.448 548.009H302.449C302.695 548.263 302.938 548.518 303.18 548.772H303.179C302.937 548.518 302.694 548.263 302.448 548.009ZM297.546 530.155C296.187 534.96 295.482 538.354 295.188 539.905C295.448 538.531 296.031 535.713 297.104 531.749L297.546 530.155ZM304.074 511.285C301.71 517.1 299.921 522.291 298.584 526.64L298.038 528.451C299.334 524.055 301.13 518.655 303.576 512.521L304.074 511.285ZM306.244 506.153C306.051 506.593 305.862 507.029 305.675 507.463L305.123 508.755C305.485 507.9 305.858 507.032 306.244 506.153ZM491.146 507.463C491.039 507.653 490.93 507.843 490.821 508.034C490.93 507.843 491.039 507.653 491.146 507.463ZM309.379 499.356H309.38H309.379ZM323.979 473.85C323.275 474.902 322.59 475.952 321.919 476.995C321.584 477.517 321.252 478.037 320.925 478.557C320.27 479.595 319.631 480.627 319.008 481.654C318.384 482.681 317.776 483.702 317.184 484.717C316.726 485.5 316.279 486.28 315.839 487.055C318.273 482.767 320.975 478.347 323.979 473.85ZM328.397 467.485C329.167 466.418 329.954 465.347 330.759 464.273C329.954 465.347 329.167 466.418 328.397 467.485ZM337.125 456.187C336.231 457.268 335.356 458.349 334.498 459.429C335.356 458.349 336.231 457.268 337.125 456.187ZM339.861 452.94H339.862H339.861ZM348.755 443.208H348.754H348.755ZM353.597 438.37H353.598H353.597ZM363.128 429.664C362.49 430.214 361.858 430.765 361.232 431.317C361.858 430.765 362.49 430.214 363.128 429.664ZM375.779 419.512C374.859 420.198 373.952 420.89 373.052 421.582C373.952 420.89 374.859 420.198 375.779 419.512ZM383.077 414.289C382.018 415.018 380.969 415.747 379.935 416.483C380.969 415.747 382.018 415.018 383.077 414.289ZM418.155 394.19C417.68 394.415 417.207 394.64 416.735 394.866C417.207 394.64 417.68 394.415 418.155 394.19ZM444.506 383.366C443.864 383.593 443.225 383.822 442.588 384.053C443.225 383.822 443.864 383.593 444.506 383.366ZM421.276 582.919L421.243 582.94C420.959 583.12 420.672 583.298 420.386 583.477C420.683 583.291 420.981 583.106 421.276 582.919ZM513.17 457.205C512.958 457.855 512.743 458.513 512.521 459.178C512.743 458.513 512.958 457.855 513.17 457.205Z" />
                                        <path d="M288.893 785.5C288.858 785.898 288.587 786.122 288.287 786.172C288.566 786.126 288.818 785.929 288.881 785.582L288.893 785.5ZM287.675 786.012C287.732 786.06 287.796 786.095 287.864 786.123C287.837 786.112 287.809 786.101 287.783 786.087L287.675 786.012ZM287.484 785.744C287.511 785.808 287.541 785.866 287.581 785.916C287.541 785.866 287.511 785.808 287.484 785.744ZM296.996 744.516C293.509 755.84 290.866 767.968 289.372 780.901C290.778 768.729 293.201 757.27 296.389 746.522L296.996 744.516ZM286.371 776.389C286.427 776.792 286.479 777.197 286.532 777.602C286.479 777.197 286.427 776.792 286.371 776.389ZM285.346 769.767C285.411 770.149 285.473 770.534 285.537 770.918C285.473 770.534 285.411 770.149 285.346 769.767ZM284.561 765.471C284.6 765.675 284.638 765.88 284.677 766.085C284.638 765.88 284.6 765.675 284.561 765.471ZM284.131 763.315C284.192 763.613 284.25 763.912 284.31 764.211C284.25 763.912 284.192 763.613 284.131 763.315ZM283.69 761.229C283.734 761.428 283.775 761.629 283.817 761.829C283.775 761.629 283.734 761.428 283.69 761.229ZM283.214 759.084C283.269 759.324 283.322 759.566 283.376 759.807C283.322 759.566 283.269 759.324 283.214 759.084ZM282.728 756.996C282.791 757.262 282.852 757.528 282.914 757.795C282.852 757.528 282.791 757.262 282.728 756.996ZM282.206 754.865C282.287 755.188 282.365 755.511 282.444 755.835C282.365 755.511 282.287 755.188 282.206 754.865ZM288.168 567.516C296.638 574.976 317.677 597.775 314.719 638.172V638.181L314.718 638.188C314.303 644.075 321.724 648.278 326.37 643.281L326.371 643.282C329.002 640.46 340.077 630.834 371.198 629.511C347.706 647.781 304.217 689.061 288.157 753.93C272.095 689.055 228.599 647.777 205.11 629.509C236.255 630.827 247.338 640.459 249.96 643.276C254.605 648.281 262.033 644.077 261.618 638.188L261.617 638.181V638.172L261.542 637.063C259.044 597.357 279.776 574.907 288.168 567.516ZM281.697 752.877C281.766 753.142 281.833 753.407 281.901 753.673C281.833 753.407 281.766 753.142 281.697 752.877ZM281.16 750.866C281.202 751.018 281.242 751.17 281.283 751.322C281.242 751.17 281.202 751.018 281.16 750.866ZM280.588 748.81C280.638 748.985 280.686 749.16 280.735 749.336C280.686 749.16 280.638 748.985 280.588 748.81ZM279.999 746.771C280.073 747.021 280.144 747.271 280.217 747.521C280.144 747.271 280.073 747.021 279.999 746.771ZM279.382 744.723C279.471 745.014 279.558 745.306 279.646 745.598C279.558 745.306 279.471 745.014 279.382 744.723ZM278.764 742.744C278.868 743.073 278.971 743.404 279.074 743.734C278.971 743.404 278.868 743.073 278.764 742.744ZM306.342 719.942C303.365 726.477 300.644 733.346 298.262 740.552L297.62 742.525C298.886 738.562 300.254 734.698 301.712 730.934C302.198 729.679 302.694 728.436 303.199 727.203C304.21 724.738 305.259 722.318 306.342 719.941V719.942ZM278.153 740.858C278.234 741.104 278.313 741.351 278.394 741.598C278.313 741.351 278.234 741.104 278.153 740.858ZM277.514 738.945C277.567 739.102 277.62 739.26 277.673 739.417C277.62 739.26 277.567 739.102 277.514 738.945ZM276.823 736.948C276.905 737.181 276.985 737.415 277.066 737.648C276.985 737.415 276.905 737.181 276.823 736.948ZM276.162 735.099C276.226 735.274 276.288 735.45 276.352 735.626C276.288 735.45 276.226 735.274 276.162 735.099ZM275.45 733.163C275.529 733.374 275.607 733.586 275.686 733.798C275.607 733.586 275.529 733.374 275.45 733.163ZM274.754 731.329C274.815 731.487 274.875 731.646 274.936 731.805C274.875 731.646 274.815 731.487 274.754 731.329ZM273.972 729.328C274.077 729.592 274.18 729.858 274.284 730.123C274.18 729.858 274.077 729.592 273.972 729.328ZM273.259 727.559C273.355 727.794 273.45 728.03 273.545 728.266C273.45 728.03 273.355 727.794 273.259 727.559ZM272.507 725.74C272.595 725.95 272.681 726.161 272.769 726.371C272.681 726.161 272.595 725.95 272.507 725.74ZM271.759 723.979C271.829 724.142 271.898 724.305 271.968 724.469C271.898 724.305 271.829 724.142 271.759 723.979ZM270.956 722.138C271.02 722.281 271.083 722.425 271.146 722.569C271.083 722.425 271.02 722.281 270.956 722.138ZM270.169 720.378C270.245 720.547 270.321 720.716 270.397 720.886C270.321 720.716 270.245 720.547 270.169 720.378ZM269.31 718.504C269.427 718.756 269.543 719.009 269.659 719.263C269.543 719.009 269.427 718.756 269.31 718.504ZM316.892 699.753C313.767 705.029 310.78 710.582 307.991 716.411L307.16 718.168C307.985 716.403 308.827 714.662 309.687 712.946C311.406 709.515 313.193 706.183 315.033 702.951C315.647 701.874 316.267 700.807 316.892 699.752V699.753ZM268.527 716.842C268.631 717.06 268.734 717.278 268.837 717.497C268.734 717.278 268.631 717.06 268.527 716.842ZM267.696 715.113C267.783 715.292 267.869 715.471 267.956 715.65C267.869 715.471 267.783 715.292 267.696 715.113ZM266.87 713.437C266.95 713.596 267.029 713.757 267.108 713.917C267.029 713.757 266.95 713.596 266.87 713.437ZM266.009 711.725C266.087 711.878 266.164 712.031 266.242 712.185C266.164 712.031 266.087 711.878 266.009 711.725ZM265.144 710.045C265.23 710.211 265.316 710.378 265.402 710.545C265.316 710.378 265.23 710.211 265.144 710.045ZM264.304 708.448C264.355 708.545 264.406 708.641 264.457 708.737C264.406 708.641 264.355 708.545 264.304 708.448ZM263.38 706.729C263.462 706.88 263.544 707.032 263.626 707.184C263.544 707.032 263.462 706.88 263.38 706.729ZM262.513 705.147C262.578 705.265 262.643 705.383 262.708 705.501C262.643 705.383 262.578 705.265 262.513 705.147ZM261.615 703.545C261.67 703.641 261.724 703.738 261.778 703.834C261.724 703.738 261.67 703.641 261.615 703.545ZM260.668 701.887C260.752 702.033 260.836 702.179 260.92 702.325C260.836 702.179 260.752 702.033 260.668 701.887ZM259.758 700.324C259.83 700.447 259.902 700.57 259.974 700.692C259.902 700.57 259.83 700.447 259.758 700.324ZM258.811 698.73C258.893 698.868 258.975 699.005 259.058 699.143C258.975 699.005 258.893 698.868 258.811 698.73ZM257.854 697.149C257.957 697.317 258.058 697.485 258.16 697.652C258.058 697.485 257.957 697.317 257.854 697.149ZM256.931 695.651C257.013 695.783 257.094 695.915 257.176 696.047C257.094 695.915 257.013 695.783 256.931 695.651ZM255.97 694.122C256.057 694.26 256.144 694.398 256.231 694.536C256.144 694.398 256.057 694.26 255.97 694.122ZM255.012 692.623C255.1 692.76 255.188 692.896 255.275 693.033C255.188 692.896 255.1 692.76 255.012 692.623ZM330.652 679.216C327.943 682.819 325.265 686.598 322.651 690.554C323.305 689.565 323.961 688.586 324.622 687.619C325.944 685.685 327.28 683.796 328.626 681.95C328.963 681.489 329.3 681.03 329.638 680.574L330.652 679.216ZM254.045 691.138C254.136 691.276 254.227 691.414 254.317 691.553C254.227 691.414 254.136 691.276 254.045 691.138ZM253.154 689.791C253.194 689.851 253.234 689.911 253.274 689.972C253.234 689.911 253.194 689.851 253.154 689.791ZM249.188 684.035C249.244 684.115 249.301 684.195 249.358 684.275C249.301 684.195 249.244 684.115 249.188 684.035ZM332.689 676.546H332.69H332.689ZM335.763 672.666H335.764H335.763ZM350.079 656.524C349.408 657.216 348.735 657.919 348.06 658.633C348.735 657.919 349.408 657.216 350.079 656.524ZM358.928 647.853C357.336 649.335 355.715 650.886 354.069 652.506H354.068C354.397 652.182 354.726 651.86 355.053 651.542C356.361 650.268 357.655 649.039 358.928 647.853ZM219.971 650.304C220.123 650.45 220.276 650.597 220.429 650.744C220.276 650.597 220.123 650.45 219.971 650.304ZM218.101 648.528C218.224 648.644 218.347 648.76 218.471 648.877C218.347 648.76 218.224 648.644 218.101 648.528ZM216.206 646.768C216.327 646.879 216.448 646.991 216.569 647.103C216.448 646.991 216.327 646.879 216.206 646.768ZM214.462 645.179C214.504 645.217 214.546 645.256 214.589 645.294C214.546 645.256 214.504 645.217 214.462 645.179ZM212.573 643.494C212.648 643.561 212.724 643.627 212.8 643.693C212.724 643.627 212.648 643.561 212.573 643.494ZM233.89 627.916C245.966 631.58 251.886 636.539 254.353 639.19C254.502 639.353 254.689 639.425 254.872 639.428C254.689 639.425 254.503 639.353 254.353 639.19C251.886 636.539 245.965 631.58 233.89 627.916ZM332.197 631.942C332.67 631.705 333.16 631.468 333.668 631.231C333.16 631.468 332.67 631.705 332.197 631.942ZM336.075 630.176V630.177V630.176ZM320.73 622.947C320.884 625.055 320.976 627.218 320.998 629.437C320.976 627.218 320.884 625.055 320.73 622.947ZM382.57 628.544H382.571H382.57ZM229.439 626.699C230.965 627.073 232.408 627.468 233.773 627.88C232.408 627.468 230.965 627.073 229.439 626.699ZM211.524 623.898C218.451 624.47 224.354 625.458 229.371 626.683C224.354 625.458 218.451 624.47 211.524 623.898ZM348.323 626.361V626.362V626.361ZM356.163 624.892C357.572 624.68 359.033 624.487 360.549 624.314C359.033 624.487 357.572 624.68 356.163 624.892ZM204.712 623.489C207.028 623.578 209.245 623.712 211.366 623.885C209.245 623.712 207.028 623.578 204.712 623.489ZM370.305 623.544C369.145 623.598 368.012 623.664 366.903 623.739L365.26 623.86C366.885 623.731 368.566 623.625 370.305 623.544ZM387.986 623.733C388.025 623.766 388.057 623.804 388.088 623.843C388.057 623.804 388.025 623.766 387.986 623.733ZM195.327 623.375C193.379 623.4 191.37 623.455 189.301 623.54C189.129 623.547 188.956 623.553 188.783 623.561V623.56C191.036 623.461 193.217 623.402 195.327 623.375ZM387.664 623.576C387.622 623.567 387.579 623.562 387.533 623.561C387.536 623.561 387.538 623.56 387.541 623.561L387.664 623.576ZM385.474 623.479C386.16 623.503 386.853 623.529 387.553 623.56H387.535C386.841 623.529 386.154 623.503 385.474 623.479ZM195.461 623.374C198.017 623.343 200.47 623.362 202.823 623.427C200.47 623.362 198.017 623.343 195.461 623.374ZM320.454 619.828C320.49 620.17 320.524 620.513 320.557 620.858L320.648 621.898C320.59 621.202 320.526 620.512 320.454 619.828ZM319.294 611.912C319.354 612.23 319.413 612.549 319.471 612.869L319.638 613.836C319.529 613.189 319.414 612.547 319.294 611.912ZM316.568 601.13V601.129V601.13ZM315.443 597.823V597.824V597.823ZM309.241 584.354C309.917 585.546 310.584 586.782 311.231 588.064C310.584 586.782 309.917 585.546 309.241 584.354ZM304.58 577.004C305.354 578.099 306.128 579.249 306.896 580.452C306.128 579.249 305.354 578.099 304.58 577.004ZM297.236 567.982C297.829 568.615 298.435 569.286 299.056 569.993C298.435 569.286 297.829 568.615 297.236 567.982ZM294.015 564.736C294.213 564.925 294.416 565.119 294.621 565.318L295.248 565.935C295.036 565.724 294.827 565.519 294.621 565.319L294.015 564.736ZM287.723 560.15L287.256 560.499C287.149 560.58 287.034 560.669 286.91 560.765C287.034 560.669 287.149 560.579 287.256 560.498L287.723 560.15ZM286.369 776.37L286.064 774.249C286.17 774.96 286.272 775.673 286.371 776.389C286.37 776.383 286.37 776.376 286.369 776.37ZM257.831 608.173C257.766 608.452 257.701 608.733 257.639 609.015C257.701 608.733 257.766 608.452 257.831 608.173ZM286.64 560.976C286.423 561.147 286.185 561.337 285.928 561.547C286.185 561.337 286.423 561.147 286.64 560.976Z" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_976_885">
                                            <rect width="575" height="754" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                                ${t('analysis.s5.title')}
                            </h3>
                            <p style="border-left: 3px solid var(--text-grey); padding-left: 12px; color: var(--text-grey); font-size: 16px; margin-bottom: 24px;">${t('analysis.s5.desc')}</p>
                            
                            <div style="display:flex; flex-direction: row; justify-content: space-between; gap:15px;">
                                ${p.artefacts.map(art => {
            const pieceName = t('artifact.' + art.type);

            if ((art.stars || 5) < 4) {
                return `
<div style="width: 100%; background:var(--bg-panel); padding:10px 12px; border-radius:8px; opacity:0.5;">
    <div style="display:flex; align-items:center; gap:10px; margin-bottom:6px;">
        <img src="${art.icon}" style="width:38px; height:38px; border-radius:8px;" alt="">
        <div>
            <p style="font-size:12px; color:var(--text-primary); font-weight:bold;">${pieceName}</p>
            <p style="font-size:11px; color:#6b7280;">${t('analysis.s5.unavailable', art.stars)}</p>
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
                    const color = tierIndex !== -1 ? colors[tierIndex] : 'var(--text-primary)';
                    const displayVal = (sub.key === "atk" || sub.key === "def" || sub.key === "hp") ? Math.round(rollValue) : rollValue.toFixed(1);
                    const plusSign = (index < details.rolls.length - 1) ? ' <span style="color:#555;">+</span> ' : '';
                    return `<span style="color:${color}; font-weight:bold;">${displayVal}</span>${plusSign}`;
                }).join('');

                return `
        <div style="padding: 4px 0; ${idx < art.subStats.length - 1 ? 'border-bottom: 1px dashed rgba(255,255,255,0.08);' : ''}">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 2px;">
                <p style="font-size:11px; color:var(--text-grey); display:flex; align-items:center; gap:4px;">
                    <img src="${ICON_BASE_PATH}${ICON_MAP[sub.key] || ICON_MAP['unknown']}" style="width:13px; height:13px;" alt="">
                    ${sub.label}
                </p>
                <p style="font-size:12px; color:var(--text-primary); font-weight:bold;">${formatValueDisplay(sub.key, sub.value)}</p>
            </div>
            <div style="font-size:11px; text-align:right; font-family: monospace; line-height: 1.2;">
                ${rollsHtml}
            </div>
        </div>
    `;
            }).join('');

            return `
<div style="width: 100%; background:var(--bg-panel); padding:10px 12px; border-radius:8px;">
    <div style="display:flex; align-items:center; gap:10px; margin-bottom:6px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom:8px;">
        <img src="${art.icon}" style="width:38px; height:38px; border-radius:8px; background-color: rgba(0,0,0,0.1)" alt="">
        <div style="display:flex; flex-direction:column; justify-content:center; gap: 2px;">
            <p style="font-size:12px; color:var(--text-primary); font-weight:bold; overflow:hidden; text-overflow:ellipsis;">
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
                            
                            <div style="display:flex; justify-content:center; gap:15px; margin-top:15px; font-size:11px; color:var(--text-grey); background:var(--bg-panel); padding: 8px; border-radius: 6px;">
                                <span style="display:flex; align-items:center; gap:4px;"><span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#6CED75;"></span>${t('analysis.s5.rollWeak')}</span>
                                <span style="display:flex; align-items:center; gap:4px;"><span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#00E497;"></span>${t('analysis.s5.rollMed')}</span>
                                <span style="display:flex; align-items:center; gap:4px;"><span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#00BFE9;"></span>${t('analysis.s5.rollStrong')}</span>
                                <span style="display:flex; align-items:center; gap:4px;"><span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#EE72F7;"></span>${t('analysis.s5.rollPerfect')}</span>
                            </div>
                        </div>
                        
                        <div style="margin: auto 10px; flex-grow: 1; width: unset; min-width: unset; background: none; border-color: var(--dotted-line); border-style: dashed; border-width: 1px 0 0; display: flex; clear: both;"></div>

                        <div>
                            <h3 style="color:var(--text-primary); font-size:24px; margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
                                <svg width="1em" height="1em" fill="var(--text-always-white)" aria-hidden="true" style="margin-bottom: 4px;" viewBox="0 0 720 719" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M405.85 503.18C405.69 502.99 405.34 502.66 404.77 502.62L318.72 496.92C314.18 496.62 309.92 494.07 308.01 489.94C305.97 485.52 306.75 480.45 309.97 476.87L522.79 239.9C523.01 239.66 523.13 239.34 523.13 239.02V44.99C523.13 20.14 502.99 0 478.14 0H44.99C20.14 0 0 20.14 0 44.99V653.06C0 677.91 20.14 698.05 44.99 698.05H305.24C305.61 698.05 305.95 697.91 306.2 697.64C338.85 662.84 395.97 590.83 406.17 504.19C406.22 503.73 406.03 503.38 405.85 503.17V503.18ZM280.15 438.88C277.64 447.04 270.11 452.61 261.57 452.61C253.04 452.61 245.5 447.04 243 438.88C238.33 423.68 234.67 410.88 231.57 400.02C224.19 374.21 220.12 359.98 214.05 353.92C207.99 347.85 193.76 343.78 167.93 336.39C157.07 333.28 144.27 329.62 129.06 324.94C120.9 322.43 115.33 314.9 115.33 306.36C115.33 297.82 120.9 290.29 129.06 287.78C144.27 283.11 157.08 279.44 167.93 276.35C193.76 268.96 207.98 264.9 214.04 258.84C220.1 252.77 224.17 238.55 231.55 212.72C234.65 201.87 238.31 189.06 242.98 173.85C245.49 165.69 253.02 160.12 261.56 160.12C270.1 160.12 277.63 165.69 280.14 173.85C284.81 189.05 288.48 201.86 291.59 212.72C298.99 238.55 303.06 252.78 309.12 258.84C315.18 264.9 329.4 268.97 355.21 276.35C366.07 279.46 378.87 283.11 394.08 287.78C402.23 290.29 407.81 297.82 407.81 306.36C407.81 314.9 402.24 322.43 394.08 324.94C378.88 329.62 366.08 333.28 355.22 336.39C329.41 343.79 315.18 347.85 309.12 353.92C303.06 359.99 298.98 374.21 291.59 400.03C288.48 410.88 284.82 423.68 280.14 438.88H280.15Z"/>
                                    <path d="M668.757 476.087L644.437 474.474L644.318 474.467L643.637 474.433C629.316 473.847 615.332 480.928 607.608 493.807C599.136 507.93 566.822 558.704 514.948 605.574C514.551 605.931 514.173 606.275 513.877 606.544C513.531 606.859 513.28 607.087 513.041 607.302L513.021 607.319L512.999 607.338C512.002 608.234 511.517 608.634 510.002 609.968C508.284 611.471 506.63 612.907 505.007 614.291C474.763 640.044 444.268 658.982 413.725 671.5L412.271 672.091C408.031 673.799 403.775 675.39 399.513 676.862L397.584 677.519C393.088 679.029 388.614 680.406 384.174 681.636C378.393 683.23 372.597 684.602 366.789 685.757C399.265 643.339 435.941 581.225 444.478 508.714L444.479 508.698L444.481 508.682C445.753 497.773 442.503 486.941 435.51 478.529C428.525 470.126 418.334 464.877 407.349 464.143L407.34 464.142H407.331L375.169 462.011L543.982 274.039L543.983 274.037L544.394 273.579L668.757 476.087Z"/>
                                    <path d="M520.096 638.196C516.182 641.471 512.255 644.645 508.317 647.72C512.263 644.639 516.198 641.458 520.119 638.177L520.096 638.196Z"/>
                                    <path d="M409.342 492.998C409.53 493.077 409.716 493.161 409.899 493.249C410.45 493.514 410.981 493.82 411.486 494.164C411.823 494.394 412.149 494.64 412.462 494.903L412.694 495.104C411.698 494.223 410.562 493.512 409.342 492.998Z"/>
                                    <path d="M406.363 492.173C406.477 492.189 406.59 492.206 406.703 492.226C406.804 492.243 406.905 492.262 407.006 492.282C406.793 492.24 406.578 492.204 406.363 492.173Z"/>
                                </svg>
                                ${t('analysis.s4.title')}
                            </h3>
                            <p style="border-left: 3px solid var(--text-grey); padding-left: 12px; color: var(--text-grey); font-size: 16px; margin-bottom: 24px;">${t('analysis.s4.desc')}</p>
                            <div style="padding-top: 10px;">
                                <p style="font-size:12px; color:var(--text-grey); text-transform:uppercase; margin-bottom:12px; letter-spacing:0.05em;">${t('analysis.s5a.title')}</p>
                                <p style="font-size:13px; color:var(--text-grey); margin-bottom:16px;">${t('analysis.s5a.desc')}</p>
                            </div>

                            <div style="display:flex; flex-direction:row; justify-content:space-between; gap:15px;">
                            ${p.artefacts.map(art => {
            const pieceName = t('artifact.' + art.type);

            if ((art.stars || 5) < 4) {
                return `
<div style="width:100%; background:var(--bg-panel); padding:10px 12px; border-radius:8px; opacity:0.5;">
    <div style="display:flex; align-items:center; gap:10px; margin-bottom:6px;">
        <img src="${art.icon}" style="width:38px; height:38px; border-radius:8px;" alt="">
        <div>
            <p style="font-size:12px; color:var(--text-primary); font-weight:bold;">${pieceName}</p>
            <p style="font-size:11px; color:#6b7280;">${t('analysis.s5.unavailable', art.stars)}</p>
        </div>
    </div>
</div>`;
            }

            const presentStats = new Set(art.subStats.map(s => s.key));
            const deadStats = [];
            art.subStats.forEach(sub => {
                let w = config.weights[sub.key];
                if (w === undefined && sub.key.includes("_dmg_")) w = config.weights["elemental_dmg_"];
                if (!w || w === 0) {
                    const rolls = getRollCount(sub.key, sub.value, art.stars || 5);
                    if (rolls > 0) deadStats.push({ key: sub.key, rolls });
                }
            });

            const desiredStats = Object.entries(config.weights)
                .filter(([k, w]) => w > 0)
                .sort((a, b) => b[1] - a[1])
                .map(([k]) => k);

            const replacementMap = {};
            const usedTargets = new Set(presentStats);
            deadStats.forEach(dead => {
                const targetKey = desiredStats.find(k =>
                    !usedTargets.has(k) &&
                    !k.includes("_dmg_") &&
                    k !== art.mainStat.key &&
                    SUBSTAT_RANGES[k]
                );
                if (targetKey) {
                    usedTargets.add(targetKey);
                    const range = SUBSTAT_RANGES[targetKey];
                    const minVal = (range.min * dead.rolls).toFixed(1);
                    const maxVal = (range.max * dead.rolls).toFixed(1);
                    const suffix = ['hp','atk','def','eleMas'].includes(targetKey) ? '' : '%';
                    replacementMap[dead.key] = {
                        key: targetKey,
                        label: STAT_LABELS[targetKey] || targetKey,
                        minVal, maxVal, suffix
                    };
                    if (!s4TotalGains[targetKey]) s4TotalGains[targetKey] = 0;
                    s4TotalGains[targetKey] += dead.rolls;
                }
            });

            const hasDead = Object.keys(replacementMap).length > 0;

            const subsHtml = art.subStats.map((sub, idx) => {
                const replacement = replacementMap[sub.key];
                const isDead = !!replacement;
                const divider = idx < art.subStats.length - 1
                    ? 'border-bottom: 1px dashed rgba(255,255,255,0.08); padding-bottom: 12px; margin-bottom: 12px;'
                    : '';

                if (isDead) {
                    return `
<div style="${divider}">
    <div style="display:flex; justify-content:space-between; align-items:center;">
        <div style="display:flex; flex-direction:row; align-items:center; gap:4px; opacity:0.4; text-decoration:line-through;">
            <img src="${ICON_BASE_PATH}${ICON_MAP[sub.key] || ICON_MAP['unknown']}" style="width:15px; height:15px; flex-shrink:0;" alt="">
            <p style="font-size:11px; white-space:nowrap;">${sub.label}</p>
        </div>
        <p style="font-size:11px; opacity:0.4; text-decoration:line-through; flex-shrink:0; margin-left:4px;">${formatValueDisplay(sub.key, sub.value)}</p>
    </div>
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:3px;">
        <div style="display:flex; flex-direction:row; align-items:center; gap:4px;">
            <span style="color:var(--text-grey); font-size:10px; padding-left:2px;">↳</span>
            <img src="${ICON_BASE_PATH}${ICON_MAP[replacement.key] || ICON_MAP['unknown']}" style="width:15px; height:15px; flex-shrink:0;" alt="">
            <p style="font-size:11px; color:var(--accent-gold);">${replacement.label}</p>
        </div>
        <p style="font-size:11px; color:var(--accent-gold); flex-shrink:0; margin-left:4px;">${replacement.minVal}–${replacement.maxVal}${replacement.suffix}</p>
    </div>
</div>`;
                } else {
                    const rolls = getRollCount(sub.key, sub.value, art.stars || 5);
                    return `
<div style="display:flex; justify-content:space-between; align-items:center; ${divider}">
    <div style="display:flex; flex-direction:row; align-items:center; gap:5px;">
        <img src="${ICON_BASE_PATH}${ICON_MAP[sub.key] || ICON_MAP['unknown']}" style="width:15px; height:15px;" alt="">
        <p style="font-size:11px; color:var(--text-primary);">${sub.label}</p>
    </div>
    <p style="font-size:11px; color:var(--text-primary);">${formatValueDisplay(sub.key, sub.value)}</p>
</div>`;
                }
            }).join('');

            return `
<div style="flex:1; min-width:0; background:var(--bg-panel); padding:10px 12px; border-radius:8px; box-sizing:border-box; display:flex; flex-direction:column; gap:0; ${!hasDead ? 'opacity:0.6;' : ''}">

    <div style="display:flex; align-items:center; gap:10px; padding-bottom:8px; border-bottom:1px dashed rgba(255,255,255,0.1);">
        <div style="position:relative; display:inline-block; flex-shrink:0;">
            <img src="${art.icon}" style="width:38px; height:38px; border-radius:8px; border:2px solid ${art.stars === 5 ? '#FFB13B' : art.stars === 4 ? '#a855f7' : '#6b7280'};" alt="">
            <p style="position:absolute; bottom:7px; right:1px; background:rgba(0,0,0,0.4); color:rgba(255,255,255,0.8); font-size:10px; padding:1px 4px; border-radius:8px;">+${art.level}</p>
        </div>
        <div style="overflow:hidden; display:flex; flex-direction:column; justify-content:center; gap:1px; min-width:0;">
            <p style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-size:12px; font-weight:bold;">${pieceName}</p>
            <p style="font-size:11px; color:var(--accent-gold); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${art.setName}</p>
            <p style="font-size:10px; color:rgba(255,255,255,0.4);">${art.stars}★</p>
        </div>
    </div>

    

    <div style="display:flex; flex-direction:column; padding-top:12px; gap:0;">
        ${subsHtml}
    </div>
    ${!hasDead ? `<p style="margin-top:10px; text-align:center; background:#22c55e20; color:#22c55e; padding:4px; border-radius:4px; font-size:12px; border:1px solid #22c55e40;">${t('analysis.s4.optimal')}</p>` : ''}

</div>`;
        }).join('')}
                            </div>
                            
                            ${(() => {
                const gainKeys = Object.keys(s4TotalGains);
                if (gainKeys.length === 0) return '';

                let summaryHtml = `
                                <div style="margin-top: 20px; background: var(--bg-panel); padding: 15px; border-radius: 8px;">
                                    <p style="font-size: 12px; color: var(--text-grey); text-transform: uppercase; margin-bottom: 12px; letter-spacing: 0.05em;">${t('analysis.s4.totalGains')}</p>
                                    <div style="display: flex; flex-wrap: wrap; gap: 10px;">`;

                gainKeys.sort((a, b) => s4TotalGains[b] - s4TotalGains[a]).forEach(key => {
                    const rolls = s4TotalGains[key];
                    const range = SUBSTAT_RANGES[key];
                    const minVal = (range.min * rolls).toFixed(1);
                    const maxVal = (range.max * rolls).toFixed(1);
                    const suffix = ['hp', 'atk', 'def', 'eleMas'].includes(key) ? '' : '%';
                    const label = STAT_LABELS[key] || key;
                    const icon = ICON_BASE_PATH + (ICON_MAP[key] || ICON_MAP['unknown']);

                    summaryHtml += `
                                        <div style="display: flex; align-items: center; gap: 8px; background: rgba(0,0,0,0.1); padding: 8px 12px; border-radius: 6px;">
                                            <img src="${icon}" style="width: 18px; height: 18px;" alt="">
                                            <div style="display: flex; flex-direction: column;">
                                                <span style="font-size: 11px; color: var(--text-grey);">${label}</span>
                                                <span style="font-size: 13px; color: var(--accent-gold); font-weight: bold;">+${minVal} ${t('sim.range')} ${maxVal}${suffix}</span>
                                            </div>
                                        </div>
                                    `;
                });

                summaryHtml += `</div></div>`;
                return summaryHtml;
            })()}
                            
                            <div style="margin-top: 48px;">
                                <p style="font-size:12px; color:var(--text-grey); text-transform:uppercase; margin-bottom:12px; letter-spacing:0.05em;">${t('analysis.s5b.title')}</p>
                                <p style="font-size:13px; color:var(--text-grey); margin-bottom:16px;">${t('analysis.s5b.desc')}</p>

                                <div style="display:flex; flex-direction: row; justify-content: space-between; gap:15px;">
                                    ${p.artefacts.map(art => {
            const pieceName = t('artifact.' + art.type);

            if ((art.stars || 5) < 4) {
                return `
<div style="width: 100%; background:var(--bg-panel); padding:10px 12px; border-radius:8px; opacity:0.5;">
    <div style="display:flex; align-items:center; gap:10px; margin-bottom:6px;">
        <img src="${art.icon}" style="width:38px; height:38px; border-radius:8px;" alt="">
        <div>
            <p style="font-size:12px; color:var(--text-primary); font-weight:bold;">${pieceName}</p>
            <p style="font-size:11px; color:#6b7280;">${t('analysis.s5b.unavailable', art.stars)}</p>
        </div>
    </div>
</div>`;
            }

            const maxRollsRef = (art.stars === 4 && window.MAX_ROLLS_4) ? window.MAX_ROLLS_4 : window.MAX_ROLLS;

            const subsMaxHtml = art.subStats.map((sub, idx) => {
                const details = getRollDetails(sub.key, sub.value, art.stars || 5);
                const rollCount = details.k;
                const maxRollVal = maxRollsRef[sub.key];

                if (!maxRollVal || rollCount === 0) {
                    return `
        <div style="padding: 4px 0; ${idx < art.subStats.length - 1 ? 'border-bottom: 1px dashed rgba(255,255,255,0.08);' : ''}">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <p style="font-size:11px; color:var(--text-grey); display:flex; align-items:center; gap:4px;">
                    <img src="${ICON_BASE_PATH}${ICON_MAP[sub.key] || ICON_MAP['unknown']}" style="width:13px; height:13px;" alt="">
                    ${sub.label}
                </p>
                <p style="font-size:12px; color:var(--text-primary); font-weight:bold;">${formatValueDisplay(sub.key, sub.value)}</p>
            </div>
        </div>`;
                }

                const isFlat = ['hp', 'atk', 'def', 'eleMas'].includes(sub.key);
                const suffix = isFlat ? '' : '%';
                const maxTotal = maxRollVal * rollCount;
                const displayMax = isFlat ? Math.round(maxTotal) : parseFloat(maxTotal.toFixed(1));

                const singleDisplay = isFlat ? Math.round(maxRollVal) : maxRollVal.toFixed(1);
                const rollsHtml = Array(rollCount).fill(singleDisplay).map((v, i) => {
                    const plus = i < rollCount - 1 ? ' <span style="color:#555;">+</span> ' : '';
                    return `<span style="color:#EE72F7; font-weight:bold;">${v}</span>${plus}`;
                }).join('');

                const delta = maxTotal - sub.value;
                const deltaDisplay = isFlat ? Math.round(delta) : parseFloat(delta.toFixed(1));
                const deltaHtml = delta > 0.01
                    ? `<span style="color:#22c55e; font-size:10px; font-family:ShinShin, Inter, sans-serif;">(+${deltaDisplay}${suffix})</span>`
                    : '';

                return `
        <div style="padding: 4px 0; ${idx < art.subStats.length - 1 ? 'border-bottom: 1px dashed rgba(255,255,255,0.08);' : ''}">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 2px;">
                <p style="font-size:11px; color:var(--text-grey); display:flex; align-items:center; gap:4px;">
                    <img src="${ICON_BASE_PATH}${ICON_MAP[sub.key] || ICON_MAP['unknown']}" style="width:13px; height:13px;" alt="">
                    ${sub.label}
                </p>
                <p style="font-size:12px; color:var(--text-primary); font-weight:bold;">${displayMax}${suffix}</p>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px; font-family:monospace; line-height:1.2;">
                ${deltaHtml}
                <div style="text-align:right; flex: auto;">${rollsHtml}</div>
            </div>
        </div>`;
            }).join('');

            return `
<div style="width: 100%; background:var(--bg-panel); padding:10px 12px; border-radius:8px;">
    <div style="display:flex; align-items:center; gap:10px; margin-bottom:6px; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom:8px;">
        <img src="${art.icon}" style="width:38px; height:38px; border-radius:8px; background-color: rgba(0,0,0,0.1)" alt="">
        <div>
            <p style="font-size:12px; color:var(--text-primary); font-weight:bold; overflow:hidden; text-overflow:ellipsis;">${pieceName}</p>
        </div>
    </div>
    <div style="display:flex; flex-direction:column; gap:0;">
        ${subsMaxHtml}
    </div>
</div>`;
        }).join('')}
                                </div>

                                ${(() => {
            const s5bGains = {};
            p.artefacts.forEach(art => {
                if ((art.stars || 5) < 4) return;
                const maxRollsRef = (art.stars === 4 && window.MAX_ROLLS_4) ? window.MAX_ROLLS_4 : window.MAX_ROLLS;
                art.subStats.forEach(sub => {
                    const details = getRollDetails(sub.key, sub.value, art.stars || 5);
                    const maxRollVal = maxRollsRef[sub.key];
                    if (!maxRollVal || details.k === 0) return;
                    const delta = (maxRollVal * details.k) - sub.value;
                    if (delta <= 0.01) return;
                    if (!s5bGains[sub.key]) s5bGains[sub.key] = { delta: 0, label: sub.label };
                    s5bGains[sub.key].delta += delta;
                });
            });

            const gainKeys = Object.keys(s5bGains);
            if (gainKeys.length === 0) return '';

            let html = `
                                <div style="margin-top: 20px; background: var(--bg-panel); padding: 15px; border-radius: 8px;">
                                    <p style="font-size: 12px; color: var(--text-grey); text-transform: uppercase; margin-bottom: 12px; letter-spacing: 0.05em;">${t('analysis.s4.totalGains')}</p>
                                    <div style="display: flex; flex-wrap: wrap; gap: 10px;">`;

            gainKeys.sort((a, b) => {
                let wa = config.weights[a]; if (wa === undefined && a.includes('_dmg_')) wa = config.weights['elemental_dmg_']; wa = wa || 0;
                let wb = config.weights[b]; if (wb === undefined && b.includes('_dmg_')) wb = config.weights['elemental_dmg_']; wb = wb || 0;
                if (wb !== wa) return wb - wa;
                return s5bGains[b].delta - s5bGains[a].delta;
            }).forEach(key => {
                const { delta, label } = s5bGains[key];
                const isFlat = ['hp', 'atk', 'def', 'eleMas'].includes(key);
                const suffix = isFlat ? '' : '%';
                const displayDelta = isFlat ? Math.round(delta) : parseFloat(delta.toFixed(1));
                const icon = ICON_BASE_PATH + (ICON_MAP[key] || ICON_MAP['unknown']);
                let w = config.weights[key];
                if (w === undefined && key.includes('_dmg_')) w = config.weights['elemental_dmg_'];
                const opacity = (w && w > 0) ? '1' : '0.4';

                html += `
                                        <div style="display: flex; align-items: center; gap: 8px; background: rgba(0,0,0,0.1); padding: 8px 12px; border-radius: 6px; opacity: ${opacity};">
                                            <img src="${icon}" style="width: 18px; height: 18px;" alt="">
                                            <div style="display: flex; flex-direction: column;">
                                                <span style="font-size: 11px; color: var(--text-grey);">${label}</span>
                                                <span style="font-size: 13px; color: var(--accent-gold); font-weight: bold;">+${displayDelta}${suffix}</span>
                                            </div>
                                        </div>`;
            });

            html += `</div></div>`;
            return html;
        })()}
                            </div>

                        </div>

                        <div style="margin: auto 10px; flex-grow: 1; width: unset; min-width: unset; background: none; border-color: var(--dotted-line); border-style: dashed; border-width: 1px 0 0; display: flex; clear: both;"></div>

                        <div>
                            <h3 style="color:var(--text-primary); font-size:24px; margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
                                <svg width="1em" height="1em" fill="var(--text-always-white)" aria-hidden="true" style="margin-bottom: 4px;" viewBox="0 0 182 171" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_976_912)">
                                    <path d="M70.2666 98.4775L69.7266 98.2139C69.6365 98.169 69.5475 98.121 69.457 98.0752C69.7292 98.2128 69.9986 98.3487 70.2666 98.4775Z" />
                                    <path d="M13.0645 1.08594C23.3112 1.84257 29.7244 6.67809 33.6514 11.5215C37.2843 16.0024 38.7966 20.5009 39.1836 21.8076L39.2832 22.1631L40.9121 28.5283L42.8799 28.3301L43.21 21.7598V21.7559C43.2204 21.5271 43.339 19.0575 43.2441 15.9238C43.1672 13.3828 42.9482 10.3437 42.3955 7.69531C46.6228 8.93647 54.0464 11.3693 61.0088 14.9092C65.0046 16.9408 68.8092 19.3177 71.7646 22.0146C74.7256 24.7168 76.7615 27.6732 77.3682 30.8574L78.7676 38.1934L81.9287 29.1182C85.7723 32.3671 93.9013 40.8642 96.4238 56.291C96.4467 56.4476 96.4673 56.6058 96.4893 56.7715C96.5113 56.9379 96.5348 57.1133 96.5605 57.2891C96.6389 57.8472 96.7079 58.4259 96.7783 59.0098L98.7217 59.1992C99.2843 57.4711 99.9174 55.4264 100.408 53.625C100.623 52.8382 100.81 52.0894 100.955 51.4297C102.731 53.3484 105.099 56.2924 107.618 59.6094C110.739 63.719 114.038 68.3291 116.631 72.0908C115.723 76.1862 114.917 80.8624 114.626 85.4873C112.677 84.6836 109.724 83.3589 106.271 81.4678C105.651 78.2197 103.091 76.1876 100.501 74.9414C97.9073 73.6937 95.0668 73.1216 93.4268 72.8721C93.3371 72.8005 93.2438 72.7286 93.1465 72.6484L93.1455 72.6475L91.0156 70.8975L91.0146 70.8965L89.9336 70.0088C88.6877 68.7667 87.0647 67.3076 85.1562 65.6924L84.3115 64.9824C75.1109 57.3026 59.8493 46.2576 46.9131 37.1494C40.4398 32.5917 34.5393 28.5129 30.2578 25.5732C28.1173 24.1036 26.381 22.9183 25.1797 22.1006C24.5791 21.6918 24.1118 21.3741 23.7949 21.1592C23.6369 21.052 23.5159 20.9701 23.4346 20.915C23.394 20.8876 23.3624 20.8665 23.3418 20.8525L23.3125 20.833L23.3105 20.8311L22.1455 22.4561L88.3945 72.793L88.457 72.8809L88.4619 72.8877L90.2393 75.3359L90.2402 75.3379C90.2503 75.3531 90.2602 75.3663 90.2656 75.374C90.2768 75.3897 90.2892 75.4068 90.2988 75.4199C90.3223 75.4518 90.3436 75.4806 90.3779 75.5273C90.4134 75.5757 90.4559 75.6372 90.5068 75.709C90.6837 77.2338 91.124 79.7677 92.207 82.1768C93.302 84.6124 95.1208 87.058 98.1123 88.0684C99.1693 90.1136 100.086 92.1465 100.693 93.9844C94.8014 94.2342 79.9421 95.098 70.8896 97.666C66.0998 95.3933 60.4951 91.5634 56.5264 88.6699L54.8984 87.4688C54.2511 86.9808 53.6759 86.5437 53.2012 86.1777C53.0973 86.0975 52.9979 86.0193 52.9023 85.9453L53.9717 85.2881L51.6494 84.7188C46.1424 83.3681 42.4466 80.6943 40.1006 78.2803C40.8642 78.483 41.661 78.6631 42.4668 78.7969C44.5377 79.1407 46.7817 79.206 48.6934 78.5098C50.4506 77.8696 51.745 76.6799 52.4785 74.9883C53.3563 72.9643 52.8298 71.3891 52.1621 70.4385C51.1464 68.9784 49.238 68.147 47.3037 67.6416C46.0379 67.3109 44.6611 67.0957 43.3135 66.958C44.0461 66.0672 44.55 65.1531 44.8916 64.3672C45.1713 63.7236 45.3462 63.1583 45.4521 62.749C45.5052 62.5442 45.5412 62.3771 45.5645 62.2578C45.5761 62.1982 45.585 62.1501 45.5908 62.1152C45.5937 62.0978 45.596 62.0831 45.5977 62.0723C45.5985 62.067 45.5991 62.0622 45.5996 62.0586C45.5999 62.0568 45.6004 62.0551 45.6006 62.0537V62.0498L45.6016 62.0469L45.6816 61.4668L45.4385 60.9414L45.4355 60.9336L44.7344 59.4727C37.5009 44.6303 30.455 37.6423 23.918 34.6943C17.1505 31.6427 11.1345 33.0259 6.58984 34.0547L6.58203 34.0566L6.57324 34.0586C6.13366 34.166 5.70449 34.264 5.28613 34.3516L5.27734 34.3535C4.51988 34.5192 3.69134 34.6313 2.96484 34.5869C2.22043 34.5413 1.7476 34.3424 1.49219 34.0596C1.25269 33.7918 1.08775 33.3471 1.03223 32.7275C1.01381 32.5217 1.00822 32.3089 1.01367 32.0957C2.96643 32.7526 4.71506 32.8782 6.25098 32.3193L6.25195 32.3203C8.83968 31.3803 9.87334 28.867 10.626 27.1328C10.9443 26.409 11.215 25.7943 11.5166 25.3076C11.8214 24.8159 12.0731 24.5994 12.2754 24.5176L12.2744 24.5166C13.605 23.9825 14.7654 24.2262 15.6416 24.6357C16.5328 25.0524 17.0807 25.6232 17.0811 25.623L17.0859 25.6279L17.0908 25.6338L21.834 30.6963L20.5127 23.8896C18.7687 14.9001 15.06 5.66786 13.0645 1.08594Z"/>
                                    <path d="M100.704 91.2012C100.98 91.8507 101.232 92.4905 101.453 93.1143L101.613 93.5781C101.459 93.1168 101.286 92.6456 101.099 92.167L100.704 91.2012Z" />
                                    <path d="M57.6172 90.6855C57.0293 90.2678 56.465 89.8625 55.9316 89.4736L54.3008 88.2695C55.2636 88.9881 56.3875 89.8117 57.6172 90.6855Z" />
                                    <path d="M99.3223 88.2354C99.4893 88.5674 99.6527 88.8993 99.8115 89.2305L100.273 90.2207C100.124 89.8919 99.9704 89.5617 99.8115 89.2305L99.3223 88.2354Z" />
                                    <path d="M97.3213 86.6455C97.628 86.8082 97.951 86.951 98.29 87.0732L98.5469 87.1611C98.1128 87.0221 97.7046 86.8488 97.3213 86.6455Z" />
                                    <path d="M94.0664 83.5283C94.7003 84.5154 95.4835 85.4094 96.4492 86.1025C96.0352 85.8054 95.6541 85.472 95.3047 85.1094C95.1882 84.9885 95.0755 84.8642 94.9658 84.7373C94.637 84.357 94.338 83.9512 94.0664 83.5283Z" />
                                    <path d="M91.9434 78.1846C92.1688 79.1693 92.4846 80.2477 92.9238 81.3115C92.6103 80.552 92.3588 79.7849 92.1592 79.0498C92.0793 78.7554 92.0078 78.4661 91.9434 78.1846Z" />
                                    <path d="M116.101 80.7217C116.068 80.97 116.036 81.2187 116.006 81.4678C116.074 80.9092 116.148 80.3526 116.228 79.7988L116.101 80.7217Z" />
                                    <path d="M88.793 70.29L89.2705 70.7598C89.1092 70.5984 88.9403 70.4338 88.7656 70.2646C88.7746 70.2733 88.7841 70.2814 88.793 70.29Z" />
                                    <path d="M51.3242 41.4941L51.2803 41.4629C51.1209 41.3497 50.9608 41.2379 50.8018 41.125C50.9754 41.2482 51.1501 41.3705 51.3242 41.4941Z" />
                                    <path d="M87.7627 33.7373C89.0578 35.3592 90.3974 37.2813 91.668 39.5225C91.3748 39.0053 91.0785 38.5049 90.7793 38.0215C90.3803 37.3769 89.977 36.7623 89.5732 36.1768C89.1696 35.5914 88.7651 35.0353 88.3633 34.5078L87.7627 33.7373Z" />
                                    <path d="M4.86914 35.4512C4.82519 35.4586 4.78067 35.4637 4.73633 35.4707C4.7876 35.4626 4.83891 35.456 4.88965 35.4473L4.86914 35.4512Z" />
                                    <path d="M83.4004 29.0762C83.8665 29.4973 84.3722 29.9771 84.9062 30.5176C84.7282 30.3373 84.5532 30.1649 84.3818 29.998C84.0392 29.6644 83.7112 29.357 83.4004 29.0762Z" />
                                    <path d="M15.6514 23.5557C16.945 24.0448 17.763 24.8873 17.8203 24.9502C17.7662 24.8907 17.0323 24.1355 15.8604 23.6396L15.6514 23.5557Z" />
                                    <path d="M59.9414 13.2646C65.2776 15.8383 70.5083 19.0532 74.0596 22.877C73.8905 22.6949 73.7166 22.5143 73.54 22.335C71.4214 20.1832 68.7789 18.2307 65.9062 16.4834C65.4275 16.1922 64.9423 15.9067 64.4521 15.627C63.9619 15.3472 63.4667 15.073 62.9678 14.8047C62.7184 14.6706 62.4678 14.5384 62.2168 14.4072C61.7144 14.1447 61.2092 13.8877 60.7021 13.6367L59.9414 13.2646Z" />
                                    <path d="M39.4863 19.6221C39.5686 19.8346 39.644 20.035 39.7119 20.2227L39.8945 20.7451C39.7861 20.4245 39.6509 20.047 39.4863 19.6221Z" />
                                    <path d="M55.3779 11.2168C56.3817 11.6368 57.3982 12.0798 58.416 12.5469L59.1787 12.9014C57.9065 12.3031 56.6324 11.7417 55.3779 11.2168Z" />
                                    <path d="M42.0576 66.8672L42.0625 66.8623C42.0909 66.8328 42.1177 66.8021 42.1455 66.7725C42.1162 66.8038 42.0876 66.836 42.0576 66.8672Z" />
                                    <path d="M0.954102 34.9268L0.951172 34.9238C0.974152 34.9433 0.997717 34.962 1.02148 34.9805C0.998806 34.9628 0.976064 34.9453 0.954102 34.9268Z" />
                                    <path d="M112.483 115.234C112.303 115.256 112.112 115.273 111.912 115.295C112.135 115.271 112.346 115.25 112.544 115.227L112.483 115.234Z" />
                                    <path d="M99.373 82.1074C100.82 83.0219 102.224 83.8531 103.56 84.6025C108.065 87.1281 111.827 88.7475 113.971 89.5908C114.175 89.6713 114.358 89.7377 114.523 89.7998C114.527 90.0388 114.533 90.274 114.538 90.5029L114.539 90.5166C114.555 90.9448 114.572 91.3716 114.596 91.7939C114.333 91.7752 114.073 91.7577 113.816 91.7422C113.367 91.7115 112.901 91.691 112.419 91.6904C111.925 91.6801 111.431 91.6802 110.918 91.6904H110.504L108.742 91.751L108.583 93.502C108.581 93.5152 108.578 93.5445 108.574 93.5791C108.568 93.6411 108.561 93.7235 108.56 93.8213C108.538 94.1139 108.519 94.579 108.519 95.1602C108.519 95.5083 108.518 95.9398 108.539 96.4053C108.601 97.774 108.767 99.5311 109.206 101.372L109.232 101.484L109.254 101.528C110.278 105.73 112.364 108.861 115.453 110.578C114.901 111.28 114.319 112.135 113.786 113.139L113.602 113.497C113.502 113.698 113.406 113.907 113.312 114.119C111.592 114.356 107.983 114.751 103.93 114.594C99.4869 114.421 94.677 113.591 91.2139 111.316L90.8828 111.092L90.2227 110.638C84.4852 106.765 76.8635 103.469 71.9883 101.552C72.1464 101.506 72.3062 101.46 72.4688 101.416L72.4717 101.415C73.0017 101.27 73.5646 101.133 74.1514 100.994L74.1523 100.995C79.6403 99.7328 86.863 98.9669 92.7764 98.5176C95.726 98.2935 98.3373 98.1489 100.225 98.0605C101.168 98.0164 101.93 97.9859 102.463 97.9668C102.729 97.9573 102.938 97.9507 103.083 97.9463C103.225 97.942 103.29 97.9407 103.298 97.9404H103.312L103.324 97.9395L105.672 97.8799L105.23 95.5723C104.682 92.6329 103.185 89.1775 101.484 85.918C100.806 84.6129 100.088 83.3293 99.373 82.1074Z" />
                                    <path d="M70.7188 100.891C70.5687 100.938 70.4205 100.986 70.2744 101.035L69.8438 101.183C70.1261 101.083 70.4189 100.986 70.7188 100.891Z" />
                                    <path d="M98.9238 83.3232C99.1137 83.6541 99.3031 83.9877 99.4912 84.3252C99.6962 84.6929 99.8986 85.0647 100.1 85.4385C99.7143 84.7219 99.3204 84.0142 98.9238 83.3232Z" />
                                    <path d="M155.28 147.46C155.66 149.51 156.17 153.52 155.26 156.87C159.4 158.66 174.15 165.22 181.79 170.59C181.75 170.5 181.7 170.4 181.65 170.31L165.88 153.45C165.88 153.45 175.33 162.34 180.65 168.34C177.05 161.16 171.97 150.75 170.97 147.12C169.59 146.64 165.92 145.23 163.22 143.09L163.85 148.16L155.27 147.45L155.28 147.46Z" />
                                    <path d="M133.961 116.355C134.608 116.406 135.361 116.42 136.195 116.366C137.179 118.439 138.841 120.557 140.789 122.584C142.965 124.848 145.56 127.063 148.123 129.056C152.852 132.731 157.535 135.691 159.427 136.851L160.426 144.873L151.397 144.134C150.876 141.943 149.72 139.626 148.265 137.359C146.629 134.812 144.571 132.255 142.478 129.91C138.709 125.689 134.774 122.101 132.855 120.414C133.375 119.176 133.744 117.822 133.961 116.355Z" />
                                    <path d="M147.784 127.516C147.824 127.548 147.865 127.579 147.905 127.611C147.548 127.327 147.19 127.039 146.835 126.748L147.784 127.516Z" />
                                    <path d="M144.97 125.169C145.095 125.279 145.222 125.386 145.349 125.495C144.914 125.12 144.483 124.743 144.062 124.361L144.97 125.169Z" />
                                    <path d="M124.345 72.1318L124.347 72.1348C125.297 74.008 126.342 76.0804 127.45 78.3369V78.3447L127.654 78.7617C129.411 82.3391 130.264 86.737 130.642 90.7021C130.918 93.6017 130.931 96.1884 130.889 97.918C130.236 98.0957 129.582 98.3121 128.928 98.5713C128.492 97.7498 127.905 96.8727 127.115 96.0098C126.012 94.7996 124.698 93.849 123.253 93.0762C122.798 92.8322 122.312 92.5951 121.798 92.3779L121.786 92.3721L121.243 92.1572C120.724 90.9853 120.149 89.8957 119.51 89.0684V88.415C119.518 88.2153 119.54 87.831 119.54 87.5205C119.54 87.3328 119.547 87.1484 119.558 86.9043C119.616 85.6637 119.703 84.4163 119.838 83.1875V83.1846C120.072 81.0234 120.403 78.8654 120.795 76.7793L120.798 76.7666C121.081 75.2066 121.403 73.6998 121.737 72.2637L121.738 72.2627C122.03 71.007 122.329 69.8112 122.623 68.6982C123.139 69.7363 123.711 70.8783 124.345 72.1318Z" />
                                    <path d="M118.407 78.8359C118.32 79.3811 118.238 79.9297 118.16 80.4805C118.199 80.2052 118.238 79.9303 118.279 79.6562L118.407 78.8359Z" />
                                    <path d="M123.148 65.2139C123.337 65.6112 123.539 66.0313 123.755 66.4746L124.843 68.6738C124.188 67.3642 123.625 66.2176 123.148 65.2139Z" />
                                    <path d="M112.544 95.6582C113.739 95.6855 114.818 95.7829 115.801 95.9209H115.803C116.138 95.9675 116.459 96.0239 116.784 96.083C117.127 96.1478 117.455 96.2227 117.787 96.3008C118.734 96.5375 119.566 96.8284 120.274 97.1504C120.691 97.3404 121.084 97.5496 121.443 97.7607C121.921 98.0566 122.326 98.3377 122.664 98.624L122.668 98.627C123.847 99.6139 124.476 100.672 124.812 101.488C124.98 101.898 125.076 102.249 125.129 102.5C125.18 102.739 125.191 102.882 125.191 102.893V102.895L125.372 106.22L128.218 104.496L128.217 104.495C129.003 104.027 129.768 103.637 130.517 103.321L130.838 103.19C131.494 102.938 132.123 102.745 132.745 102.607L132.752 102.605C133.289 102.483 133.811 102.392 134.312 102.347C135.465 102.256 136.578 102.366 137.665 102.665L137.934 102.738C141.242 103.771 143.552 106.477 144.676 108.081C142.476 110.319 140.251 111.426 138.336 111.953L137.928 112.058C137.76 112.096 137.602 112.131 137.45 112.162L137.006 112.242C136.637 112.293 136.347 112.336 136.069 112.353H136.062L136.054 112.354C135.09 112.427 134.282 112.369 133.706 112.29C133.419 112.25 133.19 112.205 133.03 112.169C132.951 112.151 132.888 112.136 132.845 112.124C132.823 112.118 132.805 112.114 132.793 112.11L132.779 112.106L132.773 112.104L130.298 111.324L130.241 112.627L130.221 113.087L130.182 113.912L130.181 113.919C130.114 115.511 129.85 116.907 129.433 118.14L129.432 118.145C129.298 118.544 129.136 118.925 128.957 119.302L128.956 119.303C128.791 119.652 128.612 119.982 128.421 120.277L128.418 120.28C127.881 121.117 127.246 121.838 126.498 122.419C124.718 123.795 122.484 124.39 120.411 124.593C118.768 124.753 117.282 124.66 116.309 124.552C115.525 121.45 115.805 118.895 116.47 116.884L116.471 116.881C116.622 116.419 116.81 115.982 117.016 115.532L117.017 115.533C117.278 114.973 117.556 114.473 117.84 114.033L117.843 114.029C118.395 113.166 118.966 112.5 119.409 112.043C119.63 111.815 119.818 111.639 119.955 111.519C120.023 111.458 120.079 111.412 120.118 111.38C120.156 111.349 120.177 111.332 120.18 111.33L120.186 111.326L123.608 108.725L119.408 107.784H119.406C116.282 107.092 114.558 104.769 113.601 102.064C112.785 99.7601 112.577 97.2943 112.544 95.6582Z" />
                                    <path d="M131.015 115.771C130.987 115.964 130.957 116.154 130.923 116.341L130.812 116.895C130.892 116.531 130.959 116.157 131.015 115.771Z" />
                                    <path d="M121.29 109.23L119.58 110.53L119.294 110.77C119.267 110.793 119.239 110.818 119.21 110.845C119.411 110.662 119.545 110.557 119.58 110.53L121.288 109.229L121.29 109.23Z" />
                                    <path d="M128.75 103.052C128.634 103.112 128.518 103.175 128.401 103.239C128.169 103.367 127.935 103.501 127.7 103.641C128.053 103.431 128.403 103.234 128.75 103.052Z" />
                                    <path d="M132.53 101.631L132.02 101.754C132.19 101.709 132.36 101.668 132.53 101.631Z" />
                                    <path d="M134.23 101.351L133.809 101.396C133.95 101.378 134.091 101.363 134.23 101.351Z" />
                                    <path d="M121.97 96.9102C122.47 97.2201 122.92 97.5304 123.31 97.8604C123.114 97.6952 122.905 97.5346 122.681 97.377C122.457 97.2195 122.219 97.065 121.97 96.9102Z" />
                                    <path d="M115.94 94.9297C116.3 94.9797 116.64 95.0397 116.97 95.0996C116.805 95.0697 116.638 95.0404 116.467 95.0117C116.296 94.983 116.12 94.9547 115.94 94.9297Z"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_976_912">
                                    <rect width="181.79" height="170.59" fill="white"/>
                                    </clipPath>
                                    </defs>
                                </svg>
                                ${t('analysis.s6.title')}
                            </h3>
                            <p style="border-left: 3px solid var(--text-grey); padding-left: 12px; color: var(--text-grey); font-size: 16px; margin-bottom: 24px;">${t('analysis.s6.desc')}</p>
                        
                            <div style="display:flex; flex-direction: row; justify-content: space-between; gap:15px;">
                                ${p.artefacts.map(art => {
            const metrics = calculateRerollMetrics(art, config);

            if (!metrics) return '';

            const pieceName = t('artifact.' + art.type);

            return `
                                    <div style="width: 100%; background:var(--bg-panel); padding:12px; border-radius:8px; border-left: 3px solid ${metrics.badge.color}">
                                        
                                        <div style="display:flex; align-items:center; gap:12px; margin-bottom:10px;">
                                            <img src="${art.icon}" style="width:42px; height:42px; border-radius:8px; background-color: rgba(0,0,0,0.1)" alt="">
                                            <div style="display:flex; flex-direction:column; justify-content:center; gap: 3px;">
                                                <p style="font-size:12px; color:var(--text-primary); font-weight:bold; overflow:hidden; text-overflow:ellipsis;">
                                                    ${pieceName}
                                                </p>
                                                <p style="font-size:12px; color:${art.grade.color}; opacity:0.9;">
                                                    ${art.score} (${art.grade.letter})
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div style="margin-bottom:8px;">
                                            <div style="display:flex; justify-content:space-between; font-size:12px; color:var(--text-grey); margin-bottom: 4px;">
                                                <p>${t('analysis.s6.gainPotential')}</p>
                                                <p style="color:${metrics.potential > 60 ? '#22c55e' : '#ccc'}">${metrics.potential}%</p>
                                            </div>
                                            <div style="width:100%; height:4px; background:#333; border-radius:2px;">
                                                <div style="width:${metrics.potential}%; height:100%; background:linear-gradient(90deg, #3b82f6, #22c55e); border-radius:2px;"></div>
                                            </div>
                                        </div>
                        
                                        <div style="margin-bottom:12px;">
                                            <div style="display:flex; justify-content:space-between; font-size:12px; color:var(--text-grey); margin-bottom: 4px;">
                                                <p>${t('analysis.s6.lossRisk')}</p>
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
    if (!element) return alert(t('error.noBuild'));

    const btn = document.querySelector('button[onclick="exportBuildAsImage()"]');
    const originalContent = btn ? btn.innerHTML : t('ui.exportBtn');
    if (btn) btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> ${t('export.processing')}`;

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
    element.classList.add('export-mode');
    const exportWidth = 1153;
    const exportHeight = 856;

    domtoimage.toPng(element, {
        bgcolor: null,
        scale: 2,
        width: exportWidth,
        height: exportHeight,
        style: {
            width: `${exportWidth}px`,
            height: `${exportHeight}px`,
            overflow: 'visible',
            margin: '0',
            padding: '0'
        },
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
            alert(t('error.exportFail'));
        })
        .finally(function () {
            element.classList.remove('export-mode');
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

    const urlPage = urlParams.get('page');
    if (urlPage && STATIC_PAGES.includes(urlPage)) {
        renderStaticPage(urlPage);
        return;
    }

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
                loader.innerText = t('error.invalidLink');
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

window.addEventListener('popstate', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const uid = urlParams.get('uid');
    const char = urlParams.get('char');
    const page = urlParams.get('page');

    if (page && STATIC_PAGES.includes(page)) {
        renderStaticPage(page);
        return;
    }

    if (!uid) {
        clearSearch();
        return;
    }

    if (char && globalPersoData.length > 0) {
        const targetIndex = globalPersoData.findIndex(
            p => p.nom.toLowerCase() === char.toLowerCase()
        );
        if (targetIndex !== -1) {
            window._isPopstate = true;
            renderShowcase(targetIndex);
            window._isPopstate = false;
        }
    }
});