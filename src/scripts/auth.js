import { createClient } from '@supabase/supabase-js';
import { idbGet } from './db.js';
import { getStoredSnapshots, clearStoredSnapshots, countArchivedCharacters } from './snapshotManager.js';
import { t as i18nT } from './i18n.js';

// Initialisation de Supabase côté client (grâce aux variables d'environnement publiques)
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

let supabase;

if (supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
    console.warn(window.t ? window.t('account.auth.missingEnv') : "⚠️ [Auth] Variables d'environnement Supabase manquantes pour le client (PUBLIC_SUPABASE_URL / PUBLIC_SUPABASE_ANON_KEY).");
}

const t = (k, ...args) => (typeof window !== 'undefined' && window.t) ? window.t(k, ...args) : i18nT(k, ...args);

// Fonction pour déclencher l'authentification OAuth avec Discord
export async function loginWithDiscord() {
    if (!supabase) {
        alert(t('account.auth.notConfigured'));
        return;
    }

    // Le redirectTo ramène l'utilisateur sur la page d'accueil après le login
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'discord',
        options: {
            redirectTo: window.location.origin
        }
    });

    if (error) {
        console.error(t('account.auth.loginError'), error.message);
    }
}

// Fonction appelée au chargement pour vérifier si l'utilisateur est connecté et mettre à jour l'UI
export async function checkSessionAndUpdateUI() {
    if (!supabase) return;

    const loginBtn = document.getElementById('user-account-login-btn');
    const userAccount = document.getElementById('user-account');
    const discordRefreshBtn = document.getElementById('settings-update-discord-btn');

    try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) throw error;

        if (session && session.user) {
            // L'utilisateur EST connecté
            if (loginBtn) loginBtn.style.display = 'none';
            if (userAccount) userAccount.style.display = 'flex';
            if (discordRefreshBtn) discordRefreshBtn.style.display = 'flex';

            // Mise à jour visuelle basique (Discord Info)
            const nameEl = document.getElementById('user-account-name');
            const avatarEl = document.getElementById('user-account-avatar');
            
            const discordName = session.user.user_metadata?.full_name || session.user.user_metadata?.name;
            if (discordName) {
                localStorage.setItem('guoba_discord_name', discordName);
            } else {
                localStorage.removeItem('guoba_discord_name');
            }

            if (nameEl) nameEl.textContent = discordName || t('account.settings.player');
            if (avatarEl) avatarEl.src = session.user.user_metadata.avatar_url || '/assets/global/favicon.png';

            // On vérifie le profil public pour savoir s'il a associé un UID
            await fetchUserProfile(session.user.id);
        } else {
            // L'utilisateur n'est PAS connecté
            if (loginBtn) loginBtn.style.display = 'flex';
            if (userAccount) userAccount.style.display = 'none';
            if (discordRefreshBtn) discordRefreshBtn.style.display = 'none';
        }
    } catch (err) {
        console.error(t('account.auth.sessionError'), err);
    }
}

// Va chercher la table 'profiles' qu'on a créée via le trigger SQL
async function fetchUserProfile(userId) {
    const uidEl = document.getElementById('user-account-uid');
    if (!uidEl) return;

    // Économie maximale des requêtes Supabase : si on a déjà un profil en cache local récent (< 10 min)
    const cachedUid = localStorage.getItem('guoba_discord_uid');
    const lastFetch = parseInt(localStorage.getItem('guoba_profile_last_fetch') || '0', 10);
    if (cachedUid && (Date.now() - lastFetch < 10 * 60 * 1000)) {
        uidEl.textContent = `UID: ${cachedUid}`;
        uidEl.style.opacity = '0.5';
        updateSettingsUiState(cachedUid);
        return;
    }

    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('genshin_uid, leaderboard_opt_out')
            .eq('id', userId)
            .single();

        if (data) {
            localStorage.setItem('guoba_profile_last_fetch', String(Date.now()));
            if (data.genshin_uid) {
                uidEl.textContent = `UID: ${data.genshin_uid}`;
                uidEl.style.opacity = '0.5';
                localStorage.setItem('guoba_discord_uid', data.genshin_uid);

                // Mettre à jour l'UI des paramètres
                updateSettingsUiState(data.genshin_uid);
            } else {
                uidEl.textContent = t('account.settings.unlinked');
                uidEl.style.opacity = '0.5';
                localStorage.removeItem('guoba_discord_uid');
                localStorage.removeItem('guoba_linked_profile');
                updateSettingsUiState(null);
            }

            // Mettre à jour la checkbox d'opt-out
            const optOutCheckbox = document.getElementById('leaderboard-optout-checkbox');
            if (optOutCheckbox) {
                optOutCheckbox.checked = data.leaderboard_opt_out || false;
            }
        }
    } catch (err) {
        // Profil pas encore existant (le trigger n'a peut être pas fini) ou erreur
        console.warn(t('account.auth.profileNotFound'), err);
        uidEl.textContent = t('account.settings.unlinked');
        localStorage.removeItem('guoba_discord_uid');
        localStorage.removeItem('guoba_linked_profile');
        updateSettingsUiState(null);
    }
}

