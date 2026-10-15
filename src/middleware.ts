import { defineMiddleware } from 'astro:middleware';

const CSP_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://enka.network https://cdn.prod.website-files.com https://cdn.discordapp.com https://media.discordapp.net https://static.wikia.nocookie.net",
  "font-src 'self' data:",
  "connect-src 'self' https://*.supabase.co https://enka.network https://*.workers.dev https://raw.githubusercontent.com ws: http:",
  "worker-src 'self' blob:",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();

  // En-têtes de sécurité recommandés
  response.headers.set('Content-Security-Policy', CSP_POLICY);
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.headers.set('X-Frame-Options', 'DENY');

  return response;
});
