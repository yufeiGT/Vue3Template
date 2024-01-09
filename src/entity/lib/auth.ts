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
export namespace UserInfo {
	/**
	 * 请求参数
	 */
	export interface RequestParams {
		/**
		 * 用户名
		 */
		username: string;
		/**
		 * 密码
		 */
		password: string;
	}
	/**
	 * 获取默认值
	 * @returns
	 */
	export function getDefault(): UserInfo {
		return {
			id: null,
			username: '',
			token: '',
		};
	}
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
export namespace PermissionsPoint {
	/**
	 * 获取默认值
	 * @returns
	 */
	export function getDefault(): PermissionsPoint {
		return {
			code: '',
			name: '',
			description: '',
		};
	}
}
