import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  ...(mode === 'development' && {
    server: {
      proxy: {
        '/api': 'http://localhost:3000',
      },
    },
  }),
}));
