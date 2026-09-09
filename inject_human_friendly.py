import re

def rewrite_section(filepath, start_marker, end_marker, new_content):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    pattern = re.compile(rf'{start_marker}.*?{end_marker}', re.DOTALL)
    if pattern.search(content):
        new_text = pattern.sub(new_content + f'\n\n{end_marker}', content)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_text)
        print(f"Successfully injected human-friendly content into {filepath}")
    else:
        print(f"Failed to find injection point in {filepath}")

# ==============================================================================
# OPENAI / CODEX (codex-guide.html & .en.html)
# ==============================================================================

codex_zh = """<section id="subscription-quotas">
<div class="sec-tag">额度指南</div>
<h2>会员额度怎么用最划算？(小白与新手必读)</h2>

<p>很多朋友每个月花了 20 美元（甚至更多）订阅了 ChatGPT Plus 或 Pro 会员，但在使用 Codex 辅助写代码时，经常遇到“由于请求过多，请几小时后再试”的提示。其实，只要掌握几个简单的日常使用习惯，就能轻松避开这些限制，把会员的每一分钱都花在刀刃上。</p>

<h3 data-reveal>🔋 1. 了解你的“体力槽”：额度是怎么消耗的？</h3>
<p>您可以把会员额度想象成一个“体力槽”。通常情况下，体力槽每 5 个小时会回满一次。但是不同的操作，消耗的体力完全不同：</p>
<ul>
  <li><strong>最耗体力：</strong>让 Codex 一次性读取几百个代码文件，或者在网页端上传十几张高清大图让它分析。</li>
  <li><strong>最省体力：</strong>普通的文字聊天、问答，或者只让 Codex 修改一两个小文件。</li>
</ul>
<div class="callout warn"><b class="t">注意</b>
网页版 ChatGPT、手机版 App 和电脑上的 Codex 终端，它们是<strong>共用同一个体力槽</strong>的！如果你白天在网页版画了一堆图，晚上用 Codex 写代码时可能就会提示额度不够。</div>

<h3 data-reveal>💡 2. 普通人也能掌握的 3 个省额度神技</h3>

<h4>技巧一：“动嘴”和“动手”分开</h4>
<p>当您想学习一个新技术，或者遇到一个复杂的报错完全没头绪时，<strong>千万不要直接在 Codex 里反反复复地问</strong>。每次在 Codex 里提问，它都会默默带上您的代码环境，非常浪费体力。</p>
<ul>
  <li><strong>正确做法：</strong>打开 ChatGPT <strong>网页版</strong>，把报错信息复制进去问。在网页版里和 AI 慢慢探讨、理清思路。等 AI 在网页上给出了明确的代码修改方案，您再回到 Codex 里，对它说：“按照这个方案，帮我把代码改好。”</li>
</ul>

<h4>技巧二：大炮不要用来打蚊子（善用小模型）</h4>
<p>ChatGPT 里有最聪明的旗舰模型，也有速度极快、几乎不限流的“小模型”（比如 mini 版或快速版）。</p>
<ul>
  <li>当你只是想改个错别字、加几行代码注释，或者调整一下按钮颜色时，在界面上<strong>手动切换到小模型</strong>。</li>
  <li>只有当你遇到真正的逻辑难题，比如“帮我设计一个完整的登录注册流程”时，再切回最强大的模型。</li>
</ul>

<h4>技巧三：整理好资料再喂给 AI</h4>
<p>AI 阅读长文章很费力。如果你有一份长达 100 页的接口说明书，不要每次提问都发给它。最好是在网页版的 <strong>Projects（工作区）</strong>里创建一个项目，把这份长文档传进去。在工作区里，AI 会把文档“记”在脑子里，提问时就不会重复扣除大量的阅读额度了。</p>
</section>"""

