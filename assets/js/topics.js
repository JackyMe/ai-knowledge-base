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
    href: "https://codexguide.io/paths", icon: "🚀", tag: "实战 · 系统教程", color: "#10b981",
    title: "CodexGuide 实战指南",
    desc: "4 条目标导向学习路径、选型三棱镜、长任务四权分立、收尾记忆闭环、浏览器 E2E 验收与实战案例库。",
    links: [ { label: "学习路线 →", href: "https://codexguide.io/paths" } ]
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
      { label: "AI × UI 设计协同全景(新)", href: "topics/ai-ui-design-collab.html", note: "Figma + pen.dev + Material 3 + 视觉回归,Android 端到端" },
      { label: "上下文工程与反模式(内功)", href: "topics/prompt-context-engineering.html#context", note: "注意力预算、长任务三板斧、安全与成本、鉴别偏方" }
    ]
  },
  {
    icon: "🛠️", color: "#a16207", title: "运维基座",
    desc: "从 SaaS 托管毕业,独立负责一个中小项目的服务器/部署/网络",
    steps: [
      { label: "服务器 / 部署 / 网络扫盲", href: "topics/ops-basics.html", note: "5 阶段路线 + Linux/网络/部署 3 模块 24 节(网络 13 节详尽版)+ 5 类故障对症表" },
      { label: "R2 起步:装好一台 VPS", href: "topics/ops-basics.html#stage2", note: "1核1G Ubuntu + SSH + Nginx" },
      { label: "R3 网络:域名 + DNS + HTTPS", href: "topics/ops-basics.html#stage3", note: "yourdomain.dev + 绿锁 + 反代" },
      { label: "R4 部署:git push 自动上线", href: "topics/ops-basics.html#stage4", note: "systemd + GitHub Actions" },
      { label: "R5 容器:Docker 零基础闯关", href: "topics/docker/01-intro.html", note: "彻底告别环境坑,多页闯关实战" },
      { label: "附录 A:故障 30 秒对症表", href: "topics/ops-basics.html#appA", note: "收藏备查:502/SSH/磁盘满/OOM/SSL 过期" }
    ]
  },
  {
    icon: "🌐", color: "#1a73e8", title: "全栈生态与进阶",
    desc: "打通 Google AI (Gemini/Antigravity)、xAI (Grok/Grok Build) 与全栈能力扩展",
    steps: [
      { label: "Google AI 生态深度实战", href: "topics/google-ai-ecosystem.html", note: "Gemini 2.5/3.0 + NotebookLM + Antigravity" },
      { label: "xAI & Grok 全生态实战", href: "topics/grok-ecosystem-guide.html", note: "Grok Bot 数字员工 + Grok Build 沙箱 + 实时 X" },
      { label: "Antigravity 深度使用指南", href: "topics/antigravity-usage.html", note: "CLI / IDE / SDK / Subagents / MCP 实战" },
      { label: "AI 能力边界扩展指南", href: "topics/ai-capability-expansion.html", note: "五步扩展引擎 + 跨域映射 + 一人公司" },
      { label: "Android 稳定性与 AI 分诊", href: "topics/android-crash-anr.html", note: "Crash/ANR 图鉴 + 原创 AI triage 技能" }
    ]
  }
];

