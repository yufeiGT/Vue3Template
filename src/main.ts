import { createApp } from 'vue';
import 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import { Clock } from '@gluttons/es-tools';

import '@/assets/icons/index.js';
import '@/assets/stylesheets/app.scss';

import store from './store';
import directives from './directives';
import router from './router';

import AppVue from './App.vue';

createApp(AppVue).use(store).use(router).use(directives).mount('#app');

// 应用时钟，开启定时请求功能
Clock.use(1000 * 60);
