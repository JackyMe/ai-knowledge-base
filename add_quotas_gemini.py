import os

def update_file(filepath, insert_after_id, html_content, nav_insert_after, nav_html):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # insert content
    # The end of the file is around:
    #      </section>
    #      <div class="footer"
    footer_pattern = '<div class="footer"'
    if footer_pattern in content:
        content = content.replace(footer_pattern, html_content + '\n      ' + footer_pattern)
    else:
        print(f"Failed to find footer in {filepath}")
        return

    # insert nav
    # nav ends with: 
    #    <div class="nav-group"><div class="gt">五 · 工程化扩展</div>
    #      <a href="#ch5-1"><span class="no">5.1</span>Mcp 协议接入本地生态</a>
    #      <a href="#ch5-2"><span class="no">5.2</span>灾难现场回放：反模式</a>
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

gemini_zh = """<section id="ch6-1">
  <h2>6.1 AI Pro/Ultra 额度体系与效能拉满</h2>
  <p><span class="tag-badge tag-tip">💰 订阅策略</span> 自 2026 年中调整后，Google 将原有的“One AI Premium”过渡到了基于算力的分级体系（AI Plus、AI Pro、AI Ultra）。了解这套规则是最大化您订阅价值的基础。</p>
  
  <h3 data-reveal>📊 计算点数 (Compute-Based) 计量法</h3>
  <p>不同于早期的“提问次数”限制，Google 现已采用“算力点数”来衡量配额：</p>
  <ul>
    <li><strong>文本生成与轻度代码辅助</strong>：耗费点数极低，日常几乎无感。</li>
    <li><strong>长上下文 (1M Token) 推理</strong>：每次提交超大代码库或几十本 PDF 时，点数消耗成倍增加。</li>
    <li><strong>视频生成与 Imagen 3 图像渲染</strong>：极高消耗，若反复盲目试错，可能在 1 小时内耗尽当前窗口的配额。</li>
  </ul>
  
  <h3 data-reveal>🔄 5 小时刷新周期与回退机制</h3>
  <p>与 OpenAI 类似，Google 采用 <strong>5 小时滚动刷新</strong> 机制。但它拥有一个优秀的“平滑降级”体验：当您耗尽了当前订阅档位的高级模型 (如 Gemini Advanced / Ultra 档位) 配额时，系统不会完全拒绝服务，而是会<strong>自动平滑回退 (Fallback) 至 Gemini Flash</strong>。此时，您的请求响应会更快，但深度逻辑能力会有所下降。</p>

  <h3 data-reveal>💡 最佳榨干技巧</h3>
  <div class="duo">
    <div class="card">
      <div class="icon">🔍</div>
      <h4>好钢用在 1M 上下文</h4>
      <p>Pro / Ultra 用户最核心的资产是那 1M+ 的上下文窗口。切勿为了省事，每次都将整个工程推给 AI。使用 NotebookLM 或 <code>git ls-files</code> 筛选出真正相关的源文件，压缩输入。越精简的输入，消耗的点数越少，留给重度推理的可用额度就越多。</p>
    </div>
    <div class="card">
      <div class="icon">🎨</div>
      <h4>视觉管线的本地缓冲</h4>
      <p>当您使用 Antigravity 接入 Gemini 生成图片 (Image 3) 或 UI 原型时，不要一句句提需求。应当先用轻量级的 Flash 模型进行多轮头脑风暴，确定最终 Prompt 后，再单次调用高等级模型进行渲染。这能帮您省下 80% 的不必要视觉算力消耗。</p>
    </div>
  </div>
</section>"""

gemini_nav_zh = """    <div class="nav-group"><div class="gt">六 · 订阅与额度</div>
      <a href="#ch6-1"><span class="no">6.1</span>AI Pro/Ultra 额度体系与效能拉满</a>
    </div>"""

update_file('topics/google-ai-ecosystem.html', 'ch5-2', gemini_zh, 'ch5-2', gemini_nav_zh)

gemini_en = """<section id="ch6-1">
  <h2>6.1 AI Pro/Ultra Quotas & Maximization</h2>
  <p><span class="tag-badge tag-tip">💰 Subscriptions</span> After the mid-2026 restructuring, Google transitioned the legacy "One AI Premium" into a compute-based tiered system (AI Plus, AI Pro, AI Ultra). Understanding this framework is foundational to maximizing your subscription value.</p>
  
  <h3 data-reveal>📊 Compute-Based Metering</h3>
  <p>Unlike early "prompt count" limits, Google now uses a "Compute Point" system:</p>
  <ul>
    <li><strong>Text Gen & Light Coding</strong>: Consumes very few points; nearly imperceptible for daily usage.</li>
    <li><strong>Long Context (1M Token) Reasoning</strong>: Submitting massive codebases or dozens of PDFs multiplies point consumption significantly per turn.</li>
    <li><strong>Video Gen & Imagen 3 Rendering</strong>: Extremely high consumption. Blindly iterating here can drain your quota window in under an hour.</li>
  </ul>
  
  <h3 data-reveal>🔄 5-Hour Refresh & Fallback Mechanics</h3>
  <p>Like OpenAI, Google employs a <strong>5-hour rolling refresh</strong> window. However, it features excellent graceful degradation: when you exhaust your high-tier model quota (e.g., Gemini Advanced / Ultra), the system doesn't cut you off completely. Instead, it <strong>automatically falls back to Gemini Flash</strong>. You'll experience much faster responses, albeit with slightly reduced deep logical reasoning.</p>

  <h3 data-reveal>💡 Best Practices to Maximize Quota</h3>
  <div class="duo">
    <div class="card">
      <div class="icon">🔍</div>
      <h4>Optimize the 1M Context</h4>
      <p>The 1M+ context window is the core asset of Pro/Ultra users. Avoid lazily dumping your entire repo into the prompt every time. Use NotebookLM or <code>git ls-files</code> to filter for strictly relevant source files. Leaner inputs consume drastically fewer compute points, saving your quota for heavy logic.</p>
    </div>
    <div class="card">
      <div class="icon">🎨</div>
      <h4>Buffer Visual Pipelines</h4>
      <p>When using Antigravity and Gemini to generate images (Imagen 3) or UI prototypes, do not feed incremental, single-sentence tweaks to the high-tier model. Brainstorm and iterate with the lightweight Flash model first. Once the final comprehensive prompt is nailed down, invoke the top-tier model for the render. This saves ~80% of unnecessary visual compute spend.</p>
    </div>
  </div>
</section>"""

gemini_nav_en = """    <div class="nav-group"><div class="gt">VI · Subscriptions & Quotas</div>
      <a href="#ch6-1"><span class="no">6.1</span>AI Pro/Ultra Quota System & Maximization</a>
    </div>"""

update_file('topics/google-ai-ecosystem.en.html', 'ch5-2', gemini_en, 'ch5-2', gemini_nav_en)
