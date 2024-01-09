import { Launcher } from '@~crazy/launcher';

import * as Entity from '@/entity';

import { launcher } from '../launcher';

/**
 * 登录
 * @param params
 */
export function Login(params: Entity.Auth.UserInfo.RequestParams) {
	return {
		data: {
			id: 888,
			username: params.username,
			token: 'token_test_admin',
		},
		code: 200,
		message: '登录成功',
		dateTime: Date.now(),
	} as Launcher.Response<Entity.Auth.UserInfo>;
	// return launcher.post<
	// 	Entity.Auth.UserInfo,
	// 	Entity.Auth.UserInfo.RequestParams
	// >('/authentication/user/login', params, {
	// 	defaultResponse: Entity.Auth.UserInfo.getDefault(),
	// });
}

/**
 * 获取用户权限
 * @param userId 用户ID
 */
export function getUserPermissions(userId: number) {
	return launcher.get<Entity.Auth.PermissionsPoint[], number>(
		'/authentication/user/getpermissions',
		{
			userId,
		},
		{
			defaultResponse: [],
		}
	);
}
