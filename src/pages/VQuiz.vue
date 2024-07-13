<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import LQuiz from '@/layouts/LQuiz.vue';
import WQuiz from '@/widgets/WQuiz.vue';
import MScore from '@/modals/MScore.vue';

const router = useRouter();

const score = ref(null);
const showScoreModal = ref(null);

const onScore = (data) => {
	if (data) {
		score.value = data;
		showScoreModal.value = true;
	}
};
</script>

<template>
	<LQuiz>
		<template
			v-if="showScoreModal"
			v-slot:popup
		>
			<div class="quiz-modal">
				<div class="quiz-modal__overlay"></div>
				<div class="quiz-modal__container">
					<div class="quiz-modal__document">
						<MScore
							:score="score"
							@close="router.push('/')"
						/>
					</div>
				</div>
			</div>
		</template>
		<WQuiz @score="onScore"></WQuiz>
	</LQuiz>
</template>

<style lang="less" scoped>
.quiz-modal {
	position: relative;
	width: 100%;
	height: 100%;
}

.quiz-modal__overlay {
	position: absolute;
	width: 100%;
	height: 100%;
	background: rgba(var(--color-elevation), 0.5);
}

.quiz-modal__container {
	display: flex;
	position: relative;
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: center;
	padding: @spacing-xl;
}

.quiz-modal__document {
	padding: @spacing-xl;
	border-radius: @border-radius-l;
	background: var(--color-info);
	box-shadow: @elevation-medium;
	overflow-x: hidden;
	overflow-y: auto;
}
</style>
