import { getEnkaAvatars } from "./enkaParser";

export const ENKA_TO_LOCAL_NAME: Record<string, string> = {
  Alhatham: "Alhaitham",
  Ambor: "Amber",
  Itto: "Arataki_Itto",
  Baizhuer: "Baizhu",
  Freminet: "Fréminet",
  Hutao: "Hu_Tao",
  Qin: "Jean",
  Kazuha: "Kaedehara_Kazuha",
  Ayaka: "Kamisato_Ayaka",
  Ayato: "Kamisato_Ayato",
  Momoka: "Kirara",
  Sara: "Kujou_Sara",
  Shinobu: "Kuki_Shinobu",
  Lanyan: "Lan_Yan",
  Liney: "Lyney",
  Wanderer: "Nomade",
  Noel: "Noëlle",
  Olorun: "Ororon",
  Rosaria: "Rosalia",
  MarionetteNew: "Sandrone",
  Kokomi: "Sangonomiya_Kokomi",
  Heizo: "Shikanoin_Heizou",
  Shougun: "Shogun_Raiden",
  Tohma: "Thomas",
  Liuyun: "Xianyun",
  Yae: "Yae_Miko",
  Feiyan: "Yanfei",
  Mizuki: "Yumemizuki_Mizuki",
  Yunjin: "Yun_Jin",
  Linette: "Lynette",
  SkirkNew: "Skirk",
  Emilie: "Émilie",
};

export const LOCAL_TO_ENKA_NAME: Record<string, string> = {};
for (const [enka, local] of Object.entries(ENKA_TO_LOCAL_NAME)) {
  LOCAL_TO_ENKA_NAME[local] = enka;
}

export const ELEMENT_COLORS: Record<string, string> = {
  pyro: "#884A20",
  hydro: "#195293",
  dendro: "#516514",
  electro: "#512C88",
  anemo: "#2B7C6C",
  cryo: "#1B7A92",
  geo: "#886D01",
  physical: "#cccccc",
};

export const ENKA_ELEMENT_MAP: Record<string, string> = {
  Fire: "pyro",
  Water: "hydro",
  Grass: "dendro",
  Electric: "electro",
  Wind: "anemo",
  Ice: "cryo",
  Rock: "geo",
};

// Caches server-side (en mémoire)
let cachedCharConfigs: Record<string, any> | null = null;
let cachedEnkaAvatarMap: Record<string, any> | null = null;

export async function getCharConfigs() {
  if (!cachedCharConfigs) {
    // Dans src/server, on pointe vers ../../data/characters/*.json
    const charConfigsLoaders = import.meta.glob("../../data/characters/*.json", { eager: true });
    const configs: Record<string, any> = {};
    for (const path in charConfigsLoaders) {
      const fileName = path.split("/").pop()?.replace(".json", "") || "";
      configs[fileName] = (charConfigsLoaders[path] as any).default || charConfigsLoaders[path];
    }
    cachedCharConfigs = configs;
  }
  return cachedCharConfigs;
}

export async function getEnkaAvatarMap() {
  if (!cachedEnkaAvatarMap) {
    const avatarsDb = await getEnkaAvatars();
    const map: Record<string, any> = {};
    for (const avatarId in avatarsDb) {
      const avatar = avatarsDb[avatarId];
      if (avatar.SideIconName) {
        let cleanName = avatar.SideIconName.replace("/ui/UI_AvatarIcon_Side_", "").replace(".png", "");
        map[cleanName] = avatar;
      }
    }
    cachedEnkaAvatarMap = map;
  }
  return cachedEnkaAvatarMap;
}

export function getFinalEnkaName(localName: string) {
  const enkaName = LOCAL_TO_ENKA_NAME[localName] || localName;
  const isTraveler = enkaName.includes("Traveler") || enkaName.includes("Voyageur") || enkaName.includes("Manekin") || enkaName.includes("Player");
  return isTraveler ? "PlayerBoy" : enkaName;
}

export function getEnkaImages(localName: string) {
  const finalEnkaName = getFinalEnkaName(localName);
  return {
    avatarImg: `https://enka.network/ui/UI_AvatarIcon_${finalEnkaName}.png`,
    gachaImg: `https://enka.network/ui/UI_Gacha_AvatarImg_${finalEnkaName}.webp`,
  };
}

import locsData from "../../locs.json";

let cachedLocs: any = null;
let assetToLocalizedNames: Record<string, { fr: string, en: string }> | null = null;
let cachedIconToHash: Record<string, string> | null = null;

export function getLocs() {
  if (!cachedLocs) {
    cachedLocs = locsData;
  }
  return cachedLocs;
}

export async function getAssetTranslations(teammateAssets: Record<string, string>) {
  if (assetToLocalizedNames) return assetToLocalizedNames;
  
  const locs = getLocs();
  
  const weaponsRes = await fetch('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/gi/weapons.json');
  const weapons = await weaponsRes.json();
  
  const relicsRes = await fetch('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/gi/relics.json');
  const relics = await relicsRes.json();

  const iconToHash: Record<string, string> = {};
  cachedIconToHash = iconToHash;
  for (const w of Object.values(weapons as any)) {
      if ((w as any).Icon) {
          let iconClean = (w as any).Icon.split('/').pop().replace('.png', '');
          iconToHash[iconClean] = (w as any).NameTextMapHash;
      }
  }
  for (const r of Object.values(relics.Items as any)) {
      if ((r as any).Icon && (r as any).SetId) {
          let iconClean = (r as any).Icon.split('/').pop().replace('.png', '');
          const set = relics.Sets[(r as any).SetId];
          if (set && set.Name) {
              iconToHash[iconClean] = set.Name;
          }
      }
  }

  const res: Record<string, { fr: string, en: string }> = {};
  for (const [key, url] of Object.entries(teammateAssets)) {
      let icon = url.split('/').pop()?.replace('.png', '');
      let hash = iconToHash[icon || ''];
      if (hash) {
          res[key] = {
              fr: locs.fr[hash] || key,
              en: locs.en[hash] || key
          };
      } else {
          res[key] = { fr: key, en: key };
      }
  }
  assetToLocalizedNames = res;
  return res;
}

export async function getIconTranslationMap() {
  if (!cachedIconToHash) {
      await getAssetTranslations({});
  }
  const locs = getLocs();
  const map: Record<string, { fr: string, en: string }> = {};
  for (const [icon, hash] of Object.entries(cachedIconToHash || {})) {
      map[icon] = {
          fr: locs.fr[hash] || icon,
          en: locs.en[hash] || icon
      };
  }
  return map;
}

export async function getCharNamesTranslations(charName: string) {
  const locs = getLocs();
  const enkaAvatarMap = await getEnkaAvatarMap();
  const finalEnkaName = getFinalEnkaName(charName);
  const avatar = enkaAvatarMap[finalEnkaName];
  if (avatar && avatar.NameTextMapHash) {
      return {
          fr: locs.fr[avatar.NameTextMapHash] || charName.replace(/_/g, ' '),
          en: locs.en[avatar.NameTextMapHash] || charName.replace(/_/g, ' ')
      };
  }
  return {
      fr: charName.replace(/_/g, ' '),
      en: charName.replace(/_/g, ' ')
  };
}
