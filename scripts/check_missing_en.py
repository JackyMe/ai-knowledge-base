import os
import glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

all_html = glob.glob(os.path.join(ROOT, "**/*.html"), recursive=True)
all_en = set(glob.glob(os.path.join(ROOT, "**/*.en.html"), recursive=True))

missing_en = []
for h in sorted(all_html):
    if h.endswith(".en.html"):
        continue
    rel = os.path.relpath(h, ROOT)
    en_equiv = h[:-5] + ".en.html"
    if en_equiv not in all_en:
        missing_en.append(rel)

print(f"Total HTML files without .en.html: {len(missing_en)}")
for m in missing_en:
    print(f" - {m}")
