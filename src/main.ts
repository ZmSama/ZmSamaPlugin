/*
 * @Description:
 * @Autor: ZmSama
 * @Date: 2021-05-28 14:40:41
 */
import { createApp } from 'vue';
import ZmSamaPlugin from '../packages';
import App from './App.vue';
import '../packages/style/base.scss';
const app = createApp(App);
app.use(ZmSamaPlugin);
app.mount('#app');
