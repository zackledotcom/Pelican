import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: 'DeepPelican_Dist',
  server: {
    port: 5173
  }
});
