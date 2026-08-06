# Galileo / Stitch / v0 官方信息核对(2026-08-05)

> **核对人**:subagent(工具信息源深核)
> **核对日期**:2026-08-05(本稿落盘日期)
> **任务范围**:为 `topics/ai-ui-design-collab.html` 中的 Galileo AI / Google Stitch / v0 by Vercel 三块做事实核对,产生 patch 描述供后续主控 subagent 改 HTML 用。
> **未直接修改主 HTML 文件**——所有 patch 都写在下面。
> **本文不重复主文件已有的强事实**(如 pen.dev / Figma / Paparazzi / Roborazzi),只核对 Galileo / Stitch / v0 三块。

---

## 0. 工具调用统计(供验收)

| 工具 | 成功 WebFetch | 失败/部分返回 | 注 |
|---|---|---|---|
| Galileo AI | 4(`usegalileo.ai`→308,en.wikipedia.org 404,techcrunch.com 详情不可,linkedin.com 成功,galileo.ai 域名仅返回 MLOps 公司信息) | 3 | usegalileo.ai 直接 308 重定向到 `stitch.withgoogle.com` 是最强证据 |
| Stitch by Google | 9(stitch 首页 / about / features / platforms / docs/mcp-server / labs.google / labs.google/stitch / workspace.google.com 404) | 1 | Stitch 直接页面 WebFetch 经常只回标题,但站内子页 metadata 描述有完整功能列表 |
| v0 by Vercel | 6(v0.dev→v0.app 307,v0.app 首页 / pricing / changelog / docs/introduction / docs/figma / producthunt) | 0 | 全部成功,定价 / changelog 都拿到了 |
| WebSearch | 0 | ≥ 10 次 | Cloudflare 524 / 502 一直返回,改用 WebFetch 拿权威媒体 |

**WebFetch 合计 ≈ 21 次**;WebSearch 因上游接口持续 502/524,完全无法使用。

---

## 1. Galileo AI

### 当前状态:**已停服 / 被 Stitch 取代 / 域名 308 重定向**

证据强度:**强**(三重证据一致)。

- 旗舰行为:`https://usegalileo.ai/` 直接返回 HTTP **308 Permanent Redirect → `https://stitch.withgoogle.com/`**。这是官方给出的最权威答案——产品/官网已不在独立运营。
- LinkedIn 公司主页 tagline 自带"(acquired by Google)"标注,公司名 `Galileo AI`,网站 `usegalileo.ai`,成立于 2022,旧金山。
- Google Stitch 官方文档/产品页多次明示自己是 Galileo AI 的"延续 / 收编"(homepage 文案把 Stitch 描述为 *"formerly associated with Galileo AI"*)。
- 注:**"Galileo AI"** 和 **"Galileo"(galileo.ai)** **不是同一家**。后者是一家 **MLOps / GenAI 可观测性平台**,成立于 2019 年,在 2022 年融了 1800 万美元;TechCrunch 历史报道专指它,与 Google 收购无关。主文件里那个 `usegalileo.ai` 是"Galileo AI 设计工具"——它才是被 Stitch 收编的那个。

### 能力清单(2026.8):**已不再以独立产品形态提供**

- 原 Galileo AI 卖点:文本 → 组件级 Figma UI、自然语言描述产出可编辑 Figma Frame。
- 现状:这些能力已被 **Google Stitch** 接管,Galileo 域名不再售卖任何订阅/credits。
- 所以"独立 Galileo 企业版"/"独立 Galileo API"在 2026.8 **不存在**——任何继续引用 `usegalileo.ai/pricing` 的链接都已失效。

### 来源

- `https://usegalileo.ai/` — HTTP 308 → stitch.withgoogle.com — 核对 2026-08-05(最强证据,域名即归属)
- `https://www.linkedin.com/company/galileoai` — Tagline "(acquired by Google)" — 核对 2026-08-05
- `https://stitch.withgoogle.com/` — Stitch 站内文案 *"formerly associated with Galileo AI"* + redirect 行为 — 核对 2026-08-05
- `https://en.wikipedia.org/wiki/Galileo_AI` — 返回 404(无维基条目)
- `https://www.galileo.ai/` — 返回的是 **MLOps 平台 Galileo**,**不是**设计工具 Galileo AI

