import * as Spanner from '@~crazy/spanner';

import { SeriesData } from '@/components/Charts/interface';

/**
 * 将曲线数据转换为图表数据
 * @param axisKey 轴键值
 * @param curveData 曲线数据
 * @param keyList 项目键值列表
 * @param format 对数据项进行处理
 */
export function curveToData(
	axisKey: string,
	curveData: Array<{
		[propName: string]: any;
	}>,
	keyList: string[],
	format?: (value: SeriesData) => SeriesData
): SeriesData[][] {
	const chartsData: SeriesData[][] = [];
	keyList.forEach(() => {
		chartsData.push([]);
	});
	(curveData || []).forEach((item) => {
		keyList.forEach((key, index) => {
			const series = {
				value: item[key],
				index: item[axisKey],
			};
			if (Spanner.isFunction(format)) {
				chartsData[index].push(format(series));
			} else {
				chartsData[index].push(series);
			}
		});
	});
	return chartsData;
}

/**
 * 计算数据
 * @param data 数据源
 * @param map 数据地图
 */
export function computeData(
	data: { [propName: string]: any },
	map: Array<{
		label: string;
		key: string;
		unit?: string | string[];
		values?: string[];
	}>
) {
	return map.map((item) => {
		let value = data[item.key];
		let unit = '';
		if (Array.isArray(item.unit)) {
			if (value > 1000) {
				let index = 0;
				const max = item.unit.length - 1;
				while (value > 1000 && index < max) {
					value = value / 1000;
					index++;
				}
				unit = item.unit[index];
			} else {
				unit = item.unit[0];
			}
		} else {
			unit = item.unit || '';
		}
		if (Array.isArray(item.values)) {
			value = item.values[value];
		} else {
			value = parseInt(value);
		}
		return {
			label: item.label,
			value,
			unit,
		};
	});
}
