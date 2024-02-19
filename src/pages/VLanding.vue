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
				const three = $e.target.querySelector('.--three');
				const two = $e.target.querySelector('.--two');
				const one = $e.target.querySelector('.--one');

				three.style.transform = `translateY(${-(top * 0.3)}px)`;
				two.style.transform = `translateY(${-(top * 0.2)}px)`;
				one.style.transform = `translateY(${-(top * 0.1)}px)`;
			}
		}, 50)
	);
});
</script>

<template>
	<div class="landing" ref="page">
		<div class="overlay">
			<div class="parallax">
				<div class="parallax --three"></div>
				<div class="parallax --two"></div>
				<div class="parallax --one"></div>
			</div>
		</div>

		<section class="section intro">
			<header class="intro__header">
				<span class="intro__bg"></span>
				<h1 class="intro__title">
					{{ 'Fast Quiz' }}
				</h1>
			</header>
			<form class="user-data" @submit.prevent="onSubmit">
				<fieldset class="user-data__fieldset">
					<div class="user-data__form-group">
						<p class="user-data__legend">
							{{ currentLegendText }}
						</p>
					</div>

					<div v-if="!isRegistered" class="user-data__form-group">
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

					<div class="user-data__form-group">
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

					<div class="user-data__form-group">
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
		</section>
	</div>
</template>

<style lang="less" scoped>
.landing {
	color: var(--color-base-content);
	position: relative;
	width: 100%;
	height: 100%;
	overflow-x: hidden;
	overflow-y: auto;
}

.overlay {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.parallax {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-repeat: no-repeat;
	background-size: 100%;
	background-position: bottom;
	will-change: transform;
	transition: transform 200ms ease;

	& .--one {
		background-image: url(@/assets/images/wave-2.svg);
		filter: drop-shadow(0px 5px 15px black);
		z-index: 3;
	}

	& .--two {
		background-image: url(@/assets/images/wave-3.svg);
		filter: drop-shadow(0px 5px 15px black);
		z-index: 2;
	}

	& .--three {
		background-image: url(@/assets/images/wave-1.svg);
		filter: drop-shadow(0px 5px 15px black);
		z-index: 1;
	}

	& .--header {
		z-index: 3;
	}
}

@media (max-width: @tablet) {
	.parallax {
		& .--one,
		& .--two,
		& .--three {
			background-size: 200%;
		}
	}
}

.section {
	display: flex;
	position: relative;
	width: 100%;
	height: 100%;
}

.intro {
	flex-direction: column;
	align-items: center;
	justify-content: center;
	z-index: 4;
}

.intro__header {
	display: flex;
	position: relative;
	width: 300px;
	height: 200px;
	align-items: center;
	justify-content: center;
	margin-bottom: @spacing-m;
}

.intro__title {
	position: absolute;
	font-weight: @font-weight-bold;
	font-size: 64px;
}

.intro__bg {
	position: relative;
	width: 300px;
	height: 200px;
	background-image: url(@/assets/images/blob.svg);
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
}

.user-data {
	display: flex;
	position: relative;
	width: 100%;
	max-width: 300px;
	padding: @spacing-m;
	background: rgba(255, 255, 255, 0.5);
	border-radius: @border-radius-l;
}

.user-data__fieldset {
	display: grid;
	position: relative;
	width: 100%;
	grid-template-columns: 1fr;
	justify-content: center;
}

.user-data__form-group {
	display: flex;
	position: relative;
	justify-content: center;
	padding: @spacing-m @spacing-none;
}

.scores {
	background: var(--color-base);
}

.scores-layer {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-repeat: no-repeat;
	background-size: 100%;
	background-position: top;
	background-image: url(@/assets/images/wave-1.svg);
}
</style>
