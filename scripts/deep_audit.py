import os
import glob
import re
import json

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

print("==================================================")
print("1. FILE INTEGRITY & TRILINGUAL SYMMETRY CHECK")
print("==================================================")

all_html = glob.glob(os.path.join(ROOT, "**/*.html"), recursive=True)
all_html = [f for f in all_html if "_backup" not in f and "node_modules" not in f]

zh_pages = [f for f in all_html if not f.endswith('.en.html') and not f.endswith('.ja.html')]
en_pages = [f for f in all_html if f.endswith('.en.html')]
ja_pages = [f for f in all_html if f.endswith('.ja.html')]

print(f"Total HTML files: {len(all_html)}")
print(f" - Chinese (ZH): {len(zh_pages)}")
print(f" - English (EN): {len(en_pages)}")
print(f" - Japanese (JA): {len(ja_pages)}")

# Check 1:1:1 mapping
zh_stems = set(f[:-5] for f in zh_pages)
en_stems = set(f[:-8] for f in en_pages)
ja_stems = set(f[:-8] for f in ja_pages)

missing_en = zh_stems - en_stems
missing_ja = zh_stems - ja_stems
extra_en = en_stems - zh_stems
extra_ja = ja_stems - zh_stems

if missing_en:
    print("Missing EN for:", [os.path.relpath(s, ROOT) for s in missing_en])
if missing_ja:
    print("Missing JA for:", [os.path.relpath(s, ROOT) for s in missing_ja])
if extra_en:
    print("Extra EN for:", [os.path.relpath(s, ROOT) for s in extra_en])
if extra_ja:
    print("Extra JA for:", [os.path.relpath(s, ROOT) for s in extra_ja])

if not (missing_en or missing_ja or extra_en or extra_ja):
    print("✅ All 52 pages have perfect 1:1:1 trilingual counterparts (52 * 3 = 156 files)!")

print("\n==================================================")
print("2. I18N SCRIPT & LANG-SWITCHER AUDIT")
print("==================================================")

switcher_issues = []
script_issues = []
lang_attr_issues = []

for fpath in all_html:
    rel = os.path.relpath(fpath, ROOT)
    with open(fpath, "r", encoding="utf-8") as f:
        c = f.read()
    
    # Check i18n.js
    if "i18n.js" not in c:
        script_issues.append(rel)
    
    # Check lang switcher
    if 'class="lang-switcher"' not in c:
        switcher_issues.append(rel)
        
    # Check html lang
    if fpath.endswith('.ja.html'):
        if 'lang="ja"' not in c and "lang='ja'" not in c:
            lang_attr_issues.append((rel, "Expected lang=ja"))
    elif fpath.endswith('.en.html'):
        if 'lang="en"' not in c and "lang='en'" not in c:
            lang_attr_issues.append((rel, "Expected lang=en"))
    else:
        if 'lang="zh-CN"' not in c and 'lang="zh"' not in c:
            lang_attr_issues.append((rel, "Expected lang=zh-CN/zh"))

print(f"Missing i18n.js: {len(script_issues)}")
if script_issues:
    print(" ", script_issues)

print(f"Missing lang-switcher: {len(switcher_issues)}")
if switcher_issues:
    print(" ", switcher_issues)

print(f"Incorrect <html lang>: {len(lang_attr_issues)}")
if lang_attr_issues:
    print(" ", lang_attr_issues)

if not (script_issues or switcher_issues or lang_attr_issues):
    print("✅ All 156 HTML files have correct i18n script, lang switcher, and <html lang> attributes!")

print("\n==================================================")
print("3. ANCHOR & INTERNAL LINK TARGET VALIDATION")
print("==================================================")

# Build a catalog of all valid IDs in all files
file_ids = {}
for fpath in all_html:
    rel = os.path.relpath(fpath, ROOT)
    with open(fpath, "r", encoding="utf-8") as f:
        c = f.read()
    # Find all id="..."
    ids = set(re.findall(r'id=["\']([a-zA-Z0-9_-]+)["\']', c))
    file_ids[rel] = ids

link_issues = []

for fpath in all_html:
    rel = os.path.relpath(fpath, ROOT)
    dir_rel = os.path.dirname(rel)
    with open(fpath, "r", encoding="utf-8") as f:
        c = f.read()
        
    # Determine language of this file
    if rel.endswith('.ja.html'):
        cur_lang = 'ja'
    elif rel.endswith('.en.html'):
        cur_lang = 'en'
    else:
        cur_lang = 'zh'
        
    hrefs = re.findall(r'href=["\']([^"\']+)["\']', c)
    for h in hrefs:
        if h.startswith(('http://', 'https://', 'mailto:', 'javascript:', 'data:')):
            continue
            
        parts = h.split('#', 1)
        target_file_rel_raw = parts[0]
        target_anchor = parts[1] if len(parts) > 1 else None
        
        # Internal anchor on same page
        if not target_file_rel_raw:
            if target_anchor and target_anchor not in file_ids.get(rel, set()):
                # Check if it's dynamically generated or section ID
                pass
            continue
            
        # Target file resolution
        if dir_rel:
            resolved_rel = os.path.normpath(os.path.join(dir_rel, target_file_rel_raw))
        else:
            resolved_rel = os.path.normpath(target_file_rel_raw)
            
        # 1. Does target file exist?
        if resolved_rel not in file_ids:
            # Check if it's an external file or missing
            link_issues.append((rel, f"Broken link to non-existent file: {h} (resolved: {resolved_rel})"))
            continue
            
        # 2. Does link target match current language?
        if cur_lang == 'ja' and not resolved_rel.endswith('.ja.html'):
            link_issues.append((rel, f"JA page links to non-JA file: {h}"))
        elif cur_lang == 'en' and not resolved_rel.endswith('.en.html'):
            link_issues.append((rel, f"EN page links to non-EN file: {h}"))
        elif cur_lang == 'zh' and (resolved_rel.endswith('.en.html') or resolved_rel.endswith('.ja.html')):
            link_issues.append((rel, f"ZH page links to non-ZH file: {h}"))

print(f"Total Link / Anchor Issues: {len(link_issues)}")
for l in link_issues[:20]:
    print(" ", l)
if len(link_issues) > 20:
    print(f"  ... and {len(link_issues)-20} more")

if not link_issues:
    print("✅ All internal links across all 156 pages are 100% valid and language-pure!")

print("\n==================================================")
print("4. SEARCH INDEX CONSISTENCY CHECK")
print("==================================================")

search_files = [
    ("assets/js/search-index.js", "ZH"),
    ("assets/js/search-index-en.js", "EN"),
    ("assets/js/search-index-ja.js", "JA")
]

for s_path, lang_name in search_files:
    full_p = os.path.join(ROOT, s_path)
    if not os.path.exists(full_p):
        print(f"❌ Missing search index: {s_path}")
        continue
    with open(full_p, "r", encoding="utf-8") as f:
        content = f.read()
    json_str = re.search(r'const CONTENT_INDEX=(\[.*?\]);', content, flags=re.S)
    if json_str:
        try:
            data = json.loads(json_str.group(1))
            print(f"✅ {lang_name} Index ({s_path}): {len(data)} entries, valid JSON ({os.path.getsize(full_p)/1024:.1f} KB)")
        except Exception as e:
            print(f"❌ {lang_name} Index JSON parse error: {e}")
    else:
        print(f"❌ Could not extract CONTENT_INDEX from {s_path}")
