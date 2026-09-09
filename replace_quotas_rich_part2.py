import re

def replace_in_file(filepath, start_marker, end_marker, new_content):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    pattern = re.compile(rf'{start_marker}.*?{end_marker}', re.DOTALL)
    if pattern.search(content):
        new_text = pattern.sub(new_content + f'\n\n{end_marker}', content)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_text)
        print(f"Replaced in {filepath}")
    else:
        print(f"Could not find pattern in {filepath}")

# GEMINI ZH
gemini_zh = """<section id="ch6-1">
  <h2>6.1 榨干 AI Pro/Ultra 价值：全家桶高阶联动实战</h2>
  <p><span class="tag-badge tag-tip">💰 效能最大化</span> 自 2026 年底重构以来，Google 将原有的“One AI Premium”划分为 AI Plus、AI Pro 与 AI Ultra，彻底抛弃了按次计费，转为**“算力点数 (Compute Points)”**。很多人抱怨在终端用 Antigravity 写代码很快就被降级，是因为他们没有看懂 Google 隐藏的“跨产品独立配额”福利。</p>

  <h3 data-reveal>📊 算力点数的“暗网”与回退机制</h3>
  <ul>
    <li><strong>消耗倍数陷阱</strong>：在终端发送 1M Context（百万上下文）的消耗，是你在 Web 网页版普通对话的 <strong>150 倍</strong>。生成一次 Imagen 3 高清图，相当于 50 次代码补全。</li>
    <li><strong>平滑降级 (Graceful Fallback)</strong>：当你在 5 小时窗口内把 Pro/Ultra 的高级算力点数烧完后，Google <strong>不会拔管</strong>。系统会将您的底层模型无缝降级到 <strong>Gemini Flash</strong>。响应速度飙升，但逻辑推理深度锐减。如果发现 Antigravity 突然变笨，请立刻停止写复杂算法，改去写文档。</li>
  </ul>

  <h3 data-reveal>💡 Google 生态的 3 个“外挂级”榨干组合拳</h3>
  
  <h4>外挂一：白嫖 NotebookLM 的“无限阅读”</h4>
  <p>Google 生态最大的漏洞（也是福利），就是 NotebookLM 拥有一套<strong>完全独立且极其慷慨的知识解析算力池</strong>。绝对不要在终端里用大模型硬吃几十个 GitHub 仓库！</p>
  <ul>
    <li>**操作步骤**：把庞大的第三方开源项目打成 Zip 包，或者把上百页的 PDF 传进 NotebookLM。</li>
    <li>**提示词**：<code>"以资深架构师的身份，基于这些资料生成一份高度结构化的 API 契约与使用规范字典，突出所有的 Breaking Changes。"</code></li>
    <li>**交接**：把生成的几百 KB 字典文档，喂给终端里的 Antigravity。您用免费的配额完成了最重的解析工作，把宝贵的 Ultra 算力留给了最终的代码生成。</li>
  </ul>

  <h4>外挂二：视觉降维与 Imagen 3 的独立管线</h4>
  <p>图片与视频生成有独立的算力管道，且在 Web 端享有极高的优先级。</p>
  <ul>
    <li>**UI 设计阶段**：在 Gemini Advanced 网页版利用您的视觉专有配额，生成海量精美的 UI 概念图、素材或者产品架构图解 (利用 Imagen 3)。</li>
    <li>**代码还原阶段**：挑选出最完美的一张，附带在终端要求 Antigravity 进行 <code>Image-to-Code</code> 渲染。不要把修改 UI 的微调过程放在终端里反复跑。</li>
  </ul>

  <h4>外挂三：Workspace 联动自动挡</h4>
  <p>在 AI Pro 及以上版本，AI 对 Google Docs 和 Drive 的读取是不计入常规 API 限制的。团队协作时，将 PRD 和 Jira 验收清单直接放在 Google Docs，终端里的 Antigravity 可以通过 <code>@workspace</code> 指令直接基于云端实时更新的文档写代码，无需反复向终端复制粘贴。</p>
</section>"""

