#!/usr/bin/env node

/**
 * 清理重复照片脚本
 * 删除Cloudinary中的重复照片，保留有正确文件夹的照片
 */

import cloudinary from 'cloudinary';
const { v2: cloudinaryV2 } = cloudinary;

// 配置Cloudinary
cloudinaryV2.config({
  cloud_name: 'do0c7uhxc',
  api_key: '432716195215516',
  api_secret: 'xyrwcwbTy6OZUrbE4lfw7hF4sG8'
});

async function cleanupDuplicates() {
  try {
    console.log('🔍 开始清理重复照片...\n');

    // 获取所有照片
    const result = await cloudinaryV2.api.resources({
      resource_type: 'image',
      type: 'upload',
      max_results: 100,
      context: true
    });

    const photos = result.resources;
    console.log(`📊 总共找到 ${photos.length} 张照片\n`);

    // 按文件名分组（去除Cloudinary后缀）
    const photoGroups = new Map();
    
    photos.forEach(photo => {
      const fileName = photo.public_id.split('/').pop();
      // 去除Cloudinary的随机后缀（最后6位字符）
      const baseName = fileName.replace(/_[a-z0-9]{6}$/, '');
      
      // console.log(`文件名: ${fileName} -> 基础名: ${baseName}`);
      
      if (!photoGroups.has(baseName)) {
        photoGroups.set(baseName, []);
      }
      photoGroups.get(baseName).push(photo);
    });

    // 找出重复照片
    const duplicates = [];
    const toDelete = [];

    photoGroups.forEach((photos, baseName) => {
      if (photos.length > 1) {
        console.log(`\n📸 发现重复照片: ${baseName} (${photos.length} 张)`);
        
        // 按优先级排序：有asset_folder的优先，然后按创建时间
        photos.sort((a, b) => {
          if (a.asset_folder && !b.asset_folder) return -1;
          if (!a.asset_folder && b.asset_folder) return 1;
          return new Date(a.created_at) - new Date(b.created_at);
        });

        const keepPhoto = photos[0];
        const deletePhotos = photos.slice(1);

        console.log(`   ✅ 保留: ${keepPhoto.public_id}`);
        if (keepPhoto.asset_folder) {
          console.log(`      文件夹: ${keepPhoto.asset_folder}`);
        }

        deletePhotos.forEach(photo => {
          console.log(`   ❌ 删除: ${photo.public_id}`);
          toDelete.push(photo.public_id);
        });

        duplicates.push({
          baseName,
          keep: keepPhoto,
          delete: deletePhotos
        });
      }
    });

    if (duplicates.length === 0) {
      console.log('✅ 没有发现重复照片！');
      return;
    }

    console.log(`\n📋 总结:`);
    console.log(`   - 发现 ${duplicates.length} 组重复照片`);
    console.log(`   - 需要删除 ${toDelete.length} 张重复照片`);

    // 询问是否执行删除
    console.log('\n⚠️  警告: 这将永久删除重复照片！');
    console.log('💡 建议: 先备份重要照片，然后手动在Cloudinary控制台中删除');
    
    console.log('\n🔧 需要删除的照片列表:');
    toDelete.forEach((publicId, index) => {
      console.log(`${index + 1}. ${publicId}`);
    });

    console.log('\n💡 手动删除步骤:');
    console.log('1. 访问 https://cloudinary.com/console');
    console.log('2. 进入 Media Library');
    console.log('3. 搜索每张照片的public_id');
    console.log('4. 选择照片并点击删除');

  } catch (error) {
    console.error('❌ 清理失败:', error);
  }
}

cleanupDuplicates();
