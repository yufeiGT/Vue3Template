import * as Spanner from '@~crazy/spanner';

import { SeriesData } from '@/components/Charts/interface';

/**
 * 将数值或字符串转换为像素值
 * @param value
 * @returns
 */
export function toPixel(value: number | string): string {
	if (Spanner.isString(value) && /%$/.test(value as string)) {
		return value as string;
	}
	let v = parseFloat(value as string);
	if (isNaN(v)) {
		v = 0;
	}
	return `${v}px`;
}

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

export enum Unit {
	/**
	 * 货币
	 */
	Money = 0,
	/**
	 * 电量
	 */
	Wh = 1,
	/**
	 * 功率
	 */
	W = 2,
	/**
	 * 电压
	 */
	V = 3,
	/**
	 * 电流
	 */
	A = 4,
	/**
	 * 无功功率
	 */
	Var = 5,
}

const unitMap: {
	[propName: number]: {
		/**
		 * 步长
		 */
		step: number;
		/**
		 * 单位表
		 */
		units: string[];
	};
} = {
	[Unit.Money]: {
		step: 10000,
		units: ['元', '万元', '亿元', '兆元'],
	},
	[Unit.Wh]: {
		step: 1000,
		units: ['Wh', 'kWh', 'MWh', 'GWh'],
	},
	[Unit.W]: {
		step: 1000,
		units: ['W', 'kW', 'MW', 'GW'],
	},
	[Unit.V]: {
		step: 1000,
		units: ['V', 'kV'],
	},
	[Unit.A]: {
		step: 1000,
		units: ['A', 'kA'],
	},
	[Unit.Var]: {
		step: 1000,
		units: ['Var', 'kVar', 'MVar', 'GVar'],
	},
};

/**
 * 单位转换
 * @param unit 单位类型
 * @param value 数值
 * @param decimal 保留小数，默认两位
 * @param defaultStep 默认起始单位
 * @param base 转换基数
 * @returns
 */
export function unitConversion(
	unit: Unit,
	value: number,
	decimal = 2,
	defaultStep = 0,
	base = 10
) {
	const { step, units } = unitMap[unit];
	const length = units.length - 1;
	let originValue = value;
	let i = defaultStep;
	while (i < length && originValue > step * base) {
		originValue = value / step;
		i++;
	}
	return {
		value: parseFloat(originValue.toFixed(decimal)),
		unit: units[i],
	};
}
