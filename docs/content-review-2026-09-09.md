# 网站重构与内容检视记录

本轮覆盖 17 个主题、35 个 Docker 课程及四种语言的页面结构。检查方式为全文规则扫描、章节结构检查、重点段落人工审阅，以及高变化和高风险结论的官方资料核对。没有对每句话、每个外链和每段代码作独立运行验证。

## 信息架构与阅读体验

首页改为搜索、分类目录、学习路线、延伸资源的层次。章节默认收起，避免把全部目录平铺在首页。统一中性色与蓝色强调，减少渐变、大色块和装饰，调整字号、行距、留白与移动端布局。

四语言共享首页和阅读组件；补齐搜索加载失败、无结果、清除、键盘操作、目录焦点、主题切换与存储不可用处理。Docker 35 课使用各自真实链接，并纳入全文索引。阅读页保留原有正文导航逻辑，增加表格滚动、跳至正文、移动目录状态和深色模式。

初次结构检查发现的漏登章节、Docker 阶段重复目标和 Grok 错误锚点已修正。内容合并前每种语言有 285 个有效章节入口，合并后为 259 个；主题仍为 17 个。合并章节保留原主要锚点，用于历史链接定位。

## 逐主题处理

| 主题 | 检视与处理 |
| --- | --- |
| AI 入门与应用方法 | 保留入门路径；把过时品牌比较改为按任务、环境、预算选择与小样本评估。 |
| 提示词与上下文工程 | 保留可复用方法；改写旧型号提示词比较、路由支持断言；修复 Codex 跨文档锚点。 |
| AI 能力拓展实践 | 检查章节与示例定位，保留跨领域方法；案例作为方法材料，不视为普遍效果保证。 |
| Claude Code | 区分用量与上下文；区分 Artifacts 与计算机使用；移除没有输出证据的隐藏配置实测表。 |
| Codex | 合并重复图像内容至独立专题；重写额度、隐藏配置、验收模板；区分订阅、API 费用与上下文限制。 |
| Google AI | 从重复且混杂的章节重组为 API、缓存、结构化输出、NotebookLM、创作与工作流；移除错误缓存模型参数和效果保证。 |
| Antigravity | 重写为 8 章；区分 Desktop、CLI、IDE、SDK；纠正安装器与将内部工具名称误作 CLI 子命令的问题。 |
| Grok / xAI | 区分 Chat、Bot、Build 和 API；合并重复协作与模型章节；移除无来源基础设施推测和排名。 |
| Pencil 文档 | 检查目录、重复 ID 和路径；保留独立工具参考定位。 |
| Pencil × Claude Code | 保留实践流程，与工具参考分工；统一阅读样式和入口。 |
| AI 与 UI 设计协作 | 纠正 shadcn 官方 MCP 不存在的错误；颜色角色表改为部分示例；移除若干零成本及固定时长保证，案例明确为示例。 |
| GPT 图像生成 | 重写模型、费用、角色一致性、工具比较与交付检查；删除编造 seed、版权绕过和无证据来源数量宣传；保留场景模板。 |
| 环境与登录排查 | 删除通用清空配置目录的流程；改为完整备份、证据定位与单项恢复；快速环境命令只显示变量名。 |
| Android Crash / ANR | 检查结构与证据表达，保留日志和源码定位方法；没有重新复现实例中的 Android 故障。 |
| 服务器、网络与部署 | 纠正 HTTP/1.1 无限连接、DNS 统一 48 小时、IPv4 地址池时间混淆；取消固定速度与部分故障比例表述。 |
| Docker | 保留 35 课；Node 教学镜像更新到 24；修正健康状态与重启的区别，增加数据库备份一致性前提，删除默认 Watchtower 全自动部署示例，更新 CI 示例版本并引用来源。 |
| AI 工具更新日志 | 删除缺乏可靠出处的月度摘要，改为官方更新入口、已核对参数变化和升级回退检查；旧文保留在 Git 历史。 |

## 关键核对来源

以下来源支持本轮对应改动，不代表已核实页面中所有历史内容：

- [Codex CLI reference](https://learn.chatgpt.com/docs/developer-commands?surface=cli)：`untrusted` 仍列于审批模式；`codex exec --full-auto` 属于已弃用兼容参数。
- [OpenAI models](https://developers.openai.com/api/docs/models) 与 [image generation](https://developers.openai.com/api/docs/guides/image-generation)：模型与图像接口。
- [Claude Code commands](https://code.claude.com/docs/en/commands)：`/context` 与 `/usage` 的不同含义。
- [Antigravity install](https://www.antigravity.google/docs/cli/install/)、[reference](https://www.antigravity.google/docs/cli/reference/)、[settings](https://www.antigravity.google/docs/cli/settings/)：安装和公开 CLI 能力。
- [Gemini caching](https://ai.google.dev/gemini-api/docs/caching)、[structured output](https://ai.google.dev/gemini-api/docs/structured-output)：缓存接口与结构化输出边界。
- [xAI Build](https://docs.x.ai/build/overview)、[Grok Bot](https://docs.x.ai/grok-bot/overview)、[X Search](https://docs.x.ai/developers/tools/x-search)：产品分工与搜索能力。
- [shadcn MCP](https://ui.shadcn.com/docs/mcp)、[Material 3 ColorScheme](https://developer.android.com/reference/kotlin/androidx/compose/material3/ColorScheme)：设计工具集成与颜色角色。
- [MDN HTTP/1.x connection management](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Connection_management_in_HTTP_1.x)：浏览器连接管理。
- [Node.js releases](https://nodejs.org/en/about/previous-releases)：Node 24 LTS 与旧版生命周期。
- [Docker restart policies](https://docs.docker.com/engine/containers/start-containers-automatically/)、[Compose startup order](https://docs.docker.com/compose/how-tos/startup-order/)、[volumes](https://docs.docker.com/engine/storage/volumes/)、[build-push-action](https://github.com/docker/build-push-action)：重启、启动等待、备份和 CI 示例。

## 验证与边界

- 四语言注册表：每种语言 17 个主题、259 个章节目标、4 条学习路线；章节覆盖、目标存在、语言、唯一 ID 与站内片段链接检查。
- 212 个活动 HTML 文件的本地链接与静态资源检查；备份目录不计入。
- JSDOM 行为检查：四语言首页搜索与筛选、Docker 正文结果、空结果、索引失败、清除、主题切换；5 个代表性阅读页的分页与表格；本地存储不可用时的语言处理。
- JavaScript 语法及 `git diff --check` 检查。
- 未执行实际浏览器截图验收；JSDOM 不验证像素布局。正文示例未全部运行，账号权益和各产品客户端功能未逐项实测。外部来源有可能后续更新。
- 改动仅在本地工作区，未提交、推送或发布。

维护时，遇到高变化事实优先链接官方资料并标出具体版本；避免使用没有原始证据的“实测”“零成本”“无限量”和固定提升比例。删除内容应保留可追溯历史，合并章节后同时更新四语言目录与搜索。
