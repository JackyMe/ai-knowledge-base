#!/bin/bash
# ============================================
# AI 知识库 · 一键提交 + 自动部署
#   bash sync.sh            提交(有 token 时 post-commit 钩子会自动部署)
#   bash sync.sh -m "说明"   自定义提交信息
#   bash sync.sh -d          提交,且即使无新改动也强制部署一次
#   bash sync.sh -D          只部署,不提交
# 首次配置:把 Netlify 个人访问令牌存入 .netlify/auth-token(见 README)
# ============================================
set -e
cd "$(dirname "$0")"
MSG="update: $(date '+%Y-%m-%d %H:%M')"
DEPLOY=0; DEPLOY_ONLY=0
while getopts "dDm:" opt; do
  case $opt in
    d) DEPLOY=1 ;;
    D) DEPLOY_ONLY=1 ;;
    m) MSG="$OPTARG" ;;
  esac
done

deploy(){
  TOKEN="${NETLIFY_AUTH_TOKEN:-$(cat .netlify/auth-token 2>/dev/null || true)}"
  if [ -z "$TOKEN" ]; then
    echo "⚠️  未配置部署令牌:在 app.netlify.com → User settings → Applications 创建"
    echo "   Personal access token,存入 .netlify/auth-token 后即可自动部署"
    return 1
  fi
  SITE_ID="$(cat .netlify/site-id 2>/dev/null || echo 24447634-a4c8-4eed-aa3b-32c1e60110ac)"
  TMP="$(mktemp -d)/site.zip"
  zip -qr "$TMP" . -x ".git/*" ".netlify/*" "*.command" "sync.sh"
  HTTP=$(curl -s -o /tmp/aikb-deploy-resp.json -w "%{http_code}" --max-time 180 \
    -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/zip" \
    --data-binary "@$TMP" "https://api.netlify.com/api/v1/sites/$SITE_ID/deploys" || true)
  rm -f "$TMP"
  case "$HTTP" in
    200|201) echo "🌐 已部署 → https://aidoc-zq.netlify.app" ;;
    000|"")  echo "❌ 无法连接 Netlify(当前网络受限?)——请在本机终端运行 bash sync.sh -D"; return 1 ;;
    *)       echo "❌ 部署失败(HTTP $HTTP),响应见 /tmp/aikb-deploy-resp.json"; return 1 ;;
  esac
}

if [ $DEPLOY_ONLY -eq 1 ]; then deploy; exit $?; fi

COMMITTED=0
git add -A
if git diff --cached --quiet; then
  echo "没有改动,无需提交"
else
  git commit -m "$MSG"     # post-commit 钩子会自动部署
  COMMITTED=1
  echo "✅ 已提交: $MSG"
fi
# -d 且本次没有产生新提交(钩子没跑)→ 手动部署一次
if [ $DEPLOY -eq 1 ] && [ $COMMITTED -eq 0 ]; then deploy; fi
