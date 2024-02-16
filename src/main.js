import { createSSRApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

export function createApp() {
	const pinia = createPinia();
	const app = createSSRApp(App);

	app.use(pinia);
	app.use(router);

	return { app, router };
}
