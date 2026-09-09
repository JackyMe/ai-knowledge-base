/* ============================================================
   AI Knowledge Base · Topics Registry (Single Source of Truth)
   Adding a new topic:
   1. Place topic HTML into topics/ (references ../assets/css/site.css &
      ../assets/js/site.js to gain unified interactivity)
   2. Append an object to TOPICS below
   3. Done —— Homepage cards, quick chapter links, and search update automatically.
   ============================================================ */

/* ------------------------------------------------------------
   Curated External Learning Hubs:
   Shared between homepage 'Featured Learning Hubs' and site search.
   ------------------------------------------------------------ */
const LEARN = [
  {
    href: "https://coding.stormzhang.ai/", icon: "🎓", tag: "Chinese · System Tutorial", color: "#f59e0b", featured: true,
    title: "AI Coding Guide (stormzhang)",
    desc: "92 beginner-friendly systematic tutorials: 53 for Claude Code + 39 for Codex, open-sourced on GitHub and continuously maintained. Top choice for beginners—just follow step by step; complementary to this repo: use it for learning, use this for daily reference.",
    links: [
      { label: "Claude Code Section (53 articles) →", href: "https://coding.stormzhang.ai/claude-code/01-what-is-claude-code" },
      { label: "Codex Section (39 articles) →", href: "https://coding.stormzhang.ai/codex/01-what-is-codex" },
      { label: "GitHub Repo", href: "https://github.com/stormzhang/ai-coding-guide" }
    ]
  },
  {
    href: "https://code.claude.com/docs", icon: "📖", tag: "Official · Primary Source", color: "#d9634a",
    title: "Claude Code Official Docs",
    desc: "The ultimate source of truth for everything. The 'Best practices' page is worth reading word by word; check /release-notes for weekly new features.",
    links: [ { label: "Best Practices →", href: "https://code.claude.com/docs/en/best-practices" } ]
  },
  {
    href: "https://developers.openai.com/codex", icon: "📗", tag: "Official · Primary Source", color: "#0d9373",
    title: "Codex Official Docs",
    desc: "Authoritative reference for CLI / IDE / Cloud all forms; Config and Authentication chapters are the most frequently checked.",
    links: [ { label: "Best Practices →", href: "https://developers.openai.com/codex/learn/best-practices" } ]
  },
  {
    href: "https://codexguide.io/paths", icon: "🚀", tag: "Practical · Learning Paths", color: "#10b981",
    title: "CodexGuide Practical Guide",
    desc: "4 goal-oriented learning paths, selection prisms, 4-stage long task discipline, memory loop, browser E2E validation, and practical case studies.",
    links: [ { label: "Learning Paths →", href: "https://codexguide.io/paths" } ]
  },
  {
    href: "https://blakecrosley.com/guides/claude-code", icon: "🧭", tag: "English · Practical Guide", color: "#6366f1",
    title: "Blake Crosley Guides",
    desc: "One comprehensive article for Claude Code and another for Codex: the most thorough single-page explanation of Hooks / MCP / Skills, with ready-to-use examples.",
    links: [ { label: "Codex Guide →", href: "https://blakecrosley.com/guides/codex" } ]
  },
  {
    href: "https://github.com/hesreallyhim/awesome-claude-code", icon: "⭐", tag: "Resource Hub", color: "#64748b",
    title: "awesome-claude-code",
    desc: "The most complete curated community list: skills, hooks, subagents, workflows, and tools. You can find everything here."
  }
];

/* ------------------------------------------------------------
   Learning Paths: Course roadmaps for homepage rendering.
   ------------------------------------------------------------ */
