import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import directives from './directives';

import '@/assets/icons/index.js';

import 'ant-design-vue';
import 'ant-design-vue/dist/antd.dark.css';

createApp(App).use(store).use(router).use(directives).mount('#app');
