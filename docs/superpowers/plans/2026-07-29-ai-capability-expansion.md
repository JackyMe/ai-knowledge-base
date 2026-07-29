# AI 能力边界扩展指南 实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 把 `topics/android-to-fullstack.html`(Android 转 Web 全栈的定制手册)彻底重新定位为 `topics/ai-capability-expansion.html`(通用的"AI 时代技术能力边界扩展指南"),并同步更新全站交叉引用。

**架构：** 新建一个自包含 HTML 主题页(复用站点标准骨架:内嵌 `<style>` + 外部 `site.css`/`site.js`/`motion.js`),8 个 section,方法论驱动、两个案例入口。旧文件在所有新内容写完、且不再被引用之后删除。全站有 9 处外部引用(topics.js 的 TOPICS + PATHS、README 中英文、sitemap.xml、3 个主题页的交叉链接)需要同步改名和改文案。

**技术栈：** 纯静态 HTML/CSS/JS,零构建;站点自带的 `scripts/build-search-index.py` 生成全文搜索索引。

**依据：** `docs/superpowers/specs/2026-07-29-ai-capability-expansion-design.md`(已经用户审查通过)

---

## 执行前提

**必须先创建 git worktree**,不要直接在 `main` 分支工作(项目里 `subagent-driven-development` 技能的硬性要求)。用 `using-git-worktrees` 技能创建,分支名建议 `feature/ai-capability-expansion`,worktree 目录建议 `.worktrees/ai-capability-expansion`(已在 `.gitignore` 里排除 `.worktrees/`)。

后续所有任务都在这个 worktree 里进行,直到最后合并回 main。

---

## 文件结构

| 文件 | 操作 | 职责 |
|---|---|---|
| `topics/ai-capability-expansion.html` | 新建 | 新主题页正文,任务 1-10 逐步填充 |
| `topics/android-to-fullstack.html` | 读取(任务 5-9 参考旧内容)后删除(任务 13) | 旧主题页,内容迁移完成前保留作参考源 |
| `assets/js/topics.js` | 修改 | `TOPICS` 数组对应条目 + `PATHS` 数组"转型跃迁"路径 |
| `assets/js/search-index.js` | 由脚本重新生成,不手改 | 全文搜索索引 |
| `README.md` / `README.en.md` | 修改 | 目录表格 + 目录结构注释里的文件名与文案 |
| `sitemap.xml` | 修改 | `<loc>` 路径 |
| `topics/claude-code-guide.html` | 修改 | 资源表一行链接文案 |
| `topics/prompt-context-engineering.html` | 修改 | 3 处交叉引用(622 行、988 行、1085 行) |
| `topics/ai-leverage-guide.html` | 修改 | 591 行 callout 整段重写 |

---

## 任务 1:新页面骨架(头部/侧边栏/hero/8 个空 section 占位)

**文件：**
- 创建：`topics/ai-capability-expansion.html`

复用 `topics/android-to-fullstack.html` 的 `<style>` 块结构(配色变量、`.tbl`/`.callout`/`.duo`/`.pill`/`.steps`/`.cmp` 等类的定义方式完全照抄,不要重新发明),只改内容层。

- [ ] **步骤 1:创建文件,写入 `<head>` 部分**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="不是转型故事,是方法论:用 AI 扩展技术能力边界的五步引擎,配跨域映射技法与两条端到端案例(全栈跨端 / 技术型独立开发),外加 AI 辅助学习系统与常见陷阱。">
<meta property="og:type" content="article">
<meta property="og:title" content="AI 能力边界扩展指南 · 2026.07">
<meta property="og:description" content="不是转型故事,是方法论:用 AI 扩展技术能力边界的五步引擎,配跨域映射技法与两条端到端案例(全栈跨端 / 技术型独立开发),外加 AI 辅助学习系统与常见陷阱。">
<meta property="og:url" content="https://aidoc-zq.netlify.app/topics/ai-capability-expansion.html">
<meta property="og:image" content="https://aidoc-zq.netlify.app/assets/img/social-preview.png">
<meta name="twitter:card" content="summary_large_image">
<title>AI 能力边界扩展指南 · 2026.07</title>
```

- [ ] **步骤 2:写入 `<style>` 块**

打开 `topics/android-to-fullstack.html`,把第 14-163 行的整个 `<style>...</style>` 块(含 `:root` 配色变量到最后的响应式媒体查询)原样复制过来,**不改动任何 CSS 规则**——配色沿用 `#ea580c` 橙色主题(设计文档第 3 节已确认沿用)。紧接着保留 `<link rel="stylesheet" href="../assets/css/site.css">`。

- [ ] **步骤 3:写入 `<body>` 开头、topbar、progress bar**

```html
</head>
<body>

<header class="topbar">
  <button class="menu-btn" id="menuBtn">☰</button>
  <div class="logo"><span class="mark">🧗</span>AI 能力边界扩展<span class="sub">方法论指南</span></div>
  <div class="right">
    <a href="../index.html">◂ 主题中心</a>
    <span>2026-07</span>
  </div>
</header>

<div class="progress" id="prog"></div>
```

- [ ] **步骤 4:写入侧边栏导航**

```html
<nav class="sidebar" id="sidebar">
  <div class="side-filter"><input id="sideFilter" placeholder="筛选章节…"><span class="fk">/</span></div>
  <div class="nav-group">
    <div class="gt">认知与方法</div>
    <a href="#mindset"><span class="no">00</span>认知框架</a>
    <a href="#engine"><span class="no">01</span>五步扩展引擎</a>
    <a href="#mapping"><span class="no">02</span>跨域映射技法</a>
  </div>
  <div class="nav-group">
    <div class="gt">端到端案例</div>
    <a href="#case-studies"><span class="no">03</span>两条实战路线</a>
  </div>
  <div class="nav-group">
    <div class="gt">深化</div>
    <a href="#indie"><span class="no">04</span>技术型一人公司</a>
    <a href="#learning-system"><span class="no">05</span>AI 辅助学习系统</a>
    <a href="#pitfalls"><span class="no">06</span>陷阱与心法</a>
  </div>
  <div class="nav-group">
    <div class="gt">资源</div>
    <a href="#resources"><span class="no">07</span>资源库</a>
  </div>
</nav>
```

**这是本计划里所有 section id 的唯一权威列表**,后续任务不得偏离:`mindset` `engine` `mapping` `case-studies` `indie` `learning-system` `pitfalls` `resources`。

- [ ] **步骤 5:写入 hero 与 stats**

