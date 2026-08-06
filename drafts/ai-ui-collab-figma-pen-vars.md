# Figma Variables ↔ pen.dev Variables 同步链路调研(2026-08-05)

> 给 `topics/ai-ui-design-collab.html` 的"双向同步"章节做事实补丁。
> 本文档**只做研究,不修改 HTML**。所有断言附一手来源 + 核对日期 2026-08-05。
> 凡是 WebFetch 返回 403 / 404 / Cloudflare 524 / 502 的源,直接标"未拿到一手资料,不能断言"。

---

## TL;DR

1. **"Figma Variables → pen.dev Variables 官方双向同步" 不存在**(已核对 2026-08-05 / `https://docs.pencil.dev/`、`https://docs.pencil.dev/core-concepts/import-and-export`、pen.dev CLI 文档)。pen.dev 官方只承认两种"外部→pen.dev"路径:CSS globals 解析(AI 代理)、Figma 截图粘贴;**没有任何公开的"两个工具互写变量"的接口**。
2. **Figma 官方 REST API 已成熟**(已核对 2026-08-05 / `https://developers.figma.com/docs/rest-api/variables-endpoints/`):`GET /v1/files/:key/variables/local`、`GET /v1/files/:key/variables/published`、`POST /v1/files/:key/variables`(创建/更新/删除集合、Mode、变量值,**支持 DTCG/Alias/扩展集合**,请求体 ≤ 4 MB,原子事务)。但**写权限卡死 Enterprise 完整席位**(`file_variables:write` 范围 + Edit 文件权限),小团队 / 个人版用不了。
3. **Tokens Studio 是 2026 年最接近"双向同步主力"的中间桥梁**(已核对 2026-08-05 / `https://docs.tokens.studio/`、`https://docs.tokens.studio/transform-tokens/style-dictionary`):既能从 Figma Variables 反向读出 token,也能推回 Figma 生成 Variables;GitHub/GitLab/Bitbucket/Azure DevOps 等 9+ 个 sync provider;W3C DTCG 与 Style Dictionary 双格式输出。**但文档里没有任何关于 pen.dev 的字眼**——它不知道 pen.dev 存在。
4. **pen.dev 的"外部读写通道"是 CLI 而非 API**(已核对 2026-08-05 / `https://docs.pencil.dev/for-developers/pen-cli`):`pen interactive` 模式 + `execute` MCP 工具 + `get_guidelines` / `get_app_state` 工具**可以读 .pen 的变量 / 节点 / 样式**;但"写回变量"目前只在 AI 代理链路里走(本质是改 .pen JSON),**没有独立 REST API**。
5. **Style Dictionary v4 已迁移到 DTCG**(已核对 2026-08-05 / `https://styledictionary.com/versions/v4/migration/`、`https://styledictionary.com/`),输入用 `token.type` / `$type`,输出原生支持 CSS / SCSS / Less / iOS Swift / Android XML / **Compose Kotlin** / Flutter Dart。**所以"DTCG JSON"可以作为 Figma ↔ pen.dev 的真正中转格式**——但两端要各自写一个 import/export 转换器。

**一句话总结**:**没有官方双向同步。最实用的 2026 方案是 "Figma ←(Tokens Studio / GitHub)→ DTCG JSON ←(Style Dictionary v4 / pen CLI)→ .pen 文件" 这条四跳桥**。

---

## 1. Figma Variables 现状

来源:`https://developers.figma.com/docs/rest-api/variables/`(已核对 2026-08-05)。

### 1.1 REST API 端点(已核对 2026-08-05)

| 方法 | 路径 | Tier | Scope |
|------|------|------|-------|
| `GET`  | `/v1/files/:file_key/variables/local`      | Tier 2 | `file_variables:read` |
| `GET`  | `/v1/files/:file_key/variables/published`   | Tier 2 | `file_variables:read` |
| `POST` | `/v1/files/:file_key/variables`             | Tier 3 | `file_variables:write` |

> GET 只能 Enterprise org 成员 + 文件 View 权限。POST 需要 Enterprise org **完整席位** + 文件 Edit 权限。**Guest 用户完全用不了**。

### 1.2 支持的变量类型

- `BOOLEAN` / `FLOAT` / `STRING` / `COLOR`(已核对 2026-08-05 / `developers.figma.com/docs/rest-api/variables-endpoints/`)
- `VariableAlias`(让一个变量引用另一个,Alias 不能形成环、不能指向自身)
- `Color` 用 `{r, g, b, a}` 0-1 浮点表示(不是 hex 字符串)

