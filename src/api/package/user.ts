import { launcher, Interface, DefaultResponse } from '..';

/**
 * 登录
 * @param username 用户名
 * @param password 密码
 */
export function Login(username: string, password: string) {
	return launcher.post<
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
export function getUserPermissions(userId: number) {
	return launcher.get<Interface.PermissionsPoint[], number>(
		'/authentication/user/getpermissions',
		{
			userId,
		},
		{
			defaultResponse: [],
		}
	);
}
