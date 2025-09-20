#!/bin/bash

# 构建项目
echo "Building project..."
npm run build

# 复制_redirects到dist目录
cp _redirects dist/

# 进入dist目录
cd dist

# 初始化git仓库（如果不存在）
if [ ! -d ".git" ]; then
    git init
    git remote add origin https://github.com/alanlilulu/PW.git
fi

# 添加所有文件
git add .

# 提交更改
git commit -m "Deploy to GitHub Pages - $(date)"

# 推送到gh-pages分支
git push origin HEAD:gh-pages --force

echo "Deployment complete!"
echo "Your site will be available at: https://alanlilulu.github.io/PW/"
