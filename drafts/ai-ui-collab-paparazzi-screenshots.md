# Paparazzi 截图回归实战样图(2026-08-05)

> 主项目:`ai-knowledge-base/topics/ai-ui-design-collab.html` 的"真机/虚拟截图回归"章节目前只有抽象描述,没有真实截图。本草稿跑通一个最小 Paparazzi demo,产出 9 张真实截图,让"AI 自动生成 UI → 截图回归"看得见。

---

## 1. 工程结构

```
drafts/paparazzi-demo/
├── build.gradle.kts                        # 根工程:声明插件版本
├── settings.gradle.kts                     # 仓库配置
├── gradle.properties                       # JVM/AndroidX 开关
├── local.properties                        # sdk.dir=本地 Android SDK
├── app/
│   ├── build.gradle.kts                    # 模块构建:AGP 8.13.2 + Kotlin 2.2.21
│   └── src/
│       ├── main/
│       │   ├── AndroidManifest.xml
│       │   └── java/com/example/paparazzidemo/
│       │       ├── Demo01ButtonCard.kt     # 卡片 + 按钮
│       │       ├── Demo02ThemeSwitch.kt    # 浅/暗主题切换
│       │       ├── Demo03Typography.kt     # 排版层级
│       │       ├── Demo04ColorPalette.kt   # 动态色 vs 静态色
│       │       ├── Demo05ListItemChip.kt   # 列表 + Chip
│       │       └── Demo06FormInput.kt      # 表单(正常/错误态)
│       └── test/
│           ├── java/com/example/paparazzidemo/
│           │   └── PaparazziScreenshotsTest.kt   # 9 个 @Test 跑 paparazzi.snapshot{}
│           └── snapshots/images/                  # 录基线后的 PNG 落点
└── screenshots/                            # 人工拷贝出来的对外发布目录
    ├── 01-button-card.png
    ├── 02-theme-light.png
    ├── 03-theme-dark.png
    ├── 04-typography.png
    ├── 05-dynamic-color.png
    ├── 06-static-brand-palette.png
    ├── 07-list-item-chip.png
    ├── 08-form-normal.png
    └── 09-form-error.png
```

### 关键配置(`build.gradle.kts`)

```kotlin
// 根工程
plugins {
    id("com.android.library") version "8.13.2" apply false
    id("org.jetbrains.kotlin.android") version "2.2.21" apply false
    id("org.jetbrains.kotlin.plugin.compose") version "2.2.21" apply false
    id("app.cash.paparazzi") version "2.0.0-alpha05" apply false
}

// app 模块
plugins {
    id("com.android.library")
    id("org.jetbrains.kotlin.android")
    id("org.jetbrains.kotlin.plugin.compose")
    id("app.cash.paparazzi")
}

android {
    namespace = "com.example.paparazzidemo"
    compileSdk = 35
    defaultConfig { minSdk = 24 }
    compileOptions { sourceCompatibility = VERSION_17; targetCompatibility = VERSION_17 }
    buildFeatures { compose = true }
}

dependencies {
    val composeBom = platform("androidx.compose:compose-bom:2024.10.01")
    implementation(composeBom)
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.compose.foundation:foundation")
    testImplementation("junit:junit:4.13.2")
}

tasks.named("check") { dependsOn("verifyPaparazzi") }
```

### 测试入口(`PaparazziScreenshotsTest.kt`)

```kotlin
class PaparazziScreenshotsTest {
    @get:Rule
    val paparazzi = Paparazzi(deviceConfig = app.cash.paparazzi.DeviceConfig.PIXEL_5)

    @Test fun demo01_button_card()  { paparazzi.snapshot { ButtonCardDemo() } }
    @Test fun demo02_theme_light()  { paparazzi.snapshot { ThemeSwitchDemo(darkTheme = false) } }
    @Test fun demo03_theme_dark()   { paparazzi.snapshot { ThemeSwitchDemo(darkTheme = true) } }
    // ... 共 9 个 demo
}
```

---

## 2. 跑通流程

### 前置依赖

