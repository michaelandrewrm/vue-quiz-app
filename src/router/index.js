import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router';
import { useSessionStore } from '@/store/session';

// Auto generates routes from vue files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
const pages = import.meta.glob('../pages/*.vue');

const routes = Object.keys(pages).map((path) => {
	const name = path
		.match(/\.\/pages(.*)\.vue$/)[1]
		.replace('/V', '')
		.toLowerCase();

	return {
		path: name === 'landing' ? '/' : `/${name}`,
		name,
		component: pages[path],
	};
});

const router = createRouter({
	history: import.meta.env.SSR ? createMemoryHistory('/') : createWebHistory('/'),
	routes,
});

router.beforeEach((to) => {
	const sessionStore = useSessionStore();

	if (!sessionStore.userId && to.name === 'quiz') {
		router.push('/');
	}
});

export default router;
