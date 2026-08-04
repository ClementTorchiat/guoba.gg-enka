import xml.etree.ElementTree as ET

for key in ['analysis.s4.title', 'analysis.s5.title', 'analysis.s6.title']:
    with open(f"scratch/svg_{key}.svg", "r") as f:
        content = f.read()
    try:
        ET.fromstring(content)
        print(f"✓ {key} is valid XML! Length: {len(content)}")
    except Exception as e:
        print(f"✗ {key} XML parsing error: {e}")
