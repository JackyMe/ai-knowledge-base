/* ============================================================
   AI 지식 베이스 · 주제 등록 테이블 (Single Source of Truth)
   새 주제 추가 절차:
   1. 주제 HTML 파일을 topics/ 에 배치 (../assets/css/site.css 및
      ../assets/js/site.js 를 참조하여 전 사이트 통일된 인터랙션 자동 적용)
   2. 아래 TOPICS 배열에 객체 1개 추가
   3. 완료 —— 메인 페이지 카드, 섹션 빠른 링크, 사이트 검색에 자동 반영
   ============================================================ */

/* ------------------------------------------------------------
   엄선 외부 학습 사이트:
   메인 페이지 '엄선 학습 리소스' 영역 및 사이트 전체 검색에서 공유.
   featured: true 항목은 상단 배너 형태로 강조 표시.
   ------------------------------------------------------------ */
const LEARN = [
  {
    href: "https://coding.stormzhang.ai/", icon: "🎓", tag: "체계적 튜토리얼", color: "#f59e0b", featured: true,
    title: "AI 코딩 가이드 (stormzhang)",
    desc: "초보자 친화적 체계적 튜토리얼 92편: Claude Code 53편 + Codex 39편. GitHub 오픈소스로 지속 관리. 입문에 최적 — 차근차근 따라하기 좋으며 본 지식 베이스와 상호보완적(입문은 튜토리얼, 일상적 레퍼런스는 본 지식 베이스).",
    links: [
      { label: "Claude Code 편 (53편) →", href: "https://coding.stormzhang.ai/claude-code/01-what-is-claude-code" },
      { label: "Codex 편 (39편) →", href: "https://coding.stormzhang.ai/codex/01-what-is-codex" },
      { label: "GitHub 저장소", href: "https://github.com/stormzhang/ai-coding-guide" }
    ]
  },
  {
    href: "https://code.claude.com/docs", icon: "📖", tag: "공식 · 1차 출처", color: "#d9634a",
    title: "Claude Code 공식 문서",
    desc: "모든 기준과 스펙의 최우선 1차 출처. 'Best practices' 페이지는 정독 필수; /release-notes 에서 매주 새로운 기능을 확인 가능.",
    links: [ { label: "모범 사례 (Best Practices) →", href: "https://code.claude.com/docs/en/best-practices" } ]
  },
  {
    href: "https://developers.openai.com/codex", icon: "📗", tag: "공식 · 1차 출처", color: "#0d9373",
    title: "Codex 공식 문서",
    desc: "CLI / IDE / Cloud 전 형태를 아우르는 권위 있는 레퍼런스. Config 및 Authentication 장이 가장 자주 참조됨.",
    links: [ { label: "모범 사례 (Best Practices) →", href: "https://developers.openai.com/codex/learn/best-practices" } ]
  },
  {
    href: "https://codexguide.io/paths", icon: "🚀", tag: "실전 · 학습 경로", color: "#10b981",
    title: "CodexGuide 실전 가이드",
    desc: "4가지 목표 지향 학습 경로, 선정 프리즘, 장시간 작업 4단계 규율, 메모리 완료 루프, 브라우저 E2E 검증 및 실전 사례 모음.",
    links: [ { label: "학습 경로 →", href: "https://codexguide.io/paths" } ]
  },
  {
    href: "https://blakecrosley.com/guides/claude-code", icon: "🧭", tag: "영어 · 실전 완벽 가이드", color: "#6366f1",
    title: "Blake Crosley 가이드",
    desc: "Claude Code 및 Codex 심층 분석 가이드: Hooks / MCP / Skills를 가장 명쾌하게 설명한 단일 페이지 문서, 복사해 즉시 사용 가능한 예제 제공.",
    links: [ { label: "Codex 편 →", href: "https://blakecrosley.com/guides/codex" } ]
  },
  {
    href: "https://github.com/hesreallyhim/awesome-claude-code", icon: "⭐", tag: "리소스 허브", color: "#64748b",
    title: "awesome-claude-code",
    desc: "커뮤니티에서 가장 완벽한 엄선 리스트: 스킬, 훅, 서브에이전트, 워크플로우, 도구 모음을 총망라."
  }
];

/* ------------------------------------------------------------
   학습 로드맵: 주제를 커리큘럼 형식으로 구성하여 메인 페이지에 렌더링.
   step에 ext: true를 지정하면 외부 링크로 처리됩니다.
   ------------------------------------------------------------ */
