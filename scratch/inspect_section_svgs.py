import subprocess
import re

content = subprocess.check_output(['git', 'show', '8578a36:script.js'], text=True)

# Find all headings with SVGs
matches = re.finditer(r'(<h3[^>]*>.*?<svg[^>]*>.*?</svg>.*?\${t\(\'([^\']+)\'\)}.*?</h3>)', content, re.DOTALL)

for m in matches:
    full_h3 = m.group(1)
    translation_key = m.group(2)
    svg_match = re.search(r'(<svg[^>]*>.*?</svg>)', full_h3, re.DOTALL)
    svg = svg_match.group(1) if svg_match else "NO SVG"
    print(f"Key: {translation_key} | SVG length: {len(svg)} chars")
    # Save svg
    with open(f"scratch/svg_{translation_key}.svg", "w") as f:
        f.write(svg)
