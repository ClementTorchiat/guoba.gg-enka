window.PAGE_CONTENTS = {
    // ─────────────────────────────────────────────────────────────────────
    //  À PROPOS
    // ─────────────────────────────────────────────────────────────────────
    about: () => `
        <div class="static-page">
            <div class="static-page-hero">
                <h1 class="static-page-title">${window.t('page.about.title')}</h1>
                <p class="static-page-lead">${window.t('page.about.lead')}</p>
            </div>
        
            <div class="static-page-body">
        
                <section class="static-section">
                    <h2 class="static-section-title">${window.t('page.about.q1.title')}</h2>
                    <p>${window.t('page.about.q1.p1')}</p>
                    <p class="static-note">${window.t('page.about.q1.p2')}</p>
                </section>
        
                <div class="static-divider"></div>
        
                <section class="static-section">
                    <h2 class="static-section-title">${window.t('page.about.q2.title')}</h2>
                    <div class="static-cards">
                        <div class="static-card">
                            <strong>${window.t('page.about.q2.c1.title')}</strong>
                            <p>${window.t('page.about.q2.c1.desc')}</p>
                        </div>
                        <div class="static-card">
                            <strong>${window.t('page.about.q2.c2.title')}</strong>
                            <p>${window.t('page.about.q2.c2.desc')}</p>
                        </div>
                        <div class="static-card">
                            <strong>${window.t('page.about.q2.c3.title')}</strong>
                            <p>${window.t('page.about.q2.c3.desc')}</p>
                        </div>
                        <div class="static-card">
                            <strong>${window.t('page.about.q2.c4.title')}</strong>
                            <p>${window.t('page.about.q2.c4.desc')}</p>
                        </div>
                    </div>
                </section>
        
                <div class="static-divider"></div>
        
                <section class="static-section">
                    <h2 class="static-section-title">${window.t('page.about.q3.title')}</h2>
                    <ul class="static-list">
                        <li>${window.t('page.about.q3.l1')}</li>
                        <li>${window.t('page.about.q3.l2')}</li>
                        <li>${window.t('page.about.q3.l3')}</li>
                    </ul>
                    <p class="static-note">${window.t('page.about.q3.note')}</p>
                </section>
        
                <div class="static-divider"></div>
        
                <section class="static-section">
                    <h2 class="static-section-title">${window.t('page.about.q4.title')}</h2>
                    <p>${window.t('page.about.q4.desc')}</p>
                    <div class="static-links">
                        <a class="link-button" href="https://discord.gg/CZ5qxVqBVJ" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-discord"></i>Discord</a>
                        <a class="link-button-coffee" href="https://ko-fi.com/guobagg" target="_blank" rel="noopener noreferrer">
                            <img src="https://cdn.prod.website-files.com/5c14e387dab576fe667689cf/670f5a01229bf8a18f97a3c1_favion.png" alt="" width="18" height="18">
                            Buy me a coffee
                        </a>
                    </div>
                </section>
            </div>
        </div>
    `,

    // ─────────────────────────────────────────────────────────────────────
    //  L'ÉQUIPE
    // ─────────────────────────────────────────────────────────────────────
    team: () => `
        <div class="static-page">
            <div class="static-page-hero">
                <h1 class="static-page-title">${window.t('page.team.title')}</h1>
                <p class="static-page-lead">${window.t('page.team.lead')}</p>
            </div>
            <div class="static-page-body">
                <section class="static-section">
                    <div class="team-grid">
                        <div class="team-card">
                            <div class="team-header">
                                <div class="team-avatar-wrap">
                                    <img src="assets/subpages/team/clem_pfp.webp" alt="clem" class="team-avatar">
                                </div>
                                <div class="team-title-info">
                                    <p class="team-name">clem</p>
                                    <p class="team-role">${window.t('page.team.clem.role')}</p>
                                </div>
                            </div>
                            <div class="team-divider"></div>
                            <div class="team-content">
                                <p class="team-bio">${window.t('page.team.clem.bio')}</p>
                                <p class="team-uid">UID : 704449686
                                    <span class="copy-uid-btn" title="${window.t('page.team.copyUid')}" onclick="navigator.clipboard.writeText('704449686'); const i = this.querySelector('i'); i.className = 'fa-solid fa-check'; setTimeout(() => i.className = 'fa-regular fa-copy', 1500);">
                                        <i class="fa-regular fa-copy"></i>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div class="team-card">
                            <div class="team-header">
                                <div class="team-avatar-wrap">
                                    <img src="assets/subpages/team/bluvitae_pfp.webp" alt="bluvitae" class="team-avatar">
                                </div>
                                <div class="team-title-info">
                                    <p class="team-name">bluvitae</p>
                                    <p class="team-role">${window.t('page.team.blu.role')}</p>
                                </div>
                            </div>
                            <div class="team-divider"></div>
                            <div class="team-content">
                                <p class="team-bio">${window.t('page.team.blu.bio')}</p>
                                <p class="team-uid">UID : 741928446
                                    <span class="copy-uid-btn" title="${window.t('page.team.copyUid')}" onclick="navigator.clipboard.writeText('741928446'); const i = this.querySelector('i'); i.className = 'fa-solid fa-check'; setTimeout(() => i.className = 'fa-regular fa-copy', 1500);">
                                        <i class="fa-regular fa-copy"></i>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
        
                <div class="static-divider"></div>
        
                <section class="static-section">
                    <h2 class="static-section-title">${window.t('page.team.thanks.title')}</h2>
                    <p>${window.t('page.team.thanks.lead')}</p>
                    <ul class="static-list">
                        <li>${window.t('page.team.thanks.l1')}</li>
                        <li>${window.t('page.team.thanks.l2')}</li>
                        <li>${window.t('page.team.thanks.l3')}</li>
                    </ul>
                </section>
        
            </div>
        </div>
    `,

    // ─────────────────────────────────────────────────────────────────────
    //  CHARTE DE CONFIDENTIALITÉ
    // ─────────────────────────────────────────────────────────────────────
    privacy: () => `
        <div class="static-page">
            <div class="static-page-hero">
                <h1 class="static-page-title">${window.t('page.privacy.title')}</h1>
                <p class="static-page-lead">${window.t('page.privacy.lead')}</p>
            </div>

            <div class="static-page-body">

                <section class="static-section">
                    <h2 class="static-section-title">${window.t('page.privacy.q1.title')}</h2>
                    <p>${window.t('page.privacy.q1.p1')}</p>
                    <p>${window.t('page.privacy.q1.p2')}</p>
                </section>

                <div class="static-divider"></div>

                <section class="static-section">
                    <h2 class="static-section-title">${window.t('page.privacy.q2.title')}</h2>
                    <p>${window.t('page.privacy.q2.p1')}</p>
                    <ul class="static-list">
                        <li>${window.t('page.privacy.q2.l1')}</li>
                        <li>${window.t('page.privacy.q2.l2')}</li>
                    </ul>
                    <p class="static-note">${window.t('page.privacy.q2.note')}</p>
                </section>

                <div class="static-divider"></div>

                <section class="static-section">
                    <h2 class="static-section-title">${window.t('page.privacy.q3.title')}</h2>
                    <p>${window.t('page.privacy.q3.p1')}</p>
                    <p>${window.t('page.privacy.q3.p2')}</p>
                </section>
                
                <div class="static-divider"></div>

                <section class="static-section">
                    <h2 class="static-section-title">${window.t('page.privacy.q4.title')}</h2>
                    <p>${window.t('page.privacy.q4.p1')}</p>
                    <p>${window.t('page.privacy.q4.p2')}</p>
                </section>

                <div class="static-divider"></div>

                <section class="static-section">
                    <h2 class="static-section-title">${window.t('page.privacy.q5.title')}</h2>
                    <p>${window.t('page.privacy.q5.p1')}</p>
                </section>

                <div class="static-divider"></div>

                <section class="static-section">
                    <h2 class="static-section-title">${window.t('page.privacy.q6.title')}</h2>
                    <p>${window.t('page.privacy.q6.p1')}</p>
                    <div class="static-links">
                        <a class="link-button" href="https://discord.gg/CZ5qxVqBVJ" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-discord"></i>Discord</a>
                    </div>
                </section>

                <p class="static-updated">${window.t('page.privacy.date')}</p>

            </div>
        </div>
    `,
};