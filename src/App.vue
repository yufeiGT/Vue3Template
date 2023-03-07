<template>
	<ConfigProvider :locale="locale">
		<router-view />
	</ConfigProvider>
</template>

<script lang="ts" setup>
import { ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import { State } from '@/store';

dayjs.locale('zh-cn');

const locale = zhCN;
</script>

<style lang="scss">
#app {
	overflow: hidden;
	width: 100%;
	height: 100%;
}
</style>
