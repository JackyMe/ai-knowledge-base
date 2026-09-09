import re

def rewrite_section(filepath, start_marker, end_marker, new_content):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    pattern = re.compile(rf'{start_marker}.*?{end_marker}', re.DOTALL)
    if pattern.search(content):
        new_text = pattern.sub(new_content + f'\n\n{end_marker}', content)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_text)
        print(f"Successfully injected professional content into {filepath}")
    else:
        print(f"Failed to find injection point in {filepath}")

# ==============================================================================
# OPENAI / CODEX (codex-guide.html & .en.html)
# ==============================================================================

codex_zh = """<section id="subscription-quotas">
<div class="sec-tag">进阶调优</div>
<h2>高级订阅资源效能优化与跨端协同</h2>

<p>在 OpenAI 2026 年的生态架构中，ChatGPT Plus 与 Pro (5x/20x) 的订阅权益已全面细分为不同的计算面（Surfaces）。开发者如果仅在本地 Codex 终端中消耗算力，将面临频繁的限流问题。本节整合了来自资深工程团队的最佳实践，指导您如何通过跨端协同（Web、Work 项目区、API）最大化订阅价值。</p>

<h3 data-reveal>📊 1. 多面体 (Surfaces) 架构下的资源隔离</h3>
<p>OpenAI 底层采用“算力令牌 (Compute Tokens)”动态配额机制，不同界面的消耗池是互相隔离且规则迥异的：</p>
<ul>
  <li><strong>Codex 终端代码生成池</strong>：执行严格的 5 小时滚动限流。由于终端请求会自动挂载环境变量与工程上下文，1M 级巨型上下文的频繁传输会极速削减可用额度，触发平滑降级（如强制回退至 <code>gpt-5.6-luna</code>）。</li>
  <li><strong>Web 深度研究池 (Deep Research)</strong>：拥有完全独立的月度配额（Plus 约 25 次，Pro 250+ 次）。专用于多步网络爬虫与千页资料整合。</li>
  <li><strong>o3/Astra 思考模型池 (Thinking Mode)</strong>：限制最为严格，每日允许的“深层并发思考”时间存在硬性上限，主要为解决重度逻辑死锁保留。</li>
</ul>

<h3 data-reveal>🚀 2. Web 与本地终端的协同 SOP (标准作业程序)</h3>
<p>顶级开发者的核心工作流在于<strong>“职责分离”</strong>：将“学习与整合”交给 Web 端，将“执行与编译”留给本地 Codex。</p>

<h4>阶段 A：利用 Deep Research 进行架构破冰</h4>
<p>在引入全新框架（如 Next.js 16）或整合未知的第三方 SDK 时，不要在本地终端进行反复的报错重试，这会造成算力极度浪费。</p>
<div class="callout tip"><b class="t">最佳实践 Prompt (网页端执行)</b>
<code>启动深度研究：爬取官方文档的最新版本。要求输出一个严格遵循以下 JSON Schema 的迁移指南：{ "components": [...], "deprecated_hooks": [...] }。仅返回结构化数据，不输出多余解释。</code></div>
<p>将 Web 端生成的零幻觉、高度结构化的 JSON 文件下载到本地目录，交由 Codex 读取并执行，可确保代码生成的极高准确率。</p>

<h4>阶段 B：AST 语法树降维提取</h4>
<p>对于动辄上百个文件的全量重构任务，直接让终端读取 <code>.ts</code> 源码会瞬间触碰上下文上限。建议编写前置 Python/Node 脚本，一键提取工程的 <strong>AST（抽象语法树）骨架</strong>（仅保留类名、函数签名和类型定义），将数 MB 的代码压缩为几十 KB 的骨架文件上传至 Web 端的 <strong>Work Projects (工作区)</strong> 形成稳定记忆，从而降低 95% 的终端上下文开销。</p>

<h3 data-reveal>🔌 3. API 兜底 (Fallback) 与服务稳定性</h3>
<p>对于重度依赖编码代理的高阶团队，5 小时限流导致的“被迫挂机”是不可接受的。您可以在 <code>~/.codex/config.json</code> 中配置 API Fallback（备用通道）策略：</p>
<pre><code class="language-json">{
  "fallback_strategy": "api_key",
  "api_model": "gpt-5.6-turbo",
  "max_fallback_spend": 5.0
}</code></pre>
<p>当订阅额度耗尽时，系统将自动无缝切换至按量计费的 API 通道，花费极低成本即可保证工程流水的连续性。</p>

<h3 data-reveal>🎨 4. 多模态降维策略 (Vision-to-Code)</h3>
<p>视觉解析（Vision）模型极其消耗算力。在进行 UI 还原时，切忌直接在终端反复发送设计截图进行微调。<br>
<strong>降维打击方案</strong>：在 Web 端上传 UI 截图，并要求其：“以资深前端工程师视角，详细描述所有 CSS 细节（Flex 布局、绝对定位、色号、阴影），并输出为纯文本的 Tailwind DOM 树结构。”<br>
随后，将生成的纯文本结构喂给 Codex。文本解析的响应速度与成本远优于图像解析，能够实现几乎无损的 <code>Text-to-Code</code> 极速复刻。</p>
</section>"""

