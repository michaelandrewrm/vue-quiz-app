import { defineStore } from 'pinia';
import httpRequest from '@/plugins/httpRequest';

export const useSessionStore = defineStore('session', {
	state: () => ({
		fullname: '',
		email: '',
		score: '',
		userId: '',
	}),

	actions: {
		createUser() {
			const payload = {
				fullname: this.fullname,
				email: this.email,
			};

			return httpRequest({
				method: 'POST',
				url: '/api/users',
				data: payload,
			})
				.then(({ data }) => {
					this.userId = data?.id;

					return data;
				})
				.catch((err) => err);
		},
	},
});
