import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/',
	plugins: [vue()],
	server: {
		host: '0.0.0.0',
	},
	css: {
		preprocessorOptions: {
			less: {
				strictUnits: true,
				globalVars: {
					// Spacing
					'spacing-unit': '8px',
					'spacing-none': '0px',
					'spacing-xs': '(@spacing-unit / 2)',
					'spacing-s': '@spacing-unit',
					'spacing-m': '(@spacing-unit * 1.5)',
					'spacing-l': '(@spacing-unit * 2)',
					'spacing-xl': '(@spacing-unit * 3)',
					'spacing-2xl': '(@spacing-unit * 4)',
					'spacing-3xl': '(@spacing-unit * 6)',
					'spacing-4xl': '(@spacing-unit * 8)',

					// Border
					'border-unit': '1px',
					'border-none': '0px',
					'border-xs': '(@border-unit / 2)',
					'border-s': '@border-unit',
					'border-m': '(@border-unit * 2)',
					'border-l': '(@border-unit * 3)',

					// Border Radius
					'border-radius-unit': '4px',
					'border-radius-none': '0px',
					'border-radius-xs': '(@border-radius-unit / 2)',
					'border-radius-s': '@border-radius-unit',
					'border-radius-m': '(@border-radius-unit * 2)',
					'border-radius-l': '(@border-radius-unit * 3)',
					'border-radius-xl': '(@border-radius-unit * 4)',
					'border-radius-full': '100%',

					// Elevation Levels
					'elevation-low': '0px -2px 4px 0px rgba(0, 0, 0, 0.08)',
					'elevation-medium': '0px -4px 8px 0px rgba(0, 0, 0, 0.08)',
					'elevation-high': '0px -8px 16px 0px rgba(0, 0, 0, 0.08)',
					'elevation-right': '4px 0px 8px 0px rgba(0, 0, 0, 0.08)',
					'elevation-top': '0px 0px 16px 4px rgba(0, 0, 0, 0.08)',

					// Transition default values
					'transition-delay': '250ms',
					'transition-duration': '200ms',
					'transition-timing-function': 'ease-in-out',

					// Layers
					'z-index-negative': '-1',
					'z-index-base': '1',
					'z-index-page': '5',
					'z-index-over-page': '10',
					'z-index-sidebar': '15',
					'z-index-dropdown': '20',
					'z-index-loading': '25',
					'z-index-modal': '30',
					'z-index-tooltip': '35',
					'z-index-cover': '40',

					// Breakpoints
					'mobile': '767px',
					'tablet': '768px',
					'desktop': '1024px',
					'screen': '1440px',

					// Font Family
					'font-family': 'Figtree',

					// Fonts Weights
					'font-weight-light': 300,
					'font-weight-regular': 400,
					'font-weight-medium': 500,
					'font-weight-bold': 700,

					// Fonts Sizes
					'font-size-s': '12px',
					'font-size-m': '14px',
					'font-size-l': '16px',
					'font-size-xl': '24px',
					'font-size-xxl': '32px',
				},
			},
		},
	},
});
