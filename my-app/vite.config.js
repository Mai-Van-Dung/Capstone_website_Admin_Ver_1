import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()], 
  server: {
    port: 5173,     // chạy ở http://localhost:5173
    open: '/login', // khi start sẽ mở http://localhost:3000/login
  },
})
