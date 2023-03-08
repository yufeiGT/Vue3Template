import { LauncherError } from '@~crazy/launcher';

import * as API from '@/api';
import { Store } from '..';

const state = {
	...API.DefaultResponse.getUserInfo(),
	/**
	 * 用户权限
	 */
	permissions: [] as API.PermissionsPoint[],
};

type State = typeof state;

const getters = {
	/**
	 * 是否已授权
	 */
	isAuth(state: State): boolean {
		return !!state.token;
	},
};

const mutations = {
	/**
	 * 设置授权数据
	 */
	setAuthData(state: State, value: API.UserInfo): void {
		state.id = value.id;
		state.username = value.username;
		state.token = value.token;
		API.launcher.setAuthorization(state.token);
	},
	/**
	 * 清空授权数据
	 */
	clearAuthData(state: State): void {
		const { id, username, token } = API.DefaultResponse.getUserInfo();
		state.id = id;
		state.username = username;
		state.token = token;
		API.launcher.setAuthorization('');
	},
	/**
	 * 设置权限
	 * @param permissions
	 */
	setPermissions(state: State, permissions: API.PermissionsPoint[]): void {
		state.permissions = permissions;
	},
};

const actions = {
	/**
	 * 登录
	 */
	Login(store: Store, param: { username: string; password: string }) {
		return new Promise(async (resolve, reject) => {
			API.User.Login(param.username, param.password)
				.then(async (res) => {
					store.commit('setAuthData', res.data);
					const { id } = (store.state as unknown) as State;
					try {
						await Promise.all([
							store.dispatch('GetPermissions', id),
						]);
					} catch (e) {
						console.error(e);
					}
					resolve(res);
				})
				.catch((err: LauncherError) => {
					console.error(err);
					store.commit('setAuthData', err.options.defaultResponse);
					reject(err);
				});
		});
	},
	/**
	 * 注销
	 */
	Logout({ commit }: Store) {
		commit('clearAuthData');
		commit('setPermissions', []);
	},
	/**
	 * 获取权限
	 */
	GetPermissions({ commit }: Store, userId: number) {
		return new Promise((resolve, reject) => {
			API.User.getUserPermissions(userId)
				.then((res) => {
					commit('setPermissions', res.data);
					resolve(res);
				})
				.catch((err: LauncherError) => {
					commit('setPermissions', err.options.defaultResponse);
					reject(err);
				});
		});
	},
};

export default {
	state,
	getters,
	mutations,
	actions,
};
