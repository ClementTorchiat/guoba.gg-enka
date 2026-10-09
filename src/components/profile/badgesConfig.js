import { t } from '../../scripts/i18n.js';

export const creatorUIDs = ["704449686"];
export const contributorUIDs = ["741928446"];
export const bestieUIDs = ["741928446", "735710141", "704195929", "704155185", "719819547", "721506778", "702515706"];

const getPriority = (bg) => {
    if (bg.includes('linear-gradient')) return 1;
    if (bg.includes('107, 114, 128')) return 3;
    return 2;
};

// Tooltip par défaut si non spécifié
const defaultTooltipColor = "rgba(255, 255, 255, 0.4)";

export const badgesConfig = [
    {
        id: "creator",
        icon: "👑",
        nameKey: "badge.creator.name",
        descKey: "badge.creator.desc",
        bg: "linear-gradient(135deg, rgba(248, 250, 252, 0.7) 0%, rgba(56, 189, 248, 0.7) 50%, rgba(248, 250, 252, 0.7) 100%)",
        condition: (s) => creatorUIDs.includes(s.uidStr)
    },
    {
        id: "contributor",
        icon: "🛠️",
        nameKey: "badge.contributor.name",
        descKey: "badge.contributor.desc",
        bg: "linear-gradient(135deg, #334155, #94a3b8)",
        condition: (s) => contributorUIDs.includes(s.uidStr)
    },
    {
        id: "bestie",
        icon: "💖",
        nameKey: "badge.bestie.name",
        descKey: "badge.bestie.desc",
        bg: "linear-gradient(135deg, #fbcfe8, #e879f9, #be185d)",
        condition: (s) => bestieUIDs.includes(s.uidStr)
    },
    {
        id: "celestia",
        icon: "🕊️",
        nameKey: "badge.celestia.name",
        descKey: "badge.celestia.desc",
        bg: "linear-gradient(135deg, rgba(250, 214, 32, 0.7) 0%, rgba(255, 255, 255, 0.7) 40%, rgba(56, 189, 248, 0.7) 100%)",
        condition: (s) => s.eluDeCelestia
    },
    {
        id: "sandrone",
        icon: "⚙️",
        nameKey: "badge.sandrone.name",
        descKey: "badge.sandrone.desc",
        bg: "linear-gradient(135deg, #5053BB 0%, #656788 50%, #91101D 100%)",
        condition: (s) => s.hasSandrone
    },
    // Endgame Master
    {
        id: "masterEndgame",
        icon: "👑",
        nameKey: "badge.masterEndgame.name",
        descKey: "badge.masterEndgame.desc",
        bg: "linear-gradient(135deg, rgba(230,190,255,0.7), rgba(154,204,255,0.7), rgba(255,204,229,0.7), rgba(253,245,169,0.7))",
        condition: (s) => s.isAbyss && s.isTheater && s.isStygian
    },
    {
        id: "abyssArchon",
        icon: "🏆",
        nameKey: "badge.abyssArchon.name",
        descKey: "badge.abyssArchon.desc",
        bg: "rgba(37, 51, 85, 0.6)",
        condition: (s) => s.isAbyss && !(s.isAbyss && s.isTheater && s.isStygian)
    },
    {
        id: "theaterStar",
        icon: "🎭",
        nameKey: "badge.theaterStar.name",
        descKey: "badge.theaterStar.desc",
        bg: "rgba(82, 42, 138, 0.6)",
        condition: (s) => s.isTheater && !(s.isAbyss && s.isTheater && s.isStygian)
    },
    {
        id: "carnageKing",
        icon: "🐉",
        nameKey: "badge.carnageKing.name",
        descKey: "badge.carnageKing.desc",
        bg: "rgba(139, 45, 139, 0.6)",
        condition: (s) => s.isStygian && !s.isStygianDiff6 && !(s.isAbyss && s.isTheater && s.isStygian)
    },
    // Stygian Diff 6
    {
        id: "legend",
        icon: "🌌",
        nameKey: "badge.legend.name",
        descKey: "badge.legend.desc",
        bg: "linear-gradient(135deg, rgba(30,27,75,0.8), rgba(109,40,217,0.7), rgba(250,204,21,0.6))",
        condition: (s) => s.isStygianDiff6 && s.stygianSec !== null && s.stygianSec <= 180
    },
    {
        id: "carnagePlague",
        icon: "🩸",
        nameKey: "badge.carnagePlague.name",
        descKey: "badge.carnagePlague.desc",
        bg: "linear-gradient(135deg, rgba(153,27,27,0.7), rgba(220,38,38,0.7))",
        condition: (s) => s.isStygianDiff6 && !(s.stygianSec !== null && s.stygianSec <= 180)
    },
    {
        id: "archivist",
        icon: "📜",
        nameKey: "badge.archivist.name",
        descKey: "badge.archivist.desc",
        bg: "linear-gradient(135deg, rgba(6, 78, 59, 0.95), rgba(16, 185, 129, 0.85), rgba(253, 224, 71, 0.85))",
        condition: (s) => s.playerInfo?.finishAchievementNum >= 1700
    },
    {
        id: "veteran",
        icon: "🏅",
        nameKey: "badge.veteran.name",
        descKey: "badge.veteran.desc",
        bg: "rgba(207, 156, 79, 0.6)",
        condition: (s) => s.playerInfo?.level === 60
    },
    {
        id: "perfection",
        icon: "🌟",
        nameKey: "badge.perfection.name",
        descKey: "badge.perfection.desc",
        bg: "linear-gradient(135deg, rgba(255,215,0,0.7), rgba(255,255,255,0.6))",
        condition: (s) => s.avgEff >= 95
    },
    {
        id: "oneTrick",
        icon: "🃏",
        getName: (s) => t('badge.oneTrick.name', s.globalPersoData[0].nom),
        getDesc: (s) => t('badge.oneTrick.desc', s.globalPersoData[0].nom),
        bg: "rgba(107, 114, 128, 0.6)",
        condition: (s) => s.globalPersoData.length === 1
    },
    {
        id: "hiddenCollection",
        icon: "🥷",
        nameKey: "badge.hiddenCollection.name",
        descKey: "badge.hiddenCollection.desc",
        bg: "rgba(107, 114, 128, 0.6)",
        condition: (s) => s.globalPersoData.length > 1 && s.globalPersoData.length < 12
    },
    {
        id: "narval",
        icon: "🐋",
        nameKey: "badge.narval.name",
        descKey: "badge.narval.desc",
        bg: "linear-gradient(135deg, rgba(30, 58, 138, 0.9), rgba(49, 46, 129, 0.9), rgba(167, 139, 250, 0.8))",
        condition: (s) => s.c6FiveStars > 1
    },
    {
        id: "whale",
        icon: "🐳",
        nameKey: "badge.whale.name",
        descKey: "badge.whale.desc",
        bg: "rgba(59, 172, 197, 0.6)",
        condition: (s) => s.c6FiveStars === 1
    },
    {
        id: "lucky",
        icon: "🍀",
        getName: (s) => t('badge.lucky.name'),
        getDesc: (s) => t('badge.lucky.desc', s.avgRNG.toFixed(1)),
        bg: "rgba(61, 160, 97, 0.6)",
        condition: (s) => s.avgRNG > 80
    },
    {
        id: "cursed",
        icon: "🌧️",
        getName: (s) => t('badge.cursed.name'),
        getDesc: (s) => t('badge.cursed.desc', s.avgRNG.toFixed(1)),
        bg: "rgba(107, 114, 128, 0.6)",
        condition: (s) => s.avgRNG < 40 && s.validChars > 0 && !(s.avgRNG > 80)
    },
    {
        id: "og",
        icon: "🕰️",
        nameKey: "badge.og.name",
        descKey: "badge.og.desc",
        bg: "linear-gradient(135deg, rgba(120, 113, 108, 0.9), rgba(63, 63, 70, 0.9), rgba(212, 175, 55, 0.7))",
        condition: (s) => s.uidStr.length === 9 && s.uidStr.substring(1, 3) === "00"
    },
    {
        id: "leviathan",
        icon: "🔱",
        nameKey: "badge.leviathan.name",
        descKey: "badge.leviathan.desc",
        bg: "linear-gradient(135deg, rgba(6,182,212,0.8), rgba(59,130,246,0.8), rgba(30,58,138,0.8))",
        condition: (s) => s.leviathan
    },
    {
        id: "stellaFortuna",
        icon: "💫",
        nameKey: "badge.stellaFortuna.name",
        descKey: "badge.stellaFortuna.desc",
        bg: "linear-gradient(135deg, rgba(2,6,23,0.7), rgba(37,99,235,0.7), rgba(56,189,248,0.7))",
        condition: (s) => s.level100Reached
    },
    {
        id: "holyGrail",
        icon: "🏆",
        nameKey: "badge.holyGrail.name",
        descKey: "badge.holyGrail.desc",
        bg: "linear-gradient(135deg, #a16207 0%, #facc15 50%, #a16207 100%)",
        condition: (s) => s.holyGrail
    },
    {
        id: "tripleCrown",
        icon: "👑",
        nameKey: "badge.tripleCrown.name",
        descKey: "badge.tripleCrown.desc",
        bg: "linear-gradient(135deg, rgba(251,191,36,0.8), rgba(245,158,11,0.8), rgba(217,119,6,0.8))",
        condition: (s) => s.tripleCrown
    },
    {
        id: "akasha",
        icon: "📈",
        nameKey: "badge.akasha.name",
        descKey: "badge.akasha.desc",
        bg: "linear-gradient(135deg, rgba(236,72,153,0.7), rgba(168,85,247,0.7))",
        condition: (s) => s.akashamaxxing
    },
    {
        id: "hipster",
        icon: "👓",
        nameKey: "badge.hipster.name",
        descKey: "badge.hipster.desc",
        bg: "linear-gradient(135deg, #f59e0b, #78350f)",
        condition: (s) => {
            const hipsterNames = ["Amber", "Xinyan", "Dehya", "Aloy", "Dori", "Candace"];
            return s.globalPersoData.some(p => p.level === 90 && hipsterNames.includes(p.nom));
        }
    },
    {
        id: "asocial",
        icon: "🏃‍♂️",
        nameKey: "badge.asocial.name",
        descKey: "badge.asocial.desc",
        bg: "linear-gradient(135deg, #9ca3af, #111827)",
        condition: (s) => s.globalPersoData.some(p => p.level === 90 && p.friendship < 5)
    },
    {
        id: "forgemaster",
        icon: "⚒️",
        nameKey: "badge.forgemaster.name",
        descKey: "badge.forgemaster.desc",
        bg: "linear-gradient(135deg, #ef4444, #7f1d1d)",
        condition: (s) => {
            const fiveStarWeapons = s.globalPersoData.filter(p => p.weapon && (p.weapon.stars || p.weapon.rarity) === 5).length;
            return s.globalPersoData.length >= 4 && fiveStarWeapons >= s.globalPersoData.length / 2;
        }
    },
    {
        id: "plombier",
        icon: "🪠",
        nameKey: "badge.plombier.name",
        descKey: "badge.plombier.desc",
        bg: "linear-gradient(135deg, #1e3a8a, #d97706)",
        condition: (s) => s.hasFurinaWithPipe
    },
    {
        id: "raidenCatch",
        icon: "🐟",
        nameKey: "badge.raidenCatch.name",
        descKey: "badge.raidenCatch.desc",
        bg: "linear-gradient(135deg, #7c3aed, #0ea5e9)",
        condition: (s) => s.hasRaidenCatch
    },
    {
        id: "zhongliTassel",
        icon: "🪨",
        nameKey: "badge.zhongliTassel.name",
        descKey: "badge.zhongliTassel.desc",
        bg: "linear-gradient(135deg, #ca8a04, #475569)",
        condition: (s) => s.hasZhongliTassel
    },
    {
        id: "xianglingCatch",
        icon: "🌶️",
        nameKey: "badge.xianglingCatch.name",
        descKey: "badge.xianglingCatch.desc",
        bg: "linear-gradient(135deg, #ef4444, #f59e0b)",
        condition: (s) => s.hasXianglingCatch
    },
    {
        id: "magieInterdite",
        icon: "📖",
        nameKey: "badge.magieInterdite.name",
        descKey: "badge.magieInterdite.desc",
        bg: "linear-gradient(135deg, #a855f7, #ec4899)",
        condition: (s) => s.hasMagieInterdite
    },
    {
        id: "bennettC6",
        icon: "🔴",
        nameKey: "badge.bennettC6.name",
        descKey: "badge.bennettC6.desc",
        bg: "rgba(220, 38, 38, 0.6)",
        condition: (s) => s.hasBennettC6
    },
    {
        id: "zibaiAube",
        icon: "🐴",
        nameKey: "badge.zibaiAube.name",
        descKey: "badge.zibaiAube.desc",
        bg: "linear-gradient(135deg, #54cabb, #2c786c)",
        condition: (s) => s.hasZibaiAube
    },
    {
        id: "donutHonte",
        icon: "🍩",
        nameKey: "badge.donutHonte.name",
        descKey: "badge.donutHonte.desc",
        bg: "linear-gradient(135deg, #ec4899, #8b5cf6)",
        condition: (s) => s.hasDonutHonte
    },
    {
        id: "creche",
        icon: "🍼",
        nameKey: "badge.creche.name",
        descKey: "badge.creche.desc",
        bg: "linear-gradient(135deg, #fbcfe8, #f472b6)",
        condition: (s) => s.enfantCount >= 3
    },
    {
        id: "animalier",
        icon: "🐾",
        nameKey: "badge.animalier.name",
        descKey: "badge.animalier.desc",
        bg: "linear-gradient(135deg, #b45309, #d97706)",
        condition: (s) => s.animalCount >= 3
    },
    {
        id: "fatui",
        icon: "❄️",
        nameKey: "badge.fatui.name",
        descKey: "badge.fatui.desc",
        bg: "linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(22, 78, 99, 0.9), rgba(8, 145, 178, 0.8))",
        condition: (s) => s.fatuiCount >= 3
    },
    {
        id: "mermonia",
        icon: "⚖️",
        nameKey: "badge.mermonia.name",
        descKey: "badge.mermonia.desc",
        bg: "linear-gradient(135deg, rgba(20, 83, 101, 0.9) 0%, rgba(139, 131, 118, 0.95) 100%)",
        condition: (s) => s.mermoniaCount >= 3
    },
    {
        id: "hearth",
        icon: "🎩",
        nameKey: "badge.hearth.name",
        descKey: "badge.hearth.desc",
        bg: "linear-gradient(135deg, #7f1d1d, #1c1917, #f5f5f4)",
        condition: (s) => s.hearthCount >= 3
    },
    {
        id: "kamisato",
        icon: "🪭",
        nameKey: "badge.kamisato.name",
        descKey: "badge.kamisato.desc",
        bg: "linear-gradient(135deg, #e0f2fe, #1e3a8a, #991b1b)",
        condition: (s) => s.kamisatoCount >= 3
    },
    {
        id: "arataki",
        icon: "🎸",
        nameKey: "badge.arataki.name",
        descKey: "badge.arataki.desc",
        bg: "linear-gradient(135deg, #ca8a04, #7e22ce)",
        condition: (s) => s.aratakiCount >= 2
    },
    {
        id: "adepti",
        icon: "🏔️",
        nameKey: "badge.adepti.name",
        descKey: "badge.adepti.desc",
        bg: "linear-gradient(135deg, #0f766e, #064e3b, #b45309)",
        condition: (s) => s.adeptiCount >= 3
    },
    {
        id: "sumeru",
        icon: "🏛️",
        nameKey: "badge.sumeru.name",
        descKey: "badge.sumeru.desc",
        bg: "linear-gradient(135deg, #064e3b, #10b981, #b45309)",
        condition: (s) => s.sumeruCount === 4
    },
    {
        id: "hospital",
        icon: "🏥",
        nameKey: "badge.hospital.name",
        descKey: "badge.hospital.desc",
        bg: "linear-gradient(135deg, rgba(6, 78, 59, 0.9), rgba(5, 150, 105, 0.8))",
        condition: (s) => s.healerCount >= 3
    },
    {
        id: "tourist",
        icon: "📸",
        nameKey: "badge.tourist.name",
        descKey: "badge.tourist.desc",
        bg: "linear-gradient(135deg, rgba(180, 83, 9, 0.9), rgba(3, 105, 161, 0.9))",
        condition: (s) => s.playerInfo?.level >= 55 && s.playerInfo?.finishAchievementNum !== null && s.playerInfo?.finishAchievementNum < 1000
    },
    {
        id: "offensiveAnomaly",
        icon: "💥",
        nameKey: "badge.offensiveAnomaly.name",
        descKey: "badge.offensiveAnomaly.desc",
        bg: "linear-gradient(135deg, rgba(153, 27, 27, 0.8), rgba(38, 38, 38, 0.9), rgba(220, 38, 38, 0.8))",
        condition: (s) => s.anomalieOffensive
    },
    {
        id: "starter",
        icon: "👶",
        nameKey: "badge.starter.name",
        descKey: "badge.starter.desc",
        bg: "linear-gradient(135deg, #a7f3d0, #3b82f6)",
        condition: (s) => s.starterCount === 3
    },
    {
        id: "divine",
        icon: "🏛️",
        nameKey: "badge.divine.name",
        descKey: "badge.divine.desc",
        bg: "linear-gradient(135deg, rgba(255,215,0,0.6), rgba(255,255,255,0.4))",
        condition: (s) => s.archonCount >= 4
    },
    {
        id: "allInCrit",
        icon: "🎯",
        nameKey: "badge.allInCrit.name",
        descKey: "badge.allInCrit.desc",
        bg: "linear-gradient(135deg, rgba(220,38,38,0.8), rgba(249,115,22,0.8))",
        condition: (s) => s.allInCrit
    },
    {
        id: "surgical",
        icon: "🎯",
        nameKey: "badge.surgical.name",
        descKey: "badge.surgical.desc",
        bg: "rgba(220, 38, 38, 0.6)",
        condition: (s) => s.surgicalPrec && !s.allInCrit
    },
    {
        id: "powerPlant",
        icon: "⚡",
        nameKey: "badge.powerPlant.name",
        descKey: "badge.powerPlant.desc",
        bg: "rgba(207, 156, 79, 0.6)",
        condition: (s) => s.highER
    },
    {
        id: "asthmatic",
        icon: "😮‍💨",
        nameKey: "badge.asthmatic.name",
        descKey: "badge.asthmatic.desc",
        bg: "rgba(107, 114, 128, 0.6)",
        condition: (s) => s.asthmatic
    },
    {
        id: "alchemist",
        icon: "🧪",
        nameKey: "badge.alchemist.name",
        descKey: "badge.alchemist.desc",
        bg: "rgba(61, 160, 97, 0.6)",
        condition: (s) => s.alchemist
    },
    {
        id: "casino",
        icon: "🎰",
        nameKey: "badge.casino.name",
        descKey: "badge.casino.desc",
        bg: "rgba(184, 63, 63, 0.6)",
        condition: (s) => s.casino
    },
    {
        id: "hpTank",
        icon: "🛡️",
        nameKey: "badge.hpTank.name",
        descKey: "badge.hpTank.desc",
        bg: "rgba(207, 156, 79, 0.6)",
        condition: (s) => s.hpSack
    },
    {
        id: "impostor",
        icon: "🤡",
        nameKey: "badge.impostor.name",
        descKey: "badge.impostor.desc",
        bg: "rgba(184, 63, 63, 0.6)",
        condition: (s) => s.impostor
    },
    {
        id: "qiqiCurse",
        icon: "🧟‍♀️",
        nameKey: "badge.qiqiCurse.name",
        descKey: "badge.qiqiCurse.desc",
        bg: "rgba(107, 114, 128, 0.6)",
        condition: (s) => s.qiqiCurse
    },
    {
        id: "nudist",
        icon: "🩳",
        nameKey: "badge.nudist.name",
        descKey: "badge.nudist.desc",
        bg: "rgba(107, 114, 128, 0.6)",
        condition: (s) => s.nudist
    },
    {
        id: "intern",
        icon: "👶",
        nameKey: "badge.intern.name",
        descKey: "badge.intern.desc",
        bg: "rgba(107, 114, 128, 0.6)",
        condition: (s) => s.internFound
    },
    {
        id: "aloy",
        icon: "⏳",
        nameKey: "badge.aloy.name",
        descKey: "badge.aloy.desc",
        bg: "rgba(107, 114, 128, 0.6)",
        condition: (s) => s.aloyFound
    },
    {
        id: "tiersMonde",
        icon: "🪵",
        nameKey: "badge.tiersMonde.name",
        descKey: "badge.tiersMonde.desc",
        bg: "rgba(139, 69, 19, 0.6)",
        condition: (s) => s.hasGhettoKing
    },
    {
        id: "89",
        icon: "🪙",
        nameKey: "badge.89.name",
        descKey: "badge.89.desc",
        bg: "rgba(107, 114, 128, 0.6)",
        condition: (s) => s.level89Syndrome
    },
    {
        id: "easterEgg67",
        icon: "👀",
        nameKey: null,
        descKey: null,
        getName: () => "67",
        getDesc: () => "SIX SEVEEEEN",
        bg: "rgba(168, 85, 247, 0.6)",
        condition: (s) => s.level67EasterEgg
    },
    {
        id: "emblemFan",
        icon: "👘",
        nameKey: "badge.emblemFan.name",
        descKey: "badge.emblemFan.desc",
        bg: "rgba(168, 85, 247, 0.6)",
        condition: (s) => s.emblemFan >= 3
    },
    {
        id: "favSect",
        icon: "🗡️",
        nameKey: "badge.favSect.name",
        descKey: "badge.favSect.desc",
        bg: "rgba(107, 114, 128, 0.6)",
        condition: (s) => s.favoniusCount >= 3
    },
    {
        id: "rainbow",
        icon: "🌈",
        nameKey: "badge.rainbow.name",
        descKey: "badge.rainbow.desc",
        bg: "linear-gradient(90deg, rgba(255,0,0,0.4), rgba(255,165,0,0.4), rgba(255,255,0,0.4), rgba(0,128,0,0.4), rgba(0,0,255,0.4), rgba(75,0,130,0.4), rgba(238,130,238,0.4))",
        condition: (s) => s.rainbowFan >= s.globalPersoData.length / 3 && s.globalPersoData.length >= 3
    },
    {
        id: "pacifist",
        icon: "🕊️",
        nameKey: "badge.pacifist.name",
        descKey: "badge.pacifist.desc",
        bg: "rgba(107, 114, 128, 0.6)",
        condition: (s) => s.pacifist
    },
    {
        id: "f2p",
        icon: "🧑‍🌾",
        nameKey: "badge.f2p.name",
        descKey: "badge.f2p.desc",
        bg: "rgba(107, 114, 128, 0.6)",
        condition: (s) => s.globalPersoData.length >= 4 && s.fourStarCount > s.globalPersoData.length / 2
    },
    {
        id: "champLeague",
        icon: "💎",
        nameKey: "badge.champLeague.name",
        descKey: "badge.champLeague.desc",
        bg: "rgba(59, 130, 246, 0.6)",
        condition: (s) => s.globalPersoData.length >= 8 && s.fourStarCount === 0
    },
    {
        id: "bondUnbreakable",
        icon: "🤝",
        nameKey: "badge.bondUnbreakable.name",
        descKey: "badge.bondUnbreakable.desc",
        bg: "rgba(238, 130, 238, 0.6)",
        condition: (s) => s.globalPersoData.length >= 4 && s.maxFriendshipCount === s.globalPersoData.length
    },
    {
        id: "monopoly",
        icon: "🔮",
        getName: (s) => t('badge.monopoly.name', s.monopolyElem.charAt(0).toUpperCase() + s.monopolyElem.slice(1)),
        getDesc: (s) => t('badge.monopoly.desc'),
        bg: "linear-gradient(135deg, rgba(37,51,85,0.8), rgba(168,85,247,0.7))",
        condition: (s) => s.monopolyElem !== null
    },
    {
        id: "supremacy",
        icon: "👑",
        getName: (s) => t('badge.supremacy.name', s.supremacyElem.charAt(0).toUpperCase() + s.supremacyElem.slice(1)),
        getDesc: (s) => t('badge.supremacy.desc'),
        bg: "rgba(61, 160, 97, 0.6)",
        condition: (s) => s.supremacyElem !== null && s.monopolyElem === null
    },
    {
        id: "bruteForce",
        icon: "💪",
        nameKey: "badge.bruteForce.name",
        descKey: "badge.bruteForce.desc",
        bg: "rgba(220, 38, 38, 0.6)",
        condition: (s) => s.bruteForce
    },
    {
        id: "brickWall",
        icon: "🧱",
        nameKey: "badge.brickWall.name",
        descKey: "badge.brickWall.desc",
        bg: "rgba(107, 114, 128, 0.6)",
        condition: (s) => s.brickWall
    },
    {
        id: "diogenes",
        icon: "⛺",
        nameKey: "badge.diogenes.name",
        descKey: "badge.diogenes.desc",
        bg: "rgba(139, 69, 19, 0.6)",
        condition: (s) => s.diogenes
    }
].map(badge => ({
    ...badge,
    priority: getPriority(badge.bg),
    tooltipColor: badge.tooltipColor || defaultTooltipColor
}));