codex_en = """<section id="subscription-quotas">
<div class="sec-tag">Advanced Tuning</div>
<h2>Advanced Subscription Optimization & Cross-Platform Synergy</h2>

<p>In OpenAI's 2026 ecosystem architecture, the subscription benefits of ChatGPT Plus and Pro (5x/20x) are strictly segmented across various computational surfaces. Developers relying solely on the local Codex terminal will inevitably encounter frequent rate limits. This section synthesizes best practices from senior engineering teams, guiding you on how to maximize your subscription value through cross-platform synergy (Web, Work Projects, API).</p>

<h3 data-reveal>📊 1. Resource Isolation Under the Surfaces Architecture</h3>
<p>OpenAI utilizes a dynamic "Compute Tokens" quota mechanism, meaning different interfaces draw from isolated pools with distinct rules:</p>
<ul>
  <li><strong>Codex Terminal Code Gen Pool</strong>: Governed by a strict 5-hour rolling limit. Because terminal requests automatically mount environment variables and project context, frequent transmission of 1M-token contexts rapidly depletes available quotas, triggering graceful degradation (e.g., forced fallback to <code>gpt-5.6-luna</code>).</li>
  <li><strong>Web Deep Research Pool</strong>: Possesses a completely independent monthly quota (~25 uses for Plus, 250+ for Pro). It is dedicated to multi-step web crawling and the synthesis of thousands of pages of documentation.</li>
  <li><strong>o3/Astra Thinking Mode Pool</strong>: The most heavily restricted pool, featuring a hard daily cap on "deep concurrent thinking" time, reserved primarily for severe logical deadlocks.</li>
</ul>

<h3 data-reveal>🚀 2. Web & Local Terminal Synergy SOP (Standard Operating Procedure)</h3>
<p>The core workflow of top-tier developers relies on <strong>"Separation of Concerns"</strong>: delegating "learning and synthesis" to the Web, and reserving "execution and compilation" for local Codex.</p>

<h4>Phase A: Architectural Icebreaking with Deep Research</h4>
<p>When introducing a novel framework (like Next.js 16) or integrating unknown third-party SDKs, avoid iterative trial-and-error in the local terminal, which wastes massive compute.</p>
<div class="callout tip"><b class="t">Best Practice Prompt (Execute on Web)</b>
<code>Initiate Deep Research: Crawl the latest version of the official docs. Output a migration guide strictly adhering to this JSON Schema: { "components": [...], "deprecated_hooks": [...] }. Return only structured data without superfluous explanations.</code></div>
<p>Download this zero-hallucination, highly structured JSON file to your local directory for Codex to read and execute, ensuring exceptionally high accuracy in code generation.</p>

<h4>Phase B: AST Dimensionality Reduction</h4>
<p>For full-scale refactors involving hundreds of files, forcing the terminal to read raw <code>.ts</code> source code will instantly hit context ceilings. Recommendation: Write a pre-processing Python/Node script to extract the project's <strong>AST (Abstract Syntax Tree) skeleton</strong> (retaining only class names, function signatures, and type definitions). Uploading this compressed skeleton (tens of KBs instead of MBs) to a Web <strong>Work Project</strong> forms a stable memory, reducing terminal context overhead by 95%.</p>

<h3 data-reveal>🔌 3. API Fallback & Service Stability</h3>
<p>For advanced teams heavily dependent on coding agents, "forced downtime" due to a 5-hour rate limit is unacceptable. You can configure an API Fallback strategy in <code>~/.codex/config.json</code>:</p>
<pre><code class="language-json">{
  "fallback_strategy": "api_key",
  "api_model": "gpt-5.6-turbo",
  "max_fallback_spend": 5.0
}</code></pre>
<p>When the subscription quota is exhausted, the system seamlessly switches to the pay-as-you-go API channel, maintaining the continuity of your engineering pipeline at a minimal cost.</p>

<h3 data-reveal>🎨 4. Multi-modal Dimensional Reduction (Vision-to-Code)</h3>
<p>Vision parsing is highly compute-intensive. When recreating UIs, strictly avoid sending design screenshots iteratively in the terminal for micro-adjustments.<br>
<strong>Dimensional Reduction Strategy</strong>: Upload the UI screenshot on the Web and request: "From the perspective of a senior frontend engineer, detail all CSS properties (Flex layouts, absolute positioning, hex colors, shadows), and output a pure-text Tailwind DOM tree structure."<br>
Subsequently, feed this text structure to Codex. Text parsing is exponentially faster and cheaper than image processing, achieving nearly lossless, instantaneous <code>Text-to-Code</code> replication.</p>
</section>"""