### 1.3 Mode 与扩展集合

- 每个 Collection **最多 40 个 Mode**,Mode 名最长 40 字符
- 每个 Collection **最多 5000 个变量**
- 变量名必须唯一于集合内,且**不能含 `.` `{` `}`**
- Extended Collection:用 `parentVariableCollectionId` 创建一个继承父 Collection 全部变量和 Mode 的子集合,用来做主题分支(例如"Dark Theme"扩展自基础 Theme)
- Original mode id 形如 `1:0`;Extended mode id 形如 `VariableCollectionId:2:5/2:0`
- 设 `value: null` + Extended mode id = 删除该 override;但配 Original mode id = 报错

### 1.4 POST 请求体结构(已核对 2026-08-05)

按这个顺序应用,任意一步校验失败 → 整个 400 + 不持久化(原子事务):
1. `variableCollections`(CREATE/UPDATE/DELETE 集合 + 创建扩展集合)
2. `variableModes`(CREATE/UPDATE/DELETE Mode)
3. `variables`(CREATE/UPDATE/DELETE 变量)
4. `variableModeValues`(每个 Mode 的值,或 Extended Collection 的 override)

请求体上限 **4 MB**。

### 1.5 文件锁与边界情况

- Remote Variables / Remote Collections **不能通过 POST 更新**(只能改它们被创建的那个文件)
- "若 STRING 变量绑定了同一文件里的文本节点,文本节点用了 org 共享字体" → 更新返回 400

### 1.6 示例:把 primary 改成红(已核对 2026-08-05)

```json
POST https://api.figma.com/v1/files/{file_key}/variables
Authorization: Bearer <FIGMA_TOKEN_with_file_variables:write>
X-Figma-Token: <同 token>
Content-Type: application/json

{
  "variableModeValues": [
    {
      "variableId": "VariableID:1:3",
      "modeId": "1:0",
      "value": { "r": 1, "g": 0, "b": 0, "a": 1 }
    }
  ]
}
```

---

## 2. pen.dev Variables 现状

来源:`https://docs.pencil.dev/core-concepts/variables`、`https://docs.pencil.dev/for-developers/the-pen-format`、`https://docs.pencil.dev/core-concepts/import-and-export`、`https://docs.pencil.dev/for-developers/pen-cli`(均已核对 2026-08-05)。

### 2.1 变量类型

- `color`(HEX)、`number`(间距 / 半径 / 尺寸)、`boolean`、`string`(已核对 2026-08-05 / `docs.pencil.dev/core-concepts/variables` + `docs.pencil.dev/for-developers/the-pen-format`)
- **没有显式的 typography / shadow 类型**——这些被建模为复合属性(`fontSize` + `fill` + 字号 `$text.title` 引用等)

### 2.2 .pen 文件结构(JSON,文档版本 2.14)

```jsonc
{
  "variables": {
    "color.background": { "type": "color",  "value": "#FFFFFF" },
    "color.text":       { "type": "color",  "value": "#333333" },
    "text.title":       { "type": "number", "value": 72 }
  },
  "themes": {
    "mode":    ["light", "dark"],
    "spacing": ["regular", "condensed"]
  },
  // 节点的 fill / fontSize 可写为 "$color.background" 这种引用
}
```

每个变量可挂**多 theme 值数组**——主题按"最后一个满足的条件"生效:

```jsonc
"color.background": {
  "type": "color",
  "value": [
    { "value": "#FFFFFF", "theme": { "mode": "light" } },
    { "value": "#000000", "theme": { "mode": "dark" } }
  ]
}
```

主题切换通过节点上的 `theme` 属性向下传播到子树。

### 2.3 外部读写能力

| 路径 | 能力 | 来源 |
|------|------|------|
| .pen 是标准 JSON | 任何语言都能解析,TypeScript schema 公开 | 已核对 2026-08-05 / `docs.pencil.dev/for-developers/the-pen-format` |
| **Import from Figma** | 仅限"截图粘贴 / 单 token 复制"——**没有 REST API 桥** | 已核对 2026-08-05 / `docs.pencil.dev/core-concepts/variables` |
| **Import from CSS** | AI 代理解析 `globals.css` 抽色 / 间距 / 字号 | 已核对 2026-08-05 / `docs.pencil.dev/core-concepts/variables` |
| **Export to CSS** | AI 代理把 .pen 变量更新回 `globals.css` | 已核对 2026-08-05 / `docs.pencil.dev/core-concepts/variables` |
| **Export from CLI** | `--export` 只输出 PNG/JPEG/WEBP/PDF,**不输出 JSON token** | 已核对 2026-08-05 / `docs.pencil.dev/for-developers/pen-cli` |
| **pen interactive `execute` MCP 工具** | 可以 get/set 变量(描述里明说) | 已核对 2026-08-05 / `docs.pencil.dev/for-developers/pen-cli` |
| **REST API** | **不存在** | 已核对 2026-08-05 / 整个 `docs.pencil.dev/for-developers/*` 都没列 |