const TOPICS = [
  {
    href: "topics/pencil-docs-zh.html", icon: "📘", tag: "设计与创作", color: "#5b5bf6",
    title: "Pencil 文档指南",
    desc: "查阅 Pencil 的界面、设计文件与常用操作。",
    keywords: "pencil 设计 pen 文件 组件 变量 快捷键 安装 激活 导入 导出 cli 画布",
    meta: ["16 个页面", "含官方视频", "基于 2026-07-27 版"],
    sections: [
      {"id":"installation","label":"安装"},
      {"id":"authentication","label":"认证与激活"},
      {"id":"ai-integration","label":"AI 集成"},
      {"id":"pen-files","label":".pen 文件"},
      {"id":"design-as-code","label":"设计即代码 Design as Code"},
      {"id":"interface","label":"pen.dev 界面"},
      {"id":"variables","label":"变量 Variables"},
      {"id":"components","label":"组件 Components"},
      {"id":"slots","label":"插槽 Slots"},
      {"id":"code-on-canvas","label":"画布上的代码 Code on Canvas"},
      {"id":"design-libraries","label":"设计库 Design Libraries"},
      {"id":"import-export","label":"导入与导出"},
      {"id":"shortcuts","label":"键盘快捷键"},
      {"id":"design-to-code","label":"设计 ↔ 代码"},
      {"id":"troubleshooting","label":"故障排查"},
      {"id":"pen-format","label":".pen 文件格式"},
      {"id":"pencil-cli","label":"pen.dev CLI"}
    ]
  },
  {
    href: "topics/pencil-claude-code-best-practices.html", icon: "⚡", tag: "设计与创作", color: "#0ea5e9",
    title: "Pencil × Claude Code 实践",
    desc: "从设计稿到代码，了解 Pencil 与 Claude Code 的协作流程。",
    keywords: "pencil claude 工作流 提示词 prompt 设计系统 避坑 案例 最佳实践",
    meta: ["9+ 来源", "16 张实测截图", "2026-07 聚合"],
    sections: [
      {"id":"intro","label":"为什么是 pen.dev + Claude Code"},
      {"id":"setup","label":"环境搭建标准流程"},
      {"id":"workflows","label":"四种核心工作流"},
      {"id":"prompts","label":"实战提示词范例集"},
      {"id":"design-system","label":"设计系统工程化"},
      {"id":"prompt-patterns","label":"高效提示词模式"},
      {"id":"advanced","label":"高级玩法"},
      {"id":"pitfalls","label":"避坑清单"},
      {"id":"cases","label":"真实案例研究"},
      {"id":"resources","label":"资源与来源索引"}
    ]
  },
  {
    href: "topics/ai-ui-design-collab.html", icon: "🎨", tag: "设计与创作", color: "#7c3aed",
    title: "AI 与 UI 设计协作",
    desc: "串联设计工具、组件规范与实现验收，建立完整的 UI 工作流。",
    keywords: "figma pencil.dev stitch galileo v0 claude code codex mcp 设计 token variables compose material3 配色 主题 android 视觉回归 paparazzi roborazzi 截图 协同 设计系统 双向同步 配色 字体 间距 圆角 暗色 dynamic color material you auto layout dev mode code connect style dictionary",
    meta: ["3 入口", "5 步 Android 流水线", "Paparazzi/Roborazzi 双回归", "2026-08 核对"],
    sections: [
      {"id":"intro","label":"全景:为什么 2026 年这件事突然变得\"非做不可\""},
      {"id":"map","label":"设计端工具地图:五种角色,不要选错"},
      {"id":"consume","label":"AI 编码代理如何\"看到\"设计:三种通道"},
      {"id":"pipeline","label":"Android 端到端:五步流水线"},
      {"id":"tokens","label":"Figma → Material 3 Token:一条标准桥"},
      {"id":"compose","label":"Compose 代码生成与回写:AI 改 UI 的纪律"},
      {"id":"verify","label":"真机/虚拟截图回归:AI 改 UI 后的保险栓"},
      {"id":"sync","label":"双向同步:让设计系统真正\"活\"起来"},
      {"id":"cases","label":"示例：商品详情页的设计到实现"},
      {"id":"antipatterns","label":"反模式与避坑清单"},
      {"id":"prompts","label":"提示词模板库(可直接复制)"},
      {"id":"ios-web","label":"跨端落地:iOS × Web(把正文 Android 那条流水线照搬)"},
      {"id":"resources","label":"资源与来源索引"}
    ]
  },
  {
    href: "topics/claude-code-guide.html", icon: "⛏️", tag: "编程工具与模型", color: "#d9634a",
    title: "Claude Code 使用指南",
    desc: "从安装与配置开始，查阅命令、权限、扩展和日常编码实践。",
    keywords: "claude code 命令 快捷键 skills hooks mcp 子代理 上下文 权限 配置 模板 提示词 claude.md 斜杠命令",
    meta: ["100+ 命令收录", "8 大场景", "5 套模板", "基于 v2.1.x"],
    sections: [
      {"id":"mental-model","label":"一切围绕上下文"},
      {"id":"golden-rules","label":"五条黄金法则"},
      {"id":"whats-new","label":"近期重要变化"},
      {"id":"setup","label":"安装与首次配置"},
      {"id":"commands","label":"命令速查手册","quick":true,"quickLabel":"Claude Code 命令速查"},
      {"id":"shortcuts","label":"快捷键与输入技巧"},
      {"id":"extensions","label":"六大扩展怎么选"},
      {"id":"skills-hooks","label":"Skills / Hooks / MCP / 子代理:深入四件套"},
      {"id":"subscription-quotas","label":"订阅、API 与上下文的区别"},
      {"id":"vision-artifacts-guide","label":"Artifacts 与电脑操作的边界"},
      {"id":"playbook","label":"八大场景实战手册"},
      {"id":"context","label":"上下文管理进阶"},
      {"id":"permissions","label":"权限与安全"},
      {"id":"config-auth","label":"配置与账号体系全解"},
      {"id":"ecosystem","label":"生态精选:方法论、工具与组合拳"},
      {"id":"pitfalls","label":"避坑清单"},
      {"id":"templates","label":"开箱即用模板库"},
      {"id":"hidden-config","label":"用官方帮助核对能力"},
      {"id":"resources","label":"资源索引"}
    ]
  },
  {
    href: "topics/codex-guide.html", icon: "🟢", tag: "编程工具与模型", color: "#0d9373",
    title: "Codex 使用指南",
    desc: "了解 CLI、IDE 与云端任务，掌握沙箱、审批和编码工作流。",
    keywords: "codex openai 沙箱 审批 agents.md 云端 cloud 命令 协同 gpt 选型三棱镜 学习路线 四权分立 收尾记忆 e2e 浏览器验收 github issue pr tdd wsl 性能调优",
    meta: ["5 种形态", "3×3 沙箱矩阵", "四权分立长任务", "E2E 浏览器验收", "双代理协同"],
    sections: [
      {"id":"overview","label":"Codex 全景与选型三棱镜"},
      {"id":"learning-paths","label":"4 条目标导向学习路线"},
      {"id":"setup","label":"安装与平台调优"},
      {"id":"whats-new","label":"近期关键动态与重大变更"},
      {"id":"commands","label":"命令速查手册","quick":true,"quickLabel":"Codex 命令速查"},
      {"id":"sandbox","label":"沙箱与审批 3×3 安全模型"},
      {"id":"methodology","label":"核心方法论与新手避坑指南"},
      {"id":"long-tasks","label":"长任务工作流与多会话工程"},
      {"id":"memory-system","label":"任务收尾与项目记忆闭环"},
      {"id":"skills-mcp","label":"Skills、MCP 与浏览器工程"},
      {"id":"config-auth","label":"配置与账号体系全解"},
      {"id":"best-practices","label":"可复用的任务与验收模板"},
      {"id":"subscription-quotas","label":"订阅、API 与上下文的区别"},
      {"id":"image-guide","label":"图像任务转入独立专题"},
      {"id":"playbook","label":"实战场景手册与端到端流水线"},
      {"id":"hidden-config","label":"核对本机版本与可用能力"},
      {"id":"resources","label":"资源索引与延伸阅读"}
    ]
  },
  {
    href: "topics/gpt-image-guide.html", icon: "🎨", tag: "设计与创作", color: "#7c3aed",
    title: "GPT 图像生成指南",
    desc: "学习图像生成、编辑与提示词组织，查阅常见问题和使用边界。",
    keywords: "图像生成 image generation dall-e gpt-4o 提示词 prompt 风格 style 文字渲染 text rendering 图片编辑 editing 透明背景 png 吉卜力 ghibli 像素画 pixel art logo 设计 ui 电商 产品图 信息图 infographic 社交媒体 表情包 贴纸 版权 copyright 安全 safety midjourney stable diffusion 对比 comparison 角色一致性 character consistency seed custom gpt image 2.0 2.5",
    meta: ["4 代技术进化", "六要素框架", "15+ 场景模板", "100+ 来源聚合", "核对至 2026-09-09"],
    sections: [
      {"id":"evolution","label":"图像模型与接口选择"},
      {"id":"subscription","label":"用量与费用如何核对"},
      {"id":"prompt-framework","label":"六要素提示词框架"},
      {"id":"prompt-advanced","label":"提示词进阶心法"},
      {"id":"style-control","label":"风格控制与视觉词汇表","quick":true,"quickLabel":"风格词汇速查"},
      {"id":"text-rendering","label":"文字渲染攻略"},
      {"id":"image-editing","label":"图像编辑与多轮迭代"},
      {"id":"consistency","label":"角色与风格一致性"},
      {"id":"scenarios","label":"15+ 实战场景 Prompt 模板","quick":true,"quickLabel":"场景 Prompt 模板"},
      {"id":"expert-tricks","label":"提高可控性的实用方法"},
      {"id":"comparison","label":"用同一任务比较工具"},
      {"id":"safety-copyright","label":"交付前检查"},
      {"id":"resources","label":"资源索引与延伸阅读"}
    ]
  },
  {
    href: "topics/env-auth-clinic.html", icon: "🚑", tag: "问题排查", color: "#e11d48",
    title: "环境与登录排查",
    desc: "按症状查找 CLI 安装、认证、网络与环境配置问题。",
    keywords: "登录 报错 环境 变量 换电脑 多账号 共用 会员 订阅 invalid api key 401 403 429 529 限流 额度 usage limit 计费 auth 认证 凭证 重置 修复 排查 诊断 keychain 钥匙串 代理 proxy ssh 容器 ci token vs code 扩展 windows node 版本 案例 复盘 credit balance wsl econnreset 超时",
    meta: ["对症快查", "五层诊断法", "3 级重置", "2026-07-18 核对"],
    sections: [
      {"id":"overview","label":"对症快查 + 问题地图"},
      {"id":"diagnose","label":"五层诊断法 + 一键体检脚本"},
      {"id":"claude-cred","label":"Claude Code · 凭证机制与优先级"},
      {"id":"claude-config","label":"Claude Code · settings.json 全解:最小可跑 → 全量字典"},
      {"id":"claude-er","label":"Claude Code · 症状急救表"},
      {"id":"codex-cred","label":"Codex · 凭证机制与存储"},
      {"id":"codex-config","label":"Codex · config.toml 全解:最小可跑 → 全量字典"},
      {"id":"codex-er","label":"Codex · 症状急救表"},
      {"id":"shared","label":"剧本 A · 共用电脑 / 接手\"别人配置过\"的电脑"},
      {"id":"machines","label":"剧本 B · 换电脑 / 多机漫游"},
      {"id":"headless","label":"剧本 C · SSH / 容器 / 无头机 / CI"},
      {"id":"cases","label":"案例复盘:从症状到根因"},
      {"id":"reset","label":"可恢复的排查与重置"},
      {"id":"map","label":"双工具概念对照 + 资源索引"}
    ]
  },
  {
    href: "topics/android-crash-anr.html", icon: "⚡", tag: "问题排查", color: "#65a30d",
    title: "Android Crash 与 ANR 排查",
    desc: "结合日志、源码与 AI 辅助，定位 Android 崩溃和无响应问题。",
    keywords: "android anr crash 崩溃 卡顿 稳定性 firebase play console native 堆栈 日志 排查",
    meta: ["12 章渐进式", "20+ 崩溃图鉴", "原创 AI Skill", "2026-07 核对"],
    sections: [
      {"id":"overview","label":"全景与方法论"},
      {"id":"read-crash","label":"第一课:读懂一次崩溃"},
      {"id":"crash-catalog","label":"常见 Crash 图鉴与根治"},
      {"id":"anr","label":"ANR 深入：从主线程快照追到阻塞源"},
      {"id":"native","label":"Native Crash：从信号到源码行"},
      {"id":"toolbox","label":"工具箱与用法：先问证据在哪"},
      {"id":"consoles","label":"Play Console 与 Firebase：线上问题的两副镜头"},
      {"id":"device-data","label":"测试机数据导出：把事故现场完整带走"},
      {"id":"detective","label":"疑难杂症侦查术：把不可观测变成可验证"},
      {"id":"ai-method","label":"AI 结合：证据质量决定排查上限"},
      {"id":"ai-workflow","label":"AI 工作流与原创 crash-triage Skill"},
      {"id":"governance","label":"治理体系：从救火到稳定性复利"}
    ]
  },
  {
    href: "topics/ai-leverage-guide.html", icon: "🧭", tag: "AI 入门与方法", color: "#7c3aed",
    title: "AI 入门与应用方法",
    desc: "认识 AI 的适用场景与能力边界，从具体任务建立使用方法。",
    keywords: "ai 能干什么 有什么用 提效 效率 场景 用法 写作 文档 周报 调研 学习 入门 数据 分析 自动化 生活 心法 提示词 prompt 误区 新手 学ai 怎么学 选工具 对比 gemini chatgpt claude codex deep research 深度调研 vibe coding",
    meta: ["8 大场景", "7 条心法", "7 个实例", "2026-07 调研"],
    sections: [
      {"id":"map","label":"全景地图:AI 擅长什么、不擅长什么"},
      {"id":"matrix","label":"场景 × 收益矩阵:哪里提效最猛"},
      {"id":"coding","label":"编程场景最佳范式(Claude Code / Codex)"},
      {"id":"writing","label":"写作与文档场景范式"},
      {"id":"research","label":"调研与学习场景范式"},
      {"id":"data-auto","label":"数据与自动化场景范式"},
      {"id":"life","label":"生活与自我管理场景范式"},
      {"id":"tools","label":"按任务和环境选工具"},
      {"id":"principles","label":"通用心法七条(跨场景通用)"},
      {"id":"cases","label":"真实实例集:每个场景一个可复刻模板"},
      {"id":"learning-path","label":"普通人学习路径:从零到熟练"},
      {"id":"resources","label":"资源索引(按可信度排序)"}
    ]
  },
  {
    href: "topics/prompt-context-engineering.html", icon: "🎯", tag: "AI 入门与方法", color: "#0891b2",
    title: "提示词与上下文工程",
    desc: "组织任务目标、约束与上下文，借助模板和案例改善输出。",
    keywords: "提示词 prompt 上下文 context 工程 写提示 怎么问 few-shot 示例 思维链 cot xml 角色 预填充 json 结构化 输出 系统提示 system claude.md agents.md 压缩 子代理 模板 幻觉 评估 反模式 玄学 注意力 多模态 图片 pdf 截图 视觉 vision rag 检索增强 引用 citations gpt gemini 模型差异 token 经济学 缓存 caching 成本 注入 injection 安全 owasp 案例 版本管理 a/b测试 模型路由 routing 自动切换 路由器 router litellm routellm 级联 cascade",
    meta: ["7 大技法对照", "12 式模板", "6 个完整案例", "模型路由现状核查", "2026-07 官方核对"],
    sections: [
      {"id":"overview","label":"全景:从提示词工程到上下文工程"},
      {"id":"basics","label":"基础七技法(每个配 ❌/✅ 对照)"},
      {"id":"structured","label":"结构化输出与格式控制"},
      {"id":"multimodal","label":"多模态提示词:图片/文档/截图怎么喂"},
      {"id":"models","label":"不同模型的提示词适配"},
      {"id":"rag","label":"RAG 场景提示词:让模型老实基于检索材料回答"},
      {"id":"context","label":"上下文工程核心:注意力是稀缺资源"},
      {"id":"agentic","label":"智能体上下文:让长任务不\"失忆\""},
      {"id":"cost","label":"Token 经济学与成本控制:怎么组织上下文能省钱"},
      {"id":"routing","label":"模型路由：先评估，再自动化"},
      {"id":"security","label":"Prompt 注入与安全防御"},
      {"id":"cases","label":"案例研究:6 个完整改写全过程"},
      {"id":"templates","label":"逐字模板库(12 式,复制改词即用)"},
      {"id":"eval","label":"评估、迭代与版本管理:别凭感觉改提示词"},
      {"id":"antipatterns","label":"反模式图鉴:流传最广的提示词偏方"},
      {"id":"tools","label":"在 Claude Code / Codex 里的承载:什么内容放哪层"},
      {"id":"resources","label":"资源索引"}
    ]
  },
  {
    href: "topics/ai-capability-expansion.html", icon: "🧗", tag: "AI 入门与方法", color: "#ea580c",
    title: "AI 能力拓展实践",
    desc: "用跨领域思考与任务拆解，探索更复杂的 AI 应用场景。",
    keywords: "全栈 转型 扩展 边界 移动端 android ios web 后端 服务端 独立开发 一人公司 学习方法 方法论 跨域 映射",
    meta: ["五步方法论", "2 条端到端案例", "跨域映射技法", "2026-07"],
    sections: [
      {"id":"mindset","label":"认知框架"},
      {"id":"engine","label":"通用方法论:五步扩展引擎"},
      {"id":"mapping","label":"跨域映射技法"},
      {"id":"case-studies","label":"端到端深度案例"},
      {"id":"indie","label":"技术型一人公司 / 独立开发"},
      {"id":"learning-system","label":"AI 辅助学习系统"},
      {"id":"pitfalls","label":"陷阱与心法"},
      {"id":"resources","label":"资源库"}
    ]
  },
  {
    href: "topics/toolchain-changelog.html", icon: "📅", tag: "更新日志", color: "#b45309",
    title: "AI 工具更新日志",
    desc: "查看官方更新入口、已核对的参数变化，以及升级与回退方法。",
    keywords: "更新 变化 版本 changelog 发布 release notes 升级 破坏性变更 breaking change 新功能 新版本 弃用 deprecated 迁移 opus 5 sonnet 5 gpt-5.6 subtask fork 权限模式 manual 新特性 最新 时效",
    meta: ["破坏性变更索引", "按月归档", "三级分类标注", "核对至 2026-08-17"],
    sections: [
      {"id":"how-to-read","label":"如何使用更新记录"},
      {"id":"breaking","label":"已核对的 Codex 参数变化","quick":true,"quickLabel":"破坏性变更速查"},
      {"id":"m2026-09","label":"官方更新入口"},
      {"id":"method","label":"升级与回退检查"}
    ]
  },
  {
    href: "topics/ops-basics.html", icon: "🛠️", tag: "工程基础", color: "#a16207",
    title: "服务器、网络与部署",
    desc: "建立 Linux、网络与部署基础，并按故障现象查阅处理方法。",
    keywords: "服务器 运维 部署 网络 linux vps ssh systemd nginx 反向代理 https tls ssl certbot let's encrypt dns 防火墙 ufw 安全组 github actions ci cd 进程托管 端口 包管理器 apt dnf apk 权限 sudo chmod chown docker 容器 密钥 env 环境变量 故障 502 504 ssh 连不上 磁盘满 oom ssl 过期 挖坑 独立开发者 全栈 扫盲 入门 基础 基座",
    meta: ["5 阶段路线", "3 模块 24 节", "网络 13 节详尽版", "5 类故障对症表", "核对至 2026-08-07"],
    sections: [
      {"id":"intro","label":"为什么要学这个"},
      {"id":"roadmap","label":"五阶段路线图"},
      {"id":"stage1","label":"R1 · 现状盘点"},
      {"id":"stage2","label":"R2 · Linux 基座"},
      {"id":"stage3","label":"R3 · 网络骨干"},
      {"id":"stage4","label":"R4 · 部署链路"},
      {"id":"stage5","label":"R5 · 故障排查"},
      {"id":"m1-1","label":"1.1 什么是\"服务器\""},
      {"id":"m1-2","label":"1.2 三大抽级概念:文件系统、进程、端口"},
      {"id":"m1-3","label":"1.3 SSH 不只是\"远程登录\""},
      {"id":"m1-4","label":"1.4 包管理器速查"},
      {"id":"m1-5","label":"1.5 权限与用户"},
      {"id":"m2-1","label":"2.1 一张图看懂 HTTP → TCP → IP → 网卡"},
      {"id":"m2-2","label":"2.2 DNS 完整图景:114 查号台是怎么工作的"},
      {"id":"m2-3","label":"2.3 HTTPS / TLS / Let's Encrypt"},
      {"id":"m2-4","label":"2.4 反向代理:Nginx 为什么是瑞士军刀"},
      {"id":"m2-5","label":"2.5 防火墙:为什么 80/443 通了别的还连不上"},
      {"id":"m2-6","label":"2.6 常见攻击面速查"},
      {"id":"m2-7","label":"2.7 端口号详解:小区门牌号"},
      {"id":"m2-8","label":"2.8 本地服务与 loopback:你跟自己说话"},
      {"id":"m2-9","label":"2.9 VPN 与代理:四种\"过墙\"姿势辨析"},
      {"id":"m2-10","label":"2.10 公网 / 私网 / NAT:小区传达室的活儿"},
      {"id":"m2-11","label":"2.11 网络调试命令全家福:排障工具箱"},
      {"id":"m2-12","label":"2.12 HTTP/2 与 HTTP/3 演进:协议为啥要升级"},
      {"id":"m2-13","label":"2.13 IPv6 扫盲:128 位地址够给每粒沙子分一个"},
      {"id":"m3-1","label":"3.1 部署 7 步流水线"},
      {"id":"m3-2","label":"3.2 systemd 进程托管:让 Node 不再\"关 SSH 就挂\""},
      {"id":"m3-3","label":"3.3 Nginx 反代实战配置模板"},
      {"id":"m3-4","label":"3.4 Docker 最小必要集"},
      {"id":"m3-5","label":"3.5 GitHub Actions 自动部署"},
      {"id":"m3-6","label":"3.6 环境变量 / 密钥管理 / .env 的正确打开方式"},
      {"id":"appA","label":"5 类故障 30 秒对症表","quick":true,"quickLabel":"故障 30 秒对症表"},
      {"id":"appB","label":"推荐资源"},
      {"id":"appC","label":"术语速查表"}
    ]
  },
  {
    href: "topics/google-ai-ecosystem.html", icon: "🌐", tag: "编程工具与模型", color: "#1a73e8",
    title: "Google AI 生态指南",
    desc: "了解 Gemini、NotebookLM 与 Google AI 工具之间的使用关系。",
    keywords: "google antigravity agy notebooklm ai studio gemini canvas sketch 智能体 agentic cli ide sdk slash commands subagent planning mode sandbox python sdk source grounding 2m 上下文 播客 生成 流程",
    meta: ["4 大交互形态", "26 个章节", "Antigravity 深度解构", "5 步流水线", "核对至 2026-08-17"],
    sections: [
      {"id":"intro","label":"按任务选工具"},
      {"id":"ch1-1","label":"API 接入与模型选择"},
      {"id":"ch1-2","label":"缓存：看命中与总成本"},
      {"id":"ch1-3","label":"结构化输出与业务校验","quick":true,"quickLabel":"Structured Outputs 实战"},
      {"id":"ch2-1","label":"NotebookLM：引用与核验"},
      {"id":"ch2-2","label":"准备可检索的资料"},
      {"id":"ch2-3","label":"音频概览与学习闭环"},
      {"id":"ch3-1","label":"Canvas 与图像原型"},
      {"id":"ch4-1","label":"Antigravity：转入工程实施"},
      {"id":"ch5-1","label":"一个完整的资料到代码流程"}
    ]
  },
  {
    href: "topics/antigravity-usage.html", icon: "🛸", tag: "编程工具与模型", color: "#8b5cf6",
    title: "Antigravity 使用指南",
    desc: "集中查阅 Antigravity 的工作环境、任务流程、扩展与排错章节。",
    keywords: "antigravity agy ide cli sdk google gemini subagents mcp custom skill rule plugin sandbox bypass reactive wakeup",
    meta: ["4 大形态", "10 个核心章节", "Subagent 隔离", "核对至 2026-08-17"],
    sections: [
      {"id":"sec1","label":"先区分使用形态"},
      {"id":"sec2","label":"安装与登录"},
      {"id":"sec3","label":"CLI 常用操作","quick":true,"quickLabel":"AGY 常用命令速查"},
      {"id":"sec4","label":"设置与扩展"},
      {"id":"sec5","label":"后台任务与非交互运行"},
      {"id":"sec7","label":"权限、沙箱与额度"},
      {"id":"sec8","label":"按症状排查","quick":true,"quickLabel":"AGY 避坑急救表"},
      {"id":"sec9","label":"一个可验证的任务流程"}
    ]
  },
  {
    href: "topics/grok-ecosystem-guide.html", icon: "𝕏", tag: "编程工具与模型", color: "#d97706",
    title: "Grok 与 xAI 使用指南",
    desc: "查阅 Grok 应用、API 接入、提示词实践与常见问题。",
    keywords: "xai grok grok3 grok4 grokbot bot 数字员工 grokbuild build colossus x search grounding think deepsearch reasoning function calling prompt 缓存 智能体 提示词 模板 agent swarm memphis",
    meta: ["Memphis 200k 超算", "Grok Bot 数字员工", "Grok Build 云沙箱", "4人电商协同", "核对至 2026-09-03"],
    sections: [
      {"id":"intro","label":"四个入口与适用任务"},
      {"id":"ch1-1","label":"模型选择与验证"},
      {"id":"ch1-2","label":"X 检索与事实核查","quick":true,"quickLabel":"实时 X 检索实战"},
      {"id":"ch1-3","label":"调研任务的输入与验收"},
      {"id":"ch2-1","label":"Grok Bot：持续任务与角色"},
      {"id":"ch2-3","label":"共享电脑与授权边界"},
      {"id":"ch2-4","label":"技能与定时任务","quick":true,"quickLabel":"定时任务防错 7 律"},
      {"id":"ch3-1","label":"Grok Build：终端编码代理"},
      {"id":"ch3-3","label":"API 接入、缓存与计费"},
      {"id":"ch4-2","label":"工具调用：模型提议，程序校验"},
      {"id":"ch4-4","label":"协作示例：资料整理与复核"},
      {"id":"ch5-3","label":"可复用任务模板","quick":true,"quickLabel":"Grok 提示词模板库"},
      {"id":"ch6-1","label":"错误与排查顺序","quick":true,"quickLabel":"Grok API 急救表"},
      {"id":"sub-quotas","label":"订阅与用量"},
      {"id":"grok-imagine","label":"图像与视频创作"},
      {"id":"ch7-1","label":"来源与学习顺序"}
    ]
  },
  {
    href: "topics/docker/01-intro.html", icon: "🐳", tag: "工程基础", color: "#0284c7",
    title: "Docker 从入门到部署",
    desc: "35 课循序学习容器、镜像、数据持久化、网络与 Compose 部署。",
    keywords: "docker 容器 container 镜像 image 仓库 registry dockerfile compose 部署 微服务 环境 入门 零基础 教程 volume wsl2 network cgroups healthcheck multi-stage",
    meta: ["35 节干货专栏", "Mermaid 图解", "踩坑自救室", "核对至 2026-08-17"],
    sections: [
      {"id":"","href":"topics/docker/01-intro.html","label":"01. 楔子：小明的世纪难题"},
      {"id":"","href":"topics/docker/02-what-is-docker.html","label":"02. 用“搬家”讲透 Docker"},
      {"id":"","href":"topics/docker/03-vm-vs-container.html","label":"03. 降维打击：VM vs 容器"},
      {"id":"","href":"topics/docker/04-core-components.html","label":"04. 图解三剑客架构"},
      {"id":"","href":"topics/docker/05-windows-setup.html","label":"05. Windows 玩家避坑指南"},
      {"id":"","href":"topics/docker/06-mac-linux-setup.html","label":"06. Mac & Linux 通关密码"},
      {"id":"","href":"topics/docker/07-registry-mirror.html","label":"07. 换源提速：告别蜗牛网速"},
      {"id":"","href":"topics/docker/08-hello-world.html","label":"08. 第一行魔法背后的秘密"},
      {"id":"","href":"topics/docker/09-run-detached.html","label":"09. 后台跑一个 Nginx 网站"},
      {"id":"","href":"topics/docker/10-lifecycle-cmds.html","label":"10. 掌控生杀大权 (状态机)"},
      {"id":"","href":"topics/docker/11-exec-into.html","label":"11. 破门而入：钻进容器内部"},
      {"id":"","href":"topics/docker/12-logs-detective.html","label":"12. 侦探视角：怎么查日志"},
      {"id":"","href":"topics/docker/13-resource-limits.html","label":"13. 资源枷锁：防 OOM 宕机"},
      {"id":"","href":"topics/docker/14-healthcheck.html","label":"14. 健康检查：容器自我把脉"},
      {"id":"","href":"topics/docker/15-why-dockerfile.html","label":"15. 告别人工配环境"},
      {"id":"","href":"topics/docker/16-dockerfile-syntax.html","label":"第16集：Dockerfile 核心语法大扫盲"},
      {"id":"","href":"topics/docker/17-dockerignore.html","label":"第17集：.dockerignore 避坑指南"},
      {"id":"","href":"topics/docker/18-build-practice.html","label":"第18集：实战打包 Web 项目"},
      {"id":"","href":"topics/docker/19-layer-caching.html","label":"第19集：图解分层缓存魔法 (重要!)"},
      {"id":"","href":"topics/docker/20-frontend-deploy.html","label":"第20集：优雅上线 Vue / React"},
      {"id":"","href":"topics/docker/21-multi-stage.html","label":"21. 终极瘦身：多阶段构建"},
      {"id":"","href":"topics/docker/22-ephemeral-data.html","label":"22. 短命容器与消失的数据"},
      {"id":"","href":"topics/docker/23-volumes.html","label":"23. 终极保命符：数据卷 Volumes"},
      {"id":"","href":"topics/docker/24-bind-mounts.html","label":"24. 开发神技：绑定挂载"},
      {"id":"","href":"topics/docker/25-volume-backup.html","label":"25. 保险箱搬家：数据备份"},
      {"id":"","href":"topics/docker/26-network-types.html","label":"26. 网络探秘：Bridge 与 Host"},
      {"id":"","href":"topics/docker/27-container-network.html","label":"27. 容器相亲记：告别 IP，用名字呼唤你"},
      {"id":"","href":"topics/docker/28-why-compose.html","label":"28. 为什么需要 Compose？告别千行命令噩梦"},
      {"id":"","href":"topics/docker/29-yaml-syntax.html","label":"29. YAML 语法速成班：缩进的艺术"},
      {"id":"","href":"topics/docker/30-compose-up-part1.html","label":"30. 终极之战(上)：Web+缓存的 Compose 狂欢"},
      {"id":"","href":"topics/docker/31-compose-up-part2.html","label":"31. 终极之战(下)：微服务网络"},
      {"id":"","href":"topics/docker/32-env-security.html","label":"32. 护城河：.env保护密码"},
      {"id":"","href":"topics/docker/33-system-prune.html","label":"33. 空间大扫除：No space left on device"},
      {"id":"","href":"topics/docker/34-production-root.html","label":"34. 毕业红线：绝不用 Root 跑业务"},
      {"id":"","href":"topics/docker/35-cicd-concept.html","label":"35. 尾声：CI/CD 自动化流水线"}
    ]
  }
];

