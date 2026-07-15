# 交接任务书:Android Crash & ANR × AI 提效 主题页

> 给接手的 AI/开发者:按本文档补完 `topics/android-crash-anr.html`,零上下文即可开工。
> 定位:小白到大神渐进式、超清晰、全干货的 Android 稳定性完整指引 + AI 提效实战。

## 一、当前状态(已完成)

- `topics/android-crash-anr.html` 已创建:完整页面骨架(统一模板:topbar/#prog/侧栏+#sideFilter/hero/stats/footer,引用 `../assets/css/site.css` 与 `../assets/js/site.js`,分页交互自动生效)
- 侧栏已列好全部 12 章导航(锚点已定):00 overview / 01 read-crash / 02 crash-catalog / 03 anr / 04 native / 05 toolbox / 06 consoles / 07 device-data / 08 detective / 09 ai-method / 10 ai-workflow / 11 governance
- **第 00、01 章内容已写完**(全景地图+五步方法论;读懂堆栈+复现三板斧)
- 剩余章节的插入点:文件中的 `<!--MORE-->` 注释处(替换它,追加 02–11 章)
- **尚未注册到首页**(topics.js),防止半成品上线——最后一步才注册

## 二、写作规范(必须遵守)

1. 每章结构:`<section id="锚点"><div class="sec-tag">分组 NN</div><h2>标题</h2>…</section>`,章间加 `<div class="divider"></div>`;分组名与侧栏一致(进阶/武器库/大神)
2. 可用组件类(参考已完成两章的用法):`.tbl` 表格、`.callout note|tip|warn`、`.steps` 步骤、`.plays/.play` 场景卡、`.duo` 好坏对比、`pre>code`(注释用 `<span class="c">`)、`.pill a|b|c|d`
3. 内容要求:中文、干货密度高、**全部自己组织表述**(禁止整段搬运任何站点文字),每章末尾 `<p class="src">` 附来源链接;命令/API/阈值必须准确
4. 面向进阶:每类问题按"产生原因 → 如何排查 → 如何根治 → 如何预防"组织

## 三、已核实的关键事实(直接用,含来源)

- Play Vitals 坏行为阈值:用户感知崩溃率 **≥1.09%**、ANR 率 **≥0.47%**(全设备),单机型均 **≥8%**;超线即降权/挂警告。来源:developer.android.com/topic/performance/vitals/crash 与 /anr、support.google.com/googleplay/android-developer/answer/9844486
- ANR 触发阈值(AOSP 稳定值):输入事件 **5s**;前台广播 **10s**/后台 **60s**;前台服务 **20s**/后台 **200s**;ContentProvider publish 超时
- Crashlytics 官方 AI:控制台内 **Gemini AI insights**(摘要/根因/调试建议);**官方 Crashlytics MCP 工具**可接 Claude Code/Gemini CLI/Cursor,能拉取 issue、事件数、堆栈、版本分布。来源:firebase.google.com/docs/crashlytics/ai-assistance、/ai-assistance-mcp、firebase.blog/posts/2025/11/crashlytics-mcp-with-gemini-cli
- Firebase 官方 MCP server 在 firebase-tools 内(`firebase mcp`);社区另有 mcp-crashlytics-server(BigQuery 版,github.com/tjdam007/mcp-crashlytics-server)
- 退出原因 API:`ActivityManager.getHistoricalProcessExitReasons()`(API 30+,ApplicationExitInfo:REASON_ANR/CRASH/CRASH_NATIVE/LOW_MEMORY/USER_REQUESTED…)

## 四、剩余章节大纲(02–11,逐章任务)

### 02 常见 Crash 图鉴与根治(id=crash-catalog,分组"进阶 02")
- 大表格图鉴,每行:异常类型 / 典型消息 / 产生原因 / 排查手段 / 根治方案。至少覆盖:
  NPE(含 Kotlin platform type 陷阱)、IndexOutOfBounds、ClassCastException、IllegalStateException(Fragment not attached / commit after onSaveInstanceState / RecyclerView inconsistency)、IllegalArgumentException(Activity has leaked window / receiver not registered)、ConcurrentModificationException、ClassNotFoundException/NoSuchMethodError(混淆/多 dex/依赖冲突)、ActivityNotFoundException、SecurityException(权限/exported)、TransactionTooLargeException、OutOfMemoryError(Java 堆/线程数/fd 耗尽三种)、CursorWindow、SQLite 异常、BadTokenException(Toast/Dialog 在已销毁窗口)、Resources.NotFoundException(资源缩水/换肤)、UndeliverableException(RxJava)、CancellationException/协程异常(SupervisorJob、CoroutineExceptionHandler)
- 生命周期类崩溃专小节:进程重建(savedInstanceState)、异步回调打到已销毁页面 → 根治模式(生命周期感知、viewLifecycleOwner、弱引用错误示范)
- callout:三条通用预防线(Kotlin 空安全边界收紧 / lint 自定义规则 / CI 强制)

### 03 ANR 深入(id=anr,分组"进阶 03")
- 阈值表(见"已核实事实")+ ANR 分类:输入超时/广播/服务/Provider
- 常见根因清单:主线程 IO(SharedPreferences.commit/apply 陷阱要讲清 apply 也可能 ANR 于 QueuedWork)、主线程网络/序列化、锁竞争与死锁、binder 同步调用阻塞(跨进程)、主线程等锁被后台线程持有、广播 onReceive 干重活、密集布局/measure 风暴、GC 抖动
- 如何读 ANR trace:找 "main" 线程状态(Blocked/Waiting/Native)、held mutexes、"waiting to lock <0x…> held by thread N" 追锁链、Binder 线程栈;示例 trace 片段(自己构造示意)
- 根治模式:IO/序列化下移、锁粒度、StrictMode 提前暴露(penaltyDeath 于 debug)、ANR-Watchdog 类方案的利弊
- 来源:developer.android.com/topic/performance/vitals/anr、…/anr-keys(ANR cluster keys)

### 04 Native Crash(id=native,分组"进阶 04")
- 信号速查表:SIGSEGV(空指针/野指针/越界)、SIGABRT(assert/abort/FORTIFY/CHECK 失败,含 Java 层 abort 转发)、SIGILL、SIGBUS、SIGFPE
- tombstone 解剖:abort message、signal+fault addr、backtrace、寄存器、memory map 怎么读;fault addr 0x0 vs 随机值 vs 接近栈顶的含义
- 符号化三件套:`ndk-stack -sym obj/local/arm64-v8a -dump tombstone.txt`、`llvm-addr2line -Cfe libfoo.so 0x1234`、Crashlytics 上传 native 符号(firebase crashlytics:symbols:upload)
- 检测工具:ASan/HWASan(debug 构建)、GWP-ASan(线上采样)、MTE(新设备)
- 来源:developer.android.com/ndk/guides/debug、source.android.com tombstone 文档

### 05 工具箱与用法(id=toolbox,分组"武器库 05")
- 一张"什么问题用什么工具"的路由表 + 每个工具:何时用/关键命令/一个技巧:
  logcat(-b crash、--pid、-v threadtime)、adb bugreport、Android Studio Profiler(CPU/Memory/Energy)、Perfetto/systrace(抓卡顿与 ANR 前主线程时间线,给出抓取命令 `adb shell perfetto …` 与 ui.perfetto.dev)、StrictMode(线程/VM 策略代码示例)、LeakCanary(原理一句话:弱引用+GC 后未回收即 dump)、MAT/Memory Profiler 读 hprof(支配树找 retained heap)、ApplicationExitInfo 代码示例(开机自检上报历史退出原因)、Compose Layout Inspector/重组计数(Compose 场景)、asan/hwasan(链接 04)
- callout:工具选择心法——"先证据后工具,别拿着锤子找钉子"

### 06 Play Console 与 Firebase 后台(id=consoles,分组"武器库 06")
- Android Vitals:核心指标定义(用户感知口径的含义:前台可感知)、阈值、按 App 版本/OS/机型/国家切分找规律、崩溃聚类与"相似崩溃"、与 Crashlytics 数据口径差异(采集时机/去重逻辑不同,数字对不上是正常的——要讲!)
- Crashlytics 实战:接入要点、**自定义 keys/logs/userId**(把"复现上下文"塞进每条报告——这是后面 AI 章的原料)、非致命异常(recordException)的正确用法与滥用风险、Velocity alert(激增告警)、BigQuery 导出做自定义分析、版本采用率结合崩溃率看灰度
- Gemini AI insights:控制台里一键根因摘要与调试建议(链接文档)
- 来源:上面"已核实事实"里的链接 + firebase.google.com/docs/crashlytics/customize-crash-reports

### 07 测试机数据导出(id=device-data,分组"武器库 07")
- `adb bugreport bugreport.zip` 内容地图:anr/、tombstones/、logcat、dumpsys 全家桶;FS/data/anr 无 root 拿法就是 bugreport
- 常用 dumpsys:meminfo(内存构成)、gfxinfo(帧)、activity(栈)、dbinfo、batterystats
- `adb shell dumpsys dropbox` 与 dropbox 里的 crash/anr 条目
- ApplicationExitInfo 上报方案:App 启动时读历史退出原因+trace(getTraceInputStream)自建"轻量线上 ANR 监控"——给完整 Kotlin 示例代码
- 无法连 adb 的用户设备:开发者选项"错误报告"、厂商日志助手一句话提及

### 08 疑难杂症侦查术(id=detective,分组"大神 08")
- 用 .plays 场景卡组织 5-6 个侦查剧本:
  ① 难复现崩溃:多维聚类(版本/机型/OS/国家/自定义 key)找共性 → 假设 → 定向埋点验证;
  ② 只在某厂商 ROM 崩:识别 ROM 栈帧、竞品对照、反射兼容/规避、向厂商反馈渠道;
  ③ 内存类(OOM/LMK):区分 Java 堆 OOM/线程 OOM(pthread_create failed)/fd 耗尽(打开文件数),hprof 支配树、fd 泄漏 `ls -l /proc/pid/fd` 计数;
  ④ 死锁/卡死不 ANR:手动 `adb shell kill -3 pid` 抓 trace(或 debugger attach),锁链分析;
  ⑤ 启动崩溃风暴(打不开 App):安全模式思路——启动最早期埋"保险丝"(连续崩 N 次进入恢复模式清缓存/关功能开关);
  ⑥ 二分定位:版本二分(git bisect + CI 产物)、功能开关二分、代码路径二分
- callout:难题的通用心法——"把不可观测变成可观测",一切手段本质都是加观测

### 09 AI 结合:方法论与提示词(id=ai-method,分组"大神 09")
- 核心论点:AI 排查的质量 = 你喂给它的证据质量。定义"崩溃上下文包"标准物料:完整堆栈(已 retrace)+ 相关源码文件 + mapping 版本 + 设备/版本分布 + 近期相关 diff(git log -p 相关文件)+ 自定义 keys
- 五段式提示词模板(给出可直接复制的完整模板):角色与约束 / 证据粘贴 / 环境与分布 / 要求(根因假设排序+每个假设的验证方法+修复建议含边界)/ 输出格式
- 三种任务型提示词范例:堆栈根因分析、ANR trace 分析(贴 main 线程+锁链)、批量崩溃聚类归因(把 top20 崩溃列表喂给 AI 按根因聚类排优先级)
- 好坏对比(.duo):"帮我看看这个崩溃"(坏) vs 带完整证据包+验证要求(好)
- 边界与纪律:AI 的假设必须走五步法的"验证"一步;禁止直接合入 AI 补丁不做回归

### 10 AI 工作流与原创 Skill(id=ai-workflow,分组"大神 10")
- 工作流一:Crashlytics MCP + Claude Code(官方路径!)——接入命令、能拉的数据、对话式分诊示例("列出本版本 top5 新增崩溃→对第1个做根因分析→定位到源码→出修复 PR")
- 工作流二:CI 自动分诊——Velocity alert → webhook → `claude -p` 带崩溃上下文包自动产出"根因报告+修复建议" issue(给脚本骨架)
- 工作流三:双代理复核(修复代理 + 评审代理只挑正确性问题)
- **原创 crash-triage Skill(本章核心,完整给出可抄的 SKILL.md)**:frontmatter(description 写清触发场景)+ 流程:①要求/收集崩溃上下文包 ②分类(对照 00 章地图)③根因假设排序 ④每个假设给验证命令(adb/测试)⑤修复方案+回归测试 ⑥输出固定格式报告;附带 scripts/ 建议(retrace 封装、bugreport 解包脚本)
- 链接本库:Claude Code 指南(技能写法)、Codex 指南(双代理)

### 11 治理体系与资源(id=governance,分组"大神 11")
- 从救火到防火的四道防线:准入(lint/StrictMode/单元测试/代码评审 checklist)→ 灰度(分阶段发布+核心指标门禁)→ 监控(告警阈值、值班 SOP:定级/止血/根治三段)→ 复盘(每个 S 级崩溃产出"防复发项"并落地)
- 指标建议:崩溃率/ANR 率目标值设定参考(远低于 Play 红线)、新增 vs 存量分开治理
- 资源索引表:官方(vitals/anr/crash 文档、NDK debug、Crashlytics 全套、Perfetto 文档)+ 本库互链(Claude Code / Codex 指南)+ 中文社区可自行甄选补充

## 五、收尾集成步骤(必须做)

1. 用上述章节替换文件中的 `<!--MORE-->`(保持每章间 divider)
2. 注册主题:`assets/js/topics.js` 的 TOPICS 数组末尾追加:
```js
{
  href: "topics/android-crash-anr.html", icon: "⚡", tag: "稳定性", color: "#65a30d",
  title: "Android Crash & ANR 排查根治 × AI 提效",
  desc: "小白到大神:崩溃图鉴、ANR 解剖、Native 崩溃、全工具链、GP/Firebase 后台、疑难侦查术,以及 AI 分诊工作流与原创 crash-triage 技能。",
  meta: ["12 章渐进式", "30+ 崩溃图鉴", "原创 AI Skill", "2026-07 核对"],
  sections: [
    {id:"overview",label:"全景与方法论"},{id:"read-crash",label:"第一课:读懂一次崩溃"},
    {id:"crash-catalog",label:"常见 Crash 图鉴与根治"},{id:"anr",label:"ANR 深入"},
    {id:"native",label:"Native Crash"},{id:"toolbox",label:"工具箱与用法"},
    {id:"consoles",label:"Play Console 与 Firebase"},{id:"device-data",label:"测试机数据导出"},
    {id:"detective",label:"疑难杂症侦查术"},{id:"ai-method",label:"AI 结合:方法论与提示词"},
    {id:"ai-workflow",label:"AI 工作流与原创 Skill"},{id:"governance",label:"治理体系与资源"}
  ]
}
```
3. 校验:HTML 标签配平(section/table/div/pre/ul/ol)、侧栏锚点全部存在、无 `<!--MORE-->` 残留;`node --check assets/js/topics.js`
4. 本地预览:`python3 -m http.server` 打开 index 确认卡片/搜索/分页 Tab 正常
5. 提交+部署:`bash sync.sh -m "feat: 新增 Android Crash&ANR×AI 主题"`(post-commit 钩子自动部署;或 `bash sync.sh -d`)

## 六、验收标准

- 12 章全部有货,无占位文字;新手能沿 00→01→02 独立处理第一个崩溃;老手能在 08–10 找到疑难杂症与 AI 工作流的可执行方案
- 所有命令可直接复制执行;所有阈值/API 与"已核实事实"一致
- crash-triage SKILL.md 完整可抄用
