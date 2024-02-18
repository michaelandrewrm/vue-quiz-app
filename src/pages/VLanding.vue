<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
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

const onSubmit = () => {
	sessionStore
		.createUser()
		.then(() => router.push({ name: 'quiz' }))
		.catch(() => {})
		.finally(() => {
			sessionStore.fullname = '';
			sessionStore.email = '';
		});
};
</script>

<template>
	<div class="landing">
		<section class="section intro">
			<div class="layer"></div>

			<div class="intro__logo"></div>
			<header class="intro__header">
				<span class="intro__bg"></span>
				<h1 class="intro__title">Fast Quiz</h1>
			</header>
			<p class="intro__desc text-l-regular"></p>
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
						<CButton primary large type="submit" :disabled="isActionDisabled">Start</CButton>
					</div>
				</fieldset>
			</form>
		</section>

		<section class="section scores" data-theme="dark">
			<ul class="scores__list">
				<li class="scores__item">
					<!-- Create a widget to show the users score: -->
					<!-- fullname, email, score -->
				</li>
			</ul>
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

.section {
	display: flex;
	position: relative;
	width: 100%;
	height: 100%;
	background: var(--color-base);
}

.intro {
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.intro__header {
	display: flex;
	position: relative;
	width: 300px;
	height: 200px;
	align-items: center;
	justify-content: center;
}

.intro__title {
	font-weight: @font-weight-bold;
	font-size: 64px;
}

.intro__bg {
	position: absolute;
	width: 100%;
	height: 100%;
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

.layer {
	position: absolute;
	width: 100%;
	height: 240px;
	bottom: @spacing-none;
	background-image: url('@/assets/images/wave.svg');
	background-repeat: no-repeat;
	background-size: cover;
	filter: drop-shadow(0px 5px 15px black);
}
</style>
