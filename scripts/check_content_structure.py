#!/usr/bin/env python3
"""Validate registered chapters, learning paths, localized URLs and document outlines.
Run from any directory: python3 scripts/check_content_structure.py (requires Node).
"""
import json
import re
import subprocess
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parent.parent

class Outline(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.ids = set()
        self.duplicates = []
        self.sections = set()
        self.links = []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'a' and attrs.get('href'):
            self.links.append(attrs['href'])
        value = attrs.get('id')
        if value:
            if value in self.ids:
                self.duplicates.append(value)
            self.ids.add(value)
            if tag == 'section':
                self.sections.add(value)

cache = {}
def outline(href):
    if href not in cache:
        cache[href] = Outline((ROOT / href).read_text())
    return cache[href]

def check_link(href, errors, context, lang):
    url = urlsplit(href)
    if url.scheme or url.netloc:
        return
    if not (ROOT / url.path).is_file():
        errors.append(f'{context}: missing file {href}')
        return
    suffix = re.search(r'\.(en|ja|ko)\.html$', url.path)
    actual = suffix[1] if suffix else 'zh'
    if actual != lang:
        errors.append(f'{context}: language mismatch {href}')
    if url.fragment and unquote(url.fragment) not in outline(url.path).ids:
        errors.append(f'{context}: missing anchor {href}')

errors = []
for lang in ('zh', 'en', 'ja', 'ko'):
    suffix = '' if lang == 'zh' else '.' + lang
    filename = ROOT / f'assets/js/topics{suffix}.js'
    code = "const fs=require('fs'),vm=require('vm');const c={};vm.createContext(c);vm.runInContext(fs.readFileSync(process.argv[1],'utf8')+';this.registry={TOPICS,PATHS};',c);process.stdout.write(JSON.stringify(c.registry));"
    registry = json.loads(subprocess.check_output(['node', '-e', code, str(filename)], text=True))
    count = 0
    for topic in registry['TOPICS']:
        href = topic['href']
        check_link(href, errors, topic['title'], lang)
        seen = set()
        for chapter in topic['sections']:
            target = chapter.get('href', href) + ('#' + chapter['id'] if chapter['id'] else '')
            if target in seen:
                errors.append(f'{href}: duplicate chapter destination {target}')
            seen.add(target)
            check_link(target, errors, chapter['label'], lang)
            count += 1
        doc = outline(href)
        registered = {s['id'] for s in topic['sections']}
        for section in doc.sections - registered:
            errors.append(f'{href}: unregistered chapter #{section}')
        for duplicate in doc.duplicates:
            errors.append(f'{href}: duplicate ID #{duplicate}')
    for route in registry['PATHS']:
        for step in route['steps']:
            check_link(step['href'], errors, route['title'], lang)
    print(f'{lang}: {len(registry["TOPICS"])} topics, {count} chapter destinations, {len(registry["PATHS"])} learning paths')
# Check every local fragment in active HTML, including unregistered cross-topic links.
for file in ROOT.rglob('*.html'):
    if '_backup' in file.parts or 'node_modules' in file.parts:
        continue
    relative = str(file.relative_to(ROOT))
    doc = outline(relative)
    for href in doc.links:
        url = urlsplit(href)
        if url.scheme or url.netloc or not url.fragment:
            continue
        target = (file.parent / unquote(url.path)).resolve() if url.path else file
        if target.is_file() and target.suffix == '.html' and target.is_relative_to(ROOT):
            if unquote(url.fragment) not in outline(str(target.relative_to(ROOT))).ids:
                errors.append(f'{relative}: missing linked fragment {href}')
if errors:
    print('\n'.join(errors))
    raise SystemExit(1)
print('PASS: chapter destinations, document coverage, unique IDs and localized learning paths')
