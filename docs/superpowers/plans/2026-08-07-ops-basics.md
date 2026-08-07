# ops-basics 主题实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development(推荐)或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框(`- [ ]`)语法来跟踪进度。

**目标:** 为 ai-knowledge-base 知识库新增主题页 `topics/ops-basics.html`(独立开发者运维基座 · 服务器 × 网络 × 部署),并完成全站注册、README 更新、搜索索引重建、commit + Netlify 自动部署。

**架构:**
- 单一自包含 HTML 页面,内嵌 `<style>`、侧栏导航、`<section id="..."> + h2/h3` 结构,与 `claude-code-guide.html` 风格完全一致
- 17 节内容(1 导读 + 1 路线 + 5+6+6 章节 + 3 附录),约 1100-1400 行
- 注册到 `assets/js/topics.js` 的 `TOPICS` 数组
- 重建 `assets/js/search-index.js`(`python3 scripts/build-search-index.py`)
- README 表格追加 1 行
- Netlify 部署通过 `sync.sh -D`(项目 post-commit hook 已配 token)

**技术栈:**
- HTML5 + 内嵌 CSS(变量驱动色板)
- 纯静态,无构建步骤
- 3 档证据分级标签:`✅ 官方确认 / ⚡ 实测强共识 / ⚠️ 存在分歧`
- `.callout.note/.tip/.warn`、`.tbl`、`.src`、`.badge`、`.stats`、`.h-grid`、`.quick-list` 等全站共用样式

---

## 文件结构

| 路径 | 操作 | 职责 |
|---|---|---|
| `topics/ops-basics.html` | 新建 | 主题正文(17 节,自包含样式) |
| `assets/js/topics.js` | 修改 | `TOPICS` 数组追加一条注册 |
| `README.md` | 修改 | 目录表格追加一行简介 |
| `assets/js/search-index.js` | 自动重建 | 由 `python3 scripts/build-search-index.py` 生成 |
| `assets/js/site.js` | 不动 | 已有通用交互(进度条/筛选/复制/灯箱) |
| `assets/css/site.css` | 不动 | 已有共用样式(全主题页通用) |

不创建脚本、不引入新依赖、不改 `index.html` 首页(首页卡片自动从 topics.js 渲染)。

---

## 任务 1:搭建 `topics/ops-basics.html` 骨架与全局样式

**文件:**
- 创建:`topics/ops-basics.html`(空骨架 + 内嵌样式 + 顶栏 + 侧栏 + 主区,无任何正文内容)
- 不创建新文件,不动其它

- [ ] **步骤 1:从 `claude-code-guide.html` 复制骨架并改造**

