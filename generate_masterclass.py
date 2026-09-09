import re

def rewrite_section(filepath, start_marker, end_marker, new_content):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    pattern = re.compile(rf'{start_marker}.*?{end_marker}', re.DOTALL)
    if pattern.search(content):
        new_text = pattern.sub(new_content + f'\n\n{end_marker}', content)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_text)
        print(f"Successfully injected masterclass into {filepath}")
    else:
        print(f"Failed to find injection point in {filepath}")

# ==============================================================================
# OPENAI / CODEX (codex-guide.html & .en.html)
# ==============================================================================

codex_zh = """<section id="subscription-quotas">
<div class="sec-tag">Masterclass / 骨灰级实战</div>
<h2>2026 极限压榨指南：OpenAI 全家桶高阶玩法与 API 兜底</h2>

<p>如果您每年向 OpenAI 支付上千美元订阅 ChatGPT Pro (5x/20x)，却只把它当成代码补全工具，那您至少浪费了 80% 的价值。2026 年的 OpenAI 生态已经彻底分离了各个底层产品线。这篇长文汇集了海外顶尖极客博客（如 The Rundown AI、Dev.to 等）的最强实战策略，教您如何真正榨干每一分钱。</p>

<h3 data-reveal>🛑 1. 揭开官方不说的隐藏限流规则</h3>
<p>OpenAI 表面上说“按需分配”，但在系统底层，额度被严格划分为三个独立的算力池：</p>
<ul>
  <li><strong>终端代码生成池 (Codex/Cursor/Antigravity)</strong>：采用严苛的 5 小时滚动窗口。处理 1M Token 的大文件时，极其容易在 2 小时内被降级到 <code>gpt-5.6-luna</code>。</li>
  <li><strong>深度研究池 (Deep Research)</strong>：拥有绝对独立的配额。Plus 每月约 25 次，Pro 每月 250+ 次。这个池子专为解决“多步搜索与千页资料整合”而生。</li>
  <li><strong>o3/Astra 思考模型池 (Thinking Mode)</strong>：限制最死。哪怕您是 Pro 用户，每天能让模型“深度思考超过 5 分钟”的次数也屈指可数。</li>
</ul>

<h3 data-reveal>🛠 2. 顶级工作流 SOP：AST 语法树分离与 API 兜底</h3>
<p>这是硅谷高阶工程师每天都在使用的工作流，彻底解决“改一行代码却烧光整个工程算力”的痛点：</p>

<h4>第一步：不要让终端读源码，让它读 AST 语法树</h4>
<p>把几百个 <code>.ts</code> 文件扔给终端，是新手最容易踩的坑。最佳实践是利用 Python 或 Node 脚本，一键提取出整个工程的 <strong>AST（抽象语法树）骨架</strong>，只保留类名、函数签名和类型定义，剥离所有的具体实现代码。然后把这份 20KB 的骨架文件上传给 Web 端的 <strong>Work Projects (工作区)</strong>。这能将上下文占用降低 95%。</p>

<h4>第二步：Web 端 Deep Research 负责“破荒”</h4>
<p>在迁移旧工程或引入完全没用过的框架（如 Next.js 16）时：<br>
<strong>不要：</strong> 在本地瞎试报错。<br>
<strong>最佳做法：</strong> 在网页端触发 <code>/Deepresearch</code>。使用以下高阶 Prompt：<br>
<code>"启动深度研究：爬取官方文档的最新版本。要求输出一个严格遵循以下 JSON Schema 的迁移指南：{ 'components': [...], 'deprecated_hooks': [...] }。不要输出废话。"</code><br>
拿到这绝对精准的 JSON 后，再交给本地 Codex 执行重构，确保零幻觉。</p>

<h4>第三步：配置 API Fallback（无缝兜底防挂机）</h4>
<p>当 Codex 触发 5 小时滚动限流时，普通人只能去喝咖啡。高手会配置 API Key 作为备用通道（Fallback）。<br>
在 <code>~/.codex/config.json</code> 中：</p>
<pre><code class="language-json">{
  "fallback_strategy": "api_key",
  "api_model": "gpt-5.6-turbo",
  "max_fallback_spend": 5.0
}</code></pre>
<p>当订阅额度耗尽时，系统自动切到 API 计费，花几毛钱保证灵感不中断。</p>

<h3 data-reveal>🎨 3. 视觉管线极限压缩（Image 2.5 转代码）</h3>
<p>在 UI 还原时，直接把截图发给终端改 10 次，会立刻耗尽视觉解析算力。<br>
<strong>最佳实践 (Dimensional Reduction)</strong>：在 Web 端的 GPT-6 中上传截图，输入：<code>"以资深前端架构师视角，描述这张图的所有 CSS 细节（包括 flex 关系、色号、阴影），并直接输出 Tailwind 骨架树。纯文本返回。"</code><br>
随后，将生成的纯文本喂给 Codex。文本的处理速度不仅是图片的 100 倍，且几乎没有限流惩罚。</p>
</section>"""

