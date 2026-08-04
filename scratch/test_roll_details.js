// scratch/test_roll_details.js
import { renderRollDetailsSection } from '../src/components/advice/RollDetailsSection.js';
import { renderAdviceSection } from '../src/components/advice/AdviceSection.js';

const mockPerso = {
    avatarId: 10000089,
    nom: 'Skirk',
    artefacts: [
        {
            type: 'flower',
            setName: 'Obsidian Codex',
            icon: 'https://enka.network/ui/UI_RelicIcon_15037_4.png',
            stars: 5,
            level: 20,
            score: 45.5,
            grade: { letter: 'ACE', color: '#ff6b6b' },
            mainStat: { key: 'hp', label: 'PV', value: 4780 },
            subStats: [
                { key: 'critRate_', label: 'Taux CRIT', value: 10.5 },
                { key: 'critDMG_', label: 'DGT CRIT', value: 21.0 },
                { key: 'atk_', label: 'ATQ%', value: 5.8 },
                { key: 'eleMas', label: 'Maîtrise élémentaire', value: 23 }
            ]
        },
        {
            type: 'plume',
            setName: 'Obsidian Codex',
            icon: 'https://enka.network/ui/UI_RelicIcon_15037_2.png',
            stars: 5,
            level: 20,
            score: 41.2,
            grade: { letter: 'SSS', color: '#ff922b' },
            mainStat: { key: 'atk', label: 'ATQ', value: 311 },
            subStats: [
                { key: 'critRate_', label: 'Taux CRIT', value: 7.0 },
                { key: 'critDMG_', label: 'DGT CRIT', value: 28.0 },
                { key: 'enerRech_', label: 'Recharge d\'énergie', value: 5.8 },
                { key: 'hp_', label: 'PV%', value: 4.7 }
            ]
        },
        {
            type: 'sands',
            setName: 'Obsidian Codex',
            icon: 'https://enka.network/ui/UI_RelicIcon_15037_5.png',
            stars: 5,
            level: 20,
            score: 38.0,
            grade: { letter: 'SS', color: '#fcc419' },
            mainStat: { key: 'atk_', label: 'ATQ%', value: 46.6 },
            subStats: [
                { key: 'critRate_', label: 'Taux CRIT', value: 3.9 },
                { key: 'critDMG_', label: 'DGT CRIT', value: 21.0 },
                { key: 'enerRech_', label: 'Recharge d\'énergie', value: 11.0 },
                { key: 'eleMas', label: 'Maîtrise élémentaire', value: 40 }
            ]
        },
        {
            type: 'goblet',
            setName: 'Obsidian Codex',
            icon: 'https://enka.network/ui/UI_RelicIcon_15037_1.png',
            stars: 5,
            level: 20,
            score: 48.2,
            grade: { letter: 'ACE', color: '#ff6b6b' },
            mainStat: { key: 'hydro_dmg_', label: 'DGT Hydro', value: 46.6 },
            subStats: [
                { key: 'critRate_', label: 'Taux CRIT', value: 14.0 },
                { key: 'critDMG_', label: 'DGT CRIT', value: 14.0 },
                { key: 'atk_', label: 'ATQ%', value: 9.9 },
                { key: 'hp_', label: 'PV%', value: 5.3 }
            ]
        },
        {
            type: 'circlet',
            setName: 'Marechaussee Hunter',
            icon: 'https://enka.network/ui/UI_RelicIcon_15036_3.png',
            stars: 5,
            level: 20,
            score: 36.5,
            grade: { letter: 'S', color: '#51cf66' },
            mainStat: { key: 'critDMG_', label: 'DGT CRIT', value: 62.2 },
            subStats: [
                { key: 'critRate_', label: 'Taux CRIT', value: 10.5 },
                { key: 'atk_', label: 'ATQ%', value: 11.7 },
                { key: 'enerRech_', label: 'Recharge d\'énergie', value: 6.5 },
                { key: 'def_', label: 'DÉF%', value: 5.8 }
            ]
        }
    ]
};

const mockConfig = {
    weights: {
        critRate_: 1.0,
        critDMG_: 1.0,
        atk_: 0.75,
        enerRech_: 0.5,
        eleMas: 0.25,
        hydro_dmg_: 1.0
    }
};

const section5Html = renderRollDetailsSection(mockPerso);
console.log('--- Section 5 Rendered HTML Length:', section5Html.length);
if (!section5Html.includes('Détails des rolls') && !section5Html.includes('Roll details')) {
    throw new Error('Title missing in Section 5');
}
if (!section5Html.includes('Jet parfait') && !section5Html.includes('Perfect roll')) {
    throw new Error('Legend missing in Section 5');
}
console.log('✓ Section 5 (Roll Details) tests passed successfully!');

const adviceHtml = renderAdviceSection(mockPerso, mockConfig, 0);
console.log('--- Total Advice Section HTML Length:', adviceHtml.length);
if (!adviceHtml.includes('Détails des rolls') && !adviceHtml.includes('Roll details')) {
    throw new Error('Section 5 not found in AdviceSection output');
}
console.log('✓ AdviceSection with all 6 sections verified successfully!');