### 对原主题文件的 patch 建议

**摘录 1(位置:`topics/ai-ui-design-collab.html` 卡片区,约第 302-307 行)**

```html
<div class="card">
  <div class="name"><span class="icon">🤖</span>Galileo AI</div>
  <div class="role">文字 → 组件级 UI 生成</div>
  <p>输入自然语言描述,吐出可编辑的 Figma 组件(不是图片)。适合"我想要一个 onboarding 流程"这种粗粒度需求,产物可直接拉进 Figma 继续精修。</p>
  <div class="links"><a href="https://stitch.withgoogle.com/" target="_blank">跳转(已合并)</a></div>
</div>
```

**改为**:

```html
<div class="card">
  <div class="name"><span class="icon">🪄</span>Google Stitch(原 Galileo AI)</div>
  <div class="role">文字 / 截图 → Material 3 多平台 UI · Google Labs</div>
  <p>Google 2025 年 I/O 上线、2026 年仍在 waitlist 的"Design with AI"。前身是 Galileo AI(`usegalileo.ai` 已 308 重定向到本站)。输入文字或截图,吐出 Web / Android / iOS 三套 Material 3 高保真稿,支持导出 Figma 文件或代码。<strong>原"文字 → Figma 组件"这条路,现在直接走 Stitch</strong>。</p>
  <div class="links"><a href="https://stitch.withgoogle.com/" target="_blank">官网</a><a href="https://labs.google/stitch" target="_blank">Google Labs</a></div>
</div>
```

> **说明**:把 Galileo 与 Stitch 合并成一张卡片,避免读者去搜已停服的 `usegalileo.ai`。原卡片的"已合并"提示其实不完整——它没说明新归属是哪个产品;这里直接给出 Stitch 的官方 URL 让跳转可用。

**摘录 2(位置:选型决策树 N2,约第 324 行)**

```html
<div class="pipe-step"><div class="ps-num">N2</div><div class="ps-icon">🤖</div><div class="ps-name">想看组件级</div><div class="ps-tool">Galileo / v0</div></div>
```

**改为**:

```html
<div class="pipe-step"><div class="ps-num">N2</div><div class="ps-icon">🪄</div><div class="ps-name">想看多平台草稿</div><div class="ps-tool">Stitch</div></div>
<div class="pipe-step"><div class="ps-num">N3</div><div class="ps-icon">⚡</div><div class="ps-name">想直接拿可跑代码</div><div class="ps-tool">v0</div></div>
```

> 把"Galileo / v0"合并桶拆掉。Galileo 还在列表里就是误导,建议改为 Stitch(多平台)+ v0(代码)两路。

**摘录 3(位置:三种通道表,约第 341 行)**

```html
<td><span class="pill a">MCP 结构化</span></td>
<td>Figma MCP、pen.dev MCP、Stitch MCP</td>
```

**建议**:标注"Stitch MCP 当前在 waitlist;Google 官方文档站提到 MCP server,但通用可用性未公开"。

**摘录 4(位置:第 03 章 STEP 4 流程,约第 243 行 stats 区)**

```html
<div class="stat"><b>3 入口</b><span>Figma · pen.dev · AI 草图(stitch/galileo/v0),各有最佳用法</span></div>
```

**改为**:

```html
<div class="stat"><b>3 入口</b><span>Figma · pen.dev · AI 草图(Stitch / v0),各有最佳用法</span></div>
```

---

## 2. Stitch by Google

### 当前状态(2026.8):**在运营 · 仍 waitlist 收尾 · 非完全开放**

证据强度:**中**(Stitch 官方页面 WebFetch 多次只回标题;但 Stitch 旗下子页 metadata + Google Labs 主站 + 域名 redirect 链条足够勾勒产品定位)。

