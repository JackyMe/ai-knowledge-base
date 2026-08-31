import glob
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
docker_files = sorted(glob.glob(os.path.join(ROOT, "topics/docker/*.html")))

slider_html = '''<label class="lang-switch" style="display:inline-flex;align-items:center;cursor:pointer;margin-right:12px;position:relative;" title="Toggle Language">
      <input type="checkbox" id="lang-toggle-cb" style="appearance:none;position:absolute;width:100%;height:100%;cursor:pointer;opacity:0;z-index:2;margin:0;">
      <div style="width:52px;height:24px;background:var(--border-2);border-radius:12px;position:relative;transition:.3s;display:flex;align-items:center;justify-content:space-between;padding:0 6px;font-size:10px;font-weight:700;color:var(--text-3);font-family:var(--font);">
        <span style="z-index:0">中</span><span style="z-index:0">EN</span>
        <div class="knob" style="position:absolute;top:2px;left:2px;width:20px;height:20px;background:#fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.1);transition:transform .3s;z-index:1;"></div>
      </div>
    </label>'''

updated_count = 0
for fpath in docker_files:
    if fpath.endswith(".en.html"):
        continue
    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Add i18n.js in head if missing
    if "i18n.js" not in content:
        content = content.replace("</head>", "  <script src=\"../../assets/js/i18n.js\"></script>\n</head>")

    # 2. Add lang switch in topbar-right if missing
    if 'id="lang-toggle-cb"' not in content:
        # replace <div class="topbar-right">
        content = re.sub(r'(<div class="topbar-right">)', r'\1\n    ' + slider_html, content)

    with open(fpath, "w", encoding="utf-8") as f:
        f.write(content)
    updated_count += 1

print(f"Updated {updated_count} Docker Chinese files with i18n script and slider.")
