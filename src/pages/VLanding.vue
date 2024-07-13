<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import throttle from 'lodash/throttle';
import { useSessionStore } from '@/store/session';
import CButton from '@/components/CButton.vue';
import CInput from '@/components/CInput.vue';
import validate from '../utils/validate.js';

const sessionStore = useSessionStore();
const router = useRouter();

const isRegistered = ref(false);
const isFullnameValid = ref(false);
const isFullnameDirty = ref(false);
const isEmailValid = ref(false);
const isEmailDirty = ref(false);
const isLoading = ref(false);
const page = ref(null);

const currentLegendText = computed(() =>
	isRegistered.value
		? 'Type down your email to get started'
		: 'Type down your fullname and email to get started'
);
const isActionDisabled = computed(() => !isFullnameValid.value || !isEmailValid.value);

const onEmailInput = () => {
	isEmailDirty.value = true;
	isEmailValid.value = validate(sessionStore.email, 'email');
};

const onFullnameInput = () => {
	isFullnameDirty.value = true;
	isFullnameValid.value = Boolean(sessionStore.fullname);
};

const onSubmit = async () => {
	const wait = (ms) =>
		new Promise((resolve) => {
			setTimeout(resolve, ms);
		});

	isLoading.value = true;

	await wait(1000);

	sessionStore
		.createUser()
		.then(() => router.push({ name: 'quiz' }))
		.catch(() => {})
		.finally(() => {
			sessionStore.fullname = '';
			sessionStore.email = '';
			isLoading.value = false;
		});
};

onMounted(() => {
	page.value.addEventListener(
		'scroll',
		throttle(($e) => {
			if ($e) {
				const top = $e.target.scrollTop;
				const three = $e.target.querySelector('.parallax__three');
				const two = $e.target.querySelector('.parallax__two');
				const one = $e.target.querySelector('.parallax__one');

				three.style.transform = `translateY(${-(top * 0.3)}px)`;
				two.style.transform = `translateY(${-(top * 0.2)}px)`;
				one.style.transform = `translateY(${-(top * 0.1)}px)`;
			}
		}, 50)
	);
});
</script>

<template>
	<div
		class="landing"
		ref="page"
	>
		<header class="landing__header">
			<div class="overlay">
				<div class="parallax">
					<div class="parallax__header">
						<div class="parallax__logo">
							<span class="parallax__bg"></span>
							<h1 class="parallax__title">
								{{ 'Fast Quiz' }}
							</h1>
						</div>
					</div>
					<div class="parallax__three"></div>
					<div class="parallax__two"></div>
					<div class="parallax__one"></div>
				</div>
			</div>
		</header>

		<main class="main-section">
			<form
				class="user-form"
				@submit.prevent="onSubmit"
			>
				<fieldset class="user-form__fieldset">
					<div class="user-form__form-group">
						<p class="user-form__legend text-l-regular">
							{{ currentLegendText }}
						</p>
					</div>

					<div
						v-if="!isRegistered"
						class="user-form__form-group"
					>
						<CInput
							v-model="sessionStore.fullname"
							type="text"
							placeholder="Fullname"
							:valid="!isFullnameDirty || isFullnameValid"
							name="fullname"
							autocomplete="name"
							@input="onFullnameInput"
						></CInput>
					</div>

					<div class="user-form__form-group">
						<CInput
							v-model="sessionStore.email"
							type="email"
							placeholder="Email"
							:valid="!isEmailDirty || isEmailValid"
							name="email"
							autocomplete="email"
							@input="onEmailInput"
						></CInput>
					</div>

					<div class="user-form__form-group">
						<CButton
							primary
							large
							type="submit"
							:disabled="isActionDisabled"
							:loading="isLoading"
						>
							{{ 'Start' }}
						</CButton>
					</div>
				</fieldset>
			</form>

			<article class="article">
				<p class="article__paragraph text-l-regular">
					{{
						'Welcome to the JavaScript Challenge! This quiz is specifically designed to test your knowledge of JavaScript, the versatile programming language that powers the dynamic aspects of web development. Get ready to dive into the world of functions, objects, and syntax as you tackle 10 questions crafted to assess your understanding of JavaScript concepts.'
					}}
				</p>
				<p class="article__paragraph text-l-regular">
					{{
						'Each question will present you with four answer options, but only one of them is the correct JavaScript solution.'
					}}
				</p>
				<p class="article__paragraph text-l-regular">
					{{ "After completing the quiz, you'll see your result compare to others quizzers" }}
				</p>
				<p class="article__paragraph text-l-regular">
					{{ 'Best of luck!!!' }}
				</p>
			</article>
		</main>
	</div>
</template>

<style lang="less" scoped>
.landing {
	color: var(--color-base-content);
	position: relative;
	width: 100%;
	height: 100%;
	background: var(--color-base);
	overflow-x: hidden;
	overflow-y: auto;
}

.landing__header {
	display: flex;
	position: relative;
	height: 80%;
	justify-content: center;
	align-items: center;
	overflow: hidden;
}

.overlay {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.parallax {
	display: flex;
	position: relative;
	width: 100%;
	height: 100%;
	will-change: transform;
	transition: transform 200ms ease;
}

.parallax__one,
.parallax__two,
.parallax__three {
	position: absolute;
	width: 100%;
	height: 100%;
	bottom: 0;
	left: 0;
	background-repeat: no-repeat;
	background-size: 100%;
	background-position: 0% 50%;
	will-change: transform;
	transition: transform 200ms ease;
}

.parallax__one {
	background-image: url(@/assets/images/wave-2.svg);
	filter: drop-shadow(0px 5px 15px black);
	z-index: 3;
}

.parallax__two {
	background-image: url(@/assets/images/wave-3.svg);
	filter: drop-shadow(0px 5px 15px black);
	z-index: 2;
}

.parallax__three {
	background-image: url(@/assets/images/wave-1.svg);
	filter: drop-shadow(0px 5px 15px black);
	z-index: 1;
}

.parallax__header {
	display: flex;
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: flex-start;
	padding: @spacing-l;
	z-index: 3;
}

.parallax__logo {
	display: flex;
	justify-content: center;
	align-items: center;
}

.parallax__title {
	color: var(--color-info-content);
	position: absolute;
	font-weight: @font-weight-bold;
	font-size: 64px;
	text-shadow: 2px 2px 2px var(--color-base-content);
}

.parallax__bg {
	position: relative;
	width: 300px;
	height: 200px;
	background-image: url(@/assets/images/blob.svg);
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
}

@media (max-width: @tablet) {
	.parallax__one,
	.parallax__two,
	.parallax__three {
		background-size: 200%;
	}
}

.main-section {
	display: flex;
	position: relative;
	min-height: 100%;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	margin-top: -100px;
	background: var(--color-info);
}

.user-form {
	display: flex;
	position: relative;
	width: 100%;
	max-width: 300px;
	padding: @spacing-m;
	border-radius: @border-radius-l;
	margin-top: -100px;
}

.user-form__fieldset {
	display: grid;
	position: relative;
	width: 100%;
	grid-template-columns: 1fr;
	justify-content: center;
}

.user-form__legend {
	color: var(--color-info-content);
	line-height: 1.5;
}

.user-form__form-group {
	display: flex;
	position: relative;
	justify-content: center;
	padding: @spacing-m @spacing-none;
}

.article {
	color: var(--color-info-content);
	display: flex;
	position: relative;
	width: 100%;
	max-width: 800px;
	flex-direction: column;
	padding: @spacing-l;
}

.article__paragraph {
	line-height: 1.5;
	margin-bottom: @spacing-l;
}
</style>
