// Cloudinary代理API - 解决CORS问题
// 这个文件应该放在public目录下，作为静态文件服务

const CLOUDINARY_CLOUD_NAME = 'do0c7uhxc';
const CLOUDINARY_API_KEY = '432716195215516';
const CLOUDINARY_API_SECRET = 'xyrwcwbTy6OZUrbE4lfw7hF4sG8';

// 注意：在生产环境中，这些凭据应该从环境变量中读取
// 这里为了演示目的直接硬编码

async function handleRequest(request) {
  try {
    const url = new URL(request.url);
    const maxResults = url.searchParams.get('max_results') || '100';
    const nextCursor = url.searchParams.get('next_cursor') || '';
    
    // 构建Cloudinary API URL
    let cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/image?max_results=${maxResults}`;
    if (nextCursor) {
      cloudinaryUrl += `&next_cursor=${nextCursor}`;
    }
    
    // 创建Basic Auth
    const auth = btoa(`${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`);
    
    // 调用Cloudinary API
    const response = await fetch(cloudinaryUrl, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Cloudinary API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // 返回数据，添加CORS头
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
    
  } catch (error) {
    console.error('Proxy error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}

// 处理OPTIONS请求（CORS预检）
if (typeof addEventListener !== 'undefined') {
  addEventListener('fetch', event => {
    if (event.request.method === 'OPTIONS') {
      event.respondWith(new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }));
    } else {
      event.respondWith(handleRequest(event.request));
    }
  });
}

// 如果是在Node.js环境中运行
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { handleRequest };
}
