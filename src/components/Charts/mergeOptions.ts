import { EChartsCoreOption } from 'echarts';
import { merge } from '@~crazy/spanner';

export function getXAxisDefaultOptions() {
	return {
		nameTextStyle: {
			color: '#06DCFF',
		},
		axisLine: {
			show: true,
			lineStyle: {
				color: '#2193a8',
			},
		},
		axisLabel: {
			color: '#FFF',
		},
		axisTick: {
			show: true,
			lineStyle: {
				color: '#2193a8',
			},
		},
	};
}

export function getYAxisDefaultOptions() {
	return {
		nameTextStyle: {
			color: '#06DCFF',
		},
		splitLine: {
			show: true,
			lineStyle: {
				type: 'dashed',
				color: '#2193a8',
			},
		},
		axisLine: {
			show: true,
			lineStyle: {
				color: '#2193a8',
			},
		},
		axisLabel: {
			color: '#FFF',
		},
		axisTick: {
			show: true,
			lineStyle: {
				color: '#2193a8',
			},
		},
	};
}

export function getDefaultOptions(): EChartsCoreOption {
	return {
		tooltip: {
			trigger: 'axis',
		},
		legend: {
			icon: 'circle',
			itemHeight: 8,
			textStyle: {
				color: '#FFF',
				padding: [0, 0, 0, -10],
			},
		},
		grid: {
			left: 80,
			right: 50,
			bottom: 50,
			containLabel: true,
		},
		xAxis: getXAxisDefaultOptions(),
		yAxis: getYAxisDefaultOptions(),
	};
}

export function mergeOptions(...opts: EChartsCoreOption[]): EChartsCoreOption {
	return merge(
		true,
		getDefaultOptions(),
		...(opts as Array<EChartsCoreOption>)
	);
}