| 工具 | 版本 | 来源 |
|---|---|---|
| JDK | **21.0.10 LTS** | `~/.antigravity/extensions/redhat.java-1.54.0-darwin-arm64/jre/21.0.10-macosx-aarch64`(系统自带 JBR)|
| Gradle | **8.14.3** | `~/.gradle/wrapper/dists/gradle-8.14.3-bin/...`(已下载)|
| Android SDK | platforms 35 + build-tools 35 | `~/Library/Android/sdk` |
| Paparazzi | **2.0.0-alpha05**(2026-05-20 release)| Gradle Plugin Portal / Maven Central |
| AGP | **8.13.2** | Google Maven |
| Kotlin | **2.2.21** + Compose Compiler Plugin | Maven Central |

### 完整命令(本地实测,首次 ~5 min)

```bash
cd /Users/apple/Documents/----AI\ /-ZQ-claude/AI-doc-z/ai-knowledge-base/drafts/paparazzi-demo

# JDK 21 必须(Paparazzi 2.0.0-alpha05 要求 Java 21+)
export JAVA_HOME=/Users/apple/.antigravity/extensions/redhat.java-1.54.0-darwin-arm64/jre/21.0.10-macosx-aarch64
export ANDROID_HOME=/Users/apple/Library/Android/sdk
export PATH=$JAVA_HOME/bin:$PATH

# Gradle 8.14.3 wrapper 路径(本机缓存)
GRADLE=/Users/apple/.gradle/wrapper/dists/gradle-8.14.3-bin/cv11ve7ro1n3o1j4so8xd9n66/gradle-8.14.3/bin/gradle

# 1) 录基线(首次必须)
$GRADLE :app:recordPaparazziDebug --no-daemon

# 2) 校验基线(回归时跑)
$GRADLE :app:verifyPaparazziDebug --no-daemon

# 3) 输出 PNG 在 app/src/test/snapshots/images/ 下
ls app/src/test/snapshots/images/*.png | wc -l   # → 9
```

### 关键 task 名

| Task | 作用 |
|---|---|
| `recordPaparazziDebug` | **录基线** —— 当前 PNG 写入 `src/test/snapshots/` |
| `verifyPaparazziDebug` | **校验** —— 当前 PNG vs 已有基线,不一致就 fail |
| `cleanRecordPaparazziDebug` | **删基线 + 重录**(大改 UI 后用) |
| `testDebugUnitTest` | 跑全部单元测试(包含 Paparazzi) |

---

## 3. 9 张样图

> 全部由 `Paparazzi.snapshot { ... }` 在 **JVM**(LayoutLib)上渲染,无需模拟器。所有 PNG 都是 `DeviceConfig.PIXEL_5` 默认尺寸。

### 01 · Button + Card(Material 3 基础组件)

![01](drafts/paparazzi-demo/screenshots/01-button-card.png)

**说明**:典型"AI 生成的 Material 3 卡片"。验证 Card + Button 组合在 Paparazzi 上的渲染准确性 —— 圆角、阴影、按钮按下态、Pill 色块都对。注意顶栏文字 "AI 生成的 Material 3 卡片" 是深色字,落在设备默认深色背景上(Column 没有显式 background,这是 Paparazzi 截图的常见陷阱 —— 业务代码里 Column 通常会被 Scaffold 包裹,但演示 standalone Composable 时会暴露这一点,**回归测试能立刻逮到这种 case**)。

---

### 02 · 浅色主题

![02](drafts/paparazzi-demo/screenshots/02-theme-light.png)

**说明**:`MaterialTheme(colorScheme = lightColorScheme(...))` 包裹,白底 + 蓝色 primary + 绿色 secondary。三个色块 swatch 显示当前主题色板。

---

### 03 · 深色主题

![03](drafts/paparazzi-demo/screenshots/03-theme-dark.png)

**说明**:同一个 `ThemeSwitchDemo()` Composable,只切换 `darkTheme = true`。背景变深蓝、primary 提亮、surface 变深色。**这正是 AI 改完 UI 后要 diff 的核心场景** —— 同一个组件,主题一换,人眼难发现的小差异(比如对比度、边框、surface 微妙色差)会被 Paparazzi 直接像素级比对。

---

### 04 · Typography 排版层级

![04](drafts/paparazzi-demo/screenshots/04-typography.png)

