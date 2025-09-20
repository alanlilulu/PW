#!/usr/bin/env node

/**
 * Cloudinary批量上传工具
 * 使用方法：node scripts/upload-to-cloudinary.js <文件夹路径>
 * 示例：node scripts/upload-to-cloudinary.js ./new-photos/
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

async function uploadPhotos(folderPath) {
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

    console.log(`📁 找到 ${files.length} 张图片`);
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
          folder: 'portfolio-images', // 统一放在portfolio-images文件夹
          resource_type: 'image',
          overwrite: false, // 不覆盖已存在的文件
          // 添加元数据支持
          context: {
            custom: {
              album: 'new-album', // 可以根据文件夹名自动设置
              title: '新相册', // 可以根据需要自定义
              location: '未知地点', // 可以根据需要自定义
              photographer: '阿龙', // 摄影师信息
              upload_date: new Date().toISOString().split('T')[0] // 上传日期
            }
          },
          tags: ['portrait', 'new-album'] // 添加标签
        });

        results.push({
          file,
          public_id: result.public_id,
          secure_url: result.secure_url,
          bytes: result.bytes
        });

        console.log(`✅ 上传成功: ${result.public_id}`);
        
      } catch (error) {
        console.error(`❌ 上传失败 ${file}:`, error.message);
      }
    }

    console.log('\n📊 上传结果:');
    console.log(`✅ 成功: ${results.length} 张`);
    console.log(`❌ 失败: ${files.length - results.length} 张`);

    if (results.length > 0) {
      console.log('\n🔗 上传的照片URL:');
      results.forEach(result => {
        console.log(`- ${result.public_id}: ${result.secure_url}`);
      });
    }

  } catch (error) {
    console.error('❌ 上传过程中发生错误:', error);
  }
}

// 获取命令行参数
const folderPath = process.argv[2];

if (!folderPath) {
  console.log('使用方法: node scripts/upload-to-cloudinary.js <文件夹路径>');
  console.log('示例: node scripts/upload-to-cloudinary.js ./new-photos/');
  process.exit(1);
}

uploadPhotos(folderPath);
