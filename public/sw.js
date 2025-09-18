// Service Worker for caching strategies
const CACHE_NAME = 'website-cache-v1';
const STATIC_CACHE = 'static-cache-v1';
const DYNAMIC_CACHE = 'dynamic-cache-v1';

// 需要缓存的静态资源
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

// 缓存策略
const CACHE_STRATEGIES = {
  // 静态资源：缓存优先，网络回退
  STATIC_FIRST: 'static-first',
  // 动态内容：网络优先，缓存回退
  NETWORK_FIRST: 'network-first',
  // 图片：缓存优先，网络回退
  IMAGE_CACHE: 'image-cache'
};

// 安装事件
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Opened static cache');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Static assets cached');
        return self.skipWaiting();
      })
  );
});

// 激活事件
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker activated');
      return self.clients.claim();
    })
  );
});

// 拦截请求
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 跳过非GET请求
  if (request.method !== 'GET') {
    return;
  }

  // 跳过Chrome扩展等
  if (url.protocol === 'chrome-extension:') {
    return;
  }

  // 根据资源类型选择缓存策略
  if (isStaticAsset(request)) {
    event.respondWith(handleStaticAsset(request));
  } else if (isImage(request)) {
    event.respondWith(handleImage(request));
  } else if (isAPIRequest(request)) {
    event.respondWith(handleAPIRequest(request));
  } else {
    event.respondWith(handleDefault(request));
  }
});

// 判断是否为静态资源
function isStaticAsset(request) {
  return STATIC_ASSETS.includes(new URL(request.url).pathname) ||
         request.url.includes('/static/') ||
         request.url.includes('/assets/');
}

// 判断是否为图片
function isImage(request) {
  return request.destination === 'image';
}

// 判断是否为API请求
function isAPIRequest(request) {
  return request.url.includes('/api/') || 
         request.url.includes('jsonplaceholder.typicode.com');
}

// 处理静态资源：缓存优先
async function handleStaticAsset(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Static asset fetch failed:', error);
    return new Response('Offline content not available', { status: 503 });
  }
}

// 处理图片：缓存优先
async function handleImage(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Image fetch failed:', error);
    // 返回默认图片或错误响应
    return new Response('Image not available', { status: 404 });
  }
}

// 处理API请求：网络优先
async function handleAPIRequest(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('API request failed, trying cache:', error);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response('API offline', { status: 503 });
  }
}

// 处理默认请求：网络优先
async function handleDefault(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Default request failed, trying cache:', error);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response('Content not available', { status: 503 });
  }
}

// 消息处理
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_CACHE_INFO') {
    event.ports[0].postMessage({
      type: 'CACHE_INFO',
      staticCache: STATIC_CACHE,
      dynamicCache: DYNAMIC_CACHE
    });
  }
});