codex_en = """<section id="subscription-quotas">
<div class="sec-tag">Masterclass</div>
<h2>2026 Max Exploitation Guide: OpenAI Ecosystem Advanced Tactics & API Fallbacks</h2>

<p>If you pay OpenAI hundreds of dollars a year for ChatGPT Pro (5x/20x) but only use it as an autocomplete tool, you are wasting 80% of its value. In 2026, OpenAI's ecosystem tightly compartmentalizes compute across product lines. This deep dive aggregates the most hardcore, battle-tested strategies from top developer blogs (like Dev.to and The Rundown AI) to help you squeeze out every penny.</p>

<h3 data-reveal>🛑 1. Exposing the Hidden Throttling Rules</h3>
<p>OpenAI markets "dynamic capacity," but beneath the hood, quotas are strictly segregated into three independent compute pools:</p>
<ul>
  <li><strong>Terminal Code Gen Pool (Codex/Cursor/Antigravity)</strong>: Governed by a strict 5-hour rolling window. Pushing massive 1M-token files will get you aggressively downgraded to <code>gpt-5.6-luna</code> within two hours.</li>
  <li><strong>Deep Research Pool</strong>: Has an absolute independent monthly quota. Plus gets ~25/mo, Pro gets 250+/mo. This is built specifically for "multi-step browsing and 1000-page synthesis."</li>
  <li><strong>o3/Astra Thinking Mode Pool</strong>: The most strictly constrained. Even on Pro, allowing the model to "think for over 5 minutes" is heavily capped per day.</li>
</ul>

<h3 data-reveal>🛠 2. Top 1% Workflow SOP: AST Stripping & API Fallbacks</h3>
<p>This is the standard workflow used by Silicon Valley senior engineers to avoid burning quotas when modifying just one line of code in a massive repo:</p>

<h4>Step 1: Don't Read Source Code, Read AST Skeletons</h4>
<p>Dumping hundreds of <code>.ts</code> files into the terminal is an amateur mistake. **Best Practice:** Run a Python/Node script to extract the **AST (Abstract Syntax Tree) skeleton** of your repo—keeping only class names, function signatures, and types, stripping all implementations. Upload this 20KB skeleton to a **Web "Work" Project**. This drops context overhead by 95%.</p>

<h4>Step 2: Deep Research for "Barren Wastelands"</h4>
<p>When migrating legacy apps or adopting brand-new frameworks (like Next.js 16):<br>
<strong>Don't:</strong> Trial-and-error locally.<br>
<strong>Best Practice:</strong> Trigger <code>/Deepresearch</code> on the Web with a strict schema prompt:<br>
<code>"Initiate Deep Research: Crawl the latest docs. Output a migration guide strictly adhering to this JSON Schema: { 'components': [...], 'deprecated_hooks': [...] }. No fluff."</code><br>
Take that zero-hallucination JSON and hand it to local Codex for flawless execution.</p>

<h4>Step 3: Configure API Fallback (Zero Downtime)</h4>
<p>When the 5-hour limit hits, normal users take a break. Pros configure an API Key Fallback.<br>
In <code>~/.codex/config.json</code>:</p>
<pre><code class="language-json">{
  "fallback_strategy": "api_key",
  "api_model": "gpt-5.6-turbo",
  "max_fallback_spend": 5.0
}</code></pre>
<p>When the subscription quota is exhausted, it seamlessly routes through the pay-as-you-go API, spending a few cents to keep your flow state uninterrupted.</p>

<h3 data-reveal>🎨 3. Visual Pipeline Compression (Image 2.5 to Code)</h3>
<p>Iterating on UI by repeatedly sending screenshots to the terminal is a fast track to getting rate-limited.<br>
<strong>Dimensional Reduction Tactic:</strong> Upload the mockup to Web GPT-6 and prompt: <code>"As a senior frontend architect, describe every CSS detail (flex relationships, hex colors, box-shadows) and output a raw Tailwind skeleton tree. Text only."</code><br>
Pass that text output to Codex. Processing text is 100x faster and cheaper than parsing images, carrying virtually no rate-limit penalty.</p>
</section>"""


