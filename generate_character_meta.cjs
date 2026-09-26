const fs = require('fs');

const meta = {
  "Alhaitham": { element: "dendro", weapon: "sword" },
  "Amber": { element: "pyro", weapon: "bow" },
  "Arataki_Itto": { element: "geo", weapon: "claymore" },
  "Baizhu": { element: "dendro", weapon: "catalyst" },
  "Fréminet": { element: "cryo", weapon: "claymore" },
  "Hu_Tao": { element: "pyro", weapon: "polearm" },
  "Jean": { element: "anemo", weapon: "sword" },
  "Kaedehara_Kazuha": { element: "anemo", weapon: "sword" },
  "Kamisato_Ayaka": { element: "cryo", weapon: "sword" },
  "Kamisato_Ayato": { element: "hydro", weapon: "sword" },
  "Kirara": { element: "dendro", weapon: "sword" },
  "Kujou_Sara": { element: "electro", weapon: "bow" },
  "Kuki_Shinobu": { element: "electro", weapon: "sword" },
  "Lan_Yan": { element: "anemo", weapon: "catalyst" },
  "Lyney": { element: "pyro", weapon: "bow" },
  "Nomade": { element: "anemo", weapon: "catalyst" },
  "Noëlle": { element: "geo", weapon: "claymore" },
  "Ororon": { element: "electro", weapon: "bow" },
  "Rosalia": { element: "cryo", weapon: "polearm" },
  "Sandrone": { element: "cryo", weapon: "claymore" },
  "Sangonomiya_Kokomi": { element: "hydro", weapon: "catalyst" },
  "Shikanoin_Heizou": { element: "anemo", weapon: "catalyst" },
  "Shogun_Raiden": { element: "electro", weapon: "polearm" },
  "Thomas": { element: "pyro", weapon: "polearm" },
  "Xianyun": { element: "anemo", weapon: "catalyst" },
  "Yae_Miko": { element: "electro", weapon: "catalyst" },
  "Yanfei": { element: "pyro", weapon: "catalyst" },
  "Yumemizuki_Mizuki": { element: "hydro", weapon: "catalyst" },
  "Yun_Jin": { element: "geo", weapon: "polearm" },
  "Lynette": { element: "anemo", weapon: "sword" },
  "Skirk": { element: "hydro", weapon: "sword" },
  "Émilie": { element: "dendro", weapon: "polearm" },
  "Manekin": { element: "anemo", weapon: "sword" },
  "PlayerBoy": { element: "anemo", weapon: "sword" }
};

fs.writeFileSync('./src/data/character_meta.json', JSON.stringify(meta, null, 2));
console.log("Created character_meta.json");