// Helper pour mettre à jour la bannière liée de manière sûre (sans déclencher d'erreurs CORS/404)
function updateLinkedBg(url) {
    const bgEl = document.getElementById('settings-linked-bg');
    if (!bgEl) return;
    if (url) {
        if (bgEl.tagName === 'IMG') {
            bgEl.onerror = () => { bgEl.style.display = 'none'; };
            bgEl.src = url;
            bgEl.style.display = 'block';
        } else {
            bgEl.style.backgroundImage = `url('${url}')`;
        }
    } else {
        bgEl.style.display = 'none';
        if (bgEl.tagName === 'IMG') {
            bgEl.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E";
        }
    }
}

// Fonction pour gérer l'affichage de la vue liée/non liée
async function updateSettingsUiState(uid) {
    const unlinkedView = document.getElementById('settings-unlinked-view');
    const linkedView = document.getElementById('settings-linked-view');
    const prefsView = document.getElementById('settings-preferences-view');

    if (uid) {
        // Vue LIÉ
        if (unlinkedView) unlinkedView.style.display = 'none';
        if (linkedView) linkedView.style.display = 'flex';
        if (prefsView) prefsView.style.display = 'flex';

        const uidEl = document.getElementById('settings-linked-uid');
        const nameEl = document.getElementById('settings-linked-name');
        const avatarEl = document.getElementById('settings-linked-avatar');
        if (uidEl) uidEl.textContent = `UID: ${uid}`;

        updateArchivedCountLabel();

        // 1. Lire le cache local spécifique au profil lié (uniquement les données et les 2 images nécessaires)
        let cached = null;
        try {
            const raw = localStorage.getItem('guoba_linked_profile');
            if (raw) {
                const parsed = JSON.parse(raw);
                if (String(parsed.uid) === String(uid)) {
                    cached = parsed;
                }
            }
            // Secours : si pas encore dans guoba_linked_profile, regarder dans les profils récents
            if (!cached) {
                const recents = JSON.parse(localStorage.getItem('guoba_recent_profiles') || '[]');
                const found = recents.find(r => String(r.uid) === String(uid));
                if (found) {
                    cached = {
                        uid: String(uid),
                        nickname: found.nickname,
                        pic: found.pic,
                        banner: found.banner
                    };
                }
            }
        } catch (_) {}

        // Affichage immédiat depuis le cache local (zéro latence, zéro clignotement)
        if (cached) {
            if (nameEl && cached.nickname) nameEl.textContent = cached.nickname;
            if (avatarEl && cached.pic) {
                avatarEl.onerror = () => { avatarEl.src = 'https://enka.network/ui/UI_AvatarIcon_PlayerBoy_Circle.png'; };
                avatarEl.src = cached.pic;
            }
            if (cached.banner) {
                updateLinkedBg(cached.banner);
            } else {
                updateLinkedBg(null);
            }
        } else {
            if (nameEl) nameEl.textContent = t('data.loading');
            updateLinkedBg(null);
        }

        // Si le cache a moins de 5 minutes, inutile de solliciter le proxy à chaque changement de page
        if (cached && cached.ts && (Date.now() - cached.ts < 5 * 60 * 1000) && cached.banner && cached.pic) {
            return;
        }

        try {
            const proxyUrl = `https://guobagg.clement-torchiat.workers.dev/?uid=${uid}`;
            const res = await fetch(proxyUrl);
            if (res.ok) {
                const data = await res.json();
                const p = data.playerInfo;
                if (p) {
                    if (nameEl) nameEl.textContent = p.nickname || t('account.settings.player');

                    // Charger les dictionnaires depuis IndexedDB si non présents en mémoire
                    if (!window.namecardsData || !window.pfpsData) {
                        try {
                            const idb = await idbGet('guoba_gamedata_idb_v5');
                            if (idb) {
                                window.namecardsData = window.namecardsData || idb.namecards;
                                window.pfpsData = window.pfpsData || idb.pfps;
                                window.charData = window.charData || idb.chars;
                            }
                        } catch (_) {}
                    }

                    // 1ère image : Avatar (profilePicUrl)
                    let profilePicUrl = cached?.pic || 'https://enka.network/ui/UI_AvatarIcon_PlayerBoy_Circle.png';
                    const pp = p.profilePicture || {};
                    if (pp.id) {
                        const pfp = (window.pfpsData || {})[String(pp.id)];
                        if (pfp && pfp.IconPath) profilePicUrl = `https://enka.network${pfp.IconPath}`;
                    } else if (pp.avatarId && window.charData && window.charData[pp.avatarId]) {
                        const info = window.charData[pp.avatarId];
                        const getKey = (o, k) => o?.[k] !== undefined ? o[k] : o?.[k[0].toLowerCase() + k.slice(1)];
                        let raw = getKey(info, 'IconName') || getKey(info, 'SideIconName') || getKey(info, 'icon');
                        if (raw) {
                            if (raw.startsWith('/ui/')) {
                                profilePicUrl = `https://enka.network${raw.replace('UI_AvatarIcon_Side_', 'UI_AvatarIcon_').replace(/\.png$/i, '_Circle.png')}`;
                            } else {
                                const n = raw.replace(/^.*UI_AvatarIcon_Side_/, '').replace(/^.*UI_AvatarIcon_/, '').replace(/\.png$/i, '');
                                profilePicUrl = `https://enka.network/ui/UI_AvatarIcon_${n}_Circle.png`;
                            }
                        }
                    }
                    if (avatarEl) {
                        avatarEl.onerror = () => { avatarEl.src = 'https://enka.network/ui/UI_AvatarIcon_PlayerBoy_Circle.png'; };
                        avatarEl.src = profilePicUrl;
                    }

                    // 2ème image : Bannière de thème (bannerUrl)
                    const namecardsData = window.namecardsData || {};
                    const namecard = namecardsData[String(p.nameCardId)];
                    let bannerUrl = null;

                    if (namecard && namecard.Icon) {
                        bannerUrl = `https://enka.network${namecard.Icon}`;
                    } else if (cached && cached.banner && String(cached.nameCardId) === String(p.nameCardId)) {
                        bannerUrl = cached.banner;
                    } else if (p.nameCardId) {
                        // Téléchargement ponctuel et léger de namecards.json uniquement si nécessaire (21 Ko)
                        try {
                            const ncRes = await fetch('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/gi/namecards.json');
                            if (ncRes.ok) {
                                const ncData = await ncRes.json();
                                window.namecardsData = ncData;
                                if (ncData[String(p.nameCardId)]?.Icon) {
                                    bannerUrl = `https://enka.network${ncData[String(p.nameCardId)].Icon}`;
                                }
                            }
                        } catch (_) {}
                    }

                    updateLinkedBg(bannerUrl);

                    // Mise en cache local des informations et des 2 URLs d'images uniquement
                    try {
                        localStorage.setItem('guoba_linked_profile', JSON.stringify({
                            uid: String(uid),
                            nickname: p.nickname || t('account.settings.player'),
                            pic: profilePicUrl,
                            banner: bannerUrl,
                            nameCardId: p.nameCardId,
                            ts: Date.now()
                        }));
                    } catch (_) {}

                    // Mise à jour des profils récents pour l'accueil
                    try {
                        let recents = JSON.parse(localStorage.getItem('guoba_recent_profiles') || '[]');
                        const existingIdx = recents.findIndex(r => String(r.uid) === String(uid));
                        const profileEntry = {
                            uid: uid,
                            nickname: p.nickname || t('account.settings.player'),
                            ar: p.level || 0,
                            pic: profilePicUrl,
                            banner: bannerUrl,
                            signature: p.signature || ''
                        };
                        if (existingIdx !== -1) {
                            recents[existingIdx] = { ...recents[existingIdx], ...profileEntry };
                        } else {
                            recents.unshift(profileEntry);
                        }
                        localStorage.setItem('guoba_recent_profiles', JSON.stringify(recents));
                        
                        // Forcer le rafraîchissement UNIQUEMENT si l'utilisateur est actuellement sur la page d'accueil
                        const isHome = (window.location.pathname === '/' || window.location.pathname === '') &&
                            !new URLSearchParams(window.location.search).get('uid') &&
                            (!window.globalPersoData || window.globalPersoData.length === 0) &&
                            document.getElementById('home-title');
                        if (isHome && typeof window.renderHome === 'function') {
                            window.renderHome();
                        }
                    } catch (e) {
                        console.error("Erreur lors de l'ajout au profils récents", e);
                    }
                }
            }
        } catch (e) {
            console.error(t('account.auth.fetchSettingsError'), e);
        }
    } else {
        // Vue NON LIÉ
        if (unlinkedView) unlinkedView.style.display = 'flex';
        if (linkedView) linkedView.style.display = 'none';
        if (prefsView) prefsView.style.display = 'none';
        updateLinkedBg(null);
    }
}