完整骨架(直接从 `topics/claude-code-guide.html` 第 1-280 行复制,然后改造色板和品牌):

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="[一句话简介,≤120 字]">
<meta property="og:type" content="article">
<meta property="og:title" content="[独立开发者运维基座 · 服务器 × 网络 × 部署] · 2026.08">
<meta property="og:description" content="[同 description]">
<meta property="og:url" content="https://aidoc-zq.netlify.app/topics/ops-basics.html">
<meta property="og:image" content="https://aidoc-zq.netlify.app/assets/img/social-preview.png">
<meta name="twitter:card" content="summary_large_image">
<title>[独立开发者运维基座 · 服务器 × 网络 × 部署] · 2026.08</title>
<style>
:root{
  --accent:#0891b2;        /* 青蓝,与现有 11 主题不撞 */
  --accent-2:#06b6d4;      /* 同色系亮 */
  --accent-soft:#ecfeff;   /* 极浅底 */
  --ink:#0c1e22; --bg:#ffffff; --bg-side:#f5f9fa;
  --bg-code:#0f1d22;
  --text:#0f2126; --text-2:#475a60; --text-3:#7c8d92;
  --border:#dbe6e9; --border-2:#cad7da;
  --tip-bg:#ecfdf5; --warn-bg:#fff8ec; --note-bg:#f0f9ff;
  --radius:12px;
  --font:-apple-system,BlinkMacSystemFont,"SF Pro SC","PingFang SC","Helvetica Neue","Microsoft YaHei",sans-serif;
  --mono:"SF Mono",ui-monospace,SFMono-Regular,Menlo,Consolas,"JetBrains Mono",monospace;
}
/* 以下所有 .* 选择器从 claude-code-guide.html 第 14-280 行 1:1 复制 */
</style>
</head>
<body>
[顶栏 + 侧栏 + 主区占位 + 进度条 + 回顶按钮 + 引 site.js/css]
</body>
</html>
```

**关键复制点**(从 `claude-code-guide.html` 1:1 抄,不要重写):
- 顶部 `.topbar` 60px 高度、`.logo` 渐变、`.menu-btn` 移动端按钮
- `.sidebar` 272px 宽 + `.nav-group` 分组样式
- `.main`/`.wrap`/`.hero` 三段 — hero 改为青蓝色径向高光
- `.stats .stat` 四宫格结构
- `.sec-tag`/`.callout` 三档配色
- `.tbl` 表格 + `.pill a` 圆形 chip
- 全套响应式 @media

- [ ] **步骤 2:侧栏导航占位(17 节锚点)**

```html
<aside class="sidebar" id="sidebar">
  <input id="sideFilter" placeholder="筛选章节…" />
  <nav id="sideNav">
    <div class="nav-group"><div class="gt">引子</div>
      <a href="#intro"><span class="no">00</span>为什么要学这个</a>
    </div>
    <div class="nav-group"><div class="gt">路线图</div>
      <a href="#roadmap"><span class="no">R</span>五阶段路线</a>
      <a href="#stage0"><span class="no">R1</span>现状盘点</a>
      <a href="#stage1"><span class="no">R2</span>Linux 基座</a>
      <a href="#stage2"><span class="no">R3</span>网络骨干</a>
      <a href="#stage3"><span class="no">R4</span>部署链路</a>
      <a href="#stage4"><span class="no">R5</span>故障排查</a>
    </div>
    <div class="nav-group"><div class="gt">模块 1 · Linux</div>
      <a href="#m1-1"><span class="no">1.1</span>什么是服务器</a>
      <a href="#m1-2"><span class="no">1.2</span>三大抽级概念</a>
      <a href="#m1-3"><span class="no">1.3</span>SSH 不只是登录</a>
      <a href="#m1-4"><span class="no">1.4</span>包管理器速查</a>
      <a href="#m1-5"><span class="no">1.5</span>权限与用户</a>
    </div>
    <div class="nav-group"><div class="gt">模块 2 · 网络</div>
      <a href="#m2-1"><span class="no">2.1</span>HTTP→TCP→IP</a>
      <a href="#m2-2"><span class="no">2.2</span>DNS</a>
      <a href="#m2-3"><span class="no">2.3</span>HTTPS/TLS</a>
      <a href="#m2-4"><span class="no">2.4</span>反向代理</a>
      <a href="#m2-5"><span class="no">2.5</span>防火墙与端口</a>
      <a href="#m2-6"><span class="no">2.6</span>常见攻击面</a>
    </div>
    <div class="nav-group"><div class="gt">模块 3 · 部署</div>
      <a href="#m3-1"><span class="no">3.1</span>部署 7 步流水线</a>
      <a href="#m3-2"><span class="no">3.2</span>systemd 进程托管</a>
      <a href="#m3-3"><span class="no">3.3</span>Nginx 反代模板</a>
      <a href="#m3-4"><span class="no">3.4</span>Docker 最小集</a>
      <a href="#m3-5"><span class="no">3.5</span>GitHub Actions</a>
      <a href="#m3-6"><span class="no">3.6</span>密钥与 .env</a>
    </div>
    <div class="nav-group"><div class="gt">附录</div>
      <a href="#appA"><span class="no">A</span>5 类故障对症表</a>
      <a href="#appB"><span class="no">B</span>推荐资源</a>
      <a href="#appC"><span class="no">C</span>术语速查</a>
    </div>
  </nav>
