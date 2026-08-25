<div align="center">

# 📚 AI Knowledge Base

**Field guides for Claude Code · Codex · Google AI · xAI Grok · pen.dev · Docker — official docs distilled with real-world practice, all in one place**

[![Live Site](https://img.shields.io/website?url=https%3A%2F%2Faidoc-zq.netlify.app&up_message=online&down_message=offline&style=flat-square&label=site)](https://aidoc-zq.netlify.app)
[![Last Commit](https://img.shields.io/github/last-commit/JackyMe/ai-knowledge-base?style=flat-square&label=last%20updated)](https://github.com/JackyMe/ai-knowledge-base/commits/main)
![Zero Dependencies](https://img.shields.io/badge/build-zero%20dependencies-brightgreen?style=flat-square)
![Language](https://img.shields.io/badge/bilingual-English%20%26%20Chinese-blue?style=flat-square)
[![License](https://img.shields.io/badge/code%20license-MIT-blue?style=flat-square)](LICENSE)

**[🌐 Visit aidoc-zq.netlify.app](https://aidoc-zq.netlify.app/index.en.html)** (primary) · [GitHub Pages mirror](https://jackyme.github.io/ai-knowledge-base/index.en.html) ·  [中文说明 »](README.md)

</div>

---

## What this is

In one line: a distillation of official docs and battle-tested practices for **Claude Code, Codex, Google AI, xAI Grok, pen.dev, and Docker** into a single, fully bilingual, always-searchable knowledge base.

This is not "another AI-generated content dump." Every claim is sourced (official docs / GitHub / hands-on testing), disagreements between sources are flagged rather than smoothed over, and where no solid evidence exists the page says so instead of making something up.

**The tech stack is deliberately minimal**: no React, no bundler, no `node_modules` black hole. Plain HTML + vanilla CSS/JS is the entire app — `git clone` it and open it directly, or drop the folder onto any static host and it just works.

<div align="center">

**15 Core Topics · 170+ Sections · 35-Lesson Docker Series · Full-text Bilingual Search**

</div>

## What's inside

| Topic | About | Highlights |
|---|---|---|
| ⛏️ [Claude Code Guide](topics/claude-code-guide.en.html) | The practical, no-fluff manual | 100+ commands (with a "most-used" quick-reference wall up top), 8 real-world playbooks, 5 ready-to-use templates |
| 🟢 [Codex Guide](topics/codex-guide.en.html) | CLI × IDE × Cloud, all forms covered | Sandbox × approval 3×3 matrix, AGENTS.md, dual-agent workflow with Claude Code |
| 🎯 [Prompt & Context Engineering](topics/prompt-context-engineering.en.html) | Foundational discipline, technique to mindset | 7 core techniques with before/after pairs, 12 copy-paste templates, 6 original case studies, model-routing state of the art |
| 🚑 [Environment & Login First-Aid](topics/env-auth-clinic.en.html) | Diagnose auth errors in 30 seconds | Five-layer diagnostic method, one-shot health-check script, shared-machine / new-machine / CI playbooks, 3-tier reset ladder |
| 📘 [pen.dev Official Docs](topics/pencil-docs-zh.en.html) | All 16 pages of docs.pencil.dev | Includes official videos, linked back to source per section |
| ⚡ [pen.dev × Claude Code Best Practices](topics/pencil-claude-code-best-practices.en.html) | The full design-to-code pipeline | 9+ sources synthesized, 16 real screenshots |
| 🎨 [AI × UI Design Collaboration](topics/ai-ui-design-collab.en.html) | Figma + pen.dev + Material 3 + Visual Regression | Tool map, 3 MCP channels, Android 5-step end-to-end pipeline, Paparazzi/Roborazzi dual regression, bi-directional token sync |
| ⚡ [Android Crash & ANR Field Guide](topics/android-crash-anr.en.html) | From spotting a crash to fixing it | 20+ crash-type catalog, deep ANR anatomy, original AI-assisted triage skill |
| 🧭 [What AI Can Actually Do For You](topics/ai-leverage-guide.en.html) | A realistic map of where AI helps | 8-scenario payoff matrix, 7 sourced principles, practical case studies |
| 🧗 [AI Capability Expansion Guide](topics/ai-capability-expansion.en.html) | Expand technical boundaries with AI | 5-step engine, cross-domain mapping, and end-to-end full-stack / indie development cases |
| 🌐 [Google AI Ecosystem Deep Dive](topics/google-ai-ecosystem.en.html) | Models to Agentic IDE full-stack | Antigravity 2.0 (CLI/IDE/SDK/Customizations/Sandbox) deconstruction + NotebookLM source grounding + AI Studio 2M context |
| 🛸 [Antigravity Complete Guide](topics/antigravity-usage.en.html) | Agentic infrastructure in practice | CLI subcommands reference + .agents customizations + Subagents deep orchestration + sandbox security |
| 𝕏 [xAI & Grok Ecosystem Master Guide](topics/grok-ecosystem-guide.en.html) | Superclusters to Agentic engineering | Memphis Colossus 200k + Grok 3/4 reasoning matrix + Grok Build cloud sandbox + Live X Grounding + 10 Prompt templates |
| 🛠️ [Servers · Ops · Deployment · Network 101](topics/ops-basics.en.html) | For solo devs crossing the DevOps wall | 5-stage roadmap + 3 modules (Linux/Network/Deploy) with 24 lessons + 5 troubleshooting tables |
| 🐳 [Docker Zero-to-Hero Interactive Guide](topics/docker/01-intro.html) | 35-lesson in-depth illustrated column | Concept ice-breaking, Three Musketeers, multi-stage builds, Volumes, networking, Compose orchestration & CI/CD |
| 📅 [Tool Version Tracker](topics/toolchain-changelog.en.html) | What changed & upgrade must-reads | Monthly archive tracking Claude Code / Codex / Antigravity latest breaking changes and migrations |

## Feature highlights

- **Search reaches into the article body** — not just titles and headings, actual paragraph text is indexed too, via pre-built static indexes (`search-index.js` & `search-index-en.js`) with zero backend involved
- **Fuzzy match as a fallback** — typos and dropped characters still mostly resolve, with a bounded-span algorithm to avoid spurious matches
- **Four guided learning paths** — the homepage strings the 15 topics into "getting started / tool mastery / ops foundation / full-stack ecosystem & advanced" tracks
- **Reading position memory** — backed by `localStorage`; the homepage surfaces a "continue reading" card automatically
- **Tiered evidence labeling** — officially confirmed / strongly field-tested / still contested, so readers know at a glance how much to trust a given claim

## Project layout

```
ai-knowledge-base/
├── index.html                  # Chinese Topic Hub (entry point)
├── index.en.html               # English Topic Hub (entry point)
├── topics/                     # Self-contained topic pages (bilingual pairs)
│   ├── claude-code-guide.html & .en.html
│   ├── codex-guide.html & .en.html
│   ├── prompt-context-engineering.html & .en.html
│   ├── env-auth-clinic.html & .en.html
│   ├── pencil-docs-zh.html & .en.html
│   ├── pencil-claude-code-best-practices.html & .en.html
│   ├── ai-ui-design-collab.html & .en.html
│   ├── android-crash-anr.html & .en.html
│   ├── ai-leverage-guide.html & .en.html
│   ├── ai-capability-expansion.html & .en.html
│   ├── google-ai-ecosystem.html & .en.html
│   ├── antigravity-usage.html & .en.html
│   ├── grok-ecosystem-guide.html & .en.html
│   ├── ops-basics.html & .en.html
│   ├── toolchain-changelog.html & .en.html
│   └── docker/                 # Docker 35-lesson in-depth series
│       ├── 01-intro.html
│       └── ... 35-cicd-concept.html
├── assets/
│   ├── css/site.css            # Shared site-wide styles
│   └── js/
│       ├── site.js             # Shared interaction script
│       ├── topics.js           # Chinese topic registry
│       ├── topics.en.js        # English topic registry
│       ├── search-index.js     # Chinese pre-built full-text search index
│       └── search-index-en.js  # English pre-built full-text search index
├── scripts/
│   └── build-search-index.py   # Scans topics/ to regenerate bilingual search indexes
├── package.json                # Local preview script
├── README.md                   # Chinese README
└── README.en.md                # English README
```

## Run it locally

```bash
git clone git@github.com:JackyMe/ai-knowledge-base.git
cd ai-knowledge-base
npm run dev        # equivalent to npx serve ., opens http://localhost:3000
```

Or run any local static server: `python3 -m http.server 8000`. Zero build steps, zero node_modules.

## License

MIT © 2026 jackyz
