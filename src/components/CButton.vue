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
	mini: Boolean,
	large: Boolean,
	fullWidth: Boolean,
	text: Boolean,
});

const classes = computed(() => ({
	'--primary': props.primary,
	'--secondary': props.secondary,
	'--accent': props.accent,
	'--neutral': props.neutral,
	'--outlined': props.outlined,
	'--loading': props.loading,
	'--mini': props.mini,
	'--large': props.large,
	'--text': props.text,
}));
</script>
<template>
	<button class="button" :class="classes" v-bind="$attrs">
		<CLoadingDots v-if="props.loading" />
		<slot></slot>
	</button>
</template>
<style lang="less" scoped>
.button {
	-webkit-tap-highlight-color: transparent;
	-webkit-touch-callout: none;
	touch-action: none;
	cursor: pointer;
	user-select: none;
	outline: none;
	appearance: none;
	display: flex;
	position: relative;
	min-width: 64px;
	min-height: 48px;
	align-items: center;
	justify-content: center;
	margin: @spacing-none;
	padding: @spacing-m @spacing-xl;
	border-width: @border-s;
	border-style: solid;
	border-color: transparent;
	border-radius: @border-radius-l;
	box-shadow: @elevation-medium;
	font-weight: @font-weight-medium;
	font-size: @font-size-l;
	overflow: hidden;
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

.button:not(:disabled):not(.--text):active {
	box-shadow: @elevation-low;
}

.button.--outlined:not(:disabled):active {
	box-shadow: @elevation-low;
}

.button.--mini {
	min-height: 32px;
	padding: @spacing-xs @spacing-m;
	font-weight: @font-weight-medium;
	font-size: @font-size-m;
}

.button.--large {
	width: 100%;
}

.button:not(:disabled):not(.--outlined):not(.--text).--primary {
	color: var(--color-primary-content);
	background: var(--color-primary);
	border-color: var(--color-primary);

	&:hover {
		border-color: var(--color-primary-dark);
		background: var(--color-primary-dark);
	}
}

.button:not(:disabled):not(.--outlined):not(.--text).--secondary {
	color: var(--color-secondary-content);
	background: var(--color-secondary);
	border-color: var(--color-secondary);

	&:hover {
		border-color: var(--color-secondary-dark);
		background: var(--color-secondary-dark);
	}
}

.button:not(:disabled):not(.--outlined):not(.--text).--accent {
	color: var(--color-accent-content);
	background: var(--color-accent);
	border-color: var(--color-accent);

	&:hover {
		border-color: var(--color-accent-dark);
		background: var(--color-accent-dark);
	}
}

.button:not(:disabled):not(.--outlined):not(.--text).--neutral {
	color: var(--color-neutral-content);
	background: var(--color-neutral);
	border-color: var(--color-neutral);

	&:hover {
		border-color: var(--color-neutral-dark);
		background: var(--color-neutral-dark);
	}
}

.button:not(:disabled):not(.--text).--outlined {
	color: var(--color-base-content);
	background: var(--color-base);
	border-width: @border-s;
	border-style: solid;
	border-color: var(--color-base-content);

	&:hover {
		background: var(--color-base-dark);
	}

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

.button.--text {
	color: var(--color-base-content);
	border-color: transparent;
	background: transparent;
	text-decoration: underline;
	box-shadow: none;
}
</style>
