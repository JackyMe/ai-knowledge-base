# AI Knowledge Base

A static reference website for AI workflows, coding tools, design, troubleshooting, and engineering fundamentals. Available in Chinese, English, Japanese, and Korean.

[Website](https://aidoc-zq.netlify.app) · [中文](README.md)

Six categories contain 17 topics and 259 chapter destinations per language, including 35 Docker lessons. The homepage supports category filtering, expandable chapters, full-text search, keyboard shortcuts, and reading history. Articles share navigation, pagination, dark mode, and scrollable tables.

## Run locally

```sh
npm run dev -- --listen 4173
```

No build step or frontend framework is required. The command uses `npx serve`, which may download the development server on first use.

## Maintain content

Home documents live in `index*.html`; topic and chapter registrations in `assets/js/topics*.js`; articles in `topics/`; Docker lessons in `topics/docker/`. Files in `topics/_backup/` are excluded from active indexes.

Keep all four language registries in sync when changing chapters. Preserve old anchors when merging sections. Rebuild and validate:

```sh
python3 scripts/build-search-index.py
python3 scripts/check_content_structure.py
python3 scripts/check_static_links.py
git diff --check
```

The structure check requires Node.js; Python scripts use the standard library. Content combines official-source summaries with illustrative workflows. Examples are not universally runtime-tested. Verify current versions, pricing, and account permissions with the relevant official documentation and your environment.

See the [review record](docs/content-review-2026-09-09.md) and [code license](LICENSE).
