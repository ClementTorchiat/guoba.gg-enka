import pkg from '../../package.json' with { type: 'json' };

export const APP_VERSION = pkg.version;
export const GAME_VERSION = pkg.gameVersion || '7.1';
export const CACHE_KEY = `guoba_gamedata_idb_${APP_VERSION}`;