</aside>
```

- [ ] **步骤 3:验证 HTML 在浏览器中骨架完好**

运行:`cd ai-knowledge-base && python3 -m http.server 8765`(临时端口)
手动:`http://localhost:8765/topics/ops-basics.html`
预期:空骨架 + 侧栏 + 主区居中,无 console error

- [ ] **步骤 4:Commit 骨架**

```bash
cd ai-knowledge-base
git add topics/ops-basics.html
git commit -m "feat(ops-basics): 搭建主题骨架 — 顶栏 + 侧栏 + 17 节导航占位 + 青蓝色板"
```

---

## 任务 2:填充全部 17 节正文内容

**文件:**
- 修改:`topics/ops-basics.html`(在主区占位处填入所有 section)

- [ ] **步骤 1:填入导读 (`#intro`)**

必须包含:
- 痛点描述(独立开发者用 SaaS 托管的隐藏代价)
- 「这份文档的目标与不目标」分两栏(或 callout)
- 读者画像与前置知识
- 全局「证据三档」说明
- 一行字:「接下来你将经历 5 阶段路线,每阶段都有动手项目」

- [ ] **步骤 2:填入路线图 (`#roadmap`)**

完整 5 阶段表格,每行:阶段 / 目标 / 动手项目产出 / 验证标准 / 预计耗时
例:
| 阶段 | 目标 | 动手产出 | 验证标准 | 预计耗时 |
|---|---|---|---|---|
| R1 现状盘点 | 评估你现在的上线方式 | 一张「我的项目部署清单」 | 能列出每个项目用什么 SaaS、花多少钱、卡在哪 | 1 小时 |
| R2 Linux 基座 | 能 SSH 到陌生 VPS 看一眼 top | 一台装好 Nginx 的 VPS | `systemctl status nginx` 显示 active | 半天 |
| R3 网络骨干 | 域名 → DNS → SSL → 反代全跑通 | 一个 `yourdomain.dev` + HTTPS | https://yourdomain.dev 浏览器绿锁 | 半天 |
| R4 部署链路 | `git push` 自动部署 | 一个 Node 应用,GitHub Actions 自动部署 | 改一行代码 → push → 30 秒后线上生效 | 1 天 |
| R5 故障排查 | 5 类故障自助止血 | 附录 A 5 类故障实操一遍 | 制造 5 个故障,逐一自助修复 | 1 天 |

每个阶段下面是 `<h3 id="stageN">` 详情段(150-300 字),含具体命令、踩坑提醒、来源链接。

- [ ] **步骤 3:填入模块 1 全部 5 节 (`#m1-1` ~ `#m1-5`)**

每节 200-400 字,必须包含:
- 1 个"核心比喻"(让零起点秒懂)
- 1 段"操作清单"(具体命令)
- 1 个 `.callout.tip 或 .warn`(踩坑提醒)
- 1 个来源链接(官方文档/经典博客)

例 `m1-2`:
```html
<section id="m1-2">
  <h2 data-reveal>1.2 三大抽级概念:文件系统、进程、端口</h2>
  <p>把一台 Linux 服务器想成一个"办公室"……(比喻)</p>
  <h3>文件系统:一切皆文件</h3>
  <p>磁盘、网卡、鼠标、进程……(展开 200 字)</p>
  <h3>进程:正在运行的程序</h3>
  <p>ps / top / htop / systemctl ……</p>
  <h3>端口:窗口编号</h3>
  <p>0-65535,常见端口表</p>
  <pre><code>ss -tlnp   # 看哪些端口在监听</code></pre>
  <div class="callout warn">...</div>
  <p class="src">来源:<a href="...">[Linux 文件系统 - TLDR]</a> · 核对 2026-08-05</p>
</section>
```

- [ ] **步骤 4:填入模块 2 全部 6 节 (`#m2-1` ~ `#m2-6`)**

