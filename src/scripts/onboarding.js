// src/scripts/onboarding.js

let obCurrentStep = 0;
let obAnimating = false;

export function obRender(direction = 'right') {
    const t = window.t || ((k) => k);
    const OB_STEPS = t('ob.steps') || [];
    const OB_TOTAL = OB_STEPS.length;
    if (OB_TOTAL === 0) return;

    const step = OB_STEPS[obCurrentStep];
    if (!step) return;

    const imageHTML = step.placeholder
        ? `<div class="ob-image-zone">
           <div class="ob-image-placeholder">
               <span>${t('ob.screenshot')}</span>
           </div>
       </div>`
        : `<div class="ob-image-zone">
           <img src="${step.image}" alt="Step ${obCurrentStep + 1}" loading="lazy">
       </div>`;

    const bodyEl = document.getElementById('ob-body');
    if (bodyEl) {
        bodyEl.innerHTML = `
            <div class="ob-step-content slide-in-${direction}">
                <h2 class="ob-title">${step.title}</h2>
                <div class="ob-text">${step.html}</div>
                ${imageHTML}
            </div>
        `;
        bodyEl.scrollTop = 0;
    }

    const fillEl = document.getElementById('ob-progress-fill');
    if (fillEl) fillEl.style.width = ((obCurrentStep + 1) / OB_TOTAL * 100) + '%';

    const labelEl = document.getElementById('ob-step-label');
    if (labelEl) labelEl.textContent = t('ob.step', obCurrentStep + 1, OB_TOTAL);

    const dotsEl = document.getElementById('ob-dots');
    if (dotsEl) {
        dotsEl.innerHTML = '';
        for (let i = 0; i < OB_TOTAL; i++) {
            const d = document.createElement('span');
            d.className = 'ob-dot' + (i === obCurrentStep ? ' active' : '');
            dotsEl.appendChild(d);
        }
    }

    const prev = document.getElementById('ob-prev-btn');
    const next = document.getElementById('ob-next-btn');
    if (prev) prev.disabled = obCurrentStep === 0;
    if (next) {
        if (obCurrentStep === OB_TOTAL - 1) {
            next.innerHTML = `${t('ob.finish')} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 197.48 157.14" width="11" height="13" fill="#0b0f19" aria-hidden="true">
                                                  <path d="M39.09,46.78l58.65,45.71c.19,.15,.47,.14,.65-.03L196.63,.14c.43-.4,1.07,.13,.77,.63L100.98,156.91c-.16,.25-.5,.31-.73,.13L22.26,96.38c-.11-.08-.25-.12-.38-.1L.58,99.55c-.44,.07-.74-.43-.48-.79L38.38,46.88c.17-.23,.49-.27,.71-.1Z"/>
                                                </svg>`;
            next.classList.add('ob-final');
        } else {
            next.innerHTML = `${t('ob.next')} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.62 196.95" width="11" height="13" fill="#0b0f19" aria-hidden="true">
                        <g transform="translate(122.62, 0) scale(-1, 1)">
                            <rect x="66.6" y="76.69" width="43.58" height="43.58" rx=".5" ry=".5" transform="translate(-43.75 91.35) rotate(-45)"/>
                            <path d="M98.81,.15l23.66,23.66c.2,.2,.2,.52,0,.72l-24.07,24.07-49.52,49.52c-.2,.2-.2,.52,0,.72l49.52,49.52,24.07,24.07c.2,.2,.2,.52,0,.72l-23.65,23.65c-.22,.22-.59,.19-.77-.06-12.22-17.14-28.08-36.67-48.36-56.48C32.39,123.36,15.44,109.74,.21,98.88c-.28-.2-.28-.6,0-.81,15.74-11.75,33.05-26.17,50.74-43.69C70.05,35.46,85.58,16.91,98.04,.2c.18-.25,.54-.27,.76-.05h0Z"/>
                        </g>
                    </svg>`;
            next.classList.remove('ob-final');
        }
    }
}

export function obNext() {
    const t = window.t || ((k) => k);
    const OB_STEPS = t('ob.steps') || [];
    const OB_TOTAL = OB_STEPS.length;
    if (obAnimating) return;
    if (obCurrentStep === OB_TOTAL - 1) { closeOnboarding(); return; }
    obAnimating = true;
    obCurrentStep++;
    obRender('right');
    setTimeout(() => { obAnimating = false; }, 380);
}

export function obPrev() {
    if (obAnimating || obCurrentStep === 0) return;
    obAnimating = true;
    obCurrentStep--;
    obRender('left');
    setTimeout(() => { obAnimating = false; }, 380);
}

export function openOnboarding(forceStep = 0) {
    obCurrentStep = forceStep;
    obRender('right');
    const modal = document.getElementById('onboardingModal');
    if (modal) modal.classList.add('visible');
    document.body.style.overflow = 'hidden';
}

export function closeOnboarding() {
    const modal = document.getElementById('onboardingModal');
    if (modal) modal.classList.remove('visible');
    document.body.style.overflow = '';
    localStorage.setItem('guoba_onboarding_done', '1');
}

export function openNotice() { openOnboarding(0); }
export function closeNotice() { closeOnboarding(); }

if (typeof window !== 'undefined') {
    window.obRender = obRender;
    window.obNext = obNext;
    window.obPrev = obPrev;
    window.openOnboarding = openOnboarding;
    window.closeOnboarding = closeOnboarding;
    window.openNotice = openNotice;
    window.closeNotice = closeNotice;

    document.addEventListener('DOMContentLoaded', () => {
        if (!localStorage.getItem('guoba_onboarding_done')) {
            setTimeout(() => openOnboarding(), 400);
        }
    });

    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('onboardingModal');
        if (!modal || !modal.classList.contains('visible')) return;
        if (e.key === 'Escape') closeOnboarding();
        if (e.key === 'ArrowRight') obNext();
        if (e.key === 'ArrowLeft') obPrev();
    });
}
