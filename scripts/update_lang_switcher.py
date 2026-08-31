import glob
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
html_files = sorted(glob.glob(os.path.join(ROOT, "**/*.html"), recursive=True))

new_switcher_html = '''<div class="lang-switcher" style="display:inline-flex;align-items:center;background:var(--border-2);border-radius:14px;padding:2px;gap:2px;font-size:11px;font-weight:700;margin-right:12px;font-family:var(--font);" role="group" aria-label="Language Switcher">
  <button type="button" data-lang="zh" class="lang-btn" style="border:none;background:none;border-radius:10px;padding:2px 7px;cursor:pointer;color:var(--text-3);font-size:11px;font-weight:700;transition:.2s;line-height:1.2;font-family:inherit;">中</button>
  <button type="button" data-lang="en" class="lang-btn" style="border:none;background:none;border-radius:10px;padding:2px 7px;cursor:pointer;color:var(--text-3);font-size:11px;font-weight:700;transition:.2s;line-height:1.2;font-family:inherit;">EN</button>
  <button type="button" data-lang="ja" class="lang-btn" style="border:none;background:none;border-radius:10px;padding:2px 7px;cursor:pointer;color:var(--text-3);font-size:11px;font-weight:700;transition:.2s;line-height:1.2;font-family:inherit;">JA</button>
</div>'''

pattern = re.compile(r'<label class="lang-switch"[\s\S]*?</label>')

updated = 0
for fpath in html_files:
    if "_backup" in fpath:
        continue
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()
    
    if pattern.search(content):
        new_content = pattern.sub(new_switcher_html, content)
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(new_content)
        updated += 1
        print(f"Updated switcher in: {os.path.relpath(fpath, ROOT)}")

print(f"Total files updated with 3-way switcher: {updated}")
