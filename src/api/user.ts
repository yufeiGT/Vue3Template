import { launcher } from '.';
import { UserInfo, PermissionsPoint } from './interface';
import { getUserInfo } from './defaultResponse';

/**
 * 登录
 * @param username 用户名
 * @param password 密码
 */
export function Login(username: string, password: string) {
	return launcher.post<
		UserInfo,
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
			defaultResponse: getUserInfo(),
		}
	);
}

/**
 * 获取用户权限
 * @param userId 用户ID
 */
export function getUserPermissions(userId: number) {
	return launcher.get<PermissionsPoint[], number>(
		'/authentication/user/getpermissions',
		{
			userId,
		},
		{
			defaultResponse: [],
		}
	);
}