每节同模板(比喻 + 命令 + 警告 + 来源)。重点节:
- `m2-2` DNS:必须包含"为什么 ping 不通但 nslookup 行"的实操命令
- `m2-3` HTTPS:必须包含 `certbot --nginx` 3 命令跑通流程
- `m2-5` 防火墙:必须包含 `ufw allow` 与云厂商安全组的二选一陷阱

- [ ] **步骤 5:填入模块 3 全部 6 节 (`#m3-1` ~ `#m3-6`)**

每节同模板。重点节:
- `m3-2` systemd:必须含 `/etc/systemd/system/myapp.service` 完整配置模板(可直接抄)
- `m3-3` Nginx 反代:必须含 80/443 + WebSocket upgrade 完整 nginx.conf
- `m3-5` GitHub Actions:必须含 .github/workflows/deploy.yml 完整配置(SSH + rsync)

- [ ] **步骤 6:填入附录 A (`#appA`)—— 5 类故障 30 秒对症表**

用 5 个 `.callout.warn` 块,每块结构:
```html
<div class="callout warn">
  <b>症状:</b>502 Bad Gateway / 服务突然挂了
  <br><b>30 秒对症命令:</b><code>systemctl status myapp && journalctl -u myapp -n 50</code>
  <br><b>根因 90% 是这两类:</b>(1) 应用进程挂了;(2) 反代 upstream 端口不对
  <br><b>深度排查:</b>...链接到 m3-2 / m3-3
</div>
```

5 类故障必须覆盖:
1. 502/504 错误(反代 upstream 不通)
2. SSH 连不上(端口被墙 / 密钥错权限 / 安全组)
3. 磁盘写满(Inode 满 / 日志爆炸)
4. 服务内存泄漏 OOM
5. SSL 证书过期(certbot renew)

- [ ] **步骤 7:填入附录 B (`#appB`)—— 推荐资源**

按现有 `topics/claude-code-guide.html` 附录风格,至少 15 条,带分级标签:
- 官方文档:Nginx / systemd / Docker / Let's Encrypt
- 经典书:《TCP/IP 详解》卷一、《Linux 命令行与 shell 脚本编程大全》、《鸟哥的 Linux 私房菜》
- 实战社区:DigitalOcean Tutorials、VPS 玩家论坛
- 速查表:Linux Command Cheatsheet、Crontab guru

- [ ] **步骤 8:填入附录 C (`#appC`)—— 术语速查表**

~30 个常用术语,2 列表格:术语 / 一句话解释。例:
| 术语 | 一句话 |
|---|---|
| SSH | 加密的远程登录协议 |
| 反向代理 | 客户端连代理,代理再去连上游服务 |
| systemd | 现代 Linux 的"服务管家",管理进程的启动/自启/日志 |
| ... | ... |

- [ ] **步骤 9:填入「没查到」诚实声明至少 3 处**

在合适位置加 `.callout.note`:
- 例 1:"2026 年 SSH 跳板机的官方最佳实践我没查到统一定论,本人建议结合云厂商文档自查"
- 例 2:"Let's Encrypt 速率限制的官方最新数值没逐字核对,以 certbot.eff.org 为准"
- 例 3:"中国大陆 ICP 备案的 2026 细则没查到,实际办理以工信部官网为准"

- [ ] **步骤 10:浏览器中通读一遍,查错别字 + 链接失效**

运行:浏览器访问 `http://localhost:8765/topics/ops-basics.html`,滚动通读全文。
检查:每节至少 200 字 / 链接均有效 / 色板一致 / 侧栏 current 态正常

- [ ] **步骤 11:字数与覆盖率自检**

运行:
```bash
grep -c '<section id=' topics/ops-basics.html   # 应 ≥ 18(17 节 + 路径索引)
grep -c 'data-reveal' topics/ops-basics.html    # h3 应全配 data-reveal
wc -l topics/ops-basics.html                    # 1100-1400 行
```
预期:全部达标。

- [ ] **步骤 12:Commit 正文**

