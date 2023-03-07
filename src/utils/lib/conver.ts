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
 * @param curveData 曲线数据
 * @param keyList 项目键值列表
 */
export function curveToData(
	curveData: Array<{
		dateTime: string | number;
		[propName: string]: any;
	}>,
	keyList: string[]
): SeriesData[][] {
	const chartsData: SeriesData[][] = [];
	keyList.forEach(() => {
		chartsData.push([]);
	});
	(curveData || []).forEach((item) => {
		keyList.forEach((key, index) => {
			chartsData[index].push({
				value: item[key],
				index: item.dateTime,
			});
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

function rotatePoint(ptSrc, ptRotationCenter, angle) {
	var a = ptRotationCenter.x;
	var b = ptRotationCenter.y;
	var x0 = ptSrc.x;
	var y0 = ptSrc.y;
	var rx =
		a +
		(x0 - a) * Math.cos((angle * Math.PI) / 180) -
		(y0 - b) * Math.sin((angle * Math.PI) / 180);
	var ry =
		b +
		(x0 - a) * Math.sin((angle * Math.PI) / 180) +
		(y0 - b) * Math.cos((angle * Math.PI) / 180);
	var json = { x: rx, y: ry };
	return json;
}

/**
 * 获取旋转后点的位置
 * @param originPoint 原始点
 * @param centerPoint 中心点
 * @param angle 角度
 */
export function getRotatePoint(
	originPoint: { x: number; y: number },
	centerPoint: {
		x: number;
		y: number;
	},
	angle: number
) {
	const radian = (angle * Math.PI) / 180;
	return {
		x:
			centerPoint.x +
			(originPoint.x - centerPoint.x) * Math.cos(radian) -
			(originPoint.y - centerPoint.y) * Math.sin(radian),
		y:
			centerPoint.y +
			(originPoint.x - centerPoint.x) * Math.sin(radian) +
			(originPoint.y - centerPoint.y) * Math.cos(radian),
	};
}
