<template>
	<svg class="svg-icon" :class="className" aria-hidden="true">
		<use :xlink:href="`#icon-${icon}`" />
	</svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { CssUnits } from '@kotron/fortress-ui';

const props = withDefaults(
	defineProps<{
		icon: string;
		className?: string;
		size?: string | number;
		width?: string | number;
		height?: string | number;
	}>(),
	{
		size: 20,
	}
);

const size = computed(() => toValue(props.size));

const width = computed(() => {
	if (props.width !== undefined) {
		return toValue(props.width);
	} else {
		return size.value;
	}
});

const height = computed(() => {
	if (props.height !== undefined) {
		return toValue(props.height);
	} else {
		return size.value;
	}
});

function toValue(value: string | number) {
	if (isNaN(value as number)) {
		return value;
	} else {
		return CssUnits.rem(value as number);
	}
}
</script>

<style lang="scss" scoped>
.svg-icon {
	overflow: hidden;
	fill: currentColor;
	width: v-bind(width);
	height: v-bind(height);
}
</style>
