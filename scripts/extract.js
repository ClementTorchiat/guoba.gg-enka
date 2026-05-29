const fs   = require('fs');
const path = require('path');
const vm   = require('vm');

const ROOT          = path.join(__dirname, '..');
const CONFIG_SOURCE = path.join(ROOT, 'config.js');
const DIR_CHARS     = path.join(ROOT, 'data', 'characters');
const DIR_WEAPONS   = path.join(ROOT, 'data', 'weapons');
const DIR_SETS      = path.join(ROOT, 'data', 'sets');
const DEFAULT_OUT   = path.join(ROOT, 'data', 'default_config.json');

const code    = fs.readFileSync(CONFIG_SOURCE, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);

try {
    vm.runInContext(code, sandbox);
} catch (err) {
    console.error('❌  Erreur lors de l\'exécution de config.js :', err.message);
    process.exit(1);
}

const CHARACTER_CONFIG = sandbox.window.CHARACTER_CONFIG || {};
const WEAPON_PASSIVES  = sandbox.window.WEAPON_PASSIVES  || {};
const SET_PASSIVES     = sandbox.window.SET_PASSIVES     || {};
const DEFAULT_CONFIG   = sandbox.window.DEFAULT_CONFIG   || {};
function charNameToFilename(name) {
    return name.replace(/ /g, '_') + '.json';
}

function writeJson(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

function ensureDir(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

ensureDir(DIR_CHARS);

const TEMPLATE_KEY = 'NomDuPersonnage';
let charCount = 0;

for (const [name, data] of Object.entries(CHARACTER_CONFIG)) {
    if (name === TEMPLATE_KEY) {
        console.log(`⏭  Ignoré (template) : ${name}`);
        continue;
    }

    const filename = charNameToFilename(name);
    const outPath  = path.join(DIR_CHARS, filename);
    writeJson(outPath, data);
    charCount++;
    console.log(`✅  Personnage : ${name}  →  data/characters/${filename}`);
}

ensureDir(DIR_WEAPONS);
let weaponCount = 0;

for (const [key, data] of Object.entries(WEAPON_PASSIVES)) {
    const filename = key + '.json';
    const outPath  = path.join(DIR_WEAPONS, filename);
    writeJson(outPath, data);
    weaponCount++;
    console.log(`✅  Arme       : ${key}  →  data/weapons/${filename}`);
}

ensureDir(DIR_SETS);
let setCount = 0;

for (const [key, data] of Object.entries(SET_PASSIVES)) {
    const filename = key + '.json';
    const outPath  = path.join(DIR_SETS, filename);
    writeJson(outPath, data);
    setCount++;
    console.log(`✅  Set        : ${key}  →  data/sets/${filename}`);
}


writeJson(DEFAULT_OUT, DEFAULT_CONFIG);
console.log(`✅  Default config  →  data/default_config.json`);

console.log('');
console.log('──────────────────────────────────────────');
console.log(`📦  Extraction terminée !`);
console.log(`    ${charCount}  personnage(s)  →  data/characters/`);
console.log(`    ${weaponCount}  arme(s)        →  data/weapons/`);
console.log(`    ${setCount}  set(s)         →  data/sets/`);
console.log('');
console.log('  Lance maintenant : node scripts/build.js');
console.log('──────────────────────────────────────────');