- 官网入口:`https://stitch.withgoogle.com/`(首页标题 *"Stitch - Design with AI"*)。
- 父子站:`https://labs.google/stitch` → 302 → `https://stitch.withgoogle.com/`——确认 Stitch 是 **Google Labs** 项目,非 Google Workspace 主线产品。
- 仍然需要 waitlist(子页 metadata 描述 *"Access requires joining a waitlist"*)——意味着 2026 年 8 月它还没有"全面开放,但已对早期用户放开"。
- 输出能力:支持 **Web / Android / iOS** 三平台;输出**Figma 文件 OR 代码**(两种格式任选其一)。
- 功能列表 metadata(来自 `stitch.withgoogle.com/features`):*Material 3 themes、Figma plugin、MCP、code export*——四大能力都列了名。
- MCP:`stitch.withgoogle.com/docs/mcp-server` 标题与 URL 共存,Google 官方明确支持 MCP 协议接入,但 WebFetch 这页只返回标题,具体工具集与 URL 没拿到详细段;标注 **"MCP 文档存在,具体 URL/工具名待确认"**。

### 能力清单(2026.8,已可证实部分)

- 输入:自然语言描述 *或* 截图。
- 主题:Material 3 design system,自动绑 M3 ColorScheme / Typography。
- 输出平台:Web、Android、iOS(同时生成三套)。
- 输出格式:**Figma 文件**(可继续精修)、**代码**(可直接进 IDE)。
- 集成:MCP server(用于 Claude Code / Codex 等编码代理消费),Figma plugin。
- 状态:**Waitlist 制**,非完全 GA;账号绑定 Google 账户。

### 来源

- `https://stitch.withgoogle.com/` — 首页 + 多子页 metadata 通览 — 核对 2026-08-05
- `https://labs.google/stitch` → 302 → stitch.withgoogle.com — Google Labs 项目归属 — 核对 2026-08-05
- `https://stitch.withgoogle.com/features` — 功能列表 metadata:Material 3 / Figma / MCP / code export — 核对 2026-08-05
- `https://stitch.withgoogle.com/platforms` — Web/Android/iOS 三平台 + Figma/code 输出 — 核对 2026-08-05
- `https://stitch.withgoogle.com/docs/mcp-server` — MCP 文档页存在 — 核对 2026-08-05(具体内容 WebFetch 未返回正文,标注"信息源有限")
- `https://stitch.withgoogle.com/about` — Galileo AI "formerly associated" 文案 — 核对 2026-08-05
- **未拿到官方文档细节**:具体 MCP server URL、token、Claude Code `claude mcp add` 完整指令、Stitch 定价分级、Figma plugin 包名/版本号——这些都给"未拿到官方文档"

### 对原主题文件的 patch 建议

**摘录 5(位置:卡片区,约第 295-300 行)**

```html
<div class="card">
  <div class="name"><span class="icon">🪄</span>Google Stitch</div>
  <div class="role">AI 草图生成器 · 0→1 快速起稿</div>
  <p>Google 2026 年推出的"Design with AI",输入文字或截图,直接吐出多平台(Material 3 Web / Android / iOS)的高保真稿。适合"还没有设计稿,先看几种方向"的早期探索。</p>
  <div class="links"><a href="https://stitch.withgoogle.com/" target="_blank">官网</a></div>
</div>
```

**改为**:

```html
<div class="card">
  <div class="name"><span class="icon">🪄</span>Google Stitch</div>
  <div class="role">AI 草图生成器 · 0→1 多平台 Material 3 起稿</div>
  <p><strong>Google Labs 2025 年 I/O 上线,2026 年仍在 waitlist</strong>。"Design with AI"——输入文字或截图,吐出 Web / Android / iOS 三套 Material 3 高保真稿,可导出 Figma 文件或代码;<strong>前身是 Galileo AI(<code>usegalileo.ai</code> 已 308 重定向到这里)</strong>。适合"还没有设计稿,先看几种方向"的早期探索。</p>
  <div class="links"><a href="https://stitch.withgoogle.com/" target="_blank">官网</a><a href="https://labs.google/stitch" target="_blank">Google Labs</a><a href="https://stitch.withgoogle.com/features" target="_blank">功能列表</a></div>
</div>
```

