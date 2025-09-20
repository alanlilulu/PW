#!/usr/bin/env node

/**
 * Cloudinary 照片删除脚本
 * 使用方法: node scripts/delete-cloudinary-images.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

// 从环境变量或配置文件读取配置
function getConfig() {
  // 尝试读取 .env.local 文件
  const envPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const lines = envContent.split('\n');
    
    const config = {};
    lines.forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) {
        config[key.trim()] = value.trim();
      }
    });
    
    return {
      cloudName: config.VITE_CLOUDINARY_CLOUD_NAME,
      apiKey: config.VITE_CLOUDINARY_API_KEY,
      apiSecret: config.VITE_CLOUDINARY_API_SECRET
    };
  }
  
  return null;
}

// 生成 Cloudinary 签名
function generateSignature(params, apiSecret) {
  const crypto = require('crypto');
  const sortedParams = Object.keys(params)
    .filter(key => params[key] !== undefined && params[key] !== '')
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&');
  
  return crypto.createHash('sha1').update(sortedParams + apiSecret).digest('hex');
}

// 删除单张照片
async function deleteImage(publicId, config) {
  const timestamp = Math.round(new Date().getTime() / 1000);
  
  const params = {
    public_id: publicId,
    api_key: config.apiKey,
    timestamp: timestamp
  };
  
  params.signature = generateSignature(params, config.apiSecret);
  
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${config.cloudName}/image/destroy`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      }
    );

    const result = await response.json();
    
    if (result.result === 'ok') {
      return { success: true, message: `照片 ${publicId} 删除成功` };
    } else {
      return { success: false, message: result.error?.message || '删除失败' };
    }
  } catch (error) {
    return { success: false, message: `网络错误: ${error.message}` };
  }
}

// 批量删除照片
async function deleteMultipleImages(publicIds, config) {
  console.log(`\n开始删除 ${publicIds.length} 张照片...`);
  
  const results = [];
  let successCount = 0;
  let failCount = 0;
  
  for (let i = 0; i < publicIds.length; i++) {
    const publicId = publicIds[i];
    console.log(`[${i + 1}/${publicIds.length}] 删除: ${publicId}`);
    
    const result = await deleteImage(publicId, config);
    results.push(result);
    
    if (result.success) {
      successCount++;
      console.log(`✅ ${result.message}`);
    } else {
      failCount++;
      console.log(`❌ ${result.message}`);
    }
    
    // 添加延迟避免 API 限制
    if (i < publicIds.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  console.log(`\n删除完成！成功: ${successCount}, 失败: ${failCount}`);
  return results;
}

// 从文件读取照片列表
function readImageListFromFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return content.split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#')); // 过滤空行和注释
  } catch (error) {
    console.error(`读取文件失败: ${error.message}`);
    return [];
  }
}

// 主函数
async function main() {
  console.log('🗑️  Cloudinary 照片删除工具\n');
  
  // 检查配置
  const config = getConfig();
  if (!config || !config.cloudName || !config.apiKey || !config.apiSecret) {
    console.log('❌ 配置不完整！请确保 .env.local 文件包含以下配置：');
    console.log('VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name');
    console.log('VITE_CLOUDINARY_API_KEY=your_api_key');
    console.log('VITE_CLOUDINARY_API_SECRET=your_api_secret');
    console.log('\n或者手动输入配置信息。');
    
    const useManualConfig = await question('\n是否手动输入配置？(y/n): ');
    if (useManualConfig.toLowerCase() === 'y') {
      config.cloudName = await question('请输入 Cloud Name: ');
      config.apiKey = await question('请输入 API Key: ');
      config.apiSecret = await question('请输入 API Secret: ');
    } else {
      rl.close();
      return;
    }
  }
  
  console.log(`✅ 配置验证成功！Cloud Name: ${config.cloudName}\n`);
  
  // 选择删除模式
  console.log('请选择删除模式：');
  console.log('1. 删除单张照片');
  console.log('2. 批量删除照片');
  console.log('3. 从文件读取照片列表删除');
  console.log('4. 退出');
  
  const choice = await question('\n请输入选择 (1-4): ');
  
  switch (choice) {
    case '1':
      await deleteSingleImage(config);
      break;
    case '2':
      await deleteMultipleImagesManually(config);
      break;
    case '3':
      await deleteFromFile(config);
      break;
    case '4':
      console.log('👋 再见！');
      break;
    default:
      console.log('❌ 无效选择');
  }
  
  rl.close();
}

// 删除单张照片
async function deleteSingleImage(config) {
  const publicId = await question('\n请输入要删除的照片 Public ID: ');
  if (!publicId.trim()) {
    console.log('❌ Public ID 不能为空');
    return;
  }
  
  console.log(`\n正在删除照片: ${publicId}`);
  const result = await deleteImage(publicId, config);
  
  if (result.success) {
    console.log(`✅ ${result.message}`);
  } else {
    console.log(`❌ ${result.message}`);
  }
}

// 手动批量删除
async function deleteMultipleImagesManually(config) {
  const input = await question('\n请输入要删除的照片 Public ID，用逗号分隔: ');
  if (!input.trim()) {
    console.log('❌ 输入不能为空');
    return;
  }
  
  const publicIds = input.split(',').map(id => id.trim()).filter(id => id);
  if (publicIds.length === 0) {
    console.log('❌ 没有有效的 Public ID');
    return;
  }
  
  console.log(`\n将要删除以下 ${publicIds.length} 张照片:`);
  publicIds.forEach((id, index) => console.log(`${index + 1}. ${id}`));
  
  const confirm = await question('\n确认删除？(y/n): ');
  if (confirm.toLowerCase() === 'y') {
    await deleteMultipleImages(publicIds, config);
  } else {
    console.log('❌ 删除已取消');
  }
}

// 从文件删除
async function deleteFromFile(config) {
  const filePath = await question('\n请输入照片列表文件路径: ');
  if (!filePath.trim()) {
    console.log('❌ 文件路径不能为空');
    return;
  }
  
  const publicIds = readImageListFromFile(filePath);
  if (publicIds.length === 0) {
    console.log('❌ 文件为空或读取失败');
    return;
  }
  
  console.log(`\n从文件读取到 ${publicIds.length} 张照片:`);
  publicIds.forEach((id, index) => console.log(`${index + 1}. ${id}`));
  
  const confirm = await question('\n确认删除？(y/n): ');
  if (confirm.toLowerCase() === 'y') {
    await deleteMultipleImages(publicIds, config);
  } else {
    console.log('❌ 删除已取消');
  }
}

// 错误处理
process.on('unhandledRejection', (error) => {
  console.error('❌ 脚本执行失败:', error);
  process.exit(1);
});

// 运行主函数
main().catch(console.error);



