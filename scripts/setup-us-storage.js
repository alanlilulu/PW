#!/usr/bin/env node

/**
 * 美国用户图片存储服务快速配置脚本
 * 使用方法: node scripts/setup-us-storage.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

const US_STORAGE_TEMPLATES = {
  cloudinary: {
    name: 'Cloudinary (推荐美国用户)',
    description: '免费额度大，美国访问速度快，无需信用卡',
    vars: [
      'VITE_CLOUDINARY_ENABLED=true',
      'VITE_CLOUDINARY_BASE_URL=https://res.cloudinary.com/your-cloud-name/image/upload/v1',
      'VITE_CLOUDINARY_API_KEY=your-api-key',
      'VITE_CLOUDINARY_API_SECRET=your-api-secret'
    ],
    setupSteps: [
      '1. 访问 https://cloudinary.com/users/register/free',
      '2. 注册免费账号（无需信用卡）',
      '3. 登录后获取 Cloud Name、API Key 和 API Secret',
      '4. 在 Dashboard 中查看你的配置信息'
    ]
  },
  s3: {
    name: 'AWS S3 (企业级)',
    description: '美国本土服务，延迟最低，稳定性极高',
    vars: [
      'VITE_S3_ENABLED=true',
      'VITE_S3_BASE_URL=https://your-bucket.s3.us-east-1.amazonaws.com',
      'VITE_S3_REGION=us-east-1',
      'VITE_S3_BUCKET=your-bucket-name',
      'VITE_S3_ACCESS_KEY=your-access-key-id',
      'VITE_S3_SECRET_KEY=your-secret-access-key'
    ],
    setupSteps: [
      '1. 访问 https://aws.amazon.com/ 注册账号',
      '2. 开通 S3 服务',
      '3. 创建 Bucket（选择 us-east-1 区域）',
      '4. 创建 IAM 用户并获取 Access Key',
      '5. 配置 Bucket 权限为公开读取'
    ]
  },
  gcs: {
    name: 'Google Cloud Storage',
    description: 'Google 基础设施，与 Google 服务集成好',
    vars: [
      'VITE_GCS_ENABLED=true',
      'VITE_GCS_BASE_URL=https://storage.googleapis.com/your-bucket-name',
      'VITE_GCS_BUCKET=your-bucket-name',
      'VITE_GCS_PROJECT_ID=your-project-id',
      'VITE_GCS_CREDENTIALS_FILE=path/to/service-account-key.json'
    ],
    setupSteps: [
      '1. 访问 https://cloud.google.com/ 注册账号',
      '2. 创建新项目',
      '3. 启用 Cloud Storage API',
      '4. 创建存储桶',
      '5. 创建服务账号并下载密钥文件'
    ]
  },
  digitalocean: {
    name: 'DigitalOcean Spaces',
    description: '简单易用，价格透明，美国数据中心',
    vars: [
      'VITE_DO_SPACES_ENABLED=true',
      'VITE_DO_SPACES_BASE_URL=https://your-space.nyc3.digitaloceanspaces.com',
      'VITE_DO_SPACES_KEY=your-access-key',
      'VITE_DO_SPACES_SECRET=your-secret-key',
      'VITE_DO_SPACES_BUCKET=your-space-name'
    ],
    setupSteps: [
      '1. 访问 https://www.digitalocean.com/ 注册账号',
      '2. 开通 Spaces 服务',
      '3. 创建新的 Space',
      '4. 生成 API 密钥',
      '5. 配置 Space 权限'
    ]
  }
};

async function main() {
  console.log('🇺🇸 美国用户图片存储服务配置向导\n');
  console.log('这些服务在美国都有很好的性能和稳定性：\n');

  const options = Object.entries(US_STORAGE_TEMPLATES).map(([key, service], index) => {
    return `${index + 1}. ${service.name}`;
  });
  options.push(`${options.length + 1}. 查看所有服务详情`);
  options.push(`${options.length + 1}. 退出`);

  options.forEach(option => console.log(option));
  console.log('');

  const choice = await question('请选择你要配置的存储服务 (1-' + options.length + '): ');
  const choiceIndex = parseInt(choice) - 1;

  if (choiceIndex < 0 || choiceIndex >= options.length) {
    console.log('❌ 无效选择');
    rl.close();
    return;
  }

  if (choiceIndex === options.length - 1) {
    console.log('👋 再见！');
    rl.close();
    return;
  }

  if (choiceIndex === options.length - 2) {
    await showAllServicesDetails();
  } else {
    const serviceKey = Object.keys(US_STORAGE_TEMPLATES)[choiceIndex];
    await configureUSService(serviceKey);
  }

  rl.close();
}

async function showAllServicesDetails() {
  console.log('\n📋 所有服务详细对比\n');
  
  Object.entries(US_STORAGE_TEMPLATES).forEach(([key, service]) => {
    console.log(`🔹 ${service.name}`);
    console.log(`   描述: ${service.description}`);
    console.log(`   设置步骤:`);
    service.setupSteps.forEach(step => console.log(`     ${step}`));
    console.log('');
  });

  const continueChoice = await question('是否继续配置某个服务？(y/n): ');
  if (continueChoice.toLowerCase() === 'y') {
    const serviceChoice = await question('请选择服务 (cloudinary/s3/gcs/digitalocean): ');
    if (US_STORAGE_TEMPLATES[serviceChoice]) {
      await configureUSService(serviceChoice);
    } else {
      console.log('❌ 无效的服务名称');
    }
  }
}

async function configureUSService(serviceKey) {
  const service = US_STORAGE_TEMPLATES[serviceKey];
  console.log(`\n🔧 配置 ${service.name}\n`);
  console.log('设置步骤:');
  service.setupSteps.forEach(step => console.log(`  ${step}`));
  console.log('');

  const config = {};
  
  // 根据服务类型配置不同的参数
  switch (serviceKey) {
    case 'cloudinary':
      config.cloudName = await question('请输入 Cloud Name: ');
      config.apiKey = await question('请输入 API Key: ');
      config.apiSecret = await question('请输入 API Secret: ');
      break;
      
    case 's3':
      config.bucket = await question('请输入 Bucket 名称: ');
      config.region = await question('请输入区域 (建议: us-east-1): ') || 'us-east-1';
      config.accessKey = await question('请输入 Access Key ID: ');
      config.secretKey = await question('请输入 Secret Access Key: ');
      break;
      
    case 'gcs':
      config.bucket = await question('请输入 Bucket 名称: ');
      config.projectId = await question('请输入 Project ID: ');
      break;
      
    case 'digitalocean':
      config.spaceName = await question('请输入 Space 名称: ');
      config.region = await question('请输入区域 (建议: nyc3): ') || 'nyc3';
      config.accessKey = await question('请输入 Access Key: ');
      config.secretKey = await question('请输入 Secret Key: ');
      break;
  }

  await generateUSEnvFile(serviceKey, config);
}

async function generateUSEnvFile(serviceKey, config) {
  const envPath = path.join(process.cwd(), '.env.local');
  const envExists = fs.existsSync(envPath);
  
  let envContent = '';
  if (envExists) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }

  // 生成新的配置
  const newConfig = generateUSEnvConfig(serviceKey, config);
  
  if (envExists) {
    // 更新现有配置
    const lines = envContent.split('\n');
    const newLines = [];
    let skipExisting = false;
    
    for (const line of lines) {
      if (line.startsWith(`VITE_${serviceKey.toUpperCase()}_`) || 
          line.startsWith(`VITE_${serviceKey === 's3' ? 'S3' : serviceKey.toUpperCase()}_`)) {
        if (!skipExisting) {
          newLines.push(...newConfig);
          skipExisting = true;
        }
        continue;
      }
      newLines.push(line);
    }
    
    if (!skipExisting) {
      newLines.push(...newConfig);
    }
    
    envContent = newLines.join('\n');
  } else {
    envContent = newConfig.join('\n');
  }

  // 写入文件
  fs.writeFileSync(envPath, envContent);
  
  console.log(`\n✅ 配置已保存到 ${envPath}`);
  console.log('\n📝 下一步：');
  console.log('1. 检查配置文件内容');
  console.log('2. 填入你的实际配置信息');
  console.log('3. 重启开发服务器: npm run dev');
  console.log('4. 在浏览器中测试存储服务');
  
  // 显示具体的配置建议
  console.log('\n💡 配置建议：');
  if (serviceKey === 'cloudinary') {
    console.log('- 确保 Cloud Name 正确（在 Dashboard 中查看）');
    console.log('- API Key 和 Secret 要保密，不要分享给他人');
    console.log('- 免费账号每月有 25GB 存储和 25GB 带宽限制');
  } else if (serviceKey === 's3') {
    console.log('- 选择 us-east-1 区域获得最佳性能');
    console.log('- 确保 Bucket 权限设置为公开读取');
    console.log('- 监控使用量，避免意外费用');
  }
}

function generateUSEnvConfig(serviceKey, config) {
  const configs = [];
  
  switch (serviceKey) {
    case 'cloudinary':
      configs.push('VITE_CLOUDINARY_ENABLED=true');
      configs.push(`VITE_CLOUDINARY_BASE_URL=https://res.cloudinary.com/${config.cloudName}/image/upload/v1`);
      configs.push(`VITE_CLOUDINARY_API_KEY=${config.apiKey}`);
      configs.push(`VITE_CLOUDINARY_API_SECRET=${config.apiSecret}`);
      break;
      
    case 's3':
      configs.push('VITE_S3_ENABLED=true');
      configs.push(`VITE_S3_BASE_URL=https://${config.bucket}.s3.${config.region}.amazonaws.com`);
      configs.push(`VITE_S3_REGION=${config.region}`);
      configs.push(`VITE_S3_BUCKET=${config.bucket}`);
      configs.push(`VITE_S3_ACCESS_KEY=${config.accessKey}`);
      configs.push(`VITE_S3_SECRET_KEY=${config.secretKey}`);
      break;
      
    case 'gcs':
      configs.push('VITE_GCS_ENABLED=true');
      configs.push(`VITE_GCS_BASE_URL=https://storage.googleapis.com/${config.bucket}`);
      configs.push(`VITE_GCS_BUCKET=${config.bucket}`);
      configs.push(`VITE_GCS_PROJECT_ID=${config.projectId}`);
      break;
      
    case 'digitalocean':
      configs.push('VITE_DO_SPACES_ENABLED=true');
      configs.push(`VITE_DO_SPACES_BASE_URL=https://${config.spaceName}.${config.region}.digitaloceanspaces.com`);
      configs.push(`VITE_DO_SPACES_KEY=${config.accessKey}`);
      configs.push(`VITE_DO_SPACES_SECRET=${config.secretKey}`);
      configs.push(`VITE_DO_SPACES_BUCKET=${config.spaceName}`);
      break;
  }
  
  return configs;
}

// 错误处理
process.on('unhandledRejection', (error) => {
  console.error('❌ 脚本执行失败:', error);
  process.exit(1);
});

// 运行主函数
main().catch(console.error);

