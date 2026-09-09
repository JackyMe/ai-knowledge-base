import re
import os

def replace_in_file(filepath, start_marker, end_marker, new_content):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We will use regex to replace the entire section
    # The sections start with <section id="subscription-quotas"> or <section id="ch6-1"> or <section id="ch5-1">
    # And end before the next <section>
    
    pattern = re.compile(rf'{start_marker}.*?{end_marker}', re.DOTALL)
    if pattern.search(content):
        new_text = pattern.sub(new_content + f'\n\n{end_marker}', content)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_text)
        print(f"Replaced in {filepath}")
    else:
        print(f"Could not find pattern in {filepath}")

# CODEX ZH
codex_zh = """<section id="subscription-quotas">
<div class="sec-tag">进阶</div>
<h2>榨干会员价值：独立额度与跨端协同最佳实践</h2>

<p>很多开发者购买了 ChatGPT Plus 或 Pro，却只把它们当作单一的对话框或终端工具，导致大量<strong>“隐形且独立的高价值额度”</strong>被白白浪费。OpenAI 现已全面实行“多面体 (Surfaces)”策略，Web 端、Work 空间、图像生成与终端 Codex 实际上拥有相对独立的资源倾斜。不关心具体参数，只关心怎么用最划算？请看下文。</p>

<h3 data-reveal>🚀 核心心法：拆解任务，专端专用</h3>
<p>不要在 Codex 里做所有事！终端的上下文和工具调用十分昂贵。最佳实践是<strong>“网页端打辅助，Codex 端做决战”</strong>：</p>
<ul>
  <li><strong>1. 独立额度：Web 端“深度研究 (Deep Research)”</strong><br>
      网页版的 Deep Research 是一个专门为查阅、整合全网信息而生的独立 Agent，不占用普通对话和 Codex 快速推理的额度。当您需要学习全新的框架 (如 React 20) 或整合多篇技术文档时，<strong>在 Web 端触发 <code>/Deepresearch</code></strong>。让它写出一份极其详细的 <code>架构设计与 API 参考.md</code>，然后把这个文件喂给本地的 Codex 进行代码编写。
  </li>
  <li><strong>2. 独立额度：Image 2.0 / 2.5 视觉管线</strong><br>
      OpenAI 的图像生成 (DALL-E 3 / Image 2.5 升级版) 在 Web 端有独立的生成队列和配额。<strong>切勿在终端里让 Codex 凭空想象 UI</strong>。最佳实践：在 Web 端输入“生成一个现代 SaaS 仪表盘的 UI 设计图，采用 Image 2.5 的精确布局”，然后在 Web 端用局部重绘 (Inpainting) 修改细节。拿到完美的 UI 图后，再喂给 Codex 进行 <code>Vision-to-Code</code> (视觉转代码) 的精确复刻。
  </li>
  <li><strong>3. Web "Projects" (工作区) 作为外脑</strong><br>
      Plus 会员可以在 Web 端创建多个 Projects。把几十本 API 手册和长达数百页的需求文档上传到 Web Project（这里的文件解析有专属缓存，不消耗您在本地终端每次请求的 Token）。在 Web 端把复杂需求理顺成伪代码，最后让 Codex 去本地执行。
  </li>
  <li><strong>4. 思考模型 (Thinking Mode) 的克制使用</strong><br>
      旗舰的“思考模型”(如 o3 或 Astra-Think) 极其强大但限流严格。在 Codex 中，处理简单的语法报错、加注释，果断在 Model Picker 切换到快速模型；遇到“整个模块状态机混乱”这种级别的问题，再火力全开开启 Thinking。
  </li>
</ul>
</section>"""