const PATHS = [
  {
    icon: "🌱", color: "#0d9373", title: "Getting Started",
    desc: "From understanding what AI can do to installing tools and running your first task",
    steps: [
      { label: "What AI Can Do · Overview & Mindset", href: "topics/ai-leverage-guide.en.html", note: "Build awareness: scenarios, boundaries, and 7 core mindsets" },
      { label: "Prompts & Context Engineering", href: "topics/prompt-context-engineering.en.html", note: "Speak effectively for output: 7 techniques + 12 templates + 6 cases" },
      { label: "stormzhang System Tutorial (External)", href: "https://coding.stormzhang.ai/", note: "92 beginner tutorials, install your first tool", ext: true },
      { label: "Claude Code Guide · Setup & Config", href: "topics/claude-code-guide.en.html#setup", note: "Commands, permissions, and templates to get started" },
      { label: "Environment First-Aid Manual (Bookmark)", href: "topics/env-auth-clinic.en.html", note: "30-second self-rescue when login fails" }
    ]
  },
  {
    icon: "⚙️", color: "#d9634a", title: "Tool Mastery",
    desc: "Use Claude Code and Codex at a professional level with dual-agent collaboration",
    steps: [
      { label: "Claude Code Guide · Practical Edition", href: "topics/claude-code-guide.en.html", note: "5 golden rules → 8 major scenarios" },
      { label: "Codex Guide · CLI × IDE × Cloud", href: "topics/codex-guide.en.html", note: "Sandbox approvals, cloud tasks, dual-agent collaboration" },
      { label: "pen.dev × Claude Code Practice", href: "topics/pencil-claude-code-best-practices.en.html", note: "Complete pipeline from design to code" },
      { label: "AI × UI Design Collaboration (New)", href: "topics/ai-ui-design-collab.en.html", note: "Figma + pen.dev + Material 3 + Visual Regression, Android end-to-end" },
      { label: "Context Engineering & Anti-Patterns (Core)", href: "topics/prompt-context-engineering.en.html#context", note: "Attention budget, long-task strategies, safety & cost, identifying bad practices" }
    ]
  },
  {
    icon: "🛠️", color: "#a16207", title: "Ops Foundation",
    desc: "Graduate from SaaS hosting, independently manage servers/deployment/networking for small-medium projects",
    steps: [
      { label: "Servers / Deployment / Networking 101", href: "topics/ops-basics.en.html", note: "5-stage roadmap + 3 modules on Linux/Networking/Deploy (24 lessons) + 5 troubleshooting tables" },
      { label: "R2 Start: Set up a VPS", href: "topics/ops-basics.en.html#stage2", note: "1C1G Ubuntu + SSH + Nginx" },
      { label: "R3 Networking: Domain + DNS + HTTPS", href: "topics/ops-basics.en.html#stage3", note: "yourdomain.dev + Green Lock + Reverse Proxy" },
      { label: "R4 Deployment: git push auto deploy", href: "topics/ops-basics.en.html#stage4", note: "systemd + GitHub Actions" },
      { label: "R5 Containers: Docker from Scratch", href: "topics/docker/01-intro.en.html", note: "Say goodbye to environment issues, multi-page hands-on practice" },
      { label: "Appendix A: 30-sec Troubleshooting", href: "topics/ops-basics.en.html#appA", note: "Bookmark: 502/SSH/Disk Full/OOM/SSL Expired" }
    ]
  },
  {
    icon: "🌐", color: "#1a73e8", title: "Full-Stack Ecosystem & Advanced",
    desc: "Master Google AI (Gemini/Antigravity), xAI (Grok/Grok Build), and cross-domain capability expansion",
    steps: [
      { label: "Google AI Ecosystem Deep Dive", href: "topics/google-ai-ecosystem.en.html", note: "Gemini 2.5/3.0 + NotebookLM + Antigravity" },
      { label: "xAI & Grok Ecosystem Master Guide", href: "topics/grok-ecosystem-guide.en.html", note: "Colossus Supercluster + Grok Build + Real-Time X" },
      { label: "Antigravity Complete Guide", href: "topics/antigravity-usage.en.html", note: "CLI / IDE / SDK / Subagents / MCP Practice" },
      { label: "AI Capability Expansion Guide", href: "topics/ai-capability-expansion.en.html", note: "5-step expansion engine + cross-domain mapping + solopreneur" },
      { label: "Android Crash & ANR Fixes", href: "topics/android-crash-anr.en.html", note: "Crash/ANR catalog + original AI triage skill" }
    ]
  }
];

