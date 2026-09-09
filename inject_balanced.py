import re

def rewrite_section(filepath, start_marker, end_marker, new_content):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    pattern = re.compile(rf'{start_marker}.*?{end_marker}', re.DOTALL)
    if pattern.search(content):
        new_text = pattern.sub(new_content + f'\n\n{end_marker}', content)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_text)
        print(f"Successfully injected balanced content into {filepath}")
    else:
        print(f"Failed to find injection point in {filepath}")

# ==============================================================================
# OPENAI / CODEX (codex-guide.html & .en.html)
# ==============================================================================

codex_zh = """<section id="subscription-quotas">
<div class="sec-tag">最佳实践</div>
<h2>高级会员效能最大化：OpenAI 生态协同指南</h2>

<p>订阅 ChatGPT Plus 或 Pro 后，很多用户会因为在本地终端频繁请求大型上下文，导致迅速触发系统的限流机制（Rate Limits）。要真正发挥高级会员的全部价值，关键在于理解 OpenAI 各产品线的定位，并建立“Web 端统筹规划，终端专注执行”的专业工作流。</p>

<h3 data-reveal>📊 1. 额度管理的核心逻辑</h3>
<p>OpenAI 采用的是动态计算配额。这意味着额度的消耗不仅取决于您提问的次数，更取决于<strong>上下文的长度</strong>和<strong>模型的选择</strong>。</p>
<ul>
  <li>在 Codex 或 IDE 终端中，为了保证代码生成的准确性，系统通常会自动附加大量的工程背景信息。</li>
  <li>如果您在一个包含数十个文件的对话中反复进行微小的提问，庞大的上下文会被反复发送，这将极速消耗您在 5 小时滚动窗口内的配额。</li>
</ul>

<h3 data-reveal>🚀 2. Web 与终端的高效分工</h3>
<p>高效的开发者从不在终端里解决所有问题，而是善用 OpenAI 全家桶的协同优势：</p>
<ul>
  <li><strong>阶段一：Web 端深度研究 (Deep Research)</strong>。遇到未知的框架报错、复杂的架构设计，优先在 ChatGPT 网页端进行探讨。网页端的多模态能力（如联网搜索、图片解析）更强大，且不容易污染本地的编码上下文。</li>
  <li><strong>阶段二：整理为结构化文档</strong>。在网页端理清逻辑后，让 AI 输出一份清晰的“技术方案”或“修改步骤”。</li>
  <li><strong>阶段三：终端精准执行</strong>。回到 Codex 终端，将这份技术方案交给它，下达明确的指令（如：“按照此方案修改当前模块”）。这种“精确打击”能大幅提升代码正确率，并最大程度保护您的算力额度。</li>
</ul>

<h3 data-reveal>🧠 3. 动态模型切换的艺术</h3>
<p>不要在所有场景下都强制使用最重型的模型（如旗舰级推理模型）：</p>
<ul>
  <li><strong>重度逻辑重构</strong>：使用最强模型，确保逻辑严密。</li>
  <li><strong>日常语法修复与注释补充</strong>：在终端手动切换至速度极快、额度极其宽松的轻量级模型。这不仅响应无延迟，还能把宝贵的高级配额留给关键任务。</li>
</ul>
</section>"""