```html
<main class="main">
<div class="wrap">

<div class="hero" id="top">
  <div class="badge">🧗 不是转型故事,是方法论</div>
  <h1>AI 能力边界扩展指南<br><span class="grad">技术人员的通用打法</span></h1>
  <p class="lead">不针对某个具体技术栈转型,而是一套用 AI 扩展技术能力边界的通用方法论——诊断差距、AI 知识速通、脚手架起步、验证闭环、深化沉淀。配两条端到端实战案例(全栈跨端 / 技术型独立开发)证明它真的能落地,以及跨域映射技法、AI 辅助学习系统与常见陷阱。</p>
  <div class="meta">
    <span>五步方法论</span><span>2 条端到端案例</span><span>跨域映射技法</span><span>2026-07</span>
  </div>
</div>

<div class="stats">
  <div class="stat"><b>5 步引擎</b><span>诊断差距→AI 知识速通→脚手架起步→验证闭环→深化沉淀,每步都讲学什么/怎么学/用什么/怎么用</span></div>
  <div class="stat"><b>2 条案例</b><span>全栈跨端(移动/Web/后端)、技术型独立开发,任选一条深度跟读</span></div>
  <div class="stat"><b>1 套技法</b><span>跨域映射:把你已经会的心智模型喂给 AI,自动标出真正的新概念</span></div>
  <div class="stat"><b>0 空话</b><span>每步给可直接复制的提示词模板,不是"多问 AI"这种空泛表述</span></div>
</div>
```

- [ ] **步骤 6:写入 8 个空 section 占位符(divider 分隔),footer,收尾脚本**

```html
<section id="mindset">
<div class="sec-tag">认知 00</div>
<h2>认知框架</h2>
<!-- 任务 2 填充 -->
</section>

<div class="divider"></div>

<section id="engine">
<div class="sec-tag">方法论 01</div>
<h2>通用方法论:五步扩展引擎</h2>
<!-- 任务 3 填充 -->
</section>

<div class="divider"></div>

<section id="mapping">
<div class="sec-tag">方法论 02</div>
<h2>跨域映射技法</h2>
<!-- 任务 4 填充 -->
</section>

<div class="divider"></div>

<section id="case-studies">
<div class="sec-tag">实战 03</div>
<h2>端到端深度案例</h2>
<!-- 任务 5、6 填充 -->
</section>

<div class="divider"></div>

<section id="indie">
<div class="sec-tag">深化 04</div>
<h2>技术型一人公司 / 独立开发</h2>
<!-- 任务 7 填充 -->
</section>

<div class="divider"></div>

<section id="learning-system">
<div class="sec-tag">深化 05</div>
<h2>AI 辅助学习系统</h2>
<!-- 任务 8 填充 -->
</section>

<div class="divider"></div>

<section id="pitfalls">
<div class="sec-tag">深化 06</div>
<h2>陷阱与心法</h2>
<!-- 任务 9 填充 -->
</section>

<div class="divider"></div>

<section id="resources">
<div class="sec-tag">资源 07</div>
<h2>资源库</h2>
<!-- 任务 10 填充 -->
</section>

<div class="divider"></div>

<div class="footer">
  <p><strong>说明</strong>:本页 2026-07 全面重写,由原"Android 转型全栈"手册重新定位为通用方法论指南。方法论与工具建议随 AI 能力演进,请定期核对;具体版本号/API 以各官方文档为准。</p>
</div>

</div>
</main>

<button class="top-btn" id="topBtn" title="回到顶部">↑</button>

<script src="../assets/js/site.js"></script>
<script src="../assets/js/motion.js"></script>
</body>
</html>
```

- [ ] **步骤 7:验证骨架**

运行:
```bash
cd "topics" && python3 -c "
from html.parser import HTMLParser
content = open('ai-capability-expansion.html', encoding='utf-8').read()
class P(HTMLParser):
    def __init__(self):
        super().__init__(); self.stack=[]
    def handle_starttag(self, tag, attrs):
        if tag not in ('br','img','hr','input','meta','link'): self.stack.append(tag)
    def handle_endtag(self, tag):
        if self.stack and self.stack[-1]==tag: self.stack.pop()
        elif tag in self.stack:
            print('mismatch', tag, self.stack[-5:])
            while self.stack and self.stack[-1]!=tag: self.stack.pop()
            if self.stack: self.stack.pop()
p=P(); p.feed(content)
print('残留未闭合:', p.stack)
"
grep -c '<section id=' ai-capability-expansion.html
```
预期:残留未闭合为空列表,`<section id=` 计数为 8。

- [ ] **步骤 8:Commit**

```bash
git add topics/ai-capability-expansion.html
git commit -m "feat: 新建 AI 能力边界扩展指南页面骨架"
```

---

## 任务 2:`#mindset` 认知框架

**文件：**
- 修改：`topics/ai-capability-expansion.html`(`#mindset` section 内)

**内容要求(对照设计文档 4.1):**

1. 一段"为什么现在能做到边界扩展"的论证,核心论点必须是:AI 把"查文档、试错踩坑消耗的时间"大幅压缩,但"验证产出是否正确"这一步**没有**被压缩——这是能力扩展路上真正的新瓶颈,不是"学不会新语法"。这个论点如果能找到公开的调研/报告数据支撑(例如开发者生产力调研中"AI 加速编码但验证仍是瓶颈"这类结论),用 WebFetch 核实后引用并挂 `<span class="pill b">实测共识</span>` 或 `<span class="pill c">存在分歧</span>`;找不到扎实数据源就用推理性表述,不要编造调研数字。
2. 一段"边界扩展 ≠ 无限全能"的诚实划界:哪类扩展 AI 提效明显(比如"熟悉的编程范式换一门语言/框架"),哪类扩展 AI 只能辅助不能替代(比如"你完全陌生的领域里判断什么是好的架构决策",这依赖经验积累,AI 给不了这个判断力)。
3. 两条常见误区,各配一句具体反例:
   - 误区一:以为装个 AI 编程工具就自动学会了新技术栈——反例是"能让 AI 写出能跑的代码,不代表你能独立读懂/调试/评审这段代码"
   - 误区二:把 AI 产出当真理不做验证——呼应第 3 节方法论步骤④"验证闭环"的重要性,这里先埋伏笔,不展开细节(细节留给任务 3)

**格式要求:**
- 用 `<p>` 段落 + 一个 `<div class="callout warn">` 收束两条误区(参考现有站点其他页面 `.callout warn` 的用法)
- 篇幅:这是定调 section,不展开方法论细节,控制在合理长度(参考同站其他页面"导读"类 section 的篇幅,不要超过 `#engine` section)

- [ ] **步骤 1:核实认知框架的核心论点**

用 WebFetch 搜索是否有公开可信来源支撑"AI 加速代码生成但验证仍是瓶颈"这类结论(例如 DORA 报告、Stack Overflow 开发者调研、GitHub Octoverse 等公开报告)。记录核实结果:找到就记下来源 URL 待写作时引用;没找到就在写作时用不依赖具体数字的推理性表述。

- [ ] **步骤 2:写入 `#mindset` section 正文**