export async function logoutUser() {
    if (!supabase) return;
    const discordRefreshBtn = document.getElementById('settings-update-discord-btn');
    if (discordRefreshBtn) discordRefreshBtn.style.display = 'none';
    await supabase.auth.signOut();
    localStorage.removeItem('guoba_discord_uid');
    localStorage.removeItem('guoba_discord_name');
    localStorage.removeItem('guoba_linked_profile');
    localStorage.removeItem('guoba_profile_last_fetch');
    window.location.reload(); // On recharge pour réinitialiser l'état
}

export async function updateDiscordAvatar() {
    if (!supabase) {
        alert(t('account.auth.notConfigured'));
        return;
    }

    const btn = document.getElementById('settings-update-discord-btn');
    const svg = btn ? btn.querySelector('svg') : null;
    if (svg) svg.classList.add('spinning');
    if (btn) btn.style.pointerEvents = 'none';

    try {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'discord',
            options: {
                redirectTo: window.location.href
            }
        });

        if (error) {
            console.error(t('account.auth.loginError'), error.message);
            if (svg) svg.classList.remove('spinning');
            if (btn) btn.style.pointerEvents = 'auto';
        }
    } catch (err) {
        console.error("Erreur lors de la mise à jour de l'avatar Discord:", err);
        if (svg) svg.classList.remove('spinning');
        if (btn) btn.style.pointerEvents = 'auto';
    }
}

