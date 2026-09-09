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
    href: "topics/pencil-docs-zh.en.html", icon: "📘", tag: "Design & creation", color: "#5b5bf6",
    title: "Pencil documentation",
    desc: "Covers all 16 pages of docs.pencil.dev, including official videos and images, with links to the original text in each section.",
    keywords: "pencil design pen files components variables shortcuts installation activation import export cli canvas",
    meta: ["16 pages", "Includes official videos", "Verified 2026-08-17"],
    sections: [
      {"id":"installation","label":"Installation"},
      {"id":"authentication","label":"Authentication"},
      {"id":"ai-integration","label":"AI Integration"},
      {"id":"pen-files","label":".pen Files"},
      {"id":"design-as-code","label":"Design as Code"},
      {"id":"interface","label":"pen.dev Interface"},
      {"id":"variables","label":"Variables"},
      {"id":"components","label":"Components"},
      {"id":"slots","label":"Slots"},
      {"id":"code-on-canvas","label":"Code on Canvas"},
      {"id":"design-libraries","label":"Design Libraries"},
      {"id":"import-export","label":"Import & Export"},
      {"id":"shortcuts","label":"Keyboard Shortcuts"},
      {"id":"design-to-code","label":"Design ↔ Code"},
      {"id":"troubleshooting","label":"Troubleshooting"},
      {"id":"pen-format","label":"The .pen Format"},
      {"id":"pencil-cli","label":"pen.dev CLI"}
    ]
  },
  {
    href: "topics/pencil-claude-code-best-practices.en.html", icon: "⚡", tag: "Design & creation", color: "#0ea5e9",
    title: "Pencil × Claude Code",
    desc: "Aggregates 9+ sources: 4 core workflows, prompt templates, design system engineering, CI/CD, pitfalls, and real cases (with 16 screenshots).",
    keywords: "pencil claude workflow prompt design system pitfalls cases best practices",
    meta: ["9+ Sources", "16 Screenshots", "Verified 2026-08-17"],
    sections: [
      {"id":"intro","label":"Why pen.dev + Claude Code"},
      {"id":"setup","label":"Standard Environment Setup"},
      {"id":"workflows","label":"Four Core Workflows"},
      {"id":"prompts","label":"Practical Prompt Templates"},
      {"id":"design-system","label":"Design System Engineering"},
      {"id":"prompt-patterns","label":"Efficient Prompt Patterns"},
      {"id":"advanced","label":"Advanced Techniques"},
      {"id":"pitfalls","label":"Pitfalls Checklist"},
      {"id":"cases","label":"Real-world Case Studies"},
      {"id":"resources","label":"Resources & References"}
    ]
  },
  {
    href: "topics/ai-ui-design-collab.en.html", icon: "🎨", tag: "Design & creation", color: "#7c3aed",
    title: "AI & UI design workflows",
    desc: "pen.dev / Figma / Stitch / Galileo / v0 + Claude Code / Codex + Android Jetpack Compose Material 3: Tool map, 3 MCP channels, Android 5-step end-to-end pipeline, Design Token engineering, Paparazzi / Roborazzi visual regression, bi-directional sync, anti-patterns, and prompt library.",
    keywords: "figma pencil.dev stitch galileo v0 claude code codex mcp design token variables compose material3 theme android visual regression paparazzi roborazzi screenshots collaboration design system",
    meta: ["3 Entry Points", "5-Step Android Pipeline", "Paparazzi/Roborazzi Dual Regression", "Verified 2026-08-17"],
    sections: [
      {"id":"intro","label":"Panorama: Why This Suddenly Became \"Must-Do\" in 2026"},
      {"id":"map","label":"Design-Side Tool Map: Five Roles, Don't Choose Wrong"},
      {"id":"consume","label":"consume"},
      {"id":"pipeline","label":"Android End-to-End: Five-Step Pipeline"},
      {"id":"tokens","label":"Figma → Material 3 Token: A Standard Bridge"},
      {"id":"compose","label":"Compose Code Gen & Write-back: AI UI Mod Disciplines"},
      {"id":"verify","label":"Real/Virtual Screenshot Regression: Safety Catch After AI UI Mods"},
      {"id":"sync","label":"Bidirectional Sync: Make the Design System Truly \"Alive\""},
      {"id":"cases","label":"Example: a product detail page"},
      {"id":"antipatterns","label":"Anti-patterns and Pitfalls Checklist"},
      {"id":"prompts","label":"Prompt Template Library (Copy-Pasteable)"},
      {"id":"ios-web","label":"Cross-Platform Rollout: iOS × Web (Copying the Android Pipeline)"},
      {"id":"resources","label":"Resources and Sources Index"}
    ]
  },
  {
    href: "topics/claude-code-guide.en.html", icon: "⛏️", tag: "Coding tools & models", color: "#d9634a",
    title: "Claude Code guide",
    desc: "5 Golden Rules, 100+ command cheat sheet, 6 extension selections, 8 major scenario playbooks, permissions, security, and out-of-the-box template library.",
    keywords: "claude code commands shortcuts skills hooks mcp subagents context permissions config templates prompts claude.md slash commands",
    meta: ["100+ Commands", "8 Major Scenarios", "5 Templates", "Based on v2.1.x", "Verified 2026-08-17"],
    sections: [
      {"id":"mental-model","label":"Everything Revolves Around Context"},
      {"id":"golden-rules","label":"Five Golden Rules"},
      {"id":"whats-new","label":"Recent Important Changes"},
      {"id":"setup","label":"Setup and Initial Configuration"},
      {"id":"commands","label":"Commands Quick Reference","quick":true,"quickLabel":"Claude Code Command Reference"},
      {"id":"shortcuts","label":"Shortcuts and Input Tips"},
      {"id":"extensions","label":"How to Choose Among the Six Extensions"},
      {"id":"skills-hooks","label":"Skills / Hooks / MCP / Subagents: In-Depth on the Core Four"},
      {"id":"subscription-quotas","label":"Plans, APIs, and context"},
      {"id":"vision-artifacts-guide","label":"Artifacts and computer-use boundaries"},
      {"id":"playbook","label":"Eight Core Scenarios Playbook"},
      {"id":"context","label":"Advanced Context Management"},
      {"id":"permissions","label":"Permissions and Security"},
      {"id":"config-auth","label":"Complete Guide to Configuration and Accounts"},
      {"id":"ecosystem","label":"Ecosystem Highlights: Methodologies, Tools, and Workflows"},
      {"id":"pitfalls","label":"Checklist of Pitfalls"},
      {"id":"templates","label":"Out-of-the-Box Template Library"},
      {"id":"hidden-config","label":"Verify capabilities with official help"},
      {"id":"resources","label":"Resource Index"}
    ]
  },
  {
    href: "topics/codex-guide.en.html", icon: "🟢", tag: "Coding tools & models", color: "#0d9373",
    title: "Codex guide",
    desc: "OpenAI Coding Agent Panorama: 20+ subcommands and 40+ slash commands cheat sheet, sandbox & approval 3×3 matrix, 4 goal-oriented learning paths, selection prisms, 4-stage long task discipline, memory closeout loop, browser E2E acceptance, Issue-to-PR workflow, Skills/MCP, and dual-agent collaboration with Claude Code.",
    keywords: "codex openai sandbox approvals agents.md cloud commands collaboration gpt selection prisms learning paths four stages memory system e2e browser acceptance github issue pr tdd wsl performance tuning",
    meta: ["5 Forms", "3×3 Sandbox Matrix", "4-Stage Long Tasks", "E2E Browser Testing", "Dual-Agent Synergy"],
    sections: [
      {"id":"overview","label":"Codex Overview & Selection Prisms"},
      {"id":"learning-paths","label":"4 Goal-Oriented Learning Paths"},
      {"id":"setup","label":"Setup & Platform Tuning"},
      {"id":"whats-new","label":"Recent Updates & Breaking Changes"},
      {"id":"commands","label":"Command Cheat Sheet","quick":true,"quickLabel":"Codex Command Reference"},
      {"id":"sandbox","label":"3×3 Sandbox & Approval Matrix"},
      {"id":"methodology","label":"Core Methodology & 8 Anti-Patterns"},
      {"id":"long-tasks","label":"Long Tasks & 4-Stage Separation"},
      {"id":"memory-system","label":"Task Closeout & Memory Loop"},
      {"id":"skills-mcp","label":"Skills, MCP & Browser Engineering"},
      {"id":"config-auth","label":"Configuration & Accounts"},
      {"id":"best-practices","label":"Task and acceptance template"},
      {"id":"subscription-quotas","label":"Plans, APIs, and context"},
      {"id":"image-guide","label":"Image work has its own guide"},
      {"id":"playbook","label":"Automated Pipelines & Playbook"},
      {"id":"hidden-config","label":"Verify local capabilities"},
      {"id":"resources","label":"Resource Index & Further Reading"}
    ]
  },
  {
    href: "topics/gpt-image-guide.en.html", icon: "🎨", tag: "Design & creation", color: "#7c3aed",
    title: "GPT image generation",
    desc: "Comprehensive image generation guide for GPT subscribers: Complete evolution from DALL-E to GPT-4o native image and Image 2.5, Six-Element Prompt Framework, 15+ scenario templates, style vocabulary, image editing loop, text rendering guide, competitive comparison, and enterprise compliance.",
    keywords: "image generation dall-e gpt-4o prompt style text rendering image editing transparent background png ghibli pixel art logo design ui ecommerce product infographic social media stickers copyright safety midjourney stable diffusion comparison character consistency seed custom gpt image 2.0 2.5",
    meta: ["4 Generations Evolution", "Six-Element Framework", "15+ Scenario Templates", "100+ Sources Aggregated", "Verified 2026-09-09"],
    sections: [
      {"id":"evolution","label":"Image models and interfaces"},
      {"id":"subscription","label":"Check usage and cost"},
      {"id":"prompt-framework","label":"Six-Element Prompt Framework"},
      {"id":"prompt-advanced","label":"Advanced Prompting Techniques"},
      {"id":"style-control","label":"Style Control & Visual Lexicon","quick":true,"quickLabel":"Style Vocabulary Quickref"},
      {"id":"text-rendering","label":"Typography & Text Rendering Strategy"},
      {"id":"image-editing","label":"Image Editing & Iteration Workflows"},
      {"id":"consistency","label":"Character and style consistency"},
      {"id":"scenarios","label":"15+ Production Scenario Templates","quick":true,"quickLabel":"Scenario Prompt Templates"},
      {"id":"expert-tricks","label":"Practical control techniques"},
      {"id":"comparison","label":"Compare tools on the same task"},
      {"id":"safety-copyright","label":"Check before delivery"},
      {"id":"resources","label":"Resource Index & Further Reading"}
    ]
  },
  {
    href: "topics/env-auth-clinic.en.html", icon: "🚑", tag: "Troubleshooting", color: "#e11d48",
    title: "Environment & login help",
    desc: "Fix login errors, config conflicts, and machine-switching issues in one page: 30-second symptom triage, 5-layer diagnostic methodology + one-click health check script, dual-tool 5-category first-aid tables, 3 scenarios (shared PC, new PC, headless/CI), and 3-level universal reset solutions.",
    keywords: "login error environment variables switch computer multi-account shared subscription invalid api key 401 403 429 529 rate limit quota usage limit auth credentials reset fix troubleshoot diagnose keychain proxy ssh container ci token vs code windows node version case study credit balance wsl econnreset timeout",
    meta: ["Symptom Triage", "5-Layer Diagnostics", "3-Tier Reset", "Verified 2026-08-17"],
    sections: [
      {"id":"overview","label":"Symptom Quick Check + Problem Map"},
      {"id":"diagnose","label":"5-Layer Diagnosis + 1-Click Health Check Script"},
      {"id":"claude-cred","label":"Claude Code · Credential Mechanism & Priority"},
      {"id":"claude-config","label":"Claude Code · settings.json Complete Guide: Minimal to Full Dictionary"},
      {"id":"claude-er","label":"Claude Code · Symptom ER Guide"},
      {"id":"codex-cred","label":"Codex · Credential Mechanism & Storage"},
      {"id":"codex-config","label":"Codex · config.toml Complete Guide: Minimal to Full Dictionary"},
      {"id":"codex-er","label":"Codex · Symptom ER Guide"},
      {"id":"shared","label":"Playbook A · Shared Computer / Inheriting a Pre-configured Machine"},
      {"id":"machines","label":"Playbook B · Switching Computers / Multi-Machine Roaming"},
      {"id":"headless","label":"Playbook C · SSH / Containers / Headless / CI"},
      {"id":"cases","label":"Case Studies: From Symptoms to Root Causes"},
      {"id":"reset","label":"Recoverable diagnostics and resets"},
      {"id":"map","label":"Dual Tool Concept Map + Resource Index"}
    ]
  },
  {
    href: "topics/android-crash-anr.en.html", icon: "⚡", tag: "Troubleshooting", color: "#65a30d",
    title: "Android Crash & ANR",
    desc: "From beginner to expert: Crash catalog, ANR anatomy, Native crash triage, full toolchain, GP/Firebase console, tricky issue detective techniques, and AI triage workflow with original crash-triage skill.",
    keywords: "android anr crash stability firebase play console native stack trace logs triage",
    meta: ["12 Progressive Chapters", "20+ Crash Catalog", "Original AI Skill", "Verified 2026-08-17"],
    sections: [
      {"id":"overview","label":"Overview & Methodology"},
      {"id":"read-crash","label":"Lesson 1: Read a Crash"},
      {"id":"crash-catalog","label":"Crash Catalog & Cures"},
      {"id":"anr","label":"Deep Dive into ANR: Tracing from Main Thread Snapshot to the Blocking Source"},
      {"id":"native","label":"Native Crash: From Signal to Source Line"},
      {"id":"toolbox","label":"Toolbox & Usage: Ask Where the Evidence Is First"},
      {"id":"consoles","label":"Play Console & Firebase: Two Lenses on Production Issues"},
      {"id":"device-data","label":"Test Device Data Export: Take the Full Accident Scene With You"},
      {"id":"detective","label":"Intractable Issue Detective Work: Turning the Unobservable into the Verifiable"},
      {"id":"ai-method","label":"AI Integration: Evidence Quality Determines Triage Ceiling"},
      {"id":"ai-workflow","label":"AI Workflows and Original crash-triage Skill"},
      {"id":"governance","label":"Governance System: From Firefighting to Stability Compound Interest"}
    ]
  },
  {
    href: "topics/ai-leverage-guide.en.html", icon: "🧭", tag: "AI fundamentals", color: "#7c3aed",
    title: "Getting started with AI",
    desc: "Aggregated web research: Capability boundary table, 8 major scenario ROI matrix, 5 paradigms (coding, writing, research, data automation, life), 3 tool selections, 7 sourced core mindsets, replicable case studies, and a learning roadmap for everyday people.",
    keywords: "what can ai do efficiency scenarios writing documentation weekly report research learning data analysis automation life mindset prompt pitfalls beginner learn ai choose tools comparison gemini chatgpt claude codex deep research vibe coding",
    meta: ["8 Major Scenarios", "7 Core Mindsets", "7 Real Cases", "Verified 2026-08-17"],
    sections: [
      {"id":"map","label":"Panorama Map: What AI is Good at and What it isn't"},
      {"id":"matrix","label":"Scenario × Benefit Matrix: Where Efficiency Gains Are Greatest"},
      {"id":"coding","label":"Programming Scenario Best Paradigms (Claude Code / Codex)"},
      {"id":"writing","label":"Writing & Documentation Scenario Paradigms"},
      {"id":"research","label":"Research & Learning Scenario Paradigms"},
      {"id":"data-auto","label":"Data & Automation Scenario Paradigms"},
      {"id":"life","label":"Life & Self-Management Scenario Paradigms"},
      {"id":"tools","label":"Choose for task and environment"},
      {"id":"principles","label":"7 Universal Mental Models (Cross-Scenario)"},
      {"id":"cases","label":"Real Cases: One Reproducible Template per Scenario"},
      {"id":"learning-path","label":"Ordinary Person's Learning Path: From Zero to Proficient"},
      {"id":"resources","label":"Resource Index (Sorted by Credibility)"}
    ]
  },
  {
    href: "topics/prompt-context-engineering.en.html", icon: "🎯", tag: "AI fundamentals", color: "#0891b2",
    title: "Prompt & context engineering",
    desc: "Foundational discipline: 7 basic techniques (each with ❌/✅ contrast), multimodal & RAG feed strategies, 3-model prompt nuances, dynamic model routing state of the art, prompt injection & security defense, token economics & caching cost optimization, 6 full rewrite cases, 12 verbatim templates, iteration & versioning, anti-patterns, and layer assignment in CC/Codex.",
    keywords: "prompt context engineering few-shot cot chain of thought xml role prefill json structured outputs system prompt claude.md agents.md compression subagents templates hallucination eval anti-patterns attention multimodal vision rag citations gpt gemini model differences token economics caching cost injection security owasp cases versioning a/b testing model routing litellm routellm cascade",
    meta: ["7 Techniques Contrast", "12 Verbatim Templates", "6 Full Cases", "Model Routing SOTA", "Verified 2026-08-17"],
    sections: [
      {"id":"overview","label":"Overview: From Prompt Engineering to Context Engineering"},
      {"id":"basics","label":"Seven Basic Techniques (each with ❌/✅ contrast)"},
      {"id":"structured","label":"Structured Output & Format Control"},
      {"id":"multimodal","label":"Multimodal Prompts: How to Feed Images/Docs/Screenshots"},
      {"id":"models","label":"Adapt prompts to the model"},
      {"id":"rag","label":"RAG Scenario Prompts: Keeping the Model Honest to Retrieved Materials"},
      {"id":"context","label":"Core of Context Engineering: Attention is a Scarce Resource"},
      {"id":"agentic","label":"Agentic Context: Keeping Long Tasks from \"Amnesia\""},
      {"id":"cost","label":"Token Economics and Cost Control: Organizing Context to Save Money"},
      {"id":"routing","label":"Model routing: evaluate first"},
      {"id":"security","label":"Prompt Injection and Security Defenses"},
      {"id":"cases","label":"Case Studies: 6 Full Rewrite Processes"},
      {"id":"templates","label":"Word-for-Word Template Library (12 Forms, Copy & Tweak to Use)"},
      {"id":"eval","label":"Evaluation, Iteration and Versioning: Don't change prompts based on feelings"},
      {"id":"antipatterns","label":"Anti-pattern Bestiary: The Most Widespread Prompt Placebos"},
      {"id":"tools","label":"Where to Put What in Claude Code / Codex"},
      {"id":"resources","label":"Resource Index"}
    ]
  },
  {
    href: "topics/ai-capability-expansion.en.html", icon: "🧗", tag: "AI fundamentals", color: "#ea580c",
    title: "Extending AI capabilities",
    desc: "Not about a specific tech stack, but a universal methodology to expand your technical boundaries using AI: Gap diagnosis → AI speed learning → Scaffold startup → Validation loop → Deepen & precipitate. Includes cross-domain mapping techniques and two end-to-end cases (Full-stack cross-platform / Tech indie dev).",
    keywords: "full-stack transition expansion boundary mobile android ios web backend server indie developer solopreneur one-person company learning method methodology cross-domain mapping",
    meta: ["5-Step Methodology", "2 End-to-End Cases", "Cross-Domain Mapping", "Verified 2026-08-17"],
    sections: [
      {"id":"mindset","label":"Cognitive Framework"},
      {"id":"engine","label":"General Methodology: 5-Step Expansion Engine"},
      {"id":"mapping","label":"Cross-Domain Mapping Technique"},
      {"id":"case-studies","label":"End-to-End Deep Cases"},
      {"id":"indie","label":"Technical Solo Company / Indie Hacker"},
      {"id":"learning-system","label":"AI-Assisted Learning System"},
      {"id":"pitfalls","label":"Pitfalls and Mental Models"},
      {"id":"resources","label":"Resource Library"}
    ]
  },
  {
    href: "topics/toolchain-changelog.en.html", icon: "📅", tag: "Changelog", color: "#b45309",
    title: "AI tools changelog",
    desc: "Version updates for Claude Code and Codex, only including changes that affect usage habits: breaking changes indexed separately (check here first if issues occur after upgrading), behavior changes and new features categorized, monthly archives, with official sources and local check commands.",
    keywords: "update changes version changelog release notes upgrade breaking change new features deprecated migration opus 5 sonnet 5 gpt-5.6 subtask fork permission mode manual latest timing",
    meta: ["Breaking Changes Index", "Monthly Archive", "3-Level Categories", "Verified 2026-08-17"],
    sections: [
      {"id":"how-to-read","label":"How to use release notes"},
      {"id":"breaking","label":"Verified Codex flag behavior","quick":true,"quickLabel":"Breaking Changes Lookup"},
      {"id":"m2026-09","label":"Official release sources"},
      {"id":"method","label":"Upgrade and rollback checks"}
    ]
  },
  {
    href: "topics/ops-basics.en.html", icon: "🛠️", tag: "Engineering basics", color: "#a16207",
    title: "Servers, networking & deployment",
    desc: "For indie devs who only used Vercel / Netlify / Cloudflare Pages to cross the DevOps wall: 5-stage roadmap + 3 modules (Linux/Network/Deploy) of 24 lessons (Network module is 13-lesson detailed edition: VPN/Ports/Localhost/NAT/HTTP3/IPv6), plus 5 troubleshooting 30-sec tables. After this, you can independently manage a medium project's server.",
    keywords: "server operations deployment network linux vps ssh systemd nginx reverse proxy https tls ssl certbot let's encrypt dns firewall ufw security group github actions ci cd process hosting ports package manager apt dnf apk permissions sudo chmod chown docker container keys env environment variables troubleshooting 502 504 ssh connection failed disk full oom ssl expired pitfalls indie developer full-stack basics 101 foundation",
    meta: ["5-Stage Roadmap", "3 Modules 24 Lessons", "13-Lesson Network", "5 Troubleshooting Tables", "Verified 2026-08-17"],
    sections: [
      {"id":"intro","label":"Why Learn This"},
      {"id":"roadmap","label":"Five-Stage Roadmap"},
      {"id":"stage1","label":"R1 · Status Inventory"},
      {"id":"stage2","label":"R2 · Linux Foundation"},
      {"id":"stage3","label":"R3 · Network Backbone"},
      {"id":"stage4","label":"R4 · Deployment Pipeline"},
      {"id":"stage5","label":"R5 · Troubleshooting"},
      {"id":"m1-1","label":"1.1 What is a \"Server\""},
      {"id":"m1-2","label":"1.2 Three Abstract Concepts: File System, Processes, Ports"},
      {"id":"m1-3","label":"1.3 SSH is Not Just \"Remote Login\""},
      {"id":"m1-4","label":"1.4 Package Manager Cheat Sheet"},
      {"id":"m1-5","label":"1.5 Permissions and Users"},
      {"id":"m2-1","label":"2.1 One Picture to Understand HTTP → TCP → IP → Network Card"},
      {"id":"m2-2","label":"2.2 DNS Complete Picture: How directory assistance works"},
      {"id":"m2-3","label":"2.3 HTTPS / TLS / Let's Encrypt"},
      {"id":"m2-4","label":"2.4 Reverse Proxy: Why Nginx is the Swiss Army Knife"},
      {"id":"m2-5","label":"2.5 Firewall: Why 80/443 work but others don't"},
      {"id":"m2-6","label":"2.6 Common Attack Vectors Cheat Sheet"},
      {"id":"m2-7","label":"2.7 Ports Explained: Apartment Numbers"},
      {"id":"m2-8","label":"2.8 Local Services: 127.0.0.1 vs 0.0.0.0"},
      {"id":"m2-9","label":"2.9 VPN and Proxy: Differentiating four \"bypass\" postures"},
      {"id":"m2-10","label":"2.10 Public / Private Network / NAT: The Security Guard's Job"},
      {"id":"m2-11","label":"2.11 Network Debugging Commands Family Portrait: Troubleshooting Toolbox"},
      {"id":"m2-12","label":"2.12 HTTP/2 and HTTP/3 Evolution: Why upgrade protocols"},
      {"id":"m2-13","label":"2.13 IPv6 Primer: 128-bit addresses, enough for every grain of sand"},
      {"id":"m3-1","label":"3.1 7-Step Deployment Pipeline"},
      {"id":"m3-2","label":"3.2 systemd Process Hosting: Stop Node from dying when SSH closes"},
      {"id":"m3-3","label":"3.3 Nginx Reverse Proxy Practical Configuration Template"},
      {"id":"m3-4","label":"3.4 Docker Minimum Essential Set"},
      {"id":"m3-5","label":"3.5 GitHub Actions Auto-Deployment"},
      {"id":"m3-6","label":"3.6 Environment Variables / Secrets Management / The right way to use .env"},
      {"id":"appA","label":"5 Types of Failures 30-Second Remedy Table","quick":true,"quickLabel":"30-Sec Troubleshooting"},
      {"id":"appB","label":"Recommended Resources"},
      {"id":"appC","label":"Glossary Cheat Sheet"}
    ]
  },
  {
    href: "topics/google-ai-ecosystem.en.html", icon: "🌐", tag: "Coding tools & models", color: "#1a73e8",
    title: "Google AI ecosystem",
    desc: "Latest comprehensive guide: Google Antigravity (CLI/2.0/IDE/SDK/Customizations/Sandbox) deep deconstruction + NotebookLM knowledge research + AI Studio 2M context + 5-step super pipeline best practices.",
    keywords: "google antigravity agy notebooklm ai studio gemini canvas sketch agents agentic cli ide sdk slash commands subagent planning mode sandbox python sdk source grounding 2m context podcast generation pipeline",
    meta: ["4 Interaction Forms", "26 Chapters", "Antigravity Deconstruction", "5-Step Pipeline", "Verified 2026-08-17"],
    sections: [
      {"id":"intro","label":"Choose tools by task"},
      {"id":"ch1-1","label":"API access and model selection"},
      {"id":"ch1-2","label":"Caching: measure hits and total cost"},
      {"id":"ch1-3","label":"Structured output and validation","quick":true,"quickLabel":"Structured Outputs Guide"},
      {"id":"ch2-1","label":"NotebookLM: citations and verification"},
      {"id":"ch2-2","label":"Prepare useful sources"},
      {"id":"ch2-3","label":"Audio overviews and learning"},
      {"id":"ch3-1","label":"Canvas and visual prototypes"},
      {"id":"ch4-1","label":"Antigravity: move into implementation"},
      {"id":"ch5-1","label":"From sources to working code"}
    ]
  },
  {
    href: "topics/antigravity-usage.en.html", icon: "🛸", tag: "Coding tools & models", color: "#8b5cf6",
    title: "Antigravity guide",
    desc: "Google Agentic programming infrastructure handbook: CLI subcommands, Agentic IDE interaction, .agents customizations, Subagents orchestration, MCP tool extensions, and sandbox defense in practice.",
    keywords: "antigravity agy ide cli sdk google gemini subagents mcp custom skill rule plugin sandbox bypass reactive wakeup",
    meta: ["4 Forms", "10 Core Chapters", "Subagent Isolation", "Verified 2026-08-17"],
    sections: [
      {"id":"sec1","label":"Choose a surface"},
      {"id":"sec2","label":"Install and sign in"},
      {"id":"sec3","label":"Everyday CLI operations","quick":true,"quickLabel":"AGY Commands Cheat Sheet"},
      {"id":"sec4","label":"Settings and extensions"},
      {"id":"sec5","label":"Background and headless work"},
      {"id":"sec7","label":"Permissions, sandbox, and usage"},
      {"id":"sec8","label":"Troubleshoot by symptom","quick":true,"quickLabel":"AGY Emergency Room"},
      {"id":"sec9","label":"A verifiable task workflow"}
    ]
  },
  {
    href: "topics/grok-ecosystem-guide.en.html", icon: "𝕏", tag: "Coding tools & models", color: "#d97706",
    title: "Grok & xAI guide",
    desc: "The most hardcore practical guide: Memphis Colossus 200k supercluster + Grok 3/4 reasoning matrix + Grok Build cloud sandbox IDE + Python/TS SDK structured outputs + Real-Time X Grounding + 10 industrial-grade Prompt templates.",
    keywords: "xai grok grok3 grok4 grokbuild build colossus x search grounding think deepsearch reasoning function calling prompt caching agent swarm memphis",
    meta: ["Memphis 200k Supercluster", "Grok Build Cloud Sandbox", "Real-Time X", "10 Prompt Templates", "Verified 2026-08-17"],
    sections: [
      {"id":"intro","label":"Four surfaces and their uses"},
      {"id":"ch1-1","label":"Choose and evaluate models"},
      {"id":"ch1-2","label":"X search and fact checking","quick":true,"quickLabel":"Real-Time X Search Guide"},
      {"id":"ch1-3","label":"Define and verify research"},
      {"id":"ch2-1","label":"Grok Bot: ongoing roles"},
      {"id":"ch2-3","label":"Shared computers and authorization"},
      {"id":"ch2-4","label":"Skills and routines"},
      {"id":"ch3-1","label":"Grok Build: terminal coding"},
      {"id":"ch3-3","label":"API access, caching, and billing"},
      {"id":"ch4-2","label":"Tool calls require validation"},
      {"id":"ch4-4","label":"Example: research and review"},
      {"id":"ch5-3","label":"Reusable task brief"},
      {"id":"ch6-1","label":"Errors and diagnostic order"},
      {"id":"sub-quotas","label":"Plans and usage"},
      {"id":"grok-imagine","label":"Images and video"},
      {"id":"ch7-1","label":"Sources and learning order"}
    ]
  },
  {
    href: "topics/docker/01-intro.en.html", icon: "🐳", tag: "Engineering basics", color: "#0284c7",
    title: "Docker: basics to deployment",
    desc: "From concept ice-breaking, the Three Musketeers, Dockerfile magic, data persistence to Compose microservices. Expanded to a 35-lesson in-depth illustrated column, holding your hand to eliminate errors.",
    keywords: "docker container image registry dockerfile compose deployment microservices environment basics zero-basis tutorial volume wsl2 network cgroups healthcheck multi-stage",
    meta: ["35 In-Depth Lessons", "Mermaid Diagrams", "Pitfall Rescue Room", "Verified 2026-08-17"],
    sections: [
      {"id":"","href":"topics/docker/01-intro.en.html","label":"01. Prologue: Xiao Ming's Dilemma"},
      {"id":"","href":"topics/docker/02-what-is-docker.en.html","label":"02. Understanding Docker via \"Moving House\""},
      {"id":"","href":"topics/docker/03-vm-vs-container.en.html","label":"03. Dimensional Strike: VM vs Container"},
      {"id":"","href":"topics/docker/04-core-components.en.html","label":"04. Illustrated Core Trio Architecture"},
      {"id":"","href":"topics/docker/05-windows-setup.en.html","label":"05. Windows Pitfall Avoidance Guide"},
      {"id":"","href":"topics/docker/06-mac-linux-setup.en.html","label":"06. Mac & Linux Setup Playbook"},
      {"id":"","href":"topics/docker/07-registry-mirror.en.html","label":"07. Registry Mirrors: Speed Up Pulls"},
      {"id":"","href":"topics/docker/08-hello-world.en.html","label":"08. Secrets Behind the First Magic Line"},
      {"id":"","href":"topics/docker/09-run-detached.en.html","label":"09. Running an Nginx Website in the Background"},
      {"id":"","href":"topics/docker/10-lifecycle-cmds.en.html","label":"10. Mastering Life and Death (State Machine)"},
      {"id":"","href":"topics/docker/11-exec-into.en.html","label":"11. Breaking In: Stepping Inside the Container"},
      {"id":"","href":"topics/docker/12-logs-detective.en.html","label":"12. Detective View: How to Inspect Logs"},
      {"id":"","href":"topics/docker/13-resource-limits.en.html","label":"13. Resource Shackles: Preventing OOM Crashes"},
      {"id":"","href":"topics/docker/14-healthcheck.en.html","label":"14. Health Checks: Container Self-Diagnosis"},
      {"id":"","href":"topics/docker/15-why-dockerfile.en.html","label":"15. Farewell to Manual Setup"},
      {"id":"","href":"topics/docker/16-dockerfile-syntax.en.html","label":"16. Dockerfile Syntax Comprehensive Guide"},
      {"id":"","href":"topics/docker/17-dockerignore.en.html","label":"17. .dockerignore Pitfall Avoidance Guide"},
      {"id":"","href":"topics/docker/18-build-practice.en.html","label":"Lesson 18: Hands-on: Packaging a Web App"},
      {"id":"","href":"topics/docker/19-layer-caching.en.html","label":"Lesson 19: Illustrated: Layer Caching Magic (Crucial!)"},
      {"id":"","href":"topics/docker/20-frontend-deploy.en.html","label":"Lesson 20: Graceful Vue / React Deployment"},
      {"id":"","href":"topics/docker/21-multi-stage.en.html","label":"Lesson 21: Ultimate Slimming: Multi-Stage Builds"},
      {"id":"","href":"topics/docker/22-ephemeral-data.en.html","label":"Lesson 22: Ephemeral Containers & Lost Data"},
      {"id":"","href":"topics/docker/23-volumes.en.html","label":"Lesson 23: Ultimate Lifesaver: Docker Volumes"},
      {"id":"","href":"topics/docker/24-bind-mounts.en.html","label":"Lesson 24: Dev Superpower: Bind Mounts"},
      {"id":"","href":"topics/docker/25-volume-backup.en.html","label":"Lesson 25: Vault Migration: Volume Backups"},
      {"id":"","href":"topics/docker/26-network-types.en.html","label":"Lesson 26: Network Deep Dive: Bridge & Host"},
      {"id":"","href":"topics/docker/27-container-network.en.html","label":"27. Container Matchmaking: Farewell to Hardcoded IPs, Call Me by My Name"},
      {"id":"","href":"topics/docker/28-why-compose.en.html","label":"28. Why Do We Need Compose? Farewell to the Thousand-Line Command Nightmare"},
      {"id":"","href":"topics/docker/29-yaml-syntax.en.html","label":"29. YAML Syntax Crash Course: The Art of Indentation"},
      {"id":"","href":"topics/docker/30-compose-up-part1.en.html","label":"30. Ultimate Battle (Part 1): The Web + Cache Compose Carnival"},
      {"id":"","href":"topics/docker/31-compose-up-part2.en.html","label":"31. Ultimate Battle (Part 2): Microservice Networks"},
      {"id":"","href":"topics/docker/32-env-security.en.html","label":"32. The Moat: Protecting Passwords with .env"},
      {"id":"","href":"topics/docker/33-system-prune.en.html","label":"33. Space Cleanup: Conquering \"No space left on device\""},
      {"id":"","href":"topics/docker/34-production-root.en.html","label":"34. Production Redline: Never Run as Root in Production"},
      {"id":"","href":"topics/docker/35-cicd-concept.en.html","label":"35. Finale: Automated CI/CD Pipelines"}
    ]
  }
];
