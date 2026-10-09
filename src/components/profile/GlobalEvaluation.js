// src/components/profile/GlobalEvaluation.js
import { t } from '../../scripts/i18n.js';
import { calculateMaxTheoreticalScore, calculateRNGQuality, calculateRollDistribution, getGradeColor } from '../../scripts/scoring.js';
import { badgesConfig } from './badgesConfig.js';

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

    let hasXianglingCatch = false;
    let hasMagieInterdite = false;
    let hasBennettC6 = false;
    let enfantCount = 0;
    let animalCount = 0;
    let hasZibaiAube = false;
    let hasDonutHonte = false;

    const enfantNames = ["Klee", "Qiqi", "Diona", "Sayu", "Nahida", "Dori", "Yaoyao", "Sigewinne", "Kachina", "Iansan", "Prune"];
    const animalNames = ["Tighnari", "Gorou", "Kirara", "Lynette", "Diona", "Yae Miko", "Sigewinne"];

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
            if (t1 === 1 && t2 === 1 && t3 === 1 && p.level >= 80) pacifist = true;
        }

        if (p.weapon) {
            const weaponRarity = p.weapon.stars || p.weapon.rarity || 1;
            const weaponRefinement = p.weapon.rank || p.weapon.refinement || 1;
            if (p.rarity === 5 && p.cons === 6 && weaponRarity === 5 && weaponRefinement === 5) leviathan = true;
            if (p.rarity === 5 && p.level >= 80 && weaponRarity <= 3) diogenes = true;
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

        if (p.nom === "Xiangling" && p.weapon && p.weapon.key === "TheCatch") hasXianglingCatch = true;
        if (p.weapon && p.weapon.key === "ThrillingTalesOfDragonSlayers") hasMagieInterdite = true;
        if (p.nom === "Bennett" && p.cons === 6) hasBennettC6 = true;
        if (enfantNames.includes(p.nom)) enfantCount++;
        if (animalNames.includes(p.nom)) animalCount++;
        if (p.nom === "Zibai" && p.weapon && p.weapon.key === "HarbingerOfDawn") hasZibaiAube = true;
        if (p.weapon && (p.weapon.key === "EverlastingMoonglow" || p.weapon.key === "JadefallsSplendor")) hasDonutHonte = true;
    });

    let monopolyElem = null;
    let supremacyElem = null;
    Object.entries(elementCount).forEach(([elem, count]) => {
        if (count === globalPersoData.length && globalPersoData.length >= 4) {
            monopolyElem = elem;
        } else if (count > Math.ceil(globalPersoData.length / 2) && globalPersoData.length >= 4 && !monopolyElem) {
            supremacyElem = elem;
        }
    });

    const stats = {
        uidStr, playerInfo, avgEff, avgScore, avgRNG, validChars, globalPersoData,
        isAbyss, isTheater, isStygian, isStygianDiff6, stygianSec,
        holyGrail, level89Syndrome, level67EasterEgg,
        highER, asthmatic, casino, alchemist, allInCrit,
        bruteForce, surgicalPrec, hospital, brickWall,
        rainbowFan, emblemFan, pacifist, hpSack, impostor,
        tripleCrown, leviathan, qiqiCurse, diogenes, nudist, level100Reached,
        fourStarCount, maxFriendshipCount,
        archonCount, favoniusCount, aloyFound, internFound,
        elementCount, akashamaxxing, fatuiCount, healerCount, eluDeCelestia, anomalieOffensive,
        starterCount, hasSandrone, hasFurinaWithPipe, hasRaidenCatch, hasZhongliTassel,
        hearthCount, kamisatoCount, aratakiCount, adeptiCount, sumeruCount, mermoniaCount,
        hasXianglingCatch, hasMagieInterdite, hasBennettC6, enfantCount, animalCount,
        hasZibaiAube, hasDonutHonte, hasGhettoKing: globalPersoData.some(p => p.ghettoKing),
        c6FiveStars: globalPersoData.filter(p => p.rarity === 5 && p.cons === 6).length,
        monopolyElem, supremacyElem
    };

    const badgesData = badgesConfig
        .filter(b => b.condition(stats))
        .map(b => ({
            icon: b.icon,
            name: b.getName ? b.getName(stats) : t(b.nameKey),
            desc: b.getDesc ? b.getDesc(stats) : t(b.descKey),
            bgRgba: b.bg,
            tooltipColor: b.tooltipColor,
            priority: b.priority
        }))
        .sort((a, b) => a.priority - b.priority);

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
                    <p style="font-size: 14px; color: var(--text-always-white); margin:0;">${avgEff.toFixed(1)}%</p>
                </div>
                <div>
                    <p style="font-size: 9px; text-transform: uppercase; color: rgba(255,255,255,0.6); margin:0;">${t('ui.eval.score')}</p>
                    <p style="font-size: 14px; color: var(--text-always-white); margin:0;">${avgScore.toFixed(1)}</p>
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
