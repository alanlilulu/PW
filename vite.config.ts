import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  
  // 性能优化配置
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react',
      'react-helmet-async',
      'react-intersection-observer'
    ],
    exclude: ['cloudinary']
  },

  // 构建优化
  build: {
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          motion: ['framer-motion'],
          icons: ['lucide-react'],
          utils: ['react-helmet-async', 'react-intersection-observer']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },

  // 开发服务器优化
  server: {
    hmr: {
      overlay: false
    },
    proxy: {
      '/api/cloudinary-proxy': {
        target: 'https://api.cloudinary.com',
        changeOrigin: true,
        rewrite: (path) => {
          const newPath = path.replace(/^\/api\/cloudinary-proxy/, '/v1_1/do0c7uhxc/resources/image');
          // 添加参数来排除已删除的照片和只获取已上传的照片
          const separator = newPath.includes('?') ? '&' : '?';
          return `${newPath}${separator}include_deleted=false&type=upload&context=true`;
        },
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            // 添加Cloudinary认证头
            const auth = Buffer.from('432716195215516:xyrwcwbTy6OZUrbE4lfw7hF4sG8').toString('base64');
            proxyReq.setHeader('Authorization', `Basic ${auth}`);
            proxyReq.setHeader('Content-Type', 'application/json');
          });
        }
      }
    }
  }
});