import subprocess
import re

content = subprocess.check_output(['git', 'show', '29e6e0c:script.js'], text=True)

# Find all SVGs in script.js
svgs = re.findall(r'(<svg[^>]*>.*?</svg>)', content, re.DOTALL)

print(f"Found {len(svgs)} SVGs in 29e6e0c:script.js")

for i, svg in enumerate(svgs):
    with open(f"scratch/svg_{i+1}.svg", "w") as f:
        f.write(svg)
    # Print first line and size
    first_line = svg.split('\n')[0]
    print(f"SVG {i+1}: {first_line[:80]}... (Length: {len(svg)} chars)")