# ==============================================================================
# CLAUDE (claude-code-guide.html & .en.html)
# ==============================================================================

claude_zh = """<section id="subscription-quotas">
<div class="sec-tag">高阶架构</div>
<h2>高阶订阅资源管理与 Anthropic 生态协同</h2>

<p>Anthropic 为 Claude Pro ($20) 与 Team 版用户构建了业界顶级的大容量上下文能力。然而，如何在极其严格的双层限流规则下，保持本地 Claude Code 终端的高效稳定运转，是区分普通用户与资深架构师的核心分水岭。本节将深度解析底层的 Prompt Caching (提示词缓存) 机制以及跨端协同方案。</p>

<h3 data-reveal>⚡ 1. 深度剖析：双层限流与 Prompt Caching 机制</h3>
<p>Claude 的配额管理体系有别于其他平台，其核心逻辑建立在严格的缓存命中率之上：</p>
<ul>
  <li><strong>双层熔断 (Dual-Layer Throttling)</strong>：结合了“5小时短期并发限制”与“每周总算力消耗帽”。在终端进行未经优化的海量代码修改，极易在一小时内耗尽长效配额。</li>
  <li><strong>精准前缀匹配 (Exact Prefix Match)</strong>：Claude 的 Prompt Caching 能够为您节省约 90% 的输入成本与配额消耗，但它要求 <strong>100% 的逐字前缀匹配</strong>。任何动态插入的时间戳或会话 ID 都会导致整条缓存链断裂。</li>
  <li><strong>1024 Token 触发下限</strong>：对于 Sonnet 模型，只有当静态前缀内容超过 1024 Tokens，系统才会对其建立缓存。缓存默认的存活时间 (TTL) 为 5 分钟，且每次命中均会重置该计时器。</li>
</ul>

<h3 data-reveal>🛠 2. &lt;static_context&gt; 的工程化应用</h3>
<p>为了在 Claude Code 终端完美触发 Caching 并保护算力，工程界确立了“静态基石前置”的最佳实践。利用特有的 <code>&lt;static_context&gt;</code> 标签将不可变的文档死死锚定在 Prompt 顶端：</p>
<pre><code class="language-markdown">&lt;static_context&gt;
// 导入团队《编码规范》、《核心接口字典》、大型第三方依赖清单
// 此区域内的文本在整个工程开发周期内严禁变动
&lt;/static_context&gt;

// 用户动态 Query
我现在遇到了一个鉴权中间件的 Token 解析报错，错误堆栈如下...</code></pre>
<p>这种架构确保了在后续数十轮的高频对话中，庞大的背景知识文档均以 90% 以上的折扣被读取，使得您的 Pro 订阅在实际开发周期中续航大幅飙升。</p>

<h3 data-reveal>🎭 3. Artifacts 到本地工程的无缝集成</h3>
<p>Web 端的 Artifacts 交互渲染采用了独立且极度优化的计算管道。高阶团队的工作流通常是**“云端试错，本地集成”**：</p>
<ol>
  <li>在 <strong>Claude.ai (Web)</strong> 端生成并迭代复杂的 React 组件或数据可视化面板，借助其“所见即所得”的特性进行无成本交互微调。</li>
  <li>利用 Web 端的导出功能，获取干净的模块化代码。</li>
  <li>在本地终端中指令 Claude Code：<code>"读取我下载的 Artifacts 模块，将其适配至本地工程的依赖环境，并自动补全相关单元测试。"</code></li>
  <li>这避免了在终端内为了排版错位而反复消耗数十万长下文 Token。</li>
</ol>

<h3 data-reveal>🕳 4. Context 脱水与 Computer Use 沙箱化</h3>
<h4>Context 脱水指令 (/compact)</h4>
<p>终端记忆会不可避免地产生堆积。资深开发者会在完成一个功能闭环后，执行高精度的脱水指令：<br>
<code>/compact --prompt "仅保留数据库 Schema 的最终状态与鉴权逻辑，丢弃所有中间报错与调试过程。"</code><br>
这能瞬间清空无用上下文包袱，恢复系统的高速响应。</p>

<h4>Computer Use (Beta) 容器沙箱化</h4>
<p>在使用 Claude 强大的 Computer Use（接管浏览器和 GUI）特性时，若直接开放宿主机权限，其高频次的全局截图会迅速形成**算力黑洞**。最佳工程实践：将其部署在精简的 Headless Docker（如基于 Alpine 的纯粹浏览器容器）中。干净、受限的视觉搜索空间能使其动作成功率飙升，同时降低近 80% 的算力开销。</p>
</section>"""

