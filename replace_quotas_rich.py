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

# CODEX ZH
codex_zh = """<section id="subscription-quotas">
<div class="sec-tag">核心进阶</div>
<h2>深度剖析：OpenAI 生态全链路压榨与极限利用指南</h2>

<p>许多开发者每年支付数千美金订阅 ChatGPT Plus 或 Pro，却仅仅将其当作一个“聪明的命令行提示器”。在 2026 年的 OpenAI 矩阵中，<strong>算力是被物理和产品线严格切割的</strong>。Web 端的 Deep Research、桌面端的 Work 模式、后端的 o3/Astra 思考模型、以及终端的 Codex 代理，实际上构成了互补却又彼此独立配额的生态闭环。本节将为您揭示全网顶尖开发者的真实工作流。</p>

<h3 data-reveal>📊 1. 拨开迷雾：2026 年订阅配额的隐藏真相</h3>
<p>OpenAI 已经从单纯的“次数限制”全面转向基于**“算力令牌 (Compute Tokens)”**的动态配额机制。以下是隐藏在官网营销话术下的真实数据基准：</p>
<table class="tbl">
  <tr><th>订阅层级</th><th>官方标价</th><th>Codex 实际可用推理深度</th><th>Web 端 Deep Research 独立配额</th><th>最佳适用场景</th></tr>
  <tr><td><strong>Plus</strong></td><td>$20/月</td><td>中度。约每 5 小时 160 次标准请求，遇到 1M 巨型上下文时衰减极快。</td><td>25 次 / 月</td><td>独立开发者、外包接单、日常辅助</td></tr>
  <tr><td><strong>Pro (5x)</strong></td><td>$100/月</td><td>重度。享有优先队列，不会被动态降级到 mini 模型。</td><td>250 次 / 月</td><td>全栈核心研发、中型架构重构</td></tr>
  <tr><td><strong>Pro (20x)</strong></td><td>$200/月</td><td>极重度。享有 o1-Pro 与 Astra 的专属大算力池。</td><td>500+ 次 / 月</td><td>自动化流水线监控、大型企业级重构</td></tr>
</table>
<div class="callout note"><b class="t">黑客认知</b>：API Key 的计费与网页端/Codex 完全独立。很多顶级玩家会在本地配置 API Fallback（备用通道），一旦 Codex 触发 5 小时限流，自动无缝切到 API 计费，保证灵感不中断。</div>

<h3 data-reveal>🚀 2. 顶级工作流 SOP：Web 与 Codex 的“左右互搏”</h3>
<p>千万不要让终端里的 Codex 去做调研！终端的每次对话都会带上庞大的项目路径和环境变量，这会极大地消耗你的基础算力池。请遵循以下 <strong>SOP (标准作业程序)</strong>：</p>

<h4>阶段 A：Web 端的“火力侦察” (使用独立额度)</h4>
<ol>
  <li>打开浏览器进入 ChatGPT Web 端。</li>
  <li>触发 <code>/Deepresearch</code> 指令。这是 OpenAI 为 Web 预留的独立高价值额度。</li>
  <li><strong>Prompt 示例</strong>：<br>
     <code>"使用 Deep Research 帮我分析最新的 React 20 Server Components 最佳实践。对比 Next.js 16 的官方文档，为我生成一份详细的《架构迁移设计规范.md》。禁止写废话，只保留核心接口定义和边界情况处理。"</code>
  </li>
  <li>拿到 <code>设计规范.md</code> 后，将其下载到本地项目目录。</li>
</ol>

<h4>阶段 B：Work 空间的外脑建立</h4>
<ol>
  <li>在 ChatGPT 桌面版或 Web 端创建一个专用的 <strong>Project (工作区)</strong>。</li>
  <li>将第三方 SDK 的长篇 PDF 手册、UI 团队给的超大 Figma 截图全部上传到此处。<strong>Project 内部具有独立的上下文缓存 (Context Caching)</strong>，极大降低长文本解析成本。</li>
</ol>

<h4>阶段 C：Codex 终端的“精确打击”</h4>
<ol>
  <li>回到 VSCode 或终端，启动 Codex。</li>
  <li>通过引用刚才的规范文件，直接下达执行命令。</li>
  <li><strong>Prompt 示例</strong>：<br>
     <code>"codex exec -- 严格按照我目录下的 架构迁移设计规范.md，重构 src/components 下的所有组件。遇到状态机冲突时，自动挂起并向我请求确认。"</code>
  </li>
  <li>此时，Codex 只需要专注于“写代码”和“跑测试”，完全不会浪费算力在“理解新知识”上。</li>
</ol>

<h3 data-reveal>🎨 3. 视觉管线压榨：Image 2.5 与 UI 还原的“降维打击”</h3>
<p>在 UI 还原的场景中，千万不要给终端里的 Codex 发送一张设计图，然后让它改了十遍！视觉解析极其昂贵。正确的“降维打击”方式是：</p>
<ul>
  <li><strong>逆向工程</strong>：在 Web 端的 GPT-6 中上传截图，输入：<code>"以极度详尽的前端工程师视角，用文字描述这张图的所有 CSS 细节（包括 flex 布局关系、色号、阴影、层级）。输出为结构化的 JSON。"</code></li>
  <li><strong>剥离视觉</strong>：将这段包含 UI 骨架的纯文本 JSON 丢给 Codex。文本的处理速度是图片的 100 倍，且几乎不占算力。Codex 能够瞬间根据这份“UI 蓝图”生成完美还原的 React 代码。</li>
  <li><strong>资产生成</strong>：利用 DALL-E 3 / Image 2.5 在 Web 端独立队列生成所需的高清插图、Logo 占位符，然后直接让 Codex 编写脚本将这些资产映射到对应目录。</li>
</ul>

<h3 data-reveal>🧠 4. o3/Astra 思考模型的节流术</h3>
<p>思考模型 (Thinking Mode) 拥有史无前例的强大逻辑，但配额最少。<strong>请将日常的语法报错修复、代码注释生成、单元测试覆盖率补充，全部通过 Model Picker 降级到 <code>gpt-5.6-luna</code> 甚至更小的模型</strong>。好钢必须用在刀刃上，只有在遇到“整个微服务集群的并发死锁”这种级别的难题时，才开启 Thinking Mode 进行深度排障。</p>

</section>"""