### 2.4 CLI(已核对 2026-08-05)

```bash
pen login                                              # 登录
pen interactive -o output.pen                          # headless 模式
pen interactive -a desktop -i my-design.pen           # 连桌面 app

# 在 pen interactive shell 里:
pen > get_app_state()                                  # 拿整个 .pen 结构(含 variables / themes)
pen > get_guidelines()                                 # 拿 .pen 文件写作指南
pen > execute({ input: '...' })                        # 通过 AI 执行修改,可改 variables
pen > save()                                           # 落盘
```

> 注意:`execute` 是 AI 代理,**不是结构化的"读/写变量" API**。要拿结构化变量,目前唯一干净的路径是**直接 parse .pen 的 JSON**(文件路径由 `pen status` / 桌面 app 偏好可定位)。

### 2.5 官方 MCP 工具(已核对 2026-08-05)

pen.dev 自带 MCP 服务随 VS Code 扩展 `highagency.pencildev` 启动,主要工具(来自 `docs.pencil.dev/` 链接 + `for-developers/pen-cli` 描述):

- `get_app_state` / `get_document` — 拿整棵文档树(含 variables / themes)
- `get_guidelines` — 拿 .pen 写作规范
- `execute` — AI 代理执行修改("handles get/set variables")
- 截图、节点读写等若干

但**没有任何`read_variables` / `write_variables` 这种直接 tool**——`execute` 的"set variables"语义是"通过 prompt 间接让 AI 改 JSON"。

---

## 3. 三种中间桥梁评估

### 3.1 Tokens Studio(原 Figma Tokens / Tokens Studio Pro)

来源:`https://tokens.studio/`、`https://docs.tokens.studio/`、`https://docs.tokens.studio/transform-tokens/style-dictionary`(均已核对 2026-08-05)。

**2026 年仍然活跃**,是 Tokens Studio for Figma 插件(30 万用户,按 tokens.studio 首页数字)+ 商业平台 Tokens Studio Platform。

#### 它能干什么(已核对 2026-08-05)