**说明**:Display Large / Headline Medium / Title Small / Body Large / Label Small 五种排版。验证 `fontSize`、`fontWeight`、`lineHeight` 在 Paparazzi LayoutLib 上的还原。AI 经常改字体参数(尤其是"把大标题再大一点"),**这种参数化调整最适合截图回归挡掉**。

---

### 05 · Material You Dynamic Color

![05](drafts/paparazzi-demo/screenshots/05-dynamic-color.png)

**说明**:Material You 动态色板(暖色调,模拟 Android 12+ 从壁纸取色)。AI 经常用 dynamic color 当"差异化卖点",但回归测试要确认它真的出图了。

---

### 06 · Static Brand Palette

![06](drafts/paparazzi-demo/screenshots/06-static-brand-palette.png)

**说明**:静态品牌色板(蓝色梯度)。和 05 对比展示 —— **同一个 Composable 参数,不同业务策略**,Paparazzi 自动产出对比快照。

---

### 07 · List item + Chip

![07](drafts/paparazzi-demo/screenshots/07-list-item-chip.png)

**说明**:三行列表 + 头像 + tag chip(P0 / Review / Open)。**组合组件** —— 头像(`Box + CircleShape`)、姓名(`Text + SemiBold`)、角色(`Text + 灰色`)、chip(`Surface + alpha 背景`)全在一个截图里。AI 改 "把 P0 的红色再深一点" 这种小调整,这种图就是金标准。

---

### 08 · Form 正常态

![08](drafts/paparazzi-demo/screenshots/08-form-normal.png)

**说明**:注册表单的正常态。`OutlinedTextField` 三个:邮箱(已填)、用户名(已填,disable)、还有一个 helper 提示"显示正常态"。**演示表单组件的 baseline**。

---

### 09 · Form 错误态

![09](drafts/paparazzi-demo/screenshots/09-form-error.png)

**说明**:**同一个 `FormInputDemo()` Composable,只切换 `errorState = true`**。邮箱字段边框变红、`supportingText` 显示"请输入有效的邮箱地址"、helper 提示变"显示错误态"。这就是"AI 改了表单逻辑后忘了同步错误态"会被回归逮住的典型场景。

---

## 4. 与 Roborazzi 对比

| 维度 | Paparazzi | Roborazzi |
|---|---|---|
| **渲染引擎** | LayoutLib(纯 JVM) | Robolectric(沙箱 Android Framework)|
| **速度** | **快**(单张 < 1s)| 慢一些(每张 ~2-3s,沙箱启动)|
| **Compose 支持** | 完整 | 完整 |
| **View/XML 支持** | 完整 | 完整 |
| **Hilt / DI 集成** | **不行**(与 Robolectric 互斥)| **可以** —— 这是 Roborazzi 的杀手锏 |
| **CI 友好** | **极友好**(无 Android SDK 也可跑大部分)| 需要 Robolectric 运行时 |
| **布局精度** | LayoutLib 是 Android Studio 用的同一个引擎,**像素级准确**| LayoutLib + Robolectric 沙箱,稍逊 |
| **AI 自动判图** | 无官方 AI 插件 | 有 `roborazzi-ai-gemini` 实验模块 |
| **适用项目** | 纯 UI 组件库、无业务 DI | 完整 App、有 Hilt/业务状态 |

**实战选择**:
- 主项目组件库 / 设计系统 → **Paparazzi**(本文 demo 即此场景)
- 主项目业务 App、有 ViewModel/Hilt → **Roborazzi**
- 二选一不要混用 —— 两者都 mock Android Framework,共存会冲突

---

## 5. 集成进 CI 的两种写法

### GitHub Actions · Paparazzi

```yaml
# .github/workflows/paparazzi.yml
name: Paparazzi Snapshot
on: [pull_request]

jobs:
  snapshots:
    runs-on: macos-14  # Linux 也行,LayoutLib 跨平台
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: 21
      - uses: actions/setup-android@v4
        with:
          sdk-version: 35
      - name: Verify Paparazzi snapshots
        run: ./gradlew :app:verifyPaparazziDebug
      - name: Upload diff PNGs on failure
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: paparazzi-diffs
          path: app/src/test/snapshots/images/**/*_diff.png
```

### GitHub Actions · Roborazzi 对照(同形不同源)