# CODEX EN
codex_en = """<section id="subscription-quotas">
<div class="sec-tag">ADV</div>
<h2>Squeezing Membership Value: Independent Quotas & Cross-Platform Best Practices</h2>

<p>Many developers buy ChatGPT Plus or Pro but use them as a single chatbox or a simple terminal tool, completely wasting <strong>"invisible and independent high-value quotas."</strong> OpenAI has fully embraced a "Surfaces" strategy, where Web, Workspaces, Image Generation, and the Codex terminal actually have isolated resources. Don't care about the specific numbers? Just want to know how to maximize value? Read on.</p>

<h3 data-reveal>🚀 Core Strategy: Task Separation across Surfaces</h3>
<p>Don't do everything inside Codex! Terminal context and tool usage are highly expensive. The best practice is: <strong>"Use the Web for Reconnaissance, Codex for Execution."</strong></p>
<ul>
  <li><strong>1. Independent Quota: Web "Deep Research"</strong><br>
      The Web's Deep Research is an independent Agent built to scour and synthesize the internet, utilizing quotas separate from normal chat or fast Codex inference. When learning a brand-new framework (like React 20) or integrating multiple technical docs, <strong>trigger <code>/Deepresearch</code> on the Web</strong>. Have it write a hyper-detailed <code>Architecture_and_API_Ref.md</code>, then feed that Markdown file into your local Codex for implementation.
  </li>
  <li><strong>2. Independent Quota: Image 2.0 / 2.5 Visual Pipeline</strong><br>
      Image generation (DALL-E 3 / Image 2.5) has isolated queues and quotas on the Web. <strong>Never ask Codex to hallucinate UI blindly in the terminal.</strong> Best Practice: Ask the Web UI to "generate a modern SaaS dashboard UI using Image 2.5 layout precision." Use Web Inpainting to tweak details. Once you have the perfect mockup, pass that image to Codex for <code>Vision-to-Code</code> implementation.
  </li>
  <li><strong>3. Web "Projects" as your External Brain</strong><br>
      Plus members can create Web Projects. Upload dozens of API manuals and massive PRDs into a Web Project (which has dedicated caching and doesn't burn your local terminal token quota on every request). Digest the complex requirements into pseudo-code on the Web, then let Codex execute it locally.
  </li>
  <li><strong>4. Sparingly Use "Thinking Mode"</strong><br>
      Flagship reasoning models (like o3 or Astra-Think) are incredibly powerful but heavily rate-limited. In Codex, for simple syntax errors or comments, instantly switch to a fast model via the Model Picker. Only unleash "Thinking" mode when facing complex, cross-module state machine corruption.
  </li>
</ul>
</section>"""

# CLAUDE ZH
claude_zh = """<section id="subscription-quotas">
<div class="sec-tag">进阶</div>
<h2>榨干 Pro/Team 价值：跨端协同最佳实践</h2>

<p>购买 Claude Pro 或 Team 后，不要把视野局限在 Claude Code 的终端里。Anthropic 构建了 Web、Cowork 与 Code 的立体矩阵，它们虽然共享算力，但各个端独有的“杀手锏功能”才是把订阅费赚回来的关键。</p>

<h3 data-reveal>💡 最大化效能的 3 个组合技</h3>
<ul>
  <li><strong>1. Web Artifacts + Code 本地化落地</strong><br>
      Claude 网页版的 Artifacts 是无敌的快速原型工具。**最佳实践**：在 Web 端利用 Artifacts 飞速迭代一个 React 交互组件或数据可视化图表。由于 Web 端交互更快且所见即所得，试错成本极低。当原型在 Web 端完美运行后，将代码复制或打包，再用 Claude Code 终端将其“缝合”进您复杂的本地企业级工程代码中。
  </li>
  <li><strong>2. 让 Web Projects 承担“长文本阅读”重任</strong><br>
      如果您在本地终端让 Claude Code 阅读一本 1000 页的技术规范，每一次微小的代码修改，都会将这 1000 页作为上下文重复计算，极速榨干您的配额。**解法**：在 Claude Web 端创建一个 Project，将这本巨著上传进去。在 Web 端让它总结提炼出针对当前任务的 <code>SPEC.md</code>。然后把这只有 2 页纸的 <code>SPEC.md</code> 放在本地让 Claude Code 读取。
  </li>
  <li><strong>3. 终端 Context 的“断舍离” (/compact)</strong><br>
      Claude Code 的命令行环境像一个贪婪的胃。养成好习惯：完成一个小功能测试后，立刻执行 <code>/compact</code>。这相当于把冗长的对话“脱水压缩”，释放大量占用额度，让同样的 Pro 账号比别人用得更久、跑得更快。
  </li>
</ul>
</section>"""