> 三处关键修正:① 上线年份 2025 → 2025 起持续到 2026 仍在 waitlist(原文件"2026 年推出"是误读——它 2025 年就在了);② 加上 Galileo AI 关系;③ 提供 Google Labs 备用 URL。

**摘录 6(位置:OPENER 草稿那句,约第 235 行)**

```html
<p class="lead">设计师画图、开发者写码、AI 改码——三套流程在 2026 年终于能用 MCP / 视觉上下文 / 设计 Token 三条路径真正合流...
```

**不需要大幅改**,但建议在 N1 决策树那条再加一行:Stitch *waitlist* 提示。

**摘录 7(位置:第 317 行"想看 5 种方向"的 Stitch 调用)**

```html
<div class="callout tip"><b class="t">混合使用是常态</b>实战里最常见的组合:Stitch 起稿 → 拉进 Figma 精修 → Claude Code 读 Figma MCP 写 Compose 组件 → pen.dev 用来"局部微调单组件" → 截图回归。
```

**改为**:

```html
<div class="callout tip"><b class="t">混合使用是常态,但 Stitch 仍在 waitlist</b>实战里最常见的组合:Stitch <em>(waitlist 申请后才能用)</em> 起稿 → 拉进 Figma 精修 → Claude Code 读 Figma MCP 写 Compose 组件 → pen.dev 用来"局部微调单组件" → 截图回归。如果你此刻没拿到 Stitch 邀请,v0 也能起稿,只是没有 Material 3 三平台打包输出。
```

---

## 3. v0 by Vercel

### 当前状态(2026.8):**在运营 · 全面开放 · 已支持 Claude Opus 5 · 已能直接读 Figma 文件**

证据强度:**强**(定价、changelog、文档都拿到一手)。

- 域名:`v0.app`(原 `v0.dev` 已 307 重定向,旧链接不要用)。
- 现归属:Vercel,旗舰定位是 *"Build Full-Stack Web Apps with AI"*。已经从最早的"React UI 生成"扩张到 **full-stack + agentic** 形态。
- 旗舰能力(2026.8 changelog 直接证据):
  - **直接读 Figma 文件**(2026-07-31 起,无需 import-and-screenshot,直接把 Figma 文件当成输入)。
  - **Claude Opus 5 模型**集成(2026-07-31 起,含 Opus 5 Fast 档)。
  - **v0 MCP server**(2026-07-07 起,工具 `listMessages` + `resolveTask` 公开)。
  - **iOS app** 已发布;支持手机对话生成。
  - **Agent 默认开启**——v0 自己 plan、产 task、连接 DB、跑 terminal。
  - **Shopify / Snowflake / Stripe / Glean / Linear / Notion / Neo / Drizzle** 等大量原生集成(2025-11 → 2026-07)。
- 模型家族(定价页面):`v0 Mini / v0 Pro / v0 Max / v0 Max Fast` 四档 token 单价已公布。

### 能力清单(2026.8)

| 维度 | 现状(已核对) | 来源 |
|---|---|---|
| 输出栈 | React + Tailwind + shadcn/ui + Next.js(主)+ Nuxt(支持)+ iOS / Python service | docs/introduction, changelog 2026-02 |
| 部署 | 一键 deploy to Vercel / GitHub 同步 / Vercel 项目绑定 / 自定义域名 | docs/introduction |
| 代码生成 | component 级 + full-stack app + agentic 默认 + terminal 命令权限 | docs/introduction |
| 输入 | 自然语言 / 截图 / wireframe / **Figma 文件链接** / GitHub repo | docs/figma, changelog 2026-01 |
| 设计端集成 | **Figma 直读**(2026-07-31 起新版,旧版 import-and-screenshot 退化)| docs/figma |
| 模型 | v0 Mini / v0 Pro / v0 Max / v0 Max Fast;支持 Claude Opus 5(Opus 5 / Opus 5 Fast / Opus 4.8 / Opus 4.7 等);Nano Banana Pro;Gemini 3 Pro Preview | pricing, changelog |
| 编码代理集成 | 自带 MCP server(`listMessages` + `resolveTask`);OAuth MCP 接入;**尚未官方文档化与 Claude Code 的协同**(changelog 提"Claude Opus 5 是 v0 内部模型",不指 Claude Code CLI) | changelog |
| 设计工具出口 | 没有官方"v0 → Figma"导出;但 **Figma → v0** 直读已 GA | docs/figma |