claude_en = """<section id="subscription-quotas">
<div class="sec-tag">Advanced Architecture</div>
<h2>Advanced Subscription Management & Anthropic Ecosystem Synergy</h2>

<p>Anthropic provides Claude Pro ($20) and Team users with industry-leading, massive context capabilities. However, maintaining the high efficiency of the local Claude Code terminal under exceptionally strict dual-layer rate limits is the core divider between novice users and senior architects. This section deeply analyzes the underlying Prompt Caching mechanisms and cross-platform synergy strategies.</p>

<h3 data-reveal>⚡ 1. Deep Dive: Dual-Layer Throttling & Prompt Caching</h3>
<p>Claude's quota management system differs from other platforms, relying fundamentally on maintaining high cache hit rates:</p>
<ul>
  <li><strong>Dual-Layer Throttling</strong>: Combines a "5-hour short-term burst limit" with a "weekly sustained compute cap." Unoptimized, massive codebase modifications in the terminal can easily exhaust your long-term quota within an hour.</li>
  <li><strong>Exact Prefix Match</strong>: Claude's Prompt Caching can save approximately 90% of input costs and quota consumption, but it requires <strong>100% verbatim prefix matching</strong>. Any dynamically inserted timestamp or session ID will instantly break the entire cache chain.</li>
  <li><strong>1024 Token Minimum Threshold</strong>: For Sonnet models, static prefix content must exceed 1024 tokens for the system to establish a cache. The default cache Time-to-Live (TTL) is 5 minutes, and every cache hit resets this timer.</li>
</ul>

<h3 data-reveal>🛠 2. Engineering Application of &lt;static_context&gt;</h3>
<p>To flawlessly trigger Caching in the Claude Code terminal and protect compute limits, the engineering community established the "Static Foundation Up-Front" best practice. Utilize the specific <code>&lt;static_context&gt;</code> tag to anchor immutable documents firmly at the top of the prompt:</p>
<pre><code class="language-markdown">&lt;static_context&gt;
// Import team "Coding Standards", "Core API Dictionaries", massive dependencies
// The text within this block MUST NOT CHANGE during the dev cycle
&lt;/static_context&gt;

// Dynamic User Query
I am currently encountering a Token parsing error in the auth middleware...</code></pre>
<p>This architecture ensures that during dozens of subsequent high-frequency interactions, the massive background knowledge docs are processed at a 90%+ discount, exponentially increasing the runway of your Pro subscription.</p>

<h3 data-reveal>🎭 3. Seamless Integration: From Artifacts to Local Projects</h3>
<p>Interactive rendering of Web Artifacts utilizes an independent, highly optimized computational pipeline. The workflow of advanced teams is typically <strong>"Cloud Trial-and-Error, Local Integration"</strong>:</p>
<ol>
  <li>Generate and iterate complex React components or data visualization panels on <strong>Claude.ai (Web)</strong>, utilizing its WYSIWYG nature for cost-free interactive micro-adjustments.</li>
  <li>Use the Web export features to obtain clean, modular code.</li>
  <li>Instruct Claude Code in the local terminal: <code>"Read the downloaded Artifacts module, adapt it to our local project dependencies, and automatically generate unit tests."</code></li>
  <li>This prevents consuming hundreds of thousands of long-context tokens in the terminal just to fix a layout misalignment.</li>
</ol>

<h3 data-reveal>🕳 4. Context Dehydration & Computer Use Sandboxing</h3>
<h4>Context Dehydration Command (/compact)</h4>
<p>Terminal memory inevitably accumulates bloat. Senior developers execute high-precision dehydration commands after completing a functional milestone:<br>
<code>/compact --prompt "Retain ONLY the final Database Schema state and auth logic. Discard all intermediate errors and debugging processes."</code><br>
This instantly purges useless context baggage, restoring the system's high-speed responsiveness.</p>

<h4>Computer Use (Beta) Sandboxing</h4>
<p>When utilizing Claude's powerful Computer Use feature (GUI & browser takeover), granting raw host machine access turns it into a **compute blackhole** due to high-frequency global screenshots. Engineering Best Practice: Deploy it within a streamlined Headless Docker container (e.g., an Alpine-based pure browser container). A clean, restricted visual search space skyrockets task success rates while reducing compute overhead by nearly 80%.</p>
</section>"""


