import glob
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
topic_files = sorted(glob.glob(os.path.join(ROOT, "topics/*.en.html")))

for fpath in topic_files:
    rel = os.path.relpath(fpath, ROOT)
    with open(fpath, "r", encoding="utf-8") as f:
        c = f.read()
    
    title = re.search(r'<title>(.*?)</title>', c)
    h1 = re.search(r'<h1[^>]*>(.*?)</h1>', c, flags=re.S)
    
    # Strip HTML tags
    t_clean = title.group(1) if title else "NO TITLE"
    h1_clean = re.sub(r'<[^>]+>', '', h1.group(1)).strip() if h1 else "NO H1"
    
    print(f"[{rel}]\n  Title: {t_clean}\n  H1: {h1_clean}\n")
