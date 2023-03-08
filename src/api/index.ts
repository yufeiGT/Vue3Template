import { Launcher } from '@~crazy/launcher';

import store from '@/store';
import router from '@/router';

import { message } from 'ant-design-vue';

const { VUE_APP_RequestBaseURL, VUE_APP_WithCredentials } = process.env;

export const launcher = new Launcher({
	baseUrl: VUE_APP_RequestBaseURL,
	credentials: VUE_APP_WithCredentials === 'true',
	timeoutAgain: true,
	requestOptions: {
		headers: {},
	},
	beforeHandler: () => {
		launcher.setAuthorization(store.state.auth.token);
	},
	authHandler: (code) => {
		if (code == 401) {
			message.error('非法请求，用户未授权');
			store.dispatch('Logout');
			router.push('/login');
		} else if (code == 403) {
			message.error('禁止访问，用户令牌无效');
			store.dispatch('Logout');
			router.push('/login');
		}
	},
	timeoutHandler: (options, again) => {
		let msg = `请求接口'${options.url}'超时`;
		if (again) {
			msg += ',正在重新发起请求';
		}
		message.error(msg);
		console.error(msg);
	},
});

export * from './interface';
export * as DefaultResponse from './defaultResponse';
export * from './package';