# CLAUDE EN
claude_en = """<section id="subscription-quotas">
<div class="sec-tag">ADV</div>
<h2>Squeezing Pro/Team Value: Cross-Platform Synergy Best Practices</h2>

<p>After buying Claude Pro or Team, don't confine your vision to the Claude Code terminal. Anthropic has built a matrix of Web, Cowork, and Code. While they share compute, utilizing the "killer features" unique to each platform is the key to maximizing your subscription ROI.</p>

<h3 data-reveal>💡 3 Combo Strategies to Maximize Efficiency</h3>
<ul>
  <li><strong>1. Web Artifacts + Code Localization</strong><br>
      Claude Web's Artifacts is an unbeatable rapid prototyping tool. **Best Practice**: Iterate a React interactive component or data visualization dashboard at lightning speed in the Web Artifacts UI. Because it's WYSIWYG, iteration is cheap. Once the prototype is perfect on the web, export the code and use the Claude Code terminal to intelligently "stitch" it into your complex, local enterprise codebase.
  </li>
  <li><strong>2. Offload "Long-Form Reading" to Web Projects</strong><br>
      If you make Claude Code read a 1000-page technical spec in the terminal, every minor code tweak re-calculates those 1000 pages as context, instantly draining your quota. **Solution**: Create a Project on the Claude Web UI and upload the massive tome there. Ask the Web UI to summarize it into a tightly focused <code>SPEC.md</code> for your current task. Then, place that 2-page <code>SPEC.md</code> in your local repo for Claude Code to execute.
  </li>
  <li><strong>3. Ruthless Context Pruning in Terminal (/compact)</strong><br>
      The Claude Code CLI is a greedy context eater. Build this habit: after finishing and testing a small feature, immediately run <code>/compact</code>. This "dehydrates" a long, rambling conversation into a dense summary, freeing up massive amounts of quota and making your Pro account last twice as long as a novice's.
  </li>
</ul>
</section>"""


# GEMINI ZH
gemini_zh = """<section id="ch6-1">
  <h2>6.1 榨干 AI Pro/Ultra 价值：独立额度与全家桶协同</h2>
  <p><span class="tag-badge tag-tip">💰 效能最大化</span> 很多购买了 Google AI Pro/Ultra 的用户，仅仅把它当作一个“加强版聊天框”或者终端里的 Antigravity。这完全浪费了 Google 生态中大量**不共享额度**或**额度极高**的神器。</p>

  <h3 data-reveal>💡 不看参数，只看如何把订阅费赚回来</h3>
  <div class="duo">
    <div class="card">
      <div class="icon">📚</div>
      <h4>白嫖 NotebookLM 的无限阅读额度</h4>
      <p>Google 生态里，NotebookLM 拥有几乎独立的超大知识库解析能力。**最佳实践**：不要在终端里让大模型强行阅读几十个 GitHub 仓库源码。把这些源码打包或把超大 PDF 全部丢进 NotebookLM。利用 NotebookLM 生成详尽的“设计指南”和“领域知识字典”，再把这份精简字典喂给终端里的 Antigravity。这能为您节省海量的“核心算力点数 (Compute Points)”。</p>
    </div>
    <div class="card">
      <div class="icon">🎨</div>
      <h4>独立图像管线 (Imagen 3 / Video)</h4>
      <p>在 Google 生态里，图片与视频生成有独立的管道。**最佳实践**：在 Web 端的 Gemini Advanced 中，利用您的专属额度生成海量精美的 UI 概念图、素材或者产品架构图解 (利用 Imagen 3)。挑选出最满意的一张，再交给本地的 Antigravity 让他完成 <code>Image-to-Code</code> 的最终渲染。</p>
    </div>
  </div>
</section>"""

# GEMINI EN
gemini_en = """<section id="ch6-1">
  <h2>6.1 Squeezing AI Pro/Ultra Value: Ecosystem Synergy</h2>
  <p><span class="tag-badge tag-tip">💰 Maximization</span> Many Google AI Pro/Ultra subscribers treat it merely as a "smarter chatbox" or just the Antigravity terminal tool. This completely wastes the massive arsenal of Google ecosystem tools that have **isolated quotas** or **virtually unlimited usage**.</p>

  <h3 data-reveal>💡 Forget Numbers, Here's How to Earn Back Your Fee</h3>
  <div class="duo">
    <div class="card">
      <div class="icon">📚</div>
      <h4>Exploit NotebookLM's "Infinite" Reading</h4>
      <p>In the Google ecosystem, NotebookLM possesses near-independent, massive knowledge parsing quotas. **Best Practice**: Do not force the terminal LLM to read dozens of GitHub repos from scratch. Zip those repos or massive PDFs and dump them into NotebookLM. Use NotebookLM to extract a highly detailed "Design Guideline" or "Domain Dictionary", then feed *that* summarized dictionary to Antigravity in your terminal. This saves enormous amounts of Core Compute Points.</p>
    </div>
    <div class="card">
      <div class="icon">🎨</div>
      <h4>Isolated Visual Pipelines (Imagen 3 / Video)</h4>
      <p>Google maintains independent pipelines for image and video generation. **Best Practice**: Use the Gemini Advanced Web UI to exhaust your dedicated visual quotas generating beautiful UI concepts, assets, or architectural diagrams (via Imagen 3). Pick the absolute best one, and only then hand it off to the local Antigravity terminal for the final <code>Image-to-Code</code> rendering.</p>
    </div>
  </div>
</section>"""

