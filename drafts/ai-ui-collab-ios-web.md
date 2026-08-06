# 附录:跨端落地指南(iOS × Web)

> **读者画像**:正在读 `topics/ai-ui-design-collab.html` 全文,但**自己不写 Android** 的工程师(iOS / Web 前端)。
> **本文不是替换正文**——正文是"设计 ↔ 代码协同全景",以 Android Compose 为落地端;本附录只补两件事:① iOS / Web 侧的对应方案,② 那条五步流水线在 SwiftUI 和 React/Tailwind 里怎么照搬。
> **核对日期**:本文所有引用已核对,日期 **2026-08-05**,URL 见文末 A4。

---

## 写在前面

正文已经把"为什么 2026 年必须把设计稿当一等公民喂给 AI 编码代理"讲透了(三条主线:MCP、Token 化结构、零成本视觉回归)。本附录的目标只有一句话:

> **让一个 SwiftUI 工程师和一个 React/Tailwind 工程师,各自花 5 分钟看完就知道"我能用吗、怎么搭、有啥坑"。**

约定:

- 所有"我们"指代"和正文同一份设计系统流水线"——不是另起炉灶。
- 所有结论都标了**核对日期 + URL**,直接复制到 PR 描述里合规可用。
- 查不到一手文档的地方,标 **"未查到官方来源,留作可深挖"**,绝不脑补。

---

## A1. iOS 落地(SwiftUI)

### 设计 Token 工程化路径

**读者画像**:SwiftUI 工程师,正在想"Material 3 有 `ColorScheme`,我们 Apple 这边对位的是什么?"

Apple 官方没有"Design Token"这个术语,但有三套等价机制:

#### A1.1 语义色 + 资产目录(Asset Catalog)

