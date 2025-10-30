import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
   server: {
    proxy: {
      '/api': {
        target: 'https://chat-me-qf7o.onrender.com', // your backend
        changeOrigin: true,
        secure: true,
      },
    },
  },
});