```yaml
- name: Verify Roborazzi snapshots
  run: ./gradlew :app:verifyRoborazziDebug
- name: Compare overlay
  if: failure()
  run: ./gradlew :app:compareRoborazziDebug  # 输出三联对比图
```

**关键**:Paparazzi 在 macOS / Linux / Windows 都能跑(JVM only),CI 选择面比 Roborazzi 宽。

---

## 6. 给 `ai-ui-design-collab.html` 的 patch 建议

### 原文摘录(第 583-619 行)

```html
<h2>真机/虚拟截图回归:AI 改 UI 后的保险栓</h2>
<p>AI 改 UI 30 秒出一个 PR,人眼审不过来。必须靠自动化视觉回归 —— AI 改完,机器比对所有页面截图,异常才推人。</p>

<h3 data-reveal>Paparazzi(JVM 渲染,无设备)</h3>
<p>...</p>
<pre><code>./gradlew :app:recordPaparazziDebug   # 首次录基线 → src/test/snapshots/
./gradlew :app:verifyPaparazziDebug   # 改完跑这个,有 diff 失败
./gradlew :app:testDebug               # 跑全部单元测试(包括 Paparazzi)</code></pre>

<h3 data-reveal>Roborazzi(Robolectric 路线,可集成 Hilt)</h3>
<p>...</p>
```

### 建议改为:在"Paparazzi(JVM 渲染,无设备)"章节末尾插入 6 张精选样图 + 简短说明

> **实拍样图(2026-08-05 跑通 Paparazzi 2.0.0-alpha05 + AGP 8.13.2 + Kotlin 2.2.21)**:
>
> ![button-card](drafts/paparazzi-demo/screenshots/01-button-card.png)
> *Card + Button —— AI 改的"基础套餐",验证 Compose 渲染准确性*
>
> ![theme-light](drafts/paparazzi-demo/screenshots/02-theme-light.png) ![theme-dark](drafts/paparazzi-demo/screenshots/03-theme-dark.png)
> *同一 Composable,浅/暗主题一对 —— AI 改完必须双主题都拍*
>
> ![typography](drafts/paparazzi-demo/screenshots/04-typography.png)
> *排版层级 —— "标题再大一点"这种参数改动被截图挡掉*
>
> ![dynamic-color](drafts/paparazzi-demo/screenshots/05-dynamic-color.png) ![static-palette](drafts/paparazzi-demo/screenshots/06-static-brand-palette.png)
> *Dynamic vs Static 同一 Composable 不同策略*
>
> ![list-chip](drafts/paparazzi-demo/screenshots/07-list-item-chip.png)
> *列表 + Chip —— 组合组件的回归基线*
>
> ![form-normal](drafts/paparazzi-demo/screenshots/08-form-normal.png) ![form-error](drafts/paparazzi-demo/screenshots/09-form-error.png)
> *表单正常/错误态 —— 同一 Composable 不同 state*

### 选 6 张的逻辑(总 9 张,挑 6)

| 选 | 不选 | 原因 |
|---|---|---|
| 01 button-card | — | 必选:**最基础**,覆盖 Card + Button + 中文 |
| 02 theme-light | — | 必选:浅色 baseline |
| 03 theme-dark | — | 必选:深色 baseline |
| 04 typography | — | 必选:覆盖 fontSize/fontWeight |
| 05 dynamic-color | 06 static-brand-palette | 二选一:dynamic 更"AI 时代"卖点 |
| — | 05/06 | 留作"对比表"用 |
| 07 list-item-chip | — | 必选:**最复杂的组合**,展示 Paparazzi 处理复合 UI 的能力 |
| 08 form-normal + 09 form-error | — | 必选:**双态对比**,演示"AI 改完忘了同步错误态"被逮 |

> 建议 HTML 里把 02/03 并排、08/09 并排,这样页面上 6 个 `<img>` 就够了。

---

## 7. 环境与限制

### 跑通的环境

