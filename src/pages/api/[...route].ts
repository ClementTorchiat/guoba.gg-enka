import { Hono } from 'hono';
import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { parseEnkaData } from '../../server/enkaParser';
import { calculateCharacterScore, calculateMaxTheoreticalScore } from '../../scripts/scoring.js';

// Chargement en mémoire vive de toutes les configs de tes persos !
const charConfigsLoaders = import.meta.glob('../../../data/characters/*.json', { eager: true });
// On crée un dictionnaire rapide : { "Hu_Tao": {...}, "Arlecchino": {...} }
const CHAR_CONFIGS: Record<string, any> = {};
for (const path in charConfigsLoaders) {
  const fileName = path.split('/').pop()?.replace('.json', '') || "";
  CHAR_CONFIGS[fileName] = (charConfigsLoaders[path] as any).default || charConfigsLoaders[path];
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

// Hono lit les variables d'environnement via import.meta.env dans Astro
const supabase = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_SERVICE_KEY
);

app.get('/hello', (c) => {
  return c.json({
    message: 'Hello depuis Hono sur Cloudflare Edge !'
  });
});

app.get('/test-db', async (c) => {
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
    const results = persos.map((perso: any) => {
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
        return {
          id: perso.id,
          name: perso.name,
          localName: localName,
          error: 'Configuration non trouvée dans /data/characters/'
        };
      }

      let bestBuildKey = Object.keys(config.builds)[0];
      let maxEfficiency = -1;
      let bestScoringConfig = null;

      // On simule chaque build pour trouver celui qui matche le mieux avec l'équipement actuel (Efficiency)
      Object.entries(config.builds).forEach(([key, build]: [string, any]) => {
        const scoringConfig = {
          weights: build.weights,
          idealMainStats: build.idealMainStats,
          bestSets: build.bestSets || [],
          goodSets: build.goodSets || []
        };

        const simulation = calculateCharacterScore(perso, scoringConfig, 45); // Max rolls n'a pas d'importance pour ce ratio
        const potential = calculateMaxTheoreticalScore(perso, scoringConfig);

        let efficiency = 0;
        if (potential && potential.score > 0) {
          efficiency = simulation.score / potential.score;
        }

        if (efficiency > maxEfficiency) {
          maxEfficiency = efficiency;
          bestBuildKey = key;
          bestScoringConfig = scoringConfig;
        }
      });

      // Sécurité si aucun build n'a pu être sélectionné
      if (!bestScoringConfig) {
        bestScoringConfig = {
          weights: config.builds[bestBuildKey].weights,
          idealMainStats: config.builds[bestBuildKey].idealMainStats,
          bestSets: config.builds[bestBuildKey].bestSets || [],
          goodSets: config.builds[bestBuildKey].goodSets || []
        };
      }

      // LE CŒUR DU RÉACTEUR : On calcule d'abord le max dynamique !
      const potentialMax = calculateMaxTheoreticalScore(perso, bestScoringConfig);

      // Puis on passe ce max dynamique à ton algorithme
      const score = calculateCharacterScore(perso, bestScoringConfig, potentialMax.totalRolls);

      // On sauvegarde le résultat complet de l'évaluation dans l'objet perso !
      perso.evaluation = score;

      return {
        id: perso.id,
        name: perso.name,
        archetype: bestBuildKey,
        score: score.score, // Le vrai score brut
        grade: score.grade,
        persoData: perso // Tout le détail (stats, armes, artéfacts avec sub-scores) à sauvegarder !
      };
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

    // Upsert des builds
    const buildsToInsert = results.filter((r: any) => !r.error).map((res: any) => ({
      uid: uid,
      avatar_id: String(res.id),
      archetype: res.archetype,
      score: res.score,
      data: res.persoData
    }));

    if (buildsToInsert.length > 0) {
      const { error: buildsError } = await supabase
        .from('builds')
        .upsert(buildsToInsert, { onConflict: 'uid, avatar_id, archetype' });

      if (buildsError) {
        console.error("Supabase Builds Upsert Error:", buildsError);
      }
    }

    // On renvoie fièrement le résultat (sans envoyer persoData pour éviter de polluer l'API si le front n'en a pas besoin, ou tu peux le laisser)
    return c.json({
      status: 'succès',
      message: 'Scores calculés et sauvegardés avec succès !',
      uid: uid,
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

export const ALL: APIRoute = (context) => app.fetch(context.request);