codex_en = """<section id="subscription-quotas">
<div class="sec-tag">Quota Guide</div>
<h2>How to Maximize Your Membership Quota (A Guide for Everyday Users)</h2>

<p>Many users spend $20 (or more) a month on a ChatGPT Plus or Pro subscription, only to hit the dreaded "You've reached your limit, please try again in a few hours" message when using Codex to code. The truth is, by adopting a few simple everyday habits, you can easily avoid these limits and get every penny's worth out of your membership.</p>

<h3 data-reveal>🔋 1. Understand Your "Stamina Bar"</h3>
<p>Think of your membership quota as a "Stamina Bar." Typically, this bar refills every 5 hours. However, different tasks drain stamina at entirely different rates:</p>
<ul>
  <li><strong>High Drain:</strong> Asking Codex to read hundreds of code files at once, or uploading dozens of high-res images on the web version for analysis.</li>
  <li><strong>Low Drain:</strong> Regular text chatting, asking simple questions, or having Codex edit just one or two small files.</li>
</ul>
<div class="callout warn"><b class="t">Heads Up!</b>
The ChatGPT website, mobile app, and Codex terminal on your computer <strong>all share the same stamina bar!</strong> If you spend the morning generating a bunch of images on the web, you might find yourself out of quota when you try to code with Codex that night.</div>

<h3 data-reveal>💡 2. Three Simple Tricks to Save Quota</h3>

<h4>Trick 1: Separate "Brainstorming" from "Typing"</h4>
<p>When you want to learn a new concept or are stuck on a confusing error, <strong>don't interrogate Codex over and over again.</strong> Every time you ask a question in Codex, it silently attaches your project background, which wastes a lot of stamina.</p>
<ul>
  <li><strong>The Right Way:</strong> Open the ChatGPT <strong>Web version</strong>. Paste your error there. Brainstorm and figure out the logic with the AI on the web. Once the AI gives you a clear solution, go back to Codex and say: "Apply this exact fix to my code."</li>
</ul>

<h4>Trick 2: Don't Use a Sledgehammer to Crack a Nut (Use Small Models)</h4>
<p>ChatGPT offers the smartest flagship models, but also lightning-fast, nearly unlimited "small models" (like the 'mini' or fast versions).</p>
<ul>
  <li>When you just need to fix a typo, add a few comments, or change a button color, <strong>manually switch to the smaller model</strong> in the menu.</li>
  <li>Only switch back to the most powerful model when facing real logical challenges, like "design a complete login and registration flow for me."</li>
</ul>

<h4>Trick 3: Organize Your Notes First</h4>
<p>Reading long documents takes a lot of AI stamina. If you have a 100-page API manual, don't upload it every single time you ask a question. Instead, create a <strong>Project</strong> on the Web version and upload the long document there. In a Project, the AI "memorizes" the document, so it won't repeatedly drain your reading quota every time you chat.</p>
</section>"""


# ==============================================================================
# CLAUDE (claude-code-guide.html & .en.html)
# ==============================================================================

claude_zh = """<section id="subscription-quotas">
<div class="sec-tag">额度指南</div>
<h2>Pro 会员该怎么用？最实用的日常避坑指南</h2>

<p>很多刚买了 Claude Pro（20美元/月）的朋友，在使用 Claude Code 辅助写代码时会觉得额度掉得特别快。其实这是因为 Claude 的“记性”特别好，但“记性好”也是要消耗大量额度的。只要掌握以下几个最基本的使用习惯，您的额度绝对够用。</p>

<h3 data-reveal>🧠 1. 为什么我的额度一会儿就没了？</h3>
<p>想象一下，你每问 Claude 一个问题，它不仅会看你当前打的字，还会把你之前问过的所有问题、它回答过的所有代码，都从头到尾再看一遍。</p>
<ul>
  <li>如果你在一个长对话里和它聊了 50 句，当你发第 51 句时，它其实是在重新阅读前面 50 句的所有内容。</li>
  <li><strong>这就导致对话越长，每一次提问消耗的额度就越夸张！</strong></li>
</ul>

<h3 data-reveal>🧹 2. 核心省钱秘籍：勤清理、多重启</h3>

<h4>绝招一：用完就清理 (使用 /compact)</h4>
<p>当 Claude 成功帮你解决了一个 Bug，或者写完了一个小功能后，不要继续在这个对话里接着聊下一个毫不相关的话题。</p>
<ul>
  <li>您可以输入一个魔法指令：<code>/compact</code>。</li>
  <li>这个指令的意思是：“Claude，把刚才这长篇大论总结成一小段笔记记住就好，其他的废话全删掉吧。”这能瞬间帮您省下海量额度。</li>
</ul>

<h4>绝招二：巧用网页版的 Artifacts (预览窗口)</h4>
<p>网页版 Claude 有一个超赞的右侧窗口叫 Artifacts，它可以直接预览网页、小游戏或图表。<br>
<strong>最佳搭配：</strong>如果您想做一个网页界面，先在网页版里让它写，并直接在右侧看效果。哪里不满意直接让它改，因为网页版的额度相对宽松。等网页版里调试得十全十美了，再把代码复制到本地工程里。千万不要一开始就在本地终端里盲人摸象般地反复修改界面。</p>

<h4>绝招三：网页版 Projects (工作区) 放长文档</h4>
<p>如果你有大段大段的背景资料（比如一本几百页的技术书，或者长长的需求文档），不要每次都在对话里发给它。去网页版的 <strong>Projects</strong> 里面新建一个项目，把这些大文件当成“参考书”上传进去。这样它就能以极低的消耗随时翻阅，不会乱扣您的提问额度。</p>

</section>"""

