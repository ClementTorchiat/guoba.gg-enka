// src/components/profile/Sidebar.js

export function renderSidebarList(characters, activeOriginalIndex = 0, sortState = { column: 'original', direction: 'asc' }, onSelectChar) {
    const list = document.getElementById('sidebar-list');
    if (!list) return;
    list.innerHTML = "";
    const targetIndex = parseInt(activeOriginalIndex, 10);

    let entries = (characters || []).map((p, i) => ({ p, originalIndex: i }));

    const { column, direction } = sortState;
    if (column === 'original') {
        if (direction === 'asc') entries.reverse();
    } else if (column === 'name') {
        entries.sort((a, b) => {
            const lang = (typeof window !== 'undefined' && window.GUOBA_LANG) || 'fr';
            const cmp = a.p.nom.localeCompare(b.p.nom, lang, { sensitivity: 'base' });
            return direction === 'desc' ? cmp : -cmp;
        });
    } else if (column === 'score') {
        entries.sort((a, b) => {
            const cmp = (b.p.evaluation?.score || 0) - (a.p.evaluation?.score || 0);
            return direction === 'desc' ? cmp : -cmp;
        });
    }

    const displayPref = localStorage.getItem("guoba_sidebar_display") || "score_grade";
    const ranks = (typeof window !== 'undefined' && window.userLeaderboardRanks) || {};

    entries.forEach(({ p, originalIndex }) => {
        const div = document.createElement('div');
        div.className = `char-card ${originalIndex === targetIndex ? 'active' : ''}`;
        div.dataset.originalIndex = originalIndex;
        div.onclick = () => {
            document.querySelectorAll('.char-card').forEach(c => c.classList.remove('active'));
            const roadmapBtn = document.getElementById('roadmapSidebarBtn');
            if (roadmapBtn) roadmapBtn.classList.remove('active');
            div.classList.add('active');
            if (typeof onSelectChar === 'function') {
                onSelectChar(originalIndex);
            } else if (typeof window.renderShowcase === 'function') {
                window.renderShowcase(originalIndex);
            }
        };

        const score = p.evaluation?.score || 0;
        const gradeLetter = p.evaluation?.grade?.letter || '?';
        const gradeColor = p.evaluation?.grade?.color || 'var(--text-always-white)';
        const lbId = p.activeBuild ? (p.activeBuild.leaderboard_id || p.activeBuild.key) : null;
        const rankInfo = lbId ? ranks[lbId] : null;
        let topText = '';
        if (rankInfo) {
            if (rankInfo.total > 0 && rankInfo.rank > 0) {
                const pctStr = (typeof window !== 'undefined' && window.formatTopPercentage) ? window.formatTopPercentage(rankInfo.rank, rankInfo.total) : rankInfo.percentage;
                topText = `Top ${pctStr}%`;
            } else {
                topText = '-';
            }
        }

        let infoHTML = '';
        if (displayPref === "top_percent") {
            infoHTML = `<p style="color:var(--text-primary); font-size:14px;">${topText || '...'}</p>`;
        } else if (displayPref === "both") {
            infoHTML = `
                <div style="display: flex; flex-direction: column; align-items: flex-start; line-height: 1.1; width: 100%; gap: 3px;">
                    <div style="display: flex; gap: 4px;">
                        <span style="color:${gradeColor}; font-size:13px;">${score}</span>
                        <span style="color:${gradeColor}; font-size:13px;">(${gradeLetter})</span>
                    </div>
                    <span style="color:var(--text-muted); font-size:10px; align-self: flex-end;">${topText || '...'}</span>
                </div>
            `;
        } else {
            // Default "score_grade"
            infoHTML = `
                <p style="color:${gradeColor};">${score} </p>
                <p style="color:${gradeColor};">(${gradeLetter})</p>
            `;
        }

        div.innerHTML = `
            <img alt="" src="${p.image}" class="char-card-avatar">
            <div class="char-card-container">
                <p class="char-card-name">${p.nom}</p>
                <div class="char-card-info" data-char-index="${originalIndex}">
                    ${infoHTML}
                </div>
            </div>`;
        list.appendChild(div);
    });
}