const TOPICS = [
  {
    href: "topics/pencil-docs-zh.en.html", icon: "📘", tag: "Design & Docs", color: "#5b5bf6",
    title: "pen.dev Official Docs · Complete Guide",
    desc: "Covers all 16 pages of docs.pencil.dev, including official videos and images, with links to the original text in each section.",
    keywords: "pencil design pen files components variables shortcuts installation activation import export cli canvas",
    meta: ["16 pages", "Includes official videos", "Verified 2026-08-17"],
    sections: [
      {id:"home",label:"Home"},{id:"installation",label:"Installation"},
      {id:"authentication",label:"Authentication & Activation"},{id:"ai-integration",label:"AI Integration"},
      {id:"pen-files",label:".pen Files"},{id:"design-as-code",label:"Design as Code"},
      {id:"interface",label:"pen.dev Interface"},{id:"variables",label:"Variables"},
      {id:"components",label:"Components"},{id:"slots",label:"Slots"},
      {id:"code-on-canvas",label:"Code on Canvas"},{id:"design-libraries",label:"Design Libraries"},
      {id:"import-export",label:"Import & Export"},{id:"shortcuts",label:"Keyboard Shortcuts"},
      {id:"design-to-code",label:"Design ↔ Code"},{id:"troubleshooting",label:"Troubleshooting"},
      {id:"pen-format",label:".pen File Format"},{id:"pencil-cli",label:"pen.dev CLI"}
    ]
  },
  {
    href: "topics/pencil-claude-code-best-practices.en.html", icon: "⚡", tag: "Design & Docs", color: "#0ea5e9",
    title: "pen.dev × Claude Code Best Practices",
    desc: "Aggregates 9+ sources: 4 core workflows, prompt templates, design system engineering, CI/CD, pitfalls, and real cases (with 16 screenshots).",
    keywords: "pencil claude workflow prompt design system pitfalls cases best practices",
    meta: ["9+ Sources", "16 Screenshots", "Verified 2026-08-17"],
    sections: [
      {id:"intro",label:"Why This Combination"},{id:"setup",label:"Standard Setup Flow"},
      {id:"workflows",label:"4 Core Workflows"},{id:"prompts",label:"Practical Prompt Examples"},
      {id:"design-system",label:"Design System Engineering"},{id:"prompt-patterns",label:"High-Efficiency Prompt Patterns"},
      {id:"advanced",label:"Advanced Techniques"},{id:"pitfalls",label:"Pitfall Checklist"},
      {id:"cases",label:"Real Case Studies"},{id:"resources",label:"Resources & Sources Index"}
    ]
  },
  {
    href: "topics/ai-ui-design-collab.en.html", icon: "🎨", tag: "Design & Docs", color: "#7c3aed",
    title: "AI Coding Agents × UI Design Tools · Collaboration Panorama",
    desc: "pen.dev / Figma / Stitch / Galileo / v0 + Claude Code / Codex + Android Jetpack Compose Material 3: Tool map, 3 MCP channels, Android 5-step end-to-end pipeline, Design Token engineering, Paparazzi / Roborazzi visual regression, bi-directional sync, anti-patterns, and prompt library.",
    keywords: "figma pencil.dev stitch galileo v0 claude code codex mcp design token variables compose material3 theme android visual regression paparazzi roborazzi screenshots collaboration design system",
    meta: ["3 Entry Points", "5-Step Android Pipeline", "Paparazzi/Roborazzi Dual Regression", "Verified 2026-08-17"],
    sections: [
      {id:"intro",label:"Overview & Design-Code Gap"},
      {id:"map",label:"Design Tool Positioning"},
      {id:"consume",label:"How AI Agents View Designs"},
      {id:"pipeline",label:"5-Step Pipeline"},
      {id:"tokens",label:"Figma → Material 3 Token"},
      {id:"compose",label:"Compose Generation & Writeback"},
      {id:"verify",label:"Device/Virtual Screenshot Regression"},
      {id:"sync",label:"Bi-directional Sync & Design System Maintenance"},
      {id:"cases",label:"Real Case Study (E-Commerce Product Detail)"},
      {id:"antipatterns",label:"Anti-Patterns & Pitfalls"},
      {id:"prompts",label:"Prompt Template Library"},
      {id:"ios-web",label:"iOS / Web Cross-Platform Landing"},
      {id:"resources",label:"Resources & Sources"}
    ]
  },
  {
    href: "topics/claude-code-guide.en.html", icon: "⛏️", tag: "User Guide", color: "#d9634a",
    title: "Claude Code User Guide · Practical Edition",
    desc: "5 Golden Rules, 100+ command cheat sheet, 6 extension selections, 8 major scenario playbooks, permissions, security, and out-of-the-box template library.",
    keywords: "claude code commands shortcuts skills hooks mcp subagents context permissions config templates prompts claude.md slash commands",
    meta: ["100+ Commands", "8 Major Scenarios", "5 Templates", "Based on v2.1.x", "Verified 2026-08-17"],
    sections: [
      {id:"mental-model",label:"Everything Around Context"},{id:"golden-rules",label:"5 Golden Rules"},
      {id:"whats-new",label:"Recent Key Changes"},
      {id:"setup",label:"Installation & First-Time Config"},{id:"commands",label:"Command Reference Manual",quick:true,quickLabel:"Claude Code Command Reference"},
      {id:"shortcuts",label:"Shortcuts & Input Techniques"},{id:"extensions",label:"How to Choose from 6 Extensions"},
      {id:"skills-hooks",label:"Skills / Hooks / MCP / Subagents"},{id:"playbook",label:"8 Major Scenario Playbooks"},
      {id:"context",label:"Advanced Context Management"},{id:"permissions",label:"Permissions & Security"},
      {id:"config-auth",label:"Configuration & Account Breakdown"},{id:"ecosystem",label:"Ecosystem Highlights: Methodologies & Combos"},
      {id:"pitfalls",label:"Pitfalls Checklist"},{id:"templates",label:"Ready-to-Use Template Library"},
      {id:"hidden-config",label:"Hidden Features & Easter Egg Configs"},
      {id:"resources",label:"Resource Index"}
    ]
  },
  {
    href: "topics/codex-guide.en.html", icon: "🟢", tag: "User Guide", color: "#0d9373",
    title: "Codex User Guide · CLI × IDE × Cloud Comprehensive Handbook",
    desc: "OpenAI Coding Agent Panorama: 20+ subcommands and 40+ slash commands cheat sheet, sandbox & approval 3×3 matrix, 4 goal-oriented learning paths, selection prisms, 4-stage long task discipline, memory closeout loop, browser E2E acceptance, Issue-to-PR workflow, Skills/MCP, and dual-agent collaboration with Claude Code.",
    keywords: "codex openai sandbox approvals agents.md cloud commands collaboration gpt selection prisms learning paths four stages memory system e2e browser acceptance github issue pr tdd wsl performance tuning",
    meta: ["5 Forms", "3×3 Sandbox Matrix", "4-Stage Long Tasks", "E2E Browser Testing", "Dual-Agent Synergy"],
    sections: [
      {id:"overview",label:"Overview & Prisms"},{id:"learning-paths",label:"4 Learning Paths"},
      {id:"setup",label:"Setup & Tuning"},{id:"whats-new",label:"Recent Updates"},
      {id:"commands",label:"Command Reference Manual",quick:true,quickLabel:"Codex Command Reference"},
      {id:"sandbox",label:"3×3 Sandbox Matrix"},{id:"methodology",label:"Core Methodology & Anti-Patterns"},
      {id:"long-tasks",label:"Long Tasks & 4 Stages"},{id:"memory-system",label:"Memory & Closeout Loop"},
      {id:"skills-mcp",label:"Skills / MCP / Browser"},{id:"config-auth",label:"Config & Accounts"},
      {id:"playbook",label:"Pipelines & Playbook"},{id:"hidden-config",label:"Under-the-Hood & Dual-Agent"},
      {id:"resources",label:"Resource Index"}
    ]
  },
  {
    href: "topics/gpt-image-guide.en.html", icon: "🎨", tag: "User Guide", color: "#7c3aed",
    title: "GPT Image Generation Guide · Complete Practical Handbook",
    desc: "Comprehensive image generation guide for GPT subscribers: Complete evolution from DALL-E to GPT-4o native image and Image 2.5, Six-Element Prompt Framework, 15+ scenario templates, style vocabulary, image editing loop, text rendering guide, competitive comparison, and enterprise compliance.",
    keywords: "image generation dall-e gpt-4o prompt style text rendering image editing transparent background png ghibli pixel art logo design ui ecommerce product infographic social media stickers copyright safety midjourney stable diffusion comparison character consistency seed custom gpt image 2.0 2.5",
    meta: ["4 Generations Evolution", "Six-Element Framework", "15+ Scenario Templates", "100+ Sources Aggregated", "Verified 2026-09-09"],
    sections: [
      {id:"evolution",label:"Evolution Panorama"},{id:"subscription",label:"Subscription Tiers & Quotas"},
      {id:"prompt-framework",label:"Six-Element Prompt Framework"},{id:"prompt-advanced",label:"Advanced Prompting Techniques"},
      {id:"style-control",label:"Style Control & Vocabulary",quick:true,quickLabel:"Style Vocabulary Quickref"},
      {id:"text-rendering",label:"Typography & Text Rendering"},{id:"image-editing",label:"Image Editing & Iteration"},
      {id:"consistency",label:"Character & Style Consistency"},{id:"scenarios",label:"15+ Scenario Templates",quick:true,quickLabel:"Scenario Prompt Templates"},
      {id:"expert-tricks",label:"Expert-Level Pro Tricks"},{id:"comparison",label:"Comparison & Selection"},
      {id:"safety-copyright",label:"Safety Policy & Copyright"},{id:"resources",label:"Resource Index"}
    ]
  },
  {
    href: "topics/env-auth-clinic.en.html", icon: "🚑", tag: "Troubleshooting", color: "#e11d48",
    title: "AI CLI Env & Login First-Aid · Claude Code × Codex",
    desc: "Fix login errors, config conflicts, and machine-switching issues in one page: 30-second symptom triage, 5-layer diagnostic methodology + one-click health check script, dual-tool 5-category first-aid tables, 3 scenarios (shared PC, new PC, headless/CI), and 3-level universal reset solutions.",
    keywords: "login error environment variables switch computer multi-account shared subscription invalid api key 401 403 429 529 rate limit quota usage limit auth credentials reset fix troubleshoot diagnose keychain proxy ssh container ci token vs code windows node version case study credit balance wsl econnreset timeout",
    meta: ["Symptom Triage", "5-Layer Diagnostics", "3-Tier Reset", "Verified 2026-08-17"],
    sections: [
      {id:"overview",label:"Symptom Triage + Problem Map"},{id:"diagnose",label:"5-Layer Diagnostics + Health Script"},
      {id:"claude-cred",label:"Claude Code Credential Mechanism"},{id:"claude-config",label:"Claude Code settings.json Full Guide"},
      {id:"claude-er",label:"Claude Code Emergency Room Table"},
      {id:"codex-cred",label:"Codex Credential Mechanism"},{id:"codex-config",label:"Codex config.toml Full Guide"},
      {id:"codex-er",label:"Codex Emergency Room Table"},
      {id:"shared",label:"Shared Computer / Other's Config"},{id:"machines",label:"Switching Computers / Multi-Machine Roaming"},
      {id:"headless",label:"SSH / Container / CI"},{id:"cases",label:"Case Studies: From Symptom to Root Cause"},
      {id:"reset",label:"Universal Fix: 3-Level Reset"},{id:"map",label:"Dual-Tool Comparison & Resources"}
    ]
  },
  {
    href: "topics/android-crash-anr.en.html", icon: "⚡", tag: "Troubleshooting", color: "#65a30d",
    title: "Android Crash & ANR Fixes × AI Efficiency",
    desc: "From beginner to expert: Crash catalog, ANR anatomy, Native crash triage, full toolchain, GP/Firebase console, tricky issue detective techniques, and AI triage workflow with original crash-triage skill.",
    keywords: "android anr crash stability firebase play console native stack trace logs triage",
    meta: ["12 Progressive Chapters", "20+ Crash Catalog", "Original AI Skill", "Verified 2026-08-17"],
    sections: [
      {id:"overview",label:"Overview & Methodology"},{id:"read-crash",label:"Lesson 1: Understanding a Crash"},
      {id:"crash-catalog",label:"Common Crash Catalog & Solutions"},{id:"anr",label:"Deep Dive into ANR"},
      {id:"native",label:"Native Crash"},{id:"toolbox",label:"Toolbox & Usage"},
      {id:"consoles",label:"Play Console & Firebase"},{id:"device-data",label:"Exporting Test Device Data"},
      {id:"detective",label:"Tricky Issue Detective Techniques"},{id:"ai-method",label:"AI Integration: Methodology & Prompts"},
      {id:"ai-workflow",label:"AI Workflow & Original Skill"},{id:"governance",label:"Governance System & Resources"}
    ]
  },
  {
    href: "topics/ai-leverage-guide.en.html", icon: "🧭", tag: "Efficiency Mindset", color: "#7c3aed",
    title: "What AI Can Actually Do For You · Efficiency & Mindset",
    desc: "Aggregated web research: Capability boundary table, 8 major scenario ROI matrix, 5 paradigms (coding, writing, research, data automation, life), 3 tool selections, 7 sourced core mindsets, replicable case studies, and a learning roadmap for everyday people.",
    keywords: "what can ai do efficiency scenarios writing documentation weekly report research learning data analysis automation life mindset prompt pitfalls beginner learn ai choose tools comparison gemini chatgpt claude codex deep research vibe coding",
    meta: ["8 Major Scenarios", "7 Core Mindsets", "7 Real Cases", "Verified 2026-08-17"],
    sections: [
      {id:"map",label:"Panorama Map: Boundary Table"},{id:"matrix",label:"Scenario × ROI Matrix"},
      {id:"coding",label:"Coding: Best Paradigms"},{id:"writing",label:"Writing & Documentation"},
      {id:"research",label:"Research & Learning"},{id:"data-auto",label:"Data & Automation"},
      {id:"life",label:"Life & Self-Management Scenarios"},
      {id:"tools",label:"How to Choose Among 3 Tools"},{id:"principles",label:"7 Universal Mindsets"},
      {id:"cases",label:"Real Case Studies Collection"},{id:"learning-path",label:"Everyday People Learning Roadmap"},
      {id:"resources",label:"Resource Index"}
    ]
  },
  {
    href: "topics/prompt-context-engineering.en.html", icon: "🎯", tag: "Efficiency Mindset", color: "#0891b2",
    title: "Prompt & Context Engineering · From Technique to Mindset",
    desc: "Foundational discipline: 7 basic techniques (each with ❌/✅ contrast), multimodal & RAG feed strategies, 3-model prompt nuances, dynamic model routing state of the art, prompt injection & security defense, token economics & caching cost optimization, 6 full rewrite cases, 12 verbatim templates, iteration & versioning, anti-patterns, and layer assignment in CC/Codex.",
    keywords: "prompt context engineering few-shot cot chain of thought xml role prefill json structured outputs system prompt claude.md agents.md compression subagents templates hallucination eval anti-patterns attention multimodal vision rag citations gpt gemini model differences token economics caching cost injection security owasp cases versioning a/b testing model routing litellm routellm cascade",
    meta: ["7 Techniques Contrast", "12 Verbatim Templates", "6 Full Cases", "Model Routing SOTA", "Verified 2026-08-17"],
    sections: [
      {id:"overview",label:"Overview: From Prompts to Context"},{id:"basics",label:"7 Foundational Techniques"},
      {id:"structured",label:"Structured Outputs"},{id:"multimodal",label:"Multimodal Prompts"},
      {id:"models",label:"Mainstream Model Prompt Differences"},{id:"rag",label:"Prompts in RAG Scenarios"},
      {id:"context",label:"Core Context Engineering"},{id:"agentic",label:"Agentic Context"},
      {id:"cost",label:"Token Economics & Cost Control"},{id:"routing",label:"Model Routing & Auto-Switching"},
      {id:"security",label:"Prompt Injection & Security Defense"},{id:"cases",label:"Case Studies (6 Examples)"},
      {id:"templates",label:"Verbatim Template Library (12 Styles)"},{id:"eval",label:"Evaluation, Iteration & Version Control"},
      {id:"antipatterns",label:"Anti-Pattern Gallery"},{id:"tools",label:"Carrying in CC / Codex"},
      {id:"resources",label:"Resource Index"}
    ]
  },
  {
    href: "topics/ai-capability-expansion.en.html", icon: "🧗", tag: "Efficiency Mindset", color: "#ea580c",
    title: "AI Capability Expansion Guide",
    desc: "Not about a specific tech stack, but a universal methodology to expand your technical boundaries using AI: Gap diagnosis → AI speed learning → Scaffold startup → Validation loop → Deepen & precipitate. Includes cross-domain mapping techniques and two end-to-end cases (Full-stack cross-platform / Tech indie dev).",
    keywords: "full-stack transition expansion boundary mobile android ios web backend server indie developer solopreneur one-person company learning method methodology cross-domain mapping",
    meta: ["5-Step Methodology", "2 End-to-End Cases", "Cross-Domain Mapping", "Verified 2026-08-17"],
    sections: [
      {id:"mindset",label:"Cognitive Framework"},{id:"engine",label:"5-Step Expansion Engine"},
      {id:"mapping",label:"Cross-Domain Mapping"},{id:"case-studies",label:"Deep End-to-End Cases"},
      {id:"indie",label:"Tech Indie Dev"},{id:"learning-system",label:"AI-Assisted Learning System"},
      {id:"pitfalls",label:"Pitfalls & Mindsets"},{id:"resources",label:"Resource Library"}
    ]
  },
  {
    href: "topics/toolchain-changelog.en.html", icon: "📅", tag: "User Guide", color: "#b45309",
    title: "Toolchain Changelog · What Changed",
    desc: "Version updates for Claude Code and Codex, only including changes that affect usage habits: breaking changes indexed separately (check here first if issues occur after upgrading), behavior changes and new features categorized, monthly archives, with official sources and local check commands.",
    keywords: "update changes version changelog release notes upgrade breaking change new features deprecated migration opus 5 sonnet 5 gpt-5.6 subtask fork permission mode manual latest timing",
    meta: ["Breaking Changes Index", "Monthly Archive", "3-Level Categories", "Verified 2026-08-17"],
    sections: [
      {id:"how-to-read",label:"How to Use This Page"},
      {id:"breaking",label:"Breaking Changes Index",quick:true,quickLabel:"Breaking Changes Lookup"},
      {id:"m2026-08",label:"August 2026"},{id:"m2026-07",label:"July 2026"},{id:"m2026-06",label:"June 2026"},
      {id:"method",label:"How This Page is Maintained"}
    ]
  },
  {
    href: "topics/ops-basics.en.html", icon: "🛠️", tag: "Ops Foundation", color: "#a16207",
    title: "Servers · Ops · Deployment · Network · Indie Dev 101",
    desc: "For indie devs who only used Vercel / Netlify / Cloudflare Pages to cross the DevOps wall: 5-stage roadmap + 3 modules (Linux/Network/Deploy) of 24 lessons (Network module is 13-lesson detailed edition: VPN/Ports/Localhost/NAT/HTTP3/IPv6), plus 5 troubleshooting 30-sec tables. After this, you can independently manage a medium project's server.",
    keywords: "server operations deployment network linux vps ssh systemd nginx reverse proxy https tls ssl certbot let's encrypt dns firewall ufw security group github actions ci cd process hosting ports package manager apt dnf apk permissions sudo chmod chown docker container keys env environment variables troubleshooting 502 504 ssh connection failed disk full oom ssl expired pitfalls indie developer full-stack basics 101 foundation",
    meta: ["5-Stage Roadmap", "3 Modules 24 Lessons", "13-Lesson Network", "5 Troubleshooting Tables", "Verified 2026-08-17"],
    sections: [
      {id:"intro",label:"Intro: Why Learn This"},
      {id:"roadmap",label:"5-Stage Roadmap"},
      {id:"stage1",label:"R1 Current Status"},{id:"stage2",label:"R2 Linux Foundation"},
      {id:"stage3",label:"R3 Networking Backbone"},{id:"stage4",label:"R4 Deployment Link"},
      {id:"stage5",label:"R5 Troubleshooting"},
      {id:"m1-1",label:"1.1 What is a Server"},{id:"m1-2",label:"1.2 Files/Processes/Ports"},
      {id:"m1-3",label:"1.3 SSH & Keys"},{id:"m1-4",label:"1.4 Package Managers"},
      {id:"m1-5",label:"1.5 Permissions & Users"},
      {id:"m2-1",label:"2.1 HTTP→TCP→IP"},{id:"m2-2",label:"2.2 DNS Picture"},
      {id:"m2-3",label:"2.3 HTTPS/TLS/Let's Encrypt"},{id:"m2-4",label:"2.4 Reverse Proxy"},
      {id:"m2-5",label:"2.5 Firewalls & Ports"},{id:"m2-6",label:"2.6 Attack Surface"},
      {id:"m2-7",label:"2.7 Ports Detailed"},{id:"m2-8",label:"2.8 Localhost & Loopback"},
      {id:"m2-9",label:"2.9 VPN vs Proxy"},{id:"m2-10",label:"2.10 Public/Private/NAT"},
      {id:"m2-11",label:"2.11 Debugging Commands"},{id:"m2-12",label:"2.12 HTTP/2 & HTTP/3"},
      {id:"m2-13",label:"2.13 IPv6 101"},
      {id:"m3-1",label:"3.1 7-Step Deployment"},{id:"m3-2",label:"3.2 systemd Hosting"},
      {id:"m3-3",label:"3.3 Nginx Proxy Template"},{id:"m3-4",label:"3.4 Docker Minimal Set"},
      {id:"m3-5",label:"3.5 GitHub Actions"},{id:"m3-6",label:"3.6 Keys & .env"},
      {id:"appA",label:"Appx A: 5 Fault Tables",quick:true,quickLabel:"30-Sec Troubleshooting"},
      {id:"appB",label:"Appx B: Resources"},
      {id:"appC",label:"Appx C: Glossary"}
    ]
  },
  {
    href: "topics/google-ai-ecosystem.en.html", icon: "🌐", tag: "Full-Stack Ecosystem", color: "#1a73e8",
    title: "Google AI Ecosystem Deep Dive · Models to Agentic IDE",
    desc: "Latest comprehensive guide: Google Antigravity (CLI/2.0/IDE/SDK/Customizations/Sandbox) deep deconstruction + NotebookLM knowledge research + AI Studio 2M context + 5-step super pipeline best practices.",
    keywords: "google antigravity agy notebooklm ai studio gemini canvas sketch agents agentic cli ide sdk slash commands subagent planning mode sandbox python sdk source grounding 2m context podcast generation pipeline",
    meta: ["4 Interaction Forms", "26 Chapters", "Antigravity Deconstruction", "5-Step Pipeline", "Verified 2026-08-17"],
    sections: [
      {id:"intro",label:"00 Intro: Full Ecosystem Knowledge Base"},
      {id:"ch1-1",label:"1.1 Google AI Studio & API"},
      {id:"ch1-2",label:"1.2 Context Caching Practice"},
      {id:"ch1-3",label:"1.3 Structured Outputs",quick:true,quickLabel:"Structured Outputs Guide"},
      {id:"ch2-1",label:"2.1 NotebookLM Core & Source Grounding"},
      {id:"ch2-2",label:"2.2 Long Text & Codebase Feeding"},
      {id:"ch2-3",label:"2.3 Audio Overview Distillation"},
      {id:"ch3-1",label:"3.1 Canvas UI Agile Conversion"},
      {id:"ch3-2",label:"3.2 Imagen 3 & Vision Pipeline"},
      {id:"ch4-1",label:"4.1 Antigravity 4 Forms Complete Guide"},
      {id:"ch4-2",label:"4.2 Geek Advanced Tactics (Slash & Mentions)",quick:true,quickLabel:"Antigravity Hidden Tactics"},
      {id:"ch4-3",label:"4.3 Python SDK & Custom Interception"},
      {id:"ch5-1",label:"5.1 Four Musketeers Super Pipeline"},
      {id:"ch5-2",label:"5.2 Anti-Patterns: 4 Blood Tears",quick:true,quickLabel:"AI Pitfalls Catalog"}
    ]
  },
  {
    href: "topics/antigravity-usage.en.html", icon: "🛸", tag: "Full-Stack Ecosystem", color: "#8b5cf6",
    title: "Antigravity Complete Guide · CLI × IDE × SDK",
    desc: "Google Agentic programming infrastructure handbook: CLI subcommands, Agentic IDE interaction, .agents customizations, Subagents orchestration, MCP tool extensions, and sandbox defense in practice.",
    keywords: "antigravity agy ide cli sdk google gemini subagents mcp custom skill rule plugin sandbox bypass reactive wakeup",
    meta: ["4 Forms", "10 Core Chapters", "Subagent Isolation", "Verified 2026-08-17"],
    sections: [
      {id:"sec1",label:"01 Mental Model & Core Concepts"},
      {id:"sec2",label:"02 Installation & Setup"},
      {id:"sec3",label:"03 CLI Subcommands & Keybindings",quick:true,quickLabel:"AGY Commands Cheat Sheet"},
      {id:"sec4",label:"04 Customizations Workflow"},
      {id:"sec5",label:"05 Subagents Deep Orchestration"},
      {id:"sec6",label:"06 Advanced Toolchain & Automation"},
      {id:"sec7",label:"07 Performance & Sandbox Security"},
      {id:"sec8",label:"08 Common Pitfalls & 30s Fixes",quick:true,quickLabel:"AGY Emergency Room"},
      {id:"sec9",label:"09 Practical Case: End-to-End Workflow"},
      {id:"sec10",label:"10 Quick Reference Cheat Sheet"}
    ]
  },
  {
    href: "topics/grok-ecosystem-guide.en.html", icon: "𝕏", tag: "Full-Stack Ecosystem", color: "#d97706",
    title: "xAI & Grok Ecosystem Master Guide · Supercluster to Agentic Engineering",
    desc: "The most hardcore practical guide: Memphis Colossus 200k supercluster + Grok 3/4 reasoning matrix + Grok Build cloud sandbox IDE + Python/TS SDK structured outputs + Real-Time X Grounding + 10 industrial-grade Prompt templates.",
    keywords: "xai grok grok3 grok4 grokbuild build colossus x search grounding think deepsearch reasoning function calling prompt caching agent swarm memphis",
    meta: ["Memphis 200k Supercluster", "Grok Build Cloud Sandbox", "Real-Time X", "10 Prompt Templates", "Verified 2026-08-17"],
    sections: [
      {id:"intro",label:"00 Intro & Colossus Topology"},
      {id:"ch1-1",label:"1.1 Grok Matrix & 4 Reasoning Modes"},
      {id:"ch1-2",label:"1.2 Real-Time X Grounding Practice",quick:true,quickLabel:"Real-Time X Search Guide"},
      {id:"ch1-3",label:"1.3 DeepSearch Research Reports"},
      {id:"ch1-4",label:"1.4 Artifacts & Live Canvas"},
      {id:"ch2-1",label:"2.1 Grok Build Cloud Sandbox"},
      {id:"ch2-2",label:"2.2 Vibe Coding Pipeline",quick:true,quickLabel:"Vibe Coding Pipeline"},
      {id:"ch2-3",label:"2.3 xAI API Routing & Quotas"},
      {id:"ch2-4",label:"2.4 Prompt Caching & Structured Outputs"},
      {id:"ch3-1",label:"3.1 Python & TS SDK Quickstart"},
      {id:"ch3-2",label:"3.2 Industrial Function Calling"},
      {id:"ch3-3",label:"3.3 X Native Search Integration"},
      {id:"ch3-4",label:"3.4 Multi-Agent Swarm Architecture"},
      {id:"ch3-5",label:"3.5 Project: PR Audit & Sentiment Bot"},
      {id:"ch4-1",label:"4.1 Grok Unique Philosophy & Unshackling"},
      {id:"ch4-2",label:"4.2 Chain of Thought & Counterfactuals"},
      {id:"ch4-3",label:"4.3 10 Industrial Prompt Templates",quick:true,quickLabel:"Grok Prompt Library"},
      {id:"ch5-1",label:"5.1 API Error 30s Emergency Room",quick:true,quickLabel:"Grok API Clinic"},
      {id:"ch5-2",label:"5.2 Hallucination & Sybil Defense"},
      {id:"ch5-3",label:"5.3 2026 Frontier LLM Comparison Matrix"},
      {id:"ch6-1",label:"6.1 Official Sources & Tools Index"},
      {id:"ch6-2",label:"6.2 4-Stage Mastery Roadmap"}
    ]
  },
  {
    href: "topics/docker/01-intro.en.html", icon: "🐳", tag: "Ops Foundation", color: "#0284c7",
    title: "Docker Zero-to-Hero Interactive Guide",
    desc: "From concept ice-breaking, the Three Musketeers, Dockerfile magic, data persistence to Compose microservices. Expanded to a 35-lesson in-depth illustrated column, holding your hand to eliminate errors.",
    keywords: "docker container image registry dockerfile compose deployment microservices environment basics zero-basis tutorial volume wsl2 network cgroups healthcheck multi-stage",
    meta: ["35 In-Depth Lessons", "Mermaid Diagrams", "Pitfall Rescue Room", "Verified 2026-08-17"],
    sections: [
      {id:"",label:"Stage 1: Concept Ice-Breaking (01-04)"},
      {id:"",label:"Stage 2: Setup & Pitfalls (05-08)"},
      {id:"",label:"Stage 3: Container Management & Resource Limits (09-14)"},
      {id:"",label:"Stage 4: Image Customization & Multi-Stage Builds (15-21)"},
      {id:"",label:"Stage 5: Data Persistence & Backup (22-25)"},
      {id:"",label:"Stage 6: Network Exploration & Compose (26-31)"},
      {id:"",label:"Stage 7: Security Guardrails & Production Deploy (32-35)"}
    ]
  }
];
