import { Hono } from 'hono';
import type { APIRoute } from 'astro';

export const prerender = false;

const app = new Hono().basePath('/api');

app.get('/hello', (c) => {
  return c.json({
    message: 'Hello depuis Hono sur Cloudflare Edge !'
  });
});

app.get('/player/:uid', (c) => {
  const uid = c.req.param('uid');
  return c.json({
    message: `Prêt à fetch l'UID : ${uid}`,
    status: 'en attente'
  });
});

// Astro gérera toutes les méthodes HTTP via ALL
export const ALL: APIRoute = (context) => app.fetch(context.request);
