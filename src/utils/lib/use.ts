import { Ref, ref, watch, nextTick, computed } from 'vue';
import {
	LocationQuery,
	RouteLocationNormalizedLoaded,
	Router,
} from 'vue-router';
import { LauncherResponse, LauncherError } from '@~crazy/launcher';
import * as Spanner from '@~crazy/spanner';

/**
 * 应用请求
 * @returns
 */
export function request() {
	const isLoading = ref(false);
	const requestCount = ref(0);
	const firstRequest = ref(true);
	watch(
		() => firstRequest.value && requestCount.value > 0,
		(value) => {
			isLoading.value = value;
		}
	);
	function checkRequest(): void {
		if (requestCount.value > 0) {
			requestCount.value--;
		}
		if (requestCount.value > 0) {
			return;
		}
		firstRequest.value = false;
	}
	return {
		/**
		 * 是否显示加载
		 */
		isLoading,
		/**
		 * 重置
		 */
		reset(): void {
			firstRequest.value = true;
		},
		/**
		 * 发送请求
		 * @param apiFn 请求函数
		 * @param params 请求参数, 格式 [param1, param2]
		 * @param data 需要将请求结果赋值的 ref 变量
		 * @returns
		 */
		send<T, U extends any[]>(
			apiFn: (...params: U) => Promise<LauncherResponse<T>>,
			params: U,
			data?: Ref<T>
		) {
			requestCount.value++;
			return new Promise<LauncherResponse<T>>((resolve, reject) => {
				apiFn(...params)
					.then((res) => {
						if (data && 'value' in data) {
							if (res.data === null) {
								data.value = res.options.defaultResponse;
							} else {
								data.value = res.data;
							}
						}
						checkRequest();
						resolve(res);
					})
					.catch((err: LauncherError) => {
						if (data && 'value' in data) {
							data.value = err.options.defaultResponse;
						}
						checkRequest();
						reject(err);
					});
			});
		},
	};
}

/**
 * 同步数据
 * @param callback 同步回调
 * @param interval 同步间隔,秒
 * @returns
 */
export function synchronousData(
	callback: (time: number, count: number) => void,
	interval = 60
) {
	if (!Spanner.isFunction(callback)) {
		return;
	}
	const isInt = ref(true);
	const lastSyncTime = ref(Date.now());
	const syncCount = ref(0);
	const syncInterval = Math.max(interval, 1) * 1000;
	const intervalID = setInterval(() => {
		const now = Date.now();
		if (now - lastSyncTime.value >= syncInterval) {
			forceSync();
		}
	}, 1000);
	function forceSync(): void {
		if (isInt.value) {
			return;
		}
		const now = Date.now();
		lastSyncTime.value = now;
		syncCount.value++;
		callback(now, syncCount.value);
	}
	nextTick(() => {
		isInt.value = false;
		forceSync();
	});
	return {
		/**
		 * 上次同步时间
		 */
		lastSyncTime,
		/**
		 * 同步次数
		 */
		syncCount,
		/**
		 * 移除同步数据
		 */
		removeSync(): void {
			clearInterval(intervalID);
		},
		/**
		 * 强制同步数据
		 */
		forceSync,
	};
}

export interface Route<T extends LocationQuery>
	extends RouteLocationNormalizedLoaded {
	query: T;
}

/**
 * 路由参数
 * @param route
 * @param router
 * @returns
 */
export function routeQuery<T extends LocationQuery>(
	route: Route<T>,
	router: Router
) {
	const query = computed(() => route.query);
	return {
		/**
		 * 路由参数
		 */
		query,
		/**
		 * 设置路由参数
		 * @param query 路由参数
		 * @param merge 合并原有参数
		 */
		setQuery(query: T, merge = true): void {
			router.push({
				query: merge ? Spanner.merge(true, route.query, query) : query,
			});
		},
	};
}
