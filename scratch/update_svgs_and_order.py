import re

# 1. Read the exact SVGs
with open("scratch/svg_analysis.s4.title.svg", "r") as f:
    svg_s4 = f.read().strip()

with open("scratch/svg_analysis.s5.title.svg", "r") as f:
    svg_s5 = f.read().strip()

with open("scratch/svg_analysis.s6.title.svg", "r") as f:
    svg_s6 = f.read().strip()

# 2. Update SubstatQualitySection.js (Projection idéale - S4)
with open("src/components/advice/SubstatQualitySection.js", "r") as f:
    substat_content = f.read()

# Replace headerSvg in SubstatQualitySection.js
substat_content = re.sub(
    r'const headerSvg = `.*?`;',
    f'const headerSvg = `\n        {svg_s4}\n    `;',
    substat_content,
    flags=re.DOTALL
)

with open("src/components/advice/SubstatQualitySection.js", "w") as f:
    f.write(substat_content)
print("✓ Updated SubstatQualitySection.js with full S4 SVG")

# 3. Update RollDetailsSection.js (Détails des rolls - S5)
with open("src/components/advice/RollDetailsSection.js", "r") as f:
    roll_details_content = f.read()

# Replace the svg inside <h3>
roll_details_content = re.sub(
    r'<svg width="1em" height="1em".*?</svg>',
    svg_s5,
    roll_details_content,
    flags=re.DOTALL
)

with open("src/components/advice/RollDetailsSection.js", "w") as f:
    f.write(roll_details_content)
print("✓ Updated RollDetailsSection.js with full S5 SVG")

# 4. Update RerollSection.js (Simulateur de reroll - S6)
with open("src/components/advice/RerollSection.js", "r") as f:
    reroll_content = f.read()

# Replace the svg inside <h3>
reroll_content = re.sub(
    r'<svg width="1em" height="1em".*?</svg>',
    svg_s6,
    reroll_content,
    flags=re.DOTALL
)

with open("src/components/advice/RerollSection.js", "w") as f:
    f.write(reroll_content)
print("✓ Updated RerollSection.js with full S6 SVG")

# 5. Update AdviceSection.js to move RollDetailsSection before SubstatQualitySection
with open("src/components/advice/AdviceSection.js", "r") as f:
    advice_content = f.read()

new_advice_render = """export function renderAdviceSection(persoObj, config, charIndex = 0) {
    if (!persoObj) return '';

    const effectiveConfig = config || { ...(persoObj.charConfig || {}), ...(persoObj.activeBuild || {}) };

    const dottedDivider = `
        <div style="margin: auto 10px; flex-grow: 1; width: unset; min-width: unset; background: none; border-color: var(--dotted-line); border-style: dashed; border-width: 1px 0 0; display: flex; clear: both;"></div>
    `;

    return ` 
        <div style="width: 100%;">
            <div style="display: flex; flex-direction: column; gap: 40px;">
                ${renderScoreSection(persoObj, effectiveConfig)}
                
                ${dottedDivider}
                
                ${renderCombatStatsSection(persoObj, effectiveConfig)}
                
                ${dottedDivider}
                
                ${renderProgressionSection(persoObj, effectiveConfig, charIndex)}
                
                ${dottedDivider}
                
                ${renderRollDetailsSection(persoObj)}
                
                ${dottedDivider}
                
                ${renderSubstatQualitySection(persoObj, effectiveConfig)}
                
                ${dottedDivider}
                
                ${renderRerollSection(persoObj, effectiveConfig)}
            </div>
        </div>
    `;
}"""

advice_content = re.sub(
    r'export function renderAdviceSection\(persoObj, config, charIndex = 0\) \{.*?^\}',
    new_advice_render,
    advice_content,
    flags=re.DOTALL | re.MULTILINE
)

with open("src/components/advice/AdviceSection.js", "w") as f:
    f.write(advice_content)
print("✓ Updated AdviceSection.js order (RollDetails before SubstatQuality)")
