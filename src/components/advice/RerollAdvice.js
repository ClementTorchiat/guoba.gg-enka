// src/components/advice/RerollAdvice.js
import { t } from '../../scripts/i18n.js';
import { MAX_ROLLS } from '../../scripts/data.js';

export function calculateRerollMetrics(artifact, config) {
    if (!config || !config.weights) return null;

    if ((artifact.stars || 5) < 4) {
        return {
            potential: 0,
            risk: 0,
            badge: { text: t('reroll.na.stars', artifact.stars ?? '?'), color: "#6b7280" }
        };
    }

    if ((artifact.stars || 5) === 4) {
        return {
            potential: 0,
            risk: 0,
            badge: { text: t('reroll.na.stars', 4), color: "#6b7280" }
        };
    }

    if ((artifact.level || 0) < 20) {
        return {
            potential: 0,
            risk: 0,
            badge: { text: t('reroll.na.level', artifact.level ?? 0), color: "#6b7280" }
        };
    }

    let totalRolls = 0;
    let terrainWeights = [];
    let upgradeTokens = [];
    let maxWeightOnArtifact = 0;

    (artifact.subStats || []).forEach(sub => {
        const rolls = (typeof window !== 'undefined' && window.getRollCount)
            ? window.getRollCount(sub.key, sub.value, artifact.stars || 5)
            : 1;
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
    const top2Avg = ((sortedTerrain[0] || 0) + (sortedTerrain[1] || 0)) / 2;
    const bot2Avg = ((sortedTerrain[2] || 0) + (sortedTerrain[3] || 0)) / 2;

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

    if ((sortedTerrain[0] || 0) === 0 && (sortedTerrain[1] || 0) === 0) {
        badge = { text: t("reroll.trash"), color: "#4b5563" };
    } else if (risk > 75) {
        badge = { text: t("reroll.tooRisky"), color: "#ef4444" };
    } else if (potential > 40 && risk < 35) {
        badge = { text: t("reroll.recommended"), color: "#22c55e" };
    } else if (potential > 15) {
        badge = { text: t("reroll.optimizable"), color: "#3b82f6" };
    } else {
        badge = { text: t("reroll.notWorth"), color: "#f97316" };
    }

    return {
        potential: Math.round(potential),
        risk: Math.round(risk),
        badge
    };
}
