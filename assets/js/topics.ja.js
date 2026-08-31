/* ============================================================
   AI ナレッジベース · トピック登録テーブル (Single Source of Truth)
   新規トピック追加の手順:
   1. トピック HTML を topics/ に配置 (../assets/css/site.css および
      ../assets/js/site.js を読み込むことで全サイト統一の操作性を自動取得)
   2. 以下の TOPICS 配列にオブジェクトを1つ追加
   3. 完了 —— トップページのカード、章リンク、サイト内検索が自動反映
   ============================================================ */

/* ------------------------------------------------------------
   厳選外部学習サイト:
   トップページの「厳選学習リソース」とサイト内検索で共有。
   featured: true の項目は目立つバナー形式で強調表示。
   ------------------------------------------------------------ */
const LEARN = [
  {
    href: "https://coding.stormzhang.ai/", icon: "🎓", tag: "体系的チュートリアル", color: "#f59e0b", featured: true,
    title: "AI 開発ガイド (stormzhang)",
    desc: "初心者向けの体系的チュートリアル92編：Claude Code 53編 ＋ Codex 39編。GitHubでオープンソース公開され継続メンテナンス中。入門に最適で、ステップバイステップで学習可能。本ナレッジベースと相互補完関係（入門は本サイト、日々のリファレンスは本ナレッジベース）。",
    links: [
      { label: "Claude Code 編 (53編) →", href: "https://coding.stormzhang.ai/claude-code/01-what-is-claude-code" },
      { label: "Codex 編 (39編) →", href: "https://coding.stormzhang.ai/codex/01-what-is-codex" },
      { label: "GitHub リポジトリ", href: "https://github.com/stormzhang/ai-coding-guide" }
    ]
  },
  {
    href: "https://code.claude.com/docs", icon: "📖", tag: "公式 · 第一情報源", color: "#d9634a",
    title: "Claude Code 公式ドキュメント",
    desc: "すべての仕様の第一情報源。「Best practices」ページは精読の価値あり。/release-notes で毎週の新機能を確認可能。",
    links: [ { label: "ベストプラクティス →", href: "https://code.claude.com/docs/en/best-practices" } ]
  },
  {
    href: "https://developers.openai.com/codex", icon: "📗", tag: "公式 · 第一情報源", color: "#0d9373",
    title: "Codex 公式ドキュメント",
    desc: "CLI / IDE / Cloud の全形態を網羅した権威あるリファレンス。Config と Authentication の章は頻繁に参照されます。",
    links: [ { label: "ベストプラクティス →", href: "https://developers.openai.com/codex/learn/best-practices" } ]
  },
  {
    href: "https://codexguide.io/paths", icon: "🚀", tag: "実践 · 学習パス", color: "#10b981",
    title: "CodexGuide 実践ガイド",
    desc: "4つの目標志向学習パス、選定プリズム、長時間タスクの4段階規律、メモリ完了ループ、ブラウザE2E検証、実践ケーススタディ。",
    links: [ { label: "学習パス →", href: "https://codexguide.io/paths" } ]
  },
  {
    href: "https://blakecrosley.com/guides/claude-code", icon: "🧭", tag: "英語 · 実践ガイド", color: "#6366f1",
    title: "Blake Crosley ガイド",
    desc: "Claude Code と Codex の徹底解説ガイド：Hooks / MCP / Skills を最も分かりやすく解説した単一ページで、そのまま使える実例付き。",
    links: [ { label: "Codex ガイド →", href: "https://blakecrosley.com/guides/codex" } ]
  },
  {
    href: "https://github.com/hesreallyhim/awesome-claude-code", icon: "⭐", tag: "リソースハブ", color: "#64748b",
    title: "awesome-claude-code",
    desc: "コミュニティで最も充実した厳選リスト：スキル、フック、サブエージェント、ワークフロー、ツール群を網羅。"
  }
];

/* ------------------------------------------------------------
   学習ロードマップ: トピックをカリキュラム形式で構成、トップページに描画。
   step に ext: true を指定すると外部リンクとして扱われます。
   ------------------------------------------------------------ */
