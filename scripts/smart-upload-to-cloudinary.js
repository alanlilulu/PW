#!/usr/bin/env node

/**
 * 智能Cloudinary批量上传工具
 * 支持根据文件夹名自动设置元数据
 * 使用方法：node scripts/smart-upload-to-cloudinary.js <文件夹路径> [相册名称]
 * 示例：node scripts/smart-upload-to-cloudinary.js ./new-photos/ 樱花系列
 */

const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// 配置Cloudinary
cloudinary.config({
  cloud_name: 'do0c7uhxc',
  api_key: '432716195215516',
  api_secret: 'xyrwcwbTy6OZUrbE4lfw7hF4sG8'
});

// 相册配置映射
const ALBUM_CONFIG = {
  '樱花系列': {
    id: 'cherry-blossom',
    title: '樱花系列',
    location: '樱花公园',
    tags: ['portrait', 'cherry-blossom', 'spring']
  },
  '毕业照': {
    id: 'uw-graduation',
    title: 'UW毕业照',
    location: '华盛顿大学',
    tags: ['portrait', 'graduation', 'uw']
  },
  '加州旅行': {
    id: 'california-trip',
    title: '加州旅行',
    location: '加州',
    tags: ['portrait', 'california', 'travel']
  },
  '情侣照': {
    id: 'seattle-couples',
    title: '西雅图情侣',
    location: '西雅图',
    tags: ['portrait', 'couples', 'seattle']
  },
  '郁金香': {
    id: 'seattle-tulips',
    title: '西雅图郁金香',
    location: '西雅图',
    tags: ['portrait', 'tulips', 'seattle']
  },
  '初次见面': {
    id: 'first-meeting',
    title: '初次见面',
    location: '未知地点',
    tags: ['portrait', 'first-meeting']
  }
};

async function smartUploadPhotos(folderPath, albumName) {
  try {
    // 检查文件夹是否存在
    if (!fs.existsSync(folderPath)) {
      console.error(`❌ 文件夹不存在: ${folderPath}`);
      process.exit(1);
    }

    // 读取文件夹中的所有图片文件
    const files = fs.readdirSync(folderPath)
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));

    if (files.length === 0) {
      console.log('❌ 文件夹中没有找到图片文件');
      return;
    }

    // 确定相册配置
    let albumConfig;
    if (albumName && ALBUM_CONFIG[albumName]) {
      albumConfig = ALBUM_CONFIG[albumName];
      console.log(`📁 使用预定义相册配置: ${albumName}`);
    } else {
      // 从文件夹名推断相册配置
      const folderName = path.basename(folderPath);
      albumConfig = {
        id: folderName.toLowerCase().replace(/\s+/g, '-'),
        title: albumName || folderName,
        location: '未知地点',
        tags: ['portrait', folderName.toLowerCase().replace(/\s+/g, '-')]
      };
      console.log(`📁 自动生成相册配置: ${albumConfig.title}`);
    }

    console.log(`📁 找到 ${files.length} 张图片`);
    console.log(`🏷️ 相册配置:`, albumConfig);
    console.log('🚀 开始上传...\n');

    const results = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = path.join(folderPath, file);
      
      try {
        console.log(`📤 上传中: ${file} (${i + 1}/${files.length})`);
        
        // 生成public_id（去掉文件扩展名）
        const publicId = path.parse(file).name;
        
        const result = await cloudinary.uploader.upload(filePath, {
          public_id: publicId,
          folder: `portfolio-images/${albumConfig.id}`, // 使用相册ID作为文件夹
          resource_type: 'image',
          overwrite: false, // 不覆盖已存在的文件
          // 设置元数据
          context: {
            custom: {
              album: albumConfig.id,
              title: albumConfig.title,
              location: albumConfig.location,
              photographer: '阿龙',
              upload_date: new Date().toISOString().split('T')[0],
              album_type: 'portrait'
            }
          },
          tags: albumConfig.tags
        });

        results.push({
          file,
          public_id: result.public_id,
          secure_url: result.secure_url,
          bytes: result.bytes,
          album: albumConfig.id
        });

        console.log(`✅ 上传成功: ${result.public_id}`);
        console.log(`   📁 文件夹: ${result.folder}`);
        console.log(`   🏷️ 标签: ${result.tags?.join(', ')}`);
        
      } catch (error) {
        console.error(`❌ 上传失败 ${file}:`, error.message);
      }
    }

    console.log('\n📊 上传结果:');
    console.log(`✅ 成功: ${results.length} 张`);
    console.log(`❌ 失败: ${files.length - results.length} 张`);

    if (results.length > 0) {
      console.log('\n🔗 上传的照片信息:');
      results.forEach(result => {
        console.log(`- ${result.file}:`);
        console.log(`  📁 相册: ${result.album}`);
        console.log(`  🔗 URL: ${result.secure_url}`);
        console.log(`  📏 大小: ${(result.bytes / 1024).toFixed(1)} KB`);
      });

      console.log('\n🎯 测试新分类系统:');
      console.log(`访问: http://localhost:5173/metadata-albums`);
      console.log(`相册 "${albumConfig.title}" 应该会自动出现！`);
    }

  } catch (error) {
    console.error('❌ 上传过程中发生错误:', error);
  }
}

// 获取命令行参数
const folderPath = process.argv[2];
const albumName = process.argv[3];

if (!folderPath) {
  console.log('使用方法: node scripts/smart-upload-to-cloudinary.js <文件夹路径> [相册名称]');
  console.log('示例: node scripts/smart-upload-to-cloudinary.js ./new-photos/ 樱花系列');
  console.log('\n📋 支持的预定义相册:');
  Object.keys(ALBUM_CONFIG).forEach(name => {
    const config = ALBUM_CONFIG[name];
    console.log(`  - ${name}: ${config.title} (${config.location})`);
  });
  process.exit(1);
}

smartUploadPhotos(folderPath, albumName);
