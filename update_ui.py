import os
import glob
import re

html_files = glob.glob("**/*.html", recursive=True)

old_button_pattern = re.compile(r'<button id="lang-toggle".*?>.*?</button>')

new_slider_html = '''<label class="lang-switch" style="display:inline-flex;align-items:center;cursor:pointer;margin-right:12px;position:relative;" title="Toggle Language">
  <input type="checkbox" id="lang-toggle-cb" style="appearance:none;position:absolute;width:100%;height:100%;cursor:pointer;opacity:0;z-index:2;margin:0;">
  <div style="width:52px;height:24px;background:var(--border-2);border-radius:12px;position:relative;transition:.3s;display:flex;align-items:center;justify-content:space-between;padding:0 6px;font-size:10px;font-weight:700;color:var(--text-3);font-family:var(--font);">
    <span style="z-index:0">中</span><span style="z-index:0">EN</span>
    <div class="knob" style="position:absolute;top:2px;left:2px;width:20px;height:20px;background:#fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.1);transition:transform .3s;z-index:1;"></div>
  </div>
</label>'''

for filepath in html_files:
    if "node_modules" in filepath or ".git" in filepath:
        continue
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    if old_button_pattern.search(content):
        content = old_button_pattern.sub(new_slider_html, content)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated {filepath}")

print("UI update complete.")
