<template>
	<div class="home">
		<p>Vue 模板</p>
		<span>欢迎你：{{ store.state.auth.username }}</span>
	</div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex';

import { Store } from '@/store';

const store = useStore() as Store;
</script>

<style lang="scss" scoped>
.home {
	overflow: hidden;
	text-align: center;
	padding: 30px;

	p {
		overflow: hidden;
		font-size: 2rem;
	}

	span {
		overflow: hidden;
		font-size: 1.5rem;
	}
}
</style>
