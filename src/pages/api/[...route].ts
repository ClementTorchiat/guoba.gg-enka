import { Hono } from 'hono';
import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { parseEnkaData } from '../../server/enkaParser';
import { calculateCharacterScore, calculateMaxTheoreticalScore } from '../../scripts/scoring.js';

const charConfigsLoaders = import.meta.glob('../../../data/characters/*.json', { eager: true });
const setsConfigsLoaders = import.meta.glob('../../../data/sets/*.json', { eager: true });

// On crée un dictionnaire rapide : { "Hu_Tao": {...}, "Arlecchino": {...} }
const CHAR_CONFIGS: Record<string, any> = {};
for (const path in charConfigsLoaders) {
  const fileName = path.split('/').pop()?.replace('.json', '') || "";
  CHAR_CONFIGS[fileName] = (charConfigsLoaders[path] as any).default || charConfigsLoaders[path];
}

const SET_CONFIGS: Record<string, any> = {};
for (const path in setsConfigsLoaders) {
  const fileName = path.split('/').pop()?.replace('.json', '') || "";
  SET_CONFIGS[fileName] = (setsConfigsLoaders[path] as any).default || setsConfigsLoaders[path];
}

// Fonction utilitaire pour simuler les buffs de Taux Crit actifs par défaut
function getSimulatedCritRateBuff(perso: any, charConfig: any) {
  let extraCR = 0;
  
  const parseBuffsArray = (buffArray: any[], selectMode: string) => {
    buffArray.forEach((item, idx) => {
      if (!item) return;
      if (item.cons !== undefined && (perso.cons || 0) < item.cons) return;
      
      let isActive = item.active !== undefined ? item.active : true;
      if (selectMode === 'exclusive' && item.active === undefined) {
          isActive = (idx === buffArray.length - 1);
      }
      if (isActive && item.stats && item.stats.critRate_) {
          extraCR += item.stats.critRate_;
      }
    });
  };

  // 1. Buffs de personnage
  if (charConfig && charConfig.buffs) {
    charConfig.buffs.forEach((cat: any) => {
      if (cat.buffs) parseBuffsArray(cat.buffs, cat.selectMode);
    });
  }

  // 2. Buffs de sets d'artéfacts
  if (perso.artefacts) {
    const setsCount: Record<string, number> = {};
    perso.artefacts.forEach((art: any) => {
      if (art.setKey) {
        setsCount[art.setKey] = (setsCount[art.setKey] || 0) + 1;
      }
    });
    
    Object.entries(setsCount).forEach(([setKey, count]) => {
      const setConfig = SET_CONFIGS[setKey];
      if (setConfig) {
        if (count >= 2 && setConfig["2"]) parseBuffsArray(setConfig["2"], setConfig.selectMode);
        if (count >= 4 && setConfig["4"]) parseBuffsArray(setConfig["4"], setConfig.selectMode);
      }
    });
  }
  
  return extraCR * 100; // En format pourcentage
}

const ENKA_TO_LOCAL_NAME: Record<string, string> = {
  "Alhatham": "Alhaitham", "Ambor": "Amber", "Itto": "Arataki_Itto", "Baizhuer": "Baizhu",
  "Freminet": "Fréminet", "Hutao": "Hu_Tao", "Qin": "Jean", "Kazuha": "Kaedehara_Kazuha",
  "Ayaka": "Kamisato_Ayaka", "Ayato": "Kamisato_Ayato", "Momoka": "Kirara", "Sara": "Kujou_Sara",
  "Shinobu": "Kuki_Shinobu", "Lanyan": "Lan_Yan", "Liney": "Lyney", "Wanderer": "Nomade",
  "Noel": "Noëlle", "Olorun": "Ororon", "Rosaria": "Rosalia", "MarionetteNew": "Sandrone",
  "Kokomi": "Sangonomiya_Kokomi", "Heizo": "Shikanoin_Heizou", "Shougun": "Shogun_Raiden",
  "Tohma": "Thomas", "Liuyun": "Xianyun", "Yae": "Yae_Miko", "Feiyan": "Yanfei",
  "Mizuki": "Yumemizuki_Mizuki", "Yunjin": "Yun_Jin", "Linette": "Lynette", "SkirkNew": "Skirk",
  "Emilie": "Émilie"
};

export const prerender = false;

const app = new Hono().basePath('/api');

