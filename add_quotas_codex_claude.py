import os

def update_file(filepath, insert_before_id, html_content, nav_insert_before_id, nav_html):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if f'<section id="{insert_before_id}">' in content:
        content = content.replace(f'<section id="{insert_before_id}">', html_content + '\n\n<section id="' + insert_before_id + '">')
    else:
        print(f"Failed to find {insert_before_id} in {filepath}")
        return

    if f'<a href="#{nav_insert_before_id}">' in content:
        content = content.replace(f'<a href="#{nav_insert_before_id}">', nav_html + '\n    <a href="#' + nav_insert_before_id + '">')
    else:
        print(f"Failed to find nav {nav_insert_before_id} in {filepath}")
        return

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {filepath}")

codex_zh = """<section id="subscription-quotas">
<div class="sec-tag">进阶</div>
<h2>订阅额度与资源榨干指南</h2>

<p>随着 OpenAI 的产品线不断丰富，ChatGPT Plus 与 Pro 用户的权益不仅限于 Web 网页端。在使用 Codex 进行工程开发时，如何充分理解并利用您的订阅额度，是提高开发效率、避免任务中断的关键。</p>

<h3 data-reveal>📊 Plus 与 Pro 的额度池差异</h3>
<table class="tbl">
  <tr><th>订阅层级</th><th>每月价格</th><th>额度池倍率</th><th>适用人群</th></tr>
  <tr><td><strong>ChatGPT Plus</strong></td><td>$20</td><td>1x (基准)</td><td>日常开发、轻中度辅助编程</td></tr>
  <tr><td><strong>ChatGPT Pro (5x)</strong></td><td>$100</td><td>5x</td><td>重度全栈开发者、架构师</td></tr>
  <tr><td><strong>ChatGPT Pro (20x)</strong></td><td>$200</td><td>20x</td><td>高强度 Agent 自动化作业团队</td></tr>
</table>

<p><strong>注意核心机制：</strong>无论是通过网页端的 ChatGPT，还是通过 Codex 终端，或者是使用 Desktop App，您的账单周期内的用量共享<strong>同一个底层动态额度池</strong>。OpenAI 在 2026 年已经全面采用基于“算力消耗 (Compute-Based)”的计量方式，而非简单的对话次数。</p>

<h3 data-reveal>💡 额度榨干与避坑最佳实践</h3>
<ul>
  <li><strong>善用滚动窗口机制 (Rolling Windows)</strong>：OpenAI 通常使用 5 小时滚动窗口。当您触发复杂任务（如大型代码库重构或深层架构推理）时，优先在窗口刷新初期执行，避免在额度即将耗尽时中断。</li>
  <li><strong>大马拉大车，小马拉小车</strong>：
    <ul>
      <li><strong>语法修复/快速改写</strong>：在 Codex 的 Model Picker 中手动降级到 <code>gpt-5.6-luna</code>，它的算力消耗只有旗舰模型的几十分之一，几乎不可能触发限流。</li>
      <li><strong>架构设计/复杂 Bug 定位</strong>：切换至 <code>gpt-6-astra</code> 或 <code>gpt-5.6-sol</code>。好钢用在刀刃上。</li>
    </ul>
  </li>
  <li><strong>DALL-E 3 与图像解析 (Vision) 的开销</strong>：上传大量截图进行 UI 还原（Vision）或要求 Agent 生成占位图时，会大量消耗您的算力池。推荐在 UI 还原时，将截图经过压缩，并一次性传递所有需求，避免反复对话调试 UI。</li>
  <li><strong>预留给网页版的额度</strong>：如果您重度依赖网页版的“深度研究 (Deep Research)”或高级数据分析，请避免让 Codex 在后台彻夜进行无监督重构（除非使用 Pro 20x 层级或配置了 API Key 兜底机制），否则第二天上班您可能会面临长达数小时的降级体验。</li>
</ul>
</section>"""

codex_nav_zh = '<a href="#subscription-quotas"><span class="no">进阶</span>订阅额度与榨干指南</a>'

update_file('topics/codex-guide.html', 'playbook', codex_zh, 'playbook', codex_nav_zh)