const PATHS = [
  {
    icon: "🌱", color: "#0d9373", title: "入門スタート",
    desc: "AIで何ができるかの理解から、ツール導入、最初のタスク実行まで",
    steps: [
      { label: "AI活用全体像 · 可能性とマインドセット", href: "topics/ai-leverage-guide.ja.html", note: "前提認識の確立: 活用シナリオ、境界線、7つのコア思考法" },
      { label: "プロンプト & コンテキストエンジニアリング", href: "topics/prompt-context-engineering.ja.html", note: "的確なアウトプットを得る技術: 7つの基本技法 + 12パターン + 6つの実例" },
      { label: "stormzhang 体系的チュートリアル (外部)", href: "https://coding.stormzhang.ai/", note: "初心者向け92編、最初のツールをセットアップ", ext: true },
      { label: "Claude Code ガイド · 導入と初期設定", href: "topics/claude-code-guide.ja.html#setup", note: "コマンド、権限設定、テンプレートで段階的に習得" },
      { label: "環境トラブル応急救急マニュアル (必携)", href: "topics/env-auth-clinic.ja.html", note: "ログインや認証エラー時の30秒セルフレスキュー" }
    ]
  },
  {
    icon: "⚙️", color: "#d9634a", title: "ツール実践・習熟",
    desc: "Claude Code と Codex をプロフェッショナル水準で使いこなし、デュアルエージェント連携を実現",
    steps: [
      { label: "Claude Code 実践活用ガイド", href: "topics/claude-code-guide.ja.html", note: "5つの黄金律 → 8大シナリオの実践" },
      { label: "Codex ガイド · CLI × IDE × Cloud", href: "topics/codex-guide.ja.html", note: "サンドボックス承認、クラウドタスク、デュアルエージェント協調" },
      { label: "pen.dev × Claude Code 連携実践", href: "topics/pencil-claude-code-best-practices.ja.html", note: "デザインからコード生成までの完全パイプライン" },
      { label: "AI × UI デザイン連携全体像 (最新)", href: "topics/ai-ui-design-collab.ja.html", note: "Figma + pen.dev + Material 3 + 視覚回帰テスト、Androidエンドツーエンド" },
      { label: "コンテキストエンジニアリング & アンチパターン (重要)", href: "topics/prompt-context-engineering.ja.html#context", note: "アテンションバジェット、長大タスク戦略、安全性とコスト、悪手の見分け方" }
    ]
  },
  {
    icon: "🛠️", color: "#a16207", title: "インフラ・運用基盤",
    desc: "SaaSホスティングからステップアップし、中小規模プロジェクトのサーバ・デプロイ・ネットワークを自前管理",
    steps: [
      { label: "サーバ・デプロイ・ネットワーク基礎入門", href: "topics/ops-basics.ja.html", note: "5段階ロードマップ + Linux/ネットワーク/デプロイ3モジュール(24レッスン) + 5大障害対応表" },
      { label: "R2 スタート: VPSサーバの構築", href: "topics/ops-basics.ja.html#stage2", note: "1Core 1GB Ubuntu + SSH + Nginx" },
      { label: "R3 ネットワーク: ドメイン + DNS + HTTPS", href: "topics/ops-basics.ja.html#stage3", note: "独自ドメイン + 常時SSL化 + リバースプロキシ" },
      { label: "R4 デプロイ: git push による自動デプロイ", href: "topics/ops-basics.ja.html#stage4", note: "systemd + GitHub Actions による自動化" },
      { label: "R5 コンテナ: Docker ゼロからの完全攻略", href: "topics/docker/01-intro.ja.html", note: "環境依存のトラブルを解消、実践演習" },
      { label: "付録 A: 30秒トラブルシューティング表", href: "topics/ops-basics.ja.html#appA", note: "ブックマーク必須: 502 / SSH接続不能 / ディスク枯渇 / OOM / SSL期限切れ" }
    ]
  },
  {
    icon: "🌐", color: "#1a73e8", title: "フルスタックエコシステム & 発展",
    desc: "Google AI (Gemini/Antigravity)、xAI (Grok/Grok Build) の活用とクロスドメインな技術力拡張",
    steps: [
      { label: "Google AI エコシステム徹底解剖", href: "topics/google-ai-ecosystem.ja.html", note: "Gemini 2.5/3.0 + NotebookLM + Antigravity" },
      { label: "xAI & Grok エコシステム完全攻略", href: "topics/grok-ecosystem-guide.ja.html", note: "Colossus 超巨大スパコン + Grok Build クラウドサンドボックス + リアルタイムX検索" },
      { label: "Antigravity 完全ガイド", href: "topics/antigravity-usage.ja.html", note: "CLI / IDE / SDK / サブエージェント / MCP 実践" },
      { label: "AI 技術力拡張ガイド", href: "topics/ai-capability-expansion.ja.html", note: "5ステップ拡張エンジン + 異分野マッピング + ソロプレナー実践" },
      { label: "Android クラッシュ & ANR 対策", href: "topics/android-crash-anr.ja.html", note: "クラッシュ/ANR図鑑 + オリジナルAIトリアージスキル" }
    ]
  }
];

