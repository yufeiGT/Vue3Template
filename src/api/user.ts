import * as Interface from '@/interface';
import * as DefaultResponse from '@/defaultResponse';

import { launcher } from './launcher';

/**
 * 登录
 * @param username 用户名
 * @param password 密码
 */
export async function Login(username: string, password: string) {
	return await launcher.post<
		Interface.UserInfo,
		{
			username: string;
			password: string;
		}
	>(
		'/authentication/user/login',
		{
			username,
			password,
		},
		{
			defaultResponse: DefaultResponse.getUserInfo(),
		}
	);
}

/**
 * 获取用户权限
 * @param userId 用户ID
 */
export async function getUserPermissions(userId: number) {
	return await launcher.get<Interface.PermissionsPoint[], number>(
		'/authentication/user/getpermissions',
		{
			userId,
		},
		{
			defaultResponse: [],
		}
	);
}
