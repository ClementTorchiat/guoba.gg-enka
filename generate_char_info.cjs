const fs = require('fs');
async function main() {
    const res = await fetch('https://genshin-db-api.vercel.app/api/characters?query=names&matchCategories=true');
    const charNames = await res.json();
    const charInfo = {};
    
    // We can also just fetch Enka avatars.json to map avatarId to weaponType
    const enkaRes = await fetch('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/gi/avatars.json');
    const enkaAvatars = await enkaRes.json();
    
    // We need element! Unfortunately Enka's avatars.json doesn't provide element cleanly.
    // But we can get it from another Enka file or genshin.jmp.blue.
    // Let's just create a basic map for the ones in leaderboards_names.json.
    const leaderboards = require('./src/data/leaderboards_names.json');
    const charNamesFromLb = Object.keys(leaderboards).map(k => k.split('_')[0]);
    const uniqueChars = [...new Set(charNamesFromLb)];
    
    for (const charId in enkaAvatars) {
        const char = enkaAvatars[charId];
        let name = "Unknown";
        if (char.iconName) {
            const clean = char.iconName.replace('.png', '');
            name = clean.split('_').pop();
        }
        charInfo[name] = {
            weaponType: char.WeaponType // WEAPON_SWORD_ONE_HAND, WEAPON_CLAYMORE, WEAPON_POLE, WEAPON_BOW, WEAPON_CATALYST
        };
    }
    
    fs.writeFileSync('./src/data/char_info.json', JSON.stringify(charInfo, null, 2));
    console.log("Created char_info.json");
}
main();