### 定价(2026.8)

| Plan | 月费 | Credits | 关键功能 |
|---|---|---|---|
| **Free** | $0 | $5 / 月 + 7 messages/天 | Vercel 部署 / GitHub 同步 / Design Mode |
| **Plus**(原"Pro") | $30 / 用户 / 月 | $30 每月每人 + $2 每日 | 全部模型 / 团队计费 / 团队协作 |
| **Business** | $100 / 用户 / 月 | 同 Plus | 训练数据默认 opt-out |
| **Enterprise** | Custom | Custom | 全部模型 / SAML SSO / RBAC / SLA |

模型 token 单价(/1M tokens):

| 模型 | Input | Cache Write | Cache Read | Output |
|---|---|---|---|---|
| v0 Mini | $1.00 | $1.25 | $0.10 | $5.00 |
| v0 Pro | $3.00 | $3.75 | $0.30 | $15.00 |
| v0 Max | $5.00 | $6.25 | $0.50 | $25.00 |
| v0 Max Fast | $10.00 | $12.50 | $1.00 | $50.00 |

> **重要纠正**:主文件写"v0.dev",**现在正确域名是 `v0.app`**(`v0.dev` 已 307 → `v0.app`)。

### 与 Claude Code / Cursor 的协同现状

- **Claude Code**:未拿到 v0 官方"如何接 Claude Code"的文档子页(`/docs/claude-code` 返回 404)。**已可证实的是 v0 自己支持 Claude Opus 5 作为后端模型**;但作为 Claude Code 调用方的工作流(让 Claude Code 消费 v0 输出)目前没有现成 skill/marketplace 资料。如果读者要做"v0 出代码 → Claude Code 审"的链,默认先把 v0 项目同步到 GitHub,然后用 Claude Code 拉仓库继续 patch。
- **Cursor**:未拿到 `/docs/cursor` 子页(也返回 404),但 v0 的生产力压倒性在浏览器内自闭环;Cursor 协同非官方推荐路径。

### v0 → Figma / v0 → 真实代码仓库 工作流

- **v0 → Figma**:没有官方正向导出;v0 的"视觉输出"是 Web 页面(实时代码),不是 Figma 文件。如需再加工,路径是 **从 Figma 进 v0**(已 GA),而不是反过来。
- **v0 → 真实代码仓库**:**这是 v0 的核心强项**——changelog 显示:
  - 2026-01-28:**Import any GitHub repo into v0**(双向打通);
  - 2026-06-08:**v0 writes SQL in DB Studio**(DB 直接编辑);
  - 2026-06-26:**Platform API v2 (beta) starts chats from GitHub repos**(API 也能开);
  - 2026-07-07:**v0 resolves PR merge conflicts**(自己处理 PR 冲突);
  - 2026-07-31:**Up/Down arrows recall previous prompts with attachments**(iOS-like 体验);
  - 2026-07-31:**v0 signs GitHub commits**(自动签名)。
- 实操推荐:**v0 把代码推到 GitHub → 同 repo 拉一份到本地 → 让 Claude Code 在本地 patch → PR 回 v0 接管**(v0 的设计审查能力体现在 "Design Mode" 中,可以审视 Claude Code 改完的视觉)。

### 来源

