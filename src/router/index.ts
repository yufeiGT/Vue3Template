import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import store from '@/store';

import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import NotFound from '@/views/NotFound.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
	},
	{
		path: '/:pathMatch(.*)',
		name: 'NotFound',
		component: NotFound,
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	if (to.name === 'Login') {
		if (!store.getters.isAuth) {
			next();
		} else {
			next(false);
		}
	} else {
		if (!store.getters.isAuth) {
			next('/login');
		} else {
			next();
		}
	}
});

export default router;