按上述内容要求写入 HTML,插入位置是任务 1 留的 `<!-- 任务 2 填充 -->` 注释处(写完后删除该注释)。

- [ ] **步骤 3:验证**

```bash
grep -A 30 '<section id="mindset">' topics/ai-capability-expansion.html | grep -c '<p>'
grep -A 30 '<section id="mindset">' topics/ai-capability-expansion.html | grep -c 'callout warn'
```
预期:至少 2 个 `<p>`,至少 1 个 `callout warn`。

- [ ] **步骤 4:Commit**

```bash
git add topics/ai-capability-expansion.html
git commit -m "feat: 补充认知框架章节"
```

---

## 任务 3:`#engine` 通用方法论:五步扩展引擎

**文件：**
- 修改：`topics/ai-capability-expansion.html`(`#engine` section 内)
- 参考读取：`topics/android-to-fullstack.html` 第 1003-1046 行(`#ai-workflow` 章节,含 CLAUDE.md 模板与提示词库,原文已在本计划前置调研中摘录,见下方步骤 3)

这是全篇主干,也是篇幅最大的一节。

**内容要求(对照设计文档 4.2):**

五个 `<h3 data-reveal>` 小节,标题固定为:①诊断差距 ②AI 知识速通 ③脚手架起步 ④验证闭环 ⑤深化沉淀。**每个小节内部必须用四个 `<h4>` 或加粗小标题组织**(学什么/怎么学/用什么/怎么用),不能写成自由行文段落。

- [ ] **步骤 1:写"①诊断差距"**

四问内容要点:
- 学什么:不是学新技术,是先搞清楚"我已经会的心智模型能覆盖新领域的哪些部分"——呼应任务 4 的跨域映射技法,这里先给出诊断的三个具体问题("这个新领域和我熟悉的领域,概念模型有多大重叠?""哪些是纯换名词的翻译,哪些是真正陌生的新概念?""我现在最想做成的第一个具体产出是什么?")
- 怎么学:不是"学"这一步,是"问"——具体技巧是让 AI 反过来问你问题以摸清你的已有知识边界,而不是你自己先列一份自评清单(自评容易高估或低估)
- 用什么:点名 Claude Code / Codex 的对话模式(不需要项目上下文,纯聊天即可)
- 怎么用:给一个可直接复制的提示词模板,要求 AI 先反问 3-5 个诊断性问题,再根据回答画出"重叠区/翻译区/全新区"三分类。提示词模板必须写出完整可复制的文本,不能写"问 AI 相关问题"这种概括。

- [ ] **步骤 2:写"②AI 知识速通"**

四问内容要点:
- 学什么:只学步骤①诊断出的"全新区"里,阻碍你验证产出正确性的最小概念集——明确排除"体系化通读文档/教材"这种做法
- 怎么学:用 AI 做"概念翻译"而不是"从头听课"——具体技巧是每学一个新概念,立刻用步骤①已确认的"重叠区"里对应的旧概念类比,并要求 AI 反向出题验证你真的理解了(不是它讲完就算)
- 用什么:AI 对话 + 官方文档(强调官方文档仍然是校验 AI 说法的必要环节,不能只信 AI 单方面讲解)
- 怎么用:给出可直接复制的"类比讲解+反向出题"提示词模板

- [ ] **步骤 3:写"③脚手架起步",并把原 `#ai-workflow` 的两份资产迁移进来**

四问内容要点:
- 学什么:不追求"理解全部原理",目标是搭一个能跑起来的最小产物,建立手感——这一步刻意允许"知其然不知其所以然"
- 怎么学:边搭边问,卡住了才深挖,不要在动手前先把所有概念学透(这是最容易拖慢进度的反模式)
- 用什么:这里正式引入原 `#ai-workflow` 章节的两份资产,改写后放入:
  1. **AI 协同配置模板**:把原文件第 1017-1033 行的 CLAUDE.md 模板改写为通用版——去掉"Next.js + Supabase SaaS"这类绑定具体技术栈的内容和"我是 10 年 Android 背景"这类绑定身份的句子,改成一个**占位符化**的通用模板(比如技术栈那行改成"[你的技术栈]",沟通约定那行改成"我熟悉 [你的已有领域],新概念用它类比解释"),但保留原模板里有普适价值的硬性规则条目(比如"先给计划再动手""改动完成后跑 lint/typecheck/test"这类不绑定技术栈的纪律)
  2. **提示词库**:把原文件第 1035-1044 行的六场景提示词表迁移过来,同样去掉"Android"绑定措辞(比如"学概念"那条现在写"用 [Compose/Room/协程] 类比解释",改成"用 [你熟悉的对应概念] 类比解释"),保留提示词结构本身(这套结构是通用的)
- 怎么用:两份资产都用可直接复制的代码块/表格呈现,不要只描述"有一个模板"

- [ ] **步骤 4:写"④验证闭环"**

四问内容要点:
- 学什么:AI 产出的正确性不能只靠"看起来对"判断,要学会针对新领域挑选合适的验证手段(单测、类型检查、真实环境跑通、官方文档逐条对照)
- 怎么学:具体技巧是"要求 AI 自己说出它的产出怎么验证",而不是你自己想验证方法——AI 通常知道自己产出该配什么测试,但不会主动给,要求它给
- 用什么:点名具体工具类别(单测框架、类型检查器、linter),不需要点名某个具体技术栈的工具(因为通用),但要举 1-2 个例子说明"这类工具在大多数技术栈里都有对应物"
- 怎么用:给出验证闭环的提示词模板,例如要求 AI 在给出代码后必须附带"这段代码可以用什么方式验证正确性"

- [ ] **步骤 5:写"⑤深化沉淀"**

四问内容要点:
- 学什么:从"能跑"到"理解为什么"——具体是回头针对步骤③④里踩过的坑,追问 AI"为什么这样写是对的,还有没有别的写法"
- 怎么学:费曼法的 AI 版本——试着自己给 AI 讲一遍你刚学会的东西,让 AI 挑错,而不是被动接受讲解
- 用什么:AI 对话 + 自己的笔记文件(强调"沉淀"必须落到你自己维护的文档/模板里,不能只留在聊天记录里)
- 怎么用:给出周期性复盘的提示词模板(可参考原文件第 1043 行"周复盘"提示词的思路改写,去掉"Android"措辞)

- [ ] **步骤 6:验证**

```bash
grep -A 200 '<section id="engine">' topics/ai-capability-expansion.html | grep -c '<h3 data-reveal>'
grep -A 200 '<section id="engine">' topics/ai-capability-expansion.html | grep -c '<pre>'
grep -A 200 '<section id="engine">' topics/ai-capability-expansion.html | grep -c '学什么\|怎么学\|用什么\|怎么用'
```
预期:`<h3 data-reveal>` 计数为 5;`<pre>` 计数至少 5(每步至少一个可复制提示词模板,步骤③还有配置模板);四问关键词计数至少 20(5 步 × 4 问)。