codex_en = """<section id="subscription-quotas">
<div class="sec-tag">Best Practices</div>
<h2>Maximizing Premium Subscriptions: OpenAI Ecosystem Synergy</h2>

<p>After subscribing to ChatGPT Plus or Pro, many users quickly trigger rate limits because they frequently request large contexts within their local terminals. To truly unlock the value of a premium membership, you must understand the positioning of OpenAI's product lines and establish a professional workflow: "Plan on the Web, Execute in the Terminal."</p>

<h3 data-reveal>📊 1. The Core Logic of Quota Management</h3>
<p>OpenAI utilizes dynamic compute quotas. This means consumption depends not just on the number of messages, but critically on <strong>context length</strong> and <strong>model selection</strong>.</p>
<ul>
  <li>In Codex or IDE terminals, the system automatically appends substantial project background information to ensure code generation accuracy.</li>
  <li>If you repeatedly ask minor questions in a chat containing dozens of files, the massive context is re-transmitted every time. This will rapidly deplete your quota within the 5-hour rolling window.</li>
</ul>

<h3 data-reveal>🚀 2. Efficient Division of Labor: Web vs. Terminal</h3>
<p>Highly efficient developers never try to solve everything in the terminal. They leverage the synergy of the entire OpenAI ecosystem:</p>
<ul>
  <li><strong>Phase 1: Web-based Deep Research</strong>. When encountering unknown framework errors or complex architectural designs, start the discussion on the ChatGPT Web interface. The web version's multi-modal capabilities (web browsing, image parsing) are more robust and prevent polluting your local coding context.</li>
  <li><strong>Phase 2: Structured Documentation</strong>. Once the logic is clear on the web, ask the AI to output a concise "Technical Specification" or "Step-by-Step Fix."</li>
  <li><strong>Phase 3: Precise Terminal Execution</strong>. Return to the Codex terminal, provide this specification, and issue clear instructions (e.g., "Modify the current module according to this spec"). This "precision strike" drastically improves code accuracy and protects your compute quota.</li>
</ul>

<h3 data-reveal>🧠 3. The Art of Dynamic Model Switching</h3>
<p>Avoid forcing the heaviest reasoning models for every task:</p>
<ul>
  <li><strong>Heavy Logical Refactoring</strong>: Use the flagship model to ensure rigorous logic.</li>
  <li><strong>Routine Syntax Fixes & Commenting</strong>: Manually switch your terminal to a lightweight, high-speed model with generous quotas. This provides zero-latency responses and reserves your premium quota for critical tasks.</li>
</ul>
</section>"""


# ==============================================================================
# CLAUDE (claude-code-guide.html & .en.html)
# ==============================================================================

claude_zh = """<section id="subscription-quotas">
<div class="sec-tag">最佳实践</div>
<h2>Claude Pro/Team 最佳实践：上下文管理与生态联动</h2>

<p>Anthropic 为 Claude 赋予了业界领先的超长上下文处理能力与深度的代码逻辑推理。但对于 Pro（20美元/月）或 Team 用户而言，如果缺乏科学的上下文管理习惯，很容易在几轮长对话中触发 5 小时的配额限制。掌握以下最佳实践，能让您的开发效率发生质的飞跃。</p>

<h3 data-reveal>⚡ 1. 掌握 Prompt Caching (提示词缓存) 的红利</h3>
<p>Claude 底层具备极为强大的缓存机制，这是节省额度的核心秘密：</p>
<ul>
  <li>如果您在对话的**最开头**放置了大量稳定不变的内容（如团队的代码规范、完整的 API 字典、长篇文档），Claude 会自动将其缓存。</li>
  <li>在后续的对话中，只要这些前置内容没有任何修改，系统读取它们的成本和额度消耗将**大幅降低（最高可省 90%）**。</li>
  <li><strong>实践建议</strong>：永远将静态参考资料放在对话顶部，将您每天不断变动的具体问题写在对话的最底部。</li>
</ul>

<h3 data-reveal>📚 2. 巧用 Projects (工作区) 构建持久化知识库</h3>
<p>如果您在开发一个大型项目，千万不要在每次新建对话时，手动把几十个核心代码文件重新发给 Claude。</p>
<ul>
  <li>在 Claude 网页版中，利用 <strong>Projects</strong> 功能创建一个专属工作区。</li>
  <li>将您的全量核心源码、第三方库文档、甚至 PDF 需求说明书直接上传为 Project Knowledge（项目知识库）。</li>
  <li>在 Project 内的所有对话，都会自动并极其高效地引用这些知识，既保证了回答的精准度，又避免了重复上传导致额度被瞬间抽干。</li>
</ul>

<h3 data-reveal>🧹 3. Context 脱水与长线任务管理</h3>
<p>在复杂的 Debug 过程中，对话往往会堆积大量无效的错误堆栈和中间尝试。长线对话是消耗配额的头号杀手。</p>
<ul>
  <li><strong>及时总结 (脱水)</strong>：当一个 Bug 被成功修复后，如果不打算开启全新话题，建议使用诸如 <code>/compact</code> 的命令，或者手动让 Claude：“总结当前正确的代码逻辑并输出，然后我们开启一个新对话。”</li>
  <li>在新对话中，只带入这份“总结”，抛弃之前几十轮的无效排错记录，系统将重新恢复轻盈与高效。</li>
</ul>

<h3 data-reveal>🎨 4. Artifacts 的高频验证</h3>
<p>开发 Web UI、图表或简单工具时，充分利用 Claude 网页版的 <strong>Artifacts (预览面板)</strong>。</p>
<p>在 Artifacts 中，您可以直接在右侧实时预览代码生成的 UI 效果，随时进行交互调试。等到视觉和逻辑都在网页端打磨完美后，再将最终定稿的代码整合进本地工程。这避免了在本地终端反复生成错误 UI 造成的极大浪费。</p>
</section>"""

