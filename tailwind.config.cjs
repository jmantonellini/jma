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
					primary: '#577399',
					secondary: '#FE5F55',
					accent: '#BDD5EA',
					neutral: '#F7F7FF',
					'base-100': '#495867',
					info: '#fef08a',
					success: '#00ff00',
					warning: '#ea580c',
					error: '#ff0000',
					'--rounded-box': '0.5rem',
					'--rounded-btn': '0.5rem',
					fontFamily: ['Jost', 'sans-serif']
				}
			},
			'dark',
			'retro',
			'cyberpunk'
		]
	}
};