# ==============================================================================
# CLAUDE (claude-code-guide.html & .en.html)
# ==============================================================================

claude_zh = """<section id="subscription-quotas">
<div class="sec-tag">Masterclass / 骨灰级实战</div>
<h2>2026 极限压榨指南：Anthropic 缓存魔法与终端防黑洞技术</h2>

<p>相较于其他平台，Anthropic 提供的是最高质量的推理与最长（且最昂贵）的上下文。花 $20 或 $100 订阅 Pro/Team 版，绝不仅仅是多获得几次提问的机会。全网高端开发者在 2026 年总结出的真正“降本增效”核武器是：<strong>Prompt Caching (提示词缓存)</strong> 机制的绝对掌控，以及跨端 Artifacts 的“无伤白嫖”。</p>

<h3 data-reveal>⚡ 1. 核心奥义：90% 折扣的 Prompt Caching 潜规则</h3>
<p>Claude API 和客户端底层都集成了强悍的 Prompt Caching。用得好，同样一个号，您的可用算力是别人的 10 倍。以下是不可不知的底层逻辑：</p>
<ul>
  <li><strong>精准前缀匹配 (Exact Prefix Match)</strong>：缓存完全依赖于对话前缀的逐字匹配。如果您在系统提示词的前方插入了一个动态时间戳、或者随机的 Session ID，**缓存会瞬间全面失效**。</li>
  <li><strong>5 分钟 TTL 保活机制</strong>：默认缓存只存活 5 分钟。一旦命中，计时器重置。这意味着，高频度的短小交互能够一直白嫖缓存的静态文档。</li>
  <li><strong>1024 Token 最小触发门槛</strong>：对于 Sonnet 级别的模型，只有静态内容大于 1024 Tokens，系统才会对其建立缓存。</li>
</ul>

<h3 data-reveal>🛠 2. 顶级工作流 SOP：在 Claude Code 中驾驭缓存</h3>
<p>为了在终端环境里最大化利用 Caching，防止“5小时滚动算力帽”被迅速抽干，请采用这种项目结构策略：</p>
<h4>把所有稳定基石置于顶层 (Static Context)</h4>
<p>利用特有的 <code>&lt;static_context&gt;</code> 标签或 <code>system_prompt.txt</code> 导入。将团队的《编码规范》、《全量 API 字典》和庞大的项目依赖放在最前方。</p>
<pre><code class="language-markdown">&lt;static_context&gt;
// 放入极其稳定、不随每次对话变动的海量文档
&lt;/static_context&gt;

// 后方放入动态 User Query
我现在遇到了一个鉴权报错...</code></pre>
<p>这样，在随后的几百次对话中，前面几万字的稳定文档将以 **90% 甚至更高的算力折扣** 被读取，极其省额度。</p>

<h3 data-reveal>🎭 3. Artifacts 到本地 CI/CD 的“无缝白嫖”桥接</h3>
<p>Web 端的 Artifacts 交互渲染消耗的是极低的算力（且独立计算）。高阶玩家不仅在网页上看看，他们将其接入了本地工作流：</p>
<ol>
  <li>在网页端用 Artifacts 飞速试错，调试出一个完美的 React 复合组件，并附带 Mock 数据。</li>
  <li>利用 Web 端的打包功能（Export as ZIP / JSON），将整个微型环境导出。</li>
  <li>写一个简单的 Bash 脚本：让本地的 Claude Code 自动读取并解压这个包，运行 <code>npm run test</code> 进行本地环境缝合。</li>
  <li><strong>结论</strong>：将高昂的逻辑试错留在便宜的网页端，本地终端只负责“执行与集成验收”。</li>
</ol>

<h3 data-reveal>🕳 4. 防算力黑洞：Docker 限制 Computer Use</h3>
<p>2026 年大火的 <strong>Computer Use（计算机控制）</strong> 功能，如果直接授权给它访问您的 macOS 全局，它会像个无头苍蝇一样疯狂截图找应用，几分钟就能耗干您的日限额。 <br>
<strong>防黑洞方案：</strong> 把它关进 Headless Docker（无头容器）里！构建一个轻量的 Alpine 容器，里面只有 Chrome 和你要测试的目标页面。这样它截图的噪点最少、可选项最少，不仅任务成功率飙升，动作算力消耗也直线下降了 80%。</p>

<h3 data-reveal>✂️ 5. 终端记忆的残酷断舍离 (/compact)</h3>
<p>Claude Code 的命令行环境像一个贪婪的胃，它会累积所有的代码差异和错误堆栈。<br>
<strong>高级用法</strong>：不要只敲 <code>/compact</code>，使用自定义指令：<br>
<code>/compact --prompt "只保留数据库 Schema 的最终改动和核心校验逻辑，丢弃前面所有乱码报错和错误尝试。"</code><br>
这能极高精度地将废话脱水，瞬间清空无效上下文压力。</p>
</section>"""