# GEMINI EN
gemini_en = """<section id="ch6-1">
  <h2>6.1 Squeezing AI Pro/Ultra Value: Advanced Ecosystem Tactics</h2>
  <p><span class="tag-badge tag-tip">💰 Maximization</span> Since the late 2026 restructuring, Google transitioned "One AI Premium" into AI Plus, AI Pro, and AI Ultra, completely abandoning prompt counts for a **"Compute Points"** system. Many complain about hitting rate limits quickly when coding via the Antigravity terminal, entirely because they ignore Google's hidden "cross-product independent quotas."</p>

  <h3 data-reveal>📊 The Compute Point "Dark Web" and Fallback Mechanics</h3>
  <ul>
    <li><strong>The Multiplier Trap</strong>: Sending a 1M Context payload in the terminal burns roughly <strong>150 times</strong> more Compute Points than a standard Web chat. Rendering one Imagen 3 high-res image costs the equivalent of 50 code autocompletes.</li>
    <li><strong>Graceful Fallback</strong>: When you burn through your Pro/Ultra compute within the 5-hour window, Google **does not pull the plug**. The system seamlessly downgrades your backend to <strong>Gemini Flash</strong>. Responses get blazing fast, but deep logical reasoning plummets. If Antigravity suddenly seems "dumb," stop writing complex algorithms and switch to generating documentation.</li>
  </ul>

  <h3 data-reveal>💡 3 "Cheat-Code" Combos in the Google Ecosystem</h3>
  
  <h4>Cheat 1: Exploit NotebookLM's "Infinite" Reading</h4>
  <p>The biggest loophole (and perk) in Google's ecosystem is that NotebookLM possesses an **independent and astronomically generous knowledge parsing quota pool**. Never force the terminal LLM to brute-force read dozens of GitHub repos!</p>
  <ul>
    <li>**SOP**: Zip up massive third-party repos or dump hundreds of PDF pages into NotebookLM.</li>
    <li>**Prompt**: <code>"As a senior architect, synthesize these materials into a highly structured API contract and usage dictionary. Highlight all edge cases and breaking changes."</code></li>
    <li>**Handoff**: Feed that ultra-condensed dictionary doc to Antigravity in the terminal. You just used a free quota for the heaviest parsing, saving your precious Ultra compute for actual code generation.</li>
  </ul>

  <h4>Cheat 2: Visual Dimensional Reduction (Imagen 3)</h4>
  <p>Image and video generation rely on dedicated pipelines that receive massive priority on the Web.</p>
  <ul>
    <li>**Design Phase**: Use the Gemini Advanced Web UI to exhaust your dedicated visual quotas generating UI concepts, assets, or architectural diagrams (via Imagen 3).</li>
    <li>**Implementation Phase**: Pick the absolute best image and pass only that *final* version to the local Antigravity terminal for <code>Image-to-Code</code> rendering. Never iterate UI adjustments inside the terminal.</li>
  </ul>

  <h4>Cheat 3: Workspace Auto-Drive</h4>
  <p>On AI Pro and above, AI reads against Google Docs and Drive bypass standard API rate limits. For team collaboration, keep your PRDs and Jira acceptance checklists in Google Docs. The terminal Antigravity can use <code>@workspace</code> to code directly against the live-updated cloud document, eliminating the massive token bloat of copying/pasting specs.</p>
</section>"""

# GROK ZH
grok_zh = """<section id="ch5-1">
  <h2>5.1 榨干 SuperGrok 价值：双环境解耦与防节流实战</h2>
  <p><span class="tag-badge tag-tip">💰 效能最大化</span> 在 2026 年的 xAI 版图中，生态分化走向了极端：一边是与推特(X)深度绑定的社交向 AI，另一边是极客专属的开发者平台 (Build)。很多开发者盲目续费了 X Premium+，结果在跑代码时处处受限，核心原因就是没有看懂背后的“周额度池”博弈。</p>
  
  <h3 data-reveal>📊 避坑指南：套餐定位的巨大鸿沟</h3>
  <table class="tbl">
    <tr><th>订阅计划</th><th>月费(预估)</th><th>核心权益</th><th>开发者适用度与周额度</th></tr>
    <tr><td><strong>X Premium+</strong></td><td>~$40</td><td>推特蓝V、免广告、社交权重提升</td><td>极差。AI 能力只是捆绑附赠，周算力池非常小，极易被限流。</td></tr>
    <tr><td><strong>SuperGrok</strong></td><td>~$30</td><td>纯粹的 AI 生产力、最高频的 API 访问</td><td><strong>必选</strong>。拥有近 3 倍于 Premium+ 的周算力池，专为高强度编码设计。</td></tr>
    <tr><td><strong>SuperGrok Plus/Heavy</strong></td><td>$100+</td><td>多并发数字员工集群部署</td><td>面向极客团队。不受宏观平台“动态节流”影响。</td></tr>
  </table>
  
  <p><strong>注意</strong>：xAI 已经废除了旧版的“每2小时限制提示词数量”，改为 <strong>“每周统一算力池”</strong>。这意味着，如果你周一为了好玩疯狂让它生成 4K 视频，周三你写代码时可能就因为算力耗尽而不断卡顿排队。</p>

  <h3 data-reveal>💡 最优工作流：把独家优势用到极致</h3>
  <ul>
    <li><strong>1. Web 端的 Real-Time X Grounding (全网抓虫)</strong><br>
        不要浪费本地算力让 Grok 去强行修复一个毫无头绪的报错。Grok 最强的是与 X 数据池的绝对直连。遇到诡异的最新版本框架报错，**去 Web 端提问，让它开启 Real-Time 扫描全球开发者在推特上的吐槽和最新 Workaround (临时解法)**。这是 OpenAI 和 Claude 都绝对做不到的。拿到解法后，再丢给本地的 Grok Agent 修代码。
    </li>
    <li><strong>2. DeepSearch (深度搜索) 的克制化“破荒”</strong><br>
        DeepSearch 是一个算力抽水机。**绝对不要把它开着当日常对话用！** 只有当你接手了毫无文档的祖传屎山、或者需要逆向某个冷门第三方 SDK 时，才开启 DeepSearch。让它去互联网深网、废弃博客里把拼凑的代码片段拉出来，整理成一份现代化的 API 规范。
    </li>
    <li><strong>3. Grok Build 云沙箱的并发白嫖</strong><br>
        利用云端 Grok Build 环境，将极度消耗时间和算力的端到端 (E2E) 测试、并行编译、爬虫抓取等脏活，全部丢给云端的沙箱。只要你的环境配置（Dockerfile/依赖包）不频繁变动，Grok Build 会命中环境缓存，这不仅不占用本地 CPU，还会极大豁免您的“重度计算扣分”。
    </li>
  </ul>
</section>"""

