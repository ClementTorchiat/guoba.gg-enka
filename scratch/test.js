const fs = require('fs');
async function run() {
    const res = await fetch('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/gi/relics.json');
    const relics = await res.json();
    console.log("Relics item 0:", Object.values(relics.Items)[0]);
    console.log("Relics set 0:", Object.values(relics.Sets)[0]);
}
run();
