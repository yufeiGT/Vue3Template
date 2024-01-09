import { Router } from '@kotron/global';

import store from '@/store';

import HomeVue from '@/views/Home/index.vue';
import LoginVue from '@/views/Login/index.vue';
import TestVue from '@/views/Test.vue';
import NotFoundVue from './views/NotFound.vue';

const routerConfig: Router.Config[] = [
	{
		label: '首页',
		name: 'Home',
		component: HomeVue,
	},
	{
		label: '登录',
		name: 'Login',
		component: LoginVue,
	},
];

if (process.env.NODE_ENV == 'development') {
	routerConfig.push({
		label: '测试',
		name: 'Test',
		component: TestVue,
	});
}

const { router } = Router.use(routerConfig, {
	routes: [
		{
			path: '/:pathMatch(.*)',
			name: 'NotFound',
			component: NotFoundVue,
		},
	],
});

router.beforeEach((to, from, next) => {
	if (to.name === 'Login') {
		if (!store.getters.isAuth) {
			next();
		} else if (from.name) {
			next(false);
		} else {
			next('/');
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
