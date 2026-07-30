/* ============================================================
   AI 知识库 · 主题注册表(唯一数据源)
   新增主题三步:
   1. 把主题 HTML 放进 topics/(引用 ../assets/css/site.css 与
      ../assets/js/site.js 即自动获得全站统一交互)
   2. 在下方 TOPICS 追加一个对象
   3. 完成 —— 首页卡片、章节快链、全站搜索自动生效
   ============================================================ */
/* ------------------------------------------------------------
   精选外部学习站(在精不在多):首页「精选学习站」区块 + 全站搜索共用。
   featured: true 的条目置顶通栏突出显示。
   ------------------------------------------------------------ */
const LEARN = [
  {
    href: "https://coding.stormzhang.ai/", icon: "🎓", tag: "中文 · 系统教程", color: "#f59e0b", featured: true,
    title: "AI 编程指南(stormzhang)",
    desc: "92 篇小白友好的系统教程:Claude Code 53 篇 + Codex 39 篇,GitHub 开源、持续维护。入门首选——跟着一篇篇走完即可;与本库互补:入门跟它走,日常查这里。",
    links: [
      { label: "Claude Code 篇(53 篇)→", href: "https://coding.stormzhang.ai/claude-code/01-what-is-claude-code" },
      { label: "Codex 篇(39 篇)→", href: "https://coding.stormzhang.ai/codex/01-what-is-codex" },
      { label: "GitHub 仓库", href: "https://github.com/stormzhang/ai-coding-guide" }
    ]
  },
  {
    href: "https://code.claude.com/docs", icon: "📖", tag: "官方 · 第一信源", color: "#d9634a",
    title: "Claude Code 官方文档",
    desc: "一切争议以它为准。Best practices 一页值得逐字精读;/release-notes 跟进每周新特性。",
    links: [ { label: "Best Practices →", href: "https://code.claude.com/docs/en/best-practices" } ]
  },
  {
    href: "https://developers.openai.com/codex", icon: "📗", tag: "官方 · 第一信源", color: "#0d9373",
    title: "Codex 官方文档",
    desc: "CLI / IDE / Cloud 全形态权威参考;Config 与 Authentication 两章最常回查。",
    links: [ { label: "Best Practices →", href: "https://developers.openai.com/codex/learn/best-practices" } ]
  },
  {
    href: "https://blakecrosley.com/guides/claude-code", icon: "🧭", tag: "英文 · 实战通关", color: "#6366f1",
    title: "Blake Crosley Guides",
    desc: "Claude Code 与 Codex 各一篇长文通关:Hooks / MCP / Skills 讲得最透的单页,示例即抄即用。",
    links: [ { label: "Codex 篇 →", href: "https://blakecrosley.com/guides/codex" } ]
  },
  {
    href: "https://github.com/hesreallyhim/awesome-claude-code", icon: "⭐", tag: "资源枢纽", color: "#64748b",
    title: "awesome-claude-code",
    desc: "社区最全精选清单:技能、钩子、子代理、工作流与工具,顺藤摸瓜能找到一切。"
  }
];

/* ------------------------------------------------------------
   学习路径:把主题串成课程表,首页「学习路径」区块渲染。
   step 可用 ext: true 标记外站。
   ------------------------------------------------------------ */