# ==============================================================================
# GEMINI (google-ai-ecosystem.html & .en.html)
# ==============================================================================

gemini_zh = """<section id="ch6-1">
  <h2>6.1 AI Pro/Ultra 算力点数效能最大化与全家桶协同</h2>
  <p><span class="tag-badge tag-tip">资源统筹</span> Google 2026 年底重构后的 AI Plus/Pro/Ultra 体系，全面转向基于<strong>“算力点数 (Compute Points)”</strong>的精细化计量。要在 Antigravity 终端中保持丝滑的代码生成体验，核心在于掌握 Implicit Caching（隐式缓存）的触发规范以及 Workspace 生态矩阵的联动。</p>

  <h3 data-reveal>📊 1. 算力点数 (Compute Points) 与平滑降级机制</h3>
  <p>大模型能力的调配并非线性。深刻理解以下两条核心机制，是避免开发卡顿的前提：</p>
  <ul>
    <li><strong>长文本与多模态的资源乘数</strong>：在终端向 1.5/2.0 Ultra 发送 1M 上下文级别的大型代码库，其算力消耗相当于网页版标准请求的上百倍；同时，生成 Imagen 3 高清图像的开销远高于代码补全。</li>
    <li><strong>Graceful Degradation (平滑降级)</strong>：在 5 小时滚动窗口内耗尽高阶模型的算力点后，Google 服务不会中断，而是智能回退至 <strong>Gemini 3.5 Flash</strong> 等轻量极速模型。此时，建议将任务重心从“深层架构重构”转移到“文档补充与单元测试生成”上，以匹配轻量模型的专长。</li>
  </ul>

  <h3 data-reveal>💡 2. XML 标签化触发隐式缓存 (Implicit Caching)</h3>
  <p>影响 Gemini 代码召回率（Retrieval Accuracy）与缓存命中率的关键，在于 Prompt 结构的前置标准化。Google 官方底层极度偏好 XML 结构化数据。</p>
  <h4>代码规范化封套：</h4>
  <p>切忌将松散的代码片段直接抛入终端。使用构建脚本，将项目源码以 XML 格式进行严密封装，并置于 Prompt 的绝对顶部：</p>
  <pre><code class="language-xml">&lt;repository&gt;
  &lt;file path="src/main.ts"&gt;
    // 源码实现
  &lt;/file&gt;
  &lt;file path="docs/schema.graphql"&gt;
    // 接口文档
  &lt;/file&gt;
&lt;/repository&gt;</code></pre>
  <p>在多轮对话中保持该 XML 前缀绝对不变（满足通常 >4096 Tokens 的下限），即可稳定触发系统的 Implicit Caching，大幅降低每次请求的延迟与算力扣分，同时将超大上下文的寻址精度提升至 99% 以上。</p>

  <h3 data-reveal>📚 3. NotebookLM 作为无限 RAG 外脑</h3>
  <p>跨端协同的最强组合技是利用 Google 免费且额度极高的 <strong>NotebookLM</strong> 作为前置知识处理器。</p>
  <ol>
    <li>面对历史遗留的庞大 GitHub 仓库或海量业务需求 PDF，先将其统一导入 NotebookLM。</li>
    <li>通过指令让 NotebookLM 提纯信息：<code>"梳理全量 API 契约与数据库关联，并提取 Breaking Changes，生成核心设计字典。"</code></li>
    <li>将提纯后仅几 KB 的精简 Markdown 字典传递给本地的 Antigravity 代理进行代码落地。</li>
    <li>此工作流将最沉重的“全文解析”成本留在了 NotebookLM 端，确保终端 Ultra 算力全部用于高质量的逻辑生成。</li>
  </ol>

  <h3 data-reveal>🎨 4. Imagen 3 与终端的代码接力</h3>
  <p>UI 原型开发应充分剥离“视觉生成”与“代码实现”。在 Web 端的 Gemini Advanced 环境中利用专属配额完成 Imagen 3 概念图的生成与微调。定稿后，再发起<strong>代码接力</strong>：<br>
  <code>"分析此 Imagen 3 设计稿。首先：输出严谨的 Widget Tree / DOM Tree 结构。其次：待我确认结构无误后，再输出完整的 Dart / TSX 代码。"</code><br>
  这保证了视觉意图向代码逻辑的精准转化，杜绝了在终端反复生成错误 UI 造成的算力浪费。</p>
</section>"""

