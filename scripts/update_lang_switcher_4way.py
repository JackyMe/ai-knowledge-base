import glob
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
all_html = glob.glob(os.path.join(ROOT, "**/*.html"), recursive=True)
all_html = [f for f in all_html if "_backup" not in f and "node_modules" not in f]

NEW_SWITCHER = """<div class="lang-switcher" style="display:inline-flex;align-items:center;background:var(--border-2);border-radius:14px;padding:2px;gap:2px;font-size:11px;font-weight:700;margin-right:12px;font-family:var(--font);" role="group" aria-label="Language Switcher">
      <button type="button" data-lang="zh" class="lang-btn" style="border:none;background:none;border-radius:10px;padding:2px 7px;cursor:pointer;color:var(--text-3);font-size:11px;font-weight:700;transition:.2s;line-height:1.2;font-family:inherit;">中</button>
      <button type="button" data-lang="en" class="lang-btn" style="border:none;background:none;border-radius:10px;padding:2px 7px;cursor:pointer;color:var(--text-3);font-size:11px;font-weight:700;transition:.2s;line-height:1.2;font-family:inherit;">EN</button>
      <button type="button" data-lang="ja" class="lang-btn" style="border:none;background:none;border-radius:10px;padding:2px 7px;cursor:pointer;color:var(--text-3);font-size:11px;font-weight:700;transition:.2s;line-height:1.2;font-family:inherit;">JA</button>
      <button type="button" data-lang="ko" class="lang-btn" style="border:none;background:none;border-radius:10px;padding:2px 7px;cursor:pointer;color:var(--text-3);font-size:11px;font-weight:700;transition:.2s;line-height:1.2;font-family:inherit;">KO</button>
    </div>"""

updated_count = 0

for fpath in all_html:
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()

    # Pattern for existing 3-way or 2-way lang-switcher
    pattern = re.compile(r'<div class="lang-switcher".*?</div>', flags=re.S)
    if pattern.search(content):
        new_content = pattern.sub(NEW_SWITCHER, content, count=1)
        if new_content != content:
            with open(fpath, "w", encoding="utf-8") as f:
                f.write(new_content)
            updated_count += 1

print(f"Updated 4-way language switcher in {updated_count} files.")