const PATHS = [
  {
    icon: "🌱", color: "#0d9373", title: "입문 시작",
    desc: "AI로 무엇을 할 수 있는지 이해하는 것부터 도구 설치와 첫 번째 작업 실행까지",
    steps: [
      { label: "AI로 무엇을 할 수 있는가 · 활용 전경과 핵심 마인드셋", href: "topics/ai-leverage-guide.ko.html", note: "사전 인식 구축: 활용 시나리오, 한계와 경계, 7가지 핵심 사고법" },
      { label: "프롬프트 & 컨텍스트 엔지니어링", href: "topics/prompt-context-engineering.ko.html", note: "정확한 결과물을 얻는 대화 기술: 7가지 기본 기법 + 12가지 템플릿 + 6가지 실전 사례" },
      { label: "stormzhang 체계적 튜토리얼 (외부)", href: "https://coding.stormzhang.ai/", note: "초보자용 92편 튜토리얼, 첫 도구 설치 및 설정", ext: true },
      { label: "Claude Code 가이드 · 설치 및 설정", href: "topics/claude-code-guide.ko.html#setup", note: "명령어, 권한 설정, 템플릿으로 단계별 습득" },
      { label: "환경 응급 처치 매뉴얼 (필독 즐겨찾기)", href: "topics/env-auth-clinic.ko.html", note: "로그인 오류 시 30초 맞춤 자가 복구" }
    ]
  },
  {
    icon: "⚙️", color: "#d9634a", title: "도구 실전 마스터",
    desc: "Claude Code와 Codex를 전문가 수준으로 다루고 듀얼 에이전트 협업 달성",
    steps: [
      { label: "Claude Code 실전 활용 가이드", href: "topics/claude-code-guide.ko.html", note: "5가지 황금률 → 8대 실전 시나리오" },
      { label: "Codex 가이드 · CLI × IDE × Cloud", href: "topics/codex-guide.ko.html", note: "샌드박스 승인, 클라우드 작업, 듀얼 에이전트 협업" },
      { label: "pen.dev × Claude Code 연동 실전", href: "topics/pencil-claude-code-best-practices.ko.html", note: "디자인에서 코드 생성까지의 완전 파이프라인" },
      { label: "AI × UI 디자인 협업 전경 (최신)", href: "topics/ai-ui-design-collab.ko.html", note: "Figma + pen.dev + Material 3 + 시각적 회귀 테스트, Android 엔드투엔드" },
      { label: "컨텍스트 엔지니어링 & 안티패턴 (핵심 내공)", href: "topics/prompt-context-engineering.ko.html#context", note: "어텐션 예산, 장시간 작업 전략, 안전성과 비용, 잘못된 방법 식별" }
    ]
  },
  {
    icon: "🛠️", color: "#a16207", title: "인프라 & 운영 기반",
    desc: "SaaS 호스팅을 넘어 중소규모 프로젝트의 서버/배포/네트워크를 독립적으로 운영",
    steps: [
      { label: "서버 / 배포 / 네트워크 기초 입문", href: "topics/ops-basics.ko.html", note: "5단계 로드맵 + Linux/네트워크/배포 3개 모듈(24강) + 5대 장애 대응표" },
      { label: "R2 시작: VPS 서버 구축", href: "topics/ops-basics.ko.html#stage2", note: "1Core 1GB Ubuntu + SSH + Nginx" },
      { label: "R3 네트워크: 도메인 + DNS + HTTPS", href: "topics/ops-basics.ko.html#stage3", note: "yourdomain.dev + SSL 인증서 + 리버스 프록시" },
      { label: "R4 배포: git push 자동 배포", href: "topics/ops-basics.ko.html#stage4", note: "systemd + GitHub Actions 자동화" },
      { label: "R5 컨테이너: Docker 제로부터 시작하는 완전 정복", href: "topics/docker/01-intro.ko.html", note: "환경 문제 완전 해결, 실전 단계별 학습" },
      { label: "부록 A: 30초 장애 트러블슈팅 표", href: "topics/ops-basics.ko.html#appA", note: "필수 북마크: 502 / SSH 접속 불가 / 디스크 고갈 / OOM / SSL 만료" }
    ]
  },
  {
    icon: "🌐", color: "#1a73e8", title: "풀스택 에코시스템 & 심화",
    desc: "Google AI (Gemini/Antigravity), xAI (Grok/Grok Build) 연동 및 크로스 도메인 역량 확장",
    steps: [
      { label: "Google AI 에코시스템 심층 분석", href: "topics/google-ai-ecosystem.ko.html", note: "Gemini 2.5/3.0 + NotebookLM + Antigravity" },
      { label: "xAI & Grok 에코시스템 완전 정복", href: "topics/grok-ecosystem-guide.ko.html", note: "Colossus 초거대 슈퍼컴퓨터 + Grok Build 클라우드 샌드박스 + 실시간 X 검색" },
      { label: "Antigravity 완전 가이드", href: "topics/antigravity-usage.ko.html", note: "CLI / IDE / SDK / 서브에이전트 / MCP 실전" },
      { label: "AI 기술 역량 확장 가이드", href: "topics/ai-capability-expansion.ko.html", note: "5단계 확장 엔진 + 이종 도메인 매핑 + 1인 개발/솔로프리너" },
      { label: "Android 크래시 & ANR 분석 및 해결", href: "topics/android-crash-anr.ko.html", note: "크래시/ANR 도감 + 오리지널 AI 트리아지 스킬" }
    ]
  }
];

