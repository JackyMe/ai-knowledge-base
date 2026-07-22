<div align="center">

# 📚 AI Knowledge Base

**Field guides for Claude Code · Codex · Pencil — official docs distilled with real-world practice, all in one place**

[![Live Site](https://img.shields.io/website?url=https%3A%2F%2Faidoc-zq.netlify.app&up_message=online&down_message=offline&style=flat-square&label=site)](https://aidoc-zq.netlify.app)
[![Last Commit](https://img.shields.io/github/last-commit/JackyMe/ai-knowledge-base?style=flat-square&label=last%20updated)](https://github.com/JackyMe/ai-knowledge-base/commits/main)
![Zero Dependencies](https://img.shields.io/badge/build-zero%20dependencies-brightgreen?style=flat-square)
![Language](https://img.shields.io/badge/content-Chinese%20%28default%29-red?style=flat-square)

**[🌐 Visit aidoc-zq.netlify.app](https://aidoc-zq.netlify.app)** (primary) · [GitHub Pages mirror](https://jackyme.github.io/ai-knowledge-base/) ·  [中文说明 »](README.md)

</div>

> **Note:** the site content itself is written in Chinese (its primary audience). This file just explains the project in English — see [README.md](README.md) for the native version.

---

## What this is

In one line: a distillation of official docs and battle-tested practices for **Claude Code, Codex, and Pencil** into a single, always-searchable knowledge base.

This is not "another AI-generated content dump." Every claim is sourced (official docs / GitHub / hands-on testing), disagreements between sources are flagged rather than smoothed over, and where no solid evidence exists the page says so instead of making something up.

**The tech stack is deliberately minimal**: no React, no bundler, no `node_modules` black hole. One `index.html` plus a handful of self-contained HTML pages is the entire app — `git clone` it and open it directly, or drop the folder onto any static host and it just works.

<div align="center">

**9 topics · 120+ sections · full-text search across every section body**

</div>

## What's inside

| Topic | About | Highlights |
|---|---|---|
| ⛏️ [Claude Code Guide](topics/claude-code-guide.html) | The practical, no-fluff manual | 100+ commands (with a "most-used" quick-reference wall up top), 8 real-world playbooks, 5 ready-to-use templates |
| 🟢 [Codex Guide](topics/codex-guide.html) | CLI × IDE × Cloud, all forms covered | Sandbox × approval 3×3 matrix, AGENTS.md, dual-agent workflow with Claude Code |
| 🎯 [Prompt & Context Engineering](topics/prompt-context-engineering.html) | The foundational discipline, technique to mindset | 7 core techniques with before/after pairs, 12 copy-paste templates, 6 original case studies, an honest audit of model-routing tools (states plainly that the space is still immature — no invented best practice) |
| 🚑 [Environment & Login First-Aid](topics/env-auth-clinic.html) | Diagnose auth errors in 30 seconds | Five-layer diagnostic method, one-shot health-check script, shared-machine / new-machine / CI playbooks, a three-tier reset ladder |
| 📘 [Pencil Official Docs (Chinese)](topics/pencil-docs-zh.html) | All 16 pages of docs.pencil.dev | Includes official videos, linked back to source per section |
| ⚡ [Pencil × Claude Code Best Practices](topics/pencil-claude-code-best-practices.html) | The full design-to-code pipeline | 9+ sources synthesized, 20+ real screenshots |
| ⚡ [Android Crash & ANR Field Guide](topics/android-crash-anr.html) | From spotting a crash to actually fixing it | 30+ crash-type catalog, deep ANR anatomy, an original AI-assisted triage skill |
| 🧭 [What AI Can Actually Do For You](topics/ai-leverage-guide.html) | A realistic map of where AI helps | 8-scenario payoff matrix, 7 sourced principles (not vibes) |
| 🧗 [Android-to-Full-Stack Transition](topics/android-to-fullstack.html) | A veteran mobile dev's playbook for going full-stack | Four-layer migration (language/UI/architecture/data), a 12-week roadmap, a solo-founder business closer |

## Feature highlights

- **Search reaches into the article body** — not just titles and headings, actual paragraph text is indexed too, via a pre-built static index with no backend involved
- **Fuzzy match as a fallback** — typos and dropped characters still mostly resolve, with a bounded-span algorithm to avoid spurious matches in dense text
- **Three guided learning paths** — the homepage strings the 9 topics into "getting started / mastering the tools / career transition" tracks for readers who don't know where to start
- **Reading position memory** — backed by `localStorage`; the homepage surfaces a "continue reading" card automatically
- **Tiered evidence labeling** — officially confirmed / strongly field-tested / still contested, so readers know at a glance how much to trust a given claim

## Project layout

```
ai-knowledge-base/
├── index.html                  # Topic hub (entry point): site-wide search / tag filter / continue-reading / topic cards
├── topics/                     # One self-contained HTML page per topic
│   ├── claude-code-guide.html
│   ├── codex-guide.html
│   ├── prompt-context-engineering.html
│   ├── env-auth-clinic.html    # Environment & login first-aid (Claude Code × Codex)
│   ├── pencil-docs-zh.html
│   ├── pencil-claude-code-best-practices.html
│   ├── android-crash-anr.html
│   ├── ai-leverage-guide.html  # What AI can do for you
│   └── android-to-fullstack.html
├── assets/
│   ├── css/site.css            # Shared interaction styles (progress bar, filters, copy buttons, lightbox, jump panel)
│   └── js/
│       ├── site.js             # Shared interaction script, loaded by every topic page
│       ├── topics.js           # Topic registry — the single source of truth
│       └── search-index.js     # Pre-generated full-text search index (see below)
├── scripts/
│   └── build-search-index.py   # Scans topics/*.html and (re)generates search-index.js
├── package.json                # Local preview script
└── README.md
```

## Run it locally

```bash
git clone git@github.com:JackyMe/ai-knowledge-base.git
cd ai-knowledge-base
npm run dev        # equivalent to npx serve ., opens http://localhost:3000
```

Any static file server works: `python3 -m http.server 8000`. No install step, no build step.

## Adding your own topic (3 steps)

1. Drop a new HTML file into `topics/`, and add right after `</style>` and right before `</body>`:
   ```html
   <link rel="stylesheet" href="../assets/css/site.css">
   <script src="../assets/js/site.js"></script>
   ```
   The page needs: `.topbar` (with `.right`), `#sidebar` (with a `#sideFilter` filter box), a `#prog` progress bar, a `#topBtn` back-to-top button, and `section[id]` + `h2/h3` structure — copy the pattern from any existing topic page.
2. Append an entry to the `TOPICS` array in `assets/js/topics.js` (title / icon / color / section list; an optional `keywords` field adds colloquial search aliases). If a section is a high-frequency "quick reference" entry point, add `quick:true` and `quickLabel:"Display text"` to it — it'll automatically show up in the homepage's "⚡ Quick Reference" row.
3. Regenerate the search index (run this after adding or editing any `topics/*.html` body content):
   ```bash
   python3 scripts/build-search-index.py
   ```
4. Done. The homepage card, tag filter, section quick-links, and site-wide search all pick it up automatically — no changes to `index.html` needed.

## Deploying your own copy

**Option A · Netlify Drop (fastest, ~1 minute)**
Drag the whole folder onto [app.netlify.com/drop](https://app.netlify.com/drop) and you get a public URL.

**Option B · GitHub Pages**
Fork this repo → repo Settings → Pages → Source: `main` branch, root — you get
`https://<your-username>.github.io/ai-knowledge-base/`, updated automatically on every push.

**Option C · Cloudflare Pages / Vercel**
Both support "import a Git repository" — leave the build command empty and set the output directory to `/`.

> This repo's own live deployment (aidoc-zq.netlify.app) uses `sync.sh` plus a `.git/hooks/post-commit` hook: once a Netlify token is configured, every `git commit` triggers a deploy automatically. See the comments in `sync.sh` for details.

## Notes

- This is a personally curated set of study notes, drawing heavily on official documentation and community first-hand practice — **every page and its closing section link back to sources.** Disagreements between sources are flagged rather than papered over, and unverified claims aren't presented as fact. If you republish anything, please respect the license terms of the original sources.
- "Continue reading" and reading-position tracking are powered by browser `localStorage` — no data is uploaded, no account required.
- AI tooling moves fast; most pages are dated with a last-verified date, but always defer to the official docs as ground truth.

