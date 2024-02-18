<script setup></script>

<template>
	<div class="quiz">
		<div v-if="$slots.progress" class="quiz__progress">
			<slot name="progress"></slot>
		</div>

		<section class="quiz__container">
			<slot></slot>
		</section>
	</div>
</template>

<style lang="less" scoped>
.quiz {
	position: relative;
	width: 100%;
	height: 100%;
	padding: @spacing-4xl @spacing-3xl;
}

.quiz__container {
	display: flex;
	position: relative;
	width: 100%;
	height: 100%;
	flex-direction: column;
	align-items: flex-start;
	padding: @spacing-m;
	border-radius: @border-radius-l;
	background: var(--color-base-dark);
	box-shadow: @elevation-medium;
	overflow: hidden;
}
</style>
