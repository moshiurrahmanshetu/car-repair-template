import re

with open('service-details.html', 'r', encoding='utf-8') as f:
    content = f.read()

img_pattern = re.compile(r'<img\s+([^>]+)>', re.IGNORECASE)
for match in img_pattern.finditer(content):
    img_tag = match.group(0)
    attrs = match.group(1)
    if 'loading="lazy"' not in attrs:
        print(f"Found non-lazy image: {img_tag}")
