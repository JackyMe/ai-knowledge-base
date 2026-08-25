import os
import glob
import re

en_html_files = glob.glob("**/*.en.html", recursive=True) + glob.glob("**/*.en.js", recursive=True)
zh_pattern = re.compile(r'[\u4e00-\u9fff]')

total_misses = 0

for filepath in en_html_files:
    if "node_modules" in filepath or ".git" in filepath:
        continue
    with open(filepath, "r", encoding="utf-8") as f:
        lines = f.readlines()
    
    file_misses = 0
    for i, line in enumerate(lines):
        if zh_pattern.search(line):
            # Skip if it's inside i18n logic where we explicitly write '中'
            if '<span>中</span>' in line or 'toggleBtn.textContent' in line or "切换至中文" in line:
                continue
            if 'lang-toggle' in line and '>中<' in line:
                continue
            print(f"[{filepath}:{i+1}] {line.strip()[:100]}")
            file_misses += 1
            total_misses += 1

print(f"\nTotal lines with untranslated Chinese: {total_misses}")
