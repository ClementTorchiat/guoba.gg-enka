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
        div.innerHTML = `
            <img alt="" src="${p.image}" class="char-card-avatar">
            <div class="char-card-container">
                <p class="char-card-name">${p.nom}</p>
                <div class="char-card-info">
                    <p style="color:${p.evaluation?.grade?.color || '#fff'};">${p.evaluation?.score || 0} </p>
                    <p style="color:${p.evaluation?.grade?.color || '#fff'};">(${p.evaluation?.grade?.letter || '?'})</p>
                </div>
            </div>`;
        list.appendChild(div);
    });
}
