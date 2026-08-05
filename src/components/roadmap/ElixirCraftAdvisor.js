// src/components/roadmap/ElixirCraftAdvisor.js
import { t, LANG } from '../../scripts/i18n.js';
import { getLocalizedSetName } from './DomainPlanner.js';
import { ICON_MAP, ICON_BASE_PATH } from '../../scripts/icons.js';
import { SCORING_NORMS, MAINSTAT_ROLL_VALUE, VARIABLE_PIECES, calculateMainStatBonus } from '../../scripts/scoring.js';
import SLOT_POSSIBLE_MAIN_STATS from '../../data/slot_possible_main_stats.json';

const ELIXIR_COSTS = {
    "EQUIP_BRACER": 1,
    "EQUIP_NECKLACE": 1,
    "EQUIP_SHOES": 2,
    "EQUIP_DRESS": 3,
    "EQUIP_RING": 4
};

const SLOT_ORDER = ["EQUIP_BRACER", "EQUIP_NECKLACE", "EQUIP_SHOES", "EQUIP_RING", "EQUIP_DRESS"];

const PIECE_SLOT_NUM = {
    "EQUIP_BRACER": "4",   // Fleur
    "EQUIP_NECKLACE": "2",  // Plume
    "EQUIP_SHOES": "5",     // Sablier
    "EQUIP_RING": "1",      // Coupe
    "EQUIP_DRESS": "3"      // Casque
};

const FIXED_MAIN = {
    "EQUIP_BRACER": "hp",
    "EQUIP_NECKLACE": "atk"
};

const VALID_SUBSTATS = ["critRate_", "critDMG_", "atk_", "hp_", "def_", "eleMas", "enerRech_"];

// Rareté naturelle du drop en donjon (1/P_drop)
const NATURAL_RARITY_MULTIPLIER = {
    "EQUIP_RING": 6.0,    // Coupe Élémentaire double crit dans le bon set (~0.04%)
    "EQUIP_DRESS": 3.5,   // Casque Crit (~0.3%)
    "EQUIP_SHOES": 2.5,   // Sablier (~0.65%)
    "EQUIP_NECKLACE": 1.0,// Plume (~2.5%)
    "EQUIP_BRACER": 1.0   // Fleur (~2.5%)
};

const BASE_RESIN_ESTIMATE = {
    "EQUIP_RING": 12000,
    "EQUIP_DRESS": 7000,
    "EQUIP_SHOES": 4500,
    "EQUIP_NECKLACE": 1200,
    "EQUIP_BRACER": 1200
};

// Valeurs moyennes de rolls de base pour estimer l'Expected Value
const AVG_BASE_ROLLS = {
    "critRate_": 3.3,
    "critDMG_": 6.6,
    "atk_": 4.96,
    "hp_": 4.96,
    "def_": 6.2,
    "eleMas": 19.75,
    "enerRech_": 5.5
};

// SVG minimaliste d'une fiole d'élixir
export function getFlaskSvg(size = 12, color = 'currentColor') {
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:-1px; flex-shrink:0;"><path d="M9 3h6v4.5l4 7.5a3 3 0 0 1-2.6 4.5H7.6A3 3 0 0 1 5 15l4-7.5V3z"/><line x1="8" y1="3" x2="16" y2="3"/><path d="M7 14.5h10" stroke-width="1.5"/></svg>`;
}

// Détermination de l'icône exacte de la pièce selon son slot (Fleur, Plume, Sablier, Coupe, Casque)
export function getArtifactPieceIcon(setKey, slotType, characters = []) {
    if (!setKey) return null;
    const cleanKey = setKey.split(':')[0];
    const pieceNum = PIECE_SLOT_NUM[slotType] || '4';

    // 1. Chercher un artéfact exact de ce slot dans les persos
    if (characters && Array.isArray(characters)) {
        for (const p of characters) {
            const exactMatch = (p.artefacts || []).find(a => a.setKey === cleanKey && a.type === slotType);
            if (exactMatch && exactMatch.icon) return exactMatch.icon;
        }
        // 2. Sinon chercher n'importe quel artéfact de ce set et ajuster le suffixe du slot
        for (const p of characters) {
            const anyMatch = (p.artefacts || []).find(a => a.setKey === cleanKey && a.icon);
            if (anyMatch && anyMatch.icon) {
                const base = anyMatch.icon.substring(0, anyMatch.icon.lastIndexOf('_'));
                return `${base}_${pieceNum}.png`;
            }
        }
    }

    // 3. Chercher dans ITEM_ICON_MAP
    if (typeof window !== 'undefined' && window.ITEM_ICON_MAP && window.ITEM_ICON_MAP[cleanKey]) {
        const url = window.ITEM_ICON_MAP[cleanKey];
        if (url.includes('_')) {
            const base = url.substring(0, url.lastIndexOf('_'));
            return `${base}_${pieceNum}.png`;
        }
        return url;
    }

    // 4. Fallback via iconToNameHash si disponible
    if (typeof window !== 'undefined' && window.iconToNameHash && window.HASH_TO_KEY) {
        const targetHash = Object.keys(window.HASH_TO_KEY).find(h => window.HASH_TO_KEY[h] === cleanKey);
        if (targetHash) {
            for (const [icon, hash] of Object.entries(window.iconToNameHash)) {
                if (String(hash) === String(targetHash)) {
                    const base = icon.substring(0, icon.lastIndexOf('_'));
                    return `https://enka.network/ui/${base}_${pieceNum}.png`;
                }
            }
        }
    }

    return null;
}

