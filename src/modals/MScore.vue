<script setup>
import CButton from '@/components/CButton.vue';
import { computed } from 'vue';

const emit = defineEmits(['close']);

const props = defineProps({
	score: [Object],
});

const scoreText = computed(() =>
	props.score.score && props.score.questionsLength
		? `${props.score.score} / ${props.score.questionsLength}`
		: ''
);
const averageText = computed(() =>
	props.score?.average ? `You were better than ${props.score.average}% of all quizzers` : ''
);
</script>

<template>
	<div class="score-modal__content">
		<div class="score-modal__header">
			<div class="score-modal__confetti"></div>
			<h1 class="score-modal__title text-xxl-bold">
				{{ 'Congratulations!!!' }}
			</h1>
		</div>
		<article class="score-modal__desc">
			<div
				v-if="scoreText"
				class="score-modal__score text-xxl-bold"
			>
				{{ scoreText }}
			</div>

			<div
				v-if="averageText"
				class="score-modal__average text-l-regular"
			>
				{{ averageText }}
			</div>
		</article>
		<div class="score-modal__action">
			<CButton
				secondary
				large
				@click="emit('close')"
			>
				{{ 'Accept' }}
			</CButton>
		</div>
	</div>
</template>

<style lang="less" scoped>
.score-modal__content {
	display: flex;
	position: relative;
	flex-direction: column;
	align-items: center;
}

.score-modal__header {
	display: flex;
	position: relative;
	flex-direction: column;
	align-items: center;
}

.score-modal__confetti {
	position: relative;
	width: 80px;
	height: 80px;
	padding: @spacing-l;
	background-image: url(@/assets/images/confetti.svg);
}

.score-modal__title {
	color: var(--color-info-content);
	padding: @spacing-l;
}

.score-modal__desc {
	color: var(--color-info-content);
	display: flex;
	position: relative;
	flex-direction: column;
	padding: @spacing-l;
	align-items: center;
}

.score-modal__average {
	text-align: center;
	padding: @spacing-xl @spacing-m;
}

.score-modal__score {
	display: flex;
	position: relative;
	width: 150px;
	height: 150px;
	justify-content: center;
	align-items: center;
	border-radius: @border-radius-full;
	border: 8px solid var(--color-accent);
}

.score-modal__action {
	display: flex;
	position: relative;
	width: 100%;
	max-width: 300px;
}
</style>
