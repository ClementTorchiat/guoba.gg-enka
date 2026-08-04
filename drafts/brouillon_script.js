if (item.weapon) {
    const main = flat.weaponStats && flat.weaponStats[0] ? formatStat(flat.weaponStats[0].appendPropId, flat.weaponStats[0].statValue) : null;
    const sub = flat.weaponStats && flat.weaponStats[1] ? formatStat(flat.weaponStats[1].appendPropId, flat.weaponStats[1].statValue) : null;
    weapon = {
        name: getText(flat.nameTextMapHash), level: item.weapon.level,
        rank: (item.weapon.affixMap ? Object.values(item.weapon.affixMap)[0] : 0) + 1,
        icon: `https://enka.network/ui/${flat.icon}.png`, baseAtk: main, subStat: sub, stars: flat.rankLevel
    };
}