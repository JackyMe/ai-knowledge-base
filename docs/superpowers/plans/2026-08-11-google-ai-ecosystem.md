# Google AI 生态深度实战主题实现计划 - 2026.08 更新版

> **面向 AI 代理的工作者：** 步骤使用复选框(`- [ ]`)语法来跟踪进度。

**目标:** 为 `ai-knowledge-base` 知识库新增主题页 `topics/google-ai-ecosystem.html`（Google AI 生态深度实战 · 从模型到 Agentic IDE），重点包含 Google Antigravity 的全方位使用说明、技巧、干货与最佳实践，并完成全站注册、README 更新、搜索索引重建、commit + 部署验证。

---

## 任务 1: 搭建 `topics/google-ai-ecosystem.html` 骨架与 Google 品牌样式

- [ ] **步骤 1: 创建 HTML 骨架**
  - 从已有主题 (如 `claude-code-guide.html` / `ops-basics.html`) 复制全套结构与变量，设置主色为 Google Blue (`#1a73e8`)，渐变辅色为 Gemini Purple (`#7c3aed`) / Coral (`#ea4335`)。
  - 配置页头 OG 元数据、侧栏 26 节导航组锚点。
- [ ] **步骤 2: 验证骨架**
  - 在浏览器或本地 HTTP 服务中开启页面，确保侧栏高亮、Responsive 响应式无异常。

---

## 任务 2: 填充 26 节深度干货内容

- [ ] **步骤 1: 填入导读与全景地图 (`#intro`, `#map`)**
  - 阐述 2M 上下文、Agentic 开发、零幻觉 Source Grounding 优势。
  - 构建四层工具选型表。
- [ ] **步骤 2: 填入模块 1 · Google Antigravity Agentic 编程深度全景 (`#m1-1` ~ `#m1-7`)**
  - 详细解构 CLI (`agy`)、2.0 App、IDE、SDK 四大形态。
  - Slash 命令与 `@` Mentions 高效交互。
  - Skills / Rules / Hooks / MCP / Sidecars 编写指南与代码范例。
  - Subagent 团队协同与 Planning Mode 最佳实践。
  - Terminal Sandbox 安全沙箱与权限配置。
  - Python SDK 代码化 Agent 编排实战。
- [ ] **步骤 3: 填入模块 2 · NotebookLM 深度研究与知识基座 (`#m2-1` ~ `#m2-4`)**
  - Source Grounding 机制、2M 混合输入预处理。
  - 研报、播客 (Audio Overview)、脑图生成。
  - 从研报直接提炼 Antigravity Spec。
- [ ] **步骤 4: 填入模块 3 · Canvas / Sketch / AI Studio 架构与视觉 (`#m3-1` ~ `#m3-3`)**
  - Canvas / Sketch 组件实时编辑。
  - AI Studio 2M 窗口、Thinking 模型调参、JSON Schema 输出。
  - Imagen 3 / Veo 资产生成整合。
- [ ] **步骤 5: 填入模块 4 · 5 步超级流水线与独立开发案例 (`#m4-1`, `#m4-2`)**
  - 总结全链路数据流动与提示词接力路线。
  - 提供从 0 到 1 全栈独立开发的完整真实步骤。
- [ ] **步骤 6: 填入模块 5 · 黄金法则、避坑与速查附录 (`#m5-1` ~ `#appC`)**
  - 7 条黄金法则、常见踩坑避坑。
  - 附录 A：Antigravity Slash 命令、命令行标志 & Python SDK 速查。
  - 附录 B：NotebookLM 高效 Prompt 速查。
  - 附录 C：官方资源与 Changelog 索引。

---

## 任务 3: 全站注册、索引更新与 README

- [ ] **步骤 1: 注册到 `assets/js/topics.js`**
  - 在 `TOPICS` 数组与 `PATHS` 学习路径中追加 `google-ai-ecosystem` 主题卡片与节点。
- [ ] **步骤 2: 重建搜索索引**
  - 运行 `python3 scripts/build-search-index.py`。
- [ ] **步骤 3: 更新 README.md**
  - 在 README 的目录表格追加该主题简介。

---

## 任务 4: 验证与最终交付

- [ ] **步骤 1: 质量与链接检查**
  - 确保锚点全覆盖、结构标签齐全、无拼写与样式瑕疵。
- [ ] **步骤 2: Git 提交**
  - `git commit` 提交改动并推送到 `main` 分支。
