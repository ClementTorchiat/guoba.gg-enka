const fs = require('fs');
const path = require('path');

// Chemin vers le fichier script.js et dossier de destination
const SCRIPT_PATH = path.join(__dirname, '../script.js');
const OUTPUT_DIR = path.join(__dirname, '../src/data'); // Dossier type pour Astro

// Liste des dictionnaires à extraire
const DICTIONARIES_TO_EXTRACT = [
    'ICON_MAP',
    'KEY_TO_FIGHT_PROP',
    'ELEMENT_DATA',
    'SUBSTAT_RANGES',
    'MAINSTAT_DROP_RATES',
    'STAT_MAPPING',
    'STAT_LABELS',
    'RESONANCE_DATA',
    'ELEMENT_COLORS',
    'WEAPON_NAME_MAPPING',
    'SET_NAME_MAPPING',
    'ARTIFACT_TYPE_MAPPING',
    'SLOT_POSSIBLE_MAIN_STATS',
    'THEME_COLORS',
    'CONFIG_NAME_ALIASES_EN_TO_FR'
];

function extractDictionaries() {
    console.log('Lecture de script.js...');
    const scriptContent = fs.readFileSync(SCRIPT_PATH, 'utf-8');
    
    // Créer le dossier de destination s'il n'existe pas
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    DICTIONARIES_TO_EXTRACT.forEach(dictName => {
        // Recherche de "const NOM_DICT = {" ou "let NOM_DICT = {"
        const regexStart = new RegExp(`(?:const|let)\\s+${dictName}\\s*=\\s*\\{`, 'g');
        const match = regexStart.exec(scriptContent);

        if (!match) {
            console.warn(`⚠️ Impossible de trouver ${dictName} dans script.js`);
            return;
        }

        const startIndex = match.index + match[0].length - 1; // Index of the opening '{'
        
        // Fonction pour trouver l'accolade fermante correspondante
        let braceCount = 0;
        let endIndex = -1;
        let inString = false;
        let stringChar = '';

        for (let i = startIndex; i < scriptContent.length; i++) {
            const char = scriptContent[i];
            const prevChar = i > 0 ? scriptContent[i-1] : '';

            // Gestion des chaînes de caractères (pour ne pas compter les accolades dedans)
            if ((char === '"' || char === "'" || char === '`') && prevChar !== '\\') {
                if (!inString) {
                    inString = true;
                    stringChar = char;
                } else if (char === stringChar) {
                    inString = false;
                }
            }

            if (!inString) {
                if (char === '{') braceCount++;
                if (char === '}') braceCount--;

                if (braceCount === 0) {
                    endIndex = i + 1;
                    break;
                }
            }
        }

        if (endIndex === -1) {
            console.error(`❌ Impossible de trouver la fin de ${dictName}`);
            return;
        }

        // Extraction de l'objet sous forme de chaîne de caractères
        const objectString = scriptContent.substring(startIndex, endIndex);

        try {
            // Utiliser 'new Function' pour évaluer la chaîne JS en un vrai objet JS.
            // On ajoute une fausse fonction 't' (traduction) pour que les objets qui l'utilisent (comme STAT_LABELS) ne plantent pas.
            const dataObj = new Function(`
                const t = (key) => key;
                return ${objectString};
            `)();
            
            const outputPath = path.join(OUTPUT_DIR, `${dictName.toLowerCase()}.json`);
            fs.writeFileSync(outputPath, JSON.stringify(dataObj, null, 2), 'utf-8');
            console.log(`✅ Extrait : ${dictName} -> ${outputPath}`);
        } catch (err) {
            console.error(`❌ Erreur lors de l'évaluation/sauvegarde de ${dictName}:`, err.message);
        }
    });

    console.log('\n🎉 Extraction terminée ! Vous pouvez maintenant utiliser ces fichiers .json dans votre projet Astro.');
}

extractDictionaries();