// --- Logique de vérification de l'UID ---
let currentVerificationCode = '';

export async function generateVerificationCode() {
    const uidInput = document.getElementById('link-uid-input');
    const formatErrorEl = document.getElementById('uid-format-error');
    const linkedErrorEl = document.getElementById('uid-linked-error');
    
    if (formatErrorEl) formatErrorEl.style.display = 'none';
    if (linkedErrorEl) linkedErrorEl.style.display = 'none';

    const uidValue = uidInput ? uidInput.value.trim() : '';
    // Un UID valide fait généralement 9 chiffres (Genshin, HSR) ou 10 chiffres (ZZZ)
    // On garde 8 à 10 pour être large au cas où.
    const uidRegex = /^[0-9]{8,10}$/;
    
    if (!uidValue || !uidRegex.test(uidValue)) {
        if (formatErrorEl) {
            formatErrorEl.style.display = 'block';
        } else {
            alert(t('account.settings.errorFormat'));
        }
        return;
    }

    // Vérifie si l'UID est déjà lié à un profil existant
    if (supabase) {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('id')
                .eq('genshin_uid', uidValue)
                .maybeSingle();

            if (data) {
                if (linkedErrorEl) {
                    linkedErrorEl.style.display = 'block';
                } else {
                    alert(t('account.settings.errorAlreadyLinked'));
                }
                return;
            }
        } catch (e) {
            console.error("Erreur lors de la vérification de l'UID", e);
        }
    }

    // Génère un code de type "guoba-a1b2c3"
    const randomStr = Math.random().toString(36).substring(2, 8);
    currentVerificationCode = `guoba-${randomStr}`;

    const displayEl = document.getElementById('verification-code-display');
    if (displayEl) displayEl.textContent = currentVerificationCode;

    // Validate step 1
    const step1 = document.getElementById('timeline-step-1');
    if (step1) step1.classList.add('validated');

    const stepEl = document.getElementById('verification-step');
    if (stepEl) {
        stepEl.style.display = 'block';
        // Add animate-in class to the steps inside
        const animSteps = stepEl.querySelectorAll('.step-anim');
        animSteps.forEach(el => el.classList.add('animate-in'));
    }

    // Réinitialiser les messages
    document.getElementById('verification-error').style.display = 'none';
    document.getElementById('verification-success').style.display = 'none';
}

