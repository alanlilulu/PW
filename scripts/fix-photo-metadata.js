#!/usr/bin/env node

/**
 * 修复照片元数据脚本
 * 检查并修复Cloudinary中照片的分类问题
 */

import cloudinary from 'cloudinary';
const { v2: cloudinaryV2 } = cloudinary;

// 配置Cloudinary
cloudinaryV2.config({
  cloud_name: 'do0c7uhxc',
  api_key: '432716195215516',
  api_secret: 'xyrwcwbTy6OZUrbE4lfw7hF4sG8'
});

async function fixPhotoMetadata() {
  try {
    console.log('🔍 开始检查照片元数据...\n');

    // 获取所有照片
    const result = await cloudinaryV2.api.resources({
      resource_type: 'image',
      type: 'upload',
      max_results: 100,
      context: true
    });

    const photos = result.resources;
    console.log(`📊 总共找到 ${photos.length} 张照片\n`);

    // 分析照片分类
    const classificationAnalysis = {
      'uw-graduation': [],
      'cherry-blossom': [],
      'california-ditto': [],
      'seattle-couples': [],
      'first-meeting': [],
      'seattle-tulips': [],
      'others': [],
      'uncategorized': []
    };

    photos.forEach(photo => {
      const { public_id, asset_folder, tags, context } = photo;
      
      // 分析分类
      let category = 'uncategorized';
      
      if (asset_folder) {
        const folderParts = asset_folder.split('/');
        const lastFolder = folderParts[folderParts.length - 1];
        
        if (lastFolder === 'uw-graduation') {
          category = 'uw-graduation';
        } else if (lastFolder === 'cherry-blossom') {
          category = 'cherry-blossom';
        } else if (lastFolder === 'california-ditto') {
          category = 'california-ditto';
        } else if (lastFolder === 'seattle-couples') {
          category = 'seattle-couples';
        } else if (lastFolder === 'first-meeting') {
          category = 'first-meeting';
        } else if (lastFolder === 'seattle-tulips') {
          category = 'seattle-tulips';
        } else {
          category = 'others';
        }
      } else {
        // 从文件名推断
        const fileName = public_id.split('/').pop();
        if (fileName.includes('UW毕业') || fileName.includes('毕业')) {
          category = 'uw-graduation';
        } else if (fileName.includes('樱花') || fileName.includes('cherry')) {
          category = 'cherry-blossom';
        } else if (fileName.includes('加州') || fileName.includes('california')) {
          category = 'california-ditto';
        } else if (fileName.includes('情侣') || fileName.includes('couple')) {
          category = 'seattle-couples';
        } else if (fileName.includes('第一次') || fileName.includes('first')) {
          category = 'first-meeting';
        } else if (fileName.includes('tulip-portrait')) {
          category = 'seattle-tulips';
        } else {
          category = 'others';
        }
      }

      classificationAnalysis[category].push({
        public_id,
        asset_folder,
        tags,
        context: context?.custom
      });
    });

    // 显示分析结果
    console.log('📋 分类分析结果:');
    Object.entries(classificationAnalysis).forEach(([category, photos]) => {
      if (photos.length > 0) {
        console.log(`\n📁 ${category}: ${photos.length} 张照片`);
        photos.forEach(photo => {
          console.log(`   - ${photo.public_id}`);
          if (photo.asset_folder) {
            console.log(`     文件夹: ${photo.asset_folder}`);
          }
          if (photo.tags && photo.tags.length > 0) {
            console.log(`     标签: ${photo.tags.join(', ')}`);
          }
        });
      }
    });

    // 检查需要修复的照片
    console.log('\n🔧 需要修复的照片:');
    const needsFix = classificationAnalysis['others'].concat(classificationAnalysis['uncategorized']);
    
    if (needsFix.length > 0) {
      console.log(`\n发现 ${needsFix.length} 张照片需要修复:`);
      
      needsFix.forEach(photo => {
        console.log(`\n📸 ${photo.public_id}`);
        
        // 建议修复方案
        const fileName = photo.public_id.split('/').pop();
        let suggestedFolder = '';
        let suggestedTags = [];
        
        if (fileName.includes('UW毕业') || fileName.includes('毕业')) {
          suggestedFolder = 'portfolio-images/uw-graduation';
          suggestedTags = ['portrait', 'graduation', 'uw'];
        } else if (fileName.includes('樱花') || fileName.includes('cherry')) {
          suggestedFolder = 'portfolio-images/cherry-blossom';
          suggestedTags = ['portrait', 'cherry-blossom', 'spring'];
        } else if (fileName.includes('加州') || fileName.includes('california')) {
          suggestedFolder = 'portfolio-images/california-ditto';
          suggestedTags = ['portrait', 'california', 'travel'];
        } else if (fileName.includes('情侣') || fileName.includes('couple')) {
          suggestedFolder = 'portfolio-images/seattle-couples';
          suggestedTags = ['portrait', 'couples', 'seattle'];
        } else if (fileName.includes('第一次') || fileName.includes('first')) {
          suggestedFolder = 'portfolio-images/first-meeting';
          suggestedTags = ['portrait', 'first-meeting'];
        } else if (fileName.includes('tulip-portrait')) {
          suggestedFolder = 'portfolio-images/seattle-tulips';
          suggestedTags = ['portrait', 'tulips', 'seattle'];
        } else {
          suggestedFolder = 'portfolio-images/other';
          suggestedTags = ['portrait', 'other'];
        }
        
        console.log(`   建议文件夹: ${suggestedFolder}`);
        console.log(`   建议标签: ${suggestedTags.join(', ')}`);
        
        // 提供修复命令
        console.log(`   修复命令:`);
        console.log(`   cloudinaryV2.uploader.rename('${photo.public_id}', '${suggestedFolder}/${fileName}')`);
        console.log(`   cloudinaryV2.uploader.add_tag('${suggestedTags.join(',')}', '${photo.public_id}')`);
      });
      
      console.log('\n💡 修复建议:');
      console.log('1. 在Cloudinary控制台中手动移动照片到正确的文件夹');
      console.log('2. 或者使用上面的命令在代码中修复');
      console.log('3. 或者重新上传照片到正确的文件夹');
      
    } else {
      console.log('✅ 所有照片都已正确分类！');
    }

  } catch (error) {
    console.error('❌ 检查失败:', error);
  }
}

fixPhotoMetadata();
