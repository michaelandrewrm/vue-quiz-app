<script setup>
import { computed } from 'vue';

const model = defineModel();

const props = defineProps({
	type: String,
	valid: Boolean,
	required: Boolean,
});

const classes = computed(() => ({
	'--invalid': !props.valid,
	'--required': props.required,
}));
</script>

<template>
	<div class="input" :class="classes">
		<input
			class="input__element text-l-regular"
			v-model="model"
			:type="props.type || 'text'"
			v-bind="$attrs"
		/>

		<span v-if="$slots.message" class="input__message text-l-regular">
			<slot name="message"></slot>
		</span>
	</div>
</template>

<style lang="less" scoped>
.input {
	display: flex;
	position: relative;
	width: 100%;
	min-height: 48px;
	flex-direction: column;
	border-radius: @border-radius-l;
	font-weight: @font-weight-regular;
}

.input__element {
	outline: none;
	display: flex;
	width: 100%;
	height: 48px;
	flex-shrink: 0;
	padding: @spacing-m @spacing-l;
	border: @border-none;
	border-width: @border-s;
	border-style: solid;
	border-color: transparent;
	border-radius: @border-radius-l;
	background: var(--color-base-darker);
}

.input:not(.--invalid) {
	& .input__element:focus:focus-visible {
		border-color: var(--color-primary);
	}
}

.input.--invalid {
	& .input__element {
		border-color: var(--color-error);
	}

	& .input__message {
		color: var(--color-error);
		visibility: visible;
	}
}

.input__message {
	visibility: hidden;
	display: flex;
	position: relative;
	justify-content: flex-end;
	padding: @spacing-s;
}
</style>