export async function verifyUidSignature() {
    const uidInput = document.getElementById('link-uid-input');
    const errorEl = document.getElementById('verification-error');
    const successEl = document.getElementById('verification-success');

    if (!uidInput || !uidInput.value || !currentVerificationCode) return;

    const uid = uidInput.value.trim();
    const btn = document.getElementById('verify-code-btn');
    const originalText = btn.textContent;

    try {
        btn.textContent = t('account.settings.verifying');
        btn.disabled = true;
        errorEl.style.display = 'none';

        // On fait appel à l'API via le proxy Cloudflare (pour éviter les erreurs CORS de Enka)
        const proxyUrl = `https://guobagg.clement-torchiat.workers.dev/?uid=${uid}`;
        const res = await fetch(proxyUrl);
        if (!res.ok) throw new Error(t('account.auth.fetchProfileError'));

        const data = await res.json();
        const signature = data.playerInfo?.signature || "";

        if (signature.includes(currentVerificationCode)) {
            // Succès ! La signature contient le code
            successEl.style.display = 'block';

            // On sauvegarde dans Supabase
            const { data: { session } } = await supabase.auth.getSession();
            if (session && session.user) {
                await supabase.from('profiles').update({ genshin_uid: uid }).eq('id', session.user.id);
                localStorage.setItem('guoba_discord_uid', uid);
                // Mettre à jour l'UI dans la sidebar et les settings
                const uidEl = document.getElementById('user-account-uid');
                if (uidEl) {
                    uidEl.textContent = `UID: ${uid}`;
                    uidEl.style.opacity = '1';
                }
                updateSettingsUiState(uid);
            }
        } else {
            // Echec
            errorEl.style.display = 'block';
            console.warn("Signature actuelle :", signature);
        }
    } catch (err) {
        console.error(t('account.auth.verifyError'), err);
        errorEl.style.display = 'block';
    } finally {
        btn.textContent = originalText;
        btn.disabled = false;
    }
}

// --- Logique de déliaison ---
export async function unlinkUid() {
    if (!confirm(t('account.settings.unlinkConfirm'))) return;

    if (!supabase) return;
    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session && session.user) {
            const { error } = await supabase
                .from('profiles')
                .update({ genshin_uid: null })
                .eq('id', session.user.id);

            if (error) throw error;
            localStorage.removeItem('guoba_discord_uid');
            localStorage.removeItem('guoba_linked_profile');
            localStorage.removeItem('guoba_profile_last_fetch');

            // Mise à jour de l'UI
            const uidEl = document.getElementById('user-account-uid');
            if (uidEl) {
                uidEl.textContent = t('account.settings.unlinked');
                uidEl.style.opacity = '0.5';
            }
            updateSettingsUiState(null);

            const isHome = (window.location.pathname === '/' || window.location.pathname === '') &&
                !new URLSearchParams(window.location.search).get('uid') &&
                (!window.globalPersoData || window.globalPersoData.length === 0) &&
                document.getElementById('home-title');
            if (isHome && typeof window.renderHome === 'function') {
                window.renderHome();
            }

            alert(t('account.settings.unlinkSuccess'));
        }
    } catch (err) {
        console.error("Erreur lors de la déliaison:", err);
        alert(t('account.settings.unlinkError'));
    }
}