codex_en = """<section id="subscription-quotas">
<div class="sec-tag">Core ADV</div>
<h2>Deep Dive: Maximum Exploitation of the OpenAI Ecosystem</h2>

<p>Many developers spend thousands of dollars a year on ChatGPT Plus or Pro, only to treat it as a "smart CLI prompter." In the 2026 OpenAI matrix, <strong>compute is strictly segmented across physical surfaces and product lines.</strong> Web's Deep Research, Desktop's Work mode, backend o3/Astra models, and the terminal Codex agent actually form a complementary ecosystem with isolated quotas. This section reveals the real workflows of top-tier developers.</p>

<h3 data-reveal>📊 1. Unveiling 2026 Quota Mechanics</h3>
<p>OpenAI has completely transitioned from "message caps" to a dynamic <strong>"Compute Tokens"</strong> metering system. Here is the reality beneath the marketing:</p>
<table class="tbl">
  <tr><th>Tier</th><th>Price</th><th>Codex Actual Reasoning Depth</th><th>Web Deep Research Quota</th><th>Target User</th></tr>
  <tr><td><strong>Plus</strong></td><td>$20/mo</td><td>Moderate. ~160 standard requests / 5 hrs. Degrades rapidly with 1M context.</td><td>25 times / month</td><td>Solo devs, freelancers, daily assist</td></tr>
  <tr><td><strong>Pro (5x)</strong></td><td>$100/mo</td><td>Heavy. Priority queues, immune to forced mini-model downgrades.</td><td>250 times / month</td><td>Core full-stack devs, architecture rewrites</td></tr>
  <tr><td><strong>Pro (20x)</strong></td><td>$200/mo</td><td>Extreme. Dedicated massive compute pool for o1-Pro & Astra.</td><td>500+ times / month</td><td>Automated CI/CD pipelines, enterprise refactoring</td></tr>
</table>
<div class="callout note"><b class="t">Hacker Insight</b>: API Key billing is entirely independent of Web/Codex subscriptions. Top players configure an <code>API Fallback</code> in Codex so that when the 5-hour limit hits, it seamlessly switches to pay-as-you-go API billing, ensuring zero interruption to their flow state.</div>

<h3 data-reveal>🚀 2. Top-Tier SOP: The "Web-Codex Synergy"</h3>
<p>Never let the terminal Codex do your initial research! Every terminal conversation attaches massive project paths and environment variables, rapidly burning your base compute pool. Follow this <strong>Standard Operating Procedure (SOP)</strong>:</p>

<h4>Phase A: Web "Reconnaissance" (Using Independent Quotas)</h4>
<ol>
  <li>Open the ChatGPT Web interface.</li>
  <li>Trigger the <code>/Deepresearch</code> command. This utilizes high-value quotas specifically reserved for the Web.</li>
  <li><strong>Prompt Example</strong>:<br>
     <code>"Use Deep Research to analyze the latest React 20 Server Components best practices. Compare against Next.js 16 official docs and generate a highly detailed 'Architecture_Migration_Spec.md'. No fluff, just core interface definitions and edge-case handling."</code>
  </li>
  <li>Download <code>Architecture_Migration_Spec.md</code> to your local project directory.</li>
</ol>

<h4>Phase B: Building the "Work" External Brain</h4>
<ol>
  <li>Create a dedicated <strong>Project</strong> in the ChatGPT Desktop app or Web interface.</li>
  <li>Upload massive third-party PDF manuals and heavy Figma screenshots here. <strong>Projects have independent Context Caching</strong>, drastically reducing the cost of parsing long texts.</li>
</ol>

<h4>Phase C: Codex Terminal "Precision Strike"</h4>
<ol>
  <li>Return to VSCode or your terminal and launch Codex.</li>
  <li>Reference the spec file to issue exact execution commands.</li>
  <li><strong>Prompt Example</strong>:<br>
     <code>"codex exec -- Strictly follow Architecture_Migration_Spec.md in my directory to refactor all components under src/components. Suspend and ask for confirmation if state machine conflicts arise."</code>
  </li>
  <li>Codex now focuses entirely on "writing code" and "running tests" without wasting compute on "learning new concepts."</li>
</ol>

<h3 data-reveal>🎨 3. Visual Pipeline Squeezing: Image 2.5 and UI Recreation</h3>
<p>For UI implementation, never send an image to terminal Codex and ask it to iterate ten times! Visual parsing is insanely expensive. Use this "Dimensional Reduction" tactic:</p>
<ul>
  <li><strong>Reverse Engineering</strong>: Upload the screenshot to GPT-6 on the Web and ask: <code>"From the perspective of a senior frontend engineer, describe every CSS detail in this image (flex layouts, hex colors, shadows, z-index). Output as a highly structured JSON."</code></li>
  <li><strong>Strip the Vision</strong>: Pass this pure-text JSON UI skeleton to Codex. Text processing is 100x faster and cheaper than image processing. Codex will instantly generate a pixel-perfect React implementation based on this "UI Blueprint".</li>
  <li><strong>Asset Generation</strong>: Use DALL-E 3 / Image 2.5 in its independent Web queue to generate required HD illustrations and logo placeholders, then tell Codex to write a script mapping these assets to the correct directories.</li>
</ul>

<h3 data-reveal>🧠 4. o3/Astra "Thinking Mode" Throttling</h3>
<p>Thinking Mode possesses unprecedented logical capability but has the strictest quotas. <strong>For daily syntax error fixes, docstring generation, and unit test coverage, aggressively downgrade to <code>gpt-5.6-luna</code> via the Model Picker.</strong> Save your heavy artillery for genuine battles—like debugging concurrent deadlocks across microservice clusters.</p>

</section>"""

