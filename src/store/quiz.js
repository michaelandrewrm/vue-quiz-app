import { defineStore } from 'pinia';

export const useQuizStore = defineStore('quiz', {
	state: () => ({
		answers: [],
	}),
});
