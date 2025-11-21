import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin(), viteSingleFile()],
  // Apps Script 환경에서는 모든 자산 경로가 상대 경로여야 합니다.
  base: './',
  define: {
    'process.env.TARGET_ENV': JSON.stringify(process.env.TARGET_ENV || 'development'),
  },
  envPrefix: 'VITE_',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    // 이 옵션이 가장 중요합니다.
    // singlefile 플러그인은 이 옵션이 없으면 빌드가 실패합니다.
    assetsInlineLimit: 100000000, // 파일을 인라인할 수 있도록 자산 제한을 매우 크게 설정
    rollupOptions: {
      output: {},
    },
  },
})
