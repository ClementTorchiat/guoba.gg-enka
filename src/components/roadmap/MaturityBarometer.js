// src/components/roadmap/MaturityBarometer.js
import { t } from '../../scripts/i18n.js';
import { calculateMaxTheoreticalScore, getGradeColor } from '../../scripts/scoring.js';

export function calculateAccountMaturity(characters) {
    if (!characters || characters.length === 0) {
        return {
            globalIndex: 0,
            avgScore: 0,
            avgGrade: '?',
            gradeColor: '#999',
            metrics: {
                weapons: { cur: 0, total: 0, pct: 0 },
                levels: { cur: 0, total: 0, pct: 0 },
                talents: { cur: 0, total: 0, pct: 0 },
                mainstats: { cur: 0, total: 0, pct: 0 },
                sets: { cur: 0, total: 0, pct: 0 }
            }
        };
    }

    const totalChars = characters.length;
    let weaponMaxCount = 0;
    let charMaxLevelCount = 0;
    let totalTalentsChecked = 0;
    let talentsMetTarget = 0;
    let totalMainStatsChecked = 0;
    let mainStatsOptimal = 0;
    let optimalSetsCount = 0;
    let sumScores = 0;
    let totalCurrentRolls = 0;
    let totalMaxRolls = 0;
    let validScoreChars = 0;

    characters.forEach(perso => {
        const score = perso.evaluation?.score || 0;
        sumScores += score;

        const config = perso.activeBuild ? { ...perso.charConfig, ...perso.activeBuild } : (perso.charConfig || {});

        if (perso.evaluation && perso.evaluation.score) {
            const pot = calculateMaxTheoreticalScore(perso, config);
            const maxRolls = (pot && pot.totalRolls > 0) ? pot.totalRolls : 45;
            const currentRolls = parseFloat(perso.evaluation.totalRolls) || 0;

            totalCurrentRolls += currentRolls;
            totalMaxRolls += parseFloat(maxRolls);
            validScoreChars++;
        }

        // 1. Arme Niv. 90
        if (perso.weapon && (perso.weapon.level >= 90 || (perso.weapon.level >= 80 && perso.weapon.ascension >= 6))) {
            weaponMaxCount++;
        }

        // 2. Perso Niv. 90 (ou 80/90)
        if (perso.level >= 90 || (perso.level >= 80 && perso.ascension >= 6)) {
            charMaxLevelCount++;
        }

        // 3. Aptitudes
        const targets = (config.talents && typeof config.talents.auto === 'number')
            ? config.talents
            : (config.talents?.target || config.talents || { auto: 1, skill: 8, burst: 8 });
        const keyMap = { auto: 0, skill: 1, burst: 2 };
        if (perso.talents && perso.talents.length >= 3) {
            Object.entries(keyMap).forEach(([k, idx]) => {
                const targetLvl = targets[k] || 1;
                if (targetLvl > 1) { // Ne compte que les aptitudes utiles
                    totalTalentsChecked++;
                    const currentLvl = perso.talents[idx]?.level || 1;
                    if (currentLvl >= targetLvl) {
                        talentsMetTarget++;
                    }
                }
            });
        }

        // 4. Main Stats
        const validSlots = ['EQUIP_SHOES', 'EQUIP_RING', 'EQUIP_DRESS'];
        const idealMainStats = config.idealMainStats || {};
        if (perso.artefacts && perso.artefacts.length > 0) {
            perso.artefacts.forEach(art => {
                if (validSlots.includes(art.type)) {
                    totalMainStatsChecked++;
                    const ideals = idealMainStats[art.type] || [];
                    const currentKey = art.mainStat?.key;
                    if (ideals.includes(currentKey) || (config.weights && (config.weights[currentKey] || 0) >= 0.75)) {
                        mainStatsOptimal++;
                    }
                }
            });
        }

        // 5. Sets
        const bestSets = (config.bestSets || []).map(s => s.split(':')[0]);
        const goodSets = (config.goodSets || []).map(s => s.split(':')[0]);
        const activeSetKeys = Object.keys(perso.setsCounter || {}).filter(k => perso.setsCounter[k] >= 2);
        let hasOptimalSet = false;
        if (activeSetKeys.some(k => bestSets.includes(k) || goodSets.includes(k))) {
            hasOptimalSet = true;
        } else if (Object.values(perso.setsCounter || {}).some(count => count >= 4)) {
            hasOptimalSet = true;
        }
        if (hasOptimalSet) {
            optimalSetsCount++;
        }
    });

    const weaponsPct = totalChars > 0 ? Math.round((weaponMaxCount / totalChars) * 100) : 0;
    const levelsPct = totalChars > 0 ? Math.round((charMaxLevelCount / totalChars) * 100) : 0;
    const talentsPct = totalTalentsChecked > 0 ? Math.round((talentsMetTarget / totalTalentsChecked) * 100) : 100;
    const mainstatsPct = totalMainStatsChecked > 0 ? Math.round((mainStatsOptimal / totalMainStatsChecked) * 100) : 100;
    const setsPct = totalChars > 0 ? Math.round((optimalSetsCount / totalChars) * 100) : 0;

    // Calcul de l'indice de maturité globale (sur 100)
    const globalIndex = Math.round(
        (weaponsPct * 0.20) +
        (levelsPct * 0.15) +
        (talentsPct * 0.25) +
        (mainstatsPct * 0.20) +
        (setsPct * 0.20)
    );

    const avgScore = totalChars > 0 ? (sumScores / totalChars).toFixed(1) : 0;

    // 1. Récupération prioritaire depuis la Note Globale (#global-evaluation) si présente dans le DOM
    let avgGrade = null;
    let gradeColor = null;

    if (typeof document !== 'undefined') {
        const evalContainer = document.getElementById('global-evaluation');
        if (evalContainer) {
            const gradeEl = evalContainer.querySelector('p[style*="font-size: 42px"], p[style*="font-size:42px"]');
            if (gradeEl && gradeEl.textContent.trim()) {
                avgGrade = gradeEl.textContent.trim();
                gradeColor = gradeEl.style.color || getGradeColor(avgGrade);
            }
        }
    }

    // 2. Calcul rigoureusement identique à GlobalEvaluation en secours
    if (!avgGrade && validScoreChars > 0 && totalMaxRolls > 0) {
        const labels = [
            "F", "F+", "D", "D+", "C", "C+", "B", "B+", "A", "A+",
            "S", "S+", "SS", "SS+", "SSS", "SSS+", "WTF", "WTF+", "ARCHON"
        ];
        const steps = labels.length - 1;
        const globalInterval = totalMaxRolls / steps;

        for (let i = steps; i >= 0; i--) {
            const threshold = i * globalInterval;
            if (totalCurrentRolls >= threshold - (0.05 * validScoreChars)) {
                avgGrade = labels[i];
                gradeColor = getGradeColor(labels[i]);
                break;
            }
        }
    }

    if (!avgGrade) {
        avgGrade = 'F';
        gradeColor = getGradeColor('F');
    }

    let maturityColor = '#22c55e';
    if (globalIndex >= 80) maturityColor = '#22c55e';
    else if (globalIndex >= 60) maturityColor = '#3b82f6';
    else if (globalIndex >= 40) maturityColor = '#eab308';
    else maturityColor = '#ef4444';

    return {
        globalIndex,
        maturityColor,
        avgScore,
        avgGrade,
        gradeColor,
        metrics: {
            weapons: { cur: weaponMaxCount, total: totalChars, pct: weaponsPct },
            levels: { cur: charMaxLevelCount, total: totalChars, pct: levelsPct },
            talents: { cur: talentsMetTarget, total: totalTalentsChecked, pct: talentsPct },
            mainstats: { cur: mainStatsOptimal, total: totalMainStatsChecked, pct: mainstatsPct },
            sets: { cur: optimalSetsCount, total: totalChars, pct: setsPct }
        }
    };
}

