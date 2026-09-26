const fs = require('fs');

async function main() {
    const SET_NAME_MAPPING = require('./src/data/set_name_mapping.json');
    const relicsRes = await fetch('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/gi/relics.json');
    const relics = await relicsRes.json();
    const locRes = await fetch('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/gi/locs.json');
    const loc = await locRes.json();
    
    const frLoc = loc["fr"] || {};
    const hashToKey = {};
    for (const [hash, nom] of Object.entries(frLoc)) {
        if (SET_NAME_MAPPING[nom]) {
            hashToKey[hash] = SET_NAME_MAPPING[nom];
        }
    }
    
    const setKeyToIcon = {};
    if (relics && relics.Items && relics.Sets) {
        Object.values(relics.Items).forEach((item) => {
            if (item.Icon && item.SetId && relics.Sets[item.SetId]) {
                const iconName = item.Icon.split('/').pop().replace('.png', '');
                const nameHash = String(relics.Sets[item.SetId].Name);
                if (hashToKey[nameHash]) {
                    const setKey = hashToKey[nameHash];
                    // Prefer 4-star or 5-star icons. Let's just keep the last one we see, usually higher rarity.
                    setKeyToIcon[setKey] = iconName;
                }
            }
        });
    }
    
    fs.writeFileSync('./src/data/set_icons.json', JSON.stringify(setKeyToIcon, null, 2));
    console.log("Created src/data/set_icons.json");
}

main();