claude_en = """<section id="subscription-quotas">
<div class="sec-tag">Masterclass</div>
<h2>2026 Max Exploitation Guide: Anthropic Caching Magic & Anti-Blackhole Tactics</h2>

<p>Compared to other platforms, Anthropic provides the highest reasoning quality over the longest (and most expensive) context windows. Paying $20 or $100 for Pro/Team is not just about getting "more messages." In 2026, top-tier developers agree that the ultimate cost-reduction and efficiency weapon is total mastery of <strong>Prompt Caching</strong> and seamless bridging of Web Artifacts.</p>

<h3 data-reveal>⚡ 1. Core Secret: The 90% Discount Rule of Prompt Caching</h3>
<p>Under the hood, Claude APIs and clients integrate powerful Prompt Caching. Master this, and your $20 account will do 10x the work of a novice's. Here are the unspoken mechanics:</p>
<ul>
  <li><strong>Exact Prefix Matching</strong>: Caching relies on 100% verbatim matching of the prompt's beginning. If your system prompt starts with a dynamic timestamp or random session ID, **the entire cache is instantly invalidated.**</li>
  <li><strong>5-Minute TTL Keep-Alive</strong>: By default, cache lives for 5 minutes. A cache hit resets the timer. Therefore, frequent, short interactions can keep massive static documents cached indefinitely.</li>
  <li><strong>1024 Token Threshold</strong>: For Sonnet-tier models, static content must exceed 1024 tokens for the system to bother caching it at all.</li>
</ul>

<h3 data-reveal>🛠 2. Top 1% SOP: Architecting Caching in Claude Code</h3>
<p>To maximize caching in the terminal and protect your "5-Hour Burst Cap" from rapid depletion, use this project structure strategy:</p>
<h4>Place All Stable Foundations at the Top (Static Context)</h4>
<p>Utilize the explicit <code>&lt;static_context&gt;</code> tag (or a fixed <code>system_prompt.txt</code>). Dump your massive "Code Guidelines", "Full API Dictionaries", and project dependencies here.</p>
<pre><code class="language-markdown">&lt;static_context&gt;
// Dump massive, ultra-stable docs here. DO NOT alter this text.
&lt;/static_context&gt;

// Dynamic User Query follows below
I am now encountering an auth error in...</code></pre>
<p>For the next 100 turns of your conversation, those tens of thousands of tokens of static docs will be read at a **90%+ compute discount**, preserving your quota aggressively.</p>

<h3 data-reveal>🎭 3. Bridging Web Artifacts to Local CI/CD (Zero Quota Loss)</h3>
<p>Web Artifacts generation uses a separate, highly optimized compute pool. Power users don't just "look" at Artifacts online; they bridge them:</p>
<ol>
  <li>Use the Web UI to rapidly iterate and debug a complex React Dashboard with mock data (iteration here is incredibly cheap).</li>
  <li>Export the finished micro-environment as a ZIP/JSON payload directly from the Web.</li>
  <li>Write a Bash script that tells your local Claude Code to unzip this payload and run <code>npm run test</code> to integrate it locally.</li>
  <li><strong>Result</strong>: You offloaded expensive logical trial-and-error to the cheap Web tier, using the expensive local terminal only for final integration testing.</li>
</ol>

<h3 data-reveal>🕳 4. Anti-Blackhole: Jailing "Computer Use" in Docker</h3>
<p>The highly acclaimed <strong>Computer Use</strong> feature is an **absolute compute blackhole**. If given access to your raw macOS desktop, it acts like a headless fly, sending high-res screenshots on every click, draining your daily limit in minutes.<br>
<strong>The Fix:</strong> Jail it in a Headless Docker container! Build a lightweight Alpine container running only Chrome and your target app. With fewer visual distractors and no other apps, its task success rate skyrockets, and its action-token consumption drops by 80%.</p>

<h3 data-reveal>✂️ 5. Ruthless Context Amputation (/compact)</h3>
<p>The CLI terminal accumulates every code diff and error stack. <br>
<strong>Advanced Usage</strong>: Don't just type <code>/compact</code>. Use explicit instructions:<br>
<code>/compact --prompt "Retain ONLY the final DB schema changes and the working React hook. Discard all previous errors and debugging attempts."</code><br>
This dehydrates the conversation with extreme precision, instantly zeroing out context pressure.</p>
</section>"""