replace_in_file('topics/codex-guide.html', '<section id="subscription-quotas">', '<section id="playbook">', codex_zh)
replace_in_file('topics/codex-guide.en.html', '<section id="subscription-quotas">', '<section id="playbook">', codex_en)

# CLAUDE ZH
claude_zh = """<section id="subscription-quotas">
<div class="sec-tag">核心进阶</div>
<h2>深度剖析：Anthropic 全家桶无缝穿透与配额榨干指南</h2>

<p>Anthropic 为 Claude Pro ($20) 与 Team ($30/人) 用户打造了极度克制但上限极高的双层配额系统。仅仅在终端里敲击 Claude Code 无法释放这笔月费的真正威力。您需要将 Web 端的 Artifacts、Projects 知识库与本地的终端 Agent 组合成一条“流水线”。</p>

<h3 data-reveal>⚖️ 1. 看懂“5小时滚动窗口”与“周算力帽”的潜规则</h3>
<p>Claude 不同于 OpenAI 的纯滚动窗口，它采用**双层熔断机制**：</p>
<ul>
  <li><strong>5 小时滚动 (Burst Limit)</strong>：防止您在短时间内发送包含几百万 Token 的无意义请求。</li>
  <li><strong>每周算力帽 (Weekly Sustained Cap)</strong>：根据您的套餐层级 (Pro=1x, Max=5x/20x, Team=6.25x)，框定您一周内的总算力。若提前耗尽，将被强制降级到 Haiku，或被限制在极端慢速的队列中。</li>
</ul>
<div class="callout warn"><b class="t">吞噬陷阱</b>：Claude Code 在修改本地文件时，如果不加以控制，很容易把整个 <code>src</code> 目录及测试文件一并塞入 Context。一次对话哪怕只改一行代码，也会消耗 100K 的上下文配额。这是导致很多新手“一小时限流”的罪魁祸首。</div>

<h3 data-reveal>💡 2. 破局之道：全网公认的三大极限压榨工作流</h3>

<h4>绝招一：Web Artifacts 到本地 Repo 的无缝衔接</h4>
<p>网页版的 Artifacts 是生成独立前端组件、交互图表和沙盒代码的最强工具，且其在 Web 端的交互修改是不计入重度长文本上下文的。</p>
<ol>
  <li>在 <strong>Claude.ai (Web)</strong> 中，让模型生成复杂的 React 仪表盘并渲染出 Artifact。</li>
  <li>在 Web 端随意要求修改配色、布局，直至完全满意（试错成本极低）。</li>
  <li>打开本地终端的 <strong>Claude Code</strong>，输入：<br>
     <code>"请抓取我刚才在网页端生成的 Dashboard 组件逻辑，将其整合到当前的 src/pages/Admin.tsx 中，并自动处理好本地的 Tailwind 依赖。"</code></li>
</ol>

<h4>绝招二：利用 Web Projects 作为“记忆黑盒”</h4>
<p>大型重构最怕的就是让 Claude Code 在终端里每次都去读几百个毫无关联的旧文件。</p>
<ol>
  <li>在 <strong>Web 端创建一个 Project</strong>，将旧版系统所有的代码压缩包、接口文档 PDF 全部上传。</li>
  <li>让 Web 端充当架构师：<code>"基于这些旧文档，生成一份精简版的迁移接口映射表 (Migration_Map.json) 和 重构指导书 (SPEC.md)。"</code></li>
  <li>把生成的这两个轻量级文件保存到本地，终端里的 Claude Code 只需要读取这几 KB 的文件，就能明白背后庞大系统的规则。**这能为您节省 99% 的无效上下文消耗。**</li>
</ol>

<h4>绝招三：终端 Context 的“残酷断舍离” (/compact)</h4>
<p>CLI 终端的记忆是累加的。如果您跟 Claude 聊了 20 轮来修复一个 Bug，这 20 轮的所有代码差异、报错栈都会被带入下一轮。</p>
<ul>
  <li>**强制习惯**：每完成一个 Git Commit 或解决完一个局部问题，**必须立刻敲击 <code>/compact</code>**。</li>
  <li>该命令会触发后台子代理，将这 20 轮的废话浓缩成一段 200 字的状态总结。您的 Context 占用瞬间清零，又是一条好汉。</li>
</ul>

<h3 data-reveal>🖥 3. Computer Use (Beta) 的额度防黑洞策略</h3>
<p>2026 年大火的 Computer Use（让 Claude 直接接管浏览器和 GUI 软件）是**绝对的算力黑洞**。它每一帧都在向模型发送高分辨率截图。除非您是 Max 20x 订阅用户，否则切勿让它在无监督的情况下帮您在网上“随便逛逛”。最佳实践是：精确给出 URL 和操作路径，甚至限制最大步数，确保其完成特定表单或验收测试后立刻自动挂起。</p>

</section>"""