export function getElixirCraftRecommendations(characters, focusCharNom = null, budgetFilter = 'all') {
    if (!characters || characters.length === 0) return [];

    const recommendations = [];

    characters.forEach(perso => {
        const config = perso.activeBuild ? { ...perso.charConfig, ...perso.activeBuild } : (perso.charConfig || {});
        if (!config || !config.weights) return;

        const isFocus = focusCharNom && perso.nom === focusCharNom;
        const weights = config.weights || {};

        // Nom du build actif
        const buildName = perso.activeBuild?.name?.[LANG]
            || perso.activeBuild?.name?.['fr']
            || perso.activeBuild?.name?.['en']
            || (typeof perso.activeBuild?.name === 'string' ? perso.activeBuild.name : null);

        // Set optimal pour ce personnage (Best in Slot)
        const targetSetKey = (config.bestSets && config.bestSets.length > 0)
            ? config.bestSets[0].split(':')[0]
            : (perso.artefacts?.[0]?.setKey || 'GladiatorsFinale');

        const setName = getLocalizedSetName(targetSetKey, characters);

        SLOT_ORDER.forEach(slotType => {
            const cost = ELIXIR_COSTS[slotType] || 1;

            // Filtre par budget
            if (budgetFilter !== 'all' && String(cost) !== String(budgetFilter)) {
                return;
            }

            const pieceIcon = getArtifactPieceIcon(targetSetKey, slotType, characters);

            // Pièce actuellement équipée
            const curArt = (perso.artefacts || []).find(a => a.type === slotType);
            const curScore = curArt ? (curArt.score || 0) : 0;
            const curGrade = curArt?.grade?.letter || '?';
            const curGradeColor = curArt?.grade?.color || '#888';

            // 1. Détermination de la Stat Principale Cible
            let mainStatKey = 'atk';
            if (FIXED_MAIN[slotType]) {
                mainStatKey = FIXED_MAIN[slotType];
            } else {
                const idealStats = (config.idealMainStats && config.idealMainStats[slotType]) || [];
                if (idealStats.length > 0) {
                    mainStatKey = idealStats[0];
                } else {
                    const possible = SLOT_POSSIBLE_MAIN_STATS[slotType] || [];
                    const best = possible
                        .map(k => ({ key: k, w: weights[k] || (k.includes('_dmg_') ? (weights['elemental_dmg_'] || 0) : 0) }))
                        .sort((a, b) => b.w - a.w)[0];
                    mainStatKey = best ? best.key : 'atk_';
                }
            }

            let mainWeight = weights[mainStatKey];
            if (mainWeight === undefined && mainStatKey.includes('_dmg_')) {
                mainWeight = weights['elemental_dmg_'];
            }
            mainWeight = mainWeight || 0;

            // 2. Détermination des 2 Substats Choisies (Anti-Chevauchement avec MainStat)
            const availableSubs = VALID_SUBSTATS
                .filter(k => k !== mainStatKey && (weights[k] || 0) > 0)
                .map(k => ({ key: k, w: weights[k] || 0 }))
                .sort((a, b) => b.w - a.w);

            // Fallback si moins de 2 substats pondérées
            if (availableSubs.length < 2) {
                const fallbackPool = ["enerRech_", "atk_", "hp_", "critRate_", "critDMG_"];
                fallbackPool.forEach(fb => {
                    if (fb !== mainStatKey && !availableSubs.some(s => s.key === fb) && availableSubs.length < 2) {
                        availableSubs.push({ key: fb, w: weights[fb] || 0.1 });
                    }
                });
            }

            const chosenSub1 = availableSubs[0] || { key: 'critRate_', w: 1 };
            const chosenSub2 = availableSubs[1] || { key: 'critDMG_', w: 1 };

            // 3. Calcul de l'Expected Value (Score Espéré Moyen à +20 dans les métriques de scoreArtifact)
            let baseMainScore = 0;
            if (mainWeight > 0) {
                baseMainScore += MAINSTAT_ROLL_VALUE * (SCORING_NORMS[mainStatKey] || 1) * mainWeight;
            }

            // Valeur des 2 substats choisies garanties au niveau 0
            const rollVal1 = AVG_BASE_ROLLS[chosenSub1.key] || 5.0;
            const norm1 = SCORING_NORMS[chosenSub1.key] || 1;
            const w1 = chosenSub1.w || 1;
            const ptsPerRoll1 = rollVal1 * norm1 * w1;

            const rollVal2 = AVG_BASE_ROLLS[chosenSub2.key] || 5.0;
            const norm2 = SCORING_NORMS[chosenSub2.key] || 1;
            const w2 = chosenSub2.w || 1;
            const ptsPerRoll2 = rollVal2 * norm2 * w2;

            // Score des substats initiales à +0 (2 substats BiS choisies + résiduel utile des 2 autres)
            const avgBiSRollPts = (ptsPerRoll1 + ptsPerRoll2) / 2;
            const baseSubScore = ptsPerRoll1 + ptsPerRoll2 + (avgBiSRollPts * 0.5);

            // Contribution des 5 rolls d'amélioration (+4 à +20) :
            // ~2.5 rolls dans les 2 substats BiS choisies + ~0.8 roll résiduel utile
            const upgradeScore = (2.5 * avgBiSRollPts) + (0.8 * avgBiSRollPts * 0.6);

            const expectedScore = parseFloat((baseMainScore + baseSubScore + upgradeScore).toFixed(1));
            const deltaScore = parseFloat((expectedScore - curScore).toFixed(1));

            // Si la pièce actuelle est déjà aussi bonne ou meilleure que le craft espéré, ne pas recommander ce craft
            if (deltaScore < 1.0) {
                return;
            }

            // Probabilité de surclassement
            let upgradeChance = 95;
            if (curScore >= 42) upgradeChance = 25;
            else if (curScore >= 35) upgradeChance = 50;
            else if (curScore >= 28) upgradeChance = 75;
            else if (curScore >= 20) upgradeChance = 90;

            // Score d'Efficacité ROI pondéré par la rareté naturelle de drop
            const rarityFactor = NATURAL_RARITY_MULTIPLIER[slotType] || 1.0;
            const rawRoi = cost > 0 ? (deltaScore / cost) : 0;
            const roiComposite = parseFloat((rawRoi * rarityFactor).toFixed(1));

            // Estimation de résine économisée
            const baseResin = BASE_RESIN_ESTIMATE[slotType] || 2000;
            const savedResin = Math.max(800, Math.round(baseResin * (deltaScore / 20)));

            // Détermination du verdict
            let verdict = 'moderate';
            let verdictColor = '#3b82f6';
            if (roiComposite >= 30 || (deltaScore >= 16 && cost <= 2)) {
                verdict = 'exceptional';
                verdictColor = '#f59e0b';
            } else if (roiComposite >= 18 || deltaScore >= 10) {
                verdict = 'high';
                verdictColor = '#c084fc';
            } else if (upgradeChance >= 80 && deltaScore >= 5) {
                verdict = 'safe';
                verdictColor = '#22c55e';
            }

            recommendations.push({
                persoNom: perso.nom,
                persoImage: perso.image,
                buildName,
                slotType,
                slotName: t('artifact.' + slotType),
                targetSetKey,
                setName,
                pieceIcon,
                mainStatKey,
                mainStatLabel: t('stat.' + mainStatKey),
                chosenSub1: { key: chosenSub1.key, label: t('stat.' + chosenSub1.key) },
                chosenSub2: { key: chosenSub2.key, label: t('stat.' + chosenSub2.key) },
                cost,
                curScore,
                curGrade,
                curGradeColor,
                expectedScore,
                deltaScore,
                upgradeChance,
                rawRoi,
                roiComposite,
                savedResin,
                verdict,
                verdictColor,
                isFocus
            });
        });
    });

    // Tri : priorité au personnage en Focus si sélectionné, puis par ROI Composite décroissant
    recommendations.sort((a, b) => {
        if (focusCharNom) {
            const focusA = a.isFocus ? 1 : 0;
            const focusB = b.isFocus ? 1 : 0;
            if (focusA !== focusB) return focusB - focusA;
        }
        return b.roiComposite - a.roiComposite;
    });

    return recommendations.slice(0, 6);
}

