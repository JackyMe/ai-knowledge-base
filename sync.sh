#!/bin/bash
# ============================================
# AI 知识库 · 一键提交 + 可选部署
# 用法:
#   ./sync.sh            只提交 git
#   ./sync.sh -d         提交 git 并部署到 Netlify(需先完成一次 netlify link)
#   ./sync.sh -m "说明"  自定义提交信息
# ============================================
set -e
cd "$(dirname "$0")"
MSG="update: $(date '+%Y-%m-%d %H:%M')"
DEPLOY=0
while getopts "dm:" opt; do
  case $opt in
    d) DEPLOY=1 ;;
    m) MSG="$OPTARG" ;;
  esac
done
git add -A
if git diff --cached --quiet; then
  echo "没有改动,无需提交"
else
  git commit -m "$MSG"
  echo "✅ 已提交: $MSG"
fi
if [ $DEPLOY -eq 1 ]; then
  npx netlify-cli deploy --prod --dir . && echo "🌐 已部署到 aidoc-zq.netlify.app"
fi
