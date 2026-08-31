import glob
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
docker_files = sorted(glob.glob(os.path.join(ROOT, "topics/docker/*.html")))

for f in docker_files:
    if f.endswith(".en.html"):
        continue
    size = os.path.getsize(f)
    lines = len(open(f, "r", encoding="utf-8").readlines())
    print(f"{os.path.basename(f)}: {lines} lines, {size/1024:.1f} KB")