// Fonction utilitaire pour initialiser Supabase dynamiquement à chaque requête
// (Nécessaire sur Cloudflare car les variables d'environnement ne sont pas disponibles au top-level)
function getSupabase(c: any) {
  const env = c.env || {};
  const supabaseUrl = import.meta.env.SUPABASE_URL || env.SUPABASE_URL;
  const supabaseKey = import.meta.env.SUPABASE_SERVICE_KEY || env.SUPABASE_SERVICE_KEY;
  
  if (!supabaseUrl) {
    throw new Error("SUPABASE_URL is missing in API route");
  }
  return createClient(supabaseUrl, supabaseKey);
}

app.get('/hello', (c) => {
  return c.json({
    message: 'Hello depuis Hono sur Cloudflare Edge !'
  });
});

app.get('/test-db', async (c) => {
  const supabase = getSupabase(c);
  // On insère un joueur factice pour vérifier que la connexion et l'écriture fonctionnent
  const { data, error } = await supabase
    .from('players')
    .upsert({
      uid: "test-777",
      nickname: "Guoba_Tester",
      profile_picture: "guoba.png"
    }, { onConflict: 'uid' })
    .select();

  if (error) {
    return c.json({ status: 'erreur', detail: error }, 500);
  }

  return c.json({
    status: 'succès',
    message: 'Test DB réussi, regarde ton Supabase !',
    data: data
  });
});

