# Google AI 生态深度实战主题设计规格书 (Spec) - 2026.08 更新版

## 1. 目标与定位

为 `ai-knowledge-base` 知识库新增核心主题页 `topics/google-ai-ecosystem.html`（Google AI 生态深度实战 · 从模型到 Agentic IDE）。

**核心使命：**
基于 2026.08 全网最新工具链，全面聚合 Google 全栈 AI 产品矩阵，重点深挖 **Google Antigravity (AGY)**（AI 原生 Agentic 编程平台/CLI/2.0 App/Standalone IDE/Python SDK/Customizations/Sandbox）、**NotebookLM**（知识研究与 Source Grounding）、**Google AI Studio / Gemini 1.5 & 2.0+**（2M+ 超长上下文与 Thinking 模型）、**Canvas / Sketch**（交互设计与代码协同）以及 **Gemini in Workspace / Chrome DevTools**。

打破工具独立使用的孤岛局限，提出 **“研究 → 架构设计 → Agentic 编码 → 部署验证”** 的全链路最高效组合打法与最佳实践。

---

## 2. 结构与章节设计 (全 26 节)

### 导读与全景地图 (00 - R)
* `#intro` (00) **导读**：为什么选择 2026.08 Google AI 生态（2M 上下文、原生多模态、Agentic 编程、源头无幻觉 RAG）
* `#map` (01) **工具矩阵定位**：研究层 × 架构原型层 × Agentic 编码层 × 端侧辅助层

### 模块 1 · Google Antigravity (AGY) Agentic 开发平台深度全景 (1.1 - 1.7)
* `#m1-1` (1.1) **什么是 Google Antigravity**：从 Copilot 辅助补全升级到 AI-First Agentic 自主开发平台
* `#m1-2` (1.2) **四大交互形态详解**：
  - Antigravity CLI (`agy` Terminal TUI)
  - Antigravity 2.0 Desktop App (Canvas + Auxiliary Pane)
  - Antigravity Standalone IDE (VS Code 底座, 3 大 Modality: Passive Tab Autocomplete / Instructive `⌘I` / Collaborative Agent & Sidebar)
  - Antigravity Python SDK (`pip install google-antigravity`)
* `#m1-3` (1.3) **高效交互：Slash 命令与 @ Mentions 机制**：
  - Slash 命令：`/goal`, `/schedule`, `/browser`, `/grill-me`, `/learn`, `/teamwork-preview`
  - `@` 引入文件、会话、终端、规则、MCP 工具
* `#m1-4` (1.4) **自定义扩充系统 (Customizations)**：
  - Skills (`SKILL.md` 规范与 `scripts/`, `references/`)
  - Rules (`AGENTS.md` / `GEMINI.md` 规则约束)
  - Hooks (`hooks.json`) 与 Plugins 插件机制
  - Model Context Protocol (MCP) 与 Sidecars
* `#m1-5` (1.5) **Planning Mode 与 Subagent 多代理协同**：
  - Planning Mode 流程 (`implementation_plan.md` → 批准 → 执行 → `walkthrough.md`)
  - Subagent 派生与通信 (`invoke_subagent`, `define_subagent`, `send_message`, `manage_subagents`)
* `#m1-6` (1.6) **安全沙箱与权限深度把控**：
  - Terminal Sandbox 机制与 `BypassSandbox` 逻辑
  - 权限策略（Command Allowlist/Denylist, Non-Workspace File Access, Internet Access Policy, Artifact Review Mode）
* `#m1-7` (1.7) **Antigravity Python SDK 编程化实战**：
  - `async with Agent(config) as agent`
  - 实时 Token 流式传输、`response.thoughts` 思考流与 `response.tool_calls` 工具拦截

### 模块 2 · NotebookLM / Notebook 深度研究与知识基座 (2.1 - 2.4)
* `#m2-1` (2.1) **NotebookLM 核心原理与 Source Grounding**：基于严格源文件的零幻觉问答
* `#m2-2` (2.2) **多源材料输入与预处理**：PDF/Docs/YouTube/音频/网页 2M 混合注入
* `#m2-3` (2.3) **知识二次加工**：Briefing Docs、Audio Overview 播客生成、Mindmaps 与 Study Guides
* `#m2-4` (2.4) **知识研报 → Antigravity Spec 的无缝转换**：如何导出需求规范直接输入 Agent

### 模块 3 · Canvas / Sketch / AI Studio 架构原型与视觉协同 (3.1 - 3.3)
* `#m3-1` (3.1) **Canvas 与 Sketch 敏捷原型**：实时可视化 Web/UI 组件生成与代码联动
* `#m3-2` (3.2) **Google AI Studio 深度调优**：2M 窗口、Thinking 模型推理、System Instructions、Structured Outputs (JSON Schema)
* `#m3-3` (3.3) **视觉与多模态生成 (Imagen 3 / Veo)**：配合 generate_image 打造现代 UI 资产

### 模块 4 · 效率最大化组合打法与端到端实战 (4.1 - 4.2)
* `#m4-1` (4.1) **全链路 5 步超级流水线**：调研 → Spec 提炼 → Agentic 编码 → UI 视觉回归 → 自动化运维
* `#m4-2` (4.2) **独立开发端到端实战案例**：从 0 到 1 打造全栈应用的全流程数据接力与 Prompt 模板

### 模块 5 · 最佳实践、避坑指南与速查附录 (5.1 - appC)
* `#m5-1` (5.1) **Google AI 提效七条黄金法则**
* `#m5-2` (5.2) **常见坑点与反模式**：上下文超载、Token 预算浪费、Agent 权限误区
* `#appA` (App A) **Google Antigravity 常用 Command, Slash 命令 & SDK 速查表**
* `#appB` (App B) **NotebookLM 高效 Prompt & Source 配置速查**
* `#appC` (App C) **Google AI 开发者资源与 Release Notes 索引**

---

## 3. UI 视觉与样式风格

* **品牌色板**：采用 Google / Gemini 品牌科技调性（Google Blue `#1a73e8` 主调，Gemini Purple `#7c3aed` 与 Coral `#ea4335` 渐变高光）。
* **组件复用**：完全继承全站 `assets/css/site.css` 及 `assets/js/site.js` 的进度条、侧栏折叠、卡片高亮、复制按钮、灯箱与锚点定位。
* **证据标签**：全站一致的 `✅ 官方确认 / ⚡ 实测强共识 / ⚠️ 存在分歧` 三档标签。

---

## 4. 全站集成与指标

1. **页面位置**：`topics/google-ai-ecosystem.html`
2. **主题注册**：`assets/js/topics.js` 追加注册信息并加入路径。
3. **搜索索引**：运行 `python3 scripts/build-search-index.py` 重建全站正文搜索索引。
4. **文档同步**：更新 `README.md` 目录表格。
