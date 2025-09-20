// Vercel API端点 - Cloudinary代理
export default async function handler(req, res) {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理OPTIONS请求（CORS预检）
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 只允许GET请求
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { max_results = '100', next_cursor = '' } = req.query;
    
    // 构建Cloudinary API URL
    let cloudinaryUrl = `https://api.cloudinary.com/v1_1/do0c7uhxc/resources/image?max_results=${max_results}&include_deleted=false&type=upload&context=true`;
    if (next_cursor) {
      cloudinaryUrl += `&next_cursor=${next_cursor}`;
    }
    
    // 创建Basic Auth
    const auth = Buffer.from('432716195215516:xyrwcwbTy6OZUrbE4lfw7hF4sG8').toString('base64');
    
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
    
    // 返回数据
    res.status(200).json(data);
    
  } catch (error) {
    console.error('Cloudinary proxy error:', error);
    res.status(500).json({ error: error.message });
  }
}
