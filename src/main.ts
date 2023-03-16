import { createApp } from 'vue';
import router from './router';
import store from './store';
import directives from './directives';
import App from './App.vue';

import '@/assets/icons/index.js';

import 'ant-design-vue';
import 'ant-design-vue/dist/antd.dark.css';
import '@/assets/stylesheets/app.scss';

createApp(App).use(store).use(router).use(directives).mount('#app');
