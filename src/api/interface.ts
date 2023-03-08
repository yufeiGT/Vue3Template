/**
 * 用户信息
 */
export interface UserInfo {
	/**
	 * 用户 ID
	 */
	id: number;
	/**
	 * 用户名
	 */
	username: string;
	/**
	 * 用户令牌
	 */
	token: string;
}

/**
 * 权限点
 */
export interface PermissionsPoint {
	/**
	 * 权限编码
	 */
	code: string;
	/**
	 * 权限名称
	 */
	name: string;
	/**
	 * 权限描述
	 */
	description: string;
}
