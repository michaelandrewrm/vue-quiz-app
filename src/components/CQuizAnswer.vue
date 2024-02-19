<script setup>
import { computed } from 'vue';

const model = defineModel();

const props = defineProps({
	value: Object,
	checked: Boolean,
});

const classes = computed(() => ({
	'--selected': model.value?.id === props.value?.id,
}));
</script>

<template>
	<label class="quiz-answer" :class="classes" tabindex="0">
		<input
			class="quiz-answer__radio"
			type="radio"
			v-model="model"
			v-bind="$attrs"
			:value="value"
			tabindex="-1"
			:checked="checked"
		/>
		<span class="quiz-answer__icon text-l-medium" tabindex="-1">
			{{ value.id }}
		</span>
		<span v-if="value && value.opt" class="quiz-answer__desc text-l-regular">
			{{ value.opt }}
		</span>
	</label>
</template>

<style lang="less" scoped>
.quiz-answer {
	-webkit-tap-highlight-color: transparent;
	-webkit-touch-callout: none;
	touch-action: none;
	cursor: pointer;
	outline: none;
	user-select: none;
	appearance: none;
	display: flex;
	position: relative;
	width: 100%;
	border: @border-none;
	margin: @spacing-none;
	padding: @spacing-m @spacing-l;
	border-radius: @border-radius-l;
	background: var(--color-base-darker);
	box-shadow: @elevation-medium;
}

.quiz-answer:active {
	box-shadow: @elevation-low;
}

.quiz-answer.--selected {
	background: var(--color-primary);
}

.quiz-answer.--selected:hover {
	background: var(--color-primary-dark);
}

.quiz-answer__radio:focus,
.quiz-answer__radio:focus-visible {
	outline: none;
}

.quiz-answer__radio {
	appearance: none;
	position: absolute;
	width: 0px;
	height: 0px;
}

.quiz-answer__icon {
	display: flex;
	position: relative;
	width: 40px;
	height: 40px;
	flex-shrink: 0;
	justify-content: center;
	align-items: center;
	border-radius: @border-radius-full;
	background: var(--color-base-darker);
	box-shadow: @elevation-low;
}

.quiz-answer__desc {
	display: flex;
	position: relative;
	width: 100%;
	align-items: center;
	margin-left: @spacing-l;
}
</style>