# GROK ZH
grok_zh = """<section id="ch5-1">
  <h2>5.1 榨干 SuperGrok 价值：双环境解耦实战</h2>
  <p><span class="tag-badge tag-tip">💰 效能最大化</span> xAI 的生态分化非常明显（社交 X 端与开发者 Build 端）。要最大化您的 SuperGrok 订阅价值，关键在于利用好其独有的“时效数据”与“云端沙箱”的独立优势。</p>
  
  <h3 data-reveal>💡 最佳榨干技巧</h3>
  <ul>
    <li><strong>1. Web 端的 Real-Time X Grounding (实时断言)</strong><br>
        不要浪费算力让 Grok 在本地终端里苦思冥想某个报错。Grok 最强的是与 X (推特) 社交库的实时直连。遇到诡异的最新框架报错，**去 Web 端提问，让它搜索 X 上的全球开发者吐槽和最新 Workaround (临时解法)**。这是其他所有 AI 都做不到的独立优势。拿到解法后，再丢给本地的 Grok Agent 去修代码。
    </li>
    <li><strong>2. DeepSearch 专门用于“破荒”</strong><br>
        DeepSearch (深度搜索) 极其消耗每周配额，它是为了“破荒”而生的。**最佳实践**：在没有任何文档支持、接手极其冷门的祖传代码或老旧第三方 SDK 时，去 Web 开启 DeepSearch，让它把全网散落的废弃博客、论坛片段全部组装成一篇现代化的 API 文档。
    </li>
    <li><strong>3. 把耗时任务丢给 Grok Build (云端)</strong><br>
        利用云端 Grok Build 环境，将极度消耗时间和算力的测试、打包、爬虫抓取等脏活，交给云端的沙箱并发执行，完全不占用你本地电脑的资源和焦点，榨干云端虚拟机的附加价值。
    </li>
  </ul>
</section>"""

# GROK EN
grok_en = """<section id="ch5-1">
  <h2>5.1 Squeezing SuperGrok Value: Dual-Environment Tactics</h2>
  <p><span class="tag-badge tag-tip">💰 Maximization</span> xAI's ecosystem is heavily bifurcated between the Social X environment and the Developer Build platform. Maximizing your SuperGrok subscription relies entirely on exploiting its unique "Real-Time Data" and "Cloud Sandbox" edges.</p>
  
  <h3 data-reveal>💡 Best Practices for Maximization</h3>
  <ul>
    <li><strong>1. Web-based Real-Time X Grounding</strong><br>
        Don't waste compute trying to force Grok to hallucinate a fix for a cryptic error in a local terminal. Grok's ultimate superpower is its real-time firehose connection to X (Twitter). When facing a bizarre bug in a newly updated framework, **go to the Web UI and ask it to search X for global developer complaints and cutting-edge workarounds**. This is a massive, independent advantage no other AI has. Bring the discovered workaround back to your local Grok Agent to implement.
    </li>
    <li><strong>2. Reserve DeepSearch for "Barren Wastelands"</strong><br>
        DeepSearch burns through your weekly pool fast; it is meant for breaking ground. **Best Practice**: Use it only when you have zero documentation—like inheriting obscure legacy code or a deprecated third-party SDK. Trigger DeepSearch on the Web to scour abandoned blogs and forum fragments, assembling them into a modern, synthesized API document.
    </li>
    <li><strong>3. Offload Heavy Lifting to Grok Build (Cloud)</strong><br>
        Leverage the cloud-based Grok Build environments. Offload time-consuming, compute-heavy drudge work like E2E testing, compilation, or web scraping to concurrent cloud sandboxes. It consumes zero local resources, squeezing every drop of value out of your bundled cloud VMs.
    </li>
  </ul>
</section>"""

replace_in_file('topics/codex-guide.html', '<section id="subscription-quotas">', '<section id="playbook">', codex_zh)
replace_in_file('topics/codex-guide.en.html', '<section id="subscription-quotas">', '<section id="playbook">', codex_en)
replace_in_file('topics/claude-code-guide.html', '<section id="subscription-quotas">', '<section id="playbook">', claude_zh)
replace_in_file('topics/claude-code-guide.en.html', '<section id="subscription-quotas">', '<section id="playbook">', claude_en)
replace_in_file('topics/google-ai-ecosystem.html', '<section id="ch6-1">', '<div class="footer"', gemini_zh)
replace_in_file('topics/google-ai-ecosystem.en.html', '<section id="ch6-1">', '<div class="footer"', gemini_en)
replace_in_file('topics/grok-ecosystem-guide.html', '<section id="ch5-1">', '<div class="footer"', grok_zh)
replace_in_file('topics/grok-ecosystem-guide.en.html', '<section id="ch5-1">', '<div class="footer"', grok_en)

