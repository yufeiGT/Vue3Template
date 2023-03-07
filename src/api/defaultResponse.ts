import { UserInfo } from './interface';

export function getUserInfo(): UserInfo {
	return {
		id: null,
		username: '',
		nickname: '',
		token: '',
	};
}
