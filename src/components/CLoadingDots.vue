<template>
	<div class="loading-dots">
		<span class="dot --first"></span>
		<span class="dot --middle"></span>
		<span class="dot --last"></span>
	</div>
</template>
<style lang="less" scoped>
.loading-dots {
	display: flex;
	padding: @spacing-xs;
	gap: @spacing-xs;
}

.dot {
	display: inline-flex;
	position: relative;
	width: 8px;
	height: 8px;
	border-radius: @border-radius-full;
	background: var(--color-base-content);
}

.dot {
	animation: flashing (@transition-duration * 2) infinite alternate;

	&.--first {
		animation-delay: 0ms;
	}

	&.--middle {
		animation-delay: (@transition-delay / 2);
	}

	&.--last {
		animation-delay: @transition-duration;
	}
}

@keyframes flashing {
	0% {
		transform: translateY(2px);
		background-color: currentColor;
		opacity: 0.25;
	}

	100% {
		transform: translateY(-2px);
		background-color: currentColor;
		opacity: 0.75;
	}
}
</style>
