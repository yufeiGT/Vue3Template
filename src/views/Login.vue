<template>
	<div v-loading:body="isLoading" class="login">
		<div class="login-container">
			<div class="title">
				<p>欢迎使用</p>
				<p>科创系统</p>
			</div>
			<ul>
				<li
					:class="{
						error: usernameError.length,
					}"
				>
					<Input
						@change="usernameError = ''"
						ref="usernameInput"
						v-model:value="username"
						placeholder="用户名"
						:allow-clear="true"
					/>
					<p>{{ usernameError }}</p>
				</li>
				<li
					:class="{
						error: passwordError.length,
					}"
				>
					<Input
						@change="passwordError = ''"
						ref="passwordInput"
						v-model:value="password"
						type="password"
						placeholder="密码"
						:allow-clear="true"
					/>
					<p>{{ passwordError }}</p>
				</li>
				<li>
					<Button @click="Login" block>登录</Button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
import { Store, useStore } from 'vuex';
import { Button, Input, message } from 'ant-design-vue';

import { State } from '@/store';

const store = useStore() as Store<State>;
const router = useRouter();

const isLoading = ref(false);
const usernameInput: Ref<HTMLInputElement> = ref(null);
const passwordInput: Ref<HTMLInputElement> = ref(null);
const username = ref('');
const password = ref('');
const usernameError = ref('');
const passwordError = ref('');

if (process.env.NODE_ENV === 'development') {
	username.value = 'sky';
	password.value = 'zxc@9527';
}

function Login() {
	if (!username.value.length) {
		usernameError.value = '用户名不能为空';
		usernameInput.value.focus();
		return;
	}
	if (!password.value.length) {
		passwordError.value = '密码不能为空';
		passwordInput.value.focus();
		return;
	}
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
	width: 100vw;
	height: 100vh;
	background: url(~@/assets/images/background.jpg) center center no-repeat;
	background-size: cover;
	display: flex;
	align-items: center;

	.login-container {
		overflow: hidden;
		width: 400px;
		padding: 50px;
		margin-left: px_2_vw(200px);
		margin-bottom: px_2_vh(200px);

		.title {
			overflow: hidden;
			text-align: left;

			p {
				overflow: hidden;
				font-size: px_2_rem(30px);
				margin: 0;
			}
		}

		ul {
			overflow: hidden;
			margin: 0;
			margin-top: 30px;

			li {
				overflow: hidden;

				:deep(.ant-input-affix-wrapper) {
					border: none;
					border-bottom: solid 1px #fff;
					height: 40px;
				}

				:deep(.ant-btn) {
					height: 44px;
					background-color: #fff;

					span {
						color: #000;
						font-size: 1rem;
					}
				}

				p {
					overflow: hidden;
					color: #f00;
					height: 30px;
					line-height: 30px;
					text-align: right;
				}

				&.error {
					:deep(.ant-input-affix-wrapper) {
						border-bottom-color: #f00;
					}
				}
			}
		}
	}
}
</style>
