<script setup></script>

<template>
	<div class="layout-quiz">
		<div class="layout-quiz__popup">
			<slot name="popup"></slot>
		</div>

		<div v-if="$slots.progress" class="layout-quiz__progress">
			<slot name="progress"></slot>
		</div>

		<section class="layout-quiz__container">
			<slot name="default"></slot>
		</section>
	</div>
</template>

<style lang="less" scoped>
.layout-quiz {
	display: flex;
	position: relative;
	width: 100%;
	height: 100%;
	flex-direction: column;
	padding: @spacing-none;
	align-items: center;
	justify-content: center;
	background: linear-gradient(to right, #7380ff, #1f2937);
}

.layout-quiz__popup {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: @z-index-modal;
	overflow: hidden;
}

.layout-quiz__container {
	display: flex;
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	padding: @spacing-xl;
	border-radius: @border-radius-none;
	transform: translate(0%, 0%);
	background: var(--color-base-dark);
	box-shadow: @elevation-medium;
	overflow-x: hidden;
	overflow-y: auto;
}

@media (min-width: @tablet) {
	.layout-quiz {
		padding: @spacing-4xl @spacing-3xl;
	}

	.layout-quiz__container {
		position: relative;
		max-width: 800px;
		max-height: 600px;
		border-radius: @border-radius-l;
	}
}
</style>