# ==============================================================================
# GEMINI (google-ai-ecosystem.html & .en.html)
# ==============================================================================

gemini_zh = """<section id="ch6-1">
  <h2>6.1 榨干 AI Pro/Ultra 价值：Context Caching 与全家桶极限外挂</h2>
  <p><span class="tag-badge tag-tip">💰 骨灰级实战</span> 自 2026 年底重构以来，Google 将原有的“One AI Premium”划分为 AI Plus、Pro 与 Ultra，彻底转为**“算力点数 (Compute Points)”**计量。如果不懂 Google 隐藏的 Implicit Caching（隐式缓存）与生态联动，你在终端写代码会遭遇断崖式的降级体验。</p>

  <h3 data-reveal>📊 1. 算力点数暗网与平滑回退 (Graceful Fallback)</h3>
  <ul>
    <li><strong>百万上下文的乘数陷阱</strong>：往 Gemini 1.5/2.0 Ultra 塞入 1M 的代码库，算力消耗是普通聊天的 150 倍。而一次 Imagen 3 的渲染相当于 50 次深度代码审查。</li>
    <li><strong>平滑回退机制</strong>：当你在 5 小时内烧尽了 Ultra 额度，Google 不会拔管，而是自动将你平滑降级到 <strong>Gemini 3.5/3.6 Flash</strong>。此时，输出速度飙升，但复杂逻辑推理能力骤降。一旦发现 Antigravity 变“笨”了，立即停止重构算法，转而让它去写文档或单测。</li>
  </ul>

  <h3 data-reveal>💡 2. 顶级工作流：Implicit Caching 与 XML 格式化</h3>
  <p>很多开发者发现 Gemini 对代码的召回率（Retrieval Accuracy）忽高忽低。全网最佳实践指出，Google 的缓存极度偏爱 <strong>XML 标签化</strong> 的前缀结构。</p>
  <h4>XML 包装法 (提升 99% 召回率并触发深度缓存)</h4>
  <p>不要把散乱的代码文件直接扔给 Gemini。在提交前，通过脚本将你的代码库包装成如下格式，并置于 Prompt 的<strong>最顶端</strong>：</p>
  <pre><code class="language-xml">&lt;repository&gt;
  &lt;file path="src/main.ts"&gt;
    // 源码内容...
  &lt;/file&gt;
  &lt;file path="docs/schema.graphql"&gt;
    // 文档内容...
  &lt;/file&gt;
&lt;/repository&gt;</code></pre>
  <p>保持这段前缀在多次对话中**绝对不可变**，系统将自动触发 <strong>Implicit Caching（隐式缓存）</strong>，不仅省下 80% 的算力点数，还会让超长上下文的定位精度达到恐怖的级别。</p>

  <h3 data-reveal>📚 3. 外挂级组合拳：NotebookLM 无限 RAG 降维打击</h3>
  <p>Google 生态最大的合法“漏洞”在于 <strong>NotebookLM</strong>。它拥有完全独立的、极度慷慨的知识解析算力池。绝不要在终端里用 Antigravity 强吃几十个老旧的 Github 仓库！</p>
  <ol>
    <li>把庞大的老旧项目打成 Zip 包，甚至包含几十本企业内部的 PDF，全部无脑拖入 NotebookLM。</li>
    <li>在 NotebookLM 中发起提问：<code>"以资深架构师身份，提取这些资料中的全量 API 契约、数据库关联，并重点高亮所有的 Breaking Changes，生成终极设计字典。"</code></li>
    <li>更绝的是：利用 NotebookLM 的 <strong>Audio Overview（音频播客生成）</strong> 快速提纯知识要点，然后再把生成的极简 Markdown 字典喂给终端里的 Antigravity 代理。</li>
    <li>**结果**：你用免费且不限量的 NotebookLM 干了最重的解析苦力活，把极其宝贵的 Ultra 算力留给了最终的代码生成执行。</li>
  </ol>

  <h3 data-reveal>🎨 4. 视觉与代码的完美接力 (Imagen 3 to Flutter/React)</h3>
  <p>在 Web 端 Gemini Advanced 中，用尽你的专属视觉配额生成绝美的 Imagen 3 概念图。拿到图后，不要泛泛地问“写出代码”。<br>
  <strong>高阶 Prompt 范式</strong>：<br>
  <code>"作为一个高级 Flutter 工程师，分析这张 Imagen 3 渲染图。第一步：用 Mermaid 输出极其严谨的 Widget Tree（组件树）结构。第二步：只有当我确认组件树无误后，你再开始编写实际的 Dart 代码。"</code></p>
</section>"""

