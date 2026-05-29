const fs   = require('fs');
const path = require('path');


const ROOT       = path.join(__dirname, '..');
const DIR_CHARS  = path.join(ROOT, 'data', 'characters');
const DIR_WEAPONS= path.join(ROOT, 'data', 'weapons');
const DIR_SETS   = path.join(ROOT, 'data', 'sets');
const DEFAULT_IN = path.join(ROOT, 'data', 'default_config.json');
const OUTPUT     = path.join(ROOT, 'config.generated.js');

function loadDir(dir, keyFromName) {
    if (!fs.existsSync(dir)) {
        console.warn(`⚠️  Dossier manquant : ${dir} (ignoré)`);
        return {};
    }

    const result = {};
    const files  = fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort();

    for (const file of files) {
        const baseName = file.replace('.json', '');
        const key      = keyFromName(baseName);
        const filePath = path.join(dir, file);

        try {
            const raw  = fs.readFileSync(filePath, 'utf8');
            result[key] = JSON.parse(raw);
        } catch (err) {
            console.error(`❌  JSON invalide dans ${file} : ${err.message}`);
            console.error(`    Corrige ce fichier avant de relancer le build.`);
            process.exit(1);
        }
    }

    return result;
}

const charKeyFromName   = (baseName) => baseName.replace(/_/g, ' ');
const weaponKeyFromName = (baseName) => baseName;
const setKeyFromName    = (baseName) => baseName;


function build() {
    const buildStart = Date.now();
    console.log('🔨  Build en cours...\n');

    let DEFAULT_CONFIG = { weights: {}, bestSets: [], goodSets: [], talents: { auto: 1, skill: 6, burst: 6 } };
    if (fs.existsSync(DEFAULT_IN)) {
        try {
            DEFAULT_CONFIG = JSON.parse(fs.readFileSync(DEFAULT_IN, 'utf8'));
        } catch (err) {
            console.error(`❌  JSON invalide dans default_config.json : ${err.message}`);
            process.exit(1);
        }
    } else {
        console.warn('⚠️  data/default_config.json absent, utilisation du fallback intégré.');
    }

    const CHARACTER_CONFIG = loadDir(DIR_CHARS,   charKeyFromName);
    const WEAPON_PASSIVES  = loadDir(DIR_WEAPONS, weaponKeyFromName);
    const SET_PASSIVES     = loadDir(DIR_SETS,    setKeyFromName);

    const charCount   = Object.keys(CHARACTER_CONFIG).length;
    const weaponCount = Object.keys(WEAPON_PASSIVES).length;
    const setCount    = Object.keys(SET_PASSIVES).length;

    const timestamp = new Date().toISOString();

    const output = [
        `/* =========================================================`,
        `   config.generated.js — FICHIER AUTO-GÉNÉRÉ`,
        `   Généré le : ${timestamp}`,
        `   ${charCount} personnages | ${weaponCount} armes | ${setCount} sets`,
        ``,
        `   ========================================================= */`,
        ``,
        `window.DEFAULT_CONFIG   = ${JSON.stringify(DEFAULT_CONFIG,   null, 2)};`,
        ``,
        `window.CHARACTER_CONFIG = ${JSON.stringify(CHARACTER_CONFIG, null, 2)};`,
        ``,
        `window.WEAPON_PASSIVES  = ${JSON.stringify(WEAPON_PASSIVES,  null, 2)};`,
        ``,
        `window.SET_PASSIVES     = ${JSON.stringify(SET_PASSIVES,     null, 2)};`,
    ].join('\n');

    fs.writeFileSync(OUTPUT, output, 'utf8');

    const sizeKb  = (Buffer.byteLength(output, 'utf8') / 1024).toFixed(1);
    const elapsed = Date.now() - buildStart;

    console.log(`    ${charCount.toString().padStart(3)}  personnage(s)  ←  data/characters/`);
    console.log(`    ${weaponCount.toString().padStart(3)}  arme(s)        ←  data/weapons/`);
    console.log(`    ${setCount.toString().padStart(3)}  set(s)         ←  data/sets/`);
    console.log('');
    console.log(`✅  config.generated.js  (${sizeKb} Ko)  généré en ${elapsed} ms`);
    console.log('');
}

const watchMode = process.argv.includes('--watch');

build();

if (watchMode) {
    console.log('👁  Mode watch activé. Ctrl+C pour arrêter.\n');

    const dirsToWatch = [DIR_CHARS, DIR_WEAPONS, DIR_SETS, path.dirname(DEFAULT_IN)].filter(fs.existsSync);
    let debounceTimer = null;

    dirsToWatch.forEach(dir => {
        fs.watch(dir, { recursive: false }, (event, filename) => {
            if (!filename || !filename.endsWith('.json')) return;

            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                console.log(`\n🔄  Changement détecté : ${filename}`);
                build();
            }, 150);
        });
    });
}