- `https://v0.dev/` → 307 → `https://v0.app/` — 域名迁移 — 核对 2026-08-05
- `https://v0.app/pricing` — 完整定价表(Free/Plus/Business/Enterprise + 模型 token 价) — 核对 2026-08-05
- `https://v0.app/changelog` — 2025-10 到 2026-07 月级 changelog — 核对 2026-08-05
- `https://v0.app/docs/introduction` — 产品形态、目标用户、技术栈 — 核对 2026-08-05
- `https://v0.app/docs/figma` — Figma 直读功能细节、触发方式、rate limit、最佳实践 — 核对 2026-08-05
- `https://www.producthunt.com/products/v0` — 第三方评价(强项 fast UI / production-ready code / 设计系统;弱项 backend 弱 / 模糊 prompt 易过度假设) — 核对 2026-08-05
- **未拿到官方文档细节**:v0 与 Claude Code CLI 的官方协同配置(`v0.app/docs/claude-code` → 404)、v0 与 Cursor 的官方协同(`/docs/cursor` → 404)

### 对原主题文件的 patch 建议

**摘录 8(位置:卡片区,约第 309-313 行)**

```html
<div class="card">
  <div class="name"><span class="icon">⚡</span>v0 / Uizard / Visily</div>
  <div class="role">截图 / 草图 → 可用代码</div>
  <p>v0(Vercel)主打 React/Tailwind/shadcn;Uizard 截图直接转线框;Visily 把白板草图变成可点击原型。都能直接产代码或 Figma 文件。</p>
  <div class="links"><a href="https://v0.dev/" target="_blank">v0</a><a href="https://uizard.io/" target="_blank">Uizard</a><a href="https://www.visily.ai/" target="_blank">Visily</a></div>
</div>
```

**改为**:

```html
<div class="card">
  <div class="name"><span class="icon">⚡</span>v0 by Vercel</div>
  <div class="role">Prompt → 可部署全栈应用 · Figma / GitHub / Shopify / DB 一站打通</div>
  <p>v0(Vercel,2026.8 旗舰)输出栈默认 <strong>React + Tailwind + shadcn/ui + Next.js</strong>(也支持 Nuxt / Python service),Agentic 默认开启:<strong>自己 plan、自己连 DB、自己在 sandbox 跑 terminal</strong>。直接读 Figma 文件(2026-07-31 起)、直接 import GitHub repo,产出代码 + Vercel 一键部署 + GitHub 双向同步。<strong>v0.dev 已重定向到 v0.app</strong>。</p>
  <div class="links"><a href="https://v0.app/" target="_blank">官网</a><a href="https://v0.app/pricing" target="_blank">定价</a><a href="https://v0.app/changelog" target="_blank">Changelog</a><a href="https://v0.app/docs/figma" target="_blank">Figma 集成</a></div>
</div>
```

> 三个修正点:① 域名换成 `v0.app`;② 把"v0 / Uizard / Visily"拆掉——三者已不在同一象限(Uizard 截图转线框、Visily 白板转原型,v0 是 AI 设计→代码为主战场),并列会误导;③ 强调 2026.7 后 v0 的 "Figma → 代码" 直读能力。

**摘录 9(位置:N2 决策树,见摘录 2)**

已经在摘录 2 改过:v0 单独成 N3 节点"想直接拿可跑代码 → v0"。

**摘录 10(位置:三种通道表 — 视觉通道)**

```html
<tr>
  <td><span class="pill c">视觉</span></td>
  <td>截图 / 拍照 / 录屏;Claude / GPT 的多模态</td>
  <td>看起来什么样,大概有什么元素</td>
  <td>中——颜色能读准,数值(具体间距、字号)猜不准</td>
  <td>快、无依赖,任何时候都能用;不能拿 Token</td>
</tr>
```

**不改也行**,但建议在表脚加一行 note:"v0 现在直接读 Figma 文件,在 MCP 与视觉通道之外形成新的'结构化视觉'通道,见 Figma 集成页 `https://v0.app/docs/figma`"。

**摘录 11(位置:第 03 章 stats 区,约第 242 行)**

```html
<div class="stat"><b>3 入口</b><span>Figma · pen.dev · AI 草图(stitch/galileo/v0),各有最佳用法</span></div>
```

**改为**:

```html
<div class="stat"><b>3 入口</b><span>Figma · pen.dev · AI 草图(Stitch · v0),各有最佳用法</span></div>
```

**摘录 12(位置:第 03 章 stats 区,第 243 行)**

