<script setup>
import { ref, onServerPrefetch, onMounted, computed } from 'vue';
import { useQuizStore } from '@/store/quiz';
import { useSessionStore } from '@/store/session';
import httpRequest from '@/plugins/httpRequest';
import CQuizAnswer from '@/components/CQuizAnswer.vue';
import CButton from '@/components/CButton.vue';

const emit = defineEmits(['score']);
const quizStore = useQuizStore();
const sessionStore = useSessionStore();
const questions = ref(null);
const currentQuestion = ref(null);
const currentQuestionIndex = ref(0);
const selectedAnswer = ref(null);

const currentIndex = computed(() =>
	questions.value?.length && currentQuestion.value?.id
		? `Question: ${currentQuestion.value.id}/${questions.value.length}`
		: ''
);

const getQuestions = () =>
	httpRequest({ method: 'get', url: '/api/questions' })
		.then(({ data }) => {
			questions.value = data;
			currentQuestion.value = data[currentQuestionIndex.value];
		})
		.catch(() => {})
		.finally(() => {});

const postAnswers = () => {
	httpRequest({
		method: 'post',
		url: '/api/questions',
		data: {
			userId: sessionStore.userId,
			answers: quizStore.answers,
		},
	})
		.then(({ data }) => {
			emit('score', {
				score: data?.score,
				average: data?.average,
				questionsLength: questions.value.length,
			});
		})
		.catch(() => {});
};

const onNext = () => {
	quizStore.answers.push({
		questionId: currentQuestion.value.id,
		...selectedAnswer.value,
	});
	currentQuestionIndex.value += 1;
	currentQuestion.value = questions.value[currentQuestionIndex.value];
	selectedAnswer.value = {};
};

const onSubmit = () => {
	quizStore.answers.push({
		questionId: currentQuestion.value.id,
		...selectedAnswer.value,
	});
	currentQuestion.value = questions.value[currentQuestionIndex.value];
	postAnswers();
};

onServerPrefetch(async () => {
	await getQuestions();
});

onMounted(async () => {
	if (!questions.value) {
		await getQuestions();
	}
});
</script>

<template>
	<div
		v-if="questions && questions.length && currentQuestion"
		class="quiz"
	>
		<div class="quiz__index">{{ currentIndex }}</div>

		<h1 class="quiz__question text-xl-medium">
			{{ currentQuestion.description }}
		</h1>

		<div class="quiz__divider"></div>

		<div class="quiz__wrapper">
			<ul class="quiz__answers">
				<li
					class="quiz__answer"
					v-for="item in currentQuestion.answers"
					:key="item.id"
				>
					<CQuizAnswer
						:id="item.id"
						v-model="selectedAnswer"
						:value="item"
					/>
				</li>
			</ul>
		</div>

		<div class="quiz__footer">
			<div class="quiz__actions">
				<CButton
					v-if="currentQuestionIndex === questions.length - 1"
					primary
					:disabled="!selectedAnswer || (selectedAnswer && !selectedAnswer.id)"
					large
					@click="onSubmit"
				>
					Submit
				</CButton>
				<CButton
					v-if="currentQuestionIndex < questions.length - 1"
					primary
					:disabled="!selectedAnswer || (selectedAnswer && !selectedAnswer.id)"
					large
					@click="onNext"
				>
					Next
				</CButton>
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
.quiz {
	display: flex;
	position: relative;
	width: 100%;
	height: 100%;
	flex-direction: column;
}

.quiz__index {
	text-align: center;
}

.quiz__divider {
	position: relative;
	width: 100%;
	height: 2px;
	border-top: 1px solid rgba(var(--color-elevation), 0.1);
	border-bottom: 1px solid var(--color-base-darker);
}

.quiz__question {
	text-align: center;
	padding: @spacing-2xl @spacing-m;
}

.quiz__answers {
	display: flex;
	position: relative;
	width: 100%;
	max-width: 300px;
	height: 100%;
	flex-direction: column;
	padding: @spacing-2xl @spacing-none;
}

.quiz__wrapper {
	display: flex;
	justify-content: center;
}

.quiz__answer {
	display: flex;
	width: 100%;
	margin-bottom: @spacing-l;
}

.quiz__footer {
	display: flex;
	position: sticky;
	width: 100%;
	bottom: 0;
	justify-content: center;
	background: var(--color-base-dark);
}

.quiz__actions {
	display: flex;
	position: relative;
	width: 100%;
	max-width: 300px;
	justify-content: center;
}
</style>
