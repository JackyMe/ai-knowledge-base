import os
import glob
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
all_html = glob.glob(os.path.join(ROOT, "**/*.html"), recursive=True)
all_html = [f for f in all_html if "_backup" not in f and "node_modules" not in f]

# Build file existence map
file_map = set(os.path.relpath(f, ROOT) for f in all_html)
# Also map CSS and JS files
for static_f in glob.glob(os.path.join(ROOT, "assets/**/*"), recursive=True):
    if os.path.isfile(static_f):
        file_map.add(os.path.relpath(static_f, ROOT))

broken_links = []
cross_lang_links = []

for fpath in all_html:
    rel = os.path.relpath(fpath, ROOT)
    dir_rel = os.path.dirname(rel)
    
    if rel.endswith('.ko.html'):
        cur_lang = 'ko'
    elif rel.endswith('.ja.html'):
        cur_lang = 'ja'
    elif rel.endswith('.en.html'):
        cur_lang = 'en'
    else:
        cur_lang = 'zh'
        
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Strip script blocks to avoid template literals
    content_no_scripts = re.sub(r'<script.*?>.*?</script>', '', content, flags=re.S)
    
    # Find all href="..." and src="..." in HTML
    links = re.findall(r'(?:href|src)=["\']([^"\']+)["\']', content_no_scripts)
    for target in links:
        if target.startswith(('http://', 'https://', 'mailto:', 'javascript:', 'data:', '#', '//')):
            continue
        if '${' in target:
            continue
            
        clean_target = target.split('#')[0]
        if not clean_target:
            continue
            
        # Resolve target path relative to current file's directory
        if dir_rel:
            resolved = os.path.normpath(os.path.join(dir_rel, clean_target))
        else:
            resolved = os.path.normpath(clean_target)
        if resolved.startswith('./'):
            resolved = resolved[2:]
        
        # 1. Does file exist?
        if resolved not in file_map:
            broken_links.append((rel, target, resolved))
            continue
            
        # 2. Check cross-language link (only for .html files)
        if resolved.endswith('.html'):
            if cur_lang == 'ko' and not resolved.endswith('.ko.html'):
                cross_lang_links.append((rel, target, resolved, "Should be .ko.html"))
            elif cur_lang == 'ja' and not resolved.endswith('.ja.html'):
                cross_lang_links.append((rel, target, resolved, "Should be .ja.html"))
            elif cur_lang == 'en' and not resolved.endswith('.en.html'):
                cross_lang_links.append((rel, target, resolved, "Should be .en.html"))
            elif cur_lang == 'zh' and (resolved.endswith('.en.html') or resolved.endswith('.ja.html') or resolved.endswith('.ko.html')):
                cross_lang_links.append((rel, target, resolved, "Should be base .html"))

print(f"=== 4-Language Static Link & Asset Validation ===")
print(f"Total HTML files checked: {len(all_html)}")
print(f"Broken Links/Assets: {len(broken_links)}")
for r, t, res in broken_links:
    print(f"  [{r}] -> '{t}' (resolved: {res})")

print(f"\nCross-Language Links: {len(cross_lang_links)}")
for r, t, res, reason in cross_lang_links:
    print(f"  [{r}] -> '{t}' ({reason})")

if not broken_links and not cross_lang_links:
    print(f"\nPASS: {len(all_html)} HTML files; no missing local files or cross-language leaks.")
else:
    raise SystemExit(1)
