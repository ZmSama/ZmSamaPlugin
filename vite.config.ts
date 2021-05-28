/*
 * @Description:
 * @Autor: ZmSama
 * @Date: 2021-05-28 14:34:07
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    open: true,
  },
});
