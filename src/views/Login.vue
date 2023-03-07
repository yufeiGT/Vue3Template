<template>
	<div v-loading:body="isLoading" class="login">
		<div class="title">Vue 模板</div>
		<ul>
			<li>
				<Input v-model:value="username" placeholder="用户名" />
			</li>
			<li>
				<Input
					v-model:value="password"
					placeholder="密码"
					type="password"
				/>
			</li>
			<li>
				<Button @click="Login" block>登录</Button>
			</li>
		</ul>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Store, useStore } from 'vuex';
import { Button, Input, message } from 'ant-design-vue';

import { State } from '@/store';

const store = useStore() as Store<State>;
const router = useRouter();

const isLoading = ref(false);
const username = ref('admin');
const password = ref('admin');

function Login() {
	isLoading.value = true;
	store
		.dispatch('Login', {
			username: username.value,
			password: password.value,
		})
		.then((res) => {
			isLoading.value = false;
			router.push({
				path: '/',
			});
		})
		.catch((e) => {
			isLoading.value = false;
			message.error(e.message);
		});
}
</script>

<style lang="scss" scoped>
.login {
	overflow: hidden;
	padding: 30px;
	width: 30vw;
	margin: 0 auto;

	.title {
		overflow: hidden;
		text-align: center;
	}

	ul {
		overflow: hidden;
		li {
			overflow: hidden;
			margin-top: 20px;
		}
	}
}
</style>