```bash
cd ai-knowledge-base
git add topics/ops-basics.html
git commit -m "feat(ops-basics): 填入 17 节正文 — 5 阶段路线 + 3 模块 + 5 类故障对症表"
```

---

## 任务 3:全站注册与索引

**文件:**
- 修改:`assets/js/topics.js`(TOPICS 数组追加一条 + 可选追加 PATHS)
- 修改:`README.md`(目录表格追加一行)
- 重生成:`assets/js/search-index.js`(`python3 scripts/build-search-index.py`)

- [ ] **步骤 1:在 `assets/js/topics.js` 的 `TOPICS` 数组追加主题**

定位:`grep -n "^const TOPICS" assets/js/topics.js`
找到结束位置(`]`)。

完整追加内容:
```javascript
{
  id: "ops-basics",
  href: "topics/ops-basics.html",
  title: "独立开发者运维基座",
  icon: "🛠️",
  color: "#0891b2",
  tagline: "服务器 × 网络 × 部署 · 从 0 到独立负责一个线上项目",
  desc: "5 阶段路线 + 3 模块 17 节 + 5 类故障 30 秒对症表。零起点也能从 SaaS 托管升级到自托管,掌握 Linux、网络、部署三大柱。",
  keywords: "运维 部署 服务器 网络 linux nginx docker systemd ssh ssl dns 反向代理 github actions",
  sections: [
    { id: "intro",    label: "为什么要学这个" },
    { id: "roadmap",  label: "五阶段路线图" },
    { id: "m1-1",     label: "1.1 什么是服务器" },
    { id: "m1-2",     label: "1.2 三大抽级概念" },
    { id: "m1-3",     label: "1.3 SSH 不只是登录" },
    { id: "m1-4",     label: "1.4 包管理器速查" },
    { id: "m1-5",     label: "1.5 权限与用户" },
    { id: "m2-1",     label: "2.1 HTTP→TCP→IP" },
    { id: "m2-2",     label: "2.2 DNS" },
    { id: "m2-3",     label: "2.3 HTTPS/TLS" },
    { id: "m2-4",     label: "2.4 反向代理" },
    { id: "m2-5",     label: "2.5 防火墙与端口" },
    { id: "m2-6",     label: "2.6 常见攻击面" },
    { id: "m3-1",     label: "3.1 部署 7 步流水线" },
    { id: "m3-2",     label: "3.2 systemd 进程托管" },
    { id: "m3-3",     label: "3.3 Nginx 反代模板" },
    { id: "m3-4",     label: "3.4 Docker 最小集" },
    { id: "m3-5",     label: "3.5 GitHub Actions" },
    { id: "m3-6",     label: "3.6 密钥与 .env" },
    { id: "appA",     label: "A 5 类故障对症表" },
    { id: "appB",     label: "B 推荐资源" },
    { id: "appC",     label: "C 术语速查" }
  ]
}
```

- [ ] **步骤 2:在 `PATHS` 数组的"新手起步"路径追加一条**

定位:`grep -n "AI 能干什么" assets/js/topics.js` 找到 PATHS[0]
在它的 steps 数组末尾追加(单独一项,放在 env-auth-clinic 之后):

```javascript
{ label: "独立开发者运维基座 · 服务器/网络/部署", href: "topics/ops-basics.html", note: "零起点也能自助部署,告别完全靠 SaaS" }
```

- [ ] **步骤 3:重建搜索索引**

```bash
cd ai-knowledge-base
python3 scripts/build-search-index.py
grep -c "ops-basics" assets/js/search-index.js   # 应 ≥ 2(标题+正文被命中)
```
预期:索引含 ops-basics 字样。

- [ ] **步骤 4:验证首页自动更新**

运行:浏览器刷新 `http://localhost:8765/`
预期:首页主题卡片网格里出现"🛠️ 独立开发者运维基座"卡片,色为青蓝。

- [ ] **步骤 5:Commit**

```bash
git add assets/js/topics.js assets/js/search-index.js
git commit -m "feat(ops-basics): 注册主题 + 重建搜索索引 + 加入新手起步学习路径"
```