- [ ] **步骤 7:确认所有 `<h3>` 带 `data-reveal`**

```bash
grep -A 250 '<section id="engine">' topics/ai-capability-expansion.html | grep -c '<h3>'
```
预期:0(不应该有裸 `<h3>`,全部必须是 `<h3 data-reveal>`)。

- [ ] **步骤 8:Commit**

```bash
git add topics/ai-capability-expansion.html
git commit -m "feat: 补充五步扩展引擎方法论章节(含迁移改写的配置模板与提示词库)"
```

---

## 任务 4:`#mapping` 跨域映射技法

**文件：**
- 修改：`topics/ai-capability-expansion.html`(`#mapping` section 内)
- 参考读取:`topics/android-to-fullstack.html` 第 1087-1096 行(`#method` 章节里的"Android 类比提问术六式"表格)

**内容要求(对照设计文档 4.3):**

- [ ] **步骤 1:写通用技法说明**

一段说明"跨域映射"是什么:把"我已经会的 A 域心智模型"喂给 AI,让 AI 帮你标出两类东西——"这是 A 的翻译"(概念对应,学习成本低)和"这是 A 没有的新概念"(真正要花时间学的)。强调这个技法本身是可复用能力,不只用于第一次学习,以后每学一个新域都能重复用(这句呼应任务 2 步骤①的诊断差距方法)。

- [ ] **步骤 2:写 3-4 个紧凑示例**

每个示例几行到半屏,用 `<table class="tbl">` 或 `<div class="cmp">`(双栏代码对照,原文件第 109-115 行 CSS 已定义)呈现,**不要写成完整 `<h3>` 小节**,用统一的小标题(比如 `<h4>`)区分:

1. **Android ↔ iOS**:Kotlin/Compose ↔ Swift/SwiftUI 的核心概念对应关系(声明式 UI 范式、状态管理、生命周期),给 3-5 行核心映射即可,不需要完整语法对照
2. **移动端 → Web 前端**:复用原文件第 442-524 行(`#ui` 章节 Compose→React)与第 323-441 行(`#lang` 章节 Kotlin→TS)的**精华**——挑最有代表性的 2-3 个对应关系(比如状态管理 remember/State→useState、副作用 LaunchedEffect→useEffect),做成精简表格,不要照搬原文件的完整章节篇幅
3. **Web 前端 → 后端/服务端**:新写,给出前端开发者最容易困惑的几个后端核心概念(比如"没有浏览器帮你管理状态,请求是无状态的""数据库连接池是什么""API 设计的幂等性")与前端概念的映射类比

- [ ] **步骤 3:迁移"类比提问术"**

把原文件第 1087-1096 行的"Android 类比提问术(六式)"表格迁移到本节,改写为通用的"跨域类比提问术"——把"❌ 平庸提问/✅ 老兵提问"表格里绑定 Android/React 的具体措辞(比如"用 remember/State 类比 useState")改写成占位符化的通用范例(比如"用 [你已熟悉的对应机制] 类比 [新概念],讲完出题考我"),保留表格的 ❌/✅ 对照结构(这个教学形式本身有价值,不要丢)。

- [ ] **步骤 4:核实与标注**

三个跨域示例(Android↔iOS、移动→Web、前端→后端)如果涉及具体 API 名或语法,用 WebFetch 核实官方文档当前是否仍然准确(比如 SwiftUI 的状态管理 API 名称、React Hooks 当前推荐写法),核实不到的地方用概念性描述代替具体 API 名,不编造语法。

- [ ] **步骤 5:验证**

```bash
grep -A 100 '<section id="mapping">' topics/ai-capability-expansion.html | grep -c '<table class="tbl"'
grep -A 100 '<section id="mapping">' topics/ai-capability-expansion.html | grep -c '❌\|✅'
```
预期:table 计数至少 4(3 个映射示例 + 1 个类比提问术);❌/✅ 至少各出现若干次(来自迁移的提问术表格)。

- [ ] **步骤 6:Commit**

```bash
git add topics/ai-capability-expansion.html
git commit -m "feat: 补充跨域映射技法章节(含迁移改写的类比提问术)"
```

---

## 任务 5:`#case-studies` 案例 A(移动端 → 全栈跨端)

**文件：**
- 修改：`topics/ai-capability-expansion.html`(`#case-studies` section 内,案例 A 部分)
- 参考读取:`topics/android-to-fullstack.html` 第 525-719 行(`#arch` 架构层 + `#data` 数据层)、第 720-814 行(`#roadmap` 三个渐进项目 + `#kits` 学习包)、第 815-1002 行(`#engineering` 工程化)

**内容要求(对照设计文档 4.4 与"两个入口"实现方式):**

- [ ] **步骤 1:写 section 开头的"怎么读这一节"引导 + 两个入口链接**

```html
<p>下面两条案例都完整走一遍上面的五步方法论,选和你方向接近的一条深入读,也可以都读——两条案例内部结构一致,读一条就能掌握方法,另一条可以当参考。</p>
<ul>
  <li><a href="#case-a">案例 A:移动端出发,扩展到全栈跨端 →</a></li>
  <li><a href="#case-b">案例 B:前端/客户端出发,扩展到后端与服务端 →</a></li>
</ul>
```

- [ ] **步骤 2:写案例 A 标题锚点与开篇定位**

```html
<h3 data-reveal id="case-a">案例 A:移动端 → 全栈跨端</h3>
<p>[一段场景设定:一个移动端(Android 或 iOS)背景的工程师,想把能力扩展到能独立搭一个前端+后端+数据库都能自己搞定的全栈应用。下面按五步方法论走一遍。]</p>
```

- [ ] **步骤 3:填五步框架 · 步骤①诊断差距(案例化)**

四问内容要点(案例场景化,不是抽象方法论复述):
- 学什么:移动端工程师的已有心智模型(声明式 UI、状态管理、生命周期、本地持久化)对应到全栈开发的三层(前端框架/后端服务/数据库),诊断出重叠区与全新区
- 怎么学:参考任务 4 已经给出的"移动端→Web 前端"映射示例,这里进一步扩展到后端层
- 用什么:AI 对话诊断
- 怎么用:给出这个案例专属的诊断提示词(和任务 3 步骤①的通用模板呼应,但填入了移动端→全栈的具体上下文)

- [ ] **步骤 4:填五步框架 · 步骤②AI 知识速通(案例化)**

从原文件 `#arch` 章节(第 531-600 行)提炼服务端组件 vs 客户端组件、渲染与缓存(SSR/SSG/ISR)这两块高价值内容,改写成"AI 知识速通"的案例演示——不是照搬原表格,是展示"怎么用 AI 把这些概念问清楚"的过程(给出真实的提示词+ AI 应该给出的那种回答结构)。

