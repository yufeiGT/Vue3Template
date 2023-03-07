<template>
	<div class="not-found">
		<p>404 Not Found</p>
		<a href="#/">返回首页</a>
	</div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.not-found {
	overflow: hidden;
	text-align: center;
	padding: 30px;

	p {
		overflow: hidden;
		font-size: 4rem;
	}

	a {
		overflow: hidden;
		color: #fff;
		font-size: 1.5rem;

		&:hover {
			text-decoration: underline;
		}
	}
}
</style>