codex_en = """<section id="subscription-quotas">
<div class="sec-tag">ADV</div>
<h2>Subscription Quotas & Maximization Guide</h2>

<p>As OpenAI's product line expands, the benefits for ChatGPT Plus and Pro users extend far beyond the Web interface. When using Codex for engineering, fully understanding and exploiting your subscription quotas is key to boosting efficiency and preventing task interruptions.</p>

<h3 data-reveal>📊 Plus vs Pro Quota Pools</h3>
<table class="tbl">
  <tr><th>Subscription Tier</th><th>Monthly Price</th><th>Quota Multiplier</th><th>Target Audience</th></tr>
  <tr><td><strong>ChatGPT Plus</strong></td><td>$20</td><td>1x (Baseline)</td><td>Daily development, light/medium assistance</td></tr>
  <tr><td><strong>ChatGPT Pro (5x)</strong></td><td>$100</td><td>5x</td><td>Heavy full-stack devs, architects</td></tr>
  <tr><td><strong>ChatGPT Pro (20x)</strong></td><td>$200</td><td>20x</td><td>High-intensity automated Agent teams</td></tr>
</table>

<p><strong>Core Mechanism Note:</strong> Whether via web ChatGPT, the Codex terminal, or the Desktop App, your usage draws from the <strong>same underlying dynamic compute pool</strong>. By 2026, OpenAI shifted entirely to "Compute-Based Metering" rather than simple message counts.</p>

<h3 data-reveal>💡 Best Practices for Maximizing Value</h3>
<ul>
  <li><strong>Leverage Rolling Windows</strong>: OpenAI typically uses a 5-hour rolling window. Trigger complex tasks (like massive codebase refactors or deep architectural reasoning) early in a fresh window to prevent hitting limits mid-task.</li>
  <li><strong>Match Model Size to Task Complexity</strong>:
    <ul>
      <li><strong>Syntax Fixes / Quick Rewrites</strong>: Downgrade manually to <code>gpt-5.6-luna</code> in the Codex Model Picker. It consumes a fraction of the compute of flagship models and rarely hits rate limits.</li>
      <li><strong>Architecture Design / Complex Debugging</strong>: Switch to <code>gpt-6-astra</code> or <code>gpt-5.6-sol</code>. Save your heavy compute for where it matters most.</li>
    </ul>
  </li>
  <li><strong>DALL-E 3 & Vision Overhead</strong>: Uploading dozens of screenshots for UI recreation (Vision) or generating assets burns through your compute pool rapidly. Compress your screenshots and batch your UI requests into a single prompt to avoid expensive iterative tweaking.</li>
  <li><strong>Preserving Web Quotas</strong>: If you rely heavily on the web interface's "Deep Research" or Advanced Data Analysis, avoid leaving Codex on unsupervised overnight refactors (unless you have Pro 20x or configured an API key fallback). Otherwise, you might face hours of throttled models the next morning.</li>
</ul>
</section>"""

codex_nav_en = '<a href="#subscription-quotas"><span class="no">ADV</span>Quotas & Maximization</a>'

update_file('topics/codex-guide.en.html', 'playbook', codex_en, 'playbook', codex_nav_en)


claude_zh = """<section id="subscription-quotas">
<div class="sec-tag">进阶</div>
<h2>Pro/Team 额度机制与最佳实践</h2>

<p>Anthropic 采用了一套非常独特的双层限流机制。因为 Claude Code、Claude.ai（网页版）和 Claude Cowork 共享同一套底层算力池，掌握其消耗规律是长期稳定使用大模型协助开发的前提。</p>

<h3 data-reveal>🧠 双层额度控制系统</h3>
<ul>
  <li><strong>第一层：5 小时滚动窗口 (5-Hour Rolling Window)</strong><br>应对短时间内的爆发性计算。从您发送第一条消息起算，5小时后刷新。此机制有效防止了单次过度消耗。</li>
  <li><strong>第二层：每周算力帽 (Weekly Cap)</strong><br>管理您的长期持续计算成本。超出每周额度后，在下一个结算日之前，您可能会遭遇强制降级或排队。</li>
</ul>

<h3 data-reveal>📊 2026 订阅层级差异</h3>
<table class="tbl">
  <tr><th>计划类型</th><th>Claude Code 权限</th><th>相对额度容量</th></tr>
  <tr><td><strong>Pro ($20/月)</strong></td><td>✅ 支持</td><td>1x (基准，自 2026 年 5 月提升了 25%)</td></tr>
  <tr><td><strong>Max 5x / 20x</strong></td><td>✅ 支持</td><td>5x / 20x (面向极端重度用户)</td></tr>
  <tr><td><strong>Team Standard</strong></td><td>❌ 不包含</td><td>按团队规模分配</td></tr>
  <tr><td><strong>Team Premium</strong></td><td>✅ 支持</td><td>约 6.25x Pro (视团队协议波动)</td></tr>
</table>

<h3 data-reveal>💡 额度效能拉满技巧</h3>
<ul>
  <li><strong>主动进行上下文压缩 (Context Compaction)</strong>：不要无脑把 1M token 的大文件塞给模型。使用 <code>/skill-doctor</code> 剔除多余的挂载技能，在完成一个小目标后主动通过 <code>/compact</code> 压实上下文历史。这不仅省钱，还会提升响应速度。</li>
  <li><strong>切换轻量模型处理脏活累活</strong>：面对日志清洗、基础文档生成，手动切至 <code>claude-3-5-haiku</code>，它消耗的额度微乎其微。只有在写核心算法或 Debug 疑难杂症时才调用 <code>Sonnet</code> 或 <code>Opus</code>。</li>
  <li><strong>避免双开内耗</strong>：在终端里运行庞大代码重构任务的同时，尽量不要在 Claude.ai 网页版里进行超长 PDF 解析。两者共享池子，双线开战极易在一小时内耗干 5 小时窗口的可用度。</li>
  <li><strong>越权后备 (Overflow Credit)</strong>：在账户设置中开启“越权后备 (Usage Credits)”，绑定信用卡按标准 API 计费。这能确保在遇到紧急线上事故（刚好耗尽了月卡额度时），依然能拉起 Claude Code 协助救火。</li>
</ul>
</section>"""

