const fs = require('fs');

async function getLocs() {
    return JSON.parse(fs.readFileSync('locs.json', 'utf8'));
}

async function fetchAssetTranslations() {
    const locs = await getLocs();
    const teammateAssets = JSON.parse(fs.readFileSync('src/data/teammate_assets.json', 'utf8'));
    
    const weaponsRes = await fetch('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/gi/weapons.json');
    const weapons = await weaponsRes.json();
    
    const relicsRes = await fetch('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/gi/relics.json');
    const relics = await relicsRes.json();

    const iconToHash = {};
    for (const w of Object.values(weapons)) {
        if (w.Icon) {
            let iconClean = w.Icon.split('/').pop().replace('.png', '');
            iconToHash[iconClean] = w.NameTextMapHash;
        }
    }
    for (const r of Object.values(relics.Items)) {
        if (r.Icon && r.SetId) {
            let iconClean = r.Icon.split('/').pop().replace('.png', '');
            const set = relics.Sets[r.SetId];
            if (set && set.Name) {
                iconToHash[iconClean] = set.Name;
            }
        }
    }

    const res = {};
    for (const [key, url] of Object.entries(teammateAssets)) {
        let icon = url.split('/').pop().replace('.png', '');
        let hash = iconToHash[icon];
        if (hash) {
            res[key] = {
                fr: locs.fr[hash] || key,
                en: locs.en[hash] || key
            };
        } else {
            res[key] = { fr: key, en: key };
        }
    }
    return res;
}
fetchAssetTranslations().then(res => console.log(res["TheCatch"], res["DeepwoodMemories"]));