claude_en = """<section id="subscription-quotas">
<div class="sec-tag">Core ADV</div>
<h2>Deep Dive: Penetrating the Anthropic Matrix & Squeezing Quotas</h2>

<p>For Claude Pro ($20) and Team ($30/user) subscribers, Anthropic has built an incredibly disciplined yet highly capable dual-layer quota system. Typing commands strictly in the Claude Code terminal will never unlock the true ROI of your monthly fee. You must combine Web Artifacts, Projects knowledge bases, and local terminal Agents into a cohesive "Assembly Line."</p>

<h3 data-reveal>⚖️ 1. Unspoken Rules: "5-Hour Bursts" & "Weekly Caps"</h3>
<p>Unlike OpenAI's pure rolling window, Claude employs a **Dual-Layer Circuit Breaker**:</p>
<ul>
  <li><strong>5-Hour Burst Limit</strong>: Prevents you from hammering the system with multi-million token requests in a short time frame.</li>
  <li><strong>Weekly Sustained Cap</strong>: Defines your absolute total compute over 7 days based on your tier (Pro=1x, Max=5x/20x, Team=6.25x). Exhausting this means forced downgrades to Haiku or relegation to an ultra-slow queue until the reset day.</li>
</ul>
<div class="callout warn"><b class="t">The Devouring Trap</b>: Without strict oversight, Claude Code will eagerly glob your entire <code>src</code> directory and tests into the context just to fix a one-line bug. This sends 100K+ tokens per turn, and is the #1 reason novices hit rate limits within an hour.</div>

<h3 data-reveal>💡 2. Breaking the Cap: The 3 Ultimate Workflows</h3>

<h4>Tactic 1: Seamless Web Artifacts to Local Repo Handoff</h4>
<p>Web Artifacts is the undisputed king of rapid UI prototyping. Iterating in the Web UI is incredibly cheap and bypasses heavy terminal context bloat.</p>
<ol>
  <li>In <strong>Claude.ai (Web)</strong>, prompt the model to generate a complex React dashboard and render it as an Artifact.</li>
  <li>Tweak colors, layout, and logic in the Web UI until perfect (extremely low compute cost per iteration).</li>
  <li>Open <strong>Claude Code</strong> in your local terminal and prompt:<br>
     <code>"Fetch the logic of the Dashboard component I just generated on the Web, integrate it into src/pages/Admin.tsx, and automatically resolve local Tailwind dependencies."</code></li>
</ol>

<h4>Tactic 2: Web Projects as a "Memory Blackbox"</h4>
<p>The worst thing you can do during a massive legacy rewrite is force Claude Code to re-read 500 disconnected legacy files on every single terminal prompt.</p>
<ol>
  <li>Create a <strong>Project on the Web</strong>. Upload zipped legacy code and massive API PDF docs.</li>
  <li>Assign the Web AI the role of Software Architect: <code>"Based on these docs, generate a hyper-condensed Migration_Map.json and a SPEC.md for the rewrite."</code></li>
  <li>Save those two lightweight files locally. Now, Claude Code in the terminal only reads a few kilobytes to understand the rules of a massive system. **This saves 99% of useless context waste.**</li>
</ol>

<h4>Tactic 3: Ruthless Context Amputation (/compact)</h4>
<p>The CLI terminal's memory is cumulative. If you argue with Claude for 20 turns over a bug, all those code diffs and stack traces drag into turn 21.</p>
<ul>
  <li>**Mandatory Habit**: After every successful Git Commit or resolved milestone, **immediately type <code>/compact</code>**.</li>
  <li>This triggers a background subagent to dehydrate 20 turns of rambling into a 200-word state summary. Your context overhead drops to near zero, restoring massive quota runway.</li>
</ul>

<h3 data-reveal>🖥 3. Anti-Blackhole Strategies for Computer Use (Beta)</h3>
<p>The highly acclaimed Computer Use feature (where Claude controls your browser and GUI) is an **absolute compute blackhole**. It sends high-res screenshots to the model on every single frame. Unless you are on a Max 20x plan, never let it "browse around" unsupervised. Best practice: Provide exact URLs, highly explicit DOM paths, and enforce strict max-step limits to ensure it suspends immediately after passing E2E acceptance tests.</p>

</section>"""

replace_in_file('topics/claude-code-guide.html', '<section id="subscription-quotas">', '<section id="playbook">', claude_zh)
replace_in_file('topics/claude-code-guide.en.html', '<section id="subscription-quotas">', '<section id="playbook">', claude_en)
