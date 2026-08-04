// src/components/advice/ProgressionSection.js
import { t } from '../../scripts/i18n.js';
import { renderLevelAdvice, renderWeaponAdvice } from './ProgressionAdvice.js';
import { renderTalentAdvice } from './TalentAdvice.js';
import { renderMainStatsAdvice } from './MainStatsAdvice.js';
import { renderMetaSetsAdvice } from './MetaSetsAdvice.js';
import { renderSetForcingAdvice } from './SetForcingAdvice.js';
import { renderPrioritiesAdvice } from './PrioritiesAdvice.js';
import { renderIdealPiecesAdvice } from './IdealPiecesAdvice.js';
import { renderCrossCheckAdvice } from './CrossCheckAdvice.js';

export function renderProgressionSection(persoObj, config, charIndex = 0) {
    if (!persoObj) return '';

    const sectionSvg = `
        <svg width="1em" height="1em" fill="var(--text-always-white)" aria-hidden="true" style="margin-bottom: 4px;" viewBox="0 0 827 754" xmlns="http://www.w3.org/2000/svg">
            <path d="M809.453 621.77C809.42 621.776 809.386 621.78 809.352 621.78H494.302C494.098 621.78 493.892 621.783 493.686 621.79L494.302 621.78H809.352L809.453 621.77Z" />
            <path d="M516.366 94.2002C543.104 89.196 578.89 86.7057 623.411 87.0322V261.93C623.411 263.163 623.574 265.105 624.502 267.271L624.506 267.278L624.509 267.286C627.3 273.775 633.434 277.869 640.271 277.869C644.517 277.869 648.684 276.26 651.859 273.259L687.471 239.613L725.277 265.187C734.135 271.179 746.365 267.604 750.573 257.258C750.599 257.195 750.625 257.132 750.649 257.069C750.655 257.056 750.662 257.042 750.667 257.028L750.666 257.027C751.502 254.904 751.602 253.058 751.602 252.09V93.834C768.961 95.2766 785.817 96.6407 796.852 97.6162V608.779H494.302C483.963 608.779 473.685 613.928 466.071 618.668V115C468.757 111.59 473.751 107.719 482.235 103.968C490.777 100.191 502.094 96.8713 516.366 94.2002Z" />
            <path d="M259.201 74.0049C347.079 74.086 401.658 85.5004 418.364 107.26C419.164 108.3 419.874 109.35 420.494 110.439C420.634 110.679 420.794 110.9 420.914 111.14V643.82C420.914 644.116 420.672 644.317 420.417 644.318C420.672 644.316 420.913 644.115 420.913 643.819L420.914 111.14C420.794 110.9 420.634 110.679 420.494 110.439C419.874 109.35 419.164 108.3 418.364 107.26C401.658 85.5006 347.078 74.0861 259.201 74.0049Z" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M241.396 87.1367C290.199 86.3788 329.067 88.8567 357.618 94.2002C371.89 96.8713 383.207 100.191 391.749 103.968C400.234 107.719 405.227 111.59 407.913 115V618.668C400.3 613.928 390.022 608.779 379.683 608.779H88.1328V97.4033C99.1881 96.1598 115.98 94.3944 136.295 92.668L237.966 87.1943L241.396 87.1367ZM255.372 128.07C252.915 121.31 243.355 121.31 240.897 128.07L213.95 202.208C213.172 204.35 211.484 206.037 209.343 206.815L135.205 233.762C128.445 236.219 128.445 245.78 135.205 248.237L209.343 275.185C211.484 275.963 213.172 277.65 213.95 279.792L240.897 353.93C243.355 360.69 252.915 360.69 255.372 353.93L282.319 279.792C283.098 277.65 284.785 275.963 286.927 275.185L361.064 248.237C367.825 245.78 367.825 236.219 361.064 233.762L286.927 206.815C284.785 206.037 283.098 204.35 282.319 202.208L255.372 128.07Z" />
            <path d="M476.133 674.5C462.933 684.5 444.633 686.667 437.133 686.5V686.501C429.643 686.668 411.369 684.501 398.187 674.501C388.7 667.304 395.191 666.501 376.717 666.501C358.242 666.501 130.559 669.001 114.581 667.001C110.087 666.439 95.1078 651.001 87.6183 644.501C82.2036 639.802 78.8278 636.927 77.4908 635.801C77.2639 635.61 77.1328 635.33 77.1328 635.033V630.501C77.1328 629.949 77.5805 629.501 78.1328 629.501H376.891C378.435 629.501 379.981 629.63 381.469 630.046C389.538 632.299 406.168 639.717 423.152 656.001C424.65 657.437 428.645 657.001 428.645 647.501V113.5C429.477 113 432.339 112 437.133 112C441.933 112 444.799 113 445.633 113.5V647.5C445.633 657 449.633 657.436 451.133 656C468.145 639.712 484.802 632.295 492.88 630.043C494.366 629.629 495.91 629.5 497.452 629.5H796.633C797.185 629.5 797.633 629.948 797.633 630.5V635.032C797.633 635.328 797.501 635.609 797.274 635.8C795.935 636.926 792.555 639.801 787.133 644.5C779.633 651 764.633 666.438 760.133 667C744.133 669 516.133 666.5 497.633 666.5C479.133 666.5 485.633 667.303 476.133 674.5Z" />
        </svg>
    `;

    return `
        <div class="advice-section-container" style="margin-bottom: 40px;">
            <h3 style="color:var(--text-primary); font-size:24px; margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
                ${sectionSvg}
                ${t('analysis.s3.title')}
            </h3>
            <p style="border-left: 3px solid var(--text-grey); padding-left: 12px; color: var(--text-grey); font-size: 16px; margin-bottom: 24px;">
                ${t('analysis.s3.desc')}
            </p>
            
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:20px;">
                <div style="grid-column: 1 / -1; margin-top: 10px; margin-bottom: -5px;">
                    <p style="font-size:12px; color:var(--text-grey); text-transform:uppercase; letter-spacing:0.05em; margin:0;">${t('analysis.s3.p1.title')}</p>
                </div>
                
                ${renderLevelAdvice(persoObj)}
                ${renderWeaponAdvice(persoObj)}
                ${renderTalentAdvice(persoObj, config)}
                ${renderMainStatsAdvice(persoObj, config)}
                ${renderMetaSetsAdvice(persoObj, config)}
                ${renderSetForcingAdvice(persoObj, config)}
                ${renderPrioritiesAdvice(persoObj)}
                
                ${renderCrossCheckAdvice(charIndex)}
            </div>
            
            ${renderIdealPiecesAdvice(persoObj, config)}
        </div>
    `;
}
