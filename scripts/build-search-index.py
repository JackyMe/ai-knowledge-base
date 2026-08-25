#!/usr/bin/env python3
"""扫描 topics/*.html 以及子目录如 topics/*/*.html,把每个章节的正文文本抽成搜索索引。
分别生成 search-index.js 和 search-index-en.js
"""
import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TOPICS_DIR = ROOT / "topics"
OUT_FILE_CN = ROOT / "assets" / "js" / "search-index.js"
OUT_FILE_EN = ROOT / "assets" / "js" / "search-index-en.js"

SECTION_RE = re.compile(r'<section id="([a-zA-Z0-9_-]+)">(.*?)</section>', re.S)
H2_RE = re.compile(r'<h2[^>]*>(.*?)</h2>', re.S)
H1_RE = re.compile(r'<h1[^>]*>(.*?)</h1>', re.S)
MAIN_RE = re.compile(r'<main[^>]*>(.*?)</main>', re.S)
TAG_RE = re.compile(r'<[^>]+>')
WS_RE = re.compile(r'\s+')

MAX_TEXT_LEN = 8000  # 单章节正文安全上限

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

def build_index(is_en: bool):
    entries = []
    
    # 扫描单页 topic html
    for f in sorted(TOPICS_DIR.glob("*.html")):
        if (is_en and not f.name.endswith('.en.html')) or (not is_en and f.name.endswith('.en.html')):
            continue
            
        href = f"topics/{f.name}"
        for sec in extract_sections(f):
            if not sec["text"]:
                continue
            entries.append({"href": href, **sec})

    # 扫描子目录 (如 topics/docker/*.html)
    for sub_html in sorted(TOPICS_DIR.glob("*/*.html")):
        if (is_en and not sub_html.name.endswith('.en.html')) or (not is_en and sub_html.name.endswith('.en.html')):
            continue
            
        rel_href = f"topics/{sub_html.parent.name}/{sub_html.name}"
        raw = sub_html.read_text(encoding="utf-8")
        h1m = H1_RE.search(raw)
        mainm = MAIN_RE.search(raw)
        if mainm:
            label = strip_tags(h1m.group(1)) if h1m else sub_html.stem
            body_text = strip_tags(mainm.group(1))
            if len(body_text) > MAX_TEXT_LEN:
                body_text = body_text[:MAX_TEXT_LEN]
            entries.append({
                "href": rel_href,
                "id": "",
                "label": label,
                "text": body_text
            })

    out_file = OUT_FILE_EN if is_en else OUT_FILE_CN
    js = (
        "/* 自动生成,勿手改。 */\n"
        "const CONTENT_INDEX=" + json.dumps(entries, ensure_ascii=False, separators=(",", ":")) + ";\n"
    )
    out_file.write_text(js, encoding="utf-8")
    print(f"写入 {out_file.relative_to(ROOT)}:{len(entries)} 个章节条目,{out_file.stat().st_size/1024:.1f} KB")

def main():
    build_index(False)
    build_index(True)

if __name__ == "__main__":
    main()
