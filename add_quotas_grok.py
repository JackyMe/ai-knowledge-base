import os

def update_file(filepath, insert_after_id, html_content, nav_insert_after, nav_html):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # The end of grok file also has:
    #      </section>
    #      <div class="footer"
    footer_pattern = '<div class="footer"'
    if footer_pattern in content:
        content = content.replace(footer_pattern, html_content + '\n      ' + footer_pattern)
    else:
        print(f"Failed to find footer in {filepath}")
        return

    # nav ends with: 
    #    <div class="nav-group"><div class="gt">四 · 高阶调优与硬件</div>
    #      <a href="#ch4-1"><span class="no">4.1</span>...</a>
    #      <a href="#ch4-2"><span class="no">4.2</span>...</a>
    #    </div>
    #  </nav>
    nav_end = '</nav>'
    if nav_end in content:
        content = content.replace(nav_end, nav_html + '\n  ' + nav_end)
    else:
        print(f"Failed to find nav end in {filepath}")
        return

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {filepath}")

grok_zh = """<section id="ch5-1">
  <h2>5.1 X Premium+ vs SuperGrok 额度博弈与榨干</h2>
  <p><span class="tag-badge tag-tip">💰 订阅策略</span> 在 2026 年，xAI 明确了消费级和生产力两套不同的计费体系。如果您重度依赖 Grok 进行编码、分析或长期数字员工运行，选错套餐会极大影响可用额度。</p>
  
  <h3 data-reveal>📊 套餐定位与额度池对比</h3>
  <table class="tbl">
    <tr><th>订阅计划</th><th>月费(预估)</th><th>核心定位</th><th>相对额度/周</th></tr>
    <tr><td><strong>X Premium</strong></td><td>~$8</td><td>社交 + 轻量 AI</td><td>基准 (极易受限)</td></tr>
    <tr><td><strong>X Premium+</strong></td><td>~$40</td><td>社交高玩 + 捆绑 AI</td><td>~1x 生产力基准</td></tr>
    <tr><td><strong>SuperGrok</strong></td><td>~$30</td><td>纯粹 AI 生产力 (开发者)</td><td>~3x Premium+ 额度</td></tr>
    <tr><td><strong>SuperGrok Plus/Heavy</strong></td><td>$100-$300</td><td>高强度企业自动化</td><td>近乎无限</td></tr>
  </table>
  
  <h3 data-reveal>🔄 “周额度池”与动态节流</h3>
  <p>2026 年中，xAI 废除了以前粗暴的“每 2 小时限制 X 条 prompt”，转而采用 <strong>每周用量池 (Weekly Usage Pool)</strong>。文本生成、Imagine 图像渲染、Build 云端沙箱都会在这个大池子里扣点。且当全网算力紧张时，xAI 会实行“动态节流”——用量大户会被暂时限流。</p>

  <h3 data-reveal>💡 最优榨干技巧</h3>
  <ul>
    <li><strong>开发者请远离 Premium+</strong>：如果您不怎么发 X (Twitter) 也不需要社交账号蓝V认证，<strong>不要买 X Premium+</strong>。花更少的钱 ($30) 订阅纯粹的 <strong>SuperGrok</strong>，您将获得近 3 倍于前者的周额度池，深度支持代码补全与超长调研。</li>
    <li><strong>Think Mode / DeepSearch 的克制使用</strong>：这两项高级能力会大量消耗周额度。对于简单的正则修改或语法排错，请关闭 Think Mode；只有在分析全站架构或阅读未知的第三方 SDK 源码时，才启用 DeepSearch。</li>
    <li><strong>利用 Grok Build 缓存</strong>：在 Grok Build (云端开发者平台) 中，重复执行相同的沙箱环境或安装依赖，不会重复扣除重度算力。保持环境变量的稳定能省下大量开销。</li>
  </ul>
</section>"""

grok_nav_zh = """    <div class="nav-group"><div class="gt">五 · 订阅与额度</div>
      <a href="#ch5-1"><span class="no">5.1</span>X Premium+ vs SuperGrok 额度博弈</a>
    </div>"""

update_file('topics/grok-ecosystem-guide.html', 'ch4-2', grok_zh, 'ch4-2', grok_nav_zh)

grok_en = """<section id="ch5-1">
  <h2>5.1 X Premium+ vs SuperGrok: Quota Mechanics & Maximization</h2>
  <p><span class="tag-badge tag-tip">💰 Subscriptions</span> In 2026, xAI clearly divided consumer and productivity billing tiers. If you heavily rely on Grok for coding, analysis, or running digital agents, choosing the wrong bundle will severely bottleneck your usage.</p>
  
  <h3 data-reveal>📊 Tier Positioning and Quota Pools</h3>
  <table class="tbl">
    <tr><th>Subscription Plan</th><th>Est. Monthly Fee</th><th>Core Positioning</th><th>Relative Weekly Quota</th></tr>
    <tr><td><strong>X Premium</strong></td><td>~$8</td><td>Social + Light AI</td><td>Baseline (Easily capped)</td></tr>
    <tr><td><strong>X Premium+</strong></td><td>~$40</td><td>Social Power User + AI Bundle</td><td>~1x Productivity Baseline</td></tr>
    <tr><td><strong>SuperGrok</strong></td><td>~$30</td><td>Pure AI Productivity (Devs)</td><td>~3x Premium+ Quota</td></tr>
    <tr><td><strong>SuperGrok Plus/Heavy</strong></td><td>$100-$300</td><td>Intense Enterprise Automation</td><td>Virtually Unlimited</td></tr>
  </table>
  
  <h3 data-reveal>🔄 The "Weekly Pool" & Dynamic Throttling</h3>
  <p>Mid-2026, xAI abolished the rigid "X prompts per 2 hours" rule in favor of a <strong>Weekly Usage Pool</strong>. Text generation, Imagine renders, and Build cloud sandboxes all draw from this unified bucket. Additionally, during peak global compute demand, xAI employs "Dynamic Throttling," where heavy users may experience temporary rate limits even on paid tiers.</p>

  <h3 data-reveal>💡 Best Practices to Maximize Value</h3>
  <ul>
    <li><strong>Developers: Avoid Premium+</strong>: If you don't care about X (Twitter) social perks or the blue checkmark, <strong>do not buy X Premium+</strong>. Subscribe to the standalone <strong>SuperGrok</strong> for less money ($30) and receive nearly 3x the weekly quota pool, designed specifically for deep coding and research.</li>
    <li><strong>Use Think Mode / DeepSearch Sparingly</strong>: These advanced features burn through your weekly pool rapidly. For simple regex fixes or syntax debugging, turn Think Mode off. Reserve DeepSearch for analyzing full-stack architectures or unknown third-party SDK source code.</li>
    <li><strong>Leverage Grok Build Caching</strong>: In the Grok Build cloud platform, repeatedly executing the same sandbox environment or installing the same dependencies won't repeatedly drain heavy compute points. Keeping your environments stable saves significant quota.</li>
  </ul>
</section>"""

grok_nav_en = """    <div class="nav-group"><div class="gt">V · Subscriptions & Quotas</div>
      <a href="#ch5-1"><span class="no">5.1</span>X Premium+ vs SuperGrok Quotas</a>
    </div>"""

update_file('topics/grok-ecosystem-guide.en.html', 'ch4-2', grok_en, 'ch4-2', grok_nav_en)