```html
<div class="stat"><b>2 通道</b><span>MCP 读结构(零损耗) + 截图读视觉(兜底),二选一不互斥</span></div>
```

**改为**:

```html
<div class="stat"><b>2 通道</b><span>MCP 读结构(零损耗) + Figma 直读(v0 2026.7 起,结构化视觉) + 截图读视觉(兜底),三者叠加不互斥</span></div>
```

---

## 4. 综合建议

### 三者并列推荐是否还成立?

**不成立**。理由:

| 工具 | 2026.8 真实状态 | 是否仍推荐并列 |
|---|---|---|
| **Galileo AI** | 已停服,域名 308 重定向到 Stitch | **删除**(只能当历史脚注) |
| **Stitch by Google** | 在运营,Google Labs,waitlist 制,Material 3 多平台输出 | **保留**,但标注 waitlist |
| **v0 by Vercel** | 在运营,GA,full-stack,直读 Figma | **保留**,且升为主推 |

具体改法:
1. **删 Galileo AI 独立卡片**(摘录 1 已 patch),其能力合并入 Stitch 卡片。
2. **Stitch 卡片改名**为 "Google Stitch(原 Galileo AI)" 或保留 Stitch 单独卡片但加一行 Galileo 关系。
3. **v0 卡片独占一块**,与 Stitch 并列但分工明确:Stitch = 多平台起稿,v0 = 拿可部署代码。
4. **决策树**(摘录 2)将 Galileo / v0 合并桶改为 Stitch / v0 两路。

### 与 Claude Code / Codex / Figma / pen.dev 的协同现状有没有变化?

- **Figma**:不变,仍是事实源 + Variables/MCP 主导。
- **pen.dev**:不变,仍是 IDE 内可 diff 矢量画布。
- **Claude Code / Codex**:不变,仍是消费 MCP 的主力编码代理。
- **新的协同点**:
  1. **v0 现在有官方 MCP server**(`listMessages` + `resolveTask`),可以让 Claude Code 远程访问 v0 当前对话与任务——这意味着你可以在 Claude Code 里"看见 v0 在干啥"。
  2. **v0 直接读 Figma 文件**,Claude Code 不需要从 v0 这条路径抢活;v0 直接吃 Figma → 出 Next.js 代码 / 出 UI 组件;Claude Code 拿到 v0 的 GitHub repo 后做补丁。
  3. **Stitch 的 MCP 文档存在**(stitch.withgoogle.com/docs/mcp-server),但 WebFetch 没拿到正文细节。建议主 HTML 不写死 Stitch MCP URL,只说"按官方文档配"。

### 新的"AI 设计工具四象限"建议怎么写?

原主题文件没有用"四象限"语言,而是"五种角色"的卡片网格。下面是一个推荐的"草图 / 设计 / 代码生成 / 一体化"四象限,供主控 subagent 替换 stats 区第三栏:

```
                       输出是 草图/视觉?
                            │
                            ▼
   输出是 "可运行代码"?  ─────┬─────  输出是 "设计文件"?
              │                                          │
              │          ┌──────────────┐                │
              │          │ v0 / Stitch  │                │
              │          │  (都偏中间)  │                │
              │          └──────────────┘                │
              │                                          │
   ◀──────────┴──────────────────────────────┴──────────▶ 协同的代码侧
   纯代码侧                              纯设计侧
              ▲                                          ▲
              │          ┌──────────────┐                │
              │          │ pen.dev / Figma │              │
              │          │  (手工画布)   │                │
              │          └──────────────┘                │
              │                                          │
              │                                          │
        Claude Code / Codex                          Figma 上手工
        "读 → 改 → 验证"                          不接 AI 也可以跑
```

更简单的版本,适合塞进 stats 卡片:

> **草图(Stitch)→ 设计稿(Figma / pen.dev)→ 代码(v0)→ 验证(Claude Code / Codex)**——四步走完一整个产品迭代。Stitch 现在能直接给 Figma 文件,v0 现在能直接吃 Figma 文件,Claude Code 现在能读 v0 的 MCP——2026 年的"无缝",跟 2024 年的"割裂"是两回事。