gemini_en = """<section id="ch6-1">
  <h2>6.1 Maximizing AI Pro/Ultra Compute Points & Ecosystem Synergy</h2>
  <p><span class="tag-badge tag-tip">Resource Mgmt</span> Google's late-2026 restructuring of the AI Plus/Pro/Ultra tiers completely shifted metering to a granular <strong>"Compute Points"</strong> model. Maintaining a buttery-smooth code generation experience in the Antigravity terminal hinges on mastering Implicit Caching triggers and leveraging the broader Workspace ecosystem matrix.</p>

  <h3 data-reveal>📊 1. Compute Points & Graceful Degradation Mechanics</h3>
  <p>LLM capability allocation is non-linear. Understanding these two core mechanics is the prerequisite to avoiding workflow bottlenecks:</p>
  <ul>
    <li><strong>Resource Multipliers for Long-Context/Multi-modal</strong>: Sending a 1M-context repository to 1.5/2.0 Ultra in the terminal consumes hundreds of times more compute points than a standard web chat. Similarly, generating an Imagen 3 high-res image is vastly more expensive than code completion.</li>
    <li><strong>Graceful Degradation</strong>: Exhausting your high-tier compute points within the 5-hour rolling window does not cause service interruption. Google intelligently falls back to lightning-fast models like <strong>Gemini 3.5 Flash</strong>. When this happens, shift your tasks from "deep architectural refactoring" to "documentation and unit test generation" to match the lightweight model's strengths.</li>
  </ul>

  <h3 data-reveal>💡 2. Triggering Implicit Caching via XML Tagging</h3>
  <p>The key to maximizing Gemini's code Retrieval Accuracy and cache hit rate lies in upfront prompt standardization. Google's underlying architecture heavily favors XML-structured data.</p>
  <h4>Standardized Code Envelopes:</h4>
  <p>Avoid dumping loose code snippets into the terminal. Use a build script to tightly encapsulate your source code in XML format, placing it at the absolute top of your prompt:</p>
  <pre><code class="language-xml">&lt;repository&gt;
  &lt;file path="src/main.ts"&gt;
    // Source implementation
  &lt;/file&gt;
  &lt;file path="docs/schema.graphql"&gt;
    // API Documentation
  &lt;/file&gt;
&lt;/repository&gt;</code></pre>
  <p>Keeping this XML prefix strictly immutable across multiple conversation turns (and typically meeting the >4096 Tokens minimum threshold) reliably triggers Implicit Caching. This massively reduces latency and compute point deductions per request, while boosting ultra-long context targeting precision to over 99%.</p>

  <h3 data-reveal>📚 3. NotebookLM as an Infinite RAG External Brain</h3>
  <p>The most powerful cross-platform synergy combo is utilizing Google's highly generous <strong>NotebookLM</strong> as a frontline knowledge processor.</p>
  <ol>
    <li>When faced with massive legacy GitHub repositories or thousands of pages of business PDF requirements, import them entirely into NotebookLM.</li>
    <li>Instruct NotebookLM to distill the information: <code>"Map the complete API contract and database relations, extract Breaking Changes, and generate a core design dictionary."</code></li>
    <li>Pass this condensed, lightweight Markdown dictionary (a few KBs) to your local Antigravity agent for implementation.</li>
    <li>This workflow offloads the heaviest "full-text parsing" costs to the NotebookLM tier, reserving your precious Ultra compute strictly for high-quality logic generation.</li>
  </ol>

  <h3 data-reveal>🎨 4. Imagen 3 & Terminal Code Relay</h3>
  <p>UI prototype development should strictly separate "visual generation" from "code implementation." Utilize your dedicated quotas in the Web Gemini Advanced environment to generate and tweak Imagen 3 concept art. Once finalized, initiate a <strong>Code Relay</strong>:<br>
  <code>"Analyze this Imagen 3 design. First: Output a rigorous Widget Tree / DOM Tree structure. Second: Await my confirmation on the structure before outputting the complete Dart / TSX code."</code><br>
  This ensures accurate translation of visual intent to code logic, eliminating compute waste caused by iterative, erroneous UI generation in the terminal.</p>
</section>"""


