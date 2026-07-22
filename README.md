<div align="center">

# 📚 AI 知识库

**Claude Code · Codex · Pencil 中文实战手册 —— 官方文档 + 全网精华,一站查完**

[![在线访问](https://img.shields.io/website?url=https%3A%2F%2Faidoc-zq.netlify.app&up_message=在线访问&down_message=离线&style=flat-square&label=网站)](https://aidoc-zq.netlify.app)
[![Last Commit](https://img.shields.io/github/last-commit/JackyMe/ai-knowledge-base?style=flat-square&label=最近更新)](https://github.com/JackyMe/ai-knowledge-base/commits/main)
![零依赖](https://img.shields.io/badge/构建-零依赖-brightgreen?style=flat-square)
![语言](https://img.shields.io/badge/语言-中文-red?style=flat-square)

**[🌐 在线访问 aidoc-zq.netlify.app](https://aidoc-zq.netlify.app)**(主站) · [GitHub Pages 镜像](https://jackyme.github.io/ai-knowledge-base/) ·  [View in English »](README.en.md)

</div>

---

## 这是什么

一句话:把 **Claude Code、Codex、Pencil** 等 AI 编程工具的官方文档,和全网实测出来的最佳实践,揉成一个随时能查的中文知识库网站。

不是又一个"AI 生成的资料合集"——每条结论都标了来源链接(官方文档 / GitHub / 一手实测),争议点标出分歧,没查到证据的地方直接写"没查到",不瞎编。

**技术上刻意做减法**:没有 React、没有打包工具、没有 node_modules 黑洞。一个 `index.html` + 若干独立 HTML 页面就是全部,`git clone` 下来双击就能看,扔进任何静态托管平台就能上线。

<div align="center">

**9 个主题 · 120+ 章节 · 全站正文内容可搜索(含拼写容错)**

</div>

## 目录一览

| 主题 | 讲什么 | 亮点 |
|---|---|---|
| ⛏️ [Claude Code 使用指南](topics/claude-code-guide.html) | 干货版实战手册 | 100+ 命令速查(含高频核心命令墙)、8 大场景 Playbook、5 套开箱模板 |
| 🟢 [Codex 使用指南](topics/codex-guide.html) | CLI × IDE × Cloud 全形态 | 沙箱 × 审批 3×3 详解、AGENTS.md、与 Claude Code 双代理协同 |
| 🎯 [提示词与上下文工程](topics/prompt-context-engineering.html) | 从技法到心法的地基学科 | 7 大技法对照、12 式逐字模板、6 个原创案例、模型路由现状核查(如实标注"领域不成熟",不瞎编) |
| 🚑 [环境与登录急救手册](topics/env-auth-clinic.html) | 报错 30 秒对症自救 | 五层诊断法、一键体检脚本、共用电脑/换电脑/CI 三大剧本、三级万能重置 |
| 📘 [Pencil 官方文档中文版](topics/pencil-docs-zh.html) | docs.pencil.dev 全 16 页 | 含官方视频、逐节附原文链接 |
| ⚡ [Pencil × Claude Code 实践](topics/pencil-claude-code-best-practices.html) | 设计到代码的完整流水线 | 9+ 来源聚合、20+ 实测截图 |
| ⚡ [Android Crash & ANR 排查根治](topics/android-crash-anr.html) | 稳定性问题从识别到根治 | 30+ 崩溃类型图鉴、ANR 深度解剖、原创 AI 分诊 Skill |
| 🧭 [AI 提效全景与心法](topics/ai-leverage-guide.html) | AI 到底能帮普通人干什么 | 8 大场景收益矩阵、7 条有出处的通用心法 |
| 🧗 [Android 转型全栈](topics/android-to-fullstack.html) | 客户端老兵的转型作战手册 | 语言/UI/架构/数据四层硬核迁移、12 周路线、一人公司商业闭环 |

## 亮点功能

- **全站搜索能搜到正文里**——不只是标题和章节名,连段落内容都能命中,离线预生成索引,不依赖任何后端
- **模糊匹配兜底**——拼错字、漏字也能大概率搜到,同时做了跨度限制,避免长文本里瞎凑巧合命中
- **三条学习路径**——首页把 9 个主题串成"新手起步 / 工具精通 / 转型跃迁"三条课程表,不知道从哪看就跟着走
- **阅读记忆**——基于 `localStorage`,回到首页自动出现"继续上次阅读"
- **证据分级**——官方确认 / 实测强共识 / 存在分歧三档标签,读者一眼知道这条结论有多可信

## 目录结构

```
ai-knowledge-base/
├── index.html                  # 主题中心(入口):全站搜索 / 标签筛选 / 继续阅读 / 主题卡片
├── topics/                     # 各主题页(每页自包含主题样式)
│   ├── claude-code-guide.html
│   ├── codex-guide.html
│   ├── prompt-context-engineering.html
│   ├── env-auth-clinic.html    # 环境与登录急救手册(Claude Code × Codex)
│   ├── pencil-docs-zh.html
│   ├── pencil-claude-code-best-practices.html
│   ├── android-crash-anr.html
│   ├── ai-leverage-guide.html  # AI 提效全景与心法
│   └── android-to-fullstack.html # Android 转型全栈路线
├── assets/
│   ├── css/site.css            # 全站共享交互样式(进度条/筛选/复制/灯箱/跳转面板)
│   └── js/
│       ├── site.js             # 全站共享交互脚本(所有主题页引用同一份)
│       ├── topics.js           # 主题注册表 —— 唯一数据源
│       └── search-index.js     # 章节正文内容搜索索引(自动生成,见下)
├── scripts/
│   └── build-search-index.py   # 扫描 topics/*.html 生成 search-index.js
├── package.json                # 本地预览脚本
└── README.md
```

## 本地运行

```bash
git clone git@github.com:JackyMe/ai-knowledge-base.git
cd ai-knowledge-base
npm run dev        # 等价于 npx serve .,打开 http://localhost:3000
```

或者任何静态服务器都行:`python3 -m http.server 8000`。不需要安装依赖、不需要构建。

## 想扩展自己的主题?(三步)

1. 新主题 HTML 放进 `topics/`,并在 `</style>` 后和 `</body>` 前分别加入:
   ```html
   <link rel="stylesheet" href="../assets/css/site.css">
   <script src="../assets/js/site.js"></script>
   ```
   页面需包含:`.topbar`(内含 `.right`)、`#sidebar`(内含 `#sideFilter` 筛选框)、
   `#prog` 进度条、`#topBtn` 回顶按钮、`section[id]` + `h2/h3` 结构——参考现有主题页即可。
2. 在 `assets/js/topics.js` 的 `TOPICS` 数组追加一条(标题/图标/颜色/章节列表;可选 `keywords` 字段写口语化搜索别名)。若某章节是"速查手册"型高频入口,给它加 `quick:true` + `quickLabel:"展示文案"`,首页「⚡ 常用速查」快链会自动收录。
3. 重新生成搜索索引(新增/修改了任意 `topics/*.html` 正文都要跑一次):
   ```bash
   python3 scripts/build-search-index.py
   ```
4. 完成。首页卡片、标签筛选、章节快链、全站搜索自动生效,不用改 `index.html`。

## 部署到你自己的域名

**方式 A · Netlify Drop(最简,约 1 分钟)**
把整个文件夹拖进 [app.netlify.com/drop](https://app.netlify.com/drop),即得公网地址。

**方式 B · GitHub Pages**
Fork 本仓库 → 仓库 Settings → Pages → Source 选 `main` 分支根目录,即得
`https://<你的用户名>.github.io/ai-knowledge-base/`,之后每次 push 自动更新。

**方式 C · Cloudflare Pages / Vercel**
两者均支持"导入 Git 仓库",构建命令留空、输出目录填 `/` 即可。

> 本仓库自己线上的那份(aidoc-zq.netlify.app)用的是 `sync.sh` + `.git/hooks/post-commit`:配置好 Netlify token 后,`git commit` 会自动触发部署,细节见 `sync.sh` 源码注释。

## 说明

- 内容为个人整理的学习资料,大量参考官方文档与社区一手实践,**每页正文与文末均附来源链接**——有分歧的地方标出分歧,没查到证据的地方不硬编。如需转载请遵循原始来源的版权条款。
- 「继续阅读」与阅读位置基于浏览器 `localStorage`,不上传任何数据,不需要账号。
- AI 工具迭代很快,内容尽量标了核对日期,但请始终以官方文档为准。

