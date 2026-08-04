// src/components/advice/RerollSection.js
import { t } from '../../scripts/i18n.js';
import { calculateRerollMetrics } from './RerollAdvice.js';

export function renderRerollSection(persoObj, config) {
    if (!persoObj || !persoObj.artefacts) return '';

    const p = persoObj;

    const rerollCards = p.artefacts.map(art => {
        const metrics = calculateRerollMetrics(art, config);
        if (!metrics) return '';

        const pieceName = t('artifact.' + art.type);

        return `
            <div style="width: 100%; background:var(--bg-panel); padding:12px; border-radius:8px; border-left: 3px solid ${metrics.badge.color}">
                <div style="display:flex; align-items:center; gap:12px; margin-bottom:10px;">
                    <img src="${art.icon}" style="width:42px; height:42px; border-radius:8px; background-color: rgba(0,0,0,0.1)" alt="">
                    <div style="display:flex; flex-direction:column; justify-content:center; gap: 3px;">
                        <p style="font-size:12px; color:var(--text-primary); font-weight:bold; overflow:hidden; text-overflow:ellipsis; margin:0;">
                            ${pieceName}
                        </p>
                        <p style="font-size:12px; color:${art.grade?.color || 'var(--text-primary)'}; opacity:0.9; margin:0;">
                            ${art.score} (${art.grade?.letter || '?'})
                        </p>
                    </div>
                </div>
                
                <div style="margin-bottom:8px;">
                    <div style="display:flex; justify-content:space-between; font-size:12px; color:var(--text-grey); margin-bottom: 4px;">
                        <p style="margin:0;">${t('analysis.s6.gainPotential')}</p>
                        <p style="color:${metrics.potential > 60 ? '#22c55e' : '#ccc'}; margin:0;">${metrics.potential}%</p>
                    </div>
                    <div style="width:100%; height:4px; background:#333; border-radius:2px;">
                        <div style="width:${metrics.potential}%; height:100%; background:linear-gradient(90deg, #3b82f6, #22c55e); border-radius:2px;"></div>
                    </div>
                </div>

                <div style="margin-bottom:12px;">
                    <div style="display:flex; justify-content:space-between; font-size:12px; color:var(--text-grey); margin-bottom: 4px;">
                        <p style="margin:0;">${t('analysis.s6.lossRisk')}</p>
                        <p style="color:${metrics.risk > 60 ? '#ff4d4d' : '#ccc'}; margin:0;">${metrics.risk}%</p>
                    </div>
                    <div style="width:100%; height:4px; background:#333; border-radius:2px;">
                        <div style="width:${metrics.risk}%; height:100%; background:linear-gradient(90deg, #f59e0b, #ff4d4d); border-radius:2px;"></div>
                    </div>
                </div>

                <p style="text-align:center; background:${metrics.badge.color}20; color:${metrics.badge.color}; padding:4px; border-radius:4px; font-size:12px; border:1px solid ${metrics.badge.color}40; margin:0;">
                    ${metrics.badge.text}
                </p>
            </div>
        `;
    }).join('');

    return `
        <div>
            <h3 style="color:var(--text-primary); font-size:24px; margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
                <svg width="1em" height="1em" fill="var(--text-always-white)" aria-hidden="true" style="margin-bottom: 4px;" viewBox="0 0 182 171" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.0645 1.08594C23.3112 1.84257 29.7244 6.67809 33.6514 11.5215C37.2843 16.0024 38.7966 20.5009 39.1836 21.8076L39.2832 22.1631L40.9121 28.5283L42.8799 28.3301L43.21 21.7598V21.7559C43.2204 21.5271 43.339 19.0575 43.2441 15.9238C43.1672 13.3828 42.9482 10.3437 42.3955 7.69531C46.6228 8.93647 54.0464 11.3693 61.0088 14.9092C65.0046 16.9408 68.8092 19.3177 71.7646 22.0146C74.7256 24.7168 76.7615 27.6732 77.3682 30.8574L78.7676 38.1934L81.9287 29.1182C85.7723 32.3671 93.9013 40.8642 96.4238 56.291C96.4467 56.4476 96.4673 56.6058 96.4893 56.7715C96.5113 56.9379 96.5348 57.1133 96.5605 57.2891C96.6389 57.8472 96.7079 58.4259 96.7783 59.0098L98.7217 59.1992C99.2843 57.4711 99.9174 55.4264 100.408 53.625C100.623 52.8382 100.81 52.0894 100.955 51.4297C102.731 53.3484 105.099 56.2924 107.618 59.6094C110.739 63.719 114.038 68.3291 116.631 72.0908C115.723 76.1862 114.917 80.8624 114.626 85.4873C112.677 84.6836 109.724 83.3589 106.271 81.4678C105.651 78.2197 103.091 76.1876 100.501 74.9414C97.9073 73.6937 95.0668 73.1216 93.4268 72.8721C93.3371 72.8005 93.2438 72.7286 93.1465 72.6484L93.1455 72.6475L91.0156 70.8975L91.0146 70.8965L89.9336 70.0088C88.6877 68.7667 87.0647 67.3076 85.1562 65.6924L84.3115 64.9824C75.1109 57.3026 59.8493 46.2576 46.9131 37.1494C40.4398 32.5917 34.5393 28.5129 30.2578 25.5732C28.1173 24.1036 26.381 22.9183 25.1797 22.1006C24.5791 21.6918 24.1118 21.3741 23.7949 21.1592C23.6369 21.052 23.5159 20.9701 23.4346 20.915C23.394 20.8876 23.3624 20.8665 23.3418 20.8525L23.3125 20.833L23.3105 20.8311L22.1455 22.4561L88.3945 72.793L88.457 72.8809L88.4619 72.8877L90.2393 75.3359L90.2402 75.3379C90.2503 75.3531 90.2602 75.3663 90.2656 75.374C90.2768 75.3897 90.2892 75.4068 90.2988 75.4199C90.3223 75.4518 90.3436 75.4806 90.3779 75.5273C90.4134 75.5757 90.4559 75.6372 90.5068 75.709C90.6837 77.2338 91.124 79.7677 92.207 82.1768C93.302 84.6124 95.1208 87.058 98.1123 88.0684C99.1693 90.1136 100.086 92.1465 100.693 93.9844C94.8014 94.2342 79.9421 95.098 70.8896 97.666C66.0998 95.3933 60.4951 91.5634 56.5264 88.6699L54.8984 87.4688C54.2511 86.9808 53.6759 86.5437 53.2012 86.1777C53.0973 86.0975 52.9979 86.0193 52.9023 85.9453L53.9717 85.2881L51.6494 84.7188C46.1424 83.3681 42.4466 80.6943 40.1006 78.2803C40.8642 78.483 41.661 78.6631 42.4668 78.7969C44.5377 79.1407 46.7817 79.206 48.6934 78.5098C50.4506 77.8696 51.745 76.6799 52.4785 74.9883C53.3563 72.9643 52.8298 71.3891 52.1621 70.4385C51.1464 68.9784 49.238 68.147 47.3037 67.6416C46.0379 67.3109 44.6611 67.0957 43.3135 66.958C44.0461 66.0672 44.55 65.1531 44.8916 64.3672C45.1713 63.7236 45.3462 63.1583 45.4521 62.749C45.5052 62.5442 45.5412 62.3771 45.5645 62.2578C45.5761 62.1982 45.585 62.1501 45.5908 62.1152C45.5937 62.0978 45.596 62.0831 45.5977 62.0723C45.5985 62.067 45.5991 62.0622 45.5996 62.0586C45.5999 62.0568 45.6004 62.0551 45.6006 62.0537V62.0498L45.6016 62.0469L45.6816 61.4668L45.4385 60.9414L45.4355 60.9336L44.7344 59.4727C37.5009 44.6303 30.455 37.6423 23.918 34.6943C17.1505 31.6427 11.1345 33.0259 6.58984 34.0547L6.58203 34.0566L6.57324 34.0586C6.13366 34.166 5.70449 34.264 5.28613 34.3516L5.27734 34.3535C4.51988 34.5192 3.69134 34.6313 2.96484 34.5869C2.22043 34.5413 1.7476 34.3424 1.49219 34.0596C1.25269 33.7918 1.08775 33.3471 1.03223 32.7275C1.01381 32.5217 1.00822 32.3089 1.01367 32.0957C2.96643 32.7526 4.71506 32.8782 6.25098 32.3193L6.25195 32.3203C8.83968 31.3803 9.87334 28.867 10.626 27.1328C10.9443 26.409 11.215 25.7943 11.5166 25.3076C11.8214 24.8159 12.0731 24.5994 12.2754 24.5176L12.2744 24.5166C13.605 23.9825 14.7654 24.2262 15.6416 24.6357C16.5328 25.0524 17.0807 25.6232 17.0811 25.623L17.0859 25.6279L17.0908 25.6338L21.834 30.6963L20.5127 23.8896C18.7687 14.9001 15.06 5.66786 13.0645 1.08594Z"/>
                </svg>
                ${t('analysis.s6.title')}
            </h3>
            <p style="border-left: 3px solid var(--text-grey); padding-left: 12px; color: var(--text-grey); font-size: 16px; margin-bottom: 24px;">${t('analysis.s6.desc')}</p>
        
            <div style="display:flex; flex-direction: row; justify-content: space-between; gap:15px;">
                ${rerollCards}
            </div>
        </div>
    `;
}
