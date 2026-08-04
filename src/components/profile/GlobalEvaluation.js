// src/components/profile/GlobalEvaluation.js
import { t } from '../../scripts/i18n.js';
import { calculateMaxTheoreticalScore, calculateRNGQuality, calculateRollDistribution, getGradeColor } from '../../scripts/scoring.js';

export function renderGlobalEvaluation(playerInfo, globalPersoData, uidStr = '') {
    const evalContainer = document.getElementById('global-evaluation');
    if (!evalContainer) return;

    if (!globalPersoData || globalPersoData.length === 0) {
        evalContainer.style.display = 'none';
        return;
    }
    evalContainer.style.display = 'flex';

    const namecardsData = window.namecardsData || {};
    const namecard = namecardsData[String(playerInfo?.nameCardId)];
    let bannerUrl = namecard && namecard.Icon ? `https://enka.network${namecard.Icon}` : '';

    let totalScore = 0, totalEfficiency = 0, totalRNG = 0, validChars = 0;
    let totalCurrentRolls = 0;
    let totalMaxRolls = 0;

    globalPersoData.forEach(p => {
        if (p.evaluation && p.evaluation.score) {
            const config = { ...p.charConfig, ...(p.activeBuild || {}) };
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
            totalRNG += calculateRNGQuality(p, { weights: p.weights });
            validChars++;
        }
    });

    const avgScore = validChars > 0 ? (totalScore / validChars) : 0;
    const avgEff = validChars > 0 ? (totalEfficiency / validChars) : 0;
    const avgRNG = validChars > 0 ? (totalRNG / validChars) : 0;

    let globalGrade = { letter: "F", color: getGradeColor("F") };

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
                globalGrade = { letter: labels[i], color: getGradeColor(labels[i]) };
                break;
            }
        }
    }

    const badgesData = [];
    const addBadge = (icon, name, desc, bgRgba, tooltipColor = "rgba(255, 255, 255, 0.4)") => {
        badgesData.push({ icon, name, desc, bgRgba, tooltipColor });
    };

    const isAbyss = (playerInfo?.towerStarIndex || 0) >= 36;
    const isTheater = (playerInfo?.theaterStarIndex || 0) >= 8;
    const isStygian = (playerInfo?.stygianIndex || 0) >= 5;
    const isStygianDiff6 = (playerInfo?.stygianIndex || 0) >= 6;
    const stygianSec = (playerInfo?.stygianSeconds > 0) ? playerInfo.stygianSeconds : null;

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
    const archonNames = ["Venti", "Zhongli", "Raiden", "Nahida", "Furina", "Mavuika"];
    let starterPackNames = ["Amber", "Kaeya", "Lisa"];
    let starterCount = 0;
    let hasSandrone = false;
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
                (art.subStats || []).forEach(sub => {
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
                if (noCritNeeded && tooMuchCrit) akashamaxxing = true;
            }

            const elem = p.combatStats.dmgBonusKey ? p.combatStats.dmgBonusKey.replace('_dmg_', '') : null;
            if (elem) elementCount[elem] = (elementCount[elem] || 0) + 1;
        }

        if (p.rarity === 4 || p.stars === 4) fourStarCount++;
        if (archonNames.includes(p.nom)) archonCount++;
        if (p.nom === "Aloy") aloyFound = true;
        if (p.level <= 20) internFound = true;
        if (p.friendship >= 10) maxFriendshipCount++;

        if (p.talents && p.talents.length >= 3) {
            const t1 = p.talents[0].level || 0;
            const t2 = p.talents[1].level || 0;
            const t3 = p.talents[2].level || 0;
            if (t1 >= 10 && t2 >= 10 && t3 >= 10) tripleCrown = true;
        }

        if (p.weapon) {
            const weaponRarity = p.weapon.stars || p.weapon.rarity || 1;
            const weaponRefinement = p.weapon.rank || p.weapon.refinement || 1;
            if (p.rarity === 5 && p.cons === 6 && weaponRarity === 5 && weaponRefinement === 5) leviathan = true;
            if (p.rarity === 5 && p.level >= 80 && weaponRarity <= 2) diogenes = true;
            if (p.level === 90 && weaponRarity === 3) p.ghettoKing = true;
            if (p.weapon.name && p.weapon.name.includes("Favonius")) favoniusCount++;
        }

        const standard5Stars = ['Qiqi', 'Keqing', 'Mona', 'Diluc', 'Jean', 'Dehya', 'Tighnari'];
        if (p.cons === 6 && standard5Stars.includes(p.nom)) qiqiCurse = true;
        if (p.level >= 80 && (!p.artefacts || p.artefacts.length === 0)) nudist = true;

        if (p.artefacts && Array.isArray(p.artefacts) && p.weights) {
            p.artefacts.forEach(art => {
                if (art.mainStatKey && p.weights[art.mainStatKey] === 0) impostor = true;
            });
        }

        if (p.setsCounter) {
            if (p.setsCounter['EmblemOfSeveredFate'] >= 4) emblemFan++;
            if (Object.values(p.setsCounter).every(c => c < 4)) rainbowFan++;
        } else {
            rainbowFan++;
        }

        if (fatuiNames.includes(p.nom)) fatuiCount++;
        if (healerNames.includes(p.nom)) healerCount++;

        const charConfig = { ...p.charConfig, ...(p.activeBuild || {}) };
        const rollStats = calculateRollDistribution(p, charConfig);
        if (rollStats.total > 0 && rollStats.deadCount === 0) eluDeCelestia = true;

        if (p.combatStats && p.artefacts) {
            const em = p.combatStats.em || p.combatStats.eleMas || 0;
            const er = Math.round(p.combatStats.er || 0);
            const artsPlus20 = p.artefacts.filter(art => art.level === 20).length;
            if (em === 0 && er === 100 && artsPlus20 === 5) anomalieOffensive = true;
        }

        if (starterPackNames.includes(p.nom)) starterCount++;
        if (p.nom === "Sandrone") hasSandrone = true;
        if (p.nom === "Furina" && p.weapon && p.weapon.key === "FleuveCendreFerryman") hasFurinaWithPipe = true;
        if (p.nom.includes("Raiden") && p.weapon && p.weapon.key === "TheCatch") hasRaidenCatch = true;
        if (p.nom === "Zhongli" && p.weapon && p.weapon.key === "BlackTassel") hasZhongliTassel = true;
        if (hearthNames.includes(p.nom)) hearthCount++;
        if (kamisatoNames.includes(p.nom)) kamisatoCount++;
        if (aratakiNames.includes(p.nom)) aratakiCount++;
        if (adeptiNames.includes(p.nom)) adeptiCount++;
        if (sumeruNames.includes(p.nom)) sumeruCount++;
        if (mermoniaNames.includes(p.nom)) mermoniaCount++;
    });

    if (creatorUIDs.includes(uidStr)) {
        addBadge("👑", t('badge.creator.name'), t('badge.creator.desc'), "linear-gradient(135deg, rgba(248, 250, 252, 0.7) 0%, rgba(56, 189, 248, 0.7) 50%, rgba(248, 250, 252, 0.7) 100%)");
    }
    if (contributorUIDs.includes(uidStr)) {
        addBadge("🛠️", t('badge.contributor.name'), t('badge.contributor.desc'), "linear-gradient(135deg, #334155, #94a3b8)");
    }
    if (bestieUIDs.includes(uidStr)) {
        addBadge("💖", t('badge.bestie.name'), t('badge.bestie.desc'), "linear-gradient(135deg, #fbcfe8, #e879f9, #be185d)");
    }
    if (eluDeCelestia) {
        addBadge("🕊️", t('badge.celestia.name'), t('badge.celestia.desc'), "linear-gradient(135deg, rgba(250, 214, 32, 0.7) 0%, rgba(255, 255, 255, 0.7) 40%, rgba(56, 189, 248, 0.7) 100%)");
    }
    if (hasSandrone) {
        addBadge("⚙️", t('badge.sandrone.name'), t('badge.sandrone.desc'), "linear-gradient(135deg, #5053BB 0%, #656788 50%, #91101D 100%)");
    }
    if (isAbyss && isTheater && isStygian) {
        addBadge("👑", t('badge.masterEndgame.name'), t('badge.masterEndgame.desc'), "linear-gradient(135deg, rgba(230,190,255,0.7), rgba(154,204,255,0.7), rgba(255,204,229,0.7), rgba(253,245,169,0.7))");
    } else {
        if (isAbyss) addBadge("🏆", t('badge.abyssArchon.name'), t('badge.abyssArchon.desc'), "rgba(37, 51, 85, 0.6)");
        if (isTheater) addBadge("🎭", t('badge.theaterStar.name'), t('badge.theaterStar.desc'), "rgba(82, 42, 138, 0.6)");
        if (isStygian && !isStygianDiff6) addBadge("🐉", t('badge.carnageKing.name'), t('badge.carnageKing.desc'), "rgba(139, 45, 139, 0.6)");
    }
    if (isStygianDiff6 && stygianSec !== null && stygianSec <= 180) {
        addBadge("🌌", t('badge.legend.name'), t('badge.legend.desc'), "linear-gradient(135deg, rgba(30,27,75,0.8), rgba(109,40,217,0.7), rgba(250,204,21,0.6))");
    } else if (isStygianDiff6) {
        addBadge("🩸", t('badge.carnagePlague.name'), t('badge.carnagePlague.desc'), "linear-gradient(135deg, rgba(153,27,27,0.7), rgba(220,38,38,0.7))");
    }
    if (playerInfo?.finishAchievementNum >= 1700) {
        addBadge("📜", t('badge.archivist.name'), t('badge.archivist.desc'), "linear-gradient(135deg, rgba(6, 78, 59, 0.95), rgba(16, 185, 129, 0.85), rgba(253, 224, 71, 0.85))");
    }
    if (playerInfo?.level === 60) addBadge("🏅", t('badge.veteran.name'), t('badge.veteran.desc'), "rgba(207, 156, 79, 0.6)");
    if (avgEff >= 95) addBadge("🌟", t('badge.perfection.name'), t('badge.perfection.desc'), "linear-gradient(135deg, rgba(255,215,0,0.7), rgba(255,255,255,0.6))");

    if (globalPersoData.length === 1) addBadge("🃏", t('badge.oneTrick.name', globalPersoData[0].nom), t('badge.oneTrick.desc', globalPersoData[0].nom), "rgba(107, 114, 128, 0.6)");
    else if (globalPersoData.length < 12) addBadge("🥷", t('badge.hiddenCollection.name'), t('badge.hiddenCollection.desc'), "rgba(107, 114, 128, 0.6)");

    const c6FiveStars = globalPersoData.filter(p => p.rarity === 5 && p.cons === 6).length;
    if (c6FiveStars > 1) addBadge("🐋", t('badge.narval.name'), t('badge.narval.desc'), "linear-gradient(135deg, rgba(30, 58, 138, 0.9), rgba(49, 46, 129, 0.9), rgba(167, 139, 250, 0.8))");
    else if (c6FiveStars === 1) addBadge("🐳", t('badge.whale.name'), t('badge.whale.desc'), "rgba(59, 172, 197, 0.6)");
    if (avgRNG > 80) addBadge("🍀", t('badge.lucky.name'), t('badge.lucky.desc', avgRNG.toFixed(1)), "rgba(61, 160, 97, 0.6)");
    else if (avgRNG < 40 && validChars > 0) addBadge("🌧️", t('badge.cursed.name'), t('badge.cursed.desc', avgRNG.toFixed(1)), "rgba(107, 114, 128, 0.6)");

    if (uidStr.length === 9 && uidStr.substring(1, 3) === "00") {
        addBadge("🕰️", t('badge.og.name'), t('badge.og.desc'), "linear-gradient(135deg, rgba(120, 113, 108, 0.9), rgba(63, 63, 70, 0.9), rgba(212, 175, 55, 0.7))");
    }
    if (leviathan) addBadge("🔱", t('badge.leviathan.name'), t('badge.leviathan.desc'), "linear-gradient(135deg, rgba(6,182,212,0.8), rgba(59,130,246,0.8), rgba(30,58,138,0.8))");
    if (level100Reached) addBadge("💫", t('badge.stellaFortuna.name'), t('badge.stellaFortuna.desc'), "linear-gradient(135deg, rgba(2,6,23,0.7), rgba(37,99,235,0.7), rgba(56,189,248,0.7))");
    if (holyGrail) addBadge("🏆", t('badge.holyGrail.name'), t('badge.holyGrail.desc'), "linear-gradient(135deg, #a16207 0%, #facc15 50%, #a16207 100%)");
    if (tripleCrown) addBadge("👑", t('badge.tripleCrown.name'), t('badge.tripleCrown.desc'), "linear-gradient(135deg, rgba(251,191,36,0.8), rgba(245,158,11,0.8), rgba(217,119,6,0.8))");
    if (akashamaxxing) addBadge("📈", t('badge.akasha.name'), t('badge.akasha.desc'), "linear-gradient(135deg, rgba(236,72,153,0.7), rgba(168,85,247,0.7))");
    if (hasFurinaWithPipe) addBadge("🪠", t('badge.plombier.name'), t('badge.plombier.desc'), "linear-gradient(135deg, #1e3a8a, #d97706)");
    if (hasRaidenCatch) addBadge("🐟", t('badge.raidenCatch.name'), t('badge.raidenCatch.desc'), "linear-gradient(135deg, #7c3aed, #0ea5e9)");
    if (hasZhongliTassel) addBadge("🪨", t('badge.zhongliTassel.name'), t('badge.zhongliTassel.desc'), "linear-gradient(135deg, #ca8a04, #475569)");
    if (fatuiCount >= 3) addBadge("❄️", t('badge.fatui.name'), t('badge.fatui.desc'), "linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(22, 78, 99, 0.9), rgba(8, 145, 178, 0.8))");
    if (mermoniaCount >= 3) addBadge("⚖️", t('badge.mermonia.name'), t('badge.mermonia.desc'), "linear-gradient(135deg, rgba(20, 83, 101, 0.9) 0%, rgba(139, 131, 118, 0.95) 100%)");
    if (hearthCount >= 3) addBadge("🎩", t('badge.hearth.name'), t('badge.hearth.desc'), "linear-gradient(135deg, #7f1d1d, #1c1917, #f5f5f4)");
    if (kamisatoCount >= 3) addBadge("🪭", t('badge.kamisato.name'), t('badge.kamisato.desc'), "linear-gradient(135deg, #e0f2fe, #1e3a8a, #991b1b)");
    if (aratakiCount >= 2) addBadge("🎸", t('badge.arataki.name'), t('badge.arataki.desc'), "linear-gradient(135deg, #ca8a04, #7e22ce)");
    if (adeptiCount >= 3) addBadge("🏔️", t('badge.adepti.name'), t('badge.adepti.desc'), "linear-gradient(135deg, #0f766e, #064e3b, #b45309)");
    if (sumeruCount === 4) addBadge("🏛️", t('badge.sumeru.name'), t('badge.sumeru.desc'), "linear-gradient(135deg, #064e3b, #10b981, #b45309)");
    if (healerCount >= 3) addBadge("🏥", t('badge.hospital.name'), t('badge.hospital.desc'), "linear-gradient(135deg, rgba(6, 78, 59, 0.9), rgba(5, 150, 105, 0.8))");
    if (playerInfo?.level >= 55 && playerInfo?.finishAchievementNum !== null && playerInfo?.finishAchievementNum < 1000) {
        addBadge("📸", t('badge.tourist.name'), t('badge.tourist.desc'), "linear-gradient(135deg, rgba(180, 83, 9, 0.9), rgba(3, 105, 161, 0.9))");
    }
    if (anomalieOffensive) addBadge("💥", t('badge.offensiveAnomaly.name'), t('badge.offensiveAnomaly.desc'), "linear-gradient(135deg, rgba(153, 27, 27, 0.8), rgba(38, 38, 38, 0.9), rgba(220, 38, 38, 0.8))");
    if (starterCount === 3) addBadge("👶", t('badge.starter.name'), t('badge.starter.desc'), "linear-gradient(135deg, #a7f3d0, #3b82f6)");
    if (archonCount >= 4) addBadge("🏛️", t('badge.divine.name'), t('badge.divine.desc'), "linear-gradient(135deg, rgba(255,215,0,0.6), rgba(255,255,255,0.4))");
    if (allInCrit) addBadge("🎯", t('badge.allInCrit.name'), t('badge.allInCrit.desc'), "linear-gradient(135deg, rgba(220,38,38,0.8), rgba(249,115,22,0.8))");
    if (surgicalPrec) addBadge("🎯", t('badge.surgical.name'), t('badge.surgical.desc'), "rgba(220, 38, 38, 0.6)");
    if (highER) addBadge("⚡", t('badge.powerPlant.name'), t('badge.powerPlant.desc'), "rgba(207, 156, 79, 0.6)");
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
            addBadge("👑", t('badge.supremacy.name', elem.charAt(0).toUpperCase() + elem.slice(1)), t('badge.supremacy.desc'), "rgba(61, 160, 97, 0.6)");
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
                <p style="font-size: 9px; text-transform: uppercase; color: rgba(255,255,255,0.6); margin: 0;">${t('ui.eval.globalGrade')}</p>
                <p style="font-size: 42px; font-weight: 800; color: ${globalGrade.color}; line-height: 1; text-shadow: 0 0 10px ${globalGrade.color}40; margin:0;">${globalGrade.letter}</p>
            </div>
            <div style="display: flex; flex-direction: column; text-align: center; justify-content: center; gap: 2px; padding-right: 15px; border-right: 1px solid rgba(255,255,255,0.2); height: 100%;">
                <div>
                    <p style="font-size: 9px; text-transform: uppercase; color: rgba(255,255,255,0.6); margin:0;">${t('ui.eval.efficiency')}</p>
                    <p style="font-size: 14px; font-weight: bold; color: var(--text-primary); margin:0;">${avgEff.toFixed(1)}%</p>
                </div>
                <div>
                    <p style="font-size: 9px; text-transform: uppercase; color: rgba(255,255,255,0.6); margin:0;">${t('ui.eval.score')}</p>
                    <p style="font-size: 14px; font-weight: bold; color: var(--text-primary); margin:0;">${avgScore.toFixed(1)}</p>
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