claude_en = """<section id="subscription-quotas">
<div class="sec-tag">Best Practices</div>
<h2>Claude Pro/Team Best Practices: Context Management & Synergy</h2>

<p>Anthropic equips Claude with industry-leading long-context processing and deep logical reasoning. However, for Pro ($20/month) or Team users, poor context management can quickly trigger the 5-hour quota limits. Mastering the following best practices will yield a qualitative leap in your development efficiency.</p>

<h3 data-reveal>⚡ 1. Leveraging the Prompt Caching Dividend</h3>
<p>Claude features an incredibly powerful underlying caching mechanism—this is the core secret to preserving your quota:</p>
<ul>
  <li>If you place a large amount of stable, unchanging content (like team coding standards, complete API dictionaries, or long documents) at the <strong>very beginning</strong> of your conversation, Claude automatically caches it.</li>
  <li>In subsequent interactions, as long as this prefix content remains unmodified, the cost and quota consumption to read it are <strong>massively reduced (up to 90% savings)</strong>.</li>
  <li><strong>Practical Advice</strong>: Always place static reference materials at the top of your prompt, and put your dynamic, ever-changing queries at the very bottom.</li>
</ul>

<h3 data-reveal>📚 2. Using Projects for Persistent Knowledge Bases</h3>
<p>If you are developing a large-scale application, never manually re-upload dozens of core code files every time you start a new chat with Claude.</p>
<ul>
  <li>Use the <strong>Projects</strong> feature on the Claude Web interface to create a dedicated workspace.</li>
  <li>Upload your core source code, third-party library documentation, and even PDF requirement specs directly as Project Knowledge.</li>
  <li>All conversations within that Project will automatically and highly efficiently reference this knowledge. This ensures extreme accuracy while preventing the rapid quota drain caused by repetitive uploads.</li>
</ul>

<h3 data-reveal>🧹 3. Context Dehydration & Long-Task Management</h3>
<p>During complex debugging sessions, conversations often accumulate massive amounts of useless error stacks and intermediate attempts. Long-running conversations are the number one quota killer.</p>
<ul>
  <li><strong>Timely Summarization (Dehydration)</strong>: Once a bug is successfully fixed, if you need to move on, use tools like <code>/compact</code>, or manually ask Claude: "Summarize the correct code logic we just established, and let's start a new chat."</li>
  <li>Bring only this "summary" into the new conversation, leaving behind the dozens of rounds of invalid troubleshooting. The system will regain its speed and efficiency.</li>
</ul>

<h3 data-reveal>🎨 4. Rapid Validation with Artifacts</h3>
<p>When developing Web UIs, charts, or simple utilities, fully utilize the <strong>Artifacts (Preview Panel)</strong> in the Claude Web interface.</p>
<p>Artifacts allow you to directly preview and interactively debug the generated UI code in the right-hand panel. Refine the visuals and logic perfectly on the web first, and only integrate the finalized code into your local project afterward. This avoids the massive waste of repeatedly generating incorrect UIs in your local terminal.</p>
</section>"""


# ==============================================================================
# GEMINI (google-ai-ecosystem.html & .en.html)
# ==============================================================================