app.get('/player/:uid', async (c) => {
  const uid = c.req.param('uid');
  const supabase = getSupabase(c);

  // --- 1. Vérification anti-spam (Rate Limiting via Supabase) ---
  const { data: player } = await supabase
    .from('players')
    .select('last_updated')
    .eq('uid', uid)
    .maybeSingle(); // maybeSingle évite de lever une erreur si le joueur n'existe pas encore

  if (player && player.last_updated) {
    const lastUpdated = new Date(player.last_updated).getTime();
    const now = Date.now();
    const diffMinutes = (now - lastUpdated) / (1000 * 60);

    // Si mis à jour il y a moins de 2 minutes, on bloque
    if (diffMinutes < 2) {
      return c.json({
        status: 'rate_limited',
        message: 'Ce profil a été mis à jour trop récemment. Veuillez patienter 2 minutes.'
      }, 429);
    }
  }

  // --- 2. Le Fetch vers Enka.Network ---
  try {
    const enkaRes = await fetch(`https://enka.network/api/uid/${uid}`, {
      headers: {
        'User-Agent': 'guoba.gg-backend/1.0 (https://guoba.gg)'
      }
    });

    if (!enkaRes.ok) {
      return c.json({
        status: 'erreur_enka',
        message: `Impossible de récupérer les données Enka (Code ${enkaRes.status})`
      }, enkaRes.status as any);
    }

    const enkaData = await enkaRes.json();

    // 1. Parsing brut -> Objet Guoba
    const persos = await parseEnkaData(enkaData);

    // 2. Calcul du score pour chaque personnage
    const results = persos.flatMap((perso: any) => {
      // Enka donne des noms comme "MarionetteNew", on les traduit avec notre dictionnaire ENKA_TO_LOCAL_NAME
      const localName = ENKA_TO_LOCAL_NAME[perso.name] || perso.name;

      let config = CHAR_CONFIGS[localName];
      if (!config) {
        const fuzzyKey = Object.keys(CHAR_CONFIGS).find(k =>
          k.replace(/_/g, '').toLowerCase() === localName.toLowerCase()
        );
        if (fuzzyKey) config = CHAR_CONFIGS[fuzzyKey];
      }

      if (!config) {
        return [{
          id: perso.id,
          name: perso.name,
          localName: localName,
          error: 'Configuration non trouvée dans /data/characters/'
        }];
      }

      // On calcule le score pour TOUS les builds de ce personnage
      const evaluatedBuilds = Object.entries(config.builds).map(([key, build]: [string, any]) => {
        const scoringConfig = {
          weights: build.weights,
          idealMainStats: build.idealMainStats,
          bestSets: build.bestSets || [],
          goodSets: build.goodSets || []
        };

        const potentialMax = calculateMaxTheoreticalScore(perso, scoringConfig);
        
        // On clone le perso pour ne pas écraser les stats buffées entre chaque leaderboard
        const persoClone = JSON.parse(JSON.stringify(perso));
        persoClone.buffedStats.cr = (persoClone.stats.critRate * 100) + getSimulatedCritRateBuff(persoClone, config);
        
        const score = calculateCharacterScore(persoClone, scoringConfig, potentialMax.totalRolls);

        let efficiency = 0;
        if (potentialMax && potentialMax.score > 0) {
          efficiency = score.score / potentialMax.score;
        }

        return {
          id: perso.id,
          name: perso.name,
          archetype: build.leaderboard_id || key,
          score: score.score, // Le vrai score brut
          grade: score.grade, // L'objet complet { letter, color }
          er: persoClone.stats.enerRech || 1.0,
          persoData: persoClone, // On passe le clone
          efficiency: efficiency
        };
      });

      // Dédoublonnage : on ne garde que le meilleur score (efficacité) par leaderboard (archetype)
      const bestPerArchetype = new Map();
      evaluatedBuilds.forEach((eb: any) => {
        if (!bestPerArchetype.has(eb.archetype) || bestPerArchetype.get(eb.archetype).efficiency < eb.efficiency) {
          bestPerArchetype.set(eb.archetype, eb);
        }
      });

      return Array.from(bestPerArchetype.values());
    });

    // --- 3. Sauvegarde dans Supabase ---

    // Upsert du joueur
    const playerInfo = enkaData.playerInfo || {};
    const nickname = playerInfo.nickname || "Traveler";
    const profilePictureId = playerInfo.profilePicture?.avatarId || playerInfo.profilePicture?.id || "default";

    const { error: playerError } = await supabase
      .from('players')
      .upsert({
        uid: uid,
        nickname: nickname,
        profile_picture: String(profilePictureId),
        last_updated: new Date().toISOString()
      }, { onConflict: 'uid' });

    if (playerError) {
      console.error("Supabase Player Upsert Error:", playerError);
    }

    // Upsert des builds et des scores
    const uniqueBuildsMap = new Map();
    const scoresToInsert: any[] = [];

    results.filter((r: any) => !r.error).forEach((res: any) => {
      // 1. On ne prépare le 'build' qu'une seule fois par personnage
      const buildKey = `${uid}_${res.id}`;
      if (!uniqueBuildsMap.has(buildKey)) {
        let totalCV = 0;
        const setsCounter: { [key: string]: number } = {};

        if (res.persoData && res.persoData.artefacts) {
          res.persoData.artefacts.forEach((art: any) => {
            if (art.setKey) setsCounter[art.setKey] = (setsCounter[art.setKey] || 0) + 1;

            if (art.mainStat) {
              if (art.mainStat.key === "critRate_") totalCV += art.mainStat.value * 2;
              if (art.mainStat.key === "critDMG_") totalCV += art.mainStat.value;
            }

            if (art.subStats) {
              art.subStats.forEach((sub: any) => {
                if (sub.key === "critRate_") totalCV += sub.value * 2;
                if (sub.key === "critDMG_") totalCV += sub.value;
              });
            }
          });
        }

        const sortedSets = Object.entries(setsCounter).sort((a, b) => b[1] - a[1]);
        const bestSetName = sortedSets.length > 0 ? sortedSets[0][0] : null;
        const bestSetCount = sortedSets.length > 0 ? sortedSets[0][1] : 0;
        
        // On purge 'evaluation' car ça n'a plus de sens dans un objet 'build' partagé
        const dataToSave = { ...res.persoData };
        delete dataToSave.evaluation;

        dataToSave.computed = {
          totalCV,
          bestSetName,
          bestSetCount
        };

        uniqueBuildsMap.set(buildKey, {
          uid: uid,
          avatar_id: String(res.id),
          archetype: res.archetype, // Satisfait le NOT NULL de l'ancienne base
          score: res.score,         // Satisfait le NOT NULL de l'ancienne base
          data: dataToSave
        });
      }

      // 2. On ajoute l'entrée de score pour le leaderboard_scores
      scoresToInsert.push({
        uid: uid,
        avatar_id: String(res.id),
        leaderboard_id: res.archetype,
        score: res.score,
        grade: res.grade,
        er: res.er
      });
    });

    const buildsToInsert = Array.from(uniqueBuildsMap.values());

    let debugBuildsError = null;
    if (buildsToInsert.length > 0) {
      const { error: buildsError } = await supabase
        .from('builds')
        .upsert(buildsToInsert, { onConflict: 'uid, avatar_id' }); // Plus de 'archetype' ici !

      if (buildsError) {
        console.error("Supabase Builds Upsert Error:", buildsError);
        debugBuildsError = buildsError;
      }
    }

    if (scoresToInsert.length > 0) {
      const { error: scoresError } = await supabase
        .from('leaderboard_scores')
        .upsert(scoresToInsert, { onConflict: 'uid, avatar_id, leaderboard_id' });

      if (scoresError) {
        console.error("Supabase Scores Upsert Error:", scoresError);
      }
    }

    // On renvoie fièrement le résultat (sans envoyer persoData pour éviter de polluer l'API si le front n'en a pas besoin, ou tu peux le laisser)
    return c.json({
      status: 'succès',
      message: 'Scores calculés et sauvegardés avec succès !',
      uid: uid,
      debugBuildsError: debugBuildsError,
      scores: results.map((r: any) => ({
        id: r.id,
        name: r.name,
        archetype: r.archetype,
        score: r.score,
        grade: r.grade,
        error: r.error
      }))
    });

  } catch (err) {
    return c.json({
      status: 'erreur_serveur',
      message: 'Une erreur est survenue lors du fetch vers Enka.'
    }, 500);
  }
});

