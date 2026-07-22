#!/usr/bin/env python3
"""扫描 topics/*.html,把每个 <section id> 的正文文本抽成搜索索引。
生成 assets/js/search-index.js,供 index.html 的全站搜索做内容级匹配。

改了任意 topics/*.html 的正文后,重新运行一次:
    python3 scripts/build-search-index.py
"""
import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TOPICS_DIR = ROOT / "topics"
OUT_FILE = ROOT / "assets" / "js" / "search-index.js"

SECTION_RE = re.compile(r'<section id="([a-zA-Z0-9_-]+)">(.*?)</section>', re.S)
H2_RE = re.compile(r'<h2[^>]*>(.*?)</h2>', re.S)
TAG_RE = re.compile(r'<[^>]+>')
WS_RE = re.compile(r'\s+')

MAX_TEXT_LEN = 8000  # 单章节正文安全上限(全站章节实测最长约 7900 字符),正常不会触发


def strip_tags(raw: str) -> str:
    text = TAG_RE.sub(" ", raw)
    text = html.unescape(text)
    return WS_RE.sub(" ", text).strip()


def extract_sections(html_path: Path):
    raw = html_path.read_text(encoding="utf-8")
    out = []
    for m in SECTION_RE.finditer(raw):
        sec_id, body = m.group(1), m.group(2)
        h2m = H2_RE.search(body)
        label = strip_tags(h2m.group(1)) if h2m else sec_id
        text = strip_tags(body)
        if len(text) > MAX_TEXT_LEN:
            text = text[:MAX_TEXT_LEN]
        out.append({"id": sec_id, "label": label, "text": text})
    return out


def main():
    entries = []
    for f in sorted(TOPICS_DIR.glob("*.html")):
        href = f"topics/{f.name}"
        for sec in extract_sections(f):
            if not sec["text"]:
                continue
            entries.append({"href": href, **sec})

    js = (
        "/* 自动生成,勿手改。改了 topics/*.html 正文后重跑:\n"
        "   python3 scripts/build-search-index.py */\n"
        "const CONTENT_INDEX=" + json.dumps(entries, ensure_ascii=False, separators=(",", ":")) + ";\n"
    )
    OUT_FILE.write_text(js, encoding="utf-8")
    print(f"写入 {OUT_FILE.relative_to(ROOT)}:{len(entries)} 个章节条目,{OUT_FILE.stat().st_size/1024:.1f} KB")


if __name__ == "__main__":
    main()
