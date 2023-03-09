<template>
	<div ref="chartContainer" class="charts"></div>
</template>

<script lang="ts" setup>
import { Ref, ref, watch, markRaw, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';
import * as Spanner from '@~crazy/spanner';
import elementResizeDetectorMaker from 'element-resize-detector';

import { chartType, Axis, SeriesItem, SeriesData } from './interface';
import {
	mergeOptions,
	getXAxisDefaultOptions,
	getYAxisDefaultOptions,
} from './mergeOptions';

const erd = elementResizeDetectorMaker({
	strategy: 'scroll',
	callOnAdd: true,
});

const axisDefaultOptions = {
	xAxis: getXAxisDefaultOptions,
	yAxis: getYAxisDefaultOptions,
};

const props = withDefaults(
	defineProps<{
		type?: chartType;
		direction?: 'x' | 'y';
		xAxis?: Axis | Axis[];
		yAxis?: Axis | Axis[];
		items?: Array<SeriesItem>;
		data?: SeriesData[][];
		options?: echarts.EChartsCoreOption;
		notMerge?: boolean;
	}>(),
	{
		type: 'line',
		direction: 'x',
		xAxis: () => {
			return {
				name: 'X轴',
			};
		},
		yAxis: () => {
			return {
				name: 'Y轴',
			};
		},
		items: () => [],
		data: () => [],
		options: () => {
			return {};
		},
		notMerge: false,
	}
);

const emit = defineEmits(['legendSelectChanged']);

const chartContainer: Ref<HTMLElement> = ref(null);
let mychart: echarts.ECharts;

watch(
	() => props,
	() => {
		setOption();
	},
	{
		deep: true,
	}
);

function setOption(): void {
	if (!mychart) {
		return;
	}
	const isX = props.direction === 'x';
	const axis: echarts.EChartsCoreOption = {};
	const categoryKey = isX ? 'xAxis' : 'yAxis';
	const valueKey = isX ? 'yAxis' : 'xAxis';
	if (Spanner.isArray(props[categoryKey])) {
		axis[categoryKey] = [];
		(props[categoryKey] as Axis[]).forEach((item) => {
			(axis[categoryKey] as any[]).push(
				Spanner.merge(true, axisDefaultOptions[categoryKey](), item, {
					type: 'category',
				})
			);
		});
	} else {
		axis[categoryKey] = {
			...props[categoryKey],
			type: 'category',
		};
	}
	if (Spanner.isArray(props[valueKey])) {
		axis[valueKey] = [];
		(props[valueKey] as Axis[]).forEach((item) => {
			(axis[valueKey] as any[]).push(
				Spanner.merge(true, axisDefaultOptions[valueKey](), item, {
					type: 'value',
				})
			);
		});
	} else {
		axis[valueKey] = {
			...props[valueKey],
			type: 'value',
		};
	}
	const series = [];
	const sourceName = ['product'];
	props.items.forEach((item) => {
		const options = {
			...item.seriesOption,
			type: item.type || 'line',
			connectNulls: true,
			[`${valueKey}Index`]: item.axisIndex || 0,
		};
		if (item.type === 'bar') {
			options.barMaxWidth = 50;
		}
		series.push(options);
		sourceName.push(item.name);
	});
	const source: Array<Array<number | string>> = [sourceName];
	const keyList: Array<number | string> = [];
	const dataMap: {
		[propName: number | string]: number[];
	} = {};
	const size = props.data.length;
	props.data.forEach((item, seriesIndex) => {
		item.forEach(({ index, value }) => {
			if (!(index in dataMap)) {
				dataMap[index] = [];
				keyList.push(index);
			}
			dataMap[index][seriesIndex] = value;
		});
	});
	keyList.forEach((key) => {
		const data = dataMap[key];
		const newData = [];
		for (let i = 0; i < size; i++) {
			newData.push(data[i] === undefined ? null : data[i]);
		}
		source.push([key, ...newData]);
	});
	mychart.setOption(
		mergeOptions(
			{
				...axis,
				series,
				dataset: {
					source,
				},
			},
			props.options
		),
		props.notMerge
	);
}

onMounted(() => {
	if (chartContainer.value instanceof HTMLElement) {
		mychart = markRaw(echarts.init(chartContainer.value));
		erd.listenTo(chartContainer.value, () => {
			mychart.resize();
		});
		setOption();

		mychart.on('legendselectchanged', (...args) => {
			emit('legendSelectChanged', ...args);
		});
	}
});

onBeforeUnmount(() => {
	if (chartContainer.value instanceof HTMLElement) {
		erd.removeAllListeners(chartContainer.value);
		erd.uninstall(chartContainer.value);
	}
	if (mychart) {
		mychart.dispose();
	}
});
</script>

<style lang="scss" scoped>
.charts {
	overflow: hidden;
	width: 100%;
	height: 100%;
}
</style>
