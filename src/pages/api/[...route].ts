import { Hono } from 'hono';
import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

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

    // On renvoie fièrement le résultat au format JSON
    return c.json({
      status: 'succès',
      message: 'Données Enka récupérées avec succès par Hono !',
      uid: uid,
      raw_data: enkaData
    });

  } catch (err) {
    return c.json({
      status: 'erreur_serveur',
      message: 'Une erreur est survenue lors du fetch vers Enka.'
    }, 500);
  }
});

export const ALL: APIRoute = (context) => app.fetch(context.request);