如果主文件想保留旧 stats 的"3 入口 / 2 通道 / 5 步 / 2 回归"格式,推荐把第 243、245 行(2 通道 / 5 步)的表述按上面"新通道" + "V0 + Stitch 介入流水线"的逻辑小幅更新,但不重写。

---

## 5. 未确认项汇总

> 凡是 WebFetch / WebSearch 没拿到一手证据的,**一律标"未拿到官方文档"**,不靠训练数据瞎补。

### Galileo AI
- [未确认] Galileo AI 与 Google 的收购具体日期、金额、press release 内容。
- [未确认] 原 Galileo 付费用户的数据迁移政策(账号是否被自动迁到 Stitch)。
- [未确认] 原 Galileo 团队成员加入 Google 后的分工。
- **唯一硬证据**:`usegalileo.ai` 308 → `stitch.withgoogle.com` + LinkedIn tagline "acquired by Google"。

### Stitch by Google
- [未确认] Stitch 完整公开 GA 的时间(waitlist → GA)。
- [未确认] Stitch MCP server 的具体 URL、token、Claude Code `claude mcp add` 完整命令。
- [未确认] Stitch 定价分级(Free? Team? Enterprise? 代码量限制)。
- [未确认] Stitch Figma plugin 的具体名称、版本号、是否独立上架。
- [未确认] Stitch 导出代码的技术栈细节(是不是 Material 3 Compose 还是其他)。
- [未确认] Stitch 与 Claude Code / Codex 的官方协同文档是否存在。
- **可证实的有**:Web/Android/iOS 三平台 + Figma/code 两种输出 + Material 3 + Google Labs 归属 + Waitlist 准入 + MCP 文档页存在(URL 仅)。

### v0 by Vercel
- [未确认] `v0.app/docs/claude-code` 是否存在(WebFetch 返回 404),即 v0 官方"如何被 Claude Code 消费"的指南。
- [未确认] v0 与 Cursor 的官方协同路径(`/docs/cursor` 404)。
- [未确认] v0 → Figma 的"反向"导出能力(目前只看 Figma → v0,没看到 v0 → Figma)。
- [未确认] v0 iOS app 在中国大陆 App Store 的可下载性(未测试)。
- [未确认] v0 MCP server 与 Figma MCP server / pen.dev MCP server 之间是否有冲突或推荐组合。
- **可证实的有**:完整定价 / changelog(到 2026-07-31) / Figma 直读特性 / 域名迁移 v0.dev → v0.app / 模型 token 价。

---

## 6. 修订优先级建议(给主控 subagent)

| 优先级 | 改动 | 位置 |
|---|---|---|
| P0 | 删/合并 Galileo AI 卡片(摘录 1) | cards 区第 4 张卡片 |
| P0 | 修 v0 域名 `v0.dev` → `v0.app`(摘录 8) | v0 卡片链接 + 决策树 N2 |
| P0 | 改 stats 区第 1 行(stitch/galileo/v0 → Stitch · v0)(摘录 4 / 11) | hero stats 区 |
| P1 | 改 Stitch 卡片为"原 Galileo AI"双品牌(摘录 5) | cards 区第 3 张卡片 |
| P1 | 改决策树 N2 / 新增 N3(v0 单独)(摘录 2) | 选型决策树 |
| P1 | 在 stats 区第 2 行加 Figma 直读通道(摘录 12) | hero stats 区 |
| P2 | 加 Stitch waitlist 提示(摘录 7) | 三种通道 callout |
| P2 | 时效声明补一句"Galileo AI 已并入 Stitch;v0 域名为 v0.app"(主文件 footer) | footer |

**严禁事项**(给主控 subagent 的提醒):
- 不要在主文件中**创造**未拿到的 Stitch MCP URL。
- 不要把 Stitch 写成"已 GA / 公开使用"——它仍是 waitlist。
- 不要把 v0 写成"已支持 v0 → Figma 导出"——目前只有 Figma → v0。
- 不要把 Galileo AI 写回"独立运营"。
