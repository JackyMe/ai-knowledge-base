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
    href: "topics/pencil-docs-zh.ko.html", icon: "📘", tag: "디자인과 제작", color: "#5b5bf6",
    title: "Pencil 문서 가이드",
    desc: "docs.pencil.dev 16개 전체 페이지 완전 수록. 공식 영상, 다이어그램, 각 섹션별 원문 링크 포함.",
    keywords: "pencil 디자인 pen 파일 컴포넌트 변수 단축키 설치 활성화 임포트 익스포트 cli 캔버스",
    meta: ["16개 페이지 수록", "공식 영상 포함", "2026-08 검증 완료"],
    sections: [
      {"id":"installation","label":"설치"},
      {"id":"authentication","label":"인증 및 활성화"},
      {"id":"ai-integration","label":"AI 통합 (MCP)"},
      {"id":"pen-files","label":".pen 파일"},
      {"id":"design-as-code","label":"Design as Code (설계 즉 코드)"},
      {"id":"interface","label":"pen.dev 인터페이스"},
      {"id":"variables","label":"변수 (Variables / Design Tokens)"},
      {"id":"components","label":"컴포넌트 (Components)"},
      {"id":"slots","label":"슬롯 (Slots)"},
      {"id":"code-on-canvas","label":"캔버스 상의 코드 (Code on Canvas / Script Nodes)"},
      {"id":"design-libraries","label":"디자인 라이브러리 (Design Libraries)"},
      {"id":"import-export","label":"가져오기 및 내보내기 (Import & Export)"},
      {"id":"shortcuts","label":"주요 단축키 목록"},
      {"id":"design-to-code","label":"디자인 ↔ 코드 동기화"},
      {"id":"troubleshooting","label":"트러블슈팅"},
      {"id":"pen-format","label":".pen 파일 포맷 사양"},
      {"id":"pencil-cli","label":"pen.dev CLI & MCP 도구 체계"}
    ]
  },
  {
    href: "topics/pencil-claude-code-best-practices.ko.html", icon: "⚡", tag: "디자인과 제작", color: "#0ea5e9",
    title: "Pencil × Claude Code 실전",
    desc: "9개 이상의 정보원 통합: 4대 핵심 워크플로우, 프롬프트 템플릿, 디자인 시스템 엔지니어링, CI/CD 연동, 함정 및 실전 사례(검증 스크린샷 16장 수록).",
    keywords: "pencil claude 워크플로우 프롬프트 prompt 디자인 시스템 함정 사례 모범 사례",
    meta: ["9+ 정보원 통합", "16장 검증 스크린샷", "2026-08 검증 완료"],
    sections: [
      {"id":"intro","label":"왜 pen.dev + Claude Code인가"},
      {"id":"setup","label":"환경 설정 표준 플로우"},
      {"id":"workflows","label":"4대 핵심 워크플로"},
      {"id":"prompts","label":"실무 프롬프트 모음"},
      {"id":"design-system","label":"디자인 시스템 엔지니어링"},
      {"id":"prompt-patterns","label":"고효율 프롬프트 패턴"},
      {"id":"advanced","label":"고급 활용 기법"},
      {"id":"pitfalls","label":"함정 체크리스트"},
      {"id":"cases","label":"실전 케이스 스터디"},
      {"id":"resources","label":"리소스 및 출처 인덱스"}
    ]
  },
  {
    href: "topics/ai-ui-design-collab.ko.html", icon: "🎨", tag: "디자인과 제작", color: "#7c3aed",
    title: "AI와 UI 디자인 협업",
    desc: "pen.dev / Figma / Stitch / Galileo / v0 + Claude Code / Codex + Android Jetpack Compose Material 3: 도구 맵, MCP 3대 경로, Android 5단계 파이프라인, 디자인 토큰 엔지니어링, Paparazzi / Roborazzi 시각적 회귀 테스트, 양방향 동기화, 안티패턴 및 프롬프트 라이브러리.",
    keywords: "figma pencil.dev stitch galileo v0 claude code codex mcp 디자인 token variables compose material3 테마 android 시각적 회귀 paparazzi roborazzi 스크린샷 협업 디자인 시스템",
    meta: ["3대 연동 경로", "5단계 Android 파이프라인", "Paparazzi/Roborazzi 이중 회귀", "2026-08 검증 완료"],
    sections: [
      {"id":"intro","label":"전체 개요: 왜 2026년에 이 협업이 필수적인가"},
      {"id":"map","label":"디자인 도구 맵: 4대 핵심 도구와 적합한 선정"},
      {"id":"consume","label":"AI 에이전트가 디자인을 인식하는 3가지 경로"},
      {"id":"pipeline","label":"Android 엔드투엔드 5단계 파이프라인"},
      {"id":"tokens","label":"Figma → Material 3 디자인 토큰 매핑"},
      {"id":"compose","label":"Compose 컴포넌트 생성 및 양방향 쓰기"},
      {"id":"verify","label":"실기기·가상 스크린샷 회귀 테스트"},
      {"id":"sync","label":"양방향 동기화와 디자인 시스템 유지보수"},
      {"id":"cases","label":"예제: 상품 상세 페이지 구현"},
      {"id":"antipatterns","label":"디자인-코드 협업 10대 안티패턴"},
      {"id":"prompts","label":"실전 프롬프트 템플릿 모음"},
      {"id":"ios-web","label":"iOS SwiftUI & Web 크로스 플랫폼 확장"},
      {"id":"resources","label":"리소스 및 공식 문서 색인"}
    ]
  },
  {
    href: "topics/claude-code-guide.ko.html", icon: "⛏️", tag: "코딩 도구와 모델", color: "#d9634a",
    title: "Claude Code 사용 가이드",
    desc: "5가지 황금률, 100여 개 명령어 빠른 참조, 6대 확장 기능 선정, 8대 실전 유스케이스 매뉴얼, 권한 및 보안 설정, 즉시 활용 가능한 템플릿 모음.",
    keywords: "claude code 명령어 단축키 skills hooks mcp 서브에이전트 컨텍스트 권한 설정 템플릿 프롬프트 claude.md 슬래시 명령어",
    meta: ["100+ 명령어 수록", "8대 유스케이스", "5가지 템플릿", "v2.1.x 대응", "2026-08 검증 완료"],
    sections: [
      {"id":"mental-model","label":"모든 것은 컨텍스트를 중심으로 회전한다"},
      {"id":"golden-rules","label":"5대 황금 법칙"},
      {"id":"whats-new","label":"최근 주요 업데이트 및 브레이킹 체인지"},
      {"id":"setup","label":"설치 및 초기 설정"},
      {"id":"commands","label":"명령어 빠른 참조 매뉴얼","quick":true,"quickLabel":"Claude Code 명령어 빠른 참조"},
      {"id":"shortcuts","label":"단축키 & 입력 테크닉"},
      {"id":"extensions","label":"6대 확장 기능의 선정 기준"},
      {"id":"skills-hooks","label":"Skills · Hooks · 서브에이전트 · MCP"},
      {"id":"subscription-quotas","label":"구독, API 및 컨텍스트"},
      {"id":"vision-artifacts-guide","label":"Artifacts와 컴퓨터 사용의 경계"},
      {"id":"playbook","label":"8대 시나리오 실전 Playbook"},
      {"id":"context","label":"컨텍스트 관리의 극의"},
      {"id":"permissions","label":"권한과 보안 통제"},
      {"id":"config-auth","label":"설정 및 계정 체계 완전 해설"},
      {"id":"ecosystem","label":"생태계 엄선: 방법론 및 결합 레시피"},
      {"id":"pitfalls","label":"안티패턴 & 함정 회피 목록"},
      {"id":"templates","label":"즉시 전력 템플릿 모음"},
      {"id":"hidden-config","label":"공식 도움말로 기능 확인"},
      {"id":"resources","label":"리소스 색인 및 공식 링크"}
    ]
  },
  {
    href: "topics/codex-guide.ko.html", icon: "🟢", tag: "코딩 도구와 모델", color: "#0d9373",
    title: "Codex 사용 가이드",
    desc: "OpenAI 코딩 에이전트 완벽 분석: 20+ 서브명령어 및 40+ 슬래시 명령어 빠른 참조, 샌드박스 & 승인 3×3 매트릭스, 4가지 목표 지향 학습 경로, 선정 프리즘, 장시간 작업 4단계 규율, 메모리 완료 루프, 브라우저 E2E 검증, Issue-to-PR 자동화, Skills/MCP, Claude Code 협업 전략.",
    keywords: "codex openai 샌드박스 승인 agents.md 클라우드 명령어 협업 gpt 선정 프리즘 학습 경로 4단계 규율 메모리 시스템 e2e 브라우저 검증 github issue pr tdd wsl 성능 튜닝",
    meta: ["5가지 활용 형태", "3×3 샌드박스 매트릭스", "4단계 장시간 작업 규율", "E2E 브라우저 검증", "듀얼 에이전트 협업"],
    sections: [
      {"id":"overview","label":"Codex 전체 개요 및 선정 프리즘"},
      {"id":"learning-paths","label":"4가지 목표 지향 학습 경로"},
      {"id":"setup","label":"설치 및 플랫폼 튜닝"},
      {"id":"whats-new","label":"최근 주요 동향 및 브레이킹 체인지"},
      {"id":"commands","label":"명령어 빠른 참조 매뉴얼","quick":true,"quickLabel":"Codex 명령어 빠른 참조"},
      {"id":"sandbox","label":"샌드박스 & 승인 3×3 보안 모델"},
      {"id":"methodology","label":"핵심 방법론 & 초보자 함정 탈출"},
      {"id":"long-tasks","label":"장시간 작업 4단계 규율 & 멀티 세션 엔지니어링"},
      {"id":"memory-system","label":"작업 마무리 & 프로젝트 메모리 루프"},
      {"id":"skills-mcp","label":"Skills, MCP 및 브라우저 엔지니어링"},
      {"id":"config-auth","label":"설정 및 계정 체계 완벽 해설"},
      {"id":"best-practices","label":"작업 및 검증 템플릿"},
      {"id":"subscription-quotas","label":"구독, API 및 컨텍스트"},
      {"id":"image-guide","label":"이미지 작업 전용 가이드"},
      {"id":"playbook","label":"실전 시나리오 핸드북 & 파이프라인"},
      {"id":"hidden-config","label":"로컬 버전 및 기능 확인"},
      {"id":"resources","label":"리소스 색인 및 추천 자료"}
    ]
  },
  {
    href: "topics/gpt-image-guide.ko.html", icon: "🎨", tag: "디자인과 제작", color: "#7c3aed",
    title: "GPT 이미지 생성 가이드",
    desc: "GPT 회원을 위한 이미지 생성 완벽 가이드: DALL-E부터 GPT-4o 네이티브 이미지, Image 2.5로 이어지는 기술 진화 로드맵, 6요소 프롬프트 프레임워크, 15+ 시나리오 템플릿, 스타일 어휘집, 이미지 편집 루프, 텍스트 렌더링 공략, 경쟁 모델 비교 및 기업용 규정 준수 실무.",
    keywords: "이미지 생성 image generation dall-e gpt-4o 프롬프트 prompt 스타일 style 텍스트 렌더링 이미지 편집 투명 배경 png 지브리 픽셀 아트 로고 ui 이커머스 인포그래픽 저작권 안전 midjourney stable diffusion 일관성 seed custom gpt image 2.0 2.5",
    meta: ["4세대 기술 진화", "6요소 프레임워크", "15+ 시나리오 템플릿", "100+ 자료 통합", "2026-09-09 검증"],
    sections: [
      {"id":"evolution","label":"이미지 모델 및 인터페이스"},
      {"id":"subscription","label":"사용량과 비용 확인"},
      {"id":"prompt-framework","label":"6요소 프롬프트 프레임워크"},
      {"id":"prompt-advanced","label":"고급 프롬프트 기법"},
      {"id":"style-control","label":"스타일 제어 및 비주얼 어휘 사전","quick":true,"quickLabel":"스타일 어휘집"},
      {"id":"text-rendering","label":"텍스트 렌더링 공략"},
      {"id":"image-editing","label":"이미지 편집 및 반복 워크플로우"},
      {"id":"consistency","label":"인물과 스타일 일관성"},
      {"id":"scenarios","label":"15+ 실전 시나리오 템플릿","quick":true,"quickLabel":"시나리오 템플릿"},
      {"id":"expert-tricks","label":"결과를 제어하는 실용적인 방법"},
      {"id":"comparison","label":"같은 작업으로 도구 비교"},
      {"id":"safety-copyright","label":"전달 전 확인"},
      {"id":"resources","label":"리소스 색인 및 추천 자료"}
    ]
  },
  {
    href: "topics/env-auth-clinic.ko.html", icon: "🚑", tag: "문제 해결", color: "#e11d48",
    title: "환경 및 로그인 문제 해결",
    desc: "로그인 오류, 환경 설정 충돌, 기기 이전 문제를 한 페이지로 해결: 30초 초기 진단, 5계층 진단법 + 원클릭 무결성 검사, 2대 도구별 5대 카테고리 응급 대응표, 3가지 실전 시나리오(공용 PC, 새 PC, CI/헤드리스), 3단계 완전 초기화 절차.",
    keywords: "로그인 오류 환경 변수 기기 전환 다중 계정 공유 구독 유효하지 않은 API 키 401 403 429 529 속도 제한 쿼터 인증 인증 정보 리셋 복구 트러블슈팅 진단 keychain 프록시 ssh 컨테이너 ci token vs code windows node 버전 사례 크레딧 잔액 wsl econnreset timeout",
    meta: ["30초 초기 진단", "5계층 진단법", "3단계 리셋 절차", "2026-08 검증 완료"],
    sections: [
      {"id":"overview","label":"증상별 빠른 진단 + 장애 분류 맵"},
      {"id":"diagnose","label":"5계층 진단법 + 원클릭 진단 스크립트"},
      {"id":"claude-cred","label":"Claude Code 인증 메커니즘과 우선순위"},
      {"id":"claude-config","label":"Claude Code · settings.json 완전 해설: 최소 실행 구성부터 전체 설정 딕셔너리까지"},
      {"id":"claude-er","label":"Claude Code · 증상별 응급 처치표"},
      {"id":"codex-cred","label":"Codex 인증 메커니즘과 저장 포맷"},
      {"id":"codex-config","label":"Codex · config.toml 완전 해설: 최소 실행 구성부터 전체 설정 딕셔너리까지"},
      {"id":"codex-er","label":"Codex · 증상별 응급 처치표"},
      {"id":"shared","label":"공용 PC / 타인 설정 인수인계 시 정화 절차"},
      {"id":"machines","label":"시나리오 B · PC 교체 / 멀티 머신 동기화"},
      {"id":"headless","label":"SSH / Docker / CI 헤드리스 환경 인증"},
      {"id":"cases","label":"실전 사례 분석: 증상에서 근본 원인까지"},
      {"id":"reset","label":"복구 가능한 진단과 초기화"},
      {"id":"map","label":"2대 도구 비교 대조표 & 리소스"}
    ]
  },
  {
    href: "topics/android-crash-anr.ko.html", icon: "⚡", tag: "문제 해결", color: "#65a30d",
    title: "Android Crash 및 ANR 분석",
    desc: "기초부터 실전까지 완벽 망라: 크래시 도감, ANR 심층 분석, Native 크래시 추적, 전체 툴체인, Play Console / Firebase 콘솔 연동, 난치성 간헐 버그 추적 기법, 오리지널 crash-triage 스킬을 활용한 AI 진단 워크플로우.",
    keywords: "android anr crash 크래시 안정성 firebase play console native 스택 트레이스 로그 트리아지",
    meta: ["12개 장 체계적 해설", "20+ 크래시 도감", "오리지널 AI 스킬", "2026-08 검증 완료"],
    sections: [
      {"id":"overview","label":"전체 개요와 방법론"},
      {"id":"read-crash","label":"제1강: 크래시 로그 올바르게 읽기"},
      {"id":"crash-catalog","label":"빈출 Crash 도감과 근본 해결"},
      {"id":"anr","label":"ANR 심층 해부: 메인 스레드 블로킹의 8대 원인"},
      {"id":"native","label":"Native C/C++ Crash 추적"},
      {"id":"toolbox","label":"분석 툴체인과 명령어 빠른 참조"},
      {"id":"consoles","label":"Play Console과 Firebase Crashlytics 연동"},
      {"id":"device-data","label":"실기기 데이터 추출 가이드"},
      {"id":"detective","label":"난치성·간헐적 결함 추적 기법"},
      {"id":"ai-method","label":"AI 연동: 분석 기법 및 프롬프트 설계"},
      {"id":"ai-workflow","label":"AI 워크플로우 & 오리지널 crash-triage Skill"},
      {"id":"governance","label":"품질 거버넌스 체계와 리소스"}
    ]
  },
  {
    href: "topics/ai-leverage-guide.ko.html", icon: "🧭", tag: "AI 기초와 활용", color: "#7c3aed",
    title: "AI 입문과 활용법",
    desc: "심층 리서치 기반 실전 인사이트: 역량 한계 맵, 8대 시나리오 ROI 매트릭스, 5대 실전 패러다임 (코딩·글쓰기·리서치·데이터 자동화·일상), 3대 주요 도구 선정 기준, 7가지 핵심 사고법, 재현 가능한 실전 사례 모음, 비개발자용 학습 로드맵.",
    keywords: "ai 활용 업무 생산성 활용 시나리오 문서 작성 주간보고 리서치 학습 데이터 분석 자동화 일상 개선 사고법 프롬프트 주의점 초보자 도구 비교 gemini chatgpt claude codex deep research vibe coding",
    meta: ["8대 유스케이스", "7가지 핵심 사고법", "7가지 실전 연구", "2026-08 검증 완료"],
    sections: [
      {"id":"map","label":"전경 맵: AI가 잘하는 것과 못하는 것"},
      {"id":"matrix","label":"시나리오 × ROI 매트릭스: 어디서 생산성이 극대화되는가"},
      {"id":"coding","label":"프로그래밍 시나리오 최적 패러다임 (Claude Code / Codex)"},
      {"id":"writing","label":"글쓰기 및 문서화 시나리오 패러다임"},
      {"id":"research","label":"리서치 및 학습 시나리오 패러다임"},
      {"id":"data-auto","label":"데이터 및 자동화 시나리오 패러다임"},
      {"id":"life","label":"일상생활 및 자기관리 시나리오 패러다임"},
      {"id":"tools","label":"작업과 환경에 맞춰 선택"},
      {"id":"principles","label":"7가지 보편적 핵심 사고법 (크로스 도메인 공통)"},
      {"id":"cases","label":"재현 가능한 실전 사례집"},
      {"id":"learning-path","label":"일반 사용자를 위한 학습 로드맵: 제로부터 숙련자까지"},
      {"id":"resources","label":"리소스 색인 (신뢰도 순)"}
    ]
  },
  {
    href: "topics/prompt-context-engineering.ko.html", icon: "🎯", tag: "AI 기초와 활용", color: "#0891b2",
    title: "프롬프트 및 컨텍스트 설계",
    desc: "기초부터 실전까지의 필수 교양: 7가지 기본 기법(❌/✅ 대비 포함), 멀티모달 & RAG 최적화, 3대 모델별 프롬프트 특성 차이, 최신 동적 모델 라우팅, 프롬프트 인젝션 및 보안 방어, Token 경제학과 캐싱을 통한 비용 최적화, 6가지 리라이팅 실전 사례, 12가지 템플릿 모음, 평가 및 버전 관리, 안티패턴, CC/Codex 구현 설계.",
    keywords: "프롬프트 컨텍스트 엔지니어링 few-shot cot 생각의 연쇄 xml 역할 프리필 json 구조화 출력 시스템 프롬프트 claude.md agents.md 압축 서브에이전트 템플릿 환각 평가 안티패턴 어텐션 멀티모달 시각 rag 출처 인용 gpt gemini 모델 차이 token 경제학 캐시 비용 최적화 인젝션 보안 owasp 실전 a/b테스트 모델 라우팅 litellm routellm cascade",
    meta: ["7가지 기법 대비", "12가지 엄선 템플릿", "6가지 완벽 사례", "모델 라우팅 SOTA", "2026-08 검증 완료"],
    sections: [
      {"id":"overview","label":"전체상: 프롬프트 엔지니어링에서 컨텍스트 엔지니어링으로"},
      {"id":"basics","label":"7대 기본 기법 (❌/✅ 대조)"},
      {"id":"structured","label":"구조화 출력 & 포맷 제어"},
      {"id":"multimodal","label":"멀티모달 프롬프트 작성 요령"},
      {"id":"models","label":"모델별 프롬프트 조정"},
      {"id":"rag","label":"RAG 시나리오 프롬프트 설계"},
      {"id":"context","label":"컨텍스트 엔지니어링 핵심: 주의력은 희소 자원이다"},
      {"id":"agentic","label":"에이전트 컨텍스트 관리 (장기 작업)"},
      {"id":"cost","label":"Token 경제학과 비용 관리"},
      {"id":"routing","label":"모델 라우팅: 평가부터"},
      {"id":"security","label":"Prompt 인젝션 & 보안 방어"},
      {"id":"cases","label":"실전 수정 사례집 (총 6선)"},
      {"id":"templates","label":"실무 템플릿 모음 (총 12식)"},
      {"id":"eval","label":"평가·반복·버전 관리: 감이 아닌 데이터로 개선하기"},
      {"id":"antipatterns","label":"안티패턴 도감"},
      {"id":"tools","label":"Claude Code / Codex 설정 계층"},
      {"id":"resources","label":"리소스 & 출처 인덱스"}
    ]
  },
  {
    href: "topics/ai-capability-expansion.ko.html", icon: "🧗", tag: "AI 기초와 활용", color: "#ea580c",
    title: "AI 역량 확장 실전",
    desc: "특정 기술 스택 전환에 그치지 않고 AI를 활용해 자신의 기술 경계를 확장하는 보편적 방법론: 격차 진단 → AI 고속 인풋 → 비계(Scaffold) 구축 → 검증 루프 → 내재화 및 자산화. 이종 도메인 매핑 기술과 2가지 엔드투엔드 실전 사례(풀스택·크로스플랫폼 / 기술 기반 솔로프리너) 수록.",
    keywords: "풀스택 전환 기술 확장 경계 모바일 android ios web 백엔드 서버 인디 개발 솔로프리너 1인 개발 학습법 방법론 이종 도메인 매핑",
    meta: ["5단계 확장 엔진", "2가지 완벽 실전 사례", "이종 도메인 매핑", "2026-08 검증 완료"],
    sections: [
      {"id":"mindset","label":"인식 프레임워크"},
      {"id":"engine","label":"범용 방법론: 5단계 확장 엔진"},
      {"id":"mapping","label":"이종 도메인 매핑 기술"},
      {"id":"case-studies","label":"엔드투엔드 심층 실전 사례"},
      {"id":"indie","label":"기술 기반 1인 개발 / 솔로프리너 실전"},
      {"id":"learning-system","label":"AI 지원형 개인 학습 시스템"},
      {"id":"pitfalls","label":"함정과 멘탈 모델 (12대 주의사항)"},
      {"id":"resources","label":"리소스 라이브러리"}
    ]
  },
  {
    href: "topics/toolchain-changelog.ko.html", icon: "📅", tag: "변경 기록", color: "#b45309",
    title: "AI 도구 변경 기록",
    desc: "Claude Code와 Codex의 버전 업데이트 정보. 개발 습관에 영향을 주는 핵심 변경 사항만 엄선: 브레이킹 체인지(Breaking Changes) 독립 색인(업데이트 후 이상 발생 시 즉시 확인), 동작 변경 및 신기능 분류 정리, 월별 아카이브, 공식 1차 출처 및 로컬 확인 명령어 제공.",
    keywords: "업데이트 변경 버전 체인지로그 릴리스 노트 업그레이드 브레이킹 체인지 신기능 폐기 마이그레이션 opus 5 sonnet 5 gpt-5.6 서브태스크 fork 권한 모드 수동 최신",
    meta: ["브레이킹 체인지 색인", "월별 아카이브", "3단계 분류", "2026-08 검증 완료"],
    sections: [
      {"id":"how-to-read","label":"변경 기록 읽기"},
      {"id":"breaking","label":"확인된 Codex 옵션 동작","quick":true,"quickLabel":"브레이킹 체인지 확인"},
      {"id":"m2026-09","label":"공식 업데이트 자료"},
      {"id":"method","label":"업그레이드 및 복원 확인"}
    ]
  },
  {
    href: "topics/ops-basics.ko.html", icon: "🛠️", tag: "개발 기초", color: "#a16207",
    title: "서버, 네트워크 및 배포",
    desc: "Vercel / Netlify / Cloudflare Pages 등 호스팅 서비스를 넘어 DevOps 장벽을 넘기 위한 실전서: 5단계 로드맵 + Linux/네트워크/배포 3개 모듈 24개 레슨(네트워크 편은 VPN/포트/Localhost/NAT/HTTP3/IPv6 13개 레슨 완전판), 5가지 30초 장애 대응표 수록. 중소규모 프로젝트 서버를 직접 구축하고 운영할 수 있습니다.",
    keywords: "서버 운영 배포 네트워크 linux vps ssh systemd nginx 리버스 프록시 https tls ssl certbot let's encrypt dns 방화벽 ufw 보안 그룹 github actions ci cd 프로세스 관리 포트 패키지 관리자 apt dnf apk 권한 sudo chmod chown docker 컨테이너 비밀키 env 환경 변수 트러블슈팅 502 504 ssh 접속 불가 디스크 고갈 oom ssl 만료 함정 1인 개발 풀스택 기초 101",
    meta: ["5단계 로드맵", "3개 모듈 24개 레슨", "13개 레슨 네트워크 상세 해설", "5가지 장애 대응표", "2026-08 검증 완료"],
    sections: [
      {"id":"intro","label":"왜 배워야 하는가"},
      {"id":"roadmap","label":"5단계 로드맵"},
      {"id":"stage1","label":"R1 · 현재 상태 점검"},
      {"id":"stage2","label":"R2 · Linux 기초"},
      {"id":"stage3","label":"R3 · 네트워크 핵심"},
      {"id":"stage4","label":"R4 · 배포 파이프라인"},
      {"id":"stage5","label":"R5 · 장애 분석 및 트러블슈팅"},
      {"id":"m1-1","label":"1.1 서버란 무엇인가"},
      {"id":"m1-2","label":"1.2 3대 추상화 개념: 파일 시스템, 프로세스, 포트"},
      {"id":"m1-3","label":"1.3 SSH는 단순 로그인이 아니다"},
      {"id":"m1-4","label":"1.4 패키지 매니저 요약"},
      {"id":"m1-5","label":"1.5 권한과 사용자 관리"},
      {"id":"m2-1","label":"2.1 HTTP → TCP → IP 계층 구조"},
      {"id":"m2-2","label":"2.2 DNS (도메인 네임 시스템)"},
      {"id":"m2-3","label":"2.3 HTTPS / TLS 암호화와 인증서 관리"},
      {"id":"m2-4","label":"2.4 리버스 프록시 (Reverse Proxy)의 역할"},
      {"id":"m2-5","label":"2.5 방화벽과 접근 제어"},
      {"id":"m2-6","label":"2.6 공격 표면 (Attack Surface) 최소화"},
      {"id":"m2-7","label":"2.7 포트 설계 및 포트 충돌 방지"},
      {"id":"m2-8","label":"2.8 127.0.0.1 vs 0.0.0.0 바인딩 차이"},
      {"id":"m2-9","label":"2.9 VPN과 프록시 활용"},
      {"id":"m2-10","label":"2.10 공인 IP, NAT, 터널링 기술"},
      {"id":"m2-11","label":"2.11 네트워크 진단 필수 명령어"},
      {"id":"m2-12","label":"2.12 HTTP/2 및 HTTP/3 (QUIC)"},
      {"id":"m2-13","label":"2.13 IPv6 현황과 모범 사례"},
      {"id":"m3-1","label":"3.1 프로덕션 배포 7단계 파이프라인"},
      {"id":"m3-2","label":"3.2 systemd 프로세스 데몬화 및 자동 복구"},
      {"id":"m3-3","label":"3.3 Nginx 리버스 프록시 프로덕션 템플릿"},
      {"id":"m3-4","label":"3.4 Docker 핵심 세트"},
      {"id":"m3-5","label":"3.5 GitHub Actions 자동 배포 파이프라인"},
      {"id":"m3-6","label":"3.6 시크릿과 환경 변수(.env)의 안전한 관리"},
      {"id":"appA","label":"5대 장애 30초 긴급 처방전","quick":true,"quickLabel":"30초 트러블슈팅"},
      {"id":"appB","label":"추천 레퍼런스 & 공식 정보"},
      {"id":"appC","label":"핵심 용어집 (Glossary)"}
    ]
  },
  {
    href: "topics/google-ai-ecosystem.ko.html", icon: "🌐", tag: "코딩 도구와 모델", color: "#1a73e8",
    title: "Google AI 생태계 가이드",
    desc: "최신 종합 실전 가이드: Google Antigravity(CLI/2.0/IDE/SDK/Customizations/Sandbox) 심층 해부 + NotebookLM 지식 리서치 + AI Studio 200만 Token 초장문 컨텍스트 + 5단계 연동 슈퍼 파이프라인 모범 사례.",
    keywords: "google antigravity agy notebooklm ai studio gemini canvas sketch agents agentic cli ide sdk 슬래시 명령어 서브에이전트 planning mode 샌드박스 python sdk source grounding 2m 컨텍스트 팟캐스트 파이프라인",
    meta: ["4가지 활용 형태", "총 26개 장 구성", "Antigravity 심층 해부", "5단계 파이프라인", "2026-08 검증 완료"],
    sections: [
      {"id":"intro","label":"작업별 도구 선택"},
      {"id":"ch1-1","label":"API 연결 및 모델 선택"},
      {"id":"ch1-2","label":"캐시 적중과 총비용"},
      {"id":"ch1-3","label":"구조화 출력 및 검증","quick":true,"quickLabel":"구조화된 출력 가이드"},
      {"id":"ch2-1","label":"NotebookLM: 인용과 검증"},
      {"id":"ch2-2","label":"검색 가능한 자료 준비"},
      {"id":"ch2-3","label":"오디오 개요와 학습"},
      {"id":"ch3-1","label":"Canvas 및 시각적 시제품"},
      {"id":"ch4-1","label":"Antigravity로 구현하기"},
      {"id":"ch5-1","label":"자료에서 동작하는 코드까지"}
    ]
  },
  {
    href: "topics/antigravity-usage.ko.html", icon: "🛸", tag: "코딩 도구와 모델", color: "#8b5cf6",
    title: "Antigravity 사용 가이드",
    desc: "Google Agentic 프로그래밍 인프라 핸드북: CLI 서브명령어, Agentic IDE 인터랙션, .agents 커스터마이징, 서브에이전트 협업, MCP 도구 확장, 샌드박스 보안 실전.",
    keywords: "antigravity agy ide cli sdk google gemini 서브에이전트 mcp 커스텀 스킬 규칙 플러그인 샌드박스 바이패스 reactive wakeup",
    meta: ["4가지 형태", "10개 핵심 장", "서브에이전트 격리", "2026-08 검증 완료"],
    sections: [
      {"id":"sec1","label":"사용 환경 선택"},
      {"id":"sec2","label":"설치 및 로그인"},
      {"id":"sec3","label":"CLI 기본 사용법","quick":true,"quickLabel":"AGY 명령어 빠른 참조"},
      {"id":"sec4","label":"설정 및 확장"},
      {"id":"sec5","label":"백그라운드 및 비대화형 실행"},
      {"id":"sec7","label":"권한, 샌드박스 및 사용량"},
      {"id":"sec8","label":"증상별 문제 해결","quick":true,"quickLabel":"AGY 응급실"},
      {"id":"sec9","label":"검증 가능한 작업 흐름"}
    ]
  },
  {
    href: "topics/grok-ecosystem-guide.ko.html", icon: "𝕏", tag: "코딩 도구와 모델", color: "#d97706",
    title: "Grok 및 xAI 가이드",
    desc: "가장 하드코어한 실전 가이드: 멤피스 Colossus 20만 GPU 초거대 슈퍼컴퓨터 + Grok 3/4 추론 매트릭스 + Grok Build 클라우드 샌드박스 IDE + Python/TS SDK 구조화된 출력 + Real-Time X Grounding + 실전 프롬프트 템플릿 10선.",
    keywords: "xai grok grok3 grok4 grokbuild build colossus x 실시간 검색 grounding think deepsearch 추론 function calling 프롬프트 캐시 에이전트 스웜 멤피스",
    meta: ["멤피스 20만 GPU 슈퍼컴퓨터", "Grok Build 클라우드 샌드박스", "Real-Time X 연동", "10대 프롬프트 템플릿", "2026-08 검증 완료"],
    sections: [
      {"id":"intro","label":"네 가지 진입점과 용도"},
      {"id":"ch1-1","label":"모델 선택 및 평가"},
      {"id":"ch1-2","label":"X 검색 및 사실 확인","quick":true,"quickLabel":"Real-Time X 검색 가이드"},
      {"id":"ch1-3","label":"조사 입력과 검증"},
      {"id":"ch2-1","label":"Grok Bot: 지속 업무와 역할"},
      {"id":"ch2-3","label":"공유 컴퓨터와 승인"},
      {"id":"ch2-4","label":"Skills와 반복 작업"},
      {"id":"ch3-1","label":"Grok Build: 터미널 코딩"},
      {"id":"ch3-3","label":"API, 캐시 및 요금"},
      {"id":"ch4-2","label":"도구 호출 검증"},
      {"id":"ch4-4","label":"협업 예: 자료 정리 및 검토"},
      {"id":"ch5-3","label":"재사용 가능한 작업 요청"},
      {"id":"ch6-1","label":"오류와 진단 순서"},
      {"id":"sub-quotas","label":"구독 및 사용량"},
      {"id":"grok-imagine","label":"이미지 및 동영상"},
      {"id":"ch7-1","label":"출처 및 학습 순서"}
    ]
  },
  {
    href: "topics/docker/01-intro.ko.html", icon: "🐳", tag: "개발 기초", color: "#0284c7",
    title: "Docker 입문부터 배포까지",
    desc: "개념 이해부터 핵심 컴포넌트, Dockerfile의 마법, 데이터 영속화, Compose를 통한 마이크로서비스 구축까지. 35개 레슨의 그림 해설로 문제를 해결하며 직접 손으로 익히는 실전 학습.",
    keywords: "docker 컨테이너 이미지 레지스트리 dockerfile compose 배포 마이크로서비스 환경 구축 입문 제로부터 볼륨 wsl2 네트워크 cgroups 헬스체크 멀티스테이지",
    meta: ["총 35개 레슨 완전 해설", "Mermaid 다이어그램 수록", "함정 탈출 응급실", "2026-08 검증 완료"],
    sections: [
      {"id":"","href":"topics/docker/01-intro.ko.html","label":"01. 프롤로그: 개발자의 세기적 난제"},
      {"id":"","href":"topics/docker/02-what-is-docker.ko.html","label":"02. \"이사\" 비유로 완벽 이해하는 Docker"},
      {"id":"","href":"topics/docker/03-vm-vs-container.ko.html","label":"03. 차원 축소 타격: VM vs 컨테이너"},
      {"id":"","href":"topics/docker/04-core-components.ko.html","label":"04. 그림으로 이해하는 3대 핵심 아키텍처"},
      {"id":"","href":"topics/docker/05-windows-setup.ko.html","label":"05. Windows 사용자를 위한 함정 탈출 가이드"},
      {"id":"","href":"topics/docker/06-mac-linux-setup.ko.html","label":"06. Mac & Linux 환경 구축 가이드"},
      {"id":"","href":"topics/docker/07-registry-mirror.ko.html","label":"07. 미러 사이트 설정: 느린 다운로드 속도 탈출"},
      {"id":"","href":"topics/docker/08-hello-world.ko.html","label":"08. 첫 번째 명령어 뒤에 숨겨진 비밀"},
      {"id":"","href":"topics/docker/09-run-detached.ko.html","label":"09. 백그라운드에서 Nginx 웹사이트 실행하기"},
      {"id":"","href":"topics/docker/10-lifecycle-cmds.ko.html","label":"10. 컨테이너 생명주기 제어 (상태 머신)"},
      {"id":"","href":"topics/docker/11-exec-into.ko.html","label":"11. 내부 진입: 실행 중인 컨테이너 접속"},
      {"id":"","href":"topics/docker/12-logs-detective.ko.html","label":"12. 탐정의 시선: 로그 추적 및 분석"},
      {"id":"","href":"topics/docker/13-resource-limits.ko.html","label":"13. 리소스 제한: OOM 서버 다운 방지"},
      {"id":"","href":"topics/docker/14-healthcheck.ko.html","label":"14. 헬스체크: 컨테이너 자가 진단"},
      {"id":"","href":"topics/docker/15-why-dockerfile.ko.html","label":"15. 수동 환경 설정과 작별하기"},
      {"id":"","href":"topics/docker/16-dockerfile-syntax.ko.html","label":"16. Dockerfile 핵심 문법 완전 정복"},
      {"id":"","href":"topics/docker/17-dockerignore.ko.html","label":"17. .dockerignore 함정 탈출 가이드"},
      {"id":"","href":"topics/docker/18-build-practice.ko.html","label":"제18레슨: 실전: Web 프로젝트 이미지 빌드"},
      {"id":"","href":"topics/docker/19-layer-caching.ko.html","label":"제19레슨: 그림으로 보는 레이어 캐시의 마법 (매우 중요!)"},
      {"id":"","href":"topics/docker/20-frontend-deploy.ko.html","label":"제20레슨: 우아한 Vue / React 프론트엔드 배포"},
      {"id":"","href":"topics/docker/21-multi-stage.ko.html","label":"제21레슨: 궁극의 경량화: 멀티 스테이지 빌드"},
      {"id":"","href":"topics/docker/22-ephemeral-data.ko.html","label":"제22레슨: 단명하는 컨테이너와 사라지는 데이터"},
      {"id":"","href":"topics/docker/23-volumes.ko.html","label":"제23레슨: 궁극의 데이터 보호: 볼륨(Volumes)"},
      {"id":"","href":"topics/docker/24-bind-mounts.ko.html","label":"제24레슨: 개발 치트키: 바인드 마운트"},
      {"id":"","href":"topics/docker/25-volume-backup.ko.html","label":"제25레슨: 금고 이사: 데이터 백업 및 복원"},
      {"id":"","href":"topics/docker/26-network-types.ko.html","label":"제26레슨: 네트워크 탐구: Bridge vs Host"},
      {"id":"","href":"topics/docker/27-container-network.ko.html","label":"제27레슨: 컨테이너 간 통신: IP 직접 입력과의 작별, 이름으로 호출하기"},
      {"id":"","href":"topics/docker/28-why-compose.ko.html","label":"제28레슨: 왜 Docker Compose가 필요한가? 수백 줄 명령어 악몽과의 작별"},
      {"id":"","href":"topics/docker/29-yaml-syntax.ko.html","label":"제29레슨: YAML 문법 초고속 마스터: 들여쓰기의 예술"},
      {"id":"","href":"topics/docker/30-compose-up-part1.ko.html","label":"제30레슨: 실전 배틀(상): Web + Redis 캐시 연동 Compose 풀스택 구축"},
      {"id":"","href":"topics/docker/31-compose-up-part2.ko.html","label":"제31레슨: 실전 배틀(하): 마이크로서비스 3계층(Web + Cache + DB) 완벽 오케스트레이션"},
      {"id":"","href":"topics/docker/32-env-security.ko.html","label":"제32레슨: 성벽 방어: .env를 통한 비밀 정보 보호"},
      {"id":"","href":"topics/docker/33-system-prune.ko.html","label":"제33레슨: 디스크 대청소: \"No space left on device\" 에러 탈출기"},
      {"id":"","href":"topics/docker/34-production-root.ko.html","label":"제34레슨: 프로덕션 절대 원칙: Root 권한으로 애플리케이션을 실행하지 말 것"},
      {"id":"","href":"topics/docker/35-cicd-concept.ko.html","label":"제35레슨: 에필로그: CI/CD 자동화 파이프라인과 그 너머의 세상"}
    ]
  }
];
