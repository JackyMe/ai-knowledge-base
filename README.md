# AI 知识库

聚合 AI 使用方法、编程工具、设计创作和工程基础的静态知识网站，提供中文、英文、日文、韩文四种语言。

[在线网站](https://aidoc-zq.netlify.app) · [English](README.en.md)

## 内容与使用

6 类目录、17 个主题、每种语言 259 个章节入口，其中 Docker 包含 35 课。首页支持主题筛选、章节展开、全文搜索、快捷键与继续阅读；文章提供目录、分页、深色模式和可滚动表格。

| 分类 | 主题 |
| --- | --- |
| AI 入门与方法 | AI 入门、提示词与上下文、能力拓展 |
| 编程工具与模型 | Claude Code、Codex、Google AI、Antigravity、Grok |
| 设计与创作 | Pencil 文档、Pencil × Claude Code、UI 协作、GPT 图像 |
| 问题排查 | 环境与登录、Android Crash / ANR |
| 工程基础 | 服务器与网络、Docker |
| 更新日志 | 官方更新入口、参数变化、升级检查 |

内容包括官方资料摘要和方法示例。产品版本、费用与账号权限应以相应官方页面和实际环境为准；不能把示例视为所有环境都已实测。

## 本地运行

无需构建。使用 HTTP 静态服务器预览：

```sh
npm run dev -- --listen 4173
```

此命令通过 `npx serve` 启动服务器，首次运行可能下载开发工具。站点运行时不依赖前端框架。

## 维护与验证

- `index*.html`：四语言首页及界面文案。
- `assets/js/topics*.js`：主题、章节、学习路线和资源注册表。
- `assets/js/home.js`、`assets/css/home.css`：共享首页交互与样式。
- `assets/js/site.js`、`reading.js`、`assets/css/reading.css`：共享阅读体验。
- `topics/`：专题正文；`topics/docker/`：35 课；`topics/_backup/` 不参与当前索引。

修改正文或章节后，同步四语言注册表，并重建搜索索引：

```sh
python3 scripts/build-search-index.py
python3 scripts/check_content_structure.py
python3 scripts/check_static_links.py
git diff --check
```

结构检查需要 Node.js；其余脚本使用 Python 标准库。合并章节时保留旧锚点，避免历史链接失效。新增时效性结论应链接到对应官方来源，并区分发布日期、适用版本和核对日期。

[2026-09-09 重构与内容检视记录](docs/content-review-2026-09-09.md)。代码许可见 [LICENSE](LICENSE)。
