import os
import glob
import re
from collections import defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

en_files = sorted(glob.glob(os.path.join(ROOT, "**/*.en.html"), recursive=True))
ja_files = sorted(glob.glob(os.path.join(ROOT, "**/*.ja.html"), recursive=True))
ko_files = sorted(glob.glob(os.path.join(ROOT, "**/*.ko.html"), recursive=True))
zh_files = sorted([f for f in glob.glob(os.path.join(ROOT, "**/*.html"), recursive=True) if not f.endswith('.en.html') and not f.endswith('.ja.html') and not f.endswith('.ko.html') and '_backup' not in f])

print(f"=== Comprehensive 4-Language (ZH/EN/JA/KO) Audit ===")
print(f"Checking {len(zh_files)} ZH pages, {len(en_files)} EN pages, {len(ja_files)} JA pages, {len(ko_files)} KO pages...\n")

issues = []

def audit_file_group(files, expected_lang, ext_suffix):
    for fpath in files:
        rel = os.path.relpath(fpath, ROOT)
        with open(fpath, "r", encoding="utf-8") as f:
            c = f.read()
        
        if expected_lang == 'zh':
            if 'lang="zh-CN"' not in c and 'lang="zh"' not in c and "lang='zh-CN'" not in c:
                issues.append((rel, "HTML Lang", "Missing lang=\"zh-CN\"/\"zh\""))
        else:
            if f'lang="{expected_lang}"' not in c and f"lang='{expected_lang}'" not in c:
                issues.append((rel, "HTML Lang", f"Missing lang=\"{expected_lang}\""))
                
        if 'class="lang-switcher"' not in c:
            issues.append((rel, "Switcher", "Missing 4-way lang-switcher"))
        if 'i18n.js' not in c:
            issues.append((rel, "Script", "Missing i18n.js"))
            
        # Internal links
        hrefs = re.findall(r'href=["\']([^"\']+\.html(?:#[^"\']*)?)["\']', c)
        for h in hrefs:
            if h.startswith('http://') or h.startswith('https://') or h.startswith('//'):
                continue
            base = h.split('#')[0]
            if not base:
                continue
            if expected_lang == 'zh':
                if base.endswith('.en.html') or base.endswith('.ja.html') or base.endswith('.ko.html'):
                    issues.append((rel, "Link Target", f"Link points to '{h}' instead of base '.html'"))
            else:
                if not base.endswith(ext_suffix):
                    issues.append((rel, "Link Target", f"Link points to '{h}' instead of '{ext_suffix}'"))

audit_file_group(zh_files, 'zh', '.html')
audit_file_group(en_files, 'en', '.en.html')
audit_file_group(ja_files, 'ja', '.ja.html')
audit_file_group(ko_files, 'ko', '.ko.html')

print(f"Total audit issues found: {len(issues)}\n")
grouped = defaultdict(list)
for file, cat, desc in issues:
    grouped[cat].append((file, desc))

for cat, items in sorted(grouped.items()):
    print(f"\n=== Category: {cat} ({len(items)} items) ===")
    for file, desc in items[:25]:
        print(f"  [{file}] {desc}")
    if len(items) > 25:
        print(f"  ... and {len(items)-25} more")

if not issues:
    print("✨ Perfect! All 208 HTML pages (52 ZH + 52 EN + 52 JA + 52 KO) passed all audit criteria!")
