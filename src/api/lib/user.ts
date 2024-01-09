import { Launcher } from '@~crazy/launcher';

import * as Entity from '@/entity';

/**
 * 获取用户列表
 * @param params
 * @returns
 */
export function GetUserList(params: Launcher.Pagination.Params) {
	return new Promise<Launcher.Response<Entity.Auth.UserInfo[]>>((resolve) => {
		const data: Entity.Auth.UserInfo[] = [];
		for (let i = 0; i < ~~(Math.random() * 100); i++) {
			data.push({
				id: i,
				username: `用户${i}`,
				token: `用户令牌${i}`,
			});
		}
		setTimeout(() => {
			resolve({
				data,
				code: 200,
				message: '成功',
				dateTime: Date.now(),
				pagination: {
					index: params.page,
					size: params.pageSize,
					count: 0,
				},
				options: {
					defaultResponse: [],
				},
			});
		}, 1000);
	});
}