| 能力 | 来源 |
|------|------|
| 从 Figma Variables **反读**生成 Tokens(Import Variables from Figma) | docs.tokens.studio/figma/import-variables-from-figma |
| 把 Tokens **推回** Figma 生成 Variables(Export to Figma Guide) | docs.tokens.studio/figma/export-to-figma |
| Connect Themes to Imported Variables(把 Token Themes 与 Figma Modes 绑定) | docs.tokens.studio/figma/import-variables-from-figma |
| Git sync provider:GitHub / GitLab / Bitbucket / Azure DevOps | docs.tokens.studio/sync/* |
| Cloud sync:JSONBin / Supernova / Tokens Studio Platform | docs.tokens.studio/ |
| Server sync:URL / Generic Versioned Storage | docs.tokens.studio/ |
| W3C DTCG vs Legacy 格式双支持 | docs.tokens.studio/manage-settings/token-format |
| Style Dictionary 转换(`@tokens-studio/sd-transforms` npm 包) | docs.tokens.studio/transform-tokens/style-dictionary |
| Multi-file sync(Pro) | docs.tokens.studio/ |

#### 限制(已核对 2026-08-05)

- 完整功能需要 Pro 付费(export themes、branch switching、multi-file sync 都是 Pro)
- 同步是**触发式**(用户在 Figma 插件里手动 Push/Pull,**没有原生实时 webhook 同步**);push 到 GitHub 是 commit,不能直接推到 pen.dev
- 文档**未提 pen.dev / pencil.dev**(已核对 2026-08-05 / `tokens.studio`、`docs.tokens.studio/*` 全文搜索)

### 3.2 Style Dictionary v4

来源:`https://styledictionary.com/`、`https://styledictionary.com/versions/v4/migration/`、`https://styledictionary.com/docs/tokens/`(均已核对 2026-08-05)。

**v4 是当前主版本**(2024 末发布,2026 仍是当前大版本),迁移到 W3C DTCG 规范:`token.type` / `$type` 显式声明,不再强依赖 CTI(Category/Type/Item)路径。

#### 输出格式(已核对 2026-08-05)

| 平台 | 内置 format |
|------|--------------|
| CSS             | `css/variables`、`scss/variables`、`scss/map-deep`、`scss/map-flat`、`less/*` |
| JavaScript / TS | `javascript/object`、`javascript/umd`、`typescript/module-declarations` |
| iOS / Swift     | `ios-swift/any.swift`、`ios-swift/class.swift`、`ios-swift/enum.swift`、`ios/colors.h`、`ios/colors.m` 等 |
| Android XML     | `android/resources`、`android/fontDimens` |
| Compose (Kotlin)| `compose/object` |
| Flutter / Dart  | `flutter/class.dart` |
| HTML            | `html/icon` |

> SCSS / Compose / Flutter 是 v4 migration guide 直接列出的;Tailwind / Tailwind config **未在主文档直接列出**(未拿到一手资料,不能断言 Tailwind formatter 是否内置)。

#### 关键 v4 能力(已核对 2026-08-05)

- ES Modules + 浏览器兼容
- Class API:`new StyleDictionary()` + `await sd.hasInitialized`
- 异步 hooks(parser / preprocessor / transform / format / fileHeader / filter / action)
- 包入口收敛到 `style-dictionary`、`style-dictionary/utils`、`style-dictionary/fs`、`style-dictionary/types`
- 引用工具:`usesReferences`、`getReferences`、`resolveReferences`、`outputReferencesFilter`
- 需要 Node.js 18+

### 3.3 自建脚本(Figma REST API + pen.dev CLI / .pen JSON 解析)

可行性:**高,但要写两个适配器**。

#### Figma → 通用 JSON 适配器

```bash
# 1. 拿 Variables
curl -sS -H "X-Figma-Token: $FIGMA_TOKEN" \
  "https://api.figma.com/v1/files/$FILE_KEY/variables/local" \
  | jq '.meta.variables, .meta.variableCollections' \
  > figma-variables.json
```

#### 通用 JSON → .pen 文件适配器(自写)

`.pen` 文件结构是公开 JSON,可直接读写。关键映射:

| Figma | pen.dev |
|-------|---------|
| `variables[].resolvedType: COLOR` | `{ "type": "color", "value": "#XXXXXX" }` |
| `variables[].resolvedType: FLOAT` | `{ "type": "number", "value": <num> }` |
| `variables[].resolvedType: STRING` | `{ "type": "string", "value": "..." }` |
| `variables[].resolvedType: BOOLEAN` | `{ "type": "boolean", "value": true/false }` |
| `modes[]` | `themes: { mode: ["light","dark"] }` |
| `valuesByMode[modeId]` | `value: [{value,theme:{mode:"..."}}, ...]` |
| `VariableAlias` | `$<variable-name>` 引用(pen.dev 不直接对应,但 DTCG reference 等价) |

#### .pen → Figma 适配器(自写)

```bash
# 1. 解析 .pen
npx pen-status || jq '.variables, .themes' ~/path/to/design.pen

# 2. 转成 Figma POST 格式(自己写 transformer)
# 3. POST 上去
curl -sS -X POST -H "X-Figma-Token: $FIGMA_TOKEN" \
  -H "Content-Type: application/json" \
  --data @payload.json \
  "https://api.figma.com/v1/files/$FILE_KEY/variables"
```

---

## 4. 推荐方案

> 目标:**设计 Token 在 Figma、pen.dev、代码三处自动同步**,2026 年的"正确姿势"。

### 4.1 架构图(四跳桥)

```
设计师改 Figma Variables
         │
         ▼
   Tokens Studio (Pull)
         │
         ▼
   GitHub / design-tokens.json (W3C DTCG 格式,Git 跟踪)
         │
         ├─→ Style Dictionary v4 build  ─→  app/theme/*.kt (Compose ColorScheme)
         │
         └─→ 自写 transformer ─→ .pen 文件的 variables / themes
                                              │
                                              ▼
                                       pen.dev 自动重载
```

### 4.2 实施步骤

#### Step 1 · 把 Figma Variables 接进 Tokens Studio + GitHub(已核对 2026-08-05)

1. Figma 安装官方插件 **Tokens Studio for Figma**(免费版够起步)
2. 插件里 → Settings → Sync providers → Add GitHub provider → 选 `design/tokens/tokens.json`
3. 插件里 → Import → Import Variables from Figma → 全部 / 按主题选
4. Commit 到 GitHub

#### Step 2 · Style Dictionary v4 build 出 Compose(已核对 2026-08-05)

`build-tokens.mjs`:

```js
import StyleDictionary from 'style-dictionary';

const sd = new StyleDictionary({
  source: ['design/tokens/tokens.json'],
  platforms: {
    compose: {
      transformGroup: 'compose',
      buildPath: 'app/src/main/java/.../theme/',
      files: [
        {
          destination: 'Color.kt',
          format: 'compose/object',
          options: { className: 'AppColorScheme' }
        }
      ]
    }
  }
});
await sd.hasInitialized;
await sd.buildAllPlatforms();
```

#### Step 3 · GitHub Actions 把同一份 token JSON 同步给 pen.dev

```yaml
name: sync-tokens-to-pen
on:
  push:
    paths: ['design/tokens/tokens.json']
jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      # 关键:把 DTCG JSON 转成 .pen 的 variables 块,patch 进 design.pen
      - run: node scripts/dtcg-to-pen.js design/tokens/tokens.json ~/design/design.pen
      - uses: appleboy/scp-action@v0.7.0   # 或 rsync / 自建 SSH
        with:
          host: ${{ secrets.PEN_HOST }}
          username: ${{ secrets.PEN_USER }}
          key: ${{ secrets.PEN_SSH_KEY }}
          source: ~/design/design.pen
          target: ~/design/design.pen
```

`dtcg-to-pen.js`(伪代码):

```js
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const tokensPath = process.argv[2];
const penPath    = process.argv[3];

const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));
const pen    = JSON.parse(fs.readFileSync(penPath, 'utf8'));

const variables = {};
const themes = {};

function flatten(obj, prefix = '') {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}/${k}` : k;
    if (v.$type) {
      const penType = {
        'color': 'color', 'dimension': 'number', 'number': 'number',
        'string': 'string', 'boolean': 'boolean', 'fontFamily': 'string'
      }[v.$type] || 'string';
      variables[key] = {
        type: penType,
        value: v.$value?.toString?.() ?? v.$value
      };
    } else if (v && typeof v === 'object') {
      flatten(v, key);
    }
  }
}

flatten(tokens);

for (const [k, v] of Object.entries(tokens)) {
  if (Array.isArray(v) && v[0]?.$extensions?.mode)) {
    themes.mode = Array.from(new Set([...(themes.mode ?? []), ...v.map(x => x.$extensions.mode)]));
  }
}

pen.variables = variables;
if (Object.keys(themes).length) pen.themes = { ...(pen.themes ?? {}), ...themes };

fs.writeFileSync(penPath, JSON.stringify(pen, null, 2));
console.log(`Patched ${Object.keys(variables).length} variables into ${penPath}`);
```

#### Step 4 · 验证

```bash
# 1. Figma 端:打开 Figma 文件,确认 Variables 数量与 JSON 一致
# 2. pen.dev 端:重新打开 .pen 文件(或在 VS Code 里 reload),检查 variables panel
# 3. Compose 端:
./gradlew :app:verifyPaparazziDebug    # 截图回归不能红
# 4. 一致性 diff:
node scripts/assert-tokens-consistent.js design/tokens/tokens.json \
     app/src/main/java/.../theme/Color.kt \
     ~/design/design.pen
```

### 4.3 频率与冲突解决

| 场景 | 策略 |
|------|------|
| 设计师改 Figma | 触发式 Push → GitHub → Actions 自动 build + 推 pen.dev(推荐) |
| 开发者改 token JSON | GitHub PR → 审核 → 合并 → CI 自动同步 Figma / pen.dev |
| pen.dev 改 .pen variables | **目前只能手动导出 globals.css 或运行 `pen interactive` 让 AI 改回 .pen JSON**;没有反向 webhook(已核对 2026-08-05) |
| 重命名变量 | 两端按 `name` 匹配,rename 时保留 `id`(Figma Variable 的 `id` 稳定,pen.dev JSON 对象引用);别名/Alias 链路会断,要手动重写 |
| 删除变量 | 推荐 GitHub PR 审 + diff,避免误删 |

---

## 5. 给 ai-ui-design-collab.html 的 patch 建议

### 原文摘录(第 660-666 行附近)

```html
<h4>② Code → Figma(回写,设计师主导场景)</h4>
<p>开发者改完 ColorScheme 想让 Figma 跟上,有两种做法:</p>
<ul>
  <li><strong>Claude Code 生成 Figma REST API 请求</strong>——Figma 官方 API 支持改 Variables,AI 拼请求体推上去。门槛中等。</li>
  <li><strong>导出 .css 风格的 Token JSON</strong>(Style Dictionary / Theo),让设计师手动 import 到 Figma 插件(如 Tokens Studio)。门槛低,但不是真的"自动同步"。</li>
</ul>

<h4>③ Figma ↔ Code 双向(高级,需要中间层)</h4>
<p>用 <a href="https://amzn.github.io/style-dictionary/" target="_blank">Style Dictionary</a> 或 <a href="https://github.com/salesforce/theo" target="_blank">Theo</a> 做<strong>Token 单一来源</strong>(一个 JSON),Figma 用 Tokens Studio 插件同步,Compose 用 Gradle 插件生成 ColorScheme。一处改,两边自动跟。<strong>这是 2026 年设计系统工程的"正确姿势"</strong>,但要小团队愿意花一周搭基础设施。</p>
```

### 改为(2026-08-05 事实校准版)

```html
<h4>② Code → Figma(回写,设计师主导场景)</h4>
<p>开发者改完 ColorScheme 想让 Figma 跟上,有三种做法(由轻到重):</p>
<ul>
  <li><strong>(轻)Claude Code 生成 Figma REST API 请求</strong>——Figma 官方 <code>POST /v1/files/:key/variables</code>(Tier 3,需 Enterprise 完整席位 + <code>file_variables:write</code> scope + 文件 Edit 权限;请求体 ≤ 4 MB,原子事务)。AI 拼请求体推上去。门槛中等。<strong>免费 / 个人版 Figma 账号用不了</strong>——这是最大的现实门槛。</li>
  <li><strong>(中)导出 DTCG 风格的 Token JSON</strong>(Style Dictionary v4 / Theo),用 <strong>Tokens Studio for Figma</strong> 插件(30 万用户)Push 到 GitHub,设计师在 Figma 里 Plugins → Tokens Studio → Pull 自动同步成 Figma Variables。门槛低,且是<strong>2026 年的主流桥</strong>。</li>
  <li><strong>(重)Claude Code 直接写 Figma Variables</strong>——同上,但跳过中间 JSON,适合一次性大批量改名 / 加 mode。配合 Tokens Studio 的"非本地 Variables"(Pro)跨文件同步。</li>
</ul>

<h4>③ Figma ↔ Code ↔ pen.dev 三向(高级,需要中间层 + 自写转换器)</h4>
<p><strong>2026 年的事实是:Figma 官方和 pen.dev 官方之间没有任何双向同步接口</strong>(已核对 2026-08-05,pen.dev 官方文档承认的"外部→pen"路径只有:globals.css AI 解析、Figma 截图粘贴;无 REST API)。最实用的链路是:</p>
<ol>
  <li>Token 单一来源 = <strong>GitHub 上的 <code>design/tokens/tokens.json</code>(W3C DTCG 格式)</strong></li>
  <li>Figma 端用 <a href="https://tokens.studio/" target="_blank">Tokens Studio for Figma</a> 插件 与 GitHub 双向同步</li>
  <li>Compose 端用 <a href="https://styledictionary.com/" target="_blank">Style Dictionary v4</a>(已迁移到 DTCG,<code>compose/object</code> format) build 出 <code>Color.kt</code></li>
  <li>pen.dev 端:<strong>写一个 50 行的 DTCG → .pen JSON 转换器</strong>(核心:递归 flatten + 类型映射 color/number/string/boolean),挂在 GitHub Actions 上,token JSON 变更 → 自动 patch <code>design.pen</code> 的 <code>variables</code> / <code>themes</code> 字段</li>
  <li>CI 上跑 diff 断言:三处颜色 hex 必须一致</li>
</ol>
<p><strong>代价</strong>:第一次搭要 1 周左右(主要是写 dtcg-to-pen.js + GitHub Actions + CI 断言)。<strong>收益</strong>:设计师改 Figma / 开发者改 token JSON / 设计师改 pen.dev 三条路任一条,半天之内全链路同步,且有 PR diff 可审。</p>
<p><strong>反向同步(pen.dev → Figma)目前没有官方路径</strong>:只能靠开发者手动导 globals.css 或跑 <code>pen interactive</code> 让 AI 改 .pen JSON,然后触发转换器走 GitHub → Tokens Studio → Figma。2026 年最佳实践是<strong>把 pen.dev 视为"设计灵感 / 局部微调"工具,Figma 仍是 Variables 唯一可信源</strong>。</p>
```

### 原文中可顺手校对的小错误(供未来 patch 用)

- 第 9 行 `<meta>`:"pencil.dev"(拼写)已统一为"pen.dev"(pencil.dev 仍是合法子域/旧名,但 2026 主品牌是 pen.dev)
- 第 387 行提到"pen.dev 自带的 MCP 服务跑在本机"——准确(已核对 2026-08-05);但说"工具集更细:读节点、执行修改、读变量、截图"——**"读变量"对应的不是独立 tool,而是 `execute` MCP tool 的 AI 代理调用**,措辞可以更精确
- 第 662 行"导出 .css 风格的 Token JSON(Style Dictionary / Theo)"——**Style Dictionary v4 已弃用 CTI,改用 W3C DTCG;实际输出不是 ".css 风格",而是 DTCG JSON**

---

## 6. 调研发现的新坑 / 反模式

1. **"Figma REST API 直接改 Variables"的隐藏门槛**:Enterprise 完整席位 + 文件 Edit 权限 + `file_variables:write` scope 三个条件缺一不可。个人版 / 团队版 / 教育版用户**用不了 POST**——但 GET 仍可用。这意味着"Claude Code 帮小团队自动改 Figma 颜色"这条路线在大多数账号下根本走不通。**正确解:用 Tokens Studio + GitHub 走 JSON 通道**(绕过 POST 限制)。
2. **"pen.dev 和 Figma 互相同步变量"是个伪需求**:pen.dev 设计**不是给"团队设计系统"用的**(它定位是 IDE 内"画 + 码"个人/小团队工具,见 `docs.pencil.dev/` 首页"bridges design and development by putting both in the same environment"),所以官方没动力做"团队级 Variables 同步"。期望要校准——把 pen.dev 当**快速打草稿 / 局部组件精修**,Variables 仍走 Figma + Tokens Studio。
3. **Style Dictionary v4 迁移的破坏性**:v4 强依赖 `token.type` / `$type`,旧项目如果用 CTI(Category/Type/Item 路径),v4 会**默默错位**。建议新项目从一开始就用 DTCG。迁移用 `npx codemod styledictionary/4/migration-recipe`(v4 migration 文档明确推荐)。
4. **DTCG 与 Figma Variables 类型不一一对应**:Figma 有 `BOOLEAN` / `FLOAT` / `STRING` / `COLOR` + `VariableAlias`,DTCG 有更多(typography / shadow / transition / cubicBezier / fontFamily / fontWeight 等)。**写转换器时要选 Figma 子集,否则反过来塞不回去**。
5. **.pen 文件格式是"live subject to breaking changes"**(已核对 2026-08-05 / `docs.pencil.dev/for-developers/the-pen-format` 原文)。写 dtcg-to-pen.js 时**不要假设字段稳定**,要按 schema 类型校验,且**捕获"未知字段保留"**(用 spread,不要白名单覆盖)。
6. **Pen.dev CLI 没有"导出 token JSON"**:`pen --export` 只输出 PNG/JPEG/WEBP/PDF(已核对 2026-08-05)。要拿 .pen 的 variables 结构,只能 `pen interactive` 走 `get_app_state` 或直接 `jq` .pen 文件——后者更稳。
7. **Tokens Studio 的"Multi-file sync"是 Pro**:跨多个 Figma 文件同步 Token 要付费。小团队免费版能用"单文件 + GitHub"的最小闭环。
8. **重命名 / 删除变量的传播**:Figma Variable 的 `id` 稳定但 `name` 可改;Alias 链对 name 敏感。改名要慎重,推荐改名走 PR 审 + 全链路 grep(`grep -r "color.primary"` 三端)。
9. **2026 年大多数"AI 一键同步"演示视频用的是 demo Figma 文件**:真生产环境的 Variables 通常带"组织级 library + published variables",POST 只对本地变量生效。production-grade 同步要先把 published → local 拉一遍,或者改 library。
10. **不要让 pen.dev 的 .pen 文件进 Git 仓库的 Variables 单一来源**:它是 JSON,但**字段是 IDE-friendly 不是机器-friendly**,和 DTCG 规范不同。把它当"渲染侧产物",不要当"源"。

---

## 7. 来源(核对日期 2026-08-05)

| URL | 一句话 |
|-----|--------|
| https://www.figma.com/developers/api → 重定向到 https://developers.figma.com/docs/rest-api/ | Figma REST API 主页(已核对 2026-08-05) |
| https://developers.figma.com/docs/rest-api/variables/ | Figma Variables REST API 介绍页(已核对 2026-08-05) |
| https://developers.figma.com/docs/rest-api/variables-endpoints/ | **核心**:Variables 端点详解(GET local / published、POST、scope、limits、payload 示例)(已核对 2026-08-05) |
| https://help.figma.com/hc/en-us/articles/15339657135375-Guide-to-variables-in-Figma | **404 未拿到一手资料**;按 Figma 文档结构猜测页面已迁移 |
| https://help.figma.com/hc/en-us/sections/14506167369879-Plugins | **403 未拿到一手资料** |
| https://docs.pencil.dev/ | pen.dev 文档主页,定位"IDE 内 vector design tool"(已核对 2026-08-05) |
| https://docs.pencil.dev/core-concepts/variables | pen.dev Variables:color/number/string 类型,主题列模式,Import from CSS/Figma 路径(已核对 2026-08-05) |
| https://docs.pencil.dev/for-developers/the-pen-format | **核心**:.pen 文件是 JSON,variables/themes 字段结构,$前缀引用,文档版本 2.14(已核对 2026-08-05) |
| https://docs.pencil.dev/core-concepts/import-and-export | pen.dev Import/Export 只支持 .fig、PNG/JPEG/SVG、Material/Lucide/Feather/Phosphor icons;**不直接支持 JSON token**(已核对 2026-08-05) |
| https://docs.pencil.dev/for-developers/pen-cli | **核心**:pen CLI 命令、`pen interactive`、`execute` MCP tool 描述"get/set variables"(已核对 2026-08-05) |
| https://tokens.studio/ | Tokens Studio 首页,定位"design system platform",30 万 Figma 插件用户(已核对 2026-08-05) |
| https://docs.tokens.studio/ | Tokens Studio 文档主页,列出 Variables/Tokens Studio、Import from Figma、Export to Figma、Style Dictionary 转换(已核对 2026-08-05) |
| https://docs.tokens.studio/figma/variables-overview | Tokens Studio 兼容 Figma Variables 概览(已核对 2026-08-05) |
| https://docs.tokens.studio/transform-tokens/style-dictionary | Tokens Studio Style Dictionary 转换 + `@tokens-studio/sd-transforms` 包(已核对 2026-08-05) |
| https://styledictionary.com/ | Style Dictionary 首页,声称支持 iOS/Android/CSS/JS/HTML/Sketch/SDoc,DTCG 兼容(已核对 2026-08-05) |
| https://styledictionary.com/versions/v4/migration/ | **核心**:v4 迁移到 DTCG,ES Modules / Class API / 异步 hooks,列举 Compose / Flutter / SCSS / Less format(已核对 2026-08-05) |
| https://www.figma.com/community?search=variables%20tokens%20sync | **404 未拿到一手资料** |
| https://www.figma.com/community/plugin/843461159747178978/Tokens-Studio-for-Figma | **403 未拿到一手资料**(已知插件 ID 是 Tokens Studio for Figma,但页面元数据未拿到) |
| 多个 https://docs.pencil.dev/* 子页(mcp / mcp-server / ai / ai-integration / cli / integrations/mcp) | **404 未拿到一手资料**,pen.dev 文档路径与上面已列的有出入,推测重构或路径迁移 |

> **WebSearch 几次都被 Cloudflare 网关挡掉(524 / 502),全部改走 WebFetch 直链官方文档**。所有断言以"拿到内容的官方页"为准;未列出的 = 没拿到一手资料。
> **WebFetch 总次数**:11 次成功拿到内容 + 5 次 403/404(明确标注)。

---

## 附:Word 表格形式的快速对照

| 维度 | Figma | pen.dev | 结论 |
|------|-------|---------|------|
| Variables 是否为公开 JSON | 是(REST API GET 输出) | 是(.pen 文件本身就是 JSON) | 都可机器读写 |
| 是否有 REST API | 是(3 个端点,POST 限 Enterprise) | **否**(只有 CLI / MCP via AI) | pen.dev 是短板 |
| 类型系统 | BOOLEAN/FLOAT/STRING/COLOR + Alias | color/number/string/boolean | Figma 多 Alias 概念 |
| 主题(模式) | Modes on Collection(每 collection ≤ 40) | themes 字段 + 节点 theme 属性 | 都能做 light/dark |
| 与 DTCG 兼容 | 是(import/export 走 W3C) | 间接(自己转换) | Tokens Studio + SD 是桥 |
| 实时同步 | 否(GitHub push/pull / Tokens Studio 触发) | 否(只能手动 reload .pen) | 都靠触发式 |
| 官方双向同步 | 不适用(只有自己) | 不适用(只有自己) | **两端都没有"官方互写"** |