gemini_zh = """<section id="ch6-1">
  <h2>6.1 Gemini Advanced 最佳实践：打通 Google 生产力全家桶</h2>
  <p><span class="tag-badge tag-tip">高效指南</span> 订阅 Google 的 AI 高级服务（AI Plus / Pro / Ultra）后，其核心优势已远远超越了单纯的对话窗口，而是深入整合了整个 Google Workspace 生产力矩阵。掌握多工具的组合使用，是最大化提升工作效能的关键。</p>

  <h3 data-reveal>📝 1. 生态联动：Docs 与 Drive 的无缝调用</h3>
  <p>作为高级会员，您最大的特权是可以让 AI 直接读取您在云端的文件。在策划项目或编写代码时，您无需再经历“打开文档 -> 复制 -> 粘贴到对话框”的繁琐过程。</p>
  <ul>
    <li>您可以直接在对话中输入：<code>@GoogleDrive 帮我提取《Q4技术架构升级方案》文档中的核心接口定义，并生成对应的 TypeScript 接口代码。</code></li>
    <li>这种生态内的无缝调用，不仅操作极度流畅，还能有效避免大段文本粘贴可能导致的格式错乱与不必要的输入配额消耗。</li>
  </ul>

  <h3 data-reveal>📚 2. 算力卸载：NotebookLM 作为超级阅读器</h3>
  <p>如果您面临着处理海量历史遗留代码、数百页的 PDF 规范或者复杂的财务报表，<strong>直接将其塞入普通的 Gemini 终端是非常低效且耗费配额的。</strong></p>
  <ul>
    <li><strong>最佳策略</strong>：打开 Google 免费提供的知识库神器 <strong>NotebookLM</strong>。</li>
    <li>将所有庞杂的长文档、压缩包统一导入 NotebookLM，让其作为您的“专属数字图书管理员”。</li>
    <li>在 NotebookLM 中让 AI 对全量数据进行梳理，提炼出核心摘要或“设计字典”。随后，您只需带着这份轻量级的精华摘要回到日常的开发终端进行代码生成即可。这能为您节省极其宝贵的高阶算力。</li>
  </ul>

  <h3 data-reveal>🎨 3. 多模态协作：Imagen 3 赋能前端开发</h3>
  <p>Gemini 生态中拥有极高品质的图像生成模型 Imagen 3。在进行前端界面开发时，建议采用**“先定视觉，再定代码”**的工作流。</p>
  <ul>
    <li>首先在 Web 版的 Gemini Advanced 中，通过丰富的指令让模型生成符合您期望的 UI 概念图（例如：“生成一张现代极简风格的仪表盘界面设计”）。</li>
    <li>在网页端反复调整至视觉满意后，利用 Gemini 原生的多模态解析能力，附上这张图并要求：“请精确分析这张设计图的布局与色调，并为我生成完整的 React / Tailwind 代码。”</li>
    <li>这种方式能极大减少模型在代码阶段“盲猜”界面样式所带来的反复修改与摩擦。</li>
  </ul>
</section>"""

gemini_en = """<section id="ch6-1">
  <h2>6.1 Gemini Advanced Best Practices: Workspace Ecosystem Synergy</h2>
  <p><span class="tag-badge tag-tip">Efficiency Guide</span> After subscribing to Google's premium AI services (AI Plus / Pro / Ultra), its core advantage extends far beyond a simple chat window; it is deeply integrated with the entire Google Workspace productivity matrix. Mastering the combined use of these tools is the key to maximizing your workflow efficiency.</p>

  <h3 data-reveal>📝 1. Ecosystem Synergy: Seamless Docs and Drive Integration</h3>
  <p>As a premium member, your greatest privilege is allowing the AI to directly read your cloud files. When planning a project or writing code, you no longer need to go through the tedious process of "Open Doc -> Copy -> Paste into Chat."</p>
  <ul>
    <li>You can simply instruct the chat: <code>@GoogleDrive Extract the core API definitions from my 'Q4 Technical Architecture' document, and generate the corresponding TypeScript interfaces.</code></li>
    <li>This seamless intra-ecosystem call is not only incredibly smooth but also effectively avoids formatting errors from pasting large text blocks, saving unnecessary input quota consumption.</li>
  </ul>

  <h3 data-reveal>📚 2. Compute Offloading: NotebookLM as a Super Reader</h3>
  <p>If you are faced with processing massive legacy codebases, hundreds of pages of PDF specifications, or complex financial reports, <strong>dumping them directly into a standard Gemini terminal is highly inefficient and drains your quota.</strong></p>
  <ul>
    <li><strong>Best Strategy</strong>: Open <strong>NotebookLM</strong>, Google's incredibly powerful, free knowledge base tool.</li>
    <li>Import all your complex long documents and zip files into NotebookLM, treating it as your "personal digital librarian."</li>
    <li>Use NotebookLM to organize the full dataset and extract core summaries or a "design dictionary." Then, simply bring this lightweight, concentrated summary back to your daily coding terminal for execution. This reserves your precious high-tier compute quotas.</li>
  </ul>

  <h3 data-reveal>🎨 3. Multi-modal Collaboration: Imagen 3 for Frontend Dev</h3>
  <p>The Gemini ecosystem features Imagen 3, a remarkably high-quality image generation model. When developing frontend interfaces, we recommend a <strong>"Visuals First, Code Second"</strong> workflow.</p>
  <ul>
    <li>First, use the Web-based Gemini Advanced to generate a UI concept image that matches your vision (e.g., "Generate a modern, minimalist dashboard UI design").</li>
    <li>Iterate on the web until you are visually satisfied. Then, leverage Gemini's native multi-modal parsing by attaching the image and asking: "Precisely analyze the layout and color palette of this design, and generate the complete React / Tailwind code for it."</li>
    <li>This drastically reduces the friction and endless revisions caused by the model "blindly guessing" your UI styling during the coding phase.</li>
  </ul>
</section>"""