- [ ] **步骤 5:填五步框架 · 步骤③脚手架起步(案例化)**

从原文件 `#roadmap`(第 720-755 行)与 `#kits`(第 756-814 行)提炼出"起步该搭什么最小产物"——不需要保留原来"三个渐进项目"的完整项目阶梯与六大学习包体系,只提炼出"第一个可跑通的最小产物长什么样"这个层面的内容,配合任务 3 步骤③已经给出的通用起手命令(如果案例涉及具体框架,如 Next.js,可以点名,但要说明"这里以 Next.js 为例,原理同样适用于其他全栈框架")。

- [ ] **步骤 6:填五步框架 · 步骤④验证闭环(案例化)**

从原文件 `#data` 章节(第 631-654 行 RLS 部分)提炼数据安全验证的具体做法——RLS(行级安全)是一个有代表性的"AI 产出必须验证"的例子,保留原文里"给策略+用攻击场景验证挡得住"这个可执行方法,改写去掉 Supabase 专属绑定测量,改成"以 Supabase/Postgres RLS 为例,原理同样适用于其他数据库权限模型"。

- [ ] **步骤 7:填五步框架 · 步骤⑤深化沉淀(案例化)**

从原文件 `#engineering` 章节(第 868-912 行,测试/CI/环境变量/上线清单)提炼出"深化"阶段该建立的工程化习惯,精简为一张对照表或清单,不需要保留原文的完整篇幅(原文这部分偏详细的操作教程,案例里只需要点到"深化阶段该往这些方向补课")。

- [ ] **步骤 8:核实**

案例 A 如果点名具体技术(Next.js/Supabase 等)和 API,用 WebFetch 核实当前版本是否仍然准确(参考本会话此前对 android-to-fullstack.html 做过的核实记录,如 Next.js 16 的 proxy.ts 改名——如果案例 A 内容涉及路由拦截器概念,要用 proxy.ts 而不是 middleware.ts)。

- [ ] **步骤 9:验证**

```bash
grep -A 300 'id="case-a"' topics/ai-capability-expansion.html | grep -c '学什么\|怎么学\|用什么\|怎么用'
```
预期:至少 20(5 步 × 4 问,每问至少出现一次对应文字或等价小标题)。

- [ ] **步骤 10:Commit**

```bash
git add topics/ai-capability-expansion.html
git commit -m "feat: 补充案例 A(移动端到全栈跨端)"
```

---

## 任务 6:`#case-studies` 案例 B(前端/客户端 → 后端与服务端工程)

**文件：**
- 修改：`topics/ai-capability-expansion.html`(`#case-studies` section 内,案例 B 部分)

这是新写内容,原页面完全没有对应素材——原页面自始至终是"迁到 Web 全栈(含后端)"的单一方向,从没有一个案例是纯粹从前端视角扩展到独立后端工程能力的。

**内容要求:**

- [ ] **步骤 1:写案例 B 标题锚点与开篇定位**

```html
<h3 data-reveal id="case-b">案例 B:前端/客户端 → 后端与服务端工程</h3>
<p>[一段场景设定:一个前端或客户端背景的工程师,想把能力扩展到能独立设计 API、选型后端语言、理解部署与运维基础。下面按五步方法论走一遍。]</p>
```

- [ ] **步骤 2:填五步框架 · 步骤①诊断差距**

四问内容要点:前端工程师已有的心智模型(组件化、状态管理、异步请求消费方)对应到后端的哪些概念(路由处理、数据持久化、鉴权中间层),诊断重叠区(比如"你已经会消费 API,现在要学设计 API")与全新区(比如"没有浏览器帮你处理并发,后端要自己管")。

- [ ] **步骤 3:填五步框架 · 步骤②AI 知识速通**

核心新概念:无状态请求处理、数据库设计基础(至少覆盖关系型数据库的基本范式与索引概念)、鉴权与会话管理的服务端视角(和前端"消费登录态"视角的差异)。给出用 AI 做知识速通的具体提示词示例。

- [ ] **步骤 4:填五步框架 · 步骤③脚手架起步**

给出一个可执行的最小后端服务起步路径:选一门后端语言/框架(点名 1-2 个当前主流选择,比如 Node.js 生态或其他,写作时用 WebFetch 核实当前生态活跃度而不是凭印象点名),搭一个最小可跑的 API 服务 + 一张表的数据库,给出可复制的起手命令或最小代码骨架。

- [ ] **步骤 5:填五步框架 · 步骤④验证闭环**

后端服务的验证闭环要点:API 契约测试(请求/响应是否符合预期)、鉴权边界测试(未授权请求是否被正确拒绝)、并发场景下的数据一致性验证。给出用 AI 生成这类测试的提示词示例。

- [ ] **步骤 6:填五步框架 · 步骤⑤深化沉淀**

深化方向:理解部署基础(容器化概念、环境变量管理)、可观测性基础(日志/监控的最小认知),给一张"从能跑到生产可用"的检查清单。

- [ ] **步骤 7:核实**

所有点名的具体技术选型、API、命令,用 WebFetch 核实当前官方文档/生态现状,核实不到的用概念性描述代替,不编造。这一节因为是全新内容,核实责任比案例 A(部分复用旧内容)更重,不能省略。

- [ ] **步骤 8:验证**

```bash
grep -A 300 'id="case-b"' topics/ai-capability-expansion.html | grep -c '学什么\|怎么学\|用什么\|怎么用'
```
预期:至少 20。

- [ ] **步骤 9:两个案例整体结构一致性检查**

```bash
grep -c 'id="case-a"\|id="case-b"' topics/ai-capability-expansion.html
```
预期:2(各一个锚点,不重复)。人工核对:案例 A、B 是否都完整覆盖了五步、每步是否都有四问结构——如果案例 B 明显比案例 A 单薄很多,回头补充,不要求逐字对称但要求方法论骨架完整。

- [ ] **步骤 10:Commit**

```bash
git add topics/ai-capability-expansion.html
git commit -m "feat: 补充案例 B(前端到后端与服务端工程)"
```

---

## 任务 7:`#indie` 技术型一人公司 / 独立开发

**文件：**
- 修改：`topics/ai-capability-expansion.html`(`#indie` section 内)
- 参考读取:`topics/android-to-fullstack.html` 第 1123-1170 行(`#business` 章节全文)

**内容要求(对照设计文档 4.5):**

- [ ] **步骤 1:迁移并精炼原有四个小节**