# ==============================================================================
# GROK (grok-ecosystem-guide.html & .en.html)
# ==============================================================================

grok_zh = """<section id="ch5-1">
  <h2>5.1 SuperGrok 效能压榨与开发者云端协同策略</h2>
  <p><span class="tag-badge tag-tip">工程进阶</span> 2026 年，xAI 生态形成了明晰的分叉路线。对于核心开发者而言，理解周级统筹算力池与多智能体（Multi-Agent）环境，是充分发挥 Grok 开发套件效能的必修课。</p>
  
  <h3 data-reveal>📊 1. X Premium+ 与 SuperGrok 的生产力定位差异</h3>
  <p>底层计费逻辑决定了上层应用的稳定性。目前 xAI 采用**“每周统一算力池 (Weekly Unified Compute Pool)”**机制管理复杂操作：</p>
  <ul>
    <li><strong>X Premium+</strong>：定位于“社交加权与基础 AI 体验”，其内置的 AI 配额池相对较小，在进行中大型工程的代码补全时，易频繁触发动态节流 (Dynamic Throttling)。</li>
    <li><strong>SuperGrok</strong>：纯粹的 AI 生产力开发者层级，提供近 3 倍的稳定开发配额，并独享高优先级的 API 请求通道与 Grok Build 云端调度能力。建议所有进行严肃开发的团队将此设为基准配置。</li>
  </ul>

  <h3 data-reveal>🚀 2. Real-Time X Grounding 破局实战</h3>
  <p>当前端框架或底层库发布重大更新时，官方文档往往滞后，常规大模型会因数据阻断而产生严重的“幻觉修复”。此时，Grok 独有的 X (推特) 实时数据直连能力是唯一的破局手段。</p>
  <h4>高阶检索流 (Web 端操作)</h4>
  <p>通过精确的语法拦截高质量的技术讨论，避免 SEO 内容农场的干扰：<br>
  <code>"Search X for 'React 20 hydration mismatch' since:2026-08-01 min_faves:10"</code><br>
  定位到资深开发者发布的高赞 Workaround (临时解决方案) 后，将其作为上下文基准输入给本地 Grok Agent，能够以零幻觉修复最新的棘手 Bug。</p>

  <h3 data-reveal>🌩 3. Grok Build 云端并发执行 (Cloud Concurrent Execution)</h3>
  <p>在面对重型微服务架构时，将资源密集的任务留在本地是不明智的。SuperGrok 订阅直接打通了 Colossus 集群的虚拟机配额：</p>
  <ul>
    <li>利用 CLI 指令 <code>grok build --remote</code>，可将端到端测试 (E2E)、大规模并行编译和高并发爬虫验证无缝迁移至云端沙箱。</li>
    <li><strong>工程优化点</strong>：保持 <code>Dockerfile</code> 与包管理配置文件（如 <code>package.json</code>）的相对稳定，云端容器能瞬间命中层缓存 (Layer Cache)。这不仅完全释放了本地 CPU 资源，更极大降低了针对您每周账户的总计算量扣除权重。</li>
  </ul>

  <h3 data-reveal>🕵️ 4. 多智能体 DeepSearch 的场景约束</h3>
  <p><strong>DeepSearch (深度搜索)</strong> 并非简单的搜索引擎包装，而是调用了复杂的后台多智能体 (Multi-Agent) 辩论与交叉验证网络，因此对算力配额的消耗极为显著。</p>
  <p><strong>防滥用准则与最佳实践</strong>：绝对避免将其用于查询普通的 API 用法。其真实价值在于<strong>“架构选型白皮书生成”</strong>与<strong>“无文档逆向工程”</strong>。<br>
  高阶 Prompt 示范：<br>
  <code>"启用 DeepSearch。开启多智能体技术辩论模式。针对千万级长连接并发场景，正方论证 Erlang/Elixir 的优势，反方论证 Go 的优势。综合全网 2026 最新压测数据，输出一份详细的 5 页技术评估与选型白皮书。"</code><br>
  将 DeepSearch 用在这种战略级技术攻坚上，才是高效利用高阶配额的最佳范本。</p>
</section>"""

