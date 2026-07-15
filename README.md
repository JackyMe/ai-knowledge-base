# AI 知识库

AI 工具官方文档中文版与全网实践精华聚合的静态站点。纯静态、零构建、零依赖,任何静态托管平台可直接部署。

## 目录结构

```
ai-knowledge-base/
├── index.html                  # 主题中心(入口):全站搜索 / 继续阅读 / 主题卡片
├── topics/                     # 各主题页(每页自包含主题样式)
│   ├── pencil-docs-zh.html
│   ├── pencil-claude-code-best-practices.html
│   └── claude-code-guide.html
├── assets/
│   ├── css/site.css            # 全站共享交互样式(进度条/筛选/复制/灯箱/跳转面板)
│   └── js/
│       ├── site.js             # 全站共享交互脚本(所有主题页引用同一份)
│       └── topics.js           # 主题注册表 —— 唯一数据源
├── package.json                # 本地预览脚本
└── README.md
```

## 本地预览

```bash
npm run dev        # 等价于 npx serve .,打开 http://localhost:3000
```

或者任何静态服务器:`python3 -m http.server 8000`。

## 新增主题(三步)

1. 新主题 HTML 放入 `topics/`,并在 `</style>` 后和 `</body>` 前分别加入:
   ```html
   <link rel="stylesheet" href="../assets/css/site.css">
   <script src="../assets/js/site.js"></script>
   ```
   页面需包含:`.topbar`(内含 `.right`)、`#sidebar`(内含 `#sideFilter` 筛选框)、
   `#prog` 进度条、`#topBtn` 回顶按钮、`section[id]` + `h2/h3` 结构——参考现有主题页即可。
2. 在 `assets/js/topics.js` 的 `TOPICS` 数组追加一条(标题/图标/颜色/章节列表)。
3. 完成。首页卡片、章节快链、全站搜索自动生效。

## 部署

**方式 A · Netlify Drop(最简,约 1 分钟)**
1. 打开 https://app.netlify.com/drop
2. 把整个 `ai-knowledge-base` 文件夹拖进页面
3. 得到 `https://xxx.netlify.app` 公网地址(注册免费账号即可长期保留、改名、绑定自定义域名)

**方式 B · GitHub Pages(适合长期迭代)**
```bash
cd ai-knowledge-base
git init && git add -A && git commit -m "init: AI knowledge base"
# 在 GitHub 新建仓库 ai-knowledge-base 后:
git remote add origin git@github.com:<你的用户名>/ai-knowledge-base.git
git push -u origin main
```
仓库 Settings → Pages → Source 选 `main` 分支根目录,稍等即得
`https://<用户名>.github.io/ai-knowledge-base/`。之后每次 `git push` 自动更新。

**方式 C · Cloudflare Pages / Vercel**
两者均支持"导入 Git 仓库"或直接上传文件夹,构建命令留空、输出目录填 `/` 即可。

## 说明

- 内容为非官方整理,以各来源原文为准;各页脚注有来源链接。
- 「继续阅读」与阅读位置基于 localStorage,同域名下自动生效。
