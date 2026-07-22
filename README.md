# AI 知识库

AI 工具官方文档中文版与全网实践精华聚合的静态站点。纯静态、零构建、零依赖,任何静态托管平台可直接部署。

## 目录结构

```
ai-knowledge-base/
├── index.html                  # 主题中心(入口):全站搜索 / 标签筛选 / 继续阅读 / 主题卡片
├── topics/                     # 各主题页(每页自包含主题样式)
│   ├── pencil-docs-zh.html
│   ├── pencil-claude-code-best-practices.html
│   ├── claude-code-guide.html
│   ├── codex-guide.html
│   ├── env-auth-clinic.html    # 环境与登录急救手册(Claude Code × Codex)
│   ├── android-crash-anr.html
│   ├── ai-leverage-guide.html  # AI 提效全景与心法
│   ├── prompt-context-engineering.html # 提示词与上下文工程(地基学科)
│   └── android-to-fullstack.html # Android 转型全栈路线(心法姊妹篇)
├── assets/
│   ├── css/site.css            # 全站共享交互样式(进度条/筛选/复制/灯箱/跳转面板)
│   └── js/
│       ├── site.js             # 全站共享交互脚本(所有主题页引用同一份)
│       ├── topics.js           # 主题注册表 —— 唯一数据源
│       └── search-index.js     # 章节正文内容搜索索引(自动生成,见下)
├── scripts/
│   └── build-search-index.py   # 扫描 topics/*.html 生成 search-index.js
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
2. 在 `assets/js/topics.js` 的 `TOPICS` 数组追加一条(标题/图标/颜色/章节列表;可选 `keywords` 字段写口语化搜索别名,如"登录 报错 换电脑")。若某章节是"速查手册"型高频入口(命令大全、快捷键之类),给它加 `quick:true` + `quickLabel:"展示文案"`,首页 hero 区「⚡ 常用速查」快链会自动收录,无需改 index.html。
3. 重新生成搜索索引(新增/修改了任意 `topics/*.html` 正文都要跑一次):
   ```bash
   python3 scripts/build-search-index.py
   ```
4. 完成。首页卡片、标签筛选 Tab、章节快链、全站搜索(标题 + 章节正文内容,精确匹配优先、模糊匹配兜底)自动生效(筛选标签按 `tag` 字段自动归组)。

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


## 日常更新与同步(推荐流程)

本目录已是 git 仓库,并装有 **post-commit 自动部署钩子**:配置令牌后,每次 `git commit` 都会自动发布到线上。

**首次配置(一次即可)**:在 [app.netlify.com/user/applications](https://app.netlify.com/user/applications#personal-access-tokens) 创建 Personal access token,然后:

```bash
echo "粘贴你的token" > .netlify/auth-token   # 该目录已被 gitignore,不会入库
```

日常使用:

```bash
bash sync.sh             # 提交 → 钩子自动部署(推荐,一条命令全搞定)
bash sync.sh -m "说明"     # 自定义提交信息
bash sync.sh -d          # 无新改动时也强制部署一次
bash sync.sh -D          # 只部署不提交;或直接双击「一键部署.command」
```

**同步到线上(aidoc-zq.netlify.app)二选一:**

- **方式 A · 拖拽(零配置)**:打开 [app.netlify.com/projects/aidoc-zq/deploys](https://app.netlify.com/projects/aidoc-zq/deploys),把整个 `ai-knowledge-base` 文件夹拖进页面底部的拖放区,10 秒发布。
- **方式 B · 命令行(一次配置,之后一条命令)**:
  ```bash
  npm i -g netlify-cli
  netlify login                 # 浏览器授权,一次即可
  netlify link                  # 在本目录运行,选择 aidoc-zq 项目
  # 之后每次发布:
  netlify deploy --prod --dir . # 或直接 ./sync.sh -d
  ```

## 说明

- 内容为非官方整理,以各来源原文为准;各页脚注有来源链接。
- 「继续阅读」与阅读位置基于 localStorage,同域名下自动生效。