把原文件 `#business` 的四个 `<h3>` 小节原样精炼迁移,内容质量已经不错,不需要重写,但要去掉对已删除章节的引用:
1. "①选题:五问过滤器"(原 1127-1135 行)——直接迁移,内容不绑定具体技术栈,可原样保留
2. "②获客:SEO"(原 1137-1151 行)——迁移,但原文里"技术怎么落地见 `#engineering` 08 章⑤"这类指向已删除旧 section 的链接要去掉或改成通用描述(不再有对应的具体代码章节可指,因为工程化细节这次精简掉了,直接把 SEO 技术要点用一两句话带过即可,不需要链接)
3. "③收款:国内主体的现实问题"(原 1153-1160 行)——直接迁移,内容通用不绑定技术栈
4. "④从 0 到 1000 美元 MRR"(原 1162-1169 行)——直接迁移

- [ ] **步骤 2:新增"AI 在商业化环节能帮你做什么"**

新增一个 `<h3 data-reveal>` 小节,按四问框架组织:
- 学什么:商业化环节里哪些任务可以交给 AI 加速(验证选题假设、写落地页文案、搭建基础客服/FAQ)
- 怎么学:不需要"学",这里是"用"——直接给操作方法
- 用什么:AI 对话工具即可,不需要额外工具
- 怎么用:给 2-3 个可直接复制的提示词示例,比如"根据这五个选题过滤问题的回答,帮我写一个验证性落地页的文案骨架"

- [ ] **步骤 3:验证**

```bash
grep -A 150 '<section id="indie">' topics/ai-capability-expansion.html | grep -c '<h3 data-reveal>'
```
预期:5(原 4 个精炼迁移 + 新增 1 个)。

- [ ] **步骤 4:Commit**

```bash
git add topics/ai-capability-expansion.html
git commit -m "feat: 补充技术型一人公司章节"
```

---

## 任务 8:`#learning-system` AI 辅助学习系统

**文件：**
- 修改：`topics/ai-capability-expansion.html`(`#learning-system` section 内)
- 参考读取:`topics/android-to-fullstack.html` 第 1054-1086 行(`#method` 章节的"三层学习法"与"20 题自测清单")

**内容要求(对照设计文档 4.6):**

- [ ] **步骤 1:迁移并去技术栈绑定"三层学习法"**

原文件第 1054-1060 行的三层学习法表格(①快速扫盲 ②边做边学 ③刻意内化)结构通用,直接迁移,只需要把"投入"列里"12 周主体"这类绑定固定周期的措辞改成不依赖具体时间盒的描述(比如"贯穿整个扩展过程")。

- [ ] **步骤 2:把"20 题自测清单"改写为"怎么用 AI 生成自己的自测清单"**

原文件第 1062-1085 行的 20 题是绑定 TypeScript/React/Next.js/Supabase 的固定题库,**不要直接迁移这份题库**——按设计文档要求,改写为方法论:怎么让 AI 根据你当前的学习阶段和已学内容,动态生成针对性自测题。给出具体的提示词模板,比如"这是我这两周学的内容清单:[列出],给我出 10 道'能对着空气流利说出即算过'的问题,覆盖我可能自以为懂但其实没懂的地方"。

- [ ] **步骤 3:迁移"五条铁律+日节奏"**

原文件第 1098 行的 `callout tip`(不要等·不要抄·要动手·要记录·要输出,配日节奏建议)内容通用,精炼迁移,去掉"09 章周复盘提示词"这类指向已迁移内容的具体章节号引用(改成"配合上面提示词库的周复盘模板"这种不依赖精确章节号的表述,或直接链接到 `#engine` 锚点)。

- [ ] **步骤 4:验证**

```bash
grep -A 100 '<section id="learning-system">' topics/ai-capability-expansion.html | grep -c '<table class="tbl"'
grep -A 100 '<section id="learning-system">' topics/ai-capability-expansion.html | grep -c 'callout'
```
预期:至少 1 个 table(三层学习法),至少 1 个 callout。

- [ ] **步骤 5:Commit**

```bash
git add topics/ai-capability-expansion.html
git commit -m "feat: 补充 AI 辅助学习系统章节"
```

---

## 任务 9:`#pitfalls` 陷阱与心法

**文件：**
- 修改：`topics/ai-capability-expansion.html`(`#pitfalls` section 内)
- 参考读取:`topics/android-to-fullstack.html` 第 1103-1119 行(`#pitfalls` 章节全文)

**内容要求(对照设计文档 4.7):**

- [ ] **步骤 1:迁移可通用的陷阱**

原文件第 1107-1118 行的表格里,以下几条不绑定具体技术栈或固定周数,直接精炼迁移(改写掉"12 周""W4-5""W8/W9"这类固定周期措辞,改成阶段性描述如"起步阶段""进入深水区时"):
- 教程地狱
- 旧教程陷阱(改写为通用的"资料时效性陷阱",不特指 Next.js/Pages Router)
- any 逃逸成瘾(改写为通用的"类型系统/规范逃逸成瘾",不特指 TypeScript 的 `any`,可以举 `any` 作为一个具体例子但不作为陷阱的唯一名字)
- 技术馋
- 完美主义冻结
- AI 依赖症
- 安全大意
- 孤独感/收入焦虑

**"W4-5 崩溃点"这一条依赖固定周数框架,不能直接迁移**,改写为通用的"某个阶段会遇到认知负荷剧增的陡坡,这是正常现象,不代表你选错了方向"这类不依赖具体周数的表述。

- [ ] **步骤 2:新增 AI 时代特有的坑**

按设计文档要求,新增三条(可以合并写在同一张表里,延续 `<table class="tbl er">` 格式):
- 过度依赖 AI 导致验证环节被跳过——呼应 `#engine` 步骤④的重要性
- 把 AI 的自信语气当成正确性证明
- 学习速通变成"从没独立解决过一个真实问题"——AI 把每个卡点都直接解决掉,导致读者从头到尾没有真正独立debug过

- [ ] **步骤 3:验证**

```bash
grep -A 40 '<section id="pitfalls">' topics/ai-capability-expansion.html | grep -c '<tr>'
```
预期:至少 11(表头 1 行 + 至少 8 条迁移陷阱 + 至少 3 条新增,减去可能的合并调整,数字允许有出入但不应明显少于这个量级)。

- [ ] **步骤 4:Commit**

```bash
git add topics/ai-capability-expansion.html
git commit -m "feat: 补充陷阱与心法章节"
```

---

## 任务 10:`#resources` 资源库

**文件：**
- 修改：`topics/ai-capability-expansion.html`(`#resources` section 内)
- 参考读取:`topics/android-to-fullstack.html` 第 1174-1212 行(`#resources` 章节全文)

**内容要求(对照设计文档 4.8):**

- [ ] **步骤 1:迁移评级体系与通用资源**

