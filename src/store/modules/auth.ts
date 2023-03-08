import { LauncherError } from '@~crazy/launcher';

import { launcher, PermissionsPoint, UserInfo, User } from '@/api';
import { getUserInfo } from '@/api/defaultResponse';
import { Store } from '..';

const state = {
	...getUserInfo(),
	/**
	 * 用户权限
	 */
	permissions: [] as PermissionsPoint[],
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
	setAuthData(state: State, value: UserInfo): void {
		state.id = value.id;
		state.username = value.username;
		state.token = value.token;
		launcher.setAuthorization(state.token);
	},
	/**
	 * 清空授权数据
	 */
	clearAuthData(state: State): void {
		const { id, username, token } = getUserInfo();
		state.id = id;
		state.username = username;
		state.token = token;
		launcher.setAuthorization('');
	},
	/**
	 * 设置权限
	 * @param permissions
	 */
	setPermissions(state: State, permissions: PermissionsPoint[]): void {
		state.permissions = permissions;
	},
};

const actions = {
	/**
	 * 登录
	 */
	Login(store: Store, param: { username: string; password: string }) {
		return new Promise(async (resolve, reject) => {
			User.Login(param.username, param.password)
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
			User.getUserPermissions(userId)
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