grok_en = """<section id="ch5-1">
  <h2>5.1 SuperGrok Optimization & Cloud Synergy Strategies</h2>
  <p><span class="tag-badge tag-tip">Adv Engineering</span> In 2026, the xAI ecosystem solidified a clear bifurcation in its product lines. For core developers, understanding the weekly unified compute pool and multi-agent environments is a prerequisite for unleashing the full power of the Grok development suite.</p>
  
  <h3 data-reveal>📊 1. Productivity Positioning: X Premium+ vs SuperGrok</h3>
  <p>The underlying billing logic dictates application stability. xAI currently utilizes a <strong>"Weekly Unified Compute Pool"</strong> mechanism to manage complex operations:</p>
  <ul>
    <li><strong>X Premium+</strong>: Positioned for "Social Boosting & Basic AI." Its internal AI quota pool is relatively small, making it highly susceptible to Dynamic Throttling when dealing with medium-to-large engineering code completions.</li>
    <li><strong>SuperGrok</strong>: The pure AI productivity tier for developers, providing roughly 3x the stable development quota. It boasts exclusive, high-priority API routing and Grok Build cloud orchestration capabilities. It is highly recommended that all serious development teams adopt this as their baseline configuration.</li>
  </ul>

  <h3 data-reveal>🚀 2. Breaking Deadlocks with Real-Time X Grounding</h3>
  <p>When frontend frameworks or core libraries release major updates, official documentation often lags. Conventional LLMs typically succumb to severe "hallucinated fixes" due to this data cutoff. Grok's exclusive real-time direct connection to X (Twitter) data is the definitive solution.</p>
  <h4>Advanced Retrieval Flow (Web Execution)</h4>
  <p>Intercept high-quality technical discourse using precise syntax, bypassing SEO content farm noise:<br>
  <code>"Search X for 'React 20 hydration mismatch' since:2026-08-01 min_faves:10"</code><br>
  Once you pinpoint highly upvoted Workarounds from senior developers, feed this context directly to your local Grok Agent. This enables zero-hallucination fixes for novel, cutting-edge bugs.</p>

  <h3 data-reveal>🌩 3. Grok Build Cloud Concurrent Execution</h3>
  <p>Running resource-intensive tasks locally on heavy microservice architectures is highly inefficient. A SuperGrok subscription directly unlocks Virtual Machine quotas on the Colossus clusters:</p>
  <ul>
    <li>Utilize the CLI command <code>grok build --remote</code> to seamlessly migrate End-to-End (E2E) testing, massive parallel compilation, and high-concurrency scraping validations to cloud sandboxes.</li>
    <li><strong>Engineering Optimization</strong>: Maintain relative stability in your <code>Dockerfile</code> and package management configs (e.g., <code>package.json</code>). The cloud containers will instantly hit Layer Caches. This not only frees up 100% of your local CPU resources but also significantly mitigates compute deductions against your weekly account pool.</li>
  </ul>

  <h3 data-reveal>🕵️ 4. Scenario Constraints for Multi-Agent DeepSearch</h3>
  <p><strong>DeepSearch</strong> is not a simple search engine wrapper; it invokes a complex backend network of Multi-Agent debates and cross-validation, resulting in substantial quota consumption.</p>
  <p><strong>Anti-Abuse Guidelines & Best Practices</strong>: Strictly avoid using it for trivial API lookups. Its true value shines in <strong>"Architectural Whitepaper Generation"</strong> and <strong>"Undocumented Reverse Engineering."</strong><br>
  Advanced Prompt Example:<br>
  <code>"Enable DeepSearch. Initiate multi-agent technical debate mode. For a 10-million concurrent long-connection scenario, Agent A argues for Erlang/Elixir, Agent B argues for Go. Synthesize the latest 2026 web benchmark data and output a detailed 5-page technical evaluation and selection whitepaper."</code><br>
  Deploying DeepSearch for strategic technical milestones is the optimal blueprint for utilizing high-tier quotas efficiently.</p>
</section>"""

rewrite_section('topics/codex-guide.html', '<section id="subscription-quotas">', '<section id="playbook">', codex_zh)
rewrite_section('topics/codex-guide.en.html', '<section id="subscription-quotas">', '<section id="playbook">', codex_en)
rewrite_section('topics/claude-code-guide.html', '<section id="subscription-quotas">', '<section id="playbook">', claude_zh)
rewrite_section('topics/claude-code-guide.en.html', '<section id="subscription-quotas">', '<section id="playbook">', claude_en)
rewrite_section('topics/google-ai-ecosystem.html', '<section id="ch6-1">', '<div class="footer"', gemini_zh)
rewrite_section('topics/google-ai-ecosystem.en.html', '<section id="ch6-1">', '<div class="footer"', gemini_en)
rewrite_section('topics/grok-ecosystem-guide.html', '<section id="ch5-1">', '<div class="footer"', grok_zh)
rewrite_section('topics/grok-ecosystem-guide.en.html', '<section id="ch5-1">', '<div class="footer"', grok_en)

