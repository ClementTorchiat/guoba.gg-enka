import { Hono } from 'hono';
import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { parseEnkaData } from '../../server/enkaParser';
import { calculateCharacterScore, calculateMaxTheoreticalScore } from '../../scripts/scoring.js';

import _ER_BUCKETS_BY_LEADERBOARD from '../../data/er_buckets.json';
const ER_BUCKETS_BY_LEADERBOARD = _ER_BUCKETS_BY_LEADERBOARD as Record<string, number[]>;

const charConfigsLoaders = import.meta.glob('../../../data/characters/*.json');
const setsConfigsLoaders = import.meta.glob('../../../data/sets/*.json', { eager: true });

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

let cachedSupabase: any = null;

// Fonction utilitaire pour initialiser Supabase dynamiquement et le mettre en cache
// (Nécessaire sur Cloudflare car les variables d'environnement ne sont pas disponibles au top-level)
function getSupabase(c: any) {
  if (cachedSupabase) return cachedSupabase;

  const env = c.env || {};
  const supabaseUrl = import.meta.env.SUPABASE_URL || env.SUPABASE_URL;
  const supabaseKey = import.meta.env.SUPABASE_SERVICE_KEY || env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl) {
    throw new Error("SUPABASE_URL is missing in API route");
  }

  cachedSupabase = createClient(supabaseUrl, supabaseKey);
  return cachedSupabase;
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
    const nestedResults = await Promise.all(persos.map(async (perso: any) => {
      // Enka donne des noms comme "MarionetteNew", on les traduit avec notre dictionnaire ENKA_TO_LOCAL_NAME
      const localName = ENKA_TO_LOCAL_NAME[perso.name] || perso.name;

      const exactPath = `../../../data/characters/${localName}.json`;
      let configLoader = charConfigsLoaders[exactPath];

      if (!configLoader) {
        const fuzzyKey = Object.keys(charConfigsLoaders).find(k => {
          const charNameFromPath = k.split('/').pop()?.replace('.json', '');
          return charNameFromPath && charNameFromPath.replace(/_/g, '').toLowerCase() === localName.toLowerCase();
        });
        if (fuzzyKey) configLoader = charConfigsLoaders[fuzzyKey];
      }

      if (!configLoader) {
        return [{
          id: perso.id,
          name: perso.name,
          localName: localName,
          error: 'Configuration non trouvée dans /data/characters/'
        }];
      }

      const mod = await configLoader();
      const config = (mod as any).default || mod;

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
    }));

    const results = nestedResults.flat();

    // --- 3. Sauvegarde dans Supabase ---

    // Vérification de l'opt-out
    const { data: profile } = await supabase
      .from('profiles')
      .select('leaderboard_opt_out')
      .eq('genshin_uid', uid)
      .maybeSingle();

    const isOptOut = profile?.leaderboard_opt_out === true;

    let debugBuildsError = null;

    if (!isOptOut) {
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
        // Filtrage des builds incomplets
        const hasWeapon = res.persoData && res.persoData.weapon;
        const has5Artifacts = res.persoData && res.persoData.artefacts && res.persoData.artefacts.length >= 5;

        if (!hasWeapon || !has5Artifacts) {
          return;
        }
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

      const buildsPromise = buildsToInsert.length > 0
        ? supabase.from('builds').upsert(buildsToInsert, { onConflict: 'uid, avatar_id' })
        : Promise.resolve({ error: null });

      const scoresPromise = scoresToInsert.length > 0
        ? supabase.from('leaderboard_scores').upsert(scoresToInsert, { onConflict: 'uid, avatar_id, leaderboard_id' })
        : Promise.resolve({ error: null });

      const [buildsRes, scoresRes] = await Promise.all([buildsPromise, scoresPromise]);

      if (buildsRes.error) {
        console.error("Supabase Builds Upsert Error:", buildsRes.error);
        debugBuildsError = buildsRes.error;
      }

      if (scoresRes.error) {
        console.error("Supabase Scores Upsert Error:", scoresRes.error);
      }
    } else {
      // Nettoyage au cas où des données résiduelles existeraient
      await Promise.all([
        supabase.from('builds').delete().eq('uid', uid),
        supabase.from('leaderboard_scores').delete().eq('uid', uid)
      ]);
      await supabase.from('players').delete().eq('uid', uid);
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

app.post('/player/:uid/optout-clean', async (c) => {
  const uid = c.req.param('uid');
  const supabase = getSupabase(c);

  const { data: profile } = await supabase
    .from('profiles')
    .select('leaderboard_opt_out')
    .eq('genshin_uid', uid)
    .maybeSingle();

  if (profile?.leaderboard_opt_out === true) {
    await supabase.from('builds').delete().eq('uid', uid);
    await supabase.from('leaderboard_scores').delete().eq('uid', uid);
    await supabase.from('players').delete().eq('uid', uid);
    return c.json({ success: true, message: 'Données supprimées avec succès' });
  }

  return c.json({ success: false, message: 'Non éligible ou non opt-out' }, 403);
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
  const allBuckets = ER_BUCKETS_BY_LEADERBOARD[leaderboard_id] || [100];
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

  const [{ count: rankCount }, { count: totalCount }] = await Promise.all([rankQuery, totalQuery]);

  return c.json({
    rank: (rankCount || 0) + 1,
    total: totalCount || 0,
    score: userScore.score,
    bucket: userBucket // Utile pour débugger
  });
});

app.post('/ranks/:uid', async (c) => {
  const uid = c.req.param('uid');
  const body = await c.req.json().catch(() => ({}));
  const queries = body.queries || [];

  if (!queries || queries.length === 0) {
    return c.json({ ranks: {} });
  }

  const supabase = getSupabase(c);
  const results: Record<string, any> = {};

  // 1. Fetch de tous les scores en une seule requête (Optimisation JS)
  const requestedLeaderboardIds = queries.map((q: any) => q.leaderboard_id);
  const { data: userScores } = await supabase
    .from('leaderboard_scores')
    .select('leaderboard_id, score, er')
    .eq('uid', uid)
    .in('leaderboard_id', requestedLeaderboardIds);

  const scoresMap = new Map();
  if (userScores) {
    userScores.forEach((s: any) => scoresMap.set(s.leaderboard_id, s));
  }

  // 2. Préparation des paramètres pour la fonction RPC ou le fallback
  const rpcRequests: any[] = [];

  for (const query of queries) {
    const leaderboard_id = query.leaderboard_id;
    const userScore = scoresMap.get(leaderboard_id);

    if (!userScore) {
      results[leaderboard_id] = { rank: 0, total: 0 };
      continue;
    }

    const allBuckets = ER_BUCKETS_BY_LEADERBOARD[leaderboard_id] || [100];
    const smallestBucket = allBuckets[allBuckets.length - 1] || 100;

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

    rpcRequests.push({
      leaderboard_id: leaderboard_id,
      user_score: userScore.score + 0.0001,
      min_er: userBucket !== smallestBucket ? userBucket / 100 : null,
      max_er: nextHigherBucket !== null ? nextHigherBucket / 100 : null
    });
  }

  if (rpcRequests.length === 0) {
    return c.json({ ranks: results });
  }

  // 3. TENTATIVE D'APPEL RPC (Méthode 100% optimisée Postgres)
  const { data: rpcData, error: rpcError } = await supabase.rpc('get_user_ranks_batch', {
    p_requests: rpcRequests
  });

  if (rpcData && !rpcError) {
    // La RPC a marché, on fusionne avec les éventuels résultats 0 déjà dans `results`
    return c.json({ ranks: { ...results, ...rpcData } });
  }

  // 4. FALLBACK (Si l'utilisateur n'a pas encore créé la fonction RPC sur Supabase)
  await Promise.all(rpcRequests.map(async (req: any) => {
    let rankQuery = supabase
      .from('leaderboard_scores')
      .select('*', { count: 'exact', head: true })
      .eq('leaderboard_id', req.leaderboard_id)
      .gt('score', req.user_score);

    let totalQuery = supabase
      .from('leaderboard_scores')
      .select('*', { count: 'exact', head: true })
      .eq('leaderboard_id', req.leaderboard_id);

    if (req.min_er !== null) {
      rankQuery = rankQuery.gte('er', req.min_er);
      totalQuery = totalQuery.gte('er', req.min_er);
    }

    if (req.max_er !== null) {
      rankQuery = rankQuery.lt('er', req.max_er);
      totalQuery = totalQuery.lt('er', req.max_er);
    }

    const [{ count: rankCount }, { count: totalCount }] = await Promise.all([rankQuery, totalQuery]);

    results[req.leaderboard_id] = {
      rank: (rankCount || 0) + 1,
      total: totalCount || 0,
      percentage: totalCount ? Math.max(1, Math.round((((rankCount || 0) + 1) / totalCount) * 100)) : 0
    };
  }));

  return c.json({ ranks: results });
});

export const ALL: APIRoute = (context) => {
  // On passe l'environnement Cloudflare à Hono pour qu'il puisse y accéder via `c.env`
  const env = (context.locals as any)?.runtime?.env || {};
  return app.fetch(context.request, env);
};