claude_en = """<section id="subscription-quotas">
<div class="sec-tag">Quota Guide</div>
<h2>How to Use Pro Wisely? Practical Everyday Tips</h2>

<p>Many new Claude Pro subscribers ($20/month) feel their quota drains incredibly fast when using Claude Code. This is because Claude has an amazing "memory"—but remembering everything costs a lot of quota. Master these basic habits, and your quota will last significantly longer.</p>

<h3 data-reveal>🧠 1. Why Does My Quota Disappear So Fast?</h3>
<p>Imagine that every time you ask Claude a question, it doesn't just read your current message; it re-reads every single question you've ever asked and every line of code it has ever written in that chat, from start to finish.</p>
<ul>
  <li>If you chat with it for 50 messages, when you send the 51st message, it is essentially re-reading the entire 50-message history.</li>
  <li><strong>This means the longer a conversation goes on, the more exaggerated the quota cost becomes for every single prompt!</strong></li>
</ul>

<h3 data-reveal>🧹 2. Core Money-Saving Secrets: Clean Often, Restart Often</h3>

<h4>Trick 1: Clean Up When Done (Use /compact)</h4>
<p>Once Claude successfully fixes a bug for you, or finishes a small feature, do not continue discussing a completely unrelated topic in the same chat.</p>
<ul>
  <li>Type this magic command: <code>/compact</code>.</li>
  <li>This command tells Claude: "Summarize this long conversation into a tiny notebook, and forget all the useless rambling." This instantly saves you a massive amount of quota.</li>
</ul>

<h4>Trick 2: Leverage Web Artifacts (Preview Window)</h4>
<p>The Web version of Claude has an amazing right-side panel called Artifacts, which can directly preview websites, mini-games, or charts.<br>
<strong>Best Combo:</strong> If you want to build a web interface, have Claude write it on the Web version first and look at the preview directly. Tweak it there until you're happy, because web limits are more forgiving. Once it's perfect, copy the code into your local project. Never blindly tweak visual UI layouts over and over in your local terminal.</p>

<h4>Trick 3: Use Web Projects for Long Documents</h4>
<p>If you have massive background materials (like a 100-page tech manual or long product requirements), don't send them in the chat over and over. Go to the <strong>Projects</strong> tab on the Web version, create a new project, and upload these large files as "reference books." Claude can read them efficiently without burning through your standard chat quota.</p>

</section>"""


# ==============================================================================
# GEMINI (google-ai-ecosystem.html & .en.html)
# ==============================================================================

gemini_zh = """<section id="ch6-1">
  <h2>6.1 怎么玩转 AI Pro/Ultra？新手必看的全家桶指南</h2>
  <p><span class="tag-badge tag-tip">日常指南</span> Google 的 AI 会员（AI Plus、Pro、Ultra）就像一个装满工具的超级瑞士军刀。很多普通用户只把它当成一个“能联网聊天的对话框”，这其实非常亏。只要用对方法，无论是工作、学习还是写代码，它都能帮你省下大量时间和额度。</p>

  <h3 data-reveal>💡 1. 黄金搭档：大文档必须配 NotebookLM</h3>
  <p>如果你手里有一本几百页的 PDF、大量的财务报表，或者一整个文件夹的代码源码，<strong>千万不要直接扔进普通的对话框里让 AI 读</strong>。不仅读得慢，还很容易耗尽你今天的额度。</p>
  <ul>
    <li><strong>最聪明的方法：</strong>打开 Google 免费且强大的 <strong>NotebookLM</strong>。把所有的长文档、压缩包全扔进去。它就像一个你的专属私人图书管理员。</li>
    <li>你可以直接问它：“帮我总结一下这里面的重点，整理成一份简短的提纲。”</li>
    <li>拿到简短提纲后，你再发给普通的 Gemini 终端去处理，这样既快又准，还不用担心额度被长文件吃光。</li>
  </ul>

  <h3 data-reveal>📝 2. 打通 Google 办公文档 (Docs/Drive)</h3>
  <p>买了高级会员后，最爽的功能之一就是 AI 和你的 Google Docs（文档）以及 Google Drive（云端硬盘）是打通的。</p>
  <ul>
    <li>当你在终端里写代码，或者在策划一个方案时，不需要把需求复制粘贴过来。</li>
    <li>直接告诉它：“去我的 Google Docs 里找那篇叫做《下半年产品需求》的文档，按照里面的要求帮我写。”</li>
    <li>AI 会自己去看文档并生成结果。由于是生态内联动，这种操作非常顺滑，并且不占用你常规的输入字符限制。</li>
  </ul>

  <h3 data-reveal>🎨 3. 画图与写代码分开做</h3>
  <p>AI 的网页版不仅能聊天，还能用极高质量的模型（Imagen 3）画图。</p>
  <ul>
    <li>如果你想开发一个小程序或者网页，最好先在网页版里对它说：“帮我画一张健身 App 首页的设计图。”</li>
    <li>看着不满意就让它重画，一直画到满意为止（网页版的画图功能非常大方）。</li>
    <li>满意之后，你再拿着这张图对 AI 说：“请根据这张图的样式，帮我写出网页代码。”这就避免了一开始就让 AI 盲猜代码样式带来的麻烦。</li>
  </ul>
</section>"""

