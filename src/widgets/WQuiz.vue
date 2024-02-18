<script setup>
import { ref, onServerPrefetch, onMounted } from 'vue';
import httpRequest from '@/plugins/httpRequest';
import CQuizAnswer from '@/components/CQuizAnswer.vue';

const selectedAnswer = ref(null);
const questions = ref(null);
const currentQuestion = ref(null);

const getQuestions = () =>
	httpRequest({ method: 'get', url: '/api/questions' })
		.then(({ data }) => {
			questions.value = data;
			currentQuestion.value = data[0];
		})
		.catch(() => {});

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
	<div v-if="questions && currentQuestion" class="quiz">
		<div class="quiz__index"></div>

		<h1 class="quiz__question">{{ currentQuestion.description }}</h1>

		<div class="quiz__divider"></div>

		<ul class="quiz__answers">
			<li class="quiz__answer" v-for="item in currentQuestion.answers" :key="item.id">
				<CQuizAnswer
					:id="item.id"
					v-model="selectedAnswer"
					:value="item.id"
					:description="item.opt"
				></CQuizAnswer>
			</li>
		</ul>
	</div>
</template>

<style lang="less" scoped>
.quiz,
.quiz__answers {
	display: flex;
	position: relative;
	width: 100%;
	height: 100%;
	flex-direction: column;
}

.quiz__answer {
	margin-bottom: @spacing-l;
}
</style>