const PATHS = [
  {
    icon: "🌱", color: "#0d9373", title: "新手起步",
    desc: "从零认识 AI 能干什么,到装好工具跑通第一个任务",
    steps: [
      { label: "AI 能干什么 · 全景与心法", href: "topics/ai-leverage-guide.html", note: "先建认知:场景、边界、七条心法" },
      { label: "提示词与上下文工程", href: "topics/prompt-context-engineering.html", note: "会说话才有产出:七技法 + 12 式模板 + 6 个案例" },
      { label: "stormzhang 系统教程(外站)", href: "https://coding.stormzhang.ai/", note: "92 篇小白教程,装好第一个工具", ext: true },
      { label: "Claude Code 指南 · 安装与配置", href: "topics/claude-code-guide.html#setup", note: "命令、权限、模板逐步上手" },
      { label: "环境急救手册(收藏备查)", href: "topics/env-auth-clinic.html", note: "登录报错时 30 秒对症自救" }
    ]
  },
  {
    icon: "⚙️", color: "#d9634a", title: "工具精通",
    desc: "把 Claude Code 与 Codex 用到专业水准,双代理协同",
    steps: [
      { label: "Claude Code 指南 · 干货版", href: "topics/claude-code-guide.html", note: "五条黄金法则 → 八大场景实战" },
      { label: "Codex 指南 · CLI × IDE × Cloud", href: "topics/codex-guide.html", note: "沙箱审批、云端任务、双代理协同" },
      { label: "pen.dev × Claude Code 实践", href: "topics/pencil-claude-code-best-practices.html", note: "设计到代码的完整流水线" },
      { label: "上下文工程与反模式(内功)", href: "topics/prompt-context-engineering.html#context", note: "注意力预算、长任务三板斧、安全与成本、鉴别偏方" }
    ]
  },
  {
    icon: "🧗", color: "#ea580c", title: "AI 能力扩展",
    desc: "用 AI 扩展技术能力边界:方法论 + 两条端到端案例",
    steps: [
      { label: "五步扩展引擎:通用方法论", href: "topics/ai-capability-expansion.html#engine", note: "诊断差距→AI 知识速通→脚手架起步→验证闭环→深化沉淀" },
      { label: "跨域映射技法", href: "topics/ai-capability-expansion.html#mapping", note: "把已会的心智模型喂给 AI,自动标出新概念" },
      { label: "端到端案例:选一条深入读", href: "topics/ai-capability-expansion.html#case-studies", note: "全栈跨端,或前端到后端与服务端" },
      { label: "技术型一人公司", href: "topics/ai-capability-expansion.html#indie", note: "从能写代码到能上线赚钱" }
    ]
  }
];