gemini_en = """<section id="ch6-1">
  <h2>6.1 Mastering AI Pro/Ultra: The Everyday User's Guide</h2>
  <p><span class="tag-badge tag-tip">Everyday Guide</span> Google's AI memberships (AI Plus, Pro, Ultra) are like a supercharged Swiss Army knife. Many everyday users just treat it as a "chatbox connected to the internet," which is a huge waste. Used correctly, it can save you massive amounts of time and quota, whether for work, study, or coding.</p>

  <h3 data-reveal>💡 1. The Golden Rule: Big Documents Belong in NotebookLM</h3>
  <p>If you have a 300-page PDF, massive financial spreadsheets, or a whole folder of source code, <strong>never dump it straight into a normal chat window.</strong> It reads slowly and easily eats up your daily quota.</p>
  <ul>
    <li><strong>The Smart Way:</strong> Open Google's free and powerful <strong>NotebookLM</strong>. Toss all your long documents and zip files in there. It acts as your personal librarian.</li>
    <li>Ask it directly: "Summarize the key points in these files into a short outline."</li>
    <li>Take that short outline and feed it to your regular Gemini chat. It’s fast, accurate, and completely protects your quota from being swallowed by long documents.</li>
  </ul>

  <h3 data-reveal>📝 2. Connect Your Google Workspace (Docs/Drive)</h3>
  <p>One of the best perks of a premium membership is that the AI is fully integrated with your Google Docs and Google Drive.</p>
  <ul>
    <li>When you are coding or planning a project, you don't need to copy and paste your requirements.</li>
    <li>Just tell it: "Go to my Google Drive, find the doc named 'Q4 Product Requirements', and write the code based on that."</li>
    <li>The AI will read the document directly. Because it's an internal ecosystem feature, it is incredibly smooth and bypasses typical text input limits.</li>
  </ul>

  <h3 data-reveal>🎨 3. Separate Drawing from Coding</h3>
  <p>The Web version of the AI isn't just for chatting; it can also generate extremely high-quality images (via Imagen 3).</p>
  <ul>
    <li>If you want to build a mini-app or website, first ask it on the Web: "Draw a UI design for a fitness app homepage."</li>
    <li>If you don't like it, ask it to redraw until it's perfect (image generation limits on the Web are very generous).</li>
    <li>Once satisfied, give that image to the AI and say: "Now, write the web code to match this exact design." This avoids the headache of making the AI blindly guess how you want your app to look.</li>
  </ul>
</section>"""


# ==============================================================================
# GROK (grok-ecosystem-guide.html & .en.html)
# ==============================================================================