# ==============================================================================
# GROK (grok-ecosystem-guide.html & .en.html)
# ==============================================================================

grok_zh = """<section id="ch5-1">
  <h2>5.1 SuperGrok 最佳实践：实时数据流与深度研究</h2>
  <p><span class="tag-badge tag-tip">高效指南</span> 在 xAI 的生态体系中，Grok 最大的优势并非仅仅是代码生成，而是它得天独厚的“实时信息获取能力”。对于开发者和专业研究人员，掌握如何调配资源，是发挥 Grok 订阅最大价值的必修课。</p>
  
  <h3 data-reveal>📊 1. 订阅定位：明确您的核心诉求</h3>
  <p>xAI 目前提供了不同层级的会员服务，它们的资源侧重点完全不同：</p>
  <ul>
    <li><strong>X Premium / Premium+</strong>：主要面向社交媒体用户。它能为您的推特账号提供蓝V认证、发帖加权，并附带了基础的 Grok AI 聊天功能。如果您的主要诉求是在平台上扩大影响力，这是最佳选择。</li>
    <li><strong>SuperGrok</strong>：这是专为生产力、开发者和重度研究人员打造的纯净版 AI 订阅。它提供了极高频次的提问配额、更加稳定的响应速度以及专属的高级研发工具，是进行严肃工作的首选。</li>
  </ul>

  <h3 data-reveal>🚀 2. 独家优势：Real-Time (实时) 检索与 Bug 修复</h3>
  <p>当热门的开源框架（如 React, Vue）在今天刚刚发布更新，或者突然出现了一个广泛影响的系统崩溃时，常规的大模型由于“训练数据截止时间”的限制，往往会给出过时甚至错误的修复建议。</p>
  <ul>
    <li><strong>最佳实践</strong>：立刻打开 Grok，开启实时联网模式。</li>
    <li>输入精准指令：<code>"去 X 平台上搜索一下，今天有没有其他开发者也遇到了 'XXX模块启动失败' 的报错？如果有，总结出高赞的临时解决办法 (Workaround)。"</code></li>
    <li>Grok 能够瞬间切入全球开发者的实时讨论流，为您带回几分钟前刚刚被验证过的最新解决方案。这是目前业内破除技术信息差的最快方式。</li>
  </ul>

  <h3 data-reveal>🕵️ 3. 战略级决策与 DeepSearch (深度搜索)</h3>
  <p>SuperGrok 提供了极其惊艳的 <strong>DeepSearch（深度搜索）</strong> 功能。该功能在后台会进行大量的多页面交叉验证与深度推理，因此也会**显著消耗您的资源配额**。</p>
  <ul>
    <li><strong>避坑指南</strong>：日常的简单代码纠错、基础知识问答，请使用标准模式，绝对不要开启 DeepSearch。</li>
    <li><strong>正确打开方式</strong>：当您面临重大的“战略级选型”或“深度调研”时开启。例如：<code>"全面对比 2026 年市面上主流的 Serverless 数据库产品，结合最新的开发者评测口碑、定价策略，为我输出一份 3000 字的架构选型报告。"</code></li>
    <li>在这种场景下，DeepSearch 会像一个专业的分析师团队，为您产出极具深度的评估报告，让您的会员配额物超所值。</li>
  </ul>
</section>"""

