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
    href: "topics/pencil-docs-zh.ja.html", icon: "📘", tag: "デザインと制作", color: "#5b5bf6",
    title: "Pencil ドキュメント",
    desc: "docs.pencil.dev 全16ページを完全網羅。公式動画・図解、各セクションの原文リンク付き。",
    keywords: "pencil デザイン pen ファイル コンポーネント 変数 ショートカット インストール アクティベーション インポート エクスポート cli キャンバス",
    meta: ["16ページ網羅", "公式動画収録", "2026-08 検証済み"],
    sections: [
      {"id":"installation","label":"インストール"},
      {"id":"authentication","label":"認証とアクティベート"},
      {"id":"ai-integration","label":"AI 統合 (MCP)"},
      {"id":"pen-files","label":".pen ファイル"},
      {"id":"design-as-code","label":"Design as Code（設計即コード）"},
      {"id":"interface","label":"pen.dev インターフェース"},
      {"id":"variables","label":"変数 (Variables / Design Tokens)"},
      {"id":"components","label":"コンポーネント (Components)"},
      {"id":"slots","label":"スロット (Slots)"},
      {"id":"code-on-canvas","label":"キャンバス上のコード (Code on Canvas / Script Nodes)"},
      {"id":"design-libraries","label":"デザインライブラリ (Design Libraries)"},
      {"id":"import-export","label":"pen.dev インポート/エクスポート"},
      {"id":"shortcuts","label":"主要ショートカット一覧"},
      {"id":"design-to-code","label":"デザイン ↔ コード同期"},
      {"id":"troubleshooting","label":"トラブルシューティング"},
      {"id":"pen-format","label":".pen ファイルフォーマット仕様"},
      {"id":"pencil-cli","label":"pen.dev CLI & MCP ツール体系"}
    ]
  },
  {
    href: "topics/pencil-claude-code-best-practices.ja.html", icon: "⚡", tag: "デザインと制作", color: "#0ea5e9",
    title: "Pencil × Claude Code 実践",
    desc: "9つ以上の情報源を統合: 4つのコアワークフロー、プロンプトテンプレート、デザインシステムエンジニアリング、CI/CD連携、落とし穴と実例（検証スクリーンショット16枚付き）。",
    keywords: "pencil claude ワークフロー プロンプト prompt デザインシステム 落とし穴 実例 ベストプラクティス",
    meta: ["9+ 情報源統合", "16枚の検証図", "2026-08 検証済み"],
    sections: [
      {"id":"intro","label":"なぜ pen.dev + Claude Code なのか"},
      {"id":"setup","label":"環境構築の標準フロー"},
      {"id":"workflows","label":"4大コアワークフロー"},
      {"id":"prompts","label":"実践プロンプト集"},
      {"id":"design-system","label":"デザインシステムエンジニアリング"},
      {"id":"prompt-patterns","label":"高効率プロンプトパターン"},
      {"id":"advanced","label":"高度な活用法"},
      {"id":"pitfalls","label":"落とし穴チェックリスト"},
      {"id":"cases","label":"実践ケーススタディ"},
      {"id":"resources","label":"リソース & 出典索引"}
    ]
  },
  {
    href: "topics/ai-ui-design-collab.ja.html", icon: "🎨", tag: "デザインと制作", color: "#7c3aed",
    title: "AI と UI デザイン",
    desc: "pen.dev / Figma / Stitch / Galileo / v0 ＋ Claude Code / Codex ＋ Android Jetpack Compose Material 3: ツールマップ、MCP 3系統、Android 5ステップ完全パイプライン、デザインTokenエンジニアリング、Paparazzi / Roborazzi 視覚回帰テスト、双方向同期、アンチパターン、プロンプト集。",
    keywords: "figma pencil.dev stitch galileo v0 claude code codex mcp デザイン token variables compose material3 テーマ android 視覚回帰 paparazzi roborazzi スクリーンショット 協調 デザインシステム",
    meta: ["3つの連携口", "5ステップ Android パイプライン", "Paparazzi/Roborazzi 回帰テスト", "2026-08 検証済み"],
    sections: [
      {"id":"intro","label":"全景：なぜ2026年にこの取り組みが「必須」となったのか"},
      {"id":"map","label":"デザインツールマップ：5つの役割と適切な選定"},
      {"id":"consume","label":"AI エージェントがデザインを「見る」仕組み：3つの経路"},
      {"id":"pipeline","label":"Android エンドツーエンド：5ステップ・パイプライン"},
      {"id":"tokens","label":"Figma → Material 3 トークン：標準的な連携ブリッジ"},
      {"id":"compose","label":"Compose コード生成と書き戻し：AI が UI を修正する際の鉄則"},
      {"id":"verify","label":"実機・仮想スクリーンショット回帰テスト：AI UI 修正の安全弁"},
      {"id":"sync","label":"双方向同期：デザインシステムを真に「生きたもの」にする"},
      {"id":"cases","label":"例：商品詳細ページの実装"},
      {"id":"antipatterns","label":"アンチパターンとトラブル回避チェックリスト"},
      {"id":"prompts","label":"プロンプトテンプレート集（コピーしてそのまま利用可能）"},
      {"id":"ios-web","label":"クロスプラットフォーム展開：iOS × Web（Android のパイプラインを移植）"},
      {"id":"resources","label":"リソースと情報源インデックス"}
    ]
  },
  {
    href: "topics/claude-code-guide.ja.html", icon: "⛏️", tag: "開発ツールとモデル", color: "#d9634a",
    title: "Claude Code ガイド",
    desc: "5つの黄金律、100以上のコマンド早見表、6大拡張機能の選定、8大ユースケース実践マニュアル、権限・セキュリティ設定、即座に使えるテンプレート集。",
    keywords: "claude code コマンド ショートカット skills hooks mcp サブエージェント コンテキスト 権限 設定 テンプレート プロンプト claude.md スラッシュコマンド",
    meta: ["100+ コマンド収録", "8大ユースケース", "5つのテンプレート", "v2.1.x 対応", "2026-08 検証済み"],
    sections: [
      {"id":"mental-model","label":"すべてはコンテキストを中心に回る"},
      {"id":"golden-rules","label":"5つの黄金法則"},
      {"id":"whats-new","label":"直近の重要アップデート"},
      {"id":"setup","label":"インストールと初期設定"},
      {"id":"commands","label":"コマンド早見表","quick":true,"quickLabel":"Claude Code コマンド早見表"},
      {"id":"shortcuts","label":"ショートカット＆入力テクニック"},
      {"id":"extensions","label":"6大拡張機能の選び方"},
      {"id":"skills-hooks","label":"Skills / Hooks / MCP / サブエージェント: 4大機能の深層解剖"},
      {"id":"subscription-quotas","label":"プラン・API・コンテキスト"},
      {"id":"vision-artifacts-guide","label":"Artifacts とコンピューター操作"},
      {"id":"playbook","label":"8大シナリオ実践マニュアル"},
      {"id":"context","label":"コンテキスト管理の極意"},
      {"id":"permissions","label":"権限とセキュリティ"},
      {"id":"config-auth","label":"設定とアカウント体系の完全解説"},
      {"id":"ecosystem","label":"エコシステム厳選: メソドロジー、ツール、連携レシピ"},
      {"id":"pitfalls","label":"アンチパターン＆落とし穴回避リスト"},
      {"id":"templates","label":"即戦力テンプレート集"},
      {"id":"hidden-config","label":"公式ヘルプで機能確認"},
      {"id":"resources","label":"リソースインデックス"}
    ]
  },
  {
    href: "topics/codex-guide.ja.html", icon: "🟢", tag: "開発ツールとモデル", color: "#0d9373",
    title: "Codex ガイド",
    desc: "OpenAI コーディングエージェントの全貌: 20以上のサブコマンドと40以上のスラッシュコマンド早見表、サンドボックス & 承認 3×3 マトリクス、4つの目標志向学習パス、選定プリズム、長大タスク4段階規律、メモリ完了ループ、ブラウザ E2E 検証、Issue-to-PR 自動化、Skills/MCP、Claude Code との協調戦術。",
    keywords: "codex openai サンドボックス 承認 agents.md クラウド コマンド 協調 gpt 選定プリズム 学習パス 4段階規律 メモリシステム e2e ブラウザ検証 github issue pr tdd wsl パフォーマンスチューニング",
    meta: ["5つの利用形態", "3×3 サンドボックスマトリクス", "4段階長大タスク規律", "E2E ブラウザ検証", "デュアルエージェント連携"],
    sections: [
      {"id":"overview","label":"Codex の全景と選定プリズム"},
      {"id":"learning-paths","label":"4つの目的別学習ロードマップ"},
      {"id":"setup","label":"インストールとプラットフォーム最適化"},
      {"id":"whats-new","label":"最近の重要動向と重大な変更"},
      {"id":"commands","label":"コマンド早見表","quick":true,"quickLabel":"Codex コマンド早見表"},
      {"id":"sandbox","label":"サンドボックスと承認の 3×3 セキュリティモデル"},
      {"id":"methodology","label":"コア方法論と初心者が陥りやすい落とし穴"},
      {"id":"long-tasks","label":"長大タスクのワークフローとマルチセッション運用"},
      {"id":"memory-system","label":"タスク完了とプロジェクト記憶の定着ループ"},
      {"id":"skills-mcp","label":"Skills、MCP、およびブラウザ検証エンジニアリング"},
      {"id":"config-auth","label":"設定とアカウント体系の完全解説"},
      {"id":"best-practices","label":"依頼と検証のテンプレート"},
      {"id":"subscription-quotas","label":"プラン・API・コンテキスト"},
      {"id":"image-guide","label":"画像作業の専門ガイド"},
      {"id":"playbook","label":"実践シナリオハンドブックと自動化パイプライン"},
      {"id":"hidden-config","label":"ローカル環境の機能確認"},
      {"id":"resources","label":"関連リソースと発展資料"}
    ]
  },
  {
    href: "topics/gpt-image-guide.ja.html", icon: "🎨", tag: "デザインと制作", color: "#7c3aed",
    title: "GPT 画像生成ガイド",
    desc: "GPT 会員向け画像生成完全ガイド: DALL-E から GPT-4o ネイティブ画像、Image 2.5 への進化、6要素プロンプトフレームワーク、15+ 場面別テンプレート、スタイル語彙集、画像編集ループ、文字レンダリング攻略、競合比較とエンタープライズコンプライアンス実務。",
    keywords: "画像生成 image generation dall-e gpt-4o プロンプト prompt スタイル style 文字レンダリング 画像編集 透明背景 png ジブリ ピクセルアート ロゴ ui ec インフォグラフィック 著作権 安全性 midjourney stable diffusion キャラクター一貫性 seed custom gpt image 2.0 2.5",
    meta: ["4世代の進化", "6要素フレームワーク", "15+ シーン別テンプレート", "100+ 情報源統合", "2026-09-09 確認済"],
    sections: [
      {"id":"evolution","label":"画像モデルとインターフェース"},
      {"id":"subscription","label":"使用量と費用の確認"},
      {"id":"prompt-framework","label":"6要素プロンプトフレームワーク"},
      {"id":"prompt-advanced","label":"上級プロンプト技法"},
      {"id":"style-control","label":"スタイル制御とビジュアル語彙集","quick":true,"quickLabel":"スタイル語彙集"},
      {"id":"text-rendering","label":"文字描画・タイポグラフィ攻略"},
      {"id":"image-editing","label":"画像編集と反復プロセス"},
      {"id":"consistency","label":"人物とスタイルの一貫性"},
      {"id":"scenarios","label":"15+ 実戦シナリオ別プロンプト集","quick":true,"quickLabel":"シーン別テンプレート"},
      {"id":"expert-tricks","label":"制御しやすくする方法"},
      {"id":"comparison","label":"同じ課題でツールを比較"},
      {"id":"safety-copyright","label":"納品前の確認"},
      {"id":"resources","label":"リソース索引と推奨文献"}
    ]
  },
  {
    href: "topics/env-auth-clinic.ja.html", icon: "🚑", tag: "トラブル解決", color: "#e11d48",
    title: "環境・ログインの問題解決",
    desc: "ログインエラー、環境設定の衝突、端末移行時の問題を1ページで解決: 30秒初期問診、5層診断メソッド ＋ ワンクリック健全性チェック、2大ツール別5カテゴリ応急対応表、3つの実用シーン（共有PC・新PC・CI/ヘッドレス）、3段階の完全リセット手順。",
    keywords: "ログインエラー 環境変数 端末切り替え 複数アカウント 共有サブスクリプション 無効なAPIキー 401 403 429 529 レート制限 クォータ 認証 認証情報 リセット 修復 トラブルシューティング 診断 keychain プロキシ ssh コンテナ ci token vs code windows node バージョン 事例 クレジット残高 wsl econnreset timeout",
    meta: ["30秒初期問診", "5層診断メソッド", "3段階リセット手順", "2026-08 検証済み"],
    sections: [
      {"id":"overview","label":"症状別早見表 ＋ トラブルマップ"},
      {"id":"diagnose","label":"5層診断法 ＋ ワンクリック診断スクリプト"},
      {"id":"claude-cred","label":"Claude Code · 認証メカニズムと優先順位"},
      {"id":"claude-config","label":"Claude Code · settings.json 完全解説：最小構成から全設定ディクショナリまで"},
      {"id":"claude-er","label":"Claude Code · 症状別応急処置表"},
      {"id":"codex-cred","label":"Codex · 認証メカニズムと保存形式"},
      {"id":"codex-config","label":"Codex · config.toml 完全解説：最小構成から全設定ディクショナリまで"},
      {"id":"codex-er","label":"Codex · 症状別応急処置表"},
      {"id":"shared","label":"シナリオ A · 共用PC ／ 他人の設定を引き継いだPC"},
      {"id":"machines","label":"シナリオ B · PC移行 ／ マルチマシン同期"},
      {"id":"headless","label":"シナリオ C · SSH ／ コンテナ ／ ヘッドレス機 ／ CI"},
      {"id":"cases","label":"実戦ケーススタディ：症状から根本原因への徹底追跡"},
      {"id":"reset","label":"復元できる調査とリセット"},
      {"id":"map","label":"2大ツール概念対照表 ＋ リソースインデックス"}
    ]
  },
  {
    href: "topics/android-crash-anr.ja.html", icon: "⚡", tag: "トラブル解決", color: "#65a30d",
    title: "Android Crash・ANR の調査",
    desc: "基礎から実践まで網羅: クラッシュ図鑑、ANR 徹底解剖、Native クラッシュ分析、完全ツールチェーン、Play Console / Firebase コンソール活用、難解バグの追跡技術、オリジナル crash-triage スキルを用いた AI 分診ワークフロー。",
    keywords: "android anr crash クラッシュ 安定性 firebase play console native スタックトレース ログ トリアージ",
    meta: ["12章構成の体系的解説", "20+ クラッシュ図鑑", "オリジナル AI スキル", "2026-08 検証済み"],
    sections: [
      {"id":"overview","label":"全体像と方法論"},
      {"id":"read-crash","label":"第1課: クラッシュログを読み解く"},
      {"id":"crash-catalog","label":"頻出 Crash 図鑑と根本解決"},
      {"id":"anr","label":"ANR の徹底解剖：メインスレッドのスナップショットからブロック源を突き止める"},
      {"id":"native","label":"Native Crash：シグナルからソースコード行へ"},
      {"id":"toolbox","label":"ツールボックスと活用法：まず「証拠はどこにあるか」を問う"},
      {"id":"consoles","label":"Play Console と Firebase：本番課題を捉える 2 つのレンズ"},
      {"id":"device-data","label":"実機データの抽出：事故現場を完全に持ち帰る"},
      {"id":"detective","label":"難解バグの調査術：観測不能を検証可能に変える"},
      {"id":"ai-method","label":"AI 連携：証拠の品質が調査の上限を決める"},
      {"id":"ai-workflow","label":"AI ワークフローとオリジナル crash-triage Skill"},
      {"id":"governance","label":"ガバナンス体制：対症療法から安定性の複利効果へ"}
    ]
  },
  {
    href: "topics/ai-leverage-guide.ja.html", icon: "🧭", tag: "AI の基礎と活用", color: "#7c3aed",
    title: "AI 入門と活用法",
    desc: "網羅的リサーチに基づく実践知見: 能力境界マップ、8大シナリオのROIマトリクス、5つの実践パラダイム（コーディング・ライティング・リサーチ・データ自動化・生活）、3大ツール選定基準、7つのコア思考法、再現可能な事例集、非エンジニア向け学習ロードマップ。",
    keywords: "aiでできること 業務効率化 活用シナリオ ドキュメント作成 週報 リサーチ 学習 データ分析 自動化 生活改善 思考法 プロンプト 落とし穴 初心者 ai学習 ツール選定 ツール比較 gemini chatgpt claude codex deep research vibe coding",
    meta: ["8大ユースケース", "7つのコア思考法", "7つの実例研究", "2026-08 検証済み"],
    sections: [
      {"id":"map","label":"パノラママップ：AIが得意なこと・不得意なこと"},
      {"id":"matrix","label":"シナリオ × 効果マトリクス：どこで最も効率が上がるのか"},
      {"id":"coding","label":"プログラミングシーンの最適パラダイム（Claude Code / Codex）"},
      {"id":"writing","label":"執筆とドキュメント作成シーンのパラダイム"},
      {"id":"research","label":"調査と学習シーンのパラダイム"},
      {"id":"data-auto","label":"データと自動化シーンのパラダイム"},
      {"id":"life","label":"生活とセルフマネジメントシーンのパラダイム"},
      {"id":"tools","label":"作業と環境で選ぶ"},
      {"id":"principles","label":"7つの共通メンタルモデル（シナリオ横断）"},
      {"id":"cases","label":"現場の実例集：各シナリオの再現可能テンプレート"},
      {"id":"learning-path","label":"一般ユーザー向け学習パス：ゼロから習熟へのステップ"},
      {"id":"resources","label":"リソースインデックス（信頼度順）"}
    ]
  },
  {
    href: "topics/prompt-context-engineering.ja.html", icon: "🎯", tag: "AI の基礎と活用", color: "#0891b2",
    title: "プロンプトとコンテキスト設計",
    desc: "基礎から実践までの必須教養: 7つの基本技法（❌/✅ 対比付き）、マルチモーダル & RAG 最適化、3大モデルのプロンプト特性差、最新の動的モデルルーティング、プロンプトインジェクションとセキュリティ防衛、Token 経済学とキャッシュによるコスト最適化、6つの書き換え実例、12種類のテンプレート集、評価とバージョン管理、アンチパターン、CC/Codex での実装設計。",
    keywords: "プロンプト コンテキストエンジニアリング few-shot cot 思考の連鎖 xml ロール プリフィル json 構造化出力 システムプロンプト claude.md agents.md 圧縮 サブエージェント テンプレート ハルシネーション 評価 アンチパターン アテンション マルチモーダル 視覚 rag 出典引用 gpt gemini モデル差異 token 経済学 キャッシュ コスト最適化 インジェクション セキュリティ owasp 実例 a/bテスト モデルルーティング litellm routellm cascade",
    meta: ["7つの技法対比", "12種類の厳選テンプレート", "6つの完全実例", "モデルルーティングSOTA", "2026-08 検証済み"],
    sections: [
      {"id":"overview","label":"全体像：プロンプトエンジニアリングからコンテキストエンジニアリングへ"},
      {"id":"basics","label":"7大基本技法（❌/✅ 対比）"},
      {"id":"structured","label":"構造化出力 & フォーマット制御"},
      {"id":"multimodal","label":"マルチモーダルプロンプトの極意"},
      {"id":"models","label":"モデル別の指示調整"},
      {"id":"rag","label":"RAG シナリオにおけるプロンプト設計"},
      {"id":"context","label":"コンテキストエンジニアリングの核心"},
      {"id":"agentic","label":"自律型エージェント（Agentic）のコンテキスト管理"},
      {"id":"cost","label":"Token 経済学とコスト管理"},
      {"id":"routing","label":"モデルルーティングは評価から"},
      {"id":"security","label":"Prompt インジェクション & セキュリティ防御"},
      {"id":"cases","label":"書き換え実例集（全6ケース）"},
      {"id":"templates","label":"本番用テンプレート集（全12式）"},
      {"id":"eval","label":"評価・反復・バージョン管理"},
      {"id":"antipatterns","label":"アンチパターン図鑑"},
      {"id":"tools","label":"Claude Code / Codex における設定階層"},
      {"id":"resources","label":"リソース & 出典索引"}
    ]
  },
  {
    href: "topics/ai-capability-expansion.ja.html", icon: "🧗", tag: "AI の基礎と活用", color: "#ea580c",
    title: "AI 活用の応用実践",
    desc: "特定スタックの移行にとどまらず、AIを活用して自身の技術境界を拡張する普遍的メソドロジー: ギャップ診断 → AI高速インプット → 足場(Scaffold)構築 → 検証ループ → 定着と資産化。異分野マッピング技術と2つのエンドツーエンド実例（フルスタック・クロスプラットフォーム／技術系ソロプレナー）を収録。",
    keywords: "フルスタック 転換 技術拡張 境界 モバイル android ios web バックエンド サーバ インディ開発 ソロプレナー 個人開発 学習法 メソドロジー 異分野マッピング",
    meta: ["5ステップ拡張エンジン", "2つの完全実例", "異分野マッピング", "2026-08 検証済み"],
    sections: [
      {"id":"mindset","label":"認識フレームワーク"},
      {"id":"engine","label":"汎用方法論：5ステップ拡張エンジン"},
      {"id":"mapping","label":"クロスドメイン・マッピング技法"},
      {"id":"case-studies","label":"エンドツーエンド深層実践事例"},
      {"id":"indie","label":"技術系「一人企業」／個人開発"},
      {"id":"learning-system","label":"AI支援学習システム"},
      {"id":"pitfalls","label":"落とし穴と心構え"},
      {"id":"resources","label":"リソース集"}
    ]
  },
  {
    href: "topics/toolchain-changelog.ja.html", icon: "📅", tag: "更新履歴", color: "#b45309",
    title: "AI ツール更新履歴",
    desc: "Claude Code と Codex のバージョン更新情報。開発習慣に影響する重要変更のみを厳選: 破壊的変更（Breaking Changes）の独立インデックス（更新後の不具合時はまずここを確認）、挙動変更・新機能の分類整理、月別アーカイブ、公式一次情報源とローカル確認コマンドを掲載。",
    keywords: "更新 変更 バージョン チェンジログ リリースノート アップグレード 破壊的変更 新機能 廃止 移行 opus 5 sonnet 5 gpt-5.6 サブタスク fork 権限モード 手動 最新",
    meta: ["破壊的変更インデックス", "月別アーカイブ", "3段階分類", "2026-08 検証済み"],
    sections: [
      {"id":"how-to-read","label":"変更履歴の読み方"},
      {"id":"breaking","label":"確認済みの Codex オプション","quick":true,"quickLabel":"破壊的変更の確認"},
      {"id":"m2026-09","label":"公式更新情報"},
      {"id":"method","label":"更新と復元の確認"}
    ]
  },
  {
    href: "topics/ops-basics.ja.html", icon: "🛠️", tag: "開発の基礎", color: "#a16207",
    title: "サーバー・ネットワーク・デプロイ",
    desc: "Vercel / Netlify / Cloudflare Pages 等のホスティングから一歩踏み出し、DevOpsの壁を越えるための実践書: 5段階ロードマップ ＋ Linux/ネットワーク/デプロイ 3モジュール24レッスン（ネットワーク編は13レッスンの完全詳解版: VPN/ポート/Localhost/NAT/HTTP3/IPv6）、5つの30秒トラブル対応表を収録。中小規模プロジェクトのサーバを自前で運用できるようになります。",
    keywords: "サーバ 運用 デプロイ ネットワーク linux vps ssh systemd nginx リバースプロキシ https tls ssl certbot let's encrypt dns ファイアウォール ufw セキュリティグループ github actions ci cd プロセス管理 ポート パッケージマネージャ apt dnf apk 権限 sudo chmod chown docker コンテナ 秘密鍵 env 環境変数 トラブルシューティング 502 504 ssh接続不能 ディスク枯渇 oom ssl期限切れ 落とし穴 個人開発 フルスタック 基礎 101",
    meta: ["5段階ロードマップ", "3モジュール24レッスン", "13レッスンのネットワーク詳解", "5つのトラブル対応表", "2026-08 検証済み"],
    sections: [
      {"id":"intro","label":"なぜ学ぶ必要があるのか"},
      {"id":"roadmap","label":"5段階ロードマップ"},
      {"id":"stage1","label":"R1 · 現状の棚卸し"},
      {"id":"stage2","label":"R2 · Linuxの基礎"},
      {"id":"stage3","label":"R3 · ネットワーク基幹"},
      {"id":"stage4","label":"R4 · デプロイパイプライン"},
      {"id":"stage5","label":"R5 · 障害調査とトラブルシューティング"},
      {"id":"m1-1","label":"1.1 サーバーとは何か"},
      {"id":"m1-2","label":"1.2 3つの抽象概念：ファイルシステム、プロセス、ポート"},
      {"id":"m1-3","label":"1.3 SSH は単なるログインではない"},
      {"id":"m1-4","label":"1.4 パッケージマネージャー速引"},
      {"id":"m1-5","label":"1.5 権限とユーザー管理"},
      {"id":"m2-1","label":"2.1 HTTP → TCP → IP 階層構造"},
      {"id":"m2-2","label":"2.2 DNS（ドメインネームシステム）"},
      {"id":"m2-3","label":"2.3 HTTPS / TLS 暗号化と証明書管理"},
      {"id":"m2-4","label":"2.4 リバースプロキシ（Reverse Proxy）の役割"},
      {"id":"m2-5","label":"2.5 ファイアウォールとアクセス制御"},
      {"id":"m2-6","label":"2.6 アタックサーフェス（攻撃面）の最小化"},
      {"id":"m2-7","label":"2.7 ポート設計とポート衝突の解消"},
      {"id":"m2-8","label":"2.8 127.0.0.1 vs 0.0.0.0 バインドの違い"},
      {"id":"m2-9","label":"2.9 VPN とプロキシの使い分け"},
      {"id":"m2-10","label":"2.10 パブリック IP、NAT、トンネリング技術"},
      {"id":"m2-11","label":"2.11 ネットワーク調査・デバッグ必須コマンド"},
      {"id":"m2-12","label":"2.12 HTTP/2 と HTTP/3 (QUIC)"},
      {"id":"m2-13","label":"2.13 IPv6 の現状とベストプラクティス"},
      {"id":"m3-1","label":"3.1 本番デプロイ 7ステップ パイプライン"},
      {"id":"m3-2","label":"3.2 systemd によるプロセスのデーモン化と自動再起動"},
      {"id":"m3-3","label":"3.3 Nginx リバースプロキシ本番テンプレート"},
      {"id":"m3-4","label":"3.4 Docker 最小セット"},
      {"id":"m3-5","label":"3.5 GitHub Actions による自動デプロイ"},
      {"id":"m3-6","label":"3.6 シークレットと環境変数（.env）の安全管理"},
      {"id":"appA","label":"5大障害 30秒クイック処方箋","quick":true,"quickLabel":"30秒トラブルシューティング"},
      {"id":"appB","label":"おすすめリファレンス & 公式情報"},
      {"id":"appC","label":"重要用語集 (Glossary)"}
    ]
  },
  {
    href: "topics/google-ai-ecosystem.ja.html", icon: "🌐", tag: "開発ツールとモデル", color: "#1a73e8",
    title: "Google AI エコシステム",
    desc: "最新の総合実践ガイド: Google Antigravity（CLI/2.0/IDE/SDK/Customizations/Sandbox）の深層解剖 ＋ NotebookLM を用いたナレッジリサーチ ＋ AI Studio 200万Token超長文コンテキスト ＋ 5ステップ連携スーパーパイプラインのベストプラクティス。",
    keywords: "google antigravity agy notebooklm ai studio gemini canvas sketch agents agentic cli ide sdk スラッシュコマンド サブエージェント planning mode サンドボックス python sdk source grounding 2m コンテキスト ポッドキャスト パイプライン",
    meta: ["4つの形態", "全26章構成", "Antigravity 深層解剖", "5ステップパイプライン", "2026-08 検証済み"],
    sections: [
      {"id":"intro","label":"用途でツールを選ぶ"},
      {"id":"ch1-1","label":"API とモデル選択"},
      {"id":"ch1-2","label":"キャッシュと総費用"},
      {"id":"ch1-3","label":"構造化出力と検証","quick":true,"quickLabel":"構造化出力ガイド"},
      {"id":"ch2-1","label":"NotebookLM：引用と検証"},
      {"id":"ch2-2","label":"検索しやすい資料の準備"},
      {"id":"ch2-3","label":"音声概要と学習"},
      {"id":"ch3-1","label":"Canvas と画像の試作"},
      {"id":"ch4-1","label":"Antigravity で実装する"},
      {"id":"ch5-1","label":"資料から動くコードへ"}
    ]
  },
  {
    href: "topics/antigravity-usage.ja.html", icon: "🛸", tag: "開発ツールとモデル", color: "#8b5cf6",
    title: "Antigravity ガイド",
    desc: "Google Agentic プログラミング基盤ハンドブック: CLI サブコマンド、Agentic IDE の操作、.agents によるカスタマイズ、サブエージェント協調、MCP ツール拡張、サンドボックス防御の実践。",
    keywords: "antigravity agy ide cli sdk google gemini サブエージェント mcp カスタムスキル ルール プラグイン サンドボックス バイパス reactive wakeup",
    meta: ["4つの形態", "10のコア章", "サブエージェント分離", "2026-08 検証済み"],
    sections: [
      {"id":"sec1","label":"利用形態を選ぶ"},
      {"id":"sec2","label":"インストールとログイン"},
      {"id":"sec3","label":"CLI の基本操作","quick":true,"quickLabel":"AGY コマンド早見表"},
      {"id":"sec4","label":"設定と拡張"},
      {"id":"sec5","label":"バックグラウンドと非対話実行"},
      {"id":"sec7","label":"権限・サンドボックス・使用量"},
      {"id":"sec8","label":"症状から調べる","quick":true,"quickLabel":"AGY 応急救急室"},
      {"id":"sec9","label":"検証できる作業手順"}
    ]
  },
  {
    href: "topics/grok-ecosystem-guide.ja.html", icon: "𝕏", tag: "開発ツールとモデル", color: "#d97706",
    title: "Grok・xAI ガイド",
    desc: "最もハードコアな実践ガイド: メンフィス Colossus 20万GPU超巨大スパコン ＋ Grok 3/4 推論マトリクス ＋ Grok Build クラウドサンドボックスIDE ＋ Python/TS SDK 構造化出力 ＋ Real-Time X Grounding ＋ 実用グレードのプロンプトテンプレート10選。",
    keywords: "xai grok grok3 grok4 grokbuild build colossus x リアルタイム検索 grounding think deepsearch 推論 function calling プロンプトキャッシュ エージェントスウォーム メンフィス",
    meta: ["メンフィス 20万GPUスパコン", "Grok Build クラウドサンドボックス", "Real-Time X 連携", "10大プロンプトテンプレート", "2026-08 検証済み"],
    sections: [
      {"id":"intro","label":"四つの入口と用途"},
      {"id":"ch1-1","label":"モデルの選択と評価"},
      {"id":"ch1-2","label":"X 検索と事実確認","quick":true,"quickLabel":"Real-Time X 検索ガイド"},
      {"id":"ch1-3","label":"調査の入力と検証"},
      {"id":"ch2-1","label":"Grok Bot：継続業務"},
      {"id":"ch2-3","label":"共有コンピューターと承認"},
      {"id":"ch2-4","label":"Skills と定期実行"},
      {"id":"ch3-1","label":"Grok Build：端末での開発"},
      {"id":"ch3-3","label":"API・キャッシュ・課金"},
      {"id":"ch4-2","label":"ツール呼び出しの検証"},
      {"id":"ch4-4","label":"協作例：資料整理と確認"},
      {"id":"ch5-3","label":"再利用できる依頼文"},
      {"id":"ch6-1","label":"エラーの調査順序"},
      {"id":"sub-quotas","label":"プランと使用量"},
      {"id":"grok-imagine","label":"画像と動画"},
      {"id":"ch7-1","label":"出典と学習順序"}
    ]
  },
  {
    href: "topics/docker/01-intro.ja.html", icon: "🐳", tag: "開発の基礎", color: "#0284c7",
    title: "Docker 入門からデプロイまで",
    desc: "概念の理解から、主要コンポーネント、Dockerfileの魔法、データ永続化、Composeによるマイクロサービス構築まで。35レッスンの図解解説で、トラブルを解消しながら手を動かして習得。",
    keywords: "docker コンテナ イメージ レジストリ dockerfile compose デプロイ マイクロサービス 環境構築 入門 ゼロ基礎 ボリューム wsl2 ネットワーク cgroups ヘルスチェック マルチステージ",
    meta: ["全35レッスン完全解説", "Mermaid 図解収録", "落とし穴救急室", "2026-08 検証済み"],
    sections: [
      {"id":"","href":"topics/docker/01-intro.ja.html","label":"01. プロローグ：エンジニアの世紀の難題"},
      {"id":"","href":"topics/docker/02-what-is-docker.ja.html","label":"02. 「引っ越し」で理解する Docker"},
      {"id":"","href":"topics/docker/03-vm-vs-container.ja.html","label":"03. 次元の違い：仮想マシン vs コンテナ"},
      {"id":"","href":"topics/docker/04-core-components.ja.html","label":"04. 図解：コア3要素のアーキテクチャ"},
      {"id":"","href":"topics/docker/05-windows-setup.ja.html","label":"05. Windows環境の落とし穴回避ガイド"},
      {"id":"","href":"topics/docker/06-mac-linux-setup.ja.html","label":"06. Mac & Linux 環境構築プレイブック"},
      {"id":"","href":"topics/docker/07-registry-mirror.ja.html","label":"07. ミラー設定：ダウンロードの高速化"},
      {"id":"","href":"topics/docker/08-hello-world.ja.html","label":"08. 最初のコマンドに隠された仕組み"},
      {"id":"","href":"topics/docker/09-run-detached.ja.html","label":"09. バックグラウンドで動かす Nginx"},
      {"id":"","href":"topics/docker/10-lifecycle-cmds.ja.html","label":"10. コンテナのライフサイクル制御"},
      {"id":"","href":"topics/docker/11-exec-into.ja.html","label":"11. 潜入：稼働中コンテナへのアクセス"},
      {"id":"","href":"topics/docker/12-logs-detective.ja.html","label":"12. 探偵の視点：ログ調査の極意"},
      {"id":"","href":"topics/docker/13-resource-limits.ja.html","label":"13. リソース制限：OOMクラッシュの防止"},
      {"id":"","href":"topics/docker/14-healthcheck.ja.html","label":"14. ヘルスチェック：コンテナの自己診断"},
      {"id":"","href":"topics/docker/15-why-dockerfile.ja.html","label":"15. 手動環境構築からの脱却"},
      {"id":"","href":"topics/docker/16-dockerfile-syntax.ja.html","label":"16. Dockerfile 構文の完全解説"},
      {"id":"","href":"topics/docker/17-dockerignore.ja.html","label":"17. .dockerignore 活用ガイド"},
      {"id":"","href":"topics/docker/18-build-practice.ja.html","label":"第18レッスン：実践：Webプロジェクトのイメージビルド"},
      {"id":"","href":"topics/docker/19-layer-caching.ja.html","label":"第19レッスン：図解：レイヤーキャッシュの魔法 (最重要!)"},
      {"id":"","href":"topics/docker/20-frontend-deploy.ja.html","label":"第20レッスン：Vue / React のエレガントなデプロイ"},
      {"id":"","href":"topics/docker/21-multi-stage.ja.html","label":"第21レッスン：究極の軽量化：マルチステージビルド"},
      {"id":"","href":"topics/docker/22-ephemeral-data.ja.html","label":"第22レッスン：短命なコンテナと消えるデータ"},
      {"id":"","href":"topics/docker/23-volumes.ja.html","label":"第23レッスン：究極のデータ保護：ボリューム（Volumes）"},
      {"id":"","href":"topics/docker/24-bind-mounts.ja.html","label":"第24レッスン：開発の神技：バインドマウント"},
      {"id":"","href":"topics/docker/25-volume-backup.ja.html","label":"第25レッスン：金庫の引越し：データのバックアップとリストア"},
      {"id":"","href":"topics/docker/26-network-types.ja.html","label":"第26レッスン：ネットワーク探求：BridgeとHost"},
      {"id":"","href":"topics/docker/27-container-network.ja.html","label":"第27レッスン：コンテナ間通信：IP直打ちからの脱却、名前で呼ぶ世界へ"},
      {"id":"","href":"topics/docker/28-why-compose.ja.html","label":"第28レッスン：なぜ Docker Compose が必要なのか？コマンド長文地獄からの脱出"},
      {"id":"","href":"topics/docker/29-yaml-syntax.ja.html","label":"第29レッスン：YAML構文超速マスター：インデントの作法"},
      {"id":"","href":"topics/docker/30-compose-up-part1.ja.html","label":"第30レッスン：実践バトル(前編)：Web＋キャッシュ連携の Compose 構築"},
      {"id":"","href":"topics/docker/31-compose-up-part2.ja.html","label":"第31レッスン：実践バトル(後編)：マイクロサービスネットワークとヘルスチェック連携"},
      {"id":"","href":"topics/docker/32-env-security.ja.html","label":"第32レッスン：城壁の防御：.env による機密情報・パスワードの保護"},
      {"id":"","href":"topics/docker/33-system-prune.ja.html","label":"第33レッスン：ディスク大掃除：No space left on device を一掃する"},
      {"id":"","href":"topics/docker/34-production-root.ja.html","label":"第34レッスン：本番の鉄則：root 実行の絶対禁止と権限制御"},
      {"id":"","href":"topics/docker/35-cicd-concept.ja.html","label":"第35レッスン：エピローグ：CI/CD 自動化パイプラインと未来への道"}
    ]
  }
];
