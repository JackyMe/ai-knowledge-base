import sys

def inject_content(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    new_section = """
<!-- ================= SECTION BEST PRACTICES ================= -->
<section id="best-practices">
<div class="sec-tag">进阶 09</div>
<h2>最佳实践与最优示例库 (Best Practices & Optimal Examples)</h2>
<p>为确保您能将 Codex 发挥到极致，我们整理了全网公认的最佳使用技巧、标准命令组合以及最不易出错的 Prompt 模板，便于任何人直接复制学习。</p>

<h3 data-reveal>一、最强 Prompt 模板：TDD 零幻觉格式</h3>
<p>这是在真实企业级项目中胜率最高的任务下达模板，它通过强制约束条件和验收标准，让模型无法“自由发挥”：</p>
<pre><code>&gt; 【目标】为 src/auth/jwt.ts 增加 Refresh Token 滑动窗口续期逻辑。
  【上下文】请阅读 docs/auth-flow.md 和当前的 jwt.ts 代码。
  【约束】
  1. 只能修改 jwt.ts 和对应的测试文件，不可碰 routes 模块。
  2. 保持现有的 HMAC-SHA256 签名算法不变，不要引入新的 npm 库。
  3. 注意并发下的锁机制，避免同一 Token 被重复刷新。
  【验收】
  先在 tests/auth/jwt.test.ts 写 3 个测试用例（包括并发刷新测试）。
  执行测试，直到看到全绿通过。最后做一次 /diff 给我看。</code></pre>

<h3 data-reveal>二、四大高阶场景与“绝杀”命令组合</h3>
<table class="tbl">
  <tr><th>场景</th><th>最佳命令串与操作姿势</th><th>为什么最优？</th></tr>
  <tr>
    <td><strong>1. 大幅重构前的“安全快照”</strong></td>
    <td><code>git add . && git commit -m "WIP" && codex exec fork</code></td>
    <td>利用 0.148.0 的无头分叉能力。把主会话留作安全锚点，分叉出新会话去做危险的重构。失败了直接废弃分支会话，主干不受任何污染。</td>
  </tr>
  <tr>
    <td><strong>2. CI/CD 无人值守自动化</strong></td>
    <td><code>codex exec --sandbox workspace-write --approve-for-me "按 .github/ISSUE_TEMPLATE 修复 lint 问题"</code></td>
    <td>彻底剥离交互。<code>--approve-for-me</code> 允许它在设定的沙箱范围内自动放行安全命令，无需人工盯着回车。</td>
  </tr>
  <tr>
    <td><strong>3. 处理超长 Log 与报错</strong></td>
    <td><code>npm run build > build-error.log</code> <br> 然后在 Codex 中输入：<code>读取 build-error.log 并修复报错</code></td>
    <td><strong>绝不要直接把几万行的报错粘贴到终端对话框里！</strong>这会瞬间耗尽上下文 Token，引发模型遗忘。重定向到文件让它自己读取，消耗极低且精准。</td>
  </tr>
  <tr>
    <td><strong>4. 知识沉淀与团队分享</strong></td>
    <td>在任务圆满完成后输入：<code>/export</code></td>
    <td>将刚才极其精彩的排错或推理过程一键导出为纯 Markdown 文件，直接扔进飞书/Notion 当团队 wiki，连贯且带代码块。</td>
  </tr>
</table>

<h3 data-reveal>三、代码库“冷启动”最佳示例 (Onboarding)</h3>
<p>接手祖传代码或者全新的庞大项目时，使用以下连续技（Combo），让 Codex 帮你快速建立大脑索引：</p>
<ol class="steps">
  <li><strong>全局扫描并生成地图</strong>：输入 <code>分析整个 src/ 目录，总结其架构模式并写一份高层面的 ARCHITECTURE.md</code>。</li>
  <li><strong>建立防御性护栏</strong>：接着输入 <code>基于你的分析，生成一份极其严格的 AGENTS.md（包含本项目禁止做的事、特定的代码风格规范），供后续 AI 会话遵守</code>。</li>
  <li><strong>一键清理噪音</strong>：输入 <code>/compact</code>。将刚刚漫长的代码阅读过程压缩成摘要记忆，为接下来真正的功能开发腾出 Token 空间。</li>
</ol>
</section>

<div class="divider"></div>
"""

    # Insert before <section id="plays"> which contains "<h2>实战场景手册与端到端流水线</h2>"
    # Actually wait, let's find the Exact tag for 실전.
    # It might be <section id="plays"> or something else.
    # Let's replace '<h2>实战场景手册与端到端流水线</h2>' by inserting our block right before it.
    
    parts = content.split('<h2>实战场景手册与端到端流水线</h2>')
    if len(parts) == 2:
        # Find the <section id="..."> preceding it
        pre_split = parts[0].rfind('<section')
        if pre_split != -1:
            final_content = parts[0][:pre_split] + new_section + parts[0][pre_split:] + '<h2>实战场景手册与端到端流水线</h2>' + parts[1]
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(final_content)
            print(f"Successfully updated {filepath}")
        else:
            print("Could not find section start.")
    else:
        print("Could not find split string.")

inject_content("topics/codex-guide.html")