const TOPICS = [
  {
    href: "topics/pencil-docs-zh.ja.html", icon: "📘", tag: "デザイン & ドキュメント", color: "#5b5bf6",
    title: "pen.dev 公式ドキュメント · 完全ガイド",
    desc: "docs.pencil.dev 全16ページを完全網羅。公式動画・図解、各セクションの原文リンク付き。",
    keywords: "pencil デザイン pen ファイル コンポーネント 変数 ショートカット インストール アクティベーション インポート エクスポート cli キャンバス",
    meta: ["16ページ網羅", "公式動画収録", "2026-08 検証済み"],
    sections: [
      {id:"home",label:"ドキュメント概要"},{id:"installation",label:"インストール"},
      {id:"authentication",label:"認証とアクティベーション"},{id:"ai-integration",label:"AI 連携"},
      {id:"pen-files",label:".pen ファイル"},{id:"design-as-code",label:"Design as Code"},
      {id:"interface",label:"pen.dev インターフェース"},{id:"variables",label:"変数 (Variables)"},
      {id:"components",label:"コンポーネント"},{id:"slots",label:"スロット (Slots)"},
      {id:"code-on-canvas",label:"キャンバス上のコード"},{id:"design-libraries",label:"デザインライブラリ"},
      {id:"import-export",label:"インポート & エクスポート"},{id:"shortcuts",label:"キーボードショートカット"},
      {id:"design-to-code",label:"デザイン ↔ コード変換"},{id:"troubleshooting",label:"トラブルシューティング"},
      {id:"pen-format",label:".pen ファイル形式"},{id:"pencil-cli",label:"pen.dev CLI"}
    ]
  },
  {
    href: "topics/pencil-claude-code-best-practices.ja.html", icon: "⚡", tag: "デザイン & ドキュメント", color: "#0ea5e9",
    title: "pen.dev × Claude Code ベストプラクティス",
    desc: "9つ以上の情報源を統合: 4つのコアワークフロー、プロンプトテンプレート、デザインシステムエンジニアリング、CI/CD連携、落とし穴と実例（検証スクリーンショット16枚付き）。",
    keywords: "pencil claude ワークフロー プロンプト prompt デザインシステム 落とし穴 実例 ベストプラクティス",
    meta: ["9+ 情報源統合", "16枚の検証図", "2026-08 検証済み"],
    sections: [
      {id:"intro",label:"なぜこの組み合わせなのか"},{id:"setup",label:"標準セットアップ手順"},
      {id:"workflows",label:"4つのコアワークフロー"},{id:"prompts",label:"実践プロンプトテンプレート"},
      {id:"design-system",label:"デザインシステムエンジニアリング"},{id:"prompt-patterns",label:"高効率プロンプトパターン"},
      {id:"advanced",label:"高度なテクニック"},{id:"pitfalls",label:"落とし穴チェックリスト"},
      {id:"cases",label:"実際のケーススタディ"},{id:"resources",label:"リソース & 情報源インデックス"}
    ]
  },
  {
    href: "topics/ai-ui-design-collab.ja.html", icon: "🎨", tag: "デザイン & ドキュメント", color: "#7c3aed",
    title: "AI コーディングエージェント × UI デザインツール · 連携全体像",
    desc: "pen.dev / Figma / Stitch / Galileo / v0 ＋ Claude Code / Codex ＋ Android Jetpack Compose Material 3: ツールマップ、MCP 3系統、Android 5ステップ完全パイプライン、デザインTokenエンジニアリング、Paparazzi / Roborazzi 視覚回帰テスト、双方向同期、アンチパターン、プロンプト集。",
    keywords: "figma pencil.dev stitch galileo v0 claude code codex mcp デザイン token variables compose material3 テーマ android 視覚回帰 paparazzi roborazzi スクリーンショット 協調 デザインシステム",
    meta: ["3つの連携口", "5ステップ Android パイプライン", "Paparazzi/Roborazzi 回帰テスト", "2026-08 検証済み"],
    sections: [
      {id:"intro",label:"全体像とデザイン・コードの溝"},
      {id:"map",label:"デザインツールの位置づけ"},
      {id:"consume",label:"AIエージェントによるデザイン解釈"},
      {id:"pipeline",label:"5ステップパイプライン"},
      {id:"tokens",label:"Figma → Material 3 Token変換"},
      {id:"compose",label:"Compose生成と逆反映"},
      {id:"verify",label:"実機/仮想スクリーンショット回帰テスト"},
      {id:"sync",label:"双方向同期とデザインシステム保守"},
      {id:"cases",label:"実践ケーススタディ (EC商品詳細)"},
      {id:"antipatterns",label:"アンチパターンと回避策"},
      {id:"prompts",label:"プロンプトテンプレート集"},
      {id:"ios-web",label:"iOS / Web クロスプラットフォーム展開"},
      {id:"resources",label:"リソース & 情報源"}
    ]
  },
  {
    href: "topics/claude-code-guide.ja.html", icon: "⛏️", tag: "利用ガイド", color: "#d9634a",
    title: "Claude Code 実践活用ガイド",
    desc: "5つの黄金律、100以上のコマンド早見表、6大拡張機能の選定、8大ユースケース実践マニュアル、権限・セキュリティ設定、即座に使えるテンプレート集。",
    keywords: "claude code コマンド ショートカット skills hooks mcp サブエージェント コンテキスト 権限 設定 テンプレート プロンプト claude.md スラッシュコマンド",
    meta: ["100+ コマンド収録", "8大ユースケース", "5つのテンプレート", "v2.1.x 対応", "2026-08 検証済み"],
    sections: [
      {id:"mental-model",label:"すべてはコンテキストを中心に"},{id:"golden-rules",label:"5つの黄金律"},
      {id:"whats-new",label:"最近の主要アップデート"},
      {id:"setup",label:"インストールと初期設定"},{id:"commands",label:"コマンド早見リファレンス",quick:true,quickLabel:"Claude Code コマンド早見表"},
      {id:"shortcuts",label:"ショートカットと入力テクニック"},{id:"extensions",label:"6大拡張機能の選び方"},
      {id:"skills-hooks",label:"Skills / Hooks / MCP / サブエージェント"},{id:"playbook",label:"8大ユースケース実践マニュアル"},
      {id:"context",label:"高度なコンテキスト管理"},{id:"permissions",label:"権限管理とセキュリティ"},
      {id:"config-auth",label:"設定ファイルとアカウント管理"},{id:"ecosystem",label:"エコシステム精選: メソドロジーと活用術"},
      {id:"pitfalls",label:"落とし穴チェックリスト"},{id:"templates",label:"即戦力テンプレート集"},
      {id:"hidden-config",label:"隠し機能と裏技設定"},
      {id:"resources",label:"リソースインデックス"}
    ]
  },
  {
    href: "topics/codex-guide.ja.html", icon: "🟢", tag: "利用ガイド", color: "#0d9373",
    title: "Codex 実践活用ガイド · CLI × IDE × Cloud",
    desc: "OpenAI コーディングエージェントの全貌: 20以上のサブコマンドと40以上のスラッシュコマンド早見表、サンドボックス & 承認 3×3 マトリクス、4つの目標志向学習パス、選定プリズム、長大タスク4段階規律、メモリ完了ループ、ブラウザ E2E 検証、Issue-to-PR 自動化、Skills/MCP、Claude Code との協調戦術。",
    keywords: "codex openai サンドボックス 承認 agents.md クラウド コマンド 協調 gpt 選定プリズム 学習パス 4段階規律 メモリシステム e2e ブラウザ検証 github issue pr tdd wsl パフォーマンスチューニング",
    meta: ["5つの利用形態", "3×3 サンドボックスマトリクス", "4段階長大タスク規律", "E2E ブラウザ検証", "デュアルエージェント連携"],
    sections: [
      {id:"overview",label:"全体像と選定プリズム"},{id:"learning-paths",label:"4つの学習パス"},
      {id:"setup",label:"セットアップとチューニング"},{id:"whats-new",label:"最新動向とアップデート"},
      {id:"commands",label:"コマンド早見リファレンス",quick:true,quickLabel:"Codex コマンド早見表"},
      {id:"sandbox",label:"サンドボックス & 承認 3×3 マトリクス"},{id:"methodology",label:"コアメソドロジーとアンチパターン"},
      {id:"long-tasks",label:"長大タスクと4段階規律"},{id:"memory-system",label:"メモリと完了ループ"},
      {id:"skills-mcp",label:"Skills / MCP / ブラウザ検証"},{id:"config-auth",label:"設定ファイルとアカウント管理"},
      {id:"playbook",label:"実践パイプライン & プレイブック"},{id:"hidden-config",label:"内部構造とデュアルエージェント協調"},
      {id:"resources",label:"リソースインデックス"}
    ]
  },
  {
    href: "topics/env-auth-clinic.ja.html", icon: "🚑", tag: "トラブルシューティング", color: "#e11d48",
    title: "AI CLI 環境 & 認証 応急救急マニュアル · Claude Code × Codex",
    desc: "ログインエラー、環境設定の衝突、端末移行時の問題を1ページで解決: 30秒初期問診、5層診断メソッド ＋ ワンクリック健全性チェック、2大ツール別5カテゴリ応急対応表、3つの実用シーン（共有PC・新PC・CI/ヘッドレス）、3段階の完全リセット手順。",
    keywords: "ログインエラー 環境変数 端末切り替え 複数アカウント 共有サブスクリプション 無効なAPIキー 401 403 429 529 レート制限 クォータ 認証 認証情報 リセット 修復 トラブルシューティング 診断 keychain プロキシ ssh コンテナ ci token vs code windows node バージョン 事例 クレジット残高 wsl econnreset timeout",
    meta: ["30秒初期問診", "5層診断メソッド", "3段階リセット手順", "2026-08 検証済み"],
    sections: [
      {id:"overview",label:"症状のトリアージ + 問題マップ"},{id:"diagnose",label:"5層診断メソッド + 診断スクリプト"},
      {id:"claude-cred",label:"Claude Code 認証情報の仕組み"},{id:"claude-config",label:"Claude Code settings.json 完全解説"},
      {id:"claude-er",label:"Claude Code 緊急対応マトリクス"},
      {id:"codex-cred",label:"Codex 認証情報の仕組み"},{id:"codex-config",label:"Codex config.toml 完全解説"},
      {id:"codex-er",label:"Codex 緊急対応マトリクス"},
      {id:"shared",label:"共有端末 / 他人の設定残存の解決"},{id:"machines",label:"端末移行 / 複数マシン間の設定ローミング"},
      {id:"headless",label:"SSH / コンテナ / CI 環境での運用"},{id:"cases",label:"実例解説: 症状から根本原因へのアプローチ"},
      {id:"reset",label:"万能解決策: 3段階リセット手順"},{id:"map",label:"両ツールの比較 & リソース集"}
    ]
  },
  {
    href: "topics/android-crash-anr.ja.html", icon: "⚡", tag: "トラブルシューティング", color: "#65a30d",
    title: "Android クラッシュ & ANR 解析 · AI による高効率トリアージ",
    desc: "基礎から実践まで網羅: クラッシュ図鑑、ANR 徹底解剖、Native クラッシュ分析、完全ツールチェーン、Play Console / Firebase コンソール活用、難解バグの追跡技術、オリジナル crash-triage スキルを用いた AI 分診ワークフロー。",
    keywords: "android anr crash クラッシュ 安定性 firebase play console native スタックトレース ログ トリアージ",
    meta: ["12章構成の体系的解説", "20+ クラッシュ図鑑", "オリジナル AI スキル", "2026-08 検証済み"],
    sections: [
      {id:"overview",label:"全体像とトラブルシューティング思想"},{id:"read-crash",label:"第1講: クラッシュログの正しい読み方"},
      {id:"crash-catalog",label:"頻出クラッシュ図鑑と解決策"},{id:"anr",label:"ANR の徹底解剖と分析"},
      {id:"native",label:"Native (C/C++) クラッシュの追跡"},{id:"toolbox",label:"分析ツールチェーンと実践活用"},
      {id:"consoles",label:"Play Console & Firebase 連携"},{id:"device-data",label:"テスト端末ログの収集と抽出"},
      {id:"detective",label:"難解・散発バグの追跡技術"},{id:"ai-method",label:"AI 連携: 分析手法とプロンプト設計"},
      {id:"ai-workflow",label:"AI ワークフロー & オリジナルスキル"},{id:"governance",label:"品質ガバナンス体制 & リソース"}
    ]
  },
  {
    href: "topics/ai-leverage-guide.ja.html", icon: "🧭", tag: "効率化・マインドセット", color: "#7c3aed",
    title: "AI で本当にできること · 活用全景とコア思考法",
    desc: "網羅的リサーチに基づく実践知見: 能力境界マップ、8大シナリオのROIマトリクス、5つの実践パラダイム（コーディング・ライティング・リサーチ・データ自動化・生活）、3大ツール選定基準、7つのコア思考法、再現可能な事例集、非エンジニア向け学習ロードマップ。",
    keywords: "aiでできること 業務効率化 活用シナリオ ドキュメント作成 週報 リサーチ 学習 データ分析 自動化 生活改善 思考法 プロンプト 落とし穴 初心者 ai学習 ツール選定 ツール比較 gemini chatgpt claude codex deep research vibe coding",
    meta: ["8大ユースケース", "7つのコア思考法", "7つの実例研究", "2026-08 検証済み"],
    sections: [
      {id:"map",label:"全体パノラマ: AI能力境界マップ"},{id:"matrix",label:"シナリオ別 ROI マトリクス"},
      {id:"coding",label:"コーディング: 最適な開発パラダイム"},{id:"writing",label:"ドキュメント・文章作成の効率化"},
      {id:"research",label:"リサーチと学習の加速"},{id:"data-auto",label:"データ処理とタスク自動化"},
      {id:"life",label:"日常生活・自己管理での活用"},
      {id:"tools",label:"主要3ツールの使い分けと選定基準"},{id:"principles",label:"7つの普遍的コア思考法"},
      {id:"cases",label:"再現可能な実践ケーススタディ集"},{id:"learning-path",label:"非エンジニアのための段階的ロードマップ"},
      {id:"resources",label:"リソースインデックス"}
    ]
  },
  {
    href: "topics/prompt-context-engineering.ja.html", icon: "🎯", tag: "効率化・マインドセット", color: "#0891b2",
    title: "プロンプト & コンテキストエンジニアリング · 基礎技法から設計思想まで",
    desc: "基礎から実践までの必須教養: 7つの基本技法（❌/✅ 対比付き）、マルチモーダル & RAG 最適化、3大モデルのプロンプト特性差、最新の動的モデルルーティング、プロンプトインジェクションとセキュリティ防衛、Token 経済学とキャッシュによるコスト最適化、6つの書き換え実例、12種類のテンプレート集、評価とバージョン管理、アンチパターン、CC/Codex での実装設計。",
    keywords: "プロンプト コンテキストエンジニアリング few-shot cot 思考の連鎖 xml ロール プリフィル json 構造化出力 システムプロンプト claude.md agents.md 圧縮 サブエージェント テンプレート ハルシネーション 評価 アンチパターン アテンション マルチモーダル 視覚 rag 出典引用 gpt gemini モデル差異 token 経済学 キャッシュ コスト最適化 インジェクション セキュリティ owasp 実例 a/bテスト モデルルーティング litellm routellm cascade",
    meta: ["7つの技法対比", "12種類の厳選テンプレート", "6つの完全実例", "モデルルーティングSOTA", "2026-08 検証済み"],
    sections: [
      {id:"overview",label:"プロンプトからコンテキストへ"},{id:"basics",label:"7つの基礎技法"},
      {id:"structured",label:"構造化出力 (Structured Outputs)"},{id:"multimodal",label:"マルチモーダルプロンプト"},
      {id:"models",label:"主要モデルのプロンプト特性差"},{id:"rag",label:"RAG シナリオにおけるプロンプト"},
      {id:"context",label:"コンテキストエンジニアリングの核心"},{id:"agentic",label:"エージェント時代のコンテキスト設計"},
      {id:"cost",label:"Token 経済学とコスト管理"},{id:"routing",label:"モデルルーティングと自動切り替え"},
      {id:"security",label:"プロンプトインジェクションと防衛"},{id:"cases",label:"実践ケーススタディ (6つの実例)"},
      {id:"templates",label:"即戦力テンプレート集 (12パターン)"},{id:"eval",label:"評価・イテレーション・バージョン管理"},
      {id:"antipatterns",label:"アンチパターン集"},{id:"tools",label:"CC / Codex での実装アプローチ"},
      {id:"resources",label:"リソースインデックス"}
    ]
  },
  {
    href: "topics/ai-capability-expansion.ja.html", icon: "🧗", tag: "効率化・マインドセット", color: "#ea580c",
    title: "AI 技術力拡張ガイド",
    desc: "特定スタックの移行にとどまらず、AIを活用して自身の技術境界を拡張する普遍的メソドロジー: ギャップ診断 → AI高速インプット → 足場(Scaffold)構築 → 検証ループ → 定着と資産化。異分野マッピング技術と2つのエンドツーエンド実例（フルスタック・クロスプラットフォーム／技術系ソロプレナー）を収録。",
    keywords: "フルスタック 転換 技術拡張 境界 モバイル android ios web バックエンド サーバ インディ開発 ソロプレナー 個人開発 学習法 メソドロジー 異分野マッピング",
    meta: ["5ステップ拡張エンジン", "2つの完全実例", "異分野マッピング", "2026-08 検証済み"],
    sections: [
      {id:"mindset",label:"認識フレームワーク"},{id:"engine",label:"5ステップ拡張エンジン"},
      {id:"mapping",label:"異分野マッピング技術"},{id:"case-studies",label:"エンドツーエンド実践事例"},
      {id:"indie",label:"技術系ソロプレナーの実践"},{id:"learning-system",label:"AI支援型学習システム"},
      {id:"pitfalls",label:"落とし穴とマインドセット"},{id:"resources",label:"リソースライブラリ"}
    ]
  },
  {
    href: "topics/toolchain-changelog.ja.html", icon: "📅", tag: "利用ガイド", color: "#b45309",
    title: "ツールチェーン変更履歴 · 最新アップデートまとめ",
    desc: "Claude Code と Codex のバージョン更新情報。開発習慣に影響する重要変更のみを厳選: 破壊的変更（Breaking Changes）の独立インデックス（更新後の不具合時はまずここを確認）、挙動変更・新機能の分類整理、月別アーカイブ、公式一次情報源とローカル確認コマンドを掲載。",
    keywords: "更新 変更 バージョン チェンジログ リリースノート アップグレード 破壊的変更 新機能 廃止 移行 opus 5 sonnet 5 gpt-5.6 サブタスク fork 権限モード 手動 最新",
    meta: ["破壊的変更インデックス", "月別アーカイブ", "3段階分類", "2026-08 検証済み"],
    sections: [
      {id:"how-to-read",label:"本ページの読み方・使い方"},
      {id:"breaking",label:"破壊的変更インデックス",quick:true,quickLabel:"破壊的変更の確認"},
      {id:"m2026-08",label:"2026年8月"},{id:"m2026-07",label:"2026年7月"},{id:"m2026-06",label:"2026年6月"},
      {id:"method",label:"更新情報の保守方針"}
    ]
  },
  {
    href: "topics/ops-basics.ja.html", icon: "🛠️", tag: "インフラ・運用基盤", color: "#a16207",
    title: "サーバ · 運用 · デプロイ · ネットワーク · 個人開発 101",
    desc: "Vercel / Netlify / Cloudflare Pages 等のホスティングから一歩踏み出し、DevOpsの壁を越えるための実践書: 5段階ロードマップ ＋ Linux/ネットワーク/デプロイ 3モジュール24レッスン（ネットワーク編は13レッスンの完全詳解版: VPN/ポート/Localhost/NAT/HTTP3/IPv6）、5つの30秒トラブル対応表を収録。中小規模プロジェクトのサーバを自前で運用できるようになります。",
    keywords: "サーバ 運用 デプロイ ネットワーク linux vps ssh systemd nginx リバースプロキシ https tls ssl certbot let's encrypt dns ファイアウォール ufw セキュリティグループ github actions ci cd プロセス管理 ポート パッケージマネージャ apt dnf apk 権限 sudo chmod chown docker コンテナ 秘密鍵 env 環境変数 トラブルシューティング 502 504 ssh接続不能 ディスク枯渇 oom ssl期限切れ 落とし穴 個人開発 フルスタック 基礎 101",
    meta: ["5段階ロードマップ", "3モジュール24レッスン", "13レッスンのネットワーク詳解", "5つのトラブル対応表", "2026-08 検証済み"],
    sections: [
      {id:"intro",label:"はじめに: なぜ学ぶのか"},
      {id:"roadmap",label:"5段階ロードマップ"},
      {id:"stage1",label:"R1 現状把握"},{id:"stage2",label:"R2 Linux基礎"},
      {id:"stage3",label:"R3 ネットワーク基盤"},{id:"stage4",label:"R4 デプロイ自動化"},
      {id:"stage5",label:"R5 トラブルシューティング"},
      {id:"m1-1",label:"1.1 サーバとは何か"},{id:"m1-2",label:"1.2 ファイル・プロセス・ポート"},
      {id:"m1-3",label:"1.3 SSH と認証鍵"},{id:"m1-4",label:"1.4 パッケージマネージャ"},
      {id:"m1-5",label:"1.5 権限とユーザ管理"},
      {id:"m2-1",label:"2.1 HTTP→TCP→IP"},{id:"m2-2",label:"2.2 DNS の全体像"},
      {id:"m2-3",label:"2.3 HTTPS/TLS/Let's Encrypt"},{id:"m2-4",label:"2.4 リバースプロキシ"},
      {id:"m2-5",label:"2.5 ファイアウォールとポート"},{id:"m2-6",label:"2.6 攻撃対象領域 (アタックサーフェス)"},
      {id:"m2-7",label:"2.7 ポートの完全理解"},{id:"m2-8",label:"2.8 Localhost とループバック"},
      {id:"m2-9",label:"2.9 VPN とプロキシの違い"},{id:"m2-10",label:"2.10 パブリック/プライベートIP と NAT"},
      {id:"m2-11",label:"2.11 デバッグ用ネットワークコマンド"},{id:"m2-12",label:"2.12 HTTP/2 と HTTP/3"},
      {id:"m2-13",label:"2.13 IPv6 入門"},
      {id:"m3-1",label:"3.1 デプロイ7つの基本ステップ"},{id:"m3-2",label:"3.2 systemd によるプロセス管理"},
      {id:"m3-3",label:"3.3 Nginx プロキシ設定テンプレート"},{id:"m3-4",label:"3.4 Docker 最小構成セット"},
      {id:"m3-5",label:"3.5 GitHub Actions による自動化"},{id:"m3-6",label:"3.6 秘密鍵と .env 管理"},
      {id:"appA",label:"付録 A: 5大障害対応表",quick:true,quickLabel:"30秒トラブルシューティング"},
      {id:"appB",label:"付録 B: リソース集"},
      {id:"appC",label:"付録 C: 用語集"}
    ]
  },
  {
    href: "topics/google-ai-ecosystem.ja.html", icon: "🌐", tag: "フルスタックエコシステム", color: "#1a73e8",
    title: "Google AI エコシステム徹底解剖 · 基盤モデルから Agentic IDE まで",
    desc: "最新の総合実践ガイド: Google Antigravity（CLI/2.0/IDE/SDK/Customizations/Sandbox）の深層解剖 ＋ NotebookLM を用いたナレッジリサーチ ＋ AI Studio 200万Token超長文コンテキスト ＋ 5ステップ連携スーパーパイプラインのベストプラクティス。",
    keywords: "google antigravity agy notebooklm ai studio gemini canvas sketch agents agentic cli ide sdk スラッシュコマンド サブエージェント planning mode サンドボックス python sdk source grounding 2m コンテキスト ポッドキャスト パイプライン",
    meta: ["4つの形態", "全26章構成", "Antigravity 深層解剖", "5ステップパイプライン", "2026-08 検証済み"],
    sections: [
      {id:"intro",label:"00 はじめに: エコシステム全体像"},
      {id:"ch1-1",label:"1.1 Google AI Studio & API"},
      {id:"ch1-2",label:"1.2 コンテキストキャッシュ実践"},
      {id:"ch1-3",label:"1.3 構造化出力の実践",quick:true,quickLabel:"構造化出力ガイド"},
      {id:"ch2-1",label:"2.1 NotebookLM コア & Source Grounding"},
      {id:"ch2-2",label:"2.2 長大テキスト & コードベース取り込み"},
      {id:"ch2-3",label:"2.3 Audio Overview による要約生成"},
      {id:"ch3-1",label:"3.1 Canvas UI アジャイルプロトタイプ"},
      {id:"ch3-2",label:"3.2 Imagen 3 & ビジョンパイプライン"},
      {id:"ch4-1",label:"4.1 Antigravity 4形態完全ガイド"},
      {id:"ch4-2",label:"4.2 ギーク向け高度テクニック (Slash & Mentions)",quick:true,quickLabel:"Antigravity 隠しテクニック"},
      {id:"ch4-3",label:"4.3 Python SDK & カスタムインターセプト"},
      {id:"ch5-1",label:"5.1 4大ツール連携スーパーパイプライン"},
      {id:"ch5-2",label:"5.2 アンチパターン: 4つの教訓",quick:true,quickLabel:"AI 開発の落とし穴図鑑"}
    ]
  },
  {
    href: "topics/antigravity-usage.ja.html", icon: "🛸", tag: "フルスタックエコシステム", color: "#8b5cf6",
    title: "Antigravity 完全ガイド · CLI × IDE × SDK",
    desc: "Google Agentic プログラミング基盤ハンドブック: CLI サブコマンド、Agentic IDE の操作、.agents によるカスタマイズ、サブエージェント協調、MCP ツール拡張、サンドボックス防御の実践。",
    keywords: "antigravity agy ide cli sdk google gemini サブエージェント mcp カスタムスキル ルール プラグイン サンドボックス バイパス reactive wakeup",
    meta: ["4つの形態", "10のコア章", "サブエージェント分離", "2026-08 検証済み"],
    sections: [
      {id:"sec1",label:"01 メンタルモデルとコア概念"},
      {id:"sec2",label:"02 インストールと初期設定"},
      {id:"sec3",label:"03 CLI サブコマンド & キーバインド",quick:true,quickLabel:"AGY コマンド早見表"},
      {id:"sec4",label:"04 カスタマイズワークフロー"},
      {id:"sec5",label:"05 サブエージェント協調とオーケストレーション"},
      {id:"sec6",label:"06 高度なツールチェーンと自動化"},
      {id:"sec7",label:"07 パフォーマンスとサンドボックスセキュリティ"},
      {id:"sec8",label:"08 頻出トラブル & 30秒解決策",quick:true,quickLabel:"AGY 応急救急室"},
      {id:"sec9",label:"09 実践事例: エンドツーエンド開発フロー"},
      {id:"sec10",label:"10 クイックリファレンスシート"}
    ]
  },
  {
    href: "topics/grok-ecosystem-guide.ja.html", icon: "𝕏", tag: "フルスタックエコシステム", color: "#d97706",
    title: "xAI & Grok エコシステム完全攻略 · 超巨大スパコンから Agentic エンジニアリングまで",
    desc: "最もハードコアな実践ガイド: メンフィス Colossus 20万GPU超巨大スパコン ＋ Grok 3/4 推論マトリクス ＋ Grok Build クラウドサンドボックスIDE ＋ Python/TS SDK 構造化出力 ＋ Real-Time X Grounding ＋ 実用グレードのプロンプトテンプレート10選。",
    keywords: "xai grok grok3 grok4 grokbuild build colossus x リアルタイム検索 grounding think deepsearch 推論 function calling プロンプトキャッシュ エージェントスウォーム メンフィス",
    meta: ["メンフィス 20万GPUスパコン", "Grok Build クラウドサンドボックス", "Real-Time X 連携", "10大プロンプトテンプレート", "2026-08 検証済み"],
    sections: [
      {id:"intro",label:"00 はじめに & Colossus トポロジー"},
      {id:"ch1-1",label:"1.1 Grok マトリクス & 4つの推論モード"},
      {id:"ch1-2",label:"1.2 Real-Time X Grounding 実践",quick:true,quickLabel:"Real-Time X 検索ガイド"},
      {id:"ch1-3",label:"1.3 DeepSearch リサーチレポート"},
      {id:"ch1-4",label:"1.4 Artifacts & Live Canvas"},
      {id:"ch2-1",label:"2.1 Grok Build クラウドサンドボックス"},
      {id:"ch2-2",label:"2.2 Vibe Coding パイプライン",quick:true,quickLabel:"Vibe Coding パイプライン"},
      {id:"ch2-3",label:"2.3 xAI API ルーティング & クォータ"},
      {id:"ch2-4",label:"2.4 プロンプトキャッシュ & 構造化出力"},
      {id:"ch3-1",label:"3.1 Python & TS SDK クイックスタート"},
      {id:"ch3-2",label:"3.2 実用 Function Calling"},
      {id:"ch3-3",label:"3.3 X ネイティブ検索連携"},
      {id:"ch3-4",label:"3.4 マルチエージェント Swarm アーキテクチャ"},
      {id:"ch3-5",label:"3.5 実践: PR 監査 & 感情分析 Bot"},
      {id:"ch4-1",label:"4.1 Grok 独自の設計思想と制限解除"},
      {id:"ch4-2",label:"4.2 思考の連鎖 (CoT) と反事実検証"},
      {id:"ch4-3",label:"4.3 実用プロンプトテンプレート 10選",quick:true,quickLabel:"Grok プロンプトライブラリ"},
      {id:"ch5-1",label:"5.1 API エラー 30秒救急室",quick:true,quickLabel:"Grok API クリニック"},
      {id:"ch5-2",label:"5.2 ハルシネーション & シビル攻撃防御"},
      {id:"ch5-3",label:"5.3 2026年 フロンティア LLM 比較マトリクス"},
      {id:"ch6-1",label:"6.1 公式ソース & ツールインデックス"},
      {id:"ch6-2",label:"6.2 4段階習得ロードマップ"}
    ]
  },
  {
    href: "topics/docker/01-intro.ja.html", icon: "🐳", tag: "インフラ・運用基盤", color: "#0284c7",
    title: "Docker ゼロからの完全攻略 インタラクティブガイド",
    desc: "概念の理解から、主要コンポーネント、Dockerfileの魔法、データ永続化、Composeによるマイクロサービス構築まで。35レッスンの図解解説で、トラブルを解消しながら手を動かして習得。",
    keywords: "docker コンテナ イメージ レジストリ dockerfile compose デプロイ マイクロサービス 環境構築 入門 ゼロ基礎 ボリューム wsl2 ネットワーク cgroups ヘルスチェック マルチステージ",
    meta: ["全35レッスン完全解説", "Mermaid 図解収録", "落とし穴救急室", "2026-08 検証済み"],
    sections: [
      {id:"",label:"ステージ 1: 概念の氷解 (01-04)"},
      {id:"",label:"ステージ 2: 環境構築 & トラブル回避 (05-08)"},
      {id:"",label:"ステージ 3: コンテナ管理 & リソース制限 (09-14)"},
      {id:"",label:"ステージ 4: イメージ作成 & マルチステージビルド (15-21)"},
      {id:"",label:"ステージ 5: データ永続化 & バックアップ (22-25)"},
      {id:"",label:"ステージ 6: ネットワーク探求 & Compose (26-31)"},
      {id:"",label:"ステージ 7: セキュリティ防御 & 本番デプロイ (32-35)"}
    ]
  }
];