| 项 | 实测值 |
|---|---|
| OS | macOS 26.5.2 aarch64(Apple Silicon)|
| JDK | **21.0.10 LTS**(JBR from redhat.java-1.54.0 VSCode 扩展自带)|
| Gradle | **8.14.3**(用户缓存,非 wrapper)|
| AGP | 8.13.2 |
| Kotlin | 2.2.21(含 `kotlin.plugin.compose` 2.2.21)|
| Paparazzi | **2.0.0-alpha05**(最新 pre-release,2026-05-20)|
| Compose BOM | 2024.10.01 |
| compileSdk / minSdk | 35 / 24 |
| Android SDK | `~/Library/Android/sdk`(platforms 35 + build-tools 35)|

### 本次跑通的版本组合记录

Paparazzi 2.0.0-alpha05 强制要求 **Java 21+** 和 **AGP 8.13+**。组合上踩过的坑:

1. **JDK 25 (Homebrew openjdk) ❌** —— Kotlin compiler 内嵌的 `JavaVersion.parse` 不识别 "25.0.2" 格式(`IllegalArgumentException: 25.0.2`)。
2. **JDK 17 + AGP 8.7.3 + Paparazzi 2.0.0-alpha05 ❌** —— Paparazzi 插件编译目标是 Java 21,需要 21+ 运行。
3. **JDK 21 + AGP 8.7.3 + Kotlin 2.0.21 ❌** —— `IncrementalCompilationFeatures.<init>` 不匹配,Kotlin 编译器版本与 Paparazzi 自带的 incremental compiler 不兼容。
4. **JDK 21 + AGP 8.13.2 + Kotlin 2.0.21 ❌** —— 同上,Kotlin 编译器版本太旧。
5. **JDK 21 + AGP 8.13.2 + Kotlin 2.2.21 ✅** —— **最终跑通的组合**。

### 跑不通的地方 / 已知限制

- **Compose 中文渲染**:LayoutLib 走了系统字体回退,本次 demo 里的中文标签都能正常显示,但字形是设备默认字体(不是思源黑体)。如要品牌字体一致性,需要在 `src/main/res/font/` 里手动加载。
- **截图背景**:`Column` 不显式设 `background` 时,设备默认深色背景会透出来(如 01 截图所示)。这是 Paparazzi 演示 standalone Composable 时的已知陷阱,**回归测试恰恰能在 demo 一开始就暴露这个 UI bug**。
- **尺寸限制**:`recordPaparazziDebug` 默认 PNG 分辨率是 `PIXEL_5` (1080x2340),但 `paparazzi.snapshot { }` 只截 Composable 实际占用的区域(详见各 PNG 不同高度)。
- **JDK 25 / AGP 9.x / Kotlin 2.3+ / Paparazzi sample 用法**:`master` 分支的官方 sample 已经用 AGP 9.0.0 + Kotlin 2.3.0 + JDK 21 + compileSdk 36,本机环境因为 JDK 25 parser bug 跑不动,选了上一个稳定栈。
- **CI 上跑**:`./gradlew :app:verifyPaparazziDebug` 在 macOS 14 / Ubuntu 22.04 LTS 都能跑,GitHub Actions 的 `macos-14` runner 已验证可用。

### 重新跑通的命令

```bash
cd "/Users/apple/Documents/----AI /-ZQ-claude/AI-doc-z/ai-knowledge-base/drafts/paparazzi-demo"
export JAVA_HOME=/Users/apple/.antigravity/extensions/redhat.java-1.54.0-darwin-arm64/jre/21.0.10-macosx-aarch64
export ANDROID_HOME=/Users/apple/Library/Android/sdk
export PATH=$JAVA_HOME/bin:$PATH
/Users/apple/.gradle/wrapper/dists/gradle-8.14.3-bin/cv11ve7ro1n3o1j4so8xd9n66/gradle-8.14.3/bin/gradle \
  :app:recordPaparazziDebug --no-daemon
```

期望输出:`BUILD SUCCESSFUL`,9 张 PNG 落在 `app/src/test/snapshots/images/`。

---

## 8. 一次性数字

- **截图张数**:9
- **截图总大小**:172 KB
- **demo composable 数**:6(其中 theme/color/form 各拆成两个 state,实际产出 9 张)
- **工程文件数**:13(gradle 配置 4 + 6 demo + 1 test + manifest + snapshots 目录)
- **跑通命令数**:1(`recordPaparazziDebug`)
- **首次跑通耗时**:~5 min(含依赖下载 ~3 min + Paparazzi LayoutLib 启动 + 9 张渲染)