const TOPICS = [
  {
    href: "topics/pencil-docs-zh.html", icon: "📘", tag: "设计与文档", color: "#5b5bf6",
    title: "pen.dev 官方文档 · 中文完整指南",
    desc: "覆盖 docs.pencil.dev 全部 16 个页面,含官方视频与配图,每节附原文链接。",
    keywords: "pencil 设计 pen 文件 组件 变量 快捷键 安装 激活 导入 导出 cli 画布",
    meta: ["16 个页面", "含官方视频", "基于 2026-07-27 版"],
    sections: [
      {id:"home",label:"文档首页"},{id:"installation",label:"安装"},
      {id:"authentication",label:"认证与激活"},{id:"ai-integration",label:"AI 集成"},
      {id:"pen-files",label:".pen 文件"},{id:"design-as-code",label:"设计即代码"},
      {id:"interface",label:"pen.dev 界面"},{id:"variables",label:"变量"},
      {id:"components",label:"组件"},{id:"slots",label:"插槽 Slots"},
      {id:"code-on-canvas",label:"画布上的代码"},{id:"design-libraries",label:"设计库"},
      {id:"import-export",label:"导入与导出"},{id:"shortcuts",label:"键盘快捷键"},
      {id:"design-to-code",label:"设计 ↔ 代码"},{id:"troubleshooting",label:"故障排查"},
      {id:"pen-format",label:".pen 文件格式"},{id:"pencil-cli",label:"pen.dev CLI"}
    ]
  },
  {
    href: "topics/pencil-claude-code-best-practices.html", icon: "⚡", tag: "设计与文档", color: "#0ea5e9",
    title: "pen.dev × Claude Code 最佳实践全景",
    desc: "聚合 9+ 来源:四种核心工作流、提示词模板、设计系统工程化、CI/CD 玩法、避坑与真实案例(附实测截图)。",
    keywords: "pencil claude 工作流 提示词 prompt 设计系统 避坑 案例 最佳实践",
    meta: ["9+ 来源", "16 张实测截图", "2026-07 聚合"],
    sections: [
      {id:"intro",label:"为什么是这对组合"},{id:"setup",label:"环境搭建标准流程"},
      {id:"workflows",label:"四种核心工作流"},{id:"prompts",label:"实战提示词范例集"},
      {id:"design-system",label:"设计系统工程化"},{id:"prompt-patterns",label:"高效提示词模式"},
      {id:"advanced",label:"高级玩法"},{id:"pitfalls",label:"避坑清单"},
      {id:"cases",label:"真实案例研究"},{id:"resources",label:"资源与来源索引"}
    ]
  },
  {
    href: "topics/claude-code-guide.html", icon: "⛏️", tag: "使用指南", color: "#d9634a",
    title: "Claude Code 使用指南 · 干货版",
    desc: "五条黄金法则、100+ 命令速查、六大扩展选型、八大场景实战手册、权限安全与开箱模板库。",
    keywords: "claude code 命令 快捷键 skills hooks mcp 子代理 上下文 权限 配置 模板 提示词 claude.md 斜杠命令",
    meta: ["100+ 命令收录", "8 大场景", "5 套模板", "基于 v2.1.x"],
    sections: [
      {id:"mental-model",label:"一切围绕上下文"},{id:"golden-rules",label:"五条黄金法则"},
      {id:"whats-new",label:"近期重要变化"},
      {id:"setup",label:"安装与首次配置"},{id:"commands",label:"命令速查手册",quick:true,quickLabel:"Claude Code 命令速查"},
      {id:"shortcuts",label:"快捷键与输入技巧"},{id:"extensions",label:"六大扩展怎么选"},
      {id:"skills-hooks",label:"Skills / Hooks / MCP / 子代理"},{id:"playbook",label:"八大场景实战手册"},
      {id:"context",label:"上下文管理进阶"},{id:"permissions",label:"权限与安全"},
      {id:"config-auth",label:"配置与账号全解"},{id:"ecosystem",label:"生态精选:方法论与组合拳"},
      {id:"pitfalls",label:"避坑清单"},{id:"templates",label:"开箱即用模板库"},
      {id:"hidden-config",label:"隐藏能力与彩蛋配置"},
      {id:"resources",label:"资源索引"}
    ]
  },
  {
    href: "topics/codex-guide.html", icon: "🟢", tag: "使用指南", color: "#0d9373",
    title: "Codex 使用指南 · CLI × IDE × Cloud",
    desc: "OpenAI 编码代理全景:20+ 子命令与 40+ 斜杠命令速查、沙箱与审批 3×3 详解、AGENTS.md、Skills/MCP,以及与 Claude Code 的协同打法。",
    keywords: "codex openai 沙箱 审批 agents.md 云端 cloud 命令 协同 gpt",
    meta: ["5 种形态", "沙箱 3 档详解", "双代理协同", "基于 0.14x"],
    sections: [
      {id:"overview",label:"Codex 全景"},{id:"setup",label:"安装与登录"},
      {id:"whats-new",label:"近期重要变化"},
      {id:"commands",label:"命令速查手册",quick:true,quickLabel:"Codex 命令速查"},{id:"sandbox",label:"沙箱与审批"},
      {id:"agents-md",label:"AGENTS.md 与记忆"},{id:"skills-mcp",label:"Skills / 插件 / MCP"},
      {id:"config-auth",label:"配置与账号全解"},
      {id:"cloud",label:"云端与多形态"},{id:"playbook",label:"实战场景手册"},
      {id:"pitfalls",label:"避坑与协同"},{id:"hidden-config",label:"隐藏能力与彩蛋配置"},
      {id:"resources",label:"资源索引"}
    ]
  },
  {
    href: "topics/env-auth-clinic.html", icon: "🚑", tag: "排查急救", color: "#e11d48",
    title: "AI CLI 环境与登录急救手册 · Claude Code × Codex",
    desc: "登录报错、配置打架、换机翻车一页治好:对症快查表 30 秒定位,五层诊断法 + 一键体检脚本、双工具五分类急救表、共用电脑/换电脑/无头机三大剧本、三级万能重置方案。",
    keywords: "登录 报错 环境 变量 换电脑 多账号 共用 会员 订阅 invalid api key 401 403 429 529 限流 额度 usage limit 计费 auth 认证 凭证 重置 修复 排查 诊断 keychain 钥匙串 代理 proxy ssh 容器 ci token vs code 扩展 windows node 版本 案例 复盘 credit balance wsl econnreset 超时",
    meta: ["对症快查", "五层诊断法", "3 级重置", "2026-07-18 核对"],
    sections: [
      {id:"overview",label:"对症快查 + 问题地图"},{id:"diagnose",label:"五层诊断法 + 体检脚本"},
      {id:"claude-cred",label:"Claude Code 凭证机制"},{id:"claude-config",label:"Claude Code settings.json 全解"},
      {id:"claude-er",label:"Claude Code 症状急救表"},
      {id:"codex-cred",label:"Codex 凭证机制"},{id:"codex-config",label:"Codex config.toml 全解"},
      {id:"codex-er",label:"Codex 症状急救表"},
      {id:"shared",label:"共用电脑 / 别人的配置"},{id:"machines",label:"换电脑 / 多机漫游"},
      {id:"headless",label:"SSH / 容器 / CI"},{id:"cases",label:"案例复盘:从症状到根因"},
      {id:"reset",label:"万能修复:三级重置"},{id:"map",label:"双工具对照与资源"}
    ]
  },
  {
    href: "topics/android-crash-anr.html", icon: "⚡", tag: "排查急救", color: "#65a30d",
    title: "Android Crash & ANR 排查根治 × AI 提效",
    desc: "小白到大神:崩溃图鉴、ANR 解剖、Native 崩溃、全工具链、GP/Firebase 后台、疑难侦查术,以及 AI 分诊工作流与原创 crash-triage 技能。",
    keywords: "android anr crash 崩溃 卡顿 稳定性 firebase play console native 堆栈 日志 排查",
    meta: ["12 章渐进式", "20+ 崩溃图鉴", "原创 AI Skill", "2026-07 核对"],
    sections: [
      {id:"overview",label:"全景与方法论"},{id:"read-crash",label:"第一课:读懂一次崩溃"},
      {id:"crash-catalog",label:"常见 Crash 图鉴与根治"},{id:"anr",label:"ANR 深入"},
      {id:"native",label:"Native Crash"},{id:"toolbox",label:"工具箱与用法"},
      {id:"consoles",label:"Play Console 与 Firebase"},{id:"device-data",label:"测试机数据导出"},
      {id:"detective",label:"疑难杂症侦查术"},{id:"ai-method",label:"AI 结合:方法论与提示词"},
      {id:"ai-workflow",label:"AI 工作流与原创 Skill"},{id:"governance",label:"治理体系与资源"}
    ]
  },
  {
    href: "topics/ai-leverage-guide.html", icon: "🧭", tag: "提效心法", color: "#7c3aed",
    title: "AI 到底能帮你干什么 · 提效全景与心法",
    desc: "全网调研聚合:能力边界一张表、8 大场景收益矩阵、编程/写作/调研/数据自动化/生活五套范式、三大工具选型、7 条有出处的通用心法、可复刻实例集与普通人学习路径。",
    keywords: "ai 能干什么 有什么用 提效 效率 场景 用法 写作 文档 周报 调研 学习 入门 数据 分析 自动化 生活 心法 提示词 prompt 误区 新手 学ai 怎么学 选工具 对比 gemini chatgpt claude codex deep research 深度调研 vibe coding",
    meta: ["8 大场景", "7 条心法", "7 个实例", "2026-07 调研"],
    sections: [
      {id:"map",label:"全景地图:边界一张表"},{id:"matrix",label:"场景 × 收益矩阵"},
      {id:"coding",label:"编程:最佳范式"},{id:"writing",label:"写作与文档"},
      {id:"research",label:"调研与学习"},{id:"data-auto",label:"数据与自动化"},
      {id:"life",label:"生活与自我管理场景"},
      {id:"tools",label:"三大工具怎么选"},{id:"principles",label:"通用心法七条"},
      {id:"cases",label:"真实实例集"},{id:"learning-path",label:"普通人学习路径"},
      {id:"resources",label:"资源索引"}
    ]
  },
  {
    href: "topics/prompt-context-engineering.html", icon: "🎯", tag: "提效心法", color: "#0891b2",
    title: "提示词与上下文工程 · 从技法到心法",
    desc: "全站的地基学科:基础七技法(每个配 ❌/✅ 对照)、多模态与 RAG 场景怎么喂材料、三大模型提示词差异图鉴、模型路由与自动切换现状核查、Prompt 注入与安全防御、Token 经济学与成本控制、6 个完整改写案例、12 式逐字模板、失败集迭代与版本管理、反模式图鉴,以及在 CC/Codex 里内容该放哪层。",
    keywords: "提示词 prompt 上下文 context 工程 写提示 怎么问 few-shot 示例 思维链 cot xml 角色 预填充 json 结构化 输出 系统提示 system claude.md agents.md 压缩 子代理 模板 幻觉 评估 反模式 玄学 注意力 多模态 图片 pdf 截图 视觉 vision rag 检索增强 引用 citations gpt gemini 模型差异 token 经济学 缓存 caching 成本 注入 injection 安全 owasp 案例 版本管理 a/b测试 模型路由 routing 自动切换 路由器 router litellm routellm 级联 cascade",
    meta: ["7 大技法对照", "12 式模板", "6 个完整案例", "模型路由现状核查", "2026-07 官方核对"],
    sections: [
      {id:"overview",label:"全景:从提示词到上下文"},{id:"basics",label:"基础七技法"},
      {id:"structured",label:"结构化输出"},{id:"multimodal",label:"多模态提示词"},
      {id:"models",label:"主流模型提示词差异图鉴"},{id:"rag",label:"RAG 场景提示词"},
      {id:"context",label:"上下文工程核心"},{id:"agentic",label:"智能体上下文"},
      {id:"cost",label:"Token 经济学与成本控制"},{id:"routing",label:"模型路由与自动切换"},
      {id:"security",label:"Prompt 注入与安全防御"},{id:"cases",label:"案例研究(6 例)"},
      {id:"templates",label:"逐字模板库(12 式)"},{id:"eval",label:"评估、迭代与版本管理"},
      {id:"antipatterns",label:"反模式图鉴"},{id:"tools",label:"在 CC / Codex 里的承载"},
      {id:"resources",label:"资源索引"}
    ]
  },
  {
    href: "topics/ai-capability-expansion.html", icon: "🧗", tag: "提效心法", color: "#ea580c",
    title: "AI 能力边界扩展指南",
    desc: "不针对某个具体技术栈转型,而是一套用 AI 扩展技术能力边界的通用方法论:诊断差距→AI 知识速通→脚手架起步→验证闭环→深化沉淀。配跨域映射技法与两条端到端案例(全栈跨端 / 技术型独立开发)。",
    keywords: "全栈 转型 扩展 边界 移动端 android ios web 后端 服务端 独立开发 一人公司 学习方法 方法论 跨域 映射",
    meta: ["五步方法论", "2 条端到端案例", "跨域映射技法", "2026-07"],
    sections: [
      {id:"mindset",label:"认知框架"},{id:"engine",label:"五步扩展引擎"},
      {id:"mapping",label:"跨域映射技法"},{id:"case-studies",label:"端到端深度案例"},
      {id:"indie",label:"技术型一人公司"},{id:"learning-system",label:"AI 辅助学习系统"},
      {id:"pitfalls",label:"陷阱与心法"},{id:"resources",label:"资源库"}
    ]
  },
  {
    href: "topics/toolchain-changelog.html", icon: "📅", tag: "使用指南", color: "#b45309",
    title: "工具版本追踪 · 变了什么",
    desc: "Claude Code 与 Codex 的版本变化摘要,只收录会改变实际使用习惯的更新:破坏性变更单独索引(升级后出问题先查这里)、行为变化与新增能力分类标注、按月归档、附官方源与本地自查命令。",
    keywords: "更新 变化 版本 changelog 发布 release notes 升级 破坏性变更 breaking change 新功能 新版本 弃用 deprecated 迁移 opus 5 sonnet 5 gpt-5.6 subtask fork 权限模式 manual 新特性 最新 时效",
    meta: ["破坏性变更索引", "按月归档", "三级分类标注", "核对至 2026-07-28"],
    sections: [
      {id:"how-to-read",label:"怎么用这一页"},
      {id:"breaking",label:"破坏性变更总索引",quick:true,quickLabel:"破坏性变更速查"},
      {id:"m2026-07",label:"2026 年 7 月"},{id:"m2026-06",label:"2026 年 6 月"},
      {id:"method",label:"本页怎么维护"}
    ]
  }
];
