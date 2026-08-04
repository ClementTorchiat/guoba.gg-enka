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
                        <a class="link-button" href="https://discord.gg/CZ5qxVqBVJ" target="_blank" rel="noopener noreferrer"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 6px;"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>Discord</a>
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
                                    <span class="copy-uid-btn" title="${window.t('page.team.copyUid')}" onclick="navigator.clipboard.writeText('704449686'); this.innerHTML = '<svg width=\\'14\\' height=\\'14\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'#22c55e\\' stroke-width=\\'2.5\\' stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\'><polyline points=\\'20 6 9 17 4 12\\'></polyline></svg>'; setTimeout(() => this.innerHTML = '<svg width=\\'14\\' height=\\'14\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'currentColor\\' stroke-width=\\'2\\' stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\'><rect x=\\'9\\' y=\\'9\\' width=\\'13\\' height=\\'13\\' rx=\\'2\\' ry=\\'2\\'></rect><path d=\\'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\\'></path></svg>', 1500);">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
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
                                    <span class="copy-uid-btn" title="${window.t('page.team.copyUid')}" onclick="navigator.clipboard.writeText('741928446'); this.innerHTML = '<svg width=\\'14\\' height=\\'14\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'#22c55e\\' stroke-width=\\'2.5\\' stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\'><polyline points=\\'20 6 9 17 4 12\\'></polyline></svg>'; setTimeout(() => this.innerHTML = '<svg width=\\'14\\' height=\\'14\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'currentColor\\' stroke-width=\\'2\\' stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\'><rect x=\\'9\\' y=\\'9\\' width=\\'13\\' height=\\'13\\' rx=\\'2\\' ry=\\'2\\'></rect><path d=\\'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\\'></path></svg>', 1500);">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
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
                        <a class="link-button" href="https://discord.gg/CZ5qxVqBVJ" target="_blank" rel="noopener noreferrer"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 6px;"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>Discord</a>
                    </div>
                </section>

                <p class="static-updated">${window.t('page.privacy.date')}</p>

            </div>
        </div>
    `,
};