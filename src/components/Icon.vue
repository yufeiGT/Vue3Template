<template>
	<svg class="svg-icon" :class="className" aria-hidden="true">
		<use :xlink:href="`#icon-${icon}`" />
	</svg>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';

const props = defineProps({
	icon: {
		type: String,
		required: true,
	},
	className: {
		type: String,
		default: '',
	},
	size: {
		type: String,
		default: '20px',
	},
});

const { icon, className, size } = toRefs(props);
</script>

<style lang="scss" scoped>
.svg-icon {
	overflow: hidden;
	fill: currentColor;
	width: v-bind(size);
	height: v-bind(size);
}
</style>
