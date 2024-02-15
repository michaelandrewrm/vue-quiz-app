<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
	<div class="login">
		<router-link to="/dashboard">Dashboard</router-link>
	</div>
</template>

<style lang="less" scoped>
.login {
	position: relative;
	width: 100%;
	height: 100%;
}
</style>