沿用原文件 S/A/B 评级体系(`.pill s/a/b`,原文第 1180 行说明文字直接迁移)。原文的"学习资源""工具与模板""社区与本库联动"三张表里:
- 通用/不绑定具体技术栈的条目直接迁移(比如"本库四件套"链接、Indie Hackers 社区、YouTube 技术博主这类跨技术栈仍然有价值的条目)
- 绑定 Next.js/React/Supabase 的具体条目(Next.js Learn、react.dev、Total TypeScript、Supabase 文档等)**降级处理**:不再作为"主教材"呈现(因为不再有固定技术栈路线),改成"如果你的案例方向涉及这些技术栈,这些是高质量资源"的补充说明,或直接精简掉,替换/补充为更通用的资源(比如"怎么找任意技术栈的官方文档/权威教程"这类元指导,而不是列死一份技术栈资源清单)

- [ ] **步骤 2:开头 callout 去掉指向已删除章节的引用**

原文第 1178 行"具体学什么章节...已按体系配好在 07 章学习包"——这个 callout 指向已删除的 `#kits` 章节,要去掉或改写成指向 `#case-studies` 的案例(案例里有具体的技术落地指引)。

- [ ] **步骤 3:验证**

```bash
grep -A 60 '<section id="resources">' topics/ai-capability-expansion.html | grep -c '#kits\|#engineering\|#roadmap'
```
预期:0(不应该残留指向已删除 section id 的死链)。

- [ ] **步骤 4:Commit**

```bash
git add topics/ai-capability-expansion.html
git commit -m "feat: 补充资源库章节"
```

---

## 任务 11:更新 `assets/js/topics.js`(TOPICS 条目 + PATHS 路径)

**文件：**
- 修改：`assets/js/topics.js`

- [ ] **步骤 1:重写 TOPICS 数组里的对应条目**

找到当前内容(`href: "topics/android-to-fullstack.html", icon: "🧗", tag: "提效心法", color: "#ea580c"` 开头的条目块),替换为:

```js
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
```

**注意**:`sections` 数组的 8 个 id 必须与任务 1 步骤 4 定的 8 个 section id 完全一致(`mindset` `engine` `mapping` `case-studies` `indie` `learning-system` `pitfalls` `resources`),这个列表是搜索索引与首页卡片快链的数据源,错一个就会导致对应章节搜不到。

- [ ] **步骤 2:重写 PATHS 数组"转型跃迁"路径**

找到 `icon: "🧗", color: "#ea580c", title: "转型跃迁"` 开头的路径对象,替换为:

```js
  {
    icon: "🧗", color: "#ea580c", title: "AI 能力扩展",
    desc: "用 AI 扩展技术能力边界:方法论 + 两条端到端案例",
    steps: [
      { label: "五步扩展引擎:通用方法论", href: "topics/ai-capability-expansion.html#engine", note: "诊断差距→AI 知识速通→脚手架起步→验证闭环→深化沉淀" },
      { label: "跨域映射技法", href: "topics/ai-capability-expansion.html#mapping", note: "把已会的心智模型喂给 AI,自动标出新概念" },
      { label: "端到端案例:选一条深入读", href: "topics/ai-capability-expansion.html#case-studies", note: "全栈跨端,或前端到后端与服务端" },
      { label: "技术型一人公司", href: "topics/ai-capability-expansion.html#indie", note: "从能写代码到能上线赚钱" }
    ]
  },
```

- [ ] **步骤 3:JS 语法检查**

```bash
node --check assets/js/topics.js && echo "OK"
```
预期:输出 `OK`。

- [ ] **步骤 4:Commit**

```bash
git add assets/js/topics.js
git commit -m "feat: topics.js 接入 AI 能力边界扩展指南"
```

---

## 任务 12:更新全站交叉引用

**文件：**
- 修改：`README.md`、`README.en.md`、`sitemap.xml`、`topics/claude-code-guide.html`、`topics/prompt-context-engineering.html`、`topics/ai-leverage-guide.html`

- [ ] **步骤 1:`README.md`**

第 45 行,原文:
```
| 🧗 [Android 转型全栈](topics/android-to-fullstack.html) | 客户端老兵的转型作战手册 | 语言/UI/架构/数据四层硬核迁移、12 周路线、一人公司商业闭环 |
```
改为:
```
| 🧗 [AI 能力边界扩展指南](topics/ai-capability-expansion.html) | 用 AI 扩展技术能力边界的通用方法论 | 五步扩展引擎、跨域映射技法、全栈跨端 / 独立开发两条端到端案例 |
```

第 69 行,原文:
```
│   └── android-to-fullstack.html # Android 转型全栈路线
```
改为:
```
│   └── ai-capability-expansion.html # AI 能力边界扩展指南
```

- [ ] **步骤 2:`README.en.md`**

对应两处做同样的文件名与文案更新(英文版文案自行翻译,保持与中文版语义一致:标题类似 "AI Capability Expansion Guide",描述强调 "generic AI-leverage methodology for expanding technical boundaries, not a fixed stack tutorial")。

- [ ] **步骤 3:`sitemap.xml`**

第 12 行,原文:
```xml
  <url><loc>https://aidoc-zq.netlify.app/topics/android-to-fullstack.html</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
```
改为:
```xml
  <url><loc>https://aidoc-zq.netlify.app/topics/ai-capability-expansion.html</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
```

- [ ] **步骤 4:`topics/claude-code-guide.html`**

找到资源表里链接文案"Android 转型全栈硬核手册(用 CC 转型的完整实战)"那一格,改文件名为 `ai-capability-expansion.html`,文案改为"AI 能力边界扩展指南(用 CC 实战全栈跨端与独立开发)"。

- [ ] **步骤 5:`topics/prompt-context-engineering.html` 三处**

- 第 622 行:`android-to-fullstack.html#ai-workflow`(CLAUDE.md 模板引用)→ 改为 `ai-capability-expansion.html#engine`
- 第 988 行:`android-to-fullstack.html#ai-workflow`(提示词库引用)→ 改为 `ai-capability-expansion.html#engine`
- 第 1085 行:`android-to-fullstack.html#method`(类比提问术引用)→ 改为 `ai-capability-expansion.html#mapping`

每处链接文案里如果提到"转型手册"这类旧措辞,顺手改成"能力扩展指南"。

- [ ] **步骤 6:`topics/ai-leverage-guide.html` 第 591 行**

原文:
```html
<div class="callout note"><b class="t">🧗 开发者专属深化版</b>如果你是移动端/客户端工程师想借 AI 转型全栈或做一人公司,本页方法论有一份场景特化的姊妹篇:<a href="android-to-fullstack.html">Android 老兵转型全栈 · AI 时代路线图</a>——12 周含验收的实战路线、Android→Web 认知映射与类比提问术。</div>
```
整段重写为(去掉"12 周""Android→Web"字样):
```html
<div class="callout note"><b class="t">🧗 深化版:能力边界扩展方法论</b>如果你想借 AI 把技术能力扩展到全栈跨端(移动/Web/后端)或做技术型独立开发,本页方法论有一份深化姊妹篇:<a href="ai-capability-expansion.html">AI 能力边界扩展指南</a>——五步扩展引擎、跨域映射技法,配两条端到端实战案例。</div>
```