# GROK EN
grok_en = """<section id="ch5-1">
  <h2>5.1 Squeezing SuperGrok Value: Dual-Environment Uncoupling & Anti-Throttling</h2>
  <p><span class="tag-badge tag-tip">💰 Maximization</span> In 2026, xAI's ecosystem bifurcated to extremes: on one side, social AI deeply bound to X (Twitter); on the other, the hardcore developer platform (Build). Many developers blindly subscribe to X Premium+ and end up heavily throttled when coding, entirely because they don't understand the "Weekly Quota Pool" mechanics.</p>
  
  <h3 data-reveal>📊 The Pitfall: Massive Gaps in Tier Positioning</h3>
  <table class="tbl">
    <tr><th>Subscription Plan</th><th>Est. Monthly Fee</th><th>Core Benefits</th><th>Dev Suitability & Weekly Quota</th></tr>
    <tr><td><strong>X Premium+</strong></td><td>~$40</td><td>Blue tick, ad-free, algorithm boost</td><td>Terrible. AI is just a bundled perk. The weekly compute pool is tiny and easily throttled.</td></tr>
    <tr><td><strong>SuperGrok</strong></td><td>~$30</td><td>Pure AI productivity, max API access</td><td><strong>Mandatory</strong>. Features nearly 3x the weekly pool of Premium+, designed for heavy coding.</td></tr>
    <tr><td><strong>SuperGrok Plus/Heavy</strong></td><td>$100+</td><td>Multi-agent cluster deployment</td><td>For geek teams. Immune to global platform "dynamic throttling."</td></tr>
  </table>
  
  <p><strong>Notice</strong>: xAI abolished the old "prompts per 2 hours" rule, adopting a <strong>"Unified Weekly Compute Pool"</strong>. This means if you burn compute generating 4K videos for fun on Monday, you might face heavy queuing and lag when trying to code on Wednesday.</p>

  <h3 data-reveal>💡 Ultimate Workflow: Exploit the Unfair Advantages</h3>
  <ul>
    <li><strong>1. Web-based Real-Time X Grounding (Global Bug Catching)</strong><br>
        Don't waste local compute forcing Grok to hallucinate a fix for a cryptic error. Grok's ultimate superpower is its direct firehose to the X data pool. When facing a bizarre bug in a newly updated framework, **go to the Web UI and trigger a Real-Time scan of global developer complaints and cutting-edge workarounds on X**. OpenAI and Claude simply cannot do this. Bring the discovered workaround back to your local Grok Agent to execute.
    </li>
    <li><strong>2. DeepSearch as a "Wasteland Reclamation" Tool</strong><br>
        DeepSearch is a compute vacuum. **Never leave it turned on for casual chats!** Only activate DeepSearch when you inherit undocumented legacy code or need to reverse-engineer an obscure SDK. Let it scour the deep web and abandoned blogs to piece together fragmented snippets into a modernized API spec.
    </li>
    <li><strong>3. Concurrent Free-Riding on Grok Build Cloud Sandboxes</strong><br>
        Offload time-consuming, compute-heavy drudge work—like E2E testing, parallel compilation, or web scraping—to the cloud-based Grok Build sandboxes. As long as your environment configs (Dockerfiles/dependencies) don't change constantly, Grok Build hits cache. This consumes zero local CPU and largely exempts you from "heavy compute point deductions."
    </li>
  </ul>
</section>"""

replace_in_file('topics/google-ai-ecosystem.html', '<section id="ch6-1">', '<div class="footer"', gemini_zh)
replace_in_file('topics/google-ai-ecosystem.en.html', '<section id="ch6-1">', '<div class="footer"', gemini_en)
replace_in_file('topics/grok-ecosystem-guide.html', '<section id="ch5-1">', '<div class="footer"', grok_zh)
replace_in_file('topics/grok-ecosystem-guide.en.html', '<section id="ch5-1">', '<div class="footer"', grok_en)
