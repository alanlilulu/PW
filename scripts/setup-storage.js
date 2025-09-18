#!/usr/bin/env node

/**
 * 图片存储服务快速配置脚本
 * 使用方法: node scripts/setup-storage.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

const STORAGE_TEMPLATES = {
  oss: {
    name: '阿里云 OSS',
    vars: [
      'VITE_OSS_ENABLED=true',
      'VITE_OSS_BASE_URL=https://your-bucket.oss-cn-hangzhou.aliyuncs.com',
      'VITE_OSS_REGION=oss-cn-hangzhou',
      'VITE_OSS_BUCKET=your-bucket-name',
      'VITE_OSS_ACCESS_KEY=your-access-key-id',
      'VITE_OSS_SECRET_KEY=your-access-key-secret'
    ]
  },
  cos: {
    name: '腾讯云 COS',
    vars: [
      'VITE_COS_ENABLED=true',
      'VITE_COS_BASE_URL=https://your-bucket.cos.ap-beijing.myqcloud.com',
      'VITE_COS_REGION=ap-beijing',
      'VITE_COS_BUCKET=your-bucket-name',
      'VITE_COS_SECRET_ID=your-secret-id',
      'VITE_COS_SECRET_KEY=your-secret-key'
    ]
  },
  cloudinary: {
    name: 'Cloudinary',
    vars: [
      'VITE_CLOUDINARY_ENABLED=true',
      'VITE_CLOUDINARY_BASE_URL=https://res.cloudinary.com/your-cloud-name/image/upload/v1',
      'VITE_CLOUDINARY_API_KEY=your-api-key',
      'VITE_CLOUDINARY_API_SECRET=your-api-secret'
    ]
  },
  s3: {
    name: 'AWS S3',
    vars: [
      'VITE_S3_ENABLED=true',
      'VITE_S3_BASE_URL=https://your-bucket.s3.us-east-1.amazonaws.com',
      'VITE_S3_REGION=us-east-1',
      'VITE_S3_BUCKET=your-bucket-name',
      'VITE_S3_ACCESS_KEY=your-access-key-id',
      'VITE_S3_SECRET_KEY=your-secret-access-key'
    ]
  }
};

async function main() {
  console.log('🚀 图片存储服务配置向导\n');
  console.log('请选择你要配置的存储服务：\n');

  const options = Object.entries(STORAGE_TEMPLATES).map(([key, service], index) => {
    return `${index + 1}. ${service.name} (${key})`;
  });
  options.push(`${options.length + 1}. 自定义配置`);
  options.push(`${options.length + 1}. 退出`);

  options.forEach(option => console.log(option));
  console.log('');

  const choice = await question('请输入选择 (1-' + options.length + '): ');
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
    await customConfig();
  } else {
    const serviceKey = Object.keys(STORAGE_TEMPLATES)[choiceIndex];
    await configureService(serviceKey);
  }

  rl.close();
}

async function configureService(serviceKey) {
  const service = STORAGE_TEMPLATES[serviceKey];
  console.log(`\n🔧 配置 ${service.name}\n`);

  const config = {};
  const questions = [
    { key: 'baseUrl', label: '基础 URL', default: service.vars[1].split('=')[1] },
    { key: 'region', label: '区域', default: service.vars[2]?.split('=')[1] || '' },
    { key: 'bucket', label: '存储桶名称', default: service.vars[3]?.split('=')[1] || '' },
    { key: 'accessKey', label: '访问密钥 ID', default: service.vars[4]?.split('=')[1] || '' },
    { key: 'secretKey', label: '访问密钥', default: service.vars[5]?.split('=')[1] || '' }
  ];

  for (const question of questions) {
    if (question.default && question.default !== '') {
      const answer = await question(`请输入 ${question.label} (${question.default}): `);
      config[question.key] = answer || question.default;
    } else {
      const answer = await question(`请输入 ${question.label}: `);
      config[question.key] = answer;
    }
  }

  await generateEnvFile(serviceKey, config);
}

async function customConfig() {
  console.log('\n🔧 自定义配置\n');
  
  const serviceName = await question('请输入服务名称: ');
  const baseUrl = await question('请输入基础 URL: ');
  const enabled = await question('是否启用 (y/n): ') === 'y';

  if (!enabled) {
    console.log('❌ 配置已取消');
    return;
  }

  const config = {
    name: serviceName,
    baseUrl,
    enabled: true
  };

  await generateEnvFile('custom', config);
}

async function generateEnvFile(serviceKey, config) {
  const envPath = path.join(process.cwd(), '.env.local');
  const envExists = fs.existsSync(envPath);
  
  let envContent = '';
  if (envExists) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }

  // 添加新配置
  const newConfig = generateEnvConfig(serviceKey, config);
  
  if (envExists) {
    // 更新现有配置
    const lines = envContent.split('\n');
    const newLines = [];
    let skipExisting = false;
    
    for (const line of lines) {
      if (line.startsWith(`VITE_${serviceKey.toUpperCase()}_`)) {
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
}

function generateEnvConfig(serviceKey, config) {
  const upperKey = serviceKey.toUpperCase();
  const configs = [];
  
  configs.push(`VITE_${upperKey}_ENABLED=true`);
  
  if (config.baseUrl) {
    configs.push(`VITE_${upperKey}_BASE_URL=${config.baseUrl}`);
  }
  
  if (config.region) {
    configs.push(`VITE_${upperKey}_REGION=${config.region}`);
  }
  
  if (config.bucket) {
    configs.push(`VITE_${upperKey}_BUCKET=${config.bucket}`);
  }
  
  if (config.accessKey) {
    configs.push(`VITE_${upperKey}_ACCESS_KEY=${config.accessKey}`);
  }
  
  if (config.secretKey) {
    configs.push(`VITE_${upperKey}_SECRET_KEY=${config.secretKey}`);
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