- [ ] **步骤 7:全仓库扫描确认没有遗漏**

```bash
grep -rn "android-to-fullstack" --include="*.html" --include="*.js" --include="*.md" --include="*.xml" .
```
预期:只剩 `topics/android-to-fullstack.html` 文件自身内部的自我引用(如果有),以及可能残留的 `assets/js/search-index.js`(该文件将在任务 14 由脚本重新生成,不需要手动处理)。任何**其他文件**里如果还有命中,回头补改。

- [ ] **步骤 8:Commit**

```bash
git add README.md README.en.md sitemap.xml topics/claude-code-guide.html topics/prompt-context-engineering.html topics/ai-leverage-guide.html
git commit -m "feat: 全站交叉引用同步指向 AI 能力边界扩展指南"
```

---

## 任务 13:删除旧文件

**文件：**
- 删除：`topics/android-to-fullstack.html`

- [ ] **步骤 1:确认所有引用已清理**

```bash
grep -rln "android-to-fullstack" --include="*.html" --include="*.js" --include="*.md" --include="*.xml" . | grep -v "topics/android-to-fullstack.html" | grep -v "search-index.js"
```
预期:空输出。如果不是空输出,先回到对应文件补改,不要跳过这一步直接删文件。

- [ ] **步骤 2:删除文件**

```bash
git rm topics/android-to-fullstack.html
```

- [ ] **步骤 3:Commit**

```bash
git commit -m "chore: 删除旧版 android-to-fullstack.html,内容已由 ai-capability-expansion.html 取代"
```

---

## 任务 14:重建搜索索引 + 全站验证

**文件：**
- 修改(自动生成)：`assets/js/search-index.js`

- [ ] **步骤 1:重建搜索索引**

```bash
python3 scripts/build-search-index.py
```
预期:输出形如 `写入 assets/js/search-index.js:131 个章节条目,XXX KB`(具体条目数应该和改动前基本持平——8 个新 section 替代原来 14 个,总数会下降,这是预期内的,不是 bug)。

- [ ] **步骤 2:HTML 标签配平检查**

```bash
python3 -c "
from html.parser import HTMLParser
content = open('topics/ai-capability-expansion.html', encoding='utf-8').read()
class P(HTMLParser):
    def __init__(self):
        super().__init__(); self.stack=[]
    def handle_starttag(self, tag, attrs):
        if tag not in ('br','img','hr','input','meta','link'): self.stack.append(tag)
    def handle_endtag(self, tag):
        if self.stack and self.stack[-1]==tag: self.stack.pop()
        elif tag in self.stack:
            print('mismatch', tag, self.stack[-5:])
            while self.stack and self.stack[-1]!=tag: self.stack.pop()
            if self.stack: self.stack.pop()
p=P(); p.feed(content)
print('残留未闭合:', p.stack)
"
```
预期:残留未闭合为空列表。

- [ ] **步骤 3:检查所有 `<h3>` 带 `data-reveal`**

```bash
grep -c '<h3>' topics/ai-capability-expansion.html
grep -c '<h3 data-reveal>' topics/ai-capability-expansion.html
```
预期:第一条命令输出 0(不应有裸 `<h3>`)。

- [ ] **步骤 4:检查 topics.js 的 sections 数组与实际 section 数一致**

```bash
python3 -c "
import re
html = open('topics/ai-capability-expansion.html', encoding='utf-8').read()
actual = len(re.findall(r'<section id=\"', html))
print('实际 section 数:', actual)
"
```
预期:8,与任务 11 步骤 1 写入 topics.js 的 8 个 sections 条目一致。

- [ ] **步骤 5:全仓库死链最终扫描**

```bash
grep -rn "android-to-fullstack" --include="*.html" --include="*.js" --include="*.md" --include="*.xml" .
```
预期:空输出(此时旧文件已删除,`search-index.js` 已重新生成不再包含旧文件内容)。

- [ ] **步骤 6:浏览器验证**

用 `mcp__Claude_Browser__preview_start` 起一个静态服务器(`.claude/launch.json` 里应该已有类似 `ai-kb-static` 的配置,复用它;如果没有就临时用 `python3 -m http.server` 起服务),依次验证:
1. 打开 `http://localhost:<port>/index.html`,在 DOM 里确认首页"转型跃迁"路径卡片指向新文件、新 section id 全部可达(用 `document.querySelector` 检查各 `href` 对应的元素是否存在于目标页面)
2. 打开 `http://localhost:<port>/topics/ai-capability-expansion.html`,确认页面正常渲染、侧边栏 8 个链接可点击跳转、两个案例入口链接可用
3. 打开 `topics/prompt-context-engineering.html`、`topics/ai-leverage-guide.html`、`topics/claude-code-guide.html`,确认改过的交叉引用链接可点击且指向正确页面/锚点

- [ ] **步骤 7:最终 Commit**

```bash
git add assets/js/search-index.js
git commit -m "chore: 重建搜索索引,完成 AI 能力边界扩展指南全站接入"
```

---

## 计划自检记录

- **规格覆盖度**:设计文档第 4.1-4.8 节(8 个 section)分别对应任务 2-10;第 6.1 节(文件新建/删除)对应任务 1、13;第 6.2 节(topics.js)对应任务 11;第 6.3 节(全站交叉引用表格 7 行)逐行对应任务 12 步骤 1-6;第 6.4 节(搜索索引与验证)对应任务 14。第 5 节"明确不做的事"已在各任务的内容要求里体现(不写 12 周时间盒、不新增 AI/DevOps 方向的完整 section)。第 7 节"核实要求"已在任务 2-6 的核实步骤里体现。规格全覆盖。
- **占位符扫描**:已检查,任务里"[一段场景设定...]"这类方括号是给实现者的**内容要点指引**而非待办占位符——每处都配有具体的四问内容要点清单,不是空白留白。
- **类型一致性**:8 个 section id(`mindset`/`engine`/`mapping`/`case-studies`/`indie`/`learning-system`/`pitfalls`/`resources`)在任务 1(定义)、任务 2-10(使用)、任务 11(topics.js sections 数组)、任务 14(验证)四处保持完全一致,已交叉核对无拼写偏差。

## 执行方式

计划已完成并保存到 `docs/superpowers/plans/2026-07-29-ai-capability-expansion.md`。两种执行方式：

**1. 子代理驱动（推荐）** - 每个任务调度一个新的子代理，任务间进行审查，快速迭代

**2. 内联执行** - 在当前会话中使用 executing-plans 执行任务，批量执行并设有检查点

选哪种方式？