- [ ] **步骤 6:更新 README 目录表格**

定位:第 35-47 行的 `## 目录一览` 表格
在 `AI × UI 设计协同全景` 行之前插入新行:

```markdown
| 🛠️ [独立开发者运维基座](topics/ops-basics.html) | 服务器/网络/部署一站通 | 5 阶段路线 + 3 模块 17 节 + 5 类故障 30 秒对症表 + 15+ 推荐资源 |
```

- [ ] **步骤 7:验证 README 表格**

```bash
grep -A1 "ops-basics" README.md
```
预期:表格含一行。

- [ ] **步骤 8:Commit README**

```bash
git add README.md
git commit -m "docs(readme): 添加 ops-basics 到目录表格"
```

---

## 任务 4:Netlify 部署 + 公网验收

**文件:** 无文件变更,只跑部署命令

- [ ] **步骤 1:确认所有改动已 commit**

```bash
cd ai-knowledge-base
git status --short
git log --oneline -5
```
预期:`git status` 无输出,最近一次 commit 包含本计划所有 4 个文件。

- [ ] **步骤 2:本地预览一次最终版**

运行:`python3 -m http.server 8765`
手动:`http://localhost:8765/topics/ops-basics.html`
预期:页面正常,所有锚点可跳转。

- [ ] **步骤 3:触发 Netlify 部署**

```bash
bash sync.sh -D
```
预期输出末尾:`🌐 已部署 → https://aidoc-zq.netlify.app`

- [ ] **步骤 4:公网验收**

WebFetch `https://aidoc-zq.netlify.app/topics/ops-basics.html`,prompt:
"以下 5 项,逐字告诉我看到什么 + 是否找到:
1) 页面 H1 / title 中的关键词「独立开发者运维基座」
2) 侧栏是否含「5 阶段路线」分组
3) 正文是否有「m3-2 systemd 进程托管」节标题
4) 附录 A 是否有「症状:502 Bad Gateway」字样
5) 首页 `https://aidoc-zq.netlify.app/` 是否出现 🛠️ 主题卡片

找不到的项,直接说「没找到」不编。"
预期:全部命中。

- [ ] **步骤 5:WebFetch 首页验收 + 完成**

WebFetch `https://aidoc-zq.netlify.app/`,确认首页卡片出现 ops-basics。
预期:✅ 通过。

- [ ] **步骤 6:最终推送确认**

```bash
git log --oneline -5
git push origin main   # 若 sync.sh 没自动 push
```
预期:HEAD 在 main,公网可访问。

---

## 自检(写完计划后回头看)

**1. 规格覆盖度:**
- §1.4 成功标准 5 条 → 任务 2 步骤 1-8 全部覆盖
- §2 骨架 17 节 → 任务 2 步骤 1-8 一一对应
- §3 风格约束 → 任务 1 步骤 1 强制复制 + 任务 2 步骤 10 浏览器通读
- §4 文件清单 4 个新建/修改 → 任务 1-3 全部覆盖
- §5 验收清单 10 条 → 任务 2 步骤 11 + 任务 3 步骤 7 + 任务 4 步骤 4 已覆盖 8/10,剩 2/10 是 Netlify 自动跑的无须手动

**2. 占位符扫描:** 无 "TODO" / "待定" / "待补充"。

**3. 类型一致性:** 全文 IDs(`intro`、`roadmap`、`m1-1`...`m3-6`、`appA/B/C`)在侧栏、sections 数组、正文 `<section id=>` 三处严格一致。

✅ 通过。

---

## 执行交接

计划已完成并保存到 `docs/superpowers/plans/2026-08-07-ops-basics.md`。两种执行方式:

**1. 子代理驱动(推荐)** - 每个任务调度一个新的子代理,任务间进行审查,快速迭代

**2. 内联执行** - 在当前会话中使用 executing-plans 执行任务,批量执行并设有检查点

请用户选哪种方式。