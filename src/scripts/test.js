const aliases = {
  "Traveler Cryo": "Voyageur Cryo"
};
const charLoaders = {
  "../../data/characters/Traveler_Cryo.json": () => {}
};
const charLoaderMap = {};
function normalizeKey(str) {
    return String(str)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9]/g, '')
        .toLowerCase();
}
for (const path in charLoaders) {
    const fileName = path.split('/').pop().replace('.json', '');
    const cleanNoUnderscore = fileName.replace(/_/g, ' ');
    const norm = normalizeKey(fileName);
    charLoaderMap[fileName] = charLoaders[path];
    charLoaderMap[cleanNoUnderscore] = charLoaders[path];
    charLoaderMap[norm] = charLoaders[path];
    charLoaderMap[fileName.toLowerCase()] = charLoaders[path];
    
    if (fileName.startsWith("Traveler_")) {
        const elem = fileName.split("_")[1];
        const reverseName = `${elem} Traveler`;
        const reverseNorm = normalizeKey(reverseName);
        charLoaderMap[reverseName] = charLoaders[path];
        charLoaderMap[reverseNorm] = charLoaders[path];
    }
}
for (const [enName, frName] of Object.entries(aliases)) {
    const loader = charLoaderMap[enName] || charLoaderMap[normalizeKey(enName)];
    if (loader) {
        charLoaderMap[frName] = loader;
        charLoaderMap[normalizeKey(frName)] = loader;
    }
}
console.log(Object.keys(charLoaderMap));