export function renderMaturityBarometer(characters) {
    const data = calculateAccountMaturity(characters);
    const m = data.metrics;

    const metricItems = [
        { label: t('roadmap.maturity.weapons'), cur: m.weapons.cur, total: m.weapons.total, pct: m.weapons.pct },
        { label: t('roadmap.maturity.characters'), cur: m.levels.cur, total: m.levels.total, pct: m.levels.pct },
        { label: t('roadmap.maturity.talents'), cur: m.talents.cur, total: m.talents.total, pct: m.talents.pct },
        { label: t('roadmap.maturity.mainstats'), cur: m.mainstats.cur, total: m.mainstats.total, pct: m.mainstats.pct },
        { label: t('roadmap.maturity.sets'), cur: m.sets.cur, total: m.sets.total, pct: m.sets.pct }
    ];

    return `
        <div class="roadmap-card" style="background:var(--bg-panel); border-radius:8px; padding:20px; display:flex; flex-direction:column; gap:8px;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">
                <div>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <h2 style="font-size:16px; font-weight:700; color:var(--text-primary); margin:0;">${t('roadmap.maturity.title')}</h2>
                    </div>
                    <p style="font-size:12px; color:var(--text-grey); margin:4px 0 0 0;">${t('roadmap.maturity.desc')}</p>
                </div>
                
                <div style="display:flex; align-items:center; gap:16px;">
                    <div style="padding:8px 14px; text-align:center; min-width:80px;">
                        <div style="font-size:11px; color:var(--text-grey); text-transform:uppercase;">${t('roadmap.maturity.avgScore')}</div>
                        <div style="font-size:22px; color:var(--text-primary);">${data.avgScore} <span style="font-size:13px; font-weight:700; color:${data.gradeColor};">(${data.avgGrade})</span></div>
                    </div>
                    
                    <div style="padding:8px 14px; text-align:center; min-width:80px;">
                        <div style="font-size:11px; color:var(--text-grey); text-transform:uppercase;">${t('roadmap.maturity.globalIndex')}</div>
                        <div style="font-size:22px; color:${data.maturityColor};">${data.globalIndex}%</div>
                    </div>
                </div>
            </div>

            <!-- Grille des jauges de maturité -->
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:12px; margin-top:6px;">
                ${metricItems.map(item => `
                    <div style="background:rgba(0,0,0,0.2); border-radius:8px; padding:12px; display:flex; flex-direction:column; gap:6px; justify-content: space-between;">
                        <div style="display:flex; justify-content:space-between; align-items:center; font-size:12px;">
                            <span style="color:var(--text-primary); font-weight:500;">
                                ${item.label}
                            </span>
                            <span style="color:var(--text-grey); font-size:11px;">${item.cur}/${item.total}</span>
                        </div>
                        <div style="display:flex; align-items:center; gap:8px;">
                            <div style="flex:1; height:6px; background:rgba(255,255,255,0.08); border-radius:3px; overflow:hidden; position:relative;">
                                <div style="position:absolute; top:0; left:0; bottom:0; width:${item.pct}%; background:linear-gradient(90deg, #3b82f6, ${item.pct >= 80 ? '#22c55e' : '#f59e0b'}); border-radius:3px; transition:width 0.6s ease;"></div>
                            </div>
                            <span style="font-size:11px; color:var(--text-primary); min-width:32px; text-align:right;">${item.pct}%</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}
