import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' — 저장소 이름과 무관하게 GitHub Pages 하위 경로에서 동작
export default defineConfig({
  base: './',
  plugins: [react()],
})