SwiftUI 的 `Color` 类型本身就是设计 Token 的载体。Apple 在 HIG 明确建议"**优先用语义色而不是硬编码十六进制**",语义色会自动响应 Dark Mode、Increase Contrast、Reduce Transparency。
*(来源:HIG Foundations / Color,已核对,日期 2026-08-05,URL: <https://developer.apple.com/design/human-interface-guidelines/foundations/color>)*

```swift
// 错误姿势(AI 经常这么写)
Text("Save").foregroundColor(Color(red: 0.28, green: 0.41, blue: 0.06))

// 正确姿势(走语义)
Text("Save").foregroundStyle(.primary)            // 跟系统主前景色
Button("Save") {}.tint(Color("BrandPrimary"))      // 自家品牌色走 Asset Catalog
```

关键纪律:**所有"自家品牌色"也要走 Asset Catalog 的 Color Set**(支持 Light/Dark/High Contrast 三个变体),而不是 `.xcconfig` 里写字符串。AI 写 `.foregroundColor(.red)` 这种硬编码就是踩坑。

#### A1.2 自定义 `Theme` 容器(iOS 17+ 风格)

和 Material 3 `MaterialTheme` 对位的是 iOS 17 起的 `@Entry` macro 注入自定义 `EnvironmentValues`(iOS 18 API)。它让你**像 Compose `MaterialTheme.colorScheme` 一样**通过 `@Environment` 拿到一整套品牌 Token。

```swift
// 1) 定义品牌 Token 容器
@Entry struct BrandTheme {
    let primary: Color
    let onPrimary: Color
    let surface: Color
    let radius: CGFloat
    let spacing: (xs: CGFloat, sm: CGFloat, md: CGFloat, lg: CGFloat)
}

extension EnvironmentValues {
    var brandTheme: BrandTheme { .default }
}

// 2) 在根注入(类似 Compose 的 ReplyTheme)
@main struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            RootView()
                .environment(\.brandTheme, .light)
        }
    }
}

// 3) 在任何子 View 取
struct PrimaryButton: View {
    @Environment(\.brandTheme) private var theme
    var body: some View {
        Text("Tap")
            .foregroundStyle(theme.onPrimary)
            .padding(.horizontal, theme.spacing.md)
            .background(theme.primary, in: .rect(cornerRadius: theme.radius))
    }
}
```

`@Entry` 是 iOS 18 才引入的简洁写法,iOS 17 也能用但要手写 `EnvironmentKey`。
*(来源:Apple Developer Documentation / `@Entry`,已核对,日期 2026-08-05,URL: <https://developer.apple.com/documentation/swiftui/entry>)*

#### A1.3 Figma Variables → Swift `Color` 的桥

和 Android 那边"Material Theme Builder 导出 Jetpack Compose"的官方桥一样,iOS 端也有两条路:

| 路径 | 工具 | 适合 |
|---|---|---|
| **官方** | Tokens Studio for Figma 插件 + Style Dictionary 导出 iOS Swift | 团队有 Figma,有完整 Token JSON 仓库 |
| **半官方** | Figma Variables 直接 Export → 自写 Swift Codable | 轻量,1-2 个品牌色,不想引入 Style Dictionary |

Style Dictionary 是 Amazon 开源的多端 Token 编译器,支持 iOS、Android、CSS、JS、Sketch 等输出。它和 Apple HIG 没有直接绑定,但和 **DTCG(Design Tokens Community Group)** 规范对齐——也就是说一份 Token JSON,Figma 端是源,iOS / Android / Web 三端都能编译。
*(来源:Style Dictionary 官网,已核对,日期 2026-08-05,URL: <https://styledictionary.com/>)*

```bash
# Style Dictionary 装好后(假设 token 仓库在 ./tokens/)
npm i -D style-dictionary
npx style-dictionary build --platforms ios.swift
# 产物:build/ios-swift/Colors.swift
```

Tokens Studio 插件则是 Figma 端最主流的 Token 管理工具,支持把 Figma Variables 双向同步到 GitHub / GitLab / 自托管 JSON 仓库,再由 Style Dictionary 编译到各端。
*(来源:Tokens Studio 官方文档,已核对,日期 2026-08-05,URL: <https://docs.tokens.studio/>)*

#### A1.4 `.containerRelativeFrame()` 与布局 Token

iOS 17 起的 `.containerRelativeFrame(_:alignment:)` 是 SwiftUI 里**对位 Compose `Modifier.fillMaxWidth()` / 响应式断点**的官方姿势。它不再用绝对屏幕宽度,而是用"最近滚动容器或 Lazy 容器的尺寸"做分母,做响应式 grid / paging 极其干净。
*(来源:Apple Developer Documentation / `containerRelativeFrame`,已核对,日期 2026-08-05,URL: <https://developer.apple.com/documentation/swiftui/view/containerrelativeframe(_:alignment:)>)*

```swift
ScrollView(.horizontal) {
    LazyHStack(spacing: 16) {
        ForEach(items) { item in
            CardView(item: item)
                .containerRelativeFrame(.horizontal, count: 3, span: 1, spacing: 16)
        }
    }
}
```

这相当于把"3 列网格、间距 16"声明成布局 Token,Claude Code 用 MCP 读到 Figma 端的 Auto Layout 设置后能直接复刻。

---

### Claude Code × SwiftUI 工作流

**读者画像**:你已经在用 Claude Code / Codex 了,只是 iOS 项目还没接上 Figma MCP。

#### A1.5 五步流水线在 iOS 侧的镜像

和正文"Android 五步流水线"完全对位:

| 步骤 | Android(正文) | iOS 镜像 |
|---|---|---|
| 1 设计 Token | Figma Variables + Material Theme Builder | Figma Variables + Tokens Studio + Style Dictionary |
| 2 组件契约 | Figma Frame + Auto Layout | 同(Figma 跨端一致) |
| 3 读取 + 计划 | Claude Code / Codex + Figma MCP | 完全一致,Claude Code 不在乎落地端 |
| 4 生成代码 | Jetpack Compose + `@Preview` | SwiftUI `View` + `#Preview` macro(iOS 17+) |
| 5 视觉回归 | Paparazzi / Roborazzi | **未查到官方等价库,留作可深挖**(参见下文) |

第 3 步的 prompt 几乎一字不改就能用——Claude Code 读的是 Figma 结构,不是 Android 代码。区别只在第 4 步的落点。

#### A1.6 SwiftUI 侧的 Figma MCP 接入

```bash
# Claude Code 装官方 Figma MCP
claude mcp add --transport http figma https://mcp.figma.com/mcp
claude mcp list   # 看到 figma / connected 即可
```

工具集(`get_design_context` / `get_variable_defs` / `get_metadata` / `get_screenshot`)与 Android 侧完全一致;只是 SwiftUI 工程师拿到 `get_design_context` 返回的 React/Tailwind 表示后,要自己(或让 AI)翻译成 SwiftUI——**这是目前最大的摩擦点**,社区里有零星的 Figma-to-SwiftUI 插件,但都没有官方背书,质量参差。
*(未查到 Figma 官方"Copy as SwiftUI"功能,留作可深挖)*

#### A1.7 可复制的 prompt(可直接粘贴)

```
读 Figma Frame `ProductDetailScreen` (node-id 1:23),用 figma MCP。

- 调 get_variable_defs,把所有 Variables 落到 MyApp/Theme/BrandColors.swift,
  通过 Asset Catalog 的 Color Set 定义(支持 Light/Dark/High Contrast)
- 调 get_design_context + get_metadata,理解 Frame 结构
- 规划:1) 哪些 View;2) 哪些 #Preview;3) 哪些快照测试用例;
       4) 是否需要 iOS 17 兼容(若 < iOS 17,改用传统 EnvironmentKey)
- 用 ExitPlanMode 给我审,不要直接动手
```

#### A1.8 真机/虚拟截图回归(iOS 侧)

这一项是**iOS 的最大短板**。Android 有 Paparazzi / Roborazzi 在 JVM 上无设备跑 Compose 截图,iOS 端**没有官方等价物**——目前社区方案要么靠 `xcrun simctl io booted screenshot`(真模拟器,慢)、要么靠第三方如 **SnapshotTesting** by Point-Free(纯 Swift,在 XCTest 里截图,需要起 simulator)。
*(未查到 Apple 官方"无设备 SwiftUI 截图"工具,留作可深挖)*

实操建议:**先用 SnapshotTesting 在 CI 里跑 iPhone 15 / iPhone SE 两套关键屏幕基线**;Claude Code 改 UI 后用同样的 fixture diff,异常才推人。不要指望像 Android 那样秒级拿到所有设备快照。

---

### AI 编码代理 SwiftUI 的真实能力边界

**读者画像**:你用过 Claude Code 改 React,想知道改 SwiftUI 是不是一样丝滑。

答案是"**90% 一样,10% 踩坑**"。明确短板列在这里,免得你 PR 被 review 时才意识到:

| 能力 | 评价 | 备注 |
|---|---|---|
| 单文件 View 生成 | **强** | 比 Compose 还稳(Swift 语法比 Kotlin 更收敛) |
| `NavigationStack` / `NavigationSplitView` 标准用法 | **强** | 模板化代码 AI 一遍过 |
| 复杂自定义手势(DragGesture / MagnifyGesture 组合) | **弱** | 经常写出"看起来对、跑起来手势冲突"的代码,必须人审 |
| `Combine` 复杂算子链 | **中** | `flatMap` / `merge` 嵌套超过 3 层就开始乱,建议拆 |
| `@Observable` 宏(iOS 17+) | **中-强** | 大部分 AI 已会写,但和老式 `ObservableObject` 混用容易出 bug |
| CoreData / SwiftData `@Query` | **中** | 模型迁移相关概念 AI 不熟,容易硬编码 schema |
| 性能敏感代码(动画 / 列表渲染) | **弱** | AI 倾向写"功能正确但有 N² 渲染"的代码,需 Instrutments 跑一次 |
| Asset Catalog YAML/JSON 配置 | **极弱** | 大多数 AI 不会手写 .xcassets 目录结构,得用 Tuist/XcodeGen 间接生成 |

底线:**AI 写 SwiftUI 业务代码可以,写底层/动画/性能代码必须人工把关。**

---

### 避坑清单(iOS 侧)

1. **别让 AI 直接改 Asset Catalog 的 XML**——大多数模型不知道 `.xcassets/Contents.json` 的 schema,会写出 Xcode 打不开的文件。
2. **`Color(uiColor:)` 仅在必须接 UIKit 遗产时用**——纯 SwiftUI 项目直接 `Color("BrandPrimary")` 走 Asset Catalog。
3. **`#Preview` 是 iOS 17 才有的**,目标 iOS 16 的项目要么升级最低版本,要么退回去用 `PreviewProvider`。
4. **`.containerRelativeFrame()` 必须有可滚容器或 Lazy 容器**,否则它会取整个屏幕宽,以为你做了响应式其实没做。
5. **品牌色在 Asset Catalog 里**不要只设 Light 变体——Dark Mode 用户看到的就是纯黑,这不是 AI 的锅,是流程里少一步。
6. **iOS 18 `@Entry` 别在 iOS 17 目标里用**——会编译失败;`@Entry` 是 iOS 18+ 的语法糖。
7. **Figma MCP 翻译到 SwiftUI**目前没有零损耗路径,接受"先出 SwiftUI 草稿 → 人审 → AI 再细化"的来回。
8. **测试不要依赖 AI 自动写 Snapshot 基线**——首版基线必须人工录,AI 的基线很容易"自己跑通自己"。
9. **`AnyView` 是 AI 的万能胶水**,出现频次过高就该警惕——绝大多数情况能用 `@ViewBuilder` 或泛型替换。
10. **`Material` 模糊背景别和 `Color.red` 混**——Material 自带语义色通道,硬编码色会让 Dark Mode 失效。

---

## A2. Web 落地(Tailwind v4 × shadcn)

### Tailwind v4 的 `@theme` 指令与 CSS 变量

**读者画像**:你听过 Tailwind v4 跟 v3 完全不一样,但没动过手。

Tailwind v4(2025 年发布,截至 2026-08 仍是主线)把"配置驱动"换成"**CSS 变量驱动**":你不再写 `tailwind.config.ts`,直接在 CSS 里用 `@theme` 块声明 Token,Tailwind 自动产出对应的 utility class。
*(来源:Tailwind CSS v4 文档 / Theme,已核对,日期 2026-08-05,URL: <https://tailwindcss.com/docs/theme>)*

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --color-brand-500: oklch(0.62 0.18 280);
  --color-brand-600: oklch(0.55 0.20 280);
  --spacing: 4px;            /* 基础间距单位 */
  --radius-md: 8px;
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
}
```

这一段会自动产出:`bg-brand-500` / `text-brand-500` / `rounded-md` / `p-4`(因为 `--spacing: 4px` 让 `p-4 = 16px`)、`font-sans` 等 utility。**不需要 `tailwind.config.ts` 了**(可选,用于 legacy 插件兼容)。

关键命名空间表(摘自官方文档):

| 变量前缀 | 自动生成的 utility |
|---|---|
| `--color-*` | `bg-*`、`text-*`、`fill-*`、`border-*` |
| `--font-*` | `font-sans` / `font-poppins` |
| `--text-*` | `text-xl` / `text-3xl` |
| `--font-weight-*` | `font-bold` / `font-medium` |
| `--tracking-*` | `tracking-wide` |
| `--leading-*` | `leading-tight` |
| `--breakpoint-*` | `sm:*` / `3xl:*` 变体前缀 |
| `--container-*` | `@sm:*` 容器查询变体、`max-w-md` |
| `--spacing-*` | `p-4` / `max-h-16` / `gap-2` |
| `--radius-*` | `rounded-sm` / `rounded-2xl` |
| `--shadow-*` | `shadow-md` / `shadow-lg` |
| `--animate-*` | `animate-spin` / 自定义动画 |

#### A2.1 三个进阶指令

```css
/* @theme inline:把 utility 直接用"变量的值"而不是"变量本身",
   避免嵌套上下文里 CSS 变量解析不到 */
@theme inline {
  --color-primary: var(--brand-500);   /* bg-primary 直接用色值,不引用变量 */
}

/* @theme static:把所有声明的变量都吐到产物 CSS(默认是按需裁剪) */
@theme static {
  --color-feedback: var(--brand-300);
}

/* 完整重置:把默认主题全清,自己定义 */
@theme {
  --*: initial;                         /* 清空所有默认 token */
  --spacing: 4px;
  --color-lagoon: oklch(0.72 0.11 221);
}
```

`@theme inline` 是和 shadcn 的"语义 CSS 变量"配合最关键的指令——下面 shadcn 章节会再讲。
*(来源:同上)*

---

### shadcn 的"代码即设计"哲学

**读者画像**:你厌倦了"装个 MUI 改个色要先 fork → patch-package → 等维护者合"的痛苦。

shadcn/ui 不把自己定位成"组件库",而是"**你怎么构建自己的组件库的指南**"。核心做法是:**通过 CLI 把组件源码直接复制到你的项目里,你拥有它**。
*(来源:shadcn/ui 官方文档,已核对,日期 2026-08-05,URL: <https://ui.shadcn.com/docs>)*

```bash
# 新项目脚手架(2026 年当前版本)
pnpm dlx shadcn@latest init -t next     # Next.js
pnpm dlx shadcn@latest init -t vite     # Vite + React
pnpm dlx shadcn@latest add button       # 添加单个组件到 src/components/ui/button.tsx
```

组件源码复制到项目里后,你可以:

- 直接改源码,不用 wrap / override
- 用同一个 `@radix-ui/react-*` 底层 + 你自己的样式变量
- 让 AI 读这些**在你仓库里**的组件代码,LLM 生成的代码就和你的设计系统天然对齐——这正是 shadcn 自称"**AI-Ready**"的原因
*(来源:同上)*

#### A2.2 shadcn 的 Token 模型:和 Figma Variables 一一对应

shadcn 用 CSS 变量作为"语义 token",命名严格遵循"**背景-前景配对**"原则:

| Token | 用途 | 典型值 |
|---|---|---|
| `--background` / `--foreground` | 应用表面 + 默认文本 | `oklch(1 0 0)` / `oklch(0.145 0 0)` |
| `--card` / `--card-foreground` | 卡片表面 | 同上派生 |
| `--popover` / `--popover-foreground` | 弹层表面 | |
| `--primary` / `--primary-foreground` | 高强调操作 | 主品牌色 |
| `--secondary` / `--secondary-foreground` | 低强调操作 | |
| `--muted` / `--muted-foreground` | 弱化描述 | |
| `--accent` / `--accent-foreground` | 交互态(hover/focus) | |
| `--destructive` / `--destructive-foreground` | 错误 / 危险操作 | |
| `--border` / `--input` / `--ring` | 描边 / 输入框 / 焦点环 | |
| `--chart-1` … `--chart-5` | 图表调色 | |
| `--radius` | 全局圆角基准 | `0.5rem` |

*(来源:shadcn/ui Theming,已核对,日期 2026-08-05,URL: <https://ui.shadcn.com/docs/theming>)*

`components.json` 里通过 `"cssVariables": true` 启用这套语义层,Tailwind 同时暴露 `bg-background` / `text-foreground` / `border-border` 等 utility。Dark Mode 在 `.dark` 选择器里**覆盖同一批变量**:

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.62 0.18 280);
  /* ... */
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.72 0.18 280);
  /* ... */
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  /* 把 shadcn 的语义 token "喂"给 Tailwind,产出 bg-primary 等 utility */
}
```

**注意 `:root` 和 `@theme inline` 的分工**:前者是 shadcn 的"运行时主题切换源",后者是 Tailwind 的"utility 工厂"。Dark Mode 切的是 `:root` 变量,`@theme inline` 把它们原样映射成 utility。

---

### Claude Code × Next.js / Vite 流水线

**读者画像**:你已经在用 Claude Code 改 React,但没把 Figma 接上。

#### A2.3 五步流水线在 Web 侧的镜像

| 步骤 | Android | iOS | Web |
|---|---|---|---|
| 1 Token | Material Theme Builder | Tokens Studio | **shadcn `components.json` + CSS 变量** |
| 2 组件契约 | Figma Frame | 同 | 同 |
| 3 读取 + 计划 | Claude Code + Figma MCP | 同 | 同 |
| 4 生成代码 | Compose + Preview | SwiftUI + #Preview | **React + Tailwind v4 utility + shadcn 组件** |
| 5 回归 | Paparazzi / Roborazzi | SnapshotTesting | **Playwright / Chromatic / VRT** |

#### A2.4 实际可跑的 prompt

```
读 Figma Frame `CheckoutPage` (node-id 2:18),用 figma MCP。

- 调 get_design_context 已经直接返回 React + Tailwind 表示,
  这是我们的目标产物。请直接落到 app/(marketing)/checkout/page.tsx。
- 调 get_variable_defs,把所有 Variables 对位到 app/globals.css 的
  shadcn 语义 token(--primary / --secondary / --radius 等),
  严格保持"背景-前景配对"命名。
- 组件优先用 pnpm dlx shadcn@latest add 装的现有组件(button/card/input),
  不要重新发明。
- 跑完 pnpm tsc --noEmit && pnpm lint 给我看结果。
```

#### A2.5 Web 侧 MCP 现状

- **Figma MCP**:与 Android / iOS 完全一致,Claude Code 用 `claude mcp add --transport http figma https://mcp.figma.com/mcp`。
- **shadcn MCP**:截至 2026-08,**未查到 shadcn 官方 MCP 服务器**——但 shadcn 本身就有 CLI(`shadcn add`)+ 注册表(Registry)规范,Claude Code 完全可以**直接执行 shadcn CLI** 来添加组件,不需要 MCP。
  *(未查到官方 MCP,留作可深挖;但 shadcn 的"AI-Ready"哲学本身就把 CLI 当 MCP 用)*
- **pen.dev MCP**:Web 项目里也跑得起来,详见仓库内 `topics/pencil-claude-code-best-practices.html` 专题。
- **Claude Code MCP 总入口**:见官方文档,涵盖 stdio / http / sse 三种 transport。
  *(来源:Claude Code Docs / MCP,已核对,日期 2026-08-05,URL: <https://code.claude.com/docs/en/mcp>)*

#### A2.6 视觉回归(Chromatic / Playwright / VRT)

- **Chromatic**(Storybook 团队出品):按组件截图 diff,适合"组件级别"回归,需 Storybook。
- **Playwright Visual Comparisons**:截图级别,可针对路由。免费、本地能跑。
- **VRT(Visual Regression Tests)**:泛指,各家自建。
- **首选**:新项目直接用 Playwright 的 `toHaveScreenshot()`,无需第三方服务。

---

### 避坑清单(Web 侧)

1. **CSS 变量名与 Tailwind utility 重名**会冲突。`@theme { --color-red-500: ... }` 会覆盖 Tailwind 内置的同名色——别在 `--color-*` 命名空间下用 `red / blue / green` 这种通用名,用品牌前缀(`--color-brand-primary`)。
2. **`@theme` 必须在 CSS 顶层声明**,嵌套在 `@layer` / `@media` 里不生效。
3. **`@theme inline` 漏了**:当你 shadcn 的语义 token(`--primary`)和 Tailwind utility(`bg-primary`)跨上下文传递值时,可能解析不到——务必用 `inline`。
4. **Tailwind v4 的 PostCSS 插件换成了 Lightning CSS**——老的 `tailwind.config.ts` 自动检测行为变化,如果项目里还残留 v3 配置,删干净。
5. **shadcn 的 `components.json` 一旦关闭 `cssVariables` 就回不去**——`init --no-css-variables` 之后想开回 CSS 变量模式,必须删了所有已装组件再重装。**默认开**。
6. **`pnpm dlx shadcn@latest init` 会改 `globals.css`、`tailwind.config`(`tsconfig.json`)、`components.json`**,先把这些文件备份或提交到 git 再跑。
7. **Dark Mode 别用 `dark:` 前缀**(Tailwind v4 默认策略变了,改用 `.dark` 类下覆盖 `:root` 的 CSS 变量)。
8. **Chromatic / Playwright 的截图基线一定要人工首次录**,AI 自动录的基线很可能"自己跑通自己"。
9. **shadcn 组件源码里有 `@radix-ui/*` 依赖**——删组件源码时记得 `pnpm remove`,否则 Radix 包永远留在 deps 里。
10. **`pnpm dlx shadcn@latest add` 加的组件**默认用了 Tailwind 内置动画 `animate-in/out`,和你的 `@theme` 自定义动画冲突时,改 `tailwind.config` 的 `theme.extend.keyframes`。

---

## A3. 三端对比速查表

| 维度 | Android(正文已详) | iOS(SwiftUI) | Web(Tailwind v4 + shadcn) |
|---|---|---|---|
| **设计 Token 一等公民** | `MaterialTheme.colorScheme`(Compose) | `@Entry` 自定义 `BrandTheme`(iOS 18+)/ `EnvironmentKey`(iOS 17) | CSS 变量 + `@theme inline`(Tailwind v4) |
| **官方桥:设计 → 代码** | Material Theme Builder 导出 Compose | Tokens Studio + Style Dictionary 编译 Swift | shadcn `components.json` + CSS 变量手写 / Style Dictionary 编译 |
| **Figma MCP** | ✅ 原生,五步流水线已验证 | ✅ 原生,工具集完全一致,需自翻译 React→SwiftUI | ✅ 原生,`get_design_context` 直接出 React+Tailwind |
| **AI 写 UI 代码质量** | 强(Compose 模板化高) | 强(单 View)/ 弱(手势、性能) | 强(React + Tailwind 是 AI 训练数据主场) |
| **真机/虚拟截图回归** | Paparazzi / Roborazzi(JVM,秒级) | SnapshotTesting(simulator,慢) | Playwright / Chromatic / VRT |
| **品牌色规范** | Material Theme Builder | Asset Catalog Color Set(Light/Dark/High Contrast) | `:root` + `.dark` 双套 CSS 变量 |
| **动态色 vs 品牌色** | `dynamicLightColorScheme()` 或品牌色 | Asset Catalog 默认走语义色,品牌色单独定义 | shadcn 默认中性 token,品牌色覆盖 `--primary` |
| **响应式布局 Token** | `Modifier.fillMaxWidth()` / BoxWithConstraints | `.containerRelativeFrame()`(iOS 17+) | Tailwind breakpoint + `@container` 查询 |
| **设计稿同步 AI 的最快路径** | Figma MCP + Material Theme Builder | Figma MCP + Tokens Studio | Figma MCP + shadcn CLI |
| **AI 不擅长的事** | State hoisting / hoisted preview | 手势 / Combine / SwiftData migration | `tailwind.config` v3→v4 迁移 / Radix 内部 |

---

## A4. 来源清单(核对日期 2026-08-05)

1. **Apple HIG / Foundations(总目录)** — <https://developer.apple.com/design/human-interface-guidelines/foundations>
   > Apple 官方设计准则门户,涵盖 Color / Typography / Materials / Dark Mode / Accessibility。

2. **Apple HIG / Foundations / Color** — <https://developer.apple.com/design/human-interface-guidelines/foundations/color>
   > 语义色、SF Symbols、Dynamic Type、Asset Catalog 集成,SwiftUI `Color` 的官方指引。

3. **SwiftUI `containerRelativeFrame(_:alignment:)`** — <https://developer.apple.com/documentation/swiftui/view/containerrelativeframe(_:alignment:)>
   > iOS 17+ 引入,响应式布局的官方姿势,签名 / 参数 / 示例均有。

4. **SwiftUI `@Entry` 宏** — <https://developer.apple.com/documentation/swiftui/entry>
   > iOS 18+ 自定义 `EnvironmentValues` 的简洁写法,替代传统 `EnvironmentKey`。

5. **Tailwind CSS v4 / Theme 文档** — <https://tailwindcss.com/docs/theme>
   > `@theme` 指令完整语法、命名空间表、`@theme inline` / `@theme static` / `--*: initial` 重置用法。

6. **shadcn/ui 文档(总目录)** — <https://ui.shadcn.com/docs>
   > "代码即设计"哲学、CLI 安装、Registry 模型、AI-Ready 设计。

7. **shadcn/ui Theming** — <https://ui.shadcn.com/docs/theming>
   > 语义 CSS 变量命名表、`components.json` 配置、`@theme inline` 接入、`--radius` 圆角基准。

8. **shadcn/ui CLI 安装** — <https://ui.shadcn.com/docs/installation>
   > `pnpm dlx shadcn@latest init -t <framework>` 命令、支持的框架列表(Next.js / Vite / Astro / TanStack Start / React Router / Laravel)。

9. **Style Dictionary 官网** — <https://styledictionary.com/>
   > 多端 Token 编译器(iOS / Android / CSS / JS / HTML),DTCG 规范对齐,Live Demo 可上传 JSON 试编译。

10. **Tokens Studio for Figma 文档** — <https://docs.tokens.studio/>
    > Figma 端 Token 管理、Style Dictionary Transforms、GitHub/GitLab/JSONBin 同步能力。

11. **Claude Code Docs / MCP** — <https://code.claude.com/docs/en/mcp>
    > Claude Code 通过 Model Context Protocol 连接外部工具的官方参考,涵盖 stdio/http/sse 三种 transport。

12. **pen.dev 文档总目录** — <https://docs.pencil.dev/>
    > 设计 ↔ 代码同步、`.pen` 文件格式、AI 集成入口。本附录不深入,详见仓库内 `topics/pencil-claude-code-best-practices.html` 专题。

---

### 未查到官方来源,留作可深挖(诚实声明)

> 小主,以下三项我**没**在 2026-08-05 这一天的官方文档里查到"完整可直接落地"的证据,本文涉及它们的部分按"实战惯例"给出,但**不要把它们当成 Apple / Figma / shadcn 的官方承诺**:

1. **iOS 端"无设备 SwiftUI 截图回归"工具** — Android 侧 Paparazzi / Roborazzi 是 Cash App / Square 出品的成熟方案,iOS 侧目前只能用 SnapshotTesting(Point-Free)+ simulator,或在 CI 起真模拟器。Apple 没出官方等价物。
2. **Figma 官方 "Copy as SwiftUI" 功能** — 官方 Dev Mode 提供 "Copy as Compose / React / HTML / CSS" 但**没看到 SwiftUI**,社区插件质量参差。
3. **shadcn 官方 MCP 服务器** — shadcn 没发布官方 MCP,但其 CLI + Registry 本身就具备 MCP 般的"AI 友好"特性;社区有零星 MCP 包装,质量未知。

如果哪位读者在一手文档里查到这些,欢迎补 PR。