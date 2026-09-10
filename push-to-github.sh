#!/usr/bin/env bash
# Atheer Social - Automated GitHub Push Script
set -e

if [ -z "$1" ]; then
  echo "❌ الرجاء تمرير رابط المستودع على GitHub:"
  echo "Usage: ./push-to-github.sh https://github.com/USERNAME/REPOSITORY.git"
  exit 1
fi

REPO_URL="$1"

echo "🚀 تجهيز مستودع Git وربطه بـ GitHub..."
git branch -M main

if git remote | grep -q "^origin$"; then
  git remote set-url origin "$REPO_URL"
else
  git remote add origin "$REPO_URL"
fi

git add .
git commit -m "feat: automated update of Atheer Social Android Pro App" || true

echo "📦 جاري رفع الأكواد تلقائياً إلى GitHub..."
git push -u origin main

echo "✅ تم رفع المشروع بالكامل إلى GitHub بنجاح!"