grok_zh = """<section id="ch5-1">
  <h2>5.1 玩转 Grok 会员：如何把钱花在刀刃上？</h2>
  <p><span class="tag-badge tag-tip">新手必读</span> 目前很多人犹豫要不要买 X 平台上的会员，或者买了之后不知道怎么用最划算。实际上，Grok 最强大的地方不在于“和它闲聊”，而在于它能实时连接到推特 (X) 巨大的真实信息库。掌握以下几个简单习惯，能让你彻底玩转它。</p>
  
  <h3 data-reveal>📊 1. 买哪个套餐最适合我？</h3>
  <p>简单来说，选套餐千万别盲目选最贵的：</p>
  <ul>
    <li><strong>如果您平时爱刷推特，只是想偶尔用用 AI</strong>：选择 <strong>X Premium / Premium+</strong>。这主要是给你的推特账号加个“蓝V”，发帖有流量扶持，顺便送你一些基本的 Grok 聊天额度。</li>
    <li><strong>如果您主要是为了工作、写代码、搞研究</strong>：强烈建议直接购买纯净版的 <strong>SuperGrok</strong>。它的价格适中，但给你的 AI 提问额度大得多，而且不容易卡顿，是干正事的不二之选。</li>
  </ul>

  <h3 data-reveal>🚀 2. 最强绝招：让它帮你“全网找解法”</h3>
  <p>在使用其他 AI 时，如果某个软件昨天刚发布了一个更新，今天你遇到了报错，其他 AI 是回答不上来的，因为它们还没“学习”到最新的知识。但 Grok 可以！</p>
  <ul>
    <li>**正确姿势**：去网页版的 Grok，开启实时联网模式，直接对它说：“去 X (推特) 上搜一下，看看今天有没有其他程序员也遇到了 `XXX报错`，他们是怎么解决的？”</li>
    <li>Grok 会瞬间去推特上翻找全球网友刚刚发出的牢骚和解决办法，然后总结给你。这就是它最无可替代的价值！</li>
  </ul>

  <h3 data-reveal>🕵️ 3. 谨慎使用深度搜索 (DeepSearch)</h3>
  <p>Grok 提供了一个听起来很厉害的功能叫 <strong>DeepSearch（深度搜索）</strong>。但是注意，它非常的“耗电”！</p>
  <ul>
    <li>如果您只是想问“今天天气怎么样”或者“解释一下什么是 API”，千万不要打开它，这会迅速消耗你这周的会员额度。</li>
    <li>**什么时候用最好？** 当你在做一个大决定，比如“帮我对比一下 2026 年市面上所有电动车的优缺点并写一份 3000 字的购买建议”时。打开 DeepSearch，它会去全网翻找最新的评测文章、口碑评价，然后给你一份惊艳的深度报告。</li>
  </ul>
</section>"""

grok_en = """<section id="ch5-1">
  <h2>5.1 Mastering Grok: Getting the Most Bang for Your Buck</h2>
  <p><span class="tag-badge tag-tip">Everyday Guide</span> Many people hesitate to buy an X membership, or once they do, they don't know how to get the most value out of it. The truth is, Grok's greatest strength isn't just "casual chatting"; it's its real-time connection to X (Twitter)'s massive database of human conversations. Master these simple habits to truly master Grok.</p>
  
  <h3 data-reveal>📊 1. Which Plan is Right for Me?</h3>
  <p>Simply put, don't just blindly buy the most expensive tier:</p>
  <ul>
    <li><strong>If you love scrolling X and just want casual AI access:</strong> Choose <strong>X Premium / Premium+</strong>. This is mostly about getting the "Blue Checkmark" and algorithm boosts for your posts, with some basic Grok chat access thrown in as a bonus.</li>
    <li><strong>If you are here to work, code, or research:</strong> We strongly recommend the standalone <strong>SuperGrok</strong> plan. It’s reasonably priced, gives you a vastly larger AI usage quota, and rarely slows down. It is the definitive choice for getting real work done.</li>
  </ul>

  <h3 data-reveal>🚀 2. The Ultimate Trick: Ask It to "Search the World"</h3>
  <p>When using other AIs, if a software released a new update yesterday and you encounter an error today, the AI will likely have no idea what you're talking about because it hasn't "studied" yesterday's news yet. Grok is different!</p>
  <ul>
    <li>**The Best Approach**: Go to the Grok Web version, enable real-time search, and tell it: "Search X to see if any other programmers encountered the `XXX Error` today, and tell me how they fixed it."</li>
    <li>Grok will instantly scour X for complaints and workarounds posted by real people just minutes ago, summarizing the solution for you. This is its most irreplaceable, unique value!</li>
  </ul>

  <h3 data-reveal>🕵️ 3. Use DeepSearch Carefully</h3>
  <p>Grok offers an incredibly powerful feature called <strong>DeepSearch</strong>. However, be warned: it uses up a lot of "battery" (quota)!</p>
  <ul>
    <li>If you're just asking "What's the weather?" or "Explain what an API is," do not turn DeepSearch on. It will rapidly consume your weekly membership quota.</li>
    <li>**When is the best time to use it?** When you are making a big decision, like: "Compare all the electric cars available in 2026 and write a 3,000-word buying guide." Turn on DeepSearch, and it will scour the web for the latest reviews, consumer sentiments, and specs, delivering a stunningly detailed report.</li>
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

