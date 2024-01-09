/**
 * 全局示例
 */
export interface Global {
	/**
	 * 全局 A
	 */
	a: string;
	/**
	 * 全局 B
	 */
	b: string;
	/**
	 * 全局 C
	 */
	c: string;
}
export namespace Global {
	/**
	 * 获取默认值
	 * @returns
	 */
	export function getDefault(): Global {
		return {
			a: '',
			b: '',
			c: '',
		};
	}
}
