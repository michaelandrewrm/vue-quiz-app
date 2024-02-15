/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
	root: true,

	extends: [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/eslint-config-prettier/skip-formatting',
	],

	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-await-in-loop': 'error',
		'no-constant-binary-expression': 'error',
		'no-constructor-return': 'error',
		'no-duplicate-imports': 'error',
		'no-new-native-nonconstructor': 'error',
		'no-promise-executor-return': 'error',
		'no-self-compare': 'error',
		'arrow-body-style': ['error', 'as-needed'],
		'default-case': 'off',
		'dot-notation': 'warn',
		'eqeqeq': 'warn',
		'no-alert': 'error',
		'no-eq-null': 'error',
		'rest-spread-spacing': ['error', 'never'],
		'no-use-before-define': [
			'error',
			{
				functions: true,
				classes: true,
				variables: true,
				allowNamedExports: false,
			},
		],
		'camelcase': [
			'error',
			{
				properties: 'always',
				ignoreDestructuring: false,
				ignoreImports: false,
				ignoreGlobals: false,
			},
		],
	},

	overrides: [
		{
			files: [
				'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
				'cypress/support/**/*.{js,ts,jsx,tsx}',
			],
			extends: ['plugin:cypress/recommended'],
		},
	],

	parserOptions: {
		ecmaVersion: 'latest',
	},
};
