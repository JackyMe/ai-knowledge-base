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

const TOPICS = [
  {
    href: "topics/pencil-docs-zh.html", icon: "📘", tag: "官方文档", color: "#5b5bf6",
    title: "Pencil 官方文档 · 中文完整指南",
    desc: "覆盖 docs.pencil.dev 全部 16 个页面,含官方视频与配图,每节附原文链接。",
    meta: ["16 个页面", "含官方视频", "基于 2026-06-27 版"],
    sections: [
      {id:"home",label:"文档首页"},{id:"installation",label:"安装"},
      {id:"authentication",label:"认证与激活"},{id:"ai-integration",label:"AI 集成"},
      {id:"pen-files",label:".pen 文件"},{id:"design-as-code",label:"设计即代码"},
      {id:"interface",label:"Pencil 界面"},{id:"variables",label:"变量"},
      {id:"components",label:"组件"},{id:"slots",label:"插槽 Slots"},
      {id:"code-on-canvas",label:"画布上的代码"},{id:"design-libraries",label:"设计库"},
      {id:"import-export",label:"导入与导出"},{id:"shortcuts",label:"键盘快捷键"},
      {id:"design-to-code",label:"设计 ↔ 代码"},{id:"troubleshooting",label:"故障排查"},
      {id:"pen-format",label:".pen 文件格式"},{id:"pencil-cli",label:"Pencil CLI"}
    ]
  },
  {
    href: "topics/pencil-claude-code-best-practices.html", icon: "⚡", tag: "实践指南", color: "#0ea5e9",
    title: "Pencil × Claude Code 最佳实践全景",
    desc: "聚合 9+ 来源:四种核心工作流、提示词模板、设计系统工程化、CI/CD 玩法、避坑与真实案例(附实测截图)。",
    meta: ["9+ 来源", "20+ 实测截图", "2026-07 聚合"],
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
    meta: ["100+ 命令收录", "8 大场景", "5 套模板", "基于 v2.1.x"],
    sections: [
      {id:"mental-model",label:"一切围绕上下文"},{id:"golden-rules",label:"五条黄金法则"},
      {id:"setup",label:"安装与首次配置"},{id:"commands",label:"命令速查手册"},
      {id:"shortcuts",label:"快捷键与输入技巧"},{id:"extensions",label:"六大扩展怎么选"},
      {id:"skills-hooks",label:"Skills / Hooks / MCP / 子代理"},{id:"playbook",label:"八大场景实战手册"},
      {id:"context",label:"上下文管理进阶"},{id:"permissions",label:"权限与安全"},
      {id:"config-auth",label:"配置与账号全解"},{id:"ecosystem",label:"生态精选:方法论与组合拳"},
      {id:"pitfalls",label:"避坑清单"},{id:"templates",label:"开箱即用模板库"},
      {id:"resources",label:"资源索引"}
    ]
  },
  {
    href: "topics/codex-guide.html", icon: "🟢", tag: "使用指南", color: "#0d9373",
    title: "Codex 使用指南 · CLI × IDE × Cloud",
    desc: "OpenAI 编码代理全景:20+ 子命令与 40+ 斜杠命令速查、沙箱与审批 3×3 详解、AGENTS.md、Skills/MCP,以及与 Claude Code 的协同打法。",
    meta: ["5 种形态", "沙箱 3 档详解", "双代理协同", "基于 0.14x"],
    sections: [
      {id:"overview",label:"Codex 全景"},{id:"setup",label:"安装与登录"},
      {id:"commands",label:"命令速查手册"},{id:"sandbox",label:"沙箱与审批"},
      {id:"agents-md",label:"AGENTS.md 与记忆"},{id:"skills-mcp",label:"Skills / 插件 / MCP"},
      {id:"config-auth",label:"配置与账号全解"},
      {id:"cloud",label:"云端与多形态"},{id:"playbook",label:"实战场景手册"},
      {id:"pitfalls",label:"避坑与协同"},{id:"resources",label:"资源索引"}
    ]
  }
];
