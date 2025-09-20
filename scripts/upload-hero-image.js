#!/usr/bin/env node

/**
 * 上传首页Hero背景图片到Cloudinary
 * 使用方法：node scripts/upload-hero-image.js
 */

import cloudinary from 'cloudinary';
import fs from 'fs';
import path from 'path';
import https from 'https';
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

// Google Photos图片URL
const googlePhotosUrl = 'https://lh3.googleusercontent.com/rd-gg-dl/AJfQ9KQgFaiYbwPNLsWYU5OeOCoMXiQ6GDdQQT2MLeBxWHO5HUqZqG2dE8qRfwKYBNARFopbmH3MGd-bjhRbVGSfJzz0UIwzlKX2dkUn_EDADiXIHeHkF6lODJoKRKedz86a7cVSHGxrS_4FZwhVFqBmQFjKWpEtkB83VVgj5y_Q7JPHVrCUvNOPqd1CJis1-hPPAxlXv72qcmQMHUBvpBzYGKr9ZqRA-_JhBO2V85Lw3mjM6lkeIugMkAh4HfudfM2BhYJq0gVrxGF9fnCDvBwPYYIRjYC2tJQoIcFbyirxuG3V3I-nzI7a0PrPURV27ubG_a5smwQiNASYufc71d75to3WEphokM-YL7PU_DDVaTQq2E9WK6NBPRsG7r5GZuRG3gKHvf9Dj2wU8BvrTobeJMMsLWXgsRVy8HerWeVwZyzSAVJI56Wr4ZmMiQJOfzsaNYkSS6iTmwS1OiuQ3FOTQZn1xiuJAvMYg7ebFyaSuI7FoiHIe4i8x1RJJ1sSP1DkAaEpfPBTG_myfz6tiyR5aH1SoaVeyfj1wV760pRe3iMRoYDCkRrjwrpHESVFSObLzbsmlUN8pqikyKYxGWkYYO2EW8KgGJRJnnfySiFJRlAtgrL8WN9uySMFLWzjdglpfoIzrqcHmehALmmq0M33gE6JP5WrGM1xDyvF4fD6bFMhezEbhX6jD1muAuoUubKnq799dJ6oqPpv2du1Ugh2HVgmWINvYJLf4Q-S9RxIkUQBL7S18f9QDb--6R-Kdz7H-Zdm4-zkbsghPtzcFlbFZd6zjPTbEhlYT6G_acirTf1wi_Bg66LSQwE7wADycg-0nSFwBPEuPIAVum1nGZgbP57VwtwID1Fl-uSygrvhT39ZN8sNXuWH5FuSkHEQ-vyeNT3v9zKBQXTrM6TzvG0Zee_GUzrwh0dXacq8siDEvfFFTXzRUvnmrY96vYsxa9vTNqKJlVF_dv-EiyjGUxnE_-eTpMR9j3e1ze9itPYhh6ZsF5X2liFKa6GfD1DH3mUZJm9KfeteKa10q6lBXQx-OrDRvrkPmxg-i4AQo28tm_4yP8teWgeK8EhN1bBgL6q76ZZaTrEf7eCCugkCrpUilNcO402kDwzenPQRq2XAm8tKg0LBcl4V86vBqhYKvGbPsiVHl8ceYDnsccWL7ROV-3LZJWjsPE-wNceYROIc2PIAuXWztA62c9gr=s1024';

async function downloadAndUploadHeroImage() {
  try {
    console.log('🚀 开始下载并上传Hero背景图片...\n');
    
    // 创建临时文件夹
    const tempDir = path.join(__dirname, '../temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    
    const tempFilePath = path.join(tempDir, 'hero-image.jpg');
    
    // 下载图片
    console.log('📥 正在下载图片...');
    await downloadImage(googlePhotosUrl, tempFilePath);
    console.log('✅ 图片下载完成');
    
    // 上传到Cloudinary
    console.log('📤 正在上传到Cloudinary...');
    const result = await cloudinaryV2.uploader.upload(tempFilePath, {
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
    
    // 清理临时文件
    fs.unlinkSync(tempFilePath);
    console.log('🧹 临时文件已清理');
    
    // 更新HeroBackground.tsx文件
    console.log('\n📝 正在更新代码文件...');
    await updateHeroBackgroundFile(result.secure_url);
    console.log('✅ 代码文件已更新');
    
    console.log('\n🎉 完成！现在可以刷新网站查看效果了');
    
  } catch (error) {
    console.error('❌ 上传过程中发生错误:', error.message);
    
    // 清理临时文件
    const tempFilePath = path.join(__dirname, '../temp/hero-image.jpg');
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
  }
}

function downloadImage(url, filePath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
      }
    }).on('error', (error) => {
      reject(error);
    });
  });
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

// 运行上传
downloadAndUploadHeroImage();