// --- Logique d'Opt-out ---
export async function toggleLeaderboardOptOut(isOptOut) {
    if (!supabase) return;
    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session && session.user) {
            const { error } = await supabase
                .from('profiles')
                .update({ leaderboard_opt_out: isOptOut })
                .eq('id', session.user.id);

            if (error) throw error;
            console.log("Préférence d'opt-out mise à jour :", isOptOut);

            if (isOptOut) {
                // Il faut récupérer le genshin_uid pour appeler le clean
                const { data } = await supabase.from('profiles').select('genshin_uid').eq('id', session.user.id).single();
                if (data && data.genshin_uid) {
                    await fetch(`/api/player/${data.genshin_uid}/optout-clean`, { method: 'POST' })
                        .catch(err => console.error("Erreur appel optout-clean:", err));
                }
            }
        }
    } catch (err) {
        console.error("Erreur mise à jour opt-out:", err);
        alert(t('account.settings.optoutError'));
    }
}

// --- Logique d'affichage du compteur de la réserve ---
export async function updateArchivedCountLabel() {
    const countLabel = document.getElementById('settings-archived-count-label');
    if (!countLabel) return;
    const uid = localStorage.getItem('guoba_discord_uid');
    if (!uid) {
        countLabel.textContent = t('account.settings.archivedCount', 0);
        return;
    }
    try {
        const count = await countArchivedCharacters(uid);
        countLabel.textContent = t('account.settings.archivedCount', count);
    } catch (_) {
        countLabel.textContent = t('account.settings.archivedCount', 0);
    }
}

// --- Logique d'effacement de la réserve locale ---
export async function clearArchivedSnapshots() {
    const uid = localStorage.getItem('guoba_discord_uid');
    if (!uid) return;

    if (!confirm(t('account.settings.clearSnapshotsConfirm'))) return;

    await clearStoredSnapshots(uid);

    const countLabel = document.getElementById('settings-archived-count-label');
    if (countLabel) {
        countLabel.textContent = t('account.settings.archivedCount', 0);
    }

    const currentUid = document.getElementById('uidInput')?.value.trim();
    if (currentUid && String(currentUid) === String(uid) && Array.isArray(window.globalPersoData)) {
        window.globalPersoData = window.globalPersoData.filter(p => !p.isArchived);
        if (typeof window.renderSidebar === 'function') {
            window.renderSidebar(0);
        }
        if (typeof window.renderShowcase === 'function' && window.globalPersoData.length > 0) {
            window.renderShowcase(0);
        }
    }

    alert(t('account.settings.clearSnapshotsSuccess'));
}

// Exposer les fonctions globales pour qu'elles puissent être appelées via des 'onclick' en HTML
window.loginWithDiscord = loginWithDiscord;
window.logoutUser = logoutUser;
window.generateVerificationCode = generateVerificationCode;
window.verifyUidSignature = verifyUidSignature;
window.unlinkUid = unlinkUid;
window.toggleLeaderboardOptOut = toggleLeaderboardOptOut;
window.updateDiscordAvatar = updateDiscordAvatar;
window.clearArchivedSnapshots = clearArchivedSnapshots;
window.updateArchivedCountLabel = updateArchivedCountLabel;

// Au chargement de l'app, on vérifie la session
document.addEventListener('DOMContentLoaded', () => {
    checkSessionAndUpdateUI();
});
document.addEventListener('astro:page-load', () => {
    checkSessionAndUpdateUI();
});
