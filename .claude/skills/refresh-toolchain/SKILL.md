---
name: refresh-toolchain
description: 核对并更新本知识库里 Claude Code 与 Codex 的版本信息。当用户说"跑一次工具版本核对""更新指南到最新""检查指南有没有过时""刷新 changelog"时使用。会拉官方 changelog、筛选出有实际影响的变化、回写到三个页面并重跑搜索索引。
---

# 工具版本核对与更新

把 Claude Code 与 Codex 的最新变化,核对并回写进本知识库。

## 为什么需要这套流程

这个知识库的核心卖点是"每条结论都有出处、不瞎编"。AI 工具迭代极快(Claude Code 大约 1-2 天一个版本),一旦指南里的命令改了名、默认值变了、语义反转了而没跟上,**它就从"资料"变成了"错误信息"**——读者照着做会踩坑,这比没有这个知识库更糟。

所以这套流程的重点不是"把新东西加上",而是**反查旧内容有没有被推翻**。

## 第 0 步:确认当前日期(不能跳过)

```bash
date +%Y-%m-%d
```

必须先拿到真实当前日期。跳过这一步会导致基于过时认知判断"这算不算新",是最容易犯的错。

同时读出上次核对日期(在页面顶栏和 hero 徽章里):

```bash
grep -o "核对至 [0-9-]*" topics/claude-code-guide.html topics/codex-guide.html topics/toolchain-changelog.html
```

本次要覆盖的时间范围 = 上次核对日期 → 今天。

## 第 1 步:拉官方 changelog

只信这两个一手源:

| 工具 | 官方 changelog |
|---|---|
| Claude Code | `https://code.claude.com/docs/en/changelog` |
| Codex | `https://learn.chatgpt.com/docs/changelog` |

用 WebFetch 拉取,prompt 里明确写出时间范围,并要求重点提取:新模型、新斜杠命令、新 CLI 参数、子代理/MCP/hooks/沙箱权限的变化、以及**任何标记为 breaking 或 deprecated 的条目**。

Codex 官方 changelog 偏 App 侧,CLI 细节不足时补充搜索,但**二手源只能用来发现线索,不能直接作为写入依据**——凡是要写进"破坏性变更"表的,必须在官方源核对过。

## 第 2 步:三分类筛选

| 分类 | 标准 | 标记 |
|---|---|---|
| 破坏性变更 | 老写法/老命令/老配置会失效或行为反转 | 🔴 |
| 行为变化 | 命令参数都还在,但结果或时机变了 | 🔄 |
| 新增能力 | 新命令、新配置项、新模型 | 🆕 |

**不收录**:纯内部重构、性能优化(除非可感知)、极小众平台修复(除非很多人会踩,如 Windows 路径)、预览/实验特性(等 GA)。

宁可少收也不要收错——这一页的价值在可信度,不在完整度。

## 第 3 步:反查旧内容(最容易漏,别跳)

拿着第 2 步筛出来的变化列表,**逐条反查两份指南的正文有没有因此变错**:

- 命令改名了 → 全文搜旧命令名,确认每处的语义
- 默认值变了 → 搜相关配置项与表格
- 模型换代了 → 搜型号字符串(如 `gpt-5.4`、`Opus 4.8`),包括代码块与配置示例里的
- 参数选项增删 → 搜参数表

```bash
# 示例:核查模型型号是否还有旧的残留
grep -n "Opus 4\.\|gpt-5\.4\|Sonnet 4" topics/claude-code-guide.html topics/codex-guide.html
```

**发现正文写错的,优先级高于新增内容**。错误信息的危害大于信息缺失。

## 第 4 步:回写四个位置

| 位置 | 写什么 |
|---|---|
| `topics/toolchain-changelog.html` 对应月份 section | 完整条目,带日期/版本号/分类标记 |
| `topics/toolchain-changelog.html` 的 `#breaking` section | 只有破坏性变更,时间倒序置顶 |
| `topics/claude-code-guide.html` 的 `#whats-new` section | Claude Code 的精简版,只留最有影响的 |
| `topics/codex-guide.html` 的 `#whats-new` section | Codex 的精简版 |

加新月份时,`toolchain-changelog.html` 需要同步加侧栏导航条目(`<a href="#m2026-08">`),否则分页机制不会把它当成一页。

**写作要求**:每条破坏性变更必须回答"你要怎么改",不能只说"变了"。参考已有条目的写法。

### CSS 类的坑

这几个页面各自内嵌 `<style>`,**可用的类各页不同**。写新内容前先确认类是否存在:

```bash
grep -c '\.dim{\|\.list{' topics/claude-code-guide.html   # 这两个类不存在,别用
```

已确认可用:`.tbl`、`.callout note|tip|warn`、`.sec-tag`、`.src`(弱化文本)、`.pill a`、`.badge`、`.stats`/`.stat`、`.divider`。列表直接用裸 `<ul>`/`<ol>`。

### 动效一致性

所有 `<h3>` 需要带 `data-reveal` 属性(全站滚动浮现动效),新写的章节标题别忘了。

## 第 5 步:更新日期标记

三个页面各有两处(顶栏 + hero 徽章),共 6 处:

```bash
grep -n "核对至" topics/claude-code-guide.html topics/codex-guide.html topics/toolchain-changelog.html
```

Claude Code 指南的顶栏还带版本号(`核对至 v2.1.220 · 2026-07-28`),要同步更新到实际最新版本号。

## 第 6 步:重跑搜索索引并提交

```bash
python3 scripts/build-search-index.py
git add -A
git commit -m "docs: 工具版本核对至 YYYY-MM-DD"
```

搜索索引也有 GitHub Action 兜底(`topics/**` 变更时自动重建),但本地跑一遍能立刻验证。

## 第 7 步:验证

```bash
# 新章节是否被索引进去
grep -c "破坏性变更" assets/js/search-index.js

# 页面结构完整性
for f in topics/claude-code-guide.html topics/codex-guide.html topics/toolchain-changelog.html; do
  echo "$f: section=$(grep -c '^<section id=' $f) navlink=$(grep -c 'href=\"#' $f)"
done
```

侧栏导航条目数应当 ≥ section 数(正文里的交叉引用会让链接数偏多,正常)。

## 收尾:如实汇报

汇报时说清楚三件事:

1. **改正了哪些错误**(旧内容被推翻的部分)——这是最有价值的部分
2. **新增了哪些变化**
3. **哪些没核实到**——比如某个二手源提到但官方 changelog 里查不到的,明确说"没查到官方出处,没写进去",不要为了显得完整而收录存疑内容