app.get('/rank/:leaderboard_id/:uid', async (c) => {
  const leaderboard_id = c.req.param('leaderboard_id');
  const uid = c.req.param('uid');
  const supabase = getSupabase(c);

  const { data: userScore, error: scoreError } = await supabase
    .from('leaderboard_scores')
    .select('score, er')
    .eq('uid', uid)
    .eq('leaderboard_id', leaderboard_id)
    .maybeSingle();

  if (scoreError || !userScore) {
     return c.json({ rank: 0, total: 0 }); 
  }

  // --- 1. Reconstruire les buckets d'ER comme sur le front-end ---
  let allErReqs = new Set<number>();
  for (const charName in CHAR_CONFIGS) {
    const config = CHAR_CONFIGS[charName];
    if (config.builds) {
      for (const [buildName, buildData] of Object.entries(config.builds)) {
        const data = buildData as any;
        const lbId = data.leaderboard_id || buildName;
        if (lbId === leaderboard_id && data.er_req) {
          allErReqs.add(data.er_req);
        }
      }
    }
  }

  const sortedErReqs = Array.from(allErReqs).sort((a, b) => b - a);
  let otherErs: number[] = [];
  const lowestEr = sortedErReqs.length > 0 ? sortedErReqs[sortedErReqs.length - 1] : null;
  
  if (lowestEr) {
    for (let i = 1; i <= 3; i++) {
      const nextEr = lowestEr - 10 * i;
      if (nextEr >= 100) otherErs.push(nextEr);
    }
  }
  if (!sortedErReqs.includes(100) && !otherErs.includes(100)) {
    otherErs.push(100);
  }

  // Exemple: [140, 130, 120, 100]
  const allBuckets = [...sortedErReqs, ...otherErs].sort((a, b) => b - a);
  const smallestBucket = allBuckets[allBuckets.length - 1] || 100;

  // --- 2. Trouver dans quel bucket se trouve l'utilisateur ---
  const userEnerRech = userScore.er ? parseFloat(userScore.er as string) : 1.0;
  const userRowEr = Math.round(userEnerRech * 100);
  
  let userBucket = smallestBucket;
  let nextHigherBucket: number | null = null;

  if (userRowEr < smallestBucket) {
     userBucket = smallestBucket;
     if (allBuckets.length > 1) {
         nextHigherBucket = allBuckets[allBuckets.length - 2];
     }
  } else {
    for (let i = 0; i < allBuckets.length; i++) {
      if (userRowEr >= allBuckets[i]) {
        userBucket = allBuckets[i];
        if (i > 0) nextHigherBucket = allBuckets[i - 1];
        break;
      }
    }
  }

  // --- 3. Filtrer Supabase pour ce bucket précis ---
  let rankQuery = supabase
    .from('leaderboard_scores')
    .select('*', { count: 'exact', head: true })
    .eq('leaderboard_id', leaderboard_id)
    .gt('score', userScore.score);
    
  let totalQuery = supabase
    .from('leaderboard_scores')
    .select('*', { count: 'exact', head: true })
    .eq('leaderboard_id', leaderboard_id);

  if (userBucket !== smallestBucket) {
    // Si ce n'est pas le plus petit bucket, il y a une limite inférieure
    rankQuery = rankQuery.gte('er', userBucket / 100);
    totalQuery = totalQuery.gte('er', userBucket / 100);
  }
  
  if (nextHigherBucket !== null) {
    // Il y a toujours une limite supérieure sauf si on est dans le plus grand bucket
    rankQuery = rankQuery.lt('er', nextHigherBucket / 100);
    totalQuery = totalQuery.lt('er', nextHigherBucket / 100);
  }

  const { count: rankCount } = await rankQuery;
  const { count: totalCount } = await totalQuery;

  return c.json({
    rank: (rankCount || 0) + 1,
    total: totalCount || 0,
    score: userScore.score,
    bucket: userBucket // Utile pour débugger
  });
});

export const ALL: APIRoute = (context) => {
  // On passe l'environnement Cloudflare à Hono pour qu'il puisse y accéder via `c.env`
  const env = (context.locals as any)?.runtime?.env || {};
  return app.fetch(context.request, env);
};