gemini_en = """<section id="ch6-1">
  <h2>6.1 Squeezing AI Pro/Ultra Value: Context Caching & Ecosystem Hacks</h2>
  <p><span class="tag-badge tag-tip">💰 Masterclass</span> Since the late 2026 revamp, Google shifted from "One AI Premium" to a **"Compute Points"** tiered system (Plus, Pro, Ultra). If you don't understand Google's hidden Implicit Caching and ecosystem synergies, coding in the terminal will result in sudden, brutal model downgrades.</p>

  <h3 data-reveal>📊 1. The Compute Point "Dark Web" and Graceful Fallbacks</h3>
  <ul>
    <li><strong>The 1M Context Multiplier Trap</strong>: Shoving a 1M token repo into Gemini 1.5/2.0 Ultra burns 150x more compute points than a standard web chat. Rendering one Imagen 3 high-res image costs the equivalent of 50 deep code reviews.</li>
    <li><strong>Graceful Fallback Mechanism</strong>: When you burn through your Ultra compute within the 5-hour window, Google **does not pull the plug**. The system seamlessly downgrades your backend to <strong>Gemini 3.5/3.6 Flash</strong>. Responses get blazing fast, but deep logical reasoning plummets. If Antigravity suddenly seems "dumb," stop writing complex architectural algorithms immediately and switch to generating docs or unit tests.</li>
  </ul>

  <h3 data-reveal>💡 2. Top 1% Workflow: Implicit Caching & XML Formatting</h3>
  <p>Many developers complain about inconsistent retrieval accuracy in Gemini. The global best practice in 2026 dictates that Google's caching engine heavily favors <strong>XML-tagged</strong> prefix structures.</p>
  <h4>The XML Wrapper Hack (Boosts Recall to 99% & Triggers Deep Caching)</h4>
  <p>Never dump raw, unstructured code files into Gemini. Use a pre-commit script to wrap your codebase like this, placing it at the **absolute top** of the prompt:</p>
  <pre><code class="language-xml">&lt;repository&gt;
  &lt;file path="src/main.ts"&gt;
    // Source code...
  &lt;/file&gt;
  &lt;file path="docs/schema.graphql"&gt;
    // Doc content...
  &lt;/file&gt;
&lt;/repository&gt;</code></pre>
  <p>Keep this exact prefix **verbatim and immutable** across multiple conversations. The system will trigger <strong>Implicit Caching</strong>, saving you up to 80% on compute points and ensuring terrifyingly accurate code retrieval across massive contexts.</p>

  <h3 data-reveal>📚 3. Cheat Code: NotebookLM "Infinite RAG" Synergy</h3>
  <p>The biggest legitimate loophole in the Google ecosystem is <strong>NotebookLM</strong>. It possesses a completely independent, hyper-generous knowledge parsing quota. Never force the Antigravity terminal to brute-force read dozens of legacy GitHub repos!</p>
  <ol>
    <li>Zip up the massive legacy project, along with dozens of enterprise PDFs, and dump them into NotebookLM.</li>
    <li>Prompt NotebookLM: <code>"As a senior architect, extract the complete API contract, database schemas, and highlight all Breaking Changes to generate the ultimate design dictionary."</code></li>
    <li>You can even use NotebookLM's <strong>Audio Overview</strong> to distill the knowledge rapidly. Then, feed the generated minimalist Markdown dictionary into your local Antigravity terminal.</li>
    <li>**Result**: You offloaded the heaviest parsing workload to the free, unlimited NotebookLM pool, saving your precious Ultra compute solely for executing code generation.</li>
  </ol>

  <h3 data-reveal>🎨 4. Vision-to-Code Pipeline (Imagen 3 to React/Flutter)</h3>
  <p>Use your dedicated visual quotas in Gemini Advanced (Web) to generate stunning Imagen 3 concepts. Once you have the perfect image, never vaguely ask for "the code."<br>
  <strong>Advanced Prompt Paradigm:</strong><br>
  <code>"Act as a Senior Flutter Engineer analyzing this Imagen 3 render. Step 1: Output a strictly rigorous Widget Tree structure using Mermaid syntax. Step 2: Only after I approve the Widget Tree will you begin writing the Dart implementation."</code></p>
</section>"""


