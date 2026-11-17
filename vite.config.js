import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 复用 jinx-homepage 的模式：base './' 让构建产物用相对路径引用，
// 放在 Cloudflare Pages / Workers 静态资源里任何路径下都能正常工作。
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
