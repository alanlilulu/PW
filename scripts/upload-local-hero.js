#!/usr/bin/env node

/**
 * 上传本地图片作为Hero背景
 * 使用方法：node scripts/upload-local-hero.js <图片文件路径>
 * 示例：node scripts/upload-local-hero.js ./my-hero-image.jpg
 */

import cloudinary from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const { v2: cloudinaryV2 } = cloudinary;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置Cloudinary
cloudinaryV2.config({
  cloud_name: 'do0c7uhxc',
  api_key: '432716195215516',
  api_secret: 'xyrwcwbTy6OZUrbE4lfw7hF4sG8'
});

async function uploadLocalHeroImage(imagePath) {
  try {
    console.log('🚀 开始上传本地Hero背景图片...\n');
    
    // 检查文件是否存在
    if (!fs.existsSync(imagePath)) {
      console.error(`❌ 图片文件不存在: ${imagePath}`);
      process.exit(1);
    }
    
    // 检查文件类型
    const ext = path.extname(imagePath).toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
      console.error('❌ 不支持的文件格式，请使用 JPG, PNG, GIF 或 WebP');
      process.exit(1);
    }
    
    console.log(`📁 图片文件: ${imagePath}`);
    console.log('📤 正在上传到Cloudinary...');
    
    const result = await cloudinaryV2.uploader.upload(imagePath, {
      public_id: 'hero-background',
      folder: 'portfolio-images/hero',
      resource_type: 'image',
      overwrite: true, // 覆盖已存在的文件
      context: {
        custom: {
          album: 'hero-background',
          title: '首页背景图片',
          location: '个人作品',
          photographer: '阿龙',
          upload_date: new Date().toISOString().split('T')[0],
          description: '摄影师阿龙的个人特色展示'
        }
      },
      tags: ['hero', 'background', 'personal-brand', 'photographer'],
      // 优化设置
      quality: 'auto',
      fetch_format: 'auto',
      width: 1920,
      height: 1080,
      crop: 'fill',
      gravity: 'auto'
    });
    
    console.log('✅ 上传成功！');
    console.log(`📋 Public ID: ${result.public_id}`);
    console.log(`🔗 Secure URL: ${result.secure_url}`);
    console.log(`📏 尺寸: ${result.width}x${result.height}`);
    console.log(`💾 大小: ${(result.bytes / 1024 / 1024).toFixed(2)} MB`);
    
    // 更新HeroBackground.tsx文件
    console.log('\n📝 正在更新代码文件...');
    await updateHeroBackgroundFile(result.secure_url);
    console.log('✅ 代码文件已更新');
    
    console.log('\n🎉 完成！现在可以刷新网站查看效果了');
    console.log(`\n📋 你的图片URL: ${result.secure_url}`);
    
  } catch (error) {
    console.error('❌ 上传过程中发生错误:', error.message);
  }
}

async function updateHeroBackgroundFile(imageUrl) {
  const heroBackgroundPath = path.join(__dirname, '../src/components/sections/Hero/HeroBackground.tsx');
  
  const content = `import React from 'react';
import { motion } from 'framer-motion';

export function HeroBackground() {
  return (
    <motion.div 
      className="absolute inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <img
        src="${imageUrl}"
        alt="摄影师阿龙的个人作品"
        className="w-full h-full object-cover"
        onError={(e) => {
          // 如果图片加载失败，显示纯色背景
          e.currentTarget.style.display = 'none';
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90" />
    </motion.div>
  );
}`;
  
  fs.writeFileSync(heroBackgroundPath, content);
}

// 获取命令行参数
const imagePath = process.argv[2];

if (!imagePath) {
  console.log('使用方法: node scripts/upload-local-hero.js <图片文件路径>');
  console.log('示例: node scripts/upload-local-hero.js ./my-hero-image.jpg');
  console.log('\n支持的格式: JPG, PNG, GIF, WebP');
  process.exit(1);
}

uploadLocalHeroImage(imagePath);