claude_nav_zh = '<a href="#subscription-quotas"><span class="no">进阶</span>Pro/Team 额度机制</a>'

update_file('topics/claude-code-guide.html', 'playbook', claude_zh, 'playbook', claude_nav_zh)

claude_en = """<section id="subscription-quotas">
<div class="sec-tag">ADV</div>
<h2>Pro/Team Quotas & Best Practices</h2>

<p>Anthropic uses a unique dual-layer throttling mechanism. Since Claude Code, Claude.ai (Web), and Claude Cowork all share the same underlying compute pool, mastering these consumption rules is a prerequisite for a stable AI-assisted workflow.</p>

<h3 data-reveal>🧠 Dual-Layer Quota System</h3>
<ul>
  <li><strong>Layer 1: 5-Hour Rolling Window</strong><br>Manages short-term burst activity. Resets 5 hours after your first message in a session, preventing acute compute exhaustion.</li>
  <li><strong>Layer 2: Weekly Cap</strong><br>Governs your sustained long-term compute costs. Exceeding this before your weekly reset time may result in forced model downgrades or queueing.</li>
</ul>

<h3 data-reveal>📊 2026 Subscription Tiers</h3>
<table class="tbl">
  <tr><th>Plan Type</th><th>Claude Code Access?</th><th>Relative Capacity</th></tr>
  <tr><td><strong>Pro ($20/mo)</strong></td><td>✅ Yes</td><td>1x (Baseline, permanently boosted 25% in May 2026)</td></tr>
  <tr><td><strong>Max 5x / 20x</strong></td><td>✅ Yes</td><td>5x / 20x (For extreme power users)</td></tr>
  <tr><td><strong>Team Standard</strong></td><td>❌ No</td><td>Varies by team size</td></tr>
  <tr><td><strong>Team Premium</strong></td><td>✅ Yes</td><td>~6.25x Pro (varies)</td></tr>
</table>

<h3 data-reveal>💡 Maximizing Your Quota</h3>
<ul>
  <li><strong>Proactive Context Compaction</strong>: Don't carelessly dump 1M-token files into the context window. Use <code>/skill-doctor</code> to prune redundant skills, and actively use <code>/compact</code> to compress chat history after completing a milestone. This saves quota and speeds up response times.</li>
  <li><strong>Switch to Lightweight Models for Drudge Work</strong>: For log scrubbing or basic docs, manually switch to <code>claude-3-5-haiku</code>, which barely touches your quota. Reserve <code>Sonnet</code> or <code>Opus</code> for core algorithms and deep debugging.</li>
  <li><strong>Avoid Cross-Fire Cannibalization</strong>: Avoid running a massive codebase refactor in the terminal while simultaneously parsing a massive PDF on the Claude.ai web interface. Because they share the same bucket, fighting a two-front war will rapidly drain your 5-hour window.</li>
  <li><strong>Usage Credits (Overflow)</strong>: Enable "Usage Credits" in your account settings and bind a credit card to fall back to standard API pricing. This ensures that if you hit your subscription limit during a critical production outage, Claude Code can still jump in to help troubleshoot.</li>
</ul>
</section>"""

claude_nav_en = '<a href="#subscription-quotas"><span class="no">ADV</span>Pro/Team Quota Limits</a>'

update_file('topics/claude-code-guide.en.html', 'playbook', claude_en, 'playbook', claude_nav_en)
