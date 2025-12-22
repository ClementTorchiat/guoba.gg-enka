/* =========================================
   DONNÉES DE RÉFÉRENCE (Genshin Impact V3+)
   ========================================= */

// Les 4 valeurs possibles pour chaque proc de substat (5 étoiles)
// Cela correspond aux qualités : 0.7, 0.8, 0.9 et 1.0
const BASE_ROLLS = {
    "critRate_": [2.72, 3.11, 3.50, 3.89],
    "critDMG_": [5.44, 6.22, 6.99, 7.77],
    "atk_": [4.08, 4.66, 5.25, 5.83],
    "hp_": [4.08, 4.66, 5.25, 5.83],
    "def_": [5.10, 5.83, 6.56, 7.29],
    "enerRech_": [4.53, 5.18, 5.83, 6.48],
    "eleMas": [16.32, 18.65, 20.98, 23.31],
    "atk": [13.62, 15.56, 17.51, 19.45],
    "hp": [209.13, 239.00, 268.88, 298.75],
    "def": [16.20, 18.52, 20.83, 23.15]
};

// Pour le calcul rapide : la valeur maximale d'un roll (vaut 1 point)
// AJOUTER À LA FIN DE data.js

// Valeurs maximales possibles pour une substat (Vaut 1.0 point de notation)
// On attache directement à window pour être sûr que scoring.js le trouve
window.MAX_ROLLS = {
    "critRate_": 3.89,
    "critDMG_": 7.77,
    "atk_": 5.83,
    "atk": 19.45,
    "hp_": 5.83,
    "hp": 298.75,
    "def_": 7.29,
    "def": 23.15,
    "eleMas": 23.31,
    "enerRech_": 6.48,
};