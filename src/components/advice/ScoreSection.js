// src/components/advice/ScoreSection.js
import { t } from '../../scripts/i18n.js';
import { generateScoreBar, calculateMaxTheoreticalScore, calculateRNGQuality } from '../../scripts/scoring.js';

export function renderScoreSection(p, config) {
    const ev = p.evaluation || { score: 0, grade: { letter: "?", color: "#888" }, totalRolls: 0, maxScore: 100 };
    const potential = calculateMaxTheoreticalScore(p, config);
    const efficiency = potential.score > 0 ? ((ev.score / potential.score) * 100).toFixed(1) : 0;

    let effColor = '#ef4444';
    if (efficiency > 70) effColor = '#eab308';
    if (efficiency > 85) effColor = '#22c55e';
    if (efficiency > 95) effColor = '#a855f7';

    const gain = (potential.score - ev.score).toFixed(1);
    const rngQuality = calculateRNGQuality(p, config).toFixed(1);

    return `
        <div style="">
            <h3 style="color:var(--text-primary); font-size:24px; margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 754.56 635.09" width="1em" height="1em" fill="var(--text-always-white)" aria-hidden="true" style="margin-bottom: 4px;">
                  <g>
                    <path d="M152.14,280.13c-45.74-14.28-136.26-1.61-146.52-.11-3.56,.51-6.01,3.71-5.57,7.27,12.14,99.94,68.85,320.92,71.26,330.28,.63,2.46,2.66,4.36,5.16,4.83,13.37,2.51,27.14,3.35,39.61,3.35,21.67,0,39.4-2.54,44.21-3.3,3.24-.51,5.62-3.38,5.53-6.67l-9.07-329.54c-.08-2.82-1.93-5.27-4.61-6.11Z"/>
                    <path d="M488.13,401.94c-12.4-1.82-29-4.27-33.88-6.82,1.17-1.49,4.93-3.63,13.95-5.28,10.92-2,25.76-2.67,40.1-3.33,13.81-.63,26.86-1.22,36.89-2.92,18.83-3.19,35.46-33.57,32.35-59.1-5.24-43.06-56.32-43.96-78.05-42.34-80.25,5.97-148.87,3.48-182.59,1.46,75.26-40.96,85.34-108.22,85.34-163.28,0-27.93-13.12-54.71-36.01-73.47-14.99-12.28-32.07-19.14-42.51-17.05-15.94,3.19-15.86,22.85-15.75,50.05,.06,14.32,.12,30.55-1.81,48.27-6.65,60.81-119.62,142.3-124.43,145.74-1.72,1.23-2.72,3.15-2.74,5.26-.1,10.25-2.33,251.52,.01,300.8,2.48,52.06,63.99,53.27,118.26,54.34,3.96,.08,7.9,.16,11.81,.25,16.02,.39,30.52,.57,43.69,.57,103.31,0,123.21-11.31,127.96-22.76,5.82-14.02-6.58-25.37-14.79-32.89-1.72-1.57-3.87-3.54-5.24-5.05,1.39-.4,3.69-.88,7.41-1.28,27.88-3.04,48.73-12.29,58.71-26.06,5.97-8.24,7.89-17.69,5.7-28.09-3.43-16.28-25.07-18.72-42.47-20.67-6.32-.71-12.86-1.45-15.25-2.67-2.02-1.03-3.14-2.91-2.98-3.53,.02-.06,2.74-6.03,29.12-5.29,29.07,.81,44.26-8.82,51.87-17.05,8.52-9.21,12.42-21.88,10.97-35.66-2.25-21.35-41.26-27.09-75.67-32.15Z"/>
                  </g>
                  <path d="M667.93,99.97c-11.92-3.68-21.92-6.5-30.45-8.96-20.22-5.8-31.34-8.96-36.1-13.72-4.76-4.76-7.92-15.88-13.72-36.1-2.45-8.48-5.33-18.52-8.96-30.45-1.98-6.41-7.87-10.75-14.56-10.75s-12.58,4.38-14.56,10.75c-3.68,11.92-6.5,21.92-8.96,30.45-5.8,20.22-8.96,31.34-13.72,36.1-4.76,4.76-15.88,7.92-36.1,13.72-8.48,2.4-18.52,5.28-30.45,8.96-6.41,1.98-10.75,7.87-10.75,14.56s4.34,12.58,10.75,14.56c11.92,3.68,21.92,6.55,30.45,8.96,20.22,5.8,31.34,8.96,36.1,13.72,4.76,4.76,7.92,15.88,13.72,36.1,2.45,8.48,5.28,18.52,8.96,30.45,1.98,6.36,7.87,10.75,14.56,10.75h0c6.69,0,12.58-4.34,14.56-10.75,3.68-11.92,6.55-21.92,8.96-30.4,5.8-20.22,9-31.34,13.72-36.1s15.88-7.92,36.1-13.72c8.48-2.45,18.52-5.33,30.45-8.96,6.41-1.98,10.75-7.87,10.75-14.56s-4.38-12.58-10.75-14.56v-.05Z"/>
                  <path d="M747.44,466.99c-7.9-2.44-14.52-4.31-20.17-5.93-13.4-3.84-20.77-5.93-23.92-9.09-3.15-3.15-5.25-10.52-9.09-23.92-1.62-5.62-3.53-12.27-5.93-20.17-1.31-4.25-5.21-7.12-9.65-7.12s-8.34,2.9-9.65,7.12c-2.44,7.9-4.31,14.52-5.93,20.17-3.84,13.4-5.93,20.77-9.09,23.92-3.15,3.15-10.52,5.25-23.92,9.09-5.62,1.59-12.27,3.5-20.17,5.93-4.25,1.31-7.12,5.21-7.12,9.65s2.87,8.34,7.12,9.65c7.9,2.44,14.52,4.34,20.17,5.93,13.4,3.84,20.77,5.93,23.92,9.09,3.15,3.15,5.25,10.52,9.09,23.92,1.62,5.62,3.5,12.27,5.93,20.17,1.31,4.22,5.21,7.12,9.65,7.12h0c4.43,0,8.34-2.87,9.65-7.12,2.44-7.9,4.34-14.52,5.93-20.14,3.84-13.4,5.96-20.77,9.09-23.92,3.12-3.15,10.52-5.25,23.92-9.09,5.62-1.62,12.27-3.53,20.17-5.93,4.25-1.31,7.12-5.21,7.12-9.65s-2.9-8.34-7.12-9.65v-.03Z"/>
                </svg>
                ${t('analysis.s1.title')}
            </h3>
            <p style="border-left: 3px solid var(--text-grey); padding-left: 12px; color: var(--text-grey); font-size: 16px; margin-bottom: 24px;">${t('analysis.s1.desc')}</p>
            ${generateScoreBar(ev.totalRolls, ev.grade.letter, potential.totalRolls)}
            
            <div style="background:var(--bg-panel); padding:16px; border-radius:8px;">   
                <div style="display:flex; justify-content:space-around; align-items:center; flex-wrap:wrap; gap:32px;">
                    <div style="text-align:left;">
                        <p style="font-size:12px; text-transform: uppercase; color:var(--text-grey); margin-bottom: 8px;">${t('analysis.s1.buildEff')}</p>
                        <p style="font-size:40px; line-height: 1; color:${effColor};">${efficiency}%</p>
                    </div>
                    <div style="text-align:left;">
                        <p style="font-size:12px; text-transform: uppercase; color:var(--text-grey); margin-bottom: 8px;">${t('analysis.s1.rngFactor')}</p>
                        <p style="font-size:40px; line-height: 1; color:${rngQuality > 85 ? '#22c55e' : (rngQuality > 75 ? '#eab308' : '#ff4d4d')}">${rngQuality}%</p>
                    </div>
                    <div style="flex:1; min-width:200px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; font-size:0.8rem;">
                            <span style="color:var(--text-grey); font-size: 12px; text-transform: uppercase;">${t('analysis.s1.maxScore')}</span>
                            <span style="font-weight:bold; color:var(--accent-gold);">${potential.score} <span style="color:#22c55e; font-size:0.7rem;">(+${gain})</span></span>
                        </div>
                        <div style="width:100%; background:#333; height:40px; border-radius:8px; position:relative;">
                            <div style="height:100%; background:var(--text-primary); width:${Math.min((ev.score / (potential.score || 100)) * 100, 100)}%; border-radius:8px; position:absolute;"></div>
                            <div style="height:100%; background:var(--accent-gold); width:100%; opacity:0.3; border-radius:8px;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
