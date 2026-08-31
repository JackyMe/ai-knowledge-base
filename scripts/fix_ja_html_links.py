import glob
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ja_html_files = glob.glob(os.path.join(ROOT, "**/*.ja.html"), recursive=True)

def fix_link(m):
    prefix = m.group(1)  # href="
    url = m.group(2)     # link target
    quote = m.group(3)   # "
    
    if url.startswith("http://") or url.startswith("https://") or url.startswith("mailto:") or url.startswith("#") or url.startswith("javascript:"):
        return m.group(0)
    
    parts = url.split("#", 1)
    base = parts[0]
    hash_part = f"#{parts[1]}" if len(parts) > 1 else ""
    
    if base.endswith(".html") and not base.endswith(".ja.html"):
        # Strip .en.html or .html
        clean_base = base.replace(".en.html", ".html")[:-5]
        new_base = clean_base + ".ja.html"
        return f"{prefix}{new_base}{hash_part}{quote}"
    return m.group(0)

total_updated = 0
for fpath in ja_html_files:
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()
    
    new_content = re.sub(r'(href=["\'])([^"\']+)(["\'])', fix_link, content)
    if new_content != content:
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(new_content)
        total_updated += 1
        print(f"Updated links in: {os.path.relpath(fpath, ROOT)}")

print(f"Total JA files updated: {total_updated}")
