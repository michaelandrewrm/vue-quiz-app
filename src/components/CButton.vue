<script setup>
import { computed } from 'vue';
import CLoadingDots from './CLoadingDots.vue';

const props = defineProps({
	primary: Boolean,
	secondary: Boolean,
	accent: Boolean,
	neutral: Boolean,
	outlined: Boolean,
	loading: Boolean,
	small: Boolean,
	large: Boolean,
	fullWidth: Boolean,
});

const classes = computed(() => ({
	'--primary': props.primary,
	'--secondary': props.secondary,
	'--accent': props.accent,
	'--neutral': props.neutral,
	'--outlined': props.outlined,
	'--loading': props.loading,
	'--small': props.small,
	'--large': props.large,
	'--full-width': props.fullWidth,
	'text-s-medium': props.small,
	'text-l-medium': props.large,
}));
</script>
<template>
	<button class="button" :class="classes" v-bind="$attrs">
		<CLoadingDots v-if="props.loading"></CLoadingDots>
		<slot v-else />
	</button>
</template>
<style lang="less" scoped>
.button {
	cursor: pointer;
	user-select: none;
	outline: none;
	appearance: none;
	display: flex;
	position: relative;
	min-height: 40px;
	align-items: center;
	justify-content: center;
	margin: @spacing-none;
	padding: @spacing-s @spacing-l;
	border-width: @border-m;
	border-style: solid;
	border-color: transparent;
	border-radius: @border-radius-l;
	box-shadow: @elevation-medium;
	font-weight: @font-weight-medium;
	font-size: @font-size-m;
}
.button:disabled {
	cursor: not-allowed;
	color: var(--color-disabled-content);
	border-color: var(--color-disabled);
	background: var(--color-disabled);
	box-shadow: none;
}

.button.--outlined:disabled {
	border-color: var(--color-disabled-content);
}

.button:not(:disabled):active {
	box-shadow: @elevation-low;
}

.button.--small {
	min-height: 32px;
	padding: @spacing-xs @spacing-m;
}

.button.--large {
	min-height: 48px;
	padding: @spacing-m @spacing-xl;
}

.button.--full-width {
	width: 100%;
}

.button:not(:disabled).--primary:not(.--outlined) {
	color: var(--color-primary-content);
	background: var(--color-primary);
	border-color: var(--color-primary);
}

.button:not(:disabled).--secondary:not(.--outlined) {
	color: var(--color-secondary-content);
	background: var(--color-secondary);
	border-color: var(--color-secondary);
}

.button:not(:disabled).--accent:not(.--outlined) {
	color: var(--color-accent-content);
	background: var(--color-accent);
	border-color: var(--color-accent);
}

.button:not(:disabled).--neutral:not(.--outlined) {
	color: var(--color-neutral-content);
	background: var(--color-neutral);
	border-color: var(--color-neutral);
}

.button:not(:disabled).--outlined {
	color: var(--color-base-content);
	background: var(--color-base);
	border-width: @border-m;
	border-style: solid;
	border-color: var(--color-base-content);

	&.--primary {
		border-color: var(--color-primary);
	}

	&.--secondary {
		border-color: var(--color-secondary);
	}

	&.--accent {
		border-color: var(--color-accent);
	}

	&.--neutral {
		border-color: var(--color-neutral);
	}
}
</style>
