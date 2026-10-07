import { createClient } from '@supabase/supabase-js';

// Initialisation de Supabase côté client (grâce aux variables d'environnement publiques)
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

let supabase;

if (supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
    console.warn(window.t ? window.t('account.auth.missingEnv') : "⚠️ [Auth] Variables d'environnement Supabase manquantes pour le client (PUBLIC_SUPABASE_URL / PUBLIC_SUPABASE_ANON_KEY).");
}

const t = (k) => window.t ? window.t(k) : k;

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

    try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) throw error;

        if (session && session.user) {
            // L'utilisateur EST connecté
            if (loginBtn) loginBtn.style.display = 'none';
            if (userAccount) userAccount.style.display = 'flex';

            // Mise à jour visuelle basique (Discord Info)
            const nameEl = document.getElementById('user-account-name');
            const avatarEl = document.getElementById('user-account-avatar');

            if (nameEl) nameEl.textContent = session.user.user_metadata.full_name || t('account.settings.player');
            if (avatarEl) avatarEl.src = session.user.user_metadata.avatar_url || '/assets/global/favicon.png';

            // On vérifie le profil public pour savoir s'il a associé un UID
            await fetchUserProfile(session.user.id);
        } else {
            // L'utilisateur n'est PAS connecté
            if (loginBtn) loginBtn.style.display = 'flex';
            if (userAccount) userAccount.style.display = 'none';
        }
    } catch (err) {
        console.error(t('account.auth.sessionError'), err);
    }
}

// Va chercher la table 'profiles' qu'on a créée via le trigger SQL
async function fetchUserProfile(userId) {
    const uidEl = document.getElementById('user-account-uid');
    if (!uidEl) return;

    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('genshin_uid, leaderboard_opt_out')
            .eq('id', userId)
            .single();

        if (data) {
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
        updateSettingsUiState(null);
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

        document.getElementById('settings-linked-uid').textContent = `UID: ${uid}`;
        document.getElementById('settings-linked-name').textContent = t('data.loading');

        try {
            const proxyUrl = `https://guobagg.clement-torchiat.workers.dev/?uid=${uid}`;
            const res = await fetch(proxyUrl);
            if (res.ok) {
                const data = await res.json();
                const p = data.playerInfo;
                if (p) {
                    document.getElementById('settings-linked-name').textContent = p.nickname || t('account.settings.player');

                    // Récupérer l'avatar complet (pfpsData / charData)
                    let profilePicUrl = 'https://enka.network/ui/UI_AvatarIcon_PlayerBoy_Circle.png';
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
                    document.getElementById('settings-linked-avatar').src = profilePicUrl;

                    // Récupérer la bannière via namecardsData
                    const namecardsData = window.namecardsData || {};
                    const namecard = namecardsData[String(p.nameCardId)];
                    let bannerUrl = null;
                    if (namecard && namecard.Icon) {
                        bannerUrl = `https://enka.network${namecard.Icon}`;
                        document.getElementById('settings-linked-bg').style.backgroundImage = `url('${bannerUrl}')`;
                    } else if (p.nameCardId) {
                        bannerUrl = `https://enka.network/ui/namecard/UI_NameCardPic_${p.nameCardId}_P.png`;
                        document.getElementById('settings-linked-bg').style.backgroundImage = `url('${bannerUrl}')`;
                    }

                    // Add to recent profiles so it's always displayed on home
                    try {
                        let recents = JSON.parse(localStorage.getItem('guoba_recent_profiles') || '[]');
                        if (!recents.find(r => String(r.uid) === String(uid))) {
                            recents.unshift({
                                uid: uid,
                                nickname: p.nickname || t('account.settings.player'),
                                ar: p.level || 0,
                                pic: profilePicUrl,
                                banner: bannerUrl,
                                signature: p.signature || ''
                            });
                            localStorage.setItem('guoba_recent_profiles', JSON.stringify(recents));
                            // Force re-render if we are on home page
                            if (window.renderHome) window.renderHome();
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
    }
}

export async function logoutUser() {
    if (!supabase) return;
    await supabase.auth.signOut();
    localStorage.removeItem('guoba_discord_uid');
    window.location.reload(); // On recharge pour réinitialiser l'état
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

            // Mise à jour de l'UI
            const uidEl = document.getElementById('user-account-uid');
            if (uidEl) {
                uidEl.textContent = t('account.settings.unlinked');
                uidEl.style.opacity = '0.5';
            }
            updateSettingsUiState(null);
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

// Exposer les fonctions globales pour qu'elles puissent être appelées via des 'onclick' en HTML
window.loginWithDiscord = loginWithDiscord;
window.logoutUser = logoutUser;
window.generateVerificationCode = generateVerificationCode;
window.verifyUidSignature = verifyUidSignature;
window.unlinkUid = unlinkUid;
window.toggleLeaderboardOptOut = toggleLeaderboardOptOut;

// Au chargement de l'app, on vérifie la session
document.addEventListener('DOMContentLoaded', () => {
    checkSessionAndUpdateUI();
});
document.addEventListener('astro:page-load', () => {
    checkSessionAndUpdateUI();
});