grok_en = """<section id="ch5-1">
  <h2>5.1 SuperGrok Best Practices: Real-Time Data & Deep Research</h2>
  <p><span class="tag-badge tag-tip">Efficiency Guide</span> Within the xAI ecosystem, Grok's greatest strength isn't just code generation; it is its unparalleled "real-time information access." For developers and professional researchers, mastering how to allocate these resources is essential to extracting the maximum value from a Grok subscription.</p>
  
  <h3 data-reveal>📊 1. Subscription Positioning: Clarify Your Core Needs</h3>
  <p>xAI currently offers different tiers of membership, each with entirely different resource priorities:</p>
  <ul>
    <li><strong>X Premium / Premium+</strong>: Aimed primarily at social media users. It provides Blue Checkmark verification, algorithmic boosts for posts, and includes basic Grok AI chat functionality. If your main goal is growing your platform influence, this is the best choice.</li>
    <li><strong>SuperGrok</strong>: A pure AI subscription built specifically for productivity, developers, and heavy researchers. It offers significantly higher interaction quotas, highly stable response speeds, and exclusive advanced R&D tools, making it the definitive choice for serious work.</li>
  </ul>

  <h3 data-reveal>🚀 2. The Unique Advantage: Real-Time Search & Bug Fixing</h3>
  <p>When a popular open-source framework (like React or Vue) releases an update today, or a widespread system crash occurs, conventional LLMs often provide outdated or hallucinated fixes due to their "training data cutoff dates."</p>
  <ul>
    <li><strong>Best Practice</strong>: Immediately open Grok and enable real-time networking mode.</li>
    <li>Use precise prompts: <code>"Search the X platform to see if other developers encountered the 'XXX Module Startup Failure' today. If so, summarize the most highly upvoted workarounds."</code></li>
    <li>Grok instantly taps into the live stream of global developer discussions, returning verified solutions posted just minutes ago. This is currently the fastest way in the industry to break through technical information barriers.</li>
  </ul>

  <h3 data-reveal>🕵️ 3. Strategic Decisions & DeepSearch</h3>
  <p>SuperGrok features the breathtaking <strong>DeepSearch</strong> capability. Because it performs extensive multi-page cross-validation and deep reasoning in the background, it also <strong>significantly consumes your resource quotas</strong>.</p>
  <ul>
    <li><strong>What to Avoid</strong>: For daily code debugging or basic knowledge questions, use Standard Mode. Do not enable DeepSearch.</li>
    <li><strong>The Right Way to Use It</strong>: Enable it when facing major "Strategic Architecture Decisions" or "Deep Market Research." For example: <code>"Comprehensively compare the mainstream Serverless database products of 2026. Combine the latest developer reviews and pricing strategies to output a 3000-word architectural selection report."</code></li>
    <li>In these scenarios, DeepSearch acts like a professional team of analysts, producing highly in-depth evaluation reports that make your membership quota completely worth it.</li>
  </ul>
</section>"""

rewrite_section('topics/codex-guide.html', '<section id="subscription-quotas">', '<section id="playbook">', codex_zh)
rewrite_section('topics/codex-guide.en.html', '<section id="subscription-quotas">', '<section id="playbook">', codex_en)
rewrite_section('topics/claude-code-guide.html', '<section id="subscription-quotas">', '<section id="playbook">', claude_zh)
rewrite_section('topics/claude-code-guide.en.html', '<section id="subscription-quotas">', '<section id="playbook">', claude_en)
rewrite_section('topics/google-ai-ecosystem.html', '<section id="ch6-1">', '<div class="footer"', gemini_zh)
rewrite_section('topics/google-ai-ecosystem.en.html', '<section id="ch6-1">', '<div class="footer"', gemini_en)
rewrite_section('topics/grok-ecosystem-guide.html', '<section id="ch5-1">', '<div class="footer"', grok_zh)
rewrite_section('topics/grok-ecosystem-guide.en.html', '<section id="ch5-1">', '<div class="footer"', grok_en)