const TOPICS = [
  {
    href: "topics/pencil-docs-zh.ko.html", icon: "📘", tag: "디자인 & 문서", color: "#5b5bf6",
    title: "pen.dev 공식 문서 · 한국어 완벽 가이드",
    desc: "docs.pencil.dev 16개 전체 페이지 완전 수록. 공식 영상, 다이어그램, 각 섹션별 원문 링크 포함.",
    keywords: "pencil 디자인 pen 파일 컴포넌트 변수 단축키 설치 활성화 임포트 익스포트 cli 캔버스",
    meta: ["16개 페이지 수록", "공식 영상 포함", "2026-08 검증 완료"],
    sections: [
      {id:"home",label:"문서 개요"},{id:"installation",label:"설치"},
      {id:"authentication",label:"인증 및 활성화"},{id:"ai-integration",label:"AI 연동"},
      {id:"pen-files",label:".pen 파일"},{id:"design-as-code",label:"Design as Code"},
      {id:"interface",label:"pen.dev 인터페이스"},{id:"variables",label:"변수 (Variables)"},
      {id:"components",label:"컴포넌트"},{id:"slots",label:"슬롯 (Slots)"},
      {id:"code-on-canvas",label:"캔버스 위의 코드"},{id:"design-libraries",label:"디자인 라이브러리"},
      {id:"import-export",label:"가져오기 & 내보내기"},{id:"shortcuts",label:"키보드 단축키"},
      {id:"design-to-code",label:"디자인 ↔ 코드 변환"},{id:"troubleshooting",label:"문제 해결"},
      {id:"pen-format",label:".pen 파일 형식"},{id:"pencil-cli",label:"pen.dev CLI"}
    ]
  },
  {
    href: "topics/pencil-claude-code-best-practices.ko.html", icon: "⚡", tag: "디자인 & 문서", color: "#0ea5e9",
    title: "pen.dev × Claude Code 모범 사례",
    desc: "9개 이상의 정보원 통합: 4대 핵심 워크플로우, 프롬프트 템플릿, 디자인 시스템 엔지니어링, CI/CD 연동, 함정 및 실전 사례(검증 스크린샷 16장 수록).",
    keywords: "pencil claude 워크플로우 프롬프트 prompt 디자인 시스템 함정 사례 모범 사례",
    meta: ["9+ 정보원 통합", "16장 검증 스크린샷", "2026-08 검증 완료"],
    sections: [
      {id:"intro",label:"왜 이 조합인가"},{id:"setup",label:"표준 설정 절차"},
      {id:"workflows",label:"4대 핵심 워크플로우"},{id:"prompts",label:"실전 프롬프트 템플릿"},
      {id:"design-system",label:"디자인 시스템 엔지니어링"},{id:"prompt-patterns",label:"고효율 프롬프트 패턴"},
      {id:"advanced",label:"고급 기법"},{id:"pitfalls",label:"함정 체크리스트"},
      {id:"cases",label:"실제 사례 연구"},{id:"resources",label:"리소스 & 정보원 색인"}
    ]
  },
  {
    href: "topics/ai-ui-design-collab.ko.html", icon: "🎨", tag: "디자인 & 문서", color: "#7c3aed",
    title: "AI 코딩 에이전트 × UI 디자인 도구 · 협업 전경",
    desc: "pen.dev / Figma / Stitch / Galileo / v0 + Claude Code / Codex + Android Jetpack Compose Material 3: 도구 맵, MCP 3대 경로, Android 5단계 파이프라인, 디자인 토큰 엔지니어링, Paparazzi / Roborazzi 시각적 회귀 테스트, 양방향 동기화, 안티패턴 및 프롬프트 라이브러리.",
    keywords: "figma pencil.dev stitch galileo v0 claude code codex mcp 디자인 token variables compose material3 테마 android 시각적 회귀 paparazzi roborazzi 스크린샷 협업 디자인 시스템",
    meta: ["3대 연동 경로", "5단계 Android 파이프라인", "Paparazzi/Roborazzi 이중 회귀", "2026-08 검증 완료"],
    sections: [
      {id:"intro",label:"개요 & 디자인-코드 간극"},
      {id:"map",label:"디자인 도구 포지셔닝"},
      {id:"consume",label:"AI 에이전트의 디자인 해석"},
      {id:"pipeline",label:"5단계 파이프라인"},
      {id:"tokens",label:"Figma → Material 3 토큰 변환"},
      {id:"compose",label:"Compose 생성 & 역반영"},
      {id:"verify",label:"실기기/가상 스크린샷 회귀 테스트"},
      {id:"sync",label:"양방향 동기화 & 디자인 시스템 유지보수"},
      {id:"cases",label:"실전 사례 연구 (커머스 상품 상세)"},
      {id:"antipatterns",label:"안티패턴 & 회피 전략"},
      {id:"prompts",label:"프롬프트 템플릿 모음"},
      {id:"ios-web",label:"iOS / Web 크로스 플랫폼 확장"},
      {id:"resources",label:"리소스 & 정보원"}
    ]
  },
  {
    href: "topics/claude-code-guide.ko.html", icon: "⛏️", tag: "활용 가이드", color: "#d9634a",
    title: "Claude Code 실전 활용 가이드",
    desc: "5가지 황금률, 100여 개 명령어 빠른 참조, 6대 확장 기능 선정, 8대 실전 유스케이스 매뉴얼, 권한 및 보안 설정, 즉시 활용 가능한 템플릿 모음.",
    keywords: "claude code 명령어 단축키 skills hooks mcp 서브에이전트 컨텍스트 권한 설정 템플릿 프롬프트 claude.md 슬래시 명령어",
    meta: ["100+ 명령어 수록", "8대 유스케이스", "5가지 템플릿", "v2.1.x 대응", "2026-08 검증 완료"],
    sections: [
      {id:"mental-model",label:"모든 것은 컨텍스트 중심"},{id:"golden-rules",label:"5가지 황금률"},
      {id:"whats-new",label:"최근 주요 업데이트"},
      {id:"setup",label:"설치 및 초기 설정"},{id:"commands",label:"명령어 빠른 참조",quick:true,quickLabel:"Claude Code 명령어 빠른 참조"},
      {id:"shortcuts",label:"단축키 및 입력 테크닉"},{id:"extensions",label:"6대 확장 기능 선택 가이드"},
      {id:"skills-hooks",label:"Skills / Hooks / MCP / 서브에이전트"},{id:"playbook",label:"8대 유스케이스 실전 매뉴얼"},
      {id:"context",label:"고급 컨텍스트 관리"},{id:"permissions",label:"권한 관리 및 보안"},
      {id:"config-auth",label:"설정 파일 및 계정 관리"},{id:"ecosystem",label:"에코시스템 엄선: 방법론과 팁"},
      {id:"pitfalls",label:"함정 체크리스트"},{id:"templates",label:"즉시 활용 템플릿 모음"},
      {id:"hidden-config",label:"숨겨진 기능과 고급 설정"},
      {id:"resources",label:"리소스 색인"}
    ]
  },
  {
    href: "topics/codex-guide.ko.html", icon: "🟢", tag: "활용 가이드", color: "#0d9373",
    title: "Codex 실전 활용 가이드 · CLI × IDE × Cloud",
    desc: "OpenAI 코딩 에이전트 완벽 분석: 20+ 서브명령어 및 40+ 슬래시 명령어 빠른 참조, 샌드박스 & 승인 3×3 매트릭스, 4가지 목표 지향 학습 경로, 선정 프리즘, 장시간 작업 4단계 규율, 메모리 완료 루프, 브라우저 E2E 검증, Issue-to-PR 자동화, Skills/MCP, Claude Code 협업 전략.",
    keywords: "codex openai 샌드박스 승인 agents.md 클라우드 명령어 협업 gpt 선정 프리즘 학습 경로 4단계 규율 메모리 시스템 e2e 브라우저 검증 github issue pr tdd wsl 성능 튜닝",
    meta: ["5가지 활용 형태", "3×3 샌드박스 매트릭스", "4단계 장시간 작업 규율", "E2E 브라우저 검증", "듀얼 에이전트 협업"],
    sections: [
      {id:"overview",label:"전체 개요 & 선정 프리즘"},{id:"learning-paths",label:"4가지 학습 경로"},
      {id:"setup",label:"설치 및 튜닝"},{id:"whats-new",label:"최신 동향 & 업데이트"},
      {id:"commands",label:"명령어 빠른 참조",quick:true,quickLabel:"Codex 명령어 빠른 참조"},
      {id:"sandbox",label:"샌드박스 & 승인 3×3 매트릭스"},{id:"methodology",label:"핵심 방법론 & 안티패턴"},
      {id:"long-tasks",label:"장시간 작업과 4단계 규율"},{id:"memory-system",label:"메모리 및 완료 루프"},
      {id:"skills-mcp",label:"Skills / MCP / 브라우저 검증"},{id:"config-auth",label:"설정 파일 및 계정 관리"},
      {id:"playbook",label:"실전 파이프라인 & 플레이북"},{id:"hidden-config",label:"내부 구조와 듀얼 에이전트 협업"},
      {id:"resources",label:"리소스 색인"}
    ]
  },
  {
    href: "topics/env-auth-clinic.ko.html", icon: "🚑", tag: "트러블슈팅", color: "#e11d48",
    title: "AI CLI 환경 & 인증 응급 처치 매뉴얼 · Claude Code × Codex",
    desc: "로그인 오류, 환경 설정 충돌, 기기 이전 문제를 한 페이지로 해결: 30초 초기 진단, 5계층 진단법 + 원클릭 무결성 검사, 2대 도구별 5대 카테고리 응급 대응표, 3가지 실전 시나리오(공용 PC, 새 PC, CI/헤드리스), 3단계 완전 초기화 절차.",
    keywords: "로그인 오류 환경 변수 기기 전환 다중 계정 공유 구독 유효하지 않은 API 키 401 403 429 529 속도 제한 쿼터 인증 인증 정보 리셋 복구 트러블슈팅 진단 keychain 프록시 ssh 컨테이너 ci token vs code windows node 버전 사례 크레딧 잔액 wsl econnreset timeout",
    meta: ["30초 초기 진단", "5계층 진단법", "3단계 리셋 절차", "2026-08 검증 완료"],
    sections: [
      {id:"overview",label:"증상 트리아지 + 문제 맵"},{id:"diagnose",label:"5계층 진단법 + 진단 스크립트"},
      {id:"claude-cred",label:"Claude Code 인증 메커니즘"},{id:"claude-config",label:"Claude Code settings.json 완벽 해설"},
      {id:"claude-er",label:"Claude Code 응급 대응 매트릭스"},
      {id:"codex-cred",label:"Codex 인증 메커니즘"},{id:"codex-config",label:"Codex config.toml 완벽 해설"},
      {id:"codex-er",label:"Codex 응급 대응 매트릭스"},
      {id:"shared",label:"공용 기기 / 타인 설정 잔존 해결"},{id:"machines",label:"기기 이전 / 멀티 머신 설정 로밍"},
      {id:"headless",label:"SSH / 컨테이너 / CI 환경 운영"},{id:"cases",label:"실사례 해설: 증상에서 근본 원인 도출"},
      {id:"reset",label:"만능 해결책: 3단계 리셋 절차"},{id:"map",label:"양대 도구 비교 & 리소스 모음"}
    ]
  },
  {
    href: "topics/android-crash-anr.ko.html", icon: "⚡", tag: "트러블슈팅", color: "#65a30d",
    title: "Android 크래시 & ANR 분석 · AI 기반 고효율 트리아지",
    desc: "기초부터 실전까지 완벽 망라: 크래시 도감, ANR 심층 분석, Native 크래시 추적, 전체 툴체인, Play Console / Firebase 콘솔 연동, 난치성 간헐 버그 추적 기법, 오리지널 crash-triage 스킬을 활용한 AI 진단 워크플로우.",
    keywords: "android anr crash 크래시 안정성 firebase play console native 스택 트레이스 로그 트리아지",
    meta: ["12개 장 체계적 해설", "20+ 크래시 도감", "오리지널 AI 스킬", "2026-08 검증 완료"],
    sections: [
      {id:"overview",label:"전체 개요 & 트러블슈팅 철학"},{id:"read-crash",label:"제1강: 크래시 로그 올바르게 읽는 법"},
      {id:"crash-catalog",label:"빈출 크래시 도감과 해결책"},{id:"anr",label:"ANR 심층 해부 및 분석"},
      {id:"native",label:"Native (C/C++) 크래시 추적"},{id:"toolbox",label:"분석 툴체인과 실전 활용"},
      {id:"consoles",label:"Play Console & Firebase 연동"},{id:"device-data",label:"테스트 기기 로그 수집 및 추출"},
      {id:"detective",label:"난치성·간헐적 버그 추적 기법"},{id:"ai-method",label:"AI 연동: 분석 기법 및 프롬프트 설계"},
      {id:"ai-workflow",label:"AI 워크플로우 & 오리지널 스킬"},{id:"governance",label:"품질 거버넌스 체계 & 리소스"}
    ]
  },
  {
    href: "topics/ai-leverage-guide.ko.html", icon: "🧭", tag: "생산성 & 마인드셋", color: "#7c3aed",
    title: "AI로 실제로 무엇을 할 수 있는가 · 활용 전경과 핵심 마인드셋",
    desc: "심층 리서치 기반 실전 인사이트: 역량 한계 맵, 8대 시나리오 ROI 매트릭스, 5대 실전 패러다임 (코딩·글쓰기·리서치·데이터 자동화·일상), 3대 주요 도구 선정 기준, 7가지 핵심 사고법, 재현 가능한 실전 사례 모음, 비개발자용 학습 로드맵.",
    keywords: "ai 활용 업무 생산성 활용 시나리오 문서 작성 주간보고 리서치 학습 데이터 분석 자동화 일상 개선 사고법 프롬프트 주의점 초보자 도구 비교 gemini chatgpt claude codex deep research vibe coding",
    meta: ["8대 유스케이스", "7가지 핵심 사고법", "7가지 실전 연구", "2026-08 검증 완료"],
    sections: [
      {id:"map",label:"전체 파노라마: AI 역량 경계 맵"},{id:"matrix",label:"시나리오별 ROI 매트릭스"},
      {id:"coding",label:"코딩: 최적의 개발 패러다임"},{id:"writing",label:"문서·글쓰기 생산성 극대화"},
      {id:"research",label:"리서치 및 학습 가속화"},{id:"data-auto",label:"데이터 처리 및 작업 자동화"},
      {id:"life",label:"일상생활 및 자기관리 활용"},
      {id:"tools",label:"3대 주요 도구 차이점 및 선택 기준"},{id:"principles",label:"7가지 보편적 핵심 사고법"},
      {id:"cases",label:"재현 가능한 실전 사례 모음"},{id:"learning-path",label:"비개발자를 위한 단계별 로드맵"},
      {id:"resources",label:"리소스 색인"}
    ]
  },
  {
    href: "topics/prompt-context-engineering.ko.html", icon: "🎯", tag: "생산성 & 마인드셋", color: "#0891b2",
    title: "프롬프트 & 컨텍스트 엔지니어링 · 기초 기법부터 설계 사상까지",
    desc: "기초부터 실전까지의 필수 교양: 7가지 기본 기법(❌/✅ 대비 포함), 멀티모달 & RAG 최적화, 3대 모델별 프롬프트 특성 차이, 최신 동적 모델 라우팅, 프롬프트 인젝션 및 보안 방어, Token 경제학과 캐싱을 통한 비용 최적화, 6가지 리라이팅 실전 사례, 12가지 템플릿 모음, 평가 및 버전 관리, 안티패턴, CC/Codex 구현 설계.",
    keywords: "프롬프트 컨텍스트 엔지니어링 few-shot cot 생각의 연쇄 xml 역할 프리필 json 구조화 출력 시스템 프롬프트 claude.md agents.md 압축 서브에이전트 템플릿 환각 평가 안티패턴 어텐션 멀티모달 시각 rag 출처 인용 gpt gemini 모델 차이 token 경제학 캐시 비용 최적화 인젝션 보안 owasp 실전 a/b테스트 모델 라우팅 litellm routellm cascade",
    meta: ["7가지 기법 대비", "12가지 엄선 템플릿", "6가지 완벽 사례", "모델 라우팅 SOTA", "2026-08 검증 완료"],
    sections: [
      {id:"overview",label:"프롬프트에서 컨텍스트로"},{id:"basics",label:"7가지 기초 기법"},
      {id:"structured",label:"구조화된 출력 (Structured Outputs)"},{id:"multimodal",label:"멀티모달 프롬프트"},
      {id:"models",label:"주요 모델별 프롬프트 특성 차이"},{id:"rag",label:"RAG 시나리오 프롬프트"},
      {id:"context",label:"컨텍스트 엔지니어링의 핵심"},{id:"agentic",label:"에이전트 시대의 컨텍스트 설계"},
      {id:"cost",label:"Token 경제학과 비용 관리"},{id:"routing",label:"모델 라우팅 및 자동 전환"},
      {id:"security",label:"프롬프트 인젝션 및 보안 방어"},{id:"cases",label:"실전 사례 연구 (6가지 예제)"},
      {id:"templates",label:"즉시 활용 템플릿 모음 (12패턴)"},{id:"eval",label:"평가·반복·버전 관리"},
      {id:"antipatterns",label:"안티패턴 모음"},{id:"tools",label:"CC / Codex 구현 접근법"},
      {id:"resources",label:"리소스 색인"}
    ]
  },
  {
    href: "topics/ai-capability-expansion.ko.html", icon: "🧗", tag: "생산성 & 마인드셋", color: "#ea580c",
    title: "AI 기술 역량 확장 가이드",
    desc: "특정 기술 스택 전환에 그치지 않고 AI를 활용해 자신의 기술 경계를 확장하는 보편적 방법론: 격차 진단 → AI 고속 인풋 → 비계(Scaffold) 구축 → 검증 루프 → 내재화 및 자산화. 이종 도메인 매핑 기술과 2가지 엔드투엔드 실전 사례(풀스택·크로스플랫폼 / 기술 기반 솔로프리너) 수록.",
    keywords: "풀스택 전환 기술 확장 경계 모바일 android ios web 백엔드 서버 인디 개발 솔로프리너 1인 개발 학습법 방법론 이종 도메인 매핑",
    meta: ["5단계 확장 엔진", "2가지 완벽 실전 사례", "이종 도메인 매핑", "2026-08 검증 완료"],
    sections: [
      {id:"mindset",label:"인식 프레임워크"},{id:"engine",label:"5단계 확장 엔진"},
      {id:"mapping",label:"이종 도메인 매핑 기술"},{id:"case-studies",label:"엔드투엔드 실전 사례"},
      {id:"indie",label:"기술 기반 솔로프리너 실전"},{id:"learning-system",label:"AI 지원형 학습 시스템"},
      {id:"pitfalls",label:"함정과 마인드셋"},{id:"resources",label:"리소스 라이브러리"}
    ]
  },
  {
    href: "topics/toolchain-changelog.ko.html", icon: "📅", tag: "활용 가이드", color: "#b45309",
    title: "툴체인 변경 이력 · 최신 업데이트 요약",
    desc: "Claude Code와 Codex의 버전 업데이트 정보. 개발 습관에 영향을 주는 핵심 변경 사항만 엄선: 브레이킹 체인지(Breaking Changes) 독립 색인(업데이트 후 이상 발생 시 즉시 확인), 동작 변경 및 신기능 분류 정리, 월별 아카이브, 공식 1차 출처 및 로컬 확인 명령어 제공.",
    keywords: "업데이트 변경 버전 체인지로그 릴리스 노트 업그레이드 브레이킹 체인지 신기능 폐기 마이그레이션 opus 5 sonnet 5 gpt-5.6 서브태스크 fork 권한 모드 수동 최신",
    meta: ["브레이킹 체인지 색인", "월별 아카이브", "3단계 분류", "2026-08 검증 완료"],
    sections: [
      {id:"how-to-read",label:"본 페이지 읽는 법"},
      {id:"breaking",label:"브레이킹 체인지 색인",quick:true,quickLabel:"브레이킹 체인지 확인"},
      {id:"m2026-08",label:"2026년 8월"},{id:"m2026-07",label:"2026년 7월"},{id:"m2026-06",label:"2026년 6월"},
      {id:"method",label:"업데이트 정보 유지보수 방침"}
    ]
  },
  {
    href: "topics/ops-basics.ko.html", icon: "🛠️", tag: "인프라 & 운영 기반", color: "#a16207",
    title: "서버 · 운영 · 배포 · 네트워크 · 1인 개발 101",
    desc: "Vercel / Netlify / Cloudflare Pages 등 호스팅 서비스를 넘어 DevOps 장벽을 넘기 위한 실전서: 5단계 로드맵 + Linux/네트워크/배포 3개 모듈 24개 레슨(네트워크 편은 VPN/포트/Localhost/NAT/HTTP3/IPv6 13개 레슨 완전판), 5가지 30초 장애 대응표 수록. 중소규모 프로젝트 서버를 직접 구축하고 운영할 수 있습니다.",
    keywords: "서버 운영 배포 네트워크 linux vps ssh systemd nginx 리버스 프록시 https tls ssl certbot let's encrypt dns 방화벽 ufw 보안 그룹 github actions ci cd 프로세스 관리 포트 패키지 관리자 apt dnf apk 권한 sudo chmod chown docker 컨테이너 비밀키 env 환경 변수 트러블슈팅 502 504 ssh 접속 불가 디스크 고갈 oom ssl 만료 함정 1인 개발 풀스택 기초 101",
    meta: ["5단계 로드맵", "3개 모듈 24개 레슨", "13개 레슨 네트워크 상세 해설", "5가지 장애 대응표", "2026-08 검증 완료"],
    sections: [
      {id:"intro",label:"시작하며: 왜 배워야 하는가"},
      {id:"roadmap",label:"5단계 로드맵"},
      {id:"stage1",label:"R1 현재 상태 파악"},{id:"stage2",label:"R2 Linux 기초"},
      {id:"stage3",label:"R3 네트워크 기반"},{id:"stage4",label:"R4 배포 자동화"},
      {id:"stage5",label:"R5 트러블슈팅"},
      {id:"m1-1",label:"1.1 서버란 무엇인가"},{id:"m1-2",label:"1.2 파일·프로세스·포트"},
      {id:"m1-3",label:"1.3 SSH와 인증 키"},{id:"m1-4",label:"1.4 패키지 관리자"},
      {id:"m1-5",label:"1.5 권한과 사용자 관리"},
      {id:"m2-1",label:"2.1 HTTP→TCP→IP"},{id:"m2-2",label:"2.2 DNS의 전체 구조"},
      {id:"m2-3",label:"2.3 HTTPS/TLS/Let's Encrypt"},{id:"m2-4",label:"2.4 리버스 프록시"},
      {id:"m2-5",label:"2.5 방화벽과 포트"},{id:"m2-6",label:"2.6 공격 표면 (Attack Surface)"},
      {id:"m2-7",label:"2.7 포트의 완전 이해"},{id:"m2-8",label:"2.8 Localhost와 루프백"},
      {id:"m2-9",label:"2.9 VPN과 프록시의 차이"},{id:"m2-10",label:"2.10 공인/사설 IP와 NAT"},
      {id:"m2-11",label:"2.11 디버깅용 네트워크 명령어"},{id:"m2-12",label:"2.12 HTTP/2와 HTTP/3"},
      {id:"m2-13",label:"2.13 IPv6 입문"},
      {id:"m3-1",label:"3.1 배포의 7가지 기본 단계"},{id:"m3-2",label:"3.2 systemd 프로세스 관리"},
      {id:"m3-3",label:"3.3 Nginx 프록시 설정 템플릿"},{id:"m3-4",label:"3.4 Docker 최소 구성 세트"},
      {id:"m3-5",label:"3.5 GitHub Actions 자동화"},{id:"m3-6",label:"3.6 비밀키 및 .env 관리"},
      {id:"appA",label:"부록 A: 5대 장애 대응표",quick:true,quickLabel:"30초 트러블슈팅"},
      {id:"appB",label:"부록 B: 리소스 모음"},
      {id:"appC",label:"부록 C: 용어집"}
    ]
  },
  {
    href: "topics/google-ai-ecosystem.ko.html", icon: "🌐", tag: "풀스택 에코시스템", color: "#1a73e8",
    title: "Google AI 에코시스템 심층 분석 · 기반 모델부터 Agentic IDE까지",
    desc: "최신 종합 실전 가이드: Google Antigravity(CLI/2.0/IDE/SDK/Customizations/Sandbox) 심층 해부 + NotebookLM 지식 리서치 + AI Studio 200만 Token 초장문 컨텍스트 + 5단계 연동 슈퍼 파이프라인 모범 사례.",
    keywords: "google antigravity agy notebooklm ai studio gemini canvas sketch agents agentic cli ide sdk 슬래시 명령어 서브에이전트 planning mode 샌드박스 python sdk source grounding 2m 컨텍스트 팟캐스트 파이프라인",
    meta: ["4가지 활용 형태", "총 26개 장 구성", "Antigravity 심층 해부", "5단계 파이프라인", "2026-08 검증 완료"],
    sections: [
      {id:"intro",label:"00 시작하며: 에코시스템 전체 구조"},
      {id:"ch1-1",label:"1.1 Google AI Studio & API"},
      {id:"ch1-2",label:"1.2 컨텍스트 캐싱 실전"},
      {id:"ch1-3",label:"1.3 구조화된 출력 실전",quick:true,quickLabel:"구조화된 출력 가이드"},
      {id:"ch2-1",label:"2.1 NotebookLM 코어 & Source Grounding"},
      {id:"ch2-2",label:"2.2 장문 텍스트 & 코드베이스 임포트"},
      {id:"ch2-3",label:"2.3 Audio Overview 요약 생성"},
      {id:"ch3-1",label:"3.1 Canvas UI 애자일 프로토타입"},
      {id:"ch3-2",label:"3.2 Imagen 3 & 비전 파이프라인"},
      {id:"ch4-1",label:"4.1 Antigravity 4가지 형태 완전 가이드"},
      {id:"ch4-2",label:"4.2 긱(Geek)을 위한 고급 테크닉 (Slash & Mentions)",quick:true,quickLabel:"Antigravity 숨은 테크닉"},
      {id:"ch4-3",label:"4.3 Python SDK & 커스텀 가로채기"},
      {id:"ch5-1",label:"5.1 4대 도구 연동 슈퍼 파이프라인"},
      {id:"ch5-2",label:"5.2 안티패턴: 4가지 교훈",quick:true,quickLabel:"AI 개발 함정 도감"}
    ]
  },
  {
    href: "topics/antigravity-usage.ko.html", icon: "🛸", tag: "풀스택 에코시스템", color: "#8b5cf6",
    title: "Antigravity 완전 가이드 · CLI × IDE × SDK",
    desc: "Google Agentic 프로그래밍 인프라 핸드북: CLI 서브명령어, Agentic IDE 인터랙션, .agents 커스터마이징, 서브에이전트 협업, MCP 도구 확장, 샌드박스 보안 실전.",
    keywords: "antigravity agy ide cli sdk google gemini 서브에이전트 mcp 커스텀 스킬 규칙 플러그인 샌드박스 바이패스 reactive wakeup",
    meta: ["4가지 형태", "10개 핵심 장", "서브에이전트 격리", "2026-08 검증 완료"],
    sections: [
      {id:"sec1",label:"01 멘탈 모델과 핵심 개념"},
      {id:"sec2",label:"02 설치 및 초기 설정"},
      {id:"sec3",label:"03 CLI 서브명령어 & 키바인딩",quick:true,quickLabel:"AGY 명령어 빠른 참조"},
      {id:"sec4",label:"04 커스터마이징 워크플로우"},
      {id:"sec5",label:"05 서브에이전트 협업 및 오케스트레이션"},
      {id:"sec6",label:"06 고급 툴체인 및 자동화"},
      {id:"sec7",label:"07 성능 및 샌드박스 보안"},
      {id:"sec8",label:"08 빈출 트러블 & 30초 해결책",quick:true,quickLabel:"AGY 응급실"},
      {id:"sec9",label:"09 실전 사례: 엔드투엔드 개발 플로우"},
      {id:"sec10",label:"10 빠른 참조 시트"}
    ]
  },
  {
    href: "topics/grok-ecosystem-guide.ko.html", icon: "𝕏", tag: "풀스택 에코시스템", color: "#d97706",
    title: "xAI & Grok 에코시스템 완전 정복 · 초거대 슈퍼컴퓨터부터 Agentic 엔지니어링까지",
    desc: "가장 하드코어한 실전 가이드: 멤피스 Colossus 20만 GPU 초거대 슈퍼컴퓨터 + Grok 3/4 추론 매트릭스 + Grok Build 클라우드 샌드박스 IDE + Python/TS SDK 구조화된 출력 + Real-Time X Grounding + 실전 프롬프트 템플릿 10선.",
    keywords: "xai grok grok3 grok4 grokbuild build colossus x 실시간 검색 grounding think deepsearch 추론 function calling 프롬프트 캐시 에이전트 스웜 멤피스",
    meta: ["멤피스 20만 GPU 슈퍼컴퓨터", "Grok Build 클라우드 샌드박스", "Real-Time X 연동", "10대 프롬프트 템플릿", "2026-08 검증 완료"],
    sections: [
      {id:"intro",label:"00 시작하며 & Colossus 토폴로지"},
      {id:"ch1-1",label:"1.1 Grok 매트릭스 & 4가지 추론 모드"},
      {id:"ch1-2",label:"1.2 Real-Time X Grounding 실전",quick:true,quickLabel:"Real-Time X 검색 가이드"},
      {id:"ch1-3",label:"1.3 DeepSearch 리서치 리포트"},
      {id:"ch1-4",label:"1.4 Artifacts & Live Canvas"},
      {id:"ch2-1",label:"2.1 Grok Build 클라우드 샌드박스"},
      {id:"ch2-2",label:"2.2 Vibe Coding 파이프라인",quick:true,quickLabel:"Vibe Coding 파이프라인"},
      {id:"ch2-3",label:"2.3 xAI API 라우팅 & 쿼터"},
      {id:"ch2-4",label:"2.4 프롬프트 캐시 & 구조화된 출력"},
      {id:"ch3-1",label:"3.1 Python & TS SDK 퀵스타트"},
      {id:"ch3-2",label:"3.2 실전 Function Calling"},
      {id:"ch3-3",label:"3.3 X 네이티브 검색 연동"},
      {id:"ch3-4",label:"3.4 멀티에이전트 Swarm 아키텍처"},
      {id:"ch3-5",label:"3.5 실전: PR 리뷰 & 감성 분석 봇"},
      {id:"ch4-1",label:"4.1 Grok 고유의 설계 사상과 무검열 특성"},
      {id:"ch4-2",label:"4.2 생각의 연쇄 (CoT) & 반사실적 검증"},
      {id:"ch4-3",label:"4.3 실전 프롬프트 템플릿 10선",quick:true,quickLabel:"Grok 프롬프트 라이브러리"},
      {id:"ch5-1",label:"5.1 API 오류 30초 응급실",quick:true,quickLabel:"Grok API 클리닉"},
      {id:"ch5-2",label:"5.2 환각 및 시빌 공격 방어"},
      {id:"ch5-3",label:"5.3 2026 프론티어 LLM 비교 매트릭스"},
      {id:"ch6-1",label:"6.1 공식 소스 & 도구 색인"},
      {id:"ch6-2",label:"6.2 4단계 마스터 로드맵"}
    ]
  },
  {
    href: "topics/docker/01-intro.ko.html", icon: "🐳", tag: "인프라 & 운영 기반", color: "#0284c7",
    title: "Docker 제로부터 시작하는 완전 정복 인터랙티브 가이드",
    desc: "개념 이해부터 핵심 컴포넌트, Dockerfile의 마법, 데이터 영속화, Compose를 통한 마이크로서비스 구축까지. 35개 레슨의 그림 해설로 문제를 해결하며 직접 손으로 익히는 실전 학습.",
    keywords: "docker 컨테이너 이미지 레지스트리 dockerfile compose 배포 마이크로서비스 환경 구축 입문 제로부터 볼륨 wsl2 네트워크 cgroups 헬스체크 멀티스테이지",
    meta: ["총 35개 레슨 완전 해설", "Mermaid 다이어그램 수록", "함정 탈출 응급실", "2026-08 검증 완료"],
    sections: [
      {id:"",label:"스테이지 1: 개념 빙해 (01-04)"},
      {id:"",label:"스테이지 2: 환경 구축 & 함정 회피 (05-08)"},
      {id:"",label:"스테이지 3: 컨테이너 관리 & 리소스 제한 (09-14)"},
      {id:"",label:"스테이지 4: 이미지 생성 & 멀티스테이지 빌드 (15-21)"},
      {id:"",label:"스테이지 5: 데이터 영속화 & 백업 (22-25)"},
      {id:"",label:"스테이지 6: 네트워크 탐구 & Compose (26-31)"},
      {id:"",label:"스테이지 7: 보안 방어 & 프로덕션 배포 (32-35)"}
    ]
  }
];
