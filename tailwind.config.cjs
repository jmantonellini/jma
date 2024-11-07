/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
import tailwindTypography from '@tailwindcss/typography';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [tailwindTypography, daisyui],
	daisyui: {
		themes: [
			{
				light: {
					primary: '#522B47',
					secondary: '#8DAA9D',
					accent: '#BDD5EA',
					neutral: '#F7F7FF',
					'base-100': '#fbf5f3',
					info: '#fef08a',
					success: '#00ff00',
					warning: '#ea580c',
					error: '#ff0000',
					'--rounded-box': '0.5rem',
					'--rounded-btn': '0.5rem',
					fontFamily: ['Jost', 'sans-serif']
				},
				dark: {
					primary: '#FE5F55',
					'primary-content': '#FBF5F3',
					secondary: '#C6EBBE',
					accent: '#BDD5EA',
					neutral: '#F7F7FF',
					'base-100': '#023C40',
					info: '#fef08a',
					success: '#00ff00',
					warning: '#ea580c',
					error: '#ff0000',
					'--rounded-box': '0.5rem',
					'--rounded-btn': '0.5rem',
					fontFamily: ['Jost', 'sans-serif']
				}
			},
			'retro',
			'cyberpunk'
		]
	}
};