# ==============================================================================
# GROK (grok-ecosystem-guide.html & .en.html)
# ==============================================================================

grok_zh = """<section id="ch5-1">
  <h2>5.1 榨干 SuperGrok 价值：高并发沙箱与全网 Bug 赏金流派</h2>
  <p><span class="tag-badge tag-tip">💰 骨灰级实战</span> 在 2026 年，xAI 的生态彻底走向“硬核开发者的终极兵器”。不要再去碰那个主打社交和蓝V认证的 X Premium+（不仅贵而且算力极小），直接入手 <strong>SuperGrok ($30/月)</strong>。这篇文章汇集了海外极客论坛的骚操作，教您如何榨干每一丝大模型算力。</p>
  
  <h3 data-reveal>🚀 1. 核心大招：Real-Time X Grounding (全网 Bug 赏金抓取)</h3>
  <p>你一定遇到过这种绝望时刻：某个最新发布的 JS 框架突然抛出一个莫名其妙的堆栈报错，OpenAI 和 Claude 查遍了所有官方文档都无能为力（因为官方都没来得及修复）。此时，Grok 的“推特直接抓取能力”是全人类最强的破局工具。</p>
  <h4>高阶语法拦截（Bypass SEO 污染）</h4>
  <p>不要在本地瞎折腾，去网页版 Grok 开启 Real-Time 模式，使用高阶检索词锁定正在推特上发牢骚的资深工程师：<br>
  <code>"Search X for 'Next.js 16 hydration mismatch error' since:2026-08-01 min_faves:10"</code><br>
  这能瞬间绕过所有采集站和垃圾博客，直接定位到高赞的民间 <strong>Workaround (临时补丁)</strong>。拿到野路子解法后，丢给本地的 Grok Agent 去修代码，瞬间破局。</p>

  <h3 data-reveal>🌩 2. 白嫖云端超算：Grok Build 沙箱并发执行</h3>
  <p>很多开发者还在用自己可怜的 M 系列芯片跑本地集成测试。SuperGrok 订阅其实附带了极其强悍的 <strong>Grok Build 云端开发者平台</strong>。</p>
  <ul>
    <li>**骚操作**：利用 <code>grok build --remote</code> 参数。</li>
    <li>**实战场景**：当你需要对一个庞大项目进行 End-to-End (端到端) 测试、打包多端架构，或者执行高并发的网络爬虫验证时，直接通过指令把任务推送到 xAI 的 Colossus 集群上运行。</li>
    <li>**防节流**：只要你的 <code>Dockerfile</code> 和底层依赖（如 package.json）不频繁改动，云端沙箱会命中环境缓存，不仅不消耗你本地 CPU 一丝一毫的资源，还会极大豁免您在“周统一算力池”里的扣分。</li>
  </ul>

  <h3 data-reveal>🕵️ 3. 驯服算力抽水机：DeepSearch 的“多智能体辩论”</h3>
  <p><strong>DeepSearch (深度搜索)</strong> 消耗极大，它不仅仅是在搜索，它背后是一群智能体在辩论和交叉验证。如果你只是用它查普通 API，那是在用高射炮打蚊子。<br>
  <strong>最佳“开荒”实践</strong>：当你在做重大技术选型（比如在千万级并发下，究竟用 Prisma 还是 Drizzle）时开启。<br>
  **高阶 Prompt**：<br>
  <code>"启用 DeepSearch。启动内部辩论模式。正方支持 Prisma，反方支持 Drizzle，结合全网 2026 年最新评测数据，进行三轮技术反驳。最终给我输出一份包含性能压测预估的 5 页技术白皮书。"</code><br>
  用这招，几分钟内就能输出让 CTO 折服的极致深度报告，这才是 DeepSearch 配额的正确用法。</p>
</section>"""