export function renderElixirCraftAdvisor(characters, focusCharNom = null, budgetFilter = (typeof window !== 'undefined' ? (window.roadmapElixirBudget || 'all') : 'all')) {
    const recs = getElixirCraftRecommendations(characters, focusCharNom, budgetFilter);

    const budgets = [
        { key: 'all', label: t('roadmap.elixir.budget.all'), count: null },
        { key: '1', label: '1', fullLabel: t('roadmap.elixir.budget.1'), count: 1 },
        { key: '2', label: '2', fullLabel: t('roadmap.elixir.budget.2'), count: 2 },
        { key: '3', label: '3', fullLabel: t('roadmap.elixir.budget.3'), count: 3 },
        { key: '4', label: '4', fullLabel: t('roadmap.elixir.budget.4'), count: 4 }
    ];

    return `
        <div class="roadmap-card" style="background:var(--bg-panel); border-radius:8px; padding:20px; display:flex; flex-direction:column; gap:16px;">
            
            <!-- Header du Module avec Filtres de Budget -->
            <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">
                <div>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <h2 style="font-size:16px; font-weight:700; color:var(--text-primary); margin:0;">
                            ${t('roadmap.elixir.title')}
                        </h2>
                    </div>
                    <p style="font-size:12px; color:var(--text-grey); margin:4px 0 0 0;">
                        ${t('roadmap.elixir.desc')}
                    </p>
                </div>

                <!-- Sélecteur de Budget d'Élixirs -->
                <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                    ${budgets.map(b => {
                        const isSelected = String(budgetFilter) === String(b.key);
                        return `
                            <button data-action="set-elixir-budget"
                                    data-budget="${b.key}"
                                    type="button"
                                    title="${b.fullLabel || b.label}"
                                    style="display:inline-flex; align-items:center; gap:4px; padding:4px 10px; border-radius:8px; font-size:11px; cursor:pointer; transition:all 0.2s ease; border:${isSelected ? '1px solid #f59e0b' : 'none'}; background:${isSelected ? 'rgba(245,158,11,0.18)' : 'rgba(0,0,0,0.2)'}; color:${isSelected ? 'var(--accent-gold, #f59e0b)' : 'var(--text-grey)'};">
                                <span>${b.label}</span>
                                ${b.count ? getFlaskSvg(11, isSelected ? '#f59e0b' : 'var(--text-grey)') : ''}
                            </button>
                        `;
                    }).join('')}
                </div>
            </div>

            <!-- Grille des Recommandations de Craft -->
            ${recs.length === 0 ? `
                <div style="padding:16px; background:rgba(255,255,255,0.02); border-radius:8px; color:var(--text-grey); font-size:13px; text-align:center;">
                    ${t('roadmap.elixir.empty')}
                </div>
            ` : `
                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:12px;">
                    ${recs.map(rec => `
                        <div style="background:${rec.isFocus ? 'rgba(59,130,246,0.08)' : 'rgba(0,0,0,0.2)'}; border:${rec.isFocus ? '1px solid rgba(59,130,246,0.4)' : 'none'}; border-radius:10px; padding:14px; display:flex; flex-direction:column; gap:12px; position:relative;">
                            
                            <!-- Ligne 1 : Perso + Build + Coût Élixir -->
                            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid var(--border-color); padding-bottom: 8px;">
                                <div style="display:flex; align-items:center; gap:8px; min-width:0;">
                                    <img src="${rec.persoImage}" alt="${rec.persoNom}" style="width:34px; height:34px; border-radius:6px; background:rgba(0,0,0,0.2); flex-shrink:0; border:${rec.isFocus ? '1px solid #60a5fa' : 'none'};">
                                    <div style="min-width:0;">
                                        <div style="display:flex; align-items:center; gap:6px;">
                                            <span style="font-size:13px; font-weight:700; color:${rec.isFocus ? '#60a5fa' : 'var(--text-primary)'}; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                                                ${rec.persoNom}
                                            </span>
                                            ${rec.isFocus ? `
                                                <span style="font-size:9px; font-weight:700; padding:1px 5px; border-radius:6px; background:rgba(59,130,246,0.2); color:#60a5fa; border:1px solid rgba(59,130,246,0.4);">
                                                    ${t('roadmap.elixir.focusPriority')}
                                                </span>
                                            ` : ''}
                                        </div>
                                        ${rec.buildName ? `
                                            <div style="font-size:10px; color:var(--text-grey); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                                                ${rec.buildName}
                                            </div>
                                        ` : ''}
                                    </div>
                                </div>

                                <div style="display:flex; align-items:center; gap:6px; flex-shrink:0;">
                                    <!-- Badge Coût Élixirs avec SVG Minimaliste -->
                                    <span style="font-size:11px; font-weight:700; padding:3px 8px; border-radius:8px; background:rgba(245,158,11,0.15); color:#f59e0b; display:inline-flex; align-items:center; gap:4px;">
                                        <span>${rec.cost}</span>
                                        ${getFlaskSvg(12, '#f59e0b')}
                                    </span>
                                </div>
                            </div>

                            <!-- Ligne 2 : Détail du Craft Prévu (Set, Slot, Mainstat & Substats) -->
                            <div style="display:flex; flex-direction:column; gap:8px; background:rgba(255,255,255,0.02); padding:10px; border-radius:8px;">
                                <div style="display:flex; justify-content:space-between; align-items:center; gap:8px;">
                                    <div style="display:flex; align-items:center; gap:8px; min-width:0;">
                                        ${rec.pieceIcon ? `<img src="${rec.pieceIcon}" alt="${rec.setName}" style="width:28px; height:28px; border-radius:4px; object-fit:contain; flex-shrink:0;" onerror="this.style.display='none'">` : ''}
                                        <div style="display:flex; flex-direction:column; min-width:0;">
                                            <span style="font-size:12px; font-weight:700; color:var(--text-primary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                                                ${rec.slotName}
                                            </span>
                                            <span style="font-size:10px; color:var(--text-grey); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                                                ${rec.setName}
                                            </span>
                                        </div>
                                    </div>
                                    <div style="display:flex; align-items:center; gap:4px; flex-shrink:0; white-space:nowrap;">
                                        <img src="${ICON_BASE_PATH}${ICON_MAP[rec.mainStatKey] || ICON_MAP['unknown']}" style="width:14px; height:14px; flex-shrink:0;" alt="">
                                        <span style="font-size:11px; font-weight:600; color:var(--text-primary); white-space:nowrap;">${rec.mainStatLabel}</span>
                                    </div>
                                </div>

                                <!-- Les 2 Substats Garanties -->
                                <div style="display:flex; flex-direction:column; gap:4px; font-size:11px;">
                                    <span style="color:var(--text-grey); font-size:10px;">${t('roadmap.elixir.substats')}</span>
                                    <div style="display:flex; align-items:center; gap:5px; flex-wrap:wrap;">
                                        <span style="background:rgba(245,158,11,0.12); color:#fbbf24; padding:2px 6px; border-radius:4px; font-size:10px; font-weight:600; display:flex; align-items:center; gap:3px;">
                                            <img src="${ICON_BASE_PATH}${ICON_MAP[rec.chosenSub1.key] || ICON_MAP['unknown']}" style="width:10px; height:10px;" alt="">
                                            ${rec.chosenSub1.label}
                                        </span>
                                        <span style="background:rgba(245,158,11,0.12); color:#fbbf24; padding:2px 6px; border-radius:4px; font-size:10px; font-weight:600; display:flex; align-items:center; gap:3px;">
                                            <img src="${ICON_BASE_PATH}${ICON_MAP[rec.chosenSub2.key] || ICON_MAP['unknown']}" style="width:10px; height:10px;" alt="">
                                            ${rec.chosenSub2.label}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <!-- Ligne 3 : Comparatif Score Actuel vs Espéré & Rentabilité -->
                            <div style="display:flex; justify-content:space-between; align-items:center; gap:8px;">
                                <div style="display:flex; flex-direction:column; gap:2px;">
                                    <div style="font-size:10px; color:var(--text-grey);">
                                        ${t('roadmap.elixir.currentPiece')} <span style="color:${rec.curGradeColor}; font-weight:700;">${rec.curScore} pts (${rec.curGrade})</span>
                                    </div>
                                    <div style="font-size:12px; font-weight:800; color:#22c55e;">
                                        ${t('roadmap.elixir.expectedGain', rec.deltaScore)}
                                    </div>
                                </div>

                                <div style="display:flex; flex-direction:column; align-items:flex-end; gap:2px;">
                                    <span style="font-size:10px; font-weight:700; padding:2px 7px; border-radius:6px; background:${rec.verdictColor}18; color:${rec.verdictColor};">
                                        ${t('roadmap.elixir.verdict.' + rec.verdict)}
                                    </span>
                                    <span style="font-size:10px; color:var(--text-grey);">
                                        ${t('roadmap.elixir.savedResin', rec.savedResin)}
                                    </span>
                                </div>
                            </div>

                        </div>
                    `).join('')}
                </div>
            `}
        </div>
    `;
}
