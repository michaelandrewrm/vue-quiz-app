import { describe, it, beforeEach, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import Component from '@/components/CButton.vue';

describe('c-button.vue', () => {
	let wp;

	beforeEach(() => {
		wp = shallowMount(Component, {});
	});

	it('should add a primary class', async () => {
		await wp.setProps({ primary: true });

		expect(wp.classes('--primary')).toBeTruthy();
	});

	it('should add a secondary class', async () => {
		await wp.setProps({ secondary: true });

		expect(wp.classes('--secondary')).toBeTruthy();
	});

	it('should add an accent class', async () => {
		await wp.setProps({ accent: true });

		expect(wp.classes('--accent')).toBeTruthy();
	});

	it('should add a neutral class', async () => {
		await wp.setProps({ neutral: true });

		expect(wp.classes('--neutral')).toBeTruthy();
	});

	it('should add an outlined class', async () => {
		await wp.setProps({ outlined: true });

		expect(wp.classes('--outlined')).toBeTruthy();
	});

	it('should add a loading class', async () => {
		await wp.setProps({ loading: true });

		expect(wp.classes('--loading')).toBeTruthy();
	});

	it('should render slot content', () => {
		wp = shallowMount(Component, {
			slots: {
				default: 'Text',
			},
		});
		expect(wp.text()).toBe('Text');
	});
});