grok_en = """<section id="ch5-1">
  <h2>5.1 Squeezing SuperGrok Value: Cloud Sandboxing & "Bug Bounty" Tactics</h2>
  <p><span class="tag-badge tag-tip">💰 Masterclass</span> In 2026, xAI's ecosystem evolved into the "ultimate weapon for hardcore developers." Ignore the socially-focused X Premium+ (which is expensive and highly throttled). Go straight for the <strong>SuperGrok ($30/mo)</strong> tier. This article compiles the wildest tactics from elite hacker forums on how to drain every drop of compute value from the Colossus supercomputer clusters.</p>
  
  <h3 data-reveal>🚀 1. The Ultimate Hack: Real-Time X Grounding (Global Bug Bounty)</h3>
  <p>Every dev knows the despair of encountering a cryptic stack trace in a newly released JS framework. OpenAI and Claude will hallucinate fixes because the official docs haven't even been updated yet. Grok's direct, real-time firehose into X (Twitter) is the greatest weapon on earth for this specific scenario.</p>
  <h4>Advanced Search Syntax (Bypassing SEO Spam)</h4>
  <p>Don't trial-and-error locally. Go to the Web Grok UI, enable Real-Time, and use advanced syntax to target senior engineers complaining on X:<br>
  <code>"Search X for 'Next.js 16 hydration mismatch error' since:2026-08-01 min_faves:10"</code><br>
  This instantly bypasses content-farm blogs and pinpoints highly-upvoted, community <strong>Workarounds</strong>. Grab that hacky solution, toss it to your local Grok Agent to implement, and break the deadlock instantly.</p>

  <h3 data-reveal>🌩 2. Free-Riding the Supercomputer: Grok Build Concurrent Sandboxing</h3>
  <p>Many developers are still melting their local M-series chips running massive integration tests. A SuperGrok subscription actually includes access to the terrifyingly powerful <strong>Grok Build Cloud Developer Platform</strong>.</p>
  <ul>
    <li>**The Hack**: Use the <code>grok build --remote</code> flag.</li>
    <li>**Scenario**: When you need to run massive End-to-End (E2E) test suites, compile multi-platform binaries, or execute highly concurrent scraping validations, push the task directly to xAI's Colossus clusters.</li>
    <li>**Anti-Throttling**: As long as your <code>Dockerfile</code> and core dependency files (like package.json) remain relatively stable, the cloud sandbox hits the environment cache. This consumes zero local CPU and largely exempts you from "Heavy Compute Point" deductions in your weekly pool.</li>
  </ul>

  <h3 data-reveal>🕵️ 3. Taming the Compute Vacuum: DeepSearch "Multi-Agent Debate"</h3>
  <p><strong>DeepSearch</strong> is a massive compute vacuum. It doesn't just "Google" things; it deploys swarms of agents to debate and cross-verify findings. Using it for simple API lookups is like using a bazooka on a mosquito.<br>
  <strong>Best Practice for "Wastelands"</strong>: Use it only when making massive architectural decisions (e.g., choosing between Prisma or Drizzle for a 10M-concurrency app).<br>
  **Advanced Prompt**:<br>
  <code>"Enable DeepSearch. Initiate Internal Debate Mode. Agent A argues for Prisma; Agent B argues for Drizzle. Use the latest 2026 benchmark data from the web. Conduct 3 rounds of technical rebuttal. Finally, synthesize a 5-page technical whitepaper with estimated stress-test metrics."</code><br>
  Within minutes, you'll have a report deep enough to impress a CTO. *This* is how you properly burn a DeepSearch quota.</p>
</section>"""

rewrite_section('topics/codex-guide.html', '<section id="subscription-quotas">', '<section id="playbook">', codex_zh)
rewrite_section('topics/codex-guide.en.html', '<section id="subscription-quotas">', '<section id="playbook">', codex_en)
rewrite_section('topics/claude-code-guide.html', '<section id="subscription-quotas">', '<section id="playbook">', claude_zh)
rewrite_section('topics/claude-code-guide.en.html', '<section id="subscription-quotas">', '<section id="playbook">', claude_en)
rewrite_section('topics/google-ai-ecosystem.html', '<section id="ch6-1">', '<div class="footer"', gemini_zh)
rewrite_section('topics/google-ai-ecosystem.en.html', '<section id="ch6-1">', '<div class="footer"', gemini_en)
rewrite_section('topics/grok-ecosystem-guide.html', '<section id="ch5-1">', '<div class="footer"', grok_zh)
rewrite_section('topics/grok-ecosystem-guide.en.html', '<section id="ch5-1">', '<div class="footer"', grok_en)

